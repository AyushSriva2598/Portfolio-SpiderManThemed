/**
 * techData.ts
 *
 * Spider-Man Themed Tech Web — Hand-Drawn Pen-Sketch Aesthetic
 *
 * The web is NOT a clean geometric structure. Real spider webs (and comic book webs)
 * have slightly wobbly radial threads, irregularly sagging spiral capture threads,
 * and organic imperfections. This module recreates that pen-drawn feel using:
 *
 * 1. Radial spokes: Cubic bezier curves with tiny random wobble control points
 *    instead of straight lines — like an artist's quick ink stroke.
 * 2. Spiral rings: Each arc between two spokes has randomised sag depth and
 *    slightly offset control points, plus tiny per-ring radius jitter.
 * 3. Auxiliary "wisps": Short decorative mini-threads that trail off the outer
 *    ring like broken strands, adding realism.
 * 4. Deterministic seeded randomness so the web looks the same every render
 *    (no layout shift / flicker).
 */

// ─── Deterministic PRNG (mulberry32) ─────────────────────────────────
// Ensures the "hand-drawn" wobble is identical every render, no layout shifts.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(42424242);

// Shorthand: random float in [min, max)
function rand(min: number, max: number): number {
  return rng() * (max - min) + min;
}

// ─── Types ───────────────────────────────────────────────────────────

export interface TechNode {
  id: string;
  name: string;
  icon: string;
  thread: number; // 0 to 9
  ring: number; // 2 to 6 (ring 1 reserved for hub)
  category:
    | "languages"
    | "frontend"
    | "backend"
    | "databases"
    | "cloud-devops"
    | "tools";
  description?: string;
  // Computed polar coordinates
  x: number;
  y: number;
  angleDeg: number;
  radius: number;
  // Per-node CSS animation variable overrides for organic bobbing
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
  threadCount: 10,
  ringCount: 6,
  ringRadii: [0, 125, 210, 295, 380, 465, 550],
  sagFactor: 0.085, // 8.5% inward sag for realistic web droop
  startAngleDeg: -90, // Thread 0 points directly North
};

// ─── Raw Chip Data (30 tech items) ───────────────────────────────────

const RAW_TECH_NODES = [
  // ── Thread 0: Core Languages (North) ──
  { name: "TypeScript", icon: "typescript", thread: 0, ring: 2, category: "languages" },
  { name: "JavaScript", icon: "javascript", thread: 0, ring: 4, category: "languages" },
  { name: "Python", icon: "python", thread: 0, ring: 6, category: "languages" },

  // ── Thread 1: Systems & OOP Languages (NNE) ──
  { name: "C++", icon: "cplusplus", thread: 1, ring: 3, category: "languages" },
  { name: "Java", icon: "openjdk", thread: 1, ring: 5, category: "languages" },

  // ── Thread 2: Frontend Frameworks (ENE) ──
  { name: "React", icon: "react", thread: 2, ring: 2, category: "frontend" },
  { name: "Next.js", icon: "nextdotjs", thread: 2, ring: 5, category: "frontend" },

  // ── Thread 3: Styling, UI & Design (ESE) ──
  { name: "Tailwind CSS", icon: "tailwindcss", thread: 3, ring: 3, category: "frontend" },
  { name: "shadcn/ui", icon: "shadcnui", thread: 3, ring: 4, category: "frontend" },
  { name: "Figma", icon: "figma", thread: 3, ring: 6, category: "tools" },

  // ── Thread 4: Backend Runtimes & Protocols (SSE) ──
  { name: "Node.js", icon: "nodedotjs", thread: 4, ring: 2, category: "backend" },
  { name: "Express.js", icon: "express", thread: 4, ring: 4, category: "backend" },
  { name: "REST APIs", icon: "fastapi", thread: 4, ring: 5, category: "backend" },
  { name: "JWT", icon: "jsonwebtokens", thread: 4, ring: 6, category: "backend" },

  // ── Thread 5: Python Services & Microframeworks (South) ──
  { name: "FastAPI", icon: "fastapi", thread: 5, ring: 3, category: "backend" },
  { name: "Django REST", icon: "django", thread: 5, ring: 4, category: "backend" },
  { name: "Flask", icon: "flask", thread: 5, ring: 5, category: "backend" },

  // ── Thread 6: Relational Databases & SQL ORMs (SSW) ──
  { name: "PostgreSQL", icon: "postgresql", thread: 6, ring: 2, category: "databases" },
  { name: "MySQL", icon: "mysql", thread: 6, ring: 4, category: "databases" },
  { name: "Prisma", icon: "prisma", thread: 6, ring: 6, category: "databases" },

  // ── Thread 7: NoSQL & Backend-as-a-Service (WSW) ──
  { name: "MongoDB", icon: "mongodb", thread: 7, ring: 3, category: "databases" },
  { name: "Drizzle ORM", icon: "drizzle", thread: 7, ring: 4, category: "databases" },
  { name: "Supabase", icon: "supabase", thread: 7, ring: 5, category: "databases" },
  { name: "Firebase", icon: "firebase", thread: 7, ring: 6, category: "databases" },

  // ── Thread 8: Cloud Platforms & Infrastructure (WNW) ──
  { name: "AWS", icon: "aws", thread: 8, ring: 2, category: "cloud-devops" },
  { name: "Terraform", icon: "terraform", thread: 8, ring: 4, category: "cloud-devops" },
  { name: "Vercel", icon: "vercel", thread: 8, ring: 6, category: "cloud-devops" },

  // ── Thread 9: Containers, CI/CD & Version Control (NNW) ──
  { name: "Docker", icon: "docker", thread: 9, ring: 3, category: "cloud-devops" },
  { name: "Kubernetes", icon: "kubernetes", thread: 9, ring: 4, category: "cloud-devops" },
  { name: "Git & GitHub", icon: "git & github", thread: 9, ring: 5, category: "tools" },
] as const;

// ─── Polar Position Calculator ───────────────────────────────────────

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

// ─── Pre-computed Nodes with Positions & Bobbing ─────────────────────

export const TECH_NODES: TechNode[] = RAW_TECH_NODES.map((node, index) => {
  const { x, y, angleDeg, radius } = calculatePolarPosition(
    node.thread,
    node.ring
  );

  // Staggered organic bobbing variables per chip
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

// ─── Hand-Drawn Radial Spokes ────────────────────────────────────────
// Instead of M cx cy L xEnd yEnd (boring straight line), each spoke is
// a cubic bezier (C) with two control points that wobble ±8px off the
// straight line. This looks like a quick pen stroke.

export function generateRadialThreadsPath(
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const maxRadius = ringRadii[ringRadii.length - 1] + 30;
  const angleStep = 360 / threadCount;

  // Reset RNG for deterministic output
  const spokeRng = mulberry32(77777);

  let path = "";
  for (let i = 0; i < threadCount; i++) {
    const angleRad = ((startAngleDeg + i * angleStep) * Math.PI) / 180;
    const xEnd =
      Math.round((cx + maxRadius * Math.cos(angleRad)) * 10) / 10;
    const yEnd =
      Math.round((cy + maxRadius * Math.sin(angleRad)) * 10) / 10;

    // Perpendicular direction for wobble offset
    const perpX = -Math.sin(angleRad);
    const perpY = Math.cos(angleRad);

    // Two control points at ~33% and ~66% along the spoke
    const wobble1 = (spokeRng() - 0.5) * 16; // ±8px
    const wobble2 = (spokeRng() - 0.5) * 16;

    const cp1x = Math.round(
      (cx + maxRadius * 0.33 * Math.cos(angleRad) + perpX * wobble1) * 10
    ) / 10;
    const cp1y = Math.round(
      (cy + maxRadius * 0.33 * Math.sin(angleRad) + perpY * wobble1) * 10
    ) / 10;
    const cp2x = Math.round(
      (cx + maxRadius * 0.66 * Math.cos(angleRad) + perpX * wobble2) * 10
    ) / 10;
    const cp2y = Math.round(
      (cy + maxRadius * 0.66 * Math.sin(angleRad) + perpY * wobble2) * 10
    ) / 10;

    path += `M ${cx} ${cy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${xEnd} ${yEnd} `;
  }
  return path.trim();
}

// ─── Hand-Drawn Sagging Concentric Rings ─────────────────────────────
// Each ring arc between two spokes uses a quadratic bezier with randomized
// sag depth (8-12% inward pull), plus per-ring radius jitter (±3px) to
// break perfect symmetry.

export function generateSaggingRingsPath(
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const angleStep = 360 / threadCount;
  const ringRng = mulberry32(131313);

  let path = "";

  for (let r = 1; r < ringRadii.length; r++) {
    const baseRadius = ringRadii[r];
    // Per-ring jitter: slightly different radius per spoke intersection
    const jitters: number[] = [];
    for (let j = 0; j <= threadCount; j++) {
      jitters.push((ringRng() - 0.5) * 6); // ±3px
    }

    // First vertex
    const firstAngleRad = (startAngleDeg * Math.PI) / 180;
    const firstR = baseRadius + jitters[0];
    const firstX =
      Math.round((cx + firstR * Math.cos(firstAngleRad)) * 10) / 10;
    const firstY =
      Math.round((cy + firstR * Math.sin(firstAngleRad)) * 10) / 10;

    path += `M ${firstX} ${firstY} `;

    for (let i = 0; i < threadCount; i++) {
      const nextIdx = (i + 1) % threadCount;
      const endR = baseRadius + jitters[nextIdx];
      const endAngleRad =
        ((startAngleDeg + nextIdx * angleStep) * Math.PI) / 180;
      const endX =
        Math.round((cx + endR * Math.cos(endAngleRad)) * 10) / 10;
      const endY =
        Math.round((cy + endR * Math.sin(endAngleRad)) * 10) / 10;

      // Sag control point — randomized depth between 7-13%
      const sagDepth = 0.07 + ringRng() * 0.06;
      const sagRadius = baseRadius * (1 - sagDepth);
      // Slight angular wobble on control point too (±1.5°)
      const midAngleWobble = (ringRng() - 0.5) * 3;
      const midAngleRad =
        ((startAngleDeg + (i + 0.5) * angleStep + midAngleWobble) *
          Math.PI) /
        180;
      const ctrlX =
        Math.round((cx + sagRadius * Math.cos(midAngleRad)) * 10) / 10;
      const ctrlY =
        Math.round((cy + sagRadius * Math.sin(midAngleRad)) * 10) / 10;

      path += `Q ${ctrlX} ${ctrlY}, ${endX} ${endY} `;
    }
  }

  return path.trim();
}

// ─── Decorative Outer Wisps ──────────────────────────────────────────
// Short broken strands trailing off the outermost ring — like torn silk
// threads blowing in the wind. Adds realism and character.

export function generateWispsPath(
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const outerR = ringRadii[ringRadii.length - 1];
  const angleStep = 360 / threadCount;
  const wispRng = mulberry32(999999);

  let path = "";

  // Place a wisp between every other pair of spokes
  for (let i = 0; i < threadCount; i++) {
    if (wispRng() > 0.6) continue; // ~60% chance of a wisp at each spoke

    const angleRad = ((startAngleDeg + i * angleStep) * Math.PI) / 180;
    const startR = outerR + 5;
    const endR = outerR + 25 + wispRng() * 30; // 25-55px beyond outer ring

    const sx = Math.round((cx + startR * Math.cos(angleRad)) * 10) / 10;
    const sy = Math.round((cy + startR * Math.sin(angleRad)) * 10) / 10;

    // Wisp curves slightly off-angle
    const drift = ((wispRng() - 0.5) * 15 * Math.PI) / 180;
    const ex = Math.round((cx + endR * Math.cos(angleRad + drift)) * 10) / 10;
    const ey = Math.round((cy + endR * Math.sin(angleRad + drift)) * 10) / 10;

    // A small control point for a gentle curve
    const cpR = (startR + endR) / 2;
    const cpDrift = drift * 1.5;
    const cpx = Math.round((cx + cpR * Math.cos(angleRad + cpDrift)) * 10) / 10;
    const cpy = Math.round((cy + cpR * Math.sin(angleRad + cpDrift)) * 10) / 10;

    path += `M ${sx} ${sy} Q ${cpx} ${cpy}, ${ex} ${ey} `;
  }

  // Also add tiny wisps between spokes at mid-angles
  for (let i = 0; i < threadCount; i++) {
    if (wispRng() > 0.4) continue;

    const midAngleRad =
      ((startAngleDeg + (i + 0.5) * angleStep) * Math.PI) / 180;
    const startR = outerR - 5;
    const endR = outerR + 15 + wispRng() * 20;

    const sx = Math.round((cx + startR * Math.cos(midAngleRad)) * 10) / 10;
    const sy = Math.round((cy + startR * Math.sin(midAngleRad)) * 10) / 10;
    const ex = Math.round((cx + endR * Math.cos(midAngleRad)) * 10) / 10;
    const ey = Math.round((cy + endR * Math.sin(midAngleRad)) * 10) / 10;

    path += `M ${sx} ${sy} L ${ex} ${ey} `;
  }

  return path.trim();
}

// ─── Thread Highlight Path (center → node) ───────────────────────────
// Uses the same wobble as the spoke for visual consistency

export function generateThreadHighlightPath(
  node: TechNode,
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy } = config;
  // Simple line is fine for the glow overlay — it sits on top of the wobbly spoke
  return `M ${cx} ${cy} L ${node.x} ${node.y}`;
}
