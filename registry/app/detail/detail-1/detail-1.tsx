import {
  EllipsisIcon,
  PackageIcon,
  RouteIcon,
  ShieldAlertIcon,
  TruckIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const facts = [
  { label: "Lane", value: "Los Angeles to Seattle" },
  { label: "Stage", value: "Packing · 82%" },
  { label: "Automation", value: "Autopilot paused" },
  { label: "Order value", value: "$52,210" },
  { label: "Promise", value: "Same-day, 14:20 cutoff" },
  { label: "Owner", value: "Lena Hoffman" },
] as const;

const holdLines = [
  {
    bin: "BIN-4418",
    sku: "NL-WRAP-12",
    status: "Missing",
    units: "24 units",
  },
  {
    bin: "BIN-4419",
    sku: "NL-TAPE-04",
    status: "Ready",
    units: "12 units",
  },
  {
    bin: "DOCK-B",
    sku: "Carton wave 6",
    status: "Held",
    units: "3 pallets",
  },
] as const;

const activity = [
  {
    body: "Paused autopilot after BIN-4418 failed the cycle count.",
    id: "act-1",
    initials: "LH",
    kind: "people" as const,
    name: "Lena Hoffman",
    time: "6 min ago",
  },
  {
    body: "Dock B wave released except the Northline carton set.",
    id: "act-2",
    initials: "SYS",
    kind: "system" as const,
    name: "Fulfillment autopilot",
    time: "11 min ago",
  },
  {
    body: "Requested a recount on wrap SKU NL-WRAP-12.",
    id: "act-3",
    initials: "TM",
    kind: "people" as const,
    name: "Theo Mercer",
    time: "18 min ago",
  },
  {
    body: "Same-day promise still inside the 14:20 cutoff.",
    id: "act-4",
    initials: "SYS",
    kind: "system" as const,
    name: "SLA monitor",
    time: "22 min ago",
  },
] as const;

type ActivityFilter = "all" | "people" | "system";

export interface Detail1Props {
  className?: string;
  onChangeLane?: () => void;
  onReleaseHold?: () => void;
}

export function Detail1({
  className,
  onChangeLane,
  onReleaseHold,
}: Detail1Props) {
  const [filter, setFilter] = useState<ActivityFilter>("all");
  const handleFilter = useCallback((value: string) => {
    if (value === "all" || value === "people" || value === "system") {
      setFilter(value);
    }
  }, []);
  const visibleActivity = useMemo(
    () => activity.filter((item) => filter === "all" || item.kind === filter),
    [filter]
  );

  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5">
        <header className="flex flex-col gap-4">
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

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading font-semibold text-2xl tracking-tight sm:text-3xl">
                  <span className="font-mono text-[0.92em] tracking-tight">
                    NSC-84763
                  </span>
                </h1>
                <Badge variant="destructive">Blocked</Badge>
                <Badge variant="outline">Northline Studio</Badge>
              </div>
              <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
                Packing is paused because wrap SKU NL-WRAP-12 is missing from
                dock B. The same-day promise is still inside cutoff.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={onChangeLane} type="button" variant="outline">
                <RouteIcon data-icon="inline-start" />
                Change lane
              </Button>
              <Button onClick={onReleaseHold} type="button">
                <PackageIcon data-icon="inline-start" />
                Release hold
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="More actions"
                    size="icon"
                    variant="outline"
                  >
                    <EllipsisIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Reassign owner</DropdownMenuItem>
                    <DropdownMenuItem>Print dock ticket</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      Cancel order
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <section
          aria-label="Record facts"
          className="grid gap-px overflow-hidden rounded-xl bg-border p-px sm:grid-cols-2 xl:grid-cols-3"
        >
          {facts.map((fact) => (
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

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(20rem,0.9fr)]">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Hold</CardTitle>
                <CardDescription>
                  Inventory isolated this carton set at 09:14.
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">
                    <ShieldAlertIcon data-icon="inline-start" />1 SKU blocking
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Packing progress</span>
                    <span className="tabular-nums">82%</span>
                  </div>
                  <Progress value={82} />
                </div>
                <ul className="flex flex-col">
                  {holdLines.map((line) => (
                    <li
                      className="grid grid-cols-[1fr_auto] gap-3 border-border border-b py-3 last:border-0 sm:grid-cols-[7rem_1fr_auto_auto]"
                      key={line.sku}
                    >
                      <span className="font-mono text-muted-foreground text-xs">
                        {line.bin}
                      </span>
                      <span className="font-medium">{line.sku}</span>
                      <span className="text-muted-foreground text-sm">
                        {line.units}
                      </span>
                      <Badge
                        variant={
                          line.status === "Missing" ? "destructive" : "outline"
                        }
                      >
                        {line.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="gap-2">
                <Button type="button" variant="outline">
                  Start recount
                </Button>
                <Button type="button">Substitute SKU</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next move</CardTitle>
                <CardDescription>
                  Keep the Seattle promise without releasing an incomplete
                  pallet.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                  <TruckIcon className="mt-0.5 size-4 text-muted-foreground" />
                  <p className="text-sm">
                    If wrap stock lands before 13:10, autopilot can finish the
                    wave. After that, split the carton set and retender zone 6.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="border-b">
              <CardTitle>Activity</CardTitle>
              <CardAction>
                <ToggleGroup
                  onValueChange={handleFilter}
                  size="sm"
                  type="single"
                  value={filter}
                  variant="outline"
                >
                  <ToggleGroupItem aria-label="All activity" value="all">
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem aria-label="People activity" value="people">
                    People
                  </ToggleGroupItem>
                  <ToggleGroupItem aria-label="System activity" value="system">
                    System
                  </ToggleGroupItem>
                </ToggleGroup>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-0 px-0">
              {visibleActivity.map((item, index) => (
                <article className="flex gap-3 px-4 py-4" key={item.id}>
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="font-medium text-sm">{item.name}</h2>
                      <time className="shrink-0 text-muted-foreground text-xs">
                        {item.time}
                      </time>
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {item.body}
                    </p>
                    {index < visibleActivity.length - 1 ? (
                      <Separator className="mt-4" />
                    ) : null}
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
