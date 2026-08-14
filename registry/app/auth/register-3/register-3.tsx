import type { FormEvent, ReactNode } from "react";

import {
  defaultRegisterLegalLinks,
  RegisterForm,
  type RegisterFormLink,
  RegisterLegalNav,
} from "@/components/register-form";
import { cn } from "@/lib/utils";

export interface Register3Props {
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

export function Register3({
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
}: Register3Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <RegisterForm
            description={description}
            emailPlaceholder={emailPlaceholder}
            googleLabel={googleLabel}
            idPrefix="register-3"
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
        <RegisterLegalNav links={legalLinks} />
      </div>
    </section>
  );
}
