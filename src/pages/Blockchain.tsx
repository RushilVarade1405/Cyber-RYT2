import { blockchainData } from "../data/blockchain";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { Cpu, Lock, FileCode, ChevronRight, ArrowUpRight, ExternalLink, Zap } from "lucide-react";
import MatrixRain from "../components/MatrixRain";

/* ===============================
   GLOBAL STYLES (matches Home.tsx)
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
  @keyframes data-stream {
    0%   { transform: translateY(-100%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  @keyframes hex-rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .neon-text    { animation: neon-pulse 3s ease-in-out infinite; }
  .flicker      { animation: flicker 8s infinite; }
  .scan-animate { animation: scanline 8s linear infinite; }
`;

/* ===============================
   PARTICLE FIELD (identical to Home.tsx)
=============================== */
const ParticleField = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
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
      style={{ opacity: 0.55 }}
    />
  );
});
ParticleField.displayName = "ParticleField";

/* ===============================
   CYBER CORNER BRACKETS (identical to Home.tsx)
=============================== */
const CyberCorner = ({ pos, color = "rgba(0,255,231,0.6)" }: { pos: "tl" | "tr" | "bl" | "br"; color?: string }) => {
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
        borderColor: color,
        animation: "corner-flash 4s infinite",
      }}
    />
  );
};

/* ===============================
   SECTION LABEL (identical to Home.tsx)
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
   ANIMATION VARIANTS (identical to Home.tsx)
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
   NAV CARD DATA
=============================== */
const NAV_ITEMS = [
  { label: "How It Works",    path: "/blockchain/how-it-works",    icon: <Cpu className="w-4 h-4" />,      desc: "Core mechanics",       accent: "#00ffe7", tag: "CORE"  },
  { label: "Security",        path: "/blockchain/security",         icon: <Lock className="w-4 h-4" />,     desc: "Threats & protection", accent: "#3b82f6", tag: "SEC"   },
  { label: "Smart Contracts", path: "/blockchain/smart-contracts",  icon: <FileCode className="w-4 h-4" />, desc: "Self-executing code",  accent: "#a855f7", tag: "WEB3"  },
];

/* ===============================
   NAV CARD
=============================== */
const NavCard = memo(({ item }: { item: typeof NAV_ITEMS[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={item.path}
        className="group relative flex items-center gap-4 px-5 py-4 rounded-xl overflow-hidden cursor-pointer block"
        style={{
          background:  "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
          border:      `1px solid ${hovered ? item.accent + "50" : "rgba(255,255,255,0.06)"}`,
          boxShadow:   hovered ? `0 0 30px ${item.accent}15, 0 20px 40px rgba(0,0,0,0.5)` : "inset 0 1px 0 rgba(255,255,255,0.04)",
          transition:  "border-color 0.4s, box-shadow 0.4s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Sweeping top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="h-full w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
          />
        </div>

        {/* Corner brackets on hover */}
        {hovered && (
          <>
            <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: item.accent }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: item.accent }} />
            <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l" style={{ borderColor: item.accent }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: item.accent }} />
          </>
        )}

        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity:    hovered ? 1 : 0,
            background: `radial-gradient(ellipse at 30% 50%, ${item.accent}12, transparent 65%)`,
          }}
        />

        {/* Icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: hovered ? item.accent : `${item.accent}15`,
            color:      hovered ? "#000" : item.accent,
            boxShadow:  hovered ? `0 0 20px ${item.accent}50` : "none",
          }}
        >
          {item.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-bold mb-0.5 transition-colors duration-300"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize:   "0.75rem",
              color:      hovered ? item.accent : "#fff",
            }}
          >
            {item.label}
          </div>
          <div className="text-xs text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            {item.desc}
          </div>
        </div>

        {/* Tag */}
        <span
          className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded border flex-shrink-0"
          style={{
            fontFamily:  "'Share Tech Mono', monospace",
            color:       item.accent,
            borderColor: `${item.accent}30`,
            background:  `${item.accent}08`,
          }}
        >
          {item.tag}
        </span>

        <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-4 h-4" style={{ color: item.accent, opacity: hovered ? 1 : 0.3 }} />
        </motion.div>

        {/* Bottom bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 rounded-bl-xl transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${item.accent}, ${item.accent}20)`,
            width:      hovered ? "100%" : "0%",
          }}
        />
      </Link>
    </motion.div>
  );
});
NavCard.displayName = "NavCard";

/* ===============================
   SECTION CARD (theory/points)
=============================== */
const SectionCard = memo(({ section, index, accent }: {
  section: { heading: string; points: string[] };
  index: number;
  accent: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl cursor-default"
      style={{
        background:  "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border:      `1px solid ${hovered ? accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow:   hovered
          ? `0 0 30px ${accent}15, inset 0 1px 0 ${accent}20, 0 20px 60px rgba(0,0,0,0.5)`
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
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>

      {/* Corner brackets on hover */}
      {hovered && (
        <>
          <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: accent }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: accent }} />
          <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l" style={{ borderColor: accent }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: accent }} />
        </>
      )}

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity:    hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 30% 30%, ${accent}10, transparent 65%)`,
        }}
      />

      {/* Watermark index */}
      <div
        className="absolute -right-2 -bottom-4 font-black leading-none pointer-events-none select-none"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize:   "5rem",
          color:      accent,
          opacity:    hovered ? 0.08 : 0.025,
          transition: "opacity 0.4s",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 p-6">
        {/* Heading */}
        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{
            fontFamily:    "'Orbitron', sans-serif",
            fontSize:      "0.8rem",
            letterSpacing: "0.05em",
            color:         hovered ? accent : "#fff",
          }}
        >
          {section.heading}
        </h3>

        {/* Animated underline */}
        <div className="relative h-px mb-4 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: accent }}
          />
        </div>

        {/* Points */}
        <ul className="space-y-2.5">
          {section.points.map((point, pIndex) => (
            <motion.li
              key={pIndex}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pIndex * 0.06 }}
              className="flex items-start gap-3"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 transition-all duration-300"
                style={{
                  background: accent,
                  boxShadow:  hovered ? `0 0 6px ${accent}80` : "none",
                }}
              />
              <span
                className="text-xs leading-relaxed transition-colors duration-300"
                style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
              >
                {point}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});
SectionCard.displayName = "SectionCard";

/* ===============================
   PLATFORM CARD
=============================== */
const PlatformCard = memo(({ platform, accent }: {
  platform: { name: string; description: string; link: string };
  accent: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      style={{
        background:  "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border:      `1px solid ${hovered ? accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow:   hovered
          ? `0 0 30px ${accent}15, inset 0 1px 0 ${accent}20, 0 20px 60px rgba(0,0,0,0.5)`
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Sweeping highlight */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-full w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>

      {/* Corner brackets */}
      {hovered && (
        <>
          <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: accent }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: accent }} />
          <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l" style={{ borderColor: accent }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: accent }} />
        </>
      )}

      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity:    hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 30% 30%, ${accent}10, transparent 65%)`,
        }}
      />

      {/* Spinning conic border */}
      <div
        className="absolute -inset-px rounded-xl pointer-events-none overflow-hidden"
        style={{
          opacity:    hovered ? 1 : 0,
          background: `conic-gradient(from 0deg, transparent 0deg, ${accent}30 60deg, transparent 120deg)`,
          animation:  hovered ? "border-spin 4s linear infinite" : "none",
          transition: "opacity 0.4s",
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? accent : `${accent}15`,
              color:      hovered ? "#000" : accent,
              boxShadow:  hovered ? `0 0 20px ${accent}50` : "none",
              fontSize:   "1.2rem",
            }}
          >
            🔗
          </div>
          <span
            className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded border"
            style={{
              fontFamily:  "'Share Tech Mono', monospace",
              color:       accent,
              borderColor: `${accent}30`,
              background:  `${accent}08`,
            }}
          >
            PLATFORM
          </span>
        </div>

        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{
            fontFamily:    "'Orbitron', sans-serif",
            fontSize:      "0.82rem",
            letterSpacing: "0.05em",
            color:         hovered ? accent : "#fff",
          }}
        >
          {platform.name}
        </h3>

        {/* Animated underline */}
        <div className="relative h-px mb-3 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: accent }}
          />
        </div>

        <p
          className="text-xs mb-5 leading-relaxed transition-colors duration-300"
          style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
        >
          {platform.description}
        </p>

        <a
          href={platform.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium transition-all duration-200"
          style={{ color: accent, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem" }}
        >
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.span>
          VISIT PLATFORM
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>
    </motion.div>
  );
});
PlatformCard.displayName = "PlatformCard";

/* ===============================
   TOPIC ACCENT CYCLE
=============================== */
const ACCENTS = ["#00ffe7", "#3b82f6", "#a855f7"] as const;

/* ===============================
   BLOCKCHAIN PAGE
=============================== */
export default function Blockchain() {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}
    >
      <style>{GLOBAL_CSS}</style>

      {/* ── FIXED BACKGROUND (matches Home.tsx exactly) ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {/* MatrixRain */}
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
            PAGE HEADER
        ====================== */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-20"
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
                ~/blockchain — MODULE LOADED
              </span>
            </div>
            <div
              className="h-px flex-1 max-w-[200px]"
              style={{
                background: "linear-gradient(to right, rgba(0,255,231,0.4), transparent)",
                animation:  "line-extend 1s ease-out forwards",
              }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white block mb-2">Distributed</span>
            <span className="text-white">Ledger{" "}</span>
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
                Blockchain
              </span>
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
                Understand blockchain fundamentals, consensus mechanisms, smart contracts,
                wallets, and real-world applications —{" "}
                <span className="text-white font-semibold">beyond just cryptocurrency.</span>
              </p>
            </div>
          </motion.div>

          {/* Hashtags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {["distributed-ledger", "decentralized", "smart-contracts", "consensus-mechanisms"].map(tag => (
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
        </motion.section>

        {/* ======================
            NAV CARDS
        ====================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <SectionLabel num="00" label="Quick Navigation" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {NAV_ITEMS.map(item => <NavCard key={item.path} item={item} />)}
          </motion.div>
        </motion.section>

        {/* ======================
            TOPIC SECTIONS
        ====================== */}
        {blockchainData.map((topic, topicIndex) => {
          const accent = ACCENTS[topicIndex % ACCENTS.length];
          const sectionNum = String(topicIndex + 1).padStart(2, "0");

          return (
            <motion.section
              key={topicIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-28 last:mb-8"
            >
              {/* Section label */}
              <SectionLabel num={sectionNum} label={`Module ${sectionNum}`} />

              {/* Topic header card */}
              <div
                className="relative overflow-hidden rounded-2xl p-8 border border-white/6 mb-12"
                style={{
                  background:    "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(12px)",
                  boxShadow:     `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 60px ${accent}08`,
                }}
              >
                <CyberCorner pos="tl" color={`${accent}80`} />
                <CyberCorner pos="tr" color={`${accent}80`} />
                <CyberCorner pos="bl" color={`${accent}80`} />
                <CyberCorner pos="br" color={`${accent}80`} />

                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(to right, ${accent}70, rgba(59,130,246,0.3), transparent)` }}
                />

                {/* Watermark */}
                <div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 font-black pointer-events-none select-none leading-none"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize:   "9rem",
                    color:      accent,
                    opacity:    0.03,
                  }}
                >
                  {sectionNum}
                </div>

                <div className="relative z-10">
                  {/* Index badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded border"
                      style={{
                        fontFamily:  "'Share Tech Mono', monospace",
                        background:  `${accent}12`,
                        borderColor: `${accent}40`,
                        color:       accent,
                      }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                      TOPIC {sectionNum}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }} />
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl font-black mb-3"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    <span className="text-white">{topic.title.split(" ")[0]} </span>
                    <span
                      style={{
                        background:           `linear-gradient(135deg, ${accent}, #3b82f6)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor:  "transparent",
                        backgroundClip:       "text",
                      }}
                    >
                      {topic.title.split(" ").slice(1).join(" ")}
                    </span>
                  </h2>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="origin-left h-0.5 w-32 rounded-full mb-4"
                    style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
                  />

                  <p
                    className="text-gray-400 leading-relaxed max-w-3xl"
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem" }}
                  >
                    {topic.description}
                  </p>
                </div>
              </div>

              {/* Theory sections grid */}
              {topic.sections && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Share Tech Mono', monospace", color: `${accent}80` }}>
                      Key Concepts
                    </span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }} />
                  </motion.div>

                  <motion.div
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid sm:grid-cols-2 gap-4 mb-10"
                  >
                    {topic.sections.map((section, secIndex) => (
                      <SectionCard key={secIndex} section={section} index={secIndex} accent={accent} />
                    ))}
                  </motion.div>
                </>
              )}

              {/* Platforms grid */}
              {topic.platforms && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6 mt-10"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Share Tech Mono', monospace", color: `${accent}80` }}>
                      Platforms &amp; Tools
                    </span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }} />
                  </motion.div>

                  <motion.div
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {topic.platforms.map((platform, pIndex) => (
                      <PlatformCard key={pIndex} platform={platform} accent={accent} />
                    ))}
                  </motion.div>
                </>
              )}
            </motion.section>
          );
        })}

        {/* ======================
            FOOTER CTA (matches Home.tsx exactly)
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
                  module: blockchain — complete
                </span>
              </motion.div>

              <p
                className="text-5xl sm:text-6xl font-black mb-4 flicker"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span className="text-white">Build. </span>
                <span className="text-white">Verify. </span>
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
                Blockchain is not just crypto — it's a trust layer for the decentralized future.
                Master it and you master the new internet.
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
                CONTINUE LEARNING
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
              </Link>
            </div>
          </div>
        </motion.footer>

      </div>
    </motion.div>
  );
}