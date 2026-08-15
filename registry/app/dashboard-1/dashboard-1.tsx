import {
  BotIcon,
  BoxIcon,
  CalendarDaysIcon,
  DownloadIcon,
  EllipsisIcon,
  PlusIcon,
  SearchIcon,
  ShieldAlertIcon,
  TruckIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

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
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const headlineStats = [
  {
    delta: "+11.8% (1,946)",
    eyebrow: "Outbound",
    icon: BoxIcon,
    label: "Ready Volume",
    title: "Orders Ready",
    value: "18,420",
  },
  {
    delta: "+1.2 pts (shift)",
    eyebrow: "Promise",
    icon: TruckIcon,
    label: "Service Level",
    title: "Same-Day SLA",
    value: "94.8%",
  },
  {
    delta: "13 fewer (since 06:00)",
    eyebrow: "Inventory",
    icon: ShieldAlertIcon,
    label: "Blocked SKUs",
    title: "Stock Risk",
    value: "31",
  },
  {
    delta: "+8.4 pts (policy)",
    eyebrow: "Policy",
    icon: BotIcon,
    label: "Auto Resolved",
    title: "AI Autopilot",
    value: "71.6%",
  },
] as const;

const decisionData = [
  { fill: "var(--color-autopilot)", mode: "autopilot", value: 49.5 },
  { fill: "var(--color-copilot)", mode: "copilot", value: 28.3 },
  { fill: "var(--color-manual)", mode: "manual", value: 15.2 },
] as const;

const decisionConfig = {
  autopilot: { color: "var(--chart-2)", label: "Autopilot" },
  copilot: { color: "var(--chart-3)", label: "Copilot" },
  manual: { color: "var(--chart-4)", label: "Manual" },
} satisfies ChartConfig;

const exceptionRows = [
  {
    automation: "Autopilot",
    customer: "Northline Studio",
    lane: "Los Angeles to Seattle",
    order: "NSC-84763",
    progress: 82,
    stage: "Packing",
    state: "On Time",
    value: "$52,210",
  },
  {
    automation: "Copilot",
    customer: "Avery Outdoor",
    lane: "Chicago to Austin",
    order: "NSC-84721",
    progress: 72,
    stage: "Carrier tender",
    state: "At Risk",
    value: "$38,240",
  },
  {
    automation: "Manual",
    customer: "Kinship Goods",
    lane: "Miami to Boston",
    order: "NSC-84698",
    progress: 44,
    stage: "Inventory hold",
    state: "Blocked",
    value: "$19,870",
  },
] as const;

export interface Dashboard1Props {
  className?: string;
}

export function Dashboard1({ className }: Dashboard1Props) {
  const [query, setQuery] = useState("");
  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    []
  );
  const visibleRows = exceptionRows.filter((row) =>
    `${row.order} ${row.customer}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4">
        <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Operations</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Fulfillment</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <CalendarDaysIcon data-icon="inline-start" />
              May 12, 2026 – Jun 10, 2026
            </Button>
            <Button>
              <DownloadIcon data-icon="inline-start" />
              Export
            </Button>
          </div>
        </header>

        <section
          aria-label="Fulfillment summary"
          className="grid gap-px overflow-hidden rounded-xl bg-border p-px sm:grid-cols-2 xl:grid-cols-4"
        >
          {headlineStats.map(
            ({ icon: Icon, eyebrow, title, label, value, delta }) => (
              <Card
                className="rounded-none ring-0 first:rounded-t-xl last:rounded-b-xl sm:last:rounded-br-xl sm:last:rounded-bl-none sm:first:rounded-tl-xl sm:first:rounded-tr-none xl:last:rounded-r-xl xl:first:rounded-l-xl"
                key={title}
              >
                <CardHeader className="grid grid-cols-[auto_1fr] items-center gap-x-3">
                  <span className="row-span-2 grid size-10 place-items-center rounded-lg bg-muted">
                    <Icon className="size-5" />
                  </span>
                  <CardDescription>{eyebrow}</CardDescription>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-muted-foreground">{label}</span>
                  <p className="font-semibold text-2xl tracking-tight">
                    {value}{" "}
                    <span className="font-medium text-chart-2 text-sm">
                      {delta}
                    </span>
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <Card className="xl:row-span-2">
            <CardHeader>
              <CardTitle>Shift Performance</CardTitle>
              <CardAction>
                <Select defaultValue="today">
                  <SelectTrigger aria-label="Shift period" className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["18.4k", "Orders Cleared", "+11.8%"],
                  ["94.8%", "SLA Recovery", "+1.2 pts"],
                  ["$128k", "Risk Exposure", "−9.4%"],
                ].map(([value, label, delta]) => (
                  <div className="flex flex-col gap-1" key={label}>
                    <strong className="text-2xl">{value}</strong>
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-chart-2 text-xs">
                      {delta}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 border-y py-6">
                <div className="flex justify-between font-medium">
                  <span>Pipeline Progress</span>
                  <span>76%</span>
                </div>
                <Progress value={76} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium">Recent Activity</h3>
                {[
                  ["Released priority wave to dock B", "Cleared"],
                  ["Carrier mix repriced for zone 6", "Review"],
                  ["Inventory hold isolated to 3 SKUs", "Watch"],
                ].map(([activity, status]) => (
                  <div
                    className="flex items-center justify-between gap-3"
                    key={activity}
                  >
                    <span className="text-sm">{activity}</span>
                    <Badge variant="secondary">{status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button variant="outline">Schedule</Button>
              <Button>Full Report</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Capacity Allocation</CardTitle>
              <CardAction>
                <Tabs defaultValue="week">
                  <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <p className="font-semibold text-3xl">
                86%{" "}
                <span className="font-medium text-chart-2 text-sm">+5.8%</span>{" "}
                <span className="font-normal text-muted-foreground text-sm">
                  vs labor plan
                </span>
              </p>
              <Progress className="h-3" value={86} />
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  Queued Orders:{" "}
                  <strong className="text-foreground">3,840 orders</strong>
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex -gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback>AO</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-2 size-7">
                      <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-2 size-7">
                      <AvatarFallback>LH</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-muted-foreground">6 Members</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Decision Flow</CardTitle>
              <CardAction>
                <Tabs defaultValue="week">
                  <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardAction>
            </CardHeader>
            <CardContent className="grid items-center gap-4 sm:grid-cols-[180px_1fr]">
              <ChartContainer
                className="mx-auto aspect-square h-[170px]"
                config={decisionConfig}
              >
                <PieChart accessibilityLayer>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={decisionData}
                    dataKey="value"
                    innerRadius={48}
                    nameKey="mode"
                    outerRadius={72}
                    paddingAngle={3}
                  >
                    {decisionData.map((item) => (
                      <Cell fill={item.fill} key={item.mode} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="flex flex-col gap-3">
                {decisionData.map((item, index) => (
                  <div
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b pb-3 last:border-0"
                    key={item.mode}
                  >
                    <span className="capitalize">{item.mode}</span>
                    <strong>{["9.1k", "5.2k", "2.8k"][index]}</strong>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Exception Queue</CardTitle>
            <CardDescription>
              {visibleRows.length} active fulfillment records
            </CardDescription>
            <CardAction>
              <Button>
                <PlusIcon data-icon="inline-start" />
                Add exception
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-0">
            <div className="flex flex-col justify-between gap-2 px-4 sm:flex-row">
              <Label
                className="relative max-w-sm flex-1"
                htmlFor="exception-search"
              >
                <SearchIcon className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
                <span className="sr-only">Search orders</span>
                <Input
                  className="pl-8"
                  id="exception-search"
                  onChange={handleQueryChange}
                  placeholder="Search orders…"
                  value={query}
                />
              </Label>
              <Button aria-label="More actions" size="icon" variant="outline">
                <EllipsisIcon />
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Lane</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Automation</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.order}>
                    <TableCell className="font-medium">{row.order}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell className="max-w-40 truncate">
                      {row.lane}
                    </TableCell>
                    <TableCell>
                      <div className="flex min-w-32 flex-col gap-1">
                        <span>{row.stage}</span>
                        <Progress value={row.progress} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.automation}</Badge>
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.state === "Blocked" ? "destructive" : "outline"
                        }
                      >
                        {row.state}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
