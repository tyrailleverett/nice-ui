import {
  ActivityIcon,
  ArrowUpRightIcon,
  CheckCircle2Icon,
  FolderKanbanIcon,
  Grid2X2Icon,
  LayoutListIcon,
  PlusIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type WorkspaceStatus = "Active" | "Draft" | "Paused";
type ViewMode = "cards" | "list";

interface Workspace {
  description: string;
  members: string[];
  name: string;
  progress: number;
  status: WorkspaceStatus;
  updated: string;
}

const workspaces: Workspace[] = [
  {
    description: "Lifecycle experiments and conversion paths",
    members: ["MC", "JB", "PS"],
    name: "Growth experiments",
    progress: 72,
    status: "Active",
    updated: "Edited 18 min ago",
  },
  {
    description: "Reusable building blocks for every team",
    members: ["NP", "OW", "MC"],
    name: "Design system",
    progress: 48,
    status: "Active",
    updated: "Edited yesterday",
  },
  {
    description: "Customer requests, insights, and opportunities",
    members: ["JB", "ER"],
    name: "Customer voice",
    progress: 31,
    status: "Draft",
    updated: "Edited 2 days ago",
  },
  {
    description: "Quarterly goals and cross-functional milestones",
    members: ["PS", "NP", "OW", "MC"],
    name: "Q3 planning",
    progress: 84,
    status: "Paused",
    updated: "Edited Aug 12",
  },
];

const activity = [
  {
    actor: "Maya Chen",
    detail: "published a new experiment",
    time: "10:42 AM",
  },
  { actor: "Jon Bell", detail: "joined Design system", time: "9:18 AM" },
  {
    actor: "Priya Shah",
    detail: "moved a milestone to review",
    time: "Yesterday",
  },
];

const statusVariant = {
  Active: "default",
  Draft: "secondary",
  Paused: "outline",
} as const;

function MemberStack({ members }: { members: string[] }) {
  return (
    <div
      aria-label={`${members.length} workspace members`}
      className="flex -space-x-2"
    >
      {members.map((member) => (
        <Avatar className="size-7 border-2 border-background" key={member}>
          <AvatarFallback className="text-[10px]">{member}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  return (
    <Card className="group gap-0 overflow-hidden shadow-none transition-colors hover:border-foreground/30">
      <CardHeader className="gap-4 border-border/70 border-b pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
              <FolderKanbanIcon aria-hidden="true" className="size-4" />
            </div>
            <div>
              <CardTitle className="text-[15px] tracking-tight">
                {workspace.name}
              </CardTitle>
              <CardDescription className="mt-1 text-xs">
                {workspace.updated}
              </CardDescription>
            </div>
          </div>
          <Badge variant={statusVariant[workspace.status]}>
            {workspace.status}
          </Badge>
        </div>
        <p className="min-h-10 text-muted-foreground text-sm leading-5">
          {workspace.description}
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 pt-4">
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <span>Completion</span>
          <span className="font-medium text-foreground tabular-nums">
            {workspace.progress}%
          </span>
        </div>
        <Progress
          aria-label={`${workspace.name} completion`}
          value={workspace.progress}
        />
        <div className="flex items-center justify-between">
          <MemberStack members={workspace.members} />
          <Button
            aria-label={`Open ${workspace.name}`}
            className="gap-1.5"
            size="sm"
            variant="ghost"
          >
            Open
            <ArrowUpRightIcon aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function WorkspaceList({ workspace }: { workspace: Workspace }) {
  return (
    <div className="grid gap-3 rounded-lg border border-border/70 p-4 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <FolderKanbanIcon aria-hidden="true" className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">{workspace.name}</p>
          <p className="truncate text-muted-foreground text-xs">
            {workspace.description}
          </p>
        </div>
      </div>
      <Badge className="w-fit" variant={statusVariant[workspace.status]}>
        {workspace.status}
      </Badge>
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        <UsersIcon aria-hidden="true" className="size-3.5" />
        {workspace.members.length} members
      </div>
      <Button aria-label={`Open ${workspace.name}`} size="sm" variant="ghost">
        Open
        <ArrowUpRightIcon aria-hidden="true" />
      </Button>
    </div>
  );
}

export function WorkspaceHub() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<ViewMode>("cards");
  const filteredWorkspaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return workspaces;
    }
    return workspaces.filter((workspace) =>
      `${workspace.name} ${workspace.description}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto grid w-full max-w-[1380px] gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="min-w-0">
          <header className="flex flex-col gap-5 border-border border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                Acme / Workspace
              </p>
              <h1 className="font-heading font-semibold text-3xl tracking-tight sm:text-4xl">
                Your workspaces
              </h1>
              <p className="mt-2 max-w-xl text-muted-foreground text-sm">
                Keep projects, decisions, and the people behind them in view.
              </p>
            </div>
            <Button>
              <PlusIcon data-icon="inline-start" />
              New workspace
            </Button>
          </header>

          <div className="grid gap-3 py-6 sm:grid-cols-3">
            <Card className="gap-1 py-4 shadow-none">
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs">
                    All workspaces
                  </p>
                  <p className="mt-1 font-semibold text-2xl">12</p>
                </div>
                <FolderKanbanIcon
                  aria-hidden="true"
                  className="size-5 text-muted-foreground"
                />
              </CardContent>
            </Card>
            <Card className="gap-1 py-4 shadow-none">
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs">
                    Active this week
                  </p>
                  <p className="mt-1 font-semibold text-2xl">8</p>
                </div>
                <ActivityIcon
                  aria-hidden="true"
                  className="size-5 text-chart-2"
                />
              </CardContent>
            </Card>
            <Card className="gap-1 py-4 shadow-none">
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs">On track</p>
                  <p className="mt-1 font-semibold text-2xl">67%</p>
                </div>
                <CheckCircle2Icon
                  aria-hidden="true"
                  className="size-5 text-chart-2"
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-3 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <SearchIcon
                aria-hidden="true"
                className="absolute top-2.5 left-3 size-4 text-muted-foreground"
              />
              <Input
                aria-label="Search workspaces"
                className="pl-9"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search workspaces"
                value={query}
              />
            </div>
            <div
              aria-label="Workspace view"
              className="flex items-center gap-1 rounded-lg border border-border/70 p-1"
            >
              <Button
                aria-pressed={view === "cards"}
                onClick={() => setView("cards")}
                size="sm"
                variant={view === "cards" ? "secondary" : "ghost"}
              >
                <Grid2X2Icon data-icon="inline-start" />
                Cards
              </Button>
              <Button
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
                size="sm"
                variant={view === "list" ? "secondary" : "ghost"}
              >
                <LayoutListIcon data-icon="inline-start" />
                List
              </Button>
            </div>
          </div>

          {filteredWorkspaces.length > 0 ? (
            <div
              className={
                view === "cards" ? "grid gap-4 md:grid-cols-2" : "grid gap-3"
              }
            >
              {filteredWorkspaces.map((workspace) =>
                view === "cards" ? (
                  <WorkspaceCard key={workspace.name} workspace={workspace} />
                ) : (
                  <WorkspaceList key={workspace.name} workspace={workspace} />
                )
              )}
            </div>
          ) : (
            <Card className="border-dashed shadow-none">
              <CardContent className="flex flex-col items-center gap-2 py-14 text-center">
                <SearchIcon
                  aria-hidden="true"
                  className="size-5 text-muted-foreground"
                />
                <p className="font-medium text-sm">No workspaces found</p>
                <p className="max-w-xs text-muted-foreground text-sm">
                  Try a different search or create a new workspace.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        <aside className="lg:border-border lg:border-l lg:pl-7">
          <div className="sticky top-6 grid gap-6">
            <div>
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                Workspace pulse
              </p>
              <h2 className="mt-2 font-semibold text-lg tracking-tight">
                Recent activity
              </h2>
              <p className="mt-1 text-muted-foreground text-sm">
                Small changes worth keeping close.
              </p>
            </div>
            <div className="grid gap-5">
              {activity.map((item) => (
                <div className="flex gap-3" key={`${item.actor}-${item.time}`}>
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="text-[10px]">
                      {item.actor
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1 text-sm">
                    <p>
                      <span className="font-medium">{item.actor}</span>{" "}
                      {item.detail}
                    </p>
                    <span className="text-muted-foreground text-xs">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-fit" size="sm" variant="outline">
              View all activity
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
