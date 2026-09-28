import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_DATA, HERO_DATA, ASSETS } from "../../data/spidermanData";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
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
        opacity: 0.06,
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-white text-gray-900 py-16 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden border-t border-gray-100"
    >
      {/* Background Web Watermark */}
      <div className="absolute bottom-0 left-0 pointer-events-none overflow-hidden z-0">
        <img
          ref={webRef}
          src={ASSETS.webImg}
          alt="Background Web"
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain opacity-[0.04] mix-blend-multiply -translate-x-1/4 translate-y-1/4"
        />
      </div>

      {/* Hanging Spider-Man Web Drop */}
      <div
        ref={spiderRef}
        className="absolute top-0 right-6 sm:right-10 md:right-20 z-30 pointer-events-none flex flex-col items-center origin-top"
      >
        <div className="w-[2px] h-20 sm:h-24 md:h-36 bg-gradient-to-b from-transparent to-gray-400 opacity-60" />
        <img
          src={ASSETS.hangingSpiderImg}
          alt="Hanging Spider-Man"
          className="w-32 sm:w-40 md:w-60 h-auto object-contain drop-shadow-2xl -mt-2"
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-10 z-10">
        <span className="text-[#a31515] font-comic tracking-[0.2em] text-xs sm:text-sm uppercase mb-1 flex items-center gap-1.5 font-bold">
          <img src={ASSETS.spiderIcon} alt="Spider" className="w-4 h-4 object-contain" />
          Dispatch A Transmission
        </span>
        <h2 className="text-comic-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
          CONTACT AYUSH.
        </h2>
        <p className="font-dialogue text-gray-700 text-sm sm:text-base mt-2 max-w-md">
          Have an ambitious mission, distributed system project, or engineering challenge? Send a signal.
        </p>
        <div className="w-16 h-1.5 bg-[#a31515] mt-3 rounded-full shadow-[0_0_8px_rgba(163,21,21,0.6)]" />
      </div>

      {/* Contact Card */}
      <div
        ref={cardRef}
        className="w-full max-w-2xl bg-gray-50/90 backdrop-blur-sm border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm relative z-10 flex flex-col gap-6"
      >
        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#a31515] text-white rounded-full flex items-center justify-center text-2xl font-black mb-4 shadow-md animate-bounce">
              ✓
            </div>
            <h3 className="font-comic text-2xl font-black uppercase tracking-wide text-gray-900 mb-2">
              Message Dispatched!
            </h3>
            <p className="font-dialogue text-base text-gray-700 max-w-md">
              Thanks for reaching out! {HERO_DATA.firstName} will review your dispatch and swing back shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-dialogue text-xs uppercase tracking-wider text-gray-700 font-bold">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Peter Parker"
                  className="font-dialogue w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-dialogue text-xs uppercase tracking-wider text-gray-700 font-bold">
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="peter@dailybugle.com"
                  className="font-dialogue w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-dialogue text-xs uppercase tracking-wider text-gray-700 font-bold">
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Let's collaborate on an extraordinary project..."
                className="font-dialogue w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#a31515] hover:bg-[#7a0f0f] text-white py-3.5 rounded-xl font-comic text-base tracking-widest uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(163,21,21,0.3)] hover:shadow-[0_6px_20px_rgba(163,21,21,0.5)] cursor-pointer mt-2"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Social Links Ribbon */}
        <div className="pt-4 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider">
          <span className="font-dialogue text-gray-500 font-bold tracking-wider">Connect:</span>
          <div className="flex flex-wrap gap-4">
            {CONTACT_DATA.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="font-dialogue font-bold text-xs tracking-wider text-[#a31515] hover:text-black transition-colors"
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
