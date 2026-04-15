/* ============================================================
   IMPORTS
============================================================ */
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   FONT INJECTION
============================================================ */
const FONT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes nav-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
  @keyframes corner-blink {
    0%,85%,100% { opacity: 0; }
    88%,97%     { opacity: 1; }
  }
  @keyframes neon-flicker {
    0%,100% { opacity: 1; }
    93%     { opacity: 0.5; }
    95%     { opacity: 1; }
    97%     { opacity: 0.7; }
  }
  @keyframes search-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(0,255,231,0.8); }
    50%      { opacity: 0.3; box-shadow: 0 0 2px rgba(0,255,231,0.2); }
  }

  .nav-logo-text {
    font-family: 'Orbitron', sans-serif;
    font-weight: 800;
    letter-spacing: 0.12em;
  }
  .nav-link-text {
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 0.05em;
  }
  .search-spin {
    animation: search-spin 2s linear infinite;
  }
  .pulse-dot {
    animation: pulse-dot 1.5s ease-in-out infinite;
  }

  /* ── SCROLLBAR ── */
  .custom-scrollbar::-webkit-scrollbar { width: 3px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0,255,231,0.3);
    border-radius: 99px;
  }
  .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(0,255,231,0.3) transparent; }

  /* ── RESPONSIVE LINK SIZES ── */
  /* Tablet (768–1023px): compact */
  @media (min-width: 768px) and (max-width: 899px) {
    .nav-desktop-link {
      font-size: 0.68rem !important;
      padding-left: 0.3rem !important;
      padding-right: 0.3rem !important;
    }
  }
  /* Tablet landscape / small laptop (900–1199px) */
  @media (min-width: 900px) and (max-width: 1199px) {
    .nav-desktop-link {
      font-size: 0.78rem !important;
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }
  }
  /* Desktop (1200–1399px) */
  @media (min-width: 1200px) and (max-width: 1399px) {
    .nav-desktop-link {
      font-size: 0.88rem !important;
      padding-left: 0.65rem !important;
      padding-right: 0.65rem !important;
    }
  }
  /* Large desktop (1400px+) */
  @media (min-width: 1400px) {
    .nav-desktop-link {
      font-size: 0.95rem !important;
      padding-left: 0.8rem !important;
      padding-right: 0.8rem !important;
    }
  }

  /* ── TOUCH TARGET SAFETY ── */
  @media (hover: none) and (pointer: coarse) {
    .nav-touch-target {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* ── REDUCED MOTION ── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ============================================================
   NAV LINKS CONFIG
============================================================ */
const links = [
  { name: "Home",         path: "/" },
  { name: "Linux",        path: "/linux" },
  { name: "Tools",        path: "/tools" },
  { name: "Cheatsheet",   path: "/cheatsheet" },
  { name: "Cyber_Laws",   path: "/cyber-laws" },
  { name: "Blockchain",   path: "/blockchain" },
  { name: "Cryptography", path: "/cryptography" },
  { name: "Cyber_News",   path: "/cyber-news" },
  { name: "Reports",      path: "/reports" },
  { name: "About",        path: "/about" },
];

/* ============================================================
   ICON COMPONENTS
============================================================ */
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

const SearchIcon = ({ className = "", style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = ({ className = "", style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MenuIcon = ({ className = "", style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

/* ============================================================
   CYBER CORNER BRACKET
============================================================ */
const Corner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const base: React.CSSProperties = {
    position: "absolute", width: 8, height: 8,
    animation: "corner-blink 5s infinite",
    pointerEvents: "none",
  };
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 0,    left: 0,  borderTop:    "1px solid", borderLeft:  "1px solid" },
    tr: { top: 0,    right: 0, borderTop:    "1px solid", borderRight: "1px solid" },
    bl: { bottom: 0, left: 0,  borderBottom: "1px solid", borderLeft:  "1px solid" },
    br: { bottom: 0, right: 0, borderBottom: "1px solid", borderRight: "1px solid" },
  };
  return <div style={{ ...base, ...map[pos], borderColor: "rgba(0,255,231,0.7)" }} />;
};

/* ============================================================
   SCAN LINE (reusable)
============================================================ */
const ScanLine = ({ bottom = false }: { bottom?: boolean }) => (
  <div
    className="absolute left-0 right-0 h-px overflow-hidden pointer-events-none"
    style={{ [bottom ? "bottom" : "top"]: 0 }}
  >
    <motion.div
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: bottom ? 6 : 4, repeat: Infinity, repeatDelay: bottom ? 4 : 3, ease: "linear" }}
      className="h-full w-1/4"
      style={{ background: `linear-gradient(90deg, transparent, rgba(0,255,231,${bottom ? 0.4 : 0.6}), transparent)` }}
    />
  </div>
);

/* ============================================================
   SEARCH MODAL
============================================================ */
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<HTMLElement[]>([]);
  const inputRef              = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) { setQuery(""); setResults([]); }
    else setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const searchPage = useCallback((value: string) => {
    setQuery(value);
    if (!value.trim()) return setResults([]);
    const elements = Array.from(
      document.querySelectorAll("main h1, main h2, main h3, main p, main li")
    ) as HTMLElement[];
    setResults(
      elements.filter(el => el.innerText.toLowerCase().includes(value.toLowerCase()))
    );
  }, []);

  if (!open) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[999] flex justify-center items-start px-3 sm:px-4"
      style={{
        paddingTop: "clamp(4rem, 10vw, 6rem)",
        background: "rgba(2,5,9,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: -24, opacity: 0 }}
        animate={{ scale: 1,    y: 0,   opacity: 1 }}
        exit={{ scale: 0.95, y: -16, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full"
        style={{ maxWidth: "min(680px, 95vw)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient border */}
        <div
          className="absolute -inset-[1px] rounded-xl opacity-60 blur-sm pointer-events-none"
          style={{ background: "linear-gradient(135deg, #00ffe7, #3b82f6, #a855f7, #00ffe7)" }}
        />
        <div
          className="absolute -inset-[1px] rounded-xl pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(0,255,231,0.5), rgba(59,130,246,0.5), rgba(168,85,247,0.5))" }}
        />

        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.96), rgba(2,5,15,0.98))",
            border: "1px solid rgba(0,255,231,0.2)",
            boxShadow: "0 0 60px rgba(0,255,231,0.1), inset 0 1px 0 rgba(0,255,231,0.1)",
          }}
        >
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
          <ScanLine />

          {/* Input row */}
          <div
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b"
            style={{ borderColor: "rgba(0,255,231,0.15)", background: "rgba(0,255,231,0.03)" }}
          >
            <div className="search-spin flex-shrink-0">
              <SearchIcon className="w-5 h-5" style={{ color: "#00ffe7" }} />
            </div>
            <input
              ref={inputRef}
              value={query}
              onChange={e => searchPage(e.target.value)}
              placeholder="search://across-all-pages..."
              className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-200 placeholder:text-gray-600 min-w-0"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              aria-label="Search query"
            />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close search"
              className="flex-shrink-0 p-1 nav-touch-target flex items-center justify-center"
              style={{ color: "rgba(0,255,231,0.5)", minWidth: 32, minHeight: 32 }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#00ffe7")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(0,255,231,0.5)")}
            >
              <CloseIcon className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Results */}
          <div className="custom-scrollbar" style={{ maxHeight: "min(55vh, 400px)", overflowY: "auto" }}>
            {query && results.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-5 py-8 text-sm text-center"
                style={{ color: "#4b5563", fontFamily: "'Share Tech Mono', monospace" }}
              >
                // no results for "{query}"
              </motion.p>
            )}
            {!query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-5 py-6 text-center"
              >
                <p className="text-xs sm:text-sm" style={{ color: "#374151", fontFamily: "'Share Tech Mono', monospace" }}>
                  // type to search across all page content
                </p>
              </motion.div>
            )}
            <AnimatePresence mode="popLayout">
              {results.map((el, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  onClick={() => { el.scrollIntoView({ behavior: "smooth", block: "center" }); onClose(); }}
                  className="w-full text-left px-4 sm:px-5 py-3 text-sm transition-all duration-200 nav-touch-target"
                  style={{ borderLeft: "2px solid transparent", fontFamily: "'Share Tech Mono', monospace", color: "#9ca3af" }}
                  onMouseEnter={e => {
                    const t = e.currentTarget as HTMLElement;
                    t.style.background = "rgba(0,255,231,0.05)";
                    t.style.borderLeftColor = "#00ffe7";
                    t.style.color = "#00ffe7";
                  }}
                  onMouseLeave={e => {
                    const t = e.currentTarget as HTMLElement;
                    t.style.background = "transparent";
                    t.style.borderLeftColor = "transparent";
                    t.style.color = "#9ca3af";
                  }}
                >
                  <div className="line-clamp-2">{el.innerText}</div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   NAVBAR HEIGHT CONSTANTS — single source of truth
============================================================ */
const NAV_H = {
  mobile:  "3.75rem",  // 60px  — phones
  tablet:  "4rem",     // 64px  — md (768px+)
  desktop: "4.25rem",  // 68px  — lg (1024px+)
};

/* ============================================================
   NAVBAR COMPONENT
============================================================ */
export default function Navbar() {
  const location                      = useLocation();
  const [menuOpen, setMenuOpen]       = useState(false);
  const [hidden, setHidden]           = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const lastScrollRef                 = useRef(0);

  /* Stable, RAF-throttled scroll handler */
  const rafRef = useRef<number | null>(null);
  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const current = window.scrollY;
      setScrolled(current > 20);
      if (window.innerWidth >= 768) {
        setHidden(current > lastScrollRef.current && current > 80);
      } else {
        setHidden(false);
      }
      lastScrollRef.current = current;
      setLastScrollY(current);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setMenuOpen(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(v => !v); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navbarHeight = `clamp(${NAV_H.mobile}, 5vw, ${NAV_H.desktop})`;

  return (
    <>
      <style>{FONT_CSS}</style>

      {/* ── NAVBAR ── */}
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 w-full z-50"
        style={{
          height: navbarHeight,
          background: scrolled
            ? "linear-gradient(to bottom, rgba(0,0,0,0.97), rgba(2,5,15,0.99))"
            : "linear-gradient(to bottom, rgba(0,0,0,0.82), rgba(2,5,15,0.88))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(0,255,231,0.12)",
          boxShadow: scrolled
            ? "0 0 40px rgba(0,255,231,0.06), 0 4px 30px rgba(0,0,0,0.5)"
            : "none",
          transition: "background 0.3s, box-shadow 0.3s",
          willChange: "transform",
        }}
      >
        <ScanLine />

        {/* ── INNER CONTAINER ── */}
        <div
          className="h-full mx-auto flex items-center"
          style={{
            maxWidth: 1440,
            paddingLeft:  "clamp(0.75rem, 3vw, 1.5rem)",
            paddingRight: "clamp(0.75rem, 3vw, 1.5rem)",
            gap: "clamp(0.5rem, 1.5vw, 1rem)",
          }}
        >

          {/* ── LOGO ── */}
          <NavLink to="/" className="relative flex-shrink-0 group" style={{ marginRight: "clamp(0.5rem, 1.5vw, 1rem)" }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative flex items-center"
            >
              <div
                className="absolute -inset-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.12), transparent 70%)" }}
              />
              <span
                className="nav-logo-text relative"
                style={{
                  fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)",
                  color: "#00ffe7",
                  textShadow: "0 0 8px rgba(0,255,231,0.6), 0 0 20px rgba(0,255,231,0.3)",
                  animation: "neon-flicker 10s infinite",
                }}
              >
                CYBER_
              </span>
              <span
                className="nav-logo-text relative"
                style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)", color: "#fff" }}
              >
                WORLD
              </span>
              <span
                className="absolute -top-1.5 -right-5 opacity-50"
                style={{
                  fontSize: "clamp(7px, 0.9vw, 9px)",
                  fontFamily: "'Share Tech Mono', monospace",
                  color: "#00ffe7",
                }}
              >
                v2
              </span>
            </motion.div>
          </NavLink>

          {/* ── DESKTOP LINKS (md+) ── */}
          <nav
            aria-label="Desktop links"
            className="hidden md:flex flex-1 justify-center items-center overflow-hidden min-w-0"
          >
            {links.map((link, index) => (
              <NavLink key={link.path} to={link.path}>
                {({ isActive }) => (
                  <motion.div
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.35 }}
                    className="relative py-2 group flex-shrink-0 cursor-pointer nav-desktop-link"
                    style={{ paddingLeft: "0.55rem", paddingRight: "0.55rem" }}
                  >
                    {/* Hover bg */}
                    <div
                      className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "rgba(0,255,231,0.05)", border: "1px solid rgba(0,255,231,0.1)" }}
                    />

                    <span
                      className="nav-link-text relative font-medium whitespace-nowrap transition-colors duration-200"
                      style={{
                        color: isActive ? "#00ffe7" : "#9ca3af",
                        textShadow: isActive ? "0 0 10px rgba(0,255,231,0.5)" : "none",
                      }}
                      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#67e8f9"; }}
                      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#9ca3af"; }}
                    >
                      {link.name}
                    </span>

                    {/* Active underbar */}
                    {isActive && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute left-0 bottom-0 w-full h-[2px] rounded-full pointer-events-none"
                        style={{
                          background: "linear-gradient(90deg, #00ffe7, #3b82f6)",
                          boxShadow: "0 0 8px rgba(0,255,231,0.8), 0 0 16px rgba(0,255,231,0.4)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover underbar */}
                    {!isActive && (
                      <span
                        className="absolute left-0 bottom-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 pointer-events-none"
                        style={{ background: "rgba(0,255,231,0.4)" }}
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── ACTIONS ── */}
          <div className="ml-auto flex items-center flex-shrink-0" style={{ gap: "clamp(0.4rem, 1vw, 0.75rem)" }}>

            {/* Status indicator — lg+ only */}
            <div className="hidden lg:flex items-center gap-1.5" style={{ marginRight: "0.25rem" }}>
              <div
                className="pulse-dot w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "#00ffe7" }}
              />
              <span
                style={{
                  fontSize: "clamp(9px, 0.75vw, 11px)",
                  color: "rgba(0,255,231,0.5)",
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              >
                ONLINE
              </span>
            </div>

            {/* Keyboard shortcut hint — xl+ only */}
            <div
              className="hidden xl:flex items-center gap-1 px-2 py-1 rounded mr-1"
              style={{ border: "1px solid rgba(0,255,231,0.1)", background: "rgba(0,255,231,0.02)" }}
            >
              <span style={{ fontSize: "10px", fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,255,231,0.3)" }}>
                ⌘K
              </span>
            </div>

            {/* Search button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Open search (Ctrl+K)"
              className="relative rounded transition-all duration-200 nav-touch-target flex items-center justify-center"
              style={{
                padding: "clamp(0.4rem, 1vw, 0.6rem)",
                border: "1px solid rgba(0,255,231,0.15)",
                background: "rgba(0,255,231,0.03)",
                minWidth: 36,
                minHeight: 36,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(0,255,231,0.4)";
                el.style.background  = "rgba(0,255,231,0.08)";
                el.style.boxShadow   = "0 0 15px rgba(0,255,231,0.15)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(0,255,231,0.15)";
                el.style.background  = "rgba(0,255,231,0.03)";
                el.style.boxShadow   = "none";
              }}
            >
              <SearchIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5" style={{ color: "#00ffe7" }} />
            </motion.button>

            {/* Hamburger — hidden on md+ */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden relative rounded transition-all duration-200 nav-touch-target flex items-center justify-center"
              style={{
                padding: "clamp(0.4rem, 1vw, 0.6rem)",
                border: "1px solid rgba(0,255,231,0.15)",
                background: menuOpen ? "rgba(0,255,231,0.08)" : "rgba(0,255,231,0.03)",
                color: "#00ffe7",
                minWidth: 36,
                minHeight: 36,
              }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}>
                    <CloseIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}>
                    <MenuIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.2), rgba(59,130,246,0.1), transparent)" }}
        />
      </motion.nav>

      {/* ── MOBILE MENU (hidden on md+) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,2,9,0.80)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed z-50 md:hidden overflow-hidden rounded-xl"
              style={{
                top: `calc(${navbarHeight} + 6px)`,
                left: "clamp(0.5rem, 2vw, 0.75rem)",
                right: "clamp(0.5rem, 2vw, 0.75rem)",
                background: "linear-gradient(135deg, rgba(0,0,0,0.97), rgba(2,5,15,0.99))",
                border: "1px solid rgba(0,255,231,0.22)",
                boxShadow: "0 0 60px rgba(0,255,231,0.08), 0 20px 60px rgba(0,0,0,0.7)",
                maxHeight: "calc(100dvh - 5.5rem)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
              <ScanLine />

              {/* Scrollable grid */}
              <div className="overflow-y-auto flex-1 custom-scrollbar" style={{ padding: "clamp(0.5rem, 2vw, 0.75rem)" }}>
                {/* Responsive column count: 2 on tiny phones, 3 on larger phones / small tablets */}
                <div
                  className="grid gap-1.5"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(120px, 45%), 1fr))" }}
                >
                  {links.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.025 }}
                    >
                      <NavLink to={link.path} onClick={() => setMenuOpen(false)}>
                        {({ isActive }) => (
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="relative rounded-lg text-center overflow-hidden transition-all duration-200"
                            style={{
                              padding: "clamp(0.5rem, 2vw, 0.75rem) clamp(0.4rem, 1.5vw, 0.6rem)",
                              background: isActive ? "rgba(0,255,231,0.08)" : "rgba(255,255,255,0.02)",
                              border: `1px solid ${isActive ? "rgba(0,255,231,0.35)" : "rgba(255,255,255,0.05)"}`,
                              boxShadow: isActive ? "0 0 15px rgba(0,255,231,0.1), inset 0 1px 0 rgba(0,255,231,0.1)" : "none",
                              minHeight: 44,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isActive && (
                              <div
                                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                                style={{ background: "linear-gradient(to right, transparent, #00ffe7, transparent)" }}
                              />
                            )}
                            <span
                              className="nav-link-text font-medium"
                              style={{
                                fontSize: "clamp(0.68rem, 2.5vw, 0.82rem)",
                                color: isActive ? "#00ffe7" : "#9ca3af",
                                textShadow: isActive ? "0 0 8px rgba(0,255,231,0.5)" : "none",
                              }}
                            >
                              {link.name}
                            </span>
                          </motion.div>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Status bar */}
              <div
                className="flex items-center justify-between flex-shrink-0"
                style={{
                  margin: "0 clamp(0.5rem, 2vw, 0.75rem) clamp(0.5rem, 2vw, 0.75rem)",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.5rem",
                  background: "rgba(0,255,231,0.03)",
                  border: "1px solid rgba(0,255,231,0.08)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(9px, 2vw, 10px)",
                    fontFamily: "'Share Tech Mono', monospace",
                    color: "rgba(0,255,231,0.4)",
                  }}
                >
                  {links.length} modules online
                </span>
                <div className="flex items-center gap-1.5">
                  <div
                    className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#00ffe7" }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(9px, 2vw, 10px)",
                      fontFamily: "'Share Tech Mono', monospace",
                      color: "rgba(0,255,231,0.4)",
                    }}
                  >
                    SYS ACTIVE
                  </span>
                </div>
              </div>

              <ScanLine bottom />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SEARCH MODAL ── */}
      <AnimatePresence>
        {searchOpen && (
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>

      {/* SPACER — matches navbar height */}
      <div aria-hidden="true" style={{ height: navbarHeight }} />
    </>
  );
}