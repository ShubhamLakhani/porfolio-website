import type { ReactNode } from "react";

type AccentPart = {
  text: string;
  accent?: boolean;
};

type AccentTextProps = {
  parts: readonly AccentPart[];
  className?: string;
  accentClassName?: string;
};

/** Selective orange emphasis for key phrases. Keep accents sparse. */
export function AccentText({
  parts,
  className,
  accentClassName = "font-semibold text-orange",
}: AccentTextProps) {
  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.accent ? (
          <strong key={`${part.text}-${index}`} className={accentClassName}>
            {part.text}
          </strong>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </span>
  );
}

/** Bold + orange for approximate metrics and standout nouns already in copy. */
export function emphasizeMetrics(
  text: string,
  options?: { dark?: boolean },
): ReactNode {
  const accent = options?.dark
    ? "font-semibold text-sage"
    : "font-semibold text-orange";
  const pattern =
    /(\d+\+?\s*%|approximately\s+\d+\+?|\d+\+\s*(?:clinics|users|bookings)|under a second|6\+\s*years)/gi;
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  const re = new RegExp(pattern.source, pattern.flags);
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(
        <span key={`t-${key++}`}>{text.slice(last, match.index)}</span>,
      );
    }
    nodes.push(
      <strong key={`a-${key++}`} className={accent}>
        {match[0]}
      </strong>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(<span key={`t-${key++}`}>{text.slice(last)}</span>);
  }
  return nodes.length ? nodes : text;
}
