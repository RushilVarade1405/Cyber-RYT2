import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

    :root {
      --c:   #00ffe7;
      --c2:  #00bfff;
      --g:   #39ff14;
      --y:   #ffd700;
      --r:   #ff3b5c;
      --p:   #bf5fff;
      --o:   #ff8c42;
      --bg:  #03080f;
      --s1:  rgba(0,255,231,0.06);
      --s2:  rgba(0,191,255,0.06);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); }

    .orb  { font-family: 'Orbitron', monospace; }
    .mono { font-family: 'Share Tech Mono', monospace; }

    /* scanlines overlay */
    .scanlines::after {
      content: '';
      position: absolute; inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0,255,231,0.012) 3px,
        rgba(0,255,231,0.012) 4px
      );
      pointer-events: none;
      z-index: 10;
    }

    /* hex grid bg */
    .hexgrid {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32L28 66zm0-8l20-12V30L28 18 8 30v16l20 12z' fill='none' stroke='rgba(0,255,231,0.04)' stroke-width='1'/%3E%3C/svg%3E");
    }

    .glow-c  { text-shadow: 0 0 20px var(--c), 0 0 50px rgba(0,255,231,0.3); }
    .glow-g  { text-shadow: 0 0 20px var(--g), 0 0 50px rgba(57,255,20,0.3); }
    .glow-r  { text-shadow: 0 0 20px var(--r); }
    .glow-y  { text-shadow: 0 0 20px var(--y); }

    .card {
      border-radius: 12px;
      border: 1px solid rgba(0,255,231,0.12);
      background: rgba(0,10,18,0.9);
      backdrop-filter: blur(16px);
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--c), transparent);
      opacity: 0.4;
    }
    .card:hover { border-color: rgba(0,255,231,0.3); }

    .stat-card {
      border-radius: 10px;
      border: 1px solid;
      background: rgba(0,5,12,0.95);
      position: relative;
      overflow: hidden;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .stat-card:hover { transform: translateY(-3px); }

    .pill {
      font-size: 9px;
      letter-spacing: 0.15em;
      padding: 2px 8px;
      border-radius: 3px;
      border: 1px solid;
    }

    @keyframes flicker {
      0%,100%{opacity:1}93%{opacity:1}94%{opacity:.5}95%{opacity:1}98%{opacity:.8}99%{opacity:1}
    }
    .flicker { animation: flicker 9s ease-in-out infinite; }

    @keyframes blink { 0%,49%{opacity:1}50%,100%{opacity:0} }
    .blink { animation: blink 1s step-end infinite; }

    @keyframes scanmove {
      0%  { transform: translateY(-100%); }
      100%{ transform: translateY(100vh); }
    }
    .scan-beam {
      position: fixed; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(0,255,231,0.35), transparent);
      animation: scanmove 6s linear infinite;
      pointer-events: none; z-index: 50;
    }

    @keyframes pulse-ring {
      0%  { transform: scale(0.9); opacity: 0.7; }
      100%{ transform: scale(1.6); opacity: 0; }
    }
    .pulse-ring::after {
      content: '';
      position: absolute; inset: -4px;
      border-radius: 50%;
      border: 2px solid var(--g);
      animation: pulse-ring 1.4s ease-out infinite;
    }

    @keyframes matrix-scroll { from{background-position:0 0} to{background-position:0 100%} }

    @keyframes dash {
      to { stroke-dashoffset: -100; }
    }
    .dash-animate { animation: dash 3s linear infinite; }

    @keyframes count-up {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .count-up { animation: count-up 0.4s ease-out forwards; }

    /* threat level bar fill */
    @keyframes bar-fill { from{width:0} }
    .bar-fill { animation: bar-fill 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards; }

    /* glitch */
    @keyframes glitch {
      0%,100%{clip-path:inset(0 0 100% 0)}
      20%{clip-path:inset(20% 0 40% 0);transform:translate(-3px)}
      40%{clip-path:inset(60% 0 20% 0);transform:translate(3px)}
      60%{clip-path:inset(10% 0 70% 0);transform:translate(-2px)}
      80%{clip-path:inset(80% 0 5% 0);transform:translate(2px)}
    }
    .glitch-layer {
      position: absolute; inset: 0;
      color: var(--r);
      animation: glitch 6s step-end infinite;
      opacity: 0.6;
    }

    /* scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(0,255,231,0.2); border-radius: 2px; }
  `}</style>
);

/* ─────────────────────────────────────────
   MATRIX RAIN CANVAS
───────────────────────────────────────── */
function MatrixRain({ opacity = 0.08 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const F = 11;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    let drops: number[] = [];
    const reset = () => { drops = Array(Math.floor(c.width / F)).fill(1) as number[]; };
    reset();
    const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
    const id = setInterval(() => {
      if (drops.length !== Math.floor(c.width / F)) reset();
      ctx.fillStyle = "rgba(3,8,15,0.07)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${F}px monospace`;
      drops.forEach((y, i) => {
        const bright = Math.random() > 0.96;
        ctx.fillStyle = bright ? "#fff" : i % 4 === 0 ? "#00ffe7" : i % 4 === 1 ? "#00bfff" : "#005f6b";
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * F, y * F);
        if (y * F > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 45);
    return () => { clearInterval(id); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity, pointerEvents:"none" }} />;
}

/* ─────────────────────────────────────────
   LIVE TERMINAL LOG
───────────────────────────────────────── */
const LOG_LINES = [
  { t: "SYS",  c: "var(--c)", msg: "kernel.boot() → SECURE MODE ACTIVE" },
  { t: "NET",  c: "var(--c2)", msg: "firewall.init() → 4096-bit RSA loaded" },
  { t: "AUTH", c: "var(--g)", msg: "biometric.scan() → IDENTITY CONFIRMED" },
  { t: "SCAN", c: "var(--y)", msg: "network.sweep() → 0 threats detected" },
  { t: "VAULT",c: "var(--p)", msg: "vault.open() → AES-256 keys rotated" },
  { t: "NODE", c: "var(--o)", msg: "cluster.sync() → 7 nodes responsive" },
  { t: "SYS",  c: "var(--c)", msg: "runtime.status() → uptime 99.97%" },
  { t: "SEC",  c: "var(--g)", msg: "honeypot.check() → 1204 packets blocked" },
  { t: "DB",   c: "var(--c2)", msg: "db.replicate() → mirror sync complete" },
  { t: "CRON", c: "var(--y)", msg: "backup.run() → 8841 files archived" },
];

function Terminal() {
  const [lines, setLines] = useState<typeof LOG_LINES>([]);
  const [idx, setIdx] = useState(0);


  useEffect(() => {
    if (idx >= LOG_LINES.length) return;
    const t = setTimeout(() => {
      setLines(l => [...l, LOG_LINES[idx]]);
      setIdx(i => i + 1);
    }, 600 + Math.random() * 700);
    return () => clearTimeout(t);
  }, [idx]);



  return (
    <div className="card p-4" style={{ minHeight: 220 }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full relative pulse-ring" style={{ background: "var(--g)" }} />
        <span className="mono text-xs tracking-widest" style={{ color: "var(--g)" }}>LIVE SYSTEM TERMINAL</span>
        <span className="mono text-xs ml-auto" style={{ color: "rgba(0,255,231,0.3)" }}>SESSION:root@RYTNIX</span>
      </div>
      <div className="space-y-1" style={{ maxHeight: 200, overflowY: "auto" }}>
        {lines.map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            className="mono text-xs flex gap-3 items-start">
            <span className="pill shrink-0" style={{ color: l.c, borderColor: l.c + "50", background: l.c + "12" }}>{l.t}</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>$ {l.msg}</span>
          </motion.div>
        ))}
        {idx < LOG_LINES.length && (
          <div className="mono text-xs" style={{ color: "var(--c)" }}>$ <span className="blink">█</span></div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   THREAT RADAR (animated SVG)
───────────────────────────────────────── */
function ThreatRadar() {
  const [angle, setAngle] = useState(0);
  const [blips, setBlips] = useState<{x:number;y:number;age:number;col:string}[]>([]);
  const COLS = ["#00ffe7","#00bfff","#39ff14","#ffd700"];

  useEffect(() => {
    const id = setInterval(() => setAngle(a => (a + 2) % 360), 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (angle % 40 === 0) {
      setBlips(b => {
        const nb = b
          .map(p => ({ ...p, age: p.age + 1 }))
          .filter(p => p.age < 8);
        const r = 25 + Math.random() * 50;
        const a2 = (angle * Math.PI) / 180;
        nb.push({ x: 80 + r * Math.cos(a2), y: 80 + r * Math.sin(a2), age: 0, col: COLS[Math.floor(Math.random()*COLS.length)] });
        return nb;
      });
    }
  }, [angle]);

  const rad = (angle * Math.PI) / 180;

  return (
    <div className="card p-4 flex flex-col items-center gap-3">
      <div className="mono text-xs tracking-widest w-full" style={{ color: "var(--c)" }}>THREAT RADAR</div>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <radialGradient id="rg">
            <stop offset="0%" stopColor="#00ffe7" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#00ffe7" stopOpacity="0" />
          </radialGradient>
          <filter id="blur2">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {/* rings */}
        {[20,40,60,80].map(r => (
          <circle key={r} cx="80" cy="80" r={r} fill="none" stroke="rgba(0,255,231,0.12)" strokeWidth="1" />
        ))}
        {/* crosshairs */}
        <line x1="80" y1="0" x2="80" y2="160" stroke="rgba(0,255,231,0.08)" strokeWidth="1"/>
        <line x1="0" y1="80" x2="160" y2="80" stroke="rgba(0,255,231,0.08)" strokeWidth="1"/>
        {/* sweep */}
        <path
          d={`M80 80 L${80+80*Math.cos(rad)} ${80+80*Math.sin(rad)} A80 80 0 0 0 ${80+80*Math.cos(rad-0.7)} ${80+80*Math.sin(rad-0.7)} Z`}
          fill="rgba(0,255,231,0.15)"
        />
        <line x1="80" y1="80" x2={80+80*Math.cos(rad)} y2={80+80*Math.sin(rad)}
          stroke="var(--c)" strokeWidth="1.5" opacity="0.9" />
        {/* blips */}
        {blips.map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r={3} fill={b.col} opacity={1 - b.age / 8} filter="url(#blur2)" />
            <circle cx={b.x} cy={b.y} r={2} fill={b.col} opacity={1 - b.age / 8} />
          </g>
        ))}
        <circle cx="80" cy="80" r="3" fill="var(--c)" />
      </svg>
      <div className="mono text-xs w-full text-center" style={{ color: "rgba(0,255,231,0.4)" }}>0 ACTIVE THREATS</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NETWORK TRAFFIC SPARKLINE
───────────────────────────────────────── */
function useSparkline(len = 40) {
  const [data, setData] = useState<number[]>(() => Array.from({length:len}, () => Math.random() * 60 + 10));
  useEffect(() => {
    const id = setInterval(() => {
      setData(d => [...d.slice(1), Math.random() * 80 + 10]);
    }, 500);
    return () => clearInterval(id);
  }, []);
  return data;
}

function Sparkline({ color, label, unit }: { color: string; label: string; unit: string }) {
  const data = useSparkline();
  const W = 200, H = 50;
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * H}`).join(" ");
  const fill = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * H}`).join(" ") + ` ${W},${H} 0,${H}`;
  const last = data[data.length - 1];

  return (
    <div className="card p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="mono text-xs tracking-widest" style={{ color }}>{label}</span>
        <span className="mono text-sm font-bold" style={{ color }}>{last.toFixed(1)}{unit}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="50" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={fill} fill={`url(#sg-${label})`} />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   STAT CARDS
───────────────────────────────────────── */
interface Stat { label: string; value: string; sub: string; color: string; icon: string; trend?: string }

const STATS: Stat[] = [
  { label: "ACTIVE NODES",    value: "1,337", sub: "+12 this hour",    color: "#00ffe7", icon: "◈", trend: "▲" },
  { label: "DATA ENCRYPTED",  value: "100%",  sub: "AES-256 + TLS 1.3",color: "#39ff14", icon: "⬡", trend: "—" },
  { label: "THREATS BLOCKED", value: "1,204", sub: "Last 24h",          color: "#ff3b5c", icon: "◉", trend: "▼" },
  { label: "UPTIME",          value: "99.97%",sub: "31d 4h 12m",        color: "#ffd700", icon: "◎", trend: "▲" },
  { label: "PAYLOAD FILES",   value: "8,841", sub: "14 backups active",  color: "#bf5fff", icon: "▣", trend: "▲" },
  { label: "BANDWIDTH",       value: "4.2 GB",sub: "↑1.2  ↓3.0 GB/s",  color: "#ff8c42", icon: "◆", trend: "▲" },
];

function StatGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {STATS.map((s, i) => (
        <motion.div key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="stat-card p-4"
          style={{ borderColor: s.color + "30", boxShadow: `0 0 24px ${s.color}10` }}
        >
          <div className="absolute inset-0 rounded-[10px] pointer-events-none"
            style={{ background: `radial-gradient(circle at top right, ${s.color}0a, transparent 70%)` }} />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xl" style={{ color: s.color, filter: `drop-shadow(0 0 6px ${s.color})` }}>{s.icon}</span>
              {s.trend && (
                <span className="mono text-xs" style={{ color: s.trend==="▲" ? "#39ff14" : s.trend==="▼" ? "#ff3b5c" : "#888" }}>
                  {s.trend}
                </span>
              )}
            </div>
            <div className="mono font-bold text-xl mb-0.5 count-up" style={{ color: s.color }}>{s.value}</div>
            <div className="mono text-[9px] tracking-widest mb-1" style={{ color: s.color + "90" }}>{s.label}</div>
            <div className="mono text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>{s.sub}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   THREAT BAR CHART
───────────────────────────────────────── */
const THREAT_DATA = [
  { label: "SQL INJECT",  val: 87, color: "#ff3b5c" },
  { label: "BRUTE FORCE", val: 64, color: "#ff8c42" },
  { label: "DDOS",        val: 43, color: "#ffd700" },
  { label: "XSS",         val: 31, color: "#bf5fff" },
  { label: "PHISHING",    val: 22, color: "#00bfff" },
  { label: "PORT SCAN",   val: 15, color: "#00ffe7" },
];

function ThreatChart() {
  return (
    <div className="card p-4">
      <div className="mono text-xs tracking-widest mb-4" style={{ color: "var(--c)" }}>ATTACK VECTOR ANALYSIS</div>
      <div className="space-y-2.5">
        {THREAT_DATA.map((t, i) => (
          <div key={t.label} className="space-y-1">
            <div className="flex justify-between mono text-[10px]">
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{t.label}</span>
              <span style={{ color: t.color }}>{t.val} events</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${t.val}%` }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.34,1.56,0.64,1] }}
                style={{ height: "100%", background: t.color, boxShadow: `0 0 8px ${t.color}`, borderRadius: 999 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   USER REGISTRY TABLE
───────────────────────────────────────── */
const USERS = [
  { id:"UID-001", name:"root",    role:"SUPERADMIN", status:"ACTIVE",  ip:"192.168.0.1",  col:"#00ffe7" },
  { id:"UID-002", name:"cipher",  role:"ANALYST",    status:"ACTIVE",  ip:"10.0.0.44",    col:"#39ff14" },
  { id:"UID-003", name:"nx0vel",  role:"OPERATIVE",  status:"ACTIVE",  ip:"10.0.0.77",    col:"#00bfff" },
  { id:"UID-004", name:"phantom", role:"INFILTRATOR", status:"IDLE",   ip:"172.16.0.12",  col:"#bf5fff" },
  { id:"UID-005", name:"h4wk",    role:"SCOUT",       status:"BANNED", ip:"45.33.32.156", col:"#ff3b5c" },
];

function UserTable() {
  return (
    <div className="card p-4 overflow-x-auto">
      <div className="mono text-xs tracking-widest mb-4" style={{ color: "var(--c)" }}>USER REGISTRY</div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["ID","HANDLE","CLEARANCE","STATUS","ORIGIN"].map(h => (
              <th key={h} className="mono text-left pb-2" style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(0,255,231,0.4)", borderBottom: "1px solid rgba(0,255,231,0.1)", paddingRight: 16 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {USERS.map((u, i) => (
            <motion.tr key={u.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <td className="mono py-2 pr-4" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{u.id}</td>
              <td className="mono py-2 pr-4 font-bold" style={{ fontSize: 11, color: u.col }}>{u.name}</td>
              <td className="mono py-2 pr-4" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{u.role}</td>
              <td className="mono py-2 pr-4">
                <span className="pill" style={{
                  color: u.status === "ACTIVE" ? "#39ff14" : u.status === "BANNED" ? "#ff3b5c" : "#ffd700",
                  borderColor: (u.status === "ACTIVE" ? "#39ff14" : u.status === "BANNED" ? "#ff3b5c" : "#ffd700") + "40",
                  background: (u.status === "ACTIVE" ? "#39ff14" : u.status === "BANNED" ? "#ff3b5c" : "#ffd700") + "12",
                }}>
                  {u.status}
                </span>
              </td>
              <td className="mono py-2" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{u.ip}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────
   VAULT STATUS RING
───────────────────────────────────────── */
function VaultRing({ pct, color, label }: { pct: number; color: string; label: string }) {
  const R = 36, C = 2 * Math.PI * R;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="84" height="84" viewBox="0 0 84 84">
        <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
        <motion.circle
          cx="42" cy="42" r={R}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - (pct / 100) * C }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transformOrigin:"center", transform:"rotate(-90deg)" }}
        />
        <text x="42" y="47" textAnchor="middle" fill={color} fontSize="13" fontFamily="'Share Tech Mono'" fontWeight="bold">
          {pct}%
        </text>
      </svg>
      <span className="mono text-[9px] tracking-widest text-center" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
    </div>
  );
}

function VaultPanel() {
  return (
    <div className="card p-4">
      <div className="mono text-xs tracking-widest mb-4" style={{ color: "var(--c)" }}>PAYLOAD VAULT</div>
      <div className="flex justify-around">
        <VaultRing pct={100} color="#39ff14" label="ENCRYPTED" />
        <VaultRing pct={87}  color="#00ffe7" label="INDEXED" />
        <VaultRing pct={64}  color="#bf5fff" label="REPLICATED" />
        <VaultRing pct={42}  color="#ffd700" label="ARCHIVED" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HEADER
───────────────────────────────────────── */
function Header() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  const fmt = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(0,255,231,0.1)" }}>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full relative pulse-ring" style={{ background: "var(--g)" }} />
        <span className="orb text-sm font-900 tracking-widest glow-c flicker" style={{ color: "var(--c)" }}>RYTNIX</span>
        <span className="mono text-[10px] text-gray-600 tracking-widest hidden sm:block">COMMAND CENTER v4.2.0</span>
      </div>
      <div className="flex items-center gap-4">
        {["ENCRYPT","COMMS","AUTH"].map((s, i) => (
          <div key={s} className="hidden sm:flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: ["#39ff14","#00ffe7","#ffd700"][i], boxShadow: `0 0 5px ${["#39ff14","#00ffe7","#ffd700"][i]}` }} />
            <span className="mono text-[9px] tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{s}</span>
          </div>
        ))}
        <span className="mono text-xs tabular-nums" style={{ color: "var(--c)", letterSpacing: "0.1em" }}>
          {fmt(time.getHours())}:{fmt(time.getMinutes())}:{fmt(time.getSeconds())}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   GLITCH TITLE
───────────────────────────────────────── */
function GlitchTitle() {
  const text = "ADMIN COMMAND CENTER";
  return (
    <div className="relative inline-block">
      <span className="orb font-900 text-2xl sm:text-3xl tracking-tight glow-c" style={{ color: "var(--c)" }}>{text}</span>
      <span className="glitch-layer orb font-900 text-2xl sm:text-3xl tracking-tight" aria-hidden="true">{text}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   CLEARANCE BADGES
───────────────────────────────────────── */
const LEVELS_META = [
  { label: "INITIATE",   color: "#00ffe7" },
  { label: "OPERATIVE",  color: "#bf5fff" },
  { label: "DIRECTOR",   color: "#ffd700" },
  { label: "ARCHITECT",  color: "#ff3b5c" },
];

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
export default function App() {
  return (
    <>
      <GlobalStyles />
      <div className="relative min-h-screen scanlines hexgrid overflow-x-hidden" style={{ background: "var(--bg)", fontFamily: "'Share Tech Mono', monospace" }}>
        <MatrixRain opacity={0.07} />
        <div className="scan-beam" />

        {/* Ambient glow orbs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,255,231,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(191,95,255,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,191,255,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        <div className="relative z-10">
          <Header />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

            {/* Page title + clearance row */}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <GlitchTitle />
                <p className="mono text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>
                  ALL CLEARANCE LEVELS ACTIVE — FULL ACCESS GRANTED
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {LEVELS_META.map((l, i) => (
                  <span key={l.label} className="pill" style={{ color: l.color, borderColor: l.color + "50", background: l.color + "10" }}>
                    L{i+1} ✓ {l.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Row 1: stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <StatGrid />
            </motion.div>

            {/* Row 2: sparklines + radar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Sparkline color="#00ffe7" label="CPU LOAD"    unit="%" />
              <Sparkline color="#39ff14" label="BANDWIDTH"   unit=" Mb/s" />
              <ThreatRadar />
            </motion.div>

            {/* Row 3: terminal + threat chart */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Terminal />
              <ThreatChart />
            </motion.div>

            {/* Row 4: vault + users */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <VaultPanel />
              <UserTable />
            </motion.div>

          </div>

          {/* Footer */}
          <div className="mono text-center text-[9px] tracking-widest pb-8 pt-4" style={{ color: "rgba(0,255,231,0.2)" }}>
            RYTNIX SECURE SYSTEMS © 2026 — CLASSIFIED ACCESS ONLY
          </div>
        </div>
      </div>
    </>
  );
}