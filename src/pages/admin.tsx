import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldX, Terminal, Lock, Cpu, Phone, ChevronRight, Zap } from 'lucide-react';

const Admin = () => {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const [lesterOpen, setLesterOpen] = useState(false);
  const [konami, setKonami]         = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  /* ── Matrix Rain ────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const FONT  = 13;
    let cols    = Math.floor(canvas.width / FONT);
    let drops   = Array(cols).fill(1);

    const draw = () => {
      cols  = Math.floor(canvas.width / FONT);
      if (drops.length !== cols) drops = Array(cols).fill(1);

      ctx.fillStyle = 'rgba(0,0,0,0.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font      = `${FONT}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const bright = Math.random() > 0.92;
        ctx.fillStyle = bright ? '#ffffff' : i % 3 === 0 ? '#00d9ff' : '#0077aa';
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * FONT, drops[i] * FONT);
        if (drops[i] * FONT > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const id = setInterval(draw, 48);
    return () => { clearInterval(id); window.removeEventListener('resize', resize); };
  }, []);

  /* ── Glitch text ticker ─────────────────────────────────────── */
  useEffect(() => {
    const id = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 180);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  /* ── Konami Code ────────────────────────────────────────────── */
  useEffect(() => {
    const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let buf: string[] = [];
    const h = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-10);
      if (buf.join(',') === SEQ.join(',')) setKonami(true);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const techStack = [
    'React', 'React Router 7', 'Tailwind CSS', 'Framer Motion',
    'Lucide Icons', 'TypeScript', 'Vite', 'Vercel', 'PWA', 'HSTS',
  ];

  const heistSteps = [
    'Assemble crew (React devs preferred)',
    'Scout the target — analyse the tech stack',
    'Neutralise HSTS & PWA security layers',
    'Bypass the auth token pipeline',
    'Extract the encrypted payload',
    'Exfil clean — zero traces in the logs',
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">

      {/* ── Canvas Matrix ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.18 }}
      />

      {/* ── Scanlines ── */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0,217,255,0.025) 0px,
            rgba(0,217,255,0.025) 1px,
            transparent 1px,
            transparent 4px
          )`,
        }}
      />

      {/* ── Ambient glow blobs ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                        bg-cyan-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
                        bg-cyan-400/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px]
                        bg-blue-500/8 rounded-full blur-[100px]" />
      </div>

      {/* ── Konami Easter Egg ── */}
      <AnimatePresence>
        {konami && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -60 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]
                       px-6 py-4 rounded-2xl border-2 border-cyan-400/70
                       bg-black/95 backdrop-blur-xl text-center shadow-2xl"
            style={{ boxShadow: '0 0 50px rgba(0,217,255,0.5)' }}
          >
            <p className="text-cyan-400 font-mono font-black text-sm sm:text-base">
              🎮 Achievement Unlocked: "Lester's Favourite"
            </p>
            <p className="text-gray-400 font-mono text-xs mt-1">
              You found the code. Still denied. Nice try, boss.
            </p>
            <button
              onClick={() => setKonami(false)}
              className="mt-3 text-xs text-cyan-500 hover:text-white font-mono underline"
            >
              Abort sequence
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[92vw] sm:max-w-[640px] lg:max-w-[780px]
                   mx-auto my-8 sm:my-12"
      >
        {/* Outer glowing border */}
        <div
          className="rounded-2xl sm:rounded-3xl p-[2px]"
          style={{
            background: 'linear-gradient(135deg, #00d9ff 0%, #0055aa 50%, #00d9ff 100%)',
            boxShadow: '0 0 60px rgba(0,217,255,0.35), 0 0 120px rgba(0,217,255,0.15)',
          }}
        >
          <div className="bg-black/96 rounded-2xl sm:rounded-3xl overflow-hidden">

            {/* ── Top bar ── */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-3
                            border-b border-cyan-400/20 bg-cyan-950/20">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,217,255,0.8)]" />
              <span className="ml-auto font-mono text-[10px] sm:text-xs text-cyan-400/60 tracking-widest">
                SYSTEM://SECURE/ADMIN
              </span>
              <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400/50" />
            </div>

            {/* ── Body ── */}
            <div className="px-5 sm:px-8 lg:px-12 py-8 sm:py-10 flex flex-col items-center gap-6 sm:gap-8">

              {/* Icon + title */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                className="flex flex-col items-center gap-3 sm:gap-4"
              >
                <div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl
                             flex items-center justify-center
                             bg-cyan-500/10 border-2 border-cyan-400/40"
                  style={{ boxShadow: '0 0 30px rgba(0,217,255,0.25)' }}
                >
                  <ShieldX className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                  {/* Orbiting dot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[-6px] rounded-3xl border border-dashed border-cyan-400/30"
                  />
                </div>

                <div className="text-center space-y-1">
                  <motion.h1
                    className={`font-mono font-black text-2xl sm:text-4xl lg:text-5xl
                               tracking-tight leading-none text-transparent bg-clip-text
                               bg-gradient-to-r from-cyan-300 via-white to-cyan-300
                               ${glitchText ? 'blur-[1px] skew-x-1' : ''}`}
                    transition={{ duration: 0.1 }}
                  >
                    CONGRATULATIONS
                  </motion.h1>
                  <p className="font-mono text-cyan-400 text-xs sm:text-sm tracking-[0.25em] uppercase">
                    Boss-Level Access Attempt Detected
                  </p>
                </div>
              </motion.div>

              {/* Access Denied badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full flex items-center justify-center gap-2 sm:gap-3
                           px-4 sm:px-6 py-3 sm:py-4 rounded-xl
                           border-2 border-red-500/50 bg-red-500/8"
                style={{ boxShadow: '0 0 20px rgba(255,0,80,0.2)' }}
              >
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0 animate-pulse" />
                <span className="font-mono font-black text-red-400 text-sm sm:text-base tracking-widest uppercase">
                  ⚠ ACCESS DENIED — SECURITY PROTOCOL ACTIVE ⚠
                </span>
              </motion.div>

              {/* Main message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="font-mono text-center text-gray-300 text-sm sm:text-base lg:text-lg
                           leading-relaxed max-w-lg"
              >
                You reached here — that makes you the{' '}
                <span className="text-cyan-400 font-bold">BOSS</span>.
                <br className="hidden sm:block" />
                But some doors stay locked…{' '}
                <span className="text-cyan-300">for now. 🔒</span>
              </motion.p>

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="w-full rounded-xl border border-cyan-400/25 bg-cyan-950/10 p-4 sm:p-6"
              >
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  <span className="font-mono text-[10px] sm:text-xs text-cyan-400 font-bold tracking-[0.2em] uppercase">
                    🛡 Protected By
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.04 }}
                      className="font-mono text-[10px] sm:text-xs text-white
                                 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg
                                 bg-cyan-500/10 border border-cyan-400/30
                                 hover:bg-cyan-500/20 hover:border-cyan-400/60
                                 transition-all duration-200 cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Lester call button */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full"
              >
                <button
                  onClick={() => setLesterOpen(v => !v)}
                  className="group w-full flex items-center justify-between gap-3
                             px-4 sm:px-6 py-4 sm:py-5 rounded-xl
                             border-2 border-cyan-400/40 bg-cyan-500/8
                             hover:bg-cyan-500/15 hover:border-cyan-400/70
                             transition-all duration-300 cursor-pointer text-left"
                  style={{ boxShadow: '0 0 0 rgba(0,217,255,0)' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 25px rgba(0,217,255,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(0,217,255,0)')}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                      className="text-xl sm:text-2xl"
                    >
                      📱
                    </motion.span>
                    <div>
                      <p className="font-mono font-bold text-cyan-300 text-sm sm:text-base">
                        Incoming call…
                      </p>
                      <p className="font-mono text-[10px] sm:text-xs text-cyan-500 mt-0.5">
                        [ Tap to {lesterOpen ? 'hang up' : 'answer'} ]
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: lesterOpen ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400
                                             group-hover:text-white transition-colors" />
                  </motion.div>
                </button>

                {/* Lester message */}
                <AnimatePresence>
                  {lesterOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{   opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="rounded-xl border border-cyan-400/25 bg-black/80
                                   p-4 sm:p-6 space-y-4"
                        style={{ boxShadow: '0 0 30px rgba(0,217,255,0.1) inset' }}
                      >
                        {/* Quote */}
                        <div className="space-y-3">
                          <p className="font-mono font-black text-cyan-400 text-sm sm:text-base">
                            🎙 Lester Crest:
                          </p>
                          {[
                            `"Hey there, hotshot. You think you can waltz in here and grab what you want? I like your style — but let me tell you something..."`,
                            `"In this business, there are three kinds of people: those who don't know what they're doing, those who think they do, and me."`,
                            `"You've got the skills to get this far. I'll give you that. But breaking through this security? That requires a heist, my friend. And not just any heist..."`,
                          ].map((q, i) => (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.12 }}
                              className="font-mono text-gray-300 text-xs sm:text-sm
                                         italic leading-relaxed
                                         border-l-2 border-cyan-400/40 pl-3"
                            >
                              {q}
                            </motion.p>
                          ))}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

                        {/* Heist plan */}
                        <div>
                          <p className="font-mono font-black text-cyan-300 text-xs sm:text-sm mb-3 flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5" />
                            THE HEIST PLAN:
                          </p>
                          <ul className="space-y-2">
                            {heistSteps.map((step, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                className="font-mono text-[11px] sm:text-xs text-gray-300
                                           flex items-start gap-2"
                              >
                                <span className="text-cyan-400 mt-0.5 shrink-0">►</span>
                                {step}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Lester sign-off */}
                        <div className="space-y-2">
                          <p className="font-mono text-xs sm:text-sm text-cyan-400 italic leading-relaxed">
                            "But here's the kicker — even I don't have the backdoor codes for this one.
                            The devs were… thorough. 😎"
                          </p>
                          <p className="font-mono text-xs sm:text-sm text-red-400 italic leading-relaxed">
                            "Go ahead, try your luck. Just don't say I didn't warn you.
                            Lester out. 🎮"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="font-mono text-[10px] sm:text-xs text-cyan-700 text-center tracking-wider"
              >
                ↑↑↓↓←→←→BA &nbsp;·&nbsp; konami code unlocks a secret
              </motion.p>

            </div>

            {/* ── Footer bar ── */}
            <div className="px-4 sm:px-6 py-3 border-t border-cyan-400/15 bg-cyan-950/10
                            flex items-center justify-between gap-4">
              <span className="font-mono text-[9px] sm:text-[10px] text-cyan-600 tracking-widest">
                © 2026 RYTMIX × CRAVSTER
              </span>
              <div className="flex items-center gap-1.5">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"
                />
                <span className="font-mono text-[9px] sm:text-[10px] text-red-500 tracking-widest">
                  SECURITY ACTIVE
                </span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ── CSS animations ── */}
      <style>{`
        @keyframes scanmove {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scan-line {
          position: fixed;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,217,255,0.25), transparent);
          animation: scanmove 6s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
      `}</style>
      <div className="scan-line" />

    </div>
  );
};

export default Admin;