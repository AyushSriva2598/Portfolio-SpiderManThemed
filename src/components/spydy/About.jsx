import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_DATA, ASSETS, MILES_ASSETS } from "../../data/spidermanData";
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const posterRef = useRef(null);
  const webLeftRef = useRef(null);
  const webRightRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =========================
      // SCROLL ENTRY ANIMATION
      // =========================
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          [webLeftRef.current, webRightRef.current],
          { y: -600, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            ease: "elastic.out(0.8, 0.4)",
            stagger: 0.3,
          }
        )
        .fromTo(
          badgeRef.current,
          {
            x: -50,
            opacity: 0,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          },
          {
            x: 0,
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=1.4"
        )
        .fromTo(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
            clipPath:
              "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          },
          {
            y: 0,
            opacity: 1,
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=1.0"
        )
        .fromTo(
          posterRef.current,
          { scale: 0.6, opacity: 0, rotation: -15 },
          {
            scale: 1,
            opacity: 1,
            rotation: 5,
            duration: 1.2,
            ease: "back.out(1.4)",
          },
          "-=0.8"
        )
        .fromTo(
          textRef.current?.children || [],
          { y: 40, opacity: 0, rotationX: -45 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.2)",
          },
          "-=1.2"
        );

      // =========================
      // AMBIENT WEB ROTATIONS
      // =========================
      gsap.to(".bg-web-left", {
        rotation: 360,
        transformOrigin: "center center",
        repeat: -1,
        duration: 70,
        ease: "linear",
      });

      gsap.to(".bg-web-right", {
        rotation: -360,
        transformOrigin: "center center",
        repeat: -1,
        duration: 90,
        ease: "linear",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative w-full min-h-[100dvh] pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-20 sm:pb-24 flex flex-col items-center justify-center overflow-hidden z-[1] transition-colors duration-500 ${
        isDark ? "bg-[#080808] text-white" : "bg-white text-gray-900"
      }`}
    >

      {/* =====================================================
          HANGING WEB — LEFT
      ===================================================== */}
      <div
        ref={webLeftRef}
        className="absolute top-[-50px] left-[-5%] md:left-[2%] flex flex-col items-center pointer-events-none z-0"
      >
        <div className={`w-[1px] h-[250px] md:h-[350px] ${
          isDark
            ? "bg-gradient-to-b from-transparent to-[#f97316]/40"
            : "bg-gradient-to-b from-transparent to-gray-300"
        }`} />

        <img
          src={ASSETS.webImg}
          alt="Hanging Web Left"
          width="384"
          height="384"
          loading="lazy"
          decoding="async"
          className={`bg-web-left w-64 h-64 md:w-96 md:h-96 object-contain -mt-12 ${
            isDark ? "opacity-[0.16] invert" : "opacity-[0.12] mix-blend-multiply"
          }`}
        />
      </div>

      {/* =====================================================
          HANGING WEB — RIGHT
      ===================================================== */}
      <div
        ref={webRightRef}
        className="absolute top-[-50px] right-[-5%] md:right-[2%] flex flex-col items-center pointer-events-none z-0"
      >
        <div className={`w-[1px] h-[200px] md:h-[300px] ${
          isDark
            ? "bg-gradient-to-b from-transparent to-[#f97316]/40"
            : "bg-gradient-to-b from-transparent to-gray-300"
        }`} />

        <img
          src={ASSETS.webImg}
          alt="Hanging Web Right"
          width="320"
          height="320"
          loading="lazy"
          decoding="async"
          className={`bg-web-right w-56 h-56 md:w-80 md:h-80 object-contain -mt-10 ${
            isDark ? "opacity-[0.16] invert" : "opacity-[0.12] mix-blend-multiply"
          }`}
        />
      </div>

      {/* =====================================================
          MAIN CONTENT CONTAINER
      ===================================================== */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">

        {/* ===================================================
            TOP TWO-COLUMN AREA
        =================================================== */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

          {/* =================================================
              LEFT COLUMN — BIOGRAPHY
          ================================================= */}
          <div className="w-full lg:w-1/2 min-w-0 flex flex-col gap-5 sm:gap-6 mt-6 lg:mt-0 relative z-20">

            {/* Badge */}
            <div className="overflow-hidden">
              <span
                ref={badgeRef}
                className={`inline-flex items-center gap-2 font-comic tracking-[0.2em] text-xs sm:text-sm uppercase font-bold ${
                  isDark ? "text-[#fb923c]" : "text-[#a31515]"
                }`}
              >
                <img
                  src={isDark ? MILES_ASSETS.spiderIcon : ASSETS.spiderIcon}
                  alt="Spider"
                  width="20"
                  height="20"
                  className="w-5 h-5 object-contain drop-shadow-sm"
                />

                {ABOUT_DATA.badge}
              </span>
            </div>

            {/* Title */}
            <div className="overflow-hidden py-2">
              <h2
                ref={titleRef}
                className={`text-comic-title text-[clamp(2.25rem,1.8rem+3vw,4.5rem)] leading-none ${
                  isDark ? "text-white drop-shadow-[2px_2px_0px_#e11d48]" : "text-gray-950"
                }`}
              >
                {ABOUT_DATA.title}
              </h2>
            </div>

            {/* Biography */}
            <div
              ref={textRef}
              className={`flex flex-col gap-4 sm:gap-5 font-dialogue text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mt-2 border-l-4 pl-4 sm:pl-5 py-4 pr-4 rounded-r-2xl transition-all duration-300 ${
                isDark
                  ? "border-[#e11d48] text-gray-200 bg-[#121212]/60 shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
                  : "border-[#a31515] text-gray-900 bg-white/0 shadow-sm"
              }`}
              style={{ perspective: "1000px" }}
            >
              {ABOUT_DATA.paragraphs.map((p, idx) => (
                <p key={idx} className="origin-bottom">
                  &ldquo;{p}&rdquo;
                </p>
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT COLUMN — MUGSHOT / ID
          ================================================= */}
          <div className="w-full lg:w-1/2 min-w-0 relative flex justify-center items-center min-h-[380px] sm:min-h-[440px] md:min-h-[500px] translate-y-2 sm:translate-y-4 lg:translate-y-0">

            <div
              ref={posterRef}
              className="relative z-30 group"
              style={{ transform: "rotate(5deg)" }}
            >

              {/* Top Web */}
              <img
                src={ASSETS.webImg}
                alt=""
                aria-hidden="true"
                width="128"
                height="128"
                loading="lazy"
                decoding="async"
                className={`absolute -top-10 -left-10 w-24 h-24 md:w-32 md:h-32 object-contain pointer-events-none z-20 ${
                  isDark ? "opacity-60 invert" : "opacity-50"
                }`}
              />

              {/* Bottom Web */}
              <img
                src={ASSETS.webImg}
                alt=""
                aria-hidden="true"
                width="112"
                height="112"
                loading="lazy"
                decoding="async"
                className={`absolute -bottom-8 -right-8 w-20 h-20 md:w-28 md:h-28 object-contain pointer-events-none z-20 -scale-x-100 -scale-y-100 ${
                  isDark ? "opacity-50 invert" : "opacity-40"
                }`}
              />

              {/* Poster */}
              <div className={`poster-frame relative w-[min(100%,300px)] sm:w-[320px] md:w-[360px] aspect-[3/4] border-[3px] rounded-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                isDark
                  ? "bg-[#141414] border-[#e11d48] shadow-[0_0_30px_rgba(225,29,72,0.3)]"
                  : "bg-[#f5f0e8] border-[#d4c9a8] shadow-lg"
              }`}>
                <img
                  src={isDark ? MILES_ASSETS.mugshotPoster : ASSETS.mugshotPoster}
                  alt={isDark ? "Brooklyn Visions — Ayush Srivastava" : "Daily Bugle — Ayush Srivastava"}
                  width="360"
                  height="480"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};