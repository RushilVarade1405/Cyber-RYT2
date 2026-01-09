import { useParams, Link } from "react-router-dom";
import rawToolsContent from "../../data/toolsContent.json";

/* ===============================
   TOOL TYPE DEFINITION
================================ */

interface ToolCommand {
  cmd: string;
  desc: string;
}

interface Tool {
  title: string;
  category: string;
  color: string;
  description: string;

  overview?: string;
  features?: string[];
  installation?: string[];
  commands?: ToolCommand[];
  useCases?: string[];
  defensiveNotes?: string[];
  warnings?: string[];
}

/* ===============================
   TYPE CAST JSON
================================ */

const toolsContent = rawToolsContent as Record<string, Tool>;

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = toolId ? toolsContent[toolId] : null;

  if (!tool) {
    return (
      <div className="px-10 py-20 text-center text-red-400">
        Tool not found
      </div>
    );
  }

  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK TO TOOLS
      =============================== */}
      <Link
        to="/tools"
        className={`inline-block mb-6 text-${tool.color}-400 hover:underline`}
      >
        ← Back to Tools
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className={`text-5xl font-bold mb-6 text-${tool.color}-400`}>
        {tool.title}
      </h1>

      {/* ===============================
          DESCRIPTION
      =============================== */}
      <p className="text-gray-300 max-w-4xl mb-8">
        {tool.description}
      </p>

      {/* ===============================
          OVERVIEW
      =============================== */}
      {tool.overview && (
        <Section title="Overview" color={tool.color}>
          <p className="text-gray-300 leading-relaxed">
            {tool.overview}
          </p>
        </Section>
      )}

      {/* ===============================
          BADGES
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-10">
        <Badge text="Beginner Friendly" color="green" />
        <Badge text="Intermediate" color="yellow" />
        <Badge text="Advanced" color="red" />
        <Badge text={tool.category} color={tool.color} />
      </div>

      {/* ===============================
          FEATURES
      =============================== */}
      {tool.features && (
        <Section title="Core Features" color={tool.color}>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {tool.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* ===============================
          INSTALLATION
      =============================== */}
      {tool.installation && (
        <Section title="Installation" color={tool.color}>
          <div className="bg-gray-900 rounded-lg p-5 space-y-2 text-sm font-mono text-gray-200">
            {tool.installation.map((cmd, i) => (
              <p key={i}>{cmd}</p>
            ))}
          </div>
        </Section>
      )}

      {/* ===============================
          COMMANDS
      =============================== */}
      {tool.commands && (
        <Section title="Common Commands" color={tool.color}>
          <div className="bg-gray-900 rounded-lg p-5 space-y-3 text-sm font-mono text-gray-200">
            {tool.commands.map((item, i) => (
              <p key={i}>
                <span className={`text-${tool.color}-400`}>
                  {item.cmd}
                </span>{" "}
                — {item.desc}
              </p>
            ))}
          </div>
        </Section>
      )}

      {/* ===============================
          USE CASES
      =============================== */}
      {tool.useCases && (
        <Section title="Real-World Use Cases" color={tool.color}>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {tool.useCases.map((use, i) => (
              <li key={i}>{use}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* ===============================
          DEFENSIVE NOTES
      =============================== */}
      {tool.defensiveNotes && (
        <Section title="Defensive Notes" color={tool.color}>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {tool.defensiveNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* ===============================
          WARNINGS
      =============================== */}
      {tool.warnings && (
        <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mt-10">
          <h2 className="text-xl font-semibold mb-3 text-red-400">
            ⚠ Legal & Ethical Warning
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {tool.warnings.map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
}

/* ===============================
   REUSABLE UI COMPONENTS
================================ */

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className={`text-2xl font-semibold mb-4 text-${color}-300`}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className={`px-3 py-1 text-sm rounded-full
      bg-${color}-600/20 text-${color}-400 border border-${color}-500/30`}
    >
      {text}
    </span>
  );
}
