import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "lucide-react";
import type { ReactNode } from "react";

import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";

export interface Cta14Action {
  href?: string;
  label: string;
}

export interface Cta14Props {
  className?: string;
  description?: string;
  primaryCta?: Cta14Action;
  secondaryCta?: Cta14Action;
  title?: ReactNode;
}

function ActionButton({
  action,
  children,
  className,
  variant = "default",
}: {
  action: Cta14Action;
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline";
}) {
  if (action.href) {
    return (
      <Button
        className={className}
        nativeButton={false}
        render={<a href={action.href} />}
        variant={variant}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button className={className} type="button" variant={variant}>
      {children}
    </Button>
  );
}

export function Cta14({
  title = (
    <>
      Make the next release your <span className="text-primary">best</span>
    </>
  ),
  description = "A considered foundation for teams who want to move quickly without making their product feel rushed.",
  primaryCta = { href: "#", label: "Start building" },
  secondaryCta = { href: "#", label: "See what is included" },
  className,
}: Cta14Props) {
  return (
    <MarketingSection className={className}>
      <section className="relative overflow-hidden bg-foreground px-6 py-14 text-background sm:px-10 sm:py-20">
        <div className="pointer-events-none absolute inset-y-0 right-[12%] hidden w-px bg-background/10 lg:block" />
        <div className="pointer-events-none absolute top-1/2 right-[7%] hidden size-52 -translate-y-1/2 rounded-full border border-primary/30 lg:block" />
        <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-2xl space-y-5">
            <p className="font-mono text-[11px] text-primary uppercase tracking-[0.22em]">
              The thoughtful shortcut
            </p>
            <h2 className="text-balance font-display-heading text-4xl leading-tight sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-xl text-background/70 text-base leading-7">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row">
              <ActionButton action={primaryCta}>
                {primaryCta.label}
                <ArrowUpRightIcon data-icon="inline-end" />
              </ActionButton>
              <ActionButton
                action={secondaryCta}
                className="border-background/30 text-background hover:bg-background/10 hover:text-background"
                variant="outline"
              >
                {secondaryCta.label}
                <ArrowRightIcon data-icon="inline-end" />
              </ActionButton>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-background/65 text-xs">
              {[
                "No credit card",
                "Accessible by default",
                "Ships with tokens",
              ].map((item) => (
                <li className="flex items-center gap-1.5" key={item}>
                  <CheckIcon
                    aria-hidden="true"
                    className="size-3.5 text-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
