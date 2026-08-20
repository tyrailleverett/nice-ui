"use client";

import {
  CheckIcon,
  Clock3Icon,
  EllipsisIcon,
  MailPlusIcon,
  MoreHorizontalIcon,
  SearchIcon,
  SendIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

type MemberStatus = "Active" | "Invited" | "Suspended";
type MemberRole = "Admin" | "Editor" | "Viewer";

export interface Member {
  email: string;
  id: string;
  initials: string;
  name: string;
  role: MemberRole;
  status: MemberStatus;
  team: string;
}

export interface PendingInvite {
  email: string;
  id: string;
  invited: string;
  role: MemberRole;
}

const defaultMembers: Member[] = [
  {
    email: "maya@northstar.co",
    id: "m-01",
    initials: "MC",
    name: "Maya Chen",
    role: "Admin",
    status: "Active",
    team: "Operations",
  },
  {
    email: "jon@northstar.co",
    id: "m-02",
    initials: "JB",
    name: "Jon Bell",
    role: "Editor",
    status: "Active",
    team: "Product",
  },
  {
    email: "priya@northstar.co",
    id: "m-03",
    initials: "PS",
    name: "Priya Shah",
    role: "Editor",
    status: "Active",
    team: "Growth",
  },
  {
    email: "owen@northstar.co",
    id: "m-04",
    initials: "OW",
    name: "Owen Wright",
    role: "Viewer",
    status: "Active",
    team: "Finance",
  },
  {
    email: "nina@northstar.co",
    id: "m-05",
    initials: "NP",
    name: "Nina Patel",
    role: "Viewer",
    status: "Suspended",
    team: "Operations",
  },
  {
    email: "elena@northstar.co",
    id: "m-06",
    initials: "ER",
    name: "Elena Rossi",
    role: "Editor",
    status: "Invited",
    team: "Product",
  },
];

const defaultInvites: PendingInvite[] = [
  {
    email: "samira.khan@northstar.co",
    id: "i-01",
    invited: "2 days ago",
    role: "Editor",
  },
  {
    email: "marco@northstar.co",
    id: "i-02",
    invited: "5 days ago",
    role: "Viewer",
  },
];

const statusVariant: Record<MemberStatus, "default" | "secondary" | "outline"> =
  {
    Active: "default",
    Invited: "secondary",
    Suspended: "outline",
  };

export interface MembersManagementProps {
  className?: string;
  invites?: PendingInvite[];
  members?: Member[];
}

export function MembersManagement({
  className,
  invites = defaultInvites,
  members = defaultMembers,
}: MembersManagementProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(event.target.value),
    []
  );
  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setStatus(event.target.value),
    []
  );

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesQuery = `${member.name} ${member.email} ${member.team}`
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesStatus =
        status === "All statuses" || member.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [members, query, status]);

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;
  const seatsUsed = activeMembers + invites.length;
  const seatPercentage = Math.min(100, Math.round((seatsUsed / 24) * 100));

  return (
    <main
      className={cn(
        "min-h-svh w-full bg-background text-foreground",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <header className="flex flex-col gap-6 border-border border-b pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-[0.18em]">
              <UsersIcon aria-hidden="true" className="size-3.5" /> Workspace
              directory
            </div>
            <h1 className="font-heading font-semibold text-3xl tracking-tight sm:text-4xl">
              Members & enrollment
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground text-sm leading-6">
              Keep the right people close to the work. Manage access, roles, and
              invitations from one place.
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <MailPlusIcon data-icon="inline-start" /> Invite teammates
          </Button>
        </header>

        <section
          aria-label="Membership summary"
          className="grid border-border border-b sm:grid-cols-3"
        >
          <div className="flex items-center gap-4 border-border py-5 sm:border-r sm:pr-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UsersIcon aria-hidden="true" className="size-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Active members</p>
              <p className="mt-1 font-heading font-semibold text-2xl tabular-nums">
                {activeMembers}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-border py-5 sm:border-r sm:px-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <ShieldCheckIcon aria-hidden="true" className="size-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Seats in use</p>
              <p className="mt-1 font-heading font-semibold text-2xl tabular-nums">
                {seatsUsed}
                <span className="font-normal text-muted-foreground text-sm">
                  {" "}
                  / 24
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 py-5 sm:pl-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-700">
              <Clock3Icon aria-hidden="true" className="size-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Pending invites</p>
              <p className="mt-1 font-heading font-semibold text-2xl tabular-nums">
                {invites.length}
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="enrollment-title"
          className="my-8 overflow-hidden border border-border bg-muted/20"
        >
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex gap-4">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <SendIcon aria-hidden="true" className="size-4" />
              </div>
              <div>
                <h2 className="font-medium text-sm" id="enrollment-title">
                  Finish enrolling your team
                </h2>
                <p className="mt-1 text-muted-foreground text-sm">
                  {invites.length
                    ? `${invites.length} invitation${invites.length === 1 ? " is" : "s are"} waiting for a response.`
                    : "Your team is fully enrolled."}
                </p>
              </div>
            </div>
            <div className="min-w-44 sm:w-56">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-muted-foreground">Seat utilization</span>
                <span className="font-medium tabular-nums">
                  {seatPercentage}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${seatPercentage}%` }}
                />
              </div>
            </div>
          </div>
          {invites.length > 0 && (
            <div className="grid border-border border-t sm:grid-cols-2">
              {invites.map((invite) => (
                <div
                  className="flex items-center justify-between gap-4 border-border p-4 sm:even:border-l"
                  key={invite.id}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-sm">
                      {invite.email}
                    </p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      {invite.role} · Sent {invite.invited}
                    </p>
                  </div>
                  <Button
                    aria-label={`Resend invite to ${invite.email}`}
                    size="sm"
                    variant="outline"
                  >
                    Resend
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="directory-title">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className="font-heading font-semibold text-xl tracking-tight"
                id="directory-title"
              >
                Directory
              </h2>
              <p className="mt-1 text-muted-foreground text-sm">
                {filteredMembers.length} of {members.length} members
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative" htmlFor="member-search">
                <span className="sr-only">Search members</span>
                <SearchIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  aria-label="Search members"
                  className="h-9 w-full pl-8 sm:w-64"
                  id="member-search"
                  onChange={handleQueryChange}
                  placeholder="Search by name or email"
                  type="search"
                  value={query}
                />
              </label>
              <label htmlFor="member-status">
                <span className="sr-only">Filter members by status</span>
                <select
                  aria-label="Filter members by status"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-40"
                  id="member-status"
                  onChange={handleStatusChange}
                  value={status}
                >
                  <option>All statuses</option>
                  <option>Active</option>
                  <option>Invited</option>
                  <option>Suspended</option>
                </select>
              </label>
            </div>
          </div>

          <div className="overflow-hidden border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="pl-5">Member</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12 pr-4">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-3">
                          <Avatar className="border border-border" size="sm">
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
                      <TableCell className="text-muted-foreground text-sm">
                        {member.team}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[member.status]}>
                          {member.status === "Active" && (
                            <CheckIcon aria-hidden="true" />
                          )}
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-4">
                        <Button
                          aria-label={`More actions for ${member.name}`}
                          size="icon-sm"
                          variant="ghost"
                        >
                          <MoreHorizontalIcon aria-hidden="true" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="h-28 text-center" colSpan={5}>
                      <p className="font-medium text-sm">No members found</p>
                      <p className="mt-1 text-muted-foreground text-xs">
                        Try a different name, email, or status.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-muted-foreground text-xs">
            <EllipsisIcon aria-hidden="true" className="size-3.5" /> Roles can
            be changed by workspace admins.
          </p>
        </section>
      </div>
    </main>
  );
}
