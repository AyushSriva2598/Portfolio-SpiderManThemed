/**
 * TechWeb.tsx
 *
 * Interactive Spider-Man Web — Exact Reference Replication on Bright Background
 *
 * Requirements:
 * - 1:1 exact replication of the web structure from Gemini reference image
 * - Clean bright background integration
 * - STRICTLY NO SPIDER (zero spider elements, clean inpainted web hub)
 * - 30 interactive tech chips placed at natural spokes/rings with ZERO overlaps
 * - Interactive electric laser routing on chip hover
 * - 60fps GPU-only transforms & IntersectionObserver offscreen pause
 */

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  WEB_CONFIG,
  TECH_NODES,
  TechNode,
  generateThreadHighlightPath,
} from "./techData";
import { TechChip } from "./TechChip";
import { ASSETS } from "../../data/spidermanData";

export const TechWeb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDrawnIn, setHasDrawnIn] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Compute active thread highlight path when a chip is hovered
  const highlightPathData = useMemo(() => {
    if (!hoveredNode) return "";
    return generateThreadHighlightPath(hoveredNode, WEB_CONFIG);
  }, [hoveredNode]);

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

  // Desktop Pointer Parallax Tilt (rAF throttled, disabled on touch/mobile)
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || prefersReducedMotion) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isVisible) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xRel = (e.clientX - rect.left) / rect.width - 0.5;
      const yRel = (e.clientY - rect.top) / rect.height - 0.5;

      targetX = -yRel * 4;
      targetY = xRel * 4;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setTilt({ rx: targetX, ry: targetY });
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      setTilt({ rx: 0, ry: 0 });
    };

    const container = containerRef.current;
    if (container) {
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

  const handleChipHover = useCallback((node: TechNode) => {
    setHoveredNode(node);
  }, []);

  const handleChipLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1360px] mx-auto aspect-[16/9] min-h-[460px] sm:min-h-[560px] md:min-h-[680px] lg:min-h-[760px] flex items-center justify-center select-none overflow-visible ${
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

        /* Web entrance reveal */
        @keyframes webEntranceReveal {
          0%   { opacity: 0; transform: scale(0.96); filter: blur(3px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        .web-exact-image {
          animation: webEntranceReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }

        /* Gentle ambient breathing */
        @keyframes webAmbientBreathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.008); }
        }
        .web-ambient-breathe {
          animation: webAmbientBreathe 7s ease-in-out infinite;
          transform-origin: center;
        }

        /* Active thread glow pulse */
        @keyframes threadGlowPulse {
          0%, 100% { opacity: 0.85; stroke-width: 4px; }
          50%      { opacity: 1;    stroke-width: 5.5px; }
        }
        .thread-glow-active {
          animation: threadGlowPulse 1.0s ease-in-out infinite;
        }

        /* Center hub pulse */
        @keyframes hubGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.15); opacity: 0.9; }
        }
        .hub-halo {
          animation: hubGlowPulse 3s ease-in-out infinite;
          transform-origin: 800px 450px;
        }

        /* Offscreen pause */
        .web-paused .tech-node-wrapper,
        .web-paused .web-ambient-breathe,
        .web-paused .thread-glow-active,
        .web-paused .hub-halo {
          animation-play-state: paused !important;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .tech-node-wrapper,
          .web-ambient-breathe,
          .thread-glow-active,
          .hub-halo,
          .web-exact-image {
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
        {/* ── Subtle Comic Radial Halo on Bright Paper Background ── */}
        <div
          className="absolute inset-[8%] rounded-full pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163,21,21,0.06) 0%, rgba(163,21,21,0.02) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* ── 1. EXACT WEB STRUCTURE IMAGE LAYER (100% Transparent, No Spider) ── */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-visible">
          <picture className="w-full h-full flex items-center justify-center">
            <source srcSet={ASSETS.exactWebImg} type="image/webp" />
            <img
              src="/assets/web-inspiration-bright.png"
              alt="Organic Spider-Man Tech Web"
              width="2752"
              height="1536"
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_12px_rgba(163,21,21,0.15)] web-ambient-breathe ${
                hasDrawnIn ? "web-exact-image" : "opacity-0"
              }`}
            />
          </picture>
        </div>

        {/* ── 2. INTERACTIVE SVG LASER ROUTING LAYER ── */}
        <svg
          viewBox="0 0 1600 900"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Center Hub Ambient Glow */}
            <radialGradient id="hubLaserGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#a31515" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#a31515" stopOpacity="0" />
            </radialGradient>

            {/* Electric Laser Glow Filter */}
            <filter id="electricLaserGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Center Hub Ambient Luminous Knot */}
          <circle cx="800" cy="450" r="55" fill="url(#hubLaserGlow)" className="hub-halo" />
          <circle cx="800" cy="450" r="6" fill="#a31515" opacity="0.8" />
          <circle cx="800" cy="450" r="2.5" fill="#ffffff" />

          {/* Active Electric Laser Route on Chip Hover */}
          {highlightPathData && (
            <path
              d={highlightPathData}
              fill="none"
              stroke="#ef4444"
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#electricLaserGlow)"
              className="thread-glow-active"
            />
          )}
        </svg>

        {/* ── 3. HTML NODES LAYER: 30 Tech Chips Placed via Polar Coordinates ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {TECH_NODES.map((node) => (
            <div
              key={node.id}
              className="absolute pointer-events-auto tech-node-wrapper"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechWeb;
