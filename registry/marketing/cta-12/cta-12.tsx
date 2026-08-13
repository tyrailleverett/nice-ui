import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Cta12Action {
  href?: string;
  label: string;
}

export interface Cta12Props {
  className?: string;
  primaryCta?: Cta12Action;
  secondaryCta?: Cta12Action;
  title?: string;
}

function PrimaryCtaButton({ action }: { action: Cta12Action }) {
  const content = (
    <>
      {action.label}
      <ArrowUpRightIcon data-icon="inline-end" />
    </>
  );

  if (action.href) {
    return (
      <Button asChild className="rounded-full" variant="outline">
        <a href={action.href}>{content}</a>
      </Button>
    );
  }

  return (
    <Button className="rounded-full" type="button" variant="outline">
      {content}
    </Button>
  );
}

function ActionLink({
  action,
  className,
  children,
}: {
  action: Cta12Action;
  className?: string;
  children: ReactNode;
}) {
  if (action.href) {
    return (
      <a className={className} href={action.href}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}

export function Cta12({
  title = "Ship 10x Faster with Nice UI",
  primaryCta = { href: "#", label: "Get Started" },
  secondaryCta = { href: "#", label: "Try it now" },
  className,
}: Cta12Props) {
  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-3xl items-center justify-center px-6 py-16",
        "bg-[radial-gradient(40%_60%_at_50%_35%,--theme(--color-foreground/.1),transparent)]",
        className
      )}
    >
      <div className="relative px-10 py-12 sm:px-16 sm:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border" />
        <div className="pointer-events-none absolute inset-y-[-18%] left-0 w-px bg-border" />
        <div className="pointer-events-none absolute inset-y-[-18%] right-0 w-px bg-border" />

        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-semibold text-2xl tracking-tight [text-shadow:0_0_32px_--theme(--color-foreground/.25)] md:text-4xl">
            {title}
          </h2>
          <div className="flex items-center gap-4">
            {secondaryCta ? (
              <ActionLink
                action={secondaryCta}
                className="font-medium text-sm hover:underline"
              >
                {secondaryCta.label}
              </ActionLink>
            ) : null}
            {primaryCta ? <PrimaryCtaButton action={primaryCta} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
