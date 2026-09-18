import { AccentText } from "@/components/AccentText";
import { ApproachControl } from "@/components/ApproachControl";
import { HeroHeadline } from "@/components/HeroAccentLine";
import { RoleBadge } from "@/components/RoleBadge";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section className="section-space pb-10 pt-10 md:pb-12 md:pt-14" id="top">
      <div className="page-wrap">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <RoleBadge />
          <p className="type-marker font-bold">{hero.location}</p>
        </div>

        <p className="type-caption mt-5 max-w-3xl text-[0.9375rem] md:text-base">
          <AccentText parts={hero.availabilityParts} />
        </p>

        <HeroHeadline />

        <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
          <div>
            <p className="type-prose prose-measure m-0">
              <strong className="font-semibold text-ink">
                {hero.introduction.lead}
              </strong>
              {hero.introduction.restBefore}
              <strong className="font-semibold text-orange">
                {hero.introduction.yearsAccent}
              </strong>
              {hero.introduction.restAfter}
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
