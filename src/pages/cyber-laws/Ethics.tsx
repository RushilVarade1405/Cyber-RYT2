import { Link } from "react-router-dom";

export default function CyberEthics() {
  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK LINK
      =============================== */}
      <Link to="/cyber-laws" className="text-cyan-400 hover:underline">
        ← Back to Cyber Laws
      </Link>

      {/* ===============================
          PAGE HEADER
      =============================== */}
      <h1 className="text-5xl font-bold mt-4 mb-6 text-cyan-400">
        Cyber Ethics
      </h1>

      {/* ===============================
          BADGES
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-20">
        <span className="px-3 py-1 text-sm rounded-full bg-green-600/20 text-green-400 border border-green-500/30">
          Ethical Use
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
          Digital Responsibility
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30">
          Cyber Awareness
        </span>
      </div>

      {/* ===============================
          WHAT IS CYBER ETHICS
      =============================== */}
      <section className="mb-24">
        <h2 className="text-3xl font-semibold mb-6 text-cyan-300">
          What is Cyber Ethics?
        </h2>

        <div className="bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6 text-gray-300 leading-relaxed space-y-4">
          <p>
            Cyber Ethics refers to the moral principles that govern the use of
            computers, information systems, and digital communication. It helps
            users understand what is right and wrong while interacting in the
            cyber world.
          </p>

          <p>
            With the rapid growth of the internet, social media, cloud computing,
            and artificial intelligence, ethical issues such as privacy
            violations, cyber crimes, digital surveillance, and misuse of data
            have increased significantly.
          </p>

          <p>
            Cyber Ethics aims to promote responsible behavior by encouraging
            users to respect privacy, protect digital assets, avoid illegal
            activities, and follow cyber laws while using technology.
          </p>
        </div>
      </section>

{/* ===============================
    CORE PRINCIPLES
=============================== */}
<section className="mb-24">

  <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-cyan-300">
    Core Principles of Cyber Ethics
  </h2>

  <p className="text-gray-400 mb-8 max-w-3xl">
    Cyber Ethics is based on fundamental principles that guide responsible,
    lawful, and respectful behavior in the digital world.
  </p>

  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    {[
      {
        title: "Privacy",
        desc: "Every individual has the right to keep personal data confidential. Ethical users do not access, share, monitor, or misuse sensitive information without proper authorization.",
        icon: "🔐",
      },
      {
        title: "Integrity",
        desc: "Integrity requires honesty and transparency in online activities, including avoiding fake identities, misinformation, plagiarism, and digital manipulation.",
        icon: "🧭",
      },
      {
        title: "Intellectual Property",
        desc: "Digital creations such as software, music, videos, and articles must be respected. Ethical use prohibits piracy and requires proper attribution.",
        icon: "📚",
      },
      {
        title: "Accountability",
        desc: "Users are responsible for their online actions. Activities like hacking, fraud, or abuse leave digital footprints and are punishable under cyber laws.",
        icon: "⚖️",
      },
      {
        title: "Security Awareness",
        desc: "Ethical users follow safe cybersecurity practices such as strong passwords, system updates, and avoiding suspicious links or exploits.",
        icon: "🛡️",
      },
      {
        title: "Respectful Conduct",
        desc: "Cyber ethics promotes respectful communication by discouraging cyber bullying, harassment, hate speech, and online abuse.",
        icon: "🤝",
      },
      {
        title: "Digital Responsibility",
        desc: "Users must act responsibly online, understanding the impact of posts, shares, and comments on individuals and society.",
        icon: "🌐",
      },
      {
        title: "Legal Compliance",
        desc: "Ethical technology use requires compliance with cyber laws, IT Acts, data protection rules, and platform policies.",
        icon: "📜",
      },
      {
        title: "Fair Use",
        desc: "Fair use ensures digital resources are used ethically without misuse of systems, bandwidth, or restricted access.",
        icon: "⚖️",
      },
      {
        title: "Social Responsibility",
        desc: "Users should promote awareness, report cyber crimes, avoid harmful content, and support a safe digital environment.",
        icon: "🌍",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="group relative bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
        border border-cyan-500/20 rounded-xl p-6
        transition-all duration-300
        hover:-translate-y-2 hover:border-cyan-400/50
        hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
      >

        {/* Accent Line */}
        <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400/0
          group-hover:bg-cyan-400/70 transition-all duration-300 rounded-l-xl" />

        <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
          {item.icon} {item.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">
          {item.desc}
        </p>

      </div>
    ))}

  </div>
</section>

 {/* ===============================
    IMPORTANCE
=============================== */}
<section className="mb-24">

  <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-cyan-300">
    Importance of Cyber Ethics
  </h2>

  <p className="text-gray-400 mb-8 max-w-3xl">
    Cyber Ethics plays a crucial role in ensuring that digital technology is
    used in a responsible, lawful, and socially acceptable manner. It helps
    individuals, organizations, and governments maintain trust, security,
    and integrity in the cyber world.
  </p>

  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    {[
      {
        title: "Promotes Responsible Use of Technology",
        desc: "Cyber ethics encourages users to act responsibly while using digital devices, networks, and online platforms, reducing careless or harmful behavior.",
        icon: "🧠",
      },
      {
        title: "Prevents Cyber Crimes",
        desc: "Ethical awareness helps reduce cyber crimes such as hacking, identity theft, phishing, online fraud, and cyber stalking by promoting lawful behavior.",
        icon: "🚫",
      },
      {
        title: "Protects Privacy and Personal Data",
        desc: "Cyber ethics emphasizes respect for privacy and safeguards sensitive personal, financial, and confidential information from misuse or unauthorized access.",
        icon: "🔒",
      },
      {
        title: "Builds Trust in Digital Systems",
        desc: "Ethical conduct strengthens trust in online communication, digital payments, e-commerce, and cloud services among users and organizations.",
        icon: "🤝",
      },
      {
        title: "Ensures Legal Compliance",
        desc: "Following cyber ethics helps individuals and organizations comply with cyber laws, IT Acts, and data protection regulations, avoiding legal penalties.",
        icon: "⚖️",
      },
      {
        title: "Creates a Safe Digital Environment",
        desc: "By discouraging cyber bullying, harassment, hate speech, and misuse of technology, cyber ethics promotes a positive and secure digital society.",
        icon: "🌍",
      },
      {
        title: "Supports Organizational Security",
        desc: "Ethical behavior reduces insider threats, data leaks, and system misuse, thereby strengthening organizational cybersecurity.",
        icon: "🏢",
      },
      {
        title: "Encourages Ethical Innovation",
        desc: "Cyber ethics guides responsible development and use of emerging technologies like AI, IoT, and big data without harming society.",
        icon: "🚀",
      },
      {
        title: "Protects Digital Reputation",
        desc: "Ethical online conduct helps individuals and organizations maintain credibility and reputation in the digital space.",
        icon: "⭐",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="group relative bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
        border border-cyan-500/20 rounded-xl p-6
        transition-all duration-300
        hover:-translate-y-2 hover:border-cyan-400/50
        hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
      >

        {/* Accent Line */}
        <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400/0
          group-hover:bg-cyan-400/70 transition-all duration-300 rounded-l-xl" />

        <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
          {item.icon} {item.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">
          {item.desc}
        </p>

      </div>
    ))}

  </div>
</section>

 {/* ===============================
    REAL-LIFE EXAMPLES
=============================== */}
<section className="mb-24">
  <h2 className="text-3xl font-semibold mb-6 text-cyan-300">
    Ethical vs Unethical Use of Technology
  </h2>

  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">

    <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-3 text-green-400">
        ✅ Ethical Practices
      </h3>
      <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
        <li>Using genuine and licensed software</li>
        <li>Respecting the privacy and consent of others online</li>
        <li>Securing systems with strong passwords and encryption</li>
        <li>Reporting cyber crimes and suspicious activities</li>
        <li>Using social media responsibly and ethically</li>
        <li>Giving proper credit to original creators</li>
        <li>Following organizational IT policies</li>
        <li>Protecting personal and professional data</li>
        <li>Verifying information before sharing online</li>
        <li>Using technology for lawful purposes only</li>
      </ul>
    </div>

    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-3 text-red-400">
        ❌ Unethical Practices
      </h3>
      <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
        <li>Hacking or accessing systems without permission</li>
        <li>Software piracy and illegal downloads</li>
        <li>Cyber stalking, bullying, or harassment</li>
        <li>Spreading fake news or malware</li>
        <li>Identity theft and online fraud</li>
        <li>Creating fake profiles or impersonation</li>
        <li>Sharing confidential data without consent</li>
        <li>Bypassing security controls</li>
        <li>Misusing digital resources</li>
        <li>Using technology to harm others</li>
      </ul>
    </div>

  </div>
</section>

{/* ===============================
    ETHICAL NOTE
=============================== */}
<section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 md:p-8
  transition-all duration-300 hover:border-red-400/50
  hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]">

  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-red-400 flex items-center gap-2">
    🛡 Ethical Use & Responsibility
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    All cybersecurity concepts, techniques, and tools discussed here are meant
    strictly for <strong>ethical, educational, and defensive purposes</strong>.
    These include learning, research, system protection, and authorized security
    testing.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Using cybersecurity tools <strong>without proper authorization</strong> is
    unethical and may lead to <strong>serious legal consequences</strong>. Ethical
    users must always obtain <strong>explicit permission</strong> before
    accessing, testing, or analyzing any system or network.
  </p>

  <div className="mt-4 bg-red-950/40 border border-red-500/40 rounded-lg p-4">
    <ul className="space-y-2 text-gray-300 text-sm">
      <li>• Use tools only for ethical learning and cyber defense</li>
      <li>• Perform testing only on owned or authorized systems</li>
      <li>• Respect privacy, confidentiality, and data protection</li>
      <li>• Avoid misuse, exploitation, or malicious activities</li>
    </ul>
  </div>

  <p className="text-red-300 text-sm mt-4 italic">
    Ethical use of technology is mandatory. Misuse of tools can lead to
    legal action, loss of trust, and severe consequences.
  </p>
</section>


    </div>
  );
}
