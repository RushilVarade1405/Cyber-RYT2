import { Link } from "react-router-dom";

export default function CyberCrimes() {
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
        Cyber Crimes
      </h1>

      {/* ===============================
          INTRODUCTION
      =============================== */}
      <p className="text-gray-300 leading-relaxed mb-10">
  <strong>Cyber crimes</strong> refer to a wide range of
  <strong> unlawful activities committed using computers, mobile devices,
  digital networks, or internet-based platforms</strong>.
  These crimes involve the misuse of technology to
  <strong>steal information, commit fraud, disrupt services,
  violate privacy, or cause financial and reputational harm</strong>.
</p>

<p className="text-gray-300 leading-relaxed mb-10">
  Cyber crimes can target
  <strong> individuals, private organizations, financial institutions,
  and even governments</strong>.
  Attackers often exploit
  <strong>technical vulnerabilities</strong> such as weak security systems,
  outdated software, and insecure networks, as well as
  <strong>human vulnerabilities</strong> including lack of awareness,
  trust manipulation, and social engineering techniques.
</p>

<p className="text-gray-300 leading-relaxed mb-10">
  Due to the
  <strong> borderless nature of the internet</strong>,
  cyber crimes can be committed remotely from anywhere in the world,
  making detection, investigation, and prosecution
  <strong>complex and challenging</strong>.
  As technology continues to advance,
  cyber crimes are becoming
  <strong>more sophisticated, frequent, and damaging</strong>,
  increasing the need for strong cyber laws,
  security practices, and public awareness.
</p>

{/* ===============================
    WHAT ARE CYBER CRIMES
=============================== */}
<section className="mb-12">

  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-cyan-300">
    What Are Cyber Crimes?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Cyber crimes</strong> are criminal activities that involve the
    use of <strong>computers, digital devices, communication networks,
    and internet-based technologies</strong> to carry out unlawful acts.
    These crimes exploit technological systems to
    <strong>gain unauthorized access, manipulate data, commit fraud,
    or disrupt digital services</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Unlike traditional crimes, cyber crimes are often
    <strong>committed remotely</strong>, allowing attackers to operate
    from any location in the world without being physically present.
    Criminals frequently hide their identity using
    <strong>anonymous networks, fake profiles, VPNs, and encrypted channels</strong>,
    which makes tracing them technically complex.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Cyber crimes can cause
    <strong>financial losses, data breaches, privacy violations,
    service disruptions, and reputational damage</strong>.
    Victims may include
    <strong>individual users, businesses, financial institutions,
    critical infrastructure providers, and government organizations</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed">
    Because cyber crimes often
    <strong>cross national borders</strong>,
    they create serious challenges for
    <strong>law enforcement agencies and legal systems</strong>.
    Differences in national cyber laws, jurisdiction issues,
    and rapidly evolving technologies make investigation,
    prosecution, and prevention more difficult.
  </p>

</section>

{/* ===============================
    TYPES OF CYBER CRIMES (SEVERITY BASED)
=============================== */}
<section className="mb-12">

  <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-cyan-300">
    Types of Cyber Crimes
  </h2>

</section>

<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-24">

  {/* 1. Hacking */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">💻 Hacking</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-400 border border-red-500/30">High Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Unauthorized access to systems to steal, modify, or destroy data.</p>
  </div>

  {/* 2. Phishing */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🎣 Phishing</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Medium Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Fake emails or websites used to steal login and banking credentials.</p>
  </div>

  {/* 3. Identity Theft */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🪪 Identity Theft</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-400 border border-red-500/30">High Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Stealing personal information to impersonate victims.</p>
  </div>

  {/* 4. Malware Attacks */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🦠 Malware Attacks</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-400 border border-red-500/30">High Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Malicious software designed to spy, damage, or steal data.</p>
  </div>

  {/* 5. Ransomware */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-gray-600/40 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(75,85,99,0.5)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🔐 Ransomware</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-gray-700/40 text-gray-200 border border-gray-600/40">Critical Threat</span>
    <p className="text-gray-300 text-sm leading-relaxed">Encrypts data and demands ransom to restore access.</p>
  </div>

  {/* 6. Cyber Stalking */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">👁️ Cyber Stalking</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Medium Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Online harassment, monitoring, or threatening behavior.</p>
  </div>

  {/* 7. Online Fraud */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">💳 Online Fraud</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-400 border border-red-500/30">High Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Scams involving banking, shopping, and investment fraud.</p>
  </div>

  {/* 8. Data Theft */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">📂 Data Theft</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-400 border border-red-500/30">High Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Illegal access and extraction of confidential information.</p>
  </div>

  {/* 9. DoS / DDoS */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-gray-600/40 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(75,85,99,0.5)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🌐 DoS / DDoS Attacks</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-gray-700/40 text-gray-200 border border-gray-600/40">Critical Threat</span>
    <p className="text-gray-300 text-sm leading-relaxed">Flooding servers to make services unavailable.</p>
  </div>

  {/* 10. Email Spoofing */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">📧 Email Spoofing</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Medium Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Forged emails used for scams and malware delivery.</p>
  </div>

  {/* 11. Cyber Defamation */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-green-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🗣️ Cyber Defamation</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-green-600/20 text-green-400 border border-green-500/30">Low Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">False or harmful content posted to damage reputation.</p>
  </div>

  {/* 12. Website Defacement */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🧨 Website Defacement</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Medium Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Unauthorized modification of website content.</p>
  </div>

  {/* 13. Online Harassment */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🚨 Online Harassment & Bullying</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Medium Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Abuse, threats, or humiliation using digital platforms.</p>
  </div>

  {/* 14. Financial Cyber Crimes */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🏦 Financial Cyber Crimes</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-400 border border-red-500/30">High Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Crimes targeting banking systems and financial assets.</p>
  </div>

  {/* 15. Child Exploitation */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-gray-600/40 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(75,85,99,0.5)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🚫 Child Exploitation & Pornography</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-gray-700/40 text-gray-200 border border-gray-600/40">Critical Crime</span>
    <p className="text-gray-300 text-sm leading-relaxed">Illegal creation or distribution of child abuse material.</p>
  </div>

  {/* 16. Intellectual Property Theft */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-red-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">📚 Intellectual Property Theft</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-400 border border-red-500/30">High Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Unauthorized copying of software, media, or designs.</p>
  </div>

  {/* 17. Cyber Terrorism */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-gray-600/40 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(75,85,99,0.5)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">☠️ Cyber Terrorism</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-gray-700/40 text-gray-200 border border-gray-600/40">National Threat</span>
    <p className="text-gray-300 text-sm leading-relaxed">Attacks aimed at destabilizing governments or infrastructure.</p>
  </div>

  {/* 18. Cryptojacking */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">⛏️ Cryptojacking</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Medium Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Unauthorized cryptocurrency mining using victim systems.</p>
  </div>

  {/* 19. Social Engineering */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-yellow-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🧠 Social Engineering</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">Medium Severity</span>
    <p className="text-gray-300 text-sm leading-relaxed">Psychological manipulation to trick users into unsafe actions.</p>
  </div>

  {/* 20. Fake News */}
  <div className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33] border border-orange-500/30 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.35)]">
    <h3 className="text-cyan-400 font-semibold text-lg mb-2">🤖 Fake News & Deepfake Crimes</h3>
    <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30">Societal Threat</span>
    <p className="text-gray-300 text-sm leading-relaxed">AI-generated misinformation used to manipulate society.</p>
  </div>

</div>

{/* ===============================
    PREVENTION OF CYBER CRIMES
=============================== */}
<section className="mb-24">

  <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
    How to Prevent Cyber Crimes
  </h2>

  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    {/* 1 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        🔐 Use Strong Passwords
      </h3>
      <p className="text-gray-300 text-sm">
        Create complex passwords with letters, numbers, and symbols. Avoid reuse across platforms.
      </p>
    </div>

    {/* 2 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        🛡️ Enable Two-Factor Authentication
      </h3>
      <p className="text-gray-300 text-sm">
        Add extra protection using OTPs, authenticator apps, or biometric verification.
      </p>
    </div>

    {/* 3 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        📧 Beware of Phishing
      </h3>
      <p className="text-gray-300 text-sm">
        Avoid clicking suspicious links or downloading unknown attachments.
      </p>
    </div>

    {/* 4 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        💻 Keep Software Updated
      </h3>
      <p className="text-gray-300 text-sm">
        Install updates regularly to patch security vulnerabilities.
      </p>
    </div>

    {/* 5 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        🧠 Avoid Oversharing Online
      </h3>
      <p className="text-gray-300 text-sm">
        Limit sharing of personal and financial details on social platforms.
      </p>
    </div>

    {/* 6 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        🦠 Use Antivirus & Firewall
      </h3>
      <p className="text-gray-300 text-sm">
        Protect systems from malware, spyware, and unauthorized access.
      </p>
    </div>

    {/* 7 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        📶 Secure Your Network
      </h3>
      <p className="text-gray-300 text-sm">
        Use strong Wi-Fi passwords, encryption, and avoid unsafe public networks.
      </p>
    </div>

    {/* 8 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        📁 Backup Important Data
      </h3>
      <p className="text-gray-300 text-sm">
        Maintain backups on secure cloud or offline storage to recover from attacks.
      </p>
    </div>

    {/* 9 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        🚨 Report Suspicious Activity
      </h3>
      <p className="text-gray-300 text-sm">
        Report cyber fraud or abuse immediately to authorities and service providers.
      </p>
    </div>

    {/* 10 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        🔒 Lock Devices When Idle
      </h3>
      <p className="text-gray-300 text-sm">
        Always lock screens and log out when devices are unattended.
      </p>
    </div>

    {/* 11 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        🧾 Check App Permissions
      </h3>
      <p className="text-gray-300 text-sm">
        Review and revoke unnecessary permissions from installed applications.
      </p>
    </div>

    {/* 12 */}
    <div className="group bg-[#0b1224] border border-cyan-500/20 rounded-xl p-6
      transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50
      hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
      <h3 className="text-cyan-400 font-semibold mb-2 group-hover:text-cyan-300">
        🎓 Stay Cyber Aware
      </h3>
      <p className="text-gray-300 text-sm">
        Keep learning about new cyber threats, scams, and safety practices.
      </p>
    </div>

  </div>
</section>

{/* ===============================
    ANIMATED CYBER SAFETY CHECKLIST
=============================== */}
<section className="mb-24">

  <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
    Cyber Safety Checklist
  </h2>

  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">

    {/* ===============================
        SAFE PRACTICES
    =============================== */}
    <div className="bg-[#0b1224] border border-cyan-500/30 rounded-xl p-6">
      <h3 className="text-cyan-400 font-semibold text-xl mb-4">
        ✅ Safe Practices
      </h3>

      <ul className="space-y-4 text-gray-300 text-sm">

        {[
          "Use strong, unique passwords",
          "Enable two-factor authentication (2FA)",
          "Keep system and apps updated",
          "Use antivirus and firewall protection",
          "Verify website URLs before login",
          "Backup important data regularly",
          "Review privacy & app permissions",
          "Log out from shared computers",
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 opacity-0 animate-[fadeUp_0.6s_ease-out_forwards]"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="mt-1 h-3 w-3 rounded-full bg-cyan-400"></span>
            <span className="hover:text-cyan-300 transition-colors">
              {item}
            </span>
          </li>
        ))}

      </ul>
    </div>

    {/* ===============================
        UNSAFE PRACTICES
    =============================== */}
    <div className="bg-[#0b1224] border border-red-500/30 rounded-xl p-6">
      <h3 className="text-red-400 font-semibold text-xl mb-4">
        ❌ Unsafe Practices
      </h3>

      <ul className="space-y-4 text-gray-300 text-sm">

        {[
          "Clicking suspicious links",
          "Sharing OTPs or passwords",
          "Using public Wi-Fi for banking",
          "Installing cracked software",
          "Ignoring security warnings",
          "Oversharing on social media",
          "Saving passwords insecurely",
          "Delaying cyber crime reporting",
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 opacity-0 animate-[fadeUp_0.6s_ease-out_forwards]"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="mt-1 h-3 w-3 rounded-full bg-red-400"></span>
            <span className="hover:text-red-300 transition-colors">
              {item}
            </span>
          </li>
        ))}

      </ul>
    </div>

  </div>
</section>


      {/* ===============================
          LEGAL NOTE
      =============================== */}
      <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
  <h2 className="text-xl font-semibold mb-3 text-red-400">
    ⚠ Legal Awareness & Cyber Crime Support
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Cyber crimes are punishable under cyber laws. Awareness, ethical behavior,
    and responsible use of technology are essential to ensure a safer digital
    environment.
  </p>

  {/* ===============================
      INDIAN CYBER CRIME HELPLINE
  =============================== */}
  <div className="bg-red-950/40 border border-red-500/40 rounded-lg p-4">
    <h3 className="text-red-300 font-semibold mb-2">
      🇮🇳 Indian Cyber Crime Helpline
    </h3>

    <p className="text-gray-300 text-sm mb-2">
      If you are a victim of cyber fraud, online scam, identity theft, or
      financial cyber crime, report it immediately.
    </p>

    <ul className="text-gray-300 text-sm space-y-1">
      <li>
        📞 <span className="font-semibold text-red-300">Helpline Number:</span>{" "}
        1930
      </li>
      <li>
        🌐 <span className="font-semibold text-red-300">Online Portal:</span>{" "}
        cybercrime.gov.in
      </li>
      <li>
        ⏱️ <span className="font-semibold text-red-300">Availability:</span>{" "}
        24×7 (India)
      </li>
    </ul>
  </div>
</section>
    </div>
  );
}