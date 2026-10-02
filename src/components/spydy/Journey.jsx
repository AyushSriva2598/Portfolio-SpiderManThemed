import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY_DATA, ASSETS, MILES_ASSETS } from "../../data/spidermanData";
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export const Journey = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const timelineNodesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section Header Scroll Entrance
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
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        )
        .fromTo(
          cardRef.current,
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
          "-=0.3"
        );

      // 2. Staggered Timeline Node Reveals
      if (timelineNodesRef.current.length > 0) {
        gsap.fromTo(
          timelineNodesRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t transition-colors duration-500 ${
        isDark ? "bg-[#060606] text-white border-[#181818]" : "bg-white text-gray-900 border-gray-100"
      }`}
    >
      {/* Background Web Watermark Accent */}
      <div className="absolute top-0 left-0 pointer-events-none overflow-hidden z-0">
        <img
          src={ASSETS.webImg}
          alt=""
          aria-hidden="true"
          className={`w-[400px] h-[400px] md:w-[600px] md:h-[600px] object-contain -translate-x-1/3 -translate-y-1/3 ${
            isDark ? "opacity-[0.08] invert" : "opacity-[0.03] mix-blend-multiply"
          }`}
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-10 sm:mb-12 z-10 px-4 max-w-2xl">
        <span className={`font-comic tracking-[0.2em] text-xs sm:text-sm uppercase mb-1 flex items-center gap-1.5 font-bold ${
          isDark ? "text-[#fb923c]" : "text-[#a31515]"
        }`}>
          <img
            src={isDark ? MILES_ASSETS.spiderIcon : ASSETS.spiderIcon}
            alt="Spider"
            width="16"
            height="16"
            className="w-4 h-4 object-contain"
          />
          {JOURNEY_DATA.badge}
        </span>
        <h2 className={`text-comic-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight ${
          isDark ? "text-white drop-shadow-[2px_2px_0px_#e11d48]" : "text-gray-950"
        }`}>
          {JOURNEY_DATA.title}
        </h2>
        <p className={`font-dialogue text-xs sm:text-sm md:text-base mt-2 max-w-lg leading-relaxed ${
          isDark ? "text-gray-400" : "text-gray-700"
        }`}>
          {JOURNEY_DATA.subtitle}
        </p>
        <div className={`w-16 h-1 mt-3 rounded-full ${
          isDark ? "bg-[#f97316] shadow-[0_0_10px_#f97316]" : "bg-[#a31515] shadow-[0_0_8px_rgba(163,21,21,0.6)]"
        }`} />
      </div>

      {/* Main Comic Journey Card */}
      <div
        ref={cardRef}
        className={`relative w-full max-w-5xl rounded-2xl z-10 overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-[#0d0d0d] border-2 border-[#262626] shadow-[6px_6px_0px_#e11d48] sm:shadow-[8px_8px_0px_#e11d48]"
            : "bg-white border-2 border-black shadow-[6px_6px_0px_#000000] sm:shadow-[8px_8px_0px_#000000]"
        }`}
      >
        {/* Card Header Banner */}
        <div className={`p-6 sm:p-8 md:p-10 border-b-2 ${
          isDark
            ? "border-[#262626] bg-gradient-to-r from-[#141414] via-[#101010] to-[#141414]"
            : "border-black bg-gradient-to-r from-gray-50 via-white to-gray-50/50"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className={`font-comic text-xl sm:text-2xl md:text-3xl uppercase tracking-wide ${
                isDark ? "text-white" : "text-gray-950"
              }`}>
                {JOURNEY_DATA.role}
              </h3>
              <span className={`font-bold text-lg hidden sm:inline ${
                isDark ? "text-[#fb923c]" : "text-[#a31515]"
              }`}>•</span>
              <span className={`text-xs sm:text-sm font-comic font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                isDark
                  ? "text-[#fb923c] bg-[#161616] border border-[#f97316]/40"
                  : "text-[#a31515] bg-red-50 border border-red-200/80"
              }`}>
                {JOURNEY_DATA.status}
              </span>
            </div>

            <span className={`self-start sm:self-auto font-dialogue font-bold text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-2xs ${
              isDark
                ? "text-gray-300 bg-[#1a1a1a] border border-[#333333]"
                : "text-gray-600 bg-white border border-gray-300"
            }`}>
              {JOURNEY_DATA.timeline}
            </span>
          </div>

          <p className={`font-dialogue text-sm sm:text-base leading-relaxed border-l-3 pl-3.5 py-0.5 mt-3 ${
            isDark ? "text-gray-300 border-[#e11d48]" : "text-gray-700 border-[#a31515]"
          }`}>
            {JOURNEY_DATA.narrativeContext}
          </p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative p-6 sm:p-8 md:p-10">
          {/* Continuous Vertical Connecting Spine Line */}
          <div
            className={`absolute left-[33px] sm:left-[41px] md:left-[49px] top-12 bottom-12 w-[3px] rounded-full ${
              isDark
                ? "bg-gradient-to-b from-[#e11d48] via-[#f97316] to-[#e11d48] shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                : "bg-gradient-to-b from-[#a31515] via-gray-300 to-[#a31515]"
            }`}
            aria-hidden="true"
          />

          {/* Timeline Phases */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {JOURNEY_DATA.phases.map((phase, idx) => (
              <div
                key={phase.id}
                ref={(el) => {
                  timelineNodesRef.current[idx] = el;
                }}
                className="relative flex items-start gap-4 sm:gap-6 md:gap-8 group"
              >
                {/* Node Milestone Indicator on the Spine */}
                <div className="relative z-10 shrink-0 mt-0.5">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? "bg-[#141414] border-2 border-[#f97316] shadow-[3px_3px_0px_#e11d48] group-hover:scale-110 group-hover:border-[#e11d48] group-hover:shadow-[3px_3px_0px_#f97316]"
                      : "bg-white border-2 border-black shadow-[3px_3px_0px_#000000] group-hover:scale-110 group-hover:border-[#a31515] group-hover:shadow-[3px_3px_0px_#a31515]"
                  }`}>
                    <span className={`font-comic font-bold text-xs sm:text-sm tracking-tight ${
                      isDark ? "text-[#fb923c] group-hover:text-[#e11d48]" : "text-[#a31515]"
                    }`}>
                      {phase.id}
                    </span>
                  </div>
                </div>

                {/* Phase Content Box */}
                <div className={`flex-1 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                  isDark
                    ? "bg-[#131313]/90 hover:bg-[#181818] border border-[#242424] hover:border-[#f97316] hover:shadow-[4px_4px_0px_#f97316]"
                    : "bg-gray-50/70 hover:bg-white border border-gray-200 hover:border-[#a31515] hover:shadow-[4px_4px_0px_#a31515]"
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] sm:text-xs font-comic font-bold tracking-wider uppercase ${
                        isDark ? "text-[#fb923c]" : "text-[#a31515]"
                      }`}>
                        {phase.phaseNumber}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className={`text-[11px] sm:text-xs font-dialogue font-bold uppercase tracking-wider ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {phase.timeframe}
                      </span>
                    </div>

                    <span className={`text-[11px] font-dialogue font-bold uppercase tracking-widest hidden md:inline ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {phase.tagline}
                    </span>
                  </div>

                  <h4 className={`font-dialogue font-bold text-base sm:text-lg mb-2 ${
                    isDark ? "text-white" : "text-gray-950"
                  }`}>
                    {phase.title}
                  </h4>

                  <p className={`font-dialogue text-xs sm:text-sm sm:leading-relaxed mb-4 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {phase.description}
                  </p>

                  {/* Skills / Habits Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {phase.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-dialogue font-bold transition-colors duration-200 shadow-2xs ${
                          isDark
                            ? "bg-[#1a1a1a] border border-[#2e2e2e] text-gray-200 hover:border-[#f97316] hover:text-[#fb923c]"
                            : "bg-white border border-gray-200 text-gray-800 hover:border-[#a31515] hover:text-[#a31515]"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className={`border-t-2 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x-2 ${
          isDark
            ? "border-[#262626] bg-[#111111] divide-[#262626]"
            : "border-black bg-gray-50/90 divide-black"
        }`}>
          {JOURNEY_DATA.stats.map((stat, idx) => (
            <div key={idx} className="p-4 sm:p-6 flex flex-col items-center justify-center text-center group">
              <span className={`font-comic text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider transition-transform duration-200 group-hover:scale-105 ${
                isDark ? "text-[#fb923c] group-hover:text-[#e11d48]" : "text-[#a31515]"
              }`}>
                {stat.value}
              </span>
              <span className={`font-dialogue text-[10px] sm:text-xs font-bold tracking-widest uppercase mt-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
