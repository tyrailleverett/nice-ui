import { CopyIcon, RotateCcwIcon } from "lucide-react";

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

export interface Error3Props {
  className?: string;
  onCopyRequestId?: () => void;
  onRetry?: () => void;
  requestId?: string;
}

export function Error3({
  className,
  onCopyRequestId,
  onRetry,
  requestId = "FUL-8F2C-19",
}: Error3Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-56" />
        </div>

        <Empty className="border border-dashed">
          <EmptyHeader className="max-w-lg">
            <EmptyTitle className="text-xl">
              Packing state did not load
            </EmptyTitle>
            <EmptyDescription>
              The fulfillment service stopped while reading NSC-84763. The queue
              is still up; this record is not.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="max-w-md">
            <p className="font-mono text-muted-foreground text-xs">
              Request {requestId}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={onRetry} type="button">
                <RotateCcwIcon data-icon="inline-start" />
                Retry
              </Button>
              <Button onClick={onCopyRequestId} type="button" variant="outline">
                <CopyIcon data-icon="inline-start" />
                Copy request ID
              </Button>
            </div>
          </EmptyContent>
        </Empty>

        <div
          aria-hidden="true"
          className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(20rem,0.9fr)]"
        >
          <div className="flex flex-col gap-3 rounded-xl border border-border p-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-border p-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
