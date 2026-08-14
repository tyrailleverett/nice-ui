import type { FormEvent, ReactNode } from "react";

import { VerifyEmailForm } from "@/components/verify-email-form";
import { cn } from "@/lib/utils";

export interface VerifyEmail2Props {
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

export function VerifyEmail2({
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
}: VerifyEmail2Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-fit max-w-full rounded-xl border p-6 md:p-8">
            <VerifyEmailForm
              className="w-sm max-w-full"
              codeLabel={codeLabel}
              description={description}
              idPrefix="verify-email-2"
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
      </div>
    </section>
  );
}
