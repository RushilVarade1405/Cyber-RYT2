import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

/* ===============================
   ANIMATIONS
================================ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ✅ TS-safe easing
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

/* ===============================
   PAGE
================================ */
export default function LinuxFiles() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="px-10 py-10 max-w-6xl mx-auto text-white"
    >
      {/* ================= BACK LINK ================= */}
      <motion.div variants={fadeUp} className="mb-6">
        <Link
          to="/linux"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
        >
          ← Back to Linux
        </Link>
      </motion.div>

      {/* ================= HEADER ================= */}
      <motion.h1 variants={fadeUp} className="text-3xl font-bold mb-4">
        🐧 Linux File System
      </motion.h1>

      <motion.p variants={fadeUp} className="text-gray-300 mb-10">
        Understand how Linux organizes files, manages permissions, and controls access.
      </motion.p>

      {/* ================= INFO CARDS ================= */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          {
            title: "📁 Directory Structure",
            desc: "Linux follows a hierarchical filesystem starting from root (/).",
            items: ["/home", "/etc", "/bin", "/var", "/tmp"],
          },
          {
            title: "📄 File Types",
            desc: "Different file types exist for different system purposes.",
            items: ["Regular (-)", "Directory (d)", "Symlink (l)", "Device (b/c)"],
          },
          {
            title: "🔐 Permissions",
            desc: "Permissions define who can read, write, or execute files.",
            items: ["Read (r)", "Write (w)", "Execute (x)"],
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{
              y: -8,
              boxShadow: "0 0 30px rgba(34,211,238,0.35)",
            }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-300 mb-3">{card.desc}</p>
            <ul className="text-gray-400 text-sm space-y-1">
              {card.items.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      {/* ================= COMMANDS ================= */}
      <motion.section variants={fadeUp} className="mb-16">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
          🛠️ Essential File Commands
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "ls – list files",
            "cd – change directory",
            "pwd – show current path",
            "cp – copy files",
            "mv – move / rename",
            "rm – delete files",
          ].map((cmd, i) => (
            <div
              key={i}
              className="bg-black/40 rounded-xl p-4 text-gray-300 border border-white/10"
            >
              {cmd}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ================= BEGINNER TASKS ================= */}
      <motion.section variants={fadeUp}>
        <h2 className="text-2xl font-semibold text-green-400 mb-4">
          🧪 Beginner Practice Tasks
        </h2>

        <div className="space-y-4">
          {[
            { task: "Go to home directory", cmd: "cd ~" },
            { task: "Create a folder", cmd: "mkdir linux_practice" },
            { task: "Create a file", cmd: "touch linux_practice/test.txt" },
            { task: "Check permissions", cmd: "ls -l linux_practice" },
            { task: "Make file executable", cmd: "chmod +x test.txt" },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <p className="text-gray-200 mb-2">
                <b>Task {i + 1}:</b> {t.task}
              </p>
              <pre className="bg-black/50 p-3 rounded text-sm text-green-400">
                {t.cmd}
              </pre>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
