import type { LucideIcon } from "lucide-react";
import { DownloadIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PREVIEW_CELLS = ["overview", "activity", "team"] as const;
const HOME_HREF = "#";
const PROJECTS_HREF = "#";

export interface PageHeader2Action {
  href?: string;
  icon?: LucideIcon;
  label: string;
}

export interface PageHeader2Props {
  badge?: string | null;
  className?: string;
  primaryAction?: PageHeader2Action | null;
  secondaryAction?: PageHeader2Action | null;
  title?: string;
}

function HeaderAction({
  action,
  variant,
}: {
  action: PageHeader2Action;
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

export function PageHeader2({
  badge = "Active",
  className,
  primaryAction = { label: "Save Changes" },
  secondaryAction = { icon: DownloadIcon, label: "Export" },
  title = "Acme App",
}: PageHeader2Props) {
  return (
    <section
      className={cn(
        "w-full bg-background px-6 py-12 text-foreground",
        className
      )}
    >
      <div className="mx-auto w-full max-w-5xl">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <a href={HOME_HREF}>Home</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <a href={PROJECTS_HREF}>Projects</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4 border-border border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-semibold text-title sm:text-3xl">
              {title}
            </h1>
            {badge ? <Badge variant="secondary">{badge}</Badge> : null}
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
