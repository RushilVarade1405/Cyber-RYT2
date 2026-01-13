import { motion, type Variants } from "framer-motion";
import { Terminal, Map, NotebookPen, ArrowUpRight } from "lucide-react";

/* ===============================
   HELPERS
================================ */

function getMainCategory(category: string) {
  if (category.toLowerCase().includes("ctf")) return "CTF";
  if (category.toLowerCase().includes("web")) return "Web Security";
  if (category.toLowerCase().includes("linux")) return "Linux";
  if (category.toLowerCase().includes("pentest")) return "Pentesting";
  return "Cyber";
}

/* ===============================
   DATA
================================ */

const platforms = [
  {
    name: "TryHackMe",
    category: "Cybersecurity & Pentesting",
    difficulty: "Beginner → Advanced",
    description:
      "An interactive learning platform offering structured paths, guided labs, and real-world scenarios covering cybersecurity, Linux, networking, and ethical hacking fundamentals.",
    link: "https://tryhackme.com",
  },
  {
    name: "Hack The Box",
    category: "Advanced Pentesting",
    difficulty: "Intermediate → Expert",
    description:
      "A professional-grade platform focused on realistic penetration testing labs, machines, and challenges used by security professionals worldwide.",
    link: "https://www.hackthebox.com",
  },
  {
    name: "OWASP Juice Shop",
    category: "Web Application Security",
    difficulty: "Beginner → Advanced",
    description:
      "An intentionally vulnerable web application designed to demonstrate common web vulnerabilities based on the OWASP Top 10 security risks.",
    link: "https://owasp.org/www-project-juice-shop/",
  },
  {
    name: "OverTheWire",
    category: "Linux & Security Wargames",
    difficulty: "Beginner → Intermediate",
    description:
      "A series of Linux-based wargames that teach security concepts through hands-on command-line challenges and problem solving.",
    link: "https://overthewire.org",
  },
  {
    name: "PicoCTF",
    category: "CTF & Cybersecurity",
    difficulty: "Beginner → Intermediate",
    description:
      "A beginner-friendly Capture The Flag platform designed to teach cybersecurity concepts in a fun, progressive, and structured manner.",
    link: "https://picoctf.org",
  },
  {
    name: "VulnHub",
    category: "Vulnerable Machines",
    difficulty: "Intermediate → Advanced",
    description:
      "A community-driven resource providing intentionally vulnerable virtual machines for practicing penetration testing in local environments.",
    link: "https://www.vulnhub.com",
  },
  {
    name: "CTFlearn",
    category: "CTF Practice",
    difficulty: "Beginner → Intermediate",
    description:
      "A learning-focused CTF platform offering challenges across cryptography, web exploitation, reverse engineering, and forensics.",
    link: "https://ctflearn.com",
  },
];

const practiceSteps = [
  {
    title: "Start with Beginner Platforms",
    description:
      "Build confidence with guided labs and beginner-friendly environments before moving to harder challenges.",
    icon: Terminal,
  },
  {
    title: "Follow Structured Learning Paths",
    description:
      "Avoid random practice. Roadmaps ensure skills are learned in the correct order.",
    icon: Map,
  },
  {
    title: "Practice Consistently & Take Notes",
    description:
      "Daily hands-on practice combined with note-taking reinforces long-term understanding.",
    icon: NotebookPen,
  },
  {
    title: "Increase Difficulty Gradually",
    description:
      "Progress from simple challenges to realistic labs without overwhelming yourself.",
    icon: ArrowUpRight,
  },
];

/* ===============================
   ANIMATIONS
================================ */

const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const hoverLift = {
  whileHover: {
    y: -8,
    boxShadow: "0 0 45px rgba(34,211,238,0.35)",
    transition: { duration: 0.3 },
  },
};

/* ===============================
   COMPONENT
================================ */

export default function Platforms() {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-20">
        {/* TITLE */}
        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-6">
          Learning <span className="text-cyan-400">Platforms</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-gray-300 leading-relaxed max-w-3xl mb-16"
        >
          Carefully selected platforms that provide hands-on experience,
          real-world labs, and structured learning paths for building strong
          cybersecurity and penetration testing skills.
        </motion.p>

        {/* WHY + TIMELINE */}
        <motion.section variants={fadeUp} className="mb-24">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            Why Practice on These Platforms?
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mb-14">
            Cybersecurity is a hands-on discipline. These platforms simulate
            real-world environments where you learn by breaking systems,
            fixing vulnerabilities, and thinking like attackers.
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {practiceSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-cyan-400 text-black text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>

                  <div className="mb-4 text-cyan-400">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* PLATFORM GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {platforms.map((p, index) => {
            const mainCategory = getMainCategory(p.category);
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                {...hoverLift}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  {p.name}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
                    {mainCategory}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
                    {p.category}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-400/30">
                    {p.difficulty}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {p.description}
                </p>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm px-4 py-2 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
                >
                  Visit Platform →
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="text-center mt-24">
          <h3 className="text-2xl font-semibold mb-4">
            Not Sure Where to Start?
          </h3>
          <p className="text-gray-300 mb-6">
            Follow a structured roadmap to combine learning with hands-on
            practice.
          </p>
          <a
            href="/start"
            className="inline-block px-6 py-3 rounded-lg bg-cyan-400 text-black font-semibold hover:opacity-90 transition"
          >
            View Learning Roadmap →
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
