import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import { Reveal } from "@/components/MotionRoot";
import { featuredProjects } from "@/content/projects";
import { workSection } from "@/content/site";

export function FeaturedWork() {
  return (
    <section data-surface="ink" id="work" className="bg-ink text-paper">
      <div className="page-wrap py-14 md:py-20">
        <Reveal className="mb-4 flex flex-wrap items-end justify-between gap-5 md:mb-6">
          <div className="max-w-2xl">
            <h2 className="type-section m-0 text-paper">
              {workSection.titleBefore}
              <em className="font-serif italic font-normal text-orange">
                {workSection.titleAccent}
              </em>
            </h2>
            <p className="type-prose mt-4 text-ink-text">{workSection.introduction}</p>
          </div>
          <span className="type-marker text-ink-text-secondary">
            {workSection.marker}
          </span>
        </Reveal>

        <div>
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              priority={index === 0}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
