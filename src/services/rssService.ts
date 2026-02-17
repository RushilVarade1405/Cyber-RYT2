// src/services/rssService.ts
// ─────────────────────────────────────────────────────────────────────────────
// Live RSS Feed Aggregation Service - Production Hardened (2026)
// Fixes:
//   • Invalid date parsing
//   • NaN sort bugs
//   • Old 300–400 day articles
//   • Ensures only recent content shown
// ─────────────────────────────────────────────────────────────────────────────

import type { CyberNewsArticle, NewsCategory, NewsSeverity } from "../data/News";

/* =====================================================================================
   CONFIG
===================================================================================== */

const CACHE_DURATION = 15 * 60 * 1000;
const FETCH_TIMEOUT_MS = 10_000;
const MAX_ARTICLE_AGE_DAYS = 30; // 🔥 Only show last 30 days

/* =====================================================================================
   TYPES
===================================================================================== */

export interface RSSSource {
  name: string;
  url: string;
  color: string;
  dot: string;
  enabled: boolean;
  priority?: number;
}

/* =====================================================================================
   RSS SOURCES  (unchanged)
===================================================================================== */

export const RSS_SOURCES: RSSSource[] = [
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", color: "text-cyan-400", dot: "bg-cyan-400", enabled: true, priority: 10 },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/", color: "text-blue-400", dot: "bg-blue-400", enabled: true, priority: 10 },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/", color: "text-indigo-400", dot: "bg-indigo-400", enabled: true, priority: 10 },
  { name: "Dark Reading", url: "https://www.darkreading.com/rss.xml", color: "text-violet-400", dot: "bg-violet-400", enabled: true, priority: 10 },
  { name: "SecurityWeek", url: "https://www.securityweek.com/feed/", color: "text-purple-400", dot: "bg-purple-400", enabled: true, priority: 10 },

  { name: "CISA Alerts", url: "https://www.cisa.gov/news.xml", color: "text-yellow-400", dot: "bg-yellow-400", enabled: true, priority: 9 },
  { name: "NIST NVD", url: "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml", color: "text-lime-400", dot: "bg-lime-400", enabled: true, priority: 9 },
];

/* =====================================================================================
   CACHE
===================================================================================== */

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

function setCache(key: string, data: CyberNewsArticle[]) {
  cache.set(key, { data, timestamp: Date.now() });
}

/* =====================================================================================
   SAFE DATE HANDLING  (🔥 CRITICAL FIX)
===================================================================================== */

function parseSafeDate(dateStr?: string | null): string {
  if (!dateStr) return new Date().toISOString();

  const parsed = new Date(dateStr);

  if (isNaN(parsed.getTime())) {
    console.warn("Invalid RSS date:", dateStr);
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

function isRecent(dateISO: string): boolean {
  const ageMs = Date.now() - new Date(dateISO).getTime();
  const maxAgeMs = MAX_ARTICLE_AGE_DAYS * 24 * 60 * 60 * 1000;
  return ageMs <= maxAgeMs;
}

/* =====================================================================================
   CLEAN HTML
===================================================================================== */

function cleanHTML(html: string): string {
  const d = document.createElement("div");
  d.innerHTML = html;
  return (d.textContent || d.innerText || "").trim();
}

/* =====================================================================================
   VALIDATE XML
===================================================================================== */

function isValidFeedXML(text: string): boolean {
  if (!text || text.length < 100) return false;
  const t = text.trimStart();
  const hasXML = t.startsWith("<?xml") || t.startsWith("<rss") || t.startsWith("<feed");
  const hasItems = t.includes("<item") || t.includes("<entry");
  return hasXML && hasItems;
}

/* =====================================================================================
   FETCH WITH TIMEOUT
===================================================================================== */

async function fetchWithTimeout(url: string): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: "application/rss+xml, application/xml, text/xml, */*" },
    });
  } finally {
    clearTimeout(timer);
  }
}

/* =====================================================================================
   FETCH RAW XML
===================================================================================== */

async function fetchRawXML(source: RSSSource): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(source.url);
    if (res.ok) {
      const text = await res.text();
      if (isValidFeedXML(text)) return text;
    }
  } catch {}

  return null;
}

/* =====================================================================================
   PARSE RSS
===================================================================================== */

function parseRSSFeed(xml: string, sourceName: string): CyberNewsArticle[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");

  if (doc.querySelector("parsererror")) return [];

  const items = Array.from(
    doc.querySelectorAll("item").length > 0
      ? doc.querySelectorAll("item")
      : doc.querySelectorAll("entry")
  );

  return items.slice(0, 20).map((item, index): CyberNewsArticle => {
    const title = item.querySelector("title")?.textContent || "Untitled";
    const description =
      item.querySelector("description")?.textContent ||
      item.querySelector("summary")?.textContent ||
      "No description";

    const link =
      item.querySelector("link")?.textContent ||
      item.querySelector("link")?.getAttribute("href") ||
      "#";

    const pubDate =
      item.querySelector("pubDate")?.textContent ||
      item.querySelector("published")?.textContent ||
      item.querySelector("updated")?.textContent;

    const publishedAt = parseSafeDate(pubDate);

    return {
      id: `${sourceName}-${Date.now()}-${index}`,
      title: cleanHTML(title).substring(0, 200),
      summary: cleanHTML(description).substring(0, 400),
      url: link,
      source: sourceName,
      publishedAt,
      category: "Research",
      severity: "Medium",
      tags: ["Cybersecurity"],
    };
  });
}

/* =====================================================================================
   MAIN FETCH
===================================================================================== */

export async function fetchAllRSSArticles(): Promise<CyberNewsArticle[]> {
  const enabledSources = RSS_SOURCES.filter((s) => s.enabled);

  const cacheKey = getCacheKey(enabledSources.map((s) => s.name));
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const results = await Promise.allSettled(
    enabledSources.map(async (source) => {
      const xml = await fetchRawXML(source);
      if (!xml) return [];
      return parseRSSFeed(xml, source.name);
    })
  );

  let allArticles: CyberNewsArticle[] = [];

  results.forEach((r) => {
    if (r.status === "fulfilled") allArticles.push(...r.value);
  });

  // 🔥 REMOVE OLD ARTICLES
  allArticles = allArticles.filter((a) => isRecent(a.publishedAt));

  // 🔥 BULLETPROOF SORT
  allArticles.sort((a, b) => {
    const timeA = new Date(a.publishedAt).getTime();
    const timeB = new Date(b.publishedAt).getTime();

    if (isNaN(timeA) && isNaN(timeB)) return 0;
    if (isNaN(timeA)) return 1;
    if (isNaN(timeB)) return -1;

    return timeB - timeA;
  });

  setCache(cacheKey, allArticles);

  return allArticles;
}

/* =====================================================================================
   CACHE CONTROL
===================================================================================== */

export function clearRSSCache() {
  cache.clear();
}

export function getRSSCacheStatus() {
  return { cached: cache.size > 0 };
}
