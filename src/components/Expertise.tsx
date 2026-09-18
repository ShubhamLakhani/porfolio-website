import { SkillIcon } from "@/components/SkillIcon";
import { expertiseCards } from "@/content/skills";
import { expertiseSection } from "@/content/site";
import { Reveal } from "@/components/MotionRoot";

export function Expertise() {
  return (
    <section id="expertise" className="section-space border-b border-rule">
      <div className="page-wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <h2 className="type-section m-0">
              {expertiseSection.titleBefore}
              <em className="serif-accent">{expertiseSection.titleAccent}</em>
            </h2>
            <p className="type-prose mt-4 text-text-secondary">{expertiseSection.introduction}</p>
          </div>
          <span className="type-marker">{expertiseSection.marker}</span>
        </Reveal>
        <div className="expertise-grid">
          {expertiseCards.map((card, index) => (
            <article
              key={card.id}
              className="expertise-card reveal-target"
              data-reveal-delay={(index % 2) * 80}
              data-learning={card.learning ? "true" : undefined}
              aria-labelledby={`expertise-${card.id}-title`}
            >
              <div className="expertise-heading">
                <span className="shrink-0 text-ink"><SkillIcon name={card.categoryIcon} className="h-6 w-6" /></span>
                <h3 id={`expertise-${card.id}-title`} className="type-card-title m-0 min-w-0">{card.title}</h3>
                {card.learning ? (
                  <span className="ml-auto rounded-full border border-rule px-2 py-1 text-xs font-semibold text-ink">{expertiseSection.learningBadge}</span>
                ) : (
                  <span className="expertise-count" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                )}
              </div>
              <p className="type-card expertise-description">{card.description}</p>
              <ul className="skill-list">
                {card.items.map((item) => (
                  <li key={item.id} className="skill-item" data-wide={item.label.length > 23 ? "true" : undefined}>
                    <SkillIcon name={item.icon} />
                    <span className="type-skill">{item.label}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
