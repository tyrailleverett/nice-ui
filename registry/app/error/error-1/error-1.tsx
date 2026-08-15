import { SearchIcon } from "lucide-react";

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
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const nearby = [
  { customer: "Northline Studio", id: "NSC-84763", state: "Blocked" },
  { customer: "Avery Outdoor", id: "NSC-84721", state: "At risk" },
  { customer: "Kinship Goods", id: "NSC-84698", state: "Blocked" },
] as const;

export interface Error1Props {
  className?: string;
  onBackToQueue?: () => void;
  onSearchExceptions?: () => void;
}

export function Error1({
  className,
  onBackToQueue,
  onSearchExceptions,
}: Error1Props) {
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
              <BreadcrumbPage>NSC-84901</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading font-semibold text-title">NSC-84901</h1>
            <Badge variant="outline">Missing</Badge>
          </div>
          <Skeleton className="h-4 w-64" />
        </div>

        <Empty className="border border-dashed">
          <EmptyHeader className="max-w-lg">
            <EmptyTitle className="text-xl">
              This order is not in the workspace
            </EmptyTitle>
            <EmptyDescription>
              NSC-84901 is not in the live fulfillment queue. It may have been
              archived, merged, or typed with the wrong prefix.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={onSearchExceptions} type="button">
                <SearchIcon data-icon="inline-start" />
                Search exceptions
              </Button>
              <Button onClick={onBackToQueue} type="button" variant="outline">
                Back to queue
              </Button>
            </div>
          </EmptyContent>
        </Empty>

        <Card>
          <CardHeader>
            <CardTitle>Nearby in the queue</CardTitle>
            <CardDescription>
              Open records with similar IDs from this morning’s wave.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {nearby.map((row) => (
              <a
                className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5 hover:bg-muted"
                href={`#${row.id}`}
                key={row.id}
              >
                <span className="font-mono text-sm">{row.id}</span>
                <span className="min-w-0 flex-1 truncate text-muted-foreground text-sm">
                  {row.customer}
                </span>
                <Badge variant="secondary">{row.state}</Badge>
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
