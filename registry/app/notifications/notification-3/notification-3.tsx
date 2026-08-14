import {
  CircleAlert,
  Clock3,
  GitBranch,
  RotateCcw,
  Triangle,
} from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

function BuildIcon({ index }: { index: number }) {
  if (index === 0) {
    return <Triangle fill="white" />;
  }
  if (index === 1 || index === 4) {
    return <GitBranch />;
  }
  if (index === 2) {
    return <span className="font-bold text-2xl">▮▮</span>;
  }
  return <CircleAlert className="text-muted-foreground" />;
}

export interface Notification3Props {
  className?: string;
}
const builds = [
  [
    "Deploy Preview",
    "feat/status-feed",
    "Building a3f19c2",
    "1m 05s",
    "passed",
  ],
  ["CI Passed", "main", "checks 14 of 14 6b0e441", "1m 42s", "passed"],
  ["Publish", "@acme/ui@3.14.2", "tarball 812 kB registry", "38s", "passed"],
  [
    "E2E Suite",
    "release/3.14",
    "2 of 96 specs failed d90b7ee",
    "4m 05s",
    "failed",
  ],
  ["CI Passed", "fix/contrast", "checks 14 of 14 77c1a08", "1m 12s", "passed"],
] as const;

export function Notification3({ className }: Notification3Props) {
  const [retried, setRetried] = useState(false);
  const retry = useCallback(() => setRetried(true), []);
  return (
    <section
      className={cn(
        "w-full max-w-[764px] overflow-hidden rounded-[24px] border border-border bg-background text-foreground",
        className
      )}
    >
      <header className="flex items-center justify-between border-border border-b px-8 py-6">
        <h2 className="font-medium text-[28px]">Pipeline</h2>
        <span className="flex items-center gap-3 text-muted-foreground text-xl">
          <i className="size-4 rounded-full bg-emerald-500" /> All Green
        </span>
      </header>
      <div>
        {builds.map(([title, branch, detail, duration, status], index) => {
          const failed = status === "failed" && !retried;
          return (
            <article
              className="grid grid-cols-[72px_1fr_auto] items-start gap-5 border-border border-b px-8 py-6"
              key={`${title}-${branch}`}
            >
              <span className="flex size-16 items-center justify-center rounded-2xl border border-border bg-muted">
                <BuildIcon index={index} />
              </span>
              <div>
                <h3 className="text-[23px]">
                  {title}{" "}
                  <span className="text-muted-foreground">{branch}</span>
                </h3>
                <p className="mt-1 text-lg text-muted-foreground">{detail}</p>
                {failed ? (
                  <p className="mt-8 text-destructive text-lg">
                    2 Specs Need Attention
                  </p>
                ) : null}
              </div>
              <div
                className={cn(
                  "flex items-center gap-3 pt-1 text-xl",
                  failed ? "text-destructive" : "text-emerald-500"
                )}
              >
                <span className="size-4 rounded-full bg-current" />
                {failed ? "Failed" : "Passed"}
                <span className="text-muted-foreground">{duration}</span>
                {failed ? (
                  <button
                    className="absolute mt-24 ml-16 rounded-2xl border-8 border-muted bg-background px-4 py-2 text-foreground"
                    onClick={retry}
                    type="button"
                  >
                    <RotateCcw className="mr-2 inline" size={18} />
                    Retry
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
      <footer className="flex items-center justify-between px-8 py-5 text-lg text-muted-foreground">
        <span>
          <Clock3 className="mr-2 inline" size={18} />5 Recent Builds
        </span>
        <button className="hover:text-white" type="button">
          View All
        </button>
      </footer>
    </section>
  );
}
