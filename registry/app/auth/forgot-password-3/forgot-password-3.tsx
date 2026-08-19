import type { FormEvent, ReactNode } from "react";
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import {
  defaultLoginLegalLinks,
  type LoginFormLink,
  LoginLegalNav,
} from "@/components/login-form";
import { cn } from "@/lib/utils";

export interface ForgotPassword3Props {
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  legalLinks?: LoginFormLink[];
  logo?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  primaryAction?: string;
  signInHref?: string;
  signInLabel?: string;
  title?: string;
}

export function ForgotPassword3({
  className,
  description,
  emailPlaceholder,
  legalLinks = defaultLoginLegalLinks,
  logo,
  onSubmit,
  primaryAction,
  signInHref,
  signInLabel,
  title,
}: ForgotPassword3Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <ForgotPasswordForm
            description={description}
            emailPlaceholder={emailPlaceholder}
            idPrefix="forgot-password-3"
            logo={logo}
            onSubmit={onSubmit}
            primaryAction={primaryAction}
            signInHref={signInHref}
            signInLabel={signInLabel}
            title={title}
          />
        </div>
        <LoginLegalNav links={legalLinks} />
      </div>
    </section>
  );
}
