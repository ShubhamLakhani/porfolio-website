"use client";

import { useEffect, useId, useRef } from "react";
import { MOTION, prefersReducedMotion } from "@/lib/motion";

type StoryDisclosureProps = {
  label: string;
  accessibleName: string;
  children: React.ReactNode;
};

export function StoryDisclosure({
  label,
  accessibleName,
  children,
}: StoryDisclosureProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const nameId = useId();

  useEffect(() => {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;

    const setOpenHeight = (open: boolean, animate: boolean) => {
      if (prefersReducedMotion() || !animate) {
        panel.style.height = open ? "auto" : "0px";
        panel.style.overflow = open ? "visible" : "hidden";
        return;
      }
      animating.current = true;
      const start = panel.getBoundingClientRect().height;
      panel.style.height = "auto";
      const end = open ? panel.scrollHeight : 0;
      panel.style.height = `${start}px`;
      panel.style.overflow = "hidden";
      const animation = panel.animate(
        [{ height: `${start}px` }, { height: `${end}px` }],
        { duration: MOTION.disclosure, easing: MOTION.ease },
      );
      animation.onfinish = () => {
        panel.style.height = open ? "auto" : "0px";
        panel.style.overflow = open ? "visible" : "hidden";
        animating.current = false;
      };
    };

    if (!details.open) {
      panel.style.height = "0px";
      panel.style.overflow = "hidden";
    }

    const onToggle = () => {
      setOpenHeight(details.open, true);
    };

    const onResize = () => {
      if (!details.open || animating.current) return;
      panel.style.height = "auto";
    };

    details.addEventListener("toggle", onToggle);
    window.addEventListener("resize", onResize);
    return () => {
      details.removeEventListener("toggle", onToggle);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <details ref={detailsRef} className="details-marker mt-4 border-t border-ink-rule text-[0.9375rem]">
      <summary
        className="work-interactive flex min-h-11 cursor-pointer items-center justify-between gap-4 py-4 font-semibold text-paper hover:text-sage"
        aria-describedby={nameId}
      >
        {label}
        <span id={nameId} className="sr-only">
          {accessibleName}
        </span>
      </summary>
      <div ref={panelRef} className="story-disclosure-panel">
        <div className="prose-stack max-w-xl pb-5 text-ink-text">{children}</div>
      </div>
    </details>
  );
}
