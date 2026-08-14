import { type FormEvent, type ReactNode, useCallback } from "react";

import { LogoIcon } from "@/components/logo";
import { OtpInput } from "@/components/otp-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface VerifyEmailFormProps {
  className?: string;
  codeLabel?: string;
  description?: string;
  idPrefix?: string;
  logo?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  primaryAction?: string;
  resendHref?: string;
  resendLabel?: string;
  resendPrompt?: string;
  signInHref?: string;
  signInLabel?: string;
  title?: string;
}

const defaultLogo = (
  <LogoIcon aria-hidden="true" className="mb-8 size-8 text-foreground" />
);

export function VerifyEmailForm({
  className,
  codeLabel = "Verification code",
  description = "We sent a six-digit code to your email. Enter it below to verify your account.",
  idPrefix = "verify-email",
  logo = defaultLogo,
  onSubmit,
  primaryAction = "Verify email",
  resendHref = "#",
  resendLabel = "Resend code",
  resendPrompt = "Didn't receive the code?",
  signInHref = "#",
  signInLabel = "Back to sign in",
  title = "Verify your email",
}: VerifyEmailFormProps) {
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
        <OtpInput id={`${idPrefix}-code`} label={codeLabel} />

        <Button className="h-10 w-full" type="submit">
          {primaryAction}
        </Button>

        <p className="text-center text-muted-foreground text-sm">
          {resendPrompt}{" "}
          <a className="text-primary hover:text-primary/80" href={resendHref}>
            {resendLabel}
          </a>
        </p>

        <p className="text-center text-muted-foreground text-sm">
          <a className="text-primary hover:text-primary/80" href={signInHref}>
            {signInLabel}
          </a>
        </p>
      </form>
    </div>
  );
}
