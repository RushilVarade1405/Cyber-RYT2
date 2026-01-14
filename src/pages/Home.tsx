import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

/* ===============================
   ANIMATION VARIANTS
=============================== */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ===============================
   DATA
=============================== */

const features = [
  {
    title: "🐧 Linux Foundations",
    text: "Master Linux from scratch: terminal usage, directory structure, permissions, users, processes, networking, and real-world commands used by security professionals.",
    path: "/linux",
  },
  {
    title: "🛠️ Cybersecurity Tools",
    text: "Hands-on exploration of industry-standard tools like Nmap, Burp Suite, Metasploit, Wireshark, Nikto, and more with explanations and use-cases.",
    path: "/tools",
  },
  {
    title: "⚖️ Cyber Laws & Ethics",
    text: "Learn cyber crimes, IT Act, digital evidence, ethical hacking boundaries, and legal responsibilities every cybersecurity student must know.",
    path: "/cyber-laws",
  },
  {
    title: "🔐 Cryptography",
    text: "Understand encryption, hashing, AES, RSA, digital signatures, certificates, and how cryptography protects modern systems.",
    path: "/cryptography",
  },
  {
    title: "⛓️ Blockchain",
    text: "Learn blockchain fundamentals, consensus mechanisms, smart contracts, wallets, and real-world applications beyond cryptocurrency.",
    path: "/blockchain",
  },
  {
    title: "🌐 Practice Platforms",
    text: "Guided learning paths for TryHackMe, Hack The Box, labs, and platforms to apply theory into real hands-on cybersecurity practice.",
    path: "/platforms",
  },
];

const roadmap = [
  {
    step: "Phase 1",
    title: "Foundations & Linux",
    text: "Build a strong base by learning Linux, terminal commands, file systems, permissions, users, networking basics, and how operating systems work.",
    link: { label: "Start with Linux →", path: "/linux" },
  },
  {
    step: "Phase 2",
    title: "Security Tools & Techniques",
    text: "Move into cybersecurity tools, scanning, enumeration, vulnerabilities, traffic analysis, and understanding how attacks actually work.",
    link: { label: "Explore Tools →", path: "/tools" },
  },
  {
    step: "Phase 3",
    title: "Advanced Concepts",
    text: "Dive into cryptography, blockchain, cyber laws, and ethical responsibilities to become a well-rounded cybersecurity learner.",
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      className="relative px-6 sm:px-10 py-20 max-w-7xl mx-auto text-white"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-10 w-96 h-96 bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 blur-[140px]" />
      </div>

      {/* ===============================
          HERO
      =============================== */}
      <motion.section variants={fadeUp} className="mb-24">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Learn Cybersecurity from Scratch with{" "}
          <span className="text-cyan-400">Cyber World</span>
        </h1>

        <p className="text-gray-300 max-w-3xl leading-relaxed">
          Cyber World is a beginner-first learning platform designed to help
          students understand cybersecurity concepts clearly — from Linux and
          tools to cryptography, blockchain, and cyber laws — without confusion
          or unnecessary complexity.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap">
          <Link
            to="/start"
            className="px-6 py-2.5 rounded-lg bg-cyan-400 text-black font-medium hover:bg-cyan-300 transition"
          >
            Start Learning Free →
          </Link>

          <Link
            to="/about"
            className="px-6 py-2.5 rounded-lg border border-white/20 text-gray-300 bg-white/5 hover:border-cyan-400 transition"
          >
            Why Cyber World?
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          Beginner-friendly • No prior experience required • Practical approach
        </p>
      </motion.section>

      {/* ===============================
          WHO IS THIS FOR
      =============================== */}
      <motion.section variants={fadeUp} className="mb-24 max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">
          Who is this platform for?
        </h2>

        <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
          <li>• Students starting their journey in cybersecurity</li>
          <li>• Beginners confused by complex tutorials and jargon</li>
          <li>• Diploma, engineering, and IT students</li>
          <li>• Anyone who wants a structured and clear learning path</li>
        </ul>
      </motion.section>

      {/* ===============================
          FEATURES
      =============================== */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="
              p-6 rounded-2xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              hover:border-cyan-400/50
              transition
            "
          >
            <h3 className="text-xl text-cyan-400 font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {item.text}
            </p>

            <Link
              to={item.path}
              className="text-sm text-cyan-400 hover:underline"
            >
              Learn more →
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* ===============================
          ROADMAP
      =============================== */}
      <section className="mt-32">
        <h2 className="text-3xl font-bold mb-16 text-center">
          Learning <span className="text-cyan-400">Roadmap</span>
        </h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {roadmap.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="
                p-6 rounded-2xl
                bg-white/5 backdrop-blur-xl
                border border-white/10
                hover:border-cyan-400/50
                transition
              "
            >
              <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
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
                  className="text-sm px-4 py-2 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
                >
                  {step.link.label}
                </Link>
              )}

              {step.links && (
                <div className="flex gap-3 flex-wrap">
                  {step.links.map((l, i) => (
                    <Link
                      key={i}
                      to={l.path}
                      className="text-sm px-4 py-2 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===============================
          FOOTER NOTE
      =============================== */}
      <div className="mt-28 text-center text-gray-500 text-sm max-w-3xl mx-auto">
        Cybersecurity may look complex at first — but with a clear roadmap,
        practical explanations, and consistent learning, anyone can master it.
      </div>
    </motion.div>
  );
}
