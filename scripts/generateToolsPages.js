const fs = require("fs");
const path = require("path");

/* ===============================
   LOAD TOOL CONTENT (JSON)
================================ */

const toolsContent = require("../src/data/toolsContent.json");

/* ===============================
   TOOL DEFINITIONS
================================ */

const tools = [
  { file: "AircrackNg.tsx", component: "AircrackNg", key: "aircrackng" },
  { file: "Bettercap.tsx", component: "Bettercap", key: "bettercap" },
  { file: "BurpSuite.tsx", component: "BurpSuite", key: "burpsuite" },
  { file: "Hashcat.tsx", component: "Hashcat", key: "hashcat" },
  { file: "Hydra.tsx", component: "Hydra", key: "hydra" },
  { file: "JohnTheRipper.tsx", component: "JohnTheRipper", key: "johntheripper" },
  { file: "Maltego.tsx", component: "Maltego", key: "maltego" },
  { file: "Metasploit.tsx", component: "Metasploit", key: "metasploit" },
  { file: "Netcat.tsx", component: "Netcat", key: "netcat" },
  { file: "Nmap.tsx", component: "Nmap", key: "nmap" },
  { file: "OWASPZAP.tsx", component: "OWASPZAP", key: "owasp-zap" },
  { file: "Sherlock.tsx", component: "Sherlock", key: "sherlock" },
  { file: "Shodan.tsx", component: "Shodan", key: "shodan" },
  { file: "SQLmap.tsx", component: "SQLmap", key: "sqlmap" },
  { file: "Tcpdump.tsx", component: "Tcpdump", key: "tcpdump" },
  { file: "theHarvester.tsx", component: "TheHarvester", key: "theharvester" },
  { file: "Wireshark.tsx", component: "Wireshark", key: "wireshark" },
];

/* ===============================
   TEMPLATE (JSON-DRIVEN)
================================ */

const template = ({ component, key }) => {
  const tool = toolsContent[key];

  if (!tool) {
    throw new Error(`❌ Missing tool data for key: ${key}`);
  }

  return `
import { Link } from "react-router-dom";

export default function ${component}() {
  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK TO TOOLS LINK
      =============================== */}
      <Link
        to="/tools"
        className="inline-block mb-6 text-${tool.color}-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-5xl font-bold mb-6 text-${tool.color}-400">
        ${tool.title}
      </h1>

      {/* ===============================
          DESCRIPTION
      =============================== */}
      <p className="text-gray-300 max-w-4xl mb-8">
        ${tool.description}
      </p>

      {/* ===============================
          BADGES
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-10">

        <span className="px-3 py-1 text-sm rounded-full
          bg-green-600/20 text-green-400 border border-green-500/30">
          Beginner Friendly
        </span>

        <span className="px-3 py-1 text-sm rounded-full
          bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
          Intermediate
        </span>

        <span className="px-3 py-1 text-sm rounded-full
          bg-red-600/20 text-red-400 border border-red-500/30">
          Advanced
        </span>

        <span className="px-3 py-1 text-sm rounded-full
          bg-${tool.color}-600/20 text-${tool.color}-400 border border-${tool.color}-500/30">
          ${tool.category}
        </span>

      </div>

      {/* ===============================
          CORE FEATURES
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-${tool.color}-300">
          Core Features
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2">
          ${tool.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
      </section>

      {/* ===============================
          COMMON COMMANDS
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-${tool.color}-300">
          Common Commands
        </h2>

        <div className="bg-gray-900 rounded-lg p-5 space-y-3 text-sm font-mono text-gray-200">
          ${tool.commands
            .map(
              c =>
                `<p><span class="text-${tool.color}-400">${c.cmd}</span> — ${c.desc}</p>`
            )
            .join("")}
        </div>
      </section>

      {/* ===============================
          IMPORTANT NOTE
      =============================== */}
      <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-red-400">
          ⚠ Legal & Ethical Warning
        </h2>

        <p className="text-gray-300 leading-relaxed">
          Use this tool only on systems you own or have explicit permission to test.
        </p>
      </section>

    </div>
  );
}
`;
};

/* ===============================
   FILE GENERATION
================================ */

const outputDir = path.join(__dirname, "../src/pages/tools");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

tools.forEach(tool => {
  const filePath = path.join(outputDir, tool.file);
  fs.writeFileSync(filePath, template(tool).trim());
  console.log(`✅ Generated: ${tool.file}`);
});

console.log("\n🎉 All JSON-driven tool pages generated successfully!");
