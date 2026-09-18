import { Reveal } from "@/components/MotionRoot";
import {
  education,
  experienceEntries,
  projectNameById,
} from "@/content/experience";
import { additionalProjects, featuredProjects } from "@/content/projects";
import { experienceSection } from "@/content/site";

function projectHref(id: string): string {
  if (featuredProjects.some((project) => project.id === id)) return `#${id}`;
  if (additionalProjects.some((project) => project.id === id)) return `#${id}`;
  return "#work";
}

export function Experience() {
  return (
    <section
      id="experience"
      className="section-space border-b border-rule"
    >
      <div className="page-wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <h2 className="type-section m-0 max-w-xl">
            {experienceSection.titleBefore}
            <em className="serif-accent">{experienceSection.titleAccent}</em>
          </h2>
          <span className="type-marker">{experienceSection.marker}</span>
        </Reveal>

        <ol className="m-0 list-none border-t border-rule p-0">
          {experienceEntries.map((entry, index) => (
            <Reveal
              key={entry.id}
              as="li"
              delayMs={Math.min(index * 50, 210)}
              className="grid gap-3 border-b border-rule py-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] md:gap-8"
            >
              <div>
                <h3 className="m-0 text-lg font-semibold text-ink md:text-xl">
                  {entry.company}
                </h3>
                <p className="mt-1 text-[0.9375rem] font-medium text-text-secondary">
                  {entry.role}
                </p>
                <p className="type-marker mt-2">{entry.dates}</p>
                <p className="type-caption mt-1">{entry.location}</p>
              </div>
              <div>
                <p className="type-prose m-0 text-text-secondary">{entry.summary}</p>
                {entry.note ? (
                  <p className="type-marker mt-3">{entry.note}</p>
                ) : null}
                {entry.relatedProjectIds.length > 0 ? (
                  <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.9375rem] font-semibold">
                    {entry.relatedProjectIds.map((id) => (
                      <a
                        key={id}
                        href={projectHref(id)}
                        className="text-ink no-underline transition-colors duration-200 hover:text-orange"
                      >
                        {projectNameById[id] ?? id} ↓
                      </a>
                    ))}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 border border-rule bg-card px-5 py-6 md:px-7">
          <p className="type-marker m-0">{experienceSection.educationLabel}</p>
          <h3 className="mt-3 text-lg font-semibold text-ink">
            {education.qualification}
          </h3>
          <p className="type-card mt-2">{education.institution}</p>
          <p className="type-marker mt-1">{education.dates}</p>
        </Reveal>
      </div>
    </section>
  );
}
