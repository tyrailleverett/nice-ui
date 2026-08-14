import type { LucideIcon } from "lucide-react";
import { DownloadIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PREVIEW_CELLS = ["overview", "activity", "team"] as const;

export interface PageHeader1Action {
  href?: string;
  icon?: LucideIcon;
  label: string;
}

export interface PageHeader1Props {
  className?: string;
  description?: string;
  primaryAction?: PageHeader1Action | null;
  secondaryAction?: PageHeader1Action | null;
  title?: string;
}

function HeaderAction({
  action,
  variant,
}: {
  action: PageHeader1Action;
  variant?: "outline";
}) {
  const Icon = action.icon;

  if (action.href) {
    return (
      <Button asChild variant={variant}>
        <a href={action.href}>
          {Icon ? <Icon data-icon="inline-start" /> : null}
          {action.label}
        </a>
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant}>
      {Icon ? <Icon data-icon="inline-start" /> : null}
      {action.label}
    </Button>
  );
}

export function PageHeader1({
  className,
  description = "Manage your team's projects and track their progress.",
  primaryAction = { icon: PlusIcon, label: "New Project" },
  secondaryAction = { icon: DownloadIcon, label: "Export" },
  title = "Projects",
}: PageHeader1Props) {
  return (
    <section
      className={cn(
        "w-full bg-background px-6 py-12 text-foreground",
        className
      )}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-4 border-border border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-bold font-heading text-2xl tracking-tight sm:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {secondaryAction ? (
              <HeaderAction action={secondaryAction} variant="outline" />
            ) : null}
            {primaryAction ? <HeaderAction action={primaryAction} /> : null}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {PREVIEW_CELLS.map((cell) => (
            <div
              className="h-28 rounded-lg border border-border bg-muted/30"
              key={cell}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
