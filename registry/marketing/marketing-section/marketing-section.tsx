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
    <Comp className={cn(className)} {...props}>
      <div
        className={cn(
          "mx-auto max-w-6xl",
          padded && "py-12 pr-8 pl-8 md:py-16"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
