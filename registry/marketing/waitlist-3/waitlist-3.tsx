import { ArrowUpRightIcon, CheckIcon, MailIcon } from "lucide-react";
import { type FormEvent, useCallback, useState } from "react";

import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Waitlist3Props {
  className?: string;
  description?: string;
  onJoin?: (email: string) => void;
  title?: string;
}

export function Waitlist3({
  title = "A better starting point is almost here.",
  description = "Join the early access list for the next Nice UI release. We’ll send one useful note when it is ready.",
  onJoin,
  className,
}: Waitlist3Props) {
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
      <section className="relative overflow-hidden border-y bg-muted/30 px-6 py-12 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute top-0 right-0 size-48 rounded-full border border-primary/20 sm:size-72" />
        <div className="relative mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-14">
          <div className="space-y-4">
            <p className="font-mono text-[11px] text-primary uppercase tracking-[0.22em]">
              Early access / 001
            </p>
            <h2 className="max-w-lg text-balance font-display-heading text-3xl sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-md text-muted-foreground text-sm leading-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-muted-foreground text-xs">
              <span className="flex items-center gap-1.5">
                <CheckIcon className="size-3.5 text-primary" /> First release
                access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="size-3.5 text-primary" /> No spam
              </span>
            </div>
          </div>
          {submitted ? (
            <div
              aria-live="polite"
              className="flex min-h-32 items-center gap-3 border border-primary/30 bg-primary/5 px-5 text-sm"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CheckIcon aria-hidden="true" className="size-4" />
              </span>
              <span>You’re on the list. We’ll be in touch.</span>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="waitlist-3-email">
                Email address
              </label>
              <div className="relative">
                <MailIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  className="h-11 bg-background pl-9"
                  id="waitlist-3-email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  type="email"
                />
              </div>
              <Button className="h-11 w-full" type="submit">
                Join early access <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
              <p className="text-muted-foreground text-xs">
                By joining, you agree to receive product updates. Unsubscribe
                anytime.
              </p>
            </form>
          )}
        </div>
      </section>
    </MarketingSection>
  );
}
