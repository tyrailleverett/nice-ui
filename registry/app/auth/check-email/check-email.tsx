import type { ReactNode } from "react";

import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CheckEmailProps {
  className?: string;
  description?: ReactNode;
  email?: string;
  logo?: ReactNode;
  onResend?: () => void;
  resendLabel?: string;
  signInHref?: string;
  signInLabel?: string;
  title?: string;
}

const defaultLogo = (
  <LogoIcon aria-hidden="true" className="mb-8 size-8 text-foreground" />
);

export function CheckEmail({
  className,
  description,
  email = "you@example.com",
  logo = defaultLogo,
  onResend,
  resendLabel = "Resend verification email",
  signInHref = "#",
  signInLabel = "Back to sign in",
  title = "Check your email",
}: CheckEmailProps) {
  const resolvedDescription = description ?? (
    <>
      We sent a verification link to{" "}
      <span className="font-semibold text-foreground">{email}</span>. Click the
      link to verify your account.
    </>
  );

  return (
    <div className={cn("w-full max-w-sm", className)}>
      {logo}
      <div className="space-y-1">
        <h1 className="font-semibold text-3xl tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{resolvedDescription}</p>
      </div>

      <div className="mt-8 space-y-6">
        <Button
          className="h-10 w-full"
          onClick={onResend}
          type="button"
          variant="outline"
        >
          {resendLabel}
        </Button>

        <p className="text-center text-muted-foreground text-sm">
          <a
            className="text-primary underline underline-offset-4 hover:text-primary/80"
            href={signInHref}
          >
            {signInLabel}
          </a>
        </p>
      </div>
    </div>
  );
}
