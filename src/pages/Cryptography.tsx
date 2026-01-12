import { motion } from "framer-motion";
import { cryptoData } from "../data/crypto";

export default function Cryptography() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative px-6 sm:px-10 py-16 max-w-7xl mx-auto text-white"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-12 w-96 h-96 bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-16 right-12 w-96 h-96 bg-blue-500/20 blur-[140px]" />
      </div>

      {/* ===============================
          PAGE HEADER
      =============================== */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold mb-6 text-cyan-400"
      >
        Cryptography
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-300 max-w-3xl mb-14 leading-relaxed"
      >
        Cryptography is the foundation of modern cybersecurity. It ensures
        confidentiality, integrity, authentication, and non-repudiation of
        digital data using mathematical algorithms and secure key management.
      </motion.p>

      {/* ===============================
          MAIN CONTENT
      =============================== */}
      {cryptoData.map((topic, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Topic Title */}
          <h2 className="text-3xl font-semibold text-cyan-300 mb-3">
            {topic.title}
          </h2>

          {/* Topic Description */}
          <p className="text-gray-300 mb-8 max-w-4xl">
            {topic.description}
          </p>

          {/* ===============================
              TOPIC SECTIONS
          =============================== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid md:grid-cols-2 gap-6"
          >
            {topic.sections.map((section, secIndex) => (
              <motion.div
                key={secIndex}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                className="
                  p-6 rounded-xl
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  hover:border-cyan-400/50
                  shadow-[0_0_25px_rgba(34,211,238,0.15)]
                  hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]
                  transition-all
                "
              >
                <h3 className="text-xl text-cyan-200 font-semibold mb-3">
                  {section.heading}
                </h3>

                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {section.points.map((point, pIndex) => (
                    <li key={pIndex}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* ===============================
              REAL-WORLD APPLICATIONS
          =============================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="
              mt-10 p-6 rounded-xl
              bg-gradient-to-r from-cyan-500/10 to-blue-500/10
              border border-cyan-400/20
              backdrop-blur-lg
            "
          >
            <h4 className="text-cyan-300 font-semibold mb-4">
              🔐 Real-World Applications
            </h4>

            <div className="grid md:grid-cols-3 gap-3 text-gray-300 text-sm">
              <div>• Secure web communication (HTTPS, TLS)</div>
              <div>• Password hashing & authentication</div>
              <div>• Blockchain & cryptocurrencies</div>
              <div>• Digital signatures & certificates</div>
              <div>• Secure messaging apps</div>
              <div>• Data protection & compliance</div>
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
        transition={{ duration: 0.5 }}
        className="
          mt-24 p-8 rounded-2xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_35px_rgba(34,211,238,0.2)]
        "
      >
        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">
          Cryptography Best Practices
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 max-w-4xl">
          <li>Never store plaintext passwords — always hash with salt.</li>
          <li>Use modern algorithms like AES-256, RSA-2048+, ECC.</li>
          <li>Avoid deprecated algorithms (MD5, SHA-1, DES).</li>
          <li>Protect private keys using hardware security modules.</li>
          <li>Rotate keys regularly and enforce strict access control.</li>
        </ul>
      </motion.section>
    </motion.div>
  );
}
