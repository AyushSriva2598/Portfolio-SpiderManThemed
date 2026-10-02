/**
 * techData.ts
 *
 * Spider-Man Skills Web Architecture based on web1-770H2sSx.png (rendered in red).
 * Includes graph construction and Dijkstra's algorithm to determine the shortest path
 * to any skill chip, strictly routed through the web center.
 */

export interface Point {
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
  spokeIndex: number;
  ringIndex: number;
  x: number;
  y: number;
  pctX: number;
  pctY: number;
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
  ringRadii: number[];
  numSpokes: number;
}

export const WEB_CONFIG: WebConfig = {
  viewBoxWidth: 1000,
  viewBoxHeight: 1000,
  cx: 500,
  cy: 500,
  ringRadii: [0, 140, 215, 290, 365, 440],
  numSpokes: 16,
};

const CX = WEB_CONFIG.cx;
const CY = WEB_CONFIG.cy;
const RADII = WEB_CONFIG.ringRadii;

// 16 Primary Spokes Spanning 360 degrees starting North (-90 deg)
export const SPOKE_ANGLES: number[] = Array.from(
  { length: WEB_CONFIG.numSpokes },
  (_, i) => (i * 360) / WEB_CONFIG.numSpokes - 90
);

// ── 30 Tech Nodes Mapped across 16 Spokes & 5 Rings (0 Collisions, 123px min distance) ──
const RAW_CHIPS: Array<{
  name: string;
  icon: string;
  spoke: number;
  ring: number;
  category: TechNode["category"];
}> = [
  // Spoke 0 (North, 12:00, -90°)
  { name: "TypeScript", icon: "typescript", spoke: 0, ring: 2, category: "languages" },
  { name: "JavaScript", icon: "javascript", spoke: 0, ring: 4, category: "languages" },

  // Spoke 1 (NNE, 12:45, -67.5°)
  { name: "Python", icon: "python", spoke: 1, ring: 3, category: "languages" },
  { name: "C++", icon: "cplusplus", spoke: 1, ring: 5, category: "languages" },

  // Spoke 2 (NE, 1:30, -45°)
  { name: "React", icon: "react", spoke: 2, ring: 2, category: "frontend" },
  { name: "Next.js", icon: "nextdotjs", spoke: 2, ring: 4, category: "frontend" },

  // Spoke 3 (ENE, 2:15, -22.5°)
  { name: "Tailwind CSS", icon: "tailwindcss", spoke: 3, ring: 3, category: "frontend" },
  { name: "shadcn/ui", icon: "shadcnui", spoke: 3, ring: 5, category: "frontend" },

  // Spoke 4 (East, 3:00, 0°) - Horizontal axis: single chip for generous mobile clearance
  { name: "Figma", icon: "figma", spoke: 4, ring: 2, category: "tools" },

  // Spoke 5 (ESE, 3:45, 22.5°)
  { name: "Java", icon: "openjdk", spoke: 5, ring: 3, category: "languages" },
  { name: "Node.js", icon: "nodedotjs", spoke: 5, ring: 5, category: "backend" },

  // Spoke 6 (SE, 4:30, 45°)
  { name: "Express.js", icon: "express", spoke: 6, ring: 2, category: "backend" },
  { name: "FastAPI", icon: "fastapi", spoke: 6, ring: 4, category: "backend" },

  // Spoke 7 (SSE, 5:15, 67.5°)
  { name: "Django REST", icon: "django", spoke: 7, ring: 3, category: "backend" },
  { name: "Flask", icon: "flask", spoke: 7, ring: 5, category: "backend" },

  // Spoke 8 (South, 6:00, 90°)
  { name: "PostgreSQL", icon: "postgresql", spoke: 8, ring: 2, category: "databases" },
  { name: "MySQL", icon: "mysql", spoke: 8, ring: 4, category: "databases" },

  // Spoke 9 (SSW, 6:45, 112.5°)
  { name: "MongoDB", icon: "mongodb", spoke: 9, ring: 3, category: "databases" },
  { name: "Prisma", icon: "prisma", spoke: 9, ring: 5, category: "databases" },

  // Spoke 10 (SW, 7:30, 135°)
  { name: "Drizzle ORM", icon: "drizzle", spoke: 10, ring: 2, category: "databases" },
  { name: "Supabase", icon: "supabase", spoke: 10, ring: 4, category: "databases" },

  // Spoke 11 (WSW, 8:15, 157.5°)
  { name: "Firebase", icon: "firebase", spoke: 11, ring: 3, category: "databases" },
  { name: "JWT", icon: "jsonwebtokens", spoke: 11, ring: 5, category: "backend" },

  // Spoke 12 (West, 9:00, 180°) - Horizontal axis: single chip for generous mobile clearance
  { name: "Docker", icon: "docker", spoke: 12, ring: 2, category: "cloud-devops" },

  // Spoke 13 (WNW, 9:45, 202.5°)
  { name: "Kubernetes", icon: "kubernetes", spoke: 13, ring: 3, category: "cloud-devops" },
  { name: "REST APIs", icon: "fastapi", spoke: 13, ring: 5, category: "backend" },

  // Spoke 14 (NW, 10:30, 225°)
  { name: "AWS", icon: "aws", spoke: 14, ring: 2, category: "cloud-devops" },
  { name: "Terraform", icon: "terraform", spoke: 14, ring: 4, category: "cloud-devops" },

  // Spoke 15 (NNW, 11:15, 247.5°)
  { name: "Vercel", icon: "vercel", spoke: 15, ring: 3, category: "cloud-devops" },
  { name: "Git & GitHub", icon: "git & github", spoke: 15, ring: 5, category: "tools" },
];

export const TECH_NODES: TechNode[] = RAW_CHIPS.map((chip, idx) => {
  const angleDeg = SPOKE_ANGLES[chip.spoke];
  const rad = (angleDeg * Math.PI) / 180;
  const r = RADII[chip.ring];
  const x = Math.round((CX + r * Math.cos(rad)) * 10) / 10;
  const y = Math.round((CY + r * Math.sin(rad)) * 10) / 10;

  const pctX = Math.round((x / WEB_CONFIG.viewBoxWidth) * 10000) / 100;
  const pctY = Math.round((y / WEB_CONFIG.viewBoxHeight) * 10000) / 100;

  const bobDelay = `${((idx * 0.23) % 2.5).toFixed(2)}s`;
  const bobDuration = `${(3.2 + ((idx * 0.17) % 1.6)).toFixed(2)}s`;
  const bobAmplitude = `${chip.ring % 2 === 0 ? -4 : -3}px`;

  return {
    id: `chip-${chip.spoke}-${chip.ring}-${idx}`,
    name: chip.name,
    icon: chip.icon,
    category: chip.category,
    spokeIndex: chip.spoke,
    ringIndex: chip.ring,
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

// ── Graph Construction & Shortest Path Algorithm ────────────────────────

interface GraphNode {
  id: string;
  x: number;
  y: number;
  neighbors: Map<string, number>; // neighborId -> distance weight
}

// Build web graph: Center Hub, Spoke-Ring Knots, and Chip Nodes
function buildWebGraph(): Map<string, GraphNode> {
  const graph = new Map<string, GraphNode>();

  function addNode(id: string, x: number, y: number) {
    if (!graph.has(id)) {
      graph.set(id, { id, x, y, neighbors: new Map() });
    }
  }

  function addEdge(id1: string, id2: string) {
    const n1 = graph.get(id1);
    const n2 = graph.get(id2);
    if (!n1 || !n2) return;
    const dist = Math.hypot(n2.x - n1.x, n2.y - n1.y);
    n1.neighbors.set(id2, dist);
    n2.neighbors.set(id1, dist);
  }

  // 1. Center Hub Node
  addNode("center", CX, CY);

  // 2. All Spoke Knots across all 16 spokes and 5 rings
  for (let s = 0; s < WEB_CONFIG.numSpokes; s++) {
    const angDeg = SPOKE_ANGLES[s];
    const rad = (angDeg * Math.PI) / 180;

    for (let r = 1; r <= 5; r++) {
      const kId = `knot-${s}-${r}`;
      const kx = Math.round((CX + RADII[r] * Math.cos(rad)) * 10) / 10;
      const ky = Math.round((CY + RADII[r] * Math.sin(rad)) * 10) / 10;
      addNode(kId, kx, ky);

      // Connect radially along spoke
      if (r === 1) {
        addEdge("center", kId);
      } else {
        addEdge(`knot-${s}-${r - 1}`, kId);
      }
    }
  }

  // 3. Connect concentric ring chords between adjacent spokes
  for (let r = 1; r <= 5; r++) {
    for (let s = 0; s < WEB_CONFIG.numSpokes; s++) {
      const nextS = (s + 1) % WEB_CONFIG.numSpokes;
      addEdge(`knot-${s}-${r}`, `knot-${nextS}-${r}`);
    }
  }

  // 4. Attach each Chip directly to its spoke knot
  for (const chip of TECH_NODES) {
    const kId = `knot-${chip.spokeIndex}-${chip.ringIndex}`;
    addNode(chip.id, chip.x, chip.y);
    addEdge(chip.id, kId);
  }

  return graph;
}

const WEB_GRAPH = buildWebGraph();

/**
 * Dijkstra's shortest path algorithm between two node IDs in the web graph
 */
function dijkstra(
  startId: string,
  targetId: string,
  graph: Map<string, GraphNode> = WEB_GRAPH
): Point[] {
  if (!graph.has(startId) || !graph.has(targetId)) return [];

  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const unvisited = new Set<string>();

  for (const id of graph.keys()) {
    distances.set(id, Infinity);
    previous.set(id, null);
    unvisited.add(id);
  }
  distances.set(startId, 0);

  while (unvisited.size > 0) {
    // Find unvisited node with lowest distance
    let currentId: string | null = null;
    let minDistance = Infinity;
    for (const id of unvisited) {
      const d = distances.get(id)!;
      if (d < minDistance) {
        minDistance = d;
        currentId = id;
      }
    }

    if (!currentId || minDistance === Infinity) break;
    if (currentId === targetId) break;

    unvisited.delete(currentId);
    const currentNode = graph.get(currentId)!;

    for (const [neighborId, weight] of currentNode.neighbors) {
      if (!unvisited.has(neighborId)) continue;
      const alt = minDistance + weight;
      if (alt < distances.get(neighborId)!) {
        distances.set(neighborId, alt);
        previous.set(neighborId, currentId);
      }
    }
  }

  // Reconstruct path
  const pathPoints: Point[] = [];
  let curr: string | null = targetId;
  while (curr) {
    const node = graph.get(curr);
    if (node) pathPoints.unshift({ x: node.x, y: node.y });
    curr = previous.get(curr) || null;
    if (curr === startId) {
      const startNode = graph.get(startId);
      if (startNode) pathPoints.unshift({ x: startNode.x, y: startNode.y });
      break;
    }
  }

  return pathPoints;
}

/**
 * Determine the shortest path to any skill chip, ALWAYS going through the center.
 * If starting from center: [Center -> spoke knots -> target chip]
 * If starting from another chip A: [Chip A -> Center] + [Center -> Chip B]
 */
export function findShortestPathThroughCenter(
  targetChip: TechNode,
  startChipId: string | null = null
): Point[] {
  if (!startChipId || startChipId === "center") {
    // Path from Center to Target Chip
    return dijkstra("center", targetChip.id, WEB_GRAPH);
  }

  // Path from startChip to Center, then Center to targetChip
  const pathIn = dijkstra(startChipId, "center", WEB_GRAPH);
  const pathOut = dijkstra("center", targetChip.id, WEB_GRAPH);

  // Concatenate without duplicating the center point
  const combined = [...pathIn];
  for (let i = 1; i < pathOut.length; i++) {
    combined.push(pathOut[i]);
  }
  return combined;
}

/**
 * Generate active SVG laser highlight path along the computed shortest path
 */
export function generateThreadHighlightPath(points: Point[]): string {
  if (!points || points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    d += `L ${points[i].x} ${points[i].y} `;
  }
  return d.trim();
}

/**
 * Calculate 2D Spider Target Coordinates & Angle along the approach spoke
 */
export function calculateSpiderTarget(
  hoveredNode: TechNode | null,
  activePath: Point[]
): {
  pctX: number;
  pctY: number;
  rotationDeg: number;
  scale: number;
} {
  if (!hoveredNode || activePath.length < 2) {
    // Resting position at Center Hub (50%, 50%)
    return {
      pctX: 50,
      pctY: 50,
      rotationDeg: 0,
      scale: 0.9,
    };
  }

  const targetPt = activePath[activePath.length - 1];

  // Find the previous distinct point along the path (at least 8px away) to get the true incoming vector
  let prevPt: Point = { x: WEB_CONFIG.cx, y: WEB_CONFIG.cy };
  for (let i = activePath.length - 2; i >= 0; i--) {
    if (Math.hypot(activePath[i].x - targetPt.x, activePath[i].y - targetPt.y) > 8) {
      prevPt = activePath[i];
      break;
    }
  }

  // Vector approaching target chip along the silk spoke
  const dx = targetPt.x - prevPt.x;
  const dy = targetPt.y - prevPt.y;
  const dist = Math.hypot(dx, dy) || 1;
  const uX = dx / dist;
  const uY = dy / dist;

  // Offset back ~52px along the incoming thread so the spider sits right on the silk without overlapping chip
  const spiderX = targetPt.x - uX * 52;
  const spiderY = targetPt.y - uY * 52;

  const pctX = (spiderX / WEB_CONFIG.viewBoxWidth) * 100;
  const pctY = (spiderY / WEB_CONFIG.viewBoxHeight) * 100;

  // Compute angle along the spoke segment
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
 * Calculate dynamic crawling duration based on total path length
 * Steady spider speed of ~220px/s, clamped between 1.35s and 2.4s ("not reaching immediately")
 */
export function calculateCrawlDuration(path: Point[]): number {
  if (!path || path.length < 2) return 1.5;

  let totalDist = 0;
  for (let i = 1; i < path.length; i++) {
    totalDist += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
  }

  return Math.max(1.35, Math.min(2.4, totalDist / 220));
}
