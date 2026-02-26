import { useState, useEffect, memo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Shield, Lock, Terminal, FileDown, Cpu, Wifi, Code2,
  CheckCircle2, Mail, Database, Server, Globe, Layers,
  Zap, BookOpen, Linkedin, Github,
  Eye, Search, AlertTriangle, ChevronRight, Activity,
  MapPin, Calendar, Sparkles,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   Primary  : Cyan    #06b6d4 / rgb 6,182,212
   Skills   : Violet  #8b5cf6 / rgb 139,92,246
   Projects : Amber   #f59e0b / rgb 245,158,11
   Certs    : Emerald #10b981 / rgb 16,185,129
   Domains  : each gets its own hue (purposeful, not rainbow)
   Base     : #04080f  — very dark navy-black
   Font     : IBM Plex Mono (mono code feel) + body text stays clean
════════════════════════════════════════════════════════════════ */

// Section accent map — one color per section, never mixed within
const CYAN   = { hex: "#06b6d4", rgb: "6,182,212"   };
const VIOLET = { hex: "#8b5cf6", rgb: "139,92,246"  };
const AMBER  = { hex: "#f59e0b", rgb: "245,158,11"  };
const EMERALD= { hex: "#10b981", rgb: "16,185,129"  };

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/rushilvarade1405",        label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rushil-varade",  label: "LinkedIn" },
  { icon: Mail,     href: "mailto:rushilvarade@gmail.com",              label: "Email"    },
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
  { category: "Languages",         icon: Code2,  color: CYAN,    items: ["Python", "SQL", "PowerShell", "Bash"] },
  { category: "Operating Systems", icon: Server, color: VIOLET,  items: ["Kali Linux", "Ubuntu", "Windows Server", "macOS"] },
  { category: "Networking",        icon: Wifi,   color: AMBER,   items: ["TCP/UDP", "OSI Model", "DNS", "DHCP", "VPN", "Firewall", "IDS/IPS"] },
  { category: "Security Tools",    icon: Shield, color: EMERALD, items: ["Nmap", "Wireshark", "Burp Suite", "Metasploit", "SQLMap", "Nessus", "Maltego", "OSINT", "OWASP Top 10"] },
] as const;

const DOMAINS = [
  { icon: Shield,        label: "Penetration Testing", hex: "#06b6d4", rgb: "6,182,212"   },
  { icon: Eye,           label: "SOC Operations",      hex: "#8b5cf6", rgb: "139,92,246"  },
  { icon: Search,        label: "VAPT",                hex: "#f59e0b", rgb: "245,158,11"  },
  { icon: Lock,          label: "Cryptography",        hex: "#10b981", rgb: "16,185,129"  },
  { icon: Terminal,      label: "Linux / CLI",         hex: "#ef4444", rgb: "239,68,68"   },
  { icon: Cpu,           label: "Blockchain Security", hex: "#a855f7", rgb: "168,85,247"  },
  { icon: Database,      label: "Digital Forensics",   hex: "#3b82f6", rgb: "59,130,246"  },
  { icon: AlertTriangle, label: "Threat Detection",    hex: "#f97316", rgb: "249,115,22"  },
] as const;

const CERTIFICATIONS = [
  { name: "Specialization in Penetration Testing", issuer: "ENCRYTECL", icon: "🎯", hex: "#06b6d4", rgb: "6,182,212",   status: "pursuing"  },
  { name: "Certified Ethical Hacker (CEH)",         issuer: "EC-Council", icon: "🛡️", hex: "#8b5cf6", rgb: "139,92,246",  status: "pursuing"  },
  { name: "Cybersecurity Fundamentals",             issuer: "ENCRYTECL", icon: "🔐", hex: "#10b981", rgb: "16,185,129",  status: "completed" },
];

const PROJECTS = [
  {
    id: "01", title: "Document Summarization Tool",
    desc: "AI-powered tool that ingests large documents and produces concise, structured summaries using NLP pipelines and transformer-based models.",
    impact: "Cuts review time by ~70%",
    tags: ["Python", "NLP", "AI", "Automation"],
    icon: BookOpen, hex: "#06b6d4", rgb: "6,182,212", status: "LIVE",
  },
  {
    id: "02", title: "Image Steganography Tool",
    desc: "Encodes and decodes hidden messages within image files using LSB manipulation for covert communication research.",
    impact: "Undetectable to standard scanners",
    tags: ["Python", "Cryptography", "Steganography"],
    icon: Layers, hex: "#f59e0b", rgb: "245,158,11", status: "LIVE",
  },
  {
    id: "03", title: "Cyber_World Platform",
    desc: "Full-stack cybersecurity education platform covering Linux, networking, tools, blockchain, cryptography, and cyber laws for beginners.",
    impact: "End-to-end learning path",
    tags: ["React", "TypeScript", "Tailwind"],
    icon: Globe, hex: "#8b5cf6", rgb: "139,92,246", status: "LIVE",
  },
] as const;

const STATS = [
  { label: "Tools Built",  value: "10+",  hex: "#06b6d4", rgb: "6,182,212"   },
  { label: "Projects",     value: "3+",   hex: "#8b5cf6", rgb: "139,92,246"  },
  { label: "Domains",      value: "8",    hex: "#f59e0b", rgb: "245,158,11"  },
  { label: "Degree",       value: "B.E.", hex: "#10b981", rgb: "16,185,129"  },
] as const;

/* ══════════════════════════════════════
   TYPING HOOK
══════════════════════════════════════ */
function useTyping(lines: readonly string[], speed = 38): string {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let li = 0, ci = 0, cur = "";
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (li >= lines.length) return;
      if (ci < lines[li].length) { cur += lines[li][ci++]; setOutput(cur); t = setTimeout(tick, speed); }
      else { cur += "\n"; ci = 0; li++; setOutput(cur); t = setTimeout(tick, 300); }
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return output;
}

/* ══════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════ */

/** Section header — hacker prompt style with color accent */
const SectionLabel = memo(({ id, label, hex, rgb }: { id: string; label: string; hex: string; rgb: string }) => (
  <div className="flex items-center gap-3 mb-10 select-none">
    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
      style={{ background: `rgba(${rgb},0.1)`, borderColor: `rgba(${rgb},0.3)`, color: hex }}>
      {id}
    </span>
    <span className="font-mono text-sm font-bold tracking-[0.2em] uppercase" style={{ color: hex }}>
      {label}
    </span>
    <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, rgba(${rgb},0.4), transparent)` }} />
    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: hex, boxShadow: `0 0 8px ${hex}` }} />
  </div>
));
SectionLabel.displayName = "SectionLabel";

/** Glowing card wrapper */
const GlowCard = memo(({
  children, hex, rgb, className = "",
}: { children: React.ReactNode; hex: string; rgb: string; className?: string }) => (
  <div className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${className}`}
    style={{ background: `rgba(${rgb},0.06)`, borderColor: `rgba(${rgb},0.18)`, backdropFilter: "blur(8px)" }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = `rgba(${rgb},0.4)`;
      el.style.boxShadow = `0 0 32px rgba(${rgb},0.1)`;
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = `rgba(${rgb},0.18)`;
      el.style.boxShadow = "none";
    }}>
    {/* Top shimmer line */}
    <div className="absolute top-0 left-0 right-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.6), transparent)` }} />
    {children}
  </div>
));
GlowCard.displayName = "GlowCard";

const Divider = memo(() => (
  <div className="relative my-20">
    <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.15), transparent)" }} />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
      style={{ background: "#06b6d4", boxShadow: "0 0 8px #06b6d4" }} />
  </div>
));
Divider.displayName = "Divider";

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
const Hero = memo(() => {
  const typed = useTyping(TERM_LINES);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-10">
      {/* Scanlines */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)" }} />
      {/* Grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.5) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
      {/* Glow blobs */}
      <div aria-hidden className="absolute top-10 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)" }} />
      <div aria-hidden className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)" }} />

      <div className="relative z-10 grid lg:grid-cols-[1fr_460px] gap-14 items-center">

        {/* LEFT — Identity */}
        <div>
          {/* Shell prompt */}
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="font-mono text-xs mb-5" style={{ color: "rgba(6,182,212,0.5)" }}>
            <span style={{ color: "#06b6d4" }}>root@cyber</span>
            <span style={{ color: "rgba(6,182,212,0.4)" }}>:~$&nbsp;</span>
            <span style={{ color: "#06b6d4" }}>./portfolio.sh --mode=recruiter</span>
          </m.p>

          {/* Name */}
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.65 }}>
            <h1 className="font-mono font-black leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.2rem,8vw,6rem)", color: "#06b6d4", textShadow: "0 0 50px rgba(6,182,212,0.3)" }}>
              RUSHIL
            </h1>
            <h1 className="font-mono font-black leading-[0.88] tracking-tight mb-7 text-white"
              style={{ fontSize: "clamp(3.2rem,8vw,6rem)" }}>
              VARADE
            </h1>
          </m.div>

          {/* Role chips */}
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.33 }}
            className="flex flex-wrap gap-2 mb-4">
            {[
              { label: "SOC_Analyst", ...CYAN    },
              { label: "VAPT",        ...VIOLET  },
              { label: "Forensics",   ...AMBER   },
              { label: "Grad_2025",   ...EMERALD },
            ].map(({ label, hex, rgb }) => (
              <span key={label} className="font-mono text-xs px-3 py-1 rounded border font-bold"
                style={{ background: `rgba(${rgb},0.1)`, borderColor: `rgba(${rgb},0.35)`, color: hex }}>
                {label}
              </span>
            ))}
          </m.div>

          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
            className="font-mono text-[11px] mb-8" style={{ color: "rgba(6,182,212,0.4)" }}>
            # B.E. CS — IoT · Cybersecurity · Blockchain · Smt. Indira Gandhi College of Engineering
          </m.p>

          {/* Status flags */}
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
            className="flex flex-wrap gap-2 mb-8">
            <span className="font-mono text-[11px] px-3 py-1 rounded border flex items-center gap-1.5"
              style={{ background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.35)", color: "#10b981", boxShadow: "0 0 14px rgba(16,185,129,0.1)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              [OPEN_TO_HIRE]
            </span>
            <span className="font-mono text-[11px] px-3 py-1 rounded border flex items-center gap-1.5"
              style={{ background: "rgba(6,182,212,0.07)", borderColor: "rgba(6,182,212,0.2)", color: "rgba(6,182,212,0.6)" }}>
              <MapPin size={10} /> India
            </span>
            <span className="font-mono text-[11px] px-3 py-1 rounded border flex items-center gap-1.5"
              style={{ background: "rgba(6,182,212,0.07)", borderColor: "rgba(6,182,212,0.2)", color: "rgba(6,182,212,0.6)" }}>
              <Calendar size={10} /> Class of 2025
            </span>
          </m.div>

          {/* CTAs */}
          <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-7">
            <a href="/RushilVarade_Resume.pdf" download
              className="group flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm font-bold border transition-all duration-200"
              style={{ background: "rgba(6,182,212,0.12)", borderColor: "rgba(6,182,212,0.5)", color: "#06b6d4", boxShadow: "0 0 22px rgba(6,182,212,0.12)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(6,182,212,0.2)"; el.style.boxShadow = "0 0 30px rgba(6,182,212,0.22)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(6,182,212,0.12)"; el.style.boxShadow = "0 0 22px rgba(6,182,212,0.12)"; }}>
              <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              ./download_resume
            </a>
            <a href="mailto:rushilvarade@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm border transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(6,182,212,0.18)", color: "rgba(6,182,212,0.55)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(6,182,212,0.45)"; el.style.color = "#06b6d4"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(6,182,212,0.18)"; el.style.color = "rgba(6,182,212,0.55)"; }}>
              <Mail className="w-4 h-4" /> ./contact_me
            </a>
          </m.div>

          {/* Socials */}
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 rounded flex items-center justify-center border transition-all duration-200"
                style={{ background: "rgba(6,182,212,0.05)", borderColor: "rgba(6,182,212,0.15)", color: "rgba(6,182,212,0.5)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(6,182,212,0.5)"; el.style.color = "#06b6d4"; el.style.boxShadow = "0 0 12px rgba(6,182,212,0.18)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(6,182,212,0.15)"; el.style.color = "rgba(6,182,212,0.5)"; el.style.boxShadow = "none"; }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </m.div>
        </div>

        {/* RIGHT — Terminal */}
        <m.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.42, duration: 0.65 }}
          className="hidden lg:flex flex-col gap-3">
          <div className="rounded-2xl border overflow-hidden"
            style={{ background: "rgba(2,8,18,0.72)", borderColor: "rgba(6,182,212,0.25)", boxShadow: "0 0 60px rgba(6,182,212,0.07)", backdropFilter: "blur(6px)" }}>
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: "rgba(6,182,212,0.04)", borderColor: "rgba(6,182,212,0.12)" }}>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="ml-3 font-mono text-[10px]" style={{ color: "rgba(6,182,212,0.35)" }}>
                rushil@cyber-world ~ bash
              </span>
            </div>
            <div className="p-5 font-mono text-sm min-h-[260px] whitespace-pre-wrap leading-7"
              style={{ color: "#06b6d4", textShadow: "0 0 6px rgba(6,182,212,0.3)" }}>
              {typed}
              <span className="inline-block w-2 h-[1em] animate-pulse ml-0.5 translate-y-[3px]"
                style={{ background: "#06b6d4" }} />
            </div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-4 gap-2">
            {STATS.map(({ label, value, hex, rgb }) => (
              <div key={label} className="p-3 rounded-xl border text-center"
                style={{ background: `rgba(${rgb},0.06)`, borderColor: `rgba(${rgb},0.22)` }}>
                <p className="font-mono text-lg font-black" style={{ color: hex }}>{value}</p>
                <p className="font-mono text-[9px] mt-0.5 uppercase tracking-widest" style={{ color: `rgba(${rgb},0.55)` }}>{label}</p>
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
  <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
    <SectionLabel id="01" label="About" {...CYAN} />

    <div className="grid lg:grid-cols-[1fr_270px] gap-6">
      {/* Bio */}
      <GlowCard {...CYAN} className="p-6">
        <div className="space-y-4 text-sm leading-7" style={{ color: "rgba(6,182,212,0.6)" }}>
          <p>
            <span className="font-mono" style={{ color: "#06b6d4" }}>$&nbsp;</span>
            <span className="text-white font-semibold">Rushil Varade</span> — cybersecurity graduate specializing in{" "}
            <span style={{ color: "#06b6d4" }}>IoT, Cybersecurity, and Blockchain</span>. Approach: understand attack surfaces before tools. Defense starts with attacker thinking.
          </p>
          <p>
            <span className="font-mono" style={{ color: "#06b6d4" }}>$&nbsp;</span>
            Pursuing <span className="text-white font-semibold">SOC Analyst</span> and <span className="text-white font-semibold">VAPT</span> roles. Focus: threat detection, vulnerability assessment, penetration testing, incident response. Built <span style={{ color: "#06b6d4" }} className="font-semibold">Cyber_World</span> — structured cybersecurity learning platform for beginners.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { t: "Ethical Hacking",   ...CYAN    },
              { t: "Network Defense",   ...VIOLET  },
              { t: "Digital Forensics", ...AMBER   },
              { t: "Incident Response", ...EMERALD },
              { t: "Threat Intel",      hex: "#ef4444", rgb: "239,68,68" },
              { t: "OSINT",             hex: "#a855f7", rgb: "168,85,247" },
            ].map(({ t, hex, rgb }) => (
              <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded border"
                style={{ background: `rgba(${rgb},0.08)`, borderColor: `rgba(${rgb},0.25)`, color: hex }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </GlowCard>

      {/* Config card */}
      <GlowCard {...CYAN} className="p-5">
        <p className="font-mono text-[10px] mb-3" style={{ color: "rgba(6,182,212,0.35)" }}># config.yml</p>
        <div className="space-y-2">
          {[
            { key: "location",  val: "India",                  icon: MapPin    },
            { key: "degree",    val: "B.E. CS",                icon: Sparkles  },
            { key: "graduated", val: "2025",                   icon: Calendar  },
            { key: "status",    val: "open_to_hire",           icon: Activity  },
            { key: "focus",     val: "SOC / VAPT / Forensics", icon: Shield    },
          ].map(({ key, val, icon: Icon }) => (
            <div key={key} className="flex items-center gap-2">
              <Icon size={10} style={{ color: "#06b6d4", flexShrink: 0 }} />
              <span className="font-mono text-[10px]" style={{ color: "rgba(6,182,212,0.4)" }}>{key}:</span>
              <span className="font-mono text-[10px]" style={{ color: "#06b6d4" }}>{val}</span>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  </m.section>
));
AboutSection.displayName = "AboutSection";

/* ══════════════════════════════════════
   SKILLS
══════════════════════════════════════ */
const SkillsSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
    <SectionLabel id="02" label="Skills" {...VIOLET} />

    {/* Domain grid — each with own color */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
      {DOMAINS.map(({ icon: Icon, label, hex, rgb }, i) => (
        <m.div key={label}
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.05 }}
          className="relative flex flex-col items-center gap-2 p-3.5 rounded-xl border cursor-default overflow-hidden transition-all duration-250"
          style={{ background: `rgba(${rgb},0.08)`, borderColor: `rgba(${rgb},0.18)`, backdropFilter: 'blur(6px)' }}
          whileHover={{ boxShadow: `0 0 22px rgba(${rgb},0.15)`, borderColor: `rgba(${rgb},0.4)` } as any}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.5), transparent)` }} />
          <div className="w-9 h-9 rounded-lg flex items-center justify-center border"
            style={{ background: `rgba(${rgb},0.1)`, borderColor: `rgba(${rgb},0.25)` }}>
            <Icon size={16} style={{ color: hex }} />
          </div>
          <span className="font-mono text-[10px] text-center leading-tight" style={{ color: hex }}>{label}</span>
        </m.div>
      ))}
    </div>

    {/* Skill group cards — each with own section color */}
    <div className="grid sm:grid-cols-2 gap-4">
      {SKILL_GROUPS.map(({ category, icon: Icon, color, items }, i) => (
        <m.div key={category}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.45 }}
          className="relative rounded-2xl border p-5 overflow-hidden transition-all duration-300"
          style={{ background: `rgba(${color.rgb},0.06)`, borderColor: `rgba(${color.rgb},0.18)`, backdropFilter: 'blur(10px)' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${color.rgb},0.38)`; el.style.boxShadow = `0 0 28px rgba(${color.rgb},0.09)`; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${color.rgb},0.18)`; el.style.boxShadow = "none"; }}>
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${color.rgb},0.55), transparent)` }} />
          {/* Left bar */}
          <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full" style={{ background: color.hex }} />

          <div className="flex items-center gap-2 mb-4 pl-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center border"
              style={{ background: `rgba(${color.rgb},0.12)`, borderColor: `rgba(${color.rgb},0.3)` }}>
              <Icon size={12} style={{ color: color.hex }} />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: color.hex }}>
              {category}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pl-3">
            {items.map((skill, j) => (
              <m.span key={skill}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 + j * 0.025 }}
                className="font-mono text-[11px] px-2.5 py-1 rounded-lg border cursor-default transition-all duration-150"
                style={{ background: `rgba(${color.rgb},0.07)`, borderColor: `rgba(${color.rgb},0.22)`, color: color.hex }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${color.rgb},0.15)`; el.style.borderColor = `rgba(${color.rgb},0.45)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${color.rgb},0.07)`; el.style.borderColor = `rgba(${color.rgb},0.22)`; }}>
                {skill}
              </m.span>
            ))}
          </div>
        </m.div>
      ))}
    </div>
  </m.section>
));
SkillsSection.displayName = "SkillsSection";

/* ══════════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════════ */
const CertificationsSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
    <SectionLabel id="03" label="Certifications" {...EMERALD} />

    <div className="grid sm:grid-cols-3 gap-4">
      {CERTIFICATIONS.map((cert, i) => (
        <m.div key={i}
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.12 }}
          className="relative p-5 rounded-2xl border cursor-default overflow-hidden transition-all duration-300"
          style={{ background: `rgba(${cert.rgb},0.08)`, borderColor: `rgba(${cert.rgb},0.2)`, backdropFilter: 'blur(10px)' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${cert.rgb},0.42)`; el.style.boxShadow = `0 0 28px rgba(${cert.rgb},0.12)`; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${cert.rgb},0.2)`; el.style.boxShadow = "none"; }}>
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${cert.rgb},0.65), transparent)` }} />
          {/* Left bar */}
          <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full" style={{ background: cert.hex }} />

          <div className="flex items-start justify-between gap-2 pl-3 mb-3">
            <span className="text-3xl">{cert.icon}</span>
            {cert.status === "completed" ? (
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wide"
                style={{ background: `rgba(${cert.rgb},0.12)`, borderColor: `rgba(${cert.rgb},0.4)`, color: cert.hex }}>
                ✓ Completed
              </span>
            ) : (
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wide"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}>
                ⏳ Pursuing
              </span>
            )}
          </div>
          <div className="pl-3">
            <p className="text-sm font-bold text-gray-100 leading-snug mb-1">{cert.name}</p>
            <p className="font-mono text-[10px]" style={{ color: cert.hex }}>issuer: {cert.issuer}</p>
          </div>
        </m.div>
      ))}
    </div>
  </m.section>
));
CertificationsSection.displayName = "CertificationsSection";

/* ══════════════════════════════════════
   PROJECTS
══════════════════════════════════════ */
const ProjectsSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
    <SectionLabel id="04" label="Projects" {...AMBER} />

    <div className="grid lg:grid-cols-3 gap-4">
      {PROJECTS.map(({ id, title, desc, impact, tags, icon: Icon, hex, rgb, status }, i) => (
        <m.div key={title}
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.45 }}
          className="group relative flex flex-col p-5 rounded-2xl border overflow-hidden transition-all duration-300"
          style={{ background: `rgba(${rgb},0.06)`, borderColor: `rgba(${rgb},0.18)`, backdropFilter: "blur(8px)" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${rgb},0.42)`; el.style.boxShadow = `0 0 35px rgba(${rgb},0.12)`; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${rgb},0.18)`; el.style.boxShadow = "none"; }}>
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.7), transparent)` }} />

          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{ background: `rgba(${rgb},0.12)`, borderColor: `rgba(${rgb},0.3)` }}>
                <Icon size={17} style={{ color: hex }} />
              </div>
              <span className="font-mono text-[10px]" style={{ color: `rgba(${rgb},0.5)` }}>project_{id}</span>
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded border"
              style={{ background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.3)", color: "#10b981" }}>
              ● {status}
            </span>
          </div>

          <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-blue-100 transition-colors">{title}</h3>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-3 flex-1 group-hover:text-gray-400 transition-colors">{desc}</p>

          {/* Impact chip */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg mb-4 w-fit"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <Zap size={9} style={{ color: "#10b981" }} />
            <span className="font-mono text-[10px]" style={{ color: "#10b981" }}>{impact}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 pt-3 border-t" style={{ borderColor: `rgba(${rgb},0.14)` }}>
            {tags.map(tag => (
              <span key={tag} className="font-mono text-[9px] px-2 py-0.5 rounded border"
                style={{ background: `rgba(${rgb},0.07)`, borderColor: `rgba(${rgb},0.2)`, color: hex }}>
                {tag}
              </span>
            ))}
            <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
              style={{ color: hex }} />
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
  <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
    <SectionLabel id="05" label="Education" hex="#a855f7" rgb="168,85,247" />

    <div className="relative pl-5 border-l" style={{ borderColor: "rgba(168,85,247,0.25)" }}>
      {/* Active dot */}
      <div className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full"
        style={{ background: "#a855f7", boxShadow: "0 0 10px #a855f7" }} />

      <m.div
        className="relative p-6 rounded-2xl border max-w-2xl overflow-hidden transition-all duration-300"
        style={{ background: "rgba(168,85,247,0.07)", borderColor: "rgba(168,85,247,0.18)", backdropFilter: "blur(10px)" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(168,85,247,0.38)"; el.style.boxShadow = "0 0 30px rgba(168,85,247,0.09)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(168,85,247,0.18)"; el.style.boxShadow = "none"; }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)" }} />

        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base font-bold text-white">Bachelor of Engineering — Computer Science</h3>
            <p className="font-mono text-[11px] mt-0.5" style={{ color: "#a855f7" }}>
              Smt. Indira Gandhi College of Engineering
            </p>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded-full border shrink-0"
            style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.3)", color: "#10b981" }}>
            <CheckCircle2 size={10} /> COMPLETED 🎓
          </span>
        </div>

        <p className="font-mono text-[11px] mb-3" style={{ color: "rgba(168,85,247,0.55)" }}>
          specialization: <span style={{ color: "#a855f7" }}>IoT · Cybersecurity · Blockchain</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "IoT",              hex: "#06b6d4", rgb: "6,182,212"   },
            { label: "Cybersecurity",    hex: "#8b5cf6", rgb: "139,92,246"  },
            { label: "Blockchain",       hex: "#f59e0b", rgb: "245,158,11"  },
            { label: "Networking",       hex: "#10b981", rgb: "16,185,129"  },
            { label: "Computer Science", hex: "#a855f7", rgb: "168,85,247"  },
          ].map(({ label, hex, rgb }) => (
            <span key={label} className="font-mono text-[10px] px-2.5 py-1 rounded-lg border"
              style={{ background: `rgba(${rgb},0.08)`, borderColor: `rgba(${rgb},0.25)`, color: hex }}>
              {label}
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
  <m.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.5 }}
    className="py-16 text-center">

    {/* Prompt */}
    <p className="font-mono text-xs mb-3" style={{ color: "rgba(6,182,212,0.4)" }}>
      <span style={{ color: "#06b6d4" }}>root@cyber</span>
      <span style={{ color: "rgba(6,182,212,0.35)" }}>:~$&nbsp;</span>
      <span style={{ color: "#06b6d4" }}>./connect --target=recruiter --mode=hire</span>
    </p>

    <h2 className="font-mono font-black mb-3"
      style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", color: "#06b6d4", textShadow: "0 0 50px rgba(6,182,212,0.3)" }}>
      LET'S CONNECT
    </h2>
    <p className="text-sm text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
      Fresh graduate seeking{" "}
      <span style={{ color: "#06b6d4" }} className="font-semibold">SOC Analyst</span> &amp;{" "}
      <span style={{ color: "#8b5cf6" }} className="font-semibold">VAPT</span> roles —
      internships · contracts · full-time. I respond quickly.
    </p>

    <div className="flex flex-wrap justify-center gap-3">
      {[
        { label: "./send_email",   href: "mailto:rushilvarade@gmail.com",             icon: Mail,     hex: "#06b6d4", rgb: "6,182,212",   primary: true,  dl: false },
        { label: "./linkedin",     href: "https://www.linkedin.com/in/rushil-varade", icon: Linkedin, hex: "#8b5cf6", rgb: "139,92,246",  primary: false, dl: false },
        { label: "./github",       href: "https://github.com/rushilvarade1405",        icon: Github,   hex: "#f59e0b", rgb: "245,158,11",  primary: false, dl: false },
        { label: "./get_resume",   href: "/RushilVarade_Resume.pdf",                   icon: FileDown, hex: "#10b981", rgb: "16,185,129",  primary: false, dl: true  },
      ].map(({ label, href, icon: Icon, hex, rgb, primary, dl }) => (
        <a key={label} href={href}
          {...(dl ? { download: true } : {})}
          {...(!href.startsWith("mailto") && !dl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm font-bold border transition-all duration-200"
          style={{
            background: `rgba(${rgb},${primary ? "0.12" : "0.06"})`,
            borderColor: `rgba(${rgb},${primary ? "0.5" : "0.22"})`,
            color: hex,
            boxShadow: primary ? `0 0 20px rgba(${rgb},0.14)` : "none",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${rgb},0.18)`; el.style.borderColor = `rgba(${rgb},0.55)`; el.style.boxShadow = `0 0 24px rgba(${rgb},0.18)`; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${rgb},${primary ? "0.12" : "0.06"})`; el.style.borderColor = `rgba(${rgb},${primary ? "0.5" : "0.22"})`; el.style.boxShadow = primary ? `0 0 20px rgba(${rgb},0.14)` : "none"; }}>
          <Icon size={14} />{label}
        </a>
      ))}
    </div>

    <p className="mt-20 font-mono text-[10px] select-none" style={{ color: "rgba(6,182,212,0.15)" }}>
      // rushil.varade · cybersecurity · 2025 · all rights reserved
    </p>
  </m.section>
));
ContactSection.displayName = "ContactSection";

/* ══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
export default function PortfolioCVSection() {
  return (
    <LazyMotion features={domAnimation} strict>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        .hk * { font-family: 'IBM Plex Mono', monospace; }
        .hk h1,.hk h2,.hk h3 { font-family: 'IBM Plex Mono', monospace !important; }
        .hk ::selection { background: rgba(6,182,212,0.25); color: #06b6d4; }
        .hk ::-webkit-scrollbar { width: 4px; }
        .hk ::-webkit-scrollbar-track { background: transparent; }
        .hk ::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.3); border-radius: 2px; }
      `}</style>

      <main className="hk relative min-h-screen overflow-hidden"
        style={{ background: "transparent", color: "rgba(6,182,212,0.6)" }}>

        {/* Dark overlay — keeps text readable over matrix rain */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0"
          style={{ background: "rgba(2,6,14,0.72)" }} />
        {/* Scanlines — subtle CRT texture */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
          <Hero />
          <Divider />
          <AboutSection />
          <Divider />
          <SkillsSection />
          <Divider />
          <CertificationsSection />
          <Divider />
          <ProjectsSection />
          <Divider />
          <EducationSection />
          <Divider />
          <ContactSection />
        </div>
      </main>
    </LazyMotion>
  );
}