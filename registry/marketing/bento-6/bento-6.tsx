import { ArrowUpRightIcon, CheckIcon, SparklesIcon } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";

const PULSE_HEIGHTS = [
  { height: 38, id: "start" },
  { height: 52, id: "rise" },
  { height: 45, id: "dip" },
  { height: 68, id: "lift" },
  { height: 61, id: "steady" },
  { height: 78, id: "signal" },
  { height: 84, id: "peak" },
  { height: 72, id: "settle" },
  { height: 88, id: "high" },
  { height: 84, id: "current" },
] as const;

export interface Bento6Props {
  className?: string;
  description?: string;
  title?: string;
}

export function Bento6({
  className,
  description = "The small signals add up. Keep the overview close, and the useful detail closer.",
  title = "Everything in view, nothing in the way",
}: Bento6Props) {
  return (
    <MarketingSection className={className}>
      <section className="bg-background px-6 py-20 text-foreground md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-balance font-display-heading text-4xl leading-[1.08] tracking-tight md:text-6xl">
              {title}
            </h2>
            <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-12 md:grid-rows-[auto_auto]">
            <article className="relative overflow-hidden rounded-xl border border-border bg-foreground p-6 text-background md:col-span-7 md:row-span-2 md:p-8">
              <div className="absolute right-0 bottom-0 size-56 rounded-full bg-blue-400/15 blur-3xl" />
              <div className="relative flex h-full min-h-96 flex-col justify-between">
                <div className="flex items-center justify-between text-background/65 text-xs">
                  <span>Workspace pulse</span>
                  <SparklesIcon aria-hidden className="size-4 text-blue-300" />
                </div>
                <div className="relative py-12">
                  <p className="font-mono text-6xl tracking-tighter md:text-8xl">
                    84%
                  </p>
                  <p className="mt-3 max-w-xs text-background/65 text-sm">
                    of open work has a clear owner and a next step.
                  </p>
                  <div className="mt-8 flex h-16 items-end gap-1.5">
                    {PULSE_HEIGHTS.map(({ height, id }) => (
                      <span
                        className="flex-1 rounded-t-sm bg-blue-300/80"
                        key={`pulse-${id}`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 border-background/15 border-t pt-4 text-background/65 text-xs">
                  <span className="size-1.5 rounded-full bg-blue-300" /> Updated
                  just now
                </div>
              </div>
            </article>

            <article className="rounded-xl border border-border bg-card p-6 md:col-span-5 md:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-xs">Next up</p>
                  <h3 className="mt-2 font-heading font-medium text-xl tracking-tight">
                    Review pricing brief
                  </h3>
                </div>
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-4 text-blue-500"
                />
              </div>
              <div className="mt-10 flex items-center gap-3 border-border border-t pt-4 text-muted-foreground text-xs">
                <span className="font-mono text-foreground">Today</span>
                <span>·</span>
                <span>18 min read</span>
              </div>
            </article>

            <article className="rounded-xl border border-border bg-muted/35 p-6 md:col-span-5 md:p-7">
              <p className="text-muted-foreground text-xs">Quiet confidence</p>
              <div className="mt-5 space-y-3">
                {[
                  "Context is attached",
                  "Owner is notified",
                  "Decision is searchable",
                ].map((item) => (
                  <div className="flex items-center gap-3 text-sm" key={item}>
                    <span className="flex size-5 items-center justify-center rounded-full bg-background text-blue-500 ring-1 ring-border">
                      <CheckIcon aria-hidden className="size-3" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
