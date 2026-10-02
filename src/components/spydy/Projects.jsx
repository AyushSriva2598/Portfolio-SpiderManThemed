import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA, ASSETS, MILES_ASSETS } from "../../data/spidermanData";
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const webRef = useRef(null);
  const spiderRef = useRef(null);

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
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        )
        .fromTo(
          ".project-item",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" },
          "-=0.3"
        )
        .fromTo(
          spiderRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.4"
        );

      // Background web subtle rotation and breathing
      gsap.set(webRef.current, { transformOrigin: "top right" });
      gsap.to(webRef.current, {
        rotation: 8,
        repeat: -1,
        yoyo: true,
        duration: 6,
        ease: "sine.inOut",
      });
      gsap.to(webRef.current, {
        scale: 1.1,
        opacity: isDark ? 0.12 : 0.07,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      // Crouched Spider-Man breathing idle
      gsap.to(spiderRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative w-full pt-6 sm:pt-8 pb-16 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#080808] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Background Web Corner Accent */}
      <div className="absolute top-0 right-0 pointer-events-none overflow-hidden z-0">
        <img
          ref={webRef}
          src={ASSETS.webImg}
          alt="Background Web"
          className={`w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain translate-x-1/4 -translate-y-1/4 ${
            isDark ? "opacity-[0.08] invert" : "opacity-[0.04] mix-blend-multiply"
          }`}
        />
      </div>

      {/* Crouched Spider-Man Corner Observer */}
      <div
        ref={spiderRef}
        className="absolute bottom-0 left-2 sm:left-4 md:left-12 z-30 pointer-events-none"
      >
        <img
          src={isDark ? MILES_ASSETS.standingSpiderImg : ASSETS.standingSpiderImg}
          alt={isDark ? "Standing Miles Morales" : "Standing Spider-Man"}
          className={`w-28 sm:w-36 md:w-48 h-auto object-contain select-none ${
            isDark
              ? "drop-shadow-[0_12px_30px_rgba(0,0,0,0.8)] drop-shadow-[0_0_20px_rgba(225,29,72,0.3)]"
              : "drop-shadow-2xl"
          }`}
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-10 z-10">
        <span className={`font-comic tracking-[0.2em] text-xs sm:text-sm uppercase mb-1 flex items-center gap-1.5 font-bold ${
          isDark ? "text-[#fb923c]" : "text-[#a31515]"
        }`}>
          <img
            src={isDark ? MILES_ASSETS.spiderIcon : ASSETS.spiderIcon}
            alt="Spider"
            className="w-4 h-4 object-contain"
          />
          Featured Missions & Code In Action
        </span>
        <h2 className={`text-comic-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight ${
          isDark ? "text-white drop-shadow-[2px_2px_0px_#e11d48]" : "text-gray-950"
        }`}>
          FEATURED MISSIONS.
        </h2>
        <p className={`font-dialogue text-sm sm:text-base mt-2 max-w-md ${
          isDark ? "text-gray-400" : "text-gray-700"
        }`}>
          Open-source repositories, distributed engines, and interactive web adventures.
        </p>
        <div className={`w-16 h-1.5 mt-3 rounded-full ${
          isDark ? "bg-[#f97316] shadow-[0_0_10px_#f97316]" : "bg-[#a31515] shadow-[0_0_8px_rgba(163,21,21,0.6)]"
        }`} />
      </div>

      {/* Projects Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 z-10">
        {PROJECTS_DATA.map((proj, idx) => (
          <a
            key={idx}
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            className={`project-item group relative p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1 ${
              isDark
                ? "bg-[#111111]/90 backdrop-blur-sm border border-[#222222] hover:border-[#f97316] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_28px_rgba(249,115,22,0.25)]"
                : "bg-gray-50/90 backdrop-blur-sm border border-gray-200 hover:border-[#a31515] shadow-sm hover:shadow-[0_10px_25px_rgba(163,21,21,0.15)]"
            }`}
          >
            {/* Top Beam Line */}
            <div className={`absolute top-0 left-0 w-full h-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out ${
              isDark ? "bg-[#f97316]" : "bg-[#a31515]"
            }`} />

            <div>
              {proj.isPinned && (
                <div className="mb-2">
                  <span className={`inline-flex items-center gap-1.5 font-dialogue font-bold text-[11px] tracking-wider uppercase px-2.5 py-0.5 rounded-md transition-colors duration-300 ${
                    isDark
                      ? "bg-[#1a1a1a] text-[#fb923c] border border-[#f97316]/40 group-hover:bg-[#f97316] group-hover:text-black"
                      : "bg-red-50 text-[#a31515] border border-[#a31515]/30 group-hover:bg-[#a31515] group-hover:text-white"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      isDark ? "bg-[#f97316] group-hover:bg-black" : "bg-[#a31515] group-hover:bg-white"
                    }`} />
                    PINNED // GITHUB
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-comic text-lg sm:text-xl uppercase tracking-wide transition-colors duration-300 ${
                  isDark ? "text-white group-hover:text-[#fb923c]" : "text-gray-900 group-hover:text-[#a31515]"
                }`}>
                  {proj.title}
                </h3>
                <svg
                  className={`w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ${
                    isDark ? "text-gray-500 group-hover:text-[#fb923c]" : "text-gray-400 group-hover:text-[#a31515]"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <p className={`font-dialogue text-sm sm:text-base leading-relaxed mb-6 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                “{proj.description}”
              </p>
            </div>

            <div className={`flex flex-wrap gap-2 pt-2 border-t ${
              isDark ? "border-[#222222]" : "border-gray-200/60"
            }`}>
              {proj.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className={`font-dialogue text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md transition-colors duration-300 ${
                    isDark
                      ? "bg-[#181818] border border-[#2a2a2a] text-gray-300 group-hover:border-[#f97316]/50 group-hover:text-[#fb923c]"
                      : "bg-white border border-gray-200 text-gray-600 group-hover:border-[#a31515]/30 group-hover:text-[#a31515]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
