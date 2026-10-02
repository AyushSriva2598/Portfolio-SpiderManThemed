/**
 * TechWeb.tsx
 *
 * Interactive Spider-Man Skills Web Architecture
 * - Background: web1-770H2sSx.png rendered simply in red with razor-sharp comic ink lines.
 * - Shortest Path Algorithm: Graph Dijkstra algorithm strictly routed through the center.
 * - Spider: 2D Crimson Spider inspired by crimson-spider.webp with organic legs walking movement.
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
  WEB_CONFIG,
  TECH_NODES,
  TechNode,
  Point,
  findShortestPathThroughCenter,
  generateThreadHighlightPath,
  calculateSpiderTarget,
  calculateCrawlDuration,
} from "./techData";
import { TechChip } from "./TechChip";
import { Spider2D } from "./Spider2D";

export const TechWeb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [activePath, setActivePath] = useState<Point[]>([]);
  const [isCrawling, setIsCrawling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDrawnIn, setHasDrawnIn] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const crawlTimerRef = useRef<number | null>(null);
  const previousNodeRef = useRef<TechNode | null>(null);

  // Calculate algorithm shortest path to hovered chip strictly through the center
  useEffect(() => {
    if (!hoveredNode) {
      setActivePath([]);
      return;
    }

    // Determine start point (previous chip or center hub)
    const startId = previousNodeRef.current ? previousNodeRef.current.id : "center";
    const path = findShortestPathThroughCenter(hoveredNode, startId);
    setActivePath(path);
    previousNodeRef.current = hoveredNode;
  }, [hoveredNode]);

  // Active laser highlight path string
  const highlightPathData = useMemo(() => {
    return generateThreadHighlightPath(activePath);
  }, [activePath]);

  // Spider target coordinates and rotation along the active silk path
  const spiderTarget = useMemo(() => {
    return calculateSpiderTarget(hoveredNode, activePath);
  }, [hoveredNode, activePath]);

  // Crawl duration (1.35s to 2.4s based on path length)
  const crawlDuration = useMemo(() => {
    return calculateCrawlDuration(activePath);
  }, [activePath]);

  // Chip hover handler with slow arachnid crawling gait
  const handleChipHover = useCallback((node: TechNode) => {
    setHoveredNode(node);
    setIsCrawling(true);
    if (crawlTimerRef.current) clearTimeout(crawlTimerRef.current);

    const durMs = Math.round(calculateCrawlDuration(
      findShortestPathThroughCenter(node, previousNodeRef.current?.id || "center")
    ) * 1000);

    crawlTimerRef.current = window.setTimeout(() => {
      setIsCrawling(false);
    }, durMs);
  }, []);

  const handleChipLeave = useCallback(() => {
    setHoveredNode(null);
    setIsCrawling(true);
    previousNodeRef.current = null;
    if (crawlTimerRef.current) clearTimeout(crawlTimerRef.current);

    // Stop walking gait when spider returns to center hub
    crawlTimerRef.current = window.setTimeout(() => {
      setIsCrawling(false);
    }, 1500);
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
      className={`relative w-full max-w-[1000px] aspect-square mx-auto flex items-center justify-center select-none overflow-visible ${
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

        /* Active thread laser glow pulse */
        @keyframes threadLaserPulse {
          0%, 100% { opacity: 0.9; stroke-width: 4.5px; }
          50%      { opacity: 1;   stroke-width: 6.0px; }
        }
        .thread-laser-active {
          animation: threadLaserPulse 0.9s ease-in-out infinite;
        }

        /* ── 2D Spider Legs Movement Keyframes ── */
        /* Leg Group A Step (L1, L3, R2, R4) */
        @keyframes spiderLegWalkA {
          0%   { transform: rotate(-8deg) scale(1.03); }
          50%  { transform: rotate(8deg) scale(0.97); }
          100% { transform: rotate(-8deg) scale(1.03); }
        }

        /* Leg Group B Step (L2, L4, R1, R3 - opposing phase) */
        @keyframes spiderLegWalkB {
          0%   { transform: rotate(8deg) scale(0.97); }
          50%  { transform: rotate(-8deg) scale(1.03); }
          100% { transform: rotate(8deg) scale(0.97); }
        }

        /* Spider Body Walking Sway */
        @keyframes spiderBodyWalkSway {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }

        /* Spider Resting Abdomen Breathing */
        @keyframes spiderRestBreathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }

        .spider-walking .spider-leg-group-a {
          animation: spiderLegWalkA 0.32s ease-in-out infinite;
          transform-origin: 80px 75px;
        }
        .spider-walking .spider-leg-group-b {
          animation: spiderLegWalkB 0.32s ease-in-out infinite;
          transform-origin: 80px 75px;
        }
        .spider-walking .spider-body-group {
          animation: spiderBodyWalkSway 0.32s ease-in-out infinite;
          transform-origin: 80px 75px;
        }

        .spider-idle .spider-abdomen-pulse {
          animation: spiderRestBreathe 3.2s ease-in-out infinite;
          transform-origin: 80px 95px;
        }

        /* Center hub pulse */
        @keyframes hubGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50%      { transform: scale(1.15); opacity: 0.85; }
        }
        .hub-halo {
          animation: hubGlowPulse 3s ease-in-out infinite;
          transform-origin: 500px 500px;
        }

        /* Offscreen pause */
        .web-paused .tech-node-wrapper,
        .web-paused .web-ambient-breathe,
        .web-paused .thread-laser-active,
        .web-paused .spider-leg-group-a,
        .web-paused .spider-leg-group-b,
        .web-paused .spider-body-group,
        .web-paused .spider-abdomen-pulse,
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
        {/* ── 1. EXACT WEB DESIGN (web1-770H2sSx.png rendered simply in red) ── */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-visible">
          <picture className="w-full h-full flex items-center justify-center">
            <source srcSet={ASSETS.webCrimsonImg} type="image/webp" />
            <img
              src={ASSETS.webCrimsonImgPng}
              alt="Spider-Man Web Design in Red"
              width="1200"
              height="1200"
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-contain pointer-events-none web-ambient-breathe ${
                hasDrawnIn ? "web-image-fade" : "opacity-0"
              }`}
            />
          </picture>
        </div>

        {/* ── 2. SVG INTERACTIVE ROUTING LAYER ── */}
        <svg
          viewBox="0 0 1000 1000"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Center Hub Ambient Glow */}
            <radialGradient id="hubCenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#a31515" stopOpacity="0.15" />
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
            opacity="0.9"
          />
          <circle
            cx={WEB_CONFIG.cx}
            cy={WEB_CONFIG.cy}
            r="2.5"
            fill="#ffffff"
          />

          {/* Active Shortest Path Electric Laser Highlight (Algorithm Route through Center) */}
          {highlightPathData && (
            <g>
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

        {/* ── 3. 2D CRIMSON SPIDER WITH LEG MOVEMENT (inspired by crimson-spider.webp) ── */}
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
          <Spider2D isCrawling={isCrawling} size={48} />
        </div>

        {/* ── 4. HTML NODES LAYER: 30 Tech Chips Anchored to Spokes with Zero Overlaps ── */}
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
