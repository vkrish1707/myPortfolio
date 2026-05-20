export const profile = {
  name: 'Vamsi Krishna Mylavarapu',
  shortName: 'Vamsi Krishna',
  title: 'Senior Full Stack Developer',
  tagline: 'I build AI-native platforms where humans and agents work as one.',
  location: 'Toronto, ON',
  email: 'mylavarapuvamsikrishna2012@gmail.com',
  phone: '647-897-1707',
  linkedin: 'https://linkedin.com/in/vamsi-krishna-mylavarapu',
  portfolio: 'https://vkrish-portfolio.netlify.app',
  yearsOfExperience: 10,
  summary:
    "Senior Full Stack Developer with 10+ years shipping production web platforms. Currently leading end-to-end design and delivery of an AI-powered internal platform at AMD, with heavy AI utilization across the SDLC — Cursor-led AI-native development, multi-LLM routing across GPT-5, Claude Opus, and Sonnet, and custom MCP servers exposing JIRA, MongoDB, and file systems as agent-callable tools.",
};

export const skillGroups = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Java', 'HTML5', 'CSS3', 'Solidity'],
  },
  {
    label: 'Front-End',
    items: ['Next.js', 'React', 'TypeScript', 'Redux', 'AG Grid', 'Chart.js', 'Angular', 'RxJS', 'Tailwind', 'WCAG 2.0', 'AODA', 'WAI-ARIA'],
  },
  {
    label: 'Back-End',
    items: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'Django', 'Django REST', 'Flask', 'Spring Boot', 'Spring Security'],
  },
  {
    label: 'AI / Agentic',
    items: ['OpenAI GPT-5', 'Claude Opus & Sonnet', 'MCP Servers', 'Cursor', 'Multi-LLM Routing', 'Prompt Engineering', 'RAG', 'Embeddings', 'Tool/Function Calling', 'LangChain'],
  },
  {
    label: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Oracle', 'Redis', 'DynamoDB', 'Cassandra'],
  },
  {
    label: 'Cloud / DevOps',
    items: ['Azure', 'AWS (Lambda, ECS, API GW, RDS, S3, CDK)', 'GCP', 'Docker', 'Kubernetes', 'PM2', 'Nx Monorepo', 'GitHub Actions', 'Jenkins'],
  },
  {
    label: 'Messaging',
    items: ['Kafka', 'RabbitMQ', 'Socket.IO', 'WebRTC', 'WebSockets'],
  },
  {
    label: 'Auth / Security',
    items: ['Okta SSO', 'Azure AD', 'OAuth2.0', 'OIDC', 'JWT', 'Auth0', 'Keycloak', 'RBAC', 'SSL/TLS'],
  },
];

export const experience = [
  {
    id: 'amd',
    company: 'AMD',
    role: 'Senior Full Stack Developer / Technical Program Manager',
    location: 'Toronto, Canada',
    duration: 'Jun 2024 — Present',
    period: { start: 2024, end: null },
    tags: ['Next.js', 'TypeScript', 'NestJS', 'MongoDB', 'AI / MCP', 'Azure', 'Okta'],
    headline: 'Leading an AI-powered program management platform for the GFX organization.',
    highlights: [
      "Owned architecture and full-stack delivery of AMD's internal AI-powered GFX program management platform. Shipped 100+ REST endpoints, 30+ data models, and 15+ pages in under 10 months — 300+ active users in the first two months.",
      "Integrated AMD's internal AI as a context-aware PMO assistant that reads the user's current page, role, project, and version, then routes each operation through a templated prompt layer. Powers a natural-language dashboard builder that generates widgets on the fly.",
      'Wrote custom MCP (Model Context Protocol) servers exposing JIRA, MongoDB, and file-system operations as governed, agent-callable tools. Any internal AI agent can act on platform data without bespoke integration.',
      'Ran an AI-native workflow centered on Cursor with multi-LLM routing across GPT-5, Claude Opus, and Sonnet — picked per task by cost and reasoning depth. 25+ AI-generated test suites and the bulk of internal docs.',
      'Engineered end-to-end traceability from JAMA requirements through architecture down to JIRA dev tickets, with automated field-level change detection, daily diff alerts to owners, and duplicate-mapping validation.',
      'Built one-click staging plan generation across Dev and Verification tracks — thousands of structured JIRA tickets per GFX generation with rule-based auto-assignment, bulk edit, lock/unlock versioning, CSV/Excel export.',
      'Hardened access with Okta SSO + Azure AD group sync, three-tier RBAC, and full session audit trails.',
      'Earlier on the team: built the Status Execution Dashboard (heat maps, AG Grid pivot tables, AG Charts) and the HR Scoping Tool — cut manual processing 40%, reduced versioning issues 30%.',
    ],
  },
  {
    id: 'capgemini-rbc',
    company: 'Capgemini (RBC)',
    role: 'Full Stack Lead Developer',
    location: 'Toronto, Canada',
    duration: 'Nov 2022 — Jun 2024',
    period: { start: 2022, end: 2024 },
    tags: ['Node.js', 'TypeScript', 'Angular 12+', 'AWS Lambda', 'Kafka', 'Java/Spring Boot'],
    headline: 'Architected the transaction microservices behind a regulated banking workflow.',
    highlights: [
      'Architected microservices on AWS Lambda + API Gateway. Boosted throughput 40%, sub-second response, ~40% cost reduction versus always-on services.',
      'Built secure Node.js + TypeScript APIs with Kafka for async messaging and MongoDB for storage. Node.js Cluster API pushed throughput +70% on hot paths.',
      'Led the front-end revamp in Angular 12+ with RxJS, full WCAG 2.0 + AODA compliance (WAI-ARIA roles, JAWS-tested) — unblocked enterprise rollout.',
      'Developed Java microservices in Spring Boot with Spring Security and JPA over Oracle. Flyway migrations; business logic in PL/SQL where it kept the data layer clean.',
      'Owned GitHub Actions CI/CD with Dockerized AWS ECS deploys (50% faster). Led a 5-person offshore team with code reviews and architecture standards.',
    ],
  },
  {
    id: 'wipro-citi',
    company: 'Wipro (Citibank)',
    role: 'Tech Lead / Full Stack Developer',
    location: 'Toronto, Canada',
    duration: 'Jun 2021 — Nov 2022',
    period: { start: 2021, end: 2022 },
    tags: ['React', 'Django', 'Spring Boot', 'Solidity', 'AWS DynamoDB', 'Keycloak/Okta'],
    headline: 'Drove TDD and architecture consistency across an analytics platform; built an NFT marketplace.',
    highlights: [
      'Drove TDD, code reviews, and architecture consistency across the analytics platform — lifted coverage, cut regression escapes into production.',
      'Engineered Django + Flask back-ends serving 100,000 DAU with caching + query optimization. p95 < 300 ms at peak.',
      'Built Spring Boot APIs with SLF4J/Logback and Spring Actuator — clean signals for SRE alerting and RCA.',
      'Developed an NFT marketplace with ERC-721 and ERC-1155 (Solidity, Web3.js, ethers.js) supporting minting, listing, and multi-wallet trading.',
      'Designed high-availability storage on DynamoDB + RDS with read-replica routing for analytical workloads.',
      'Implemented auth with Spring Security + OAuth2 / SSO via Keycloak and Okta — role-based access across multi-tenant deployments.',
    ],
  },
  {
    id: 'hexaware',
    company: 'Hexaware Technologies',
    role: 'Senior Software Engineer',
    location: 'India',
    duration: 'Feb 2019 — Jun 2021',
    period: { start: 2019, end: 2021 },
    tags: ['Kafka', 'Node.js', 'Spring Boot', 'AWS CDK', 'Django', 'Angular 12'],
    headline: 'Built a Kafka pipeline pushing 100k+ events/sec for logistics tracking.',
    highlights: [
      'Implemented a Kafka-powered event streaming system processing 100,000+ events/sec for the logistics tracking platform, with idempotent consumers and replay for recovery.',
      'Defined cloud infra in AWS CDK with TypeScript (Lambda, API Gateway, VPCs, IAM) — moved the team off click-ops onto reviewable IaC.',
      'Drove event-driven architecture (Kafka) for billing, order management, and transaction logs — decoupled producers from consumers.',
      'Designed enterprise SSO for multi-tenant Django apps with seamless UX handoff across product boundaries — eliminated duplicate logins.',
      'Built RBAC with Django Admin for GDPR-compliant data handling. Liquibase + Flyway for versioned, zero-downtime schema migrations on Oracle.',
    ],
  },
  {
    id: 'vzen',
    company: 'Vzen Innovation',
    role: 'Software Engineer',
    location: 'India',
    duration: 'Jan 2018 — Feb 2019',
    period: { start: 2018, end: 2019 },
    tags: ['WebRTC', 'AWS Kinesis', 'Django Channels', 'WebSockets', 'React'],
    headline: 'Built peer-to-peer video streaming for live classroom and identity verification flows.',
    highlights: [
      'Architected peer-to-peer video streaming on WebRTC for low-latency live classroom and group-discussion flows — concurrent multi-party sessions with minimal server mediation.',
      'Integrated WebRTC with AWS Kinesis to power real-time video pipelines for digital identity verification in financial-services applications.',
      'Built real-time analytics dashboards on Django Channels + WebSockets — streamed live business metrics without polling overhead.',
      'Customized Django Admin into a secure operator console with RBAC and audit logging.',
      'Integrated Stripe and PayPal via Django webhook listeners with idempotent payment-event handling — eliminated manual reconciliation work.',
    ],
  },
  {
    id: 'accenture',
    company: 'Accenture',
    role: 'Software Engineer',
    location: 'India',
    duration: 'Jun 2016 — Sep 2017',
    period: { start: 2016, end: 2017 },
    tags: ['React', 'Django', 'Spring MVC', 'Java', 'IVR'],
    headline: 'Delivered customer-facing dashboards and IVR-integrated Spring services.',
    highlights: [
      'Delivered responsive customer-facing dashboards in React with Django back-ends — translated complex workflows into accessible UX.',
      'Built and maintained Java + Spring MVC services for an IVR-based enterprise project — back-end logic, multi-threading, downstream integration.',
      'Partnered with QA and product in Agile two-week sprints with consistent on-time releases.',
      'Wrote unit + integration tests with JUnit; contributed to shared CI that reduced regression cycle time.',
    ],
  },
];

export const projects = [
  {
    id: 'daaks',
    name: 'DAAKS',
    fullName: 'Developer Autonomous Agent Keeping System',
    status: 'Personal R&D · 2025 — present',
    blurb:
      "Developer-orchestration platform for autonomous coding agents. Builds, monitors, and steers agents like Claude Code and Cursor as first-class infrastructure — not browser tabs.",
    description:
      "An orchestration layer that treats autonomous coding agents as managed workers — spawning, observing, queueing, and steering them like a job runner. Built on Next.js + NestJS in an Nx monorepo. Provisional patent in progress.",
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Nx Monorepo', 'MCP', 'WebSockets'],
    accent: 'violet',
    image: '/projects/daaks.png',
    highlights: [
      'Patent-pending orchestration model',
      'Multi-agent task routing',
      'Live agent telemetry & intervention',
    ],
  },
  {
    id: 'mcp-tradeview',
    name: 'MCP TradeView Server',
    fullName: 'TradingView × Model Context Protocol',
    status: 'Self-built · OSS',
    blurb:
      "Custom MCP server exposing TradingView market data and charting primitives as tools an LLM agent can call directly. Live quotes, technical analysis, trade narratives — in one conversation.",
    description:
      "A typed MCP server (built on the MCP SDK) that lets Claude or GPT agents fetch live quotes, run technical-analysis prompts, and generate trade narratives in a single conversation. Bridges the LLM-tools gap for finance workflows.",
    stack: ['TypeScript', 'MCP SDK', 'Claude / GPT', 'TradingView API'],
    accent: 'cyan',
    image: '/projects/mcp-tradeview.png',
    highlights: [
      'Live market data as agent tools',
      'Technical analysis prompting',
      'Single-turn trade narratives',
    ],
  },
  {
    id: 'ai-agents',
    name: 'AI Productivity Agents',
    fullName: 'Freelance + Personal Use',
    status: 'Ongoing · Freelance',
    blurb:
      "Custom Python + TypeScript agents for small-business clients and daily productivity. Lead extraction, content generation, ticket triage, personal assistants — with tool orchestration, function calling, and RAG over local docs.",
    description:
      "A growing library of focused agents I deploy for clients and for myself. Multi-tool orchestration, function calling, RAG over local document stores, and multi-LLM routing depending on cost and reasoning depth.",
    stack: ['Python', 'TypeScript', 'Claude', 'OpenAI', 'RAG', 'LangChain'],
    accent: 'rose',
    image: '/projects/ai-agents.png',
    highlights: [
      'Lead extraction at scale',
      'Content + ticket triage workflows',
      'RAG over private documents',
    ],
  },
];

export const education = {
  degree: 'B.Tech, Electronics and Instrumentation Engineering',
  school: 'GITAM School of Technology, India',
  note: 'WES-evaluated as Bachelor\'s',
};

export const certifications = [
  'Microsoft HTML5 Application Development Fundamentals (2021)',
];
