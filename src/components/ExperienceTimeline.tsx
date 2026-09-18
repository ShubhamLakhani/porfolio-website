"use client";

import { useEffect, useRef } from "react";
import { MOTION, prefersReducedMotion } from "@/lib/motion";

/** Measures node centers and drives the orange reading segment + ring. */
export function ExperienceTimeline({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);
  const guideRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const activeLine = activeRef.current;
    const guide = guideRef.current;
    if (!root || !activeLine || !guide) return;

    let raf = 0;
    let lastActiveId = "";

    const nodes = () =>
      [...root.querySelectorAll<HTMLElement>(".experience-node")];

    const layout = () => {
      raf = 0;
      const list = nodes();
      if (list.length === 0) return;

      const rootBox = root.getBoundingClientRect();
      const centers = list.map((node) => {
        const box = node.getBoundingClientRect();
        return box.top + box.height / 2 - rootBox.top + root.scrollTop;
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      guide.style.top = `${first}px`;
      guide.style.height = `${Math.max(0, last - first)}px`;

      const items = [
        ...root.querySelectorAll<HTMLElement>("[data-experience-item]"),
      ];
      let activeIndex = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i].hasAttribute("data-reading")) activeIndex = i;
      }
      const activeCenter = centers[activeIndex] ?? first;
      const segment = Math.max(0, activeCenter - first);
      const reduce = prefersReducedMotion();
      activeLine.style.top = `${first}px`;
      activeLine.style.height = `${segment}px`;
      activeLine.style.transitionDuration = reduce
        ? "0.01ms"
        : `${MOTION.progress + 70}ms`;

      const activeId = items[activeIndex]?.dataset.experienceId ?? "";
      if (activeId !== lastActiveId) {
        lastActiveId = activeId;
        for (const item of items) {
          const ring = item.querySelector<HTMLElement>(".experience-ring");
          if (!ring) continue;
          if (item.hasAttribute("data-reading")) {
            ring.classList.remove("is-open");
            void ring.offsetWidth;
            ring.classList.add("is-open");
          } else {
            ring.classList.remove("is-open");
          }
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(layout);
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.fonts?.ready.then(onScroll).catch(() => undefined);

    const mutation = new MutationObserver(onScroll);
    mutation.observe(root, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-reading"],
    });
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onScroll)
        : undefined;
    resizeObserver?.observe(root);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mutation.disconnect();
      resizeObserver?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="experience-timeline">
      <div className="experience-rail" aria-hidden="true">
        <span ref={guideRef} className="experience-guide-neutral" />
        <span ref={activeRef} className="experience-guide-active" />
      </div>
      {children}
    </div>
  );
}
