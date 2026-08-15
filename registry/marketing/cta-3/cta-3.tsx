import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";

export interface Cta3Action {
  href?: string;
  label: string;
}

export interface Cta3Props {
  className?: string;
  description?: string;
  primaryCta?: Cta3Action;
  secondaryCta?: Cta3Action;
  title?: string;
}

function ActionButton({
  action,
  variant,
  icon,
}: {
  action: Cta3Action;
  variant?: "default" | "outline";
  icon?: ReactNode;
}) {
  const content = (
    <>
      {action.label}
      {icon}
    </>
  );

  if (action.href) {
    return (
      <Button
        nativeButton={false}
        render={<a href={action.href} />}
        variant={variant}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant}>
      {content}
    </Button>
  );
}

export function Cta3({
  title = "Start for Free Today!",
  description = "Begin your 6-day free trial today to fully explore and experience all the features and benefits we offer.",
  primaryCta = { href: "#", label: "Get Started" },
  secondaryCta = { href: "#", label: "Contact Sales" },
  className,
}: Cta3Props) {
  return (
    <MarketingSection className={className}>
      <section className="relative flex flex-col justify-between gap-y-4 border-y px-4 py-8 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
        <div className="pointer-events-none absolute -inset-y-6 -left-px w-px border-l" />
        <div className="pointer-events-none absolute -inset-y-6 -right-px w-px border-r" />

        <div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed" />

        <h2 className="text-center font-heading font-semibold text-xl md:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="text-balance text-center font-medium text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        ) : null}

        <div className="flex items-center justify-center gap-2">
          {secondaryCta ? (
            <ActionButton action={secondaryCta} variant="outline" />
          ) : null}
          {primaryCta ? (
            <ActionButton
              action={primaryCta}
              icon={<ArrowRightIcon data-icon="inline-end" />}
            />
          ) : null}
        </div>
      </section>
    </MarketingSection>
  );
}
