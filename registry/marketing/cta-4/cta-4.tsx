import { ArrowRightIcon, CreditCardIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Cta4Action {
  href?: string;
  label: string;
}

export interface Cta4Props {
  className?: string;
  description?: ReactNode;
  primaryCta?: Cta4Action;
  secondaryCta?: Cta4Action;
  title?: string;
}

function ActionButton({
  action,
  variant,
  icon,
}: {
  action: Cta4Action;
  variant?: "default" | "secondary";
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
        className="shadow"
        nativeButton={false}
        render={<a href={action.href} />}
        variant={variant}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button className="shadow" type="button" variant={variant}>
      {content}
    </Button>
  );
}

export function Cta4({
  title = "Let your plans shape the future.",
  description = (
    <>
      Start your free trial today. No credit card{" "}
      <CreditCardIcon className="inline-block size-4" /> required.
    </>
  ),
  primaryCta = { href: "#", label: "Get Started" },
  secondaryCta = { href: "#", label: "Contact Sales" },
  className,
}: Cta4Props) {
  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 rounded-4xl border bg-card px-4 py-8 shadow-sm md:py-10 dark:bg-card/50",
        className
      )}
    >
      <div className="space-y-2">
        <h2 className="text-center font-heading font-semibold text-lg md:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="text-balance text-center text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-2">
        {secondaryCta ? (
          <ActionButton action={secondaryCta} variant="secondary" />
        ) : null}
        {primaryCta ? (
          <ActionButton
            action={primaryCta}
            icon={<ArrowRightIcon data-icon="inline-end" />}
          />
        ) : null}
      </div>
    </section>
  );
}
