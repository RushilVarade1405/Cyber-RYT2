import { blockchainData } from "../data/blockchain";
import { Link } from "react-router-dom";

export default function Blockchain() {
  return (
    <div className="px-10 py-14 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">Blockchain</h1>

{/* ===============================
    BLOCKCHAIN LEARNING PAGES
=============================== */}
<div className="flex flex-wrap gap-4 mb-14">
  <Link
    to="/blockchain/how-it-works"
    className="px-5 py-2 rounded-lg border border-cyan-400
    text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
  >
    How It Works
  </Link>

  <Link
    to="/blockchain/security"
    className="px-5 py-2 rounded-lg border border-cyan-400
    text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
  >
    Security
  </Link>

  <Link
    to="/blockchain/smart-contracts"
    className="px-5 py-2 rounded-lg border border-cyan-400
    text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
  >
    Smart Contracts
  </Link>
</div>

      {blockchainData.map((topic, index) => (
        <div key={index} className="mb-14">

          {/* Title */}
          <h2 className="text-2xl text-cyan-400 font-semibold mb-2">
            {topic.title}
          </h2>

          {/* Description */}
          <p className="text-gray-300 mb-6">
            {topic.description}
          </p>

          {/* Sections (theory blocks) */}
          {topic.sections &&
            topic.sections.map((section, secIndex) => (
              <div
                key={secIndex}
                className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
                border border-cyan-500/30 rounded-xl p-5 mb-4"
              >
                <h3 className="text-cyan-300 font-semibold mb-2">
                  {section.heading}
                </h3>

                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {section.points.map((point, pIndex) => (
                    <li key={pIndex}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}

          {/* Blockchain Platforms */}
          {topic.platforms && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {topic.platforms.map((platform, pIndex) => (
                <div
                  key={pIndex}
                  className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
                  border border-cyan-500/30 rounded-xl p-6
                  transition hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                >
                  <h3 className="text-cyan-300 font-semibold text-lg mb-2">
                    {platform.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4">
                    {platform.description}
                  </p>

                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-lg
                    border border-cyan-400 text-cyan-400
                    hover:bg-cyan-400 hover:text-black
                    transition font-medium"
                  >
                    Visit Platform →
                  </a>
                </div>
                
              ))}
            </div>
          )}

        </div>
      ))}
    </div>
  );
}