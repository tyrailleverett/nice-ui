import type { LucideIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PageHeader4Action {
  href?: string;
  icon?: LucideIcon;
  label: string;
}

export interface PageHeader4Props {
  actions?: PageHeader4Action[];
  className?: string;
  eyebrow?: string;
  status?: string | null;
  tabs?: string[];
  title?: string;
}

function HeaderAction({ action }: { action: PageHeader4Action }) {
  const Icon = action.icon;
  const content = (
    <>
      {Icon ? <Icon data-icon="inline-start" /> : null}
      {action.label}
    </>
  );

  if (action.href) {
    return (
      <Button
        nativeButton={false}
        render={<a href={action.href} />}
        variant="outline"
      >
        {content}
      </Button>
    );
  }

  return <Button variant="outline">{content}</Button>;
}

export function PageHeader4({
  actions = [{ label: "Open command menu" }],
  className,
  eyebrow = "Northstar workspace",
  status = "Operational",
  tabs = ["Overview", "Activity", "Access", "Settings"],
  title = "Workspace health",
}: PageHeader4Props) {
  return (
    <section
      className={cn(
        "w-full bg-background px-6 py-8 text-foreground",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 border-border border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.16em]">
              {eyebrow}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading font-semibold text-title sm:text-3xl">
                {title}
              </h1>
              {status ? <Badge variant="secondary">{status}</Badge> : null}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {actions.map((action) => (
              <HeaderAction action={action} key={action.label} />
            ))}
          </div>
        </div>

        <nav
          aria-label="Page sections"
          className="flex gap-6 overflow-x-auto pt-4"
        >
          {tabs.map((tab, index) => (
            <a
              aria-current={index === 0 ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-1 border-b-2 pb-3 text-sm",
                index === 0
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              href={`#${tab.toLowerCase().replaceAll(" ", "-")}`}
              key={tab}
            >
              {tab}
              {index === 0 ? <ChevronRightIcon className="size-3.5" /> : null}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
