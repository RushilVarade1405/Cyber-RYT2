import { motion } from "framer-motion";
import { cryptoData } from "../data/crypto";

export default function Cryptography() {
  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          PAGE HEADER
      =============================== */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-6 text-cyan-400"
      >
        Cryptography
      </motion.h1>

      <p className="text-gray-300 max-w-3xl mb-12">
        Cryptography is the foundation of modern cybersecurity. It ensures
        confidentiality, integrity, authentication, and non-repudiation of
        digital data using mathematical algorithms and secure key management.
      </p>

      {/* ===============================
          MAIN CONTENT
      =============================== */}
      {cryptoData.map((topic, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Topic Title */}
          <h2 className="text-3xl font-semibold text-cyan-300 mb-3">
            {topic.title}
          </h2>

          {/* Topic Description */}
          <p className="text-gray-300 mb-6 max-w-4xl">
            {topic.description}
          </p>

          {/* ===============================
              TOPIC SECTIONS
          =============================== */}
          <div className="grid md:grid-cols-2 gap-6">
            {topic.sections.map((section, secIndex) => (
              <motion.div
                key={secIndex}
                whileHover={{ scale: 1.02 }}
                className="bg-[#0b1224] border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition"
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
          </div>

          {/* ===============================
              EXTRA LEARNING BLOCK
          =============================== */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-xl p-6">
            <h4 className="text-cyan-300 font-semibold mb-3">
              🔐 Real-World Applications
            </h4>

            <div className="grid md:grid-cols-3 gap-4 text-gray-300 text-sm">
              <div>• Secure web communication (HTTPS, TLS)</div>
              <div>• Password hashing & authentication</div>
              <div>• Blockchain & cryptocurrencies</div>
              <div>• Digital signatures & certificates</div>
              <div>• Secure messaging apps</div>
              <div>• Data protection & compliance</div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* ===============================
          SECURITY BEST PRACTICES
      =============================== */}
      <div className="mt-20 bg-[#0b1224] border border-cyan-500/30 rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-cyan-400 mb-4">
          Cryptography Best Practices
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 max-w-4xl">
          <li>Never store plaintext passwords – always hash with salt.</li>
          <li>Use modern algorithms like AES-256, RSA-2048+, ECC.</li>
          <li>Avoid deprecated algorithms (MD5, SHA-1, DES).</li>
          <li>Protect private keys using hardware security modules.</li>
          <li>Rotate keys regularly and enforce access control.</li>
        </ul>
      </div>

    </div>
  );
}
