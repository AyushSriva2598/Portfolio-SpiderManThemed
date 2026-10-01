/**
 * TechWeb.tsx
 *
 * Interactive Spider-Man Web — Dual-Orb Interconnected Architecture
 * Replicating reference image identically with rich ruby silk threads,
 * physical knot intersections, and a slow 3D articulated lined-leg crawling spider.
 *
 * Features:
 * 1. Identical Web Structure:
 *    - Replicates the dual-orb architecture from reference image:
 *      Primary Left Orb (hub at 22.3%, 55.4%) + Secondary Right Orb (hub at 93.2%, 62.5%)
 *      connected by massive horizontal and diagonal tension bridge cables.
 *    - Glistening ruby-red silk with specular glints on a clean bright background.
 * 2. Visual Traceability & Physical Knot Intersections:
 *    - All 30 tech stack chips are anchored at exact, verified physical knot intersections.
 *    - Spoke paths can be visually traced with the eye from the hub to every chip.
 *    - Zero overlaps or collisions between chips (spatially distributed across Left Orb, Bridge, Right Orb).
 * 3. 3D Articulated Lined-Leg Red Spider:
 *    - Tactile 3D SVG element with volumetric shading, specular highlights, chelicerae,
 *      and 8 jointed lined legs with distinct knee bends.
 *    - Alternating tetrapod gait (Group A vs Group B legs) and body sway while walking.
 * 4. Slow & Steady Arachnid Locomotion:
 *    - Crawls steadily over 1.35s–2.4s ("slowly not reaching immediately").
 *    - Stops walking and perches on the silk strand beside the hovered chip.
 *    - Crawls back to the primary hub when cursor leaves.
 * 5. Active Laser Route:
 *    - Silk path beneath the spider illuminates with electric crimson laser light.
 * 6. 60fps GPU performance, parallax 3D tilt, and IntersectionObserver offscreen pause.
 */

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { ASSETS } from "../../data/spidermanData";
import {
  DUAL_WEB_CONFIG,
  TECH_NODES,
  TechNode,
  DEWDROPS,
  generateThreadHighlightPath,
  calculateSpiderTarget,
  calculateCrawlDuration,
} from "./techData";
import { TechChip } from "./TechChip";
import { Spider3D } from "./Spider3D";

export const TechWeb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [isCrawling, setIsCrawling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDrawnIn, setHasDrawnIn] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const crawlTimerRef = useRef<number | null>(null);

  // Active laser highlight path when a chip is hovered
  const highlightPathData = useMemo(() => {
    if (!hoveredNode) return "";
    return generateThreadHighlightPath(hoveredNode);
  }, [hoveredNode]);

  // Spider target coordinates and rotation along the active silk route
  const spiderTarget = useMemo(() => {
    return calculateSpiderTarget(hoveredNode, DUAL_WEB_CONFIG);
  }, [hoveredNode]);

  // Crawl duration (1.35s to 2.4s based on path distance)
  const crawlDuration = useMemo(() => {
    return calculateCrawlDuration(hoveredNode, DUAL_WEB_CONFIG);
  }, [hoveredNode]);

  // Chip hover with slow arachnid crawling gait
  const handleChipHover = useCallback((node: TechNode) => {
    setHoveredNode(node);
    setIsCrawling(true);
    if (crawlTimerRef.current) clearTimeout(crawlTimerRef.current);

    // Stop walking gait when spider arrives beside target chip
    const durMs = Math.round(calculateCrawlDuration(node, DUAL_WEB_CONFIG) * 1000);
    crawlTimerRef.current = window.setTimeout(() => {
      setIsCrawling(false);
    }, durMs);
  }, []);

  const handleChipLeave = useCallback(() => {
    setHoveredNode(null);
    setIsCrawling(true);
    if (crawlTimerRef.current) clearTimeout(crawlTimerRef.current);

    // Stop walking gait when spider returns to primary hub
    crawlTimerRef.current = window.setTimeout(() => {
      setIsCrawling(false);
    }, 1600);
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

      targetX = -yRel * 3.5;
      targetY = xRel * 3.5;

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

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1050px] aspect-square mx-auto flex items-center justify-center select-none overflow-visible ${
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
          0%   { opacity: 0; transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1); }
        }
        .web-image-fade {
          animation: webReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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

        /* Active thread laser glow pulse */
        @keyframes threadLaserPulse {
          0%, 100% { opacity: 0.9; stroke-width: 4.5px; }
          50%      { opacity: 1;   stroke-width: 6.0px; }
        }
        .thread-laser-active {
          animation: threadLaserPulse 0.9s ease-in-out infinite;
        }

        /* ── Spider 3D Walking Gait Keyframes ── */
        /* Leg Group A Step (L1, L3, R2, R4) */
        @keyframes spiderStepA {
          0%   { transform: rotate(-7deg) scale(1.04); }
          50%  { transform: rotate(7deg) scale(0.96); }
          100% { transform: rotate(-7deg) scale(1.04); }
        }

        /* Leg Group B Step (L2, L4, R1, R3 - opposing phase) */
        @keyframes spiderStepB {
          0%   { transform: rotate(7deg) scale(0.96); }
          50%  { transform: rotate(-7deg) scale(1.04); }
          100% { transform: rotate(7deg) scale(0.96); }
        }

        /* Spider Body Walking Sway */
        @keyframes spiderBodyWalkingSway {
          0%, 100% { transform: rotate(-2.5deg); }
          50%      { transform: rotate(2.5deg); }
        }

        /* Spider Resting Abdomen Breathing */
        @keyframes spiderRestBreathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }

        .spider-walking .spider-leg-group-a {
          animation: spiderStepA 0.32s ease-in-out infinite;
          transform-origin: 60px 55px;
        }
        .spider-walking .spider-leg-group-b {
          animation: spiderStepB 0.32s ease-in-out infinite;
          transform-origin: 60px 55px;
        }
        .spider-walking .spider-body-group {
          animation: spiderBodyWalkingSway 0.32s ease-in-out infinite;
          transform-origin: 60px 60px;
        }

        .spider-idle .spider-abdomen-pulse {
          animation: spiderRestBreathe 3.2s ease-in-out infinite;
          transform-origin: 60px 70px;
        }

        /* Dewdrop sparkle twinkle */
        @keyframes dewdropGlint {
          0%, 100% { opacity: 0.55; transform: scale(0.9); }
          50%      { opacity: 1.0;  transform: scale(1.2); }
        }
        .dewdrop-glint {
          animation: dewdropGlint 2.8s ease-in-out infinite;
          transform-origin: center;
        }

        /* Center hub pulse */
        @keyframes hubGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%      { transform: scale(1.15); opacity: 0.85; }
        }
        .hub-halo {
          animation: hubGlowPulse 3s ease-in-out infinite;
        }

        /* Offscreen pause */
        .web-paused .tech-node-wrapper,
        .web-paused .web-ambient-breathe,
        .web-paused .thread-laser-active,
        .web-paused .spider-leg-group-a,
        .web-paused .spider-leg-group-b,
        .web-paused .spider-body-group,
        .web-paused .spider-abdomen-pulse,
        .web-paused .dewdrop-glint,
        .web-paused .hub-halo {
          animation-play-state: paused !important;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .tech-node-wrapper,
          .web-ambient-breathe,
          .thread-laser-active,
          .spider-leg-group-a,
          .spider-leg-group-b,
          .spider-body-group,
          .spider-abdomen-pulse,
          .dewdrop-glint,
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
        {/* ── Ambient Radial Silk Glow ── */}
        <div
          className="absolute inset-[4%] rounded-full pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 25% 55%, rgba(197,29,29,0.08) 0%, rgba(163,21,21,0.03) 40%, transparent 70%), radial-gradient(ellipse at 88% 62%, rgba(197,29,29,0.06) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        {/* ── 1. EXACT DUAL-ORB WEB IMAGE BACKDROP (Pixel-faithful to reference) ── */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-visible">
          <picture className="w-full h-full flex items-center justify-center">
            <source srcSet={ASSETS.dualWebImg} type="image/webp" />
            <img
              src={ASSETS.dualWebImgPng}
              alt="Organic Dual-Orb Spider Web"
              width="1472"
              height="1472"
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-contain pointer-events-none web-ambient-breathe ${
                hasDrawnIn ? "web-image-fade" : "opacity-0"
              }`}
            />
          </picture>
        </div>

        {/* ── 2. SVG INTERACTIVE ROUTING & LIGHTING LAYER ── */}
        <svg
          viewBox="0 0 1000 1000"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Left Primary Hub Ambient Glow */}
            <radialGradient id="webHubGlow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#a31515" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#a31515" stopOpacity="0" />
            </radialGradient>

            {/* Right Secondary Hub Ambient Glow */}
            <radialGradient id="webHubGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#a31515" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#a31515" stopOpacity="0" />
            </radialGradient>

            {/* Electric Laser Glow Filter */}
            <filter id="laserGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left Primary Hub Luminous Knot */}
          <circle
            cx={DUAL_WEB_CONFIG.hub1.x}
            cy={DUAL_WEB_CONFIG.hub1.y}
            r="48"
            fill="url(#webHubGlow1)"
            className="hub-halo"
            style={{ transformOrigin: `${DUAL_WEB_CONFIG.hub1.x}px ${DUAL_WEB_CONFIG.hub1.y}px` }}
          />
          <circle
            cx={DUAL_WEB_CONFIG.hub1.x}
            cy={DUAL_WEB_CONFIG.hub1.y}
            r="7.5"
            fill="#a31515"
            opacity="0.9"
          />
          <circle
            cx={DUAL_WEB_CONFIG.hub1.x}
            cy={DUAL_WEB_CONFIG.hub1.y}
            r="3"
            fill="#ffffff"
          />

          {/* Right Secondary Hub Luminous Knot */}
          <circle
            cx={DUAL_WEB_CONFIG.hub2.x}
            cy={DUAL_WEB_CONFIG.hub2.y}
            r="38"
            fill="url(#webHubGlow2)"
            className="hub-halo"
            style={{ transformOrigin: `${DUAL_WEB_CONFIG.hub2.x}px ${DUAL_WEB_CONFIG.hub2.y}px` }}
          />
          <circle
            cx={DUAL_WEB_CONFIG.hub2.x}
            cy={DUAL_WEB_CONFIG.hub2.y}
            r="6"
            fill="#a31515"
            opacity="0.85"
          />
          <circle
            cx={DUAL_WEB_CONFIG.hub2.x}
            cy={DUAL_WEB_CONFIG.hub2.y}
            r="2.5"
            fill="#ffffff"
          />

          {/* Glistening Dewdrop Beads along threads */}
          <g className={hasDrawnIn ? "" : "opacity-0"}>
            {DEWDROPS.map((drop, idx) => (
              <circle
                key={`dewdrop-${idx}`}
                cx={drop.cx}
                cy={drop.cy}
                r={drop.r}
                fill="#ffffff"
                stroke="#c51d1d"
                strokeWidth="0.6"
                className="dewdrop-glint"
                style={{ animationDelay: drop.delay }}
              />
            ))}
          </g>

          {/* Active Spoke Electric Laser Route following the exact silk route */}
          {highlightPathData && (
            <g>
              {/* Outer pulsing laser glow */}
              <path
                d={highlightPathData}
                fill="none"
                stroke="#ef4444"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#laserGlowFilter)"
                className="thread-laser-active"
              />
              {/* Brilliant white-hot core */}
              <path
                d={highlightPathData}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />
            </g>
          )}
        </svg>

        {/* ── 3. 3D RED SPIDER WITH ARTICULATED WALKING LEGS ── */}
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: `${spiderTarget.pctX}%`,
            top: `${spiderTarget.pctY}%`,
            transform: `translate3d(-50%, -50%, 0) rotate(${spiderTarget.rotationDeg}deg) scale(${spiderTarget.scale})`,
            transition: `left ${crawlDuration}s cubic-bezier(0.25, 0.1, 0.25, 1), top ${crawlDuration}s cubic-bezier(0.25, 0.1, 0.25, 1), transform ${crawlDuration}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
            willChange: "transform, left, top",
          }}
          aria-hidden="true"
        >
          <Spider3D isCrawling={isCrawling} size={50} />
        </div>

        {/* ── 4. HTML CHIP LAYER: 30 Tech Chips Anchored at Physical Knots ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {TECH_NODES.map((node) => (
            <div
              key={node.id}
              className="absolute pointer-events-auto tech-node-wrapper -translate-x-1/2 -translate-y-1/2"
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
