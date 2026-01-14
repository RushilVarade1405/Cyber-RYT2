import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

/* ===============================
   TYPES
================================ */
type ToolCommand = {
  label: string;
  cmd: string;
};

type KaliTool = {
  name: string;
  description: string;
  commands: ToolCommand[];
};

type KaliCategory = {
  category: string;
  tools: KaliTool[];
};

/* ===============================
   KALI TOOLS DATA
================================ */
const kaliTools: KaliCategory[] = [
  {
    category: "Reconnaissance & Information Gathering",
    tools: [
      {
        name: "Nmap",
        description: "Network scanning and service enumeration",
        commands: [
          { label: "Ping Scan", cmd: "nmap -sn 192.168.1.0/24" },
          { label: "Port Scan", cmd: "nmap -p 1-65535 target" },
          { label: "Service Version Scan", cmd: "nmap -sV target" },
          { label: "OS Detection", cmd: "nmap -O target" },
          { label: "Aggressive Scan", cmd: "nmap -A target" },
          { label: "Traceroute", cmd: "nmap --traceroute target" },
        ],
      },
      {
        name: "Amass",
        description: "Attack surface and subdomain enumeration",
        commands: [
          { label: "Passive Enum", cmd: "amass enum -passive -d example.com" },
          { label: "Active Enum", cmd: "amass enum -active -d example.com" },
          { label: "ASN Lookup", cmd: "amass intel -asn 13335" },
          { label: "IP Discovery", cmd: "amass intel -ip -d example.com" },
          { label: "Save Output", cmd: "amass enum -d example.com -o domains.txt" },
        ],
      },
    ],
  },
  {
    category: "Web Application Attacks",
    tools: [
      {
        name: "SQLmap",
        description: "Automated SQL injection testing",
        commands: [
          { label: "Basic Scan", cmd: "sqlmap -u \"http://target?id=1\"" },
          { label: "List Databases", cmd: "sqlmap -u \"http://target?id=1\" --dbs" },
          { label: "List Tables", cmd: "sqlmap -u \"http://target?id=1\" -D db --tables" },
          { label: "Dump DB", cmd: "sqlmap -u \"http://target?id=1\" -D db --dump" },
          { label: "Batch Mode", cmd: "sqlmap -u \"http://target?id=1\" --batch" },
        ],
      },
      {
        name: "Dirsearch",
        description: "Directory and file brute forcing",
        commands: [
          { label: "Basic Scan", cmd: "dirsearch -u http://target" },
          { label: "With Extensions", cmd: "dirsearch -u http://target -e php,html,js" },
          { label: "Recursive Scan", cmd: "dirsearch -u http://target -r" },
          { label: "Custom Wordlist", cmd: "dirsearch -u http://target -w wordlist.txt" },
          { label: "Save Report", cmd: "dirsearch -u http://target --plain-text-report=out.txt" },
        ],
      },
    ],
  },
  {
    category: "Password Attacks",
    tools: [
      {
        name: "Hydra",
        description: "Online brute-force attack tool",
        commands: [
          { label: "SSH Attack", cmd: "hydra -l root -P pass.txt ssh://target" },
          { label: "FTP Attack", cmd: "hydra -L users.txt -P pass.txt ftp://target" },
          { label: "HTTP Login", cmd: "hydra -l admin -P pass.txt http-post-form \"/login.php:user=^USER^&pass=^PASS^:F=invalid\"" },
          { label: "RDP Attack", cmd: "hydra -L users.txt -P pass.txt rdp://target" },
          { label: "Verbose Mode", cmd: "hydra -V -l admin -P pass.txt ssh://target" },
        ],
      },
      {
        name: "John the Ripper",
        description: "Offline password cracking",
        commands: [
          { label: "Crack Hashes", cmd: "john hashes.txt" },
          { label: "Show Results", cmd: "john --show hashes.txt" },
          { label: "Wordlist Mode", cmd: "john --wordlist=rockyou.txt hashes.txt" },
          { label: "Incremental Mode", cmd: "john --incremental hashes.txt" },
          { label: "Specify Format", cmd: "john --format=md5 hashes.txt" },
        ],
      },
    ],
  },
  {
    category: "Wireless Attacks",
    tools: [
      {
        name: "Aircrack-ng",
        description: "Wireless security auditing",
        commands: [
          { label: "Monitor Mode", cmd: "airmon-ng start wlan0" },
          { label: "Capture Packets", cmd: "airodump-ng wlan0mon" },
          { label: "Target Capture", cmd: "airodump-ng -c 6 --bssid BSSID wlan0mon" },
          { label: "Deauth Attack", cmd: "aireplay-ng --deauth 10 -a BSSID wlan0mon" },
          { label: "Crack WPA", cmd: "aircrack-ng -w rockyou.txt capture.cap" },
        ],
      },
    ],
  },
  {
    category: "Exploitation Frameworks",
    tools: [
      {
        name: "Metasploit",
        description: "Advanced exploitation framework",
        commands: [
          { label: "Launch Console", cmd: "msfconsole" },
          { label: "Search Exploit", cmd: "search apache" },
          { label: "Use Exploit", cmd: "use exploit/windows/smb/ms17_010_eternalblue" },
          { label: "Set Target", cmd: "set RHOSTS target" },
          { label: "Run Exploit", cmd: "run" },
        ],
      },
    ],
  },
];

/* ===============================
   COMPONENT
================================ */
export default function Linuxtoolscmd() {
  const copyCommand = (cmd: string) => navigator.clipboard.writeText(cmd);

  return (
    <div className="px-10 py-12 max-w-7xl mx-auto text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🧰 Linux Tools & Commands</h1>
        <Link
          to="/linux"
          className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
        >
          ⬅ Back to Linux
        </Link>
      </div>

      <p className="text-gray-400 mb-10">
        Kali Linux tools with real-world command usage examples.
      </p>

      {/* TOOLS */}
      {kaliTools.map((section, i) => (
        <motion.div key={i} className="mb-12">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {section.category}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {section.tools.map((tool, j) => (
              <div
                key={j}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4"
              >
                <h3 className="font-semibold mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-400 mb-3">
                  {tool.description}
                </p>

                <div className="space-y-2">
                  {tool.commands.map((c, k) => (
                    <div
                      key={k}
                      className="flex justify-between items-center bg-black rounded px-3 py-2 text-sm font-mono"
                    >
                      <span className="truncate">
                        <span className="text-cyan-400 mr-2">
                          {c.label}:
                        </span>
                        {c.cmd}
                      </span>
                      <button
                        onClick={() => copyCommand(c.cmd)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* ===============================
          EDUCATIONAL & ETHICAL WARNING
      =============================== */}
      <div
        className="
          mt-24 p-6 rounded-2xl
          bg-gradient-to-r from-red-950/80 to-black/80
          border border-red-500/30
          shadow-[0_0_30px_rgba(239,68,68,0.25)]
        "
      >
        <h3 className="flex items-center gap-3 text-red-400 font-bold text-xl mb-3">
          ⚠️ Educational & Ethical Use Only
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed">
          All Linux and Kali Linux tools, commands, and examples on{" "}
          <span className="text-red-400 font-semibold">Cyber_World</span> are
          intended strictly for educational and ethical purposes. We do not
          promote illegal hacking, unauthorized access, or misuse of security
          tools.
          <br /><br />
          Users are solely responsible for ensuring they have{" "}
          <strong className="text-red-300">explicit authorization</strong>{" "}
          before testing any system and must comply with all applicable laws
          and ethical guidelines.
        </p>
      </div>
    </div>
  );
}
