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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export interface PageHeader3Props {
  className?: string;
  description?: string;
  primaryAction?: { href?: string; icon?: LucideIcon; label: string } | null;
  title?: string;
}

type ViewMode = "grid" | "list";

function HeaderAction({
  action,
}: {
  action: NonNullable<PageHeader3Props["primaryAction"]>;
}) {
  const ActionIcon = action.icon;
  const content = (
    <>
      {ActionIcon ? <ActionIcon data-icon="inline-start" /> : null}
      {action.label}
    </>
  );

  if (action.href) {
    return (
      <Button
        className="w-full sm:w-auto"
        nativeButton={false}
        render={<a href={action.href} />}
      >
        {content}
      </Button>
    );
  }

  return <Button className="w-full sm:w-auto">{content}</Button>;
}

export function PageHeader3({
  className,
  description = "Manage and track every project across your workspace.",
  primaryAction = { icon: PlusIcon, label: "New project" },
  title = "Projects",
}: PageHeader3Props) {
  const [view, setView] = useState<ViewMode>("list");

  const handleViewChange = useCallback((values: string[]) => {
    const [value] = values;
    if (value === "list" || value === "grid") {
      setView(value);
    }
  }, []);

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
            <h1 className="font-heading font-semibold text-title">{title}</h1>
            {description ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : null}
          </div>
          {primaryAction ? <HeaderAction action={primaryAction} /> : null}
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
            <Select
              defaultValue="Active"
              items={[
                { label: "All", value: "All" },
                { label: "Active", value: "Active" },
                { label: "Archived", value: "Archived" },
              ]}
            >
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
            <Select
              defaultValue="Most recent"
              items={[
                { label: "Most recent", value: "Most recent" },
                { label: "Name", value: "Name" },
                { label: "Owner", value: "Owner" },
              ]}
            >
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
            <ToggleGroup
              className="overflow-hidden rounded-lg border border-border"
              onValueChange={handleViewChange}
              spacing={0}
              value={[view]}
            >
              <ToggleGroupItem
                aria-label="List view"
                className="size-8 rounded-none"
                value="list"
              >
                <ListIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                aria-label="Grid view"
                className="size-8 rounded-none"
                value="grid"
              >
                <LayoutGridIcon />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
