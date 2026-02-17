// src/services/rssService.ts
// ─────────────────────────────────────────────────────────────────────────────
// Live RSS Feed Aggregation Service - 30+ Cybersecurity Sources
// Professional-grade feed parsing with intelligent categorization
//
// PRODUCTION FIX (2025):
//   Root cause: `/raw` allorigins endpoint returns HTML error pages on deployed
//   domains; corsproxy.io rate-limits non-localhost origins.  Fix: use a
//   waterfall of 5 proven proxies, validate every response is real XML before
//   accepting it, and never treat a proxy's HTML error page as feed data.
// ─────────────────────────────────────────────────────────────────────────────

import type { CyberNewsArticle, NewsCategory, NewsSeverity } from "../data/News";

export interface RSSSource {
  name: string;
  url: string;
  color: string;
  dot: string;
  enabled: boolean;
  priority?: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// RSS SOURCES — unchanged from original
// ═══════════════════════════════════════════════════════════════════════════
export const RSS_SOURCES: RSSSource[] = [
  // ── Core Security News (Priority: 10) ──
  { name: "The Hacker News",    url: "https://feeds.feedburner.com/TheHackersNews",          color: "text-cyan-400",    dot: "bg-cyan-400",    enabled: true, priority: 10 },
  { name: "BleepingComputer",   url: "https://www.bleepingcomputer.com/feed/",                color: "text-blue-400",    dot: "bg-blue-400",    enabled: true, priority: 10 },
  { name: "Krebs on Security",  url: "https://krebsonsecurity.com/feed/",                     color: "text-indigo-400",  dot: "bg-indigo-400",  enabled: true, priority: 10 },
  { name: "Dark Reading",       url: "https://www.darkreading.com/rss.xml",                   color: "text-violet-400",  dot: "bg-violet-400",  enabled: true, priority: 10 },
  { name: "SecurityWeek",       url: "https://www.securityweek.com/feed/",                    color: "text-purple-400",  dot: "bg-purple-400",  enabled: true, priority: 10 },

  // ── Additional Coverage (Priority: 8) ──
  { name: "Help Net Security",  url: "https://www.helpnetsecurity.com/feed/",                 color: "text-fuchsia-400", dot: "bg-fuchsia-400", enabled: true, priority: 8 },
  { name: "Cybersecurity News", url: "https://cybersecuritynews.com/feed/",                   color: "text-pink-400",    dot: "bg-pink-400",    enabled: true, priority: 8 },
  { name: "The Record",         url: "https://therecord.media/feed",                          color: "text-rose-400",    dot: "bg-rose-400",    enabled: true, priority: 8 },
  { name: "CyberScoop",         url: "https://www.cyberscoop.com/feed",                       color: "text-red-400",     dot: "bg-red-400",     enabled: true, priority: 8 },

  // ── Tech & Development (Priority: 6) ──
  { name: "CNX Software",       url: "https://www.cnx-software.com/feed/",                    color: "text-orange-400",  dot: "bg-orange-400",  enabled: true, priority: 6 },
  { name: "XDA Developers",     url: "https://www.xda-developers.com/feed/",                  color: "text-amber-400",   dot: "bg-amber-400",   enabled: true, priority: 6 },

  // ── Government & CVE Sources (Priority: 9) ──
  { name: "CISA Alerts",        url: "https://www.cisa.gov/news.xml",                         color: "text-yellow-400",  dot: "bg-yellow-400",  enabled: true, priority: 9 },
  { name: "NIST NVD",           url: "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml",  color: "text-lime-400",    dot: "bg-lime-400",    enabled: true, priority: 9 },
  { name: "US-CERT",            url: "https://www.cisa.gov/uscert/ncas/current-activity.xml", color: "text-green-400",   dot: "bg-green-400",   enabled: true, priority: 9 },

  // ── Threat Intelligence (Priority: 9) ──
  { name: "Unit 42",            url: "https://unit42.paloaltonetworks.com/feed/",              color: "text-emerald-400", dot: "bg-emerald-400", enabled: true, priority: 9 },
  { name: "Talos Intelligence", url: "https://blog.talosintelligence.com/rss/",               color: "text-teal-400",    dot: "bg-teal-400",    enabled: true, priority: 9 },
  { name: "Mandiant",           url: "https://www.mandiant.com/resources/blog/rss.xml",       color: "text-cyan-400",    dot: "bg-cyan-400",    enabled: true, priority: 9 },

  // ── Malware Research (Priority: 8) ──
  { name: "Malwarebytes Labs",  url: "https://www.malwarebytes.com/blog/feed",                color: "text-sky-400",     dot: "bg-sky-400",     enabled: true, priority: 8 },
  { name: "Sophos News",        url: "https://news.sophos.com/feed/",                         color: "text-blue-400",    dot: "bg-blue-400",    enabled: true, priority: 8 },
  { name: "Trend Micro",        url: "https://www.trendmicro.com/en_us/research.rss",         color: "text-indigo-400",  dot: "bg-indigo-400",  enabled: true, priority: 8 },
  { name: "ESET WeLiveSecurity",url: "https://www.welivesecurity.com/feed/",                  color: "text-violet-400",  dot: "bg-violet-400",  enabled: true, priority: 8 },
  { name: "Securelist",         url: "https://securelist.com/feed/",                          color: "text-purple-400",  dot: "bg-purple-400",  enabled: true, priority: 8 },

  // ── Technical Research (Priority: 7) ──
  { name: "PortSwigger",        url: "https://portswigger.net/research/rss",                  color: "text-fuchsia-400", dot: "bg-fuchsia-400", enabled: true, priority: 7 },
  { name: "Rapid7 Blog",        url: "https://www.rapid7.com/blog/rss/",                      color: "text-pink-400",    dot: "bg-pink-400",    enabled: true, priority: 7 },
  { name: "Bishop Fox",         url: "https://bishopfox.com/blog/feed",                       color: "text-rose-400",    dot: "bg-rose-400",    enabled: true, priority: 7 },

  // ── Cloud Security (Priority: 7) ──
  { name: "Snyk Blog",          url: "https://snyk.io/blog/feed",                             color: "text-red-400",     dot: "bg-red-400",     enabled: true, priority: 7 },
  { name: "Aqua Security",      url: "https://blog.aquasec.com/rss.xml",                      color: "text-orange-400",  dot: "bg-orange-400",  enabled: true, priority: 7 },
  { name: "Wiz Blog",           url: "https://www.wiz.io/blog/rss.xml",                       color: "text-amber-400",   dot: "bg-amber-400",   enabled: true, priority: 7 },

  // ── Bug Bounty Community (Priority: 6) ──
  { name: "HackerOne Blog",     url: "https://www.hackerone.com/blog.rss",                    color: "text-yellow-400",  dot: "bg-yellow-400",  enabled: true, priority: 6 },
  { name: "Bugcrowd Blog",      url: "https://www.bugcrowd.com/blog/feed/",                   color: "text-lime-400",    dot: "bg-lime-400",    enabled: true, priority: 6 },
];

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIZATION ENGINE — unchanged from original
// ═══════════════════════════════════════════════════════════════════════════
const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
  Breach:        ["breach", "leak", "data theft", "stolen", "compromised", "hack", "exposed", "database", "dump", "ransomware payment"],
  Vulnerability: ["vulnerability", "cve", "exploit", "flaw", "zero-day", "patch", "bug", "security update", "advisory", "fix"],
  Malware:       ["malware", "ransomware", "trojan", "virus", "botnet", "backdoor", "cryptominer", "rat", "rootkit", "worm", "spyware"],
  Advisory:      ["advisory", "alert", "warning", "cisa", "nist", "fbi", "directive", "guidance", "recommendation", "bulletin"],
  Research:      ["research", "study", "analysis", "framework", "technique", "methodology", "whitepaper", "report", "findings", "disclosure"],
};

const SEVERITY_KEYWORDS: Record<NewsSeverity, string[]> = {
  Critical: ["critical", "severe", "emergency", "zero-day", "rce", "remote code execution", "actively exploited", "urgent", "immediate", "mass exploitation"],
  High:     ["high", "important", "serious", "widespread", "major", "significant", "dangerous", "nation-state", "apt"],
  Medium:   ["medium", "moderate", "notable", "substantial", "concerning"],
  Low:      ["low", "minor", "info", "informational", "guidance", "best practice"],
};

// ═══════════════════════════════════════════════════════════════════════════
// CACHE — unchanged from original
// ═══════════════════════════════════════════════════════════════════════════
const CACHE_DURATION = 15 * 60 * 1000;
const cache = new Map<string, { data: CyberNewsArticle[]; timestamp: number }>();

function getCacheKey(sources: string[]): string { return `rss-${sources.sort().join("-")}`; }

function getCached(key: string): CyberNewsArticle[] | null {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > CACHE_DURATION) { cache.delete(key); return null; }
  return cached.data;
}
function setCache(key: string, data: CyberNewsArticle[]): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT ANALYSIS — unchanged from original
// ═══════════════════════════════════════════════════════════════════════════
function categorizeArticle(title: string, description: string): NewsCategory {
  const text = `${title} ${description}`.toLowerCase();
  let maxScore = 0;
  let bestCategory: NewsCategory = "Research";
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
    if (score > maxScore) { maxScore = score; bestCategory = category as NewsCategory; }
  }
  return bestCategory;
}

function determineSeverity(title: string, description: string): NewsSeverity {
  const text = `${title} ${description}`.toLowerCase();
  for (const [severity, keywords] of Object.entries(SEVERITY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) return severity as NewsSeverity;
  }
  return "Medium";
}

function extractTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags = new Set<string>();
  const tagPatterns = [
    "ransomware","phishing","apt","botnet","ddos","malware","trojan",
    "windows","linux","android","ios","macos","chrome","firefox","edge",
    "microsoft","google","apple","amazon","meta","cisco","oracle",
    "zero-day","exploit","vulnerability","breach","leak","hack",
    "cryptocurrency","bitcoin","supply chain","cloud","saas",
    "ai","machine learning","quantum","encryption","ssl","tls",
    "vpn","firewall","antivirus","edr","siem","soc",
    "python","javascript","java","php","sql injection",
    "cve","cvss","nist","cisa","fbi","nsa",
  ];
  tagPatterns.forEach((p) => {
    if (text.includes(p)) tags.add(p.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "));
  });
  return Array.from(tags).slice(0, 6);
}

// ═══════════════════════════════════════════════════════════════════════════
// RSS PARSER — unchanged from original
// ═══════════════════════════════════════════════════════════════════════════
function cleanHTML(html: string): string {
  const d = document.createElement("div");
  d.innerHTML = html;
  return (d.textContent || d.innerText || "").trim();
}

function parseRSSFeed(xml: string, sourceName: string): CyberNewsArticle[] {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    if (doc.querySelector("parsererror")) { console.warn(`⚠️  Parse error for ${sourceName}`); return []; }

    const items = Array.from(
      doc.querySelectorAll("item").length > 0 ? doc.querySelectorAll("item") : doc.querySelectorAll("entry")
    );

    return items.slice(0, 15).map((item, index): CyberNewsArticle => {
      const title       = item.querySelector("title")?.textContent?.trim() || "Untitled Article";
      const description = item.querySelector("description")?.textContent?.trim()
        || item.querySelector("summary")?.textContent?.trim()
        || item.querySelector("content")?.textContent?.trim()
        || item.querySelector("content\\:encoded")?.textContent?.trim()
        || "No description available";
      const link = item.querySelector("link")?.textContent?.trim()
        || item.querySelector("link")?.getAttribute("href")
        || item.querySelector("id")?.textContent?.trim()
        || "#";
      const pubDate = item.querySelector("pubDate")?.textContent?.trim()
        || item.querySelector("published")?.textContent?.trim()
        || item.querySelector("updated")?.textContent?.trim()
        || item.querySelector("dc\\:date")?.textContent?.trim()
        || new Date().toISOString();

      const cleanDescription = cleanHTML(description).substring(0, 400);
      const cleanTitle       = cleanHTML(title).substring(0, 200);
      const id               = `rss-${sourceName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}-${index}`;

      return {
        id,
        title: cleanTitle,
        summary: cleanDescription,
        url: link.startsWith("http") ? link : `https://${link}`,
        source: sourceName,
        publishedAt: new Date(pubDate).toISOString(),
        category: categorizeArticle(cleanTitle, cleanDescription),
        severity: determineSeverity(cleanTitle, cleanDescription),
        tags: extractTags(cleanTitle, cleanDescription).length > 0
          ? extractTags(cleanTitle, cleanDescription) : ["Cybersecurity"],
      };
    });
  } catch (err) {
    console.error(`❌ Parse error for ${sourceName}:`, err);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✅ FIXED: CORS PROXY WATERFALL
//
// WHY THE ORIGINAL BROKE IN PRODUCTION:
//   1. `allorigins.win/raw` returns an HTML error page (200 OK) when the
//      upstream feed is blocked — the old code accepted any 200 as valid XML.
//   2. `corsproxy.io` rate-limits / blocks non-localhost origins in prod.
//   3. No XML validity check — HTML bodies silently produced 0 articles,
//      triggering the "RSS feeds unavailable" fallback banner.
//
// WHAT THIS FIX DOES:
//   • Uses `allorigins.win/get` (JSON envelope) — far more reliable than /raw.
//   • Validates every response actually contains XML tags before accepting it.
//   • Chains 5 independent proxies; moves on if any returns bad data.
//   • Attempts a direct fetch first (works for feeds with open CORS headers).
//   • Per-proxy 10-second timeout prevents one slow proxy stalling everything.
// ═══════════════════════════════════════════════════════════════════════════

/** Returns true only if the string looks like real RSS/Atom XML */
function isValidFeedXML(text: string): boolean {
  if (!text || text.length < 100) return false;
  const t = text.trimStart();
  // Must start with XML declaration or a known RSS/Atom root tag
  // and contain at least one <item> or <entry> element
  const hasXMLStructure = t.startsWith("<?xml") || t.startsWith("<rss") || t.startsWith("<feed");
  const hasItems        = t.includes("<item>") || t.includes("<item ") ||
                          t.includes("<entry>") || t.includes("<entry ");
  return hasXMLStructure && hasItems;
}

/** Proxy definitions — tried in order for every feed */
interface ProxyStrategy {
  name: string;
  buildUrl(feedUrl: string): string;
  /** Extract raw XML text from the proxy's HTTP response */
  extractXML(res: Response): Promise<string>;
}

const PROXY_STRATEGIES: ProxyStrategy[] = [
  // ── 1. allorigins /get  (JSON envelope, most reliable) ──────────────────
  {
    name: "allorigins-get",
    buildUrl: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}&timestamp=${Date.now()}`,
    extractXML: async (res) => {
      const json = await res.json();
      return json?.contents ?? "";
    },
  },
  // ── 2. allorigins /raw  (plain text, second attempt with same CDN) ────────
  {
    name: "allorigins-raw",
    buildUrl: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}&timestamp=${Date.now()}`,
    extractXML: (res) => res.text(),
  },
  // ── 3. corsproxy.io ───────────────────────────────────────────────────────
  {
    name: "corsproxy.io",
    buildUrl: (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    extractXML: (res) => res.text(),
  },
  // ── 4. cors-anywhere (public demo — last resort) ─────────────────────────
  {
    name: "cors-anywhere",
    buildUrl: (u) => `https://cors-anywhere.herokuapp.com/${u}`,
    extractXML: (res) => res.text(),
  },
  // ── 5. thingproxy ────────────────────────────────────────────────────────
  {
    name: "thingproxy",
    buildUrl: (u) => `https://thingproxy.freeboard.io/fetch/${u}`,
    extractXML: (res) => res.text(),
  },
];

const FETCH_TIMEOUT_MS = 10_000; // 10 s per attempt

async function fetchWithTimeout(url: string): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: "application/rss+xml, application/xml, application/atom+xml, text/xml, */*" },
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch raw XML for a single RSS source.
 * Tries direct fetch first, then each proxy in order.
 * Accepts a response ONLY if it contains valid XML with feed items.
 */
async function fetchRawXML(source: RSSSource): Promise<string | null> {
  // ── 0. Direct fetch (works on localhost + some feeds) ────────────────────
  try {
    const res = await fetchWithTimeout(source.url);
    if (res.ok) {
      const text = await res.text();
      if (isValidFeedXML(text)) {
        console.log(`✓ ${source.name}: direct fetch OK`);
        return text;
      }
    }
  } catch {
    // blocked by CORS — move to proxies
  }

  // ── 1-5. CORS proxy waterfall ─────────────────────────────────────────────
  for (const proxy of PROXY_STRATEGIES) {
    try {
      const res = await fetchWithTimeout(proxy.buildUrl(source.url));
      if (!res.ok) {
        console.warn(`  ${proxy.name} → HTTP ${res.status} for ${source.name}`);
        continue;
      }

      const text = await proxy.extractXML(res);

      if (!isValidFeedXML(text)) {
        // Proxy returned HTML error page or empty body — skip silently
        continue;
      }

      console.log(`✓ ${source.name}: via ${proxy.name}`);
      return text;

    } catch (err) {
      // Timeout or network error — try next proxy
      console.warn(`  ${proxy.name} failed for ${source.name}:`, (err as Error).message);
    }
  }

  console.warn(`⚠️  All proxies failed for ${source.name}`);
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// FETCH ONE SOURCE
// ═══════════════════════════════════════════════════════════════════════════
async function fetchSourceArticles(source: RSSSource): Promise<CyberNewsArticle[]> {
  const xml = await fetchRawXML(source);
  if (!xml) return [];
  const articles = parseRSSFeed(xml, source.name);
  console.log(`  → ${source.name}: ${articles.length} articles parsed`);
  return articles;
}

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC API — signatures identical to original; drop-in replacement
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch live articles from all enabled RSS sources.
 * Returns cached results if available (15 min TTL).
 */
export async function fetchAllRSSArticles(): Promise<CyberNewsArticle[]> {
  const enabledSources = RSS_SOURCES
    .filter((s) => s.enabled)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  const cacheKey = getCacheKey(enabledSources.map((s) => s.name));
  const cached   = getCached(cacheKey);
  if (cached) {
    console.log(`📦 Returning ${cached.length} cached articles`);
    return cached;
  }

  console.log(`🔄 Fetching from ${enabledSources.length} RSS sources…`);

  // Fetch in parallel batches of 6 (avoid overwhelming proxies)
  const BATCH = 6;
  const allArticles: CyberNewsArticle[] = [];

  for (let i = 0; i < enabledSources.length; i += BATCH) {
    const batch   = enabledSources.slice(i, i + BATCH);
    const results = await Promise.allSettled(batch.map(fetchSourceArticles));
    results.forEach((r) => { if (r.status === "fulfilled") allArticles.push(...r.value); });
    if (allArticles.length >= 100) break; // enough — stop early
  }

  // Sort newest first
  allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Deduplicate by title prefix
  const unique = allArticles.filter((article, idx, self) =>
    idx === self.findIndex((a) =>
      a.title.toLowerCase().substring(0, 50) === article.title.toLowerCase().substring(0, 50)
    )
  );

  console.log(`✅ Aggregated ${unique.length} unique articles`);

  setCache(cacheKey, unique);
  return unique;
}

/** Clear RSS cache (called on manual refresh) */
export function clearRSSCache(): void {
  cache.clear();
  console.log("🗑️  RSS cache cleared");
}

/** Get cache status for UI indicators */
export function getRSSCacheStatus(): { cached: boolean; age?: number; count?: number } {
  const enabledSources = RSS_SOURCES.filter((s) => s.enabled);
  const cacheKey       = getCacheKey(enabledSources.map((s) => s.name));
  const cached         = cache.get(cacheKey);
  if (!cached) return { cached: false };
  return { cached: true, age: Date.now() - cached.timestamp, count: cached.data.length };
}