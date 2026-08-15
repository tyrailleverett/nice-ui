import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type MarketingSectionProps = ComponentProps<"section"> & {
  as?: "section" | "footer";
  padded?: boolean;
};

export function MarketingSection({
  as = "section",
  className,
  children,
  padded = false,
  ...props
}: MarketingSectionProps) {
  const Comp = as;

  return (
    <Comp className={cn("border-border border-t", className)} {...props}>
      <div
        className={cn(
          "mx-auto max-w-6xl border-border border-r border-l",
          padded && "py-12 pr-8 pl-8 md:py-16"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
