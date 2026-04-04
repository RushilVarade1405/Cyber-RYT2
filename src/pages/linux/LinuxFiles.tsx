import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Check,
  FolderTree,
  FileText,
  Lock,
  Terminal,
  Search,
  Shield,
  Zap,
  ExternalLink,
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
   COPY BUTTON COMPONENT
================================ */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20"
      aria-label="Copy command"
    >
      {copied ? (
        <Check size={14} className="text-green-400" />
      ) : (
        <Copy size={14} className="text-gray-400" />
      )}
    </button>
  );
}

/* ===============================
   INFO CARD COMPONENT
================================ */
function InfoCard({
  icon: Icon,
  title,
  desc,
  items,
  color = "cyan",
}: {
  icon: any;
  title: string;
  desc: string;
  items: string[];
  color?: string;
}) {
  const colorClasses = {
    cyan: "text-cyan-400 border-cyan-400/30 shadow-cyan-500/10",
    purple: "text-purple-400 border-purple-400/30 shadow-purple-500/10",
    yellow: "text-yellow-400 border-yellow-400/30 shadow-yellow-500/10",
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -8,
        boxShadow: "0 0 30px rgba(34,211,238,0.35)",
      }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`p-2 rounded-lg bg-white/10 ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        >
          <Icon size={20} />
        </div>
        <h3 className={`text-xl font-semibold ${colorClasses[color as keyof typeof colorClasses]}`}>
          {title}
        </h3>
      </div>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{desc}</p>
      <ul className="text-gray-400 text-sm space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-cyan-400 mt-0.5">•</span>
            <span className="font-mono text-xs">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ===============================
   COMMAND CARD COMPONENT
================================ */
function CommandCard({ cmd, description }: { cmd: string; description: string }) {
  return (
    <div className="group bg-black/40 rounded-xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-200">
      <div className="flex items-center justify-between gap-3 mb-1">
        <code className="text-cyan-300 text-sm font-mono flex-1">{cmd}</code>
        <CopyButton text={cmd} />
      </div>
      <p className="text-gray-400 text-xs">{description}</p>
    </div>
  );
}

/* ===============================
   PRACTICE TASK COMPONENT
================================ */
function PracticeTask({
  taskNum,
  task,
  cmd,
  tip,
}: {
  taskNum: number;
  task: string;
  cmd: string;
  tip?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-green-400/30 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
            {taskNum}
          </span>
          <p className="text-gray-200 font-medium">{task}</p>
        </div>
        <CopyButton text={cmd} />
      </div>
      <pre className="bg-black/50 p-3 rounded-lg text-sm text-green-400 font-mono mb-2 overflow-x-auto">
        {cmd}
      </pre>
      {tip && (
        <p className="text-xs text-gray-400 flex items-start gap-2">
          <Zap size={12} className="text-yellow-400 mt-0.5 flex-shrink-0" />
          {tip}
        </p>
      )}
    </motion.div>
  );
}

/* ===============================
   SECTION HEADER COMPONENT
================================ */
function SectionHeader({
  icon: Icon,
  title,
  color = "cyan",
}: {
  icon: any;
  title: string;
  color?: string;
}) {
  const colorClasses = {
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-lg bg-white/10 ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon size={22} />
      </div>
      <h2 className={`text-2xl font-semibold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {title}
      </h2>
    </div>
  );
}

/* ===============================
   STICKY BACK BUTTON
================================ */
function StickyBackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-24 left-7 z-50"
    >
      <Link
        to="/linux"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                   bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                   backdrop-blur-md border border-cyan-400/30
                   hover:border-cyan-400/50 hover:from-cyan-500/20 
                   hover:to-blue-500/20 text-sm font-medium text-gray-200 
                   transition-all duration-300 shadow-lg shadow-cyan-500/10"
      >
        <ArrowLeft size={16} />
        Back to Linux
      </Link>
    </motion.div>
  );
}

/* ===============================
   QUICK REFERENCE CARD
================================ */
function QuickReferenceCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
                 border border-cyan-400/30 rounded-2xl p-6 mb-10"
    >
      <div className="flex items-start gap-3 mb-4">
        <Terminal size={24} className="text-cyan-400 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-1">
            Quick Reference
          </h3>
          <p className="text-sm text-gray-300">
            Hover over any command to reveal the copy button. Click to copy to
            your clipboard instantly.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <span className="text-cyan-400">•</span>
          All paths are case-sensitive
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <span className="text-cyan-400">•</span>
          Use Tab for auto-completion
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <span className="text-cyan-400">•</span>
          ~ represents home directory
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <span className="text-cyan-400">•</span>
          Use --help for command info
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   PAGE
================================ */
export default function LinuxFiles() {
  return (
    <>
      <StickyBackButton />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="px-10 py-10 max-w-6xl mx-auto text-white"
      >
        {/* ================= HEADER ================= */}
        <motion.div variants={fadeUp} className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
            🐧 Linux File System
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Linux treats everything as a file — directories, devices, processes,
            and configuration files. Understanding the filesystem is essential
            for system administration, cybersecurity, and ethical hacking.
          </p>
        </motion.div>

        {/* Quick Reference */}
        <QuickReferenceCard />

        {/* ================= INFO CARDS ================= */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <InfoCard
            icon={FolderTree}
            title="Directory Structure"
            desc="Linux uses a single-root hierarchical filesystem starting at (/)."
            items={[
              "/home → User files",
              "/etc → Configuration files",
              "/bin → Essential binaries",
              "/var → Logs & variable data",
              "/tmp → Temporary files",
            ]}
            color="cyan"
          />

          <InfoCard
            icon={FileText}
            title="File Types"
            desc="Each file has a type that defines its purpose."
            items={[
              "- Regular file",
              "d Directory",
              "l Symbolic link",
              "b/c Block & Character devices",
              "s Socket / p Pipe",
            ]}
            color="purple"
          />

          <InfoCard
            icon={Lock}
            title="Permissions & Ownership"
            desc="Permissions decide access for user, group, and others."
            items={[
              "r → read (4)",
              "w → write (2)",
              "x → execute (1)",
              "ugo → user/group/others",
            ]}
            color="yellow"
          />
        </section>

        {/* ================= FILE COMMANDS ================= */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader icon={Terminal} title="File & Directory Commands" />

          <div className="grid md:grid-cols-2 gap-4">
            <CommandCard
              cmd="ls -la"
              description="list all files with permissions"
            />
            <CommandCard cmd="cd /path" description="change directory" />
            <CommandCard cmd="pwd" description="show current directory" />
            <CommandCard cmd="touch file.txt" description="create file" />
            <CommandCard cmd="mkdir dir" description="create directory" />
            <CommandCard cmd="rm file" description="delete file" />
            <CommandCard cmd="rm -r dir" description="delete directory" />
            <CommandCard cmd="cp file1 file2" description="copy file" />
            <CommandCard cmd="mv old new" description="rename/move file" />
            <CommandCard cmd="stat file" description="detailed file info" />
          </div>
        </motion.section>

        {/* ================= VIEW & SEARCH ================= */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader
            icon={Search}
            title="Viewing & Searching Files"
            color="purple"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <CommandCard cmd="cat file" description="view file content" />
            <CommandCard cmd="less file" description="scroll through file" />
            <CommandCard cmd="head file" description="first 10 lines" />
            <CommandCard
              cmd="tail -f file"
              description="live log monitoring"
            />
            <CommandCard
              cmd="find / -name file.txt"
              description="search file"
            />
            <CommandCard
              cmd="grep 'text' file"
              description="search inside file"
            />
          </div>
        </motion.section>

        {/* ================= PERMISSIONS ================= */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader
            icon={Shield}
            title="Permissions & Ownership Commands"
            color="yellow"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <CommandCard
              cmd="chmod 755 file"
              description="numeric permissions (rwxr-xr-x)"
            />
            <CommandCard
              cmd="chmod u+x file"
              description="symbolic permissions (add execute)"
            />
            <CommandCard cmd="chown user file" description="change owner" />
            <CommandCard
              cmd="chown user:group file"
              description="change owner & group"
            />
            <CommandCard cmd="id" description="show user identity" />
            <CommandCard
              cmd="umask"
              description="default permission mask"
            />
          </div>
        </motion.section>

        {/* ================= BEGINNER TASKS ================= */}
        <motion.section variants={fadeUp}>
          <SectionHeader
            icon={Zap}
            title="Hands-On Practice Tasks"
            color="green"
          />

          <div className="space-y-4">
            <PracticeTask
              taskNum={1}
              task="Create project directory"
              cmd="mkdir ~/linux_lab"
              tip="~ is shorthand for your home directory"
            />
            <PracticeTask
              taskNum={2}
              task="Create multiple files at once"
              cmd="touch ~/linux_lab/a.txt ~/linux_lab/b.txt"
              tip="You can create multiple files in one command"
            />
            <PracticeTask
              taskNum={3}
              task="Set file permissions"
              cmd="chmod 644 ~/linux_lab/a.txt"
              tip="644 = rw-r--r-- (owner can read/write, others can read)"
            />
            <PracticeTask
              taskNum={4}
              task="Search for text in system file"
              cmd="grep 'root' /etc/passwd"
              tip="grep searches for patterns in files"
            />
            <PracticeTask
              taskNum={5}
              task="Monitor system logs in real-time"
              cmd="sudo tail -f /var/log/syslog"
              tip="Press Ctrl+C to stop monitoring"
            />
          </div>
        </motion.section>

        {/* ================= FOOTER TIP ================= */}
        <motion.div
          variants={fadeUp}
          className="mt-12 p-5 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-start gap-3">
            <ExternalLink size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-cyan-300 font-semibold mb-1">
                Want to Learn More?
              </h4>
              <p className="text-sm text-gray-400">
                Practice these commands in your Kali Linux VM. Use{" "}
                <code className="text-cyan-400 bg-black/50 px-1.5 py-0.5 rounded">
                  man command
                </code>{" "}
                to read the manual pages for any command (e.g.,{" "}
                <code className="text-cyan-400 bg-black/50 px-1.5 py-0.5 rounded">
                  man ls
                </code>
                ).
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}