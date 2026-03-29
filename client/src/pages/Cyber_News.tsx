// src/pages/Cyber_News.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Cybersecurity News Feed — RSS Edition
// Data: 11 live RSS feeds (7 global + 4 India/regional) via proxy chain.
// Falls back to curated static articles if all feeds are unreachable.
// ─────────────────────────────────────────────────────────────────────────────

import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Rss, Shield, AlertTriangle, Bug, RefreshCw, ExternalLink,
  Clock, Newspaper, Globe, BookOpen, AlertCircle, Terminal,
  Flame, CalendarDays, TrendingUp, Wifi, WifiOff, ChevronRight,
  Eye, Loader2, X, Filter, ChevronDown, RotateCcw, Radio, Activity,
} from "lucide-react";

import {
  newsArticles, fetchAllRSSArticles, clearCache, getCacheStatus,
  getDailyArticles, RSS_SOURCES,
  type CyberNewsArticle, type NewsCategory, type NewsSeverity, type FetchResult,
} from "../data/News";

/* ─────────────────────────────────────────────────────────────
   CONFIG MAPS
───────────────────────────────────────────────────────────── */
const categoryConfig: Record<NewsCategory, { icon: any; color: string; bg: string; border: string; label: string; short: string }> = {
  Breach:        { icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-400/40", label: "Data Breach",    short: "Breach"   },
  Vulnerability: { icon: Bug,           color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-400/40",    label: "Vulnerability", short: "Vuln"     },
  Malware:       { icon: Flame,         color: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-400/40",   label: "Malware",       short: "Malware"  },
  Advisory:      { icon: Shield,        color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-400/40", label: "Advisory",      short: "Advisory" },
  Research:      { icon: BookOpen,      color: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-400/40",   label: "Research",      short: "Intel"    },
};

const severityConfig: Record<NewsSeverity, { color: string; bg: string; border: string; dot: string; bar: string }> = {
  Critical: { color: "text-red-300",    bg: "bg-red-500/15",    border: "border-red-400/50",    dot: "bg-red-400",    bar: "from-red-500 via-rose-400 to-red-500"        },
  High:     { color: "text-orange-300", bg: "bg-orange-500/15", border: "border-orange-400/50", dot: "bg-orange-400", bar: "from-orange-500 via-amber-400 to-orange-500" },
  Medium:   { color: "text-yellow-300", bg: "bg-yellow-500/15", border: "border-yellow-400/50", dot: "bg-yellow-400", bar: "from-yellow-500 via-amber-400 to-yellow-500" },
  Low:      { color: "text-green-300",  bg: "bg-green-500/15",  border: "border-green-400/50",  dot: "bg-green-400",  bar: "from-cyan-500 via-blue-400 to-cyan-500"       },
};

const DAILY_FEED_SIZE = 9;

/* ─────────────────────────────────────────────────────────────
   TIME HELPERS
───────────────────────────────────────────────────────────── */
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getDaysAgo(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function groupByDate(articles: CyberNewsArticle[]): Record<string, CyberNewsArticle[]> {
  const groups: Record<string, CyberNewsArticle[]> = {};
  const ORDER = ["Today", "Yesterday", "This Week", "This Month", "Older"];
  articles.forEach((a) => {
    const d = getDaysAgo(a.publishedAt);
    const key = d === 0 ? "Today" : d === 1 ? "Yesterday" : d <= 7 ? "This Week" : d <= 30 ? "This Month" : "Older";
    if (!groups[key]) groups[key] = [];
    groups[key].push(a);
  });
  const out: Record<string, CyberNewsArticle[]> = {};
  ORDER.forEach((k) => { if (groups[k]) out[k] = groups[k]; });
  return out;
}

function getSecondsUntilMidnight(): number {
  const now = new Date(), midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

function formatCountdown(s: number): string {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

/* ─────────────────────────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────────────────────────── */
const fadeUp: Variants  = { hidden: { opacity: 0, y: 16  }, visible: { opacity: 1, y: 0,   transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

/* ─────────────────────────────────────────────────────────────
   MICRO COMPONENTS
───────────────────────────────────────────────────────────── */
function LivePulse() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span className="text-green-400 text-[10px] font-bold tracking-widest uppercase">Live</span>
    </span>
  );
}

function SourcePill({ source }: { source: string }) {
  const s = RSS_SOURCES.find((r) => r.name === source) ?? { color: "text-gray-400", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${s.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      <span className="truncate max-w-[90px] sm:max-w-[120px] lg:max-w-none">{source}</span>
    </span>
  );
}

function SeverityBadge({ severity }: { severity: NewsSeverity }) {
  const sc = severityConfig[severity];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-black shrink-0 px-2 py-0.5 rounded-full border uppercase tracking-wide ${sc.bg} ${sc.border} ${sc.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sc.dot} animate-pulse`} />
      {severity}
    </span>
  );
}

function CategoryBadge({ category }: { category: NewsCategory }) {
  const cc = categoryConfig[category];
  const Icon = cc.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full border ${cc.bg} ${cc.border} ${cc.color}`}>
      <Icon className="w-2.5 h-2.5 shrink-0" />
      <span className="hidden sm:inline">{cc.label}</span>
      <span className="inline sm:hidden">{cc.short}</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEED STATUS BAR  (shows which RSS sources succeeded/failed)
───────────────────────────────────────────────────────────── */
function FeedStatusBar({
  succeeded, failed, loading,
}: { succeeded: string[]; failed: string[]; loading: boolean }) {
  const enabled = RSS_SOURCES.filter((s) => s.enabled);
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 mt-2 px-2">
      {enabled.map((src) => {
        const ok      = succeeded.includes(src.name);
        const err     = failed.includes(src.name);
        const pending = loading && !ok && !err;
        return (
          <div key={src.name}
            className={`flex items-center gap-1 px-1.5 py-1 rounded-lg border text-[9px] font-semibold transition-all duration-500
              ${ok      ? `bg-green-500/10  border-green-400/30  ${src.color}`        :
                err     ? `bg-red-500/10    border-red-400/25    text-red-400/70`      :
                          `bg-white/5       border-white/10      text-gray-600`}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0
              ${ok ? src.dot : err ? "bg-red-400/60" : "bg-gray-600"}
              ${pending ? "animate-pulse" : ""}`} />
            {src.name}
          </div>
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
    <div className="relative overflow-hidden rounded-xl border-2 border-red-500/40 bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60" style={{ boxShadow: "0 0 20px rgba(239,68,68,0.15)" }}>
      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-t{display:flex;width:max-content;animation:marquee 44s linear infinite;will-change:transform;}
        @media(max-width:480px){.marquee-t{animation-duration:28s;}}
      `}</style>
      <div className="flex items-stretch min-h-[36px] sm:min-h-[42px]">
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-red-500/30 border-r-2 border-red-500/40">
          <Radio className="w-3 h-3 text-red-400 animate-pulse" />
          <span className="text-red-300 font-black text-[10px] tracking-[0.15em] uppercase whitespace-nowrap">Breaking</span>
        </div>
        <div className="overflow-hidden flex-1 flex items-center px-2 sm:px-3">
          <div className="marquee-t">
            {[...critical, ...critical].map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-gray-200 hover:text-red-300 transition-colors duration-300 mr-8 sm:mr-12">
                <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 shrink-0" />
                <span className="whitespace-nowrap">{a.title}</span>
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
   NEWS CARD
───────────────────────────────────────────────────────────── */
function NewsCard({ article }: { article: CyberNewsArticle }) {
  const sc = severityConfig[article.severity];
  return (
    <motion.a href={article.url} target="_blank" rel="noopener noreferrer"
      variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ willChange: "transform, opacity" }}
      className="group relative flex flex-col overflow-hidden rounded-xl cursor-pointer h-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
      <div className={`h-0.5 w-full bg-gradient-to-r shrink-0 ${sc.bar}`} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative flex flex-col flex-1 p-3.5 sm:p-4 gap-2.5">
        <div className="flex items-center justify-between gap-1.5 flex-wrap">
          <CategoryBadge category={article.category} />
          <SeverityBadge severity={article.severity} />
        </div>
        <h3 className="text-sm font-black text-gray-100 leading-snug line-clamp-2 shrink-0 group-hover:text-cyan-200 transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 flex-1">{article.summary}</p>
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] font-semibold">#{tag}</span>
          ))}
          {article.tags.length > 2 && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-500 text-[10px] font-semibold">+{article.tags.length - 2}</span>
          )}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex flex-col gap-1 min-w-0">
            <SourcePill source={article.source} />
            <span className="flex items-center gap-1 text-[10px] text-gray-600">
              <Clock className="w-2.5 h-2.5 shrink-0" />{timeAgo(article.publishedAt)} ago
            </span>
          </div>
          <ExternalLink className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 ml-2" />
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURED CARD
───────────────────────────────────────────────────────────── */
function FeaturedCard({ article }: { article: CyberNewsArticle }) {
  const sc = severityConfig[article.severity];
  return (
    <motion.a href={article.url} target="_blank" rel="noopener noreferrer"
      variants={scaleIn} whileHover={{ y: -4, transition: { duration: 0.22 } }}
      style={{ willChange: "transform, opacity" }}
      className="group relative block overflow-hidden rounded-2xl cursor-pointer bg-black/50 backdrop-blur-sm border-2 border-white/10 hover:border-cyan-400/60 transition-all duration-300">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/8 via-transparent to-blue-500/8 pointer-events-none" />
      <div className={`h-1 w-full bg-gradient-to-r ${sc.bar}`} />
      <div className="relative p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 text-cyan-300 whitespace-nowrap">
              ⚡ Top Story
            </span>
            <CategoryBadge category={article.category} />
          </div>
          <SeverityBadge severity={article.severity} />
        </div>
        <h2 className="font-black text-white leading-tight group-hover:text-cyan-100 transition-colors duration-300" style={{ fontSize: "clamp(1.1rem,3.2vw,2.5rem)" }}>
          {article.title}
        </h2>
        <p className="text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
          {article.summary}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 5).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 rounded-lg bg-blue-500/10 border border-blue-400/25 text-blue-300 text-[10px] font-bold">#{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/10 flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <SourcePill source={article.source} />
            <span className="flex items-center gap-1 text-[10px] text-gray-500">
              <CalendarDays className="w-3 h-3" />
              <span className="hidden sm:inline">{formatDate(article.publishedAt)}</span>
              <span className="sm:hidden">{timeAgo(article.publishedAt)} ago</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-black text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap">
            Read Story <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, value, label, colorClass, bgClass, borderClass }: { icon: any; value: number | string; label: string; colorClass: string; bgClass: string; borderClass: string }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      style={{ willChange: "transform, opacity" }}
      className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl bg-black/40 backdrop-blur-sm border ${borderClass} transition-all duration-300`}>
      <div className={`p-2 rounded-lg ${bgClass} border ${borderClass} shrink-0`}>
        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${colorClass}`} />
      </div>
      <div className="min-w-0">
        <div className={`text-xl sm:text-2xl font-black leading-none ${colorClass}`}>{value}</div>
        <div className="text-[9px] sm:text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5 truncate">{label}</div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VIEW-MORE MODAL
───────────────────────────────────────────────────────────── */
function ViewMoreModal({ isOpen, onClose, articles }: { isOpen: boolean; onClose: () => void; articles: CyberNewsArticle[] }) {
  const [selPeriod,   setSelPeriod]   = useState("all");
  const [selCategory, setSelCategory] = useState("all");
  const [selSeverity, setSelSeverity] = useState("all");
  const [selRegion,   setSelRegion]   = useState("all");

  const grouped = useMemo(() => {
    let f = articles;
    if (selCategory !== "all") f = f.filter((a) => a.category === selCategory);
    if (selSeverity !== "all") f = f.filter((a) => a.severity === selSeverity);
    if (selRegion   !== "all") {
      const names = RSS_SOURCES.filter((s) => s.region === selRegion).map((s) => s.name);
      f = f.filter((a) => names.includes(a.source));
    }
    if (selPeriod !== "all") f = f.filter((a) => {
      const d = getDaysAgo(a.publishedAt);
      return selPeriod === "today" ? d === 0 : selPeriod === "week" ? d <= 7 : d <= 30;
    });
    return groupByDate(f);
  }, [articles, selPeriod, selCategory, selSeverity, selRegion]);

  const total     = useMemo(() => Object.values(grouped).flat().length, [grouped]);
  const hasFilter = selPeriod !== "all" || selCategory !== "all" || selSeverity !== "all" || selRegion !== "all";
  const reset     = useCallback(() => { setSelPeriod("all"); setSelCategory("all"); setSelSeverity("all"); setSelRegion("all"); }, []);

  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, onClose]);

  const filters = [
    { val: selPeriod,   set: setSelPeriod,   opts: [["all","All Time"],["today","Today"],["week","This Week"],["month","This Month"]] as [string,string][] },
    { val: selCategory, set: setSelCategory, opts: [["all","All Categories"],["Breach","🔶 Breach"],["Vulnerability","🔴 Vuln"],["Malware","🔥 Malware"],["Advisory","🛡️ Advisory"],["Research","📘 Research"]] as [string,string][] },
    { val: selSeverity, set: setSelSeverity, opts: [["all","All Severities"],["Critical","🔴 Critical"],["High","🟠 High"],["Medium","🟡 Medium"],["Low","🟢 Low"]] as [string,string][] },
    { val: selRegion,   set: setSelRegion,   opts: [["all","All Regions"],["global","🌐 Global"],["india","🇮🇳 India"]] as [string,string][] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }} />
          <div style={{ position: "fixed", inset: 0, zIndex: 201, display: "flex", alignItems: "flex-end", justifyContent: "center", pointerEvents: "none" }} className="sm:items-center">
            <motion.div key="panel"
              initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: "auto", width: "100%", maxWidth: "min(92vw,1200px)", maxHeight: "92dvh", boxShadow: "0 0 80px rgba(34,211,238,0.2),0 40px 100px rgba(0,0,0,0.8)" }}
              className="flex flex-col rounded-t-2xl sm:rounded-2xl bg-gradient-to-br from-gray-900 via-[#0a0a0f] to-gray-900 border-t-2 border-x-2 sm:border-2 border-cyan-400/30 overflow-hidden">

              <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/25" />
              </div>

              {/* Modal Header */}
              <div className="shrink-0 bg-gradient-to-r from-[#020d18]/95 via-[#020b1a]/95 to-[#020d18]/95 backdrop-blur-xl border-b border-cyan-400/25 px-4 sm:px-6 pt-3 sm:pt-4 pb-3">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/15 border border-cyan-400/40 shrink-0">
                      <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 truncate">All Cyber News</h2>
                      <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5">
                        <span className="text-cyan-400 font-bold">{total}</span>{hasFilter ? ` of ${articles.length}` : ""} articles · sorted by date
                      </p>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose}
                    className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 border border-red-400/40 hover:bg-red-500/25 hover:border-red-400/70 transition-all duration-200 shrink-0">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {filters.map(({ val, set, opts }, fi) => (
                    <div key={fi} className="relative shrink-0">
                      <select value={val} onChange={(e) => set(e.target.value)}
                        className="appearance-none pl-2.5 pr-6 py-1.5 rounded-lg bg-white/5 border border-white/20 text-cyan-300 text-[11px] font-semibold cursor-pointer hover:bg-white/10 hover:border-cyan-400/50 focus:outline-none focus:border-cyan-400/70 transition-all duration-200">
                        {opts.map(([v, l]) => <option key={v} value={v} className="bg-gray-900 text-white">{l}</option>)}
                      </select>
                      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-cyan-400/60 pointer-events-none" />
                    </div>
                  ))}
                  <AnimatePresence>
                    {hasFilter && (
                      <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileTap={{ scale: 0.95 }} onClick={reset}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-400/40 text-red-400 text-[11px] font-semibold whitespace-nowrap hover:bg-red-500/20 transition-all duration-200">
                        <X className="w-2.5 h-2.5" /> Reset
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(34,211,238,0.25) transparent" }}>
                {Object.keys(grouped).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 sm:py-24 gap-4">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10"><Filter className="w-10 h-10 text-gray-600" /></div>
                    <div className="text-center">
                      <p className="text-gray-300 text-sm font-bold">No articles match</p>
                      <p className="text-gray-600 text-xs mt-1">Try adjusting your filters</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={reset}
                      className="px-4 py-2 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/25 transition-all">
                      Clear filters
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-7 sm:space-y-10">
                    {Object.entries(grouped).map(([period, pa], gi) => (
                      <motion.div key={period} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: gi * 0.05 }}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30 shrink-0">
                            <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                            <span className="text-cyan-300 font-black text-[11px] sm:text-xs tracking-wide uppercase">{period}</span>
                            <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 text-[10px] font-black">{pa.length}</span>
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
              <div className="shrink-0 bg-gradient-to-r from-[#020d18]/95 via-[#020b1a]/95 to-[#020d18]/95 backdrop-blur-xl border-t border-cyan-400/20 px-4 sm:px-6 py-2.5">
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
                  <span>Showing <span className="text-cyan-400 font-bold">{total}</span> of <span className="text-gray-300">{articles.length}</span> articles</span>
                  <span className="text-cyan-400/60 font-semibold hidden sm:flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/15 text-[9px]">ESC</kbd> or tap outside
                  </span>
                  <span className="sm:hidden text-cyan-400/60 font-semibold">Tap outside to close</span>
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
  const [allArticles,  setAllArticles]  = useState<CyberNewsArticle[]>(newsArticles);
  const [fetchResult,  setFetchResult]  = useState<Partial<FetchResult>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnline,     setIsOnline]     = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [countdown,    setCountdown]    = useState(getSecondsUntilMidnight());
  const [showViewMore, setShowViewMore] = useState(false);
  const [gridKey,      setGridKey]      = useState(0);

  const lastFetchRef = useRef<number>(0);
  const isInitRef    = useRef<boolean>(true);

  const [todayLabel] = useState(() =>
    new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  );

  // ── Derived: top 9 articles for main view ──
  const displayArticles = useMemo(() => {
    const sorted = [...allArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (fetchResult.isLive) {
      const crits = sorted.filter((a) => a.severity === "Critical");
      const rest  = sorted.filter((a) => a.severity !== "Critical");
      return [...crits, ...rest].slice(0, DAILY_FEED_SIZE);
    }
    return getDailyArticles(allArticles, DAILY_FEED_SIZE);
  }, [allArticles, fetchResult]);

  const featuredArticle = displayArticles[0];
  const gridArticles    = displayArticles.slice(1);

  const stats = useMemo(() => ({
    total:    allArticles.length,
    critical: allArticles.filter((a) => a.severity === "Critical").length,
    feeds:    (fetchResult.succeededFeeds ?? []).length,
    today:    allArticles.filter((a) => getDaysAgo(a.publishedAt) === 0).length,
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
      try {
        const result = await fetchAllRSSArticles();
        if (mounted) applyResult(result);
      } catch {
        if (mounted) applyResult({ articles: newsArticles, succeededFeeds: [], failedFeeds: [], fromCache: false, isLive: false });
      } finally {
        if (mounted) { setIsRefreshing(false); isInitRef.current = false; }
      }
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
      try { applyResult(await fetchAllRSSArticles()); }
      catch { /* silent */ }
      finally { setIsRefreshing(false); }
    }
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [applyResult, isRefreshing]);

  // 15-min background refresh
  useEffect(() => {
    const id = setInterval(async () => {
      try { applyResult(await fetchAllRSSArticles()); } catch { /* silent */ }
    }, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, [applyResult]);

  // Online/offline detection
  useEffect(() => {
    const on = () => setIsOnline(true), off = () => setIsOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  // Midnight countdown
  useEffect(() => {
    const id = setInterval(() => setCountdown(getSecondsUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  // Manual refresh
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    clearCache();
    try { applyResult(await fetchAllRSSArticles(true)); }
    catch { /* silent */ }
    finally { setIsRefreshing(false); }
  }, [isRefreshing, applyResult]);

  const cacheStatus = getCacheStatus();
  const isLive      = fetchResult.isLive === true;

  /* ── RENDER ──────────────────────────────────────────────── */
  return (
    <div className="relative min-h-screen">
      <style>{`.fluid-hero{font-size:clamp(1.75rem,5.5vw,3.75rem);}`}</style>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="relative px-3 sm:px-5 md:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 pb-10 sm:pb-16 max-w-[1600px] mx-auto">

        {/* ── HERO ── */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-6 sm:mb-10 text-center">
          <motion.div variants={scaleIn}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-5 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/50">
            <Rss className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="text-cyan-400 font-black text-[10px] tracking-[0.25em] uppercase">Cyber_World</span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {isLive
              ? <LivePulse />
              : isRefreshing
                ? <span className="inline-flex items-center gap-1 text-violet-400 text-[10px] font-bold uppercase"><Loader2 className="w-2.5 h-2.5 animate-spin" />Fetching</span>
                : <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest">Offline</span>}
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="fluid-hero font-black mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
            Cyber_<span className="text-blue-400">News</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-300 text-xs sm:text-sm lg:text-base mb-3 max-w-2xl mx-auto leading-relaxed font-light px-4 sm:px-0">
            {isLive
              ? `Live feed from ${stats.feeds} trusted RSS sources — global & Indian cybersecurity intelligence.`
              : "Daily cybersecurity intelligence — breaches, vulnerabilities, malware, and advisories."}
          </motion.p>

          {/* RSS Feed status bar */}
          <motion.div variants={fadeUp}>
            <FeedStatusBar
              succeeded={fetchResult.succeededFeeds ?? []}
              failed={fetchResult.failedFeeds ?? []}
              loading={isRefreshing}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 mt-3">
            <div className="flex items-center justify-center gap-1.5 flex-wrap px-3">
              {/* online indicator */}
              <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[10px] font-semibold ${isOnline ? "bg-green-500/10 border-green-400/40 text-green-400" : "bg-red-500/10 border-red-400/40 text-red-400"}`}>
                {isOnline ? <Wifi className="w-2.5 h-2.5 shrink-0" /> : <WifiOff className="w-2.5 h-2.5 shrink-0" />}
                {isOnline ? "Online" : "Offline"}
              </div>

              {/* cache freshness */}
              {cacheStatus.cached && !isRefreshing && (() => {
                const age = Math.floor((cacheStatus.age || 0) / 60000);
                const fresh = age < 5;
                return (
                  <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[10px] font-semibold ${fresh ? "bg-green-500/10 border-green-400/30 text-green-300" : "bg-cyan-500/10 border-cyan-400/30 text-cyan-300"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${fresh ? "bg-green-400" : "bg-cyan-400"}`} />
                    {fresh ? "Fresh" : `${age}m ago`}
                  </div>
                );
              })()}

              {/* date */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[10px] font-semibold">
                <CalendarDays className="w-2.5 h-2.5 text-cyan-400" />
                <span className="hidden lg:inline">{todayLabel}</span>
                <span className="lg:hidden">{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>

              {/* countdown */}
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold font-mono tracking-wider">
                <Clock className="w-2.5 h-2.5 text-cyan-400 animate-pulse shrink-0" />
                <span className="hidden sm:inline">Next </span>{formatCountdown(countdown)}
              </div>
            </div>

            {/* refresh button */}
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={handleRefresh} disabled={isRefreshing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 hover:bg-cyan-500/25 hover:border-cyan-400/60 transition-all duration-300 text-[11px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              {isRefreshing ? <Loader2 className="w-3 h-3 animate-spin shrink-0" /> : <RefreshCw className="w-3 h-3 shrink-0" />}
              {isRefreshing ? "Fetching RSS feeds…" : "Refresh Feeds"}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* fallback warning */}
        {!isLive && !isRefreshing && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-5 sm:mb-8 p-3.5 sm:p-5 rounded-xl border border-yellow-400/40 bg-gradient-to-r from-yellow-950/60 via-yellow-900/40 to-yellow-950/60">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-bold text-xs sm:text-sm">RSS feeds unreachable — showing curated fallback content</p>
                <p className="text-yellow-400/70 text-[10px] sm:text-xs mt-0.5">
                  All 3 CORS proxies failed ({(fetchResult.failedFeeds ?? []).length} feeds). Check your connection and try refreshing.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* partial failure notice */}
        {isLive && (fetchResult.failedFeeds ?? []).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-4 px-4 py-2.5 rounded-xl border border-orange-400/25 bg-orange-500/5 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="text-orange-300 text-[11px] font-semibold">
              {fetchResult.failedFeeds!.length} feed{fetchResult.failedFeeds!.length > 1 ? "s" : ""} unavailable: {fetchResult.failedFeeds!.join(", ")}
            </span>
          </motion.div>
        )}

        {/* ── STATS ── */}
        <motion.div initial="hidden" animate="visible" variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-8">
          <StatCard icon={Newspaper}     value={stats.total}    label="Total"    colorClass="text-cyan-400"   bgClass="bg-cyan-500/15"   borderClass="border-cyan-400/30"   />
          <StatCard icon={AlertTriangle} value={stats.critical} label="Critical" colorClass="text-red-400"    bgClass="bg-red-500/15"    borderClass="border-red-400/30"    />
          <StatCard icon={Activity}      value={stats.feeds}    label="Feeds"    colorClass="text-blue-400"   bgClass="bg-blue-500/15"   borderClass="border-blue-400/30"   />
          <StatCard icon={Eye}           value={stats.today}    label="Today"    colorClass="text-violet-400" bgClass="bg-violet-500/15" borderClass="border-violet-400/30" />
        </motion.div>

        {/* ── BREAKING TICKER ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.4 }} className="mb-5 sm:mb-8">
          <BreakingTicker articles={displayArticles} />
        </motion.div>

        {/* ── SECTION LABEL ── */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32, duration: 0.4 }}
          className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400/20 rounded-full" />
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-400/40">
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
            <span className="text-cyan-300 font-black text-[10px] sm:text-xs tracking-[0.12em] uppercase whitespace-nowrap">Top Intel</span>
            <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 text-[10px] font-black">{displayArticles.length}</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-cyan-400/40 to-cyan-400/20 rounded-full" />
        </motion.div>

        {/* ── FEATURED ── */}
        {featuredArticle && (
          <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-3 sm:mb-5">
            <FeaturedCard article={featuredArticle} />
          </motion.div>
        )}

        {/* ── GRID ── */}
        <motion.div key={gridKey} initial="hidden" animate="visible" variants={stagger}
          className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {gridArticles.map((article) => <NewsCard key={article.id} article={article} />)}
        </motion.div>

        {/* ── VIEW MORE ── */}
        {allArticles.length > DAILY_FEED_SIZE && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="mt-7 sm:mt-10 flex justify-center">
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowViewMore(true)}
              className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border-2 border-cyan-400/50 hover:border-cyan-400/80 transition-all duration-300 overflow-hidden"
              style={{ boxShadow: "0 0 20px rgba(34,211,238,0.15)" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/12 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="relative flex items-center justify-center gap-3">
                <Newspaper className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                <div className="text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 whitespace-nowrap">View All Cyber News</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 text-xs font-black shrink-0">{allArticles.length}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">Filter by date, category, severity & region</p>
                </div>
                <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce shrink-0" />
              </div>
            </motion.button>
          </motion.div>
        )}

        {/* ── MODAL ── */}
        <ViewMoreModal isOpen={showViewMore} onClose={() => setShowViewMore(false)} articles={allArticles} />

        {/* ── INFO PANEL ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-9 sm:mt-14 relative p-4 sm:p-6 lg:p-8 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm border border-cyan-400/20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

            {/* RSS Sources */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-400/40 shrink-0">
                  <Rss className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">RSS Feed Sources</h3>
                  <p className="text-gray-500 text-[10px] mt-0.5">{RSS_SOURCES.filter((s) => s.enabled).length} feeds · global + India</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {RSS_SOURCES.filter((s) => s.enabled).map((src, i) => {
                  const ok = (fetchResult.succeededFeeds ?? []).includes(src.name);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-1.5 px-2 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${src.dot} ${ok && isLive ? "animate-pulse" : "opacity-40"}`} />
                      <span className={`text-[10px] font-semibold truncate ${ok && isLive ? src.color : "text-gray-600"}`}>{src.name}</span>
                      {src.region === "india" && <span className="text-[8px] ml-auto shrink-0">🇮🇳</span>}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* How it works */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-400/40 shrink-0">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">How It Works</h3>
                  <p className="text-gray-500 text-[10px] mt-0.5">RSS → CORS proxy → XML parse → classify → render</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Globe,        color: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-400/30",   title: "3-Proxy CORS Chain",        desc: "corsproxy.io → allorigins.win → thingproxy. First success wins. RSS feeds cannot be fetched directly from browsers." },
                  { icon: RotateCcw,    color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-400/30", title: "15-Min Cache + Auto-Refresh", desc: "Results cached in sessionStorage. Tab refocus re-fetches after 5 min. Background refresh every 15 min." },
                  { icon: Shield,       color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-400/30", title: "Auto-Classifier",            desc: "Articles auto-tagged as Breach / Vuln / Malware / Advisory / Research using keyword matching on title + description." },
                  { icon: AlertTriangle,color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-400/30", title: "30-Day Recency Filter",      desc: "Articles older than 30 days are automatically discarded so the feed always shows fresh content." },
                ].map(({ icon: Icon, color, bg, border, title, desc }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className={`shrink-0 p-1.5 rounded-lg ${bg} border ${border}`}>
                      <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-black ${color} mb-0.5`}>{title}</div>
                      <div className="text-gray-400 text-[10px] leading-relaxed">{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}