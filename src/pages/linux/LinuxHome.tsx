import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  Copy,
  Download,
  Monitor,
  Cpu,
  HardDrive,
  ShieldCheck,
  Play,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                   bg-white/10 backdrop-blur border border-white/20
                   hover:bg-white/20 text-sm text-gray-200 transition"
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
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="absolute top-4 right-4 flex items-center gap-1
                 text-xs text-cyan-300 hover:text-cyan-200 transition"
    >
      <Copy size={14} />
      Copy
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
}: {
  title: string;
  icon: any;
  content: string;
  links?: { label: string; url: string }[];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative p-6 rounded-2xl bg-white/5
                 border border-white/10 hover:border-cyan-400/40 transition"
    >
      <CopyButton text={content} />

      <h3 className="flex items-center gap-3 text-lg font-semibold
                     text-cyan-400 mb-3">
        <Icon size={22} />
        {title}
      </h3>

      <pre className="text-sm text-gray-300 whitespace-pre-wrap
                      leading-relaxed mb-4">
        {content}
      </pre>

      {links && (
        <div className="flex flex-col gap-2">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm
                         text-cyan-300 hover:text-cyan-200 transition"
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
        className="px-7 py-1 max-w-6xl mx-auto"
      >
        {/* ================= HEADER ================= */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl font-bold text-cyan-400 mb-10 mt-6"
        >
          Kali Linux Installation on VMware
        </motion.h1>

        {/* ================= REQUIREMENTS ================= */}
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
          />
        </div>

        {/* ================= WINDOWS ================= */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-cyan-300 mb-6"
        >
          Windows Installation (VMware Workstation)
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <StepCard
            title="Step 1: Download VMware Workstation"
            icon={Download}
            content={`Download VMware Workstation Player for Windows
Install the software and restart if prompted`}
            links={[
              {
                label: "VMware Workstation Player",
                url: "https://www.vmware.com/products/workstation-player.html",
              },
            ]}
          />

          <StepCard
            title="Step 2: Download Kali Linux VMware Image"
            icon={ShieldCheck}
            content={`Download Kali Linux VMware image (.7z)
File size approximately 3–4 GB`}
            links={[
              {
                label: "Kali Linux VMware Images",
                url: "https://www.kali.org/get-kali/#kali-virtual-machines",
              },
            ]}
          />

          <StepCard
            title="Step 3: Extract Kali Linux Files"
            icon={HardDrive}
            content={`Install 7-Zip
Extract the Kali .7z file
Folder will contain .vmx and .vmdk files`}
            links={[
              {
                label: "Download 7-Zip",
                url: "https://www.7-zip.org/",
              },
            ]}
          />

          <StepCard
            title="Step 4: Start Kali Linux"
            icon={Play}
            content={`Open VMware Workstation
Click Open → select the .vmx file
Click Play → choose "I Copied It"

Login:
Username: kali
Password: kali`}
          />
        </div>

        {/* ================= MACOS ================= */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold text-cyan-300 mb-6"
        >
          macOS Installation (VMware Fusion)
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 pb-16">
          <StepCard
            title="Step 1: Download VMware Fusion"
            icon={Monitor}
            content={`Download VMware Fusion for macOS
Install the .dmg file
Allow required permissions`}
            links={[
              {
                label: "VMware Fusion",
                url: "https://www.vmware.com/products/fusion.html",
              },
            ]}
          />

          <StepCard
            title="Step 2: Download Kali Linux VMware Image"
            icon={ShieldCheck}
            content={`Download Kali Linux VMware image (.7z)
File size approximately 3–4 GB`}
            links={[
              {
                label: "Kali Linux VMware Images",
                url: "https://www.kali.org/get-kali/#kali-virtual-machines",
              },
            ]}
          />

          <StepCard
            title="Step 3: Extract Kali Linux Files"
            icon={HardDrive}
            content={`Install The Unarchiver
Extract the Kali .7z file
Folder will contain .vmx and .vmdk files`}
            links={[
              {
                label: "The Unarchiver",
                url: "https://theunarchiver.com/",
              },
            ]}
          />

          <StepCard
            title="Step 4: Start Kali Linux"
            icon={Play}
            content={`Open VMware Fusion
Click Open → select the .vmx file
Click Play
Allow macOS security permissions

Login:
Username: kali
Password: kali`}
          />
        </div>
      </motion.section>
    </>
  );
}
