import { ArrowUpRightIcon, CheckIcon, MailIcon } from "lucide-react";
import { type FormEvent, useCallback, useState } from "react";

import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Waitlist1Props {
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  onJoin?: (email: string) => void;
  submitLabel?: string;
  successMessage?: string;
  title?: string;
}

export function Waitlist1({
  title = "Be first through the door.",
  description = "Nice UI is opening a faster way to build thoughtful product surfaces. Join the list for the first release and a note when it is ready.",
  emailPlaceholder = "you@company.com",
  submitLabel = "Join the waitlist",
  successMessage = "You're on the list. We'll be in touch.",
  onJoin,
  className,
}: Waitlist1Props) {
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
      <section className="relative overflow-hidden border-y bg-background px-6 py-12 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-border/70 md:block" />
        <div className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
          <div className="space-y-4">
            <p className="font-mono text-[11px] text-blue-600 uppercase tracking-[0.24em] dark:text-blue-400">
              Early access / edition 001
            </p>
            <h2 className="max-w-md text-balance font-display-heading text-3xl text-foreground sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="max-w-md text-muted-foreground text-sm leading-6">
                {description}
              </p>
            ) : null}
          </div>

          <div className="md:pl-2">
            {submitted ? (
              <div
                aria-live="polite"
                className="flex min-h-24 items-center gap-3 border border-blue-600/30 bg-blue-600/5 px-4 text-sm dark:border-blue-400/30 dark:bg-blue-400/10"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-400 dark:text-blue-950">
                  <CheckIcon aria-hidden="true" className="size-4" />
                </span>
                <span>{successMessage}</span>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="waitlist-1-email">
                  Email address
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <MailIcon
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      className="h-10 rounded-md pl-9"
                      id="waitlist-1-email"
                      name="email"
                      placeholder={emailPlaceholder}
                      required
                      type="email"
                    />
                  </div>
                  <Button className="h-10 sm:px-4" type="submit">
                    {submitLabel}
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  One useful email at launch. No list-padding, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
