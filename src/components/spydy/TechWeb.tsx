/**
 * TechWeb.tsx
 *
 * Interactive Spider-Man SVG Web — Hand-Drawn Pen-Sketch Aesthetic
 *
 * Features:
 * - Organic wobbly SVG threads & irregularly sagging concentric rings
 * - Decorative outer wisps (torn silk strands) for realism
 * - Animated pen-draw stroke reveal on scroll (staggered spokes → rings → wisps)
 * - Ink splatter dots at thread/ring intersections
 * - Active thread glow route on chip hover
 * - IntersectionObserver to freeze all animations when off-screen
 * - Crawling spider, dewdrop glints, desktop pointer parallax tilt
 * - prefers-reduced-motion respected
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
  generateRadialThreadsPath,
  generateSaggingRingsPath,
  generateWispsPath,
  generateThreadHighlightPath,
} from "./techData";
import { TechChip } from "./TechChip";

export const TechWeb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDrawnIn, setHasDrawnIn] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Pre-calculate merged SVG path strings once
  const radialPathData = useMemo(
    () => generateRadialThreadsPath(WEB_CONFIG),
    []
  );
  const ringsPathData = useMemo(
    () => generateSaggingRingsPath(WEB_CONFIG),
    []
  );
  const wispsPathData = useMemo(() => generateWispsPath(WEB_CONFIG), []);

  // Compute active thread highlight path when a chip is hovered
  const highlightPathData = useMemo(() => {
    if (!hoveredNode) return "";
    return generateThreadHighlightPath(hoveredNode, WEB_CONFIG);
  }, [hoveredNode]);

  // IntersectionObserver: Pause animations when off-screen to preserve 60fps
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

  // Memoized hover handlers
  const handleChipHover = useCallback((node: TechNode) => {
    setHoveredNode(node);
  }, []);

  const handleChipLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  // Ink splatter positions at select intersections (adds pen-drawn feel)
  const inkSplatters = useMemo(
    () => [
      { cx: 600, cy: 475, r: 3.5 },
      { cx: 782, cy: 541, r: 2.8 },
      { cx: 418, cy: 541, r: 3 },
      { cx: 542, cy: 362, r: 2.5 },
      { cx: 658, cy: 362, r: 2 },
      { cx: 600, cy: 735, r: 3.2 },
      { cx: 726, cy: 670, r: 2 },
      { cx: 474, cy: 670, r: 2.3 },
    ],
    []
  );

  // Dewdrop sparkle positions
  const dewdrops = useMemo(
    () => [
      { cx: 600, cy: 390 },
      { cx: 835, cy: 523 },
      { cx: 382, cy: 758 },
      { cx: 485, cy: 247 },
      { cx: 717, cy: 960 },
    ],
    []
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1050px] mx-auto aspect-square flex items-center justify-center select-none overflow-visible ${
        !isVisible ? "web-paused" : ""
      }`}
      style={{
        perspective: "1200px",
      }}
    >
      {/* ── CSS Animations — GPU-Only Hardware Accelerated ── */}
      <style>{`
        /* ─── Staggered idle bobbing on chip wrappers ─── */
        @keyframes webChipBob {
          0%   { transform: translate3d(-50%, -50%, 0); }
          100% { transform: translate3d(-50%, calc(-50% + var(--bob-amp, -4px)), 0); }
        }
        .tech-node-wrapper {
          animation: webChipBob var(--bob-dur, 3.5s) ease-in-out infinite alternate;
          animation-delay: var(--bob-delay, 0s);
          will-change: transform;
        }

        /* ─── Pen-Stroke Draw-In: Spokes appear first, then rings, then wisps ─── */
        @keyframes penDrawSpokes {
          0%   { stroke-dashoffset: 8000; opacity: 0.1; }
          60%  { opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes penDrawRings {
          0%   { stroke-dashoffset: 12000; opacity: 0; }
          30%  { opacity: 0.3; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes penDrawWisps {
          0%   { stroke-dashoffset: 2000; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.4; }
        }
        @keyframes penInkDot {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }

        /* Spokes: draw first */
        .web-spokes {
          stroke-dasharray: 8000;
          stroke-dashoffset: 8000;
          opacity: 0;
        }
        .web-drawing .web-spokes {
          animation: penDrawSpokes 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Rings: draw after spokes (0.6s delay) */
        .web-rings {
          stroke-dasharray: 12000;
          stroke-dashoffset: 12000;
          opacity: 0;
        }
        .web-drawing .web-rings {
          animation: penDrawRings 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
        }

        /* Wisps: draw last (1.2s delay) */
        .web-wisps {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          opacity: 0;
        }
        .web-drawing .web-wisps {
          animation: penDrawWisps 1.0s cubic-bezier(0.22, 1, 0.36, 1) 1.2s forwards;
        }

        /* Ink dots: pop in after spokes are drawn */
        .ink-dot {
          transform: scale(0);
          transform-origin: center;
          opacity: 0;
        }
        .web-drawing .ink-dot {
          animation: penInkDot 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* ─── Thread highlight glow pulse ─── */
        @keyframes threadGlowPulse {
          0%, 100% { opacity: 0.8; stroke-width: 3px; }
          50%      { opacity: 1; stroke-width: 4.5px; }
        }
        .thread-glow-active {
          animation: threadGlowPulse 1.2s ease-in-out infinite;
        }

        /* ─── Dewdrop sparkle ─── */
        @keyframes dewdropGlint {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%      { opacity: 0.9; transform: scale(1.3); }
        }
        .dewdrop-sparkle {
          animation: dewdropGlint 3s ease-in-out infinite alternate;
          transform-origin: center;
        }

        /* ─── Crawling spider along thread ─── */
        @keyframes spiderCrawlMove {
          0%   { transform: translate(600px, 600px) rotate(-18deg) translate(60px, 0) scale(1); }
          25%  { transform: translate(600px, 600px) rotate(-18deg) translate(200px, 0) scale(1.1); }
          50%  { transform: translate(600px, 600px) rotate(-18deg) translate(380px, 0) scale(1); }
          75%  { transform: translate(600px, 600px) rotate(-18deg) translate(200px, 0) scale(0.95); }
          100% { transform: translate(600px, 600px) rotate(-18deg) translate(60px, 0) scale(1); }
        }
        .spider-crawler {
          animation: spiderCrawlMove 22s ease-in-out infinite;
          transform-origin: 0 0;
        }

        /* ─── Gentle ambient web breathing ─── */
        @keyframes webBreathe {
          0%, 100% { transform: scale(1) rotateZ(0deg); }
          50%      { transform: scale(1.008) rotateZ(0.3deg); }
        }
        .web-svg-breathe {
          animation: webBreathe 8s ease-in-out infinite;
          transform-origin: center;
        }

        /* ─── Pause when off-screen ─── */
        .web-paused .tech-node-wrapper,
        .web-paused .dewdrop-sparkle,
        .web-paused .spider-crawler,
        .web-paused .thread-glow-active,
        .web-paused .web-svg-breathe {
          animation-play-state: paused !important;
        }

        /* ─── Respect prefers-reduced-motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .tech-node-wrapper,
          .dewdrop-sparkle,
          .spider-crawler,
          .thread-glow-active,
          .web-svg-breathe,
          .web-spokes,
          .web-rings,
          .web-wisps,
          .ink-dot {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: translate3d(-50%, -50%, 0) scale(1) !important;
          }
        }
      `}</style>

      {/* ── Tilt Wrapper for Desktop Parallax ── */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Central Ambient Glow (Pre-rendered, GPU-friendly) ── */}
        <div
          className="absolute inset-[12%] rounded-full pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163,21,21,0.08) 0%, rgba(163,21,21,0.03) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* ── The Hand-Drawn Spider Web SVG ── */}
        <svg
          viewBox="0 0 1200 1200"
          className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible web-svg-breathe ${
            hasDrawnIn ? "web-drawing" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Defs for filter & gradient effects */}
          <defs>
            {/* Hub center glow */}
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a31515" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a31515" stopOpacity="0" />
            </radialGradient>

            {/* Pen-stroke roughness filter — subtle grain texture */}
            <filter id="penStroke" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.04"
                numOctaves="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* Thread glow filter (lightweight) */}
            <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Web Hub Center */}
          <circle cx="600" cy="600" r="50" fill="url(#hubGlow)" />
          <circle cx="600" cy="600" r="5" fill="#a31515" opacity="0.7" />
          {/* Small pen-dot at exact center */}
          <circle cx="600" cy="600" r="2" fill="#111" opacity="0.5" />

          {/* 1. Radial Spokes — wobbly cubic bezier pen strokes */}
          <path
            d={radialPathData}
            fill="none"
            stroke="rgba(163, 21, 21, 0.28)"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="web-spokes"
            filter="url(#penStroke)"
          />

          {/* 2. Concentric Sagging Rings — irregular quadratic bezier arcs */}
          <path
            d={ringsPathData}
            fill="none"
            stroke="rgba(163, 21, 21, 0.22)"
            strokeWidth="1.3"
            strokeLinecap="round"
            className="web-rings"
            filter="url(#penStroke)"
          />

          {/* 3. Decorative Outer Wisps — torn silk strands */}
          <path
            d={wispsPathData}
            fill="none"
            stroke="rgba(163, 21, 21, 0.18)"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="web-wisps"
          />

          {/* 4. Ink Splatter Dots at thread intersections */}
          {inkSplatters.map((dot, idx) => (
            <circle
              key={`ink-${idx}`}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="#a31515"
              className="ink-dot"
              style={{
                animationDelay: `${0.8 + idx * 0.12}s`,
              }}
            />
          ))}

          {/* 5. Dewdrop Sparkles at select intersections */}
          {dewdrops.map((drop, idx) => (
            <circle
              key={`dew-${idx}`}
              cx={drop.cx}
              cy={drop.cy}
              r="2.5"
              fill="#ffffff"
              stroke="#ef4444"
              strokeWidth="0.8"
              className="dewdrop-sparkle"
              style={{
                animationDelay: `${idx * 0.7}s`,
              }}
            />
          ))}

          {/* 6. Active Thread Glow on Hover */}
          {highlightPathData && (
            <path
              d={highlightPathData}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              className="thread-glow-active"
              filter="url(#threadGlow)"
            />
          )}

          {/* 7. Tiny Atmospheric Crawler Spider */}
          <g className="spider-crawler opacity-30">
            <ellipse cx="0" cy="0" rx="4" ry="3" fill="#a31515" />
            <circle cx="4" cy="0" r="2.2" fill="#111111" />
            {/* Legs — 8 total, pen-sketched */}
            <path
              d="M -1.5 -2.5 Q -4 -6 -6 -4 M -0.3 -2.5 Q -1 -7 1.5 -6 M 1 -2.5 Q 3 -6 5.5 -4 M 2.5 -1.5 Q 6 -3 7 -1 M -1.5 2.5 Q -4 6 -6 4 M -0.3 2.5 Q -1 7 1.5 6 M 1 2.5 Q 3 6 5.5 4 M 2.5 1.5 Q 6 3 7 1"
              stroke="#a31515"
              strokeWidth="0.7"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* ── HTML Chip Nodes Layer ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {TECH_NODES.map((node) => (
            <TechChip
              key={node.id}
              node={node}
              isHovered={hoveredNode?.id === node.id}
              onHover={handleChipHover}
              onLeave={handleChipLeave}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechWeb;
