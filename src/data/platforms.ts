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

export const difficultyColors = {
  "Beginner": {
    bg: "bg-green-500/10",
    text: "text-green-300",
    border: "border-green-400/30"
  },
  "Intermediate": {
    bg: "bg-yellow-500/10",
    text: "text-yellow-300",
    border: "border-yellow-400/30"
  },
  "Advanced": {
    bg: "bg-red-500/10",
    text: "text-red-300",
    border: "border-red-400/30"
  },
  "All Levels": {
    bg: "bg-purple-500/10",
    text: "text-purple-300",
    border: "border-purple-400/30"
  }
};

export const pricingColors = {
  "Free": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    border: "border-emerald-400/30"
  },
  "Freemium": {
    bg: "bg-blue-500/10",
    text: "text-blue-300",
    border: "border-blue-400/30"
  },
  "Paid": {
    bg: "bg-orange-500/10",
    text: "text-orange-300",
    border: "border-orange-400/30"
  }
};