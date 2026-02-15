/* ============================================================
   IMPORTS
============================================================ */
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   NAV LINKS CONFIG
============================================================ */
const links = [
  { name: "Home", path: "/" },
  { name: "Linux", path: "/linux" },
  { name: "Tools", path: "/Tools" },
  { name: "Cheatsheet", path: "/cheatsheet" },
  { name: "Cyber_Laws", path: "/cyber-laws" },
  { name: "Blockchain", path: "/blockchain" },
  { name: "Cryptography", path: "/cryptography" },
  { name: "Cyber_News", path: "/cyber-news" },
  { name: "About", path: "/about" },
];

/* ============================================================
   ICON COMPONENTS
============================================================ */
const SearchIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MenuIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

/* ============================================================
   SEARCH MODAL
============================================================ */
function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HTMLElement[]>([]);

  /* Reset when closed */
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  /* ESC to close */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  /* Search logic */
  const searchPage = (value: string) => {
    setQuery(value);
    if (!value) return setResults([]);

    const elements = Array.from(
      document.querySelectorAll("main h1, main h2, main h3, main p, main li")
    ) as HTMLElement[];

    setResults(
      elements.filter(el =>
        el.innerText.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex justify-center pt-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: -20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-2xl h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing border effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-xl opacity-75 blur-sm animate-pulse" />

        <div className="relative rounded-xl bg-[#040812] border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20">
          {/* Search input header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-transparent">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <SearchIcon className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <input
              autoFocus
              value={query}
              onChange={(e) => searchPage(e.target.value)}
              placeholder="Search across all pages..."
              className="w-full bg-transparent text-gray-200 outline-none text-sm placeholder:text-gray-500"
            />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Results area */}
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {query && results.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-5 py-8 text-sm text-gray-500 text-center"
              >
                No results found for "{query}"
              </motion.p>
            )}

            <AnimatePresence mode="popLayout">
              {results.map((el, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    onClose();
                  }}
                  className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-200 border-l-2 border-transparent hover:border-cyan-400"
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
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  /* ------------------------------------------------------------
     Hide navbar on scroll (desktop only)
  ------------------------------------------------------------ */
  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 768) {
        setHidden(false);
        return;
      }

      const current = window.scrollY;
      setHidden(current > lastScrollY && current > 80);
      setLastScrollY(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  /* ------------------------------------------------------------
     Close mobile menu on route change
  ------------------------------------------------------------ */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* ------------------------------------------------------------
     Body scroll lock when menu open
  ------------------------------------------------------------ */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ======================================================
         NAVBAR
      ====================================================== */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: hidden ? -70 : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="
          fixed top-0 left-0 w-full z-50
          bg-gradient-to-b from-[#060b1a]/95 to-[#040812]/95
          backdrop-blur-md
          border-b border-cyan-500/20
          shadow-lg shadow-cyan-500/5
        "
      >
        {/* Static cyan glow line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/30" />

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          {/* LOGO */}
          <NavLink
            to="/"
            className="relative font-extrabold tracking-widest text-lg group"
          >
            <motion.span
              className="relative inline-block text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              CYBER_
              {/* Glitch effect on hover */}
              <span className="absolute inset-0 text-cyan-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse">
                CYBER_
              </span>
            </motion.span>
            <motion.span
              className="text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              WORLD
            </motion.span>
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex flex-1 justify-center gap-1">
            {links.map((link, index) => (
              <NavLink key={link.path} to={link.path}>
                {({ isActive }) => (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative px-3 py-2 group"
                  >
                    <span
                      className={`
                        relative text-sm font-medium transition-all duration-300
                        ${isActive
                          ? "text-cyan-400"
                          : "text-gray-300 group-hover:text-cyan-300"
                        }
                      `}
                    >
                      {link.name}
                    </span>

                    {/* Hover background glow */}
                    <motion.div
                      className="absolute inset-0 bg-cyan-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeTab"
                        className="
                          absolute left-0 -bottom-1 w-full h-[2px]
                          bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500
                          shadow-[0_0_8px_rgba(34,211,238,0.8)]
                          rounded-full
                        "
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover underline */}
                    {!isActive && (
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400/50 group-hover:w-full transition-all duration-300" />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="ml-auto flex items-center gap-4">
            {/* Search button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              className="relative p-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <SearchIcon className="w-5 h-5 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-cyan-400 relative group"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloseIcon className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                className="absolute inset-0 bg-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </motion.nav>

      {/* ======================================================
         MOBILE MENU
      ====================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="
                fixed top-16 left-0 right-0 mx-4 z-50
                bg-gradient-to-b from-[#060b1a] to-[#040812]
                backdrop-blur-md
                border border-cyan-500/30
                rounded-lg
                shadow-2xl shadow-cyan-500/20
                md:hidden
                overflow-hidden
              "
            >
              {/* Top glow line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

              <div className="flex flex-col px-6 py-4 gap-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {links.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <motion.div
                          whileHover={{ x: 8 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            relative px-4 py-3 rounded-lg text-sm font-medium
                            transition-all duration-200
                            ${isActive
                              ? "text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400"
                              : "text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5 border-l-2 border-transparent"
                            }
                          `}
                        >
                          {link.name}

                          {/* Active indicator glow */}
                          {isActive && (
                            <motion.div
                              layoutId="activeMobile"
                              className="absolute inset-0 bg-cyan-500/5 rounded-lg"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                        </motion.div>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ======================================================
         SEARCH MODAL
      ====================================================== */}
      <AnimatePresence>
        {searchOpen && (
          <SearchModal
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ======================================================
         SPACER FOR FIXED NAVBAR
      ====================================================== */}
      <div className="h-16" />

      {/* ======================================================
         CUSTOM SCROLLBAR STYLES (add to global CSS)
      ====================================================== */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(6, 11, 26, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </>
  );
}