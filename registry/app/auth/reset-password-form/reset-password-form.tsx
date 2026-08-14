import { type FormEvent, type ReactNode, useCallback } from "react";

import { LogoIcon } from "@/components/logo";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ResetPasswordFormProps {
  className?: string;
  confirmLabel?: string;
  confirmPlaceholder?: string;
  description?: string;
  idPrefix?: string;
  logo?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  primaryAction?: string;
  showStrengthIndicator?: boolean;
  signInHref?: string;
  signInLabel?: string;
  signInPrompt?: string;
  title?: string;
}

const defaultLogo = (
  <LogoIcon aria-hidden="true" className="mb-8 size-8 text-foreground" />
);

export function ResetPasswordForm({
  className,
  confirmLabel = "Confirm password",
  confirmPlaceholder = "Re-enter your password",
  description = "Enter a new password for your account.",
  idPrefix = "reset-password",
  logo = defaultLogo,
  onSubmit,
  passwordLabel = "New password",
  passwordPlaceholder = "Enter your new password",
  primaryAction = "Reset password",
  showStrengthIndicator = true,
  signInHref = "#",
  signInLabel = "Back to sign in",
  signInPrompt = "Remembered your password?",
  title = "Reset password",
}: ResetPasswordFormProps) {
  const passwordId = `${idPrefix}-password`;
  const confirmId = `${idPrefix}-confirm-password`;

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(event);
    },
    [onSubmit]
  );

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
        <div className="space-y-4">
          <PasswordInput
            autoComplete="new-password"
            id={passwordId}
            label={passwordLabel}
            placeholder={passwordPlaceholder}
            showStrengthIndicator={showStrengthIndicator}
          />
          <PasswordInput
            autoComplete="new-password"
            id={confirmId}
            label={confirmLabel}
            name="confirm-password"
            placeholder={confirmPlaceholder}
          />
        </div>

        <Button className="h-10 w-full" type="submit">
          {primaryAction}
        </Button>

        <p className="text-center text-muted-foreground text-sm">
          {signInPrompt}{" "}
          <a className="text-primary hover:text-primary/80" href={signInHref}>
            {signInLabel}
          </a>
        </p>
      </form>
    </div>
  );
}
