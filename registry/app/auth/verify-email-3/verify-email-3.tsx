import type { FormEvent, ReactNode } from "react";

import { VerifyEmailForm } from "@/components/verify-email-form";
import { cn } from "@/lib/utils";

export interface VerifyEmail3Props {
  className?: string;
  codeLabel?: string;
  description?: string;
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

export function VerifyEmail3({
  className,
  codeLabel,
  description,
  logo,
  onSubmit,
  primaryAction,
  resendHref,
  resendLabel,
  resendPrompt,
  signInHref,
  signInLabel,
  title,
}: VerifyEmail3Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <VerifyEmailForm
            codeLabel={codeLabel}
            description={description}
            idPrefix="verify-email-3"
            logo={logo}
            onSubmit={onSubmit}
            primaryAction={primaryAction}
            resendHref={resendHref}
            resendLabel={resendLabel}
            resendPrompt={resendPrompt}
            signInHref={signInHref}
            signInLabel={signInLabel}
            title={title}
          />
        </div>
      </div>
    </section>
  );
}
