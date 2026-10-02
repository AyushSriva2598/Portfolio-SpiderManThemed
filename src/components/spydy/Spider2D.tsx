/**
 * Spider2D.tsx
 *
 * 2D Crimson Spider inspired by /assets/crimson-spider.webp
 * Features authentic 2D comic art with realistic organic legs movement (alternating tetrapod gait).
 */

import React from "react";

interface Spider2DProps {
  isCrawling: boolean;
  size?: number;
  className?: string;
}

export const Spider2D: React.FC<Spider2DProps> = ({
  isCrawling,
  size = 52,
  className = "",
}) => {
  return (
    <div
      className={`relative select-none pointer-events-none ${className} ${
        isCrawling ? "spider-walking" : "spider-idle"
      }`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle ground drop shadow for realism on white web */}
          <filter id="spiderShadow2D" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1.5" dy="2.5" stdDeviation="2" floodColor="#7f1d1d" floodOpacity="0.3" />
          </filter>
        </defs>

        <g filter="url(#spiderShadow2D)">
          {/* ── Group A Legs (L1, L3, R2, R4): Tetrapod Gait Step Phase 1 ── */}
          <g className="spider-leg-group-a">
            {/* L1: Long Front-Left Leg reaching forward */}
            <path
              d="M 76 72 Q 60 40 65 14"
              fill="none"
              stroke="#c51d1d"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* L3: Mid-Back Left Leg */}
            <path
              d="M 74 78 Q 42 76 34 96"
              fill="none"
              stroke="#b51212"
              strokeWidth="3.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* R2: Mid-Front Right Leg */}
            <path
              d="M 86 74 Q 116 54 132 50"
              fill="none"
              stroke="#c51d1d"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* R4: Rear-Right Trailing Leg */}
            <path
              d="M 84 82 Q 108 106 112 144"
              fill="none"
              stroke="#990f0f"
              strokeWidth="3.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* ── Group B Legs (L2, L4, R1, R3): Tetrapod Gait Step Phase 2 ── */}
          <g className="spider-leg-group-b">
            {/* L2: Mid-Front Left Leg */}
            <path
              d="M 74 74 Q 44 54 28 50"
              fill="none"
              stroke="#c51d1d"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* L4: Rear-Left Trailing Leg */}
            <path
              d="M 76 82 Q 52 106 48 144"
              fill="none"
              stroke="#990f0f"
              strokeWidth="3.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* R1: Long Front-Right Leg reaching forward */}
            <path
              d="M 84 72 Q 100 40 95 14"
              fill="none"
              stroke="#c51d1d"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* R3: Mid-Back Right Leg */}
            <path
              d="M 86 78 Q 118 76 126 96"
              fill="none"
              stroke="#b51212"
              strokeWidth="3.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* ── Organic Spider Body Group (Cephalothorax + Teardrop Abdomen) ── */}
          <g className="spider-body-group">
            {/* Chelicerae / Front Fangs */}
            <path
              d="M 77 64 Q 75 58 78 52 M 83 64 Q 85 58 82 52"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Cephalothorax (Head/Thorax hub for legs) */}
            <ellipse cx="80" cy="74" rx="9" ry="8" fill="#c51d1d" />

            {/* Teardrop Organic Crimson Abdomen matching crimson-spider.webp */}
            <path
              d="M 73 78 C 62 84, 58 104, 72 116 C 82 124, 94 118, 98 106 C 102 92, 95 80, 87 78 Z"
              fill="#c51d1d"
              stroke="#a31515"
              strokeWidth="1.2"
              className="spider-abdomen-pulse"
            />

            {/* Specular White Gloss Crescent from crimson-spider.webp */}
            <ellipse
              cx="74"
              cy="95"
              rx="3.5"
              ry="6"
              fill="#ffffff"
              opacity="0.9"
              transform="rotate(-20 74 95)"
            />
            {/* Secondary specular glint */}
            <circle cx="88" cy="94" r="1.6" fill="#ffffff" opacity="0.65" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Spider2D;
