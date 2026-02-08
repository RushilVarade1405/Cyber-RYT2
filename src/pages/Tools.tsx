import { cyberTools } from "../data/cyberTools";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Copy,
  Check,
  ChevronDown,
  Terminal,
  Shield,
  Zap,
  AlertTriangle,
  X,
  Star,
  TrendingUp,
  Lock,
  Unlock,
  Activity,
  Code,
  ExternalLink,
  BookOpen,
  Target,
} from "lucide-react";

/* ===============================
   ANIMATIONS
=============================== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ===============================
   LEVEL CONFIG
=============================== */
const levelConfig = {
  Beginner: {
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-400/30",
    shadow: "shadow-green-500/20",
    glow: "group-hover:shadow-green-500/40",
    icon: "🟢",
    gradient: "from-green-500/20 to-emerald-500/10",
  },
  Intermediate: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-400/30",
    shadow: "shadow-yellow-500/20",
    glow: "group-hover:shadow-yellow-500/40",
    icon: "🟡",
    gradient: "from-yellow-500/20 to-amber-500/10",
  },
  Advanced: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-400/30",
    shadow: "shadow-red-500/20",
    glow: "group-hover:shadow-red-500/40",
    icon: "🔴",
    gradient: "from-red-500/20 to-rose-500/10",
  },
};

/* ===============================
   CATEGORY ICONS
=============================== */
const categoryIcons: Record<string, any> = {
  "Network Security": Activity,
  "Web Security": Code,
  "Password Attacks": Lock,
  "Wireless Security": Activity,
  "Exploitation": Target,
  "Forensics": BookOpen,
  "OSINT": Search,
  "Reconnaissance": Target,
};

/* ===============================
   COMPONENT
=============================== */
export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Get unique categories and levels
  const categories = useMemo(
    () => Array.from(new Set(cyberTools.map((tool) => tool.category))).sort(),
    []
  );
  const levels = ["Beginner", "Intermediate", "Advanced"];

  // Filter tools
  const filteredTools = useMemo(() => {
    return cyberTools.filter((tool) => {
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.use.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || tool.category === selectedCategory;

      const matchesLevel = !selectedLevel || tool.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  // Group filtered tools by category
  const groupedTools = useMemo(() => {
    return filteredTools.reduce<Record<string, typeof cyberTools>>(
      (acc, tool) => {
        if (!acc[tool.category]) acc[tool.category] = [];
        acc[tool.category].push(tool);
        return acc;
      },
      {}
    );
  }, [filteredTools]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedLevel(null);
  };

  const handleCopy = async (cmd: string, toolSlug: string) => {
    await navigator.clipboard.writeText(cmd);
    setCopiedCommand(`${toolSlug}-${cmd}`);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const toggleCardExpansion = (slug: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedLevel;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* ===============================
          ANIMATED BACKGROUND
      =============================== */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Main gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/20 blur-[200px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-blue-500/15 blur-[180px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-indigo-500/15 blur-[160px]"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(34, 211, 238) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(34, 211, 238) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative px-6 sm:px-10 lg:px-16 py-16 max-w-[1600px] mx-auto"
      >
        {/* ===============================
            HERO HEADER
        =============================== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16 text-center relative"
        >
          {/* Background glow for header */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/20 blur-[120px]" />
          </div>

          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-3 px-8 py-4 mb-8 rounded-full 
                       bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 
                       border-2 border-cyan-400/50 backdrop-blur-xl
                       shadow-[0_0_60px_rgba(34,211,238,0.3)]"
          >
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 font-black text-base tracking-[0.3em] uppercase">
              Arsenal
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-black text-base tracking-[0.3em] uppercase">
              Security
            </span>
            <Shield className="w-6 h-6 text-cyan-400" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-7xl sm:text-8xl lg:text-9xl font-black mb-8 
                       bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 
                       bg-clip-text text-transparent leading-[0.9]
                       drop-shadow-[0_0_80px_rgba(34,211,238,0.5)]
                       tracking-tight"
          >
            Cyber<span className="text-blue-400">Security</span>
            <br />
            <span className="text-6xl sm:text-7xl lg:text-8xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
              Toolkit
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-xl sm:text-2xl mb-10 max-w-5xl mx-auto leading-relaxed font-light"
          >
            Professional-grade tools for penetration testing, network analysis, web security,
            exploitation, forensics, and intelligence gathering
          </motion.p>

          {/* Stats bar */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <div className="group relative px-8 py-4 rounded-2xl 
                          bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
                          border-2 border-cyan-400/30 backdrop-blur-xl
                          hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]
                          transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 
                            opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative flex items-center gap-3">
                <Terminal className="w-6 h-6 text-cyan-400" />
                <div className="text-left">
                  <div className="text-3xl font-black text-cyan-400">{cyberTools.length}</div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Tools</div>
                </div>
              </div>
            </div>

            <div className="group relative px-8 py-4 rounded-2xl 
                          bg-gradient-to-br from-blue-500/10 to-indigo-500/10 
                          border-2 border-blue-400/30 backdrop-blur-xl
                          hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]
                          transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 
                            opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative flex items-center gap-3">
                <Filter className="w-6 h-6 text-blue-400" />
                <div className="text-left">
                  <div className="text-3xl font-black text-blue-400">{categories.length}</div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Categories</div>
                </div>
              </div>
            </div>

            <div className="group relative px-8 py-4 rounded-2xl 
                          bg-gradient-to-br from-indigo-500/10 to-purple-500/10 
                          border-2 border-indigo-400/30 backdrop-blur-xl
                          hover:border-indigo-400/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]
                          transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 
                            opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                <div className="text-left">
                  <div className="text-3xl font-black text-indigo-400">{levels.length}</div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Levels</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===============================
            ADVANCED SEARCH & FILTER
        =============================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          {/* Search bar with enhanced design */}
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 
                          rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="w-6 h-6 text-cyan-400 group-focus-within:text-cyan-300 
                                 transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Search by tool name, description, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full pl-16 pr-14 py-6 rounded-2xl
                  bg-white/5 backdrop-blur-2xl
                  border-2 border-white/10
                  text-white placeholder-gray-500 text-lg font-medium
                  focus:outline-none focus:border-cyan-400/60
                  focus:shadow-[0_0_60px_rgba(34,211,238,0.4)]
                  focus:bg-white/10
                  transition-all duration-500
                "
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-6 top-1/2 -translate-y-1/2 
                             p-2 rounded-xl bg-red-500/20 border-2 border-red-400/40 
                             text-red-400 hover:bg-red-500/30 hover:border-red-400/60
                             transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Filter controls */}
          <div className="relative p-8 rounded-3xl 
                        bg-gradient-to-br from-white/5 to-white/[0.02] 
                        backdrop-blur-2xl border-2 border-white/10
                        shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            {/* Background glow */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl" />
            </div>

            <div className="relative space-y-6">
              {/* Categories */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40">
                    <Filter className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-cyan-400 text-lg font-black tracking-wider uppercase">
                    Categories
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => {
                    const Icon = categoryIcons[category] || Code;
                    const isSelected = selectedCategory === category;
                    return (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedCategory(isSelected ? null : category)
                        }
                        className={`
                          relative group px-6 py-3 rounded-xl text-sm font-bold
                          border-2 transition-all duration-500
                          ${
                            isSelected
                              ? "bg-cyan-500/30 border-cyan-400/70 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                              : "bg-white/5 border-white/20 text-gray-300 hover:border-cyan-400/50 hover:bg-white/10"
                          }
                        `}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 
                                      opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                        <div className="relative flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {category}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Levels */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/40">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-blue-400 text-lg font-black tracking-wider uppercase">
                    Skill Level
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {levels.map((level) => {
                    const config = levelConfig[level as keyof typeof levelConfig];
                    const isSelected = selectedLevel === level;
                    return (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedLevel(isSelected ? null : level)
                        }
                        className={`
                          relative group px-6 py-3 rounded-xl text-sm font-bold
                          border-2 transition-all duration-500
                          flex items-center gap-2
                          ${
                            isSelected
                              ? `${config.bg} ${config.border} ${config.color} shadow-[0_0_30px] ${config.shadow}`
                              : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/10"
                          }
                        `}
                      >
                        <span className="text-lg">{config.icon}</span>
                        {level}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Active filters & controls */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-6 border-t-2 border-white/10"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 font-semibold">Active:</span>
                        {selectedCategory && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-4 py-2 rounded-xl bg-cyan-500/20 border-2 border-cyan-400/40 
                                     text-cyan-400 text-sm font-bold flex items-center gap-2"
                          >
                            {selectedCategory}
                            <button
                              onClick={() => setSelectedCategory(null)}
                              className="hover:text-cyan-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        )}
                        {selectedLevel && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`px-4 py-2 rounded-xl border-2 text-sm font-bold flex items-center gap-2
                                     ${levelConfig[selectedLevel as keyof typeof levelConfig].bg}
                                     ${levelConfig[selectedLevel as keyof typeof levelConfig].border}
                                     ${levelConfig[selectedLevel as keyof typeof levelConfig].color}`}
                          >
                            {selectedLevel}
                            <button
                              onClick={() => setSelectedLevel(null)}
                              className="hover:opacity-70"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetFilters}
                        className="px-6 py-3 rounded-xl text-sm font-bold
                                 bg-red-500/20 border-2 border-red-400/50 text-red-400
                                 hover:bg-red-500/30 hover:border-red-400/70
                                 transition-all duration-300
                                 flex items-center gap-2
                                 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                      >
                        <X className="w-4 h-4" />
                        Clear All
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl 
                          bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 
                          border-2 border-cyan-400/30 backdrop-blur-xl">
              <Activity className="w-5 h-5 text-cyan-400" />
              <div className="text-gray-400 font-medium">
                Showing{" "}
                <span className="text-cyan-400 font-black text-xl mx-1">
                  {filteredTools.length}
                </span>
                {" "}of{" "}
                <span className="text-cyan-400 font-black text-xl mx-1">
                  {cyberTools.length}
                </span>
                {" "}tools
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===============================
            TOOLS DISPLAY
        =============================== */}
        <AnimatePresence mode="wait">
          {Object.keys(groupedTools).length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-32"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-3xl" />
                  <Search className="relative w-32 h-32 text-cyan-400/50" />
                </div>
              </motion.div>
              <h3 className="text-4xl font-black text-gray-300 mb-4">
                No Tools Found
              </h3>
              <p className="text-gray-400 text-xl mb-8">
                Try adjusting your search or filter criteria
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="px-8 py-4 rounded-2xl text-lg font-bold
                         bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                         border-2 border-cyan-400/50 text-cyan-400
                         hover:from-cyan-500/30 hover:to-blue-500/30
                         hover:border-cyan-400/70
                         transition-all duration-500
                         shadow-[0_0_40px_rgba(34,211,238,0.3)]"
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          ) : (
            <div className="space-y-24">
              {Object.entries(groupedTools).map(([category, tools], categoryIndex) => {
                const Icon = categoryIcons[category] || Code;
                return (
                  <motion.section
                    key={category}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                    className="relative"
                  >
                    {/* Category header */}
                    <div className="relative mb-12">
                      {/* Background glow */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-96 h-24 bg-cyan-500/10 blur-3xl" />
                      </div>

                      <div className="relative flex items-center gap-6">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          className="flex-1 h-[3px] bg-gradient-to-r from-transparent via-cyan-400/60 to-cyan-400/30 rounded-full"
                        />

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 
                                        blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                          <div className="relative flex items-center gap-4 px-10 py-5 rounded-3xl
                                        bg-gradient-to-br from-cyan-500/20 to-blue-500/20
                                        border-2 border-cyan-400/50 backdrop-blur-xl
                                        shadow-[0_8px_40px_rgba(34,211,238,0.3)]">
                            <Icon className="w-8 h-8 text-cyan-400" />
                            <h2 className="text-5xl font-black text-transparent bg-clip-text 
                                         bg-gradient-to-r from-cyan-400 to-blue-400">
                              {category}
                            </h2>
                            <div className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40">
                              <span className="text-cyan-400 font-bold text-sm">
                                {tools.length} {tools.length === 1 ? "tool" : "tools"}
                              </span>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          className="flex-1 h-[3px] bg-gradient-to-l from-transparent via-cyan-400/60 to-cyan-400/30 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Tools grid */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={stagger}
                      className="grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                    >
                      {tools.map((tool, index) => {
                        const isExpanded = expandedCards.has(tool.slug);
                        const isHovered = hoveredCard === tool.slug;
                        const maxCommandsToShow = 3;
                        const hasMoreCommands = tool.commands.length > maxCommandsToShow;
                        const config = levelConfig[tool.level];

                        return (
                          <motion.div
                            key={`${tool.slug}-${index}`}
                            variants={fadeUp}
                            onHoverStart={() => setHoveredCard(tool.slug)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="group relative"
                          >
                            {/* Card glow effect */}
                            <motion.div
                              animate={{
                                opacity: isHovered ? 1 : 0,
                                scale: isHovered ? 1 : 0.8,
                              }}
                              transition={{ duration: 0.5 }}
                              className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 
                                       rounded-3xl blur-2xl"
                            />

                            {/* Main card */}
                            <motion.div
                              whileHover={{ y: -12, scale: 1.02 }}
                              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                              className="relative h-full p-8 rounded-3xl
                                       bg-gradient-to-br from-white/5 to-white/[0.02]
                                       backdrop-blur-2xl
                                       border-2 border-white/10
                                       hover:border-cyan-400/60
                                       shadow-[0_8px_40px_rgba(0,0,0,0.5)]
                                       hover:shadow-[0_20px_80px_rgba(34,211,238,0.4)]
                                       transition-all duration-500
                                       overflow-hidden"
                            >
                              {/* Inner glow effects */}
                              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl 
                                            group-hover:bg-cyan-500/20 transition-all duration-500" />
                              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 blur-3xl 
                                            group-hover:bg-blue-500/20 transition-all duration-500" />

                              <div className="relative space-y-6">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <h3 className="text-3xl font-black text-cyan-400 
                                                 group-hover:text-cyan-300 mb-2
                                                 transition-colors duration-300 leading-tight">
                                      {tool.name}
                                    </h3>
                                  </div>
                                  <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={`
                                      shrink-0 px-4 py-2 rounded-xl text-sm font-bold
                                      border-2 ${config.border} ${config.bg} ${config.color}
                                      shadow-lg ${config.shadow}
                                      flex items-center gap-2
                                    `}
                                  >
                                    <span className="text-base">{config.icon}</span>
                                    {tool.level}
                                  </motion.div>
                                </div>

                                {/* Use case */}
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                                           border-2 border-cyan-400/30
                                           shadow-[inset_0_2px_20px_rgba(34,211,238,0.1)]"
                                >
                                  <div className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                                    <p className="text-gray-200 font-semibold leading-relaxed">
                                      {tool.use}
                                    </p>
                                  </div>
                                </motion.div>

                                {/* Description */}
                                {tool.description && (
                                  <p className="text-gray-400 leading-relaxed line-clamp-3">
                                    {tool.description}
                                  </p>
                                )}

                                {/* Tags */}
                                {tool.tags && tool.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {tool.tags.slice(0, 5).map((tag, i) => (
                                      <motion.span
                                        key={i}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1.5 rounded-xl 
                                                 bg-blue-500/10 border border-blue-400/30 
                                                 text-blue-300 text-xs font-bold
                                                 hover:bg-blue-500/20 hover:border-blue-400/50 
                                                 transition-all duration-300"
                                      >
                                        #{tag}
                                      </motion.span>
                                    ))}
                                    {tool.tags.length > 5 && (
                                      <span className="px-3 py-1.5 rounded-xl 
                                                     bg-white/5 border border-white/20 
                                                     text-gray-400 text-xs font-bold">
                                        +{tool.tags.length - 5}
                                      </span>
                                    )}
                                  </div>
                                )}

                                {/* Divider */}
                                <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                                {/* Commands section */}
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40">
                                      <Terminal className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <span className="text-cyan-400 font-black tracking-wider uppercase">
                                      Commands
                                    </span>
                                    <div className="flex-1 h-px bg-cyan-400/30" />
                                    <span className="text-xs text-gray-500 font-bold px-3 py-1 rounded-full bg-white/5">
                                      {tool.commands.length}
                                    </span>
                                  </div>

                                  <div className="space-y-3">
                                    <AnimatePresence initial={false}>
                                      {(isExpanded ? tool.commands : tool.commands.slice(0, maxCommandsToShow)).map((cmd, i) => (
                                        <motion.div
                                          key={i}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -20 }}
                                          transition={{ delay: i * 0.05 }}
                                          className="group/cmd relative"
                                        >
                                          <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="
                                              flex items-center gap-3
                                              bg-black/70 rounded-2xl px-5 py-4
                                              border-2 border-cyan-500/20
                                              hover:border-cyan-500/60 hover:bg-black/90
                                              transition-all duration-500
                                              shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                                              hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)]
                                            "
                                          >
                                            <code
                                              className="flex-1 text-cyan-300 text-sm font-mono overflow-x-auto
                                                       scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/30"
                                            >
                                              {cmd}
                                            </code>

                                            <motion.button
                                              whileHover={{ scale: 1.15 }}
                                              whileTap={{ scale: 0.9 }}
                                              onClick={() => handleCopy(cmd, tool.slug)}
                                              className="
                                                shrink-0 p-2.5 rounded-xl
                                                border-2 border-cyan-400/50
                                                text-cyan-400 bg-cyan-500/10
                                                hover:bg-cyan-400 hover:text-black hover:border-cyan-400
                                                opacity-0 group-hover/cmd:opacity-100
                                                transition-all duration-300
                                              "
                                              title="Copy to clipboard"
                                            >
                                              {copiedCommand === `${tool.slug}-${cmd}` ? (
                                                <Check className="w-5 h-5" />
                                              ) : (
                                                <Copy className="w-5 h-5" />
                                              )}
                                            </motion.button>
                                          </motion.div>
                                        </motion.div>
                                      ))}
                                    </AnimatePresence>
                                  </div>

                                  {/* Expand/collapse button */}
                                  {hasMoreCommands && (
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => toggleCardExpansion(tool.slug)}
                                      className="
                                        w-full py-4 rounded-2xl
                                        bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10
                                        border-2 border-cyan-400/30
                                        text-cyan-400 font-bold
                                        hover:border-cyan-400/60
                                        hover:from-cyan-500/20 hover:via-blue-500/20 hover:to-cyan-500/20
                                        transition-all duration-500
                                        flex items-center justify-center gap-3
                                        shadow-[0_4px_20px_rgba(34,211,238,0.2)]
                                        hover:shadow-[0_8px_30px_rgba(34,211,238,0.4)]
                                      "
                                    >
                                      <span className="text-base">
                                        {isExpanded
                                          ? "Show Less"
                                          : `Show ${tool.commands.length - maxCommandsToShow} More`}
                                      </span>
                                      <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <ChevronDown className="w-5 h-5" />
                                      </motion.div>
                                    </motion.button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.section>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* ===============================
            FOOTER WARNING
        =============================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-32 p-10 rounded-3xl
                   bg-gradient-to-br from-red-500/20 via-orange-500/10 to-red-500/20
                   backdrop-blur-2xl
                   border-2 border-red-500/50
                   shadow-[0_20px_100px_rgba(239,68,68,0.5)]
                   overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/15 blur-3xl" />
          </div>

          <div className="relative flex items-start gap-6">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="shrink-0"
            >
              <div className="p-4 rounded-2xl bg-red-500/20 border-2 border-red-400/50">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
            </motion.div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-3xl font-black text-red-400">
                  Ethical Use & Legal Disclaimer
                </h3>
                <div className="px-4 py-2 rounded-xl bg-red-500/30 border-2 border-red-400/60">
                  <span className="text-red-300 font-black text-sm tracking-wider uppercase">
                    Critical
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-1 p-1.5 rounded-lg bg-green-500/20 border border-green-400/40">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-lg">
                    These tools are provided for{" "}
                    <span className="text-white font-black">educational purposes</span> and{" "}
                    <span className="text-white font-black">authorized security testing</span> only.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-1 p-1.5 rounded-lg bg-red-500/20 border border-red-400/40">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-lg">
                    Using these tools against systems you don't own or have explicit permission to test is{" "}
                    <span className="text-red-400 font-black text-xl">ILLEGAL</span> and may result in{" "}
                    <span className="text-red-400 font-black">criminal prosecution</span> under computer fraud and abuse laws.
                  </p>
                </div>

                <div className="mt-6 p-6 rounded-2xl 
                              bg-gradient-to-r from-red-500/10 to-orange-500/10
                              border-l-4 border-red-400">
                  <div className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-red-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-base font-bold text-red-400 mb-2">
                        ALWAYS obtain written authorization before conducting security assessments.
                      </p>
                      <p className="text-sm italic text-gray-400">
                        Practice in controlled lab environments or authorized platforms like{" "}
                        <span className="text-cyan-400 font-semibold">HackTheBox</span>,{" "}
                        <span className="text-cyan-400 font-semibold">TryHackMe</span>, or{" "}
                        <span className="text-cyan-400 font-semibold">PentesterLab</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}