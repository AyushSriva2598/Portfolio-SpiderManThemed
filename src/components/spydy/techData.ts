/**
 * techData.ts
 *
 * Spider-Man Themed Tech Web — Realistic Distorted Polar Geometry
 *
 * Linearity Preserved:
 * - 12 clear radial spokes originating at center hub (800, 450).
 * - Every tech stack chip sits directly at a real spoke knot intersection.
 * - Visible, continuous thread paths that can be traced with the eye from center to edge.
 *
 * Organic Distortions:
 * - Spokes have natural tension wavers (not rigid sterile ruler lines).
 * - Concentric rings have asymmetric, authentic catenary droop.
 * - Outer branching splitters and chaotic diagonal micro-filaments.
 * - Central hub spiral vortex.
 * - Glistening dewdrop beads.
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
  ringRadiiX: [0, 120, 220, 330, 450, 570, 690],
  ringRadiiY: [0, 80, 145, 215, 290, 360, 420],
  startAngleDeg: -90, // North (12:00)
};

// ─── Deterministic PRNG for Stable Organic Tension ─────────────────────
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Generate Distorted Web Knots (Shared by Spokes, Rings & Chips) ────
// Every knot (thread, ring) has a deterministic organic tension offset
// so spokes, sagging rings, and tech chips meet at the EXACT SAME points.
const knotRng = mulberry32(882244);

export const DISTORTED_KNOTS: Record<string, { x: number; y: number; angleDeg: number }> = {};

for (let r = 0; r <= WEB_CONFIG.ringCount; r++) {
  for (let i = 0; i < WEB_CONFIG.threadCount; i++) {
    if (r === 0) {
      DISTORTED_KNOTS[`${i}-0`] = { x: WEB_CONFIG.cx, y: WEB_CONFIG.cy, angleDeg: 0 };
      continue;
    }

    const angleStep = 360 / WEB_CONFIG.threadCount;
    const baseAngleDeg = WEB_CONFIG.startAngleDeg + i * angleStep;
    
    // Subtle organic angle drift (+- 1.8°) to simulate lateral silk tension
    const angleWobble = (knotRng() - 0.5) * 3.6;
    const effectiveAngleDeg = baseAngleDeg + angleWobble;
    const angleRad = (effectiveAngleDeg * Math.PI) / 180;

    // Subtle radial tension waver (+- 6px)
    const rWobble = (knotRng() - 0.5) * 12.0;
    const rx = (WEB_CONFIG.ringRadiiX[r] + rWobble);
    const ry = (WEB_CONFIG.ringRadiiY[r] + rWobble * 0.6);

    const x = Math.round((WEB_CONFIG.cx + rx * Math.cos(angleRad)) * 10) / 10;
    const y = Math.round((WEB_CONFIG.cy + ry * Math.sin(angleRad)) * 10) / 10;

    DISTORTED_KNOTS[`${i}-${r}`] = { x, y, angleDeg: effectiveAngleDeg };
  }
}

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

export const TECH_NODES: TechNode[] = RAW_TECH_NODES.map((node, index) => {
  const knot = DISTORTED_KNOTS[`${node.thread}-${node.ring}`] || {
    x: WEB_CONFIG.cx,
    y: WEB_CONFIG.cy,
    angleDeg: 0,
  };

  const x = knot.x;
  const y = knot.y;
  const pctX = Math.round((x / WEB_CONFIG.viewBoxWidth) * 10000) / 100;
  const pctY = Math.round((y / WEB_CONFIG.viewBoxHeight) * 10000) / 100;
  const angleDeg = knot.angleDeg;

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

// ─── Mathematical Web Generators ──────────────────────────────────────

// 1. 12 Main Radial Spokes: passing through the exact organic knots of each chip
export function generateMainSpokesPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy, threadCount, ringCount } = config;
  let path = "";

  for (let i = 0; i < threadCount; i++) {
    const k0 = DISTORTED_KNOTS[`${i}-0`] || { x: cx, y: cy };
    path += `M ${k0.x} ${k0.y} `;

    for (let r = 1; r <= ringCount; r++) {
      const k = DISTORTED_KNOTS[`${i}-${r}`];
      if (k) {
        path += `L ${k.x} ${k.y} `;
      }
    }

    // Anchor extension past ring 6 to viewport boundary
    const kLast = DISTORTED_KNOTS[`${i}-${ringCount}`];
    if (kLast) {
      const angRad = Math.atan2(kLast.y - cy, kLast.x - cx);
      const rimX = Math.round((kLast.x + 36 * Math.cos(angRad)) * 10) / 10;
      const rimY = Math.round((kLast.y + 26 * Math.sin(angRad)) * 10) / 10;
      path += `L ${rimX} ${rimY} `;
    }
  }

  return path.trim();
}

// 2. Concentric Sagging Rings with Asymmetric Gravitational Catenary Droop
export function generateSaggingRingsPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy, threadCount, ringCount, startAngleDeg, ringRadiiX, ringRadiiY } = config;
  const sagRng = mulberry32(113355);
  let path = "";

  for (let r = 1; r <= ringCount; r++) {
    for (let i = 0; i < threadCount; i++) {
      const pStart = DISTORTED_KNOTS[`${i}-${r}`];
      const pEnd = DISTORTED_KNOTS[`${(i + 1) % threadCount}-${r}`];
      if (!pStart || !pEnd) continue;

      // Realistic asymmetric sag depth (some sectors sag deeper, some tighter)
      const sagFactor = (0.07 + (r / 7.0) * 0.04) * (0.78 + sagRng() * 0.44);

      // Mid-sector angle with organic tangential drift
      const angleStep = 360 / threadCount;
      const baseMidDeg = startAngleDeg + (i + 0.5) * angleStep + (sagRng() - 0.5) * 3.2;
      const midRad = (baseMidDeg * Math.PI) / 180;

      const rxMid = ringRadiiX[r] * (1.0 - sagFactor);
      const ryMid = ringRadiiY[r] * (1.0 - sagFactor);
      const ctrlX = Math.round((cx + rxMid * Math.cos(midRad)) * 10) / 10;
      const ctrlY = Math.round((cy + ryMid * Math.sin(midRad)) * 10) / 10;

      path += `M ${pStart.x} ${pStart.y} Q ${ctrlX} ${ctrlY}, ${pEnd.x} ${pEnd.y} `;
    }
  }

  return path.trim();
}

// 3. Branching Splitters: Outer intermediate filaments between spokes
export function generateBranchSplittersPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy, threadCount, startAngleDeg, ringRadiiX, ringRadiiY } = config;
  const branchRng = mulberry32(224466);
  let path = "";

  for (let i = 0; i < threadCount; i++) {
    const angleStep = 360 / threadCount;
    const midDeg = startAngleDeg + (i + 0.5) * angleStep + (branchRng() - 0.5) * 2.5;
    const rad = (midDeg * Math.PI) / 180;

    const r3x = ringRadiiX[3] * 1.02;
    const r3y = ringRadiiY[3] * 1.02;
    const r5x = ringRadiiX[5] * 0.98;
    const r5y = ringRadiiY[5] * 0.98;
    const r6x = ringRadiiX[6] * 1.04;
    const r6y = ringRadiiY[6] * 1.04;

    const pStart = [Math.round((cx + r3x * Math.cos(rad)) * 10) / 10, Math.round((cy + r3y * Math.sin(rad)) * 10) / 10];
    const pMid = [Math.round((cx + r5x * Math.cos(rad)) * 10) / 10, Math.round((cy + r5y * Math.sin(rad)) * 10) / 10];
    const pEnd = [Math.round((cx + r6x * Math.cos(rad)) * 10) / 10, Math.round((cy + r6y * Math.sin(rad)) * 10) / 10];

    path += `M ${pStart[0]} ${pStart[1]} Q ${pMid[0]} ${pMid[1]}, ${pEnd[0]} ${pEnd[1]} `;
  }

  return path.trim();
}

// 4. Intricate Cross-Struts: Diagonal filaments bridging across cells
export function generateCrossStrutsPath(config: WebConfig = WEB_CONFIG): string {
  const { threadCount } = config;
  const strutRng = mulberry32(557799);
  let path = "";

  for (let r = 1; r < 6; r++) {
    for (let i = 0; i < threadCount; i++) {
      if (strutRng() < 0.52) {
        const p1 = DISTORTED_KNOTS[`${i}-${r}`];
        const p2 = DISTORTED_KNOTS[`${(i + 1) % threadCount}-${r + 1}`];
        if (p1 && p2) path += `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} `;
      }
      if (strutRng() < 0.32) {
        const p1 = DISTORTED_KNOTS[`${i}-${r + 1}`];
        const p2 = DISTORTED_KNOTS[`${(i + 1) % threadCount}-${r}`];
        if (p1 && p2) path += `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} `;
      }
    }
  }

  return path.trim();
}

// 5. Central Hub Spiral Vortex
export function generateCenterHubSpiralPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy } = config;
  let path = "";
  const steps = 110;

  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const r = 6 + t * 76;
    const ang = t * (Math.PI * 8.5);
    const wobble = Math.sin(ang * 3) * 1.5;
    const x = Math.round((cx + (r + wobble) * 1.35 * Math.cos(ang)) * 10) / 10;
    const y = Math.round((cy + (r + wobble) * 0.95 * Math.sin(ang)) * 10) / 10;

    if (s === 0) path += `M ${x} ${y} `;
    else path += `L ${x} ${y} `;
  }

  return path.trim();
}

// 6. Outer Anchor Wisps
export function generateOuterWispsPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy, threadCount, startAngleDeg } = config;
  const wispRng = mulberry32(771133);
  let path = "";

  for (let i = 0; i < threadCount; i++) {
    if (wispRng() < 0.25) continue;
    const pStart = DISTORTED_KNOTS[`${i}-6`];
    if (!pStart) continue;

    const angleStep = 360 / threadCount;
    const driftAngle = (wispRng() - 0.5) * 22;
    const rad = ((startAngleDeg + i * angleStep + driftAngle) * Math.PI) / 180;
    const dist = 55 + wispRng() * 80;
    const endX = Math.round((pStart.x + dist * Math.cos(rad)) * 10) / 10;
    const endY = Math.round((pStart.y + dist * Math.sin(rad)) * 10) / 10;

    path += `M ${pStart.x} ${pStart.y} Q ${(pStart.x + endX) / 2} ${(pStart.y + endY) / 2 + 6}, ${endX} ${endY} `;
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
  const dropRng = mulberry32(992211);
  const drops: Dewdrop[] = [];

  for (let r = 1; r <= ringCount; r++) {
    for (let i = 0; i < threadCount; i++) {
      const knot = DISTORTED_KNOTS[`${i}-${r}`];
      if (!knot) continue;

      drops.push({
        cx: knot.x,
        cy: knot.y,
        r: 1.8 + dropRng() * 1.4,
        delay: `${(dropRng() * 3).toFixed(2)}s`,
      });

      // Extra beads on droop curves
      if (dropRng() < 0.55) {
        const nextKnot = DISTORTED_KNOTS[`${(i + 1) % threadCount}-${r}`];
        if (nextKnot) {
          drops.push({
            cx: Math.round((knot.x + nextKnot.x) / 2),
            cy: Math.round((knot.y + nextKnot.y) / 2 + 5),
            r: 1.4 + dropRng() * 1.0,
            delay: `${(dropRng() * 3).toFixed(2)}s`,
          });
        }
      }
    }
  }

  return drops;
}

// 8. Active Spoke Highlight Route following the distorted knot polyline
export function generateThreadHighlightPath(
  node: TechNode,
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy } = config;
  let path = `M ${cx} ${cy} `;

  // Follow the distorted knots from hub out to node.ring
  for (let r = 1; r <= node.ring; r++) {
    const k = DISTORTED_KNOTS[`${node.thread}-${r}`];
    if (k) {
      path += `L ${k.x} ${k.y} `;
    }
  }

  return path.trim();
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
      scale: 0.85,
    };
  }

  // Calculate direction vector along the last spoke segment
  const prevKnot = DISTORTED_KNOTS[`${hoveredNode.thread}-${hoveredNode.ring - 1}`] || {
    x: config.cx,
    y: config.cy,
  };
  const dx = hoveredNode.x - prevKnot.x;
  const dy = hoveredNode.y - prevKnot.y;
  const dist = Math.hypot(dx, dy) || 1;
  const dirX = dx / dist;
  const dirY = dy / dist;

  // Offset by 42px towards the center along the incoming spoke segment
  const spiderX = hoveredNode.x - dirX * 42;
  const spiderY = hoveredNode.y - dirY * 42;

  const pctX = (spiderX / config.viewBoxWidth) * 100;
  const pctY = (spiderY / config.viewBoxHeight) * 100;

  // Compute angle along the spoke segment
  const angleRad = Math.atan2(dirY, dirX);
  const angleDeg = (angleRad * 180) / Math.PI;
  // Spider points North (upward, -90deg), so rotation is angleDeg + 90
  const rotationDeg = angleDeg + 90;

  return {
    pctX,
    pctY,
    rotationDeg,
    scale: 1.08,
  };
}

// 10. Slow & Steady Crawl Duration Calculation
export function calculateCrawlDuration(
  hoveredNode: TechNode | null,
  config: WebConfig = WEB_CONFIG
): number {
  if (!hoveredNode) return 1.6; // crawling back to hub takes 1.6s
  const dx = hoveredNode.x - config.cx;
  const dy = hoveredNode.y - config.cy;
  const dist = Math.hypot(dx, dy);
  // Steady walking speed of ~220px/s, clamped between 1.35s and 2.4s
  return Math.max(1.35, Math.min(2.4, dist / 220));
}
