import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Cta10Action {
  href?: string;
  label: string;
}

export interface Cta10Props {
  cardDescription?: string;
  cardTitle?: string;
  className?: string;
  eyebrow?: string;
  primaryCta?: Cta10Action;
  title?: string;
}

export function Cta10({
  eyebrow = "Let's Shape",
  title = "Your Future",
  cardTitle = "Let's Get Started!",
  cardDescription = "Join us and be part of the future.",
  primaryCta = { href: "#", label: "Join Now!" },
  className,
}: Cta10Props) {
  const icon = (
    <span className="flex size-5 items-center justify-center rounded-md bg-foreground text-background">
      <ArrowRightIcon className="size-3" />
    </span>
  );

  let action: ReactNode = null;
  if (primaryCta) {
    const content = (
      <>
        {primaryCta.label}
        {icon}
      </>
    );
    action = primaryCta.href ? (
      <Button asChild className="rounded-full" variant="outline">
        <a href={primaryCta.href}>{content}</a>
      </Button>
    ) : (
      <Button className="rounded-full" type="button" variant="outline">
        {content}
      </Button>
    );
  }

  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-4 py-12",
        "bg-[radial-gradient(45%_70%_at_50%_0%,--theme(--color-foreground/.08),transparent)]",
        className
      )}
    >
      <div className="text-center">
        <p className="text-2xl text-muted-foreground md:text-3xl">{eyebrow}</p>
        <h2 className="font-display-heading text-3xl md:text-4xl">{title}</h2>
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-4 rounded-2xl border bg-card px-5 py-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="font-semibold">{cardTitle}</p>
          {cardDescription ? (
            <p className="text-muted-foreground text-sm">{cardDescription}</p>
          ) : null}
        </div>
        {action}
      </div>
    </section>
  );
}
