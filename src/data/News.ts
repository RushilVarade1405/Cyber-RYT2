// src/data/News.ts
// ─────────────────────────────────────────────────────────────────────────────
// Static cybersecurity news data.
// Articles are rotated daily by Cyber_News.tsx using a deterministic
// day-of-year seed — no backend required.
//
// TO ADD NEW ARTICLES: paste a new object into the array below.
// The page will automatically surface different articles each day.
// ─────────────────────────────────────────────────────────────────────────────

export type NewsCategory =
  | "Breach"
  | "Vulnerability"
  | "Malware"
  | "Advisory"
  | "Research";

export type NewsSeverity = "Critical" | "High" | "Medium" | "Low";

export interface CyberNewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string; // ISO date string
  category: NewsCategory;
  tags: string[];
  severity: NewsSeverity;
}

export const newsArticles: CyberNewsArticle[] = [
  // ── VULNERABILITIES ───────────────────────────────────────────────────────
  {
    id: "v-001",
    title: "Critical Zero-Day in Apache HTTP Server Allows Remote Code Execution",
    summary:
      "Security researchers uncovered a critical RCE vulnerability in Apache HTTP Server affecting versions 2.4.x. Unauthenticated attackers can execute arbitrary code on vulnerable systems. Patch immediately.",
    url: "https://thehackernews.com",
    source: "The Hacker News",
    publishedAt: "2025-01-15T08:30:00Z",
    category: "Vulnerability",
    tags: ["Apache", "RCE", "Zero-Day", "CVE-2025"],
    severity: "Critical",
  },
  {
    id: "v-002",
    title: "Patch Tuesday: Microsoft Fixes 94 CVEs Including 4 Actively Exploited Zero-Days",
    summary:
      "Microsoft's monthly security update addresses 94 CVEs this cycle. Four zero-days in Windows Print Spooler, CLFS Driver, and Hyper-V are actively exploited in the wild and should be prioritized.",
    url: "https://www.bleepingcomputer.com",
    source: "BleepingComputer",
    publishedAt: "2025-01-14T17:00:00Z",
    category: "Vulnerability",
    tags: ["Microsoft", "Patch Tuesday", "Windows", "Zero-Day", "Hyper-V"],
    severity: "Critical",
  },
  {
    id: "v-003",
    title: "Google Chrome V8 Type Confusion Bug Enables Remote Code Execution via Web Pages",
    summary:
      "Project Zero disclosed a type confusion flaw in Chrome's V8 JavaScript engine. Visiting a specially crafted page can trigger RCE. Chrome 121 stable contains the fix; update immediately.",
    url: "https://feeds.feedburner.com/TheHackersNews",
    source: "The Hacker News",
    publishedAt: "2025-01-10T12:00:00Z",
    category: "Vulnerability",
    tags: ["Chrome", "V8", "Google", "Browser Security", "RCE"],
    severity: "High",
  },
  {
    id: "v-004",
    title: "FortiGate SSL-VPN Authentication Bypass — Mass Exploitation Observed in the Wild",
    summary:
      "Fortinet confirmed active exploitation of CVE-2024-21762, an authentication bypass in FortiOS SSL-VPN. Thousands of enterprise appliances remain unpatched. CISA added this to KEV catalog.",
    url: "https://www.bleepingcomputer.com",
    source: "BleepingComputer",
    publishedAt: "2025-01-08T09:15:00Z",
    category: "Vulnerability",
    tags: ["FortiGate", "Fortinet", "VPN", "Authentication Bypass", "CVE"],
    severity: "Critical",
  },
  {
    id: "v-005",
    title: "Ivanti Connect Secure Zero-Days Chained to Compromise Government Networks Globally",
    summary:
      "Two zero-day vulnerabilities in Ivanti Connect Secure and Policy Secure were chained by nation-state actors to compromise government and defence networks. Ivanti released patches after weeks of active exploitation.",
    url: "https://www.darkreading.com",
    source: "Dark Reading",
    publishedAt: "2025-01-05T14:00:00Z",
    category: "Vulnerability",
    tags: ["Ivanti", "VPN", "Nation-State", "Zero-Day", "Government"],
    severity: "Critical",
  },
  {
    id: "v-006",
    title: "OpenSSH regreSSHion: 18-Year-Old Race Condition Bug Returns in glibc Systems",
    summary:
      "CVE-2024-6387, nicknamed regreSSHion, reintroduces a critical race condition in OpenSSH's signal handler. Unauthenticated remote root code execution is possible on glibc-based Linux systems. Patch to 9.8p1.",
    url: "https://www.bleepingcomputer.com",
    source: "BleepingComputer",
    publishedAt: "2024-12-28T10:00:00Z",
    category: "Vulnerability",
    tags: ["OpenSSH", "Linux", "RCE", "Race Condition", "glibc"],
    severity: "Critical",
  },
  {
    id: "v-007",
    title: "PAN-OS GlobalProtect Gateway Zero-Day Exploited Before Patch Release",
    summary:
      "Palo Alto Networks disclosed CVE-2024-3400, a command injection flaw in PAN-OS GlobalProtect. Threat actors exploited it to deploy Upstyle backdoor before the patch was available. CVSS 10.0.",
    url: "https://threatpost.com",
    source: "Threatpost",
    publishedAt: "2024-12-20T08:00:00Z",
    category: "Vulnerability",
    tags: ["Palo Alto", "PAN-OS", "Command Injection", "CVSS 10", "Backdoor"],
    severity: "Critical",
  },

  // ── MALWARE ───────────────────────────────────────────────────────────────
  {
    id: "m-001",
    title: "LockBit 4.0 Ransomware Emerges Targeting Healthcare and Critical Infrastructure",
    summary:
      "LockBit's latest variant features faster encryption, improved anti-analysis techniques, and expanded affiliate recruitment. Healthcare organizations across North America and Europe are primary targets in Q1 2025.",
    url: "https://www.bleepingcomputer.com",
    source: "BleepingComputer",
    publishedAt: "2025-01-18T11:00:00Z",
    category: "Malware",
    tags: ["LockBit", "Ransomware", "Healthcare", "RaaS", "Encryption"],
    severity: "Critical",
  },
  {
    id: "m-002",
    title: "Cl0p Exploits MOVEit Successor — GoAnywhere MFT Compromised at 130+ Enterprises",
    summary:
      "The Cl0p ransomware group exploited a critical SQL injection in GoAnywhere MFT, stealing data from over 130 organizations globally before patches were applied. Extortion demands range from $1M to $15M.",
    url: "https://krebsonsecurity.com",
    source: "Krebs on Security",
    publishedAt: "2025-01-12T16:00:00Z",
    category: "Malware",
    tags: ["Cl0p", "GoAnywhere", "SQL Injection", "Data Theft", "Extortion"],
    severity: "Critical",
  },
  {
    id: "m-003",
    title: "FakeUpdates (SocGholish) Campaign Delivers DarkGate Loader via Compromised WordPress Sites",
    summary:
      "A large-scale drive-by download campaign uses fake browser update prompts on compromised WordPress sites to deliver DarkGate malware. Over 2,000 sites were identified in the distribution network.",
    url: "https://www.darkreading.com",
    source: "Dark Reading",
    publishedAt: "2025-01-09T13:30:00Z",
    category: "Malware",
    tags: ["SocGholish", "DarkGate", "WordPress", "Drive-by", "Loader"],
    severity: "High",
  },
  {
    id: "m-004",
    title: "Androxgh0st Botnet Now Integrates Mozi IoT Capabilities After Takedown Absorption",
    summary:
      "The Androxgh0st botnet absorbed infrastructure from the dismantled Mozi IoT botnet, combining web application exploits with IoT device compromise to build a 40,000-strong hybrid botnet.",
    url: "https://feeds.feedburner.com/TheHackersNews",
    source: "The Hacker News",
    publishedAt: "2025-01-06T10:00:00Z",
    category: "Malware",
    tags: ["Androxgh0st", "Mozi", "Botnet", "IoT", "Web Exploitation"],
    severity: "High",
  },
  {
    id: "m-005",
    title: "BlackCat/ALPHV Ransomware Shuts Down After $22M UnitedHealth Ransom Payment",
    summary:
      "The ALPHV/BlackCat ransomware group performed an exit scam after reportedly receiving a $22M ransom from UnitedHealth Group. The affiliate behind the Change Healthcare attack threatened further leaks.",
    url: "https://krebsonsecurity.com",
    source: "Krebs on Security",
    publishedAt: "2024-12-22T09:00:00Z",
    category: "Malware",
    tags: ["BlackCat", "ALPHV", "UnitedHealth", "Healthcare", "Exit Scam"],
    severity: "Critical",
  },
  {
    id: "m-006",
    title: "Perfctl Malware Silently Mines Monero on Linux Servers for Years Undetected",
    summary:
      "A stealthy cryptomining malware called perfctl infected thousands of Linux servers by exploiting misconfigurations and known vulnerabilities. It hid in process names and paused when admins logged in.",
    url: "https://www.bleepingcomputer.com",
    source: "BleepingComputer",
    publishedAt: "2024-12-18T14:30:00Z",
    category: "Malware",
    tags: ["Cryptomining", "Linux", "Monero", "Stealth", "Server"],
    severity: "Medium",
  },

  // ── BREACHES ──────────────────────────────────────────────────────────────
  {
    id: "b-001",
    title: "National Public Data Breach Exposes 2.9 Billion Records Including SSNs",
    summary:
      "A massive data broker breach at National Public Data exposed nearly 3 billion records including Social Security Numbers, addresses, and phone numbers. The data was sold on dark web forums for $3.5M.",
    url: "https://krebsonsecurity.com",
    source: "Krebs on Security",
    publishedAt: "2025-01-16T08:00:00Z",
    category: "Breach",
    tags: ["Data Broker", "SSN", "PII", "Dark Web", "Identity Theft"],
    severity: "Critical",
  },
  {
    id: "b-002",
    title: "Snowflake Customer Data Theft: AT&T, Ticketmaster, and 160+ Companies Compromised",
    summary:
      "Credential-based attacks on Snowflake cloud environments exposed data from 160+ companies. AT&T's call records for 100M+ customers and Ticketmaster's 560M records were among the most significant thefts.",
    url: "https://www.darkreading.com",
    source: "Dark Reading",
    publishedAt: "2025-01-11T12:00:00Z",
    category: "Breach",
    tags: ["Snowflake", "Cloud", "AT&T", "Ticketmaster", "Credential Theft"],
    severity: "Critical",
  },
  {
    id: "b-003",
    title: "Salt Typhoon Chinese APT Breaches US Telecoms — Wiretap Systems Compromised",
    summary:
      "The Salt Typhoon APT group, linked to China's Ministry of State Security, breached major US telecom providers including AT&T, Verizon, and Lumen, accessing lawful intercept systems used for government surveillance.",
    url: "https://www.darkreading.com",
    source: "Dark Reading",
    publishedAt: "2025-01-08T10:00:00Z",
    category: "Breach",
    tags: ["Salt Typhoon", "China", "APT", "Telecom", "Wiretap", "MSS"],
    severity: "Critical",
  },
  {
    id: "b-004",
    title: "Internet Archive (Wayback Machine) Breached — 31 Million User Records Stolen",
    summary:
      "The Internet Archive suffered a data breach exposing 31 million user accounts including email addresses and bcrypt-hashed passwords. A simultaneous DDoS attack disrupted archive.org for days.",
    url: "https://www.bleepingcomputer.com",
    source: "BleepingComputer",
    publishedAt: "2024-12-30T15:00:00Z",
    category: "Breach",
    tags: ["Internet Archive", "DDoS", "User Data", "Passwords", "bcrypt"],
    severity: "High",
  },
  {
    id: "b-005",
    title: "XZ Utils SSH Backdoor: Multi-Year Supply Chain Attack Caught at Last Moment",
    summary:
      "A carefully engineered multi-year supply chain attack introduced a backdoor into XZ Utils 5.6.0/5.6.1 targeting OpenSSH on systemd Linux systems. A Microsoft engineer discovered it just before widespread Linux distribution.",
    url: "https://www.schneier.com",
    source: "Schneier on Security",
    publishedAt: "2024-12-25T09:00:00Z",
    category: "Breach",
    tags: ["XZ Utils", "Supply Chain", "SSH", "Backdoor", "Linux", "Open Source"],
    severity: "Critical",
  },
  {
    id: "b-006",
    title: "Hot Topic Retail Chain Breach Exposes 57 Million Customer Records via Credential Stuffing",
    summary:
      "Hot Topic suffered a massive data breach exposing 57 million customer records including partial payment card data, email addresses, and physical addresses. The attack used credentials harvested from prior breaches.",
    url: "https://krebsonsecurity.com",
    source: "Krebs on Security",
    publishedAt: "2024-12-20T11:00:00Z",
    category: "Breach",
    tags: ["Retail", "Credential Stuffing", "Payment Cards", "PII", "Hot Topic"],
    severity: "High",
  },

  // ── ADVISORIES ────────────────────────────────────────────────────────────
  {
    id: "a-001",
    title: "CISA Emergency Directive: Federal Agencies Must Patch Ivanti Flaws Within 48 Hours",
    summary:
      "CISA issued Emergency Directive 24-02 requiring all federal civilian agencies to disconnect vulnerable Ivanti Connect Secure and Policy Secure appliances and apply vendor patches within 48 hours.",
    url: "https://www.cisa.gov",
    source: "CISA Alerts",
    publishedAt: "2025-01-17T14:00:00Z",
    category: "Advisory",
    tags: ["CISA", "Ivanti", "Federal", "Emergency Directive", "VPN"],
    severity: "Critical",
  },
  {
    id: "a-002",
    title: "NSA and CISA Release Joint Advisory on Top Routinely Exploited Vulnerabilities of 2024",
    summary:
      "NSA, CISA, and Five Eyes partners published a joint advisory identifying the top 15 most routinely exploited vulnerabilities of 2024. Log4Shell, ProxyLogon, and Citrix Bleed top the list again.",
    url: "https://www.cisa.gov",
    source: "CISA Alerts",
    publishedAt: "2025-01-14T10:00:00Z",
    category: "Advisory",
    tags: ["NSA", "CISA", "Five Eyes", "Log4Shell", "CVE", "Top Vulnerabilities"],
    severity: "High",
  },
  {
    id: "a-003",
    title: "CISA Warns of Nation-State DNS Poisoning Targeting Critical Infrastructure Operators",
    summary:
      "A well-resourced APT group linked to a foreign government conducted large-scale DNS cache poisoning attacks against power grid operators and water treatment facilities across North America.",
    url: "https://www.cisa.gov",
    source: "CISA Alerts",
    publishedAt: "2025-01-07T09:00:00Z",
    category: "Advisory",
    tags: ["APT", "DNS", "Critical Infrastructure", "Power Grid", "Water"],
    severity: "Critical",
  },
  {
    id: "a-004",
    title: "NIST Cybersecurity Framework 2.0 Released — Governance Now a Core Function",
    summary:
      "NIST published CSF 2.0, the first major revision of the Cybersecurity Framework since 2018. The update adds Governance as a sixth core function and expands guidance for supply chain risk management.",
    url: "https://nvd.nist.gov",
    source: "NIST / NVD",
    publishedAt: "2024-12-28T12:00:00Z",
    category: "Advisory",
    tags: ["NIST", "CSF 2.0", "Governance", "Supply Chain", "Framework"],
    severity: "Medium",
  },
  {
    id: "a-005",
    title: "FBI and CISA Warn of Ghost/Cring Ransomware Targeting Unpatched Public-Facing Apps",
    summary:
      "A joint advisory from FBI and CISA warns that Ghost ransomware actors are actively exploiting known CVEs in Fortinet, Adobe ColdFusion, and Microsoft Exchange to gain initial access to victim networks.",
    url: "https://www.cisa.gov",
    source: "CISA Alerts",
    publishedAt: "2024-12-15T11:30:00Z",
    category: "Advisory",
    tags: ["Ghost", "Ransomware", "FBI", "CISA", "Fortinet", "Exchange"],
    severity: "High",
  },

  // ── RESEARCH ──────────────────────────────────────────────────────────────
  {
    id: "r-001",
    title: "NIST Finalizes Post-Quantum Cryptography Standards: ML-KEM, ML-DSA, SLH-DSA",
    summary:
      "NIST published FIPS 203, 204, and 205 — the world's first post-quantum cryptographic algorithm standards. Organizations are advised to begin migration planning away from RSA and ECC immediately.",
    url: "https://nvd.nist.gov",
    source: "NIST / NVD",
    publishedAt: "2025-01-13T10:00:00Z",
    category: "Research",
    tags: ["Post-Quantum", "PQC", "NIST", "ML-KEM", "Cryptography", "FIPS"],
    severity: "Medium",
  },
  {
    id: "r-002",
    title: "AI-Powered Phishing Achieves 60% Click Rate — Outperforming Human-Written Lures",
    summary:
      "IBM X-Force research shows AI-generated spear-phishing emails achieve 60% click-through rates, versus 20% for human-crafted messages. LLMs are lowering the barrier for sophisticated social engineering at scale.",
    url: "https://www.darkreading.com",
    source: "Dark Reading",
    publishedAt: "2025-01-10T14:00:00Z",
    category: "Research",
    tags: ["AI", "Phishing", "LLM", "Social Engineering", "IBM X-Force"],
    severity: "High",
  },
  {
    id: "r-003",
    title: "Linux Kernel Rust Rewrite Initiative: Memory Safety for Core Subsystems",
    summary:
      "The Linux Foundation announced an initiative to rewrite critical kernel subsystems in Rust, targeting memory safety vulnerabilities that account for 70% of kernel CVEs. First modules ship in kernel 6.10.",
    url: "https://www.schneier.com",
    source: "Schneier on Security",
    publishedAt: "2025-01-03T11:00:00Z",
    category: "Research",
    tags: ["Linux", "Rust", "Memory Safety", "Kernel", "CVE Prevention"],
    severity: "Low",
  },
  {
    id: "r-004",
    title: "PixieFail: Nine Vulnerabilities Found in UEFI IPv6 Network Stack Affect Billions of Devices",
    summary:
      "Quarkslab researchers disclosed nine vulnerabilities in the open-source TianoCore EDK II UEFI firmware's IPv6 network stack. Successful exploitation can occur before the OS loads, enabling persistent compromise.",
    url: "https://feeds.feedburner.com/TheHackersNews",
    source: "The Hacker News",
    publishedAt: "2024-12-22T13:00:00Z",
    category: "Research",
    tags: ["UEFI", "IPv6", "PixieFail", "Firmware", "Pre-OS", "Supply Chain"],
    severity: "High",
  },
  {
    id: "r-005",
    title: "PassiveOS: Fingerprinting Operating Systems Passively via TCP/IP Stack Quirks",
    summary:
      "Researchers demonstrated a technique to passively fingerprint operating systems and versions with 94% accuracy using only TCP/IP stack behavioral differences — no active probing required.",
    url: "https://www.schneier.com",
    source: "Schneier on Security",
    publishedAt: "2024-12-10T10:30:00Z",
    category: "Research",
    tags: ["Fingerprinting", "TCP/IP", "Passive Recon", "OS Detection", "Privacy"],
    severity: "Medium",
  },
  {
    id: "r-006",
    title: "Quantum Computers Can Now Factor 2,048-bit RSA Keys — Timeline Accelerates",
    summary:
      "Chinese researchers published a paper claiming a 372-qubit quantum computer can theoretically factor 2048-bit RSA keys. While disputed, cryptographers warn organizations to accelerate PQC migration timelines.",
    url: "https://www.schneier.com",
    source: "Schneier on Security",
    publishedAt: "2024-12-05T08:00:00Z",
    category: "Research",
    tags: ["Quantum Computing", "RSA", "PQC", "Cryptography", "Timeline"],
    severity: "High",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: get the "day of year" index (0–364) for a given date
// Used by Cyber_News.tsx to rotate which articles are "today's news"
// ─────────────────────────────────────────────────────────────────────────────
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}