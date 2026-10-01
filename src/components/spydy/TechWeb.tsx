/**
 * TechWeb.tsx
 *
 * Interactive Spider-Man Web — Mathematical & Complex Structural Web
 * with Dynamic Spider Crawling along Active Spoke Threads.
 *
 * Key Capabilities:
 * 1. 100% Visible & Traceable Structure: Every single tech chip sits directly
 *    on a real radial spoke thread emanating from the central hub (800, 450).
 * 2. Complex Arachnid Architecture: Main spokes, catenary sagging concentric rings,
 *    branching splitters, diagonal cross-cell struts, central vortex, and glistening dewdrops.
 * 3. Small Crimson Spider (inspired by reference image):
 *    - Rests in the center hub at idle.
 *    - On chip hover, scuttles smoothly along the exact spoke thread directly to that chip.
 *    - Rotates to face the chip as it crawls.
 *    - On hover leave, scurries back along the thread to the center hub.
 * 4. Active Thread Glow: Spoke beneath the spider pulses with electric crimson laser light.
 * 5. 60fps GPU performance with IntersectionObserver offscreen pause and mobile responsiveness.
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
  generateMainSpokesPath,
  generateSaggingRingsPath,
  generateBranchSplittersPath,
  generateCrossStrutsPath,
  generateCenterHubSpiralPath,
  generateOuterWispsPath,
  generateDewdropsList,
  generateThreadHighlightPath,
  calculateSpiderTarget,
} from "./techData";
import { TechChip } from "./TechChip";
import { ASSETS } from "../../data/spidermanData";

export const TechWeb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [isSpiderMoving, setIsSpiderMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDrawnIn, setHasDrawnIn] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const moveTimerRef = useRef<number | null>(null);

  // Precomputed Web Geometry Paths (calculated once with zero layout shift)
  const mainSpokesPath = useMemo(() => generateMainSpokesPath(WEB_CONFIG), []);
  const saggingRingsPath = useMemo(() => generateSaggingRingsPath(WEB_CONFIG), []);
  const branchSplittersPath = useMemo(() => generateBranchSplittersPath(WEB_CONFIG), []);
  const crossStrutsPath = useMemo(() => generateCrossStrutsPath(WEB_CONFIG), []);
  const hubSpiralPath = useMemo(() => generateCenterHubSpiralPath(WEB_CONFIG), []);
  const outerWispsPath = useMemo(() => generateOuterWispsPath(WEB_CONFIG), []);
  const dewdrops = useMemo(() => generateDewdropsList(WEB_CONFIG), []);

  // Compute active thread highlight path when a chip is hovered
  const highlightPathData = useMemo(() => {
    if (!hoveredNode) return "";
    return generateThreadHighlightPath(hoveredNode, WEB_CONFIG);
  }, [hoveredNode]);

  // Compute spider target coordinates and rotation along the active spoke
  const spiderTarget = useMemo(() => {
    return calculateSpiderTarget(hoveredNode, WEB_CONFIG);
  }, [hoveredNode]);

  // Handle chip hover with spider scuttle animation trigger
  const handleChipHover = useCallback((node: TechNode) => {
    setHoveredNode(node);
    setIsSpiderMoving(true);
    if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    moveTimerRef.current = window.setTimeout(() => {
      setIsSpiderMoving(false);
    }, 550);
  }, []);

  const handleChipLeave = useCallback(() => {
    setHoveredNode(null);
    setIsSpiderMoving(true);
    if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    moveTimerRef.current = window.setTimeout(() => {
      setIsSpiderMoving(false);
    }, 550);
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

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1400px] mx-auto aspect-[16/9] min-h-[460px] sm:min-h-[560px] md:min-h-[680px] lg:min-h-[760px] flex items-center justify-center select-none overflow-visible ${
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

        /* Web draw-in reveal on scroll */
        @keyframes webPathReveal {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          100% { stroke-dashoffset: 0;    opacity: 1; }
        }
        .web-stroke-draw {
          stroke-dasharray: 2400;
          animation: webPathReveal 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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

        /* Active thread laser glow pulse */
        @keyframes threadLaserPulse {
          0%, 100% { opacity: 0.9; stroke-width: 4.5px; }
          50%      { opacity: 1;   stroke-width: 6.0px; }
        }
        .thread-laser-active {
          animation: threadLaserPulse 0.9s ease-in-out infinite;
        }

        /* Spider leg scuttle twitch during crawl */
        @keyframes spiderLegJitter {
          0%   { transform: scale(0.96, 1.04) rotate(-3deg); }
          100% { transform: scale(1.04, 0.96) rotate(3deg); }
        }
        .spider-scuttling-img {
          animation: spiderLegJitter 0.12s ease-in-out infinite alternate;
        }

        /* Spider gentle resting breath at center */
        @keyframes spiderRestBreathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
        .spider-resting-img {
          animation: spiderRestBreathe 3.5s ease-in-out infinite;
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
          transform-origin: 800px 450px;
        }

        /* Offscreen pause */
        .web-paused .tech-node-wrapper,
        .web-paused .web-ambient-breathe,
        .web-paused .thread-laser-active,
        .web-paused .spider-scuttling-img,
        .web-paused .spider-resting-img,
        .web-paused .dewdrop-glint,
        .web-paused .hub-halo {
          animation-play-state: paused !important;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .tech-node-wrapper,
          .web-ambient-breathe,
          .thread-laser-active,
          .spider-scuttling-img,
          .spider-resting-img,
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
        {/* ── Radial Background Silk Halo ── */}
        <div
          className="absolute inset-[6%] rounded-full pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(197,29,29,0.08) 0%, rgba(163,21,21,0.03) 45%, transparent 72%)",
          }}
          aria-hidden="true"
        />

        {/* ── 1. STRUCTURED & COMPLEX SVG SPIDER WEB ── */}
        <svg
          viewBox="0 0 1600 900"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible web-ambient-breathe"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Center Hub Ambient Glow */}
            <radialGradient id="webHubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
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

          {/* Layer 1: Outer Anchor Wisps reaching toward viewport edges */}
          <path
            d={outerWispsPath}
            fill="none"
            stroke="#a31515"
            strokeWidth="1.2"
            opacity="0.28"
            className={hasDrawnIn ? "" : "opacity-0"}
          />

          {/* Layer 2: Delicate Cross-Cell Struts & Diagonal Filaments */}
          <path
            d={crossStrutsPath}
            fill="none"
            stroke="#c51d1d"
            strokeWidth="1.1"
            opacity="0.32"
            className={hasDrawnIn ? "" : "opacity-0"}
          />

          {/* Layer 3: Branching Outer Splitters (forks between spokes) */}
          <path
            d={branchSplittersPath}
            fill="none"
            stroke="#c51d1d"
            strokeWidth="1.5"
            opacity="0.55"
            className={hasDrawnIn ? "" : "opacity-0"}
          />

          {/* Layer 4: Concentric Sagging Rings (Rings 1 to 6 with gravity droop) */}
          <path
            d={saggingRingsPath}
            fill="none"
            stroke="#c51d1d"
            strokeWidth="2.2"
            opacity="0.82"
            strokeLinecap="round"
            className={hasDrawnIn ? "web-stroke-draw" : "opacity-0"}
          />
          <path
            d={saggingRingsPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth="0.8"
            opacity="0.88"
            strokeLinecap="round"
            className={hasDrawnIn ? "" : "opacity-0"}
          />

          {/* Layer 5: 12 Main Spokes directly connecting Hub through all Chips */}
          <path
            d={mainSpokesPath}
            fill="none"
            stroke="#c51d1d"
            strokeWidth="2.6"
            opacity="0.9"
            strokeLinecap="round"
            className={hasDrawnIn ? "web-stroke-draw" : "opacity-0"}
          />
          <path
            d={mainSpokesPath}
            fill="none"
            stroke="#ff4444"
            strokeWidth="1.0"
            opacity="0.95"
            strokeLinecap="round"
            className={hasDrawnIn ? "" : "opacity-0"}
          />

          {/* Layer 6: Central Hub Spiral Vortex */}
          <path
            d={hubSpiralPath}
            fill="none"
            stroke="#c51d1d"
            strokeWidth="1.8"
            opacity="0.85"
            strokeLinecap="round"
            className={hasDrawnIn ? "" : "opacity-0"}
          />
          <circle cx="800" cy="450" r="60" fill="url(#webHubGlow)" className="hub-halo" />
          <circle cx="800" cy="450" r="7.5" fill="#a31515" opacity="0.9" />
          <circle cx="800" cy="450" r="3" fill="#ffffff" />

          {/* Layer 7: Glistening Dewdrop Beads along threads */}
          <g className={hasDrawnIn ? "" : "opacity-0"}>
            {dewdrops.map((drop, idx) => (
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

          {/* Layer 8: Active Spoke Electric Laser Route when Chip is Hovered */}
          {highlightPathData && (
            <path
              d={highlightPathData}
              fill="none"
              stroke="#ef4444"
              strokeWidth="5.0"
              strokeLinecap="round"
              filter="url(#laserGlowFilter)"
              className="thread-laser-active"
            />
          )}
        </svg>

        {/* ── 2. SMALL CRIMSON SPIDER CRAWLING ALONG SPOKE THREADS ── */}
        <div
          className="absolute pointer-events-none z-20"
          style={{
            left: `${spiderTarget.pctX}%`,
            top: `${spiderTarget.pctY}%`,
            width: "50px",
            height: "50px",
            transform: `translate3d(-50%, -50%, 0) rotate(${spiderTarget.rotationDeg}deg) scale(${spiderTarget.scale})`,
            transition:
              "left 0.52s cubic-bezier(0.25, 1, 0.5, 1), top 0.52s cubic-bezier(0.25, 1, 0.5, 1), transform 0.52s cubic-bezier(0.25, 1, 0.5, 1)",
            willChange: "transform, left, top",
          }}
          aria-hidden="true"
        >
          <img
            src={ASSETS.crimsonSpider}
            alt="Crimson Spider"
            width="50"
            height="50"
            loading="eager"
            className={`w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)] ${
              isSpiderMoving ? "spider-scuttling-img" : "spider-resting-img"
            }`}
          />
        </div>

        {/* ── 3. HTML CHIP LAYER: 30 Tech Pills Mapped to Spoke & Ring Intersections ── */}
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
