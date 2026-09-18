import { ApproachControl } from "@/components/ApproachControl";
import { HeroAccentLine } from "@/components/HeroAccentLine";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section className="section-space pb-10 pt-10 md:pb-12 md:pt-14" id="top">
      <div className="page-wrap">
        <div className="type-marker flex flex-wrap justify-between gap-3">
          <p className="font-bold inline-flex items-center before:mr-2.5 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-green-600 before:content-['']">
            {hero.role}
          </p>
          <p className="font-bold">{hero.location}</p>
        </div>

        <p className="type-caption mt-4 max-w-3xl">{hero.availability}</p>

        <h1 className="hero-title my-8 text-[clamp(2.85rem,8.5vw,6.5rem)] font-[650] leading-[1.04] tracking-[-0.045em] text-ink md:my-9 md:font-bold">
          {hero.headlineLine1}
          <br />
          {hero.headlineLine2Before}
          <span className="inline-flex flex-col items-start">
            <em className="serif-accent tracking-[-0.02em]">
              {hero.headlineAccent}
            </em>
            <HeroAccentLine />
          </span>
        </h1>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
          <div>
            <p className="type-prose prose-measure m-0">
              <strong className="font-semibold text-ink">
                {hero.introduction.lead}
              </strong>
              {hero.introduction.rest}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={hero.primaryAction.href}
                className="link-arrow-down inline-flex min-h-11 items-center gap-5 rounded-[3px] bg-ink px-5 py-3 text-[0.9375rem] font-semibold text-paper no-underline transition-colors duration-200 hover:bg-orange hover:text-paper"
              >
                {hero.primaryAction.label}
                <span data-arrow aria-hidden>
                  ↘
                </span>
              </a>
              <a
                href={hero.secondaryAction.href}
                className="link-arrow text-[0.9375rem] font-semibold text-ink no-underline transition-colors duration-200 hover:text-orange"
              >
                {hero.secondaryAction.label}{" "}
                <span data-arrow aria-hidden>
                  ↗
                </span>
              </a>
              <a
                href={hero.resumeAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.9375rem] font-semibold text-text-secondary no-underline transition-colors duration-200 hover:text-orange"
              >
                {hero.resumeAction.label}
              </a>
            </div>
          </div>

          <ApproachControl />
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-rule pt-6 type-caption">
          <span>{hero.experienceLine}</span>
          <span>{hero.supportingLine}</span>
          <span>Selected work below ↓</span>
        </div>
      </div>
    </section>
  );
}
