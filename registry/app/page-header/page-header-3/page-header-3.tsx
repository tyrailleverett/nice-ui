import type { LucideIcon } from "lucide-react";
import { LayoutGridIcon, ListIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface PageHeader3Props {
  className?: string;
  description?: string;
  primaryAction?: { href?: string; icon?: LucideIcon; label: string } | null;
  title?: string;
}

type ViewMode = "grid" | "list";

export function PageHeader3({
  className,
  description = "Manage and track every project across your workspace.",
  primaryAction = { icon: PlusIcon, label: "New project" },
  title = "Projects",
}: PageHeader3Props) {
  const [view, setView] = useState<ViewMode>("list");
  const ActionIcon = primaryAction?.icon;

  const showList = useCallback(() => setView("list"), []);
  const showGrid = useCallback(() => setView("grid"), []);

  return (
    <section
      className={cn(
        "w-full bg-background px-6 py-10 text-foreground",
        className
      )}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold font-heading text-2xl tracking-tight">
              {title}
            </h1>
            {description ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : null}
          </div>
          {primaryAction ? (
            <Button
              asChild={Boolean(primaryAction.href)}
              className="w-full sm:w-auto"
            >
              {primaryAction.href ? (
                <a href={primaryAction.href}>
                  {ActionIcon ? <ActionIcon data-icon="inline-start" /> : null}
                  {primaryAction.label}
                </a>
              ) : (
                <>
                  {ActionIcon ? <ActionIcon data-icon="inline-start" /> : null}
                  {primaryAction.label}
                </>
              )}
            </Button>
          ) : null}
        </div>

        <Separator className="my-5" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <InputGroup className="w-full sm:max-w-xs">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              aria-label="Search projects"
              placeholder="Search projects..."
              type="search"
            />
          </InputGroup>

          <div className="flex items-center gap-2">
            <Select defaultValue="Active">
              <SelectTrigger aria-label="Filter by status" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select defaultValue="Most recent">
              <SelectTrigger aria-label="Sort by" className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Most recent">Most recent</SelectItem>
                  <SelectItem value="Name">Name</SelectItem>
                  <SelectItem value="Owner">Owner</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex overflow-hidden rounded-lg border border-border">
              <button
                aria-label="List view"
                aria-pressed={view === "list"}
                className={cn(
                  "flex size-8 items-center justify-center transition-colors",
                  view === "list"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted/60"
                )}
                onClick={showList}
                type="button"
              >
                <ListIcon aria-hidden="true" className="size-4" />
              </button>
              <button
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                className={cn(
                  "flex size-8 items-center justify-center border-border border-l transition-colors",
                  view === "grid"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted/60"
                )}
                onClick={showGrid}
                type="button"
              >
                <LayoutGridIcon aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
