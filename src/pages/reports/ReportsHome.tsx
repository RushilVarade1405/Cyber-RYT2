// ============================================================
// src/pages/reports/ReportsHome.tsx
// Cyber_World — Reports Home — Matched to Toolkit v2.0 Design
// Author: Rushil Varade — Styled by Claude
// ============================================================

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from '../../components/MatrixRain';
import ReportCard from '../../components/ReportCard';
import {
  reports, getAllPlatforms,
  Report,
} from '../../data/reports';

// ─── Global Styles (Toolkit-matched) ─────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
  @keyframes dotBlink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }
  @keyframes shimmer  {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.7); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  html, body { margin: 0; padding: 0; background: #000; overflow-x: hidden; }

  .rh-scanline {
    position: fixed; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent);
    z-index: 2; animation: scanline 8s linear infinite; pointer-events: none;
  }

  .rh-vignette {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 1; pointer-events: none; transition: background 0.8s ease;
  }
  .rh-vignette.dimmed { background: rgba(0,0,0,0.72); }

  .rh-root {
    min-height: 100vh; background: transparent;
    color: #c0d8e0; font-family: 'Share Tech Mono', monospace;
    position: relative; overflow-x: hidden;
  }

  /* ── NAV ── */
  .rh-nav {
    position: sticky; top: 0; z-index: 10;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 2rem;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0,255,255,0.15);
    animation: fadeIn 0.5s ease both;
  }
  .rh-nav-brand {
    font-family: 'Orbitron', monospace; font-size: 0.9rem;
    font-weight: 900; letter-spacing: 0.3em;
    background: linear-gradient(90deg, #00ffff, #a78bfa, #00ffff);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }
  .rh-nav-right { display: flex; align-items: center; gap: 0.75rem; }
  .rh-nav-back {
    background: rgba(0,255,255,0.06); border: 1px solid rgba(0,255,255,0.3);
    color: rgba(0,255,255,0.8); padding: 0.35rem 1rem;
    font-family: 'Share Tech Mono', monospace; font-size: 0.72rem;
    cursor: pointer; letter-spacing: 0.08em; transition: all 0.2s;
  }
  .rh-nav-back:hover { background: rgba(0,255,255,0.15); color: #00ffff; box-shadow: 0 0 12px rgba(0,255,255,0.2); }
  .rh-nav-dot {
    width: 8px; height: 8px; background: #00ffff; border-radius: 50%;
    box-shadow: 0 0 10px #00ffff; animation: dotBlink 2s infinite;
  }

  .rh-inner {
    position: relative; z-index: 5;
    padding: 0 2rem 5rem; max-width: 1440px; margin: 0 auto;
  }

  /* ── HERO ── */
  .rh-hero { padding: 3rem 0 2rem; animation: fadeSlideUp 0.7s ease 0.1s both; }
  .rh-hero-status {
    display: inline-flex; align-items: center; gap: 0.5rem;
    border: 1px solid rgba(0,255,255,0.3); padding: 0.3rem 0.9rem;
    font-size: 0.68rem; color: #00ffff; letter-spacing: 0.18em;
    text-transform: uppercase; margin-bottom: 1.5rem;
    background: rgba(0,255,255,0.05); backdrop-filter: blur(8px);
  }
  .rh-status-dot {
    width: 6px; height: 6px; background: #00ffff; border-radius: 50%;
    box-shadow: 0 0 8px #00ffff; animation: dotBlink 1.5s infinite;
  }
  .rh-hero-line1 {
    font-family: 'Orbitron', monospace;
    font-size: clamp(3.5rem, 9vw, 7rem); font-weight: 900;
    color: #00ffff; display: block; line-height: 0.88;
    text-shadow: 0 0 30px rgba(0,255,255,0.6), 0 0 80px rgba(0,255,255,0.25);
    letter-spacing: -0.02em;
  }
  .rh-hero-line2 {
    font-family: 'Orbitron', monospace;
    font-size: clamp(2.8rem, 7.5vw, 6rem); font-weight: 900;
    color: rgba(255,255,255,0.92); display: block;
    line-height: 0.95; letter-spacing: -0.02em;
  }
  .rh-hero-line3 {
    font-family: 'Orbitron', monospace;
    font-size: clamp(1.5rem, 4vw, 3.2rem); font-weight: 700;
    color: #00ffff; display: block; margin-top: 0.5rem;
    letter-spacing: 0.04em; text-shadow: 0 0 20px rgba(0,255,255,0.4);
  }
  .rh-hero-desc {
    font-size: 0.88rem; color: rgba(180,210,220,0.7);
    margin-top: 1.25rem; max-width: 520px; line-height: 1.75;
  }
  .rh-hero-cursor { animation: blink 1s step-end infinite; color: #00ffff; }

  /* ── STAT CARDS ── */
  .rh-stats-row { display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }
  .rh-stat-card {
    position: relative; background: rgba(0,0,0,0.45);
    backdrop-filter: blur(12px); border: 1px solid rgba(0,255,255,0.2);
    padding: 1.1rem 1.6rem 1rem; min-width: 120px;
    animation: countUp 0.6s ease both;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .rh-stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,255,255,0.15);
    border-color: rgba(0,255,255,0.5);
  }
  .rh-stat-card:nth-child(1) { animation-delay: 0.2s; }
  .rh-stat-card:nth-child(2) { animation-delay: 0.3s; }
  .rh-stat-card:nth-child(3) { animation-delay: 0.4s; }
  .rh-stat-card:nth-child(4) { animation-delay: 0.5s; }
  .rh-stat-card::before {
    content: ''; position: absolute; top:-1px; left:-1px;
    width:14px; height:14px;
    border-top: 2px solid #00ffff; border-left: 2px solid #00ffff;
  }
  .rh-stat-card::after {
    content: ''; position: absolute; bottom:-1px; right:-1px;
    width:14px; height:14px;
    border-bottom: 2px solid #00ffff; border-right: 2px solid #00ffff;
  }
  .rh-stat-num {
    font-family: 'Orbitron', monospace; font-size: 2rem;
    font-weight: 900; display: block; line-height: 1;
  }
  .s-cyan   { color: #00ffff; text-shadow: 0 0 15px rgba(0,255,255,0.6); }
  .s-amber  { color: #fbbf24; text-shadow: 0 0 15px rgba(251,191,36,0.5); }
  .s-red    { color: #ff6b6b; text-shadow: 0 0 15px rgba(255,107,107,0.5); }
  .s-purple { color: #a78bfa; text-shadow: 0 0 15px rgba(167,139,250,0.5); }
  .rh-stat-label {
    font-size: 0.58rem; text-transform: uppercase;
    letter-spacing: 0.2em; color: rgba(150,180,190,0.5);
    margin-top: 0.35rem; display: block;
  }

  /* ── RESULT COUNT ── */
  .rh-result-row {
    display: flex; align-items: center; gap: 10px;
    flex-wrap: wrap; margin-bottom: 1.5rem; margin-top: 2.5rem;
  }
  .rh-result-label {
    font-size: 0.58rem; color: rgba(150,170,180,0.4);
    letter-spacing: 0.2em; font-family: 'Share Tech Mono', monospace;
    text-transform: uppercase; white-space: nowrap;
  }
  .rh-result-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, rgba(0,255,255,0.25), rgba(167,139,250,0.1), transparent);
    min-width: 20px;
  }
  .rh-result-count {
    font-family: 'Orbitron', monospace; font-size: 1rem;
    font-weight: 900; color: #00ffff;
  }
  .rh-result-total {
    font-size: 0.7rem; color: rgba(150,170,180,0.4);
    font-family: 'Share Tech Mono', monospace;
  }

  /* ── REPORT GRID ── */
  .rh-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
  @media(min-width:520px) { .rh-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
  @media(min-width:900px) { .rh-grid { grid-template-columns: repeat(auto-fill, minmax(340px,1fr)); gap: 18px; } }

  /* ── FOOTER ── */
  .rh-footer {
    margin-top: 4rem; border-top: 1px solid rgba(0,255,255,0.1);
    padding-top: 1.5rem; display: flex; align-items: center;
    gap: 12px; flex-wrap: wrap;
  }
  .rh-footer-text {
    font-size: 0.7rem; color: rgba(150,170,180,0.35);
    font-family: 'Share Tech Mono', monospace; margin: 0;
  }
  .rh-footer-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, rgba(0,255,255,0.1), transparent);
    min-width: 20px;
  }

  @media (max-width: 640px) {
    .rh-inner { padding: 0 1rem 3rem; }
    .rh-hero-line1 { font-size: 3rem !important; }
    .rh-hero-line2 { font-size: 2.6rem !important; }
  }
`;

// ─── Typing Text ──────────────────────────────────────────────────────────────
function TypingText({ text, speed = 22 }: { text: string; speed?: number }) {
  const [d, setD] = useState('');
  useEffect(() => {
    setD(''); let i = 0;
    const id = setInterval(() => {
      setD(text.slice(0, i + 1)); i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span style={{ fontFamily: "'Share Tech Mono',monospace" }}>
      {d}<span className="rh-hero-cursor">▌</span>
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{ label: string; value: number; colorClass: string; delay: number }> = ({
  label, value, colorClass, delay,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.ceil(value / 45));
    const id = setInterval(() => {
      cur = Math.min(cur + step, value);
      setCount(cur);
      if (cur >= value) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [value]);

  return (
    <div className="rh-stat-card" style={{ animationDelay: `${delay}s` }}>
      <span className={`rh-stat-num ${colorClass}`}>{count}</span>
      <span className="rh-stat-label">{label}</span>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const ReportsHome: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const allPlatforms = useMemo(() => getAllPlatforms(), []);

  const totalFindings = reports.reduce(
    (s, r) => s + (r.vulnerabilitySummary
      ? Object.values(r.vulnerabilitySummary).reduce((a, b) => a + b, 0)
      : 0),
    0,
  );
  const totalCritical = reports.reduce(
    (s, r) => s + (r.vulnerabilitySummary?.critical || 0), 0,
  );

  const matrixOpacity = scrollY > 300
    ? Math.max(0.08, 0.55 - (scrollY - 300) / 600)
    : 0.55;

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      {/* ── BG LAYERS ── */}
      <MatrixRain opacity={matrixOpacity} />
      <div className={`rh-vignette${scrollY > 300 ? ' dimmed' : ''}`} />
      <div className="rh-scanline" />

      <div className="rh-root">

        {/* ── NAV ── */}
        <nav className="rh-nav">
          <span className="rh-nav-brand">CYBER_WORLD</span>
          <div className="rh-nav-right">
            <button className="rh-nav-back" onClick={() => window.history.back()}>← BACK</button>
            <div className="rh-nav-dot" />
          </div>
        </nav>

        <div className="rh-inner">

          {/* ── HERO ── */}
          <div className="rh-hero">
            <div className="rh-hero-status">
              <div className="rh-status-dot" />
              ARCHIVE ONLINE · {reports.length} REPORTS INDEXED
            </div>
            <div>
              <span className="rh-hero-line1">PENTEST</span>
              <span className="rh-hero-line2">WALKTHROUGHS</span>
              <span className="rh-hero-line3">&amp; REPORTS ARCHIVE</span>
            </div>
            <p className="rh-hero-desc">
              <TypingText
                text="CTF walkthroughs · VulnHub writeups · Black-box pentest reports · by Rushil Varade"
                speed={20}
              />
            </p>

            {/* ── STAT CARDS ── */}
            <div className="rh-stats-row">
              <StatCard label="Total Reports" value={reports.length}      colorClass="s-cyan"   delay={0.2} />
              <StatCard label="Findings"      value={totalFindings}       colorClass="s-amber"  delay={0.3} />
              <StatCard label="Critical"      value={totalCritical}       colorClass="s-red"    delay={0.4} />
              <StatCard label="Platforms"     value={allPlatforms.length} colorClass="s-purple" delay={0.5} />
            </div>
          </div>

          {/* ── RESULT COUNT ── */}
          <div className="rh-result-row">
            <span className="rh-result-label">Output</span>
            <div className="rh-result-line" />
            <span className="rh-result-count">{reports.length}</span>
            <span className="rh-result-total">reports</span>
          </div>

          {/* ── REPORT GRID ── */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="rh-grid">
              {reports.map((report: Report, i: number) => (
                <motion.div
                  key={report.id} layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <ReportCard report={report} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── FOOTER ── */}
          <div className="rh-footer">
            <div style={{
              width: '28px', height: '2px',
              background: 'linear-gradient(90deg, #00ffff, #a78bfa)', flexShrink: 0,
            }} />
            <p className="rh-footer-text">
              <span style={{ color: '#00ffff' }}>RYTNIX</span>
              {' '}— all reports conducted in isolated lab environments for educational purposes only.
            </p>
            <div className="rh-footer-line" />
          </div>

        </div>
      </div>
    </>
  );
};

export default ReportsHome;