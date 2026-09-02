import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckIcon,
  CircleHelpIcon,
  FolderPlusIcon,
  LayoutDashboardIcon,
  PlusIcon,
  Settings2Icon,
  UsersIcon,
} from "lucide-react";

import { BrandMark } from "@/components/app/onboarding-shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const setupSteps = [
  {
    complete: true,
    detail: "Give your team a shared home.",
    id: "name-workspace",
    label: "Name your workspace",
  },
  {
    complete: false,
    detail: "Invite the people you work with.",
    id: "invite-teammates",
    label: "Invite teammates",
  },
  {
    complete: false,
    detail: "Create a place for your first project.",
    id: "create-project",
    label: "Create a project",
  },
] as const;

export interface Onboarding6Props {
  className?: string;
  onCreateProject?: () => void;
  onInviteTeammates?: () => void;
  onOpenHelp?: () => void;
}

export function Onboarding6({
  className,
  onCreateProject,
  onInviteTeammates,
  onOpenHelp,
}: Onboarding6Props) {
  return (
    <main className={cn("min-h-screen bg-muted/20 text-foreground", className)}>
      <header className="flex h-16 items-center justify-between border-border border-b bg-background px-5 sm:px-8">
        <BrandMark />
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <span className="hidden sm:inline">New workspace</span>
          <button
            aria-label="Open help"
            className="grid size-9 place-items-center rounded-lg border border-border hover:bg-muted"
            onClick={onOpenHelp}
            type="button"
          >
            <CircleHelpIcon className="size-4" />
          </button>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="hidden border-border border-r bg-background p-5 lg:block">
          <p className="px-3 text-muted-foreground text-xs uppercase tracking-[0.16em]">
            Workspace
          </p>
          <nav aria-label="Workspace navigation" className="mt-4 grid gap-1">
            <a
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2.5 font-medium text-sm"
              href="#setup"
            >
              <LayoutDashboardIcon className="size-4" />
              Getting started
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground text-sm hover:bg-muted"
              href="#projects"
            >
              <FolderPlusIcon className="size-4" />
              Projects
            </a>
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground text-sm hover:bg-muted"
              href="#members"
            >
              <UsersIcon className="size-4" />
              Members
            </a>
          </nav>
          <div className="mt-auto pt-12">
            <a
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground text-sm hover:bg-muted"
              href="#settings"
            >
              <Settings2Icon className="size-4" />
              Settings
            </a>
          </div>
        </aside>

        <section className="px-5 py-8 sm:px-10 sm:py-12" id="setup">
          <div className="mx-auto max-w-3xl">
            <p className="font-medium text-primary text-sm">
              Welcome to Nice UI
            </p>
            <h1 className="mt-2 font-semibold text-3xl tracking-[-0.04em] sm:text-4xl">
              Let’s get your workspace ready.
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              A few small steps now will make your first project easier to find
              and share.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-background p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-medium">Your setup checklist</h2>
                  <p className="mt-1 text-muted-foreground text-sm">
                    1 of 3 complete
                  </p>
                </div>
                <span className="text-muted-foreground text-sm">33%</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-1/3 rounded-full bg-primary" />
              </div>
              <div className="mt-6 grid gap-2">
                {setupSteps.map((step) => (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-border px-3 py-3"
                    key={step.label}
                  >
                    <span
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full border",
                        step.complete
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {step.complete ? (
                        <CheckIcon className="size-4" />
                      ) : (
                        <span className="text-xs">•</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block font-medium text-sm",
                          step.complete && "text-muted-foreground line-through"
                        )}
                      >
                        {step.label}
                      </span>
                      <span className="block text-muted-foreground text-xs">
                        {step.detail}
                      </span>
                    </span>
                    {!step.complete && step.id === "invite-teammates" ? (
                      <Button
                        onClick={onInviteTeammates}
                        size="sm"
                        variant="outline"
                      >
                        Invite
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-8 rounded-xl border border-border border-dashed bg-background/60 px-6 py-12 text-center"
              id="projects"
            >
              <div className="mx-auto grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground">
                <FolderPlusIcon className="size-5" />
              </div>
              <h2 className="mt-4 font-medium text-lg">No projects yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-muted-foreground text-sm">
                Create your first project to start turning ideas into work your
                team can see.
              </p>
              <Button className="mt-5" onClick={onCreateProject} type="button">
                <PlusIcon data-icon="inline-start" />
                Create a project
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </section>

        <aside className="border-border border-t bg-background p-5 lg:border-t-0 lg:border-l lg:p-6">
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <BookOpenIcon className="size-5 text-primary" />
            <h2 className="mt-4 font-medium">Need a hand?</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Learn how teams organize projects and keep everyone aligned.
            </p>
            <Button
              className="mt-4 w-full"
              onClick={onOpenHelp}
              variant="outline"
            >
              Read the quickstart
            </Button>
          </div>
          <p className="mt-5 text-muted-foreground text-xs">
            You can finish setup later from Getting started.
          </p>
        </aside>
      </div>
    </main>
  );
}
