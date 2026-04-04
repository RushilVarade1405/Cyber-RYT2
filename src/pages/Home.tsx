import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { Terminal, ChevronRight, Zap, ArrowUpRight, Shield, Lock, Cpu, Globe, BookOpen } from "lucide-react";
import MatrixRain from "../components/MatrixRain"; // ← your existing component

/* ===============================
   GLOBAL STYLES
=============================== */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  :root {
    --cyan: #00ffe7;
    --cyan-dim: #00ffe740;
    --blue: #3b82f6;
    --purple: #a855f7;
    --red: #ff2d55;
    --bg: #020509;
  }

  @keyframes scanline {
    0%   { transform: translateY(-100vh); }
    100% { transform: translateY(100vh); }
  }
  @keyframes flicker {
    0%,100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.4; }
    94% { opacity: 1; }
    96% { opacity: 0.6; }
    97% { opacity: 1; }
  }
  @keyframes neon-pulse {
    0%,100% { text-shadow: 0 0 4px var(--cyan), 0 0 10px var(--cyan), 0 0 20px var(--cyan-dim); }
    50%      { text-shadow: 0 0 8px var(--cyan), 0 0 20px var(--cyan), 0 0 40px var(--cyan-dim), 0 0 60px var(--cyan-dim); }
  }
  @keyframes border-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes line-extend {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes corner-flash {
    0%,90%,100% { opacity: 0; }
    92%,98%     { opacity: 1; }
  }

  .neon-text    { animation: neon-pulse 3s ease-in-out infinite; }
  .flicker      { animation: flicker 8s infinite; }
  .scan-animate { animation: scanline 8s linear infinite; }
`;

/* ===============================
   PARTICLE FIELD
=============================== */
const ParticleField = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4,
      color: Math.random() > 0.5 ? "#00ffe7" : Math.random() > 0.5 ? "#3b82f6" : "#a855f7",
      opacity: Math.random() * 0.5 + 0.15,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,231,${(1 - dist / 110) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  );
});
ParticleField.displayName = "ParticleField";

/* ===============================
   TYPING TERMINAL
=============================== */
const TypingTerminal = () => {
  const lines = [
    { text: "$ sudo nmap -sV --script vuln target.com", color: "#00ffe7" },
    { text: "> Scanning 65535 ports...",                 color: "#555"    },
    { text: "> 22/tcp  open  ssh     OpenSSH 8.9",      color: "#a855f7" },
    { text: "> 80/tcp  open  http    Apache 2.4.52",    color: "#a855f7" },
    { text: "> [VULN] CVE-2023-44487 detected!",        color: "#ff2d55" },
    { text: "> Report saved → /reports/scan_001.txt",   color: "#00ffe7" },
  ];
  const [visible,   setVisible]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [displayed, setDisplayed] = useState<string[]>([]);

  useEffect(() => {
    if (visible >= lines.length) {
      const t = setTimeout(() => { setVisible(0); setCharIdx(0); setDisplayed([]); }, 3000);
      return () => clearTimeout(t);
    }
    const target = lines[visible].text;
    if (charIdx < target.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 26);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayed(d => [...d, target]);
      setVisible(v => v + 1);
      setCharIdx(0);
    }, 180);
    return () => clearTimeout(t);
  }, [visible, charIdx]);

  return (
    <div
      className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden"
      style={{ boxShadow: "0 0 40px rgba(0,255,231,0.07), inset 0 1px 0 rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-xs text-gray-600 ml-2">terminal — bash</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[10px] text-green-400">LIVE</span>
        </div>
      </div>
      <div className="p-5 font-mono text-xs space-y-1.5 min-h-[160px]">
        {displayed.map((line, i) => (
          <div key={i} style={{ color: lines[i].color }} className="opacity-80">{line}</div>
        ))}
        {visible < lines.length && (
          <div style={{ color: lines[visible].color }}>
            {lines[visible].text.slice(0, charIdx)}
            <span className="inline-block w-2 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

/* ===============================
   CYBER CORNER BRACKETS
=============================== */
const CyberCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const base: React.CSSProperties = { position: "absolute", width: 20, height: 20 };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 0,    left: 0,  borderTop:    "2px solid", borderLeft:  "2px solid" },
    tr: { top: 0,    right: 0, borderTop:    "2px solid", borderRight: "2px solid" },
    bl: { bottom: 0, left: 0,  borderBottom: "2px solid", borderLeft:  "2px solid" },
    br: { bottom: 0, right: 0, borderBottom: "2px solid", borderRight: "2px solid" },
  };
  return (
    <div
      style={{
        ...base, ...map[pos],
        borderColor: "rgba(0,255,231,0.6)",
        animation: "corner-flash 4s infinite",
      }}
    />
  );
};

/* ===============================
   ANIMATED COUNTER
=============================== */
const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let val = 0;
      const step = end / 60;
      const id = setInterval(() => {
        val += step;
        if (val >= end) { setCount(end); clearInterval(id); }
        else setCount(Math.floor(val));
      }, 16);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ===============================
   ANIMATION VARIANTS
=============================== */
const pageFade: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};
const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11 } },
};

/* ===============================
   TYPES
=============================== */
interface Feature {
  title: string; text: string; path: string;
  accent: string; num: string; icon: React.ReactNode; tag: string;
}
interface RoadmapLink { label: string; path: string; }
interface RoadmapStep {
  step: string; title: string; text: string; accent: string; num: string;
  link?: RoadmapLink; links?: RoadmapLink[];
}

/* ===============================
   DATA
=============================== */
const features: Feature[] = [
  { title: "Linux Foundations",   text: "Master Linux from scratch: terminal usage, directory structure, permissions, users, processes, networking, and real-world commands used by security professionals.", path: "/linux",        accent: "#00ffe7", num: "01", icon: <Terminal className="w-5 h-5" />, tag: "CORE"   },
  { title: "Cybersecurity Tools", text: "Hands-on exploration of industry-standard tools like Nmap, Burp Suite, Metasploit, Wireshark, Nikto, and more with explanations and use-cases.",                path: "/tools",        accent: "#3b82f6", num: "02", icon: <Shield  className="w-5 h-5" />, tag: "TOOLS"  },
  { title: "Cyber Laws & Ethics", text: "Learn cyber crimes, IT Act, digital evidence, ethical hacking boundaries, and legal responsibilities every cybersecurity student must know.",                    path: "/cyber-laws",   accent: "#a855f7", num: "03", icon: <BookOpen className="w-5 h-5" />, tag: "LAW"    },
  { title: "Cryptography",        text: "Understand encryption, hashing, AES, RSA, digital signatures, certificates, and how cryptography protects modern systems.",                                     path: "/cryptography", accent: "#00ffe7", num: "04", icon: <Lock    className="w-5 h-5" />, tag: "CRYPTO" },
  { title: "Blockchain",          text: "Learn blockchain fundamentals, consensus mechanisms, smart contracts, wallets, and real-world applications beyond cryptocurrency.",                              path: "/blockchain",   accent: "#3b82f6", num: "05", icon: <Cpu     className="w-5 h-5" />, tag: "WEB3"   },
  { title: "Practice Platforms",  text: "Guided learning paths for TryHackMe, Hack The Box, labs, and platforms to apply theory into real hands-on cybersecurity practice.",                             path: "/tools",    accent: "#a855f7", num: "06", icon: <Globe   className="w-5 h-5" />, tag: "LABS"   },
];

const roadmap: RoadmapStep[] = [
  { step: "Phase 1", title: "Foundations & Linux",         text: "Build a strong base by learning Linux, terminal commands, file systems, permissions, users, networking basics, and how operating systems work.", accent: "#00ffe7", num: "01", link:  { label: "Start with Linux →", path: "/linux" } },
  { step: "Phase 2", title: "Security Tools & Techniques", text: "Move into cybersecurity tools, scanning, enumeration, vulnerabilities, traffic analysis, and understanding how attacks actually work.",          accent: "#3b82f6", num: "02", link:  { label: "Explore Tools →",    path: "/tools" } },
  { step: "Phase 3", title: "Advanced Concepts",           text: "Dive into cryptography, blockchain, cyber laws, and ethical responsibilities to become a well-rounded cybersecurity learner.",                    accent: "#a855f7", num: "03", links: [{ label: "Cryptography →", path: "/cryptography" }, { label: "Blockchain →", path: "/blockchain" }] },
];

const stats = [
  { val: 6,   suffix: "+",     label: "Learning Modules"  },
  { val: 50,  suffix: "+",     label: "Tools Covered"     },
  { val: 100, suffix: "%",     label: "Beginner Friendly" },
  { val: 0,   suffix: " Cost", label: "Always Free"       },
];
const STAT_COLORS = ["#00ffe7", "#3b82f6", "#a855f7", "#00ffe7"] as const;

const targetAudience = [
  { text: "Students starting their journey in cybersecurity",     icon: "🎓", accent: "#00ffe7" },
  { text: "Beginners confused by complex tutorials and jargon",   icon: "🔰", accent: "#3b82f6" },
  { text: "Diploma, engineering, and IT students",                icon: "💻", accent: "#a855f7" },
  { text: "Anyone who wants a structured and clear learning path", icon: "🗺️", accent: "#6366f1" },
];

/* ===============================
   SECTION LABEL
=============================== */
const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-xs text-cyan-400/60 tracking-widest">[{num}]</span>
    <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400/80" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
      {label}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-1 h-1 rounded-full bg-cyan-400"
    />
  </div>
);

/* ===============================
   FEATURE CARD
=============================== */
const FeatureCard = memo(({ feature }: { feature: Feature }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      style={{
        background:  "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border:      `1px solid ${hovered ? feature.accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow:   hovered
          ? `0 0 30px ${feature.accent}15, inset 0 1px 0 ${feature.accent}20, 0 20px 60px rgba(0,0,0,0.5)`
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Sweeping top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-full w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
        />
      </div>

      {/* Corner brackets */}
      {hovered && (
        <>
          <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: feature.accent }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: feature.accent }} />
          <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l" style={{ borderColor: feature.accent }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: feature.accent }} />
        </>
      )}

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity:    hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 30% 30%, ${feature.accent}10, transparent 65%)`,
        }}
      />

      {/* Watermark number */}
      <div
        className="absolute -right-2 -bottom-4 font-black leading-none pointer-events-none select-none"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize:   "5rem",
          color:      feature.accent,
          opacity:    hovered ? 0.08 : 0.025,
          transition: "opacity 0.4s",
        }}
      >
        {feature.num}
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: hovered ? feature.accent : `${feature.accent}15`,
              color:      hovered ? "#000" : feature.accent,
              boxShadow:  hovered ? `0 0 20px ${feature.accent}50` : "none",
              transition: "all 0.3s",
            }}
          >
            {feature.icon}
          </div>
          <span
            className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded border"
            style={{
              fontFamily:  "'Share Tech Mono', monospace",
              color:       feature.accent,
              borderColor: `${feature.accent}30`,
              background:  `${feature.accent}08`,
            }}
          >
            {feature.tag}
          </span>
        </div>

        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{
            fontFamily:    "'Orbitron', sans-serif",
            fontSize:      "0.88rem",
            letterSpacing: "0.05em",
            color:         hovered ? feature.accent : "#fff",
          }}
        >
          {feature.title}
        </h3>

        <div className="relative h-px mb-3 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: feature.accent }}
          />
        </div>

        <p
          className="text-sm mb-5 leading-relaxed transition-colors duration-300"
          style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
        >
          {feature.text}
        </p>

        <Link
          to={feature.path}
          className="inline-flex items-center gap-1.5 font-medium transition-all duration-200"
          style={{ color: feature.accent, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem" }}
        >
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.span>
          EXPLORE MODULE
          <ArrowUpRight className="w-3 h-3 opacity-60" />
        </Link>
      </div>
    </motion.article>
  );
});
FeatureCard.displayName = "FeatureCard";

/* ===============================
   ROADMAP CARD
=============================== */
const RoadmapCard = memo(({ step }: { step: RoadmapStep }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl"
      style={{
        background: "rgba(0,0,0,0.55)",
        border:     `1px solid ${hovered ? step.accent + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow:  hovered ? `0 0 40px ${step.accent}12, 0 20px 60px rgba(0,0,0,0.6)` : "none",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Spinning conic glow */}
      <div
        className="absolute -inset-px rounded-xl pointer-events-none overflow-hidden"
        style={{
          opacity:    hovered ? 1 : 0,
          background: `conic-gradient(from 0deg, transparent 0deg, ${step.accent}30 60deg, transparent 120deg)`,
          animation:  hovered ? "border-spin 4s linear infinite" : "none",
          transition: "opacity 0.4s",
        }}
      />

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 h-0.5 rounded-tl-xl"
        style={{
          background: `linear-gradient(to right, ${step.accent}, ${step.accent}20)`,
          width:      hovered ? "100%" : "40%",
          transition: "width 0.5s ease",
        }}
      />

      {/* Watermark */}
      <div
        className="absolute -right-4 top-1/2 -translate-y-1/2 font-black pointer-events-none select-none leading-none"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize:   "8rem",
          color:      step.accent,
          opacity:    hovered ? 0.06 : 0.025,
          transition: "opacity 0.4s",
        }}
      >
        {step.num}
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity:    hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${step.accent}12, transparent 60%)`,
          transition: "opacity 0.5s",
        }}
      />

      <div className="relative z-10 p-7">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded border"
            style={{
              fontFamily:  "'Share Tech Mono', monospace",
              background:  `${step.accent}12`,
              borderColor: `${step.accent}40`,
              color:       step.accent,
              boxShadow:   hovered ? `0 0 12px ${step.accent}40` : "none",
              transition:  "box-shadow 0.3s",
            }}
          >
            <motion.span
              animate={{ scale: hovered ? [1, 1.5, 1] : 1 }}
              transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: step.accent }}
            />
            {step.step}
          </span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${step.accent}30, transparent)` }} />
        </div>

        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize:   "1rem",
            color:      hovered ? step.accent : "#fff",
          }}
        >
          {step.title}
        </h3>

        <div className="relative h-px mb-4 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: step.accent }}
          />
        </div>

        <p
          className="text-sm mb-6 leading-relaxed transition-colors duration-300"
          style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
        >
          {step.text}
        </p>

        {step.link && (
          <Link
            to={step.link.path}
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded border transition-all duration-300"
            style={{
              fontFamily:  "'Share Tech Mono', monospace",
              borderColor: `${step.accent}50`,
              color:       hovered ? "#000" : step.accent,
              background:  hovered ? step.accent : "transparent",
            }}
          >
            {step.link.label}
          </Link>
        )}

        {step.links && (
          <div className="flex gap-2.5 flex-wrap">
            {step.links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded border transition-all duration-300"
                style={{
                  fontFamily:  "'Share Tech Mono', monospace",
                  borderColor: `${step.accent}50`,
                  color:       step.accent,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = step.accent; el.style.color = "#000"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = step.accent; }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
});
RoadmapCard.displayName = "RoadmapCard";

/* ===============================
   HOME PAGE
=============================== */
export default function Home() {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}
    >
      <style>{GLOBAL_CSS}</style>

      {/* ── FIXED BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {/* ✅ Your existing MatrixRain component from src/components/MatrixRain.tsx */}
        <MatrixRain />

        {/* Particle network */}
        <ParticleField />

        {/* Radial colour glows */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 18% 0%,   rgba(0,255,231,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 82% 55%,  rgba(59,130,246,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 50%)" }} />

        {/* Sweeping scanline */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scan-animate pointer-events-none" />

        {/* Edge vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.72) 100%)" }} />
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-24">

        {/* ======================
            HERO
        ====================== */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-32"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeLeft} className="flex items-center gap-3 mb-8">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded border"
              style={{
                borderColor: "rgba(0,255,231,0.25)",
                background:  "rgba(0,255,231,0.05)",
                boxShadow:   "0 0 20px rgba(0,255,231,0.07)",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
              <span className="text-cyan-400 text-xs tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                ~/home — SYSTEM ONLINE
              </span>
            </div>
            <div
              className="h-px flex-1 max-w-[200px]"
              style={{ background: "linear-gradient(to right, rgba(0,255,231,0.4), transparent)", animation: "line-extend 1s ease-out forwards" }}
            />
          </motion.div>

          {/* ✅ Heading: plain text — NO glitch wrapper, NO ::before/::after pseudo elements */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white block mb-2">Learn Cyber</span>
            <span className="text-white">Security{" "}</span>
            <span className="relative inline-block">
              <span
                className="neon-text"
                style={{
                  background:           "linear-gradient(135deg, #00ffe7 0%, #3b82f6 50%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor:  "transparent",
                  backgroundClip:       "text",
                }}
              >
                Cyber_World
              </span>
              {/* Animated gradient underbar */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full block"
                style={{ background: "linear-gradient(90deg, #00ffe7, #3b82f6, #a855f7)" }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div variants={fadeUp} className="max-w-2xl mb-10">
            <div className="flex gap-4 items-start">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-0.5 rounded-full shrink-0 mt-1"
                style={{ background: "linear-gradient(to bottom, #00ffe7, transparent)" }}
              />
              <p className="text-lg leading-relaxed" style={{ color: "#7a8899" }}>
                Cyber_World is a beginner-first platform built to help students understand
                cybersecurity — from Linux and tools to cryptography, blockchain, and cyber laws —{" "}
                <span className="text-white font-semibold">without confusion or unnecessary complexity.</span>
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex gap-4 flex-wrap mb-8">
            <Link
              to="/start"
              className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-black overflow-hidden transition-all duration-300"
              style={{
                background:    "linear-gradient(135deg, #00ffe7, #3b82f6)",
                fontFamily:    "'Orbitron', sans-serif",
                fontSize:      "0.75rem",
                letterSpacing: "0.1em",
                boxShadow:     "0 0 30px rgba(0,255,231,0.3), 0 0 60px rgba(0,255,231,0.1)",
              }}
            >
              <motion.div
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 w-1/2"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
              />
              <Zap className="w-4 h-4" />
              START LEARNING FREE
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all duration-300"
              style={{
                border:        "1px solid rgba(0,255,231,0.2)",
                color:         "#00ffe7",
                background:    "rgba(0,255,231,0.03)",
                fontFamily:    "'Orbitron', sans-serif",
                fontSize:      "0.75rem",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,231,0.5)"; el.style.background = "rgba(0,255,231,0.08)"; el.style.boxShadow = "0 0 20px rgba(0,255,231,0.1)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,231,0.2)"; el.style.background = "rgba(0,255,231,0.03)"; el.style.boxShadow = "none"; }}
            >
              WHY CYBER_WORLD?
            </Link>
          </motion.div>

          {/* Hashtags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {["beginner-friendly", "no-prior-experience", "practical-approach", "open-source"].map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded border border-white/6 bg-white/[0.02] text-gray-600 cursor-default transition-all duration-200"
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#00ffe7"; el.style.borderColor = "rgba(0,255,231,0.4)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = ""; el.style.borderColor = ""; }}
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Terminal + stat cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid lg:grid-cols-5 gap-6 items-start"
          >
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <TypingTerminal />
            </motion.div>

            <motion.div variants={fadeUp} className="lg:col-span-2 grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="relative rounded-xl p-4 overflow-hidden border border-white/6 bg-black/40"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(to right, ${STAT_COLORS[i]}, transparent)` }}
                  />
                  <div
                    className="text-3xl font-black mb-1"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color:      STAT_COLORS[i],
                      textShadow: `0 0 20px ${STAT_COLORS[i]}40`,
                    }}
                  >
                    <Counter end={s.val} suffix={s.suffix} />
                  </div>
                  <div className="text-gray-600 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ======================
            WHO IS IT FOR
        ====================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-28"
        >
          <SectionLabel num="01" label="Target Audience" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Who is this <span style={{ color: "#00ffe7" }}>platform for?</span>
          </h2>

          <div
            className="relative overflow-hidden rounded-2xl p-8 border border-white/6"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.5), rgba(59,130,246,0.3), transparent)" }} />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-3"
            >
              {targetAudience.map(item => (
                <motion.div
                  key={item.text}
                  variants={fadeUp}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/4 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 cursor-default transition-all duration-300"
                >
                  <div className="text-2xl select-none">{item.icon}</div>
                  <div className="flex-1">
                    <div
                      className="w-4 h-0.5 rounded mb-1.5 transition-all duration-300 group-hover:w-full"
                      style={{ background: item.accent }}
                    />
                    <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{item.text}</span>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: item.accent }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ======================
            FEATURE MODULES
        ====================== */}
        <section className="mb-28" aria-label="Platform features">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="02" label="What We Cover" />
            <div className="flex items-end justify-between">
              <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Platform <span style={{ color: "#00ffe7" }}>Modules</span>
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#555" }}>
                <span>06 MODULES</span>
                <div className="w-16 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map(f => <FeatureCard key={f.path} feature={f} />)}
          </motion.div>
        </section>

        {/* ======================
            ROADMAP
        ====================== */}
        <section className="mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="03" label="Learning Path" />
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Your <span style={{ color: "#00ffe7" }}>Roadmap</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div
              className="absolute top-[2.5rem] left-0 right-0 h-px hidden lg:block overflow-hidden"
              style={{ background: "linear-gradient(to right, rgba(0,255,231,0.25), rgba(59,130,246,0.25), rgba(168,85,247,0.25))" }}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 h-full w-1/4"
                style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.7), transparent)" }}
              />
            </div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-5 md:grid-cols-3 relative z-10"
            >
              {roadmap.map(step => <RoadmapCard key={step.step} step={step} />)}
            </motion.div>
          </div>
        </section>

        {/* ======================
            FOOTER CTA
        ====================== */}
        <motion.footer
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-white/8 p-14 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,255,231,0.04) 0%, rgba(0,0,0,0.8) 50%, rgba(168,85,247,0.04) 100%)",
              boxShadow:  "0 0 80px rgba(0,255,231,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />

            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              className="absolute top-0 left-0 h-px w-1/3"
              style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.8), transparent)" }}
            />

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.05), transparent 70%)" }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 mb-8"
              >
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
                <span className="text-xs text-cyan-400 tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  status: all systems online
                </span>
              </motion.div>

              <p
                className="text-5xl sm:text-6xl font-black mb-4 flicker"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span className="text-white">Learn. </span>
                <span className="text-white">Hack. </span>
                <span
                  className="neon-text"
                  style={{
                    background:           "linear-gradient(135deg, #00ffe7, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor:  "transparent",
                    backgroundClip:       "text",
                  }}
                >
                  Secure.
                </span>
              </p>

              <p
                className="text-gray-500 max-w-md mx-auto mb-10 text-sm leading-relaxed"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Cybersecurity may look complex at first — but with a clear roadmap,
                practical explanations, and consistent effort, anyone can master it.
              </p>

              <Link
                to="/start"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-lg font-black transition-all duration-300"
                style={{
                  background:    "linear-gradient(135deg, #00ffe7 0%, #3b82f6 100%)",
                  color:         "#000",
                  fontFamily:    "'Orbitron', sans-serif",
                  fontSize:      "0.75rem",
                  letterSpacing: "0.15em",
                  boxShadow:     "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(0,255,231,0.5), 0 0 100px rgba(0,255,231,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)"; }}
              >
                <Zap className="w-4 h-4" />
                BEGIN YOUR JOURNEY
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
              </Link>
            </div>
          </div>
        </motion.footer>

      </div>
    </motion.div>
  );
}