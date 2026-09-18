import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/MotionRoot";
import { workSection } from "@/content/site";
import type { FeaturedProject } from "@/content/types";

type FeaturedProjectCardProps = {
  project: FeaturedProject;
  priority?: boolean;
  reverse?: boolean;
};

function highlightDescription(text: string, projectName: string) {
  const parts = text.split(new RegExp(`(${projectName}|Remix|React|GraphQL|Ant Design)`, "g"));
  return parts.map((part, index) =>
    ["Remix", "React", "GraphQL", "Ant Design", projectName].includes(part) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-paper">
        {part}
      </strong>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export function FeaturedProjectCard({
  project,
  priority = false,
  reverse = false,
}: FeaturedProjectCardProps) {
  return (
    <Reveal
      as="article"
      id={project.id}
      className="border-b border-ink-rule py-12 last:border-b-0 md:py-16"
    >
      <div
        className={`grid items-start gap-8 lg:gap-12 ${
          reverse ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1.15fr_1fr]"
        }`}
      >
        <div className={reverse ? "lg:order-2" : undefined}>
          <ProjectGallery
            projectName={project.name}
            images={project.images}
            priority={priority}
          />
        </div>

        <div className={reverse ? "lg:order-1" : undefined}>
          <p className="type-marker m-0 text-ink-text-secondary">
            {project.index} / {project.name}
          </p>
          <p className="type-caption mt-2 text-ink-text-secondary">
            {project.category}
          </p>
          <h3 className="type-project mt-4 text-paper">{project.cardTitle}</h3>
          <p className="mt-2 text-[0.9375rem] font-medium text-ink-text-secondary md:text-base">
            <strong className="font-semibold text-ink-text">{project.role}</strong>
          </p>
          {project.period ? (
            <p className="type-marker mt-2 text-ink-text-secondary">
              {project.period}
            </p>
          ) : null}
          <p className="type-card mt-5 text-ink-text">
            {highlightDescription(project.cardDescription, project.name)}
          </p>
          <p className="work-result mt-5 text-base leading-relaxed">
            {project.featuredResult}
          </p>
          <p className="mt-5 font-mono text-[0.75rem] uppercase leading-[1.8] tracking-[0.04em] text-ink-text-secondary">
            {project.stack.join(" · ")}
          </p>
          {project.stackNote ? (
            <p className="type-caption mt-1 text-ink-text-secondary">
              {project.stackNote}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-5 text-[0.9375rem] font-semibold">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow work-interactive text-paper no-underline transition-colors duration-200 hover:text-sage hover:underline"
            >
              {workSection.visitPlatform}{" "}
              <span data-arrow aria-hidden>
                ↗
              </span>
            </a>
          </div>

          <details className="details-marker mt-4 border-t border-ink-rule text-[0.9375rem]">
            <summary className="work-interactive flex min-h-11 cursor-pointer items-center justify-between gap-4 py-4 font-semibold text-paper hover:text-sage">
              {workSection.behindTheBuild}
            </summary>
            <div className="prose-stack max-w-xl pb-5 text-ink-text">
              {project.story.map((section) => (
                <div key={section.heading} className="prose-stack">
                  <h4 className="m-0 text-base font-semibold text-paper">
                    {section.heading}
                  </h4>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="type-card text-ink-text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </Reveal>
  );
}
