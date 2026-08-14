import { RotateCcwIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const staleFacts = [
  { label: "Lane", value: "Los Angeles to Seattle" },
  { label: "Stage", value: "Packing · 82%" },
  { label: "Hold", value: "NL-WRAP-12 missing" },
] as const;

export interface Error5Props {
  className?: string;
  lastSynced?: string;
  onRetry?: () => void;
}

export function Error5({
  className,
  lastSynced = "2 minutes ago",
  onRetry,
}: Error5Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-5">
        <Empty className="border border-dashed">
          <EmptyHeader className="max-w-lg">
            <EmptyTitle className="text-xl">Workspace is offline</EmptyTitle>
            <EmptyDescription>
              The last complete snapshot of NSC-84763 is still on this device.
              New packing updates will not arrive until the connection returns.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <p className="text-muted-foreground text-xs">
              Last synced {lastSynced}
            </p>
            <Button onClick={onRetry} type="button">
              <RotateCcwIcon data-icon="inline-start" />
              Retry connection
            </Button>
          </EmptyContent>
        </Empty>

        <section aria-label="Last known record" className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading font-mono font-semibold text-2xl tracking-tight">
              NSC-84763
            </h1>
            <Badge variant="secondary">Stale</Badge>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl bg-border p-px sm:grid-cols-3">
            {staleFacts.map((fact) => (
              <div
                className="flex flex-col gap-1 bg-card px-4 py-3"
                key={fact.label}
              >
                <span className="text-muted-foreground text-xs">
                  {fact.label}
                </span>
                <span className="font-medium text-sm">{fact.value}</span>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="flex flex-col gap-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-2/3" />
          </div>
        </section>
      </div>
    </main>
  );
}
