// src/services/rssService.ts
// ─────────────────────────────────────────────────────────────────────────────
// RSS Feed Aggregation Service
// Fetches and parses cybersecurity news from multiple RSS sources
// ─────────────────────────────────────────────────────────────────────────────

import type { CyberNewsArticle, NewsCategory, NewsSeverity } from "../data/News";

export interface RSSSource {
  name: string;
  url: string;
  color: string;
  dot: string;
  category?: NewsCategory;
  enabled: boolean;
}

// Expanded RSS sources with categorization
export const RSS_SOURCES: RSSSource[] = [
  // Core Security News
  { 
    name: "The Hacker News", 
    url: "https://feeds.feedburner.com/TheHackersNews",
    color: "text-cyan-400", 
    dot: "bg-cyan-400",
    enabled: true 
  },
  { 
    name: "BleepingComputer", 
    url: "https://www.bleepingcomputer.com/feed/",
    color: "text-blue-400", 
    dot: "bg-blue-400",
    enabled: true 
  },
  { 
    name: "Krebs on Security", 
    url: "https://krebsonsecurity.com/feed/",
    color: "text-indigo-400", 
    dot: "bg-indigo-400",
    enabled: true 
  },
  { 
    name: "Dark Reading", 
    url: "https://www.darkreading.com/rss.xml",
    color: "text-violet-400", 
    dot: "bg-violet-400",
    enabled: true 
  },
  
  // Additional Security Coverage
  { 
    name: "Help Net Security", 
    url: "https://www.helpnetsecurity.com/feed/",
    color: "text-purple-400", 
    dot: "bg-purple-400",
    enabled: true 
  },
  { 
    name: "Cybersecurity News", 
    url: "https://cybersecuritynews.com/feed/",
    color: "text-fuchsia-400", 
    dot: "bg-fuchsia-400",
    enabled: true 
  },
  
  // Tech & Development
  { 
    name: "CNX Software", 
    url: "https://www.cnx-software.com/feed/",
    color: "text-pink-400", 
    dot: "bg-pink-400",
    enabled: true 
  },
  { 
    name: "XDA Developers", 
    url: "https://www.xda-developers.com/feed/",
    color: "text-rose-400", 
    dot: "bg-rose-400",
    enabled: true 
  },
  
  // Government & CVE Sources
  { 
    name: "CISA Alerts", 
    url: "https://www.cisa.gov/news.xml",
    color: "text-yellow-400", 
    dot: "bg-yellow-400",
    enabled: true 
  },
  { 
    name: "NIST NVD", 
    url: "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml",
    color: "text-green-400", 
    dot: "bg-green-400",
    enabled: true 
  },
  
  // Additional Premium Sources
  { 
    name: "SecurityWeek", 
    url: "https://www.securityweek.com/feed/",
    color: "text-amber-400", 
    dot: "bg-amber-400",
    enabled: true 
  },
  { 
    name: "The Record", 
    url: "https://therecord.media/feed",
    color: "text-lime-400", 
    dot: "bg-lime-400",
    enabled: true 
  },
  { 
    name: "Malwarebytes Labs", 
    url: "https://www.malwarebytes.com/blog/feed",
    color: "text-emerald-400", 
    dot: "bg-emerald-400",
    enabled: true 
  },
  { 
    name: "Sophos News", 
    url: "https://news.sophos.com/feed/",
    color: "text-teal-400", 
    dot: "bg-teal-400",
    enabled: true 
  },
  { 
    name: "Trend Micro Research", 
    url: "https://www.trendmicro.com/en_us/research.rss",
    color: "text-sky-400", 
    dot: "bg-sky-400",
    enabled: true 
  },
];

// Cache configuration
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
const cache = new Map<string, { data: CyberNewsArticle[]; timestamp: number }>();

// Keyword-based categorization
const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
  Breach: ["breach", "leak", "data theft", "stolen", "compromised", "hack", "exposed"],
  Vulnerability: ["vulnerability", "cve", "exploit", "flaw", "zero-day", "patch", "bug"],
  Malware: ["malware", "ransomware", "trojan", "virus", "botnet", "backdoor", "cryptominer"],
  Advisory: ["advisory", "alert", "warning", "cisa", "nist", "fbi", "directive"],
  Research: ["research", "study", "analysis", "framework", "technique", "methodology"],
};

const SEVERITY_KEYWORDS: Record<NewsSeverity, string[]> = {
  Critical: ["critical", "severe", "emergency", "zero-day", "rce", "remote code execution", "actively exploited"],
  High: ["high", "important", "serious", "widespread", "major"],
  Medium: ["medium", "moderate", "notable"],
  Low: ["low", "minor", "info", "informational"],
};

/**
 * Intelligently categorize article based on title and content
 */
function categorizeArticle(title: string, description: string): NewsCategory {
  const text = `${title} ${description}`.toLowerCase();
  
  let maxScore = 0;
  let bestCategory: NewsCategory = "Research";
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (text.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category as NewsCategory;
    }
  }
  
  return bestCategory;
}

/**
 * Determine severity based on content analysis
 */
function determineSeverity(title: string, description: string): NewsSeverity {
  const text = `${title} ${description}`.toLowerCase();
  
  for (const [severity, keywords] of Object.entries(SEVERITY_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return severity as NewsSeverity;
    }
  }
  
  return "Medium";
}

/**
 * Extract relevant tags from content
 */
function extractTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags: Set<string> = new Set();
  
  // Common cybersecurity terms to look for
  const tagPatterns = [
    "ransomware", "phishing", "apt", "botnet", "ddos", "malware",
    "windows", "linux", "android", "ios", "chrome", "firefox",
    "microsoft", "google", "apple", "amazon", "cisco",
    "zero-day", "exploit", "vulnerability", "breach", "leak",
    "cryptocurrency", "bitcoin", "supply chain", "cloud",
    "ai", "machine learning", "quantum", "encryption"
  ];
  
  tagPatterns.forEach(pattern => {
    if (text.includes(pattern)) {
      tags.add(pattern.split(" ").map(w => 
        w.charAt(0).toUpperCase() + w.slice(1)
      ).join(" "));
    }
  });
  
  return Array.from(tags).slice(0, 6); // Limit to 6 tags
}

/**
 * Parse RSS XML to extract articles
 */
async function parseRSSFeed(xml: string, sourceName: string): Promise<CyberNewsArticle[]> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  
  // Check for parsing errors
  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    console.error(`RSS parse error for ${sourceName}:`, parseError.textContent);
    return [];
  }
  
  const items = Array.from(doc.querySelectorAll("item, entry"));
  
  return items.map((item, index) => {
    // Handle both RSS and Atom formats
    const title = 
      item.querySelector("title")?.textContent?.trim() || 
      "Untitled Article";
    
    const description = 
      item.querySelector("description")?.textContent?.trim() ||
      item.querySelector("summary")?.textContent?.trim() ||
      item.querySelector("content")?.textContent?.trim()?.substring(0, 300) ||
      "No description available";
    
    const link = 
      item.querySelector("link")?.textContent?.trim() ||
      item.querySelector("link")?.getAttribute("href") ||
      "#";
    
    const pubDate = 
      item.querySelector("pubDate")?.textContent?.trim() ||
      item.querySelector("published")?.textContent?.trim() ||
      item.querySelector("updated")?.textContent?.trim() ||
      new Date().toISOString();
    
    // Clean HTML from description
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    const cleanDescription = tempDiv.textContent || tempDiv.innerText || description;
    
    // Generate unique ID
    const id = `rss-${sourceName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}-${index}`;
    
    // Intelligent categorization
    const category = categorizeArticle(title, cleanDescription);
    const severity = determineSeverity(title, cleanDescription);
    const tags = extractTags(title, cleanDescription);
    
    return {
      id,
      title: title.substring(0, 200), // Limit title length
      summary: cleanDescription.substring(0, 400), // Limit summary length
      url: link,
      source: sourceName,
      publishedAt: new Date(pubDate).toISOString(),
      category,
      severity,
      tags,
    };
  });
}

/**
 * Fetch articles from a single RSS source with error handling
 */
async function fetchSourceArticles(source: RSSSource): Promise<CyberNewsArticle[]> {
  try {
    // Use a CORS proxy for RSS feeds
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`;
    
    const response = await fetch(proxyUrl, {
      headers: {
        "Accept": "application/rss+xml, application/xml, text/xml, application/atom+xml",
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const xmlText = await response.text();
    const articles = await parseRSSFeed(xmlText, source.name);
    
    console.log(`✓ Fetched ${articles.length} articles from ${source.name}`);
    return articles;
    
  } catch (error) {
    console.error(`✗ Failed to fetch ${source.name}:`, error);
    return [];
  }
}

/**
 * Fetch articles from all enabled RSS sources in parallel
 */
export async function fetchAllRSSArticles(
  maxArticlesPerSource: number = 10
): Promise<CyberNewsArticle[]> {
  const cacheKey = "all-articles";
  
  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("📦 Returning cached RSS articles");
    return cached.data;
  }
  
  console.log("🔄 Fetching fresh RSS articles from all sources...");
  
  const enabledSources = RSS_SOURCES.filter(s => s.enabled);
  
  // Fetch all sources in parallel with Promise.allSettled for resilience
  const results = await Promise.allSettled(
    enabledSources.map(source => fetchSourceArticles(source))
  );
  
  // Combine successful results
  const allArticles = results
    .filter((result): result is PromiseFulfilledResult<CyberNewsArticle[]> => 
      result.status === "fulfilled"
    )
    .flatMap(result => result.value)
    .slice(0, maxArticlesPerSource); // Limit per source
  
  // Sort by publish date (newest first)
  allArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  // Cache the results
  cache.set(cacheKey, {
    data: allArticles,
    timestamp: Date.now(),
  });
  
  console.log(`✓ Successfully aggregated ${allArticles.length} total articles`);
  return allArticles;
}

/**
 * Get articles from a specific source
 */
export async function fetchSourceByName(sourceName: string): Promise<CyberNewsArticle[]> {
  const source = RSS_SOURCES.find(s => s.name === sourceName);
  if (!source) {
    throw new Error(`Source "${sourceName}" not found`);
  }
  
  return fetchSourceArticles(source);
}

/**
 * Clear the cache (useful for manual refresh)
 */
export function clearCache(): void {
  cache.clear();
  console.log("🗑️  RSS cache cleared");
}

/**
 * Get cache status
 */
export function getCacheStatus(): { cached: boolean; age?: number } {
  const cached = cache.get("all-articles");
  if (!cached) return { cached: false };
  
  return {
    cached: true,
    age: Date.now() - cached.timestamp,
  };
}