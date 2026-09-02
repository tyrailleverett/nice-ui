/* biome-ignore-all lint/performance/noJsxPropsBind: Inbox controls intentionally bind local interaction handlers. */
"use client";

import {
  ArchiveIcon,
  ArrowUpIcon,
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  Clock3Icon,
  CommandIcon,
  InboxIcon,
  LifeBuoyIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  SmileIcon,
  TagIcon,
  UserRoundIcon,
  UsersIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Conversation {
  channel: string;
  company: string;
  email: string;
  id: string;
  initials: string;
  joined: string;
  location: string;
  messages: { body: string; from: "customer" | "agent"; time: string }[];
  name: string;
  plan: string;
  preview: string;
  priority?: "high";
  status: "open" | "pending";
  subject: string;
  tags: string[];
  time: string;
}

const conversations: Conversation[] = [
  {
    channel: "Email",
    company: "Northstar Studio",
    email: "maya@northstar.studio",
    id: "maya",
    initials: "MR",
    joined: "Joined Mar 2024",
    location: "Austin, TX",
    messages: [
      {
        body: "Hi there — I’m trying to export our workspace before a planning meeting, but it has been stuck on “preparing” for about 20 minutes. Is something broken?",
        from: "customer",
        time: "9:31 AM",
      },
      {
        body: "Hey Maya, thanks for flagging this. I’m looking into the export job now and will get you an answer before your meeting.",
        from: "agent",
        time: "9:36 AM",
      },
      {
        body: "That would be amazing, thank you! The workspace is Northstar / Q2 planning.",
        from: "customer",
        time: "9:38 AM",
      },
    ],
    name: "Maya Rodriguez",
    plan: "Growth plan",
    preview: "The export has been stuck on preparing for…",
    priority: "high",
    status: "open",
    subject: "Cannot export our workspace",
    tags: ["Export", "Bug report"],
    time: "9m",
  },
  {
    channel: "Chat",
    company: "Acme Co.",
    email: "jon@acme.co",
    id: "jon",
    initials: "JB",
    joined: "Joined Jan 2023",
    location: "New York, NY",
    messages: [
      {
        body: "Do you support just-in-time provisioning with SAML?",
        from: "customer",
        time: "9:16 AM",
      },
      {
        body: "Yes — JIT provisioning is available on Scale. I can send over the setup guide if helpful.",
        from: "agent",
        time: "9:19 AM",
      },
    ],
    name: "Jon Bell",
    plan: "Scale plan",
    preview: "Do you support just-in-time provisioning…",
    status: "open",
    subject: "Question about SSO setup",
    tags: ["SSO", "Account"],
    time: "24m",
  },
  {
    channel: "Email",
    company: "Lumen Labs",
    email: "priya@lumenlabs.io",
    id: "priya",
    initials: "PS",
    joined: "Joined Jul 2025",
    location: "London, UK",
    messages: [
      {
        body: "Could you update the billing address on our latest invoice?",
        from: "customer",
        time: "8:44 AM",
      },
      {
        body: "Absolutely — I’ve sent this to our billing team for a correction.",
        from: "agent",
        time: "8:51 AM",
      },
    ],
    name: "Priya Shah",
    plan: "Starter plan",
    preview: "Could you update the billing address on…",
    status: "pending",
    subject: "Invoice has the wrong address",
    tags: ["Billing"],
    time: "1h",
  },
  {
    channel: "Chat",
    company: "Everyday Design",
    email: "owen@everyday.design",
    id: "owen",
    initials: "OW",
    joined: "Joined Nov 2024",
    location: "Portland, OR",
    messages: [
      {
        body: "I want to invite our new designer. Where can I add teammates?",
        from: "customer",
        time: "7:10 AM",
      },
      {
        body: "Open Settings → Members, then choose Invite member. You can set their role before sending the invite.",
        from: "agent",
        time: "7:16 AM",
      },
    ],
    name: "Owen Wright",
    plan: "Growth plan",
    preview: "I want to invite our new designer…",
    status: "open",
    subject: "How do I add a teammate?",
    tags: ["Getting started"],
    time: "3h",
  },
];

const filters = ["All inboxes", "Assigned to me", "Unassigned", "Mentions"];

export interface SupportInboxProps {
  className?: string;
}

export function SupportInbox({ className }: SupportInboxProps) {
  const [activeId, setActiveId] = useState("maya");
  const [filter, setFilter] = useState("All inboxes");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"reply" | "note">("reply");
  const [draft, setDraft] = useState("");
  const [resolved, setResolved] = useState(false);
  const [sent, setSent] = useState<string[]>([]);

  const active =
    conversations.find((conversation) => conversation.id === activeId) ??
    conversations[0];
  const visibleConversations = useMemo(
    () =>
      conversations.filter((conversation) =>
        `${conversation.name} ${conversation.subject}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const sendMessage = () => {
    const message = draft.trim();
    if (!message) {
      return;
    }
    setSent((current) => [...current, message]);
    setDraft("");
  };

  return (
    <main
      className={cn(
        "min-h-screen bg-muted/30 p-3 text-foreground sm:p-5",
        className
      )}
    >
      <div className="mx-auto flex min-h-[720px] max-w-[1440px] flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
        <header className="flex flex-col gap-4 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <LifeBuoyIcon className="size-4" />
            </div>
            <div>
              <p className="font-heading font-semibold">Support inbox</p>
              <p className="text-muted-foreground text-xs">
                Tuesday, June 10 · 12 open conversations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              aria-label="Open command menu"
              size="icon-sm"
              variant="ghost"
            >
              <CommandIcon />
            </Button>
            <Button aria-label="Notifications" size="icon-sm" variant="ghost">
              <BellIcon />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[270px_minmax(0,1fr)_250px]">
          <aside className="border-b bg-muted/20 lg:border-r lg:border-b-0">
            <div className="flex items-center justify-between px-4 py-4">
              <h2 className="font-medium text-sm">Inbox</h2>
              <Button aria-label="Add inbox" size="icon-xs" variant="ghost">
                <PlusIcon />
              </Button>
            </div>
            <nav aria-label="Inbox filters" className="space-y-0.5 px-2">
              {filters.map((item) => (
                <button
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                    filter === item && "bg-muted font-medium"
                  )}
                  key={item}
                  onClick={() => setFilter(item)}
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    <InboxIcon className="size-4 text-muted-foreground" />
                    {item}
                  </span>
                  {item === "All inboxes" && (
                    <span className="font-mono text-muted-foreground text-xs">
                      12
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <Separator className="my-4" />
            <div className="px-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Views
                </p>
                <Button aria-label="Add view" size="icon-xs" variant="ghost">
                  <PlusIcon />
                </Button>
              </div>
              <div className="space-y-1 text-muted-foreground text-sm">
                <p className="flex items-center gap-2 px-2 py-1.5">
                  <TagIcon className="size-3.5" />
                  Billing questions
                </p>
                <p className="flex items-center gap-2 px-2 py-1.5">
                  <Clock3Icon className="size-3.5" />
                  Waiting on customer
                </p>
              </div>
            </div>
            <div className="mt-8 px-4">
              <div className="rounded-lg border bg-background p-3">
                <div className="mb-2 flex items-center gap-2">
                  <UsersIcon className="size-4 text-primary" />
                  <span className="font-medium text-xs">Team status</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  4 teammates online
                </p>
                <div className="mt-3 flex -space-x-1">
                  <Avatar size="sm">
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarFallback>JB</AvatarFallback>
                  </Avatar>
                  <span className="grid size-6 place-items-center rounded-full bg-muted font-mono text-[10px] ring-2 ring-background">
                    +1
                  </span>
                </div>
              </div>
            </div>
          </aside>

          <section
            aria-label="Conversations"
            className="flex min-h-0 min-w-0 flex-col border-b lg:border-r lg:border-b-0"
          >
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
              <div>
                <h2 className="font-heading font-semibold">{filter}</h2>
                <p className="text-muted-foreground text-xs">
                  {visibleConversations.length} conversations
                </p>
              </div>
              <Button
                aria-label="More inbox options"
                size="icon-sm"
                variant="ghost"
              >
                <MoreHorizontalIcon />
              </Button>
            </div>
            <div className="border-b p-3">
              <div className="relative">
                <SearchIcon className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                <Input
                  aria-label="Search conversations"
                  className="h-8 bg-muted/30 pl-8 text-xs"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search conversations"
                  value={search}
                />
              </div>
              <div className="mt-2 flex gap-1.5">
                <Badge variant="secondary">Open 9</Badge>
                <Badge variant="outline">Pending 3</Badge>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {visibleConversations.map((conversation) => (
                <button
                  aria-current={
                    activeId === conversation.id ? "true" : undefined
                  }
                  className={cn(
                    "w-full rounded-lg border border-transparent p-3 text-left transition-colors hover:bg-muted/70",
                    activeId === conversation.id && "border-border bg-muted"
                  )}
                  key={conversation.id}
                  onClick={() => {
                    setActiveId(conversation.id);
                    setResolved(false);
                  }}
                  type="button"
                >
                  <div className="flex gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{conversation.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-medium text-sm">
                          {conversation.name}
                        </p>
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-muted-foreground text-xs">
                        {conversation.subject}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            conversation.status === "open"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          )}
                        />
                        {conversation.priority ? (
                          <Badge
                            className="h-4 px-1.5 text-[10px]"
                            variant="destructive"
                          >
                            Priority
                          </Badge>
                        ) : null}
                        <span className="text-[10px] text-muted-foreground">
                          {conversation.channel}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section
            aria-label="Active conversation"
            className="flex min-h-0 min-w-0 flex-col lg:col-span-1"
          >
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-heading font-semibold text-sm">
                    {active.subject}
                  </h2>
                  {resolved ? (
                    <Badge variant="secondary">
                      <CheckIcon />
                      Resolved
                    </Badge>
                  ) : null}
                </div>
                <p className="mt-0.5 text-muted-foreground text-xs">
                  via {active.channel} · opened today at 9:31 AM
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button
                  aria-label="Snooze conversation"
                  size="icon-sm"
                  variant="ghost"
                >
                  <Clock3Icon />
                </Button>
                <Button
                  aria-label="Archive conversation"
                  size="icon-sm"
                  variant="ghost"
                >
                  <ArchiveIcon />
                </Button>
                <Button
                  aria-label="More conversation actions"
                  size="icon-sm"
                  variant="ghost"
                >
                  <MoreHorizontalIcon />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between border-b px-4 py-2 sm:px-5">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{active.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{active.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {active.email}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <UserRoundIcon />
                Assign
                <ChevronDownIcon />
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-8">
              <div className="mb-5 text-center">
                <span className="rounded-full bg-muted px-3 py-1 font-mono text-[10px] text-muted-foreground">
                  TODAY · JUN 10, 2026
                </span>
              </div>
              <div className="space-y-5">
                {[
                  ...active.messages,
                  ...sent.map((body) => ({
                    body,
                    from: "agent" as const,
                    time: "Just now",
                  })),
                ].map((message) => (
                  <div
                    className={cn(
                      "flex gap-2.5",
                      message.from === "agent" && "flex-row-reverse"
                    )}
                    key={`${message.time}-${message.body}`}
                  >
                    <Avatar size="sm">
                      <AvatarFallback>
                        {message.from === "agent" ? "MC" : active.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "max-w-[78%]",
                        message.from === "agent" && "text-right"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-xl px-3.5 py-3 text-sm leading-relaxed",
                          message.from === "agent"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p>{message.body}</p>
                      </div>
                      <p className="mt-1 px-1 text-[10px] text-muted-foreground">
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t bg-muted/20 p-3 sm:p-4">
              <div className="mb-2 flex items-center gap-1">
                <Button
                  onClick={() => setMode("reply")}
                  size="sm"
                  variant={mode === "reply" ? "secondary" : "ghost"}
                >
                  Reply
                </Button>
                <Button
                  onClick={() => setMode("note")}
                  size="sm"
                  variant={mode === "note" ? "secondary" : "ghost"}
                >
                  Private note
                </Button>
                <span className="ml-auto text-[10px] text-muted-foreground">
                  ⌘ ↵ to send
                </span>
              </div>
              <div
                className={cn(
                  "rounded-lg border bg-background p-2",
                  mode === "note" &&
                    "border-amber-300 bg-amber-50/40 dark:border-amber-800 dark:bg-amber-950/20"
                )}
              >
                <Textarea
                  aria-label={
                    mode === "reply" ? "Reply message" : "Private note"
                  }
                  className="min-h-16 resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={
                    mode === "reply"
                      ? "Write a reply…"
                      : "Add a note for your team…"
                  }
                  value={draft}
                />
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-1">
                    <Button
                      aria-label="Attach file"
                      size="icon-xs"
                      variant="ghost"
                    >
                      <PaperclipIcon />
                    </Button>
                    <Button
                      aria-label="Add emoji"
                      size="icon-xs"
                      variant="ghost"
                    >
                      <SmileIcon />
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    size="sm"
                    variant={mode === "note" ? "secondary" : "default"}
                  >
                    {mode === "reply" ? "Send reply" : "Add note"}
                    <SendIcon />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <aside
            aria-label="Customer context"
            className="bg-muted/20 p-4 sm:p-5 lg:border-l-0"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Customer context
              </p>
              <Button
                aria-label="More customer options"
                size="icon-xs"
                variant="ghost"
              >
                <MoreHorizontalIcon />
              </Button>
            </div>
            <div className="flex flex-col items-center text-center">
              <Avatar className="mb-3 size-14">
                <AvatarFallback className="text-lg">
                  {active.initials}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-heading font-semibold">{active.name}</h2>
              <p className="mt-1 text-muted-foreground text-xs">
                {active.company}
              </p>
              <Badge className="mt-3" variant="secondary">
                {active.plan}
              </Badge>
            </div>
            <Separator className="my-5" />
            <dl className="space-y-3 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="truncate font-medium">{active.email}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Location</dt>
                <dd className="font-medium">{active.location}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Customer since</dt>
                <dd className="font-medium">
                  {active.joined.replace("Joined ", "")}
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium text-xs">Tags</p>
                <Button aria-label="Add tag" size="icon-xs" variant="ghost">
                  <PlusIcon />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {active.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-lg border bg-background p-3">
              <p className="font-medium text-xs">Conversation status</p>
              <p className="mt-1 text-muted-foreground text-xs">
                {resolved ? "Resolved just now" : "Waiting for your reply"}
              </p>
              <Button
                className="mt-3 w-full"
                onClick={() => setResolved((value) => !value)}
                size="sm"
                variant={resolved ? "outline" : "default"}
              >
                {resolved ? "Reopen conversation" : "Resolve conversation"}
                <CheckIcon />
              </Button>
            </div>
            <Button className="mt-3 w-full" size="sm" variant="ghost">
              <ArrowUpIcon />
              View full profile
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
}
