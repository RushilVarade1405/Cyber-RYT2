import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const securitySteps = [
  {
    step: "01",
    title: "Cryptographic Hashing",
    description:
      "SHA-256 and other hash functions convert transaction data into fixed-length, unique fingerprints. Any modification to the input—even a single bit—produces a completely different hash, instantly revealing tampering attempts.",
    icon: "🔐",
  },
  {
    step: "02",
    title: "Public-Key Cryptography",
    description:
      "Asymmetric encryption uses mathematically linked key pairs. Users control assets with private keys (kept secret) while public keys allow others to verify signatures and send transactions without exposing sensitive information.",
    icon: "🔑",
  },
  {
    step: "03",
    title: "Digital Signatures",
    description:
      "Every transaction is signed with the sender's private key, creating a unique digital signature. This proves authenticity, ensures data integrity, and provides non-repudiation—the sender cannot deny the transaction.",
    icon: "✍️",
  },
  {
    step: "04",
    title: "Decentralized Architecture",
    description:
      "Data is replicated across thousands of independent nodes globally, eliminating single points of failure. To compromise the network, an attacker would need to simultaneously control the majority of nodes—economically and computationally infeasible.",
    icon: "🌐",
  },
  {
    step: "05",
    title: "Consensus Validation",
    description:
      "Mechanisms like Proof of Work and Proof of Stake require network-wide agreement before adding blocks. This democratic validation prevents malicious actors from unilaterally altering the ledger or inserting fraudulent transactions.",
    icon: "🤝",
  },
  {
    step: "06",
    title: "Cryptographic Chaining",
    description:
      "Each block contains the hash of its predecessor, creating an unbreakable chain. Modifying historical data would require recalculating all subsequent block hashes—a task requiring more computational power than the entire network possesses.",
    icon: "⛓️",
  },
  {
    step: "07",
    title: "Immutability Guarantee",
    description:
      "Once transactions are confirmed and buried under multiple blocks, they become computationally irreversible. The deeper a transaction is in the chain, the more secure it becomes—creating permanent, tamper-proof records.",
    icon: "🛡️",
  },
  {
    step: "08",
    title: "Transparent Auditability",
    description:
      "All transactions are publicly visible and independently verifiable by anyone. This transparency enables continuous auditing, fraud detection, and trust verification without relying on centralized authorities or opaque systems.",
    icon: "🔍",
  },
];

const securityLayers = [
  {
    title: "Network Security",
    items: [
      "Distributed hash power prevents 51% attacks",
      "Byzantine Fault Tolerance handles malicious nodes",
      "Sybil resistance through economic costs",
      "DDoS protection via decentralization",
    ],
    color: "from-emerald-500 to-cyan-500",
    icon: "🌐",
  },
  {
    title: "Cryptographic Security",
    items: [
      "256-bit encryption makes brute force impossible",
      "Elliptic curve signatures verify authenticity",
      "Zero-knowledge proofs enable private verification",
      "Merkle trees optimize transaction validation",
    ],
    color: "from-cyan-500 to-blue-500",
    icon: "🔒",
  },
  {
    title: "Operational Security",
    items: [
      "Multi-signature wallets require multiple approvals",
      "Hardware wallets provide offline key storage",
      "Time-locked transactions prevent premature execution",
      "Emergency pause mechanisms in smart contracts",
    ],
    color: "from-blue-500 to-purple-500",
    icon: "⚙️",
  },
  {
    title: "Economic Security",
    items: [
      "Staking mechanisms align validator incentives",
      "Slashing penalties punish malicious behavior",
      "Mining costs make attacks economically unfeasible",
      "Game theory ensures honest participation",
    ],
    color: "from-purple-500 to-pink-500",
    icon: "💎",
  },
];

const threats = [
  { name: "51% Attack", mitigation: "High hash power distribution and economic costs" },
  { name: "Sybil Attack", mitigation: "Proof of Work or Proof of Stake requirements" },
  { name: "Double Spending", mitigation: "Consensus mechanisms and confirmation requirements" },
  { name: "Smart Contract Bugs", mitigation: "Audits, formal verification, and bug bounties" },
  { name: "Phishing & Social Engineering", mitigation: "User education and wallet security practices" },
  { name: "Quantum Computing", mitigation: "Research into quantum-resistant cryptography" },
];

export default function SecurityInBlockchain() {
  return (
    <div className="relative px-6 md:px-10 py-16 max-w-7xl mx-auto text-white">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
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
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
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
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent">
          Blockchain Security
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full" />
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
          { label: "Cryptography", color: "emerald" },
          { label: "Decentralization", color: "cyan" },
          { label: "Immutability", color: "blue" },
          { label: "Consensus Security", color: "teal" },
          { label: "Transparency", color: "green" },
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
        className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-400/20"
      >
        <p className="text-gray-300 leading-relaxed text-lg max-w-4xl">
          Blockchain security is engineered through multiple layers of protection combining{" "}
          <span className="text-emerald-400 font-semibold">cryptographic techniques</span>,{" "}
          <span className="text-cyan-400 font-semibold">decentralized architecture</span>, and{" "}
          <span className="text-blue-400 font-semibold">consensus mechanisms</span>.
          <br /><br />
          Unlike traditional systems that rely on perimeter security and trusted administrators, 
          blockchain distributes trust across thousands of independent nodes. Each participant 
          can verify transactions independently, and the network only accepts changes when the 
          majority agrees. This creates a system that's highly resistant to attacks, tampering, 
          and unauthorized access—even in adversarial environments where participants don't trust each other.
        </p>
      </motion.div>

      {/* ===============================
          SECURITY LAYERS SECTION
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6 text-emerald-400">Multi-Layer Security Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityLayers.map((layer, index) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-xl bg-white/5 border border-emerald-400/20 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${layer.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{layer.icon}</span>
                  <h3 className="text-xl font-semibold text-emerald-300">{layer.title}</h3>
                </div>
                <ul className="space-y-2">
                  {layer.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-emerald-400 mt-1">▹</span>
                      <span>{item}</span>
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
        <h2 className="text-4xl font-bold mb-3 text-emerald-400">Security Mechanisms</h2>
        <p className="text-gray-400 text-lg">How blockchain protects your data</p>
      </motion.div>

      {/* ===============================
          SECURITY STEPS - Enhanced Cards
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {securitySteps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative p-6 rounded-xl overflow-hidden
              bg-gradient-to-br from-slate-900/80 to-slate-800/60
              border border-emerald-400/20
              hover:border-emerald-400/60
              shadow-[0_0_20px_rgba(16,185,129,0.1)]
              hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]
              transition-all duration-300"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-cyan-500/0 group-hover:from-emerald-400/10 group-hover:to-cyan-500/10 transition-all duration-500" />
            
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-400/10 border border-emerald-400/30 group-hover:bg-emerald-400/20 transition-all duration-300">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <span className="text-3xl font-bold text-emerald-400/50">
                  {item.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-emerald-300 group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===============================
          THREATS & MITIGATIONS
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-6 text-emerald-400">Common Threats & Mitigations</h2>
        <div className="grid gap-4">
          {threats.map((threat, index) => (
            <motion.div
              key={threat.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-5 rounded-xl bg-gradient-to-r from-slate-900/60 to-slate-800/40 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-rose-300 mb-1">{threat.name}</h3>
                  <p className="text-sm text-gray-400">
                    <span className="text-emerald-400 font-medium">Mitigation:</span> {threat.mitigation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
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
          bg-gradient-to-r from-emerald-900/20 to-cyan-900/20
          border border-emerald-400/30
          shadow-[0_0_30px_rgba(16,185,129,0.15)]"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-300 flex items-center gap-3">
            <span className="text-3xl">🔐</span>
            The Security Advantage
          </h2>
          <p className="text-gray-200 leading-relaxed text-lg max-w-3xl mb-4">
            Blockchain's security model represents a paradigm shift from traditional centralized systems. 
            By combining cryptography, decentralization, and economic incentives, it creates a system where 
            security emerges from mathematics and game theory rather than trust in institutions.
          </p>
          <p className="text-gray-200 leading-relaxed text-lg max-w-3xl">
            The result is a network that becomes more secure as it grows, resistant to censorship and 
            tampering even by powerful adversaries. While no system is perfectly secure, blockchain's 
            transparent, auditable nature means vulnerabilities can be detected and addressed by the 
            global community of participants.
          </p>
        </div>
      </motion.div>
    </div>
  );
}