import type { ReactNode } from "react";

import { DecorIcon } from "@/components/decor-icon";
import { MarketingSection } from "@/components/marketing-section";

export interface Stats4Item {
  label: string;
  value: string;
}

export interface Stats4Props {
  className?: string;
  description?: ReactNode;
  stats?: Stats4Item[];
  title?: string;
}

const defaultStats: Stats4Item[] = [
  { label: "Conversion Rate", value: "+85%" },
  { label: "Active Users", value: "12K" },
  { label: "Revenue Growth", value: "40%" },
];

const defaultDescription = (
  <>
    Our platform has helped companies{" "}
    <strong className="font-semibold text-foreground">
      increase conversion rates and boost engagement
    </strong>{" "}
    across all digital channels.
  </>
);

export function Stats4({
  title = "Delivering measurable Results",
  description = defaultDescription,
  stats = defaultStats,
  className,
}: Stats4Props) {
  const lastLabel = stats.at(-1)?.label;

  return (
    <MarketingSection className={className}>
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-display-heading text-3xl sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>

          <div className="relative mt-16">
            <DecorIcon className="size-4" position="top-left" />
            <DecorIcon className="size-4" position="top-right" />
            <DecorIcon className="size-4" position="bottom-left" />
            <DecorIcon className="size-4" position="bottom-right" />

            <div className="grid border-y md:grid-cols-3">
              {stats.map((stat) => {
                const isLast = stat.label === lastLabel;

                return (
                  <div
                    className="relative flex flex-col items-center justify-center border-t px-6 py-12 first:border-t-0 md:border-t-0 md:border-l md:py-16 md:first:border-l-0"
                    key={stat.label}
                  >
                    <p className="font-semibold text-4xl tabular-nums tracking-tight sm:text-5xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-muted-foreground text-sm">
                      {stat.label}
                    </p>
                    {isLast ? null : (
                      <>
                        <DecorIcon
                          className="hidden size-4 md:block"
                          position="top-right"
                        />
                        <DecorIcon
                          className="hidden size-4 md:block"
                          position="bottom-right"
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
