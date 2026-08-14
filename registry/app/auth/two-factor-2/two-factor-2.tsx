import type { FormEvent, ReactNode } from "react";

import { TwoFactorForm } from "@/components/two-factor-form";
import { cn } from "@/lib/utils";

export interface TwoFactor2Props {
  className?: string;
  codeLabel?: string;
  description?: string;
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

export function TwoFactor2({
  className,
  codeLabel,
  description,
  logo,
  onSubmit,
  primaryAction,
  recoveryCodeLabel,
  recoveryCodePlaceholder,
  recoveryLabel,
  signInHref,
  signInLabel,
  title,
  useCodeLabel,
}: TwoFactor2Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-fit max-w-full rounded-xl border p-6 md:p-8">
            <TwoFactorForm
              className="w-sm max-w-full"
              codeLabel={codeLabel}
              description={description}
              idPrefix="two-factor-2"
              logo={logo}
              onSubmit={onSubmit}
              primaryAction={primaryAction}
              recoveryCodeLabel={recoveryCodeLabel}
              recoveryCodePlaceholder={recoveryCodePlaceholder}
              recoveryLabel={recoveryLabel}
              signInHref={signInHref}
              signInLabel={signInLabel}
              title={title}
              useCodeLabel={useCodeLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
