"use client";

import { useState } from "react";
import { MOTION } from "@/lib/motion";
import { approachLabel, approachStages } from "@/content/site";

export function ApproachControl() {
  const [active, setActive] = useState(0);
  const [panelKey, setPanelKey] = useState(0);
  const stage = approachStages[active] ?? approachStages[0];
  const progress = (active + 1) / approachStages.length;

  const select = (index: number) => {
    if (index === active) return;
    setActive(index);
    setPanelKey((value) => value + 1);
  };

  return (
    <div className="border-t border-rule pt-3">
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
                  aria-label={`Stage ${item.index}: ${item.label}`}
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-mono text-[0.75rem] font-medium transition-colors duration-200 ${
                    pressed
                      ? "bg-ink text-paper"
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

      <div
        className="approach-panel min-h-[12.5rem] pt-5 md:min-h-[12rem]"
        aria-live="polite"
      >
        <div key={panelKey} className="approach-panel-enter">
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
