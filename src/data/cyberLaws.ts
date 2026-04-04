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
  impact: string;
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
      "Cyber laws in India regulate digital activities involving computers, networks, and the internet. The Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 form the legal framework for preventing cybercrime, protecting personal data, regulating electronic transactions, and ensuring secure digital communication across the country.",

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
      "Cyber law governs legal issues related to computers, networks, and the internet",
      "Information Technology Act, 2000 is India's primary cyber legislation",
      "Section 43 – Covers unauthorized access, data damage, and denial of service attacks",
      "Section 66 – Criminalizes computer-related offences committed dishonestly or fraudulently",
      "Sections 66C & 66D – Address identity theft and online cheating by personation",
      "Section 66E – Protects privacy by criminalizing unauthorized capture and sharing of private images",
      "Section 66F – Defines cyber terrorism as acts threatening national security through cyber means",
      "Section 67, 67A, 67B – Regulate obscene, sexually explicit, and child abuse content online",
      "Section 69 – Grants government powers for interception, monitoring, and decryption for security purposes",
      "Section 72 & 72A – Criminalize breach of confidentiality and unauthorized disclosure of information",
      "Digital Personal Data Protection Act, 2023 establishes comprehensive framework for personal data protection",
      "DPDP Act grants individuals rights to access, correction, erasure, and data portability",
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
          "Cybercriminals impersonated legitimate banks by sending sophisticated phishing emails and SMS messages containing malicious links designed to mimic official bank communications. Victims unknowingly entered their login credentials, OTPs, and card details on counterfeit banking websites that perfectly replicated genuine bank portals, resulting in unauthorized access to accounts and illegal fund transfers totaling crores of rupees.",
        lawApplied:
          "IT Act Section 66C (Identity Theft), Section 66D (Cheating by Personation using Computer Resources), and Section 43 (Unauthorized Access)",
        severity: "High",
        impact:
          "Direct financial loss to victims, erosion of trust in digital banking systems, identity misuse for further frauds, psychological trauma to affected individuals",
        punishmentHint:
          "Imprisonment up to 3 years and/or fine up to ₹1 lakh under Sections 66C and 66D",
        tags: ["Phishing", "Banking Fraud", "Identity Theft", "Financial Crime"],
        examTip:
          "Link phishing attacks with identity theft (66C) and personation (66D). Mention how Section 43 applies to unauthorized access. Use real-world context for better marks.",
      },

      {
        title: "Cyber Stalking on Social Media",
        icon: "📱",
        shortDescription: "Persistent online harassment using fake identities and threatening messages",
        description:
          "The victim experienced sustained harassment through multiple fake social media profiles created by the perpetrator. The harassment included threatening messages, stalking behavior, unauthorized use and morphing of personal photographs, posting defamatory content, and creating fake profiles to impersonate the victim, causing severe mental distress, anxiety, and privacy violations over several months.",
        lawApplied:
          "IT Act Section 66E (Violation of Privacy), Section 67 (Publishing Obscene Content), and IPC Section 354D (Stalking)",
        severity: "Medium",
        impact:
          "Severe psychological trauma and mental health issues, damage to personal and professional reputation, invasion of privacy and dignity, fear for personal safety, erosion of trust in social media platforms",
        punishmentHint:
          "Imprisonment up to 3 years with fine under Section 67; up to 5 years under IPC 354D for stalking",
        tags: ["Cyber Stalking", "Privacy Violation", "Social Media Abuse", "Harassment"],
        examTip:
          "Mention both IT Act (66E, 67) and IPC provisions (354D). Emphasize mental harassment and privacy breach. Discuss the role of social media platforms in such cases.",
      },

      {
        title: "Corporate Data Breach and Leak",
        icon: "💾",
        shortDescription: "Massive leak of customer data due to inadequate security measures",
        description:
          "A major corporate organization suffered a significant data breach due to failure to implement reasonable security practices as mandated by law. Hackers exploited vulnerabilities in the company's systems, leading to unauthorized access and massive leakage of sensitive customer data including Aadhaar numbers, PAN details, contact information, financial records, and passwords affecting millions of users. The leaked data appeared on dark web marketplaces.",
        lawApplied:
          "Digital Personal Data Protection Act, 2023, IT Act Section 43A (Compensation for failure to protect data), and Section 72 (Breach of Confidentiality)",
        severity: "High",
        impact:
          "Loss of customer trust and brand reputation, potential identity theft for millions of users, legal penalties and regulatory action, financial compensation liabilities, stock price decline, increased vulnerability to secondary attacks",
        punishmentHint:
          "Heavy monetary penalties under DPDP Act 2023 (up to ₹250 crores), compensation to affected individuals under Section 43A, criminal liability under Section 72",
        tags: ["Data Breach", "DPDP Act 2023", "Corporate Negligence", "Information Security"],
        examTip:
          "Always connect Section 43A with DPDP Act 2023 for comprehensive answers on data protection. Mention reasonable security practices and corporate liability. Discuss preventive measures.",
      },

      {
        title: "Government Website Hacking and Defacement",
        icon: "🏛️",
        shortDescription: "Unauthorized intrusion, data theft, and website defacement",
        description:
          "A group of hackers illegally accessed a government-owned website by exploiting security vulnerabilities. They modified the website content, posted anti-national messages, defaced public information pages, stole sensitive government data, and compromised the integrity of public digital infrastructure. The attack disrupted government services and spread misinformation among citizens.",
        lawApplied:
          "IT Act Section 65 (Tampering with Computer Source Documents), Section 66 (Computer-Related Offences), Section 66F (Cyber Terrorism), and Section 70 (Protected Systems)",
        severity: "High",
        impact:
          "National security risk and breach of critical infrastructure, widespread public misinformation, disruption of essential government services, loss of system credibility and public trust, international embarrassment",
        punishmentHint:
          "Imprisonment up to 3 years and/or fine under Sections 65 and 66; Life imprisonment under Section 66F if classified as cyber terrorism",
        tags: ["Hacking", "Website Defacement", "Government Systems", "Cyber Terrorism"],
        examTip:
          "Use keywords like 'unauthorized access', 'tampering', and 'critical infrastructure' when citing Sections 65, 66, and 70. If national security is involved, mention Section 66F (cyber terrorism).",
      },

      {
        title: "Ransomware Attack on Healthcare System",
        icon: "🏥",
        shortDescription: "Malware encrypts hospital data demanding ransom payment",
        description:
          "Cybercriminals deployed ransomware that encrypted critical patient records, medical databases, and operational systems of a major hospital network. The attack disrupted healthcare services, prevented access to patient histories and treatment records, and demanded substantial cryptocurrency payment for decryption keys. Hospital operations were paralyzed for several days, affecting patient care and emergency services.",
        lawApplied:
          "IT Act Section 43 (Unauthorized access and data damage), Section 66 (Computer-related offences), Section 66F (Cyber Terrorism if critical infrastructure), and IPC Section 384 (Extortion)",
        severity: "High",
        impact:
          "Life-threatening disruption to healthcare services, compromise of sensitive patient medical records, financial extortion, loss of critical medical data, potential medical malpractice due to unavailable patient histories, violation of patient privacy and confidentiality",
        punishmentHint:
          "Imprisonment up to 3 years under IT Act sections; up to 10 years under IPC 384 for extortion; Life imprisonment if classified as cyber terrorism under Section 66F",
        tags: ["Ransomware", "Healthcare", "Critical Infrastructure", "Extortion"],
        examTip:
          "Emphasize the critical infrastructure aspect and link to both IT Act and IPC provisions. Mention patient safety implications and healthcare-specific data protection requirements.",
      },

      {
        title: "Child Pornography Distribution Network",
        icon: "👶",
        shortDescription: "Online sharing of child sexual abuse material",
        description:
          "Law enforcement agencies uncovered a sophisticated online network involved in creating, storing, and distributing child sexual abuse material (CSAM) through encrypted messaging platforms and dark web forums. The perpetrators used advanced technology to evade detection while exploiting and victimizing minors, sharing explicit content across international borders.",
        lawApplied:
          "IT Act Section 67B (Publishing or transmitting child sexual abuse material), POCSO Act 2012, and IPC provisions for sexual offences against children",
        severity: "High",
        impact:
          "Severe exploitation and traumatization of minor victims, long-term psychological damage to children, normalization of child abuse, international trafficking concerns, erosion of child safety online",
        punishmentHint:
          "First conviction: Imprisonment up to 5 years with fine up to ₹10 lakh; Subsequent conviction: Imprisonment up to 7 years with fine up to ₹10 lakh under Section 67B",
        tags: ["CSAM", "Child Protection", "POCSO Act", "Dark Web"],
        examTip:
          "Section 67B has the strictest penalties in IT Act. Always mention POCSO Act in conjunction. Emphasize the zero-tolerance policy for crimes against children.",
      },
    ],

    // -------------------------------
    // THEORY SECTIONS
    // -------------------------------
    sections: [
      {
        heading: "Meaning and Scope of Cyber Law",
        points: [
          "Governs legal aspects of computers, networks, digital technologies, and internet usage",
          "Regulates activities performed using digital platforms, electronic devices, and online services",
          "Addresses cybercrime including hacking, phishing, identity theft, online fraud, and cyber terrorism",
          "Covers comprehensive data protection, privacy rights, and information security obligations",
          "Governs electronic commerce, online contracts, digital payments, and electronic transactions",
          "Provides legal recognition and validity to electronic records, digital signatures, and online documents",
          "Applicable to individuals, organizations, corporations, government bodies, and intermediaries",
          "Defines cyber offences, establishes liabilities, and prescribes penalties and punishments",
          "Ensures accountability and responsibility for misuse of computer systems, networks, and data",
          "Facilitates investigation, prosecution, and adjudication of cyber offences and digital crimes",
          "Establishes jurisdiction over offences involving computer systems or data located in India",
          "Maintains trust, safety, security, and legal order in the digital environment and cyberspace",
          "Protects critical information infrastructure essential for national security and public welfare",
          "Regulates intermediary liability for content hosted on digital platforms and social media",
        ]
      },
      {
        heading: "Information Technology Act, 2000 – Overview",
        points: [
          "Enacted to provide legal framework for electronic governance and digital transactions in India",
          "Provides legal recognition and validity to electronic records, digital documents, and e-signatures",
          "Grants legal status to digital and electronic signatures equivalent to handwritten signatures",
          "Facilitates e-governance by enabling online delivery of government services and digital administration",
          "Promotes paperless administration, electronic filing, and digital record-keeping in government",
          "Supports secure online transactions, electronic communication, and digital business operations",
          "Creates comprehensive legal framework for e-commerce, online business, and digital marketplaces",
          "Defines various cyber offences including hacking, identity theft, data theft, and online fraud",
          "Prescribes penalties, monetary fines, and imprisonment for different categories of cyber crimes",
          "Ensures legal protection against unauthorized access, data theft, and misuse of computer systems",
          "Establishes Cyber Appellate Tribunal for appeals against orders of adjudicating officers",
          "Empowers government with interception, monitoring, and decryption powers for national security",
          "Amended in 2008 to address emerging cyber threats, data privacy, and intermediary liability",
          "Provides for blocking of websites and online content that threatens sovereignty and public order",
        ]
      },
      {
        heading: "Important Sections of the IT Act, 2000",
        points: [
          "Section 43 – Penalty for unauthorized access, data damage, virus introduction, or denial of services (Civil liability with compensation)",
          "Section 65 – Punishment for tampering with computer source documents (Imprisonment up to 3 years and/or fine)",
          "Section 66 – Computer-related offences committed dishonestly or fraudulently (Imprisonment up to 3 years and/or fine up to ₹5 lakh)",
          "Section 66A – [Struck down by Supreme Court] Previously criminalized offensive messages through communication services",
          "Section 66B – Punishment for dishonestly receiving stolen computer resources or communication devices",
          "Section 66C – Identity theft using passwords, digital signatures, or unique identifiers (Imprisonment up to 3 years and/or fine up to ₹1 lakh)",
          "Section 66D – Cheating by personation using computer resources or online platforms (Imprisonment up to 3 years and/or fine up to ₹1 lakh)",
          "Section 66E – Violation of privacy by intentionally capturing, publishing, or transmitting private images (Imprisonment up to 3 years or fine up to ₹2 lakh)",
          "Section 66F – Cyber terrorism – Acts threatening unity, integrity, security, or sovereignty of India (Imprisonment up to life)",
          "Section 67 – Publishing or transmitting obscene material in electronic form (First conviction: 3 years + ₹5 lakh; Second: 5 years + ₹10 lakh)",
          "Section 67A – Publishing or transmitting sexually explicit material online (First conviction: 5 years + ₹10 lakh; Second: 7 years + ₹10 lakh)",
          "Section 67B – Publishing or transmitting child sexual abuse material (First: 5 years + ₹10 lakh; Second: 7 years + ₹10 lakh)",
          "Section 69 – Government powers for interception, monitoring, decryption of information for sovereignty, security, and public order",
          "Section 70 – Protected systems – Unauthorized access to critical information infrastructure (Imprisonment up to 10 years)",
          "Section 72 – Breach of confidentiality and privacy by authorized persons accessing systems (Imprisonment up to 2 years and/or fine up to ₹1 lakh)",
          "Section 72A – Punishment for disclosure of information in breach of lawful contract (Imprisonment up to 3 years or fine up to ₹5 lakh)",
        ]
      },
      {
        heading: "Digital Personal Data Protection Act, 2023",
        points: [
          "Comprehensive legislation for protection of digital personal data of individuals in India",
          "Applies to processing of digital personal data within territory of India",
          "Also applies to processing outside India if connected with offering goods or services to individuals in India",
          "Grants individuals (Data Principals) rights to access, correction, erasure, and data portability",
          "Imposes obligations on Data Fiduciaries (entities processing data) for lawful and transparent processing",
          "Requires valid consent from Data Principals before collecting and processing personal data",
          "Mandates reasonable security safeguards to prevent data breaches and unauthorized access",
          "Requires notification to Data Protection Board and affected individuals in case of data breaches",
          "Establishes Data Protection Board of India as regulatory authority with adjudication powers",
          "Provides for significant financial penalties for non-compliance (up to ₹250 crores)",
          "Special provisions for processing children's data requiring verifiable parental consent",
          "Exemptions for government processing for national security, public order, and sovereignty",
          "Emphasizes accountability, transparency, and data minimization principles",
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
      "Global cyber laws establish comprehensive frameworks for regulating digital technologies, protecting personal data and privacy, preventing cybercrime, ensuring cybersecurity, and promoting international cooperation in addressing cross-border cyber threats and digital challenges.",

    examSummary: [
      "Global cyber laws emphasize strong privacy protection and comprehensive data security",
      "GDPR (EU) is the most influential and stringent data protection regulation globally",
      "United States follows a sector-based, decentralized approach to cyber law regulation",
      "Cross-border cybercrime requires international cooperation and harmonized legal frameworks",
      "Budapest Convention on Cybercrime is the first and most important international cybercrime treaty",
      "Countries increasingly adopt data localization requirements for sovereignty and security",
      "International cooperation essential for cybercrime investigation and evidence sharing",
    ],

    caseStudies: [
      {
        title: "Cambridge Analytica - Facebook Data Scandal",
        icon: "📊",
        shortDescription: "Massive unauthorized harvesting of Facebook user data for political purposes",
        description:
          "Cambridge Analytica, a political consulting firm, harvested personal data of approximately 87 million Facebook users without proper consent. The data was obtained through a personality quiz app and used for political advertising and voter profiling during elections. The scandal exposed how personal data could be weaponized for political manipulation and raised global concerns about data privacy and social media governance.",
        lawApplied:
          "GDPR violations (EU), Federal Trade Commission regulations (USA), Data Protection Act (UK)",
        severity: "High",
        impact:
          "Erosion of trust in social media platforms, stricter data protection regulations worldwide, massive financial penalties for Facebook, increased awareness about digital privacy rights, catalyzed GDPR enforcement",
        punishmentHint:
          "Facebook fined $5 billion by FTC (USA), £500,000 by UK ICO, ongoing GDPR investigations and penalties",
        tags: ["GDPR", "Data Privacy", "Social Media", "Political Manipulation"],
        examTip:
          "This case is a landmark example of GDPR enforcement and demonstrates extraterritorial application of data protection laws. Mention consent violations and purpose limitation principles.",
      },

      {
        title: "WannaCry Ransomware Global Attack",
        icon: "🌍",
        shortDescription: "Worldwide ransomware attack affecting critical infrastructure",
        description:
          "WannaCry ransomware attack in May 2017 affected over 200,000 computers across 150 countries, encrypting data and demanding Bitcoin ransom payments. The attack exploited Windows vulnerabilities and targeted hospitals, businesses, government agencies, and telecommunications. UK's National Health Service (NHS) was severely impacted with cancelled surgeries and disrupted patient care.",
        lawApplied:
          "Computer Fraud and Abuse Act (USA), Computer Misuse Act (UK), Budapest Convention on Cybercrime provisions",
        severity: "High",
        impact:
          "Global economic losses estimated at $4 billion, disruption of critical healthcare services, exposure of vulnerabilities in critical infrastructure, international security concerns, accelerated cybersecurity investments",
        punishmentHint:
          "North Korean hackers identified as perpetrators, international sanctions imposed, criminal charges filed by multiple countries",
        tags: ["Ransomware", "Critical Infrastructure", "International Crime", "Cyber Warfare"],
        examTip:
          "Excellent example of cross-border cybercrime requiring international cooperation. Mention Budapest Convention's role in facilitating investigations across jurisdictions.",
      },
    ],

    sections: [
      {
        heading: "🇪🇺 European Union – General Data Protection Regulation (GDPR)",
        points: [
          "Most comprehensive and stringent data protection law globally, effective from May 2018",
          "Protects personal data and privacy rights of all EU citizens and residents",
          "Applies extraterritorially – any organization processing EU citizens' data must comply globally",
          "Fundamental rights include access, rectification, erasure ('right to be forgotten'), data portability, and restriction of processing",
          "Requires explicit, informed, and freely given consent for data processing",
          "Mandates data protection by design and by default in all systems and processes",
          "72-hour mandatory breach notification to supervisory authorities and affected individuals",
          "Severe financial penalties – up to €20 million or 4% of global annual turnover, whichever is higher",
          "Appoints Data Protection Officers (DPOs) mandatory for public authorities and large-scale processing",
          "Establishes supervisory authorities in each EU member state with enforcement powers",
          "Emphasizes principles of transparency, accountability, purpose limitation, and data minimization",
          "Special protections for sensitive data including health, biometric, genetic, and children's data",
        ],
      },
      {
        heading: "🇺🇸 United States – Cyber Law Framework",
        points: [
          "Follows sector-based, decentralized approach without comprehensive federal data protection law",
          "Computer Fraud and Abuse Act (CFAA) – Primary federal cybercrime law criminalizing unauthorized computer access",
          "CFAA covers hacking, unauthorized access, data theft, and distribution of malicious code",
          "Electronic Communications Privacy Act (ECPA) protects electronic communications and stored data",
          "Health Insurance Portability and Accountability Act (HIPAA) protects health data privacy and security",
          "Gramm-Leach-Bliley Act (GLBA) regulates financial institutions' handling of customer information",
          "Children's Online Privacy Protection Act (COPPA) protects children's online privacy (under 13 years)",
          "California Consumer Privacy Act (CCPA) – State-level comprehensive privacy law with GDPR-like provisions",
          "Federal Trade Commission (FTC) enforces privacy and data security through consumer protection authority",
          "Cybersecurity Information Sharing Act (CISA) promotes sharing of cyber threat information",
          "State-level data breach notification laws require organizations to notify affected individuals",
        ],
      },
      {
        heading: "🇬🇧 United Kingdom – Post-Brexit Data Protection",
        points: [
          "Data Protection Act 2018 implements GDPR in UK law and supplements it",
          "UK GDPR applies post-Brexit with similar provisions to EU GDPR",
          "Information Commissioner's Office (ICO) is the independent supervisory authority",
          "Computer Misuse Act 1990 criminalizes unauthorized access, modification, and impairment of computer systems",
          "Emphasis on transparency, accountability, and individual data protection rights",
          "Strong enforcement including significant financial penalties for violations",
          "Investigatory Powers Act 2016 grants surveillance and interception powers for national security",
        ],
      },
      {
        heading: "🇨🇳 China – Cybersecurity and Data Laws",
        points: [
          "Cybersecurity Law of China (2017) establishes comprehensive cybersecurity framework",
          "Personal Information Protection Law (PIPL) – China's GDPR equivalent for data protection",
          "Data Security Law governs data processing, cross-border transfer, and national security",
          "Strict data localization requirements – critical data must be stored within China",
          "Mandatory security assessments for cross-border data transfers",
          "Strong government oversight and control over data and internet content",
          "Critical Information Infrastructure (CII) operators face stringent security obligations",
          "Requires real-name registration for internet services reducing anonymity",
          "Significant penalties for non-compliance with data protection and cybersecurity requirements",
        ],
      },
      {
        heading: "🇦🇺 Australia – Privacy and Cybersecurity Laws",
        points: [
          "Privacy Act 1988 governs collection, use, storage, and disclosure of personal information",
          "Mandatory data breach notification scheme (Notifiable Data Breaches scheme)",
          "Applies to government agencies, businesses with annual turnover exceeding AUD 3 million, and health service providers",
          "Australian Privacy Principles (APPs) set standards for handling personal information",
          "Telecommunications and Other Legislation Amendment (Assistance and Access) Act for law enforcement access",
          "Office of the Australian Information Commissioner (OAIC) enforces privacy and data protection",
          "Emphasis on transparency, individual access rights, and security safeguards",
        ],
      },
      {
        heading: "🌐 International Cooperation – Budapest Convention",
        points: [
          "Budapest Convention on Cybercrime (2001) – First international treaty on cybercrime",
          "Signed by 68+ countries including USA, UK, EU nations, Canada, Australia, Japan, and India (observer)",
          "Harmonizes national laws on cybercrime across jurisdictions for consistent enforcement",
          "Criminalizes illegal access, illegal interception, data interference, system interference, and computer-related fraud",
          "Facilitates cross-border investigations, mutual legal assistance, and international cooperation",
          "Enables expedited preservation and disclosure of electronic evidence across countries",
          "Establishes 24/7 network of contact points for rapid response to cyber incidents",
          "Provides framework for extradition and prosecution of cybercriminals internationally",
          "Regularly updated protocols address emerging threats like cloud computing and IoT",
        ],
      },
    ],
  },
];