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
  { name: "Tools", path: "/tools" },
  { name: "Cheatsheet", path: "/cheatsheet" }, // ADD THIS LINE
  { name: "Cyber_Laws", path: "/cyber-laws" },
  { name: "Blockchain", path: "/blockchain" },
  { name: "Cryptography", path: "/cryptography" },
  { name: "Platform", path: "/platforms" },
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
    >
      <motion.div
        initial={{ scale: 0.9, y: -30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="w-full max-w-2xl rounded-xl bg-[#040812] border border-cyan-500/30 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/20">
          <SearchIcon className="w-5 h-5 text-cyan-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => searchPage(e.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-gray-200 outline-none text-sm"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-cyan-400">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[360px] overflow-y-auto">
          {query && results.length === 0 && (
            <p className="px-5 py-6 text-sm text-gray-500">No results found</p>
          )}

          {results.map((el, i) => (
            <button
              key={i}
              onClick={() => {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                onClose();
              }}
              className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-cyan-500/10"
            >
              {el.innerText}
            </button>
          ))}
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
          bg-gradient-to-b from-[#060b1a] to-[#040812]
          border-b border-cyan-500/20
        "
      >
        {/* Cyan top accent */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/40" />

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          {/* LOGO */}
          <NavLink
            to="/"
            className="relative font-extrabold tracking-widest text-lg"
          >
            <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
              CYBER_
            </span>
            <span className="text-white">WORLD</span>

            {/* subtle holographic shimmer */}
            <span
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent
                opacity-0 hover:opacity-100
                transition-opacity duration-700
              "
            />
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            {links.map(link => (
              <NavLink key={link.path} to={link.path}>
                {({ isActive }) => (
                  <div
                    className={`
                      relative text-sm font-medium transition
                      ${
                        isActive
                          ? "text-cyan-400"
                          : "text-gray-300 hover:text-cyan-300"
                      }
                    `}
                  >
                    {link.name}

                    {isActive && (
                      <span
                        className="
                          absolute left-0 -bottom-2 w-full h-[2px]
                          bg-cyan-400
                          shadow-[0_0_8px_rgba(34,211,238,0.8)]
                        "
                      />
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-cyan-400"
            >
              {menuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ======================================================
         MOBILE MENU
      ====================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              fixed top-16 left-0 w-full z-40
              bg-[#040812]/95 backdrop-blur-md
              border-b border-cyan-500/20
              md:hidden
            "
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {links.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-300 hover:text-cyan-400"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
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
    </>
  );
}