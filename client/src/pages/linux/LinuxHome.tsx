import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  Copy,
  Check,
  Monitor,
  Cpu,
  HardDrive,
  ShieldCheck,
  Play,
  ExternalLink,
  ArrowLeft,
  Settings,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

/* ===============================
   ANIMATION VARIANTS (TS SAFE)
================================ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* ===============================
   STICKY BACK BUTTON
================================ */
function StickyBackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-24 left-7 z-50"
    >
      <Link
        to="/linux"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                   bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                   backdrop-blur-md border border-cyan-400/30
                   hover:border-cyan-400/50 hover:from-cyan-500/20 
                   hover:to-blue-500/20 text-sm font-medium text-gray-200 
                   transition-all duration-300 shadow-lg shadow-cyan-500/10"
      >
        <ArrowLeft size={16} />
        Back to Linux
      </Link>
    </motion.div>
  );
}

/* ===============================
   COPY BUTTON
================================ */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5
                 text-xs font-medium rounded-lg
                 bg-cyan-500/10 border border-cyan-400/30
                 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/20
                 hover:border-cyan-400/50 transition-all duration-200"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check size={14} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={14} />
          Copy
        </>
      )}
    </button>
  );
}

/* ===============================
   STEP CARD
================================ */
function StepCard({
  title,
  icon: Icon,
  content,
  links,
  variant = "default",
}: {
  title: string;
  icon: any;
  content: string;
  links?: { label: string; url: string }[];
  variant?: "default" | "highlight";
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative p-6 rounded-2xl 
                 border transition-all duration-300 group
                 ${
                   variant === "highlight"
                     ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-500/5"
                     : "bg-white/5 border-white/10 hover:border-cyan-400/40"
                 }`}
    >
      <CopyButton text={content} />

      <div className="flex items-start gap-3 mb-4">
        <div
          className={`p-2.5 rounded-xl ${
            variant === "highlight"
              ? "bg-cyan-500/20 text-cyan-300"
              : "bg-cyan-500/10 text-cyan-400"
          } group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={22} />
        </div>
        <h3 className="text-lg font-semibold text-cyan-400 pt-2">{title}</h3>
      </div>

      <pre
        className="text-sm text-gray-300 whitespace-pre-wrap
                      leading-relaxed mb-4 font-mono pl-1"
      >
        {content}
      </pre>

      {links && links.length > 0 && (
        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium
                         text-cyan-300 hover:text-cyan-200 
                         hover:gap-3 transition-all duration-200
                         w-fit"
            >
              <ExternalLink size={14} />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ===============================
   INFO BANNER
================================ */
function InfoBanner() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start gap-3 p-4 rounded-xl
                 bg-blue-500/10 border border-blue-400/30 mb-10"
    >
      <AlertCircle size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-gray-300">
        <strong className="text-blue-300 font-semibold">
          Important Note:
        </strong>{" "}
        Make sure virtualization is enabled in your BIOS/UEFI settings (Intel
        VT-x or AMD-V). This is required for VirtualBox to run 64-bit virtual
        machines.
      </div>
    </motion.div>
  );
}

/* ===============================
   PROGRESS INDICATOR
================================ */
function ProgressIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    "Requirements",
    "Install VirtualBox",
    "Download Kali",
    "Extract Files",
    "Import & Run",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 mb-12 overflow-x-auto pb-2"
    >
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                       whitespace-nowrap transition-all duration-300
                       ${
                         index <= currentStep
                           ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                           : "bg-white/5 text-gray-500 border border-white/10"
                       }`}
          >
            {index < currentStep ? (
              <CheckCircle2 size={14} />
            ) : (
              <span className="w-4 h-4 rounded-full border-2 border-current" />
            )}
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 ${
                index < currentStep ? "bg-cyan-400/50" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* ===============================
   MAIN PAGE
================================ */
export default function LinuxHome() {
  return (
    <>
      {/* Sticky Back Button */}
      <StickyBackButton />

      {/* Full Page Padding: 7x1 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="px-7 py-1 max-w-6xl mx-auto"
      >
        {/* ================= HEADER ================= */}
        <motion.div variants={fadeUp} className="mb-10 mt-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
            Kali Linux Installation Guide
          </h1>
          <p className="text-gray-400 text-lg">
            Complete step-by-step guide to install Kali Linux on VirtualBox
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={-1} />

        {/* Info Banner */}
        <InfoBanner />

        {/* ================= REQUIREMENTS ================= */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-cyan-300 mb-6 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold">
            0
          </span>
          System Requirements
        </motion.h2>

        <div className="grid gap-6 mb-14">
          <StepCard
            title="Recommended System Requirements"
            icon={Cpu}
            content={`OS: Windows 10 / 11 (64-bit) or macOS
RAM: 8 GB recommended (4 GB minimum)
CPU: 64-bit with virtualization enabled
Storage: Minimum 30 GB free space
Internet: Required for downloads
Virtualization: Enable in BIOS / UEFI (Windows)`}
            variant="highlight"
          />
        </div>

        {/* ================= STEP 1: VIRTUALBOX ================= */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-cyan-300 mb-6 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold">
            1
          </span>
          Install VirtualBox
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <StepCard
            title="For Windows Users"
            icon={Monitor}
            content={`Download VirtualBox for Windows
Run the installer (.exe file)
Follow installation wizard
Restart if prompted`}
            links={[
              {
                label: "Download VirtualBox for Windows",
                url: "https://www.virtualbox.org/wiki/Downloads",
              },
            ]}
          />

          <StepCard
            title="For macOS Users"
            icon={Monitor}
            content={`Download VirtualBox for macOS
Open the .dmg file
Run VirtualBox.pkg installer
Allow system extensions in Security settings`}
            links={[
              {
                label: "Download VirtualBox for macOS",
                url: "https://www.virtualbox.org/wiki/Downloads",
              },
            ]}
          />
        </div>

        {/* ================= STEP 2: KALI DOWNLOAD ================= */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-cyan-300 mb-6 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold">
            2
          </span>
          Download Kali Linux
        </motion.h2>

        <div className="grid gap-6 mb-16">
          <StepCard
            title="Download Kali Linux VirtualBox Image"
            icon={ShieldCheck}
            content={`Download Kali Linux VirtualBox image (.7z)
File size approximately 3–4 GB
Choose 64-bit version for best performance`}
            links={[
              {
                label: "Kali Linux VirtualBox Images",
                url: "https://www.kali.org/get-kali/#kali-virtual-machines",
              },
            ]}
            variant="highlight"
          />
        </div>

        {/* ================= STEP 3: EXTRACT ================= */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-cyan-300 mb-6 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold">
            3
          </span>
          Extract Files
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <StepCard
            title="For Windows Users"
            icon={HardDrive}
            content={`Install 7-Zip (if not already installed)
Right-click the downloaded .7z file
Select "7-Zip → Extract Here"
Wait for extraction to complete
You'll get a .vbox and .vdi file`}
            links={[
              {
                label: "Download 7-Zip",
                url: "https://www.7-zip.org/",
              },
            ]}
          />

          <StepCard
            title="For macOS Users"
            icon={HardDrive}
            content={`Install The Unarchiver (if not already installed)
Double-click the downloaded .7z file
Wait for extraction to complete
You'll get a .vbox and .vdi file`}
            links={[
              {
                label: "Download The Unarchiver",
                url: "https://theunarchiver.com/",
              },
            ]}
          />
        </div>

        {/* ================= STEP 4: IMPORT & RUN ================= */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-cyan-300 mb-6 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold">
            4
          </span>
          Import and Run Kali Linux
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <StepCard
            title="Import Virtual Machine"
            icon={Settings}
            content={`Open VirtualBox
Click "Add" (or File → Add)
Navigate to extracted folder
Select the .vbox file
Click "Open"`}
          />

          <StepCard
            title="Start Kali Linux"
            icon={Play}
            content={`Select "Kali Linux" from the list
Click "Start" (green arrow)
Wait for boot process

Default Login:
Username: kali
Password: kali`}
            variant="highlight"
          />
        </div>

        {/* ================= OPTIONAL SETTINGS ================= */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-cyan-300 mb-6 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold">
            +
          </span>
          Optional: Optimize Settings
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 pb-16">
          <StepCard
            title="Increase Performance"
            icon={Cpu}
            content={`Right-click VM → Settings
System → Processor: Allocate 2+ CPU cores
Display → Video Memory: Set to 128 MB
Enable 3D Acceleration (if available)`}
          />

          <StepCard
            title="Enable Shared Clipboard & Drag-Drop"
            icon={Settings}
            content={`Settings → General → Advanced
Shared Clipboard: Bidirectional
Drag'n'Drop: Bidirectional

Install Guest Additions for full features`}
          />
        </div>

        {/* ================= SUCCESS MESSAGE ================= */}
        <motion.div
          variants={fadeUp}
          className="flex items-start gap-3 p-5 rounded-xl
                     bg-gradient-to-r from-cyan-500/10 to-green-500/10 
                     border border-cyan-400/30 mb-10"
        >
          <CheckCircle2
            size={24}
            className="text-cyan-400 mt-0.5 flex-shrink-0"
          />
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-1">
              Installation Complete!
            </h3>
            <p className="text-sm text-gray-300">
              You now have a fully functional Kali Linux virtual machine. Start
              exploring penetration testing tools and cybersecurity features.
            </p>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}