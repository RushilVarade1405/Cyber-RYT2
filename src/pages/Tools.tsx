import { cyberTools } from "../data/cyberTools";
import { platforms } from "../data/platforms";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState, useMemo, useRef } from "react";
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
  TrendingUp,
  Lock,
  Activity,
  Code,
  ExternalLink,
  BookOpen,
  Target,
  Map,
  NotebookPen,
  ArrowUpRight,
  Award,
  Globe,
  Layers,
  Cpu,
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
  },
  Intermediate: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-400/30",
    shadow: "shadow-yellow-500/20",
    glow: "group-hover:shadow-yellow-500/40",
    icon: "🟡",
  },
  Advanced: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-400/30",
    shadow: "shadow-red-500/20",
    glow: "group-hover:shadow-red-500/40",
    icon: "🔴",
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
  Exploitation: Target,
  Forensics: BookOpen,
  OSINT: Search,
  Reconnaissance: Target,
};

/* ===============================
   PLATFORM HELPERS
=============================== */
function getMainCategory(category: string) {
  if (category.toLowerCase().includes("ctf")) return "CTF";
  if (category.toLowerCase().includes("web")) return "Web Security";
  if (category.toLowerCase().includes("linux")) return "Linux";
  if (category.toLowerCase().includes("blockchain")) return "Blockchain";
  if (category.toLowerCase().includes("crypto")) return "Cryptography";
  return "Cyber";
}

function getDifficultyColor(difficulty: string) {
  if (difficulty.includes("Beginner"))
    return {
      bg: "bg-green-500/10",
      text: "text-green-300",
      border: "border-green-400/30",
    };
  if (difficulty.includes("Intermediate"))
    return {
      bg: "bg-yellow-500/10",
      text: "text-yellow-300",
      border: "border-yellow-400/30",
    };
  if (difficulty.includes("Advanced") || difficulty.includes("Expert"))
    return {
      bg: "bg-red-500/10",
      text: "text-red-300",
      border: "border-red-400/30",
    };
  return {
    bg: "bg-purple-500/10",
    text: "text-purple-300",
    border: "border-purple-400/30",
  };
}

/* ===============================
   PRACTICE STEPS (inline data kept here)
=============================== */
const practiceSteps = [
  {
    title: "Start with Beginner Platforms",
    description:
      "Build confidence with guided labs and beginner-friendly environments before moving to harder challenges.",
    icon: Terminal,
  },
  {
    title: "Follow Structured Learning Paths",
    description:
      "Avoid random practice. Roadmaps ensure skills are learned in the correct order.",
    icon: Map,
  },
  {
    title: "Practice Consistently & Take Notes",
    description:
      "Daily hands-on practice combined with note-taking reinforces long-term understanding.",
    icon: NotebookPen,
  },
  {
    title: "Increase Difficulty Gradually",
    description:
      "Progress from simple challenges to realistic labs without overwhelming yourself.",
    icon: ArrowUpRight,
  },
];

/* ===============================
   TAB NAVIGATION (NEW ADDITION)
=============================== */
type ActiveTab = "tools" | "platforms";

/* ===============================
   MAIN COMPONENT
=============================== */
export default function Tools() {
  /* ── Shared state ── */
  const [activeTab, setActiveTab] = useState<ActiveTab>("tools");
  const platformsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  /* ── Tools state ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  /* ── Derived data ── */
  const categories = useMemo(
    () => Array.from(new Set(cyberTools.map((t) => t.category))).sort(),
    []
  );
  const levels = ["Beginner", "Intermediate", "Advanced"];

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

  const hasActiveFilters = searchQuery || selectedCategory || selectedLevel;

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
      if (newSet.has(slug)) newSet.delete(slug);
      else newSet.add(slug);
      return newSet;
    });
  };

  const scrollToTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    const ref = tab === "tools" ? toolsRef : platformsRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ============================
     RENDER
  ============================= */
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* ─── ANIMATED BACKGROUND ─── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/20 blur-[200px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-blue-500/15 blur-[180px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
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
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
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
        {/* ─── HERO HEADER ─── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16 text-center relative"
        >
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
              Hub
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-xl sm:text-2xl mb-10 max-w-5xl mx-auto leading-relaxed font-light"
          >
            Professional-grade tools, learning platforms, and resources for
            penetration testing, network analysis, web security, and ethical
            hacking — all in one place.
          </motion.p>

          {/* ── MEGA STATS BAR (NEW: combined stats from both sections) ── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {[
              {
                icon: Terminal,
                value: cyberTools.length,
                label: "Tools",
                color: "cyan",
              },
              {
                icon: Filter,
                value: categories.length,
                label: "Categories",
                color: "blue",
              },
              {
                icon: TrendingUp,
                value: levels.length,
                label: "Skill Levels",
                color: "indigo",
              },
              {
                icon: Globe,
                value: platforms.length,
                label: "Platforms",
                color: "violet",
              },
            ].map(({ icon: Icon, value, label, color }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05 }}
                className={`group relative px-8 py-4 rounded-2xl
                            bg-gradient-to-br from-${color}-500/10 to-${color}-600/10
                            border-2 border-${color}-400/30 backdrop-blur-xl
                            hover:border-${color}-400/60
                            hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]
                            transition-all duration-500`}
              >
                <div className="relative flex items-center gap-3">
                  <Icon className={`w-6 h-6 text-${color}-400`} />
                  <div className="text-left">
                    <div className={`text-3xl font-black text-${color}-400`}>
                      {value}
                    </div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      {label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── STICKY TAB SWITCHER (NEW ADDITION) ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="sticky top-4 z-50 mb-16 flex justify-center"
        >
          <div
            className="relative inline-flex items-center gap-2 p-2 rounded-2xl
                          bg-black/60 backdrop-blur-2xl
                          border-2 border-white/10
                          shadow-[0_8px_60px_rgba(0,0,0,0.8)]"
          >
            {/* Sliding pill */}
            <motion.div
              layoutId="tabPill"
              className="absolute top-2 bottom-2 rounded-xl
                         bg-gradient-to-r from-cyan-500/30 to-blue-500/30
                         border border-cyan-400/50
                         shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              style={{
                left: activeTab === "tools" ? "8px" : "50%",
                right: activeTab === "tools" ? "50%" : "8px",
                transition: "left 0.4s cubic-bezier(0.22,1,0.36,1), right 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            />

            <button
              onClick={() => scrollToTab("tools")}
              className={`relative z-10 flex items-center gap-3 px-8 py-3.5 rounded-xl
                         text-base font-black tracking-wide transition-colors duration-300
                         ${activeTab === "tools" ? "text-cyan-300" : "text-gray-400 hover:text-gray-200"}`}
            >
              <Cpu className="w-5 h-5" />
              Security Tools
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold
                            ${activeTab === "tools" ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50" : "bg-white/5 text-gray-500 border border-white/10"}`}
              >
                {cyberTools.length}
              </span>
            </button>

            <button
              onClick={() => scrollToTab("platforms")}
              className={`relative z-10 flex items-center gap-3 px-8 py-3.5 rounded-xl
                         text-base font-black tracking-wide transition-colors duration-300
                         ${activeTab === "platforms" ? "text-cyan-300" : "text-gray-400 hover:text-gray-200"}`}
            >
              <Layers className="w-5 h-5" />
              Learning Platforms
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold
                            ${activeTab === "platforms" ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50" : "bg-white/5 text-gray-500 border border-white/10"}`}
              >
                {platforms.length}
              </span>
            </button>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 1 — SECURITY TOOLS
        ══════════════════════════════════════ */}
        <div ref={toolsRef} className="scroll-mt-28">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-5 mb-14"
          >
            <div
              className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20
                          border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              <Cpu className="w-9 h-9 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Security Tools
              </h2>
              <p className="text-gray-400 mt-1">
                Professional penetration-testing commands and usage references
              </p>
            </div>
          </motion.div>

          {/* ── SEARCH & FILTERS ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            {/* Search bar */}
            <div className="relative group mb-8">
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20
                            rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="w-6 h-6 text-cyan-400 group-focus-within:text-cyan-300 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search by tool name, description, category, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-14 py-6 rounded-2xl
                             bg-white/5 backdrop-blur-2xl border-2 border-white/10
                             text-white placeholder-gray-500 text-lg font-medium
                             focus:outline-none focus:border-cyan-400/60
                             focus:shadow-[0_0_60px_rgba(34,211,238,0.4)]
                             focus:bg-white/10 transition-all duration-500"
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

            {/* Filter panel */}
            <div
              className="relative p-8 rounded-3xl
                          bg-gradient-to-br from-white/5 to-white/[0.02]
                          backdrop-blur-2xl border-2 border-white/10
                          shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            >
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
                          className={`relative group px-6 py-3 rounded-xl text-sm font-bold
                                      border-2 transition-all duration-500
                                      ${isSelected
                                        ? "bg-cyan-500/30 border-cyan-400/70 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                                        : "bg-white/5 border-white/20 text-gray-300 hover:border-cyan-400/50 hover:bg-white/10"
                                      }`}
                        >
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
                      const config =
                        levelConfig[level as keyof typeof levelConfig];
                      const isSelected = selectedLevel === level;
                      return (
                        <motion.button
                          key={level}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSelectedLevel(isSelected ? null : level)
                          }
                          className={`relative group px-6 py-3 rounded-xl text-sm font-bold
                                      border-2 transition-all duration-500 flex items-center gap-2
                                      ${isSelected
                                        ? `${config.bg} ${config.border} ${config.color} shadow-[0_0_30px] ${config.shadow}`
                                        : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/10"
                                      }`}
                        >
                          <span className="text-lg">{config.icon}</span>
                          {level}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Active filters */}
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
                          <span className="text-gray-400 font-semibold">
                            Active:
                          </span>
                          {selectedCategory && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="px-4 py-2 rounded-xl bg-cyan-500/20 border-2 border-cyan-400/40
                                         text-cyan-400 text-sm font-bold flex items-center gap-2"
                            >
                              {selectedCategory}
                              <button onClick={() => setSelectedCategory(null)}>
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
                              <button onClick={() => setSelectedLevel(null)}>
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
                                     transition-all duration-300 flex items-center gap-2
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
            <div className="text-center mt-8">
              <div
                className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl
                            bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10
                            border-2 border-cyan-400/30 backdrop-blur-xl"
              >
                <Activity className="w-5 h-5 text-cyan-400" />
                <div className="text-gray-400 font-medium">
                  Showing{" "}
                  <span className="text-cyan-400 font-black text-xl mx-1">
                    {filteredTools.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-cyan-400 font-black text-xl mx-1">
                    {cyberTools.length}
                  </span>{" "}
                  tools
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── TOOLS GRID ── */}
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
                  animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block mb-8"
                >
                  <Search className="w-32 h-32 text-cyan-400/50" />
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
                             hover:border-cyan-400/70 transition-all duration-500
                             shadow-[0_0_40px_rgba(34,211,238,0.3)]"
                >
                  Reset All Filters
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-24">
                {Object.entries(groupedTools).map(
                  ([category, tools], categoryIndex) => {
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
                          <div className="relative flex items-center gap-6">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              className="flex-1 h-[3px] bg-gradient-to-r from-transparent via-cyan-400/60 to-cyan-400/30 rounded-full"
                            />
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <div
                                className="flex items-center gap-4 px-10 py-5 rounded-3xl
                                            bg-gradient-to-br from-cyan-500/20 to-blue-500/20
                                            border-2 border-cyan-400/50 backdrop-blur-xl
                                            shadow-[0_8px_40px_rgba(34,211,238,0.3)]"
                              >
                                <Icon className="w-8 h-8 text-cyan-400" />
                                <h2
                                  className="text-5xl font-black text-transparent bg-clip-text
                                             bg-gradient-to-r from-cyan-400 to-blue-400"
                                >
                                  {category}
                                </h2>
                                <div className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40">
                                  <span className="text-cyan-400 font-bold text-sm">
                                    {tools.length}{" "}
                                    {tools.length === 1 ? "tool" : "tools"}
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
                            const hasMoreCommands =
                              tool.commands.length > maxCommandsToShow;
                            const config = levelConfig[tool.level];

                            return (
                              <motion.div
                                key={`${tool.slug}-${index}`}
                                variants={fadeUp}
                                onHoverStart={() => setHoveredCard(tool.slug)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="group relative"
                              >
                                <motion.div
                                  animate={{
                                    opacity: isHovered ? 1 : 0,
                                    scale: isHovered ? 1 : 0.8,
                                  }}
                                  transition={{ duration: 0.5 }}
                                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30
                                             rounded-3xl blur-2xl"
                                />
                                <motion.div
                                  whileHover={{ y: -12, scale: 1.02 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="relative h-full p-8 rounded-3xl
                                             bg-gradient-to-br from-white/5 to-white/[0.02]
                                             backdrop-blur-2xl border-2 border-white/10
                                             hover:border-cyan-400/60
                                             shadow-[0_8px_40px_rgba(0,0,0,0.5)]
                                             hover:shadow-[0_20px_80px_rgba(34,211,238,0.4)]
                                             transition-all duration-500 overflow-hidden"
                                >
                                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" />
                                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />

                                  <div className="relative space-y-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                      <h3
                                        className="text-3xl font-black text-cyan-400
                                                   group-hover:text-cyan-300 mb-2
                                                   transition-colors duration-300 leading-tight"
                                      >
                                        {tool.name}
                                      </h3>
                                      <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold
                                                    border-2 ${config.border} ${config.bg} ${config.color}
                                                    shadow-lg ${config.shadow} flex items-center gap-2`}
                                      >
                                        <span className="text-base">
                                          {config.icon}
                                        </span>
                                        {tool.level}
                                      </motion.div>
                                    </div>

                                    {/* Use case */}
                                    <div
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
                                    </div>

                                    {tool.description && (
                                      <p className="text-gray-400 leading-relaxed line-clamp-3">
                                        {tool.description}
                                      </p>
                                    )}

                                    {tool.tags && tool.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-2">
                                        {tool.tags.slice(0, 5).map((tag, i) => (
                                          <span
                                            key={i}
                                            className="px-3 py-1.5 rounded-xl
                                                       bg-blue-500/10 border border-blue-400/30
                                                       text-blue-300 text-xs font-bold
                                                       hover:bg-blue-500/20 hover:border-blue-400/50
                                                       transition-all duration-300"
                                          >
                                            #{tag}
                                          </span>
                                        ))}
                                        {tool.tags.length > 5 && (
                                          <span
                                            className="px-3 py-1.5 rounded-xl
                                                       bg-white/5 border border-white/20
                                                       text-gray-400 text-xs font-bold"
                                          >
                                            +{tool.tags.length - 5}
                                          </span>
                                        )}
                                      </div>
                                    )}

                                    <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                                    {/* Commands */}
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
                                          {(isExpanded
                                            ? tool.commands
                                            : tool.commands.slice(
                                                0,
                                                maxCommandsToShow
                                              )
                                          ).map((cmd, i) => (
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
                                                className="flex items-center gap-3
                                                           bg-black/70 rounded-2xl px-5 py-4
                                                           border-2 border-cyan-500/20
                                                           hover:border-cyan-500/60 hover:bg-black/90
                                                           transition-all duration-500
                                                           shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                                                           hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)]"
                                              >
                                                <code className="flex-1 text-cyan-300 text-sm font-mono overflow-x-auto">
                                                  {cmd}
                                                </code>
                                                <motion.button
                                                  whileHover={{ scale: 1.15 }}
                                                  whileTap={{ scale: 0.9 }}
                                                  onClick={() =>
                                                    handleCopy(cmd, tool.slug)
                                                  }
                                                  className="shrink-0 p-2.5 rounded-xl
                                                             border-2 border-cyan-400/50
                                                             text-cyan-400 bg-cyan-500/10
                                                             hover:bg-cyan-400 hover:text-black hover:border-cyan-400
                                                             opacity-0 group-hover/cmd:opacity-100
                                                             transition-all duration-300"
                                                >
                                                  {copiedCommand ===
                                                  `${tool.slug}-${cmd}` ? (
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

                                      {hasMoreCommands && (
                                        <motion.button
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                          onClick={() =>
                                            toggleCardExpansion(tool.slug)
                                          }
                                          className="w-full py-4 rounded-2xl
                                                     bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10
                                                     border-2 border-cyan-400/30 text-cyan-400 font-bold
                                                     hover:border-cyan-400/60
                                                     hover:from-cyan-500/20 hover:via-blue-500/20 hover:to-cyan-500/20
                                                     transition-all duration-500
                                                     flex items-center justify-center gap-3
                                                     shadow-[0_4px_20px_rgba(34,211,238,0.2)]
                                                     hover:shadow-[0_8px_30px_rgba(34,211,238,0.4)]"
                                        >
                                          <span>
                                            {isExpanded
                                              ? "Show Less"
                                              : `Show ${tool.commands.length - maxCommandsToShow} More`}
                                          </span>
                                          <motion.div
                                            animate={{
                                              rotate: isExpanded ? 180 : 0,
                                            }}
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
                  }
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── SECTION DIVIDER (NEW ADDITION) ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative my-32 flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          </div>
          <div
            className="relative px-10 py-4 rounded-2xl
                        bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20
                        border-2 border-cyan-400/40 backdrop-blur-xl
                        shadow-[0_0_40px_rgba(34,211,238,0.3)]
                        flex items-center gap-4"
          >
            <Layers className="w-7 h-7 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-black text-lg tracking-[0.2em] uppercase">
              Learning Platforms
            </span>
            <Layers className="w-7 h-7 text-cyan-400 animate-pulse" />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 2 — LEARNING PLATFORMS
        ══════════════════════════════════════ */}
        <div ref={platformsRef} className="scroll-mt-28">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-5 mb-14"
          >
            <div
              className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20
                          border-2 border-violet-400/50 shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            >
              <Layers className="w-9 h-9 text-violet-400" />
            </div>
            <div>
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                Learning Platforms
              </h2>
              <p className="text-gray-400 mt-1">
                Curated hands-on labs and CTF environments for skill building
              </p>
            </div>
          </motion.div>

          {/* Why practice section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <p className="text-gray-300 leading-relaxed max-w-3xl mb-14 text-lg">
              Cybersecurity is a hands-on discipline. These platforms simulate
              real-world environments where you learn by breaking systems, fixing
              vulnerabilities, and thinking like attackers — all within legal and
              ethical boundaries.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            >
              {practiceSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="relative p-6 rounded-2xl
                               bg-gradient-to-br from-white/5 to-white/[0.02]
                               border border-white/10 hover:border-cyan-400/30
                               transition-all duration-300
                               hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                  >
                    <span
                      className="absolute -top-3 -left-3 w-8 h-8 rounded-full
                                  bg-cyan-400 text-black text-sm font-bold
                                  flex items-center justify-center
                                  shadow-lg shadow-cyan-400/50"
                    >
                      {i + 1}
                    </span>
                    <div className="mb-4 text-cyan-400">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-100">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* Platform cards grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-24"
          >
            {platforms.map((p, index) => {
              const mainCategory = getMainCategory(p.category);
              const difficultyColor = getDifficultyColor(p.difficulty);
              const isFree = p.pricing === "Free";

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 0 45px rgba(34,211,238,0.35)",
                    transition: { duration: 0.3 },
                  }}
                  className="group relative p-6 rounded-2xl
                             bg-gradient-to-br from-white/5 to-white/[0.02]
                             border border-white/10 hover:border-cyan-400/40
                             transition-all duration-300"
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                                bg-gradient-to-br from-cyan-500/5 to-blue-500/5
                                transition-opacity duration-500"
                  />

                  <div className="relative">
                    {/* Top */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        {p.name}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isFree
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"
                            : p.pricing === "Paid"
                            ? "bg-orange-500/10 text-orange-300 border border-orange-400/30"
                            : "bg-blue-500/10 text-blue-300 border border-blue-400/30"
                        }`}
                      >
                        {p.pricing}
                      </div>
                    </div>

                    {/* Category tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 font-medium">
                        {mainCategory}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${difficultyColor.bg} ${difficultyColor.text} border ${difficultyColor.border} font-medium`}
                      >
                        {p.difficulty}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-5">
                      {p.description}
                    </p>

                    {/* Features */}
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                        <Zap size={12} className="text-cyan-400" />
                        KEY FEATURES
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {p.features.map((feature: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-5 pb-5 border-b border-white/10">
                      <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                        <Award size={12} className="text-cyan-400" />
                        SKILLS GAINED
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {p.skillsGained
                          .slice(0, 4)
                          .map((skill: string, i: number) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg
                                 border border-cyan-400 text-cyan-400
                                 hover:bg-cyan-400 hover:text-black
                                 transition-all duration-300 font-medium
                                 group-hover:shadow-lg group-hover:shadow-cyan-400/20"
                    >
                      <span>Visit Platform</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ─── COMBINED ETHICAL USE WARNING ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-16 p-10 rounded-3xl
                     bg-gradient-to-br from-red-500/20 via-orange-500/10 to-red-500/20
                     backdrop-blur-2xl border-2 border-red-500/50
                     shadow-[0_20px_100px_rgba(239,68,68,0.5)]
                     overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/15 blur-3xl" />
          </div>

          <div className="relative flex items-start gap-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
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
                    These tools and platforms are provided for{" "}
                    <span className="text-white font-black">
                      educational purposes
                    </span>{" "}
                    and{" "}
                    <span className="text-white font-black">
                      authorized security testing
                    </span>{" "}
                    only.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-1 p-1.5 rounded-lg bg-red-500/20 border border-red-400/40">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-lg">
                    Using these tools against systems you don't own or have
                    explicit permission to test is{" "}
                    <span className="text-red-400 font-black text-xl">
                      ILLEGAL
                    </span>{" "}
                    and may result in{" "}
                    <span className="text-red-400 font-black">
                      criminal prosecution
                    </span>{" "}
                    under computer fraud and abuse laws.
                  </p>
                </div>
              </div>

              {/* Two-column acceptable / prohibited */}
              <div className="grid gap-4 sm:grid-cols-2 mt-6">
                <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-5">
                  <h4 className="text-red-300 font-semibold mb-3 text-sm flex items-center gap-2">
                    <span>✓</span> ACCEPTABLE USES
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    {[
                      "Learning in controlled lab environments",
                      "Testing systems you own or have written permission to test",
                      "Bug bounty programs with proper authorization",
                      "Security research with ethical approval",
                      "Professional pen-testing with signed contracts",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-5">
                  <h4 className="text-red-300 font-semibold mb-3 text-sm flex items-center gap-2">
                    <span>✗</span> PROHIBITED ACTIVITIES
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    {[
                      "Unauthorized access to any system or network",
                      "Exploiting systems without explicit written permission",
                      "Distributing malware or malicious tools",
                      "Stealing or leaking sensitive data or credentials",
                      "Using skills for personal gain or causing harm",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border-l-4 border-red-400">
                <div className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-red-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-base font-bold text-red-400 mb-2">
                      ALWAYS obtain written authorization before conducting
                      security assessments.
                    </p>
                    <p className="text-sm italic text-gray-400">
                      Practice in controlled lab environments or authorized
                      platforms like{" "}
                      <span className="text-cyan-400 font-semibold">
                        HackTheBox
                      </span>
                      ,{" "}
                      <span className="text-cyan-400 font-semibold">
                        TryHackMe
                      </span>
                      , or{" "}
                      <span className="text-cyan-400 font-semibold">
                        PentesterLab
                      </span>
                      .
                    </p>
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