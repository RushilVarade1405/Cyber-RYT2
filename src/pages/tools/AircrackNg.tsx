import { Link } from "react-router-dom";

export default function AircrackNg() {
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
        Aircrack-ng (Wireless Security Auditing Tool)
      </h1>

      {/* ===============================
          BADGES & ICONS
      =============================== */}
      <div className="flex flex-wrap gap-3 mb-16">
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
          Wireless Security
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
          Wi-Fi Hacking
        </span>
      </div>

{/* ===============================
        WHAT IS AIRCRACK-NG
=============================== */}
<section className="mb-20">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What is Aircrack-ng?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Aircrack-ng</strong> is a powerful, open-source
    <strong> wireless network security auditing suite</strong> used to
    test, analyze, and assess the security of Wi-Fi networks.
    It is primarily designed to evaluate networks protected with
    <strong> WEP, WPA, and WPA2</strong> encryption standards.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Aircrack-ng operates by <strong>capturing wireless packets</strong>
    transmitted over the air and analyzing
    <strong> authentication handshakes</strong>.
    These handshakes are then used to identify weak passwords,
    outdated encryption methods, or improperly configured wireless
    security settings.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    Unlike simple Wi-Fi cracking tools, Aircrack-ng is a
    <strong> complete auditing framework</strong> that includes
    multiple utilities for enabling monitor mode, capturing traffic,
    injecting packets, performing deauthentication attacks, and
    cracking encryption keys using wordlists or brute-force techniques.
  </p>

  <p className="text-gray-300 leading-relaxed mb-4">
    The tool is widely used by
    <strong> ethical hackers</strong>,
    <strong> penetration testers</strong>,
    <strong> network administrators</strong>, and
    <strong> cybersecurity students</strong> to identify vulnerabilities
    before attackers can exploit them, helping organizations strengthen
    their wireless network defenses.
  </p>

  <p className="text-gray-300 leading-relaxed">
    <strong>Aircrack-ng is most commonly used on Linux-based systems</strong>,
    especially <strong>Kali Linux</strong>, where it is pre-installed
    and fully optimized for wireless penetration testing and security
    research.
  </p>
</section>

{/* ===============================
        WHAT AIRCRACK-NG DOES
=============================== */}
<section className="mb-20">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    What Does Aircrack-ng Do?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    Aircrack-ng is a comprehensive wireless security auditing suite used to
    test, analyze, and evaluate the strength of Wi-Fi network security.
    It helps identify vulnerabilities that could be exploited by attackers.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-3">

    <li>
      <strong>Enables Monitor Mode:</strong>  
      Switches wireless adapters into monitor mode, allowing the capture
      of all nearby Wi-Fi traffic.
    </li>

    <li>
      <strong>Captures WPA/WPA2 Handshakes:</strong>  
      Records authentication handshakes exchanged between clients and
      access points for security analysis.
    </li>

    <li>
      <strong>Performs Deauthentication Attacks:</strong>  
      Disconnects clients from access points to force reconnections and
      capture handshakes more effectively.
    </li>

    <li>
      <strong>Cracks Wi-Fi Passwords:</strong>  
      Uses captured handshakes with wordlists or brute-force methods to
      identify weak or easily guessable passwords.
    </li>

    <li>
      <strong>Analyzes Wireless Traffic & Encryption:</strong>  
      Examines encryption types, signal strength, and connected devices
      to evaluate overall wireless security.
    </li>

  </ul>
</section>

{/* ===============================
        USING AIRCRACK-NG IN KALI LINUX
=============================== */}
<section className="mb-24">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Using Aircrack-ng in Kali Linux (Step-by-Step)
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    The following steps describe a standard and authorized workflow for
    using <strong>Aircrack-ng</strong> in <strong>Kali Linux</strong> to audit
    wireless network security. These steps must be performed only on
    networks you own or have explicit permission to test.
  </p>

  <ol className="list-decimal list-inside text-gray-300 leading-relaxed space-y-3">

    <li>
      <strong>Step 1: Verify Wireless Adapter Compatibility</strong><br />
      Ensure that your wireless adapter supports
      <strong> monitor mode</strong> and
      <strong> packet injection</strong>. Many internal laptop adapters
      do not support these features.
    </li>

    <li>
      <strong>Step 2: Enable Monitor Mode</strong><br />
      Use <span className="font-mono">airmon-ng</span> to place the wireless
      interface into monitor mode. This allows the adapter to capture all
      nearby Wi-Fi traffic instead of only packets addressed to it.
    </li>

    <li>
      <strong>Step 3: Scan Nearby Wi-Fi Networks</strong><br />
      Run <span className="font-mono">airodump-ng</span> to list all nearby
      access points and connected clients. Note important details such as
      <strong> BSSID</strong>, <strong> channel</strong>, and
      <strong> encryption type</strong>.
    </li>

    <li>
      <strong>Step 4: Select the Target Network</strong><br />
      Choose the authorized target network and focus packet capture on
      its specific channel and BSSID to reduce noise and improve accuracy.
    </li>

    <li>
      <strong>Step 5: Capture WPA/WPA2 Handshake</strong><br />
      Start a targeted capture to collect the authentication handshake
      exchanged between the client and the access point. This handshake
      is required for password cracking attempts.
    </li>

    <li>
      <strong>Step 6: Perform Deauthentication (Optional)</strong><br />
      Use <span className="font-mono">aireplay-ng</span> to send
      deauthentication packets. This forces connected devices to reconnect,
      increasing the chance of capturing a valid handshake quickly.
    </li>

    <li>
      <strong>Step 7: Crack the Captured Handshake</strong><br />
      Run <span className="font-mono">aircrack-ng</span> with a wordlist to
      attempt password recovery. The success depends on password strength
      and the quality of the wordlist.
    </li>

    <li>
      <strong>Step 8: Analyze Results</strong><br />
      If the password is recovered, analyze why it was weak. If not, it
      indicates strong wireless security practices.
    </li>

    <li>
      <strong>Step 9: Disable Monitor Mode</strong><br />
      After completing the audit, stop monitor mode to restore the
      wireless adapter to managed mode.
    </li>

  </ol>
</section>

{/* ===============================
        WHY USE KALI LINUX FOR AIRCRACK-NG
=============================== */}
<section className="mb-20">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Why Use Kali Linux for Aircrack-ng?
  </h2>

  <p className="text-gray-300 leading-relaxed mb-4">
    <strong>Kali Linux</strong> is the preferred operating system for using
    Aircrack-ng because it is specifically designed for
    <strong> penetration testing</strong>,
    <strong> ethical hacking</strong>, and
    <strong> cybersecurity research</strong>.
  </p>

  <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-3">

    <li>
      <strong>Pre-installed Aircrack-ng Suite:</strong><br />
      Kali Linux comes with Aircrack-ng and its related tools already
      installed and properly configured, saving setup time.
    </li>

    <li>
      <strong>Excellent Driver & Adapter Support:</strong><br />
      Kali includes a wide range of wireless drivers that support
      monitor mode and packet injection, which are essential for
      Aircrack-ng operations.
    </li>

    <li>
      <strong>Optimized for Wireless Penetration Testing:</strong><br />
      The Linux kernel and network stack in Kali are optimized for
      low-level network operations required during wireless attacks.
    </li>

    <li>
      <strong>Powerful Command-Line Environment:</strong><br />
      Kali provides a robust terminal environment that allows seamless
      execution of Aircrack-ng commands and scripting automation.
    </li>

    <li>
      <strong>Integration with Other Security Tools:</strong><br />
      Kali Linux integrates Aircrack-ng with tools like
      Wireshark, Reaver, Hashcat, and Bettercap for advanced workflows.
    </li>

    <li>
      <strong>Industry Standard Platform:</strong><br />
      Kali Linux is widely used by cybersecurity professionals, making it
      the industry-standard platform for learning and performing wireless
      security audits.
    </li>

  </ul>
</section>

{/* ===============================
        AIRCRACK-NG COMMANDS TABLE
=============================== */}
<section className="mb-20">
  <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
    Aircrack-ng Commands Reference
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
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng [options] &lt;capture&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Launch aircrack-ng</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng capture.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-h</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -h</td>
          <td className="px-4 py-2 border border-gray-700">Show help menu</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -h</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-a 1</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -a 1 &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">WEP attack mode</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -a 1 wep.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-a 2</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -a 2 &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">WPA/WPA2 attack mode</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -a 2 wpa.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-w</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -w &lt;wordlist&gt; &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Dictionary attack</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng -w rockyou.txt wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-b</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -b &lt;BSSID&gt; &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Target specific AP</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng -b 00:11:22:33:44:55 wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-e</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -e &lt;ESSID&gt; &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Target AP by name</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng -e MyWiFi wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-l</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -l &lt;file&gt; &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Save key to file</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng -l key.txt wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-q</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -q &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Quiet mode</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -q wpa.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-K</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -K &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">KoreK WEP attack</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -K wep.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-Z</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -Z &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">PTW WEP attack</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -Z wep.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-s</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -s &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Disable PTW</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -s wep.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-M</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -M &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">WPA migration attack</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -M wpa.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-C</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -C &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">MCC attack</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -C wep.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-F</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -F &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Brute-force last WEP bytes</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -F wep.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-R</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -R &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Disable fake auth detection</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -R wep.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-i</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -i &lt;index&gt; &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Select network index</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng -i 1 capture.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">-o</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng -o &lt;file&gt; &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Output to file</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng -o output.txt wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--bssid</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng --bssid &lt;BSSID&gt; &lt;cap&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Long form of -b</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng --bssid 00:11:22:33:44:55 wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--essid</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng --essid &lt;ESSID&gt; &lt;cap&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Long form of -e</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng --essid MyWiFi wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--wordlist</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng --wordlist &lt;file&gt; &lt;cap&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Long form of -w</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng --wordlist rockyou.txt wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--ivs</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --ivs &lt;file&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Load IVS file</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --ivs capture.ivs</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--pcap</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --pcap &lt;file&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Load PCAP file</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --pcap capture.pcap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--hccap</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --hccap &lt;file&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Load hccap file</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --hccap hash.hccap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--hccapx</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --hccapx &lt;file&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Load hccapx file</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --hccapx hash.hccapx</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--key-file</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng --key-file &lt;file&gt; &lt;cap&gt;
          </td>
          <td className="px-4 py-2 border border-gray-700">Save recovered key</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">
            aircrack-ng --key-file key.txt wpa.cap
          </td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--quiet</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --quiet &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Suppress output</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --quiet wpa.cap</td>
        </tr>

        <tr>
          <td className="px-4 py-2 border border-gray-700 font-mono">--debug</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --debug &lt;cap&gt;</td>
          <td className="px-4 py-2 border border-gray-700">Debug mode</td>
          <td className="px-4 py-2 border border-gray-700 font-mono">aircrack-ng --debug wpa.cap</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

      {/* ===============================
          IMPORTANT NOTE (CARD)
      =============================== */}
      <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-red-400">
          ⚠ Legal & Ethical Warning
        </h2>

        <p className="text-gray-300 leading-relaxed">
          Use <strong>Aircrack-ng</strong> only on networks you own or have
          explicit permission to test. Unauthorized use is illegal.
        </p>
      </section>

    </div>
  );
}