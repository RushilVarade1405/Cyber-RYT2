import { linuxCommands, LinuxCommand } from "../data/linux";

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
   SHARED CARD STYLE
=============================== */
const cardClass = `
  bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
  border border-cyan-500/30 rounded-xl p-6
  transition-all duration-300
  hover:-translate-y-2
  hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]
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
    <div className="px-10 py-10 max-w-7xl mx-auto text-white">

      {/* ===============================
          WHAT IS LINUX
      =============================== */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold mb-4">What is Linux?</h1>

        <p className="text-cyan-300 max-w-3xl mb-10">
          Linux is a reliable, open-source operating system commonly used in cybersecurity, servers, cloud infrastructure, and ethical hacking environments. Its strong security architecture, system stability, and extensive command-line utilities make it an ideal platform for tasks such as penetration testing, digital forensics, network administration, and secure system management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {linuxInfoCards.map((item, index) => (
            <div key={index} className={cardClass}>
              <h3 className="text-cyan-400 font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          WHY CYBERSECURITY USES LINUX
      =============================== */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-4">
          🧑‍💻 Why Cybersecurity Professionals Use Linux
        </h2>

        <p className="text-cyan-300 max-w-3xl mb-10">
          Linux is widely used in cybersecurity because it provides deep system-level control, strong built-in security mechanisms, and native support for a vast range of security and penetration testing tools. Its open-source nature allows security professionals to inspect, customize, and harden the operating system, making it ideal for vulnerability assessment, network analysis, digital forensics, and ethical hacking.
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
              <p className="text-gray-300 text-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          LINUX COMMANDS
      =============================== */}
      <h1 className="text-4xl font-bold mb-4">Linux Commands</h1>

      <p className="text-cyan-300 mb-10">
Common Linux commands play a crucial role in cybersecurity and system administration by enabling users to control system resources, inspect network activity, manage users and permissions, analyze system logs, and automate security tasks. Mastery of these commands is essential for ethical hackers, system administrators, and security analysts working in real-world environments.      </p>

      {Object.entries(groupedCommands).map(
        ([category, commands]: [string, LinuxCommand[]]) => (
          <div key={category} className="mb-14">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
              {category}
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {commands.map((cmd, index) => (
                <div
                  key={index}
                  className={`${cardClass} hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]`}
                >
                  <h3 className="text-cyan-400 font-semibold mb-2">
                    ›› {cmd.command}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4">
                    {cmd.description}
                  </p>

                  {/* Command + Copy + Example */}
                  {cmd.example && (
                    <div className="space-y-2">

                      {/* Top row: command box + copy */}
                      <div className="flex items-center gap-3">
                        <div
                          className="flex-1 bg-[#020617] rounded-lg px-3 py-2
                          border border-cyan-500/30"
                        >
                          <code className="text-cyan-300 text-sm font-mono">
                            {cmd.command}
                          </code>
                        </div>

                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(cmd.example!)
                          }
                          className="text-sm px-3 py-1 rounded-md
                          border border-cyan-400 text-cyan-400
                          hover:bg-cyan-400 hover:text-black transition"
                        >
                          Copy
                        </button>
                      </div>

                      {/* Bottom row: example */}
                      <div
                        className="bg-[#020617] rounded-lg px-3 py-2
                        border border-cyan-500/30"
                      >
                        <code className="text-cyan-300 text-sm block overflow-x-auto">
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
