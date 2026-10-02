import React, { useState, useEffect } from "react";
import { HERO_DATA, ASSETS, MILES_ASSETS } from "../../data/spidermanData";
import { useTheme } from "../../context/ThemeContext";

export const Navbar = () => {
  const { toggleTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
    { label: "Cover Letter", href: "#CoverLetter" },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled || mobileMenuOpen
          ? "bg-black/90 backdrop-blur-md border-red-900/50 py-3 shadow-[0_4px_30px_rgba(220,38,38,0.15)]"
          : "bg-transparent border-transparent py-5"
          }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">          
          {/* Logo */}
          <a
            href="#"
            className="text-white font-comic text-sm sm:text-3xl tracking-[0.2em] uppercase italic group flex items-center"
          >
            <span className={isDark ? "text-[#e11d48] drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]" : "text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]"}>
              {HERO_DATA.firstName.charAt(0)}
            </span>
            <span className={`transition-colors duration-300 ${isDark ? "group-hover:text-[#fb923c]" : "group-hover:text-black"}`}>
              {HERO_DATA.firstName.slice(1)}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative font-comic text-sm sm:text-3xl text-white uppercase tracking-[0.2em] font-bold italic transition-all duration-300 hover:text-white group" style={{
                    WebkitTextStroke: "1px #111",
                    textShadow: isDark
                      ? "2px 2px 0 #e11d48, 3px 3px 0 #f97316"
                      : "2px 2px 0 #a31515, 3px 3px 0 #111",
                  }}
                >
                  {item.label}

                  <span className={`absolute -bottom-1.5 left-0 w-0 h-[2px] transition-all duration-300 ease-out group-hover:w-full ${
                    isDark
                      ? "bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      : "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                  }`} />
                </a>
              ))}
            </div>

            {/* Comic Theme Switcher Button (Desktop) */}
            <button
              onClick={toggleTheme}
              type="button"
              className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full font-comic text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 border-2 cursor-pointer select-none ${
                isDark
                  ? "bg-[#111111] border-[#f97316] text-[#fb923c] shadow-[3px_3px_0px_#f97316] hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] hover:bg-[#1a1a1a]"
                  : "bg-white border-[#a31515] text-[#a31515] shadow-[3px_3px_0px_#000000] hover:shadow-[3px_3px_0px_#a31515] hover:bg-red-50"
              }`}
              title={isDark ? "Switch to Peter Parker (Light Mode)" : "Switch to Miles Morales (Dark Mode)"}
            >
              <img
                src={isDark ? MILES_ASSETS.spiderIcon : ASSETS.spiderIcon}
                alt="Theme Mascot Icon"
                width="18"
                height="18"
                className="w-4 h-4 object-contain"
              />
              <span className="font-bold tracking-widest">
                {isDark ? "MILES" : "PETER"}
              </span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-red-500 focus:outline-none transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {/* ... */}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Slide-over Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-[#0a0a0a] border-l border-red-900/50 shadow-2xl p-8 pt-24 flex flex-col justify-between transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Decorative Web Accent */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-4 border-b border-red-900/40">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] animate-pulse" />
              <span className="text-xs uppercase font-dialogue font-bold tracking-widest text-gray-400">
                Navigation Protocol
              </span>
            </div>

            {/* Mobile Comic Theme Switcher */}
            <div className="pt-1 pb-1">
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                type="button"
                className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl font-comic text-sm uppercase tracking-wider transition-all duration-300 border-2 cursor-pointer select-none ${
                  isDark
                    ? "bg-[#111111] border-[#f97316] text-[#fb923c] shadow-[4px_4px_0px_#f97316]"
                    : "bg-white border-[#a31515] text-[#a31515] shadow-[4px_4px_0px_#000000]"
                }`}
              >
                <img
                  src={isDark ? MILES_ASSETS.spiderIcon : ASSETS.spiderIcon}
                  alt="Theme Icon"
                  width="20"
                  height="20"
                  className="w-5 h-5 object-contain"
                />
                <span className="font-bold tracking-widest">
                  {isDark ? "SWITCH TO PETER (LIGHT)" : "SWITCH TO MILES (DARK)"}
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {navItems.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="group flex items-center justify-between py-2 font-comic text-2xl sm:text-3xl italic uppercase tracking-widest text-gray-200 hover:text-red-500 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-dialogue font-bold text-red-600">
                      0{idx + 1}.
                    </span>
                    {item.label}
                  </span>
                  <span className="text-red-600 text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="pt-6 border-t border-gray-800/80 flex flex-col gap-3">
            <span className="text-[11px] font-dialogue font-bold uppercase tracking-widest text-gray-500">
              {HERO_DATA.tagline}
            </span>
            <div className="text-xs font-dialogue font-bold text-gray-400">
              © {new Date().getFullYear()} {HERO_DATA.firstName} {HERO_DATA.lastName}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
