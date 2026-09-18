import type { ExpertiseCard } from "./types";

export const expertiseCards: ExpertiseCard[] = [
  {
    id: "frontend",
    title: "Frontend development",
    description:
      "I build clear, responsive screens for dashboards, visual builders, and AI tools. I keep the interface organized as the product grows.",
    categoryIcon: "layout",
    items: [
      { id: "react", label: "React", icon: "react" },
      { id: "nextjs", label: "Next.js", icon: "nextjs" },
      { id: "remix", label: "Remix", icon: "remix" },
      { id: "redux-toolkit", label: "Redux Toolkit", icon: "redux" },
      { id: "redux", label: "Redux", icon: "redux" },
      { id: "typescript", label: "TypeScript", icon: "typescript" },
      { id: "javascript", label: "JavaScript", icon: "javascript" },
      { id: "html5", label: "HTML5", icon: "html5" },
      { id: "css3", label: "CSS3", icon: "css3" },
      { id: "tailwind", label: "Tailwind CSS", icon: "tailwind" },
      { id: "antd", label: "Ant Design", icon: "antd" },
      { id: "bootstrap", label: "Bootstrap", icon: "bootstrap" },
      { id: "ejs", label: "EJS", icon: "ejs" },
    ],
  },
  {
    id: "backend",
    title: "Backend and integrations",
    description:
      "I build server features, connect services, and handle sign-in, data checks, and live updates.",
    categoryIcon: "server",
    items: [
      { id: "nodejs", label: "Node.js", icon: "nodejs" },
      { id: "express", label: "Express", icon: "express" },
      { id: "rest", label: "REST APIs", icon: "api" },
      { id: "graphql", label: "GraphQL integrations", icon: "graphql" },
      { id: "socketio", label: "Socket.IO", icon: "socketio" },
      { id: "oauth", label: "OAuth 2.0", icon: "lock" },
      { id: "payload", label: "Payload CMS", icon: "payload" },
      { id: "validation", label: "Data validation", icon: "check" },
      { id: "retry", label: "Retry handling", icon: "refresh" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description:
      "I organize application data and improve database queries so information is easier to retrieve and maintain.",
    categoryIcon: "database",
    items: [
      { id: "sql", label: "SQL", icon: "sql" },
      { id: "postgresql", label: "PostgreSQL", icon: "postgresql" },
      { id: "mysql", label: "MySQL", icon: "mysql" },
      { id: "mongodb", label: "MongoDB", icon: "mongodb" },
      { id: "db-design", label: "Database design", icon: "schema" },
      { id: "indexing", label: "Database indexing", icon: "index" },
      { id: "query-perf", label: "Query performance", icon: "gauge" },
    ],
  },
  {
    id: "deployment",
    title: "Deployment and testing",
    description:
      "I release applications, automate checks, and monitor errors so problems can be found and fixed.",
    categoryIcon: "cloud",
    items: [
      {
        id: "aws",
        label: "AWS EC2, S3, and Lambda",
        icon: "aws",
      },
      { id: "docker", label: "Docker", icon: "docker" },
      { id: "github-actions", label: "GitHub Actions", icon: "githubactions" },
      {
        id: "cicd",
        label: "Automated builds and releases (CI/CD)",
        icon: "pipeline",
      },
      { id: "azure", label: "Azure", icon: "azure" },
      { id: "sentry", label: "Sentry", icon: "sentry" },
      { id: "jest", label: "Jest", icon: "jest" },
      { id: "testing", label: "Automated testing", icon: "test" },
      { id: "alerts", label: "Live error alerts", icon: "bell" },
      { id: "code-review", label: "Code review", icon: "review" },
    ],
  },
  {
    id: "planning",
    title: "Planning and teamwork",
    description:
      "I work with founders and teams to agree on requirements, plan delivery, review code, and support other developers.",
    categoryIcon: "users",
    items: [
      { id: "planning", label: "Project planning", icon: "plan" },
      { id: "requirements", label: "Requirements review", icon: "clipboard" },
      { id: "iterative", label: "Iterative delivery", icon: "cycle" },
      { id: "remote", label: "Remote collaboration", icon: "globe" },
      { id: "mentoring", label: "Mentoring", icon: "mentor" },
    ],
  },
  {
    id: "learning",
    title: "Currently learning",
    description:
      "I'm learning blockchain development, Rust, and Ethereum through personal projects. I'm also studying Python and the foundations of AI and machine learning.",
    categoryIcon: "learn",
    learning: true,
    items: [
      { id: "blockchain", label: "Blockchain", icon: "blockchain" },
      { id: "rust", label: "Rust", icon: "rust" },
      { id: "ethereum", label: "Ethereum", icon: "ethereum" },
      { id: "python", label: "Python", icon: "python" },
      {
        id: "aiml",
        label: "AI and machine learning basics",
        icon: "brain",
      },
    ],
  },
];
