import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ===============================
   NAV LINKS
================================ */
const links = [
  { name: "Home", path: "/" },
  { name: "Linux", path: "/linux" },
  { name: "Tools", path: "/tools" },
  { name: "Cyber_Laws", path: "/cyber-laws" },
  { name: "Blockchain", path: "/blockchain" },
  { name: "Cryptography", path: "/cryptography" },
  { name: "Platforms", path: "/platforms" },
  { name: "About", path: "/about" },
];

/* ===============================
   ICONS
================================ */
const SearchIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MenuIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

/* ===============================
   SEARCH MODAL
================================ */
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

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

  const jumpTo = (el: HTMLElement) => {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex justify-center pt-28">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#020617] border border-cyan-500/30 rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/20">
            <SearchIcon className="w-5 h-5 text-cyan-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => searchPage(e.target.value)}
              placeholder="Search this page…"
              className="w-full bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm"
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
                onClick={() => jumpTo(el)}
                className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-cyan-500/10 transition"
              >
                {el.innerText}
              </button>
            ))}
          </div>
        </motion.div>

        <p className="mt-3 text-center text-sm text-gray-500">
          Press <kbd className="px-1 border rounded">ESC</kbd> to close
        </p>
      </div>
    </div>
  );
}

/* ===============================
   NAVBAR
================================ */
export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScrollY && current > 80);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#020617]/90 backdrop-blur border-b border-cyan-500/20"
      >
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center h-16">
            {/* LOGO */}
            <NavLink
              to="/"
              className="font-extrabold tracking-widest text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            >
              CYBER_<span className="text-white">WORLD</span>
            </NavLink>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex flex-1 justify-center gap-8">
              {links.map(link => {
                const active = location.pathname === link.path;
                return (
                  <motion.div key={link.path} className="relative">
                    <NavLink
                      to={link.path}
                      className={`text-sm transition ${
                        active ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                      }`}
                    >
                      {link.name}
                    </NavLink>

                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-2 h-[2px] w-full bg-cyan-400 rounded"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* ACTIONS */}
            <div className="ml-auto flex items-center gap-4">
              <motion.button whileHover={{ scale: 1.2 }} onClick={() => setSearchOpen(true)}>
                <SearchIcon className="w-5 h-5 text-cyan-400" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-cyan-400"
              >
                {menuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
