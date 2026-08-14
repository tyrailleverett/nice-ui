import { CopyIcon, UserRoundPlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MembersIllustration() {
  return (
    <div aria-hidden="true" className="relative h-32 w-44">
      <div className="absolute top-2 left-4 size-24 rotate-[-18deg] rounded-2xl border border-border bg-muted/10" />
      <div className="absolute top-5 left-10 size-24 rotate-[-9deg] rounded-2xl border border-border bg-muted/20" />
      <div className="absolute top-8 left-16 flex size-24 rotate-[-1deg] items-center justify-center rounded-2xl border-2 border-border bg-background shadow-sm">
        <UserRoundPlusIcon
          className="size-9 text-muted-foreground"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}

export interface EmptyState4Props {
  className?: string;
  onCopyInviteLink?: () => void;
  onInviteMembers?: () => void;
}

export function EmptyState4({
  className,
  onCopyInviteLink,
  onInviteMembers,
}: EmptyState4Props) {
  return (
    <section
      className={cn(
        "flex min-h-[34rem] w-full flex-col items-center justify-center bg-background px-6 py-16 text-center text-foreground",
        className
      )}
    >
      <MembersIllustration />
      <div className="mt-10 max-w-2xl">
        <h2 className="font-bold font-heading text-3xl tracking-tight sm:text-4xl">
          Invite the first people in
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed sm:text-xl">
          Bring owners, editors, and reviewers into the workspace with a fast
          email invite or one secure share link.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={onInviteMembers} type="button">
          <UserRoundPlusIcon data-icon="inline-start" />
          Invite members
        </Button>
        <Button onClick={onCopyInviteLink} type="button" variant="outline">
          <CopyIcon data-icon="inline-start" />
          Copy invite link
        </Button>
      </div>
    </section>
  );
}
