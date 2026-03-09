import { useState, useEffect, useRef, memo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Shield, Lock, Terminal, FileDown, Cpu, Wifi, Code2,
  CheckCircle2, Mail, Database, Server, Globe, Layers,
  Zap, BookOpen, Linkedin, Github,
  Eye, Search, AlertTriangle, ChevronRight, Activity,
  MapPin, Calendar, Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════
   DESIGN SYSTEM
   Background : #000000 pure black
   Primary    : #00ff41  matrix green
   Accent     : #00d4ff  electric cyan
   Font       : Share Tech Mono (hacker-perfect)
═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   MATRIX RAIN CANVAS
═══════════════════════════════════════════ */
const MatrixRain = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FONT_SIZE = 14;
    const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*<>?[]{}|~";
    const cols = () => Math.floor(canvas.width / FONT_SIZE);
    let drops: number[] = Array(cols()).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;

      const c = cols();
      if (drops.length !== c) drops = Array(c).fill(1);

      for (let i = 0; i < c; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        const brightness = Math.random();

        if (brightness > 0.96) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#00ff41";
          ctx.shadowBlur = 10;
        } else if (brightness > 0.8) {
          ctx.fillStyle = "#00ff9d";
          ctx.shadowColor = "#00ff9d";
          ctx.shadowBlur = 4;
        } else if (brightness > 0.5) {
          ctx.fillStyle = "#00ff41";
          ctx.shadowColor = "#00ff41";
          ctx.shadowBlur = 2;
        } else {
          ctx.fillStyle = "rgba(0,255,65,0.35)";
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.22 }}
    />
  );
});
MatrixRain.displayName = "MatrixRain";

/* ═══════════════════════════════════════════
   GLITCH TEXT
═══════════════════════════════════════════ */
const GlitchText = memo(({ text, className = "", style = {} }: { text: string; className?: string; style?: React.CSSProperties }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const cycle = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 140);
      setTimeout(cycle, 3500 + Math.random() * 6000);
    };
    const t = setTimeout(cycle, 1500 + Math.random() * 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className={`relative inline-block ${className}`} style={style}>
      {text}
      {glitch && (
        <>
          <span className="absolute inset-0 text-red-500 opacity-70" style={{ transform: "translate(-3px, 1px)", clipPath: "inset(0 0 55% 0)" }}>{text}</span>
          <span className="absolute inset-0 opacity-70" style={{ transform: "translate(3px, -1px)", clipPath: "inset(55% 0 0 0)", color: "#00d4ff" }}>{text}</span>
        </>
      )}
    </span>
  );
});
GlitchText.displayName = "GlitchText";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/rushilvarade1405",        label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rushil-varade",  label: "LinkedIn" },
  { icon: Mail,     href: "mailto:rushilvarade@gmail.com",              label: "Email"    },
] as const;

const TERM_LINES = [
  "> whoami",
  "rushil_varade",
  "> cat roles.txt",
  "SOC_Analyst | VAPT | Digital_Forensics",
  "> cat status.txt",
  "B.E. CS — COMPLETED ✓  | Open_to_Hire ✓",
  "> nmap -sV recruiter.local",
  "PORT 443 — OPPORTUNITY DETECTED ✓",
  "> sudo hire rushil_varade",
  "[SUDO] permission granted ✓",
] as const;

const SKILL_GROUPS = [
  { category: "Languages",         icon: Code2,  color: { hex: "#00d4ff", rgb: "0,212,255"  }, items: ["Python", "SQL", "PowerShell", "Bash"] },
  { category: "Operating Systems", icon: Server, color: { hex: "#b060ff", rgb: "176,96,255" }, items: ["Kali Linux", "Ubuntu", "Windows Server", "macOS"] },
  { category: "Networking",        icon: Wifi,   color: { hex: "#ffb700", rgb: "255,183,0"  }, items: ["TCP/UDP", "OSI Model", "DNS", "DHCP", "VPN", "Firewall", "IDS/IPS"] },
  { category: "Security Tools",    icon: Shield, color: { hex: "#00ff9d", rgb: "0,255,157"  }, items: ["Nmap", "Wireshark", "Burp Suite", "Metasploit", "SQLMap", "Nessus", "Maltego", "OSINT", "OWASP Top 10"] },
] as const;

const DOMAINS = [
  { icon: Shield,        label: "Penetration Testing", hex: "#00d4ff", rgb: "0,212,255"   },
  { icon: Eye,           label: "SOC Operations",      hex: "#b060ff", rgb: "176,96,255"  },
  { icon: Search,        label: "VAPT",                hex: "#ffb700", rgb: "255,183,0"   },
  { icon: Lock,          label: "Cryptography",        hex: "#00ff9d", rgb: "0,255,157"   },
  { icon: Terminal,      label: "Linux / CLI",         hex: "#ff3131", rgb: "255,49,49"   },
  { icon: Cpu,           label: "Blockchain Security", hex: "#b060ff", rgb: "176,96,255"  },
  { icon: Database,      label: "Digital Forensics",   hex: "#00d4ff", rgb: "0,212,255"   },
  { icon: AlertTriangle, label: "Threat Detection",    hex: "#ffb700", rgb: "255,183,0"   },
] as const;

const CERTIFICATIONS = [
  { name: "Specialization in Penetration Testing", issuer: "ENCRYTECL", icon: "🎯", hex: "#00d4ff", rgb: "0,212,255",   status: "pursuing"  },
  { name: "Certified Ethical Hacker (CEH)",         issuer: "EC-Council", icon: "🛡️", hex: "#b060ff", rgb: "176,96,255",  status: "pursuing"  },
  { name: "Cybersecurity Fundamentals",             issuer: "ENCRYTECL", icon: "🔐", hex: "#00ff9d", rgb: "0,255,157",   status: "completed" },
];

const PROJECTS = [
  {
    id: "01", title: "Document Summarization Tool",
    desc: "AI-powered tool that ingests large documents and produces concise, structured summaries using NLP pipelines and transformer-based models.",
    impact: "Cuts review time by ~70%",
    tags: ["Python", "NLP", "AI", "Automation"],
    icon: BookOpen, hex: "#00d4ff", rgb: "0,212,255", status: "LIVE",
  },
  {
    id: "02", title: "Image Steganography Tool",
    desc: "Encodes and decodes hidden messages within image files using LSB manipulation for covert communication research.",
    impact: "Undetectable to standard scanners",
    tags: ["Python", "Cryptography", "Steganography"],
    icon: Layers, hex: "#ffb700", rgb: "255,183,0", status: "LIVE",
  },
  {
    id: "03", title: "Cyber_World Platform",
    desc: "Full-stack cybersecurity education platform covering Linux, networking, tools, blockchain, cryptography, and cyber laws for beginners.",
    impact: "End-to-end learning path",
    tags: ["React", "TypeScript", "Tailwind"],
    icon: Globe, hex: "#b060ff", rgb: "176,96,255", status: "LIVE",
  },
] as const;

const STATS = [
  { label: "Tools Built",  value: "10+",  hex: "#00ff41", rgb: "0,255,65"   },
  { label: "Projects",     value: "3+",   hex: "#00d4ff", rgb: "0,212,255"  },
  { label: "Domains",      value: "8",    hex: "#ffb700", rgb: "255,183,0"  },
  { label: "Degree",       value: "B.E.", hex: "#00ff9d", rgb: "0,255,157"  },
] as const;

/* ═══════════════════════════════════════════
   TYPING HOOK
═══════════════════════════════════════════ */
function useTyping(lines: readonly string[], speed = 36): string {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let li = 0, ci = 0, cur = "";
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (li >= lines.length) return;
      if (ci < lines[li].length) {
        cur += lines[li][ci++];
        setOutput(cur);
        t = setTimeout(tick, speed + Math.random() * 18);
      } else {
        cur += "\n";
        ci = 0;
        li++;
        setOutput(cur);
        t = setTimeout(tick, 280);
      }
    };
    t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return output;
}

/* ═══════════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════════ */
const SectionLabel = memo(({ id, label, hex, rgb }: { id: string; label: string; hex: string; rgb: string }) => (
  <div className="flex items-center gap-3 mb-10 select-none">
    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border"
      style={{ background: `rgba(${rgb},0.1)`, borderColor: `rgba(${rgb},0.5)`, color: hex, boxShadow: `0 0 8px rgba(${rgb},0.2)` }}>
      [{id}]
    </span>
    <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase" style={{ color: hex, textShadow: `0 0 14px ${hex}` }}>
      {label}
    </span>
    <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, rgba(${rgb},0.7), transparent)` }} />
    <span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.35)` }}>EOF</span>
    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: hex, boxShadow: `0 0 10px ${hex}, 0 0 20px ${hex}` }} />
  </div>
));
SectionLabel.displayName = "SectionLabel";

/* ═══════════════════════════════════════════
   CYBER CARD (corner brackets style)
═══════════════════════════════════════════ */
const CyberCard = memo(({
  children, hex, rgb, className = "",
}: { children: React.ReactNode; hex: string; rgb: string; className?: string }) => (
  <div
    className={`relative rounded-sm overflow-hidden transition-all duration-300 ${className}`}
    style={{
      background: "rgba(0,0,0,0.88)",
      border: `1px solid rgba(${rgb},0.18)`,
      backdropFilter: "blur(10px)",
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = `rgba(${rgb},0.5)`;
      el.style.boxShadow = `0 0 30px rgba(${rgb},0.12), inset 0 0 30px rgba(${rgb},0.02)`;
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = `rgba(${rgb},0.18)`;
      el.style.boxShadow = "none";
    }}>
    {/* Top shimmer */}
    <div className="absolute top-0 left-0 right-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }} />
    {/* Corner brackets */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: hex }} />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: hex }} />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: `rgba(${rgb},0.35)` }} />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: `rgba(${rgb},0.35)` }} />
    {children}
  </div>
));
CyberCard.displayName = "CyberCard";

/* ═══════════════════════════════════════════
   DIVIDER
═══════════════════════════════════════════ */
const Divider = memo(() => (
  <div className="relative my-20 flex items-center gap-3">
    <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.3))" }} />
    <span className="font-mono text-[9px]" style={{ color: "rgba(0,255,65,0.3)" }}>* ──────</span>
    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00ff41", boxShadow: "0 0 8px #00ff41" }} />
    <span className="font-mono text-[9px]" style={{ color: "rgba(0,255,65,0.3)" }}>────── */</span>
    <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,255,65,0.3), transparent)" }} />
  </div>
));
Divider.displayName = "Divider";

/* ═══════════════════════════════════════════
   HERO
═══════════════════════════════════════════ */
const Hero = memo(() => {
  const typed = useTyping(TERM_LINES);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center pt-24 pb-10">
      <div className="relative z-10 grid lg:grid-cols-[1fr_480px] gap-16 items-center">

        {/* LEFT */}
        <div>
          {/* Kali prompt header */}
          <m.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="font-mono text-[11px] mb-2 flex items-center gap-1">
            <span style={{ color: "#00ff41" }}>┌──(</span>
            <span style={{ color: "#00d4ff" }}>root㉿kali</span>
            <span style={{ color: "#00ff41" }}>)-[~/portfolio]</span>
          </m.p>
          <m.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="font-mono text-[11px] mb-7 flex items-center gap-1">
            <span style={{ color: "#00ff41" }}>└─$&nbsp;</span>
            <span style={{ color: "#00d4ff" }}>./portfolio.sh --mode=recruiter</span>
            <span className="ml-1 animate-pulse" style={{ color: "#00ff41" }}>█</span>
          </m.p>

          {/* Name */}
          <m.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <h1 className="font-mono font-black leading-none"
              style={{
                fontSize: "clamp(3.6rem,9vw,7.5rem)",
                color: "#00ff41",
                textShadow: "0 0 20px #00ff41, 0 0 60px rgba(0,255,65,0.25), 0 0 100px rgba(0,255,65,0.1)",
                letterSpacing: "-0.01em",
              }}>
              <GlitchText text="RUSHIL" />
            </h1>
            <h1 className="font-mono font-black leading-none mb-8"
              style={{
                fontSize: "clamp(3.6rem,9vw,7.5rem)",
                color: "#00d4ff",
                textShadow: "0 0 20px #00d4ff, 0 0 60px rgba(0,212,255,0.25), 0 0 100px rgba(0,212,255,0.1)",
                letterSpacing: "-0.01em",
              }}>
              <GlitchText text="VARADE" />
            </h1>
          </m.div>

          {/* Role chips */}
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-2 mb-5">
            {[
              { label: "[SOC_Analyst]", hex: "#00ff41", rgb: "0,255,65"   },
              { label: "[VAPT]",        hex: "#00d4ff", rgb: "0,212,255"  },
              { label: "[Forensics]",   hex: "#ffb700", rgb: "255,183,0"  },
              { label: "[Grad_2025]",   hex: "#00ff9d", rgb: "0,255,157"  },
            ].map(({ label, hex, rgb }) => (
              <span key={label} className="font-mono text-[11px] px-3 py-1 rounded-sm border font-bold transition-all duration-200 cursor-default"
                style={{
                  background: `rgba(${rgb},0.08)`,
                  borderColor: `rgba(${rgb},0.5)`,
                  color: hex,
                  textShadow: `0 0 8px ${hex}`,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${rgb},0.15)`; el.style.boxShadow = `0 0 14px rgba(${rgb},0.25)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${rgb},0.08)`; el.style.boxShadow = "none"; }}>
                {label}
              </span>
            ))}
          </m.div>

          {/* Comment */}
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
            className="font-mono text-[11px] mb-7" style={{ color: "rgba(0,255,65,0.3)" }}>
            <span style={{ color: "rgba(0,255,65,0.5)" }}>#</span> B.E. CS · IoT · Cybersecurity · Blockchain · Smt. Indira Gandhi College of Engineering
          </m.p>

          {/* Status flags */}
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-8">
            <span className="font-mono text-[11px] px-3 py-1 rounded-sm border flex items-center gap-2"
              style={{
                background: "rgba(0,255,65,0.06)",
                borderColor: "rgba(0,255,65,0.55)",
                color: "#00ff41",
                boxShadow: "0 0 14px rgba(0,255,65,0.1), inset 0 0 10px rgba(0,255,65,0.03)",
              }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41" }} />
              OPEN_TO_HIRE
            </span>
            <span className="font-mono text-[11px] px-3 py-1 rounded-sm border flex items-center gap-1.5"
              style={{ background: "rgba(0,0,0,0.5)", borderColor: "rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.55)" }}>
              <MapPin size={10} /> India
            </span>
            <span className="font-mono text-[11px] px-3 py-1 rounded-sm border flex items-center gap-1.5"
              style={{ background: "rgba(0,0,0,0.5)", borderColor: "rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.55)" }}>
              <Calendar size={10} /> Class_of_2025
            </span>
          </m.div>

          {/* CTAs */}
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
            className="flex flex-wrap gap-3 mb-8">
            <a href="/RushilVarade_Resume.pdf" download
              className="group flex items-center gap-2.5 px-6 py-3 rounded-sm font-mono text-sm font-bold border transition-all duration-200"
              style={{
                background: "rgba(0,255,65,0.1)",
                borderColor: "#00ff41",
                color: "#00ff41",
                boxShadow: "0 0 20px rgba(0,255,65,0.15), inset 0 0 20px rgba(0,255,65,0.03)",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(0,255,65,0.2)"; el.style.boxShadow = "0 0 40px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(0,255,65,0.1)"; el.style.boxShadow = "0 0 20px rgba(0,255,65,0.15), inset 0 0 20px rgba(0,255,65,0.03)"; }}>
              <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              ./download_resume.sh
            </a>
            <a href="mailto:rushilvarade@gmail.com"
              className="flex items-center gap-2.5 px-6 py-3 rounded-sm font-mono text-sm border transition-all duration-200"
              style={{ background: "rgba(0,0,0,0.6)", borderColor: "rgba(0,212,255,0.3)", color: "rgba(0,212,255,0.6)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#00d4ff"; el.style.color = "#00d4ff"; el.style.boxShadow = "0 0 20px rgba(0,212,255,0.2)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,212,255,0.3)"; el.style.color = "rgba(0,212,255,0.6)"; el.style.boxShadow = "none"; }}>
              <Mail className="w-4 h-4" /> ./contact_me.sh
            </a>
          </m.div>

          {/* Socials */}
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-sm flex items-center justify-center border transition-all duration-200"
                style={{ background: "rgba(0,0,0,0.7)", borderColor: "rgba(0,255,65,0.2)", color: "rgba(0,255,65,0.4)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#00ff41"; el.style.color = "#00ff41"; el.style.boxShadow = "0 0 15px rgba(0,255,65,0.3)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,65,0.2)"; el.style.color = "rgba(0,255,65,0.4)"; el.style.boxShadow = "none"; }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </m.div>
        </div>

        {/* RIGHT — Terminal */}
        <m.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.7 }}
          className="hidden lg:flex flex-col gap-3">
          <div className="rounded-sm overflow-hidden"
            style={{
              background: "rgba(0,0,0,0.95)",
              border: "1px solid rgba(0,255,65,0.3)",
              boxShadow: "0 0 60px rgba(0,255,65,0.06), 0 0 120px rgba(0,255,65,0.03)",
            }}>
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b"
              style={{ background: "rgba(0,255,65,0.03)", borderColor: "rgba(0,255,65,0.12)" }}>
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff3131", boxShadow: "0 0 6px #ff3131" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#ffb700", boxShadow: "0 0 6px #ffb700" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41" }} />
              <span className="ml-3 font-mono text-[10px] flex-1" style={{ color: "rgba(0,255,65,0.35)" }}>
                ┌──(root㉿kali)-[~/portfolio] — bash
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm border"
                style={{ borderColor: "rgba(0,255,65,0.2)", color: "rgba(0,255,65,0.3)" }}>zsh</span>
            </div>
            {/* Output */}
            <div className="p-5 font-mono text-[13px] min-h-[280px] whitespace-pre-wrap leading-[1.85]">
              {typed.split("\n").map((line, i) => {
                const isCmd  = line.startsWith(">");
                const isGood = line.startsWith("[SUDO]") || line.startsWith("PORT") || line.includes("✓");
                return (
                  <div key={i} style={{
                    color: isCmd ? "#00d4ff" : isGood ? "#00ff9d" : "rgba(0,255,65,0.75)",
                    textShadow: isCmd ? "0 0 8px #00d4ff" : isGood ? "0 0 6px #00ff9d" : "0 0 4px rgba(0,255,65,0.3)",
                  }}>
                    {isCmd && <span style={{ color: "rgba(0,255,65,0.35)" }}>└─$ </span>}
                    {line}
                  </div>
                );
              })}
              <span className="inline-block w-2.5 h-[13px] animate-pulse"
                style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41", verticalAlign: "middle" }} />
            </div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-4 gap-2">
            {STATS.map(({ label, value, hex, rgb }) => (
              <div key={label} className="p-3 rounded-sm border text-center transition-all duration-200 cursor-default"
                style={{ background: "rgba(0,0,0,0.85)", borderColor: `rgba(${rgb},0.25)` }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = hex; el.style.boxShadow = `0 0 16px rgba(${rgb},0.2)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${rgb},0.25)`; el.style.boxShadow = "none"; }}>
                <p className="font-mono text-xl font-black" style={{ color: hex, textShadow: `0 0 12px ${hex}` }}>{value}</p>
                <p className="font-mono text-[8px] mt-0.5 uppercase tracking-widest" style={{ color: `rgba(${rgb},0.45)` }}>{label}</p>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

/* ═══════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════ */
const AboutSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }}>
    <SectionLabel id="01" label="About" hex="#00ff41" rgb="0,255,65" />

    <div className="grid lg:grid-cols-[1fr_260px] gap-5">
      <CyberCard hex="#00ff41" rgb="0,255,65" className="p-6">
        <div className="space-y-4 text-[13px] leading-7" style={{ color: "rgba(0,255,65,0.55)" }}>
          <p>
            <span className="font-mono" style={{ color: "#00d4ff" }}>$&nbsp;</span>
            <span className="text-white font-semibold">Rushil Varade</span>{" "}
            — cybersecurity graduate specializing in{" "}
            <span style={{ color: "#00ff41" }}>IoT, Cybersecurity, and Blockchain</span>.
            Approach: understand attack surfaces before tools. Defense starts with attacker thinking.
          </p>
          <p>
            <span className="font-mono" style={{ color: "#00d4ff" }}>$&nbsp;</span>
            Pursuing <span className="text-white font-semibold">SOC Analyst</span> and{" "}
            <span className="text-white font-semibold">VAPT</span> roles.
            Focus: threat detection, vulnerability assessment, penetration testing, incident response.
            Built <span style={{ color: "#00d4ff" }} className="font-semibold">Cyber_World</span> — structured cybersecurity learning platform.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {[
              { t: "Ethical_Hacking",   hex: "#00ff41", rgb: "0,255,65"   },
              { t: "Network_Defense",   hex: "#00d4ff", rgb: "0,212,255"  },
              { t: "Digital_Forensics", hex: "#ffb700", rgb: "255,183,0"  },
              { t: "Incident_Response", hex: "#00ff9d", rgb: "0,255,157"  },
              { t: "Threat_Intel",      hex: "#ff3131", rgb: "255,49,49"  },
              { t: "OSINT",             hex: "#b060ff", rgb: "176,96,255" },
            ].map(({ t, hex, rgb }) => (
              <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-sm border cursor-default transition-all duration-200"
                style={{ background: `rgba(${rgb},0.07)`, borderColor: `rgba(${rgb},0.35)`, color: hex }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${rgb},0.15)`; el.style.boxShadow = `0 0 10px rgba(${rgb},0.2)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${rgb},0.07)`; el.style.boxShadow = "none"; }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </CyberCard>

      <CyberCard hex="#00d4ff" rgb="0,212,255" className="p-5">
        <p className="font-mono text-[9px] mb-4" style={{ color: "rgba(0,212,255,0.35)" }}>
          <span style={{ color: "#00d4ff" }}># </span>config.yml
        </p>
        <div className="space-y-2.5">
          {[
            { key: "location",  val: "India",              icon: MapPin    },
            { key: "degree",    val: "B.E. CS",            icon: Sparkles  },
            { key: "graduated", val: "2025",               icon: Calendar  },
            { key: "status",    val: "open_to_hire",       icon: Activity  },
            { key: "focus",     val: "SOC/VAPT/Forensics", icon: Shield    },
          ].map(({ key, val, icon: Icon }) => (
            <div key={key} className="flex items-center gap-2.5">
              <Icon size={10} style={{ color: "#00d4ff", flexShrink: 0 }} />
              <span className="font-mono text-[10px]" style={{ color: "rgba(0,212,255,0.4)" }}>{key}:</span>
              <span className="font-mono text-[10px]" style={{ color: "#00d4ff" }}>{val}</span>
            </div>
          ))}
        </div>
      </CyberCard>
    </div>
  </m.section>
));
AboutSection.displayName = "AboutSection";

/* ═══════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════ */
const SkillsSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }}>
    <SectionLabel id="02" label="Skills" hex="#00d4ff" rgb="0,212,255" />

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
      {DOMAINS.map(({ icon: Icon, label, hex, rgb }, i) => (
        <m.div key={label}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.05 }}
          className="relative flex flex-col items-center gap-2.5 p-4 rounded-sm cursor-default overflow-hidden transition-all duration-250"
          style={{ background: "rgba(0,0,0,0.85)", border: `1px solid rgba(${rgb},0.2)` }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = hex;
            el.style.boxShadow = `0 0 22px rgba(${rgb},0.2), inset 0 0 22px rgba(${rgb},0.03)`;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = `rgba(${rgb},0.2)`;
            el.style.boxShadow = "none";
          }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }} />
          <div className="w-10 h-10 rounded-sm flex items-center justify-center border"
            style={{ background: `rgba(${rgb},0.08)`, borderColor: `rgba(${rgb},0.3)` }}>
            <Icon size={18} style={{ color: hex, filter: `drop-shadow(0 0 5px ${hex})` }} />
          </div>
          <span className="font-mono text-[10px] text-center leading-tight" style={{ color: hex }}>{label}</span>
        </m.div>
      ))}
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
      {SKILL_GROUPS.map(({ category, icon: Icon, color, items }, i) => (
        <m.div key={category}
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
          className="relative rounded-sm p-5 overflow-hidden transition-all duration-300"
          style={{ background: "rgba(0,0,0,0.88)", border: `1px solid rgba(${color.rgb},0.2)` }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${color.rgb},0.5)`; el.style.boxShadow = `0 0 26px rgba(${color.rgb},0.1)`; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${color.rgb},0.2)`; el.style.boxShadow = "none"; }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${color.hex}, transparent)` }} />
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: `linear-gradient(180deg, ${color.hex}, transparent)` }} />
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: color.hex }} />

          <div className="flex items-center gap-2.5 mb-4 pl-4">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center border"
              style={{ background: `rgba(${color.rgb},0.1)`, borderColor: `rgba(${color.rgb},0.35)` }}>
              <Icon size={13} style={{ color: color.hex, filter: `drop-shadow(0 0 4px ${color.hex})` }} />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ color: color.hex, textShadow: `0 0 8px ${color.hex}` }}>
              {category}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pl-4">
            {items.map((skill, j) => (
              <m.span key={skill}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 + j * 0.03 }}
                className="font-mono text-[11px] px-2.5 py-1 rounded-sm border cursor-default transition-all duration-150"
                style={{ background: `rgba(${color.rgb},0.06)`, borderColor: `rgba(${color.rgb},0.25)`, color: color.hex }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${color.rgb},0.15)`; el.style.borderColor = color.hex; el.style.boxShadow = `0 0 10px rgba(${color.rgb},0.2)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${color.rgb},0.06)`; el.style.borderColor = `rgba(${color.rgb},0.25)`; el.style.boxShadow = "none"; }}>
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

/* ═══════════════════════════════════════════
   CERTIFICATIONS
═══════════════════════════════════════════ */
const CertificationsSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }}>
    <SectionLabel id="03" label="Certifications" hex="#00ff9d" rgb="0,255,157" />

    <div className="grid sm:grid-cols-3 gap-4">
      {CERTIFICATIONS.map((cert, i) => (
        <m.div key={i}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.13 }}
          className="relative p-5 rounded-sm cursor-default overflow-hidden transition-all duration-300"
          style={{ background: "rgba(0,0,0,0.88)", border: `1px solid rgba(${cert.rgb},0.2)` }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = cert.hex; el.style.boxShadow = `0 0 28px rgba(${cert.rgb},0.15)`; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${cert.rgb},0.2)`; el.style.boxShadow = "none"; }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${cert.hex}, transparent)` }} />
          <div className="absolute left-0 top-0 bottom-0 w-0.5"
            style={{ background: `linear-gradient(180deg, ${cert.hex}, transparent)` }} />
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: cert.hex }} />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: cert.hex }} />

          <div className="flex items-start justify-between gap-2 pl-3 mb-4">
            <span className="text-3xl">{cert.icon}</span>
            {cert.status === "completed" ? (
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm border flex items-center gap-1"
                style={{ background: `rgba(${cert.rgb},0.1)`, borderColor: cert.hex, color: cert.hex, boxShadow: `0 0 8px rgba(${cert.rgb},0.2)` }}>
                <CheckCircle2 size={9} /> COMPLETED
              </span>
            ) : (
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm border"
                style={{ background: "rgba(255,183,0,0.08)", borderColor: "rgba(255,183,0,0.35)", color: "#ffb700" }}>
                ⏳ PURSUING
              </span>
            )}
          </div>
          <div className="pl-3">
            <p className="text-sm font-bold text-white leading-snug mb-2">{cert.name}</p>
            <p className="font-mono text-[10px]" style={{ color: cert.hex }}>issuer: {cert.issuer}</p>
          </div>
        </m.div>
      ))}
    </div>
  </m.section>
));
CertificationsSection.displayName = "CertificationsSection";

/* ═══════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════ */
const ProjectsSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }}>
    <SectionLabel id="04" label="Projects" hex="#ffb700" rgb="255,183,0" />

    <div className="grid lg:grid-cols-3 gap-4">
      {PROJECTS.map(({ id, title, desc, impact, tags, icon: Icon, hex, rgb, status }, i) => (
        <m.div key={title}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.13, duration: 0.5 }}
          className="group relative flex flex-col p-5 rounded-sm overflow-hidden transition-all duration-300"
          style={{ background: "rgba(0,0,0,0.88)", border: `1px solid rgba(${rgb},0.2)` }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = hex; el.style.boxShadow = `0 0 35px rgba(${rgb},0.15), inset 0 0 35px rgba(${rgb},0.02)`; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `rgba(${rgb},0.2)`; el.style.boxShadow = "none"; }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }} />
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: hex }} />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: hex }} />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l opacity-30" style={{ borderColor: hex }} />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r opacity-30" style={{ borderColor: hex }} />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-sm flex items-center justify-center border"
                style={{ background: `rgba(${rgb},0.1)`, borderColor: `rgba(${rgb},0.4)` }}>
                <Icon size={16} style={{ color: hex, filter: `drop-shadow(0 0 5px ${hex})` }} />
              </div>
              <span className="font-mono text-[10px]" style={{ color: `rgba(${rgb},0.45)` }}>proj_{id}.sh</span>
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm border flex items-center gap-1"
              style={{ background: "rgba(0,255,65,0.07)", borderColor: "rgba(0,255,65,0.4)", color: "#00ff41" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ff41", boxShadow: "0 0 4px #00ff41" }} />
              {status}
            </span>
          </div>

          <h3 className="font-mono text-sm font-bold text-white mb-2 leading-snug">{title}</h3>
          <p className="text-[11px] leading-relaxed mb-3 flex-1" style={{ color: "rgba(255,255,255,0.38)" }}>{desc}</p>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm mb-4 w-fit"
            style={{ background: "rgba(0,255,65,0.06)", border: "1px solid rgba(0,255,65,0.2)" }}>
            <Zap size={9} style={{ color: "#00ff41" }} />
            <span className="font-mono text-[10px]" style={{ color: "#00ff41" }}>{impact}</span>
          </div>

          <div className="flex flex-wrap gap-1 pt-3 border-t" style={{ borderColor: `rgba(${rgb},0.12)` }}>
            {tags.map(tag => (
              <span key={tag} className="font-mono text-[9px] px-2 py-0.5 rounded-sm border"
                style={{ background: `rgba(${rgb},0.06)`, borderColor: `rgba(${rgb},0.25)`, color: hex }}>
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

/* ═══════════════════════════════════════════
   EDUCATION
═══════════════════════════════════════════ */
const EducationSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55 }}>
    <SectionLabel id="05" label="Education" hex="#b060ff" rgb="176,96,255" />

    <div className="relative pl-6 border-l" style={{ borderColor: "rgba(176,96,255,0.25)" }}>
      <div className="absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full"
        style={{ background: "#b060ff", boxShadow: "0 0 12px #b060ff, 0 0 24px rgba(176,96,255,0.4)" }} />

      <m.div
        className="relative p-6 rounded-sm max-w-2xl overflow-hidden transition-all duration-300"
        style={{ background: "rgba(0,0,0,0.88)", border: "1px solid rgba(176,96,255,0.2)" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#b060ff"; el.style.boxShadow = "0 0 30px rgba(176,96,255,0.12)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(176,96,255,0.2)"; el.style.boxShadow = "none"; }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #b060ff, transparent)" }} />
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: "#b060ff" }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: "#b060ff" }} />

        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-mono text-base font-bold text-white">Bachelor of Engineering — Computer Science</h3>
            <p className="font-mono text-[11px] mt-1" style={{ color: "#b060ff", textShadow: "0 0 8px #b060ff" }}>
              Smt. Indira Gandhi College of Engineering
            </p>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded-sm border shrink-0"
            style={{ background: "rgba(0,255,65,0.08)", borderColor: "rgba(0,255,65,0.4)", color: "#00ff41", boxShadow: "0 0 10px rgba(0,255,65,0.1)" }}>
            <CheckCircle2 size={10} /> COMPLETED 🎓
          </span>
        </div>
        <p className="font-mono text-[11px] mb-4" style={{ color: "rgba(176,96,255,0.5)" }}>
          <span style={{ color: "#b060ff" }}># </span>
          specialization: <span style={{ color: "#b060ff" }}>IoT · Cybersecurity · Blockchain</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "IoT",              hex: "#00d4ff", rgb: "0,212,255"   },
            { label: "Cybersecurity",    hex: "#00ff41", rgb: "0,255,65"    },
            { label: "Blockchain",       hex: "#ffb700", rgb: "255,183,0"   },
            { label: "Networking",       hex: "#00ff9d", rgb: "0,255,157"   },
            { label: "Computer Science", hex: "#b060ff", rgb: "176,96,255"  },
          ].map(({ label, hex, rgb }) => (
            <span key={label} className="font-mono text-[10px] px-2.5 py-1 rounded-sm border"
              style={{ background: `rgba(${rgb},0.07)`, borderColor: `rgba(${rgb},0.3)`, color: hex }}>
              {label}
            </span>
          ))}
        </div>
      </m.div>
    </div>
  </m.section>
));
EducationSection.displayName = "EducationSection";

/* ═══════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════ */
const ContactSection = memo(() => (
  <m.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.55 }}
    className="py-20 text-center">

    <p className="font-mono text-[11px] mb-2 flex items-center justify-center gap-1" style={{ color: "rgba(0,255,65,0.4)" }}>
      <span style={{ color: "#00ff41" }}>┌──(root㉿kali)-[~]</span>
    </p>
    <p className="font-mono text-[11px] mb-8 flex items-center justify-center gap-1">
      <span style={{ color: "rgba(0,255,65,0.4)" }}>└─$&nbsp;</span>
      <span style={{ color: "#00d4ff" }}>./connect.sh --target=recruiter --priority=HIGH</span>
    </p>

    <h2 className="font-mono font-black mb-4"
      style={{
        fontSize: "clamp(2.4rem,6vw,4rem)",
        color: "#00ff41",
        textShadow: "0 0 30px #00ff41, 0 0 80px rgba(0,255,65,0.2)",
        letterSpacing: "0.06em",
      }}>
      <GlitchText text="LET'S CONNECT" />
    </h2>

    <p className="font-mono text-[13px] max-w-md mx-auto mb-12 leading-loose" style={{ color: "rgba(0,255,65,0.45)" }}>
      <span style={{ color: "#00d4ff" }}>&gt;</span> Fresh graduate seeking{" "}
      <span style={{ color: "#00ff41" }} className="font-bold">SOC_Analyst</span> &amp;{" "}
      <span style={{ color: "#00d4ff" }} className="font-bold">VAPT</span> roles.<br />
      <span style={{ color: "#00d4ff" }}>&gt;</span> internships · contracts · full-time ·{" "}
      <span style={{ color: "#00ff9d" }}>responds_fast</span>
    </p>

    <div className="flex flex-wrap justify-center gap-3">
      {[
        { label: "./send_email",  href: "mailto:rushilvarade@gmail.com",             icon: Mail,     hex: "#00ff41", rgb: "0,255,65",   primary: true,  dl: false },
        { label: "./linkedin",    href: "https://www.linkedin.com/in/rushil-varade", icon: Linkedin, hex: "#00d4ff", rgb: "0,212,255",  primary: false, dl: false },
        { label: "./github",      href: "https://github.com/rushilvarade1405",        icon: Github,   hex: "#ffb700", rgb: "255,183,0",  primary: false, dl: false },
        { label: "./get_resume",  href: "/RushilVarade_Resume.pdf",                   icon: FileDown, hex: "#00ff9d", rgb: "0,255,157",  primary: false, dl: true  },
      ].map(({ label, href, icon: Icon, hex, rgb, primary, dl }) => (
        <a key={label} href={href}
          {...(dl ? { download: true } : {})}
          {...(!href.startsWith("mailto") && !dl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center gap-2.5 px-6 py-3 rounded-sm font-mono text-sm font-bold border transition-all duration-200"
          style={{
            background: primary ? `rgba(${rgb},0.1)` : "rgba(0,0,0,0.7)",
            borderColor: primary ? hex : `rgba(${rgb},0.3)`,
            color: hex,
            boxShadow: primary ? `0 0 20px rgba(${rgb},0.2), inset 0 0 20px rgba(${rgb},0.03)` : "none",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${rgb},0.15)`; el.style.borderColor = hex; el.style.boxShadow = `0 0 28px rgba(${rgb},0.3)`; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = primary ? `rgba(${rgb},0.1)` : "rgba(0,0,0,0.7)"; el.style.borderColor = primary ? hex : `rgba(${rgb},0.3)`; el.style.boxShadow = primary ? `0 0 20px rgba(${rgb},0.2)` : "none"; }}>
          <Icon size={14} /> {label}
        </a>
      ))}
    </div>

    <p className="mt-16 font-mono text-[10px] select-none" style={{ color: "rgba(0,255,65,0.1)" }}>
      rushil.varade · cybersecurity · 2025 · chmod 777 ./portfolio.sh
    </p>
  </m.section>
));
ContactSection.displayName = "ContactSection";

/* ═══════════════════════════════════════════
   ROOT
═══════════════════════════════════════════ */
export default function PortfolioCVSection() {
  return (
    <LazyMotion features={domAnimation} strict>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        .hk * { font-family: 'Share Tech Mono', monospace; box-sizing: border-box; }
        .hk h1, .hk h2, .hk h3 { font-family: 'Share Tech Mono', monospace !important; }
        .hk ::selection { background: rgba(0,255,65,0.22); color: #00ff41; }
        .hk ::-webkit-scrollbar { width: 3px; }
        .hk ::-webkit-scrollbar-track { background: #000; }
        .hk ::-webkit-scrollbar-thumb { background: rgba(0,255,65,0.4); border-radius: 2px; }

        @keyframes scanline {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .scanline-el {
          position: fixed; left: 0; right: 0; height: 2px; z-index: 50; pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(0,255,65,0.15), transparent);
          animation: scanline 10s linear infinite;
        }

        @keyframes crt-flicker {
          0%, 100% { opacity: 1; }
          91% { opacity: 1; }
          92% { opacity: 0.92; }
          93% { opacity: 1; }
          97% { opacity: 0.95; }
          98% { opacity: 1; }
        }
        .crt { animation: crt-flicker 14s infinite; }
      `}</style>

      {/* Matrix rain - fixed fullscreen */}
      <MatrixRain />

      {/* CRT scan line */}
      <div className="scanline-el" />

      <main className="hk crt relative min-h-screen overflow-hidden"
        style={{ background: "#000000", color: "#00ff41" }}>

        {/* Dark overlay for readability */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]"
          style={{ background: "rgba(0,0,0,0.80)" }} />

        {/* Radial vignette */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[2]"
          style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }} />

        {/* Very subtle CRT scanline texture */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[3]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)" }} />

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