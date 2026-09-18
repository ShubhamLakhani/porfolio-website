"use client";

import { useEffect } from "react";
import { MOTION } from "@/lib/motion";

/** Content is visible by default; motion never controls readability. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [...document.querySelectorAll<HTMLElement>(".reveal-target")];
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;
    let readingRaf = 0;
    let progressRaf = 0;

    const finish = (element: HTMLElement) => {
      animations.get(element)?.cancel();
      animations.delete(element);
      element.classList.add("is-visible");
      observer?.unobserve(element);
    };
    const finishBranch = (element: HTMLElement) => {
      element.querySelectorAll<HTMLElement>(".reveal-target").forEach(finish);
      let ancestor: HTMLElement | null = element;
      while (ancestor) {
        if (ancestor.matches(".reveal-target")) finish(ancestor);
        ancestor = ancestor.parentElement;
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) finishBranch(event.target);
    };
    const onHash = () => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const element = document.getElementById(id);
      if (element) finishBranch(element);
    };

    const runEntrance = (element: HTMLElement) => {
      element.classList.add("is-visible");
      if (reduceMq.matches || typeof element.animate !== "function") return;
      if (element.dataset.revealSkip === "true") return;
      const distance = element.dataset.revealDistance === "12" ? 12 : 16;
      const duration = Number(element.dataset.revealDuration) || MOTION.entrance;
      const animation = element.animate(
        [{ translate: `0 ${distance}px` }, { translate: "0 0" }],
        {
          duration,
          delay: Math.min(Number(element.dataset.revealDelay) || 0, 140),
          easing: MOTION.ease,
          fill: "none",
        },
      );
      animations.set(element, animation);
      animation.onfinish = () => animations.delete(element);
    };

    if (!reduceMq.matches && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            observer?.unobserve(element);
            runEntrance(element);
          }
        },
        { threshold: 0, rootMargin: "0px 0px -28px 0px" },
      );
      for (const target of targets) {
        const bounds = target.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) finish(target);
        else observer.observe(target);
      }
    } else {
      targets.forEach(finish);
    }

    const updateReadingAccents = () => {
      readingRaf = 0;
      const header = document.querySelector("header");
      const workNav = document.querySelector<HTMLElement>("[data-work-nav]");
      const headerBottom =
        (header?.getBoundingClientRect().bottom ?? 0) +
        (workNav?.offsetHeight ?? 0);
      const band = headerBottom + (window.innerHeight - headerBottom) * 0.33;
      const tolerance = 28;

      const activateClosest = (selector: string, attr: string) => {
        const items = [...document.querySelectorAll<HTMLElement>(selector)];
        let best: HTMLElement | null = null;
        let bestDist = Number.POSITIVE_INFINITY;
        for (const item of items) {
          const heading =
            item.querySelector<HTMLElement>("h3, [data-reading-anchor]") ?? item;
          const top = heading.getBoundingClientRect().top;
          const dist = Math.abs(top - band);
          if (top <= band + tolerance && dist < bestDist) {
            best = item;
            bestDist = dist;
          }
        }
        for (const item of items) {
          if (item === best) item.setAttribute(attr, "true");
          else item.removeAttribute(attr);
        }
      };

      activateClosest("#expertise article", "data-reading");
      activateClosest("#experience [data-experience-item]", "data-reading");
    };

    const updateScrollProgress = () => {
      progressRaf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      doc.style.setProperty("--scroll-progress", String(progress));
    };

    const onScroll = () => {
      if (!readingRaf) readingRaf = window.requestAnimationFrame(updateReadingAccents);
      if (!progressRaf) progressRaf = window.requestAnimationFrame(updateScrollProgress);
    };

    const onPreference = () => {
      if (reduceMq.matches) targets.forEach(finish);
      updateReadingAccents();
      updateScrollProgress();
    };

    document.addEventListener("focusin", onFocus);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduceMq.addEventListener("change", onPreference);
    onHash();
    updateReadingAccents();
    updateScrollProgress();

    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduceMq.removeEventListener("change", onPreference);
      if (readingRaf) window.cancelAnimationFrame(readingRaf);
      if (progressRaf) window.cancelAnimationFrame(progressRaf);
    };
  }, []);

  return children;
}

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
  id,
  distance = 16,
  durationMs = MOTION.entrance,
  skipMotion = false,
  experienceItem = false,
  experienceId,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "section" | "article" | "li";
  id?: string;
  distance?: 12 | 16;
  durationMs?: number;
  skipMotion?: boolean;
  experienceItem?: boolean;
  experienceId?: string;
}) {
  return (
    <Tag
      id={id}
      className={`reveal-target ${className}`.trim()}
      data-reveal-delay={Math.min(delayMs, 140)}
      data-reveal-distance={distance}
      data-reveal-duration={durationMs}
      data-reveal-skip={skipMotion ? "true" : undefined}
      data-experience-item={experienceItem ? "" : undefined}
      data-experience-id={experienceId}
    >
      {children}
    </Tag>
  );
}
