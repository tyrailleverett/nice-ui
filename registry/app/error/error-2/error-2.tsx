import { LockIcon, UserRoundPlusIcon } from "lucide-react";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const visibleFacts = [
  { label: "Lane", value: "Los Angeles to Seattle" },
  { label: "Customer", value: "Northline Studio" },
  { label: "Stage", value: "Packing" },
] as const;

export interface Error2Props {
  className?: string;
  onRequestAccess?: () => void;
  onSwitchWorkspace?: () => void;
}

export function Error2({
  className,
  onRequestAccess,
  onSwitchWorkspace,
}: Error2Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Operations</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Fulfillment</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>NSC-84763</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading font-mono font-semibold text-2xl tracking-tight">
              NSC-84763
            </h1>
            <Badge variant="secondary">Restricted</Badge>
            <Badge variant="outline">Northline Studio</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            You can see this order exists. Packing notes and hold details are
            limited to dock leads.
          </p>
        </header>

        <section
          aria-label="Visible facts"
          className="grid gap-px overflow-hidden rounded-xl bg-border p-px sm:grid-cols-3"
        >
          {visibleFacts.map((fact) => (
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
        </section>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.8fr)]">
          <Empty className="min-h-72 border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <LockIcon />
              </EmptyMedia>
              <EmptyTitle className="text-lg">
                Hold details are locked
              </EmptyTitle>
              <EmptyDescription>
                Request dock-lead access to see the missing SKU, recount, and
                release actions.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={onRequestAccess} type="button">
                  <UserRoundPlusIcon data-icon="inline-start" />
                  Request access
                </Button>
                <Button
                  onClick={onSwitchWorkspace}
                  type="button"
                  variant="outline"
                >
                  Switch workspace
                </Button>
              </div>
            </EmptyContent>
          </Empty>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>Hidden for this role.</CardDescription>
            </CardHeader>
            <CardContent aria-hidden="true" className="flex flex-col gap-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
