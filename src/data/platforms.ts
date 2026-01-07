export interface Platform {
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  description: string;
  link: string;
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
      "Guided hands-on labs for Linux, networking, web hacking, and cybersecurity fundamentals.",
    link: "https://tryhackme.com",
  },
  {
    name: "Hack The Box",
    category: "Cybersecurity Labs",
    difficulty: "Advanced",
    description:
      "Real-world penetration testing labs used by security professionals.",
    link: "https://www.hackthebox.com",
  },
  {
    name: "PortSwigger Web Security Academy",
    category: "Web Security",
    difficulty: "All Levels",
    description:
      "Free interactive labs focused on web vulnerabilities like SQLi and XSS.",
    link: "https://portswigger.net/web-security",
  },
  {
    name: "OverTheWire",
    category: "Linux & Cryptography",
    difficulty: "Beginner",
    description:
      "Linux and cryptography war-games designed to build command-line skills.",
    link: "https://overthewire.org",
  },
  {
    name: "PicoCTF",
    category: "CTF Platform",
    difficulty: "Beginner",
    description:
      "Capture The Flag platform focused on cryptography, forensics, and reverse engineering.",
    link: "https://picoctf.org",
  },

  // ===============================
  // PRACTICE & CTF PLATFORMS
  // ===============================
  {
    name: "CTFtime",
    category: "CTF Competitions",
    difficulty: "All Levels",
    description:
      "Global listing of Capture The Flag competitions and team rankings.",
    link: "https://ctftime.org",
  },
  {
    name: "Root-Me",
    category: "Security Challenges",
    difficulty: "Intermediate",
    description:
      "Security challenges covering web, cryptography, reverse engineering, and networking.",
    link: "https://www.root-me.org",
  },
  {
    name: "VulnHub",
    category: "Vulnerable Machines",
    difficulty: "Intermediate",
    description:
      "Downloadable vulnerable virtual machines for offline penetration testing practice.",
    link: "https://www.vulnhub.com",
  },

  // ===============================
  // LINUX PRACTICE
  // ===============================
  {
    name: "Linux Journey",
    category: "Linux Learning",
    difficulty: "Beginner",
    description:
      "Structured learning platform for Linux fundamentals and system administration.",
    link: "https://linuxjourney.com",
  },
  {
    name: "Bandit (OverTheWire)",
    category: "Linux Practice",
    difficulty: "Beginner",
    description:
      "Hands-on Linux challenges focused on command-line usage and privilege escalation.",
    link: "https://overthewire.org/wargames/bandit",
  },

  // ===============================
  // CRYPTOGRAPHY PRACTICE
  // ===============================
  {
    name: "CryptoHack",
    category: "Cryptography",
    difficulty: "Intermediate",
    description:
      "Interactive cryptography challenges covering AES, RSA, hashing, and math-based crypto.",
    link: "https://cryptohack.org",
  },
  {
    name: "Cryptopals",
    category: "Cryptography",
    difficulty: "Advanced",
    description:
      "Famous cryptography challenges used to master practical crypto attacks and implementations.",
    link: "https://cryptopals.com",
  },

  // ===============================
  // BLOCKCHAIN & WEB3 LABS
  // ===============================
  {
    name: "Ethernaut",
    category: "Blockchain Security",
    difficulty: "Intermediate",
    description:
      "Smart contract hacking challenges focused on Ethereum vulnerabilities.",
    link: "https://ethernaut.openzeppelin.com",
  },
  {
    name: "Damn Vulnerable DeFi",
    category: "DeFi Security",
    difficulty: "Advanced",
    description:
      "Hands-on labs for exploiting vulnerabilities in decentralized finance protocols.",
    link: "https://www.damnvulnerabledefi.xyz",
  },
  {
    name: "Web3 Security Academy",
    category: "Blockchain Security",
    difficulty: "Advanced",
    description:
      "Smart contract auditing and blockchain security learning platform.",
    link: "https://www.web3securityacademy.com",
  },

  // ===============================
  // PROFESSIONAL TRAINING
  // ===============================
  {
    name: "INE (eLearnSecurity)",
    category: "Professional Labs",
    difficulty: "Advanced",
    description:
      "Professional cybersecurity training with red team and blue team labs.",
    link: "https://ine.com",
  },
  {
    name: "Cybrary",
    category: "Cybersecurity Learning",
    difficulty: "Beginner",
    description:
      "Cybersecurity courses with hands-on labs for beginners and professionals.",
    link: "https://www.cybrary.it",
  },
  {
    name: "RangeForce",
    category: "Blue Team Labs",
    difficulty: "Intermediate",
    description:
      "SOC, incident response, and defensive security training labs.",
    link: "https://www.rangeforce.com",
  },
];
