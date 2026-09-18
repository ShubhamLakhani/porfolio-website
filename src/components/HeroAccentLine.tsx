"use client";

import { useEffect, useRef } from "react";

/** Draws the short orange underline under the hero accent word once after load. */
export function HeroAccentLine() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      el.classList.add("is-drawn");
      return;
    }
    const id = window.requestAnimationFrame(() => el.classList.add("is-drawn"));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return <span ref={ref} className="hero-accent-line" aria-hidden="true" />;
}
