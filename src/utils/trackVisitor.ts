import { VisitorData, VisitorLog } from "../context/VisitorContext";

/* ─────────────────────────────────────────
   LOG PAGE VISIT
   Called on every route change in App.tsx
───────────────────────────────────────── */
export function logPageVisit(
  pathname: string,
  visitor: VisitorData,
  addVisit: (v: VisitorLog) => void
): void {
  if (!visitor.loaded) return;

  const entry: VisitorLog = {
    session_id:   visitor.sessionId,
    ip:           visitor.ip,
    page:         pathname,
    timestamp:    new Date().toISOString(),
    country:      visitor.country,
    country_name: visitor.country_name,
    country_flag: visitor.country_flag,
    city:         visitor.city,
    region:       visitor.region,
    isp:          visitor.isp,
    timezone:     visitor.timezone,
    lat:          visitor.lat,
    lon:          visitor.lon,
    browser:      visitor.browser,
    os:           visitor.os,
    device_type:  visitor.deviceType,
    referrer:     visitor.referrer,
    entry_page:   visitor.entryPage,
    user_agent:   visitor.userAgent,
  };

  addVisit(entry); // → saves to Supabase + in-memory
  console.log("[VisitorTrack]", entry);
}

/* ─────────────────────────────────────────
   FORMAT HELPERS
───────────────────────────────────────── */
export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) +
    " " +
    d.toLocaleTimeString("en-US", { hour12: false })
  );
}

export function getDeviceIcon(deviceType: string | null): string {
  if (deviceType === "mobile") return "📱";
  if (deviceType === "tablet") return "📟";
  return "🖥";
}

export function getBrowserColor(browser: string | null): string {
  const map: Record<string, string> = {
    Chrome: "#00ffe7", Firefox: "#ff8c42", Safari: "#00bfff",
    Edge: "#bf5fff", Opera: "#ff3b5c", IE: "#ffd700",
  };
  return map[browser ?? ""] ?? "rgba(255,255,255,0.4)";
}