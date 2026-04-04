export interface CryptographyTopic {
  title: string;
  description: string;
  sections: {
    heading: string;
    points: string[];
  }[];
}

export const cryptoData: CryptographyTopic[] = [
  // ===============================
  // INTRODUCTION
  // ===============================
  {
    title: "What is Cryptography?",
    description:
      "Cryptography is the science of securing information by transforming readable data into an unreadable format using mathematical algorithms and secret keys.",
    sections: [
      {
        heading: "Purpose of Cryptography",
        points: [
          "Protect sensitive information from unauthorized access",
          "Ensure secure communication over insecure networks",
          "Prevent data tampering and forgery",
          "Build trust in digital systems",
        ],
      },
      {
        heading: "Where Cryptography is Used",
        points: [
          "Internet and web security",
          "Banking and financial systems",
          "Cybersecurity and ethical hacking",
          "Blockchain and cryptocurrencies",
          "Military and government communication",
        ],
      },
    ],
  },

  // ===============================
  // SECURITY GOALS
  // ===============================
  {
    title: "Goals of Cryptography",
    description:
      "Cryptography aims to achieve essential security goals required for protecting digital data and systems.",
    sections: [
      {
        heading: "Core Security Goals",
        points: [
          "Confidentiality – data is accessible only to authorized users",
          "Integrity – data cannot be altered without detection",
          "Authentication – verifies identity of sender and receiver",
          "Non-repudiation – sender cannot deny sending data",
        ],
      },
      {
        heading: "CIA Triad Relation",
        points: [
          "Confidentiality achieved using encryption",
          "Integrity achieved using hashing and digital signatures",
          "Availability ensured through secure system design",
        ],
      },
    ],
  },

  // ===============================
  // TYPES OF CRYPTOGRAPHY
  // ===============================
  {
    title: "Types of Cryptography",
    description:
      "Cryptographic techniques are classified based on how keys are used and how data is protected.",
    sections: [
      {
        heading: "Symmetric Key Cryptography",
        points: [
          "Same key is used for encryption and decryption",
          "Very fast and efficient",
          "Key sharing is a major challenge",
          "Examples: AES, DES, Blowfish",
        ],
      },
      {
        heading: "Asymmetric Key Cryptography",
        points: [
          "Uses a public key and a private key",
          "More secure key exchange",
          "Slower than symmetric encryption",
          "Examples: RSA, ECC, Diffie-Hellman",
        ],
      },
      {
        heading: "Hash Functions",
        points: [
          "One-way mathematical function",
          "No decryption possible",
          "Used for integrity and password storage",
          "Examples: SHA-256, SHA-3, MD5 (deprecated)",
        ],
      },
    ],
  },

  // ===============================
  // POPULAR ALGORITHMS
  // ===============================
  {
    title: "Popular Cryptographic Algorithms",
    description:
      "These algorithms form the backbone of modern cryptographic systems.",
    sections: [
      {
        heading: "AES (Advanced Encryption Standard)",
        points: [
          "Symmetric encryption algorithm",
          "Key sizes: 128, 192, 256 bits",
          "Highly secure and efficient",
          "Resistant to brute-force attacks",
          "Used in HTTPS, VPNs, disk encryption, Wi-Fi",
        ],
      },
      {
        heading: "DES and 3DES",
        points: [
          "DES uses 56-bit key (insecure)",
          "Vulnerable to brute-force attacks",
          "3DES applies DES three times",
          "Slower and being phased out",
          "Replaced by AES",
        ],
      },
      {
        heading: "RSA (Rivest–Shamir–Adleman)",
        points: [
          "Asymmetric encryption algorithm",
          "Security based on prime factorization",
          "Used for key exchange and digital signatures",
          "Key sizes: 2048-bit or higher recommended",
          "Common in SSL/TLS and certificates",
        ],
      },
    ],
  },

  // ===============================
  // DIGITAL SIGNATURES
  // ===============================
  {
    title: "Digital Signatures",
    description:
      "Digital signatures ensure authenticity, integrity, and non-repudiation of digital data.",
    sections: [
      {
        heading: "How Digital Signatures Work",
        points: [
          "Message is hashed using a hash function",
          "Hash is encrypted with sender's private key",
          "Receiver decrypts using sender's public key",
          "Hash comparison verifies integrity",
        ],
      },
      {
        heading: "Applications",
        points: [
          "Secure email and document signing",
          "Software and firmware verification",
          "Blockchain transactions",
          "Legal and financial documents",
        ],
      },
    ],
  },

  // ===============================
  // KEY MANAGEMENT
  // ===============================
  {
    title: "Key Management",
    description:
      "Key management is the process of securely handling cryptographic keys throughout their lifecycle.",
    sections: [
      {
        heading: "Key Management Practices",
        points: [
          "Strong random key generation",
          "Secure storage (HSMs, vaults)",
          "Regular key rotation",
          "Key backup and recovery",
          "Key revocation and expiration",
        ],
      },
      {
        heading: "Key Management Challenges",
        points: [
          "Key theft and leakage",
          "Poor storage practices",
          "Human errors",
          "Insider threats",
        ],
      },
    ],
  },

  // ===============================
  // CRYPTOGRAPHIC ATTACKS
  // ===============================
  {
    title: "Cryptographic Attacks",
    description:
      "Cryptographic attacks attempt to compromise encrypted data or cryptographic systems.",
    sections: [
      {
        heading: "Common Attacks",
        points: [
          "Brute-force attack",
          "Man-in-the-middle attack",
          "Replay attack",
          "Chosen-plaintext attack",
          "Side-channel attack",
        ],
      },
      {
        heading: "Hash-Based Attacks",
        points: [
          "Collision attack",
          "Birthday attack",
          "Rainbow table attack",
        ],
      },
    ],
  },

  // ===============================
  // MODERN CRYPTOGRAPHY
  // ===============================
  {
    title: "Modern Cryptography Concepts",
    description:
      "Advanced cryptographic techniques designed for modern security challenges.",
    sections: [
      {
        heading: "Advanced Techniques",
        points: [
          "Elliptic Curve Cryptography (ECC)",
          "Zero-Knowledge Proofs",
          "Homomorphic Encryption",
          "Secure Multi-Party Computation",
        ],
      },
      {
        heading: "Post-Quantum Cryptography",
        points: [
          "Designed to resist quantum attacks",
          "Lattice-based cryptography",
          "Hash-based signatures",
        ],
      },
    ],
  },

  // ===============================
  // APPLICATIONS
  // ===============================
  {
    title: "Applications of Cryptography",
    description:
      "Cryptography is essential for securing digital infrastructure.",
    sections: [
      {
        heading: "Everyday Applications",
        points: [
          "Secure web browsing (HTTPS)",
          "Online banking and payments",
          "Email and messaging encryption",
          "Password protection",
        ],
      },
      {
        heading: "Enterprise and Government Use",
        points: [
          "Data protection and compliance",
          "Identity and access management",
          "Secure cloud infrastructure",
          "Defense and intelligence systems",
        ],
      },
    ],
  },

  // ===============================
  // ADVANTAGES & LIMITATIONS
  // ===============================
  {
    title: "Advantages and Limitations of Cryptography",
    description:
      "While cryptography provides strong security, it also has limitations.",
    sections: [
      {
        heading: "Advantages",
        points: [
          "Strong data confidentiality",
          "Secure communication channels",
          "Authentication and integrity",
          "Legal and regulatory compliance",
        ],
      },
      {
        heading: "Limitations",
        points: [
          "Complex implementation",
          "Key management difficulties",
          "Performance overhead",
          "Vulnerable to poor configuration",
        ],
      },
    ],
  },

  // ===============================
  // FUTURE
  // ===============================
  {
    title: "Future of Cryptography",
    description:
      "Cryptography continues to evolve to counter emerging threats.",
    sections: [
      {
        heading: "Future Trends",
        points: [
          "Quantum-resistant algorithms",
          "Blockchain-based security systems",
          "Privacy-preserving cryptography",
          "AI-driven cryptographic analysis",
        ],
      },
    ],
  },
];
