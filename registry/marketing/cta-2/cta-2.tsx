import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { FullWidthDivider } from "@/components/full-width-divider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Cta2Action {
  href?: string;
  label: string;
}

export interface Cta2Props {
  className?: string;
  description?: string;
  primaryCta?: Cta2Action;
  secondaryCta?: Cta2Action;
  title?: string;
}

function ActionButton({
  action,
  variant,
  icon,
}: {
  action: Cta2Action;
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
      <Button asChild variant={variant}>
        <a href={action.href}>{content}</a>
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant}>
      {content}
    </Button>
  );
}

export function Cta2({
  title = "Plan the present. Build the future.",
  description = "Start your journey today by clicking the button below.",
  primaryCta = { href: "#", label: "Get Started" },
  secondaryCta = { href: "#", label: "Contact Sales" },
  className,
}: Cta2Props) {
  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-3xl flex-col justify-between border-x",
        className
      )}
    >
      <FullWidthDivider position="top" />
      <div className="border-b px-2 py-8">
        <h2 className="text-center font-heading font-semibold text-lg md:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="text-balance text-center text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-2 p-4">
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
      <FullWidthDivider position="bottom" />
    </section>
  );
}
