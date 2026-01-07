import { Link } from "react-router-dom";

export default function Maltego() {
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
        Maltego (OSINT & Link Analysis Tool)
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
          OSINT
        </span>
      </div>

      {/* ===============================
    WHAT IS MALTEGO
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is Maltego?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Maltego</strong> is a powerful
    <strong> Open-Source Intelligence (OSINT) and link analysis tool</strong>
    designed to collect, correlate, and visualize relationships between
    various digital entities such as domains, IP addresses, email addresses,
    people, organizations, social media profiles, and online infrastructure.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Instead of displaying raw intelligence as plain text, Maltego converts
    publicly available data into
    <strong> interactive, graph-based visualizations</strong>.
    These graphs allow analysts to clearly observe connections, patterns,
    and hidden relationships that are often missed using traditional
    command-line or text-based tools.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Maltego operates primarily as a
    <strong> passive intelligence-gathering tool</strong>, meaning it collects
    information from open and legal sources without actively attacking or
    interacting with target systems. This makes it ideal for reconnaissance,
    investigation, and research-focused tasks.
  </p>

  <p className="text-gray-300 leading-relaxed">
    Due to its visual analysis capabilities and automation features,
    Maltego is widely used by
    <strong> cybersecurity professionals, penetration testers,
    digital forensic investigators, threat intelligence analysts,
    journalists, and academic researchers</strong>
    for OSINT investigations, cybercrime analysis, and intelligence reporting.
  </p>
</section>

     {/* ===============================
    HOW MALTEGO WORKS
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    How Maltego Works
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    Maltego works by collecting publicly available intelligence
    from multiple sources and transforming it into a visual
    relationship graph. Instead of presenting raw data in text
    form, Maltego focuses on link analysis to help investigators
    clearly understand how entities are connected.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-5">

    <li>
      <strong>Entities (Data Objects):</strong><br />
      Entities represent real-world digital or physical objects
      such as domains, IP addresses, email addresses, people,
      companies, phone numbers, and social media profiles.
      Each entity type has predefined properties and compatible
      transforms.
    </li>

    <li>
      <strong>Transforms (Data Collection Actions):</strong><br />
      Transforms are automated queries that gather intelligence
      from OSINT sources including DNS records, WHOIS databases,
      certificate logs, breach repositories, search engines,
      APIs, and social platforms.
      <br />
      <span className="text-sm text-gray-400">
        One transform can discover multiple related entities.
      </span>
    </li>

    <li>
      <strong>Graph-Based Visualization:</strong><br />
      The results of transforms are displayed as an interactive
      graph using nodes (entities) and edges (relationships).
      This visual format allows users to quickly identify
      patterns, clusters, and hidden connections.
    </li>

    <li>
      <strong>Machines (Automated Workflows):</strong><br />
      Machines are predefined sequences of transforms designed
      to automate common investigation tasks such as
      infrastructure mapping, phishing analysis, or identity
      expansion.
      <br />
      <span className="text-sm text-gray-400">
        Machines save time and reduce human error.
      </span>
    </li>

    <li>
      <strong>Incremental Expansion:</strong><br />
      Investigations grow step by step as users run additional
      transforms on newly discovered entities, allowing deeper
      intelligence gathering without overwhelming the analyst.
    </li>

    <li>
      <strong>User-Controlled Analysis:</strong><br />
      Analysts remain in full control of which transforms are
      executed, which entities are expanded, and how the graph
      is refined, ensuring ethical and targeted investigations.
    </li>

  </ul>
</section>

     {/* ===============================
    WHAT MALTEGO DOES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Does Maltego Do?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    Maltego is designed to collect, correlate, and visualize
    Open-Source Intelligence (OSINT) data. It helps investigators
    understand complex digital relationships by turning scattered
    public information into structured, visual intelligence.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-5">

    <li>
      <strong>Performs Passive OSINT Investigations:</strong><br />
      Maltego gathers intelligence exclusively from publicly
      available sources without actively interacting with or
      attacking target systems, making it suitable for
      reconnaissance and research-based investigations.
    </li>

    <li>
      <strong>Discovers Relationships Between Digital Entities:</strong><br />
      It identifies both direct and indirect links between
      domains, IP addresses, email addresses, people,
      organizations, phone numbers, and social media profiles.
    </li>

    <li>
      <strong>Maps Network and Domain Infrastructure:</strong><br />
      Maltego reveals hosting providers, DNS records,
      subdomains, SSL certificates, and server relationships
      to help analysts understand how digital infrastructure
      is structured and interconnected.
    </li>

    <li>
      <strong>Analyzes Social Media and Online Identities:</strong><br />
      It assists in tracking usernames, aliases, and digital
      footprints across multiple platforms, which is valuable
      in identity attribution and social engineering research.
    </li>

    <li>
      <strong>Supports Threat Intelligence & Cybercrime Analysis:</strong><br />
      Maltego is used to investigate phishing campaigns,
      malware infrastructure, fraud networks, and cybercriminal
      activities by correlating multiple data points into
      actionable intelligence.
    </li>

    <li>
      <strong>Enhances Decision-Making Through Visualization:</strong><br />
      By presenting data as interactive graphs, Maltego enables
      analysts to quickly identify patterns, clusters, and
      anomalies that would otherwise be difficult to detect.
    </li>

    <li>
      <strong>Improves Investigation Efficiency:</strong><br />
      Automated transforms and machines significantly reduce
      manual research time, allowing analysts to focus on
      interpretation and analysis rather than data collection.
    </li>

  </ul>
</section>

      {/* ===============================
    STEP BY STEP USING MALTEGO
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using Maltego
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    This step-by-step guide explains how Maltego is typically used to
    perform an OSINT investigation, from initial setup to exporting
    intelligence results. The workflow is suitable for beginners
    and reflects real-world investigative practices.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-6">

    <li>
      <strong>Install Maltego:</strong><br />
      Download and install Maltego on your preferred operating system
      (Linux, Windows, or macOS). Kali Linux usually includes Maltego
      by default.
      <br />
      <span className="text-sm text-gray-400">
        Ensure your system meets minimum hardware and Java requirements.
      </span>
    </li>

    <li>
      <strong>Create and Log In to a Maltego Account:</strong><br />
      Launch Maltego and sign in using a Maltego account. An account is
      required to access transforms and data sources.
      <br />
      <span className="text-sm text-gray-400">
        Community Edition is suitable for learning and practice.
      </span>
    </li>

    <li>
      <strong>Create a New Graph:</strong><br />
      Start a new blank graph, which serves as the workspace for your
      investigation. All entities and relationships will appear here.
    </li>

    <li>
      <strong>Add an Initial Entity:</strong><br />
      Drag and drop an entity such as a Domain, IP Address, Email,
      Person, or Company onto the graph. This entity acts as the
      starting point of the investigation.
      <br />
      <span className="text-sm text-gray-400">
        Example: Add a domain name to begin infrastructure mapping.
      </span>
    </li>

    <li>
      <strong>Select and Run Transforms:</strong><br />
      Right-click the entity and choose relevant transforms to gather
      intelligence. Transforms automatically query OSINT sources
      and generate related entities.
      <br />
      <span className="text-sm text-gray-400">
        Results appear as connected nodes on the graph.
      </span>
    </li>

    <li>
      <strong>Expand the Investigation:</strong><br />
      Run additional transforms on newly discovered entities to
      expand the graph. This helps uncover deeper relationships
      and hidden connections.
    </li>

    <li>
      <strong>Use Machines for Automation (Optional):</strong><br />
      Execute machines to automatically run multiple transforms
      in sequence. This is useful for large-scale or repetitive
      investigations.
    </li>

    <li>
      <strong>Analyze the Graph:</strong><br />
      Examine links, clusters, and patterns within the graph to
      identify meaningful relationships, anomalies, or points
      of interest.
      <br />
      <span className="text-sm text-gray-400">
        Visual analysis is Maltego’s core strength.
      </span>
    </li>

    <li>
      <strong>Organize and Refine Data:</strong><br />
      Group entities, label connections, remove noise, and
      focus on relevant findings to improve clarity.
    </li>

    <li>
      <strong>Export Results:</strong><br />
      Export graphs, screenshots, or reports in formats such as
      PDF, image, or CSV for documentation and sharing.
    </li>

    <li>
      <strong>Document Findings:</strong><br />
      Record conclusions, observations, and evidence gathered
      during the investigation for reporting or further analysis.
    </li>

  </ol>
</section>

      {/* ===============================
    CORE MALTEGO FEATURES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Core Maltego Features
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    Maltego offers a rich set of features designed to support deep
    Open-Source Intelligence (OSINT) investigations and visual
    link analysis. These features allow investigators to collect,
    correlate, and analyze large amounts of publicly available data
    efficiently.
  </p>

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
            Transforms
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Transforms are automated queries that retrieve intelligence
            from OSINT sources such as DNS records, WHOIS databases,
            search engines, breach repositories, and social platforms.
            Each transform takes one entity (for example, a domain or
            email address) and discovers related entities automatically,
            significantly reducing manual research effort.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Graph Visualization
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Maltego presents investigation results as interactive graphs
            using nodes and links. This visual representation allows
            investigators to quickly identify relationships, clusters,
            patterns, and anomalies that are difficult to detect in
            text-based outputs.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Machines
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Machines are predefined automation workflows that run
            multiple transforms in a specific sequence. They are
            designed for common investigation scenarios such as
            infrastructure mapping, phishing analysis, or social
            network expansion, making large-scale investigations
            faster and more consistent.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            OSINT Data Sources
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Maltego integrates with numerous public and commercial
            OSINT sources including DNS servers, WHOIS registries,
            certificate transparency logs, social media platforms,
            breach datasets, and threat intelligence feeds to enrich
            investigation results.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Entity Modeling
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Entities represent real-world objects such as domains,
            IP addresses, email addresses, people, companies, phone
            numbers, and social profiles. Each entity type has specific
            properties and compatible transforms, ensuring accurate
            and structured investigations.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Link Analysis
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Maltego specializes in link analysis by correlating multiple
            data points to reveal direct and indirect relationships.
            This capability is especially valuable in cybercrime
            investigations, fraud analysis, and threat actor profiling.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Custom Transforms
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Advanced users can create custom transforms using APIs or
            scripts to integrate proprietary data sources, internal
            databases, or specialized intelligence feeds into Maltego,
            extending its capabilities beyond default datasets.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Export & Reporting
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Investigation results can be exported as images, PDFs,
            CSV files, or reports. This allows analysts to document
            findings, share intelligence with teams, and present
            evidence in a clear and professional format.
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</section>

      {/* ===============================
    IMPORTANT NOTE
=============================== */}
<section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-10">
  <h2 className="text-xl font-semibold mb-3 text-red-400">
    ⚠ Legal & Ethical Warning
  </h2>

  <p className="text-gray-300 leading-relaxed mb-2">
    <strong>Maltego</strong> should be used <strong>only for lawful
    Open-Source Intelligence (OSINT) investigations and analysis</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed mb-2">
    Collecting, correlating, or analyzing personal or organizational
    data without proper authorization may violate
    <strong> privacy laws and regulations</strong>.
  </p>

  <p className="text-gray-300 leading-relaxed">
    This tool is intended strictly for
    <strong> ethical hacking, digital investigations, threat analysis,
    and cybersecurity education</strong>.
  </p>
</section>

    </div>
  );
}