export interface LinuxCommand {
  category: string;
  command: string;
  description: string;
  difficulty: "basic" | "intermediate" | "advanced";
  example?: string;
}

export const linuxCommands: LinuxCommand[] = [
  // ===============================
  // BASIC / CORE
  // ===============================
  {
    category: "Beginner",
    command: "ls",
    description: "Lists files and directories in the current folder.",
    difficulty: "basic",
    example: "ls -la",
  },
  {
    category: "Beginner",
    command: "pwd",
    description: "Displays the full path of the current working directory.",
    difficulty: "basic",
    example: "pwd",
  },
  {
    category: "Beginner",
    command: "cd",
    description: "Changes the current directory to another location.",
    difficulty: "basic",
    example: "cd /home/user/Documents",
  },
  {
    category: "Beginner",
    command: "clear",
    description: "Clears the terminal screen for better visibility.",
    difficulty: "basic",
    example: "clear",
  },
  {
    category: "Beginner",
    command: "history",
    description: "Shows a list of previously executed commands.",
    difficulty: "basic",
    example: "history",
  },
  {
    category: "Beginner",
    command: "exit",
    description: "Closes the current terminal session.",
    difficulty: "basic",
    example: "exit",
  },

  // ===============================
  // FILE & DIRECTORY
  // ===============================
  {
    category: "File & Directory",
    command: "touch",
    description: "Creates a new empty file or updates file timestamps.",
    difficulty: "basic",
    example: "touch notes.txt",
  },
  {
    category: "File & Directory",
    command: "mkdir",
    description: "Creates a new directory (folder).",
    difficulty: "basic",
    example: "mkdir projects",
  },
  {
    category: "File & Directory",
    command: "rmdir",
    description: "Deletes an empty directory.",
    difficulty: "basic",
    example: "rmdir old_folder",
  },
  {
    category: "File & Directory",
    command: "rm",
    description: "Deletes files or directories permanently.",
    difficulty: "basic",
    example: "rm file.txt",
  },
  {
    category: "File & Directory",
    command: "cp",
    description: "Copies files or directories to another location.",
    difficulty: "basic",
    example: "cp file.txt backup.txt",
  },
  {
    category: "File & Directory",
    command: "mv",
    description: "Moves or renames files and directories.",
    difficulty: "basic",
    example: "mv old.txt new.txt",
  },
  {
    category: "File & Directory",
    command: "cat",
    description: "Displays the contents of a file in the terminal.",
    difficulty: "basic",
    example: "cat notes.txt",
  },
  {
    category: "File & Directory",
    command: "less",
    description: "Views file contents page by page.",
    difficulty: "intermediate",
    example: "less /var/log/syslog",
  },
  {
    category: "File & Directory",
    command: "head",
    description: "Shows the first few lines of a file.",
    difficulty: "basic",
    example: "head file.txt",
  },
  {
    category: "File & Directory",
    command: "tail",
    description: "Shows the last lines of a file, commonly used for logs.",
    difficulty: "basic",
    example: "tail -f /var/log/auth.log",
  },
  {
    category: "File & Directory",
    command: "stat",
    description: "Displays detailed information about a file.",
    difficulty: "intermediate",
    example: "stat file.txt",
  },
  {
    category: "File & Directory",
    command: "tree",
    description: "Displays directories and files in a tree structure.",
    difficulty: "intermediate",
    example: "tree /etc",
  },

  // ===============================
  // PERMISSIONS & OWNERSHIP
  // ===============================
  {
    category: "Permissions",
    command: "chmod",
    description: "Changes file permissions (read, write, execute).",
    difficulty: "intermediate",
    example: "chmod 755 script.sh",
  },
  {
    category: "Permissions",
    command: "chown",
    description: "Changes file or directory ownership.",
    difficulty: "intermediate",
    example: "sudo chown user:user file.txt",
  },
  {
    category: "Permissions",
    command: "chgrp",
    description: "Changes group ownership of a file or directory.",
    difficulty: "intermediate",
    example: "chgrp admin file.txt",
  },
  {
    category: "Permissions",
    command: "umask",
    description: "Sets default permissions for new files.",
    difficulty: "advanced",
    example: "umask 022",
  },
  {
    category: "Permissions",
    command: "getfacl",
    description: "Displays Access Control Lists (ACLs) for files.",
    difficulty: "advanced",
    example: "getfacl file.txt",
  },
  {
    category: "Permissions",
    command: "setfacl",
    description: "Sets Access Control Lists (ACLs) on files.",
    difficulty: "advanced",
    example: "setfacl -m u:user:r file.txt",
  },

  // ===============================
  // USER MANAGEMENT
  // ===============================
  {
    category: "User Management",
    command: "whoami",
    description: "Displays the current logged-in user.",
    difficulty: "basic",
    example: "whoami",
  },
  {
    category: "User Management",
    command: "id",
    description: "Shows user ID, group ID, and groups.",
    difficulty: "intermediate",
    example: "id",
  },
  {
    category: "User Management",
    command: "groups",
    description: "Lists groups the current user belongs to.",
    difficulty: "basic",
    example: "groups",
  },
  {
    category: "User Management",
    command: "useradd",
    description: "Creates a new user account.",
    difficulty: "advanced",
    example: "sudo useradd newuser",
  },
  {
    category: "User Management",
    command: "usermod",
    description: "Modifies an existing user account.",
    difficulty: "advanced",
    example: "sudo usermod -aG sudo user",
  },
  {
    category: "User Management",
    command: "userdel",
    description: "Deletes a user account.",
    difficulty: "advanced",
    example: "sudo userdel user",
  },
  {
    category: "User Management",
    command: "passwd",
    description: "Changes a user password.",
    difficulty: "basic",
    example: "passwd",
  },
  {
    category: "User Management",
    command: "su",
    description: "Switches to another user account.",
    difficulty: "intermediate",
    example: "su root",
  },
  {
    category: "User Management",
    command: "sudo",
    description: "Runs a command with administrator privileges.",
    difficulty: "basic",
    example: "sudo apt update",
  },

  // ===============================
  // PROCESS MANAGEMENT
  // ===============================
  {
    category: "Process Management",
    command: "ps",
    description: "Displays running processes.",
    difficulty: "basic",
    example: "ps aux",
  },
  {
    category: "Process Management",
    command: "top",
    description: "Shows real-time system and process activity.",
    difficulty: "basic",
    example: "top",
  },
  {
    category: "Process Management",
    command: "htop",
    description: "An enhanced interactive process viewer.",
    difficulty: "advanced",
    example: "htop",
  },
  {
    category: "Process Management",
    command: "atop",
    description: "Advanced system and process monitoring tool.",
    difficulty: "advanced",
    example: "atop",
  },
  {
    category: "Process Management",
    command: "kill",
    description: "Terminates a process using its PID.",
    difficulty: "intermediate",
    example: "kill 1234",
  },
  {
    category: "Process Management",
    command: "killall",
    description: "Terminates processes by name.",
    difficulty: "intermediate",
    example: "killall firefox",
  },
  {
    category: "Process Management",
    command: "nice",
    description: "Starts a process with a specific priority.",
    difficulty: "advanced",
    example: "nice -n 10 command",
  },
  {
    category: "Process Management",
    command: "renice",
    description: "Changes priority of a running process.",
    difficulty: "advanced",
    example: "renice -n 5 -p 1234",
  },
  {
    category: "Process Management",
    command: "jobs",
    description: "Lists background jobs.",
    difficulty: "intermediate",
    example: "jobs",
  },
  {
    category: "Process Management",
    command: "bg",
    description: "Resumes a stopped job in the background.",
    difficulty: "intermediate",
    example: "bg %1",
  },
  {
    category: "Process Management",
    command: "fg",
    description: "Brings a background job to the foreground.",
    difficulty: "intermediate",
    example: "fg %1",
  },

  // ===============================
  // SYSTEM INFORMATION
  // ===============================
  {
    category: "System Info",
    command: "uname",
    description: "Displays system and kernel information.",
    difficulty: "basic",
    example: "uname -a",
  },
  {
    category: "System Info",
    command: "hostname",
    description: "Displays or sets the system hostname.",
    difficulty: "basic",
    example: "hostname",
  },
  {
    category: "System Info",
    command: "uptime",
    description: "Shows how long the system has been running.",
    difficulty: "basic",
    example: "uptime",
  },
  {
    category: "System Info",
    command: "date",
    description: "Displays the current system date and time.",
    difficulty: "basic",
    example: "date",
  },
  {
    category: "System Info",
    command: "free",
    description: "Shows memory (RAM) usage.",
    difficulty: "basic",
    example: "free -h",
  },
  {
    category: "System Info",
    command: "df",
    description: "Displays disk space usage.",
    difficulty: "intermediate",
    example: "df -h",
  },
  {
    category: "System Info",
    command: "du",
    description: "Shows disk usage of files and directories.",
    difficulty: "intermediate",
    example: "du -sh *",
  },
  {
    category: "System Info",
    command: "lsblk",
    description: "Lists block storage devices.",
    difficulty: "intermediate",
    example: "lsblk",
  },

  // ===============================
  // NETWORKING
  // ===============================
  {
    category: "Networking",
    command: "ip",
    description: "Displays and manages network interfaces.",
    difficulty: "intermediate",
    example: "ip a",
  },
  {
    category: "Networking",
    command: "ss",
    description: "Displays socket and network connection information.",
    difficulty: "intermediate",
    example: "ss -tuln",
  },
  {
    category: "Networking",
    command: "ping",
    description: "Tests connectivity to another system.",
    difficulty: "basic",
    example: "ping google.com",
  },
  {
    category: "Networking",
    command: "traceroute",
    description: "Shows the route packets take to a destination.",
    difficulty: "intermediate",
    example: "traceroute google.com",
  },
  {
    category: "Networking",
    command: "netstat",
    description: "Displays active network connections.",
    difficulty: "intermediate",
    example: "netstat -tuln",
  },
  {
    category: "Networking",
    command: "arp",
    description: "Displays the ARP table.",
    difficulty: "advanced",
    example: "arp -a",
  },
  {
    category: "Networking",
    command: "route",
    description: "Displays or modifies the routing table.",
    difficulty: "advanced",
    example: "route -n",
  },
  {
    category: "Networking",
    command: "curl",
    description: "Transfers data from or to a URL.",
    difficulty: "basic",
    example: "curl https://example.com",
  },
  {
    category: "Networking",
    command: "wget",
    description: "Downloads files from the internet.",
    difficulty: "basic",
    example: "wget https://example.com/file.zip",
  },
  {
    category: "Networking",
    command: "ssh",
    description: "Connects securely to a remote system.",
    difficulty: "intermediate",
    example: "ssh user@192.168.1.10",
  },
  {
    category: "Networking",
    command: "scp",
    description: "Copies files securely between systems.",
    difficulty: "intermediate",
    example: "scp file.txt user@host:/path",
  },
  {
    category: "Networking",
    command: "rsync",
    description: "Synchronizes files between locations efficiently.",
    difficulty: "advanced",
    example: "rsync -av source/ dest/",
  },

  // ===============================
  // PACKAGE MANAGEMENT
  // ===============================
  {
    category: "Package Management",
    command: "apt update",
    description: "Updates the list of available packages.",
    difficulty: "basic",
    example: "sudo apt update",
  },
  {
    category: "Package Management",
    command: "apt upgrade",
    description: "Upgrades installed packages to the latest version.",
    difficulty: "basic",
    example: "sudo apt upgrade",
  },
  {
    category: "Package Management",
    command: "apt install",
    description: "Installs a new software package.",
    difficulty: "basic",
    example: "sudo apt install nmap",
  },
  {
    category: "Package Management",
    command: "apt remove",
    description: "Removes an installed package.",
    difficulty: "basic",
    example: "sudo apt remove nmap",
  },
  {
    category: "Package Management",
    command: "apt autoremove",
    description: "Removes unused packages and dependencies.",
    difficulty: "intermediate",
    example: "sudo apt autoremove",
  },

  // ===============================
  // TEXT PROCESSING
  // ===============================
  {
    category: "Text Processing",
    command: "grep",
    description: "Searches for patterns within text or files.",
    difficulty: "basic",
    example: "grep error logfile.txt",
  },
  {
    category: "Text Processing",
    command: "awk",
    description: "Processes and analyzes text using patterns.",
    difficulty: "advanced",
    example: "awk '{print $1}' file.txt",
  },
  {
    category: "Text Processing",
    command: "sed",
    description: "Edits text streams line by line.",
    difficulty: "advanced",
    example: "sed 's/old/new/' file.txt",
  },
  {
    category: "Text Processing",
    command: "sort",
    description: "Sorts lines in a text file.",
    difficulty: "basic",
    example: "sort file.txt",
  },
  {
    category: "Text Processing",
    command: "uniq",
    description: "Removes duplicate lines from sorted input.",
    difficulty: "basic",
    example: "uniq file.txt",
  },
  {
    category: "Text Processing",
    command: "cut",
    description: "Extracts specific columns from text.",
    difficulty: "intermediate",
    example: "cut -d':' -f1 /etc/passwd",
  },
  {
    category: "Text Processing",
    command: "tr",
    description: "Translates or deletes characters.",
    difficulty: "intermediate",
    example: "tr a-z A-Z",
  },
  {
    category: "Text Processing",
    command: "wc",
    description: "Counts lines, words, and characters.",
    difficulty: "basic",
    example: "wc -l file.txt",
  },

  // ===============================
  // ARCHIVE & COMPRESSION
  // ===============================
  {
    category: "Compression",
    command: "tar",
    description: "Archives multiple files into a single file.",
    difficulty: "intermediate",
    example: "tar -czvf backup.tar.gz folder/",
  },
  {
    category: "Compression",
    command: "zip",
    description: "Creates a ZIP archive.",
    difficulty: "basic",
    example: "zip files.zip file1 file2",
  },
  {
    category: "Compression",
    command: "unzip",
    description: "Extracts files from a ZIP archive.",
    difficulty: "basic",
    example: "unzip files.zip",
  },
  {
    category: "Compression",
    command: "gzip",
    description: "Compresses files using gzip.",
    difficulty: "basic",
    example: "gzip file.txt",
  },
  {
    category: "Compression",
    command: "gunzip",
    description: "Decompresses gzip-compressed files.",
    difficulty: "basic",
    example: "gunzip file.txt.gz",
  },
  {
    category: "Compression",
    command: "xz",
    description: "Compresses files using high-ratio compression.",
    difficulty: "advanced",
    example: "xz file.txt",
  },

  // ===============================
  // ADVANCED / SECURITY
  // ===============================
  {
    category: "Advanced",
    command: "nmap",
    description: "Scans networks to discover hosts, ports, and services.",
    difficulty: "advanced",
    example: "nmap 192.168.1.1",
  },
  {
    category: "Advanced",
    command: "tcpdump",
    description: "Captures and analyzes network packets.",
    difficulty: "advanced",
    example: "tcpdump -i eth0",
  },
  {
    category: "Advanced",
    command: "lsof",
    description: "Lists open files and the processes using them.",
    difficulty: "advanced",
    example: "lsof -i",
  },
  {
    category: "Advanced",
    command: "strace",
    description: "Traces system calls made by a process.",
    difficulty: "advanced",
    example: "strace ls",
  },
  {
    category: "Advanced",
    command: "crontab",
    description: "Schedules recurring tasks using cron.",
    difficulty: "advanced",
    example: "crontab -e",
  },
  {
    category: "Advanced",
    command: "systemctl",
    description: "Manages system services.",
    difficulty: "advanced",
    example: "systemctl status ssh",
  },
  {
    category: "Advanced",
    command: "journalctl",
    description: "Views system logs managed by systemd.",
    difficulty: "advanced",
    example: "journalctl -xe",
  },
];
