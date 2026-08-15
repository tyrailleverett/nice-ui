import { ArrowUpRightIcon, AtSignIcon, CreditCardIcon } from "lucide-react";
import { type FormEvent, type ReactNode, useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export interface Cta9Props {
  className?: string;
  emailPlaceholder?: string;
  footnote?: ReactNode;
  onSubscribe?: (email: string) => void;
  submitLabel?: string;
  title?: ReactNode;
}

export function Cta9({
  title = (
    <>
      A.I Driven Growth
      <br />
      <span className="font-semibold">for everyone.</span>
    </>
  ),
  emailPlaceholder = "Enter your email",
  submitLabel = "Join Now",
  onSubscribe,
  footnote = (
    <>
      No credit card <CreditCardIcon className="inline-block size-3.5" />{" "}
      required • 7-days free trial
    </>
  ),
  className,
}: Cta9Props) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "");
      onSubscribe?.(email);
    },
    [onSubscribe]
  );

  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border px-6 py-16 text-center",
        className
      )}
    >
      <div className="relative space-y-8">
        <h2 className="font-display-heading text-2xl md:text-4xl">{title}</h2>
        <form
          className="mx-auto flex w-full max-w-md overflow-hidden rounded-lg border bg-background/80"
          onSubmit={handleSubmit}
        >
          <InputGroup className="min-w-0 flex-1 border-0 bg-transparent shadow-none dark:bg-transparent">
            <InputGroupInput
              name="email"
              placeholder={emailPlaceholder}
              type="email"
            />
            <InputGroupAddon>
              <AtSignIcon data-icon="inline-start" />
            </InputGroupAddon>
          </InputGroup>
          <Button
            className="rounded-none border-l"
            type="submit"
            variant="ghost"
          >
            {submitLabel} <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </form>
        {footnote ? (
          <p className="text-muted-foreground text-xs md:text-sm">{footnote}</p>
        ) : null}
      </div>
    </section>
  );
}
