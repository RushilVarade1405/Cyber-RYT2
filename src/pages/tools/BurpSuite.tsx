import { Link } from "react-router-dom";

export default function BurpSuite() {
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
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
        Burp Suite (Web Application Security Testing Tool)
      </h1>

      {/* ===============================
          BADGES
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

        <span className="px-3 py-1 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
          Web Application Testing
        </span>

        <span className="px-3 py-1 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30">
          Intercepting Proxy
        </span>

        <span className="px-3 py-1 text-sm rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30">
          Ethical Hacking
        </span>

        <span className="px-3 py-1 text-sm rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/30">
          Vulnerability Analysis
        </span>

      </div>

{/* ===============================
    WHAT IS BURP SUITE
=============================== */}
<section className="mb-12 px-2 sm:px-0">

  <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-cyan-300">
    What is Burp Suite?
  </h2>

  <div className="space-y-4">

    <p className="text-gray-300 leading-relaxed">
      <strong>Burp Suite</strong> is a professional and widely used
      <strong> web application security testing platform</strong> developed
      by <strong>PortSwigger</strong>. It is designed to help security
      professionals analyze, intercept, and manipulate
      <strong> HTTP and HTTPS traffic</strong> between a client (browser)
      and a web server.
    </p>

    <p className="text-gray-300 leading-relaxed">
      The tool works as an <strong>intercepting proxy</strong>, meaning it
      sits between the browser and the web application and allows testers
      to view and control every request and response exchanged during
      communication.
    </p>

    <p className="text-gray-300 leading-relaxed">
      Burp Suite is extensively used by
      <strong> ethical hackers, penetration testers, bug bounty hunters,
      cybersecurity researchers, and students</strong> to identify and
      exploit vulnerabilities such as
      <strong> SQL Injection, Cross-Site Scripting (XSS),
      authentication flaws, access control issues, and session misconfigurations</strong>.
    </p>

    <p className="text-gray-300 leading-relaxed">
      Unlike traditional browsers or automated scanners, Burp Suite provides
      <strong> complete visibility and manual control</strong> over web traffic.
      Testers can pause requests, modify parameters, replay requests multiple
      times, and analyze how the server behaves under different conditions.
    </p>

    <p className="text-gray-300 leading-relaxed">
      Burp Suite does <strong>not automatically hack websites</strong>.
      It is a testing and analysis tool that requires
      <strong> human decision-making and technical knowledge</strong>.
      When used ethically and legally, it plays a crucial role in
      improving the overall security of web applications.
    </p>

    <p className="text-gray-300 leading-relaxed">
      ⚠️ Burp Suite must be used
      <strong> only on applications you own or have explicit permission to test</strong>,
      as unauthorized interception or manipulation of traffic is illegal.
    </p>

  </div>

</section>

 {/* ===============================
    WHAT BURP SUITE DOES
=============================== */}
<section className="mb-12 px-2 sm:px-0">

  <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-cyan-300">
    What Does Burp Suite Do?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-5">
    Burp Suite helps security testers <strong>analyze, understand, and test web applications</strong>
    by closely examining how data is exchanged between the browser and the server.
    It allows testers to identify weaknesses in authentication, authorization,
    input handling, and session management.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-4">

    <li>
      <strong>Intercepts HTTP/HTTPS traffic:</strong>  
      Captures all requests and responses so testers can inspect headers,
      cookies, parameters, tokens, and payloads before they reach the server.
    </li>

    <li>
      <strong>Allows request manipulation:</strong>  
      Enables modification of request values such as user IDs, roles,
      prices, hidden fields, and API parameters to test for logic flaws
      and authorization issues.
    </li>

    <li>
      <strong>Replays requests for testing:</strong>  
      Lets users resend the same request multiple times with different inputs
      to analyze how the application behaves under varying conditions.
    </li>

    <li>
      <strong>Performs manual and automated attacks:</strong>  
      Uses tools like <strong>Repeater</strong> for manual testing and
      <strong>Intruder</strong> for automated payload attacks, fuzzing,
      and brute-force testing.
    </li>

    <li>
      <strong>Supports vulnerability discovery:</strong>  
      Helps identify common and complex vulnerabilities such as
      <strong>SQL Injection, XSS, CSRF, broken authentication,
      and access control flaws</strong>.
    </li>

  </ul>

  <p className="text-gray-300 leading-relaxed mt-6">
    Overall, Burp Suite transforms raw web traffic into meaningful security
    insights, making it an essential tool for modern
    <strong> web application security testing</strong>.
  </p>

</section>
{/* ===============================
    WHY BURP SUITE IS IMPORTANT
=============================== */}
<section className="mb-12 px-2 sm:px-0">

  <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-cyan-300">
    Why Burp Suite Is Important in Web Security
  </h2>

  <p className="text-gray-300 leading-relaxed mb-5">
    Burp Suite plays a critical role in modern
    <strong> web application security testing</strong>.
    Most cyberattacks exploit weaknesses in how web applications
    handle user input, authentication, sessions, and access control.
    Burp Suite helps uncover these weaknesses before attackers do.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-4">

    <li>
      <strong>Deep visibility into web traffic:</strong>  
      Burp Suite allows testers to see every request and response,
      including hidden parameters, cookies, tokens, and headers
      that browsers normally abstract away.
    </li>

    <li>
      <strong>Essential for manual security testing:</strong>  
      Unlike fully automated tools, Burp Suite supports
      hands-on testing, which is crucial for finding
      logic flaws and business rule vulnerabilities.
    </li>

    <li>
      <strong>Industry-standard tool:</strong>  
      Burp Suite is widely recognized and used by
      professional penetration testers, bug bounty hunters,
      and security teams across the world.
    </li>

    <li>
      <strong>Supports learning and skill development:</strong>  
      Students and beginners use Burp Suite to understand
      how real-world web applications communicate and
      how vulnerabilities actually occur in practice.
    </li>

    <li>
      <strong>Improves secure development:</strong>  
      Developers use Burp Suite during testing to
      fix security issues early, reducing the risk
      of data breaches and cyberattacks.
    </li>

  </ul>

  <p className="text-gray-300 leading-relaxed mt-6">
    Because of its flexibility, precision, and wide adoption,
    Burp Suite is considered a
    <strong> foundational tool</strong> in web application security
    and ethical hacking.
  </p>

</section>

{/* ===============================
    COMMON VULNERABILITIES FOUND USING BURP SUITE
=============================== */}
<section className="mb-12 px-2 sm:px-0">

  <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-cyan-300">
    Common Vulnerabilities Found Using Burp Suite
  </h2>

  <p className="text-gray-300 leading-relaxed mb-5">
    Burp Suite is widely used to identify a range of
    <strong> web application security vulnerabilities</strong>
    by analyzing and manipulating HTTP/HTTPS requests.
    These vulnerabilities often arise due to poor input validation,
    weak authentication, and improper access controls.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-4">

    <li>
      <strong>SQL Injection (SQLi):</strong>  
      Burp Suite allows testers to modify input parameters and observe
      database error messages or unexpected responses, helping identify
      SQL injection flaws in login forms, search fields, and APIs.
    </li>

    <li>
      <strong>Cross-Site Scripting (XSS):</strong>  
      By injecting malicious scripts into input fields and replaying requests,
      Burp Suite helps detect reflected, stored, and DOM-based XSS vulnerabilities.
    </li>

    <li>
      <strong>Broken Authentication:</strong>  
      Testers can analyze login requests, session tokens, and cookies to
      identify weak password policies, predictable tokens, and improper
      session handling.
    </li>

    <li>
      <strong>Broken Access Control:</strong>  
      Burp Suite makes it easy to modify user roles, IDs, or parameters
      to check whether users can access unauthorized resources.
    </li>

    <li>
      <strong>Cross-Site Request Forgery (CSRF):</strong>  
      By inspecting request structure and missing CSRF tokens,
      Burp Suite helps identify actions that can be triggered
      without proper user validation.
    </li>

    <li>
      <strong>Insecure Input Validation:</strong>  
      Fuzzing inputs using Burp Suite reveals applications that
      fail to properly validate user-supplied data, leading to
      injection or logic-based vulnerabilities.
    </li>

    <li>
      <strong>Security Misconfigurations:</strong>  
      Burp Suite can expose misconfigured headers, verbose error messages,
      exposed admin panels, and insecure cookie flags.
    </li>

  </ul>

</section>

{/* ===============================
    CORE BURP SUITE TOOLS
=============================== */}
<section className="mb-14 px-2 sm:px-0">

  <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
    Core Burp Suite Tools
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-700 text-sm">

      <thead className="bg-gray-800 text-cyan-300">
        <tr>
          <th className="px-4 py-3 border border-gray-700 w-1/4">
            Tool
          </th>
          <th className="px-4 py-3 border border-gray-700 w-3/4">
            Purpose & Description
          </th>
        </tr>
      </thead>

      <tbody className="text-gray-300 leading-relaxed">

        {/* PROXY */}
        <tr>
          <td className="px-4 py-4 border border-gray-700 font-mono">
            Proxy
          </td>
          <td className="px-4 py-4 border border-gray-700">
            The <strong>Proxy</strong> tool acts as an intercepting proxy
            between the browser and the web server. It captures all
            HTTP and HTTPS traffic, allowing testers to view, modify,
            and forward requests and responses.
            <br /><br />
            <strong>Used for:</strong> Intercepting traffic, analyzing
            parameters, cookies, headers, and understanding how the
            application communicates internally.
          </td>
        </tr>

        {/* TARGET */}
        <tr>
          <td className="px-4 py-4 border border-gray-700 font-mono">
            Target
          </td>
          <td className="px-4 py-4 border border-gray-700">
            The <strong>Target</strong> tool provides a structured map
            of the application being tested. It shows all discovered
            endpoints, directories, and parameters in a visual tree format.
            <br /><br />
            <strong>Used for:</strong> Reconnaissance, defining testing scope,
            and planning attacks logically instead of randomly.
          </td>
        </tr>

        {/* REPEATER */}
        <tr>
          <td className="px-4 py-4 border border-gray-700 font-mono">
            Repeater
          </td>
          <td className="px-4 py-4 border border-gray-700">
            <strong>Repeater</strong> allows testers to manually send
            the same request multiple times while modifying parameters.
            Responses can be compared to detect vulnerabilities.
            <br /><br />
            <strong>Used for:</strong> SQL injection testing, authentication
            bypass checks, logic flaws, and API testing.
          </td>
        </tr>

        {/* INTRUDER */}
        <tr>
          <td className="px-4 py-4 border border-gray-700 font-mono">
            Intruder
          </td>
          <td className="px-4 py-4 border border-gray-700">
            <strong>Intruder</strong> automates attacks by injecting
            payloads into selected request positions. It supports
            brute-force attacks, fuzzing, and payload testing.
            <br /><br />
            <strong>Used for:</strong> Password attacks, rate-limit testing,
            parameter discovery, and authorization testing.
          </td>
        </tr>

        {/* SCANNER */}
        <tr>
          <td className="px-4 py-4 border border-gray-700 font-mono">
            Scanner
          </td>
          <td className="px-4 py-4 border border-gray-700">
            The <strong>Scanner</strong> (Professional edition only)
            automatically identifies common web vulnerabilities
            such as SQLi, XSS, CSRF, and security misconfigurations.
            <br /><br />
            <strong>Used for:</strong> Initial vulnerability discovery,
            validation of findings, and security reporting.
          </td>
        </tr>

        {/* DECODER */}
        <tr>
          <td className="px-4 py-4 border border-gray-700 font-mono">
            Decoder
          </td>
          <td className="px-4 py-4 border border-gray-700">
            <strong>Decoder</strong> helps encode and decode data
            formats such as Base64, URL encoding, and hashes.
            <br /><br />
            <strong>Used for:</strong> Analyzing encoded parameters,
            tokens, cookies, and obfuscated values.
          </td>
        </tr>

        {/* COMPARER */}
        <tr>
          <td className="px-4 py-4 border border-gray-700 font-mono">
            Comparer
          </td>
          <td className="px-4 py-4 border border-gray-700">
            <strong>Comparer</strong> allows testers to compare two
            or more requests or responses side-by-side.
            <br /><br />
            <strong>Used for:</strong> Detecting subtle differences
            in responses that may reveal vulnerabilities.
          </td>
        </tr>

      </tbody>
    </table>
  </div>

</section>


      {/* ===============================
    LEGAL & ETHICAL WARNING
=============================== */}
<section className="bg-red-900/20 border border-red-500/30 rounded-xl
                    p-5 sm:p-6 md:p-7 mb-14">

  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-red-400">
    ⚠ Legal & Ethical Warning
  </h2>

  <p className="text-gray-300 leading-relaxed">
    This tool is intended strictly for
    <strong> ethical hacking, penetration testing, academic learning,
    and defensive security research</strong>.
    Always follow responsible disclosure practices and applicable laws.
  </p>

</section>
    </div>
  );
}