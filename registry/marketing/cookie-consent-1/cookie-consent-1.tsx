import { type ReactNode, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CookieConsent1Action {
  label: string;
}

export interface CookieConsent1Policy {
  href: string;
  label: string;
}

export interface CookieConsent1Props {
  accept?: CookieConsent1Action;
  className?: string;
  decline?: CookieConsent1Action;
  description?: ReactNode;
  onAccept?: () => void;
  onDecline?: () => void;
  policy?: CookieConsent1Policy;
}

export function CookieConsent1({
  description,
  policy = { href: "#", label: "cookie policy" },
  decline = { label: "Decline" },
  accept = { label: "Accept all" },
  onAccept,
  onDecline,
  className,
}: CookieConsent1Props) {
  const [visible, setVisible] = useState(true);

  const handleDecline = useCallback(() => {
    onDecline?.();
    setVisible(false);
  }, [onDecline]);

  const handleAccept = useCallback(() => {
    onAccept?.();
    setVisible(false);
  }, [onAccept]);

  if (!visible) {
    return null;
  }

  return (
    <section
      aria-describedby="cookie-consent-1-description"
      aria-label="Cookie consent"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t bg-background",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-muted-foreground text-sm"
          id="cookie-consent-1-description"
        >
          {description ?? (
            <>
              We use cookies to improve your experience and analyze traffic.
              Read our{" "}
              <a
                className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
                href={policy.href}
              >
                {policy.label}
              </a>
              .
            </>
          )}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            className="flex-1 sm:flex-none"
            onClick={handleDecline}
            type="button"
            variant="outline"
          >
            {decline.label}
          </Button>
          <Button
            className="flex-1 sm:flex-none"
            onClick={handleAccept}
            type="button"
          >
            {accept.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
