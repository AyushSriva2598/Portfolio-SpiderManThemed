export const HERO_DATA = {
  quoteHeadingLine1: "WITH GREAT POWER",
  quoteHeadingLine2: "COMES GREAT CODE",
  narrativeContext:
    "From distributed microservices to AI-powered platforms — I build systems that stay up when it matters most. Cloud-native. Resilient. Built to scale like the web itself.",
  firstName: "AYUSH ",
  lastName: "SRIVASTAVA",
  role: "Full Stack Developer & Systems Engineer",
  navTitle: "AYUSH",
  tagline: "FRIENDLY NEIGHBOURHOOD ENGINEER - B.Tech IT 24'-28'",
  marqueeItems: [
    "Full Stack Developer",
    "Python & Microservices",
    "React & GSAP Animations",
    "API Gateways & Architecture",
    "High-Performance Systems",
    "Modern Web Engineering",
  ],
  resumeUrl: "#",
};

export const ASSETS = {
  topMaskImg: "/assets/image-1-fYP2o7gg-Photoroom.png",
  bottomIdentityImg: "/assets/image-2-aradhya.png",
  webImg: "/assets/web1-770H2sSx.png",
  spiderIcon: "/assets/spydy-DLbFrGCQ.png",
  standingSpiderImg: "/assets/spydy_stand-BwBM-zCr.png",
  hangingSpiderImg: "/assets/spydy_hang-Cac1gK30.png",
  profileImg: "/assets/mypic-aradhya.png",
  mugshotPoster: "/assets/mugshot-poster.jpg",
  exactWebImg: "/assets/web-inspiration-bright.webp",
  dualWebImg: "/assets/dual-web-inspiration.webp",
  dualWebImgPng: "/assets/dual-web-inspiration.png",
  webCrimsonImg: "/assets/web1-crimson.webp",
  webCrimsonImgPng: "/assets/web1-crimson.png",
  geminiWebCrimson: "/assets/gemini-web-crimson.webp",
  geminiWebCrimsonPng: "/assets/gemini-web-crimson.png",
  wideSpiderWeb: "/assets/wide-spider-web-transparent.webp",
  wideSpiderWebPng: "/assets/wide-spider-web-transparent.png",
  wideSpiderWebFull: "/assets/wide-spider-web.webp",
  crimsonSpider: "/assets/crimson-spider.webp",
  spidermanCrawling: "/assets/spiderman-crawling.webp",
  spidermanCrawlingPng: "/assets/spiderman-crawling.png",
};

export const MILES_ASSETS = {
  topMaskImg: "/assets/miles-mask.webp",
  topMaskImgPng: "/assets/miles-mask.png",
  bottomIdentityImg: "/assets/image-2-aradhya.png",
  webImg: "/assets/web1-770H2sSx.png",
  spiderIcon: "/assets/miles-spider-logo.webp",
  spiderIconPng: "/assets/miles-spider-logo.png",
  standingSpiderImg: "/assets/miles-standing.webp",
  standingSpiderImgPng: "/assets/miles-standing.png",
  hangingSpiderImg: "/assets/miles-hanging.webp",
  hangingSpiderImgPng: "/assets/miles-hanging.png",
  profileImg: "/assets/mypic-aradhya.png",
  mugshotPoster: "/assets/brooklynvisions.jpg",
  wideSpiderWeb: "/assets/miles-wide-web.webp",
  wideSpiderWebPng: "/assets/miles-wide-web.png",
  spidermanCrawling: "/assets/spiderman-crawling.webp",
  spidermanCrawlingPng: "/assets/spiderman-crawling.png",
};

export const ABOUT_DATA = {
  badge: "Behind the Mask",
  title: "Ayush Srivastava",
  paragraphs: [
    "I am a Full Stack Developer & Software Engineer dedicated to engineering high-performance distributed backends, robust API gateways, and fluid interactive web applications.",
    "Operating at the intersection of powerful systems architecture and creative frontend design, I build scalable Python & Node.js services alongside cinematic, responsive interfaces powered by React, GSAP, and Tailwind CSS.",
  ],
  techStack: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Python",
    "Django REST",
    "FastAPI",
    "Flask",
    "C++",
    "Java",
    "Tailwind CSS",
    "Shadcn UI",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Prisma",
    "Drizzle ORM",
    "Supabase",
    "Firebase",
    "REST APIs",
    "JWT",
    "Docker",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Git & GitHub",
    "Vercel",
    "Figma"
  ],
};

export const SKILLS_DATA = [
  { name: "Python", category: "Languages", level: "Advanced" },
  { name: "React 18", category: "Frontend", level: "Advanced" },
  { name: "JavaScript (ES6+)", category: "Languages", level: "Advanced" },
  { name: "TypeScript", category: "Languages", level: "Advanced" },
  { name: "Node.js & Express", category: "Backend", level: "Advanced" },
  { name: "API Gateways", category: "Architecture", level: "Advanced" },
  { name: "FastAPI & Django", category: "Backend", level: "Advanced" },
  { name: "GSAP & Web Animations", category: "Interactive", level: "Advanced" },
  { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
  { name: "HTML5 & Modern CSS", category: "Frontend", level: "Advanced" },
  { name: "PostgreSQL & MySQL", category: "Databases", level: "Advanced" },
  { name: "Docker & CI/CD", category: "DevOps", level: "Proficient" },
  { name: "System Design", category: "Architecture", level: "Advanced" },
  { name: "Git & GitHub", category: "Tools", level: "Advanced" },
];

export const PROJECTS_DATA = [
  {
    title: "TFViz — IaC & GitOps Engine",
    description:
      "Separated a Go AST parser from Django/Neon into independent microservices, lowering sync latency to under 200ms. Built an interactive React Flow GitOps pipeline rendering pre-deployment visual diffs from raw execution plans.",
    tags: ["Python", "DRF", "Next.js", "Docker", "GitOps", "Terraform"],
    link: "https://github.com/AyushSriva2598/TFViz",
    isPinned: true,
  },
  {
    title: "API Gateway — Distributed Rate Limiter",
    description:
      "Engineered in Django REST Framework + Redis 7 with atomic Lua scripts (Token Bucket, Sliding Window Log), delivering sub-1.2ms decisions. Benchmarked to 5,000 VUs in k6 with Linux socket tuning and Nginx keepalive pooling.",
    tags: ["Django", "DRF", "Redis", "Nginx", "Docker", "k6", "Prometheus"],
    link: "https://github.com/AyushSriva2598/ApiGateway",
    isPinned: true,
  },
  {
    title: "DAG Workflow Engine — Broker-less Queue",
    description:
      "Broker-less job queue on PostgreSQL using SELECT FOR UPDATE SKIP LOCKED with race-safe idempotency. Extended into a DAG-based workflow orchestration engine with cycle detection, Redis token bucket limiting, and dead-letter reapers.",
    tags: ["PostgreSQL", "Redis", "Python", "Celery", "Distributed Systems"],
    link: "https://github.com/AyushSriva2598/EmailQueue",
    isPinned: true,
  },
  {
    title: "Ziply — File Compression CLI",
    description:
      "Fast, memory-efficient file compression, archiving, and decompression engine built in Python designed for swift local and networked filesystem operations.",
    tags: ["Python", "CLI", "File Systems", "Algorithms"],
    link: "https://github.com/AyushSriva2598/Ziply",
    isPinned: true,
  },
  {
    title: "KYA — Audience Engagement Analytics",
    description:
      "Interactive audience analytics and engagement platform delivering real-time telemetry tracking, behavioural insights, and dynamic metrics visualization.",
    tags: ["JavaScript", "Full Stack", "Data Viz", "Analytics"],
    link: "https://github.com/Gravyie/KYA",
    isPinned: false,
  },
  {
    title: "Spider-Man Interactive Portfolio",
    description:
      "Immersive comic-inspired personal portfolio featuring counter-intersecting kinetic marquees, interactive technical skills web, and dynamic physics-driven pendulum animations.",
    tags: ["React 18", "GSAP", "Tailwind CSS", "Vite"],
    link: "https://github.com/AyushSriva2598/Portfolio-SpiderManThemed",
    isPinned: false,
  },
];

export const JOURNEY_DATA = {
  badge: "Origin Story & Discipline",
  title: "ENGINEERING JOURNEY.",
  subtitle:
    "A continuous trajectory of mastering backend systems, building uncompromising engineering habits, and taking verified steps into cloud engineering and AI.",
  role: "Full Stack Developer & Systems Builder",
  status: "3x AWS Certified • Exploring AI",
  timeline: "2024 — Present",
  narrativeContext:
    "Grounded in daily habit loops and first-principles computer science — scaling from 200+ algorithmic problems to distributed API gateways, PostgreSQL concurrency engines, and cloud Infrastructure as Code.",
  phases: [
    {
      id: "01",
      phaseNumber: "PHASE 01",
      title: "The CS Foundation & Habit Lock-In",
      tagline: "200+ LeetCode Solved & Core Fundamentals",
      timeframe: "2024",
      description:
        "Dedicated daily focus blocks to build algorithmic grit and foundational computer science habits: solved 200+ problems on LeetCode across trees, graphs, dynamic programming, and greedy algorithms. Mastered Operating Systems, Computer Networks, and Database Management Systems alongside core Python and Java.",
      skills: ["200+ LeetCode", "Data Structures", "Algorithms", "Operating Systems", "Computer Networks", "DBMS"],
    },
    {
      id: "02",
      phaseNumber: "PHASE 02",
      title: "High-Concurrency Systems & Queues",
      tagline: "Distributed API Gateways & Broker-less DAGs",
      timeframe: "Late 2024 — Early 2026",
      description:
        "Moved past simple CRUD apps into concurrency and distributed architecture. Built a distributed API Gateway with atomic Redis 7 Lua rate limiting (sub-1.2ms decisions), load-tested to 5,000 VUs via k6. Engineered a broker-less DAG job queue on PostgreSQL utilizing 'SELECT FOR UPDATE SKIP LOCKED' with race-safe idempotency and automated dead-letter recovery.",
      skills: ["Distributed Systems", "Redis 7 Lua", "API Gateway", "k6 Load Testing (5k VUs)", "PostgreSQL SKIP LOCKED", "Nginx"],
    },
    {
      id: "03",
      phaseNumber: "PHASE 03",
      title: "Cloud Infrastructure & GitOps Engines",
      tagline: "TFViz Architecture & 3x AWS Certifications",
      timeframe: "2025 — 2026",
      description:
        "Earned three AWS certifications (Cloud Practitioner, AI Practitioner, CloudOps Engineer Associate). Built TFViz—an Infrastructure as Code & GitOps visual engine with a Next.js graph renderer and React Flow pipelines, decomposing Go AST parsing into independent microservices to reduce plan review times by 70%.",
      skills: ["AWS CloudOps", "Terraform", "Docker", "TFViz", "React Flow", "Microservices", "Next.js"],
    },
    {
      id: "04",
      phaseNumber: "PHASE 04",
      title: "The AI Frontier (Active Building & Exploration)",
      tagline: "AWS Certified AI Practitioner & Prompt-A-Thon 2nd",
      timeframe: "2026 — Present",
      description:
        "Actively taking my first dedicated steps into the generative AI and intelligent agent ecosystem. Certified as an AWS AI Practitioner and secured 2nd place in the AI Prompt-A-Thon 2026. Currently exploring prompt orchestration, AI workflows (n8n), and integrating AI microservices with full-stack platforms from first principles.",
      skills: ["AWS AI Practitioner", "AI Prompt-A-Thon 2nd", "Agent Workflows", "Prompting", "Python", "Full Stack AI Integration"],
    },
  ],
  stats: [
    { value: "3x", label: "AWS CERTIFIED" },
    { value: "200+", label: "LEETCODE SOLVED" },
    { value: "5,000", label: "VUs LOAD TESTED" },
    { value: "Top 2", label: "AI PROMPT-A-THON" },
  ],
};

export const CONTACT_DATA = {
  socials: [
    { name: "GitHub", url: "https://github.com/AyushSriva2598" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ayushsrivastava2598/" },
    { name: "Twitter / X", url: "https://x.com" },
    { name: "Email", url: "mailto:ayushsrivastava2598@gmail.com" },
  ],
  footerText: "Designed & Engineered by Ayush Srivastava • Inspired by Spider-Man",
};

