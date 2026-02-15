import { motion, type Variants, AnimatePresence } from "framer-motion";
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
  Loader2,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";

import {
  newsArticles,
  getDayOfYear,
  type CyberNewsArticle,
  type NewsCategory,
  type NewsSeverity,
} from "../data/News";

import {
  fetchAllRSSArticles,
  clearRSSCache,
  getRSSCacheStatus,
  RSS_SOURCES,
} from "../services/rssService";

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

/* ===============================
   DAILY ROTATION ENGINE
=============================== */
const DAILY_FEED_SIZE = 9;

function getDailyArticles(all: CyberNewsArticle[]): CyberNewsArticle[] {
  const byDate = [...all].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const seed = getDayOfYear();
  const shuffled = [...byDate].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) * 31 + seed * 7) % byDate.length;
    const hashB = (b.id.charCodeAt(0) * 31 + seed * 7) % byDate.length;
    return hashA - hashB;
  });

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
   ANIMATIONS
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

function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getDaysAgo(iso: string): number {
  const diff = Date.now() - new Date(iso).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function groupArticlesByDate(articles: CyberNewsArticle[]): Record<string, CyberNewsArticle[]> {
  const groups: Record<string, CyberNewsArticle[]> = {};
  
  articles.forEach(article => {
    const daysAgo = getDaysAgo(article.publishedAt);
    let key: string;
    
    if (daysAgo === 0) key = "Today";
    else if (daysAgo === 1) key = "Yesterday";
    else if (daysAgo <= 7) key = "This Week";
    else if (daysAgo <= 30) key = "This Month";
    else key = "Older";
    
    if (!groups[key]) groups[key] = [];
    groups[key].push(article);
  });
  
  return groups;
}

/* ===============================
   SUB-COMPONENTS
=============================== */

function LivePulse() {
  return (
    <span className="inline-flex items-center gap-1.5 sm:gap-2">
      <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-400" />
      </span>
      <span className="text-green-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
        Live Feed
      </span>
    </span>
  );
}

function SourcePill({ source }: { source: string }) {
  const sc = getSourceColor(source);
  return (
    <span
      className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold
                  px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 ${sc.color}`}
    >
      <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${sc.dot}`} />
      <span className="truncate max-w-[100px] sm:max-w-none">{source}</span>
    </span>
  );
}

function SeverityBadge({ severity }: { severity: NewsSeverity }) {
  const sc = severityConfig[severity];
  return (
    <span
      className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-black
                  px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border
                  ${sc.bg} ${sc.border} ${sc.color} uppercase tracking-wider`}
    >
      <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${sc.dot} animate-pulse`} />
      {severity}
    </span>
  );
}

function CategoryBadge({ category }: { category: NewsCategory }) {
  const cc = categoryConfig[category];
  const Icon = cc.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold
                  px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border
                  ${cc.bg} ${cc.border} ${cc.color}`}
    >
      <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      <span className="hidden xs:inline">{cc.label}</span>
      <span className="inline xs:hidden">{cc.label.split(' ')[0]}</span>
    </span>
  );
}

function BreakingTicker({ articles }: { articles: CyberNewsArticle[] }) {
  const critical = articles.filter((a) => a.severity === "Critical");
  if (critical.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-red-500/40
                  bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60"
      style={{ boxShadow: "0 0 30px rgba(239,68,68,0.2)" }}
    >
      <div className="flex items-center">
        <div
          className="shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3
                       bg-red-500/30 border-r-2 border-red-500/40"
        >
          <Radio className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 animate-pulse" />
          <span className="text-red-300 font-black text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
            Breaking
          </span>
        </div>
        <div className="overflow-hidden flex-1 py-2 sm:py-3 px-2 sm:px-4">
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
                className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-200
                           hover:text-red-300 transition-colors duration-300 mr-8 sm:mr-14"
              >
                <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400 shrink-0" />
                <span className="whitespace-nowrap">{a.title}</span>
                <span className="text-red-500/50 mx-1 sm:mx-2">◆</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewMoreModal({ 
  isOpen, 
  onClose, 
  articles 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  articles: CyberNewsArticle[];
}) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  const groupedArticles = useMemo(() => {
    let filtered = articles;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }
    
    // Filter by severity
    if (selectedSeverity !== "all") {
      filtered = filtered.filter(a => a.severity === selectedSeverity);
    }
    
    // Filter by time period
    if (selectedPeriod !== "all") {
      const now = Date.now();
      filtered = filtered.filter(a => {
        const daysAgo = getDaysAgo(a.publishedAt);
        if (selectedPeriod === "today") return daysAgo === 0;
        if (selectedPeriod === "week") return daysAgo <= 7;
        if (selectedPeriod === "month") return daysAgo <= 30;
        return true;
      });
    }
    
    return groupArticlesByDate(filtered);
  }, [articles, selectedPeriod, selectedCategory, selectedSeverity]);

  const totalFiltered = useMemo(() => 
    Object.values(groupedArticles).flat().length, 
    [groupedArticles]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-sm
                   overflow-y-auto p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl bg-gradient-to-br from-gray-900 via-black to-gray-900
                     rounded-2xl sm:rounded-3xl border-2 border-cyan-400/30 mt-4 sm:mt-8 mb-4 sm:mb-8
                     shadow-2xl"
          style={{ boxShadow: "0 0 60px rgba(34,211,238,0.2)" }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-cyan-950/95 via-blue-950/95 to-cyan-950/95
                          backdrop-blur-xl border-b-2 border-cyan-400/30 px-4 sm:px-8 py-4 sm:py-6
                          rounded-t-2xl sm:rounded-t-3xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-xl bg-cyan-500/15 border-2 border-cyan-400/40">
                  <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text
                                 bg-gradient-to-r from-cyan-400 to-blue-400">
                    All Cyber News
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    {totalFiltered} articles • Organized by publish date
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 sm:p-3 rounded-xl bg-red-500/10 border-2 border-red-400/40
                           hover:bg-red-500/20 transition-all duration-300"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              </motion.button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
              {/* Time Period Filter */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-white/20
                           text-cyan-300 text-xs sm:text-sm font-semibold
                           hover:bg-white/10 focus:outline-none focus:border-cyan-400/50
                           transition-all duration-300 cursor-pointer"
              >
                <option value="all" className="bg-gray-900">All Time</option>
                <option value="today" className="bg-gray-900">Today</option>
                <option value="week" className="bg-gray-900">This Week</option>
                <option value="month" className="bg-gray-900">This Month</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-white/20
                           text-cyan-300 text-xs sm:text-sm font-semibold
                           hover:bg-white/10 focus:outline-none focus:border-cyan-400/50
                           transition-all duration-300 cursor-pointer"
              >
                <option value="all" className="bg-gray-900">All Categories</option>
                <option value="Breach" className="bg-gray-900">🔶 Data Breach</option>
                <option value="Vulnerability" className="bg-gray-900">🔴 Vulnerability</option>
                <option value="Malware" className="bg-gray-900">🔥 Malware</option>
                <option value="Advisory" className="bg-gray-900">🛡️ Advisory</option>
                <option value="Research" className="bg-gray-900">📘 Research</option>
              </select>

              {/* Severity Filter */}
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-white/20
                           text-cyan-300 text-xs sm:text-sm font-semibold
                           hover:bg-white/10 focus:outline-none focus:border-cyan-400/50
                           transition-all duration-300 cursor-pointer"
              >
                <option value="all" className="bg-gray-900">All Severity</option>
                <option value="Critical" className="bg-gray-900">🔴 Critical</option>
                <option value="High" className="bg-gray-900">🟠 High</option>
                <option value="Medium" className="bg-gray-900">🟡 Medium</option>
                <option value="Low" className="bg-gray-900">🟢 Low</option>
              </select>

              {/* Reset Filters */}
              {(selectedPeriod !== "all" || selectedCategory !== "all" || selectedSeverity !== "all") && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedPeriod("all");
                    setSelectedCategory("all");
                    setSelectedSeverity("all");
                  }}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-red-500/10 border border-red-400/40
                             text-red-400 text-xs sm:text-sm font-semibold
                             hover:bg-red-500/20 transition-all duration-300"
                >
                  Reset Filters
                </motion.button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-8 py-6 sm:py-8 max-h-[calc(100vh-300px)] overflow-y-auto
                          custom-scrollbar">
            {Object.keys(groupedArticles).length === 0 ? (
              <div className="text-center py-16">
                <Filter className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-base sm:text-lg font-semibold">
                  No articles match your filters
                </p>
                <p className="text-gray-600 text-sm sm:text-base mt-2">
                  Try adjusting your filter criteria
                </p>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-10">
                {Object.entries(groupedArticles).map(([period, periodArticles]) => (
                  <motion.div
                    key={period}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Period Header */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 
                                      rounded-xl bg-gradient-to-r from-cyan-500/15 to-blue-500/15
                                      border-2 border-cyan-400/30">
                        <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                        <span className="text-cyan-300 font-black text-sm sm:text-base tracking-wide uppercase">
                          {period}
                        </span>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/20 
                                       border border-cyan-400/40 text-cyan-400 text-xs sm:text-sm font-black">
                          {periodArticles.length}
                        </span>
                      </div>
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-400/40 to-transparent" />
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                      {periodArticles.map((article) => (
                        <NewsCard key={article.id} article={article} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with count */}
          <div className="sticky bottom-0 bg-gradient-to-r from-cyan-950/95 via-blue-950/95 to-cyan-950/95
                          backdrop-blur-xl border-t-2 border-cyan-400/30 px-4 sm:px-8 py-3 sm:py-4
                          rounded-b-2xl sm:rounded-b-3xl">
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
              <span>Showing {totalFiltered} of {articles.length} articles</span>
              <span className="text-cyan-400 font-semibold">
                Press ESC or click outside to close
              </span>
            </div>
          </div>

          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255,255,255,0.05);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(34,211,238,0.3);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(34,211,238,0.5);
            }
          `}</style>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FeaturedCard({ article }: { article: CyberNewsArticle }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      style={{ willChange: "transform, opacity" }}
      className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer
                 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent
                 border-2 border-white/10 hover:border-cyan-400/60
                 transition-all duration-400"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-br from-cyan-500/8 via-transparent to-blue-500/8 pointer-events-none"
      />
      <div className={`h-[3px] sm:h-[4px] w-full bg-gradient-to-r ${severityConfig[article.severity].bar}`} />

      <div className="relative p-4 sm:p-6 lg:p-10 flex flex-col gap-3 sm:gap-4 lg:gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span
              className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase
                         bg-gradient-to-r from-cyan-500/30 to-blue-500/30
                         border border-cyan-400/50 text-cyan-300"
            >
              ⚡ <span className="hidden xs:inline">Today's </span>Top Story
            </span>
            <CategoryBadge category={article.category} />
          </div>
          <SeverityBadge severity={article.severity} />
        </div>

        <h2
          className="text-lg sm:text-2xl lg:text-4xl font-black text-white leading-tight
                     group-hover:text-cyan-100 transition-colors duration-300"
        >
          {article.title}
        </h2>

        <p className="text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-3 sm:line-clamp-none">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {article.tags.slice(0, isMobile ? 3 : article.tags.length).map((tag, i) => (
            <span
              key={i}
              className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-blue-500/10 border border-blue-400/25
                         text-blue-300 text-[10px] sm:text-xs font-bold"
            >
              #{tag}
            </span>
          ))}
          {isMobile && article.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-500 text-[10px] font-bold">
              +{article.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            <SourcePill source={article.source} />
            <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500">
              <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{formatDate(article.publishedAt)}</span>
              <span className="inline sm:hidden">{timeAgo(article.publishedAt)}</span>
            </span>
          </div>
          <span
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black text-cyan-400
                       group-hover:text-cyan-300 transition-colors duration-300"
          >
            <span className="hidden sm:inline">Read Full Story</span>
            <span className="inline sm:hidden">Read</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
      className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer
                 bg-gradient-to-br from-white/5 to-white/[0.02]
                 border border-white/10 hover:border-cyan-400/50
                 transition-all duration-400"
    >
      <div className={`h-[2px] sm:h-[3px] w-full bg-gradient-to-r ${sc.bar}`} />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400
                    bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none"
      />

      <div className="relative flex flex-col flex-1 p-4 sm:p-6 gap-3 sm:gap-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CategoryBadge category={article.category} />
          <SeverityBadge severity={article.severity} />
        </div>

        <h3
          className="text-sm sm:text-base font-black text-gray-100 leading-snug
                     group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2"
        >
          {article.title}
        </h3>

        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 flex-1">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {article.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-blue-500/10 border border-blue-400/20
                         text-blue-300 text-[10px] sm:text-xs font-semibold"
            >
              #{tag}
            </span>
          ))}
          {article.tags.length > 2 && (
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/5 border border-white/10 text-gray-500 text-[10px] sm:text-xs font-semibold">
              +{article.tags.length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/10">
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <SourcePill source={article.source} />
            <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-600">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {timeAgo(article.publishedAt)}
            </span>
          </div>
          <div
            className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-cyan-400
                        opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <span className="hidden xs:inline">Read More</span>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
      className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl
                  bg-gradient-to-br from-white/5 to-white/[0.02]
                  border sm:border-2 ${borderClass}
                  transition-all duration-300`}
    >
      <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl ${bgClass} border ${borderClass}`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colorClass}`} />
      </div>
      <div>
        <div className={`text-lg sm:text-2xl font-black ${colorClass}`}>{value}</div>
        <div className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">
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
  const [liveArticles, setLiveArticles] = useState<CyberNewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [countdown, setCountdown] = useState(getSecondsUntilMidnight());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showViewMore, setShowViewMore] = useState(false);
  const [todayLabel] = useState(() =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  );

  // Load live RSS feeds on mount
  useEffect(() => {
    let mounted = true;

    async function loadRSSFeeds() {
      try {
        setIsLoading(true);
        setLoadError(false);
        const articles = await fetchAllRSSArticles();
        if (mounted) {
          setLiveArticles(articles);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("RSS fetch error:", error);
        if (mounted) {
          setLoadError(true);
          setIsLoading(false);
        }
      }
    }

    loadRSSFeeds();
    return () => { mounted = false; };
  }, []);

  // Hybrid mode: use live articles if available, else fallback to static
  const allArticles = useMemo(() => {
    if (liveArticles.length > 0) {
      return liveArticles;
    }
    return newsArticles; // Fallback to static data
  }, [liveArticles]);

  const dailyArticles = useMemo(() => getDailyArticles(allArticles), [allArticles]);
  const featuredArticle = dailyArticles[0];
  const gridArticles = dailyArticles.slice(1);

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowViewMore(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    clearRSSCache();
    try {
      const articles = await fetchAllRSSArticles();
      setLiveArticles(articles);
      setLoadError(false);
    } catch (error) {
      console.error("Refresh error:", error);
      setLoadError(true);
    }
    setIsRefreshing(false);
  }, []);

  const stats = useMemo(() => {
    const srcCount = liveArticles.length > 0 ? RSS_SOURCES.filter(s => s.enabled).length : 10;
    return {
      total: allArticles.length,
      critical: allArticles.filter((a) => a.severity === "Critical").length,
      sources: srcCount,
      todayCount: dailyArticles.length,
    };
  }, [allArticles, dailyArticles, liveArticles]);

  const cacheStatus = getRSSCacheStatus();
  const isLiveMode = liveArticles.length > 0;

  return (
    <div className="relative min-h-screen bg-black">

      {/* ─── BACKGROUND ─── */}
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
        <div className="blob1 absolute top-0 left-1/4 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-cyan-500/15 blur-[120px] sm:blur-[200px] rounded-full" />
        <div className="blob2 absolute top-1/2 right-0 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-blue-500/15 blur-[100px] sm:blur-[180px] rounded-full" />
        <div className="blob3 absolute bottom-0 left-1/3 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-indigo-500/10 blur-[90px] sm:blur-[160px] rounded-full" />
        <div className="blob4 absolute top-1/4 right-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-red-500/20 blur-[120px] sm:blur-[200px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.01] sm:opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(34,211,238) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(34,211,238) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-cyan-400/25 rounded-full hidden sm:block"
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
        className="relative px-3 sm:px-6 lg:px-16 pt-4 sm:pt-6 pb-10 sm:pb-16 max-w-[1600px] mx-auto"
      >

        {/* ─── HERO HEADER ─── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-6 sm:mb-10 text-center"
        >
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 rounded-full
                       bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20
                       border sm:border-2 border-cyan-400/50"
          >
            <Rss className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="text-cyan-400 font-black text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              Cyber World
            </span>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {isLiveMode ? <LivePulse /> : (
              <span className="text-yellow-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Fallback Mode
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4
                       bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400
                       bg-clip-text text-transparent leading-tight
                       tracking-tight"
          >
            Cyber<span className="text-blue-400">News</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-xs sm:text-base lg:text-lg mb-4 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-0"
          >
            {isLiveMode ? (
              <>Live cybersecurity intelligence from {stats.sources} trusted RSS feeds — breaches, vulnerabilities, malware, and advisories updated in real-time.</>
            ) : (
              <>Daily cybersecurity intelligence aggregated from trusted security sources — breaches, vulnerabilities, malware, and advisories.</>
            )}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-2 sm:px-0"
          >
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[10px] sm:text-xs font-semibold
                          ${isOnline
                            ? "bg-green-500/10 border-green-400/40 text-green-400"
                            : "bg-red-500/10 border-red-400/40 text-red-400"}`}
            >
              {isOnline ? <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <WifiOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              {isOnline ? "Connected" : "Offline"}
            </div>

            {cacheStatus.cached && (
              <div className="flex items-center gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full
                              bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Cached ({Math.floor((cacheStatus.age || 0) / 60000)}m ago)
              </div>
            )}

            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full
                            bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold">
              <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
              {todayLabel}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full
                            bg-gradient-to-r from-cyan-500/10 to-blue-500/10
                            border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-xs font-bold
                            font-mono tracking-wider">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden xs:inline">Next update in</span>
              <span className="inline xs:hidden">Update</span> {formatCountdown(countdown)}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full
                         bg-cyan-500/15 border border-cyan-400/40 text-cyan-400
                         hover:bg-cyan-500/25 hover:border-cyan-400/60
                         transition-all duration-300 text-[10px] sm:text-xs font-semibold
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRefreshing ? (
                <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              )}
              <span className="hidden xs:inline">{isRefreshing ? "Refreshing…" : "Refresh Feed"}</span>
              <span className="inline xs:hidden">Refresh</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ─── LOADING STATE ─── */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 animate-spin mb-4" />
            <p className="text-cyan-300 text-sm sm:text-base font-semibold">Loading live RSS feeds...</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">Aggregating from {RSS_SOURCES.filter(s => s.enabled).length} sources</p>
          </motion.div>
        )}

        {/* ─── ERROR STATE ─── */}
        {loadError && !isLoading && liveArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-yellow-400/40
                       bg-gradient-to-r from-yellow-950/60 via-yellow-900/40 to-yellow-950/60"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 shrink-0" />
              <div>
                <p className="text-yellow-300 font-bold text-sm sm:text-base">
                  RSS feeds unavailable — displaying fallback content
                </p>
                <p className="text-yellow-400/80 text-xs sm:text-sm mt-1">
                  Static articles will be shown. Try refreshing in a few minutes.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── STATS ROW ─── */}
        {!isLoading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-10"
          >
            <StatCard icon={Newspaper}     value={stats.total}      label="Total"  colorClass="text-cyan-400"   bgClass="bg-cyan-500/15"   borderClass="border-cyan-400/30" />
            <StatCard icon={AlertTriangle} value={stats.critical}   label="Critical" colorClass="text-red-400"    bgClass="bg-red-500/15"    borderClass="border-red-400/30" />
            <StatCard icon={Globe}         value={stats.sources}    label="Sources"     colorClass="text-blue-400"   bgClass="bg-blue-500/15"   borderClass="border-blue-400/30" />
            <StatCard icon={Eye}           value={stats.todayCount} label="Today" colorClass="text-violet-400" bgClass="bg-violet-500/15" borderClass="border-violet-400/30" />
          </motion.div>
        )}

        {/* ─── BREAKING TICKER ─── */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 sm:mb-10"
          >
            <BreakingTicker articles={dailyArticles} />
          </motion.div>
        )}

        {/* ─── DAILY EDITION LABEL ─── */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-8"
          >
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400/20 rounded-full" />
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl
                            bg-gradient-to-br from-cyan-500/15 to-blue-500/15
                            border sm:border-2 border-cyan-400/40">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-cyan-300 font-black text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] uppercase">
                <span className="hidden xs:inline">Today's Intel Briefing</span>
                <span className="inline xs:hidden">Today's Brief</span>
              </span>
              <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40
                               text-cyan-400 text-[10px] sm:text-xs font-black">
                {dailyArticles.length}
              </span>
            </div>
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-l from-transparent via-cyan-400/40 to-cyan-400/20 rounded-full" />
          </motion.div>
        )}

        {/* ─── FEATURED CARD ─── */}
        {!isLoading && featuredArticle && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mb-4 sm:mb-8"
          >
            <FeaturedCard article={featuredArticle} />
          </motion.div>
        )}

        {/* ─── NEWS GRID ─── */}
        {!isLoading && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {gridArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </motion.div>
        )}

        {/* ─── VIEW MORE BUTTON ─── */}
        {!isLoading && allArticles.length > DAILY_FEED_SIZE && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 sm:mt-12 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowViewMore(true)}
              className="group relative px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl
                         bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20
                         border-2 border-cyan-400/50 hover:border-cyan-400/80
                         transition-all duration-400 overflow-hidden"
              style={{ boxShadow: "0 0 30px rgba(34,211,238,0.2)" }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Button content */}
              <div className="relative flex items-center gap-3 sm:gap-4">
                <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-xl font-black text-transparent bg-clip-text
                                   bg-gradient-to-r from-cyan-400 to-blue-400">
                      View All Cyber News
                    </span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40
                                   text-cyan-400 text-xs sm:text-sm font-black">
                      {allArticles.length}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Browse by date, category, and severity
                  </p>
                </div>
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-bounce" />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-xl" />
            </motion.button>
          </motion.div>
        )}

        {/* ─── VIEW MORE MODAL ─── */}
        <ViewMoreModal 
          isOpen={showViewMore}
          onClose={() => setShowViewMore(false)}
          articles={allArticles}
        />

        {/* ─── INFO PANEL ─── */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 sm:mt-16 relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl overflow-hidden
                       bg-gradient-to-br from-white/5 to-white/[0.02]
                       border sm:border-2 border-cyan-400/20"
          >
            <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-cyan-500/6 blur-2xl sm:blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/6 blur-2xl sm:blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
              {/* Left — RSS Sources */}
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-cyan-500/15 border border-cyan-400/40">
                    <Rss className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-xl font-black text-transparent bg-clip-text
                                   bg-gradient-to-r from-cyan-400 to-blue-400">
                      {isLiveMode ? "Live RSS Sources" : "Trusted Sources"}
                    </h3>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">
                      {isLiveMode ? `${RSS_SOURCES.filter(s => s.enabled).length} active feeds` : "Curated security intelligence"}
                    </p>
                  </div>
                  {isLiveMode && (
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl
                                    bg-green-500/10 border border-green-400/30">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-[10px] sm:text-xs font-bold">Active</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {RSS_SOURCES.filter(s => s.enabled).slice(0, 12).map((src, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl
                                   bg-white/5 border border-white/10
                                   hover:border-cyan-400/30 hover:bg-white/[0.07]
                                   transition-all duration-300"
                      >
                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${src.dot} ${isLiveMode ? 'animate-pulse' : ''}`} />
                        <span className={`text-[10px] sm:text-xs font-semibold ${src.color} truncate`}>{src.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — How it works */}
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-indigo-500/15 border border-indigo-400/40">
                    <Terminal className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-xl font-black text-transparent bg-clip-text
                                   bg-gradient-to-r from-indigo-400 to-violet-400">
                      {isLiveMode ? "Live Aggregation" : "Daily Rotation"}
                    </h3>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">
                      {isLiveMode ? "Real-time RSS parsing & categorization" : "Static content with daily rotation"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {[
                    {
                      icon: Zap,
                      color: "text-cyan-400",
                      bg: "bg-cyan-500/10",
                      border: "border-cyan-400/30",
                      title: isLiveMode ? "Parallel Fetching" : "Newest First",
                      desc: isLiveMode 
                        ? "Fetches from 30+ RSS feeds in parallel batches for optimal speed and resilience."
                        : "Articles sorted by publish date before rotation so latest news surfaces first.",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-red-400",
                      bg: "bg-red-500/10",
                      border: "border-red-400/30",
                      title: isLiveMode ? "Smart Categorization" : "Critical First",
                      desc: isLiveMode
                        ? "AI-powered keyword analysis auto-categorizes articles by severity and type."
                        : "Critical severity articles always prioritized to top regardless of date.",
                    },
                    {
                      icon: Shield,
                      color: "text-yellow-400",
                      bg: "bg-yellow-500/10",
                      border: "border-yellow-400/30",
                      title: isLiveMode ? "15-Min Cache" : "Easy Updates",
                      desc: isLiveMode
                        ? "Intelligent caching reduces load while keeping content fresh and performant."
                        : "Simply add new articles to News.ts — automatically included in rotation.",
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
                        className="flex items-start gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl
                                   bg-white/5 border border-white/10"
                      >
                        <div className={`shrink-0 p-1.5 sm:p-2 rounded-md sm:rounded-lg ${item.bg} border ${item.border}`}>
                          <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs sm:text-sm font-black ${item.color} mb-0.5 sm:mb-1`}>{item.title}</div>
                          <div className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">{item.desc}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}