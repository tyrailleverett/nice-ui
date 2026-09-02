import { MarketingSection } from "@/components/marketing-section";
export interface Stats5Item {
  label: string;
  note?: string;
  value: string;
}
export interface Stats5Props {
  className?: string;
  stats?: Stats5Item[];
  title?: string;
}
const defaultStats: Stats5Item[] = [
  { label: "ready-to-compose blocks", note: "and counting", value: "48" },
  { label: "marketing categories", note: "from hero to footer", value: "12" },
  { label: "typed React props", note: "built for adaptation", value: "100%" },
  { label: "registry edits required", note: "for this pack", value: "0" },
  { label: "shared visual language", note: "across every surface", value: "1" },
];
export function Stats5({
  title = "Small system. Broad reach.",
  stats = defaultStats,
  className,
}: Stats5Props) {
  return (
    <MarketingSection className={className}>
      <section aria-labelledby="stats-5-title" className="p-4 md:p-8">
        <h2 className="sr-only" id="stats-5-title">
          {title}
        </h2>
        <div className="grid border-y sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <article
              className="space-y-3 border-border border-b p-5 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0"
              key={stat.label}
            >
              <p className="font-bold text-4xl tabular-nums tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm">{stat.label}</p>
              {stat.note ? (
                <p className="font-mono text-muted-foreground text-xs uppercase">
                  {stat.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </MarketingSection>
  );
}
