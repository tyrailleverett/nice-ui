import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";

import { FullWidthDivider } from "@/components/full-width-divider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Cta13Action {
  href?: string;
  label: string;
}

export interface Cta13Props {
  className?: string;
  description?: string;
  highlight?: string;
  primaryCta?: Cta13Action;
  secondaryCta?: Cta13Action;
  title?: string;
}

function ActionButton({
  action,
  variant,
  size,
  icon,
}: {
  action: Cta13Action;
  variant?: "default" | "link";
  size?: "default" | "lg";
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
        size={size}
        variant={variant}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button size={size} type="button" variant={variant}>
      {content}
    </Button>
  );
}

export function Cta13({
  title = "Your SaaS deserves a",
  highlight = "better starting point",
  description = "Stop rebuilding authentication and billing from scratch. Start with a production-ready foundation and ship your first feature today.",
  primaryCta = { href: "#", label: "Get started" },
  secondaryCta = { href: "#", label: "View Pricing" },
  className,
}: Cta13Props) {
  return (
    <section
      className={cn("relative mx-auto w-full max-w-6xl border-x", className)}
    >
      <FullWidthDivider position="top" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-12 md:py-16">
          <div className="flex max-w-lg flex-col gap-3">
            <h2 className="text-balance font-heading font-semibold text-xl tracking-tight sm:text-2xl lg:text-3xl">
              {title}{" "}
              {highlight ? (
                <span className="text-primary">{highlight}</span>
              ) : null}
            </h2>
            {description ? (
              <p className="text-balance text-base text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-3 px-8 py-12 md:items-end md:border-l md:py-16">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {primaryCta ? (
              <ActionButton
                action={primaryCta}
                icon={<ArrowUpRightIcon data-icon="inline-end" />}
                size="lg"
              />
            ) : null}
            {secondaryCta ? (
              <ActionButton
                action={secondaryCta}
                icon={<ArrowRightIcon data-icon="inline-end" />}
                variant="link"
              />
            ) : null}
          </div>
        </div>
      </div>
      <FullWidthDivider position="bottom" />
    </section>
  );
}
