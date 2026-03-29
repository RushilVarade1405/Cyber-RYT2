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

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ===============================
   SHARED CARD STYLES
=============================== */
const cardClass = `
  p-6 rounded-xl
  bg-gradient-to-br from-white/5 to-white/[0.02]
  backdrop-blur-xl
  border border-white/10
  transition-all duration-300
  hover:-translate-y-2
  hover:border-cyan-400/50
  hover:shadow-[0_8px_30px_rgba(34,211,238,0.25)]
  shadow-[0_4px_20px_rgba(0,0,0,0.3)]
`;

const featureCardClass = `
  p-8 rounded-2xl
  bg-gradient-to-br from-cyan-500/10 to-blue-500/5
  backdrop-blur-xl
  border border-cyan-400/20
  transition-all duration-400
  hover:scale-105
  hover:border-cyan-400/40
  hover:shadow-[0_10px_40px_rgba(34,211,238,0.3)]
  shadow-[0_6px_25px_rgba(0,0,0,0.4)]
  group
`;

/* ===============================
   COMPONENT
=============================== */
export default function Linux() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative px-6 sm:px-10 py-16 max-w-7xl mx-auto text-white"
    >
      {/* ===============================
          BACKGROUND EFFECTS
      =============================== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/15 blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-indigo-500/15 blur-[130px] animate-pulse" />
      </div>

      {/* ===============================
          HERO SECTION
      =============================== */}
      <motion.section variants={fadeUp} className="mb-20 text-center">
        <motion.div
          variants={scaleIn}
          className="inline-block mb-6 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30"
        >
          <span className="text-cyan-400 font-semibold text-sm tracking-wider">
            🐧 LINUX MASTERY
          </span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
          What is Linux?
        </h1>
        
        <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
          Linux is a powerful, free, and open-source operating system kernel that forms the foundation 
          of countless distributions. Built on Unix principles, it provides users with complete control 
          over their computing environment. From smartphones to supercomputers, Linux powers the modern 
          digital infrastructure with unmatched stability, security, and flexibility.
        </p>
      </motion.section>

      {/* ===============================
          HISTORY OF LINUX
      =============================== */}
      <motion.section variants={fadeUp} className="mb-24">
        <div className={`${cardClass} border-l-4 border-l-cyan-400`}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">📜</div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-cyan-400">
                The Linux Story
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  In 1991, a Finnish computer science student named <span className="text-cyan-400 font-semibold">Linus Torvalds</span> announced 
                  his hobby project: a free operating system kernel. What started as a personal endeavor 
                  evolved into one of the largest collaborative software projects in history.
                </p>
                <p>
                  Combined with GNU tools developed by Richard Stallman's Free Software Foundation, Linux 
                  became a complete operating system. Today, it powers over <span className="text-cyan-400 font-semibold">96.3% of the world's 
                  top million servers</span>, runs on <span className="text-cyan-400 font-semibold">3+ billion Android devices</span>, and drives innovation in 
                  cloud computing, IoT, cybersecurity, and scientific research.
                </p>
                <p className="text-sm italic text-gray-400 border-l-2 border-cyan-400/50 pl-4">
                  "I'm doing a (free) operating system (just a hobby, won't be big and professional...)" 
                  <br />— Linus Torvalds, August 1991
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===============================
          KEY FEATURES
      =============================== */}
      <motion.section variants={stagger} className="mb-24">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Why Choose Linux?
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Discover the core advantages that make Linux the preferred choice for developers, 
          system administrators, and security professionals worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🆓",
              title: "Free & Open Source",
              text: "Complete access to source code. No licensing fees, no vendor lock-in. Modify, distribute, and learn from the code freely.",
              color: "cyan",
            },
            {
              icon: "⚡",
              title: "High Performance",
              text: "Optimized resource management and lightweight architecture. Runs efficiently on hardware from Raspberry Pi to mainframes.",
              color: "blue",
            },
            {
              icon: "🔐",
              title: "Enterprise Security",
              text: "Built-in SELinux, AppArmor, and strong permission models. Rapid security updates and transparent vulnerability management.",
              color: "indigo",
            },
            {
              icon: "🛠️",
              title: "Fully Customizable",
              text: "Choose your desktop environment, init system, and every component. Build systems tailored for servers, desktops, or embedded devices.",
              color: "purple",
            },
            {
              icon: "🌍",
              title: "Massive Community",
              text: "Millions of developers worldwide. Extensive documentation, forums, and support channels for every skill level.",
              color: "cyan",
            },
            {
              icon: "🔄",
              title: "Rolling Updates",
              text: "Continuous improvements without major upgrades. Stay current with the latest features and security patches.",
              color: "blue",
            },
            {
              icon: "🖥️",
              title: "Server Dominance",
              text: "Powers the internet's backbone. Industry standard for web servers, databases, and cloud infrastructure.",
              color: "indigo",
            },
            {
              icon: "🧪",
              title: "Developer Friendly",
              text: "Native support for virtually all programming languages. Powerful CLI tools, package managers, and development environments.",
              color: "purple",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`${cardClass} relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-500/5 blur-3xl`} />
              <div className="relative">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className={`text-${item.color}-400 font-bold text-lg mb-3`}>
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===============================
          LINUX DISTRIBUTIONS
      =============================== */}
      <motion.section variants={stagger} className="mb-24">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Popular Linux Distributions
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Choose the distribution that matches your needs, from beginner-friendly desktops 
          to specialized security and server platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Ubuntu",
              icon: "🟠",
              desc: "Most popular desktop Linux. Beginner-friendly with extensive software repositories and LTS support.",
              use: "Desktop, Server, Cloud",
            },
            {
              name: "Kali Linux",
              icon: "🐉",
              desc: "Penetration testing and security auditing. Pre-loaded with 600+ security tools for ethical hackers.",
              use: "Cybersecurity, Pentesting",
            },
            {
              name: "Debian",
              icon: "🔴",
              desc: "Rock-solid stability and security. Foundation for Ubuntu and many other distributions.",
              use: "Servers, Stability-Critical",
            },
            {
              name: "Fedora",
              icon: "🔵",
              desc: "Cutting-edge features and latest software. Sponsored by Red Hat for developers and enthusiasts.",
              use: "Development, Workstation",
            },
            {
              name: "Arch Linux",
              icon: "⚫",
              desc: "Rolling release with complete customization. Build your system from the ground up (for advanced users).",
              use: "Advanced Users, Custom Builds",
            },
            {
              name: "CentOS/RHEL",
              icon: "🟣",
              desc: "Enterprise-grade stability and long-term support. Industry standard for production servers.",
              use: "Enterprise Servers",
            },
          ].map((distro, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`${cardClass} hover:border-cyan-400/60`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{distro.icon}</div>
                <div className="flex-1">
                  <h3 className="text-cyan-400 font-bold text-xl mb-2">
                    {distro.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    {distro.desc}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30">
                    <span className="text-cyan-400 text-xs font-semibold">
                      {distro.use}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===============================
          LEARNING SECTIONS
      =============================== */}
      <motion.section variants={stagger} className="mb-24">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          🐧 Linux Learning Path
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Master Linux step by step with our comprehensive curriculum designed for 
          cybersecurity professionals and system administrators.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              title: "🏠 Linux Home",
              desc: "Installation guides, virtual machine setup, dual boot configuration, and getting started with your first Linux system.",
              path: "/linux/home",
              difficulty: "Beginner",
              topics: ["VM Setup", "Installation", "First Steps"],
            },
            {
              title: "📘 Linux Basics",
              desc: "Terminal fundamentals, shell commands, file operations, package management, and essential system administration.",
              path: "/linux/basics",
              difficulty: "Beginner",
              topics: ["CLI Basics", "Shell", "Commands"],
            },
            {
              title: "📂 Linux Files",
              desc: "File system hierarchy, permissions, ownership, symbolic links, and advanced file management techniques.",
              path: "/linux/files",
              difficulty: "Intermediate",
              topics: ["Permissions", "Hierarchy", "Links"],
            },
            {
              title: "🌐 Linux Networking",
              desc: "Network configuration, protocols, services, firewall management, and advanced networking tools for system security.",
              path: "/linux/networking",
              difficulty: "Intermediate",
              topics: ["TCP/IP", "Firewall", "Services"],
            },
            {
              title: "🧰 Tools & Commands",
              desc: "Comprehensive command reference, Kali tools, automation scripts, and real-world usage examples for penetration testing.",
              path: "/linux/toolscmd",
              difficulty: "Advanced",
              topics: ["Kali Tools", "Scripting", "Automation"],
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.02 }}
              className={featureCardClass}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all" />
              
              <div className="relative">
                <h3 className="text-cyan-400 font-bold text-xl mb-3 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-xs font-semibold">
                    {item.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {item.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400 text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <Link
                  to={item.path}
                  className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all"
                >
                  <span className="group-hover:underline">Start Learning</span>
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===============================
          WHY LINUX FOR CYBERSECURITY
      =============================== */}
      <motion.section variants={fadeUp} className="mb-24">
        <div className={`${cardClass} border-l-4 border-l-blue-400 p-8`}>
          <div className="flex items-start gap-6">
            <div className="text-5xl">🧑‍💻</div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-blue-400">
                Why Linux Dominates Cybersecurity
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                    <span>🔍</span> Deep System Access
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Complete transparency into system operations. Access kernel modules, 
                    system calls, and low-level networking for comprehensive security analysis.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                    <span>🛠️</span> Native Security Tools
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Built-in support for penetration testing, network analysis, forensics, 
                    and vulnerability assessment without additional software layers.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                    <span>💻</span> Powerful CLI & Scripting
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Automate complex security tasks with Bash, Python, and Perl. Create 
                    custom tools and workflows for efficient security operations.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                    <span>🌐</span> Advanced Networking
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Native tools for packet capture, traffic analysis, firewall configuration, 
                    and network monitoring critical for security professionals.
                  </p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="text-blue-400 font-semibold">Industry Standard:</span> Linux distributions 
                  like Kali, Parrot OS, and BlackArch provide pre-configured environments with 1000+ security 
                  tools, making them essential platforms for penetration testers, security researchers, and 
                  ethical hackers worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===============================
          USE CASES
      =============================== */}
      <motion.section variants={stagger} className="mb-24">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Real-World Applications
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          See how Linux powers critical infrastructure across industries and applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "☁️",
              title: "Cloud Computing",
              desc: "AWS, Google Cloud, and Azure run primarily on Linux. Powers containerization with Docker and Kubernetes.",
            },
            {
              icon: "🖥️",
              title: "Web Servers",
              desc: "Apache and Nginx on Linux serve the majority of websites. LAMP/LEMP stacks dominate web hosting.",
            },
            {
              icon: "📱",
              title: "Mobile & Embedded",
              desc: "Android OS is built on Linux kernel. Powers IoT devices, routers, smart TVs, and automotive systems.",
            },
            {
              icon: "🔬",
              title: "Scientific Research",
              desc: "100% of top 500 supercomputers run Linux. Essential for AI/ML, data analysis, and simulations.",
            },
            {
              icon: "🎮",
              title: "Gaming & Media",
              desc: "Steam Deck, rendering farms, and visual effects studios. Growing gaming support via Proton/Wine.",
            },
            {
              icon: "🏢",
              title: "Enterprise Systems",
              desc: "Database servers, CRM systems, and business applications. Critical for financial and healthcare IT.",
            },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className={cardClass}>
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-cyan-400 font-bold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===============================
          ETHICAL USE WARNING
      =============================== */}
      <motion.section
        variants={fadeUp}
        className="
          relative overflow-hidden
          p-8 rounded-2xl
          bg-gradient-to-br from-red-500/10 to-orange-500/5
          backdrop-blur-xl
          border-2 border-red-500/30
          shadow-[0_8px_40px_rgba(239,68,68,0.4)]
        "
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-3xl" />
        
        <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-5xl">⚠️</div>
            <div>
              <h3 className="text-red-400 font-bold text-2xl mb-2">
                Educational & Ethical Use Only
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mb-4" />
            </div>
          </div>
          
          <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <p>
              All Linux and cybersecurity content on{" "}
              <span className="text-red-400 font-bold">Cyber_World</span> is 
              provided strictly for <span className="text-white font-semibold">educational purposes</span> and{" "}
              <span className="text-white font-semibold">authorized security testing</span> only.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-black/20 border border-red-500/20">
              <div>
                <h4 className="text-red-400 font-semibold mb-2">❌ Prohibited:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Unauthorized access to systems</li>
                  <li>• Malicious hacking or cracking</li>
                  <li>• Data theft or system damage</li>
                  <li>• Illegal surveillance or espionage</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-green-400 font-semibold mb-2">✅ Permitted:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Learning & skill development</li>
                  <li>• Authorized penetration testing</li>
                  <li>• Personal lab environments</li>
                  <li>• Ethical security research</li>
                </ul>
              </div>
            </div>
            
            <p className="text-xs italic text-gray-400 border-l-2 border-red-400/50 pl-4">
              Users are solely responsible for complying with all applicable laws, regulations, 
              and ethical guidelines. Unauthorized access to computer systems is illegal under 
              laws such as the Computer Fraud and Abuse Act (CFAA) and similar international legislation.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}