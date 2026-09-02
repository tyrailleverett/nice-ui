import { ArrowUpRightIcon, CheckIcon, PlayIcon } from "lucide-react";
import type { ReactNode } from "react";

import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Hero5Action {
  href?: string;
  label: string;
}

export interface Hero5Props {
  className?: string;
  description?: string;
  primaryCta?: Hero5Action | null;
  secondaryCta?: Hero5Action | null;
  title?: string;
}

function ActionButton({
  action,
  children,
  variant,
}: {
  action: Hero5Action;
  children: ReactNode;
  variant?: "default" | "outline";
}) {
  if (action.href) {
    return (
      <Button
        nativeButton={false}
        render={<a href={action.href} />}
        variant={variant}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant}>
      {children}
    </Button>
  );
}

const rows = [
  { label: "edge-eu-west", status: "healthy", value: "99.98%" },
  { label: "queue-workers", status: "healthy", value: "184 ms" },
  { label: "api-gateway", status: "watch", value: "2.4k/s" },
];

export function Hero5({
  title = "Make every signal actionable.",
  description = "A calm command center for teams that ship reliable work, from first alert to final resolution.",
  primaryCta = { href: "#", label: "Start monitoring" },
  secondaryCta = { href: "#", label: "See the workflow" },
  className,
}: Hero5Props) {
  return (
    <MarketingSection className={cn("bg-[#041734] text-white", className)}>
      <section aria-labelledby="hero-5-title" className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:px-10 lg:px-12 lg:pt-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_11rem] lg:gap-16">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 font-mono text-[#a7babe] text-[11px] uppercase tracking-[0.2em]">
                <span className="size-2 rounded-full bg-[#4ade80]" />
                Live observability for ambitious teams
              </p>
              <h1
                className="max-w-3xl text-balance font-display-heading text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-8xl"
                id="hero-5-title"
              >
                {title}
              </h1>
              <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-md text-pretty text-[#a7babe] text-lg leading-7">
                  {description}
                </p>
                <div className="flex shrink-0 flex-wrap gap-3">
                  {primaryCta ? (
                    <ActionButton action={primaryCta}>
                      {primaryCta.label}
                      <ArrowUpRightIcon data-icon="inline-end" />
                    </ActionButton>
                  ) : null}
                  {secondaryCta ? (
                    <ActionButton action={secondaryCta} variant="outline">
                      <PlayIcon data-icon="inline-start" />
                      {secondaryCta.label}
                    </ActionButton>
                  ) : null}
                </div>
              </div>
            </div>

            <aside
              aria-label="Product promise"
              className="hidden border-white/15 border-l pl-5 lg:block"
            >
              <p className="font-mono text-[#a7babe] text-xs uppercase tracking-[0.18em]">
                Built for
              </p>
              <ul className="mt-5 space-y-4 font-mono text-sm">
                {["Fast teams", "Clear owners", "Quiet nights"].map((item) => (
                  <li className="flex items-center gap-2" key={item}>
                    <CheckIcon className="size-3 text-[#4ade80]" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div
            aria-label="A live monitoring dashboard showing healthy system signals"
            className="relative mt-16 border border-white/15 bg-[#0f172a] shadow-2xl shadow-black/30 lg:mt-24"
            role="img"
          >
            <div className="flex items-center justify-between border-white/10 border-b px-4 py-3 font-mono text-[#a7babe] text-[11px] sm:px-6">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-[#4ade80]" />
                production / overview
              </div>
              <span className="hidden sm:inline">updated just now</span>
            </div>
            <div className="grid lg:grid-cols-[13rem_minmax(0,1fr)_15rem]">
              <div className="border-white/10 border-b p-5 lg:border-r lg:border-b-0">
                <p className="font-mono text-[#64748b] text-[10px] uppercase tracking-[0.16em]">
                  System health
                </p>
                <p className="mt-4 font-display-heading text-4xl tracking-[-0.04em]">
                  98.7
                </p>
                <p className="mt-1 font-mono text-[#4ade80] text-xs">
                  +2.4% this week
                </p>
                <div
                  aria-hidden="true"
                  className="mt-8 flex h-16 items-end gap-1"
                >
                  {[35, 48, 42, 66, 54, 72, 61, 84, 74, 92, 88, 100].map(
                    (height) => (
                      <span
                        className="flex-1 bg-[#0075ff]/70"
                        key={height}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="min-w-0 border-white/10 border-b p-5 sm:p-6 lg:border-r lg:border-b-0">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[#64748b] text-[10px] uppercase tracking-[0.16em]">
                    Signal map
                  </p>
                  <span className="rounded-full border border-[#4ade80]/40 px-2 py-1 font-mono text-[#4ade80] text-[10px]">
                    12 active
                  </span>
                </div>
                <div className="relative mt-6 h-36 overflow-hidden border border-white/10 bg-[#041734] p-4">
                  <div className="absolute inset-x-8 top-1/2 border-[#0075ff]/40 border-t border-dashed" />
                  <div className="absolute inset-y-7 left-1/2 border-[#0075ff]/40 border-l border-dashed" />
                  <div className="absolute top-8 left-[22%] size-3 rounded-full bg-[#0075ff] shadow-[0_0_24px_#0075ff]" />
                  <div className="absolute top-[58%] left-[49%] size-4 rounded-full bg-[#4ade80] shadow-[0_0_24px_#4ade80]" />
                  <div className="absolute right-[20%] bottom-7 size-3 rounded-full bg-[#0075ff] shadow-[0_0_24px_#0075ff]" />
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 size-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d="M22 28 L49 58 L80 72"
                      fill="none"
                      stroke="#0075ff"
                      strokeDasharray="2 2"
                      strokeWidth="0.7"
                    />
                  </svg>
                  <span className="absolute bottom-3 left-4 font-mono text-[#64748b] text-[10px]">
                    traffic topology
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-mono text-[#64748b] text-[10px] uppercase tracking-[0.16em]">
                  Key metrics
                </p>
                <div className="mt-4 divide-y divide-white/10">
                  {rows.map((row) => (
                    <div
                      className="flex items-center justify-between gap-3 py-3 font-mono text-xs"
                      key={row.label}
                    >
                      <span className="truncate text-[#a7babe]">
                        {row.label}
                      </span>
                      <span
                        className={
                          row.status === "watch"
                            ? "text-[#fbbf24]"
                            : "text-[#4ade80]"
                        }
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
