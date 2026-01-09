import { Link } from "react-router-dom";

/* ===============================
   DATA CONFIG
=============================== */

const features = [
  {
    title: "🐧 Linux",
    text: "Learn Linux fundamentals step by step. Understand commands, file systems, permissions, and real-world usage.",
    path: "/linux",
  },
  {
    title: "🛠️ Cyber Tools",
    text: "Hands-on learning with tools like Nmap, Burp Suite, Metasploit, and Wireshark.",
    path: "/tools",
  },
  {
    title: "⚖️ Cyber Laws",
    text: "Understand cyber crimes, IT Act, digital evidence, and ethical responsibilities.",
    path: "/cyber-laws",
  },
  {
    title: "⛓️ Blockchain",
    text: "Learn blockchain basics, smart contracts, and real-world applications.",
    path: "/blockchain",
  },
  {
    title: "🔐 Cryptography",
    text: "Understand encryption, hashing, AES, RSA, and digital signatures.",
    path: "/cryptography",
  },
  {
    title: "🌐 Platforms",
    text: "Practice on TryHackMe, Hack The Box, and other hands-on labs.",
    path: "/platforms",
  },
];

const roadmap = [
  {
    step: "Step 1",
    title: "Linux & Fundamentals",
    text: "Linux basics, command line, file systems, permissions, networking, and core security concepts.",
    link: { label: "Linux →", path: "/linux" },
  },
  {
    step: "Step 2",
    title: "Cyber Tools & Attacks",
    text: "Explore Nmap, Burp Suite, Metasploit, Wireshark, and real-world attack techniques.",
    link: { label: "Cyber Tools →", path: "/tools" },
  },
  {
    step: "Step 3",
    title: "Cryptography & Blockchain",
    text: "Encryption, hashing, blockchain fundamentals, and hands-on practice.",
    links: [
      { label: "Cryptography →", path: "/cryptography" },
      { label: "Blockchain →", path: "/blockchain" },
    ],
  },
];

/* ===============================
   COMPONENT
=============================== */

export default function Home() {
  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          HERO
      =============================== */}
      <section className="mb-14">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Learn Cybersecurity from Scratch with{" "}
          <span className="text-cyan-400">Cyber World</span>
        </h1>

        <p className="text-gray-300 max-w-2xl leading-relaxed">
          A beginner-friendly learning hub for Linux, cybersecurity,
          cryptography, blockchain, and tools — explained clearly with
          practical examples.
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
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mb-16" />

      {/* ===============================
          FEATURES
      =============================== */}
      <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, index) => (
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

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {item.text}
            </p>

            {item.path && (
              <Link
                to={item.path}
                className="text-sm text-cyan-400 hover:underline"
              >
                Learn more →
              </Link>
            )}
          </div>
        ))}
      </section>

      {/* ===============================
          ROADMAP
      =============================== */}
      <section className="mt-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Learning <span className="text-cyan-400">Roadmap</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {roadmap.map((step, index) => (
            <div
              key={index}
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
                {step.step}
              </span>

              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {step.text}
              </p>

              {step.link && (
                <Link
                  to={step.link.path}
                  className="inline-block text-sm px-4 py-2 rounded-md
                  border border-cyan-400 text-cyan-400
                  hover:bg-cyan-400 hover:text-black transition"
                >
                  {step.link.label}
                </Link>
              )}

              {step.links && (
                <div className="flex gap-4 flex-wrap">
                  {step.links.map((l, i) => (
                    <Link
                      key={i}
                      to={l.path}
                      className="text-sm px-4 py-2 rounded-md
                      border border-cyan-400 text-cyan-400
                      hover:bg-cyan-400 hover:text-black transition"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          FOOTER NOTE
      =============================== */}
      <div className="mt-20 text-center text-gray-500 text-sm">
        Cybersecurity may look complex — but with the right guidance, anyone can learn it.
      </div>
    </div>
  );
}
