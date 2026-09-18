import { SkillIcon } from "@/components/SkillIcon";
import { expertiseCards } from "@/content/skills";
import { expertiseSection } from "@/content/site";
import { Reveal } from "@/components/MotionRoot";
import styles from "./Expertise.module.css";

export function Expertise() {
  return (
    <section id="expertise" className="section-space border-b border-rule">
      <div className="page-wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5 md:mb-14">
          <div className="max-w-2xl">
            <h2 className="type-section m-0">
              {expertiseSection.titleBefore}
              <em className="serif-accent">{expertiseSection.titleAccent}</em>
            </h2>
            <p className="type-prose mt-4 text-text-secondary">
              {expertiseSection.introduction}
            </p>
          </div>
          <span className="type-marker">{expertiseSection.marker}</span>
        </Reveal>
        <div className={styles.list}>
          {expertiseCards.map((group, index) => (
            <Reveal
              key={group.id}
              as="article"
              className={styles.row}
              distance={12}
              durationMs={500}
            >
              <div className={styles.overview}>
                <span className={styles.index} aria-hidden={!group.learning}>
                  {group.learning
                    ? expertiseSection.learningBadge
                    : String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.copy}>
                  <h3 id={`expertise-${group.id}-title`} className={styles.title}>
                    {group.title}
                  </h3>
                  <p className={styles.description}>{group.description}</p>
                </div>
              </div>
              <ul className={styles.skills} aria-labelledby={`expertise-${group.id}-title`}>
                {group.items.map((item) => (
                  <li key={item.id} className={styles.skill} data-wide={item.label.length > 23 || undefined}>
                    <SkillIcon name={item.icon} className={styles.icon} />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
