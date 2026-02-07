import { Link } from "react-router-dom";

export default function CyberEthics() {
  return (
    <div className="px-6 sm:px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK LINK
      =============================== */}
      <Link to="/cyber-laws" className="text-cyan-400 hover:underline inline-flex items-center gap-2 group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to Cyber Laws</span>
      </Link>

      {/* ===============================
          PAGE HEADER
      =============================== */}
      <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-6 text-cyan-400">
        Cyber Ethics
      </h1>

      {/* ===============================
          BADGES
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-12">
        <span className="px-4 py-2 text-sm rounded-full bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30 transition-colors">
          Ethical Use
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 transition-colors">
          Digital Responsibility
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-colors">
          Cyber Awareness
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-colors">
          Moral Framework
        </span>
      </div>

      {/* ===============================
          WHAT IS CYBER ETHICS (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-cyan-300">
          What is Cyber Ethics?
        </h2>

        <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">🧭</span>
            <div>
              <h3 className="text-cyan-400 font-semibold text-lg mb-2">Definition</h3>
              <p className="text-gray-300 leading-relaxed">
                Cyber Ethics refers to the <strong>moral principles and standards</strong> that govern the use of computers, information systems, digital communication, and internet-based technologies. It provides a framework for understanding <strong>what is right and wrong</strong> while interacting in the cyber world.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#0d1628] border border-cyan-500/10 rounded-lg p-5">
              <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">🌐</span>
                Why It Matters
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                With the rapid growth of the internet, social media, cloud computing, AI, and IoT, ethical issues like <strong>privacy violations, cyber crimes, digital surveillance, data misuse, and algorithmic bias</strong> have increased significantly.
              </p>
            </div>

            <div className="bg-[#0d1628] border border-cyan-500/10 rounded-lg p-5">
              <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Core Goal
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Cyber Ethics aims to promote <strong>responsible behavior</strong> by encouraging users to respect privacy, protect digital assets, avoid illegal activities, follow cyber laws, and contribute to a <strong>safe digital society</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "🛡️",
              title: "Protection",
              desc: "Safeguards individual privacy and data security"
            },
            {
              icon: "⚖️",
              title: "Fairness",
              desc: "Ensures equal access and treatment in digital spaces"
            },
            {
              icon: "🤝",
              title: "Respect",
              desc: "Promotes dignified online interactions"
            },
            {
              icon: "📜",
              title: "Compliance",
              desc: "Aligns with legal frameworks and policies"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-lg p-5 text-center hover:-translate-y-1 transition-all duration-300 hover:border-cyan-400/40"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="text-cyan-400 font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-300 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          CORE PRINCIPLES (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-cyan-300">
          Core Principles of Cyber Ethics
        </h2>

        <p className="text-gray-400 mb-8 max-w-3xl">
          Cyber Ethics is built on fundamental principles that guide responsible, lawful, and respectful behavior in the digital world. These principles form the foundation of ethical technology use.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Privacy",
              desc: "Every individual has the right to keep personal data confidential. Ethical users do not access, share, monitor, or misuse sensitive information without proper authorization and informed consent.",
              icon: "🔐",
              examples: "Don't share others' data, respect confidentiality",
              color: "cyan"
            },
            {
              title: "Integrity",
              desc: "Integrity requires honesty and transparency in online activities, including avoiding fake identities, misinformation, plagiarism, and digital manipulation that misleads or harms others.",
              icon: "🧭",
              examples: "Be authentic, cite sources, avoid fake profiles",
              color: "blue"
            },
            {
              title: "Intellectual Property",
              desc: "Digital creations such as software, music, videos, articles, and designs must be respected. Ethical use prohibits piracy, unauthorized copying, and requires proper attribution and licensing.",
              icon: "📚",
              examples: "Buy licensed software, credit creators",
              color: "purple"
            },
            {
              title: "Accountability",
              desc: "Users are responsible for their online actions. Activities like hacking, fraud, harassment, or abuse leave digital footprints and are punishable under cyber laws. Own your actions.",
              icon: "⚖️",
              examples: "Accept consequences, think before posting",
              color: "yellow"
            },
            {
              title: "Security Awareness",
              desc: "Ethical users follow safe cybersecurity practices such as creating strong passwords, installing updates, using encryption, and avoiding suspicious links, exploits, or malicious software.",
              icon: "🛡️",
              examples: "Use 2FA, keep software updated, backup data",
              color: "green"
            },
            {
              title: "Respectful Conduct",
              desc: "Cyber ethics promotes respectful communication by discouraging cyber bullying, harassment, hate speech, trolling, doxing, and online abuse. Treat others with dignity and empathy.",
              icon: "🤝",
              examples: "Be kind online, report abuse, support victims",
              color: "pink"
            },
            {
              title: "Digital Responsibility",
              desc: "Users must act responsibly online, understanding the real-world impact of posts, shares, comments, and digital actions on individuals, communities, and society at large.",
              icon: "🌐",
              examples: "Verify before sharing, consider consequences",
              color: "cyan"
            },
            {
              title: "Legal Compliance",
              desc: "Ethical technology use requires compliance with cyber laws, IT Acts, data protection regulations (GDPR, CCPA), copyright laws, and platform policies. Ignorance is not a defense.",
              icon: "📜",
              examples: "Follow terms of service, obey cyber laws",
              color: "red"
            },
            {
              title: "Fair Use",
              desc: "Fair use ensures digital resources, bandwidth, computing power, and access privileges are used ethically without abuse, exploitation, or denial of service to others who need them.",
              icon: "⚖️",
              examples: "Don't hog resources, share fairly",
              color: "orange"
            },
            {
              title: "Social Responsibility",
              desc: "Users should actively promote awareness, report cyber crimes, avoid creating or spreading harmful content, support digital literacy, and contribute to building a safe digital environment.",
              icon: "🌍",
              examples: "Educate others, report crimes, be a good citizen",
              color: "teal"
            },
            {
              title: "Transparency",
              desc: "Be open about intentions, affiliations, and potential conflicts of interest when sharing information or engaging in online activities, especially in professional or commercial contexts.",
              icon: "🔍",
              examples: "Disclose sponsorships, be honest about motives",
              color: "indigo"
            },
            {
              title: "Non-Maleficence",
              desc: "The principle of 'do no harm' applies to cyberspace. Avoid actions that could damage systems, compromise security, violate privacy, or cause psychological, financial, or reputational harm.",
              icon: "🚫",
              examples: "Don't hack, spread malware, or doxx people",
              color: "red"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400/0 via-cyan-400/70 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-l-xl" />

              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <h3 className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {item.desc}
              </p>

              <div className="pt-3 border-t border-gray-700/50">
                <p className="text-xs text-green-400">
                  <strong>✓ Examples:</strong> {item.examples}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          IMPORTANCE (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-cyan-300">
          Importance of Cyber Ethics
        </h2>

        <p className="text-gray-400 mb-8 max-w-3xl">
          Cyber Ethics plays a crucial role in ensuring that digital technology is used in a responsible, lawful, and socially acceptable manner. It helps individuals, organizations, and governments maintain trust, security, and integrity in the cyber world.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Promotes Responsible Technology Use",
              desc: "Cyber ethics encourages users to act responsibly while using digital devices, networks, and online platforms, reducing careless, reckless, or harmful behavior that could damage systems or hurt people.",
              icon: "🧠",
              impact: "Creates mindful digital citizens"
            },
            {
              title: "Prevents Cyber Crimes",
              desc: "Ethical awareness helps reduce cyber crimes such as hacking, identity theft, phishing, online fraud, and cyber stalking by promoting lawful behavior and deterring malicious activities.",
              icon: "🚫",
              impact: "Lowers crime rates and victimization"
            },
            {
              title: "Protects Privacy & Personal Data",
              desc: "Cyber ethics emphasizes respect for privacy and safeguards sensitive personal, financial, health, and confidential information from misuse, unauthorized access, or data breaches.",
              icon: "🔒",
              impact: "Reduces data breaches by 60%"
            },
            {
              title: "Builds Trust in Digital Systems",
              desc: "Ethical conduct strengthens user trust in online communication, digital payments, e-commerce, cloud services, and emerging technologies like AI and blockchain.",
              icon: "🤝",
              impact: "Increases digital adoption rates"
            },
            {
              title: "Ensures Legal Compliance",
              desc: "Following cyber ethics helps individuals and organizations comply with cyber laws, IT Acts, GDPR, CCPA, and data protection regulations, avoiding legal penalties, fines, and lawsuits.",
              icon: "⚖️",
              impact: "Prevents costly legal issues"
            },
            {
              title: "Creates Safe Digital Environment",
              desc: "By discouraging cyber bullying, harassment, hate speech, doxing, and misuse of technology, cyber ethics promotes a positive, inclusive, and secure digital society for all.",
              icon: "🌍",
              impact: "Reduces online toxicity by 45%"
            },
            {
              title: "Supports Organizational Security",
              desc: "Ethical behavior reduces insider threats, data leaks, corporate espionage, and system misuse, thereby strengthening organizational cybersecurity posture and resilience.",
              icon: "🏢",
              impact: "Cuts insider threat incidents by 50%"
            },
            {
              title: "Encourages Ethical Innovation",
              desc: "Cyber ethics guides responsible development and deployment of emerging technologies like AI, IoT, quantum computing, and big data analytics without harming society or violating rights.",
              icon: "🚀",
              impact: "Prevents AI bias and automation harm"
            },
            {
              title: "Protects Digital Reputation",
              desc: "Ethical online conduct helps individuals and organizations maintain credibility, trustworthiness, and positive reputation in the digital space, essential for personal and business success.",
              icon: "⭐",
              impact: "Builds long-term brand value"
            },
            {
              title: "Reduces Economic Losses",
              desc: "By preventing cyber crimes, data breaches, and fraud, cyber ethics helps save billions in financial losses, recovery costs, and reputational damage globally each year.",
              icon: "💰",
              impact: "Saves $6 trillion annually by 2025"
            },
            {
              title: "Empowers Vulnerable Groups",
              desc: "Ethical practices protect children, elderly, minorities, and marginalized communities from online exploitation, discrimination, and targeted attacks in digital spaces.",
              icon: "🛡️",
              impact: "Creates inclusive digital spaces"
            },
            {
              title: "Fosters Digital Literacy",
              desc: "Cyber ethics education improves digital literacy, critical thinking, and informed decision-making, enabling users to navigate online risks and opportunities effectively.",
              icon: "📚",
              impact: "Increases cyber awareness by 70%"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400/0 via-cyan-400/70 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-l-xl" />

              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <h3 className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {item.desc}
              </p>

              <div className="pt-3 border-t border-gray-700/50">
                <p className="text-xs text-purple-400">
                  <strong>📊 Impact:</strong> {item.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          ETHICAL vs UNETHICAL (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-cyan-300">
          Ethical vs Unethical Use of Technology
        </h2>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-green-900/20 to-green-950/30 border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              Ethical Practices
            </h3>
            <div className="space-y-3">
              {[
                { practice: "Using genuine and licensed software", why: "Supports developers and prevents malware" },
                { practice: "Respecting privacy and obtaining consent", why: "Protects personal boundaries and trust" },
                { practice: "Securing systems with strong passwords & encryption", why: "Prevents unauthorized access" },
                { practice: "Reporting cyber crimes and suspicious activities", why: "Helps law enforcement protect others" },
                { practice: "Using social media responsibly and ethically", why: "Prevents misinformation and harm" },
                { practice: "Giving proper credit to original creators", why: "Respects intellectual property rights" },
                { practice: "Following organizational IT policies", why: "Maintains workplace security" },
                { practice: "Protecting personal and professional data", why: "Prevents identity theft and fraud" },
                { practice: "Verifying information before sharing online", why: "Stops misinformation spread" },
                { practice: "Using technology for lawful purposes only", why: "Complies with legal frameworks" },
                { practice: "Educating others about cyber safety", why: "Builds safer digital communities" },
                { practice: "Contributing to open-source ethically", why: "Advances technology responsibly" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-green-900/20 rounded-lg p-3 hover:bg-green-900/30 transition-colors"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-400 flex-shrink-0"></span>
                  <div>
                    <p className="text-gray-200 text-sm font-medium">{item.practice}</p>
                    <p className="text-gray-400 text-xs mt-1">→ {item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-red-950/30 border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-red-400 flex items-center gap-2">
              <span className="text-2xl">❌</span>
              Unethical Practices
            </h3>
            <div className="space-y-3">
              {[
                { practice: "Hacking or unauthorized system access", consequence: "Criminal charges, imprisonment" },
                { practice: "Software piracy and illegal downloads", consequence: "Fines up to $150,000 per violation" },
                { practice: "Cyber stalking, bullying, or harassment", consequence: "Restraining orders, legal action" },
                { practice: "Spreading fake news or malware", consequence: "Account suspension, lawsuits" },
                { practice: "Identity theft and online fraud", consequence: "15+ years imprisonment" },
                { practice: "Creating fake profiles or impersonation", consequence: "Identity fraud charges" },
                { practice: "Sharing confidential data without consent", consequence: "Privacy law violations, GDPR fines" },
                { practice: "Bypassing security controls", consequence: "Computer Fraud and Abuse Act violations" },
                { practice: "Misusing digital resources", consequence: "Termination, legal consequences" },
                { practice: "Using technology to harm others", consequence: "Civil and criminal liability" },
                { practice: "Plagiarizing or stealing content", consequence: "Copyright infringement suits" },
                { practice: "Ignoring data protection regulations", consequence: "GDPR fines up to €20M or 4% revenue" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-red-900/20 rounded-lg p-3 hover:bg-red-900/30 transition-colors"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-red-400 flex-shrink-0"></span>
                  <div>
                    <p className="text-gray-200 text-sm font-medium">{item.practice}</p>
                    <p className="text-red-300 text-xs mt-1">⚠ {item.consequence}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===============================
          ETHICAL DILEMMAS IN TECH
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
          Common Ethical Dilemmas in Technology
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "🤖",
              title: "AI & Automation",
              dilemma: "Should AI replace human jobs? How do we address algorithmic bias?",
              considerations: "Balance efficiency with employment, ensure fairness"
            },
            {
              icon: "🔍",
              title: "Privacy vs Security",
              dilemma: "How much surveillance is acceptable for security?",
              considerations: "Balance safety needs with individual privacy rights"
            },
            {
              icon: "💾",
              title: "Data Ownership",
              dilemma: "Who owns user-generated data and how can it be used?",
              considerations: "User rights vs platform business models"
            },
            {
              icon: "🧬",
              title: "Genetic Privacy",
              dilemma: "Should genetic data be shared for research or insurance?",
              considerations: "Medical advancement vs discrimination risks"
            },
            {
              icon: "🎮",
              title: "Digital Addiction",
              dilemma: "Are tech companies responsible for addictive design?",
              considerations: "User choice vs manipulative design patterns"
            },
            {
              icon: "🌐",
              title: "Internet Access",
              dilemma: "Is internet access a human right? Who should provide it?",
              considerations: "Digital divide, equity, infrastructure costs"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-purple-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-purple-400 font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm mb-3 italic">"{item.dilemma}"</p>
              <div className="pt-3 border-t border-gray-700/50">
                <p className="text-xs text-gray-400">
                  <strong>Key considerations:</strong> {item.considerations}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          ETHICAL NOTE (IMPROVED)
      =============================== */}
      <section className="bg-gradient-to-br from-red-900/20 to-red-950/30 border border-red-500/30 rounded-xl p-6 sm:p-8 hover:border-red-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-red-400 flex items-center gap-2">
          <span className="text-2xl">🛡</span>
          Ethical Use & Professional Responsibility
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          All cybersecurity concepts, techniques, and tools discussed here are meant strictly for <strong>ethical, educational, and defensive purposes</strong> only. This includes learning, research, academic study, system protection, authorized security testing, and improving digital safety.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          Using cybersecurity tools, techniques, or knowledge <strong>without proper authorization</strong> is unethical, illegal, and may lead to <strong>serious legal consequences</strong> including criminal charges, fines, and imprisonment. Ethical users must <strong>always obtain explicit written permission</strong> before accessing, testing, or analyzing any system, network, or data.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-4">
            <h3 className="text-red-300 font-semibold mb-3 text-sm flex items-center gap-2">
              <span>✓</span>
              Acceptable Uses
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Ethical learning and cyber defense education</li>
              <li>• Testing on owned or authorized systems only</li>
              <li>• Bug bounty programs with proper disclosure</li>
              <li>• Academic research with ethical approval</li>
              <li>• Security audits with client permission</li>
            </ul>
          </div>

          <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-4">
            <h3 className="text-red-300 font-semibold mb-3 text-sm flex items-center gap-2">
              <span>✗</span>
              Prohibited Activities
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Unauthorized access to any system</li>
              <li>• Malicious exploitation or harm</li>
              <li>• Privacy violations or data theft</li>
              <li>• Distributing malware or hacking tools</li>
              <li>• Testing without explicit permission</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-5">
          <h4 className="text-red-300 font-semibold mb-3 text-sm">The Ethical Hacker's Oath:</h4>
          <blockquote className="text-gray-300 text-sm italic border-l-4 border-red-500/50 pl-4">
            "I will use my knowledge and skills only for ethical purposes, with proper authorization, respecting privacy and confidentiality. I will never cause harm, exploit vulnerabilities for personal gain, or compromise security systems without explicit permission. I commit to being a force for good in the digital world."
          </blockquote>
        </div>

        <p className="text-red-300 text-sm mt-4 italic font-medium">
          ⚠ Remember: Ethical use of technology is not optional—it's mandatory. Misuse of tools can lead to legal action, permanent damage to your reputation, loss of professional opportunities, and severe consequences for victims.
        </p>
      </section>
    </div>
  );
}