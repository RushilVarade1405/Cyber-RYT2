import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type ChallengeType = "password" | "pattern" | "sequence" | "konami";

interface LevelConfig {
  id: number;
  label: string;
  color: string;
  glow: string;
  challenge: ChallengeType;
  password?: string;
  hint?: string;
  pattern?: number[];
  sequence?: string[];
  icon: string;
  unlockMsg: string;
}

interface ChallengeProps {
  level: LevelConfig;
  onSuccess: () => void;
  onFail: () => void;
}

/* ─────────────────────────────────────────
   LEVEL CONFIGURATION
───────────────────────────────────────── */
const LEVELS: LevelConfig[] = [
  {
    id: 0,
    label: "INITIATE",
    color: "#00d9ff",
    glow: "rgba(0,217,255,0.4)",
    challenge: "password",
    password: "RYTNIX",
    hint: "The brand behind this build",
    icon: "🔑",
    unlockMsg: "Clearance Level 1 granted. Welcome, recruit.",
  },
  {
    id: 1,
    label: "OPERATIVE",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.4)",
    challenge: "pattern",
    pattern: [0, 3, 6, 7, 8],
    hint: "Draw an L-shape (left column + bottom row)",
    icon: "🧩",
    unlockMsg: "Pattern recognised. Elevated access secured.",
  },
  {
    id: 2,
    label: "DIRECTOR",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
    challenge: "sequence",
    sequence: ["SYS", "INIT", "AUTH", "EXEC"],
    hint: "Execute system commands in boot order",
    icon: "⚡",
    unlockMsg: "Command sequence validated. Director clearance active.",
  },
  {
    id: 3,
    label: "ARCHITECT",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.4)",
    challenge: "konami",
    icon: "💀",
    unlockMsg: "You found the ghost protocol. God-mode engaged.",
  },
];

/* ─────────────────────────────────────────
   MATRIX RAIN CANVAS
───────────────────────────────────────── */
function MatrixRain({ opacity = 0.12 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const FONT = 12;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    let drops: number[] = [];
    const reset = () => { drops = Array(Math.floor(c.width / FONT)).fill(1) as number[]; };
    reset();
    const id = setInterval(() => {
      if (drops.length !== Math.floor(c.width / FONT)) reset();
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${FONT}px monospace`;
      drops.forEach((y: number, i: number) => {
        ctx.fillStyle = Math.random() > 0.93 ? "#fff" : i % 3 === 0 ? "#00d9ff" : "#0077aa";
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * FONT, y * FONT);
        if (y * FONT > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);
    return () => { clearInterval(id); ro.disconnect(); };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}
    />
  );
}

/* ─────────────────────────────────────────
   CHALLENGE: PASSWORD
───────────────────────────────────────── */
function PasswordChallenge({ level, onSuccess, onFail }: ChallengeProps) {
  const [val, setVal] = useState("");
  const [shake, setShake] = useState(false);
  const submit = () => {
    if (val.trim().toUpperCase() === level.password) {
      onSuccess();
    } else {
      setShake(true);
      setVal("");
      setTimeout(() => setShake(false), 600);
      onFail();
    }
  };
  return (
    <div className="space-y-4">
      <p style={{ color: level.color }} className="font-mono text-xs tracking-widest">ENTER ACCESS CODE</p>
      <motion.div animate={shake ? { x: [-8, 8, -6, 6, -4, 0] } : { x: 0 }} transition={{ duration: 0.4 }}>
        <input
          type="password"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="_ _ _ _ _ _"
          autoFocus
          style={{ borderColor: level.color + "60", caretColor: level.color, color: level.color }}
          className="w-full bg-black/60 font-mono text-lg tracking-[0.5em] text-center rounded-lg border px-4 py-3 outline-none transition-all placeholder-gray-700"
        />
      </motion.div>
      <p className="font-mono text-[10px] text-gray-600 text-center">Hint: {level.hint}</p>
      <button
        onClick={submit}
        style={{ background: level.color + "18", borderColor: level.color + "50", color: level.color }}
        className="w-full font-mono font-bold text-sm py-3 rounded-lg border hover:opacity-90 transition-all"
      >
        SUBMIT
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   CHALLENGE: PATTERN LOCK
───────────────────────────────────────── */
function PatternChallenge({ level, onSuccess, onFail }: ChallengeProps) {
  const [drawn, setDrawn] = useState<number[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [failed, setFailed] = useState(false);

  const enter = (idx: number) => {
    if (!drawing) return;
    if (!drawn.includes(idx)) setDrawn(p => [...p, idx]);
  };

  const start = (idx: number) => { setDrawing(true); setDrawn([idx]); setFailed(false); };

  const end = () => {
    if (!drawing) return;
    setDrawing(false);
    if (drawn.length < 2) { setDrawn([]); return; }
    const pat = level.pattern ?? [];
    const correct = pat.every((v, i) => drawn[i] === v) && drawn.length === pat.length;
    if (correct) setTimeout(onSuccess, 300);
    else { setFailed(true); setTimeout(() => { setDrawn([]); setFailed(false); onFail(); }, 600); }
  };

  return (
    <div className="space-y-4 flex flex-col items-center">
      <p style={{ color: level.color }} className="font-mono text-xs tracking-widest">DRAW UNLOCK PATTERN</p>
      <div
        className="grid gap-3 select-none"
        style={{ gridTemplateColumns: "repeat(3, 56px)" }}
        onMouseLeave={end}
        onMouseUp={end}
        onTouchEnd={end}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const active = drawn.includes(i);
          const col = failed ? "#ef4444" : active ? level.color : "#334155";
          return (
            <motion.div
              key={i}
              animate={{ scale: active ? 1.15 : 1 }}
              onMouseDown={() => start(i)}
              onMouseEnter={() => enter(i)}
              onTouchStart={() => start(i)}
              onTouchMove={e => {
                const t = e.touches[0];
                const el = document.elementFromPoint(t.clientX, t.clientY) as HTMLElement | null;
                if (el?.dataset?.idx) enter(Number(el.dataset.idx));
              }}
              data-idx={i}
              style={{ borderColor: col, background: active ? col + "22" : "transparent", boxShadow: active ? `0 0 12px ${col}` : "none" }}
              className="w-14 h-14 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all"
            >
              {active && <div className="w-3 h-3 rounded-full" style={{ background: col }} />}
            </motion.div>
          );
        })}
      </div>
      <p className="font-mono text-[10px] text-gray-600 text-center">{level.hint}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   CHALLENGE: SEQUENCE BUTTONS
───────────────────────────────────────── */
function SequenceChallenge({ level, onSuccess, onFail }: ChallengeProps) {
  const [pressed, setPressed] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);

  const press = (cmd: string) => {
    const next = [...pressed, cmd];
    setPressed(next);
    const seq = level.sequence ?? [];
    if (next.length === seq.length) {
      const correct = next.every((v, i) => v === seq[i]);
      if (correct) setTimeout(onSuccess, 300);
      else { setFailed(true); setTimeout(() => { setPressed([]); setFailed(false); onFail(); }, 700); }
    }
  };

  const CMDS = ["EXEC", "AUTH", "SYS", "INIT", "KILL", "BOOT"];
  return (
    <div className="space-y-4">
      <p style={{ color: level.color }} className="font-mono text-xs tracking-widest">ENTER COMMAND SEQUENCE</p>
      <div className="font-mono text-xs text-gray-500 text-center min-h-[20px]">
        {pressed.length > 0
          ? pressed.map((c, i) => <span key={i} style={{ color: failed ? "#ef4444" : level.color }} className="mr-2">{c}</span>)
          : <span className="text-gray-700">awaiting input…</span>}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {CMDS.map(cmd => (
          <button
            key={cmd}
            onClick={() => press(cmd)}
            style={{ borderColor: level.color + "40", color: level.color }}
            className="font-mono text-xs font-bold py-2.5 rounded-lg border bg-black/40 hover:bg-white/5 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
      <p className="font-mono text-[10px] text-gray-600 text-center">{level.hint}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   CHALLENGE: KONAMI (keyboard + touch D-pad)
───────────────────────────────────────── */
const KONAMI_SEQ = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"] as const;
const ICONS: Record<string, string> = { ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→", b: "B", a: "A" };

function KonamiChallenge({ level, onSuccess }: ChallengeProps) {
  const [progress, setProgress] = useState(0);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const progressRef = useRef(0);

  const feed = useCallback((key: string) => {
    const expected = KONAMI_SEQ[progressRef.current];
    if (key === expected) {
      const next = progressRef.current + 1;
      progressRef.current = next;
      setProgress(next);
      if (next === KONAMI_SEQ.length) setTimeout(onSuccess, 400);
    } else {
      progressRef.current = 0;
      setProgress(0);
    }
  }, [onSuccess]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => feed(e.key);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [feed]);

  const press = (key: string) => {
    setLastKey(key);
    setTimeout(() => setLastKey(null), 180);
    feed(key);
  };

  const btnStyle = (key: string) => ({
    borderColor: lastKey === key ? level.color : "#334155",
    background:  lastKey === key ? level.color + "25" : "#0f172a",
    color:       lastKey === key ? level.color : "#64748b",
    boxShadow:   lastKey === key ? `0 0 14px ${level.glow}` : "none",
  });

  const dpad: [string, string, string][] = [
    ["↑", "ArrowUp",    "1 / 2 / 2 / 3"],
    ["←", "ArrowLeft",  "2 / 1 / 3 / 2"],
    ["↓", "ArrowDown",  "2 / 2 / 3 / 3"],
    ["→", "ArrowRight", "2 / 3 / 3 / 4"],
  ];

  return (
    <div className="space-y-5 text-center select-none">
      <p style={{ color: level.color }} className="font-mono text-xs tracking-widest">ENTER THE GHOST PROTOCOL</p>

      {/* Progress tiles */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {KONAMI_SEQ.map((k, i) => {
          const done = i < progress;
          const cur  = i === progress;
          return (
            <motion.span
              key={i}
              animate={{ scale: done ? [1.25, 1] : 1 }}
              style={{
                borderColor: done ? level.color : cur ? level.color + "60" : "#1e293b",
                color:       done ? level.color : "#4b5563",
                background:  done ? level.color + "20" : "transparent",
                boxShadow:   done ? `0 0 8px ${level.glow}` : "none",
              }}
              className="font-mono text-xs font-bold w-8 h-8 flex items-center justify-center rounded border transition-all"
            >
              {ICONS[k]}
            </motion.span>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
        <motion.div
          animate={{ width: `${(progress / KONAMI_SEQ.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          style={{ background: level.color, boxShadow: `0 0 8px ${level.glow}` }}
          className="h-full rounded-full"
        />
      </div>

      {/* On-screen controller */}
      <div className="flex items-center justify-center gap-8 pt-1">
        {/* D-pad */}
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(3, 48px)", gridTemplateRows: "repeat(2, 48px)" }}
        >
          {dpad.map(([label, key, area]) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.85 }}
              onPointerDown={e => { e.preventDefault(); press(key); }}
              style={{ ...btnStyle(key), gridArea: area }}
              className="rounded-lg border font-mono font-black text-lg flex items-center justify-center cursor-pointer transition-colors"
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* B + A buttons */}
        <div className="flex gap-3 items-end pb-1">
          {(["b","a"] as const).map(k => (
            <motion.button
              key={k}
              whileTap={{ scale: 0.82 }}
              onPointerDown={e => { e.preventDefault(); press(k); }}
              style={btnStyle(k)}
              className="w-12 h-12 rounded-full border-2 font-mono font-black text-sm flex items-center justify-center cursor-pointer transition-colors"
            >
              {k.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </div>

      <p className="font-mono text-[10px] text-gray-600">tap the controller — or use keyboard ↑↑↓↓←→←→BA</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   LEVEL GATE MODAL
───────────────────────────────────────── */
const CHALLENGE_MAP: Record<ChallengeType, React.ComponentType<ChallengeProps>> = {
  password: PasswordChallenge,
  pattern: PatternChallenge,
  sequence: SequenceChallenge,
  konami: KonamiChallenge,
};

function LevelGate({ level, onSuccess }: { level: LevelConfig; onSuccess: () => void }) {
  const [fails, setFails] = useState(0);
  const Challenge = CHALLENGE_MAP[level.challenge];
  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{ borderColor: level.color + "40", background: "rgba(0,0,0,0.95)", boxShadow: `0 0 60px ${level.glow}` }}
    >
      <MatrixRain opacity={0.06} />
      <div className="relative z-10 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{level.icon}</div>
          <div>
            <p style={{ color: level.color }} className="font-mono text-[10px] tracking-[0.3em]">CLEARANCE REQUIRED</p>
            <h2 className="font-mono font-black text-white text-xl tracking-tight">LEVEL {level.id + 1} — {level.label}</h2>
          </div>
          {fails > 0 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="ml-auto font-mono text-xs text-red-500">
              {fails} FAIL{fails > 1 ? "S" : ""}
            </motion.div>
          )}
        </div>
        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${level.color}40, transparent)` }} />
        <Challenge level={level} onSuccess={onSuccess} onFail={() => setFails(f => f + 1)} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ADMIN DASHBOARD (UNLOCKED)
───────────────────────────────────────── */
function AdminDashboard({ clearedLevels }: { clearedLevels: number }) {
  const panels = [
    { title: "SYSTEM STATUS", icon: "🖥", color: "#00d9ff", data: [{ k: "Uptime", v: "99.97%" }, { k: "CPU", v: "14%" }, { k: "Memory", v: "2.1 / 8 GB" }, { k: "Build", v: "v4.2.0" }] },
    { title: "USER REGISTRY", icon: "👥", color: "#a855f7", data: [{ k: "Active", v: "1,337" }, { k: "Banned", v: "42" }, { k: "Admins", v: "3" }, { k: "Guests", v: "289" }] },
    { title: "SECURITY LOG",  icon: "🛡", color: "#f59e0b", data: [{ k: "Threats", v: "0 active" }, { k: "Blocked", v: "1,204" }, { k: "HSTS", v: "✓ Active" }, { k: "2FA", v: "✓ Enforced" }] },
    { title: "PAYLOAD VAULT", icon: "💾", color: "#ef4444", data: [{ k: "Files", v: "8,841" }, { k: "Encrypted", v: "100%" }, { k: "Backups", v: "14 daily" }, { k: "Last sync", v: "2m ago" }] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-mono font-black text-white text-2xl sm:text-3xl tracking-tight">ADMIN COMMAND CENTER</h1>
          <p className="font-mono text-[10px] text-gray-500 tracking-widest mt-1">ALL {clearedLevels} CLEARANCE LEVELS BYPASSED</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {LEVELS.map(l => (
            <span key={l.id} style={{ borderColor: l.color + "60", color: l.color, background: l.color + "10" }}
              className="font-mono text-[10px] font-bold px-2 py-1 rounded border tracking-widest">
              L{l.id + 1} ✓
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {panels.slice(0, Math.min(clearedLevels, 4)).map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ borderColor: p.color + "30", boxShadow: `0 0 30px ${p.color}10` }}
            className="relative overflow-hidden rounded-xl border bg-black/80 p-5">
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${p.color}, transparent 70%)` }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{p.icon}</span>
                <span style={{ color: p.color }} className="font-mono text-[10px] font-bold tracking-[0.25em]">{p.title}</span>
              </div>
              <div className="space-y-2">
                {p.data.map(({ k, v }) => (
                  <div key={k} className="flex justify-between">
                    <span className="font-mono text-xs text-gray-500">{k}</span>
                    <span style={{ color: p.color }} className="font-mono text-xs font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-green-500/20 bg-black p-5" style={{ boxShadow: "0 0 30px rgba(0,255,100,0.05)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] text-green-500 tracking-widest">LIVE TERMINAL</span>
        </div>
        {([
          "$ system.auth.verify() → ALL LEVELS CLEARED ✓",
          "$ admin.dashboard.init() → READY",
          "$ security.scan() → NO THREATS DETECTED",
          "$ vault.decrypt() → ACCESS GRANTED",
        ] as string[]).slice(0, clearedLevels).map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }} className="font-mono text-xs text-green-400 leading-6">
            {line}
          </motion.p>
        ))}
        <p className="font-mono text-xs text-green-700 mt-2">$ █</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   LEVEL PROGRESS SIDEBAR
───────────────────────────────────────── */
function LevelSidebar({ currentLevel, unlockedUpTo }: { currentLevel: number; unlockedUpTo: number }) {
  return (
    <div className="flex sm:flex-col gap-2 sm:gap-3 flex-wrap">
      {LEVELS.map(l => {
        const state = l.id < unlockedUpTo ? "done" : l.id === currentLevel ? "active" : "locked";
        return (
          <motion.div key={l.id} animate={{ opacity: state === "locked" ? 0.35 : 1 }}
            style={{ borderColor: state === "done" ? l.color + "60" : state === "active" ? l.color : "#1e293b" }}
            className="relative flex items-center gap-2.5 px-3 py-2 rounded-lg border bg-black/60 min-w-[120px] sm:min-w-0">
            {state === "active" && (
              <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-lg" style={{ background: l.color + "0a" }} />
            )}
            <span className="text-base relative z-10">{state === "done" ? "✓" : state === "active" ? l.icon : "🔒"}</span>
            <div className="relative z-10">
              <p style={{ color: state === "locked" ? "#4b5563" : l.color }} className="font-mono text-[10px] font-bold tracking-widest">
                L{l.id + 1}
              </p>
              <p className="font-mono text-[9px] text-gray-600">{l.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   SUCCESS OVERLAY
───────────────────────────────────────── */
function SuccessFlash({ level, onDone }: { level: LevelConfig; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}>
      <motion.div initial={{ scale: 0.5, y: 20 }} animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center space-y-3 px-8 py-8 rounded-2xl border"
        style={{ borderColor: level.color, boxShadow: `0 0 80px ${level.glow}`, background: "rgba(0,0,0,0.95)" }}>
        <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} className="text-5xl">
          {level.icon}
        </motion.div>
        <p style={{ color: level.color }} className="font-mono font-black text-xl tracking-tight">LEVEL {level.id + 1} CLEARED</p>
        <p className="font-mono text-xs text-gray-400 max-w-xs">{level.unlockMsg}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
export default function App() {
  const [unlockedUpTo, setUnlockedUpTo] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [flash, setFlash] = useState<LevelConfig | null>(null);

  const allDone = unlockedUpTo >= LEVELS.length;

  const handleSuccess = useCallback(() => {
    setFlash(LEVELS[currentLevel]);
  }, [currentLevel]);

  const afterFlash = useCallback(() => {
    const next = currentLevel + 1;
    setUnlockedUpTo(next);
    setCurrentLevel(next);
    setFlash(null);
  }, [currentLevel]);

  const activeGlow = (flash ?? LEVELS[Math.min(currentLevel, LEVELS.length - 1)]).glow.replace("0.4", "0.07");

  return (
    <div className="relative min-h-screen bg-[#050810] text-white overflow-x-hidden">
      <MatrixRain opacity={0.10} />

      {/* Scanlines */}
      <div className="fixed inset-0 z-[1] pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg,rgba(0,217,255,0.015) 0px,rgba(0,217,255,0.015) 1px,transparent 1px,transparent 4px)" }} />

      {/* Ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse"
          style={{ background: activeGlow }} />
      </div>

      <div className="scan-line" />

      <AnimatePresence>
        {flash && <SuccessFlash level={flash} onDone={afterFlash} />}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] text-cyan-400/60 tracking-widest">SYSTEM://SECURE/ADMIN</span>
        </div>
        <span className="font-mono text-[10px] text-gray-700 tracking-widest">© 2026 RYTNIX</span>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-36 shrink-0">
            <LevelSidebar currentLevel={currentLevel} unlockedUpTo={unlockedUpTo} />
          </div>
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {allDone ? (
                <motion.div key="dashboard" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <AdminDashboard clearedLevels={unlockedUpTo} />
                </motion.div>
              ) : (
                <motion.div key={`level-${currentLevel}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <LevelGate level={LEVELS[currentLevel]} onSuccess={handleSuccess} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanmove { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scan-line { position:fixed; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,rgba(0,217,255,0.18),transparent); animation:scanmove 7s linear infinite; pointer-events:none; z-index:2; }
        * { box-sizing: border-box; }
        body { margin: 0; }
        input { background: rgba(0,0,0,0.6); }
        input::placeholder { opacity: 0.4; }
      `}</style>
    </div>
  );
}