import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, memo, useRef } from "react";
import {
  Terminal,
  Network,
  Shield,
  Radar,
  Bug,
  Lock,
  CheckCircle,
  BookOpen,
  Award,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Zap,
  Users,
  Globe,
  Code2,
  Target,
  Eye,
  ChevronDown,
  ChevronUp,
  FlaskConical,
} from "lucide-react";

/* =====================================================
   ANIMATION VARIANTS
===================================================== */

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -40, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardHover: Variants = {
  hover: {
    y: -6,
    scale: 1.015,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const pulseDot: Variants = {
  animate: {
    scale: [1, 1.6, 1],
    opacity: [1, 0.4, 1],
    boxShadow: [
      "0 0 0 0 rgba(34,211,238,0.8)",
      "0 0 0 12px rgba(34,211,238,0)",
      "0 0 0 0 rgba(34,211,238,0)",
    ],
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
};

const iconFloat: Variants = {
  animate: {
    y: [-3, 3, -3],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

/* =====================================================
   TYPES
===================================================== */

type Role = "SOC" | "VAPT" | "BOTH";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface Tool { name: string; slug: string; }
interface Lab { name: string; url: string; level: Difficulty; platform: "THM" | "HTB" | "Other"; }
interface RoadmapStep {
  title: string;
  role: Role;
  icon: any;
  color: string;
  description: string;
  ideology: string;
  objectives: string[];
  outcomes: string[];
  tools: Tool[];
  labs: Lab[];
  softSkills: string[];
}

/* =====================================================
   ENRICHED ROADMAP DATA
===================================================== */

const roadmap: RoadmapStep[] = [
  {
    title: "Linux & OS Fundamentals",
    role: "BOTH",
    icon: Terminal,
    color: "cyan",
    description:
      "Strong Linux fundamentals are mandatory for both SOC analysts and penetration testers. This phase builds terminal confidence and OS-level understanding required for all security tooling.",
    ideology:
      "Security professionals must be comfortable operating without a GUI. Understanding the OS deeply means understanding how attackers and defenders interact with systems at their core.",
    objectives: [
      "Understand the Linux directory structure and filesystem hierarchy",
      "Master essential terminal commands and shell scripting basics",
      "Learn process, service, and user management",
      "Understand file permissions, ownership, and privilege concepts",
      "Navigate and manipulate the Windows environment for security tasks",
    ],
    outcomes: [
      "Navigate Linux confidently without a GUI",
      "Analyze system behavior and identify anomalies",
      "Prepare your environment for any security tooling",
    ],
    tools: [
      { name: "Linux", slug: "linux" },
      { name: "Bash", slug: "bash" },
      { name: "PowerShell", slug: "powershell" },
    ],
    labs: [
      { name: "Linux Fundamentals Path", url: "https://tryhackme.com/path/outline/linux", level: "Beginner", platform: "THM" },
      { name: "Windows Fundamentals", url: "https://tryhackme.com/module/hacking-windows-1", level: "Beginner", platform: "THM" },
      { name: "Linux Fundamentals Module", url: "https://academy.hackthebox.com/module/details/18", level: "Beginner", platform: "HTB" },
    ],
    softSkills: ["Attention to detail", "Patience with the command line", "Self-directed learning"],
  },
  {
    title: "Networking & Traffic Analysis",
    role: "SOC",
    icon: Network,
    color: "blue",
    description:
      "SOC analysts must understand how data flows across networks to detect anomalies and intrusions. This phase covers TCP/IP deeply, packet analysis, and traffic pattern recognition.",
    ideology:
      "SOC's defensive posture depends on visibility. You can't protect what you can't see — mastering network traffic analysis gives you the eyes to detect beaconing, lateral movement, and C2 communications in real time.",
    objectives: [
      "Understand TCP/IP model and OSI layers with practical mapping",
      "Read and interpret packet captures using Wireshark",
      "Identify malicious traffic patterns (scans, beaconing, exfil)",
      "Understand DNS, HTTP, HTTPS, DHCP, VPN traffic flows",
      "Analyze firewall and proxy logs for anomalous behavior",
    ],
    outcomes: [
      "Perform packet-level traffic analysis",
      "Detect network-based attack patterns",
      "Correlate network events with alerts",
    ],
    tools: [
      { name: "Wireshark", slug: "wireshark" },
      { name: "tcpdump", slug: "tcpdump" },
      { name: "Zeek", slug: "zeek" },
    ],
    labs: [
      { name: "Network Fundamentals Path", url: "https://tryhackme.com/path/outline/presecurity", level: "Beginner", platform: "THM" },
      { name: "Wireshark Room", url: "https://tryhackme.com/room/wireshark", level: "Beginner", platform: "THM" },
      { name: "Blue Team Labs Online – Traffic Analysis", url: "https://blueteamlabs.online", level: "Intermediate", platform: "Other" },
      { name: "Intro to Network Traffic Analysis", url: "https://academy.hackthebox.com/module/details/81", level: "Intermediate", platform: "HTB" },
    ],
    softSkills: ["Pattern recognition", "Analytical mindset", "Curiosity about anomalies"],
  },
  {
    title: "Security Fundamentals & Threat Modeling",
    role: "BOTH",
    icon: Shield,
    color: "purple",
    description:
      "Learn core cybersecurity concepts, the CIA Triad, threat actors, attack vectors, and how to model real-world threats using industry frameworks like MITRE ATT&CK.",
    ideology:
      "Both defenders and attackers share one foundation: understanding how threats work. SOC maps attacker behavior to detect it. VAPT simulates it to expose gaps. MITRE ATT&CK bridges both worlds — making this phase universal.",
    objectives: [
      "Understand CIA Triad: Confidentiality, Integrity, Availability",
      "Learn threat actor types, motivations, and TTPs",
      "Map attacks and detections using MITRE ATT&CK framework",
      "Understand common attack vectors: phishing, malware, brute force",
      "Differentiate between Indicators of Compromise (IoCs) and IoAs",
    ],
    outcomes: [
      "Think like both an attacker and defender",
      "Map real-world threats to MITRE ATT&CK techniques",
      "Understand enterprise threat landscape",
    ],
    tools: [
      { name: "MITRE ATT&CK", slug: "mitre-attck" },
      { name: "SIEM", slug: "siem" },
      { name: "OSINT Framework", slug: "osint-framework" },
    ],
    labs: [
      { name: "Pre Security Path", url: "https://tryhackme.com/path/outline/presecurity", level: "Beginner", platform: "THM" },
      { name: "Cyber Defense Path", url: "https://tryhackme.com/path/outline/blueteam", level: "Intermediate", platform: "THM" },
      { name: "Introduction to Cyber Security", url: "https://academy.hackthebox.com/path/preview/introduction-to-cybersecurity", level: "Beginner", platform: "HTB" },
    ],
    softSkills: ["Strategic thinking", "Documentation discipline", "Threat awareness"],
  },
  {
    title: "Reconnaissance & Enumeration",
    role: "VAPT",
    icon: Radar,
    color: "amber",
    description:
      "Learn how attackers enumerate targets — from passive OSINT to active scanning. This phase focuses on understanding attack surface mapping before any exploitation begins.",
    ideology:
      "VAPT follows the attacker methodology — reconnaissance is 80% of the work. The principle: 'You can't exploit what you haven't discovered.' Systematic enumeration separates amateurs from professionals.",
    objectives: [
      "Perform passive reconnaissance using OSINT techniques",
      "Conduct active host and service discovery with Nmap",
      "Enumerate web directories, subdomains, and endpoints",
      "Fingerprint operating systems, services, and banners",
      "Map the full attack surface for an engagement",
    ],
    outcomes: [
      "Produce professional attack surface maps",
      "Discover exposed services and misconfigurations",
      "Prepare a structured pre-exploitation dossier",
    ],
    tools: [
      { name: "Nmap", slug: "nmap" },
      { name: "theHarvester", slug: "theharvester" },
      { name: "Gobuster", slug: "gobuster" },
      { name: "Maltego", slug: "maltego" },
    ],
    labs: [
      { name: "Nmap Room", url: "https://tryhackme.com/room/furthernmap", level: "Beginner", platform: "THM" },
      { name: "Jr Penetration Tester Path", url: "https://tryhackme.com/path/outline/jrpenetrationtester", level: "Intermediate", platform: "THM" },
      { name: "Starting Point – Tier 1", url: "https://app.hackthebox.com/starting-point", level: "Beginner", platform: "HTB" },
      { name: "Footprinting Module", url: "https://academy.hackthebox.com/module/details/112", level: "Intermediate", platform: "HTB" },
    ],
    softSkills: ["Methodical approach", "Documentation", "Curiosity"],
  },
  {
    title: "Web Application Security",
    role: "VAPT",
    icon: Code2,
    color: "rose",
    description:
      "Deep dive into web vulnerabilities from the OWASP Top 10. This phase teaches you to identify and exploit SQL Injection, XSS, IDOR, SSRF, CSRF, and broken authentication in real applications.",
    ideology:
      "Web apps are the largest attack surface in modern organizations. The VAPT mindset here is: trust nothing from the client. Every input field, header, cookie, and API endpoint is a potential vulnerability waiting to be tested.",
    objectives: [
      "Understand client-server architecture, sessions, and cookies",
      "Test for OWASP Top 10 vulnerabilities systematically",
      "Exploit SQL Injection, XSS, IDOR, SSRF, CSRF, Command Injection",
      "Test authentication, authorization, and business logic flaws",
      "Perform API security testing against REST and GraphQL endpoints",
    ],
    outcomes: [
      "Conduct structured web application penetration tests",
      "Write findings with PoC evidence and CVSS scores",
      "Recommend actionable remediation for each vulnerability",
    ],
    tools: [
      { name: "Burp Suite", slug: "burp-suite" },
      { name: "SQLmap", slug: "sqlmap" },
      { name: "Nikto", slug: "nikto" },
      { name: "OWASP ZAP", slug: "owasp-zap" },
    ],
    labs: [
      { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", level: "Intermediate", platform: "Other" },
      { name: "OWASP Top 10 Room", url: "https://tryhackme.com/room/owasptop10", level: "Beginner", platform: "THM" },
      { name: "Web Fundamentals Path", url: "https://tryhackme.com/path/outline/web", level: "Intermediate", platform: "THM" },
      { name: "Web Application Penetration Testing", url: "https://academy.hackthebox.com/path/preview/web-application-penetration-tester", level: "Advanced", platform: "HTB" },
    ],
    softSkills: ["Persistence", "Creative thinking", "Ethical responsibility"],
  },
  {
    title: "Exploitation & Post-Exploitation",
    role: "VAPT",
    icon: Bug,
    color: "orange",
    description:
      "Learn to exploit system-level vulnerabilities, chain attacks from enumeration to root, and understand post-exploitation techniques including privilege escalation and lateral movement.",
    ideology:
      "Exploitation without understanding is noise. Every CVE, every shell, every privilege escalation should be understood mechanically — not just run from a script. Real penetration testers understand WHY an exploit works.",
    objectives: [
      "Understand CVEs and vulnerability research",
      "Use Metasploit Framework effectively and responsibly",
      "Perform Linux and Windows privilege escalation",
      "Understand post-exploitation: persistence, pivoting, loot",
      "Chain vulnerabilities from initial access to domain compromise",
    ],
    outcomes: [
      "Conduct end-to-end penetration test engagements",
      "Document complete attack chains with PoC evidence",
      "Write professional pentest reports with business impact",
    ],
    tools: [
      { name: "Metasploit", slug: "metasploit" },
      { name: "LinPEAS / WinPEAS", slug: "linpeas" },
      { name: "Impacket", slug: "impacket" },
      { name: "Netcat", slug: "netcat" },
    ],
    labs: [
      { name: "Metasploit Room", url: "https://tryhackme.com/room/metasploitintro", level: "Beginner", platform: "THM" },
      { name: "Privilege Escalation Path", url: "https://tryhackme.com/room/linuxprivesc", level: "Intermediate", platform: "THM" },
      { name: "Hack The Box – Active Machines", url: "https://app.hackthebox.com/machines", level: "Advanced", platform: "HTB" },
      { name: "Penetration Tester Job Role Path", url: "https://academy.hackthebox.com/path/preview/penetration-tester", level: "Advanced", platform: "HTB" },
    ],
    softSkills: ["Problem-solving", "Persistence", "Structured thinking"],
  },
  {
    title: "SIEM, Log Analysis & Threat Detection",
    role: "SOC",
    icon: Eye,
    color: "emerald",
    description:
      "The core operational skill for SOC analysts. Master SIEM platforms, log correlation, alert triage, and the craft of separating signal from noise in a high-volume security environment.",
    ideology:
      "SOC is built on visibility. Without logs, you're blind. Without correlation, you're overwhelmed. SIEM transforms raw telemetry into actionable intelligence — and knowing how to work it is what makes a great analyst.",
    objectives: [
      "Understand SIEM architecture and data ingestion pipelines",
      "Write detection rules and correlation queries in Splunk / ELK",
      "Analyze Windows Event Logs, firewall, proxy, and auth logs",
      "Triage alerts: true positive vs false positive determination",
      "Map detections to MITRE ATT&CK techniques",
    ],
    outcomes: [
      "Operate as a SOC Level 1 / Level 2 Analyst",
      "Build detection rules that reduce false positive rates",
      "Produce structured incident investigation timelines",
    ],
    tools: [
      { name: "Splunk", slug: "splunk" },
      { name: "Elastic Stack", slug: "elastic" },
      { name: "Wazuh", slug: "wazuh" },
      { name: "Microsoft Sentinel", slug: "sentinel" },
    ],
    labs: [
      { name: "SOC Level 1 Path", url: "https://tryhackme.com/path/outline/soclevel1", level: "Beginner", platform: "THM" },
      { name: "Splunk Basics Room", url: "https://tryhackme.com/room/splunk101", level: "Beginner", platform: "THM" },
      { name: "Windows Event Logs Room", url: "https://tryhackme.com/room/windowseventlogs", level: "Intermediate", platform: "THM" },
      { name: "SOC Analyst Job Role Path", url: "https://academy.hackthebox.com/path/preview/soc-analyst", level: "Intermediate", platform: "HTB" },
    ],
    softSkills: ["Analytical thinking", "Alert prioritization", "Calmness under pressure"],
  },
  {
    title: "Incident Response & Threat Hunting",
    role: "SOC",
    icon: Lock,
    color: "violet",
    description:
      "Learn the complete Incident Response lifecycle — from detection through containment, eradication, and recovery. Advance into proactive threat hunting to find attackers before alerts fire.",
    ideology:
      "Reactive defense is not enough. Modern SOC must hunt threats proactively — assume breach, look for lateral movement, and investigate before damage escalates. Fast, structured incident response is the difference between a blip and a breach.",
    objectives: [
      "Execute the full IR lifecycle: Detection → Triage → Containment → Recovery",
      "Perform digital forensics: memory, disk, and network artifacts",
      "Conduct proactive threat hunting using hypothesis-driven approaches",
      "Understand malware behavior, phishing, and ransomware patterns",
      "Produce structured incident reports with timeline and impact",
    ],
    outcomes: [
      "Handle real security incidents from alert to closure",
      "Hunt for threats before traditional detection methods fire",
      "Write executive-level incident reports",
    ],
    tools: [
      { name: "Velociraptor", slug: "velociraptor" },
      { name: "TheHive", slug: "thehive" },
      { name: "Volatility", slug: "volatility" },
      { name: "YARA", slug: "yara" },
    ],
    labs: [
      { name: "Incident Handling Process Room", url: "https://tryhackme.com/room/incidenthandlingwithsplunk", level: "Intermediate", platform: "THM" },
      { name: "Threat Intelligence Room", url: "https://tryhackme.com/room/threatintelligencefordummies", level: "Beginner", platform: "THM" },
      { name: "Threat Hunting Module", url: "https://academy.hackthebox.com/module/details/214", level: "Intermediate", platform: "HTB" },
      { name: "Blue Team Labs Online – IR Challenges", url: "https://blueteamlabs.online", level: "Advanced", platform: "Other" },
    ],
    softSkills: ["Calm under pressure", "Structured communication", "Team coordination"],
  },
];

/* =====================================================
   FUTURE SCOPE DATA
===================================================== */

const futureScope = {
  SOC: {
    trends: [
      "AI-assisted threat detection and automated alert triage",
      "SOAR — Security Orchestration, Automation & Response",
      "Cloud SOC operations across AWS, Azure, GCP",
      "Detection engineering and custom rule development",
      "Proactive threat hunting programs",
      "Integration with threat intelligence platforms",
    ],
    careers: [
      { role: "SOC Analyst (L1/L2/L3)", icon: Shield },
      { role: "Incident Responder", icon: Zap },
      { role: "Threat Hunter", icon: Target },
      { role: "Detection Engineer", icon: Code2 },
      { role: "Blue Team Specialist", icon: Users },
      { role: "Security Architect", icon: Globe },
    ],
  },
  VAPT: {
    trends: [
      "Cloud penetration testing (AWS, Azure, GCP)",
      "API security testing at scale",
      "Mobile application security (Android/iOS)",
      "IoT and embedded systems security testing",
      "Adversary simulation and full Red Team operations",
      "DevSecOps integration in CI/CD pipelines",
    ],
    careers: [
      { role: "Penetration Tester", icon: Bug },
      { role: "Red Team Operator", icon: Target },
      { role: "Security Researcher", icon: FlaskConical },
      { role: "Application Security Engineer", icon: Code2 },
      { role: "Security Consultant", icon: Award },
      { role: "Offensive Security Specialist", icon: Zap },
    ],
  },
};

/* =====================================================
   COMPARISON TABLE DATA
===================================================== */

const comparison = [
  { aspect: "Security Type", soc: "Defensive (Blue Team)", vapt: "Offensive (Red Team)" },
  { aspect: "Primary Goal", soc: "Detect & respond to attacks", vapt: "Find & validate vulnerabilities" },
  { aspect: "Approach", soc: "Continuous 24/7 monitoring", vapt: "Periodic planned assessments" },
  { aspect: "Mindset", soc: "How do we defend & respond?", vapt: "How could an attacker exploit this?" },
  { aspect: "Key Output", soc: "Incident reports & alerts", vapt: "Vulnerability reports & PoCs" },
  { aspect: "Work Style", soc: "Real-time operational", vapt: "Structured engagements" },
  { aspect: "Core Tools", soc: "SIEM, EDR, SOAR", vapt: "Burp Suite, Nmap, Metasploit" },
  { aspect: "Career Entry", soc: "SOC Analyst L1", vapt: "VAPT Analyst / Jr Pentester" },
];

/* =====================================================
   DIFF CONFIG
===================================================== */

const difficultyConfig: Record<Difficulty, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-400/30" },
  Intermediate: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-400/30" },
  Advanced: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-400/30" },
};

const platformConfig: Record<string, { bg: string; text: string; label: string }> = {
  THM: { bg: "bg-red-500/10", text: "text-red-400", label: "TryHackMe" },
  HTB: { bg: "bg-green-500/10", text: "text-green-400", label: "Hack The Box" },
  Other: { bg: "bg-purple-500/10", text: "text-purple-400", label: "External" },
};

const colorMap: Record<string, { border: string; glow: string; icon: string; accent: string; tag: string }> = {
  cyan:   { border: "border-cyan-400/25",   glow: "shadow-cyan-500/30",   icon: "from-cyan-500/20 to-blue-500/20 border-cyan-400/30",   accent: "text-cyan-400",   tag: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20 hover:border-cyan-400/60" },
  blue:   { border: "border-blue-400/25",   glow: "shadow-blue-500/30",   icon: "from-blue-500/20 to-cyan-500/20 border-blue-400/30",   accent: "text-blue-400",   tag: "bg-blue-400/10 text-blue-300 border-blue-400/20 hover:border-blue-400/60" },
  purple: { border: "border-purple-400/25", glow: "shadow-purple-500/30", icon: "from-purple-500/20 to-blue-500/20 border-purple-400/30", accent: "text-purple-400", tag: "bg-purple-400/10 text-purple-300 border-purple-400/20 hover:border-purple-400/60" },
  amber:  { border: "border-amber-400/25",  glow: "shadow-amber-500/30",  icon: "from-amber-500/20 to-orange-500/20 border-amber-400/30",  accent: "text-amber-400",  tag: "bg-amber-400/10 text-amber-300 border-amber-400/20 hover:border-amber-400/60" },
  rose:   { border: "border-rose-400/25",   glow: "shadow-rose-500/30",   icon: "from-rose-500/20 to-pink-500/20 border-rose-400/30",   accent: "text-rose-400",   tag: "bg-rose-400/10 text-rose-300 border-rose-400/20 hover:border-rose-400/60" },
  orange: { border: "border-orange-400/25", glow: "shadow-orange-500/30", icon: "from-orange-500/20 to-red-500/20 border-orange-400/30", accent: "text-orange-400", tag: "bg-orange-400/10 text-orange-300 border-orange-400/20 hover:border-orange-400/60" },
  emerald:{ border: "border-emerald-400/25",glow: "shadow-emerald-500/30",icon: "from-emerald-500/20 to-teal-500/20 border-emerald-400/30",accent: "text-emerald-400",tag: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20 hover:border-emerald-400/60" },
  violet: { border: "border-violet-400/25", glow: "shadow-violet-500/30", icon: "from-violet-500/20 to-purple-500/20 border-violet-400/30", accent: "text-violet-400", tag: "bg-violet-400/10 text-violet-300 border-violet-400/20 hover:border-violet-400/60" },
};

/* =====================================================
   SUB-COMPONENTS
===================================================== */

const PathToggle = memo(({ path, setPath }: { path: "SOC" | "VAPT"; setPath: (r: "SOC" | "VAPT") => void }) => (
  <motion.div variants={fadeIn} className="inline-flex gap-2 p-1.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-10">
    {(["SOC", "VAPT"] as const).map((role) => (
      <button
        key={role}
        onClick={() => setPath(role)}
        className={`relative px-7 py-2.5 rounded-xl font-bold transition-all duration-300 ease-out ${
          path === role
            ? role === "SOC"
              ? "text-black shadow-lg shadow-cyan-500/50"
              : "text-black shadow-lg shadow-rose-500/50"
            : "text-gray-400 hover:text-white hover:bg-white/10"
        }`}
      >
        {path === role && (
          <motion.div
            layoutId="activeTab"
            className={`absolute inset-0 rounded-xl ${role === "SOC" ? "bg-gradient-to-br from-cyan-400 to-blue-500" : "bg-gradient-to-br from-rose-400 to-orange-500"}`}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2 text-sm">
          {role === "SOC" ? <Eye className="w-4 h-4" /> : <Target className="w-4 h-4" />}
          {role} Path
          {path === role && <Sparkles className="w-3.5 h-3.5" />}
        </span>
      </button>
    ))}
  </motion.div>
));
PathToggle.displayName = "PathToggle";

const RoadmapCard = memo(({ item, index }: { item: RoadmapStep; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;
  const c = colorMap[item.color];

  return (
    <motion.article
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="relative"
    >
      {/* Pulse Dot */}
      <motion.div
        variants={pulseDot}
        animate="animate"
        className={`absolute -left-[33px] top-5 w-4 h-4 rounded-full shadow-lg ${
          item.color === "cyan" ? "bg-cyan-400 shadow-cyan-400/60" :
          item.color === "blue" ? "bg-blue-400 shadow-blue-400/60" :
          item.color === "purple" ? "bg-purple-400 shadow-purple-400/60" :
          item.color === "amber" ? "bg-amber-400 shadow-amber-400/60" :
          item.color === "rose" ? "bg-rose-400 shadow-rose-400/60" :
          item.color === "orange" ? "bg-orange-400 shadow-orange-400/60" :
          item.color === "emerald" ? "bg-emerald-400 shadow-emerald-400/60" :
          "bg-violet-400 shadow-violet-400/60"
        }`}
      />

      {/* Step number */}
      <div className="absolute -left-[52px] top-2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
        {String(index + 1).padStart(2, "0")}
      </div>

      <motion.div
        whileHover="hover"
        variants={cardHover}
        className={`relative overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border ${c.border} rounded-2xl group hover:shadow-xl hover:${c.glow} transition-shadow duration-300`}
      >
        {/* Hover glow overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />

        <div className="relative z-10 p-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-start gap-4">
              <motion.div
                variants={iconFloat}
                animate="animate"
                className={`flex-shrink-0 w-13 h-13 p-3 rounded-xl bg-gradient-to-br ${c.icon} border`}
              >
                <Icon className={`w-6 h-6 ${c.accent}`} />
              </motion.div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-xl font-bold text-white group-hover:${c.accent} transition-colors`}>
                    {item.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    item.role === "BOTH" ? "bg-purple-400/10 text-purple-400 border border-purple-400/30" :
                    item.role === "SOC" ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30" :
                    "bg-rose-400/10 text-rose-400 border border-rose-400/30"
                  }`}>
                    {item.role === "BOTH" ? "SOC + VAPT" : item.role}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">{item.description}</p>
              </div>
            </div>
          </div>

          {/* Ideology Banner */}
          <div className={`mb-5 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border-l-2 ${
            item.color === "cyan" ? "border-cyan-400" :
            item.color === "blue" ? "border-blue-400" :
            item.color === "purple" ? "border-purple-400" :
            item.color === "amber" ? "border-amber-400" :
            item.color === "rose" ? "border-rose-400" :
            item.color === "orange" ? "border-orange-400" :
            item.color === "emerald" ? "border-emerald-400" :
            "border-violet-400"
          }`}>
            <p className="text-xs text-gray-300 italic leading-relaxed">
              <span className={`font-semibold not-italic ${c.accent}`}>Mindset: </span>
              {item.ideology}
            </p>
          </div>

          {/* Objectives */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-5 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"
          >
            <h4 className={`flex items-center gap-2 font-semibold mb-3 text-sm ${c.accent}`}>
              <BookOpen className="w-4 h-4" /> Learning Objectives
            </h4>
            <ul className="space-y-2">
              {item.objectives.map((obj) => (
                <motion.li key={obj} variants={fadeIn} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {obj}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Outcomes */}
          <div className="mb-5 p-4 rounded-xl bg-amber-500/5 border border-amber-400/10">
            <h4 className="flex items-center gap-2 font-semibold mb-2.5 text-sm text-amber-400">
              <Award className="w-4 h-4" /> What You'll Achieve
            </h4>
            <ul className="space-y-1.5">
              {item.outcomes.map((out) => (
                <li key={out} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-amber-400 font-bold mt-0.5">▸</span> {out}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="mb-5">
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2.5">Essential Tools</h5>
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  to={`/tools/${tool.slug}`}
                  className={`text-xs px-3.5 py-1.5 rounded-full border font-medium transition-all duration-300 ${c.tag}`}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Labs */}
          <div>
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2.5">Practice Labs</h5>
            <ul className="space-y-2">
              {item.labs.map((lab) => {
                const dc = difficultyConfig[lab.level];
                const pc = platformConfig[lab.platform];
                return (
                  <li
                    key={lab.name}
                    className="flex justify-between items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-200 group/lab"
                  >
                    <a
                      href={lab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors flex-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/lab:opacity-100 transition-opacity flex-shrink-0" />
                      {lab.name}
                    </a>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium border ${pc.bg} ${pc.text}`}>
                        {lab.platform}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold border ${dc.bg} ${dc.text} ${dc.border}`}>
                        {lab.level}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Soft Skills (collapsible) */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {expanded ? "Hide" : "Show"} soft skills for this phase
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.softSkills.map((s) => (
                    <span key={s} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.article>
  );
});
RoadmapCard.displayName = "RoadmapCard";

const ComparisonTable = () => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mb-16 overflow-x-auto"
  >
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
      <TrendingUp className="w-6 h-6 text-cyan-400" />
      SOC vs VAPT — Side by Side
    </h2>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-white/10">
          <th className="text-left py-3 px-4 text-gray-400 font-semibold w-1/4">Aspect</th>
          <th className="text-left py-3 px-4 font-semibold text-cyan-400 w-[37.5%]">
            <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> SOC</span>
          </th>
          <th className="text-left py-3 px-4 font-semibold text-rose-400 w-[37.5%]">
            <span className="flex items-center gap-2"><Target className="w-4 h-4" /> VAPT</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {comparison.map((row, i) => (
          <motion.tr
            key={row.aspect}
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
          >
            <td className="py-3 px-4 text-gray-500 font-medium">{row.aspect}</td>
            <td className="py-3 px-4 text-gray-300">{row.soc}</td>
            <td className="py-3 px-4 text-gray-300">{row.vapt}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

const FutureScopeSection = ({ path }: { path: "SOC" | "VAPT" }) => {
  const data = futureScope[path];
  const isSOC = path === "SOC";

  return (
    <motion.div
      key={path}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <TrendingUp className={`w-6 h-6 ${isSOC ? "text-cyan-400" : "text-rose-400"}`} />
        Future Scope — {path}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Trends */}
        <div className={`p-6 rounded-2xl border ${isSOC ? "bg-cyan-500/5 border-cyan-400/15" : "bg-rose-500/5 border-rose-400/15"}`}>
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${isSOC ? "text-cyan-400" : "text-rose-400"}`}>
            <Zap className="w-5 h-5" /> Emerging Trends
          </h3>
          <ul className="space-y-2.5">
            {data.trends.map((trend) => (
              <li key={trend} className="flex items-start gap-2.5 text-sm text-gray-300">
                <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full ${isSOC ? "bg-cyan-400" : "bg-rose-400"}`} />
                {trend}
              </li>
            ))}
          </ul>
        </div>
        {/* Careers */}
        <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-amber-400">
            <Award className="w-5 h-5" /> Career Roles
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {data.careers.map(({ role, icon: RoleIcon }) => (
              <div key={role} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-amber-400/20 transition-colors">
                <RoleIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-xs text-gray-300 leading-tight">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function Start() {
  const [path, setPath] = useState<"SOC" | "VAPT">("SOC");
  const timelineRef = useRef<HTMLDivElement>(null);

  const filteredRoadmap = roadmap.filter(
    (step) => step.role === "BOTH" || step.role === path
  );

  const labCount = filteredRoadmap.reduce((sum, s) => sum + s.labs.length, 0);
  const thmCount = filteredRoadmap.reduce((sum, s) => sum + s.labs.filter(l => l.platform === "THM").length, 0);
  const htbCount = filteredRoadmap.reduce((sum, s) => sum + s.labs.filter(l => l.platform === "HTB").length, 0);

  return (
    <section className="relative px-6 sm:px-10 py-20 max-w-6xl mx-auto">
      {/* BG Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] animate-pulse" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[160px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/[0.07] blur-[180px]" />
      </div>

      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-all duration-300 mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-400 font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Industry-Aligned Roadmap
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent leading-tight">
          SOC & VAPT Learning Roadmap
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
          A structured, practical roadmap to take you from beginner to job-ready{" "}
          <span className="text-cyan-400 font-semibold">SOC Analyst</span> or{" "}
          <span className="text-rose-400 font-semibold">VAPT Professional</span>
          . Each phase includes ideology, objectives, tools, and hands-on labs.
        </p>
      </motion.div>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
      >
        <PathToggle path={path} setPath={setPath} />
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className={`font-semibold ${path === "SOC" ? "text-cyan-400" : "text-rose-400"}`}>
            {path} path
          </span>{" "}
          + shared fundamentals
        </p>
      </motion.div>

      {/* Stats Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-wrap gap-5 mb-14 p-5 rounded-2xl border ${
            path === "SOC"
              ? "bg-gradient-to-br from-cyan-500/8 to-blue-500/8 border-cyan-400/15"
              : "bg-gradient-to-br from-rose-500/8 to-orange-500/8 border-rose-400/15"
          }`}
        >
          {[
            { icon: BookOpen, color: path === "SOC" ? "text-cyan-400" : "text-rose-400", bg: path === "SOC" ? "bg-cyan-400/15" : "bg-rose-400/15", value: filteredRoadmap.length, label: "Learning Phases" },
            { icon: FlaskConical, color: "text-amber-400", bg: "bg-amber-400/15", value: labCount, label: "Practice Labs" },
            { icon: Shield, color: "text-red-400", bg: "bg-red-400/15", value: thmCount, label: "TryHackMe Rooms" },
            { icon: Target, color: "text-green-400", bg: "bg-green-400/15", value: htbCount, label: "HTB Modules" },
          ].map(({ icon: Icon, color, bg, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Timeline */}
      <div ref={timelineRef} className="relative border-l-2 border-white/10 pl-10 sm:pl-14 space-y-14 mb-20">
        {filteredRoadmap.map((item, index) => (
          <RoadmapCard key={item.title} item={item} index={index} />
        ))}
      </div>

      {/* Future Scope */}
      <FutureScopeSection path={path} />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-2xl text-center bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-cyan-400/15"
      >
        <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-white mb-2">Ready to Begin?</h3>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
          Start with Linux fundamentals and work your way up. Consistency and hands-on practice on TryHackMe and Hack The Box are the keys to building real cybersecurity skills.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 text-sm"
          >
            Explore All Resources
          </Link>
          <a
            href="https://tryhackme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/20 transition-all duration-300 text-sm"
          >
            <ExternalLink className="w-4 h-4" /> TryHackMe
          </a>
          <a
            href="https://hackthebox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-semibold hover:bg-green-500/20 transition-all duration-300 text-sm"
          >
            <ExternalLink className="w-4 h-4" /> Hack The Box
          </a>
        </div>
      </motion.div>
    </section>
  );
}