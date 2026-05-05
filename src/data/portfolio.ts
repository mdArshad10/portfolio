export const personalInfo = {
  name: "Md. Arshad",
  tagline: "Full-stack developer who ships clean, user-focused web apps.",
  subtitle:
    "Full Stack Developer with 1+ years of hands-on experience building and deploying web applications end-to-end. From designing responsive interfaces to building RESTful APIs and managing databases — I take features from idea to production.",
  email: "arshadwebdeveloper10@gmail.com",
  location: "Kolkata, West Bengal, India",
  github: "https://github.com/mdArshad10",
  linkedin: "https://www.linkedin.com/in/md-arshad-developer/",
  availability:
    "Available for full-time roles and freelance projects. Looking to join a product team where I can deepen my craft and take on growing responsibility.",
};

export const skills = {
  "Core Languages": ["TypeScript", "JavaScript"],
  "Frontend": ["React.js", "React Native", "Expo"],
  "Backend": ["Node.js", "Express.js", "Nest.js"],
  "Styling & UI": ["Tailwind CSS", "Shadcn UI"],
  "Database & ORM": ["MongoDB", "PostgreSQL", "Mongoose", "Drizzle ORM"],
  "Tooling & DevOps": ["Vite", "Turborepo", "Docker", "Git"],
  "Environment": ["VS Code"],
};

export const projects = [
  {
    id: "devflow",
    title: "DevFlow",
    shortDesc: "Developer task manager with GitHub sync",
    description:
      "DevFlow emerged from a personal frustration: context switching. Managing tasks in one tool while actual work happened in GitHub led to fragmented workflows. DevFlow acts as a unified layer, bi-directionally syncing issues, pull requests, and custom to-do lists into a single, developer-centric interface. Built with a focus on speed and keyboard navigation, it minimizes the friction between planning and execution.",
    year: "2024",
    role: "Solo developer",
    tags: ["Full-Stack", "React", "Node.js"],
    featured: true,
    links: {
      github: "https://github.com",
      live: null,
    },
    problem:
      "Existing task managers are general-purpose. They treat software development tasks the same as marketing tasks. Developers end up constantly mapping Jira or Trello concepts back to actual code states, losing hours a week to purely administrative updates.",
    solution:
      "A highly opinionated, keyboard-first task manager that deeply integrates with GitHub's API. State changes in DevFlow reflect instantly in GitHub, and vice-versa. The interface drops the clutter, focusing purely on what needs to be built next.",
    features: [
      {
        title: "Bi-directional GitHub Sync",
        desc: "Issues, PR status, and comments sync in real-time. Close a task in DevFlow, watch the issue close on GitHub.",
      },
      {
        title: "Keyboard-First Navigation",
        desc: "A powerful command palette (Cmd+K) allows you to create tasks, assign labels, and move items without touching the mouse.",
      },
      {
        title: "Local-First Architecture",
        desc: "Built with IndexedDB for instant UI updates. Syncs to the cloud asynchronously. Works flawlessly offline.",
      },
      {
        title: "Custom Triage Rules",
        desc: "Set up rules to automatically categorize incoming GitHub issues based on labels, authors, or repository.",
      },
    ],
    stack: {
      Frontend: ["React", "TypeScript", "Vite", "Radix UI"],
      Backend: ["Node.js", "Express", "PostgreSQL", "Redis"],
      "DevOps / API": ["GitHub API", "Docker", "Railway", "Vercel"],
    },
  },
  {
    id: "nexus-financial",
    title: "Nexus Financial Analytics",
    shortDesc:
      "A high-performance trading dashboard processing real-time WebSockets data.",
    description:
      "A high-performance trading dashboard processing real-time WebSockets data. Built with a focus on rendering optimization and zero-latency UI updates.",
    year: "2023",
    role: "Lead Engineer",
    tags: ["Data Viz", "React", "WebSockets"],
    featured: true,
    links: {
      github: "https://github.com",
      live: null,
    },
    problem:
      "Trading interfaces are notorious for being bloated with data, leading to decision fatigue and slow response times in critical market moments.",
    solution:
      "A precision-engineered dashboard with virtualized rendering, canvas-based charts, and a WebSocket pipeline that handles thousands of updates per second without frame drops.",
    features: [
      {
        title: "Zero-Latency Updates",
        desc: "WebSocket pipeline processes thousands of price updates per second through a specialized render queue.",
      },
      {
        title: "Virtualized Data Tables",
        desc: "Handles 100k+ rows with pixel-perfect scrolling performance using windowing techniques.",
      },
      {
        title: "Canvas Chart Engine",
        desc: "Custom-built charting library on HTML Canvas for buttery smooth 60fps animations.",
      },
      {
        title: "Risk Overlay System",
        desc: "Real-time portfolio risk calculations overlaid directly on price charts.",
      },
    ],
    stack: {
      Frontend: ["React", "TypeScript", "Canvas API", "WebSockets"],
      Backend: ["Node.js", "Rust (Axum)", "TimescaleDB"],
      "DevOps / API": ["AWS", "CDN", "Market Data APIs"],
    },
  },
  {
    id: "aura-design-system",
    title: "Aura Design System",
    shortDesc:
      "An enterprise-grade component library standardizing UI across 12 distinct product lines.",
    description:
      "An enterprise-grade component library standardizing UI across 12 distinct product lines. Features advanced themeable tokens and strict accessibility compliance.",
    year: "2023",
    role: "Design Engineer",
    tags: ["Design System", "Figma", "Accessibility"],
    featured: false,
    links: {
      github: null,
      live: "https://example.com",
    },
    problem:
      "A large enterprise with 12 product teams was shipping inconsistent UIs, causing poor user trust and massive redundant engineering effort.",
    solution:
      "A single source of truth design system: a Figma library synced with a React component library, powered by design tokens and built with WCAG 2.1 AA compliance from the ground up.",
    features: [
      {
        title: "Design Token Pipeline",
        desc: "Tokens defined in Figma are automatically transformed into CSS variables, JS constants, and Tailwind config via Style Dictionary.",
      },
      {
        title: "330+ Components",
        desc: "A comprehensive set of primitives, composites, and page-level templates for every product scenario.",
      },
      {
        title: "WCAG 2.1 AA",
        desc: "Every component passes automated a11y testing and has been audited by manual screen reader testing.",
      },
      {
        title: "Theme Studio",
        desc: "An internal tool that lets product teams create and preview custom themes within the design system boundaries.",
      },
    ],
    stack: {
      Frontend: ["React", "TypeScript", "Storybook", "Radix UI"],
      Tooling: ["Style Dictionary", "Figma Tokens", "Chromatic"],
      "DevOps / API": ["NPM Registry", "Changesets", "Renovate"],
    },
  },
];

export const relatedProjects = [
  {
    id: "nexus-architecture",
    title: "Nexus Architecture",
    year: "2023",
    desc: "A high-performance design system for enterprise applications focusing on micro-interactions.",
    tags: ["Design System", "Figma"],
  },
  {
    id: "cloudmetric",
    title: "CloudMetric",
    year: "2023",
    desc: "Real-time infrastructure monitoring dashboard with predictive anomaly detection.",
    tags: ["Data Viz", "Vue / D3.js"],
  },
];
