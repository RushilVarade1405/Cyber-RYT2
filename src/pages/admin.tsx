import { useState, useEffect, useRef, FC } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId    = "overview" | "visitors" | "metrics";
type SortDir  = "asc" | "desc";
type FeedType = "visit" | "error" | "warning" | "info" | "api";

interface IpInfo {
  ip: string;
  country_name: string;
  country_code: string;
  city: string;
  org: string;
  timezone: string;
}

interface Visitor {
  id: number; ip: string; country: string; city: string;
  isp: string; page: string; browser: string; os: string;
  device: string; timestamp: string; lat: number; lon: number;
}

interface FeedItem   { id: number; type: FeedType; msg: string; detail: string; time: string; }
interface SparkProps  { data: number[]; color: string; height?: number; }
interface BarDatum    { label: string; value: number; }
interface BarProps    { data: BarDatum[]; color?: string; }
interface DonutSeg    { label: string; value: number; color: string; }
interface DonutProps  { segments: DonutSeg[]; size?: number; }
interface FeedProps   { item: FeedItem; }
interface StatItem    { label: string; value: string | number; color: string; icon: string; sub: string; }
interface Blip        { x: number; y: number; age: number; col: string; }

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600&display=swap');

  :root {
    --c:#00ffe7; --c2:#00bfff; --g:#39ff14; --y:#ffd700;
    --r:#ff3b5c; --p:#bf5fff; --o:#ff8c42; --bg:#020810;
    --panel:rgba(3,10,22,0.97);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:var(--bg);color:rgba(255,255,255,0.85);font-family:'Space Grotesk',sans-serif;overflow-x:hidden;min-height:100vh;}
  .orb {font-family:'Orbitron',monospace;}
  .mono{font-family:'Share Tech Mono',monospace;}

  .hex-bg{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 52L0 34.8V0L30 17.2 60 0v34.8L30 52zm0 0L0 69.2V104L30 86.8 60 104V69.2L30 52z' fill='none' stroke='rgba(0,255,231,0.022)' stroke-width='1'/%3E%3C/svg%3E");}

  .scanlines::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;
    background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,231,0.007) 2px,rgba(0,255,231,0.007) 4px);}

  /* ── Panels ── */
  .panel{background:var(--panel);border:1px solid rgba(0,255,231,0.1);border-radius:12px;
    position:relative;overflow:hidden;backdrop-filter:blur(20px);
    transition:border-color 0.3s,box-shadow 0.3s;}
  .panel::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,var(--c) 30%,var(--c2) 70%,transparent);opacity:0.4;}
  .panel:hover{border-color:rgba(0,255,231,0.22);box-shadow:0 0 30px rgba(0,255,231,0.04);}
  .panel-g::before{background:linear-gradient(90deg,transparent,var(--g),transparent)!important;}
  .panel-g{border-color:rgba(57,255,20,0.15)!important;}
  .panel-p::before{background:linear-gradient(90deg,transparent,var(--p),transparent)!important;}
  .panel-p{border-color:rgba(191,95,255,0.15)!important;}
  .panel-y::before{background:linear-gradient(90deg,transparent,var(--y),transparent)!important;}
  .panel-y{border-color:rgba(255,215,0,0.15)!important;}
  .panel-r::before{background:linear-gradient(90deg,transparent,var(--r),transparent)!important;}
  .panel-r{border-color:rgba(255,59,92,0.15)!important;}

  /* ── IP Hero ── */
  .ip-hero{
    width:100%;border-radius:18px;
    border:1px solid rgba(0,255,231,0.3);
    background:linear-gradient(145deg,rgba(0,14,28,0.99) 0%,rgba(0,8,18,0.99) 50%,rgba(0,12,6,0.99) 100%);
    position:relative;overflow:hidden;
    box-shadow:0 0 80px rgba(0,255,231,0.07),0 0 160px rgba(0,255,231,0.03),inset 0 0 60px rgba(0,255,231,0.015);
  }
  .ip-hero::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,transparent 0%,var(--c) 20%,rgba(0,255,231,0.9) 40%,var(--g) 65%,var(--c2) 85%,transparent 100%);
    box-shadow:0 0 24px rgba(0,255,231,0.6),0 0 48px rgba(0,255,231,0.2);}
  .ip-hero::after{content:'';position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(ellipse at 50% 0%,rgba(0,255,231,0.06) 0%,transparent 55%),
               radial-gradient(ellipse at 80% 100%,rgba(57,255,20,0.03) 0%,transparent 45%);}

  .ip-addr-box{
    background:rgba(0,0,0,0.55);border:1px solid rgba(0,255,231,0.18);
    border-radius:14px;position:relative;overflow:hidden;
    box-shadow:inset 0 0 50px rgba(0,255,231,0.025),0 0 30px rgba(0,255,231,0.04);
  }
  .ip-addr-box::after{content:'';position:absolute;bottom:0;left:10%;right:10%;height:1px;
    background:linear-gradient(90deg,transparent,rgba(57,255,20,0.35),transparent);}

  /* Corner brackets */
  .cb{position:absolute;width:clamp(22px,3vw,40px);height:clamp(22px,3vw,40px);}
  .cb-tl{top:-1px;left:-1px;border-top:2px solid rgba(0,255,231,0.6);border-left:2px solid rgba(0,255,231,0.6);border-radius:0 0 7px 0;}
  .cb-tr{top:-1px;right:-1px;border-top:2px solid rgba(0,255,231,0.6);border-right:2px solid rgba(0,255,231,0.6);border-radius:0 0 0 7px;}
  .cb-bl{bottom:-1px;left:-1px;border-bottom:2px solid rgba(0,255,231,0.6);border-left:2px solid rgba(0,255,231,0.6);border-radius:0 7px 0 0;}
  .cb-br{bottom:-1px;right:-1px;border-bottom:2px solid rgba(0,255,231,0.6);border-right:2px solid rgba(0,255,231,0.6);border-radius:7px 0 0 0;}

  /* Glows */
  .glow-c{text-shadow:0 0 30px rgba(0,255,231,0.8),0 0 60px rgba(0,255,231,0.35),0 0 100px rgba(0,255,231,0.15);}
  .glow-g{text-shadow:0 0 16px rgba(57,255,20,0.6);}

  /* Animations */
  @keyframes pulse-live{0%,100%{box-shadow:0 0 5px var(--g),0 0 10px var(--g);}
    50%{box-shadow:0 0 10px var(--g),0 0 22px var(--g),0 0 36px rgba(57,255,20,0.3);}}
  .dot-live{animation:pulse-live 2s ease-in-out infinite;}

  @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
  .blink{animation:blink 1s step-end infinite;}

  @keyframes scan-move{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
  .scan-beam{position:fixed;left:0;right:0;height:1px;z-index:100;pointer-events:none;
    background:linear-gradient(90deg,transparent 10%,rgba(0,255,231,0.2) 50%,transparent 90%);
    animation:scan-move 12s linear infinite;}

  @keyframes ip-reveal{
    0%  {letter-spacing:0.7em;opacity:0;filter:blur(12px);transform:scale(1.04);}
    60% {opacity:0.8;filter:blur(2px);}
    100%{letter-spacing:0.04em;opacity:1;filter:none;transform:scale(1);}
  }
  .ip-reveal{animation:ip-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards;}

  @keyframes glitch{0%,90%,100%{clip-path:none;transform:none;}
    91%{clip-path:inset(20% 0 40% 0);transform:translate(-3px,1px);}
    93%{clip-path:inset(60% 0 10% 0);transform:translate(3px,-1px);}
    95%{clip-path:inset(5% 0 70% 0);transform:translate(-2px,0);}}
  .glitch-layer{position:absolute;inset:0;color:var(--r);opacity:0.4;animation:glitch 9s step-end infinite;pointer-events:none;}

  @keyframes fade-up{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
  .fade-up{animation:fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both;}
  .fd1{animation-delay:0.05s;}.fd2{animation-delay:0.10s;}
  .fd3{animation-delay:0.16s;}.fd4{animation-delay:0.22s;}

  @keyframes bar-grow{from{height:0}to{height:var(--bh)}}
  .cbar{animation:bar-grow 0.9s cubic-bezier(0.34,1.56,0.64,1) both;}

  @keyframes radar-sweep{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  .rsweep{animation:radar-sweep 4s linear infinite;transform-origin:75px 75px;}

  /* Geo tiles hover */
  .geo-tile{padding:clamp(13px,2.2vw,22px) clamp(15px,2.8vw,26px);border-radius:11px;
    background:rgba(255,255,255,0.028);border:1px solid rgba(255,255,255,0.07);
    transition:border-color 0.25s,background 0.25s;}
  .geo-tile:hover{background:rgba(0,255,231,0.04);border-color:rgba(0,255,231,0.18);}

  /* Nav */
  .nav-tab{position:relative;padding:8px 18px;border-radius:8px;cursor:pointer;
    border:1px solid transparent;transition:all 0.2s;font-family:'Share Tech Mono',monospace;
    font-size:10px;letter-spacing:0.14em;white-space:nowrap;background:transparent;
    color:rgba(255,255,255,0.3);-webkit-tap-highlight-color:transparent;}
  .nav-tab:hover{color:var(--c);border-color:rgba(0,255,231,0.2);background:rgba(0,255,231,0.05);}
  .nav-tab.active{color:var(--c);border-color:rgba(0,255,231,0.35);background:rgba(0,255,231,0.08);
    box-shadow:0 0 14px rgba(0,255,231,0.1),inset 0 0 14px rgba(0,255,231,0.05);}
  .nav-tab.active::after{content:'';position:absolute;bottom:-1px;left:20%;right:20%;height:1px;
    background:var(--c);box-shadow:0 0 8px var(--c);}

  /* Stat cards */
  .stat-card{border-radius:10px;border:1px solid;background:rgba(0,4,10,0.95);
    position:relative;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s;cursor:default;}
  .stat-card:hover{transform:translateY(-3px);}

  /* Pill */
  .pill{display:inline-flex;align-items:center;gap:4px;font-family:'Share Tech Mono',monospace;
    font-size:9px;letter-spacing:0.12em;padding:3px 9px;border-radius:4px;border:1px solid;
    white-space:nowrap;line-height:1.4;}

  /* Table */
  .dtable{width:100%;border-collapse:collapse;}
  .dtable thead th{padding:10px 12px;text-align:left;font-family:'Share Tech Mono',monospace;
    font-size:9px;letter-spacing:0.16em;color:rgba(255,255,255,0.25);
    border-bottom:1px solid rgba(255,255,255,0.06);white-space:nowrap;position:sticky;top:0;
    background:rgba(2,8,16,0.99);z-index:2;cursor:pointer;user-select:none;transition:color 0.2s;}
  .dtable thead th:hover{color:var(--c);}
  .dtable thead th.sorted{color:var(--c);}
  .dtable tbody tr{border-bottom:1px solid rgba(255,255,255,0.03);transition:background 0.15s;cursor:pointer;}
  .dtable tbody tr:hover{background:rgba(0,255,231,0.03);}
  .dtable tbody td{padding:9px 12px;white-space:nowrap;}

  /* Input/Button */
  .sinput{background:rgba(0,255,231,0.04);border:1px solid rgba(0,255,231,0.15);
    color:var(--c);border-radius:8px;padding:8px 14px;font-family:'Share Tech Mono',monospace;
    font-size:11px;width:100%;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
  .sinput:focus{border-color:rgba(0,255,231,0.4);box-shadow:0 0 14px rgba(0,255,231,0.08);}
  .sinput::placeholder{color:rgba(0,255,231,0.2);}
  .sbtn{padding:4px 10px;border-radius:8px;cursor:pointer;border:1px solid;
    font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:0.1em;
    transition:all 0.2s;outline:none;-webkit-tap-highlight-color:transparent;background:transparent;}

  /* Progress */
  .pbar{height:4px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,0.06);}
  .pfill{height:100%;border-radius:999px;transition:width 1s cubic-bezier(0.34,1.56,0.64,1);}

  ::-webkit-scrollbar{width:3px;height:3px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(0,255,231,0.14);border-radius:2px;}
  ::-webkit-scrollbar-thumb:hover{background:rgba(0,255,231,0.28);}

  @media(max-width:640px){
    .nav-tab{padding:6px 10px;font-size:9px;}
    .hide-sm{display:none!important;}
  }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

const MatrixRain: FC<{opacity?:number}> = ({opacity=0.042}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c=ref.current; if(!c) return;
    const ctx=c.getContext("2d"); if(!ctx) return;
    const F=11; let drops:number[]=[];
    const resize=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight;drops=Array(Math.floor(c.width/F)).fill(1);};
    resize();
    const ro=new ResizeObserver(resize); ro.observe(c);
    const CH="01アイウエオカキクケコサシスセソタチツテト┃┄╋▓░█◈◉▣";
    const id=setInterval(()=>{
      ctx.fillStyle="rgba(2,8,16,0.055)"; ctx.fillRect(0,0,c.width,c.height);
      ctx.font=`${F}px monospace`;
      drops.forEach((y,i)=>{
        ctx.fillStyle=Math.random()>0.97?"#fff":i%5===0?"#00ffe7":i%5===1?"#00bfff":"#003548";
        ctx.fillText(CH[Math.floor(Math.random()*CH.length)],i*F,y*F);
        if(y*F>c.height&&Math.random()>0.974) drops[i]=0;
        drops[i]++;
      });
    },55);
    return()=>{clearInterval(id);ro.disconnect();};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity,pointerEvents:"none"}}/>;
};

const Sparkline: FC<SparkProps> = ({data,color,height=44}) => {
  const W=300,H=height,max=Math.max(...data,1),min=Math.min(...data),range=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*W},${H-((v-min)/range)*H*0.85}`).join(" ");
  const fill=pts+` ${W},${H} 0,${H}`;
  const last=data[data.length-1]??0;
  const gid=`sg${color.replace("#","")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" style={{overflow:"visible"}}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.32"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
      </linearGradient></defs>
      <polygon points={fill} fill={`url(#${gid})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"/>
      {data.length>1&&<circle cx={W} cy={H-((last-min)/range)*H*0.85} r="3" fill={color} style={{filter:`drop-shadow(0 0 5px ${color})`}}/>}
    </svg>
  );
};

const BLIP_C=["#00ffe7","#39ff14","#ffd700","#bf5fff","#ff8c42"] as const;
const Radar: FC = () => {
  const [blips,setBlips]=useState<Blip[]>([]);
  useEffect(()=>{
    const id=setInterval(()=>{
      setBlips(b=>{
        const aged=b.map(p=>({...p,age:p.age+1})).filter(p=>p.age<12);
        if(Math.random()>0.65){const r=12+Math.random()*58,a=Math.random()*Math.PI*2;
          aged.push({x:75+r*Math.cos(a),y:75+r*Math.sin(a),age:0,col:BLIP_C[Math.floor(Math.random()*BLIP_C.length)]});}
        return aged.slice(-8);
      });
    },400);
    return()=>clearInterval(id);
  },[]);
  return (
    <svg width="150" height="150" viewBox="0 0 150 150">
      <defs>
        <filter id="blr"><feGaussianBlur stdDeviation="2"/></filter>
        <radialGradient id="rg" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(0,255,231,0.07)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <circle cx="75" cy="75" r="72" fill="url(#rg)" stroke="rgba(0,255,231,0.07)" strokeWidth="1"/>
      {[20,40,60].map(r=><circle key={r} cx="75" cy="75" r={r} fill="none" stroke="rgba(0,255,231,0.07)" strokeWidth="1" strokeDasharray="3 3"/>)}
      <line x1="75" y1="3" x2="75" y2="147" stroke="rgba(0,255,231,0.06)" strokeWidth="1"/>
      <line x1="3" y1="75" x2="147" y2="75" stroke="rgba(0,255,231,0.06)" strokeWidth="1"/>
      <g className="rsweep">
        <path d="M75 75 L75 3 A72 72 0 0 1 147 75 Z" fill="url(#rg)" opacity="0.6"/>
        <line x1="75" y1="75" x2="75" y2="3" stroke="var(--c)" strokeWidth="1.5" opacity="0.7"/>
      </g>
      {blips.map((b,i)=>(
        <g key={i}>
          <circle cx={b.x} cy={b.y} r={6} fill={b.col} opacity={(1-b.age/12)*0.25} filter="url(#blr)"/>
          <circle cx={b.x} cy={b.y} r={2.5} fill={b.col} opacity={1-b.age/12}/>
        </g>
      ))}
      <circle cx="75" cy="75" r="3.5" fill="var(--c)" style={{filter:"drop-shadow(0 0 5px var(--c))"}}/>
    </svg>
  );
};

const BarChart: FC<BarProps> = ({data,color="#00ffe7"}) => {
  const max=Math.max(...data.map(d=>d.value),1);
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:3,height:64}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,height:"100%",justifyContent:"flex-end"}}>
          <div className="cbar" style={{["--bh" as string]:`${(d.value/max)*56}px`,width:"100%",height:`${(d.value/max)*56}px`,background:color,borderRadius:"3px 3px 0 0",boxShadow:`0 0 8px ${color}55`,animationDelay:`${i*0.04}s`,opacity:0.65+(d.value/max)*0.35}}/>
          {d.label&&<span className="mono" style={{fontSize:7,color:"rgba(255,255,255,0.2)",transform:"rotate(-35deg)",transformOrigin:"center"}}>{d.label}</span>}
        </div>
      ))}
    </div>
  );
};

const DonutChart: FC<DonutProps> = ({segments,size=110}) => {
  const R=size/2-10,cx=size/2,cy=size/2,total=segments.reduce((s,d)=>s+d.value,0)||1;
  let angle=-Math.PI/2;
  const paths=segments.map(seg=>{
    const sw=(seg.value/total)*Math.PI*2;
    const x1=cx+R*Math.cos(angle),y1=cy+R*Math.sin(angle);
    const x2=cx+R*Math.cos(angle+sw),y2=cy+R*Math.sin(angle+sw);
    const large=sw>Math.PI?1:0;
    const d=`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`;
    angle+=sw;
    return{d,color:seg.color};
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={R} fill="rgba(0,0,0,0.3)"/>
      {paths.map((p,i)=><path key={i} d={p.d} fill={p.color} opacity="0.85" stroke="rgba(2,8,16,0.8)" strokeWidth="1.5" style={{filter:`drop-shadow(0 0 4px ${p.color}50)`}}/>)}
      <circle cx={cx} cy={cy} r={R*0.55} fill="rgba(2,8,16,0.96)"/>
    </svg>
  );
};

const UptimeBar: FC = () => (
  <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
    {Array.from({length:30}).map((_,i)=>{
      const ok=!(i===3||i===15);
      return <div key={i} title={ok?"Healthy":"Incident"} style={{width:6,height:26,borderRadius:2,background:ok?"#39ff14":"#ff3b5c",opacity:ok?0.7:0.95,boxShadow:ok?"0 0 4px #39ff1460":"0 0 5px #ff3b5c70"}}/>;
    })}
  </div>
);

const FeedItem: FC<FeedProps> = ({item}) => {
  const [vis,setVis]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setVis(true),50);return()=>clearTimeout(t);},[]);
  const tc:Record<FeedType,string>={visit:"#00ffe7",error:"#ff3b5c",warning:"#ffd700",info:"#bf5fff",api:"#39ff14"};
  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",opacity:vis?1:0,transform:vis?"none":"translateX(-8px)",transition:"all 0.28s ease"}}>
      <div style={{width:7,height:7,borderRadius:"50%",background:tc[item.type],flexShrink:0,marginTop:4,boxShadow:`0 0 7px ${tc[item.type]}80`}}/>
      <div style={{minWidth:0,flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
          <span className="mono" style={{fontSize:10,color:"rgba(255,255,255,0.65)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.msg}</span>
          <span className="mono" style={{fontSize:9,color:"rgba(255,255,255,0.2)",flexShrink:0}}>{item.time}</span>
        </div>
        {item.detail&&<div className="mono" style={{fontSize:9,color:"rgba(255,255,255,0.32)",marginTop:2}}>{item.detail}</div>}
      </div>
    </div>
  );
};

// ─── Static data ──────────────────────────────────────────────────────────────

const VISITORS: Visitor[] = [
  {id:1, ip:"203.45.12.88",  country:"🇸🇬 Singapore",     city:"Singapore",    isp:"Singtel",          page:"/home",      browser:"Chrome",  os:"Android",device:"Mobile",  timestamp:"2025-03-05 14:22:01",lat:1.3521,  lon:103.8198},
  {id:2, ip:"91.108.4.32",   country:"🇩🇪 Germany",       city:"Berlin",       isp:"Deutsche Telekom", page:"/admin",     browser:"Firefox", os:"Windows",device:"Desktop", timestamp:"2025-03-05 13:55:44",lat:52.5200, lon:13.4050},
  {id:3, ip:"142.250.0.1",   country:"🇺🇸 United States", city:"Mountain View",isp:"Google LLC",       page:"/dashboard", browser:"Safari",  os:"iPadOS", device:"Tablet",  timestamp:"2025-03-05 13:41:09",lat:37.3861, lon:-122.0839},
  {id:4, ip:"2.16.190.52",   country:"🇬🇧 United Kingdom",city:"London",       isp:"Akamai",           page:"/pricing",   browser:"Chrome",  os:"macOS",  device:"Desktop", timestamp:"2025-03-05 12:20:33",lat:51.5074, lon:-0.1278},
  {id:5, ip:"103.24.77.15",  country:"🇮🇳 India",         city:"Mumbai",       isp:"Jio",              page:"/blog",      browser:"Chrome",  os:"Android",device:"Mobile",  timestamp:"2025-03-05 11:58:27",lat:19.0760, lon:72.8777},
  {id:6, ip:"45.33.0.91",    country:"🇺🇸 United States", city:"Fremont",      isp:"Linode",           page:"/api/v1",    browser:"curl",    os:"Linux",  device:"Bot",     timestamp:"2025-03-05 11:44:05",lat:37.5630, lon:-121.976},
  {id:7, ip:"77.88.55.242",  country:"🇷🇺 Russia",        city:"Moscow",       isp:"Yandex",           page:"/search",    browser:"Yandex",  os:"Windows",device:"Desktop", timestamp:"2025-03-05 10:33:18",lat:55.7558, lon:37.6173},
  {id:8, ip:"185.220.101.4", country:"🇫🇷 France",        city:"Paris",        isp:"OVH",              page:"/contact",   browser:"Firefox", os:"Linux",  device:"Desktop", timestamp:"2025-03-05 09:17:42",lat:48.8566, lon:2.3522},
  {id:9, ip:"52.47.0.1",     country:"🇫🇷 France",        city:"Paris",        isp:"AWS",              page:"/health",    browser:"curl",    os:"Linux",  device:"Bot",     timestamp:"2025-03-05 09:01:03",lat:48.8566, lon:2.3522},
  {id:10,ip:"1.1.1.1",       country:"🇦🇺 Australia",     city:"Sydney",       isp:"Cloudflare",       page:"/cdn",       browser:"Chrome",  os:"macOS",  device:"Desktop", timestamp:"2025-03-05 08:44:19",lat:-33.8688,lon:151.2093},
  {id:11,ip:"8.8.8.8",       country:"🇺🇸 United States", city:"Mountain View",isp:"Google",           page:"/",          browser:"Chrome",  os:"Windows",device:"Desktop", timestamp:"2025-03-05 07:31:55",lat:37.3861, lon:-122.0839},
  {id:12,ip:"161.27.0.1",    country:"🇯🇵 Japan",         city:"Tokyo",        isp:"NTT",              page:"/docs",      browser:"Safari",  os:"macOS",  device:"Desktop", timestamp:"2025-03-05 06:15:00",lat:35.6762, lon:139.6503},
];
const BR_DIST: DonutSeg[] = [{label:"Chrome",value:48,color:"#00ffe7"},{label:"Safari",value:22,color:"#39ff14"},{label:"Firefox",value:17,color:"#bf5fff"},{label:"Others",value:13,color:"#ff8c42"}];
const DV_DIST: DonutSeg[] = [{label:"Desktop",value:52,color:"#00ffe7"},{label:"Mobile",value:37,color:"#ffd700"},{label:"Tablet",value:8,color:"#bf5fff"},{label:"Bot",value:3,color:"#ff3b5c"}];
const HOURLY: BarDatum[] = Array.from({length:24},(_,i)=>({label:i%4===0?`${i}h`:"",value:Math.floor(30+Math.sin((i/24)*Math.PI*2+1)*60+Math.random()*40)}));
const WEEKLY: BarDatum[] = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((l,i)=>({label:l,value:Math.floor(200+Math.random()*800+(i<5?300:0))}));
const FEED_P: Omit<FeedItem,"id"|"time">[] = [
  {type:"visit",   msg:"New visitor from 198.51.100.X",   detail:"🌍 Unknown · Chrome · Desktop"},
  {type:"api",     msg:"POST /v1/track — 201 Created",    detail:"Response: 98ms"},
  {type:"info",    msg:"Session expired — token GC run",  detail:"Freed 234 sessions"},
  {type:"warning", msg:"Slow query detected — 890ms",     detail:"Table: visitors — add index?"},
  {type:"api",     msg:"GET /api/analytics — 200 OK",     detail:"Response: 44ms"},
  {type:"error",   msg:"CORS violation blocked",           detail:"Origin: evil.example.com"},
];
const CL10=["#00ffe7","#39ff14","#ffd700","#bf5fff","#ff8c42","#00bfff","#ff3b5c","#39ff14","#00ffe7","#bf5fff"];

const bCol=(b?:string)=>({Chrome:"#00ffe7",Firefox:"#ff8c42",Safari:"#39ff14",Yandex:"#ffd700"}[b??""]??"#bf5fff");
const dIcon=(d?:string)=>({Mobile:"📱",Tablet:"📟",Desktop:"🖥",Bot:"🤖"}[d??""]??"?");
const fmtD=(d:string)=>new Date(d).toLocaleString("en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});
const fmtT=(d:Date)=>[d.getHours(),d.getMinutes(),d.getSeconds()].map(n=>String(n).padStart(2,"0")).join(":");

// ─── Main ─────────────────────────────────────────────────────────────────────

const AdminPanel: FC = () => {
  const [tab,       setTab]       = useState<TabId>("overview");
  const [now,       setNow]       = useState(new Date());
  const [ipInfo,    setIpInfo]    = useState<IpInfo|null>(null);
  const [ipLoad,    setIpLoad]    = useState(true);
  const [filter,    setFilter]    = useState("");
  const [sortCol,   setSortCol]   = useState("timestamp");
  const [sortDir,   setSortDir]   = useState<SortDir>("desc");
  const [expandRow, setExpandRow] = useState<number|null>(null);
  const [spark,     setSpark]     = useState<Record<string,number[]>>({
    net: Array.from({length:40},()=>Math.random()*70+20),
    req: Array.from({length:40},()=>Math.random()*50+10),
    lat: Array.from({length:40},()=>Math.random()*30+5),
  });
  const [feed, setFeed] = useState<FeedItem[]>([
    {id:1,type:"visit",   msg:"New visitor from 203.45.12.88",  detail:"🇸🇬 Singapore · Chrome · Mobile", time:"00:02"},
    {id:2,type:"api",     msg:"API endpoint /v1/data — 200 OK", detail:"Response: 142ms",                 time:"00:45"},
    {id:3,type:"info",    msg:"Cache invalidated — /dashboard", detail:"TTL expired",                     time:"01:12"},
    {id:4,type:"visit",   msg:"Return visitor 91.108.4.32",     detail:"🇩🇪 Germany · Firefox · Desktop",  time:"01:38"},
    {id:5,type:"warning", msg:"High memory on worker-02",       detail:"84% RAM — monitor",               time:"02:10"},
    {id:6,type:"error",   msg:"Rate limit hit — 45.33.0.91",    detail:"429 Too Many Requests",           time:"03:01"},
  ]);

  const M={totalVisits:4827,uniqueIPs:1293,countries:48,todayVisits:234,avgLatency:"142ms",uptime:"99.94%",errorRate:"0.12%",requests:"12.4k/hr"};

  useEffect(()=>{const id=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(id);},[]);

  useEffect(()=>{
    (async()=>{
      try{
        const {ip}=await fetch("https://api.ipify.org?format=json").then(r=>r.json()) as {ip:string};
        const geo=await fetch(`https://ipapi.co/${ip}/json/`).then(r=>r.json()) as IpInfo;
        setIpInfo({...geo,ip});
      }catch{
        try{const d=await fetch("https://ipapi.co/json/").then(r=>r.json()) as IpInfo;setIpInfo(d);}
        catch{setIpInfo({ip:"Unavailable",country_name:"—",country_code:"—",city:"—",org:"—",timezone:"—"});}
      }finally{setIpLoad(false);}
    })();
  },[]);

  useEffect(()=>{
    const id=setInterval(()=>setSpark(s=>({
      net:[...s.net.slice(1),Math.random()*70+20],
      req:[...s.req.slice(1),Math.random()*50+10],
      lat:[...s.lat.slice(1),Math.random()*30+5],
    })),1000);
    return()=>clearInterval(id);
  },[]);

  useEffect(()=>{
    const id=setInterval(()=>{
      const m=FEED_P[Math.floor(Math.random()*FEED_P.length)];
      const t=`${String(Math.floor(Math.random()*59)).padStart(2,"0")}:${String(Math.floor(Math.random()*59)).padStart(2,"0")}`;
      setFeed(f=>[{id:Date.now(),...m,time:t},...f.slice(0,13)]);
    },4000);
    return()=>clearInterval(id);
  },[]);

  const handleSort=(col:string)=>{
    if(sortCol===col)setSortDir(d=>d==="asc"?"desc":"asc");
    else{setSortCol(col);setSortDir("desc");}
  };
  const filtered=VISITORS
    .filter(v=>!filter.trim()||Object.values(v).some(val=>String(val).toLowerCase().includes(filter.toLowerCase())))
    .sort((a,b)=>{
      const av=String(a[sortCol as keyof Visitor]??""),bv=String(b[sortCol as keyof Visitor]??"");
      const cmp=sortCol==="timestamp"?new Date(av).getTime()-new Date(bv).getTime():av.localeCompare(bv);
      return sortDir==="asc"?cmp:-cmp;
    });

  const stats: StatItem[] = [
    {label:"TOTAL VISITS",value:M.totalVisits.toLocaleString(),color:"#00ffe7",icon:"◈",sub:"all time"},
    {label:"UNIQUE IPs",  value:M.uniqueIPs.toLocaleString(),  color:"#39ff14",icon:"◉",sub:"distinct"},
    {label:"COUNTRIES",   value:M.countries,                    color:"#ffd700",icon:"◎",sub:"worldwide"},
    {label:"TODAY",       value:M.todayVisits,                  color:"#ff8c42",icon:"◆",sub:"visits"},
    {label:"AVG LATENCY", value:M.avgLatency,                   color:"#00bfff",icon:"⚡",sub:"p95"},
    {label:"UPTIME",      value:M.uptime,                       color:"#39ff14",icon:"▶",sub:"30 days"},
    {label:"ERROR RATE",  value:M.errorRate,                    color:"#ff3b5c",icon:"⚠",sub:"5xx"},
    {label:"REQUESTS",    value:M.requests,                     color:"#bf5fff",icon:"▣",sub:"throughput"},
  ];

  const gap="clamp(12px,2vw,20px)";
  const ipLen=(ipInfo?.ip??"").length;
  const ipFs=ipLen<=7?"clamp(46px,10vw,108px)":ipLen<=11?"clamp(38px,8vw,86px)":ipLen<=13?"clamp(30px,6.5vw,66px)":"clamp(22px,5vw,50px)";

  const GEO_TILES=[
    {label:"COUNTRY",   value:ipInfo?.country_name,color:"#39ff14"},
    {label:"CITY",      value:ipInfo?.city,          color:"#00bfff"},
    {label:"ISP / ORG", value:ipInfo?.org,           color:"#bf5fff"},
    {label:"TIMEZONE",  value:ipInfo?.timezone,      color:"rgba(255,215,0,0.9)"},
  ] as {label:string;value?:string;color:string}[];

  return (
    <>
      <style>{CSS}</style>

      {/* BG layers */}
      <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden"}}>
        <MatrixRain/>
        <div style={{position:"absolute",top:"-20%",left:"8%",width:"65vw",height:"65vw",maxWidth:880,maxHeight:880,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,231,0.055) 0%,transparent 60%)",filter:"blur(100px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-15%",right:"-5%",width:"55vw",height:"55vw",maxWidth:650,maxHeight:650,borderRadius:"50%",background:"radial-gradient(circle,rgba(191,95,255,0.04) 0%,transparent 60%)",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"45%",left:"-8%",width:"45vw",height:"45vw",maxWidth:500,maxHeight:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(57,255,20,0.025) 0%,transparent 60%)",filter:"blur(90px)",pointerEvents:"none"}}/>
      </div>

      <div className="scanlines hex-bg" style={{position:"relative",zIndex:1,minHeight:"100vh",overflowX:"hidden"}}>
        <div className="scan-beam"/>

        {/* ── HEADER ── */}
        <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(1,5,13,0.97)",backdropFilter:"blur(28px)",borderBottom:"1px solid rgba(0,255,231,0.1)",padding:"0 clamp(14px,3vw,32px)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,height:58}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <div className="dot-live" style={{width:9,height:9,borderRadius:"50%",background:"#39ff14"}}/>
            <div style={{position:"relative"}}>
              <span className="orb glow-c" style={{fontSize:"clamp(13px,2.5vw,16px)",letterSpacing:"0.22em",color:"var(--c)",fontWeight:900}}>RYTNIX</span>
              <span className="glitch-layer orb" style={{fontSize:"clamp(13px,2.5vw,16px)",fontWeight:900,letterSpacing:"0.22em"}} aria-hidden>RYTNIX</span>
            </div>
            <span className="mono hide-sm" style={{fontSize:9,color:"rgba(255,255,255,0.16)",letterSpacing:"0.18em"}}>ADMIN COMMAND CENTER</span>
          </div>

          <nav style={{display:"flex",gap:4}}>
            {([["overview","◈ OVERVIEW"],["visitors","◉ VISITORS"],["metrics","▣ METRICS"]] as [TabId,string][]).map(([id,lbl])=>(
              <button key={id} className={`nav-tab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{lbl}</button>
            ))}
          </nav>

          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            {ipInfo&&!ipLoad&&(
              <div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 13px",borderRadius:8,background:"rgba(0,255,231,0.055)",border:"1px solid rgba(0,255,231,0.18)"}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"#39ff14",boxShadow:"0 0 7px #39ff14"}}/>
                <span className="mono ip-reveal" style={{fontSize:11,fontWeight:"bold",color:"var(--c)",letterSpacing:"0.04em"}}>{ipInfo.ip}</span>
              </div>
            )}
            <span className="mono" style={{fontSize:"clamp(11px,2vw,14px)",color:"var(--c)",letterSpacing:"0.1em"}}>{fmtT(now)}</span>
          </div>
        </header>

        {/* ── MAIN ── */}
        <main style={{maxWidth:1440,margin:"0 auto",padding:`${gap} clamp(14px,3vw,32px) 56px`}}>

          {/* ═══ OVERVIEW ═══ */}
          {tab==="overview"&&(
            <div style={{display:"flex",flexDirection:"column",gap}} className="fade-up">

              {/* Title */}
              <div style={{paddingTop:4}}>
                <div style={{position:"relative",display:"inline-block"}}>
                  <span className="orb glow-c" style={{fontSize:"clamp(22px,4.5vw,38px)",fontWeight:900,color:"var(--c)",lineHeight:1.1}}>ADMIN COMMAND CENTER</span>
                  <span className="glitch-layer orb" style={{fontSize:"clamp(22px,4.5vw,38px)",fontWeight:900,lineHeight:1.1}} aria-hidden>ADMIN COMMAND CENTER</span>
                </div>
                <p className="mono" style={{fontSize:9,marginTop:7,letterSpacing:"0.24em",color:"rgba(255,255,255,0.15)"}}>LIVE VISITOR ANALYTICS · REAL-TIME METRICS · PERSISTENT LOG</p>
              </div>

              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(148px,calc(50% - 6px)),1fr))",gap:8}} className="fd1">
                {stats.map((s,i)=>(
                  <div key={s.label} className="stat-card" style={{borderColor:s.color+"28",padding:"13px 15px",animationDelay:`${i*0.04}s`}}>
                    <div style={{position:"absolute",inset:0,borderRadius:10,background:`radial-gradient(circle at top right,${s.color}0a,transparent 65%)`,pointerEvents:"none"}}/>
                    <div style={{position:"relative"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                        <span style={{fontSize:15,color:s.color,filter:`drop-shadow(0 0 4px ${s.color})`}}>{s.icon}</span>
                        <span className="pill" style={{color:s.color,borderColor:s.color+"30",background:s.color+"0f",fontSize:7}}>LIVE</span>
                      </div>
                      <div className="mono" style={{fontSize:"clamp(15px,3vw,22px)",fontWeight:"bold",color:s.color,lineHeight:1}}>{s.value}</div>
                      <div className="mono" style={{fontSize:8,letterSpacing:"0.12em",marginTop:5,color:s.color+"55"}}>{s.label}</div>
                      <div className="mono" style={{fontSize:8,color:"rgba(255,255,255,0.2)",marginTop:2}}>{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ══ IP HERO CARD ══ */}
              <div className="ip-hero fd2">
                <div style={{padding:"clamp(26px,4.5vw,56px) clamp(24px,4vw,52px)",position:"relative",zIndex:1}}>

                  {/* Status bar */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"clamp(20px,3.5vw,36px)",flexWrap:"wrap",gap:10}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div className="dot-live" style={{width:12,height:12,borderRadius:"50%",flexShrink:0,background:ipLoad?"#ffd700":"#39ff14"}}/>
                      <span className="mono" style={{fontSize:"clamp(9px,1.8vw,13px)",letterSpacing:"0.24em",color:"var(--c)"}}>YOUR PUBLIC IPv4 ADDRESS</span>
                    </div>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
                      {ipLoad
                        ?<span className="pill" style={{color:"#ffd700",borderColor:"#ffd70042",background:"#ffd70012",fontSize:"clamp(8px,1.2vw,10px)"}}>RESOLVING<span className="blink">_</span></span>
                        :<>
                          <span className="pill" style={{color:"#39ff14",borderColor:"#39ff1442",background:"#39ff1412",fontSize:"clamp(8px,1.2vw,10px)"}}>✓ CONFIRMED</span>
                          <span className="pill" style={{color:"#00bfff",borderColor:"#00bfff42",background:"#00bfff0f",fontSize:"clamp(8px,1.2vw,10px)"}}>PUBLIC IPv4</span>
                          {ipInfo?.country_code&&ipInfo.country_code!=="—"&&
                            <span className="pill" style={{color:"#ffd700",borderColor:"#ffd70042",background:"#ffd7000f",fontSize:"clamp(8px,1.2vw,10px)"}}>{ipInfo.country_code}</span>}
                        </>
                      }
                    </div>
                  </div>

                  {/* Address box */}
                  <div className="ip-addr-box" style={{padding:"clamp(22px,4.5vw,52px) clamp(20px,4vw,48px)",marginBottom:"clamp(16px,2.8vw,28px)"}}>
                    <div className="cb cb-tl"/><div className="cb cb-tr"/>
                    <div className="cb cb-bl"/><div className="cb cb-br"/>

                    <div className="mono" style={{fontSize:"clamp(8px,1.3vw,11px)",letterSpacing:"0.36em",marginBottom:"clamp(12px,2.2vw,24px)",color:"rgba(0,255,231,0.24)"}}>
                      ◈ &nbsp; ADDRESS &nbsp;/&nbsp; CONFIRMED PUBLIC IPv4
                    </div>

                    {ipLoad?(
                      <div className="orb" style={{fontSize:"clamp(40px,10vw,112px)",color:"rgba(0,255,231,0.16)",fontWeight:900,letterSpacing:"0.04em",lineHeight:1.05}}>
                        ···.···.···.···<span className="blink">_</span>
                      </div>
                    ):(
                      <div className="orb ip-reveal glow-c" style={{fontWeight:900,color:"var(--c)",lineHeight:1.08,wordBreak:"break-all",overflowWrap:"break-word",letterSpacing:"clamp(0.02em,0.5vw,0.08em)",fontSize:ipFs}}>
                        {ipInfo?.ip??"UNAVAILABLE"}
                      </div>
                    )}

                    {!ipLoad&&ipInfo?.ip&&(
                      <div className="mono" style={{marginTop:"clamp(12px,2.2vw,22px)",fontSize:"clamp(9px,1.5vw,13px)",color:"rgba(255,255,255,0.24)",letterSpacing:"0.18em",display:"flex",flexWrap:"wrap",gap:"clamp(10px,2vw,24px)"}}>
                        {ipInfo.city&&ipInfo.city!=="—"&&<span>📍 {ipInfo.city}{ipInfo.country_name&&ipInfo.country_name!=="—"?`, ${ipInfo.country_name}`:""}</span>}
                        {ipInfo.timezone&&ipInfo.timezone!=="—"&&<span>🕐 {ipInfo.timezone}</span>}
                        {ipInfo.org&&ipInfo.org!=="—"&&<span className="hide-sm">🌐 {ipInfo.org.length>42?ipInfo.org.slice(0,42)+"…":ipInfo.org}</span>}
                      </div>
                    )}
                  </div>

                  {/* Geo tiles */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(180px,calc(50% - 6px)),1fr))",gap:"clamp(8px,1.5vw,14px)"}}>
                    {GEO_TILES.map(r=>(
                      <div key={r.label} className="geo-tile">
                        <div className="mono" style={{fontSize:"clamp(8px,1.1vw,10px)",letterSpacing:"0.18em",color:"rgba(255,255,255,0.2)",marginBottom:"clamp(5px,1vw,10px)"}}>{r.label}</div>
                        <div className="mono" style={{fontSize:"clamp(12px,2.2vw,18px)",fontWeight:"bold",color:r.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                          {ipLoad?<span style={{color:"rgba(255,255,255,0.1)"}}>···</span>:(r.value||"—")}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Sparklines */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,230px),1fr))",gap}} className="fd3">
                {([
                  {key:"net",color:"#00ffe7",label:"NETWORK ACTIVITY",unit:"kb/s"},
                  {key:"req",color:"#39ff14",label:"REQUESTS / SEC",  unit:"req/s"},
                  {key:"lat",color:"#bf5fff",label:"LATENCY",         unit:"ms"},
                ] as {key:string;color:string;label:string;unit:string}[]).map(s=>(
                  <div key={s.key} className="panel" style={{padding:"clamp(12px,2vw,18px)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
                      <span className="mono" style={{fontSize:"clamp(9px,1.3vw,11px)",letterSpacing:"0.14em",color:s.color}}>{s.label}</span>
                      <span className="mono" style={{fontSize:"clamp(11px,1.7vw,14px)",color:s.color,fontWeight:"bold"}}>
                        {Math.round(spark[s.key][spark[s.key].length-1]??0)}<span style={{fontSize:8,opacity:0.5}}> {s.unit}</span>
                      </span>
                    </div>
                    <Sparkline data={spark[s.key]??[]} color={s.color} height={44}/>
                  </div>
                ))}
              </div>

              {/* Feed + Radar + Uptime */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px),1fr))",gap}} className="fd4">
                <div className="panel" style={{gridColumn:"span 2"}}>
                  <div style={{padding:"clamp(14px,2.5vw,22px)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div className="dot-live" style={{width:7,height:7,borderRadius:"50%",background:"#ff3b5c",boxShadow:"0 0 7px #ff3b5c"}}/>
                        <span className="mono" style={{fontSize:9,letterSpacing:"0.16em",color:"#ff3b5c"}}>LIVE EVENT FEED</span>
                      </div>
                      <span className="pill" style={{color:"#ff3b5c",borderColor:"#ff3b5c40",background:"#ff3b5c10"}}>REAL-TIME</span>
                    </div>
                    <div style={{maxHeight:210,overflowY:"auto"}}>
                      {feed.map(item=><FeedItem key={item.id} item={item}/>)}
                    </div>
                  </div>
                </div>

                <div className="panel" style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"clamp(14px,2.5vw,22px)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",width:"100%",marginBottom:12}}>
                    <span className="mono" style={{fontSize:9,letterSpacing:"0.16em",color:"var(--c)"}}>NETWORK RADAR</span>
                    <span className="pill" style={{color:"#39ff14",borderColor:"#39ff1440",background:"#39ff1412"}}>LIVE</span>
                  </div>
                  <Radar/>
                  <div className="mono" style={{marginTop:10,fontSize:9,color:"rgba(255,255,255,0.16)",textAlign:"center"}}>SCANNING ACTIVE NODES</div>
                </div>

                <div className="panel panel-g">
                  <div style={{padding:"clamp(14px,2.5vw,22px)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <span className="mono" style={{fontSize:9,letterSpacing:"0.16em",color:"var(--g)"}}>UPTIME — 30 DAYS</span>
                      <span className="orb glow-g" style={{fontSize:18,fontWeight:900,color:"var(--g)"}}>99.94%</span>
                    </div>
                    <UptimeBar/>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:14}}>
                      {([{label:"INCIDENTS",value:"2",color:"#ff3b5c"},{label:"MTTR",value:"4m",color:"#ffd700"},{label:"SLA",value:"99.9%",color:"#39ff14"}] as {label:string;value:string;color:string}[]).map(s=>(
                        <div key={s.label} style={{padding:"9px 11px",borderRadius:8,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.05)",textAlign:"center"}}>
                          <div className="mono" style={{fontSize:14,fontWeight:"bold",color:s.color}}>{s.value}</div>
                          <div className="mono" style={{fontSize:7,color:"rgba(255,255,255,0.24)",marginTop:3}}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ VISITORS ═══ */}
          {tab==="visitors"&&(
            <div style={{display:"flex",flexDirection:"column",gap}} className="fade-up">
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {([
                  {label:`${VISITORS.length} TOTAL`,                              color:"#ffd700"},
                  {label:`${new Set(VISITORS.map(v=>v.ip)).size} UNIQUE IPs`,     color:"#00ffe7"},
                  {label:`${new Set(VISITORS.map(v=>v.country)).size} COUNTRIES`, color:"#39ff14"},
                  {label:`${VISITORS.filter(v=>v.device==="Bot").length} BOTS`,   color:"#ff3b5c"},
                ] as {label:string;color:string}[]).map(p=>(
                  <span key={p.label} className="pill" style={{color:p.color,borderColor:p.color+"40",background:p.color+"10",fontSize:10}}>{p.label}</span>
                ))}
              </div>

              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                <input type="text" placeholder="🔍  Filter by IP, country, city, browser, ISP..." value={filter} onChange={e=>setFilter(e.target.value)} className="sinput" style={{maxWidth:400}}/>
                <div style={{display:"flex",gap:5}}>
                  {(["timestamp","ip","country","browser"] as const).map(s=>(
                    <button key={s} onClick={()=>handleSort(s)} className="sbtn mono"
                      style={{color:sortCol===s?"var(--c)":"rgba(255,255,255,0.3)",borderColor:sortCol===s?"rgba(0,255,231,0.3)":"rgba(255,255,255,0.1)",background:sortCol===s?"rgba(0,255,231,0.08)":"transparent"}}>
                      {s.toUpperCase()} {sortCol===s?(sortDir==="asc"?"↑":"↓"):""}
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel panel-y" style={{overflow:"hidden"}}>
                <div style={{overflowX:"auto",maxHeight:"clamp(320px,55vh,580px)"}}>
                  <table className="dtable" style={{minWidth:860}}>
                    <thead><tr>
                      {["#","TIMESTAMP","IPv4","COUNTRY","CITY","ISP","PAGE","BROWSER","OS","DEVICE"].map(h=>(
                        <th key={h} className={sortCol===h.toLowerCase()?"sorted":""} onClick={()=>handleSort(h.toLowerCase())}>
                          {h}{sortCol===h.toLowerCase()?(sortDir==="asc"?" ↑":" ↓"):""}
                        </th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {filtered.map((v,i)=>(
                        <>
                          <tr key={v.id} onClick={()=>setExpandRow(expandRow===v.id?null:v.id)} style={{background:expandRow===v.id?"rgba(255,215,0,0.04)":"transparent"}}>
                            <td className="mono" style={{fontSize:10,color:"rgba(255,255,255,0.2)"}}>{i+1}</td>
                            <td className="mono" style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>{fmtD(v.timestamp)}</td>
                            <td><span className="orb" style={{fontSize:11,fontWeight:"bold",color:"#00ffe7",textShadow:"0 0 8px rgba(0,255,231,0.5)"}}>{v.ip}</span></td>
                            <td className="mono" style={{fontSize:10,color:"#39ff14"}}>{v.country}</td>
                            <td className="mono" style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>{v.city}</td>
                            <td className="mono" style={{fontSize:10,color:"#bf5fff",maxWidth:130,overflow:"hidden",textOverflow:"ellipsis"}}>{v.isp}</td>
                            <td className="mono" style={{fontSize:10,color:"rgba(0,255,231,0.65)"}}>{v.page}</td>
                            <td className="mono" style={{fontSize:10,color:bCol(v.browser)}}>{v.browser}</td>
                            <td className="mono" style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>{v.os}</td>
                            <td className="mono" style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>{dIcon(v.device)} {v.device}</td>
                          </tr>
                          {expandRow===v.id&&(
                            <tr key={`${v.id}-exp`}>
                              <td colSpan={10} style={{padding:"10px 12px 16px",background:"rgba(0,255,231,0.025)"}}>
                                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:8}}>
                                  {([
                                    {label:"FULL IP",     value:v.ip},
                                    {label:"COORDINATES", value:`${v.lat.toFixed(4)}, ${v.lon.toFixed(4)}`},
                                    {label:"FULL ISP",    value:v.isp},
                                    {label:"USER AGENT",  value:`${v.browser} on ${v.os}`},
                                    {label:"ENTRY PAGE",  value:v.page},
                                    {label:"SESSION",     value:`#SID-${String(v.id).padStart(4,"0")}`},
                                  ] as {label:string;value:string}[]).map(r=>(
                                    <div key={r.label} style={{padding:"8px 10px",borderRadius:7,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
                                      <div className="mono" style={{fontSize:8,letterSpacing:"0.12em",color:"rgba(255,255,255,0.2)",marginBottom:3}}>{r.label}</div>
                                      <div className="mono" style={{fontSize:10,color:"rgba(0,255,231,0.75)",wordBreak:"break-all"}}>{r.value}</div>
                                    </div>
                                  ))}
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

              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,340px),1fr))",gap}}>
                <div className="panel panel-g" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <span className="mono" style={{fontSize:9,letterSpacing:"0.16em",color:"var(--g)"}}>◆ TOP IPv4 ADDRESSES</span>
                    <span className="pill" style={{color:"var(--g)",borderColor:"#39ff1440",background:"#39ff1412"}}>RANKED</span>
                  </div>
                  {(()=>{
                    const cnt:Record<string,number>={};
                    VISITORS.forEach(v=>{cnt[v.ip]=(cnt[v.ip]??0)+1;});
                    const sorted=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,8);
                    const mx=sorted[0]?.[1]??1;
                    return sorted.map(([ip,count],i)=>{
                      const info=VISITORS.find(v=>v.ip===ip);
                      return (
                        <div key={ip} style={{marginBottom:12}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                            <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0}}>
                              <span className="mono" style={{fontSize:9,width:14,color:"rgba(255,255,255,0.25)",flexShrink:0}}>{i+1}</span>
                              <span className="orb" style={{fontSize:11,fontWeight:"bold",color:CL10[i],textShadow:`0 0 6px ${CL10[i]}70`}}>{ip}</span>
                              <span className="mono" style={{fontSize:9,color:"rgba(255,255,255,0.3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{info?.country} {info?.city}</span>
                            </div>
                            <span className="mono" style={{fontSize:10,color:CL10[i],flexShrink:0,marginLeft:8}}>{count}×</span>
                          </div>
                          <div className="pbar" style={{marginLeft:22}}>
                            <div className="pfill" style={{width:`${(count/mx)*100}%`,background:CL10[i],boxShadow:`0 0 6px ${CL10[i]}`}}/>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                <div className="panel panel-p" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <span className="mono" style={{fontSize:9,letterSpacing:"0.16em",color:"var(--p)"}}>◉ VISITORS BY COUNTRY</span>
                    <span className="pill" style={{color:"var(--p)",borderColor:"#bf5fff40",background:"#bf5fff12"}}>GEO</span>
                  </div>
                  {(()=>{
                    const cnt:Record<string,number>={};
                    VISITORS.forEach(v=>{cnt[v.country]=(cnt[v.country]??0)+1;});
                    const sorted=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,8);
                    const mx=sorted[0]?.[1]??1;
                    return sorted.map(([country,count],i)=>(
                      <div key={country} style={{marginBottom:12}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                          <span className="mono" style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>{country}</span>
                          <span className="mono" style={{fontSize:10,color:CL10[i]}}>{count} visit{count!==1?"s":""}</span>
                        </div>
                        <div className="pbar">
                          <div className="pfill" style={{width:`${(count/mx)*100}%`,background:CL10[i],boxShadow:`0 0 5px ${CL10[i]}`}}/>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* ═══ METRICS ═══ */}
          {tab==="metrics"&&(
            <div style={{display:"flex",flexDirection:"column",gap}} className="fade-up">
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,400px),1fr))",gap}}>
                <div className="panel" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <span className="mono" style={{fontSize:9,letterSpacing:"0.16em",color:"var(--c)"}}>◈ HOURLY TRAFFIC</span>
                    <span className="pill" style={{color:"var(--c)",borderColor:"#00ffe740",background:"#00ffe710"}}>TODAY</span>
                  </div>
                  <BarChart data={HOURLY} color="#00ffe7"/>
                </div>
                <div className="panel" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <span className="mono" style={{fontSize:9,letterSpacing:"0.16em",color:"var(--y)"}}>▣ WEEKLY VISITS</span>
                    <span className="pill" style={{color:"var(--y)",borderColor:"#ffd70040",background:"#ffd70010"}}>7 DAYS</span>
                  </div>
                  <BarChart data={WEEKLY} color="#ffd700"/>
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,280px),1fr))",gap}}>
                {([
                  {title:"BROWSER DISTRIBUTION",data:BR_DIST,ac:"var(--c)"},
                  {title:"DEVICE DISTRIBUTION", data:DV_DIST, ac:"var(--y)"},
                ] as {title:string;data:DonutSeg[];ac:string}[]).map(({title,data,ac})=>(
                  <div key={title} className="panel" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                    <span className="mono" style={{fontSize:9,letterSpacing:"0.14em",color:ac,display:"block",marginBottom:14}}>{title}</span>
                    <div style={{display:"flex",alignItems:"center",gap:20}}>
                      <DonutChart segments={data} size={110}/>
                      <div style={{display:"flex",flexDirection:"column",gap:9,flex:1}}>
                        {data.map(d=>(
                          <div key={d.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div style={{display:"flex",alignItems:"center",gap:6}}>
                              <div style={{width:8,height:8,borderRadius:2,background:d.color}}/>
                              <span className="mono" style={{fontSize:9,color:"rgba(255,255,255,0.5)"}}>{d.label}</span>
                            </div>
                            <span className="mono" style={{fontSize:11,fontWeight:"bold",color:d.color}}>{d.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="panel panel-r" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                  <span className="mono" style={{fontSize:9,letterSpacing:"0.14em",color:"var(--r)",display:"block",marginBottom:16}}>⚡ PERFORMANCE</span>
                  <div style={{display:"flex",flexDirection:"column",gap:13}}>
                    {([
                      {label:"BOUNCE RATE",   value:34,color:"#ff3b5c",display:"34%"},
                      {label:"AVG SESSION",   value:62,color:"#ffd700",display:"4m 22s"},
                      {label:"PAGES/SESSION", value:47,color:"#00ffe7",display:"3.2"},
                      {label:"CONVERSION",    value:8, color:"#39ff14",display:"8.1%"},
                    ] as {label:string;value:number;color:string;display:string}[]).map(m=>(
                      <div key={m.label}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                          <span className="mono" style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>{m.label}</span>
                          <span className="mono" style={{fontSize:11,fontWeight:"bold",color:m.color}}>{m.display}</span>
                        </div>
                        <div className="pbar">
                          <div className="pfill" style={{width:`${m.value}%`,background:m.color,boxShadow:`0 0 6px ${m.color}55`}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel panel-p" style={{padding:"clamp(14px,2.5vw,22px)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <span className="mono" style={{fontSize:9,letterSpacing:"0.14em",color:"var(--p)"}}>◉ TOP PAGES</span>
                  <span className="pill" style={{color:"var(--p)",borderColor:"#bf5fff40",background:"#bf5fff10"}}>LIVE</span>
                </div>
                <table className="dtable">
                  <thead><tr>{["PAGE","VISITS","UNIQUE","AVG TIME","BOUNCE","REVENUE"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {([
                      {page:"/dashboard",visits:1240,unique:832,time:"5m 14s",bounce:"28%",rev:"$3,120"},
                      {page:"/pricing",  visits:890, unique:711,time:"3m 02s",bounce:"41%",rev:"$2,670"},
                      {page:"/blog",     visits:650, unique:590,time:"6m 47s",bounce:"22%",rev:"$0"},
                      {page:"/home",     visits:520, unique:480,time:"1m 38s",bounce:"62%",rev:"$0"},
                      {page:"/docs",     visits:410, unique:388,time:"8m 12s",bounce:"15%",rev:"$0"},
                      {page:"/contact",  visits:280, unique:260,time:"2m 01s",bounce:"38%",rev:"$890"},
                    ] as {page:string;visits:number;unique:number;time:string;bounce:string;rev:string}[]).map(r=>(
                      <tr key={r.page}>
                        <td className="mono" style={{fontSize:11,color:"rgba(0,255,231,0.75)",fontWeight:"bold"}}>{r.page}</td>
                        <td className="mono" style={{fontSize:11,color:"#ffd700"}}>{r.visits.toLocaleString()}</td>
                        <td className="mono" style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>{r.unique.toLocaleString()}</td>
                        <td className="mono" style={{fontSize:11,color:"#39ff14"}}>{r.time}</td>
                        <td className="mono" style={{fontSize:11,color:parseFloat(r.bounce)>50?"#ff3b5c":"#39ff14"}}>{r.bounce}</td>
                        <td className="mono" style={{fontSize:11,color:r.rev==="$0"?"rgba(255,255,255,0.2)":"#ffd700"}}>{r.rev}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>

        <footer className="mono" style={{textAlign:"center",padding:"16px 0 36px",fontSize:8,letterSpacing:"0.2em",color:"rgba(0,255,231,0.07)"}}>
          RYTNIX SECURE SYSTEMS — ADMIN COMMAND CENTER — {now.getFullYear()}
        </footer>
      </div>
    </>
  );
};

export default AdminPanel;