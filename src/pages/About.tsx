export default function About() {
  return (
    <div className="min-h-screen text-white bg-black">
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          md:px-10
          lg:px-16
          py-12
          sm:py-16
          lg:py-24
        "
      >
        {/* ===============================
            TITLE
        =============================== */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          About <span className="text-cyan-400">Cyber World</span>
        </h1>

        {/* ===============================
            INTRO
        =============================== */}
        <p className="text-gray-300 leading-relaxed mb-6">
          <span className="text-cyan-400 font-semibold">Cyber World</span> is an
          educational platform designed to help students, beginners, and
          cybersecurity enthusiasts understand modern digital security concepts
          in a structured, practical, and easy-to-follow manner.
        </p>

        <p className="text-gray-300 leading-relaxed mb-12">
          The platform bridges the gap between{" "}
          <span className="text-cyan-400">theory</span> and
          <span className="text-cyan-400"> real-world practice</span> by combining
          foundational knowledge with industry-relevant tools, platforms, and
          hands-on learning paths used in cybersecurity and emerging technologies.
        </p>

        {/* ===============================
            PURPOSE & VISION
        =============================== */}
        <div className="grid gap-6 md:grid-cols-2 mb-14">
          <div className="p-5 sm:p-6 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1224] to-[#0f1a33]">
            <h3 className="text-cyan-400 text-lg font-semibold mb-2">
              🎯 Purpose
            </h3>
            <p className="text-gray-300">
              To simplify complex cybersecurity concepts and present them in a
              beginner-friendly, practical format that encourages hands-on
              exploration and learning.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1224] to-[#0f1a33]">
            <h3 className="text-cyan-400 text-lg font-semibold mb-2">
              🌐 Vision
            </h3>
            <p className="text-gray-300">
              To grow into a trusted learning hub where aspiring security
              professionals can build strong fundamentals before advancing to
              specialized and professional-level skills.
            </p>
          </div>
        </div>

        {/* ===============================
            WHAT YOU LEARN
        =============================== */}
        <div className="p-5 sm:p-6 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1224] to-[#0f1a33] mb-16">
          <h3 className="text-cyan-400 text-lg font-semibold mb-3">
            🚀 What You’ll Learn
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Linux fundamentals and command-line usage</li>
            <li>Cybersecurity tools and attack & defense basics</li>
            <li>Cryptography concepts and secure communication</li>
            <li>Blockchain, Web3, and decentralized systems</li>
            <li>Cyber laws, ethics, and digital compliance</li>
            <li>Hands-on labs, platforms, and real-world scenarios</li>
          </ul>
        </div>

        {/* ===============================
            FOUNDER / CREATOR
        =============================== */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            👨‍💻 Founder & Creator
          </h2>

          <div className="p-5 sm:p-6 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0b1224] to-[#0f1a33]">
            <p className="text-gray-300 leading-relaxed mb-4">
              Hi, I’m{" "}
              <span className="text-cyan-400 font-semibold">RYTNIX OP</span>, a
              cybersecurity learner and technology enthusiast with a strong
              interest in ethical hacking, Linux, blockchain, and digital security.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              Cyber World was created as a personal learning project that evolved
              into a structured platform for sharing knowledge in a simple,
              practical, and beginner-focused way — especially for students who
              are just starting their cybersecurity journey.
            </p>

            <p className="text-gray-300 leading-relaxed">
              This project is continuously evolving as I explore new tools,
              security techniques, and emerging technologies, with the goal of
              learning deeply and sharing valuable insights along the way.
            </p>
          </div>
        </div>

        {/* ===============================
            CLOSING NOTE
        =============================== */}
        <div className="text-center text-gray-400 text-sm">
          <p>
            Learn. Practice. Secure.{" "}
            <span className="text-cyan-400">Cyber World</span>
          </p>
        </div>
      </div>
    </div>
  );
}
