import { motion, type Variants } from "framer-motion";
import { Terminal, Map, NotebookPen, ArrowUpRight, ExternalLink, Award, Zap } from "lucide-react";

/* ===============================
   HELPERS
================================ */

function getMainCategory(category: string) {
  if (category.toLowerCase().includes("ctf")) return "CTF";
  if (category.toLowerCase().includes("web")) return "Web Security";
  if (category.toLowerCase().includes("linux")) return "Linux";
  if (category.toLowerCase().includes("blockchain")) return "Blockchain";
  if (category.toLowerCase().includes("crypto")) return "Cryptography";
  return "Cyber";
}

function getDifficultyColor(difficulty: string) {
  if (difficulty.includes("Beginner")) return {
    bg: "bg-green-500/10",
    text: "text-green-300",
    border: "border-green-400/30"
  };
  if (difficulty.includes("Intermediate")) return {
    bg: "bg-yellow-500/10",
    text: "text-yellow-300",
    border: "border-yellow-400/30"
  };
  if (difficulty.includes("Advanced") || difficulty.includes("Expert")) return {
    bg: "bg-red-500/10",
    text: "text-red-300",
    border: "border-red-400/30"
  };
  return {
    bg: "bg-purple-500/10",
    text: "text-purple-300",
    border: "border-purple-400/30"
  };
}

/* ===============================
   DATA
================================ */

const platforms = [
  {
    name: "TryHackMe",
    category: "Cybersecurity & Pentesting",
    difficulty: "Beginner → Advanced",
    description:
      "Interactive learning platform with guided paths, hands-on labs, and real-world scenarios covering cybersecurity, Linux, networking, and ethical hacking fundamentals.",
    link: "https://tryhackme.com",
    features: ["Guided Learning Paths", "Virtual Machines", "Certificates"],
    pricing: "Freemium",
    skillsGained: ["Web Security", "Network Security", "Linux", "OSINT"]
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
    skillsGained: ["Pentesting", "Active Directory", "Privilege Escalation", "Post-Exploitation"]
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
    skillsGained: ["SQL Injection", "XSS", "CSRF", "Authentication Bypass", "API Security"]
  },
  {
    name: "OverTheWire",
    category: "Linux & Security Wargames",
    difficulty: "Beginner → Intermediate",
    description:
      "Classic wargames platform teaching security concepts through progressive Linux command-line challenges, cryptography puzzles, and system administration tasks.",
    link: "https://overthewire.org",
    features: ["SSH-based Games", "Progressive Difficulty", "Community Solutions"],
    pricing: "Free",
    skillsGained: ["Linux Command Line", "Bash Scripting", "Privilege Escalation", "Cryptography"]
  },
  {
    name: "PicoCTF",
    category: "CTF & Cybersecurity",
    difficulty: "Beginner → Intermediate",
    description:
      "Beginner-friendly Capture The Flag platform designed to teach cybersecurity fundamentals through cryptography, forensics, reverse engineering, and binary exploitation.",
    link: "https://picoctf.org",
    features: ["Year-round Access", "Educational Content", "Hints System", "Leaderboards"],
    pricing: "Free",
    skillsGained: ["Cryptography", "Forensics", "Reverse Engineering", "Binary Exploitation"]
  },
  {
    name: "VulnHub",
    category: "Vulnerable Machines",
    difficulty: "Intermediate → Advanced",
    description:
      "Community-driven repository of downloadable vulnerable virtual machines for offline penetration testing practice in controlled local lab environments.",
    link: "https://www.vulnhub.com",
    features: ["Offline Practice", "Community VMs", "Varied Difficulty", "Detailed Writeups"],
    pricing: "Free",
    skillsGained: ["Enumeration", "Exploitation", "Post-Exploitation", "Report Writing"]
  },
  {
    name: "CTFlearn",
    category: "CTF Practice",
    difficulty: "Beginner → Intermediate",
    description:
      "Learning-focused CTF platform with diverse challenges across cryptography, web exploitation, reverse engineering, forensics, and programming in a supportive environment.",
    link: "https://ctflearn.com",
    features: ["Progressive Challenges", "Community Support", "Ranking System", "Writeups"],
    pricing: "Free",
    skillsGained: ["CTF Fundamentals", "Web Exploitation", "Cryptanalysis", "Problem Solving"]
  },
];

const practiceSteps = [
  {
    title: "Start with Beginner Platforms",
    description:
      "Build confidence with guided labs and beginner-friendly environments before moving to harder challenges.",
    icon: Terminal,
  },
  {
    title: "Follow Structured Learning Paths",
    description:
      "Avoid random practice. Roadmaps ensure skills are learned in the correct order.",
    icon: Map,
  },
  {
    title: "Practice Consistently & Take Notes",
    description:
      "Daily hands-on practice combined with note-taking reinforces long-term understanding.",
    icon: NotebookPen,
  },
  {
    title: "Increase Difficulty Gradually",
    description:
      "Progress from simple challenges to realistic labs without overwhelming yourself.",
    icon: ArrowUpRight,
  },
];

/* ===============================
   ANIMATIONS
================================ */

const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const hoverLift = {
  whileHover: {
    y: -8,
    boxShadow: "0 0 45px rgba(34,211,238,0.35)",
    transition: { duration: 0.3 },
  },
};

/* ===============================
   COMPONENT
================================ */

export default function Platforms() {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-20">
        {/* TITLE */}
        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-6">
          Learning <span className="text-cyan-400">Platforms</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-gray-300 leading-relaxed max-w-3xl mb-16"
        >
          Carefully curated platforms providing hands-on experience, real-world labs, 
          and structured learning paths for building strong cybersecurity and 
          penetration testing skills ethically and professionally.
        </motion.p>

        {/* WHY + TIMELINE */}
        <motion.section variants={fadeUp} className="mb-24">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            Why Practice on These Platforms?
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mb-14">
            Cybersecurity is a hands-on discipline. These platforms simulate
            real-world environments where you learn by breaking systems,
            fixing vulnerabilities, and thinking like attackers—all within 
            legal and ethical boundaries.
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {practiceSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
                >
                  <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-cyan-400 text-black text-sm font-bold flex items-center justify-center shadow-lg shadow-cyan-400/50">
                    {i + 1}
                  </span>

                  <div className="mb-4 text-cyan-400">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-gray-100">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* PLATFORM GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-24"
        >
          {platforms.map((p, index) => {
            const mainCategory = getMainCategory(p.category);
            const difficultyColor = getDifficultyColor(p.difficulty);
            const isPaid = p.pricing === "Paid";
            const isFree = p.pricing === "Free";

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                {...hoverLift}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
              >
                {/* Top Badge Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">
                      {p.name}
                    </h3>
                  </div>
                  
                  {/* Pricing Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    isFree 
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/30'
                      : isPaid 
                      ? 'bg-orange-500/10 text-orange-300 border border-orange-400/30'
                      : 'bg-blue-500/10 text-blue-300 border border-blue-400/30'
                  }`}>
                    {p.pricing}
                  </div>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 font-medium">
                    {mainCategory}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full ${difficultyColor.bg} ${difficultyColor.text} border ${difficultyColor.border} font-medium`}>
                    {p.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {p.description}
                </p>

                {/* Features */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                    <Zap size={12} className="text-cyan-400" />
                    KEY FEATURES
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Gained */}
                <div className="mb-5 pb-5 border-b border-white/10">
                  <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                    <Award size={12} className="text-cyan-400" />
                    SKILLS GAINED
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.skillsGained.slice(0, 4).map((skill, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visit Button */}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-medium group-hover:shadow-lg group-hover:shadow-cyan-400/20"
                >
                  <span>Visit Platform</span>
                  <ExternalLink size={14} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ETHICAL USE WARNING */}
        <motion.section 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-red-900/20 to-red-950/30 border border-red-500/30 rounded-2xl p-8 sm:p-10 hover:border-red-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-2">
                Ethical Use & Legal Responsibility
              </h2>
              <p className="text-gray-400 text-sm">
                Critical information for all cybersecurity learners and practitioners
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-300 leading-relaxed">
              All platforms, tools, and skills discussed here are intended <strong className="text-red-300">strictly for ethical, educational, and authorized purposes only</strong>. These resources exist to help you learn cybersecurity defensively and build a safer digital world.
            </p>

            <p className="text-gray-300 leading-relaxed">
              <strong className="text-red-300">Unauthorized access to computer systems, networks, or data is illegal</strong> and punishable under laws such as the Computer Fraud and Abuse Act (USA), IT Act 2000 (India), and similar legislation worldwide. Violators face severe consequences including criminal charges, fines, imprisonment, and permanent damage to career prospects.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-5">
              <h3 className="text-red-300 font-semibold mb-3 text-sm flex items-center gap-2">
                <span className="text-lg">✓</span>
                ACCEPTABLE USES
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Learning and skill development in controlled environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Testing on systems you own or have written permission to test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Bug bounty programs with proper authorization and disclosure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Security research with ethical approval and responsible disclosure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Professional penetration testing with signed contracts and scope</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-5">
              <h3 className="text-red-300 font-semibold mb-3 text-sm flex items-center gap-2">
                <span className="text-lg">✗</span>
                PROHIBITED ACTIVITIES
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Unauthorized access to any system, network, or database</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Hacking or exploiting systems without explicit written permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Distributing malware, ransomware, or malicious tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Stealing, selling, or leaking sensitive data or credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Using skills for personal gain, revenge, or causing harm</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-red-300 font-semibold mb-3 text-sm">THE ETHICAL HACKER'S COMMITMENT:</h4>
            <blockquote className="text-gray-300 text-sm italic border-l-4 border-red-500/50 pl-4 leading-relaxed">
              "I pledge to use my cybersecurity knowledge and skills exclusively for ethical purposes, with proper authorization, and in full compliance with all applicable laws. I will respect privacy, protect confidential information, and never exploit vulnerabilities for personal gain or malicious intent. I commit to being a force for good in the digital world, defending systems rather than attacking them unlawfully, and contributing to a safer internet for everyone."
            </blockquote>
          </div>

          <div className="mt-6 pt-6 border-t border-red-500/30">
            <p className="text-red-300 text-sm font-medium flex items-start gap-2">
              <span className="text-lg flex-shrink-0">⚖️</span>
              <span>
                <strong>Remember:</strong> With great power comes great responsibility. Ethical behavior is not optional—it's mandatory. Your actions have real-world consequences. Choose to be a defender, not an attacker. Build trust, not fear. Protect, don't exploit.
              </span>
            </p>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}