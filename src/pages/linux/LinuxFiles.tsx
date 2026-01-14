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
      ease: [0.16, 1, 0.3, 1],
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
        Linux treats everything as a file — directories, devices, processes, and
        configuration files. Understanding the filesystem is essential for
        system administration, cybersecurity, and ethical hacking.
      </motion.p>

      {/* ================= INFO CARDS ================= */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          {
            title: "📁 Directory Structure",
            desc: "Linux uses a single-root hierarchical filesystem starting at (/).",
            items: [
              "/home → User files",
              "/etc → Configuration files",
              "/bin → Essential binaries",
              "/var → Logs & variable data",
              "/tmp → Temporary files",
            ],
          },
          {
            title: "📄 File Types",
            desc: "Each file has a type that defines its purpose.",
            items: [
              "- Regular file",
              "d Directory",
              "l Symbolic link",
              "b/c Block & Character devices",
              "s Socket / p Pipe",
            ],
          },
          {
            title: "🔐 Permissions & Ownership",
            desc: "Permissions decide access for user, group, and others.",
            items: [
              "r → read",
              "w → write",
              "x → execute",
              "ugo → user/group/others",
            ],
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

      {/* ================= FILE COMMANDS ================= */}
      <motion.section variants={fadeUp} className="mb-16">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
          🛠️ File & Directory Commands
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "ls -la → list all files with permissions",
            "cd /path → change directory",
            "pwd → show current directory",
            "touch file.txt → create file",
            "mkdir dir → create directory",
            "rm file → delete file",
            "rm -r dir → delete directory",
            "cp file1 file2 → copy file",
            "mv old new → rename/move file",
            "stat file → detailed file info",
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

      {/* ================= VIEW & SEARCH ================= */}
      <motion.section variants={fadeUp} className="mb-16">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">
          🔍 Viewing & Searching Files
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "cat file → view file content",
            "less file → scroll through file",
            "head file → first 10 lines",
            "tail -f file → live log monitoring",
            "find / -name file.txt → search file",
            "grep 'text' file → search inside file",
          ].map((cmd, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-4 text-gray-300 border border-white/10"
            >
              {cmd}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ================= PERMISSIONS ================= */}
      <motion.section variants={fadeUp} className="mb-16">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
          🔐 Permissions & Ownership Commands
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "chmod 755 file → numeric permissions",
            "chmod u+x file → symbolic permissions",
            "chown user file → change owner",
            "chown user:group file → change owner & group",
            "id → show user identity",
            "umask → default permission mask",
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
          🧪 Hands-On Practice Tasks
        </h2>

        <div className="space-y-4">
          {[
            { task: "Create project directory", cmd: "mkdir ~/linux_lab" },
            { task: "Create files", cmd: "touch ~/linux_lab/a.txt b.txt" },
            { task: "Set permissions", cmd: "chmod 644 a.txt" },
            { task: "Search text", cmd: "grep 'root' /etc/passwd" },
            { task: "Monitor logs", cmd: "tail -f /var/log/syslog" },
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