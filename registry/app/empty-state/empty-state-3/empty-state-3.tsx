import { BarChart3Icon, EyeIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EmptyState3Props {
  className?: string;
  onAddReport?: () => void;
  onViewSample?: () => void;
}

export function EmptyState3({
  className,
  onAddReport,
  onViewSample,
}: EmptyState3Props) {
  return (
    <section
      className={cn(
        "w-full bg-background px-6 py-16 text-foreground sm:px-12 lg:px-20",
        className
      )}
    >
      <div className="mx-auto grid min-h-[30rem] max-w-6xl overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[minmax(20rem,1fr)_minmax(22rem,1.2fr)]">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-muted">
            <BarChart3Icon aria-hidden="true" className="size-6" />
          </div>
          <h2 className="max-w-md font-bold font-heading text-3xl tracking-tight sm:text-4xl">
            No reports for this workspace
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground leading-relaxed">
            Create your first report to turn tracked companies into one clear
            view your team can share.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onAddReport} type="button">
              <PlusIcon data-icon="inline-start" />
              Add report
            </Button>
            <Button onClick={onViewSample} type="button" variant="outline">
              <EyeIcon data-icon="inline-start" />
              View sample
            </Button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="min-h-64 border-border border-t bg-background lg:border-t-0 lg:border-l"
        />
      </div>
    </section>
  );
}
