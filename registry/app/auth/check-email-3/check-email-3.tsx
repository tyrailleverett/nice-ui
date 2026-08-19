import type { ReactNode } from "react";

import { CheckEmail } from "@/components/check-email";
import {
  defaultLoginLegalLinks,
  type LoginFormLink,
  LoginLegalNav,
} from "@/components/login-form";
import { cn } from "@/lib/utils";

export interface CheckEmail3Props {
  className?: string;
  description?: ReactNode;
  email?: string;
  legalLinks?: LoginFormLink[];
  logo?: ReactNode;
  onResend?: () => void;
  resendLabel?: string;
  signInHref?: string;
  signInLabel?: string;
  title?: string;
}

export function CheckEmail3({
  className,
  description,
  email,
  legalLinks = defaultLoginLegalLinks,
  logo,
  onResend,
  resendLabel,
  signInHref,
  signInLabel,
  title,
}: CheckEmail3Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <CheckEmail
            description={description}
            email={email}
            logo={logo}
            onResend={onResend}
            resendLabel={resendLabel}
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
