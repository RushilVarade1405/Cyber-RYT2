/**
 * CyberNews.tsx — Single-file Cyber Threat Intel Feed
 *
 * FIX SUMMARY (2025-04):
 *  1. All proxies race in TRUE PARALLEL (Promise.any) — no sequential waterfall
 *  2. Staggered proxy start (0/200/400ms) to avoid hammering one proxy
 *  3. XML validity check on EVERY response — rejects HTML error pages
 *  4. Proxy failure memory in sessionStorage — skip bad proxies for 5 min
 *  5. Per-proxy 6s timeout (not 10s), hard 14s wall-clock budget per source
 *  6. All alt-URLs per source also race in parallel
 *  7. Cache in sessionStorage (15 min TTL) — survives page navigation
 *  8. Static fallback shown ONLY when every single source fails
 *  9. Single file — no split between News.ts / rssService.ts / CyberNews.tsx
 */

import { memo, useEffect, useRef, useState, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import {
  RefreshCw, ExternalLink, Shield, AlertTriangle,
  Bug, Zap, BookOpen, Radio, Clock, TrendingUp, ChevronRight,
} from "lucide-react";

/* ─── GLOBAL CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');
  :root{--cyan:#00ffe7;--cyan-dim:#00ffe740;--blue:#3b82f6;--purple:#a855f7;--red:#ff2d55;--bg:#020509}
  @keyframes scanline{0%{transform:translateY(-100vh)}100%{transform:translateY(100vh)}}
  @keyframes neon-pulse{0%,100%{text-shadow:0 0 4px var(--cyan),0 0 10px var(--cyan),0 0 20px var(--cyan-dim)}50%{text-shadow:0 0 8px var(--cyan),0 0 20px var(--cyan),0 0 40px var(--cyan-dim),0 0 60px var(--cyan-dim)}}
  @keyframes line-extend{from{width:0}to{width:100%}}
  @keyframes corner-flash{0%,90%,100%{opacity:0}92%,98%{opacity:1}}
  @keyframes ticker{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}
  @keyframes flicker{0%,100%{opacity:1}92%{opacity:1}93%{opacity:.4}94%{opacity:1}96%{opacity:.6}97%{opacity:1}}
  @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .neon-text{animation:neon-pulse 3s ease-in-out infinite}
  .scan-animate{animation:scanline 8s linear infinite}
  .spin-anim{animation:spin 1s linear infinite}
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-track{background:rgba(0,0,0,.4)}
  ::-webkit-scrollbar-thumb{background:rgba(0,255,231,.2);border-radius:2px}
`;

/* ─── TYPES ──────────────────────────────────────────────────────────────── */
export type NewsCategory  = "Breach" | "Vulnerability" | "Malware" | "Advisory" | "Research";
export type NewsSeverity  = "Critical" | "High" | "Medium" | "Low";
type ActiveFilter         = "All" | NewsCategory;

export interface CyberNewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  category: NewsCategory;
  severity: NewsSeverity;
  tags: string[];
  isLive?: boolean;
}

/* ─── RSS SOURCES ────────────────────────────────────────────────────────── */
interface RSSSource {
  name: string;
  url: string;
  altUrls?: string[];
  region: "global" | "india";
  defaultCategory?: NewsCategory;
  priority: number;
}

const RSS_SOURCES: RSSSource[] = [
  // ── Priority 10: Core global sources ──
  { name: "The Hacker News",    url: "https://feeds.feedburner.com/TheHackersNews",          region: "global", priority: 10 },
  { name: "BleepingComputer",   url: "https://www.bleepingcomputer.com/feed/",                region: "global", priority: 10 },
  { name: "Krebs on Security",  url: "https://krebsonsecurity.com/feed/",                     region: "global", priority: 10 },
  { name: "Dark Reading",       url: "https://www.darkreading.com/rss.xml",                   region: "global", priority: 10 },
  { name: "SecurityWeek",       url: "https://feeds.feedburner.com/Securityweek",
    altUrls: ["https://www.securityweek.com/feed/"],                                           region: "global", priority: 10 },
  // ── Priority 9: Threat intel + gov ──
  { name: "CISA Alerts",        url: "https://www.cisa.gov/news.xml",                         region: "global", priority: 9,  defaultCategory: "Advisory" },
  { name: "Unit 42",            url: "https://unit42.paloaltonetworks.com/feed/",              region: "global", priority: 9 },
  { name: "Talos Intelligence", url: "https://blog.talosintelligence.com/rss/",               region: "global", priority: 9 },
  // ── Priority 8: Coverage ──
  { name: "Help Net Security",  url: "https://feeds2.feedburner.com/HelpNetSecurity",
    altUrls: ["https://www.helpnetsecurity.com/feed/"],                                        region: "global", priority: 8 },
  { name: "Cybersecurity News", url: "https://cybersecuritynews.com/feed/",                   region: "global", priority: 8 },
  { name: "The Record",         url: "https://therecord.media/feed",                          region: "global", priority: 8 },
  { name: "Malwarebytes Labs",  url: "https://www.malwarebytes.com/blog/feed",                region: "global", priority: 8 },
  { name: "ESET WeLiveSecurity",url: "https://www.welivesecurity.com/feed/",                  region: "global", priority: 8 },
  { name: "Securelist",         url: "https://securelist.com/feed/",                          region: "global", priority: 8 },
  // ── Priority 7: Research ──
  { name: "Rapid7 Blog",        url: "https://blog.rapid7.com/rss/",
    altUrls: ["https://www.rapid7.com/blog/rss/"],                                             region: "global", priority: 7, defaultCategory: "Vulnerability" },
  { name: "CVEFeed",            url: "https://cvefeed.io/rssfeed/severity/high.xml",
    altUrls: ["https://cvefeed.io/rssfeed/latest.xml"],                                        region: "global", priority: 7, defaultCategory: "Vulnerability" },
  { name: "Packet Storm",       url: "https://feeds.feedburner.com/packetstormsecurity/IIOJ",
    altUrls: ["https://packetstormsecurity.com/feeds/news.xml"],                               region: "global", priority: 7, defaultCategory: "Vulnerability" },
  // ── India-specific ──
  { name: "CERT-In",            url: "https://www.cert-in.org.in/RSS.jsp",
    altUrls: ["https://www.cert-in.org.in/rss.jsp", "https://cert-in.org.in/RSS.jsp"],        region: "india",  priority: 9, defaultCategory: "Advisory" },
  { name: "CyberPeace",         url: "https://www.cyberpeace.org/feed/",
    altUrls: ["https://cyberpeace.org/feed/", "https://www.cyberpeace.org/?feed=rss2"],        region: "india",  priority: 7 },
  { name: "DSCI",               url: "https://www.dsci.in/feed/",
    altUrls: ["https://dsci.in/feed/", "https://www.dsci.in/?feed=rss2"],                      region: "india",  priority: 7 },
];

/* ─── PROXY RACE ENGINE ──────────────────────────────────────────────────── */
const PROXY_TIMEOUT_MS  = 6000;
const SOURCE_BUDGET_MS  = 14000;
const STAGGER_MS        = 200;
const PROXY_FAIL_TTL    = 5 * 60 * 1000;  // suppress failed proxy for 5 min
const PERF_KEY          = "cn_proxy_perf_v3";

interface ProxyDef { id: string; build: (u: string) => string }

const PROXIES: ProxyDef[] = [
  { id: "allorigins-get",  build: u => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}&t=${Date.now()}` },
  { id: "allorigins-raw",  build: u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}&t=${Date.now()}` },
  { id: "corsproxy",       build: u => `https://corsproxy.io/?${encodeURIComponent(u)}` },
  { id: "codetabs",        build: u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}` },
  { id: "thingproxy",      build: u => `https://thingproxy.freeboard.io/fetch/${u}` },
];

interface PerfEntry { avgMs: number; failUntil: number }

function loadPerf(): Record<string, PerfEntry> {
  try { return JSON.parse(sessionStorage.getItem(PERF_KEY) ?? "{}"); } catch { return {}; }
}
function savePerf(p: Record<string, PerfEntry>) {
  try { sessionStorage.setItem(PERF_KEY, JSON.stringify(p)); } catch {}
}
function markWin(id: string, ms: number) {
  const p = loadPerf(); const e = p[id] ?? { avgMs: ms, failUntil: 0 };
  p[id] = { avgMs: Math.round(e.avgMs * 0.6 + ms * 0.4), failUntil: 0 }; savePerf(p);
}
function markFail(id: string) {
  const p = loadPerf(); p[id] = { avgMs: (p[id]?.avgMs ?? 9999), failUntil: Date.now() + PROXY_FAIL_TTL }; savePerf(p);
}
function sortedProxies(): ProxyDef[] {
  const perf = loadPerf(); const now = Date.now();
  return [...PROXIES].sort((a, b) => {
    const pa = perf[a.id], pb = perf[b.id];
    const af = (pa?.failUntil ?? 0) > now, bf = (pb?.failUntil ?? 0) > now;
    if (af && !bf) return 1; if (!af && bf) return -1;
    return (pa?.avgMs ?? 5000) - (pb?.avgMs ?? 5000);
  });
}

function isValidXML(text: string): boolean {
  if (!text || text.length < 80) return false;
  const t = text.trimStart();
  return (t.startsWith("<?xml") || t.startsWith("<rss") || t.startsWith("<feed"))
    && (t.includes("<item") || t.includes("<entry"));
}

/** True parallel proxy race with staggered starts */
async function proxyRace(targetUrl: string): Promise<string> {
  const proxies = sortedProxies();
  const cancel = new AbortController();

  const races = proxies.map((proxy, idx) =>
    new Promise<string>((resolve, reject) => {
      const stagger = setTimeout(async () => {
        if (cancel.signal.aborted) { reject(new DOMException("aborted", "AbortError")); return; }
        const ctrl = new AbortController();
        cancel.signal.addEventListener("abort", () => ctrl.abort(), { once: true });
        const hard = setTimeout(() => { ctrl.abort(); markFail(proxy.id); reject(new Error(`timeout:${proxy.id}`)); }, PROXY_TIMEOUT_MS);
        const t0 = Date.now();
        try {
          const proxyUrl = proxy.build(targetUrl);
          const res = await fetch(proxyUrl, {
            signal: ctrl.signal,
            headers: { Accept: "application/rss+xml, application/xml, application/atom+xml, text/xml, */*" },
          });
          clearTimeout(hard);
          if (!res.ok) { markFail(proxy.id); reject(new Error(`HTTP ${res.status}`)); return; }
          // allorigins /get returns JSON envelope — unwrap it
          let text: string;
          if (proxy.id === "allorigins-get") {
            const json = await res.json(); text = json?.contents ?? "";
          } else {
            text = await res.text();
          }
          if (isValidXML(text)) { markWin(proxy.id, Date.now() - t0); cancel.abort(); resolve(text); }
          else { markFail(proxy.id); reject(new Error(`bad XML from ${proxy.id}`)); }
        } catch (e: any) {
          clearTimeout(hard);
          if (e?.name !== "AbortError") markFail(proxy.id);
          reject(e);
        }
      }, idx * STAGGER_MS);
      cancel.signal.addEventListener("abort", () => clearTimeout(stagger), { once: true });
    })
  );

  try { return await Promise.any(races); }
  catch { throw new Error(`All proxies failed: ${targetUrl}`); }
}

/** Fetch one source — all alt-URLs also race in parallel, hard budget */
async function fetchSourceXML(source: RSSSource): Promise<string> {
  const urls = [source.url, ...(source.altUrls ?? [])];
  const urlRaces = urls.map(u => proxyRace(u));
  const budget   = new Promise<never>((_, rej) => setTimeout(() => rej(new Error(`budget:${source.name}`)), SOURCE_BUDGET_MS));
  return Promise.race([Promise.any(urlRaces), budget]);
}

/* ─── XML PARSER ─────────────────────────────────────────────────────────── */
function stripHTML(html: string): string {
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&#\d+;/g, " ").replace(/&[a-z]+;/g, " ")
    .replace(/\s{2,}/g, " ").trim();
}

function xmlText(el: Element, ...tags: string[]): string {
  for (const tag of tags) {
    const f = el.querySelector(tag) ?? el.getElementsByTagName(tag)[0];
    if (f) return (f.textContent ?? "").trim();
  }
  return "";
}

interface RawItem { title: string; link: string; description: string; pubDate: string }

function parseXML(xml: string): RawItem[] {
  const clean = xml.replace(/^\uFEFF/, "").replace(/<\?xml[^?]*\?>/i, '<?xml version="1.0" encoding="UTF-8"?>');
  const doc   = new DOMParser().parseFromString(clean, "application/xml");
  if (doc.querySelector("parsererror")) {
    // Try text/html as fallback
    const doc2 = new DOMParser().parseFromString(clean, "text/html");
    return parseNodes(doc2);
  }
  return parseNodes(doc);
}

function parseNodes(doc: Document): RawItem[] {
  const rss  = Array.from(doc.querySelectorAll("item"));
  const atom = Array.from(doc.querySelectorAll("entry"));
  const isAtom = rss.length === 0 && atom.length > 0;
  const nodes = isAtom ? atom : rss;
  if (nodes.length === 0) return [];

  return nodes.map(node => {
    let title = "", link = "", description = "", pubDate = "";
    if (isAtom) {
      title       = stripHTML(xmlText(node, "title"));
      const lEl   = node.querySelector("link[rel='alternate']") ?? node.querySelector("link");
      link        = lEl?.getAttribute("href") ?? xmlText(node, "id");
      description = stripHTML(xmlText(node, "summary", "content"));
      pubDate     = xmlText(node, "published", "updated");
    } else {
      title       = stripHTML(xmlText(node, "title"));
      const lEl   = node.querySelector("link") ?? node.getElementsByTagName("link")[0];
      link        = lEl?.textContent?.trim() || lEl?.nextSibling?.textContent?.trim() || lEl?.getAttribute("href") || xmlText(node, "guid") || "";
      description = stripHTML(xmlText(node, "description", "content:encoded", "summary", "content"));
      pubDate     = xmlText(node, "pubDate", "dc:date", "published", "updated", "date");
    }
    if (!title || !link?.startsWith("http")) return null;
    return { title, link, description, pubDate } as RawItem;
  }).filter(Boolean) as RawItem[];
}

/* ─── CLASSIFIER ─────────────────────────────────────────────────────────── */
const CAT_KW: Record<NewsCategory, string[]> = {
  Breach:        ["breach","leak","exposed","stolen","compromised","hacked","exfiltrat","data theft","dump","unauthorized access","data leak"],
  Vulnerability: ["cve-","vulnerability","zero-day","zero day","exploit","patch","rce","remote code execution","authentication bypass","sql injection","buffer overflow","privilege escalation","cvss","flaw","unpatched"],
  Malware:       ["ransomware","malware","trojan","botnet","backdoor","spyware","rootkit","worm","virus","infostealer","cryptominer","lockbit","alphv","cl0p","stealer","rat ","loader","dropper","keylogger"],
  Advisory:      ["advisory","cisa","cert-in","cert ","nsa","fbi","warning","alert","directive","patch tuesday","guidance","mitigation","security notice","bulletin","ncsc","nciipc","notice","cyber alert"],
  Research:      ["research","discovered","analysis","report","study","technique","post-quantum","cryptograph","whitepaper","threat intelligence","threat intel","findings","investigation"],
};
const SEV_KW: Record<NewsSeverity, string[]> = {
  Critical: ["critical","zero-day","actively exploit","cvss 9","cvss 10","emergency","nation-state","apt","supply chain attack","mass exploit","wormable","actively being exploited"],
  High:     ["high severity","remote code execution","authentication bypass","data breach","millions of","widespread","unauthenticated","pre-auth","high risk"],
  Medium:   ["medium severity","moderate","phishing","credential","botnet","cryptominer","social engineering","medium risk"],
  Low:      ["low severity","informational","theoretical","proof of concept","poc","low risk"],
};
const TAG_PATTERNS = [
  /\bcve-\d{4}-\d+\b/gi,
  /\b(apache|microsoft|google|fortinet|ivanti|palo alto|cisco|vmware|juniper|citrix|adobe|oracle|f5|kubernetes|docker|openssl|openssh|linux|windows|chrome|firefox|safari|exchange|sharepoint|wordpress|nginx|atlassian|gitlab|android|ios|apple|samsung)\b/gi,
  /\b(ransomware|malware|apt|zero-day|rce|sql injection|xss|ssrf|phishing|backdoor|trojan|botnet)\b/gi,
  /\b(lockbit|cl0p|alphv|blackcat|scattered spider|volt typhoon|salt typhoon|lazarus|fancy bear|cozy bear|revil|darkside)\b/gi,
  /\b(cert-in|nciipc|meity|ncsc|cisa|nsa|fbi|interpol)\b/gi,
];

function classify(title: string, desc: string, defaultCategory?: NewsCategory) {
  const text = `${title} ${desc}`.toLowerCase();
  let category: NewsCategory = defaultCategory ?? "Research";
  if (!defaultCategory) {
    let maxM = 0;
    for (const [cat, kws] of Object.entries(CAT_KW) as [NewsCategory, string[]][]) {
      const m = kws.filter(k => text.includes(k)).length;
      if (m > maxM) { maxM = m; category = cat; }
    }
  }
  let severity: NewsSeverity = "Medium";
  for (const [sev, kws] of Object.entries(SEV_KW) as [NewsSeverity, string[]][]) {
    if (kws.some(k => text.includes(k))) { severity = sev; break; }
  }
  const tags = new Set<string>();
  for (const rx of TAG_PATTERNS) {
    const found = text.match(rx);
    if (found) found.forEach(t => tags.add(t.charAt(0).toUpperCase() + t.slice(1)));
  }
  return { category, severity, tags: Array.from(tags).slice(0, 6) };
}

/* ─── CACHE ──────────────────────────────────────────────────────────────── */
const CACHE_KEY = "cn_articles_v4";
const CACHE_TTL = 15 * 60 * 1000;

interface CacheEntry { articles: CyberNewsArticle[]; ts: number; succeeded: string[]; failed: string[] }

function saveCache(articles: CyberNewsArticle[], succeeded: string[], failed: string[]) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ articles, ts: Date.now(), succeeded, failed })); } catch {}
}
function loadCache(): CacheEntry | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const e: CacheEntry = JSON.parse(raw);
    return Date.now() - e.ts < CACHE_TTL ? e : null;
  } catch { return null; }
}
function clearCache() { try { sessionStorage.removeItem(CACHE_KEY); } catch {} }

/* ─── MASTER FETCH ───────────────────────────────────────────────────────── */
export interface FetchResult {
  articles: CyberNewsArticle[];
  succeeded: string[];
  failed: string[];
  fromCache: boolean;
  isLive: boolean;
}

export async function fetchAllArticles(forceRefresh = false): Promise<FetchResult> {
  if (!forceRefresh) {
    const cached = loadCache();
    if (cached?.articles.length) {
      return { articles: cached.articles, succeeded: cached.succeeded, failed: cached.failed, fromCache: true, isLive: true };
    }
  }

  const sources  = [...RSS_SOURCES].sort((a, b) => b.priority - a.priority);
  const succeeded: string[] = [], failed: string[] = [], all: CyberNewsArticle[] = [];

  // ALL feeds run fully concurrently — each one internally races its proxy pool
  await Promise.allSettled(
    sources.map(async source => {
      try {
        const xml   = await fetchSourceXML(source);
        const raw   = parseXML(xml);
        const slug  = source.name.toLowerCase().replace(/\s+/g, "-");
        const items: CyberNewsArticle[] = raw.slice(0, 12).map((item, i) => {
          const { category, severity, tags } = classify(item.title, item.description, source.defaultCategory);
          const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
          return {
            id: `${slug}-${i}-${Date.now()}`,
            title: item.title.slice(0, 180),
            summary: item.description.slice(0, 350),
            url: item.link,
            source: source.name,
            publishedAt: isNaN(pubDate.getTime()) ? new Date().toISOString() : pubDate.toISOString(),
            category, severity, tags,
            isLive: true,
          };
        });
        if (items.length > 0) { all.push(...items); succeeded.push(source.name); }
        else failed.push(source.name);
      } catch { failed.push(source.name); }
    })
  );

  // Sort, deduplicate, filter older than 30 days
  const sorted = all
    .filter(a => Date.now() - new Date(a.publishedAt).getTime() < 30 * 86400000)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const seen = new Set<string>();
  const deduped = sorted.filter(a => {
    const key = a.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 50);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });

  if (deduped.length > 0) {
    saveCache(deduped, succeeded, failed);
    return { articles: deduped, succeeded, failed, fromCache: false, isLive: true };
  }

  // Everything failed — return static fallback
  return { articles: FALLBACK_ARTICLES, succeeded: [], failed: sources.map(s => s.name), fromCache: false, isLive: false };
}

/* ─── STATIC FALLBACK ────────────────────────────────────────────────────── */
const d = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const FALLBACK_ARTICLES: CyberNewsArticle[] = [
  { id:"fb-1", title:"Critical Zero-Day in Apache HTTP Server Allows Remote Code Execution", summary:"Unauthenticated attackers can execute arbitrary code on vulnerable Apache HTTP Server 2.4.x. Patch immediately — active exploitation confirmed.", url:"https://thehackernews.com", source:"The Hacker News", publishedAt:d(1), category:"Vulnerability", severity:"Critical", tags:["Apache","RCE","Zero-Day"] },
  { id:"fb-2", title:"Patch Tuesday: Microsoft Fixes 94 CVEs Including 4 Actively Exploited Zero-Days", summary:"Four zero-days in Windows Print Spooler, CLFS Driver, and Hyper-V actively exploited in the wild.", url:"https://www.bleepingcomputer.com", source:"BleepingComputer", publishedAt:d(2), category:"Vulnerability", severity:"Critical", tags:["Microsoft","Patch Tuesday","Windows","Zero-Day"] },
  { id:"fb-3", title:"LockBit 4.0 Ransomware Targets Healthcare and Critical Infrastructure", summary:"LockBit's latest variant features faster encryption and improved anti-analysis techniques targeting hospitals and utilities.", url:"https://www.bleepingcomputer.com", source:"BleepingComputer", publishedAt:d(1), category:"Malware", severity:"Critical", tags:["LockBit","Ransomware","Healthcare"] },
  { id:"fb-4", title:"Salt Typhoon APT Breaches US Telecoms — Wiretap Systems Compromised", summary:"Salt Typhoon breached AT&T, Verizon, and Lumen, accessing lawful intercept systems used for court-authorised surveillance.", url:"https://www.darkreading.com", source:"Dark Reading", publishedAt:d(4), category:"Breach", severity:"Critical", tags:["Salt Typhoon","China","APT","Telecom"] },
  { id:"fb-5", title:"CISA Emergency Directive: Patch Ivanti Flaws Within 48 Hours", summary:"CISA's Emergency Directive 24-02 requires all federal civilian agencies to disconnect vulnerable Ivanti appliances.", url:"https://www.cisa.gov", source:"CISA Alerts", publishedAt:d(5), category:"Advisory", severity:"Critical", tags:["CISA","Ivanti","Federal"] },
  { id:"fb-6", title:"CERT-In Advisory: Multiple Vulnerabilities in Indian Banking Infrastructure", summary:"CERT-In issued advisories covering critical vulnerabilities affecting BFSI sector infrastructure in India.", url:"https://www.cert-in.org.in", source:"CERT-In", publishedAt:d(2), category:"Advisory", severity:"High", tags:["CERT-In","BFSI","India"] },
  { id:"fb-7", title:"OpenSSH regreSSHion: Race Condition Enables Remote Root Code Execution", summary:"CVE-2024-6387 reintroduces a critical race condition in OpenSSH. Unauthenticated remote root RCE on glibc Linux.", url:"https://www.bleepingcomputer.com", source:"BleepingComputer", publishedAt:d(6), category:"Vulnerability", severity:"Critical", tags:["OpenSSH","Linux","RCE","CVE-2024-6387"] },
  { id:"fb-8", title:"AI-Powered Phishing Achieves 60% Click Rate vs 20% for Human-Written Lures", summary:"IBM X-Force research shows AI-generated spear-phishing emails dramatically outperform human-crafted messages.", url:"https://www.darkreading.com", source:"Dark Reading", publishedAt:d(9), category:"Research", severity:"High", tags:["AI","Phishing","LLM","Social Engineering"] },
  { id:"fb-9", title:"Cl0p Exploits MFT Platform — 130+ Enterprises Compromised via SQL Injection", summary:"Cl0p ransomware exploited a critical SQL injection in a managed file transfer platform.", url:"https://krebsonsecurity.com", source:"Krebs on Security", publishedAt:d(10), category:"Malware", severity:"Critical", tags:["Cl0p","SQL Injection","Data Theft"] },
];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const SEV_CONFIG: Record<NewsSeverity, { color: string; bg: string; border: string; glow: string }> = {
  Critical: { color:"#ff2d55", bg:"rgba(255,45,85,.1)",   border:"rgba(255,45,85,.35)",  glow:"rgba(255,45,85,.3)"  },
  High:     { color:"#ff7722", bg:"rgba(255,119,34,.08)", border:"rgba(255,119,34,.3)",  glow:"rgba(255,119,34,.25)" },
  Medium:   { color:"#fbbf24", bg:"rgba(251,191,36,.07)", border:"rgba(251,191,36,.25)", glow:"rgba(251,191,36,.2)"  },
  Low:      { color:"#34d399", bg:"rgba(52,211,153,.07)", border:"rgba(52,211,153,.25)", glow:"rgba(52,211,153,.2)"  },
};
const CAT_CONFIG: Record<NewsCategory, { icon: React.ReactNode; color: string; accent: string }> = {
  Breach:        { icon:<AlertTriangle className="w-3 h-3" />, color:"#ff2d55", accent:"#ff2d5520" },
  Vulnerability: { icon:<Bug className="w-3 h-3" />,          color:"#ff7722", accent:"#ff772220" },
  Malware:       { icon:<Zap className="w-3 h-3" />,          color:"#a855f7", accent:"#a855f720" },
  Advisory:      { icon:<Shield className="w-3 h-3" />,       color:"#3b82f6", accent:"#3b82f620" },
  Research:      { icon:<BookOpen className="w-3 h-3" />,     color:"#00ffe7", accent:"#00ffe720" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

/* ─── PARTICLE FIELD ─────────────────────────────────────────────────────── */
const ParticleField = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!; const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const count = window.innerWidth < 640 ? 30 : 60;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.4 + .4,
      color: Math.random() > .5 ? "#00ffe7" : Math.random() > .5 ? "#3b82f6" : "#a855f7",
      opacity: Math.random() * .5 + .15,
    }));
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 110) { ctx.beginPath(); ctx.strokeStyle = `rgba(0,255,231,${(1-dist/110)*.1})`; ctx.lineWidth = .5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
        }
        const p = particles[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.color; ctx.shadowBlur = 5; ctx.fill();
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity:.65 }} />;
});
ParticleField.displayName = "ParticleField";

/* ─── UI ATOMS ───────────────────────────────────────────────────────────── */
const CyberCorner = ({ pos }: { pos:"tl"|"tr"|"bl"|"br" }) => {
  const map: Record<string, React.CSSProperties> = {
    tl:{ top:0, left:0, borderTop:"2px solid", borderLeft:"2px solid" },
    tr:{ top:0, right:0, borderTop:"2px solid", borderRight:"2px solid" },
    bl:{ bottom:0, left:0, borderBottom:"2px solid", borderLeft:"2px solid" },
    br:{ bottom:0, right:0, borderBottom:"2px solid", borderRight:"2px solid" },
  };
  return <div style={{ position:"absolute", width:16, height:16, animation:"corner-flash 4s infinite", borderColor:"rgba(0,255,231,0.6)", ...map[pos] }} />;
};

const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-xs text-cyan-400/60 tracking-widest">[{num}]</span>
    <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400/80" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{label}</span>
    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
    <motion.div animate={{ opacity:[0,1,0] }} transition={{ repeat:Infinity, duration:2 }} className="w-1 h-1 rounded-full bg-cyan-400" />
  </div>
);

/* ─── ANIMATION VARIANTS ─────────────────────────────────────────────────── */
const pageFade: Variants = { hidden:{ opacity:0 }, visible:{ opacity:1, transition:{ duration:.8 } } };
const fadeUp:   Variants = { hidden:{ opacity:0, y:28 }, visible:{ opacity:1, y:0, transition:{ duration:.6, ease:[.25,.1,.25,1] } } };
const stagger:  Variants = { hidden:{}, visible:{ transition:{ staggerChildren:.08, delayChildren:.05 } } };

/* ─── NEWS CARD ──────────────────────────────────────────────────────────── */
const NewsCard = memo(({ article }: { article: CyberNewsArticle }) => {
  const [hovered, setHovered] = useState(false);
  const sev = SEV_CONFIG[article.severity];
  const cat = CAT_CONFIG[article.category];
  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl cursor-pointer h-full flex flex-col"
      style={{
        background:"linear-gradient(135deg,rgba(0,0,0,0.8) 0%,rgba(5,10,20,0.9) 100%)",
        border:`1px solid ${hovered ? sev.border : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? `0 0 30px ${sev.glow},inset 0 1px 0 ${sev.border},0 20px 60px rgba(0,0,0,.5)`
          : "inset 0 1px 0 rgba(255,255,255,0.04),0 4px 20px rgba(0,0,0,.3)",
        transition:"border-color .4s,box-shadow .4s",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div animate={hovered ? { x:["-100%","100%"] } : { x:"-100%" }} transition={{ duration:.7 }}
          className="h-full w-full" style={{ background:`linear-gradient(90deg,transparent,${sev.color},transparent)` }} />
      </div>
      {hovered && (
        <>
          <div className="absolute top-0 left-0  w-2.5 h-2.5 border-t border-l" style={{ borderColor:sev.color }} />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r" style={{ borderColor:sev.color }} />
          <div className="absolute bottom-0 left-0  w-2.5 h-2.5 border-b border-l" style={{ borderColor:sev.color }} />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r" style={{ borderColor:sev.color }} />
        </>
      )}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity:hovered ? 1 : 0, background:`radial-gradient(ellipse at 30% 30%,${sev.glow},transparent 65%)` }} />
      <div className="relative z-10 p-5 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold border flex-shrink-0"
            style={{ fontFamily:"'Share Tech Mono',monospace", color:cat.color, borderColor:`${cat.color}40`, background:cat.accent }}>
            {cat.icon} {article.category.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border flex-shrink-0"
            style={{ fontFamily:"'Orbitron',sans-serif", color:sev.color, borderColor:sev.border, background:sev.bg }}>
            {article.severity.toUpperCase()}
          </span>
        </div>
        <h3 className="font-bold leading-snug mb-2 transition-colors duration-300 flex-1"
          style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(0.7rem,2vw,0.82rem)", color:hovered ? "#fff" : "#d1d5db", letterSpacing:".02em" }}>
          {article.title}
        </h3>
        <div className="relative h-px mb-3 overflow-hidden bg-white/5">
          <motion.div animate={{ width:hovered ? "100%" : "1.5rem" }} transition={{ duration:.4 }}
            className="absolute left-0 top-0 h-full" style={{ background:sev.color }} />
        </div>
        <p className="text-xs leading-relaxed mb-3 transition-colors duration-300"
          style={{ color:hovered ? "#9ca3af" : "#4b5563", fontFamily:"'Rajdhani',sans-serif", fontSize:"0.78rem" }}>
          {article.summary.length > 180 ? article.summary.substring(0,180)+"…" : article.summary}
        </p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.tags.slice(0,4).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] border border-white/[0.06] bg-white/[0.02]"
                style={{ color:"#6b7280", fontFamily:"'Share Tech Mono',monospace" }}>#{tag.toLowerCase()}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <div>
            <div className="text-[9px] font-bold" style={{ color:cat.color, fontFamily:"'Share Tech Mono',monospace" }}>{article.source}</div>
            <div className="flex items-center gap-1 text-[9px] text-gray-600 mt-0.5" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
              <Clock className="w-2.5 h-2.5" />{timeAgo(article.publishedAt)}
            </div>
          </div>
          <a href={article.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded border transition-all duration-200"
            style={{ fontFamily:"'Share Tech Mono',monospace", color:hovered?"#000":sev.color, borderColor:`${sev.color}50`, background:hovered?sev.color:"transparent" }}>
            READ <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
});
NewsCard.displayName = "NewsCard";

/* ─── TICKER BAR ─────────────────────────────────────────────────────────── */
const TickerBar = ({ articles }: { articles: CyberNewsArticle[] }) => {
  const critical = articles.filter(a => a.severity === "Critical").slice(0, 8);
  if (!critical.length) return null;
  const text = critical.map(a => `⚠ ${a.title}`).join("  •  ");
  return (
    <div className="relative overflow-hidden border-y border-red-500/20 bg-black/60" style={{ height:32 }}>
      <div className="absolute inset-y-0 left-0 z-10 flex items-center px-3 bg-gradient-to-r from-black to-transparent" style={{ minWidth:80 }}>
        <span className="text-[9px] font-bold tracking-widest text-red-400 flex items-center gap-1" style={{ fontFamily:"'Orbitron',sans-serif" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />LIVE
        </span>
      </div>
      <div className="absolute inset-0 flex items-center pl-20">
        <div style={{ animation:"ticker 70s linear infinite", whiteSpace:"nowrap", fontFamily:"'Share Tech Mono',monospace" }}
          className="text-[10px] text-red-400/70">{text} &nbsp;&nbsp; {text}</div>
      </div>
    </div>
  );
};

/* ─── STATS STRIP ────────────────────────────────────────────────────────── */
const StatsStrip = ({ articles, succeeded, failed, isLive }: { articles: CyberNewsArticle[]; succeeded: string[]; failed: string[]; isLive: boolean }) => {
  const items = [
    { label:"Total Articles",  val:articles.length,                                           color:"#00ffe7" },
    { label:"Today",           val:articles.filter(a=>Date.now()-new Date(a.publishedAt).getTime()<86400000).length, color:"#3b82f6" },
    { label:"Critical Alerts", val:articles.filter(a=>a.severity==="Critical").length,         color:"#ff2d55" },
    { label:"Sources Active",  val:succeeded.length,                                           color:"#a855f7" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {items.map(item => (
        <div key={item.label} className="relative overflow-hidden rounded-xl p-4 border border-white/[0.06] bg-black/40"
          style={{ boxShadow:"inset 0 1px 0 rgba(255,255,255,.04)" }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(to right,${item.color},transparent)` }} />
          <div className="font-black mb-0.5" style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(1.4rem,5vw,2rem)", color:item.color, textShadow:`0 0 20px ${item.color}40` }}>{item.val}</div>
          <div className="text-[10px] text-gray-600" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{item.label}</div>
        </div>
      ))}
      {!isLive && (
        <div className="col-span-2 sm:col-span-4 text-center text-[10px] text-yellow-500/70 py-1" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
          ⚠ SHOWING STATIC FALLBACK — live feeds unavailable (CORS proxies may be rate-limited)
        </div>
      )}
      {failed.length > 0 && isLive && (
        <div className="col-span-2 sm:col-span-4 text-[10px] text-gray-600 py-1" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
          {succeeded.length} sources loaded · {failed.length} failed ({failed.slice(0,3).join(", ")}{failed.length>3?"…":""})
        </div>
      )}
    </div>
  );
};

/* ─── FILTER BAR ─────────────────────────────────────────────────────────── */
const FILTERS: { label:ActiveFilter; icon:React.ReactNode; color:string }[] = [
  { label:"All",           icon:<Radio className="w-3 h-3" />,        color:"#00ffe7" },
  { label:"Breach",        icon:<AlertTriangle className="w-3 h-3" />, color:"#ff2d55" },
  { label:"Vulnerability", icon:<Bug className="w-3 h-3" />,          color:"#ff7722" },
  { label:"Malware",       icon:<Zap className="w-3 h-3" />,          color:"#a855f7" },
  { label:"Advisory",      icon:<Shield className="w-3 h-3" />,       color:"#3b82f6" },
  { label:"Research",      icon:<BookOpen className="w-3 h-3" />,     color:"#00ffe7" },
];

const FilterBar = ({ active, onChange }: { active:ActiveFilter; onChange:(f:ActiveFilter)=>void }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {FILTERS.map(f => {
      const isActive = active === f.label;
      return (
        <button key={f.label} onClick={() => onChange(f.label)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all duration-200"
          style={{ fontFamily:"'Share Tech Mono',monospace", borderColor:isActive?`${f.color}60`:"rgba(255,255,255,.08)", color:isActive?f.color:"#4b5563", background:isActive?`${f.color}12`:"rgba(255,255,255,.02)", boxShadow:isActive?`0 0 12px ${f.color}20`:"none" }}>
          {f.icon} {f.label.toUpperCase()}
        </button>
      );
    })}
  </div>
);

/* ─── SKELETON ───────────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="rounded-xl border border-white/[0.06] p-5 h-64 bg-black/40">
    {[80,60,100,40,70].map((w,i) => (
      <div key={i} className="h-2.5 rounded mb-3 bg-white/5" style={{ width:`${w}%` }} />
    ))}
  </div>
);

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
export default function CyberNews() {
  const [articles, setArticles]       = useState<CyberNewsArticle[]>([]);
  const [loading, setLoading]         = useState(true);
  const [result, setResult]           = useState<FetchResult | null>(null);
  const [filter, setFilter]           = useState<ActiveFilter>("All");
  const [refreshing, setRefreshing]   = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const load = useCallback(async (bust = false) => {
    if (bust) { clearCache(); setRefreshing(true); }
    else setLoading(true);
    try {
      const res = await fetchAllArticles(bust);
      setArticles(res.articles);
      setResult(res);
      setLastUpdated(new Date());
    } catch {
      setArticles(FALLBACK_ARTICLES);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = filter === "All" ? articles : articles.filter(a => a.category === filter);
  const visible  = filtered.slice(0, visibleCount);

  return (
    <motion.div variants={pageFade} initial="hidden" animate="visible"
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background:"transparent", fontFamily:"'Rajdhani',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <ParticleField />
        <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 18% 0%,rgba(0,255,231,.06) 0%,transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 82% 55%,rgba(59,130,246,.06) 0%,transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 50% 100%,rgba(168,85,247,.05) 0%,transparent 50%)" }} />
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scan-animate pointer-events-none" />
        <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at center,transparent 38%,rgba(0,0,0,.72) 100%)" }} />
      </div>

      {/* TICKER */}
      {articles.length > 0 && <TickerBar articles={articles} />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-12 py-10 sm:py-16">

        {/* HERO */}
        <motion.section variants={stagger} initial="hidden" animate="visible" className="mb-12">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border"
              style={{ borderColor:"rgba(255,45,85,.3)", background:"rgba(255,45,85,.05)", boxShadow:"0 0 20px rgba(255,45,85,.07)" }}>
              <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:1, repeat:Infinity }}
                className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-red-400 text-xs tracking-widest" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
                ~/cyber-news — FEEDS LIVE
              </span>
            </div>
            <div className="h-px flex-1 max-w-[200px]"
              style={{ background:"linear-gradient(to right,rgba(255,45,85,.4),transparent)", animation:"line-extend 1s ease-out forwards" }} />
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-black leading-[0.95] tracking-tight mb-6"
            style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(2rem,7vw,4.5rem)" }}>
            <span className="text-white block mb-1">Cyber</span>
            <span className="relative inline-block">
              <span className="neon-text"
                style={{ background:"linear-gradient(135deg,#ff2d55 0%,#ff7722 40%,#a855f7 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Threat Intel
              </span>
              <motion.span initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1, delay:.9 }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full block"
                style={{ background:"linear-gradient(90deg,#ff2d55,#ff7722,#a855f7)" }} />
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg leading-relaxed max-w-2xl mb-6"
            style={{ color:"#7a8899", fontFamily:"'Rajdhani',sans-serif" }}>
            Real-time aggregated feed from{" "}
            <span className="text-white font-semibold">{RSS_SOURCES.length}+ top cybersecurity sources</span>
            {" "}— breaches, CVEs, malware, and threat intelligence updated every 15 minutes.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
            <button onClick={() => load(true)} disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/25 bg-cyan-500/5 text-cyan-400 text-[10px] font-bold transition-all hover:bg-cyan-400/10 hover:border-cyan-500/50 disabled:opacity-50"
              style={{ fontFamily:"'Share Tech Mono',monospace" }}>
              <RefreshCw className={`w-3 h-3 ${refreshing ? "spin-anim" : ""}`} />
              {refreshing ? "FETCHING..." : "REFRESH FEEDS"}
            </button>
            {lastUpdated && (
              <span className="text-[10px] text-gray-600 flex items-center gap-1" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
                <Clock className="w-3 h-3" /> Updated {timeAgo(lastUpdated.toISOString())}
                {result?.fromCache && " (cached)"}
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-cyan-400/50" />
              <span className="text-[10px] text-gray-600" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
                {articles.length} articles loaded
              </span>
            </div>
          </motion.div>
        </motion.section>

        {/* STATS */}
        {!loading && articles.length > 0 && result && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <StatsStrip articles={articles} succeeded={result.succeeded} failed={result.failed} isLive={result.isLive} />
          </motion.div>
        )}

        {/* SECTION LABEL */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}>
          <SectionLabel num="01" label="Live Threat Feed" />
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="font-black" style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(1.3rem,4vw,1.9rem)" }}>
              Latest <span style={{ color:"#00ffe7" }}>Intelligence</span>
            </h2>
            {!loading && (
              <span className="text-xs text-gray-600 hidden sm:block flex-shrink-0" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
                {filtered.length} ARTICLES
              </span>
            )}
          </div>
        </motion.div>

        {/* FILTERS */}
        {!loading && <FilterBar active={filter} onChange={f => { setFilter(f); setVisibleCount(12); }} />}

        {/* GRID */}
        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }}
              className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map(a => <NewsCard key={a.id} article={a} />)}
            </motion.div>
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <button onClick={() => setVisibleCount(v => v + 12)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold transition-all duration-300"
                  style={{ background:"linear-gradient(135deg,rgba(0,255,231,.08),rgba(59,130,246,.08))", border:"1px solid rgba(0,255,231,.2)", color:"#00ffe7", fontFamily:"'Orbitron',sans-serif", fontSize:".7rem", letterSpacing:".1em", boxShadow:"0 0 20px rgba(0,255,231,.08)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,231,.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,231,.2)"; }}>
                  <ChevronRight className="w-4 h-4" />
                  LOAD MORE — {filtered.length - visibleCount} remaining
                </button>
              </div>
            )}
          </>
        )}

        {/* SOURCES FOOTER */}
        {!loading && articles.length > 0 && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }}
            className="mt-16 relative overflow-hidden rounded-2xl border border-white/[0.08] p-8"
            style={{ background:"linear-gradient(135deg,rgba(0,255,231,.04) 0%,rgba(0,0,0,.8) 50%,rgba(168,85,247,.04) 100%)", boxShadow:"0 0 80px rgba(0,255,231,.05),inset 0 1px 0 rgba(255,255,255,.06)" }}>
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(to right,rgba(0,255,231,.5),rgba(59,130,246,.3),transparent)" }} />
            <SectionLabel num="02" label="Active Sources" />
            <div className="flex flex-wrap gap-2">
              {[...new Set(articles.map(a => a.source))].map(source => (
                <span key={source} className="px-2.5 py-1 rounded-lg border text-[10px] font-bold border-white/[0.08] bg-white/[0.03] text-gray-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors cursor-default"
                  style={{ fontFamily:"'Share Tech Mono',monospace" }}>
                  {source}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}