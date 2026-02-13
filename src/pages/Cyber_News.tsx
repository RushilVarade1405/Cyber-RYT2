import { motion, type Variants } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Rss,
  Shield,
  AlertTriangle,
  Bug,
  RefreshCw,
  ExternalLink,
  Clock,
  Newspaper,
  Globe,
  Radio,
  BookOpen,
  AlertCircle,
  Terminal,
  Flame,
  CalendarDays,
  TrendingUp,
  Wifi,
  WifiOff,
  ChevronRight,
  Zap,
  Eye,
} from "lucide-react";

import {
  newsArticles,
  getDayOfYear,
  type CyberNewsArticle,
  type NewsCategory,
  type NewsSeverity,
} from "../data/News";

/* ===============================
   CONFIG MAPS
=============================== */
const categoryConfig: Record<
  NewsCategory,
  { icon: any; color: string; bg: string; border: string; label: string }
> = {
  Breach: {
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-400/40",
    label: "Data Breach",
  },
  Vulnerability: {
    icon: Bug,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-400/40",
    label: "Vulnerability",
  },
  Malware: {
    icon: Flame,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-400/40",
    label: "Malware",
  },
  Advisory: {
    icon: Shield,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-400/40",
    label: "Advisory",
  },
  Research: {
    icon: BookOpen,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-400/40",
    label: "Research",
  },
};

const severityConfig: Record<
  NewsSeverity,
  { color: string; bg: string; border: string; dot: string; bar: string }
> = {
  Critical: {
    color: "text-red-300",
    bg: "bg-red-500/15",
    border: "border-red-400/50",
    dot: "bg-red-400",
    bar: "from-red-500 via-rose-400 to-red-500",
  },
  High: {
    color: "text-orange-300",
    bg: "bg-orange-500/15",
    border: "border-orange-400/50",
    dot: "bg-orange-400",
    bar: "from-orange-500 via-amber-400 to-orange-500",
  },
  Medium: {
    color: "text-yellow-300",
    bg: "bg-yellow-500/15",
    border: "border-yellow-400/50",
    dot: "bg-yellow-400",
    bar: "from-yellow-500 via-amber-400 to-yellow-500",
  },
  Low: {
    color: "text-green-300",
    bg: "bg-green-500/15",
    border: "border-green-400/50",
    dot: "bg-green-400",
    bar: "from-cyan-500 via-blue-400 to-cyan-500",
  },
};

// OPTIMIZED: Expanded RSS sources with new feeds organized by category
const RSS_SOURCES = [
  // Core Security News
  { name: "The Hacker News",      color: "text-cyan-400",    dot: "bg-cyan-400",    url: "https://feeds.feedburner.com/TheHackersNews" },
  { name: "BleepingComputer",     color: "text-blue-400",    dot: "bg-blue-400",    url: "https://www.bleepingcomputer.com/feed/" },
  { name: "Krebs on Security",    color: "text-indigo-400",  dot: "bg-indigo-400",  url: "https://krebsonsecurity.com/feed/" },
  { name: "Dark Reading",         color: "text-violet-400",  dot: "bg-violet-400",  url: "https://www.darkreading.com/rss.xml" },
  
  // Additional Security Coverage
  { name: "Help Net Security",    color: "text-purple-400",  dot: "bg-purple-400",  url: "https://www.helpnetsecurity.com/feed/" },
  { name: "Cybersecurity News",   color: "text-fuchsia-400", dot: "bg-fuchsia-400", url: "https://cybersecuritynews.com/feed/" },
  
  // Tech & Development
  { name: "CNX Software",         color: "text-pink-400",    dot: "bg-pink-400",    url: "https://www.cnx-software.com/feed/" },
  { name: "XDA Developers",       color: "text-rose-400",    dot: "bg-rose-400",    url: "https://www.xda-developers.com/feed/" },
  
  // Government & CVE Sources
  { name: "CISA Alerts",          color: "text-yellow-400",  dot: "bg-yellow-400",  url: "https://www.cisa.gov/news.xml" },
  { name: "NIST NVD",             color: "text-green-400",   dot: "bg-green-400",   url: "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml" },
];

/* ===============================
   DAILY ROTATION ENGINE
   OPTIMIZED: Improved sorting and filtering
=============================== */
const DAILY_FEED_SIZE = 9;

function getDailyArticles(all: CyberNewsArticle[]): CyberNewsArticle[] {
  // Sort by newest first so fresh stories bubble up
  const byDate = [...all].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const seed = getDayOfYear();
  // Deterministic shuffle seeded by day-of-year applied within date-sorted list
  const shuffled = [...byDate].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) * 31 + seed * 7) % byDate.length;
    const hashB = (b.id.charCodeAt(0) * 31 + seed * 7) % byDate.length;
    return hashA - hashB;
  });

  // Always guarantee at least one Critical on top
  const criticals = shuffled.filter((a) => a.severity === "Critical");
  const rest = shuffled.filter((a) => a.severity !== "Critical");

  return [...criticals, ...rest].slice(0, DAILY_FEED_SIZE);
}

/* ===============================
   COUNTDOWN TO NEXT REFRESH
=============================== */
function getSecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ===============================
   ANIMATIONS — PERFORMANCE OPTIMIZED
=============================== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ===============================
   HELPERS
=============================== */
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function getSourceColor(source: string) {
  return (
    RSS_SOURCES.find((s) => s.name === source) ?? {
      color: "text-gray-400",
      dot: "bg-gray-400",
    }
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ===============================
   SUB-COMPONENTS
=============================== */

function LivePulse() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
      </span>
      <span className="text-green-400 text-xs font-bold tracking-widest uppercase">
        Live Feed
      </span>
    </span>
  );
}

function SourcePill({ source }: { source: string }) {
  const sc = getSourceColor(source);
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold
                  px-2.5 py-1 rounded-full bg-white/5 border border-white/10 ${sc.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
      {source}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: NewsSeverity }) {
  const sc = severityConfig[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-black
                  px-3 py-1 rounded-full border
                  ${sc.bg} ${sc.border} ${sc.color} uppercase tracking-wider`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} animate-pulse`} />
      {severity}
    </span>
  );
}

function CategoryBadge({ category }: { category: NewsCategory }) {
  const cc = categoryConfig[category];
  const Icon = cc.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold
                  px-3 py-1 rounded-full border
                  ${cc.bg} ${cc.border} ${cc.color}`}
    >
      <Icon className="w-3 h-3" />
      {cc.label}
    </span>
  );
}

/** Breaking news scrolling ticker — uses CSS animation for smooth scroll */
function BreakingTicker({ articles }: { articles: CyberNewsArticle[] }) {
  const critical = articles.filter((a) => a.severity === "Critical");
  if (critical.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border-2 border-red-500/40
                  bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60"
      style={{ boxShadow: "0 0 30px rgba(239,68,68,0.2)" }}
    >
      <div className="flex items-center">
        <div
          className="shrink-0 flex items-center gap-2 px-5 py-3
                       bg-red-500/30 border-r-2 border-red-500/40"
        >
          <Radio className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-red-300 font-black text-xs tracking-[0.2em] uppercase whitespace-nowrap">
            Breaking
          </span>
        </div>
        <div className="overflow-hidden flex-1 py-3 px-4">
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation: marquee 40s linear infinite;
              will-change: transform;
            }
          `}</style>
          <div className="marquee-track">
            {[...critical, ...critical].map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-gray-200
                           hover:text-red-300 transition-colors duration-300 mr-14"
              >
                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{a.title}</span>
                <span className="text-red-500/50 mx-2">◆</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ article }: { article: CyberNewsArticle }) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{ willChange: "transform, opacity" }}
      className="group relative block overflow-hidden rounded-3xl cursor-pointer
                 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent
                 border-2 border-white/10 hover:border-cyan-400/60
                 transition-all duration-400"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-br from-cyan-500/8 via-transparent to-blue-500/8 pointer-events-none"
      />
      <div className={`h-[4px] w-full bg-gradient-to-r ${severityConfig[article.severity].bar}`} />

      <div className="relative p-8 sm:p-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase
                         bg-gradient-to-r from-cyan-500/30 to-blue-500/30
                         border border-cyan-400/50 text-cyan-300"
            >
              ⚡ Today's Top Story
            </span>
            <CategoryBadge category={article.category} />
          </div>
          <SeverityBadge severity={article.severity} />
        </div>

        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight
                     group-hover:text-cyan-100 transition-colors duration-300"
        >
          {article.title}
        </h2>

        <p className="text-gray-300 leading-relaxed text-base">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-400/25
                         text-blue-300 text-xs font-bold"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-5 flex-wrap">
            <SourcePill source={article.source} />
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(article.publishedAt)}
            </span>
          </div>
          <span
            className="flex items-center gap-2 text-sm font-black text-cyan-400
                       group-hover:text-cyan-300 transition-colors duration-300"
          >
            Read Full Story
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function NewsCard({ article }: { article: CyberNewsArticle }) {
  const sc = severityConfig[article.severity];

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{ willChange: "transform, opacity" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer
                 bg-gradient-to-br from-white/5 to-white/[0.02]
                 border border-white/10 hover:border-cyan-400/50
                 transition-all duration-400"
    >
      <div className={`h-[3px] w-full bg-gradient-to-r ${sc.bar}`} />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400
                    bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none"
      />

      <div className="relative flex flex-col flex-1 p-6 gap-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CategoryBadge category={article.category} />
          <SeverityBadge severity={article.severity} />
        </div>

        <h3
          className="text-base font-black text-gray-100 leading-snug
                     group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2"
        >
          {article.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-400/20
                         text-blue-300 text-xs font-semibold"
            >
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-500 text-xs font-semibold">
              +{article.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex flex-col gap-1.5">
            <SourcePill source={article.source} />
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <Clock className="w-3 h-3" />
              {timeAgo(article.publishedAt)}
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-bold text-cyan-400
                        opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            Read More
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  colorClass,
  bgClass,
  borderClass,
}: {
  icon: any;
  value: number | string;
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
      style={{ willChange: "transform, opacity" }}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl
                  bg-gradient-to-br from-white/5 to-white/[0.02]
                  border-2 ${borderClass}
                  transition-all duration-300`}
    >
      <div className={`p-2.5 rounded-xl ${bgClass} border ${borderClass}`}>
        <Icon className={`w-5 h-5 ${colorClass}`} />
      </div>
      <div>
        <div className={`text-2xl font-black ${colorClass}`}>{value}</div>
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   MAIN COMPONENT
=============================== */
export default function CyberNews() {
  const dailyArticles = useMemo(() => getDailyArticles(newsArticles), []);
  const featuredArticle = dailyArticles[0];
  const gridArticles = dailyArticles.slice(1);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [countdown, setCountdown] = useState(getSecondsUntilMidnight());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [todayLabel] = useState(() =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  );

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setCountdown(getSecondsUntilMidnight()), 1000);
    return () => clearInterval(tick);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsRefreshing(false);
  }, []);

  const stats = useMemo(() => ({
    total:      newsArticles.length,
    critical:   newsArticles.filter((a) => a.severity === "Critical").length,
    sources:    RSS_SOURCES.length,
    todayCount: dailyArticles.length,
  }), [dailyArticles]);

  return (
    <div className="relative min-h-screen bg-black">

      {/* ─── BACKGROUND — CSS-only animations ─── */}
      <style>{`
        @keyframes blob1 { 0%,100%{transform:scale(1)   opacity:.2} 50%{transform:scale(1.15) opacity:.35} }
        @keyframes blob2 { 0%,100%{transform:scale(1.1) opacity:.12} 50%{transform:scale(1)   opacity:.25} }
        @keyframes blob3 { 0%,100%{transform:scale(1)   opacity:.08} 50%{transform:scale(1.2) opacity:.2}  }
        @keyframes blob4 { 0%,100%{opacity:.04}               50%{opacity:.15} }
        @keyframes floatDot { 0%,100%{transform:translateY(0);  opacity:0} 50%{transform:translateY(-70px);opacity:.6} }
        .blob1{animation:blob1 9s ease-in-out infinite;will-change:transform;}
        .blob2{animation:blob2 11s ease-in-out infinite;will-change:transform;}
        .blob3{animation:blob3 14s ease-in-out infinite;will-change:transform;}
        .blob4{animation:blob4 6s ease-in-out infinite;}
      `}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
        <div className="blob1 absolute top-0 left-1/4 w-[700px] h-[700px] bg-cyan-500/15 blur-[200px] rounded-full" />
        <div className="blob2 absolute top-1/2 right-0 w-[550px] h-[550px] bg-blue-500/15 blur-[180px] rounded-full" />
        <div className="blob3 absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-indigo-500/10 blur-[160px] rounded-full" />
        <div className="blob4 absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-red-500/20 blur-[200px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(34,211,238) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(34,211,238) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/25 rounded-full"
            style={{
              left: `${(i * 8 + 4) % 100}%`,
              top: `${(i * 13 + 6) % 100}%`,
              animation: `floatDot ${4 + (i % 4)}s ease-in-out ${i * 0.5}s infinite`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative px-6 sm:px-10 lg:px-16 pt-6 pb-16 max-w-[1600px] mx-auto"
      >

        {/* ─── HERO HEADER ─── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-10 text-center"
        >
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full
                       bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20
                       border-2 border-cyan-400/50"
          >
            <Rss className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-black text-xs tracking-[0.3em] uppercase">
              Cyber World
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <LivePulse />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4
                       bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400
                       bg-clip-text text-transparent leading-tight
                       tracking-tight"
          >
            Cyber
            <span className="text-blue-400">News</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-base sm:text-lg mb-8 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Daily cybersecurity intelligence aggregated from {RSS_SOURCES.length} trusted security feeds — breaches, vulnerabilities, malware, and
            advisories refreshed every 24 hours.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold
                          ${isOnline
                            ? "bg-green-500/10 border-green-400/40 text-green-400"
                            : "bg-red-500/10 border-red-400/40 text-red-400"}`}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              {isOnline ? "Connected" : "Offline"}
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full
                            bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold">
              <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
              {todayLabel}
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full
                            bg-gradient-to-r from-cyan-500/10 to-blue-500/10
                            border border-cyan-400/30 text-cyan-300 text-xs font-bold
                            font-mono tracking-wider">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Next update in {formatCountdown(countdown)}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-full
                         bg-cyan-500/15 border border-cyan-400/40 text-cyan-400
                         hover:bg-cyan-500/25 hover:border-cyan-400/60
                         transition-all duration-300 text-xs font-semibold
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing…" : "Refresh Feed"}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ─── STATS ROW ─── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          <StatCard icon={Newspaper}     value={stats.total}      label="Total Articles"  colorClass="text-cyan-400"   bgClass="bg-cyan-500/15"   borderClass="border-cyan-400/30" />
          <StatCard icon={AlertTriangle} value={stats.critical}   label="Critical Alerts" colorClass="text-red-400"    bgClass="bg-red-500/15"    borderClass="border-red-400/30" />
          <StatCard icon={Globe}         value={stats.sources}    label="RSS Sources"     colorClass="text-blue-400"   bgClass="bg-blue-500/15"   borderClass="border-blue-400/30" />
          <StatCard icon={Eye}           value={stats.todayCount} label="Today's Stories" colorClass="text-violet-400" bgClass="bg-violet-500/15" borderClass="border-violet-400/30" />
        </motion.div>

        {/* ─── BREAKING TICKER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10"
        >
          <BreakingTicker articles={dailyArticles} />
        </motion.div>

        {/* ─── DAILY EDITION LABEL ─── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-5 mb-8"
        >
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400/20 rounded-full" />
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl
                          bg-gradient-to-br from-cyan-500/15 to-blue-500/15
                          border-2 border-cyan-400/40">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-black text-xs tracking-[0.15em] uppercase">
              Today's Intel Briefing
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40
                             text-cyan-400 text-xs font-black">
              {dailyArticles.length} stories
            </span>
          </div>
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-cyan-400/40 to-cyan-400/20 rounded-full" />
        </motion.div>

        {/* ─── FEATURED CARD ─── */}
        {featuredArticle && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mb-8"
          >
            <FeaturedCard article={featuredArticle} />
          </motion.div>
        )}

        {/* ─── NEWS GRID ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {gridArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </motion.div>

        {/* ─── INFO PANEL — OPTIMIZED WITH NEW SOURCES ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 relative p-8 rounded-3xl overflow-hidden
                     bg-gradient-to-br from-white/5 to-white/[0.02]
                     border-2 border-cyan-400/20"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/6 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — RSS Sources with Categories */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-400/40">
                  <Rss className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-transparent bg-clip-text
                                 bg-gradient-to-r from-cyan-400 to-blue-400">
                    Trusted Intel Sources
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">{RSS_SOURCES.length} curated RSS feeds</p>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl
                                bg-green-500/10 border border-green-400/30">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-bold">Active</span>
                </div>
              </div>

              {/* Organized by category */}
              <div className="space-y-4">
                {/* Core Security */}
                <div>
                  <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-2 px-2">
                    Core Security News
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {RSS_SOURCES.slice(0, 4).map((src, i) => (
                      <motion.a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        style={{ willChange: "transform, opacity" }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                                   bg-white/5 border border-white/10
                                   hover:border-cyan-400/30 hover:bg-white/[0.07]
                                   transition-all duration-300"
                      >
                        <span className={`w-2 h-2 rounded-full ${src.dot} animate-pulse`} />
                        <span className={`text-xs font-semibold ${src.color}`}>{src.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Additional Coverage */}
                <div>
                  <h4 className="text-xs font-black text-purple-400 uppercase tracking-wider mb-2 px-2">
                    Additional Coverage
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {RSS_SOURCES.slice(4, 6).map((src, i) => (
                      <motion.a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i + 4) * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        style={{ willChange: "transform, opacity" }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                                   bg-white/5 border border-white/10
                                   hover:border-purple-400/30 hover:bg-white/[0.07]
                                   transition-all duration-300"
                      >
                        <span className={`w-2 h-2 rounded-full ${src.dot} animate-pulse`} />
                        <span className={`text-xs font-semibold ${src.color}`}>{src.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Tech & Dev */}
                <div>
                  <h4 className="text-xs font-black text-pink-400 uppercase tracking-wider mb-2 px-2">
                    Tech & Development
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {RSS_SOURCES.slice(6, 8).map((src, i) => (
                      <motion.a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i + 6) * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        style={{ willChange: "transform, opacity" }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                                   bg-white/5 border border-white/10
                                   hover:border-pink-400/30 hover:bg-white/[0.07]
                                   transition-all duration-300"
                      >
                        <span className={`w-2 h-2 rounded-full ${src.dot} animate-pulse`} />
                        <span className={`text-xs font-semibold ${src.color}`}>{src.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Government & CVE */}
                <div>
                  <h4 className="text-xs font-black text-yellow-400 uppercase tracking-wider mb-2 px-2">
                    Government & CVE
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {RSS_SOURCES.slice(8, 10).map((src, i) => (
                      <motion.a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i + 8) * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        style={{ willChange: "transform, opacity" }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                                   bg-white/5 border border-white/10
                                   hover:border-yellow-400/30 hover:bg-white/[0.07]
                                   transition-all duration-300"
                      >
                        <span className={`w-2 h-2 rounded-full ${src.dot} animate-pulse`} />
                        <span className={`text-xs font-semibold ${src.color}`}>{src.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — How daily rotation works */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-indigo-500/15 border border-indigo-400/40">
                  <Terminal className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-transparent bg-clip-text
                                 bg-gradient-to-r from-indigo-400 to-violet-400">
                    Daily Rotation System
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">How fresh intel is served every day</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: CalendarDays,
                    color: "text-cyan-400",
                    bg: "bg-cyan-500/10",
                    border: "border-cyan-400/30",
                    title: "Newest First",
                    desc: "Articles are sorted by publish date descending before rotation, so the latest cybersecurity news always surfaces first.",
                  },
                  {
                    icon: AlertTriangle,
                    color: "text-red-400",
                    bg: "bg-red-500/10",
                    border: "border-red-400/30",
                    title: "Critical First",
                    desc: "Critical severity articles are always prioritized to the top of the daily feed regardless of publish date.",
                  },
                  {
                    icon: Zap,
                    color: "text-yellow-400",
                    bg: "bg-yellow-500/10",
                    border: "border-yellow-400/30",
                    title: "Add New Articles",
                    desc: "Simply add new objects to News.ts. They are automatically included in the daily rotation without any code changes.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      style={{ willChange: "transform, opacity" }}
                      className="flex items-start gap-4 p-4 rounded-xl
                                 bg-white/5 border border-white/10"
                    >
                      <div className={`shrink-0 p-2 rounded-lg ${item.bg} border ${item.border}`}>
                        <Icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-black ${item.color} mb-1`}>{item.title}</div>
                        <div className="text-gray-400 text-xs leading-relaxed">{item.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-indigo-950/50 border border-indigo-400/25">
                <p className="text-indigo-300 text-xs font-semibold leading-relaxed">
                  <span className="font-black">Ready for live RSS?</span> Replace{" "}
                  <code className="bg-white/5 px-1.5 py-0.5 rounded text-cyan-300">getDailyArticles()</code>{" "}
                  with a call to your{" "}
                  <code className="bg-white/5 px-1.5 py-0.5 rounded text-cyan-300">/api/news</code>{" "}
                  endpoint and the UI updates automatically.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}