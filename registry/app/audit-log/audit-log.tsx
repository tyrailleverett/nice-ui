"use client";

import {
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleDotIcon,
  DownloadIcon,
  FilterIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface AuditEvent {
  action: "Created" | "Updated" | "Deleted" | "Published" | "Invited";
  actor: string;
  id: string;
  initials: string;
  metadata: string;
  resource: string;
  resourceType: string;
  timestamp: string;
}

const auditEvents: AuditEvent[] = [
  {
    action: "Published",
    actor: "Maya Chen",
    id: "evt-1048",
    initials: "MC",
    metadata: "Version 2.4 · production",
    resource: "Checkout flow",
    resourceType: "Workflow",
    timestamp: "Today, 10:42 AM",
  },
  {
    action: "Updated",
    actor: "Jon Bell",
    id: "evt-1047",
    initials: "JB",
    metadata: "Changed retry policy from 3 to 5 attempts",
    resource: "Stripe connection",
    resourceType: "Integration",
    timestamp: "Today, 9:18 AM",
  },
  {
    action: "Invited",
    actor: "Priya Shah",
    id: "evt-1046",
    initials: "PS",
    metadata: "Role: Analyst · Invite pending",
    resource: "Elena Rossi",
    resourceType: "Workspace member",
    timestamp: "Yesterday, 4:26 PM",
  },
  {
    action: "Created",
    actor: "Maya Chen",
    id: "evt-1045",
    initials: "MC",
    metadata: "Source: template / lifecycle",
    resource: "Trial conversion",
    resourceType: "Automation",
    timestamp: "Yesterday, 2:04 PM",
  },
  {
    action: "Deleted",
    actor: "Owen Wright",
    id: "evt-1044",
    initials: "OW",
    metadata: "Moved to trash · recoverable for 30 days",
    resource: "Legacy webhook",
    resourceType: "Endpoint",
    timestamp: "Yesterday, 11:37 AM",
  },
  {
    action: "Updated",
    actor: "Nina Patel",
    id: "evt-1043",
    initials: "NP",
    metadata: "Added 2 domains to allowed origins",
    resource: "Security policy",
    resourceType: "Policy",
    timestamp: "Aug 18, 5:12 PM",
  },
];

const actionOptions = [
  "All actions",
  "Created",
  "Updated",
  "Deleted",
  "Published",
  "Invited",
] as const;
const resourceOptions = [
  "All resources",
  "Workflow",
  "Integration",
  "Workspace member",
  "Automation",
  "Endpoint",
  "Policy",
] as const;

const actionVariant = {
  Created: "secondary",
  Deleted: "destructive",
  Invited: "outline",
  Published: "default",
  Updated: "outline",
} as const;

export interface AuditLogProps {
  className?: string;
  events?: AuditEvent[];
  isLoading?: boolean;
  onExport?: () => void;
}

function FilterSelect({
  ariaLabel,
  id,
  label,
  onValueChange,
  options,
  value,
}: {
  ariaLabel: string;
  id: string;
  label: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  value: string;
}) {
  return (
    <Field>
      <FieldLabel className="text-muted-foreground text-xs" htmlFor={id}>
        {label}
      </FieldLabel>
      <Select
        onValueChange={useCallback(
          (nextValue: string | null) => onValueChange(nextValue ?? options[0]),
          [onValueChange, options]
        )}
        value={value}
      >
        <SelectTrigger
          aria-label={ariaLabel}
          className="w-full bg-background"
          id={id}
          size="sm"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

function LoadingRows() {
  return (
    <>
      {["one", "two", "three", "four"].map((row) => (
        <TableRow key={row}>
          <TableCell className="py-4 pl-5">
            <Skeleton className="size-7 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-28" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="pr-5">
            <Skeleton className="ml-auto h-4 w-16" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export function AuditLog({
  className,
  events = auditEvents,
  isLoading = false,
  onExport,
}: AuditLogProps) {
  const [action, setAction] = useState("All actions");
  const [date, setDate] = useState("Last 7 days");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [resource, setResource] = useState("All resources");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("All users");
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(event.target.value),
    []
  );

  const userOptions = useMemo(
    () => ["All users", ...new Set(events.map((event) => event.actor))],
    [events]
  );
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return events.filter((event) => {
      const matchesAction = action === "All actions" || event.action === action;
      const matchesDate =
        date !== "Today" || event.timestamp.startsWith("Today");
      const matchesResource =
        resource === "All resources" || event.resourceType === resource;
      const matchesUser = user === "All users" || event.actor === user;
      const matchesSearch =
        !query ||
        `${event.actor} ${event.resource} ${event.action}`
          .toLowerCase()
          .includes(query);
      return (
        matchesAction &&
        matchesDate &&
        matchesResource &&
        matchesUser &&
        matchesSearch
      );
    });
  }, [action, date, events, resource, search, user]);

  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-10",
        className
      )}
    >
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="gap-4 border-border/70 border-b pb-5 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/40 text-muted-foreground">
                <SlidersHorizontalIcon aria-hidden="true" />
              </div>
              <div>
                <CardTitle className="text-xl tracking-tight">
                  Audit log
                </CardTitle>
                <CardDescription className="mt-1 max-w-xl">
                  A running record of changes across your workspace.
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={onExport} size="sm" variant="outline">
                <DownloadIcon data-icon="inline-start" />
                Export CSV
              </Button>
              <Button
                aria-label="More audit log actions"
                size="icon-sm"
                variant="ghost"
              >
                <ChevronDownIcon aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <CheckCircle2Icon className="text-primary" />
            <span>Retention: 90 days</span>
            <span aria-hidden="true">·</span>
            <span>Showing workspace activity</span>
          </div>
        </CardHeader>

        <CardContent className="gap-0 p-0">
          <div className="border-border/70 border-b bg-muted/20 px-4 py-4 sm:px-6">
            <div className="mb-3 flex items-center gap-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
              <FilterIcon aria-hidden="true" />
              Filter activity
            </div>
            <FieldGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1.5fr]">
              <FilterSelect
                ariaLabel="Date range"
                id="audit-date"
                label="Date"
                onValueChange={setDate}
                options={["Last 7 days", "Today", "Last 30 days"]}
                value={date}
              />
              <FilterSelect
                ariaLabel="Filter by user"
                id="audit-user"
                label="User"
                onValueChange={setUser}
                options={userOptions}
                value={user}
              />
              <FilterSelect
                ariaLabel="Filter by action"
                id="audit-action"
                label="Action"
                onValueChange={setAction}
                options={actionOptions}
                value={action}
              />
              <FilterSelect
                ariaLabel="Filter by resource"
                id="audit-resource"
                label="Resource"
                onValueChange={setResource}
                options={resourceOptions}
                value={resource}
              />
              <Field>
                <FieldLabel
                  className="text-muted-foreground text-xs"
                  htmlFor="audit-search"
                >
                  Search events
                </FieldLabel>
                <div className="relative">
                  <SearchIcon
                    aria-hidden="true"
                    className="absolute top-2 left-2.5 text-muted-foreground"
                  />
                  <Input
                    className="h-8 bg-background pl-8"
                    id="audit-search"
                    onChange={handleSearchChange}
                    placeholder="Search by actor or resource"
                    value={search}
                  />
                </div>
              </Field>
            </FieldGroup>
          </div>

          <div className="overflow-hidden">
            <Table>
              <TableHeader className="bg-background">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-14 pl-5" scope="col">
                    <span className="sr-only">Event</span>
                  </TableHead>
                  <TableHead scope="col">Actor</TableHead>
                  <TableHead scope="col">Action</TableHead>
                  <TableHead scope="col">Resource</TableHead>
                  <TableHead className="pr-5 text-right" scope="col">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody aria-busy={isLoading}>
                {isLoading ? <LoadingRows /> : null}
                {!isLoading && filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell className="py-16 text-center" colSpan={5}>
                      <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
                        <div className="flex size-10 items-center justify-center rounded-full border bg-muted/30 text-muted-foreground">
                          <SearchIcon aria-hidden="true" />
                        </div>
                        <p className="font-medium">No matching activity</p>
                        <p className="text-muted-foreground text-sm">
                          Try broadening your filters or searching for another
                          resource.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : null}
                {isLoading
                  ? null
                  : filteredEvents.map((event, index) => {
                      const isExpanded = expandedId === event.id;
                      return (
                        <AuditEventRow
                          event={event}
                          index={index}
                          isExpanded={isExpanded}
                          key={event.id}
                          onToggle={setExpandedId}
                        />
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-3 border-border/70 border-t py-4 sm:flex-row sm:justify-between sm:px-6">
          <p className="text-muted-foreground text-xs">
            {isLoading
              ? "Loading activity…"
              : `Showing ${filteredEvents.length} of ${events.length} events`}
          </p>
          <Pagination className="mx-0 w-auto justify-start sm:justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-label="Page 1" href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-label="Page 2" href="#">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-label="Page 3" href="#">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </main>
  );
}

function AuditEventRow({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: AuditEvent;
  index: number;
  isExpanded: boolean;
  onToggle: (id: string | null) => void;
}) {
  const handleToggle = useCallback(
    () => onToggle(isExpanded ? null : event.id),
    [event.id, isExpanded, onToggle]
  );

  return (
    <>
      <TableRow aria-expanded={isExpanded} className="group">
        <TableCell className="relative py-4 pl-5 align-top">
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-1/2 left-[27px] w-px bg-border"
            />
          ) : null}
          <span
            aria-hidden="true"
            className="relative z-10 flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground ring-4 ring-background"
          >
            <CircleDotIcon />
          </span>
          <span
            aria-hidden="true"
            className="absolute top-1/2 bottom-0 left-[27px] w-px bg-border group-last:hidden"
          />
        </TableCell>
        <TableCell className="align-top">
          <div className="flex items-center gap-2.5">
            <Avatar size="sm">
              <AvatarFallback>{event.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-medium">{event.actor}</p>
              <p className="text-muted-foreground text-xs">Workspace member</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="align-top">
          <Badge variant={actionVariant[event.action]}>{event.action}</Badge>
        </TableCell>
        <TableCell className="max-w-[17rem] align-top">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate font-medium">{event.resource}</span>
            <span className="shrink-0 text-muted-foreground text-xs">
              {event.resourceType}
            </span>
          </div>
        </TableCell>
        <TableCell className="pr-5 text-right align-top">
          <div className="flex items-start justify-end gap-2">
            <time
              className="whitespace-nowrap text-muted-foreground text-xs"
              dateTime={event.id}
            >
              {event.timestamp}
            </time>
            <Button
              aria-label={`Inspect ${event.resource} event`}
              onClick={handleToggle}
              size="icon-xs"
              variant="ghost"
            >
              <ChevronRightIcon
                className={cn(
                  "transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded ? (
        <TableRow className="bg-muted/20 hover:bg-muted/20">
          <TableCell className="py-3 pl-16" colSpan={5}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <span className="font-medium">Event details</span>
              <Separator
                className="hidden h-4 sm:block"
                orientation="vertical"
              />
              <span className="text-muted-foreground">{event.metadata}</span>
              <span className="font-mono text-muted-foreground">
                {event.id}
              </span>
            </div>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}
