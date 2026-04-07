/* ============================================================
   IMPORTS
============================================================ */
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   FONT INJECTION
============================================================ */
const FONT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

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

  .nav-logo-text {
    font-family: 'Orbitron', sans-serif;
    font-weight: 800;
    letter-spacing: 0.12em;
  }
  .nav-link-text {
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 0.06em;
  }
  .search-spin {
    animation: search-spin 2s linear infinite;
  }

  /* Responsive navbar link sizing — INCREASED */
  @media (min-width: 768px) and (max-width: 1023px) {
    .nav-desktop-link {
      font-size: 0.78rem !important;
      padding-left: 0.45rem !important;
      padding-right: 0.45rem !important;
    }
  }
  @media (min-width: 1024px) {
    .nav-desktop-link {
      font-size: 0.9rem !important;
      padding-left: 0.75rem !important;
      padding-right: 0.75rem !important;
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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = ({ className = "", style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MenuIcon = ({ className = "", style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}>
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
   SEARCH MODAL
============================================================ */
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!open) { setQuery(""); setResults([]); }
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const searchPage = (value: string) => {
    setQuery(value);
    if (!value) return setResults([]);
    const elements = Array.from(
      document.querySelectorAll("main h1, main h2, main h3, main p, main li")
    ) as HTMLElement[];
    setResults(elements.filter(el =>
      el.innerText.toLowerCase().includes(value.toLowerCase())
    ));
  };

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex justify-center items-start pt-20 xs:pt-24 px-3 xs:px-4"
      style={{ background: "rgba(2,5,9,0.92)", backdropFilter: "blur(10px)" }}
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
        className="relative w-full max-w-xl xs:max-w-2xl h-fit"
        onClick={e => e.stopPropagation()}
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-[1px] rounded-xl opacity-60 blur-sm"
          style={{
            background: "linear-gradient(135deg, #00ffe7, #3b82f6, #a855f7, #00ffe7)",
            animation: "nav-scan 3s linear infinite",
          }}
        />
        <div
          className="absolute -inset-[1px] rounded-xl"
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

          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              className="h-full w-1/3"
              style={{ background: "linear-gradient(90deg, transparent, #00ffe7, transparent)" }}
            />
          </div>

          {/* Input row */}
          <div
            className="flex items-center gap-2 xs:gap-3 px-4 xs:px-5 py-3 xs:py-4 border-b"
            style={{ borderColor: "rgba(0,255,231,0.15)", background: "rgba(0,255,231,0.03)" }}
          >
            <div className="search-spin flex-shrink-0">
              <SearchIcon className="w-5 h-5 xs:w-6 xs:h-6" style={{ color: "#00ffe7" }} />
            </div>
            <input
              autoFocus
              value={query}
              onChange={e => searchPage(e.target.value)}
              placeholder="search://across-all-pages..."
              className="w-full bg-transparent outline-none text-sm xs:text-base text-gray-200 placeholder:text-gray-600 min-w-0"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="flex-shrink-0 transition-colors p-1"
              style={{ color: "rgba(0,255,231,0.5)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#00ffe7")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(0,255,231,0.5)")}
            >
              <CloseIcon className="w-5 h-5 xs:w-6 xs:h-6" />
            </motion.button>
          </div>

          {/* Results */}
          <div className="max-h-[55vh] xs:max-h-[400px] overflow-y-auto">
            {query && results.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-5 py-8 text-sm xs:text-base text-center"
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
                <p className="text-xs xs:text-sm" style={{ color: "#374151", fontFamily: "'Share Tech Mono', monospace" }}>
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
                  transition={{ delay: i * 0.03 }}
                  onClick={() => { el.scrollIntoView({ behavior: "smooth", block: "center" }); onClose(); }}
                  className="w-full text-left px-4 xs:px-5 py-3 text-sm xs:text-base transition-all duration-200"
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
   NAVBAR COMPONENT
============================================================ */
export default function Navbar() {
  const location                      = useLocation();
  const [menuOpen, setMenuOpen]       = useState(false);
  const [hidden, setHidden]           = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);

  /* Stable scroll handler */
  const onScroll = useCallback(() => {
    const current = window.scrollY;
    setScrolled(current > 20);
    /* Only hide on md+ */
    if (window.innerWidth < 768) { setHidden(false); return; }
    setHidden(current > lastScrollY && current > 80);
    setLastScrollY(current);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Close search/menu with Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <style>{FONT_CSS}</style>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background: scrolled
            ? "linear-gradient(to bottom, rgba(0,0,0,0.97), rgba(2,5,15,0.99))"
            : "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(2,5,15,0.9))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(0,255,231,0.12)",
          boxShadow: scrolled
            ? "0 0 40px rgba(0,255,231,0.06), 0 4px 30px rgba(0,0,0,0.5)"
            : "none",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Top scan line */}
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
            className="absolute h-full w-1/4"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,231,0.6), transparent)" }}
          />
        </div>

        {/* ── INNER ── */}
        {/* Increased navbar height: h-16 xs:h-18 */}
        <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-6 h-16 xs:h-[4.5rem] flex items-center gap-2">

          {/* ── LOGO ── */}
          <NavLink to="/" className="relative flex-shrink-0 group mr-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative"
            >
              <div
                className="absolute -inset-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(0,255,231,0.12), transparent 70%)" }}
              />
              {/* Logo text — INCREASED from text-sm xs:text-base → text-base xs:text-lg */}
              <span
                className="nav-logo-text relative text-base xs:text-lg"
                style={{
                  color: "#00ffe7",
                  textShadow: "0 0 8px rgba(0,255,231,0.6), 0 0 20px rgba(0,255,231,0.3)",
                  animation: "neon-flicker 10s infinite",
                }}
              >
                CYBER_
              </span>
              <span
                className="nav-logo-text relative text-base xs:text-lg"
                style={{ color: "#fff" }}
              >
                WORLD
              </span>
              <span
                className="absolute -top-1 -right-5 text-[8px] xs:text-[9px] opacity-50"
                style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ffe7" }}
              >
                v2
              </span>
            </motion.div>
          </NavLink>

          {/* ── DESKTOP LINKS (md+) ── */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-0 overflow-hidden min-w-0">
            {links.map((link, index) => (
              <NavLink key={link.path} to={link.path}>
                {({ isActive }) => (
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035, duration: 0.4 }}
                    className="relative py-2 group flex-shrink-0 cursor-pointer nav-desktop-link"
                    style={{ paddingLeft: "0.55rem", paddingRight: "0.55rem" }}
                  >
                    {/* Hover bg */}
                    <div
                      className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(0,255,231,0.05)", border: "1px solid rgba(0,255,231,0.1)" }}
                    />

                    {/* Link text — base size now controlled by media query above (0.78rem / 0.9rem) */}
                    <span
                      className="nav-link-text relative font-medium whitespace-nowrap transition-all duration-300"
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
                        className="absolute left-0 -bottom-0 w-full h-[2px] rounded-full"
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
                        className="absolute left-0 -bottom-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                        style={{ background: "rgba(0,255,231,0.4)" }}
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>

          {/* ── ACTIONS ── */}
          <div className="ml-auto flex items-center gap-1.5 xs:gap-2 sm:gap-3 flex-shrink-0">

            {/* Status dot — md+ only — INCREASED text size */}
            <div className="hidden lg:flex items-center gap-1.5 mr-1">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: "#00ffe7", boxShadow: "0 0 6px rgba(0,255,231,0.8)" }}
              />
              <span className="text-[11px]" style={{ color: "rgba(0,255,231,0.5)", fontFamily: "'Share Tech Mono', monospace" }}>
                ONLINE
              </span>
            </div>

            {/* Search button — INCREASED icon size */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="relative p-2 xs:p-2.5 rounded transition-all duration-200"
              style={{ border: "1px solid rgba(0,255,231,0.15)", background: "rgba(0,255,231,0.03)" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(0,255,231,0.4)";
                el.style.background = "rgba(0,255,231,0.08)";
                el.style.boxShadow = "0 0 15px rgba(0,255,231,0.15)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(0,255,231,0.15)";
                el.style.background = "rgba(0,255,231,0.03)";
                el.style.boxShadow = "none";
              }}
            >
              <SearchIcon className="w-5 h-5 xs:w-5 xs:h-5" style={{ color: "#00ffe7" }} />
            </motion.button>

            {/* Mobile menu toggle — hidden on md+ */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden relative p-2 xs:p-2.5 rounded transition-all duration-200"
              style={{
                border: "1px solid rgba(0,255,231,0.15)",
                background: menuOpen ? "rgba(0,255,231,0.08)" : "rgba(0,255,231,0.03)",
                color: "#00ffe7",
              }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <CloseIcon className="w-5 h-5 xs:w-6 xs:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <MenuIcon className="w-5 h-5 xs:w-6 xs:h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          className="absolute bottom-0 left-0 w-full h-px"
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
              style={{ background: "rgba(0,2,9,0.80)", backdropFilter: "blur(8px)" }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed left-2 right-2 xs:left-3 xs:right-3 z-50 md:hidden overflow-hidden rounded-xl"
              style={{
                top: "calc(4rem + 6px)",  /* matches increased navbar height */
                background: "linear-gradient(135deg, rgba(0,0,0,0.97), rgba(2,5,15,0.99))",
                border: "1px solid rgba(0,255,231,0.22)",
                boxShadow: "0 0 60px rgba(0,255,231,0.08), 0 20px 60px rgba(0,0,0,0.7)",
                maxHeight: "calc(100vh - 5rem)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.6), transparent)" }}
              />

              {/* Scrollable grid */}
              <div className="overflow-y-auto flex-1 p-2.5 xs:p-3">
                {/* INCREASED mobile link text sizes */}
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-1.5">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <NavLink to={link.path} onClick={() => setMenuOpen(false)}>
                        {({ isActive }) => (
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="relative px-2 xs:px-3 py-3 rounded-lg text-center overflow-hidden transition-all duration-200"
                            style={{
                              background: isActive ? "rgba(0,255,231,0.08)" : "rgba(255,255,255,0.02)",
                              border: `1px solid ${isActive ? "rgba(0,255,231,0.35)" : "rgba(255,255,255,0.05)"}`,
                              boxShadow: isActive ? "0 0 15px rgba(0,255,231,0.1), inset 0 1px 0 rgba(0,255,231,0.1)" : "none",
                            }}
                          >
                            {isActive && (
                              <div
                                className="absolute top-0 left-0 right-0 h-px"
                                style={{ background: "linear-gradient(to right, transparent, #00ffe7, transparent)" }}
                              />
                            )}
                            {/* Mobile grid link text — INCREASED from text-[10px] xs:text-xs → text-xs xs:text-sm */}
                            <span
                              className="nav-link-text text-xs xs:text-sm font-medium"
                              style={{
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

              {/* Status bar — INCREASED text */}
              <div
                className="flex items-center justify-between mx-2.5 xs:mx-3 mb-2.5 xs:mb-3 px-3 py-2 rounded-lg flex-shrink-0"
                style={{ background: "rgba(0,255,231,0.03)", border: "1px solid rgba(0,255,231,0.08)" }}
              >
                <span
                  className="text-[10px] xs:text-xs"
                  style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,255,231,0.4)" }}
                >
                  {links.length} modules online
                </span>
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#00ffe7" }}
                  />
                  <span
                    className="text-[10px] xs:text-xs"
                    style={{ fontFamily: "'Share Tech Mono', monospace", color: "rgba(0,255,231,0.4)" }}
                  >
                    SYS ACTIVE
                  </span>
                </div>
              </div>

              {/* Bottom shimmer */}
              <div
                className="absolute bottom-0 left-0 w-full h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(0,255,231,0.3), transparent)" }}
              />
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

      {/* SPACER — matches increased navbar height */}
      <div className="h-16 xs:h-[4.5rem]" />
    </>
  );
}