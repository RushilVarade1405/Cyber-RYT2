import { LazyMotion, domAnimation, m, motion, type Variants } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target, Globe, Lightbulb, Code, Shield, BookOpen, Rocket, Sparkles,
  User, Heart, TrendingUp, ExternalLink, FileDown, Terminal,
  MapPin, Mail, Github, Linkedin, GraduationCap, ArrowUpRight,
  ChevronRight, Zap, Lock, Eye,
} from "lucide-react";
import MatrixRain from "../components/MatrixRain";

/* ================================================================
   GLOBAL CSS — mirrors Home.tsx fonts + keyframes
================================================================ */
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
  @keyframes float {
    0%,100% { transform: translateY(-3px); }
    50%     { transform: translateY(3px); }
  }

  .neon-text    { animation: neon-pulse 3s ease-in-out infinite; }
  .flicker      { animation: flicker 8s infinite; }
  .scan-animate { animation: scanline 8s linear infinite; }
  .icon-float   { animation: float 4s ease-in-out infinite; }
`;

/* ================================================================
   PARTICLE FIELD — identical to Home.tsx
================================================================ */
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
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.65 }} />
  );
});
ParticleField.displayName = "ParticleField";

/* ================================================================
   CYBER CORNER BRACKETS — identical to Home.tsx
================================================================ */
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

/* ================================================================
   ANIMATION VARIANTS
================================================================ */
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
const fadeIn: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11 } },
};

/* ================================================================
   DATA
================================================================ */
const philosophyItems = [
  {
    icon: Lightbulb, title: "Clarity First", num: "01",
    points: ["Simple explanations before complexity", "Step-by-step learning approach", "No unnecessary technical overload"],
    accent: "#00ffe7", tag: "CORE",
  },
  {
    icon: Code, title: "Practice Driven", num: "02",
    points: ["Hands-on learning with guidance", "Understand tools before using them", "Learning through experimentation"],
    accent: "#3b82f6", tag: "LAB",
  },
  {
    icon: Shield, title: "Ethics & Responsibility", num: "03",
    points: ["Strong focus on cyber laws", "Professional security mindset", "No illegal or harmful practices"],
    accent: "#a855f7", tag: "ETHICS",
  },
];

const roadmapSteps = [
  { icon: BookOpen,   title: "Foundations",      items: ["Linux basics", "Networking", "Core security concepts"], accent: "#00ffe7", num: "01", step: "Phase 1" },
  { icon: Rocket,     title: "Security Tools",   items: ["Reconnaissance", "Scanning", "Intro to VAPT"],          accent: "#3b82f6", num: "02", step: "Phase 2" },
  { icon: Shield,     title: "Defense & Law",    items: ["Cyber laws", "SOC basics", "Incident awareness"],        accent: "#a855f7", num: "03", step: "Phase 3" },
  { icon: TrendingUp, title: "Advanced Domains", items: ["Blockchain security", "Case studies", "Projects"],       accent: "#6366f1", num: "04", step: "Phase 4" },
];

const learningTopics = [
  { icon: "💻", text: "Linux and command-line fundamentals",          accent: "#00ffe7" },
  { icon: "🌐", text: "Networking and system-level concepts",         accent: "#3b82f6" },
  { icon: "🔧", text: "Security tools with attack & defense context", accent: "#a855f7" },
  { icon: "🔐", text: "Cryptography and secure communications",       accent: "#00ffe7" },
  { icon: "⚖️", text: "Cyber laws and ethical hacking principles",   accent: "#3b82f6" },
];

const futureGoals = [
  { icon: "📚", text: "Structured beginner-to-advanced learning paths", accent: "#00ffe7" },
  { icon: "🧪", text: "Guided labs and hands-on walkthroughs",          accent: "#3b82f6" },
  { icon: "💼", text: "Industry-aligned case studies",                  accent: "#a855f7" },
  { icon: "👥", text: "Community-driven learning features",             accent: "#6366f1" },
];

const portfolioStats = [
  { val: "43+", label: "Tools",    color: "#00ffe7" },
  { val: "8",   label: "Domains",  color: "#a855f7" },
  { val: "3",   label: "Projects", color: "#3b82f6" },
];

const socials = [
  { icon: Github,   href: "https://github.com/rushilvarade1405",        label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rushil-varade/", label: "LinkedIn" },
  { icon: Mail,     href: "mailto:rushilvarade@gmail.com",               label: "Email"    },
];

/* ================================================================
   SECTION LABEL — matches Home.tsx style exactly
================================================================ */
const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-xs text-cyan-400/60 tracking-widest">[{num}]</span>
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

/* ================================================================
   PHILOSOPHY CARD — cyberpunk reskin with hover sweep + corners
================================================================ */
const PhilosophyCard = memo(({ item }: { item: typeof philosophyItems[0] }) => {
  const Icon = item.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-xl cursor-default"
      style={{
        background:  "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
        border:      `1px solid ${hovered ? item.accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow:   hovered
          ? `0 0 30px ${item.accent}15, inset 0 1px 0 ${item.accent}20, 0 20px 60px rgba(0,0,0,0.5)`
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s, box-shadow 0.4s, transform 0.2s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
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

      {/* Corner brackets */}
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
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 30% 30%, ${item.accent}10, transparent 65%)` }}
      />

      {/* Watermark number */}
      <div
        className="absolute -right-2 -bottom-4 font-black leading-none pointer-events-none select-none"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "5rem", color: item.accent, opacity: hovered ? 0.08 : 0.025, transition: "opacity 0.4s" }}
      >
        {item.num}
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center icon-float"
            style={{
              background: hovered ? item.accent : `${item.accent}15`,
              color:      hovered ? "#000" : item.accent,
              boxShadow:  hovered ? `0 0 20px ${item.accent}50` : "none",
              transition: "all 0.3s",
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span
            className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded border"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: item.accent, borderColor: `${item.accent}30`, background: `${item.accent}08` }}
          >
            {item.tag}
          </span>
        </div>

        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.88rem", letterSpacing: "0.05em", color: hovered ? item.accent : "#fff" }}
        >
          {item.title}
        </h3>

        <div className="relative h-px mb-4 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: item.accent }}
          />
        </div>

        <ul className="space-y-2.5">
          {item.points.map((point, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm transition-colors duration-300"
              style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
            >
              <motion.div
                animate={hovered ? { x: [0, 3, 0] } : { x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05, repeat: hovered ? Infinity : 0, repeatDelay: 1 }}
              >
                <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: item.accent }} />
              </motion.div>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
});
PhilosophyCard.displayName = "PhilosophyCard";

/* ================================================================
   ROADMAP CARD — conic spin + animated top bar
================================================================ */
const RoadmapCard = memo(({ step }: { step: typeof roadmapSteps[0] }) => {
  const Icon = step.icon;
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
        style={{ background: `linear-gradient(to right, ${step.accent}, ${step.accent}20)`, width: hovered ? "100%" : "40%", transition: "width 0.5s ease" }}
      />

      {/* Watermark */}
      <div
        className="absolute -right-4 top-1/2 -translate-y-1/2 font-black pointer-events-none select-none leading-none"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "6rem", color: step.accent, opacity: hovered ? 0.06 : 0.025, transition: "opacity 0.4s" }}
      >
        {step.num}
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 50% 0%, ${step.accent}12, transparent 60%)`, transition: "opacity 0.5s" }}
      />

      <div className="relative z-10 p-6">
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

        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: hovered ? step.accent : `${step.accent}15`,
              color:      hovered ? "#000" : step.accent,
              boxShadow:  hovered ? `0 0 20px ${step.accent}50` : "none",
              transition: "all 0.3s",
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.88rem", color: hovered ? step.accent : "#fff" }}
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

        <ul className="space-y-2">
          {step.items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-sm transition-colors duration-300"
              style={{ color: hovered ? "#9ca3af" : "#6b7280" }}
            >
              <motion.div
                animate={hovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                transition={{ duration: 1, delay: idx * 0.2, repeat: hovered ? Infinity : 0 }}
                className="w-1 h-1 rounded-full shrink-0"
                style={{ background: step.accent }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
});
RoadmapCard.displayName = "RoadmapCard";

/* ================================================================
   PORTFOLIO CARD — cyberpunk reskin
================================================================ */
function PortfolioCard() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="mb-28">
      <motion.article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative overflow-hidden rounded-xl cursor-pointer"
        style={{
          background:  "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
          border:      `1px solid ${hovered ? "rgba(0,255,231,0.5)" : "rgba(255,255,255,0.07)"}`,
          boxShadow:   hovered
            ? "0 0 40px rgba(0,255,231,0.12), inset 0 1px 0 rgba(0,255,231,0.15), 0 20px 60px rgba(0,0,0,0.5)"
            : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
        onClick={() => navigate("/portfolio")}
      >
        {/* Sweeping highlight */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full w-full"
            style={{ background: "linear-gradient(90deg, transparent, #00ffe7, transparent)" }}
          />
        </div>

        {/* Corner brackets */}
        {hovered && (
          <>
            <div className="absolute top-0 left-0  w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0  w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
          </>
        )}

        {/* BG glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{ opacity: hovered ? 1 : 0, background: "radial-gradient(ellipse at top left, rgba(0,255,231,0.08), transparent 65%)" }}
        />

        <div className="relative z-10 p-6">
          {/* Identity */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center icon-float"
              style={{ background: "rgba(0,255,231,0.12)", border: "1px solid rgba(0,255,231,0.3)", color: "#00ffe7", boxShadow: hovered ? "0 0 20px rgba(0,255,231,0.3)" : "none", transition: "box-shadow 0.3s" }}
            >
              <User size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: hovered ? "#00ffe7" : "#fff", transition: "color 0.3s" }}
                >
                  Rushil Varade
                </h3>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1 h-1 bg-emerald-400 rounded-full" />
                  AVAILABLE
                </span>
              </div>
              <p className="text-cyan-400 text-sm truncate" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Cybersecurity · VAPT</p>
              <div className="flex flex-wrap gap-3 mt-0.5 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={9} />India</span>
                <span className="flex items-center gap-1"><GraduationCap size={9} />B.E. CS · 2025</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {socials.map(({ icon: SIcon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="p-1.5 rounded-lg border text-gray-400 hover:text-cyan-400 transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(0,255,231,0.08)"; el.style.borderColor = "rgba(0,255,231,0.4)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.03)"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  title={label}
                >
                  <SIcon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {portfolioStats.map(({ val, label, color }) => (
              <div
                key={label}
                className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/6"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
                <div className="text-xl font-bold leading-none" style={{ fontFamily: "'Orbitron', sans-serif", color, textShadow: `0 0 20px ${color}40` }}>{val}</div>
                <div className="text-sm text-gray-300" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            From a <span className="text-white font-semibold">43-tool browser security suite</span> to a full-stack cyber platform.{" "}
            <span style={{ color: "#00ffe7", fontFamily: "'Share Tech Mono', monospace" }}>The full story lives here →</span>
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); navigate("/portfolio"); }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-black text-sm focus:outline-none"
              style={{
                background:    "linear-gradient(135deg, #00ffe7, #3b82f6)",
                fontFamily:    "'Orbitron', sans-serif",
                fontSize:      "0.7rem",
                letterSpacing: "0.08em",
                boxShadow:     "0 0 20px rgba(0,255,231,0.25)",
              }}
            >
              <ExternalLink size={13} />
              VIEW PORTFOLIO
              <ArrowUpRight size={12} className="opacity-70" />
            </motion.button>

            <a
              href="/RushilVarade_Resume.pdf"
              download
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm transition-all duration-200 focus:outline-none"
              style={{ border: "1px solid rgba(0,255,231,0.2)", color: "#00ffe7", background: "rgba(0,255,231,0.03)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,231,0.5)"; el.style.background = "rgba(0,255,231,0.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,231,0.2)"; el.style.background = "rgba(0,255,231,0.03)"; }}
            >
              <FileDown size={13} />
              DOWNLOAD CV
            </a>

            <span className="ml-auto text-xs text-gray-600 flex items-center gap-0.5 pointer-events-none" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              explore <ArrowUpRight size={9} />
            </span>
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
}

/* ================================================================
   MAIN COMPONENT
================================================================ */
export default function About() {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: "transparent", fontFamily: "'Rajdhani', sans-serif" }}
    >
      <style>{GLOBAL_CSS}</style>

      {/* ── FIXED BACKGROUND — mirrors Home.tsx exactly ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <MatrixRain />
        <ParticleField />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 18% 0%,   rgba(0,255,231,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 82% 55%,  rgba(59,130,246,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 50%)" }} />
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scan-animate pointer-events-none" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.72) 100%)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-24">

        {/* ── HERO ── */}
        <motion.section variants={stagger} initial="hidden" animate="visible" className="mb-32">

          {/* Eyebrow */}
          <motion.div variants={fadeLeft} className="flex items-center gap-3 mb-8">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded border"
              style={{ borderColor: "rgba(0,255,231,0.25)", background: "rgba(0,255,231,0.05)", boxShadow: "0 0 20px rgba(0,255,231,0.07)" }}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
              <span className="text-cyan-400 text-xs tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                ~/about — SYSTEM ONLINE
              </span>
            </div>
            <div className="h-px flex-1 max-w-[200px]" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.4), transparent)", animation: "line-extend 1s ease-out forwards" }} />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white block mb-2">About</span>
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
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full block"
                style={{ background: "linear-gradient(90deg, #00ffe7, #3b82f6, #a855f7)" }}
              />
            </span>
          </motion.h1>

          {/* Sub-description */}
          <motion.div variants={fadeUp} className="max-w-2xl mb-8">
            <div className="flex gap-4 items-start">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-0.5 rounded-full shrink-0 mt-1"
                style={{ background: "linear-gradient(to bottom, #00ffe7, transparent)" }}
              />
              <p className="text-lg leading-relaxed" style={{ color: "#7a8899" }}>
                A beginner-first cybersecurity learning platform — making security{" "}
                <span className="text-white font-semibold">simple, structured, and accessible</span>{" "}
                from Linux and tools to cryptography, blockchain, and cyber laws.
              </p>
            </div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-6">
              {["beginner-friendly", "ethical-focus", "practical", "structured"].map(tag => (
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
          </motion.div>
        </motion.section>

        {/* ── INTRO + CREATOR — side-by-side ── */}
        <motion.section
          variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-5 gap-6 mb-28"
        >
          {/* Intro — wider */}
          <motion.div
            variants={fadeLeft}
            className="md:col-span-3 relative overflow-hidden rounded-xl border border-white/6"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.5), rgba(59,130,246,0.3), transparent)" }} />
            <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.04), transparent 70%)" }} />

            <div className="relative z-10 p-8">
              <SectionLabel num="01" label="About the Platform" />

              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p className="text-lg" style={{ color: "#c0cce0" }}>
                  <span style={{ color: "#00ffe7", fontFamily: "'Orbitron', sans-serif", fontWeight: "bold" }}>Cyber_World</span>{" "}
                  is a beginner-focused cybersecurity learning platform designed to make security concepts{" "}
                  <span className="text-white">simple, structured, and accessible.</span>
                </p>
                <p>
                  We guide learners through fundamentals first — ensuring crystal-clear understanding
                  before advancing to tools, techniques, and real-world scenarios.
                </p>
                <div className="flex items-start gap-3 pt-2 border-t border-white/5">
                  <Heart className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Strong emphasis on{" "}
                    <span style={{ color: "#00ffe7", fontFamily: "'Share Tech Mono', monospace" }}>ethical learning</span> and
                    responsible security practices at every step.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Creator — narrower */}
          <motion.div
            variants={fadeUp}
            className="md:col-span-2 relative overflow-hidden rounded-xl border border-white/6"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(59,130,246,0.5), rgba(168,85,247,0.3), transparent)" }} />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.06), transparent 70%)" }} />

            <div className="relative z-10 p-8">
              <SectionLabel num="02" label="Creator" />

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center icon-float"
                  style={{ background: "linear-gradient(135deg, rgba(0,255,231,0.15), rgba(59,130,246,0.15))", border: "1px solid rgba(0,255,231,0.25)", color: "#00ffe7", boxShadow: "0 0 20px rgba(0,255,231,0.1)" }}
                >
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-bold" style={{ fontFamily: "'Orbitron', sans-serif", color: "#00ffe7" }}>RYTNIX</p>
                  <p className="text-xs" style={{ color: "#3b82f6", fontFamily: "'Share Tech Mono', monospace" }}>Cybersecurity Learner</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  Cyber_World started as a personal project and evolved into a structured platform
                  for sharing knowledge in a{" "}
                  <span style={{ color: "#00ffe7", fontFamily: "'Share Tech Mono', monospace" }}>simple, beginner-focused</span> way.
                </p>
                <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                  <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p>Continuously evolving with new tools, techniques, and emerging technologies.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ── PORTFOLIO CARD ── */}
        <PortfolioCard />

        {/* ── PURPOSE & VISION ── */}
        <motion.section className="mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="03" label="Mission" />
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Purpose &amp; <span style={{ color: "#00ffe7" }}>Vision</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerFast} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                icon: Target, title: "Purpose", accent: "#00ffe7",
                body: "To remove confusion from cybersecurity learning by providing a clear, beginner-friendly path with structured guidance.",
                sub: "Understanding concepts before touching tools — solid foundations every time.",
                num: "01", tag: "CORE",
              },
              {
                icon: Globe, title: "Vision", accent: "#a855f7",
                body: "To become a trusted starting point for cybersecurity learners worldwide, building a community of ethical hackers.",
                sub: "Long-term skill development through consistent, ethical, community-driven learning.",
                num: "02", tag: "GOAL",
              },
            ].map(({ icon: Icon, title, body, sub, accent, num, tag }) => {
              const [h, setH] = useState(false);
              return (
                <motion.article
                  key={title}
                  variants={fadeUp}
                  onMouseEnter={() => setH(true)}
                  onMouseLeave={() => setH(false)}
                  className="group relative overflow-hidden rounded-xl"
                  style={{
                    background:  "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(5,10,20,0.9) 100%)",
                    border:      `1px solid ${h ? accent + "50" : "rgba(255,255,255,0.06)"}`,
                    boxShadow:   h ? `0 0 30px ${accent}15, inset 0 1px 0 ${accent}20` : "inset 0 1px 0 rgba(255,255,255,0.04)",
                    transition:  "border-color 0.4s, box-shadow 0.4s, transform 0.2s",
                    transform:   h ? "translateY(-6px)" : "translateY(0)",
                  }}
                >
                  {/* Sweeping highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                    <motion.div
                      animate={h ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="h-full w-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                    />
                  </div>

                  {/* Corner brackets */}
                  {h && (
                    <>
                      <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: accent }} />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: accent }} />
                      <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l" style={{ borderColor: accent }} />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: accent }} />
                    </>
                  )}

                  <div className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                    style={{ opacity: h ? 1 : 0, background: `radial-gradient(ellipse at 20% 30%, ${accent}10, transparent 60%)` }} />

                  <div className="absolute top-5 right-6 font-black pointer-events-none select-none leading-none"
                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "4rem", color: accent, opacity: h ? 0.08 : 0.025, transition: "opacity 0.4s" }}>
                    {num}
                  </div>

                  <div className="relative z-10 p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ background: h ? accent : `${accent}15`, color: h ? "#000" : accent, boxShadow: h ? `0 0 20px ${accent}50` : "none", transition: "all 0.3s" }}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold transition-colors duration-300"
                            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem", color: h ? accent : "#fff" }}>
                            {title}
                          </h3>
                          <div className="relative h-px mt-1 overflow-hidden bg-white/5 w-16">
                            <motion.div animate={{ width: h ? "100%" : "2rem" }} transition={{ duration: 0.4 }}
                              className="absolute left-0 top-0 h-full" style={{ background: accent }} />
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded border"
                        style={{ fontFamily: "'Share Tech Mono', monospace", color: accent, borderColor: `${accent}30`, background: `${accent}08` }}>
                        {tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3 transition-colors duration-300" style={{ color: h ? "#c0cce0" : "#6b7280" }}>{body}</p>
                    <p className="text-xs leading-relaxed transition-colors duration-300" style={{ color: h ? "#6b7280" : "#4b5563" }}>{sub}</p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        {/* ── LEARNING PHILOSOPHY ── */}
        <motion.section className="mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="04" label="Approach" />
            <div className="flex items-end justify-between">
              <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Learning <span style={{ color: "#00ffe7" }}>Philosophy</span>
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#555" }}>
                <span>03 PILLARS</span>
                <div className="w-16 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerFast} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-5 md:grid-cols-3"
          >
            {philosophyItems.map(item => <PhilosophyCard key={item.title} item={item} />)}
          </motion.div>
        </motion.section>

        {/* ── WHAT YOU'LL LEARN ── */}
        <motion.section variants={fadeIn} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-50px" }} className="mb-28">

          <motion.div variants={fadeUp} className="mb-12">
            <SectionLabel num="05" label="Curriculum" />
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              What You'll <span style={{ color: "#00ffe7" }}>Learn</span>
            </h2>
          </motion.div>

          <div
            className="relative overflow-hidden rounded-2xl border border-white/6 p-8"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.5), rgba(59,130,246,0.3), transparent)" }} />
            <div className="absolute -top-20 -right-20 w-72 h-72 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.04), transparent 70%)" }} />

            <motion.div
              variants={staggerFast} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10"
            >
              {learningTopics.map((topic, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/4 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = topic.accent + "40"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)"; }}
                >
                  <span className="text-2xl select-none">{topic.icon}</span>
                  <div>
                    <div className="w-4 h-0.5 rounded mb-1.5 transition-all duration-300 group-hover:w-full" style={{ background: topic.accent }} />
                    <span className="text-sm text-gray-500 group-hover:text-gray-200 transition-colors">{topic.text}</span>
                  </div>
                </motion.div>
              ))}
              {/* Decorative */}
              <motion.div variants={fadeUp} className="hidden lg:flex items-center justify-center p-4 rounded-xl border border-dashed border-white/5">
                <div className="text-center">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Zap className="w-6 h-6 mx-auto mb-1" style={{ color: "rgba(0,255,231,0.3)" }} />
                  </motion.div>
                  <span className="text-xs text-gray-600" style={{ fontFamily: "'Share Tech Mono', monospace" }}>+more soon</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ── ROADMAP ── */}
        <motion.section className="mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="06" label="Path" />
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Learning <span style={{ color: "#00ffe7" }}>Roadmap</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Animated connector line */}
            <div
              className="absolute top-[2.5rem] left-0 right-0 h-px hidden lg:block overflow-hidden"
              style={{ background: "linear-gradient(to right, rgba(0,255,231,0.25), rgba(59,130,246,0.25), rgba(168,85,247,0.25), rgba(99,102,241,0.25))" }}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 h-full w-1/4"
                style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.7), transparent)" }}
              />
            </div>

            <motion.div
              variants={staggerFast} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 relative z-10"
            >
              {roadmapSteps.map(step => <RoadmapCard key={step.title} step={step} />)}
            </motion.div>
          </div>
        </motion.section>

        {/* ── FUTURE GOALS ── */}
        <motion.section variants={fadeIn} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-50px" }} className="mb-28">

          <motion.div variants={fadeUp} className="mb-12">
            <SectionLabel num="07" label="Roadmap" />
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Future <span style={{ color: "#00ffe7" }}>Goals</span>
            </h2>
          </motion.div>

          <div
            className="relative overflow-hidden rounded-2xl border border-white/6 p-8"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(168,85,247,0.5), rgba(99,102,241,0.3), transparent)" }} />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.05), transparent 70%)" }} />

            <motion.div
              variants={staggerFast} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4 relative z-10"
            >
              {futureGoals.map((goal, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/4 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = goal.accent + "40"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)"; }}
                >
                  <span className="text-2xl select-none">{goal.icon}</span>
                  <div className="flex-1">
                    <div className="w-4 h-0.5 rounded mb-1.5 transition-all duration-300 group-hover:w-full" style={{ background: goal.accent }} />
                    <span className="text-sm text-gray-500 group-hover:text-gray-200 transition-colors">{goal.text}</span>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: goal.accent }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ── FOOTER CTA — mirrors Home.tsx ── */}
        <motion.footer variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
                  status: active
                </span>
              </motion.div>

              <p
                className="text-4xl sm:text-5xl font-black mb-4 flicker"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span className="text-white">Learn. </span>
                <span className="text-white">Practice. </span>
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

              <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm leading-relaxed" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                Cybersecurity made simple — one concept at a time.
              </p>

              <motion.a
                href="/start"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-lg font-black transition-all duration-300"
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
                START LEARNING FREE
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
              </motion.a>
            </div>
          </div>
        </motion.footer>

      </div>
    </motion.div>
  );
}