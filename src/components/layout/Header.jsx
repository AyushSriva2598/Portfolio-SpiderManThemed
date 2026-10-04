import React, { useState } from "react";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BorderContainer } from "./BorderContainer";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { playTactileClick } from "../../lib/audio";

export function Header({ isDark, onToggleTheme, onOpenPalette, activeSection, onNavigateSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  const handleThemeClick = () => {
    playTactileClick();
    onToggleTheme();
  };

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <BorderContainer className="flex items-center justify-between px-6 py-3 sm:px-8">
        {/* Logo / Pronunciation */}
        <button
          onClick={() => handleLinkClick("about")}
          className="flex items-baseline gap-2 hover:opacity-80 transition-opacity text-left cursor-pointer"
        >
          <span className="font-serif text-xl tracking-wide text-[var(--fg)]">
            {PORTFOLIO_DATA.firstName}
          </span>
          <span className="font-mono text-[11px] text-[var(--soft)] tracking-wide">
            {PORTFOLIO_DATA.phonetic}
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6 text-[13px] text-[var(--muted)]">
          {navLinks.map(({ label, id }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleLinkClick(id)}
                className={`group relative transition-colors hover:text-[var(--fg)] cursor-pointer ${
                  isActive ? "text-[var(--fg)] font-semibold" : ""
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 ${
                    isActive ? "scale-x-100 origin-left" : ""
                  }`}
                />
              </button>
            );
          })}

          {/* Command Palette Trigger */}
          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Search Command Palette"
              className="grid size-7 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:text-[var(--fg)] hover:border-[var(--soft)] cursor-pointer"
            >
              <Search className="size-3.5" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={handleThemeClick}
            aria-label="Toggle theme"
            className="grid size-7 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:rotate-45 hover:text-[var(--fg)] hover:border-[var(--soft)] cursor-pointer"
          >
            {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex sm:hidden items-center gap-3">
          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Search Command Palette"
              className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer"
            >
              <Search className="size-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleThemeClick}
            aria-label="Toggle theme"
            className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Mobile Menu"
            className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </BorderContainer>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="sm:hidden absolute top-full left-0 w-full bg-[var(--bg)] border-b border-[var(--line)] overflow-hidden shadow-lg z-50 bg-stripes"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col font-serif text-lg bg-[var(--bg)]">
              {navLinks.map(({ label, id }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleLinkClick(id)}
                    className={`flex items-center gap-2 border-b border-dashed border-[var(--line)]/50 pb-2.5 transition-colors text-left cursor-pointer ${
                      isActive ? "text-[var(--fg)] font-semibold" : "text-[var(--muted)]"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full bg-[var(--fg)] ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
