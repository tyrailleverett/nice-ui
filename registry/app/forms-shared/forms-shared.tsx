import { CircleHelpIcon, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type StatusTone = "default" | "success" | "warning" | "accent";

export function FormPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <div className="min-h-svh bg-background text-foreground">
        <div
          className={cn(
            "mx-auto flex w-full max-w-5xl flex-col gap-6 p-6 sm:p-8",
            className
          )}
        >
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}

export function FormHeading({
  action,
  description,
  title,
}: {
  action?: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="font-heading font-semibold text-title sm:text-3xl">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          {description}
        </p>
      </div>
      {action ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {action}
        </div>
      ) : null}
    </header>
  );
}

export function StatusBadge({
  children,
  icon: Icon,
  tone = "default",
}: {
  children: ReactNode;
  icon?: LucideIcon;
  tone?: StatusTone;
}) {
  return (
    <Badge
      className={cn(
        tone === "success" &&
          "border-emerald-500/40 bg-emerald-500/10 text-emerald-700",
        tone === "warning" &&
          "border-amber-500/40 bg-amber-500/10 text-amber-800",
        tone === "accent" &&
          "border-violet-500/40 bg-violet-500/10 text-violet-700"
      )}
      variant="outline"
    >
      {Icon ? <Icon data-icon="inline-start" /> : null}
      {children}
    </Badge>
  );
}

export function FieldHint({ label }: { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            size="icon-xs"
            type="button"
            variant="ghost"
          />
        }
      >
        <CircleHelpIcon />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function FormRow({
  children,
  htmlFor,
  label,
}: {
  children: ReactNode;
  htmlFor?: string;
  label: ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[12.5rem_minmax(0,1fr)] sm:items-start">
      {htmlFor ? (
        <label
          className="flex min-h-8 items-center gap-1 pt-0.5 font-medium text-sm"
          htmlFor={htmlFor}
        >
          {label}
        </label>
      ) : (
        <div className="flex min-h-8 items-center gap-1 pt-0.5 font-medium text-sm">
          {label}
        </div>
      )}
      <div className="min-w-0">{children}</div>
    </div>
  );
}
