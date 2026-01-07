import { Link } from "react-router-dom";

export default function TheHarvester() {
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
        theHarvester (OSINT Reconnaissance Tool)
      </h1>

      {/* ===============================
          SKILL LEVEL & TAGS
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-10">
        <span className="px-4 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/40">
          Beginner Friendly
        </span>
        <span className="px-4 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
          Intermediate
        </span>
        <span className="px-4 py-1 rounded-full text-sm bg-red-500/20 text-red-400 border border-red-500/40">
          Advanced
        </span>
        <span className="px-4 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
          OSINT & Reconnaissance
        </span>
      </div>

      {/* ===============================
    WHAT IS THEHARVESTER
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is theHarvester?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>theHarvester</strong> is a powerful and beginner-friendly
    <strong> OSINT (Open-Source Intelligence)</strong> tool that comes
    pre-installed in <strong>Kali Linux</strong>. It is mainly used in the
    <strong> reconnaissance (information gathering)</strong> phase of
    cybersecurity and penetration testing.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    In simple words, theHarvester helps you <strong>collect information that is
    already available on the internet</strong> about a target organization or
    website. It does <strong>not hack or attack</strong> the target. Instead,
    it searches public sources like search engines, public databases, and APIs
    to find useful details.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Using theHarvester, you can discover information such as:
  </p>

  <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
    <li>Email addresses related to a domain</li>
    <li>Subdomains (like mail.example.com, admin.example.com)</li>
    <li>Hostnames and servers</li>
    <li>Publicly exposed IP addresses</li>
  </ul>

  <p className="text-gray-300 leading-relaxed mb-4">
    For example, if a company owns <strong>example.com</strong>, theHarvester
    can help identify how many subdomains exist, what email formats employees
    use, and which servers are publicly visible. This information is extremely
    useful for understanding the <strong>attack surface</strong> of a target.
  </p>

  <p className="text-gray-300 leading-relaxed">
    Because theHarvester only gathers <strong>publicly available data</strong>,
    it is widely used by:
  </p>

  <ul className="list-disc list-inside text-gray-300 space-y-2">
    <li>Ethical hackers and penetration testers</li>
    <li>Bug bounty hunters</li>
    <li>Cybersecurity students and beginners</li>
    <li>Blue teams for asset discovery and defense</li>
  </ul>
</section>

      {/* ===============================
    WHY THEHARVESTER IS IMPORTANT
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Why theHarvester is Important?
  </h2>

  <ul className="list-disc list-inside text-gray-300 space-y-4 leading-relaxed">
    <li>
      <strong className="text-cyan-400">Passive Reconnaissance (No Direct Attack)</strong>
      <br />
      theHarvester performs <strong>passive reconnaissance</strong>, which means
      it collects information without directly interacting with or attacking
      the target system. This makes it safer, stealthier, and less likely to
      trigger security alerts.
    </li>

    <li>
      <strong className="text-cyan-400">Reveals Exposed Emails and Subdomains</strong>
      <br />
      Many organizations unintentionally expose employee email addresses and
      subdomains on public platforms. theHarvester helps identify these, which
      can later be used for phishing analysis, password audits, or security
      hardening.
    </li>

    <li>
      <strong className="text-cyan-400">Helps Build an Attack Surface Map</strong>
      <br />
      By collecting subdomains, hosts, and IP addresses, theHarvester helps
      create a clear picture of what parts of an organization are publicly
      visible. This is known as the <strong>attack surface</strong>, and
      understanding it is critical before any security testing begins.
    </li>

    <li>
      <strong className="text-cyan-400">
        Essential for Penetration Testing & Bug Bounty
      </strong>
      <br />
      Ethical hackers and bug bounty hunters use theHarvester to quickly gather
      initial intelligence. It saves time and helps focus testing on real,
      exposed assets instead of guessing.
    </li>

    <li>
      <strong className="text-cyan-400">Useful for Blue Teams & Defenders</strong>
      <br />
      Blue teams use theHarvester to see what information attackers can find
      about their organization. This helps them remove unnecessary exposures,
      tighten security, and reduce risks.
    </li>
  </ul>
</section>

{/* ===============================
    KEY FEATURES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Key Features
  </h2>

  <ul className="list-disc list-inside text-gray-300 space-y-4 leading-relaxed">
    <li>
      <strong className="text-cyan-400">Search Engine Scraping</strong>
      <br />
      theHarvester collects information by querying popular search engines like
      Google, Bing, DuckDuckGo, and others. It extracts data that search engines
      have already indexed, such as subdomains, emails, and website links.
      <br />
      <span className="text-gray-400 text-sm">
        Example: Finding subdomains indexed by Google.
      </span>
    </li>

    <li>
      <strong className="text-cyan-400">Email & Subdomain Harvesting</strong>
      <br />
      One of the core features of theHarvester is discovering publicly exposed
      email addresses and subdomains associated with a domain. This helps
      understand email patterns and identify different parts of an
      organization’s infrastructure.
      <br />
      <span className="text-gray-400 text-sm">
        Example: admin@example.com, mail.example.com
      </span>
    </li>

    <li>
      <strong className="text-cyan-400">DNS Brute Forcing</strong>
      <br />
      theHarvester can perform DNS brute-force attacks using common subdomain
      wordlists. This helps find hidden or less obvious subdomains that are not
      easily visible through search engines.
      <br />
      <span className="text-gray-400 text-sm">
        Example: dev.example.com, test.example.com
      </span>
    </li>

    <li>
      <strong className="text-cyan-400">API-Based Intelligence Gathering</strong>
      <br />
      theHarvester integrates with intelligence platforms like Shodan, Censys,
      and SecurityTrails using APIs. These sources provide deeper technical
      details such as IP addresses, open ports, and SSL certificate data.
      <br />
      <span className="text-gray-400 text-sm">
        Note: Some APIs require an API key.
      </span>
    </li>

    <li>
      <strong className="text-cyan-400">Multiple Output Formats</strong>
      <br />
      theHarvester allows you to save results in different formats such as HTML,
      XML, and JSON. This makes it easy to analyze results later, share reports,
      or integrate data into other security tools.
      <br />
      <span className="text-gray-400 text-sm">
        Example: Exporting results to an HTML report.
      </span>
    </li>
  </ul>
</section>

      {/* ===============================
    COMMON PROTOCOLS
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Common Protocols You’ll See
  </h2>

  <ul className="list-disc list-inside text-gray-300 space-y-4 leading-relaxed">
    <li>
      <strong className="text-cyan-400">HTTP / HTTPS (HyperText Transfer Protocol)</strong>
      <br />
      These protocols are used for web communication. theHarvester queries
      search engines and public websites over HTTP/HTTPS to extract emails,
      subdomains, links, and other publicly exposed information.
      <br />
      <span className="text-gray-400 text-sm">
        Example: Discovering subdomains indexed by Google or Bing.
      </span>
    </li>

    <li>
      <strong className="text-cyan-400">DNS (Domain Name System)</strong>
      <br />
      DNS translates domain names into IP addresses. theHarvester uses DNS
      records to identify subdomains, hostnames, and related infrastructure.
      DNS brute-force helps uncover hidden or less-visible subdomains.
      <br />
      <span className="text-gray-400 text-sm">
        Example: admin.example.com, mail.example.com
      </span>
    </li>

    <li>
      <strong className="text-cyan-400">SMTP (Simple Mail Transfer Protocol)</strong>
      <br />
      SMTP is used for email communication. theHarvester gathers email
      addresses linked to a domain by scraping public sources, which can
      reveal employee emails and naming patterns.
      <br />
      <span className="text-gray-400 text-sm">
        Example: firstname.lastname@example.com
      </span>
    </li>

    <li>
      <strong className="text-cyan-400">IP (Internet Protocol)</strong>
      <br />
      IP addresses identify devices on a network. theHarvester collects IPs
      associated with domains and subdomains, helping map servers and exposed
      services during reconnaissance.
      <br />
      <span className="text-gray-400 text-sm">
        Example: Mapping servers before scanning with Nmap.
      </span>
    </li>
  </ul>
</section>


      {/* ===============================
    COMMANDS TABLE
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    theHarvester Commands (Kali Linux)
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-cyan-300">
        <tr>
          <th className="px-4 py-3 border border-gray-700 w-1/2">Command</th>
          <th className="px-4 py-3 border border-gray-700 w-1/2">Explanation (Beginner Friendly)</th>
        </tr>
      </thead>

      <tbody className="text-gray-300 leading-relaxed">

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -b google
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Uses <strong>Google search results</strong> to find emails,
            subdomains, and hosts related to the target domain.
            This is usually the <strong>first command beginners start with</strong>.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -b bing
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Collects information from <strong>Bing</strong>.
            Different search engines index different data, so this may reveal
            results Google misses.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -b duckduckgo
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Uses <strong>DuckDuckGo</strong> for OSINT collection.
            Useful for privacy-focused searches and alternative indexing.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -b all
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Queries <strong>all supported data sources</strong> at once.
            This gives maximum results but may take longer and require APIs.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -l 200 -b google
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Increases the number of search results collected.
            Useful when doing <strong>deeper reconnaissance</strong> on large
            organizations.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -f report.html
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Saves the output in an <strong>HTML report</strong>.
            Helpful for documentation, sharing results, or reviewing later.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -f report.xml
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Exports results in <strong>XML format</strong>,
            which is useful for importing into other security tools.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com --dns-brute
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Performs <strong>DNS brute-force</strong> using common subdomain names.
            Helps find hidden subdomains like dev, test, admin, etc.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -b shodan
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Uses the <strong>Shodan API</strong> to discover IP addresses,
            exposed servers, and services.
            Requires an API key.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -b censys
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Fetches data from <strong>Censys</strong>, mainly related to
            certificates, hosts, and infrastructure exposure.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -d example.com -b crtsh
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Extracts subdomains from <strong>SSL/TLS certificates</strong>.
            Very effective for finding hidden subdomains.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-mono">
            theHarvester -h
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Displays the <strong>help menu</strong> showing all available options
            and data sources. Useful when learning or revising commands.
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
    theHarvester should be used <strong>only for lawful reconnaissance
    and OSINT purposes</strong>. Collecting emails, subdomains, or
    personal information from targets without authorization or for
    malicious intent may violate privacy and cyber laws and can lead
    to serious legal consequences.
  </p>
</section>
    </div>
  );
}
