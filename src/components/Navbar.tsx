import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* ===============================
     Scroll Hide / Show Navbar
  =============================== */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* ===============================
     Keyboard Accessibility
  =============================== */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        bg-[#020617]/90 backdrop-blur
        border-b border-cyan-500/20
        transition-transform duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* NAVBAR ROW */}
        <div className="flex items-center h-16">

          {/* LOGO (LEFT) */}
          <NavLink
            to="/"
            className="text-cyan-400 font-extrabold text-lg tracking-widest
            drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]"
          >
            CYBER_WORLD
          </NavLink>

          {/* DESKTOP LINKS (CENTER) */}
          <div className="hidden md:flex flex-1 justify-center gap-8 h-full">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `
                  relative flex items-center h-full
                  text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "text-gray-300 hover:text-cyan-400"
                  }
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:bg-cyan-400
                  after:transition-all after:duration-300
                  after:w-0 hover:after:w-full
                  ${isActive ? "after:w-full" : ""}
                  `
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* HAMBURGER (RIGHT) */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto md:hidden w-10 h-10
            flex flex-col justify-center items-center gap-1"
          >
            <span
              className={`h-[2px] w-6 bg-cyan-400 transition-transform duration-300
              ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
            />
            <span
              className={`h-[2px] w-6 bg-cyan-400 transition-opacity duration-300
              ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[2px] w-6 bg-cyan-400 transition-transform duration-300
              ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden transition-all duration-300 overflow-hidden
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="bg-[#020617] border-t border-cyan-500/20 px-6 py-4 space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium
                ${
                  isActive
                    ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
