export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  inputPlaceholder?: string;
  inputLabel?: string;
}

export const TOOL_CATEGORIES = [
  "Security & Penetration Testing",
  "Password & Authentication",
  "Encoding, Decoding & Cryptography",
  "Digital Forensics & Analysis",
  "Networking & IP Calculation",
  "Storage, Cloud & Data Transfer",
  "General Developer & Utility"
];

export const tools: Tool[] = [
  // [1] Security & Penetration Testing
  {
    id: 'xss-tester',
    name: 'XSS Input Tester',
    category: 'Security & Penetration Testing',
    description: 'Generate common XSS payloads for testing input vulnerabilities.',
    inputPlaceholder: 'Leave blank for default payloads, or enter a target param name...',
    inputLabel: 'Target Parameter (optional)'
  },
  {
    id: 'sql-tester',
    name: 'SQL Injection Tester',
    category: 'Security & Penetration Testing',
    description: 'Generate SQLi bypass and enumeration payloads.',
    inputPlaceholder: 'Enter DB type: mysql | mssql | oracle | sqlite (default: mysql)',
    inputLabel: 'Database Type'
  },
  {
    id: 'payload-gen',
    name: 'Payload Generator',
    category: 'Security & Penetration Testing',
    description: 'Generate Reverse Shell, LFI, and RFI payloads.',
    inputPlaceholder: 'Format: TYPE LHOST LPORT  e.g: revshell 192.168.1.5 4444\nTypes: revshell | lfi | rfi | bash | python | php',
    inputLabel: 'Payload Config'
  },
  {
    id: 'firewall-gen',
    name: 'Firewall Rule Generator',
    category: 'Security & Penetration Testing',
    description: 'Generate iptables or ufw rules quickly.',
    inputPlaceholder: 'Format: ACTION PROTOCOL PORT [IP]\nExamples:\nallow tcp 80\ndeny tcp 22 192.168.1.100\nblock udp 53',
    inputLabel: 'Rule Parameters'
  },
  {
    id: 'hash-id',
    name: 'Hash Identifier',
    category: 'Security & Penetration Testing',
    description: 'Identify potential hash types based on length and format.',
    inputPlaceholder: 'Paste a hash string here...',
    inputLabel: 'Hash String'
  },
  {
    id: 'hash-calc',
    name: 'Hashing Calculator',
    category: 'Security & Penetration Testing',
    description: 'Generate SHA-256, SHA-1, or MD5 hashes from any input string.',
    inputPlaceholder: 'Enter text to hash...',
    inputLabel: 'Input String'
  },
  {
    id: 'enc-dec',
    name: 'Encrypt / Decrypt Calc',
    category: 'Security & Penetration Testing',
    description: 'Simple AES-based browser-side encryption and decryption.',
    inputPlaceholder: 'Format: MODE::KEY::TEXT\nExamples:\nencrypt::mySecretKey::Hello World\ndecrypt::mySecretKey::U2FsdGVkX1...',
    inputLabel: 'MODE::KEY::TEXT'
  },
  {
    id: 'fib-hash',
    name: 'Fibonacci Hash Tool',
    category: 'Security & Penetration Testing',
    description: 'Calculate hash values using Fibonacci hashing (Knuth multiplicative hashing).',
    inputPlaceholder: 'Enter a number or string to hash...',
    inputLabel: 'Input Value'
  },

  // [2] Password & Authentication
  {
    id: 'pass-gen',
    name: 'Password Generator',
    category: 'Password & Authentication',
    description: 'Create high-entropy secure passwords with configurable options.',
    inputPlaceholder: 'Enter desired length (default: 16)\nAdd flags: +upper +lower +digits +symbols +no-ambiguous\nExample: 24 +symbols +no-ambiguous',
    inputLabel: 'Length & Options'
  },
  {
    id: 'pass-strength',
    name: 'Password Strength Meter',
    category: 'Password & Authentication',
    description: 'Analyze password entropy, complexity, and estimated crack-time.',
    inputPlaceholder: 'Enter a password to analyze...',
    inputLabel: 'Password'
  },

  // [3] Encoding, Decoding & Cryptography
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    category: 'Encoding, Decoding & Cryptography',
    description: 'Convert strings to/from Base64 encoding.',
    inputPlaceholder: 'Format: encode::your text here\nor: decode::SGVsbG8gV29ybGQ=',
    inputLabel: 'encode:: or decode:: prefix required'
  },
  {
    id: 'url-enc',
    name: 'URL Encoder / Decoder',
    category: 'Encoding, Decoding & Cryptography',
    description: 'Safe URL encoding/decoding for special characters.',
    inputPlaceholder: 'Format: encode::your url string\nor: decode::your%20encoded%20string',
    inputLabel: 'encode:: or decode:: prefix required'
  },
  {
    id: 'hex-ascii',
    name: 'Hex / ASCII Converter',
    category: 'Encoding, Decoding & Cryptography',
    description: 'Convert hexadecimal strings to readable ASCII and vice versa.',
    inputPlaceholder: 'Format: hex2ascii::48656c6c6f\nor: ascii2hex::Hello World',
    inputLabel: 'hex2ascii:: or ascii2hex::'
  },
  {
    id: 'bin-dec-hex',
    name: 'Binary / Dec / Hex Converter',
    category: 'Encoding, Decoding & Cryptography',
    description: 'Multi-base number system converter between binary, decimal and hex.',
    inputPlaceholder: 'Format: FROM::VALUE\nExamples:\nbin::1010110\ndec::86\nhex::56',
    inputLabel: 'bin:: | dec:: | hex:: prefix'
  },
  {
    id: 'caesar',
    name: 'Caesar / ROT Cipher',
    category: 'Encoding, Decoding & Cryptography',
    description: 'Shift-based substitution cipher — supports any ROT value.',
    inputPlaceholder: 'Format: SHIFT::TEXT\nExamples:\n13::Hello World  (ROT13)\n3::Attack at dawn',
    inputLabel: 'SHIFT::TEXT'
  },
  {
    id: 'string-ext',
    name: 'String Extractor',
    category: 'Encoding, Decoding & Cryptography',
    description: 'Extract printable ASCII strings from raw/binary text blobs.',
    inputPlaceholder: 'Paste raw binary, hex dump, or obfuscated text here...',
    inputLabel: 'Raw Input'
  },

  // [4] Digital Forensics & Analysis
  {
    id: 'file-hash',
    name: 'File Hash Generator',
    category: 'Digital Forensics & Analysis',
    description: 'Generate SHA-256 / SHA-1 / MD5 hashes for local files (fully client-side).',
    inputPlaceholder: 'Use the file picker below to select a file for hashing.',
    inputLabel: 'File Selection (use file input)'
  },
  {
    id: 'exif-view',
    name: 'EXIF Metadata Viewer',
    category: 'Digital Forensics & Analysis',
    description: 'View basic metadata extracted from uploaded image files.',
    inputPlaceholder: 'Use the file picker below to upload an image file.',
    inputLabel: 'Image File'
  },
  {
    id: 'log-analyser',
    name: 'Log Analyzer',
    category: 'Digital Forensics & Analysis',
    description: 'Paste log content to parse and count events, errors, IPs, and patterns.',
    inputPlaceholder: 'Paste raw log content here (Apache, Nginx, syslog, etc.)...',
    inputLabel: 'Log Content'
  },
  {
    id: 'incident-time',
    name: 'Incident Timeline Builder',
    category: 'Digital Forensics & Analysis',
    description: 'Organize forensic events into a chronological sorted timeline.',
    inputPlaceholder: 'One event per line in format:\nTIMESTAMP | EVENT DESCRIPTION\nExample:\n2024-01-15 09:23:11 | Suspicious login from 192.168.1.50\n2024-01-15 09:24:55 | Privilege escalation attempt detected',
    inputLabel: 'Events (TIMESTAMP | DESCRIPTION per line)'
  },
  {
    id: 'cvss-calc',
    name: 'CVSS Score Calculator',
    category: 'Digital Forensics & Analysis',
    description: 'Calculate CVSS v3.1 base score from vulnerability metrics.',
    inputPlaceholder: 'Format: AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H\nAV: N|A|L|P  AC: L|H  PR: N|L|H\nUI: N|R  S: U|C  C/I/A: N|L|H',
    inputLabel: 'CVSS Vector String'
  },
  {
    id: 'unix-ts',
    name: 'Unix Timestamp Converter',
    category: 'Digital Forensics & Analysis',
    description: 'Convert Epoch time to human-readable dates and vice versa.',
    inputPlaceholder: 'Enter Unix timestamp (e.g. 1700000000)\nor date string (e.g. 2024-01-15 09:30:00)',
    inputLabel: 'Timestamp or Date'
  },

  // [5] Networking & IP Calculation
  {
    id: 'ip-calc',
    name: 'IP Address Calculator',
    category: 'Networking & IP Calculation',
    description: 'Calculate subnets, network/broadcast addresses, and usable host ranges.',
    inputPlaceholder: 'Enter IP with CIDR: 192.168.1.0/24\nor IP with mask: 192.168.1.0 255.255.255.0',
    inputLabel: 'IP / CIDR'
  },
  {
    id: 'ip-range',
    name: 'IP Range Calculator',
    category: 'Networking & IP Calculation',
    description: 'Calculate the full range of IPs between two addresses.',
    inputPlaceholder: 'Enter start and end IP separated by dash:\n192.168.1.1-192.168.1.50',
    inputLabel: 'IP Range (start-end)'
  },
  {
    id: 'net-addr',
    name: 'Network Address Calculator',
    category: 'Networking & IP Calculation',
    description: 'Determine network address, broadcast, and class from any IP.',
    inputPlaceholder: 'Enter an IP address: 10.0.0.25',
    inputLabel: 'IP Address'
  },
  {
    id: 'wildcard',
    name: 'Wildcard Mask Tool',
    category: 'Networking & IP Calculation',
    description: 'Convert subnet masks to wildcard masks and vice versa.',
    inputPlaceholder: 'Enter subnet mask: 255.255.255.0\nor wildcard: 0.0.0.255',
    inputLabel: 'Subnet or Wildcard Mask'
  },
  {
    id: 'ipv4-v6',
    name: 'IPv4 to IPv6 Converter',
    category: 'Networking & IP Calculation',
    description: 'Map IPv4 addresses to IPv6 notation (IPv4-mapped and IPv4-compatible).',
    inputPlaceholder: 'Enter IPv4 address: 192.168.1.1',
    inputLabel: 'IPv4 Address'
  },
  {
    id: 'mac-lookup',
    name: 'MAC Address Lookup',
    category: 'Networking & IP Calculation',
    description: 'Identify hardware vendors from MAC address OUI prefix (offline).',
    inputPlaceholder: 'Enter MAC address: 00:1A:2B:3C:4D:5E\nor OUI prefix: 00:1A:2B',
    inputLabel: 'MAC Address'
  },
  {
    id: 'ping-calc',
    name: 'Ping Time Calculator',
    category: 'Networking & IP Calculation',
    description: 'Simulate and estimate round-trip ping times based on distance/medium.',
    inputPlaceholder: 'Enter distance in km: 1500\nor medium: fiber | copper | wireless | satellite',
    inputLabel: 'Distance (km) or medium'
  },
  {
    id: 'latency-calc',
    name: 'Latency vs Throughput',
    category: 'Networking & IP Calculation',
    description: 'Calculate effective throughput factoring in latency and window size.',
    inputPlaceholder: 'Format: BANDWIDTH::LATENCY::WINDOW\nExample: 100Mbps::50ms::65535bytes',
    inputLabel: 'Bandwidth::Latency::WindowSize'
  },
  {
    id: 'packet-loss',
    name: 'Packet Loss Calculator',
    category: 'Networking & IP Calculation',
    description: 'Calculate effective throughput degradation from packet loss percentage.',
    inputPlaceholder: 'Format: BANDWIDTH::LOSS%::RTT\nExample: 100Mbps::2::50ms',
    inputLabel: 'Bandwidth::Loss%::RTT'
  },
  {
    id: 'bw-calc',
    name: 'Bandwidth Calculator',
    category: 'Networking & IP Calculation',
    description: 'Convert and calculate throughput between bandwidth units.',
    inputPlaceholder: 'Enter value with unit: 100 Mbps\nOr convert: 1 Gbps to MBps',
    inputLabel: 'Bandwidth Value & Unit'
  },
  {
    id: 'bitrate-calc',
    name: 'Bitrate Calculator',
    category: 'Networking & IP Calculation',
    description: 'Calculate video/audio bitrate from resolution, framerate, and color depth.',
    inputPlaceholder: 'Format: WIDTH HEIGHT FPS BITDEPTH\nExample: 1920 1080 30 8\nor: 3840 2160 60 10',
    inputLabel: 'Width Height FPS BitDepth'
  },

  // [6] Storage, Cloud & Data Transfer
  {
    id: 'file-size',
    name: 'File Size Estimator',
    category: 'Storage, Cloud & Data Transfer',
    description: 'Estimate file sizes for different media types and quality settings.',
    inputPlaceholder: 'Format: TYPE DURATION/SIZE QUALITY\nExamples:\nvideo 60min 1080p\naudio 3min 320kbps\nimage 24MP RAW',
    inputLabel: 'TYPE DURATION QUALITY'
  },
  {
    id: 'storage-conv',
    name: 'Storage Unit Converter',
    category: 'Storage, Cloud & Data Transfer',
    description: 'Convert between all storage units (bits, bytes, KB, MB, GB, TB, PB).',
    inputPlaceholder: 'Enter value with unit: 500 GB\nor: 1.5 TB',
    inputLabel: 'Value + Unit'
  },
  {
    id: 'transfer-time',
    name: 'Data Transfer Time Calculator',
    category: 'Storage, Cloud & Data Transfer',
    description: 'Calculate how long it takes to transfer a given file size at a given speed.',
    inputPlaceholder: 'Format: FILE_SIZE :: SPEED\nExamples:\n10 GB :: 100 Mbps\n500 MB :: 50 MBps',
    inputLabel: 'FileSize :: Speed'
  },
  {
    id: 'download-time',
    name: 'Download Time Estimator',
    category: 'Storage, Cloud & Data Transfer',
    description: 'Estimate real-world download time factoring in overhead and efficiency.',
    inputPlaceholder: 'Format: SIZE :: SPEED :: OVERHEAD%\nExample: 4.7GB :: 50Mbps :: 15',
    inputLabel: 'Size :: Speed :: Overhead%'
  },
  {
    id: 'raid-calc',
    name: 'RAID Calculator',
    category: 'Storage, Cloud & Data Transfer',
    description: 'Calculate usable capacity, fault tolerance, and efficiency for RAID levels.',
    inputPlaceholder: 'Format: RAID_LEVEL DRIVES DRIVE_SIZE\nExamples:\nRAID0 4 2TB\nRAID5 6 4TB\nRAID10 8 1TB',
    inputLabel: 'RAID_LEVEL DRIVES SIZE'
  },
  {
    id: 'cloud-cost',
    name: 'Cloud Cost Estimator',
    category: 'Storage, Cloud & Data Transfer',
    description: 'Estimate monthly cloud resource expenses (compute, storage, transfer).',
    inputPlaceholder: 'Format: RESOURCE AMOUNT UNIT\nExamples:\ncompute 4 vCPU\nstorage 500 GB\ntransfer 1 TB',
    inputLabel: 'Resource Amount Unit (one per line)'
  },
  {
    id: 'uptime-calc',
    name: 'Uptime Calculator',
    category: 'Storage, Cloud & Data Transfer',
    description: 'Convert SLA "nines" of availability to allowed downtime per year/month/week.',
    inputPlaceholder: 'Enter uptime percentage: 99.9\nor nines: 3  (for 99.9%)',
    inputLabel: 'Uptime % or Number of Nines'
  },

  // [7] General Developer & Utility
  {
    id: 'calculator',
    name: 'Calculator',
    category: 'General Developer & Utility',
    description: 'Evaluate math expressions including bitwise, hex, and scientific operations.',
    inputPlaceholder: 'Enter any math expression:\n2 ** 10\n0xFF & 0x0F\nMath.sqrt(256)\n(1024 * 8) / 100',
    inputLabel: 'Math Expression'
  },
  {
    id: 'regex-test',
    name: 'Regex Pattern Tester',
    category: 'General Developer & Utility',
    description: 'Test JavaScript regular expressions against input text in real-time.',
    inputPlaceholder: 'Format: PATTERN::FLAGS::TEST_STRING\nExample: \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}::g::Found IP: 192.168.1.1 and 10.0.0.1',
    inputLabel: 'PATTERN::FLAGS::TEST_STRING'
  },
  {
    id: 'dork-build',
    name: 'Google Dork Builder',
    category: 'General Developer & Utility',
    description: 'Construct advanced Google search queries for OSINT and reconnaissance.',
    inputPlaceholder: 'Enter dork params (one per line):\nsite:example.com\nfiletype:pdf\ninurl:admin\nintitle:index of\n"confidential"',
    inputLabel: 'Dork operators (one per line)'
  }
];