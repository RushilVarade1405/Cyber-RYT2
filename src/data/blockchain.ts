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
      "Blockchain is a decentralized, distributed, and immutable digital ledger used to record transactions securely without a central authority.",
    sections: [
      {
        heading: "Core Characteristics",
        points: [
          "Decentralized network with no single authority",
          "Distributed ledger shared across nodes",
          "Immutable records once data is confirmed",
          "Cryptographically secured transactions",
        ],
      },
      {
        heading: "Why Blockchain Matters",
        points: [
          "Removes intermediaries",
          "Builds trust between untrusted parties",
          "Improves transparency and security",
        ],
      },
    ],
  },

  // ===============================
  // HOW BLOCKCHAIN WORKS
  // ===============================
  {
    title: "How Blockchain Works",
    description:
      "Blockchain works by validating transactions through a network of nodes and grouping them into cryptographically linked blocks.",
    sections: [
      {
        heading: "Transaction Flow",
        points: [
          "User initiates a transaction",
          "Transaction is broadcast to the network",
          "Nodes validate the transaction",
          "Transactions are grouped into a block",
          "Block is added to the blockchain",
        ],
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
          "Proof of Work (PoW)",
          "Proof of Stake (PoS)",
          "Delegated Proof of Stake (DPoS)",
          "Proof of Authority (PoA)",
        ],
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
