import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cyberLaws, CyberLawSection } from "../data/cyberLaws";

/* ===============================
    REUSABLE UI COMPONENTS
================================ */

type BadgeProps = {
  text: string;
  className?: string;
};

const Badge = ({ text, className = "" }: BadgeProps) => (
  <span
    className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full ${className}`}
  >
    {text}
  </span>
);

type SectionCardProps = {
  heading: string;
  points: string[];
  index: number;
};

const SectionCard = ({ heading, points, index }: SectionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{ y: -4 }}
    className="
      group relative p-6 rounded-xl overflow-hidden
      bg-gradient-to-br from-white/5 to-white/[0.02]
      backdrop-blur-xl
      border border-cyan-400/20
      hover:border-cyan-400/50
      shadow-[0_0_25px_rgba(34,211,238,0.1)]
      hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
      transition-all duration-300
    "
  >
    {/* Corner glow */}
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Left accent bar */}
    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="relative">
      <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-cyan-400 rounded-full" />
        {heading}
      </h3>

      <ul className="space-y-3">
        {points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="flex items-start gap-3 text-gray-300"
          >
            <span className="text-cyan-400 mt-1 text-sm">▹</span>
            <span className="flex-1">{point}</span>
          </motion.li>
        ))}
      </ul>
    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </motion.div>
);

/* ===============================
    MAIN COMPONENT
================================ */

export default function CyberLaws() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative px-6 sm:px-10 py-16 max-w-7xl mx-auto text-white"
    >
      {/* Enhanced Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-10 w-96 h-96 bg-cyan-500/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-16 right-10 w-96 h-96 bg-blue-500/20 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 blur-[180px]" />
      </div>

      {/* ===============================
          PAGE HEADER
      =============================== */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-16"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Cyber Laws
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-6" />

        <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
          A comprehensive overview of national and international cyber laws, regulations, 
          and landmark case studies relevant to cybersecurity, digital forensics, and data protection.
        </p>
      </motion.header>

{/* ===============================
    QUICK NAVIGATION - Enhanced Cards (FIXED)
================================ */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24"
>
  {[
    { 
      path: "/cyber-laws/cyber-crimes", 
      icon: "⚠️", 
      label: "Cyber Crimes",
      color: "red",
      gradient: "from-red-500 to-orange-500"
    },
    { 
      path: "/cyber-laws/it-act", 
      icon: "📜", 
      label: "IT Act, 2000",
      color: "emerald",
      gradient: "from-emerald-500 to-cyan-500"
    },
    { 
      path: "/cyber-laws/ethics", 
      icon: "🧠", 
      label: "Cyber Ethics",
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
  ].map((item, index) => (
    <motion.div
      key={item.path}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={item.path}
        className={`
          group relative flex items-center
          h-[56px]                     /* ✅ pill height */
          px-6                         /* ✅ horizontal padding */
          rounded-2xl
          overflow-hidden
          bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/5
          border border-${item.color}-400/30
          hover:border-${item.color}-400
          transition-all duration-300
        `}
      >
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-all duration-300`}
        />

        {/* Icon box */}
        <div
          className={`
            relative flex items-center justify-center
            w-10 h-10                   /* ✅ small icon box */
            rounded-lg
            bg-${item.color}-400/10
            border border-${item.color}-400/30
            mr-4
          `}
        >
          <span className="text-lg">{item.icon}</span>
        </div>

        {/* Label */}
        <span
          className={`
            relative
            text-${item.color}-400
            group-hover:text-${item.color}-300
            font-medium
            text-sm
            transition-colors
          `}
        >
          {item.label}
        </span>

        {/* Bottom glow line */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${item.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        />
      </Link>
    </motion.div>
  ))}
</motion.div>

      {/* ===============================
          LAW CONTENT
      =============================== */}
      {cyberLaws.map((law: CyberLawSection, index: number) => {
        const examSummary = law.examSummary ?? [];
        const caseStudies = law.caseStudies ?? [];

        return (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-32 last:mb-8"
          >
            {/* Region Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge
                text={law.region}
                className={`
                  ${law.region === 'India' 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                  }
                `}
              />
            </motion.div>

            {/* Section Title */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-3 text-cyan-400">
                {law.title}
              </h2>
              <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400/50 via-cyan-400/20 to-transparent rounded-full" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg mb-12 max-w-4xl leading-relaxed"
            >
              {law.description}
            </motion.p>

            {/* ===============================
                EXAM SUMMARY
            =============================== */}
            {examSummary.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 p-8 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-400/20"
              >
                <h3 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-3">
                  <span className="text-3xl">📘</span>
                  Exam-Oriented Summary
                </h3>

                <ul className="space-y-3">
                  {examSummary.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="text-cyan-400 mt-1 text-lg">•</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ===============================
                CASE STUDIES - Premium Cards
            =============================== */}
            {caseStudies.length > 0 && (
              <section className="mb-20">
                <h3 className="text-3xl font-bold text-cyan-400 mb-10 flex items-center gap-3">
                  <span className="text-4xl">⚖️</span>
                  Case Studies
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {caseStudies.map((cs, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="
                        group relative p-8 rounded-2xl overflow-hidden
                        bg-gradient-to-br from-white/10 to-white/[0.02]
                        backdrop-blur-xl
                        border border-cyan-400/30
                        hover:border-cyan-400
                        shadow-[0_0_30px_rgba(34,211,238,0.15)]
                        hover:shadow-[0_0_50px_rgba(34,211,238,0.35)]
                        transition-all duration-300
                      "
                    >
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-blue-500/0 to-cyan-400/0 group-hover:from-cyan-400/10 group-hover:via-blue-500/10 group-hover:to-cyan-400/10 transition-all duration-500" />
                      
                      {/* Top corner glow */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative">
                        {/* Icon & Title */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-400/10 border border-cyan-400/30 group-hover:bg-cyan-400/20 transition-all duration-300 flex-shrink-0">
                            <span className="text-3xl">{cs.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-cyan-300 group-hover:text-cyan-400 transition-colors mb-2">
                              {cs.title}
                            </h4>
                            <p className="text-sm text-cyan-400/70 italic">
                              {cs.shortDescription}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {cs.description}
                        </p>

                        {/* Law Applied */}
                        <div className="mb-4 p-4 rounded-lg bg-cyan-500/5 border border-cyan-400/20">
                          <p className="text-sm text-cyan-400 font-medium mb-1">
                            ⚖️ Law Applied
                          </p>
                          <p className="text-gray-300 text-sm">{cs.lawApplied}</p>
                        </div>

                        {/* Impact */}
                        {cs.impact && (
                          <div className="mb-4 p-4 rounded-lg bg-orange-500/5 border border-orange-400/20">
                            <p className="text-sm text-orange-400 font-medium mb-1">
                              💥 Impact
                            </p>
                            <p className="text-gray-300 text-sm">{cs.impact}</p>
                          </div>
                        )}

                        {/* Punishment Hint */}
                        {cs.punishmentHint && (
                          <div className="mb-4 p-4 rounded-lg bg-red-500/5 border border-red-400/20">
                            <p className="text-sm text-red-400 font-medium mb-1">
                              ⚠️ Punishment
                            </p>
                            <p className="text-gray-300 text-sm">{cs.punishmentHint}</p>
                          </div>
                        )}

                        {/* Tags */}
                        {cs.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {cs.tags.map((tag, t) => (
                              <Badge
                                key={t}
                                text={tag}
                                className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                              />
                            ))}
                          </div>
                        )}

                        {/* Severity Badge */}
                        {cs.severity && (
                          <Badge
                            text={`Severity: ${cs.severity}`}
                            className={
                              cs.severity === "High"
                                ? "bg-red-500/20 text-red-400 border border-red-400/30"
                                : cs.severity === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                                : "bg-green-500/20 text-green-400 border border-green-400/30"
                            }
                          />
                        )}

                        {/* Exam Tip */}
                        {cs.examTip && (
                          <div className="mt-6 p-4 rounded-lg bg-purple-500/5 border border-purple-400/20">
                            <p className="text-sm text-purple-300 flex items-start gap-2">
                              <span className="text-lg">💡</span>
                              <span><strong>Exam Tip:</strong> {cs.examTip}</span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* ===============================
                LAW SECTIONS
            =============================== */}
            <div className="grid gap-6">
              {law.sections.map((section, i) => (
                <SectionCard
                  key={i}
                  heading={section.heading}
                  points={section.points}
                  index={i}
                />
              ))}
            </div>
          </motion.section>
        );
      })}
    </motion.div>
  );
}