import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target, Globe, Lightbulb, Code, Shield, BookOpen, Rocket, Sparkles,
  User, Heart, TrendingUp, ExternalLink, FileDown, Terminal, Briefcase,
  Award, MapPin, Mail, Github, Linkedin, Calendar,
  Cpu, Lock, Eye, Layers, Zap, ArrowUpRight, GraduationCap, Activity, FlaskConical,
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
  { label: "OS",      color: "#06b6d4", rgb: "6,182,212",   items: ["Kali Linux", "Windows Server", "macOS"] },
  { label: "Network", color: "#8b5cf6", rgb: "139,92,246",  items: ["TCP/UDP", "OSI", "DNS", "VPN", "IDS/IPS"] },
  { label: "Tools",   color: "#f59e0b", rgb: "245,158,11",  items: ["Nmap", "Burp Suite", "Metasploit", "Wireshark", "SQLMap", "Maltego"] },
];

const certifications = [
  { name: "Penetration Testing Specialization", issuer: "ENCRYTECL", icon: "🎯", color: "#06b6d4", rgb: "6,182,212",   done: true },
  { name: "CEH (Certified Ethical Hacker)",     issuer: "EC-Council", icon: "🛡️", color: "#8b5cf6", rgb: "139,92,246", done: false },
  { name: "Cybersecurity Fundamentals",          issuer: "ENCRYTECL", icon: "🔐", color: "#10b981", rgb: "16,185,129", done: true  },
];

const labs = ["OWASP Top 10", "OpenVAS", "Splunk SIEM", "Linux CLI", "Advent of Cyber 2025"];

const projects = [
  { title: "Cyber Intelligence Toolkit", desc: "43 browser-native security tools. 100% client-side.", tags: ["React", "TypeScript"],  icon: Cpu,     color: "#06b6d4", rgb: "6,182,212",   status: "Live"        },
  { title: "Cyber_World Platform",        desc: "Full-stack cybersecurity learning platform.",           tags: ["React", "Tailwind"],   icon: Globe,   color: "#8b5cf6", rgb: "139,92,246",  status: "Live"        },
  { title: "Image Steganography",         desc: "Covert data hiding in media files.",                    tags: ["Steganography"],       icon: Activity,color: "#10b981", rgb: "16,185,129",  status: "In Progress" },
];

const domains = [
  { label: "VAPT",         icon: Lock,     color: "#06b6d4" },
  { label: "SOC / SIEM",   icon: Eye,      color: "#8b5cf6" },
  { label: "Networking",   icon: Globe,    color: "#f59e0b" },
  { label: "Forensics",    icon: Layers,   color: "#10b981" },
  { label: "Cryptography", icon: Lock,     color: "#ef4444" },
  { label: "OSINT",        icon: Eye,      color: "#3b82f6" },
  { label: "Blockchain",   icon: Cpu,      color: "#a855f7" },
  { label: "Linux / CLI",  icon: Terminal, color: "#06b6d4" },
];

const socials = [
  { icon: Github,   href: "https://github.com/rushilvarade1405",        label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rushil-varade/", label: "LinkedIn" },
  { icon: Mail,     href: "mailto:rushilvarade@gmail.com",               label: "Email"    },
];

/* ================================================================
   SHARED SUB-COMPONENTS
================================================================ */
const PhilosophyCard = memo(({ item }: { item: typeof philosophyItems[0] }) => {
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
PhilosophyCard.displayName = "PhilosophyCard";

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
   PORTFOLIO SECTION — single compact card
================================================================ */
const Divider = () => (
  <div className="w-full h-px my-5" style={{ background: "rgba(255,255,255,0.07)" }} />
);

const SectionHead = ({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="p-1 rounded-md border" style={{ background: `rgba(${color},0.1)`, borderColor: `rgba(${color},0.25)` }}>
      <Icon size={11} style={{ color: `rgb(${color})` }} />
    </div>
    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: `rgb(${color})` }}>{label}</span>
  </div>
);

function PortfolioSection() {
  const navigate = useNavigate();

  return (
    <m.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55 }}
      className="max-w-5xl mx-auto mb-24"
    >
      {/* Label */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5">
          <Briefcase size={11} className="text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400">Portfolio</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      {/* ── THE CARD ──────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-950
                      hover:border-blue-500/35 transition-all duration-500
                      hover:shadow-[0_0_60px_rgba(59,130,246,0.09)]">

        {/* decorative details */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-500/20 rounded-br-2xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/4 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 p-7">

          {/* ── ROW 1: IDENTITY ─────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">

            {/* avatar */}
            <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20
                            border-2 border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <User size={26} className="text-blue-300" />
            </div>

            {/* name / meta */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1">
                <h3 className="text-2xl font-black tracking-tight text-white">Rushil Varade</h3>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/25
                                 text-blue-400 text-[9px] font-mono tracking-widest uppercase">
                  <Terminal size={8} />Recruiter View
                </span>
              </div>
              <p className="text-blue-400 font-mono text-xs mb-2">
                Cybersecurity Enthusiast · SOC Analyst Aspirant · VAPT
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={9} />India</span>
                <span className="flex items-center gap-1"><GraduationCap size={9} />B.E. Computer Science</span>
                <span className="flex items-center gap-1"><Calendar size={9} />Graduated 2025</span>
              </div>
            </div>

            {/* stats */}
            <div className="flex gap-2 shrink-0">
              {[
                { val: "43+", lbl: "Tools",    col: "#06b6d4", rgb: "6,182,212"   },
                { val: "3",   lbl: "Projects", col: "#8b5cf6", rgb: "139,92,246"  },
                { val: "8",   lbl: "Domains",  col: "#3b82f6", rgb: "59,130,246"  },
                { val: "3",   lbl: "Certs",    col: "#10b981", rgb: "16,185,129"  },
              ].map(({ val, lbl, col, rgb }) => (
                <div key={lbl} className="px-2.5 py-1.5 rounded-xl text-center border"
                  style={{ background: `rgba(${rgb},0.07)`, borderColor: `rgba(${rgb},0.22)` }}>
                  <div className="text-sm font-black leading-none" style={{ color: col }}>{val}</div>
                  <div className="text-[8px] font-mono text-gray-500 tracking-wide uppercase mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── ROW 2: SKILLS · CERTS · DOMAINS ────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            {/* Technical Skills */}
            <div>
              <SectionHead icon={Zap} label="Technical Skills" color="6,182,212" />
              <div className="space-y-2.5">
                {skillGroups.map(grp => (
                  <div key={grp.label}>
                    <div className="text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: grp.color }}>{grp.label}</div>
                    <div className="flex flex-wrap gap-1">
                      {grp.items.map(item => (
                        <span key={item} className="px-2 py-0.5 rounded-md text-[10px] font-medium border"
                          style={{ background: `rgba(${grp.rgb},0.08)`, borderColor: `rgba(${grp.rgb},0.25)`, color: grp.color }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <SectionHead icon={Award} label="Certifications" color="16,185,129" />
              <div className="space-y-1.5">
                {certifications.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-lg border relative overflow-hidden"
                    style={{ background: `rgba(${c.rgb},0.04)`, borderColor: `rgba(${c.rgb},0.18)` }}>
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full" style={{ background: c.color }} />
                    <span className="text-sm ml-1">{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-gray-100 leading-snug truncate">{c.name}</p>
                      <p className="text-[9px] text-gray-500">{c.issuer}</p>
                    </div>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                      style={c.done
                        ? { background: `rgba(${c.rgb},0.15)`, color: c.color,  border: `1px solid rgba(${c.rgb},0.4)` }
                        : { background: "rgba(255,255,255,0.04)", color: "#6b7280", border: "1px solid rgba(255,255,255,0.08)" }
                      }>
                      {c.done ? "✓" : "⏳"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domains + Labs */}
            <div>
              <SectionHead icon={Layers} label="Security Domains" color="139,92,246" />
              <div className="grid grid-cols-2 gap-1 mb-3">
                {domains.map(({ label, icon: DIcon, color }) => (
                  <div key={label} className="flex items-center gap-1.5 px-2 py-1 rounded-md border cursor-default"
                    style={{ background: `${color}08`, borderColor: `${color}22` }}>
                    <DIcon size={9} style={{ color }} />
                    <span className="text-[10px] font-medium text-gray-300 truncate">{label}</span>
                  </div>
                ))}
              </div>
              {/* TryHackMe labs */}
              <div className="rounded-lg border border-red-500/20 overflow-hidden" style={{ background: "rgba(239,68,68,0.03)" }}>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-red-500/12">
                  <span className="text-sm">🟥</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">TryHackMe Labs</span>
                </div>
                <div className="px-2.5 py-1.5 flex flex-wrap gap-1">
                  {labs.map(lab => (
                    <span key={lab} className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded bg-red-500/8 border border-red-500/18 text-gray-400">
                      <FlaskConical size={7} className="text-red-400 shrink-0" />{lab}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── ROW 3: PROJECTS ─────────────────────── */}
          <div>
            <SectionHead icon={Rocket} label="Featured Projects" color="139,92,246" />
            <div className="grid sm:grid-cols-3 gap-2.5">
              {projects.map((proj, i) => {
                const PIcon = proj.icon;
                return (
                  <m.div key={i}
                    className="group relative p-3.5 rounded-xl border transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                    style={{ background: `rgba(${proj.rgb},0.04)`, borderColor: `rgba(${proj.rgb},0.18)` }}
                    whileHover={{ borderColor: `rgba(${proj.rgb},0.45)`, boxShadow: `0 0 18px rgba(${proj.rgb},0.1)` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center border"
                        style={{ background: `rgba(${proj.rgb},0.12)`, borderColor: `rgba(${proj.rgb},0.3)` }}>
                        <PIcon size={13} style={{ color: proj.color }} />
                      </div>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full font-mono
                        ${proj.status === "Live"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30"
                          : "bg-amber-500/15 text-amber-400 border border-amber-400/30"}`}>
                        {proj.status === "Live" ? "● LIVE" : "◐ WIP"}
                      </span>
                    </div>
                    <h5 className="text-[11px] font-bold text-white mb-1 leading-snug">{proj.title}</h5>
                    <p className="text-[10px] text-gray-500 leading-relaxed mb-2 group-hover:text-gray-400 transition-colors">{proj.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-gray-600">{tag}</span>
                      ))}
                    </div>
                    <ArrowUpRight size={11}
                      className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all"
                      style={{ color: proj.color }} />
                  </m.div>
                );
              })}
            </div>
          </div>

          <Divider />

          {/* ── ROW 4: CTA BAR ──────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-gray-400">Available for opportunities</span>
              </div>
              <div className="flex items-center gap-1.5">
                {socials.map(({ icon: SIcon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 border border-white/8 hover:bg-blue-500/10
                               hover:border-blue-400/30 text-gray-500 hover:text-blue-400 transition-all duration-200"
                    title={label}>
                    <SIcon size={12} />
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/portfolio")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500
                           text-white text-xs font-bold transition-all duration-200 shadow-lg shadow-blue-500/20 whitespace-nowrap">
                <ExternalLink size={11} />Full Portfolio
              </button>
              <a href="/RushilVarade_Resume.pdf" download
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-gray-700
                           hover:border-blue-400/50 text-gray-400 hover:text-blue-300 text-xs font-semibold
                           hover:bg-blue-500/8 transition-all duration-200 whitespace-nowrap">
                <FileDown size={11} />Download CV
              </a>
            </div>
          </div>

        </div>
      </div>
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

          {/* ── TITLE ──────────────────────────────────── */}
          <m.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} className="mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              About Cyber_World
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          </m.div>

          {/* ── INTRO ──────────────────────────────────── */}
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

          {/* ── CREATOR ────────────────────────────────── */}
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

          {/* ── PORTFOLIO (compact single card) ────────── */}
          <PortfolioSection />

          {/* ── PURPOSE & VISION ───────────────────────── */}
          <m.section variants={stagger} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} className="grid gap-8 md:grid-cols-2 mb-24">
            {[
              {
                icon: Target, title: "Purpose", grad: "from-cyan-500/10 to-blue-500/10",
                body: "To remove confusion from cybersecurity learning by providing a clear, beginner-friendly path with structured guidance.",
                sub: "Cyber_World focuses on understanding concepts before using tools, ensuring solid foundations.",
              },
              {
                icon: Globe, title: "Vision", grad: "from-blue-500/10 to-purple-500/10",
                body: "To become a trusted starting point for cybersecurity learners worldwide, building a community of ethical hackers.",
                sub: "Encouraging ethical practices and long-term skill development through consistent learning.",
              },
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

          {/* ── LEARNING PHILOSOPHY ────────────────────── */}
          <m.section className="mb-24">
            <m.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center">
              Our Learning <span className="text-cyan-400">Philosophy</span>
            </m.h2>
            <m.div variants={stagger} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-50px" }} className="grid gap-8 md:grid-cols-3">
              {philosophyItems.map(item => <PhilosophyCard key={item.title} item={item} />)}
            </m.div>
          </m.section>

          {/* ── WHAT YOU'LL LEARN ──────────────────────── */}
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

          {/* ── ROADMAP ────────────────────────────────── */}
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

          {/* ── FUTURE GOALS ───────────────────────────── */}
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

          {/* ── FOOTER CTA ─────────────────────────────── */}
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