import type { AdditionalProject, FeaturedProject } from "./types";

export const featuredProjects: FeaturedProject[] = [
  {
    id: "orbofi",
    name: "Orbofi",
    index: "01",
    category: "AI agents",
    role: "Frontend development and backend contributions · Founding engineering team",
    cardTitle: "Many AI tools. One clear screen.",
    cardDescription:
      "Built Orbofi's frontend from scratch and later moved it from React to Remix to load data on the server. Added an agent directory that loads more results as people scroll, and brought several AI tools into one chat screen.",
    featuredResult:
      "The chatbot builder needed approximately 35% less time to become ready for interaction.",
    stack: ["React", "Remix", "Redux", "Node.js", "MongoDB", "OAuth 2.0"],
    url: "https://www.orbofi.com/",
    images: [
      {
        src: "/projects/orbofi-discovery.png",
        alt: "Orbofi platform showing trending agents and featured agent listings.",
        caption: "Orbofi platform preview: agent discovery and listings.",
        cropTopPx: 58,
        width: 2048,
        height: 1122,
      },
      {
        src: "/projects/orbofi-creation.png",
        alt: "Orbofi platform's starting screen for creating an agent.",
        caption: "Orbofi platform preview: starting screen for creating an agent.",
        cropTopPx: 58,
        width: 2048,
        height: 1117,
      },
    ],
    story: [
      {
        heading: "The product",
        paragraphs: [
          "Orbofi lets people create and interact with AI agents. I worked on the main application screens, browsing agents, and the screens for using different AI tools.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "As part of the founding engineering team, I built the frontend from scratch, including reusable screens, navigation, and managing information across the application. I also worked on user accounts and third-party sign-in with Node.js, MongoDB, and OAuth 2.0.",
        ],
      },
      {
        heading: "The challenge",
        paragraphs: [
          "After the React frontend was built, the product needed to load data on the server. It also needed to support a growing agent directory and several chat modes, including chat, image generation, website generation, and blockchain interactions.",
        ],
      },
      {
        heading: "How I solved it",
        paragraphs: [
          "I moved the frontend to Remix so the application could load data on the server. I built a staggered grid that loads more agents as people scroll. I organized the different chat modes in one screen while keeping their controls clear.",
          "I displayed AI replies as they arrived instead of waiting for the complete response. I also reduced unnecessary screen updates, split code into smaller parts, and loaded features when needed.",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "The platform launched with roughly 500 or more users. The chatbot builder became ready to respond to input in approximately 35% less time. The updated application could load data on the server and support the platform's growing set of AI tools.",
        ],
      },
    ],
  },
  {
    id: "happypet",
    name: "HappyPet Tech",
    index: "02",
    category: "Software for veterinary clinics",
    role: "Senior Full-Stack Engineer",
    period: "April 2025 to September 2026",
    cardTitle: "Helping clinics manage everyday care.",
    cardDescription:
      "Built the veterinary clinic features, including appointments, inpatient care, pet health records, and clinical notes. Added subscriptions for businesses and individual services, and handled launch and support.",
    featuredResult:
      "Built veterinary features for a platform serving approximately 100+ clinics.",
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Redux Toolkit",
      "Socket.IO",
      "AWS",
      "Docker",
    ],
    url: "https://happypet.tech/india",
    images: [
      {
        src: "/projects/happypet-overview.png",
        alt: "HappyPet Tech public website with its software overview and bookings illustration.",
        caption: "HappyPet Tech platform website: product overview.",
        cropTopPx: 58,
        width: 2048,
        height: 1125,
      },
      {
        src: "/projects/happypet-services.png",
        alt: "HappyPet Tech website showing grooming, boarding, store, and clinic management services.",
        caption:
          "HappyPet Tech platform website: pet-business services, including clinic management.",
        cropTopPx: 55,
        width: 2048,
        height: 1124,
      },
    ],
    story: [
      {
        heading: "The product",
        paragraphs: [
          "HappyPet Tech provides software for pet businesses. I was responsible for its veterinary clinic features and subscription features for businesses and their services.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "I worked directly with the founders to agree on requirements and build the veterinary clinic features. It covered clinic appointments, inpatient care, pet health records, vaccination tracking, and detailed clinical notes.",
          "The clinical notes followed the SOAP format, recording the owner’s observations, the vet’s findings, their assessment, and the treatment plan. I built the screens and supporting logic for recording each part of a consultation.",
          "I also added subscriptions at the business and individual-service levels, then handled launch and ongoing support.",
        ],
      },
      {
        heading: "How I solved it",
        paragraphs: [
          "I used Socket.IO to send booking updates as they happened, instead of repeatedly asking the server for changes. Updates reached the clinic and customer screens in under a second. I used TypeScript and Redux Toolkit to keep shared dashboard data consistent.",
          "I packaged the Next.js and Node.js services with Docker and used GitHub Actions to automate builds, tests, and releases on AWS EC2. I added Sentry to track errors in booking, payment, and vaccination-verification features.",
          "I maintained connections to payment services, Payload CMS, AWS S3, and AWS Lambda. I checked incoming data and retried failed requests where appropriate to handle service failures and changes.",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "During my work, the platform served approximately 100 or more clinics and handled around 200 or more bookings per month. Booking updates reached both the clinic and customer screens in under a second, and alerts helped the team spot problems in the live application.",
        ],
      },
    ],
  },
  {
    id: "noteefy",
    name: "Noteefy",
    index: "03",
    category: "Golf technology",
    role: "Frontend Developer · Client project",
    period: "August 2022 to February 2023",
    cardTitle: "Finding the right tee time.",
    cardDescription:
      "Built the frontend from scratch with React and Ant Design. Connected the screens to the server and used GraphQL to search by location, date, and time.",
    featuredResult:
      "Delivered the application screens and search during my work from August 2022 to February 2023.",
    stack: ["React", "Ant Design", "GraphQL"],
    stackNote: "Project stack also included: Node.js · Express",
    url: "https://www.noteefy.com/",
    images: [
      {
        src: "/projects/noteefy-overview.png",
        alt: "Noteefy's current public website with golf-course software previews.",
        caption:
          "Noteefy's current platform website. My frontend work: August 2022 to February 2023.",
        cropTopPx: 62,
        width: 2048,
        height: 1131,
      },
      {
        src: "/projects/noteefy-waitlist.png",
        alt: "Noteefy platform overview illustrating waitlist preferences and tee-time notifications.",
        caption:
          "Current platform overview showing waitlists and notifications.",
        cropTopPx: 96,
        width: 2048,
        height: 1069,
      },
    ],
    story: [
      {
        heading: "The product",
        paragraphs: [
          "Noteefy serves golf course operators. Its current platform helps manage demand, tee-time waitlists, confirmations, and golfer communications. My frontend work took place from August 2022 to February 2023.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "I built the frontend from scratch with React and Ant Design and connected the screens to the server.",
        ],
      },
      {
        heading: "The challenge",
        paragraphs: [
          "Search needed to combine location, date, and time. This was my first project using GraphQL, so I learned how to request the required data while building the search.",
        ],
      },
      {
        heading: "How I solved it",
        paragraphs: [
          "I connected the search screen to the GraphQL API and combined location, date, and time filters to retrieve relevant results.",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "I delivered the application screens and their connections to the server, including the combined search filters. The project gave me practical experience using GraphQL in a client application.",
        ],
      },
    ],
  },
  {
    id: "accelevents",
    name: "Accelevents",
    index: "04",
    category: "Online events",
    role: "React.js Developer · Project at Depthin Solution",
    cardTitle: "Helping people connect at online events.",
    cardDescription:
      "Worked on registration and check-in screens, and added calling in the browser so speakers and viewers could communicate during online events.",
    featuredResult:
      "Enabled speakers and viewers to communicate through the event website.",
    stack: ["React", "Node.js"],
    url: "https://www.accelevents.com/",
    images: [
      {
        src: "/projects/accelevents-overview.png",
        alt: "Accelevents' current public website describing its event management platform.",
        caption:
          "Accelevents' current platform website. My work covered registration, check-in, and calls through the website.",
        cropTopPx: 0,
        width: 2048,
        height: 1063,
      },
    ],
    story: [
      {
        heading: "The product",
        paragraphs: [
          "Accelevents is an event management platform. I worked on registration, check-in, and communication during online events.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "At Depthin Solution, I contributed to React and Node.js development for Accelevents. I rebuilt parts of the registration and check-in screens and fixed interaction issues across the application.",
        ],
      },
      {
        heading: "The challenge",
        paragraphs: [
          "Speakers and viewers needed a way to communicate through the website during online events.",
        ],
      },
      {
        heading: "How I solved it",
        paragraphs: [
          "I added calling in the browser as part of the online event experience, alongside my work on registration and check-in.",
        ],
      },
      {
        heading: "The result",
        paragraphs: [
          "The calling feature let speakers and viewers communicate during online events. My other work improved registration and check-in.",
        ],
      },
    ],
  },
];

export const additionalProjects: AdditionalProject[] = [
  {
    id: "software-247",
    name: "247 Software",
    category: "Facility management · Incident tracking",
    role: "Full-Stack Engineer · Contract",
    description:
      "Built screens for reporting incidents and tracking activity at venues, including tables and live maps with Leaflet.js. Organized the data in MySQL and improved how updates reached the reports. The delay before an incident appeared in a report fell by approximately 40%.",
    stack: ["MySQL", "Leaflet.js", "Connecting reports to live data"],
  },
  {
    id: "intelliflow",
    name: "IntelliFlow",
    category: "App builder",
    description:
      "Built a drag-and-drop canvas and customization tools so people could create applications without writing code. Made the builder feel snappier by reorganizing components and cutting unnecessary screen updates.",
    stack: ["React", "Redux"],
  },
  {
    id: "gamezzar",
    name: "Gamezzar",
    category: "Online store · Digital game keys",
    description:
      "Took a digital game-key store from requirements to launch with React, Node.js, and Express, including payments and key delivery.",
    stack: ["React", "Node.js", "Express", "MySQL"],
  },
  {
    id: "morning-crate",
    name: "Morning Crate",
    category: "Online store · Dairy products",
    description:
      "Built an online dairy store with Node.js and Express, using EJS for the storefront pages.",
    stack: ["Node.js", "Express", "EJS"],
  },
];
