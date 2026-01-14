import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
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
} from "lucide-react";

/* =====================================================
   ANIMATION VARIANTS (STRICT & TS SAFE)
===================================================== */

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const cardHover: Variants = {
  hover: {
    y: -6,
    boxShadow: "0 0 35px rgba(34,211,238,0.35)",
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const pulseDot: Variants = {
  animate: {
    scale: [1, 1.4, 1],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

/* =====================================================
   TYPES
===================================================== */

type Role = "SOC" | "VAPT" | "BOTH";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface RoadmapStep {
  title: string;
  role: Role;
  icon: any;
  description: string;
  objectives: string[];
  outcomes: string[];
  tools: { name: string; slug: string }[];
  labs: {
    name: string;
    url: string;
    level: Difficulty;
  }[];
}

/* =====================================================
   ROADMAP DATA (DETAILED)
===================================================== */

const roadmap: RoadmapStep[] = [
  {
    title: "Linux & OS Fundamentals",
    role: "BOTH",
    icon: Terminal,
    description:
      "Strong Linux fundamentals are mandatory for SOC analysts and penetration testers. This phase builds terminal confidence and OS-level understanding.",
    objectives: [
      "Understand Linux directory structure",
      "Master essential commands",
      "Learn process & service management",
      "Understand file permissions & ownership",
    ],
    outcomes: [
      "Navigate Linux without GUI",
      "Analyze system behavior",
      "Prepare for security tooling",
    ],
    tools: [
      { name: "Linux", slug: "linux" },
      { name: "Bash", slug: "bash" },
    ],
    labs: [
      {
        name: "TryHackMe – Linux Fundamentals",
        url: "https://tryhackme.com",
        level: "Beginner",
      },
    ],
  },

  {
    title: "Networking & Traffic Analysis",
    role: "SOC",
    icon: Network,
    description:
      "SOC analysts must understand how data flows across networks to detect anomalies and intrusions.",
    objectives: [
      "Understand TCP/IP & OSI Model",
      "Read packet captures",
      "Identify malicious traffic",
    ],
    outcomes: [
      "Analyze suspicious traffic",
      "Detect beaconing & scans",
    ],
    tools: [
      { name: "Wireshark", slug: "wireshark" },
      { name: "tcpdump", slug: "tcpdump" },
    ],
    labs: [
      {
        name: "TryHackMe – Network Fundamentals",
        url: "https://tryhackme.com",
        level: "Beginner",
      },
      {
        name: "Blue Team Labs Online",
        url: "https://blueteamlabs.online",
        level: "Intermediate",
      },
    ],
  },

  {
    title: "Security Fundamentals",
    role: "BOTH",
    icon: Shield,
    description:
      "Learn core cybersecurity concepts, threat modeling, and real-world attack techniques.",
    objectives: [
      "Understand CIA Triad",
      "Learn threat actors & motivations",
      "Map attacks using MITRE ATT&CK",
    ],
    outcomes: [
      "Think like attacker & defender",
      "Understand enterprise threats",
    ],
    tools: [
      { name: "MITRE ATT&CK", slug: "mitre-attck" },
      { name: "SIEM", slug: "siem" },
    ],
    labs: [
      {
        name: "TryHackMe – Pre Security",
        url: "https://tryhackme.com",
        level: "Beginner",
      },
    ],
  },

  {
    title: "Reconnaissance & Scanning",
    role: "VAPT",
    icon: Radar,
    description:
      "Learn how attackers enumerate systems, services, and weaknesses.",
    objectives: [
      "Host & service discovery",
      "Port scanning techniques",
      "OS fingerprinting",
    ],
    outcomes: [
      "Perform professional reconnaissance",
      "Prepare attack surface mapping",
    ],
    tools: [
      { name: "Nmap", slug: "nmap" },
      { name: "theHarvester", slug: "theharvester" },
    ],
    labs: [
      {
        name: "TryHackMe – Nmap",
        url: "https://tryhackme.com",
        level: "Beginner",
      },
      {
        name: "Hack The Box – Starting Point",
        url: "https://hackthebox.com",
        level: "Intermediate",
      },
    ],
  },

  {
    title: "Vulnerability Exploitation",
    role: "VAPT",
    icon: Bug,
    description:
      "Exploit real vulnerabilities and understand how breaches occur.",
    objectives: [
      "Exploit web vulnerabilities",
      "Understand CVEs",
      "Chain attacks",
    ],
    outcomes: [
      "Conduct penetration tests",
      "Write professional reports",
    ],
    tools: [
      { name: "Burp Suite", slug: "burp-suite" },
      { name: "SQLmap", slug: "sqlmap" },
    ],
    labs: [
      {
        name: "PortSwigger Web Security Academy",
        url: "https://portswigger.net",
        level: "Intermediate",
      },
      {
        name: "Hack The Box – Machines",
        url: "https://hackthebox.com",
        level: "Advanced",
      },
    ],
  },

  {
    title: "Monitoring & Incident Response",
    role: "SOC",
    icon: Lock,
    description:
      "Detect threats, investigate alerts, and respond to incidents effectively.",
    objectives: [
      "Log analysis",
      "Alert triage",
      "Incident response lifecycle",
    ],
    outcomes: [
      "Work as SOC Level 1 Analyst",
      "Handle real incidents",
    ],
    tools: [
      { name: "Splunk", slug: "splunk" },
      { name: "Wazuh", slug: "wazuh" },
    ],
    labs: [
      {
        name: "TryHackMe – SOC Level 1",
        url: "https://tryhackme.com",
        level: "Beginner",
      },
      {
        name: "Blue Team Labs Online",
        url: "https://blueteamlabs.online",
        level: "Intermediate",
      },
    ],
  },
];

/* =====================================================
   COMPONENT
===================================================== */

export default function Start() {
  const [path, setPath] = useState<Role>("SOC");

  const filteredRoadmap = roadmap.filter(
    (step) => step.role === "BOTH" || step.role === path
  );

  return (
    <section className="px-5 sm:px-8 py-20 max-w-7xl mx-auto">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 mb-10"
      >
        ← Back to Home
      </Link>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">
        SOC & VAPT <span className="text-cyan-400">Learning Roadmap</span>
      </h1>

      <p className="text-gray-300 max-w-3xl mb-12">
        A structured, industry-aligned roadmap designed to take you from
        beginner to job-ready SOC Analyst or VAPT professional.
      </p>

      {/* Toggle */}
      <div className="flex gap-4 mb-16">
        {(["SOC", "VAPT"] as Role[]).map((role) => (
          <button
            key={role}
            onClick={() => setPath(role)}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              path === role
                ? "bg-cyan-500 text-black"
                : "border border-white/20 hover:border-cyan-400/40"
            }`}
          >
            {role} Path
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative border-l border-white/20 pl-6 space-y-16">
        {filteredRoadmap.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                variants={pulseDot}
                animate="animate"
                className="absolute -left-[34px] top-3 w-4 h-4 bg-cyan-400 rounded-full"
              />

              <motion.div
                whileHover="hover"
                variants={cardHover}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>

                <p className="text-gray-300 mb-6">{item.description}</p>

                {/* Objectives */}
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 font-semibold mb-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {item.objectives.map((obj) => (
                      <li key={obj} className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 font-semibold mb-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    Outcomes
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {item.outcomes.map((out) => (
                      <li key={out}>• {out}</li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      to={`/tools/${tool.slug}`}
                      className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-400/20"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>

                {/* Labs */}
                <ul className="space-y-2 text-sm">
                  {item.labs.map((lab) => (
                    <li
                      key={lab.name}
                      className="flex justify-between items-center"
                    >
                      <a
                        href={lab.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-cyan-400"
                      >
                        {lab.name}
                      </a>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          lab.level === "Beginner"
                            ? "bg-green-500/20 text-green-400"
                            : lab.level === "Intermediate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {lab.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
