"use client";

import { useState } from "react";
import { approachLabel, approachStages } from "@/content/site";

export function ApproachControl() {
  const [active, setActive] = useState(0);
  const stage = approachStages[active] ?? approachStages[0];

  return (
    <div className="border-t border-rule pt-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="type-marker">{approachLabel}</span>
        <div
          className="flex gap-1.5"
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
                    : "bg-transparent text-text-secondary hover:text-ink"
                }`}
                onClick={() => {
                  setActive(index);
                }}
              >
                {item.index}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="min-h-[11.5rem] pt-5 md:min-h-[11rem]"
        aria-live="polite"
      >
        <p className="type-marker mb-2">
          {stage.index} / {stage.label}
        </p>
        <h3 className="m-0 font-serif text-[1.85rem] font-normal leading-[1.15] tracking-[-0.02em] text-ink md:text-[2.1rem]">
          {stage.title}
        </h3>
        <p className="type-card mt-3 max-w-[24rem]">{stage.body}</p>
        <div
          className="relative mt-6 h-0.5 bg-rule"
          aria-hidden
        >
          <span className="approach-progress absolute inset-0 bg-orange" style={{ transform: `scaleX(${(active + 1) / approachStages.length})` }} />
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
