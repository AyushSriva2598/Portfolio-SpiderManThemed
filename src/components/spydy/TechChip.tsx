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
import { useTheme } from "../../context/ThemeContext";

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
  const { isDark } = useTheme();

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(node)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(node)}
      onBlur={onLeave}
      className={`group relative inline-flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full border transition-[transform,background-color,border-color,color] duration-200 cursor-pointer select-none outline-none ${
        isDark
          ? isHovered
            ? "bg-[#e11d48] text-white border-[#e11d48] scale-110 z-30 shadow-[0_4px_16px_rgba(225,29,72,0.65)] focus-visible:ring-2 focus-visible:ring-[#06b6d4]"
            : "bg-[#121212]/95 text-[#06b6d4] border-[#06b6d4]/40 hover:bg-[#06b6d4] hover:text-black hover:border-[#06b6d4] hover:scale-105 z-10 shadow-xs focus-visible:ring-2 focus-visible:ring-[#06b6d4]"
          : isHovered
          ? "bg-[#a31515] text-white border-[#a31515] scale-110 z-30 shadow-[0_4px_16px_rgba(163,21,21,0.5)] focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          : "bg-white/95 text-[#a31515] border-[#a31515]/40 hover:bg-[#a31515] hover:text-white hover:border-[#a31515] hover:scale-105 z-10 shadow-xs focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      }`}
      aria-label={`${node.name} (${node.category})`}
    >
      {/* Pre-rendered hardware-accelerated fake glow (zero CSS filter blur) */}
      <span
        className={`absolute -inset-1 rounded-full pointer-events-none transition-opacity duration-200 -z-10 ${
          isDark
            ? isHovered
              ? "opacity-100 bg-[#e11d48]/40"
              : "opacity-0 group-hover:opacity-100 bg-[#06b6d4]/30"
            : isHovered
            ? "opacity-100 bg-red-600/25"
            : "opacity-0 group-hover:opacity-100 bg-red-600/25"
        }`}
        aria-hidden="true"
      />

      {/* Brand Icon */}
      <TechIcon
        name={node.name}
        className={`w-2.5 h-2.5 sm:w-4 sm:h-4 shrink-0 transition-colors duration-200 ${
          isDark
            ? isHovered
              ? "text-white"
              : "text-[#06b6d4] group-hover:text-black"
            : isHovered
            ? "text-white"
            : "text-[#a31515] group-hover:text-white"
        }`}
      />

      {/* Technology Name in Authentic Comic Dialogue Typography */}
      <span className="font-dialogue font-bold text-[8px] sm:text-xs md:text-sm tracking-wider uppercase whitespace-nowrap">
        {node.name}
      </span>
    </button>
  );
};

export const TechChip = memo(TechChipComponent);
export default TechChip;
