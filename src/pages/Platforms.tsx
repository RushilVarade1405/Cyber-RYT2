function getMainCategory(category: string) {
  if (category.toLowerCase().includes("ctf")) return "CTF";
  if (category.toLowerCase().includes("web")) return "Web Security";
  if (category.toLowerCase().includes("linux")) return "Linux";
  if (category.toLowerCase().includes("pentest")) return "Pentesting";
  return "Cyber";
}

const platforms = [
  {
    name: "TryHackMe",
    category: "Cybersecurity & Pentesting",
    difficulty: "Beginner → Advanced",
    description:
      "An interactive learning platform with guided labs covering cybersecurity, networking, Linux, and ethical hacking.",
    link: "https://tryhackme.com",
  },
  {
    name: "Hack The Box",
    category: "Advanced Pentesting",
    difficulty: "Intermediate → Expert",
    description:
      "A hands-on platform focused on real-world penetration testing labs, machines, and challenges.",
    link: "https://www.hackthebox.com",
  },
  {
    name: "OWASP Juice Shop",
    category: "Web Application Security",
    difficulty: "Beginner → Advanced",
    description:
      "An intentionally vulnerable web application designed to teach web security flaws from the OWASP Top 10.",
    link: "https://owasp.org/www-project-juice-shop/",
  },
  {
    name: "OverTheWire",
    category: "Linux & Security Wargames",
    difficulty: "Beginner → Intermediate",
    description:
      "A collection of Linux-based wargames that teach security concepts using command-line challenges.",
    link: "https://overthewire.org",
  },
  {
    name: "PicoCTF",
    category: "CTF & Cybersecurity",
    difficulty: "Beginner → Intermediate",
    description:
      "A beginner-friendly Capture The Flag platform focused on learning cybersecurity concepts step by step.",
    link: "https://picoctf.org",
  },
  {
    name: "VulnHub",
    category: "Vulnerable Machines",
    difficulty: "Intermediate → Advanced",
    description:
      "A resource for vulnerable virtual machines designed for practicing penetration testing locally.",
    link: "https://www.vulnhub.com",
  },
  {
    name: "CTFlearn",
    category: "CTF Practice",
    difficulty: "Beginner → Intermediate",
    description:
      "A platform offering beginner-friendly CTF challenges across cryptography, web, reversing, and forensics.",
    link: "https://ctflearn.com",
  },
];

export default function Platforms() {
  return (
    <div className="px-10 py-10 max-w-7xl mx-auto text-white">
      {/* ===============================
          TITLE
      =============================== */}
      <h1 className="text-4xl font-bold mb-4">
        Learning Platforms
      </h1>

      <p className="text-cyan-300 mb-10">
        Curated hands-on platforms for learning cybersecurity, Linux,
        penetration testing, and Capture The Flag (CTF) challenges.
      </p>

      {/* ===============================
          PLATFORM GRID
      =============================== */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p, index) => {
          const mainCategory = getMainCategory(p.category);

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-[#0b1224] to-[#0f1a33]
              border border-cyan-500/30 rounded-xl p-6
              transition-all duration-300 hover:-translate-y-2
              hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              {/* Platform Name */}
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {p.name}
              </h3>

              {/* Category Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className="text-xs px-3 py-1 rounded-full
                  bg-emerald-500/10 text-emerald-300
                  border border-emerald-400/30"
                >
                  {mainCategory}
                </span>

                <span
                  className="text-xs px-3 py-1 rounded-full
                  bg-cyan-500/10 text-cyan-300
                  border border-cyan-400/30"
                >
                  {p.category}
                </span>

                <span
                  className="text-xs px-3 py-1 rounded-full
                  bg-purple-500/10 text-purple-300
                  border border-purple-400/30"
                >
                  {p.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4">
                {p.description}
              </p>

              {/* Link */}
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm px-4 py-2 rounded-md
                border border-cyan-400 text-cyan-400
                hover:bg-cyan-400 hover:text-black transition"
              >
                Visit Platform →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
