// src/pages/Cyber_News.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Cybersecurity News Feed — Redesigned to match Home.tsx aesthetic
// Fonts: Orbitron, Share Tech Mono, Rajdhani (same as Home)
// Theme: Dark cyberpunk, neon cyan/blue/purple, matrix-style effects
// RSS: Parallel proxy racing with validation — no sequential waiting
// ─────────────────────────────────────────────────────────────────────────────

import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, useRef, memo } from "react";
import {
  Rss, Shield, AlertTriangle, Bug, RefreshCw, ExternalLink,
  Clock, Newspaper, Globe, BookOpen, AlertCircle, Terminal,
  Flame, CalendarDays, TrendingUp, Wifi, WifiOff, ChevronRight,
  Eye, Loader2, X, Filter, ChevronDown, RotateCcw, Radio, Activity,
  Zap, ArrowUpRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES — matching Home.tsx exactly
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  :root {
    --cyan: #00ffe7;
    --cyan-dim: #00ffe740;
    --blue: #3b82f6;
    --purple: #a855f7;
    --red: #ff2d55;
    --bg: #020509;
  }

  @keyframes scanline {
    0%   { transform: translateY(-100vh); }
    100% { transform: translateY(100vh); }
  }
  @keyframes flicker {
    0%,100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.4; }
    94% { opacity: 1; }
    96% { opacity: 0.6; }
    97% { opacity: 1; }
  }
  @keyframes neon-pulse {
    0%,100% { text-shadow: 0 0 4px var(--cyan), 0 0 10px var(--cyan), 0 0 20px var(--cyan-dim); }
    50%      { text-shadow: 0 0 8px var(--cyan), 0 0 20px var(--cyan), 0 0 40px var(--cyan-dim), 0 0 60px var(--cyan-dim); }
  }
  @keyframes border-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes corner-flash {
    0%,90%,100% { opacity: 0; }
    92%,98%     { opacity: 1; }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .neon-text    { animation: neon-pulse 3s ease-in-out infinite; }
  .flicker      { animation: flicker 8s infinite; }
  .scan-animate { animation: scanline 8s linear infinite; }
  .marquee-t    { display: flex; width: max-content; animation: marquee 44s linear infinite; will-change: transform; }
  @media(max-width:480px){ .marquee-t { animation-duration: 28s; } }

  .cyber-scrollbar::-webkit-scrollbar { width: 4px; }
  .cyber-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .cyber-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,255,231,0.25); border-radius: 4px; }
  .cyber-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(0,255,231,0.25) transparent; }

  .fluid-hero { font-size: clamp(1.75rem, 5.5vw, 3.75rem); }
`;

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
export type NewsCategory = "Breach" | "Vulnerability" | "Malware" | "Advisory" | "Research";
export type NewsSeverity = "Critical" | "High" | "Medium" | "Low";

export interface CyberNewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  category: NewsCategory;
  tags: string[];
  severity: NewsSeverity;
  isLive?: boolean;
}

export interface RSSSource {
  name: string;
  url: string;
  altUrls?: string[];
  color: string;
  dot: string;
  region: "global" | "india";
  enabled: boolean;
  defaultCategory?: NewsCategory;
}

export interface FetchResult {
  articles: CyberNewsArticle[];
  succeededFeeds: string[];
  failedFeeds: string[];
  fromCache: boolean;
  isLive: boolean;
}

/* ─────────────────────────────────────────────────────────────
   RSS SOURCES
───────────────────────────────────────────────────────────── */
export const RSS_SOURCES: RSSSource[] = [
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", color: "text-red-400", dot: "bg-red-400", region: "global", enabled: true },
  { name: "SecurityWeek", url: "https://feeds.feedburner.com/Securityweek", color: "text-orange-400", dot: "bg-orange-400", region: "global", enabled: true },
  { name: "Help Net Security", url: "https://feeds2.feedburner.com/HelpNetSecurity", color: "text-yellow-400", dot: "bg-yellow-400", region: "global", enabled: true },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/", color: "text-purple-400", dot: "bg-purple-400", region: "global", enabled: true },
  { name: "Rapid7 Blog", url: "https://blog.rapid7.com/rss/", altUrls: ["https://www.rapid7.com/blog/rss/"], color: "text-blue-400", dot: "bg-blue-400", region: "global", enabled: true, defaultCategory: "Vulnerability" },
  { name: "CVEFeed", url: "https://cvefeed.io/rssfeed/severity/high.xml", altUrls: ["https://cvefeed.io/rssfeed/latest.xml"], color: "text-red-300", dot: "bg-red-300", region: "global", enabled: true, defaultCategory: "Vulnerability" },
  { name: "Packet Storm", url: "https://feeds.feedburner.com/packetstormsecurity/IIOJ", altUrls: ["https://packetstormsecurity.com/feeds/news.xml"], color: "text-rose-400", dot: "bg-rose-400", region: "global", enabled: true, defaultCategory: "Vulnerability" },
  { name: "CERT-In", url: "https://www.cert-in.org.in/RSS.jsp", altUrls: ["https://cert-in.org.in/RSS.jsp"], color: "text-green-400", dot: "bg-green-400", region: "india", enabled: true, defaultCategory: "Advisory" },
  { name: "CyberPeace", url: "https://www.cyberpeace.org/feed/", altUrls: ["https://cyberpeace.org/?feed=rss2"], color: "text-teal-400", dot: "bg-teal-400", region: "india", enabled: true },
  { name: "DSCI", url: "https://www.dsci.in/feed/", altUrls: ["https://dsci.in/?feed=rss2"], color: "text-cyan-400", dot: "bg-cyan-400", region: "india", enabled: true },
  { name: "Crus.live", url: "https://crus.live/rss.xml", color: "text-indigo-400", dot: "bg-indigo-400", region: "india", enabled: true },
];

/* ─────────────────────────────────────────────────────────────
   CONFIG MAPS
───────────────────────────────────────────────────────────── */
const categoryConfig: Record<NewsCategory, { icon: any; color: string; bg: string; border: string; label: string; accent: string }> = {
  Breach:        { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-400/40", label: "Data Breach",    accent: "#f97316" },
  Vulnerability: { icon: Bug,           color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-400/40",    label: "Vulnerability", accent: "#ef4444" },
  Malware:       { icon: Flame,         color: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-400/40",   label: "Malware",       accent: "#fb7185" },
  Advisory:      { icon: Shield,        color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-400/40", label: "Advisory",      accent: "#eab308" },
  Research:      { icon: BookOpen,      color: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-400/40",   label: "Research",      accent: "#00ffe7" },
};

const severityConfig: Record<NewsSeverity, { color: string; bg: string; border: string; dot: string; bar: string; accent: string }> = {
  Critical: { color: "text-red-300",    bg: "bg-red-500/15",    border: "border-red-400/50",    dot: "bg-red-400",    bar: "from-red-500 via-rose-400 to-red-500",        accent: "#ef4444" },
  High:     { color: "text-orange-300", bg: "bg-orange-500/15", border: "border-orange-400/50", dot: "bg-orange-400", bar: "from-orange-500 via-amber-400 to-orange-500", accent: "#f97316" },
  Medium:   { color: "text-yellow-300", bg: "bg-yellow-500/15", border: "border-yellow-400/50", dot: "bg-yellow-400", bar: "from-yellow-500 via-amber-400 to-yellow-500", accent: "#eab308" },
  Low:      { color: "text-green-300",  bg: "bg-green-500/15",  border: "border-green-400/50",  dot: "bg-green-400",  bar: "from-cyan-500 via-blue-400 to-cyan-500",       accent: "#22c55e" },
};

const DAILY_FEED_SIZE = 9;

/* ─────────────────────────────────────────────────────────────
   RSS FETCH ENGINE — parallel proxy racing
───────────────────────────────────────────────────────────── */
interface ProxyDef { id: string; build: (u: string) => string; extract: (r: Response) => Promise<string>; }

const PROXIES: ProxyDef[] = [
  { id: "allorigins-get",  build: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}&t=${Date.now()}`, extract: async (r) => { const j = await r.json(); return j?.contents ?? ""; } },
  { id: "allorigins-raw",  build: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}&t=${Date.now()}`, extract: (r) => r.text() },
  { id: "corsproxy",       build: (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`, extract: (r) => r.text() },
  { id: "codetabs",        build: (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`, extract: (r) => r.text() },
  { id: "thingproxy",      build: (u) => `https://thingproxy.freeboard.io/fetch/${u}`, extract: (r) => r.text() },
];

function isValidRSS(text: string): boolean {
  if (!text || text.length < 100) return false;
  const t = text.trimStart();
  return (t.startsWith("<?xml") || t.startsWith("<rss") || t.startsWith("<feed")) &&
    (t.includes("<item>") || t.includes("<item ") || t.includes("<entry>") || t.includes("<entry "));
}

async function fetchWithTimeout(url: string, ms = 8000): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/rss+xml, application/xml, text/xml, */*" } });
  } finally { clearTimeout(timer); }
}

async function fetchSourceXML(source: RSSSource): Promise<string | null> {
  const urls = [source.url, ...(source.altUrls ?? [])];

  // Try direct fetch first
  for (const url of urls) {
    try {
      const r = await fetchWithTimeout(url, 5000);
      if (r.ok) { const t = await r.text(); if (isValidRSS(t)) return t; }
    } catch { /* CORS blocked — try proxies */ }
  }

  // Race all proxies × all URLs in parallel
  const allRaces = urls.flatMap((url) =>
    PROXIES.map((proxy, idx) =>
      new Promise<string>((resolve, reject) => {
        setTimeout(async () => {
          try {
            const r = await fetchWithTimeout(proxy.build(url), 8000);
            if (!r.ok) { reject(new Error(`HTTP ${r.status}`)); return; }
            const text = await proxy.extract(r);
            if (isValidRSS(text)) resolve(text);
            else reject(new Error("invalid RSS"));
          } catch (e) { reject(e); }
        }, idx * 200); // stagger 200ms
      })
    )
  );

  try { return await Promise.any(allRaces); }
  catch { return null; }
}

/* ─────────────────────────────────────────────────────────────
   XML PARSER
───────────────────────────────────────────────────────────── */
function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&#\d+;/g, " ")
    .replace(/\s{2,}/g, " ").trim();
}

function xmlText(el: Element, ...tags: string[]): string {
  for (const tag of tags) {
    const found = el.querySelector(tag) ?? el.getElementsByTagName(tag)[0];
    if (found) return (found.textContent ?? "").trim();
  }
  return "";
}

interface RawItem { title: string; link: string; description: string; pubDate: string; }

function parseRSS(xml: string): RawItem[] {
  try {
    const cleaned = xml.replace(/^\uFEFF/, "");
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleaned, "application/xml");
    const rssItems = Array.from(doc.querySelectorAll("item"));
    const atomItems = Array.from(doc.querySelectorAll("entry"));
    const isAtom = rssItems.length === 0 && atomItems.length > 0;
    const nodes = isAtom ? atomItems : rssItems;
    if (nodes.length === 0) return [];
    return nodes.slice(0, 20).map((node): RawItem | null => {
      let title = "", link = "", description = "", pubDate = "";
      if (isAtom) {
        title = stripHtml(xmlText(node, "title"));
        const linkEl = node.querySelector("link[rel='alternate']") ?? node.querySelector("link");
        link = linkEl?.getAttribute("href") ?? xmlText(node, "id");
        description = stripHtml(xmlText(node, "summary", "content"));
        pubDate = xmlText(node, "published", "updated");
      } else {
        title = stripHtml(xmlText(node, "title"));
        const linkEl = node.querySelector("link") ?? node.getElementsByTagName("link")[0];
        link = linkEl?.textContent?.trim() || linkEl?.getAttribute("href") || xmlText(node, "guid") || "";
        description = stripHtml(xmlText(node, "description", "content:encoded", "summary"));
        pubDate = xmlText(node, "pubDate", "dc:date", "published", "updated");
      }
      if (!title || !link?.startsWith("http")) return null;
      return { title, link, description, pubDate };
    }).filter((x): x is RawItem => x !== null);
  } catch { return []; }
}

/* ─────────────────────────────────────────────────────────────
   CLASSIFIER
───────────────────────────────────────────────────────────── */
const CAT_KW: Record<NewsCategory, string[]> = {
  Breach: ["breach", "leak", "exposed", "stolen", "compromised", "hacked", "data theft", "exfiltrat", "dump", "unauthorized access"],
  Vulnerability: ["cve-", "vulnerability", "zero-day", "zero day", "exploit", "patch", "rce", "authentication bypass", "sql injection", "buffer overflow", "privilege escalation", "flaw"],
  Malware: ["ransomware", "malware", "trojan", "botnet", "backdoor", "spyware", "rootkit", "worm", "virus", "infostealer", "cryptominer", "lockbit", "stealer", "rat ", "loader", "dropper"],
  Advisory: ["advisory", "cisa", "cert-in", "cert ", "nsa", "fbi", "warning", "alert", "directive", "patch tuesday", "guidance", "mitigation", "bulletin", "ncsc", "notice"],
  Research: ["research", "discovered", "analysis", "report", "study", "technique", "cryptograph", "academic", "whitepaper", "threat intelligence", "findings", "investigation"],
};
const SEV_KW: Record<NewsSeverity, string[]> = {
  Critical: ["critical", "zero-day", "actively exploit", "cvss 9", "cvss 10", "emergency", "nation-state", "apt", "supply chain attack", "mass exploit", "wormable"],
  High: ["high severity", "remote code execution", "authentication bypass", "data breach", "millions of", "widespread", "unauthenticated", "high risk"],
  Medium: ["medium severity", "moderate", "phishing", "credential stuffing", "botnet", "social engineering"],
  Low: ["low severity", "informational", "theoretical", "proof of concept", "poc"],
};

function classifyArticle(title: string, desc: string, defaultCategory?: NewsCategory): { category: NewsCategory; severity: NewsSeverity; tags: string[] } {
  const text = `${title} ${desc}`.toLowerCase();
  let category: NewsCategory = defaultCategory ?? "Research";
  if (!defaultCategory) {
    let maxM = 0;
    for (const [cat, kws] of Object.entries(CAT_KW) as [NewsCategory, string[]][]) {
      const m = kws.filter((k) => text.includes(k)).length;
      if (m > maxM) { maxM = m; category = cat; }
    }
  }
  let severity: NewsSeverity = "Medium";
  for (const [sev, kws] of Object.entries(SEV_KW) as [NewsSeverity, string[]][]) {
    if (kws.some((k) => text.includes(k))) { severity = sev; break; }
  }
  const tagPatterns = [/\bcve-\d{4}-\d+\b/gi, /\b(apache|microsoft|google|cisco|vmware|oracle|linux|windows|chrome|android|ios|apple)\b/gi, /\b(ransomware|malware|apt|zero-day|rce|phishing|backdoor|botnet)\b/gi];
  const tags: string[] = [];
  for (const rx of tagPatterns) { const f = text.match(rx); if (f) tags.push(...f.map((t) => t.charAt(0).toUpperCase() + t.slice(1))); }
  return { category, severity, tags: Array.from(new Set(tags)).slice(0, 6) };
}

function normalizeDate(raw: string): string {
  if (!raw) return new Date().toISOString();
  try { const d = new Date(raw.trim()); if (!isNaN(d.getTime())) return d.toISOString(); } catch { }
  return new Date().toISOString();
}

/* ─────────────────────────────────────────────────────────────
   CACHE
───────────────────────────────────────────────────────────── */
const CACHE_KEY = "cyber_news_v7";
const CACHE_TTL = 15 * 60 * 1000;
interface CacheEntry { articles: CyberNewsArticle[]; ts: number; succeededFeeds: string[]; failedFeeds: string[]; }

function saveCache(articles: CyberNewsArticle[], s: string[], f: string[]) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ articles, ts: Date.now(), succeededFeeds: s, failedFeeds: f })); } catch { }
}
function loadCache(): CacheEntry | null {
  try { const r = sessionStorage.getItem(CACHE_KEY); if (!r) return null; const e: CacheEntry = JSON.parse(r); return Date.now() - e.ts < CACHE_TTL ? e : null; } catch { return null; }
}
export function clearCache() { try { sessionStorage.removeItem(CACHE_KEY); } catch { } }
export function getCacheStatus(): { cached: boolean; age: number } {
  try { const r = sessionStorage.getItem(CACHE_KEY); if (!r) return { cached: false, age: 0 }; const e: CacheEntry = JSON.parse(r); const age = Date.now() - e.ts; return { cached: age < CACHE_TTL, age }; } catch { return { cached: false, age: 0 }; }
}

/* ─────────────────────────────────────────────────────────────
   MASTER FETCH
───────────────────────────────────────────────────────────── */
async function fetchOneFeed(source: RSSSource): Promise<CyberNewsArticle[]> {
  const xml = await fetchSourceXML(source);
  if (!xml) return [];
  const raw = parseRSS(xml);
  const slug = source.name.toLowerCase().replace(/\s+/g, "-");
  return raw.map((item, i): CyberNewsArticle => {
    const { category, severity, tags } = classifyArticle(item.title, item.description, source.defaultCategory);
    return { id: `${slug}-${i}-${Date.now()}`, title: item.title.slice(0, 180), summary: item.description.slice(0, 350), url: item.link, source: source.name, publishedAt: normalizeDate(item.pubDate), category, severity, tags: tags.length ? tags : ["Cybersecurity"], isLive: true };
  });
}

export async function fetchAllRSSArticles(forceRefresh = false): Promise<FetchResult> {
  if (!forceRefresh) {
    const cached = loadCache();
    if (cached?.articles.length) return { articles: cached.articles, succeededFeeds: cached.succeededFeeds, failedFeeds: cached.failedFeeds, fromCache: true, isLive: true };
  }
  const enabled = RSS_SOURCES.filter((s) => s.enabled);
  const succeeded: string[] = [], failed: string[] = [], all: CyberNewsArticle[] = [];
  await Promise.allSettled(enabled.map(async (source) => {
    try {
      const articles = await fetchOneFeed(source);
      if (articles.length) { all.push(...articles); succeeded.push(source.name); }
      else failed.push(source.name);
    } catch { failed.push(source.name); }
  }));
  const seen = new Set<string>();
  const deduped = all
    .filter((a) => { const key = a.title.toLowerCase().slice(0, 55); if (seen.has(key)) return false; seen.add(key); return true; })
    .filter((a) => a.source === "Crus.live" || Date.now() - new Date(a.publishedAt).getTime() < 30 * 86400000)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  if (deduped.length) { saveCache(deduped, succeeded, failed); return { articles: deduped, succeededFeeds: succeeded, failedFeeds: failed, fromCache: false, isLive: true }; }
  return { articles: FALLBACK_ARTICLES, succeededFeeds: [], failedFeeds: failed, fromCache: false, isLive: false };
}

/* ─────────────────────────────────────────────────────────────
   FALLBACK ARTICLES
───────────────────────────────────────────────────────────── */
const d = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const FALLBACK_ARTICLES: CyberNewsArticle[] = [
  { id: "fb-v-001", title: "Critical Zero-Day in Apache HTTP Server Allows Remote Code Execution", summary: "Unauthenticated attackers can execute arbitrary code on vulnerable Apache HTTP Server 2.4.x systems. Patch immediately — active exploitation confirmed in the wild.", url: "https://thehackernews.com", source: "The Hacker News", publishedAt: d(1), category: "Vulnerability", tags: ["Apache", "RCE", "Zero-Day"], severity: "Critical" },
  { id: "fb-v-002", title: "Patch Tuesday: Microsoft Fixes 94 CVEs Including 4 Actively Exploited Zero-Days", summary: "Four zero-days in Windows Print Spooler, CLFS Driver, and Hyper-V are actively exploited in the wild. Immediate patching is strongly advised for all enterprise environments.", url: "https://www.bleepingcomputer.com", source: "The Hacker News", publishedAt: d(2), category: "Vulnerability", tags: ["Microsoft", "Patch Tuesday", "Windows", "Zero-Day"], severity: "Critical" },
  { id: "fb-m-001", title: "LockBit 4.0 Ransomware Targets Healthcare and Critical Infrastructure", summary: "LockBit's latest variant features faster encryption and improved anti-analysis techniques, specifically targeting healthcare organizations and critical infrastructure providers.", url: "https://www.bleepingcomputer.com", source: "SecurityWeek", publishedAt: d(1), category: "Malware", tags: ["LockBit", "Ransomware", "Healthcare"], severity: "Critical" },
  { id: "fb-b-001", title: "National Public Data Breach Exposes 2.9 Billion Records Including SSNs", summary: "A massive data broker breach exposed nearly 3 billion records including Social Security Numbers, addresses, and phone numbers of US citizens.", url: "https://krebsonsecurity.com", source: "Krebs on Security", publishedAt: d(3), category: "Breach", tags: ["Data Broker", "SSN", "PII", "Dark Web"], severity: "Critical" },
  { id: "fb-b-003", title: "Salt Typhoon APT Breaches US Telecoms — Wiretap Systems Compromised", summary: "The Salt Typhoon APT group linked to China breached AT&T, Verizon, and Lumen Technologies, accessing lawful intercept systems used for government wiretaps.", url: "https://www.darkreading.com", source: "Help Net Security", publishedAt: d(4), category: "Breach", tags: ["Salt Typhoon", "China", "APT", "Telecom"], severity: "Critical" },
  { id: "fb-a-001", title: "CISA Emergency Directive: Patch Ivanti Flaws Within 48 Hours", summary: "CISA's Emergency Directive 24-02 requires all federal civilian agencies to disconnect vulnerable Ivanti Connect Secure and Policy Secure appliances immediately.", url: "https://www.cisa.gov", source: "CERT-In", publishedAt: d(5), category: "Advisory", tags: ["CISA", "Ivanti", "Federal", "Emergency Directive"], severity: "Critical" },
  { id: "fb-v-006", title: "OpenSSH regreSSHion: Race Condition Enables Remote Root Code Execution", summary: "CVE-2024-6387 reintroduces a critical race condition in OpenSSH. Unauthenticated remote root RCE is possible on glibc Linux systems — millions of servers affected.", url: "https://www.bleepingcomputer.com", source: "Rapid7 Blog", publishedAt: d(6), category: "Vulnerability", tags: ["OpenSSH", "Linux", "RCE", "Race Condition"], severity: "Critical" },
  { id: "fb-b-005", title: "XZ Utils SSH Backdoor: Multi-Year Supply Chain Attack Discovered", summary: "A multi-year supply chain attack introduced a backdoor into XZ Utils 5.6.0/5.6.1 specifically targeting OpenSSH on systemd-based Linux distributions.", url: "https://www.schneier.com", source: "SecurityWeek", publishedAt: d(7), category: "Breach", tags: ["XZ Utils", "Supply Chain", "SSH", "Backdoor", "Linux"], severity: "Critical" },
  { id: "fb-r-001", title: "NIST Finalizes Post-Quantum Cryptography Standards: ML-KEM, ML-DSA, SLH-DSA", summary: "NIST published FIPS 203, 204, and 205 — the world's first post-quantum cryptographic standards designed to resist attacks from future quantum computers.", url: "https://nvd.nist.gov", source: "Help Net Security", publishedAt: d(8), category: "Research", tags: ["Post-Quantum", "PQC", "NIST", "ML-KEM", "Cryptography"], severity: "Medium" },
];

export function getDailyArticles(all: CyberNewsArticle[], count = 9): CyberNewsArticle[] {
  if (!all.length) return [];
  const seed = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const shuffled = [...all].sort((a, b) => { const ha = (a.id.charCodeAt(0) * 31 + seed * 7) % all.length; const hb = (b.id.charCodeAt(0) * 31 + seed * 7) % all.length; return ha - hb; });
  const crits = shuffled.filter((a) => a.severity === "Critical"), rest = shuffled.filter((a) => a.severity !== "Critical");
  return [...crits, ...rest].slice(0, count);
}

/* ─────────────────────────────────────────────────────────────
   TIME HELPERS
───────────────────────────────────────────────────────────── */
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}
function formatDate(iso: string): string { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
function getDaysAgo(iso: string): number { return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); }
function groupByDate(articles: CyberNewsArticle[]): Record<string, CyberNewsArticle[]> {
  const groups: Record<string, CyberNewsArticle[]> = {};
  const ORDER = ["Today", "Yesterday", "This Week", "This Month", "Older"];
  articles.forEach((a) => {
    const d2 = getDaysAgo(a.publishedAt);
    const key = d2 === 0 ? "Today" : d2 === 1 ? "Yesterday" : d2 <= 7 ? "This Week" : d2 <= 30 ? "This Month" : "Older";
    if (!groups[key]) groups[key] = [];
    groups[key].push(a);
  });
  const out: Record<string, CyberNewsArticle[]> = {};
  ORDER.forEach((k) => { if (groups[k]) out[k] = groups[k]; });
  return out;
}
function getSecondsUntilMidnight(): number { const now = new Date(), m = new Date(now); m.setHours(24, 0, 0, 0); return Math.floor((m.getTime() - now.getTime()) / 1000); }
function formatCountdown(s: number): string { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60; return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`; }

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS — matching Home.tsx
───────────────────────────────────────────────────────────── */
const pageFade: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } } };
const fadeLeft: Variants = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const staggerFast: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

/* ─────────────────────────────────────────────────────────────
   CYBER CORNER — same as Home.tsx
───────────────────────────────────────────────────────────── */
const CyberCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const base: React.CSSProperties = { position: "absolute", width: 20, height: 20 };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: "2px solid", borderLeft: "2px solid" },
    tr: { top: 0, right: 0, borderTop: "2px solid", borderRight: "2px solid" },
    bl: { bottom: 0, left: 0, borderBottom: "2px solid", borderLeft: "2px solid" },
    br: { bottom: 0, right: 0, borderBottom: "2px solid", borderRight: "2px solid" },
  };
  return <div style={{ ...base, ...map[pos], borderColor: "rgba(0,255,231,0.6)", animation: "corner-flash 4s infinite" }} />;
};

/* ─────────────────────────────────────────────────────────────
   SECTION LABEL — identical to Home.tsx
───────────────────────────────────────────────────────────── */
const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span style={{ fontFamily: "'Share Tech Mono', monospace" }} className="font-mono text-xs text-cyan-400/60 tracking-widest">[{num}]</span>
    <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400/80" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{label}</span>
    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-1 rounded-full bg-cyan-400" />
  </div>
);

/* ─────────────────────────────────────────────────────────────
   LIVE PULSE
───────────────────────────────────────────────────────────── */
function LivePulse() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span className="text-green-400 font-bold tracking-widest uppercase" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>Live</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   SOURCE PILL
───────────────────────────────────────────────────────────── */
function SourcePill({ source }: { source: string }) {
  const s = RSS_SOURCES.find((r) => r.name === source) ?? { color: "text-gray-400", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-semibold ${s.color}`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px" }}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      <span className="truncate max-w-[90px] sm:max-w-[120px]">{source}</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEVERITY BADGE
───────────────────────────────────────────────────────────── */
function SeverityBadge({ severity }: { severity: NewsSeverity }) {
  const sc = severityConfig[severity];
  return (
    <span className={`inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full border uppercase tracking-wide font-black ${sc.bg} ${sc.border} ${sc.color}`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px" }}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sc.dot} animate-pulse`} />
      {severity}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   CATEGORY BADGE
───────────────────────────────────────────────────────────── */
function CategoryBadge({ category }: { category: NewsCategory }) {
  const cc = categoryConfig[category];
  const Icon = cc.icon;
  return (
    <span className={`inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full border font-bold ${cc.bg} ${cc.border} ${cc.color}`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px" }}>
      <Icon className="w-2.5 h-2.5 shrink-0" />
      {cc.label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEED STATUS BAR
───────────────────────────────────────────────────────────── */
function FeedStatusBar({ succeeded, failed, loading }: { succeeded: string[]; failed: string[]; loading: boolean }) {
  const enabled = RSS_SOURCES.filter((s) => s.enabled);
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 mt-3 px-2">
      {enabled.map((src) => {
        const ok = succeeded.includes(src.name), err = failed.includes(src.name), pending = loading && !ok && !err;
        return (
          <motion.div key={src.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
            className={`flex items-center gap-1 px-1.5 py-1 rounded-lg border text-[9px] font-semibold transition-all duration-500 ${ok ? `bg-green-500/10 border-green-400/30 ${src.color}` : err ? "bg-red-500/10 border-red-400/25 text-red-400/70" : "bg-white/5 border-white/10 text-gray-600"}`}
            style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ok ? src.dot : err ? "bg-red-400/60" : "bg-gray-600"} ${pending ? "animate-pulse" : ""}`} />
            {src.name} {src.region === "india" && "🇮🇳"}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BREAKING TICKER
───────────────────────────────────────────────────────────── */
function BreakingTicker({ articles }: { articles: CyberNewsArticle[] }) {
  const critical = articles.filter((a) => a.severity === "Critical");
  if (critical.length === 0) return null;
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-red-500/40 bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60" style={{ boxShadow: "0 0 20px rgba(239,68,68,0.15), 0 0 40px rgba(239,68,68,0.08)" }}>
      <div className="flex items-stretch min-h-[38px] sm:min-h-[44px]">
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 sm:px-4 bg-red-500/30 border-r-2 border-red-500/40">
          <Radio className="w-3 h-3 text-red-400 animate-pulse" />
          <span className="text-red-300 font-black tracking-[0.15em] uppercase" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "9px", whiteSpace: "nowrap" }}>Breaking</span>
        </div>
        <div className="overflow-hidden flex-1 flex items-center px-3">
          <div className="marquee-t">
            {[...critical, ...critical].map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-200 hover:text-red-300 transition-colors duration-300 mr-10"
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", whiteSpace: "nowrap" }}>
                <AlertCircle className="w-2.5 h-2.5 text-red-400 shrink-0" />
                {a.title}
                <span className="text-red-500/40 mx-1">◆</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAT CARD — matching Home.tsx style exactly
───────────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, value, label, colorClass, bgClass, borderClass, accentColor }: { icon: any; value: number | string; label: string; colorClass: string; bgClass: string; borderClass: string; accentColor: string }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden flex items-center gap-3 px-4 py-3.5 rounded-xl bg-black/40 border ${borderClass} transition-all duration-300`}
      style={{ backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }} />
      <div className={`p-2 rounded-lg ${bgClass} border ${borderClass} shrink-0`}>
        <Icon className={`w-4 h-4 ${colorClass}`} />
      </div>
      <div className="min-w-0">
        <div className={`text-2xl font-black leading-none ${colorClass}`} style={{ fontFamily: "'Orbitron', sans-serif", textShadow: `0 0 20px ${accentColor}40` }}>{value}</div>
        <div className="text-gray-600 font-semibold uppercase tracking-wider mt-0.5" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px" }}>{label}</div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NEWS CARD — matching Home.tsx FeatureCard hover style
───────────────────────────────────────────────────────────── */
const NewsCard = memo(({ article }: { article: CyberNewsArticle }) => {
  const [hovered, setHovered] = useState(false);
  const sc = severityConfig[article.severity];
  const cc = categoryConfig[article.category];
  return (
    <motion.a href={article.url} target="_blank" rel="noopener noreferrer"
      variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-xl cursor-pointer h-full"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border: `1px solid ${hovered ? cc.accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 0 30px ${cc.accent}15, inset 0 1px 0 ${cc.accent}20, 0 20px 60px rgba(0,0,0,0.5)` : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}>
      {/* Sweeping top bar */}
      <div className={`h-0.5 w-full bg-gradient-to-r shrink-0 ${sc.bar}`} />
      {/* Sweeping highlight */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }} transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-full w-full" style={{ background: `linear-gradient(90deg, transparent, ${cc.accent}, transparent)` }} />
      </div>
      {/* Corner brackets */}
      {hovered && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: cc.accent }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: cc.accent }} />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: cc.accent }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: cc.accent }} />
        </>
      )}
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 30% 30%, ${cc.accent}10, transparent 65%)` }} />
      {/* Watermark category */}
      <div className="absolute -right-2 -bottom-4 font-black leading-none pointer-events-none select-none"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "4rem", color: cc.accent, opacity: hovered ? 0.06 : 0.02, transition: "opacity 0.4s" }}>
        {article.category.slice(0, 3).toUpperCase()}
      </div>
      <div className="relative z-10 flex flex-col flex-1 p-4 gap-2.5">
        <div className="flex items-center justify-between gap-1.5 flex-wrap">
          <CategoryBadge category={article.category} />
          <SeverityBadge severity={article.severity} />
        </div>
        <h3 className="font-black leading-snug line-clamp-2 shrink-0 transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.78rem", letterSpacing: "0.03em", color: hovered ? cc.accent : "#fff" }}>
          {article.title}
        </h3>
        <div className="relative h-px overflow-hidden bg-white/5">
          <motion.div animate={{ width: hovered ? "100%" : "2rem" }} transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full" style={{ background: cc.accent }} />
        </div>
        <p className="text-gray-400 leading-relaxed line-clamp-3 flex-1 transition-colors duration-300" style={{ fontSize: "0.72rem" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; }}>
          {article.summary}
        </p>
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-400/20 text-blue-300" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px" }}>#{tag}</span>
          ))}
          {article.tags.length > 2 && <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px" }}>+{article.tags.length - 2}</span>}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex flex-col gap-1 min-w-0">
            <SourcePill source={article.source} />
            <span className="flex items-center gap-1 text-gray-600" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px" }}>
              <Clock className="w-2.5 h-2.5 shrink-0" />{timeAgo(article.publishedAt)} ago
            </span>
          </div>
          <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}
            className="flex items-center gap-1 font-medium" style={{ color: cc.accent, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem" }}>
            READ <ArrowUpRight className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
});
NewsCard.displayName = "NewsCard";

/* ─────────────────────────────────────────────────────────────
   FEATURED CARD — matches Home.tsx RoadmapCard style
───────────────────────────────────────────────────────────── */
const FeaturedCard = memo(({ article }: { article: CyberNewsArticle }) => {
  const [hovered, setHovered] = useState(false);
  const sc = severityConfig[article.severity];
  const cc = categoryConfig[article.category];
  return (
    <motion.a href={article.url} target="_blank" rel="noopener noreferrer"
      variants={scaleIn} whileHover={{ y: -4, transition: { duration: 0.22 } }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group relative block overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: "rgba(0,0,0,0.55)",
        border: `1px solid ${hovered ? cc.accent + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 40px ${cc.accent}12, 0 20px 60px rgba(0,0,0,0.6)` : "none",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}>
      {/* Spinning conic glow */}
      <div className="absolute -inset-px rounded-2xl pointer-events-none overflow-hidden"
        style={{ opacity: hovered ? 1 : 0, background: `conic-gradient(from 0deg, transparent 0deg, ${cc.accent}30 60deg, transparent 120deg)`, animation: hovered ? "border-spin 4s linear infinite" : "none", transition: "opacity 0.4s" }} />
      {/* Top severity bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${sc.bar}`} style={{ transition: "width 0.5s ease" }} />
      {/* Featured label glow sweep */}
      <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
        className="absolute top-0 left-0 h-px w-1/3" style={{ background: `linear-gradient(to right, transparent, ${cc.accent}, transparent)` }} />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 50% 0%, ${cc.accent}12, transparent 60%)`, transition: "opacity 0.5s" }} />
      {/* Watermark number */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-black pointer-events-none select-none leading-none"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "8rem", color: cc.accent, opacity: hovered ? 0.06 : 0.025, transition: "opacity 0.4s" }}>
        {article.category.slice(0, 3).toUpperCase()}
      </div>
      <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full font-black tracking-widest uppercase border"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "10px", background: `${cc.accent}20`, borderColor: `${cc.accent}50`, color: cc.accent }}>
              ⚡ Top Story
            </span>
            <CategoryBadge category={article.category} />
          </div>
          <SeverityBadge severity={article.severity} />
        </div>
        <h2 className="font-black leading-tight transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1rem, 3vw, 2rem)", color: hovered ? cc.accent : "#fff" }}>
          {article.title}
        </h2>
        <div className="relative h-px overflow-hidden bg-white/5">
          <motion.div animate={{ width: hovered ? "100%" : "4rem" }} transition={{ duration: 0.5 }}
            className="absolute left-0 top-0 h-full" style={{ background: cc.accent }} />
        </div>
        <p className="text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-4 lg:line-clamp-none">{article.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 5).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 rounded-lg bg-blue-500/10 border border-blue-400/25 text-blue-300" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>#{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/10 flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <SourcePill source={article.source} />
            <span className="flex items-center gap-1 text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>
              <CalendarDays className="w-3 h-3" />{formatDate(article.publishedAt)}
            </span>
          </div>
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 font-black" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: cc.accent }}>
            Read Full Story <ChevronRight className="w-4 h-4" />
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
});
FeaturedCard.displayName = "FeaturedCard";

/* ─────────────────────────────────────────────────────────────
   VIEW MORE MODAL
───────────────────────────────────────────────────────────── */
function ViewMoreModal({ isOpen, onClose, articles }: { isOpen: boolean; onClose: () => void; articles: CyberNewsArticle[] }) {
  const [selPeriod, setSelPeriod] = useState("all");
  const [selCategory, setSelCategory] = useState("all");
  const [selSeverity, setSelSeverity] = useState("all");
  const [selRegion, setSelRegion] = useState("all");

  const grouped = useMemo(() => {
    let f = articles;
    if (selCategory !== "all") f = f.filter((a) => a.category === selCategory);
    if (selSeverity !== "all") f = f.filter((a) => a.severity === selSeverity);
    if (selRegion !== "all") { const names = RSS_SOURCES.filter((s) => s.region === selRegion).map((s) => s.name); f = f.filter((a) => names.includes(a.source)); }
    if (selPeriod !== "all") f = f.filter((a) => { const d2 = getDaysAgo(a.publishedAt); return selPeriod === "today" ? d2 === 0 : selPeriod === "week" ? d2 <= 7 : d2 <= 30; });
    return groupByDate(f);
  }, [articles, selPeriod, selCategory, selSeverity, selRegion]);

  const total = useMemo(() => Object.values(grouped).flat().length, [grouped]);
  const hasFilter = selPeriod !== "all" || selCategory !== "all" || selSeverity !== "all" || selRegion !== "all";
  const reset = useCallback(() => { setSelPeriod("all"); setSelCategory("all"); setSelSeverity("all"); setSelRegion("all"); }, []);

  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => { if (!isOpen) return; const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [isOpen, onClose]);

  const filters = [
    { val: selPeriod, set: setSelPeriod, opts: [["all", "All Time"], ["today", "Today"], ["week", "This Week"], ["month", "This Month"]] as [string, string][] },
    { val: selCategory, set: setSelCategory, opts: [["all", "All Categories"], ["Breach", "🔶 Breach"], ["Vulnerability", "🔴 Vuln"], ["Malware", "🔥 Malware"], ["Advisory", "🛡️ Advisory"], ["Research", "📘 Research"]] as [string, string][] },
    { val: selSeverity, set: setSelSeverity, opts: [["all", "All Severities"], ["Critical", "🔴 Critical"], ["High", "🟠 High"], ["Medium", "🟡 Medium"], ["Low", "🟢 Low"]] as [string, string][] },
    { val: selRegion, set: setSelRegion, opts: [["all", "All Regions"], ["global", "🌐 Global"], ["india", "🇮🇳 India"]] as [string, string][] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }} />
          <div style={{ position: "fixed", inset: 0, zIndex: 201, display: "flex", alignItems: "flex-end", justifyContent: "center", pointerEvents: "none" }} className="sm:items-center">
            <motion.div key="panel" initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: "auto", width: "100%", maxWidth: "min(92vw,1200px)", maxHeight: "92dvh", boxShadow: "0 0 80px rgba(0,255,231,0.2), 0 40px 100px rgba(0,0,0,0.8)" }}
              className="flex flex-col rounded-t-2xl sm:rounded-2xl border-t-2 border-x-2 sm:border-2 border-cyan-400/30 overflow-hidden">
              <div className="flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden h-full" style={{ background: "linear-gradient(135deg, rgba(2,13,24,0.98) 0%, rgba(2,5,9,0.98) 100%)" }}>
                <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
                  <div className="w-10 h-1 rounded-full bg-white/25" />
                </div>
                {/* Modal Header */}
                <div className="shrink-0 border-b border-cyan-400/25 px-4 sm:px-6 pt-3 sm:pt-4 pb-3" style={{ background: "rgba(2,13,24,0.95)" }}>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-lg bg-cyan-500/15 border border-cyan-400/40 shrink-0">
                        <Newspaper className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 truncate" style={{ fontFamily: "'Orbitron', sans-serif" }}>All Cyber News</h2>
                        <p className="text-gray-400 mt-0.5" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px" }}>
                          <span className="text-cyan-400 font-bold">{total}</span>{hasFilter ? ` of ${articles.length}` : ""} articles · sorted by date
                        </p>
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose}
                      className="p-2 rounded-lg bg-red-500/10 border border-red-400/40 hover:bg-red-500/25 hover:border-red-400/70 transition-all duration-200 shrink-0">
                      <X className="w-5 h-5 text-red-400" />
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                    {filters.map(({ val, set, opts }, fi) => (
                      <div key={fi} className="relative shrink-0">
                        <select value={val} onChange={(e) => set(e.target.value)}
                          className="appearance-none pl-2.5 pr-6 py-1.5 rounded-lg bg-white/5 border border-white/20 text-cyan-300 cursor-pointer hover:bg-white/10 hover:border-cyan-400/50 focus:outline-none focus:border-cyan-400/70 transition-all duration-200"
                          style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px" }}>
                          {opts.map(([v, l]) => <option key={v} value={v} className="bg-gray-900 text-white">{l}</option>)}
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-cyan-400/60 pointer-events-none" />
                      </div>
                    ))}
                    <AnimatePresence>
                      {hasFilter && (
                        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileTap={{ scale: 0.95 }} onClick={reset}
                          className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-400/40 text-red-400 hover:bg-red-500/20 transition-all duration-200"
                          style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", whiteSpace: "nowrap" }}>
                          <X className="w-2.5 h-2.5" /> Reset
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto cyber-scrollbar px-4 sm:px-6 py-4 sm:py-5">
                  {Object.keys(grouped).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10"><Filter className="w-10 h-10 text-gray-600" /></div>
                      <p className="text-gray-300 text-sm font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>No articles match</p>
                      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={reset}
                        className="px-4 py-2 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 hover:bg-cyan-500/25 transition-all"
                        style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "12px" }}>
                        Clear filters
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {Object.entries(grouped).map(([period, pa], gi) => (
                        <motion.div key={period} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: gi * 0.05 }}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30 shrink-0">
                              <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="text-cyan-300 font-black uppercase" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px" }}>{period}</span>
                              <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-black" style={{ fontSize: "10px" }}>{pa.length}</span>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
                          </div>
                          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" initial="hidden" animate="visible" variants={stagger}>
                            {pa.map((article) => <NewsCard key={article.id} article={article} />)}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Modal Footer */}
                <div className="shrink-0 border-t border-cyan-400/20 px-6 py-2.5" style={{ background: "rgba(2,13,24,0.95)" }}>
                  <div className="flex items-center justify-between text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px" }}>
                    <span>Showing <span className="text-cyan-400 font-bold">{total}</span> of <span className="text-gray-300">{articles.length}</span></span>
                    <span className="text-cyan-400/60 font-semibold hidden sm:flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/15" style={{ fontSize: "9px" }}>ESC</kbd> or tap outside to close
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function CyberNews() {
  const [allArticles, setAllArticles] = useState<CyberNewsArticle[]>(FALLBACK_ARTICLES);
  const [fetchResult, setFetchResult] = useState<Partial<FetchResult>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [countdown, setCountdown] = useState(getSecondsUntilMidnight());
  const [showViewMore, setShowViewMore] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  const lastFetchRef = useRef<number>(0);
  const isInitRef = useRef<boolean>(true);
  const [todayLabel] = useState(() => new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));

  const displayArticles = useMemo(() => {
    const sorted = [...allArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (fetchResult.isLive) {
      const crits = sorted.filter((a) => a.severity === "Critical");
      const rest = sorted.filter((a) => a.severity !== "Critical");
      return [...crits, ...rest].slice(0, DAILY_FEED_SIZE);
    }
    return getDailyArticles(allArticles, DAILY_FEED_SIZE);
  }, [allArticles, fetchResult]);

  const featuredArticle = displayArticles[0];
  const gridArticles = displayArticles.slice(1);

  const stats = useMemo(() => ({
    total: allArticles.length,
    critical: allArticles.filter((a) => a.severity === "Critical").length,
    feeds: (fetchResult.succeededFeeds ?? []).length,
    today: allArticles.filter((a) => getDaysAgo(a.publishedAt) === 0).length,
  }), [allArticles, fetchResult]);

  const applyResult = useCallback((result: FetchResult) => {
    setAllArticles(result.articles);
    setFetchResult(result);
    setGridKey((k) => k + 1);
    lastFetchRef.current = Date.now();
  }, []);

  // Initial fetch
  useEffect(() => {
    let mounted = true;
    (async () => {
      setIsRefreshing(true);
      try { const result = await fetchAllRSSArticles(); if (mounted) applyResult(result); }
      catch { if (mounted) applyResult({ articles: FALLBACK_ARTICLES, succeededFeeds: [], failedFeeds: [], fromCache: false, isLive: false }); }
      finally { if (mounted) { setIsRefreshing(false); isInitRef.current = false; } }
    })();
    return () => { mounted = false; };
  }, [applyResult]);

  // Tab focus refresh (5-min throttle)
  useEffect(() => {
    async function onVisible() {
      if (document.visibilityState !== "visible") return;
      if (isRefreshing || isInitRef.current) return;
      if (Date.now() - lastFetchRef.current < 5 * 60 * 1000) return;
      setIsRefreshing(true);
      try { applyResult(await fetchAllRSSArticles()); } catch { }
      finally { setIsRefreshing(false); }
    }
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [applyResult, isRefreshing]);

  // 15-min background refresh
  useEffect(() => {
    const id = setInterval(async () => { try { applyResult(await fetchAllRSSArticles()); } catch { } }, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, [applyResult]);

  // Online/offline
  useEffect(() => {
    const on = () => setIsOnline(true), off = () => setIsOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  // Countdown
  useEffect(() => { const id = setInterval(() => setCountdown(getSecondsUntilMidnight()), 1000); return () => clearInterval(id); }, []);

  // Manual refresh
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    clearCache();
    try { applyResult(await fetchAllRSSArticles(true)); } catch { }
    finally { setIsRefreshing(false); }
  }, [isRefreshing, applyResult]);

  const cacheStatus = getCacheStatus();
  const isLive = fetchResult.isLive === true;

  /* ── RENDER ── */
  return (
    <motion.div variants={pageFade} initial="hidden" animate="visible"
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ── BACKGROUND — matching Home.tsx ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 18% 0%, rgba(0,255,231,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 82% 55%, rgba(59,130,246,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 50%)" }} />
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scan-animate pointer-events-none" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.72) 100%)" }} />
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-20">

        {/* ══════════════════════════════════
            HERO SECTION — Home.tsx style
        ══════════════════════════════════ */}
        <motion.section variants={stagger} initial="hidden" animate="visible" className="mb-16">

          {/* Eyebrow */}
          <motion.div variants={fadeLeft} className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border"
              style={{ borderColor: "rgba(0,255,231,0.25)", background: "rgba(0,255,231,0.05)", boxShadow: "0 0 20px rgba(0,255,231,0.07)" }}>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-cyan-400 tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px" }}>
                ~/cyber/news — {isLive ? "LIVE FEED ACTIVE" : isRefreshing ? "FETCHING FEEDS…" : "OFFLINE MODE"}
              </span>
            </div>
            <div className="h-px flex-1 max-w-[200px]" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.4), transparent)" }} />
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-8" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="text-white block mb-2">Live Cyber</span>
            <span className="text-white">Security{" "}</span>
            <span className="relative inline-block">
              <span className="neon-text" style={{ background: "linear-gradient(135deg, #00ffe7 0%, #3b82f6 50%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Intel_Feed
              </span>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full block"
                style={{ background: "linear-gradient(90deg, #00ffe7, #3b82f6, #a855f7)" }} />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div variants={fadeUp} className="max-w-2xl mb-8">
            <div className="flex gap-4 items-start">
              <motion.div initial={{ height: 0 }} animate={{ height: 80 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="w-0.5 rounded-full shrink-0 mt-1" style={{ background: "linear-gradient(to bottom, #00ffe7, transparent)" }} />
              <p className="text-lg leading-relaxed" style={{ color: "#7a8899" }}>
                {isLive
                  ? `Live feed from ${stats.feeds} trusted RSS sources — global & Indian cybersecurity intelligence, classified and ranked in real-time.`
                  : <>Daily cybersecurity intelligence — breaches, vulnerabilities, malware, and advisories. <span className="text-white font-semibold">Curated from the world's top security feeds.</span></>}
              </p>
            </div>
          </motion.div>

          {/* Status indicators + Refresh button */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
            {/* Online status */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded border font-semibold ${isOnline ? "bg-green-500/10 border-green-400/40 text-green-400" : "bg-red-500/10 border-red-400/40 text-red-400"}`}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>
              {isOnline ? <Wifi className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
              {isOnline ? "Online" : "Offline"}
            </div>

            {/* Live / fetching status */}
            {isLive ? <LivePulse /> : isRefreshing ? (
              <span className="inline-flex items-center gap-1.5 text-violet-400 font-bold uppercase" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>
                <Loader2 className="w-3 h-3 animate-spin" />Fetching RSS…
              </span>
            ) : null}

            {/* Cache freshness */}
            {cacheStatus.cached && !isRefreshing && (() => {
              const age = Math.floor((cacheStatus.age || 0) / 60000);
              const fresh = age < 5;
              return (
                <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded border font-semibold ${fresh ? "bg-green-500/10 border-green-400/30 text-green-300" : "bg-cyan-500/10 border-cyan-400/30 text-cyan-300"}`}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${fresh ? "bg-green-400" : "bg-cyan-400"}`} />
                  {fresh ? "Fresh" : `${age}m ago`}
                </div>
              );
            })()}

            {/* Date */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/10 bg-white/5 text-gray-300 font-semibold"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>
              <CalendarDays className="w-2.5 h-2.5 text-cyan-400" />
              <span className="hidden lg:inline">{todayLabel}</span>
              <span className="lg:hidden">{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 font-bold"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>
              <Clock className="w-2.5 h-2.5 text-cyan-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Next refresh </span>{formatCountdown(countdown)}
            </div>
          </motion.div>

          {/* Refresh CTA — matching Home.tsx CTA style */}
          <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleRefresh} disabled={isRefreshing}
              className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #00ffe7, #3b82f6)", fontFamily: "'Orbitron', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", color: "#000", boxShadow: "0 0 30px rgba(0,255,231,0.3), 0 0 60px rgba(0,255,231,0.1)" }}>
              <motion.div animate={{ x: ["-200%", "200%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 w-1/2" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
              {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {isRefreshing ? "FETCHING FEEDS…" : "REFRESH FEEDS"}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </motion.div>

          {/* Feed status bar */}
          <motion.div variants={fadeUp}>
            <FeedStatusBar succeeded={fetchResult.succeededFeeds ?? []} failed={fetchResult.failedFeeds ?? []} loading={isRefreshing} />
          </motion.div>

          {/* Hashtags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-4">
            {["live-rss-feeds", "global-india", "auto-classified", "30-day-recency", "proxy-racing"].map((tag) => (
              <motion.span key={tag} whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded border border-white/6 bg-white/[0.02] text-gray-600 cursor-default transition-all duration-200"
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#00ffe7"; el.style.borderColor = "rgba(0,255,231,0.4)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = ""; el.style.borderColor = ""; }}>
                #{tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* ══ FALLBACK WARNING ══ */}
        {!isLive && !isRefreshing && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden p-5 rounded-xl border border-yellow-400/40"
            style={{ background: "linear-gradient(135deg, rgba(20,15,0,0.8), rgba(10,8,0,0.8))", boxShadow: "0 0 20px rgba(234,179,8,0.1)" }}>
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-bold" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem" }}>RSS feeds unreachable — showing curated fallback content</p>
                <p className="text-yellow-400/70 mt-0.5" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>
                  All proxies failed ({(fetchResult.failedFeeds ?? []).length} feeds). Check your connection and try refreshing.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ PARTIAL FAILURE NOTICE ══ */}
        {isLive && (fetchResult.failedFeeds ?? []).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-5 px-4 py-2.5 rounded-xl border border-orange-400/25 bg-orange-500/5 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="text-orange-300 font-semibold" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px" }}>
              {fetchResult.failedFeeds!.length} feed{fetchResult.failedFeeds!.length > 1 ? "s" : ""} unreachable: {fetchResult.failedFeeds!.join(", ")}
            </span>
          </motion.div>
        )}

        {/* ══════════════════════════════════
            STATS — Home.tsx style
        ══════════════════════════════════ */}
        <motion.div initial="hidden" animate="visible" variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          <StatCard icon={Newspaper}     value={stats.total}    label="Total Articles" colorClass="text-cyan-400"   bgClass="bg-cyan-500/15"   borderClass="border-cyan-400/30"   accentColor="#00ffe7" />
          <StatCard icon={AlertTriangle} value={stats.critical} label="Critical"        colorClass="text-red-400"    bgClass="bg-red-500/15"    borderClass="border-red-400/30"    accentColor="#ef4444" />
          <StatCard icon={Activity}      value={stats.feeds}    label="Active Feeds"    colorClass="text-blue-400"   bgClass="bg-blue-500/15"   borderClass="border-blue-400/30"   accentColor="#3b82f6" />
          <StatCard icon={Eye}           value={stats.today}    label="Published Today" colorClass="text-violet-400" bgClass="bg-violet-500/15" borderClass="border-violet-400/30" accentColor="#a855f7" />
        </motion.div>

        {/* ══ BREAKING TICKER ══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.4 }} className="mb-10">
          <BreakingTicker articles={displayArticles} />
        </motion.div>

        {/* ══════════════════════════════════
            TOP INTEL SECTION LABEL
        ══════════════════════════════════ */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="mb-8">
          <SectionLabel num="01" label="Top Intel" />
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Today's <span style={{ color: "#00ffe7" }}>Threat Feed</span>
            </h2>
            <div className="hidden sm:flex items-center gap-2" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "#555" }}>
              <span>{displayArticles.length} STORIES</span>
              <div className="w-16 h-px bg-gradient-to-r from-white/20 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* ══ FEATURED ARTICLE ══ */}
        {featuredArticle && (
          <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-5">
            <FeaturedCard article={featuredArticle} />
          </motion.div>
        )}

        {/* ══ ARTICLE GRID ══ */}
        <motion.div key={gridKey} initial="hidden" animate="visible" variants={staggerFast}
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {gridArticles.map((article) => <NewsCard key={article.id} article={article} />)}
        </motion.div>

        {/* ══ VIEW MORE BUTTON — Home.tsx footer CTA style ══ */}
        {allArticles.length > DAILY_FEED_SIZE && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="mt-12 flex justify-center">
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setShowViewMore(true)}
              className="group relative w-full sm:w-auto px-10 py-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
              style={{ background: "linear-gradient(135deg, rgba(0,255,231,0.04) 0%, rgba(0,0,0,0.8) 50%, rgba(168,85,247,0.04) 100%)", border: "2px solid rgba(0,255,231,0.3)", boxShadow: "0 0 40px rgba(0,255,231,0.1)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(0,255,231,0.2)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,231,0.6)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,231,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,231,0.3)"; }}>
              <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                className="absolute top-0 left-0 h-px w-1/3" style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.8), transparent)" }} />
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Newspaper className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-base whitespace-nowrap" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      View All Cyber News
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-black" style={{ fontSize: "11px" }}>{allArticles.length}</span>
                  </div>
                  <p className="text-gray-400" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", marginTop: "2px" }}>Filter by date, category, severity & region</p>
                </div>
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ChevronDown className="w-5 h-5 text-cyan-400" />
                </motion.span>
              </div>
            </motion.button>
          </motion.div>
        )}

        {/* ══ VIEW MORE MODAL ══ */}
        <ViewMoreModal isOpen={showViewMore} onClose={() => setShowViewMore(false)} articles={allArticles} />

        {/* ══════════════════════════════════
            INFO PANEL — Home.tsx style
        ══════════════════════════════════ */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-20" aria-label="Feed info">
          <SectionLabel num="02" label="Feed Architecture" />
          <div className="relative overflow-hidden rounded-2xl p-8 border border-white/6"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.5), rgba(59,130,246,0.3), transparent)" }} />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* RSS Sources */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-400/40 shrink-0">
                    <Rss className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.9rem" }}>RSS Feed Sources</h3>
                    <p className="text-gray-500 mt-0.5" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>{RSS_SOURCES.filter((s) => s.enabled).length} feeds · global + India</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {RSS_SOURCES.filter((s) => s.enabled).map((src, i) => {
                    const ok = (fetchResult.succeededFeeds ?? []).includes(src.name);
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-1.5 px-2 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${src.dot} ${ok && isLive ? "animate-pulse" : "opacity-40"}`} />
                        <span className={`font-semibold truncate ${ok && isLive ? src.color : "text-gray-600"}`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>{src.name}</span>
                        {src.region === "india" && <span className="ml-auto shrink-0" style={{ fontSize: "8px" }}>🇮🇳</span>}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              {/* How It Works */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-400/40 shrink-0">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.9rem" }}>How It Works</h3>
                    <p className="text-gray-500 mt-0.5" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px" }}>RSS → Proxy Race → XML Parse → Classify → Render</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: Globe,         color: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-400/30",   title: "5-Proxy Parallel Race",       desc: "allorigins → corsproxy → codetabs → thingproxy → cors.sh. All race simultaneously. First valid XML wins. Staggered 200ms starts prevent server hammering." },
                    { icon: RotateCcw,     color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-400/30", title: "15-Min Cache + Auto-Refresh", desc: "Results cached in sessionStorage. Tab refocus re-fetches after 5 min. Background refresh every 15 min." },
                    { icon: Shield,        color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-400/30", title: "Auto-Classifier",             desc: "Articles auto-tagged as Breach/Vuln/Malware/Advisory/Research using keyword matching. Severity scored Critical→Low." },
                    { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-400/30", title: "XML Validation Gate",         desc: "Every proxy response validated for real RSS/Atom XML before acceptance. HTML error pages are silently discarded." },
                  ].map(({ icon: Icon, color, bg, border, title, desc }, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/20 transition-all duration-300">
                      <div className={`shrink-0 p-1.5 rounded-lg ${bg} border ${border}`}>
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-black ${color} mb-0.5`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px" }}>{title}</div>
                        <div className="text-gray-400 leading-relaxed" style={{ fontSize: "10px" }}>{desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══ FOOTER CTA ══ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-white/8 p-14 text-center"
            style={{ background: "linear-gradient(135deg, rgba(0,255,231,0.04) 0%, rgba(0,0,0,0.8) 50%, rgba(168,85,247,0.04) 100%)", boxShadow: "0 0 80px rgba(0,255,231,0.05), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              className="absolute top-0 left-0 h-px w-1/3" style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.8), transparent)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.05), transparent 70%)" }} />
            <div className="relative z-10">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 mb-8">
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-cyan-400 tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px" }}>
                  {isLive ? `${stats.feeds} feeds active · ${stats.total} articles indexed` : "status: loading feeds…"}
                </span>
              </motion.div>
              <p className="text-5xl sm:text-6xl font-black mb-4 flicker" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                <span className="text-white">Stay. </span>
                <span className="text-white">Alert. </span>
                <span className="neon-text" style={{ background: "linear-gradient(135deg, #00ffe7, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Secure.
                </span>
              </p>
              <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm leading-relaxed" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                Cybersecurity threats evolve every hour. This feed refreshes automatically so you're always aware of the latest risks.
              </p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleRefresh} disabled={isRefreshing}
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-lg font-black transition-all duration-300 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #00ffe7 0%, #3b82f6 100%)", color: "#000", fontFamily: "'Orbitron', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", boxShadow: "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(0,255,231,0.5), 0 0 100px rgba(0,255,231,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)"; }}>
                {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {isRefreshing ? "FETCHING…" : "REFRESH NOW"}
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}