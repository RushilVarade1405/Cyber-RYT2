import { Link } from "react-router-dom";

export default function ITActs() {
  return (
    <div className="px-6 sm:px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK TO CYBER LAWS
      =============================== */}
      <Link to="/cyber-laws" className="text-cyan-400 hover:underline inline-flex items-center gap-2 group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to Cyber Laws</span>
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-6 text-cyan-400">
        Information Technology Act, 2000
      </h1>

      {/* ===============================
          BADGES – IT ACTS
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-12">
        <span className="px-4 py-2 text-sm rounded-full bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition-colors">
          Legal Compliance
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 hover:bg-orange-600/30 transition-colors">
          Cyber Crime Law
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 transition-colors">
          Digital Evidence
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-colors">
          Data Protection
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-600/30 transition-colors">
          Penalties & Fines
        </span>
      </div>

      {/* ===============================
          INTRODUCTION (IMPROVED)
      =============================== */}
      <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6 sm:p-8 mb-12">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-4xl">⚖️</span>
          <div>
            <h2 className="text-cyan-300 font-semibold text-xl mb-3">About the IT Act</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              The <strong className="text-cyan-400">Information Technology Act, 2000 (IT Act)</strong> is India's primary cyber law that provides <strong>legal recognition to electronic records, digital signatures, and online transactions</strong>. It establishes a comprehensive legal framework for <strong>cyber security, electronic governance, and cyber crime control</strong>.
            </p>
            <p className="text-gray-300 leading-relaxed mb-3">
              Enacted on <strong>June 9, 2000</strong> and amended in <strong>2008</strong>, the IT Act was created to support the growth of <strong>e-commerce, digital communication, and online services</strong> while defining <strong>penalties and punishments for cyber offences</strong> such as hacking, identity theft, data breaches, and online fraud.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#0d1628] border border-cyan-500/10 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-1 text-sm">Enacted</p>
            <p className="text-gray-300 text-lg font-bold">June 9, 2000</p>
          </div>
          <div className="bg-[#0d1628] border border-cyan-500/10 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-1 text-sm">Major Amendment</p>
            <p className="text-gray-300 text-lg font-bold">2008 (IT Act 2008)</p>
          </div>
          <div className="bg-[#0d1628] border border-cyan-500/10 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-1 text-sm">Jurisdiction</p>
            <p className="text-gray-300 text-lg font-bold">India + Extraterritorial</p>
          </div>
        </div>
      </div>

      {/* ===============================
          WHAT IS IT ACT (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
          What Is the IT Act?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl mb-3 block">📜</span>
            <h3 className="text-cyan-400 font-semibold mb-2">Legal Framework</h3>
            <p className="text-gray-300 text-sm">
              Governs electronic data, online communication, and provides legal validity to digital documents and signatures.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-purple-500/20 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl mb-3 block">🔍</span>
            <h3 className="text-purple-400 font-semibold mb-2">Investigation Powers</h3>
            <p className="text-gray-300 text-sm">
              Empowers authorities to investigate cyber crimes, impose penalties, and regulate digital platforms.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/20 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl mb-3 block">🌐</span>
            <h3 className="text-yellow-400 font-semibold mb-2">Intermediary Regulation</h3>
            <p className="text-gray-300 text-sm">
              Defines responsibilities of ISPs, websites, and social media platforms for content moderation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/20 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl mb-3 block">🌍</span>
            <h3 className="text-red-400 font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-300 text-sm">
              Applies to offences within India and outside if involving Indian computer systems or networks.
            </p>
          </div>
        </div>
      </section>

      {/* ===============================
          KEY SECTIONS (IMPROVED & ORGANIZED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
          Important Sections of IT Act
        </h2>

        {/* Civil Liability & Compensation */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-green-500 rounded"></span>
            Civil Liability & Compensation
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                section: "Section 43",
                title: "Unauthorized Access",
                desc: "Penalty for unauthorized access, downloading, damage, or disruption of computer systems, networks, or data without permission.",
                penalty: "Compensation up to ₹1 crore",
                applies: "Civil liability"
              },
              {
                section: "Section 43A",
                title: "Data Protection Breach",
                desc: "Corporate body failing to protect sensitive personal data or implement reasonable security practices causing wrongful loss.",
                penalty: "Pay damages to affected persons",
                applies: "Body corporates"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-green-500/30 rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-600/20 text-green-300 border border-green-500/30 font-semibold">
                    {item.section}
                  </span>
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2 text-lg">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="space-y-2 pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-red-400">
                    <strong>Penalty:</strong> {item.penalty}
                  </p>
                  <p className="text-xs text-gray-400">
                    <strong>Applies to:</strong> {item.applies}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Computer Related Offences */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-cyan-500 rounded"></span>
            Computer Related Offences
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                section: "Section 65",
                title: "Tampering with Source Documents",
                desc: "Intentionally concealing, destroying, or altering computer source code required by law to be kept or maintained.",
                penalty: "Imprisonment up to 3 years + fine up to ₹2 lakhs"
              },
              {
                section: "Section 66",
                title: "Computer Related Offences",
                desc: "Dishonestly or fraudulently committing acts mentioned in Section 43, such as hacking, data theft, or system damage.",
                penalty: "Imprisonment up to 3 years + fine up to ₹5 lakhs"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/30 rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                    {item.section}
                  </span>
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-red-400">
                    <strong>⚠ Penalty:</strong> {item.penalty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cyber Fraud & Identity Crimes */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-yellow-500 rounded"></span>
            Cyber Fraud & Identity Crimes
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                section: "Section 66A",
                title: "Offensive Messages",
                desc: "Sending offensive messages through communication services causing annoyance or inconvenience. [STRUCK DOWN by Supreme Court in 2015]",
                penalty: "N/A - Unconstitutional",
                status: "Invalid"
              },
              {
                section: "Section 66B",
                title: "Stolen Computer Resources",
                desc: "Dishonestly receiving or retaining stolen computer resource or communication device knowing it to be stolen.",
                penalty: "Imprisonment up to 3 years + fine up to ₹1 lakh",
                status: "Active"
              },
              {
                section: "Section 66C",
                title: "Identity Theft",
                desc: "Fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature.",
                penalty: "Imprisonment up to 3 years + fine up to ₹1 lakh",
                status: "Active"
              },
              {
                section: "Section 66D",
                title: "Cheating by Personation",
                desc: "Cheating by impersonating someone using computer resources or communication devices for fraudulent gain.",
                penalty: "Imprisonment up to 3 years + fine up to ₹1 lakh",
                status: "Active"
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border ${item.status === 'Invalid' ? 'border-gray-500/30' : 'border-yellow-500/30'} rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 ${item.status === 'Invalid' ? 'opacity-60' : 'hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 text-xs rounded-full ${item.status === 'Invalid' ? 'bg-gray-600/20 text-gray-300 border-gray-500/30' : 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'} border font-semibold`}>
                    {item.section}
                  </span>
                  {item.status === 'Invalid' && (
                    <span className="px-2 py-1 text-xs rounded bg-red-600/20 text-red-400 border border-red-500/30">
                      Struck Down
                    </span>
                  )}
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="pt-3 border-t border-gray-700/50">
                  <p className={`text-xs ${item.status === 'Invalid' ? 'text-gray-400' : 'text-red-400'}`}>
                    <strong>⚠ Penalty:</strong> {item.penalty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Confidentiality */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-purple-500 rounded"></span>
            Privacy & Confidentiality
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                section: "Section 66E",
                title: "Privacy Violation",
                desc: "Intentionally capturing, publishing, or transmitting images of private areas of any person without consent, violating privacy.",
                penalty: "Imprisonment up to 3 years + fine up to ₹2 lakhs",
                examples: "Voyeurism, revenge porn"
              },
              {
                section: "Section 72",
                title: "Breach of Confidentiality",
                desc: "Unauthorized disclosure of electronic records, information, or data secured by intermediaries or persons accessing such data.",
                penalty: "Imprisonment up to 2 years + fine up to ₹1 lakh",
                examples: "Employee data theft, leaks"
              },
              {
                section: "Section 72A",
                title: "Disclosure Without Consent",
                desc: "Disclosing personal information obtained during lawful contract without consent, causing wrongful loss or gain.",
                penalty: "Imprisonment up to 3 years + fine up to ₹5 lakhs",
                examples: "GDPR violations, data selling"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-purple-500/30 rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30 font-semibold">
                    {item.section}
                  </span>
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="space-y-2 pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-red-400">
                    <strong>⚠ Penalty:</strong> {item.penalty}
                  </p>
                  <p className="text-xs text-gray-400">
                    <strong>e.g.</strong> {item.examples}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* National Security & Critical Infrastructure */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-red-500 rounded"></span>
            National Security & Critical Infrastructure
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                section: "Section 66F",
                title: "Cyber Terrorism",
                desc: "Accessing or attempting to access protected systems with intent to threaten unity, integrity, security, or sovereignty of India.",
                penalty: "Life imprisonment",
                severity: "Most severe"
              },
              {
                section: "Section 69",
                title: "Interception Powers",
                desc: "Government power to intercept, monitor, or decrypt any information through any computer resource in the interest of sovereignty, security, or public order.",
                penalty: "Imprisonment up to 7 years + fine",
                severity: "High"
              },
              {
                section: "Section 70",
                title: "Protected Systems",
                desc: "Unauthorized access to protected systems declared by government. Protects critical information infrastructure.",
                penalty: "Imprisonment up to 10 years + fine",
                severity: "High"
              },
              {
                section: "Section 70B",
                title: "CERT-In",
                desc: "Establishes Indian Computer Emergency Response Team (CERT-In) to serve as national agency for incident response and cybersecurity coordination.",
                penalty: "Regulatory authority",
                severity: "Infrastructure"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-300 border border-red-500/30 font-semibold">
                    {item.section}
                  </span>
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="space-y-2 pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-red-400">
                    <strong>⚠ Penalty:</strong> {item.penalty}
                  </p>
                  <p className="text-xs text-orange-400">
                    <strong>Severity:</strong> {item.severity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Obscene & Harmful Content */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-orange-500 rounded"></span>
            Obscene & Harmful Content
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                section: "Section 67",
                title: "Obscene Content",
                desc: "Publishing or transmitting obscene material in electronic form including sexually explicit content.",
                penalty: "First offense: 3 years + ₹5 lakh fine | Subsequent: 5 years + ₹10 lakh fine"
              },
              {
                section: "Section 67A",
                title: "Sexual Content",
                desc: "Publishing or transmitting material containing sexually explicit acts or conduct in electronic form.",
                penalty: "First offense: 5 years + ₹10 lakh fine | Subsequent: 7 years + ₹10 lakh fine"
              },
              {
                section: "Section 67B",
                title: "Child Sexual Abuse Material",
                desc: "Publishing, creating, collecting, browsing, downloading, advertising, or promoting child sexual abuse material (CSAM).",
                penalty: "First offense: 5 years + ₹10 lakh fine | Subsequent: 7 years + ₹10 lakh fine"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-orange-500/30 rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-orange-600/20 text-orange-300 border border-orange-500/30 font-semibold">
                    {item.section}
                  </span>
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2 text-lg">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-red-400">
                    <strong>⚠ Penalty:</strong> {item.penalty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Framework & Jurisdiction */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-blue-500 rounded"></span>
            Legal Framework & Jurisdiction
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                section: "Section 75",
                title: "Extra-Territorial Application",
                desc: "IT Act applies to any offence or contravention committed outside India by any person if it involves a computer, computer system, or network located in India.",
                impact: "Global jurisdiction"
              },
              {
                section: "Section 79",
                title: "Intermediary Liability",
                desc: "Exempts intermediaries (ISPs, social media) from liability if they follow due diligence and remove illegal content promptly when notified.",
                impact: "Safe harbor provisions"
              },
              {
                section: "Section 85",
                title: "Corporate Liability",
                desc: "When an offence is committed by a company, every person in charge and the company shall be deemed guilty unless they prove lack of knowledge or due diligence.",
                impact: "Executive accountability"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-blue-500/30 rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold">
                    {item.section}
                  </span>
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-blue-400">
                    <strong>Impact:</strong> {item.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================
          OBJECTIVES (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-cyan-300">
          Key Objectives of the IT Act
        </h2>

        <p className="text-gray-400 mb-8 max-w-3xl">
          The Information Technology Act, 2000 aims to create a secure, legal, and trustworthy digital ecosystem by regulating electronic activities, protecting users, and preventing cyber crimes.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            {
              icon: "📝",
              title: "Legal Recognition of Electronic Records",
              desc: "Provides legal validity to electronic documents, records, and contracts for government and commercial use.",
            },
            {
              icon: "✍️",
              title: "Digital Signature Authentication",
              desc: "Ensures authentication, integrity, and non-repudiation of electronic transactions through digital signatures.",
            },
            {
              icon: "🛒",
              title: "E-Commerce Promotion",
              desc: "Encourages online trade, digital payments, electronic contracts, and growth of digital economy.",
            },
            {
              icon: "🏛️",
              title: "E-Governance Support",
              desc: "Facilitates paperless governance and online delivery of government services to citizens.",
            },
            {
              icon: "🚫",
              title: "Cyber Crime Prevention",
              desc: "Defines cyber offences clearly to discourage illegal activities in cyberspace.",
            },
            {
              icon: "⚖️",
              title: "Criminal Prosecution",
              desc: "Prescribes penalties, fines, and imprisonment for various cyber offences and violations.",
            },
            {
              icon: "🔒",
              title: "Data Protection",
              desc: "Safeguards sensitive personal, financial, and confidential information from misuse and breaches.",
            },
            {
              icon: "🌐",
              title: "Intermediary Regulation",
              desc: "Establishes legal responsibilities for ISPs, websites, social media, and online platforms.",
            },
            {
              icon: "🛡️",
              title: "Critical Infrastructure Protection",
              desc: "Secures systems vital to national security, economy, defense, and public safety.",
            },
            {
              icon: "🇮🇳",
              title: "National Cybersecurity",
              desc: "Improves India's preparedness against cyber attacks, cyber warfare, and digital threats.",
            },
            {
              icon: "🚨",
              title: "CERT-In Establishment",
              desc: "Creates national Computer Emergency Response Team for incident handling and coordination.",
            },
            {
              icon: "✅",
              title: "Consumer Confidence",
              desc: "Builds trust in online services by ensuring safety, privacy, and legal protection.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-cyan-400 font-semibold mb-2 text-sm group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          KEY AMENDMENTS
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
          Major Amendments: IT Act 2008
        </h2>

        <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6 sm:p-8">
          <p className="text-gray-300 mb-6">
            The IT (Amendment) Act, 2008 significantly expanded the original 2000 Act to address emerging cyber threats and align with global standards.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "New Cyber Crimes Added",
                changes: ["Identity theft (66C)", "Cyber terrorism (66F)", "Privacy violations (66E)", "Child pornography (67B)"]
              },
              {
                title: "Data Protection Rules",
                changes: ["Mandatory security practices (43A)", "Compensation for data breaches", "Reasonable security standards"]
              },
              {
                title: "Intermediary Liability",
                changes: ["Safe harbor provisions (79)", "Due diligence requirements", "Content moderation obligations"]
              },
              {
                title: "Enhanced Penalties",
                changes: ["Increased fines and imprisonment", "Stricter punishment for severe crimes", "Corporate liability provisions"]
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#0d1628] border border-cyan-500/10 rounded-lg p-5">
                <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.changes.map((change, j) => (
                    <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================
          LEGAL NOTE (IMPROVED)
      =============================== */}
      <section className="bg-gradient-to-br from-red-900/20 to-red-950/30 border border-red-500/30 rounded-xl p-6 sm:p-8 hover:border-red-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-red-400 flex items-center gap-2">
          <span className="text-2xl">⚠</span>
          Legal Awareness & Compliance
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          Violations of the <strong>Information Technology Act, 2000</strong> can lead to <strong>severe consequences</strong> including heavy fines, imprisonment, or both, depending on the nature and severity of the offence. Cyber crimes are treated as <strong>serious legal violations</strong> under Indian law.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mb-4">
          <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-4">
            <h3 className="text-red-300 font-semibold mb-2 text-sm">Civil Penalties</h3>
            <p className="text-gray-300 text-xs">Compensation up to <strong className="text-red-400">₹1 crore</strong> for damages</p>
          </div>
          <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-4">
            <h3 className="text-red-300 font-semibold mb-2 text-sm">Criminal Penalties</h3>
            <p className="text-gray-300 text-xs">Imprisonment from <strong className="text-red-400">2 years to Life</strong></p>
          </div>
          <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-4">
            <h3 className="text-red-300 font-semibold mb-2 text-sm">Financial Fines</h3>
            <p className="text-gray-300 text-xs">Fines ranging <strong className="text-red-400">₹1 lakh to ₹10 lakh+</strong></p>
          </div>
        </div>

        <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-5 mb-4">
          <h4 className="text-red-300 font-semibold mb-3 text-sm">Compliance Essentials:</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Follow ethical and lawful use of digital technologies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Respect data privacy, confidentiality, and consent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Avoid unauthorized access, hacking, or misuse of systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Report cyber offences promptly to authorities (Dial 1930)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Implement reasonable security practices for data protection</span>
            </li>
          </ul>
        </div>

        <p className="text-red-300 text-sm italic font-medium">
          ⚖️ Remember: Ignorance of the law is not a valid defense. Being cyber-aware not only prevents legal trouble but also helps create a safer and more trustworthy digital environment for everyone.
        </p>
      </section>
    </div>
  );
}