import { Link } from "react-router-dom";

export default function Tcpdump() {
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
        TCPdump (Network Packet Analyzer)
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
        WHAT IS TCPDUMP
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is TCPdump?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>TCPdump</strong> is a powerful
    <strong> command-line based network packet capturing and analysis tool</strong>
    used to monitor, inspect, and troubleshoot network traffic in real time.
    It allows users to observe how data flows across a network at a very
    low (packet) level.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    TCPdump works by capturing individual packets as they pass through
    a network interface and displaying detailed information such as
    <strong> source IP address, destination IP address, port numbers,
    protocol type, TCP flags, timestamps, and packet size</strong>.
    This raw packet-level visibility makes it extremely valuable for
    understanding network behavior.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Because TCPdump operates entirely from the terminal,
    it is <strong>lightweight, fast, and efficient</strong>,
    making it ideal for use on servers, routers, cloud systems,
    and remote machines where graphical tools are not available.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    TCPdump is widely used by
    <strong> network engineers, SOC analysts, penetration testers,
    system administrators, and cybersecurity students</strong>
    for tasks such as diagnosing network problems,
    analyzing protocol behavior, detecting suspicious traffic,
    and verifying security configurations.
  </p>

  <p className="text-gray-300 leading-relaxed">
    TCPdump is a <strong>passive monitoring tool</strong>.
    It does not generate traffic or attack systems.
    It must only be used on networks you own or have
    <strong>explicit authorization</strong> to monitor,
    as unauthorized packet capture may violate privacy and cyber laws.
  </p>
</section>

      {/* ===============================
        HOW TCPDUMP WORKS
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    How TCPdump Works
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    TCPdump works by directly interacting with the network interface
    of an operating system to capture and analyze packets at a very
    low level. It observes network traffic before applications
    process the data.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-4">

    <li>
      <strong>Listens directly to a network interface:</strong><br />
      TCPdump attaches itself to a specific network interface
      (such as Ethernet, Wi-Fi, or loopback) and continuously listens
      for incoming and outgoing packets.
    </li>

    <li>
      <strong>Captures packets before applications process them:</strong><br />
      Packets are captured at the operating system level before
      browsers, servers, or applications read the data,
      allowing TCPdump to observe raw network communication.
    </li>

    <li>
      <strong>Uses filters to reduce unnecessary traffic:</strong><br />
      TCPdump applies capture filters (based on IP, port, or protocol)
      so only relevant packets are collected, reducing noise and
      improving analysis efficiency.
    </li>

    <li>
      <strong>Displays packet headers in real time:</strong><br />
      For each packet, TCPdump displays important header information
      such as source IP, destination IP, protocol type, ports,
      packet length, and flags.
    </li>

    <li>
      <strong>Can save packets into <code>.pcap</code> files:</strong><br />
      Captured packets can be saved into PCAP files, which allow
      offline analysis and can be opened later using tools
      like Wireshark for deeper inspection.
    </li>

  </ul>
</section>

      {/* ===============================
        WHAT TCPDUMP DOES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Does TCPdump Do?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    TCPdump is a network analysis tool that allows users to observe,
    capture, and study network communication at the packet level.
    It provides deep visibility into how data moves across a network.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-4">

    <li>
      <strong>Captures live network traffic:</strong><br />
      TCPdump listens directly on a network interface and captures
      packets in real time as they are sent and received.
      This helps users see actual network communication as it happens.
    </li>

    <li>
      <strong>Analyzes TCP, UDP, ICMP, DNS, and HTTP traffic:</strong><br />
      TCPdump identifies and displays different network protocols,
      allowing users to understand how applications communicate,
      how connections are established, and how data is transferred.
    </li>

    <li>
      <strong>Filters traffic by IP address, port, and protocol:</strong><br />
      TCPdump allows precise filtering so users can focus only on
      relevant traffic, such as a specific server, service, or protocol,
      reducing noise and improving analysis efficiency.
    </li>

    <li>
      <strong>Troubleshoots network failures and performance issues:</strong><br />
      By analyzing packets, TCPdump helps diagnose problems like
      connection timeouts, packet loss, slow responses, and
      misconfigured network services.
    </li>

    <li>
      <strong>Detects suspicious or malicious network activity:</strong><br />
      Security professionals use TCPdump to identify unusual traffic
      patterns, unauthorized connections, port scans, or potential
      attack attempts occurring on a network.
    </li>

  </ul>
</section>

      {/* ===============================
    STEP BY STEP USING TCPDUMP
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using TCPdump
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    This step-by-step guide explains how TCPdump is used in a real
    network analysis and troubleshooting workflow. These steps are
    beginner-friendly and reflect how network engineers and
    cybersecurity professionals use TCPdump in practice.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-5">

    <li>
      <strong>Open the Terminal:</strong><br />
      Launch a terminal window on your Linux system.
      TCPdump is a command-line tool and runs entirely from the terminal.
      <br />
      <span className="text-sm text-gray-400">
        Most TCPdump commands require sudo privileges.
      </span>
    </li>

    <li>
      <strong>Identify Available Network Interfaces:</strong><br />
      Run
      <code className="ml-1 text-cyan-400">tcpdump -D</code>
      to list all available network interfaces.
      <br />
      <span className="text-sm text-gray-400">
        Common interfaces include eth0 (Ethernet), wlan0 (Wi-Fi),
        and lo (loopback).
      </span>
    </li>

    <li>
      <strong>Select the Target Interface:</strong><br />
      Choose the interface you want to monitor and start capturing:
      <code className="ml-1 text-cyan-400">sudo tcpdump -i eth0</code>
      <br />
      <span className="text-sm text-gray-400">
        Replace eth0 with the correct interface name.
      </span>
    </li>

    <li>
      <strong>Observe Live Packet Output:</strong><br />
      Watch packets appear in real time showing
      source IP, destination IP, protocol, and ports.
      <br />
      <span className="text-sm text-gray-400">
        This raw output represents actual network communication.
      </span>
    </li>

    <li>
      <strong>Disable Name Resolution for Clarity:</strong><br />
      Run TCPdump with
      <code className="ml-1 text-cyan-400">-nn</code>
      to prevent DNS and port name resolution.
      <br />
      <span className="text-sm text-gray-400">
        This makes analysis faster and more precise.
      </span>
    </li>

    <li>
      <strong>Apply Basic Traffic Filters:</strong><br />
      Capture specific traffic, for example HTTP traffic:
      <code className="ml-1 text-cyan-400">sudo tcpdump port 80</code>
      <br />
      <span className="text-sm text-gray-400">
        Filters help reduce noise and focus on relevant packets.
      </span>
    </li>

    <li>
      <strong>Limit the Number of Packets:</strong><br />
      Capture a fixed number of packets using:
      <code className="ml-1 text-cyan-400">sudo tcpdump -c 20</code>
      <br />
      <span className="text-sm text-gray-400">
        Useful for quick testing and demonstrations.
      </span>
    </li>

    <li>
      <strong>Save Captured Traffic to a File:</strong><br />
      Store packets in a file for later analysis:
      <code className="ml-1 text-cyan-400">sudo tcpdump -w capture.pcap</code>
      <br />
      <span className="text-sm text-gray-400">
        PCAP files can be opened in Wireshark.
      </span>
    </li>

    <li>
      <strong>Analyze Saved Packet Files:</strong><br />
      Read a previously saved capture file:
      <code className="ml-1 text-cyan-400">tcpdump -r capture.pcap</code>
      <br />
      <span className="text-sm text-gray-400">
        This allows offline packet analysis without live traffic.
      </span>
    </li>

    <li>
      <strong>Stop the Capture Safely:</strong><br />
      Press
      <strong> Ctrl + C</strong>
      to stop packet capturing.
      <br />
      <span className="text-sm text-gray-400">
        TCPdump displays a summary of captured packets when stopped.
      </span>
    </li>

    <li>
      <strong>Interpret the Results:</strong><br />
      Review packet details to identify network issues,
      suspicious activity, or protocol behavior.
      <br />
      <span className="text-sm text-gray-400">
        This step is critical for troubleshooting and security analysis.
      </span>
    </li>

  </ol>
</section>

      {/* ===============================
    CORE TCPDUMP FEATURES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Core TCPdump Features
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    TCPdump provides several core features that allow users to capture,
    filter, and analyze network traffic directly from the command line.
    Each feature focuses on understanding network behavior at the packet level.
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

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Packet Capture
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Captures live network packets directly from a network interface,
            allowing users to observe real-time communication between systems.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Protocol Analysis
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Identifies and displays network protocols such as TCP, UDP,
            ICMP, ARP, DNS, HTTP, and HTTPS to understand how data flows
            across the network.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Traffic Filtering
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Uses powerful filtering expressions to capture specific traffic
            based on IP addresses, ports, protocols, or packet direction.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Interface Selection
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Allows users to choose which network interface to monitor,
            such as Ethernet, Wi-Fi, or virtual interfaces.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Packet Capture Files
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Saves captured packets in PCAP format for later analysis
            using tools like Wireshark.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Lightweight & Fast
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Operates efficiently in terminal environments with minimal
            system resource usage, making it ideal for servers and remote systems.
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
    TCPdump should be used <strong>only on networks you own or have
    explicit permission to monitor</strong>. Unauthorized packet
    capturing, traffic interception, or network monitoring may
    violate privacy laws and can result in serious legal consequences.
  </p>
</section>
    </div>
  );
}
