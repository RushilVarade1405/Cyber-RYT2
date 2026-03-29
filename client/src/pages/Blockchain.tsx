import { blockchainData } from "../data/blockchain";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Blockchain() {
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
      <motion.div
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
          Distributed Ledger
        </motion.div>

        <h1 className="text-5xl sm:text-6xl font-bold mb-5 leading-tight">
          <span className="text-white">Block</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            chain
          </span>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="origin-left h-px w-48 bg-gradient-to-r from-cyan-500 to-transparent"
        />
      </motion.div>

      {/* ===============================
          NAV CARDS
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-20"
      >
        {[
          { label: "How It Works", path: "/blockchain/how-it-works", icon: "⚙️", desc: "Core mechanics" },
          { label: "Security", path: "/blockchain/security", icon: "🔒", desc: "Threat & protection" },
          { label: "Smart Contracts", path: "/blockchain/smart-contracts", icon: "📜", desc: "Self-executing code" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + index * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Link
              to={item.path}
              className="
                group relative flex items-center gap-3
                px-4 py-3.5 rounded-xl overflow-hidden
                bg-white/[0.03] backdrop-blur-xl
                border border-white/[0.07]
                hover:border-cyan-400/40
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]
              "
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-lg flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {item.label}
                </div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
              <svg
                className="w-3.5 h-3.5 text-cyan-500/50 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400/60 to-blue-500/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* ===============================
          CONTENT
      =============================== */}
      {blockchainData.map((topic, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-24 last:mb-8"
        >
          {/* Topic Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="mt-1.5 flex-shrink-0 w-7 h-7 rounded-md bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-3">
                {topic.title.split(" ")[0]}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {topic.title.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 via-cyan-400/10 to-transparent rounded-full" />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 leading-relaxed mb-10 max-w-4xl pl-11"
          >
            {topic.description}
          </motion.p>

          {/* ===============================
              THEORY SECTIONS — Compact 2-col grid
          =============================== */}
          {topic.sections && (
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {topic.sections.map((section, secIndex) => (
                <motion.div
                  key={secIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: secIndex * 0.07 }}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className="
                    group relative p-5 rounded-xl overflow-hidden
                    bg-white/[0.03] backdrop-blur-xl
                    border border-white/[0.06]
                    hover:border-cyan-400/35
                    transition-all duration-300
                  "
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-cyan-500/[0.04] to-blue-500/[0.04] rounded-xl" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <h3 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500 inline-block flex-shrink-0" />
                      {section.heading}
                    </h3>

                    <ul className="space-y-2">
                      {section.points.map((point, pIndex) => (
                        <li
                          key={pIndex}
                          className="flex items-start gap-2 text-gray-400 text-xs leading-relaxed"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-cyan-500/70 flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                          </svg>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                </motion.div>
              ))}
            </div>
          )}

          {/* ===============================
              PLATFORMS — Compact attractive cards
          =============================== */}
          {topic.platforms && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-8"
            >
              {topic.platforms.map((platform, pIndex) => (
                <motion.div
                  key={pIndex}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.97 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.18 } }}
                  className="
                    group relative p-5 rounded-xl overflow-hidden
                    bg-white/[0.03] backdrop-blur-xl
                    border border-white/[0.07]
                    hover:border-cyan-400/40
                    transition-all duration-300
                    hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]
                  "
                >
                  {/* Top shimmer */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Corner glow */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    {/* Header row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-base flex-shrink-0 group-hover:bg-cyan-500/15 transition-colors duration-300">
                        🔗
                      </div>
                      <h3 className="text-sm font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors leading-tight">
                        {platform.name}
                      </h3>
                    </div>

                    <p className="text-gray-500 text-xs mb-4 leading-relaxed line-clamp-3">
                      {platform.description}
                    </p>

                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        relative inline-flex items-center gap-1.5
                        px-3 py-1.5 rounded-lg overflow-hidden
                        border border-cyan-400/30
                        text-cyan-400 text-xs font-medium
                        hover:text-black
                        transition-colors duration-300
                        group/btn
                      "
                    >
                      <span className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                      <span className="relative z-10">Visit</span>
                      <span className="relative z-10 group-hover/btn:translate-x-0.5 transition-transform duration-300">→</span>
                    </a>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      ))}
    </motion.div>
  );
}