import { cyberTools } from "../data/cyberTools";
import { platforms } from "../data/platforms";
import { motion, type Variants } from "framer-motion";
import { memo, useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Terminal, Shield, ExternalLink, AlertTriangle, X,
  Lock, Code, Layers, Cpu, Check as CheckIcon, ArrowRight, Wrench,
  Zap, Globe, Database, Eye, Key, Binary, Activity, Server,
  ChevronRight, Fingerprint,
} from "lucide-react";

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
    <div style={{ ...base, ...map[pos], borderColor: "rgba(0,255,231,0.6)", animation: "corner-flash 4s infinite" }} />
  );
};

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
    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-1 rounded-full bg-cyan-400" />
  </div>
);

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
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ===============================
   HELPERS
=============================== */
const levelConfig = {
  Beginner:     { color: "#34d399", tag: "BEGINNER" },
  Intermediate: { color: "#fbbf24", tag: "INTERMEDIATE" },
  Advanced:     { color: "#f87171", tag: "ADVANCED" },
};

const categoryIcons: Record<string, React.ElementType> = {
  "Network Security": Shield, "Web Security": Code, "Password Attacks": Lock,
  "Wireless Security": Shield, Exploitation: Terminal, Forensics: Eye,
  OSINT: Globe, Reconnaissance: Globe,
};

function getMainCategory(c: string) {
  if (c.toLowerCase().includes("ctf"))        return "CTF";
  if (c.toLowerCase().includes("web"))        return "Web Security";
  if (c.toLowerCase().includes("linux"))      return "Linux";
  if (c.toLowerCase().includes("blockchain")) return "Blockchain";
  if (c.toLowerCase().includes("crypto"))     return "Cryptography";
  return "Cyber";
}

function getDifficultyAccent(d: string) {
  if (d.includes("Beginner"))                          return "#34d399";
  if (d.includes("Intermediate"))                      return "#fbbf24";
  if (d.includes("Advanced") || d.includes("Expert")) return "#f87171";
  return "#a855f7";
}

/* ===============================
   TOOLKIT CATEGORIES DATA
=============================== */
const toolkitCategories = [
  { icon: Lock,        label: "Pen Testing",  count: 8,  accent: "#00ffe7" },
  { icon: Key,         label: "Passwords",    count: 2,  accent: "#f87171" },
  { icon: Binary,      label: "Encoding",     count: 6,  accent: "#a855f7" },
  { icon: Fingerprint, label: "Forensics",    count: 6,  accent: "#34d399" },
  { icon: Globe,       label: "Networking",   count: 11, accent: "#fbbf24" },
  { icon: Database,    label: "Storage",      count: 7,  accent: "#3b82f6" },
  { icon: Activity,    label: "Utilities",    count: 3,  accent: "#f472b6" },
];

const toolkitFeatures = [
  { icon: Server,  text: "No installation required" },
  { icon: Eye,     text: "100% client-side"         },
  { icon: Lock,    text: "Privacy-first"            },
  { icon: Zap,     text: "Instant execution"        },
];

const stats = [
  { val: 43,  suffix: "+",  label: "Total Tools"       },
  { val: 7,   suffix: "",   label: "Tool Categories"   },
  { val: 20,  suffix: "+",  label: "Platforms Listed"  },
  { val: 100, suffix: "%",  label: "Free to Use"       },
];
const STAT_COLORS = ["#00ffe7", "#3b82f6", "#a855f7", "#00ffe7"] as const;

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
   CYBER TOOLKIT CARD
=============================== */
const CyberToolkitCard = memo(() => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const totalTools = toolkitCategories.reduce((s, c) => s + c.count, 0);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-16"
    >
      <div
        onClick={() => navigate("/tools/toolkit")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative overflow-hidden rounded-2xl cursor-pointer"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(5,10,20,0.95) 100%)",
          border: `1px solid ${hovered ? "rgba(0,255,231,0.4)" : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered
            ? "0 0 60px rgba(0,255,231,0.12), inset 0 1px 0 rgba(0,255,231,0.15), 0 20px 80px rgba(0,0,0,0.6)"
            : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 30px rgba(0,0,0,0.4)",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Animated grid bg */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: hovered ? 0.04 : 0.015,
            backgroundImage: "linear-gradient(rgba(0,255,231,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,231,1) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Sweeping top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="h-full w-full"
            style={{ background: "linear-gradient(90deg, transparent, #00ffe7, transparent)" }}
          />
        </div>

        {/* Corner brackets */}
        {hovered && (
          <>
            <div className="absolute top-0 left-0  w-4 h-4 border-t-2 border-l-2" style={{ borderColor: "#00ffe7" }} />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: "#00ffe7" }} />
            <div className="absolute bottom-0 left-0  w-4 h-4 border-b-2 border-l-2" style={{ borderColor: "#00ffe7" }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: "#00ffe7" }} />
          </>
        )}

        {/* Right glow blob */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none transition-opacity duration-700"
          style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.06), transparent 70%)", opacity: hovered ? 1 : 0.4 }}
        />

        <div className="relative z-10 p-8 md:p-10">
          {/* TOP ROW */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            {/* Icon */}
            <div className="relative shrink-0">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-400"
                style={{
                  background: hovered ? "rgba(0,255,231,0.2)" : "rgba(0,255,231,0.08)",
                  border: `1px solid ${hovered ? "rgba(0,255,231,0.6)" : "rgba(0,255,231,0.2)"}`,
                  boxShadow: hovered ? "0 0 30px rgba(0,255,231,0.3)" : "none",
                }}
              >
                <Wrench size={28} style={{ color: "#00ffe7" }} />
              </div>
              <span className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-ping" style={{ animationDuration: "3s" }} />
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3
                  className="text-2xl md:text-3xl font-black tracking-tight transition-colors duration-300"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: hovered ? "#00ffe7" : "#fff" }}
                >
                  Cyber Toolkit
                </h3>
                <span
                  className="flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-bold"
                  style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ffe7", borderColor: "rgba(0,255,231,0.25)", background: "rgba(0,255,231,0.06)" }}
                >
                  <Zap size={9} style={{ color: "#00ffe7" }} />
                  {totalTools} Tools · Browser-Native
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                A full-stack security workbench running{" "}
                <span style={{ color: "#9ca3af" }}>entirely client-side</span> — zero installs, zero backend.
                Hash cracking, packet analysis, OSINT, web audits, encryption and more, right in your browser.
              </p>
            </div>

            {/* CTA */}
            <div className="shrink-0 self-start sm:self-center">
              <div
                className="relative flex items-center gap-2.5 px-5 py-3 rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: hovered ? "rgba(0,255,231,0.15)" : "rgba(0,255,231,0.06)",
                  border: `1px solid ${hovered ? "rgba(0,255,231,0.5)" : "rgba(0,255,231,0.2)"}`,
                  boxShadow: hovered ? "0 0 20px rgba(0,255,231,0.2)" : "none",
                }}
              >
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.72rem", color: "#00ffe7", letterSpacing: "0.1em", fontWeight: 700 }}>
                  OPEN TOOLKIT
                </span>
                <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={14} style={{ color: "#00ffe7" }} />
                </motion.span>
              </div>
            </div>
          </div>

          {/* CATEGORY PILLS */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 mb-8">
            {toolkitCategories.map(({ icon: Icon, label, count, accent }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-300"
                style={{
                  background: `${accent}08`,
                  borderColor: `${accent}20`,
                  transitionDelay: `${idx * 25}ms`,
                }}
              >
                <Icon size={14} style={{ color: accent }} />
                <span className="text-[10px] font-bold text-center leading-tight" style={{ fontFamily: "'Share Tech Mono', monospace", color: accent }}>
                  {label}
                </span>
                <span className="text-[9px]" style={{ fontFamily: "'Share Tech Mono', monospace", color: `${accent}60` }}>
                  {count} tools
                </span>
                <div className="absolute bottom-0 left-1/4 right-1/4 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
              </motion.div>
            ))}
          </div>

          {/* BOTTOM BAR */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-wrap gap-4">
              {toolkitFeatures.map(({ icon: FIcon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-xs transition-colors duration-300" style={{ color: hovered ? "#6b7280" : "#4b5563" }}>
                  <FIcon size={11} style={{ color: "#34d399" }} />
                  {text}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: hovered ? "rgba(0,255,231,0.4)" : "#374151" }}>
              <span>/tools/toolkit</span>
              <ChevronRight size={11} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
CyberToolkitCard.displayName = "CyberToolkitCard";

/* ===============================
   TOOL CATEGORY CARD
=============================== */
const ToolCategoryCard = memo(({ category, tools }: { category: string; tools: typeof cyberTools }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = categoryIcons[category] || Code;
  const first = tools[0];
  const lvl = levelConfig[first.level as keyof typeof levelConfig] ?? { color: "#a855f7", tag: "MIXED" };

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border: `1px solid ${hovered ? lvl.color + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? `0 0 30px ${lvl.color}15, inset 0 1px 0 ${lvl.color}20, 0 20px 60px rgba(0,0,0,0.5)`
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Sweep highlight */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-full w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${lvl.color}, transparent)` }}
        />
      </div>

      {hovered && (
        <>
          <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: lvl.color }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: lvl.color }} />
          <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l" style={{ borderColor: lvl.color }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: lvl.color }} />
        </>
      )}

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 30% 30%, ${lvl.color}10, transparent 65%)` }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? lvl.color : `${lvl.color}15`,
              boxShadow: hovered ? `0 0 20px ${lvl.color}50` : "none",
            }}
          >
            <Icon size={18} style={{ color: hovered ? "#000" : lvl.color }} />
          </div>
          <span
            className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded border"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: lvl.color, borderColor: `${lvl.color}30`, background: `${lvl.color}08` }}
          >
            {lvl.tag}
          </span>
        </div>

        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.82rem", letterSpacing: "0.05em", color: hovered ? lvl.color : "#fff" }}
        >
          {category}
        </h3>

        <div className="relative h-px mb-3 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: lvl.color }}
          />
        </div>

        <p className="text-xs mb-4 leading-relaxed transition-colors duration-300" style={{ color: hovered ? "#9ca3af" : "#6b7280" }}>
          {first.description || first.use}
        </p>

        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#4b5563" }}>
            Tools in Category
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tools.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs rounded border"
                style={{ fontFamily: "'Share Tech Mono', monospace", background: `${lvl.color}08`, borderColor: `${lvl.color}25`, color: lvl.color }}
              >
                {t.name}
              </span>
            ))}
            {tools.length > 3 && (
              <span className="px-2 py-0.5 text-xs rounded border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "#6b7280" }}>
                +{tools.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
ToolCategoryCard.displayName = "ToolCategoryCard";

/* ===============================
   PLATFORM CARD
=============================== */
const PlatformCard = memo(({ platform }: { platform: typeof platforms[0] }) => {
  const [hovered, setHovered] = useState(false);
  const accent = getDifficultyAccent(platform.difficulty);
  const isFree = platform.pricing === "Free";

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl"
      style={{
        background: "rgba(0,0,0,0.55)",
        border: `1px solid ${hovered ? accent + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 40px ${accent}12, 0 20px 60px rgba(0,0,0,0.6)` : "none",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <div
        className="absolute top-0 left-0 h-0.5 rounded-tl-xl"
        style={{ background: `linear-gradient(to right, ${accent}, ${accent}20)`, width: hovered ? "100%" : "40%", transition: "width 0.5s ease" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 50% 0%, ${accent}10, transparent 60%)`, transition: "opacity 0.5s" }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3
            className="font-bold transition-colors duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.88rem", letterSpacing: "0.04em", color: hovered ? accent : "#fff" }}
          >
            {platform.name}
          </h3>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded border"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color: isFree ? "#34d399" : platform.pricing === "Paid" ? "#fb923c" : "#60a5fa",
              borderColor: isFree ? "rgba(52,211,153,0.3)" : platform.pricing === "Paid" ? "rgba(251,146,60,0.3)" : "rgba(96,165,250,0.3)",
              background: isFree ? "rgba(52,211,153,0.06)" : platform.pricing === "Paid" ? "rgba(251,146,60,0.06)" : "rgba(96,165,250,0.06)",
            }}
          >
            {platform.pricing}
          </span>
        </div>

        <div className="relative h-px mb-3 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: accent }}
          />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded border"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: "#34d399", borderColor: "rgba(52,211,153,0.25)", background: "rgba(52,211,153,0.06)" }}
          >
            {getMainCategory(platform.category)}
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded border"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: accent, borderColor: `${accent}25`, background: `${accent}06` }}
          >
            {platform.difficulty}
          </span>
        </div>

        <p className="text-xs mb-4 leading-relaxed" style={{ color: hovered ? "#9ca3af" : "#6b7280" }}>
          {platform.description}
        </p>

        {/* Key Features */}
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#4b5563" }}>
            Key Features
          </p>
          <div className="flex flex-wrap gap-1.5">
            {platform.features.map((f: string, i: number) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "#6b7280" }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Gained */}
        <div className="mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#4b5563" }}>
            Skills Gained
          </p>
          <div className="flex flex-wrap gap-1.5">
            {platform.skillsGained.slice(0, 4).map((s: string, i: number) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded border"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ffe7", borderColor: "rgba(0,255,231,0.2)", background: "rgba(0,255,231,0.04)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Visit link */}
        <a
          href={platform.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-all duration-300"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.72rem",
            color: accent,
            borderBottom: `1px solid ${accent}40`,
            paddingBottom: "2px",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = accent; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = `${accent}40`; }}
        >
          VISIT PLATFORM
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
});
PlatformCard.displayName = "PlatformCard";

/* ===============================
   MAIN PAGE
=============================== */
export default function Tools() {
  const [activeTab, setActiveTab] = useState<"tools" | "platforms">("tools");
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

  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}    >
      <style>{GLOBAL_CSS}</style>

      {/* ── FIXED BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <ParticleField />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 18% 0%,   rgba(0,255,231,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 82% 55%,  rgba(59,130,246,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 50%)" }} />
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scan-animate pointer-events-none" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.72) 100%)" }} />
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-24">

        {/* ======================
            HERO
        ====================== */}
        <motion.section variants={stagger} initial="hidden" animate="visible" className="mb-24">

          {/* Eyebrow */}
          <motion.div variants={fadeLeft} className="flex items-center gap-3 mb-8">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded border"
              style={{ borderColor: "rgba(0,255,231,0.25)", background: "rgba(0,255,231,0.05)", boxShadow: "0 0 20px rgba(0,255,231,0.07)" }}
            >
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-cyan-400 text-xs tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                ~/tools — ARSENAL LOADED
              </span>
            </div>
            <div className="h-px flex-1 max-w-[200px]" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.4), transparent)" }} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white block mb-2">Cybersecurity</span>
            <span className="relative inline-block">
              <span
                className="neon-text"
                style={{ background: "linear-gradient(135deg, #00ffe7 0%, #3b82f6 50%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Tools
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full block"
                style={{ background: "linear-gradient(90deg, #00ffe7, #3b82f6, #a855f7)" }}
              />
            </span>
            <span className="text-white block mt-2">&amp; Platforms</span>
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
                Specialized software applications designed to safeguard systems, networks, and data from
                cyber threats. From scanning to exploitation,{" "}
                <span className="text-white font-semibold">every professional tool in one place.</span>
              </p>
            </div>
          </motion.div>

          {/* Hashtags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-16">
            {["penetration-testing", "network-security", "osint", "forensics", "ethical-hacking"].map(tag => (
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

          {/* Stat cards */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="relative rounded-xl p-4 overflow-hidden border border-white/6 bg-black/40"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, ${STAT_COLORS[i]}, transparent)` }} />
                <div className="text-3xl font-black mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: STAT_COLORS[i], textShadow: `0 0 20px ${STAT_COLORS[i]}40` }}>
                  <Counter end={s.val} suffix={s.suffix} />
                </div>
                <div className="text-gray-600 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ======================
            STICKY TABS
        ====================== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="sticky top-4 z-50 flex justify-center mb-16"
        >
          <div
            className="relative inline-flex items-center gap-2 p-1.5 rounded-xl border"
            style={{ background: "rgba(2,5,9,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <motion.div
              layoutId="tabPill"
              className="absolute top-1.5 bottom-1.5 rounded-lg"
              style={{
                left:  activeTab === "tools" ? "6px" : "50%",
                right: activeTab === "tools" ? "50%" : "6px",
                background: "rgba(0,255,231,0.08)",
                border: "1px solid rgba(0,255,231,0.3)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            {(["tools", "platforms"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => scrollToTab(tab)}
                className="relative z-10 flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-lg text-sm font-bold transition-colors duration-200"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: activeTab === tab ? "#00ffe7" : "#4b5563",
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                }}
              >
                {tab === "tools" ? <Cpu size={14} /> : <Layers size={14} />}
                <span className="hidden sm:inline">{tab === "tools" ? "SECURITY TOOLS" : "LEARNING PLATFORMS"}</span>
                <span className="sm:hidden">{tab === "tools" ? "TOOLS" : "PLATFORMS"}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ======================
            SECTION 1 — TOOLKIT + TOOLS
        ====================== */}
        <div ref={toolsRef} className="scroll-mt-20 mb-28">
          {/* Toolkit Card */}
          <CyberToolkitCard />

          {/* Types of CyberTools */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="01" label="Tool Categories" />
            <div className="flex items-end justify-between">
              <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Types of <span style={{ color: "#00ffe7" }}>CyberTools</span>
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#555" }}>
                <span>{Object.keys(groupedTools).length} CATEGORIES</span>
                <div className="w-16 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {Object.entries(groupedTools).map(([category, tools]) => (
              <ToolCategoryCard key={category} category={category} tools={tools} />
            ))}
          </motion.div>
        </div>

        {/* ======================
            DIVIDER
        ====================== */}
        <div className="relative my-16 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.3), rgba(59,130,246,0.3), transparent)" }} />
          </div>
          <div
            className="relative flex items-center gap-2 px-6 py-2 rounded-lg border"
            style={{ background: "rgba(2,5,9,0.95)", borderColor: "rgba(0,255,231,0.2)" }}
          >
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <Layers size={14} style={{ color: "#00ffe7" }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "#00ffe7", letterSpacing: "0.15em" }}>
              LEARNING PLATFORMS
            </span>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
        </div>

        {/* ======================
            SECTION 2 — PLATFORMS
        ====================== */}
        <div ref={platformsRef} className="scroll-mt-20 mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="02" label="Platforms" />
            <div className="flex items-end justify-between">
              <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Learning <span style={{ color: "#00ffe7" }}>Platforms</span>
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#555" }}>
                <span>{platforms.length} PLATFORMS</span>
                <div className="w-16 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </div>
            <p className="mt-2 text-sm" style={{ color: "#4b5563", fontFamily: "'Share Tech Mono', monospace" }}>
              Curated hands-on labs and CTF environments for skill building
            </p>
          </motion.div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {platforms.map((p, i) => <PlatformCard key={i} platform={p} />)}
          </motion.div>
        </div>

        {/* ======================
            ETHICAL USE WARNING
        ====================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div
            className="relative overflow-hidden rounded-2xl border-2 p-8"
            style={{ background: "linear-gradient(135deg, rgba(255,45,85,0.08), rgba(0,0,0,0.8))", borderColor: "rgba(255,45,85,0.3)", boxShadow: "0 8px 40px rgba(255,45,85,0.15)" }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(255,45,85,0.6), transparent)" }} />
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(255,45,85,0.06), transparent 70%)" }} />

            <div className="relative flex items-start gap-4 mb-5">
              <div className="text-5xl select-none">⚠️</div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-2xl" style={{ fontFamily: "'Orbitron', sans-serif", color: "#ff2d55" }}>
                    Ethical Use &amp; Legal Disclaimer
                  </h3>
                  <span
                    className="px-3 py-1 rounded border text-xs font-bold"
                    style={{ fontFamily: "'Share Tech Mono', monospace", color: "#ff2d55", borderColor: "rgba(255,45,85,0.35)", background: "rgba(255,45,85,0.08)" }}
                  >
                    CRITICAL
                  </span>
                </div>
                <div className="h-0.5 w-24 rounded-full" style={{ background: "linear-gradient(to right, #ff2d55, #f97316)" }} />
              </div>
            </div>

            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckIcon size={16} style={{ color: "#34d399", marginTop: 2, flexShrink: 0 }} />
                <p>Provided for <span className="text-white font-semibold">educational purposes</span> and <span className="text-white font-semibold">authorized security testing</span> only.</p>
              </div>
              <div className="flex items-start gap-3">
                <X size={16} style={{ color: "#f87171", marginTop: 2, flexShrink: 0 }} />
                <p>Unauthorized use is <span style={{ color: "#ff2d55", fontFamily: "'Share Tech Mono', monospace", fontWeight: 700 }}>ILLEGAL</span> and may result in <span style={{ color: "#ff2d55" }}>criminal prosecution</span>.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg border" style={{ background: "rgba(0,0,0,0.3)", borderColor: "rgba(255,45,85,0.15)" }}>
                <div>
                  <h4 className="font-semibold mb-2 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#34d399" }}>✓ ACCEPTABLE USES</h4>
                  <ul className="space-y-1 text-xs text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    {["Learning in controlled lab environments", "Testing systems you own or have written permission", "Bug bounty programs with proper authorization", "Security research with ethical approval"].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5"><span style={{ color: "#34d399" }}>•</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#ff2d55" }}>✗ PROHIBITED</h4>
                  <ul className="space-y-1 text-xs text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    {["Unauthorized access to any system or network", "Exploiting systems without explicit written permission", "Distributing malware or malicious tools", "Stealing or leaking sensitive data or credentials"].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5"><span style={{ color: "#ff2d55" }}>•</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="p-4 rounded-lg border-l-2"
                style={{ background: "rgba(255,45,85,0.04)", borderLeftColor: "#ff2d55" }}
              >
                <div className="flex items-start gap-3">
                  <Lock size={16} style={{ color: "#ff2d55", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#ff2d55", fontFamily: "'Share Tech Mono', monospace" }}>
                      ALWAYS obtain written authorization before security assessments.
                    </p>
                    <p className="text-xs italic text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                      Practice on HackTheBox, TryHackMe, or PentesterLab.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ======================
            FOOTER CTA
        ====================== */}
        <motion.footer variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div
            className="relative overflow-hidden rounded-2xl border border-white/8 p-14 text-center"
            style={{ background: "linear-gradient(135deg, rgba(0,255,231,0.04) 0%, rgba(0,0,0,0.8) 50%, rgba(168,85,247,0.04) 100%)", boxShadow: "0 0 80px rgba(0,255,231,0.05), inset 0 1px 0 rgba(255,255,255,0.06)" }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />

            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              className="absolute top-0 left-0 h-px w-1/3"
              style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.8), transparent)" }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.05), transparent 70%)" }} />

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 mb-8"
              >
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-xs text-cyan-400 tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  status: all tools online
                </span>
              </motion.div>

              <p className="text-5xl sm:text-6xl font-black mb-4 flicker" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                <span className="text-white">Scan. </span>
                <span className="text-white">Probe. </span>
                <span
                  className="neon-text"
                  style={{ background: "linear-gradient(135deg, #00ffe7, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  Secure.
                </span>
              </p>

              <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm leading-relaxed" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                The right tools, in the right hands, with the right knowledge. Build your security
                skillset one tool at a time.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => { toolsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg font-black transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #00ffe7 0%, #3b82f6 100%)", color: "#000", fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", boxShadow: "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(0,255,231,0.5), 0 0 100px rgba(0,255,231,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)"; }}
                >
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                  EXPLORE TOOLS
                </button>

                <button
                  onClick={() => { platformsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all duration-300"
                  style={{ border: "1px solid rgba(0,255,231,0.2)", color: "#00ffe7", background: "rgba(0,255,231,0.03)", fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,231,0.5)"; el.style.background = "rgba(0,255,231,0.08)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,231,0.2)"; el.style.background = "rgba(0,255,231,0.03)"; }}
                >
                  VIEW PLATFORMS →
                </button>
              </div>
            </div>
          </div>
        </motion.footer>

      </div>
    </motion.div>
  );
}