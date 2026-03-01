import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

// ================= VISITOR TRACKING =================
import { VisitorProvider, useVisitorIP, useVisitHistory } from "./context/VisitorContext";
import { logPageVisit } from "./utils/trackVisitor";

import Layout from "./components/Layout";
import Start from "./pages/Start";

// ================= MAIN PAGES =================
import Home from "./pages/Home";
import Linux from "./pages/Linux";
import Cheatsheet from "./pages/Cheatsheet";
import CyberLaws from "./pages/CyberLaws";
import Blockchain from "./pages/Blockchain";
import Cryptography from "./pages/Cryptography";
import CyberNews from "./pages/Cyber_News";
import About from "./pages/About";
import Admin from "./pages/admin";
import PortfolioCVSection from "./pages/PortfolioCVSection";

// ================= CYBER LAWS =================
import LawsHome from "./pages/cyber-laws/LawsHome";
import CyberCrimes from "./pages/cyber-laws/CyberCrimes";
import ITAct from "./pages/cyber-laws/ITAct";
import Ethics from "./pages/cyber-laws/Ethics";

// ================= LINUX =================
import LinuxHome from "./pages/linux/LinuxHome";
import LinuxBasics from "./pages/linux/LinuxBasics";
import LinuxFiles from "./pages/linux/LinuxFiles";
import LinuxNetworking from "./pages/linux/LinuxNetworking";
import Linuxtoolscmd from "./pages/linux/Linuxtoolscmd";

// ================= TOOLS =================
import ToolsHome from "./pages/Tools";
import ToolPage from "./pages/tools/ToolPage";
import CyberToolkit from "./pages/Toolkit";

// ================= CRYPTOGRAPHY =================
import CryptoHome from "./pages/cryptography/CryptoHome";
import Symmetric from "./pages/cryptography/Symmetric";
import Asymmetric from "./pages/cryptography/Asymmetric";
import Hashing from "./pages/cryptography/Hashing";
import DigitalSignatures from "./pages/cryptography/DigitalSignatures";

// ================= BLOCKCHAIN =================
import BlockchainHome from "./pages/blockchain/BlockchainHome";
import HowItWorks from "./pages/blockchain/HowItWorks";
import SmartContracts from "./pages/blockchain/SmartContracts";
import Security from "./pages/blockchain/Security";

// ================= CYBERSECURITY =================
import CyberHome from "./pages/cybersecurity/CyberHome";
import Concepts from "./pages/cybersecurity/Concepts";
import Attacks from "./pages/cybersecurity/Attacks";
import Vulnerabilities from "./pages/cybersecurity/Vulnerabilities";

/* ===============================
   SCROLL TO TOP + PAGE TRACKER
   Fires on every route change.
   visitorData is available here
   from the VisitorProvider above.
================================ */
function ScrollToTop() {
  const { pathname } = useLocation();
  const visitorData = useVisitorIP();
  const { addVisit } = useVisitHistory();

  useEffect(() => {
    logPageVisit(pathname, visitorData, addVisit);
  },);

  return null;
}

/* ===============================
   ANIMATED ROUTES
================================ */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>

            {/* ================= MAIN ================= */}
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/linux" element={<Linux />} />
            <Route path="/cyber-laws" element={<CyberLaws />} />
            <Route path="/blockchain" element={<Blockchain />} />
            <Route path="/cryptography" element={<Cryptography />} />
            <Route path="/cyber-news" element={<CyberNews />} />
            <Route path="/cheatsheet" element={<Cheatsheet />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/portfolio" element={<PortfolioCVSection />} />

            {/* ================= TOOLS ================= */}
            <Route path="/tools" element={<ToolsHome />} />
            <Route path="/tools/toolkit" element={<CyberToolkit />} />
            <Route path="/tools/:toolId" element={<ToolPage />} />

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
            <Route path="/linux/toolscmd" element={<Linuxtoolscmd />} />

            {/* ================= CRYPTOGRAPHY ================= */}
            <Route path="/cryptography/home" element={<CryptoHome />} />
            <Route path="/cryptography/symmetric" element={<Symmetric />} />
            <Route path="/cryptography/asymmetric" element={<Asymmetric />} />
            <Route path="/cryptography/hashing" element={<Hashing />} />
            <Route path="/cryptography/digital-signatures" element={<DigitalSignatures />} />

            {/* ================= BLOCKCHAIN ================= */}
            <Route path="/blockchain/home" element={<BlockchainHome />} />
            <Route path="/blockchain/how-it-works" element={<HowItWorks />} />
            <Route path="/blockchain/smart-contracts" element={<SmartContracts />} />
            <Route path="/blockchain/security" element={<Security />} />

            {/* ================= CYBERSECURITY ================= */}
            <Route path="/cybersecurity/home" element={<CyberHome />} />
            <Route path="/cybersecurity/concepts" element={<Concepts />} />
            <Route path="/cybersecurity/attacks" element={<Attacks />} />
            <Route path="/cybersecurity/vulnerabilities" element={<Vulnerabilities />} />

          </Route>
        </Routes>
      </AnimatePresence>
      <Analytics />
    </>
  );
}

/* ===============================
   APP ROOT
   VisitorProvider wraps everything
   → IP is accessible in every
     component via useVisitorIP()
================================ */
export default function App() {
  return (
    <VisitorProvider>
      <div className="min-h-screen bg-bg text-white font-sans">
        <AnimatedRoutes />
      </div>
    </VisitorProvider>
  );
}