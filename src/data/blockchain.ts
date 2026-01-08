export interface BlockchainPlatform {
  name: string;
  description: string;
  link: string;
}

export interface BlockchainTopic {
  title: string;
  description: string;
  sections?: {
    heading: string;
    points: string[];
  }[];
  platforms?: BlockchainPlatform[];
}

export const blockchainData: BlockchainTopic[] = [
  // ===============================
  // INTRODUCTION
  // ===============================
  {
    title: "What is Blockchain?",
    description:
      "Blockchain is a decentralized and distributed digital ledger that securely records transactions across multiple computers without a central authority. Once data is added, it cannot be changed, ensuring security, transparency, and trust.",
    sections: [
      {
        heading: "Core Characteristics",
points: [
  "Decentralized network with no single authority",
  "Distributed ledger shared across nodes",
  "Immutable records once data is confirmed",
  "Cryptographically secured transactions",
  "Peer-to-peer data exchange without intermediaries",
  "Transparent transaction history",
  "Consensus mechanism validates transactions",
  "Data stored in blocks linked by hashes",
  "High resistance to data tampering",
  "Improved trust among network participants",
  "Fault-tolerant system architecture",
  "Works without central server",
  "Enhances security and data integrity",
  "Supports smart contracts (programmable logic)",
  "Suitable for financial and non-financial use cases",
]
      },
      {
        heading: "Why Blockchain Matters",
points: [
  "Removes intermediaries",
  "Builds trust between untrusted parties",
  "Improves transparency and security",
  "Reduces transaction costs",
  "Speeds up transaction processing",
  "Prevents data manipulation",
  "Ensures data integrity",
  "Provides permanent audit trail",
  "Minimizes fraud and corruption",
  "Enables secure peer-to-peer transactions",
  "Improves system reliability",
]
      },
    ],
  },

  // ===============================
  // HOW BLOCKCHAIN WORKS
  // ===============================
  {
    title: "How Blockchain Works",
    description:
      "Blockchain works by validating transactions using a decentralized network of nodes. Verified transactions are grouped into blocks and linked together using cryptography, ensuring security and immutability.",
    sections: [
      {
        heading: "Transaction Flow",
points: [
  "User initiates a transaction",
  "Transaction is broadcast to the network",
  "Nodes verify the transaction details",
  "Consensus mechanism approves the transaction",
  "Validated transactions are grouped into a block",
  "Block is cryptographically linked to the previous block",
  "Block is added to the blockchain",
  "Ledger is updated across all nodes",
  "Transaction becomes permanent and immutable",
]
      },
    ],
  },

  // ===============================
  // CONSENSUS MECHANISMS
  // ===============================
  {
    title: "Consensus Mechanisms",
    description:
      "Consensus mechanisms ensure agreement among nodes on transaction validity.",
    sections: [
      {
        heading: "Popular Mechanisms",
 points: [
  "Proof of Work (PoW) – mining-based validation",
  "Proof of Stake (PoS) – stake-based validation",
  "Delegated Proof of Stake (DPoS) – validator voting system",
  "Proof of Authority (PoA) – identity-based validation",
]
      },
    ],
  },

  // ===============================
  // BLOCKCHAIN PLATFORMS 🔥
  // ===============================
  {
    title: "Blockchain Platforms",
    description:
      "Popular blockchain platforms used for building decentralized applications, enterprise solutions, and Web3 systems.",
    platforms: [
      {
        name: "Ethereum",
        description: "Smart contracts and decentralized applications",
        link: "https://ethereum.org",
      },
      {
        name: "Bitcoin",
        description: "Peer-to-peer decentralized digital currency",
        link: "https://bitcoin.org",
      },
      {
        name: "Solana",
        description: "High-speed blockchain for scalable dApps",
        link: "https://solana.com",
      },
      {
        name: "Polygon",
        description: "Layer 2 scaling solution for Ethereum",
        link: "https://polygon.technology",
      },
      {
        name: "Hyperledger Fabric",
        description: "Enterprise-grade permissioned blockchain",
        link: "https://www.hyperledger.org/use/fabric",
      },
      {
        name: "IPFS",
        description: "Decentralized storage for Web3",
        link: "https://ipfs.io",
      },
    ],
  },

  // ===============================
  // SECURITY
  // ===============================
  {
    title: "Blockchain Security",
    description:
      "Blockchain uses cryptography and decentralization to provide strong security guarantees.",
    sections: [
      {
        heading: "Security Techniques",
        points: [
          "Hashing algorithms",
          "Public-key cryptography",
          "Digital signatures",
          "Decentralized validation",
        ],
      },
    ],
  },

  // ===============================
  // FUTURE
  // ===============================
  {
    title: "Future of Blockchain",
    description:
      "Blockchain is evolving rapidly and is expected to transform digital systems.",
    sections: [
      {
        heading: "Emerging Trends",
        points: [
          "Web3 and decentralized internet",
          "Blockchain interoperability",
          "Central Bank Digital Currencies (CBDCs)",
          "Enterprise blockchain adoption",
        ],
      },
    ],
  },
];