import { platforms } from "../data/platforms";

function getMainCategory(category: string) {
  if (category.toLowerCase().includes("crypto")) return "Crypto";
  if (category.toLowerCase().includes("blockchain")) return "Blockchain";
  if (category.toLowerCase().includes("linux")) return "Linux";
  if (category.toLowerCase().includes("cyber")) return "Cyber";
  return "All";
}

export default function Platforms() {
  return (
    <div className="px-10 py-10 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-4">Learning Platforms</h1>

      <p className="text-cyan-300 mb-8">
        Hands-on platforms offering labs for cybersecurity, cryptography,
        blockchain, Linux, and penetration testing.
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p, index) => {
          const mainCategory = getMainCategory(p.category);

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
              border border-cyan-500/30 rounded-xl p-6
              transition-all duration-300 hover:-translate-y-2
              hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              {/* Platform Name */}
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {p.name}
              </h3>

              {/* Category Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {/* Main Category */}
                <span
                  className="text-xs px-3 py-1 rounded-full
                  bg-emerald-500/10 text-emerald-300
                  border border-emerald-400/30"
                >
                  {mainCategory}
                </span>

                {/* Detailed Category */}
                <span
                  className="text-xs px-3 py-1 rounded-full
                  bg-cyan-500/10 text-cyan-300
                  border border-cyan-400/30"
                >
                  {p.category}
                </span>

                {/* Difficulty */}
                <span
                  className="text-xs px-3 py-1 rounded-full
                  bg-purple-500/10 text-purple-300
                  border border-purple-400/30"
                >
                  {p.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4">
                {p.description}
              </p>

              {/* Official Link */}
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm px-4 py-2 rounded-md
                border border-cyan-400 text-cyan-400
                hover:bg-cyan-400 hover:text-black transition"
              >
                Visit Platform →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
