import React from "react";
import { Navbar, Hero, About, Skills, Projects, Journey, Contact } from "./components/spydy";

export function App() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 overflow-x-hidden font-dialogue selection:bg-[#a31515] selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
    </div>
  );
}

export default App;
