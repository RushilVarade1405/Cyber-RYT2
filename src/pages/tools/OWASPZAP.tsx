import { Link } from "react-router-dom";

export default function OWASPZAP() {
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
        OWASP ZAP (Zed Attack Proxy)
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
    bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
    Web Application Security
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-purple-600/20 text-purple-400 border border-purple-500/30">
    Vulnerability Scanning
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-blue-600/20 text-blue-400 border border-blue-500/30">
    Proxy Interception
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-orange-600/20 text-orange-400 border border-orange-500/30">
    Ethical Hacking
  </span>

  <span className="px-3 py-1 text-sm rounded-full
    bg-red-600/20 text-red-400 border border-red-500/30">
    Active & Passive Scanning
  </span>

</div>

      {/* ===============================
          WHAT IS OWASP ZAP
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          What is OWASP ZAP?
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          <strong>OWASP ZAP (Zed Attack Proxy)</strong> is a free and open-source
          <strong> web application security testing tool</strong> developed by
          the <strong>Open Web Application Security Project (OWASP)</strong>.
          It is designed to help beginners and professionals identify
          security vulnerabilities in web applications.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          OWASP ZAP works as a <strong>man-in-the-middle proxy</strong> between
          the browser and the web application, allowing testers to
          intercept, inspect, and modify <strong>HTTP and HTTPS traffic</strong>.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          Because it is completely <strong>free</strong>, OWASP ZAP is widely
          used by <strong>cybersecurity students, ethical hackers, and developers</strong>
          for learning and real-world security testing.
        </p>

        <p className="text-gray-300 leading-relaxed">
          OWASP ZAP does not automatically hack websites.
          It must be used only with <strong>proper authorization</strong>
          to improve the security of web applications.
        </p>
      </section>

      {/* ===============================
          WHAT OWASP ZAP DOES
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          What Does OWASP ZAP Do?
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          OWASP ZAP helps testers understand how a web application behaves
          by analyzing communication between the browser and the server.
        </p>

        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-3">
          <li>
            <strong>Intercepts HTTP and HTTPS traffic</strong> for inspection
          </li>
          <li>
            <strong>Allows modification of requests</strong> before they reach the server
          </li>
          <li>
            <strong>Performs automated vulnerability scanning</strong>
          </li>
          <li>
            <strong>Supports manual security testing</strong>
          </li>
          <li>
            <strong>Generates alerts</strong> with risk levels and explanations
          </li>
        </ul>
      </section>

      {/* ===============================
    INSTALLATION STEPS
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Installation Steps
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Follow these beginner-friendly steps to install OWASP ZAP on
    Linux-based systems such as Kali Linux, Ubuntu, or Parrot OS.
    Administrative (sudo) access is required.
  </p>

  <div className="bg-gray-900 rounded-lg p-5 space-y-4 text-sm text-gray-200 font-mono">

    <div>
      <p>
        <span className="text-cyan-400">Step 1:</span> Update system packages
      </p>
      <p>sudo apt update</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        This command refreshes the package list so your system installs
        the latest available version of OWASP ZAP.
      </p>
    </div>

    <div>
      <p>
        <span className="text-cyan-400">Step 2:</span> Install OWASP ZAP
      </p>
      <p>sudo apt install zaproxy</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        This installs OWASP ZAP along with all required dependencies.
        On Kali Linux, this step may be skipped if ZAP is already installed.
      </p>
    </div>

    <div>
      <p>
        <span className="text-cyan-400">Step 3:</span> Verify the installation
      </p>
      <p>zaproxy -version</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        This confirms that OWASP ZAP has been installed successfully.
      </p>
    </div>

    <div>
      <p>
        <span className="text-cyan-400">Step 4:</span> Launch OWASP ZAP
      </p>
      <p>zaproxy</p>
      <p className="text-xs text-gray-400 font-sans mt-1">
        This opens the OWASP ZAP graphical interface, ready for testing.
      </p>
    </div>

  </div>

  <p className="text-gray-300 leading-relaxed mt-4">
    Once OWASP ZAP is launched, you can begin configuring your browser
    and start intercepting web traffic for security testing.
  </p>
</section>

      {/* ===============================
    CORE OWASP ZAP FEATURES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Core OWASP ZAP Features
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    OWASP ZAP provides multiple built-in features that work together
    to help security testers analyze, scan, and understand web applications.
    Each feature focuses on a specific phase of web application security testing.
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

        {/* INTERCEPTING PROXY */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Intercepting Proxy
          </td>
          <td className="px-4 py-3 border border-gray-700">
            The <strong>Intercepting Proxy</strong> sits between your browser
            and the web application to capture all HTTP and HTTPS traffic.
            <br /><br />
            <strong>What you can do:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>View requests and responses in real time</li>
              <li>Modify headers, parameters, cookies, and payloads</li>
              <li>Analyze authentication and session handling</li>
            </ul>
            <br />
            <strong>Used for:</strong> Login testing, parameter tampering,
            access control testing, and understanding application behavior.
          </td>
        </tr>

        {/* SPIDER */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Spider
          </td>
          <td className="px-4 py-3 border border-gray-700">
            The <strong>Spider</strong> automatically crawls the target
            application to discover pages, endpoints, forms, and parameters.
            <br /><br />
            <strong>What you can do:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Automatically map the application structure</li>
              <li>Find hidden URLs not easily reachable manually</li>
              <li>Improve scan coverage before active testing</li>
            </ul>
            <br />
            <strong>Used for:</strong> Reconnaissance and preparing the target
            for vulnerability scanning.
          </td>
        </tr>

        {/* PASSIVE SCAN */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Passive Scan
          </td>
          <td className="px-4 py-3 border border-gray-700">
            <strong>Passive Scan</strong> analyzes traffic without sending
            any malicious or intrusive requests to the server.
            <br /><br />
            <strong>What you can do:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Identify security issues while browsing normally</li>
              <li>Detect missing security headers and misconfigurations</li>
              <li>Find information disclosure issues</li>
            </ul>
            <br />
            <strong>Used for:</strong> Safe vulnerability detection in
            production-like environments.
          </td>
        </tr>

        {/* ACTIVE SCAN */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Active Scan
          </td>
          <td className="px-4 py-3 border border-gray-700">
            The <strong>Active Scan</strong> feature actively attacks
            the target application using known payloads.
            <br /><br />
            <strong>What you can do:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Test for SQL Injection, XSS, CSRF, and more</li>
              <li>Identify input validation weaknesses</li>
              <li>Automatically discover high-risk vulnerabilities</li>
            </ul>
            <br />
            <strong>Used for:</strong> Deep security testing on authorized
            and non-production targets.
          </td>
        </tr>

        {/* ALERTS */}
        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono align-top">
            Alerts
          </td>
          <td className="px-4 py-3 border border-gray-700">
            The <strong>Alerts</strong> section displays all discovered
            security issues detected by ZAP.
            <br /><br />
            <strong>What you can see:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Risk level (High, Medium, Low, Informational)</li>
              <li>Description of the vulnerability</li>
              <li>Affected URLs and parameters</li>
            </ul>
            <br />
            <strong>Used for:</strong> Reviewing findings, learning about
            vulnerabilities, and preparing security reports.
          </td>
        </tr>

      </tbody>
    </table>
  </div>

  <p className="text-gray-300 leading-relaxed mt-6">
    Together, these features create a complete web application security
    testing workflow, from traffic interception to vulnerability discovery
    and reporting.
  </p>
</section>

      {/* ===============================
    STEP BY STEP USING OWASP ZAP
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using OWASP ZAP
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    This step-by-step guide explains how OWASP ZAP is used in a real
    web application security testing workflow. These steps are written
    for beginners and reflect how ethical hackers and penetration testers
    actually use ZAP in practice.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-5">

    <li>
      <strong>Launch OWASP ZAP:</strong><br />
      Start OWASP ZAP from the applications menu or by running
      <code className="ml-1 text-cyan-400">zaproxy</code> in the terminal.
      When prompted, select <strong>Standard Mode</strong>.
      <br />
      <span className="text-sm text-gray-400">
        Standard Mode allows both passive and active testing.
      </span>
    </li>

    <li>
      <strong>Understand the ZAP Interface:</strong><br />
      Take a moment to explore important panels such as
      <strong> Sites Tree, History, Alerts, and Active Scan</strong>.
      <br />
      <span className="text-sm text-gray-400">
        Knowing where traffic and alerts appear helps you test efficiently.
      </span>
    </li>

    <li>
      <strong>Configure the Browser Proxy:</strong><br />
      Configure your browser to use a proxy at
      <strong> 127.0.0.1</strong> on port <strong>8080</strong>,
      or use ZAP’s built-in browser.
      <br />
      <span className="text-sm text-gray-400">
        This ensures all browser traffic passes through OWASP ZAP.
      </span>
    </li>

    <li>
      <strong>Visit the Target Application:</strong><br />
      Open the target website in the browser and use it normally:
      log in, click links, submit forms, and navigate pages.
      <br />
      <span className="text-sm text-gray-400">
        ZAP records every request and response automatically.
      </span>
    </li>

    <li>
      <strong>Observe Captured Traffic:</strong><br />
      Check the <strong>Sites Tree</strong> and <strong>History</strong>
      tabs to view discovered URLs, endpoints, parameters, and requests.
      <br />
      <span className="text-sm text-gray-400">
        This helps you understand how the application is structured.
      </span>
    </li>

    <li>
      <strong>Run the Spider (Crawling):</strong><br />
      Right-click the target site in the Sites Tree and start the
      <strong> Spider</strong> to automatically discover hidden pages
      and endpoints.
      <br />
      <span className="text-sm text-gray-400">
        Spidering improves coverage before scanning.
      </span>
    </li>

    <li>
      <strong>Allow Passive Scanning:</strong><br />
      As you browse and spider the site, ZAP performs
      <strong> Passive Scanning</strong> automatically.
      <br />
      <span className="text-sm text-gray-400">
        Passive scan does not send malicious requests and is safe.
      </span>
    </li>

    <li>
      <strong>Run Active Scan (With Permission):</strong><br />
      Start an <strong>Active Scan</strong> to actively test for
      vulnerabilities like SQL Injection and XSS.
      <br />
      <span className="text-sm text-gray-400">
        Active scanning sends attack payloads — use only on authorized targets.
      </span>
    </li>

    <li>
      <strong>Review Security Alerts:</strong><br />
      Open the <strong>Alerts</strong> tab to see detected issues,
      their risk levels, descriptions, and affected URLs.
      <br />
      <span className="text-sm text-gray-400">
        Alerts are categorized as High, Medium, Low, or Informational.
      </span>
    </li>

    <li>
      <strong>Manually Verify Findings:</strong><br />
      Investigate alerts manually by reviewing requests and responses
      to confirm whether vulnerabilities are real.
      <br />
      <span className="text-sm text-gray-400">
        Manual verification reduces false positives.
      </span>
    </li>

    <li>
      <strong>Document or Export Results:</strong><br />
      Save screenshots, notes, or export reports for learning,
      fixing vulnerabilities, or creating security reports.
      <br />
      <span className="text-sm text-gray-400">
        Proper documentation is essential in real-world testing.
      </span>
    </li>

  </ol>
</section>

      {/* ===============================
    IMPORTANT NOTE
=============================== */}
<section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-3 text-red-400">
    ⚠ Legal & Ethical Warning
  </h2>

  <p className="text-gray-300 leading-relaxed">
    OWASP ZAP should be used <strong>only on web applications you own
    or have explicit permission to test</strong>. Unauthorized
    vulnerability scanning, traffic interception, or manipulation
    of web applications without consent is illegal and may result
    in serious legal consequences.
  </p>
</section>
    </div>
  );
}
