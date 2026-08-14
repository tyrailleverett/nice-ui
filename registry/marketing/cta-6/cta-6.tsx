import { useCallback, useState } from "react";

const GRID_CELLS = [
  "cell-0",
  "cell-1",
  "cell-2",
  "cell-3",
  "cell-4",
  "cell-5",
  "cell-6",
  "cell-7",
  "cell-8",
] as const;

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Cta6Props {
  className?: string;
  command?: string;
  description?: string;
  eyebrow?: string;
  title?: string;
}

export function Cta6({
  eyebrow = "Install Fast.",
  title = "Build Faster.",
  description = "Install Nice UI and start shipping faster.",
  command = "bunx shadcn@latest add hotreloadstudios/nice-ui/hero-1",
  className,
}: Cta6Props) {
  const [copied, setCopied] = useState(false);

  const copyCommand = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, [command]);

  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border bg-[radial-gradient(50%_80%_at_50%_0%,--theme(--color-foreground/.08),transparent)]",
        className
      )}
    >
      <div className="grid grid-cols-[minmax(2.25rem,1fr)_minmax(0,22rem)_minmax(2.25rem,1fr)] grid-rows-[minmax(2.5rem,1fr)_auto_minmax(2.5rem,1fr)] sm:grid-cols-[minmax(3.5rem,1fr)_minmax(0,28rem)_minmax(3.5rem,1fr)]">
        {GRID_CELLS.map((cellId, index) => (
          <div
            className={cn(
              index % 3 !== 2 && "border-r",
              index < 6 && "border-b",
              index === 4 &&
                "flex flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:px-8 sm:py-14"
            )}
            key={cellId}
          >
            {index === 4 ? (
              <>
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground text-xl sm:text-2xl">
                    {eyebrow}
                  </p>
                  <h2 className="font-semibold text-2xl tracking-tight sm:text-3xl">
                    {title}
                  </h2>
                </div>
                {description ? (
                  <p className="text-muted-foreground text-sm">{description}</p>
                ) : null}
                <Button
                  className="h-auto max-w-full gap-2 font-mono text-xs sm:text-sm"
                  onClick={copyCommand}
                  type="button"
                  variant="outline"
                >
                  <span className="text-muted-foreground">$</span>
                  <span className="truncate">
                    {copied ? "Copied" : (command ?? "")}
                  </span>
                </Button>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
