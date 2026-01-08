// ======================================================
// CYBER LAW TYPES (UI + EXAM FRIENDLY)
// ======================================================

/**
 * Navigation link for cyber law sub-pages
 * Used for cards, buttons, or menus
 */
export interface CyberLawLink {
  label: string;        // Display text
  path: string;         // Route path
  icon: string;         // Emoji or icon
  color?: string;       // Optional UI color (Tailwind class)
}

/**
 * Case study structure for exams + UI cards
 */
export interface CyberLawCaseStudy {
  title: string;
  icon: string;
  shortDescription: string;
  description: string;
  lawApplied: string;
  severity: "Low" | "Medium" | "High";
  impact: string; // ✅ ADD THIS
  punishmentHint?: string;
  tags: string[];
  examTip: string;
}

/**
 * Section-wise cyber law structure
 * Used for India + Global segregation
 */
export interface CyberLawSection {
  region: "India" | "Global";
  title: string;
  description: string;

  // Optional UI helpers
  badge?: string;               // Example: "Important", "Exam Focus"
  themeColor?: string;          // Tailwind color reference

  links?: CyberLawLink[];       // Navigation links
  examSummary?: string[];       // Quick revision points
  caseStudies?: CyberLawCaseStudy[];

  sections: {
    heading: string;
    points: string[];
  }[];
}

// ======================================================
// CYBER LAWS MASTER DATA
// ======================================================

export const cyberLaws: CyberLawSection[] = [

  // ======================================================
  // 🇮🇳 CYBER LAWS IN INDIA
  // ======================================================
  {
    region: "India",
    title: "Cyber Laws in India",
    badge: "Exam Focus",
    themeColor: "cyan",
    description:
      "Cyber laws in India regulate digital activities involving computers, networks, and the internet. They aim to prevent cybercrime, protect personal data, regulate electronic transactions, and ensure secure digital communication.",

    // -------------------------------
    // NAVIGATION LINKS
    // -------------------------------
    links: [
      {
        label: "Cyber Crimes",
        path: "/cyber-laws/cyber-crimes",
        icon: "⚠️",
        color: "text-red-400",
      },
      {
        label: "IT Act, 2000",
        path: "/cyber-laws/it-act",
        icon: "📜",
        color: "text-yellow-400",
      },
      {
        label: "Cyber Ethics",
        path: "/cyber-laws/ethics",
        icon: "🧠",
        color: "text-purple-400",
      },
    ],

    // -------------------------------
    // EXAM QUICK REVISION
    // -------------------------------
    examSummary: [
      "Cyber law deals with crimes and legal issues related to computers and the internet",
      "Information Technology Act, 2000 is the primary cyber law in India",
      "Section 43 – Unauthorized access and data damage",
      "Section 66 – Criminal punishment for computer-related offences",
      "Sections 66C & 66D – Identity theft and online cheating",
      "Section 66F – Cyber terrorism",
      "Section 67 – Obscene content online",
      "Digital Personal Data Protection Act, 2023 protects personal data",
    ],

// -------------------------------
// CASE STUDIES (ENHANCED)
// -------------------------------
caseStudies: [
  {
    title: "Online Banking Phishing Scam",
    icon: "🏦",
    shortDescription: "Fraudulent emails trick users into revealing banking credentials",
    description:
      "Cyber criminals impersonated legitimate banks by sending fake emails and SMS messages containing malicious links. Victims unknowingly entered their login credentials on counterfeit banking websites, resulting in unauthorized access and illegal fund transfers.",
    lawApplied:
      "IT Act Section 66C (Identity Theft) and Section 66D (Cheating by Personation using Computer Resources)",
    severity: "High",
    impact:
      "Financial loss, identity misuse, erosion of trust in online banking systems",
    punishmentHint:
      "Imprisonment up to 3 years and/or fine up to ₹1 lakh",
    tags: ["Phishing", "Banking Fraud", "Identity Theft"],
    examTip:
      "Clearly link phishing with identity theft (66C) and personation (66D) for full marks.",
  },

  {
    title: "Cyber Stalking on Social Media",
    icon: "📱",
    shortDescription: "Persistent online harassment using fake identities",
    description:
      "The victim was repeatedly harassed through fake social media profiles involving threatening messages, stalking behavior, and unauthorized use of personal photographs, causing mental distress and privacy violations.",
    lawApplied:
      "IT Act Section 66E (Violation of Privacy) and Section 67 (Publishing Obscene Content)",
    severity: "Medium",
    impact:
      "Psychological trauma, reputational damage, invasion of personal privacy",
    punishmentHint:
      "Imprisonment up to 3 years with fine under Section 67",
    tags: ["Cyber Stalking", "Privacy Violation", "Social Media Abuse"],
    examTip:
      "Mention mental harassment + privacy breach while explaining Sections 66E and 67.",
  },

  {
    title: "Corporate Data Breach",
    icon: "💾",
    shortDescription: "Leak of sensitive customer information due to weak security",
    description:
      "A corporate organization failed to implement reasonable security practices, leading to unauthorized access and leakage of sensitive customer data such as Aadhaar details, contact information, and financial records.",
    lawApplied:
      "Digital Personal Data Protection Act, 2023 and IT Act Section 43A",
    severity: "High",
    impact:
      "Loss of customer trust, legal penalties, financial compensation liabilities",
    punishmentHint:
      "Compensation for affected users and heavy monetary penalties under DPDP Act",
    tags: ["Data Breach", "DPDP Act", "Corporate Negligence"],
    examTip:
      "Always connect Section 43A with the DPDP Act, 2023 for modern data protection answers.",
  },

  {
    title: "Government Website Hacking",
    icon: "🏛️",
    shortDescription: "Unauthorized intrusion and website defacement",
    description:
      "Hackers illegally accessed a government-owned website and modified its content, spreading false information and compromising the integrity of public digital infrastructure.",
    lawApplied:
      "IT Act Section 65 (Tampering with Computer Source Documents) and Section 66 (Computer-Related Offences)",
    severity: "High",
    impact:
      "National security risk, public misinformation, loss of system credibility",
    punishmentHint:
      "Imprisonment up to 3 years and/or fine",
    tags: ["Hacking", "Website Defacement", "Government Systems"],
    examTip:
      "Use keywords like ‘unauthorized access’ and ‘tampering’ when citing Sections 65 and 66.",
  },
],

    // -------------------------------
    // THEORY SECTIONS
    // -------------------------------
    sections: [
      {
        heading: "Meaning and Scope of Cyber Law",
        points: [
  "Deals with legal aspects of computers, networks, and internet usage",
  "Regulates activities performed using digital and electronic technologies",
  "Includes cybercrime such as hacking, phishing, identity theft, and online fraud",
  "Covers data protection, privacy rights, and information security",
  "Governs electronic commerce, online contracts, and digital transactions",
  "Provides legal recognition to electronic records and digital communication",
  "Applicable to individuals, organizations, companies, and government bodies",
  "Defines offences, liabilities, and penalties in cyberspace",
  "Ensures accountability for misuse of computer systems and networks",
  "Supports investigation and prosecution of cyber offences",
  "Covers offences involving computer systems or data located in India",
  "Helps maintain trust, safety, and order in the digital environment",
]
      },
      {
        heading: "Information Technology Act, 2000",
        points: [
  "Provides legal recognition to electronic records and digital documents",
  "Grants legal validity to digital and electronic signatures",
  "Facilitates e-governance by enabling online delivery of government services",
  "Promotes paperless administration and electronic filing of documents",
  "Supports secure online transactions and electronic communication",
  "Creates a legal framework for e-commerce and digital business",
  "Defines various cyber offences such as hacking, identity theft, and online fraud",
  "Prescribes penalties, fines, and imprisonment for cyber crimes",
  "Ensures legal protection against misuse of computer systems and data",
]

      },
      {
        heading: "Important Sections of the IT Act",
      points: [
  "Section 43 – Unauthorized access, data damage, or denial of services",
  "Section 65 – Tampering with computer source code",
  "Section 66 – Computer-related offences committed dishonestly or fraudulently",
  "Section 66B – Dishonestly receiving stolen computer resources or devices",
  "Section 66C – Identity theft using passwords or digital signatures",
  "Section 66D – Cheating by personation through online platforms",
  "Section 66E – Violation of privacy by capturing or sharing private images",
  "Section 66F – Cyber terrorism affecting national security",
  "Section 67 – Publishing or transmitting obscene content in electronic form",
  "Section 67A – Publishing sexually explicit content online",
  "Section 67B – Publishing child sexual abuse material",
  "Section 69 – Government powers for interception, monitoring, and decryption",
  "Section 70 – Protected systems related to national security",
  "Section 72 – Breach of confidentiality and privacy by authorized persons",
  "Section 72A – Disclosure of information in breach of lawful contract",
]

      },
    ],
  },

// ======================================================
  // 🌍 GLOBAL CYBER LAWS
  // ======================================================
  {
    region: "Global",
    title: "Cyber Laws Around the World",
    badge: "International",
    themeColor: "emerald",
    description:
      "Global cyber laws regulate digital technologies, protect personal data, prevent cybercrime, and promote international cooperation in cybersecurity.",

    examSummary: [
      "Global cyber laws emphasize privacy and data protection",
      "GDPR is the most influential data protection law",
      "USA follows a sector-based cyber law model",
      "Cross-border cybercrime needs international cooperation",
      "Budapest Convention is the first cybercrime treaty",
    ],

    sections: [
      {
        heading: "🇪🇺 European Union – GDPR",
        points: [
          "Protects personal data of EU citizens",
          "Applies globally if EU data is processed",
          "Right to access, rectify, and erase data",
          "72-hour data breach notification rule",
          "Heavy financial penalties for violations",
        ],
      },
      {
        heading: "🇺🇸 United States",
        points: [
          "Computer Fraud and Abuse Act (CFAA)",
          "Criminalizes unauthorized system access",
          "Sector-based data protection laws",
        ],
      },
      {
        heading: "🇬🇧 United Kingdom",
        points: [
          "Data Protection Act, 2018",
          "UK GDPR after Brexit",
          "Focus on transparency and accountability",
        ],
      },
      {
        heading: "🇨🇳 China",
        points: [
          "Cybersecurity Law of China",
          "Strict data localization rules",
          "Strong government control over data",
        ],
      },
      {
        heading: "🇦🇺 Australia",
        points: [
          "Privacy Act, 1988",
          "Mandatory data breach notifications",
          "Applies to public and private sectors",
        ],
      },
      {
        heading: "🌐 International Cyber Law",
        points: [
          "Budapest Convention on Cybercrime",
          "Supports cross-border investigations",
          "Facilitates electronic evidence sharing",
        ],
      },
    ],
  },
];