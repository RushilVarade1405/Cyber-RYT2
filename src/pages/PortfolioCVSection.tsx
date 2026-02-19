import { useState, useEffect, memo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Shield, Lock, Terminal, FileDown, Cpu, Wifi, Code2,
  CheckCircle2, Mail, Database, Server, Globe, Layers,
  Zap, BookOpen, Linkedin, Github,
  Eye, Search, AlertTriangle,
} from "lucide-react";

/* ══════════════════════════════════════
   CONSTANTS — defined outside components to avoid re-creation
══════════════════════════════════════ */
const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/rushilvarade1405",         label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rushil-varade",   label: "LinkedIn" },
  { icon: Mail,     href: "mailto:rushilvarade@gmail.com",               label: "Email"    },
] as const;

const TERM_LINES = [
  "> whoami",
  "rushil_varade",
  "> cat roles.txt",
  "SOC Analyst  |  VAPT  |  Digital Forensics",
  "> cat status.txt",
  "B.E. CS — COMPLETED ✓  |  Open to Hire ✓",
  "> nmap -sV recruiter.local",
  "PORT 443 — OPPORTUNITY DETECTED ✓",
] as const;

const SKILL_GROUPS = [
  {
    category: "Languages",
    icon: Code2,
    items: ["Python", "SQL", "PowerShell", "Bash"],
  },
  {
    category: "Operating Systems",
    icon: Server,
    items: ["Kali Linux", "Ubuntu", "Windows Server", "macOS"],
  },
  {
    category: "Networking",
    icon: Wifi,
    items: ["TCP/UDP", "OSI Model", "DNS", "DHCP", "VPN", "Firewall", "IDS/IPS"],
  },
  {
    category: "Security Tools",
    icon: Shield,
    items: ["Nmap", "Wireshark", "Burp Suite", "Metasploit", "SQLMap", "Nessus", "Maltego", "OSINT", "OWASP Top 10"],
  },
] as const;

const DOMAINS = [
  { icon: Shield,      label: "Penetration Testing" },
  { icon: Eye,         label: "SOC Operations"       },
  { icon: Search,      label: "VAPT"                 },
  { icon: Lock,        label: "Cryptography"         },
  { icon: Terminal,    label: "Linux / CLI"          },
  { icon: Cpu,         label: "Blockchain Security"  },
  { icon: Database,    label: "Digital Forensics"    },
  { icon: AlertTriangle, label: "Threat Detection"  },
] as const;

const PROJECTS = [
  {
    title: "Document Summarization Tool",
    description: "AI-powered tool that ingests large documents and produces concise, structured summaries using NLP pipelines and transformer-based models.",
    impact: "Cuts review time by ~70%",
    tags: ["Python", "NLP", "AI", "Automation"],
    icon: BookOpen,
    accent: "blue" as const,
  },
  {
    title: "Image Steganography Tool",
    description: "Encodes and decodes hidden messages within image files using LSB (Least Significant Bit) manipulation for covert communication research.",
    impact: "Undetectable to standard scanners",
    tags: ["Python", "Cryptography", "Steganography", "Security"],
    icon: Layers,
    accent: "cyan" as const,
  },
  {
    title: "Cyber_World — Learning Platform",
    description: "Full-stack cybersecurity education platform covering Linux, networking, tools, blockchain, cryptography, and cyber laws for beginners.",
    impact: "End-to-end learning path",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    icon: Globe,
    accent: "indigo" as const,
  },
] as const;

const STATS = [
  { label: "Security Tools",  value: "10+", color: "blue"   },
  { label: "Projects Built",  value: "3+",  color: "cyan"   },
  { label: "Domains",         value: "8",   color: "indigo" },
  { label: "Degree",          value: "B.E.", color: "green" },
] as const;

/* ══════════════════════════════════════
   TYPING HOOK  (stable, typed)
══════════════════════════════════════ */
function useTyping(lines: readonly string[], speed: number = 40): string {
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let current = "";
    let timerId: ReturnType<typeof setTimeout>;

    const tick = (): void => {
      if (lineIdx >= lines.length) return;
      if (charIdx < lines[lineIdx].length) {
        current += lines[lineIdx][charIdx++];
        setOutput(current);
        timerId = setTimeout(tick, speed);
      } else {
        current += "\n";
        charIdx = 0;
        lineIdx++;
        setOutput(current);
        timerId = setTimeout(tick, 320);
      }
    };

    timerId = setTimeout(tick, 600);
    return () => clearTimeout(timerId);
  // lines is a stable const tuple — safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return output;
}

/* ══════════════════════════════════════
   SHARED UI PRIMITIVES
══════════════════════════════════════ */
const ScanLine = memo(() => (
  <m.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent my-20 origin-left"
  />
));
ScanLine.displayName = "ScanLine";

const SectionLabel = memo(({ label }: { label: string }) => (
  <div className="flex items-center gap-3 mb-10">
    <span className="h-px w-8 bg-blue-500/50" />
    <span className="text-[10px] font-mono tracking-[0.3em] text-blue-400/60 uppercase select-none">
      {label}
    </span>
    <span className="h-px flex-1 bg-blue-500/15" />
  </div>
));
SectionLabel.displayName = "SectionLabel";

/* Reusable pill badge */
const Badge = memo(({
  children, variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "green" | "blue";
}) => {
  const styles = {
    default: "bg-white/5 border-white/10 text-gray-400",
    green:   "bg-green-500/10 border-green-500/25 text-green-400",
    blue:    "bg-blue-500/10 border-blue-500/25 text-blue-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono ${styles[variant]}`}>
      {children}
    </span>
  );
});
Badge.displayName = "Badge";

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
const Hero = memo(() => {
  const typed = useTyping(TERM_LINES, 38);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-10">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow blobs */}
      <div aria-hidden className="absolute top-24 right-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-14 items-center">
        {/* ── LEFT: Identity */}
        <div>
          {/* Status badges */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            <Badge variant="blue">
              <CheckCircle2 className="w-3 h-3" />
              Open to opportunities
            </Badge>
            <Badge variant="green">
              <CheckCircle2 className="w-3 h-3" />
              B.E. Graduate 🎓
            </Badge>
          </m.div>

          {/* Name */}
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-6xl sm:text-7xl font-black leading-none tracking-tight mb-4"
          >
            <span className="text-white">Rushil</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              Varade
            </span>
          </m.h1>

          {/* Role tagline — the first thing a recruiter reads */}
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 font-mono text-base mb-1"
          >
            SOC Analyst · VAPT · Digital Forensics
          </m.p>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-sm mb-8"
          >
            B.E. CS — IoT, Cybersecurity &amp; Blockchain
            <br />
            Smt. Indira Gandhi College of Engineering
          </m.p>

          {/* Primary CTAs */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 mb-6"
          >
            <a
              href="/RushilVarade_Resume.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-400 active:scale-95 transition-all duration-200 group shadow-lg shadow-blue-500/20"
            >
              <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Download Resume
            </a>
            <a
              href="mailto:rushilvarade@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/12 text-gray-300 text-sm font-semibold hover:bg-white/10 hover:border-blue-500/35 active:scale-95 transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </m.div>

          {/* Social icons */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex gap-3"
          >
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-500/35 hover:bg-blue-500/5 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </m.div>
        </div>

        {/* ── RIGHT: Terminal */}
        <m.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="rounded-2xl bg-black/85 border border-blue-500/20 overflow-hidden shadow-2xl shadow-blue-900/20">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/4 border-b border-white/8">
              <span aria-hidden className="w-3 h-3 rounded-full bg-red-500/60" />
              <span aria-hidden className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span aria-hidden className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-[11px] font-mono text-gray-600 select-none">
                rushil@cyber — bash
              </span>
            </div>
            <div
              aria-label="Terminal output"
              className="p-6 font-mono text-sm text-blue-400 min-h-[280px] whitespace-pre-wrap leading-7"
            >
              {typed}
              <span aria-hidden className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-0.5 translate-y-1" />
            </div>
          </div>

          {/* Quick-stat row below terminal */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {STATS.map(({ label, value, color }) => (
              <div
                key={label}
                className={`p-3 rounded-xl bg-${color}-500/5 border border-${color}-500/20 text-center`}
              >
                <p className={`text-xl font-black text-${color}-400`}>{value}</p>
                <p className="text-gray-600 text-[10px] mt-0.5 font-mono leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

/* ══════════════════════════════════════
   ABOUT
══════════════════════════════════════ */
const AboutSection = memo(() => (
  <m.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
  >
    <SectionLabel label="About Me" />
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-4 text-gray-400 text-[15px] leading-7">
        <p>
          I'm <span className="text-white font-semibold">Rushil Varade</span>, a cybersecurity
          graduate specializing in{" "}
          <span className="text-blue-400">IoT, Cybersecurity, and Blockchain</span>. My focus is
          on understanding attack surfaces before picking up tools — because effective defense
          starts with thinking like an attacker.
        </p>
        <p>
          I'm actively pursuing roles as a{" "}
          <span className="text-white font-semibold">SOC Analyst</span> and in{" "}
          <span className="text-white font-semibold">VAPT</span> — contributing to threat
          detection, vulnerability assessment, penetration testing, and incident response. I also
          built <span className="text-blue-400 font-semibold">Cyber_World</span>, a structured
          learning platform for cybersecurity beginners, to give back to the community.
        </p>
        {/* Recruiter-friendly keyword strip */}
        <div className="flex flex-wrap gap-2 pt-2">
          {["Ethical Hacking", "Network Defense", "Digital Forensics", "Incident Response", "Threat Intelligence", "OSINT"].map((kw) => (
            <span key={kw} className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-blue-500/8 border border-blue-500/18 text-blue-300">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile stats (hidden on lg where they appear under the terminal) */}
      <div className="grid grid-cols-2 gap-3 content-start lg:hidden">
        {STATS.map(({ label, value, color }) => (
          <div key={label} className={`p-4 rounded-xl bg-${color}-500/5 border border-${color}-500/20 text-center`}>
            <p className={`text-2xl font-black text-${color}-400`}>{value}</p>
            <p className="text-gray-600 text-[11px] mt-1 font-mono">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </m.section>
));
AboutSection.displayName = "AboutSection";

/* ══════════════════════════════════════
   SKILLS
══════════════════════════════════════ */
const SkillsSection = memo(() => (
  <m.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
  >
    <SectionLabel label="Skills & Expertise" />

    {/* Domain icons */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      {DOMAINS.map(({ icon: Icon, label }) => (
        <m.div
          key={label}
          whileHover={{ y: -4, boxShadow: "0 0 24px rgba(59,130,246,0.15)" }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/4 border border-white/8 hover:border-blue-500/30 transition-colors group cursor-default"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-[11px] text-gray-500 text-center group-hover:text-gray-300 transition-colors font-mono">
            {label}
          </span>
        </m.div>
      ))}
    </div>

    {/* Skill tag groups */}
    <div className="grid sm:grid-cols-2 gap-5">
      {SKILL_GROUPS.map(({ category, icon: Icon, items }, i) => (
        <m.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="p-5 rounded-xl bg-black/50 border border-blue-500/15 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-4">
            <Icon className="w-4 h-4 text-blue-400" />
            <p className="text-[10px] font-mono tracking-widest text-blue-400/60 uppercase">
              {category}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {items.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-blue-500/8 border border-blue-500/18 text-blue-300 hover:bg-blue-500/15 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </m.div>
      ))}
    </div>
  </m.section>
));
SkillsSection.displayName = "SkillsSection";

/* ══════════════════════════════════════
   PROJECTS
══════════════════════════════════════ */
const ProjectsSection = memo(() => (
  <m.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
  >
    <SectionLabel label="Projects" />

    <div className="grid lg:grid-cols-3 gap-6">
      {PROJECTS.map(({ title, description, impact, tags, icon: Icon, accent }, i) => (
        <m.div
          key={title}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -6, boxShadow: "0 0 35px rgba(59,130,246,0.12)" }}
          className="group relative flex flex-col p-6 rounded-2xl bg-black/60 border border-blue-500/15 hover:border-blue-500/35 transition-all duration-300 overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/4 group-hover:to-cyan-500/4 transition-all duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col flex-1 gap-4">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-${accent}-500/10 border border-${accent}-500/20 flex items-center justify-center`}>
              <Icon className={`w-6 h-6 text-${accent}-400`} />
            </div>

            <div className="flex-1">
              <h3 className="text-white font-bold text-base mb-2 group-hover:text-blue-200 transition-colors">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{description}</p>
              {/* Impact line — recruiter-scannable */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-green-400/80 bg-green-500/8 border border-green-500/15 px-2.5 py-1 rounded-lg">
                <Zap className="w-3 h-3" />
                {impact}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
              {tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/8 text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </m.div>
      ))}
    </div>
  </m.section>
));
ProjectsSection.displayName = "ProjectsSection";

/* ══════════════════════════════════════
   EDUCATION
══════════════════════════════════════ */
const EducationSection = memo(() => (
  <m.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
  >
    <SectionLabel label="Education" />

    <div className="relative pl-6 border-l border-blue-500/20">
      <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/60" />

      <m.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className="p-6 rounded-2xl bg-black/60 border border-blue-500/15 hover:border-blue-500/35 transition-colors max-w-2xl"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">
              Bachelor of Engineering — Computer Science
            </h3>
            <p className="text-blue-400 font-mono text-sm mt-0.5">
              Smt. Indira Gandhi College of Engineering
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-mono flex items-center gap-1.5 shrink-0">
            <CheckCircle2 className="w-3 h-3" />
            Completed 🎓
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Specialization: <span className="text-gray-400">IoT · Cybersecurity · Blockchain</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {["IoT", "Cybersecurity", "Blockchain", "Networking", "Computer Science"].map((s) => (
            <span key={s} className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-blue-500/8 border border-blue-500/18 text-blue-300">
              {s}
            </span>
          ))}
        </div>
      </m.div>
    </div>
  </m.section>
));
EducationSection.displayName = "EducationSection";

/* ══════════════════════════════════════
   CONTACT
══════════════════════════════════════ */
const ContactSection = memo(() => (
  <m.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center py-16"
  >
    <div className="relative inline-block mb-6">
      <div aria-hidden className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl scale-150 pointer-events-none" />
      <div className="relative w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mx-auto">
        <Zap className="w-10 h-10 text-blue-400" />
      </div>
    </div>

    <h2 className="text-4xl font-black text-white mb-3">Let's Connect</h2>
    <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed text-sm">
      Fresh graduate actively looking for <span className="text-gray-300">SOC Analyst</span> and{" "}
      <span className="text-gray-300">VAPT</span> roles — internships, contracts, and full-time.
      I respond quickly. Let's talk!
    </p>

    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="mailto:rushilvarade@gmail.com"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-400 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/20"
      >
        <Mail className="w-4 h-4" />
        Send Email
      </a>
      <a
        href="https://www.linkedin.com/in/rushil-varade"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/12 text-gray-300 font-semibold hover:bg-white/10 hover:border-blue-500/35 active:scale-95 transition-all duration-200"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </a>
      <a
        href="https://github.com/rushilvarade1405"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/12 text-gray-300 font-semibold hover:bg-white/10 hover:border-blue-500/35 active:scale-95 transition-all duration-200"
      >
        <Github className="w-4 h-4" />
        GitHub
      </a>
      <a
        href="/RushilVarade_Resume.pdf"
        download
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-blue-500/25 text-blue-400 font-semibold hover:bg-blue-500/10 active:scale-95 transition-all duration-200"
      >
        <FileDown className="w-4 h-4" />
        Download Resume
      </a>
    </div>

    <p className="mt-20 text-gray-700 text-xs font-mono select-none">
      rushil.varade · cybersecurity · 2025
    </p>
  </m.section>
));
ContactSection.displayName = "ContactSection";

/* ══════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════ */
export default function PortfolioCVSection() {
  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-screen text-white overflow-hidden">
        {/* Dot-grid background */}
        <div
          aria-hidden
          className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
          <Hero />
          <ScanLine />
          <AboutSection />
          <ScanLine />
          <SkillsSection />
          <ScanLine />
          <ProjectsSection />
          <ScanLine />
          <EducationSection />
          <ScanLine />
          <ContactSection />
        </div>
      </main>
    </LazyMotion>
  );
}