import { motion, type Variants } from "framer-motion";
import {
  Terminal,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
  Search,
  Filter,
  BookOpen,
  ArrowLeft,
  Info,
  Zap,
  Eye,
  AlertCircle,
} from "lucide-react";
import { useState, useMemo } from "react";
import { linuxCommands } from "../../data/linux";

/* ===============================
   ANIMATIONS
================================ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ===============================
   CORE CONCEPTS
================================ */
const coreConcepts = [
  {
    icon: Terminal,
    title: "Terminal",
    desc: "The command-line interface used to interact directly with the Linux system.",
    color: "cyan",
  },
  {
    icon: ShieldCheck,
    title: "Permissions",
    desc: "Controls who can read, write, or execute files and directories.",
    color: "purple",
  },
  {
    icon: Cpu,
    title: "Kernel",
    desc: "The core of Linux that manages hardware, memory, and processes.",
    color: "yellow",
  },
];

/* ===============================
   EXCLUDED CATEGORIES
================================ */
const EXCLUDED_CATEGORIES = ["File & Directory", "Networking"];

/* ===============================
   STICKY BACK BUTTON
================================ */
function StickyBackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-24 left-7 z-50"
    >
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                   bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                   backdrop-blur-md border border-cyan-400/30
                   hover:border-cyan-400/50 hover:from-cyan-500/20 
                   hover:to-blue-500/20 text-sm font-medium text-gray-200 
                   transition-all duration-300 shadow-lg shadow-cyan-500/10"
      >
        <ArrowLeft size={16} />
        Back to Linux
      </button>
    </motion.div>
  );
}

/* ===============================
   CONCEPT CARD
================================ */
function ConceptCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: any;
  title: string;
  desc: string;
  color: string;
}) {
  const colorClasses = {
    cyan: "text-cyan-400 bg-cyan-500/20 border-cyan-400/30",
    purple: "text-purple-400 bg-purple-500/20 border-purple-400/30",
    yellow: "text-yellow-400 bg-yellow-500/20 border-yellow-400/30",
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -8,
        boxShadow: "0 0 35px rgba(34,211,238,0.25)",
      }}
      className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
          colorClasses[color as keyof typeof colorClasses]
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-cyan-300">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ===============================
   INFO BANNER
================================ */
function InfoBanner() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-400/30 mb-10"
    >
      <Info size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-gray-300">
        <strong className="text-blue-300 font-semibold">Pro Tip:</strong> Use{" "}
        <code className="bg-black/50 px-1.5 py-0.5 rounded text-cyan-400">
          man command
        </code>{" "}
        to read detailed documentation for any command. Press 'q' to exit the
        manual.
      </div>
    </motion.div>
  );
}

/* ===============================
   SEARCH & FILTER BAR
================================ */
function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="mb-8 space-y-4"
    >
      {/* Search Input */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search commands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                     text-gray-200 placeholder-gray-500
                     focus:outline-none focus:border-cyan-400/50 focus:bg-white/10
                     transition-all duration-200"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={16} className="text-gray-400" />
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                     ${
                       selectedCategory === "All"
                         ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                         : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                     }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                       ${
                         selectedCategory === cat
                           ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                           : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                       }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ===============================
   COMMAND TABLE
================================ */
function CommandTable({
  category,
  commands,
  copied,
  copyCmd,
}: {
  category: string;
  commands: typeof linuxCommands;
  copied: string | null;
  copyCmd: (cmd: string) => void;
}) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <motion.div variants={fadeUp} className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-cyan-500/20">
          <BookOpen size={20} className="text-cyan-400" />
        </div>
        <h2 className="text-2xl font-semibold text-cyan-300">{category}</h2>
        <span className="px-2 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
          {commands.length} commands
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
        <table className="w-full">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 text-left text-cyan-300 font-semibold">
                Command
              </th>
              <th className="p-4 text-left text-cyan-300 font-semibold">
                Description
              </th>
              <th className="p-4 text-left text-cyan-300 font-semibold">
                Example
              </th>
              <th className="p-4 text-center text-cyan-300 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((cmd, i) => (
              <>
                <tr
                  key={i}
                  className="border-t border-white/10 hover:bg-white/5 transition-colors duration-150 group"
                >
                  <td className="p-4 font-mono text-cyan-400 font-medium">
                    {cmd.command}
                  </td>
                  <td className="p-4 text-gray-300 text-sm">
                    {cmd.description}
                  </td>
                  <td className="p-4 font-mono text-sm text-gray-400">
                    {cmd.example ?? "-"}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => copyCmd(cmd.command)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 
                                   border border-white/10 hover:border-cyan-400/30
                                   transition-all duration-200"
                        aria-label="Copy command"
                      >
                        {copied === cmd.command ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} className="text-gray-400" />
                        )}
                      </button>
                      {cmd.example && (
                        <button
                          onClick={() =>
                            setExpandedRow(expandedRow === i ? null : i)
                          }
                          className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 
                                     border border-white/10 hover:border-purple-400/30
                                     transition-all duration-200"
                          aria-label="View details"
                        >
                          <Eye
                            size={16}
                            className={`${
                              expandedRow === i
                                ? "text-purple-400"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedRow === i && cmd.example && (
                  <tr className="border-t border-white/5 bg-white/5">
                    <td colSpan={4} className="p-4">
                      <div className="flex items-start gap-3">
                        <Zap size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400">
                            Example usage:
                          </p>
                          <pre className="bg-black/50 p-3 rounded-lg text-sm text-cyan-300 font-mono overflow-x-auto">
                            {cmd.example}
                          </pre>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ===============================
   MAIN COMPONENT
================================ */
export default function LinuxBasics() {
  const [copied, setCopied] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const copyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 1500);
  };

  /* ===============================
     GROUP + FILTER COMMANDS
  ================================ */
  const commandCategories = useMemo(() => {
    return Object.entries(
      linuxCommands
        .filter((cmd) => !EXCLUDED_CATEGORIES.includes(cmd.category))
        .reduce<Record<string, typeof linuxCommands>>((acc, cmd) => {
          if (!acc[cmd.category]) acc[cmd.category] = [];
          acc[cmd.category].push(cmd);
          return acc;
        }, {})
    );
  }, []);

  const categories = useMemo(
    () => commandCategories.map(([cat]) => cat),
    [commandCategories]
  );

  // Filter commands based on search and category
  const filteredCategories = useMemo(() => {
    return commandCategories
      .map(([category, commands]) => {
        const filteredCommands = commands.filter((cmd) => {
          const matchesSearch =
            searchTerm === "" ||
            cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesCategory =
            selectedCategory === "All" || category === selectedCategory;

          return matchesSearch && matchesCategory;
        });

        return [category, filteredCommands] as const;
      })
      .filter(([, commands]) => commands.length > 0);
  }, [commandCategories, searchTerm, selectedCategory]);

  const totalCommands = useMemo(
    () => filteredCategories.reduce((sum, [, cmds]) => sum + cmds.length, 0),
    [filteredCategories]
  );

  return (
    <>
      <StickyBackButton />

      <div className="px-6 py-12 max-w-7xl mx-auto text-white">
        {/* ================= HEADER ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
            📘 Linux Basics & Commands
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Master essential Linux commands and core concepts for system
            administration and cybersecurity.
          </p>
        </motion.div>

        <InfoBanner />

        {/* ================= CORE CONCEPTS ================= */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <h2 className="text-2xl font-semibold text-cyan-300 mb-6 flex items-center gap-2">
            <Terminal size={24} />
            Core Linux Concepts
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {coreConcepts.map((c, i) => (
              <ConceptCard
                key={i}
                icon={c.icon}
                title={c.title}
                desc={c.desc}
                color={c.color}
              />
            ))}
          </div>
        </motion.section>

        {/* ================= SEARCH & FILTER ================= */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <h2 className="text-2xl font-semibold text-cyan-300 mb-6 flex items-center gap-2">
            <BookOpen size={24} />
            Command Reference
            <span className="text-sm font-normal text-gray-400">
              ({totalCommands} commands)
            </span>
          </h2>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </motion.section>

        {/* ================= COMMANDS ================= */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map(([category, commands]) => (
              <CommandTable
                key={category}
                category={category}
                commands={commands}
                copied={copied}
                copyCmd={copyCmd}
              />
            ))
          ) : (
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <AlertCircle size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg mb-2">No commands found</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter
              </p>
            </motion.div>
          )}
        </motion.section>

        {/* ================= FOOTER TIP ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 p-5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30"
        >
          <div className="flex items-start gap-3">
            <Zap size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-cyan-300 font-semibold mb-1">
                Practice Makes Perfect
              </h4>
              <p className="text-sm text-gray-400">
                The best way to learn these commands is through hands-on
                practice. Set up a safe virtual machine and experiment with
                different options and flags. Use{" "}
                <code className="text-cyan-400 bg-black/50 px-1.5 py-0.5 rounded">
                  --help
                </code>{" "}
                or{" "}
                <code className="text-cyan-400 bg-black/50 px-1.5 py-0.5 rounded">
                  man
                </code>{" "}
                to explore command options.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}