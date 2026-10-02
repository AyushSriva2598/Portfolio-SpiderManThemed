/**
 * TechWeb.tsx
 *
 * Interactive Spider-Man Skills Web Architecture
 * - Background: Widescreen Spider-Man Web in Red (matching reference Gemini_Generated_Image_cit8ricit8ricit8.png).
 * - Interactive Tech Chips pinned across 16 spokes and concentric ring intersections.
 * - Hardware-accelerated 3D parallax tilt and subtle idle ambient breathing.
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { ASSETS } from "../../data/spidermanData";
import {
  WEB_CONFIG,
  TECH_NODES,
  TechNode,
} from "./techData";
import { TechChip } from "./TechChip";

interface TechWebProps {
  selectedCategory?: string;
}

export const TechWeb: React.FC<TechWebProps> = ({ selectedCategory = "all" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDrawnIn, setHasDrawnIn] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleChipHover = useCallback((node: TechNode) => {
    setHoveredNode(node);
  }, []);

  const handleChipLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  // IntersectionObserver: Pause animations when off-screen (preserves 60fps)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasDrawnIn) {
          setHasDrawnIn(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasDrawnIn]);

  // Gentle 3D Mouse Parallax Tilt
  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setTilt({
          rx: Math.round(-y * 8 * 10) / 10,
          ry: Math.round(x * 8 * 10) / 10,
        });
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setTilt({ rx: 0, ry: 0 });
      });
    };

    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (isPointerFine) {
      container.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      container.addEventListener("mouseleave", handleMouseLeave, {
        passive: true,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-none aspect-[16/9] min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] mx-auto flex items-center justify-center select-none overflow-hidden ${
        !isVisible ? "web-paused" : ""
      }`}
      style={{ perspective: "1200px" }}
    >
      {/* ── Internal Hardware Accelerated CSS Keyframes ── */}
      <style>{`
        /* Staggered idle bobbing on chip wrappers */
        @keyframes webChipBob {
          0%   { transform: translate3d(-50%, -50%, 0); }
          100% { transform: translate3d(-50%, calc(-50% + var(--bob-amp, -4px)), 0); }
        }
        .tech-node-wrapper {
          animation: webChipBob var(--bob-dur, 3.5s) ease-in-out infinite alternate;
          animation-delay: var(--bob-delay, 0s);
          will-change: transform;
        }

        /* Web reveal animation */
        @keyframes webReveal {
          0%   { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        .web-image-fade {
          animation: webReveal 1.0s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }

        /* Gentle ambient breathing */
        @keyframes webAmbientBreathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.006); }
        }
        .web-ambient-breathe {
          animation: webAmbientBreathe 7s ease-in-out infinite;
          transform-origin: center;
        }

        /* Center hub pulse */
        @keyframes hubGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%      { transform: scale(1.15); opacity: 0.85; }
        }
        .hub-halo {
          animation: hubGlowPulse 3s ease-in-out infinite;
          transform-origin: 800px 450px;
        }

        /* Offscreen pause */
        .web-paused .tech-node-wrapper,
        .web-paused .web-ambient-breathe,
        .web-paused .hub-halo {
          animation-play-state: paused !important;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .tech-node-wrapper,
          .web-ambient-breathe,
          .hub-halo {
            animation: none !important;
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        }
      `}</style>

      {/* ── Parallax 3D Tilt Wrapper ── */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── 1. WIDESCREEN SPIDER-MAN WEB BACKDROP (matching reference Gemini_Generated_Image_cit8ricit8ricit8.png) ── */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          <picture className="w-full h-full flex items-center justify-center">
            <source srcSet={ASSETS.wideSpiderWeb} type="image/webp" />
            <img
              src={ASSETS.wideSpiderWebPng}
              alt="Clean & Spacious Widescreen Spider-Man Web Design in Red"
              width="2752"
              height="1536"
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover pointer-events-none web-ambient-breathe ${
                hasDrawnIn ? "web-image-fade" : "opacity-0"
              }`}
            />
          </picture>
        </div>

        {/* ── 2. SVG AMBIENT HUB & COLOR FILTER LAYER ── */}
        <svg
          viewBox="0 0 1600 900"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Dynamic CSS/SVG Color Matrix Tinting Filter for #a31515 */}
            <filter id="webColorFilter" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="
                  0 0 0 0.639 0
                  0 0 0 0.082 0
                  0 0 0 0.082 0
                  0 0 0 1     0
                "
              />
            </filter>

            {/* Center Hub Ambient Glow in #a31515 */}
            <radialGradient id="hubCenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a31515" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#a31515" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#a31515" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Center Hub Luminous Node */}
          <circle
            cx={WEB_CONFIG.cx}
            cy={WEB_CONFIG.cy}
            r="44"
            fill="url(#hubCenterGlow)"
            className="hub-halo"
          />
          <circle
            cx={WEB_CONFIG.cx}
            cy={WEB_CONFIG.cy}
            r="7"
            fill="#a31515"
            opacity="0.95"
          />
          <circle
            cx={WEB_CONFIG.cx}
            cy={WEB_CONFIG.cy}
            r="2.5"
            fill="#ffffff"
          />
        </svg>

        {/* ── 3. CENTER SPIDER-MAN (Crawling / Perched on the Center Hub) ── */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center"
          style={{ willChange: "transform" }}
        >
          {/* Soft ambient red radial glow blending Spidey with the web center */}
          <div
            className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-red-600/15 pointer-events-none -z-10 blur-xl"
            aria-hidden="true"
          />

          <picture className="flex items-center justify-center">
            <source srcSet={ASSETS.spidermanCrawling} type="image/webp" />
            <img
              src={ASSETS.spidermanCrawlingPng}
              alt="Spider-Man perched at center of web"
              width="447"
              height="447"
              loading="lazy"
              decoding="async"
              className="w-20 sm:w-28 md:w-36 lg:w-44 h-auto object-contain select-none pointer-events-none drop-shadow-[0_8px_22px_rgba(0,0,0,0.38)] drop-shadow-[0_0_14px_rgba(163,21,21,0.3)] transition-transform duration-300 ease-out"
            />
          </picture>
        </div>

        {/* ── 4. HTML NODES LAYER: 30 Tech Chips Anchored to Spokes with Zero Overlaps ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {TECH_NODES.map((node) => {
            const isMatch = selectedCategory === "all" || (node.categories && node.categories.includes(selectedCategory));
            return (
              <div
                key={node.id}
                className={`absolute pointer-events-auto tech-node-wrapper -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform,filter] duration-300 ease-out ${
                  isMatch
                    ? "opacity-100 scale-100 z-20 pointer-events-auto"
                    : "opacity-20 scale-90 grayscale contrast-75 z-0 pointer-events-none sm:pointer-events-auto"
                }`}
                style={
                  {
                    left: `${node.pctX}%`,
                    top: `${node.pctY}%`,
                    "--bob-dur": node.bobDuration,
                    "--bob-delay": node.bobDelay,
                    "--bob-amp": node.bobAmplitude,
                  } as React.CSSProperties
                }
              >
                <TechChip
                  node={node}
                  isHovered={hoveredNode?.id === node.id}
                  onHover={handleChipHover}
                  onLeave={handleChipLeave}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechWeb;
