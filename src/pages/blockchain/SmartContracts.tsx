import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const contractSteps = [
  {
    step: "01",
    title: "Contract Definition",
    description:
      "Smart contracts are programs written with predefined rules and conditions that automatically execute when specific criteria are met.",
  },
  {
    step: "02",
    title: "Coding the Logic",
    description:
      "Developers write smart contract code using languages like Solidity to define rules, actions, and outcomes without human intervention.",
  },
  {
    step: "03",
    title: "Deployment on Blockchain",
    description:
      "Once written, the smart contract is deployed on the blockchain, where it receives a unique address and becomes immutable.",
  },
  {
    step: "04",
    title: "Triggering Conditions",
    description:
      "Smart contracts continuously monitor conditions. When predefined requirements are satisfied, execution begins automatically.",
  },
  {
    step: "05",
    title: "Automatic Execution",
    description:
      "The contract executes its programmed actions such as transferring assets or updating records without intermediaries.",
  },
  {
    step: "06",
    title: "Consensus Validation",
    description:
      "Blockchain nodes validate the execution through consensus mechanisms, ensuring fairness and correctness.",
  },
  {
    step: "07",
    title: "Immutable Records",
    description:
      "Once executed, results are permanently stored on the blockchain and cannot be altered or reversed.",
  },
  {
    step: "08",
    title: "Trustless Automation",
    description:
      "Smart contracts eliminate the need for trust by relying on code and cryptography instead of human enforcement.",
  },
];

export default function SmartContracts() {
  return (
    <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK LINK
      =============================== */}
      <Link to="/blockchain" className="text-purple-400 hover:underline">
        ← Back to Blockchain
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-6 text-purple-400"
      >
        Smart Contracts
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
          ["Automation", "purple"],
          ["Self-Executing", "pink"],
          ["Trustless", "violet"],
          ["Immutable", "indigo"],
          ["Decentralized Logic", "fuchsia"],
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
        Smart contracts are{" "}
        <span className="text-purple-300 font-semibold">self-executing digital agreements</span>{" "}
        stored on the blockchain. They automatically enforce rules and perform actions
        when conditions are met, removing the need for intermediaries. Powered by
        cryptography and decentralization, smart contracts increase efficiency,
        transparency, and trust across blockchain applications.
      </motion.p>

      {/* ===============================
          TITLE
      =============================== */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-10 text-purple-400"
      >
        How Smart Contracts Work
      </motion.h1>

      {/* ===============================
          STEP BY STEP PROCESS
      =============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {contractSteps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/60 border border-slate-700 rounded-xl p-6
              hover:border-purple-400/50
              hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
              transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-purple-400">
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
        className="mt-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30
          border border-purple-500/30 rounded-xl p-8"
      >
        <h2 className="text-2xl font-semibold mb-3 text-purple-300">
          🤖 Why Smart Contracts Matter
        </h2>
        <p className="text-gray-200 leading-relaxed max-w-3xl">
          Smart contracts enable trustless automation by ensuring agreements are
          executed exactly as programmed, reducing costs, delays, and human error.
        </p>
      </motion.div>
    </div>
  );
}
