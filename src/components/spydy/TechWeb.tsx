/**
 * TechWeb.tsx
 * 
 * Interactive Spider-Man SVG Web with Polar Chip Nodes
 * Features:
 * - Single-path merged SVG threads & sagging concentric rings
 * - Responsive viewBox (1200x1200) scaling seamlessly from mobile to 4K
 * - One-time stroke-dashoffset draw-in on scroll
 * - Dynamic single-path thread glow route on chip hover
 * - IntersectionObserver to freeze all animations when offscreen
 * - Lightweight creative extras: crawling spider, dewdrop glints, desktop rAF tilt
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  WEB_CONFIG,
  TECH_NODES,
  TechNode,
  generateRadialThreadsPath,
  generateSaggingRingsPath,
  generateThreadHighlightPath,
} from "./techData";
import { TechChip } from "./TechChip";

export const TechWeb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const webSvgRef = useRef<SVGSVGElement>(null);

  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDrawnIn, setHasDrawnIn] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Pre-calculate merged SVG path strings once
  const radialPathData = useMemo(() => generateRadialThreadsPath(WEB_CONFIG), []);
  const ringsPathData = useMemo(() => generateSaggingRingsPath(WEB_CONFIG), []);

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasDrawnIn]);

  // Desktop Pointer Parallax Tilt (rAF throttled, disabled on touch/mobile)
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isVisible) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xRel = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const yRel = (e.clientY - rect.top) / rect.height - 0.5;

      targetX = -yRel * 6; // max ±3deg tilt
      targetY = xRel * 6;

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
      container.addEventListener("mousemove", handleMouseMove, { passive: true });
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Memoized hover handlers to avoid re-renders
  const handleChipHover = useCallback((node: TechNode) => {
    setHoveredNode(node);
  }, []);

  const handleChipLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  // Dewdrop sparkle positions (subtle glints at select intersections)
  const dewdrops = useMemo(
    () => [
      { cx: 600, cy: 390 }, // Thread 0, Ring 2
      { cx: 835, cy: 523 }, // Thread 2, Ring 3
      { cx: 382, cy: 758 }, // Thread 6, Ring 3
      { cx: 485, cy: 247 }, // Thread 9, Ring 4
      { cx: 717, cy: 960 }, // Thread 4, Ring 4
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
        perspective: "1000px",
      }}
    >
      {/* ── Internal CSS Keyframes for GPU-Only Hardware Accelerated Animations ── */}
      <style>{`
        /* Staggered idle bobbing on chip wrappers */
        @keyframes webChipBob {
          0% {
            transform: translate3d(-50%, -50%, 0);
          }
          100% {
            transform: translate3d(-50%, calc(-50% + var(--bob-amp, -4px)), 0);
          }
        }
        .tech-node-wrapper {
          animation: webChipBob var(--bob-dur, 3.5s) ease-in-out infinite alternate;
          animation-delay: var(--bob-delay, 0s);
          will-change: transform;
        }

        /* One-time stroke-dashoffset draw-in on scroll */
        @keyframes webDrawIn {
          0% {
            stroke-dashoffset: 6000;
            opacity: 0.2;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        .web-stroke-draw {
          stroke-dasharray: 6000;
          stroke-dashoffset: 0;
        }
        .web-drawing .web-stroke-draw {
          animation: webDrawIn 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Thread highlight pulse */
        @keyframes threadGlowPulse {
          0%, 100% {
            opacity: 0.85;
            stroke-width: 3.5px;
          }
          50% {
            opacity: 1;
            stroke-width: 4.5px;
          }
        }
        .thread-glow-active {
          animation: threadGlowPulse 1.2s ease-in-out infinite;
        }

        /* Dewdrop sparkle glint */
        @keyframes dewdropGlint {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.2);
          }
        }
        .dewdrop-sparkle {
          animation: dewdropGlint 2.8s ease-in-out infinite alternate;
          transform-origin: center;
        }

        /* Tiny crawling spider along thread */
        @keyframes spiderCrawlMove {
          0% {
            transform: translate(600px, 600px) rotate(-18deg) translate(80px, 0);
          }
          50% {
            transform: translate(600px, 600px) rotate(-18deg) translate(340px, 0);
          }
          100% {
            transform: translate(600px, 600px) rotate(-18deg) translate(80px, 0);
          }
        }
        .spider-crawler {
          animation: spiderCrawlMove 18s ease-in-out infinite;
          transform-origin: 0 0;
        }

        /* Pause animations when section is off-screen */
        .web-paused .tech-node-wrapper,
        .web-paused .dewdrop-sparkle,
        .web-paused .spider-crawler,
        .web-paused .thread-glow-active {
          animation-play-state: paused !important;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .tech-node-wrapper,
          .dewdrop-sparkle,
          .spider-crawler,
          .thread-glow-active,
          .web-stroke-draw {
            animation: none !important;
            transform: translate3d(-50%, -50%, 0) !important;
          }
        }
      `}</style>

      {/* ── Tilt Wrapper for Desktop Parallax ── */}
      <div
        className="relative w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Central Spider Web Ambient Glow (Pre-rendered radial gradient) ── */}
        <div
          className="absolute inset-[15%] rounded-full bg-gradient-to-radial from-red-600/10 via-red-900/5 to-transparent pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* ── The Static Spider Web SVG (Merged Paths) ── */}
        <svg
          ref={webSvgRef}
          viewBox="0 0 1200 1200"
          className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible ${
            hasDrawnIn ? "web-drawing" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Defs for gradients & filters */}
          <defs>
            <radialGradient id="spiderWebHubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a31515" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a31515" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Web Hub Center Halo */}
          <circle cx="600" cy="600" r="45" fill="url(#spiderWebHubGlow)" />
          <circle cx="600" cy="600" r="6" fill="#a31515" opacity="0.6" />

          {/* 1. Merged Radial Spokes Path */}
          <path
            d={radialPathData}
            fill="none"
            stroke="rgba(163, 21, 21, 0.22)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="web-stroke-draw"
          />

          {/* 2. Merged Concentric Sagging Rings Path */}
          <path
            d={ringsPathData}
            fill="none"
            stroke="rgba(163, 21, 21, 0.18)"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="web-stroke-draw"
          />

          {/* 3. Subtle Dewdrop Glints at Select Intersections */}
          {dewdrops.map((drop, idx) => (
            <circle
              key={idx}
              cx={drop.cx}
              cy={drop.cy}
              r="2.5"
              fill="#ffffff"
              stroke="#ef4444"
              strokeWidth="0.8"
              className="dewdrop-sparkle"
              style={{
                animationDelay: `${idx * 0.65}s`,
              }}
            />
          ))}

          {/* 4. Active Thread Glow on Hover (Single path route) */}
          {highlightPathData && (
            <path
              d={highlightPathData}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="thread-glow-active drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            />
          )}

          {/* 5. Tiny Atmospheric Crawler Spider */}
          <g className="spider-crawler opacity-40 hover:opacity-100 transition-opacity">
            <ellipse cx="0" cy="0" rx="3.5" ry="2.5" fill="#a31515" />
            <circle cx="3" cy="0" r="1.8" fill="#111111" />
            {/* Legs */}
            <path
              d="M -1 -2 Q -3 -5 -5 -3 M 0 -2 Q 0 -6 2 -5 M 1 -2 Q 3 -5 5 -3 M -1 2 Q -3 5 -5 3 M 0 2 Q 0 6 2 5 M 1 2 Q 3 5 5 3"
              stroke="#a31515"
              strokeWidth="0.8"
              fill="none"
            />
          </g>
        </svg>

        {/* ── HTML Nodes Layer: 30 Tech Chips Placed via Polar Coordinates ── */}
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
