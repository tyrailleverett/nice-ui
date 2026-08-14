/* biome-ignore-all lint/performance/noJsxPropsBind: Interactive table controls intentionally close over row, tab, and sort state. */
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  Settings2Icon,
  XIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type TaskStatus = "In Progress" | "Done" | "Todo" | "Review";
type Priority = "Urgent" | "High" | "Medium";
interface Task {
  assignee: string;
  avatar: string;
  id: string;
  isChild?: boolean;
  parentId?: string;
  priority: Priority;
  project: string;
  status: TaskStatus;
  title: string;
}

const tasks: Task[] = [
  {
    assignee: "Maya Perez",
    avatar: "47",
    id: "task-1",
    priority: "Urgent",
    project: "Registry API",
    status: "In Progress",
    title: "Finalize licensed registry handshake for private installs",
  },
  {
    assignee: "Maya Perez",
    avatar: "47",
    id: "task-2",
    isChild: true,
    parentId: "task-1",
    priority: "Urgent",
    project: "Registry API",
    status: "Done",
    title: "Lock the signed entitlement payload shape",
  },
  {
    assignee: "Jonas Reed",
    avatar: "11",
    id: "task-3",
    isChild: true,
    parentId: "task-1",
    priority: "High",
    project: "Registry API",
    status: "Done",
    title: "Validate private install signature rotation",
  },
  {
    assignee: "Emil Novak",
    avatar: "12",
    id: "task-4",
    isChild: true,
    parentId: "task-1",
    priority: "Urgent",
    project: "Registry API",
    status: "In Progress",
    title: "Add replay guard for expired install links",
  },
  {
    assignee: "Maya Perez",
    avatar: "47",
    id: "task-5",
    isChild: true,
    parentId: "task-1",
    priority: "Medium",
    project: "Registry API",
    status: "In Progress",
    title: "Document the fallback flow for invalid claims",
  },
  {
    assignee: "Jonas Reed",
    avatar: "11",
    id: "task-6",
    priority: "Urgent",
    project: "Workspace Access",
    status: "Todo",
    title: "Audit session invalidation when workspace roles change",
  },
  {
    assignee: "Pavel Singh",
    avatar: "13",
    id: "task-7",
    priority: "Urgent",
    project: "Launch Analytics",
    status: "In Progress",
    title: "Wire project health badges into the launch command center",
  },
  {
    assignee: "Noa Kim",
    avatar: "49",
    id: "task-8",
    priority: "High",
    project: "Workspace Access",
    status: "Todo",
    title: "Design empty states for expiring team seat invitations",
  },
  {
    assignee: "Emil Novak",
    avatar: "12",
    id: "task-9",
    priority: "High",
    project: "Task Delivery",
    status: "Review",
    title: "Add audit trail hooks to task status change events",
  },
];

const statusDot: Record<TaskStatus, string> = {
  Done: "bg-chart-2",
  "In Progress": "bg-chart-4",
  Review: "bg-chart-3",
  Todo: "bg-chart-1",
};
const priorityClass: Record<Priority, string> = {
  High: "border-chart-4/40 bg-chart-4/10 text-chart-4",
  Medium: "border-chart-3/40 bg-chart-3/10 text-chart-3",
  Urgent: "border-destructive/40 bg-destructive/10 text-destructive",
};

function SortMark({
  active,
  direction,
}: {
  active: boolean;
  direction: "asc" | "desc";
}) {
  if (!active) {
    return <ChevronsUpDownIcon aria-hidden="true" />;
  }
  return direction === "asc" ? (
    <ChevronUpIcon aria-hidden="true" />
  ) : (
    <ChevronDownIcon aria-hidden="true" />
  );
}

function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge className="gap-1.5 bg-muted/40 font-normal" variant="outline">
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", statusDot[status])}
      />
      {status}
    </Badge>
  );
}

export interface Table3Props {
  className?: string;
}

export function Table3({ className }: Table3Props) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "backlog">(
    "all"
  );
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [sortDescending, setSortDescending] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesQuery = task.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active"
          ? task.status !== "Done"
          : task.status === "Todo");
      return matchesQuery && matchesTab;
    });
    const result = [...filtered].sort((a, b) =>
      a.priority.localeCompare(b.priority)
    );
    return sortDescending ? result.reverse() : result;
  }, [activeTab, query, sortDescending]);
  const pageCount = Math.max(1, Math.ceil(visibleTasks.length / pageSize));
  const pageRows = visibleTasks
    .slice(page * pageSize, (page + 1) * pageSize)
    .filter((task) => !(task.parentId && collapsed.has(task.parentId)));
  const taskCount = visibleTasks.length;
  const activeCount = tasks.filter((task) => task.status !== "Done").length;
  const backlogCount = tasks.filter((task) => task.status === "Todo").length;
  const toggleParent = (id: string) =>
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <section
      className={cn(
        "min-h-svh w-full bg-background px-6 py-12 text-foreground",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <header className="flex items-start justify-between gap-4 border-border border-b px-6 py-4">
          <div>
            <h1 className="font-heading font-semibold text-xl tracking-tight">
              Task Delivery
            </h1>
            <p className="mt-1 text-muted-foreground text-sm">
              16 tasks / Sub-tasks on
            </p>
          </div>
          <Button>
            <PlusIcon data-icon="inline-start" />
            New task
          </Button>
        </header>
        <nav
          aria-label="Task views"
          className="flex items-center gap-8 border-border border-b px-6"
        >
          {(
            [
              ["all", "All tasks", tasks.length],
              ["active", "Active", activeCount],
              ["backlog", "Backlog", backlogCount],
            ] as const
          ).map(([id, label, count]) => (
            <button
              className={cn(
                "relative flex items-center gap-2 py-4 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground",
                activeTab === id &&
                  "text-foreground after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-foreground"
              )}
              key={id}
              onClick={() => {
                setActiveTab(id);
                setPage(0);
              }}
              type="button"
            >
              {label}
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs tabular-nums">
                {count}
              </span>
            </button>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-3 border-border border-b px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline">
              <FilterIcon data-icon="inline-start" />
              Filters
            </Button>
            <div className="flex h-8 items-center overflow-hidden rounded-lg border border-border bg-background">
              <span className="border-border border-r px-3 text-sm">Task</span>
              <span className="border-border border-r px-3 text-muted-foreground text-sm">
                contains
              </span>
              <div className="relative">
                <SearchIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  aria-label="Search tasks"
                  className="h-8 w-48 border-0 pl-8 shadow-none focus-visible:ring-0"
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(0);
                  }}
                  placeholder="Search tasks..."
                  value={query}
                />
              </div>
              {query.length > 0 && (
                <button
                  aria-label="Clear search"
                  className="px-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setQuery("")}
                  type="button"
                >
                  <XIcon />
                </button>
              )}
            </div>
          </div>
          <Button variant="outline">
            <Settings2Icon data-icon="inline-start" />
            Settings
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="w-[46%]">Task</TableHead>
              <TableHead>
                <button
                  className="inline-flex items-center gap-1"
                  onClick={() => setSortDescending((value) => !value)}
                  type="button"
                >
                  Status <SortMark active={false} direction="desc" />
                </button>
              </TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>
                <button
                  className="inline-flex items-center gap-1"
                  onClick={() => setSortDescending((value) => !value)}
                  type="button"
                >
                  Priority{" "}
                  <SortMark
                    active={true}
                    direction={sortDescending ? "desc" : "asc"}
                  />
                </button>
              </TableHead>
              <TableHead>Project</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((task) => (
              <TableRow className="group" key={task.id}>
                <TableCell>
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      task.isChild && "pl-7"
                    )}
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
                      {task.isChild ? (
                        <span className="size-3.5 rounded-full border border-input" />
                      ) : (
                        <button
                          aria-label={`${collapsed.has(task.id) ? "Expand" : "Collapse"} ${task.title}`}
                          onClick={() => toggleParent(task.id)}
                          type="button"
                        >
                          {collapsed.has(task.id) ? (
                            <ChevronRightIcon />
                          ) : (
                            <ChevronDownIcon />
                          )}
                        </button>
                      )}
                    </span>
                    <span
                      className={cn(
                        "size-3.5 shrink-0 rounded-full border border-input",
                        task.status === "Done" && "border-primary bg-primary"
                      )}
                    />
                    {task.status === "Done" && (
                      <span className="sr-only">Completed</span>
                    )}
                    <span
                      className={cn(
                        "truncate text-sm",
                        task.status === "Done" &&
                          "text-muted-foreground line-through"
                      )}
                    >
                      {task.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <TaskStatusBadge status={task.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarImage
                        alt=""
                        src={`https://i.pravatar.cc/80?img=${task.avatar}`}
                      />
                      <AvatarFallback>
                        {task.assignee
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="whitespace-nowrap text-sm">
                      {task.assignee}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn("font-normal", priorityClass[task.priority])}
                    variant="outline"
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="font-normal" variant="outline">
                    {task.project}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label={`Actions for ${task.title}`}
                        size="icon-sm"
                        variant="ghost"
                      >
                        <EllipsisIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Open task</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <footer className="flex flex-wrap items-center justify-between gap-3 border-border border-t px-6 py-3">
          <span className="text-muted-foreground text-sm">
            Rows per page{" "}
            <span className="ml-2 rounded-md border border-border px-3 py-1 text-foreground">
              {pageSize}
            </span>
          </span>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>
              {page * pageSize + 1}–{Math.min((page + 1) * pageSize, taskCount)}{" "}
              of {taskCount}
            </span>
            <Button
              aria-label="Previous page"
              disabled={page === 0}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              size="icon-sm"
              variant="ghost"
            >
              <ChevronLeftIcon />
            </Button>
            <span className="rounded-md bg-muted px-3 py-1 text-foreground">
              {page + 1}
            </span>
            <Button
              aria-label="Next page"
              disabled={page >= pageCount - 1}
              onClick={() =>
                setPage((value) => Math.min(pageCount - 1, value + 1))
              }
              size="icon-sm"
              variant="ghost"
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </footer>
      </div>
    </section>
  );
}
