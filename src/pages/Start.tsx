import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, memo } from "react";
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
} from "lucide-react";

/* =====================================================
   ANIMATION VARIANTS (ENHANCED & SMOOTH)
===================================================== */

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const cardHover: Variants = {
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 0 40px rgba(34,211,238,0.4)",
    borderColor: "rgba(34,211,238,0.5)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const pulseDot: Variants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    boxShadow: [
      "0 0 0 0 rgba(34,211,238,0.7)",
      "0 0 0 10px rgba(34,211,238,0)",
      "0 0 0 0 rgba(34,211,238,0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const iconFloat: Variants = {
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

/* =====================================================
   TYPES
===================================================== */

type Role = "SOC" | "VAPT" | "BOTH";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface Tool {
  name: string;
  slug: string;
}

interface Lab {
  name: string;
  url: string;
  level: Difficulty;
}

interface RoadmapStep {
  title: string;
  role: Role;
  icon: any;
  description: string;
  objectives: string[];
  outcomes: string[];
  tools: Tool[];
  labs: Lab[];
}

/* =====================================================
   ROADMAP DATA (COMPREHENSIVE)
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
   DIFFICULTY BADGE CONFIG
===================================================== */

const difficultyConfig: Record<
  Difficulty,
  { bg: string; text: string; border: string }
> = {
  Beginner: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-400/30",
  },
  Intermediate: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-400/30",
  },
  Advanced: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-400/30",
  },
};

/* =====================================================
   SUB-COMPONENTS (MEMOIZED)
===================================================== */

const PathToggle = memo(
  ({ path, setPath }: { path: Role; setPath: (role: Role) => void }) => (
    <motion.div
      variants={fadeIn}
      className="inline-flex gap-3 p-1.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-16"
    >
      {(["SOC", "VAPT"] as Role[]).map((role) => (
        <button
          key={role}
          onClick={() => setPath(role)}
          className={`
            relative px-8 py-3 rounded-xl font-semibold 
            transition-all duration-300 ease-out
            ${
              path === role
                ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-black shadow-lg shadow-cyan-500/50"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }
          `}
        >
          {path === role && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {role} Path
            {path === role && <Sparkles className="w-4 h-4" />}
          </span>
        </button>
      ))}
    </motion.div>
  )
);

PathToggle.displayName = "PathToggle";

const RoadmapCard = memo(
  ({ item, index }: { item: RoadmapStep; index: number }) => {
    const Icon = item.icon;

    return (
      <motion.article
        variants={stepVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        {/* Animated Dot */}
        <motion.div
          variants={pulseDot}
          animate="animate"
          className="absolute -left-[34px] top-4 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
        />

        {/* Step Number Badge */}
        <div className="absolute -left-[54px] -top-2 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center text-xs font-bold text-cyan-400">
          {index + 1}
        </div>

        {/* Main Card */}
        <motion.div
          whileHover="hover"
          variants={cardHover}
          className="
            relative overflow-hidden
            bg-gradient-to-br from-white/5 to-white/[0.02] 
            backdrop-blur-xl border border-white/10 
            rounded-2xl p-8
            group
          "
        >
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                variants={iconFloat}
                animate="animate"
                className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center"
              >
                <Icon className="w-7 h-7 text-cyan-400" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Objectives */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5"
            >
              <h4 className="flex items-center gap-2 font-semibold mb-3 text-cyan-400">
                <BookOpen className="w-5 h-5" />
                Learning Objectives
              </h4>
              <ul className="space-y-2.5">
                {item.objectives.map((obj) => (
                  <motion.li
                    key={obj}
                    variants={fadeIn}
                    className="flex items-start gap-3 text-sm text-gray-300 group/item"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="group-hover/item:text-white transition-colors">
                      {obj}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Outcomes */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-400/10"
            >
              <h4 className="flex items-center gap-2 font-semibold mb-3 text-amber-400">
                <Award className="w-5 h-5" />
                What You'll Achieve
              </h4>
              <ul className="space-y-2">
                {item.outcomes.map((out) => (
                  <motion.li
                    key={out}
                    variants={fadeIn}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-amber-400 font-bold">▸</span>
                    {out}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tools */}
            <div className="mb-5">
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Essential Tools
              </h5>
              <div className="flex flex-wrap gap-2">
                {item.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/tools/${tool.slug}`}
                    className="
                      group/tool
                      text-xs px-4 py-2 rounded-full 
                      bg-gradient-to-br from-cyan-400/10 to-blue-400/10 
                      text-cyan-300 
                      border border-cyan-400/20 
                      hover:border-cyan-400/60 
                      hover:bg-cyan-400/20 
                      hover:shadow-lg hover:shadow-cyan-400/20
                      transition-all duration-300
                      font-medium
                    "
                  >
                    <span className="group-hover/tool:text-cyan-200">
                      {tool.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Labs */}
            <div>
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Practice Labs
              </h5>
              <ul className="space-y-2.5">
                {item.labs.map((lab) => {
                  const config = difficultyConfig[lab.level];
                  return (
                    <li
                      key={lab.name}
                      className="
                        flex justify-between items-center gap-3
                        p-3 rounded-lg
                        bg-white/5 border border-white/5
                        hover:bg-white/10 hover:border-cyan-400/30
                        transition-all duration-300
                        group/lab
                      "
                    >
                      <a
                        href={lab.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex items-center gap-2 
                          text-sm text-gray-300 
                          hover:text-cyan-400 
                          transition-colors
                          flex-1
                        "
                      >
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover/lab:opacity-100 transition-opacity" />
                        {lab.name}
                      </a>
                      <span
                        className={`
                          text-xs px-3 py-1.5 rounded-full 
                          font-semibold border
                          ${config.bg} ${config.text} ${config.border}
                          whitespace-nowrap
                        `}
                      >
                        {lab.level}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.article>
    );
  }
);

RoadmapCard.displayName = "RoadmapCard";

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function Start() {
  const [path, setPath] = useState<Role>("SOC");

  const filteredRoadmap = roadmap.filter(
    (step) => step.role === "BOTH" || step.role === path
  );

  return (
    <section className="relative px-6 sm:px-10 py-20 max-w-7xl mx-auto">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 blur-[140px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[160px]" />
      </div>

      {/* Back Button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          to="/"
          className="
            inline-flex items-center gap-2 
            px-4 py-2 rounded-lg
            text-sm text-gray-300 
            hover:text-cyan-400 hover:bg-white/5
            transition-all duration-300
            mb-10 group
          "
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
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
          SOC & VAPT Learning Roadmap
        </h1>

        <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
          A structured, industry-aligned roadmap designed to take you from
          beginner to job-ready{" "}
          <span className="text-cyan-400 font-semibold">SOC Analyst</span> or{" "}
          <span className="text-cyan-400 font-semibold">VAPT professional</span>
          .
        </p>
      </motion.div>

      {/* Path Toggle */}
      <PathToggle path={path} setPath={setPath} />

      {/* Stats Banner */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="
          flex flex-wrap gap-6 mb-16 p-6 rounded-2xl
          bg-gradient-to-br from-cyan-500/10 to-blue-500/10
          border border-cyan-400/20
        "
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {filteredRoadmap.length}
            </div>
            <div className="text-xs text-gray-400">Learning Phases</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {filteredRoadmap.reduce(
                (sum, step) => sum + step.labs.length,
                0
              )}
            </div>
            <div className="text-xs text-gray-400">Practice Labs</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">Hands-On</div>
            <div className="text-xs text-gray-400">Practical Focus</div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative border-l-2 border-white/20 pl-8 sm:pl-12 space-y-16">
        {filteredRoadmap.map((item, index) => (
          <RoadmapCard key={item.title} item={item} index={index} />
        ))}
      </div>

      {/* Completion CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
          mt-20 p-8 rounded-2xl text-center
          bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10
          border border-cyan-400/20
        "
      >
        <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Ready to Begin?</h3>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Start with the fundamentals and work your way up. Consistency and
          practice are the keys to success in cybersecurity.
        </p>
        <Link
          to="/"
          className="
            inline-flex items-center gap-2
            px-8 py-3 rounded-xl
            bg-gradient-to-r from-cyan-500 to-blue-500
            text-black font-semibold
            hover:shadow-lg hover:shadow-cyan-500/50
            transition-all duration-300
          "
        >
          Explore All Resources
        </Link>
      </motion.div>
    </section>
  );
}