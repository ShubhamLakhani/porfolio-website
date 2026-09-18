import type { Education, ExperienceEntry } from "./types";

export const experienceEntries: ExperienceEntry[] = [
  {
    id: "happypet",
    company: "HappyPet Tech",
    role: "Senior Full-Stack Engineer",
    dates: "April 2025 – September 2026",
    location: "Surat, India · Remote",
    summary:
      "Built and maintained the Veterinary Management module, covering appointments, inpatient care, SOAP clinical notes, vaccination tracking, and clinic operations. Added business and service subscriptions, live booking updates, automated releases, error monitoring, and connections to external services.",
    relatedProjectIds: ["happypet"],
  },
  {
    id: "independent",
    company: "Independent consulting",
    role: "Freelance Senior Full-Stack Engineer",
    dates: "June 2022 – January 2025",
    location: "Remote · International clients",
    summary:
      "Worked on long-term client projects including Orbofi, IntelliFlow, and Noteefy. Built application interfaces, handled complex screen behavior, connected APIs, and implemented sign-in features.",
    relatedProjectIds: ["orbofi", "intelliflow", "noteefy"],
    note: "Noteefy engagement: August 2022 – February 2023",
  },
  {
    id: "software-247",
    company: "247 Software",
    role: "Full-Stack Engineer · Contract",
    dates: "January 2022 – July 2022",
    location: "Remote",
    summary:
      "Built incident and activity-tracking screens, live maps, and MySQL data structures. Improved how updates reached operational reports.",
    relatedProjectIds: ["software-247"],
  },
  {
    id: "white-orange",
    company: "White Orange Software",
    role: "Senior React.js Developer",
    dates: "November 2020 – November 2021",
    location: "Surat, India",
    summary:
      "Built online stores including Gamezzar and Morning Crate. Worked on the frontend, APIs, payments, digital key delivery, and database features.",
    relatedProjectIds: ["gamezzar", "morning-crate"],
  },
  {
    id: "depthin",
    company: "Depthin Solution",
    role: "React.js Developer · Intern to full-time",
    dates: "October 2019 – November 2020",
    location: "Surat, India",
    summary:
      "Progressed from intern to full-time developer while working on React and Node.js applications. Contributed to Accelevents' registration, check-in, and calling features.",
    relatedProjectIds: ["accelevents"],
  },
];

export const education: Education = {
  qualification: "Bachelor of Computer Application",
  institution: "Veer Narmad South Gujarat University, Surat",
  dates: "2014–2017",
};

export const projectNameById: Record<string, string> = {
  orbofi: "Orbofi",
  happypet: "HappyPet Tech",
  noteefy: "Noteefy",
  accelevents: "Accelevents",
  "software-247": "247 Software",
  intelliflow: "IntelliFlow",
  gamezzar: "Gamezzar",
  "morning-crate": "Morning Crate",
};
