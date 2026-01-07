import { Link } from "react-router-dom";

export default function Bettercap() {
  return (
<div className="px-10 py-16 max-w-7xl mx-auto text-white">

      {/* ===============================
          BACK TO TOOLS LINK
      =============================== */}
      <Link
        to="/tools"
        className="inline-block mb-10 text-cyan-400 hover:underline"
      >
        ← Back to Tools
      </Link>

      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-5xl font-bold mb-4 text-cyan-400">
        Bettercap (Network Attack & Monitoring Framework)
      </h1>

      {/* ===============================
          BADGES & ICONS
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-16">
        <span className="px-3 py-1 text-sm rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
          Intermediate
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
          Advanced
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
          MITM Attacks
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30">
          Network Sniffing
        </span>
      </div>

 {/* ===============================
        WHAT IS BETTERCAP
=============================== */}
<section className="mb-20">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is Bettercap?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Bettercap</strong> is a modern, open-source, and highly modular
    <strong> network attack, monitoring, and traffic manipulation framework</strong>
    designed for real-time interaction with network communications.
    It provides security professionals with deep visibility into how data
    flows across wired and wireless networks.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    The primary goal of Bettercap is to perform
    <strong> Man-in-the-Middle (MITM) attacks</strong>, where the attacker
    transparently positions their system between communicating devices
    such as a client and a router. This allows interception, inspection,
    logging, and modification of network traffic without alerting the victim.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Unlike traditional network tools that focus on a single function,
    Bettercap follows a <strong>module-based architecture</strong>.
    Users can selectively enable modules for sniffing, spoofing,
    proxying, credential harvesting, network discovery, and protocol analysis,
    making the framework flexible and efficient for different attack scenarios.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Bettercap is widely used by
    <strong> ethical hackers</strong>,
    <strong> penetration testers</strong>,
    <strong> red team operators</strong>, and
    <strong> cybersecurity students</strong> during authorized security
    assessments, penetration testing labs, and controlled learning environments.
  </p>

  <p className="text-gray-300 leading-relaxed">
    The framework supports multiple technologies including
    <strong> Ethernet networks</strong>,
    <strong> Wi-Fi networks</strong>,
    <strong> Bluetooth Low Energy (BLE)</strong>, and
    <strong> HID (Human Interface Device) attack modules</strong>.
    This broad support makes Bettercap a versatile and powerful tool for
    testing modern network infrastructures across both wired and wireless
    attack surfaces.
  </p>
</section>

{/* ===============================
        WHAT BETTERCAP DOES
=============================== */}
<section className="mb-20">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Bettercap Does
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Bettercap is a powerful, modular network attack and monitoring framework
    that provides a wide range of capabilities for analyzing, intercepting,
    and manipulating network communications in real time during authorized
    security assessments.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-3">

    <li>
      <strong>Performs Man-in-the-Middle (MITM) Attacks:</strong><br />
      Uses techniques such as ARP spoofing to position the attacker between
      the victim device and the gateway, allowing interception and modification
      of network traffic without the victim’s awareness.
    </li>

    <li>
      <strong>Sniffs Live Network Traffic:</strong><br />
      Captures and analyzes real-time packets including DNS queries, HTTP
      requests, cookies, and other unencrypted data flowing through the network.
    </li>

    <li>
      <strong>Executes ARP and DNS Spoofing:</strong><br />
      Manipulates ARP tables and DNS responses to redirect traffic, impersonate
      legitimate services, or test network defenses against spoofing attacks.
    </li>

    <li>
      <strong>Intercepts and Modifies HTTP Traffic:</strong><br />
      Uses built-in proxy modules to inspect, alter, or inject content into HTTP
      requests and responses, helping identify insecure web communications.
    </li>

    <li>
      <strong>Discovers Devices and Services on the Network:</strong><br />
      Actively scans the local network to identify connected hosts, IP and MAC
      addresses, operating systems, vendors, and running services.
    </li>

    <li>
      <strong>Supports Wi-Fi, BLE, and HID Attacks:</strong><br />
      Extends beyond traditional Ethernet networks by supporting wireless
      attacks on Wi-Fi networks, Bluetooth Low Energy (BLE) scanning, and
      Human Interface Device (HID) attack modules.
    </li>

  </ul>
</section>

{/* ===============================
        USING BETTERCAP (STEP-BY-STEP)
=============================== */}
<section className="mb-24">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using Bettercap
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Bettercap is used through an interactive command-line interface and is
    designed for real-time network analysis and Man-in-the-Middle (MITM)
    attacks. The following steps describe a standard and authorized workflow
    used by ethical hackers and penetration testers.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-3">

    <li>
      <strong>Launch Bettercap with Root Privileges:</strong><br />
      Bettercap requires administrative access to interact with network
      interfaces, modify ARP tables, and capture packets.
      <br />
      Example:
      <code className="block mt-1 text-cyan-400">
        sudo bettercap
      </code>
    </li>

    <li>
      <strong>Select the Network Interface:</strong><br />
      Specify the interface you want to monitor or attack, such as Ethernet
      or Wi-Fi. Choosing the correct interface is essential for capturing
      the intended traffic.
      <br />
      Example:
      <code className="block mt-1 text-cyan-400">
        sudo bettercap -iface eth0
      </code>
    </li>

    <li>
      <strong>Discover Devices on the Network:</strong><br />
      Enable probing to identify all connected hosts, including routers,
      computers, mobile devices, and IoT systems.
      <br />
      Command:
      <code className="block mt-1 text-cyan-400">
        net.probe on
      </code>
    </li>

    <li>
      <strong>Enable Man-in-the-Middle (MITM) Positioning:</strong><br />
      Activate ARP spoofing to position your system between the victim
      and the gateway, allowing traffic interception.
      <br />
      Command:
      <code className="block mt-1 text-cyan-400">
        arp.spoof on
      </code>
    </li>

    <li>
      <strong>Sniff and Analyze Network Traffic:</strong><br />
      Enable packet sniffing to capture live traffic such as DNS requests,
      HTTP sessions, cookies, and other unencrypted communications.
      <br />
      Command:
      <code className="block mt-1 text-cyan-400">
        net.sniff on
      </code>
    </li>

    <li>
      <strong>Monitor, Test, and Record Findings:</strong><br />
      Observe real-time traffic output and document insecure protocols,
      data leaks, or misconfigurations discovered during testing.
    </li>

    <li>
      <strong>Disable Modules and Exit Safely:</strong><br />
      Always turn off active modules and exit Bettercap properly to restore
      normal network operation.
      <br />
      Example:
      <code className="block mt-1 text-cyan-400">
        arp.spoof off
      </code>
      <code className="block mt-1 text-cyan-400">
        quit
      </code>
    </li>

  </ol>
</section>

{/* ===============================
        WHY USE BETTERCAP ON LINUX
=============================== */}
<section className="mb-20">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Why Use Bettercap on Linux?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Bettercap is primarily designed for Linux-based operating systems because
    Linux provides direct, low-level control over networking components,
    making it ideal for packet sniffing, spoofing, and traffic manipulation.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-3">

    <li>
      <strong>Full Control Over Network Interfaces:</strong><br />
      Linux allows direct access to network interfaces, routing tables,
      and packet forwarding, which is essential for MITM attacks.
    </li>

    <li>
      <strong>Native Support for Packet Manipulation:</strong><br />
      Linux kernels support advanced networking features such as raw
      sockets, Netfilter, and iptables, all required by Bettercap.
    </li>

    <li>
      <strong>Pre-installed on Kali Linux:</strong><br />
      Bettercap comes pre-installed and pre-configured on
      <strong> Kali Linux</strong>, saving setup time and avoiding dependency
      issues.
    </li>

    <li>
      <strong>Superior Driver and Hardware Support:</strong><br />
      Linux provides better support for Ethernet and Wi-Fi adapters used
      in security testing, especially for monitor and promiscuous modes.
    </li>

    <li>
      <strong>Command-Line Efficiency:</strong><br />
      Bettercap is CLI-based, and Linux terminals allow fast execution,
      scripting, automation, and integration with other security tools.
    </li>

    <li>
      <strong>Industry Standard for Ethical Hacking:</strong><br />
      Most penetration testers and red team professionals use Linux,
      making it the standard platform for learning and professional use.
    </li>

  </ul>
</section>

{/* ===============================
        BETTERCAP COMMANDS TABLE
=============================== */}
<section className="mb-20">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Bettercap Commands
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-cyan-300">
        <tr>
          <th className="px-4 py-3 border border-gray-700">Command</th>
          <th className="px-4 py-3 border border-gray-700">Syntax</th>
          <th className="px-4 py-3 border border-gray-700">Short Explanation</th>
          <th className="px-4 py-3 border border-gray-700">Example</th>
        </tr>
      </thead>

      <tbody className="text-gray-300">

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">bettercap</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">bettercap</td>
          <td className="px-4 py-2 border border-gray-700">Start Bettercap</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">bettercap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-h</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">bettercap -h</td>
          <td className="px-4 py-2 border border-gray-700">Show help menu</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">bettercap -h</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-iface</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            bettercap -iface &lt;interface&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Select network interface</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            bettercap -iface wlan0
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-eval</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            bettercap -eval "&lt;cmd&gt;"
          </td>
          <td className="px-4 py-2 border border-gray-700">Run command on startup</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            bettercap -eval "net.probe on"
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-caplet</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            bettercap -caplet &lt;file&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Run caplet script</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            bettercap -caplet spoof.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.show</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.show</td>
          <td className="px-4 py-2 border border-gray-700">Show discovered hosts</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.show</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.probe on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.probe on</td>
          <td className="px-4 py-2 border border-gray-700">Scan network for hosts</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.probe on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.recon on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.recon on</td>
          <td className="px-4 py-2 border border-gray-700">Passive network discovery</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.recon on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.sniff on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.sniff on</td>
          <td className="px-4 py-2 border border-gray-700">Sniff network traffic</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.sniff on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.clear</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.clear</td>
          <td className="px-4 py-2 border border-gray-700">Clear discovered hosts</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">net.clear</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">arp.spoof on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">arp.spoof on</td>
          <td className="px-4 py-2 border border-gray-700">Enable ARP spoofing</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">arp.spoof on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">arp.spoof off</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">arp.spoof off</td>
          <td className="px-4 py-2 border border-gray-700">Disable ARP spoofing</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">arp.spoof off</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">arp.spoof.targets</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            arp.spoof.targets &lt;IP&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Set spoof targets</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            arp.spoof.targets 192.168.1.5
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            set arp.spoof.fullduplex true
          </td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            set arp.spoof.fullduplex true
          </td>
          <td className="px-4 py-2 border border-gray-700">Enable full duplex MITM</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            set arp.spoof.fullduplex true
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">dns.spoof on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">dns.spoof on</td>
          <td className="px-4 py-2 border border-gray-700">Enable DNS spoofing</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">dns.spoof on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">dns.spoof.domains</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            dns.spoof.domains &lt;domain&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Target specific domains</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            dns.spoof.domains google.com
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">http.proxy on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">http.proxy on</td>
          <td className="px-4 py-2 border border-gray-700">Enable HTTP proxy</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">http.proxy on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            http.proxy.sslstrip on
          </td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            http.proxy.sslstrip on
          </td>
          <td className="px-4 py-2 border border-gray-700">Enable SSL stripping</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            http.proxy.sslstrip on
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">https.proxy on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">https.proxy on</td>
          <td className="px-4 py-2 border border-gray-700">Enable HTTPS proxy</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">https.proxy on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            set http.proxy.port
          </td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            set http.proxy.port &lt;port&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Change proxy port</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            set http.proxy.port 8080
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            net.sniff.local on
          </td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            net.sniff.local on
          </td>
          <td className="px-4 py-2 border border-gray-700">Sniff local traffic</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            net.sniff.local on
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            net.sniff.output
          </td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            net.sniff.output &lt;file&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Save sniffed data</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            net.sniff.output sniff.pcap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">wifi.recon on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">wifi.recon on</td>
          <td className="px-4 py-2 border border-gray-700">Scan nearby Wi-Fi networks</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">wifi.recon on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">wifi.show</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">wifi.show</td>
          <td className="px-4 py-2 border border-gray-700">Show Wi-Fi APs</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">wifi.show</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">wifi.deauth</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            wifi.deauth &lt;BSSID&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Deauth Wi-Fi clients</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            wifi.deauth 00:11:22:33:44:55
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">ble.recon on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">ble.recon on</td>
          <td className="px-4 py-2 border border-gray-700">Scan Bluetooth devices</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">ble.recon on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">hid.keyboard on</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">hid.keyboard on</td>
          <td className="px-4 py-2 border border-gray-700">Enable HID keyboard mode</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">hid.keyboard on</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            events.stream on
          </td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            events.stream on
          </td>
          <td className="px-4 py-2 border border-gray-700">Live event monitoring</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            events.stream on
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">help</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">help</td>
          <td className="px-4 py-2 border border-gray-700">Show Bettercap help</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">help</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">quit</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">quit</td>
          <td className="px-4 py-2 border border-gray-700">Exit Bettercap</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">quit</td>
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

        <p className="text-gray-300 leading-relaxed mb-3">
          Bettercap must be used <strong>only on authorized networks</strong>.
          Unauthorized sniffing, spoofing, or interception is illegal.
        </p>

        <p className="text-gray-300 leading-relaxed">
          Use this tool strictly for <strong>ethical hacking</strong>,
          <strong> learning</strong>, and
          <strong> defensive security testing</strong>.
        </p>
      </section>

    </div>
  );
}