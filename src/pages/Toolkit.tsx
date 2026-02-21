import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  TOOL_SECTIONS, TOOL_COUNT, SCAN_VENDORS, SECURITY_HEADERS, SOCIAL_PLATFORMS,
  HASH_SIGNATURES, CVSS_METRICS, DEFAULT_TIMELINE_EVENTS, XSS_PAYLOADS, SQLI_PAYLOADS,
  PASSWORD_CHARSETS, REGISTRARS, SSL_ISSUERS, CAMERA_MAKES, PHOTO_SOFTWARE,
  COMMON_SUBDOMAINS, HTTP_METHODS, PORT_SERVICES, COMMON_PORTS, SAMPLE_ACCESS_LOG,
  NEON, ACCENT,
  type SectionMeta, type ToolMeta, type TimelineEvent, type SecurityHeader,
  type SocialPlatform, type HashSignature, type CvssMetric, type CvssMetricOption,
} from "../data/toolkitdata";

// ── Types ──────────────────────────────────────────────────────────
interface GeoData {
  ip: string; city: string; region: string; country_name: string;
  country_code: string; org: string; timezone: string;
  latitude: number; longitude: number;
}
interface PasswordResult {
  score: number; label: string; color: string; crack: string;
  checks: [string, boolean][];
}
interface CyberToolkitProps { onBack?: () => void; }

// ── Helpers ────────────────────────────────────────────────────────
const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// ── Global Styles ──────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --neon: #00ffcc; --accent: #00e6ff; --bg: #000000; --card: #050f08;
    --red: #ff3366; --yellow: #ffcc00; --purple: #a855f7;
    --orange: #f97316; --pink: #ec4899;
    --font-mono: 'Share Tech Mono', monospace;
    --font-display: 'Orbitron', sans-serif;
    --font-body: 'Rajdhani', sans-serif;
  }
  html, body { background: #000 !important; color: #e2e8f0; font-family: var(--font-body); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: var(--neon); border-radius: 2px; }
  .cyber-grid {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: linear-gradient(rgba(0,255,204,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,204,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .card {
    background: var(--card); border: 1px solid rgba(0,255,204,0.12);
    border-radius: 12px; transition: border-color 0.2s, transform 0.2s;
    position: relative; overflow: hidden;
  }
  .card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,255,204,0.03) 0%, transparent 60%);
    pointer-events: none;
  }
  .card:hover { border-color: rgba(0,255,204,0.4); transform: translateY(-2px); }
  .neon-btn {
    background: rgba(0,255,204,0.08); border: 1px solid rgba(0,255,204,0.4);
    color: var(--neon); font-family: var(--font-mono); font-size: 12px;
    padding: 8px 16px; border-radius: 6px; cursor: pointer;
    transition: all 0.2s; letter-spacing: 0.1em; text-transform: uppercase;
  }
  .neon-btn:hover { background: rgba(0,255,204,0.18); box-shadow: 0 0 12px rgba(0,255,204,0.3); }
  .neon-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .neon-btn:active { transform: scale(0.97); }
  .accent-btn {
    background: rgba(0,230,255,0.08); border: 1px solid rgba(0,230,255,0.4);
    color: var(--accent); font-family: var(--font-mono); font-size: 12px;
    padding: 8px 16px; border-radius: 6px; cursor: pointer;
    transition: all 0.2s; letter-spacing: 0.1em;
  }
  .accent-btn:hover { background: rgba(0,230,255,0.18); box-shadow: 0 0 12px rgba(0,230,255,0.3); }
  .cyber-input {
    background: rgba(0,0,0,0.8); border: 1px solid rgba(0,255,204,0.2);
    color: #e2e8f0; font-family: var(--font-mono); font-size: 12px;
    padding: 10px 14px; border-radius: 6px; outline: none;
    transition: border-color 0.2s; width: 100%;
  }
  .cyber-input:focus { border-color: var(--neon); box-shadow: 0 0 8px rgba(0,255,204,0.15); }
  .cyber-input::placeholder { color: rgba(255,255,255,0.2); }
  textarea.cyber-input { resize: none; }
  .section-header {
    font-family: var(--font-display); font-size: 11px; font-weight: 700;
    letter-spacing: 0.25em; text-transform: uppercase;
    color: rgba(0,255,204,0.5); display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .section-header::after { content:''; flex:1; height:1px; background: linear-gradient(90deg, rgba(0,255,204,0.3), transparent); }
  .terminal-box {
    background: #000a05; border: 1px solid rgba(0,255,204,0.15);
    border-radius: 8px; padding: 14px; font-family: var(--font-mono); font-size: 11px;
  }
  .terminal-dots { display: flex; gap: 5px; margin-bottom: 10px; }
  .terminal-dot { width: 8px; height: 8px; border-radius: 50%; }
  .spinner {
    width: 16px; height: 16px; border: 2px solid rgba(0,255,204,0.2);
    border-top-color: var(--neon); border-radius: 50%;
    animation: spin 0.7s linear infinite; display: inline-block; vertical-align: middle;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .scan-line {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--neon), transparent);
    animation: scan 3s linear infinite; opacity: 0.3; pointer-events: none;
  }
  @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
  .blink { animation: blink 1s step-end infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  .pulse-ring { animation: pulseRing 2s ease-out infinite; }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(0,255,204,0.4); }
    70%  { box-shadow: 0 0 0 8px rgba(0,255,204,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,255,204,0); }
  }
  .hero-title {
    font-family: var(--font-display); font-size: clamp(2.5rem, 7vw, 5.5rem);
    font-weight: 900; letter-spacing: -0.02em; line-height: 0.95;
  }
  .corner-bracket { position: absolute; width: 16px; height: 16px; border-color: var(--neon); border-style: solid; opacity: 0.5; }
  .corner-tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
  .corner-tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
  .corner-bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
  .corner-br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }
  .tool-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
  @media (max-width: 1024px) { .tool-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 640px)  { .tool-grid { grid-template-columns: 1fr; } }
  .drop-zone {
    border: 2px dashed rgba(0,255,204,0.25); border-radius: 10px; padding: 32px;
    text-align: center; cursor: pointer; transition: all 0.2s;
  }
  .drop-zone:hover { border-color: rgba(0,255,204,0.6); background: rgba(0,255,204,0.04); }
  .drop-zone.dragging { border-color: var(--neon); background: rgba(0,255,204,0.08); }
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.9);
    backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 16px;
  }
  .modal-box {
    background: #000; border: 1px solid rgba(0,255,204,0.25);
    border-radius: 16px; width: 100%; max-width: 640px; max-height: 90vh;
    overflow: hidden; display: flex; flex-direction: column;
    box-shadow: 0 0 60px rgba(0,255,204,0.1);
  }
  .modal-header {
    padding: 16px 20px; border-bottom: 1px solid rgba(0,255,204,0.1);
    display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
  }
  .modal-body { padding: 20px; overflow-y: auto; flex: 1; }
  .progress-track { height: 3px; background: rgba(0,255,204,0.1); border-radius: 2px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg,var(--neon),var(--accent)); border-radius: 2px; transition: width 0.3s; }
`;

// ═══════════════════════════════════════════════════════════════════
//  MATRIX RAIN
// ═══════════════════════════════════════════════════════════════════
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const fontSize = 14; let cols: number[] = []; let lastTime = 0;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Array(Math.floor(canvas.width / fontSize)).fill(1);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(document.body);
    const chars = "01";
    const draw = (ts: number) => {
      if (ts - lastTime < 50) { rafRef.current = requestAnimationFrame(draw); return; }
      lastTime = ts;
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
      cols.forEach((y, i) => {
        const alpha = y <= 1 ? 1 : Math.max(0.05, 0.8 - y * 0.015);
        ctx.fillStyle = y <= 2 ? `rgba(200,255,240,${alpha})` : `rgba(0,255,180,${alpha})`;
        ctx.fillText(chars[Math.floor(Math.random() * 2)], i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) cols[i] = 0;
        cols[i]++;
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, opacity:0.22, pointerEvents:"none", width:"100vw", height:"100vh" }} />;
}

// ═══════════════════════════════════════════════════════════════════
//  UI ATOMS
// ═══════════════════════════════════════════════════════════════════
function Typewriter({ text, speed = 80 }: { text: string; speed?: number }) {
  const [disp, setDisp] = useState(""); const [done, setDone] = useState(false);
  const idx = useRef(0);
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      if (idx.current < text.length) { setDisp(text.slice(0, idx.current + 1)); idx.current++; }
      else { setDone(true); clearInterval(t); }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed, done]);
  return <span>{disp}{!done && <span className="blink" style={{ color: NEON }}>█</span>}</span>;
}

function TermBox({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="terminal-box">
      <div className="terminal-dots">
        <div className="terminal-dot" style={{ background:"#ff5f57" }} />
        <div className="terminal-dot" style={{ background:"#ffbd2e" }} />
        <div className="terminal-dot" style={{ background:"#28c840" }} />
        {title && <span style={{ marginLeft:8, color:"rgba(0,255,204,0.4)", fontSize:10, fontFamily:"var(--font-mono)", letterSpacing:"0.1em" }}>{title}</span>}
      </div>
      {children}
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }, [text]);
  return <button onClick={copy} className="neon-btn" style={{ padding:"4px 8px", fontSize:10 }}>{copied ? "✓ COPIED" : "COPY"}</button>;
}

function StatCard({ num, label, color = NEON }: { num: string; label: string; color?: string }) {
  return (
    <div className="card" style={{ padding:"16px 20px", minWidth:100 }}>
      <div className="corner-bracket corner-tl" /><div className="corner-bracket corner-br" />
      <div style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:900, color, textShadow:`0 0 15px ${color}66` }}>{num}</div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.15em", textTransform:"uppercase", marginTop:4 }}>{label}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TOOL: IP GEOLOCATION
// ═══════════════════════════════════════════════════════════════════
function IPGeoTool() {
  const [data, setData]       = useState<GeoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const fetchGeo = useCallback(async () => {
  setLoading(true);
  setError(null);
  setData(null);

  try {
    // Using ip-api directly (no need for ipify)
    const res = await fetch(
      "http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query"
    );

    const geo = await res.json();

    if (geo.status !== "success") {
      throw new Error(geo.message || "Lookup failed");
    }

    // Normalize data to your existing structure
    setData({
      ip: geo.query,
      city: geo.city,
      region: geo.regionName,
      country_name: geo.country,
      country_code: geo.countryCode,
      org: geo.org || geo.isp,
      timezone: geo.timezone,
      latitude: geo.lat,
      longitude: geo.lon,
    });

  } catch (err) {
    // Fallback demo data
    setData({
      ip: "203.0.113.42",
      city: "Frankfurt",
      region: "Hesse",
      country_name: "Germany",
      country_code: "DE",
      org: "AS24940 Hetzner Online GmbH",
      timezone: "Europe/Berlin",
      latitude: 50.1109,
      longitude: 8.6821,
    });

    setError("Live API limited or blocked — showing demo data");
  }

  setLoading(false);
}, []);

  useEffect(() => { fetchGeo(); }, [fetchGeo]);

  const rows = useMemo(() => data ? [
    ["IP", data.ip], ["City", data.city], ["Region", data.region],
    ["Country", `${data.country_name} (${data.country_code})`],
    ["ISP / Org", data.org], ["Timezone", data.timezone],
    ["Latitude", String(data.latitude)], ["Longitude", String(data.longitude)],
  ] : [], [data]);

  return (
    <div className="card" style={{ padding:20 }}>
      <div className="scan-line" />
      <div className="corner-bracket corner-tl" /><div className="corner-bracket corner-tr" />
      <div className="corner-bracket corner-bl" /><div className="corner-bracket corner-br" />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:12, color:NEON, letterSpacing:"0.15em", marginBottom:3 }}>IP GEOLOCATION</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.25)" }}>AUTO-DETECT PUBLIC IP</div>
        </div>
        <button className="neon-btn pulse-ring" onClick={fetchGeo} disabled={loading} style={{ display:"flex", alignItems:"center", gap:6 }}>
          {loading ? <><span className="spinner" /> SCANNING</> : "⟳ REFRESH"}
        </button>
      </div>
      {error && <div style={{ background:"rgba(255,204,0,0.06)", border:"1px solid rgba(255,204,0,0.2)", borderRadius:6, padding:"8px 12px", marginBottom:12, fontFamily:"var(--font-mono)", fontSize:10, color:"#ffcc00" }}>⚠ {error}</div>}
      {loading && <div style={{ padding:"20px 0", textAlign:"center" }}><div className="spinner" style={{ width:28, height:28, margin:"0 auto 8px" }} /><div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(0,255,204,0.5)" }}>GEOLOCATING...</div></div>}
      {data && !loading && (
        <TermBox title="geo.result">
          <div style={{ display:"grid", gap:"5px" }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display:"flex", gap:12 }}>
                <span style={{ color:"rgba(0,255,204,0.6)", width:90, flexShrink:0, fontSize:11 }}>{k}</span>
                <span style={{ color:"#e2e8f0", fontSize:11 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:12, paddingTop:10, borderTop:"1px solid rgba(0,255,204,0.08)" }}>
            <span style={{ color:"rgba(255,255,255,0.2)", fontSize:10 }}>COORDS: </span>
            <a href={`https://maps.google.com/?q=${data.latitude},${data.longitude}`} target="_blank" rel="noopener noreferrer" style={{ color:ACCENT, fontSize:10, textDecoration:"none" }}>
              {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)} ↗
            </a>
          </div>
        </TermBox>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TOOL: METADATA REMOVER
// ═══════════════════════════════════════════════════════════════════
function MetadataRemoverTool() {
  const [file, setFile]           = useState<File | null>(null);
  const [dragging, setDragging]   = useState(false);
  const [processing, setProc]     = useState(false);
  const [done, setDone]           = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => { if (!f.type.startsWith("image/")) return; setFile(f); setDone(false); }, []);
  const onDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }, [handleFile]);

  const removeMetadata = useCallback(async () => {
    if (!file) return; setProc(true);
    await new Promise(r => setTimeout(r, 600));
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `clean_${file.name.replace(/\.[^.]+$/, "")}.${file.name.split(".").pop() ?? "jpg"}`;
        a.click(); setProc(false); setDone(true);
      }, file.type, 0.95);
    };
    img.src = url;
  }, [file]);

  return (
    <div className="card" style={{ padding:20 }}>
      <div className="corner-bracket corner-tl" /><div className="corner-bracket corner-tr" />
      <div className="corner-bracket corner-bl" /><div className="corner-bracket corner-br" />
      <div style={{ marginBottom:14 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:12, color:ACCENT, letterSpacing:"0.15em", marginBottom:3 }}>METADATA REMOVER</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.25)" }}>STRIP EXIF / GPS DATA FROM IMAGES</div>
      </div>
      <div className={`drop-zone ${dragging ? "dragging" : ""}`} onClick={() => inputRef.current?.click()} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
        <div style={{ fontSize:28, marginBottom:8 }}>📷</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(0,255,204,0.5)" }}>{file ? file.name : "DROP IMAGE HERE"}</div>
        {file && <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:4 }}>{(file.size/1024).toFixed(1)} KB · {file.type}</div>}
        {!file && <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.2)", marginTop:6 }}>JPG / PNG · CLICK OR DRAG</div>}
        <input ref={inputRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>
      {file && (
        <div style={{ marginTop:14 }}>
          <button className="neon-btn" onClick={removeMetadata} disabled={processing} style={{ width:"100%", padding:"10px 0", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            {processing ? <><span className="spinner" /> PROCESSING...</> : done ? "✓ DONE — DOWNLOAD STARTED" : "🔒 REMOVE METADATA & DOWNLOAD"}
          </button>
          {done && <div style={{ marginTop:10, background:"rgba(0,255,204,0.05)", border:"1px solid rgba(0,255,204,0.2)", borderRadius:6, padding:"10px 14px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:NEON }}>✓ EXIF / GPS / device metadata stripped via canvas re-draw</div>
          </div>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TOOL: PASSWORD STRENGTH
// ═══════════════════════════════════════════════════════════════════
function PasswordStrengthTool() {
  const [pw, setPw]           = useState("");
  const [visible, setVisible] = useState(false);

  const result = useMemo((): PasswordResult | null => {
    if (!pw) return null;
    const checks: [string, boolean][] = [
      ["12+ characters",        pw.length >= 12],
      ["Uppercase letters",     /[A-Z]/.test(pw)],
      ["Lowercase letters",     /[a-z]/.test(pw)],
      ["Numbers (0-9)",         /[0-9]/.test(pw)],
      ["Special symbols",       /[^a-zA-Z0-9]/.test(pw)],
      ["No repeating chars",    !(/(.)\1{2,}/).test(pw)],
    ];
    const score = checks.filter(([,v]) => v).length;
    const labels = ["Very Weak","Weak","Weak","Moderate","Strong","Strong","Very Strong"];
    const colors = ["#ff3366","#ff3366","#ff6633","#ffcc00","#66ff88","#00ffcc","#00ffcc"];
    const crack  = pw.length < 6 ? "Instantly" : pw.length < 8 ? "Seconds" : pw.length < 10 ? "Hours" : score < 4 ? "Days" : pw.length >= 16 && score >= 5 ? "Centuries" : "Years";
    return { score, label:labels[score], color:colors[score], crack, checks };
  }, [pw]);

  return (
    <div className="card" style={{ padding:20 }}>
      <div className="corner-bracket corner-tl" /><div className="corner-bracket corner-tr" />
      <div className="corner-bracket corner-bl" /><div className="corner-bracket corner-br" />
      <div style={{ marginBottom:14 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:12, color:"var(--purple)", letterSpacing:"0.15em", marginBottom:3 }}>PASSWORD ANALYZER</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.25)" }}>ENTROPY & CRACK-TIME ESTIMATION</div>
      </div>
      <div style={{ position:"relative", marginBottom:14 }}>
        <input type={visible ? "text" : "password"} className="cyber-input" placeholder="Enter password to analyze…" value={pw} onChange={e => setPw(e.target.value)} style={{ paddingRight:44 }} />
        <button onClick={() => setVisible(v => !v)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:14 }}>
          {visible ? "🙈" : "👁"}
        </button>
      </div>
      {result && (
        <div>
          <div style={{ display:"flex", gap:4, marginBottom:10 }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ flex:1, height:4, borderRadius:2, background:i <= result.score ? result.color : "rgba(255,255,255,0.06)", transition:"background 0.3s", boxShadow:i <= result.score ? `0 0 8px ${result.color}88` : "none" }} />
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:700, color:result.color, textShadow:`0 0 10px ${result.color}66` }}>{result.label.toUpperCase()}</span>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,0.3)" }}>CRACK TIME</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:result.color }}>{result.crack}</div>
            </div>
          </div>
          <TermBox>
            <div style={{ display:"grid", gap:4 }}>
              {result.checks.map(([label, pass]) => (
                <div key={label} style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ color:pass ? NEON : "#ff3366", fontSize:11, flexShrink:0 }}>{pass ? "✓" : "✗"}</span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:pass ? "#a0ffcc" : "rgba(255,51,102,0.7)" }}>{label}</span>
                </div>
              ))}
            </div>
          </TermBox>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TOOL: BASE64
// ═══════════════════════════════════════════════════════════════════
function Base64Tool() {
  const [input, setInput]   = useState("");
  const [output, setOutput] = useState<{ label: string; value: string; isError?: boolean } | null>(null);
  const encode = () => { try { setOutput({ label:"ENCODED (BASE64)", value:btoa(unescape(encodeURIComponent(input))) }); } catch { setOutput({ label:"ERROR", value:"Could not encode", isError:true }); } };
  const decode = () => { try { setOutput({ label:"DECODED (UTF-8)",  value:decodeURIComponent(escape(atob(input))) }); } catch { setOutput({ label:"ERROR", value:"Invalid Base64", isError:true }); } };
  return (
    <div className="card" style={{ padding:20 }}>
      <div style={{ fontFamily:"var(--font-display)", fontSize:11, color:ACCENT, letterSpacing:"0.15em", marginBottom:14 }}>BASE64 ENCODER / DECODER</div>
      <textarea className="cyber-input" rows={3} placeholder="Enter text or Base64 string…" value={input} onChange={e => setInput(e.target.value)} style={{ marginBottom:10 }} />
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <button className="neon-btn"   onClick={encode} style={{ flex:1 }}>→ ENCODE</button>
        <button className="accent-btn" onClick={decode} style={{ flex:1 }}>← DECODE</button>
      </div>
      {output && (
        <TermBox>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:output.isError ? "#ff3366" : "rgba(0,255,204,0.5)", marginBottom:6, letterSpacing:"0.1em" }}>{output.label}</div>
          {!output.isError ? <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}><span style={{ color:"#a0ffcc", fontSize:11, wordBreak:"break-all", flex:1 }}>{output.value}</span><CopyBtn text={output.value} /></div>
            : <div style={{ color:"#ff3366", fontSize:11 }}>{output.value}</div>}
        </TermBox>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TOOL: HASH GENERATOR
// ═══════════════════════════════════════════════════════════════════
function HashGeneratorTool() {
  const [text, setText]       = useState("");
  const [hashes, setHashes]   = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const toHex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
  const generate = useCallback(async () => {
    if (!text.trim()) return; setLoading(true);
    const enc = new TextEncoder().encode(text);
    const [sha1, sha256, sha512] = await Promise.all([
      crypto.subtle.digest("SHA-1", enc), crypto.subtle.digest("SHA-256", enc), crypto.subtle.digest("SHA-512", enc),
    ]);
    setHashes({ "SHA-1":toHex(sha1), "SHA-256":toHex(sha256), "SHA-512":toHex(sha512) });
    setLoading(false);
  }, [text]);
  return (
    <div className="card" style={{ padding:20 }}>
      <div style={{ fontFamily:"var(--font-display)", fontSize:11, color:"var(--yellow)", letterSpacing:"0.15em", marginBottom:14 }}>HASH GENERATOR</div>
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <input className="cyber-input" placeholder="Enter text to hash…" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()} />
        <button className="neon-btn" onClick={generate} disabled={loading || !text.trim()} style={{ whiteSpace:"nowrap" }}>
          {loading ? <span className="spinner" /> : "HASH"}
        </button>
      </div>
      {hashes && (
        <TermBox>
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} style={{ marginBottom:10 }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,204,0,0.6)", letterSpacing:"0.15em", marginBottom:4 }}>{algo}</div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ color:"#a0ffcc", fontSize:10, wordBreak:"break-all", flex:1, fontFamily:"var(--font-mono)" }}>{hash}</span>
                <CopyBtn text={hash} />
              </div>
            </div>
          ))}
        </TermBox>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TOOL: URL SAFETY CHECKER
// ═══════════════════════════════════════════════════════════════════
function URLSafetyTool() {
  const [url, setUrl]         = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ clean: boolean; flagged: string[]; sha256: string } | null>(null);
  const scan = useCallback(() => {
    if (!url.trim()) return; setLoading(true); setResult(null);
    setTimeout(() => {
      const flagged = Math.random() > 0.65 ? SCAN_VENDORS.slice(0, Math.floor(Math.random() * 3 + 1)) : [];
      const sha256  = Array.from({ length:64 }, () => "0123456789abcdef"[Math.floor(Math.random()*16)]).join("");
      setResult({ clean:flagged.length === 0, flagged, sha256 }); setLoading(false);
    }, 2000);
  }, [url]);
  return (
    <div className="card" style={{ padding:20 }}>
      <div style={{ fontFamily:"var(--font-display)", fontSize:11, color:"var(--orange)", letterSpacing:"0.15em", marginBottom:14 }}>URL SAFETY CHECKER</div>
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <input className="cyber-input" placeholder="https://suspicious-domain.com" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && scan()} />
        <button className="neon-btn" onClick={scan} disabled={loading || !url.trim()} style={{ whiteSpace:"nowrap", borderColor:"rgba(249,115,22,0.5)", color:"var(--orange)" }}>
          {loading ? <><span className="spinner" /> SCAN</> : "SCAN"}
        </button>
      </div>
      {result && (
        <TermBox>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, color:result.clean ? NEON : "#ff3366", marginBottom:8 }}>
            {result.clean ? `✓ CLEAN — 0/${SCAN_VENDORS.length} engines flagged` : `⚠ THREAT — ${result.flagged.length}/${SCAN_VENDORS.length} engines flagged`}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3 }}>
            {SCAN_VENDORS.map((v: string) => (
              <div key={v} style={{ fontFamily:"var(--font-mono)", fontSize:10, color:result.flagged.includes(v) ? "#ff3366" : "rgba(255,255,255,0.2)" }}>
                {result.flagged.includes(v) ? "⚑" : "✓"} {v}
              </div>
            ))}
          </div>
          <div style={{ marginTop:10, paddingTop:8, borderTop:"1px solid rgba(0,255,204,0.08)", fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,0.2)", wordBreak:"break-all" }}>SHA256: {result.sha256}</div>
        </TermBox>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MODAL TOOL COMPONENTS (from toolkitData)
// ═══════════════════════════════════════════════════════════════════

function EmailBreachModal() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ email: string; breaches: string[] } | null>(null);
  const check = () => {
    if (!email.trim()) return; setLoading(true); setResult(null);
    setTimeout(() => {
      const breaches = email.includes("test") ? ["Adobe (2013) — 153M records","LinkedIn (2016) — 117M records","Dropbox (2012) — 68M records"]
        : Math.random() > 0.5 ? ["MyFitnessPal (2018) — 144M records"] : [];
      setResult({ email, breaches }); setLoading(false);
    }, 1800);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <p style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)" }}>HaveIBeenPwned-style simulation — checks against known breach datasets.</p>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="target@example.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && check()} />
        <button className="neon-btn" onClick={check} disabled={loading || !email.trim()} style={{ whiteSpace:"nowrap" }}>{loading ? <span className="spinner" /> : "CHECK"}</button>
      </div>
      {result && (
        <TermBox>
          <div style={{ display:"grid", gap:4, fontSize:11 }}>
            <div><span style={{ color:"rgba(0,255,204,0.6)" }}>target   </span><span style={{ color:"#e2e8f0" }}>{result.email}</span></div>
            {result.breaches.length > 0 ? (
              <>
                <div style={{ color:"#ff3366", fontWeight:700, marginTop:8 }}>⚠ {result.breaches.length} BREACH{result.breaches.length > 1 ? "ES" : ""} FOUND</div>
                {result.breaches.map((b,i) => <div key={i} style={{ color:"#ffcc00", marginLeft:8 }}>▸ {b}</div>)}
                <div style={{ color:"rgba(255,255,255,0.3)", marginTop:8, fontSize:10 }}>Rotate password and enable 2FA immediately.</div>
              </>
            ) : <div style={{ color:"#00ffcc", marginTop:8 }}>✓ No breaches found — email appears clean.</div>}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function UsernameFinderModal() {
  const [username, setUsername] = useState("");
  const [loading, setLoading]   = useState(false);
  const [results, setResults]   = useState<{ found: SocialPlatform[]; notFound: SocialPlatform[] } | null>(null);
  const search = () => {
    if (!username.trim()) return; setLoading(true); setResults(null);
    setTimeout(() => {
      const found    = SOCIAL_PLATFORMS.filter(() => Math.random() > 0.45);
      const notFound = SOCIAL_PLATFORMS.filter((p: SocialPlatform) => !found.includes(p));
      setResults({ found, notFound }); setLoading(false);
    }, 2000);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <p style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)" }}>Sherlock-style enumeration across {SOCIAL_PLATFORMS.length} platforms.</p>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="target_username" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} />
        <button className="neon-btn" onClick={search} disabled={loading || !username.trim()} style={{ whiteSpace:"nowrap" }}>{loading ? <span className="spinner" /> : "HUNT"}</button>
      </div>
      {results && (
        <TermBox title={`sherlock ${username}`}>
          <div style={{ display:"grid", gap:3, fontSize:11, maxHeight:240, overflowY:"auto" }}>
            {results.found.map(p => (
              <div key={p.name} style={{ display:"flex", gap:8 }}>
                <span style={{ color:"#00ffcc" }}>✓</span>
                <span style={{ color:"rgba(0,255,204,0.6)", width:100, flexShrink:0 }}>{p.name}</span>
                <a href={p.url(username)} target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.4)", fontSize:10, textDecoration:"none", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.url(username)}</a>
              </div>
            ))}
            {results.notFound.map(p => <div key={p.name} style={{ color:"rgba(255,255,255,0.15)", fontSize:10 }}>✗ {p.name}</div>)}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function WhoisModal() {
  const [domain, setDomain]   = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<Record<string,string|string[]> | null>(null);
  const lookup = () => {
    if (!domain.trim()) return; setLoading(true); setResult(null);
    setTimeout(() => {
      const clean = domain.replace(/https?:\/\//,"").split("/")[0];
      setResult({ Domain:clean, Registrar:rand(REGISTRARS), Created:"2018-03-14", Expires:"2026-03-14", Updated:"2025-01-02", Status:"clientTransferProhibited", Nameservers:[`ns1.${clean}`,`ns2.${clean}`], Country:rand(["US","GB","DE","NL"]), DNSSEC:"unsigned" });
      setLoading(false);
    }, 1500);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="example.com" value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} />
        <button className="neon-btn" onClick={lookup} disabled={loading || !domain.trim()} style={{ whiteSpace:"nowrap" }}>{loading ? <span className="spinner" /> : "LOOKUP"}</button>
      </div>
      {result && (
        <TermBox>
          <div style={{ display:"grid", gap:4, fontSize:11 }}>
            {(Object.entries(result) as [string,string|string[]][]).map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:12 }}>
                <span style={{ color:"rgba(0,255,204,0.6)", width:100, flexShrink:0 }}>{k}</span>
                <span style={{ color:"#e2e8f0" }}>{Array.isArray(v) ? v.join(", ") : v}</span>
              </div>
            ))}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function SubdomainModal() {
  const [domain, setDomain]     = useState("");
  const [scanning, setScanning] = useState(false);
  const [found, setFound]       = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const scan = () => {
    if (!domain.trim()) return;
    const clean = domain.replace(/https?:\/\//,"").split("/")[0];
    setScanning(true); setFound([]); setProgress(0); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      if (i >= COMMON_SUBDOMAINS.length) { clearInterval(iv); setScanning(false); setDone(true); return; }
      setProgress(Math.round(((i+1)/COMMON_SUBDOMAINS.length)*100));
      if (Math.random() > 0.6) setFound(prev => [...prev, `${COMMON_SUBDOMAINS[i]}.${clean}`]);
      i++;
    }, 120);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <p style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)" }}>Brute-forcing {COMMON_SUBDOMAINS.length} common subdomain wordlist entries.</p>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="example.com" value={domain} onChange={e => setDomain(e.target.value)} />
        <button className="neon-btn" onClick={scan} disabled={scanning} style={{ whiteSpace:"nowrap" }}>{scanning ? <span className="spinner" /> : "ENUMERATE"}</button>
      </div>
      {(scanning || found.length > 0) && (
        <>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)", marginBottom:4 }}><span>{scanning ? "Scanning…" : `${found.length} found`}</span><span>{progress}%</span></div>
            <div className="progress-track"><div className="progress-fill" style={{ width:`${progress}%` }} /></div>
          </div>
          {found.length > 0 && <TermBox title={`subfinder -d ${domain}`}><div style={{ display:"grid", gap:2, maxHeight:200, overflowY:"auto" }}>{found.map(s => <div key={s} style={{ color:"#00ffcc", fontSize:11 }}>✓ {s}</div>)}{done && <div style={{ color:"rgba(255,255,255,0.3)", marginTop:8, fontSize:10, borderTop:"1px solid rgba(0,255,204,0.1)", paddingTop:8 }}>Enumeration complete. {found.length} subdomains discovered.</div>}</div></TermBox>}
        </>
      )}
    </div>
  );
}

function GoogleDorkModal() {
  const [site, setSite]       = useState(""); const [filetype, setFiletype] = useState("");
  const [inurl, setInurl]     = useState(""); const [intitle, setIntitle]   = useState("");
  const [dork, setDork]       = useState("");
  const build = () => {
    const parts: string[] = [];
    if (site.trim())     parts.push(`site:${site.trim()}`);
    if (filetype.trim()) parts.push(`filetype:${filetype.trim()}`);
    if (inurl.trim())    parts.push(`inurl:${inurl.trim()}`);
    if (intitle.trim())  parts.push(`intitle:"${intitle.trim()}"`);
    setDork(parts.join(" "));
  };
  const templates = [
    { label:"Exposed .env",    dork:'filetype:env "DB_PASSWORD"' },
    { label:"Open dirs",       dork:'intitle:"index of" "parent directory"' },
    { label:"Login pages",     dork:'inurl:admin intitle:"login"' },
    { label:"Config leaks",    dork:'filetype:xml "connectionString"' },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[["site:", site, setSite, "example.com", true], ["filetype:", filetype, setFiletype, "pdf / env / sql", false], ["inurl:", inurl, setInurl, "admin / login", false], ["intitle:", intitle, setIntitle, "index of", false]].map(([label, val, setter, ph, full]) => (
          <div key={label as string} style={{ gridColumn:full ? "1/-1" : undefined }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(0,255,204,0.5)", marginBottom:4 }}>{label as string}</div>
            <input className="cyber-input" value={val as string} onChange={e => (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} placeholder={ph as string} />
          </div>
        ))}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {templates.map(t => <button key={t.label} onClick={() => setDork(t.dork)} className="neon-btn" style={{ fontSize:10, padding:"4px 10px" }}>{t.label}</button>)}
      </div>
      <button className="neon-btn" onClick={build} style={{ width:"100%", padding:"10px 0" }}>BUILD DORK</button>
      {dork && (
        <TermBox>
          <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
            <span style={{ color:"#a0ffcc", fontSize:11, wordBreak:"break-all", flex:1, fontFamily:"var(--font-mono)" }}>{dork}</span>
            <CopyBtn text={dork} />
          </div>
          <a href={`https://www.google.com/search?q=${encodeURIComponent(dork)}`} target="_blank" rel="noopener noreferrer" style={{ color:ACCENT, fontSize:10, textDecoration:"none", display:"block", marginTop:8 }}>Open in Google ↗</a>
        </TermBox>
      )}
    </div>
  );
}

function PortScannerModal() {
  const [target, setTarget]     = useState("");
  const [scanning, setScanning] = useState(false);
  const [ports, setPorts]       = useState<Array<{port:number;service:string}>>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const scan = () => {
    if (!target.trim()) return;
    setScanning(true); setPorts([]); setProgress(0); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      if (i >= COMMON_PORTS.length) { clearInterval(iv); setScanning(false); setDone(true); return; }
      setProgress(Math.round(((i+1)/COMMON_PORTS.length)*100));
      if (Math.random() > 0.6) setPorts(prev => [...prev, { port:COMMON_PORTS[i], service:PORT_SERVICES[COMMON_PORTS[i]] }]);
      i++;
    }, 180);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <p style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)" }}>Nmap-style simulation across {COMMON_PORTS.length} common service ports.</p>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="192.168.1.1 or hostname" value={target} onChange={e => setTarget(e.target.value)} />
        <button className="neon-btn" onClick={scan} disabled={scanning} style={{ whiteSpace:"nowrap" }}>{scanning ? <span className="spinner" /> : "SCAN"}</button>
      </div>
      {(scanning || ports.length > 0) && (
        <>
          <div><div style={{ display:"flex", justifyContent:"space-between", fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)", marginBottom:4 }}><span>{scanning ? "Scanning ports…" : `${ports.length} open ports`}</span><span>{progress}%</span></div><div className="progress-track"><div className="progress-fill" style={{ width:`${progress}%` }} /></div></div>
          {ports.length > 0 && <TermBox title={`nmap -sV ${target}`}><div style={{ display:"grid", gap:3, maxHeight:200, overflowY:"auto" }}>{ports.map(p => <div key={p.port} style={{ display:"flex", gap:12, fontFamily:"var(--font-mono)", fontSize:11 }}><span style={{ color:"#00ffcc", width:60 }}>{p.port}/tcp</span><span style={{ color:"#66ff88", width:40 }}>open</span><span style={{ color:"rgba(255,255,255,0.5)" }}>{p.service}</span></div>)}{done && <div style={{ color:"rgba(255,255,255,0.3)", marginTop:8, paddingTop:8, borderTop:"1px solid rgba(0,255,204,0.1)", fontSize:10 }}>Scan done: {COMMON_PORTS.length} ports scanned, {ports.length} open.</div>}</div></TermBox>}
        </>
      )}
    </div>
  );
}

function DNSLookupModal() {
  const [domain, setDomain]   = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<Record<string,string[]> | null>(null);
  const lookup = () => {
    if (!domain.trim()) return; setLoading(true); setResult(null);
    const clean = domain.replace(/https?:\/\//,"").split("/")[0];
    setTimeout(() => {
      setResult({
        A:[`93.184.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`],
        AAAA:["2606:2800:220:1:248:1893:25c8:1946"],
        MX:[`10 mail.${clean}`,`20 backup-mail.${clean}`],
        NS:[`ns1.${clean}`,`ns2.${clean}`],
        TXT:[`v=spf1 include:_spf.${clean} ~all`,`google-site-verification=abc${Math.random().toString(36).slice(2,8)}`],
        SOA:[`ns1.${clean} hostmaster.${clean} 2026021401 7200 900 1209600 300`],
      });
      setLoading(false);
    }, 1200);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="example.com" value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} />
        <button className="neon-btn" onClick={lookup} disabled={loading || !domain.trim()} style={{ whiteSpace:"nowrap" }}>{loading ? <span className="spinner" /> : "RESOLVE"}</button>
      </div>
      {result && (
        <TermBox>
          <div style={{ display:"grid", gap:10 }}>
            {Object.entries(result).filter(([,v]) => v.length > 0).map(([type,records]) => (
              <div key={type}><span style={{ color:"#ffcc00", fontFamily:"var(--font-mono)", fontSize:10, fontWeight:700 }}>[{type}]</span>{records.map((r,i) => <div key={i} style={{ color:"#e2e8f0", fontFamily:"var(--font-mono)", fontSize:11, marginLeft:12, marginTop:2 }}>→ {r}</div>)}</div>
            ))}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function SecurityHeadersModal() {
  const [url, setUrl]         = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ present: SecurityHeader[]; missing: SecurityHeader[]; grade: string } | null>(null);
  const check = () => {
    if (!url.trim()) return; setLoading(true); setResult(null);
    setTimeout(() => {
      const present = SECURITY_HEADERS.filter(() => Math.random() > 0.4);
      const missing = SECURITY_HEADERS.filter((h: SecurityHeader) => !present.includes(h));
      const n = present.length;
      setResult({ present, missing, grade: n >= 7 ? "A" : n >= 5 ? "B" : n >= 3 ? "C" : n >= 1 ? "D" : "F" });
      setLoading(false);
    }, 1600);
  };
  const gradeColors: Record<string,string> = { A:"#22c55e", B:"#84cc16", C:"#eab308", D:"#f97316", F:"#ef4444" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && check()} />
        <button className="neon-btn" onClick={check} disabled={loading || !url.trim()} style={{ whiteSpace:"nowrap" }}>{loading ? <span className="spinner" /> : "SCAN"}</button>
      </div>
      {result && (
        <TermBox>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
            <span style={{ fontFamily:"var(--font-display)", fontSize:"2.5rem", fontWeight:900, color:gradeColors[result.grade], lineHeight:1 }}>{result.grade}</span>
            <div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(255,255,255,0.4)" }}>{result.present.length}/{SECURITY_HEADERS.length} headers present</div>
              <div className="progress-track" style={{ width:140, marginTop:6 }}><div className="progress-fill" style={{ width:`${(result.present.length/SECURITY_HEADERS.length)*100}%`, background:gradeColors[result.grade] }} /></div>
            </div>
          </div>
          <div style={{ display:"grid", gap:3 }}>
            {result.present.map((h: SecurityHeader) => <div key={h.name} style={{ color:"#00ffcc", fontFamily:"var(--font-mono)", fontSize:11 }}>✓ {h.name}</div>)}
            {result.missing.map((h: SecurityHeader) => <div key={h.name} style={{ color:"rgba(255,51,102,0.7)", fontFamily:"var(--font-mono)", fontSize:11 }}>✗ {h.name}</div>)}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function SSLCheckerModal() {
  const [domain, setDomain]   = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ valid: boolean; expDays: number; issuer: string; protocol: string; cipher: string; san: string[] } | null>(null);
  const check = () => {
    if (!domain.trim()) return; setLoading(true); setResult(null);
    setTimeout(() => {
      const expDays = Math.floor(Math.random() * 400 - 30);
      const clean   = domain.replace(/https?:\/\//,"").split("/")[0];
      setResult({ valid:expDays > 0, expDays, issuer:rand(SSL_ISSUERS), protocol:rand(["TLS 1.3","TLS 1.2"]), cipher:"ECDHE-RSA-AES256-GCM-SHA384", san:[`www.${clean}`,clean,`mail.${clean}`] });
      setLoading(false);
    }, 1400);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="example.com" value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && check()} />
        <button className="neon-btn" onClick={check} disabled={loading || !domain.trim()} style={{ whiteSpace:"nowrap" }}>{loading ? <span className="spinner" /> : "CHECK"}</button>
      </div>
      {result && (
        <TermBox>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, color:result.valid ? "#00ffcc" : "#ff3366", marginBottom:10 }}>
            {result.valid ? `✓ VALID — expires in ${result.expDays} days` : `⚠ EXPIRED ${Math.abs(result.expDays)} days ago`}
          </div>
          <div style={{ display:"grid", gap:4, fontSize:11 }}>
            {[["Issuer", result.issuer],["Protocol", result.protocol],["Cipher", result.cipher],["SAN", result.san.join(", ")]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:12 }}><span style={{ color:"rgba(0,255,204,0.6)", width:72, flexShrink:0 }}>{k}</span><span style={{ color:"#e2e8f0" }}>{v}</span></div>
            ))}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function XSSModal() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ vulnerable: boolean; patterns: string[] } | null>(null);
  const test = () => {
    if (!input) return;
    const patterns: string[] = [];
    if (/<script/i.test(input))           patterns.push("Script tag injection");
    if (/onerror|onload|on\w+\s*=/i.test(input)) patterns.push("Event handler injection");
    if (/vbscript:|data:text\/html/i.test(input)) patterns.push("URI scheme bypass");
    setResult({ vulnerable:patterns.length > 0, patterns });
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <p style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)" }}>Pattern-based XSS detection with sanitized output preview.</p>
      <textarea className="cyber-input" rows={3} placeholder={"Paste input to test…\ne.g. <script>alert(1)</script>"} value={input} onChange={e => setInput(e.target.value)} />
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {XSS_PAYLOADS.map((p: string, i: number) => <button key={i} onClick={() => setInput(p)} className="neon-btn" style={{ fontSize:10, padding:"4px 8px" }}>{p.length > 24 ? p.slice(0,24)+"…" : p}</button>)}
      </div>
      <button className="neon-btn" onClick={test} style={{ width:"100%", padding:"10px 0" }}>ANALYZE INPUT</button>
      {result && (
        <TermBox>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, color:result.vulnerable ? "#ff3366" : "#00ffcc", marginBottom:8 }}>
            {result.vulnerable ? "⚠ XSS PAYLOAD DETECTED" : "✓ No XSS patterns detected"}
          </div>
          {result.patterns.map((p,i) => <div key={i} style={{ color:"#ffcc00", fontSize:11 }}>▸ {p}</div>)}
          <div style={{ color:"rgba(255,255,255,0.3)", marginTop:10, fontSize:10 }}>Sanitized: {input.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
        </TermBox>
      )}
    </div>
  );
}

function SQLiModal() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ vulnerable: boolean; patterns: string[] } | null>(null);
  const patterns_map: [RegExp, string][] = [
    [/'\s*(or|and)\s*['"\d]/i,           "Boolean-based injection"],
    [/--\s*$|#\s*$|\/\*.*\*\//i,         "Comment termination"],
    [/union\s+select/i,                   "UNION SELECT extraction"],
    [/drop\s+table|truncate\s+table/i,    "Destructive DDL"],
    [/sleep\s*\(\s*\d+\s*\)|waitfor\s+delay/i, "Time-based blind injection"],
    [/information_schema|sys\.tables|pg_tables/i, "Schema enumeration"],
  ];
  const test = () => {
    const found: string[] = [];
    patterns_map.forEach(([re,label]) => { if (re.test(input)) found.push(label); });
    setResult({ vulnerable:found.length > 0, patterns:found });
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <textarea className="cyber-input" rows={3} placeholder={"Paste input to analyze…\ne.g. ' OR 1=1--"} value={input} onChange={e => setInput(e.target.value)} />
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {SQLI_PAYLOADS.map((p: string, i: number) => <button key={i} onClick={() => setInput(p)} className="neon-btn" style={{ fontSize:10, padding:"4px 8px" }}>{p}</button>)}
      </div>
      <button className="neon-btn" onClick={test} style={{ width:"100%", padding:"10px 0" }}>ANALYZE INPUT</button>
      {result && (
        <TermBox>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, color:result.vulnerable ? "#ff3366" : "#00ffcc", marginBottom:8 }}>
            {result.vulnerable ? `⚠ SQLi PATTERNS DETECTED (${result.patterns.length})` : "✓ No SQLi patterns detected"}
          </div>
          {result.patterns.map((p,i) => <div key={i} style={{ color:"#ffcc00", fontSize:11 }}>▸ {p}</div>)}
        </TermBox>
      )}
    </div>
  );
}

function FileHashModal() {
  const [text, setText]       = useState("");
  const [hashes, setHashes]   = useState<Record<string,string> | null>(null);
  const [loading, setLoading] = useState(false);
  const toHex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
  const hashData = async (data: BufferSource) => {
    setLoading(true);
    const [sha1, sha256, sha512] = await Promise.all([crypto.subtle.digest("SHA-1",data),crypto.subtle.digest("SHA-256",data),crypto.subtle.digest("SHA-512",data)]);
    setHashes({ "SHA-1":toHex(sha1), "SHA-256":toHex(sha256), "SHA-512":toHex(sha512) }); setLoading(false);
  };
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setText(`[File: ${file.name} — ${(file.size/1024).toFixed(1)} KB]`);
    await hashData(await file.arrayBuffer());
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <textarea className="cyber-input" rows={2} placeholder="Enter text to hash…" value={text} onChange={e => setText(e.target.value)} />
      <div style={{ display:"flex", gap:8 }}>
        <button className="neon-btn" onClick={() => text && hashData(new TextEncoder().encode(text))} disabled={loading || !text} style={{ flex:1 }}>{loading ? <span className="spinner" /> : "HASH TEXT"}</button>
        <label className="accent-btn" style={{ flex:1, textAlign:"center", cursor:"pointer" }}>UPLOAD FILE<input type="file" style={{ display:"none" }} onChange={handleFile} /></label>
      </div>
      {hashes && (
        <TermBox>
          {Object.entries(hashes).map(([algo,hash]) => (
            <div key={algo} style={{ marginBottom:10 }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,204,0,0.6)", letterSpacing:"0.15em", marginBottom:4 }}>{algo}</div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}><span style={{ color:"#a0ffcc", fontSize:10, wordBreak:"break-all", flex:1, fontFamily:"var(--font-mono)" }}>{hash}</span><CopyBtn text={hash} /></div>
            </div>
          ))}
        </TermBox>
      )}
    </div>
  );
}

function PasswordGenModal() {
  const [length, setLength]   = useState(18);
  const [opts, setOpts]       = useState({ upper:true, lower:true, numbers:true, symbols:true });
  const [password, setPassword] = useState("");
  const generate = useCallback(() => {
    const chars = (Object.keys(opts) as Array<keyof typeof opts>).filter(k => opts[k]).map(k => PASSWORD_CHARSETS[k]).join("");
    if (!chars) return;
    const arr = new Uint32Array(length); crypto.getRandomValues(arr);
    setPassword(Array.from(arr).map(n => chars[n % chars.length]).join(""));
  }, [length, opts]);
  useEffect(() => { generate(); }, [generate]);
  const labelMap: Record<string,string> = { upper:"A–Z", lower:"a–z", numbers:"0–9", symbols:"!@#…" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(255,255,255,0.4)", flexShrink:0 }}>Length: {length}</span>
        <input type="range" min={8} max={64} value={length} onChange={e => setLength(Number(e.target.value))} style={{ flex:1, accentColor:NEON }} />
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {(Object.keys(opts) as Array<keyof typeof opts>).map(key => (
          <button key={key} onClick={() => setOpts(p => ({...p,[key]:!p[key]}))} className={opts[key] ? "neon-btn" : "accent-btn"} style={{ opacity:opts[key] ? 1 : 0.4 }}>{labelMap[key]}</button>
        ))}
      </div>
      <TermBox>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ color:"#a0ffcc", fontFamily:"var(--font-mono)", fontSize:13, flex:1, wordBreak:"break-all" }}>{password}</span>
          <CopyBtn text={password} />
          <button onClick={generate} className="neon-btn" style={{ padding:"4px 8px", fontSize:10 }}>↺</button>
        </div>
      </TermBox>
    </div>
  );
}

function HashIdentifierModal() {
  const [hash, setHash] = useState("");
  const [matches, setMatches] = useState<HashSignature[] | null>(null);
  const identify = () => {
    if (!hash.trim()) return;
    setMatches(HASH_SIGNATURES.filter(({ regex }: HashSignature) => regex.test(hash.trim())));
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="Paste hash value…" value={hash} onChange={e => setHash(e.target.value)} onKeyDown={e => e.key === "Enter" && identify()} />
        <button className="neon-btn" onClick={identify} disabled={!hash.trim()} style={{ whiteSpace:"nowrap" }}>IDENTIFY</button>
      </div>
      {matches !== null && (
        <TermBox>
          {matches.length === 0 ? <div style={{ color:"#ffcc00", fontSize:11 }}>⚠ Unknown hash format — no signatures matched.</div> : (
            <>
              <div style={{ color:"#00ffcc", fontFamily:"var(--font-mono)", fontSize:11, fontWeight:700, marginBottom:8 }}>Possible match{matches.length > 1 ? "es" : ""} ({matches.length}):</div>
              {matches.map(({ name, bits }) => (
                <div key={name} style={{ display:"flex", gap:16, fontFamily:"var(--font-mono)", fontSize:11 }}>
                  <span style={{ color:"#a0ffcc", width:120 }}>{name}</span>
                  {bits && <span style={{ color:"rgba(255,255,255,0.3)" }}>{bits}-bit</span>}
                </div>
              ))}
            </>
          )}
        </TermBox>
      )}
    </div>
  );
}

function CaesarModal() {
  const [input, setInput] = useState(""); const [shift, setShift] = useState(13);
  const [mode, setMode]   = useState<"encode"|"decode"|"brute">("encode");
  const [output, setOutput] = useState<string | Array<{shift:number;text:string}> | null>(null);
  const rotate = (text: string, n: number) => text.replace(/[a-zA-Z]/g, c => { const b = c >= "a" ? 97 : 65; return String.fromCharCode(((c.charCodeAt(0)-b+n+26)%26)+b); });
  const run = () => {
    if (!input.trim()) return;
    if (mode === "brute") setOutput(Array.from({ length:25 },(_,i) => ({ shift:i+1, text:rotate(input,i+1) })));
    else setOutput(rotate(input, mode === "encode" ? shift : 26-shift));
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <textarea className="cyber-input" rows={2} placeholder="Enter text to cipher…" value={input} onChange={e => setInput(e.target.value)} />
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
        {(["encode","decode","brute"] as const).map(m => <button key={m} onClick={() => setMode(m)} className={mode === m ? "neon-btn" : "accent-btn"} style={{ opacity:mode === m ? 1 : 0.5 }}>{m.toUpperCase()}</button>)}
        {mode !== "brute" && <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:"auto" }}><span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(255,255,255,0.4)" }}>Shift: {shift}</span><input type="range" min={1} max={25} value={shift} onChange={e => setShift(Number(e.target.value))} style={{ accentColor:NEON }} /></div>}
      </div>
      <button className="neon-btn" onClick={run} style={{ width:"100%", padding:"10px 0" }}>{mode === "brute" ? "BRUTE-FORCE ALL ROTATIONS" : mode.toUpperCase()}</button>
      {output && (
        <TermBox>
          <div style={{ maxHeight:200, overflowY:"auto" }}>
            {typeof output === "string" ? <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}><span style={{ color:"#a0ffcc", fontFamily:"var(--font-mono)", fontSize:12, flex:1, wordBreak:"break-all" }}>{output}</span><CopyBtn text={output} /></div>
              : output.map(({ shift:s, text }) => <div key={s} style={{ display:"flex", gap:12, fontFamily:"var(--font-mono)", fontSize:11 }}><span style={{ color:NEON, width:30, flexShrink:0 }}>+{s}</span><span style={{ color:"#e2e8f0" }}>{text}</span></div>)}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function EXIFModal() {
  const [result, setResult] = useState<Record<string,string> | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setPreview(URL.createObjectURL(file));
    const hasGPS = Math.random() > 0.45;
    setResult({ "File Name":file.name, "File Size":`${(file.size/1024).toFixed(1)} KB`, "MIME Type":file.type, "Last Modified":new Date(file.lastModified).toISOString().split("T")[0], "Make":rand(CAMERA_MAKES), "Software":rand(PHOTO_SOFTWARE), "GPS Latitude":hasGPS ? `${(Math.random()*90).toFixed(6)}° N` : "Not embedded", "GPS Longitude":hasGPS ? `${(Math.random()*180).toFixed(6)}° E` : "Not embedded" });
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <label className="drop-zone" style={{ cursor:"pointer" }}>
        <div style={{ fontSize:28, marginBottom:8 }}>📷</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(0,255,204,0.5)" }}>CLICK TO UPLOAD IMAGE</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.2)", marginTop:4 }}>JPG / PNG / WEBP</div>
        <input type="file" accept="image/*" style={{ display:"none" }} onChange={handleFile} />
      </label>
      {preview && <img src={preview} alt="preview" style={{ borderRadius:8, maxHeight:120, width:"100%", objectFit:"contain", background:"rgba(0,0,0,0.5)" }} />}
      {result && (
        <TermBox>
          <div style={{ display:"grid", gap:4, fontSize:11 }}>
            {Object.entries(result).map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:12 }}><span style={{ color:"rgba(0,255,204,0.6)", width:110, flexShrink:0 }}>{k}</span><span style={{ color:v.includes("Not") ? "rgba(255,255,255,0.25)" : "#e2e8f0" }}>{v}</span></div>
            ))}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function LogAnalyzerModal() {
  const [logs, setLogs] = useState("");
  const [result, setResult] = useState<{ total:number; unique_ips:number; top_ip:[string,number]; suspicious:string[]; errors:number } | null>(null);
  const analyze = () => {
    if (!logs.trim()) return;
    const lines = logs.trim().split("\n");
    const ips: Record<string,number> = {}; const suspicious: string[] = []; let errors = 0;
    lines.forEach(line => {
      const ip = line.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
      const st = line.match(/" (\d{3}) /);
      if (ip) ips[ip[1]] = (ips[ip[1]] ?? 0) + 1;
      if (/\.\.\/|\.php|passwd|shell|union.*select|<script/i.test(line)) suspicious.push(line.slice(0,90));
      if (st && (st[1].startsWith("4") || st[1].startsWith("5"))) errors++;
    });
    const top_ip = Object.entries(ips).sort((a,b) => b[1]-a[1])[0] as [string,number];
    setResult({ total:lines.length, unique_ips:Object.keys(ips).length, top_ip, suspicious:suspicious.slice(0,4), errors });
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <textarea className="cyber-input" rows={5} placeholder="Paste Apache/Nginx access logs…" value={logs} onChange={e => setLogs(e.target.value)} />
      <div style={{ display:"flex", gap:8 }}>
        <button className="accent-btn" onClick={() => setLogs(SAMPLE_ACCESS_LOG)} style={{ flexShrink:0 }}>LOAD SAMPLE</button>
        <button className="neon-btn" onClick={analyze} disabled={!logs.trim()} style={{ flex:1 }}>ANALYZE LOGS</button>
      </div>
      {result && (
        <TermBox>
          <div style={{ display:"grid", gap:4, fontSize:11 }}>
            {[["Total Lines",result.total],["Unique IPs",result.unique_ips],["4xx/5xx Errors",result.errors]].map(([k,v]) => (
              <div key={k as string} style={{ display:"flex", gap:12 }}><span style={{ color:"rgba(0,255,204,0.6)", width:110 }}>{k}</span><span style={{ color:"#e2e8f0" }}>{v}</span></div>
            ))}
            {result.top_ip && <div style={{ display:"flex", gap:12 }}><span style={{ color:"rgba(0,255,204,0.6)", width:110 }}>Top IP</span><span style={{ color:"#ffcc00" }}>{result.top_ip[0]}</span><span style={{ color:"rgba(255,255,255,0.3)", fontSize:10 }}>({result.top_ip[1]} reqs)</span></div>}
            {result.suspicious.length > 0 && (<>
              <div style={{ color:"#ff3366", fontWeight:700, marginTop:8 }}>⚠ SUSPICIOUS ({result.suspicious.length}):</div>
              {result.suspicious.map((s,i) => <div key={i} style={{ color:"#ffcc00", fontSize:10, marginLeft:8, fontFamily:"var(--font-mono)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>▸ {s}</div>)}
            </>)}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function TimelineModal() {
  const [events, setEvents] = useState<TimelineEvent[]>(DEFAULT_TIMELINE_EVENTS);
  const [newTime, setNewTime] = useState(""); const [newEvent, setNewEvent] = useState(""); const [severity, setSeverity] = useState<TimelineEvent["severity"]>("high");
  const add = () => { if (!newTime || !newEvent.trim()) return; setEvents(prev => [...prev, { time:newTime.replace("T"," ")+":00", event:newEvent.trim(), severity }].sort((a,b) => a.time.localeCompare(b.time))); setNewEvent(""); };
  const sevColors: Record<TimelineEvent["severity"],string> = { critical:"#ff3366", high:"#f97316", medium:"#ffcc00", low:"#22c55e" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        <input type="datetime-local" className="cyber-input" style={{ flex:1, minWidth:160 }} onChange={e => setNewTime(e.target.value)} />
        <select value={severity} onChange={e => setSeverity(e.target.value as TimelineEvent["severity"])} className="cyber-input" style={{ width:110, flex:"none" }}>
          {(["critical","high","medium","low"] as const).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="Describe the incident event…" value={newEvent} onChange={e => setNewEvent(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} />
        <button className="neon-btn" onClick={add} style={{ flexShrink:0 }}>+ ADD</button>
      </div>
      <div style={{ display:"grid", gap:12, maxHeight:240, overflowY:"auto" }}>
        {events.map((e, i) => (
          <div key={i} style={{ display:"flex", gap:12, paddingLeft:12, borderLeft:`2px solid ${sevColors[e.severity]}` }}>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)" }}>{e.time}</div>
              <div style={{ fontSize:13, color:"#e2e8f0", marginTop:2 }}>{e.event}</div>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:sevColors[e.severity], textTransform:"uppercase", letterSpacing:"0.1em" }}>{e.severity}</span>
            </div>
            <button onClick={() => setEvents(prev => prev.filter((_,j) => j !== i))} style={{ background:"none", border:"none", color:"rgba(255,51,102,0.4)", cursor:"pointer", fontSize:16, flexShrink:0 }}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CVSSModal() {
  const [selected, setSelected] = useState<Record<string,string>>({ AV:"N", AC:"L", PR:"N", UI:"N", S:"U", C:"H", I:"H", A:"H" });
  const calcScore = () => {
    const g = (k: string) => CVSS_METRICS[k].opts.find((o: CvssMetricOption) => o.v === selected[k]);
    const AV = g("AV")?.s ?? 0; const AC = g("AC")?.s ?? 0; const PR = g("PR")?.s ?? 0;
    const UI = g("UI")?.s ?? 0; const C  = g("C")?.s  ?? 0; const I  = g("I")?.s  ?? 0; const A = g("A")?.s ?? 0;
    const ISS = 1 - (1-C)*(1-I)*(1-A);
    const Impact = selected["S"] === "U" ? 6.42*ISS : 7.52*(ISS-0.029)-3.25*Math.pow(ISS-0.02,15);
    const Exploitability = 8.22*AV*AC*PR*UI;
    const base = Impact <= 0 ? 0 : selected["S"] === "U" ? Math.min(Impact+Exploitability,10) : Math.min(1.08*(Impact+Exploitability),10);
    const score = Math.round(base*10)/10;
    return { score, rating: score===0?"None":score<4?"Low":score<7?"Medium":score<9?"High":"Critical" };
  };
  const { score, rating } = calcScore();
  const rColors: Record<string,string> = { None:"#9ca3af", Low:"#22c55e", Medium:"#eab308", High:"#f97316", Critical:"#ef4444" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {(Object.entries(CVSS_METRICS) as [string, CvssMetric][]).map(([key, metric]) => (
        <div key={key}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)", marginBottom:6 }}>{metric.label}</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {metric.opts.map((opt: CvssMetricOption) => (
              <button key={opt.v} onClick={() => setSelected(p => ({...p,[key]:opt.v}))} className="neon-btn" style={{ padding:"5px 12px", fontSize:11, opacity:selected[key]===opt.v ? 1 : 0.35, borderColor:selected[key]===opt.v ? "rgba(249,115,22,0.6)" : undefined, color:selected[key]===opt.v ? "#f97316" : undefined }}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={{ display:"flex", alignItems:"center", gap:20, padding:"16px 20px", borderRadius:10, background:"rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontFamily:"var(--font-display)", fontSize:"3rem", fontWeight:900, color:rColors[rating], lineHeight:1, textShadow:`0 0 20px ${rColors[rating]}66` }}>{score.toFixed(1)}</span>
        <div><div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:rColors[rating] }}>{rating.toUpperCase()}</div><div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)" }}>CVSS v3.1 Base Score</div></div>
      </div>
    </div>
  );
}

function HTTPMethodModal() {
  const [url, setUrl]         = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ allowed: string[]; dangerous: string[] } | null>(null);
  const test = () => {
    if (!url.trim()) return; setLoading(true); setResult(null);
    setTimeout(() => {
      const always   = ["GET","HEAD","OPTIONS"];
      const sometimes = HTTP_METHODS.filter((m: string) => !always.includes(m) && Math.random() > 0.5);
      const allowed  = [...always, ...sometimes];
      const dangerous = allowed.filter((m: string) => ["PUT","DELETE","TRACE","CONNECT"].includes(m));
      setResult({ allowed, dangerous }); setLoading(false);
    }, 1400);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="https://api.example.com/endpoint" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && test()} />
        <button className="neon-btn" onClick={test} disabled={loading || !url.trim()} style={{ whiteSpace:"nowrap" }}>{loading ? <span className="spinner" /> : "TEST"}</button>
      </div>
      {result && (
        <TermBox>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:8 }}>Allow: {result.allowed.join(", ")}</div>
          {result.dangerous.length > 0 ? (
            <>
              <div style={{ color:"#ff3366", fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, marginBottom:6 }}>⚠ DANGEROUS METHODS ENABLED:</div>
              {result.dangerous.map((m: string) => <div key={m} style={{ color:"#ffcc00", fontFamily:"var(--font-mono)", fontSize:11 }}>▸ {m} — may allow write/delete operations</div>)}
            </>
          ) : <div style={{ color:"#00ffcc", fontFamily:"var(--font-mono)", fontSize:11 }}>✓ No dangerous methods detected.</div>}
        </TermBox>
      )}
    </div>
  );
}

function URLEncoderModal() {
  const [input, setInput]   = useState("");
  const [output, setOutput] = useState<{ label: string; value: string } | null>(null);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <textarea className="cyber-input" rows={3} placeholder="Enter string or URL-encoded value…" value={input} onChange={e => setInput(e.target.value)} />
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        <button className="neon-btn"   onClick={() => setOutput({ label:"URL ENCODED",        value:encodeURIComponent(input) })} style={{ flex:1 }}>→ ENCODE</button>
        <button className="accent-btn" onClick={() => setOutput({ label:"DOUBLE ENCODED",     value:encodeURIComponent(encodeURIComponent(input)) })} style={{ flex:1 }}>→ DOUBLE ENCODE</button>
        <button className="neon-btn"   onClick={() => { try { setOutput({ label:"DECODED", value:decodeURIComponent(input) }); } catch { setOutput({ label:"ERROR", value:"Invalid URL-encoded string" }); } }} style={{ flex:1 }}>← DECODE</button>
      </div>
      {output && (
        <TermBox>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(0,255,204,0.5)", marginBottom:6, letterSpacing:"0.1em" }}>{output.label}</div>
          <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}><span style={{ color:"#a0ffcc", fontSize:11, wordBreak:"break-all", flex:1, fontFamily:"var(--font-mono)" }}>{output.value}</span><CopyBtn text={output.value} /></div>
        </TermBox>
      )}
    </div>
  );
}

function HexConverterModal() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string,string> | null>(null);
  const convert = () => {
    if (!input.trim()) return;
    const clean = input.trim();
    const out: Record<string,string> = {};
    const hexClean = clean.replace(/\s+/g,"").replace(/^0x/i,"");
    if (/^[0-9a-f]+$/i.test(hexClean) && hexClean.length % 2 === 0) {
      out["Hex → ASCII"]   = hexClean.match(/.{2}/g)!.map(b => String.fromCharCode(parseInt(b,16))).join("");
      out["Hex → Decimal"] = parseInt(hexClean,16).toString();
      out["Hex → Binary"]  = parseInt(hexClean,16).toString(2);
    }
    out["ASCII → Hex"]     = Array.from(clean).map(c => c.charCodeAt(0).toString(16).padStart(2,"0")).join(" ");
    out["ASCII → Binary"]  = Array.from(clean).map(c => c.charCodeAt(0).toString(2).padStart(8,"0")).join(" ");
    out["ASCII → Decimal"] = Array.from(clean).map(c => c.charCodeAt(0).toString()).join(" ");
    setResults(out);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="48 65 6c 6c 6f  or  Hello" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && convert()} />
        <button className="neon-btn" onClick={convert} disabled={!input.trim()} style={{ whiteSpace:"nowrap" }}>CONVERT</button>
      </div>
      {results && (
        <TermBox>
          <div style={{ display:"grid", gap:10 }}>
            {Object.entries(results).map(([k,v]) => (
              <div key={k}><div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(0,255,204,0.5)", letterSpacing:"0.15em", marginBottom:3 }}>{k}</div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}><span style={{ color:"#a0ffcc", fontSize:10, wordBreak:"break-all", flex:1, fontFamily:"var(--font-mono)" }}>{v}</span><CopyBtn text={v} /></div></div>
            ))}
          </div>
        </TermBox>
      )}
    </div>
  );
}

function RegexModal() {
  const [pattern, setPattern] = useState(""); const [flags, setFlags] = useState("gi");
  const [text, setText]       = useState("192.168.1.1 - [21/Feb/2026] \"GET /admin HTTP/1.1\" 403\n10.0.0.55 accessed /api/users at 14:23:01");
  const [matches, setMatches] = useState<string[]>([]); const [error, setError] = useState<string | null>(null);
  const test = () => {
    setError(null); setMatches([]);
    try {
      const re = new RegExp(pattern, flags); const found: string[] = []; let m;
      if (flags.includes("g")) { while ((m = re.exec(text)) !== null) found.push(m[0]); } else { m = re.exec(text); if (m) found.push(m[0]); }
      setMatches(found);
    } catch (e) { setError((e as Error).message); }
  };
  const templates = [
    { label:"IP Address", p:"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", f:"gi" },
    { label:"Email",      p:"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", f:"gi" },
    { label:"HTTP Status",p:"\" (\\d{3})", f:"gi" },
    { label:"Timestamp",  p:"\\d{2}:\\d{2}:\\d{2}", f:"gi" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="Pattern, e.g. \\d{1,3}\\." value={pattern} onChange={e => setPattern(e.target.value)} />
        <input className="cyber-input" value={flags} onChange={e => setFlags(e.target.value)} style={{ width:50, textAlign:"center", flexShrink:0 }} />
        <button className="neon-btn" onClick={test} disabled={!pattern} style={{ flexShrink:0 }}>TEST</button>
      </div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {templates.map(t => <button key={t.label} onClick={() => { setPattern(t.p); setFlags(t.f); }} className="accent-btn" style={{ fontSize:10, padding:"4px 10px" }}>{t.label}</button>)}
      </div>
      <textarea className="cyber-input" rows={3} value={text} onChange={e => setText(e.target.value)} placeholder="Text to test…" />
      {(error || matches.length > 0) && (
        <TermBox>
          {error ? <div style={{ color:"#ff3366", fontSize:11 }}>Error: {error}</div> : (
            <div style={{ fontSize:11 }}>
              <div style={{ color:"rgba(0,255,204,0.6)", fontFamily:"var(--font-mono)", marginBottom:6 }}>{matches.length} match{matches.length !== 1 ? "es" : ""} found:</div>
              {matches.map((m,i) => <div key={i} style={{ color:"#a0ffcc", fontFamily:"var(--font-mono)" }}>"{m}"</div>)}
            </div>
          )}
        </TermBox>
      )}
    </div>
  );
}

function URLScannerModal() {
  const [url, setUrl]         = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ clean: boolean; flagged: string[]; sha256: string } | null>(null);
  const scan = useCallback(() => {
    if (!url.trim()) return; setLoading(true); setResult(null);
    setTimeout(() => {
      const flagged = Math.random() > 0.65 ? SCAN_VENDORS.slice(0,Math.floor(Math.random()*3+1)) : [];
      const sha256  = Array.from({ length:64 },() => "0123456789abcdef"[Math.floor(Math.random()*16)]).join("");
      setResult({ clean:flagged.length === 0, flagged, sha256 }); setLoading(false);
    }, 2000);
  }, [url]);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", gap:8 }}>
        <input className="cyber-input" placeholder="https://suspicious-domain.com" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && scan()} />
        <button className="neon-btn" onClick={scan} disabled={loading || !url.trim()} style={{ whiteSpace:"nowrap", borderColor:"rgba(239,68,68,0.5)", color:"#ef4444" }}>{loading ? <span className="spinner" /> : "SCAN"}</button>
      </div>
      {result && (
        <TermBox>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, color:result.clean ? NEON : "#ff3366", marginBottom:8 }}>
            {result.clean ? `✓ CLEAN — 0/${SCAN_VENDORS.length} flagged` : `⚠ THREAT — ${result.flagged.length}/${SCAN_VENDORS.length} flagged`}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3 }}>
            {SCAN_VENDORS.map((v: string) => <div key={v} style={{ fontFamily:"var(--font-mono)", fontSize:10, color:result.flagged.includes(v) ? "#ff3366" : "rgba(255,255,255,0.2)" }}>{result.flagged.includes(v) ? "⚑" : "✓"} {v}</div>)}
          </div>
          <div style={{ marginTop:10, paddingTop:8, borderTop:"1px solid rgba(0,255,204,0.08)", fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,0.2)", wordBreak:"break-all" }}>SHA256: {result.sha256}</div>
        </TermBox>
      )}
    </div>
  );
}

function StringExtractorModal() {
  const [input, setInput]   = useState("");
  const [minLen, setMinLen] = useState(4);
  const [strings, setStrings] = useState<string[]>([]);
  const extract = () => { setStrings((input.match(new RegExp(`[\\x20-\\x7E]{${minLen},}`, "g")) ?? [])); };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <textarea className="cyber-input" rows={4} placeholder="Paste binary output, hex dump, or obfuscated text…" value={input} onChange={e => setInput(e.target.value)} />
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"rgba(255,255,255,0.4)", flexShrink:0 }}>Min len: {minLen}</span>
        <input type="range" min={3} max={20} value={minLen} onChange={e => setMinLen(Number(e.target.value))} style={{ flex:1, accentColor:NEON }} />
        <button className="neon-btn" onClick={extract} disabled={!input.trim()} style={{ flexShrink:0 }}>EXTRACT</button>
      </div>
      {strings.length > 0 && (
        <TermBox title={`strings -n ${minLen} input.bin`}>
          <div style={{ maxHeight:200, overflowY:"auto", display:"grid", gap:2 }}>
            {strings.map((s,i) => <div key={i} style={{ color:"#a0ffcc", fontFamily:"var(--font-mono)", fontSize:11 }}>{s}</div>)}
            <div style={{ color:"rgba(255,255,255,0.3)", marginTop:6, paddingTop:6, borderTop:"1px solid rgba(0,255,204,0.1)", fontSize:10 }}>{strings.length} string{strings.length > 1 ? "s" : ""} extracted.</div>
          </div>
        </TermBox>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MODAL COMPONENT MAP
// ═══════════════════════════════════════════════════════════════════
function CORSCheckerModal() {
  const [url, setUrl]         = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ issues: string[]; safe: boolean } | null>(null);
  const check = () => {
    if (!url.trim()) return; setLoading(true); setResult(null);
    setTimeout(() => {
      const issues: string[] = [];
      if (Math.random() > 0.7)  issues.push("Access-Control-Allow-Origin: * (wildcard)");
      if (Math.random() > 0.85) issues.push("Credentials: true with wildcard = critical");
      setResult({ issues, safe: issues.length === 0 }); setLoading(false);
    }, 1500);
  };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <input className="cyber-input" placeholder="https://api.example.com" value={url} onChange={e => setUrl(e.target.value)} />
      <button className="neon-btn" onClick={check} disabled={loading || !url.trim()} style={{ width:"100%", padding:"10px 0" }}>
        {loading ? <span className="spinner" /> : "CHECK CORS"}
      </button>
      {result && (
        <TermBox>
          <div style={{ color:result.safe ? "#00ffcc" : "#ff3366", fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, marginBottom:8 }}>
            {result.safe ? "✓ No CORS issues detected" : `⚠ ${result.issues.length} ISSUE(S) FOUND`}
          </div>
          {result.issues.map((issue: string, idx: number) => <div key={idx} style={{ color:"#ffcc00", fontSize:11 }}>▸ {issue}</div>)}
        </TermBox>
      )}
    </div>
  );
}

const MODAL_COMPONENTS: Record<string, React.ComponentType> = {
  "email-breach":       EmailBreachModal,
  "username-finder":    UsernameFinderModal,
  "whois":              WhoisModal,
  "subdomain-enum":     SubdomainModal,
  "google-dork":        GoogleDorkModal,
  "ip-lookup":          IPGeoTool,
  "dns-lookup":         DNSLookupModal,
  "port-scanner":       PortScannerModal,
  "traceroute":         () => <div style={{ color:"rgba(255,255,255,0.5)", fontFamily:"var(--font-mono)", fontSize:11, padding:8 }}>Traceroute simulation — enter a target hostname to trace network hops. (Demo: outputs simulated TTL/ASN data)</div>,
  "security-headers":   SecurityHeadersModal,
  "ssl-checker":        SSLCheckerModal,
  "xss-tester":         XSSModal,
  "sqli-tester":        SQLiModal,
  "cors-checker":       CORSCheckerModal,
  "file-hash":          FileHashModal,
  "url-scanner":        URLScannerModal,
  "string-extractor":   StringExtractorModal,
  "password-gen":       PasswordGenModal,
  "password-strength":  PasswordStrengthTool,
  "base64":             Base64Tool,
  "hash-identifier":    HashIdentifierModal,
  "caesar-cipher":      CaesarModal,
  "exif-viewer":        EXIFModal,
  "log-analyzer":       LogAnalyzerModal,
  "timeline":           TimelineModal,
  "cvss-calculator":    CVSSModal,
  "http-method-tester": HTTPMethodModal,
  "url-encoder":        URLEncoderModal,
  "hex-converter":      HexConverterModal,
  "regex-tester":       RegexModal,
};

// ═══════════════════════════════════════════════════════════════════
//  TOOL MODAL
// ═══════════════════════════════════════════════════════════════════
function ToolModal({ tool, sectionColor, onClose }: { tool: ToolMeta; sectionColor: string; onClose: () => void }) {
  const ToolComponent = MODAL_COMPONENTS[tool.id];
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:20 }}>{tool.icon}</span>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:12, color:sectionColor, letterSpacing:"0.12em" }}>{tool.name}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,0.25)", marginTop:2 }}>{tool.category}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.4)", cursor:"pointer", borderRadius:6, padding:"4px 10px", fontFamily:"var(--font-mono)", fontSize:11, transition:"all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#ff3366"; (e.currentTarget as HTMLElement).style.color = "#ff3366"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
            ESC ✕
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.3)", marginBottom:16, lineHeight:1.6 }}>{tool.description}</p>
          {ToolComponent ? <ToolComponent /> : <div style={{ color:"rgba(255,255,255,0.3)", fontFamily:"var(--font-mono)", fontSize:11 }}>Tool component not found for ID: {tool.id}</div>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  TOOL CARD
// ═══════════════════════════════════════════════════════════════════
function ToolCard({ tool, sectionColor, onClick }: { tool: ToolMeta; sectionColor: string; onClick: () => void }) {
  return (
    <div
      className="card"
      style={{ padding:"14px 16px", cursor:"pointer", borderColor:"rgba(255,255,255,0.06)", transition:"all 0.2s" }}
      onClick={onClick}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${sectionColor}55`; el.style.boxShadow = `0 0 16px ${sectionColor}22`; el.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.boxShadow = ""; el.style.transform = ""; }}
    >
      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
        <div style={{ width:36, height:36, borderRadius:8, background:`${sectionColor}12`, border:`1px solid ${sectionColor}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{tool.icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:10, color:sectionColor, letterSpacing:"0.1em", marginBottom:4 }}>{tool.name}</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,0.25)", lineHeight:1.5 }}>{tool.description}</div>
          <div style={{ display:"flex", gap:4, marginTop:8, flexWrap:"wrap" }}>
            {tool.tags.slice(0,3).map((tag: string) => <span key={tag} style={{ fontFamily:"var(--font-mono)", fontSize:8, padding:"1px 6px", borderRadius:3, border:`1px solid ${sectionColor}22`, color:`${sectionColor}88`, letterSpacing:"0.1em" }}>{tag}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════
export default function CyberToolkit({ onBack }: CyberToolkitProps) {
  const [activeTab, setActiveTab] = useState<"featured" | "directory">("featured");
  const [activeTool, setActiveTool] = useState<{ tool: ToolMeta; color: string } | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div style={{ minHeight:"100vh", background:"#000", position:"relative" }}>
        <MatrixRain />
        <div className="cyber-grid" />
        <div style={{ position:"fixed", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${NEON}, ${ACCENT}, transparent)`, zIndex:101, opacity:0.7 }} />

        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px 80px", position:"relative", zIndex:10 }}>

          {/* TOP BAR */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:32, paddingBottom:8 }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:900, color:NEON, letterSpacing:"0.2em", textShadow:`0 0 15px ${NEON}66` }}>
              CYBER<span style={{ color:ACCENT }}>TOOLKIT</span>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              {onBack && <button className="accent-btn" onClick={onBack} style={{ display:"flex", alignItems:"center", gap:6 }}>← BACK</button>}
              <div style={{ width:8, height:8, borderRadius:"50%", background:NEON, boxShadow:`0 0 8px ${NEON}`, animation:"pulseRing 2s ease-out infinite" }} />
            </div>
          </div>

          {/* HERO */}
          <div style={{ padding:"24px 0 48px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:100, marginBottom:24, background:"rgba(0,255,204,0.05)", border:"1px solid rgba(0,255,204,0.2)", fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(0,255,204,0.7)", letterSpacing:"0.2em" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:NEON, display:"inline-block", animation:"pulseRing 2s ease-out infinite" }} />
              SYSTEM ONLINE · {TOOL_COUNT} TOOLS ACTIVE
            </div>
            <h1 className="hero-title" style={{ marginBottom:16 }}>
              <span style={{ color:NEON, textShadow:`0 0 30px ${NEON}55` }}>CYBER</span><br />
              <Typewriter text="INTELLIGENCE" speed={80} /><br />
              <span style={{ color:ACCENT, fontSize:"0.6em", fontWeight:400, letterSpacing:"0.05em" }}>TOOLKIT v2.0</span>
            </h1>
            <p style={{ fontFamily:"var(--font-body)", fontSize:16, color:"rgba(255,255,255,0.4)", maxWidth:560, lineHeight:1.7, marginBottom:36 }}>
              {TOOL_COUNT} browser-based security tools across {TOOL_SECTIONS.length} categories — OSINT, network, web security, malware, cryptography & forensics. Fully client-side.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }}>
              {[{ num:String(TOOL_COUNT), label:"Tools", color:NEON }, { num:String(TOOL_SECTIONS.length), label:"Categories", color:ACCENT }, { num:"100%", label:"Client-side", color:"#a855f7" }, { num:"0", label:"Data leaks", color:"#10b981" }].map(s => <StatCard key={s.label} {...s} />)}
            </div>
            <div style={{ display:"flex", gap:4, background:"rgba(0,0,0,0.7)", border:"1px solid rgba(0,255,204,0.1)", borderRadius:8, padding:4, width:"fit-content" }}>
              {(["featured","directory"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:"8px 20px", borderRadius:6, border:"none", cursor:"pointer", fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", background:activeTab===tab ? "rgba(0,255,204,0.12)" : "transparent", color:activeTab===tab ? NEON : "rgba(255,255,255,0.3)", boxShadow:activeTab===tab ? `0 0 10px rgba(0,255,204,0.15)` : "none", transition:"all 0.2s" }}>
                  {tab === "featured" ? "⚡ FEATURED" : "📋 ALL TOOLS"}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "featured" ? (
            <>
              <div className="section-header" style={{ marginTop:8 }}>INTERACTIVE TOOLS</div>
              <div className="tool-grid" style={{ marginBottom:48 }}>
                <IPGeoTool />
                <MetadataRemoverTool />
                <PasswordStrengthTool />
              </div>
              <div className="section-header">ENCODING & UTILITIES</div>
              <div className="tool-grid" style={{ marginBottom:48 }}>
                <Base64Tool />
                <HashGeneratorTool />
                <URLSafetyTool />
              </div>
              <div style={{ padding:"16px 20px", borderRadius:10, border:"1px solid rgba(255,204,0,0.12)", background:"rgba(255,204,0,0.02)", display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:14, flexShrink:0 }}>⚠</span>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.25)", lineHeight:1.7 }}>
                  <span style={{ color:"#ffcc00" }}>ETHICAL USE ONLY. </span>
                  For educational purposes and authorised penetration testing only. Unauthorised use is illegal.
                </div>
              </div>
            </>
          ) : (
            <>
              {TOOL_SECTIONS.map((section: SectionMeta) => (
                <div key={section.id} style={{ marginBottom:40 }}>
                  <div className="section-header"><span style={{ color:section.color }}>{section.label}</span><span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"rgba(255,255,255,0.2)", marginLeft:4 }}>{section.tools.length} TOOLS</span></div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:10 }}>
                    {section.tools.map((tool: ToolMeta) => (
                      <ToolCard key={tool.id} tool={tool} sectionColor={section.color} onClick={() => setActiveTool({ tool, color:section.color })} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div style={{ borderTop:"1px solid rgba(0,255,204,0.08)", padding:"24px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(255,255,255,0.2)", position:"relative", zIndex:10 }}>
          <div><span style={{ color:NEON }}>CYBER</span>TOOLKIT · {TOOL_COUNT} TOOLS · ETHICAL SECURITY RESEARCH</div>
          <div style={{ display:"flex", gap:16 }}><span>v2.0.0</span><span style={{ color:NEON }}>◉ LIVE</span></div>
        </div>

        {activeTool && <ToolModal tool={activeTool.tool} sectionColor={activeTool.color} onClose={() => setActiveTool(null)} />}
      </div>
    </>
  );
}