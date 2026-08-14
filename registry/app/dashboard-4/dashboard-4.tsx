import { CalendarDaysIcon, DownloadIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  XAxis,
} from "recharts";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const sparkData = [22, 16, 31, 25, 34, 27, 33, 21].map((value, index) => ({
  index,
  value,
}));
const sparkConfig = {
  value: { color: "var(--chart-2)", label: "Value" },
} satisfies ChartConfig;

const vectors = [
  { blocked: 28, name: "Bot", watched: 51 },
  { blocked: 25, name: "Phish", watched: 61 },
  { blocked: 43, name: "DDoS", watched: 27 },
  { blocked: 18, name: "Inject", watched: 39 },
  { blocked: 36, name: "Auth", watched: 56 },
  { blocked: 15, name: "Probe", watched: 47 },
  { blocked: 45, name: "Exfil", watched: 29 },
  { blocked: 31, name: "Beacon", watched: 53 },
  { blocked: 12, name: "Day0", watched: 23 },
] as const;

const vectorConfig = {
  blocked: { color: "var(--chart-3)", label: "Blocked" },
  watched: { color: "var(--chart-2)", label: "Watched" },
} satisfies ChartConfig;

const flowData = [
  { api: 29, month: "Feb", webhooks: 14 },
  { api: 24, month: "Mar", webhooks: 16 },
  { api: 35, month: "Apr", webhooks: 21 },
  { api: 26, month: "May", webhooks: 16 },
  { api: 41, month: "Jun", webhooks: 25 },
  { api: 31, month: "Jul", webhooks: 20 },
  { api: 47, month: "Aug", webhooks: 29 },
  { api: 37, month: "Sep", webhooks: 24 },
  { api: 29, month: "Oct", webhooks: 18 },
  { api: 43, month: "Nov", webhooks: 26 },
  { api: 33, month: "Dec", webhooks: 20 },
] as const;

const flowConfig = {
  api: { color: "var(--chart-3)", label: "API" },
  webhooks: { color: "var(--chart-2)", label: "Webhooks" },
} satisfies ChartConfig;

const getNodeStatus = (index: number) => {
  if ([11, 24].includes(index)) {
    return "critical";
  }
  if ([26, 29].includes(index)) {
    return "warm";
  }
  return "normal";
};

const clusterData = Array.from({ length: 52 }, (_, index) => ({
  load: 18 + ((index * 17) % 62),
  node: `N${String(index).padStart(2, "0")}`,
  status: getNodeStatus(index),
}));

const clusterConfig = {
  critical: { color: "var(--destructive)", label: "Critical" },
  normal: { color: "var(--muted-foreground)", label: "Normal" },
  warm: { color: "var(--chart-3)", label: "Warm" },
} satisfies ChartConfig;

const lanes = [
  {
    detail: "Edge WAF • Mitigating",
    name: "[00] API Flood",
    progress: 92,
    tone: "destructive" as const,
    value: "4,521",
  },
  {
    detail: "Mail Relay • Reviewing",
    name: "[01] Mail Spoof",
    progress: 64,
    tone: "secondary" as const,
    value: "3,102",
  },
  {
    detail: "Cloud API • Queued",
    name: "[02] Cloud Probe",
    progress: 26,
    tone: "outline" as const,
    value: "1,250",
  },
  {
    detail: "Int Node • Watching",
    name: "[03] Mesh Beacon",
    progress: 9,
    tone: "outline" as const,
    value: "420",
  },
] as const;

export interface Dashboard4Props {
  className?: string;
}

export function Dashboard4({ className }: Dashboard4Props) {
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
                <BreadcrumbLink href="#">Security</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Telemetry</BreadcrumbPage>
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
          aria-label="Telemetry summary"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            ["Signal Risk", "Threat Index", "Elevated", "+12.5%", "5 cases"],
            ["Mesh Uptime", "Service Health", "99.98%", "+0.2%", "58 zones"],
            ["Edge Traffic", "Scrubbed Load", "4.8 GB/s", "−31%", "clean flow"],
            ["Sensor Reach", "Global Nodes", "18,420", "+6.8%", "93 regions"],
          ].map(([title, description, value, delta, detail], index) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-[1fr_108px] items-end gap-3">
                <div>
                  <p className="font-semibold text-2xl">{value}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={index === 0 ? "destructive" : "secondary"}>
                      {delta}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      {detail}
                    </span>
                  </div>
                </div>
                <ChartContainer className="h-12 w-full" config={sparkConfig}>
                  <LineChart accessibilityLayer data={sparkData}>
                    <Line
                      dataKey="value"
                      dot={false}
                      stroke={
                        index === 0
                          ? "var(--destructive)"
                          : "var(--color-value)"
                      }
                      strokeWidth={2}
                      type="natural"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Threat Vectors</CardTitle>
              <CardDescription>Blocked signals</CardDescription>
              <CardAction>
                <div className="flex gap-3 text-muted-foreground text-xs">
                  <span>● Blocked</span>
                  <span>● Watched</span>
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[270px] w-full"
                config={vectorConfig}
              >
                <BarChart accessibilityLayer data={vectors}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={false}
                  />
                  <Bar
                    dataKey="blocked"
                    fill="var(--color-blocked)"
                    radius={4}
                  />
                  <Bar
                    dataKey="watched"
                    fill="var(--color-watched)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Network Flow</CardTitle>
              <CardDescription>API and webhooks</CardDescription>
              <CardAction>
                <Badge variant="secondary">+12.8%</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[270px] w-full" config={flowConfig}>
                <AreaChart accessibilityLayer data={flowData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={false}
                  />
                  <Area
                    dataKey="api"
                    fill="var(--color-api)"
                    fillOpacity={0.12}
                    stroke="var(--color-api)"
                    strokeWidth={2}
                    type="natural"
                  />
                  <Area
                    dataKey="webhooks"
                    fill="var(--color-webhooks)"
                    fillOpacity={0.12}
                    stroke="var(--color-webhooks)"
                    strokeWidth={2}
                    type="natural"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Cluster Load</CardTitle>
              <CardDescription>
                ● Normal &nbsp; ● Warm &nbsp; ● Critical
              </CardDescription>
              <CardAction>
                <div className="flex gap-2">
                  <Badge variant="secondary">52 Nodes</Badge>
                  <Badge variant="outline">2 Warm</Badge>
                  <Badge variant="destructive">2 Critical</Badge>
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[320px] w-full"
                config={clusterConfig}
              >
                <BarChart accessibilityLayer data={clusterData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="node"
                    interval={25}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={false}
                  />
                  <Bar dataKey="load" radius={4}>
                    {clusterData.map((node) => (
                      <Cell
                        fill={`var(--color-${node.status})`}
                        key={node.node}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Lanes</CardTitle>
              <CardDescription>Threat queue</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {lanes.map((lane) => (
                <div className="flex flex-col gap-2" key={lane.name}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">{lane.name}</span>
                    <strong>{lane.value}</strong>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {lane.detail}
                  </span>
                  <div className="flex items-center gap-3">
                    <Progress value={lane.progress} />
                    <Badge variant={lane.tone}>{lane.progress}%</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
