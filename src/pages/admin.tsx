import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVisitorIP, useVisitHistory } from "../context/VisitorContext";
import { formatTimestamp, getDeviceIcon, getBrowserColor } from "../utils/trackVisitor";

/* ─────────────────────────────────────────
   STYLES — fully responsive
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
    :root {
      --c:#00ffe7;--c2:#00bfff;--g:#39ff14;--y:#ffd700;
      --r:#ff3b5c;--p:#bf5fff;--o:#ff8c42;--bg:#03080f;
      --fs-xs:8px;--fs-sm:10px;--fs-base:12px;
    }
    @media(min-width:640px){
      :root{--fs-xs:9px;--fs-sm:11px;--fs-base:13px;}
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;}
    body{background:var(--bg);overflow-x:hidden;}
    .orb{font-family:'Orbitron',monospace;}
    .mono{font-family:'Share Tech Mono',monospace;}

    .scanlines::after{
      content:'';position:absolute;inset:0;pointer-events:none;z-index:10;
      background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,231,0.012) 3px,rgba(0,255,231,0.012) 4px);
    }
    .hexgrid{
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32L28 66zm0-8l20-12V30L28 18 8 30v16l20 12z' fill='none' stroke='rgba(0,255,231,0.04)' stroke-width='1'/%3E%3C/svg%3E");
    }
    .glow-c{text-shadow:0 0 20px var(--c),0 0 50px rgba(0,255,231,0.3);}

    .card{
      border-radius:12px;border:1px solid rgba(0,255,231,0.12);
      background:rgba(0,8,16,0.93);backdrop-filter:blur(20px);
      position:relative;overflow:hidden;transition:border-color 0.3s;
    }
    .card::before{
      content:'';position:absolute;top:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent,var(--c),transparent);opacity:0.45;
    }
    @media(hover:hover){.card:hover{border-color:rgba(0,255,231,0.26);}}
    .card-g{border-color:rgba(57,255,20,0.18)!important;}
    .card-g::before{background:linear-gradient(90deg,transparent,var(--g),transparent)!important;}
    .card-p{border-color:rgba(191,95,255,0.18)!important;}
    .card-p::before{background:linear-gradient(90deg,transparent,var(--p),transparent)!important;}
    .card-r{border-color:rgba(255,59,92,0.18)!important;}
    .card-r::before{background:linear-gradient(90deg,transparent,var(--r),transparent)!important;}
    .card-y{border-color:rgba(255,215,0,0.18)!important;}
    .card-y::before{background:linear-gradient(90deg,transparent,var(--y),transparent)!important;}

    .stat-card{
      border-radius:10px;border:1px solid;background:rgba(0,5,12,0.96);
      position:relative;overflow:hidden;
      transition:transform 0.22s,box-shadow 0.22s;
      -webkit-tap-highlight-color:transparent;
    }
    @media(hover:hover){.stat-card:hover{transform:translateY(-3px);}}

    .pill{
      font-size:var(--fs-xs);letter-spacing:0.12em;
      padding:2px 7px;border-radius:4px;border:1px solid;
      display:inline-block;white-space:nowrap;
    }

    @keyframes flicker{0%,100%{opacity:1}93%{opacity:1}94%{opacity:.4}95%{opacity:1}98%{opacity:.7}}
    .flicker{animation:flicker 8s ease-in-out infinite;}
    @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
    .blink{animation:blink 1s step-end infinite;}
    @keyframes scanmove{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
    .scan-beam{
      position:fixed;left:0;right:0;height:2px;z-index:50;pointer-events:none;
      background:linear-gradient(90deg,transparent,rgba(0,255,231,0.35),transparent);
      animation:scanmove 8s linear infinite;
    }
    @keyframes pulse-ring{0%{transform:scale(0.88);opacity:0.8}100%{transform:scale(1.7);opacity:0}}
    .pulse-ring{position:relative;}
    .pulse-ring::after{
      content:'';position:absolute;inset:-4px;border-radius:50%;
      border:2px solid var(--g);animation:pulse-ring 1.5s ease-out infinite;
    }
    @keyframes glitch{
      0%,100%{clip-path:inset(0 0 100% 0)}
      20%{clip-path:inset(20% 0 40% 0);transform:translate(-3px)}
      40%{clip-path:inset(60% 0 20% 0);transform:translate(3px)}
      60%{clip-path:inset(10% 0 70% 0);transform:translate(-2px)}
      80%{clip-path:inset(80% 0 5% 0);transform:translate(2px)}
    }
    .glitch-layer{position:absolute;inset:0;color:var(--r);animation:glitch 7s step-end infinite;opacity:0.5;}
    @keyframes ip-reveal{
      0%{letter-spacing:0.4em;opacity:0;filter:blur(6px);}
      100%{letter-spacing:0.08em;opacity:1;filter:blur(0);}
    }
    .ip-reveal{animation:ip-reveal 1s cubic-bezier(0.22,1,0.36,1) forwards;}

    /* Scrollbar */
    ::-webkit-scrollbar{width:3px;height:3px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:rgba(0,255,231,0.15);border-radius:2px;}

    /* Table responsive */
    .visitors-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
    .visitors-table{width:100%;border-collapse:collapse;min-width:700px;}

    /* Touch friendly buttons */
    button{-webkit-tap-highlight-color:transparent;touch-action:manipulation;}

    /* Mobile input fix */
    input{-webkit-appearance:none;appearance:none;}
    input:focus{outline:none;}

    /* Prevent layout shift on mobile */
    .no-shrink{flex-shrink:0;}
  `}</style>
);

/* ─────────────────────────────────────────
   MATRIX RAIN
───────────────────────────────────────── */
function MatrixRain({ opacity = 0.055 }: { opacity?: number }) {
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
        ctx.fillStyle = Math.random() > 0.96 ? "#fff" : i%4===0 ? "#00ffe7" : i%4===1 ? "#00bfff" : "#004f5e";
        ctx.fillText(CHARS[Math.floor(Math.random()*CHARS.length)], i*F, y*F);
        if (y*F > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);
    return () => { clearInterval(id); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity,pointerEvents:"none"}}/>;
}

/* ─────────────────────────────────────────
   DECORATIVE RADAR — hidden on small screens to save space
───────────────────────────────────────── */
function ThreatRadar() {
  const [angle, setAngle] = useState(0);
  const [blips, setBlips] = useState<{x:number;y:number;age:number;col:string}[]>([]);

  useEffect(()=>{const id=setInterval(()=>setAngle(a=>(a+1.5)%360),25);return()=>clearInterval(id);},[]);

  // FIX: moved COLS inside useEffect to satisfy exhaustive-deps rule
  useEffect(()=>{
    const COLS = ["#00ffe7","#00bfff","#39ff14","#ffd700","#bf5fff"];
    if(Math.round(angle)%35===0){
      setBlips(b=>{
        const nb=b.map(p=>({...p,age:p.age+1})).filter(p=>p.age<10);
        const r=18+Math.random()*56; const a2=(angle*Math.PI)/180;
        nb.push({x:76+r*Math.cos(a2),y:76+r*Math.sin(a2),age:0,col:COLS[Math.floor(Math.random()*COLS.length)]});
        return nb;
      });
    }
  },[angle]);

  const rad=(angle*Math.PI)/180;
  return (
    <div className="card p-4 flex flex-col items-center">
      <div className="mono w-full mb-3 flex justify-between items-center" style={{fontSize:"var(--fs-xs)",color:"var(--c)",letterSpacing:"0.14em"}}>
        <span>NETWORK RADAR</span>
        <span className="pill" style={{color:"#39ff14",borderColor:"#39ff1440",background:"#39ff1412"}}>DECORATIVE</span>
      </div>
      <svg width="140" height="140" viewBox="0 0 152 152">
        <defs><filter id="blr"><feGaussianBlur stdDeviation="2.5"/></filter></defs>
        {[19,38,57,76].map(r=><circle key={r} cx="76" cy="76" r={r} fill="none" stroke="rgba(0,255,231,0.1)" strokeWidth="1" strokeDasharray={r<76?"4 3":""}/>)}
        <line x1="76" y1="0" x2="76" y2="152" stroke="rgba(0,255,231,0.07)" strokeWidth="1"/>
        <line x1="0" y1="76" x2="152" y2="76" stroke="rgba(0,255,231,0.07)" strokeWidth="1"/>
        <path d={`M76 76 L${76+76*Math.cos(rad)} ${76+76*Math.sin(rad)} A76 76 0 0 0 ${76+76*Math.cos(rad-0.9)} ${76+76*Math.sin(rad-0.9)} Z`} fill="rgba(0,255,231,0.12)"/>
        <line x1="76" y1="76" x2={76+76*Math.cos(rad)} y2={76+76*Math.sin(rad)} stroke="var(--c)" strokeWidth="1.5" opacity="0.85"/>
        {blips.map((b,i)=>(
          <g key={i}>
            <circle cx={b.x} cy={b.y} r={5} fill={b.col} opacity={(1-b.age/10)*0.3} filter="url(#blr)"/>
            <circle cx={b.x} cy={b.y} r={2} fill={b.col} opacity={1-b.age/10}/>
          </g>
        ))}
        <circle cx="76" cy="76" r="3" fill="var(--c)" style={{filter:"drop-shadow(0 0 4px var(--c))"}}/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   SPARKLINE
───────────────────────────────────────── */
function Sparkline({color,label}:{color:string;label:string}) {
  const [data, setData] = useState<number[]>(()=>Array.from({length:40},()=>Math.random()*60+10));
  useEffect(()=>{const id=setInterval(()=>setData(d=>[...d.slice(1),Math.random()*80+10]),700);return()=>clearInterval(id);},[]);
  const W=200,H=44;const max=Math.max(...data);
  const pts=data.map((v,i)=>`${(i/(data.length-1))*W},${H-(v/max)*H}`).join(" ");
  const fill=data.map((v,i)=>`${(i/(data.length-1))*W},${H-(v/max)*H}`).join(" ")+` ${W},${H} 0,${H}`;
  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.14em",color}}>{label}</span>
        <span className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(255,255,255,0.18)"}}>DECORATIVE</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="44" preserveAspectRatio="none">
        <defs><linearGradient id={`g-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient></defs>
        <polygon points={fill} fill={`url(#g-${label})`}/>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   HEADER — responsive
───────────────────────────────────────── */
function Header() {
  const [time, setTime] = useState(new Date());
  const v = useVisitorIP();
  useEffect(()=>{const id=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(id);},[]);
  const fmt=(n:number)=>n.toString().padStart(2,"0");
  return (
    <div style={{
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"12px 16px",borderBottom:"1px solid rgba(0,255,231,0.1)",
      position:"sticky",top:0,zIndex:40,
      background:"rgba(0,4,10,0.94)",backdropFilter:"blur(24px)",
      gap:8,
    }}>
      <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>
        <div className="w-2 h-2 rounded-full pulse-ring no-shrink" style={{background:"var(--g)",width:8,height:8}}/>
        <span className="orb flicker glow-c" style={{fontSize:"clamp(11px,3vw,14px)",letterSpacing:"0.18em",color:"var(--c)",whiteSpace:"nowrap"}}>RYTNIX</span>
        <span className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.14em",color:"rgba(255,255,255,0.16)",display:"none",whiteSpace:"nowrap"}}
          ref={el=>{if(el){el.style.display=window.innerWidth>=768?"block":"none";}}}>
          ADMIN · ANALYTICS
        </span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        {v.ip && (
          <div style={{
            display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,
            background:"rgba(0,255,231,0.05)",border:"1px solid rgba(0,255,231,0.12)"
          }}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"var(--g)",boxShadow:"0 0 5px var(--g)",flexShrink:0}}/>
            <span className="mono" style={{fontSize:"var(--fs-xs)",fontWeight:"bold",color:"var(--c)",whiteSpace:"nowrap"}}>
              {v.country_flag} {v.ip}
            </span>
          </div>
        )}
        <span className="mono" style={{fontSize:"clamp(10px,2.5vw,13px)",color:"var(--c)",letterSpacing:"0.1em",whiteSpace:"nowrap"}}>
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
    <div style={{position:"relative",display:"inline-block"}}>
      <span className="orb glow-c" style={{
        fontWeight:"bold",
        fontSize:"clamp(18px,5vw,30px)",
        letterSpacing:"-0.01em",
        color:"var(--c)",
        lineHeight:1.1,
      }}>{text}</span>
      <span className="glitch-layer orb" style={{
        fontWeight:"bold",
        fontSize:"clamp(18px,5vw,30px)",
        letterSpacing:"-0.01em",
      }} aria-hidden>{text}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   YOUR IP HERO CARD
───────────────────────────────────────── */
function MyIPCard() {
  const v = useVisitorIP();
  const geoRows = [
    {label:"COUNTRY",     value:v.country_flag&&v.country_name?`${v.country_flag} ${v.country_name}`:v.country_name, color:"#39ff14"},
    {label:"REGION",      value:v.region,       color:"#00bfff"},
    {label:"CITY",        value:v.city,          color:"#00bfff"},
    {label:"ISP / ORG",   value:v.isp,           color:"#bf5fff"},
    {label:"TIMEZONE",    value:v.timezone,      color:"#ffd700"},
    {label:"COORDINATES", value:v.lat&&v.lon?`${v.lat.toFixed(4)}, ${v.lon.toFixed(4)}`:null, color:"rgba(255,255,255,0.35)"},
    {label:"CURRENCY",    value:v.currency,      color:"#ff8c42"},
    {label:"LANGUAGES",   value:v.languages,     color:"#ff8c42"},
  ];
  return (
    <div className="card" style={{border:"1px solid rgba(0,255,231,0.22)",background:"rgba(0,5,14,0.97)"}}>
      <div style={{height:2,background:"linear-gradient(90deg,transparent,#00ffe7 40%,#39ff14,transparent)"}}/>
      <div style={{padding:"clamp(14px,3vw,24px)"}}>
        {/* Status row */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div className="pulse-ring" style={{width:8,height:8,borderRadius:"50%",background:v.loaded&&!v.error?"var(--g)":"var(--y)"}}/>
            <span className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.15em",color:"var(--c)"}}>YOUR PUBLIC IPv4</span>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {!v.loaded && <span className="pill" style={{color:"var(--y)",borderColor:"#ffd70040",background:"#ffd70010"}}>RESOLVING<span className="blink">_</span></span>}
            {v.loaded&&!v.error && <span className="pill" style={{color:"#39ff14",borderColor:"#39ff1440",background:"#39ff1412"}}>✓ CONFIRMED</span>}
            {v.error && <span className="pill" style={{color:"#ff3b5c",borderColor:"#ff3b5c40",background:"#ff3b5c12"}}>⚠ ERROR</span>}
          </div>
        </div>

        {/* Giant IP */}
        <div style={{marginBottom:18,padding:"16px",borderRadius:12,background:"rgba(0,255,231,0.03)",border:"1px solid rgba(0,255,231,0.09)"}}>
          <div className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.3em",marginBottom:10,color:"rgba(0,255,231,0.35)"}}>◈ PUBLIC IPv4 ADDRESS</div>
          {!v.loaded
            ? <div className="orb" style={{fontSize:"clamp(20px,6vw,38px)",color:"rgba(0,255,231,0.3)",letterSpacing:"0.1em"}}>···.···.···.···<span className="blink">_</span></div>
            : <div className="orb ip-reveal glow-c" style={{fontSize:"clamp(20px,6vw,38px)",fontWeight:"bold",color:"var(--c)",letterSpacing:"0.08em"}}>{v.ip??"UNAVAILABLE"}</div>
          }
          {v.lat&&v.lon && (
            <div className="mono" style={{fontSize:"var(--fs-xs)",marginTop:10,display:"flex",flexWrap:"wrap",gap:12,color:"rgba(255,255,255,0.22)"}}>
              <span>📍 {v.lat.toFixed(5)}°N, {v.lon.toFixed(5)}°E</span>
              {v.timezone && <span>🕐 {v.timezone}</span>}
            </div>
          )}
        </div>

        {/* Geo grid — 2 cols on mobile, 4 on md+ */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(min(140px,45%),1fr))",
          gap:8,marginBottom:14,
        }}>
          {geoRows.map(r=>(
            <div key={r.label} style={{padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.055)"}}>
              <div className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.12em",marginBottom:4,color:"rgba(255,255,255,0.22)"}}>{r.label}</div>
              <div className="mono" style={{fontSize:"var(--fs-sm)",fontWeight:"bold",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:r.color}}>
                {!v.loaded?<span style={{color:"rgba(255,255,255,0.15)"}}>···</span>:(r.value??"—")}
              </div>
            </div>
          ))}
        </div>

        {/* Device row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[
            {label:"BROWSER", value:v.browser, color:getBrowserColor(v.browser)},
            {label:"OS",      value:v.os,      color:"#00ffe7"},
            {label:"DEVICE",  value:v.deviceType?`${getDeviceIcon(v.deviceType)} ${v.deviceType?.toUpperCase()}`:null, color:"#39ff14"},
          ].map(r=>(
            <div key={r.label} style={{padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.055)"}}>
              <div className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.12em",marginBottom:2,color:"rgba(255,255,255,0.22)"}}>{r.label}</div>
              <div className="mono" style={{fontSize:"var(--fs-sm)",fontWeight:"bold",color:r.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {!v.loaded?<span style={{color:"rgba(255,255,255,0.15)"}}>···</span>:(r.value??"—")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ALL VISITORS TABLE
───────────────────────────────────────── */
function AllVisitorsTable() {
  const { allVisits, refreshAllVisits, supabaseReady } = useVisitHistory();
  const [filter, setFilter]     = useState("");
  const [sortBy, setSortBy]     = useState<"timestamp"|"ip"|"country">("timestamp");
  const [loading, setLoading]   = useState(false);
  const [expanded, setExpanded] = useState<number|null>(null);

  const uniqueIPs = new Set(allVisits.map(v=>v.ip).filter(Boolean)).size;
  const uniqueCountries = new Set(allVisits.map(v=>v.country_name).filter(Boolean)).size;

  const handleRefresh = async () => {
    setLoading(true);
    await refreshAllVisits();
    setLoading(false);
  };

  const filtered = allVisits
    .filter(v =>
      !filter.trim() ||
      (v.ip??"").includes(filter) ||
      (v.country_name??"").toLowerCase().includes(filter.toLowerCase()) ||
      (v.city??"").toLowerCase().includes(filter.toLowerCase()) ||
      (v.page??"").toLowerCase().includes(filter.toLowerCase()) ||
      (v.isp??"").toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a,b)=>{
      if(sortBy==="timestamp") return new Date(b.timestamp).getTime()-new Date(a.timestamp).getTime();
      if(sortBy==="ip") return (a.ip??"").localeCompare(b.ip??"");
      return (a.country_name??"").localeCompare(b.country_name??"");
    });

  return (
    <div className="card card-y">
      <div style={{padding:"clamp(14px,3vw,20px)"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div className="pulse-ring" style={{width:8,height:8,borderRadius:"50%",background:"var(--y)"}}/>
            <span className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.14em",color:"var(--y)"}}>ALL VISITORS — PERSISTENT LOG</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span className="pill" style={{color:"#ffd700",borderColor:"#ffd70040",background:"#ffd70012"}}>{allVisits.length} VISITS</span>
            <span className="pill" style={{color:"#00ffe7",borderColor:"#00ffe740",background:"#00ffe712"}}>{uniqueIPs} UNIQUE IPs</span>
            <span className="pill" style={{color:"#39ff14",borderColor:"#39ff1440",background:"#39ff1412"}}>{uniqueCountries} COUNTRIES</span>
            <button onClick={handleRefresh} className="pill mono"
              style={{color:"rgba(255,255,255,0.5)",borderColor:"rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",cursor:"pointer",padding:"4px 10px"}}>
              {loading ? <span className="blink">↻</span> : "↻ REFRESH"}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,flexWrap:"wrap"}}>
          <input
            type="text" placeholder="Filter by IP, country, city, page, ISP..."
            value={filter} onChange={e=>setFilter(e.target.value)}
            className="mono"
            style={{
              background:"rgba(255,215,0,0.04)",border:"1px solid rgba(255,215,0,0.18)",
              color:"var(--y)",borderRadius:8,padding:"7px 12px",
              fontSize:"var(--fs-xs)",flex:1,minWidth:0,
            }}
          />
          <div style={{display:"flex",gap:5,flexShrink:0}}>
            {(["timestamp","ip","country"] as const).map(s=>(
              <button key={s} onClick={()=>setSortBy(s)} className="pill mono"
                style={{
                  color: sortBy===s?"#ffd700":"rgba(255,255,255,0.35)",
                  borderColor: sortBy===s?"#ffd70050":"rgba(255,255,255,0.1)",
                  background: sortBy===s?"#ffd70015":"transparent",
                  cursor:"pointer",padding:"4px 8px",
                }}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {!supabaseReady ? (
          <div className="mono text-center" style={{padding:"48px 16px"}}>
            <div style={{color:"var(--y)",fontSize:28,marginBottom:12}}>⚠</div>
            <div style={{color:"var(--y)",fontSize:"var(--fs-base)",marginBottom:10}}>SUPABASE NOT CONFIGURED</div>
            <div style={{color:"rgba(255,255,255,0.3)",fontSize:"var(--fs-xs)",lineHeight:2}}>
              Add to <span style={{color:"var(--c)"}}>/.env.local</span> and restart:<br/>
              <span style={{color:"var(--g)"}}>REACT_APP_SUPABASE_URL</span>=https://xxxx.supabase.co<br/>
              <span style={{color:"var(--g)"}}>REACT_APP_SUPABASE_ANON</span>=your-anon-key
            </div>
          </div>
        ) : allVisits.length === 0 ? (
          <div className="mono text-center" style={{padding:"48px 16px",color:"rgba(255,215,0,0.2)",fontSize:"var(--fs-xs)"}}>
            NO VISITORS LOGGED YET — NAVIGATE PAGES TO POPULATE<span className="blink">_</span>
          </div>
        ) : (
          <div className="visitors-scroll" style={{maxHeight:"clamp(300px,50vh,520px)"}}>
            <table className="visitors-table">
              <thead style={{position:"sticky",top:0,background:"rgba(0,8,16,0.98)",zIndex:1}}>
                <tr>
                  {["#","TIMESTAMP","IPv4","COUNTRY","CITY","ISP","PAGE","BROWSER","OS","DEVICE"].map(h=>(
                    <th key={h} className="mono text-left" style={{
                      fontSize:"var(--fs-xs)",letterSpacing:"0.14em",
                      color:"rgba(255,215,0,0.4)",borderBottom:"1px solid rgba(255,215,0,0.12)",
                      whiteSpace:"nowrap",padding:"0 12px 8px 0",fontWeight:"normal",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.map((visit, i) => (
                    <>
                      <motion.tr key={(visit.id??i)+"-row"}
                        initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} exit={{opacity:0}}
                        transition={{duration:0.16}}
                        onClick={()=>setExpanded(expanded===i?null:i)}
                        style={{
                          borderBottom:"1px solid rgba(255,255,255,0.03)",
                          cursor:"pointer",
                          background:expanded===i?"rgba(255,215,0,0.04)":"transparent",
                          transition:"background 0.2s",
                        }}>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(255,255,255,0.2)",padding:"8px 12px 8px 0"}}>{i+1}</td>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(255,255,255,0.3)",whiteSpace:"nowrap",padding:"8px 12px 8px 0"}}>{formatTimestamp(visit.timestamp)}</td>
                        <td className="mono" style={{whiteSpace:"nowrap",padding:"8px 12px 8px 0"}}>
                          <span className="orb" style={{fontSize:11,fontWeight:"bold",color:"#00ffe7",textShadow:"0 0 8px rgba(0,255,231,0.5)"}}>
                            {visit.ip??"—"}
                          </span>
                        </td>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:"#39ff14",whiteSpace:"nowrap",padding:"8px 12px 8px 0"}}>
                          {visit.country_flag} {visit.country_name??"—"}
                        </td>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(255,255,255,0.4)",whiteSpace:"nowrap",padding:"8px 12px 8px 0"}}>{visit.city??"—"}</td>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:"#bf5fff",maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"8px 12px 8px 0"}}>{visit.isp??"—"}</td>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(0,255,231,0.7)",maxWidth:110,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"8px 12px 8px 0"}}>{visit.page}</td>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:getBrowserColor(visit.browser),whiteSpace:"nowrap",padding:"8px 12px 8px 0"}}>{visit.browser??"—"}</td>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(255,255,255,0.3)",whiteSpace:"nowrap",padding:"8px 12px 8px 0"}}>{visit.os??"—"}</td>
                        <td className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(255,255,255,0.3)",whiteSpace:"nowrap",padding:"8px 0 8px 0"}}>
                          {visit.device_type?`${getDeviceIcon(visit.device_type)} ${visit.device_type}`:"—"}
                        </td>
                      </motion.tr>
                      {expanded===i && (
                        <motion.tr key={(visit.id??i)+"-detail"}
                          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                          <td colSpan={10} style={{padding:"6px 12px 14px",background:"rgba(0,255,231,0.03)"}}>
                            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
                              {[
                                {label:"SESSION ID",  value:visit.session_id},
                                {label:"REFERRER",    value:visit.referrer||"direct"},
                                {label:"ENTRY PAGE",  value:visit.entry_page},
                                {label:"TIMEZONE",    value:visit.timezone},
                                {label:"COORDINATES", value:visit.lat&&visit.lon?`${visit.lat?.toFixed(4)}, ${visit.lon?.toFixed(4)}`:null},
                                {label:"REGION",      value:visit.region},
                                {label:"FULL ISP",    value:visit.isp},
                                {label:"USER AGENT",  value:visit.user_agent?visit.user_agent.slice(0,80)+"…":null},
                              ].map(r=>(
                                <div key={r.label} style={{padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
                                  <div className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.12em",marginBottom:4,color:"rgba(255,255,255,0.22)"}}>{r.label}</div>
                                  <div className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(0,255,231,0.7)",wordBreak:"break-all"}}>{r.value??"—"}</div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   IP LEADERBOARD
───────────────────────────────────────── */
function IPLeaderboard() {
  const { allVisits } = useVisitHistory();
  if (allVisits.length === 0) return null;

  const counts: Record<string,{count:number;country:string|null;flag:string|null;city:string|null;isp:string|null}> = {};
  allVisits.forEach(v => {
    if (!v.ip) return;
    if (!counts[v.ip]) counts[v.ip] = {count:0,country:v.country_name,flag:v.country_flag,city:v.city,isp:v.isp};
    counts[v.ip].count++;
  });
  const sorted = Object.entries(counts).sort((a,b)=>b[1].count-a[1].count).slice(0,10);
  const max = sorted[0]?.[1].count ?? 1;
  const COLORS = ["#00ffe7","#39ff14","#00bfff","#bf5fff","#ffd700","#ff8c42","#ff3b5c","#00ffe7","#39ff14","#00bfff"];

  return (
    <div className="card card-g">
      <div style={{padding:"clamp(14px,3vw,20px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
          <span style={{color:"var(--g)",fontSize:12}}>◆</span>
          <span className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.14em",color:"var(--g)"}}>TOP IPv4 ADDRESSES</span>
          <span className="pill" style={{marginLeft:"auto",color:"var(--g)",borderColor:"#39ff1440",background:"#39ff1412"}}>REAL DATA</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {sorted.map(([ip,info],i)=>(
            <div key={ip}>
              <div className="mono" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0}}>
                  <span style={{fontSize:"var(--fs-xs)",width:16,textAlign:"center",color:"rgba(255,255,255,0.25)",flexShrink:0}}>{i+1}</span>
                  <span className="orb" style={{fontSize:11,fontWeight:"bold",color:COLORS[i],textShadow:`0 0 6px ${COLORS[i]}60`,whiteSpace:"nowrap"}}>{ip}</span>
                  <span className="mono" style={{fontSize:"var(--fs-xs)",color:"rgba(255,255,255,0.35)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {info.flag} {info.city?`${info.city}, `:""}{""}
                    {info.country}
                  </span>
                </div>
                <span className="mono" style={{fontSize:"var(--fs-sm)",color:COLORS[i],flexShrink:0,marginLeft:8}}>{info.count}×</span>
              </div>
              <div style={{height:3,borderRadius:999,overflow:"hidden",background:"rgba(255,255,255,0.05)",marginLeft:24}}>
                <motion.div
                  initial={{width:0}} animate={{width:`${(info.count/max)*100}%`}}
                  transition={{delay:i*0.06,duration:0.7,ease:[0.34,1.56,0.64,1]}}
                  style={{height:"100%",background:COLORS[i],boxShadow:`0 0 5px ${COLORS[i]}`,borderRadius:999}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COUNTRY BREAKDOWN
───────────────────────────────────────── */
function CountryBreakdown() {
  const { allVisits } = useVisitHistory();
  if (allVisits.length === 0) return null;

  const counts: Record<string,{count:number;flag:string|null}> = {};
  allVisits.forEach(v=>{
    const key = v.country_name ?? "Unknown";
    if(!counts[key]) counts[key]={count:0,flag:v.country_flag};
    counts[key].count++;
  });
  const sorted=Object.entries(counts).sort((a,b)=>b[1].count-a[1].count).slice(0,8);
  const max=sorted[0]?.[1].count??1;
  const COLORS=["#00ffe7","#39ff14","#ffd700","#bf5fff","#ff8c42","#00bfff","#ff3b5c","#39ff14"];

  return (
    <div className="card card-p">
      <div style={{padding:"clamp(14px,3vw,20px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
          <span style={{color:"var(--p)",fontSize:12}}>◉</span>
          <span className="mono" style={{fontSize:"var(--fs-xs)",letterSpacing:"0.14em",color:"var(--p)"}}>VISITORS BY COUNTRY</span>
          <span className="pill" style={{marginLeft:"auto",color:"var(--p)",borderColor:"#bf5fff40",background:"#bf5fff12"}}>REAL DATA</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {sorted.map(([country,info],i)=>(
            <div key={country}>
              <div className="mono" style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:"var(--fs-sm)",color:"rgba(255,255,255,0.5)"}}>{info.flag} {country}</span>
                <span style={{fontSize:"var(--fs-sm)",color:COLORS[i%COLORS.length]}}>{info.count} visit{info.count!==1?"s":""}</span>
              </div>
              <div style={{height:4,borderRadius:999,overflow:"hidden",background:"rgba(255,255,255,0.05)"}}>
                <motion.div
                  initial={{width:0}} animate={{width:`${(info.count/max)*100}%`}}
                  transition={{delay:i*0.07,duration:0.7,ease:[0.34,1.56,0.64,1]}}
                  style={{height:"100%",background:COLORS[i%COLORS.length],boxShadow:`0 0 5px ${COLORS[i%COLORS.length]}`,borderRadius:999}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SUMMARY STAT BAR — responsive grid
───────────────────────────────────────── */
function SummaryBar() {
  const v = useVisitorIP();
  const { allVisits } = useVisitHistory();
  const uniqueIPs = new Set(allVisits.map(x=>x.ip).filter(Boolean)).size;
  const uniqueCountries = new Set(allVisits.map(x=>x.country_name).filter(Boolean)).size;
  const todayCount = allVisits.filter(x=>{
    const d = new Date(x.timestamp);
    const now = new Date();
    return d.getDate()===now.getDate()&&d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();
  }).length;
  const browsers: Record<string,number> = {};
  allVisits.forEach(x=>{if(x.browser) browsers[x.browser]=(browsers[x.browser]??0)+1;});
  const topBrowser = Object.entries(browsers).sort((a,b)=>b[1]-a[1])[0]?.[0]??"—";

  const items=[
    {label:"YOUR IPv4",      value:v.ip??(v.loaded?"N/A":"···"),        color:"#00ffe7", icon:"◈"},
    {label:"YOUR COUNTRY",   value:v.country_flag?`${v.country_flag} ${v.country??""}`:(v.country??"—"), color:"#39ff14", icon:"◎"},
    {label:"YOUR CITY",      value:v.city??"—",                          color:"#00bfff", icon:"◆"},
    {label:"TOTAL VISITS",   value:`${allVisits.length}`,                color:"#ffd700", icon:"▶"},
    {label:"UNIQUE IPs",     value:`${uniqueIPs}`,                       color:"#ff8c42", icon:"◉"},
    {label:"COUNTRIES",      value:`${uniqueCountries}`,                 color:"#bf5fff", icon:"▣"},
    {label:"TODAY",          value:`${todayCount}`,                      color:"#39ff14", icon:"◇"},
    {label:"TOP BROWSER",    value:topBrowser,                           color:getBrowserColor(topBrowser), icon:"🌐"},
    {label:"YOUR BROWSER",   value:v.browser??"—",                       color:getBrowserColor(v.browser), icon:"▶"},
  ];

  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(auto-fill,minmax(min(130px,calc(33%-8px)),1fr))",
      gap:8,
    }}>
      {items.map((item,i)=>(
        <motion.div key={item.label}
          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
          className="stat-card"
          style={{borderColor:item.color+"28",boxShadow:`0 0 12px ${item.color}06`,padding:"10px 12px"}}>
          <div style={{position:"absolute",inset:0,borderRadius:10,pointerEvents:"none",
            background:`radial-gradient(circle at top right,${item.color}07,transparent 70%)`}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:12,color:item.color,filter:`drop-shadow(0 0 3px ${item.color})`}}>{item.icon}</span>
              <span style={{fontSize:6,color:item.color+"55",fontFamily:"'Share Tech Mono'",letterSpacing:"0.1em"}}>REAL</span>
            </div>
            <div className="mono" style={{fontWeight:"bold",fontSize:"var(--fs-sm)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:item.color}}>
              {!v.loaded&&["YOUR IPv4","YOUR COUNTRY","YOUR CITY","YOUR BROWSER"].includes(item.label)
                ? <span className="blink" style={{color:"rgba(255,255,255,0.2)"}}>···</span>
                : item.value}
            </div>
            <div className="mono" style={{marginTop:3,fontSize:7,letterSpacing:"0.1em",color:item.color+"55"}}>{item.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function Admin() {
  return (
    <>
      <GlobalStyles/>
      <div className="relative scanlines hexgrid" style={{
        minHeight:"100svh",
        background:"var(--bg)",
        fontFamily:"'Share Tech Mono',monospace",
        overflowX:"hidden",
      }}>
        <MatrixRain/>
        <div className="scan-beam"/>

        {/* Background glows */}
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}} aria-hidden>
          <div style={{position:"absolute",top:"-10%",left:"20%",width:"min(700px,90vw)",height:"min(700px,90vw)",borderRadius:"50%",
            background:"radial-gradient(circle,rgba(0,255,231,0.05) 0%,transparent 70%)",filter:"blur(60px)"}}/>
          <div style={{position:"absolute",top:"50%",right:"-5%",width:"min(400px,60vw)",height:"min(400px,60vw)",borderRadius:"50%",
            background:"radial-gradient(circle,rgba(191,95,255,0.04) 0%,transparent 70%)",filter:"blur(60px)"}}/>
          <div style={{position:"absolute",bottom:"-5%",left:0,width:"min(500px,70vw)",height:"min(500px,70vw)",borderRadius:"50%",
            background:"radial-gradient(circle,rgba(0,191,255,0.03) 0%,transparent 70%)",filter:"blur(80px)"}}/>
        </div>

        <div style={{position:"relative",zIndex:10}}>
          <Header/>
          <div style={{
            maxWidth:1400,
            margin:"0 auto",
            padding:"clamp(16px,3vw,32px) clamp(12px,3vw,24px)",
            display:"flex",
            flexDirection:"column",
            gap:"clamp(14px,2vw,20px)",
          }}>

            {/* Title */}
            <motion.div initial={{opacity:0,y:-14}} animate={{opacity:1,y:0}}>
              <GlitchTitle/>
              <p className="mono" style={{
                fontSize:"var(--fs-xs)",marginTop:6,
                letterSpacing:"0.2em",color:"rgba(255,255,255,0.18)",
              }}>
                LIVE VISITOR ANALYTICS · REAL IPv4 · PERSISTENT SUPABASE LOG
              </p>
            </motion.div>

            {/* Summary bar */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.08}}>
              <SummaryBar/>
            </motion.div>

            {/* YOUR IP hero */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.14}}>
              <MyIPCard/>
            </motion.div>

            {/* All visitors table */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
              <AllVisitorsTable/>
            </motion.div>

            {/* IP leaderboard + country breakdown — stacked on mobile, side-by-side on md+ */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.26}}
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,360px),1fr))",
                gap:"clamp(14px,2vw,20px)",
              }}>
              <IPLeaderboard/>
              <CountryBreakdown/>
            </motion.div>

            {/* Decorative bottom row — sparklines hide on very small screens */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.32}}
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,260px),1fr))",
                gap:"clamp(14px,2vw,20px)",
              }}>
              <Sparkline color="#00ffe7" label="NETWORK ACTIVITY"/>
              <Sparkline color="#39ff14" label="PACKET FLOW"/>
              <ThreatRadar/>
            </motion.div>

          </div>
          <div className="mono text-center" style={{
            fontSize:"var(--fs-xs)",letterSpacing:"0.14em",
            paddingBottom:32,paddingTop:16,
            color:"rgba(0,255,231,0.1)",
          }}>
            RYTNIX SECURE SYSTEMS — VISITOR ANALYTICS
          </div>
        </div>
      </div>
    </>
  );
}