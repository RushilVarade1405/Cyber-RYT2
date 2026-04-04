import { useState, useEffect, useRef, memo } from "react";
import {
  Shield, Lock, Terminal, FileDown, Cpu, Wifi, Code2,
  CheckCircle2, Mail, Database, Server, Globe, Layers,
  Zap, BookOpen, Linkedin, Github,
  Eye, Search, AlertTriangle, ChevronRight, Activity,
  MapPin, Calendar, Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/rushilvarade1405",       label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rushil-varade", label: "LinkedIn" },
  { icon: Mail,     href: "mailto:rushilvarade@gmail.com",             label: "Email"    },
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
  { category: "Languages",         icon: Code2,  color: "#00ffff", rgb: "0,255,255",   items: ["Python", "SQL", "PowerShell", "Bash"] },
  { category: "Operating Systems", icon: Server, color: "#a78bfa", rgb: "167,139,250", items: ["Kali Linux", "Ubuntu", "Windows Server", "macOS"] },
  { category: "Networking",        icon: Wifi,   color: "#fbbf24", rgb: "251,191,36",  items: ["TCP/UDP", "OSI Model", "DNS", "DHCP", "VPN", "Firewall", "IDS/IPS"] },
  { category: "Security Tools",    icon: Shield, color: "#34d399", rgb: "52,211,153",  items: ["Nmap", "Wireshark", "Burp Suite", "Metasploit", "SQLMap", "Nessus", "Maltego", "OSINT", "OWASP Top 10"] },
] as const;

const DOMAINS = [
  { icon: Shield,        label: "Penetration Testing", color: "#00ffff", rgb: "0,255,255"   },
  { icon: Eye,           label: "SOC Operations",      color: "#a78bfa", rgb: "167,139,250" },
  { icon: Search,        label: "VAPT",                color: "#fbbf24", rgb: "251,191,36"  },
  { icon: Lock,          label: "Cryptography",        color: "#34d399", rgb: "52,211,153"  },
  { icon: Terminal,      label: "Linux / CLI",         color: "#ff6b6b", rgb: "255,107,107" },
  { icon: Cpu,           label: "Blockchain Security", color: "#a78bfa", rgb: "167,139,250" },
  { icon: Database,      label: "Digital Forensics",   color: "#00ffff", rgb: "0,255,255"   },
  { icon: AlertTriangle, label: "Threat Detection",    color: "#fbbf24", rgb: "251,191,36"  },
] as const;

const CERTIFICATIONS = [
  { name: "Specialization in Penetration Testing", issuer: "ENCRYTECL", icon: "🎯", color: "#00ffff", rgb: "0,255,255",   status: "completed"  },
  { name: "Certified Ethical Hacker (CEH)",        issuer: "EC-Council", icon: "🛡️", color: "#a78bfa", rgb: "167,139,250", status: "pursuing"  },
  { name: "Cybersecurity Fundamentals",            issuer: "ENCRYTECL", icon: "🔐", color: "#34d399", rgb: "52,211,153",  status: "completed" },
];

const PROJECTS = [
  {
    id: "01", title: "Document Summarization Tool",
    desc: "AI-powered tool that ingests large documents and produces concise, structured summaries using NLP pipelines and transformer-based models.",
    impact: "Cuts review time by ~70%",
    tags: ["Python", "NLP", "AI", "Automation"],
    icon: BookOpen, color: "#00ffff", rgb: "0,255,255", status: "LIVE",
  },
  {
    id: "02", title: "Image Steganography Tool",
    desc: "Encodes and decodes hidden messages within image files using LSB manipulation for covert communication research.",
    impact: "Undetectable to standard scanners",
    tags: ["Python", "Cryptography", "Steganography"],
    icon: Layers, color: "#fbbf24", rgb: "251,191,36", status: "LIVE",
  },
  {
    id: "03", title: "Cyber_World Platform",
    desc: "Full-stack cybersecurity education platform covering Linux, networking, tools, blockchain, cryptography, and cyber laws for beginners.",
    impact: "End-to-end learning path",
    tags: ["React", "TypeScript", "Tailwind"],
    icon: Globe, color: "#a78bfa", rgb: "167,139,250", status: "LIVE",
  },
] as const;

const STATS = [
  { label: "Tools Built", value: "10+",  color: "#00ffff", cls: "s-cyan"   },
  { label: "Projects",    value: "3+",   color: "#ff6b6b", cls: "s-red"    },
  { label: "Domains",     value: "8",    color: "#a78bfa", cls: "s-purple" },
  { label: "Degree",      value: "B.E.", color: "#34d399", cls: "s-green"  },
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
        cur += "\n"; ci = 0; li++;
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
   GLITCH TEXT
═══════════════════════════════════════════ */
const GlitchText = memo(({ text }: { text: string }) => {
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
    <span className="pf-glitch-wrap">
      {text}
      {glitch && (
        <>
          <span className="pf-glitch-r">{text}</span>
          <span className="pf-glitch-b">{text}</span>
        </>
      )}
    </span>
  );
});
GlitchText.displayName = "GlitchText";

/* ═══════════════════════════════════════════
   SECTION HEADER  (mirrors tk-cat-header)
═══════════════════════════════════════════ */
const SectionHeader = memo(({ id, label, color, rgb }: { id: string; label: string; color: string; rgb: string }) => (
  <div
    className="pf-sec-header"
    style={{ "--cat-color": color, "--cat-rgb": rgb } as React.CSSProperties}
  >
    <span className="pf-sec-id">[{id}]</span>
    <h2 className="pf-sec-title">{label}</h2>
    <div className="pf-sec-line" />
    <span className="pf-sec-badge">EOF</span>
    <span className="pf-sec-dot" />
  </div>
));
SectionHeader.displayName = "SectionHeader";

/* ═══════════════════════════════════════════
   CYBER CARD
═══════════════════════════════════════════ */
const CyberCard = memo(({
  children, color, rgb, className = "",
}: { children: React.ReactNode; color: string; rgb: string; className?: string }) => (
  <div
    className={`pf-card ${className}`}
    style={{ "--cat-color": color, "--cat-rgb": rgb } as React.CSSProperties}
  >
    <div className="pf-card-strip" />
    {children}
  </div>
));
CyberCard.displayName = "CyberCard";

/* ═══════════════════════════════════════════
   DIVIDER
═══════════════════════════════════════════ */
const Divider = memo(() => (
  <div className="pf-divider">
    <div className="pf-div-line pf-div-line-l" />
    <span className="pf-div-text">* ──────</span>
    <div className="pf-div-dot" />
    <span className="pf-div-text">────── */</span>
    <div className="pf-div-line pf-div-line-r" />
  </div>
));
Divider.displayName = "Divider";

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function PortfolioCVSection() {
  const matrixRef = useRef<HTMLCanvasElement>(null);
  const typed = useTyping(TERM_LINES);
  const [scrollY, setScrollY] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Matrix Rain */
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const FONT_SIZE = 14;
    const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*<>?[]{}|~";
    let drops: number[] = Array(Math.floor(canvas.width / FONT_SIZE)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;
      const cols = Math.floor(canvas.width / FONT_SIZE);
      if (drops.length !== cols) drops = Array(cols).fill(1);

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const br = Math.random();
        if (br > 0.96)      { ctx.fillStyle = "#ffffff"; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 10; }
        else if (br > 0.8)  { ctx.fillStyle = "#67e8f9"; ctx.shadowColor = "#67e8f9"; ctx.shadowBlur = 4;  }
        else if (br > 0.5)  { ctx.fillStyle = "#00ffff"; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 2;  }
        else                { ctx.fillStyle = "rgba(0,255,255,0.25)"; ctx.shadowBlur = 0; }
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        ctx.shadowBlur = 0;
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --cyan: #00ffff;
          --cyan-dim: rgba(0,255,255,0.15);
          --cyan-glow: rgba(0,255,255,0.08);
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes dotBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 8px var(--cyan), 0 0 20px rgba(0,255,255,0.2); }
          50%     { box-shadow: 0 0 16px var(--cyan), 0 0 40px rgba(0,255,255,0.4); }
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(16px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── ROOT ── */
        .pf-root {
          min-height: 100vh;
          background: #000;
          color: #c0d8e0;
          font-family: 'Share Tech Mono', monospace;
          position: relative;
          overflow-x: hidden;
        }

        /* ── BG LAYERS ── */
        .pf-matrix {
          position: fixed; top:0; left:0;
          width:100%; height:100%;
          z-index:0; pointer-events:none;
          transition: opacity 0.8s ease;
        }
        .pf-vignette {
          position: fixed; inset:0;
          background: rgba(0,0,0,0.45);
          z-index:1; pointer-events:none;
          transition: background 0.8s ease;
        }
        .pf-scanline {
          position: fixed; top:0; left:0; right:0;
          height:2px;
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent);
          z-index:2; pointer-events:none;
          animation: scanline 8s linear infinite;
        }

        /* ── INNER ── */
        .pf-inner {
          position: relative; z-index:5;
          max-width: 1200px; margin: 0 auto;
          padding: 0 2rem 6rem;
        }

        /* ── NAV ── */
        .pf-nav {
          position: sticky; top:0; z-index:10;
          display: flex; align-items:center; justify-content:space-between;
          padding: 1rem 2rem;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0,255,255,0.15);
          animation: fadeIn 0.5s ease both;
        }
        .pf-nav-brand {
          font-family: 'Orbitron', monospace;
          font-size: 0.85rem; font-weight:900; letter-spacing:0.3em;
          background: linear-gradient(90deg, #00ffff, #a78bfa, #00ffff);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .pf-nav-dot { width:8px; height:8px; background:#00ffff; border-radius:50%; box-shadow:0 0 10px #00ffff; animation:dotBlink 2s infinite; }

        /* ── HERO ── */
        .pf-hero {
          padding: 3rem 0 2rem;
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: 3rem;
          align-items: center;
          animation: fadeSlideUp 0.7s ease 0.1s both;
        }
        @media(max-width:900px){ .pf-hero{ grid-template-columns:1fr; } .pf-hero-terminal{ display:none !important; } }

        .pf-hero-status {
          display: inline-flex; align-items:center; gap:0.5rem;
          border: 1px solid rgba(0,255,255,0.3);
          padding: 0.3rem 0.9rem;
          font-size:0.68rem; color:#00ffff; letter-spacing:0.18em; text-transform:uppercase;
          margin-bottom:1.5rem; background:rgba(0,255,255,0.05);
        }
        .pf-status-dot { width:6px; height:6px; background:#00ffff; border-radius:50%; box-shadow:0 0 8px #00ffff; animation:dotBlink 1.5s infinite; }

        .pf-name-cyber {
          font-family: 'Orbitron', monospace;
          font-size: clamp(3rem,8vw,6.5rem); font-weight:900;
          color:#00ffff; display:block; line-height:0.88;
          text-shadow:0 0 30px rgba(0,255,255,0.6),0 0 80px rgba(0,255,255,0.25);
          letter-spacing:-0.02em;
        }
        .pf-name-white {
          font-family: 'Orbitron', monospace;
          font-size: clamp(2.5rem,7vw,5.5rem); font-weight:900;
          color:rgba(255,255,255,0.92); display:block; line-height:0.95;
          letter-spacing:-0.02em;
        }

        .pf-chips { display:flex; flex-wrap:wrap; gap:0.5rem; margin:1.25rem 0; }
        .pf-chip {
          font-family:'Share Tech Mono',monospace; font-size:0.7rem;
          padding:0.3rem 0.8rem; border:1px solid; border-radius:0;
          transition: all 0.2s; cursor:default;
        }

        .pf-flags { display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.25rem; }
        .pf-flag {
          display:flex; align-items:center; gap:0.5rem;
          font-family:'Share Tech Mono',monospace; font-size:0.7rem;
          padding:0.3rem 0.8rem; border:1px solid rgba(0,255,255,0.3);
          color:rgba(0,255,255,0.6); background:rgba(0,0,0,0.5);
        }
        .pf-flag-open {
          background:rgba(0,255,255,0.06);
          border-color:rgba(0,255,255,0.55);
          color:#00ffff;
          box-shadow:0 0 14px rgba(0,255,255,0.1);
        }

        .pf-ctas { display:flex; flex-wrap:wrap; gap:0.75rem; margin-bottom:1.25rem; }
        .pf-cta-primary {
          display:flex; align-items:center; gap:0.6rem;
          padding:0.7rem 1.4rem; font-family:'Share Tech Mono',monospace; font-size:0.75rem;
          border:1px solid #00ffff; color:#00ffff;
          background:rgba(0,255,255,0.08);
          box-shadow:0 0 18px rgba(0,255,255,0.12);
          transition:all 0.2s; cursor:pointer; text-decoration:none;
        }
        .pf-cta-primary:hover { background:rgba(0,255,255,0.18); box-shadow:0 0 32px rgba(0,255,255,0.3); }
        .pf-cta-secondary {
          display:flex; align-items:center; gap:0.6rem;
          padding:0.7rem 1.2rem; font-family:'Share Tech Mono',monospace; font-size:0.75rem;
          border:1px solid rgba(0,255,255,0.25); color:rgba(0,255,255,0.55);
          background:rgba(0,0,0,0.6); transition:all 0.2s; cursor:pointer; text-decoration:none;
        }
        .pf-cta-secondary:hover { border-color:#00ffff; color:#00ffff; box-shadow:0 0 16px rgba(0,255,255,0.2); }

        .pf-socials { display:flex; gap:0.5rem; }
        .pf-social {
          width:38px; height:38px; display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(0,255,255,0.2); background:rgba(0,0,0,0.7);
          color:rgba(0,255,255,0.4); transition:all 0.2s; cursor:pointer; text-decoration:none;
        }
        .pf-social:hover { border-color:#00ffff; color:#00ffff; box-shadow:0 0 14px rgba(0,255,255,0.3); }

        /* ── TERMINAL ── */
        .pf-terminal {
          background:rgba(0,0,0,0.92);
          border:1px solid rgba(0,255,255,0.3);
          box-shadow:0 0 60px rgba(0,255,255,0.06);
          overflow:hidden;
        }
        .pf-term-bar {
          display:flex; align-items:center; gap:0.5rem;
          padding:0.6rem 1rem; border-bottom:1px solid rgba(0,255,255,0.12);
          background:rgba(0,255,255,0.03);
        }
        .pf-term-dot { width:10px; height:10px; border-radius:50%; }
        .pf-term-label { font-size:0.65rem; color:rgba(0,255,255,0.3); margin-left:0.5rem; flex:1; }
        .pf-term-body { padding:1.2rem; min-height:260px; font-size:0.78rem; line-height:1.85; white-space:pre-wrap; }
        .pf-term-cursor { display:inline-block; width:10px; height:13px; background:#00ffff; box-shadow:0 0 6px #00ffff; vertical-align:middle; animation:dotBlink 0.8s infinite; }

        /* ── STAT CARDS (hero) ── */
        .pf-stats { display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1.25rem; }
        .pf-stat {
          position:relative; background:rgba(0,0,0,0.55);
          border:1px solid rgba(0,255,255,0.2);
          padding:0.9rem 1.2rem 0.75rem;
          min-width:100px; transition:all 0.2s; cursor:default;
        }
        .pf-stat::before { content:''; position:absolute; top:-1px; left:-1px; width:12px; height:12px; border-top:2px solid #00ffff; border-left:2px solid #00ffff; }
        .pf-stat::after  { content:''; position:absolute; bottom:-1px; right:-1px; width:12px; height:12px; border-bottom:2px solid #00ffff; border-right:2px solid #00ffff; }
        .pf-stat:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(0,255,255,0.15); border-color:rgba(0,255,255,0.45); }
        .pf-stat-val { font-family:'Orbitron',monospace; font-size:1.8rem; font-weight:900; display:block; line-height:1; }
        .pf-stat-lbl { font-size:0.55rem; text-transform:uppercase; letter-spacing:0.18em; color:rgba(150,180,190,0.45); margin-top:0.3rem; display:block; }
        .s-cyan   { color:#00ffff; text-shadow:0 0 14px rgba(0,255,255,0.6); }
        .s-red    { color:#ff6b6b; text-shadow:0 0 14px rgba(255,107,107,0.5); }
        .s-purple { color:#a78bfa; text-shadow:0 0 14px rgba(167,139,250,0.5); }
        .s-green  { color:#34d399; text-shadow:0 0 14px rgba(52,211,153,0.5); }

        /* ── SECTION HEADER ── */
        .pf-sec-header {
          display:flex; align-items:center; gap:0.75rem;
          padding:0.55rem 1rem; margin-bottom:1.5rem;
          background:rgba(0,0,0,0.4);
          border-left:3px solid var(--cat-color, #00ffff);
          border-bottom:1px solid rgba(255,255,255,0.05);
          position:relative; overflow:hidden;
        }
        .pf-sec-header::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,rgba(var(--cat-rgb,0,255,255),0.06) 0%,transparent 70%);
          pointer-events:none;
        }
        .pf-sec-id {
          font-family:'Share Tech Mono',monospace; font-size:0.7rem;
          padding:0.1rem 0.5rem; border:1px solid;
          border-color:rgba(var(--cat-rgb,0,255,255),0.5);
          color:var(--cat-color,#00ffff);
          background:rgba(var(--cat-rgb,0,255,255),0.08);
        }
        .pf-sec-title {
          font-family:'Rajdhani',sans-serif; font-size:1.05rem; font-weight:700;
          color:var(--cat-color,#00ffff); text-transform:uppercase; letter-spacing:0.1em;
          text-shadow:0 0 12px rgba(var(--cat-rgb,0,255,255),0.5); margin:0;
        }
        .pf-sec-line { flex:1; height:1px; background:linear-gradient(90deg,rgba(var(--cat-rgb,0,255,255),0.35),transparent); margin-left:0.5rem; }
        .pf-sec-badge { font-size:0.62rem; color:rgba(var(--cat-rgb,0,255,255),0.4); letter-spacing:0.05em; }
        .pf-sec-dot { width:8px; height:8px; border-radius:50%; background:var(--cat-color,#00ffff); box-shadow:0 0 10px var(--cat-color,#00ffff); animation:dotBlink 2s infinite; }

        /* ── DIVIDER ── */
        .pf-divider { display:flex; align-items:center; gap:0.75rem; margin:3rem 0; }
        .pf-div-line { flex:1; height:1px; }
        .pf-div-line-l { background:linear-gradient(90deg,transparent,rgba(0,255,255,0.3)); }
        .pf-div-line-r { background:linear-gradient(90deg,rgba(0,255,255,0.3),transparent); }
        .pf-div-text { font-family:'Share Tech Mono',monospace; font-size:0.65rem; color:rgba(0,255,255,0.25); }
        .pf-div-dot { width:6px; height:6px; border-radius:50%; background:#00ffff; box-shadow:0 0 8px #00ffff; }

        /* ── CYBER CARD ── */
        .pf-card {
          position:relative; background:rgba(0,0,0,0.55);
          border:1px solid rgba(var(--cat-rgb,0,255,255),0.18);
          transition:border-color 0.25s,box-shadow 0.25s,transform 0.2s;
          overflow:hidden; animation:cardIn 0.4s ease both;
        }
        .pf-card::before { content:''; position:absolute; top:-1px; left:-1px; width:12px; height:12px; border-top:2px solid var(--cat-color,#00ffff); border-left:2px solid var(--cat-color,#00ffff); transition:width 0.3s,height 0.3s; }
        .pf-card::after  { content:''; position:absolute; top:-1px; right:-1px; width:12px; height:12px; border-top:1px solid rgba(var(--cat-rgb,0,255,255),0.3); border-right:1px solid rgba(var(--cat-rgb,0,255,255),0.3); }
        .pf-card:hover { border-color:rgba(var(--cat-rgb,0,255,255),0.5); box-shadow:0 0 28px rgba(var(--cat-rgb,0,255,255),0.1); transform:translateY(-3px); }
        .pf-card:hover::before { width:20px; height:20px; }
        .pf-card-strip { height:2px; background:linear-gradient(90deg,var(--cat-color,#00ffff),transparent); opacity:0.5; transition:opacity 0.25s; margin:-0px; }
        .pf-card:hover .pf-card-strip { opacity:1; }

        /* ── GLITCH ── */
        .pf-glitch-wrap { position:relative; display:inline-block; }
        .pf-glitch-r { position:absolute; inset:0; color:#ff3131; opacity:0.7; transform:translate(-3px,1px); clip-path:inset(0 0 55% 0); pointer-events:none; }
        .pf-glitch-b { position:absolute; inset:0; color:#00ffff; opacity:0.7; transform:translate(3px,-1px); clip-path:inset(55% 0 0 0); pointer-events:none; }

        /* ── ABOUT ── */
        .pf-about-grid { display:grid; grid-template-columns:1fr 240px; gap:1rem; }
        @media(max-width:700px){ .pf-about-grid{ grid-template-columns:1fr; } }
        .pf-about-body { padding:1.5rem; }
        .pf-about-p { font-size:0.8rem; line-height:1.85; color:rgba(180,210,220,0.65); margin-bottom:0.9rem; }
        .pf-about-config { padding:1.25rem; }
        .pf-config-row { display:flex; align-items:center; gap:0.6rem; margin-bottom:0.65rem; }
        .pf-config-key { font-size:0.68rem; color:rgba(0,255,255,0.4); }
        .pf-config-val { font-size:0.68rem; color:#00ffff; }
        .pf-tag-row { display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:1rem; }
        .pf-tag {
          font-family:'Share Tech Mono',monospace; font-size:0.65rem;
          padding:0.25rem 0.7rem; border:1px solid; cursor:default; transition:all 0.2s;
        }

        /* ── DOMAINS GRID ── */
        .pf-domains { display:grid; grid-template-columns:repeat(auto-fill,minmax(170px,1fr)); gap:0.75rem; margin-bottom:1.5rem; }
        .pf-domain {
          position:relative; display:flex; flex-direction:column; align-items:center; gap:0.65rem;
          padding:1rem; border:1px solid rgba(var(--cat-rgb,0,255,255),0.18);
          background:rgba(0,0,0,0.55); transition:all 0.25s; cursor:default; overflow:hidden;
        }
        .pf-domain::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--cat-color,#00ffff),transparent); }
        .pf-domain:hover { border-color:rgba(var(--cat-rgb,0,255,255),0.55); box-shadow:0 0 20px rgba(var(--cat-rgb,0,255,255),0.12); transform:translateY(-2px); }
        .pf-domain-icon { width:38px; height:38px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(var(--cat-rgb,0,255,255),0.3); background:rgba(var(--cat-rgb,0,255,255),0.07); }
        .pf-domain-label { font-size:0.68rem; color:var(--cat-color,#00ffff); text-align:center; line-height:1.3; font-family:'Rajdhani',sans-serif; font-weight:700; letter-spacing:0.04em; }

        /* ── SKILLS ── */
        .pf-skills-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; }
        @media(max-width:600px){ .pf-skills-grid{ grid-template-columns:1fr; } }
        .pf-skill-card { padding:1.2rem; }
        .pf-skill-head { display:flex; align-items:center; gap:0.6rem; margin-bottom:1rem; }
        .pf-skill-icon { width:32px; height:32px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(var(--cat-rgb,0,255,255),0.35); background:rgba(var(--cat-rgb,0,255,255),0.08); }
        .pf-skill-name { font-family:'Rajdhani',sans-serif; font-size:0.85rem; font-weight:700; color:var(--cat-color,#00ffff); text-transform:uppercase; letter-spacing:0.15em; text-shadow:0 0 8px rgba(var(--cat-rgb,0,255,255),0.4); }
        .pf-skill-items { display:flex; flex-wrap:wrap; gap:0.45rem; }
        .pf-skill-item {
          font-family:'Share Tech Mono',monospace; font-size:0.67rem;
          padding:0.25rem 0.7rem; border:1px solid rgba(var(--cat-rgb,0,255,255),0.25);
          background:rgba(var(--cat-rgb,0,255,255),0.05); color:var(--cat-color,#00ffff);
          cursor:default; transition:all 0.18s;
        }
        .pf-skill-item:hover { background:rgba(var(--cat-rgb,0,255,255),0.14); border-color:var(--cat-color,#00ffff); box-shadow:0 0 8px rgba(var(--cat-rgb,0,255,255),0.2); }

        /* ── CERTS ── */
        .pf-certs { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1rem; }
        .pf-cert { padding:1.25rem; }
        .pf-cert-top { display:flex; align-items:flex-start; justify-content:space-between; gap:0.5rem; margin-bottom:1rem; }
        .pf-cert-badge { font-size:0.62rem; padding:0.15rem 0.55rem; border:1px solid; display:flex; align-items:center; gap:0.3rem; }
        .pf-cert-name { font-size:0.82rem; font-weight:bold; color:#fff; line-height:1.35; margin-bottom:0.4rem; }
        .pf-cert-issuer { font-size:0.65rem; }

        /* ── PROJECTS ── */
        .pf-projects { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1rem; }
        .pf-proj { padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem; }
        .pf-proj-head { display:flex; align-items:center; justify-content:space-between; }
        .pf-proj-icon-wrap { width:36px; height:36px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(var(--cat-rgb,0,255,255),0.4); background:rgba(var(--cat-rgb,0,255,255),0.08); }
        .pf-proj-live { display:flex; align-items:center; gap:0.35rem; font-size:0.62rem; padding:0.18rem 0.55rem; border:1px solid rgba(0,255,255,0.35); color:#00ffff; background:rgba(0,255,255,0.06); }
        .pf-live-dot { width:5px; height:5px; border-radius:50%; background:#00ffff; box-shadow:0 0 5px #00ffff; animation:dotBlink 1.2s infinite; }
        .pf-proj-title { font-family:'Rajdhani',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; line-height:1.25; }
        .pf-proj-desc { font-size:0.7rem; color:rgba(180,200,210,0.5); line-height:1.65; flex:1; }
        .pf-proj-impact { display:inline-flex; align-items:center; gap:0.4rem; padding:0.35rem 0.75rem; background:rgba(0,255,255,0.05); border:1px solid rgba(0,255,255,0.18); font-size:0.67rem; color:#00ffff; }
        .pf-proj-tags { display:flex; flex-wrap:wrap; gap:0.4rem; padding-top:0.75rem; border-top:1px solid rgba(var(--cat-rgb,0,255,255),0.1); }
        .pf-proj-tag { font-size:0.6rem; padding:0.18rem 0.55rem; border:1px solid rgba(var(--cat-rgb,0,255,255),0.25); background:rgba(var(--cat-rgb,0,255,255),0.05); color:var(--cat-color,#00ffff); }

        /* ── EDUCATION ── */
        .pf-edu-wrap { padding-left:1.5rem; border-left:2px solid rgba(167,139,250,0.25); position:relative; }
        .pf-edu-dot { position:absolute; left:-7px; top:2rem; width:12px; height:12px; border-radius:50%; background:#a78bfa; box-shadow:0 0 12px #a78bfa,0 0 24px rgba(167,139,250,0.4); }
        .pf-edu-card { padding:1.5rem; }
        .pf-edu-degree { font-family:'Share Tech Mono',monospace; font-size:0.95rem; font-weight:bold; color:#fff; margin-bottom:0.35rem; }
        .pf-edu-school { font-family:'Share Tech Mono',monospace; font-size:0.75rem; color:#a78bfa; text-shadow:0 0 8px #a78bfa; margin-bottom:0.5rem; }
        .pf-edu-note { font-size:0.68rem; color:rgba(167,139,250,0.5); margin-bottom:1rem; }
        .pf-edu-tags { display:flex; flex-wrap:wrap; gap:0.5rem; }
        .pf-edu-tag { font-size:0.65rem; padding:0.25rem 0.7rem; border:1px solid; }

        /* ── CONTACT ── */
        .pf-contact { padding:3rem 0; text-align:center; }
        .pf-contact-prompt { font-family:'Share Tech Mono',monospace; font-size:0.7rem; margin-bottom:1.5rem; }
        .pf-contact-title {
          font-family:'Orbitron',monospace;
          font-size:clamp(2rem,5vw,3.5rem); font-weight:900;
          color:#00ffff; text-shadow:0 0 30px #00ffff,0 0 80px rgba(0,255,255,0.2);
          letter-spacing:0.06em; margin-bottom:1rem;
        }
        .pf-contact-desc { font-size:0.78rem; color:rgba(0,255,255,0.45); max-width:420px; margin:0 auto 2rem; line-height:1.9; }
        .pf-contact-btns { display:flex; flex-wrap:wrap; justify-content:center; gap:0.75rem; }
        .pf-contact-btn {
          display:flex; align-items:center; gap:0.6rem;
          padding:0.7rem 1.4rem; font-family:'Share Tech Mono',monospace; font-size:0.72rem;
          border:1px solid; cursor:pointer; text-decoration:none; transition:all 0.2s;
        }
        .pf-footer { margin-top:4rem; font-family:'Share Tech Mono',monospace; font-size:0.65rem; color:rgba(0,255,255,0.1); text-align:center; user-select:none; }

        @media(max-width:640px){
          .pf-inner { padding:0 1rem 4rem; }
          .pf-certs { grid-template-columns:1fr; }
        }
      `}</style>

      {/* BG */}
      <canvas
        ref={matrixRef}
        className="pf-matrix"
        style={{ opacity: scrollY > 300 ? Math.max(0.08, 0.5 - (scrollY - 300) / 600) : 0.5 }}
      />
      <div className="pf-vignette" style={{ background: scrollY > 300 ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.45)" }} />
      <div className="pf-scanline" />

      <div className="pf-root">

        {/* NAV */}
        <nav className="pf-nav">
          <span className="pf-nav-brand">RUSHIL.VARADE</span>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <a href="/RushilVarade_Resume.pdf" download style={{ background:"rgba(0,255,255,0.06)", border:"1px solid rgba(0,255,255,0.3)", color:"rgba(0,255,255,0.8)", padding:"0.3rem 0.9rem", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", cursor:"pointer", letterSpacing:"0.08em", textDecoration:"none", transition:"all 0.2s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(0,255,255,0.14)"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(0,255,255,0.06)"}}>
              ↓ RESUME
            </a>
            <div className="pf-nav-dot" />
          </div>
        </nav>

        <div className="pf-inner">

          {/* ══ HERO ══ */}
          <div className="pf-hero">

            {/* LEFT */}
            <div>
              <div className="pf-hero-status">
                <div className="pf-status-dot" />
                OPEN TO HIRE · AVAILABLE NOW
              </div>

              {/* Kali prompt */}
              <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", marginBottom:"0.3rem", color:"rgba(0,255,255,0.45)" }}>
                <span style={{ color:"#00ffff" }}>┌──(</span>
                <span style={{ color:"#a78bfa" }}>root㉿kali</span>
                <span style={{ color:"#00ffff" }}>)-[~/portfolio]</span>
              </p>
              <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", marginBottom:"1.25rem", color:"rgba(0,255,255,0.45)" }}>
                <span style={{ color:"rgba(0,255,255,0.4)" }}>└─$&nbsp;</span>
                <span style={{ color:"#00ffff" }}>./portfolio.sh --mode=recruiter</span>
                <span style={{ color:"#00ffff", animation:"dotBlink 0.8s infinite", marginLeft:"4px" }}>█</span>
              </p>

              <div style={{ marginBottom:"1.25rem" }}>
                <span className="pf-name-cyber"><GlitchText text="RUSHIL" /></span>
                <span className="pf-name-white"><GlitchText text="VARADE" /></span>
              </div>

              {/* Role chips */}
              <div className="pf-chips">
                {[
                  { label:"[SOC_Analyst]", color:"#00ffff", rgb:"0,255,255"   },
                  { label:"[VAPT]",        color:"#fbbf24", rgb:"251,191,36"  },
                  { label:"[Forensics]",   color:"#a78bfa", rgb:"167,139,250" },
                  { label:"[Grad_2025]",   color:"#34d399", rgb:"52,211,153"  },
                ].map(({ label, color, rgb }) => (
                  <span key={label} className="pf-chip"
                    style={{ borderColor:`rgba(${rgb},0.5)`, color, background:`rgba(${rgb},0.07)`, textShadow:`0 0 8px ${color}` }}
                    onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=`rgba(${rgb},0.15)`; el.style.boxShadow=`0 0 12px rgba(${rgb},0.25)`; }}
                    onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=`rgba(${rgb},0.07)`; el.style.boxShadow="none"; }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:"rgba(0,255,255,0.28)", marginBottom:"1rem" }}>
                <span style={{ color:"rgba(0,255,255,0.45)" }}>#</span> B.E. CS · IoT · Cybersecurity · Blockchain · Smt. Indira Gandhi College of Engineering
              </p>

              {/* Flags */}
              <div className="pf-flags">
                <span className="pf-flag pf-flag-open">
                  <span className="pf-status-dot" /> OPEN_TO_HIRE
                </span>
                <span className="pf-flag"><MapPin size={10} /> India</span>
                <span className="pf-flag"><Calendar size={10} /> Class_of_2025</span>
              </div>

              {/* CTAs */}
              <div className="pf-ctas">
                <a href="/RushilVarade_Resume.pdf" download className="pf-cta-primary">
                  <FileDown size={14} /> ./download_resume.sh
                </a>
                <a href="mailto:rushilvarade@gmail.com" className="pf-cta-secondary">
                  <Mail size={14} /> ./contact_me.sh
                </a>
              </div>

              {/* Socials */}
              <div className="pf-socials">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} className="pf-social" aria-label={label}
                    target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer">
                    <Icon size={15} />
                  </a>
                ))}
              </div>

              {/* Stats */}
              <div className="pf-stats">
                {STATS.map(({ label, value, cls }) => (
                  <div key={label} className="pf-stat">
                    <span className={`pf-stat-val ${cls}`}>{value}</span>
                    <span className="pf-stat-lbl">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Terminal */}
            <div className="pf-hero-terminal">
              <div className="pf-terminal">
                <div className="pf-term-bar">
                  <div className="pf-term-dot" style={{ background:"#ff5f57", boxShadow:"0 0 6px #ff5f57" }} />
                  <div className="pf-term-dot" style={{ background:"#febc2e", boxShadow:"0 0 6px #febc2e" }} />
                  <div className="pf-term-dot" style={{ background:"#28c840", boxShadow:"0 0 6px #28c840" }} />
                  <span className="pf-term-label">┌──(root㉿kali)-[~/portfolio] — zsh</span>
                </div>
                <div className="pf-term-body">
                  {typed.split("\n").map((line, i) => {
                    const isCmd  = line.startsWith(">");
                    const isGood = line.startsWith("[SUDO]") || line.startsWith("PORT") || line.includes("✓");
                    return (
                      <div key={i} style={{
                        color: isCmd ? "#00ffff" : isGood ? "#34d399" : "rgba(0,255,255,0.7)",
                        textShadow: isCmd ? "0 0 8px #00ffff" : isGood ? "0 0 6px #34d399" : "0 0 4px rgba(0,255,255,0.25)",
                      }}>
                        {isCmd && <span style={{ color:"rgba(0,255,255,0.3)" }}>└─$ </span>}
                        {line}
                      </div>
                    );
                  })}
                  <span className="pf-term-cursor" />
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ══ ABOUT ══ */}
          <section>
            <SectionHeader id="01" label="About" color="#00ffff" rgb="0,255,255" />
            <div className="pf-about-grid">
              <CyberCard color="#00ffff" rgb="0,255,255">
                <div className="pf-about-body">
                  <p className="pf-about-p">
                    <span style={{ fontFamily:"'Share Tech Mono',monospace", color:"#00ffff" }}>$&nbsp;</span>
                    <strong style={{ color:"#fff" }}>Rushil Varade</strong>{" "}
                    — cybersecurity graduate specializing in{" "}
                    <span style={{ color:"#00ffff" }}>IoT, Cybersecurity, and Blockchain</span>.
                    Approach: understand attack surfaces before tools. Defense starts with attacker thinking.
                  </p>
                  <p className="pf-about-p">
                    <span style={{ fontFamily:"'Share Tech Mono',monospace", color:"#00ffff" }}>$&nbsp;</span>
                    Pursuing <strong style={{ color:"#fff" }}>SOC Analyst</strong> and{" "}
                    <strong style={{ color:"#fff" }}>VAPT</strong> roles.
                    Built <span style={{ color:"#00ffff", fontWeight:"bold" }}>Cyber_World</span> — a structured cybersecurity learning platform.
                  </p>
                  <div className="pf-tag-row">
                    {[
                      { t:"Ethical_Hacking",   c:"#00ffff", r:"0,255,255"   },
                      { t:"Network_Defense",   c:"#00ffff", r:"0,255,255"   },
                      { t:"Digital_Forensics", c:"#fbbf24", r:"251,191,36"  },
                      { t:"Incident_Response", c:"#34d399", r:"52,211,153"  },
                      { t:"Threat_Intel",      c:"#ff6b6b", r:"255,107,107" },
                      { t:"OSINT",             c:"#a78bfa", r:"167,139,250" },
                    ].map(({ t, c, r }) => (
                      <span key={t} className="pf-tag"
                        style={{ borderColor:`rgba(${r},0.35)`, color:c, background:`rgba(${r},0.06)` }}
                        onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=`rgba(${r},0.14)`; el.style.boxShadow=`0 0 10px rgba(${r},0.2)`; }}
                        onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=`rgba(${r},0.06)`; el.style.boxShadow="none"; }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </CyberCard>
              <CyberCard color="#00ffff" rgb="0,255,255">
                <div className="pf-about-config">
                  <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:"rgba(0,255,255,0.3)", marginBottom:"1rem" }}>
                    <span style={{ color:"#00ffff" }}># </span>config.yml
                  </p>
                  {[
                    { key:"location",  val:"India",              Icon:MapPin    },
                    { key:"degree",    val:"B.E. CS",            Icon:Sparkles  },
                    { key:"graduated", val:"2025",               Icon:Calendar  },
                    { key:"status",    val:"open_to_hire",       Icon:Activity  },
                    { key:"focus",     val:"SOC/VAPT/Forensics", Icon:Shield    },
                  ].map(({ key, val, Icon }) => (
                    <div key={key} className="pf-config-row">
                      <Icon size={10} style={{ color:"#00ffff", flexShrink:0 }} />
                      <span className="pf-config-key">{key}:</span>
                      <span className="pf-config-val">{val}</span>
                    </div>
                  ))}
                </div>
              </CyberCard>
            </div>
          </section>

          <Divider />

          {/* ══ SKILLS ══ */}
          <section>
            <SectionHeader id="02" label="Skills" color="#00ffff" rgb="0,255,255" />

            {/* Domain tiles */}
            <div className="pf-domains">
              {DOMAINS.map(({ icon: Icon, label, color, rgb }) => (
                <div key={label} className="pf-domain"
                  style={{ "--cat-color":color, "--cat-rgb":rgb } as React.CSSProperties}>
                  <div className="pf-domain-icon">
                    <Icon size={17} style={{ color, filter:`drop-shadow(0 0 5px ${color})` }} />
                  </div>
                  <span className="pf-domain-label">{label}</span>
                </div>
              ))}
            </div>

            {/* Skill groups */}
            <div className="pf-skills-grid">
              {SKILL_GROUPS.map(({ category, icon: Icon, color, rgb, items }) => (
                <CyberCard key={category} color={color} rgb={rgb} className="pf-skill-card">
                  <div className="pf-skill-head">
                    <div className="pf-skill-icon" style={{ "--cat-color":color,"--cat-rgb":rgb } as React.CSSProperties}>
                      <Icon size={13} style={{ color, filter:`drop-shadow(0 0 4px ${color})` }} />
                    </div>
                    <span className="pf-skill-name" style={{ "--cat-color":color,"--cat-rgb":rgb } as React.CSSProperties}>{category}</span>
                  </div>
                  <div className="pf-skill-items" style={{ "--cat-color":color,"--cat-rgb":rgb } as React.CSSProperties}>
                    {items.map(skill => (
                      <span key={skill} className="pf-skill-item">{skill}</span>
                    ))}
                  </div>
                </CyberCard>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══ CERTIFICATIONS ══ */}
          <section>
            <SectionHeader id="03" label="Certifications" color="#34d399" rgb="52,211,153" />
            <div className="pf-certs">
              {CERTIFICATIONS.map((cert, i) => (
                <CyberCard key={i} color={cert.color} rgb={cert.rgb} className="pf-cert">
                  <div className="pf-cert-top">
                    <span style={{ fontSize:"2rem" }}>{cert.icon}</span>
                    {cert.status === "completed" ? (
                      <span className="pf-cert-badge" style={{ borderColor:cert.color, color:cert.color, background:`rgba(${cert.rgb},0.08)` }}>
                        <CheckCircle2 size={9} /> COMPLETED
                      </span>
                    ) : (
                      <span className="pf-cert-badge" style={{ borderColor:"rgba(251,191,36,0.4)", color:"#fbbf24", background:"rgba(251,191,36,0.07)" }}>
                        ⏳ PURSUING
                      </span>
                    )}
                  </div>
                  <p className="pf-cert-name">{cert.name}</p>
                  <p className="pf-cert-issuer" style={{ color:cert.color }}>issuer: {cert.issuer}</p>
                </CyberCard>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══ PROJECTS ══ */}
          <section>
            <SectionHeader id="04" label="Projects" color="#fbbf24" rgb="251,191,36" />
            <div className="pf-projects">
              {PROJECTS.map(({ id, title, desc, impact, tags, icon: Icon, color, rgb, status }) => (
                <CyberCard key={title} color={color} rgb={rgb} className="pf-proj">
                  <div className="pf-proj-head">
                    <div className="pf-proj-icon-wrap" style={{ "--cat-color":color,"--cat-rgb":rgb } as React.CSSProperties}>
                      <Icon size={15} style={{ color, filter:`drop-shadow(0 0 5px ${color})` }} />
                    </div>
                    <span className="pf-proj-live">
                      <span className="pf-live-dot" /> {status}
                    </span>
                  </div>
                  <h3 className="pf-proj-title">{title}</h3>
                  <p className="pf-proj-desc">{desc}</p>
                  <div className="pf-proj-impact">
                    <Zap size={10} style={{ color:"#00ffff" }} />
                    <span style={{ fontSize:"0.67rem" }}>{impact}</span>
                  </div>
                  <div className="pf-proj-tags" style={{ "--cat-color":color,"--cat-rgb":rgb } as React.CSSProperties}>
                    {tags.map(tag => (
                      <span key={tag} className="pf-proj-tag">{tag}</span>
                    ))}
                    <ChevronRight size={11} style={{ color, marginLeft:"auto", alignSelf:"center" }} />
                  </div>
                </CyberCard>
              ))}
            </div>
          </section>

          <Divider />

          {/* ══ EDUCATION ══ */}
          <section>
            <SectionHeader id="05" label="Education" color="#a78bfa" rgb="167,139,250" />
            <div className="pf-edu-wrap">
              <div className="pf-edu-dot" />
              <CyberCard color="#a78bfa" rgb="167,139,250" className="pf-edu-card">
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap", marginBottom:"0.75rem" }}>
                  <div>
                    <p className="pf-edu-degree">Bachelor of Engineering — Computer Science</p>
                    <p className="pf-edu-school">Smt. Indira Gandhi College of Engineering</p>
                  </div>
                  <span style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.62rem", padding:"0.2rem 0.65rem", border:"1px solid rgba(52,211,153,0.45)", color:"#34d399", background:"rgba(52,211,153,0.07)", whiteSpace:"nowrap" }}>
                    <CheckCircle2 size={10} /> COMPLETED 🎓
                  </span>
                </div>
                <p className="pf-edu-note">
                  <span style={{ color:"#a78bfa" }}># </span>
                  specialization: <span style={{ color:"#a78bfa" }}>IoT · Cybersecurity · Blockchain</span>
                </p>
                <div className="pf-edu-tags">
                  {[
                    { label:"IoT",              c:"#00ffff", r:"0,255,255"   },
                    { label:"Cybersecurity",    c:"#34d399", r:"52,211,153"  },
                    { label:"Blockchain",       c:"#fbbf24", r:"251,191,36"  },
                    { label:"Networking",       c:"#34d399", r:"52,211,153"  },
                    { label:"Computer Science", c:"#a78bfa", r:"167,139,250" },
                  ].map(({ label, c, r }) => (
                    <span key={label} className="pf-edu-tag"
                      style={{ borderColor:`rgba(${r},0.3)`, color:c, background:`rgba(${r},0.06)` }}>
                      {label}
                    </span>
                  ))}
                </div>
              </CyberCard>
            </div>
          </section>

          <Divider />

          {/* ══ CONTACT ══ */}
          <section className="pf-contact">
            <div className="pf-contact-prompt">
              <span style={{ color:"rgba(0,255,255,0.5)" }}>┌──(root㉿kali)-[~]</span><br />
              <span style={{ color:"rgba(0,255,255,0.35)" }}>└─$&nbsp;</span>
              <span style={{ color:"#00ffff" }}>./connect.sh --target=recruiter --priority=HIGH</span>
            </div>

            <h2 className="pf-contact-title">
              <GlitchText text="LET'S CONNECT" />
            </h2>

            <p className="pf-contact-desc">
              <span style={{ color:"#00ffff" }}>&gt;</span> Fresh graduate seeking{" "}
              <span style={{ color:"#00ffff", fontWeight:"bold" }}>SOC_Analyst</span> &amp;{" "}
              <span style={{ color:"#a78bfa", fontWeight:"bold" }}>VAPT</span> roles.<br />
              <span style={{ color:"#00ffff" }}>&gt;</span> internships · contracts · full-time ·{" "}
              <span style={{ color:"#34d399" }}>responds_fast</span>
            </p>

            <div className="pf-contact-btns">
              {[
                { label:"./send_email",  href:"mailto:rushilvarade@gmail.com",             icon:Mail,     color:"#00ffff", rgb:"0,255,255",   primary:true,  dl:false },
                { label:"./linkedin",    href:"https://www.linkedin.com/in/rushil-varade", icon:Linkedin, color:"#a78bfa", rgb:"167,139,250", primary:false, dl:false },
                { label:"./github",      href:"https://github.com/rushilvarade1405",       icon:Github,   color:"#fbbf24", rgb:"251,191,36",  primary:false, dl:false },
                { label:"./get_resume",  href:"/RushilVarade_Resume.pdf",                  icon:FileDown, color:"#34d399", rgb:"52,211,153",  primary:false, dl:true  },
              ].map(({ label, href, icon: Icon, color, rgb, primary, dl }) => (
                <a key={label} href={href}
                  {...(dl ? { download:true } : {})}
                  {...(!href.startsWith("mailto") && !dl ? { target:"_blank", rel:"noopener noreferrer" } : {})}
                  className="pf-contact-btn"
                  style={{
                    borderColor: primary ? color : `rgba(${rgb},0.3)`,
                    color: primary ? color : `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.75)`,
                    background: primary ? `rgba(${rgb},0.08)` : "rgba(0,0,0,0.6)",
                    boxShadow: primary ? `0 0 18px rgba(${rgb},0.18)` : "none",
                  }}
                  onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=`rgba(${rgb},0.15)`; el.style.borderColor=color; el.style.color=color; el.style.boxShadow=`0 0 24px rgba(${rgb},0.28)`; }}
                  onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=primary?`rgba(${rgb},0.08)`:"rgba(0,0,0,0.6)"; el.style.borderColor=primary?color:`rgba(${rgb},0.3)`; el.style.color=primary?color:`rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.75)`; el.style.boxShadow=primary?`0 0 18px rgba(${rgb},0.18)`:"none"; }}>
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>

            {/* Email copy */}
            <div style={{ marginTop:"2rem" }}>
              <button
                onClick={() => handleCopy("rushilvarade@gmail.com")}
                style={{ background:"transparent", border:"1px solid rgba(0,255,255,0.15)", color:"rgba(0,255,255,0.3)", padding:"0.3rem 0.9rem", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", cursor:"pointer", letterSpacing:"0.08em", transition:"all 0.2s" }}>
                {copied ? "[ COPIED ✓ ]" : "[ COPY EMAIL ]"}
              </button>
            </div>

            <p className="pf-footer">
              rushil.varade · cybersecurity · 2025 · chmod 777 ./portfolio.sh
            </p>
          </section>

        </div>
      </div>
    </>
  );
}