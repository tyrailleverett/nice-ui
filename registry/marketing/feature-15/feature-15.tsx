import {
  ArrowUpRightIcon,
  CheckIcon,
  CircleDotIcon,
  GitBranchIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export interface Feature15Step {
  description: string;
  eyebrow: string;
  title: string;
}

export interface Feature15Props {
  className?: string;
  steps?: Feature15Step[];
  title?: ReactNode;
}

const defaultSteps: Feature15Step[] = [
  {
    description:
      "Connect the sources your team already trusts. We keep the shape intact so context travels with every handoff.",
    eyebrow: "01 / Gather",
    title: "Bring the signal together.",
  },
  {
    description:
      "Rules, owners, and review windows turn a noisy stream into a calm operating rhythm with no new ceremony.",
    eyebrow: "02 / Shape",
    title: "Make the next move obvious.",
  },
  {
    description:
      "Ship the decision, then leave a trace. Every outcome becomes useful context for the person who follows.",
    eyebrow: "03 / Resolve",
    title: "Close the loop in public.",
  },
];

function StepVisual({ index }: { index: number }) {
  if (index === 1) {
    return (
      <div className="flex h-full min-h-64 flex-col justify-between bg-muted/35 p-5 sm:p-7">
        <div className="flex items-center justify-between border-border border-b pb-4 text-muted-foreground text-xs">
          <span>Routing rules</span>
          <span className="font-mono text-[10px]">3 active</span>
        </div>
        <div className="space-y-3 py-6">
          {["Priority signal", "Owner assigned", "Review window"].map(
            (label, itemIndex) => (
              <div className="flex items-center gap-3" key={label}>
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full border text-[10px]",
                    itemIndex === 1
                      ? "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {itemIndex + 1}
                </span>
                <span className="flex-1 border-border border-b border-dashed pb-2 text-sm">
                  {label}
                </span>
                {itemIndex < 2 ? (
                  <CheckIcon
                    aria-hidden
                    className="size-3 text-muted-foreground"
                  />
                ) : null}
              </div>
            )
          )}
        </div>
        <div className="flex items-center gap-2 border-border border-t pt-4 text-muted-foreground text-xs">
          <CircleDotIcon aria-hidden className="size-3 text-blue-500" />
          Applied to 24 items this week
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-64 flex-col justify-between overflow-hidden bg-foreground p-5 text-background sm:p-7">
      <div className="absolute top-0 right-0 size-32 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="relative flex items-center justify-between border-background/15 border-b pb-4 text-background/65 text-xs">
        <span>{index === 0 ? "Incoming sources" : "Resolution log"}</span>
        <GitBranchIcon aria-hidden className="size-4" />
      </div>
      <div className="relative space-y-3 py-6">
        {(index === 0
          ? ["customer.feedback", "billing.events", "team.notes"]
          : ["Decision recorded", "Owner notified", "Context preserved"]
        ).map((label, itemIndex) => (
          <div
            className="flex items-center gap-3 border-background/15 border-b pb-3 text-sm"
            key={label}
          >
            <span className="font-mono text-[10px] text-background/45">
              {String(itemIndex + 1).padStart(2, "0")}
            </span>
            <span>{label}</span>
            <span className="ml-auto size-1.5 rounded-full bg-blue-400" />
          </div>
        ))}
      </div>
      <div className="relative flex items-center gap-2 text-background/65 text-xs">
        <span className="size-1.5 rounded-full bg-blue-400" />
        {index === 0 ? "Listening in real time" : "Ready for the next signal"}
      </div>
    </div>
  );
}

export function Feature15({
  className,
  steps = defaultSteps,
  title = (
    <>
      A clearer path from signal
      <br className="hidden sm:block" /> to action.
    </>
  ),
}: Feature15Props) {
  return (
    <MarketingSection className={className}>
      <section className="bg-background px-6 py-20 text-foreground md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 border-border border-b pb-12 md:grid-cols-[1fr_0.8fr] md:gap-16 md:pb-16">
            <h2 className="text-balance font-display-heading text-4xl leading-[1.08] tracking-tight md:text-6xl">
              {title}
            </h2>
            <div className="flex items-end justify-between gap-6">
              <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
                Three deliberate moves for teams that want their work to feel
                less like a queue and more like a practice.
              </p>
              <ArrowUpRightIcon
                aria-hidden
                className="mb-1 size-5 shrink-0 text-blue-500"
              />
            </div>
          </div>

          <ol className="relative divide-y divide-border">
            {steps.map((step, index) => (
              <li
                className="grid gap-8 py-12 md:grid-cols-[5rem_1fr_1.15fr] md:items-center md:gap-10 md:py-16"
                key={step.title}
              >
                <div className="flex items-center gap-3 text-muted-foreground text-xs md:block">
                  <span className="font-mono text-foreground">
                    {step.eyebrow}
                  </span>
                  <span className="hidden h-16 w-px bg-border md:mx-1 md:mt-6 md:block" />
                </div>
                <div>
                  <h3 className="max-w-sm text-balance font-heading font-medium text-2xl tracking-tight md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div
                  className={cn(
                    index % 2 === 1 && "md:order-first md:col-start-2"
                  )}
                >
                  <StepVisual index={index} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </MarketingSection>
  );
}
