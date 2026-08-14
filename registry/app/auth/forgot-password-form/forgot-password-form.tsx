import { MailIcon } from "lucide-react";
import { type FormEvent, type ReactNode, useCallback } from "react";

import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface ForgotPasswordFormProps {
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  idPrefix?: string;
  logo?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  primaryAction?: string;
  signInHref?: string;
  signInLabel?: string;
  signInPrompt?: string;
  title?: string;
}

const defaultLogo = (
  <LogoIcon aria-hidden="true" className="mb-8 size-8 text-foreground" />
);

export function ForgotPasswordForm({
  className,
  description = "Enter your email and we'll send you a reset link.",
  emailPlaceholder = "Enter your email",
  idPrefix = "forgot-password",
  logo = defaultLogo,
  onSubmit,
  primaryAction = "Send reset link",
  signInHref = "#",
  signInLabel = "Back to sign in",
  signInPrompt = "Remembered your password?",
  title = "Forgot password",
}: ForgotPasswordFormProps) {
  const emailId = `${idPrefix}-email`;

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
        <div className="space-y-2">
          <Label htmlFor={emailId}>Email</Label>
          <InputGroup className="h-10">
            <InputGroupInput
              autoComplete="email"
              className="h-10"
              id={emailId}
              name="email"
              placeholder={emailPlaceholder}
              required
              type="email"
            />
            <InputGroupAddon>
              <MailIcon aria-hidden="true" data-icon="inline-start" />
            </InputGroupAddon>
          </InputGroup>
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
