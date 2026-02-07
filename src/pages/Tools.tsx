import { cyberTools } from "../data/cyberTools";
import { motion, type Variants } from "framer-motion";
import { useState, useMemo } from "react";

/* ===============================
   ANIMATIONS
=============================== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ===============================
   SHARED CARD STYLES
=============================== */
const cardClass = `
  relative overflow-hidden
  p-6 rounded-2xl
  bg-gradient-to-br from-white/5 to-white/[0.02]
  backdrop-blur-xl
  border border-white/10
  transition-all duration-300
  hover:-translate-y-2
  hover:border-cyan-400/50
  hover:shadow-[0_8px_40px_rgba(34,211,238,0.3)]
  shadow-[0_4px_20px_rgba(0,0,0,0.3)]
  group
`;

/* ===============================
   LEVEL COLOR MAPPING
=============================== */
const levelColors = {
  Beginner: "text-green-400 border-green-400/30 bg-green-500/10",
  Intermediate: "text-yellow-400 border-yellow-400/30 bg-yellow-500/10",
  Advanced: "text-red-400 border-red-400/30 bg-red-500/10",
};

/* ===============================
   COMPONENT
=============================== */
export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative px-6 sm:px-10 py-14 max-w-7xl mx-auto text-white"
    >
      {/* ===============================
          AMBIENT BACKGROUND GLOW
      =============================== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-10 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/15 blur-[140px] animate-pulse" />
        <div className="absolute bottom-16 left-1/3 w-[350px] h-[350px] bg-indigo-500/15 blur-[130px] animate-pulse" />
      </div>

      {/* ===============================
          PAGE HEADER
      =============================== */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-12 text-center"
      >
        <div className="inline-block mb-4 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30">
          <span className="text-cyan-400 font-semibold text-sm tracking-wider">
            🛠️ ARSENAL
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
          Cybersecurity Tools
        </h1>

        <p className="text-gray-300 text-lg mb-8 max-w-4xl mx-auto leading-relaxed">
          Comprehensive toolkit for penetration testing, network analysis, web application security,
          exploitation, password attacks, wireless security, forensics, and OSINT investigations.
          <span className="block mt-2 text-cyan-400 font-semibold">
            {cyberTools.length} Professional Tools • {categories.length} Categories
          </span>
        </p>
      </motion.div>

      {/* ===============================
          SEARCH AND FILTER BAR
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full px-6 py-4 rounded-xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              text-white placeholder-gray-400
              focus:outline-none focus:border-cyan-400/50
              focus:shadow-[0_0_30px_rgba(34,211,238,0.2)]
              transition-all
            "
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-gray-400 text-sm font-semibold">Filters:</span>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={`
                  px-4 py-2 rounded-full text-xs font-semibold
                  border transition-all
                  ${
                    selectedCategory === category
                      ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-400"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400/30"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex flex-wrap gap-2 ml-4">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() =>
                  setSelectedLevel(selectedLevel === level ? null : level)
                }
                className={`
                  px-4 py-2 rounded-full text-xs font-semibold
                  border transition-all
                  ${
                    selectedLevel === level
                      ? levelColors[level as keyof typeof levelColors]
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                  }
                `}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Reset Button */}
          {(searchQuery || selectedCategory || selectedLevel) && (
            <button
              onClick={resetFilters}
              className="
                ml-auto px-4 py-2 rounded-full text-xs font-semibold
                bg-red-500/10 border border-red-400/30 text-red-400
                hover:bg-red-500/20 transition-all
              "
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center text-gray-400 text-sm">
          Showing <span className="text-cyan-400 font-semibold">{filteredTools.length}</span> of{" "}
          <span className="text-cyan-400 font-semibold">{cyberTools.length}</span> tools
        </div>
      </motion.div>

      {/* ===============================
          TOOLS BY CATEGORY
      =============================== */}
      {Object.keys(groupedTools).length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">No tools found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </motion.div>
      ) : (
        Object.entries(groupedTools).map(([category, tools]) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <h2 className="text-3xl font-bold text-cyan-300 tracking-wide">
                {category}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            </div>

            {/* Tool Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {tools.map((tool, index) => (
                <motion.div
                  key={`${tool.slug}-${index}`}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={cardClass}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all" />

                  {/* Card Content */}
                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-cyan-400 font-bold text-xl group-hover:text-cyan-300 transition-colors flex-1">
                        {tool.name}
                      </h3>
                      <div
                        className={`
                        px-3 py-1 rounded-full text-xs font-bold
                        border ${levelColors[tool.level]}
                      `}
                      >
                        {tool.level}
                      </div>
                    </div>

                    {/* Use Case */}
                    <p className="text-gray-300 text-sm mb-3 font-semibold">
                      {tool.use}
                    </p>

                    {/* Description */}
                    {tool.description && (
                      <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                        {tool.description}
                      </p>
                    )}

                    {/* Tags */}
                    {tool.tags && tool.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-4" />

                    {/* Commands Section */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-cyan-400 text-xs font-bold">COMMANDS:</span>
                        <div className="flex-1 h-px bg-cyan-400/20" />
                      </div>

                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-cyan-500/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-cyan-500/40">
                        {tool.commands.map((cmd, i) => (
                          <div
                            key={i}
                            className="
                              flex items-center gap-2
                              bg-black/40 rounded-lg px-3 py-2
                              border border-cyan-500/20
                              hover:border-cyan-500/40
                              transition-all
                              group/cmd
                            "
                          >
<code 
  className="flex-1 text-cyan-300 text-xs font-mono overflow-x-auto"
  style={{
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch'
  }}
>                            </code>

                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(cmd);
                                // Optional: Add toast notification here
                              }}
                              className="
                                shrink-0 text-xs px-2 py-1 rounded
                                border border-cyan-400/50 text-cyan-400
                                hover:bg-cyan-400 hover:text-black
                                opacity-0 group-hover/cmd:opacity-100
                                transition-all 
                              "
                              title="Copy to clipboard"
                            >
                              Copy
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ))
      )}

      {/* ===============================
          FOOTER NOTE
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="
          mt-20 p-8 rounded-2xl
          bg-gradient-to-br from-red-500/10 to-orange-500/5
          backdrop-blur-xl
          border-2 border-red-500/30
          shadow-[0_8px_40px_rgba(239,68,68,0.3)]
        "
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">⚠️</div>
          <div>
            <h3 className="text-red-400 font-bold text-xl mb-2">
              Ethical Use & Legal Disclaimer
            </h3>
            <div className="text-gray-300 text-sm leading-relaxed space-y-2">
              <p>
                These tools are provided for <span className="text-white font-semibold">educational purposes</span> and{" "}
                <span className="text-white font-semibold">authorized security testing</span> only.
              </p>
              <p>
                Using these tools against systems you don't own or have explicit permission to test is{" "}
                <span className="text-red-400 font-bold">illegal</span> and may result in criminal prosecution
                under computer fraud and abuse laws.
              </p>
              <p className="text-xs italic text-gray-400 border-l-2 border-red-400/50 pl-4">
                Always obtain written authorization before conducting security assessments.
                Practice in controlled lab environments or authorized platforms like HackTheBox, TryHackMe, or PentesterLab.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}