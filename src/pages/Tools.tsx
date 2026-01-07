import { cyberTools } from "../data/cyberTools";

export default function Tools() {
  const groupedTools = cyberTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof cyberTools>);

  return (
    <div className="px-10 py-10 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-4">Cybersecurity Tools</h1>

      <p className="text-cyan-300 mb-10">
        Essential cybersecurity tools used for scanning, analysis,
        web testing, password attacks, wireless security, and OSINT.
      </p>

      {Object.entries(groupedTools).map(([category, tools]) => (
        <div key={category} className="mb-14">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
            {category}
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <div
                key={`${tool.slug}-${index}`}
                className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
                border border-cyan-500/30 rounded-xl p-6
                transition-all duration-300 hover:-translate-y-2
                hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
              >
                <h3 className="text-cyan-400 font-semibold text-lg mb-2">
                  ›› {tool.name}
                </h3>

                <p className="text-gray-300 text-sm mb-4">
                  {tool.use}
                </p>

                <div className="space-y-2">
                  {tool.commands.map((cmd, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between
                      bg-[#020617] rounded-lg px-3 py-2
                      border border-cyan-500/30"
                    >
                      <code className="text-cyan-300 text-sm overflow-x-auto">
                        {cmd}
                      </code>

                      <button
                        onClick={() => navigator.clipboard.writeText(cmd)}
                        className="ml-3 text-xs px-3 py-1 rounded-md
                        border border-cyan-400 text-cyan-400
                        hover:bg-cyan-400 hover:text-black transition"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
