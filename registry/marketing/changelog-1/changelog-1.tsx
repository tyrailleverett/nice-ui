import { MarketingSection } from "@/components/marketing-section";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export type Changelog1ChangeType = "Added" | "Improved" | "Fixed";

export interface Changelog1Group {
  items: string[];
  type: Changelog1ChangeType;
}

export interface Changelog1Release {
  date: string;
  groups: Changelog1Group[];
  summary: string;
  version: string;
}

export interface Changelog1Props {
  badge?: string;
  className?: string;
  description?: string;
  releases?: Changelog1Release[];
  title?: string;
}

const defaultReleases: Changelog1Release[] = [
  {
    date: "Jun 18, 2026",
    groups: [
      {
        items: [
          "Command palette now searches across projects, members, and files.",
          "Export any table to CSV from the toolbar.",
        ],
        type: "Added",
      },
      {
        items: [
          "Billing page loads roughly twice as fast on large workspaces.",
          "Clearer empty states across the dashboard.",
        ],
        type: "Improved",
      },
      {
        items: ["Resolved a rare sync error when renaming a workspace."],
        type: "Fixed",
      },
    ],
    summary: "Faster search and a refreshed billing experience.",
    version: "2.4.0",
  },
  {
    date: "May 30, 2026",
    groups: [
      {
        items: [
          "Invite teammates with Admin, Editor, or Viewer roles.",
          "Shared component libraries scoped to a workspace.",
        ],
        type: "Added",
      },
      {
        items: [
          "Dark mode contrast on secondary buttons.",
          "Pagination on the activity feed no longer skips a page.",
        ],
        type: "Fixed",
      },
    ],
    summary: "Team workspaces and role-based access.",
    version: "2.3.0",
  },
  {
    date: "May 12, 2026",
    groups: [
      {
        items: ["Keyboard navigation in dialogs and menus."],
        type: "Improved",
      },
      {
        items: ["A layout shift when toggling the sidebar."],
        type: "Fixed",
      },
    ],
    summary: "Stability and polish.",
    version: "2.2.1",
  },
];

export function Changelog1({
  badge = "Changelog",
  title = "What's new",
  description = "Product updates, improvements, and fixes, shipped regularly.",
  releases = defaultReleases,
  className,
}: Changelog1Props) {
  return (
    <MarketingSection className={className}>
      <section className="flex items-center justify-center bg-background px-6 py-16 text-foreground">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-12">
            <Badge className="mb-4" variant="outline">
              {badge}
            </Badge>
            <h2 className="font-heading font-semibold text-3xl">{title}</h2>
            {description ? (
              <p className="mt-3 text-muted-foreground">{description}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-10">
            {releases.map((release, index) => (
              <div key={release.version}>
                {index > 0 ? <Separator className="mb-10" /> : null}
                <div className="grid gap-x-8 gap-y-5 md:grid-cols-[180px_1fr]">
                  <div className="flex flex-col items-start gap-1.5">
                    <Badge
                      className="font-mono tabular-nums"
                      variant="secondary"
                    >
                      {release.version}
                    </Badge>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {release.date}
                    </span>
                    <p className="mt-1 hidden text-muted-foreground text-sm md:block">
                      {release.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    {release.groups.map((group) => (
                      <div className="flex flex-col gap-2" key={group.type}>
                        <h3 className="font-heading font-semibold text-sm">
                          {group.type}
                        </h3>
                        <ul className="flex flex-col gap-1.5 pl-4.5">
                          {group.items.map((item) => (
                            <li
                              className="list-disc text-muted-foreground text-sm/relaxed marker:text-muted-foreground/40"
                              key={item}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
