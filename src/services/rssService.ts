// src/services/rssService.ts
// ─────────────────────────────────────────────────────────────────────────────
// Live RSS Feed Aggregation Service - 30+ Cybersecurity Sources
// Professional-grade feed parsing with intelligent categorization
// ─────────────────────────────────────────────────────────────────────────────

import type { CyberNewsArticle, NewsCategory, NewsSeverity } from "../data/News";

export interface RSSSource {
  name: string;
  url: string;
  color: string;
  dot: string;
  enabled: boolean;
  priority?: number; // Higher = fetch first
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPANDED RSS SOURCES - 30+ FEEDS
// ═══════════════════════════════════════════════════════════════════════════
export const RSS_SOURCES: RSSSource[] = [
  // ── Core Security News (Priority: 10) ──
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", color: "text-cyan-400", dot: "bg-cyan-400", enabled: true, priority: 10 },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/", color: "text-blue-400", dot: "bg-blue-400", enabled: true, priority: 10 },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/", color: "text-indigo-400", dot: "bg-indigo-400", enabled: true, priority: 10 },
  { name: "Dark Reading", url: "https://www.darkreading.com/rss.xml", color: "text-violet-400", dot: "bg-violet-400", enabled: true, priority: 10 },
  { name: "SecurityWeek", url: "https://www.securityweek.com/feed/", color: "text-purple-400", dot: "bg-purple-400", enabled: true, priority: 10 },
  
  // ── Additional Security Coverage (Priority: 8) ──
  { name: "Help Net Security", url: "https://www.helpnetsecurity.com/feed/", color: "text-fuchsia-400", dot: "bg-fuchsia-400", enabled: true, priority: 8 },
  { name: "Cybersecurity News", url: "https://cybersecuritynews.com/feed/", color: "text-pink-400", dot: "bg-pink-400", enabled: true, priority: 8 },
  { name: "The Record", url: "https://therecord.media/feed", color: "text-rose-400", dot: "bg-rose-400", enabled: true, priority: 8 },
  { name: "CyberScoop", url: "https://www.cyberscoop.com/feed", color: "text-red-400", dot: "bg-red-400", enabled: true, priority: 8 },
  
  // ── Tech & Development (Priority: 6) ──
  { name: "CNX Software", url: "https://www.cnx-software.com/feed/", color: "text-orange-400", dot: "bg-orange-400", enabled: true, priority: 6 },
  { name: "XDA Developers", url: "https://www.xda-developers.com/feed/", color: "text-amber-400", dot: "bg-amber-400", enabled: true, priority: 6 },
  
  // ── Government & CVE Sources (Priority: 9) ──
  { name: "CISA Alerts", url: "https://www.cisa.gov/news.xml", color: "text-yellow-400", dot: "bg-yellow-400", enabled: true, priority: 9 },
  { name: "NIST NVD", url: "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml", color: "text-lime-400", dot: "bg-lime-400", enabled: true, priority: 9 },
  { name: "US-CERT", url: "https://www.cisa.gov/uscert/ncas/current-activity.xml", color: "text-green-400", dot: "bg-green-400", enabled: true, priority: 9 },
  
  // ── Threat Intelligence (Priority: 9) ──
  { name: "Unit 42", url: "https://unit42.paloaltonetworks.com/feed/", color: "text-emerald-400", dot: "bg-emerald-400", enabled: true, priority: 9 },
  { name: "Talos Intelligence", url: "https://blog.talosintelligence.com/rss/", color: "text-teal-400", dot: "bg-teal-400", enabled: true, priority: 9 },
  { name: "Mandiant", url: "https://www.mandiant.com/resources/blog/rss.xml", color: "text-cyan-400", dot: "bg-cyan-400", enabled: true, priority: 9 },
  
  // ── Malware Research (Priority: 8) ──
  { name: "Malwarebytes Labs", url: "https://www.malwarebytes.com/blog/feed", color: "text-sky-400", dot: "bg-sky-400", enabled: true, priority: 8 },
  { name: "Sophos News", url: "https://news.sophos.com/feed/", color: "text-blue-400", dot: "bg-blue-400", enabled: true, priority: 8 },
  { name: "Trend Micro Research", url: "https://www.trendmicro.com/en_us/research.rss", color: "text-indigo-400", dot: "bg-indigo-400", enabled: true, priority: 8 },
  { name: "ESET WeLiveSecurity", url: "https://www.welivesecurity.com/feed/", color: "text-violet-400", dot: "bg-violet-400", enabled: true, priority: 8 },
  { name: "Securelist", url: "https://securelist.com/feed/", color: "text-purple-400", dot: "bg-purple-400", enabled: true, priority: 8 },
  
  // ── Technical Research (Priority: 7) ──
  { name: "PortSwigger Research", url: "https://portswigger.net/research/rss", color: "text-fuchsia-400", dot: "bg-fuchsia-400", enabled: true, priority: 7 },
  { name: "Rapid7 Blog", url: "https://www.rapid7.com/blog/rss/", color: "text-pink-400", dot: "bg-pink-400", enabled: true, priority: 7 },
  { name: "Bishop Fox", url: "https://bishopfox.com/blog/feed", color: "text-rose-400", dot: "bg-rose-400", enabled: true, priority: 7 },
  
  // ── Cloud Security (Priority: 7) ──
  { name: "Snyk Blog", url: "https://snyk.io/blog/feed", color: "text-red-400", dot: "bg-red-400", enabled: true, priority: 7 },
  { name: "Aqua Security", url: "https://blog.aquasec.com/rss.xml", color: "text-orange-400", dot: "bg-orange-400", enabled: true, priority: 7 },
  { name: "Wiz Blog", url: "https://www.wiz.io/blog/rss.xml", color: "text-amber-400", dot: "bg-amber-400", enabled: true, priority: 7 },
  
  // ── Bug Bounty Community (Priority: 6) ──
  { name: "HackerOne Blog", url: "https://www.hackerone.com/blog.rss", color: "text-yellow-400", dot: "bg-yellow-400", enabled: true, priority: 6 },
  { name: "Bugcrowd Blog", url: "https://www.bugcrowd.com/blog/feed/", color: "text-lime-400", dot: "bg-lime-400", enabled: true, priority: 6 },
];

// ═══════════════════════════════════════════════════════════════════════════
// INTELLIGENT CATEGORIZATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════
const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
  Breach: ["breach", "leak", "data theft", "stolen", "compromised", "hack", "exposed", "database", "dump", "ransomware payment"],
  Vulnerability: ["vulnerability", "cve", "exploit", "flaw", "zero-day", "patch", "bug", "security update", "advisory", "fix"],
  Malware: ["malware", "ransomware", "trojan", "virus", "botnet", "backdoor", "cryptominer", "rat", "rootkit", "worm", "spyware"],
  Advisory: ["advisory", "alert", "warning", "cisa", "nist", "fbi", "directive", "guidance", "recommendation", "bulletin"],
  Research: ["research", "study", "analysis", "framework", "technique", "methodology", "whitepaper", "report", "findings", "disclosure"],
};

const SEVERITY_KEYWORDS: Record<NewsSeverity, string[]> = {
  Critical: ["critical", "severe", "emergency", "zero-day", "rce", "remote code execution", "actively exploited", "urgent", "immediate", "mass exploitation"],
  High: ["high", "important", "serious", "widespread", "major", "significant", "dangerous", "nation-state", "apt"],
  Medium: ["medium", "moderate", "notable", "substantial", "concerning"],
  Low: ["low", "minor", "info", "informational", "guidance", "best practice"],
};

// ═══════════════════════════════════════════════════════════════════════════
// CACHE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
const cache = new Map<string, { data: CyberNewsArticle[]; timestamp: number }>();

function getCacheKey(sources: string[]): string {
  return `rss-${sources.sort().join("-")}`;
}

function getCached(key: string): CyberNewsArticle[] | null {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  return cached.data;
}

function setCache(key: string, data: CyberNewsArticle[]): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ═══════════════════════════════════════════════════════════════════════════
// INTELLIGENT CONTENT ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════
function categorizeArticle(title: string, description: string): NewsCategory {
  const text = `${title} ${description}`.toLowerCase();
  let maxScore = 0;
  let bestCategory: NewsCategory = "Research";
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.reduce((acc, keyword) => 
      acc + (text.includes(keyword) ? 1 : 0), 0
    );
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category as NewsCategory;
    }
  }
  
  return bestCategory;
}

function determineSeverity(title: string, description: string): NewsSeverity {
  const text = `${title} ${description}`.toLowerCase();
  
  for (const [severity, keywords] of Object.entries(SEVERITY_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return severity as NewsSeverity;
    }
  }
  
  return "Medium";
}

function extractTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags: Set<string> = new Set();
  
  const tagPatterns = [
    "ransomware", "phishing", "apt", "botnet", "ddos", "malware", "trojan",
    "windows", "linux", "android", "ios", "macos", "chrome", "firefox", "edge",
    "microsoft", "google", "apple", "amazon", "meta", "cisco", "oracle",
    "zero-day", "exploit", "vulnerability", "breach", "leak", "hack",
    "cryptocurrency", "bitcoin", "supply chain", "cloud", "saas",
    "ai", "machine learning", "quantum", "encryption", "ssl", "tls",
    "vpn", "firewall", "antivirus", "edr", "siem", "soc",
    "python", "javascript", "java", "php", "sql injection",
    "cve", "cvss", "nist", "cisa", "fbi", "nsa",
  ];
  
  tagPatterns.forEach(pattern => {
    if (text.includes(pattern)) {
      tags.add(pattern.split(" ").map(w => 
        w.charAt(0).toUpperCase() + w.slice(1)
      ).join(" "));
    }
  });
  
  return Array.from(tags).slice(0, 6);
}

// ═══════════════════════════════════════════════════════════════════════════
// RSS PARSING ENGINE
// ═══════════════════════════════════════════════════════════════════════════
function cleanHTML(html: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return (tempDiv.textContent || tempDiv.innerText || "").trim();
}

function parseRSSFeed(xml: string, sourceName: string): CyberNewsArticle[] {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      console.warn(`⚠️  Parse error for ${sourceName}`);
      return [];
    }
    
    const items = Array.from(doc.querySelectorAll("item, entry"));
    
    return items.slice(0, 15).map((item, index) => {
      // Handle both RSS 2.0 and Atom formats
      const title = 
        item.querySelector("title")?.textContent?.trim() || 
        "Untitled Article";
      
      const description = 
        item.querySelector("description")?.textContent?.trim() ||
        item.querySelector("summary")?.textContent?.trim() ||
        item.querySelector("content")?.textContent?.trim() ||
        item.querySelector("content\\:encoded")?.textContent?.trim() ||
        "No description available";
      
      const link = 
        item.querySelector("link")?.textContent?.trim() ||
        item.querySelector("link")?.getAttribute("href") ||
        item.querySelector("id")?.textContent?.trim() ||
        "#";
      
      const pubDate = 
        item.querySelector("pubDate")?.textContent?.trim() ||
        item.querySelector("published")?.textContent?.trim() ||
        item.querySelector("updated")?.textContent?.trim() ||
        item.querySelector("dc\\:date")?.textContent?.trim() ||
        new Date().toISOString();
      
      const cleanDescription = cleanHTML(description).substring(0, 400);
      const cleanTitle = cleanHTML(title).substring(0, 200);
      
      const id = `rss-${sourceName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}-${index}`;
      const category = categorizeArticle(cleanTitle, cleanDescription);
      const severity = determineSeverity(cleanTitle, cleanDescription);
      const tags = extractTags(cleanTitle, cleanDescription);
      
      return {
        id,
        title: cleanTitle,
        summary: cleanDescription,
        url: link.startsWith("http") ? link : `https://${link}`,
        source: sourceName,
        publishedAt: new Date(pubDate).toISOString(),
        category,
        severity,
        tags: tags.length > 0 ? tags : ["Cybersecurity"],
      };
    });
  } catch (error) {
    console.error(`❌ Parse error for ${sourceName}:`, error);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// NETWORK FETCHING WITH CORS PROXY
// ═══════════════════════════════════════════════════════════════════════════
async function fetchSourceArticles(source: RSSSource): Promise<CyberNewsArticle[]> {
  try {
    // Multiple CORS proxies for redundancy
    const proxies = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`,
      `https://corsproxy.io/?${encodeURIComponent(source.url)}`,
    ];
    
    for (const proxyUrl of proxies) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout
        
        const response = await fetch(proxyUrl, {
          headers: { "Accept": "application/rss+xml, application/xml, text/xml, application/atom+xml" },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) continue;
        
        const xmlText = await response.text();
        const articles = parseRSSFeed(xmlText, source.name);
        
        if (articles.length > 0) {
          console.log(`✓ ${source.name}: ${articles.length} articles`);
          return articles;
        }
      } catch (proxyError) {
        continue; // Try next proxy
      }
    }
    
    console.warn(`⚠️  All proxies failed for ${source.name}`);
    return [];
    
  } catch (error) {
    console.error(`❌ ${source.name}:`, error instanceof Error ? error.message : "Unknown error");
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch live articles from all enabled RSS sources
 * Returns cached results if available (15min cache)
 */
export async function fetchAllRSSArticles(): Promise<CyberNewsArticle[]> {
  const enabledSources = RSS_SOURCES.filter(s => s.enabled)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0)); // Sort by priority
  
  const cacheKey = getCacheKey(enabledSources.map(s => s.name));
  const cached = getCached(cacheKey);
  
  if (cached) {
    console.log(`📦 Returning ${cached.length} cached articles`);
    return cached;
  }
  
  console.log(`🔄 Fetching from ${enabledSources.length} RSS sources...`);
  
  // Fetch top priority sources first (in parallel batches)
  const batchSize = 8;
  const allArticles: CyberNewsArticle[] = [];
  
  for (let i = 0; i < enabledSources.length; i += batchSize) {
    const batch = enabledSources.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(source => fetchSourceArticles(source))
    );
    
    results.forEach(result => {
      if (result.status === "fulfilled") {
        allArticles.push(...result.value);
      }
    });
    
    // Early exit if we have enough articles
    if (allArticles.length >= 100) break;
  }
  
  // Sort by publish date (newest first)
  allArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  // Deduplicate by title similarity
  const uniqueArticles = allArticles.filter((article, index, self) => 
    index === self.findIndex(a => 
      a.title.toLowerCase().substring(0, 50) === article.title.toLowerCase().substring(0, 50)
    )
  );
  
  console.log(`✓ Aggregated ${uniqueArticles.length} unique articles from ${enabledSources.length} sources`);
  
  setCache(cacheKey, uniqueArticles);
  return uniqueArticles;
}

/**
 * Clear RSS cache (for manual refresh)
 */
export function clearRSSCache(): void {
  cache.clear();
  console.log("🗑️  RSS cache cleared");
}

/**
 * Get cache status
 */
export function getRSSCacheStatus(): { cached: boolean; age?: number; count?: number } {
  const enabledSources = RSS_SOURCES.filter(s => s.enabled);
  const cacheKey = getCacheKey(enabledSources.map(s => s.name));
  const cached = cache.get(cacheKey);
  
  if (!cached) return { cached: false };
  
  return {
    cached: true,
    age: Date.now() - cached.timestamp,
    count: cached.data.length,
  };
}