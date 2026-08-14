import {
  ArrowRightIcon,
  BotIcon,
  CalendarDaysIcon,
  ExternalLinkIcon,
  HeadphonesIcon,
  MessageSquareIcon,
  PlusIcon,
  Settings2Icon,
  VideoIcon,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const callData = [
  { calls: 73_200, date: "17 Aug" },
  { calls: 75_400, date: "18 Aug" },
  { calls: 74_100, date: "19 Aug" },
  { calls: 78_300, date: "20 Aug" },
  { calls: 76_900, date: "21 Aug" },
  { calls: 81_200, date: "22 Aug" },
  { calls: 79_300, date: "23 Aug" },
  { calls: 77_900, date: "24 Aug" },
] as const;

const callConfig = {
  calls: { color: "var(--chart-2)", label: "Calls" },
} satisfies ChartConfig;

const agentData = [
  { calls: "6,424", name: "Docs Support Agent", value: 100 },
  { calls: "3,942", name: "Website Agent", value: 61 },
  { calls: "1,820", name: "Billing Triage Agent", value: 38 },
  { calls: "1,194", name: "Acme Co.", value: 29 },
  { calls: "1,094", name: "Store Assistant", value: 26 },
] as const;

const integrations = [
  {
    detail: "Transcripts and response traces",
    icon: BotIcon,
    name: "OpenAI",
    state: "Live",
  },
  {
    detail: "Escalation alerts and handoffs",
    icon: MessageSquareIcon,
    name: "Slack",
    state: "Live",
  },
  {
    detail: "SIP routing and failover",
    icon: HeadphonesIcon,
    name: "Voice Gateway",
    state: "Live",
  },
  {
    detail: "Scheduled call recordings",
    icon: VideoIcon,
    name: "Google Meet",
    state: "Review",
  },
] as const;

export interface Dashboard3Props {
  className?: string;
}

export function Dashboard3({ className }: Dashboard3Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4">
        <header className="flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <h1 className="font-semibold text-2xl">Overview</h1>
              <span className="flex items-center gap-1 text-muted-foreground text-sm">
                <HeadphonesIcon className="size-4 text-chart-2" />
                Active Calls <strong className="text-foreground">294</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <PlusIcon data-icon="inline-start" />
                Add
              </Button>
              <Button variant="outline">
                <Settings2Icon data-icon="inline-start" />
                Configure
              </Button>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[180px_180px_180px_auto]">
            <Select defaultValue="7-days">
              <SelectTrigger>
                <CalendarDaysIcon />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="7-days">Last 7 days</SelectItem>
                  <SelectItem value="30-days">Last 30 days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All agents</SelectItem>
                  <SelectItem value="support">Support agents</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="justify-self-start" variant="outline">
              <PlusIcon data-icon="inline-start" />
              Add Filter
            </Button>
          </div>
        </header>

        <Card className="py-0">
          <CardHeader className="grid grid-cols-2 gap-0 border-b p-0 md:grid-cols-3 xl:grid-cols-6">
            {[
              ["Calls", "77,258"],
              ["Avg. duration", "2:51"],
              ["Total cost", "33,402 credits"],
              ["Avg. cost per call", "0.43 credits"],
              ["Total LLM cost", "$7,258"],
              ["Avg. LLM cost", "$0.09"],
            ].map(([label, value], index) => (
              <Button
                className="h-auto min-h-20 flex-col items-start justify-center gap-1 rounded-none border-r px-4"
                key={label}
                type="button"
                variant="ghost"
              >
                <span className="text-muted-foreground text-sm">{label}</span>
                <strong>{value}</strong>
                {index === 0 ? (
                  <span className="mt-auto h-0.5 w-full bg-primary" />
                ) : null}
              </Button>
            ))}
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="mb-2 text-right text-muted-foreground text-sm">
              Min <strong className="text-foreground">71,800</strong>{" "}
              &nbsp;•&nbsp; Max{" "}
              <strong className="text-foreground">82,300</strong>
            </div>
            <ChartContainer className="h-[420px] w-full" config={callConfig}>
              <AreaChart
                accessibilityLayer
                data={callData}
                margin={{ left: 12, right: 12, top: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="date"
                  tickLine={false}
                  tickMargin={12}
                />
                <YAxis domain={[70_000, 84_000]} hide />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <Area
                  dataKey="calls"
                  fill="var(--color-calls)"
                  fillOpacity={0.12}
                  stroke="var(--color-calls)"
                  strokeWidth={2}
                  type="natural"
                />
              </AreaChart>
            </ChartContainer>
            <div className="mt-2 flex justify-end">
              <Button variant="outline">
                View more
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-4 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Most Called Agents</CardTitle>
              <CardDescription>Call volume by agent</CardDescription>
              <CardAction>
                <Select defaultValue="calls">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="calls">Calls</SelectItem>
                      <SelectItem value="cost">Cost</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {agentData.map((agent, index) => (
                <div
                  className="grid grid-cols-[1fr_auto] items-center gap-4"
                  key={agent.name}
                >
                  <div className="relative overflow-hidden rounded-full bg-muted px-4 py-2">
                    <span
                      className="absolute inset-y-0 left-0 bg-chart-2/25"
                      style={{ width: `${agent.value}%` }}
                    />
                    <span className="relative flex items-center gap-2 font-medium text-sm">
                      <span className="size-2 rounded-full bg-chart-2" />
                      {agent.name}
                    </span>
                  </div>
                  <strong
                    className={index === 0 ? "text-chart-2" : "text-foreground"}
                  >
                    {agent.calls}
                  </strong>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connections for voice ops</CardDescription>
              <CardAction>
                <Button size="sm" variant="outline">
                  Manage
                  <ExternalLinkIcon data-icon="inline-end" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col">
              {integrations.map(({ icon: Icon, name, detail, state }) => (
                <div
                  className="flex items-center gap-3 border-b py-3 first:pt-0 last:border-0 last:pb-0"
                  key={name}
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-muted">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{name}</p>
                    <p className="truncate text-muted-foreground text-sm">
                      {detail}
                    </p>
                  </div>
                  <Badge variant={state === "Live" ? "secondary" : "outline"}>
                    {state}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
