import { Reveal } from "@/components/MotionRoot";
import { aboutSection } from "@/content/site";

export function About() {
  return (
    <section
      id="about"
      className="section-space border-b border-rule"
    >
      <div className="page-wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <span className="type-marker">{aboutSection.marker}</span>
          <h2 className="type-section mt-4">
            {aboutSection.titleLine1}
            <br />
            <em className="serif-accent">{aboutSection.titleAccent}</em>
          </h2>
          <p className="type-prose mt-8 border-l-2 border-orange pl-4 text-ink">
            {aboutSection.personalStatement}
          </p>
        </Reveal>

        <Reveal className="prose-stack prose-measure type-prose text-text-secondary">
          {aboutSection.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
