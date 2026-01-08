import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const securitySteps = [
  {
    step: "01",
    title: "Cryptographic Hashing",
    description:
      "Blockchain uses cryptographic hash functions to convert data into fixed-length hashes. Any change in data produces a completely different hash, instantly revealing tampering.",
  },
  {
    step: "02",
    title: "Public & Private Keys",
    description:
      "Users control assets using asymmetric cryptography. Private keys sign transactions while public keys allow others to verify authenticity without exposing sensitive information.",
  },
  {
    step: "03",
    title: "Digital Signatures",
    description:
      "Each transaction is digitally signed by the sender’s private key, ensuring authenticity, integrity, and non-repudiation of data.",
  },
  {
    step: "04",
    title: "Decentralized Network",
    description:
      "Data is distributed across thousands of nodes instead of a single server, eliminating single points of failure and reducing attack risks.",
  },
  {
    step: "05",
    title: "Consensus Mechanisms",
    description:
      "Mechanisms like Proof of Work and Proof of Stake ensure agreement among nodes, preventing malicious actors from controlling the network.",
  },
  {
    step: "06",
    title: "Block Linking",
    description:
      "Each block contains the cryptographic hash of the previous block, forming a secure chain that makes historical data extremely difficult to alter.",
  },
  {
    step: "07",
    title: "Immutability",
    description:
      "Once data is added and confirmed, it cannot be changed or deleted, ensuring permanent and tamper-resistant records.",
  },
  {
    step: "08",
    title: "Transparency & Auditability",
    description:
      "All transactions are publicly verifiable, allowing continuous auditing and trust without relying on centralized authorities.",
  },
];

export default function SecurityInBlockchain() {
  return (
    <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK LINK
      =============================== */}
      <Link to="/blockchain" className="text-green-400 hover:underline">
        ← Back to Blockchain
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-6 text-green-400"
      >
        Security in Blockchain
      </motion.h1>

      {/* ===============================
          KEY SECURITY BADGES
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-12"
      >
        {[
          ["Cryptography", "green"],
          ["Decentralization", "cyan"],
          ["Immutability", "purple"],
          ["Consensus Security", "orange"],
          ["Tamper Resistance", "blue"],
        ].map(([label, color]) => (
          <span
            key={label}
            className={`px-3 py-1 text-sm rounded-full bg-${color}-600/20
              text-${color}-400 border border-${color}-500/30`}
          >
            {label}
          </span>
        ))}
      </motion.div>

      {/* ===============================
          INTRODUCTION
      =============================== */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-300 leading-relaxed mb-16 max-w-4xl"
      >
        Blockchain security is built on a combination of{" "}
        <span className="text-green-300 font-semibold">cryptographic techniques</span>,{" "}
        <span className="text-cyan-300 font-semibold">decentralized architecture</span>, and{" "}
        <span className="text-purple-300 font-semibold">consensus mechanisms</span>.
        Instead of trusting a single authority, blockchain distributes trust across
        multiple nodes, ensuring data integrity, resistance to attacks, and transparent
        verification. This design makes blockchain systems highly secure, reliable,
        and resilient against fraud, tampering, and unauthorized access.
      </motion.p>

      {/* ===============================
          TITLE
      =============================== */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-10 text-green-400"
      >
        How Blockchain Ensures Security
      </motion.h1>

      {/* ===============================
          STEP BY STEP SECURITY PROCESS
      =============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {securitySteps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/60 border border-slate-700 rounded-xl p-6
              hover:border-green-400/50
              hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]
              transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-green-400">
                {item.step}
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ===============================
          FINAL NOTE
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-20 bg-gradient-to-r from-green-900/30 to-cyan-900/30
          border border-green-500/30 rounded-xl p-8"
      >
        <h2 className="text-2xl font-semibold mb-3 text-green-300">
          🔐 Blockchain Security Advantage
        </h2>
        <p className="text-gray-200 leading-relaxed max-w-3xl">
          By combining cryptography, decentralization, and consensus, blockchain
          creates a secure environment where data is protected, trust is distributed,
          and manipulation becomes practically impossible.
        </p>
      </motion.div>
    </div>
  );
}
