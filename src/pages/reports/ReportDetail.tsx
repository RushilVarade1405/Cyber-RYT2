// ============================================================
// src/pages/reports/ReportDetail.tsx
// Cyber_World — Fully Responsive Report Detail v4
// Author: Rushil Varade — Fixed by Claude
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getReportById, getRelatedReports, severityColor,
  Report, Severity, Finding,
} from '../../data/reports';
import ReportCard from '../../components/ReportCard';

// ─── Design Tokens ────────────────────────────────────────────
const C = {
  bg0:    '#05070A', bg1: '#0A0F14', bg2: '#0D1117', bg3: '#071018',
  cyan:   '#00E5FF', cyanSoft: '#38BDF8',
  green:  '#00FFB4',
  purple: '#8B5CF6', purpleL: '#A855F7',
  pink:   '#FF4D9D',
  amber:  '#F59E0B',
  red:    '#EF4444',
  text0:  '#EAF7FF', text1: '#A7BACF', text2: '#7E93A8', text3: '#8FAFC4',
  border: '#0D1E2C', border2: '#152030',
};

/* ── Responsive CSS injection ────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Manrope:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }

  .scanline-sweep::after {
    content:''; position:fixed; left:0; top:0; width:100%; height:3px;
    background:linear-gradient(transparent,rgba(0,229,255,0.06),transparent);
    animation:scanline 11s linear infinite; pointer-events:none; z-index:1;
  }
  .grid-bg {
    position:fixed; inset:0; z-index:0; pointer-events:none;
    background-image:
      linear-gradient(rgba(0,229,255,0.01) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,229,255,0.01) 1px,transparent 1px);
    background-size:44px 44px;
  }

  /* ── Report Header ── */
  .rpt-header { padding: 32px 20px 28px; }
  @media(min-width:480px)  { .rpt-header { padding: 40px 28px 34px; } }
  @media(min-width:768px)  { .rpt-header { padding: 48px 36px 40px; } }

  /* ── Body Layout ── */
  .detail-layout {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px 80px;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
    align-items: start;
  }
  @media(min-width:480px)  { .detail-layout { padding: 0 24px 80px; } }
  @media(min-width:768px)  { .detail-layout { padding: 0 32px 100px; } }
  @media(min-width:1024px) {
    .detail-layout {
      grid-template-columns: minmax(0, 1fr) 220px;
      gap: 48px;
      padding: 0 36px 110px;
    }
  }

  /* ── TOC ── */
  .toc-panel { display: none; }
  @media(min-width:1024px) { .toc-panel { display: block; } }

  /* ── Report Title ── */
  .rpt-title { font-size: clamp(20px, 5vw, 46px) !important; }

  /* ── Prompt line ── */
  .rpt-prompt { font-size: 11px; word-break: break-all; }
  @media(min-width:480px) { .rpt-prompt { font-size: 12px; } }

  /* ── Vuln chips: wrap cleanly ── */
  .vuln-chips { display: flex; gap: 8px; flex-wrap: wrap; }

  /* ── Lessons learned: stack on mobile ── */
  .lesson-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  @media(min-width:640px) {
    .lesson-grid { grid-template-columns: 1fr 1fr; gap: 22px; }
  }

  /* ── Target info grid ── */
  .target-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  @media(min-width:480px)  { .target-grid { grid-template-columns: repeat(2, 1fr); } }
  @media(min-width:768px)  { .target-grid { grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); } }

  /* ── Tools grid ── */
  .tools-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 9px;
  }
  @media(min-width:480px)  { .tools-grid { grid-template-columns: repeat(2, 1fr); } }
  @media(min-width:768px)  { .tools-grid { grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); } }

  /* ── Related reports grid ── */
  .related-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  @media(min-width:600px)  { .related-grid { grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); } }

  /* ── OWASP table: horizontal scroll on small screens ── */
  .owasp-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

  /* ── Code block text ── */
  .code-cmd { font-size: 12px !important; }
  @media(min-width:480px) { .code-cmd { font-size: 13px !important; } }
  @media(min-width:768px) { .code-cmd { font-size: 14px !important; } }

  /* ── Badge row: wrap ── */
  .badge-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }

  /* ── Meta row: wrap ── */
  .meta-row { display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; margin-bottom: 18px; }
  @media(min-width:480px) { .meta-row { gap: 16px; font-size: 13px; } }

  /* ── Tags ── */
  .tags-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 20px; }

  /* ── Finding card header ── */
  .finding-header { flex-direction: column; align-items: flex-start !important; gap: 8px !important; }
  @media(min-width:480px) { .finding-header { flex-direction: row !important; align-items: center !important; } }

  /* ── Attack step card ── */
  .attack-card { padding: 12px 14px !important; }
  @media(min-width:480px) { .attack-card { padding: 14px 16px !important; } }
  @media(min-width:768px) { .attack-card { padding: 16px 20px !important; } }

  /* ── Section header ── */
  .section-title { font-size: clamp(18px, 4vw, 32px) !important; }

  /* ── Back button ── */
  .back-btn { margin-bottom: 20px !important; }
  @media(min-width:768px) { .back-btn { margin-bottom: 30px !important; } }

  /* ── Executive summary box ── */
  .exec-box { padding: 18px 16px !important; }
  @media(min-width:480px) { .exec-box { padding: 20px 20px !important; } }
  @media(min-width:768px) { .exec-box { padding: 24px 26px !important; } }
`;

/* ── Matrix Rain ──────────────────────────────────────────── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const cols  = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1).map(() => Math.floor(Math.random() * -40));
    const chars  = '01アイウエオカキクケコ∑∆⊗⊕◈◉';
    const pals   = ['rgba(0,229,255,','rgba(0,255,180,','rgba(139,92,246,'];
    let raf: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(5,7,10,0.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '13px "Courier New"';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const bright = Math.random() > 0.97;
        ctx.fillStyle = bright ? 'rgba(255,255,255,0.9)' : `${pals[Math.floor(Math.random()*pals.length)]}${Math.random()*0.35+0.04})`;
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none', opacity:0.12 }} />;
}

/* ── Code Block ──────────────────────────────────────────────── */
const CodeBlock: React.FC<{ commands: string[]; accentColor?: string }> = ({ commands, accentColor = C.cyan }) => {
  const [copied, setCopied] = useState<number | null>(null);
  const copy = (text: string, i: number) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(i);
    setTimeout(() => setCopied(null), 1600);
  };
  return (
    <div style={{
      background:'#020608',
      border:`1px solid ${C.border2}`,
      borderLeft:`3px solid ${accentColor}`,
      borderRadius:'6px',
      margin:'12px 0',
      overflow:'hidden',
      boxShadow:`0 4px 28px rgba(0,0,0,0.6), inset 0 1px 0 ${accentColor}08`,
    }}>
      {/* Top bar */}
      <div style={{
        display:'flex', alignItems:'center', gap:'8px',
        padding:'7px 12px',
        background:'rgba(0,0,0,0.5)',
        borderBottom:`1px solid ${C.border}`,
        flexWrap:'nowrap',
        overflow:'hidden',
      }}>
        {['#FF5F57','#FFBD2E','#28C840'].map(c => (
          <span key={c} style={{ width:'8px', height:'8px', borderRadius:'50%', background:c, display:'block', opacity:0.85, flexShrink:0 }} />
        ))}
        <span style={{ fontSize:'9px', color:C.text3, fontFamily:"'Courier New',monospace", marginLeft:'4px', letterSpacing:'1px', flexShrink:0 }}>shell</span>
        <div style={{ flex:1 }} />
        <span style={{ fontSize:'9px', color:accentColor, fontFamily:"'Courier New',monospace", opacity:0.6, letterSpacing:'1px', flexShrink:0 }}>bash</span>
      </div>
      {/* Commands */}
      <div style={{ padding:'10px 14px' }}>
        {commands.map((cmd, i) => (
          <div
            key={i}
            onClick={() => copy(cmd, i)}
            className="code-cmd"
            style={{
              fontFamily:"'Courier New',monospace",
              fontSize:'14px',
              color: copied === i ? C.green : '#9ECFD8',
              lineHeight:1.9,
              whiteSpace:'pre-wrap',
              wordBreak:'break-all',
              cursor:'pointer',
              borderBottom: i < commands.length-1 ? `1px solid ${C.border}` : 'none',
              paddingBottom: i < commands.length-1 ? '8px' : 0,
              marginBottom:  i < commands.length-1 ? '8px' : 0,
              display:'flex', gap:'8px', alignItems:'flex-start',
              transition:'color 0.15s',
            }}
          >
            <span style={{ color:accentColor, flexShrink:0, userSelect:'none', opacity:0.8 }}>$</span>
            <span style={{ flex:1, minWidth:0 }}>{cmd}</span>
            <span style={{
              fontSize:'9px',
              color: copied===i ? C.green : C.border2,
              background: copied===i ? `${C.green}12` : 'transparent',
              border:`1px solid ${copied===i ? C.green+'30' : 'transparent'}`,
              padding:'2px 6px', borderRadius:'3px', flexShrink:0,
              transition:'all 0.2s', userSelect:'none',
              fontFamily:"'Courier New',monospace",
              whiteSpace:'nowrap',
            }}>
              {copied===i ? '✓' : '⎘'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Severity Badge ──────────────────────────────────────────── */
const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => (
  <span style={{
    fontSize:'9px', fontWeight:800, letterSpacing:'1.5px',
    color:severityColor[severity],
    background:`${severityColor[severity]}12`,
    border:`1px solid ${severityColor[severity]}45`,
    padding:'3px 8px', borderRadius:'4px',
    textTransform:'uppercase',
    fontFamily:"'Courier New',monospace",
    whiteSpace:'nowrap', flexShrink:0,
  }}>{severity}</span>
);

/* ── Section Header ──────────────────────────────────────────── */
const SectionHeader: React.FC<{ id: string; title: string; icon?: string; accentColor?: string }> = ({ id, title, icon, accentColor = C.cyan }) => (
  <motion.div
    id={id}
    initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
    viewport={{ once:true }} transition={{ duration:0.3 }}
    style={{ margin:'40px 0 18px', scrollMarginTop:'96px', position:'relative' }}
  >
    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'3px', background:`linear-gradient(180deg,${accentColor},${accentColor}20)`, borderRadius:'2px' }} />
    <div style={{ paddingLeft:'16px' }}>
      <div style={{ fontSize:'9px', fontWeight:700, color:accentColor, fontFamily:"'Courier New',monospace", letterSpacing:'3px', textTransform:'uppercase', marginBottom:'5px', opacity:0.7, display:'flex', alignItems:'center', gap:'6px' }}>
        {icon && <span>{icon}</span>}
        <span>Section</span>
      </div>
      <h2 className="section-title" style={{ fontSize:'clamp(18px,4vw,32px)', fontWeight:900, color:C.text0, fontFamily:"'Orbitron','Courier New',monospace", margin:0, lineHeight:1.2, letterSpacing:'0.3px' }}>
        {title}
      </h2>
    </div>
    <div style={{ marginTop:'12px', height:'1px', background:`linear-gradient(90deg,${accentColor}35,${accentColor}10,transparent)` }} />
    <div style={{ marginTop:'2px', width:'60px', height:'2px', background:`linear-gradient(90deg,${accentColor},transparent)`, borderRadius:'2px' }} />
  </motion.div>
);

/* ── Finding Card ────────────────────────────────────────────── */
const FindingCard: React.FC<{ finding: Finding; index: number }> = ({ finding, index }) => {
  const [open, setOpen] = useState(false);
  const c = severityColor[finding.severity];
  return (
    <motion.div
      initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }} transition={{ delay: index*0.05 }}
      style={{
        background: open ? `${c}05` : C.bg2,
        border:`1px solid ${open ? c+'35' : c+'18'}`,
        borderLeft:`3px solid ${c}`,
        borderRadius:'6px', marginBottom:'10px', overflow:'hidden',
        transition:'all 0.2s',
        boxShadow: open ? `0 4px 28px ${c}12` : 'none',
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{ padding:'13px 16px', cursor:'pointer', display:'flex', alignItems:'flex-start', gap:'12px', justifyContent:'space-between', transition:'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background=`${c}07`}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='transparent'}
      >
        <div style={{ display:'flex', alignItems:'flex-start', gap:'10px', flex:1, minWidth:0, flexWrap:'wrap' }}>
          <SeverityBadge severity={finding.severity} />
          <div style={{ minWidth:0, flex:1 }}>
            <div style={{ fontSize:'13px', fontWeight:700, color:C.text0, fontFamily:"'Manrope',sans-serif", wordBreak:'break-word' }}>
              <span style={{ color:C.text3, fontFamily:"'Courier New',monospace", fontSize:'11px', marginRight:'6px' }}>[{finding.id}]</span>
              {finding.title}
            </div>
            {finding.cvss !== undefined && (
              <div style={{ fontSize:'10px', color:C.text3, marginTop:'3px', fontFamily:"'Courier New',monospace" }}>
                CVSS {finding.cvss}{finding.cwe && ` · ${finding.cwe}`}{finding.owasp && ` · ${finding.owasp}`}
              </div>
            )}
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }} transition={{ duration:0.18 }}
          style={{ color: open ? c : C.text3, fontSize:'20px', flexShrink:0, fontWeight:300, lineHeight:1, marginTop:'2px' }}
        >›</motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.22 }} style={{ overflow:'hidden' }}>
            <div style={{ padding:'16px 16px 20px', borderTop:`1px solid ${c}18` }}>
              {finding.location && (
                <div style={{ fontSize:'12px', color:C.cyan, fontFamily:"'Courier New',monospace", marginBottom:'14px', background:`${C.cyan}06`, border:`1px solid ${C.cyan}18`, borderRadius:'4px', padding:'7px 10px', display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap', wordBreak:'break-all' }}>
                  📍 <span>{finding.location}</span>
                </div>
              )}
              {[{label:'Description',text:finding.description},{label:'Impact',text:finding.impact}].map(({label,text}) => (
                <div key={label} style={{ marginBottom:'16px' }}>
                  <div style={{ fontSize:'9px', color:C.text3, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'6px', fontFamily:"'Courier New',monospace" }}>{label}</div>
                  <p style={{ fontSize:'14px', color:C.text2, lineHeight:1.8, margin:0, fontFamily:"'Manrope',sans-serif" }}>{text}</p>
                </div>
              ))}
              {finding.recommendations.length > 0 && (
                <div>
                  <div style={{ fontSize:'9px', color:C.text3, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'10px', fontFamily:"'Courier New',monospace" }}>Recommendations</div>
                  {finding.recommendations.map((r,i) => (
                    <div key={i} style={{ display:'flex', gap:'10px', marginBottom:'7px', alignItems:'flex-start', background:`${C.green}04`, border:`1px solid ${C.green}12`, borderRadius:'4px', padding:'8px 10px' }}>
                      <span style={{ color:C.green, flexShrink:0, marginTop:'2px' }}>▸</span>
                      <span style={{ fontSize:'13px', color:C.text2, lineHeight:1.7, fontFamily:"'Manrope',sans-serif" }}>{r}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Attack Step ─────────────────────────────────────────────── */
const AttackStep: React.FC<{ step: NonNullable<Report['attackChain']>[number]; isLast: boolean; index: number }> = ({ step, isLast, index }) => {
  const isCrit = step.title.includes('[CRITICAL]');
  const c = isCrit ? C.red : C.cyan;
  const phaseColors: Record<string, string> = { RECON:C.cyanSoft, ENUM:C.cyan, EXPLOIT:C.red, PRIVESC:C.purple, POST:C.pink, PERSISTENCE:C.amber };
  const pc = phaseColors[step.phase?.toUpperCase?.()] || c;
  return (
    <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:index*0.07 }} style={{ display:'flex', gap:'14px', position:'relative' }}>
      {!isLast && <div style={{ position:'absolute', left:'19px', top:'42px', bottom:'-16px', width:'1px', background:`linear-gradient(180deg,${c}60,transparent)` }} />}
      {/* Node */}
      <div style={{ width:'40px', height:'40px', borderRadius:'6px', flexShrink:0, background:`${c}0C`, border:`1px solid ${c}55`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:900, color:c, fontFamily:"'Orbitron',monospace", zIndex:1, boxShadow:`0 0 20px ${c}25` }}>
        {String(step.step).padStart(2,'0')}
      </div>
      {/* Card */}
      <div
        className="attack-card"
        style={{ flex:1, minWidth:0, background:`linear-gradient(135deg,${C.bg2},${C.bg3})`, border:`1px solid ${isCrit ? C.red+'25' : C.border2}`, borderRadius:'7px', padding:'14px 16px', marginBottom:'14px', transition:'all 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${c}45`; (e.currentTarget as HTMLElement).style.boxShadow=`0 4px 24px ${c}10`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=isCrit?C.red+'25':C.border2; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}
      >
        <div style={{ display:'flex', alignItems:'flex-start', gap:'8px', marginBottom:'8px', flexWrap:'wrap' }}>
          <span style={{ fontSize:'9px', fontWeight:700, letterSpacing:'2px', color:pc, textTransform:'uppercase', fontFamily:"'Courier New',monospace", background:`${pc}12`, border:`1px solid ${pc}30`, padding:'3px 8px', borderRadius:'3px', whiteSpace:'nowrap' }}>{step.phase}</span>
          <span style={{ fontSize:'14px', fontWeight:700, color:C.text0, fontFamily:"'Manrope',sans-serif", lineHeight:1.4 }}>{step.title}</span>
        </div>
        <p style={{ fontSize:'13px', color:C.text2, margin:'0 0 8px', lineHeight:1.75, fontFamily:"'Manrope',sans-serif" }}>{step.description}</p>
        {step.commands && step.commands.length > 0 && <CodeBlock commands={step.commands} accentColor={c} />}
        {step.result && (
          <div style={{ fontSize:'12px', color:C.green, fontFamily:"'Courier New',monospace", background:`${C.green}06`, border:`1px solid ${C.green}20`, borderRadius:'4px', padding:'8px 12px', marginTop:'8px', display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
            <span>✓</span><span style={{ wordBreak:'break-word' }}>{step.result}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── TOC Items ───────────────────────────────────────────────── */
const TOC_ITEMS = [
  { id:'executive-summary',     label:'Executive Summary' },
  { id:'target-info',           label:'Target Info'       },
  { id:'methodology',           label:'Methodology'       },
  { id:'tools-used',            label:'Tools Used'        },
  { id:'vulnerability-summary', label:'Findings Summary'  },
  { id:'detailed-findings',     label:'Detailed Findings' },
  { id:'attack-chain',          label:'Attack Chain'      },
  { id:'walkthrough',           label:'Walkthrough'       },
  { id:'owasp',                 label:'OWASP Assessment'  },
  { id:'lessons-learned',       label:'Lessons Learned'   },
  { id:'recommendations',       label:'Recommendations'   },
  { id:'flags',                 label:'Flags Captured'    },
  { id:'references',            label:'References'        },
];

/* ── Main Component ──────────────────────────────────────────── */
const ReportDetail: React.FC = () => {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('executive-summary');
  const report  = id ? getReportById(id) : undefined;
  const related = report ? getRelatedReports(report, 2) : [];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    const handle = () => {
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top <= 130) { setActiveSection(TOC_ITEMS[i].id); break; }
      }
    };
    window.addEventListener('scroll', handle, { passive:true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const scrollTo = (id: string) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior:'smooth', block:'start' }); };

  const difficultyColor: Record<string, string> = {
    'Easy':C.green,'Easy-Medium':'#7CFF6B','Medium':C.amber,'Medium-Hard':'#F97316','Hard':C.red,'Insane':C.purple,
  };

  if (!report) {
    return (
      <div style={{ minHeight:'100vh', background:C.bg0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'16px', padding:'20px' }}>
        <MatrixRain />
        <div style={{ position:'relative', zIndex:2, textAlign:'center' }}>
          <div style={{ fontSize:'clamp(60px,15vw,88px)', fontWeight:900, color:C.cyan, fontFamily:"'Orbitron',monospace", textShadow:`0 0 50px ${C.cyan}40` }}>404</div>
          <p style={{ color:C.text3, letterSpacing:'5px', fontSize:'12px', fontFamily:"'Courier New',monospace", marginTop:'8px' }}>TARGET NOT FOUND</p>
          <button onClick={() => navigate('/reports')} style={{ marginTop:'28px', padding:'11px 30px', background:'transparent', border:`1px solid ${C.cyan}35`, borderRadius:'5px', color:C.cyan, cursor:'pointer', fontFamily:"'Courier New',monospace", fontSize:'12px', letterSpacing:'2px', transition:'all 0.15s' }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background=`${C.cyan}0C`; el.style.borderColor=`${C.cyan}70`; }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.borderColor=`${C.cyan}35`; }}
          >← BACK TO REPORTS</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:C.bg0, color:C.text0, fontFamily:"'Manrope','Segoe UI',sans-serif", position:'relative' }}>
      <style>{GLOBAL_STYLES}</style>

      <MatrixRain />
      <div className="grid-bg" />
      <div className="scanline-sweep" />

      {/* Ambient glows */}
      <div style={{ position:'fixed', top:'-150px', right:'-200px', width:'700px', height:'700px', background:`radial-gradient(ellipse at center,${C.purple}06 0%,transparent 65%)`, pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', bottom:'10%', left:'-100px', width:'500px', height:'500px', background:`radial-gradient(ellipse at center,${C.cyan}05 0%,transparent 65%)`, pointerEvents:'none', zIndex:0 }} />

      <div style={{ position:'relative', zIndex:2 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}
          className="rpt-header"
          style={{ background:`linear-gradient(180deg,${C.bg2}F8,${C.bg3}F5)`, borderBottom:`1px solid ${C.border2}`, position:'relative', overflow:'hidden' }}
        >
          {/* Header glows */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'250px', background:`radial-gradient(ellipse at 25% -30%,${C.cyan}08 0%,transparent 60%)`, pointerEvents:'none' }} />
          <div style={{ position:'absolute', top:0, right:0, height:'200px', width:'500px', background:`radial-gradient(ellipse at 80% -20%,${C.purple}06 0%,transparent 60%)`, pointerEvents:'none' }} />

          <div style={{ maxWidth:'1100px', margin:'0 auto', position:'relative' }}>

            {/* Prompt */}
            <div className="rpt-prompt" style={{ fontSize:'12px', color:C.text3, marginBottom:'20px', fontFamily:"'Courier New',monospace", wordBreak:'break-word' }}>
              <span style={{ color:C.cyan }}>root@rytnix</span>
              <span style={{ color:C.text2 }}>:</span>
              <span style={{ color:'#4488FF' }}>~/reports</span>
              <span style={{ color:C.text3 }}>$ cat {report.id}.md</span>
            </div>

            {/* Back button */}
            <button
              onClick={() => navigate('/reports')}
              className="back-btn"
              style={{ background:'transparent', border:`1px solid ${C.border2}`, borderRadius:'5px', padding:'8px 16px', color:C.cyan, fontSize:'11px', cursor:'pointer', marginBottom:'24px', fontFamily:"'Courier New',monospace", letterSpacing:'1px', transition:'all 0.15s', display:'inline-flex', alignItems:'center', gap:'8px' }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=`${C.cyan}50`; el.style.background=`${C.cyan}08`; el.style.boxShadow=`0 0 16px ${C.cyan}18`; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=C.border2; el.style.background='transparent'; el.style.boxShadow='none'; }}
            >← BACK TO REPORTS</button>

            {/* Badges */}
            <div className="badge-row">
              {[
                { text:report.type,       color:C.cyan,   bg:`${C.cyan}0C`,   bdr:`${C.cyan}28`  },
                { text:report.platform,   color:C.text2,  bg:'transparent',   bdr:C.border       },
                { text:`◈ ${report.difficulty}`, color:difficultyColor[report.difficulty]||C.amber, bg:`${difficultyColor[report.difficulty]||C.amber}0D`, bdr:`${difficultyColor[report.difficulty]||C.amber}35` },
                ...(report.grade ? [{ text:`Grade: ${report.grade}`, color:C.red, bg:`${C.red}0C`, bdr:`${C.red}30` }] : []),
                { text:'● PUBLISHED', color:C.green, bg:`${C.green}08`, bdr:`${C.green}28` },
              ].map((b,i) => (
                <span key={i} style={{ fontSize:'10px', fontWeight:700, letterSpacing:'1.2px', color:b.color, background:b.bg, border:`1px solid ${b.bdr}`, padding:'4px 10px', borderRadius:'4px', textTransform:'uppercase', fontFamily:"'Courier New',monospace", whiteSpace:'nowrap' }}>{b.text}</span>
              ))}
            </div>

            {/* Title */}
            <motion.h1
              className="rpt-title"
              initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              style={{ fontSize:'clamp(20px,5vw,46px)', fontWeight:900, margin:'0 0 12px', lineHeight:1.14, color:C.text0, letterSpacing:'-0.5px', fontFamily:"'Orbitron','Courier New',monospace", wordBreak:'break-word' }}
            >
              {report.title}
            </motion.h1>

            <p style={{ fontSize:'15px', color:C.text3, margin:'0 0 18px', lineHeight:1.65, fontFamily:"'Manrope',sans-serif", maxWidth:'700px' }}>{report.subtitle}</p>

            {/* Meta */}
            <div className="meta-row" style={{ display:'flex', flexWrap:'wrap', gap:'12px', fontSize:'12px', color:C.text3, marginBottom:'18px', fontFamily:"'Courier New',monospace" }}>
              <span>🗓 {report.date}</span>
              <span>✍️ <span style={{ color:C.cyan }}>{report.author}</span></span>
              <span>⏱ {report.readingTime}</span>
              {report.result && <span>🎯 <span style={{ color:C.amber }}>{report.result}</span></span>}
            </div>

            {/* Tags */}
            <div className="tags-row">
              {report.tags.map(tag => (
                <span key={tag} style={{ fontSize:'11px', color:C.text3, background:'transparent', border:`1px solid ${C.border}`, padding:'2px 8px', borderRadius:'4px', fontFamily:"'Courier New',monospace" }}>#{tag}</span>
              ))}
            </div>

            {/* Vuln chips */}
            {report.vulnerabilitySummary && (
              <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }} className="vuln-chips">
                {(['critical','high','medium','low'] as const).map(sev => {
                  const count = report.vulnerabilitySummary![sev];
                  if (!count) return null;
                  const sc = severityColor[sev.toUpperCase() as Severity];
                  return (
                    <div key={sev} style={{ background:C.bg2, border:`1px solid ${sc}28`, borderTop:`2px solid ${sc}`, borderRadius:'6px', padding:'10px 18px', display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', minWidth:'66px', boxShadow:`0 4px 20px ${sc}10` }}>
                      <span style={{ fontSize:'22px', fontWeight:900, color:sc, fontFamily:"'Orbitron',monospace", lineHeight:1, textShadow:`0 0 20px ${sc}50` }}>{count}</span>
                      <span style={{ fontSize:'8px', color:sc+'90', letterSpacing:'2px', textTransform:'uppercase', fontFamily:"'Courier New',monospace" }}>{sev}</span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ── BODY LAYOUT ── */}
        <div className="detail-layout">

          {/* ── CONTENT ── */}
          <div ref={contentRef}>

            {/* Executive Summary */}
            <SectionHeader id="executive-summary" title="Executive Summary" icon="📋" accentColor={C.cyan} />
            <div className="exec-box" style={{ background:`linear-gradient(135deg,${C.bg2},${C.bg3})`, border:`1px solid ${C.border2}`, borderLeft:`3px solid ${C.cyan}`, borderRadius:'6px', padding:'18px 16px', boxShadow:`0 4px 28px rgba(0,0,0,0.4)` }}>
              {report.executiveSummary.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize:'15px', color:C.text2, lineHeight:1.82, margin: i>0 ? '14px 0 0' : 0, fontFamily:"'Manrope',sans-serif" }}>{para}</p>
              ))}
            </div>

            {/* Target Info */}
            {report.targetInfo && (
              <>
                <SectionHeader id="target-info" title="Target Information" icon="🎯" accentColor={C.pink} />
                <div className="target-grid">
                  {Object.entries(report.targetInfo).map(([key, value]) => (
                    <motion.div key={key} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} whileHover={{ borderColor:`${C.pink}45` } as any}
                      style={{ background:C.bg2, border:`1px solid ${C.border}`, borderRadius:'5px', padding:'12px 14px', transition:'border-color 0.15s' }}>
                      <div style={{ fontSize:'8px', color:C.text3, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'5px', fontFamily:"'Courier New',monospace" }}>{key.replace(/([A-Z])/g,' $1').trim()}</div>
                      <div style={{ fontSize:'12px', color:C.pink, wordBreak:'break-word', fontFamily:"'Courier New',monospace" }}>{value as string}</div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* Methodology */}
            <SectionHeader id="methodology" title="Testing Methodology" icon="📐" accentColor={C.purple} />
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {report.methodology.map((m, i) => (
                <motion.div key={i} initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.04 }}
                  style={{ display:'flex', gap:'12px', alignItems:'flex-start', background:C.bg2, border:`1px solid ${C.border}`, borderRadius:'5px', padding:'12px 14px', transition:'border-color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor=`${C.purple}35`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor=C.border}
                >
                  <div style={{ width:'26px', height:'26px', borderRadius:'4px', flexShrink:0, background:`${C.purple}10`, border:`1px solid ${C.purple}35`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:900, color:C.purple, fontFamily:"'Orbitron',monospace" }}>{i+1}</div>
                  <p style={{ fontSize:'14px', color:C.text2, margin:0, lineHeight:1.75, fontFamily:"'Manrope',sans-serif" }}>{m}</p>
                </motion.div>
              ))}
            </div>

            {/* Tools Used */}
            <SectionHeader id="tools-used" title="Tools Used" icon="🔧" accentColor={C.cyanSoft} />
            <div className="tools-grid">
              {report.toolsUsed.map((t, i) => (
                <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.03 }}
                  style={{ background:C.bg2, border:`1px solid ${C.border}`, borderRadius:'5px', padding:'12px 14px', display:'flex', gap:'10px', alignItems:'flex-start', transition:'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${C.cyanSoft}40`; (e.currentTarget as HTMLElement).style.boxShadow=`0 2px 16px ${C.cyanSoft}10`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=C.border; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}
                >
                  <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:C.cyanSoft, marginTop:'4px', flexShrink:0, boxShadow:`0 0 8px ${C.cyanSoft}60` }} />
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:'12px', fontWeight:700, color:C.cyanSoft, fontFamily:"'Courier New',monospace" }}>{t.tool}</div>
                    <div style={{ fontSize:'12px', color:C.text3, marginTop:'2px', fontFamily:"'Manrope',sans-serif" }}>{t.purpose}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Findings */}
            {report.findings && report.findings.length > 0 && (
              <>
                <SectionHeader id="vulnerability-summary" title="Findings Summary" icon="⚠️" accentColor={C.amber} />
                {(['CRITICAL','HIGH','MEDIUM','LOW'] as Severity[]).map(sev => {
                  const items = report.findings!.filter(f => f.severity === sev);
                  if (!items.length) return null;
                  return (
                    <div key={sev} style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'10px 14px', marginBottom:'7px', background:C.bg2, border:`1px solid ${severityColor[sev]}18`, borderLeft:`3px solid ${severityColor[sev]}`, borderRadius:'5px', flexWrap:'wrap' }}>
                      <SeverityBadge severity={sev} />
                      <span style={{ fontSize:'12px', color:C.text3, fontFamily:"'Manrope',sans-serif", flex:1, minWidth:0 }}>
                        <strong style={{ color:severityColor[sev], fontFamily:"'Courier New',monospace" }}>{items.length}</strong>
                        {' — '}{items.map(f => f.title).join(', ')}
                      </span>
                    </div>
                  );
                })}
                <SectionHeader id="detailed-findings" title="Detailed Findings" icon="🔎" accentColor={C.red} />
                {report.findings.map((f, i) => <FindingCard key={f.id} finding={f} index={i} />)}
              </>
            )}

            {/* Attack Chain */}
            {report.attackChain && report.attackChain.length > 0 && (
              <>
                <SectionHeader id="attack-chain" title="Attack Chain" icon="⛓" accentColor={C.red} />
                <div style={{ paddingTop:'8px' }}>
                  {report.attackChain.map((step, i) => (
                    <AttackStep key={step.step} step={step} isLast={i === report.attackChain!.length-1} index={i} />
                  ))}
                </div>
              </>
            )}

            {/* Walkthrough */}
            {report.sections && report.sections.length > 0 && (
              <>
                <SectionHeader id="walkthrough" title="Technical Walkthrough" icon="📖" accentColor={C.green} />
                {report.sections.map((section, si) => (
                  <motion.div key={section.id} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:si*0.04 }} style={{ marginBottom:'28px' }}>
                    <h3 style={{ fontSize:'18px', fontWeight:700, color:C.text0, margin:'0 0 10px', paddingLeft:'14px', borderLeft:`2px solid ${C.green}`, fontFamily:"'Manrope',sans-serif", lineHeight:1.35, wordBreak:'break-word' }}>{section.title}</h3>
                    <p style={{ fontSize:'15px', color:C.text2, lineHeight:1.82, margin:'0 0 10px', fontFamily:"'Manrope',sans-serif" }}>{section.content}</p>
                    {section.subsections?.map((sub, i) => (
                      <div key={i} style={{ background:`linear-gradient(135deg,${C.bg2},${C.bg3})`, border:`1px solid ${C.border2}`, borderRadius:'6px', padding:'14px 16px', marginTop:'10px' }}>
                        <h4 style={{ fontSize:'11px', fontWeight:700, color:C.green, margin:'0 0 8px', textTransform:'uppercase', letterSpacing:'1.5px', fontFamily:"'Courier New',monospace", display:'flex', alignItems:'center', gap:'7px' }}>
                          <span style={{ opacity:0.6 }}>▸</span> {sub.title}
                        </h4>
                        <p style={{ fontSize:'14px', color:C.text2, lineHeight:1.8, margin:'0 0 8px', fontFamily:"'Manrope',sans-serif" }}>{sub.content}</p>
                        {sub.commands && <CodeBlock commands={sub.commands} accentColor={C.green} />}
                        {sub.note && (
                          <div style={{ fontSize:'13px', color:C.amber, background:`${C.amber}06`, border:`1px solid ${C.amber}20`, borderLeft:`3px solid ${C.amber}60`, borderRadius:'4px', padding:'10px 12px', marginTop:'10px', fontFamily:"'Manrope',sans-serif" }}>
                            <strong style={{ fontFamily:"'Courier New',monospace", fontSize:'10px', letterSpacing:'1px' }}>⚠ NOTE:</strong> {sub.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </>
            )}

            {/* OWASP */}
            {report.owaspAssessment && (
              <>
                <SectionHeader id="owasp" title="OWASP Top 10 Assessment" icon="📊" accentColor={C.purple} />
                <div className="owasp-table-wrap" style={{ border:`1px solid ${C.border2}`, borderRadius:'7px', background:C.bg2 }}>
                  <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px', minWidth:'480px' }}>
                    <thead>
                      <tr style={{ background:'rgba(0,0,0,0.4)', borderBottom:`1px solid ${C.border2}` }}>
                        {['OWASP Category','Status','Finding'].map(h => (
                          <th key={h} style={{ padding:'11px 14px', textAlign:'left', color:C.purple, fontWeight:700, letterSpacing:'1.5px', fontSize:'9px', textTransform:'uppercase', fontFamily:"'Courier New',monospace", whiteSpace:'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {report.owaspAssessment.map((row, i) => (
                        <tr key={i} style={{ borderBottom:`1px solid ${C.border}`, background: i%2===0 ? 'transparent' : 'rgba(139,92,246,0.02)', transition:'background 0.1s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background=`${C.purple}05`}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background= i%2===0 ? 'transparent' : 'rgba(139,92,246,0.02)'}
                        >
                          <td style={{ padding:'10px 14px', color:C.text2, fontFamily:"'Manrope',sans-serif" }}>{row.category}</td>
                          <td style={{ padding:'10px 14px', whiteSpace:'nowrap' }}>
                            <span style={{ fontSize:'9px', fontWeight:700, color: row.status==='FAIL' ? C.red : C.text3, background: row.status==='FAIL' ? `${C.red}12` : 'transparent', border:`1px solid ${row.status==='FAIL' ? C.red+'35' : C.border}`, padding:'2px 7px', borderRadius:'4px', fontFamily:"'Courier New',monospace" }}>{row.status}</span>
                          </td>
                          <td style={{ padding:'10px 14px', color:C.text3, fontFamily:"'Manrope',sans-serif" }}>{row.finding}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Lessons Learned */}
            {report.lessonsLearned && (
              <>
                <SectionHeader id="lessons-learned" title="Lessons Learned" icon="🎓" accentColor={C.amber} />
                {report.lessonsLearned.map((lesson, i) => (
                  <motion.div key={i} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.05 }}
                    style={{ background:C.bg2, border:`1px solid ${C.border2}`, borderRadius:'6px', padding:'16px', marginBottom:'10px' }}>
                    <div className="lesson-grid">
                      <div>
                        <div style={{ fontSize:'9px', color:C.red, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'8px', fontFamily:"'Courier New',monospace", display:'flex', alignItems:'center', gap:'6px' }}>⚡ Attack Vector</div>
                        <p style={{ fontSize:'14px', color:C.text2, margin:0, lineHeight:1.78, fontFamily:"'Manrope',sans-serif" }}>{lesson.vector}</p>
                      </div>
                      <div>
                        <div style={{ fontSize:'9px', color:C.green, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'8px', fontFamily:"'Courier New',monospace", display:'flex', alignItems:'center', gap:'6px' }}>🛡 Defensive Lesson</div>
                        <p style={{ fontSize:'14px', color:C.text2, margin:0, lineHeight:1.78, fontFamily:"'Manrope',sans-serif" }}>{lesson.lesson}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}

            {/* Recommendations */}
            <SectionHeader id="recommendations" title="Remediation Recommendations" icon="🛡" accentColor={C.cyan} />
            {[
              { label:'🔴 Critical Priority', items:report.recommendations.immediate, color:C.red    },
              { label:'🟠 Short-Term',        items:report.recommendations.shortTerm,  color:C.amber  },
              { label:'🔵 Long-Term',         items:report.recommendations.longTerm,   color:C.purple },
            ].map(({ label, items, color }) => (
              <div key={label} style={{ marginBottom:'20px' }}>
                <h4 style={{ fontSize:'13px', fontWeight:700, color, margin:'0 0 10px', letterSpacing:'0.5px', fontFamily:"'Manrope',sans-serif", display:'flex', alignItems:'center', gap:'9px' }}>
                  <div style={{ width:'3px', height:'16px', background:color, borderRadius:'2px', flexShrink:0 }} />
                  {label}
                </h4>
                {items.map((item, i) => (
                  <div key={i} style={{ display:'flex', gap:'10px', padding:'10px 14px', marginBottom:'6px', background:C.bg2, border:`1px solid ${color}14`, borderRadius:'5px', alignItems:'flex-start' }}>
                    <span style={{ color, flexShrink:0, marginTop:'2px' }}>▸</span>
                    <span style={{ fontSize:'14px', color:C.text2, lineHeight:1.75, fontFamily:"'Manrope',sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Flags */}
            {report.flags && report.flags.length > 0 && (
              <>
                <SectionHeader id="flags" title="Flags Captured" icon="🚩" accentColor={C.pink} />
                {report.flags.map((flag, i) => (
                  <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                    style={{ background:C.bg2, border:`1px solid ${C.pink}20`, borderLeft:`3px solid ${C.pink}`, borderRadius:'5px', padding:'12px 16px', display:'flex', gap:'14px', alignItems:'flex-start', flexWrap:'wrap', marginBottom:'9px', boxShadow:`0 2px 14px ${C.pink}08` }}>
                    <div style={{ fontSize:'11px', fontWeight:700, color:C.pink, letterSpacing:'1px', textTransform:'uppercase', minWidth:'120px', fontFamily:"'Courier New',monospace", whiteSpace:'nowrap' }}>🚩 {flag.name}</div>
                    <div style={{ fontSize:'12px', color:C.green, wordBreak:'break-all', fontFamily:"'Courier New',monospace", background:`${C.green}06`, border:`1px solid ${C.green}15`, borderRadius:'4px', padding:'4px 10px', flex:1 }}>{flag.value}</div>
                  </motion.div>
                ))}
              </>
            )}

            {/* Conclusion */}
            <SectionHeader id="conclusion" title="Conclusion" icon="📝" accentColor={C.cyan} />
            <div style={{ background:`linear-gradient(135deg,${C.bg2},${C.bg3})`, border:`1px solid ${C.border2}`, borderLeft:`3px solid ${C.cyan}`, borderRadius:'6px', padding:'18px 16px' }}>
              {report.conclusion.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize:'15px', color:C.text2, lineHeight:1.82, margin: i>0 ? '14px 0 0' : 0, fontFamily:"'Manrope',sans-serif" }}>{para}</p>
              ))}
            </div>

            {/* References */}
            {report.references && report.references.length > 0 && (
              <>
                <SectionHeader id="references" title="References" icon="🔗" accentColor={C.cyanSoft} />
                {report.references.map((ref, i) => (
                  <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', gap:'8px', alignItems:'center', fontSize:'13px', color:C.cyan, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:'5px', padding:'10px 14px', textDecoration:'none', marginBottom:'7px', transition:'all 0.15s', fontFamily:"'Manrope',sans-serif", flexWrap:'wrap' }}
                    onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=`${C.cyan}35`; el.style.background=`${C.cyan}06`; el.style.boxShadow=`0 2px 16px ${C.cyan}10`; }}
                    onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=C.border; el.style.background=C.bg2; el.style.boxShadow='none'; }}
                  >
                    <span>🔗</span>
                    <span style={{ flex:1, minWidth:0, wordBreak:'break-word' }}>{ref.title}</span>
                    <span style={{ color:C.text3, fontSize:'10px', fontFamily:"'Courier New',monospace", whiteSpace:'nowrap' }}>↗ {ref.url.replace('https://','').split('/')[0]}</span>
                  </a>
                ))}
              </>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div style={{ marginTop:'48px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'20px' }}>
                  <div style={{ width:'4px', height:'22px', background:`linear-gradient(180deg,${C.cyan},${C.purple})`, borderRadius:'2px', flexShrink:0 }} />
                  <h2 style={{ fontSize:'17px', fontWeight:800, color:C.text0, margin:0, fontFamily:"'Orbitron',monospace", letterSpacing:'0.5px' }}>Related Reports</h2>
                  <div style={{ flex:1, height:'1px', background:`linear-gradient(90deg,${C.cyan}25,transparent)` }} />
                </div>
                <div className="related-grid">
                  {related.map(r => <ReportCard key={r.id} report={r} />)}
                </div>
              </div>
            )}

            {/* Footer credit */}
            <div style={{ marginTop:'44px', padding:'14px 18px', background:C.bg2, border:`1px solid ${C.border}`, borderRadius:'5px', textAlign:'center' }}>
              <p style={{ fontSize:'11px', color:C.text3, margin:0, fontFamily:"'Courier New',monospace" }}>
                Report by <span style={{ color:C.cyan }}>RYTNIX (Rushil Varade)</span> — isolated lab environment · educational purposes only.
              </p>
            </div>
          </div>

          {/* ── STICKY TOC (desktop only) ── */}
          <aside className="toc-panel" style={{ position:'sticky', top:'92px', height:'fit-content', background:`linear-gradient(160deg,${C.bg2},${C.bg3})`, border:`1px solid ${C.border2}`, borderTop:`2px solid ${C.cyan}`, borderRadius:'7px', padding:'14px', boxShadow:`0 4px 36px rgba(0,0,0,0.5), inset 0 1px 0 ${C.cyan}08` }}>
            <div style={{ display:'flex', gap:'5px', marginBottom:'12px', paddingBottom:'10px', borderBottom:`1px solid ${C.border}`, alignItems:'center' }}>
              {['#FF5F57','#FFBD2E','#28C840'].map(c => <span key={c} style={{ width:'8px', height:'8px', borderRadius:'50%', background:c, display:'block', opacity:0.85 }} />)}
              <span style={{ fontSize:'9px', color:C.text3, marginLeft:'4px', fontFamily:"'Courier New',monospace" }}>toc.sh</span>
            </div>

            <nav style={{ display:'flex', flexDirection:'column', gap:'1px' }}>
              {TOC_ITEMS.map(item => {
                const active = activeSection === item.id;
                return (
                  <button key={item.id} onClick={() => scrollTo(item.id)} style={{ background: active ? `${C.cyan}08` : 'transparent', border:'none', borderLeft:`2px solid ${active ? C.cyan : 'transparent'}`, padding:'7px 10px', fontSize:'11px', color: active ? C.cyan : C.text3, cursor:'pointer', textAlign:'left', transition:'all 0.13s', fontFamily: active ? "'Courier New',monospace" : "'Manrope',sans-serif", lineHeight:1.5, borderRadius: active ? '0 4px 4px 0' : '0', fontWeight: active ? 700 : 400 }}
                    onMouseEnter={e => { if (!active) { const el=e.currentTarget as HTMLElement; el.style.color=C.text1; el.style.borderLeftColor=`${C.cyan}28`; el.style.background=`${C.cyan}04`; } }}
                    onMouseLeave={e => { if (!active) { const el=e.currentTarget as HTMLElement; el.style.color=C.text3; el.style.borderLeftColor='transparent'; el.style.background='transparent'; } }}
                  >{item.label}</button>
                );
              })}
            </nav>

            <div style={{ marginTop:'12px', paddingTop:'11px', borderTop:`1px solid ${C.border}`, display:'flex', flexDirection:'column', gap:'5px', fontSize:'10px', color:C.text3, fontFamily:"'Courier New',monospace" }}>
              <div>🗓 {report.date}</div>
              <div>⏱ {report.readingTime}</div>
              <div>🖥 {report.platform}</div>
              <div style={{ color:difficultyColor[report.difficulty]||C.amber }}>◈ {report.difficulty}</div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ReportDetail;