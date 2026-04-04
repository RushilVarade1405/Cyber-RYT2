// src/data/Platform.ts
// This is the expected structure for your Platform data file.
// The merged Tools.tsx imports: import { platforms } from "../data/Platform";
// Make sure your existing data file exports a named `platforms` array like below.

export interface Platform {
  name: string;
  category: string;
  difficulty: string;
  description: string;
  link: string;
  features: string[];
  pricing: "Free" | "Freemium" | "Paid";
  skillsGained: string[];
}

export const platforms: Platform[] = [
  {
    name: "TryHackMe",
    category: "Cybersecurity & Pentesting",
    difficulty: "Beginner → Advanced",
    description:
      "Interactive learning platform with guided paths, hands-on labs, and real-world scenarios covering cybersecurity, Linux, networking, and ethical hacking fundamentals.",
    link: "https://tryhackme.com",
    features: ["Guided Learning Paths", "Virtual Machines", "Certificates"],
    pricing: "Freemium",
    skillsGained: ["Web Security", "Network Security", "Linux", "OSINT"],
  },
  {
    name: "Hack The Box",
    category: "Advanced Pentesting",
    difficulty: "Intermediate → Expert",
    description:
      "Professional-grade platform with realistic penetration testing labs, Active Directory environments, and certification tracks used by security professionals worldwide.",
    link: "https://www.hackthebox.com",
    features: ["Realistic Labs", "AD Environments", "Pro Labs", "CPTS Cert"],
    pricing: "Freemium",
    skillsGained: [
      "Pentesting",
      "Active Directory",
      "Privilege Escalation",
      "Post-Exploitation",
    ],
  },
  {
    name: "OWASP Juice Shop",
    category: "Web Application Security",
    difficulty: "Beginner → Advanced",
    description:
      "Intentionally vulnerable web application demonstrating common web vulnerabilities based on OWASP Top 10, perfect for learning web security hands-on.",
    link: "https://owasp.org/www-project-juice-shop/",
    features: ["OWASP Top 10", "Local Deployment", "Hint System", "CTF Mode"],
    pricing: "Free",
    skillsGained: [
      "SQL Injection",
      "XSS",
      "CSRF",
      "Authentication Bypass",
      "API Security",
    ],
  },
  {
    name: "OverTheWire",
    category: "Linux & Security Wargames",
    difficulty: "Beginner → Intermediate",
    description:
      "Classic wargames platform teaching security concepts through progressive Linux command-line challenges, cryptography puzzles, and system administration tasks.",
    link: "https://overthewire.org",
    features: [
      "SSH-based Games",
      "Progressive Difficulty",
      "Community Solutions",
    ],
    pricing: "Free",
    skillsGained: [
      "Linux Command Line",
      "Bash Scripting",
      "Privilege Escalation",
      "Cryptography",
    ],
  },
  {
    name: "PicoCTF",
    category: "CTF & Cybersecurity",
    difficulty: "Beginner → Intermediate",
    description:
      "Beginner-friendly Capture The Flag platform designed to teach cybersecurity fundamentals through cryptography, forensics, reverse engineering, and binary exploitation.",
    link: "https://picoctf.org",
    features: [
      "Year-round Access",
      "Educational Content",
      "Hints System",
      "Leaderboards",
    ],
    pricing: "Free",
    skillsGained: [
      "Cryptography",
      "Forensics",
      "Reverse Engineering",
      "Binary Exploitation",
    ],
  },
  {
    name: "VulnHub",
    category: "Vulnerable Machines",
    difficulty: "Intermediate → Advanced",
    description:
      "Community-driven repository of downloadable vulnerable virtual machines for offline penetration testing practice in controlled local lab environments.",
    link: "https://www.vulnhub.com",
    features: [
      "Offline Practice",
      "Community VMs",
      "Varied Difficulty",
      "Detailed Writeups",
    ],
    pricing: "Free",
    skillsGained: [
      "Enumeration",
      "Exploitation",
      "Post-Exploitation",
      "Report Writing",
    ],
  },
  {
    name: "CTFlearn",
    category: "CTF Practice",
    difficulty: "Beginner → Intermediate",
    description:
      "Learning-focused CTF platform with diverse challenges across cryptography, web exploitation, reverse engineering, forensics, and programming in a supportive environment.",
    link: "https://ctflearn.com",
    features: [
      "Progressive Challenges",
      "Community Support",
      "Ranking System",
      "Writeups",
    ],
    pricing: "Free",
    skillsGained: [
      "CTF Fundamentals",
      "Web Exploitation",
      "Cryptanalysis",
      "Problem Solving",
    ],
  },
];