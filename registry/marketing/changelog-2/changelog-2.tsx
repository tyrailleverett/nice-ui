import type { ReactNode } from "react";

import { MarketingSection } from "@/components/marketing-section";

export interface Changelog2Entry {
  content: ReactNode;
  date: string;
  slug: string;
  title: string;
  version?: string;
}

export interface Changelog2Props {
  className?: string;
  description?: string;
  entries?: Changelog2Entry[];
  title?: string;
}

const defaultEntries: Changelog2Entry[] = [
  {
    content: (
      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Major update</h3>
          <p className="text-muted-foreground">
            This release brings several highly requested features and important
            improvements to the platform.
          </p>
        </div>
        <ChangelogGroup
          items={[
            "Toggle between light and dark themes.",
            "Invite team members with role-based permissions.",
            "Export data to CSV and PDF formats.",
            "Receive real-time notifications with webhooks.",
          ]}
          title="New features"
        />
        <ChangelogGroup
          items={[
            "Enhanced performance for large datasets.",
            "Improved mobile responsiveness.",
            "Better error handling and user feedback.",
            "Updated dependencies to the latest versions.",
          ]}
          title="Improvements"
        />
      </div>
    ),
    date: "2024-02-20",
    slug: "feature-update",
    title: "New Features & Improvements",
    version: "v1.1.0",
  },
  {
    content: (
      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Security update</h3>
          <p className="text-muted-foreground">
            Important security improvements and performance optimizations keep
            your workspace dependable as it grows.
          </p>
        </div>
        <ChangelogGroup
          items={[
            "Updated authentication token handling.",
            "Enhanced input validation across all forms.",
            "Improved session management.",
            "Added rate limiting for API endpoints.",
          ]}
          title="Security"
        />
        <ChangelogGroup
          items={[
            "Reduced bundle size by 15%.",
            "Optimized database queries.",
            "Improved caching strategies.",
            "Faster page load times.",
          ]}
          title="Performance"
        />
      </div>
    ),
    date: "2024-01-15",
    slug: "initial-launch",
    title: "Initial Launch",
    version: "v1.0.0",
  },
];

export function Changelog2({
  title = "Changelog",
  description = "Stay up to date with the latest features, improvements, and fixes.",
  entries = defaultEntries,
  className,
}: Changelog2Props) {
  return (
    <MarketingSection className={className}>
      <div className="border-border border-r border-l">
        <header className="flex flex-col items-center justify-center border-border border-b px-6 py-16 text-center md:py-24">
          <h2 className="font-display-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          ) : null}
        </header>

        <div>
          {entries.map((entry) => (
            <article
              className="border-border border-b last:border-b-0"
              key={entry.slug}
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                <aside className="border-border border-b bg-background px-6 py-8 md:col-span-4 md:border-r md:border-b-0 md:py-12 lg:col-span-3">
                  <div className="flex flex-col gap-2 md:sticky md:top-24">
                    <time
                      className="font-medium text-muted-foreground text-sm"
                      dateTime={entry.date}
                    >
                      {formatDate(entry.date)}
                    </time>
                    {entry.version ? (
                      <span className="inline-flex w-fit items-center rounded-sm bg-primary px-2.5 py-0.5 font-medium text-primary-foreground text-xs">
                        {entry.version}
                      </span>
                    ) : null}
                  </div>
                </aside>
                <div className="px-6 py-8 md:col-span-8 md:py-12 lg:col-span-9">
                  <h3 className="mb-6 text-2xl text-foreground">
                    {entry.title}
                  </h3>
                  {entry.content}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MarketingSection>
  );
}

function ChangelogGroup({ items, title }: { items: string[]; title: string }) {
  return (
    <section className="space-y-3">
      <h4 className="font-medium text-base">{title}</h4>
      <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}
