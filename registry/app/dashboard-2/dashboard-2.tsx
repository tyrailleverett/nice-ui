import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Code2Icon,
  CopyIcon,
  FolderIcon,
  GlobeIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const people = [
  {
    hours: ["6h 30m", "5h 30m", "7h", "6h", "4h 30m", "–", "–"],
    initials: "AO",
    name: "Amara Ortiz",
    role: "Client delivery lead",
    total: "29h 30m",
    utilization: 92,
  },
  {
    hours: ["8h", "8h", "7h 30m", "8h", "8h", "–", "–"],
    initials: "TM",
    name: "Theo Mercer",
    role: "Platform engineer",
    total: "39h 30m",
    utilization: 99,
  },
  {
    hours: ["5h", "4h 30m", "5h", "3h 30m", "4h", "–", "–"],
    initials: "LH",
    name: "Lena Hoffman",
    role: "Content systems editor",
    total: "22h",
    utilization: 73,
  },
  {
    hours: ["6h", "6h 30m", "6h", "6h 30m", "4h", "–", "–"],
    initials: "IC",
    name: "Iris Calder",
    role: "Design systems lead",
    total: "29h",
    utilization: 91,
  },
  {
    hours: ["7h", "7h 30m", "6h 30m", "8h", "7h", "–", "–"],
    initials: "SV",
    name: "Samir Vale",
    role: "Partner success manager",
    total: "36h",
    utilization: 103,
  },
] as const;

const days = [
  "Mon, Mar 23",
  "Tue, Mar 24",
  "Wed, Mar 25",
  "Thu, Mar 26",
  "Fri, Mar 27",
  "Sat, Mar 28",
  "Sun, Mar 29",
] as const;

const getWorkType = (hours: string, dayIndex: number) => {
  if (hours === "–") {
    return "Off";
  }
  return dayIndex % 3 === 1 ? "Internal" : "Client";
};

export interface Dashboard2Props {
  className?: string;
}

export function Dashboard2({ className }: Dashboard2Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5">
        <header className="flex flex-col gap-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-xl">Delivery Board</h1>
            <div className="flex items-center gap-1">
              <Button aria-label="Search" size="icon" variant="ghost">
                <SearchIcon />
              </Button>
              <Button aria-label="Favorite" size="icon" variant="ghost">
                <StarIcon />
              </Button>
              <Button aria-label="Add member" size="icon">
                <PlusIcon />
              </Button>
            </div>
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <FolderIcon className="mr-1 inline size-4" />
                  Accounts
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Delivery</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Northstar Rollout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Tabs defaultValue="overview">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="worklog">Worklog</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        <section
          aria-label="Account summary"
          className="grid gap-px overflow-hidden rounded-xl bg-border p-px sm:grid-cols-2 xl:grid-cols-4"
        >
          <Card className="rounded-none ring-0">
            <CardHeader>
              <CardDescription>Account</CardDescription>
              <CardAction>
                <CopyIcon className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Northstar Commerce</p>
              <p className="text-muted-foreground">Enterprise rollout</p>
            </CardContent>
          </Card>
          <Card className="rounded-none ring-0">
            <CardHeader>
              <CardDescription>Workspace</CardDescription>
              <CardAction>
                <GlobeIcon className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="font-medium">portal.northstar.io</p>
              <p className="text-muted-foreground">Requests: 124k/day</p>
            </CardContent>
          </Card>
          <Card className="rounded-none ring-0">
            <CardHeader>
              <CardDescription>Next Review</CardDescription>
              <CardAction>
                <CalendarDaysIcon className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Apr 3, 2026</p>
              <p className="text-muted-foreground">Client steering</p>
            </CardContent>
          </Card>
          <Card className="rounded-none ring-0">
            <CardHeader>
              <CardDescription>Owner</CardDescription>
              <CardAction>
                <UserIcon className="size-4 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Amara Ortiz</p>
              <p className="text-muted-foreground">Delivery lead</p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Worklogs</CardTitle>
            <CardDescription>Weekly client delivery hours</CardDescription>
            <CardAction>
              <Button>New log</Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-0">
            <div className="flex flex-col justify-between gap-3 px-4 lg:flex-row">
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  ["people", "People"],
                  ["time", "Tracked time"],
                  ["status", "Billable status"],
                ].map(([value, label]) => (
                  <Select defaultValue={value} key={value}>
                    <SelectTrigger
                      aria-label={label}
                      className="w-full sm:w-48"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={value}>{label}</SelectItem>
                        <SelectItem value={`${value}-all`}>
                          All {label.toLowerCase()}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ))}
              </div>
              <div className="flex items-center">
                <Button
                  aria-label="Previous week"
                  size="icon"
                  variant="outline"
                >
                  <ChevronLeftIcon />
                </Button>
                <Button className="mx-1" variant="outline">
                  <CalendarDaysIcon data-icon="inline-start" />
                  Mar 23 – 29
                </Button>
                <Button aria-label="Next week" size="icon" variant="outline">
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-64">People</TableHead>
                  {days.map((day) => (
                    <TableHead className="min-w-32 text-center" key={day}>
                      {day}
                    </TableHead>
                  ))}
                  <TableHead className="min-w-32 text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map((person) => (
                  <TableRow key={person.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback>{person.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{person.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {person.role}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    {person.hours.map((hours, index) => (
                      <TableCell
                        className="text-center"
                        key={`${person.name}-${days[index]}`}
                      >
                        <p className="font-medium">{hours}</p>
                        <Progress
                          className="mx-auto mt-2 max-w-16"
                          value={hours === "–" ? 0 : 75 + ((index * 4) % 20)}
                        />
                        <p className="mt-1 text-muted-foreground text-xs">
                          {getWorkType(hours, index)}
                        </p>
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <p className="font-medium">{person.total}</p>
                      <p className="text-chart-2 text-xs">
                        ↗ {person.utilization}%
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4">
              <span className="text-muted-foreground text-sm">
                Rows per page: 5
              </span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">1–5 of 9</span>
                <Button
                  aria-label="Previous page"
                  disabled
                  size="icon-sm"
                  variant="ghost"
                >
                  <ChevronLeftIcon />
                </Button>
                <Button size="icon-sm">1</Button>
                <Button size="icon-sm" variant="ghost">
                  2
                </Button>
                <Button aria-label="Next page" size="icon-sm" variant="ghost">
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Apps</CardTitle>
              <CardDescription>Live project connectors</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {["Zoom", "Slack", "Google Drive"].map((app) => (
                <div
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                  key={app}
                >
                  <span className="font-medium">{app}</span>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Manual Workflows</CardTitle>
              <CardDescription>Optional workflow add-ons</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {["Data Audit", "Risk Queue", "Scope Review"].map((flow) => (
                <div
                  className="flex items-center gap-3 border-b pb-3 last:border-0"
                  key={flow}
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-muted">
                    <Code2Icon className="size-4" />
                  </span>
                  <span className="flex-1 font-medium">{flow}</span>
                  <Button
                    aria-label={`Add ${flow}`}
                    size="icon-sm"
                    variant="outline"
                  >
                    <PlusIcon />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delivery Checks</CardTitle>
              <CardDescription>Launch readiness tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {["Scope Check", "QA Handoff", "Security Review"].map(
                (check, index) => (
                  <div
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                    key={check}
                  >
                    <span className="font-medium">{check}</span>
                    <Badge variant={index === 2 ? "outline" : "secondary"}>
                      {index === 2 ? "Pending" : "Ready"}
                    </Badge>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
