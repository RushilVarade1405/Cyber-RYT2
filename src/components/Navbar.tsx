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
<<<<<<< HEAD
   ICONS (SVG)
=======
   ICONS
>>>>>>> 9fa592d (done4)
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
<<<<<<< HEAD
   SEARCH MODAL
================================ */
function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
=======
   SEARCH MODAL (UNCHANGED)
================================ */
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
>>>>>>> 9fa592d (done4)
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

<<<<<<< HEAD
    setResults(
      elements.filter(el =>
        el.innerText.toLowerCase().includes(value.toLowerCase())
      )
    );
=======
    setResults(elements.filter(el =>
      el.innerText.toLowerCase().includes(value.toLowerCase())
    ));
>>>>>>> 9fa592d (done4)
  };

  const jumpTo = (el: HTMLElement) => {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex justify-center pt-28">
      <div className="w-full max-w-2xl">
<<<<<<< HEAD
        <div className="bg-[#020617] border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden">
=======
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#020617] border border-cyan-500/30 rounded-xl overflow-hidden"
        >
>>>>>>> 9fa592d (done4)
          <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/20">
            <SearchIcon className="w-5 h-5 text-cyan-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => searchPage(e.target.value)}
              placeholder="Search this page…"
<<<<<<< HEAD
              className="w-full bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm"
            />
            <button onClick={onClose} className="text-gray-400 hover:text-cyan-400" title="Close search" aria-label="Close search">
=======
              className="w-full bg-transparent text-gray-200 outline-none text-sm"
            />
            <button onClick={onClose} className="text-gray-400 hover:text-cyan-400">
>>>>>>> 9fa592d (done4)
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[360px] overflow-y-auto">
<<<<<<< HEAD
            {query && results.length === 0 && (
              <p className="px-5 py-6 text-sm text-gray-500">
                No results found
              </p>
            )}

=======
>>>>>>> 9fa592d (done4)
            {results.map((el, i) => (
              <button
                key={i}
                onClick={() => jumpTo(el)}
<<<<<<< HEAD
                className="w-full text-left px-5 py-3 text-sm text-gray-300
                hover:bg-cyan-500/10 transition
                border-l-2 border-transparent hover:border-cyan-400"
              >
                <span className="line-clamp-2">{el.innerText}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 text-center text-s text-gray-500">
          Press <kbd className="px-1 border rounded">ESC</kbd> to close
        </p>
=======
                className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-cyan-500/10"
              >
                {el.innerText}
              </button>
            ))}
          </div>
        </motion.div>
>>>>>>> 9fa592d (done4)
      </div>
    </div>
  );
}

/* ===============================
<<<<<<< HEAD
   NAVBAR
=======
   NAVBAR WITH ANIMATED UNDERLINE
>>>>>>> 9fa592d (done4)
================================ */
export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const current = window.scrollY;
          setHidden(current > lastScrollY && current > 80);
          setLastScrollY(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
=======
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScrollY && current > 80);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
>>>>>>> 9fa592d (done4)
  }, [lastScrollY]);

  return (
    <>
<<<<<<< HEAD
      <nav
        className={`fixed top-0 left-0 w-full z-50
        bg-[#020617]/90 backdrop-blur
        border-b border-cyan-500/20
        transition-transform duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center h-16">
            {/* LOGO */}
            <NavLink
              to="/"
              className="flex items-center gap-2 font-extrabold tracking-widest
              text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            >
              <span className="w-3 h-3 rotate-45 bg-cyan-400" />
              CYBER<span className="text-white">WORLD</span>
            </NavLink>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex flex-1 justify-center gap-8 h-full">
              {links.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative flex items-center h-full text-sm
                    ${isActive ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"}
                    after:absolute after:bottom-0 after:left-0
                    after:h-[2px] after:bg-cyan-400
                    after:w-0 hover:after:w-full transition-all
                    ${isActive ? "after:w-full" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* RIGHT ACTIONS */}
            <div className="ml-auto flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-cyan-400 hover:text-cyan-300"
                title="Open search"
                aria-label="Open search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-cyan-400 hover:text-cyan-300"
              >
                {menuOpen ? (
                  <CloseIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-[#020617] border-t border-cyan-500/20 px-6 py-6 space-y-4">
            {links.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-cyan-400"
                    : "block text-gray-300 hover:text-cyan-400"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
=======
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#020617]/90 backdrop-blur border-b border-cyan-500/20"
      >
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center h-16">

            <NavLink
  to="/"
  className="font-extrabold tracking-widest text-cyan-400
             drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]"
>
  CYBER_<span className="text-white">WORLD</span>
</NavLink>


            {/* DESKTOP LINKS */}
            <div className="hidden md:flex flex-1 justify-center gap-8">
              {links.map(link => {
                const active = location.pathname === link.path;

                return (
                  <motion.div
                    key={link.path}
                    whileHover="hover"
                    className="relative"
                  >
                    <NavLink
                      to={link.path}
                      className={`text-sm transition ${
                        active ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                      }`}
                    >
                      {link.name}
                    </NavLink>

                    {(active) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-2 h-[2px] w-full bg-cyan-400 rounded"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
>>>>>>> 9fa592d (done4)

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
