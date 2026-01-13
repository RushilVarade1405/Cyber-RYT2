import { motion, type Variants } from "framer-motion";
import {
  Terminal,
  Folder,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

/* ===============================
   ANIMATIONS
================================ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ===============================
   CORE CONCEPTS
================================ */
const coreConcepts = [
  {
    icon: Terminal,
    title: "Terminal",
    desc: "The command-line interface used to interact directly with the Linux system.",
  },
  {
    icon: Folder,
    title: "Directory Structure",
    desc: "Linux follows a hierarchical file system starting from the root (/).",
  },
  {
    icon: ShieldCheck,
    title: "Permissions",
    desc: "Controls who can read, write, or execute files and directories.",
  },
  {
    icon: Cpu,
    title: "Kernel",
    desc: "The core of Linux that manages hardware, memory, and processes.",
  },
];

/* ===============================
   COMMANDS (MAX + CATEGORIZED)
================================ */
const commandCategories = [
  {
    category: "📁 File & Directory",
    commands: [
      ["ls", "List files and directories"],
      ["cd", "Change directory"],
      ["pwd", "Show current path"],
      ["mkdir", "Create directory"],
      ["rmdir", "Delete empty directory"],
      ["touch", "Create empty file"],
      ["rm -rf", "Delete files/directories"],
      ["cp -r", "Copy files/directories"],
      ["mv", "Move or rename files"],
      ["tree", "Directory tree view"],
    ],
  },
  {
    category: "🔐 Permissions & Ownership",
    commands: [
      ["chmod", "Change file permissions"],
      ["chown", "Change file owner"],
      ["chgrp", "Change group"],
      ["umask", "Default permissions"],
      ["getfacl", "View ACL permissions"],
      ["setfacl", "Set ACL permissions"],
    ],
  },
  {
    category: "⚙ System & Hardware",
    commands: [
      ["uname -a", "System info"],
      ["hostnamectl", "Host info"],
      ["uptime", "System running time"],
      ["free -h", "RAM usage"],
      ["df -h", "Disk usage"],
      ["du -sh", "Folder size"],
      ["lsblk", "Block devices"],
      ["mount", "Mount filesystem"],
      ["dmesg", "Kernel messages"],
    ],
  },
  {
    category: "🧠 Process Management",
    commands: [
      ["ps aux", "List processes"],
      ["top", "Live process view"],
      ["htop", "Advanced process viewer"],
      ["kill", "Kill process"],
      ["killall", "Kill by name"],
      ["bg", "Background job"],
      ["fg", "Foreground job"],
      ["jobs", "List jobs"],
      ["nice", "Set priority"],
      ["renice", "Change priority"],
    ],
  },
  {
    category: "🌐 Networking",
    commands: [
      ["ip a", "IP addresses"],
      ["ip r", "Routing table"],
      ["ping", "Check connectivity"],
      ["ss -tuln", "Socket stats"],
      ["netstat -tuln", "Ports list"],
      ["curl", "Fetch URL data"],
      ["wget", "Download files"],
      ["nmap", "Network scanner"],
      ["traceroute", "Trace route"],
    ],
  },
  {
    category: "🔍 Search & Text",
    commands: [
      ["grep", "Search text"],
      ["grep -r", "Recursive search"],
      ["find", "Search files"],
      ["locate", "Fast search"],
      ["cat", "View file"],
      ["less", "Paged view"],
      ["head", "File start"],
      ["tail -f", "Live file logs"],
      ["awk", "Text processing"],
      ["sed", "Stream editor"],
    ],
  },
  {
    category: "📦 Package Management (Debian)",
    commands: [
      ["apt update", "Update package list"],
      ["apt upgrade", "Upgrade system"],
      ["apt install", "Install package"],
      ["apt remove", "Remove package"],
      ["apt purge", "Remove config files"],
      ["apt autoremove", "Remove unused"],
      ["dpkg -i", "Install .deb file"],
    ],
  },
];

/* ===============================
   COMPONENT
================================ */
export default function LinuxBasics() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto text-white">
      {/* ================= BACK BUTTON ================= */}
      <motion.button
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        onClick={() => window.history.back()}
        className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-xl
                   bg-white/5 border border-white/10
                   text-cyan-400 hover:bg-cyan-500/10
                   hover:border-cyan-400/40 transition"
      >
        ← Back to Linux
      </motion.button>

      {/* ================= CORE CONCEPTS ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <h2 className="text-3xl font-semibold text-cyan-400 mb-8">
          📘 Core Linux Concepts
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreConcepts.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{
                y: -8,
                boxShadow: "0 0 35px rgba(34,211,238,0.25)",
              }}
              className="rounded-2xl p-6 bg-white/5 border border-white/10"
            >
              <c.icon className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= COMMANDS ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-14"
      >
        {commandCategories.map((section, idx) => (
          <motion.div key={idx} variants={fadeUp}>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
              {section.category}
            </h2>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full">
                <thead className="bg-white/10">
                  <tr>
                    <th className="p-4 text-left">Command</th>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-center">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {section.commands.map(([cmd, desc], i) => (
                    <tr
                      key={i}
                      className="border-t border-white/10 hover:bg-white/5"
                    >
                      <td className="p-4 font-mono text-cyan-400">{cmd}</td>
                      <td className="p-4 text-gray-300">{desc}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => copyCmd(cmd)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 transition"
                        >
                          {copied === cmd ? (
                            <Check size={18} className="text-green-400" />
                          ) : (
                            <Copy size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}