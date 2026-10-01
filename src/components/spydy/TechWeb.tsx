/**
 * TechWeb.tsx
 *
 * Interactive Spider-Man SVG Web — Directly Inspired by Gemini Web Reference
 *
 * Features:
 * - Glowing crimson red web architecture with dense central spiral hub
 * - Central animated comic Spider perched right at the hub center (600, 600)
 * - Radial spokes with organic forks & drooping concentric arcs
 * - Intricate diagonal cross-struts (polygonal orb-weaver cells)
 * - Dewdrop light beads glistening along silk threads
 * - Interactive hover routing: Electric thread illuminates from central spider to hovered chip
 * - Interactive Spider Mascot: Responds to hover with animated legs & comic speech bubble
 * - 30 Tech Chips with alternating polar stagger (100% zero overlap)
 * - Auto-paused offscreen for locked 60fps
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
  generateCenterHubPath,
  generateRadialThreadsPath,
  generateSaggingRingsPath,
  generateWebCrossStrutsPath,
  generateWispsPath,
  generateDewdropsList,
  generateThreadHighlightPath,
} from "./techData";
import { TechChip } from "./TechChip";

export const TechWeb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [spiderHovered, setSpiderHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDrawnIn, setHasDrawnIn] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Pre-calculate merged SVG path strings once (deterministic PRNG)
  const hubPathData = useMemo(() => generateCenterHubPath(WEB_CONFIG), []);
  const radialPathData = useMemo(() => generateRadialThreadsPath(WEB_CONFIG), []);
  const ringsPathData = useMemo(() => generateSaggingRingsPath(WEB_CONFIG), []);
  const crossStrutsPathData = useMemo(() => generateWebCrossStrutsPath(WEB_CONFIG), []);
  const wispsPathData = useMemo(() => generateWispsPath(WEB_CONFIG), []);
  const dewdrops = useMemo(() => generateDewdropsList(WEB_CONFIG), []);

  // Compute active thread highlight path when a chip is hovered
  const highlightPathData = useMemo(() => {
    if (!hoveredNode) return "";
    return generateThreadHighlightPath(hoveredNode, WEB_CONFIG);
  }, [hoveredNode]);

  // IntersectionObserver: Pause animations when off-screen
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

      targetX = -yRel * 5;
      targetY = xRel * 5;

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
      className={`relative w-full max-w-[1120px] mx-auto aspect-square flex items-center justify-center select-none overflow-visible ${
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

        /* ─── Animated Pen Drawing Reveal ─── */
        @keyframes penDrawHub {
          0%   { stroke-dashoffset: 4000; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.75; }
        }
        @keyframes penDrawSpokes {
          0%   { stroke-dashoffset: 12000; opacity: 0.1; }
          50%  { opacity: 0.85; }
          100% { stroke-dashoffset: 0; opacity: 0.7; }
        }
        @keyframes penDrawRings {
          0%   { stroke-dashoffset: 16000; opacity: 0; }
          40%  { opacity: 0.5; }
          100% { stroke-dashoffset: 0; opacity: 0.6; }
        }
        @keyframes penDrawStruts {
          0%   { stroke-dashoffset: 6000; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.45; }
        }
        @keyframes penDrawWisps {
          0%   { stroke-dashoffset: 3000; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.4; }
        }
        @keyframes dewdropPop {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1); opacity: 0.85; }
        }

        .web-hub-strands {
          stroke-dasharray: 4000;
          stroke-dashoffset: 4000;
          opacity: 0;
        }
        .web-drawing .web-hub-strands {
          animation: penDrawHub 1.0s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .web-spokes {
          stroke-dasharray: 12000;
          stroke-dashoffset: 12000;
          opacity: 0;
        }
        .web-drawing .web-spokes {
          animation: penDrawSpokes 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }

        .web-rings {
          stroke-dasharray: 16000;
          stroke-dashoffset: 16000;
          opacity: 0;
        }
        .web-drawing .web-rings {
          animation: penDrawRings 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
        }

        .web-struts {
          stroke-dasharray: 6000;
          stroke-dashoffset: 6000;
          opacity: 0;
        }
        .web-drawing .web-struts {
          animation: penDrawStruts 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.9s forwards;
        }

        .web-wisps {
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          opacity: 0;
        }
        .web-drawing .web-wisps {
          animation: penDrawWisps 1.0s cubic-bezier(0.22, 1, 0.36, 1) 1.2s forwards;
        }

        .web-dewdrop {
          transform: scale(0);
          transform-origin: center;
          opacity: 0;
        }
        .web-drawing .web-dewdrop {
          animation: dewdropPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* ─── Center Spider Mascot Animations ─── */
        @keyframes centerSpiderBreathe {
          0%, 100% { transform: translate(600px, 600px) rotate(0deg) scale(1); }
          50%      { transform: translate(600px, 600px) rotate(2deg) scale(1.05); }
        }
        .center-spider-mascot {
          animation: centerSpiderBreathe 3.5s ease-in-out infinite;
          transform-origin: 600px 600px;
          cursor: pointer;
          transition: filter 0.2s ease-out;
        }
        .center-spider-mascot:hover {
          filter: drop-shadow(0 0 16px rgba(239, 68, 68, 0.9));
        }

        /* Spider eyes blinking / glowing */
        @keyframes spiderEyeGlow {
          0%, 100% { opacity: 0.95; filter: drop-shadow(0 0 2px rgba(255,255,255,0.8)); }
          50%      { opacity: 1;    filter: drop-shadow(0 0 6px rgba(255,255,255,1)); }
        }
        .spider-eye {
          animation: spiderEyeGlow 2.5s ease-in-out infinite;
        }

        /* Speech bubble */
        @keyframes comicBubblePop {
          0%   { transform: scale(0); opacity: 0; }
          75%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .spider-bubble {
          animation: comicBubblePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-origin: bottom center;
        }

        /* Active thread glow pulse */
        @keyframes threadGlowPulse {
          0%, 100% { opacity: 0.85; stroke-width: 4px; }
          50%      { opacity: 1;    stroke-width: 5.5px; }
        }
        .thread-glow-active {
          animation: threadGlowPulse 1.0s ease-in-out infinite;
        }

        /* Dewdrop sparkle glint */
        @keyframes dewdropGlint {
          0%, 100% { opacity: 0.4;  transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.35); }
        }
        .dewdrop-sparkle {
          animation: dewdropGlint 2.6s ease-in-out infinite alternate;
          transform-origin: center;
        }

        /* Center hub ambient glow pulse */
        @keyframes hubGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.12); opacity: 0.95; }
        }
        .hub-halo {
          animation: hubGlowPulse 3s ease-in-out infinite;
          transform-origin: 600px 600px;
        }

        /* Offscreen pause */
        .web-paused .tech-node-wrapper,
        .web-paused .center-spider-mascot,
        .web-paused .thread-glow-active,
        .web-paused .dewdrop-sparkle,
        .web-paused .hub-halo,
        .web-paused .spider-eye {
          animation-play-state: paused !important;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .tech-node-wrapper,
          .center-spider-mascot,
          .thread-glow-active,
          .dewdrop-sparkle,
          .hub-halo,
          .spider-eye,
          .web-hub-strands,
          .web-spokes,
          .web-rings,
          .web-struts,
          .web-wisps,
          .web-dewdrop {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: translate3d(-50%, -50%, 0) scale(1) !important;
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
        {/* ── Central Web Vignette / Ambient Radial Gradient ── */}
        <div
          className="absolute inset-[10%] rounded-full pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163,21,21,0.09) 0%, rgba(163,21,21,0.03) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* ── The Hand-Drawn Glowing Red Spider Web SVG ── */}
        <svg
          viewBox="0 0 1200 1200"
          className={`absolute inset-0 w-full h-full pointer-events-none overflow-visible ${
            hasDrawnIn ? "web-drawing" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Hub Center Luminous Glow */}
            <radialGradient id="hubLaserGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#a31515" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#a31515" stopOpacity="0" />
            </radialGradient>

            {/* Spider Body 3D Gradient */}
            <radialGradient id="spiderBody3D" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="45%" stopColor="#a31515" />
              <stop offset="85%" stopColor="#3b0505" />
              <stop offset="100%" stopColor="#111111" />
            </radialGradient>

            {/* Active Thread Electric Glow Filter */}
            <filter id="electricGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Dewdrop Bead Gradient */}
            <radialGradient id="dewdropGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fca5a5" />
              <stop offset="100%" stopColor="#ef4444" />
            </radialGradient>
          </defs>

          {/* 1. Center Hub Glow Halo */}
          <circle cx="600" cy="600" r="75" fill="url(#hubLaserGlow)" className="hub-halo" />

          {/* 2. Dense Central Hub Spiral Strands */}
          <path
            d={hubPathData}
            fill="none"
            stroke="#c51d1d"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.75"
            className="web-hub-strands"
          />

          {/* 3. Radial Spokes & Branching Forks */}
          <path
            d={radialPathData}
            fill="none"
            stroke="#a31515"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.7"
            className="web-spokes"
          />

          {/* 4. Concentric Sagging Rings */}
          <path
            d={ringsPathData}
            fill="none"
            stroke="#a31515"
            strokeWidth="1.7"
            strokeLinecap="round"
            opacity="0.6"
            className="web-rings"
          />

          {/* 5. Diagonal Cross-Braces & Polygonal Web Struts (Inspiration image webbing) */}
          <path
            d={crossStrutsPathData}
            fill="none"
            stroke="#c51d1d"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.45"
            className="web-struts"
          />

          {/* 6. Outer Anchor Wisps */}
          <path
            d={wispsPathData}
            fill="none"
            stroke="#a31515"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.4"
            className="web-wisps"
          />

          {/* 7. Dewdrop Light Beads along Threads */}
          {dewdrops.map((drop, idx) => (
            <circle
              key={`drop-${idx}`}
              cx={drop.cx}
              cy={drop.cy}
              r={drop.r}
              fill="url(#dewdropGrad)"
              stroke="#b91c1c"
              strokeWidth="0.5"
              className="web-dewdrop dewdrop-sparkle"
              style={{
                animationDelay: drop.delay,
              }}
            />
          ))}

          {/* 8. Active Electric Thread Route (Center Spider → Hovered Chip) */}
          {highlightPathData && (
            <path
              d={highlightPathData}
              fill="none"
              stroke="#ef4444"
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#electricGlow)"
              className="thread-glow-active"
            />
          )}

          {/* 9. CENTRAL ANIMATED SPIDER MASCOT — Perched directly at Hub Center */}
          <g
            className="center-spider-mascot pointer-events-auto"
            onMouseEnter={() => setSpiderHovered(true)}
            onMouseLeave={() => setSpiderHovered(false)}
            onClick={() => setSpiderHovered((prev) => !prev)}
            role="button"
            aria-label="Interactive Central Spider Mascot"
            tabIndex={0}
          >
            {/* Center drop shadow */}
            <ellipse cx="0" cy="12" rx="20" ry="8" fill="rgba(0,0,0,0.22)" />

            {/* ── 8 Articulated Arched Spider Legs Gripping Hub Spokes ── */}
            {/* LEFT LEGS (4) */}
            {/* Leg L1 (Top-Left Forward) */}
            <path
              d="M -6 -8 Q -20 -30 -34 -24"
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M -6 -8 Q -20 -30 -34 -24"
              fill="none"
              stroke="#a31515"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="-20" cy="-30" r="2.2" fill="#ef4444" />

            {/* Leg L2 (Mid-Top Left) */}
            <path
              d="M -9 -2 Q -35 -14 -40 4"
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M -9 -2 Q -35 -14 -40 4"
              fill="none"
              stroke="#a31515"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="-35" cy="-14" r="2.2" fill="#ef4444" />

            {/* Leg L3 (Mid-Bottom Left) */}
            <path
              d="M -9 6 Q -36 18 -38 34"
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M -9 6 Q -36 18 -38 34"
              fill="none"
              stroke="#a31515"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="-36" cy="18" r="2.2" fill="#ef4444" />

            {/* Leg L4 (Bottom-Left Back) */}
            <path
              d="M -6 12 Q -22 34 -20 46"
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M -6 12 Q -22 34 -20 46"
              fill="none"
              stroke="#a31515"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="-22" cy="34" r="2.2" fill="#ef4444" />

            {/* RIGHT LEGS (4) */}
            {/* Leg R1 (Top-Right Forward) */}
            <path
              d="M 6 -8 Q 20 -30 34 -24"
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M 6 -8 Q 20 -30 34 -24"
              fill="none"
              stroke="#a31515"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="20" cy="-30" r="2.2" fill="#ef4444" />

            {/* Leg R2 (Mid-Top Right) */}
            <path
              d="M 9 -2 Q 35 -14 40 4"
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M 9 -2 Q 35 -14 40 4"
              fill="none"
              stroke="#a31515"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="35" cy="-14" r="2.2" fill="#ef4444" />

            {/* Leg R3 (Mid-Bottom Right) */}
            <path
              d="M 9 6 Q 36 18 38 34"
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M 9 6 Q 36 18 38 34"
              fill="none"
              stroke="#a31515"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="36" cy="18" r="2.2" fill="#ef4444" />

            {/* Leg R4 (Bottom-Right Back) */}
            <path
              d="M 6 12 Q 22 34 20 46"
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M 6 12 Q 22 34 20 46"
              fill="none"
              stroke="#a31515"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="22" cy="34" r="2.2" fill="#ef4444" />

            {/* ── Spider Abdomen (Crimson Gloss Bulb) ── */}
            <ellipse
              cx="0"
              cy="9"
              rx="14"
              ry="18"
              fill="url(#spiderBody3D)"
              stroke="#111111"
              strokeWidth="2.5"
            />

            {/* Spider-Man spider insignia on abdomen */}
            <path
              d="M 0 0 L -3.5 6 L 0 16 L 3.5 6 Z M -3.5 6 L -9 4 M 3.5 6 L 9 4 M -3.5 10 L -9 12 M 3.5 10 L 9 12"
              stroke="#111111"
              strokeWidth="1.5"
              fill="#111111"
              strokeLinecap="round"
            />

            {/* ── Spider Head (Cephalothorax) ── */}
            <ellipse
              cx="0"
              cy="-8"
              rx="9.5"
              ry="8.5"
              fill="#111111"
              stroke="#a31515"
              strokeWidth="1.5"
            />

            {/* ── Expressive Spider-Man Mask Eyes ── */}
            {/* Left Eye */}
            <path
              d="M -7 -12 Q -2 -13 -2 -7 Q -6 -6 -7 -12 Z"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1.6"
              className="spider-eye"
            />
            {/* Right Eye */}
            <path
              d="M 7 -12 Q 2 -13 2 -7 Q 6 -6 7 -12 Z"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1.6"
              className="spider-eye"
            />

            {/* Cute comic fangs */}
            <path
              d="M -3 -1 L -1.5 3 M 3 -1 L 1.5 3"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* ── Comic Speech Balloon on Hover / Click ── */}
            {spiderHovered && (
              <g className="spider-bubble" transform="translate(0, -52)">
                <rect
                  x="-35"
                  y="-14"
                  width="70"
                  height="28"
                  rx="8"
                  fill="#ffffff"
                  stroke="#111111"
                  strokeWidth="2.2"
                  filter="drop-shadow(0 3px 8px rgba(0,0,0,0.3))"
                />
                <polygon
                  points="-6,14 6,14 0,22"
                  fill="#ffffff"
                  stroke="#111111"
                  strokeWidth="2.2"
                />
                <polygon
                  points="-4,13 4,13 0,20"
                  fill="#ffffff"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#a31515"
                  fontFamily="Bangers, Impact, sans-serif"
                  fontSize="16"
                  letterSpacing="0.08em"
                >
                  THWIP!
                </text>
              </g>
            )}
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
