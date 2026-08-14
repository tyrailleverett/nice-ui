import {
  Check,
  CheckCheck,
  Download,
  Paperclip,
  Smile,
  UserRoundPlus,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Notification1Props {
  className?: string;
}

function InitialsAvatar({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <Avatar className={cn("size-9 border-2 border-background", className)}>
      <AvatarFallback className="bg-transparent font-semibold text-background text-xs">
        {children}
      </AvatarFallback>
    </Avatar>
  );
}

export function Notification1({ className }: Notification1Props) {
  const [open, setOpen] = useState(true);
  const [approved, setApproved] = useState(false);
  const showNotifications = useCallback(() => setOpen(true), []);
  const closeNotifications = useCallback(() => setOpen(false), []);
  const approve = useCallback(() => setApproved(true), []);

  if (!open) {
    return (
      <Button
        className={cn("rounded-full", className)}
        onClick={showNotifications}
        type="button"
        variant="outline"
      >
        Show notifications
      </Button>
    );
  }

  return (
    <section
      aria-label="Notifications"
      className={cn(
        "w-full max-w-[832px] overflow-hidden rounded-[28px] border border-border bg-background text-foreground shadow-2xl",
        className
      )}
    >
      <header className="flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-[32px] tracking-[-0.04em]">
            Notifications
          </h2>
          <span className="flex size-8 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-sm">
            3
          </span>
        </div>
        <div className="flex items-center gap-7">
          <Button
            aria-label="Mark all as read"
            size="icon"
            type="button"
            variant="ghost"
          >
            <CheckCheck />
          </Button>
          <Button
            aria-label="Close notifications"
            onClick={closeNotifications}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X />
          </Button>
        </div>
      </header>

      <div className="relative">
        <article className="px-10 pt-8 pb-7">
          <div className="flex gap-4">
            <InitialsAvatar className="bg-primary">S</InitialsAvatar>
            <div className="min-w-0 text-[24px] leading-[1.45]">
              <p>
                <span className="text-muted-foreground">@sarah_smith</span>{" "}
                mentioned you in{" "}
                <span className="text-muted-foreground">#PR-1024</span>
              </p>
              <p className="text-muted-foreground">
                "Can you review the changes?"
              </p>
              <p className="mt-3 text-[20px] text-muted-foreground">2m ago</p>
            </div>
          </div>
        </article>

        <article className="border-border border-t px-10 py-7">
          <div className="flex gap-4">
            <span className="mt-2 size-3 shrink-0 rounded-full bg-foreground" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4">
                <span className="flex size-7 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
                  <Check size={17} />
                </span>
                <h3 className="font-medium text-[25px]">
                  {approved ? "Approved" : "Pending approval"}
                </h3>
              </div>
              <p className="mt-2 text-[24px] text-muted-foreground leading-[1.35]">
                Design System v2.0 release requires your approval before
                deployment.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button
                  className="rounded-xl text-[21px]"
                  onClick={approve}
                  type="button"
                >
                  Approve
                </Button>
                <Button
                  className="rounded-xl text-[21px]"
                  type="button"
                  variant="outline"
                >
                  Review
                </Button>
              </div>
              <div className="mt-5 flex items-center gap-4 text-[20px] text-muted-foreground">
                <span>5m ago</span>
                <span className="rounded-xl border border-border bg-muted px-3 py-1">
                  Priority{" "}
                  <b className="ml-3 font-normal text-amber-500">High</b>
                </span>
              </div>
            </div>
          </div>
        </article>

        <article className="border-border border-t px-10 py-7">
          <div className="flex gap-4">
            <span className="mt-2 size-3 shrink-0 rounded-full bg-foreground" />
            <InitialsAvatar className="bg-secondary">M</InitialsAvatar>
            <div className="min-w-0">
              <h3 className="text-[25px]">
                <span className="text-muted-foreground">@maverick</span> shared
              </h3>
              <p className="mt-2 text-[24px] text-muted-foreground">
                Project Timeline
              </p>
              <Button
                className="mt-5 h-auto rounded-full px-3 py-1 text-[21px]"
                type="button"
                variant="outline"
              >
                <Paperclip data-icon="inline-start" /> project-plan.pdf{" "}
                <span className="text-muted-foreground">(2mb)</span>
                <Download className="ml-4" />
              </Button>
              <p className="mt-5 text-[20px] text-muted-foreground">15m ago</p>
            </div>
          </div>
        </article>

        <article className="border-border border-t px-10 py-7">
          <div className="flex gap-4">
            <span className="mt-2 size-3 shrink-0 rounded-full bg-foreground" />
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-violet-500 text-violet-500">
              <Check size={17} />
            </span>
            <div>
              <h3 className="text-[25px]">Task assigned to you</h3>
              <p className="mt-2 text-[24px] text-muted-foreground leading-[1.35]">
                Implement user authentication flow for the mobile app.
              </p>
              <div className="mt-5 flex items-center gap-4 text-[20px] text-muted-foreground">
                <span>30m ago</span>
                <span className="rounded-xl border border-border bg-muted px-3 py-1">
                  Due{" "}
                  <b className="ml-3 font-normal text-destructive">Tomorrow</b>
                </span>
              </div>
            </div>
          </div>
        </article>

        <article className="border-border border-t px-10 py-7">
          <div className="flex gap-4">
            <UserRoundPlus
              className="mt-1 shrink-0 text-emerald-500"
              size={28}
            />
            <div>
              <h3 className="text-[25px]">4 people joined your workspace</h3>
              <p className="mt-2 text-[24px] text-muted-foreground">
                Sarah, Mike, Emma and James just joined ReUI Pro.
              </p>
              <div className="mt-5 flex -space-x-2">
                <InitialsAvatar className="bg-primary">S</InitialsAvatar>
                <InitialsAvatar className="bg-secondary">M</InitialsAvatar>
                <InitialsAvatar className="bg-accent">E</InitialsAvatar>
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-muted text-sm">
                  +1
                </span>
              </div>
              <p className="mt-3 text-[20px] text-muted-foreground">45m ago</p>
            </div>
          </div>
        </article>

        <article className="border-border border-t px-10 py-7">
          <div className="flex items-center gap-4">
            <Smile className="text-violet-500" size={28} />
            <h3 className="text-[25px]">Reactions on your comment</h3>
            <span className="ml-auto rounded-lg border border-border px-2">
              +5
            </span>
          </div>
        </article>
        <div className="pointer-events-none absolute top-0 right-1 h-[390px] w-3 rounded-full bg-muted" />
      </div>
    </section>
  );
}
