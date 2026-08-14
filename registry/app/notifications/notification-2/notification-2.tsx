import type { LucideIcon } from "lucide-react";
import { AtSign, Check, GitPullRequest, MessageCircle, X } from "lucide-react";
import { type MouseEvent, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export interface Notification2Props {
  className?: string;
}
const items: readonly (readonly [
  string,
  string,
  string,
  string,
  LucideIcon,
  string,
])[] = [
  [
    "Lena Fischer",
    "Approved Your Pull Request",
    "feat/notifications-center is ready to merge into main.",
    "Review",
    GitPullRequest,
    "LF",
  ],
  [
    "Sofia Rossi",
    "Replied To Your Thread",
    "Agreed, let us keep the empty state copy short and warm.",
    "Comment",
    MessageCircle,
    "SR",
  ],
  [
    "Omar Haddad",
    "Mentioned You",
    "Thanks for the quick turnaround on the billing fix.",
    "Mention",
    AtSign,
    "OH",
  ],
];

export function Notification2({ className }: Notification2Props) {
  const [tab, setTab] = useState("All");
  const [read, setRead] = useState(false);
  const markRead = useCallback(() => setRead(true), []);
  const changeTab = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setTab(event.currentTarget.dataset.tab ?? "All");
  }, []);
  return (
    <section
      className={cn(
        "w-full max-w-[896px] overflow-hidden border border-border bg-background text-foreground",
        className
      )}
    >
      <header className="flex items-center justify-between px-8 py-7">
        <div className="flex items-center gap-4">
          <h2 className="font-medium text-[28px]">Notifications</h2>
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            10
          </span>
        </div>
        <div className="flex items-center gap-12 text-muted-foreground text-xl">
          <button
            className="flex items-center gap-3 hover:text-white"
            onClick={markRead}
            type="button"
          >
            <Check size={20} /> {read ? "All Read" : "Mark All Read"}
          </button>
          <button aria-label="Close" type="button">
            <X />
          </button>
        </div>
      </header>
      <div className="mx-8 mb-6 flex rounded-2xl bg-muted p-1.5">
        {["All", "Unread  10", "Mentions  3"].map((label) => (
          <button
            className={cn(
              "flex-1 rounded-xl px-4 py-2 text-[25px] text-muted-foreground",
              tab === label && "bg-background text-foreground shadow-sm"
            )}
            data-tab={label}
            key={label}
            onClick={changeTab}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="border-border border-t">
        {[...items, ...items, items[0]].map(
          ([name, action, body, tag, Icon, initials]) => (
            <article
              className="flex gap-6 border-border border-b px-8 py-6"
              key={`${name}-${tag}`}
            >
              <span className="flex size-[72px] shrink-0 items-center justify-center rounded-2xl bg-muted text-2xl text-muted-foreground">
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[23px]">
                  <b className="font-medium">{name}</b>{" "}
                  <span className="text-muted-foreground">{action}</span>
                </h3>
                <p className="mt-2 text-[22px] text-muted-foreground">{body}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-muted px-3 py-1 text-lg text-muted-foreground">
                    <Icon className="mr-2 inline" size={15} />
                    {tag}
                  </span>
                  <time className="text-lg text-muted-foreground">
                    Just Now
                  </time>
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}
