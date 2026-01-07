import { Link } from "react-router-dom";

export default function Hashcat() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">


      {/* ===============================
          BACK TO TOOLS LINK
      =============================== */}
      <Link
        to="/tools"
        className="inline-block mb-8 text-cyan-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-cyan-400">
        Hashcat (Advanced Password Recovery Tool)
      </h1>

      {/* ===============================
          BADGES & ICONS
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-12">
        <span className="px-3 py-1 text-sm rounded-full bg-green-600/20 text-green-400 border border-green-500/30">
          Intermediate
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
          Advanced
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30">
          Password Cracking
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
          GPU Accelerated
        </span>
      </div>

      {/* ===============================
          WHAT IS HASHCAT
      =============================== */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-5 text-cyan-300">
          What is Hashcat?
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          <strong>Hashcat</strong> is one of the world’s fastest and most advanced
          <strong> password recovery tools</strong> used to audit password strength.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          It performs <strong>offline hash cracking</strong>, meaning it works on
          extracted hashes instead of attacking live systems.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          Hashcat is highly optimized for <strong>GPU acceleration</strong> using
          CUDA and OpenCL, allowing billions of guesses per second.
        </p>

        <p className="text-gray-300 leading-relaxed">
          It is widely used by <strong>ethical hackers, penetration testers,
          and forensic experts</strong>.
        </p>
      </section>

      {/* ===============================
          WHAT HASHCAT DOES
      =============================== */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-5 text-cyan-300">
          What Hashcat Does
        </h2>

        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-4">
          <li>
            <strong>Offline password cracking</strong> without triggering account locks
          </li>
          <li>
            <strong>GPU & CPU acceleration</strong> for extreme speed
          </li>
          <li>
            <strong>Multiple attack techniques</strong> (dictionary, brute force, hybrid)
          </li>
          <li>
            <strong>Pause & resume</strong> long cracking sessions
          </li>
        </ul>
      </section>

      {/* ===============================
          SUPPORTED HASH TYPES
      =============================== */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-5 text-cyan-300">
          Supported Hash Types
        </h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800 text-cyan-300">
              <tr>
                <th className="px-4 py-3 border border-gray-700">Hash Type</th>
                <th className="px-4 py-3 border border-gray-700">Usage</th>
                <th className="px-4 py-3 border border-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td className="px-4 py-3 border border-gray-700 font-mono">MD5</td>
                <td className="px-4 py-3 border border-gray-700">Legacy systems</td>
                <td className="px-4 py-3 border border-gray-700">
                  Cryptographically broken
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===============================
          COMMON HASHCAT COMMANDS
      =============================== */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-5 text-cyan-300">
          Common Hashcat Commands
        </h2>

        <pre className="bg-black/40 p-5 rounded-xl text-gray-300 text-sm overflow-x-auto">
{`hashcat -m 0 -a 0 hashes.txt wordlist.txt
hashcat -m 0 -a 3 hashes.txt ?a?a?a?a
hashcat --show hashes.txt`}
        </pre>
      </section>

      {/* ===============================
          IMPORTANT NOTE
      =============================== */}
      <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 sm:p-7">
        <h2 className="text-xl font-semibold mb-3 text-red-400">
          ⚠ Legal & Ethical Warning
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Use Hashcat <strong>only on systems you own or have explicit permission to test</strong>.
          Unauthorized use is illegal.
        </p>
      </section>

    </div>
  );
}