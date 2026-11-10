// Single source of truth for all site copy. Edit text here without touching components.
// TODO items (also listed in the project report):
// - GitHub repo names for "Stock Market Analysis and Prediction Platform" and "Nurture"
// - Credential URLs for certifications (all url fields are null for now)
// - Real resume PDF at public/assets/Harshad_Agrawal_Resume.pdf (placeholder generated)
// - Confirm whether the phone number should be publicly visible
// - Platform for the handle "harshad_agrawal_2005" (unstated, not shown)
// - og:image card image and final site URL for meta tags

export const identity = {
  name: "Harshad Agrawal",
  pronouns: "he/him",
  initials: "HA",
  location: "Pune, Maharashtra, India",
  email: "harshad.agrawal2005@gmail.com",
  // TODO(owner): confirm public visibility of the phone number before launch
  phone: "+91 7622871384",
  github: "https://github.com/Harshad2321",
  githubHandle: "Harshad2321",
  linkedin: "https://linkedin.com/in/harshad-agrawal-486964322",
  leetcode: "https://leetcode.com/u/harshadagrawal/",
  hackerrank: "https://www.hackerrank.com/profile/harshad_agrawal1",
  // This site is hosted at myself-gules-psi.vercel.app
  resumePdf: "./assets/Harshad_Agrawal_Resume.pdf",
};

export const roles = [
  "AI/ML Engineer",
  "Multi-Agent Systems Builder",
  "Data and Analytics",
  "Backend Developer",
];

export const heroGreeting = "Hi, my name is";
export const heroPitch =
  "Third-year B.Tech (AI and Machine Learning) student at SIT Pune, building multi-agent LLM systems, RAG pipelines and real-time data products. Currently a selected SCAAI research intern in healthcare AI.";

export const aboutParagraphs = [
  "Third-year B.Tech (Artificial Intelligence and Machine Learning) student at Symbiosis Institute of Technology, Pune, with hands-on experience in multi-agent LLM systems, RAG pipelines, model fine-tuning, anomaly detection, exploratory data analysis, data pipelines and dashboards.",
  "I have 6+ months of industry experience building production AI and backend infrastructure (Python/FastAPI, Java/Spring Boot, Kafka, Docker/Kubernetes) on a 17-agent, 15-developer platform, and I am a selected SCAAI Research Intern (healthcare AI) working under faculty mentorship.",
  "My foundation spans statistics, machine learning, deep learning, NLP, data structures and algorithms, operating systems, computer networks, DBMS and system design. I am comfortable with agile SDLC, unit and integration testing, debugging, code review and technical documentation, and with translating between technical and non-technical stakeholders.",
  "I am Power BI certified and Oracle OCI Multicloud Architect Professional certified, and open to AI/ML/Applied AI, Software Engineer (SDE), Associate Engineer, Data Analyst/Data Science and Business Analyst roles.",
];

export const currentlyStatus = {
  label: "Research Intern, Symbiosis Centre for Applied AI (SCAAI), Pune",
  detail:
    "Selected via the SCAAI Research Internship Drive 2026. Healthcare AI under faculty mentor Dr. Rahee Walambe.",
};

// Manually updated "currently building" line for the hero terminal — keep it
// in sync with what is actually being worked on.
export const currentlyBuilding =
  "healthcare-AI data pipeline (EDA · preprocessing · fine-tuning) @ SCAAI research";

export const openToRoles = [
  "AI/ML/Applied AI",
  "Software Engineer (SDE)",
  "Associate Engineer",
  "Data Analyst/Data Science",
  "Business Analyst",
];

export const aboutEducationSummary =
  "B.Tech AI and ML, SIT Pune · Semester 5 · CGPA 7.85/10 · Expected May 2028";

export type QuickStat = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
};

export const quickStats: QuickStat[] = [
  { value: 6, suffix: "+", label: "months of industry experience" },
  { value: 17, label: "agents on the platform I helped build" },
  { value: 15, label: "developers on the shared codebase" },
  { value: 194, label: "tests in the JanSetu AI suite" },
  { value: 6, suffix: "th", label: "place among 96,000+ participants" },
  { value: 35, suffix: "+", label: "certifications and course certificates" },
  { value: 34, label: "GitHub repositories" },
  { value: 7.85, decimals: 2, suffix: "/10", label: "CGPA, B.Tech AI and ML" },
];

export type SkillGroup = { group: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    group: "Generative AI and Agents",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Multi-Agent Systems",
      "LLM APIs (GPT-4, Claude, Gemini)",
      "Model Context Protocol (MCP)",
      "Prompt Engineering",
      "ChromaDB",
      "Agentic AI",
    ],
  },
  {
    group: "Machine Learning and AI",
    items: [
      "PyTorch",
      "Scikit-learn",
      "TensorFlow",
      "XGBoost",
      "Supervised and Unsupervised Learning",
      "Feature Engineering",
      "Model Training",
      "Fine-tuning and Evaluation",
      "Deep Learning",
      "NLP",
      "Anomaly Detection",
      "Forecasting",
    ],
  },
  {
    group: "Data Analysis and Visualization",
    items: [
      "Pandas",
      "NumPy",
      "Power BI",
      "Plotly",
      "Exploratory Data Analysis",
      "Data Preprocessing",
      "Statistics",
      "Real-time Metric Dashboards",
      "Reports and Documentation",
    ],
  },
  {
    group: "Languages",
    items: ["Python", "SQL", "C++", "C", "Java", "TypeScript/JavaScript (familiar)", "OOP"],
  },
  {
    group: "Data Structures and Algorithms",
    items: [
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Hash Table",
      "Trees",
      "BST",
      "Heaps",
      "Graphs (BFS/DFS, shortest path)",
      "Recursion",
      "Backtracking",
      "Dynamic Programming",
      "Divide and Conquer",
      "Binary Search",
      "Math",
      "Sorting and Searching",
      "Two Pointers",
      "Sliding Window",
      "Complexity Analysis",
      "C++ STL",
    ],
  },
  {
    group: "Operating Systems and Networks",
    items: [
      "Processes and Threads",
      "CPU Scheduling",
      "Synchronization",
      "Deadlocks",
      "Virtual Memory",
      "Linux",
      "OSI and TCP/IP",
      "TCP vs UDP",
      "HTTP/HTTPS",
      "DNS",
      "Sockets",
      "Load Balancing (Nginx)",
    ],
  },
  {
    group: "System Design",
    items: [
      "Low-Level Design (OOP, SOLID, Design Patterns)",
      "API Design",
      "Caching",
      "Message Queues",
      "Database Design and Indexing",
      "Microservices",
    ],
  },
  {
    group: "Backend and APIs",
    items: [
      "FastAPI",
      "Flask",
      "Spring Boot",
      "Spring Data JPA",
      "REST API Design",
      "SQLAlchemy",
      "Pydantic",
      "JWT Authentication",
      "RBAC",
    ],
  },
  {
    group: "Databases and Messaging",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQLite",
      "SQL Server (T-SQL)",
      "Neo4j",
      "ChromaDB",
      "Apache Kafka",
      "Valkey Streams",
    ],
  },
  {
    group: "Cloud and DevOps",
    items: [
      "Oracle Cloud Infrastructure (OCI)",
      "Docker",
      "Docker Compose",
      "Kubernetes (Helm)",
      "GitLab CI/CD",
      "GitHub Actions",
      "Git",
      "Linux",
      "Nginx",
    ],
  },
  { group: "Web", items: ["React 19", "TypeScript", "HTML", "CSS", "Flask", "Streamlit"] },
  {
    group: "Testing and Practices",
    items: [
      "Pytest (unit and integration)",
      "Debugging",
      "Code Review",
      "Technical Documentation",
      "Agile/SDLC",
    ],
  },
  {
    group: "Professional Skills",
    items: [
      "Analytical Problem-Solving",
      "Attention to Detail",
      "Team Collaboration (15-developer codebase)",
      "Cross-functional Collaboration",
      "Presenting Findings",
      "Problem Structuring",
    ],
  },
];

// The recruiter "flex row": highest-signal, most job-keyword-relevant tools.
// Every entry traces to real evidence (experience bullets, project tech
// lists, or certifications). AWS is deliberately NOT listed — it appears only
// as a hackathon organizer; OCI is what is actually certified.
export const coreStack: { name: string; note: string; secondary?: boolean }[] = [
  { name: "Git", note: "GitLab CI/CD and GitHub Actions pipelines at Akiyam Solutions" },
  { name: "Python", note: "FastAPI services, ML pipelines, LangGraph agents, LeetCode (8 solved)" },
  { name: "SQL", note: "HackerRank SQL (Advanced), Microsoft SQL Server certifications" },
  { name: "C++", note: "DSA & problem solving (13 LeetCode problems solved), C++ STL" },
  { name: "C", note: "Languages coursework & problem solving (7 LeetCode problems solved)" },
  { name: "Java", note: "Spring Boot microservices, Delivery Route Cost Optimizer" },
  {
    name: "TypeScript / JS",
    note: "React 19 + TypeScript dashboards (JanSetu AI, this site) — familiar, not primary",
    secondary: true,
  },
  { name: "OCI", note: "Oracle Cloud Infrastructure 2025 Multicloud Architect Professional" },
  { name: "Docker", note: "CI/CD pipelines with deployment gates at Akiyam Solutions" },
  { name: "Kubernetes", note: "Kubernetes/Helm deployments on a 15-developer platform" },
  { name: "FastAPI", note: "MCP gateway with RBAC on a 17-agent LLM system" },
];

// Evidence map for skill chips: chip text → anchor + proof note. Only tools
// explicitly named in an experience bullet, project tech list, coursework
// item, or certificate title are linked; the rest stay plain chips.
export const skillProofs: Record<string, { href: string; note: string }> = {
  FastAPI: { href: "#experience", note: "Akiyam Solutions — FastAPI MCP gateway with RBAC" },
  "Spring Boot": { href: "#experience", note: "Akiyam Solutions — Kafka microservice work" },
  "Spring Data JPA": { href: "#certifications", note: "JPMorganChase job simulation" },
  Kafka: { href: "#experience", note: "Akiyam Solutions — Kafka topics and consumer groups" },
  Neo4j: { href: "#experience", note: "Akiyam Solutions — Neo4j retrieval pipelines" },
  ChromaDB: { href: "#experience", note: "Akiyam Solutions — ChromaDB retrieval pipelines" },
  "Model Context Protocol (MCP)": { href: "#projects", note: "mcp-smartcache caching gateway" },
  Docker: { href: "#experience", note: "Akiyam Solutions — Docker CI/CD pipelines" },
  "Kubernetes (Helm)": { href: "#experience", note: "Akiyam Solutions — K8s/Helm deployments" },
  "GitLab CI/CD": { href: "#experience", note: "Akiyam Solutions — CI/CD with deployment gates" },
  "Pytest (unit and integration)": { href: "#projects", note: "JanSetu AI — 194-test suite" },
  Linux: { href: "#experience", note: "Akiyam Solutions — Linux deployment infrastructure" },
  LangGraph: { href: "#projects", note: "JanSetu AI — LangGraph orchestration" },
  LangChain: { href: "#about", note: "Hands-on experience in multi-agent LLM systems" },
  "React 19": { href: "#projects", note: "JanSetu AI — React/TypeScript dashboard" },
  "TypeScript/JavaScript (familiar)": { href: "#projects", note: "JanSetu AI dashboard, this site" },
  SQLAlchemy: { href: "#projects", note: "JanSetu AI tech stack" },
  "SQLite (WAL)": { href: "#projects", note: "JanSetu AI tech stack" },
  PyTorch: { href: "#projects", note: "NanoGPT — character-level transformer from scratch" },
  XGBoost: { href: "#projects", note: "telco-customer-churn-prediction pipeline" },
  "Scikit-learn": { href: "#projects", note: "Exoplanet-Classifier & churn prediction" },
  TensorFlow: { href: "#projects", note: "Handwritten Digit Recognition ANN" },
  Streamlit: { href: "#skills", note: "Interactive web applications & dashboards" },
  Plotly: { href: "#skills", note: "Exploratory data analysis & visualization" },
  "GitHub Actions": { href: "#experience", note: "CI/CD automation pipelines" },
  "Deep Learning": { href: "#projects", note: "NanoGPT & Pneumonia Detection" },
  "Anomaly Detection": { href: "#hackathons", note: "AI for Bharat Hackathon (6th place)" },
  Forecasting: { href: "#projects", note: "telco-customer-churn-prediction" },
  RAG: { href: "#about", note: "RAG pipelines in about and experience" },
  "Power BI": { href: "#certifications", note: "Microsoft Power BI certification" },
  SQL: { href: "#certifications", note: "HackerRank and Microsoft SQL certifications" },
  "SQL Server (T-SQL)": { href: "#certifications", note: "Microsoft SQL Server certification" },
  Statistics: { href: "#education", note: "Coursework" },
  NLP: { href: "#projects", note: "NanoGPT & JanSetu-AI NLP triage" },
  "Dynamic Programming": { href: "#profiles", note: "LeetCode strong skill tag (29 solved)" },
  "Divide and Conquer": { href: "#profiles", note: "LeetCode strong skill tag" },
  "Binary Search": { href: "#profiles", note: "LeetCode strong skill tag" },
  "Oracle Cloud Infrastructure (OCI)": {
    href: "#certifications",
    note: "OCI 2025 certifications",
  },
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  note?: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Research Intern",
    org: "Symbiosis Centre for Applied AI (SCAAI), Pune",
    period: "Jul 2026 to Present",
    bullets: [
      "Selected through the competitive SCAAI Research Internship Drive 2026; working under faculty mentor Dr. Rahee Walambe on a healthcare AI research project.",
      "Building and validating a data pipeline (EDA, preprocessing, model fine-tuning), iterating on mentor feedback.",
    ],
  },
  {
    role: "AI Engineer Intern",
    org: "Akiyam Solutions",
    period: "Dec 2025 to Jun 2026",
    note: "Projects: HRMS Swarm Platform (17-agent, 15-developer) and Bioinformatics AI Platform",
    bullets: [
      "Designed and built a FastAPI-based MCP gateway with Role-Based Access Control (RBAC), defining permissions and routing across a 17-agent, multi-provider LLM system; reviewed and merged by senior engineers.",
      "Designed Kafka topic structure and consumer groups (with Valkey Streams) for reliable, ordered, traceable inter-agent communication.",
      "Built FastAPI services and Neo4j + ChromaDB retrieval pipelines for a bioinformatics research platform, with retrieval from PubMed and bioRxiv. Administered Linux-based deployment infrastructure.",
      "Wrote Pytest unit and integration tests and debugged services on a 15-developer codebase, incorporating PR code review feedback on every change.",
      "Built CI/CD pipelines (GitLab CI/CD, Docker, Kubernetes/Helm) with deployment gates; authored technical documentation.",
      "Worked in an agile 15-developer team, using AI coding tools to speed up routine work while validating all output.",
    ],
  },
];

export const projectCategories = [
  "All",
  "GenAI/Agents",
  "ML/DL",
  "Data/Analytics",
  "Full-stack/Web",
  "Hackathon",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type FeaturedProject = {
  title: string;
  year: string;
  pitch: string;
  bullets: string[];
  tech: string[];
  repos?: { name: string; url: string }[];
  credentialId?: string;
  credentialLabel?: string;
  tags: ProjectCategory[];
  callout?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "NanoGPT: Character-Level Transformer from Scratch",
    year: "2025",
    pitch:
      "Character-level GPT built from scratch in PyTorch, following Andrej Karpathy's 'Let's Build GPT.'",
    bullets: [
      "Character-level GPT built from scratch in PyTorch, following Andrej Karpathy's 'Let's Build GPT.' Implements self-attention, multi-head attention, and transformer blocks without pre-built libraries.",
      "Custom scaled dot-product attention, residual connections, layer normalization, and causal masking for autoregressive sequence generation.",
      "Trained on text corpus with character tokenization, positional embeddings, and cross-entropy loss to generate coherent character sequences.",
    ],
    tech: ["PyTorch", "Python", "Transformers", "NLP", "Deep Learning", "Jupyter Notebook"],
    repos: [{ name: "NanoGPT", url: "https://github.com/Harshad2321/NanoGPT" }],
    tags: ["ML/DL", "GenAI/Agents"],
  },
  {
    title: "JanSetu-AI: Multi-Agent Civic Incident Platform",
    year: "2026",
    pitch:
      "A LangGraph-orchestrated civic incident platform that triages, prioritises and closes reports through cooperating specialist agents.",
    bullets: [
      "Multi-agent civic incident platform built with React, FastAPI, and LangGraph. Combines NLP/vision triage, geospatial duplicate detection, explainable prioritization, adaptive recovery, and evidence handling.",
      "LangGraph-orchestrated 15-state machine coordinating six specialist agents and an independent Critic for triage, explainable 0-100 prioritisation, response planning, adaptive recovery and mandatory closure verification. React/TypeScript dashboard, REST API, append-only audit log.",
      "Enforces 11 system invariants verified by a 194-test Pytest suite.",
    ],
    tech: ["Python", "FastAPI", "LangGraph", "React 19", "TypeScript", "SQLAlchemy", "SQLite (WAL)"],
    repos: [{ name: "JanSetu-AI", url: "https://github.com/Harshad2321/JanSetu-AI" }],
    tags: ["GenAI/Agents", "Full-stack/Web"],
    callout:
      "Evaluation: 100% macro-F1 on the in-domain synthetic test set; 73.3% on the disjoint-vocabulary challenge set, with the limitation documented. Simulation-based academic prototype.",
  },
  {
    title: "mcp-smartcache: Caching Gateway for MCP Tools",
    year: "2026",
    pitch:
      "A caching gateway for Model Context Protocol (MCP) tools, optimizing latency and reducing LLM tool overhead.",
    bullets: [
      "A caching gateway for Model Context Protocol (MCP) tools, featuring Redis-backed response caching, deterministic cache keys, policy-based cache control, request coalescing, and TTL management.",
      "Deterministic cache keys generated across tool parameters with configurable per-tool TTLs and explicit cache invalidation policies.",
      "Request coalescing eliminates duplicate concurrent tool requests ('thundering herd') while preserving transparent JSON-RPC protocol compliance.",
    ],
    tech: ["Python", "Redis", "Model Context Protocol (MCP)", "FastAPI", "AsyncIO", "Apache 2.0"],
    repos: [{ name: "mcp-smartcache", url: "https://github.com/Harshad2321/mcp-smartcache" }],
    tags: ["GenAI/Agents"],
  },
  {
    title: "Exoplanet-Classifier: Hunting Exoplanets with AI (NASA)",
    year: "2025",
    pitch:
      "Built for NASA Space Apps Challenge 2025: 'A World Away: Hunting for Exoplanets with AI' using NASA open datasets.",
    bullets: [
      "Built for NASA Space Apps Challenge 2025: 'A World Away: Hunting for Exoplanets with AI.' Advanced AI systems to classify exoplanets using NASA's open datasets.",
      "Processes photometric light curve transit observations from Kepler Objects of Interest (KOI), K2, and TESS missions to detect candidate planet transits.",
      "Engineered orbital parameter feature extractors and trained robust classifiers to distinguish valid exoplanets from astrophysical false positives.",
    ],
    tech: ["Python", "Scikit-learn", "Astrophysics Data", "Pandas", "NumPy", "Lightkurve"],
    repos: [
      {
        name: "Exoplanet-Classifier",
        url: "https://github.com/Harshad2321/Exoplanet-Classifier-NASA-KOI-K2-TESS-",
      },
    ],
    tags: ["ML/DL", "Data/Analytics", "Hackathon"],
  },
  {
    title: "FairLens-AI: Human-AI Conversation Analysis",
    year: "2026",
    pitch:
      "Full-stack web app analyzing human-AI conversations for bias, toxicity, and behavioral patterns using Google Generative AI (Gemini).",
    bullets: [
      "Full-stack web app analyzing human-AI conversations for bias, toxicity, and behavioral patterns using Google Generative AI (Gemini).",
      "Deconstructs multi-turn conversational trajectories into granular scores for toxicity, conversational dominance, and subtle systemic bias.",
      "Interactive analytics dashboard providing real-time ethical alignment insights, visual pattern breakdowns, and structured evaluation reports.",
    ],
    tech: ["JavaScript", "React", "Node.js", "Google Gemini AI", "Tailwind CSS", "Data Analytics"],
    repos: [{ name: "FairLens-AI", url: "https://github.com/Harshad2321/FairLens-AI" }],
    tags: ["GenAI/Agents", "Full-stack/Web"],
  },
];

export type GithubProject = {
  name: string;
  lang?: string;
  desc?: string;
  url?: string;
  liveUrl?: string;
  license?: string;
  isPrivate?: boolean;
  tags: ProjectCategory[];
};

export const githubProjects: GithubProject[] = [
  {
    name: "telco-customer-churn-prediction",
    lang: "Jupyter",
    desc: "End-to-end ML pipeline predicting telecom churn: EDA, feature engineering, class-imbalance handling (SMOTE/class weights), 6-model comparison with cross-validation & GridSearchCV tuning.",
    url: "https://github.com/Harshad2321/telco-customer-churn-prediction",
    tags: ["ML/DL", "Data/Analytics"],
  },
  {
    name: "Pneumonia-Detection-from-Chest-X-Rays",
    lang: "Jupyter",
    desc: "Deep learning pneumonia detection using DenseNet121, image preprocessing, fine-tuning, threshold optimization, and Grad-CAM explainability.",
    url: "https://github.com/Harshad2321/Pneumonia-Detection-from-Chest-X-Rays-using-Deep-Learning",
    tags: ["ML/DL"],
  },
  {
    name: "AgriSakha",
    lang: "JavaScript",
    desc: "Multilingual, AI-powered platform for personalized, real-time crop advisory with voice-first and offline-first design.",
    url: "https://github.com/Harshad2321/AgriSakha",
    tags: ["Hackathon", "Full-stack/Web", "GenAI/Agents"],
  },
  {
    name: "Delivery-Route-Cost-Optimizer",
    lang: "Java",
    desc: "Route/cost optimization tool for calculating optimal transit pathways and operational logistics cost reduction.",
    url: "https://github.com/Harshad2321/Delivery-Route-Cost-Optimizer",
    tags: ["Data/Analytics"],
  },
  {
    name: "Handwritten_Digit_Recognition_ANN",
    lang: "Jupyter",
    desc: "ANN with TensorFlow/Keras, includes overfitting analysis, Dropout, EarlyStopping, and adaptive learning rate tuning.",
    url: "https://github.com/Harshad2321/Handwritten_Digit_Recognition_ANN.ipynb",
    tags: ["ML/DL"],
  },
  {
    name: "Twitter-Sentiment-Analysis",
    lang: "Jupyter",
    desc: "Sentiment analysis on Twitter data utilizing NLP preprocessing, feature extraction, and classification models.",
    url: "https://github.com/Harshad2321/Twitter-Sentiment-Analysis",
    tags: ["ML/DL"],
  },
  {
    name: "Email-Spam-Detection",
    lang: "Jupyter",
    desc: "Spam classification project comparing TF-IDF vectorization and machine learning classifiers on message corpora.",
    url: "https://github.com/Harshad2321/Email-Spam-Detection",
    tags: ["ML/DL"],
  },
  {
    name: "Netflix-UI-Clone",
    lang: "HTML/CSS",
    license: "MIT",
    desc: "Responsive Netflix landing page clone.",
    url: "https://github.com/Harshad2321/Netflix-UI-Clone",
    tags: ["Full-stack/Web"],
  },
  {
    name: "Myself",
    lang: "TypeScript",
    desc: "This portfolio itself: React, TypeScript, Tailwind CSS, neo-brutalist terminal-inspired UI, interactive project showcases, GitHub + LeetCode integration.",
    url: "https://github.com/Harshad2321/Myself",
    liveUrl: "https://myself-gules-psi.vercel.app/",
    tags: ["Full-stack/Web"],
  },
];

export const privateProjects: GithubProject[] = [
  {
    name: "Legal-AI-Simplifier",
    lang: "TypeScript",
    desc: "AI-powered platform that transforms complex legal documents into clear, actionable insights using Google Cloud AI.",
    isPrivate: true,
    tags: ["GenAI/Agents", "Full-stack/Web"],
  },
  {
    name: "ByteNotes",
    lang: "JavaScript",
    desc: "Full-stack app letting users upload PDFs and ask AI-powered questions about their content. Built with React, Node.js, and Hugging Face integration.",
    isPrivate: true,
    tags: ["GenAI/Agents", "Full-stack/Web"],
  },
];

export const openSourceRow = [
  { name: "ReShare", note: "fork", url: "https://github.com/Harshad2321/ReShare" },
  { name: "aiondemand", note: "AIoD SDK fork", license: "MIT", url: "https://github.com/Harshad2321/aiondemand" },
  {
    name: "prompt-to-production",
    note: "nasscom fork",
    license: "MIT",
    url: "https://github.com/Harshad2321/prompt-to-production",
  },
  { name: "Harshad2321", note: "profile README", url: "https://github.com/Harshad2321/Harshad2321" },
];

export type Hackathon = {
  name: string;
  context: string;
  date: string;
  result?: string;
  id?: string;
  highlight?: boolean;
};

export const hackathons: Hackathon[] = [
  {
    name: "AI for Bharat Hackathon",
    context: "AWS/Hack2Skill",
    date: "Jun 2026",
    result: "Final Round; 6th among 96,000+ participants",
    id: "2026H2S04AIFB-P00384",
    highlight: true,
  },
  {
    name: "Presented Nurture at Industry Conclave 2026",
    context: "SIT Pune",
    date: "2026",
    highlight: true,
  },
  {
    name: "ISRO Bharatiya Antariksh Hackathon 2026",
    context: "Participation",
    date: "Aug 2026",
    id: "2026H2S06BAH-P11316",
  },
  {
    name: "Solution Challenge 2026: Build with AI",
    context: "Hack2skill",
    date: "Jul 2026",
    id: "2026H2S07SCBWAI-PS08929",
  },
  {
    name: "Gen AI Exchange Hackathon 2025",
    context: "Google Cloud (Hack2skill)",
    date: "Jan 2026",
    id: "2025H2S08GH-P801475",
  },
  { name: "NASA International Space Apps Challenge", context: "", date: "Oct 2025" },
  {
    name: "Smart India Hackathon 2025, Internal Round",
    context: "AgriSakha, SIT Pune EPIC Cell",
    date: "Sep 2025",
  },
  { name: "Co-Creating with GPT-5", context: "lablab.ai", date: "Aug 2025" },
  { name: "Paranox 2.O Hackathon", context: "Campus Ninjas", date: "Nov 2025" },
  {
    name: "TroubleShoot Ideathon",
    context: "HashTag Official/JEMTEC",
    date: "Jul 2025",
    id: "e9937396-17d7-4eea-9612-cdcbecad6513",
  },
  {
    name: "2 Fast 2 Hack",
    context: "Unstop",
    date: "Mar 2025",
    id: "971923da-6da9-4969-b138-0c5848ec7b39",
  },
  {
    name: "Nation Building Case Study Competition 2025",
    context: "Online quiz (Unstop)",
    date: "Jan 2025",
  },
  {
    name: "Selected for SCAAI Research Internship Drive 2026",
    context: "Symbiosis Centre for Applied AI",
    date: "2026",
    highlight: true,
  },
];

export const githubBadges = ["Galaxy Brain", "Pull Shark", "Quickdraw", "YOLO"];
export const githubDeveloperProgramMember = true;

export const education = {
  degree: "B.Tech in Artificial Intelligence and Machine Learning",
  institute: "Symbiosis Institute of Technology, Pune",
  period: "Expected May 2028",
  status: "Semester 5",
  cgpa: "7.85/10",
  coursework: [
    "Statistics",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Databases",
    "Data Structures and Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Cloud Computing",
  ],
};

export type Certification = {
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  url?: string; // TODO(owner): fill in credential URLs
};

export type CertGroup = { group: string; items: Certification[] };

export const certGroups: CertGroup[] = [
  {
    group: "Cloud and Databases",
    items: [
      {
        title: "Oracle Cloud Infrastructure 2025 Certified Multicloud Architect Professional",
        issuer: "Oracle",
        date: "Oct 2025",
      },
      {
        title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
        issuer: "Oracle (NetSuite)",
        date: "Oct 2025",
      },
      {
        title: "Neo4j Graph Data Science Certification",
        issuer: "Neo4j",
        date: "Jan 2026",
        credentialId: "beb7a923-3c27-4580-9cc4-e5971f6ff111",
      },
      {
        title: "Data Manipulation and Transactions in SQL Server",
        issuer: "Microsoft",
        date: "Jun 2026",
        credentialId: "MM73BR4HB6F2",
      },
      {
        title: "SQL Foundations",
        issuer: "Microsoft",
        date: "Jun 2026",
        credentialId: "60Y6XO4DUINC",
      },
      {
        title: "SQL (Advanced)",
        issuer: "HackerRank",
        date: "Sep 2025",
        credentialId: "088BB575E062",
      },
      {
        title: "SQL (Basic)",
        issuer: "HackerRank",
        date: "Sep 2025",
        credentialId: "2C401DB7DD60",
      },
      {
        title: "CSS (Basic)",
        issuer: "HackerRank",
        date: "Sep 2025",
        credentialId: "94BF76AAADE4",
      },
    ],
  },
  {
    group: "AI and Machine Learning",
    items: [
      {
        title: "Full Stack Generative and Agentic AI with Python",
        issuer: "Udemy",
        date: "Dec 2025",
        credentialId: "UC-4bfc5116-f9da-4eed-9517-3482be25fcb8",
      },
      {
        title: "Supervised Learning Models",
        issuer: "Skillsoft",
        date: "Jan 2026",
        credentialId: "172405431",
      },
      {
        title:
          "AI Code Sarathi, AI Assisted Developer Workshop (Prompt Engineering, MCP, LLMs, Git)",
        issuer: "nasscom",
        date: "Mar 2026",
      },
      {
        title: "Fundamentals of Artificial Intelligence (Degree Student)",
        issuer: "Skills Development Network (SDN)",
        date: "Oct 2026",
      },
      {
        title: "Basics of AIML Workshop by GeeksforGeeks",
        issuer: "Cognizance IIT Roorkee",
        date: "Nov 2024",
        credentialId: "8499fb70-669e-409e-a74a-1ef722e556e8",
      },
    ],
  },
  {
    group: "Data and Analytics",
    items: [
      {
        title: "Microsoft Power BI Online",
        issuer: "Infosys Springboard",
        date: "Oct 2026",
      },
    ],
  },
  {
    group: "Programming and Software",
    items: [
      {
        title: "JPMorganChase Software Engineering Job Simulation",
        issuer: "Forage",
        date: "Apr 2026",
        credentialId: "zgX7778zsKdyqoudT",
      },
      {
        title: "100 Days of Code: The Complete Python Pro Bootcamp",
        issuer: "Udemy",
        date: "Nov 2025",
        credentialId: "UC-1946b6ec-75ea-4fb6-a51e-90704967d8ab",
      },
      {
        title: "Data Structures and Algorithms Course for Beginners",
        issuer: "ScholarHat",
        date: "Aug 2025",
      },
      {
        title: "Introduction to Hardware and Software",
        issuer: "Infosys Springboard",
      },
      {
        title: "Attendance Hashgraph Developer",
        issuer: "The Hashgraph Association",
        date: "Aug 2025",
        credentialId: "8fefa2a9-a81f-4873-891c-18232e748c9d",
      },
    ],
  },
  {
    group: "Career and Entrepreneurship",
    items: [
      {
        title: "Job Readiness: Building your Future",
        issuer: "Tech Mahindra Foundation",
        date: "Oct 2026",
        credentialId: "7727799905HA",
      },
      {
        title:
          "Turning Technical Projects into Viable Business Ideas and Personal Finance and Fundraising Basics",
        issuer: "Symbiosis Institute of Technology, Pune",
        date: "Sep 2025",
      },
      {
        title: "Workshop in collaboration with Nextleap",
        issuer: "Cognizance IIT Roorkee",
        date: "Feb 2025",
        credentialId: "0ff578c5-69e3-411d-82da-186b0f7cc0a7",
      },
    ],
  },
];

export const codingProfiles = [
  {
    name: "GitHub",
    handle: "Harshad2321",
    url: identity.github,
    stat: "34 repositories",
  },
  {
    name: "LeetCode",
    handle: "harshadagrawal",
    url: identity.leetcode,
    stat: "29 solved · 79.17% rate",
  },
  {
    name: "HackerRank",
    handle: "harshad_agrawal1",
    url: identity.hackerrank,
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Hackathons" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "profiles", label: "Profiles" },
  { id: "contact", label: "Contact" },
];
