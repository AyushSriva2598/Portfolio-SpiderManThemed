import React from "react";

interface Spider3DProps {
  isCrawling: boolean;
  size?: number;
  className?: string;
}

export const Spider3D: React.FC<Spider3DProps> = ({
  isCrawling,
  size = 54,
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
        viewBox="0 0 120 120"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 3D Spherical Shading on Abdomen */}
          <radialGradient id="spiderAbdomen3D" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff5555" />
            <stop offset="35%" stopColor="#dc143c" />
            <stop offset="70%" stopColor="#8b0000" />
            <stop offset="100%" stopColor="#3a0000" />
          </radialGradient>

          {/* 3D Shading on Cephalothorax */}
          <radialGradient id="spiderThorax3D" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#a31515" />
            <stop offset="100%" stopColor="#4a0000" />
          </radialGradient>

          {/* Soft Ground Shadow cast onto web threads */}
          <filter id="spiderGroundShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1.5" dy="3.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        <g filter="url(#spiderGroundShadow)">
          {/* ── Group A Legs (L1, L3, R2, R4): Tetrapod Gait Step 1 ── */}
          <g className="spider-leg-group-a">
            {/* L1: Front Left Leg */}
            <polyline
              points="56,48 40,24 24,10"
              fill="none"
              stroke="#b51212"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* L3: Mid-Back Left Leg */}
            <polyline
              points="53,58 26,56 6,54"
              fill="none"
              stroke="#b51212"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* R2: Mid-Front Right Leg */}
            <polyline
              points="66,52 90,34 110,28"
              fill="none"
              stroke="#c51717"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* R4: Rear Right Leg */}
            <polyline
              points="66,64 88,84 102,106"
              fill="none"
              stroke="#a00e0e"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* ── Group B Legs (L2, L4, R1, R3): Tetrapod Gait Step 2 ── */}
          <g className="spider-leg-group-b">
            {/* L2: Mid-Front Left Leg */}
            <polyline
              points="54,52 30,34 10,28"
              fill="none"
              stroke="#c51717"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* L4: Rear Left Leg */}
            <polyline
              points="54,64 32,84 18,106"
              fill="none"
              stroke="#a00e0e"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* R1: Front Right Leg */}
            <polyline
              points="64,48 80,24 96,10"
              fill="none"
              stroke="#b51212"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* R3: Mid-Back Right Leg */}
            <polyline
              points="67,58 94,56 114,54"
              fill="none"
              stroke="#b51212"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* ── 3D Spider Body Group with Rhythmic Sway ── */}
          <g className="spider-body-group">
            {/* Chelicerae / Fangs */}
            <path
              d="M 57 40 L 55 33 L 53 35"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 63 40 L 65 33 L 67 35"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 3D Bulbous Abdomen */}
            <ellipse
              cx="60"
              cy="70"
              rx="13.5"
              ry="17.5"
              fill="url(#spiderAbdomen3D)"
              className="spider-abdomen-pulse"
            />
            {/* Glossy Specular 3D Highlight Curve on Abdomen */}
            <ellipse
              cx="55"
              cy="64"
              rx="4.8"
              ry="2.6"
              fill="#ffffff"
              opacity="0.65"
              transform="rotate(-20 55 64)"
            />

            {/* 3D Cephalothorax */}
            <ellipse cx="60" cy="49" rx="8.8" ry="9.8" fill="url(#spiderThorax3D)" />
            {/* Specular Highlight on Thorax */}
            <ellipse cx="58" cy="46" rx="2.5" ry="1.8" fill="#ffffff" opacity="0.45" />

            {/* Glowing Red Eyes */}
            <circle cx="57.5" cy="42" r="1.2" fill="#ffffff" />
            <circle cx="57.5" cy="42" r="0.7" fill="#ff0000" />
            <circle cx="62.5" cy="42" r="1.2" fill="#ffffff" />
            <circle cx="62.5" cy="42" r="0.7" fill="#ff0000" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Spider3D;
