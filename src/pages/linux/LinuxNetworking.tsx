import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

/* ===============================
   ANIMATIONS
================================ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/* ===============================
   TYPES
================================ */
type Command = {
  name: string;
  syntax: string;
  description: string;
  example?: string;
};

/* ===============================
   NETWORKING COMMANDS DATA
================================ */
const networkingCommands: Command[] = [
  /* ===== BASIC ===== */
  {
    name: "ip",
    syntax: "ip addr | ip route | ip link",
    description:
      "Modern command to manage IP addresses, routes, and network interfaces.",
    example: "ip addr show",
  },
  {
    name: "ifconfig",
    syntax: "ifconfig [interface]",
    description:
      "Displays or configures network interfaces (legacy).",
    example: "ifconfig eth0",
  },
  {
    name: "ping",
    syntax: "ping <host>",
    description:
      "Checks connectivity between your system and a remote host.",
    example: "ping google.com",
  },
  {
    name: "hostname",
    syntax: "hostname | hostname -I",
    description:
      "Shows or sets the system hostname and IP address.",
    example: "hostname -I",
  },

  /* ===== ROUTING ===== */
  {
    name: "ip route",
    syntax: "ip route show",
    description:
      "Displays or modifies the kernel routing table.",
    example: "ip route",
  },
  {
    name: "route",
    syntax: "route -n",
    description:
      "Shows routing table (deprecated).",
    example: "route -n",
  },
  {
    name: "traceroute",
    syntax: "traceroute <host>",
    description:
      "Shows the path packets take to reach a destination.",
    example: "traceroute google.com",
  },
  {
    name: "tracepath",
    syntax: "tracepath <host>",
    description:
      "Traceroute alternative without root access.",
    example: "tracepath google.com",
  },

  /* ===== CONNECTIONS ===== */
  {
    name: "ss",
    syntax: "ss -tuln",
    description:
      "Displays socket statistics (modern netstat replacement).",
    example: "ss -tuln",
  },
  {
    name: "netstat",
    syntax: "netstat -tuln",
    description:
      "Displays open ports and connections (legacy).",
    example: "netstat -tuln",
  },
  {
    name: "lsof",
    syntax: "lsof -i :PORT",
    description:
      "Shows which process is using a specific port.",
    example: "lsof -i :80",
  },
  {
    name: "fuser",
    syntax: "fuser PORT/protocol",
    description:
      "Identifies processes using network ports.",
    example: "fuser 22/tcp",
  },

  /* ===== FILE TRANSFER ===== */
  {
    name: "curl",
    syntax: "curl <url>",
    description:
      "Transfers data from or to a server.",
    example: "curl https://example.com",
  },
  {
    name: "wget",
    syntax: "wget <url>",
    description:
      "Downloads files from the internet.",
    example: "wget https://example.com/file.zip",
  },
  {
    name: "ftp",
    syntax: "ftp <host>",
    description:
      "Transfers files using FTP protocol.",
    example: "ftp ftp.example.com",
  },
  {
    name: "scp",
    syntax: "scp source destination",
    description:
      "Securely copies files using SSH.",
    example: "scp file.txt user@host:/path",
  },
  {
    name: "rsync",
    syntax: "rsync -avz source destination",
    description:
      "Efficient file transfer and synchronization.",
    example: "rsync -avz folder/ user@host:/backup",
  },

  /* ===== NETWORK MANAGER ===== */
  {
    name: "nmcli",
    syntax: "nmcli device status",
    description:
      "Manages network connections via NetworkManager.",
    example: "nmcli connection show",
  },
  {
    name: "nmtui",
    syntax: "nmtui",
    description:
      "Text-based UI for NetworkManager.",
    example: "nmtui",
  },

  /* ===== DNS ===== */
  {
    name: "nslookup",
    syntax: "nslookup <domain>",
    description:
      "Queries DNS servers for domain information.",
    example: "nslookup google.com",
  },
  {
    name: "dig",
    syntax: "dig <domain>",
    description:
      "Advanced DNS lookup tool.",
    example: "dig google.com",
  },
  {
    name: "host",
    syntax: "host <domain>",
    description:
      "Simple DNS query utility.",
    example: "host google.com",
  },

  /* ===== PACKET ANALYSIS ===== */
  {
    name: "tcpdump",
    syntax: "tcpdump -i <interface>",
    description:
      "Captures and analyzes network packets.",
    example: "tcpdump -i eth0",
  },
  {
    name: "tshark",
    syntax: "tshark -i <interface>",
    description:
      "Wireshark CLI packet analyzer.",
    example: "tshark -i eth0",
  },

  /* ===== FIREWALL & SECURITY ===== */
  {
    name: "iptables",
    syntax: "iptables -L",
    description:
      "Configures Linux firewall rules.",
    example: "iptables -L",
  },
  {
    name: "ufw",
    syntax: "ufw status",
    description:
      "User-friendly firewall tool.",
    example: "ufw enable",
  },
  {
    name: "firewall-cmd",
    syntax: "firewall-cmd --list-all",
    description:
      "Manages firewalld rules.",
    example: "firewall-cmd --state",
  },
  {
    name: "nmap",
    syntax: "nmap <target>",
    description:
      "Network scanning and security auditing tool.",
    example: "nmap 192.168.1.1",
  },
  {
    name: "arp",
    syntax: "arp -a",
    description:
      "Displays ARP cache.",
    example: "arp -a",
  },
  {
    name: "whois",
    syntax: "whois <domain>",
    description:
      "Retrieves domain registration information.",
    example: "whois google.com",
  },
];

/* ===============================
   COMPONENT
================================ */
export default function LinuxNetworking() {
  return (
    <div className="px-10 py-10 max-w-6xl mx-auto text-white">
      {/* BACK LINK */}
      <Link
        to="/linux"
        className="inline-block mb-6 text-cyan-400 hover:text-cyan-300 transition"
      >
        ← Back to Linux
      </Link>

      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-3">
          🌐 Linux Networking Commands
        </h1>
        <p className="text-gray-300 max-w-3xl">
          Essential Linux networking commands for system administration,
          troubleshooting, DevOps, and cybersecurity.
        </p>
      </motion.div>

      {/* COMMANDS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {networkingCommands.map((cmd, index) => (
          <motion.div
            key={cmd.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition"
          >
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              {cmd.name}
            </h2>

            <p className="text-gray-300 text-sm mb-3">
              {cmd.description}
            </p>

            <div className="bg-black/40 p-3 rounded-lg text-sm mb-2">
              <span className="text-gray-400">Syntax:</span>
              <code className="block text-green-400 mt-1">
                {cmd.syntax}
              </code>
            </div>

            {cmd.example && (
              <div className="bg-black/40 p-3 rounded-lg text-sm">
                <span className="text-gray-400">Example:</span>
                <code className="block text-yellow-400 mt-1">
                  {cmd.example}
                </code>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
