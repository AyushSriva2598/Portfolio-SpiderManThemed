import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY_DATA, ASSETS } from "../../data/spidermanData";

gsap.registerPlugin(ScrollTrigger);

export const Journey = () => {
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
      className="relative w-full bg-white text-gray-900 py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-gray-100"
    >
      {/* Background Web Watermark Accent */}
      <div className="absolute top-0 left-0 pointer-events-none overflow-hidden z-0">
        <img
          src={ASSETS.webImg}
          alt=""
          aria-hidden="true"
          className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] object-contain opacity-[0.03] mix-blend-multiply -translate-x-1/3 -translate-y-1/3"
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-10 sm:mb-12 z-10 px-4 max-w-2xl">
        <span className="text-[#a31515] font-comic tracking-[0.2em] text-xs sm:text-sm uppercase mb-1 flex items-center gap-1.5 font-bold">
          <img src={ASSETS.spiderIcon} alt="Spider" width="16" height="16" className="w-4 h-4 object-contain" />
          {JOURNEY_DATA.badge}
        </span>
        <h2 className="text-comic-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
          {JOURNEY_DATA.title}
        </h2>
        <p className="font-dialogue text-gray-700 text-xs sm:text-sm md:text-base mt-2 max-w-lg leading-relaxed">
          {JOURNEY_DATA.subtitle}
        </p>
        <div className="w-16 h-1 bg-[#a31515] mt-3 rounded-full shadow-[0_0_8px_rgba(163,21,21,0.6)]" />
      </div>

      {/* Main Comic Journey Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-5xl bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] z-10 overflow-hidden"
      >
        {/* Card Header Banner */}
        <div className="p-6 sm:p-8 md:p-10 border-b-2 border-black bg-gradient-to-r from-gray-50 via-white to-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className="font-comic text-xl sm:text-2xl md:text-3xl text-gray-950 uppercase tracking-wide">
                {JOURNEY_DATA.role}
              </h3>
              <span className="text-[#a31515] font-bold text-lg hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm font-comic font-bold uppercase tracking-wider text-[#a31515] bg-red-50 border border-red-200/80 px-2.5 py-0.5 rounded-md">
                {JOURNEY_DATA.status}
              </span>
            </div>

            <span className="self-start sm:self-auto font-dialogue font-bold text-xs tracking-wider uppercase text-gray-600 bg-white border border-gray-300 px-3 py-1 rounded-full shadow-2xs">
              {JOURNEY_DATA.timeline}
            </span>
          </div>

          <p className="font-dialogue text-gray-700 text-sm sm:text-base leading-relaxed border-l-3 border-[#a31515] pl-3.5 py-0.5 mt-3">
            {JOURNEY_DATA.narrativeContext}
          </p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative p-6 sm:p-8 md:p-10">
          {/* Continuous Vertical Connecting Spine Line */}
          <div
            className="absolute left-[33px] sm:left-[41px] md:left-[49px] top-12 bottom-12 w-[3px] bg-gradient-to-b from-[#a31515] via-gray-300 to-[#a31515] rounded-full"
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
                  <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000] transition-all duration-300 group-hover:scale-110 group-hover:border-[#a31515] group-hover:shadow-[3px_3px_0px_#a31515]">
                    <span className="font-comic font-bold text-xs sm:text-sm text-[#a31515] tracking-tight">
                      {phase.id}
                    </span>
                  </div>
                </div>

                {/* Phase Content Box */}
                <div className="flex-1 bg-gray-50/70 hover:bg-white border border-gray-200 hover:border-[#a31515] rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-[4px_4px_0px_#a31515] hover:-translate-y-0.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] sm:text-xs font-comic font-bold text-[#a31515] tracking-wider uppercase">
                        {phase.phaseNumber}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[11px] sm:text-xs font-dialogue font-bold text-gray-500 uppercase tracking-wider">
                        {phase.timeframe}
                      </span>
                    </div>

                    <span className="text-[11px] font-dialogue font-bold text-gray-500 uppercase tracking-widest hidden md:inline">
                      {phase.tagline}
                    </span>
                  </div>

                  <h4 className="font-dialogue font-bold text-base sm:text-lg text-gray-950 mb-2">
                    {phase.title}
                  </h4>

                  <p className="font-dialogue text-gray-700 text-xs sm:text-sm sm:leading-relaxed mb-4">
                    {phase.description}
                  </p>

                  {/* Skills / Habits Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {phase.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-gray-200 text-[11px] sm:text-xs font-dialogue font-bold text-gray-800 transition-colors duration-200 hover:border-[#a31515] hover:text-[#a31515] shadow-2xs"
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

        {/* Bottom Metrics Bar (Mirroring Screenshot Structure) */}
        <div className="border-t-2 border-black bg-gray-50/90 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x-2 divide-black">
          {JOURNEY_DATA.stats.map((stat, idx) => (
            <div key={idx} className="p-4 sm:p-6 flex flex-col items-center justify-center text-center group">
              <span className="font-comic text-2xl sm:text-3xl lg:text-4xl text-[#a31515] font-bold tracking-wider transition-transform duration-200 group-hover:scale-105">
                {stat.value}
              </span>
              <span className="font-dialogue text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase mt-1">
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
