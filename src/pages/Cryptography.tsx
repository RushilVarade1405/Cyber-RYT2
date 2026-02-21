import { motion } from "framer-motion";
import { cryptoData } from "../data/crypto";

export default function Cryptography() {
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 blur-[200px] rounded-full" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
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
      <div className="mb-16 relative">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Security Module
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl font-bold mb-5 leading-tight"
        >
          <span className="text-white">Crypto</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            graphy
          </span>
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="origin-left h-px w-48 bg-gradient-to-r from-cyan-500 to-transparent mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 max-w-3xl leading-relaxed text-lg"
        >
          Cryptography is the foundation of modern cybersecurity. It ensures
          confidentiality, integrity, authentication, and non-repudiation of
          digital data using mathematical algorithms and secure key management.
        </motion.p>
      </div>

      {/* ===============================
          MAIN CONTENT
      =============================== */}
      {cryptoData.map((topic, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-24"
        >
          {/* Topic Header */}
          <div className="flex items-start gap-4 mb-4">
            {/* Index badge */}
            <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-sm font-bold">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white leading-tight">
                {topic.title}
              </h2>
            </div>
          </div>

          {/* Topic Description */}
          <p className="text-gray-400 mb-10 max-w-4xl pl-12 leading-relaxed">
            {topic.description}
          </p>

          {/* ===============================
              TOPIC SECTIONS GRID
          =============================== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 gap-5"
          >
            {topic.sections.map((section, secIndex) => (
              <motion.div
                key={secIndex}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-2xl overflow-hidden
                  bg-white/[0.03] backdrop-blur-xl
                  border border-white/[0.07]
                  hover:border-cyan-400/40
                  transition-all duration-300"
              >
                {/* Card inner glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-bl-2xl">
                  <div className="absolute -top-1 -right-1 w-12 h-12 bg-cyan-500/10 border-l border-b border-cyan-500/20 rounded-bl-xl" />
                </div>

                <h3 className="text-lg text-cyan-300 font-semibold mb-4 relative z-10 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500 inline-block flex-shrink-0" />
                  {section.heading}
                </h3>

                <ul className="space-y-2.5 relative z-10">
                  {section.points.map((point, pIndex) => (
                    <li
                      key={pIndex}
                      className="flex items-start gap-2.5 text-gray-400 text-sm leading-relaxed"
                    >
                      <svg
                        className="w-4 h-4 text-cyan-500/70 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* ===============================
              REAL-WORLD APPLICATIONS
          =============================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-8 p-6 rounded-2xl relative overflow-hidden
              border border-cyan-400/20
              bg-gradient-to-br from-cyan-500/[0.07] via-transparent to-blue-500/[0.07]
              backdrop-blur-lg"
          >
            {/* Decorative blobs */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-5 relative z-10">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-base">
                🔐
              </div>
              <h4 className="text-cyan-300 font-semibold tracking-wide text-sm uppercase">
                Real-World Applications
              </h4>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
              {[
                "Secure web communication (HTTPS, TLS)",
                "Password hashing & authentication",
                "Blockchain & cryptocurrencies",
                "Digital signatures & certificates",
                "Secure messaging apps",
                "Data protection & compliance",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-gray-400 text-sm px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      ))}

      {/* ===============================
          BEST PRACTICES
      =============================== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mt-10 p-8 rounded-2xl overflow-hidden
          bg-white/[0.03] backdrop-blur-xl
          border border-white/[0.08]"
      >
        {/* Decorative top border gradient */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center text-lg">
            🛡️
          </div>
          <h2 className="text-2xl font-bold text-white">
            Cryptography{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Best Practices
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 relative z-10">
          {[
            { icon: "🔑", text: "Never store plaintext passwords — always hash with salt." },
            { icon: "⚙️", text: "Use modern algorithms like AES-256, RSA-2048+, ECC." },
            { icon: "🚫", text: "Avoid deprecated algorithms (MD5, SHA-1, DES)." },
            { icon: "🔒", text: "Protect private keys using hardware security modules." },
            { icon: "🔄", text: "Rotate keys regularly and enforce strict access control." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/25 transition-colors"
            >
              <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
              <span className="text-gray-400 text-sm leading-relaxed">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}