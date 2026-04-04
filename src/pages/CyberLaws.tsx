import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { cyberLaws, CyberLawSection } from "../data/cyberLaws";
import { memo, useEffect, useRef, useState } from "react";

import {
  Scale, Globe, Shield, FileText, BookOpen,
  ChevronRight, AlertTriangle, Gavel, Zap,
  ExternalLink, BookMarked, FlaskConical,
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
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4,
      color:
        Math.random() > 0.5
          ? "#00ffe7"
          : Math.random() > 0.5
          ? "#3b82f6"
          : "#a855f7",
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
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
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
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
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
  const base: React.CSSProperties = {
    position: "absolute",
    width: 20,
    height: 20,
  };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: "2px solid", borderLeft: "2px solid" },
    tr: { top: 0, right: 0, borderTop: "2px solid", borderRight: "2px solid" },
    bl: {
      bottom: 0,
      left: 0,
      borderBottom: "2px solid",
      borderLeft: "2px solid",
    },
    br: {
      bottom: 0,
      right: 0,
      borderBottom: "2px solid",
      borderRight: "2px solid",
    },
  };
  return (
    <div
      style={{
        ...base,
        ...map[pos],
        borderColor: "rgba(0,255,231,0.6)",
        animation: "corner-flash 4s infinite",
      }}
    />
  );
};

/* ===============================
   SECTION LABEL
=============================== */
const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-xs text-cyan-400/60 tracking-widest">
      [{num}]
    </span>
    <span
      className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400/80"
      style={{ fontFamily: "'Share Tech Mono', monospace" }}
    >
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
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};
const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ===============================
   ANIMATED COUNTER
=============================== */
const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        let val = 0;
        const step = end / 60;
        const id = setInterval(() => {
          val += step;
          if (val >= end) {
            setCount(end);
            clearInterval(id);
          } else setCount(Math.floor(val));
        }, 16);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/* ===============================
   STATS DATA
=============================== */
const stats = [
  { val: cyberLaws.length, suffix: "", label: "Law Frameworks" },
  { val: cyberLaws.reduce((a, l) => a + (l.sections?.length ?? 0), 0), suffix: "+", label: "Sections Covered" },
  { val: cyberLaws.reduce((a, l) => a + (l.caseStudies?.length ?? 0), 0), suffix: "+", label: "Case Studies" },
  { val: 100, suffix: "%", label: "Exam Ready" },
];
const STAT_COLORS = ["#00ffe7", "#3b82f6", "#a855f7", "#00ffe7"] as const;

/* ===============================
   NAV CARD DATA
=============================== */
const navCards = [
  {
    path: "/cyber-laws/cyber-crimes",
    icon: AlertTriangle,
    label: "Cyber Crimes",
    desc: "Types, methods & penalties",
    accent: "#ff2d55",
  },
  {
    path: "/cyber-laws/it-act",
    icon: FileText,
    label: "IT Act, 2000",
    desc: "India's digital legal backbone",
    accent: "#34d399",
  },
  {
    path: "/cyber-laws/ethics",
    icon: BookOpen,
    label: "Cyber Ethics",
    desc: "Principles of digital conduct",
    accent: "#a855f7",
  },
];

/* ===============================
   NAV CARD COMPONENT
=============================== */
const NavCard = memo(
  ({
    path,
    icon: Icon,
    label,
    desc,
    accent,
    index,
  }: (typeof navCards)[0] & { index: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + index * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <Link
          to={path}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: `${accent}08`,
            border: `1px solid ${hovered ? `${accent}60` : `${accent}25`}`,
            boxShadow: hovered ? `0 0 30px ${accent}20` : "none",
          }}
        >
          {/* Sweep highlight */}
          <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
            <motion.div
              animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="h-full w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />
          </div>

          {/* Icon */}
          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? `${accent}20` : `${accent}10`,
              borderColor: `${accent}30`,
              boxShadow: hovered ? `0 0 20px ${accent}30` : "none",
            }}
          >
            <Icon size={18} style={{ color: accent }} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div
              className="font-semibold text-sm transition-colors duration-300"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.05em",
                color: hovered ? accent : "#fff",
              }}
            >
              {label}
            </div>
            <div
              className="text-xs mt-0.5"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color: "#4b5563",
              }}
            >
              {desc}
            </div>
          </div>

          {/* Arrow */}
          <motion.div animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={16} style={{ color: accent }} />
          </motion.div>

          {/* Bottom accent */}
          <div
            className="absolute bottom-0 left-0 h-px transition-all duration-500"
            style={{
              background: `linear-gradient(to right, ${accent}, transparent)`,
              width: hovered ? "100%" : "40%",
            }}
          />
        </Link>
      </motion.div>
    );
  }
);
NavCard.displayName = "NavCard";

/* ===============================
   SECTION CARD
=============================== */
const SectionCard = memo(
  ({
    heading,
    points,
    index,
  }: {
    heading: string;
    points: string[];
    index: number;
  }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.05 } as any}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
          border: `1px solid ${
            hovered ? "rgba(0,255,231,0.4)" : "rgba(255,255,255,0.07)"
          }`,
          boxShadow: hovered
            ? "0 0 30px rgba(0,255,231,0.1), inset 0 1px 0 rgba(0,255,231,0.1)"
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Sweep */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00ffe7, transparent)",
            }}
          />
        </div>

        {/* Corner brackets on hover */}
        {hovered && (
          <>
            <div
              className="absolute top-0 left-0 w-3 h-3 border-t border-l"
              style={{ borderColor: "#00ffe7" }}
            />
            <div
              className="absolute top-0 right-0 w-3 h-3 border-t border-r"
              style={{ borderColor: "#00ffe7" }}
            />
            <div
              className="absolute bottom-0 left-0 w-3 h-3 border-b border-l"
              style={{ borderColor: "#00ffe7" }}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3 border-b border-r"
              style={{ borderColor: "#00ffe7" }}
            />
          </>
        )}

        {/* Glow blob */}
        <div
          className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
          style={{
            background: "rgba(0,255,231,0.08)",
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="relative z-10 p-6">
          {/* Heading */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
              style={{
                background: hovered ? "#00ffe7" : "rgba(0,255,231,0.1)",
                border: `1px solid ${
                  hovered ? "#00ffe7" : "rgba(0,255,231,0.2)"
                }`,
                boxShadow: hovered ? "0 0 20px rgba(0,255,231,0.4)" : "none",
              }}
            >
              <Scale
                size={15}
                style={{ color: hovered ? "#000" : "#00ffe7" }}
              />
            </div>
            <h3
              className="font-bold transition-colors duration-300"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.04em",
                color: hovered ? "#00ffe7" : "#fff",
              }}
            >
              {heading}
            </h3>
          </div>

          {/* Animated underline */}
          <div className="relative h-px mb-4 overflow-hidden bg-white/5">
            <motion.div
              animate={{ width: hovered ? "100%" : "2rem" }}
              transition={{ duration: 0.4 }}
              className="absolute left-0 top-0 h-full"
              style={{ background: "#00ffe7" }}
            />
          </div>

          {/* Points */}
          <ul className="space-y-2.5">
            {points.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 text-xs leading-relaxed"
                style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
              >
                <span
                  className="mt-1 flex-shrink-0 text-[9px]"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: "#00ffe740",
                  }}
                >
                  ▸
                </span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500"
          style={{
            background: "linear-gradient(to right, #00ffe7, #3b82f6)",
            width: hovered ? "100%" : "0%",
          }}
        />
      </motion.div>
    );
  }
);
SectionCard.displayName = "SectionCard";

/* ===============================
   CASE STUDY CARD
=============================== */
const CaseStudyCard = memo(
  ({ cs, index }: { cs: any; index: number }) => {
    const [hovered, setHovered] = useState(false);

    const severityConfig: Record<string, { color: string; bg: string; border: string }> = {
      High:   { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)" },
      Medium: { color: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.25)" },
      Low:    { color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)" },
    };
    const sev = cs.severity ? severityConfig[cs.severity] ?? severityConfig.Low : null;

    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.08, type: "spring", stiffness: 280 } as any}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(5,10,20,0.9) 100%)",
          border: `1px solid ${
            hovered ? "rgba(0,255,231,0.4)" : "rgba(255,255,255,0.07)"
          }`,
          boxShadow: hovered
            ? "0 0 40px rgba(0,255,231,0.12), 0 20px 60px rgba(0,0,0,0.5)"
            : "none",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Sweep */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00ffe7, transparent)",
            }}
          />
        </div>

        {hovered && (
          <>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "#00ffe7" }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "#00ffe7" }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "#00ffe7" }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "#00ffe7" }} />
          </>
        )}

        {/* Glow */}
        <div
          className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
          style={{ background: "rgba(0,255,231,0.06)", opacity: hovered ? 1 : 0 }}
        />

        <div className="relative z-10 p-6">
          {/* Icon + Title */}
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 text-2xl flex-shrink-0"
              style={{
                background: hovered ? "rgba(0,255,231,0.2)" : "rgba(0,255,231,0.08)",
                border: `1px solid ${hovered ? "rgba(0,255,231,0.5)" : "rgba(0,255,231,0.2)"}`,
                boxShadow: hovered ? "0 0 20px rgba(0,255,231,0.25)" : "none",
              }}
            >
              {cs.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className="font-bold mb-0.5 transition-colors duration-300"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.82rem",
                  letterSpacing: "0.03em",
                  color: hovered ? "#00ffe7" : "#fff",
                }}
              >
                {cs.title}
              </h4>
              <p
                className="text-xs italic"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: "rgba(0,255,231,0.5)",
                }}
              >
                {cs.shortDescription}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative h-px mb-4 overflow-hidden bg-white/5">
            <motion.div
              animate={{ width: hovered ? "100%" : "2rem" }}
              transition={{ duration: 0.4 }}
              className="absolute left-0 top-0 h-full"
              style={{ background: "#00ffe7" }}
            />
          </div>

          {/* Description */}
          <p
            className="text-xs mb-4 leading-relaxed"
            style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
          >
            {cs.description}
          </p>

          {/* Info blocks */}
          <div className="space-y-2.5 mb-4">
            <div
              className="p-3 rounded-lg border"
              style={{
                background: "rgba(0,255,231,0.04)",
                borderColor: "rgba(0,255,231,0.15)",
              }}
            >
              <p
                className="text-[10px] font-bold mb-1 flex items-center gap-1.5"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: "#00ffe7",
                }}
              >
                <Gavel size={10} /> Law Applied
              </p>
              <p
                className="text-xs"
                style={{ color: "#6b7280" }}
              >
                {cs.lawApplied}
              </p>
            </div>

            {cs.impact && (
              <div
                className="p-3 rounded-lg border"
                style={{
                  background: "rgba(251,146,60,0.04)",
                  borderColor: "rgba(251,146,60,0.15)",
                }}
              >
                <p
                  className="text-[10px] font-bold mb-1 flex items-center gap-1.5"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: "#fb923c",
                  }}
                >
                  <Zap size={10} /> Impact
                </p>
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  {cs.impact}
                </p>
              </div>
            )}

            {cs.punishmentHint && (
              <div
                className="p-3 rounded-lg border"
                style={{
                  background: "rgba(255,45,85,0.04)",
                  borderColor: "rgba(255,45,85,0.15)",
                }}
              >
                <p
                  className="text-[10px] font-bold mb-1 flex items-center gap-1.5"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: "#ff2d55",
                  }}
                >
                  <AlertTriangle size={10} /> Punishment
                </p>
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  {cs.punishmentHint}
                </p>
              </div>
            )}
          </div>

          {/* Tags + Severity */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {cs.tags?.map((tag: string, t: number) => (
              <span
                key={t}
                className="text-[10px] font-bold px-2 py-0.5 rounded border"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: "#00ffe7",
                  borderColor: "rgba(0,255,231,0.2)",
                  background: "rgba(0,255,231,0.06)",
                }}
              >
                {tag}
              </span>
            ))}
            {sev && cs.severity && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded border"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: sev.color,
                  borderColor: sev.border,
                  background: sev.bg,
                }}
              >
                {cs.severity} Severity
              </span>
            )}
          </div>

          {/* Exam Tip */}
          {cs.examTip && (
            <div
              className="p-3 rounded-lg border-l-2"
              style={{
                background: "rgba(168,85,247,0.04)",
                borderLeftColor: "#a855f7",
              }}
            >
              <p
                className="text-[11px] flex items-start gap-2"
                style={{ color: "#9ca3af" }}
              >
                <span className="text-base flex-shrink-0">💡</span>
                <span>
                  <strong
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      color: "#a855f7",
                    }}
                  >
                    Exam Tip:
                  </strong>{" "}
                  {cs.examTip}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500"
          style={{
            background: "linear-gradient(to right, #00ffe7, #3b82f6, transparent)",
            width: hovered ? "100%" : "0%",
          }}
        />
      </motion.div>
    );
  }
);
CaseStudyCard.displayName = "CaseStudyCard";

/* ===============================
   EXAM SUMMARY BLOCK
=============================== */
const ExamSummary = memo(({ points }: { points: string[] }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="relative overflow-hidden rounded-xl mb-12 p-6"
    style={{
      background:
        "linear-gradient(135deg, rgba(0,255,231,0.05) 0%, rgba(0,0,0,0.7) 50%, rgba(59,130,246,0.05) 100%)",
      border: "1px solid rgba(0,255,231,0.18)",
      boxShadow: "inset 0 1px 0 rgba(0,255,231,0.1)",
    }}
  >
    <div
      className="absolute top-0 left-8 right-8 h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(0,255,231,0.4), transparent)",
      }}
    />
    <div
      className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl pointer-events-none"
      style={{ background: "rgba(0,255,231,0.08)" }}
    />

    <div className="flex items-center gap-3 mb-5 relative z-10">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
        style={{
          background: "rgba(0,255,231,0.12)",
          border: "1px solid rgba(0,255,231,0.25)",
        }}
      >
        <BookMarked size={16} style={{ color: "#00ffe7" }} />
      </div>
      <h3
        className="font-bold tracking-wide"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "0.82rem",
          letterSpacing: "0.1em",
          color: "#00ffe7",
        }}
      >
        Exam-Oriented Summary
      </h3>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, rgba(0,255,231,0.3), transparent)",
        }}
      />
    </div>

    <ul className="space-y-2.5 relative z-10">
      {points.map((point, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="flex items-start gap-3 text-xs leading-relaxed"
          style={{ color: "#6b7280" }}
        >
          <span
            className="mt-1 flex-shrink-0"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color: "rgba(0,255,231,0.6)",
              fontSize: "9px",
            }}
          >
            ▸
          </span>
          <span>{point}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
));
ExamSummary.displayName = "ExamSummary";

/* ===============================
   REGION BADGE
=============================== */
const RegionBadge = ({ region }: { region: string }) => {
  const isIndia = region === "India";
  return (
    <span
      className="text-[10px] font-bold px-3 py-1 rounded border"
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        color: isIndia ? "#00ffe7" : "#34d399",
        borderColor: isIndia ? "rgba(0,255,231,0.3)" : "rgba(52,211,153,0.3)",
        background: isIndia ? "rgba(0,255,231,0.06)" : "rgba(52,211,153,0.06)",
        letterSpacing: "0.15em",
      }}
    >
      {isIndia ? "🇮🇳" : "🌐"} {region}
    </span>
  );
};

/* ===============================
   MAIN PAGE
=============================== */
export default function CyberLaws() {
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 18% 0%, rgba(0,255,231,0.06) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 82% 55%, rgba(59,130,246,0.06) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 50%)",
          }}
        />
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scan-animate pointer-events-none" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.72) 100%)",
          }}
        />
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
              style={{
                borderColor: "rgba(0,255,231,0.25)",
                background: "rgba(0,255,231,0.05)",
                boxShadow: "0 0 20px rgba(0,255,231,0.07)",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
              <span
                className="text-cyan-400 text-xs tracking-widest"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                ~/cyber-laws — LEGAL DATABASE LOADED
              </span>
            </div>
            <div
              className="h-px flex-1 max-w-[200px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,255,231,0.4), transparent)",
              }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white block mb-2">Cyber</span>
            <span className="relative inline-block">
              <span
                className="neon-text"
                style={{
                  background:
                    "linear-gradient(135deg, #00ffe7 0%, #3b82f6 50%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Laws
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full block"
                style={{
                  background:
                    "linear-gradient(90deg, #00ffe7, #3b82f6, #a855f7)",
                }}
              />
            </span>
            <span className="text-white block mt-2">&amp; Frameworks</span>
          </motion.h1>

          {/* Description */}
          <motion.div variants={fadeUp} className="max-w-2xl mb-10">
            <div className="flex gap-4 items-start">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-0.5 rounded-full shrink-0 mt-1"
                style={{
                  background: "linear-gradient(to bottom, #00ffe7, transparent)",
                }}
              />
              <p className="text-lg leading-relaxed" style={{ color: "#7a8899" }}>
                National and international cyber laws, regulations, and landmark
                case studies relevant to cybersecurity, digital forensics, and
                data protection.{" "}
                <span className="text-white font-semibold">
                  Exam-ready reference in one place.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Hashtags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-16">
            {[
              "it-act-2000",
              "gdpr",
              "digital-forensics",
              "cyber-crimes",
              "data-protection",
              "legal-framework",
            ].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded border border-white/6 bg-white/[0.02] text-gray-600 cursor-default transition-all duration-200"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.7rem",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#00ffe7";
                  el.style.borderColor = "rgba(0,255,231,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "";
                  el.style.borderColor = "";
                }}
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Stat cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="relative rounded-xl p-4 overflow-hidden border border-white/6 bg-black/40"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(to right, ${STAT_COLORS[i]}, transparent)`,
                  }}
                />
                <div
                  className="text-3xl font-black mb-1"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: STAT_COLORS[i],
                    textShadow: `0 0 20px ${STAT_COLORS[i]}40`,
                  }}
                >
                  <Counter end={s.val} suffix={s.suffix} />
                </div>
                <div
                  className="text-gray-600 text-xs"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ======================
            QUICK NAVIGATION
        ====================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-24"
        >
          <SectionLabel num="00" label="Quick Navigation" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {navCards.map((card, i) => (
              <NavCard key={card.path} {...card} index={i} />
            ))}
          </div>
        </motion.section>

        {/* ======================
            LAW SECTIONS
        ====================== */}
        {cyberLaws.map((law: CyberLawSection, lawIndex: number) => {
          const examSummary = law.examSummary ?? [];
          const caseStudies = law.caseStudies ?? [];

          return (
            <motion.section
              key={lawIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-28 last:mb-8"
            >
              {/* ── Section Header ── */}
              <div className="mb-10">
                <SectionLabel
                  num={String(lawIndex + 1).padStart(2, "0")}
                  label={law.region}
                />

                <div className="flex items-center gap-4 mb-4">
                  <RegionBadge region={law.region} />
                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,255,231,0.2), transparent)",
                    }}
                  />
                </div>

                <h2
                  className="text-3xl sm:text-4xl font-black mb-4"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <span className="text-white">
                    {law.title.split(" ")[0]}{" "}
                  </span>
                  <span
                    className="neon-text"
                    style={{
                      background:
                        "linear-gradient(135deg, #00ffe7, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {law.title.split(" ").slice(1).join(" ")}
                  </span>
                </h2>

                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="origin-left h-[2px] w-full rounded-full mb-6"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,255,231,0.5), rgba(59,130,246,0.2), transparent)",
                  }}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-base max-w-4xl leading-relaxed"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: "#4b5563",
                  }}
                >
                  {law.description}
                </motion.p>
              </div>

              {/* ── Exam Summary ── */}
              {examSummary.length > 0 && (
                <ExamSummary points={examSummary} />
              )}

              {/* ── Case Studies ── */}
              {caseStudies.length > 0 && (
                <div className="mb-14">
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(0,255,231,0.1)",
                        border: "1px solid rgba(0,255,231,0.2)",
                      }}
                    >
                      <Gavel size={16} style={{ color: "#00ffe7" }} />
                    </div>
                    <h3
                      className="font-black"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      <span className="text-white">Case </span>
                      <span
                        style={{
                          background:
                            "linear-gradient(135deg, #00ffe7, #3b82f6)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        Studies
                      </span>
                    </h3>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(255,255,255,0.1), transparent)",
                      }}
                    />
                    <span
                      className="text-[10px] px-2 py-0.5 rounded border"
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        color: "#00ffe7",
                        borderColor: "rgba(0,255,231,0.2)",
                        background: "rgba(0,255,231,0.05)",
                      }}
                    >
                      {caseStudies.length} cases
                    </span>
                  </div>

                  <motion.div
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-5"
                  >
                    {caseStudies.map((cs: any, i: number) => (
                      <CaseStudyCard key={i} cs={cs} index={i} />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* ── Law Sections Grid ── */}
              {law.sections?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.2)",
                      }}
                    >
                      <FileText size={16} style={{ color: "#3b82f6" }} />
                    </div>
                    <h3
                      className="font-black"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      <span className="text-white">Key </span>
                      <span style={{ color: "#3b82f6" }}>Provisions</span>
                    </h3>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(59,130,246,0.3), transparent)",
                      }}
                    />
                    <span
                      className="text-[10px] px-2 py-0.5 rounded border"
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        color: "#3b82f6",
                        borderColor: "rgba(59,130,246,0.2)",
                        background: "rgba(59,130,246,0.05)",
                      }}
                    >
                      {law.sections.length} sections
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {law.sections.map((section: any, i: number) => (
                      <SectionCard
                        key={i}
                        heading={section.heading}
                        points={section.points}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Section divider */}
              {lawIndex < cyberLaws.length - 1 && (
                <div className="relative mt-20 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className="w-full h-px"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(0,255,231,0.2), rgba(59,130,246,0.2), transparent)",
                      }}
                    />
                  </div>
                  <div
                    className="relative flex items-center gap-2 px-5 py-1.5 rounded-lg border"
                    style={{
                      background: "rgba(2,5,9,0.95)",
                      borderColor: "rgba(0,255,231,0.2)",
                    }}
                  >
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                    <Scale size={12} style={{ color: "#00ffe7" }} />
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: "0.65rem",
                        color: "#00ffe7",
                        letterSpacing: "0.15em",
                      }}
                    >
                      NEXT FRAMEWORK
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.75,
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                  </div>
                </div>
              )}
            </motion.section>
          );
        })}

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
              background:
                "linear-gradient(135deg, rgba(0,255,231,0.04) 0%, rgba(0,0,0,0.8) 50%, rgba(168,85,247,0.04) 100%)",
              boxShadow:
                "0 0 80px rgba(0,255,231,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <CyberCorner pos="tl" />
            <CyberCorner pos="tr" />
            <CyberCorner pos="bl" />
            <CyberCorner pos="br" />

            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              className="absolute top-0 left-0 h-px w-1/3"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,255,231,0.8), transparent)",
              }}
            />

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(0,255,231,0.05), transparent 70%)",
              }}
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
                <span
                  className="text-xs text-cyan-400 tracking-widest"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  status: all frameworks indexed
                </span>
              </motion.div>

              <p
                className="text-5xl sm:text-6xl font-black mb-4 flicker"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span className="text-white">Know. </span>
                <span className="text-white">Apply. </span>
                <span
                  className="neon-text"
                  style={{
                    background: "linear-gradient(135deg, #00ffe7, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Defend.
                </span>
              </p>

              <p
                className="text-gray-500 max-w-md mx-auto mb-10 text-sm leading-relaxed"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Legal knowledge is as critical as technical skill. Know the laws
                that govern the digital domain and stay compliant.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/cyber-laws/cyber-crimes"
                  className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg font-black transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #00ffe7 0%, #3b82f6 100%)",
                    color: "#000",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    boxShadow:
                      "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 60px rgba(0,255,231,0.5), 0 0 100px rgba(0,255,231,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)";
                  }}
                >
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                  CYBER CRIMES
                </Link>

                <Link
                  to="/cyber-laws/it-act"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all duration-300"
                  style={{
                    border: "1px solid rgba(0,255,231,0.2)",
                    color: "#00ffe7",
                    background: "rgba(0,255,231,0.03)",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(0,255,231,0.5)";
                    el.style.background = "rgba(0,255,231,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(0,255,231,0.2)";
                    el.style.background = "rgba(0,255,231,0.03)";
                  }}
                >
                  IT ACT 2000 →
                </Link>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
}