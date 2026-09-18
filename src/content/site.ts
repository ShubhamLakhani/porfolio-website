import type { ApproachStage } from "./types";

export const siteMeta = {
  title: "Shubham Lakhani | Senior Full-Stack Engineer",
  description:
    "Senior Full-Stack Engineer building web applications with React, Next.js, and Node.js. Explore my work in AI, veterinary care, golf, and events.",
  socialTitle: "From idea to production. | Shubham Lakhani",
  socialDescription:
    "6+ years building web applications. Open to long-term contracts, full-time roles, and freelance projects.",
  identity: "Shubham Lakhani",
  wordmark: "sl.",
  email: "lakhanishubham9750@gmail.com",
  github: "https://github.com/ShubhamLakhani",
  linkedin: "https://www.linkedin.com/in/shubham-lakhani-677b00209",
  resumePath: "/resume/Shubham_Lakhani_Resume.pdf",
  resumeFilename: "Shubham_Lakhani_Resume.pdf",
} as const;

export const navigation = {
  links: [
    { href: "#work", label: "Work" },
    { href: "#expertise", label: "Expertise" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
  ],
  contact: { href: "#contact", label: "Let's talk" },
  resume: { href: siteMeta.resumePath, label: "View resume" },
  skip: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  backToTop: "Back to top",
} as const;

export const hero = {
  role: "Senior Full-Stack Engineer",
  location: "Surat, India · Working globally",
  availabilityParts: [
    { text: "Open to " },
    { text: "long-term contracts", accent: true },
    { text: ", " },
    { text: "full-time roles", accent: true },
    { text: ", and " },
    { text: "freelance projects", accent: true },
    { text: "." },
  ],
  headlineLine1: "From idea",
  headlineLine2Before: "to ",
  headlineAccent: "production.",
  introduction: {
    lead: "I'm Shubham.",
    restBefore:
      " I build web applications that make everyday work easier. With ",
    yearsAccent: "6+ years",
    restAfter:
      " of experience, I help founders and teams turn requirements into working products, from the screens people use to the systems behind them.",
  },
  primaryAction: { href: "#work", label: "Explore my work" },
  secondaryAction: { href: "#contact", label: "Let's talk" },
  resumeAction: { href: siteMeta.resumePath, label: "View resume" },
  supportingLine: "Web applications · Databases · Launch and support",
  experienceLine: "Building for the web since 2019.",
} as const;

export const approachLabel = "How I work";

export const approachStages: ApproachStage[] = [
  {
    id: "understand",
    label: "Understand",
    index: "01",
    title: "Start with the problem.",
    body: "I ask questions, learn how people work day to day, and confirm the requirements before development starts. A clear plan saves rework later.",
  },
  {
    id: "shape",
    label: "Shape",
    index: "02",
    title: "Make the complex feel simple.",
    body: "I map the screens and how people move between them, so the next step feels obvious and repeated patterns stay consistent.",
  },
  {
    id: "build",
    label: "Build",
    index: "03",
    title: "Build the complete application.",
    body: "I build the screens, server features, and database together, and keep them aligned with the agreed requirements.",
  },
  {
    id: "run",
    label: "Run",
    index: "04",
    title: "Care beyond the launch.",
    body: "I ship the application, watch for errors, and keep improving it as people use it.",
  },
];

export const workSection = {
  titleBefore: "Built for ",
  titleAccent: "real life.",
  marker: "01 / Selected work",
  introduction:
    "Selected work across AI, veterinary care, golf technology, and events. Each project gave me a different industry to understand and a practical problem to solve.",
  behindTheBuild: "Read the project story",
  closeDetails: "Close details",
  visitPlatform: "Visit platform",
  viewLarger: "View larger image",
  openPreview: "View larger project image",
  projectNavLabel: "Selected projects",
  closeImage: "Close image",
  previousImage: "Previous image",
  nextImage: "Next image",
} as const;

export const moreWorkSection = {
  titleBefore: "Other things ",
  titleAccent: "I've built.",
  introduction:
    "A few more projects across facility management, app builders, and online stores.",
  expandLabel: "Browse more work",
  collapseLabel: "Show less",
} as const;

export const expertiseSection = {
  titleBefore: "The craft behind ",
  titleAccent: "the product.",
  marker: "02 / Expertise",
  introduction:
    "I build the screens people use, the systems behind them, and the databases that connect them. Testing, launch, and ongoing improvements are part of that work too.",
  learningBadge: "Learning",
} as const;

export const aboutSection = {
  titleLine1: "Curious by nature.",
  titleAccent: "Engineer by craft.",
  marker: "03 / About",
  paragraphs: [
    "I'm a Senior Full-Stack Engineer based in Surat, India, with 6+ years building web applications.",
    "I like working on software for real businesses, especially when it means learning a new industry. I've built products for veterinary care, golf, AI, events, and online stores.",
    "Before I write code, I learn what the product needs to do and confirm the requirements with the people behind it. Clients notice the care I put into planning, and that usually means less rework later.",
    "I've worked remotely with teams across the US, UAE, and India on planning, development, launch, and support.",
    "I'm looking for a long-term contract or full-time role with a product team. I'm also open to freelance projects.",
  ],
  personalStatement:
    "I like learning unfamiliar industries, asking useful questions, and staying with a problem until the product works for the people using it.",
} as const;

export const experienceSection = {
  titleBefore: "A career built around ",
  titleAccent: "products.",
  marker: "04 / Experience",
  educationLabel: "Education",
} as const;

export const contactSection = {
  titleBefore: "Have something ",
  titleAccent: "worth building?",
  marker: "05 / Contact",
  bodyParts: [
    { text: "I'm open to " },
    { text: "long-term contracts", accent: true },
    { text: ", " },
    { text: "full-time roles", accent: true },
    { text: ", and " },
    { text: "freelance projects", accent: true },
    {
      text: ". If you're building a web application or improving an existing one, I'd like to hear about it.",
    },
  ],
  primaryAction: "Email me",
  supportingPrompt:
    "Tell me about your product, your team, and where you need help.",
  location: "Surat, India · Working remotely",
  copyEmail: "Copy email",
  copySuccess: "Email copied.",
  copyFailure: "Please copy the email address above.",
  downloadResume: "Download resume",
  viewResume: "View resume",
} as const;

export const footer = {
  copyright: "© 2026 Shubham Lakhani",
  closing: "Built with care.",
} as const;

/** Shared desktop navigation breakpoint (px). Keep CSS and Header matchMedia aligned. */
export const NAV_BREAKPOINT_PX = 960;
