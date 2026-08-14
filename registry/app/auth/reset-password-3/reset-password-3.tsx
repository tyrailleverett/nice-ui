import type { FormEvent, ReactNode } from "react";

import { ResetPasswordForm } from "@/components/reset-password-form";
import { cn } from "@/lib/utils";

export interface ResetPassword3Props {
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

export function ResetPassword3({
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
}: ResetPassword3Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <ResetPasswordForm
            confirmLabel={confirmLabel}
            confirmPlaceholder={confirmPlaceholder}
            description={description}
            idPrefix="reset-password-3"
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
    </section>
  );
}
