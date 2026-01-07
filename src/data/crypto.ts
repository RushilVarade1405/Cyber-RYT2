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
      "Cryptography is the practice of securing information by converting it into an unreadable format using mathematical algorithms.",
    sections: [
      {
        heading: "Purpose of Cryptography",
        points: [
          "Protect sensitive information",
          "Prevent unauthorized access",
          "Ensure secure communication",
          "Maintain trust in digital systems",
        ],
      },
      {
        heading: "Where Cryptography is Used",
        points: [
          "Internet communication",
          "Banking systems",
          "Cybersecurity",
          "Blockchain and cryptocurrencies",
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
      "Cryptography is designed to achieve fundamental security objectives.",
    sections: [
      {
        heading: "Core Security Goals",
        points: [
          "Confidentiality",
          "Integrity",
          "Authentication",
          "Non-repudiation",
        ],
      },
      {
        heading: "CIA Triad Relation",
        points: [
          "Confidentiality through encryption",
          "Integrity through hashing",
          "Availability through secure systems",
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
      "Cryptographic techniques are classified based on key usage and operation.",
    sections: [
      {
        heading: "Symmetric Key Cryptography",
        points: [
          "Same key used for encryption and decryption",
          "Fast and efficient",
          "Examples: AES, DES",
        ],
      },
      {
        heading: "Asymmetric Key Cryptography",
        points: [
          "Uses public and private keys",
          "Slower than symmetric encryption",
          "Examples: RSA, ECC",
        ],
      },
      {
        heading: "Hash Functions",
        points: [
          "One-way encryption",
          "Used for data integrity",
          "Examples: SHA-256, MD5",
        ],
      },
    ],
  },

  // ===============================
  // AES, DES, RSA
  // ===============================
  {
    title: "Popular Cryptographic Algorithms (AES, DES, RSA)",
    description:
      "AES, DES, and RSA are widely used cryptographic algorithms that form the foundation of secure communication.",
    sections: [
      {
        heading: "AES (Advanced Encryption Standard)",
        points: [
          "Symmetric key encryption algorithm",
          "Uses 128, 192, or 256-bit keys",
          "Highly secure and fast",
          "Resistant to brute-force attacks",
          "Used in HTTPS, VPNs, disk encryption, and Wi-Fi security",
          "Recommended modern encryption standard",
        ],
      },
      {
        heading: "DES (Data Encryption Standard)",
        points: [
          "Symmetric encryption algorithm",
          "Uses a 56-bit key",
          "Once widely used but now obsolete",
          "Vulnerable to brute-force attacks",
          "Replaced by AES",
          "Triple DES (3DES) introduced to improve security",
        ],
      },
      {
        heading: "RSA (Rivest–Shamir–Adleman)",
        points: [
          "Asymmetric encryption algorithm",
          "Uses public and private keys",
          "Based on large prime number factorization",
          "Slower than symmetric encryption",
          "Used for key exchange and digital signatures",
          "Common in SSL/TLS and digital certificates",
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
      "Digital signatures provide authentication, integrity, and non-repudiation of digital data.",
    sections: [
      {
        heading: "How Digital Signatures Work",
        points: [
          "Message is hashed",
          "Hash is encrypted using sender's private key",
          "Receiver verifies using sender's public key",
        ],
      },
      {
        heading: "Applications",
        points: [
          "Secure email communication",
          "Software authenticity verification",
          "Blockchain transactions",
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
      "Key management involves secure generation, storage, distribution, and revocation of cryptographic keys.",
    sections: [
      {
        heading: "Key Management Practices",
        points: [
          "Secure key generation",
          "Safe storage of keys",
          "Regular key rotation",
          "Key revocation",
        ],
      },
      {
        heading: "Key Management Challenges",
        points: [
          "Key theft",
          "Improper storage",
          "Human errors",
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
      "Attacks that attempt to break cryptographic systems or exploit weaknesses.",
    sections: [
      {
        heading: "Common Attacks",
        points: [
          "Brute force attack",
          "Man-in-the-middle attack",
          "Replay attack",
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
  // APPLICATIONS
  // ===============================
  {
    title: "Applications of Cryptography",
    description:
      "Cryptography plays a vital role in securing modern digital systems.",
    sections: [
      {
        heading: "Real-World Applications",
        points: [
          "Secure web browsing (HTTPS)",
          "Online banking",
          "Email encryption",
          "Blockchain and cryptocurrencies",
        ],
      },
      {
        heading: "Enterprise Use",
        points: [
          "Data protection",
          "Identity management",
          "Secure authentication systems",
        ],
      },
    ],
  },

  // ===============================
  // ADVANTAGES & LIMITATIONS
  // ===============================
  {
    title: "Advantages and Limitations",
    description:
      "Cryptography strengthens security but also introduces challenges.",
    sections: [
      {
        heading: "Advantages",
        points: [
          "Strong data protection",
          "Secure communication",
          "Authentication and integrity",
        ],
      },
      {
        heading: "Limitations",
        points: [
          "Complex implementation",
          "Key management issues",
          "Performance overhead",
        ],
      },
    ],
  },

  // ===============================
  // FUTURE OF CRYPTOGRAPHY
  // ===============================
  {
    title: "Future of Cryptography",
    description:
      "Cryptography continues to evolve with new technologies and threats.",
    sections: [
      {
        heading: "Emerging Trends",
        points: [
          "Post-quantum cryptography",
          "Zero-knowledge proofs",
          "Homomorphic encryption",
          "Blockchain-based security",
        ],
      },
    ],
  },
];
