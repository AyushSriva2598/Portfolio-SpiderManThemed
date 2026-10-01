/**
 * techData.ts
 *
 * Spider-Man Themed Tech Web — Organic Glowing Red Web System
 * Inspired directly by Gemini_Generated_Image_yb1dw9yb1dw9yb1d.png:
 * - Dense intricate central spiral hub with spider perched at center
 * - Primary radial spokes + secondary branching fork strands
 * - Sagging concentric rings with natural droop
 * - Organic diagonal cross-braces & polygonal web cells
 * - Dewdrop glint beads scattered along threads and intersections
 * - Exactly 30 tech chips placed with alternating polar stagger (zero overlaps)
 */

// ─── Seeded Deterministic PRNG (mulberry32) ──────────────────────────
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Types ───────────────────────────────────────────────────────────

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
  angleDeg: number;
  radius: number;
  bobDelay: string;
  bobDuration: string;
  bobAmplitude: string;
}

export interface WebConfig {
  viewBoxSize: number;
  cx: number;
  cy: number;
  threadCount: number;
  ringCount: number;
  ringRadii: number[];
  sagFactor: number;
  startAngleDeg: number;
}

export const WEB_CONFIG: WebConfig = {
  viewBoxSize: 1200,
  cx: 600,
  cy: 600,
  threadCount: 12,
  ringCount: 6,
  // Rings chosen with generous 80-90px radial clearance
  ringRadii: [0, 115, 195, 280, 365, 450, 535],
  sagFactor: 0.088,
  startAngleDeg: -90, // North (12:00)
};

// ─── 30 Tech Nodes: Staggered across 12 threads for ZERO overlaps ─────
// Even threads (0, 2, 4, 6, 8, 10): Rings 2, 4, 6 (18 chips)
// Odd threads (1, 3, 5, 7, 9, 11): Rings 3, 5 (12 chips)
// Adjacent chips on same spoke have >= 170px radial distance.
// Adjacent spokes alternate radii. Overlaps are impossible.

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
): { x: number; y: number; angleDeg: number; radius: number } {
  const angleStep = 360 / config.threadCount;
  const angleDeg = config.startAngleDeg + thread * angleStep;
  const angleRad = (angleDeg * Math.PI) / 180;
  const radius = config.ringRadii[ring] ?? 200;

  const x = Math.round((config.cx + radius * Math.cos(angleRad)) * 10) / 10;
  const y = Math.round((config.cy + radius * Math.sin(angleRad)) * 10) / 10;

  return { x, y, angleDeg, radius };
}

export const TECH_NODES: TechNode[] = RAW_TECH_NODES.map((node, index) => {
  const { x, y, angleDeg, radius } = calculatePolarPosition(
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
    angleDeg,
    radius,
    bobDelay,
    bobDuration,
    bobAmplitude,
  };
});

// ─── 1. Dense Spiral Web Center Hub (Where the Spider Sits) ───────────

export function generateCenterHubPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy } = config;
  const hubRng = mulberry32(10101);
  let path = "";

  // 4 tightly wound irregular spiral rings around center
  const hubRadii = [22, 42, 65, 90, 115];
  for (let r = 0; r < hubRadii.length; r++) {
    const radius = hubRadii[r];
    const steps = 12;
    for (let s = 0; s < steps; s++) {
      const a1 = (s * 30 * Math.PI) / 180;
      const a2 = ((s + 1) * 30 * Math.PI) / 180;
      const r1 = radius + (hubRng() - 0.5) * 4;
      const r2 = radius + (hubRng() - 0.5) * 4;
      const x1 = Math.round((cx + r1 * Math.cos(a1)) * 10) / 10;
      const y1 = Math.round((cy + r1 * Math.sin(a1)) * 10) / 10;
      const x2 = Math.round((cx + r2 * Math.cos(a2)) * 10) / 10;
      const y2 = Math.round((cy + r2 * Math.sin(a2)) * 10) / 10;

      // Sagging bezier
      const midA = ((s + 0.5) * 30 * Math.PI) / 180;
      const midR = radius * 0.92;
      const mx = Math.round((cx + midR * Math.cos(midA)) * 10) / 10;
      const my = Math.round((cy + midR * Math.sin(midA)) * 10) / 10;

      path += `M ${x1} ${y1} Q ${mx} ${my}, ${x2} ${y2} `;
    }
  }

  // Radial spokes inside hub connecting to the spider
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    const xEnd = Math.round((cx + 115 * Math.cos(a)) * 10) / 10;
    const yEnd = Math.round((cy + 115 * Math.sin(a)) * 10) / 10;
    path += `M ${cx} ${cy} L ${xEnd} ${yEnd} `;
  }

  return path.trim();
}

// ─── 2. Radial Spokes + Branching Splitter Strands ───────────────────

export function generateRadialThreadsPath(
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const maxRadius = ringRadii[ringRadii.length - 1] + 30;
  const angleStep = 360 / threadCount;
  const spokeRng = mulberry32(77777);

  let path = "";

  // 12 Primary Spokes radiating from hub (r=115) to maxRadius
  for (let i = 0; i < threadCount; i++) {
    const angleRad = ((startAngleDeg + i * angleStep) * Math.PI) / 180;
    const xStart = Math.round((cx + 110 * Math.cos(angleRad)) * 10) / 10;
    const yStart = Math.round((cy + 110 * Math.sin(angleRad)) * 10) / 10;
    const xEnd = Math.round((cx + maxRadius * Math.cos(angleRad)) * 10) / 10;
    const yEnd = Math.round((cy + maxRadius * Math.sin(angleRad)) * 10) / 10;

    const perpX = -Math.sin(angleRad);
    const perpY = Math.cos(angleRad);

    const wobble1 = (spokeRng() - 0.5) * 12;
    const wobble2 = (spokeRng() - 0.5) * 12;

    const cp1x = Math.round(
      (cx + (110 + (maxRadius - 110) * 0.35) * Math.cos(angleRad) + perpX * wobble1) * 10
    ) / 10;
    const cp1y = Math.round(
      (cy + (110 + (maxRadius - 110) * 0.35) * Math.sin(angleRad) + perpY * wobble1) * 10
    ) / 10;
    const cp2x = Math.round(
      (cx + (110 + (maxRadius - 110) * 0.7) * Math.cos(angleRad) + perpX * wobble2) * 10
    ) / 10;
    const cp2y = Math.round(
      (cy + (110 + (maxRadius - 110) * 0.7) * Math.sin(angleRad) + perpY * wobble2) * 10
    ) / 10;

    path += `M ${xStart} ${yStart} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${xEnd} ${yEnd} `;
  }

  // Branching splitter threads (forks between spokes in outer rings, like the inspiration image)
  const branchRng = mulberry32(44444);
  for (let i = 0; i < threadCount; i++) {
    if (branchRng() > 0.5) continue; // fork in half the sectors
    const baseAngle = startAngleDeg + i * angleStep;
    const midAngle = baseAngle + angleStep * 0.5;
    const midRad = (midAngle * Math.PI) / 180;

    // Fork starts at Ring 3 (r=280) and extends to outer ring
    const forkStartR = 280;
    const forkEndR = maxRadius - 15;

    const startX = Math.round((cx + forkStartR * Math.cos(midRad)) * 10) / 10;
    const startY = Math.round((cy + forkStartR * Math.sin(midRad)) * 10) / 10;
    const endX = Math.round((cx + forkEndR * Math.cos(midRad)) * 10) / 10;
    const endY = Math.round((cy + forkEndR * Math.sin(midRad)) * 10) / 10;

    path += `M ${startX} ${startY} L ${endX} ${endY} `;
  }

  return path.trim();
}

// ─── 3. Concentric Sagging Rings with Organic Droop ───────────────────

export function generateSaggingRingsPath(
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const angleStep = 360 / threadCount;
  const ringRng = mulberry32(131313);

  let path = "";

  // Rings 2 to 6
  for (let r = 2; r < ringRadii.length; r++) {
    const baseRadius = ringRadii[r];
    const jitters: number[] = [];
    for (let j = 0; j <= threadCount; j++) {
      jitters.push((ringRng() - 0.5) * 5);
    }

    const firstAngleRad = (startAngleDeg * Math.PI) / 180;
    const firstR = baseRadius + jitters[0];
    const firstX = Math.round((cx + firstR * Math.cos(firstAngleRad)) * 10) / 10;
    const firstY = Math.round((cy + firstR * Math.sin(firstAngleRad)) * 10) / 10;

    path += `M ${firstX} ${firstY} `;

    for (let i = 0; i < threadCount; i++) {
      const nextIdx = (i + 1) % threadCount;
      const endR = baseRadius + jitters[nextIdx];
      const endAngleRad =
        ((startAngleDeg + nextIdx * angleStep) * Math.PI) / 180;
      const endX = Math.round((cx + endR * Math.cos(endAngleRad)) * 10) / 10;
      const endY = Math.round((cy + endR * Math.sin(endAngleRad)) * 10) / 10;

      const sagDepth = 0.082 + ringRng() * 0.035;
      const sagRadius = baseRadius * (1 - sagDepth);
      const midAngleWobble = (ringRng() - 0.5) * 1.5;
      const midAngleRad =
        ((startAngleDeg + (i + 0.5) * angleStep + midAngleWobble) * Math.PI) /
        180;
      const ctrlX = Math.round((cx + sagRadius * Math.cos(midAngleRad)) * 10) / 10;
      const ctrlY = Math.round((cy + sagRadius * Math.sin(midAngleRad)) * 10) / 10;

      path += `Q ${ctrlX} ${ctrlY}, ${endX} ${endY} `;
    }
  }

  return path.trim();
}

// ─── 4. Diagonal Cross-Braces & Polygonal Web Struts ─────────────────
// Seen throughout the inspiration image: small diagonal filaments that
// connect across cells, forming an intricate, chaotic, organic mesh.

export function generateWebCrossStrutsPath(
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const angleStep = 360 / threadCount;
  const strutRng = mulberry32(55555);

  let path = "";

  for (let r = 2; r < ringRadii.length - 1; r++) {
    const rCurrent = ringRadii[r];
    const rNext = ringRadii[r + 1];

    for (let i = 0; i < threadCount; i++) {
      if (strutRng() > 0.45) continue; // organic density

      const a1 = ((startAngleDeg + i * angleStep) * Math.PI) / 180;
      const a2 = ((startAngleDeg + (i + 1) * angleStep) * Math.PI) / 180;

      // Connect spoke i at ring r to spoke i+1 at midway, or spoke i at rNext to spoke i+1 at rCurrent
      const x1 = Math.round((cx + rCurrent * Math.cos(a1)) * 10) / 10;
      const y1 = Math.round((cy + rCurrent * Math.sin(a1)) * 10) / 10;

      const midR = rCurrent + (rNext - rCurrent) * (0.3 + strutRng() * 0.4);
      const x2 = Math.round((cx + midR * Math.cos(a2)) * 10) / 10;
      const y2 = Math.round((cy + midR * Math.sin(a2)) * 10) / 10;

      path += `M ${x1} ${y1} L ${x2} ${y2} `;
    }
  }

  return path.trim();
}

// ─── 5. Outer Anchor Wisps (Reaching to Viewport Corners) ────────────

export function generateWispsPath(
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const outerR = ringRadii[ringRadii.length - 1];
  const angleStep = 360 / threadCount;
  const wispRng = mulberry32(999999);

  let path = "";

  for (let i = 0; i < threadCount; i++) {
    if (wispRng() > 0.6) continue;

    const angleRad = ((startAngleDeg + i * angleStep) * Math.PI) / 180;
    const startR = outerR + 4;
    const endR = outerR + 25 + wispRng() * 32;

    const sx = Math.round((cx + startR * Math.cos(angleRad)) * 10) / 10;
    const sy = Math.round((cy + startR * Math.sin(angleRad)) * 10) / 10;

    const drift = ((wispRng() - 0.5) * 14 * Math.PI) / 180;
    const ex = Math.round((cx + endR * Math.cos(angleRad + drift)) * 10) / 10;
    const ey = Math.round((cy + endR * Math.sin(angleRad + drift)) * 10) / 10;

    const cpR = (startR + endR) / 2;
    const cpDrift = drift * 1.3;
    const cpx = Math.round((cx + cpR * Math.cos(angleRad + cpDrift)) * 10) / 10;
    const cpy = Math.round((cy + cpR * Math.sin(angleRad + cpDrift)) * 10) / 10;

    path += `M ${sx} ${sy} Q ${cpx} ${cpy}, ${ex} ${ey} `;
  }

  return path.trim();
}

// ─── 6. Dewdrop Beads Array (Glint points along threads) ─────────────

export interface Dewdrop {
  cx: number;
  cy: number;
  r: number;
  delay: string;
}

export function generateDewdropsList(config: WebConfig = WEB_CONFIG): Dewdrop[] {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const angleStep = 360 / threadCount;
  const dropRng = mulberry32(88888);
  const drops: Dewdrop[] = [];

  for (let r = 1; r < ringRadii.length; r++) {
    const radius = ringRadii[r];
    for (let i = 0; i < threadCount; i++) {
      if (dropRng() > 0.55) continue; // select intersections

      const angleRad = ((startAngleDeg + i * angleStep) * Math.PI) / 180;
      const x = Math.round((cx + radius * Math.cos(angleRad)) * 10) / 10;
      const y = Math.round((cy + radius * Math.sin(angleRad)) * 10) / 10;
      const dropRadius = 1.8 + dropRng() * 1.6;
      const delay = `${(dropRng() * 3).toFixed(2)}s`;

      drops.push({ cx: x, cy: y, r: dropRadius, delay });
    }
  }

  return drops;
}

// ─── 7. Thread Highlight Route (Center Spider → Node) ────────────────

export function generateThreadHighlightPath(
  node: TechNode,
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy } = config;
  return `M ${cx} ${cy} L ${node.x} ${node.y}`;
}
