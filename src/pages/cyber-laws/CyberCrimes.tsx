import { Link } from "react-router-dom";

export default function CyberCrimes() {
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
        Cyber Crimes
      </h1>

      {/* ===============================
          BADGES – CYBER CRIMES
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-12">
        <span className="px-4 py-2 text-sm rounded-full bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition-colors">
          High Risk
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 hover:bg-orange-600/30 transition-colors">
          Criminal Offense
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-colors">
          Identity Threat
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 transition-colors">
          Digital Fraud
        </span>
        <span className="px-4 py-2 text-sm rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-600/30 transition-colors">
          Punishable by Law
        </span>
      </div>

      {/* ===============================
          INTRODUCTION
      =============================== */}
      <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6 sm:p-8 mb-12">
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">Cyber crimes</strong> refer to a wide range of
          <strong> unlawful activities committed using computers, mobile devices,
          digital networks, or internet-based platforms</strong>.
          These crimes involve the misuse of technology to
          <strong> steal information, commit fraud, disrupt services,
          violate privacy, or cause financial and reputational harm</strong>.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          Cyber crimes can target
          <strong> individuals, private organizations, financial institutions,
          and even governments</strong>.
          Attackers often exploit
          <strong> technical vulnerabilities</strong> such as weak security systems,
          outdated software, and insecure networks, as well as
          <strong> human vulnerabilities</strong> including lack of awareness,
          trust manipulation, and social engineering techniques.
        </p>

        <p className="text-gray-300 leading-relaxed">
          Due to the
          <strong> borderless nature of the internet</strong>,
          cyber crimes can be committed remotely from anywhere in the world,
          making detection, investigation, and prosecution
          <strong> complex and challenging</strong>.
          As technology continues to advance,
          cyber crimes are becoming
          <strong> more sophisticated, frequent, and damaging</strong>,
          increasing the need for strong cyber laws,
          security practices, and public awareness.
        </p>
      </div>

      {/* ===============================
          WHAT ARE CYBER CRIMES
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
          What Are Cyber Crimes?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-cyan-400 font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">💻</span>
              <span>Digital Nature</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Criminal activities involving <strong>computers, digital devices, communication networks,
              and internet-based technologies</strong> to carry out unlawful acts that exploit technological systems.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-purple-400 font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span>Remote Operations</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Unlike traditional crimes, cyber crimes are often <strong>committed remotely</strong> from any location worldwide, with criminals hiding behind <strong>anonymous networks, fake profiles, VPNs, and encrypted channels</strong>.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/20 rounded-xl p-6">
            <h3 className="text-red-400 font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <span>Severe Impact</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Causes <strong>financial losses, data breaches, privacy violations, service disruptions, and reputational damage</strong> affecting individuals, businesses, infrastructure, and governments.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-yellow-400 font-semibold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              <span>Legal Complexity</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Cyber crimes <strong>cross national borders</strong>, creating challenges for <strong>law enforcement and legal systems</strong> due to jurisdictional issues and rapidly evolving technologies.
            </p>
          </div>
        </div>
      </section>

      {/* ===============================
          TYPES OF CYBER CRIMES (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
          Types of Cyber Crimes
        </h2>

        {/* Critical Threats */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-gray-600 rounded"></span>
            Critical Threats
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🔐",
                title: "Ransomware",
                tag: "Critical Threat",
                color: "gray",
                desc: "Encrypts victim's data and demands ransom payment to restore access. Often spreads through phishing emails and software vulnerabilities.",
                examples: "WannaCry, Petya, Locky"
              },
              {
                icon: "🌐",
                title: "DDoS Attacks",
                tag: "Critical Threat",
                color: "gray",
                desc: "Floods servers with massive traffic to make services unavailable, causing business disruption and financial losses.",
                examples: "Mirai botnet, Memcached attacks"
              },
              {
                icon: "☠️",
                title: "Cyber Terrorism",
                tag: "National Threat",
                color: "gray",
                desc: "Coordinated attacks targeting critical infrastructure, governments, or public safety systems to cause widespread disruption and fear.",
                examples: "Infrastructure sabotage, state-sponsored attacks"
              },
              {
                icon: "🚫",
                title: "Child Exploitation",
                tag: "Critical Crime",
                color: "gray",
                desc: "Illegal creation, distribution, or possession of child sexual abuse material. One of the most serious cyber crimes globally.",
                examples: "CSAM distribution networks"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-gray-600/40 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(75,85,99,0.5)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-700/40 text-gray-200 border border-gray-600/40">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-cyan-400 font-semibold text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
                <div className="pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-gray-400">
                    <strong>Examples:</strong> {item.examples}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Severity */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-red-500 rounded"></span>
            High Severity
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                icon: "💻",
                title: "Hacking",
                desc: "Unauthorized access to computer systems, networks, or databases to steal, modify, or destroy data and disrupt operations.",
                examples: "SQL injection, credential stuffing"
              },
              {
                icon: "🪪",
                title: "Identity Theft",
                desc: "Stealing personal information like Social Security numbers, credit cards, or login credentials to impersonate victims for fraud.",
                examples: "Account takeover, synthetic identity"
              },
              {
                icon: "🦠",
                title: "Malware Attacks",
                desc: "Malicious software including viruses, trojans, spyware, and keyloggers designed to spy on, damage, or steal data from systems.",
                examples: "Zeus, Emotet, SpyEye"
              },
              {
                icon: "💳",
                title: "Online Fraud",
                desc: "Scams involving fake shopping sites, investment schemes, lottery fraud, and advance-fee scams targeting victims' money.",
                examples: "Credit card fraud, fake e-commerce"
              },
              {
                icon: "📂",
                title: "Data Theft",
                desc: "Illegal access and extraction of confidential business data, trade secrets, customer information, or intellectual property.",
                examples: "Corporate espionage, database breaches"
              },
              {
                icon: "🏦",
                title: "Financial Cyber Crimes",
                desc: "Sophisticated attacks on banking systems, payment gateways, ATMs, and financial assets including cryptocurrency theft.",
                examples: "ATM skimming, wire transfer fraud"
              },
              {
                icon: "📚",
                title: "Intellectual Property Theft",
                desc: "Unauthorized copying, distribution, or sale of copyrighted software, media, designs, patents, and creative content.",
                examples: "Software piracy, media torrenting"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
                <div className="pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-gray-400">
                    <strong>e.g.</strong> {item.examples}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Severity */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-yellow-500 rounded"></span>
            Medium Severity
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                icon: "🎣",
                title: "Phishing",
                desc: "Fake emails, websites, or messages designed to trick users into revealing login credentials, banking details, or personal information.",
                prevention: "Verify sender, check URLs, enable 2FA"
              },
              {
                icon: "👁️",
                title: "Cyber Stalking",
                desc: "Persistent online harassment, monitoring victim's activities, sending threats, or intimidating behavior through digital platforms.",
                prevention: "Block harassers, document evidence, report"
              },
              {
                icon: "📧",
                title: "Email Spoofing",
                desc: "Forged email headers making messages appear from trusted sources, often used for scams, malware delivery, or corporate espionage.",
                prevention: "Check sender authenticity, SPF/DKIM"
              },
              {
                icon: "🧨",
                title: "Website Defacement",
                desc: "Unauthorized modification of website content to display malicious messages, propaganda, or damage organization's reputation.",
                prevention: "Regular updates, security audits, backups"
              },
              {
                icon: "🚨",
                title: "Online Harassment",
                desc: "Bullying, abuse, threats, humiliation, or targeted attacks on individuals through social media, forums, or messaging platforms.",
                prevention: "Privacy settings, report abuse, block users"
              },
              {
                icon: "⛏️",
                title: "Cryptojacking",
                desc: "Secret installation of cryptocurrency mining software on victim's systems, consuming computational power and electricity without consent.",
                prevention: "Ad blockers, anti-malware, monitor CPU usage"
              },
              {
                icon: "🧠",
                title: "Social Engineering",
                desc: "Psychological manipulation tactics to trick people into divulging confidential information or performing security-compromising actions.",
                prevention: "Security awareness training, verification"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/30 rounded-xl p-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h4 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
                <div className="pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-green-400">
                    <strong>Prevention:</strong> {item.prevention}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emerging Threats */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="h-1 w-8 bg-orange-500 rounded"></span>
            Emerging Threats
          </h3>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🤖",
                title: "Deepfake & AI Crimes",
                tag: "Societal Threat",
                desc: "AI-generated fake videos, images, or audio used for misinformation, fraud, blackmail, or manipulation of public opinion and elections.",
                impact: "Erodes trust, spreads misinformation"
              },
              {
                icon: "🗣️",
                title: "Cyber Defamation",
                tag: "Reputational",
                desc: "Publishing false, offensive, or harmful content online to damage someone's reputation, often through social media or review sites.",
                impact: "Career damage, mental health issues"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-orange-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-cyan-400 font-semibold text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
                <div className="pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-orange-400">
                    <strong>Impact:</strong> {item.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================
          PREVENTION (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
          How to Prevent Cyber Crimes
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "🔐",
              title: "Use Strong Passwords",
              desc: "Create complex passwords with 12+ characters including uppercase, lowercase, numbers, and symbols. Use unique passwords for each account.",
              tip: "Use a password manager"
            },
            {
              icon: "🛡️",
              title: "Enable Two-Factor Authentication",
              desc: "Add an extra security layer using OTPs, authenticator apps (Google Authenticator, Authy), or biometric verification for all important accounts.",
              tip: "Prefer app-based 2FA over SMS"
            },
            {
              icon: "📧",
              title: "Beware of Phishing",
              desc: "Never click suspicious links or download unknown attachments. Verify sender email addresses and look for red flags like urgent requests or spelling errors.",
              tip: "Hover over links before clicking"
            },
            {
              icon: "💻",
              title: "Keep Software Updated",
              desc: "Install security updates and patches promptly for operating systems, browsers, and applications to fix known vulnerabilities that hackers exploit.",
              tip: "Enable automatic updates"
            },
            {
              icon: "🧠",
              title: "Limit Personal Information Sharing",
              desc: "Avoid oversharing personal details, location, travel plans, or financial information on social media platforms where criminals can gather data.",
              tip: "Review privacy settings regularly"
            },
            {
              icon: "🦠",
              title: "Use Antivirus & Firewall",
              desc: "Install reputable security software to protect against malware, spyware, and unauthorized network access. Keep definitions updated.",
              tip: "Scan external drives before use"
            },
            {
              icon: "📶",
              title: "Secure Your Network",
              desc: "Use WPA3 encryption for Wi-Fi, create strong router passwords, hide SSID, and avoid public Wi-Fi for sensitive transactions like banking.",
              tip: "Use VPN on public networks"
            },
            {
              icon: "📁",
              title: "Backup Data Regularly",
              desc: "Maintain encrypted backups on secure cloud storage or offline drives to recover from ransomware attacks or hardware failures.",
              tip: "Follow 3-2-1 backup rule"
            },
            {
              icon: "🚨",
              title: "Report Suspicious Activity",
              desc: "Immediately report cyber fraud, scams, or suspicious behavior to authorities (1930 in India), service providers, and cybercrime portals.",
              tip: "Document all evidence"
            },
            {
              icon: "🔒",
              title: "Lock Devices When Idle",
              desc: "Set automatic screen locks, use strong PINs/biometrics, and log out from accounts when stepping away from devices in public or shared spaces.",
              tip: "Enable remote wipe feature"
            },
            {
              icon: "🧾",
              title: "Review App Permissions",
              desc: "Regularly audit and revoke unnecessary permissions for apps accessing location, contacts, camera, microphone, or storage on your devices.",
              tip: "Install apps from trusted sources only"
            },
            {
              icon: "🎓",
              title: "Stay Cyber Aware",
              desc: "Continuously educate yourself about emerging threats, new scam tactics, security best practices through trusted cybersecurity resources and training.",
              tip: "Subscribe to security newsletters"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-1 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                {item.desc}
              </p>
              <div className="pt-3 border-t border-gray-700/50">
                <p className="text-xs text-green-400">
                  <strong>💡 Tip:</strong> {item.tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
          CYBER SAFETY CHECKLIST (IMPROVED)
      =============================== */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
          Cyber Safety Checklist
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-cyan-400 font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              Safe Practices
            </h3>
            <ul className="space-y-3">
              {[
                "Use strong, unique passwords for each account",
                "Enable two-factor authentication (2FA) everywhere",
                "Keep all systems and applications updated",
                "Install and maintain antivirus & firewall protection",
                "Verify website URLs and SSL certificates before login",
                "Backup important data regularly (3-2-1 rule)",
                "Review and limit privacy & app permissions",
                "Always log out from shared or public computers",
                "Use VPN on public Wi-Fi networks",
                "Monitor financial statements for suspicious activity",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 opacity-0 animate-[fadeUp_0.6s_ease-out_forwards] hover:translate-x-1 transition-transform"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0"></span>
                  <span className="text-gray-300 text-sm hover:text-cyan-300 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-6">
            <h3 className="text-red-400 font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="text-2xl">❌</span>
              Unsafe Practices
            </h3>
            <ul className="space-y-3">
              {[
                "Clicking on suspicious links or pop-ups",
                "Sharing OTPs, passwords, or PINs with anyone",
                "Using public Wi-Fi for banking or sensitive transactions",
                "Installing cracked software or pirated content",
                "Ignoring security warnings and system alerts",
                "Oversharing personal information on social media",
                "Saving passwords in browsers without encryption",
                "Delaying reporting of cyber crimes or fraud",
                "Using the same password across multiple sites",
                "Connecting unknown USB drives to your devices",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 opacity-0 animate-[fadeUp_0.6s_ease-out_forwards] hover:translate-x-1 transition-transform"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-red-400 flex-shrink-0"></span>
                  <span className="text-gray-300 text-sm hover:text-red-300 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===============================
          LEGAL NOTE (IMPROVED)
      =============================== */}
      <section className="bg-gradient-to-br from-red-900/20 to-red-950/30 border border-red-500/30 rounded-xl p-6 sm:p-8 hover:border-red-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-red-400 flex items-center gap-2">
          <span className="text-2xl">⚠</span>
          Legal Awareness & Cyber Crime Support
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          Cyber crimes are <strong>punishable under cyber laws</strong> with severe penalties including imprisonment and heavy fines. Awareness, ethical behavior, and responsible use of technology are essential to ensure a safer digital environment for everyone.
        </p>

        <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-5 mb-4">
          <h3 className="text-red-300 font-semibold mb-3 text-lg flex items-center gap-2">
            <span className="text-xl">🇮🇳</span>
            Indian Cyber Crime Helpline
          </h3>

          <p className="text-gray-300 text-sm mb-4">
            If you are a victim of <strong>cyber fraud, online scam, identity theft, hacking, or financial cyber crime</strong>, report it immediately through official channels.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/20">
              <p className="text-xs text-gray-400 mb-1">Emergency Helpline</p>
              <p className="text-red-300 font-bold text-xl">📞 1930</p>
              <p className="text-xs text-gray-400 mt-1">24×7 Toll-Free (India)</p>
            </div>

            <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/20">
              <p className="text-xs text-gray-400 mb-1">Online Portal</p>
              <p className="text-red-300 font-bold text-lg break-all">🌐 cybercrime.gov.in</p>
              <p className="text-xs text-gray-400 mt-1">National Cyber Crime Portal</p>
            </div>

            <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/20">
              <p className="text-xs text-gray-400 mb-1">Response Time</p>
              <p className="text-red-300 font-bold text-xl">⏱️ Immediate</p>
              <p className="text-xs text-gray-400 mt-1">Report within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
          <h4 className="text-red-300 font-semibold mb-2 text-sm">What to Do If You're a Victim:</h4>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>✓ Call 1930 or visit cybercrime.gov.in immediately</li>
            <li>✓ Preserve all evidence (screenshots, emails, messages, transaction IDs)</li>
            <li>✓ Change all passwords and enable 2FA on affected accounts</li>
            <li>✓ Inform your bank/card issuer if financial fraud occurred</li>
            <li>✓ File an FIR at your local police station with evidence</li>
          </ul>
        </div>
      </section>
    </div>
  );
}