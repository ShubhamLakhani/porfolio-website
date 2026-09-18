"use client";

import { useCallback, useEffect, useState } from "react";
import { MOTION } from "@/lib/motion";
import { approachLabel, approachStages } from "@/content/site";

export function ApproachControl() {
  const [active, setActive] = useState(0);
  const [panelKey, setPanelKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const stage = approachStages[active] ?? approachStages[0];
  const progress = (active + 1) / approachStages.length;
  const hasPrev = active > 0;
  const hasNext = active < approachStages.length - 1;

  const select = useCallback((index: number) => {
    setActive((current) => {
      if (index === current) return current;
      setDirection(index > current ? "next" : "prev");
      setPanelKey((value) => value + 1);
      return index;
    });
  }, []);

  const go = useCallback(
    (delta: number) => {
      const next = Math.min(
        approachStages.length - 1,
        Math.max(0, active + delta),
      );
      select(next);
    },
    [active, select],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest?.("[data-approach-root]")) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="border-t border-rule pt-3" data-approach-root>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="type-marker">{approachLabel}</span>
        <div className="approach-track relative isolate">
          <div
            className="approach-track-line absolute left-5 right-5 top-1/2 z-0 h-px -translate-y-1/2 bg-rule"
            aria-hidden
          >
            <span
              className="approach-progress absolute inset-y-0 left-0 origin-left bg-orange"
              style={{
                width: "100%",
                transform: `scaleX(${progress})`,
                transitionDuration: `${MOTION.progress}ms`,
              }}
            />
          </div>
          <div
            className="relative z-10 flex gap-1.5"
            role="group"
            aria-label="Explore my approach"
          >
            {approachStages.map((item, index) => {
              const pressed = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={pressed}
                  aria-controls="approach-panel"
                  id={`approach-tab-${item.id}`}
                  aria-label={`Stage ${item.index}: ${item.label}`}
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-mono text-[0.75rem] font-medium transition-[color,background-color,transform,box-shadow] duration-200 ${
                    pressed
                      ? "bg-ink text-paper shadow-[0_0_0_3px_color-mix(in_srgb,var(--orange)_28%,transparent)]"
                      : "bg-paper text-text-secondary hover:text-ink"
                  }`}
                  onClick={() => select(index)}
                >
                  {item.index}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="type-caption m-0 text-text-secondary">
          Step {active + 1} of {approachStages.length}
          {hasNext ? (
            <span className="approach-cue ml-2 inline-flex items-center gap-1 text-orange">
              more steps
              <span className="approach-cue-arrow" aria-hidden>
                →
              </span>
            </span>
          ) : (
            <span className="ml-2 text-text-secondary">last step</span>
          )}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="approach-nav-btn inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-200 hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous step"
            disabled={!hasPrev}
            onClick={() => go(-1)}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            className={`approach-nav-btn inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-200 hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-35 ${hasNext ? "approach-nav-next" : ""}`}
            aria-label="Next step"
            disabled={!hasNext}
            onClick={() => go(1)}
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div
        id="approach-panel"
        className="approach-panel min-h-[12.5rem] pt-5 md:min-h-[12rem]"
        aria-live="polite"
      >
        <div
          key={panelKey}
          className={`approach-panel-enter approach-panel-${direction}`}
        >
          <p className="type-marker mb-2">
            {stage.index} / {stage.label}
          </p>
          <h3 className="m-0 font-serif text-[1.85rem] font-normal leading-[1.15] tracking-[-0.02em] text-ink md:text-[2.1rem]">
            {stage.title}
          </h3>
          <p className="type-card mt-3 max-w-[24rem]">{stage.body}</p>
        </div>
      </div>

      <noscript>
        <ul className="mt-4 space-y-4 type-card">
          {approachStages.map((item) => (
            <li key={item.id}>
              <strong className="text-ink">
                {item.index} / {item.label}: {item.title}
              </strong>
              <p className="mt-1">{item.body}</p>
            </li>
          ))}
        </ul>
      </noscript>
    </div>
  );
}
