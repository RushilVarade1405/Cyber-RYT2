import { motion, type Variants } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { cryptoData } from "../data/crypto";
import { Lock, Shield, Key, ChevronRight, Zap, ArrowUpRight } from "lucide-react";
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
   CYBER CORNER BRACKETS
=============================== */
const CyberCorner = ({ pos, color = "rgba(0,255,231,0.6)" }: { pos: "tl" | "tr" | "bl" | "br"; color?: string }) => {
  const base: React.CSSProperties = { position: "absolute", width: 20, height: 20 };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 0,    left: 0,  borderTop:    "2px solid", borderLeft:  "2px solid" },
    tr: { top: 0,    right: 0, borderTop:    "2px solid", borderRight: "2px solid" },
    bl: { bottom: 0, left: 0,  borderBottom: "2px solid", borderLeft:  "2px solid" },
    br: { bottom: 0, right: 0, borderBottom: "2px solid", borderRight: "2px solid" },
  };
  return <div style={{ ...base, ...map[pos], borderColor: color, animation: "corner-flash 4s infinite" }} />;
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
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-1 h-1 rounded-full bg-cyan-400"
    />
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
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
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
   ACCENT CYCLE
=============================== */
const ACCENTS = ["#00ffe7", "#3b82f6", "#a855f7"] as const;

/* ===============================
   REAL-WORLD APPS DATA
=============================== */
const REAL_WORLD_APPS = [
  { text: "Secure web communication (HTTPS, TLS)", icon: "🌐" },
  { text: "Password hashing & authentication",     icon: "🔐" },
  { text: "Blockchain & cryptocurrencies",         icon: "⛓️" },
  { text: "Digital signatures & certificates",     icon: "📜" },
  { text: "Secure messaging apps",                 icon: "💬" },
  { text: "Data protection & compliance",          icon: "🛡️" },
];

const BEST_PRACTICES = [
  { icon: "🔑", text: "Never store plaintext passwords — always hash with salt.",           accent: "#00ffe7" },
  { icon: "⚙️", text: "Use modern algorithms like AES-256, RSA-2048+, ECC.",               accent: "#3b82f6" },
  { icon: "🚫", text: "Avoid deprecated algorithms (MD5, SHA-1, DES).",                   accent: "#ff2d55" },
  { icon: "🔒", text: "Protect private keys using hardware security modules.",              accent: "#a855f7" },
  { icon: "🔄", text: "Rotate keys regularly and enforce strict access control.",           accent: "#00ffe7" },
];

/* ===============================
   SECTION CARD (theory / points)
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
        background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border:     `1px solid ${hovered ? accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow:  hovered
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
   REAL-WORLD APP CARD
=============================== */
const AppCard = memo(({ item, accent }: { item: { text: string; icon: string }; accent: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3 }}
      className="relative flex items-center gap-3 px-4 py-3 rounded-xl overflow-hidden cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border:     `1px solid ${hovered ? accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow:  hovered ? `0 0 20px ${accent}15` : "none",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Sweep */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="h-full w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>

      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 transition-all duration-300"
        style={{
          background: hovered ? accent : `${accent}15`,
          boxShadow:  hovered ? `0 0 14px ${accent}50` : "none",
        }}
      >
        {item.icon}
      </div>

      <span
        className="text-xs leading-relaxed transition-colors duration-300"
        style={{ fontFamily: "'Share Tech Mono', monospace", color: hovered ? "#e2e8f0" : "#6b7280" }}
      >
        {item.text}
      </span>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="ml-auto flex-shrink-0"
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
      </motion.div>
    </motion.div>
  );
});
AppCard.displayName = "AppCard";

/* ===============================
   BEST PRACTICE CARD
=============================== */
const PracticeCard = memo(({ item, index }: { item: typeof BEST_PRACTICES[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border:     `1px solid ${hovered ? item.accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow:  hovered
          ? `0 0 30px ${item.accent}15, inset 0 1px 0 ${item.accent}20`
          : "inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Sweeping top */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-full w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
        />
      </div>

      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity:    hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 20% 50%, ${item.accent}08, transparent 65%)`,
        }}
      />

      {/* Watermark */}
      <div
        className="absolute -right-1 -bottom-3 font-black leading-none pointer-events-none select-none"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize:   "4rem",
          color:      item.accent,
          opacity:    hovered ? 0.07 : 0.02,
          transition: "opacity 0.4s",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex items-start gap-4 p-5">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
          style={{
            background: hovered ? item.accent : `${item.accent}15`,
            boxShadow:  hovered ? `0 0 20px ${item.accent}50` : "none",
          }}
        >
          {item.icon}
        </div>
        <span
          className="text-sm leading-relaxed mt-1.5 transition-colors duration-300"
          style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
        >
          {item.text}
        </span>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 rounded-bl-xl transition-all duration-500"
        style={{
          background: `linear-gradient(to right, ${item.accent}, ${item.accent}20)`,
          width:      hovered ? "100%" : "0%",
        }}
      />
    </motion.div>
  );
});
PracticeCard.displayName = "PracticeCard";

/* ===============================
   CRYPTOGRAPHY PAGE
=============================== */
export default function Cryptography() {
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
        <MatrixRain />
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
            HERO HEADER
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
                ~/cryptography — SECURITY MODULE
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
            <span className="text-white block mb-2">The Art of</span>
            <span className="text-white">Secret{" "}</span>
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
                Cryptography
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
                Cryptography is the foundation of modern cybersecurity. It ensures
                confidentiality, integrity, authentication, and non-repudiation of
                digital data —{" "}
                <span className="text-white font-semibold">using mathematical algorithms and secure key management.</span>
              </p>
            </div>
          </motion.div>

          {/* Hashtags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {["encryption", "hashing", "digital-signatures", "key-management", "PKI"].map(tag => (
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
            TOPIC SECTIONS
        ====================== */}
        {cryptoData.map((topic, topicIndex) => {
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
                  background:     "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(12px)",
                  boxShadow:      `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 60px ${accent}08`,
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

                {/* Watermark number */}
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
                  {/* Badge */}
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

              {/* Concepts sub-label */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ fontFamily: "'Share Tech Mono', monospace", color: `${accent}80` }}
                >
                  Key Concepts
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }} />
              </motion.div>

              {/* Section cards grid */}
              <motion.div
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid md:grid-cols-2 gap-4 mb-12"
              >
                {topic.sections.map((section, secIndex) => (
                  <SectionCard key={secIndex} section={section} index={secIndex} accent={accent} />
                ))}
              </motion.div>

              {/* Real-world applications panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl border border-white/6"
                style={{
                  background:     "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(12px)",
                  boxShadow:      `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 40px ${accent}06`,
                }}
              >
                <CyberCorner pos="tl" color={`${accent}60`} />
                <CyberCorner pos="tr" color={`${accent}60`} />
                <CyberCorner pos="bl" color={`${accent}60`} />
                <CyberCorner pos="br" color={`${accent}60`} />

                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(to right, ${accent}50, rgba(59,130,246,0.2), transparent)` }}
                />

                {/* Sweep animation */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                  className="absolute top-0 left-0 h-px w-1/4"
                  style={{ background: `linear-gradient(to right, transparent, ${accent}80, transparent)` }}
                />

                <div className="relative z-10 p-7">
                  {/* Panel header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                    >
                      <Lock className="w-4 h-4" style={{ color: accent }} />
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold uppercase tracking-[0.2em] block"
                        style={{ fontFamily: "'Share Tech Mono', monospace", color: `${accent}80` }}
                      >
                        Real-World Applications
                      </span>
                      <div className="h-px w-16 mt-1" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
                    </div>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}20, transparent)` }} />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: accent }}
                    />
                  </div>

                  <motion.div
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    {REAL_WORLD_APPS.map((item, i) => (
                      <AppCard key={i} item={item} accent={accent} />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.section>
          );
        })}

        {/* ======================
            BEST PRACTICES SECTION
        ====================== */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-28"
        >
          <SectionLabel num="BP" label="Best Practices" />

          {/* Header panel */}
          <div
            className="relative overflow-hidden rounded-2xl p-8 border border-white/6 mb-8"
            style={{
              background:     "rgba(0,0,0,0.5)",
              backdropFilter: "blur(12px)",
              boxShadow:      "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 60px rgba(0,255,231,0.04)",
            }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.5), rgba(59,130,246,0.3), transparent)" }} />

            {/* Animated sweep */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              className="absolute top-0 left-0 h-px w-1/3"
              style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.8), transparent)" }}
            />

            <div className="relative z-10 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,255,231,0.1)",
                  border:     "1px solid rgba(0,255,231,0.3)",
                  boxShadow:  "0 0 20px rgba(0,255,231,0.1)",
                }}
              >
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-black"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <span className="text-white">Cryptography </span>
                  <span
                    style={{
                      background:           "linear-gradient(135deg, #00ffe7, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor:  "transparent",
                      backgroundClip:       "text",
                    }}
                  >
                    Best Practices
                  </span>
                </h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="origin-left h-0.5 w-24 rounded-full mt-2"
                  style={{ background: "linear-gradient(to right, #00ffe7, transparent)" }}
                />
              </div>
            </div>
          </div>

          {/* Practice cards */}
          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {BEST_PRACTICES.map((item, i) => (
              <PracticeCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </motion.section>

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
                  module: cryptography — complete
                </span>
              </motion.div>

              <p
                className="text-5xl sm:text-6xl font-black mb-4 flicker"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span className="text-white">Encrypt. </span>
                <span className="text-white">Hash. </span>
                <span
                  className="neon-text"
                  style={{
                    background:           "linear-gradient(135deg, #00ffe7, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor:  "transparent",
                    backgroundClip:       "text",
                  }}
                >
                  Protect.
                </span>
              </p>

              <p
                className="text-gray-500 max-w-md mx-auto mb-10 text-sm leading-relaxed"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Cryptography is invisible infrastructure — the reason secrets stay secret
                and identities stay verified. Master it.
              </p>

              <a
                href="/start"
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
                <Key className="w-4 h-4" />
                CONTINUE LEARNING
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
              </a>
            </div>
          </div>
        </motion.footer>

      </div>
    </motion.div>
  );
}