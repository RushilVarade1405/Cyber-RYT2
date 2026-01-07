import { Link } from "react-router-dom";

export default function Hydra() {
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
      <h1 className="text-5xl font-bold mb-4 text-cyan-400">
        Hydra (Password Cracking Tool)
      </h1>

      {/* ===============================
          BADGES & ICONS
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-10">
        <span className="px-3 py-1 text-sm rounded-full bg-green-600/20 text-green-400 border border-green-500/30">
          Beginner Friendly
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
          Intermediate
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
          Advanced
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30">
          Password Cracking
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
          Brute Force
        </span>
      </div>

      {/* ===============================
    WHAT IS HYDRA (DETAILED)
=============================== */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is Hydra?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Hydra</strong> (also known as <strong>THC-Hydra</strong>) is a
    fast, flexible, and highly powerful
    <strong> network login password cracking tool</strong> designed to
    test the security of authentication systems.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    It works by performing <strong>brute-force</strong> and
    <strong> dictionary-based attacks</strong> against remote login
    services by systematically trying different combinations of
    usernames and passwords.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Hydra is widely used by
    <strong> ethical hackers, penetration testers, cybersecurity
    professionals, and students</strong> to identify weak, default, or
    reused credentials before attackers can exploit them.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    One of Hydra’s biggest strengths is its <strong>speed and efficiency</strong>.
    It supports <strong>multi-threaded attacks</strong>, allowing multiple
    login attempts to run in parallel, which significantly reduces the
    time required for password testing.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Hydra supports more than <strong>50 authentication protocols</strong>,
    including but not limited to:
  </p>

  <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
    <li>SSH (Secure Shell)</li>
    <li>FTP (File Transfer Protocol)</li>
    <li>HTTP / HTTPS web login forms</li>
    <li>SMTP, POP3, IMAP (Email services)</li>
    <li>RDP (Remote Desktop Protocol)</li>
    <li>MySQL, PostgreSQL (Databases)</li>
  </ul>

  <p className="text-gray-300 leading-relaxed">
    Due to its power, Hydra must be used
    <strong> only for authorized security testing</strong>.
    Unauthorized use against systems without permission is illegal
    and unethical.
  </p>
</section>

      {/* ===============================
    WHAT HYDRA DOES (DETAILED)
=============================== */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Hydra Does
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    <strong>Hydra</strong> is a powerful network login cracking tool designed to
    test the strength of authentication mechanisms by systematically trying
    multiple username and password combinations.
  </p>

  <ul className="list-disc list-inside text-gray-300 space-y-4 leading-relaxed">

    <li>
      <strong>Performs brute-force and dictionary attacks:</strong><br />
      Hydra repeatedly attempts login requests using large wordlists to
      identify valid credentials on remote services.
    </li>

    <li>
      <strong>Uses username and password wordlists:</strong><br />
      It supports both single usernames and multiple username lists combined
      with password lists for efficient credential testing.
    </li>

    <li>
      <strong>Supports parallel (multi-threaded) attacks:</strong><br />
      Hydra runs multiple login attempts simultaneously, significantly
      increasing attack speed while allowing thread control to avoid detection.
    </li>

    <li>
      <strong>Tests multiple network and web services:</strong><br />
      It works with services such as SSH, FTP, HTTP, HTTPS, SMTP, RDP, MySQL,
      and many others.
    </li>

    <li>
      <strong>Identifies weak, default, or reused passwords:</strong><br />
      Hydra helps uncover common security issues like default credentials,
      simple passwords, and password reuse across services.
    </li>

    <li>
      <strong>Stops automatically when valid credentials are found:</strong><br />
      With options like <code>-f</code>, Hydra can stop as soon as a successful
      login is discovered.
    </li>

    <li>
      <strong>Provides clear and readable output:</strong><br />
      Successful login attempts are highlighted, making it easy to identify
      compromised accounts.
    </li>

    <li>
      <strong>Assists in security auditing and risk assessment:</strong><br />
      The results help penetration testers evaluate authentication security
      and recommend stronger password policies.
    </li>

  </ul>
</section>

      {/* ===============================
    USING HYDRA IN LINUX (DETAILED)
=============================== */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Using Hydra in Linux
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Hydra</strong> is a command-line based password cracking tool that
    runs on most Linux distributions. It is <strong>pre-installed in Kali Linux</strong>
    and commonly used in ethical hacking and penetration testing environments.
  </p>

  <p className="text-gray-300 leading-relaxed mb-6">
    Before using Hydra, ensure you are working on a system you own or have
    explicit permission to test. Unauthorized usage is illegal.
  </p>

  {/* INSTALLATION */}
  <h3 className="text-xl font-semibold mb-3 text-cyan-400">
    1️⃣ Installing Hydra
  </h3>

  <p className="text-gray-300 mb-3">
    If Hydra is not already installed, install it using the package manager.
  </p>

  <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mb-6 text-sm text-gray-200 overflow-x-auto">
{`sudo apt update
sudo apt install hydra`}
  </pre>

  <p className="text-gray-300 mb-6">
    For Red Hat based systems:
  </p>

  <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mb-6 text-sm text-gray-200 overflow-x-auto">
{`sudo dnf install hydra`}
  </pre>

  {/* VERIFY INSTALLATION */}
  <h3 className="text-xl font-semibold mb-3 text-cyan-400">
    2️⃣ Verify Installation
  </h3>

  <p className="text-gray-300 mb-3">
    After installation, verify Hydra is installed correctly:
  </p>

  <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mb-6 text-sm text-gray-200 overflow-x-auto">
{`hydra -h`}
  </pre>

  <p className="text-gray-300 mb-6">
    If installed correctly, Hydra will display its help menu and supported
    protocols.
  </p>

  {/* BASIC SYNTAX */}
  <h3 className="text-xl font-semibold mb-3 text-cyan-400">
    3️⃣ Understanding Hydra Syntax
  </h3>

  <p className="text-gray-300 mb-3">
    Hydra follows a simple and flexible command structure:
  </p>

  <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mb-6 text-sm text-gray-200 overflow-x-auto">
{`hydra [options] <protocol>://<target>`}
  </pre>

  <p className="text-gray-300 mb-6">
    Where options include usernames, password lists, speed control, and output
    handling.
  </p>

  {/* RUNNING FIRST COMMAND */}
  <h3 className="text-xl font-semibold mb-3 text-cyan-400">
    4️⃣ Running Your First Hydra Command
  </h3>

  <p className="text-gray-300 mb-3">
    Example of a basic SSH brute-force attack using a password list:
  </p>

  <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mb-6 text-sm text-gray-200 overflow-x-auto">
{`hydra -l root -P passwords.txt ssh://192.168.1.10`}
  </pre>

  <p className="text-gray-300 mb-6">
    Hydra will attempt multiple password combinations and report any valid
    credentials found.
  </p>

  {/* MONITORING */}
  <h3 className="text-xl font-semibold mb-3 text-cyan-400">
    5️⃣ Monitoring the Attack
  </h3>

  <p className="text-gray-300 mb-6">
    During execution, Hydra shows:
  </p>

  <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
    <li>Number of active tasks (threads)</li>
    <li>Current username-password attempts</li>
    <li>Successful login messages (highlighted)</li>
  </ul>

  {/* STOPPING */}
  <h3 className="text-xl font-semibold mb-3 text-cyan-400">
    6️⃣ Stopping Hydra Safely
  </h3>

  <p className="text-gray-300 mb-3">
    Stop Hydra at any time using:
  </p>

  <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mb-6 text-sm text-gray-200 overflow-x-auto">
{`CTRL + C`}
  </pre>

  <p className="text-gray-300 mb-6">
    Always stop attacks once valid credentials are found or testing is complete.
  </p>

  {/* BEST PRACTICES */}
  <h3 className="text-xl font-semibold mb-3 text-cyan-400">
    7️⃣ Best Practices
  </h3>

  <ul className="list-disc list-inside text-gray-300 space-y-2">
    <li>Use small wordlists first to avoid account lockouts</li>
    <li>Limit threads using <code>-t</code> option</li>
    <li>Use <code>-f</code> to stop after first success</li>
    <li>Always document your findings</li>
  </ul>

</section>

      {/* ===============================
    HYDRA COMMANDS TABLE (DETAILED)
=============================== */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Common Hydra Commands
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-cyan-300">
        <tr>
          <th className="px-4 py-3 border border-gray-700">Command</th>
          <th className="px-4 py-3 border border-gray-700">Purpose</th>
        </tr>
      </thead>

      <tbody className="text-gray-300">

        {/* BASIC COMMANDS */}
        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -h
          </td>
          <td className="px-4 py-2 border border-gray-700">
            Display help menu and all available options
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -l admin -P passwords.txt ssh://192.168.1.10
          </td>
          <td className="px-4 py-2 border border-gray-700">
            SSH brute-force using a single username and password list
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -L users.txt -P pass.txt ftp://192.168.1.10
          </td>
          <td className="px-4 py-2 border border-gray-700">
            FTP attack using multiple usernames and passwords
          </td>
        </tr>

        {/* THREAD & SPEED CONTROL */}
        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -l admin -P pass.txt -t 4 ssh://192.168.1.10
          </td>
          <td className="px-4 py-2 border border-gray-700">
            Limit attack speed using 4 parallel threads
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -l admin -P pass.txt -f ssh://192.168.1.10
          </td>
          <td className="px-4 py-2 border border-gray-700">
            Stop attack immediately after first valid login is found
          </td>
        </tr>

        {/* WEB LOGIN ATTACKS */}
        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -l admin -P pass.txt http-get-form "/login.php:user=^USER^&pass=^PASS^:F=invalid"
          </td>
          <td className="px-4 py-2 border border-gray-700">
            Brute-force HTTP GET based web login form
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -L users.txt -P pass.txt http-post-form "/login.php:user=^USER^&pass=^PASS^:F=incorrect"
          </td>
          <td className="px-4 py-2 border border-gray-700">
            Brute-force HTTP POST login form using wordlists
          </td>
        </tr>

        {/* DATABASE & REMOTE SERVICES */}
        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -l root -P pass.txt mysql://192.168.1.10
          </td>
          <td className="px-4 py-2 border border-gray-700">
            MySQL database password attack
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -L users.txt -P pass.txt rdp://192.168.1.10
          </td>
          <td className="px-4 py-2 border border-gray-700">
            RDP (Remote Desktop Protocol) brute-force attack
          </td>
        </tr>

        {/* OUTPUT & VERBOSE */}
        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -l admin -P pass.txt -vV ssh://192.168.1.10
          </td>
          <td className="px-4 py-2 border border-gray-700">
            Run Hydra in verbose mode (show every attempt)
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            hydra -l admin -P pass.txt -o result.txt ssh://192.168.1.10
          </td>
          <td className="px-4 py-2 border border-gray-700">
            Save cracked credentials to an output file
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</section>

      {/* ===============================
    STEP BY STEP USING HYDRA (DETAILED)
=============================== */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using Hydra
  </h2>

  <ol className="list-decimal list-inside text-gray-300 space-y-6 leading-relaxed">

    <li>
      <strong>Identify the target service</strong><br />
      First, determine which authentication service is running on the target
      system. This can be done using tools like <strong>Nmap</strong>.
      Common services include:
      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
        <li>SSH (port 22)</li>
        <li>FTP (port 21)</li>
        <li>HTTP / HTTPS login forms</li>
        <li>SMTP, RDP, MySQL, etc.</li>
      </ul>

      <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mt-3 text-sm text-gray-200">
{`nmap -p 22,21,80,443 192.168.1.10`}
      </pre>
    </li>

    <li>
      <strong>Confirm the login mechanism</strong><br />
      Make sure the service actually uses <strong>username-password
      authentication</strong>. For web applications, inspect the login page
      and identify:
      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
        <li>Login URL (e.g., /login.php)</li>
        <li>Username field name</li>
        <li>Password field name</li>
        <li>Error message on failed login</li>
      </ul>
    </li>

    <li>
      <strong>Prepare username and password wordlists</strong><br />
      Hydra works using wordlists. You can:
      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
        <li>Create your own lists manually</li>
        <li>Use default Kali Linux wordlists</li>
        <li>Use common usernames like <code>admin</code>, <code>root</code></li>
      </ul>

      <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mt-3 text-sm text-gray-200">
{`nano users.txt
nano passwords.txt`}
      </pre>
    </li>

    <li>
      <strong>Choose the correct Hydra syntax</strong><br />
      Hydra syntax depends on the protocol you are attacking.  
      General format:
      <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mt-3 text-sm text-gray-200">
{`hydra -L users.txt -P passwords.txt <protocol>://<target-ip>`}
      </pre>
    </li>

    <li>
      <strong>Run the Hydra attack</strong><br />
      Execute Hydra with proper options. Example for SSH:
      <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mt-3 text-sm text-gray-200">
{`hydra -l root -P passwords.txt ssh://192.168.1.10`}
      </pre>

      For FTP:
      <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mt-3 text-sm text-gray-200">
{`hydra -L users.txt -P passwords.txt ftp://192.168.1.10`}
      </pre>
    </li>

    <li>
      <strong>Monitor the attack process</strong><br />
      Hydra will:
      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
        <li>Test multiple combinations in parallel</li>
        <li>Show attempts in real time</li>
        <li>Stop automatically when valid credentials are found</li>
      </ul>
    </li>

    <li>
      <strong>Analyze Hydra output</strong><br />
      If successful, Hydra displays valid credentials clearly:
      <pre className="bg-black/40 border border-gray-700 rounded-lg p-4 mt-3 text-sm text-green-400">
{`[22][ssh] host: 192.168.1.10  login: admin  password: admin123`}
      </pre>
    </li>

    <li>
      <strong>Verify the credentials</strong><br />
      Always manually verify discovered credentials by logging into
      the service to ensure they are correct and usable.
    </li>

    <li>
      <strong>Document findings</strong><br />
      In professional penetration testing, record:
      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
        <li>Target IP and service</li>
        <li>Weak credentials found</li>
        <li>Risk severity</li>
        <li>Recommended mitigation</li>
      </ul>
    </li>

    <li>
      <strong>Stop and clean up</strong><br />
      Stop Hydra once testing is complete.  
      Never continue brute-forcing unnecessarily.
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
    <strong>Hydra</strong> should be used <strong>only on systems,
    servers, or services that you own or have explicit permission
    to test</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed mb-2">
    Performing brute-force or dictionary attacks against login
    services without authorization is <strong>illegal and punishable
    by law</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed">
    This tool is intended strictly for
    <strong> ethical hacking, penetration testing, and cybersecurity
    education</strong>.
  </p>
</section>

    </div>
  );
}