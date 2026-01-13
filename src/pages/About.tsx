import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";

/* ===============================
   ANIMATION VARIANTS (STATIC)
================================ */

const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

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
  visible: { transition: { staggerChildren: 0.15 } },
};

const hoverLift = {
  whileHover: {
    y: -8,
    boxShadow: "0 0 45px rgba(34,211,238,0.25)",
    transition: { duration: 0.25 },
  },
} as const;

/* ===============================
   COMPONENT
================================ */

export default function About() {
  return (
    <LazyMotion features={domAnimation}>
      <m.main
        variants={pageFade}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-black text-white"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16">

          {/* ================= TITLE ================= */}
          <m.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-4xl sm:text-5xl font-bold mb-10"
          >
            About <span className="text-cyan-400">Cyber World</span>
          </m.h1>

          {/* ================= INTRO ================= */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mb-20 space-y-4 text-gray-300"
          >
            <p>
              <span className="text-cyan-400 font-semibold">Cyber World</span> is a
              beginner-focused cybersecurity learning platform designed to make
              security concepts simple and structured.
            </p>
            <p>
              Learners are guided through fundamentals first, ensuring clarity
              before advancing to tools, techniques, and real-world scenarios.
            </p>
            <p>
              The platform strongly emphasizes ethical learning and responsible
              security practices.
            </p>
          </m.div>

          {/* ================= PURPOSE & VISION ================= */}
          <m.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 mb-20"
          >
            <m.div
              variants={fadeUp}
              {...hoverLift}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                🎯 Purpose
              </h3>
              <p className="text-gray-300 text-sm mb-2">
                To remove confusion from cybersecurity learning by providing a
                clear, beginner-friendly path.
              </p>
              <p className="text-gray-400 text-sm">
                Cyber World focuses on understanding concepts before using tools.
              </p>
            </m.div>

            <m.div
              variants={fadeUp}
              {...hoverLift}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                🌐 Vision
              </h3>
              <p className="text-gray-300 text-sm mb-2">
                To become a trusted starting point for cybersecurity learners.
              </p>
              <p className="text-gray-400 text-sm">
                Encouraging ethical practices and long-term skill development.
              </p>
            </m.div>
          </m.section>

          {/* ================= LEARNING PHILOSOPHY ================= */}
          <m.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3 mb-20"
          >
            {[
              {
                title: "Clarity First",
                points: [
                  "Simple explanations before complexity",
                  "Step-by-step learning approach",
                  "No unnecessary technical overload",
                ],
              },
              {
                title: "Practice Driven",
                points: [
                  "Hands-on learning with guidance",
                  "Understand tools before using them",
                  "Learning through experimentation",
                ],
              },
              {
                title: "Ethics & Responsibility",
                points: [
                  "Strong focus on cyber laws",
                  "Professional security mindset",
                  "No illegal or harmful practices",
                ],
              },
            ].map((item, i) => (
              <m.div
                key={i}
                variants={fadeUp}
                {...hoverLift}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-cyan-400 font-semibold mb-3">
                  {item.title}
                </h3>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                  {item.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </m.div>
            ))}
          </m.section>

          {/* ================= WHAT YOU’LL LEARN ================= */}
          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-20 p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h2 className="text-2xl text-cyan-400 font-semibold mb-4">
              🚀 What You’ll Learn
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Linux and command-line fundamentals</li>
              <li>Networking and system-level concepts</li>
              <li>Security tools with attack & defense context</li>
              <li>Cryptography and secure communications</li>
              <li>Cyber laws and ethical hacking principles</li>
            </ul>
          </m.section>

          {/* ================= ROADMAP ================= */}
          <m.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              Learning <span className="text-cyan-400">Roadmap</span>
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Foundations",
                  items: ["Linux basics", "Networking", "Core security concepts"],
                },
                {
                  title: "Security Tools",
                  items: ["Reconnaissance", "Scanning", "Intro to VAPT"],
                },
                {
                  title: "Defense & Law",
                  items: ["Cyber laws", "SOC basics", "Incident awareness"],
                },
                {
                  title: "Advanced Domains",
                  items: ["Blockchain security", "Case studies", "Projects"],
                },
              ].map((step, i) => (
                <m.div
                  key={i}
                  variants={fadeUp}
                  {...hoverLift}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-cyan-400 font-semibold mb-3">
                    {step.title}
                  </h3>
                  <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                    {step.items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                </m.div>
              ))}
            </div>
          </m.section>

          {/* ================= FUTURE GOALS ================= */}
          <m.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-20"
          >
            <h2 className="text-2xl text-cyan-400 font-semibold mb-4">
              🔮 Future Goals
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Structured beginner-to-advanced learning paths</li>
              <li>Guided labs and hands-on walkthroughs</li>
              <li>Industry-aligned case studies</li>
              <li>Community-driven learning features</li>
            </ul>
          </m.section>

{/* ================= FOUNDER & CREATOR ================= */}
<m.section
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="max-w-5xl mx-auto mb-20 p-6 rounded-2xl bg-white/5 border border-white/10"
>
  <h2 className="text-2xl text-cyan-400 font-semibold mb-4">
    👨‍💻 Founder & Creator
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Hi, I’m <span className="text-cyan-400 font-semibold">RYTNIX OP</span>, a
    cybersecurity learner and technology enthusiast with a strong interest in
    ethical hacking, Linux, blockchain, and digital security.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Cyber World was created as a personal learning project that gradually
    evolved into a structured platform for sharing knowledge in a simple,
    practical, and beginner-focused way — especially for students who are just
    starting their cybersecurity journey.
  </p>

  <p className="text-gray-300 leading-relaxed">
    This project is continuously evolving as I explore new tools, security
    techniques, and emerging technologies, with the goal of learning deeply
    and sharing valuable insights along the way.
  </p>
</m.section>

          {/* ================= FOOTER ================= */}
          <div className="mt-20 text-center text-gray-500 text-sm">
            Learn. Practice. Secure.{" "}
            <span className="text-cyan-400">Cyber World</span>
          </div>

        </div>
      </m.main>
    </LazyMotion>
  );
}
