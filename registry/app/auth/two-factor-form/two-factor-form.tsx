import { type FormEvent, type ReactNode, useCallback, useState } from "react";

import { LogoIcon } from "@/components/logo";
import { OtpInput } from "@/components/otp-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TwoFactorFormProps {
  className?: string;
  codeLabel?: string;
  description?: string;
  idPrefix?: string;
  logo?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  primaryAction?: string;
  recoveryCodeLabel?: string;
  recoveryCodePlaceholder?: string;
  recoveryLabel?: string;
  signInHref?: string;
  signInLabel?: string;
  title?: string;
  useCodeLabel?: string;
}

const defaultLogo = (
  <LogoIcon aria-hidden="true" className="mb-8 size-8 text-foreground" />
);

type TwoFactorMode = "code" | "recovery";

export function TwoFactorForm({
  className,
  codeLabel = "Authentication code",
  description = "Enter the six-digit code from your authenticator app.",
  idPrefix = "two-factor",
  logo = defaultLogo,
  onSubmit,
  primaryAction = "Verify",
  recoveryCodeLabel = "Recovery code",
  recoveryCodePlaceholder = "Enter your recovery code",
  recoveryLabel = "Use a recovery code instead",
  signInHref = "#",
  signInLabel = "Back to sign in",
  title = "Two-factor authentication",
  useCodeLabel = "Use an authentication code instead",
}: TwoFactorFormProps) {
  const [mode, setMode] = useState<TwoFactorMode>("code");

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(event);
    },
    [onSubmit]
  );

  const toggleMode = useCallback(() => {
    setMode((current) => (current === "code" ? "recovery" : "code"));
  }, []);

  const toggleLabel = mode === "code" ? recoveryLabel : useCodeLabel;

  return (
    <div className={cn("w-full max-w-sm", className)}>
      {logo}
      <div className="space-y-1">
        <h1 className="font-semibold text-3xl tracking-tight">{title}</h1>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {mode === "code" ? (
          <OtpInput id={`${idPrefix}-code`} label={codeLabel} />
        ) : (
          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}-recovery-code`}>
              {recoveryCodeLabel}
            </Label>
            <Input
              autoComplete="off"
              className="h-10"
              id={`${idPrefix}-recovery-code`}
              name="recovery-code"
              placeholder={recoveryCodePlaceholder}
              required
              type="text"
            />
          </div>
        )}

        <Button className="h-10 w-full" type="submit">
          {primaryAction}
        </Button>

        <p className="text-center text-muted-foreground text-sm">
          <Button className="h-auto p-0" onClick={toggleMode} variant="link">
            {toggleLabel}
          </Button>
        </p>

        <p className="text-center text-muted-foreground text-sm">
          <a
            className="text-primary underline underline-offset-4 hover:text-primary/80"
            href={signInHref}
          >
            {signInLabel}
          </a>
        </p>
      </form>
    </div>
  );
}
