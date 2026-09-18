"use client";

import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "@/content/projects";
import { workSection } from "@/content/site";

/**
 * Active project = last whose top has crossed the reading line below the
 * visible header. Nav height counts only while sticky (desktop). Default = first.
 */
export function WorkProjectNav() {
  const [activeId, setActiveId] = useState(featuredProjects[0]?.id ?? "");
  const [sticky, setSticky] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const work = document.getElementById("work");
      const header = document.querySelector("header");
      const nav = navRef.current;
      if (!work || !header || !nav) return;

      const headerBottom = header.getBoundingClientRect().bottom;
      const workRect = work.getBoundingClientRect();
      const wide = window.matchMedia("(min-width: 1100px)").matches;
      const inWork =
        workRect.top < headerBottom + 8 && workRect.bottom > headerBottom + 80;
      const nextSticky = wide && inWork;
      setSticky(nextSticky);

      const navHeight = nextSticky ? nav.offsetHeight : 0;
      document.documentElement.style.setProperty(
        "--work-nav-h",
        `${navHeight}px`,
      );

      const readingLine = headerBottom + navHeight + 12;
      let current = featuredProjects[0]?.id ?? "";
      for (const project of featuredProjects) {
        const el = document.getElementById(project.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= readingLine) {
          current = project.id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    window.addEventListener("popstate", onScroll);
    document.fonts?.ready.then(onScroll).catch(() => undefined);

    const work = document.getElementById("work");
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && work
        ? new ResizeObserver(onScroll)
        : undefined;
    if (work && resizeObserver) resizeObserver.observe(work);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
      window.removeEventListener("popstate", onScroll);
      resizeObserver?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      data-work-nav
      data-sticky={sticky ? "true" : undefined}
      className="work-project-nav"
      aria-label={workSection.projectNavLabel}
    >
      <div className="work-project-nav-inner page-wrap">
        <div className="work-project-nav-links">
          {featuredProjects.map((project, index) => (
            <a
              key={project.id}
              href={`#${project.id}`}
              data-project-id={project.id}
              aria-current={activeId === project.id ? "location" : undefined}
              className="work-project-nav-link"
            >
              <span className="work-project-nav-label">{project.name}</span>
              {index < featuredProjects.length - 1 ? (
                <span className="work-project-nav-sep" aria-hidden>
                  ·
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
