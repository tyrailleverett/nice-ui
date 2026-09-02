"use client";

import {
  BellIcon,
  CheckCheckIcon,
  FileTextIcon,
  MessageCircleIcon,
  UserPlusIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotificationFilter = "all" | "unread" | "mentions";
type NotificationGroup = "Today" | "Yesterday" | "Earlier";

export interface NotificationItem {
  actor: string;
  group: NotificationGroup;
  icon: typeof MessageCircleIcon;
  id: string;
  kind: "mention" | "workspace" | "comment";
  message: string;
  time: string;
  unread: boolean;
}

const initialItems: NotificationItem[] = [
  {
    actor: "Maya Chen",
    group: "Today",
    icon: MessageCircleIcon,
    id: "design-system",
    kind: "comment",
    message: "commented on Design system",
    time: "8 min ago",
    unread: true,
  },
  {
    actor: "Jon Bell",
    group: "Today",
    icon: UserPlusIcon,
    id: "jon-joined",
    kind: "workspace",
    message: "joined your workspace",
    time: "42 min ago",
    unread: true,
  },
  {
    actor: "Priya Shah",
    group: "Yesterday",
    icon: MessageCircleIcon,
    id: "roadmap-mention",
    kind: "mention",
    message: "mentioned you in Q3 roadmap",
    time: "Yesterday",
    unread: true,
  },
  {
    actor: "Workspace",
    group: "Earlier",
    icon: FileTextIcon,
    id: "planning-update",
    kind: "workspace",
    message: "updated Q3 planning",
    time: "Monday",
    unread: false,
  },
];

const filters: { label: string; value: NotificationFilter }[] = [
  { label: "All activity", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Mentions", value: "mentions" },
];

export interface Notification5Props {
  className?: string;
  defaultItems?: NotificationItem[];
}

export function Notification5({
  className,
  defaultItems: initialNotificationItems = initialItems,
}: Notification5Props) {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const [items, setItems] = useState(initialNotificationItems);
  const unreadCount = items.filter((item) => item.unread).length;
  const visibleItems = useMemo(
    () =>
      items.filter((item) => {
        if (activeFilter === "unread") {
          return item.unread;
        }
        if (activeFilter === "mentions") {
          return item.kind === "mention";
        }
        return true;
      }),
    [activeFilter, items]
  );
  const groupedItems = useMemo(() => {
    const groups = new Map<NotificationGroup, NotificationItem[]>();
    for (const item of visibleItems) {
      const group = groups.get(item.group) ?? [];
      group.push(item);
      groups.set(item.group, group);
    }
    return groups;
  }, [visibleItems]);
  const markAllRead = useCallback(
    () =>
      setItems((current) =>
        current.map((item) => ({ ...item, unread: false }))
      ),
    []
  );
  const markRead = useCallback(
    (id: string) =>
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, unread: false } : item
        )
      ),
    []
  );
  const handleFilterChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextFilter = event.currentTarget.dataset.filter;
      if (
        nextFilter === "all" ||
        nextFilter === "unread" ||
        nextFilter === "mentions"
      ) {
        setActiveFilter(nextFilter);
      }
    },
    []
  );
  const handleMarkRead = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { notificationId } = event.currentTarget.dataset;
      if (notificationId) {
        markRead(notificationId);
      }
    },
    [markRead]
  );

  return (
    <main
      className={cn("min-h-screen bg-muted/20 px-4 py-8 sm:px-6", className)}
    >
      <section
        aria-label="Notification center"
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-sm"
      >
        <header className="flex items-start gap-3 border-border border-b p-5 sm:p-6">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <BellIcon aria-hidden="true" className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-semibold text-lg tracking-tight">
              Notifications
            </h1>
            <p className="mt-1 text-muted-foreground text-sm">
              Updates from your workspace
            </p>
          </div>
          <Badge
            aria-label={`${unreadCount} unread notifications`}
            className="hidden sm:inline-flex"
            variant="secondary"
          >
            {unreadCount} unread
          </Badge>
          <Button
            aria-label="Mark all notifications as read"
            disabled={unreadCount === 0}
            onClick={markAllRead}
            size="sm"
            type="button"
            variant="outline"
          >
            <CheckCheckIcon data-icon="inline-start" />
            <span className="hidden sm:inline">Mark all read</span>
            <span className="sm:hidden">Read all</span>
          </Button>
        </header>
        <nav
          aria-label="Notification filters"
          className="flex gap-1 overflow-x-auto border-border border-b p-3"
        >
          {filters.map((filter) => (
            <Button
              aria-pressed={activeFilter === filter.value}
              className="shrink-0"
              data-filter={filter.value}
              key={filter.value}
              onClick={handleFilterChange}
              size="sm"
              type="button"
              variant={activeFilter === filter.value ? "secondary" : "ghost"}
            >
              {filter.label}
              {filter.value === "unread" ? ` · ${unreadCount}` : null}
            </Button>
          ))}
        </nav>
        {visibleItems.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 py-16 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted">
              <BellIcon
                aria-hidden="true"
                className="size-5 text-muted-foreground"
              />
            </span>
            <h2 className="mt-4 font-medium text-base">You’re all caught up</h2>
            <p className="mt-1 max-w-xs text-muted-foreground text-sm">
              No notifications match this filter. New activity will show up
              here.
            </p>
          </div>
        ) : (
          <div>
            {[...groupedItems.entries()].map(([group, groupItems]) => (
              <section
                aria-labelledby={`notification-group-${group}`}
                key={group}
              >
                <h2
                  className="border-border border-b bg-muted/30 px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider sm:px-6"
                  id={`notification-group-${group}`}
                >
                  {group}
                </h2>
                {groupItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article
                      className={cn(
                        "group flex gap-3 border-border border-b px-5 py-4 transition-colors last:border-0 hover:bg-muted/30 sm:px-6",
                        item.unread && "bg-primary/[0.03]"
                      )}
                      key={item.id}
                    >
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon
                          aria-hidden="true"
                          className="size-4 text-muted-foreground"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-5">
                          <strong className="font-medium">{item.actor}</strong>{" "}
                          <span className="text-muted-foreground">
                            {item.message}
                          </span>
                        </p>
                        <time className="mt-1 block text-muted-foreground text-xs">
                          {item.time}
                        </time>
                      </div>
                      {item.unread ? (
                        <button
                          aria-label={`Mark notification from ${item.actor} as read`}
                          className="mt-2 size-2 shrink-0 rounded-full bg-primary outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
                          data-notification-id={item.id}
                          onClick={handleMarkRead}
                          title="Mark as read"
                          type="button"
                        />
                      ) : null}
                    </article>
                  );
                })}
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
