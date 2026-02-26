import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target, Globe, Lightbulb, Code, Shield, BookOpen, Rocket, Sparkles,
  User, Heart, TrendingUp, ExternalLink, FileDown, Terminal, Briefcase,
  Award, MapPin, Mail, Github, Linkedin, Calendar, ChevronRight,
  Cpu, Lock, Eye, Layers, Zap, ArrowUpRight, GraduationCap, Activity,
  MonitorCheck, Network, Wrench, BookMarked, FlaskConical,
} from "lucide-react";

/* ================================================================
   ANIMATION VARIANTS
================================================================ */
const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const iconFloat: Variants = {
  animate: { y: [-3, 3, -3], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
};

/* ================================================================
   DATA — About Page
================================================================ */
const philosophyItems = [
  {
    icon: Lightbulb, title: "Clarity First",
    points: ["Simple explanations before complexity", "Step-by-step learning approach", "No unnecessary technical overload"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Code, title: "Practice Driven",
    points: ["Hands-on learning with guidance", "Understand tools before using them", "Learning through experimentation"],
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    icon: Shield, title: "Ethics & Responsibility",
    points: ["Strong focus on cyber laws", "Professional security mindset", "No illegal or harmful practices"],
    gradient: "from-purple-500/20 to-cyan-500/20",
  },
];

const roadmapSteps = [
  { icon: BookOpen,   title: "Foundations",      items: ["Linux basics", "Networking", "Core security concepts"], color: "cyan"   },
  { icon: Rocket,     title: "Security Tools",   items: ["Reconnaissance", "Scanning", "Intro to VAPT"],          color: "blue"   },
  { icon: Shield,     title: "Defense & Law",    items: ["Cyber laws", "SOC basics", "Incident awareness"],        color: "purple" },
  { icon: TrendingUp, title: "Advanced Domains", items: ["Blockchain security", "Case studies", "Projects"],       color: "indigo" },
];

const learningTopics = [
  { icon: "💻", text: "Linux and command-line fundamentals"          },
  { icon: "🌐", text: "Networking and system-level concepts"         },
  { icon: "🔧", text: "Security tools with attack & defense context" },
  { icon: "🔐", text: "Cryptography and secure communications"       },
  { icon: "⚖️", text: "Cyber laws and ethical hacking principles"   },
];

const futureGoals = [
  { icon: "📚", text: "Structured beginner-to-advanced learning paths" },
  { icon: "🧪", text: "Guided labs and hands-on walkthroughs"          },
  { icon: "💼", text: "Industry-aligned case studies"                  },
  { icon: "👥", text: "Community-driven learning features"             },
];

/* ================================================================
   DATA — Portfolio
================================================================ */
const skillGroups = [
  {
    label: "Operating Systems",
    icon: MonitorCheck,
    color: "#06b6d4",
    rgb: "6,182,212",
    items: ["Kali Linux", "Windows Server", "macOS"],
  },
  {
    label: "Networking",
    icon: Network,
    color: "#8b5cf6",
    rgb: "139,92,246",
    items: ["TCP/UDP", "OSI Model", "DNS", "DHCP", "VPN", "Firewall", "IDS/IPS"],
  },
  {
    label: "Security Tools",
    icon: Wrench,
    color: "#f59e0b",
    rgb: "245,158,11",
    items: ["Nmap", "OWASP Top 10", "Wireshark", "OSINT", "Nessus", "Maltego", "SQLMap", "Burp Suite", "Metasploit"],
  },
];

const certifications = [
  {
    name: "Specialization in Penetration Testing",
    issuer: "ENCRYTECL",
    icon: "🎯",
    color: "#06b6d4",
    rgb: "6,182,212",
    status: "pursuing",
  },
  {
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    icon: "🛡️",
    color: "#8b5cf6",
    rgb: "139,92,246",
    status: "pursuing",
  },
  {
    name: "Cybersecurity Fundamentals",
    issuer: "ENCRYTECL",
    icon: "🔐",
    color: "#10b981",
    rgb: "16,185,129",
    status: "completed",
  },
];

const extraCurricular = [
  {
    type: "course" as const,
    icon: "🌐",
    title: "Network Fundamentals",
    desc: "Covering basic networking concepts such as OSI & TCP/IP models, IP addressing, and Network Communication.",
  },
  {
    type: "course" as const,
    icon: "🔐",
    title: "Cybersecurity Fundamentals",
    desc: "Understanding threats, vulnerabilities, attacks, and basic security controls.",
  },
  {
    type: "labs" as const,
    icon: "🟥",
    title: "TryHackMe Hands-on Labs",
    desc: "Completed practical cybersecurity labs across multiple domains:",
    labs: [
      { name: "OWASP Top 10",         detail: "Understanding common web application vulnerabilities"     },
      { name: "OpenVAS",              detail: "Vulnerability scanning and assessment"                    },
      { name: "Splunk (SIEM Basics)", detail: "Log monitoring and security event analysis"               },
      { name: "Linux CLI",            detail: "Command-line usage, file handling, and system navigation" },
      { name: "Advent of Cyber 2025", detail: "Completed 24 cybersecurity challenges"                   },
    ],
  },
];

const projects = [
  {
    title: "Cyber Intelligence Toolkit",
    desc: "43 browser-native security tools — hash cracking, OSINT, network calc, encryption. 100% client-side.",
    tags: ["React", "TypeScript", "Web Crypto API"],
    icon: Cpu,
    color: "#06b6d4",
    rgb: "6,182,212",
    status: "Live",
  },
  {
    title: "Cyber_World Platform",
    desc: "Full-stack cybersecurity learning platform with structured roadmaps, tools & content for beginners.",
    tags: ["React", "Tailwind", "Framer Motion"],
    icon: Globe,
    color: "#8b5cf6",
    rgb: "139,92,246",
    status: "Live",
  },
  {
    title: "Image Steganography Project",
    desc: "Steganography project enabling covert communication by embedding confidential data within standard media files (images, audio, text) using encoding and decoding modules for secure, undetectable data transmission.",
    tags: ["Steganography", "Data Hiding", "Cybersecurity"],
    icon: Activity,
    color: "#10b981",
    rgb: "16,185,129",
    status: "In Progress",
  },
];

const domains = [
  { label: "VAPT",         icon: Lock,     color: "#06b6d4" },
  { label: "SOC / SIEM",   icon: Eye,      color: "#8b5cf6" },
  { label: "Forensics",    icon: Layers,   color: "#10b981" },
  { label: "Networking",   icon: Globe,    color: "#f59e0b" },
  { label: "Cryptography", icon: Lock,     color: "#ef4444" },
  { label: "OSINT",        icon: Eye,      color: "#3b82f6" },
  { label: "Blockchain",   icon: Cpu,      color: "#a855f7" },
  { label: "Linux / CLI",  icon: Terminal, color: "#06b6d4" },
];

/* ================================================================
   SHARED SUB-COMPONENTS
================================================================ */
const PhilosophyCardComponent = memo(({ item }: { item: typeof philosophyItems[0] }) => {
  const Icon = item.icon;
  return (
    <m.article variants={fadeUp} initial="rest" whileHover="hover"
      className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <m.div variants={iconFloat} animate="animate"
          className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center">
          <Icon className="w-7 h-7 text-cyan-400" />
        </m.div>
        <h3 className="text-xl text-cyan-400 font-semibold mb-4 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
        <ul className="space-y-2.5 text-gray-400 text-sm">
          {item.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 group-hover:text-gray-300 transition-colors">
              <span className="text-cyan-400 mt-1">▸</span><span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </m.article>
  );
});
PhilosophyCardComponent.displayName = "PhilosophyCard";

const RoadmapCard = memo(({ step }: { step: typeof roadmapSteps[0] }) => {
  const Icon = step.icon;
  return (
    <m.article variants={fadeUp} initial="rest" whileHover="hover"
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
      <div className="relative z-10">
        <m.div variants={iconFloat} animate="animate"
          className={`mb-4 w-12 h-12 rounded-lg bg-${step.color}-500/20 border border-${step.color}-400/30 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${step.color}-400`} />
        </m.div>
        <h3 className="text-lg text-cyan-400 font-semibold mb-3 group-hover:text-cyan-300 transition-colors">{step.title}</h3>
        <ul className="space-y-1.5 text-gray-400 text-sm">
          {step.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 group-hover:text-gray-300 transition-colors">
              <span className="text-cyan-400">•</span><span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </m.article>
  );
});
RoadmapCard.displayName = "RoadmapCard";

/* ================================================================
   PORTFOLIO SECTION
================================================================ */
function PortfolioSection() {
  const navigate = useNavigate();

  return (
    <m.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="max-w-5xl mx-auto mb-24"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5">
          <Briefcase size={11} className="text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400">Portfolio</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      {/* ══════════════════════════════
          HERO IDENTITY CARD
      ══════════════════════════════ */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-2xl mb-5
                   border border-gray-800 bg-gray-950
                   hover:border-blue-500/40 transition-all duration-500
                   hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]"
      >
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-500/20 rounded-br-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 p-7 md:p-9">
          <div className="flex flex-col md:flex-row md:items-start gap-7">

            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20
                              border-2 border-blue-400/30 flex items-center justify-center
                              shadow-lg shadow-blue-500/10">
                <User size={36} className="text-blue-300" />
              </div>
            </div>

            {/* Identity info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="text-3xl font-black tracking-tight text-white">Rushil Varade</h3>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/25
                                 text-blue-400 text-[10px] font-mono tracking-widest uppercase">
                  <Terminal size={9} />Recruiter Access
                </span>
              </div>
              <p className="text-blue-400 font-mono text-sm mb-3">
                Cybersecurity Enthusiast · SOC Analyst Aspirant · VAPT
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1.5"><MapPin size={11} className="text-gray-600" />India</span>
                <span className="flex items-center gap-1.5"><GraduationCap size={11} className="text-gray-600" />B.E. Computer Science</span>
                <span className="flex items-center gap-1.5"><Calendar size={11} className="text-gray-600" />Graduated 2025</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { val: "43+", lbl: "Tools Built",   col: "#06b6d4", rgb: "6,182,212"   },
                  { val: "3",   lbl: "Projects",       col: "#8b5cf6", rgb: "139,92,246"  },
                  { val: "8",   lbl: "Domains",        col: "#3b82f6", rgb: "59,130,246"  },
                  { val: "3",   lbl: "Certifications", col: "#10b981", rgb: "16,185,129"  },
                ].map(({ val, lbl, col, rgb }) => (
                  <div key={lbl} className="px-3 py-1.5 rounded-xl text-center border"
                    style={{ background: `rgba(${rgb},0.07)`, borderColor: `rgba(${rgb},0.25)` }}>
                    <div className="text-base font-black" style={{ color: col }}>{val}</div>
                    <div className="text-[9px] font-mono text-gray-500 tracking-wide uppercase">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-row md:flex-col gap-2.5 shrink-0">
              <button onClick={() => navigate("/portfolio")}
                className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                           bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold
                           transition-all duration-200 shadow-lg shadow-blue-500/20 whitespace-nowrap">
                <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                Full Portfolio
              </button>
              <a href="/RushilVarade_Resume.pdf" download
                className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                           bg-white/5 border border-blue-500/30 hover:border-blue-400/60
                           text-blue-400 hover:text-blue-300 text-sm font-semibold
                           hover:bg-blue-500/10 transition-all duration-200 whitespace-nowrap">
                <FileDown size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </m.div>

      {/* ══════════════════════════════════════════════
          TWO-COL GRID
      ══════════════════════════════════════════════ */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">

        {/* ─── LEFT COLUMN ─────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Technical Skills */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl border border-gray-800 bg-gray-950 p-6
                       hover:border-cyan-500/30 transition-all duration-400
                       hover:shadow-[0_0_28px_rgba(6,182,212,0.07)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                <Zap size={14} className="text-cyan-400" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">Technical Skills</h4>
            </div>

            <div className="space-y-5">
              {skillGroups.map((grp, i) => {
                const GIcon = grp.icon;
                return (
                  <m.div key={grp.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.15, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <GIcon size={12} style={{ color: grp.color }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: grp.color }}>
                        {grp.label}
                      </span>
                      <div className="flex-1 h-px ml-1"
                        style={{ background: `linear-gradient(90deg, rgba(${grp.rgb},0.45), transparent)` }} />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {grp.items.map((item, j) => (
                        <m.span key={item}
                          initial={{ opacity: 0, scale: 0.82 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 + j * 0.03 + 0.15 }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium border
                                     cursor-default hover:scale-[1.06] transition-transform duration-150"
                          style={{
                            background: `rgba(${grp.rgb},0.08)`,
                            borderColor: `rgba(${grp.rgb},0.28)`,
                            color: grp.color,
                          }}
                        >
                          {item}
                        </m.span>
                      ))}
                    </div>
                  </m.div>
                );
              })}
            </div>
          </m.div>

          {/* Extra Curricular */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl border border-gray-800 bg-gray-950 p-6
                       hover:border-amber-500/30 transition-all duration-400
                       hover:shadow-[0_0_28px_rgba(245,158,11,0.07)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-400/20">
                <BookMarked size={14} className="text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">Extra Curricular</h4>
            </div>

            <div className="space-y-3">
              {extraCurricular.map((item, i) => (
                <m.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  {item.type === "labs" ? (
                    <div className="rounded-xl border border-red-500/20 overflow-hidden"
                      style={{ background: "rgba(239,68,68,0.03)" }}>
                      <div className="flex items-start gap-3 px-4 py-3 border-b border-red-500/12">
                        <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-red-400 uppercase tracking-wide leading-tight">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <div className="p-3 space-y-1">
                        {item.labs?.map((lab, j) => (
                          <m.div key={j}
                            initial={{ opacity: 0, x: 6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.06 + 0.3 }}
                            className="flex items-start gap-2 px-2.5 py-1.5 rounded-lg
                                       hover:bg-red-500/8 transition-colors duration-200"
                          >
                            <FlaskConical size={10} className="text-red-400 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <span className="text-[11px] font-semibold text-gray-200">{lab.name}</span>
                              <span className="text-[10px] text-gray-500 ml-1.5 leading-relaxed">— {lab.detail}</span>
                            </div>
                          </m.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="group flex items-start gap-3 p-3 rounded-xl border border-white/6
                                    hover:bg-amber-500/5 hover:border-amber-400/20 transition-all duration-250"
                      style={{ background: "rgba(255,255,255,0.015)" }}>
                      <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors mb-0.5">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  )}
                </m.div>
              ))}
            </div>
          </m.div>
        </div>

        {/* ─── RIGHT COLUMN ────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Certifications */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative rounded-2xl border border-gray-800 bg-gray-950 p-5
                       hover:border-emerald-500/30 transition-all duration-400
                       hover:shadow-[0_0_28px_rgba(16,185,129,0.07)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
                <Award size={14} className="text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">Certifications</h4>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <m.div key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="group relative flex items-center gap-3 p-3 rounded-xl border
                             transition-all duration-300 overflow-hidden cursor-default"
                  style={{ background: `rgba(${cert.rgb},0.04)`, borderColor: `rgba(${cert.rgb},0.18)` }}
                  whileHover={{ borderColor: `rgba(${cert.rgb},0.4)`, background: `rgba(${cert.rgb},0.08)` } as any}
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                    style={{ background: cert.color }} />
                  <span className="text-xl shrink-0 ml-1.5">{cert.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-gray-100 leading-snug group-hover:text-white transition-colors">
                      {cert.name}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{cert.issuer}</p>
                  </div>

                  {/* ── Status chip — Completed vs Pursuing ── */}
                  {cert.status === "completed" ? (
                    <span
                      className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full
                                 text-[9px] font-bold uppercase tracking-wide whitespace-nowrap"
                      style={{
                        background: `rgba(${cert.rgb},0.15)`,
                        color: cert.color,
                        border: `1px solid rgba(${cert.rgb},0.4)`,
                      }}
                    >
                      ✓ Completed
                    </span>
                  ) : (
                    <span
                      className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full
                                 text-[9px] font-bold uppercase tracking-wide whitespace-nowrap"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "#9ca3af",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      ⏳ Pursuing
                    </span>
                  )}
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Security Domains */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative rounded-2xl border border-gray-800 bg-gray-950 p-5
                       hover:border-purple-500/30 transition-all duration-400"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-400/20">
                <Layers size={14} className="text-purple-400" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">Security Domains</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {domains.map(({ label, icon: DIcon, color }, i) => (
                <m.div key={label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border
                             hover:scale-[1.03] transition-transform duration-200 cursor-default"
                  style={{ background: `${color}08`, borderColor: `${color}25` }}
                >
                  <DIcon size={11} style={{ color }} />
                  <span className="text-[11px] font-medium text-gray-300">{label}</span>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>

      {/* ══════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════ */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative rounded-2xl border border-gray-800 bg-gray-950 p-6
                   hover:border-violet-500/30 transition-all duration-400
                   hover:shadow-[0_0_28px_rgba(139,92,246,0.07)] mb-5"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-400/20">
              <Rocket size={14} className="text-violet-400" />
            </div>
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">Featured Projects</h4>
          </div>
          <button onClick={() => navigate("/portfolio")}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-violet-400 transition-colors">
            View All <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {projects.map((proj, i) => {
            const PIcon = proj.icon;
            return (
              <m.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:-translate-y-1"
                style={{ background: `rgba(${proj.rgb},0.04)`, borderColor: `rgba(${proj.rgb},0.18)` }}
                whileHover={{ borderColor: `rgba(${proj.rgb},0.45)`, boxShadow: `0 0 20px rgba(${proj.rgb},0.1)` }}
              >
                <div className="absolute top-3 right-3">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono
                    ${proj.status === "Live"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30"
                      : "bg-amber-500/15 text-amber-400 border border-amber-400/30"}`}>
                    {proj.status === "Live" ? "● LIVE" : "◐ WIP"}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 border"
                  style={{ background: `rgba(${proj.rgb},0.12)`, borderColor: `rgba(${proj.rgb},0.3)` }}>
                  <PIcon size={17} style={{ color: proj.color }} />
                </div>
                <h5 className="text-sm font-bold text-white mb-1.5 pr-8 leading-tight">{proj.title}</h5>
                <p className="text-[11px] text-gray-500 mb-3 leading-relaxed group-hover:text-gray-400 transition-colors">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight size={13}
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ color: proj.color }} />
              </m.div>
            );
          })}
        </div>
      </m.div>

      {/* ══════════════════════════════
          BOTTOM CTA BAR
      ══════════════════════════════ */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 p-5
                   hover:border-blue-500/30 transition-all duration-400"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-transparent to-cyan-500/3 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-300">Available for opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { icon: Github,   href: "https://github.com/rushilvarade1405", label: "GitHub"   },
                { icon: Linkedin, href: "https://www.linkedin.com/in/rushil-varade/", label: "LinkedIn" },
                { icon: Mail,     href: "mailto:rushilvarade@gmail.com", label: "Email"    },
              ].map(({ icon: SIcon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="group p-2 rounded-lg bg-white/5 border border-white/8
                             hover:bg-blue-500/10 hover:border-blue-400/30
                             text-gray-500 hover:text-blue-400 transition-all duration-200"
                  title={label}>
                  <SIcon size={14} />
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => navigate("/portfolio")}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold
                         transition-all duration-200 shadow-lg shadow-blue-500/20 whitespace-nowrap">
              <ExternalLink size={13} className="group-hover:scale-110 transition-transform" />
              View Full Portfolio
            </button>
            <a href="/RushilVarade_Resume.pdf" download
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-white/5 border border-gray-700 hover:border-blue-400/50
                         text-gray-400 hover:text-blue-300 text-sm font-semibold
                         hover:bg-blue-500/8 transition-all duration-200 whitespace-nowrap">
              <FileDown size={13} className="group-hover:-translate-y-0.5 transition-transform" />
              Download CV
            </a>
          </div>
        </div>
      </m.div>
    </m.section>
  );
}

/* ================================================================
   MAIN COMPONENT
================================================================ */
export default function About() {
  return (
    <LazyMotion features={domAnimation}>
      <m.main variants={pageFade} initial="hidden" animate="visible"
        className="relative min-h-screen text-white overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-20">

          {/* TITLE */}
          <m.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} className="mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              About Cyber_World
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          </m.div>

          {/* INTRO */}
          <m.div variants={fadeIn} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-4xl mb-24 p-8 rounded-2xl bg-black/50 border border-white/20 backdrop-blur-xl">
            <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
              <p>
                <span className="text-cyan-400 font-semibold text-xl">Cyber_World </span>is a
                beginner-focused cybersecurity learning platform designed to make security concepts simple, structured, and accessible.
              </p>
              <p>We guide learners through fundamentals first, ensuring crystal-clear understanding before advancing to tools, techniques, and real-world scenarios.</p>
              <p className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>The platform strongly emphasizes <span className="text-cyan-400 font-semibold">ethical learning</span> and responsible security practices.</span>
              </p>
            </div>
          </m.div>

          {/* CREATOR */}
          <m.section variants={fadeIn} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} className="max-w-5xl mx-auto mb-10">
            <div className="relative overflow-hidden p-10 rounded-2xl bg-black/50 border border-white/20 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <m.div variants={iconFloat} animate="animate"
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30 flex items-center justify-center">
                    <User className="w-8 h-8 text-cyan-400" />
                  </m.div>
                  <h2 className="text-3xl text-cyan-400 font-bold">Creator</h2>
                </div>
                <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
                  <p>Hi, I'm <span className="text-cyan-400 font-bold text-xl">RYTNIX</span>, a cybersecurity learner and technology enthusiast with a passion for ethical hacking, Linux, blockchain, and digital security.</p>
                  <p>Cyber_World was born as a personal learning project that gradually evolved into a structured platform for sharing knowledge in a <span className="text-cyan-400 font-semibold">simple, practical, and beginner-focused</span> way.</p>
                  <p className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <span>This project is continuously evolving as I explore new tools, security techniques, and emerging technologies.</span>
                  </p>
                </div>
              </div>
            </div>
          </m.section>

          {/* PORTFOLIO */}
          <PortfolioSection />

          {/* PURPOSE & VISION */}
          <m.section variants={stagger} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} className="grid gap-8 md:grid-cols-2 mb-24">
            {[
              { icon: Target, title: "Purpose", grad: "from-cyan-500/10 to-blue-500/10",
                body: "To remove confusion from cybersecurity learning by providing a clear, beginner-friendly path with structured guidance.",
                sub: "Cyber_World focuses on understanding concepts before using tools, ensuring solid foundations." },
              { icon: Globe, title: "Vision", grad: "from-blue-500/10 to-purple-500/10",
                body: "To become a trusted starting point for cybersecurity learners worldwide, building a community of ethical hackers.",
                sub: "Encouraging ethical practices and long-term skill development through consistent learning." },
            ].map(({ icon: Icon, title, grad, body, sub }) => (
              <m.article key={title} variants={fadeUp} initial="rest" whileHover="hover"
                className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <m.div variants={iconFloat} animate="animate"
                    className="mb-4 w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </m.div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">{title}</h3>
                  <p className="text-gray-300 mb-3 leading-relaxed">{body}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{sub}</p>
                </div>
              </m.article>
            ))}
          </m.section>

          {/* LEARNING PHILOSOPHY */}
          <m.section className="mb-24">
            <m.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center">
              Our Learning <span className="text-cyan-400">Philosophy</span>
            </m.h2>
            <m.div variants={stagger} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-50px" }} className="grid gap-8 md:grid-cols-3">
              {philosophyItems.map(item => <PhilosophyCardComponent key={item.title} item={item} />)}
            </m.div>
          </m.section>

          {/* WHAT YOU'LL LEARN */}
          <m.section variants={fadeIn} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} className="max-w-5xl mx-auto mb-24">
            <div className="relative overflow-hidden p-8 rounded-2xl bg-black/40 border border-cyan-400/20 backdrop-blur-xl">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-3xl text-cyan-400 font-bold">What You'll Learn</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {learningTopics.map((topic, idx) => (
                    <m.div key={idx} variants={fadeUp}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10
                                 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
                      <span className="text-2xl group-hover:scale-110 transition-transform">{topic.icon}</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{topic.text}</span>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </m.section>

          {/* ROADMAP */}
          <m.section className="mb-24">
            <m.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center">
              Learning <span className="text-cyan-400">Roadmap</span>
            </m.h2>
            <m.div variants={stagger} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-50px" }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {roadmapSteps.map(step => <RoadmapCard key={step.title} step={step} />)}
            </m.div>
          </m.section>

          {/* FUTURE GOALS */}
          <m.section variants={fadeIn} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} className="max-w-5xl mx-auto mb-24">
            <div className="p-8 rounded-2xl bg-black/40 border border-purple-400/20 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl text-cyan-400 font-bold">Future Goals</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {futureGoals.map((goal, idx) => (
                  <m.div key={idx} variants={fadeUp}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10
                               hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{goal.icon}</span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{goal.text}</span>
                  </m.div>
                ))}
              </div>
            </div>
          </m.section>

          {/* FOOTER CTA */}
          <m.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center p-8 rounded-2xl bg-black/40 border border-cyan-400/20 backdrop-blur-sm">
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <p className="text-2xl font-bold text-white mb-2">Learn. Practice. Secure.</p>
            <p className="text-cyan-400 text-3xl font-bold">Cyber_World</p>
          </m.div>

        </div>
      </m.main>
    </LazyMotion>
  );
}