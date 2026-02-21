import { cyberTools } from "../data/cyberTools";
import { platforms } from "../data/platforms";
import { motion, type Variants } from "framer-motion";
import { useState, useMemo, useRef } from "react";
import {
  Terminal, Shield, ExternalLink, AlertTriangle, X,
  Lock, Code, Layers, Cpu, Check as CheckIcon, ArrowRight, Wrench,
} from "lucide-react";
import CyberToolkit from "./Toolkit";

/* ── animations ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ── helpers ── */
const levelConfig = {
  Beginner:     { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-400/30", icon: "🟢" },
  Intermediate: { color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-400/30",   icon: "🟡" },
  Advanced:     { color: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-400/30",    icon: "🔴" },
};

const categoryIcons: Record<string, React.ElementType> = {
  "Network Security": Shield, "Web Security": Code, "Password Attacks": Lock,
  "Wireless Security": Shield, Exploitation: Terminal, Forensics: Shield,
  OSINT: Shield, Reconnaissance: Shield,
};

function getMainCategory(c: string) {
  if (c.toLowerCase().includes("ctf"))        return "CTF";
  if (c.toLowerCase().includes("web"))        return "Web Security";
  if (c.toLowerCase().includes("linux"))      return "Linux";
  if (c.toLowerCase().includes("blockchain")) return "Blockchain";
  if (c.toLowerCase().includes("crypto"))     return "Cryptography";
  return "Cyber";
}

function getDifficultyColor(d: string) {
  if (d.includes("Beginner"))                      return { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-400/30" };
  if (d.includes("Intermediate"))                  return { bg: "bg-amber-500/10",   text: "text-amber-300",   border: "border-amber-400/30"   };
  if (d.includes("Advanced") || d.includes("Expert")) return { bg: "bg-rose-500/10", text: "text-rose-300",   border: "border-rose-400/30"    };
  return                                                  { bg: "bg-purple-500/10",  text: "text-purple-300",  border: "border-purple-400/30"  };
}

/* ══════════════════════════════════════════════
   SIMPLE TOOLKIT CARD  ← the new clean version
══════════════════════════════════════════════ */
function CyberToolkitCard({ onLaunch }: { onLaunch: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-16"
    >
      {/* heading row — same style as "Types of CyberTools" / "Learning Platforms" */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          Interactive <span className="text-cyan-400">Cyber Toolkit</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          18 browser-based security tools — no installs, no backend required
        </p>
      </div>

      {/* card — exact same rounded-2xl / from-gray-900 / border-gray-800 pattern as other cards */}
      <div
        onClick={onLaunch}
        className="group p-6 md:p-7 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950
                   border border-gray-800 hover:border-cyan-500/50 transition-all duration-300
                   cursor-pointer"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">

          {/* icon box */}
          <div className="shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20
                          group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40
                          flex items-center justify-center transition-all duration-300">
            <Wrench size={22} className="text-cyan-400" />
          </div>

          {/* body */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                Cyber Toolkit
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
                               bg-emerald-500/10 border border-emerald-400/30
                               text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                30 Tools Live
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-2xl">
              OSINT lookups, network scanning, web security checks, malware hash analysis, password
              generators, and forensics utilities — all running client-side in your browser.
            </p>
            {/* category chips — same style as tool name chips */}
            <div className="flex flex-wrap gap-1.5">
              {["OSINT", "Network", "Web Security", "Malware", "Cryptography", "Forensics"].map((tag) => (
                <span key={tag}
                  className="px-2 py-0.5 text-xs rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0 flex items-center gap-1.5 text-sm font-semibold
                          text-cyan-600 group-hover:text-cyan-400 transition-colors">
            <span className="hidden sm:block whitespace-nowrap">Open Toolkit</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function Tools() {
  const [activeTab, setActiveTab]     = useState<"tools" | "platforms">("tools");
  const [showToolkit, setShowToolkit] = useState(false);
  const toolsRef     = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);

  const groupedTools = useMemo(() =>
    cyberTools.reduce<Record<string, typeof cyberTools>>((acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    }, {}),
  []);

  const scrollToTab = (tab: "tools" | "platforms") => {
    setActiveTab(tab);
    (tab === "tools" ? toolsRef : platformsRef).current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* full-screen toolkit swap */
  if (showToolkit) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <CyberToolkit onBack={() => setShowToolkit(false)} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 max-w-[1400px] mx-auto"
    >
      {/* ── HERO ── */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-12 md:mb-16 text-center">
        <motion.h1 variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white tracking-tight">
          <span className="text-cyan-400">Cybersecurity </span>Tools
        </motion.h1>
        <motion.p variants={fadeUp}
          className="text-gray-400 text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed px-4">
          Cybersecurity tools are specialized software applications designed to safeguard computer systems,
          networks, applications, and sensitive data from a wide range of cyber threats including hacking
          attempts, malware infections, data breaches, phishing attacks, and unauthorized access.
        </motion.p>
      </motion.div>

      {/* ── TABS ── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="sticky top-4 z-50 mb-12 flex justify-center">
        <div className="relative inline-flex items-center gap-2 p-1.5 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-gray-800">
          <motion.div layoutId="tabPill"
            className="absolute top-1.5 bottom-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50"
            style={{ left: activeTab === "tools" ? "6px" : "50%", right: activeTab === "tools" ? "50%" : "6px" }}
            transition={{ duration: 0.3, ease: "easeInOut" }} />
          {(["tools", "platforms"] as const).map(tab => (
            <button key={tab} onClick={() => scrollToTab(tab)}
              className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors
                ${activeTab === tab ? "text-cyan-400" : "text-gray-400"}`}>
              {tab === "tools" ? <Cpu className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
              <span className="hidden sm:inline">{tab === "tools" ? "Security Tools" : "Learning Platforms"}</span>
              <span className="sm:hidden">{tab === "tools" ? "Tools" : "Platforms"}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════
          SECTION 1 — CYBERTOOLS
      ══════════════════════════════════════ */}
      <div ref={toolsRef} className="scroll-mt-20 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Types of <span className="text-cyan-400">CyberTools</span>
          </h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(groupedTools).map(([category, tools]) => {
            const Icon   = categoryIcons[category] || Code;
            const first  = tools[0];
            const config = levelConfig[first.level];
            return (
              <motion.div key={category} variants={fadeUp}
                className="group relative p-5 md:p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950
                           border border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg md:text-xl font-bold text-white">{category}</h3>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mb-4
                                 ${config.border} ${config.bg} ${config.color}`}>
                  <span>{config.icon}</span>{first.level}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{first.description || first.use}</p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools in Category</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {t.name}
                      </span>
                    ))}
                    {tools.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-400">+{tools.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          DIVIDER ➜ TOOLKIT CARD  (between sections)
      ══════════════════════════════════════ */}
      <div className="relative my-12 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        </div>
        <div className="relative px-5 py-1.5 rounded-full bg-gray-900 border border-cyan-500/30 flex items-center gap-2">
          <Wrench className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold text-xs uppercase tracking-wider">Interactive Toolkit</span>
        </div>
      </div>

      <CyberToolkitCard onLaunch={() => setShowToolkit(true)} />

      {/* ══════════════════════════════════════
          DIVIDER ➜ PLATFORMS
      ══════════════════════════════════════ */}
      <div className="relative my-16 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </div>
        <div className="relative px-6 py-2 rounded-lg bg-gray-900 border border-cyan-500/30 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Learning Platforms</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION 2 — PLATFORMS
      ══════════════════════════════════════ */}
      <div ref={platformsRef} className="scroll-mt-20 mb-16">
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Learning <span className="text-cyan-400">Platforms</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">Curated hands-on labs and CTF environments for skill building</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p, index) => {
            const dc = getDifficultyColor(p.difficulty);
            const isFree = p.pricing === "Free";
            return (
              <motion.div key={index} variants={fadeUp}
                className="group relative p-5 md:p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950
                           border border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-cyan-400">{p.name}</h3>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    isFree       ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"
                    : p.pricing === "Paid" ? "bg-orange-500/10 text-orange-300 border border-orange-400/30"
                    : "bg-blue-500/10 text-blue-300 border border-blue-400/30"}`}>
                    {p.pricing}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 font-medium">
                    {getMainCategory(p.category)}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${dc.bg} ${dc.text} border ${dc.border} font-medium`}>
                    {p.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Key Features</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.features.map((f: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-gray-800/50 text-gray-400 border border-gray-700">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Skills Gained</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.skillsGained.slice(0, 4).map((s: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">{s}</span>
                    ))}
                  </div>
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400
                             hover:bg-cyan-400 hover:text-black transition-all duration-300 font-medium">
                  Visit Platform <ExternalLink size={14} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── ETHICAL WARNING ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-rose-900/20 to-orange-900/20 border-2 border-rose-500/30">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="shrink-0 p-3 rounded-xl bg-rose-500/20 border border-rose-400/40">
            <AlertTriangle className="w-8 h-8 text-rose-400" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-rose-400">Ethical Use &amp; Legal Disclaimer</h3>
              <div className="px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-400/40">
                <span className="text-rose-300 font-bold text-xs uppercase">Critical</span>
              </div>
            </div>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>Provided for <span className="text-white font-semibold">educational purposes</span> and <span className="text-white font-semibold">authorized security testing</span> only.</p>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <p>Unauthorized use is <span className="text-rose-400 font-bold">ILLEGAL</span> and may result in <span className="text-rose-400 font-semibold">criminal prosecution</span>.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 mt-4">
              {[
                { title: "✓ ACCEPTABLE USES", dot: "text-cyan-400", items: ["Learning in controlled lab environments", "Testing systems you own or have written permission", "Bug bounty programs with proper authorization", "Security research with ethical approval"] },
                { title: "✗ PROHIBITED", dot: "text-rose-400", items: ["Unauthorized access to any system or network", "Exploiting systems without explicit written permission", "Distributing malware or malicious tools", "Stealing or leaking sensitive data or credentials"] },
              ].map(({ title, dot, items }) => (
                <div key={title} className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-4">
                  <h4 className="text-rose-300 font-semibold mb-2 text-sm">{title}</h4>
                  <ul className="space-y-1.5 text-gray-300 text-xs">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5"><span className={`${dot} mt-0.5`}>•</span>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-orange-500/10 border-l-4 border-rose-400">
              <div className="flex items-start gap-2">
                <Lock className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-rose-400 mb-1">ALWAYS obtain written authorization before security assessments.</p>
                  <p className="text-xs italic text-gray-400">Practice on HackTheBox, TryHackMe, or PentesterLab.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}