import { FileImage, FileText, ImagePlus, Send, X } from "lucide-react";
import { type ChangeEvent, useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
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
    <Avatar className={cn("size-16 border border-border", className)}>
      <AvatarFallback className="bg-muted font-semibold text-foreground text-lg">
        {initials}
      </AvatarFallback>
    </Avatar>
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
      <Button
        className={className}
        onClick={reopenActivity}
        type="button"
        variant="outline"
      >
        Open activity
      </Button>
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
        <Button
          aria-label="Close activity"
          onClick={closeActivity}
          size="icon"
          type="button"
          variant="ghost"
        >
          <X />
        </Button>
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
                <InputGroup className="mt-7 h-auto">
                  <InputGroupInput
                    aria-label="Reply to Joe Lincoln"
                    className="h-auto py-4 text-[22px]"
                    onChange={updateReply}
                    placeholder="Reply"
                    type="text"
                    value={reply}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton aria-label="Attach image" size="icon-sm">
                      <ImagePlus />
                    </InputGroupButton>
                    {reply ? (
                      <InputGroupButton aria-label="Send reply" size="icon-sm">
                        <Send />
                      </InputGroupButton>
                    ) : null}
                  </InputGroupAddon>
                </InputGroup>
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
              <Button
                className="mt-6 h-auto gap-3 rounded-xl bg-muted px-3 py-2 text-[22px]"
                type="button"
                variant="ghost"
              >
                <span className="flex size-8 items-center justify-center rounded-md bg-destructive font-bold text-destructive-foreground text-xs">
                  pdf
                </span>
                <FileText />
                invoices.pdf
              </Button>
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
              <Button
                className="mt-6 h-auto w-full justify-start gap-6 rounded-2xl px-6 py-5 text-[24px]"
                type="button"
                variant="outline"
              >
                <span className="flex size-16 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                  <FileImage />
                </span>
                Launcher-UIKit.fig
              </Button>
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
                <Badge className="px-3 py-1 text-lg" variant="secondary">
                  Client-Request
                </Badge>
                <Badge className="bg-primary/10 px-3 py-1 text-lg text-primary">
                  Figma
                </Badge>
                <Badge className="px-3 py-1 text-lg" variant="outline">
                  Redesign
                </Badge>
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
