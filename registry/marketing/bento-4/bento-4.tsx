import { cn } from "@/lib/utils";

export interface Bento4Metric {
  label: string;
  value: string;
}

export interface Bento4Tile {
  description: string;
  title: string;
}

export interface Bento4Props {
  className?: string;
  description?: string;
  metrics?: Bento4Metric[];
  tiles?: Bento4Tile[];
  title?: string;
}

const defaultMetrics: Bento4Metric[] = [
  { label: "Time to first page", value: "12 min" },
  { label: "Shared primitives", value: "38" },
  { label: "Marketing families", value: "14" },
  { label: "App surfaces", value: "9" },
];

const defaultTiles: Bento4Tile[] = [
  {
    description:
      "Install IDs stay category-n. Story titles name the layout job, not the demo headline.",
    title: "Predictable slugs",
  },
  {
    description:
      "Buttons stay weight 400 and 36px tall. Emphasis is size, not a heavier label.",
    title: "Quiet chrome",
  },
  {
    description:
      "Featured plans get a Popular badge at 10% fill — never a dark inverted card.",
    title: "Badge, not invert",
  },
];

export function Bento4({
  title = "Numbers the grid can hold",
  description = "A KPI strip over three copy tiles. Proof first, then the reasons.",
  metrics = defaultMetrics,
  tiles = defaultTiles,
  className,
}: Bento4Props) {
  return (
    <section
      className={cn(
        "w-full bg-background py-16 text-foreground md:py-20 lg:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display-heading text-3xl sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-border">
          <ul className="grid grid-cols-2 bg-card md:grid-cols-4">
            {metrics.map((metric, index) => (
              <li
                className={cn(
                  "flex flex-col gap-1 border-b p-6",
                  index % 2 === 0 ? "border-r md:border-r" : "md:border-r",
                  index === metrics.length - 1
                    ? "border-r-0 md:border-r-0"
                    : null
                )}
                key={metric.label}
              >
                <p className="font-semibold text-2xl tabular-nums tracking-tight md:text-3xl">
                  {metric.value}
                </p>
                <p className="text-muted-foreground text-sm">{metric.label}</p>
              </li>
            ))}
          </ul>

          <ul className="grid grid-cols-1 md:grid-cols-3">
            {tiles.map((tile, index) => (
              <li
                className={cn(
                  "flex flex-col gap-2 bg-card p-6 md:p-8",
                  index < tiles.length - 1
                    ? "border-b md:border-r md:border-b-0"
                    : null
                )}
                key={tile.title}
              >
                <h3 className="font-heading font-semibold text-title-md">
                  {tile.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {tile.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
