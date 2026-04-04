import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const FOOTER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;800&display=swap');

  @keyframes footer-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
  @keyframes footer-flicker {
    0%,100% { opacity: 1; }
    93%     { opacity: 0.6; }
    95%     { opacity: 1; }
  }
`;

const quickLinks = [
  { name: "Linux",        path: "/linux" },
  { name: "Tools",        path: "/tools" },
  { name: "Cryptography", path: "/cryptography" },
  { name: "Blockchain",   path: "/blockchain" },
  { name: "Cyber_Laws",   path: "/cyber-laws" },
  { name: "About",        path: "/about" },
];

const CyberCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const base: React.CSSProperties = { position: "absolute", width: 10, height: 10 };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 0,    left: 0,  borderTop:    "1px solid", borderLeft:  "1px solid" },
    tr: { top: 0,    right: 0, borderTop:    "1px solid", borderRight: "1px solid" },
    bl: { bottom: 0, left: 0,  borderBottom: "1px solid", borderLeft:  "1px solid" },
    br: { bottom: 0, right: 0, borderBottom: "1px solid", borderRight: "1px solid" },
  };
  return <div style={{ ...base, ...map[pos], borderColor: "rgba(0,255,231,0.5)" }} />;
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{FOOTER_CSS}</style>

      <footer
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.98), rgba(2,5,15,0.95))",
          borderTop: "1px solid rgba(0,255,231,0.12)",
        }}
      >
        {/* Top shimmer */}
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            className="absolute h-full w-1/4"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,231,0.6), transparent)" }}
          />
        </div>

        {/* Atmospheric glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-24 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.04), transparent 70%)" }}
        />

        {/* MAIN FOOTER CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-10">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">

            {/* Brand column */}
            <div className="sm:col-span-1">
              <div className="mb-3">
                <span
                  className="text-lg font-black tracking-widest"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#00ffe7",
                    textShadow: "0 0 10px rgba(0,255,231,0.5)",
                    animation: "footer-flicker 8s infinite",
                  }}
                >
                  CYBER_
                </span>
                <span
                  className="text-lg font-black tracking-widest text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  WORLD
                </span>
              </div>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "#4b5563" }}
              >
                // beginner-first cybersecurity platform.<br />
                // learn. practice. secure.
              </p>

              {/* Status indicator */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(0,255,231,0.04)", border: "1px solid rgba(0,255,231,0.12)" }}
              >
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#00ffe7", boxShadow: "0 0 6px rgba(0,255,231,0.8)" }}
                />
                <span
                  className="text-[10px]"
                  style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,255,231,0.5)" }}
                >
                  ALL SYSTEMS OPERATIONAL
                </span>
              </div>
            </div>

            {/* Quick links */}
            <div className="sm:col-span-1">
              <h4
                className="text-xs font-bold mb-4 tracking-[0.2em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,255,231,0.5)" }}
              >
                // MODULES
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {quickLinks.map(link => (
                  <NavLink key={link.path} to={link.path}>
                    {({ isActive }) => (
                      <motion.div
                        whileHover={{ x: 3 }}
                        className="text-xs py-1 transition-all duration-200 flex items-center gap-1.5"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          color: isActive ? "#00ffe7" : "#4b5563",
                        }}
                        onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#67e8f9"; }}
                        onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#4b5563"; }}
                      >
                        <span style={{ color: isActive ? "#00ffe7" : "rgba(0,255,231,0.2)" }}>›</span>
                        {link.name}
                      </motion.div>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Authors column */}
            <div className="sm:col-span-1">
              <h4
                className="text-xs font-bold mb-4 tracking-[0.2em]"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,255,231,0.5)" }}
              >
                // CREW
              </h4>

              <div className="space-y-2">
                {[
                  { handle: "RYTNIX",   href: "https://github.com/RushilVarade1405", role: "founder & dev" },
                  { handle: "CRUSVEDER",href: "https://github.com/CRUSVEDER",        role: "contributor"  },
                ].map(({ handle, href, role }) => (
                  <a
                    key={handle}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group"
                  >
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-[8px] font-black flex-shrink-0 transition-all duration-200"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        background: "rgba(0,255,231,0.06)",
                        border: "1px solid rgba(0,255,231,0.15)",
                        color: "#00ffe7",
                      }}
                    >
                      {handle[0]}
                    </div>
                    <div>
                      <span
                        className="block text-xs font-bold transition-all duration-200 group-hover:text-cyan-400"
                        style={{ fontFamily: "'Share Tech Mono', monospace", color: "#9ca3af" }}
                      >
                        {handle}
                      </span>
                      <span
                        className="text-[10px]"
                        style={{ fontFamily: "'Share Tech Mono', monospace", color: "#374151" }}
                      >
                        {role}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.15), rgba(59,130,246,0.1), transparent)" }} />
          </div>

          {/* Bottom bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className="text-[10px]"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: "#374151" }}
            >
              © {year} CYBER_WORLD. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {[
                { label: "GitHub/RYTNIX",   href: "https://github.com/RushilVarade1405" },
                { label: "GitHub/CRUSVEDER", href: "https://github.com/CRUSVEDER"        },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] transition-all duration-200"
                  style={{ fontFamily: "'Share Tech Mono', monospace", color: "#374151" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#00ffe7"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#374151"}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.1), transparent)" }} />
      </footer>
    </>
  );
}