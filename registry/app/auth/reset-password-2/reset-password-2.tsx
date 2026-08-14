import type { FormEvent, ReactNode } from "react";

import { ResetPasswordForm } from "@/components/reset-password-form";
import { cn } from "@/lib/utils";

export interface ResetPassword2Props {
  className?: string;
  confirmLabel?: string;
  confirmPlaceholder?: string;
  description?: string;
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

export function ResetPassword2({
  className,
  confirmLabel,
  confirmPlaceholder,
  description,
  logo,
  onSubmit,
  passwordLabel,
  passwordPlaceholder,
  primaryAction,
  showStrengthIndicator,
  signInHref,
  signInLabel,
  signInPrompt,
  title,
}: ResetPassword2Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-fit max-w-full rounded-xl border p-6 md:p-8">
            <ResetPasswordForm
              className="w-sm max-w-full"
              confirmLabel={confirmLabel}
              confirmPlaceholder={confirmPlaceholder}
              description={description}
              idPrefix="reset-password-2"
              logo={logo}
              onSubmit={onSubmit}
              passwordLabel={passwordLabel}
              passwordPlaceholder={passwordPlaceholder}
              primaryAction={primaryAction}
              showStrengthIndicator={showStrengthIndicator}
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
