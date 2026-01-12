import { motion } from "framer-motion";

const steps = [
  {
    step: "Step 1",
    title: "Linux Fundamentals",
    description: "Learn Linux basics: commands, file system, permissions.",
  },
  {
    step: "Step 2",
    title: "Security Foundations",
    description:
      "Understand cybersecurity tools, attack vectors, and core concepts.",
  },
  {
    step: "Step 3",
    title: "Advanced Practice",
    description:
      "Move to cryptography, blockchain, and practice platforms.",
  },
];

export default function Start() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative px-6 sm:px-10 py-20 max-w-6xl mx-auto text-white"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-[120px]" />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl sm:text-4xl font-bold mb-6"
      >
        Get Started with{" "}
        <span className="text-cyan-400">Cyber World</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-gray-300 max-w-3xl mb-14 leading-relaxed"
      >
        This page gives you a clear starting path if you are new to
        cybersecurity. Follow the steps below in order to build strong
        fundamentals.
      </motion.p>

      {/* Glass Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid gap-8 md:grid-cols-3"
      >
        {steps.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="
              relative p-6 rounded-2xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              hover:border-cyan-400/40
              shadow-[0_0_30px_rgba(34,211,238,0.15)]
              hover:shadow-[0_0_45px_rgba(34,211,238,0.3)]
            "
          >
            {/* Glass shine */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

            <span className="text-sm text-cyan-400 font-semibold tracking-wide">
              {item.step}
            </span>

            <h3 className="text-lg font-semibold mt-2 mb-3">
              {item.title}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
