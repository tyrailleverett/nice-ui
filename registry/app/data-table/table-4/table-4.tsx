/* biome-ignore-all lint/performance/noJsxPropsBind: Interactive table controls intentionally close over stage and pagination state. */
import {
  ArchiveIcon,
  BellIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
  LayoutListIcon,
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
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
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Stage = "Backlog" | "To Do" | "In Progress" | "Review";
type Signal = "Queued" | "At risk" | "On track" | "Blocked";
interface RoadmapItem {
  date: string;
  id: string;
  owner: string;
  owners: string[];
  progress: number | null;
  signal: Signal;
  stage: Stage;
  tag: string;
  title: string;
}

const roadmap: RoadmapItem[] = [
  {
    date: "22 Dec",
    id: "r-1",
    owner: "Maya Perez",
    owners: ["47", "11"],
    progress: 18,
    signal: "Queued",
    stage: "Backlog",
    tag: "Adoption",
    title: "Draft first-run board tips",
  },
  {
    date: "03 Mar",
    id: "r-2",
    owner: "Emil Novak",
    owners: ["12"],
    progress: 34,
    signal: "At risk",
    stage: "Backlog",
    tag: "Revenue",
    title: "Map invoice retries to health cards",
  },
  {
    date: "18 Aug",
    id: "r-3",
    owner: "Noa Kim",
    owners: ["49"],
    progress: 12,
    signal: "Queued",
    stage: "Backlog",
    tag: "Knowledge",
    title: "Guard archived pages",
  },
  {
    date: "29 Nov",
    id: "r-4",
    owner: "Pavel Singh",
    owners: ["13", "47"],
    progress: 42,
    signal: "On track",
    stage: "Backlog",
    tag: "AI Quality",
    title: "Audit assistant fallback prompts for unsent messages",
  },
  {
    date: "14 Jan",
    id: "r-5",
    owner: "Jonas Reed",
    owners: ["51", "52"],
    progress: 9,
    signal: "Blocked",
    stage: "Backlog",
    tag: "Access",
    title: "Scope vendor admin roles",
  },
  {
    date: "11 Feb",
    id: "r-6",
    owner: "Unassigned",
    owners: [],
    progress: null,
    signal: "Queued",
    stage: "Backlog",
    tag: "Messaging",
    title: "Define regional quiet hours for digest notifications",
  },
  {
    date: "27 Apr",
    id: "r-7",
    owner: "Ralph Merkle",
    owners: ["53"],
    progress: 46,
    signal: "On track",
    stage: "To Do",
    tag: "Mobile",
    title: "Prototype mobile composer",
  },
  {
    date: "14 Oct",
    id: "r-8",
    owner: "Emil Novak",
    owners: ["12", "47"],
    progress: 58,
    signal: "At risk",
    stage: "To Do",
    tag: "Revenue",
    title: "Connect revenue alerts to renewals",
  },
  {
    date: "30 Sep",
    id: "r-9",
    owner: "Noa Kim",
    owners: ["49", "51"],
    progress: 37,
    signal: "Queued",
    stage: "To Do",
    tag: "Workflow",
    title: "Write handoff checklist for knowledge bases",
  },
  {
    date: "08 May",
    id: "r-10",
    owner: "Jonas Reed",
    owners: ["52", "11", "12"],
    progress: 29,
    signal: "Blocked",
    stage: "To Do",
    tag: "Access",
    title: "Separate SSO exception review from the queue",
  },
  {
    date: "21 Jul",
    id: "r-11",
    owner: "Maya Perez",
    owners: ["47"],
    progress: 51,
    signal: "On track",
    stage: "To Do",
    tag: "Messaging",
    title: "Preview announcement routing",
  },
  {
    date: "19 Dec",
    id: "r-12",
    owner: "Pavel Singh",
    owners: ["13", "49"],
    progress: 76,
    signal: "On track",
    stage: "In Progress",
    tag: "AI Quality",
    title: "Tune citation scoring for generated releases",
  },
];

const stageColor: Record<Stage, string> = {
  Backlog: "bg-muted-foreground",
  "In Progress": "bg-chart-2",
  Review: "bg-chart-3",
  "To Do": "bg-chart-1",
};
const stageCopy: Record<Stage, string> = {
  Backlog: "Ideas waiting for product shaping",
  "In Progress": "Active delivery with review signals",
  Review: "Active delivery with review signals",
  "To Do": "Scoped work ready for owners",
};

function TagIcon({ tag }: { tag: string }) {
  if (tag === "AI Quality") {
    return <SparklesIcon />;
  }
  if (tag === "Revenue") {
    return <ArchiveIcon />;
  }
  if (tag === "Mobile") {
    return <LayoutListIcon />;
  }
  if (tag === "Access") {
    return <SlidersHorizontalIcon />;
  }
  return <BellIcon />;
}
const signalClass: Record<Signal, string> = {
  "At risk": "border-chart-4/40 bg-chart-4/10 text-chart-4",
  Blocked: "border-destructive/40 bg-destructive/10 text-destructive",
  "On track": "border-chart-2/40 bg-chart-2/10 text-chart-2",
  Queued: "bg-muted text-foreground",
};
const tagColor: Record<string, string> = {
  Access: "bg-destructive",
  Adoption: "bg-chart-1",
  "AI Quality": "bg-chart-4",
  Knowledge: "bg-chart-3",
  Messaging: "bg-chart-5",
  Mobile: "bg-chart-3",
  Revenue: "bg-chart-2",
  Workflow: "bg-chart-1",
};

function ProgressRing({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-muted-foreground text-sm">–</span>;
  }
  return (
    <span className="flex items-center gap-2 text-sm tabular-nums">
      <span
        className="relative size-7 rounded-full"
        style={{
          background: `conic-gradient(var(--chart-2) ${value * 3.6}deg, var(--muted) 0deg)`,
        }}
      >
        <span className="absolute inset-1 rounded-full bg-card" />
      </span>
      {value}%
    </span>
  );
}

function OwnerStack({ owners }: { owners: string[] }) {
  if (owners.length === 0) {
    return (
      <Avatar size="sm">
        <AvatarFallback>–</AvatarFallback>
      </Avatar>
    );
  }
  return (
    <div className="flex -space-x-2">
      {owners.map((id) => (
        <Avatar className="border-2 border-background" key={id} size="sm">
          <AvatarImage alt="" src={`https://i.pravatar.cc/80?img=${id}`} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export interface Table4Props {
  className?: string;
}

export function Table4({ className }: Table4Props) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Set<Stage>>(new Set());
  const [page, setPage] = useState(0);
  const pageSize = 9;
  const filtered = useMemo(
    () =>
      roadmap.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );
  const pageRows = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const grouped = (Object.keys(stageColor) as Stage[])
    .map((stage) => ({
      items: pageRows.filter((item) => item.stage === stage),
      stage,
    }))
    .filter(({ items }) => items.length > 0);
  const toggleStage = (stage: Stage) =>
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(stage)) {
        next.delete(stage);
      } else {
        next.add(stage);
      }
      return next;
    });
  const countFor = (stage: Stage) =>
    roadmap.filter((item) => item.stage === stage).length;

  return (
    <section
      className={cn(
        "min-h-svh w-full bg-background px-6 py-12 text-foreground",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-6 pb-7">
          <div>
            <h1 className="font-heading font-semibold text-2xl tracking-tight">
              Roadmap Queue
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Track work by stage, owner, and signal.
            </p>
          </div>
          <div className="flex items-center gap-5 text-muted-foreground text-sm">
            {[
              ["Tasks", roadmap.length],
              [
                "Blocked",
                roadmap.filter((item) => item.signal === "Blocked").length,
              ],
              [
                "At risk",
                roadmap.filter((item) => item.signal === "At risk").length,
              ],
              [
                "Unassigned",
                roadmap.filter((item) => item.owner === "Unassigned").length,
              ],
            ].map(([label, count], index) => (
              <div
                className={cn(
                  "flex items-center gap-2",
                  index > 0 && "border-border border-l pl-5"
                )}
                key={String(label)}
              >
                <span>{label}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </div>
        </header>
        <div className="flex flex-wrap items-center justify-between gap-3 border-border border-y bg-card/40 px-5 py-4">
          <div className="relative">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              aria-label="Search roadmap"
              className="h-9 w-80 pl-9"
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Search roadmap..."
              value={query}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <BellIcon data-icon="inline-start" />
              Signals
            </Button>
            <Button variant="outline">
              <SlidersHorizontalIcon data-icon="inline-start" />
              Display
            </Button>
            <Button variant="outline">
              <LayoutListIcon data-icon="inline-start" />
              Collapse groups
            </Button>
            <Button>
              <PlusIcon data-icon="inline-start" />
              New task
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[38%]">Work item</TableHead>
              <TableHead>Owners</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grouped.map(({ stage, items }) => (
              <>
                <TableRow
                  className="bg-muted/40 hover:bg-muted/40"
                  key={`${stage}-group`}
                >
                  <TableCell colSpan={7}>
                    <Button
                      className="h-auto w-full justify-start gap-3"
                      onClick={() => toggleStage(stage)}
                      variant="ghost"
                    >
                      <span
                        className={cn(
                          "size-2.5 rounded-full",
                          stageColor[stage]
                        )}
                      />
                      {collapsed.has(stage) ? (
                        <ChevronRightIcon />
                      ) : (
                        <ChevronDownIcon />
                      )}
                      <span className="font-medium">{stage}</span>
                      <Badge variant="secondary">{countFor(stage)}</Badge>
                      <span className="ml-auto text-muted-foreground text-sm">
                        {stageCopy[stage]}
                      </span>
                    </Button>
                  </TableCell>
                </TableRow>
                {!collapsed.has(stage) &&
                  items.map((item) => (
                    <TableRow className="group" key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="flex size-7 items-center justify-center rounded-lg border border-border text-muted-foreground">
                            <TagIcon tag={item.tag} />
                          </span>
                          <span className="max-w-[420px] truncate font-medium text-sm">
                            {item.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <OwnerStack owners={item.owners} />
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="gap-1.5 font-normal"
                          variant="outline"
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              tagColor[item.tag]
                            )}
                          />
                          {item.tag}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="gap-1.5 font-normal"
                          variant="outline"
                        >
                          <CalendarDaysIcon />
                          {item.date}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ProgressRing value={item.progress} />
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "font-normal",
                            signalClass[item.signal]
                          )}
                          variant="outline"
                        >
                          {item.signal}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-label={`Actions for ${item.title}`}
                              size="icon-sm"
                              variant="ghost"
                            >
                              <EllipsisIcon />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Open task</DropdownMenuItem>
                            <DropdownMenuItem>Move to stage</DropdownMenuItem>
                            <DropdownMenuItem>Assign owner</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            ))}
          </TableBody>
        </Table>
        <footer className="flex items-center justify-end border-border border-t py-3 text-muted-foreground text-sm">
          <Pagination className="w-auto">
            <PaginationContent>
              <PaginationItem>
                <span className="px-2">
                  {page * pageSize + 1}–
                  {Math.min((page + 1) * pageSize, filtered.length)} of{" "}
                  {filtered.length}
                </span>
              </PaginationItem>
              <PaginationItem>
                <Button
                  aria-label="Previous page"
                  disabled={page === 0}
                  onClick={() => setPage((value) => Math.max(0, value - 1))}
                  size="icon-sm"
                  variant="ghost"
                >
                  <ChevronLeftIcon />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <span className="rounded-md bg-muted px-3 py-1 text-foreground">
                  {page + 1}
                </span>
              </PaginationItem>
              <PaginationItem>
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
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </footer>
      </div>
    </section>
  );
}
