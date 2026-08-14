import { CalendarDaysIcon, MailIcon, PlusIcon } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const team = [
  { initials: "AO", name: "Amara Ortiz", role: "Delivery lead" },
  { initials: "TM", name: "Theo Mercer", role: "Platform" },
  { initials: "IC", name: "Iris Calder", role: "Design systems" },
] as const;

const week = [
  { day: "Mon", hours: "6.5", kind: "Client" },
  { day: "Tue", hours: "5.5", kind: "Client" },
  { day: "Wed", hours: "7.0", kind: "Internal" },
  { day: "Thu", hours: "6.0", kind: "Client" },
  { day: "Fri", hours: "4.5", kind: "Client" },
] as const;

const integrations = [
  { name: "Billing export", state: "Healthy" },
  { name: "Status page", state: "Watch" },
  { name: "Support mailbox", state: "Healthy" },
] as const;

const files = [
  { name: "Q2 rollout brief", updated: "Mar 24" },
  { name: "Launch checklist", updated: "Mar 25" },
  { name: "Cutover notes", updated: "Mar 26" },
] as const;

export interface Detail2Props {
  className?: string;
  onLogHours?: () => void;
  onScheduleReview?: () => void;
}

export function Detail2({
  className,
  onLogHours,
  onScheduleReview,
}: Detail2Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
        <header className="flex flex-col gap-4 border-border border-b pb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Delivery</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Accounts</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Avery Outdoor</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading font-semibold text-2xl tracking-tight sm:text-3xl">
                  Avery Outdoor
                </h1>
                <Badge variant="secondary">At risk</Badge>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                Q2 platform rollout. Next client review is Thursday with Amara
                owning the remaining cutover work.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={onLogHours} type="button" variant="outline">
                <PlusIcon data-icon="inline-start" />
                Log hours
              </Button>
              <Button onClick={onScheduleReview} type="button">
                <CalendarDaysIcon data-icon="inline-start" />
                Schedule review
              </Button>
            </div>
          </div>
        </header>

        <Tabs className="gap-5" defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="worklog">Worklog</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent className="flex flex-col gap-4" value="overview">
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
              <Card>
                <CardHeader>
                  <CardTitle>This week</CardTitle>
                  <CardDescription>
                    29h 30m logged against a 32h plan.
                  </CardDescription>
                  <CardAction>
                    <span className="font-semibold text-xl tabular-nums">
                      92%
                    </span>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Progress value={92} />
                  <dl className="grid gap-3 sm:grid-cols-3">
                    <div className="flex flex-col gap-1">
                      <dt className="text-muted-foreground text-xs">
                        Next review
                      </dt>
                      <dd className="font-medium">Thu, Mar 26 · 10:00</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-muted-foreground text-xs">
                        Open work
                      </dt>
                      <dd className="font-medium">3 cutover tasks</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-muted-foreground text-xs">Health</dt>
                      <dd className="font-medium">Status page on watch</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account team</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {team.map((person) => (
                    <div className="flex items-center gap-3" key={person.name}>
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {person.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-sm">{person.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {person.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Needs a decision</CardTitle>
                <CardDescription>
                  Cutover cannot move until billing export is signed off.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm">
                  Send the revised invoice mapping to Avery finance before
                  Thursday, or slip the go-live to April 2.
                </p>
                <Button type="button" variant="outline">
                  <MailIcon data-icon="inline-start" />
                  Draft note
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="worklog">
            <Card>
              <CardHeader>
                <CardTitle>Client hours</CardTitle>
                <CardDescription>
                  Hours billed to Avery Outdoor this week.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {week.map((entry) => (
                    <div
                      className="flex flex-col gap-2 rounded-lg border border-border p-3"
                      key={entry.day}
                    >
                      <span className="text-muted-foreground text-xs">
                        {entry.day}
                      </span>
                      <span className="font-semibold text-lg tabular-nums">
                        {entry.hours}
                        <span className="font-normal text-muted-foreground text-xs">
                          h
                        </span>
                      </span>
                      <Badge variant="outline">{entry.kind}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Connected systems</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                {integrations.map((item, index) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between gap-3 py-3">
                      <span className="font-medium text-sm">{item.name}</span>
                      <Badge
                        variant={
                          item.state === "Watch" ? "secondary" : "outline"
                        }
                      >
                        {item.state}
                      </Badge>
                    </div>
                    {index < integrations.length - 1 ? <Separator /> : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            <Card>
              <CardHeader>
                <CardTitle>Shared files</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                {files.map((file, index) => (
                  <div key={file.name}>
                    <div className="flex items-center justify-between gap-3 py-3">
                      <span className="font-medium text-sm">{file.name}</span>
                      <span className="text-muted-foreground text-xs">
                        Updated {file.updated}
                      </span>
                    </div>
                    {index < files.length - 1 ? <Separator /> : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
