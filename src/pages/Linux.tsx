import { linuxCommands, LinuxCommand } from "../data/linux";
import { Link } from "react-router-dom";


/* ===============================
   TYPES & DATA
=============================== */
type InfoCard = {
  title: string;
  text: string;
};

const linuxInfoCards: InfoCard[] = [
  {
    title: "🐧 Open Source",
    text: "Linux is free and open-source, which means anyone can view, study, and improve its code. This makes Linux transparent, flexible, and trusted worldwide.",
  },
  {
    title: "🧠 Kernel-Based",
    text: "The Linux kernel is the core part of the system. It controls hardware, manages memory and processes, and ensures the operating system runs smoothly.",
  },
  {
    title: "🛡️ Secure",
    text: "Linux is designed with strong security features such as user permissions and process isolation, helping protect systems from unauthorized access.",
  },
  {
    title: "⚙️ Terminal Power",
    text: "Linux provides powerful command-line tools that allow users to perform tasks quickly, automate operations, and manage systems with precision.",
  },
];

/* ===============================
   SHARED GLASS CARD STYLE
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
  const groupedCommands = linuxCommands.reduce<Record<string, LinuxCommand[]>>(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {}
  );

  return (
    <div className="relative px-6 sm:px-10 py-14 max-w-7xl mx-auto text-white">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-10 w-96 h-96 bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-16 right-10 w-96 h-96 bg-blue-500/20 blur-[140px]" />
      </div>

      {/* ===============================
          WHAT IS LINUX
      =============================== */}
      <section className="mb-24">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">
          What is Linux?
        </h1>

        <p className="text-gray-300 max-w-3xl mb-12 leading-relaxed">
          Linux is a reliable, open-source operating system commonly used in
          cybersecurity, servers, cloud infrastructure, and ethical hacking
          environments. Its strong security architecture, system stability, and
          extensive command-line utilities make it ideal for penetration
          testing, digital forensics, network administration, and secure system
          management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {linuxInfoCards.map((item, index) => (
            <div key={index} className={cardClass}>
              <h3 className="text-cyan-400 font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
  </div>
</section>

{/* ===============================
    LINUX SECTIONS NAVIGATION
=============================== */}
<section className="mb-24">
  <h2 className="text-3xl font-bold mb-6 text-cyan-400">
    🐧 Linux Learning Sections
  </h2>

  <p className="text-gray-300 max-w-3xl mb-10 leading-relaxed">
    Explore Linux fundamentals step by step — from basics to networking and
    Bash scripting used in real-world cybersecurity.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
    {[
      {
        title: "🏠 Linux Home",
        desc: "Steps to download and install Linux in your system.",
        path: "/linux/home",
      },
      {
        title: "📘 Linux Basics",
        desc: "Core commands and Linux fundamentals.",
        path: "/linux/basics",
      },
      {
        title: "📂 Linux Files",
        desc: "File systems, permissions, and ownership.",
        path: "/linux/files",
      },
      {
        title: "🌐 Linux Networking",
        desc: "Networking commands and services.",
        path: "/linux/networking",
      },
      {
        title: "💻 Linux Bash",
        desc: "Bash scripting and automation.",
        path: "/linux/bash",
      },
    ].map((item, index) => (
      <Link key={index} to={item.path} className="block">
        <div className={`${cardClass} cursor-pointer`}>
          <h3 className="text-cyan-400 font-semibold mb-2">
            {item.title}
          </h3>
<p className="text-gray-300 text-sm leading-relaxed mb-4">
  {item.desc}
</p>

<div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group">
  <span className="group-hover:underline">Learn more</span>
  <span className="transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</div>
        </div>
      </Link>
    ))}
  </div>
</section>

      {/* ===============================
          WHY CYBERSECURITY USES LINUX
      =============================== */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-4">
          🧑‍💻 Why Cybersecurity Professionals Use Linux
        </h2>

        <p className="text-gray-300 max-w-3xl mb-12 leading-relaxed">
          Linux is widely used in cybersecurity because it provides deep
          system-level control, strong built-in security mechanisms, and native
          support for a vast range of security and penetration testing tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "🔐 Full System Control",
              text: "Complete control over files, processes, and system permissions allows security professionals to analyze, test, and harden systems effectively.",
            },
            {
              title: "🛠️ Security Tools",
              text: "Most popular penetration testing, vulnerability scanning, and forensic tools are developed primarily for Linux environments.",
            },
            {
              title: "🛡️ Strong Permissions",
              text: "Linux uses a strict user and permission model that limits access, reducing the risk of malware and unauthorized actions.",
            },
            {
              title: "⚡ Lightweight & Fast",
              text: "Linux runs efficiently even on low-resource systems, making it ideal for servers, virtual machines, and security testing labs.",
            },
          ].map((item, index) => (
            <div key={index} className={cardClass}>
              <h3 className="text-cyan-400 font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          LINUX COMMANDS
      =============================== */}
      <h1 className="text-4xl font-bold mb-4 text-cyan-400">
        Linux Commands
      </h1>

      <p className="text-gray-300 mb-12 max-w-4xl leading-relaxed">
        Common Linux commands play a crucial role in cybersecurity and system
        administration by enabling users to control system resources, inspect
        network activity, manage users and permissions, analyze system logs, and
        automate security tasks.
      </p>

      {Object.entries(groupedCommands).map(
        ([category, commands]: [string, LinuxCommand[]]) => (
          <div key={category} className="mb-20">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-8">
              {category}
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {commands.map((cmd, index) => (
                <div
                  key={index}
                  className={`${cardClass} hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]`}
                >
                  <h3 className="text-cyan-400 font-semibold mb-2">
                    ›› {cmd.command}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {cmd.description}
                  </p>

                  {/* Command + Copy + Example */}
                  {cmd.example && (
                    <div className="space-y-3">
                      {/* Command + Copy */}
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex-1 bg-[#020617] rounded-lg px-3 py-2
                            border border-cyan-500/30
                            overflow-x-auto
                            [&::-webkit-scrollbar]:hidden
                            [-ms-overflow-style:none]
                            [scrollbar-width:none]
                          "
                        >
                          <code className="text-cyan-300 text-sm font-mono whitespace-nowrap">
                            {cmd.command}
                          </code>
                        </div>

                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(cmd.example!)
                          }
                          className="
                            text-sm px-3 py-1 rounded-md
                            border border-cyan-400 text-cyan-400
                            hover:bg-cyan-400 hover:text-black transition
                          "
                        >
                          Copy
                        </button>
                      </div>

                      {/* Example (scrollbar hidden) */}
                      <div
                        className="
                          bg-[#020617] rounded-lg px-3 py-2
                          border border-cyan-500/30
                          overflow-x-auto
                          [&::-webkit-scrollbar]:hidden
                          [-ms-overflow-style:none]
                          [scrollbar-width:none]
                        "
                      >
                        <code className="text-cyan-300 text-sm font-mono whitespace-nowrap block">
                          {cmd.example}
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
