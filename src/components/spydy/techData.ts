/**
 * techData.ts
 *
 * Spider-Man Themed Tech Web — Dual-Orb Interconnected Architecture
 * Replicating reference web structure (Left Hub, Right Hub, Tension Bridge)
 *
 * Features:
 * 1. Physical Knot Intersections:
 *    - Primary Left Hub at (223, 554).
 *    - Secondary Right Hub at (932, 625).
 *    - Central Tension Bridge & Diagonal Struts.
 * 2. Visual Traceability:
 *    - Every one of the 30 chips is placed on a visible thread intersection.
 *    - Continuous, traceable silk routes from hub to chip.
 * 3. Slow 3D Spider Navigation:
 *    - Crawls steadily over 1.35s–2.4s along the active route.
 *    - Stops and perches beside the chip with 8 lined articulated legs.
 *    - Returns to primary hub on cursor leave.
 */

export interface RoutePoint {
  x: number;
  y: number;
}

export interface TechNode {
  id: string;
  name: string;
  icon: string;
  category:
    | "languages"
    | "frontend"
    | "backend"
    | "databases"
    | "cloud-devops"
    | "tools";
  region: "left" | "bridge" | "right";
  x: number;
  y: number;
  pctX: number; // 0-100 percentage for responsive CSS placement
  pctY: number; // 0-100 percentage for responsive CSS placement
  route: RoutePoint[];
  bobDelay: string;
  bobDuration: string;
  bobAmplitude: string;
}

export interface DualWebConfig {
  viewBoxWidth: number;
  viewBoxHeight: number;
  hub1: RoutePoint;
  hub2: RoutePoint;
}

export const DUAL_WEB_CONFIG: DualWebConfig = {
  viewBoxWidth: 1000,
  viewBoxHeight: 1000,
  hub1: { x: 223, y: 554 },
  hub2: { x: 932, y: 625 },
};

const H1 = DUAL_WEB_CONFIG.hub1;
const H2 = DUAL_WEB_CONFIG.hub2;

// Raw 30 Tech Nodes with Physical Knot Coordinates and Traceable Silk Routes
const RAW_NODES: Array<{
  name: string;
  icon: string;
  category: TechNode["category"];
  region: TechNode["region"];
  x: number;
  y: number;
  route: RoutePoint[];
}> = [
  // ── Region A: Left Primary Web (18 Chips) ───────────────────────────
  // Spoke L0 (North / Top): TypeScript & JavaScript
  {
    name: "TypeScript",
    icon: "typescript",
    category: "languages",
    region: "left",
    x: 215,
    y: 390,
    route: [H1, { x: 218, y: 470 }, { x: 215, y: 390 }],
  },
  {
    name: "JavaScript",
    icon: "javascript",
    category: "languages",
    region: "left",
    x: 195,
    y: 240,
    route: [H1, { x: 218, y: 470 }, { x: 215, y: 390 }, { x: 195, y: 240 }],
  },

  // Spoke L1 (North-West): Python
  {
    name: "Python",
    icon: "python",
    category: "languages",
    region: "left",
    x: 135,
    y: 285,
    route: [H1, { x: 180, y: 420 }, { x: 135, y: 285 }],
  },

  // Spoke L2 (West-NW): C++ & Java
  {
    name: "C++",
    icon: "cplusplus",
    category: "languages",
    region: "left",
    x: 85,
    y: 440,
    route: [H1, { x: 150, y: 500 }, { x: 85, y: 440 }],
  },
  {
    name: "Java",
    icon: "openjdk",
    category: "languages",
    region: "left",
    x: 45,
    y: 365,
    route: [H1, { x: 150, y: 500 }, { x: 85, y: 440 }, { x: 45, y: 365 }],
  },

  // Spoke L3 (West): MySQL
  {
    name: "MySQL",
    icon: "mysql",
    category: "databases",
    region: "left",
    x: 45,
    y: 525,
    route: [H1, { x: 135, y: 540 }, { x: 45, y: 525 }],
  },

  // Spoke L4 (West-SW): MongoDB
  {
    name: "MongoDB",
    icon: "mongodb",
    category: "databases",
    region: "left",
    x: 60,
    y: 640,
    route: [H1, { x: 140, y: 600 }, { x: 60, y: 640 }],
  },

  // Spoke L5 (South-West): PostgreSQL & Prisma
  {
    name: "PostgreSQL",
    icon: "postgresql",
    category: "databases",
    region: "left",
    x: 115,
    y: 710,
    route: [H1, { x: 170, y: 630 }, { x: 115, y: 710 }],
  },
  {
    name: "Prisma",
    icon: "prisma",
    category: "databases",
    region: "left",
    x: 65,
    y: 840,
    route: [H1, { x: 170, y: 630 }, { x: 115, y: 710 }, { x: 65, y: 840 }],
  },

  // Spoke L6 (South): Flask
  {
    name: "Flask",
    icon: "flask",
    category: "backend",
    region: "left",
    x: 215,
    y: 800,
    route: [H1, { x: 220, y: 680 }, { x: 215, y: 800 }],
  },

  // Spoke L7 (South-East): FastAPI & Django REST
  {
    name: "FastAPI",
    icon: "fastapi",
    category: "backend",
    region: "left",
    x: 320,
    y: 725,
    route: [H1, { x: 270, y: 640 }, { x: 320, y: 725 }],
  },
  {
    name: "Django REST",
    icon: "django",
    category: "backend",
    region: "left",
    x: 385,
    y: 860,
    route: [H1, { x: 270, y: 640 }, { x: 320, y: 725 }, { x: 385, y: 860 }],
  },

  // Spoke L8 (Bottom-Right / SE): Express.js
  {
    name: "Express.js",
    icon: "express",
    category: "backend",
    region: "left",
    x: 345,
    y: 640,
    route: [H1, { x: 285, y: 600 }, { x: 345, y: 640 }],
  },

  // Spoke L9 (East-SE): Node.js
  {
    name: "Node.js",
    icon: "nodedotjs",
    category: "backend",
    region: "left",
    x: 330,
    y: 555,
    route: [H1, { x: 275, y: 555 }, { x: 330, y: 555 }],
  },

  // Spoke L10 (Top-East / NE): React & Next.js
  {
    name: "React",
    icon: "react",
    category: "frontend",
    region: "left",
    x: 270,
    y: 460,
    route: [H1, { x: 245, y: 510 }, { x: 270, y: 460 }],
  },
  {
    name: "Next.js",
    icon: "nextdotjs",
    category: "frontend",
    region: "left",
    x: 345,
    y: 375,
    route: [H1, { x: 245, y: 510 }, { x: 270, y: 460 }, { x: 345, y: 375 }],
  },

  // Spoke L11 (Upper-NE): Tailwind CSS & shadcn/ui
  {
    name: "Tailwind CSS",
    icon: "tailwindcss",
    category: "frontend",
    region: "left",
    x: 285,
    y: 295,
    route: [H1, { x: 255, y: 420 }, { x: 285, y: 295 }],
  },
  {
    name: "shadcn/ui",
    icon: "shadcnui",
    category: "frontend",
    region: "left",
    x: 355,
    y: 175,
    route: [H1, { x: 255, y: 420 }, { x: 285, y: 295 }, { x: 355, y: 175 }],
  },

  // ── Region B: Central Tension Bridge & Struts (6 Chips) ───────────────
  {
    name: "Git & GitHub",
    icon: "git & github",
    category: "tools",
    region: "bridge",
    x: 435,
    y: 260,
    route: [H1, { x: 285, y: 295 }, { x: 355, y: 175 }, { x: 435, y: 260 }],
  },
  {
    name: "REST APIs",
    icon: "fastapi",
    category: "backend",
    region: "bridge",
    x: 490,
    y: 420,
    route: [H1, { x: 330, y: 555 }, { x: 410, y: 480 }, { x: 490, y: 420 }],
  },
  {
    name: "JWT",
    icon: "jsonwebtokens",
    category: "backend",
    region: "bridge",
    x: 565,
    y: 335,
    route: [H1, { x: 345, y: 375 }, { x: 460, y: 360 }, { x: 565, y: 335 }],
  },
  {
    name: "Docker",
    icon: "docker",
    category: "cloud-devops",
    region: "bridge",
    x: 520,
    y: 595,
    route: [H1, { x: 345, y: 640 }, { x: 430, y: 620 }, { x: 520, y: 595 }],
  },
  {
    name: "Drizzle ORM",
    icon: "drizzle",
    category: "databases",
    region: "bridge",
    x: 445,
    y: 770,
    route: [H1, { x: 320, y: 725 }, { x: 380, y: 750 }, { x: 445, y: 770 }],
  },
  {
    name: "Supabase",
    icon: "supabase",
    category: "databases",
    region: "bridge",
    x: 600,
    y: 695,
    route: [H1, { x: 345, y: 640 }, { x: 520, y: 595 }, { x: 600, y: 695 }],
  },

  // ── Region C: Right Secondary Web (6 Chips) ───────────────────────────
  {
    name: "Kubernetes",
    icon: "kubernetes",
    category: "cloud-devops",
    region: "right",
    x: 735,
    y: 435,
    route: [H1, { x: 490, y: 420 }, { x: 640, y: 425 }, { x: 735, y: 435 }],
  },
  {
    name: "AWS",
    icon: "aws",
    category: "cloud-devops",
    region: "right",
    x: 820,
    y: 365,
    route: [H1, { x: 490, y: 420 }, { x: 640, y: 425 }, { x: 735, y: 435 }, { x: 820, y: 365 }],
  },
  {
    name: "Terraform",
    icon: "terraform",
    category: "cloud-devops",
    region: "right",
    x: 890,
    y: 290,
    route: [H1, { x: 490, y: 420 }, { x: 735, y: 435 }, { x: 820, y: 365 }, { x: 890, y: 290 }],
  },
  {
    name: "Vercel",
    icon: "vercel",
    category: "cloud-devops",
    region: "right",
    x: 940,
    y: 485,
    route: [H1, { x: 490, y: 420 }, { x: 730, y: 520 }, H2, { x: 940, y: 485 }],
  },
  {
    name: "Firebase",
    icon: "firebase",
    category: "databases",
    region: "right",
    x: 860,
    y: 680,
    route: [H1, { x: 490, y: 420 }, { x: 730, y: 520 }, H2, { x: 860, y: 680 }],
  },
  {
    name: "Figma",
    icon: "figma",
    category: "tools",
    region: "right",
    x: 745,
    y: 605,
    route: [H1, { x: 490, y: 420 }, { x: 650, y: 570 }, { x: 745, y: 605 }],
  },
];

export const TECH_NODES: TechNode[] = RAW_NODES.map((node, index) => {
  const pctX = Math.round((node.x / DUAL_WEB_CONFIG.viewBoxWidth) * 10000) / 100;
  const pctY = Math.round((node.y / DUAL_WEB_CONFIG.viewBoxHeight) * 10000) / 100;

  const bobDelay = `${((index * 0.23) % 2.5).toFixed(2)}s`;
  const bobDuration = `${(3.2 + ((index * 0.17) % 1.6)).toFixed(2)}s`;
  const bobAmplitude = `${index % 2 === 0 ? -4 : -3}px`;

  return {
    ...node,
    id: `node-${node.region}-${index}`,
    pctX,
    pctY,
    bobDelay,
    bobDuration,
    bobAmplitude,
  };
});

// ─── Mathematical Routing & Laser Highlight ────────────────────────────

/**
 * Generate active SVG laser highlight path along the traceable silk route
 */
export function generateThreadHighlightPath(node: TechNode): string {
  if (!node.route || node.route.length === 0) return "";
  let d = `M ${node.route[0].x} ${node.route[0].y} `;
  for (let i = 1; i < node.route.length; i++) {
    d += `L ${node.route[i].x} ${node.route[i].y} `;
  }
  return d.trim();
}

/**
 * Calculate spider target coordinates along the active silk route
 */
export function calculateSpiderTarget(
  hoveredNode: TechNode | null,
  config: DualWebConfig = DUAL_WEB_CONFIG
): {
  pctX: number;
  pctY: number;
  rotationDeg: number;
  scale: number;
} {
  if (!hoveredNode) {
    // Resting position at Left Primary Hub
    return {
      pctX: (config.hub1.x / config.viewBoxWidth) * 100,
      pctY: (config.hub1.y / config.viewBoxHeight) * 100,
      rotationDeg: 0,
      scale: 0.88,
    };
  }

  const route = hoveredNode.route;
  const targetPt = route[route.length - 1];
  const prevPt = route.length > 1 ? route[route.length - 2] : config.hub1;

  // Vector approaching target chip along silk thread
  const dx = targetPt.x - prevPt.x;
  const dy = targetPt.y - prevPt.y;
  const dist = Math.hypot(dx, dy) || 1;
  const uX = dx / dist;
  const uY = dy / dist;

  // Stand back ~38px from the chip center so spider perches beside the chip without covering text
  const spiderX = targetPt.x - uX * 38;
  const spiderY = targetPt.y - uY * 38;

  const pctX = (spiderX / config.viewBoxWidth) * 100;
  const pctY = (spiderY / config.viewBoxHeight) * 100;

  // Angle along the silk strand
  const angleRad = Math.atan2(uY, uX);
  const angleDeg = (angleRad * 180) / Math.PI;
  // Spider faces North (-90 deg), so rotationDeg = angleDeg + 90
  const rotationDeg = angleDeg + 90;

  return {
    pctX,
    pctY,
    rotationDeg,
    scale: 1.05,
  };
}

/**
 * Slow & Steady Crawl Duration Calculation
 * Satisfies: "starts moving toward that tech stack hovered upon slowly not reaching immediately"
 */
export function calculateCrawlDuration(
  hoveredNode: TechNode | null,
  config: DualWebConfig = DUAL_WEB_CONFIG
): number {
  if (!hoveredNode) return 1.6; // Crawling back to hub takes 1.6s

  // Compute total travel distance along all segments of the route
  let totalDist = 0;
  for (let i = 1; i < hoveredNode.route.length; i++) {
    const p1 = hoveredNode.route[i - 1];
    const p2 = hoveredNode.route[i];
    totalDist += Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  // Steady walking speed of ~230px/s, clamped between 1.35s and 2.4s
  return Math.max(1.35, Math.min(2.4, totalDist / 230));
}

// Glistening Dewdrops along structural knots
export interface Dewdrop {
  cx: number;
  cy: number;
  r: number;
  delay: string;
}

export const DEWDROPS: Dewdrop[] = [
  { cx: 218, cy: 470, r: 2.2, delay: "0.2s" },
  { cx: 180, cy: 420, r: 1.8, delay: "0.9s" },
  { cx: 150, cy: 500, r: 2.0, delay: "1.4s" },
  { cx: 170, cy: 630, r: 2.3, delay: "0.6s" },
  { cx: 270, cy: 640, r: 1.9, delay: "1.8s" },
  { cx: 245, cy: 510, r: 2.4, delay: "1.1s" },
  { cx: 255, cy: 420, r: 2.1, delay: "0.4s" },
  { cx: 410, cy: 480, r: 2.5, delay: "1.5s" },
  { cx: 460, cy: 360, r: 2.0, delay: "2.1s" },
  { cx: 430, cy: 620, r: 2.2, delay: "0.8s" },
  { cx: 640, cy: 425, r: 2.4, delay: "1.7s" },
  { cx: 730, cy: 520, r: 2.1, delay: "2.3s" },
  { cx: 650, cy: 570, r: 1.9, delay: "0.5s" },
];
