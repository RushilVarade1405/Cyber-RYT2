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
      "Blockchain is a decentralized and distributed digital ledger technology that records transactions across a network of multiple computers (called nodes) instead of relying on a single central authority. Each participant in the network maintains a copy of the ledger, which ensures that all transaction records are consistent and transparent across the system. Once a transaction is verified through a consensus mechanism, it is grouped into a block and permanently added to the blockchain. These blocks are linked together using cryptographic hashes, forming a secure chain. Because each block depends on the previous one, altering any stored data is extremely difficult, making the system immutable. Blockchain uses advanced cryptographic techniques to secure transactions, protect data integrity, and prevent unauthorized access. The decentralized nature eliminates single points of failure and reduces the risk of fraud or manipulation. As a result, blockchain creates a high level of trust among participants, even in environments where they do not know or trust each other. Due to its transparency, security, and reliability, blockchain is widely used in financial applications like cryptocurrencies and digital payments, as well as non-financial sectors such as supply chain management, healthcare, governance, and digital identity systems.",
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
      "Blockchain works by validating transactions using a decentralized network of nodes. Verified transactions are grouped into blocks and linked together using cryptography, ensuring security and immutability. For More information refer above mentioned page which covers detailed inforamtion of How Blockchain works",
    sections: [
      {
        heading: "Transaction Flow",
points:[
  "Transaction initiation",
  "Verification by nodes",
  "Consensus approval",
  "Block creation",
  "Block added to blockchain",
  "Immutable ledger update",
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
      "Consensus mechanisms ensure agreement among nodes on the validity of transactions by allowing the decentralized network to collectively verify and approve data before it is added to the blockchain. They define the rules and processes through which nodes reach a common decision, even in the absence of a central authority. By using mechanisms such as Proof of Work or Proof of Stake, consensus prevents fraudulent transactions, maintains network integrity, and ensures that all copies of the distributed ledger remain consistent and trustworthy.",
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
      "Popular blockchain platforms are widely used for building decentralized applications (dApps), enterprise-level solutions, and Web3 systems. These platforms provide core features such as smart contracts, decentralized consensus, cryptographic security, and interoperability, enabling developers to create secure, transparent, and trustless applications. They support a broad range of use cases, including cryptocurrencies, decentralized finance (DeFi), supply chain management, digital identity, gaming, and non-fungible tokens (NFTs). With strong developer communities and evolving ecosystems, these blockchain platforms play a crucial role in driving innovation across both financial and non-financial sectors.",
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
        name: "Binance Smart Chain",
        description: "Decentralized storage for Web3",
        link: "https://www.bnbchain.org/en/bnb-smart-chain",
      },
    ],
  },

  // ===============================
  // SECURITY
  // ===============================
  {
    title: "Blockchain Security",
    description:
      "Blockchain uses cryptography to secure transactions through techniques such as hashing and digital signatures, which ensure data integrity, confidentiality, and authentication. Hashing converts transaction data into a fixed-length cryptographic hash, making it easy to detect any alteration in the data. Digital signatures verify the identity of the sender and confirm that the transaction has not been modified during transmission. The decentralized structure of blockchain distributes data across a large number of nodes in the network, rather than storing it on a single central server. Each node maintains a copy of the ledger, ensuring consistency and transparency across the system. This distribution removes single points of failure, increases fault tolerance, and makes unauthorized tampering extremely difficult. As a result, blockchain provides a highly secure, reliable, and trust-based framework for recording and managing digital transactions.",
    sections: [
      {
        heading: "Security Techniques",
points: [
  "Hashing algorithms – Detect data tampering using cryptographic hashes",
  "Public-key cryptography – Securely identify users with public and private keys",
  "Digital signatures – Verify transaction authenticity and integrity",
  "Decentralized validation – Multiple nodes verify transactions, not a central authority",
  "Immutability of data – Once recorded, data cannot be altered or deleted",
  "Consensus mechanisms – Network agreement ensures only valid transactions are added",
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
      "Blockchain is evolving rapidly with continuous advancements in scalability, security, and interoperability, allowing networks to handle more transactions efficiently while maintaining strong protection against threats. These improvements enable different blockchain platforms to communicate and work together seamlessly, expanding their real-world usability. As a result, blockchain is expected to transform digital systems by providing transparent, secure, and decentralized solutions across a wide range of sectors. In finance, it enables faster and more secure transactions; in governance, it promotes transparency and trust; in supply chains, it improves traceability and efficiency; and in healthcare, it ensures secure management of sensitive data. With its growing adoption, blockchain has the potential to reshape many industries and redefine how digital trust is established.",
    sections: [
      {
        heading: "Emerging Trends",
points: [
  "Web3 and decentralized internet – Enables users to own data and interact without relying on centralized platforms",
  "Blockchain interoperability – Allows different blockchains to communicate and share data seamlessly",
  "Central Bank Digital Currencies (CBDCs) – Government-backed digital currencies using blockchain for secure transactions",
  "Enterprise blockchain adoption – Businesses use blockchain to improve transparency, security, and efficiency",
  "Smart contract automation – Self-executing contracts reduce intermediaries and operational costs",
  "Tokenization of assets – Real-world assets like land and stocks can be digitally represented on blockchain",
],
      },
    ],
  },  
];