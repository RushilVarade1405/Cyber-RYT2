import { Link } from "react-router-dom";

export default function Wireshark() {
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
        Wireshark (Network Protocol Analyzer)
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

        <span className="px-3 py-1 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
          Packet Analysis
        </span>
      </div>

      {/* ===============================
          WHAT IS WIRESHARK
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          What is Wireshark?
        </h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          <strong>Wireshark</strong> is a free and open-source network
          protocol analyzer used to capture, inspect, and analyze
          network traffic in real time. It allows users to view
          individual packets flowing through a network and understand
          how data is transmitted between systems.
        </p>

        <p className="text-gray-300 leading-relaxed">
          Wireshark is widely used by cybersecurity professionals,
          network engineers, penetration testers, SOC analysts, and
          students to troubleshoot network issues, investigate security
          incidents, and learn how network protocols work at a deep
          level.
        </p>
      </section>

      {/* ===============================
          WHY WIRESHARK IS IMPORTANT
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Why Wireshark is Important
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Provides full visibility into network traffic</li>
          <li>Helps detect malicious or suspicious activity</li>
          <li>Used for digital forensics and incident response</li>
          <li>Identifies unencrypted data and credential leaks</li>
          <li>Essential for learning networking and cybersecurity</li>
        </ul>
      </section>

      {/* ===============================
          KEY FEATURES
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Key Features
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Live packet capture from Ethernet, Wi-Fi, and Loopback</li>
          <li>Deep inspection of 1000+ network protocols</li>
          <li>Advanced capture and display filtering</li>
          <li>TCP stream reassembly and conversation tracking</li>
          <li>Protocol hierarchy and traffic statistics</li>
          <li>Export captured packets as PCAP files</li>
        </ul>
      </section>

      {/* ===============================
          COMMON PROTOCOLS
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Common Protocols You’ll See
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>TCP / UDP</li>
          <li>HTTP / HTTPS</li>
          <li>DNS</li>
          <li>ARP</li>
          <li>ICMP</li>
          <li>FTP / SMTP / DHCP</li>
        </ul>
      </section>

      {/* ===============================
          WIRESHARK COMMANDS & FILTERS
      =============================== */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          Wireshark Filters & Commands
        </h2>

        <p className="text-gray-300 mb-3 font-semibold">
          Capture Filters (Before Capture):
        </p>

        <pre className="bg-black border border-gray-700 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto mb-6">
{`tcp
udp
port 80
port 443
host 192.168.1.1`}
        </pre>

        <p className="text-gray-300 mb-3 font-semibold">
          Display Filters (After Capture):
        </p>

        <pre className="bg-black border border-gray-700 rounded-lg p-4 text-sm text-gray-200 overflow-x-auto">
{`http
dns
tcp.port == 443
ip.addr == 192.168.1.1
tcp.flags.syn == 1 && tcp.flags.ack == 0`}
        </pre>
      </section>

      {/* ===============================
    CYBERSECURITY USE CASES
=============================== */}
<section className="mb-12 max-w-5xl mx-auto">
  <h2 className="text-3xl font-semibold mb-6 text-cyan-300">
    Cybersecurity Use Cases
  </h2>

  <ul className="list-disc list-inside text-gray-300 space-y-3">
    <li>Password sniffing on unencrypted protocols</li>
    <li>Man-in-the-Middle (MITM) attack analysis</li>
    <li>ARP spoofing detection</li>
    <li>Malware traffic investigation</li>
    <li>Incident response and forensic analysis</li>
  </ul>
</section>

{/* ===============================
    LEGAL & ETHICAL WARNING
=============================== */}
<section className="max-w-5xl mx-auto">
  <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-3 text-red-400 flex items-center gap-2">
      ⚠ Legal & Ethical Warning
    </h3>

    <p className="text-gray-300 leading-relaxed">
      Wireshark should be used <strong>only on networks you own or have
      explicit permission to analyze</strong>. Capturing or inspecting
      network traffic without authorization may violate privacy and
      cyber laws and can result in serious legal consequences.
    </p>
  </div>
</section>
    </div>
  );
}
