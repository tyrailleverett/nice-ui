import { ShieldCheckIcon } from "lucide-react";
import { type ReactNode, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CookieConsent2Action {
  label: string;
}

export interface CookieConsent2Props {
  accept?: CookieConsent2Action;
  className?: string;
  description?: ReactNode;
  onAccept?: () => void;
  onPreferences?: () => void;
  onReject?: () => void;
  preferences?: CookieConsent2Action;
  reject?: CookieConsent2Action;
  title?: string;
}

export function CookieConsent2({
  title = "We value your privacy",
  description = "We use cookies to enhance your browsing experience and analyze our traffic. You can accept all, reject, or set your own preferences.",
  accept = { label: "Accept all" },
  reject = { label: "Reject" },
  preferences = { label: "Preferences" },
  onAccept,
  onReject,
  onPreferences,
  className,
}: CookieConsent2Props) {
  const [visible, setVisible] = useState(true);

  const handleAccept = useCallback(() => {
    onAccept?.();
    setVisible(false);
  }, [onAccept]);

  const handleReject = useCallback(() => {
    onReject?.();
    setVisible(false);
  }, [onReject]);

  const handlePreferences = useCallback(() => {
    onPreferences?.();
    setVisible(false);
  }, [onPreferences]);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-describedby="cookie-consent-2-description"
      aria-labelledby="cookie-consent-2-title"
      className={cn(
        "fixed bottom-4 left-4 z-50 w-full max-w-sm rounded-4xl border bg-card p-5 shadow-sm dark:bg-card/50",
        className
      )}
      role="dialog"
    >
      <div className="flex items-center gap-2">
        <ShieldCheckIcon
          aria-hidden="true"
          className="size-5 text-foreground"
        />
        <h2
          className="font-heading font-semibold text-foreground text-sm"
          id="cookie-consent-2-title"
        >
          {title}
        </h2>
      </div>
      <p
        className="mt-2 text-muted-foreground text-sm"
        id="cookie-consent-2-description"
      >
        {description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button onClick={handleAccept} type="button">
          {accept.label}
        </Button>
        <Button onClick={handleReject} type="button" variant="outline">
          {reject.label}
        </Button>
        <Button onClick={handlePreferences} type="button" variant="ghost">
          {preferences.label}
        </Button>
      </div>
    </div>
  );
}
