import { MarketingSection } from "@/components/marketing-section";

export interface Stats1Item {
  label: string;
  value: string;
}

export interface Stats1Props {
  className?: string;
  description?: string;
  stats?: Stats1Item[];
  title?: string;
}

const defaultStats: Stats1Item[] = [
  { label: "Marketing Blocks", value: "40+" },
  { label: "Page Categories", value: "12" },
];

export function Stats1({
  title = "Nice UI in stats",
  description = "Ship heroes, pricing, and footers that already share a type scale, so the marketing site does not look assembled from leftovers.",
  stats = defaultStats,
  className,
}: Stats1Props) {
  return (
    <MarketingSection className={className}>
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="sr-only">{title}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div className="space-y-0.5 md:text-center" key={stat.label}>
                <div className="font-bold text-4xl text-primary tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
            {description ? (
              <p className="col-span-2 text-balance border-t pt-4 text-lg text-muted-foreground md:border-t-0 md:border-l md:pt-0 md:pl-12">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
