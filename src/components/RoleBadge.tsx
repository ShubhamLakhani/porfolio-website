"use client";

import { hero } from "@/content/site";

/** Animated role marker: soft container, living green pulse, light hover lift. */
export function RoleBadge() {
  return (
    <div
      className="role-badge group inline-flex max-w-full items-center gap-3 rounded-[4px] border border-rule bg-card px-3.5 py-2.5 shadow-[0_1px_0_color-mix(in_srgb,var(--ink)_4%,transparent)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--orange)_35%,var(--rule))] hover:shadow-[0_10px_28px_color-mix(in_srgb,var(--ink)_8%,transparent)]"
      aria-label={hero.role}
    >
      <span className="role-badge-marker relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center" aria-hidden>
        <span className="role-badge-pulse absolute inset-0 rounded-full bg-green-600/35" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-green-600" />
      </span>
      <p className="type-marker m-0 font-bold normal-case tracking-[0.04em] text-ink">
        <span className="text-text-secondary">Senior </span>
        <strong className="font-bold text-orange">Full-Stack</strong>
        <span> Engineer</span>
      </p>
    </div>
  );
}
