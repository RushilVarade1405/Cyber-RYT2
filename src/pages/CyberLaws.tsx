import { Link } from "react-router-dom";
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
  <div
    className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
    border border-cyan-500/30 rounded-xl p-6"
  >
    <h3 className="text-xl font-semibold text-cyan-400 mb-4">
      {heading}
    </h3>

    <ul className="list-disc list-inside space-y-2 text-gray-300">
      {points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  </div>
);

/* ===============================
    MAIN COMPONENT
================================ */

export default function CyberLaws() {
  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          PAGE HEADER
      =============================== */}
      <header className="mb-14">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">
          Cyber Laws
        </h1>

        <p className="text-gray-300 max-w-3xl">
          A structured and exam-oriented overview of national and international
          cyber laws, regulations, and landmark case studies relevant to
          cybersecurity and digital forensics.
        </p>
      </header>

      {/* ===============================
          QUICK NAVIGATION BUTTONS
      =============================== */}
      <div className="flex flex-wrap gap-6 mb-20">
        <Link
          to="/cyber-laws/cyber-crimes"
          className="flex items-center gap-3 px-6 py-3 rounded-xl
          border border-cyan-500/40 text-cyan-400
          bg-black/40 backdrop-blur
          transition-all duration-300
          hover:-translate-y-1
          hover:border-cyan-400
          hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
        >
          ⚠️ <span className="font-semibold">Cyber Crimes</span>
        </Link>

        <Link
          to="/cyber-laws/it-act"
          className="flex items-center gap-3 px-6 py-3 rounded-xl
          border border-emerald-500/40 text-emerald-400
          bg-black/40 backdrop-blur
          transition-all duration-300
          hover:-translate-y-1
          hover:border-emerald-400
          hover:shadow-[0_0_30px_rgba(52,211,153,0.35)]"
        >
          📜 <span className="font-semibold">IT Act, 2000</span>
        </Link>

        <Link
          to="/cyber-laws/cyber-ethics"
          className="flex items-center gap-3 px-6 py-3 rounded-xl
          border border-purple-500/40 text-purple-400
          bg-black/40 backdrop-blur
          transition-all duration-300
          hover:-translate-y-1
          hover:border-purple-400
          hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]"
        >
          🧠 <span className="font-semibold">Cyber Ethics</span>
        </Link>
      </div>

      {/* ===============================
          LAW SECTIONS
      =============================== */}
      {cyberLaws.map((law: CyberLawSection, index: number) => (
        <section key={index} className="mb-28">

          {/* Region */}
          <Badge
            text={law.region}
            className="mb-4 bg-cyan-500/20 text-cyan-400"
          />

          {/* Title */}
          <h2 className="text-3xl font-semibold mb-3 text-cyan-300">
            {law.title}
          </h2>

          {/* Description */}
          <p className="text-gray-300 mb-10 max-w-4xl">
            {law.description}
          </p>

          {/* ===============================
              EXAM SUMMARY
          =============================== */}
          {law.examSummary && law.examSummary.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                📘 Exam-Oriented Summary
              </h3>

              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {law.examSummary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ===============================
              CASE STUDIES
          =============================== */}
          {law.caseStudies && law.caseStudies.length > 0 && (
            <section className="mb-20">
              <h3 className="text-3xl font-bold text-cyan-400 mb-10">
                ⚖️ Case Studies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {law.caseStudies.map((cs, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-cyan-500/30
                    bg-black/50 p-8 hover:border-cyan-400/60 transition"
                  >
                    <h4 className="text-xl font-semibold text-cyan-300 mb-4">
                      {cs.title}
                    </h4>

                    <p className="text-gray-300 leading-relaxed mb-6">
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
                  </div>
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

        </section>
      ))}
    </div>
  );
}
