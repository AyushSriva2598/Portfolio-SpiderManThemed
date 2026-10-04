import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar, Hero, About, Skills, Projects, Journey, Contact } from "./components/spydy";

export function App() {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 overflow-x-hidden font-dialogue selection:bg-[#a31515] dark:selection:bg-[#a71d24] selection:text-white transition-colors duration-300">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
