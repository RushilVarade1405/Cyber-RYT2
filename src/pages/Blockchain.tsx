import { blockchainData } from "../data/blockchain";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Blockchain() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative px-6 sm:px-10 py-14 max-w-7xl mx-auto text-white"
    >
      {/* Enhanced Background glow effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-12 w-96 h-96 bg-cyan-500/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 right-12 w-96 h-96 bg-blue-500/20 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 blur-[180px]" />
      </div>

      {/* ===============================
          PAGE TITLE
      =============================== */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Blockchain
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
      </motion.div>

      {/* ===============================
          BLOCKCHAIN NAV - Enhanced Cards
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
      >
        {[
          { label: "How It Works", path: "/blockchain/how-it-works", icon: "⚙️" },
          { label: "Security", path: "/blockchain/security", icon: "🔒" },
          { label: "Smart Contracts", path: "/blockchain/smart-contracts", icon: "📜" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={item.path}
              className="
                group relative block p-5 rounded-xl overflow-hidden
                bg-gradient-to-br from-cyan-500/10 to-blue-500/10
                border border-cyan-400/30
                hover:border-cyan-400
                transition-all duration-300
              "
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/20 group-hover:to-blue-500/20 transition-all duration-300" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/10 blur-2xl group-hover:bg-cyan-400/30 transition-all duration-300" />
              
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-cyan-400 group-hover:text-cyan-300 font-semibold transition-colors">
                  {item.label}
                </span>
              </div>
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
          {/* Topic title with enhanced styling */}
          <div className="mb-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-3 text-cyan-400"
            >
              {topic.title}
            </motion.h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400/50 via-cyan-400/20 to-transparent rounded-full" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 leading-relaxed mb-10 max-w-4xl text-lg"
          >
            {topic.description}
          </motion.p>

          {/* ===============================
              THEORY SECTIONS - Enhanced Cards
          =============================== */}
          {topic.sections && (
            <div className="grid gap-6 mb-10">
              {topic.sections.map((section, secIndex) => (
                <motion.div
                  key={secIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: secIndex * 0.1 }}
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
                  {/* Animated corner gradients */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
                  
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <h3 className="text-xl text-cyan-300 font-semibold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                      {section.heading}
                    </h3>

                    <ul className="space-y-3">
                      {section.points.map((point, pIndex) => (
                        <motion.li
                          key={pIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: pIndex * 0.05 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="text-cyan-400 mt-1 text-sm">▹</span>
                          <span className="flex-1">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* ===============================
              PLATFORMS - Premium Cards
          =============================== */}
          {topic.platforms && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10"
            >
              {topic.platforms.map((platform, pIndex) => (
                <motion.div
                  key={pIndex}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="
                    group relative p-6 rounded-xl overflow-hidden
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
                  
                  {/* Bottom corner accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="relative">
                    {/* Platform icon/badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-400/10 border border-cyan-400/30 mb-4 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300">
                      <span className="text-2xl">🔗</span>
                    </div>

                    <h3 className="text-xl text-cyan-300 font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                      {platform.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-5 leading-relaxed min-h-[3rem]">
                      {platform.description}
                    </p>

                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg overflow-hidden
                        border border-cyan-400/50 
                        text-cyan-400 font-medium text-sm
                        hover:text-black
                        transition-colors duration-300
                        group/btn
                      "
                    >
                      {/* Button background that fills on hover */}
                      <span className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                      
                      <span className="relative z-10">Visit Platform</span>
                      <span className="relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      ))}
    </motion.div>
  );
}