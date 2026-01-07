export interface CyberTool {
  category:
    | "Networking"
    | "OSINT"
    | "Web Security"
    | "Password Attacks"
    | "Wireless Security";
  name: string;
  slug: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  use: string;
  commands: string[];
}

export const cyberTools: CyberTool[] = [
  // ===============================
  // NETWORKING
  // ===============================
  {
    category: "Networking",
    name: "Nmap",
    slug: "nmap",
    level: "Beginner",
    use: "Network scanning and service discovery",
    commands: ["nmap target", "nmap -sV target", "nmap -A target"],
  },
  {
    category: "Networking",
    name: "Wireshark",
    slug: "wireshark",
    level: "Beginner",
    use: "Analyze captured network traffic",
    commands: ["wireshark", "wireshark -k -i eth0", "tcp.port == 80"],
  },
  {
    category: "Networking",
    name: "Tcpdump",
    slug: "tcpdump",
    level: "Intermediate",
    use: "Command-line packet capture",
    commands: [
      "tcpdump -i eth0",
      "tcpdump -i eth0 port 80",
      "tcpdump -w capture.pcap",
    ],
  },
  {
    category: "Networking",
    name: "Netcat",
    slug: "netcat",
    level: "Intermediate",
    use: "Network communication and backdoor tool",
    commands: ["nc -lvnp 4444", "nc target 80", "nc -nv target 4444"],
  },
  {
    category: "Networking",
    name: "Bettercap",
    slug: "bettercap",
    level: "Advanced",
    use: "Network attacks and MITM framework",
    commands: ["bettercap -iface wlan0", "net.probe on", "arp.spoof on"],
  },

  // ===============================
  // OSINT
  // ===============================
  {
    category: "OSINT",
    name: "theHarvester",
    slug: "theharvester",
    level: "Beginner",
    use: "Gather emails and subdomains",
    commands: [
      "theHarvester -d example.com -b all",
      "theHarvester -d example.com -b google",
      "theHarvester -d example.com -b bing",
    ],
  },
  {
    category: "OSINT",
    name: "Shodan",
    slug: "shodan",
    level: "Beginner",
    use: "Search engine for internet-connected devices",
    commands: ["shodan search apache", "shodan host <ip>", "shodan stats apache"],
  },
  {
    category: "OSINT",
    name: "Sherlock",
    slug: "sherlock",
    level: "Beginner",
    use: "Find usernames across platforms",
    commands: [
      "sherlock username",
      "sherlock username --timeout 60",
      "sherlock username --csv",
    ],
  },
  {
    category: "OSINT",
    name: "Maltego",
    slug: "maltego",
    level: "Intermediate",
    use: "Open-source intelligence analysis",
    commands: ["maltego", "Run standard transforms", "Analyze graph relationships"],
  },

  // ===============================
  // WEB SECURITY
  // ===============================
  {
    category: "Web Security",
    name: "Burp Suite",
    slug: "burp-suite",
    level: "Beginner",
    use: "Intercept and test web traffic",
    commands: [
      "burpsuite",
      "Configure proxy → 127.0.0.1:8080",
      "Send request to Repeater",
    ],
  },
  {
    category: "Web Security",
    name: "OWASP ZAP",
    slug: "owasp-zap",
    level: "Beginner",
    use: "Automated web vulnerability scanner",
    commands: [
      "zaproxy",
      "zap-cli quick-scan http://target",
      "zap-cli active-scan http://target",
    ],
  },
  {
    category: "Web Security",
    name: "SQLmap",
    slug: "sqlmap",
    level: "Intermediate",
    use: "Automate SQL injection attacks",
    commands: [
      'sqlmap -u "http://target?id=1" --dbs',
      "sqlmap --tables",
      "sqlmap --dump",
    ],
  },

  // ===============================
  // PASSWORD ATTACKS
  // ===============================
  {
    category: "Password Attacks",
    name: "John the Ripper",
    slug: "john-the-ripper",
    level: "Beginner",
    use: "Offline password cracking",
    commands: [
      "john hashes.txt",
      "john --show hashes.txt",
      "john --wordlist=rockyou.txt hashes.txt",
    ],
  },
  {
    category: "Password Attacks",
    name: "Hydra",
    slug: "hydra",
    level: "Intermediate",
    use: "Online password brute force",
    commands: [
      "hydra -l user -P pass.txt target ssh",
      "hydra -L users.txt -P pass.txt ftp://target",
      "hydra -s 22 ssh://target",
    ],
  },
  {
    category: "Password Attacks",
    name: "Hashcat",
    slug: "hashcat",
    level: "Advanced",
    use: "High-speed password recovery",
    commands: [
      "hashcat -m 0 hashes.txt wordlist.txt",
      "hashcat -a 3 hashes.txt ?a?a?a?a",
      "hashcat --show hashes.txt",
    ],
  },

  // ===============================
  // WIRELESS SECURITY
  // ===============================
  {
    category: "Wireless Security",
    name: "Aircrack-ng",
    slug: "aircrack-ng",
    level: "Intermediate",
    use: "Crack Wi-Fi passwords",
    commands: [
      "airmon-ng start wlan0",
      "airodump-ng wlan0mon",
      "aircrack-ng capture.cap",
    ],
  },
];
