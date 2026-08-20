import {
  ArrowUpRightIcon,
  BarChart3Icon,
  CheckIcon,
  CircleAlertIcon,
  GaugeIcon,
  Layers3Icon,
  SparklesIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const trendData = [
  { day: "May 12", events: 18_200 },
  { day: "May 15", events: 22_100 },
  { day: "May 18", events: 19_800 },
  { day: "May 21", events: 26_700 },
  { day: "May 24", events: 24_800 },
  { day: "May 27", events: 31_200 },
  { day: "May 30", events: 28_900 },
  { day: "Jun 02", events: 35_400 },
  { day: "Jun 05", events: 33_700 },
  { day: "Jun 08", events: 38_200 },
] as const;

const trendConfig = {
  events: { color: "var(--chart-2)", label: "API events" },
} satisfies ChartConfig;

const formatThousands = (value: number) => `${value / 1000}k`;

const quotas = [
  {
    detail: "Across production and preview",
    icon: Layers3Icon,
    label: "API events",
    limit: "500k",
    percent: 76,
    used: "382k",
  },
  {
    detail: "Rolling 30-day window",
    icon: GaugeIcon,
    label: "Compute minutes",
    limit: "5,000",
    percent: 61,
    used: "3,050",
  },
  {
    detail: "11 of 12 assigned seats",
    icon: SparklesIcon,
    label: "Team members",
    limit: "12",
    percent: 92,
    used: "11",
  },
  {
    detail: "Includes 2 TB transfer",
    icon: BarChart3Icon,
    label: "Data transfer",
    limit: "2 TB",
    percent: 38,
    used: "760 GB",
  },
] as const;

export interface UsageDashboardProps {
  className?: string;
}

export function UsageDashboard({ className }: UsageDashboardProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
              Workspace / Billing
            </p>
            <h1 className="font-heading font-semibold text-3xl tracking-tight sm:text-4xl">
              Usage &amp; limits
            </h1>
            <p className="max-w-xl text-muted-foreground">
              Keep an eye on the resources powering your workspace. Your cycle
              resets on June 10, 2026.
            </p>
          </div>
          <Button className="w-fit" variant="outline">
            Manage billing
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </header>

        <section
          aria-label="Current plan"
          className="grid gap-px overflow-hidden rounded-xl bg-border p-px md:grid-cols-[1.3fr_1fr_1fr]"
        >
          <div className="flex flex-col justify-between gap-5 bg-card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">Current plan</Badge>
              <span className="font-mono text-muted-foreground text-xs">
                PLAN_02
              </span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-heading font-semibold text-2xl">Growth</h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  For teams shipping at a steady clip.
                </p>
              </div>
              <p className="font-medium font-mono text-lg tabular-nums">
                $149
                <span className="font-sans text-muted-foreground text-sm">
                  {" "}
                  / mo
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 bg-card p-5 sm:p-6">
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
              Renewal
            </p>
            <p className="font-medium">June 10, 2026</p>
            <p className="text-muted-foreground text-sm">Auto-renews monthly</p>
          </div>
          <div className="flex flex-col justify-center gap-2 bg-card p-5 sm:p-6">
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
              This cycle
            </p>
            <p className="font-medium">16 days remaining</p>
            <p className="text-muted-foreground text-sm">
              76% of total capacity
            </p>
          </div>
        </section>

        <section
          aria-labelledby="quota-ledger-title"
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2
                className="font-heading font-semibold text-xl"
                id="quota-ledger-title"
              >
                Quota ledger
              </h2>
              <p className="text-muted-foreground text-sm">
                A live readout of your plan allocation.
              </p>
            </div>
            <span className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
              04 resources tracked
            </span>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl bg-border p-px sm:grid-cols-2 xl:grid-cols-4">
            {quotas.map(
              ({ detail, icon: Icon, label, limit, percent, used }) => (
                <Card className="rounded-none border-0 shadow-none" key={label}>
                  <CardHeader className="gap-3 pb-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid size-8 place-items-center rounded-md bg-muted">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="font-mono text-muted-foreground text-xs">
                        {String(
                          quotas.findIndex((quota) => quota.label === label) + 1
                        ).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{label}</CardTitle>
                      <CardDescription>{detail}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono font-semibold text-2xl tabular-nums">
                        {used}
                      </span>
                      <span className="font-mono text-muted-foreground text-xs">
                        of {limit}
                      </span>
                    </div>
                    <Progress
                      aria-label={`${label}: ${percent}% used`}
                      indicatorClassName={cn(
                        percent >= 90 ? "bg-destructive" : "bg-chart-2"
                      )}
                      value={percent}
                    />
                    <div className="flex items-center justify-between gap-3 text-muted-foreground text-xs">
                      <span>{percent}% used</span>
                      <span className="font-mono">{100 - percent}% left</span>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Usage trend</CardTitle>
                <CardDescription>
                  API events over the current billing cycle
                </CardDescription>
              </div>
              <Badge variant="secondary">+18.4%</Badge>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[280px] w-full" config={trendConfig}>
                <AreaChart
                  accessibilityLayer
                  data={trendData}
                  margin={{ left: -16, right: 8 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickFormatter={formatThousands}
                    tickLine={false}
                    tickMargin={8}
                    width={36}
                  />
                  <Tooltip content={<ChartTooltipContent />} cursor={false} />
                  <Area
                    dataKey="events"
                    fill="var(--color-events)"
                    fillOpacity={0.14}
                    stroke="var(--color-events)"
                    strokeWidth={2}
                    type="monotone"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Alert className="min-h-[180px] border-destructive/30 bg-destructive/5">
              <CircleAlertIcon aria-hidden="true" />
              <AlertTitle>One seat left in your plan</AlertTitle>
              <AlertDescription>
                You&apos;re close to the team member limit. Upgrade before
                inviting your next collaborator to keep your workflow moving.
              </AlertDescription>
              <AlertAction>
                <Button size="sm" variant="outline">
                  Upgrade
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
              </AlertAction>
            </Alert>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-base">Plan includes</CardTitle>
                <CardDescription>
                  Everything your team has unlocked.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                {[
                  "Unlimited projects",
                  "Priority support",
                  "Advanced usage exports",
                ].map((feature) => (
                  <div className="flex items-center gap-2" key={feature}>
                    <CheckIcon aria-hidden="true" className="text-chart-2" />
                    <span>{feature}</span>
                  </div>
                ))}
                <Separator className="my-1" />
                <p className="text-muted-foreground text-xs">
                  Need more headroom? The Scale plan adds 5× capacity and custom
                  retention windows.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
