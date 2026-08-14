import { BlocksIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ProjectIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="h-32 w-80 max-w-full"
      viewBox="0 0 320 128"
    >
      <path
        className="fill-none stroke-border"
        d="M32 96h256M32 64h256M32 32h256M80 16v96M160 16v96M240 16v96"
        strokeWidth="1"
      />
      <path
        className="fill-muted/20 stroke-muted-foreground"
        d="m112 65 48-28 48 28-48 28Z"
        strokeWidth="1.5"
      />
      <path
        className="fill-none stroke-muted-foreground"
        d="M112 65v28l48 28V93M208 65v28l-48 28M160 37v28"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export interface EmptyState2Props {
  className?: string;
  onExploreTemplates?: () => void;
  onNewProject?: () => void;
}

export function EmptyState2({
  className,
  onExploreTemplates,
  onNewProject,
}: EmptyState2Props) {
  return (
    <section
      className={cn(
        "flex min-h-[34rem] w-full flex-col items-center justify-center bg-background px-6 py-16 text-center text-foreground",
        className
      )}
    >
      <ProjectIllustration />
      <div className="mt-10 max-w-xl">
        <h2 className="font-bold font-heading text-3xl tracking-tight sm:text-4xl">
          No projects to show
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed sm:text-xl">
          Start a project from scratch or pick a template to launch your first
          workspace and begin tracking tasks, goals, and progress.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={onNewProject} type="button">
          <PlusIcon data-icon="inline-start" />
          New project
        </Button>
        <Button onClick={onExploreTemplates} type="button" variant="outline">
          <BlocksIcon data-icon="inline-start" />
          Explore templates
        </Button>
      </div>
    </section>
  );
}
