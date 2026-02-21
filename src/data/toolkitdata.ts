// ═══════════════════════════════════════════════════════════════
//  toolkitData.ts  —  Data layer for CyberToolkit
// ═══════════════════════════════════════════════════════════════

// ── Types ─────────────────────────────────────────────────────────
export interface SocialPlatform {
  name: string;
  url: (username: string) => string;
}

export interface SecurityHeader {
  name: string;
  docs: string;
}

export interface HashSignature {
  name: string;
  regex: RegExp;
  bits?: number;
}

export interface CvssMetricOption {
  v: string;
  l: string;
  s?: number;
}

export interface CvssMetric {
  label: string;
  opts: CvssMetricOption[];
}

export interface TimelineEvent {
  time: string;
  event: string;
  severity: "critical" | "high" | "medium" | "low";
}

export interface ToolMeta {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji icon
  category: string;
  color: string;
  tags: string[];
}

export interface SectionMeta {
  id: string;
  label: string;
  color: string;
  tools: ToolMeta[];
}

// ── Colors ────────────────────────────────────────────────────────
export const NEON   = "#00ffcc";
export const ACCENT = "#00e6ff";

// ── Social platforms ───────────────────────────────────────────────
export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { name: "GitHub",     url: (u) => `https://github.com/${u}` },
  { name: "Twitter/X",  url: (u) => `https://x.com/${u}` },
  { name: "Reddit",     url: (u) => `https://reddit.com/u/${u}` },
  { name: "Instagram",  url: (u) => `https://instagram.com/${u}` },
  { name: "LinkedIn",   url: (u) => `https://linkedin.com/in/${u}` },
  { name: "TikTok",     url: (u) => `https://tiktok.com/@${u}` },
  { name: "YouTube",    url: (u) => `https://youtube.com/@${u}` },
  { name: "Twitch",     url: (u) => `https://twitch.tv/${u}` },
  { name: "Pinterest",  url: (u) => `https://pinterest.com/${u}` },
  { name: "Telegram",   url: (u) => `https://t.me/${u}` },
  { name: "Discord",    url: (u) => `https://discord.com/users/${u}` },
  { name: "Mastodon",   url: (u) => `https://mastodon.social/@${u}` },
  { name: "HackerNews", url: (u) => `https://news.ycombinator.com/user?id=${u}` },
  { name: "Keybase",    url: (u) => `https://keybase.io/${u}` },
];

// ── Security headers ───────────────────────────────────────────────
export const SECURITY_HEADERS: SecurityHeader[] = [
  { name: "Content-Security-Policy",    docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" },
  { name: "X-Frame-Options",            docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options" },
  { name: "X-XSS-Protection",           docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection" },
  { name: "X-Content-Type-Options",     docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options" },
  { name: "Strict-Transport-Security",  docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security" },
  { name: "Referrer-Policy",            docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy" },
  { name: "Permissions-Policy",         docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy" },
  { name: "Cross-Origin-Opener-Policy", docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy" },
];

// ── Hash signatures ────────────────────────────────────────────────
export const HASH_SIGNATURES: HashSignature[] = [
  { name: "MD5",           regex: /^[a-f0-9]{32}$/i,  bits: 128 },
  { name: "SHA-1",         regex: /^[a-f0-9]{40}$/i,  bits: 160 },
  { name: "SHA-256",       regex: /^[a-f0-9]{64}$/i,  bits: 256 },
  { name: "SHA-384",       regex: /^[a-f0-9]{96}$/i,  bits: 384 },
  { name: "SHA-512",       regex: /^[a-f0-9]{128}$/i, bits: 512 },
  { name: "NTLM",          regex: /^[a-f0-9]{32}$/i,  bits: 128 },
  { name: "bcrypt",        regex: /^\$2[aby]\$\d{2}\$.{53}$/ },
  { name: "SHA-512-crypt", regex: /^\$6\$.{8,16}\$.{86}$/ },
  { name: "CRC32",         regex: /^[a-f0-9]{8}$/i,   bits: 32  },
  { name: "Whirlpool",     regex: /^[a-f0-9]{128}$/i, bits: 512 },
];

// ── CVSS v3.1 metrics ──────────────────────────────────────────────
export const CVSS_METRICS: Record<string, CvssMetric> = {
  AV: { label: "Attack Vector",     opts: [{ v:"N", l:"Network", s:0.85 },{ v:"A", l:"Adjacent", s:0.62 },{ v:"L", l:"Local", s:0.55 },{ v:"P", l:"Physical", s:0.2 }] },
  AC: { label: "Attack Complexity", opts: [{ v:"L", l:"Low", s:0.77 },{ v:"H", l:"High", s:0.44 }] },
  PR: { label: "Privileges Req.",   opts: [{ v:"N", l:"None", s:0.85 },{ v:"L", l:"Low", s:0.62 },{ v:"H", l:"High", s:0.27 }] },
  UI: { label: "User Interaction",  opts: [{ v:"N", l:"None", s:0.85 },{ v:"R", l:"Required", s:0.62 }] },
  S:  { label: "Scope",             opts: [{ v:"U", l:"Unchanged" },{ v:"C", l:"Changed" }] },
  C:  { label: "Confidentiality",   opts: [{ v:"N", l:"None", s:0.0 },{ v:"L", l:"Low", s:0.22 },{ v:"H", l:"High", s:0.56 }] },
  I:  { label: "Integrity",         opts: [{ v:"N", l:"None", s:0.0 },{ v:"L", l:"Low", s:0.22 },{ v:"H", l:"High", s:0.56 }] },
  A:  { label: "Availability",      opts: [{ v:"N", l:"None", s:0.0 },{ v:"L", l:"Low", s:0.22 },{ v:"H", l:"High", s:0.56 }] },
};

// ── Timeline defaults ──────────────────────────────────────────────
export const DEFAULT_TIMELINE_EVENTS: TimelineEvent[] = [
  { time: "2026-02-21 09:00:00", event: "Initial access via phishing email",         severity: "critical" },
  { time: "2026-02-21 09:14:32", event: "Persistence via registry key modification", severity: "high"     },
  { time: "2026-02-21 11:35:48", event: "Lateral movement to domain controller",     severity: "critical" },
  { time: "2026-02-21 14:22:19", event: "Data exfiltration detected (2.3 GB)",       severity: "critical" },
];

// ── Payloads ───────────────────────────────────────────────────────
export const XSS_PAYLOADS: string[] = [
  "<script>alert(1)</script>",
  "\"><script>alert(1)</script>",
  "<img src=x onerror='alert(1)'>",
  "<svg onload='alert(document.cookie)'>",
];

export const SQLI_PAYLOADS: string[] = [
  "' OR '1'='1", "' OR 1=1--", "1; DROP TABLE users--",
  "' UNION SELECT 1,2,3--", "admin'--", "1' AND SLEEP(5)--",
];

// ── Password charsets ──────────────────────────────────────────────
export const PASSWORD_CHARSETS: Record<string, string> = {
  upper:   "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower:   "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

// ── Domain / network data ──────────────────────────────────────────
export const REGISTRARS: string[]       = ["GoDaddy","Namecheap","Cloudflare","Google Domains","Porkbun","Dynadot"];
export const SSL_ISSUERS: string[]      = ["Let's Encrypt","DigiCert Inc","Sectigo Limited","GlobalSign"];
export const CAMERA_MAKES: string[]     = ["Apple","Samsung","Canon","Nikon","Sony"];
export const PHOTO_SOFTWARE: string[]   = ["Lightroom 12.0","GIMP 2.10","iPhone 15 Pro","Photoshop 25.0"];
export const COMMON_SUBDOMAINS: string[]= ["www","mail","ftp","smtp","pop","imap","vpn","dev","staging","api","app","admin","portal","cdn","static","blog","shop","help","support","docs","git","ns1","ns2"];
export const HTTP_METHODS: string[]     = ["GET","POST","PUT","DELETE","PATCH","OPTIONS","HEAD","TRACE","CONNECT"];
export const SCAN_VENDORS: string[]     = ["Google Safe Browsing","VirusTotal","URLScan.io","Phishtank","ESET","Kaspersky","Malwarebytes","Symantec"];

// ── Port services ──────────────────────────────────────────────────
export const PORT_SERVICES: Record<number, string> = {
  21:"FTP", 22:"SSH", 23:"Telnet", 25:"SMTP", 53:"DNS", 80:"HTTP",
  110:"POP3", 143:"IMAP", 443:"HTTPS", 445:"SMB", 1433:"MSSQL",
  3306:"MySQL", 3389:"RDP", 5432:"PostgreSQL", 5900:"VNC",
  6379:"Redis", 8080:"HTTP-Alt", 8443:"HTTPS-Alt", 8888:"Jupyter", 27017:"MongoDB",
};
export const COMMON_PORTS: number[] = Object.keys(PORT_SERVICES).map(Number);

// ── Sample log ─────────────────────────────────────────────────────
export const SAMPLE_ACCESS_LOG = `192.168.1.105 - - [21/Feb/2026:14:23:01] "GET /admin HTTP/1.1" 403 512
10.0.0.55 - - [21/Feb/2026:14:23:15] "POST /login HTTP/1.1" 200 128
45.33.32.156 - - [21/Feb/2026:14:24:01] "GET /../../../etc/passwd HTTP/1.1" 404 0
45.33.32.156 - - [21/Feb/2026:14:25:01] "GET /shell.php HTTP/1.1" 404 0
87.65.43.21 - - [21/Feb/2026:14:26:10] "POST /wp-login.php HTTP/1.1" 200 420
87.65.43.21 - - [21/Feb/2026:14:26:11] "POST /wp-login.php HTTP/1.1" 200 420
87.65.43.21 - - [21/Feb/2026:14:26:12] "POST /wp-login.php HTTP/1.1" 200 420
192.168.1.1 - - [21/Feb/2026:14:27:00] "GET / HTTP/1.1" 200 2048
203.0.113.8 - - [21/Feb/2026:14:28:00] "GET /union+select+1,2,3-- HTTP/1.1" 400 0`;

// ── Tool sections registry ─────────────────────────────────────────
export const TOOL_SECTIONS: SectionMeta[] = [
  {
    id: "osint", label: "OSINT", color: NEON,
    tools: [
      { id:"email-breach",    name:"Email Breach Checker", icon:"📧", description:"Check if email was exposed in known data breaches.",       category:"OSINT",   color:NEON,      tags:["breach","email","hibp"] },
      { id:"username-finder", name:"Username Finder",      icon:"🔍", description:"Hunt username across 14 major social platforms.",          category:"OSINT",   color:NEON,      tags:["username","osint","social"] },
      { id:"whois",           name:"WHOIS Lookup",         icon:"🌐", description:"Retrieve domain registration and ownership info.",         category:"OSINT",   color:NEON,      tags:["whois","domain","registrar"] },
      { id:"subdomain-enum",  name:"Subdomain Enumerator", icon:"🔗", description:"Discover subdomains via wordlist brute-force simulation.", category:"OSINT",   color:NEON,      tags:["subdomain","enum","recon"] },
      { id:"google-dork",     name:"Google Dork Builder",  icon:"🎯", description:"Build advanced Google search operators for recon.",        category:"OSINT",   color:NEON,      tags:["dork","google","recon"] },
    ],
  },
  {
    id: "network", label: "NETWORK", color: ACCENT,
    tools: [
      { id:"ip-lookup",    name:"IP Geolocation",       icon:"🖥️", description:"Geolocate IPs and reveal ISP/ASN data.",                  category:"Network", color:ACCENT,    tags:["ip","geo","asn"] },
      { id:"dns-lookup",   name:"DNS Record Lookup",    icon:"🗄️", description:"Enumerate A, AAAA, MX, NS, TXT, CNAME, SOA records.",     category:"Network", color:ACCENT,    tags:["dns","mx","ns","txt"] },
      { id:"port-scanner", name:"Port Scanner",         icon:"📡", description:"Simulate scanning 20 common service ports on a target.",   category:"Network", color:ACCENT,    tags:["nmap","ports","services"] },
      { id:"traceroute",   name:"Traceroute Simulator", icon:"📍", description:"Simulate network hop analysis to a target host.",          category:"Network", color:ACCENT,    tags:["traceroute","hops","latency"] },
    ],
  },
  {
    id: "web", label: "WEB SECURITY", color: "#10b981",
    tools: [
      { id:"security-headers", name:"Security Headers",      icon:"🛡️", description:"Detect missing HTTP security headers, A–F grading.",   category:"Web", color:"#10b981", tags:["headers","csp","hsts"] },
      { id:"ssl-checker",      name:"SSL Certificate",       icon:"🔒", description:"Inspect TLS validity, issuer, and cipher suite.",       category:"Web", color:"#10b981", tags:["ssl","tls","certificate"] },
      { id:"xss-tester",       name:"XSS Input Tester",      icon:"💉", description:"Analyze inputs for cross-site scripting patterns.",     category:"Web", color:"#10b981", tags:["xss","injection"] },
      { id:"sqli-tester",      name:"SQL Injection Tester",  icon:"🗃️", description:"Detect SQL injection patterns in user input.",         category:"Web", color:"#10b981", tags:["sqli","sql","injection"] },
      { id:"cors-checker",     name:"CORS Misconfiguration", icon:"🌍", description:"Check for overly permissive CORS configurations.",      category:"Web", color:"#10b981", tags:["cors","origin","api"] },
    ],
  },
  {
    id: "malware", label: "MALWARE ANALYSIS", color: "#ef4444",
    tools: [
      { id:"file-hash",        name:"File Hash Generator", icon:"#️⃣", description:"Compute SHA-1/256/512 hashes for files or text.",        category:"Malware", color:"#ef4444", tags:["sha256","hash","integrity"] },
      { id:"url-scanner",      name:"URL Malware Scanner", icon:"🔗", description:"Simulate multi-engine malware analysis of URLs.",          category:"Malware", color:"#ef4444", tags:["url","malware","phishing"] },
      { id:"string-extractor", name:"String Extractor",    icon:"🔬", description:"Extract printable strings from obfuscated/binary input.", category:"Malware", color:"#ef4444", tags:["strings","binary","reverse"] },
    ],
  },
  {
    id: "crypto", label: "CRYPTOGRAPHY", color: "#a855f7",
    tools: [
      { id:"password-gen",      name:"Password Generator",      icon:"🔑", description:"Secure passwords via WebCrypto getRandomValues.",       category:"Crypto", color:"#a855f7", tags:["password","entropy","generator"] },
      { id:"password-strength", name:"Password Strength Meter", icon:"⚡", description:"Evaluate complexity and estimate offline crack time.",  category:"Crypto", color:"#a855f7", tags:["password","strength","crack"] },
      { id:"base64",            name:"Base64 Encode / Decode",  icon:"🔀", description:"Encode or decode Base64 strings for payload analysis.", category:"Crypto", color:"#a855f7", tags:["base64","encode","decode","ctf"] },
      { id:"hash-identifier",   name:"Hash Identifier",         icon:"🔎", description:"Identify hash types: MD5, SHA, bcrypt, NTLM and more.", category:"Crypto", color:"#a855f7", tags:["hash","identify","md5","ntlm"] },
      { id:"caesar-cipher",     name:"Caesar / ROT Cipher",     icon:"🔄", description:"Encode, decode, or brute-force all 25 rotations.",      category:"Crypto", color:"#a855f7", tags:["caesar","rot13","cipher","ctf"] },
    ],
  },
  {
    id: "forensics", label: "FORENSICS", color: "#eab308",
    tools: [
      { id:"exif-viewer",  name:"EXIF Metadata Viewer", icon:"📷", description:"Extract GPS, device, and software metadata from images.",  category:"Forensics", color:"#eab308", tags:["exif","metadata","gps"] },
      { id:"log-analyzer", name:"Log Analyzer",         icon:"📋", description:"Parse Apache/Nginx logs to detect attacks & anomalies.",   category:"Forensics", color:"#eab308", tags:["logs","apache","nginx"] },
      { id:"timeline",     name:"Incident Timeline",    icon:"⏱️", description:"Build chronological IR timelines with severity levels.",   category:"Forensics", color:"#eab308", tags:["timeline","ir","dfir"] },
    ],
  },
  {
    id: "recon", label: "RECON & VULN", color: "#f97316",
    tools: [
      { id:"cvss-calculator",    name:"CVSS Score Calculator", icon:"⚠️", description:"Calculate CVSS v3.1 base scores and severity ratings.", category:"Recon", color:"#f97316", tags:["cvss","cve","vulnerability"] },
      { id:"http-method-tester", name:"HTTP Method Tester",    icon:"🌐", description:"Test which HTTP verbs are accepted on an endpoint.",    category:"Recon", color:"#f97316", tags:["http","methods","verb"] },
    ],
  },
  {
    id: "utils", label: "ENCODING & UTILS", color: "#ec4899",
    tools: [
      { id:"url-encoder",   name:"URL Encoder / Decoder", icon:"🔗", description:"Percent-encode or decode strings for payload crafting.",        category:"Utils", color:"#ec4899", tags:["url","encode","decode","percent"] },
      { id:"hex-converter", name:"Hex / ASCII Converter", icon:"💻", description:"Convert between hex, ASCII, binary, and decimal.",               category:"Utils", color:"#ec4899", tags:["hex","ascii","binary","ctf"] },
      { id:"regex-tester",  name:"Regex Pattern Tester",  icon:"🔍", description:"Test regex patterns against sample text in real-time.",          category:"Utils", color:"#ec4899", tags:["regex","pattern","waf","log"] },
    ],
  },
];

export const ALL_TOOLS = TOOL_SECTIONS.flatMap(s => s.tools.map(t => ({ ...t, sectionId: s.id })));
export const TOOL_COUNT = ALL_TOOLS.length;