// src/data/News.ts
// ─────────────────────────────────────────────────────────────────────────────
// Cybersecurity News — RSS Data Layer
// Speed optimizations:
//   1. Proxies raced IN PARALLEL (Promise.any) — no more sequential waiting
//   2. Staggered proxy starts (0 / 250ms / 500ms …) to reduce server hammering
//   3. All source alt-URLs tried in parallel per-source
//   4. Proxy speed rankings cached in localStorage — fastest proxy goes first
//   5. Hard 12s wall-clock budget per source (not per-proxy-attempt)
//   6. Per-proxy timeout: 5s (was 10s)
//   7. Failed-proxy memory: skip proxies that failed in the last 5 min
// ─────────────────────────────────────────────────────────────────────────────

export type NewsCategory =
  | "Breach"
  | "Vulnerability"
  | "Malware"
  | "Advisory"
  | "Research";

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

// ─────────────────────────────────────────────────────────────────────────────
// RSS FEED REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
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

export const RSS_SOURCES: RSSSource[] = [
  {
    name: "The Hacker News",
    url: "https://feeds.feedburner.com/TheHackersNews",
    color: "text-red-400", dot: "bg-red-400", region: "global", enabled: true,
  },
  {
    name: "SecurityWeek",
    url: "https://feeds.feedburner.com/Securityweek",
    color: "text-orange-400", dot: "bg-orange-400", region: "global", enabled: true,
  },
  {
    name: "Help Net Security",
    url: "https://feeds2.feedburner.com/HelpNetSecurity",
    color: "text-yellow-400", dot: "bg-yellow-400", region: "global", enabled: true,
  },
  {
    name: "Krebs on Security",
    url: "https://krebsonsecurity.com/feed/",
    color: "text-purple-400", dot: "bg-purple-400", region: "global", enabled: true,
  },
  {
    name: "Rapid7 Blog",
    url: "https://blog.rapid7.com/rss/",
    altUrls: ["https://www.rapid7.com/blog/rss/"],
    color: "text-blue-400", dot: "bg-blue-400", region: "global", enabled: true,
    defaultCategory: "Vulnerability",
  },
  {
    name: "CVEFeed",
    url: "https://cvefeed.io/rssfeed/severity/high.xml",
    altUrls: [
      "https://cvefeed.io/rssfeed/",
      "https://cvefeed.io/rssfeed/latest.xml",
    ],
    color: "text-red-300", dot: "bg-red-300", region: "global", enabled: true,
    defaultCategory: "Vulnerability",
  },
  {
    name: "Packet Storm",
    // Feedburner mirror is more proxy-friendly than the direct feed
    url: "https://feeds.feedburner.com/packetstormsecurity/IIOJ",
    altUrls: [
      "https://packetstormsecurity.com/feeds/news.xml",
      "https://rss.packetstormsecurity.com/news/",
    ],
    color: "text-rose-400", dot: "bg-rose-400", region: "global", enabled: true,
    defaultCategory: "Vulnerability",
  },
  {
    name: "CERT-In",
    url: "https://www.cert-in.org.in/RSS.jsp",
    altUrls: [
      "https://www.cert-in.org.in/rss.jsp",
      "https://cert-in.org.in/RSS.jsp",
      "https://www.cert-in.org.in/XML-Feed.jsp",
    ],
    color: "text-green-400", dot: "bg-green-400", region: "india", enabled: true,
    defaultCategory: "Advisory",
  },
  {
    name: "CyberPeace",
    url: "https://www.cyberpeace.org/feed/",
    altUrls: [
      "https://cyberpeace.org/feed/",
      "https://cyberpeace.org/?feed=rss2",
      "https://www.cyberpeace.org/?feed=rss2",
    ],
    color: "text-teal-400", dot: "bg-teal-400", region: "india", enabled: true,
  },
  {
    name: "DSCI",
    url: "https://www.dsci.in/feed/",
    altUrls: [
      "https://dsci.in/feed/",
      "https://www.dsci.in/?feed=rss2",
      "https://dsci.in/?feed=rss2",
    ],
    color: "text-cyan-400", dot: "bg-cyan-400", region: "india", enabled: true,
  },
  {
    name: "Crus.live",
    url: "https://crus.live/rss.xml",
    altUrls: [
      "https://crus.live/feed/",
      "https://crus.live/feed.xml",
      "https://crus.live/?feed=rss2",
      "https://www.crus.live/rss.xml",
    ],
    color: "text-indigo-400", dot: "bg-indigo-400", region: "india", enabled: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROXY DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────
interface ProxyDef {
  id: string;
  build: (u: string) => string;
}

const ALL_PROXIES: ProxyDef[] = [
  { id: "corsproxy",  build: (u) => `https://corsproxy.io/?${encodeURIComponent(u)}` },
  { id: "allorigins", build: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}` },
  { id: "codetabs",   build: (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}` },
  { id: "thingproxy", build: (u) => `https://thingproxy.freeboard.io/fetch/${u}` },
  { id: "8x8",        build: (u) => `https://proxy.cors.sh/${u}` },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROXY PERFORMANCE MEMORY  (localStorage)
// Tracks average response time per proxy and mutes recently-failed ones.
// ─────────────────────────────────────────────────────────────────────────────
const PROXY_PERF_KEY  = "rss_proxy_perf_v2";
const PROXY_FAIL_TTL  = 5 * 60 * 1000; // suppress a failing proxy for 5 min

interface ProxyPerf {
  avgMs:     number;   // exponential moving average of response time
  failUntil: number;   // epoch ms — skip this proxy until then
  wins:      number;   // count of races won
}

function loadProxyPerf(): Record<string, ProxyPerf> {
  try { return JSON.parse(localStorage.getItem(PROXY_PERF_KEY) ?? "{}"); }
  catch { return {}; }
}

function saveProxyPerf(p: Record<string, ProxyPerf>) {
  try { localStorage.setItem(PROXY_PERF_KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

function recordProxyWin(id: string, ms: number) {
  const all = loadProxyPerf();
  const p   = all[id] ?? { avgMs: ms, failUntil: 0, wins: 0 };
  p.avgMs    = Math.round(p.avgMs * 0.6 + ms * 0.4); // EMA
  p.wins    += 1;
  p.failUntil = 0;
  all[id]    = p;
  saveProxyPerf(all);
}

function recordProxyFail(id: string) {
  const all   = loadProxyPerf();
  const p     = all[id] ?? { avgMs: 9999, failUntil: 0, wins: 0 };
  p.failUntil = Date.now() + PROXY_FAIL_TTL;
  all[id]     = p;
  saveProxyPerf(all);
}

/** Return proxies sorted fastest-first; recently failed ones go to the back. */
function getSortedProxies(): ProxyDef[] {
  const perf = loadProxyPerf();
  const now  = Date.now();
  return [...ALL_PROXIES].sort((a, b) => {
    const pa = perf[a.id], pb = perf[b.id];
    const aFailed = pa?.failUntil > now;
    const bFailed = pb?.failUntil > now;
    if (aFailed && !bFailed) return  1;
    if (!aFailed && bFailed) return -1;
    return (pa?.avgMs ?? 5000) - (pb?.avgMs ?? 5000);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE: RACE ALL PROXIES IN PARALLEL WITH STAGGERED STARTS
//
// Instead of: proxy1 → wait 10s → proxy2 → wait 10s → proxy3 …
// We do:      proxy1 starts at t=0
//             proxy2 starts at t=250ms
//             proxy3 starts at t=500ms  ← all racing simultaneously
//             First valid RSS response wins; the rest are cancelled.
//
// Worst case is now max(proxy_timeout) = 5s, not 5s × N.
// ─────────────────────────────────────────────────────────────────────────────
const PER_PROXY_TIMEOUT_MS = 5000;
const STAGGER_MS           = 250; // ms between proxy launch slots

function isValidRSS(text: string): boolean {
  return text.length > 100 && (
    text.includes("<rss")   ||
    text.includes("<feed")  ||
    text.includes("<item")  ||
    text.includes("<entry") ||
    text.includes("<?xml")
  );
}

async function proxyFetchRace(targetUrl: string): Promise<string> {
  const proxies     = getSortedProxies();
  const masterCtrl  = new AbortController(); // abort all when first wins
  const controllers: AbortController[] = [];

  const racePromises = proxies.map((proxy, idx) =>
    new Promise<string>((resolve, reject) => {
      const staggerTimer = setTimeout(async () => {
        if (masterCtrl.signal.aborted) { reject(new DOMException("aborted", "AbortError")); return; }

        const ctrl = new AbortController();
        controllers.push(ctrl);
        masterCtrl.signal.addEventListener("abort", () => ctrl.abort(), { once: true });

        const hardTimeout = setTimeout(() => {
          ctrl.abort();
          recordProxyFail(proxy.id);
          reject(new Error(`timeout:${proxy.id}`));
        }, PER_PROXY_TIMEOUT_MS);

        const t0 = Date.now();
        try {
          const res = await fetch(proxy.build(targetUrl), {
            signal: ctrl.signal,
            headers: { Accept: "application/rss+xml, application/xml, text/xml, */*" },
          });
          clearTimeout(hardTimeout);

          if (!res.ok) {
            recordProxyFail(proxy.id);
            reject(new Error(`HTTP ${res.status} from ${proxy.id}`));
            return;
          }

          const text = await res.text();
          if (isValidRSS(text)) {
            recordProxyWin(proxy.id, Date.now() - t0);
            masterCtrl.abort(); // cancel all losers
            resolve(text);
          } else {
            recordProxyFail(proxy.id);
            reject(new Error(`invalid RSS: ${proxy.id}`));
          }
        } catch (e: any) {
          clearTimeout(hardTimeout);
          if (e?.name !== "AbortError") recordProxyFail(proxy.id);
          reject(e);
        }
      }, idx * STAGGER_MS);

      masterCtrl.signal.addEventListener("abort", () => clearTimeout(staggerTimer), { once: true });
    })
  );

  try {
    return await Promise.any(racePromises);
  } catch {
    throw new Error(`All proxies failed for: ${targetUrl}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FETCH WITH URL FALLBACKS
// All alt-URLs for a source also race in parallel — first valid one wins.
// Hard 12s wall-clock budget per source prevents any single source
// from blocking the whole page load.
// ─────────────────────────────────────────────────────────────────────────────
const SOURCE_BUDGET_MS = 12000;

async function proxyFetchWithFallback(source: RSSSource): Promise<string> {
  const urls = [source.url, ...(source.altUrls ?? [])];

  // Each URL races its own proxy pool; first URL+proxy combo that succeeds wins
  const urlRaces    = urls.map((url) => proxyFetchRace(url));
  const budgetGuard = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Budget exceeded: ${source.name}`)), SOURCE_BUDGET_MS)
  );

  return Promise.race([Promise.any(urlRaces), budgetGuard]);
}

// ─────────────────────────────────────────────────────────────────────────────
// RSS / ATOM XML PARSER
// ─────────────────────────────────────────────────────────────────────────────
interface RawItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
}

function xmlText(el: Element, ...tags: string[]): string {
  for (const tag of tags) {
    const found = el.querySelector(tag) ?? el.getElementsByTagName(tag)[0];
    if (found) return (found.textContent ?? "").trim();
  }
  return "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&#\d+;/g, " ").replace(/&[a-z]+;/g, " ")
    .replace(/\s{2,}/g, " ").trim();
}

export function parseRSSXML(xml: string): RawItem[] {
  const cleaned = xml
    .replace(/^\uFEFF/, "")
    .replace(/<\?xml[^?]*\?>/i, '<?xml version="1.0" encoding="UTF-8"?>');

  const parser = new DOMParser();
  let doc = parser.parseFromString(cleaned, "application/xml");
  if (doc.querySelector("parsererror")) {
    doc = parser.parseFromString(cleaned, "text/html");
  }

  const rssItems  = Array.from(doc.querySelectorAll("item"));
  const atomItems = Array.from(doc.querySelectorAll("entry"));
  const isAtom    = rssItems.length === 0 && atomItems.length > 0;
  const nodes     = isAtom ? atomItems : rssItems;

  if (nodes.length === 0) return parseRSSFallback(xml);

  return nodes.map((node): RawItem | null => {
    let title = "", link = "", description = "", pubDate = "", guid = "";

    if (isAtom) {
      title        = stripHtml(xmlText(node, "title"));
      const linkEl = node.querySelector("link[rel='alternate']") ?? node.querySelector("link");
      link         = linkEl?.getAttribute("href") ?? xmlText(node, "id");
      description  = stripHtml(xmlText(node, "summary", "content"));
      pubDate      = xmlText(node, "published", "updated");
      guid         = xmlText(node, "id") || link;
    } else {
      title = stripHtml(xmlText(node, "title"));
      const linkEl = node.querySelector("link") ?? node.getElementsByTagName("link")[0];
      if (linkEl) {
        link = linkEl.textContent?.trim() ||
               linkEl.nextSibling?.textContent?.trim() ||
               linkEl.getAttribute("href") || "";
      }
      if (!link) link = xmlText(node, "guid");
      description = stripHtml(xmlText(node, "description", "content:encoded", "summary", "content"));
      pubDate     = xmlText(node, "pubDate", "dc:date", "published", "updated", "date");
      guid        = xmlText(node, "guid") || link;
    }

    if (!title || !link || !link.startsWith("http")) return null;
    return { title, link, description, pubDate, guid };
  }).filter((x): x is RawItem => x !== null);
}

function parseRSSFallback(xml: string): RawItem[] {
  const items: RawItem[] = [];
  const itemRx = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRx.exec(xml)) !== null) {
    const b     = m[1];
    const title = extractTag(b, "title");
    const link  = extractTag(b, "link") || extractTag(b, "guid");
    const desc  = extractTag(b, "description") || extractTag(b, "summary");
    const date  = extractTag(b, "pubDate") || extractTag(b, "dc:date") || extractTag(b, "published");
    const guid  = extractTag(b, "guid") || link;
    if (title && link && link.startsWith("http")) {
      items.push({ title: stripHtml(title), link, description: stripHtml(desc), pubDate: date, guid });
    }
  }
  return items;
}

function extractTag(xml: string, tag: string): string {
  const cdataRx = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i");
  const cdataM  = cdataRx.exec(xml);
  if (cdataM) return cdataM[1].trim();
  const rx = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const mm = rx.exec(xml);
  return mm ? mm[1].trim() : "";
}

// ─────────────────────────────────────────────────────────────────────────────
// DATE NORMALIZER
// ─────────────────────────────────────────────────────────────────────────────
export function normalizeDate(raw: string): string {
  if (!raw) return new Date().toISOString();
  try {
    const d = new Date(raw.trim());
    if (!isNaN(d.getTime())) return d.toISOString();
    const d2 = new Date(raw.replace(/\([^)]*\)/g, "").trim());
    if (!isNaN(d2.getTime())) return d2.toISOString();
    const im = raw.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
    if (im) {
      const d3 = new Date(`${im[3]}-${im[2].padStart(2,"0")}-${im[1].padStart(2,"0")}`);
      if (!isNaN(d3.getTime())) return d3.toISOString();
    }
  } catch { /* fall through */ }
  return new Date().toISOString();
}

// ─────────────────────────────────────────────────────────────────────────────
// CLASSIFIER
// ─────────────────────────────────────────────────────────────────────────────
const CAT_KW: Record<NewsCategory, string[]> = {
  Breach:        ["breach","leak","exposed","stolen","compromised","hacked","data theft","exfiltrat","dump","unauthorized access","databreach","data leak"],
  Vulnerability: ["cve-","vulnerability","zero-day","zero day","exploit","patch","remote code execution","rce","authentication bypass","sql injection","buffer overflow","privilege escalation","cvss","flaw","security flaw","unpatched"],
  Malware:       ["ransomware","malware","trojan","botnet","backdoor","spyware","rootkit","worm","virus","infostealer","cryptominer","lockbit","alphv","cl0p","stealer","rat ","loader","dropper","keylogger"],
  Advisory:      ["advisory","cisa","cert-in","cert ","nsa","fbi","warning","alert","directive","patch tuesday","guidance","mitigation","security notice","bulletin","ncsc","nciipc","notice","cyber alert"],
  Research:      ["research","discovered","analysis","report","study","technique","post-quantum","cryptograph","fingerprint","academic","whitepaper","threat intelligence","threat intel","findings","investigation"],
};

const SEV_KW: Record<NewsSeverity, string[]> = {
  Critical: ["critical","zero-day","actively exploit","cvss 9","cvss 10","emergency","nation-state","apt","supply chain attack","mass exploit","wormable","critical severity","actively being exploited"],
  High:     ["high severity","high-severity","remote code execution","authentication bypass","data breach","millions of","widespread","unauthenticated","pre-auth","high risk"],
  Medium:   ["medium severity","moderate","phishing","credential stuffing","botnet","cryptominer","social engineering","medium risk"],
  Low:      ["low severity","informational","theoretical","proof of concept","poc","low risk"],
};

const TAG_RX = [
  /\bcve-\d{4}-\d+\b/gi,
  /\b(apache|microsoft|google|fortinet|ivanti|palo alto|cisco|vmware|juniper|citrix|adobe|oracle|f5|jenkins|kubernetes|docker|openssl|openssh|linux|windows|chrome|firefox|safari|exchange|sharepoint|wordpress|nginx|atlassian|gitlab|github|android|ios|apple|samsung|qualcomm)\b/gi,
  /\b(ransomware|malware|apt|zero-day|rce|sql injection|xss|ssrf|log4j|log4shell|phishing|backdoor|trojan|botnet)\b/gi,
  /\b(lockbit|cl0p|alphv|blackcat|scattered spider|volt typhoon|salt typhoon|lazarus|fancy bear|cozy bear|revil|darkside)\b/gi,
  /\b(cert-in|nciipc|meity|ncsc|cisa|nsa|fbi|interpol)\b/gi,
];

export function classifyArticle(
  title: string, description: string, defaultCategory?: NewsCategory
): { category: NewsCategory; severity: NewsSeverity; tags: string[] } {
  const text = `${title} ${description}`.toLowerCase();
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
  const tags: string[] = [];
  for (const rx of TAG_RX) {
    const found = text.match(rx);
    if (found) tags.push(...found.map((t) => t.charAt(0).toUpperCase() + t.slice(1)));
  }
  return { category, severity, tags: Array.from(new Set(tags)).slice(0, 6) };
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE FEED FETCHER
// ─────────────────────────────────────────────────────────────────────────────
async function fetchOneFeed(source: RSSSource): Promise<CyberNewsArticle[]> {
  const xml  = await proxyFetchWithFallback(source);
  const raw  = parseRSSXML(xml);
  const slug = source.name.toLowerCase().replace(/\s+/g, "-");
  return raw.map((item, i): CyberNewsArticle => {
    const { category, severity, tags } = classifyArticle(item.title, item.description, source.defaultCategory);
    return {
      id:          `${slug}-${i}-${Date.now()}`,
      title:       item.title.slice(0, 180),
      summary:     item.description.slice(0, 350),
      url:         item.link,
      source:      source.name,
      publishedAt: normalizeDate(item.pubDate),
      category, severity, tags,
      isLive: true,
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// DEDUPLICATION + RECENCY
// ─────────────────────────────────────────────────────────────────────────────
const MAX_AGE_DAYS = 30;

function isRecent(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() < MAX_AGE_DAYS * 86400000;
}

export function deduplicateArticles(articles: CyberNewsArticle[]): CyberNewsArticle[] {
  const seen = new Set<string>();
  return articles.filter((a) => {
    const key = a.title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim().slice(0, 55);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CACHE
// ─────────────────────────────────────────────────────────────────────────────
const CACHE_KEY = "cyber_news_rss_v6";
const CACHE_TTL = 15 * 60 * 1000;

interface CacheEntry {
  articles: CyberNewsArticle[];
  ts: number;
  succeededFeeds: string[];
  failedFeeds: string[];
}

export function saveCache(articles: CyberNewsArticle[], succeededFeeds: string[], failedFeeds: string[]): void {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ articles, ts: Date.now(), succeededFeeds, failedFeeds })); }
  catch { /* quota */ }
}

export function loadCache(): CacheEntry | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const e: CacheEntry = JSON.parse(raw);
    if (Date.now() - e.ts > CACHE_TTL) return null;
    return e;
  } catch { return null; }
}

export function clearCache(): void {
  try { sessionStorage.removeItem(CACHE_KEY); } catch { /* ignore */ }
}

export function getCacheStatus(): { cached: boolean; age: number; succeededFeeds: string[] } {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return { cached: false, age: 0, succeededFeeds: [] };
    const e: CacheEntry = JSON.parse(raw);
    const age = Date.now() - e.ts;
    return { cached: age < CACHE_TTL, age, succeededFeeds: e.succeededFeeds ?? [] };
  } catch { return { cached: false, age: 0, succeededFeeds: [] }; }
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER FETCH
// ─────────────────────────────────────────────────────────────────────────────
export interface FetchResult {
  articles: CyberNewsArticle[];
  succeededFeeds: string[];
  failedFeeds: string[];
  fromCache: boolean;
  isLive: boolean;
}

export async function fetchAllRSSArticles(forceRefresh = false): Promise<FetchResult> {
  if (!forceRefresh) {
    const cached = loadCache();
    if (cached && cached.articles.length > 0) {
      return { articles: cached.articles, succeededFeeds: cached.succeededFeeds, failedFeeds: cached.failedFeeds, fromCache: true, isLive: true };
    }
  }

  const enabled = RSS_SOURCES.filter((s) => s.enabled);
  const succeeded: string[] = [];
  const failed: string[]    = [];
  const all: CyberNewsArticle[] = [];

  // All feeds run concurrently; each one internally races its proxy pool
  await Promise.allSettled(
    enabled.map(async (source) => {
      try {
        const articles = await fetchOneFeed(source);
        if (articles.length > 0) { all.push(...articles); succeeded.push(source.name); }
        else { console.warn(`[RSS] ${source.name}: 0 articles`); failed.push(source.name); }
      } catch (err) {
        console.warn(`[RSS] ${source.name}:`, err);
        failed.push(source.name);
      }
    })
  );

  const deduped = deduplicateArticles(
    all.filter((a) => isRecent(a.publishedAt))
       .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  );

  if (deduped.length > 0) {
    saveCache(deduped, succeeded, failed);
    return { articles: deduped, succeededFeeds: succeeded, failedFeeds: failed, fromCache: false, isLive: true };
  }

  return { articles: newsArticles, succeededFeeds: [], failedFeeds: failed, fromCache: false, isLive: false };
}

// ─────────────────────────────────────────────────────────────────────────────
// DAILY ROTATION  (static fallback only)
// ─────────────────────────────────────────────────────────────────────────────
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

export function getDailyArticles(all: CyberNewsArticle[], count = 9): CyberNewsArticle[] {
  if (!all.length) return [];
  const seed = getDayOfYear();
  const shuffled = [...all].sort((a, b) => {
    const ha = (a.id.charCodeAt(0) * 31 + seed * 7) % all.length;
    const hb = (b.id.charCodeAt(0) * 31 + seed * 7) % all.length;
    return ha - hb;
  });
  const crits = shuffled.filter((a) => a.severity === "Critical");
  const rest  = shuffled.filter((a) => a.severity !== "Critical");
  return [...crits, ...rest].slice(0, count);
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC FALLBACK  (shown only when ALL feeds fail)
// ─────────────────────────────────────────────────────────────────────────────
const d = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

export const newsArticles: CyberNewsArticle[] = [
  { id:"fb-v-001", title:"Critical Zero-Day in Apache HTTP Server Allows Remote Code Execution", summary:"Unauthenticated attackers can execute arbitrary code on vulnerable Apache HTTP Server 2.4.x systems. Patch immediately — active exploitation confirmed.", url:"https://thehackernews.com", source:"The Hacker News", publishedAt:d(1), category:"Vulnerability", tags:["Apache","RCE","Zero-Day"], severity:"Critical" },
  { id:"fb-v-002", title:"Patch Tuesday: Microsoft Fixes 94 CVEs Including 4 Actively Exploited Zero-Days", summary:"Four zero-days in Windows Print Spooler, CLFS Driver, and Hyper-V are actively exploited in the wild.", url:"https://www.bleepingcomputer.com", source:"BleepingComputer", publishedAt:d(2), category:"Vulnerability", tags:["Microsoft","Patch Tuesday","Windows","Zero-Day"], severity:"Critical" },
  { id:"fb-m-001", title:"LockBit 4.0 Ransomware Targets Healthcare and Critical Infrastructure", summary:"LockBit's latest variant features faster encryption and improved anti-analysis techniques.", url:"https://www.bleepingcomputer.com", source:"BleepingComputer", publishedAt:d(1), category:"Malware", tags:["LockBit","Ransomware","Healthcare"], severity:"Critical" },
  { id:"fb-b-001", title:"National Public Data Breach Exposes 2.9 Billion Records Including SSNs", summary:"A massive data broker breach exposed nearly 3 billion records including SSNs, addresses, and phone numbers.", url:"https://krebsonsecurity.com", source:"Krebs on Security", publishedAt:d(3), category:"Breach", tags:["Data Broker","SSN","PII","Dark Web"], severity:"Critical" },
  { id:"fb-b-003", title:"Salt Typhoon APT Breaches US Telecoms — Wiretap Systems Compromised", summary:"The Salt Typhoon APT group breached AT&T, Verizon, and Lumen, accessing lawful intercept systems.", url:"https://www.darkreading.com", source:"Dark Reading", publishedAt:d(4), category:"Breach", tags:["Salt Typhoon","China","APT","Telecom"], severity:"Critical" },
  { id:"fb-a-001", title:"CISA Emergency Directive: Patch Ivanti Flaws Within 48 Hours", summary:"CISA's Emergency Directive 24-02 requires all federal civilian agencies to disconnect vulnerable Ivanti appliances.", url:"https://www.cisa.gov", source:"CISA Alerts", publishedAt:d(5), category:"Advisory", tags:["CISA","Ivanti","Federal","Emergency Directive"], severity:"Critical" },
  { id:"fb-a-cert", title:"CERT-In Advisory: Multiple Vulnerabilities in Indian Banking Infrastructure", summary:"CERT-In has issued advisories covering critical vulnerabilities affecting BFSI sector infrastructure.", url:"https://www.cert-in.org.in", source:"CERT-In", publishedAt:d(2), category:"Advisory", tags:["CERT-In","BFSI","India","Advisory"], severity:"High" },
  { id:"fb-v-006", title:"OpenSSH regreSSHion: Race Condition Enables Remote Root Code Execution", summary:"CVE-2024-6387 reintroduces a critical race condition in OpenSSH. Unauthenticated remote root RCE possible on glibc Linux.", url:"https://www.bleepingcomputer.com", source:"BleepingComputer", publishedAt:d(6), category:"Vulnerability", tags:["OpenSSH","Linux","RCE","Race Condition"], severity:"Critical" },
  { id:"fb-b-005", title:"XZ Utils SSH Backdoor: Multi-Year Supply Chain Attack Discovered", summary:"A multi-year supply chain attack introduced a backdoor into XZ Utils 5.6.0/5.6.1 targeting OpenSSH on systemd Linux.", url:"https://www.schneier.com", source:"Schneier on Security", publishedAt:d(7), category:"Breach", tags:["XZ Utils","Supply Chain","SSH","Backdoor","Linux"], severity:"Critical" },
  { id:"fb-r-001", title:"NIST Finalizes Post-Quantum Cryptography Standards: ML-KEM, ML-DSA, SLH-DSA", summary:"NIST published FIPS 203, 204, and 205 — the world's first post-quantum cryptographic standards.", url:"https://nvd.nist.gov", source:"NIST / NVD", publishedAt:d(8), category:"Research", tags:["Post-Quantum","PQC","NIST","ML-KEM","Cryptography"], severity:"Medium" },
  { id:"fb-r-002", title:"AI-Powered Phishing Achieves 60% Click Rate vs 20% for Human-Written Lures", summary:"IBM X-Force research shows AI-generated spear-phishing emails dramatically outperform human-crafted messages.", url:"https://www.darkreading.com", source:"Dark Reading", publishedAt:d(9), category:"Research", tags:["AI","Phishing","LLM","Social Engineering"], severity:"High" },
  { id:"fb-m-002", title:"Cl0p Exploits MFT Platform — 130+ Enterprises Compromised via SQL Injection", summary:"Cl0p ransomware exploited a critical SQL injection in a managed file transfer platform.", url:"https://krebsonsecurity.com", source:"Krebs on Security", publishedAt:d(10), category:"Malware", tags:["Cl0p","SQL Injection","Data Theft"], severity:"Critical" },
  { id:"fb-a-002", title:"NSA and CISA Release Joint Advisory on Top 15 Exploited Vulnerabilities", summary:"NSA, CISA, and Five Eyes partners identified the top 15 most routinely exploited vulnerabilities.", url:"https://www.cisa.gov", source:"CISA Alerts", publishedAt:d(11), category:"Advisory", tags:["NSA","CISA","Five Eyes","Log4Shell","CVE"], severity:"High" },
];