import type { ReactNode } from "react";

import { CheckEmail } from "@/components/check-email";
import { cn } from "@/lib/utils";

export interface CheckEmail2Props {
  className?: string;
  description?: ReactNode;
  email?: string;
  logo?: ReactNode;
  onResend?: () => void;
  resendLabel?: string;
  signInHref?: string;
  signInLabel?: string;
  title?: string;
}

export function CheckEmail2({
  className,
  description,
  email,
  logo,
  onResend,
  resendLabel,
  signInHref,
  signInLabel,
  title,
}: CheckEmail2Props) {
  return (
    <section
      className={cn("min-h-svh bg-background text-foreground", className)}
    >
      <div className="flex min-h-svh flex-col px-6 py-8 md:px-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-fit max-w-full rounded-xl border p-6 md:p-8">
            <CheckEmail
              className="w-sm max-w-full"
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
        </div>
      </div>
    </section>
  );
}
