/* biome-ignore-all lint/performance/noJsxPropsBind: Interactive table controls intentionally close over row and column state. */
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Columns3Icon,
  DownloadIcon,
  EllipsisIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  ShieldUserIcon,
  Trash2Icon,
  UserIcon,
  UserRoundCogIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Status = "Active" | "Invited" | "Inactive";
type Role = "Admin" | "Editor" | "Viewer";
interface Member {
  avatar: string;
  email: string;
  id: string;
  initials: string;
  joined: string;
  name: string;
  role: Role;
  status: Status;
}
type SortKey = "name" | "role" | "joined";

export const defaultMembers: Member[] = [
  ["Ada Lovelace", "AL", "47", "ada@acme.io", "Active", "Admin", "2026-06-12"],
  ["Alan Turing", "AT", "11", "alan@acme.io", "Active", "Editor", "2026-06-10"],
  [
    "Grace Hopper",
    "GH",
    "45",
    "grace@acme.io",
    "Invited",
    "Editor",
    "2026-06-08",
  ],
  [
    "Linus Pauling",
    "LP",
    "12",
    "linus@acme.io",
    "Inactive",
    "Viewer",
    "2026-05-29",
  ],
  [
    "Katherine Johnson",
    "KJ",
    "49",
    "katherine@acme.io",
    "Active",
    "Viewer",
    "2026-05-21",
  ],
  [
    "Edsger Dijkstra",
    "ED",
    "13",
    "edsger@acme.io",
    "Active",
    "Admin",
    "2026-05-18",
  ],
  [
    "Barbara Liskov",
    "BL",
    "44",
    "barbara@acme.io",
    "Active",
    "Editor",
    "2026-05-14",
  ],
  [
    "Tim Berners-Lee",
    "TB",
    "14",
    "tim@acme.io",
    "Invited",
    "Viewer",
    "2026-05-09",
  ],
  [
    "Margaret Hamilton",
    "MH",
    "48",
    "margaret@acme.io",
    "Active",
    "Editor",
    "2026-05-04",
  ],
  [
    "Donald Knuth",
    "DK",
    "15",
    "donald@acme.io",
    "Inactive",
    "Viewer",
    "2026-04-28",
  ],
  [
    "Radia Perlman",
    "RP",
    "43",
    "radia@acme.io",
    "Active",
    "Admin",
    "2026-04-22",
  ],
  ["Ken Thompson", "KT", "16", "ken@acme.io", "Active", "Editor", "2026-04-19"],
  [
    "Hedy Lamarr",
    "HL",
    "41",
    "hedy@acme.io",
    "Invited",
    "Viewer",
    "2026-04-15",
  ],
  [
    "Dennis Ritchie",
    "DR",
    "17",
    "dennis@acme.io",
    "Active",
    "Editor",
    "2026-04-11",
  ],
  [
    "Shafi Goldwasser",
    "SG",
    "40",
    "shafi@acme.io",
    "Active",
    "Viewer",
    "2026-04-07",
  ],
  [
    "John McCarthy",
    "JM",
    "18",
    "john@acme.io",
    "Inactive",
    "Viewer",
    "2026-04-02",
  ],
  [
    "Frances Allen",
    "FA",
    "39",
    "frances@acme.io",
    "Active",
    "Admin",
    "2026-03-29",
  ],
  ["Vint Cerf", "VC", "19", "vint@acme.io", "Active", "Editor", "2026-03-24"],
  [
    "Adele Goldberg",
    "AG",
    "38",
    "adele@acme.io",
    "Invited",
    "Viewer",
    "2026-03-20",
  ],
  [
    "Bjarne Stroustrup",
    "BS",
    "20",
    "bjarne@acme.io",
    "Active",
    "Editor",
    "2026-03-16",
  ],
  [
    "Karen Spärck Jones",
    "KS",
    "36",
    "karen@acme.io",
    "Active",
    "Viewer",
    "2026-03-11",
  ],
  [
    "Brian Kernighan",
    "BK",
    "51",
    "brian@acme.io",
    "Inactive",
    "Viewer",
    "2026-03-06",
  ],
  [
    "Sophie Wilson",
    "SW",
    "35",
    "sophie@acme.io",
    "Active",
    "Editor",
    "2026-03-01",
  ],
  [
    "Guido van Rossum",
    "GR",
    "52",
    "guido@acme.io",
    "Active",
    "Admin",
    "2026-02-24",
  ],
  [
    "Lynn Conway",
    "LC",
    "34",
    "lynn@acme.io",
    "Invited",
    "Viewer",
    "2026-02-19",
  ],
  [
    "Ralph Merkle",
    "RM",
    "53",
    "ralph@acme.io",
    "Active",
    "Editor",
    "2026-02-13",
  ],
  ["Carol Shaw", "CS", "32", "carol@acme.io", "Active", "Viewer", "2026-02-08"],
  [
    "Niklaus Wirth",
    "NW",
    "54",
    "niklaus@acme.io",
    "Inactive",
    "Viewer",
    "2026-02-02",
  ],
  [
    "Mary Allen Wilkes",
    "MW",
    "31",
    "mary@acme.io",
    "Active",
    "Admin",
    "2026-01-27",
  ],
  [
    "Leslie Lamport",
    "LL",
    "55",
    "leslie@acme.io",
    "Active",
    "Editor",
    "2026-01-21",
  ],
].map(([name, initials, avatar, email, status, role, joined], index) => ({
  avatar: `https://i.pravatar.cc/80?img=${avatar}`,
  email,
  id: `m-${String(index + 1).padStart(2, "0")}`,
  initials,
  joined,
  name,
  role: role as Role,
  status: status as Status,
}));

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const statusVariant: Record<Status, "default" | "secondary" | "outline"> = {
  Active: "default",
  Inactive: "outline",
  Invited: "secondary",
};

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

function SortIcon({ direction }: { direction: "asc" | "desc" | undefined }) {
  if (direction === "asc") {
    return <ArrowUpIcon aria-hidden="true" />;
  }
  if (direction === "desc") {
    return <ArrowDownIcon aria-hidden="true" />;
  }
  return (
    <ArrowUpDownIcon aria-hidden="true" className="text-muted-foreground/60" />
  );
}

export interface Table1Props {
  className?: string;
  members?: Member[];
}

export function Table1({ className, members = defaultMembers }: Table1Props) {
  const [data, setData] = useState(members);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>(
    { direction: "desc", key: "joined" }
  );
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const pageSize = 6;
  const filtered = useMemo(
    () =>
      data
        .filter((member) =>
          `${member.name} ${member.email}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .sort((a, b) => {
          const left = a[sort.key];
          const right = b[sort.key];
          const result =
            sort.key === "joined"
              ? left.localeCompare(right)
              : left.localeCompare(right);
          return sort.direction === "asc" ? result : -result;
        }),
    [data, query, sort]
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleRows = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const pageIds = visibleRows.map((member) => member.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const selectedCount = filtered.filter((member) =>
    selected.has(member.id)
  ).length;
  const toggleSort = (key: SortKey) =>
    setSort((current) => ({
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
      key,
    }));
  const togglePageSelection = (checked: boolean) =>
    setSelected((current) => {
      const next = new Set(current);
      for (const id of pageIds) {
        if (checked) {
          next.add(id);
        } else {
          next.delete(id);
        }
      }
      return next;
    });
  const removeSelected = () => {
    setData((current) => current.filter((member) => !selected.has(member.id)));
    setSelected(new Set());
    toast("Members removed", {
      description: `${selectedCount} ${selectedCount === 1 ? "member" : "members"} removed from the workspace.`,
    });
  };
  const columnVisible = (id: string) => !hiddenColumns.has(id);
  const toggleColumn = (id: string, visible: boolean) =>
    setHiddenColumns((current) => {
      const next = new Set(current);
      if (visible) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  const headings: Record<string, string> = {
    joined: "Joined",
    name: "Member",
    role: "Role",
    status: "Status",
  };

  let pageSelectionState: boolean | "indeterminate" = false;
  if (allPageSelected) {
    pageSelectionState = true;
  } else if (selected.size > 0 && pageIds.some((id) => selected.has(id))) {
    pageSelectionState = "indeterminate";
  }

  return (
    <section
      className={cn(
        "flex min-h-svh w-full justify-center bg-background px-4 py-10 text-foreground sm:py-16 [&_svg]:size-3.5",
        className
      )}
    >
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground">
              <ShieldUserIcon aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-heading font-semibold text-lg tracking-tight">
                Team Members
              </h1>
              <p className="text-muted-foreground text-sm">
                {data.length} members across 3 workspaces
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                aria-label="Search members by name or email"
                className="h-8 w-48 pl-8 text-sm"
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(0);
                }}
                placeholder="Search members..."
                type="search"
                value={query}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button size="sm" variant="outline" />}
              >
                <Columns3Icon data-icon="inline-start" />
                View
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(headings).map(([id, label]) => (
                  <DropdownMenuCheckboxItem
                    checked={columnVisible(id)}
                    key={id}
                    onCheckedChange={(checked) => toggleColumn(id, checked)}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">
              <PlusIcon data-icon="inline-start" />
              Invite
            </Button>
          </div>
        </div>
        {selectedCount > 0 && (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5">
            <span className="font-medium text-sm">
              {selectedCount} Selected
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  toast("Export started", {
                    description: `Exporting ${selectedCount} members to CSV.`,
                  })
                }
                size="sm"
                variant="outline"
              >
                <DownloadIcon data-icon="inline-start" />
                Export
              </Button>
              <Button
                onClick={() =>
                  toast("Role updated", {
                    description: `Changed the role for ${selectedCount} members.`,
                  })
                }
                size="sm"
                variant="outline"
              >
                <UserRoundCogIcon data-icon="inline-start" />
                Change role
              </Button>
              <Button
                className="text-destructive hover:text-destructive"
                onClick={removeSelected}
                size="sm"
                variant="outline"
              >
                <Trash2Icon data-icon="inline-start" />
                Remove
              </Button>
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-10 pl-4">
                  <Checkbox
                    aria-label="Select all members on this page"
                    checked={pageSelectionState === true}
                    indeterminate={pageSelectionState === "indeterminate"}
                    onCheckedChange={(checked) =>
                      togglePageSelection(checked === true)
                    }
                  />
                </TableHead>
                {columnVisible("name") && (
                  <TableHead>
                    <Button
                      className="h-auto p-0 font-medium text-xs uppercase"
                      onClick={() => toggleSort("name")}
                      variant="ghost"
                    >
                      Member{" "}
                      <SortIcon
                        direction={
                          sort.key === "name" ? sort.direction : undefined
                        }
                      />
                    </Button>
                  </TableHead>
                )}
                {columnVisible("status") && (
                  <TableHead className="font-medium text-muted-foreground text-xs uppercase">
                    Status
                  </TableHead>
                )}
                {columnVisible("role") && (
                  <TableHead>
                    <Button
                      className="h-auto p-0 font-medium text-xs uppercase"
                      onClick={() => toggleSort("role")}
                      variant="ghost"
                    >
                      Role{" "}
                      <SortIcon
                        direction={
                          sort.key === "role" ? sort.direction : undefined
                        }
                      />
                    </Button>
                  </TableHead>
                )}
                {columnVisible("joined") && (
                  <TableHead className="text-right">
                    <Button
                      className="h-auto p-0 font-medium text-xs uppercase"
                      onClick={() => toggleSort("joined")}
                      variant="ghost"
                    >
                      Joined{" "}
                      <SortIcon
                        direction={
                          sort.key === "joined" ? sort.direction : undefined
                        }
                      />
                    </Button>
                  </TableHead>
                )}
                <TableHead className="w-10 pr-4">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.length > 0 ? (
                visibleRows.map((member) => (
                  <TableRow
                    className="border-border transition-colors hover:bg-muted/30"
                    data-state={
                      selected.has(member.id) ? "selected" : undefined
                    }
                    key={member.id}
                  >
                    <TableCell className="pl-4">
                      <Checkbox
                        aria-label={`Select ${member.name}`}
                        checked={selected.has(member.id)}
                        onCheckedChange={(checked) =>
                          setSelected((current) => {
                            const next = new Set(current);
                            if (checked) {
                              next.add(member.id);
                            } else {
                              next.delete(member.id);
                            }
                            return next;
                          })
                        }
                      />
                    </TableCell>
                    {columnVisible("name") && (
                      <TableCell>
                        <div className="flex min-w-0 items-center gap-3">
                          <Avatar
                            className="shrink-0 border border-border"
                            size="sm"
                          >
                            <AvatarImage
                              alt={member.name}
                              className="grayscale"
                              src={member.avatar}
                            />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-sm">
                              {member.name}
                            </p>
                            <p className="truncate text-muted-foreground text-xs">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    )}
                    {columnVisible("status") && (
                      <TableCell>
                        <Badge variant={statusVariant[member.status]}>
                          {member.status}
                        </Badge>
                      </TableCell>
                    )}
                    {columnVisible("role") && (
                      <TableCell
                        className={cn(
                          "text-sm",
                          member.role === "Admin"
                            ? "font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {member.role}
                      </TableCell>
                    )}
                    {columnVisible("joined") && (
                      <TableCell className="text-right text-muted-foreground text-xs tabular-nums">
                        {formatDate(member.joined)}
                      </TableCell>
                    )}
                    <TableCell className="pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              aria-label={`Actions for ${member.name}`}
                              size="icon-sm"
                              variant="ghost"
                            />
                          }
                        >
                          <EllipsisIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <UserIcon data-icon="inline-start" />
                            View profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PencilIcon data-icon="inline-start" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              toast("Member removed", {
                                description: `${member.name} was removed from the workspace.`,
                              })
                            }
                            variant="destructive"
                          >
                            <Trash2Icon data-icon="inline-start" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center text-muted-foreground text-sm"
                    colSpan={6}
                  >
                    No members match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-border border-t bg-muted/20 px-4 py-2.5">
            <p className="text-muted-foreground text-xs">
              <span className="font-medium text-foreground">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "Result" : "Results"}
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                aria-label="Previous page"
                className="size-7"
                disabled={page === 0}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                size="icon"
                variant="outline"
              >
                <ChevronLeftIcon />
              </Button>
              <span className="px-1 text-muted-foreground text-xs tabular-nums">
                Page {page + 1} of {pageCount}
              </span>
              <Button
                aria-label="Next page"
                className="size-7"
                disabled={page >= pageCount - 1}
                onClick={() =>
                  setPage((current) => Math.min(pageCount - 1, current + 1))
                }
                size="icon"
                variant="outline"
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
