import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

/* ===============================
   ANIMATIONS
=============================== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

/* ===============================
   SHARED CARD STYLE
=============================== */
const cardClass = `
  p-6 rounded-xl
  bg-white/5 backdrop-blur-xl
  border border-white/10
  transition-all duration-300
  hover:-translate-y-2
  hover:border-cyan-400/50
  shadow-[0_0_25px_rgba(34,211,238,0.15)]
  hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
`;

/* ===============================
   COMPONENT
=============================== */
export default function Linux() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative px-6 sm:px-10 py-16 max-w-7xl mx-auto text-white"
    >
      {/* ===============================
          BACKGROUND GLOW
      =============================== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 blur-[140px]" />
      </div>

      {/* ===============================
          WHAT IS LINUX
      =============================== */}
      <motion.section variants={fadeUp} className="mb-24">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">
          What is Linux?
        </h1>
        <p className="text-gray-300 max-w-4xl leading-relaxed">
          Linux is a free and open-source operating system based on the Linux
          kernel. It provides users with complete control over hardware,
          software, and system resources. Linux is widely used in servers,
          cloud computing, embedded systems, development environments, and
          cybersecurity labs due to its stability, security, and flexibility.
        </p>
      </motion.section>

      {/* ===============================
          HISTORY OF LINUX
      =============================== */}
      <motion.section variants={fadeUp} className="mb-24">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">
          📜 History of Linux
        </h2>
        <p className="text-gray-300 max-w-4xl leading-relaxed">
          Linux was created in 1991 by Linus Torvalds as a personal project.
          Initially developed as a Unix-like kernel, it quickly grew with
          contributions from developers worldwide. Today, Linux powers most
          servers on the internet, Android devices, supercomputers, and
          enterprise security systems.
        </p>
      </motion.section>

      {/* ===============================
          WHY USE LINUX
      =============================== */}
      <motion.section variants={stagger} className="mb-24">
        <h2 className="text-3xl font-bold mb-10 text-cyan-400">
          ⭐ Why Use Linux?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "🆓 Free & Open Source",
              text: "Linux is free to use and its source code is publicly available for learning and customization.",
            },
            {
              title: "⚡ High Performance",
              text: "Linux runs efficiently on both low-end hardware and enterprise-grade servers.",
            },
            {
              title: "🔐 Strong Security",
              text: "Built-in permission systems and user isolation protect against unauthorized access.",
            },
            {
              title: "🛠 Fully Customizable",
              text: "Users can tailor Linux for desktops, servers, development, or cybersecurity labs.",
            },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className={cardClass}>
              <h3 className="text-cyan-400 font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===============================
          LINUX LEARNING SECTIONS
      =============================== */}
      <motion.section variants={fadeUp} className="mb-24">
        <h2 className="text-3xl font-bold mb-10 text-cyan-400">
          🐧 Linux Learning Sections
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              title: "🏠 Linux Home",
              desc: "Learn how to download, install, and configure Linux safely using virtual machines or dual boot.",
              path: "/linux/home",
            },
            {
              title: "📘 Linux Basics",
              desc: "Understand Linux fundamentals, terminal usage, and essential system commands.",
              path: "/linux/basics",
            },
            {
              title: "📂 Linux Files",
              desc: "Explore Linux file systems, directory hierarchy, permissions, and ownership.",
              path: "/linux/files",
            },
            {
              title: "🌐 Linux Networking",
              desc: "Learn networking concepts, ports, services, and Linux networking tools.",
              path: "/linux/networking",
            },
            {
              title: "🧰 Linux Tools & Commands",
              desc: "Explore Kali Linux & system tools with real-world command usage examples.",
              path: "/linux/toolscmd",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className={cardClass}
            >
              <h3 className="text-cyan-400 font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {item.desc}
              </p>
              <Link
                to={item.path}
                className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium group"
              >
                <span className="group-hover:underline">Learn more</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===============================
          WHY LINUX FOR CYBERSECURITY
      =============================== */}
      <motion.section variants={fadeUp} className="mb-24">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">
          🧑‍💻 Why Linux is Used in Cybersecurity
        </h2>
        <p className="text-gray-300 max-w-4xl leading-relaxed">
          Linux provides deep system access, advanced networking tools, scripting
          capabilities, and native support for penetration testing, forensics,
          and security monitoring tools. Most cybersecurity distributions such
          as Kali Linux are built on Linux because it allows complete system
          transparency and control.
        </p>
      </motion.section>

      {/* ===============================
          FINAL WARNING
      =============================== */}
      <motion.section
        variants={fadeUp}
        className="
          p-6 rounded-2xl
          bg-red-500/10 backdrop-blur-xl
          border border-red-500/30
          shadow-[0_0_40px_rgba(239,68,68,0.35)]
        "
      >
        <h3 className="text-red-400 font-bold text-xl mb-3">
          ⚠️ Educational & Ethical Use Only
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          All Linux and cybersecurity content on{" "}
          <span className="text-red-400 font-semibold">Cyber_World</span> is
          intended strictly for educational and ethical purposes. We do not
          promote illegal hacking, unauthorized access, or cybercrime. Users
          are responsible for complying with all applicable laws and ethical
          guidelines.
        </p>
      </motion.section>
    </motion.div>
  );
}