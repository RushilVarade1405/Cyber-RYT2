import { Link } from "react-router-dom";

export default function Netcat() {
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
        Netcat (Network Utility Tool)
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
          Networking
        </span>
      </div>

      {/* ===============================
    WHAT IS NETCAT
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is Netcat?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Netcat (nc)</strong> is a powerful and flexible
    <strong> command-line based networking utility</strong> that allows
    users to read from and write to network connections using
    <strong> TCP (Transmission Control Protocol) and UDP (User Datagram Protocol)</strong>.
    It provides direct access to network communication at a low level.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Netcat is often referred to as the
    <strong> "Swiss Army Knife of Networking"</strong> because it can
    perform a wide variety of networking tasks such as
    port scanning, file transfers, banner grabbing,
    service testing, and remote shell creation using a single tool.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    One of Netcat’s most powerful features is its ability to operate as
    both a <strong>client</strong> and a <strong>server</strong>.
    This means it can either initiate connections to remote systems
    or listen on a local port for incoming connections, making it
    extremely versatile for testing and troubleshooting.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Unlike high-level networking tools that follow strict protocol rules,
    Netcat is <strong>protocol-agnostic</strong>. It sends and receives
    raw data without modifying or interpreting it, giving users complete
    control over what is transmitted across the network.
  </p>

  <p className="text-gray-300 leading-relaxed">
    Due to its simplicity, flexibility, and power, Netcat is widely used by
    <strong> network engineers, system administrators,
    penetration testers, ethical hackers, and cybersecurity students</strong>
    for learning networking fundamentals, debugging services,
    and performing security assessments in authorized environments.
  </p>
</section>

     {/* ===============================
    HOW NETCAT WORKS
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    How Netcat Works
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    Netcat works by creating direct network connections using standard
    transport-layer protocols. Instead of relying on predefined application
    logic, Netcat sends and receives raw data, giving users complete control
    over network communication.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-5">

    <li>
      <strong>Creates Network Sockets:</strong><br />
      Netcat opens TCP or UDP sockets using the operating system’s networking
      stack. These sockets act as endpoints that allow two systems to exchange
      data over a network connection.
      <br />
      <span className="text-sm text-gray-400">
        This occurs at the transport layer (Layer 4).
      </span>
    </li>

    <li>
      <strong>Operates in Client or Server Mode:</strong><br />
      Netcat can either initiate a connection to a remote host (client mode)
      or listen for incoming connections on a specific port (server mode).
      This flexibility allows it to simulate both sides of communication.
    </li>

    <li>
      <strong>Establishes the Network Connection:</strong><br />
      In TCP mode, Netcat performs a standard three-way handshake before
      communication begins. In UDP mode, it sends datagrams without
      establishing a formal connection.
    </li>

    <li>
      <strong>Transfers Raw Data Streams:</strong><br />
      Netcat sends any input received from the keyboard, files, or other
      programs directly across the network without modification or encryption.
      <br />
      <span className="text-sm text-gray-400">
        This makes Netcat protocol-agnostic.
      </span>
    </li>

    <li>
      <strong>Receives and Displays Data Instantly:</strong><br />
      Any data received from the remote system is immediately printed to the
      terminal, allowing users to observe responses in real time.
    </li>

    <li>
      <strong>Terminates on User Command:</strong><br />
      Netcat continues running until the connection closes or the user
      manually stops it using <strong>Ctrl + C</strong>.
    </li>

  </ul>
</section>

     {/* ===============================
    WHAT NETCAT DOES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Does Netcat Do?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    Netcat is a versatile networking tool that enables direct interaction
    with network connections. It allows users to create, test, and analyze
    network communication at a low level, making it highly valuable for
    troubleshooting and cybersecurity operations.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-5">

    <li>
      <strong>Establishes TCP and UDP Connections:</strong><br />
      Netcat can initiate outgoing connections or listen for incoming
      connections using both TCP and UDP protocols. This allows users to
      test network connectivity and communication paths between systems.
    </li>

    <li>
      <strong>Performs Basic Port Scanning:</strong><br />
      Netcat can be used to check whether specific ports are open or closed
      on a target system. This helps identify running services and verify
      firewall rules during network reconnaissance.
    </li>

    <li>
      <strong>Transfers Files Between Systems:</strong><br />
      By redirecting standard input and output, Netcat enables simple and
      fast file transfers between two machines without requiring advanced
      file transfer protocols or services.
    </li>

    <li>
      <strong>Tests Network Services and Firewalls:</strong><br />
      Netcat allows users to manually connect to services such as HTTP,
      FTP, SMTP, or SSH to test whether they are reachable and responding
      correctly. This is useful for debugging services and firewall
      configurations.
    </li>

    <li>
      <strong>Creates Reverse and Bind Shells:</strong><br />
      Netcat can provide remote command-line access by creating reverse
      or bind shells. These techniques are widely used in penetration
      testing environments to simulate real-world attack scenarios.
      <br />
      <span className="text-sm text-gray-400">
        Use only in authorized labs and environments.
      </span>
    </li>

    <li>
      <strong>Performs Banner Grabbing:</strong><br />
      Netcat can retrieve service banners that reveal information such
      as software type and version. This information is valuable during
      reconnaissance and vulnerability assessment phases.
    </li>

  </ul>
</section>

      {/* ===============================
    STEP BY STEP USING NETCAT
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Step-by-Step Using Netcat
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    This step-by-step guide demonstrates how Netcat is commonly used to
    establish network connections, exchange data, and test services.
    The workflow shown below reflects real-world usage by students,
    administrators, and penetration testers.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-6">

    <li>
      <strong>Open the Terminal:</strong><br />
      Launch a terminal window on your Linux system.
      Netcat is a command-line tool and does not provide a graphical interface.
      <br />
      <span className="text-sm text-gray-400">
        Ensure Netcat is installed before proceeding.
      </span>
    </li>

    <li>
      <strong>Verify Netcat Installation:</strong><br />
      Run the following command to confirm Netcat is available:
      <br />
      <code className="text-cyan-400">nc -h</code>
      <br />
      <span className="text-sm text-gray-400">
        This displays help options and confirms Netcat is properly installed.
      </span>
    </li>

    <li>
      <strong>Understand the Basic Syntax:</strong><br />
      Netcat generally follows this format:
      <br />
      <code className="text-cyan-400">nc [options] target_ip port</code>
      <br />
      <span className="text-sm text-gray-400">
        Options control behavior such as listening mode, verbosity, and protocol.
      </span>
    </li>

    <li>
      <strong>Start Netcat in Listening Mode:</strong><br />
      Open a listening port on the local system:
      <br />
      <code className="text-cyan-400">nc -lvp 4444</code>
      <br />
      <span className="text-sm text-gray-400">
        -l = listen, -v = verbose, -p = specify port.
      </span>
    </li>

    <li>
      <strong>Wait for Incoming Connections:</strong><br />
      Once started, Netcat waits silently until another system connects.
      This system now behaves like a server.
      <br />
      <span className="text-sm text-gray-400">
        Any incoming data will be displayed instantly.
      </span>
    </li>

    <li>
      <strong>Connect from Another System:</strong><br />
      From a second machine, connect to the listener:
      <br />
      <code className="text-cyan-400">nc target_ip 4444</code>
      <br />
      <span className="text-sm text-gray-400">
        This system now behaves as a client.
      </span>
    </li>

    <li>
      <strong>Exchange Data Between Systems:</strong><br />
      Anything typed on either side is transmitted in real time.
      This demonstrates raw TCP communication without encryption.
      <br />
      <span className="text-sm text-gray-400">
        Useful for testing connectivity and understanding sockets.
      </span>
    </li>

    <li>
      <strong>Test Service Responses (Optional):</strong><br />
      Netcat can be used to interact with services such as HTTP or FTP
      by manually sending protocol commands.
      <br />
      <span className="text-sm text-gray-400">
        This helps in debugging and banner grabbing.
      </span>
    </li>

    <li>
      <strong>Terminate the Connection Safely:</strong><br />
      Press <strong>Ctrl + C</strong> to stop Netcat on either system.
      <br />
      <span className="text-sm text-gray-400">
        The connection closes immediately.
      </span>
    </li>

    <li>
      <strong>Analyze the Results:</strong><br />
      Review how data flowed between systems and note response behavior,
      delays, or connection failures.
      <br />
      <span className="text-sm text-gray-400">
        This analysis is key for troubleshooting and security testing.
      </span>
    </li>

  </ol>
</section>

      {/* ===============================
    CORE NETCAT FEATURES
=============================== */}
<section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Core Netcat Features
  </h2>

  <p className="text-gray-300 leading-relaxed mb-6">
    Netcat provides a wide range of networking capabilities that make it
    one of the most versatile tools in cybersecurity. Each feature allows
    users to interact directly with network connections at a low level,
    helping in testing, troubleshooting, and penetration testing.
  </p>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-cyan-300">
        <tr>
          <th className="px-4 py-3 border border-gray-700 w-1/4">
            Feature
          </th>
          <th className="px-4 py-3 border border-gray-700 w-3/4">
            Purpose & Explanation
          </th>
        </tr>
      </thead>

      <tbody className="text-gray-300 leading-relaxed">

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Port Scanning
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Netcat can be used to check whether specific TCP or UDP ports
            are open on a target system. This helps identify running
            services and test firewall rules.
            <br />
            <span className="text-sm text-gray-400">
              Example: <code>nc -zv target_ip 1-1000</code>
            </span>
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            File Transfer
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Netcat allows simple file transfer between two systems by
            redirecting input and output streams. It is commonly used
            when secure file transfer tools are unavailable.
            <br />
            <span className="text-sm text-gray-400">
              Sender and receiver communicate directly over a network port.
            </span>
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Banner Grabbing
          </td>
          <td className="px-4 py-3 border border-gray-700">
            By connecting to a service port, Netcat can retrieve service
            banners that reveal application type, version, or protocol
            information. This is useful during reconnaissance.
            <br />
            <span className="text-sm text-gray-400">
              Example: <code>nc target_ip 80</code>
            </span>
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Reverse Shell
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Netcat can create reverse shells where the target system
            connects back to the attacker and provides command-line
            access. This technique is widely used in penetration testing labs.
            <br />
            <span className="text-sm text-gray-400">
              High-risk feature — use only with authorization.
            </span>
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Bind Shell
          </td>
          <td className="px-4 py-3 border border-gray-700">
            In a bind shell, the target system opens a listening port and
            binds a command shell to it. When a remote user connects,
            they gain shell access to the system.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Chat & Messaging
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Netcat can be used to create simple real-time chat sessions
            between two systems, making it useful for learning how
            TCP communication works.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Protocol Testing
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Netcat can manually interact with protocols such as HTTP,
            FTP, SMTP, and DNS by sending raw commands, helping in
            debugging and learning protocol behavior.
          </td>
        </tr>

        <tr>
          <td className="px-4 py-3 border border-gray-700 font-semibold">
            Lightweight & Fast
          </td>
          <td className="px-4 py-3 border border-gray-700">
            Netcat is extremely lightweight and consumes minimal system
            resources, making it ideal for servers, embedded systems,
            and remote environments.
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
    Netcat should be used <strong>only on systems you own or have
    explicit permission to test</strong>. Misusing Netcat for
    unauthorized access, data interception, or network attacks
    is illegal and may lead to serious legal consequences.
  </p>
</section>
    </div>
  );
}
