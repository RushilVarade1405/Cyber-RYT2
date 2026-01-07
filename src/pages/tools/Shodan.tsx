import { Link } from "react-router-dom";

export default function Shodan() {
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
        Shodan (Internet Exposure Search Engine)
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
          OSINT & Internet Scanning
        </span>
      </div>

      {/* ===============================
    WHAT IS SHODAN
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is Shodan?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Shodan</strong> is a unique and powerful <strong>search engine that focuses on
    devices connected to the internet</strong>, rather than websites.
    While traditional search engines like Google help you find web pages,
    Shodan helps you discover <strong>real systems and machines that are
    directly accessible online</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    These devices include <strong>servers, routers, firewalls, webcams,
    smart TVs, cloud systems, industrial machines, and IoT devices</strong>.
    If a device has a public IP address and is connected to the internet,
    there is a chance it can appear in Shodan’s search results.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    In simple words, Shodan allows you to see <strong>what is exposed on the
    internet</strong>. It shows which devices are online, which services they
    are running, and whether those services are <strong>secure or accidentally
    left open</strong>. This makes Shodan extremely useful for understanding
    real-world internet exposure.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Shodan works by continuously scanning IP addresses across the internet.
    When it finds an open service, it collects information known as a
    <strong>service banner</strong>. A banner often reveals details like the
    software name, version, configuration, and sometimes even warning messages
    from the system itself.
  </p>

  <ul className="list-disc list-inside text-gray-300 space-y-2">
    <li>Public IP addresses and internet-facing servers</li>
    <li>Open ports and the services running on them</li>
    <li>Software names, versions, and service banners</li>
    <li>Exposed webcams, routers, databases, and IoT devices</li>
  </ul>

  <p className="text-gray-300 leading-relaxed mt-4">
    Because Shodan only shows <strong>publicly accessible information</strong>,
    it is widely used by cybersecurity professionals, ethical hackers,
    students, and system administrators to understand exposure, detect risks,
    and improve security.
  </p>
</section>

      {/* ===============================
    WHY SHODAN IS IMPORTANT
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Why Shodan is Important?
  </h2>

  <ul className="list-disc list-inside text-gray-300 space-y-4 leading-relaxed">

    <li>
      <strong className="text-cyan-400">Shows Real Internet Exposure</strong>
      <br />
      Shodan shows exactly <strong>what parts of a network are visible to the public internet</strong>.
      Many organizations assume their systems are hidden, but Shodan reveals
      what anyone on the internet can actually see. This helps security teams,
      students, and administrators understand their <strong>true online footprint</strong>.
    </li>

    <li>
      <strong className="text-cyan-400">Identifies Misconfigured and Exposed Systems</strong>
      <br />
      A common security mistake is leaving services open without proper
      protection. Shodan helps uncover <strong>exposed databases, open admin panels,
      unsecured cameras, and forgotten test servers</strong>. Detecting these
      misconfigurations early can prevent serious data breaches.
    </li>

    <li>
      <strong className="text-cyan-400">Helps Prevent Real-World Attacks</strong>
      <br />
      Attackers often use Shodan to find easy targets. By using Shodan
      defensively, organizations can <strong>fix weaknesses before attackers
      exploit them</strong>. In this way, Shodan acts as an early warning system
      rather than a threat.
    </li>

    <li>
      <strong className="text-cyan-400">Useful for Both Red Teams and Blue Teams</strong>
      <br />
      Ethical hackers (red teams) use Shodan to perform reconnaissance and
      understand attack surfaces. Blue teams and defenders use it to
      <strong>audit their own infrastructure</strong>, verify firewall rules,
      and ensure sensitive services are not publicly accessible.
    </li>

    <li>
      <strong className="text-cyan-400">Essential Tool for OSINT and Learning</strong>
      <br />
      Shodan is a core tool in <strong>Open-Source Intelligence (OSINT)</strong>.
      It helps students and professionals learn how the internet actually works,
      how services are exposed, and why proper configuration and security
      hardening are critical in real-world environments.
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
      <strong className="text-cyan-400">Search by IP Address, Port, and Service</strong>
      <br />
      Shodan allows you to search for <strong>specific IP addresses, open ports,
      and running services</strong>. This means you can easily find systems
      running services such as web servers (HTTP/HTTPS), remote login services
      (SSH), file transfer services (FTP), and databases like MySQL or MongoDB.
      This feature is extremely helpful when analyzing <strong>internet-facing
      infrastructure</strong>.
    </li>

    <li>
      <strong className="text-cyan-400">Advanced and Powerful Search Filters</strong>
      <br />
      Shodan provides a wide range of filters that let you narrow down results
      based on <strong>location (country, city), organization name, port number,
      operating system, software, or service version</strong>. These filters
      help you focus only on the results that matter and avoid unnecessary noise.
    </li>

    <li>
      <strong className="text-cyan-400">Service Banner Grabbing</strong>
      <br />
      One of Shodan’s most important features is <strong>banner grabbing</strong>.
      When Shodan finds an open service, it collects the service’s response,
      which often reveals valuable details like the <strong>software name,
      version number, configuration settings, and security warnings</strong>.
      This information helps identify outdated or vulnerable systems.
    </li>

    <li>
      <strong className="text-cyan-400">Automation Through Shodan API</strong>
      <br />
      For advanced users, Shodan offers an <strong>API (Application Programming Interface)</strong>
      that allows searches to be automated and integrated into scripts or
      security tools. This is especially useful for <strong>large-scale asset
      monitoring, continuous security audits, and research</strong>.
      An API key is required to use this feature.
    </li>

  </ul>
</section>

      {/* ===============================
    WHAT SHODAN CAN REVEAL
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Shodan Can Reveal
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    One of the most powerful aspects of Shodan is the type of information it can
    reveal about internet-facing systems. Shodan does not just show that a
    device exists — it provides <strong>detailed technical insights</strong>
    that help understand how exposed or secure a system really is.
  </p>

  <ul className="list-disc list-inside text-gray-300 space-y-4 leading-relaxed">

    <li>
      <strong className="text-cyan-400">Internet-Facing Assets</strong>
      <br />
      Shodan helps identify <strong>servers, cloud instances, routers, cameras,
      and IoT devices</strong> that are publicly accessible. This is useful for
      creating an accurate inventory of online assets.
    </li>

    <li>
      <strong className="text-cyan-400">Open Ports and Active Services</strong>
      <br />
      It shows which <strong>ports are open</strong> and what services are
      running on them. Open ports often indicate potential entry points that
      need to be reviewed or secured.
    </li>

    <li>
      <strong className="text-cyan-400">Software and Version Information</strong>
      <br />
      Shodan reveals <strong>software names and version numbers</strong> from
      service banners. Outdated versions can indicate known vulnerabilities and
      security risks.
    </li>

    <li>
      <strong className="text-cyan-400">Security Misconfigurations</strong>
      <br />
      Many systems are exposed due to <strong>misconfigurations</strong>, such as
      default credentials, open admin panels, or unsecured databases. Shodan
      makes these issues visible so they can be fixed early.
    </li>

    <li>
      <strong className="text-cyan-400">Geographic and Organizational Details</strong>
      <br />
      Shodan can show the <strong>country, city, and organization</strong>
      associated with an IP address, helping analysts understand where systems
      are hosted and who may be responsible for them.
    </li>

  </ul>
</section>

      {/* ===============================
    SHODAN USAGE TIMELINE / CHECKLIST
=============================== */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-6 text-cyan-300">
    Steps to Use Shodan (Beginner Checklist)
  </h2>

  <p className="text-gray-300 leading-relaxed mb-8 max-w-3xl">
    Follow this simple step-by-step checklist to understand how beginners can
    use Shodan safely and effectively. Each step is designed to help you learn
    without confusion or risk.
  </p>

  <div className="space-y-8">

    {/* STEP 1 */}
    <div className="flex items-start gap-4">
      <span className="mt-1 w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0"></span>
      <div>
        <h3 className="text-lg font-semibold text-cyan-400">
          Step 1: Create a Shodan Account
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Start by creating a free Shodan account. This allows you to perform
          basic searches and explore publicly exposed systems. Beginners can
          learn a lot without needing a paid plan.
        </p>
      </div>
    </div>

    {/* STEP 2 */}
    <div className="flex items-start gap-4">
      <span className="mt-1 w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0"></span>
      <div>
        <h3 className="text-lg font-semibold text-cyan-400">
          Step 2: Decide What You Want to Find
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Before searching, clearly decide what you are looking for—such as a
          web server, database, camera, or cloud service. Having a clear goal
          prevents confusion and encourages responsible usage.
        </p>
      </div>
    </div>

    {/* STEP 3 */}
    <div className="flex items-start gap-4">
      <span className="mt-1 w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0"></span>
      <div>
        <h3 className="text-lg font-semibold text-cyan-400">
          Step 3: Start With Simple Searches
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Begin with simple keywords instead of complex filters. This helps you
          understand how Shodan results look and what kinds of devices appear
          on the internet.
        </p>
      </div>
    </div>

    {/* STEP 4 */}
    <div className="flex items-start gap-4">
      <span className="mt-1 w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0"></span>
      <div>
        <h3 className="text-lg font-semibold text-cyan-400">
          Step 4: Use Filters to Narrow Results
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Once you understand the results, apply filters like country, city,
          port number, or organization. Filters help reduce noise and focus
          on relevant data.
        </p>
      </div>
    </div>

    {/* STEP 5 */}
    <div className="flex items-start gap-4">
      <span className="mt-1 w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0"></span>
      <div>
        <h3 className="text-lg font-semibold text-cyan-400">
          Step 5: Review Device Details Carefully
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Clicking a result shows open ports, running services, software
          versions, and service banners. This information helps you understand
          how exposed or secure a system is.
        </p>
      </div>
    </div>

    {/* STEP 6 */}
    <div className="flex items-start gap-4">
      <span className="mt-1 w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0"></span>
      <div>
        <h3 className="text-lg font-semibold text-cyan-400">
          Step 6: Think Defensively, Not Offensively
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Use Shodan to analyze and learn, not to attack systems. Focus on
          understanding why devices are exposed and how security can be
          improved.
        </p>
      </div>
    </div>

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
    Shodan should be used <strong>only for lawful reconnaissance
    and security research purposes</strong>. Using Shodan to
    target, exploit, or access exposed systems without proper
    authorization is illegal and may violate cybercrime and
    privacy laws.
  </p>
</section>
    </div>
  );
}
