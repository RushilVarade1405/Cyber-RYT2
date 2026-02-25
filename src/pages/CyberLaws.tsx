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
    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full tracking-wide ${className}`}
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
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="
      group relative p-6 rounded-2xl overflow-hidden
      bg-white/[0.03] backdrop-blur-xl
      border border-white/[0.07]
      hover:border-cyan-400/40
      transition-all duration-300
    "
  >
    {/* Corner glow */}
    <div className="absolute -top-8 -right-8 w-36 h-36 bg-cyan-400/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Top accent line */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Left accent bar */}
    <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

    <div className="relative">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        </span>
        <span className="text-cyan-300">{heading}</span>
      </h3>

      <ul className="space-y-2.5 pl-1">
        {points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed"
          >
            <svg
              className="w-4 h-4 text-cyan-500/70 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            <span>{point}</span>
          </motion.li>
        ))}
      </ul>
    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
      transition={{ duration: 0.7 }}
      className="relative px-6 sm:px-10 py-20 max-w-7xl mx-auto text-white"
    >
      {/* ===============================
          AMBIENT BACKGROUND
      =============================== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-900/10 blur-[200px] rounded-full" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
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
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Legal Framework
        </motion.div>

        <h1 className="text-5xl sm:text-6xl font-bold mb-5 leading-tight">
          <span className="text-white">Cyber </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Laws
          </span>
        </h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="origin-left h-px w-48 bg-gradient-to-r from-cyan-500 to-transparent mb-6"
        />

        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
          A comprehensive overview of national and international cyber laws, regulations,
          and landmark case studies relevant to cybersecurity, digital forensics, and data protection.
        </p>
      </motion.header>

      {/* ===============================
          QUICK NAVIGATION
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-24"
      >
        {[
          {
            path: "/cyber-laws/cyber-crimes",
            icon: "⚠️",
            label: "Cyber Crimes",
            desc: "Types, methods & penalties",
            colorClass: "red",
          },
          {
            path: "/cyber-laws/it-act",
            icon: "📜",
            label: "IT Act, 2000",
            desc: "India's digital legal backbone",
            colorClass: "emerald",
          },
          {
            path: "/cyber-laws/ethics",
            icon: "🧠",
            label: "Cyber Ethics",
            desc: "Principles of digital conduct",
            colorClass: "purple",
          },
        ].map((item, index) => {
          const colors: Record<string, { border: string; bg: string; text: string; glow: string; icon: string }> = {
            red: {
              border: "border-red-400/25 hover:border-red-400/60",
              bg: "bg-red-500/5 hover:bg-red-500/10",
              text: "text-red-400",
              glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
              icon: "bg-red-500/10 border-red-400/20",
            },
            emerald: {
              border: "border-emerald-400/25 hover:border-emerald-400/60",
              bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
              text: "text-emerald-400",
              glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]",
              icon: "bg-emerald-500/10 border-emerald-400/20",
            },
            purple: {
              border: "border-purple-400/25 hover:border-purple-400/60",
              bg: "bg-purple-500/5 hover:bg-purple-500/10",
              text: "text-purple-400",
              glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
              icon: "bg-purple-500/10 border-purple-400/20",
            },
          };
          const c = colors[item.colorClass];

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                to={item.path}
                className={`
                  group relative flex items-center gap-4
                  px-5 py-4 rounded-2xl overflow-hidden
                  border backdrop-blur-xl
                  transition-all duration-300
                  ${c.border} ${c.bg} ${c.glow}
                `}
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center text-xl ${c.icon}`}>
                  {item.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${c.text}`}>{item.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                </div>

                {/* Arrow */}
                <svg
                  className={`w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${c.text}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>

                {/* Bottom line */}
                <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${c.text} opacity-40`} />
              </Link>
            </motion.div>
          );
        })}
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
            {/* Region Badge + Section Title */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <Badge
                  text={law.region}
                  className={
                    law.region === "India"
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-400/30"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30"
                  }
                />
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </motion.div>

              <h2 className="text-4xl font-bold mb-4">
                <span className="text-white">{law.title.split(" ")[0]} </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {law.title.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 via-cyan-400/10 to-transparent rounded-full" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg mb-12 max-w-4xl leading-relaxed"
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
                className="mb-16 p-7 rounded-2xl relative overflow-hidden
                  bg-gradient-to-br from-cyan-500/[0.07] via-transparent to-blue-500/[0.07]
                  border border-cyan-400/20 backdrop-blur-lg"
              >
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-lg">
                    📘
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-300 tracking-wide">
                    Exam-Oriented Summary
                  </h3>
                </div>

                <ul className="space-y-2.5 relative z-10">
                  {examSummary.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed"
                    >
                      <svg
                        className="w-4 h-4 text-cyan-500/80 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ===============================
                CASE STUDIES
            =============================== */}
            {caseStudies.length > 0 && (
              <section className="mb-20">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-lg">
                    ⚖️
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Case{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      Studies
                    </span>
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {caseStudies.map((cs, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 280 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="
                        group relative p-7 rounded-2xl overflow-hidden
                        bg-white/[0.03] backdrop-blur-xl
                        border border-white/[0.07]
                        hover:border-cyan-400/40
                        transition-all duration-300
                        hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]
                      "
                    >
                      {/* Corner glow */}
                      <div className="absolute -top-8 -right-8 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative">
                        {/* Icon & Title */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="flex items-center justify-center w-13 h-13 w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 group-hover:bg-cyan-400/15 transition-all duration-300 flex-shrink-0 text-2xl">
                            {cs.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
                              {cs.title}
                            </h4>
                            <p className="text-xs text-cyan-400/60 italic">
                              {cs.shortDescription}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                          {cs.description}
                        </p>

                        {/* Info blocks */}
                        <div className="space-y-3 mb-4">
                          {/* Law Applied */}
                          <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-400/15">
                            <p className="text-xs text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
                              <span>⚖️</span> Law Applied
                            </p>
                            <p className="text-gray-400 text-sm">{cs.lawApplied}</p>
                          </div>

                          {cs.impact && (
                            <div className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-400/15">
                              <p className="text-xs text-orange-400 font-semibold mb-1 flex items-center gap-1.5">
                                <span>💥</span> Impact
                              </p>
                              <p className="text-gray-400 text-sm">{cs.impact}</p>
                            </div>
                          )}

                          {cs.punishmentHint && (
                            <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-400/15">
                              <p className="text-xs text-red-400 font-semibold mb-1 flex items-center gap-1.5">
                                <span>⚠️</span> Punishment
                              </p>
                              <p className="text-gray-400 text-sm">{cs.punishmentHint}</p>
                            </div>
                          )}
                        </div>

                        {/* Tags row */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {cs.tags?.map((tag, t) => (
                            <Badge
                              key={t}
                              text={tag}
                              className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px]"
                            />
                          ))}
                          {cs.severity && (
                            <Badge
                              text={`${cs.severity} Severity`}
                              className={
                                cs.severity === "High"
                                  ? "bg-red-500/15 text-red-400 border border-red-400/25"
                                  : cs.severity === "Medium"
                                  ? "bg-yellow-500/15 text-yellow-400 border border-yellow-400/25"
                                  : "bg-green-500/15 text-green-400 border border-green-400/25"
                              }
                            />
                          )}
                        </div>

                        {/* Exam Tip */}
                        {cs.examTip && (
                          <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-400/15">
                            <p className="text-xs text-purple-300 flex items-start gap-2">
                              <span className="text-base flex-shrink-0">💡</span>
                              <span>
                                <strong>Exam Tip:</strong> {cs.examTip}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* ===============================
                LAW SECTIONS
            =============================== */}
            <div className="grid md:grid-cols-2 gap-5">
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