/**
 * techData.ts
 * 
 * Spider-Man Themed Tech Web Dataset & Mathematical Projection
 * Computes polar coordinates for 30 technology nodes distributed across
 * 10 radial web threads and 6 concentric sagging rings.
 */

export interface TechNode {
  id: string;
  name: string;
  icon: string;
  thread: number; // 0 to 9
  ring: number;   // 2 to 6 (ring 1 reserved for hub)
  category: "languages" | "frontend" | "backend" | "databases" | "cloud-devops" | "tools";
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

/**
 * Raw Node Specifications (30 Tech Items grouped by thread & ring)
 */
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

/**
 * Calculates polar coordinates (x, y) for a given thread and ring
 */
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

/**
 * Pre-computed Array of All 30 Tech Nodes with Polar Positions & CSS Bobbing Delays
 */
export const TECH_NODES: TechNode[] = RAW_TECH_NODES.map((node, index) => {
  const { x, y, angleDeg, radius } = calculatePolarPosition(node.thread, node.ring);
  
  // Staggered organic bobbing variables per chip
  const bobDelay = `${((index * 0.23) % 2.5).toFixed(2)}s`;
  const bobDuration = `${(3.2 + ((index * 0.17) % 1.6)).toFixed(2)}s`;
  const bobAmplitude = `${(node.ring % 2 === 0 ? -4 : -3)}px`;

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

/**
 * Generates the merged SVG path data for all radial spoke threads
 */
export function generateRadialThreadsPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy, threadCount, ringRadii, startAngleDeg } = config;
  const maxRadius = ringRadii[ringRadii.length - 1] + 25;
  const angleStep = 360 / threadCount;

  let path = "";
  for (let i = 0; i < threadCount; i++) {
    const angleRad = ((startAngleDeg + i * angleStep) * Math.PI) / 180;
    const xEnd = Math.round((cx + maxRadius * Math.cos(angleRad)) * 10) / 10;
    const yEnd = Math.round((cy + maxRadius * Math.sin(angleRad)) * 10) / 10;
    path += `M ${cx} ${cy} L ${xEnd} ${yEnd} `;
  }
  return path.trim();
}

/**
 * Generates the merged SVG path data for all concentric sagging spiral rings
 * Uses quadratic beziers (Q) with slight inward sag between thread intersections.
 */
export function generateSaggingRingsPath(config: WebConfig = WEB_CONFIG): string {
  const { cx, cy, threadCount, ringRadii, sagFactor, startAngleDeg } = config;
  const angleStep = 360 / threadCount;
  let path = "";

  // Iterate over rings (skipping ring 0 which is center point)
  for (let r = 1; r < ringRadii.length; r++) {
    const radius = ringRadii[r];
    const sagRadius = radius * (1 - sagFactor);

    // Compute first vertex to begin ring path
    const firstAngleRad = (startAngleDeg * Math.PI) / 180;
    const firstX = Math.round((cx + radius * Math.cos(firstAngleRad)) * 10) / 10;
    const firstY = Math.round((cy + radius * Math.sin(firstAngleRad)) * 10) / 10;

    path += `M ${firstX} ${firstY} `;

    // Connect each thread spoke to the next with a sagging quadratic bezier curve
    for (let i = 0; i < threadCount; i++) {
      const nextIdx = (i + 1) % threadCount;
      const endAngleRad = ((startAngleDeg + nextIdx * angleStep) * Math.PI) / 180;
      const endX = Math.round((cx + radius * Math.cos(endAngleRad)) * 10) / 10;
      const endY = Math.round((cy + radius * Math.sin(endAngleRad)) * 10) / 10;

      // Sag control point at the mid-angle between thread i and thread i+1
      const midAngleRad = ((startAngleDeg + (i + 0.5) * angleStep) * Math.PI) / 180;
      const ctrlX = Math.round((cx + sagRadius * Math.cos(midAngleRad)) * 10) / 10;
      const ctrlY = Math.round((cy + sagRadius * Math.sin(midAngleRad)) * 10) / 10;

      path += `Q ${ctrlX} ${ctrlY}, ${endX} ${endY} `;
    }
  }

  return path.trim();
}

/**
 * Computes a highlight route path from center to a specific node along its thread
 */
export function generateThreadHighlightPath(
  node: TechNode,
  config: WebConfig = WEB_CONFIG
): string {
  const { cx, cy } = config;
  return `M ${cx} ${cy} L ${node.x} ${node.y}`;
}
