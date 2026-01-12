import { cyberTools } from "../data/cyberTools";
import { motion } from "framer-motion";

/* ===============================
   SHARED GLASS CARD STYLE
=============================== */
const cardClass = `
  p-6 rounded-2xl
  bg-white/5 backdrop-blur-xl
  border border-white/10
  transition-all duration-300
  hover:-translate-y-2
  hover:border-cyan-400/50
  shadow-[0_0_25px_rgba(34,211,238,0.15)]
  hover:shadow-[0_0_45px_rgba(34,211,238,0.35)]
`;

/* ===============================
   COMPONENT
=============================== */
export default function Tools() {
  const groupedTools = cyberTools.reduce<Record<string, typeof cyberTools>>(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    },
    {}
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative px-6 sm:px-10 py-14 max-w-7xl mx-auto text-white"
    >
      {/* ===============================
          AMBIENT BACKGROUND GLOW
      =============================== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-10 w-96 h-96 bg-cyan-500/20 blur-[150px]" />
        <div className="absolute bottom-16 right-10 w-96 h-96 bg-blue-500/20 blur-[150px]" />
      </div>

      {/* ===============================
          PAGE HEADER
      =============================== */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-4xl font-bold mb-4 text-cyan-400"
      >
        Cybersecurity Tools
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-gray-300 mb-16 max-w-3xl leading-relaxed"
      >
        Essential cybersecurity tools used for network scanning, web
        application testing, exploitation, password attacks, wireless
        security, and OSINT investigations.
      </motion.p>

      {/* ===============================
          TOOLS BY CATEGORY
      =============================== */}
      {Object.entries(groupedTools).map(([category, tools]) => (
        <motion.section
          key={category}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-28"
        >
          <h2 className="text-2xl font-semibold text-cyan-300 mb-10">
            {category}
          </h2>

          {/* STAGGERED CARDS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={`${tool.slug}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10 }}
                className={cardClass}
              >
                <h3 className="text-cyan-400 font-semibold text-lg mb-2">
                  ›› {tool.name}
                </h3>

                <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                  {tool.use}
                </p>

                {/* ===============================
                    COMMANDS (SCROLLBAR HIDDEN)
                =============================== */}
                <div className="space-y-3">
                  {tool.commands.map((cmd, i) => (
                    <div
                      key={i}
                      className="
                        flex items-center gap-3
                        bg-[#020617]/80 rounded-lg px-3 py-2
                        border border-cyan-500/30
                        overflow-x-auto
                        [&::-webkit-scrollbar]:hidden
                        [-ms-overflow-style:none]
                        [scrollbar-width:none]
                      "
                    >
                      <code className="flex-1 text-cyan-300 text-sm font-mono whitespace-nowrap">
                        {cmd}
                      </code>

                      <button
                        onClick={() => navigator.clipboard.writeText(cmd)}
                        className="
                          text-xs px-3 py-1 rounded-md
                          border border-cyan-400 text-cyan-400
                          hover:bg-cyan-400 hover:text-black
                          transition
                        "
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      ))}
    </motion.div>
  );
}
