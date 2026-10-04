export const PORTFOLIO_DATA = {
  name: "Ayush Srivastava",
  firstName: "Ayush",
  phonetic: "/a · yush/",
  profileImages: ["/profile1.jpg", "/profile4.png"],
  bannerImage: "/images/mac-spoilers-steve-jobs-norman-seeff-01.jpg",
  location: "Ghaziabad, India",
  timezone: "Asia/Kolkata",
  email: "ayushsriva2598@gmail.com",
  phone: "(+91)-8004662598",
  resumeUrl: "/resume.pdf",

  roles: [
    "Systems & Backend Engineer",
    "Cloud & DevOps Architect",
    "Distributed Systems Builder",
    "B.Tech IT Undergrad @ KIET",
  ],

  about: [
    "B.Tech Information Technology undergraduate at KIET Group of Institutions (CGPA: 8.15) specializing in high-performance distributed systems, low-latency API architectures, and scalable cloud infrastructure.",
    "Hands-on experience architecting broker-less job queues with PostgreSQL SELECT FOR UPDATE SKIP LOCKED, atomic Redis Lua rate limiters sustaining 5,000 VUs in k6, and Go AST cloud topology parsers in TFViz.",
    "3x AWS Certified (CloudOps Associate, AI Practitioner, Cloud Practitioner), 200+ problems solved on LeetCode with solid foundations in algorithms, operating systems, and computer networks.",
  ],

  socials: {
    github: "https://github.com/AyushSriva2598",
    linkedin: "https://linkedin.com/in/ayush-srivastava2598",
    leetcode: "https://leetcode.com/u/Ayush____Srivastava/",
    email: "mailto:ayushsriva2598@gmail.com",
    phone: "tel:+918004662598",
    repo: "https://github.com/AyushSriva2598/Portfolio",
  },

  education: [
    {
      institution: "KIET Group of Institutions",
      degree: "Bachelor of Technology — Information Technology",
      score: "CGPA: 8.15",
      period: "2024 – Present",
      location: "Ghaziabad, UP",
    },
    {
      institution: "Little Flower School",
      degree: "ISC — XII (Computer Science)",
      score: "Percentage: 93.6%",
      period: "2022 – 2023",
      location: "Gorakhpur, UP",
    },
  ],

  certifications: [
    {
      title: "AWS Certified CloudOps Engineer — Associate",
      issuer: "Amazon Web Services",
      url: "https://www.credly.com/badges/975d8173-73c5-40ce-9d4d-7f3a2c9f008b/public_url",
      icon: "logos:aws",
    },
    {
      title: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services",
      url: "https://www.credly.com/badges/287f3ddf-253a-4fb1-bc81-0dfc19a44550/public_url",
      icon: "logos:aws",
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      url: "https://www.credly.com/badges/8d4f6995-8346-4291-895e-6357ed3f5ec2/public_url",
      icon: "logos:aws",
    },
    {
      title: "200+ Problems Solved on LeetCode",
      issuer: "LeetCode",
      url: "https://leetcode.com/u/Ayush____Srivastava/",
      icon: "simple-icons:leetcode",
    },
    {
      title: "Second Position — AI Prompt-A-Thon 2026",
      issuer: "TRYNOCODE Technology Pvt. Ltd.",
      url: "https://github.com/AyushSriva2598",
      icon: "lucide:award",
    },
  ],

  experience: [
    {
      company: "KIET Group of Institutions & Open Source",
      role: "B.Tech IT Undergrad & Systems Builder",
      period: "2024 – Present",
      blurb:
        "Pursuing B.Tech in Information Technology (CGPA: 8.15) while engineering distributed systems, low-latency API gateways, and cloud infrastructure.",
      url: "https://github.com/AyushSriva2598",
      phases: [
        {
          label: "Phase 1: Academic & Algorithmic Foundations (2022 – 2024)",
          description:
            "Completed ISC XII at Little Flower School (93.6%); enrolled in B.Tech IT at KIET Group of Institutions (CGPA: 8.15); solved 200+ algorithmic problems on LeetCode covering graph algorithms, dynamic programming, and concurrency.",
        },
        {
          label: "Phase 2: High-Performance Backend & Distributed Patterns (2025)",
          description:
            "Architected DAG Workflow Engine and broker-less job queue on PostgreSQL using SELECT FOR UPDATE SKIP LOCKED with race-safe idempotency and Redis Lua token bucket rate limiting with cycle detection.",
        },
        {
          label: "Phase 3: AWS Certifications & Infrastructure Engineering (2025 – 2026)",
          description:
            "Earned 3 AWS credentials: AWS Certified Cloud Practitioner, AWS Certified AI Practitioner, and AWS Certified CloudOps Engineer Associate; containerized services with Docker and configured telemetry with Prometheus & Grafana.",
        },
        {
          label: "Phase 4: TFViz & Distributed API Gateway (2025 – Present)",
          description:
            "Built TFViz cloud topology engine with Go AST parser microservices and React Flow visual diffs; engineered distributed API Gateway load-tested to 5,000 VUs in k6 with sub-15ms p95 latency.",
        },
      ],
      stats: [
        { value: "8.15", label: "KIET CGPA" },
        { value: "3x", label: "AWS Certified" },
        { value: "200+", label: "LeetCode Solved" },
        { value: "3", label: "Core Systems" },
      ],
    },
  ],

  projects: [
    {
      title: "TFViz",
      subtitle: "Infrastructure as Code & GitOps Engine",
      blurb:
        "Separated a Go AST parser from a Django/Neon backend into independent microservices, lowering sync latency to under 200ms and cutting review time by 70%. Built an interactive React Flow GitOps engine reducing blast-radius errors by 40%.",
      story:
        "Engineered to solve the challenge of invisible blast radius in cloud deployments.\nSeparated a Go AST parser from a Django/Neon backend into microservices, cutting review latency to under 200ms.\nBuilt a Next.js graph engine to map complex cloud topologies in under 5 milliseconds.\nImplemented an interactive React Flow GitOps pipeline rendering pre-deployment visual diffs from raw execution plans, reducing infrastructure misconfigurations and blast-radius errors by 40% across testing suites.",
      stack: ["Python", "DRF", "React", "Go", "PostgreSQL", "Docker", "React Flow", "AWS"],
      year: "2025 – Present",
      links: {
        live: "https://github.com/AyushSriva2598/TFViz",
        source: "https://github.com/AyushSriva2598/TFViz",
      },
      featured: true,
      image: "/projects/1.gif",
      categories: ["Backend", "DevOps", "Fullstack"],
    },
    {
      title: "API Gateway",
      subtitle: "Distributed Rate Limiter & Reverse Proxy",
      blurb:
        "Engineered a distributed API gateway in Django REST Framework + Redis 7, enforcing multi-tenant SLAs via atomic Lua scripts with sub-1.2ms decisions and Nginx keepalive socket pooling for 5,000 VUs in k6.",
      story:
        "Built to withstand brutal traffic spikes without dropping packets or violating SLA quotas.\nEnforced multi-tenant SLAs via atomic Lua scripts (Token Bucket, Sliding Window Log, Fixed Window) — sub-1.2ms decisions, 0 race conditions across 3 horizontally-scaled replicas under full concurrent load.\nLoad-tested to 5,000 VUs in k6; fixed a 51.6% timeout bottleneck via Nginx keepalive pooling and Linux socket tuning (1,024 -> 65,535), sustaining sub-15ms p95 latency with exact rate-limit enforcement.\nContainerized with Docker and horizontally scaled behind Nginx across stateless instances sharing Redis and PostgreSQL, with Prometheus/Grafana for real-time observability.",
      stack: ["Django", "DRF", "Redis", "PostgreSQL", "Docker", "Nginx", "Prometheus", "Grafana", "k6"],
      year: "2026",
      links: {
        live: "https://github.com/AyushSriva2598/ApiGateway",
        source: "https://github.com/AyushSriva2598/ApiGateway",
      },
      featured: true,
      image: "/projects/3.gif",
      categories: ["Backend", "DevOps"],
    },
    {
      title: "DAG Workflow Engine — Broker-less Job Queue",
      subtitle: "Transactional Concurrency Orchestrator",
      blurb:
        "Built a broker-less job queue on PostgreSQL using SELECT FOR UPDATE SKIP LOCKED with race-safe idempotency, Redis Lua rate limiting, exponential backoff, dead-letter queues, and DAG cycle detection.",
      story:
        "Eliminated the overhead of external message brokers (RabbitMQ/Kafka) for transactional workloads.\nBuilt a broker-less job queue on PostgreSQL using SELECT FOR UPDATE SKIP LOCKED with race-safe idempotency, letting concurrent workers claim jobs with zero double-processing or duplicate job creation.\nImplemented a Redis token bucket rate limiter with atomic Lua scripting, exponential backoff, a dead-letter queue, graceful shutdown, and a stuck-job reaper recovering orphaned jobs with zero data loss.\nExtended the queue into a DAG-based Workflow Orchestration Engine -- reusing SKIP LOCKED for concurrent dispatch, with cycle detection and signal-based decoupling that auto-unlocks dependent steps on completion.",
      stack: ["Django", "DRF", "PostgreSQL", "Redis", "Docker", "Python"],
      year: "2026",
      links: {
        live: "https://github.com/AyushSriva2598/EmailQueue",
        source: "https://github.com/AyushSriva2598/EmailQueue",
      },
      featured: true,
      image: "/projects/1.gif",
      categories: ["Backend"],
    },
  ],

  // Exact technical skills from resume with official Iconify icons
  skillsList: [
    // Languages
    { name: "Python", icon: "logos:python", category: "Languages" },
    { name: "Java", icon: "logos:java", category: "Languages" },
    { name: "JavaScript", icon: "logos:javascript", category: "Languages" },
    { name: "TypeScript", icon: "logos:typescript-icon", category: "Languages" },
    { name: "SQL", icon: "vscode-icons:file-type-sql", category: "Languages" },
    { name: "HTML/CSS", icon: "logos:html-5", category: "Languages" },

    // Frameworks & Libraries
    { name: "Django", icon: "logos:django-icon", category: "Frameworks" },
    { name: "Django REST Framework", icon: "simple-icons:django", category: "Frameworks" },
    { name: "FastAPI", icon: "logos:fastapi", category: "Frameworks" },
    { name: "React", icon: "logos:react", category: "Frameworks" },
    { name: "Celery", icon: "simple-icons:celery", category: "Frameworks" },

    // Databases
    { name: "PostgreSQL", icon: "logos:postgresql", category: "Databases" },
    { name: "Redis", icon: "logos:redis", category: "Databases" },
    { name: "MongoDB", icon: "logos:mongodb-icon", category: "Databases" },

    // Cloud & DevOps
    { name: "AWS", icon: "logos:aws", category: "Cloud & DevOps" },
    { name: "Docker", icon: "logos:docker-icon", category: "Cloud & DevOps" },
    { name: "Terraform", icon: "logos:terraform-icon", category: "Cloud & DevOps" },
    { name: "Nginx", icon: "logos:nginx", category: "Cloud & DevOps" },
    { name: "Prometheus", icon: "logos:prometheus", category: "Cloud & DevOps" },
    { name: "Grafana", icon: "logos:grafana", category: "Cloud & DevOps" },
    { name: "k6", icon: "simple-icons:k6", category: "Cloud & DevOps" },
    { name: "Linux", icon: "logos:linux-tux", category: "Cloud & DevOps" },

    // Tools
    { name: "Git", icon: "logos:git-icon", category: "Tools" },
    { name: "GitHub", icon: "simple-icons:github", category: "Tools" },
    { name: "Postman", icon: "logos:postman-icon", category: "Tools" },
    { name: "Vercel", icon: "logos:vercel-icon", category: "Tools" },
  ],

  github: {
    username: "AyushSriva2598",
  },

  tracks: [
    {
      title: "La Campanella ( 1826 )",
      artist: "Niccolò Paganini",
      videoId: "6ruHDWSNvB8",
    },
    {
      title: "Alla Turca (Sonata No. 11)",
      artist: "Mozart · Tzvi Erez",
      videoId: "SQh1zztmpEk",
    },
    {
      title: "Passacaglia",
      artist: "Handel / Halvorsen",
      videoId: "ApCL2GomTD4",
    },
  ],
};
