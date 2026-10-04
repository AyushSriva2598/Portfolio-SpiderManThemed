import React, { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { IndexSidebar } from "./components/layout/IndexSidebar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { TechStack } from "./components/sections/TechStack";
import { GitHubActivity } from "./components/sections/GitHubActivity";
import { CommandPalette } from "./components/modals/CommandPalette";

export function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Sync dark class on mount and change
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const scrollToSection = (id) => {
    // If id is "about", scroll to top
    if (id === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("about");
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-neutral-800 selection:text-neutral-200">
      {/* Sticky Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
      />

      {/* Desktop Sticky Index Sidebar */}
      <IndexSidebar
        activeId={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Main Single-Column Architectural Grid */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero onOpenPalette={() => setIsPaletteOpen(true)} />

        {/* About Section (with Turntable) */}
        <About />

        {/* Contact Section */}
        <Contact />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Tech Stack Section */}
        <TechStack />

        {/* GitHub Activity Section */}
        <GitHubActivity />
      </main>

      {/* Footer */}
      <Footer />

      {/* ⌘K Command Palette Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onNavigateSection={scrollToSection}
        onToggleTheme={toggleTheme}
        isDark={isDark}
      />
    </div>
  );
}

export default App;
