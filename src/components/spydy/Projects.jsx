import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA, ASSETS } from "../../data/spidermanData";

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const webRef = useRef(null);
  const spiderRef = useRef(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

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
        opacity: 0.07,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      // Fixed standing Spider-Man at base
      gsap.set(spiderRef.current, { y: 0 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-white text-gray-900 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Web Corner Accent */}
      <div className="absolute top-0 right-0 pointer-events-none overflow-hidden z-0">
        <img
          ref={webRef}
          src={ASSETS.webImg}
          alt="Background Web"
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain opacity-[0.04] mix-blend-multiply translate-x-1/4 -translate-y-1/4"
        />
      </div>

      {/* Crouched Spider-Man Corner Observer */}
      <div
        ref={spiderRef}
        className="absolute -bottom-8 md:-bottom-12 -left-4 sm:left-2 md:left-6 lg:left-12 z-30 pointer-events-none"
      >
        <img
          src={ASSETS.standingSpiderImg}
          alt="Standing Spider-Man"
          className="w-28 sm:w-36 md:w-48 h-auto object-contain drop-shadow-2xl select-none"
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-10 z-10">
        <span className="text-[#a31515] font-comic tracking-[0.2em] text-xs sm:text-sm uppercase mb-1 flex items-center gap-1.5 font-bold">
          <img src={ASSETS.spiderIcon} alt="Spider" className="w-4 h-4 object-contain" />
          Featured Missions & Code In Action
        </span>
        <h2 className="text-comic-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
          FEATURED MISSIONS.
        </h2>
        <p className="font-dialogue text-gray-700 text-sm sm:text-base mt-2 max-w-md">
          Open-source repositories, distributed engines, and interactive web adventures.
        </p>
        <div className="w-16 h-1.5 bg-[#a31515] mt-3 rounded-full shadow-[0_0_8px_rgba(163,21,21,0.6)]" />
      </div>

      {/* Projects Grid: 3 per row on desktop, 2 on tablet, 1 on mobile */}
      <div className="w-full max-w-7xl px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 z-10">
        {PROJECTS_DATA.map((proj, idx) => (
          <a
            key={idx}
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            className={`project-item group relative bg-gray-50/90 backdrop-blur-sm border border-gray-200 hover:border-[#a31515] p-5 sm:p-6 rounded-2xl transition-all duration-300 flex-col justify-between cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_10px_25px_rgba(163,21,21,0.15)] transform hover:-translate-y-1 ${
              idx >= 3 && !showAllMobile ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Top Red Beam Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#a31515] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

            <div>
              {proj.isPinned && (
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 font-dialogue font-bold text-[11px] tracking-wider uppercase px-2.5 py-0.5 bg-red-50 text-[#a31515] border border-[#a31515]/30 rounded-md group-hover:bg-[#a31515] group-hover:text-white transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a31515] group-hover:bg-white animate-pulse" />
                    PINNED // GITHUB
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-comic text-lg sm:text-xl uppercase tracking-wide text-gray-900 group-hover:text-[#a31515] transition-colors duration-300">
                  {proj.title}
                </h3>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-[#a31515] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
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
              <p className="font-dialogue text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                “{proj.description}”
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/60">
              {proj.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="font-dialogue text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white border border-gray-200 text-gray-600 group-hover:border-[#a31515]/30 group-hover:text-[#a31515] rounded-md transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Mobile View More Missions Toggle */}
      {PROJECTS_DATA.length > 3 && (
        <div className="w-full flex justify-center mt-6 md:hidden z-10">
          <button
            type="button"
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="min-h-[44px] px-6 py-2.5 rounded-full font-comic text-xs uppercase tracking-widest font-bold transition-all duration-200 shadow-sm flex items-center gap-2 bg-white text-[#a31515] border-2 border-[#a31515] hover:bg-red-50 active:scale-95 cursor-pointer"
          >
            <span>{showAllMobile ? "Show Fewer Missions" : `View More Missions (${PROJECTS_DATA.length - 3})`}</span>
            <svg
              className={`w-3.5 h-3.5 transform transition-transform duration-300 ${
                showAllMobile ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* View All Projects on GitHub Action */}
      <div className="w-full flex justify-center mt-8 sm:mt-10 z-10">
        <a
          href="https://github.com/AyushSriva2598?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="group/cta inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl font-comic text-xs sm:text-sm uppercase tracking-widest font-bold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer bg-[#a31515] hover:bg-[#7a0f0f] text-white border-2 border-[#a31515] shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000]"
        >
          <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover/cta:scale-110" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>View All Projects on GitHub</span>
          <span className="text-base transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
};
