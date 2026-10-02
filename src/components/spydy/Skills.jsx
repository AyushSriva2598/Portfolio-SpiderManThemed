import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, MILES_ASSETS } from "../../data/spidermanData";
import { useTheme } from "../../context/ThemeContext";
import { TechWeb } from "./TechWeb";
import { SKILL_CATEGORIES } from "./techData";

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const spiderRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger entry timeline
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );

      // Hanging Spider-Man pendulum swing
      gsap.to(spiderRef.current, {
        rotation: 6,
        transformOrigin: "top center",
        repeat: -1,
        yoyo: true,
        duration: 3.2,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative w-full pt-4 sm:pt-6 md:pt-8 pb-0 flex flex-col items-center justify-center overflow-x-clip transition-colors duration-500 ${
        isDark ? "bg-[#060606] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Hanging Ceiling Spider-Man */}
      <div
        ref={spiderRef}
        className="absolute top-0 right-4 sm:right-8 md:right-16 z-30 pointer-events-none flex flex-col items-center origin-top"
      >
        <div className={`w-[2px] h-10 sm:h-14 md:h-20 ${
          isDark
            ? "bg-gradient-to-b from-transparent to-[#f97316] opacity-90 shadow-[0_0_10px_#f97316]"
            : "bg-gradient-to-b from-transparent to-gray-400 opacity-60"
        }`} />
        <img
          src={isDark ? MILES_ASSETS.hangingSpiderImg : ASSETS.hangingSpiderImg}
          alt={isDark ? "Hanging Miles Morales" : "Hanging Spider-Man"}
          width="160"
          height="200"
          loading="lazy"
          className="w-16 sm:w-24 md:w-32 lg:w-36 h-auto object-contain drop-shadow-lg -mt-2"
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-1 sm:mb-2 z-10 px-4">
        <span className={`font-comic tracking-[0.2em] text-[10px] sm:text-xs uppercase mb-0.5 flex items-center gap-1.5 font-bold ${
          isDark ? "text-[#fb923c]" : "text-[#a31515]"
        }`}>
          <img
            src={isDark ? MILES_ASSETS.spiderIcon : ASSETS.spiderIcon}
            alt="Spider"
            width="16"
            height="16"
            className="w-3.5 h-3.5 object-contain"
          />
          Technical Arsenal & Weapons of Choice
        </span>
        <h2 className={`text-comic-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight ${
          isDark ? "text-white drop-shadow-[2px_2px_0px_#e11d48]" : "text-gray-950"
        }`}>
          TECHNICAL SKILLS.
        </h2>
        <p className={`font-dialogue text-xs sm:text-sm mt-1 max-w-md ${
          isDark ? "text-gray-400" : "text-gray-700"
        }`}>
          Tools, frameworks, and architectures powering battle-tested distributed systems.
        </p>
        <div className={`w-14 h-1 mt-2 rounded-full ${
          isDark
            ? "bg-[#f97316] shadow-[0_0_10px_#f97316]"
            : "bg-[#a31515] shadow-[0_0_8px_rgba(163,21,21,0.6)]"
        }`} />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-2 sm:mt-3 mb-2 sm:mb-3 z-20 px-3 max-w-3xl">
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-comic text-[11px] sm:text-xs md:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 ${
                isDark
                  ? isActive
                    ? "bg-[#e11d48] text-white shadow-[0_4px_14px_rgba(225,29,72,0.6)] scale-105 font-bold border border-[#e11d48] focus-visible:ring-[#f97316]"
                    : "bg-[#141414] hover:bg-[#1f1f1f] text-gray-300 hover:text-[#fb923c] border border-[#2a2a2a] hover:border-[#f97316]/50 shadow-xs hover:scale-102 focus-visible:ring-[#f97316]"
                  : isActive
                  ? "bg-[#a31515] text-white shadow-[0_4px_14px_rgba(163,21,21,0.45)] scale-105 font-bold border border-[#a31515] focus-visible:ring-[#a31515]"
                  : "bg-white/85 hover:bg-white text-gray-700 hover:text-[#a31515] border border-gray-200/90 hover:border-[#a31515]/50 shadow-xs hover:scale-102 focus-visible:ring-[#a31515]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Spider Web with Interactive Tech Nodes */}
      <div className="w-full flex justify-center items-center z-10">
        <TechWeb selectedCategory={selectedCategory} />
      </div>
    </section>
  );
};

export default Skills;
