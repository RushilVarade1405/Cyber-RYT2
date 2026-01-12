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
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-12 w-96 h-96 bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-10 right-12 w-96 h-96 bg-blue-500/20 blur-[140px]" />
      </div>

      {/* ===============================
          PAGE TITLE
      =============================== */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-4xl font-bold mb-12"
      >
        Blockchain
      </motion.h1>

      {/* ===============================
          BLOCKCHAIN NAV
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-wrap gap-4 mb-16"
      >
        {[
          { label: "How It Works", path: "/blockchain/how-it-works" },
          { label: "Security", path: "/blockchain/security" },
          { label: "Smart Contracts", path: "/blockchain/smart-contracts" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="
              px-5 py-2 rounded-lg
              bg-white/5 backdrop-blur-md
              border border-white/20
              text-cyan-400
              hover:bg-cyan-400 hover:text-black
              hover:border-cyan-400
              transition
            "
          >
            {item.label}
          </Link>
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
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          {/* Topic title */}
          <h2 className="text-2xl text-cyan-400 font-semibold mb-2">
            {topic.title}
          </h2>

          <p className="text-gray-300 mb-8 max-w-4xl">
            {topic.description}
          </p>

          {/* ===============================
              THEORY SECTIONS
          =============================== */}
          {topic.sections &&
            topic.sections.map((section, secIndex) => (
              <motion.div
                key={secIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="
                  mb-5 p-5 rounded-xl
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  hover:border-cyan-400/40
                  shadow-[0_0_25px_rgba(34,211,238,0.15)]
                  transition
                "
              >
                <h3 className="text-cyan-300 font-semibold mb-2">
                  {section.heading}
                </h3>

                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {section.points.map((point, pIndex) => (
                    <li key={pIndex}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}

          {/* ===============================
              PLATFORMS
          =============================== */}
          {topic.platforms && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10"
            >
              {topic.platforms.map((platform, pIndex) => (
                <motion.div
                  key={pIndex}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -8 }}
                  className="
                    p-6 rounded-xl
                    bg-white/5 backdrop-blur-xl
                    border border-white/10
                    hover:border-cyan-400/50
                    shadow-[0_0_25px_rgba(34,211,238,0.2)]
                    hover:shadow-[0_0_45px_rgba(34,211,238,0.35)]
                    transition-all
                  "
                >
                  <h3 className="text-cyan-300 font-semibold text-lg mb-2">
                    {platform.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4">
                    {platform.description}
                  </p>

                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-block px-4 py-2 rounded-lg
                      border border-cyan-400 text-cyan-400
                      hover:bg-cyan-400 hover:text-black
                      transition font-medium
                    "
                  >
                    Visit Platform →
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      ))}
    </motion.div>
  );
}
