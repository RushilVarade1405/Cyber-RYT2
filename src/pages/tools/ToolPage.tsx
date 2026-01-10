import { useParams, Link } from "react-router-dom";
import toolsContent from "../../data/toolsContent.json";

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();

  if (!toolId) {
    return (
      <div className="px-10 py-20 text-center text-red-400">
        Invalid tool URL
      </div>
    );
  }

  const tool = (toolsContent as Record<string, any>)[toolId];

  if (!tool) {
    return (
      <div className="px-10 py-20 text-center">
        <p className="text-red-400 text-xl mb-4">Tool not found</p>
        <Link
          to="/tools"
          className="text-cyan-400 hover:underline"
        >
          ← Back to Tools
        </Link>
      </div>
    );
  }

  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">
      {/* BACK LINK */}
      <Link
        to="/tools"
        className={`inline-block mb-6 text-${tool.color}-400 hover:underline`}
      >
        ← Back to Tools
      </Link>

      {/* TITLE */}
      <h1 className={`text-5xl font-bold mb-6 text-${tool.color}-400`}>
        {tool.title}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-300 max-w-4xl mb-8">
        {tool.description}
      </p>

      {/* CATEGORY */}
      <span
        className={`inline-block mb-10 px-4 py-1 rounded-full
        bg-${tool.color}-600/20 text-${tool.color}-400 border border-${tool.color}-500/30`}
      >
        {tool.category}
      </span>

      {/* FEATURES */}
      <section className="mb-10">
        <h2 className={`text-2xl font-semibold mb-4 text-${tool.color}-300`}>
          Core Features
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tool.features.map((f: string, i: number) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      {/* COMMANDS */}
      <section className="mb-10">
        <h2 className={`text-2xl font-semibold mb-4 text-${tool.color}-300`}>
          Common Commands
        </h2>

        <div className="bg-gray-900 rounded-lg p-5 space-y-3 text-sm font-mono">
          {tool.commands.map(
            (c: { cmd: string; desc: string }, i: number) => (
              <p key={i}>
                <span className={`text-${tool.color}-400`}>{c.cmd}</span>
                {" — "}
                {c.desc}
              </p>
            )
          )}
        </div>
      </section>

      {/* WARNING */}
      <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-red-400">
          ⚠ Legal Warning
        </h2>
        <p className="text-gray-300">
          Use this tool only on systems you own or have permission to test.
        </p>
      </section>
    </div>
  );
}
