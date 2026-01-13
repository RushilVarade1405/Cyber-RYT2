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
} from "lucide-react";

/* ===============================
   ANIMATION VARIANTS (TS SAFE)
================================ */

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // easeOut
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
      ease: [0.42, 0, 0.58, 1], // easeInOut
    },
  },
};

/* ===============================
   TYPES
================================ */

type Role = "SOC" | "VAPT" | "BOTH";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

/* ===============================
   ROADMAP DATA
================================ */

const roadmap = [
  {
    title: "Linux & OS Fundamentals",
    role: "BOTH" as Role,
    icon: Terminal,
    description:
      "Build command-line confidence and understand OS behavior used across SOC and VAPT roles.",
    tools: [
      { name: "Linux", slug: "linux" },
      { name: "Bash", slug: "bash" },
    ],
    labs: [
      {
        name: "TryHackMe – Linux Fundamentals",
        url: "https://tryhackme.com",
        level: "Beginner" as Difficulty,
      },
    ],
  },
  {
    title: "Networking & Traffic Analysis",
    role: "SOC" as Role,
    icon: Network,
    description:
      "Analyze network traffic and identify suspicious patterns.",
    tools: [
      { name: "Wireshark", slug: "wireshark" },
      { name: "tcpdump", slug: "tcpdump" },
    ],
    labs: [
      {
        name: "TryHackMe – Network Fundamentals",
        url: "https://tryhackme.com",
        level: "Beginner" as Difficulty,
      },
      {
        name: "Blue Team Labs Online",
        url: "https://blueteamlabs.online",
        level: "Intermediate" as Difficulty,
      },
    ],
  },
  {
    title: "Security Fundamentals",
    role: "BOTH" as Role,
    icon: Shield,
    description:
      "Understand threat models, attack surfaces, and security principles.",
    tools: [
      { name: "MITRE ATT&CK", slug: "mitre-attck" },
      { name: "SIEM", slug: "siem" },
    ],
    labs: [
      {
        name: "TryHackMe – Pre Security",
        url: "https://tryhackme.com",
        level: "Beginner" as Difficulty,
      },
    ],
  },
  {
    title: "Reconnaissance & Scanning",
    role: "VAPT" as Role,
    icon: Radar,
    description:
      "Identify hosts, ports, and exposed services during assessments.",
    tools: [
      { name: "Nmap", slug: "nmap" },
      { name: "theHarvester", slug: "theharvester" },
    ],
    labs: [
      {
        name: "TryHackMe – Nmap",
        url: "https://tryhackme.com",
        level: "Beginner" as Difficulty,
      },
      {
        name: "Hack The Box – Starting Point",
        url: "https://hackthebox.com",
        level: "Intermediate" as Difficulty,
      },
    ],
  },
  {
    title: "Vulnerability Exploitation",
    role: "VAPT" as Role,
    icon: Bug,
    description:
      "Exploit vulnerabilities and understand real-world attack paths.",
    tools: [
      { name: "Burp Suite", slug: "burp-suite" },
      { name: "SQLmap", slug: "sqlmap" },
    ],
    labs: [
      {
        name: "PortSwigger Web Security Academy",
        url: "https://portswigger.net",
        level: "Intermediate" as Difficulty,
      },
      {
        name: "Hack The Box – Machines",
        url: "https://hackthebox.com",
        level: "Advanced" as Difficulty,
      },
    ],
  },
  {
    title: "Monitoring & Incident Response",
    role: "SOC" as Role,
    icon: Lock,
    description:
      "Detect, analyze, and respond to security incidents using logs and alerts.",
    tools: [
      { name: "Splunk", slug: "splunk" },
      { name: "Wazuh", slug: "wazuh" },
    ],
    labs: [
      {
        name: "TryHackMe – SOC Level 1",
        url: "https://tryhackme.com",
        level: "Beginner" as Difficulty,
      },
      {
        name: "Blue Team Labs Online",
        url: "https://blueteamlabs.online",
        level: "Intermediate" as Difficulty,
      },
    ],
  },
];

/* ===============================
   COMPONENT
================================ */

export default function Start() {
  const [path, setPath] = useState<Role>("SOC");

  const filteredRoadmap = roadmap.filter(
    (step) => step.role === "BOTH" || step.role === path
  );

  return (
    <section className="px-5 sm:px-8 py-20 max-w-7xl mx-auto">
      {/* Back to Home */}
      <div className="mb-8">
        <Link
          to="/"
          className="
            inline-flex items-center gap-2
            text-sm text-gray-300
            hover:text-cyan-400
            transition
          "
        >
          <span className="text-lg">←</span>
          Back to Home
        </Link>
      </div>


      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        SOC & VAPT <span className="text-cyan-400">Learning Roadmap</span>
      </h1>

      <p className="text-gray-300 mb-10 max-w-3xl">
        Switch between SOC Analyst and VAPT learning paths and follow
        difficulty-based labs aligned with industry expectations.
      </p>

      {/* Toggle */}
      <div className="flex gap-4 mb-14">
        {(["SOC", "VAPT"] as Role[]).map((role) => (
          <button
            key={role}
            onClick={() => setPath(role)}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
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
      <div className="relative border-l border-white/20 pl-6 space-y-14">
        {filteredRoadmap.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <motion.div
                variants={pulseDot}
                animate="animate"
                className="absolute -left-[34px] top-2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              />

              <motion.div
                whileHover="hover"
                variants={cardHover}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>

                <p className="text-sm text-gray-300 mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      to={`/tools/${tool.slug}`}
                      className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-400/20 transition"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>

                <ul className="space-y-1 text-sm">
                  {item.labs.map((lab) => (
                    <li
                      key={lab.name}
                      className="flex justify-between items-center"
                    >
                      <a
                        href={lab.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-cyan-400 transition"
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
