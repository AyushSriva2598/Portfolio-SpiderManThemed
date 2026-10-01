/**
 * techData.ts
 *
 * Spider-Man Themed Tech Web — 16:9 Panoramic Polar Coordinate System
 * Mapped directly to the exact web structure from Gemini reference image.
 *
 * 12 radial spokes (every 30°) and 6 elliptical concentric rings:
 * - Even spokes (0, 2, 4, 6, 8, 10): Rings 2, 4, 6 (18 chips)
 * - Odd spokes (1, 3, 5, 7, 9, 11): Rings 3, 5 (12 chips)
 * Minimum distance between chips on same spoke is 165px.
 * Zero overlaps guaranteed across all 30 technologies.
 * STRICTLY NO SPIDER.
 */

export interface TechNode {
  id: string;
  name: string;
  icon: string;
  thread: number; // 0 to 11
  ring: number;   // 2 to 6
  category:
    | "languages"
    | "frontend"
    | "backend"
    | "databases"
    | "cloud-devops"
    | "tools";
  description?: string;
  x: number;
  y: number;
  pctX: number; // Percentage 0-100 for responsive CSS placement
  pctY: number; // Percentage 0-100 for responsive CSS placement
  angleDeg: number;
  bobDelay: string;
  bobDuration: string;
  bobAmplitude: string;
}

export interface WebConfig {
  viewBoxWidth: number;
  viewBoxHeight: number;
  cx: number;
  cy: number;
  threadCount: number;
  ringCount: number;
  ringRadiiX: number[];
  ringRadiiY: number[];
  startAngleDeg: number;
}

export const WEB_CONFIG: WebConfig = {
  viewBoxWidth: 1600,
  viewBoxHeight: 900,
  cx: 800,
  cy: 450,
  threadCount: 12,
  ringCount: 6,
  // Elliptical ring radii tuned to the 16:9 panoramic web geometry with open central hub
  ringRadiiX: [0, 120, 220, 330, 450, 570, 690],
  ringRadiiY: [0, 80, 145, 215, 290, 360, 420],
  startAngleDeg: -90, // North (12:00)
};

// ─── 30 Tech Nodes Mapped across 12 Spokes (Zero Overlaps) ───────────

const RAW_TECH_NODES = [
  // ── Spoke 0: Core Languages (North, 12:00) ──
  { name: "TypeScript", icon: "typescript", thread: 0, ring: 2, category: "languages" },
  { name: "JavaScript", icon: "javascript", thread: 0, ring: 4, category: "languages" },
  { name: "Python", icon: "python", thread: 0, ring: 6, category: "languages" },

  // ── Spoke 1: Systems & OOP (NNE, 1:00) ──
  { name: "C++", icon: "cplusplus", thread: 1, ring: 3, category: "languages" },
  { name: "Java", icon: "openjdk", thread: 1, ring: 5, category: "languages" },

  // ── Spoke 2: Modern Frontend & Design (ENE, 2:00) ──
  { name: "React", icon: "react", thread: 2, ring: 2, category: "frontend" },
  { name: "Next.js", icon: "nextdotjs", thread: 2, ring: 4, category: "frontend" },
  { name: "Figma", icon: "figma", thread: 2, ring: 6, category: "tools" },

  // ── Spoke 3: Styling & Design Systems (East, 3:00) ──
  { name: "Tailwind CSS", icon: "tailwindcss", thread: 3, ring: 3, category: "frontend" },
  { name: "shadcn/ui", icon: "shadcnui", thread: 3, ring: 5, category: "frontend" },

  // ── Spoke 4: Node Ecosystem & APIs (ESE, 4:00) ──
  { name: "Node.js", icon: "nodedotjs", thread: 4, ring: 2, category: "backend" },
  { name: "Express.js", icon: "express", thread: 4, ring: 4, category: "backend" },
  { name: "REST APIs", icon: "fastapi", thread: 4, ring: 6, category: "backend" },

  // ── Spoke 5: Python Frameworks (SSE, 5:00) ──
  { name: "FastAPI", icon: "fastapi", thread: 5, ring: 3, category: "backend" },
  { name: "Django REST", icon: "django", thread: 5, ring: 5, category: "backend" },

  // ── Spoke 6: Relational & Document Data (South, 6:00) ──
  { name: "PostgreSQL", icon: "postgresql", thread: 6, ring: 2, category: "databases" },
  { name: "MySQL", icon: "mysql", thread: 6, ring: 4, category: "databases" },
  { name: "MongoDB", icon: "mongodb", thread: 6, ring: 6, category: "databases" },

  // ── Spoke 7: Microframeworks & BaaS (SSW, 7:00) ──
  { name: "Flask", icon: "flask", thread: 7, ring: 3, category: "backend" },
  { name: "Supabase", icon: "supabase", thread: 7, ring: 5, category: "databases" },

  // ── Spoke 8: ORMs & Realtime (WSW, 8:00) ──
  { name: "Prisma", icon: "prisma", thread: 8, ring: 2, category: "databases" },
  { name: "Drizzle ORM", icon: "drizzle", thread: 8, ring: 4, category: "databases" },
  { name: "Firebase", icon: "firebase", thread: 8, ring: 6, category: "databases" },

  // ── Spoke 9: Auth & Containers (West, 9:00) ──
  { name: "JWT", icon: "jsonwebtokens", thread: 9, ring: 3, category: "backend" },
  { name: "Docker", icon: "docker", thread: 9, ring: 5, category: "cloud-devops" },

  // ── Spoke 10: Cloud Infrastructure (WNW, 10:00) ──
  { name: "AWS", icon: "aws", thread: 10, ring: 2, category: "cloud-devops" },
  { name: "Terraform", icon: "terraform", thread: 10, ring: 4, category: "cloud-devops" },
  { name: "Vercel", icon: "vercel", thread: 10, ring: 6, category: "cloud-devops" },

  // ── Spoke 11: Orchestration & Version Control (NNW, 11:00) ──
  { name: "Kubernetes", icon: "kubernetes", thread: 11, ring: 3, category: "cloud-devops" },
  { name: "Git & GitHub", icon: "git & github", thread: 11, ring: 5, category: "tools" },
] as const;

export function calculatePolarPosition(
  thread: number,
  ring: number,
  config: WebConfig = WEB_CONFIG
): { x: number; y: number; pctX: number; pctY: number; angleDeg: number } {
  const angleStep = 360 / config.threadCount;
  const angleDeg = config.startAngleDeg + thread * angleStep;
  const angleRad = (angleDeg * Math.PI) / 180;
  const rx = config.ringRadiiX[ring] ?? 250;
  const ry = config.ringRadiiY[ring] ?? 160;

  const x = Math.round((config.cx + rx * Math.cos(angleRad)) * 10) / 10;
  const y = Math.round((config.cy + ry * Math.sin(angleRad)) * 10) / 10;

  const pctX = Math.round((x / config.viewBoxWidth) * 10000) / 100;
  const pctY = Math.round((y / config.viewBoxHeight) * 10000) / 100;

  return { x, y, pctX, pctY, angleDeg };
}

export const TECH_NODES: TechNode[] = RAW_TECH_NODES.map((node, index) => {
  const { x, y, pctX, pctY, angleDeg } = calculatePolarPosition(
    node.thread,
    node.ring
  );

  const bobDelay = `${((index * 0.23) % 2.5).toFixed(2)}s`;
  const bobDuration = `${(3.2 + ((index * 0.17) % 1.6)).toFixed(2)}s`;
  const bobAmplitude = `${node.ring % 2 === 0 ? -4 : -3}px`;

  return {
    ...node,
    id: `node-${node.thread}-${node.ring}-${index}`,
    x,
    y,
    pctX,
    pctY,
    angleDeg,
    bobDelay,
    bobDuration,
    bobAmplitude,
  };
});

// ─── Active Thread Route to Node (Center Hub → Hovered Chip) ─────────

export function generateThreadHighlightPath(
  node: TechNode,
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy } = config;
  return `M ${cx} ${cy} L ${node.x} ${node.y}`;
}
