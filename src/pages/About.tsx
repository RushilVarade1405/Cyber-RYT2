export default function About() {
  return (
    <div className="min-h-screen  text-white px-8 py-24">
<div className="px-10 py-16 max-w-7xl mx-auto text-white">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">
          About Cyber World
        </h1>

        {/* Intro */}
        <p className="text-gray-300 leading-relaxed mb-6">
          <span className="text-cyan-400 font-semibold">Cyber World</span> is a
          learning-focused platform created to help students, beginners, and
          cybersecurity enthusiasts understand modern digital security concepts
          in a clear and structured way.
        </p>

        <p className="text-gray-300 leading-relaxed mb-10">
          The goal is to bridge the gap between theory and practice by combining
          foundational knowledge with real-world tools, platforms, and hands-on
          learning paths commonly used in cybersecurity.
        </p>

        {/* Purpose & Vision */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="p-6 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1224] to-[#0f1a33]">
            <h3 className="text-cyan-400 text-lg font-semibold mb-2">
              🎯 Purpose
            </h3>
            <p className="text-gray-300">
              To simplify complex cybersecurity topics and present them in a
              practical, beginner-friendly format that encourages hands-on
              learning.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1224] to-[#0f1a33]">
            <h3 className="text-cyan-400 text-lg font-semibold mb-2">
              🌐 Vision
            </h3>
            <p className="text-gray-300">
              To grow into a reliable learning space where aspiring security
              professionals can build strong fundamentals before moving toward
              advanced skills.
            </p>
          </div>
        </div>

        {/* What You Learn */}
        <div className="p-6 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1224] to-[#0f1a33] mb-12">
          <h3 className="text-cyan-400 text-lg font-semibold mb-3">
            🚀 What You Learn
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Linux commands and system usage</li>
            <li>Cybersecurity tools and attack/defense basics</li>
            <li>Cryptography fundamentals</li>
            <li>Blockchain and Web3 concepts</li>
            <li>Cyber laws, ethics, and compliance</li>
            <li>Hands-on practice platforms and labs</li>
          </ul>
        </div>

        {/* Creator / Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            👨‍💻 Creator & Team
          </h2>

          <div className="p-6 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1224] to-[#0f1a33]">
            <p className="text-gray-300 leading-relaxed mb-4">
              Cyber World is built and maintained by learners with a genuine
              interest in cybersecurity, ethical hacking, and digital
              technologies.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              The focus is not on overwhelming content, but on presenting
              information in a way that is simple, practical, and useful —
              especially for students who are just starting their journey.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Cyber World is an evolving project and will continue to expand as
              new tools, platforms, and security concepts are explored.
            </p>
          </div>
        </div>

       

      </div>
    </div>
  );
}
