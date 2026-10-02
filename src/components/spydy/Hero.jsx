import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { HERO_DATA, ASSETS, MILES_ASSETS } from "../../data/spidermanData";
import { useTheme } from "../../context/ThemeContext";

export const Hero = () => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const taglineRef = useRef(null);
  const headlineRef = useRef(null);
  const quoteRef = useRef(null);
  const ctaRef = useRef(null);
  const websRef = useRef(null);

  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const tween1 = useRef(null);
  const tween2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      gsap
        .timeline({ defaults: { ease: "back.out(1.7)" } })
        .fromTo(
          websRef.current?.children || [],
          { opacity: 0, scale: 0.5 },
          { opacity: 0.5, scale: 1,x: (i) => i === 1 ? -150 : 0,y:(i)=>i===1?100:0 ,duration: 2, stagger: 0.4, ease: "power3.out" }
        )
        .fromTo(
          taglineRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2 },
          "-=1.5"
        )
        .fromTo(
          [headlineRef.current, quoteRef.current],
          { x: -150, opacity: 0, skewX: -15 },
          { x: 0, opacity: 1, skewX: 0, duration: 1.2 },
          "-=1.0"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(2)" },
          "-=0.8"
        );

      // Web ambient rotations
      if (websRef.current?.children) {
        gsap.to(websRef.current.children, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "linear",
        });
        gsap.to(websRef.current.children, {
          scale: 1.1,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      // Marquee continuous loops
      if (marquee1Ref.current && marquee2Ref.current) {
        tween1.current = gsap.to(marquee1Ref.current, {
          x: "-50%",
          repeat: -1,
          duration: 16,
          ease: "none",
        });
        gsap.set(marquee2Ref.current, { x: "-50%" });
        tween2.current = gsap.to(marquee2Ref.current, {
          x: "0%",
          repeat: -1,
          duration: 20,
          ease: "none",
        });
      }

      // Kinetic marquee slight text float
      gsap.to(".marquee-text", {
        y: -4,
        yoyo: true,
        repeat: -1,
        duration: 0.8,
        ease: "sine.inOut",
        stagger: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMarqueeEnter = () => {
    if (tween1.current && tween2.current) {
      gsap.to([tween1.current, tween2.current], {
        timeScale: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  const handleMarqueeLeave = () => {
    if (tween1.current && tween2.current) {
      gsap.to([tween1.current, tween2.current], {
        timeScale: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  const currentSpiderIcon = isDark ? MILES_ASSETS.spiderIcon : ASSETS.spiderIcon;
  const currentWebImg = isDark ? MILES_ASSETS.webImg : ASSETS.webImg;

  const renderMarqueeContent = (items) => (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center h-full shrink-0">
          {items.map((item, idx) => (
            <React.Fragment key={`${i}-${idx}`}>
              <span className="marquee-text mx-2 sm:mx-3 md:mx-5 font-comic text-xs sm:text-sm md:text-base lg:text-lg uppercase italic tracking-widest whitespace-nowrap shrink-0 drop-shadow-sm">
                {item}
              </span>
              <img
                src={idx % 2 === 0 ? currentSpiderIcon : currentWebImg}
                alt="Separator"
                width="24"
                height="24"
                className="mx-2 sm:mx-3 md:mx-5 h-4 sm:h-5 md:h-6 lg:h-7 w-auto object-contain shrink-0 drop-shadow-md"
              />
            </React.Fragment>
          ))}
        </div>
      ))}
    </>
  );

  return (
    <div className="relative w-full flex flex-col bg-white dark:bg-[#050505] transition-colors duration-300">
      {/* Hero Section — Spider-Man / Miles Morales Background */}
      <section
        ref={containerRef}
        className="relative w-full min-h-[100dvh] h-[100dvh] overflow-hidden flex items-center justify-center select-none z-[1]"
      >
        {/* Single Background Image — Peter Mask / Miles Mask */}
        <img
          src={isDark ? MILES_ASSETS.topMaskImg : ASSETS.topMaskImg}
          alt="Spider-Man Hero"
          fetchPriority="high"
          width="1600"
          height="893"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 translate-x-4 md:translate-x-10 transition-all duration-500 ${
            isDark
              ? "opacity-90 drop-shadow-[0_0_35px_rgba(225,29,72,0.3)]"
              : "mix-blend-multiply"
          }`}
        />

        {/* Corner Web Overlays */}
        <div
          ref={websRef}
          className="absolute inset-0 pointer-events-none z-[25] overflow-hidden"
        >
          {/* TOP RIGHT */}
          <img
            src={currentWebImg}
            alt="Spider Web Top"
            width="320"
            height="320"
            className={`absolute top-0 right-0 w-36 h-36 sm:w-52 sm:h-52 md:w-[320px] md:h-[320px] object-contain ${
              isDark ? "opacity-25" : "opacity-40 sm:opacity-50 mix-blend-multiply"
            }`}
          />

          {/* BOTTOM LEFT */}
          <img
            src={currentWebImg}
            alt="Spider Web Bottom"
            width="400"
            height="400"
            className={`absolute bottom-0 left-0 w-42 h-42 sm:w-[230px] sm:h-[230px] md:w-[400px] md:h-[400px] object-contain ${
              isDark ? "opacity-25" : "opacity-40 sm:opacity-50 mix-blend-multiply"
            }`}
          />
        </div>

        {/* Hero Title & Information */}
        <div className="absolute top-1/3 -translate-y-[20%] left-4 sm:left-6 md:left-12 lg:left-20 z-30 flex flex-col gap-3 sm:gap-4 pointer-events-none drop-shadow-md max-w-xl w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-auto">
          <div
            ref={taglineRef}
            className="flex items-center gap-2 opacity-0"
          >
            <span className={`w-6 sm:w-8 h-[2px] ${isDark ? "bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" : "bg-red-600"}`} />
            <span className={`font-comic tracking-[0.2em] text-xs sm:text-sm md:text-base uppercase font-bold ${
              isDark ? "text-[#e11d48] drop-shadow-[0_0_10px_rgba(225,29,72,0.5)]" : "text-[#a31515]"
            }`}>
              {HERO_DATA.tagline}
            </span>
          </div>

          <h1
            ref={headlineRef}
            className={`text-comic-title text-[clamp(2.25rem,1.8rem+3vw,4.5rem)] leading-[0.95] tracking-tight opacity-0 select-none ${
              isDark
                ? "text-white drop-shadow-[3px_3px_0px_#e11d48]"
                : "text-gray-950"
            }`}
          >
            {HERO_DATA.firstName}
            {/* <br /> */}
            {HERO_DATA.lastName}
          </h1>

          <p className={`font-dialogue text-sm sm:text-base md:text-lg leading-relaxed max-w-lg select-text backdrop-blur-sm rounded-lg p-2.5 border-l-2 ${
            isDark
              ? "text-gray-200 bg-black/60 border-[#e11d48]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              : "text-gray-900 bg-white/20 border-[#a31515]/30"
          }`}>
            {HERO_DATA.narrativeContext}
          </p>

          <div className="flex items-center gap-2 text-xs font-dialogue tracking-wider font-bold text-gray-700 dark:text-gray-300">
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              isDark ? "bg-[#06b6d4] shadow-[0_0_10px_#06b6d4]" : "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
            }`} />
            <span> {HERO_DATA.role}</span>
          </div>

          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 pointer-events-auto"
          >
            <a
              href="#projects"
              className={`relative overflow-hidden text-white px-6 sm:px-8 py-3.5 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg font-comic tracking-wider text-sm sm:text-base transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 cursor-pointer uppercase border ${
                isDark
                  ? "bg-[#e11d48] hover:bg-[#be123c] border-[#e11d48] shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.7)]"
                  : "bg-[#a31515] hover:bg-[#7a0f0f] border-[#a31515] hover:shadow-[0_10px_20px_rgba(163,21,21,0.4)]"
              }`}
            >
              Explore Missions
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 min-h-[44px] min-w-[44px] rounded-lg font-comic tracking-wider text-sm sm:text-base transition-[transform,box-shadow,background-color] duration-300 cursor-pointer hover:-translate-y-1 uppercase group ${
                isDark
                  ? "bg-[#111111] hover:bg-[#1a1a1a] text-gray-100 border border-[#06b6d4]/50 hover:border-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                  : "text-white bg-gray-900 hover:bg-black hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
              }`}
            >
              <img
                src={currentSpiderIcon}
                alt="Spider"
                width="16"
                height="16"
                className="w-4 h-4 object-contain transition-transform group-hover:scale-110"
              />
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right Side Quote Heading */}
        <div className="absolute top-1/3 -translate-y-[20%] right-4 sm:right-6 md:right-12 lg:right-20 z-30 pointer-events-none drop-shadow-md select-none hidden lg:block text-right max-w-md scale-125">
          <h2
            ref={quoteRef}
            className={`text-comic-title text-[clamp(1.75rem,1.2rem+2.5vw,3.5rem)] leading-[0.95] tracking-tight opacity-0 select-none text-right ${
              isDark ? "text-white drop-shadow-[2px_2px_0px_#06b6d4]" : "text-gray-950"
            }`}
          >
            {HERO_DATA.quoteHeadingLine1}
            <br />
            {HERO_DATA.quoteHeadingLine2}
          </h2>
        </div>
      </section>
 
      {/* Tape Banners Wrapper: Zero-height anchor at Hero/About boundary */}
      <div
        className="relative w-full h-0 z-20 overflow-visible pointer-events-none"
        onMouseEnter={handleMarqueeEnter}
        onMouseLeave={handleMarqueeLeave}
      >
        {/* Tape 1: rotate(+3.5deg, mobile +2deg), slopes downward left-to-right */}
        <div className={`absolute w-[120vw] -left-[10vw] -top-5 sm:-top-6 md:-top-7 h-10 sm:h-12 md:h-14 lg:h-16 text-white border-y-[2px] sm:border-y-[3px] rotate-[2deg] md:rotate-[3.5deg] z-20 flex items-center overflow-hidden pointer-events-none ${
          isDark
            ? "bg-[#e11d48] border-[#262626] shadow-[0_10px_25px_rgba(225,29,72,0.4)]"
            : "bg-[#a31515] border-black shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
        }`}>
          <div ref={marquee1Ref} className="flex items-center h-full w-max">
            {renderMarqueeContent(HERO_DATA.marqueeItems)}
          </div>
        </div>

        {/* Tape 2: rotate(-3.5deg, mobile -2deg), slopes upward left-to-right */}
        <div className={`absolute w-[120vw] -left-[10vw] -top-5 sm:-top-6 md:-top-7 h-10 sm:h-12 md:h-14 lg:h-16 border-y-[2px] sm:border-y-[3px] rotate-[-2deg] md:rotate-[-3.5deg] z-10 flex items-center overflow-hidden pointer-events-none ${
          isDark
            ? "bg-[#0c0c0c] text-[#06b6d4] border-[#06b6d4] shadow-[0_8px_20px_rgba(6,182,212,0.35)]"
            : "bg-[#111111] text-[#ef4444] border-[#a31515] shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
        }`}>
          <div ref={marquee2Ref} className="flex items-center h-full w-max">
            {renderMarqueeContent(HERO_DATA.marqueeItems)}
          </div>
        </div>
      </div>
    </div>
  );
};
