/** Shared motion timing. Opacity never gates readability. */
export const MOTION = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  interaction: 200,
  layout: 300,
  entrance: 550,
  imageEntrance: 700,
  underline: 800,
  resultRule: 450,
  crossfade: 220,
  disclosure: 280,
  stage: 220,
  progress: 350,
  reading: 300,
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function hasInteriorHash(): boolean {
  if (typeof window === "undefined") return false;
  const hash = window.location.hash.slice(1);
  return Boolean(hash) && hash !== "top" && hash !== "main";
}
