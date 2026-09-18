import { SkillIcon } from "@/components/SkillIcon";

const STACK_ICONS: Record<string, string> = {
  React: "react",
  Remix: "remix",
  Redux: "redux",
  "Redux Toolkit": "redux",
  "Node.js": "nodejs",
  MongoDB: "mongodb",
  "OAuth 2.0": "lock",
  TypeScript: "typescript",
  "Next.js": "nextjs",
  "Socket.IO": "socketio",
  AWS: "aws",
  Docker: "docker",
  "Ant Design": "antd",
  GraphQL: "graphql",
  Express: "express",
  MySQL: "mysql",
  "Leaflet.js": "globe",
  EJS: "ejs",
};

type TechStackProps = {
  items: readonly string[];
  note?: string;
  /** Ink surface uses lighter chips; paper uses outlined chips. */
  surface?: "ink" | "paper";
  className?: string;
};

export function TechStack({
  items,
  note,
  surface = "paper",
  className = "",
}: TechStackProps) {
  const ink = surface === "ink";

  return (
    <div className={className}>
      <ul
        className="tech-stack m-0 flex list-none flex-wrap gap-2 p-0"
        aria-label="Technologies used"
      >
        {items.map((item) => {
          const icon = STACK_ICONS[item];
          return (
            <li
              key={item}
              className={`tech-chip inline-flex items-center gap-1.5 rounded-[3px] px-2.5 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.04em] transition-[transform,background-color,border-color,color] duration-200 ${
                ink
                  ? "border border-ink-rule bg-[color-mix(in_srgb,var(--paper)_6%,transparent)] text-ink-text-secondary hover:border-sage hover:text-paper"
                  : "border border-rule bg-card text-text-secondary hover:border-orange hover:text-ink"
              }`}
            >
              {icon ? (
                <SkillIcon
                  name={icon}
                  className={`h-3.5 w-3.5 shrink-0 ${ink ? "text-sage" : "text-orange"}`}
                />
              ) : null}
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
      {note ? (
        <p
          className={`type-caption mt-2 ${ink ? "text-ink-text-secondary" : "text-text-secondary"}`}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}
