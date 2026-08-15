import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export interface Stats2Item {
  label: string;
  value: string;
}

export interface Stats2Props {
  className?: string;
  eyebrow?: string;
  stats?: Stats2Item[];
  title?: string;
}

const defaultStats: Stats2Item[] = [
  { label: "Blocks shipped", value: "120+" },
  { label: "Shared tokens", value: "1" },
  { label: "Install time", value: "<1m" },
  { label: "Themes", value: "2" },
];

export function Stats2({
  eyebrow = "Proof",
  title = "One token set, every surface",
  stats = defaultStats,
  className,
}: Stats2Props) {
  return (
    <MarketingSection className={className}>
      <section className="bg-background py-16 md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
              {eyebrow}
            </p>
            <h2 className="font-display-heading text-3xl text-primary sm:text-4xl">
              {title}
            </h2>
          </div>

          <ul className="mt-12 grid grid-cols-2 border-y md:grid-cols-4">
            {stats.map((stat, index) => (
              <li
                className={cn(
                  "flex flex-col gap-1 px-0 py-8 md:px-8 md:py-10",
                  index > 0 && "md:border-l",
                  index % 2 === 1 && "pl-6 md:pl-8",
                  index >= 2 && "border-t md:border-t-0"
                )}
                key={stat.label}
              >
                <p className="font-semibold text-4xl tabular-nums tracking-tight">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MarketingSection>
  );
}
