import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./components/Layout";
import Start from "./pages/Start";

// Main Pages
import Home from "./pages/Home";
import Linux from "./pages/Linux";
import CyberLaws from "./pages/CyberLaws";
import Blockchain from "./pages/Blockchain";
import Cryptography from "./pages/Cryptography";
import Platforms from "./pages/Platforms";
import About from "./pages/About";

// Cyber Laws Sub-Pages
import LawsHome from "./pages/cyber-laws/LawsHome";
import CyberCrimes from "./pages/cyber-laws/CyberCrimes";
import ITAct from "./pages/cyber-laws/ITAct";
import Ethics from "./pages/cyber-laws/Ethics";

// Linux Sub-Pages
import LinuxHome from "./pages/linux/LinuxHome";
import LinuxBasics from "./pages/linux/LinuxBasics";
import LinuxFiles from "./pages/linux/LinuxFiles";
import LinuxNetworking from "./pages/linux/LinuxNetworking";
import LinuxBash from "./pages/linux/LinuxBash";

// Tools Pages
import ToolsHome from "./pages/tools/ToolsHome";
import Nmap from "./pages/tools/Nmap";
import TheHarvester from "./pages/tools/theHarvester";
import Wireshark from "./pages/tools/Wireshark";
import Tcpdump from "./pages/tools/Tcpdump";
import Netcat from "./pages/tools/Netcat";
import Bettercap from "./pages/tools/Bettercap";
import BurpSuite from "./pages/tools/BurpSuite";
import OWASPZAP from "./pages/tools/OWASPZAP";
import SQLmap from "./pages/tools/SQLmap";
import Hydra from "./pages/tools/Hydra";
import JohnTheRipper from "./pages/tools/JohnTheRipper";
import Hashcat from "./pages/tools/Hashcat";
import AircrackNg from "./pages/tools/AircrackNg";
import Shodan from "./pages/tools/Shodan";
import Maltego from "./pages/tools/Maltego";
import Sherlock from "./pages/tools/Sherlock";

// Cryptography Sub-Pages
import CryptoHome from "./pages/cryptography/CryptoHome";
import Symmetric from "./pages/cryptography/Symmetric";
import Asymmetric from "./pages/cryptography/Asymmetric";
import Hashing from "./pages/cryptography/Hashing";
import DigitalSignatures from "./pages/cryptography/DigitalSignatures";

// Blockchain Sub-Pages
import BlockchainHome from "./pages/blockchain/BlockchainHome";
import HowItWorks from "./pages/blockchain/HowItWorks";
import SmartContracts from "./pages/blockchain/SmartContracts";
import Security from "./pages/blockchain/Security";

// Cybersecurity Sub-Pages
import CyberHome from "./pages/cybersecurity/CyberHome";
import Concepts from "./pages/cybersecurity/Concepts";
import Attacks from "./pages/cybersecurity/Attacks";
import Vulnerabilities from "./pages/cybersecurity/Vulnerabilities";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>

          {/* ================= MAIN ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/linux" element={<Linux />} />
          <Route path="/tools" element={<ToolsHome />} />
          <Route path="/cyber-laws" element={<CyberLaws />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/cryptography" element={<Cryptography />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/about" element={<About />} />

          {/* ================= CYBER LAWS ================= */}
          <Route path="/cyber-laws/home" element={<LawsHome />} />
          <Route path="/cyber-laws/cyber-crimes" element={<CyberCrimes />} />
          <Route path="/cyber-laws/it-act" element={<ITAct />} />
          <Route path="/cyber-laws/ethics" element={<Ethics />} />

          {/* ================= LINUX ================= */}
          <Route path="/linux/home" element={<LinuxHome />} />
          <Route path="/linux/basics" element={<LinuxBasics />} />
          <Route path="/linux/files" element={<LinuxFiles />} />
          <Route path="/linux/networking" element={<LinuxNetworking />} />
          <Route path="/linux/bash" element={<LinuxBash />} />

          {/* ================= TOOLS ================= */}
          <Route path="/tools/nmap" element={<Nmap />} />
          <Route path="/tools/theharvester" element={<TheHarvester />} />
          <Route path="/tools/wireshark" element={<Wireshark />} />
          <Route path="/tools/tcpdump" element={<Tcpdump />} />
          <Route path="/tools/netcat" element={<Netcat />} />
          <Route path="/tools/bettercap" element={<Bettercap />} />
          <Route path="/tools/burp-suite" element={<BurpSuite />} />
          <Route path="/tools/owasp-zap" element={<OWASPZAP />} />
          <Route path="/tools/sqlmap" element={<SQLmap />} />
          <Route path="/tools/hydra" element={<Hydra />} />
          <Route path="/tools/john-the-ripper" element={<JohnTheRipper />} />
          <Route path="/tools/hashcat" element={<Hashcat />} />
          <Route path="/tools/aircrack-ng" element={<AircrackNg />} />
          <Route path="/tools/shodan" element={<Shodan />} />
          <Route path="/tools/maltego" element={<Maltego />} />
          <Route path="/tools/sherlock" element={<Sherlock />} />

          {/* ================= CRYPTOGRAPHY ================= */}
          <Route path="/cryptography/home" element={<CryptoHome />} />
          <Route path="/cryptography/symmetric" element={<Symmetric />} />
          <Route path="/cryptography/asymmetric" element={<Asymmetric />} />
          <Route path="/cryptography/hashing" element={<Hashing />} />
          <Route
            path="/cryptography/digital-signatures"
            element={<DigitalSignatures />}
          />

          {/* ================= BLOCKCHAIN ================= */}
          <Route path="/blockchain/home" element={<BlockchainHome />} />
          <Route path="/blockchain/how-it-works" element={<HowItWorks />} />
          <Route path="/blockchain/smart-contracts" element={<SmartContracts />} />
          <Route path="/blockchain/security" element={<Security />} />

          {/* ================= CYBERSECURITY ================= */}
          <Route path="/cybersecurity/home" element={<CyberHome />} />
          <Route path="/cybersecurity/concepts" element={<Concepts />} />
          <Route path="/cybersecurity/attacks" element={<Attacks />} />
          <Route
            path="/cybersecurity/vulnerabilities"
            element={<Vulnerabilities />}
          />

        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-white font-sans">
      <AnimatedRoutes />
    </div>
  );
}
