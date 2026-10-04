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
    "Distributed Systems Builder",
    "Cloud & DevOps Architect",
    "Open Source Contributor",
  ],

  about: [
    "I build polished, high-performance distributed systems, high-throughput API gateways, and scalable cloud infrastructure combining backend rigor with modern architecture to ship things that actually matter.",
    "Currently deep in the intersection of distributed rate limiting, broker-less job queues (PostgreSQL SKIP LOCKED), Go AST cloud parsers, and Kubernetes/Docker cloud infrastructure.",
    "3x AWS Certified (CloudOps Associate, AI Practitioner, Cloud Practitioner), 200+ problems solved on LeetCode, and open to collaborating on ambitious engineering projects.",
  ],

  socials: {
    github: "https://github.com/AyushSriva2598",
    linkedin: "https://linkedin.com/in/ayush-srivastava2598",
    leetcode: "https://leetcode.com/u/Ayush____Srivastava/",
    email: "mailto:ayushsriva2598@gmail.com",
    phone: "tel:+918004662598",
    repo: "https://github.com/AyushSriva2598/Portfolio",
  },

  experience: [
    {
      company: "KIET Group of Institutions & Open Source",
      role: "Systems & Backend Software Engineer",
      period: "2024 – Present",
      blurb:
        "A continuous journey of architecting high-throughput backend infrastructure, building distributed systems from scratch, and optimizing system-level throughput.",
      url: "https://github.com/AyushSriva2598",
      phases: [
        {
          label: "Phase 1: Core Systems & Algorithms (Locking In)",
          description:
            "Solved 200+ algorithmic problems on LeetCode with strong focus on graphs, dynamic programming, and concurrency; deeply studied computer networks, operating system concurrency, and relational database internals.",
        },
        {
          label: "Phase 2: High-Performance Backend & Distributed Patterns",
          description:
            "Engineered production-grade backends in Django REST Framework and FastAPI; implemented distributed token-bucket rate limiters with atomic Redis Lua scripts and broker-less job queues via PostgreSQL SELECT FOR UPDATE SKIP LOCKED.",
        },
        {
          label: "Phase 3: Cloud Infrastructure & DevOps Hardening",
          description:
            "Earned 3 AWS Certifications (Cloud Practitioner, AI Practitioner, CloudOps Associate); containerized multi-tenant services with Docker, scaled stateless replicas behind Nginx load balancers, and configured Prometheus/Grafana real-time metrics.",
        },
        {
          label: "Phase 4: Shipping Production Platforms & GitOps",
          description:
            "Architected TFViz (AST-parsed infrastructure visualization & GitOps visual diff engine) and distributed API Gateway sustaining 5,000 VUs under sub-15ms p95 latency.",
        },
      ],
      stats: [
        { value: "5+", label: "Projects Shipped" },
        { value: "4", label: "Journey Phases" },
        { value: "Backend+Cloud", label: "Stack Focus" },
        { value: "500+", label: "GitHub Commits" },
      ],
    },
  ],

  projects: [
    {
      title: "TFViz",
      blurb:
        "Infrastructure as Code & GitOps Engine mapping complex cloud topologies with Go AST parser microservices and interactive React Flow pre-deployment visual diffs, cutting review time by 70% and blast-radius errors by 40%.",
      story:
        "Engineered to solve the challenge of invisible blast radius in cloud deployments.\nSeparated a Go AST parser from a Django/Neon backend into microservices, cutting review latency to under 200ms.\nImplemented an interactive Next.js + React Flow GitOps pipeline rendering pre-deployment visual diffs from raw execution plans, preventing configuration drift.",
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
      blurb:
        "Distributed API Gateway in DRF + Redis 7 enforcing multi-tenant SLAs via atomic Lua scripts (Token Bucket, Sliding Window Log) with sub-1.2ms decisions and Nginx keepalive socket pooling for 5,000 VUs in k6.",
      story:
        "Built to withstand brutal traffic spikes without dropping packets or violating SLA quotas.\nFixed a 51.6% timeout bottleneck via Nginx keepalive pooling and Linux socket tuning (1,024 -> 65,535), sustaining sub-15ms p95 latency under full load.\nHorizontally scaled stateless instances sharing Redis and PostgreSQL, monitored with Prometheus & Grafana dashboards.",
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
      title: "DAG Workflow Engine",
      blurb:
        "Broker-less Job Queue & DAG Workflow Engine on PostgreSQL using SELECT FOR UPDATE SKIP LOCKED with race-safe idempotency, Redis Lua rate limiting, exponential backoff, dead-letter queues, and cycle detection.",
      story:
        "Eliminated the overhead of external message brokers (RabbitMQ/Kafka) for transactional workloads.\nEmployed SKIP LOCKED for concurrent worker dispatch with zero double-processing.\nExtended into a DAG workflow orchestration engine with cycle detection and signal-based dependency dispatch that auto-unlocks dependent nodes.",
      stack: ["Django", "DRF", "PostgreSQL", "Redis", "Docker", "Python"],
      year: "2026",
      links: {
        live: "https://github.com/AyushSriva2598/EmailQueue",
        source: "https://github.com/AyushSriva2598/EmailQueue",
      },
      featured: false,
      categories: ["Backend"],
    },
    {
      title: "Payment Gateway Simulator",
      blurb:
        "High-concurrency fintech simulation testing idempotency keys, webhook retries with exponential backoff, and distributed ledger consistency under simulated network partitions.",
      story:
        "Simulates edge-case failure modes in asynchronous financial transactions.\nHandles race conditions in balance deduction, double-spend attempts, and resilient webhook dispatch with retry queues.",
      stack: ["Django", "DRF", "PostgreSQL", "Redis", "Docker"],
      year: "2026",
      links: {
        live: "https://github.com/AyushSriva2598/PaymentGatewaySimulation",
        source: "https://github.com/AyushSriva2598/PaymentGatewaySimulation",
      },
      featured: false,
      categories: ["Backend"],
    },
  ],

  skillCategories: {
    All: [
      "Python", "Java", "JavaScript", "TypeScript", "C/C++", "SQL",
      "Django", "DRF", "FastAPI", "React", "Next.js", "Node.js", "Express.js",
      "PostgreSQL", "Redis", "MongoDB", "Neon Postgres",
      "AWS", "Docker", "Terraform", "Nginx", "Prometheus", "Grafana", "k6", "Linux",
      "Git", "GitHub", "Postman", "Vercel"
    ],
    Languages: ["Python", "Java", "JavaScript", "TypeScript", "C/C++", "SQL", "HTML/CSS"],
    Backend: ["Django", "DRF", "FastAPI", "Celery", "Node.js", "Express.js", "REST APIs", "JWT"],
    "Cloud & DevOps": ["AWS", "Docker", "Terraform", "Nginx", "Prometheus", "Grafana", "k6", "Linux"],
    Databases: ["PostgreSQL", "Redis", "MongoDB", "Neon Postgres", "SQLite"],
    Tools: ["Git", "GitHub", "Postman", "Vercel", "VS Code"],
  },

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
