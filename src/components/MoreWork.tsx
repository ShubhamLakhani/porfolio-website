"use client";

import { useState } from "react";
import { Reveal } from "@/components/MotionRoot";
import { TechStack } from "@/components/TechStack";
import { additionalProjects } from "@/content/projects";
import { moreWorkSection } from "@/content/site";

export function MoreWork() {
  const [open, setOpen] = useState(true);

  return (
    <section className="section-space border-b border-rule" id="more-work">
      <div className="page-wrap">
        <Reveal className="max-w-2xl">
          <h2 className="type-section m-0">
            {moreWorkSection.titleBefore}
            <em className="serif-accent">{moreWorkSection.titleAccent}</em>
          </h2>
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
          <div className="more-work-grid grid gap-4 pb-2 sm:grid-cols-2">
            {additionalProjects.map((project, index) => (
              <article
                key={project.id}
                id={project.id}
                className="more-work-card group relative overflow-hidden rounded-[4px] border border-rule bg-card p-5 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--orange)_40%,var(--rule))] hover:shadow-[0_14px_32px_color-mix(in_srgb,var(--ink)_8%,transparent)] md:p-6"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-orange transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="type-marker m-0 text-orange">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="type-caption m-0">{project.category}</p>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink">
                  {project.name}
                </h3>
                {project.role ? (
                  <p className="type-caption mt-1.5 text-text-secondary">
                    {project.role}
                  </p>
                ) : null}
                <p className="type-prose mt-4 text-[0.9375rem] text-text-secondary md:text-base">
                  {project.description}
                </p>
                <TechStack items={project.stack} className="mt-5" />
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
