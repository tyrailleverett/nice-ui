import type { ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";

export interface Stats3Item {
  description: ReactNode;
  value: string;
}

export interface Stats3Props {
  className?: string;
  description?: ReactNode;
  stats?: Stats3Item[];
  title?: ReactNode;
}

const defaultTitle = (
  <>
    Building marketing pages that{" "}
    <strong className="font-semibold text-foreground">
      already look finished
    </strong>
  </>
);

const defaultDescription = (
  <>
    Drop in sections that share one type scale and one border language, so{" "}
    <strong className="font-medium text-foreground">
      dark mode is not an afterthought
    </strong>
    .
  </>
);

const defaultStats: Stats3Item[] = [
  {
    description: (
      <>
        <strong className="font-medium text-foreground">
          Ready-to-copy sections
        </strong>{" "}
        for heroes, pricing, FAQs, and footers. Compose a landing page without
        inventing a new layout for every block.
      </>
    ),
    value: "40+",
  },
  {
    description: (
      <>
        <strong className="font-medium text-foreground">One token set</strong>{" "}
        across every section. Change the theme once and the whole marketing
        surface follows.
      </>
    ),
    value: "1",
  },
];

export function Stats3({
  title = defaultTitle,
  description = defaultDescription,
  stats = defaultStats,
  className,
}: Stats3Props) {
  return (
    <MarketingSection className={className}>
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16">
          <div className="space-y-4">
            <h2 className="text-balance font-display-heading text-3xl text-muted-foreground sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="text-pretty text-lg text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          <ul className="space-y-8">
            {stats.map((stat) => (
              <li className="border-primary border-l-2 pl-6" key={stat.value}>
                <p className="font-bold text-3xl tabular-nums tracking-tight sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-muted-foreground">{stat.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MarketingSection>
  );
}
