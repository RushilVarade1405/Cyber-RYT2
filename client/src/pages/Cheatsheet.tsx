import React, { useState, useCallback, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  cheatsheetData,
  Section,
  Subsection,
  Tool,
  Command,
  Vulnerability,
  ManualExploit,
  ReverseShell,
  XSSType,
  CSRFExploit,
  DeserializationExample,
  OWASPVulnerability,
  Port,
} from '../data/cheatsheetData';

/* ─────────────────────────────────────────────────────────
   STYLES  (no looping animations — they were the lag source)
───────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');

  :root {
    --c:  #00eeff;
    --cd: #0099bb;
    --cb: #003344;
    --bg: #00080d;
    --bg1:#00111a;
    --bg2:#001420;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  /* Grid background — static, no animation */
  .grid-bg {
    background-image:
      linear-gradient(rgba(0,238,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,238,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    background-attachment: local;
  }

  .mono  { font-family: 'Share Tech Mono', monospace; }
  .orbit { font-family: 'Orbitron', sans-serif; }

  /* Cyan text + subtle glow — static, no animation */
  .ct { color: var(--c); text-shadow: 0 0 6px rgba(0,238,255,0.4); }
  .ct-dim { color: var(--cd); }

  /* Borders */
  .tb  { border: 1px solid rgba(0,238,255,0.18); }
  .tb2 { border: 1px solid rgba(0,238,255,0.35); }

  /* Cmd / payload accent bars */
  .cmd-bar  { border-left: 2px solid var(--cd); background: var(--bg2); }
  .cmd-bar:hover { border-left-color: var(--c); background: #001d2b; }
  .pay-bar  { border-left: 2px solid #bb5500; background: #080300; }
  .pay-bar:hover { border-left-color: #ff8800; background: #130600; }

  /* Sidebar nav hover fill */
  .nav-btn { position: relative; overflow: hidden; transition: background 0.15s; }
  .nav-btn:hover { background: rgba(0,238,255,0.06) !important; }
  .nav-btn.active-nav { background: rgba(0,238,255,0.1) !important; border-color: rgba(0,238,255,0.3) !important; }

  /* Severity colours */
  .sev-c { color: #ff3355; }
  .sev-h { color: #ff6600; }
  .sev-m { color: #ffaa00; }
  .sev-l { color: #00aaff; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: rgba(0,238,255,0.2); border-radius: 2px; }

  /* Clickable blocks */
  .click-block { cursor: pointer; transition: border-color 0.12s, background 0.12s; }
  .click-block:active { opacity: 0.85; }

  /* Collapse toggle */
  .toggle-icon { display: inline-block; transition: transform 0.18s; }
  .toggle-icon.open { transform: rotate(90deg); }

  /* Progress bar — static fill, no animation */
  .prog-fill {
    background: linear-gradient(90deg, var(--cb), var(--c));
    box-shadow: 0 0 6px var(--cd);
    transition: width 0.3s ease;
  }

  /* Responsive text helpers */
  .title-fluid { font-size: clamp(1.1rem, 3vw, 1.9rem); }
  .section-title { font-size: clamp(1rem, 2.5vw, 1.6rem); }
  .sub-title { font-size: clamp(0.85rem, 2vw, 1.1rem); }

  /* Code pre */
  pre { white-space: pre-wrap; word-break: break-all; }
`;

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
const sevClass = (s = '') => {
  switch (s.toLowerCase()) {
    case 'critical': return 'sev-c';
    case 'high':     return 'sev-h';
    case 'medium':   return 'sev-m';
    default:         return 'sev-l';
  }
};

const sevBorder = (s = '') => {
  switch (s.toLowerCase()) {
    case 'critical': return 'rgba(255,51,85,0.35)';
    case 'high':     return 'rgba(255,102,0,0.35)';
    case 'medium':   return 'rgba(255,170,0,0.35)';
    default:         return 'rgba(0,170,255,0.35)';
  }
};

/* ─────────────────────────────────────────────────────────
   COPY BUTTON  (memoised — avoids re-render of parent)
───────────────────────────────────────────────────────── */
const CopyBtn = memo(({ text, style = {} }: { text: string; style?: React.CSSProperties }) => {
  const [ok, setOk] = useState(false);
  const handle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).catch(() => {});
    setOk(true);
    setTimeout(() => setOk(false), 1800);
  }, [text]);
  return (
    <button
      onClick={handle}
      style={{ fontSize: 11, fontFamily: 'Share Tech Mono,monospace', color: ok ? '#00eeff' : 'rgba(0,238,255,0.35)', transition: 'color 0.15s', whiteSpace: 'nowrap', ...style }}
    >
      {ok ? '✓ COPIED' : '⧉ COPY'}
    </button>
  );
});

/* ─────────────────────────────────────────────────────────
   COMMAND BLOCK
───────────────────────────────────────────────────────── */
const CommandBlock = memo(({ cmd }: { cmd: Command }) => (
  <div className="cmd-bar click-block rounded-r-md px-3 py-2.5 group">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-1.5 mb-1">
          <span className="ct-dim mono text-xs mt-px shrink-0">$</span>
          <code className="ct mono text-xs sm:text-sm break-all leading-relaxed">{cmd.command}</code>
        </div>
        <p className="mono text-xs leading-relaxed" style={{ color: 'rgba(0,238,255,0.4)' }}>
          {cmd.description}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="mono rounded px-1.5 py-0.5" style={{ fontSize: 9, background: 'rgba(0,238,255,0.07)', color: 'rgba(0,238,255,0.45)', border: '1px solid rgba(0,238,255,0.15)' }}>
          {cmd.category}
        </span>
        <CopyBtn text={cmd.command} />
      </div>
    </div>
  </div>
));

/* ─────────────────────────────────────────────────────────
   PAYLOAD BLOCK
───────────────────────────────────────────────────────── */
const PayloadBlock = memo(({ payload, description, context }: { payload: string; description: string; context: string }) => (
  <div className="pay-bar click-block rounded-r-md px-3 py-2.5">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <code className="mono text-xs sm:text-sm break-all leading-relaxed block mb-1" style={{ color: '#ff8800', textShadow: '0 0 4px rgba(255,136,0,0.25)' }}>
          {payload}
        </code>
        <p className="mono text-xs" style={{ color: 'rgba(255,136,0,0.4)' }}>
           {description}{context ? ` [${context}]` : ''}
        </p>
      </div>
      <CopyBtn text={payload} style={{ color: 'rgba(255,136,0,0.35)' }} />
    </div>
  </div>
));

/* ─────────────────────────────────────────────────────────
   CODE BLOCK  (CSRF / Deserialization)
───────────────────────────────────────────────────────── */
const CodeBlock = memo(({ name, code, description, color }: { name: string; code: string; description: string; color: string }) => (
  <div className="rounded-lg overflow-hidden" style={{ background: '#000', border: `1px solid ${color}22` }}>
    <div className="flex items-center justify-between px-3 py-1.5" style={{ background: `${color}0d`, borderBottom: `1px solid ${color}18` }}>
      <span className="orbit font-bold" style={{ fontSize: 11, color, letterSpacing: '0.08em' }}>{name}</span>
      <CopyBtn text={code} style={{ color: `${color}60` }} />
    </div>
    <pre className="px-3 py-2.5 text-xs mono overflow-x-auto leading-relaxed" style={{ color: `${color}bb` }}>
      <code>{code}</code>
    </pre>
    {description && <p className="px-3 pb-2 mono text-xs" style={{ color: `${color}45` }}>{description}</p>}
  </div>
));

/* ─────────────────────────────────────────────────────────
   SECTION LABEL DIVIDER
───────────────────────────────────────────────────────── */
const Divider = ({ label, color }: { label: string; color: string }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className="flex-1 h-px opacity-20" style={{ background: color }} />
    <span className="orbit font-bold rounded px-2 py-0.5" style={{ fontSize: 9, color, background: `${color}12`, border: `1px solid ${color}28`, letterSpacing: '0.18em' }}>
      {label}
    </span>
    <div className="flex-1 h-px opacity-20" style={{ background: color }} />
  </div>
);

/* ─────────────────────────────────────────────────────────
   COLLAPSE WRAPPER  (CSS height trick — no Framer on internals)
───────────────────────────────────────────────────────── */
const Collapse = ({ open, children }: { open: boolean; children: React.ReactNode }) => (
  <div style={{ display: open ? 'block' : 'none' }}>{children}</div>
);

/* ─────────────────────────────────────────────────────────
   TOOL CARD
───────────────────────────────────────────────────────── */
const ToolCard = memo(({ tool }: { tool: Tool }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="tb rounded-lg overflow-hidden" style={{ background: 'var(--bg2)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.025] transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="ct-dim mono text-xs shrink-0">▶</span>
          <span className="ct orbit font-bold text-sm sm:text-base truncate" style={{ letterSpacing: '0.05em' }}>
            {tool.name}
          </span>
          {tool.notes && (
            <span className="mono rounded px-1.5 hidden sm:inline" style={{ fontSize: 9, background: 'rgba(255,170,0,0.1)', color: '#ffaa00', border: '1px solid rgba(255,170,0,0.2)' }}>NOTE</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="mono hidden sm:inline" style={{ fontSize: 10, color: 'rgba(0,238,255,0.28)' }}>
            {tool.commands.length} CMD{tool.commands.length !== 1 ? 'S' : ''}
          </span>
          <span className={`toggle-icon ct-dim text-xs ${open ? 'open' : ''}`}>▶</span>
        </div>
      </button>

      {tool.description && (
        <p className="px-4 pb-1 mono text-xs" style={{ color: 'rgba(0,238,255,0.38)' }}> {tool.description}</p>
      )}
      {tool.notes && (
        <p className="px-4 pb-1.5 mono text-xs" style={{ color: '#cc8800' }}>⚠ {tool.notes}</p>
      )}

      <Collapse open={open}>
        <div className="px-4 pb-4 pt-1 space-y-2">
          {tool.commands.map((c: Command, i: number) => (
            <CommandBlock key={i} cmd={c} />
          ))}
        </div>
      </Collapse>
    </div>
  );
});

/* ─────────────────────────────────────────────────────────
   VULNERABILITY CARD
───────────────────────────────────────────────────────── */
const VulnCard = memo(({ vuln }: { vuln: Vulnerability }) => {
  const [open, setOpen] = useState(true);
  const sev = vuln.severity ?? 'low';
  const border = sevBorder(sev);

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#060008', border: `1px solid ${border}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-start gap-2.5 min-w-0 text-left">
          <span className="text-sm shrink-0 mt-0.5" style={{ color: border }}>⚠</span>
          <div className="min-w-0">
            <h4 className={`orbit font-bold text-sm sm:text-base break-words ${sevClass(sev)}`}>{vuln.name}</h4>
            {vuln.description && <p className="mono text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{vuln.description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className={`orbit font-bold rounded px-2 py-0.5 ${sevClass(sev)}`} style={{ fontSize: 9, background: `${border.replace('0.35','0.1')}`, border: `1px solid ${border}` }}>
            {vuln.severity}
          </span>
          <span className={`toggle-icon text-white/30 text-xs ${open ? 'open' : ''}`}>▶</span>
        </div>
      </button>

      <Collapse open={open}>
        <div className="px-4 pb-4 space-y-3">
          {vuln.manualExploits && vuln.manualExploits.length > 0 && (
            <div><Divider label="MANUAL PAYLOADS" color="#ff8800" />
              <div className="space-y-2">{vuln.manualExploits.map((e: ManualExploit, i: number) => <PayloadBlock key={i} payload={e.payload} description={e.description} context={e.context} />)}</div>
            </div>
          )}
          {vuln.types && (vuln.types as XSSType[]).map((t: XSSType, i: number) => (
            <div key={i}><Divider label={t.type?.toUpperCase() ?? 'TYPE'} color="#ff8800" />
              <div className="space-y-2">{t.payloads.map((p: any, j: number) => <PayloadBlock key={j} payload={p.payload} description={p.description} context={p.context} />)}</div>
            </div>
          ))}
          {vuln.payloads && vuln.payloads.length > 0 && (
            <div><Divider label="PAYLOADS" color="#ff8800" />
              <div className="space-y-2">{(vuln.payloads as any[]).map((p: any, i: number) => <PayloadBlock key={i} payload={p.payload} description={p.description} context={p.context} />)}</div>
            </div>
          )}
          {vuln.reverseShells && vuln.reverseShells.length > 0 && (
            <div><Divider label="REVERSE SHELLS" color="#00eeff" />
              <div className="space-y-2">
                {vuln.reverseShells.map((s: ReverseShell, i: number) => (
                  <div key={i} className="cmd-bar click-block rounded-r-md px-3 py-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="orbit font-bold block mb-0.5 ct-dim" style={{ fontSize: 10 }}>{s.name}</span>
                        <code className="ct mono text-xs break-all block">{s.command}</code>
                        <p className="mono text-xs mt-0.5" style={{ color: 'rgba(0,238,255,0.38)' }}> {s.description}</p>
                      </div>
                      <CopyBtn text={s.command} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {vuln.exploits && vuln.exploits.length > 0 && (
            <div><Divider label="EXPLOIT CODE" color="#cc44ff" />
              <div className="space-y-2">{vuln.exploits.map((e: CSRFExploit, i: number) => <CodeBlock key={i} name={e.name} code={e.code} description={e.description} color="#cc44ff" />)}</div>
            </div>
          )}
          {vuln.examples && vuln.examples.length > 0 && (
            <div><Divider label="EXAMPLES" color="#ffaa00" />
              <div className="space-y-2">{(vuln.examples as DeserializationExample[]).map((e: DeserializationExample, i: number) => <CodeBlock key={i} name={e.language} code={e.payload} description={e.description} color="#ffaa00" />)}</div>
            </div>
          )}
          {vuln.tools && vuln.tools.map((t: Tool, i: number) => (
            <div key={i}><Divider label={`TOOL: ${t.name}`} color="#00eeff" />
              <div className="space-y-2">{t.commands.map((c: Command, j: number) => <CommandBlock key={j} cmd={c} />)}</div>
            </div>
          ))}
          {vuln.notes && <p className="mono text-xs mt-1" style={{ color: '#cc8800' }}>⚠ {vuln.notes}</p>}
        </div>
      </Collapse>
    </div>
  );
});

/* ─────────────────────────────────────────────────────────
   PORT GRID
───────────────────────────────────────────────────────── */
const PortGrid = memo(({ ports }: { ports: Port[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
    {ports.map((p: Port, i: number) => (
      <div key={i} className="tb rounded-lg p-3" style={{ background: 'var(--bg2)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="ct orbit font-bold" style={{ fontSize: 15 }}>:{p.port}</span>
          <span className="mono rounded px-2 py-0.5" style={{ fontSize: 9, background: 'rgba(0,238,255,0.07)', color: 'rgba(0,238,255,0.45)', border: '1px solid rgba(0,238,255,0.15)' }}>
            {p.service}
          </span>
        </div>
        <ul className="space-y-1">
          {p.vulnerabilities.map((v: string, j: number) => (
            <li key={j} className="mono flex gap-1.5 break-words" style={{ fontSize: 11, color: 'rgba(255,51,85,0.7)' }}>
              <span className="opacity-50 shrink-0">•</span>{v}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
));

/* ─────────────────────────────────────────────────────────
   OWASP CARD
───────────────────────────────────────────────────────── */
const OWASPCard = memo(({ vuln, defaultOpen }: { vuln: OWASPVulnerability; defaultOpen: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  const sev = vuln.severity ?? 'high';

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#050800', border: '1px solid rgba(255,170,0,0.2)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-start gap-3 text-left min-w-0">
          <span className="font-bold shrink-0" style={{ fontSize: 22, fontFamily: 'monospace', color: 'rgba(255,170,0,0.35)', lineHeight: 1, marginTop: 2 }}>
            {String(vuln.rank).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <h3 className="orbit font-bold text-sm sm:text-base break-words" style={{ color: '#ffaa00', textShadow: '0 0 6px rgba(255,170,0,0.25)' }}>
              {vuln.name}
            </h3>
            <p className="mono text-xs mt-0.5" style={{ color: 'rgba(255,170,0,0.38)' }}>{vuln.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className={`orbit font-bold rounded px-2 py-0.5 ${sevClass(sev)}`} style={{ fontSize: 9, background: `${sevBorder(sev).replace('0.35','0.1')}`, border: `1px solid ${sevBorder(sev)}` }}>
            {vuln.severity}
          </span>
          <span className={`toggle-icon text-white/30 text-xs ${open ? 'open' : ''}`}>▶</span>
        </div>
      </button>

      <Collapse open={open}>
        <div className="px-4 pb-4 space-y-3">
          {vuln.examples && (vuln.examples as string[]).length > 0 && (
            <div><Divider label="EXAMPLES" color="#ffaa00" />
              <ul className="space-y-1">{(vuln.examples as string[]).map((ex, i) => (
                <li key={i} className="mono flex gap-2 break-words" style={{ fontSize: 12, color: 'rgba(255,170,0,0.6)' }}>
                  <span className="opacity-40 shrink-0">▸</span>{ex}
                </li>
              ))}</ul>
            </div>
          )}
          {vuln.types && (vuln.types as string[]).length > 0 && (
            <div><Divider label="TYPES" color="#ffaa00" />
              <div className="flex flex-wrap gap-2">
                {(vuln.types as string[]).map((t, i) => (
                  <span key={i} className="mono rounded px-2 py-1" style={{ fontSize: 11, background: 'rgba(255,170,0,0.07)', color: 'rgba(255,170,0,0.55)', border: '1px solid rgba(255,170,0,0.15)' }}>{t}</span>
                ))}
              </div>
            </div>
          )}
          {vuln.testMethods && vuln.testMethods.length > 0 && (
            <div><Divider label="TEST METHODS" color="#ffaa00" />
              <ul className="space-y-1">{vuln.testMethods.map((m, i) => (
                <li key={i} className="mono flex gap-2 break-words" style={{ fontSize: 12, color: 'rgba(255,170,0,0.6)' }}>
                  <span className="opacity-40 shrink-0">▸</span>{m}
                </li>
              ))}</ul>
            </div>
          )}
          {vuln.payloads && vuln.payloads.length > 0 && (
            <div><Divider label="PAYLOADS" color="#ff8800" />
              <div className="space-y-2">{(vuln.payloads as any[]).map((p: any, i: number) => <PayloadBlock key={i} payload={p.payload} description={p.description} context={p.context} />)}</div>
            </div>
          )}
          {vuln.tools && (vuln.tools as string[]).length > 0 && (
            <div><Divider label="TOOLS" color="#ffaa00" />
              <div className="flex flex-wrap gap-2">
                {(vuln.tools as string[]).map((t, i) => (
                  <span key={i} className="mono rounded px-2 py-1" style={{ fontSize: 11, background: 'rgba(0,238,255,0.06)', color: 'rgba(0,238,255,0.5)', border: '1px solid rgba(0,238,255,0.14)' }}>$ {t}</span>
                ))}
              </div>
            </div>
          )}
          {vuln.covered && <p className="mono italic mt-2" style={{ fontSize: 11, color: 'rgba(255,170,0,0.32)' }}>📍 {vuln.covered}</p>}
        </div>
      </Collapse>
    </div>
  );
});

/* ─────────────────────────────────────────────────────────
   SECTION CONTENT  (memoised — only re-renders on section change)
───────────────────────────────────────────────────────── */
const SectionContent = memo(({ section }: { section: Section }) => (
  <div className="space-y-4">
    {section.subsections?.map((sub: Subsection, i: number) => (
      <div key={i} className="tb rounded-xl overflow-hidden" style={{ background: 'var(--bg1)' }}>
        <div className="px-4 sm:px-5 py-3.5 border-b" style={{ borderColor: 'rgba(0,238,255,0.08)', background: 'rgba(0,238,255,0.025)' }}>
          <h3 className="ct orbit font-bold sub-title">{sub.subtitle}</h3>
          {sub.description && <p className="mono text-xs mt-0.5 opacity-35"> {sub.description}</p>}
        </div>
        <div className="p-4 sm:p-5 space-y-3">
          {sub.tools?.map((t: Tool, j: number) => <ToolCard key={j} tool={t} />)}
          {sub.vulnerabilities?.map((v: Vulnerability, j: number) => <VulnCard key={j} vuln={v} />)}
        </div>
      </div>
    ))}

    {section.vulnerabilities && (
      <div className="space-y-3">
        {section.vulnerabilities.map((v: OWASPVulnerability, i: number) => (
          <OWASPCard key={i} vuln={v} defaultOpen={i === 0} />
        ))}
      </div>
    )}

    {section.ports && <PortGrid ports={section.ports} />}
  </div>
));

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function Cheatsheet() {
  const [active, setActive] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = cheatsheetData.sections as Section[];
  const total = sections.length;
  const cur = sections[active];

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setDrawerOpen(false);
    // Scroll content area back to top
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, []);

  const pct = Math.round(((active + 1) / total) * 100);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="grid-bg min-h-screen mono" style={{ background: 'var(--bg)', color: 'var(--c)' }}>

        {/* ══════════ HEADER ══════════ */}
        <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: 'rgba(0,8,13,0.96)', borderBottom: '1px solid rgba(0,238,255,0.12)' }}>
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-5 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3">

              {/* Title */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                  <span className="mono opacity-40 hidden sm:inline" style={{ fontSize: 9, letterSpacing: '0.28em' }}>SECURITY TOOLKIT v2.0</span>
                </div>
                <h1 className="ct orbit font-black title-fluid truncate" style={{ letterSpacing: '0.04em' }}>
                  {cheatsheetData.title}
                </h1>
              </div>

              {/* Section counter (desktop) */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-28 h-1.5 rounded-full" style={{ background: 'rgba(0,238,255,0.1)' }}>
                    <div className="h-full rounded-full prog-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="mono opacity-35" style={{ fontSize: 10 }}>{pct}%</span>
                </div>
                <div className="tb rounded-lg px-3 py-1.5" style={{ background: 'rgba(0,238,255,0.05)' }}>
                  <span className="ct orbit font-bold" style={{ fontSize: 13 }}>
                    {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setDrawerOpen(v => !v)}
                className="lg:hidden tb rounded-lg p-2.5 transition-colors hover:bg-cyan-400/10 shrink-0"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5 ct" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {drawerOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>

            {/* Mobile: active section + progress */}
            <div className="lg:hidden mt-2.5 flex items-center gap-3">
              <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(0,238,255,0.1)' }}>
                <div className="h-full rounded-full prog-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="mono opacity-40 shrink-0" style={{ fontSize: 10 }}>{String(active+1).padStart(2,'0')}/{String(total).padStart(2,'0')}</span>
            </div>
          </div>
        </header>

        {/* ══════════ MOBILE DRAWER ══════════ */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                key="bd"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="lg:hidden fixed inset-0 z-40"
                style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(3px)' }}
                onClick={() => setDrawerOpen(false)}
              />
              <motion.div
                key="drawer"
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: 'tween', duration: 0.2 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto flex flex-col"
                style={{ background: '#00080d', borderRight: '1px solid rgba(0,238,255,0.14)' }}
              >
                <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: 'rgba(0,238,255,0.1)' }}>
                  <span className="ct orbit font-bold text-sm">MODULES</span>
                  <button onClick={() => setDrawerOpen(false)} className="ct-dim hover:ct p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex-1 p-3 space-y-0.5">
                  {sections.map((s, i) => (
                    <button key={i} onClick={() => goTo(i)}
                      className={`nav-btn w-full text-left px-3 py-2.5 rounded-lg tb transition-colors ${i === active ? 'active-nav' : 'border-transparent'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="mono opacity-30 shrink-0 w-5 text-right" style={{ fontSize: 13 }}>{String(i+1).padStart(2,'0')}</span>
                        <span className={`mono text-xs flex-1 leading-snug ${i === active ? 'ct' : 'opacity-50'}`}>{s.title}</span>
                        {i === active && <span className="ct-dim text-xs shrink-0">◀</span>}
                      </div>
                    </button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ══════════ BODY ══════════ */}
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-5 lg:px-8 py-5 flex gap-5 lg:gap-7">

          {/* ── SIDEBAR (desktop) ── */}
          <aside className="hidden lg:flex flex-col shrink-0" style={{ width: 220, minWidth: 180 }}>
            <div className="sticky top-20 flex flex-col gap-3" style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}>
              <p className="mono opacity-25 px-1" style={{ fontSize: 9, letterSpacing: '0.25em' }}>MODULES ({total})</p>

              {/* Progress */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(0,238,255,0.1)' }}>
                  <div className="h-full rounded-full prog-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="mono opacity-30" style={{ fontSize: 9 }}>{pct}%</span>
              </div>

              <nav className="space-y-0.5">
                {sections.map((s, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    className={`nav-btn w-full text-left px-3 py-2.5 rounded-lg tb transition-colors ${i === active ? 'active-nav' : 'border-transparent'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="mono opacity-25 shrink-0" style={{ fontSize: 11, width: 18, textAlign: 'right' }}>{String(i+1).padStart(2,'0')}</span>
                      <span className={`mono text-xs flex-1 leading-snug line-clamp-2 ${i === active ? 'ct' : 'opacity-45'}`}>{s.title}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 min-w-0 space-y-4">
            <div ref={topRef} />

            {/* Section header */}
            <div className="tb rounded-xl px-4 sm:px-6 py-4 sm:py-5 relative overflow-hidden" style={{ background: 'rgba(0,238,255,0.025)' }}>
              {/* Corner decorations */}
              <span className="absolute top-2 right-3 mono opacity-10" style={{ fontSize: 11 }}>╔══╗</span>
              <span className="absolute bottom-2 left-3 mono opacity-10" style={{ fontSize: 11 }}>╚══╝</span>

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-0.5 h-4 rounded-full" style={{ background: '#00eeff', boxShadow: '0 0 6px #00eeff' }} />
                    <span className="mono opacity-40" style={{ fontSize: 9, letterSpacing: '0.28em' }}>
                      MODULE {String(active+1).padStart(2,'0')} OF {String(total).padStart(2,'0')}
                    </span>
                  </div>
                  <h2 className="ct orbit font-black section-title" style={{ letterSpacing: '0.03em' }}>{cur.title}</h2>
                  {cur.description && (
                    <p className="mono mt-1.5 opacity-35 max-w-2xl leading-relaxed" style={{ fontSize: 12 }}>
                      {cur.description}
                    </p>
                  )}
                </div>

                {/* Prev / Next */}
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0}
                    className="tb rounded-lg px-3 py-2 mono text-xs hover:tb2 transition-all disabled:opacity-20"
                    style={{ background: 'rgba(0,238,255,0.04)', color: '#00eeff' }}>
                    ◀ PREV
                  </button>
                  <button onClick={() => goTo(Math.min(total - 1, active + 1))} disabled={active === total - 1}
                    className="tb rounded-lg px-3 py-2 mono text-xs hover:tb2 transition-all disabled:opacity-20"
                    style={{ background: 'rgba(0,238,255,0.04)', color: '#00eeff' }}>
                    NEXT ▶
                  </button>
                </div>
              </div>
            </div>

            {/* Section body — no AnimatePresence wrapper, just instant swap */}
            <SectionContent key={active} section={cur} />

            {/* Bottom pagination */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(0,238,255,0.08)' }}>
              <button onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0}
                className="tb rounded-lg px-4 py-2.5 mono text-xs hover:tb2 transition-all disabled:opacity-20"
                style={{ background: 'rgba(0,238,255,0.04)', color: '#00eeff' }}>
                ◀ PREV MODULE
              </button>

              {/* Dot navigation — only show on sm+ to avoid overflow */}
              <div className="hidden sm:flex items-center gap-1.5 flex-wrap justify-center max-w-xs">
                {sections.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    style={{
                      width: i === active ? 16 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === active ? '#00eeff' : 'rgba(0,238,255,0.2)',
                      boxShadow: i === active ? '0 0 6px #00eeff' : 'none',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>

              <button onClick={() => goTo(Math.min(total - 1, active + 1))} disabled={active === total - 1}
                className="tb rounded-lg px-4 py-2.5 mono text-xs hover:tb2 transition-all disabled:opacity-20"
                style={{ background: 'rgba(0,238,255,0.04)', color: '#00eeff' }}>
                NEXT MODULE ▶
              </button>
            </div>
          </main>
        </div>

        {/* ══════════ FOOTER ══════════ */}
        <footer className="border-t mt-6 py-5 text-center" style={{ borderColor: 'rgba(0,238,255,0.08)', background: 'rgba(0,0,0,0.5)' }}>
          <p className="orbit font-bold text-xs tracking-widest" style={{ color: '#ff3355', textShadow: '0 0 6px rgba(255,51,85,0.35)' }}>
            ⚠ FOR AUTHORIZED SECURITY TESTING ONLY ⚠
          </p>
          <p className="mono mt-1 opacity-20" style={{ fontSize: 10 }}>
           Always obtain proper authorization before testing systems
          </p>
        </footer>

      </div>
    </>
  );
}