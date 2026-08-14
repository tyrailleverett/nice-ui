import type { FormEvent, ReactNode } from "react";

import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { cn } from "@/lib/utils";

export interface ForgotPassword2Props {
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  logo?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  primaryAction?: string;
  signInHref?: string;
  signInLabel?: string;
  signInPrompt?: string;
  title?: string;
}

export function ForgotPassword2({
  className,
  description,
  emailPlaceholder,
  logo,
  onSubmit,
  primaryAction,
  signInHref,
  signInLabel,
  signInPrompt,
  title,
}: ForgotPassword2Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-fit max-w-full rounded-xl border p-6 md:p-8">
            <ForgotPasswordForm
              className="w-sm max-w-full"
              description={description}
              emailPlaceholder={emailPlaceholder}
              idPrefix="forgot-password-2"
              logo={logo}
              onSubmit={onSubmit}
              primaryAction={primaryAction}
              signInHref={signInHref}
              signInLabel={signInLabel}
              signInPrompt={signInPrompt}
              title={title}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
