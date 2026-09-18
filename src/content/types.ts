export type ApproachStage = {
  id: string;
  label: string;
  index: string;
  title: string;
  body: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  /**
   * Pixels of browser chrome (or tooltip) to hide from the top in card
   * previews only. Lightbox always shows the full original. Use 0 when
   * the supplied file has no chrome to remove.
   */
  cropTopPx: number;
  width: number;
  height: number;
};

export type CaseSection = {
  heading: string;
  paragraphs: string[];
};

export type FeaturedProject = {
  id: string;
  name: string;
  index: string;
  category: string;
  role: string;
  period?: string;
  cardTitle: string;
  cardDescription: string;
  featuredResult: string;
  stack: string[];
  stackNote?: string;
  url: string;
  images: ProjectImage[];
  story: CaseSection[];
};

export type AdditionalProject = {
  id: string;
  name: string;
  category: string;
  role?: string;
  period?: string;
  description: string;
  stack: string[];
};

export type SkillItem = {
  id: string;
  label: string;
  icon: string;
};

export type ExpertiseCard = {
  id: string;
  title: string;
  description: string;
  categoryIcon: string;
  learning?: boolean;
  items: SkillItem[];
};

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  summary: string;
  relatedProjectIds: string[];
  note?: string;
};

export type Education = {
  qualification: string;
  institution: string;
  dates: string;
};
