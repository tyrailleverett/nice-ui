import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import { type FormEvent, useCallback, useState } from "react";

import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Waitlist2Props {
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  onJoin?: (email: string) => void;
  submitLabel?: string;
  successMessage?: string;
  title?: string;
}

export function Waitlist2({
  title = "A quieter, sharper way to ship.",
  description = "Get the first look at the next set of Nice UI blocks, plus the occasional field note on making interfaces feel more considered.",
  emailPlaceholder = "Your email address",
  submitLabel = "Reserve a spot",
  successMessage = "Spot reserved. Watch your inbox.",
  onJoin,
  className,
}: Waitlist2Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const email = String(
        new FormData(event.currentTarget).get("email") ?? ""
      );
      onJoin?.(email);
      setSubmitted(true);
    },
    [onJoin]
  );

  return (
    <MarketingSection className={className}>
      <section className="grid overflow-hidden border bg-muted/30 md:grid-cols-[minmax(220px,0.8fr)_1.6fr]">
        <div className="relative min-h-56 overflow-hidden border-b bg-foreground px-6 py-8 text-background sm:px-10 sm:py-10 md:border-r md:border-b-0">
          <div className="absolute -right-8 -bottom-12 size-44 rounded-full border border-background/20" />
          <div className="absolute -right-1 -bottom-5 size-24 rounded-full border border-background/20" />
          <div className="relative flex h-full flex-col justify-between gap-12">
            <div className="flex items-center justify-between font-mono text-[10px] text-background/60 uppercase tracking-[0.22em]">
              <span>Dispatch 001</span>
              <span>Open</span>
            </div>
            <div className="relative w-fit -rotate-3 border border-blue-400/70 px-3 py-2 font-mono text-blue-300 text-sm uppercase tracking-[0.18em]">
              <span className="absolute -inset-1 border border-blue-400/20" />
              Early access
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-7 px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
          <div className="space-y-3">
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
              The next issue is forming
            </p>
            <h2 className="max-w-xl text-balance font-display-heading text-3xl text-foreground sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="max-w-lg text-muted-foreground text-sm leading-6">
                {description}
              </p>
            ) : null}
          </div>

          {submitted ? (
            <div aria-live="polite" className="flex items-center gap-3 text-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-400 dark:text-blue-950">
                <CheckIcon aria-hidden="true" className="size-4" />
              </span>
              {successMessage}
            </div>
          ) : (
            <form
              className="flex max-w-xl flex-col gap-2 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="waitlist-2-email">
                Email address
              </label>
              <Input
                className="h-10 flex-1 bg-background"
                id="waitlist-2-email"
                name="email"
                placeholder={emailPlaceholder}
                required
                type="email"
              />
              <Button className="h-10" type="submit">
                {submitLabel}
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </form>
          )}
        </div>
      </section>
    </MarketingSection>
  );
}
