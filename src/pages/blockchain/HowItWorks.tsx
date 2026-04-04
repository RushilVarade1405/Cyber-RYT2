import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    step: "01",
    title: "Transaction Initiation",
    description:
      "A user initiates a transaction (cryptocurrency transfer, data storage, smart contract call) and digitally signs it using their private key, proving ownership and authenticity.",
    icon: "🚀",
  },
  {
    step: "02",
    title: "Network Broadcast",
    description:
      "The signed transaction is broadcast across the peer-to-peer network, reaching thousands of nodes simultaneously. Each node receives and stores it in their memory pool.",
    icon: "📡",
  },
  {
    step: "03",
    title: "Transaction Validation",
    description:
      "Network nodes independently verify the transaction by checking digital signatures, sufficient balances, compliance with protocol rules, and detecting double-spending attempts.",
    icon: "✅",
  },
  {
    step: "04",
    title: "Block Formation",
    description:
      "Valid transactions are collected and grouped into a candidate block along with metadata: timestamp, nonce, Merkle root, and the cryptographic hash of the previous block.",
    icon: "🧱",
  },
  {
    step: "05",
    title: "Consensus Achievement",
    description:
      "The network reaches agreement on the next valid block using mechanisms like Proof of Work (mining) or Proof of Stake (validator selection), ensuring decentralized decision-making.",
    icon: "🤝",
  },
  {
    step: "06",
    title: "Cryptographic Linking",
    description:
      "The validated block is cryptographically linked to the previous block using hash functions, creating an immutable chain where altering past data becomes computationally infeasible.",
    icon: "🔗",
  },
  {
    step: "07",
    title: "Network Synchronization",
    description:
      "All nodes update their local copies of the blockchain, propagating the new block across the network. This ensures every participant has an identical, consistent ledger.",
    icon: "🔄",
  },
  {
    step: "08",
    title: "Immutable Confirmation",
    description:
      "Once confirmed and buried under subsequent blocks, the transaction becomes permanent and tamper-resistant. It's now part of the immutable historical record accessible to all.",
    icon: "🔒",
  },
];

const keyComponents = [
  {
    title: "Blocks",
    description: "Containers holding transaction data, metadata, and cryptographic hashes",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Hash Functions",
    description: "Create unique digital fingerprints that detect any data tampering",
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Merkle Trees",
    description: "Efficient data structures enabling fast transaction verification",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Consensus",
    description: "Protocols ensuring network-wide agreement without central authority",
    color: "from-pink-500 to-cyan-500",
  },
];

export default function HowBlockchainWorks() {
  return (
    <div className="relative px-6 md:px-10 py-16 max-w-7xl mx-auto text-white">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* ===============================
          BACK LINK
      =============================== */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/blockchain"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Blockchain</span>
        </Link>
      </motion.div>

      {/* ===============================
          HEADER SECTION
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
          How Blockchain Works
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
      </motion.div>

      {/* ===============================
          KEY CONCEPT BADGES
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-12"
      >
        {[
          { label: "Distributed Ledger", color: "cyan" },
          { label: "Cryptographic Security", color: "blue" },
          { label: "Consensus Based", color: "purple" },
          { label: "Decentralized Network", color: "indigo" },
          { label: "Tamper Resistant", color: "cyan" },
        ].map((badge, index) => (
          <motion.span
            key={badge.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className={`
              px-4 py-2 text-sm rounded-full
              bg-${badge.color}-500/10 text-${badge.color}-400
              border border-${badge.color}-400/30
              hover:bg-${badge.color}-500/20 hover:border-${badge.color}-400/50
              transition-all duration-300 cursor-default
            `}
          >
            {badge.label}
          </motion.span>
        ))}
      </motion.div>

      {/* ===============================
          INTRODUCTION
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-400/20"
      >
        <p className="text-gray-300 leading-relaxed text-lg max-w-4xl">
          Blockchain is a{" "}
          <span className="text-cyan-400 font-semibold">distributed digital ledger</span>{" "}
          that maintains identical copies of data across thousands of interconnected nodes, eliminating the need for centralized control. 
          It records transactions—financial transfers, data exchanges, smart contract executions—in a{" "}
          <span className="text-green-400 font-semibold">secure</span>,{" "}
          <span className="text-blue-400 font-semibold">transparent</span>, and{" "}
          <span className="text-purple-400 font-semibold">immutable</span> manner.
          <br /><br />
          Security comes from cryptographic techniques that protect data integrity and verify identities. 
          Transparency allows all participants to independently audit transactions. 
          Immutability ensures that once recorded, data cannot be altered or deleted. 
          By combining cryptography, consensus mechanisms, and decentralization, blockchain creates a 
          trustless system where participants can transact directly without intermediaries like banks or governments.
        </p>
      </motion.div>

      {/* ===============================
          KEY COMPONENTS SECTION
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">Key Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyComponents.map((component, index) => (
            <motion.div
              key={component.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-5 rounded-xl bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${component.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <h3 className="relative text-lg font-semibold text-cyan-300 mb-2">{component.title}</h3>
              <p className="relative text-sm text-gray-400">{component.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===============================
          PROCESS TITLE
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-4xl font-bold mb-3 text-cyan-400">The Blockchain Process</h2>
        <p className="text-gray-400 text-lg">Step-by-step journey of a transaction</p>
      </motion.div>

      {/* ===============================
          STEP BY STEP PROCESS - Enhanced Cards
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative p-6 rounded-xl overflow-hidden
              bg-gradient-to-br from-slate-900/80 to-slate-800/60
              border border-cyan-400/20
              hover:border-cyan-400/60
              shadow-[0_0_20px_rgba(34,211,238,0.1)]
              hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]
              transition-all duration-300"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/10 group-hover:to-blue-500/10 transition-all duration-500" />
            
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-400/10 border border-cyan-400/30 group-hover:bg-cyan-400/20 transition-all duration-300">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <span className="text-3xl font-bold text-cyan-400/50">
                  {item.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-cyan-300 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===============================
          FINAL NOTE
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative p-8 rounded-2xl overflow-hidden
          bg-gradient-to-r from-cyan-900/20 to-blue-900/20
          border border-cyan-400/30
          shadow-[0_0_30px_rgba(34,211,238,0.15)]"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300 flex items-center gap-3">
            <span className="text-3xl">🔒</span>
            Why Blockchain Is Secure
          </h2>
          <p className="text-gray-200 leading-relaxed text-lg max-w-3xl">
            Blockchain security emerges from the synergy of cryptography, decentralization, and consensus. 
            Each step in the process reinforces trust—from cryptographic signing to network-wide validation—ensuring 
            data integrity, transparency, and resistance to manipulation. The immutable chain of blocks, 
            each linked to its predecessor, creates a tamper-evident record that would require astronomical 
            computational power to alter.
          </p>
        </div>
      </motion.div>
    </div>
  );
}