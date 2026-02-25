import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Globe,
  Lightbulb,
  Code,
  Shield,
  BookOpen,
  Rocket,
  Sparkles,
  User,
  Heart,
  TrendingUp,
  ExternalLink,
  FileDown,
  Terminal,
} from "lucide-react";

/* ===============================
   ANIMATION VARIANTS
================================ */

const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: "0 0 50px rgba(34,211,238,0.3)",
    borderColor: "rgba(34,211,238,0.5)",
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const iconFloat: Variants = {
  animate: {
    y: [-3, 3, -3],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const shimmer: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 8, repeat: Infinity, ease: "linear" },
  },
};

/* ===============================
   TYPES
================================ */

interface PhilosophyCard {
  icon: any;
  title: string;
  points: string[];
  gradient: string;
}

interface RoadmapStep {
  icon: any;
  title: string;
  items: string[];
  color: string;
}

/* ===============================
   DATA
================================ */

const philosophyItems: PhilosophyCard[] = [
  {
    icon: Lightbulb,
    title: "Clarity First",
    points: [
      "Simple explanations before complexity",
      "Step-by-step learning approach",
      "No unnecessary technical overload",
    ],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Code,
    title: "Practice Driven",
    points: [
      "Hands-on learning with guidance",
      "Understand tools before using them",
      "Learning through experimentation",
    ],
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    icon: Shield,
    title: "Ethics & Responsibility",
    points: [
      "Strong focus on cyber laws",
      "Professional security mindset",
      "No illegal or harmful practices",
    ],
    gradient: "from-purple-500/20 to-cyan-500/20",
  },
];

const roadmapSteps: RoadmapStep[] = [
  {
    icon: BookOpen,
    title: "Foundations",
    items: ["Linux basics", "Networking", "Core security concepts"],
    color: "cyan",
  },
  {
    icon: Rocket,
    title: "Security Tools",
    items: ["Reconnaissance", "Scanning", "Intro to VAPT"],
    color: "blue",
  },
  {
    icon: Shield,
    title: "Defense & Law",
    items: ["Cyber laws", "SOC basics", "Incident awareness"],
    color: "purple",
  },
  {
    icon: TrendingUp,
    title: "Advanced Domains",
    items: ["Blockchain security", "Case studies", "Projects"],
    color: "indigo",
  },
];

const learningTopics = [
  { icon: "💻", text: "Linux and command-line fundamentals" },
  { icon: "🌐", text: "Networking and system-level concepts" },
  { icon: "🔧", text: "Security tools with attack & defense context" },
  { icon: "🔐", text: "Cryptography and secure communications" },
  { icon: "⚖️", text: "Cyber laws and ethical hacking principles" },
];

const futureGoals = [
  { icon: "📚", text: "Structured beginner-to-advanced learning paths" },
  { icon: "🧪", text: "Guided labs and hands-on walkthroughs" },
  { icon: "💼", text: "Industry-aligned case studies" },
  { icon: "👥", text: "Community-driven learning features" },
];

/* ===============================
   SUB-COMPONENTS
================================ */

const PhilosophyCardComponent = memo(({ item }: { item: PhilosophyCard }) => {
  const Icon = item.icon;
  return (
    <m.article
      variants={fadeUp}
      initial="rest"
      whileHover="hover"
      className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="relative z-10">
        <m.div
          variants={iconFloat}
          animate="animate"
          className="mb-4 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center"
        >
          <Icon className="w-7 h-7 text-cyan-400" />
        </m.div>
        <h3 className="text-xl text-cyan-400 font-semibold mb-4 group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h3>
        <ul className="space-y-2.5 text-gray-400 text-sm">
          {item.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 group-hover:text-gray-300 transition-colors">
              <span className="text-cyan-400 mt-1">▸</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <m.div variants={cardHover} className="absolute inset-0 pointer-events-none" />
    </m.article>
  );
});
PhilosophyCardComponent.displayName = "PhilosophyCard";

const RoadmapCard = memo(({ step }: { step: RoadmapStep }) => {
  const Icon = step.icon;
  return (
    <m.article
      variants={fadeUp}
      initial="rest"
      whileHover="hover"
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
      <div className="relative z-10">
        <m.div
          variants={iconFloat}
          animate="animate"
          className={`mb-4 w-12 h-12 rounded-lg bg-${step.color}-500/20 border border-${step.color}-400/30 flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 text-${step.color}-400`} />
        </m.div>
        <h3 className="text-lg text-cyan-400 font-semibold mb-3 group-hover:text-cyan-300 transition-colors">
          {step.title}
        </h3>
        <ul className="space-y-1.5 text-gray-400 text-sm">
          {step.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 group-hover:text-gray-300 transition-colors">
              <span className="text-cyan-400">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <m.div variants={cardHover} className="absolute inset-0 pointer-events-none" />
    </m.article>
  );
});
RoadmapCard.displayName = "RoadmapCard";

/* ===============================
   PORTFOLIO PREVIEW CARD
   (shown in Creator section)
================================ */
function PortfolioPreviewCard() {
  const navigate = useNavigate();

  return (
    <m.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-5xl mx-auto mb-24"
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl bg-black/60 border border-blue-500/30 backdrop-blur-xl p-8 sm:p-10">
        {/* Corner glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-2xl"
          style={{
            backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-8">
          {/* Left — info */}
          <div className="flex-1">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] font-mono tracking-widest uppercase mb-4">
              <Terminal className="w-3 h-3" />
              Recruiter Access
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Rushil Varade
            </h3>
            <p className="text-blue-400 font-mono text-sm mb-4">
              Cybersecurity Enthusiast · SOC Analyst Aspirant · VAPT 
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { label: "10+ Tools", color: "blue" },
                { label: "3 Projects", color: "cyan" },
                { label: "8 Domains", color: "indigo" },
                { label: "B.E. CS", color: "blue" },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono bg-${color}-500/8 border border-${color}-500/20 text-${color}-300`}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Mini skill pills */}
            <div className="flex flex-wrap gap-1.5">
              {["Python", "Kali Linux", "Nmap", "Wireshark", "Burp Suite", "Metasploit"].map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-gray-400"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right — CTAs */}
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/portfolio")}
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-400 transition-all duration-200 whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              View Full Portfolio
            </button>
            <a
              href="/RushilVarade_Resume.pdf"
              download
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-blue-500/30 text-blue-400 text-sm font-semibold hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-200 whitespace-nowrap"
            >
              <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Download CV
            </a>
          </div>
        </div>

        {/* Bottom scan line */}
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent origin-left"
        />
      </div>
    </m.div>
  );
}

/* ===============================
   MAIN COMPONENT
================================ */

export default function About() {
  return (
    <LazyMotion features={domAnimation}>
      <m.main
        variants={pageFade}
        initial="hidden"
        animate="visible"
        className="relative min-h-screen text-white overflow-hidden"
      >
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-20">

          {/* ================= TITLE ================= */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              About Cyber_World
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          </m.div>

          {/* ================= INTRO ================= */}
          <m.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-4xl mb-24 p-8 rounded-2xl bg-black/50 border border-white/20 backdrop-blur-xl"
          >
            <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
              <p>
                <span className="text-cyan-400 font-semibold text-xl">Cyber_World </span> is a
                beginner-focused cybersecurity learning platform designed to make security
                concepts simple, structured, and accessible to everyone.
              </p>
              <p>
                We guide learners through fundamentals first, ensuring crystal-clear
                understanding before advancing to tools, techniques, and real-world scenarios.
              </p>
              <p className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>
                  The platform strongly emphasizes{" "}
                  <span className="text-cyan-400 font-semibold">ethical learning</span> and
                  responsible security practices.
                </span>
              </p>
            </div>
          </m.div>

          {/* ================= CREATOR ================= */}
          <m.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-5xl mx-auto mb-10"
          >
            <div className="relative overflow-hidden p-10 rounded-2xl bg-black/50 border border-white/20 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <m.div
                    variants={iconFloat}
                    animate="animate"
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30 flex items-center justify-center"
                  >
                    <User className="w-8 h-8 text-cyan-400" />
                  </m.div>
                  <h2 className="text-3xl text-cyan-400 font-bold">Creator</h2>
                </div>

                <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
                  <p>
                    Hi, I'm{" "}
                    <span className="text-cyan-400 font-bold text-xl">RYTNIX </span>, a
                    cybersecurity learner and technology enthusiast with a passion for ethical
                    hacking, Linux, blockchain, and digital security.
                  </p>
                  <p>
                    Cyber_World was born as a personal learning project that gradually evolved
                    into a structured platform for sharing knowledge in a{" "}
                    <span className="text-cyan-400 font-semibold">
                      simple, practical, and beginner-focused
                    </span>{" "}
                    way — especially for students who are just starting their cybersecurity journey.
                  </p>
                  <p className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <span>
                      This project is continuously evolving as I explore new tools, security
                      techniques, and emerging technologies, with the goal of learning deeply and
                      sharing valuable insights along the way.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </m.section>

          {/* ✅ PORTFOLIO PREVIEW CARD — button links to /portfolio page */}
          <PortfolioPreviewCard />

          {/* ================= PURPOSE & VISION ================= */}
          <m.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 md:grid-cols-2 mb-24"
          >
            <m.article
              variants={fadeUp}
              initial="rest"
              whileHover="hover"
              className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
              <div className="relative z-10">
                <m.div
                  variants={iconFloat}
                  animate="animate"
                  className="mb-4 w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center"
                >
                  <Target className="w-8 h-8 text-cyan-400" />
                </m.div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">
                  Purpose
                </h3>
                <p className="text-gray-300 mb-3 leading-relaxed">
                  To remove confusion from cybersecurity learning by providing a clear,
                  beginner-friendly path with structured guidance.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Cyber_World focuses on{" "}
                  <span className="text-cyan-400">understanding concepts</span> before using
                  tools, ensuring solid foundations.
                </p>
              </div>
              <m.div variants={cardHover} className="absolute inset-0 pointer-events-none" />
            </m.article>

            <m.article
              variants={fadeUp}
              initial="rest"
              whileHover="hover"
              className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
              <div className="relative z-10">
                <m.div
                  variants={iconFloat}
                  animate="animate"
                  className="mb-4 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center"
                >
                  <Globe className="w-8 h-8 text-blue-400" />
                </m.div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">
                  Vision
                </h3>
                <p className="text-gray-300 mb-3 leading-relaxed">
                  To become a trusted starting point for cybersecurity learners worldwide,
                  building a community of ethical hackers.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Encouraging{" "}
                  <span className="text-blue-400">ethical practices</span> and long-term skill
                  development through consistent learning.
                </p>
              </div>
              <m.div variants={cardHover} className="absolute inset-0 pointer-events-none" />
            </m.article>
          </m.section>

          {/* ================= LEARNING PHILOSOPHY ================= */}
          <m.section className="mb-24">
            <m.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Our Learning <span className="text-cyan-400">Philosophy</span>
            </m.h2>
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-8 md:grid-cols-3"
            >
              {philosophyItems.map((item) => (
                <PhilosophyCardComponent key={item.title} item={item} />
              ))}
            </m.div>
          </m.section>

          {/* ================= WHAT YOU'LL LEARN ================= */}
          <m.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-5xl mx-auto mb-24"
          >
            <div className="relative overflow-hidden p-8 rounded-2xl bg-black/40 border border-cyan-400/20 backdrop-blur-xl">
              <m.div
                variants={shimmer}
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                style={{ backgroundSize: "200% 100%" }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-3xl text-cyan-400 font-bold">What You'll Learn</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {learningTopics.map((topic, idx) => (
                    <m.div
                      key={idx}
                      variants={fadeUp}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {topic.icon}
                      </span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {topic.text}
                      </span>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </m.section>

          {/* ================= ROADMAP ================= */}
          <m.section className="mb-24">
            <m.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Learning <span className="text-cyan-400">Roadmap</span>
            </m.h2>
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {roadmapSteps.map((step) => (
                <RoadmapCard key={step.title} step={step} />
              ))}
            </m.div>
          </m.section>

          {/* ================= FUTURE GOALS ================= */}
          <m.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-5xl mx-auto mb-24"
          >
            <div className="p-8 rounded-2xl bg-black/40 border border-purple-400/20 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl text-cyan-400 font-bold">Future Goals</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {futureGoals.map((goal, idx) => (
                  <m.div
                    key={idx}
                    variants={fadeUp}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {goal.icon}
                    </span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {goal.text}
                    </span>
                  </m.div>
                ))}
              </div>
            </div>
          </m.section>

          {/* ================= FOOTER CTA ================= */}
          <m.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center p-8 rounded-2xl bg-black/40 border border-cyan-400/20 backdrop-blur-sm"
          >
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <p className="text-2xl font-bold text-white mb-2">Learn. Practice. Secure.</p>
            <p className="text-cyan-400 text-3xl font-bold">Cyber_World</p>
          </m.div>

        </div>
      </m.main>
    </LazyMotion>
  );
}