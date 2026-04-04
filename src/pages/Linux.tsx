import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

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
   SECTION LABEL
=============================== */
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
   DATA
=============================== */
const features = [
  { icon: "🆓", title: "Free & Open Source", text: "Complete access to source code. No licensing fees, no vendor lock-in. Modify, distribute, and learn from the code freely.", accent: "#00ffe7", num: "01", tag: "FOSS" },
  { icon: "⚡", title: "High Performance",   text: "Optimized resource management and lightweight architecture. Runs efficiently on hardware from Raspberry Pi to mainframes.", accent: "#3b82f6", num: "02", tag: "PERF" },
  { icon: "🔐", title: "Enterprise Security",text: "Built-in SELinux, AppArmor, and strong permission models. Rapid security updates and transparent vulnerability management.", accent: "#a855f7", num: "03", tag: "SEC"  },
  { icon: "🛠️", title: "Fully Customizable", text: "Choose your desktop environment, init system, and every component. Build systems tailored for servers, desktops, or embedded devices.", accent: "#00ffe7", num: "04", tag: "CUSTOM" },
  { icon: "🌍", title: "Massive Community",  text: "Millions of developers worldwide. Extensive documentation, forums, and support channels for every skill level.", accent: "#3b82f6", num: "05", tag: "COMM" },
  { icon: "🔄", title: "Rolling Updates",    text: "Continuous improvements without major upgrades. Stay current with the latest features and security patches.", accent: "#a855f7", num: "06", tag: "UPDATES" },
  { icon: "🖥️", title: "Server Dominance",   text: "Powers the internet's backbone. Industry standard for web servers, databases, and cloud infrastructure.", accent: "#00ffe7", num: "07", tag: "SRV" },
  { icon: "🧪", title: "Developer Friendly", text: "Native support for virtually all programming languages. Powerful CLI tools, package managers, and development environments.", accent: "#3b82f6", num: "08", tag: "DEV" },
];

const distros = [
  { name: "Ubuntu",      icon: "🟠", desc: "Most popular desktop Linux. Beginner-friendly with extensive software repositories and LTS support.", use: "Desktop, Server, Cloud",    accent: "#f97316" },
  { name: "Kali Linux",  icon: "🐉", desc: "Penetration testing and security auditing. Pre-loaded with 600+ security tools for ethical hackers.", use: "Cybersecurity, Pentesting", accent: "#00ffe7" },
  { name: "Debian",      icon: "🔴", desc: "Rock-solid stability and security. Foundation for Ubuntu and many other distributions.", use: "Servers, Stability-Critical",   accent: "#ef4444" },
  { name: "Fedora",      icon: "🔵", desc: "Cutting-edge features and latest software. Sponsored by Red Hat for developers and enthusiasts.", use: "Development, Workstation",   accent: "#3b82f6" },
  { name: "Arch Linux",  icon: "⚫", desc: "Rolling release with complete customization. Build your system from the ground up (for advanced users).", use: "Advanced Users, Custom Builds", accent: "#a855f7" },
  { name: "CentOS/RHEL", icon: "🟣", desc: "Enterprise-grade stability and long-term support. Industry standard for production servers.", use: "Enterprise Servers",           accent: "#a855f7" },
];

const learningPath = [
  { title: "🏠 Linux Home",       desc: "Installation guides, virtual machine setup, dual boot configuration, and getting started with your first Linux system.", path: "/linux/home",       difficulty: "Beginner",     topics: ["VM Setup", "Installation", "First Steps"], accent: "#00ffe7", num: "01" },
  { title: "📘 Linux Basics",     desc: "Terminal fundamentals, shell commands, file operations, package management, and essential system administration.", path: "/linux/basics",     difficulty: "Beginner",     topics: ["CLI Basics", "Shell", "Commands"],          accent: "#3b82f6", num: "02" },
  { title: "📂 Linux Files",      desc: "File system hierarchy, permissions, ownership, symbolic links, and advanced file management techniques.", path: "/linux/files",      difficulty: "Intermediate", topics: ["Permissions", "Hierarchy", "Links"],        accent: "#a855f7", num: "03" },
  { title: "🌐 Linux Networking", desc: "Network configuration, protocols, services, firewall management, and advanced networking tools for system security.", path: "/linux/networking", difficulty: "Intermediate", topics: ["TCP/IP", "Firewall", "Services"],           accent: "#00ffe7", num: "04" },
  { title: "🧰 Tools & Commands", desc: "Comprehensive command reference, Kali tools, automation scripts, and real-world usage examples for penetration testing.", path: "/linux/toolscmd",  difficulty: "Advanced",     topics: ["Kali Tools", "Scripting", "Automation"],    accent: "#3b82f6", num: "05" },
];

const useCases = [
  { icon: "☁️", title: "Cloud Computing",   desc: "AWS, Google Cloud, and Azure run primarily on Linux. Powers containerization with Docker and Kubernetes.",                       accent: "#00ffe7" },
  { icon: "🖥️", title: "Web Servers",       desc: "Apache and Nginx on Linux serve the majority of websites. LAMP/LEMP stacks dominate web hosting.",                             accent: "#3b82f6" },
  { icon: "📱", title: "Mobile & Embedded", desc: "Android OS is built on Linux kernel. Powers IoT devices, routers, smart TVs, and automotive systems.",                         accent: "#a855f7" },
  { icon: "🔬", title: "Scientific Research",desc: "100% of top 500 supercomputers run Linux. Essential for AI/ML, data analysis, and simulations.",                              accent: "#00ffe7" },
  { icon: "🎮", title: "Gaming & Media",     desc: "Steam Deck, rendering farms, and visual effects studios. Growing gaming support via Proton/Wine.",                             accent: "#3b82f6" },
  { icon: "🏢", title: "Enterprise Systems", desc: "Database servers, CRM systems, and business applications. Critical for financial and healthcare IT.",                          accent: "#a855f7" },
];

const stats = [
  { val: 96, suffix: "%",  label: "Top Million Servers" },
  { val: 3,  suffix: "B+", label: "Android Devices"     },
  { val: 500,suffix: "+",  label: "Linux Distros"        },
  { val: 33, suffix: "yrs",label: "Years of History"     },
];
const STAT_COLORS = ["#00ffe7", "#3b82f6", "#a855f7", "#00ffe7"] as const;

/* ===============================
   FEATURE CARD
=============================== */
const FeatureCard = memo(({ item }: { item: typeof features[0] }) => {
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
          ? `0 0 30px ${item.accent}15, inset 0 1px 0 ${item.accent}20, 0 20px 60px rgba(0,0,0,0.5)`
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-full w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
        />
      </div>

      {hovered && (
        <>
          <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: item.accent }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: item.accent }} />
          <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l" style={{ borderColor: item.accent }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: item.accent }} />
        </>
      )}

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 30% 30%, ${item.accent}10, transparent 65%)` }}
      />

      <div
        className="absolute -right-2 -bottom-4 font-black leading-none pointer-events-none select-none"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "5rem", color: item.accent, opacity: hovered ? 0.08 : 0.025, transition: "opacity 0.4s" }}
      >
        {item.num}
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl select-none">{item.icon}</div>
          <span
            className="text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded border"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: item.accent, borderColor: `${item.accent}30`, background: `${item.accent}08` }}
          >
            {item.tag}
          </span>
        </div>

        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.82rem", letterSpacing: "0.05em", color: hovered ? item.accent : "#fff" }}
        >
          {item.title}
        </h3>

        <div className="relative h-px mb-3 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: item.accent }}
          />
        </div>

        <p className="text-sm leading-relaxed transition-colors duration-300" style={{ color: hovered ? "#9ca3af" : "#6b7280" }}>
          {item.text}
        </p>
      </div>
    </motion.div>
  );
});
FeatureCard.displayName = "FeatureCard";

/* ===============================
   DISTRO CARD
=============================== */
const DistroCard = memo(({ distro }: { distro: typeof distros[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl"
      style={{
        background: "rgba(0,0,0,0.55)",
        border:     `1px solid ${hovered ? distro.accent + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow:  hovered ? `0 0 40px ${distro.accent}12, 0 20px 60px rgba(0,0,0,0.6)` : "none",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <div
        className="absolute top-0 left-0 h-0.5 rounded-tl-xl"
        style={{ background: `linear-gradient(to right, ${distro.accent}, ${distro.accent}20)`, width: hovered ? "100%" : "40%", transition: "width 0.5s ease" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 50% 0%, ${distro.accent}12, transparent 60%)`, transition: "opacity 0.5s" }}
      />

      <div className="relative z-10 p-6 flex items-start gap-4">
        <div className="text-4xl select-none">{distro.icon}</div>
        <div className="flex-1">
          <h3
            className="font-bold text-xl mb-2 transition-colors duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.9rem", color: hovered ? distro.accent : "#fff" }}
          >
            {distro.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 leading-relaxed">{distro.desc}</p>
          <span
            className="inline-block px-3 py-1 rounded border text-xs font-bold"
            style={{ fontFamily: "'Share Tech Mono', monospace", color: distro.accent, borderColor: `${distro.accent}30`, background: `${distro.accent}08` }}
          >
            {distro.use}
          </span>
        </div>
      </div>
    </motion.div>
  );
});
DistroCard.displayName = "DistroCard";

/* ===============================
   LEARNING PATH CARD
=============================== */
const LearningCard = memo(({ item }: { item: typeof learningPath[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-xl"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(5,10,20,0.9))",
        border:     `1px solid ${hovered ? item.accent + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow:  hovered ? `0 0 30px ${item.accent}15, 0 20px 60px rgba(0,0,0,0.5)` : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {hovered && (
        <>
          <div className="absolute top-0 left-0  w-3 h-3 border-t border-l" style={{ borderColor: item.accent }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: item.accent }} />
          <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l" style={{ borderColor: item.accent }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: item.accent }} />
        </>
      )}

      <div
        className="absolute -right-4 -bottom-6 font-black pointer-events-none select-none leading-none"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "5rem", color: item.accent, opacity: hovered ? 0.07 : 0.02, transition: "opacity 0.4s" }}
      >
        {item.num}
      </div>

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 30% 20%, ${item.accent}10, transparent 65%)` }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded border"
            style={{ fontFamily: "'Share Tech Mono', monospace", background: `${item.accent}12`, borderColor: `${item.accent}40`, color: item.accent, boxShadow: hovered ? `0 0 12px ${item.accent}40` : "none", transition: "box-shadow 0.3s" }}
          >
            <motion.span
              animate={{ scale: hovered ? [1, 1.5, 1] : 1 }}
              transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: item.accent }}
            />
            {item.difficulty}
          </span>
        </div>

        <h3
          className="font-bold mb-1 transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.82rem", letterSpacing: "0.05em", color: hovered ? item.accent : "#fff" }}
        >
          {item.title}
        </h3>

        <div className="relative h-px mb-3 overflow-hidden bg-white/5">
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem" }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 h-full"
            style={{ background: item.accent }}
          />
        </div>

        <p className="text-sm mb-4 leading-relaxed" style={{ color: hovered ? "#9ca3af" : "#6b7280" }}>
          {item.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.topics.map(t => (
            <span
              key={t}
              className="px-2 py-1 rounded border text-xs"
              style={{ fontFamily: "'Share Tech Mono', monospace", background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "#6b7280" }}
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          to={item.path}
          className="inline-flex items-center gap-1.5 font-medium transition-all duration-200"
          style={{ color: item.accent, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem" }}
        >
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>›</motion.span>
          START LEARNING →
        </Link>
      </div>
    </motion.div>
  );
});
LearningCard.displayName = "LearningCard";

/* ===============================
   USE CASE CARD
=============================== */
const UseCaseCard = memo(({ item }: { item: typeof useCases[0] }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl cursor-default"
      style={{
        background: "rgba(0,0,0,0.55)",
        border:     `1px solid ${hovered ? item.accent + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow:  hovered ? `0 0 30px ${item.accent}12, 0 20px 40px rgba(0,0,0,0.5)` : "none",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <div
        className="absolute top-0 left-0 h-0.5"
        style={{ background: `linear-gradient(to right, ${item.accent}, transparent)`, width: hovered ? "100%" : "30%", transition: "width 0.5s ease" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse at 30% 30%, ${item.accent}10, transparent 60%)`, transition: "opacity 0.5s" }}
      />

      <div className="relative z-10 p-6">
        <div className="text-4xl mb-4 select-none">{item.icon}</div>
        <h3
          className="font-bold mb-2 transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.82rem", letterSpacing: "0.05em", color: hovered ? item.accent : "#fff" }}
        >
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: hovered ? "#9ca3af" : "#6b7280" }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
});
UseCaseCard.displayName = "UseCaseCard";

/* ===============================
   COMPONENT
=============================== */
export default function Linux() {
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
                ~/linux — MODULE LOADED
              </span>
            </div>
            <div
              className="h-px flex-1 max-w-[200px]"
              style={{ background: "linear-gradient(to right, rgba(0,255,231,0.4), transparent)" }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white block mb-2">Master</span>
            <span className="relative inline-block">
              <span
                className="neon-text"
                style={{ background: "linear-gradient(135deg, #00ffe7 0%, #3b82f6 50%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Linux
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full block"
                style={{ background: "linear-gradient(90deg, #00ffe7, #3b82f6, #a855f7)" }}
              />
            </span>
            <span className="text-white block mt-2">OS</span>
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
                Linux is a powerful, free, and open-source operating system kernel that forms the foundation
                of countless distributions. From smartphones to supercomputers, Linux powers modern digital
                infrastructure with{" "}
                <span className="text-white font-semibold">unmatched stability, security, and flexibility.</span>
              </p>
            </div>
          </motion.div>

          {/* Hashtags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-16">
            {["open-source", "unix-based", "kernel-5.x", "cybersecurity-standard", "free-forever"].map(tag => (
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
            THE LINUX STORY
        ====================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-28"
        >
          <SectionLabel num="01" label="History" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            The Linux <span style={{ color: "#00ffe7" }}>Story</span>
          </h2>

          <div
            className="relative overflow-hidden rounded-2xl p-8 border border-white/6"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(0,255,231,0.5), rgba(59,130,246,0.3), transparent)" }} />

            <div className="flex items-start gap-6">
              <div className="text-5xl select-none">📜</div>
              <div className="space-y-4 text-gray-400 leading-relaxed text-sm">
                <p>
                  In 1991, a Finnish computer science student named{" "}
                  <span className="text-cyan-400 font-semibold" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Linus Torvalds</span>{" "}
                  announced his hobby project: a free operating system kernel. What started as a personal
                  endeavor evolved into one of the largest collaborative software projects in history.
                </p>
                <p>
                  Combined with GNU tools developed by Richard Stallman's Free Software Foundation, Linux
                  became a complete operating system. Today, it powers over{" "}
                  <span className="text-cyan-400 font-semibold">96.3% of the world's top million servers</span>,
                  runs on <span className="text-cyan-400 font-semibold">3+ billion Android devices</span>, and
                  drives innovation in cloud computing, IoT, cybersecurity, and scientific research.
                </p>
                <div
                  className="p-4 rounded-lg border-l-2 border-cyan-400/50"
                  style={{ background: "rgba(0,255,231,0.03)" }}
                >
                  <p className="text-xs italic text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    "I'm doing a (free) operating system (just a hobby, won't be big and professional...)"
                    <br />— Linus Torvalds, August 1991
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ======================
            KEY FEATURES
        ====================== */}
        <section className="mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="02" label="Core Advantages" />
            <div className="flex items-end justify-between">
              <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Why Choose <span style={{ color: "#00ffe7" }}>Linux?</span>
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#555" }}>
                <span>08 FEATURES</span>
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
            {features.map((item, i) => <FeatureCard key={i} item={item} />)}
          </motion.div>
        </section>

        {/* ======================
            DISTRIBUTIONS
        ====================== */}
        <section className="mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="03" label="Distributions" />
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Popular <span style={{ color: "#00ffe7" }}>Distros</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {distros.map((d, i) => <DistroCard key={i} distro={d} />)}
          </motion.div>
        </section>

        {/* ======================
            LEARNING PATH
        ====================== */}
        <section className="mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="04" label="Learning Path" />
            <div className="flex items-end justify-between">
              <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Linux <span style={{ color: "#00ffe7" }}>Curriculum</span>
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#555" }}>
                <span>05 MODULES</span>
                <div className="w-16 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </div>
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
              className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 relative z-10"
            >
              {learningPath.map((item, i) => <LearningCard key={i} item={item} />)}
            </motion.div>
          </div>
        </section>

        {/* ======================
            WHY LINUX FOR CYBERSECURITY
        ====================== */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-28"
        >
          <SectionLabel num="05" label="Cybersecurity" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Why Linux <span style={{ color: "#00ffe7" }}>Dominates</span> Security
          </h2>

          <div
            className="relative overflow-hidden rounded-2xl p-8 border border-white/6"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <CyberCorner pos="tl" /><CyberCorner pos="tr" /><CyberCorner pos="bl" /><CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(59,130,246,0.5), rgba(0,255,231,0.3), transparent)" }} />

            <div className="flex items-start gap-6">
              <div className="text-5xl select-none">🧑‍💻</div>
              <div className="flex-1">
                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  {[
                    { icon: "🔍", title: "Deep System Access",      text: "Complete transparency into system operations. Access kernel modules, system calls, and low-level networking for comprehensive security analysis.", accent: "#00ffe7" },
                    { icon: "🛠️", title: "Native Security Tools",   text: "Built-in support for penetration testing, network analysis, forensics, and vulnerability assessment without additional software layers.", accent: "#3b82f6" },
                    { icon: "💻", title: "Powerful CLI & Scripting", text: "Automate complex security tasks with Bash, Python, and Perl. Create custom tools and workflows for efficient security operations.", accent: "#a855f7" },
                    { icon: "🌐", title: "Advanced Networking",      text: "Native tools for packet capture, traffic analysis, firewall configuration, and network monitoring critical for security professionals.", accent: "#00ffe7" },
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-xl select-none mt-0.5">{pt.icon}</span>
                      <div>
                        <h3 className="font-semibold mb-1 text-sm" style={{ fontFamily: "'Orbitron', sans-serif", color: pt.accent }}>{pt.title}</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">{pt.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="p-4 rounded-lg border"
                  style={{ background: "rgba(59,130,246,0.05)", borderColor: "rgba(59,130,246,0.2)" }}
                >
                  <p className="text-gray-400 text-sm leading-relaxed">
                    <span className="text-blue-400 font-semibold" style={{ fontFamily: "'Share Tech Mono', monospace" }}>INDUSTRY STANDARD:</span>{" "}
                    Linux distributions like Kali, Parrot OS, and BlackArch provide pre-configured environments
                    with 1000+ security tools, making them essential platforms for penetration testers, security
                    researchers, and ethical hackers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ======================
            REAL-WORLD USE CASES
        ====================== */}
        <section className="mb-28">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <SectionLabel num="06" label="Applications" />
            <h2 className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Real-World <span style={{ color: "#00ffe7" }}>Applications</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {useCases.map((item, i) => <UseCaseCard key={i} item={item} />)}
          </motion.div>
        </section>

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
                <h3
                  className="font-bold text-2xl mb-1"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: "#ff2d55" }}
                >
                  Educational & Ethical Use Only
                </h3>
                <div className="h-0.5 w-24 rounded-full mb-2" style={{ background: "linear-gradient(to right, #ff2d55, #f97316)" }} />
              </div>
            </div>

            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                All Linux and cybersecurity content on{" "}
                <span className="text-red-400 font-bold" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Cyber_World</span>{" "}
                is provided strictly for{" "}
                <span className="text-white font-semibold">educational purposes</span> and{" "}
                <span className="text-white font-semibold">authorized security testing</span> only.
              </p>

              <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg border" style={{ background: "rgba(0,0,0,0.3)", borderColor: "rgba(255,45,85,0.15)" }}>
                <div>
                  <h4 className="font-semibold mb-2 text-red-400 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>❌ PROHIBITED:</h4>
                  <ul className="space-y-1 text-xs text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    <li>• Unauthorized access to systems</li>
                    <li>• Malicious hacking or cracking</li>
                    <li>• Data theft or system damage</li>
                    <li>• Illegal surveillance or espionage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-400 text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>✅ PERMITTED:</h4>
                  <ul className="space-y-1 text-xs text-gray-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    <li>• Learning &amp; skill development</li>
                    <li>• Authorized penetration testing</li>
                    <li>• Personal lab environments</li>
                    <li>• Ethical security research</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs italic text-gray-600 border-l-2 border-red-400/30 pl-4" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                Users are solely responsible for complying with all applicable laws, regulations, and ethical
                guidelines. Unauthorized access to computer systems is illegal under laws such as the Computer
                Fraud and Abuse Act (CFAA) and similar international legislation.
              </p>
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
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
                <span className="text-xs text-cyan-400 tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  status: linux module online
                </span>
              </motion.div>

              <p className="text-5xl sm:text-6xl font-black mb-4 flicker" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                <span className="text-white">Learn. </span>
                <span className="text-white">Build. </span>
                <span
                  className="neon-text"
                  style={{ background: "linear-gradient(135deg, #00ffe7, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  Secure.
                </span>
              </p>

              <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm leading-relaxed" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                Linux mastery is the foundation of every great cybersecurity career.
                Start from zero and build up to enterprise-level skills.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/linux/home"
                  className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg font-black transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #00ffe7 0%, #3b82f6 100%)", color: "#000", fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", boxShadow: "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(0,255,231,0.5), 0 0 100px rgba(0,255,231,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,231,0.3), 0 0 80px rgba(0,255,231,0.1)"; }}
                >
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                  START LINUX NOW
                </Link>

                <Link
                  to="/linux/basics"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all duration-300"
                  style={{ border: "1px solid rgba(0,255,231,0.2)", color: "#00ffe7", background: "rgba(0,255,231,0.03)", fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,231,0.5)"; el.style.background = "rgba(0,255,231,0.08)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,255,231,0.2)"; el.style.background = "rgba(0,255,231,0.03)"; }}
                >
                  LINUX BASICS →
                </Link>
              </div>
            </div>
          </div>
        </motion.footer>

      </div>
    </motion.div>
  );
}