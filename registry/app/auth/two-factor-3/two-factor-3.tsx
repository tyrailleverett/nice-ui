import type { FormEvent, ReactNode } from "react";
import {
  defaultLoginLegalLinks,
  type LoginFormLink,
  LoginLegalNav,
} from "@/components/login-form";
import { TwoFactorForm } from "@/components/two-factor-form";
import { cn } from "@/lib/utils";

export interface TwoFactor3Props {
  className?: string;
  codeLabel?: string;
  description?: string;
  legalLinks?: LoginFormLink[];
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

export function TwoFactor3({
  className,
  codeLabel,
  description,
  legalLinks = defaultLoginLegalLinks,
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
}: TwoFactor3Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <TwoFactorForm
            codeLabel={codeLabel}
            description={description}
            idPrefix="two-factor-3"
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
        <LoginLegalNav links={legalLinks} />
      </div>
    </section>
  );
}
