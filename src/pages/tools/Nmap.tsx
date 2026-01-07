import { Link } from "react-router-dom";

export default function Nmap() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* BACK LINK */}
      <Link
        to="/tools"
        className="inline-block mb-6 text-cyan-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-6 text-cyan-400">
        Nmap (Network Mapper)
      </h1>

      {/* SKILL LEVEL & TAGS */}
      <div className="flex flex-wrap gap-3 mb-10">
        <span className="px-4 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/40">
          Beginner Friendly
        </span>
        <span className="px-4 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
          Intermediate
        </span>
        <span className="px-4 py-1 rounded-full text-sm bg-red-500/20 text-red-400 border border-red-500/40">
          Advanced
        </span>
        <span className="px-4 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
          Network Scanning
        </span>
      </div>

      {/* WHAT IS NMAP */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          What is Nmap?
        </h2>
        <p className="text-gray-300 leading-relaxed">
          <strong>Nmap (Network Mapper)</strong> is a powerful, open-source
          network scanning and reconnaissance tool used to discover hosts,
          services, and security weaknesses within a network.
        </p>
        <p className="text-gray-300 mt-4 leading-relaxed">
          It is widely used by ethical hackers, penetration testers,
          system administrators, SOC analysts, and cybersecurity students.
        </p>
      </section>

      {/* HOW NMAP IS USED */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          How Nmap is Used
        </h2>
        <ol className="list-decimal ml-6 space-y-2 text-gray-300">
          <li>Identify the target IP or network range</li>
          <li>Discover live hosts</li>
          <li>Scan open TCP and UDP ports</li>
          <li>Detect running services and versions</li>
          <li>Identify operating systems</li>
          <li>Run NSE scripts</li>
          <li>Analyze results</li>
        </ol>
      </section>

      {/* NMAP USED IN LINUX */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Why Nmap Shines on Linux 🚀
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          <li>Supports raw packet manipulation</li>
          <li>Root access enables advanced scans</li>
          <li>Pre-installed in Kali & Parrot OS</li>
          <li>Integrates with Metasploit & Wireshark</li>
        </ul>
      </section>

       <div className="px-10 py-16 max-w-5xl mx-auto text-white">

        
      {/* EXPLANATION TABLE (IMAGE 1 COMMANDS EXPLAINED LIKE IMAGE 2) */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-300">
          Explanation of Nmap Commands (Beginner to Advanced)
        </h2>

        <div className="overflow-x-auto rounded-xl border border-cyan-500/30">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-[#020617] text-cyan-400">
              <tr>
                <th className="px-4 py-3">Command</th>
                <th className="px-4 py-3">What It Does</th>
                <th className="px-4 py-3">Example</th>
              </tr>
            </thead>

            <tbody className="bg-[#020617]/60">

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap target</td>
                <td className="px-4 py-3">
                  Performs a default scan of the most common 1000 TCP ports.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  nmap 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -sn target</td>
                <td className="px-4 py-3">
                  Performs host discovery only and skips port scanning.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  nmap -sn 192.168.1.0/24
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -p 1-1000 target</td>
                <td className="px-4 py-3">
                  Scans only the specified port range instead of all ports.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  nmap -p 1-1000 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -sS target</td>
                <td className="px-4 py-3">
                  Sends TCP SYN packets without completing the handshake
                  (stealth scan).
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  sudo nmap -sS 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -sT target</td>
                <td className="px-4 py-3">
                  Performs a full TCP connection scan without requiring root.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  nmap -sT 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -sU target</td>
                <td className="px-4 py-3">
                  Scans UDP ports which are usually slower and filtered.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  sudo nmap -sU 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -sV target</td>
                <td className="px-4 py-3">
                  Detects the exact service and version running on open ports.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  nmap -sV 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -O target</td>
                <td className="px-4 py-3">
                  Attempts to identify the operating system of the target.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  sudo nmap -O 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -A target</td>
                <td className="px-4 py-3">
                  Enables OS detection, version detection, NSE scripts,
                  and traceroute in one scan.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  sudo nmap -A 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap --script default target</td>
                <td className="px-4 py-3">
                  Runs default Nmap Scripting Engine (NSE) scripts.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  nmap --script default 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap --script vuln target</td>
                <td className="px-4 py-3">
                  Executes vulnerability detection scripts.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  nmap --script vuln 192.168.1.1
                </td>
              </tr>

              <tr className="border-t border-cyan-500/20">
                <td className="px-4 py-3 text-cyan-300">nmap -oA scan target</td>
                <td className="px-4 py-3">
                  Saves scan output in normal, XML, and grepable formats.
                </td>
                <td className="px-4 py-3 text-yellow-300">
                  nmap -oA scan 192.168.1.1
                </td>
              </tr>

            </tbody>
          </table>
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
    Nmap should be used <strong>only on systems you own or have
    explicit permission to test</strong>. Unauthorized network
    scanning, reconnaissance, or probing of systems without
    consent may be illegal and can result in serious legal
    consequences.
  </p>
</section>
    </div>
    </div>
  );
}
