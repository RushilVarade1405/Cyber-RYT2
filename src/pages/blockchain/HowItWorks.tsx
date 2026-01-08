import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  {
    step: "01",
    title: "Transaction Creation",
    description:
      "A user initiates a transaction such as sending cryptocurrency or storing data. The transaction is digitally signed using the sender’s private key to ensure authenticity.",
  },
  {
    step: "02",
    title: "Transaction Broadcast",
    description:
      "The signed transaction is broadcast to a peer-to-peer network of nodes. Each node independently receives and temporarily stores the transaction.",
  },
  {
    step: "03",
    title: "Transaction Verification",
    description:
      "Nodes validate the transaction by checking digital signatures, balances, and protocol rules. Invalid transactions are rejected.",
  },
  {
    step: "04",
    title: "Block Creation",
    description:
      "Verified transactions are grouped into a block containing a timestamp and the cryptographic hash of the previous block.",
  },
  {
    step: "05",
    title: "Consensus Mechanism",
    description:
      "The network reaches agreement using mechanisms like Proof of Work or Proof of Stake to decide the next valid block.",
  },
  {
    step: "06",
    title: "Block Added to Chain",
    description:
      "After consensus, the new block is linked to the previous block using cryptographic hashing.",
  },
  {
    step: "07",
    title: "Ledger Synchronization",
    description:
      "All nodes update their local copy of the blockchain, ensuring consistency across the network.",
  },
  {
    step: "08",
    title: "Immutability Achieved",
    description:
      "Once confirmed, the transaction becomes permanent, tamper-resistant, and publicly verifiable.",
  },
];

export default function HowBlockchainWorks() {
  return (
    <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
    BACK LINK
=============================== */}
<Link to="/blockchain" className="text-cyan-400 hover:underline">
  ← Back to Blockchain
</Link>


      {/* ===============================
          TITLE
      =============================== */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-6 text-cyan-400"
      >
        How Blockchain Works
      </motion.h1>

      {/* ===============================
          KEY CONCEPT BADGES
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-12"
      >
        {[
          ["Distributed Ledger", "green"],
          ["Cryptographic Security", "purple"],
          ["Consensus Based", "cyan"],
          ["Decentralized Network", "orange"],
          ["Tamper Resistant", "blue"],
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
        className="text-gray-300 leading-relaxed mb-16 max-w-3xl"
      >
        <p className="text-gray-300 leading-relaxed max-w-4xl">
  Blockchain is a{" "}
  <span className="text-cyan-300 font-semibold">
    distributed digital ledger
  </span>{" "}
  that acts as a shared record system where identical copies of data are
  maintained across many interconnected computers called nodes, rather than
  being controlled by a single central server. It records transactions such as
  financial transfers, data exchanges, or smart contract executions in a
  <span className="text-green-300 font-semibold"> secure</span>,{" "}
  <span className="text-blue-300 font-semibold">transparent</span>, and{" "}
  <span className="text-red-300 font-semibold">immutable</span> manner. Security
  is achieved through cryptographic techniques that protect data and verify user
  identities, while transparency allows all network participants to independently
  view and verify transactions. Immutability ensures that once information is
  written to the blockchain, it cannot be altered or deleted, creating permanent
  and trustworthy records. By combining cryptography, consensus mechanisms, and
  decentralization, blockchain eliminates the need for a central authority such
  as banks or institutions, enabling a trustless system where participants can
  transact directly with confidence.
</p>
      </motion.p>
      {/* ===============================
          TITLE
      =============================== */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-6 text-cyan-400"
      >
        Steps of Blockchain Working
      </motion.h1>
      {/* ===============================
          STEP BY STEP PROCESS
      =============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/60 border border-slate-700 rounded-xl p-6
              hover:border-cyan-400/50
              hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]
              transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-cyan-400">
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
        className="mt-20 bg-gradient-to-r from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30 rounded-xl p-8"
      >
        <h2 className="text-2xl font-semibold mb-3 text-cyan-300">
          🔒 Why Blockchain Is Secure
        </h2>
        <p className="text-gray-200 leading-relaxed max-w-3xl">
          Blockchain security emerges from cryptography, decentralization, and
          consensus. Each step reinforces trust, ensuring data integrity,
          transparency, and resistance to manipulation.
        </p>
      </motion.div>
    </div>
  );
}
