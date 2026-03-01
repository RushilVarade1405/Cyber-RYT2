import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
export interface VisitorData {
  ip: string | null;
  country: string | null;
  country_name: string | null;
  country_flag: string | null;
  city: string | null;
  region: string | null;
  isp: string | null;
  timezone: string | null;
  lat: number | null;
  lon: number | null;
  currency: string | null;
  languages: string | null;
  userAgent: string | null;
  browser: string | null;
  os: string | null;
  deviceType: "mobile" | "tablet" | "desktop" | null;
  sessionId: string;
  referrer: string | null;
  entryPage: string;
  firstSeen: string;
  loaded: boolean;
  error: string | null;
}

export interface VisitorLog {
  id?: number;
  session_id: string;
  ip: string | null;
  page: string;
  timestamp: string;
  country: string | null;
  country_name: string | null;
  country_flag: string | null;
  city: string | null;
  region: string | null;
  isp: string | null;
  timezone: string | null;
  lat: number | null;
  lon: number | null;
  browser: string | null;
  os: string | null;
  device_type: string | null;
  referrer: string | null;
  entry_page: string | null;
  user_agent: string | null;
}

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function generateSessionId(): string {
  return (
    "SID-" +
    Math.random().toString(36).slice(2, 10).toUpperCase() +
    "-" +
    Date.now().toString(36).toUpperCase()
  );
}

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return "🌐";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map(c => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

export function parseUserAgent(ua: string): {
  browser: string;
  os: string;
  deviceType: "mobile" | "tablet" | "desktop";
} {
  const browser =
    /Edg\//.test(ua)        ? "Edge"    :
    /OPR\//.test(ua)        ? "Opera"   :
    /Chrome\//.test(ua)     ? "Chrome"  :
    /Firefox\//.test(ua)    ? "Firefox" :
    /Safari\//.test(ua)     ? "Safari"  :
    /MSIE|Trident/.test(ua) ? "IE"      : "Unknown";

  const os =
    /Windows NT 10|Windows NT 11/.test(ua) ? "Windows 10/11" :
    /Windows/.test(ua)       ? "Windows" :
    /Mac OS X/.test(ua)      ? "macOS"   :
    /Android/.test(ua)       ? "Android" :
    /iPhone|iPad/.test(ua)   ? "iOS"     :
    /Linux/.test(ua)         ? "Linux"   : "Unknown";

  const deviceType: "mobile" | "tablet" | "desktop" =
    /Mobi/.test(ua)        ? "mobile"  :
    /Tablet|iPad/.test(ua) ? "tablet"  : "desktop";

  return { browser, os, deviceType };
}

/* ─────────────────────────────────────────
   SESSION SINGLETON
───────────────────────────────────────── */
const SESSION_ID = generateSessionId();

const defaultVisitorData: VisitorData = {
  ip: null, country: null, country_name: null, country_flag: null,
  city: null, region: null, isp: null, timezone: null,
  lat: null, lon: null, currency: null, languages: null,
  userAgent: null, browser: null, os: null, deviceType: null,
  sessionId: SESSION_ID,
  referrer: typeof document !== "undefined" ? document.referrer || null : null,
  entryPage: typeof window !== "undefined" ? window.location.pathname : "/",
  firstSeen: new Date().toISOString(),
  loaded: false,
  error: null,
};

/* ─────────────────────────────────────────
   CONTEXTS
───────────────────────────────────────── */
const VisitorContext = createContext<VisitorData>(defaultVisitorData);

interface VisitHistoryCtx {
  visits: VisitorLog[];
  allVisits: VisitorLog[];
  addVisit: (v: VisitorLog) => void;
  refreshAllVisits: () => Promise<void>;
  supabaseReady: boolean;
}

const VisitHistoryContext = createContext<VisitHistoryCtx>({
  visits: [],
  allVisits: [],
  addVisit: () => {},
  refreshAllVisits: async () => {},
  supabaseReady: false,
});

/* ─────────────────────────────────────────
   FETCH VISITOR IP + GEO
   Uses ip-api.com — works on Vercel
───────────────────────────────────────── */
async function fetchVisitorData(): Promise<Partial<VisitorData>> {
  const ua = navigator.userAgent;
  const { browser, os, deviceType } = parseUserAgent(ua);

  try {
    // ip-api.com works on Vercel and is free
    const res = await fetch(
      "https://ip-api.com/json/?fields=status,message,country,countryCode,regionName,city,lat,lon,timezone,isp,query"
    );
    if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
    const d = await res.json();

    if (d.status !== "success") throw new Error(d.message || "ip-api failed");

    const countryCode: string = d.countryCode ?? "";

    return {
      ip:           d.query ?? null,
      country:      countryCode,
      country_name: d.country ?? null,
      country_flag: countryCodeToFlag(countryCode),
      city:         d.city ?? null,
      region:       d.regionName ?? null,
      isp:          d.isp ?? null,
      timezone:     d.timezone ?? null,
      lat:          d.lat ?? null,
      lon:          d.lon ?? null,
      currency:     null,
      languages:    null,
      userAgent:    ua,
      browser,
      os,
      deviceType,
    };
  } catch (err) {
    // fallback — at least get the IP
    try {
      const ipRes = await fetch("https://api4.ipify.org?format=json");
      const ipData = ipRes.ok ? await ipRes.json() : null;
      return {
        ip:        ipData?.ip ?? null,
        userAgent: ua,
        browser,
        os,
        deviceType,
      };
    } catch {
      return { userAgent: ua, browser, os, deviceType };
    }
  }
}

/* ─────────────────────────────────────────
   PROVIDER
───────────────────────────────────────── */
export function VisitorProvider({ children }: { children: ReactNode }) {
  const [visitorData, setVisitorData] = useState<VisitorData>(defaultVisitorData);
  const [visits, setVisits]           = useState<VisitorLog[]>([]);
  const [allVisits, setAllVisits]     = useState<VisitorLog[]>([]);
  const supabaseReady                 = supabase !== null;

  // Fetch all past visits from Supabase on mount only
  const refreshAllVisits = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from("visitor_logs")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(500);
      if (!error && data) setAllVisits(data as VisitorLog[]);
    } catch (_) {
      // fail silently
    }
  };

  useEffect(() => {
    refreshAllVisits();
  }, []);

  // removed refreshAllVisits() from here
  // it was causing full app re-render on every navigation
  const addVisit = async (visit: VisitorLog) => {
    setVisits(prev => [visit, ...prev].slice(0, 200));
    if (supabase) {
      try {
        await supabase.from("visitor_logs").insert([visit]);
      } catch (_) {
        // fail silently
      }
    }
  };

  // Resolve visitor IP on mount
  useEffect(() => {
    fetchVisitorData()
      .then(data =>
        setVisitorData(prev => ({ ...prev, ...data, loaded: true, error: null }))
      )
      .catch((err: Error) => {
        const ua = navigator.userAgent;
        const { browser, os, deviceType } = parseUserAgent(ua);
        setVisitorData(prev => ({
          ...prev,
          userAgent: ua,
          browser,
          os,
          deviceType,
          loaded: true,
          error: err.message,
        }));
      });
  }, []);

  return (
    <VisitorContext.Provider value={visitorData}>
      <VisitHistoryContext.Provider
        value={{ visits, allVisits, addVisit, refreshAllVisits, supabaseReady }}>
        {children}
      </VisitHistoryContext.Provider>
    </VisitorContext.Provider>
  );
}

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
export function useVisitorIP(): VisitorData {
  return useContext(VisitorContext);
}

export function useVisitHistory(): VisitHistoryCtx {
  return useContext(VisitHistoryContext);
}