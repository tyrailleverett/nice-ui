import type { FormEvent, ReactNode } from "react";

import {
  defaultRegisterLegalLinks,
  RegisterForm,
  type RegisterFormLink,
  RegisterLegalNav,
} from "@/components/register-form";
import { cn } from "@/lib/utils";

export interface Register2Props {
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  googleLabel?: string;
  legalLinks?: RegisterFormLink[];
  logo?: ReactNode;
  namePlaceholder?: string;
  onGoogleContinue?: () => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  passwordPlaceholder?: string;
  primaryAction?: string;
  showStrengthIndicator?: boolean;
  signInHref?: string;
  signInLabel?: string;
  signInPrompt?: string;
  title?: string;
}

export function Register2({
  className,
  description,
  emailPlaceholder,
  googleLabel,
  legalLinks = defaultRegisterLegalLinks,
  logo,
  namePlaceholder,
  onGoogleContinue,
  onSubmit,
  passwordPlaceholder,
  primaryAction,
  showStrengthIndicator,
  signInHref,
  signInLabel,
  signInPrompt,
  title,
}: Register2Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-fit max-w-full rounded-xl border p-6 md:p-8">
            <RegisterForm
              className="w-sm max-w-full"
              description={description}
              emailPlaceholder={emailPlaceholder}
              googleLabel={googleLabel}
              idPrefix="register-2"
              logo={logo}
              namePlaceholder={namePlaceholder}
              onGoogleContinue={onGoogleContinue}
              onSubmit={onSubmit}
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
        <RegisterLegalNav links={legalLinks} />
      </div>
    </section>
  );
}
