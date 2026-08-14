import { CableIcon, UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function RecordIllustration() {
  return (
    <div aria-hidden="true" className="relative h-32 w-80 max-w-full">
      <div className="absolute inset-x-12 top-1 h-20 rounded-2xl border border-border bg-muted/20" />
      <div className="absolute inset-x-6 top-7 h-20 rounded-2xl border border-border bg-muted/30" />
      <div className="absolute inset-x-0 top-14 flex h-24 items-center gap-6 rounded-2xl border-2 border-border bg-background px-8 shadow-sm">
        <div className="size-16 shrink-0 rounded-lg bg-muted" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="h-3 max-w-48 rounded-full bg-muted" />
          <div className="h-3 max-w-32 rounded-full bg-muted/70" />
        </div>
      </div>
    </div>
  );
}

export interface EmptyState1Props {
  className?: string;
  onConnectSource?: () => void;
  onUploadCsv?: () => void;
}

export function EmptyState1({
  className,
  onConnectSource,
  onUploadCsv,
}: EmptyState1Props) {
  return (
    <section
      className={cn(
        "flex min-h-[34rem] w-full flex-col items-center justify-center bg-background px-6 py-16 text-center text-foreground",
        className
      )}
    >
      <RecordIllustration />
      <div className="mt-10 max-w-2xl">
        <h2 className="font-bold font-heading text-3xl tracking-tight sm:text-4xl">
          Your record space is empty
        </h2>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Connect a live source or upload a CSV to start organizing people,
          teams, and attributes in one place.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={onConnectSource} type="button">
          <CableIcon data-icon="inline-start" />
          Connect source
        </Button>
        <Button onClick={onUploadCsv} type="button" variant="outline">
          <UploadIcon data-icon="inline-start" />
          Upload CSV
        </Button>
      </div>
    </section>
  );
}
