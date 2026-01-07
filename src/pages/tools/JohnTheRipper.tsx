import { Link } from "react-router-dom";

export default function JohnTheRipper() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">


      {/* ===============================
          BACK TO TOOLS LINK
      =============================== */}
      <Link
        to="/tools"
        className="inline-block mb-6 text-cyan-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-5xl font-bold mb-6 text-cyan-400">
        John the Ripper (Password Cracking Tool)
      </h1>
      {/* =============================== 
    BADGES & ICONS
=============================== */}
<div className="flex flex-wrap gap-3 mb-10">

  <span className="px-3 py-1 text-sm rounded-full
    bg-green-600/20 text-green-400 border border-green-500/30">
    Beginner Friendly
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
    Intermediate
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-red-600/20 text-red-400 border border-red-500/30">
    Advanced
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
    Password Cracking
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-purple-600/20 text-purple-400 border border-purple-500/30">
    Hash Analysis
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-orange-600/20 text-orange-400 border border-orange-500/30">
    Ethical Hacking
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-pink-600/20 text-pink-400 border border-pink-500/30">
    Password Auditing
  </span>

</div>

      {/* ===============================
    WHAT IS JOHN THE RIPPER
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is John the Ripper?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>John the Ripper</strong> is a well-known, open-source
    <strong> password cracking and password auditing tool</strong>
    used in cybersecurity to evaluate how strong or weak passwords are
    within a system.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    It was originally developed to test <strong>Unix and Linux passwords</strong>,
    but over time it has evolved to support hundreds of hash formats used
    in modern operating systems, databases, and applications.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    John the Ripper is widely used by
    <strong> ethical hackers, penetration testers, security analysts,
    and cybersecurity students</strong> to identify weak passwords before
    malicious attackers can exploit them.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Instead of attacking live login systems, John works on
    <strong> password hashes</strong>. These hashes are mathematical
    representations of passwords that are stored by systems for security.
    John attempts to recover the original plain-text passwords by applying
    different cracking techniques.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    The tool supports multiple attack methods such as
    <strong> dictionary attacks, rule-based attacks, and brute-force attacks</strong>,
    which simulate how real-world attackers guess passwords based on
    human behavior and common patterns.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Because of its flexibility and effectiveness, John the Ripper is
    commonly included by default in penetration testing distributions
    such as <strong>Kali Linux</strong> and <strong>Parrot OS</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed">
    John the Ripper does <strong>not automatically hack systems</strong>
    and does not bypass authentication on its own. It must only be used
    for <strong>authorized security testing, password audits, and learning</strong>.
    Using it without permission is illegal and unethical.
  </p>
</section>

      {/* ===============================
    WHAT JOHN THE RIPPER DOES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Does John the Ripper Do?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    John the Ripper is used to <strong>test the strength of passwords</strong>
    by simulating real-world password attacks. Instead of targeting live
    login systems, it works on <strong>password hashes</strong>, making it
    a safe and controlled tool for security testing.
  </p>

  <p className="text-gray-300 leading-relaxed mb-5">
    Security professionals use John the Ripper to understand how easily
    passwords can be cracked if an attacker gains access to hashed data.
    This helps organizations fix weak authentication practices before
    real attackers exploit them.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-4">

    <li>
      <strong>Cracks Password Hashes:</strong><br />
      John attempts to recover plain-text passwords from hashed values
      obtained from Linux systems, Windows systems, databases, or applications.
      <br />
      <span className="text-sm text-gray-400">
        It supports a wide range of hash algorithms used in real systems.
      </span>
    </li>

    <li>
      <strong>Identifies Weak and Reused Passwords:</strong><br />
      By successfully cracking passwords, John highlights users who rely
      on simple, short, or commonly reused passwords.
      <br />
      <span className="text-sm text-gray-400">
        Weak passwords significantly increase the risk of system compromise.
      </span>
    </li>

    <li>
      <strong>Supports Multiple Attack Techniques:</strong><br />
      John includes dictionary attacks, rule-based attacks, and brute-force
      attacks, allowing testers to choose the most effective method.
      <br />
      <span className="text-sm text-gray-400">
        Attacks are selected based on password complexity and testing goals.
      </span>
    </li>

    <li>
      <strong>Evaluates Password Policy Strength:</strong><br />
      Cracked passwords reveal whether existing password policies are
      strong enough or easily bypassed.
      <br />
      <span className="text-sm text-gray-400">
        Poor policies often allow predictable and weak passwords.
      </span>
    </li>

    <li>
      <strong>Helps Improve Overall System Security:</strong><br />
      Results from John the Ripper are used to recommend stronger passwords,
      better policies, and additional protections such as multi-factor
      authentication.
      <br />
      <span className="text-sm text-gray-400">
        The goal is prevention, not exploitation.
      </span>
    </li>

  </ul>

  <p className="text-gray-300 leading-relaxed mt-6">
    In summary, John the Ripper does not “hack” systems. It helps security
    teams <strong>measure, understand, and improve password security</strong>
    using controlled and ethical testing techniques.
  </p>
</section>

      {/* ===============================
    INSTALLATION STEPS
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Installation Steps
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Follow these step-by-step instructions to install
    <strong> John the Ripper</strong> on Linux-based systems such as
    Kali Linux, Ubuntu, or Parrot OS. These steps are written for beginners
    and explain what each command does and why it is required.
  </p>

  <p className="text-gray-300 leading-relaxed mb-6">
    Administrative (sudo) privileges are required because the installation
    modifies system files and installs software packages.
  </p>

  <div className="bg-gray-900 rounded-lg p-5 space-y-6 text-sm text-gray-200 font-mono">

    {/* STEP 1 */}
    <div>
      <p>
        <span className="text-cyan-400">Step 1:</span> Update system packages
      </p>
      <p>sudo apt update</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        This command refreshes your system’s package list so the operating
        system knows about the latest available versions of software.
        It helps avoid installation errors caused by outdated package
        information.
      </p>
    </div>

    {/* STEP 2 */}
    <div>
      <p>
        <span className="text-cyan-400">Step 2:</span> Install John the Ripper
      </p>
      <p>sudo apt install john</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        This installs John the Ripper along with all required dependencies.
        On Kali Linux, John is often pre-installed, so this command will
        either install or confirm the existing installation.
      </p>
    </div>

    {/* STEP 3 */}
    <div>
      <p>
        <span className="text-cyan-400">Step 3:</span> Verify the installation
      </p>
      <p>john --version</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        This command checks whether John the Ripper is installed correctly
        and displays the installed version. Seeing version output confirms
        that the tool is ready to use.
      </p>
    </div>

    {/* STEP 4 */}
    <div>
      <p>
        <span className="text-cyan-400">Step 4:</span> Locate Wordlists (Optional)
      </p>
      <p>ls /usr/share/wordlists/</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        Wordlists such as <strong>rockyou.txt</strong> are commonly used
        with John for dictionary attacks. Knowing their location is
        essential before starting password cracking.
      </p>
    </div>

    {/* STEP 5 */}
    <div>
      <p>
        <span className="text-cyan-400">Step 5:</span> Prepare Your Working Directory
      </p>
      <p>mkdir john-work && cd john-work</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        Creating a dedicated working directory helps you organize hash
        files, wordlists, and output results during testing.
      </p>
    </div>

  </div>

  <p className="text-gray-300 leading-relaxed mt-6">
    After completing these steps, John the Ripper is fully installed and
    ready for use. You can now begin password auditing by providing hash
    files and selecting appropriate attack modes.
  </p>
</section>

     {/* ===============================
    CORE JOHN THE RIPPER FEATURES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Core John the Ripper Features
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    John the Ripper provides multiple powerful features that help security
    professionals analyze password strength. Each feature targets a
    specific password cracking technique commonly used in real-world attacks.
  </p>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-cyan-300">
        <tr>
          <th className="px-4 py-3 border border-gray-700 w-1/4">
            Feature
          </th>
          <th className="px-4 py-3 border border-gray-700 w-3/4">
            Purpose & How It Is Used
          </th>
        </tr>
      </thead>

      <tbody className="text-gray-300 leading-relaxed">

        {/* DICTIONARY ATTACK */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Dictionary Attack
          </td>
          <td className="px-4 py-3 border border-gray-700">
            The <strong>Dictionary Attack</strong> attempts to crack passwords
            by testing words from a predefined wordlist against password hashes.
            <br /><br />
            <strong>What it does:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Uses common password lists (e.g., rockyou)</li>
              <li>Tests real-world leaked passwords</li>
              <li>Quickly cracks weak passwords</li>
            </ul>
            <br />
            <strong>Used for:</strong> Identifying simple, reused, and
            commonly chosen passwords in systems.
          </td>
        </tr>

        {/* RULE-BASED ATTACK */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Rule-Based Attack
          </td>
          <td className="px-4 py-3 border border-gray-700">
            The <strong>Rule-Based Attack</strong> modifies dictionary words
            using transformation rules to simulate how users create passwords.
            <br /><br />
            <strong>What it does:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Adds numbers, symbols, or years</li>
              <li>Changes letter casing</li>
              <li>Combines words with patterns</li>
            </ul>
            <br />
            <strong>Used for:</strong> Cracking passwords that are slightly
            complex but still predictable.
          </td>
        </tr>

        {/* BRUTE FORCE ATTACK */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Brute Force Attack
          </td>
          <td className="px-4 py-3 border border-gray-700">
            The <strong>Brute Force Attack</strong> tries every possible
            character combination until the correct password is found.
            <br /><br />
            <strong>What it does:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Tests all character combinations</li>
              <li>Does not rely on wordlists</li>
              <li>Works even for unknown password patterns</li>
            </ul>
            <br />
            <strong>Used for:</strong> Cracking short passwords when other
            attacks fail. It is slow and resource-intensive.
          </td>
        </tr>

        {/* HASH FORMAT DETECTION */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Hash Format Detection
          </td>
          <td className="px-4 py-3 border border-gray-700">
            John the Ripper can automatically identify many password
            hash formats without manual configuration.
            <br /><br />
            <strong>What it does:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Detects Linux, Windows, and application hashes</li>
              <li>Selects correct cracking algorithms</li>
              <li>Prevents misconfigured attacks</li>
            </ul>
            <br />
            <strong>Used for:</strong> Ensuring accurate and efficient
            password cracking.
          </td>
        </tr>

        {/* SESSION & RECOVERY */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Session Resume & Recovery
          </td>
          <td className="px-4 py-3 border border-gray-700">
            John automatically saves cracking progress during long sessions.
            <br /><br />
            <strong>What it does:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Resumes interrupted attacks</li>
              <li>Saves time and computing resources</li>
              <li>Supports long-running cracking tasks</li>
            </ul>
            <br />
            <strong>Used for:</strong> Large password audits and
            time-consuming brute-force attacks.
          </td>
        </tr>

        {/* OUTPUT & REPORTING */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Output & Reporting
          </td>
          <td className="px-4 py-3 border border-gray-700">
            John provides clear output showing cracked passwords and users.
            <br /><br />
            <strong>What it does:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Displays recovered plain-text passwords</li>
              <li>Associates passwords with usernames</li>
              <li>Helps document security findings</li>
            </ul>
            <br />
            <strong>Used for:</strong> Reporting vulnerabilities and
            improving password policies.
          </td>
        </tr>

      </tbody>
    </table>
  </div>

  <p className="text-gray-300 leading-relaxed mt-6">
    Together, these features allow John the Ripper to simulate real-world
    password attacks and help organizations strengthen their authentication
    security.
  </p>
</section>

      {/* ===============================
    STEP BY STEP USING JOHN THE RIPPER
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using John the Ripper
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    This step-by-step process explains how John the Ripper is used in a
    real-world password auditing workflow. These steps are written for
    beginners and follow how ethical hackers and security professionals
    test password strength in practice.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-6">

    <li>
      <strong>Obtain Password Hashes:</strong><br />
      The first step is to collect password hashes from the target system
      or application. John the Ripper works on <strong>hashes</strong>,
      not plain-text passwords.
      <br /><br />
      <strong>Common sources:</strong>
      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
        <li>Linux systems: <code>/etc/shadow</code></li>
        <li>Windows systems: SAM database</li>
        <li>Web applications: database dumps</li>
        <li>Captured hashes from penetration testing tools</li>
      </ul>
      <span className="text-sm text-gray-400">
        Hashes must be obtained legally with proper authorization.
      </span>
    </li>

    <li>
      <strong>Prepare Hash File:</strong><br />
      Store the extracted hashes into a text file (for example:
      <code className="ml-1">hashes.txt</code>) so John can read them.
      <br />
      <span className="text-sm text-gray-400">
        Each line usually contains a username and its corresponding hash.
      </span>
    </li>

    <li>
      <strong>Identify the Hash Type:</strong><br />
      John the Ripper can automatically detect many hash formats.
      Simply running John against the hash file will often identify
      the correct algorithm.
      <br />
      <span className="text-sm text-gray-400">
        Correct hash detection ensures the right cracking method is used.
      </span>
    </li>

    <li>
      <strong>Start with a Dictionary Attack:</strong><br />
      Begin by running a dictionary attack using common password wordlists.
      This is the fastest and most effective method for weak passwords.
      <br /><br />
      <strong>Why dictionary first?</strong>
      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
        <li>Most users reuse common passwords</li>
        <li>Faster than brute force</li>
        <li>High success rate in real environments</li>
      </ul>
    </li>

    <li>
      <strong>Apply Rule-Based Attacks:</strong><br />
      If simple dictionary attacks fail, John applies <strong>rules</strong>
      that modify words by adding numbers, symbols, or changing case.
      <br /><br />
      <strong>Examples:</strong>
      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
        <li>password → Password</li>
        <li>admin → admin123</li>
        <li>welcome → Welcome@2024</li>
      </ul>
      <span className="text-sm text-gray-400">
        This simulates real user password habits.
      </span>
    </li>

    <li>
      <strong>Use Brute Force (If Required):</strong><br />
      If dictionary and rule-based attacks fail, John can attempt
      brute-force attacks by trying every possible combination.
      <br />
      <span className="text-sm text-gray-400">
        Brute force is slow and resource-intensive, so it is usually
        the last option.
      </span>
    </li>

    <li>
      <strong>Monitor Cracking Progress:</strong><br />
      John automatically saves progress and continues cracking in
      the background.
      <br />
      <span className="text-sm text-gray-400">
        This allows long cracking sessions without losing progress.
      </span>
    </li>

    <li>
      <strong>View Cracked Passwords:</strong><br />
      Once passwords are cracked, they can be displayed using
      John’s built-in show functionality.
      <br />
      <span className="text-sm text-gray-400">
        Output includes usernames and recovered plain-text passwords.
      </span>
    </li>

    <li>
      <strong>Analyze the Results:</strong><br />
      Review cracked passwords to identify:
      <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
        <li>Weak or short passwords</li>
        <li>Password reuse</li>
        <li>Predictable patterns</li>
      </ul>
      <span className="text-sm text-gray-400">
        This helps improve password policies and security controls.
      </span>
    </li>

    <li>
      <strong>Report and Recommend Fixes:</strong><br />
      Document findings and recommend stronger password policies,
      such as longer passwords, complexity rules, and multi-factor authentication.
      <br />
      <span className="text-sm text-gray-400">
        Reporting is a critical part of professional security testing.
      </span>
    </li>

  </ol>
</section>

      {/* ===============================
    IMPORTANT NOTE
=============================== */}
<section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-10">
  <h2 className="text-xl font-semibold mb-3 text-red-400">
    ⚠ Legal & Ethical Warning
  </h2>

  <p className="text-gray-300 leading-relaxed mb-2">
    <strong>John the Ripper</strong> should be used <strong>only on
    password hashes that you own or have explicit permission
    to audit</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed mb-2">
    Attempting to crack passwords or authentication data without
    authorization is <strong>illegal and punishable by law</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed">
    This tool is intended strictly for
    <strong> ethical hacking, password auditing, and cybersecurity
    education</strong>.
  </p>
</section>
    </div>
  );
}
