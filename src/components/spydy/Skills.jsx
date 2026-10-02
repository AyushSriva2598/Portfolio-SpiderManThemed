import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "../../data/spidermanData";
import { TechWeb } from "./TechWeb";

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
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
      className="relative w-full bg-white text-gray-900 pt-16 sm:pt-20 pb-20 sm:pb-28 px-2 sm:px-6 md:px-12 flex flex-col items-center justify-center overflow-x-clip border-t border-gray-100"
    >
      {/* Hanging Ceiling Spider-Man */}
      <div
        ref={spiderRef}
        className="absolute top-0 right-4 sm:right-8 md:right-16 z-30 pointer-events-none flex flex-col items-center origin-top"
      >
        <div className="w-[2px] h-12 sm:h-16 md:h-24 bg-gradient-to-b from-transparent to-gray-400 opacity-60" />
        <img
          src={ASSETS.hangingSpiderImg}
          alt="Hanging Spider-Man"
          width="160"
          height="200"
          loading="lazy"
          className="w-20 sm:w-28 md:w-36 lg:w-40 h-auto object-contain drop-shadow-lg -mt-2"
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-6 sm:mb-10 z-10 px-4">
        <span className="text-[#a31515] font-comic tracking-[0.2em] text-xs sm:text-sm uppercase mb-1 flex items-center gap-1.5 font-bold">
          <img src={ASSETS.spiderIcon} alt="Spider" width="16" height="16" className="w-4 h-4 object-contain" />
          Technical Arsenal & Weapons of Choice
        </span>
        <h2 className="text-comic-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
          TECHNICAL SKILLS.
        </h2>
        <p className="font-dialogue text-gray-700 text-xs sm:text-sm md:text-base mt-2 max-w-md">
          Tools, frameworks, and architectures powering battle-tested distributed systems.
        </p>
        <div className="w-16 h-1.5 bg-[#a31515] mt-3 rounded-full shadow-[0_0_8px_rgba(163,21,21,0.6)]" />
      </div>

      {/* Spider Web with Interactive Tech Nodes */}
      <div className="w-full flex justify-center items-center z-10">
        <TechWeb />
      </div>
    </section>
  );
};

export default Skills;
