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
    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${className}`}
  >
    {text}
  </span>
);

type SectionCardProps = {
  heading: string;
  points: string[];
};

const SectionCard = ({ heading, points }: SectionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="
      p-6 rounded-xl
      bg-white/5 backdrop-blur-xl
      border border-white/10
      hover:border-cyan-400/40
      shadow-[0_0_25px_rgba(34,211,238,0.15)]
      transition
    "
  >
    <h3 className="text-xl font-semibold text-cyan-400 mb-4">
      {heading}
    </h3>

    <ul className="list-disc list-inside space-y-2 text-gray-300">
      {points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
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
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-10 w-96 h-96 bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-16 right-10 w-96 h-96 bg-blue-500/20 blur-[140px]" />
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
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">
          Cyber Laws
        </h1>

        <p className="text-gray-300 max-w-3xl leading-relaxed">
          A structured and exam-oriented overview of national and international
          cyber laws, regulations, and landmark case studies relevant to
          cybersecurity and digital forensics.
        </p>
      </motion.header>

      {/* ===============================
          QUICK NAVIGATION
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-6 mb-24"
      >
        <Link
          to="/cyber-laws/cyber-crimes"
          className="
            flex items-center gap-3 px-6 py-3 rounded-xl
            bg-white/5 backdrop-blur-xl
            border border-cyan-400/30 text-cyan-400
            transition-all
            hover:-translate-y-1
            hover:border-cyan-400
            hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
          "
        >
          ⚠️ <span className="font-semibold">Cyber Crimes</span>
        </Link>

        <Link
          to="/cyber-laws/it-act"
          className="
            flex items-center gap-3 px-6 py-3 rounded-xl
            bg-white/5 backdrop-blur-xl
            border border-emerald-400/30 text-emerald-400
            transition-all
            hover:-translate-y-1
            hover:border-emerald-400
            hover:shadow-[0_0_35px_rgba(52,211,153,0.35)]
          "
        >
          📜 <span className="font-semibold">IT Act, 2000</span>
        </Link>

        <Link
          to="/cyber-laws/ethics"
          className="
            flex items-center gap-3 px-6 py-3 rounded-xl
            bg-white/5 backdrop-blur-xl
            border border-purple-400/30 text-purple-400
            transition-all
            hover:-translate-y-1
            hover:border-purple-400
            hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]
          "
        >
          🧠 <span className="font-semibold">Cyber Ethics</span>
        </Link>
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
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-32"
          >
            <Badge
              text={law.region}
              className="mb-4 bg-cyan-500/20 text-cyan-400"
            />

            <h2 className="text-3xl font-semibold mb-3 text-cyan-300">
              {law.title}
            </h2>

            <p className="text-gray-300 mb-12 max-w-4xl">
              {law.description}
            </p>

            {/* ===============================
                EXAM SUMMARY
            =============================== */}
            {examSummary.length > 0 && (
              <div className="mb-20">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                  📘 Exam-Oriented Summary
                </h3>

                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {examSummary.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ===============================
                CASE STUDIES
            =============================== */}
            {caseStudies.length > 0 && (
              <section className="mb-24">
                <h3 className="text-3xl font-bold text-cyan-400 mb-12">
                  ⚖️ Case Studies
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {caseStudies.map((cs, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8 }}
                      className="
                        p-8 rounded-2xl
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        hover:border-cyan-400/50
                        shadow-[0_0_30px_rgba(34,211,238,0.2)]
                        transition-all
                      "
                    >
                      <h4 className="text-xl font-semibold text-cyan-300 mb-4">
                        {cs.title}
                      </h4>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {cs.description}
                      </p>

                      <p className="text-cyan-400 text-sm font-medium mb-4">
                        Law Applied: {cs.lawApplied}
                      </p>

                      {cs.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cs.tags.map((tag, t) => (
                            <Badge
                              key={t}
                              text={tag}
                              className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                            />
                          ))}
                        </div>
                      )}

                      {cs.severity && (
                        <Badge
                          text={`Severity: ${cs.severity}`}
                          className={
                            cs.severity === "High"
                              ? "bg-red-500/20 text-red-400"
                              : cs.severity === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }
                        />
                      )}

                      {cs.examTip && (
                        <p className="text-xs text-gray-400 italic mt-4">
                          💡 Exam Tip: {cs.examTip}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* ===============================
                LAW SECTIONS
            =============================== */}
            <div className="space-y-8">
              {law.sections.map((section, i) => (
                <SectionCard
                  key={i}
                  heading={section.heading}
                  points={section.points}
                />
              ))}
            </div>
          </motion.section>
        );
      })}
    </motion.div>
  );
}
