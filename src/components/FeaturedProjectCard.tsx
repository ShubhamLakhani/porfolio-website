"use client";

import { useEffect, useRef, useState } from "react";
import { emphasizeMetrics } from "@/components/AccentText";
import { ProjectGallery } from "@/components/ProjectGallery";
import { StoryDisclosure } from "@/components/StoryDisclosure";
import { TechStack } from "@/components/TechStack";
import { workSection } from "@/content/site";
import type { FeaturedProject } from "@/content/types";
import { prefersReducedMotion } from "@/lib/motion";

type FeaturedProjectCardProps = {
  project: FeaturedProject;
  priority?: boolean;
  reverse?: boolean;
};

function highlightDescription(text: string, projectName: string) {
  const parts = text.split(
    new RegExp(
      `(${projectName}|Remix|React|GraphQL|Ant Design|Socket\\.IO|TypeScript|Next\\.js)`,
      "g",
    ),
  );
  const accentWords = new Set([
    "Remix",
    "React",
    "GraphQL",
    "Ant Design",
    "Socket.IO",
    "TypeScript",
    "Next.js",
    projectName,
  ]);
  return parts.map((part, index) =>
    accentWords.has(part) ? (
      <strong key={`${part}-${index}`} className="font-semibold text-paper">
        {part}
      </strong>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function ResultLine({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-drawn");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.classList.add("is-drawn");
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <p ref={ref} className="work-result mt-5 text-base leading-relaxed">
      {emphasizeMetrics(text, { dark: true })}
    </p>
  );
}

export function FeaturedProjectCard({
  project,
  priority = false,
  reverse = false,
}: FeaturedProjectCardProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [canStick, setCanStick] = useState(false);

  useEffect(() => {
    const measure = () => {
      const gallery = galleryRef.current;
      if (!gallery) return;
      const wide = window.matchMedia("(min-width: 1100px)").matches;
      if (!wide) {
        setCanStick(false);
        return;
      }
      const header = document.querySelector("header");
      const workNav = document.querySelector<HTMLElement>("[data-work-nav]");
      const reserved =
        (header?.getBoundingClientRect().height ?? 0) +
        (workNav?.offsetHeight ?? 0) +
        48;
      setCanStick(gallery.offsetHeight + reserved < window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <article
      id={project.id}
      className="border-b border-ink-rule py-12 last:border-b-0 md:py-16"
    >
      <div
        className={`grid items-start gap-8 lg:gap-12 ${
          reverse ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1.15fr_1fr]"
        }`}
      >
        <div
          ref={galleryRef}
          className={`project-gallery-column ${canStick ? "is-sticky-capable" : ""} ${
            reverse ? "lg:order-2" : ""
          }`}
        >
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
          <ResultLine text={project.featuredResult} />
          <TechStack
            items={project.stack}
            note={project.stackNote}
            surface="ink"
            className="mt-6"
          />

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

          <StoryDisclosure
            label={workSection.behindTheBuild}
            accessibleName={`Full story for ${project.name}`}
          >
            {project.story.map((section) => (
              <div key={section.heading} className="prose-stack">
                <h4 className="m-0 text-base font-semibold text-paper">
                  {section.heading}
                </h4>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="type-card text-ink-text"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </StoryDisclosure>
        </div>
      </div>
    </article>
  );
}
