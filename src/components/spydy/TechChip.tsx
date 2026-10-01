/**
 * TechChip.tsx
 * 
 * High-performance Spider-Man Comic Pill Chip
 * Positioned on the web at polar intersections.
 * Uses GPU-only transform animations (idle bobbing via CSS keyframes)
 * and pre-rendered pseudo-element glows (zero live blur filter).
 */

import React, { memo } from "react";
import { TechNode } from "./techData";
import { TechIcon } from "./TechIcon";

interface TechChipProps {
  node: TechNode;
  isHovered: boolean;
  onHover: (node: TechNode) => void;
  onLeave: () => void;
}

const TechChipComponent: React.FC<TechChipProps> = ({
  node,
  isHovered,
  onHover,
  onLeave,
}) => {
  // Compute percentage coordinates relative to 1200x1200 viewBox
  const leftPercent = `${((node.x / 1200) * 100).toFixed(3)}%`;
  const topPercent = `${((node.y / 1200) * 100).toFixed(3)}%`;

  return (
    <div
      className="tech-node-wrapper absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      style={{
        left: leftPercent,
        top: topPercent,
        // Inline CSS variables for per-chip staggered idle bobbing
        ["--bob-delay" as string]: node.bobDelay,
        ["--bob-dur" as string]: node.bobDuration,
        ["--bob-amp" as string]: node.bobAmplitude,
      }}
    >
      <button
        type="button"
        onMouseEnter={() => onHover(node)}
        onMouseLeave={onLeave}
        onFocus={() => onHover(node)}
        onBlur={onLeave}
        className={`group relative inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full border transition-[transform,background-color,border-color,color] duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
          isHovered
            ? "bg-[#a31515] text-white border-[#a31515] scale-110 z-30 shadow-[0_4px_16px_rgba(163,21,21,0.5)]"
            : "bg-white/95 text-[#a31515] border-[#a31515]/40 hover:bg-[#a31515] hover:text-white hover:border-[#a31515] hover:scale-105 z-10 shadow-xs"
        }`}
        aria-label={`${node.name} (${node.category})`}
      >
        {/* Pre-rendered hardware-accelerated fake glow (zero CSS filter blur) */}
        <span
          className={`absolute -inset-1 rounded-full bg-red-600/25 pointer-events-none transition-opacity duration-200 -z-10 ${
            isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          aria-hidden="true"
        />

        {/* Brand Icon */}
        <TechIcon
          name={node.name}
          className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 transition-colors duration-200 ${
            isHovered ? "text-white" : "text-[#a31515] group-hover:text-white"
          }`}
        />

        {/* Technology Name in Authentic Comic Dialogue Typography */}
        <span className="font-dialogue font-bold text-[10px] sm:text-xs md:text-sm tracking-wider uppercase whitespace-nowrap">
          {node.name}
        </span>
      </button>
    </div>
  );
};

export const TechChip = memo(TechChipComponent);
export default TechChip;
