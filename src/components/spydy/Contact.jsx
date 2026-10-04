import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_DATA, HERO_DATA, ASSETS, MILES_ASSETS } from "../../data/spidermanData";
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const webRef = useRef(null);
  const cardRef = useRef(null);
  const spiderRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

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
          cardRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.4)" },
          "-=0.3"
        );

      // Background web subtle scale
      gsap.to(webRef.current, {
        scale: 1.15,
        opacity: isDark ? 0.09 : 0.06,
        repeat: -1,
        yoyo: true,
        duration: 4.5,
        ease: "sine.inOut",
      });

      // Hanging Spider-Man pendulum swing
      gsap.to(spiderRef.current, {
        rotation: 8,
        transformOrigin: "top center",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative w-full py-16 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden border-t transition-colors duration-500 ${
        isDark ? "bg-[#060606] text-white border-[#181818]" : "bg-white text-gray-900 border-gray-100"
      }`}
    >
      {/* Background Web Watermark */}
      <div className="absolute bottom-0 left-0 pointer-events-none overflow-hidden z-0">
        <img
          ref={webRef}
          src={ASSETS.webImg}
          alt="Background Web"
          className={`w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain -translate-x-1/4 translate-y-1/4 ${
            isDark ? "opacity-[0.08] invert" : "opacity-[0.04] mix-blend-multiply"
          }`}
        />
      </div>

      {/* Hanging Spider-Man Web Drop */}
      <div
        ref={spiderRef}
        className="absolute top-0 right-6 sm:right-10 md:right-20 z-30 pointer-events-none flex flex-col items-center origin-top"
      >
        <div className={`w-[2px] h-20 sm:h-24 md:h-36 ${
          isDark
            ? "bg-gradient-to-b from-transparent to-[#f97316] opacity-90 shadow-[0_0_10px_#f97316]"
            : "bg-gradient-to-b from-transparent to-gray-400 opacity-60"
        }`} />
        <img
          src={isDark ? MILES_ASSETS.hangingSpiderImg : ASSETS.hangingSpiderImg}
          alt={isDark ? "Hanging Miles Morales" : "Hanging Spider-Man"}
          className={`w-32 sm:w-40 md:w-60 h-auto object-contain -mt-1 ${
            isDark
              ? "translate-x-[3.6%] drop-shadow-[0_12px_30px_rgba(0,0,0,0.8)] drop-shadow-[0_0_20px_rgba(167,29,36,0.4)]"
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
          Dispatch A Transmission
        </span>
        <h2 className={`text-comic-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight ${
          isDark ? "text-white drop-shadow-[2px_2px_0px_#a71d24]" : "text-gray-950"
        }`}>
          CONTACT AYUSH.
        </h2>
        <p className={`font-dialogue text-sm sm:text-base mt-2 max-w-md ${
          isDark ? "text-gray-400" : "text-gray-700"
        }`}>
          Have an ambitious mission, distributed system project, or engineering challenge? Send a signal.
        </p>
        <div className={`w-16 h-1.5 mt-3 rounded-full ${
          isDark ? "bg-[#f97316] shadow-[0_0_10px_#f97316]" : "bg-[#a31515] shadow-[0_0_8px_rgba(163,21,21,0.6)]"
        }`} />
      </div>

      {/* Contact Card */}
      <div
        ref={cardRef}
        className={`w-full max-w-2xl p-6 md:p-8 rounded-2xl relative z-10 flex flex-col gap-6 transition-all duration-300 ${
          isDark
            ? "bg-[#0d0d0d]/95 backdrop-blur-sm border-2 border-[#262626] shadow-[6px_6px_0px_#7d181e]"
            : "bg-gray-50/90 backdrop-blur-sm border border-gray-200 shadow-sm"
        }`}
      >
        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black mb-4 shadow-md animate-bounce ${
              isDark ? "bg-[#f97316] text-black font-bold" : "bg-[#a31515] text-white"
            }`}>
              ✓
            </div>
            <h3 className={`font-comic text-2xl font-black uppercase tracking-wide mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Message Dispatched!
            </h3>
            <p className={`font-dialogue text-base max-w-md ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}>
              Thanks for reaching out! {HERO_DATA.firstName} will review your dispatch and swing back shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={`font-dialogue text-xs uppercase tracking-wider font-bold ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}>
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder={isDark ? "Miles Morales" : "Peter Parker"}
                  className={`font-dialogue w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all ${
                    isDark
                      ? "bg-[#161616] border border-[#2c2c2c] text-white placeholder-gray-500 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
                      : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515]"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={`font-dialogue text-xs uppercase tracking-wider font-bold ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}>
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  placeholder={isDark ? "miles@brooklynvisions.edu" : "peter@dailybugle.com"}
                  className={`font-dialogue w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all ${
                    isDark
                      ? "bg-[#161616] border border-[#2c2c2c] text-white placeholder-gray-500 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
                      : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515]"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`font-dialogue text-xs uppercase tracking-wider font-bold ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Let's collaborate on an extraordinary project..."
                className={`font-dialogue w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all resize-none ${
                  isDark
                    ? "bg-[#161616] border border-[#2c2c2c] text-white placeholder-gray-500 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
                    : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515]"
                }`}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-comic text-base tracking-widest uppercase transition-all duration-300 cursor-pointer mt-2 font-bold ${
                isDark
                  ? "bg-[#a71d24] hover:bg-[#850621] text-white shadow-[0_4px_20px_rgba(167,29,36,0.4)] hover:shadow-[0_6px_25px_rgba(167,29,36,0.6)]"
                  : "bg-[#a31515] hover:bg-[#7a0f0f] text-white shadow-[0_4px_15px_rgba(163,21,21,0.3)] hover:shadow-[0_6px_20px_rgba(163,21,21,0.5)]"
              }`}
            >
              Send Message
            </button>
          </form>
        )}

        {/* Social Links Ribbon */}
        <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider ${
          isDark ? "border-[#262626]" : "border-gray-200/80"
        }`}>
          <span className={`font-dialogue font-bold tracking-wider ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>Connect:</span>
          <div className="flex flex-wrap gap-4">
            {CONTACT_DATA.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className={`font-dialogue font-bold text-xs tracking-wider transition-colors ${
                  isDark ? "text-[#fb923c] hover:text-white" : "text-[#a31515] hover:text-black"
                }`}
              >
                {s.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center font-dialogue text-xs sm:text-sm text-gray-500 font-medium">
        {CONTACT_DATA.footerText}
      </footer>
    </section>
  );
};
