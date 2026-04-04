import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const contractSteps = [
  {
    step: "01",
    title: "Contract Definition",
    description:
      "Developers define business logic, rules, and conditions that will execute automatically. This includes specifying triggers, actions, state variables, and outcomes without requiring human intervention.",
    icon: "📝",
  },
  {
    step: "02",
    title: "Code Development",
    description:
      "Smart contracts are written using specialized languages like Solidity (Ethereum), Rust (Solana), or Vyper. The code defines all possible states, transitions, and enforcement mechanisms.",
    icon: "💻",
  },
  {
    step: "03",
    title: "Testing & Auditing",
    description:
      "Before deployment, contracts undergo rigorous testing on test networks and professional security audits to identify vulnerabilities, gas inefficiencies, and logic errors.",
    icon: "🔍",
  },
  {
    step: "04",
    title: "Blockchain Deployment",
    description:
      "The compiled contract is deployed to the blockchain via a transaction, receiving a unique address. Once deployed, the code becomes immutable and publicly accessible.",
    icon: "🚀",
  },
  {
    step: "05",
    title: "Event Monitoring",
    description:
      "The contract continuously monitors blockchain state and external data sources (via oracles) for predefined triggering conditions to be met.",
    icon: "👁️",
  },
  {
    step: "06",
    title: "Automatic Execution",
    description:
      "When conditions are satisfied, the contract executes programmed actions: transferring tokens, updating state, minting NFTs, or triggering other contracts—all autonomously.",
    icon: "⚡",
  },
  {
    step: "07",
    title: "Consensus Validation",
    description:
      "Network nodes independently verify the execution, ensuring correctness through consensus mechanisms. Invalid executions are rejected, protecting the network.",
    icon: "✅",
  },
  {
    step: "08",
    title: "Permanent Recording",
    description:
      "Execution results are permanently recorded on the blockchain. The immutable transaction history creates an auditable trail of all contract interactions.",
    icon: "📜",
  },
];

const useCases = [
  {
    title: "Decentralized Finance (DeFi)",
    description: "Lending, borrowing, and trading without intermediaries",
    examples: ["Automated lending protocols", "Decentralized exchanges", "Yield farming"],
    color: "from-purple-500 to-pink-500",
    icon: "💰",
  },
  {
    title: "NFTs & Digital Ownership",
    description: "Unique digital assets with provable ownership",
    examples: ["Digital art and collectibles", "Gaming items", "Event tickets"],
    color: "from-pink-500 to-rose-500",
    icon: "🎨",
  },
  {
    title: "Supply Chain",
    description: "Automated tracking and verification of goods",
    examples: ["Product authenticity", "Automated payments on delivery", "Inventory management"],
    color: "from-cyan-500 to-blue-500",
    icon: "📦",
  },
  {
    title: "Governance & DAOs",
    description: "Decentralized decision-making and treasury management",
    examples: ["Voting mechanisms", "Proposal execution", "Treasury allocation"],
    color: "from-blue-500 to-indigo-500",
    icon: "🏛️",
  },
];

export default function SmartContracts() {
  return (
    <div className="relative px-6 md:px-10 py-16 max-w-7xl mx-auto text-white">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
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
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
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
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Smart Contracts
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
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
          { label: "Self-Executing", color: "purple" },
          { label: "Trustless", color: "pink" },
          { label: "Immutable", color: "violet" },
          { label: "Transparent", color: "fuchsia" },
          { label: "Automated Logic", color: "purple" },
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
        className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-400/20"
      >
        <p className="text-gray-300 leading-relaxed text-lg max-w-4xl">
          Smart contracts are{" "}
          <span className="text-purple-400 font-semibold">self-executing digital agreements</span>{" "}
          stored immutably on the blockchain. They automatically enforce rules and execute actions when predefined 
          conditions are met—without requiring intermediaries, manual oversight, or trust in third parties.
          <br /><br />
          Powered by cryptography and distributed consensus, smart contracts revolutionize how agreements are made 
          and enforced. They enable trustless automation, reduce costs, eliminate delays, and create transparent, 
          verifiable systems. From decentralized finance to supply chain management, smart contracts are the 
          programmable layer that transforms blockchain from a database into a global computation platform.
        </p>
      </motion.div>

      {/* ===============================
          USE CASES SECTION
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-400">Real-World Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-xl bg-white/5 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{useCase.icon}</span>
                  <h3 className="text-xl font-semibold text-purple-300">{useCase.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.examples.map((example, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
        <h2 className="text-4xl font-bold mb-3 text-purple-400">Smart Contract Lifecycle</h2>
        <p className="text-gray-400 text-lg">From concept to execution and beyond</p>
      </motion.div>

      {/* ===============================
          STEP BY STEP PROCESS - Enhanced Cards
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {contractSteps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative p-6 rounded-xl overflow-hidden
              bg-gradient-to-br from-slate-900/80 to-slate-800/60
              border border-purple-400/20
              hover:border-purple-400/60
              shadow-[0_0_20px_rgba(168,85,247,0.1)]
              hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]
              transition-all duration-300"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-500/0 group-hover:from-purple-400/10 group-hover:to-pink-500/10 transition-all duration-500" />
            
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-400/10 border border-purple-400/30 group-hover:bg-purple-400/20 transition-all duration-300">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <span className="text-3xl font-bold text-purple-400/50">
                  {item.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-purple-300 group-hover:text-purple-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===============================
          SECURITY CONSIDERATIONS
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-rose-900/20 to-orange-900/20 border border-rose-400/30"
      >
        <h2 className="text-2xl font-semibold mb-4 text-rose-300 flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          Security Considerations
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-rose-200 mb-3">Common Vulnerabilities</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">•</span>
                <span>Reentrancy attacks exploiting external calls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">•</span>
                <span>Integer overflow/underflow errors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">•</span>
                <span>Access control vulnerabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">•</span>
                <span>Front-running and MEV exploitation</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-200 mb-3">Best Practices</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Professional security audits before deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Extensive testing on testnets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Use of established libraries and patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Formal verification of critical logic</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ===============================
          FINAL NOTE
      =============================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative p-8 rounded-2xl overflow-hidden
          bg-gradient-to-r from-purple-900/20 to-pink-900/20
          border border-purple-400/30
          shadow-[0_0_30px_rgba(168,85,247,0.15)]"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300 flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            The Power of Programmable Agreements
          </h2>
          <p className="text-gray-200 leading-relaxed text-lg max-w-3xl">
            Smart contracts represent a fundamental shift in how we create and enforce agreements. 
            By replacing trust in institutions with trust in code and cryptography, they enable 
            unprecedented automation, transparency, and efficiency. As the technology matures and 
            security practices evolve, smart contracts are becoming the foundation for a new generation 
            of decentralized applications that operate without intermediaries, borders, or downtime.
          </p>
        </div>
      </motion.div>
    </div>
  );
}