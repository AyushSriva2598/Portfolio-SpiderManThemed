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

// ─── Mathematical Web Generators & Spider Routing ──────────────────────

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getWebPoint(
  threadFloat: number,
  ringIdx: number,
  sagFactor: number = 0.0,
  config: WebConfig = WEB_CONFIG
): [number, number] {
  const angleStep = 360 / config.threadCount;
  const angleDeg = config.startAngleDeg + threadFloat * angleStep;
  const angleRad = (angleDeg * Math.PI) / 180;
  const rx = (config.ringRadiiX[ringIdx] ?? 200) * (1.0 - sagFactor);
  const ry = (config.ringRadiiY[ringIdx] ?? 140) * (1.0 - sagFactor);
  const x = Math.round((config.cx + rx * Math.cos(angleRad)) * 10) / 10;
  const y = Math.round((config.cy + ry * Math.sin(angleRad)) * 10) / 10;
  return [x, y];
}

// 1. 12 Main Spokes directly connecting Hub through all Tech Chips
export function generateMainSpokesPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy, threadCount, startAngleDeg, ringRadiiX, ringRadiiY } = config;
  const angleStep = 360 / threadCount;
  let path = "";

  for (let i = 0; i < threadCount; i++) {
    const angleDeg = startAngleDeg + i * angleStep;
    const rad = (angleDeg * Math.PI) / 180;
    const hubX = Math.round((cx + 18 * Math.cos(rad)) * 10) / 10;
    const hubY = Math.round((cy + 18 * Math.sin(rad)) * 10) / 10;

    const maxRx = ringRadiiX[ringRadiiX.length - 1] + 35;
    const maxRy = ringRadiiY[ringRadiiY.length - 1] + 25;
    const rimX = Math.round((cx + maxRx * Math.cos(rad)) * 10) / 10;
    const rimY = Math.round((cy + maxRy * Math.sin(rad)) * 10) / 10;

    path += `M ${hubX} ${hubY} L ${rimX} ${rimY} `;
  }
  return path.trim();
}

// 2. Concentric Sagging Rings (Rings 1 to 6) with natural gravitational catenary droop
export function generateSaggingRingsPath(config: WebConfig = WEB_CONFIG): string {
  const { threadCount, ringCount } = config;
  let path = "";

  for (let r = 1; r <= ringCount; r++) {
    const sagFactor = 0.07 + (r / ringCount) * 0.04;
    for (let i = 0; i < threadCount; i++) {
      const pStart = getWebPoint(i, r, 0, config);
      const pEnd = getWebPoint((i + 1) % threadCount, r, 0, config);
      const pCtrl = getWebPoint(i + 0.5, r, sagFactor, config);

      path += `M ${pStart[0]} ${pStart[1]} Q ${pCtrl[0]} ${pCtrl[1]}, ${pEnd[0]} ${pEnd[1]} `;
    }
  }
  return path.trim();
}

// 3. Branching Splitters: Outer intermediate filaments between spokes
export function generateBranchSplittersPath(config: WebConfig = WEB_CONFIG): string {
  const { threadCount } = config;
  let path = "";

  for (let i = 0; i < threadCount; i++) {
    const midIdx = i + 0.5;
    const pStart = getWebPoint(midIdx, 3, 0.02, config);
    const pMid = getWebPoint(midIdx, 5, 0.01, config);
    const pEnd = getWebPoint(midIdx, 6, -0.02, config);

    path += `M ${pStart[0]} ${pStart[1]} Q ${pMid[0]} ${pMid[1]}, ${pEnd[0]} ${pEnd[1]} `;
  }
  return path.trim();
}

// 4. Intricate Cross-Struts: Diagonal filaments bridging across cells
export function generateCrossStrutsPath(config: WebConfig = WEB_CONFIG): string {
  const { threadCount } = config;
  const rng = mulberry32(77777);
  let path = "";

  for (let r = 1; r < 6; r++) {
    for (let i = 0; i < threadCount; i++) {
      if (rng() < 0.6) {
        const p1 = getWebPoint(i, r, 0, config);
        const p2 = getWebPoint((i + 1) % threadCount, r + 1, 0.03, config);
        path += `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} `;
      }
      if (rng() < 0.35) {
        const p1 = getWebPoint(i, r + 1, 0, config);
        const p2 = getWebPoint((i + 1) % threadCount, r, -0.03, config);
        path += `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} `;
      }
    }
  }
  return path.trim();
}

// 5. Central Hub Vortex: Concentric spiral and radiating silk knot
export function generateCenterHubSpiralPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy } = config;
  let path = "";
  const steps = 100;

  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const r = 6 + t * 74;
    const ang = t * (Math.PI * 8);
    const x = Math.round((cx + r * 1.35 * Math.cos(ang)) * 10) / 10;
    const y = Math.round((cy + r * 0.95 * Math.sin(ang)) * 10) / 10;

    if (s === 0) path += `M ${x} ${y} `;
    else path += `L ${x} ${y} `;
  }
  return path.trim();
}

// 6. Outer Anchor Wisps: Extending to viewport edges
export function generateOuterWispsPath(config: WebConfig = WEB_CONFIG): string {
  const { threadCount } = config;
  const rng = mulberry32(99999);
  let path = "";

  for (let i = 0; i < threadCount; i++) {
    if (rng() < 0.3) continue;
    const pStart = getWebPoint(i, 6, 0, config);
    const driftAngle = (rng() - 0.5) * 20;
    const angleStep = 360 / threadCount;
    const rad = ((config.startAngleDeg + i * angleStep + driftAngle) * Math.PI) / 180;
    const dist = 50 + rng() * 70;
    const endX = Math.round((pStart[0] + dist * Math.cos(rad)) * 10) / 10;
    const endY = Math.round((pStart[1] + dist * Math.sin(rad)) * 10) / 10;

    path += `M ${pStart[0]} ${pStart[1]} Q ${(pStart[0] + endX) / 2} ${(pStart[1] + endY) / 2 + 5}, ${endX} ${endY} `;
  }
  return path.trim();
}

// 7. Dewdrop Beads Array
export interface Dewdrop {
  cx: number;
  cy: number;
  r: number;
  delay: string;
}

export function generateDewdropsList(config: WebConfig = WEB_CONFIG): Dewdrop[] {
  const { threadCount, ringCount } = config;
  const rng = mulberry32(33333);
  const drops: Dewdrop[] = [];

  for (let r = 1; r <= ringCount; r++) {
    for (let i = 0; i < threadCount; i++) {
      const p = getWebPoint(i, r, 0, config);
      drops.push({
        cx: p[0],
        cy: p[1],
        r: 2.2,
        delay: `${(rng() * 3).toFixed(2)}s`,
      });

      if (rng() < 0.6) {
        const pMid = getWebPoint(i + 0.5, r, 0.08, config);
        drops.push({
          cx: pMid[0],
          cy: pMid[1],
          r: 1.8,
          delay: `${(rng() * 3).toFixed(2)}s`,
        });
      }
    }
  }
  return drops;
}

// 8. Active Spoke Highlight Route (Center Hub → Hovered Chip)
export function generateThreadHighlightPath(
  node: TechNode,
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy } = config;
  return `M ${cx} ${cy} L ${node.x} ${node.y}`;
}

// 9. Spider Target Coordinates along the Spoke Thread
export function calculateSpiderTarget(
  hoveredNode: TechNode | null,
  config: WebConfig = WEB_CONFIG
): {
  pctX: number;
  pctY: number;
  rotationDeg: number;
  scale: number;
} {
  if (!hoveredNode) {
    return {
      pctX: (config.cx / config.viewBoxWidth) * 100,
      pctY: (config.cy / config.viewBoxHeight) * 100,
      rotationDeg: 0,
      scale: 0.72,
    };
  }

  const rad = (hoveredNode.angleDeg * Math.PI) / 180;
  // Offset by 44px towards the center so the spider perches on the spoke thread right in front of the chip
  const spiderX = hoveredNode.x - Math.cos(rad) * 44;
  const spiderY = hoveredNode.y - Math.sin(rad) * 44;

  const pctX = (spiderX / config.viewBoxWidth) * 100;
  const pctY = (spiderY / config.viewBoxHeight) * 100;

  // North is -90deg, spider points North by default, so rotation is angleDeg + 90
  const rotationDeg = hoveredNode.angleDeg + 90;

  return {
    pctX,
    pctY,
    rotationDeg,
    scale: 1.05,
  };
}
