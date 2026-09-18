"use client";

import { useEffect, useRef } from "react";
import { MOTION, hasInteriorHash, prefersReducedMotion } from "@/lib/motion";
import { hero } from "@/content/site";

/** Draws the full-width orange underline under the hero accent word once. */
export function HeroAccentLine({ delayMs = 150 }: { delayMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || hasInteriorHash()) {
      el.classList.add("is-drawn");
      return;
    }
    const timer = window.setTimeout(() => el.classList.add("is-drawn"), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return <span ref={ref} className="hero-accent-line" aria-hidden="true" />;
}

export function ContactAccentLine() {
  const ref = useRef<HTMLSpanElement>(null);

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
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} className="contact-accent-line" aria-hidden="true" />;
}

export function HeroHeadline() {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!prefersReducedMotion() && !hasInteriorHash()) {
      el.classList.add("hero-title-animate");
    }
  }, []);

  return (
    <h1
      ref={rootRef}
      className="hero-title my-8 text-[clamp(2.85rem,8.5vw,6.5rem)] font-[650] leading-[1.04] tracking-[-0.045em] text-ink md:my-9 md:font-bold"
    >
      <span className="hero-line hero-line-1">{hero.headlineLine1}</span>
      <br />
      <span className="hero-line hero-line-2">
        {hero.headlineLine2Before}
        <span className="inline-flex flex-col items-start">
          <em className="serif-accent tracking-[-0.02em]">
            {hero.headlineAccent}
          </em>
          <HeroAccentLine delayMs={150} />
        </span>
      </span>
    </h1>
  );
}

void MOTION;
