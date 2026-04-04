import { Link } from "react-router-dom";

export default function Metasploit() {
  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK TO TOOLS
      =============================== */}
      <Link
        to="/tools"
        className="inline-block mb-6 text-red-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-5xl font-bold mb-6 text-red-400">
        Metasploit (Exploitation Framework)
      </h1>

      {/* ===============================
          DESCRIPTION
      =============================== */}
      <p className="text-gray-300 max-w-4xl mb-10">
        Metasploit is a powerful exploitation framework used by security
        professionals to discover, exploit, and validate vulnerabilities in
        systems and applications during authorized penetration testing.
      </p>

      {/* ===============================
          BADGES
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-10">
        <span className="px-3 py-1 text-sm rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
          Advanced
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30">
          Exploitation
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30">
          Ethical Hacking
        </span>
      </div>

      {/* ===============================
          WHAT IS METASPLOIT
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-red-300">
          What is Metasploit?
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          <strong>Metasploit</strong> is an open-source framework that allows
          penetration testers and security researchers to safely test systems
          for known vulnerabilities.
        </p>

        <p className="text-gray-300 leading-relaxed">
          It includes thousands of exploits, payloads, scanners, and auxiliary
          modules that help assess security posture in controlled environments.
        </p>
      </section>

      {/* ===============================
          CORE FEATURES
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-red-300">
          Core Features
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Exploit development and execution</li>
          <li>Payload generation</li>
          <li>Post-exploitation modules</li>
          <li>Auxiliary scanners and fuzzers</li>
          <li>Integration with Nmap and other tools</li>
        </ul>
      </section>

      {/* ===============================
          COMMON COMMANDS
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-red-300">
          Common Metasploit Commands
        </h2>

        <div className="bg-gray-900 rounded-lg p-5 space-y-3 text-sm font-mono text-gray-200">
          {[
            { cmd: "msfconsole", desc: "Launch Metasploit Framework" },
            { cmd: "search exploit windows smb", desc: "Search for exploits" },
            { cmd: "use exploit/windows/smb/ms17_010_eternalblue", desc: "Select exploit module" },
            { cmd: "set RHOSTS target_ip", desc: "Set target address" },
            { cmd: "run", desc: "Execute exploit" },
          ].map((item, index) => (
            <p key={index}>
              <span className="text-red-400">{item.cmd}</span> — {item.desc}
            </p>
          ))}
        </div>
      </section>

      {/* ===============================
          LEGAL WARNING
      =============================== */}
      <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-red-400">
          ⚠ Legal & Ethical Warning
        </h2>

        <p className="text-gray-300 leading-relaxed">
          Metasploit must only be used on systems you own or have explicit
          permission to test. Unauthorized exploitation is illegal and unethical.
        </p>
      </section>

    </div>
  );
}
