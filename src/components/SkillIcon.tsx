import { resolveSkillIcon } from "@/lib/skill-icons";

type SkillIconProps = {
  name: string;
  className?: string;
};

/** Decorative skill/category mark. Always paired with a visible text label. */
export function SkillIcon({ name, className = "h-5 w-5" }: SkillIconProps) {
  const def = resolveSkillIcon(name);

  if (def.kind === "brand") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <path d={def.icon.path} fill="currentColor" />
      </svg>
    );
  }

  const Icon = def.icon;
  return <Icon className={className} aria-hidden="true" focusable="false" strokeWidth={1.75} />;
}
