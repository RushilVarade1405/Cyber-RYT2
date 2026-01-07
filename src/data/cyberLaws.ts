// ===============================
// TYPES
// ===============================

export interface CyberLawLink {
  label: string;
  path: string;
  icon: string;
}

export interface CyberLawCaseStudy {
  title: string;
  description: string;
  lawApplied: string;

  // Optional UI / Exam helpers
  shortDescription?: string;
  severity?: "Low" | "Medium" | "High";
  tags?: string[];
  examTip?: string;
}

export interface CyberLawSection {
  region: "India" | "Global";
  title: string;
  description: string;

  links?: CyberLawLink[];
  examSummary?: string[];
  caseStudies?: CyberLawCaseStudy[];

  sections: {
    heading: string;
    points: string[];
  }[];
}

// ===============================
// CYBER LAWS DATA
// ===============================

export const cyberLaws: CyberLawSection[] = [
  // ===============================
  // 🇮🇳 CYBER LAWS IN INDIA
  // ===============================
  {
    region: "India",
    title: "Cyber Laws in India",
    description:
      "Cyber laws in India govern the use of computers, networks, digital devices, and the internet. These laws aim to prevent cybercrime, protect data and privacy, regulate electronic transactions, and ensure secure digital communication.",

    links: [
      {
        label: "Cyber Crimes",
        path: "/cyber-laws/cyber-crimes",
        icon: "⚠️",
      },
      {
        label: "IT Act, 2000",
        path: "/cyber-laws/it-act",
        icon: "📜",
      },
      {
        label: "Cyber Ethics",
        path: "/cyber-laws/ethics",
        icon: "🧠",
      },
    ],

    examSummary: [
      "Cyber law deals with crimes and legal issues involving computers and the internet",
      "The Information Technology Act, 2000 is the primary cyber law in India",
      "Section 43 addresses unauthorized access and damage to computer systems",
      "Section 66 provides criminal punishment for computer-related offences",
      "Sections 66C and 66D deal with identity theft and online cheating",
      "Section 66F defines cyber terrorism",
      "Section 67 punishes publishing obscene content online",
      "The Digital Personal Data Protection Act, 2023 safeguards personal data",
    ],

    caseStudies: [
      {
        title: "Online Banking Phishing Scam",
        shortDescription:
          "Fraudsters impersonate banks to steal login credentials.",
        description:
          "Cyber criminals sent fake bank emails asking users to verify their accounts. Victims entered login credentials on fraudulent websites, leading to unauthorized withdrawals.",
        lawApplied:
          "IT Act Section 66C (Identity Theft) and Section 66D (Cheating by Personation)",
        severity: "High",
        tags: ["Phishing", "Banking Fraud", "Identity Theft"],
        examTip:
          "Always mention Sections 66C and 66D when answering banking fraud questions.",
      },
      {
        title: "Cyber Stalking on Social Media",
        shortDescription:
          "Harassment using fake profiles and threatening messages.",
        description:
          "An individual was repeatedly harassed through fake social media accounts, threatening messages, and misuse of personal images.",
        lawApplied:
          "IT Act Section 66E (Privacy Violation) and Section 67 (Obscene Content)",
        severity: "Medium",
        tags: ["Cyber Stalking", "Privacy", "Social Media"],
        examTip:
          "Use Sections 66E and 67 for social media harassment cases.",
      },
      {
        title: "Corporate Data Breach",
        shortDescription:
          "Customer data exposed due to weak cybersecurity practices.",
        description:
          "A company failed to implement proper security safeguards, resulting in leakage of sensitive customer information.",
        lawApplied:
          "Digital Personal Data Protection Act, 2023 and IT Act Section 43A",
        severity: "High",
        tags: ["Data Breach", "DPDP Act", "Corporate Liability"],
        examTip:
          "Mention DPDP Act, 2023 along with Section 43A for data breach answers.",
      },
      {
        title: "Government Website Hacking",
        shortDescription:
          "Unauthorized access leads to website defacement.",
        description:
          "Hackers gained unauthorized access to a government website and altered its content, causing public misinformation.",
        lawApplied:
          "IT Act Section 65 (Tampering with Source Code) and Section 66",
        severity: "High",
        tags: ["Hacking", "Defacement", "Government Systems"],
        examTip:
          "Sections 65 and 66 are essential when explaining hacking incidents.",
      },
    ],

    sections: [
      {
        heading: "Meaning and Scope of Cyber Law",
        points: [
          "Cyber law deals with legal aspects of computers and internet usage",
          "It includes cybercrime, data protection, and e-commerce",
          "Applies to individuals, organizations, and governments",
          "Covers offences involving computer systems located in India",
        ],
      },
      {
        heading: "Information Technology Act, 2000",
        points: [
          "Provides legal recognition to electronic records and signatures",
          "Facilitates e-governance and online transactions",
          "Defines cyber offences and prescribes penalties",
        ],
      },
      {
        heading: "Important Sections of the IT Act",
        points: [
          "Section 43 – Unauthorized access and data damage",
          "Section 65 – Tampering with computer source code",
          "Section 66 – Computer-related offences",
          "Section 66C – Identity theft",
          "Section 66D – Cheating by personation",
          "Section 66E – Privacy violation",
          "Section 66F – Cyber terrorism",
        ],
      },
    ],
  },

  // ===============================
  // 🌍 GLOBAL CYBER LAWS
  // ===============================
  {
    region: "Global",
    title: "Cyber Laws Around the World",
    description:
      "Cyber laws across the world regulate digital technologies, protect personal data, prevent cybercrime, and ensure cybersecurity through national and international legal frameworks.",

    examSummary: [
      "Global cyber laws emphasize privacy and user consent",
      "GDPR is the most influential international data protection law",
      "CFAA governs cybercrime in the United States",
      "Many countries follow consent-based data protection models",
      "International cybercrime requires cross-border cooperation",
      "The Budapest Convention is the first international cybercrime treaty",
    ],

    sections: [
      {
        heading: "European Union – GDPR",
        points: [
          "Protects personal data of EU citizens",
          "Applies globally if EU residents' data is processed",
          "Right to access, rectify, and erase personal data",
          "Mandatory breach notification within 72 hours",
          "Penalties up to €20 million or 4% of global turnover",
        ],
      },
      {
        heading: "United States",
        points: [
          "Computer Fraud and Abuse Act (CFAA)",
          "Criminalizes unauthorized access to computer systems",
          "California Consumer Privacy Act (CCPA)",
          "Sector-based approach to data protection",
        ],
      },
      {
        heading: "United Kingdom",
        points: [
          "Data Protection Act, 2018",
          "UK GDPR principles after Brexit",
          "Strong emphasis on transparency and accountability",
        ],
      },
      {
        heading: "China",
        points: [
          "Cybersecurity Law of China",
          "Strict data localization requirements",
          "Strong government control over data flow",
        ],
      },
      {
        heading: "Australia",
        points: [
          "Privacy Act, 1988",
          "Mandatory data breach notification scheme",
          "Applies to both public and private sectors",
        ],
      },
      {
        heading: "International Cyber Law",
        points: [
          "Budapest Convention on Cybercrime",
          "Cross-border investigation cooperation",
          "Electronic evidence sharing mechanisms",
        ],
      },
    ],
  },
];
