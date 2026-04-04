import { useState, useEffect, useRef, FC } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId    = "overview" | "threats" | "network" | "logs";
type SortDir  = "asc" | "desc";
type LogLevel = "critical" | "high" | "medium" | "low" | "info" | "success";

interface IpInfo {
  ip: string;
  country_name: string;
  country_code: string;
  city: string;
  org: string;
  timezone: string;
}

interface ClientInfo {
  ip: string;
  browser: string;
  platform: string;
  language: string;
  online: boolean;
  userAgent: string;
  screenRes: string;
  timezone: string;
  cookiesEnabled: boolean;
  doNotTrack: boolean;
}

interface CVE {
  id: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  cvss: number;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "PATCHED";
  asset: string;
  discovered: string;
}

interface LogEntry {
  id: number;
  level: LogLevel;
  timestamp: string;
  source: string;
  message: string;
  detail?: string;
}

interface Asset {
  id: number;
  name: string;
  ip: string;
  type: string;
  status: "SECURE" | "VULNERABLE" | "SCANNING" | "OFFLINE";
  risk: number;
  lastScan: string;
  openPorts: number[];
}

interface SparkProps  { data: number[]; color: string; height?: number; }
interface StatItem    { label: string; value: string | number; color: string; icon: string; sub: string; trend?: string; }
interface Blip        { x: number; y: number; age: number; col: string; }

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

  :root {
    --c:#00ffe7; --c2:#00bfff; --g:#39ff14; --y:#ffd700;
    --r:#ff3b5c; --p:#bf5fff; --o:#ff8c42; --bg:transparent;
    --panel:rgba(3,10,22,0.92); --rb:#0a1628;
    --cr:#ff2244; --border:rgba(0,255,231,0.12);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:transparent;color:rgba(255,255,255,0.88);font-family:'Rajdhani',sans-serif;overflow-x:hidden;min-height:100vh;}
  .jb{font-family:'JetBrains Mono',monospace;}
  .orb{font-family:'Orbitron',monospace;}
  .raj{font-family:'Rajdhani',sans-serif;}

  /* ── Panels ── */
  .panel{
    background:var(--panel);
    border:1px solid var(--border);
    border-radius:8px;
    position:relative;overflow:hidden;
    backdrop-filter:blur(24px);
    transition:border-color 0.3s,box-shadow 0.3s;
  }
  .panel::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,var(--c) 30%,var(--c2) 70%,transparent);opacity:0.5;}
  .panel:hover{border-color:rgba(0,255,231,0.25);box-shadow:0 0 24px rgba(0,255,231,0.06),0 4px 40px rgba(0,0,0,0.5);}
  .panel-r::before{background:linear-gradient(90deg,transparent,var(--r),transparent)!important;}
  .panel-r{border-color:rgba(255,59,92,0.2)!important;}
  .panel-g::before{background:linear-gradient(90deg,transparent,var(--g),transparent)!important;}
  .panel-g{border-color:rgba(57,255,20,0.15)!important;}
  .panel-y::before{background:linear-gradient(90deg,transparent,var(--y),transparent)!important;}
  .panel-y{border-color:rgba(255,215,0,0.18)!important;}
  .panel-p::before{background:linear-gradient(90deg,transparent,var(--p),transparent)!important;}
  .panel-p{border-color:rgba(191,95,255,0.15)!important;}

  /* ── Matrix BG ── */
  .hex-bg{
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 52L0 34.8V0L30 17.2 60 0v34.8L30 52zm0 0L0 69.2V104L30 86.8 60 104V69.2L30 52z' fill='none' stroke='rgba(0,255,231,0.018)' stroke-width='1'/%3E%3C/svg%3E");
  }
  .scanlines::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;
    background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,231,0.006) 2px,rgba(0,255,231,0.006) 4px);}

  /* ── Animations ── */
  @keyframes pulse-live{0%,100%{box-shadow:0 0 5px var(--g),0 0 10px var(--g);}50%{box-shadow:0 0 12px var(--g),0 0 28px var(--g),0 0 44px rgba(57,255,20,0.25);}}
  .dot-live{animation:pulse-live 2s ease-in-out infinite;}

  @keyframes pulse-red{0%,100%{box-shadow:0 0 5px var(--r),0 0 10px var(--r);}50%{box-shadow:0 0 12px var(--r),0 0 28px var(--r),0 0 44px rgba(255,59,92,0.25);}}
  .dot-red{animation:pulse-red 1.5s ease-in-out infinite;}

  @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
  .blink{animation:blink 1s step-end infinite;}

  @keyframes scan-move{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
  .scan-beam{position:fixed;left:0;right:0;height:2px;z-index:100;pointer-events:none;
    background:linear-gradient(90deg,transparent 10%,rgba(0,255,231,0.15) 50%,transparent 90%);
    box-shadow:0 0 8px rgba(0,255,231,0.1);
    animation:scan-move 14s linear infinite;}

  @keyframes fade-up{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;}}
  .fade-up{animation:fade-up 0.45s cubic-bezier(0.22,1,0.36,1) both;}
  .fd1{animation-delay:0.04s;}.fd2{animation-delay:0.09s;}
  .fd3{animation-delay:0.15s;}.fd4{animation-delay:0.21s;}
  .fd5{animation-delay:0.27s;}

  @keyframes glitch{0%,90%,100%{clip-path:none;transform:none;}
    91%{clip-path:inset(20% 0 40% 0);transform:translate(-3px,1px);}
    93%{clip-path:inset(60% 0 10% 0);transform:translate(3px,-1px);}
    95%{clip-path:inset(5% 0 70% 0);transform:translate(-2px,0);}}
  .glitch-layer{position:absolute;inset:0;color:var(--r);opacity:0.35;animation:glitch 11s step-end infinite;pointer-events:none;}

  @keyframes radar-sweep{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  .rsweep{animation:radar-sweep 4s linear infinite;transform-origin:75px 75px;}

  @keyframes bar-grow{from{height:0}to{height:var(--bh)}}
  .cbar{animation:bar-grow 0.8s cubic-bezier(0.34,1.56,0.64,1) both;}

  @keyframes terminal-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
  .tcursor{animation:terminal-blink 0.9s step-end infinite;color:var(--c);}

  @keyframes ring-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes ring-rotate-rev{from{transform:rotate(360deg);}to{transform:rotate(0deg);}}
  .ring1{animation:ring-rotate 8s linear infinite;transform-origin:center;}
  .ring2{animation:ring-rotate-rev 6s linear infinite;transform-origin:center;}
  .ring3{animation:ring-rotate 12s linear infinite;transform-origin:center;}

  @keyframes score-pulse{0%,100%{filter:drop-shadow(0 0 12px rgba(255,59,92,0.6));}50%{filter:drop-shadow(0 0 28px rgba(255,59,92,0.9));}}
  .score-glow{animation:score-pulse 3s ease-in-out infinite;}

  /* ── Nav ── */
  .nav-tab{position:relative;padding:8px 16px;border-radius:6px;cursor:pointer;
    border:1px solid transparent;transition:all 0.2s;font-family:'JetBrains Mono',monospace;
    font-size:10px;letter-spacing:0.1em;white-space:nowrap;background:transparent;
    color:rgba(255,255,255,0.28);-webkit-tap-highlight-color:transparent;}
  .nav-tab:hover{color:var(--c);border-color:rgba(0,255,231,0.2);background:rgba(0,255,231,0.04);}
  .nav-tab.active{color:var(--c);border-color:rgba(0,255,231,0.32);background:rgba(0,255,231,0.07);
    box-shadow:0 0 16px rgba(0,255,231,0.08),inset 0 0 16px rgba(0,255,231,0.04);}
  .nav-tab.active::after{content:'';position:absolute;bottom:-1px;left:20%;right:20%;height:1px;
    background:var(--c);box-shadow:0 0 8px var(--c);}

  /* ── Stat Cards ── */
  .stat-card{border-radius:8px;border:1px solid;background:rgba(2,6,18,0.95);
    position:relative;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s;cursor:default;}
  .stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,0.6);}

  /* ── Table ── */
  .dtable{width:100%;border-collapse:collapse;}
  .dtable thead th{padding:9px 12px;text-align:left;font-family:'JetBrains Mono',monospace;
    font-size:9px;letter-spacing:0.14em;color:rgba(255,255,255,0.22);
    border-bottom:1px solid rgba(255,255,255,0.05);white-space:nowrap;position:sticky;top:0;
    background:rgba(2,8,16,0.99);z-index:2;cursor:pointer;user-select:none;transition:color 0.2s;}
  .dtable thead th:hover{color:var(--c);}
  .dtable tbody tr{border-bottom:1px solid rgba(255,255,255,0.03);transition:background 0.15s;cursor:pointer;}
  .dtable tbody tr:hover{background:rgba(0,255,231,0.025);}
  .dtable tbody td{padding:9px 12px;white-space:nowrap;}

  /* ── CVE Severity Badges ── */
  .badge{display:inline-flex;align-items:center;gap:4px;font-family:'JetBrains Mono',monospace;
    font-size:8px;letter-spacing:0.12em;padding:2px 8px;border-radius:3px;border:1px solid;white-space:nowrap;}
  .badge-critical{color:#ff2244;border-color:#ff224440;background:#ff22440f;}
  .badge-high{color:#ff8c42;border-color:#ff8c4240;background:#ff8c420f;}
  .badge-medium{color:#ffd700;border-color:#ffd70040;background:#ffd7000f;}
  .badge-low{color:#00bfff;border-color:#00bfff40;background:#00bfff0f;}
  .badge-info{color:#bf5fff;border-color:#bf5fff40;background:#bf5fff0f;}

  /* ── Status indicators ── */
  .status-secure{color:#39ff14;}
  .status-vulnerable{color:#ff2244;}
  .status-scanning{color:#ffd700;}
  .status-offline{color:rgba(255,255,255,0.25);}

  /* ── Terminal ── */
  .terminal{background:rgba(0,4,10,0.98);border:1px solid rgba(0,255,231,0.1);border-radius:8px;
    font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.7;overflow-y:auto;
    position:relative;}
  .terminal::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(0,255,231,0.5),transparent);}
  .t-header{padding:10px 14px;border-bottom:1px solid rgba(0,255,231,0.07);
    display:flex;align-items:center;gap:8px;}
  .t-dot{width:8px;height:8px;border-radius:50%;}

  /* ── Progress bars ── */
  .pbar{height:3px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,0.05);}
  .pfill{height:100%;border-radius:999px;transition:width 1.2s cubic-bezier(0.34,1.56,0.64,1);}

  /* ── Input ── */
  .sinput{background:rgba(0,255,231,0.03);border:1px solid rgba(0,255,231,0.12);
    color:var(--c);border-radius:6px;padding:7px 12px;font-family:'JetBrains Mono',monospace;
    font-size:10px;width:100%;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
  .sinput:focus{border-color:rgba(0,255,231,0.38);box-shadow:0 0 12px rgba(0,255,231,0.07);}
  .sinput::placeholder{color:rgba(0,255,231,0.18);}

  /* ── Scrollbar ── */
  ::-webkit-scrollbar{width:3px;height:3px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(0,255,231,0.12);border-radius:2px;}
  ::-webkit-scrollbar-thumb:hover{background:rgba(0,255,231,0.25);}

  /* ── Risk ring ── */
  .risk-ring{position:relative;display:inline-flex;align-items:center;justify-content:center;}

  /* ── Glow helpers ── */
  .glow-c{text-shadow:0 0 20px rgba(0,255,231,0.7),0 0 48px rgba(0,255,231,0.3);}
  .glow-r{text-shadow:0 0 18px rgba(255,34,68,0.75),0 0 40px rgba(255,34,68,0.3);}
  .glow-g{text-shadow:0 0 14px rgba(57,255,20,0.65);}

  @media(max-width:640px){
    .nav-tab{padding:5px 9px;font-size:8px;}
    .hide-sm{display:none!important;}
  }
`;

// ─── Matrix Rain ──────────────────────────────────────────────────────────────

const MatrixRain: FC<{opacity?:number}> = ({opacity=0.048}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c=ref.current; if(!c) return;
    const ctx=c.getContext("2d"); if(!ctx) return;
    const F=11; let drops:number[]=[];
    const resize=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight;drops=Array(Math.floor(c.width/F)).fill(1);};
    resize();
    const ro=new ResizeObserver(resize); ro.observe(c);
    const CH="01アイウエオカキクケコサシスセソタチツテト┃┄╋▓░█◈◉▣<>{}[]|/\\;:#@$%^&*!?";
    const id=setInterval(()=>{
      ctx.fillStyle="rgba(2,8,16,0.052)"; ctx.fillRect(0,0,c.width,c.height);
      ctx.font=`${F}px monospace`;
      drops.forEach((y,i)=>{
        ctx.fillStyle=Math.random()>0.97?"#fff":i%5===0?"#00ffe7":i%7===0?"#ff3b5c":i%5===1?"#00bfff":"#002a38";
        ctx.fillText(CH[Math.floor(Math.random()*CH.length)],i*F,y*F);
        if(y*F>c.height&&Math.random()>0.974) drops[i]=0;
        drops[i]++;
      });
    },50);
    return()=>{clearInterval(id);ro.disconnect();};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity,pointerEvents:"none"}}/>;
};

// ─── Sparkline ────────────────────────────────────────────────────────────────

const Sparkline: FC<SparkProps> = ({data,color,height=44}) => {
  const W=300,H=height,max=Math.max(...data,1),min=Math.min(...data),range=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*W},${H-((v-min)/range)*H*0.85}`).join(" ");
  const fill=pts+` ${W},${H} 0,${H}`;
  const last=data[data.length-1]??0;
  const gid=`sg${color.replace(/[^a-z0-9]/gi,"")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" style={{overflow:"visible"}}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
      </linearGradient></defs>
      <polygon points={fill} fill={`url(#${gid})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" style={{filter:`drop-shadow(0 0 3px ${color})`}}/>
      {data.length>1&&<circle cx={W} cy={H-((last-min)/range)*H*0.85} r="3.5" fill={color} style={{filter:`drop-shadow(0 0 6px ${color})`}}/>}
    </svg>
  );
};

// ─── Radar ────────────────────────────────────────────────────────────────────

const BLIP_C=["#ff2244","#ff8c42","#ffd700","#00ffe7","#bf5fff"] as const;
const Radar: FC = () => {
  const [blips,setBlips]=useState<Blip[]>([]);
  useEffect(()=>{
    const id=setInterval(()=>{
      setBlips(b=>{
        const aged=b.map(p=>({...p,age:p.age+1})).filter(p=>p.age<14);
        if(Math.random()>0.55){const r=10+Math.random()*60,a=Math.random()*Math.PI*2;
          aged.push({x:75+r*Math.cos(a),y:75+r*Math.sin(a),age:0,col:BLIP_C[Math.floor(Math.random()*BLIP_C.length)]});}
        return aged.slice(-10);
      });
    },380);
    return()=>clearInterval(id);
  },[]);
  return (
    <svg width="150" height="150" viewBox="0 0 150 150">
      <defs>
        <filter id="blr"><feGaussianBlur stdDeviation="2.5"/></filter>
        <radialGradient id="rg" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(0,255,231,0.06)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        <radialGradient id="rg2" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(255,34,68,0.04)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <circle cx="75" cy="75" r="72" fill="url(#rg2)" stroke="rgba(0,255,231,0.06)" strokeWidth="1"/>
      {[20,40,60].map(r=><circle key={r} cx="75" cy="75" r={r} fill="none" stroke="rgba(0,255,231,0.06)" strokeWidth="1" strokeDasharray="3 4"/>)}
      <line x1="75" y1="3" x2="75" y2="147" stroke="rgba(0,255,231,0.05)" strokeWidth="1"/>
      <line x1="3" y1="75" x2="147" y2="75" stroke="rgba(0,255,231,0.05)" strokeWidth="1"/>
      <line x1="24" y1="24" x2="126" y2="126" stroke="rgba(0,255,231,0.03)" strokeWidth="1"/>
      <line x1="126" y1="24" x2="24" y2="126" stroke="rgba(0,255,231,0.03)" strokeWidth="1"/>
      <g className="rsweep">
        <path d="M75 75 L75 3 A72 72 0 0 1 147 75 Z" fill="url(#rg)" opacity="0.7"/>
        <line x1="75" y1="75" x2="75" y2="3" stroke="var(--c)" strokeWidth="1.5" opacity="0.65"/>
      </g>
      {blips.map((b,i)=>(
        <g key={i}>
          <circle cx={b.x} cy={b.y} r={7} fill={b.col} opacity={(1-b.age/14)*0.22} filter="url(#blr)"/>
          <circle cx={b.x} cy={b.y} r={2.5} fill={b.col} opacity={1-b.age/14} style={{filter:`drop-shadow(0 0 3px ${b.col})`}}/>
        </g>
      ))}
      <circle cx="75" cy="75" r="4" fill="var(--c)" style={{filter:"drop-shadow(0 0 6px var(--c))"}}/>
    </svg>
  );
};

// ─── Risk Score Ring ──────────────────────────────────────────────────────────

const RiskRing: FC<{score:number}> = ({score}) => {
  const S=180,cx=S/2,cy=S/2,r=72,circ=2*Math.PI*r;
  const pct=score/100,dash=pct*circ,gap=circ-dash;
  const col=score>75?"#ff2244":score>50?"#ff8c42":score>25?"#ffd700":"#39ff14";
  return (
    <div className="risk-ring" style={{width:S,height:S,flexShrink:0}}>
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
        <defs>
          <filter id="rglow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Outer decorative rings */}
        <circle cx={cx} cy={cy} r={85} fill="none" stroke="rgba(0,255,231,0.04)" strokeWidth="1" strokeDasharray="4 6" className="ring1"/>
        <circle cx={cx} cy={cy} r={80} fill="none" stroke="rgba(255,34,68,0.04)" strokeWidth="1" strokeDasharray="2 8" className="ring2"/>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
        {/* Score arc */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth="10"
          strokeDasharray={`${dash} ${gap}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{filter:`drop-shadow(0 0 10px ${col}80)`,transition:"stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)"}}
          className="score-glow"/>
        {/* Tick marks */}
        {Array.from({length:20}).map((_,i)=>{
          const a=(i/20)*Math.PI*2-Math.PI/2;
          const x1=cx+(r-16)*Math.cos(a),y1=cy+(r-16)*Math.sin(a);
          const x2=cx+(r-10)*Math.cos(a),y2=cy+(r-10)*Math.sin(a);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,255,231,0.15)" strokeWidth="1"/>;
        })}
        {/* Center text */}
        <text x={cx} y={cy-10} textAnchor="middle" fill={col} fontSize="38" fontWeight="900" fontFamily="Orbitron,monospace"
          style={{filter:`drop-shadow(0 0 12px ${col})`}}>{score}</text>
        <text x={cx} y={cy+12} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="JetBrains Mono,monospace" letterSpacing="3">/100</text>
        <text x={cx} y={cy+28} textAnchor="middle" fill={col} fontSize="9" fontFamily="JetBrains Mono,monospace" letterSpacing="2">RISK SCORE</text>
      </svg>
    </div>
  );
};

// ─── Bar Chart ────────────────────────────────────────────────────────────────

const BarChart: FC<{data:{label:string;value:number}[];color?:string}> = ({data,color="#00ffe7"}) => {
  const max=Math.max(...data.map(d=>d.value),1);
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:3,height:72}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,height:"100%",justifyContent:"flex-end"}}>
          <div className="cbar" style={{["--bh" as string]:`${(d.value/max)*64}px`,width:"100%",height:`${(d.value/max)*64}px`,
            background:color,borderRadius:"2px 2px 0 0",
            boxShadow:`0 0 8px ${color}50`,
            animationDelay:`${i*0.03}s`,
            opacity:0.55+(d.value/max)*0.45}}/>
          {d.label&&<span className="jb" style={{fontSize:7,color:"rgba(255,255,255,0.18)",transform:"rotate(-30deg)",transformOrigin:"center"}}>{d.label}</span>}
        </div>
      ))}
    </div>
  );
};

// ─── Terminal Log Row ─────────────────────────────────────────────────────────

const TermRow: FC<{entry:LogEntry}> = ({entry}) => {
  const [vis,setVis]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setVis(true),40);return()=>clearTimeout(t);},[]);
  const lc:Record<LogLevel,string>={
    critical:"#ff2244",high:"#ff8c42",medium:"#ffd700",
    low:"#00bfff",info:"#bf5fff",success:"#39ff14"
  };
  const lp:Record<LogLevel,string>={
    critical:"[CRIT]",high:"[HIGH]",medium:"[WARN]",
    low:"[INFO]",info:"[INFO]",success:"[ OK ]"
  };
  return (
    <div style={{padding:"5px 14px",opacity:vis?1:0,transform:vis?"none":"translateX(-6px)",
      transition:"all 0.25s ease",borderBottom:"1px solid rgba(255,255,255,0.03)",display:"flex",gap:10,alignItems:"flex-start"}}>
      <span className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.2)",flexShrink:0,marginTop:1}}>{entry.timestamp}</span>
      <span className="jb" style={{fontSize:9,color:lc[entry.level],flexShrink:0,fontWeight:"bold",marginTop:1}}>{lp[entry.level]}</span>
      <span style={{fontSize:9,color:"rgba(0,255,231,0.4)",flexShrink:0,marginTop:1,fontFamily:"JetBrains Mono"}}>{entry.source}</span>
      <span className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.62)"}}>{entry.message}
        {entry.detail&&<span style={{color:"rgba(255,255,255,0.28)"}}> — {entry.detail}</span>}
      </span>
    </div>
  );
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const CVES: CVE[] = [
  {id:"CVE-2024-0001",severity:"CRITICAL",cvss:9.8,description:"Remote code execution via buffer overflow in OpenSSL 3.x",status:"OPEN",asset:"api-server-01",discovered:"2025-03-01"},
  {id:"CVE-2024-1234",severity:"CRITICAL",cvss:9.1,description:"SQL injection in authentication endpoint allows full DB dump",status:"IN_PROGRESS",asset:"web-app-prod",discovered:"2025-03-02"},
  {id:"CVE-2023-9999",severity:"HIGH",cvss:8.4,description:"Privilege escalation via misconfigured sudo in Ubuntu 22.04",status:"OPEN",asset:"db-server-02",discovered:"2025-03-03"},
  {id:"CVE-2024-5678",severity:"HIGH",cvss:7.8,description:"SSRF vulnerability in image proxy allows internal network access",status:"IN_PROGRESS",asset:"media-server",discovered:"2025-03-03"},
  {id:"CVE-2024-2048",severity:"HIGH",cvss:7.2,description:"Weak JWT secret enables token forgery and session hijacking",status:"OPEN",asset:"auth-service",discovered:"2025-03-04"},
  {id:"CVE-2023-4567",severity:"MEDIUM",cvss:6.1,description:"XSS in admin panel via unsanitized user input in report fields",status:"PATCHED",asset:"admin-portal",discovered:"2025-03-01"},
  {id:"CVE-2024-3333",severity:"MEDIUM",cvss:5.8,description:"Insecure direct object reference exposes user PII",status:"PATCHED",asset:"web-app-prod",discovered:"2025-03-02"},
  {id:"CVE-2023-8888",severity:"LOW",cvss:3.2,description:"Verbose error messages leak stack traces in production mode",status:"OPEN",asset:"api-server-01",discovered:"2025-03-04"},
];

const ASSETS: Asset[] = [
  {id:1,name:"api-server-01",    ip:"10.0.1.10",type:"Server",  status:"VULNERABLE",risk:88,lastScan:"2025-03-05 14:00",openPorts:[22,80,443,8080,3000]},
  {id:2,name:"web-app-prod",     ip:"10.0.1.11",type:"WebApp",  status:"VULNERABLE",risk:74,lastScan:"2025-03-05 13:55",openPorts:[80,443]},
  {id:3,name:"db-server-02",     ip:"10.0.2.10",type:"Database",status:"VULNERABLE",risk:65,lastScan:"2025-03-05 13:30",openPorts:[3306,22]},
  {id:4,name:"auth-service",     ip:"10.0.1.12",type:"Service", status:"SCANNING",  risk:42,lastScan:"2025-03-05 14:22",openPorts:[443,8443]},
  {id:5,name:"media-server",     ip:"10.0.3.10",type:"Server",  status:"VULNERABLE",risk:58,lastScan:"2025-03-05 12:00",openPorts:[80,443,8888]},
  {id:6,name:"admin-portal",     ip:"10.0.1.20",type:"WebApp",  status:"SECURE",    risk:18,lastScan:"2025-03-05 11:00",openPorts:[443]},
  {id:7,name:"vpn-gateway",      ip:"10.0.0.1", type:"Network", status:"SECURE",    risk:12,lastScan:"2025-03-05 10:00",openPorts:[1194,443]},
  {id:8,name:"backup-server",    ip:"10.0.4.10",type:"Server",  status:"OFFLINE",   risk:0, lastScan:"2025-03-04 22:00",openPorts:[]},
];

const WEEKLY_VULNS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((l,i)=>({label:l,value:Math.floor(12+Math.random()*30+(i===2?20:0)+(i===4?15:0))}));
const SEVERITY_DIST = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((l,i)=>({label:l,value:Math.floor(3+Math.random()*12)}));

const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  if(ua.includes("Edg/")) browser="Microsoft Edge";
  else if(ua.includes("OPR/") || ua.includes("Opera")) browser="Opera";
  else if(ua.includes("Chrome/") && !ua.includes("Chromium/")) browser="Chrome";
  else if(ua.includes("Chromium/")) browser="Chromium";
  else if(ua.includes("Firefox/")) browser="Firefox";
  else if(ua.includes("Safari/") && !ua.includes("Chrome/")) browser="Safari";
  return browser;
};

const sevColor = (s:CVE["severity"]) => ({CRITICAL:"#ff2244",HIGH:"#ff8c42",MEDIUM:"#ffd700",LOW:"#00bfff"}[s]);
const statusColor = (s:Asset["status"]) => ({SECURE:"#39ff14",VULNERABLE:"#ff2244",SCANNING:"#ffd700",OFFLINE:"rgba(255,255,255,0.2)"}[s]);
const riskColor = (n:number) => n>75?"#ff2244":n>50?"#ff8c42":n>25?"#ffd700":"#39ff14";
const fmtT = (d:Date) => [d.getHours(),d.getMinutes(),d.getSeconds()].map(n=>String(n).padStart(2,"0")).join(":");

const INIT_LOGS: LogEntry[] = [
  {id:1,  level:"critical",timestamp:"14:22:01",source:"ids/core",    message:"Intrusion attempt detected on api-server-01",detail:"SYN flood from 185.234.x.x"},
  {id:2,  level:"high",    timestamp:"14:21:44",source:"scanner",     message:"Critical CVE-2024-0001 confirmed exploitable"},
  {id:3,  level:"success", timestamp:"14:20:12",source:"firewall",    message:"Blocked 47 suspicious IPs",detail:"Auto-blacklist triggered"},
  {id:4,  level:"medium",  timestamp:"14:18:55",source:"auth",        message:"Brute-force attempt detected",detail:"User: admin — 214 fails"},
  {id:5,  level:"info",    timestamp:"14:17:33",source:"scanner",     message:"Full scan initiated on 10.0.0.0/24"},
  {id:6,  level:"high",    timestamp:"14:15:09",source:"waf",         message:"SQL injection payload blocked",detail:"POST /api/users — param: id"},
  {id:7,  level:"success", timestamp:"14:12:00",source:"patcher",     message:"CVE-2023-4567 patched on admin-portal"},
  {id:8,  level:"info",    timestamp:"14:10:41",source:"nmap",        message:"Port scan complete — 8 hosts alive",detail:"5 with open vulnerabilities"},
];
const STREAM_LOGS: Omit<LogEntry,"id"|"timestamp">[] = [
  {level:"critical",source:"ids/core",    message:"Port scan detected from 192.168.x.x",detail:"TCP SYN to 1024+ ports"},
  {level:"high",    source:"waf",         message:"XSS payload in request headers blocked"},
  {level:"medium",  source:"auth",        message:"Unusual login time for user root",detail:"03:14 UTC — geolocation mismatch"},
  {level:"success", source:"firewall",    message:"GeoIP rule applied — CN block active"},
  {level:"info",    source:"scanner",     message:"Vulnerability rescan scheduled — 15:00 UTC"},
  {level:"high",    source:"ids/net",     message:"C2 beacon pattern detected",detail:"Domain: update-kb.xyz → blacklisted"},
  {level:"low",     source:"siem",        message:"Log volume spike — ingesting 14k/min"},
  {level:"critical",source:"exploit-db",  message:"PoC released for CVE-2024-1234",detail:"Immediate patching required"},
];

// ─── Main ─────────────────────────────────────────────────────────────────────

const AdminPanel: FC = () => {
  const [tab,       setTab]       = useState<TabId>("overview");
  const [now,       setNow]       = useState(new Date());
  const [ipInfo,    setIpInfo]    = useState<IpInfo|null>(null);
  const [clientInfo,setClientInfo]= useState<ClientInfo|null>(null);
  const [ipLoad,    setIpLoad]    = useState(true);
  const [filter,    setFilter]    = useState("");
  const [sortCol,   setSortCol]   = useState<string>("cvss");
  const [sortDir,   setSortDir]   = useState<SortDir>("desc");
  const [expandRow, setExpandRow] = useState<string|null>(null);
  const [logs,      setLogs]      = useState<LogEntry[]>(INIT_LOGS);
  const [riskScore] = useState(72);
  const [scanActive,setScanActive]= useState(false);
  const [scanProg,  setScanProg]  = useState(0);

  const [spark] = useState<Record<string,number[]>>({
    threats: Array.from({length:40},()=>Math.random()*80+10),
    traffic: Array.from({length:40},()=>Math.random()*60+20),
    blocked: Array.from({length:40},()=>Math.random()*40+5),
  });
  const [liveSpark, setLiveSpark] = useState(spark);

  useEffect(()=>{const id=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(id);},[]);

  // Fetch client info
  useEffect(()=>{
    const info:ClientInfo = {
      ip:"Resolving...",
      browser:getBrowserInfo(),
      platform:navigator.platform,
      language:navigator.language,
      online:navigator.onLine,
      userAgent:navigator.userAgent,
      screenRes:`${screen.width}×${screen.height}`,
      timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookiesEnabled:navigator.cookieEnabled,
      doNotTrack:navigator.doNotTrack==="1",
    };
    setClientInfo(info);

    (async()=>{
      try {
        const {ip} = await fetch("https://api.ipify.org?format=json").then(r=>r.json()) as {ip:string};
        const geo  = await fetch(`https://ipapi.co/${ip}/json/`).then(r=>r.json()) as IpInfo;
        setIpInfo({...geo,ip});
        setClientInfo(prev=>prev?{...prev,ip}:null);
      } catch {
        try {
          const d = await fetch("https://ipapi.co/json/").then(r=>r.json()) as IpInfo;
          setIpInfo(d);
          setClientInfo(prev=>prev?{...prev,ip:d.ip}:null);
        } catch {
          setIpInfo({ip:"Unavailable",country_name:"—",country_code:"—",city:"—",org:"—",timezone:"—"});
        }
      } finally { setIpLoad(false); }
    })();
  },[]);

  // Live sparklines
  useEffect(()=>{
    const id=setInterval(()=>setLiveSpark(s=>({
      threats:[...s.threats.slice(1),Math.random()*80+10],
      traffic:[...s.traffic.slice(1),Math.random()*60+20],
      blocked:[...s.blocked.slice(1),Math.random()*40+5],
    })),1100);
    return()=>clearInterval(id);
  },[]);

  // Stream logs
  useEffect(()=>{
    const id=setInterval(()=>{
      const m=STREAM_LOGS[Math.floor(Math.random()*STREAM_LOGS.length)];
      const ts=fmtT(new Date());
      setLogs(l=>[{id:Date.now(),...m,timestamp:ts},...l.slice(0,49)]);
    },3500);
    return()=>clearInterval(id);
  },[]);

  // Scan simulation
  const runScan = () => {
    if(scanActive) return;
    setScanActive(true);setScanProg(0);
    const id=setInterval(()=>setScanProg(p=>{if(p>=100){clearInterval(id);setScanActive(false);return 100;}return p+Math.random()*6+1;}),200);
  };

  const handleSort=(col:string)=>{if(sortCol===col)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortCol(col);setSortDir("desc");}};

  const filteredCVEs = CVES
    .filter(v=>!filter.trim()||Object.values(v).some(val=>String(val).toLowerCase().includes(filter.toLowerCase())))
    .sort((a,b)=>{
      const av=a[sortCol as keyof CVE],bv=b[sortCol as keyof CVE];
      if(typeof av==="number"&&typeof bv==="number") return sortDir==="asc"?av-bv:bv-av;
      return sortDir==="asc"?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av));
    });

  const stats: StatItem[] = [
    {label:"TOTAL VULNS",     value:CVES.length,                                        color:"#ff2244",icon:"⚠",sub:"all findings"},
    {label:"CRITICAL",        value:CVES.filter(c=>c.severity==="CRITICAL").length,      color:"#ff2244",icon:"☢",sub:"immediate action",trend:"↑2"},
    {label:"HIGH SEVERITY",   value:CVES.filter(c=>c.severity==="HIGH").length,          color:"#ff8c42",icon:"▲",sub:"high priority"},
    {label:"ACTIVE SCANS",    value:scanActive?"1":"0",                                  color:"#ffd700",icon:"◎",sub:"in progress"},
    {label:"ASSETS MONITORED",value:ASSETS.length,                                       color:"#00ffe7",icon:"◈",sub:"endpoints"},
    {label:"RESOLVED",        value:CVES.filter(c=>c.status==="PATCHED").length,         color:"#39ff14",icon:"✓",sub:"patched CVEs"},
    {label:"RISK SCORE",      value:`${riskScore}/100`,                                  color:"#ff8c42",icon:"⬡",sub:"overall posture"},
    {label:"BLOCKED TODAY",   value:"1,247",                                             color:"#bf5fff",icon:"⊘",sub:"firewall events"},
  ];

  const gap="clamp(10px,1.8vw,18px)";
  const critCount = CVES.filter(c=>c.severity==="CRITICAL").length;

  return (
    <>
      <style>{CSS}</style>

      {/* BG layers */}
      <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",background:"#020810"}}>
        <MatrixRain opacity={0.05}/>
        <div style={{position:"absolute",top:"-20%",left:"5%",width:"70vw",height:"70vw",maxWidth:900,maxHeight:900,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,231,0.045) 0%,transparent 60%)",filter:"blur(120px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-15%",right:"-5%",width:"60vw",height:"60vw",maxWidth:700,maxHeight:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,34,68,0.035) 0%,transparent 60%)",filter:"blur(100px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"40%",left:"-8%",width:"50vw",height:"50vw",maxWidth:560,maxHeight:560,borderRadius:"50%",background:"radial-gradient(circle,rgba(191,95,255,0.025) 0%,transparent 60%)",filter:"blur(100px)",pointerEvents:"none"}}/>
      </div>

      <div className="scanlines hex-bg" style={{position:"relative",zIndex:1,minHeight:"100vh",overflowX:"hidden"}}>
        <div className="scan-beam"/>

        {/* ── HEADER ── */}
        <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(1,4,12,0.97)",backdropFilter:"blur(32px)",
          borderBottom:"1px solid rgba(0,255,231,0.08)",
          padding:"0 clamp(14px,3vw,32px)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,height:56}}>

          <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
            {critCount>0
              ?<div className="dot-red" style={{width:9,height:9,borderRadius:"50%",background:"#ff2244"}}/>
              :<div className="dot-live" style={{width:9,height:9,borderRadius:"50%",background:"#39ff14"}}/>
            }
            <div style={{position:"relative"}}>
              <span className="orb glow-c" style={{fontSize:"clamp(12px,2.2vw,15px)",letterSpacing:"0.2em",color:"var(--c)",fontWeight:900}}>VAPT</span>
              <span className="glitch-layer orb" style={{fontSize:"clamp(12px,2.2vw,15px)",fontWeight:900,letterSpacing:"0.2em"}} aria-hidden>VAPT</span>
            </div>
            <div style={{width:1,height:20,background:"rgba(0,255,231,0.15)"}}/>
            <span className="jb hide-sm" style={{fontSize:"clamp(9px,1.4vw,11px)",color:"rgba(255,255,255,0.22)",letterSpacing:"0.16em"}}>SECURITY OPERATIONS CENTER</span>
          </div>

          {/* Alert banner */}
          {critCount>0&&(
            <div className="hide-sm" style={{display:"flex",alignItems:"center",gap:8,padding:"5px 14px",borderRadius:6,
              background:"rgba(255,34,68,0.08)",border:"1px solid rgba(255,34,68,0.25)"}}>
              <div className="dot-red" style={{width:6,height:6,borderRadius:"50%",background:"#ff2244"}}/>
              <span className="jb" style={{fontSize:9,color:"#ff2244",letterSpacing:"0.1em"}}>
                {critCount} CRITICAL VULNERABILITIES ACTIVE
              </span>
            </div>
          )}

          <nav style={{display:"flex",gap:3}}>
            {([["overview","[ OVERVIEW ]"],["threats","[ THREATS ]"],["network","[ NETWORK ]"],["logs","[ LOGS ]"]] as [TabId,string][]).map(([id,lbl])=>(
              <button key={id} className={`nav-tab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{lbl}</button>
            ))}
          </nav>

          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            {!ipLoad&&ipInfo&&(
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 11px",borderRadius:6,
                background:"rgba(0,255,231,0.05)",border:"1px solid rgba(0,255,231,0.15)"}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"#39ff14",boxShadow:"0 0 6px #39ff14"}}/>
                <span className="jb" style={{fontSize:10,color:"var(--c)",letterSpacing:"0.04em"}}>{ipInfo.ip}</span>
              </div>
            )}
            <span className="jb" style={{fontSize:"clamp(10px,1.8vw,13px)",color:"var(--c)",letterSpacing:"0.08em",fontWeight:"bold"}}>{fmtT(now)}</span>
          </div>
        </header>

        {/* ── MAIN ── */}
        <main style={{maxWidth:1480,margin:"0 auto",padding:`${gap} clamp(14px,3vw,32px) 56px`}}>

          {/* ═══════════════ OVERVIEW ═══════════════ */}
          {tab==="overview"&&(
            <div style={{display:"flex",flexDirection:"column",gap}} className="fade-up">

              {/* Title */}
              <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                <div>
                  <div style={{position:"relative",display:"inline-block"}}>
                    <span className="orb glow-c" style={{fontSize:"clamp(18px,4vw,32px)",fontWeight:900,color:"var(--c)",lineHeight:1.1,letterSpacing:"0.05em"}}>
                      SECURITY OPERATIONS CENTER
                    </span>
                    <span className="glitch-layer orb" style={{fontSize:"clamp(18px,4vw,32px)",fontWeight:900,lineHeight:1.1,letterSpacing:"0.05em"}} aria-hidden>
                      SECURITY OPERATIONS CENTER
                    </span>
                  </div>
                  <p className="jb" style={{fontSize:9,marginTop:6,letterSpacing:"0.22em",color:"rgba(255,255,255,0.15)"}}>
                    VAPT DASHBOARD · LIVE THREAT MONITORING · VULNERABILITY TRACKING
                  </p>
                </div>
                {/* Scan button */}
                <button onClick={runScan} disabled={scanActive}
                  style={{padding:"9px 20px",borderRadius:6,cursor:scanActive?"not-allowed":"pointer",
                    border:`1px solid ${scanActive?"rgba(255,215,0,0.3)":"rgba(0,255,231,0.3)"}`,
                    background:scanActive?"rgba(255,215,0,0.07)":"rgba(0,255,231,0.06)",
                    color:scanActive?"#ffd700":"var(--c)",
                    fontFamily:"JetBrains Mono",fontSize:10,letterSpacing:"0.12em",
                    transition:"all 0.2s",boxShadow:scanActive?"0 0 14px rgba(255,215,0,0.1)":"0 0 14px rgba(0,255,231,0.07)"}}>
                  {scanActive?`◎ SCANNING ${Math.floor(scanProg)}%`:"▶ RUN FULL SCAN"}
                </button>
              </div>

              {/* Scan progress */}
              {scanActive&&(
                <div className="panel" style={{padding:"10px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span className="jb" style={{fontSize:9,color:"#ffd700",letterSpacing:"0.12em"}}>◎ ACTIVE SCAN — 10.0.0.0/24</span>
                    <span className="jb" style={{fontSize:9,color:"#ffd700"}}>{Math.floor(scanProg)}%</span>
                  </div>
                  <div className="pbar" style={{height:4}}>
                    <div className="pfill" style={{width:`${scanProg}%`,background:"linear-gradient(90deg,#00ffe7,#ffd700)",boxShadow:"0 0 8px #ffd70060"}}/>
                  </div>
                </div>
              )}

              {/* Stats grid */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(148px,calc(50% - 6px)),1fr))",gap:8}} className="fd1">
                {stats.map((s,i)=>(
                  <div key={s.label} className="stat-card" style={{borderColor:s.color+"22",padding:"12px 14px",animationDelay:`${i*0.04}s`}}>
                    <div style={{position:"absolute",inset:0,borderRadius:8,background:`radial-gradient(circle at top right,${s.color}08,transparent 65%)`,pointerEvents:"none"}}/>
                    <div style={{position:"relative"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                        <span style={{fontSize:14,color:s.color,filter:`drop-shadow(0 0 4px ${s.color})`}}>{s.icon}</span>
                        {s.trend&&<span className="jb" style={{fontSize:8,color:"#ff8c42"}}>{s.trend}</span>}
                      </div>
                      <div className="jb" style={{fontSize:"clamp(14px,2.8vw,22px)",fontWeight:"bold",color:s.color,lineHeight:1}}>{s.value}</div>
                      <div className="jb" style={{fontSize:7,letterSpacing:"0.1em",marginTop:5,color:s.color+"55"}}>{s.label}</div>
                      <div className="jb" style={{fontSize:7,color:"rgba(255,255,255,0.2)",marginTop:2}}>{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Risk ring + Sparklines */}
              <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap,alignItems:"stretch"}} className="fd2">
                <div className="panel" style={{padding:"clamp(14px,2.5vw,22px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
                  <RiskRing score={riskScore}/>
                  <div style={{textAlign:"center"}}>
                    <div className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:"0.14em"}}>OVERALL SECURITY POSTURE</div>
                    <div className="jb" style={{fontSize:8,color:"#ff8c42",marginTop:3}}>HIGH RISK — IMMEDIATE ACTION</div>
                  </div>
                </div>

                <div style={{display:"grid",gridTemplateRows:"1fr 1fr 1fr",gap:8}}>
                  {([
                    {key:"threats",color:"#ff2244",label:"ACTIVE THREATS",unit:"/hr"},
                    {key:"traffic", color:"#00ffe7",label:"NETWORK TRAFFIC",unit:"MB/s"},
                    {key:"blocked", color:"#39ff14", label:"EVENTS BLOCKED", unit:"/min"},
                  ] as {key:string;color:string;label:string;unit:string}[]).map(s=>(
                    <div key={s.key} className="panel" style={{padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                          <span className="jb" style={{fontSize:8,letterSpacing:"0.12em",color:s.color}}>{s.label}</span>
                          <span className="jb" style={{fontSize:12,color:s.color,fontWeight:"bold"}}>
                            {Math.round(liveSpark[s.key][liveSpark[s.key].length-1]??0)}<span style={{fontSize:7,opacity:0.5}}>{s.unit}</span>
                          </span>
                        </div>
                        <Sparkline data={liveSpark[s.key]??[]} color={s.color} height={36}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top CVEs + Radar + Feed */}
              <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap}} className="fd3">
                {/* Critical CVEs quick view */}
                <div className="panel panel-r" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div className="dot-red" style={{width:7,height:7,borderRadius:"50%",background:"#ff2244"}}/>
                      <span className="jb" style={{fontSize:9,letterSpacing:"0.14em",color:"#ff2244"}}>CRITICAL VULNERABILITIES</span>
                    </div>
                    <span className="jb" style={{fontSize:9,color:"#ff2244",fontWeight:"bold"}}>{critCount} OPEN</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {CVES.filter(c=>c.severity==="CRITICAL").map(c=>(
                      <div key={c.id} style={{padding:"9px 11px",borderRadius:6,background:"rgba(255,34,68,0.05)",border:"1px solid rgba(255,34,68,0.15)"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                          <span className="jb" style={{fontSize:9,color:"#ff2244",fontWeight:"bold"}}>{c.id}</span>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span className="jb" style={{fontSize:9,color:"#ff8c42"}}>CVSS {c.cvss}</span>
                            <span className="jb" style={{fontSize:8,padding:"1px 6px",borderRadius:3,background:"rgba(255,34,68,0.15)",border:"1px solid rgba(255,34,68,0.3)",color:"#ff2244"}}>{c.status}</span>
                          </div>
                        </div>
                        <div className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.45)",lineHeight:1.5}}>{c.description.slice(0,65)}…</div>
                        <div className="jb" style={{fontSize:8,color:"rgba(255,255,255,0.22)",marginTop:4}}>target: {c.asset}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Radar */}
                <div className="panel" style={{padding:"clamp(14px,2.5vw,22px)",display:"flex",flexDirection:"column",alignItems:"center",gap:12,minWidth:200}}>
                  <span className="jb" style={{fontSize:8,letterSpacing:"0.16em",color:"var(--c)",alignSelf:"flex-start"}}>THREAT RADAR</span>
                  <Radar/>
                  <div className="jb" style={{fontSize:8,color:"rgba(255,255,255,0.18)",textAlign:"center",letterSpacing:"0.1em"}}>SCANNING ACTIVE NODES</div>
                  <div style={{display:"flex",flexDirection:"column",gap:5,width:"100%"}}>
                    {([["CRITICAL","#ff2244"],["HIGH","#ff8c42"],["MEDIUM","#ffd700"]] as [string,string][]).map(([l,c])=>(
                      <div key={l} style={{display:"flex",alignItems:"center",gap:7}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:c,boxShadow:`0 0 5px ${c}`}}/>
                        <span className="jb" style={{fontSize:8,color:"rgba(255,255,255,0.3)"}}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly vuln chart */}
                <div className="panel panel-y" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <span className="jb" style={{fontSize:9,letterSpacing:"0.14em",color:"var(--y)"}}>VULNERABILITIES — 7 DAYS</span>
                    <span className="jb" style={{fontSize:8,padding:"2px 8px",borderRadius:3,border:"1px solid rgba(255,215,0,0.3)",background:"rgba(255,215,0,0.08)",color:"#ffd700"}}>WEEKLY</span>
                  </div>
                  <BarChart data={WEEKLY_VULNS} color="#ff8c42"/>
                  <div style={{height:12}}/>
                  <BarChart data={SEVERITY_DIST} color="#ff2244"/>
                  <div style={{display:"flex",gap:14,marginTop:10}}>
                    <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:3,background:"#ff8c42",borderRadius:1}}/><span className="jb" style={{fontSize:7,color:"rgba(255,255,255,0.3)"}}>ALL VULNS</span></div>
                    <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:3,background:"#ff2244",borderRadius:1}}/><span className="jb" style={{fontSize:7,color:"rgba(255,255,255,0.3)"}}>CRITICAL</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ THREATS / CVEs ═══════════════ */}
          {tab==="threats"&&(
            <div style={{display:"flex",flexDirection:"column",gap}} className="fade-up">
              <div style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {(["CRITICAL","HIGH","MEDIUM","LOW"] as CVE["severity"][]).map(s=>(
                    <span key={s} className="badge" style={{...({
                      CRITICAL:{color:"#ff2244",borderColor:"#ff224440",background:"#ff22440f"},
                      HIGH:    {color:"#ff8c42",borderColor:"#ff8c4240",background:"#ff8c420f"},
                      MEDIUM:  {color:"#ffd700",borderColor:"#ffd70040",background:"#ffd7000f"},
                      LOW:     {color:"#00bfff",borderColor:"#00bfff40",background:"#00bfff0f"},
                    }[s]),fontSize:9}}>
                      ◆ {CVES.filter(c=>c.severity===s).length} {s}
                    </span>
                  ))}
                </div>
                <input type="text" placeholder="🔍  Search CVE, asset, description..." value={filter} onChange={e=>setFilter(e.target.value)} className="sinput" style={{maxWidth:360}}/>
              </div>

              <div className="panel panel-r" style={{overflow:"hidden"}}>
                <div style={{overflowX:"auto",maxHeight:"clamp(340px,58vh,620px)"}}>
                  <table className="dtable" style={{minWidth:900}}>
                    <thead><tr>
                      {(["CVE ID","SEVERITY","CVSS","DESCRIPTION","ASSET","STATUS","DISCOVERED"] as const).map(h=>(
                        <th key={h} onClick={()=>handleSort(h.toLowerCase().replace(/ /g,""))} style={{color:sortCol===h.toLowerCase().replace(/ /g,"")?"var(--c)":"rgba(255,255,255,0.22)"}}>
                          {h}{sortCol===h.toLowerCase().replace(/ /g,"")?(sortDir==="asc"?" ↑":" ↓"):""}
                        </th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {filteredCVEs.map(v=>(
                        <>
                          <tr key={v.id} onClick={()=>setExpandRow(expandRow===v.id?null:v.id)}
                            style={{background:expandRow===v.id?"rgba(255,34,68,0.04)":"transparent"}}>
                            <td><span className="jb" style={{fontSize:10,fontWeight:"bold",color:"var(--c)"}}>{v.id}</span></td>
                            <td>
                              <span className={`badge badge-${v.severity.toLowerCase()}`}>{v.severity}</span>
                            </td>
                            <td><span className="jb" style={{fontSize:11,fontWeight:"bold",color:sevColor(v.severity)}}>{v.cvss}</span></td>
                            <td className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.52)",maxWidth:260,overflow:"hidden",textOverflow:"ellipsis"}}>{v.description}</td>
                            <td><span className="jb" style={{fontSize:9,color:"#bf5fff"}}>{v.asset}</span></td>
                            <td>
                              <span className="jb" style={{fontSize:8,padding:"2px 7px",borderRadius:3,border:"1px solid",
                                color:v.status==="PATCHED"?"#39ff14":v.status==="IN_PROGRESS"?"#ffd700":"#ff2244",
                                borderColor:v.status==="PATCHED"?"#39ff1430":v.status==="IN_PROGRESS"?"#ffd70030":"#ff224430",
                                background:v.status==="PATCHED"?"#39ff1408":v.status==="IN_PROGRESS"?"#ffd70008":"#ff22440a"}}>
                                {v.status}
                              </span>
                            </td>
                            <td className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.28)"}}>{v.discovered}</td>
                          </tr>
                          {expandRow===v.id&&(
                            <tr key={`${v.id}-exp`}>
                              <td colSpan={7} style={{padding:"12px 14px 16px",background:"rgba(255,34,68,0.025)"}}>
                                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
                                  {[
                                    {label:"FULL CVE ID",  value:v.id},
                                    {label:"CVSS SCORE",   value:`${v.cvss} / 10.0`},
                                    {label:"SEVERITY",     value:v.severity},
                                    {label:"STATUS",       value:v.status},
                                    {label:"TARGET ASSET", value:v.asset},
                                    {label:"DISCOVERED",   value:v.discovered},
                                  ].map(r=>(
                                    <div key={r.label} style={{padding:"8px 10px",borderRadius:6,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.05)"}}>
                                      <div className="jb" style={{fontSize:7,letterSpacing:"0.1em",color:"rgba(255,255,255,0.2)",marginBottom:3}}>{r.label}</div>
                                      <div className="jb" style={{fontSize:10,color:"rgba(0,255,231,0.7)"}}>{r.value}</div>
                                    </div>
                                  ))}
                                  <div style={{gridColumn:"1/-1",padding:"8px 10px",borderRadius:6,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
                                    <div className="jb" style={{fontSize:7,letterSpacing:"0.1em",color:"rgba(255,255,255,0.2)",marginBottom:3}}>DESCRIPTION</div>
                                    <div className="jb" style={{fontSize:10,color:"rgba(255,255,255,0.55)",lineHeight:1.6}}>{v.description}</div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ NETWORK / ASSETS ═══════════════ */}
          {tab==="network"&&(
            <div style={{display:"flex",flexDirection:"column",gap}} className="fade-up">

              {/* Client info banner */}
              <div className="panel" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"var(--c)",boxShadow:"0 0 8px var(--c)"}}/>
                  <span className="jb" style={{fontSize:9,letterSpacing:"0.18em",color:"var(--c)"}}>YOUR CLIENT FINGERPRINT</span>
                  <span className="jb" style={{fontSize:8,padding:"2px 8px",borderRadius:3,border:"1px solid rgba(57,255,20,0.3)",background:"rgba(57,255,20,0.07)",color:"#39ff14"}}>LIVE DETECTION</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(200px,calc(50% - 6px)),1fr))",gap:10}}>
                  {[
                    {label:"PUBLIC IP",      value:ipLoad?"Resolving...":(ipInfo?.ip??"—"),       color:"var(--c)"},
                    {label:"BROWSER",        value:clientInfo?.browser??"—",                       color:"#00bfff"},
                    {label:"PLATFORM",       value:clientInfo?.platform??"—",                      color:"#bf5fff"},
                    {label:"LANGUAGE",       value:clientInfo?.language??"—",                      color:"#ffd700"},
                    {label:"ONLINE STATUS",  value:clientInfo?.online?"ONLINE":"OFFLINE",         color:clientInfo?.online?"#39ff14":"#ff2244"},
                    {label:"SCREEN RES",     value:clientInfo?.screenRes??"—",                     color:"#ff8c42"},
                    {label:"TIMEZONE",       value:clientInfo?.timezone??"—",                      color:"#00ffe7"},
                    {label:"COOKIES",        value:clientInfo?.cookiesEnabled?"ENABLED":"DISABLED",color:clientInfo?.cookiesEnabled?"#39ff14":"#ff2244"},
                    {label:"DO NOT TRACK",   value:clientInfo?.doNotTrack?"ACTIVE":"INACTIVE",    color:clientInfo?.doNotTrack?"#39ff14":"#ff8c42"},
                    {label:"COUNTRY",        value:ipInfo?.country_name??"—",                      color:"#39ff14"},
                    {label:"CITY",           value:ipInfo?.city??"—",                              color:"#00bfff"},
                    {label:"ISP / ORG",      value:ipInfo?.org??"—",                               color:"#bf5fff"},
                  ].map(r=>(
                    <div key={r.label} style={{padding:"10px 13px",borderRadius:7,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)"}}>
                      <div className="jb" style={{fontSize:7,letterSpacing:"0.12em",color:"rgba(255,255,255,0.2)",marginBottom:4}}>{r.label}</div>
                      <div className="jb" style={{fontSize:11,fontWeight:"bold",color:r.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.value}</div>
                    </div>
                  ))}
                </div>
                {clientInfo?.userAgent&&(
                  <div style={{marginTop:10,padding:"9px 13px",borderRadius:7,background:"rgba(255,255,255,0.018)",border:"1px solid rgba(255,255,255,0.05)"}}>
                    <div className="jb" style={{fontSize:7,letterSpacing:"0.12em",color:"rgba(255,255,255,0.2)",marginBottom:4}}>USER AGENT</div>
                    <div className="jb" style={{fontSize:9,color:"rgba(0,255,231,0.45)",wordBreak:"break-all",lineHeight:1.6}}>{clientInfo.userAgent}</div>
                  </div>
                )}
              </div>

              {/* Assets table */}
              <div className="panel panel-y" style={{overflow:"hidden"}}>
                <div style={{padding:"14px 16px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span className="jb" style={{fontSize:9,letterSpacing:"0.14em",color:"var(--y)"}}>◈ MONITORED ASSETS — {ASSETS.length} ENDPOINTS</span>
                  <div style={{display:"flex",gap:8}}>
                    {(["SECURE","VULNERABLE","SCANNING","OFFLINE"] as Asset["status"][]).map(s=>(
                      <span key={s} className="jb" style={{fontSize:8,color:statusColor(s)}}>{ASSETS.filter(a=>a.status===s).length} {s}</span>
                    ))}
                  </div>
                </div>
                <div style={{overflowX:"auto"}}>
                  <table className="dtable" style={{minWidth:820}}>
                    <thead><tr>
                      {["ASSET","IP ADDRESS","TYPE","STATUS","RISK SCORE","OPEN PORTS","LAST SCAN"].map(h=>(
                        <th key={h}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {ASSETS.map(a=>(
                        <tr key={a.id}>
                          <td><span className="jb" style={{fontSize:10,fontWeight:"bold",color:"var(--c)"}}>{a.name}</span></td>
                          <td><span className="jb" style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>{a.ip}</span></td>
                          <td><span className="jb" style={{fontSize:9,color:"#bf5fff"}}>{a.type}</span></td>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:6}}>
                              <div style={{width:6,height:6,borderRadius:"50%",background:statusColor(a.status),boxShadow:`0 0 5px ${statusColor(a.status)}`}}/>
                              <span className="jb" style={{fontSize:9,color:statusColor(a.status)}}>{a.status}</span>
                            </div>
                          </td>
                          <td>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div className="pbar" style={{width:60}}>
                                <div className="pfill" style={{width:`${a.risk}%`,background:riskColor(a.risk),boxShadow:`0 0 5px ${riskColor(a.risk)}50`}}/>
                              </div>
                              <span className="jb" style={{fontSize:10,fontWeight:"bold",color:riskColor(a.risk)}}>{a.risk}</span>
                            </div>
                          </td>
                          <td>
                            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              {a.openPorts.map(p=>(
                                <span key={p} className="jb" style={{fontSize:8,padding:"1px 5px",borderRadius:3,
                                  background:"rgba(0,255,231,0.06)",border:"1px solid rgba(0,255,231,0.12)",color:"rgba(0,255,231,0.55)"}}>{p}</span>
                              ))}
                              {a.openPorts.length===0&&<span className="jb" style={{fontSize:8,color:"rgba(255,255,255,0.18)"}}>—</span>}
                            </div>
                          </td>
                          <td className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.28)"}}>{a.lastScan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Risk breakdown */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px),1fr))",gap}}>
                <div className="panel panel-r" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <span className="jb" style={{fontSize:9,letterSpacing:"0.14em",color:"#ff2244",display:"block",marginBottom:14}}>⬡ ASSET RISK RANKING</span>
                  {ASSETS.slice().sort((a,b)=>b.risk-a.risk).map((a,i)=>(
                    <div key={a.id} style={{marginBottom:11}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <span className="jb" style={{fontSize:8,color:"rgba(255,255,255,0.2)",width:12}}>{i+1}</span>
                          <span className="jb" style={{fontSize:10,fontWeight:"bold",color:"var(--c)"}}>{a.name}</span>
                        </div>
                        <span className="jb" style={{fontSize:10,fontWeight:"bold",color:riskColor(a.risk)}}>{a.risk}</span>
                      </div>
                      <div className="pbar" style={{marginLeft:19}}>
                        <div className="pfill" style={{width:`${a.risk}%`,background:riskColor(a.risk),boxShadow:`0 0 5px ${riskColor(a.risk)}60`}}/>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="panel panel-g" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <span className="jb" style={{fontSize:9,letterSpacing:"0.14em",color:"var(--g)",display:"block",marginBottom:14}}>✓ REMEDIATION STATUS</span>
                  {[
                    {label:"CRITICAL — Patched",value:CVES.filter(c=>c.severity==="CRITICAL"&&c.status==="PATCHED").length,total:critCount,color:"#ff2244"},
                    {label:"HIGH — Patched",     value:CVES.filter(c=>c.severity==="HIGH"&&c.status==="PATCHED").length,    total:CVES.filter(c=>c.severity==="HIGH").length,    color:"#ff8c42"},
                    {label:"MEDIUM — Patched",   value:CVES.filter(c=>c.severity==="MEDIUM"&&c.status==="PATCHED").length,  total:CVES.filter(c=>c.severity==="MEDIUM").length,  color:"#ffd700"},
                    {label:"LOW — Patched",      value:CVES.filter(c=>c.severity==="LOW"&&c.status==="PATCHED").length,     total:CVES.filter(c=>c.severity==="LOW").length,     color:"#00bfff"},
                  ].map(r=>(
                    <div key={r.label} style={{marginBottom:14}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <span className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>{r.label}</span>
                        <span className="jb" style={{fontSize:9,color:r.color}}>{r.value}/{r.total}</span>
                      </div>
                      <div className="pbar">
                        <div className="pfill" style={{width:`${r.total>0?(r.value/r.total)*100:0}%`,background:r.color,boxShadow:`0 0 5px ${r.color}50`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ LOGS / TERMINAL ═══════════════ */}
          {tab==="logs"&&(
            <div style={{display:"flex",flexDirection:"column",gap}} className="fade-up">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div className="dot-red" style={{width:8,height:8,borderRadius:"50%",background:"#ff2244"}}/>
                  <span className="orb" style={{fontSize:"clamp(14px,2.5vw,20px)",fontWeight:900,color:"var(--c)",letterSpacing:"0.1em"}}>SIEM EVENT LOG</span>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {(["critical","high","medium","low","info","success"] as LogLevel[]).map(l=>{
                    const lc:Record<LogLevel,string>={critical:"#ff2244",high:"#ff8c42",medium:"#ffd700",low:"#00bfff",info:"#bf5fff",success:"#39ff14"};
                    return <span key={l} className="jb" style={{fontSize:8,padding:"2px 8px",borderRadius:3,border:`1px solid ${lc[l]}30`,background:`${lc[l]}0a`,color:lc[l]}}>
                      {logs.filter(lg=>lg.level===l).length} {l.toUpperCase()}
                    </span>;
                  })}
                </div>
              </div>

              <div className="terminal" style={{maxHeight:"clamp(420px,65vh,720px)"}}>
                <div className="t-header">
                  <div className="t-dot" style={{background:"#ff5f56"}}/>
                  <div className="t-dot" style={{background:"#ffbd2e"}}/>
                  <div className="t-dot" style={{background:"#27c93f"}}/>
                  <span className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.2)",marginLeft:8,letterSpacing:"0.12em"}}>soc@vapt-console:~$ tail -f /var/log/siem.log</span>
                  <span className="jb tcursor" style={{marginLeft:2,fontSize:9}}>█</span>
                </div>
                <div style={{overflowY:"auto",maxHeight:"calc(100% - 42px)"}}>
                  {/* Prompt line */}
                  <div style={{padding:"8px 14px 4px",display:"flex",gap:8}}>
                    <span className="jb" style={{fontSize:9,color:"#39ff14"}}>soc@vapt</span>
                    <span className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>:~$</span>
                    <span className="jb" style={{fontSize:9,color:"rgba(0,255,231,0.6)"}}>Streaming live SIEM events...</span>
                  </div>
                  {logs.map(entry=><TermRow key={entry.id} entry={entry}/>)}
                  <div style={{padding:"6px 14px",display:"flex",gap:8}}>
                    <span className="jb" style={{fontSize:9,color:"#39ff14"}}>soc@vapt</span>
                    <span className="jb" style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>:~$</span>
                    <span className="jb tcursor" style={{fontSize:9}}>█</span>
                  </div>
                </div>
              </div>

              {/* Log stats */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,220px),1fr))",gap}}>
                {[
                  {label:"EVENTS TODAY",   value:"18,342", color:"var(--c)",  icon:"▣"},
                  {label:"CRITICAL ALERTS",value:logs.filter(l=>l.level==="critical").length.toString(), color:"#ff2244",icon:"☢"},
                  {label:"BLOCKED ATTACKS",value:"1,247",  color:"#39ff14",icon:"⊘"},
                  {label:"FALSE POSITIVES",value:"34",     color:"#ffd700",icon:"⚠"},
                ].map(s=>(
                  <div key={s.label} className="panel" style={{padding:"13px 15px",borderColor:`${s.color}18`}}>
                    <div style={{position:"absolute",inset:0,borderRadius:8,background:`radial-gradient(circle at top right,${s.color}08,transparent 65%)`,pointerEvents:"none"}}/>
                    <div style={{position:"relative"}}>
                      <div style={{fontSize:16,color:s.color,marginBottom:7,filter:`drop-shadow(0 0 5px ${s.color})`}}>{s.icon}</div>
                      <div className="jb" style={{fontSize:"clamp(16px,3vw,24px)",fontWeight:"bold",color:s.color,lineHeight:1}}>{s.value}</div>
                      <div className="jb" style={{fontSize:7,letterSpacing:"0.1em",marginTop:5,color:`${s.color}55`}}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        <footer className="jb" style={{textAlign:"center",padding:"14px 0 32px",fontSize:8,letterSpacing:"0.18em",color:"rgba(0,255,231,0.07)"}}>
          VAPT SECURITY OPERATIONS CENTER — ALL SYSTEMS MONITORED — {now.getFullYear()}
        </footer>
      </div>
    </>
  );
};

export default AdminPanel;