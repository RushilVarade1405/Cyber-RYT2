import { Link } from "react-router-dom";

export default function ITActs() {
  return (
    <div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK TO CYBER LAWS
      =============================== */}
      <Link to="/cyber-laws" className="text-cyan-400 hover:underline">
        ← Back to Cyber Laws
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-5xl font-bold mt-4 mb-6 text-cyan-400">
        Information Technology Act, 2000
      </h1>

      {/* ===============================
    BADGES – IT ACTS
=============================== */}
<div className="flex flex-wrap gap-3 mb-20">

  <span className="px-3 py-1 text-sm rounded-full
    bg-red-600/20 text-red-400 border border-red-500/30">
    Legal Compliance
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-orange-600/20 text-orange-400 border border-orange-500/30">
    Cyber Crime Law
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
    Digital Evidence
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-purple-600/20 text-purple-400 border border-purple-500/30">
    Data Protection
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
    Penalties & Fines
  </span>

</div>

      {/* ===============================
          INTRODUCTION
      =============================== */}
      <p className="text-gray-300 leading-relaxed mb-10">
        The <strong>Information Technology Act, 2000 (IT Act)</strong> is the
        primary cyber law of India that provides
        <strong> legal recognition to electronic records, digital signatures,
        and online transactions</strong>. It establishes a legal framework for
        <strong> cyber security, electronic governance, and cyber crime control</strong>.
      </p>

      <p className="text-gray-300 leading-relaxed mb-10">
        Enacted to support the growth of
        <strong> e-commerce, digital communication, and online services</strong>,
        the IT Act also defines
        <strong> penalties and punishments for cyber offences</strong> such as
        hacking, identity theft, data breaches, and online fraud.
      </p>

      <p className="text-gray-300 leading-relaxed mb-10">
        With the rapid expansion of the internet and digital infrastructure,
        the IT Act plays a critical role in
        <strong> protecting users, businesses, and government systems</strong>
        while promoting a
        <strong> secure and trusted digital environment</strong>.
      </p>

      {/* ===============================
          WHAT IS IT ACT
      =============================== */}
      <section className="mb-12">

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-cyan-300">
          What Is the IT Act?
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          The <strong>Information Technology Act, 2000</strong> is an Indian law
          that governs
          <strong> electronic data, online communication, and cyber activities</strong>.
          It provides legal validity to
          <strong> electronic documents, contracts, and digital signatures</strong>.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          The Act empowers authorities to
          <strong> investigate cyber crimes, impose penalties,
          and regulate digital platforms</strong>.
          It also defines the responsibilities of
          <strong> intermediaries such as ISPs, websites, and social media platforms</strong>.
        </p>

        <p className="text-gray-300 leading-relaxed">
          The IT Act applies to
          <strong> offences committed within India as well as outside India</strong>
          if they involve computer systems or networks located in India,
          making it a
          <strong> globally relevant cyber law</strong>.
        </p>

      </section>

{/* ===============================
    IMPORTANT SECTIONS OF IT ACT
=============================== */}
<section className="mb-12">
  <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-cyan-300">
    Important Sections of IT Act
  </h2>
</section>

<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-24">

  {[
    // 🟢 Civil Liability
    ["🧾 Section 43", "Civil Liability", "Penalty for unauthorized access, damage, or disruption of computer systems"],
    ["💼 Section 43A", "Data Protection", "Compensation for failure to protect sensitive personal data"],

    // 🔵 Computer Offences
    ["💻 Section 65", "Tampering", "Tampering with computer source documents"],
    ["🔐 Section 66", "Computer Offences", "Dishonest or fraudulent acts defined under Section 43"],

    // 🟡 Fraud & Identity
    ["📩 Section 66A", "Offensive Messages", "Punishment for offensive messages (Struck Down by Supreme Court)"],
    ["💳 Section 66B", "Stolen Devices", "Dishonestly receiving stolen computer resources"],
    ["🪪 Section 66C", "Identity Theft", "Fraudulent use of passwords, digital signatures, or identity"],
    ["🎣 Section 66D", "Online Fraud", "Cheating by personation using computer resources"],

    // 🟣 Privacy
    ["📸 Section 66E", "Privacy Violation", "Capturing, publishing private images without consent"],
    ["🧑‍⚖️ Section 72", "Confidentiality", "Breach of confidentiality and privacy"],
    ["📄 Section 72A", "Data Disclosure", "Disclosure of information in breach of lawful contract"],

    // 🔴 National Security
    ["☠️ Section 66F", "Cyber Terrorism", "Cyber activities threatening national security"],
    ["📡 Section 69", "Government Powers", "Power to intercept, monitor, or decrypt information"],
    ["🛡️ Section 70", "Protected Systems", "Protection of critical information infrastructure"],
    ["🚨 Section 70B", "CERT-In", "Indian Computer Emergency Response Team"],

    // 🟠 Obscene Content
    ["📢 Section 67", "Obscene Content", "Publishing obscene content in electronic form"],
    ["🔞 Section 67A", "Sexual Content", "Publishing sexually explicit content"],

    // ⚫ Child Protection
    ["🧒 Section 67B", "Child Protection", "Publishing child sexual abuse material"],

    // 🔷 Intermediary & Corporate
    ["🌍 Section 75", "Extra-Territorial", "Applies to offences committed outside India"],
    ["🌐 Section 79", "Intermediary Liability", "Protection to intermediaries under due diligence"],
    ["🏢 Section 85", "Company Liability", "Offences committed by companies"],
  ].map(([title, tag, desc], i) => {

    const colorMap: any = {
      "Civil Liability": "green",
      "Data Protection": "green",
      "Tampering": "cyan",
      "Computer Offences": "cyan",
      "Offensive Messages": "yellow",
      "Stolen Devices": "yellow",
      "Identity Theft": "yellow",
      "Online Fraud": "yellow",
      "Privacy Violation": "purple",
      "Confidentiality": "purple",
      "Data Disclosure": "purple",
      "Cyber Terrorism": "red",
      "Government Powers": "red",
      "Protected Systems": "red",
      "CERT-In": "red",
      "Obscene Content": "orange",
      "Sexual Content": "orange",
      "Child Protection": "gray",
      "Extra-Territorial": "blue",
      "Intermediary Liability": "blue",
      "Company Liability": "blue",
    };

    const color = colorMap[tag];

    return (
      <div
        key={i}
        className={`bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
        border border-${color}-500/30 rounded-xl p-6
        hover:-translate-y-2 transition-all duration-300
        hover:shadow-[0_0_25px_rgba(0,0,0,0.4)]`}
      >
        <h3 className="text-cyan-400 font-semibold text-lg mb-2">
          {title}
        </h3>

        <span
          className={`inline-block mb-3 px-3 py-1 text-xs rounded-full
          bg-${color}-600/20 text-${color}-300 border border-${color}-500/30`}
        >
          {tag}
        </span>

        <p className="text-gray-300 text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    );
  })}
</div>

{/* ===============================
    OBJECTIVES OF IT ACT
=============================== */}
<section className="mb-24">

  <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-cyan-300">
    Objectives of the IT Act
  </h2>

  <p className="text-gray-400 mb-8 max-w-3xl">
    The Information Technology Act, 2000 aims to create a secure, legal, and
    trustworthy digital ecosystem by regulating electronic activities,
    protecting users, and preventing cyber crimes.
  </p>

  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    {[
      {
        title: "Legal Recognition of Electronic Records",
        desc: "Provides legal validity to electronic documents, records, and digital signatures."
      },
      {
        title: "Legal Recognition of Digital Signatures",
        desc: "Ensures authentication and integrity of electronic transactions."
      },
      {
        title: "Promotion of E-Commerce",
        desc: "Encourages online trade, digital payments, and electronic contracts."
      },
      {
        title: "Support for E-Governance",
        desc: "Facilitates paperless governance and online delivery of government services."
      },
      {
        title: "Prevention of Cyber Crimes",
        desc: "Defines cyber offences to discourage illegal activities in cyberspace."
      },
      {
        title: "Punishment of Cyber Criminals",
        desc: "Prescribes penalties and imprisonment for various cyber offences."
      },
      {
        title: "Protection of Data & Privacy",
        desc: "Safeguards sensitive personal and confidential information from misuse."
      },
      {
        title: "Regulation of Digital Intermediaries",
        desc: "Fixes legal responsibilities of ISPs, websites, and online platforms."
      },
      {
        title: "Protection of Critical Information Infrastructure",
        desc: "Secures systems vital to national security, economy, and public safety."
      },
      {
        title: "Strengthening National Cyber Security",
        desc: "Improves preparedness against cyber attacks and digital threats."
      },
      {
        title: "Establishment of Cyber Authorities",
        desc: "Creates bodies like CERT-In for incident response and cyber coordination."
      },
      {
        title: "Consumer Confidence in Digital Systems",
        desc: "Builds trust in online services by ensuring safety and legal protection."
      },
      {
        title: "Addressing Emerging Cyber Threats",
        desc: "Enables legal response to new forms of cyber fraud and cyber attacks."
      },
      {
        title: "Facilitating Secure Digital Communication",
        desc: "Ensures confidentiality, integrity, and authenticity of electronic communication."
      },
      {
        title: "International Applicability of Cyber Law",
        desc: "Applies the Act to offences committed outside India affecting Indian systems."
      },
      {
        title: "Corporate Accountability",
        desc: "Holds companies and their officials liable for cyber law violations."
      },
      {
        title: "Encouragement of Ethical Use of Technology",
        desc: "Promotes responsible and lawful use of digital resources."
      },
      {
        title: "Reduction of Paper-Based Processes",
        desc: "Promotes digital documentation to increase efficiency and transparency."
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
          ✅ {item.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">
          {item.desc}
        </p>

      </div>
    ))}

  </div>
</section>

      {/* ===============================
          LEGAL NOTE
      =============================== */}
    <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 md:p-8
  transition-all duration-300 hover:border-red-400/50
  hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]">

  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-red-400 flex items-center gap-2">
    ⚠ Legal Awareness & Compliance
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Violations of the <strong>Information Technology Act, 2000</strong> can lead to
    <strong> heavy fines, imprisonment, or both</strong>, depending on the nature
    and severity of the offence. Cyber crimes are treated as
    <strong> serious legal violations</strong> under Indian law.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Individuals, organizations, and companies are expected to
    <strong> comply with cyber laws</strong> while using computers,
    mobile devices, and internet-based platforms. Ignorance of the law
    <strong> is not a valid defense</strong>.
  </p>

  <div className="mt-4 bg-red-950/40 border border-red-500/40 rounded-lg p-4">
    <ul className="space-y-2 text-gray-300 text-sm">
      <li>• Follow ethical and lawful use of digital technologies</li>
      <li>• Respect data privacy and confidentiality</li>
      <li>• Avoid unauthorized access or misuse of systems</li>
      <li>• Report cyber offences promptly to authorities</li>
    </ul>
  </div>

  <p className="text-red-300 text-sm mt-4 italic">
    Being cyber-aware not only prevents legal trouble but also helps in
    creating a safer and more trustworthy digital environment.
  </p>
</section>
    </div>
  );
}
