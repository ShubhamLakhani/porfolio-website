"use client";

import { useState } from "react";
import { Reveal } from "@/components/MotionRoot";
import { additionalProjects } from "@/content/projects";
import { moreWorkSection } from "@/content/site";

export function MoreWork() {
  const [open, setOpen] = useState(true);

  return (
    <section
      className="section-space border-b border-rule"
      id="more-work"
    >
      <div className="page-wrap">
        <Reveal className="max-w-2xl">
          <h2 className="type-section m-0">{moreWorkSection.title}</h2>
          <p className="type-prose mt-4 text-text-secondary">
            {moreWorkSection.introduction}
          </p>
        </Reveal>

        <details
          className="details-marker mt-8 border-t border-rule"
          open={open}
          onToggle={(event) => {
            setOpen((event.target as HTMLDetailsElement).open);
          }}
        >
          <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 py-4 text-[0.9375rem] font-semibold text-ink">
            {open
              ? moreWorkSection.collapseLabel
              : moreWorkSection.expandLabel}
          </summary>
          <div className="divide-y divide-rule pb-2">
            {additionalProjects.map((project) => (
              <article
                key={project.id}
                id={project.id}
                className="py-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="m-0 text-xl font-semibold tracking-[-0.02em] text-ink">
                    {project.name}
                  </h3>
                  {project.period ? (
                    <span className="type-marker">{project.period}</span>
                  ) : null}
                </div>
                <p className="type-caption mt-2">{project.category}</p>
                {project.role ? (
                  <p className="type-caption mt-1">{project.role}</p>
                ) : null}
                <p className="type-prose mt-4 max-w-3xl text-text-secondary">
                  {project.description}
                </p>
                <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.04em] text-text-secondary">
                  {project.stack.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
