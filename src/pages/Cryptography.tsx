import { cryptoData } from "../data/crypto";

export default function Cryptography() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8">Cryptography</h1>

      {cryptoData.map((topic, index) => (
        <div key={index} className="mb-12">

          {/* Topic Title */}
          <h2 className="text-2xl text-cyan-400 font-semibold mb-2">
            {topic.title}
          </h2>

          {/* Topic Description */}
          <p className="text-gray-300 mb-4">
            {topic.description}
          </p>

          {/* Sections */}
          <div className="space-y-5">
            {topic.sections.map((section, secIndex) => (
              <div
                key={secIndex}
                className="bg-[#0b1224] border border-cyan-500/30 rounded-xl p-5"
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
          </div>

        </div>
      ))}
    </div>
  );
}
