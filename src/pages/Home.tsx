import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          HERO SECTION
      =============================== */}
      <div className="mb-14">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Learn Cybersecurity from Scratch with{" "}
          <span className="text-cyan-400">Cyber World</span>
        </h1>

        <p className="text-gray-300 max-w-2xl leading-relaxed">
          A beginner-friendly learning hub to understand Linux, cybersecurity,
          cryptography, blockchain, and tools — explained simply and clearly.
          No prior experience needed.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap">
          <Link
            to="/start"
            className="px-5 py-2 rounded-lg border border-cyan-400
            text-cyan-400 hover:bg-cyan-400 hover:text-black
            transition font-medium"
          >
            Start Learning Free →
          </Link>

          <Link
            to="/about"
            className="px-5 py-2 rounded-lg border border-cyan-500/30
            text-gray-300 hover:border-cyan-400 transition"
          >
            Why this project?
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          Beginner-friendly • Student focused • Practical learning
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mb-16" />

      {/* ===============================
          LEARNING SECTIONS
      =============================== */}
      
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "🐧 Linux",
            text: "Learn Linux fundamentals step by step. Understand essential commands, file systems, permissions, and how Linux is used in real-world environments.",
            path: "/linux",
          },
          {
            title: "🛠️ Cyber Tools",
            text: "Get hands-on knowledge of popular cybersecurity tools such as Nmap, Burp Suite, Metasploit, and Wireshark, explained in an easy-to-follow way.",
            path: "/tools",
          },
          {
            title: "⚖️ Cyber Laws",
            text: "Understand cyber crimes, the IT Act, digital evidence, and ethical practices to build a strong foundation in cyber law and compliance.",
          },
          {
            title: "⛓️ Blockchain",
            text: "Learn the basics of blockchain technology, including how it works, smart contracts, and real-world platforms.",
          },
          {
            title: "🔐 Cryptography",
            text: "Explore the fundamentals of cryptography, including encryption, hashing, AES, RSA, and digital signatures, explained clearly for beginners.",
          },
          {
            title: "🌐 Platforms",
            text: "Practice your skills on popular learning platforms such as TryHackMe, Hack The Box, and other hands-on labs.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
            border border-cyan-500/20 rounded-2xl p-6
            transition hover:-translate-y-1
            hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
          >
            <h3 className="text-xl text-cyan-400 font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* ===============================
    ROADMAP SECTION
=============================== */}
<div className="mt-24">
  <h2 className="text-3xl font-bold mb-12 text-center">
    Learning <span className="text-cyan-400">Roadmap</span>
  </h2>

  <div className="grid gap-8 md:grid-cols-3">

    {/* STEP 1 */}
    <div
      className="group p-6 rounded-2xl
      bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
      border border-cyan-500/20
      transition-all duration-300
      hover:-translate-y-2
      hover:border-cyan-400
      hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
    >
      <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold
        rounded-full bg-cyan-500/20 text-cyan-400
        border border-cyan-400/30">
        Step 1
      </span>

      <h3 className="text-xl font-semibold text-white mb-2">
        Linux & Fundamentals
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Learn Linux basics, command line, file systems, permissions,
        networking basics, and core security concepts.
      </p>

      <Link
        to="/linux"
        className="inline-block text-sm px-4 py-2 rounded-md
        border border-cyan-400 text-cyan-400
        hover:bg-cyan-400 hover:text-black transition"
      >
        Linux →
      </Link>
    </div>

    {/* STEP 2 */}
    <div
      className="group p-6 rounded-2xl
      bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
      border border-cyan-500/20
      transition-all duration-300
      hover:-translate-y-2
      hover:border-cyan-400
      hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
    >
      <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold
        rounded-full bg-cyan-500/20 text-cyan-400
        border border-cyan-400/30">
        Step 2
      </span>

      <h3 className="text-xl font-semibold text-white mb-2">
        Cyber Tools & Attacks
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Explore Nmap, Burp Suite, Metasploit, Wireshark and
        understand real-world attack techniques.
      </p>

      <Link
        to="/tools"
        className="inline-block text-sm px-4 py-2 rounded-md
        border border-cyan-400 text-cyan-400
        hover:bg-cyan-400 hover:text-black transition"
      >
        Cyber Tools →
      </Link>
    </div>

    {/* STEP 3 */}
    <div
      className="group p-6 rounded-2xl
      bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
      border border-cyan-500/20
      transition-all duration-300
      hover:-translate-y-2
      hover:border-cyan-400
      hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
    >
      <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold
        rounded-full bg-cyan-500/20 text-cyan-400
        border border-cyan-400/30">
        Step 3
      </span>

      <h3 className="text-xl font-semibold text-white mb-3">
        Cryptography & Blockchain
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Learn encryption, hashing, blockchain fundamentals and
        practice on real platforms.
      </p>

      <div className="flex gap-4 flex-wrap">
        <Link
          to="/cryptography"
          className="text-sm px-4 py-2 rounded-md
          border border-cyan-400 text-cyan-400
          hover:bg-cyan-400 hover:text-black transition"
        >
          Cryptography →
        </Link>

        <Link
          to="/blockchain"
          className="text-sm px-4 py-2 rounded-md
          border border-cyan-400 text-cyan-400
          hover:bg-cyan-400 hover:text-black transition"
        >
          Blockchain →
        </Link>
      </div>
    </div>

  </div>
</div>

      {/* ===============================
          FOOTER NOTE
      =============================== */}
      <div className="mt-20 text-center text-gray-500 text-sm">
        Cybersecurity may look complex — but with the right guidance, anyone can learn it.
      </div>

    </div>
  );
}
