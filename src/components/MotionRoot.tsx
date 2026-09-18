"use client";

import { useEffect } from "react";

/** Content is visible by default; motion never controls readability. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [...document.querySelectorAll<HTMLElement>(".reveal-target")];
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;

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
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      const element = document.getElementById(id);
      if (element) finishBranch(element);
    };
    const onPreference = () => {
      if (reduce.matches) targets.forEach(finish);
    };

    if (!reduce.matches && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer?.unobserve(element);
          element.classList.add("is-visible");
          if (reduce.matches || typeof element.animate !== "function") continue;
          const animation = element.animate(
            [{ translate: "0 22px" }, { translate: "0 0" }],
            {
              duration: 650,
              delay: Math.min(Number(element.dataset.revealDelay) || 0, 140),
              easing: "cubic-bezier(.2,.7,.2,1)",
              fill: "none",
            },
          );
          animations.set(element, animation);
          animation.onfinish = () => animations.delete(element);
        }
      }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
      for (const target of targets) {
        const bounds = target.getBoundingClientRect();
        // Never move content that the user can already see on load.
        if (bounds.top < window.innerHeight && bounds.bottom > 0) finish(target);
        else observer.observe(target);
      }
    }
    document.addEventListener("focusin", onFocus);
    window.addEventListener("hashchange", onHash);
    reduce.addEventListener("change", onPreference);
    onHash();
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("hashchange", onHash);
      reduce.removeEventListener("change", onPreference);
    };
  }, []);
  return children;
}

export function Reveal({ children, className = "", delayMs = 0, as: Tag = "div", id }: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "section" | "article" | "li";
  id?: string;
}) {
  return (
    <Tag id={id} className={`reveal-target ${className}`.trim()} data-reveal-delay={Math.min(delayMs, 140)}>
      {children}
    </Tag>
  );
}
