import { Link } from "react-router-dom";
import { cyberTools, CyberTool } from "../../data/cyberTools";

const LEVEL_ORDER: CyberTool["level"][] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export default function ToolsHome() {
  // Group tools by LEVEL instead of category
  const groupedByLevel = cyberTools.reduce<Record<string, CyberTool[]>>(
    (acc, tool) => {
      if (!acc[tool.level]) {
        acc[tool.level] = [];
      }
      acc[tool.level].push(tool);
      return acc;
    },
    {}
  );

  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
        HERO SECTION
=============================== */}
<div className="mb-16">
  <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
    Cybersecurity <span className="text-cyan-400">Tools</span>
  </h1>

  <p className="text-cyan-400 max-w-5xl leading-relaxed text-lg">
    Cybersecurity tools are specialized software applications designed to safeguard computer systems, networks, applications, and sensitive data from a wide range of cyber threats. These threats include hacking attempts, malware infections, data breaches, phishing attacks, and unauthorized access. By continuously monitoring, analyzing, and defending digital environments, cybersecurity tools help organizations and individuals detect security weaknesses early and protect critical digital assets from malicious activity.
  </p>

</div>

{/* ===============================
    TYPES OF CYBERTOOLS
=============================== */}
<div className="mb-10">
  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
    Types of <span className="text-cyan-400">CyberTools</span>
  </h2>
</div>

{/* ===============================
    CYBER TOOLS CATEGORIES
=============================== */}
<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-24">

  {/* Reconnaissance */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🛰️ Reconnaissance & Information Gathering
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
      Reconnaissance / OSINT / Networking
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      Tools used to collect information about targets such as domains, IP
      addresses, subdomains, open ports, and exposed services before an attack
      or security assessment begins.
    </p>
  </div>

  {/* Vulnerability Scanning */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🧪 Vulnerability Assessment & Scanning
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
      Vulnerability Management / Security Assessment
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      These tools scan systems and applications to identify security weaknesses,
      misconfigurations, outdated software, and known vulnerabilities.
    </p>
  </div>

  {/* Exploitation */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      💣 Exploitation & Penetration Testing
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-red-600/20 text-red-400 border border-red-500/30">
      Penetration Testing / Offensive Security
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      Penetration testing tools simulate real-world attacks by exploiting
      vulnerabilities to test the strength of system defenses.
    </p>
  </div>

  {/* Password Attacks */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🔑 Password Attacks & Credential Testing
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-orange-600/20 text-orange-400 border border-orange-500/30">
      Authentication Security / Offensive Security
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      Tools designed to test password strength using techniques like brute
      force, dictionary attacks, and credential stuffing.
    </p>
  </div>

  {/* Wireless Attacks */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      📡 Wireless Attacks
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-purple-600/20 text-purple-400 border border-purple-500/30">
      Wireless Security / Networking
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      Wireless security tools analyze and attack Wi-Fi and Bluetooth networks
      to detect weak encryption, rogue access points, and misconfigurations.
    </p>
  </div>

  {/* Web Security */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🌐 Web Application Security
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-amber-600/20 text-amber-400 border border-amber-500/30">
      Application Security (AppSec) / Web Security
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      Tools used to identify vulnerabilities in web applications such as SQL
      injection, XSS, CSRF, authentication flaws, and insecure APIs.
    </p>
  </div>

  {/* Malware */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🧬 Malware Analysis & Reverse Engineering
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-rose-700/20 text-rose-400 border border-rose-500/30">
      Malware Analysis / Reverse Engineering
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      These tools analyze malicious software to understand how it works,
      identify its behavior, and develop detection or mitigation techniques.
    </p>
  </div>

  {/* DFIR */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🕵️ Digital Forensics & Incident Response
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-lime-600/20 text-lime-400 border border-lime-500/30">
      DFIR (Digital Forensics & Incident Response)
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      DFIR tools help investigate security incidents, analyze logs, recover
      evidence, and respond effectively to cyber attacks.
    </p>
  </div>

  {/* SOC */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      📊 Network Monitoring & SOC Tools
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-stone-600/20 text-stone-400 border border-stone-500/30">
      Network Security / SOC / Blue Team
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      Tools used in Security Operations Centers to monitor traffic, detect
      anomalies, generate alerts, and respond to threats in real time.
    </p>
  </div>

  {/* Post Exploitation */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🧠 Post-Exploitation & Privilege Escalation
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-pink-600/20 text-pink-400 border border-pink-500/30">
      Post-Exploitation / Red Team Operations
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      These tools help attackers and testers maintain access, escalate
      privileges, and move laterally within compromised systems.
    </p>
  </div>

  {/* OSINT */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🔍 OSINT (Open-Source Intelligence)
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-orange-700/20 text-orange-300 border border-orange-600/30">
      OSINT / Threat Intelligence
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      OSINT tools collect publicly available information from the internet,
      social media, and databases for investigation and threat analysis.
    </p>
  </div>

  {/* Crypto */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6 hover:-translate-y-2
    transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <h3 className="text-white font-semibold text-lg mb-2">
      🔐 Cryptography & Steganography
    </h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full
      bg-violet-600/20 text-violet-400 border border-violet-500/30">
      Cryptography / Information Security
    </span>
    <p className="text-gray-300 text-sm leading-relaxed">
      Tools used to encrypt data, analyze cryptographic algorithms, and hide
      information within files or media for secure communication.
    </p>
  </div>

</div>
      {/* ===============================
          TOOLS BY LEVEL
      =============================== */}
      {LEVEL_ORDER.map((level) => (
        <section key={level} className="mb-20">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
            {level} Tools
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {(groupedByLevel[level] || []).map((tool) => (
<div
  key={tool.slug}
  className="flex flex-col h-full
  bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
  border border-cyan-500/30 rounded-xl p-6
  transition-all duration-300
  hover:-translate-y-2
  hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
>
  {/* CONTENT (fills available height) */}
  <div className="flex-1">
    {/* Tool Name */}
    <h3 className="text-cyan-400 font-semibold text-lg mb-1">
      ›› {tool.name}
    </h3>

    {/* Level + Category Badges */}
    <div className="flex gap-2 mb-3 flex-wrap">
      <span
        className="text-xs px-2 py-1 rounded-full
        bg-cyan-500/10 text-cyan-300
        border border-cyan-500/30"
      >
        {tool.level}
      </span>

      <span
        className="text-xs px-2 py-1 rounded-full
        bg-indigo-500/10 text-indigo-300
        border border-indigo-500/30"
      >
        {tool.category}
      </span>
    </div>

    {/* Description */}
    <p className="text-gray-300 text-sm mb-4">
      {tool.use}
    </p>

    {/* Commands */}
    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
      {tool.commands.map((cmd, index) => (
        <div
          key={`${tool.slug}-${index}`}
          className="flex items-center justify-between
          bg-[#020617] rounded-lg px-3 py-2
          border border-cyan-500/30"
        >
          <code className="text-cyan-300 text-sm overflow-x-auto">
            {cmd}
          </code>

          <button
            onClick={() => navigator.clipboard.writeText(cmd)}
            className="ml-3 text-xs px-3 py-1 rounded-md
            border border-cyan-400 text-cyan-400
            hover:bg-cyan-400 hover:text-black transition"
          >
            Copy
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* LEARN BUTTON (always at bottom) */}
  <Link
    to={`/tools/${tool.slug}`}
    className="mt-5 block text-center text-sm py-2 rounded-lg
    border border-cyan-400 text-cyan-400
    hover:bg-cyan-400 hover:text-black transition"
  >
    Learn {tool.name}
  </Link>
</div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
