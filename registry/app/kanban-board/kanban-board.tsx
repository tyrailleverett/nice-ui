import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  EllipsisIcon,
  FilterIcon,
  LayoutGridIcon,
  ListFilterIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const columns = [
  {
    accent: "border-l-chart-4",
    cards: [
      {
        due: "Aug 24",
        labels: ["Research", "Growth"],
        owner: "ML",
        priority: "Low",
        progress: 0,
        title: "Audit lifecycle email gaps",
      },
      {
        due: "Aug 28",
        labels: ["Product"],
        owner: "JW",
        priority: "Medium",
        progress: 0,
        title: "Map workspace permissions",
      },
      {
        due: "Sep 02",
        labels: ["Content"],
        owner: "AS",
        priority: "Low",
        progress: 0,
        title: "Refresh customer proof points",
      },
    ],
    count: 3,
    icon: CircleDashedIcon,
    name: "Backlog",
  },
  {
    accent: "border-l-chart-3",
    cards: [
      {
        due: "Today",
        labels: ["Launch", "High impact"],
        owner: "NK",
        priority: "High",
        progress: 68,
        title: "Prepare Q3 launch checklist",
      },
      {
        due: "Aug 22",
        labels: ["Design"],
        owner: "ER",
        priority: "Medium",
        progress: 42,
        title: "Tighten reporting dashboard",
      },
      {
        due: "Aug 25",
        labels: ["Engineering"],
        owner: "TM",
        priority: "Medium",
        progress: 24,
        title: "Instrument activation events",
      },
    ],
    count: 3,
    icon: SparklesIcon,
    name: "In progress",
  },
  {
    accent: "border-l-chart-2",
    cards: [
      {
        due: "Today",
        labels: ["Design system"],
        owner: "LC",
        priority: "High",
        progress: 86,
        title: "Approve new onboarding flow",
      },
      {
        due: "Aug 21",
        labels: ["Research", "Sales"],
        owner: "DR",
        priority: "Medium",
        progress: 74,
        title: "Review enterprise interview notes",
      },
    ],
    count: 2,
    icon: ArrowUpRightIcon,
    name: "In review",
  },
  {
    accent: "border-l-chart-1",
    cards: [
      {
        due: "Aug 18",
        labels: ["Content"],
        owner: "PS",
        priority: "Medium",
        progress: 100,
        title: "Publish customer story edits",
      },
      {
        due: "Aug 16",
        labels: ["Growth"],
        owner: "KB",
        priority: "Low",
        progress: 100,
        title: "Close referral campaign retro",
      },
    ],
    count: 2,
    icon: CheckCircle2Icon,
    name: "Done",
  },
] as const;

const priorityVariant = {
  High: "destructive",
  Low: "secondary",
  Medium: "outline",
} as const;

export function KanbanBoard() {
  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-6">
        <header className="flex flex-col gap-5 border-border border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
              Acme / Product team
            </p>
            <div className="flex items-center gap-3">
              <h1 className="font-heading font-semibold text-3xl tracking-tight sm:text-4xl">
                Pipeline board
              </h1>
              <Badge className="hidden sm:inline-flex" variant="secondary">
                Q3 launch
              </Badge>
            </div>
            <p className="max-w-xl text-muted-foreground text-sm">
              Keep the next most important work visible, moving, and owned.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button aria-label="Filter board" size="icon" variant="outline">
              <FilterIcon />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger aria-label="Filter by owner" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All owners</SelectItem>
                  <SelectItem value="mine">My work</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select defaultValue="this-week">
              <SelectTrigger aria-label="Filter by due date" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="this-week">This week</SelectItem>
                  <SelectItem value="next-week">Next week</SelectItem>
                  <SelectItem value="all-dates">All dates</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button>
              <PlusIcon data-icon="inline-start" />
              Add task
            </Button>
          </div>
        </header>

        <section
          aria-label="Pipeline summary"
          className="grid gap-3 sm:grid-cols-3"
        >
          <Card className="shadow-none ring-border/70">
            <CardHeader className="gap-0 pb-2">
              <CardDescription>Open work</CardDescription>
              <CardTitle className="text-2xl">10 tasks</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-xs">
              3 need an owner this week
            </CardContent>
          </Card>
          <Card className="shadow-none ring-border/70">
            <CardHeader className="gap-0 pb-2">
              <CardDescription>Team capacity</CardDescription>
              <CardTitle className="text-2xl">68%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress aria-label="Team capacity" value={68} />
            </CardContent>
          </Card>
          <Card className="shadow-none ring-border/70">
            <CardHeader className="gap-0 pb-2">
              <CardDescription>Due today</CardDescription>
              <CardTitle className="text-2xl">2 tasks</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <CalendarDaysIcon className="size-3.5" />
              Keep the review lane moving
            </CardContent>
          </Card>
        </section>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <Tabs defaultValue="board">
              <TabsList>
                <TabsTrigger value="board">
                  <LayoutGridIcon data-icon="inline-start" />
                  Board
                </TabsTrigger>
                <TabsTrigger value="list">
                  <ListFilterIcon data-icon="inline-start" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <SlidersHorizontalIcon className="size-3.5" />
              <span>Sorted by priority</span>
              <Button aria-label="Board options" size="icon-xs" variant="ghost">
                <MoreHorizontalIcon />
              </Button>
            </div>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="grid min-w-[1120px] grid-cols-4 gap-3">
              {columns.map(({ accent, cards, count, icon: Icon, name }) => (
                <section
                  className="flex min-h-[560px] flex-col gap-3"
                  key={name}
                >
                  <div className="flex items-center justify-between border-border border-b px-1 pb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-muted-foreground" />
                      <h2 className="font-medium text-sm">{name}</h2>
                      <span className="grid size-5 place-items-center rounded-full bg-muted font-medium text-muted-foreground text-xs">
                        {count}
                      </span>
                    </div>
                    <Button
                      aria-label={`More options for ${name}`}
                      size="icon-xs"
                      variant="ghost"
                    >
                      <EllipsisIcon />
                    </Button>
                  </div>

                  <div className="flex flex-1 flex-col gap-3">
                    {cards.map((card) => (
                      <Card
                        className={`border-l-2 shadow-none ring-border/70 ${accent}`}
                        key={card.title}
                      >
                        <CardHeader className="gap-3 pb-1">
                          <div className="flex items-start justify-between gap-3">
                            <Badge variant={priorityVariant[card.priority]}>
                              {card.priority} priority
                            </Badge>
                            <Button
                              aria-label={`More options for ${card.title}`}
                              size="icon-xs"
                              variant="ghost"
                            >
                              <MoreHorizontalIcon />
                            </Button>
                          </div>
                          <CardTitle className="text-[15px] leading-5">
                            {card.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="gap-4">
                          <div className="flex flex-wrap gap-1.5">
                            {card.labels.map((label) => (
                              <Badge key={label} variant="outline">
                                {label}
                              </Badge>
                            ))}
                          </div>
                          {card.progress > 0 ? (
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between text-muted-foreground text-xs">
                                <span>Progress</span>
                                <span>{card.progress}%</span>
                              </div>
                              <Progress
                                aria-label={`${card.title} progress`}
                                value={card.progress}
                              />
                            </div>
                          ) : null}
                          <div className="flex items-center justify-between gap-2 border-border border-t pt-3 text-muted-foreground text-xs">
                            <div className="flex items-center gap-1.5">
                              <CalendarDaysIcon className="size-3.5" />
                              <span>{card.due}</span>
                            </div>
                            <Avatar size="sm">
                              <AvatarFallback>{card.owner}</AvatarFallback>
                            </Avatar>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      className="mt-auto w-full border-dashed"
                      variant="outline"
                    >
                      <PlusIcon data-icon="inline-start" />
                      Add card
                    </Button>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
