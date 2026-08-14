import { FileImage, FileText, ImagePlus, Send, X } from "lucide-react";
import { type ChangeEvent, useCallback, useState } from "react";

import { cn } from "@/lib/utils";

export interface Notification4Props {
  className?: string;
}

interface ActivityAvatarProps {
  className?: string;
  initials: string;
}

function ActivityAvatar({ initials, className }: ActivityAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-16 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-semibold text-foreground text-lg",
        className
      )}
    >
      {initials}
    </span>
  );
}

export function Notification4({ className }: Notification4Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [reply, setReply] = useState("");
  const closeActivity = useCallback(() => setIsOpen(false), []);
  const reopenActivity = useCallback(() => setIsOpen(true), []);
  const updateReply = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setReply(event.target.value),
    []
  );

  if (!isOpen) {
    return (
      <button
        className={cn(
          "rounded-lg border border-border bg-background px-4 py-2 text-foreground text-sm",
          className
        )}
        onClick={reopenActivity}
        type="button"
      >
        Open activity
      </button>
    );
  }

  return (
    <aside
      aria-label="Activity"
      className={cn(
        "w-full max-w-[896px] overflow-hidden border border-border bg-background text-foreground",
        className
      )}
    >
      <header className="flex items-center justify-between border-border border-b px-8 py-6">
        <h2 className="font-medium text-[32px] tracking-[-0.04em]">Activity</h2>
        <button
          aria-label="Close activity"
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={closeActivity}
          type="button"
        >
          <X size={28} />
        </button>
      </header>

      <div>
        <article className="border-border border-b px-8 py-6">
          <div className="flex gap-6">
            <ActivityAvatar initials="JL" />
            <div className="min-w-0 flex-1">
              <p className="text-[24px] leading-tight">
                <strong>Joe Lincoln</strong>{" "}
                <span className="text-muted-foreground">
                  mentioned you in last trends topic
                </span>
              </p>
              <p className="mt-2 text-[22px] text-muted-foreground">
                18 mins ago
              </p>
              <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-6">
                <p className="text-[23px] leading-[1.4]">
                  @ShadcnStudio For an expert opinion, check out what Mike has
                  to say on this topic!
                </p>
                <label className="mt-7 flex items-center gap-3 rounded-xl border border-border bg-background px-5 py-4 shadow-sm">
                  <span className="sr-only">Reply to Joe Lincoln</span>
                  <input
                    className="min-w-0 flex-1 bg-transparent text-[22px] outline-none placeholder:text-muted-foreground"
                    onChange={updateReply}
                    placeholder="Reply"
                    type="text"
                    value={reply}
                  />
                  <button
                    aria-label="Attach image"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    type="button"
                  >
                    <ImagePlus size={24} />
                  </button>
                  {reply ? (
                    <button
                      aria-label="Send reply"
                      className="text-primary transition-colors hover:text-primary/80"
                      type="button"
                    >
                      <Send size={22} />
                    </button>
                  ) : null}
                </label>
              </div>
            </div>
          </div>
        </article>

        <article className="border-border border-b px-8 py-6">
          <div className="flex gap-6">
            <ActivityAvatar initials="JP" />
            <div className="min-w-0 flex-1">
              <p className="text-[24px] leading-tight">
                <strong>Jane Perez</strong>{" "}
                <span className="text-muted-foreground">
                  invites you to review a file
                </span>
              </p>
              <p className="mt-2 text-[22px] text-muted-foreground">
                39 mins ago
              </p>
              <button
                className="mt-6 inline-flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-[22px] transition-colors hover:bg-accent"
                type="button"
              >
                <span className="flex size-8 items-center justify-center rounded-md bg-destructive font-bold text-destructive-foreground text-xs">
                  pdf
                </span>
                <FileText className="text-muted-foreground" size={20} />
                invoices.pdf
              </button>
            </div>
          </div>
        </article>

        <article className="border-border border-b px-8 py-6">
          <div className="flex gap-6">
            <ActivityAvatar initials="TH" />
            <div className="min-w-0 flex-1">
              <p className="text-[24px] leading-tight">
                <strong>Tyler Hero</strong>{" "}
                <span className="text-muted-foreground">
                  wants to view your design project
                </span>
              </p>
              <p className="mt-2 text-[22px] text-muted-foreground">
                1 hour ago
              </p>
              <button
                className="mt-6 flex w-full items-center gap-6 rounded-2xl border border-border bg-muted/50 px-6 py-5 text-left text-[24px] transition-colors hover:bg-muted"
                type="button"
              >
                <span className="flex size-16 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                  <FileImage size={30} />
                </span>
                Launcher-UIKit.fig
              </button>
            </div>
          </div>
        </article>

        <article className="border-border border-b px-8 py-6">
          <div className="flex gap-6">
            <ActivityAvatar initials="D" />
            <div>
              <p className="text-[24px] leading-tight">
                <strong>Denial</strong>{" "}
                <span className="text-muted-foreground">
                  invites you to review the new design
                </span>
              </p>
              <p className="mt-2 text-[22px] text-muted-foreground">
                3 hours ago
              </p>
            </div>
          </div>
        </article>

        <article className="border-border border-b px-8 py-6">
          <div className="flex gap-6">
            <ActivityAvatar initials="LA" />
            <div className="min-w-0 flex-1">
              <p className="text-[24px] leading-tight">
                <strong>Leslie Alexander</strong>{" "}
                <span className="text-muted-foreground">
                  new tags to Web Redesign
                </span>
              </p>
              <p className="mt-2 text-[22px] text-muted-foreground">
                8 hours ago
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-lg bg-muted px-3 py-1 text-lg">
                  Client-Request
                </span>
                <span className="rounded-lg bg-primary/10 px-3 py-1 text-lg text-primary">
                  Figma
                </span>
                <span className="rounded-lg bg-accent px-3 py-1 text-accent-foreground text-lg">
                  Redesign
                </span>
              </div>
            </div>
          </div>
        </article>

        <article className="px-8 py-6">
          <div className="flex gap-6">
            <ActivityAvatar initials="M" />
            <div>
              <p className="text-[24px] leading-tight">
                <strong>Miya</strong>{" "}
                <span className="text-muted-foreground">
                  invites you to review a file
                </span>
              </p>
              <p className="mt-2 text-[22px] text-muted-foreground">
                10 hours ago
              </p>
            </div>
          </div>
        </article>
      </div>
    </aside>
  );
}
