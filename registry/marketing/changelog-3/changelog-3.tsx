import { ArrowUpRightIcon } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";
export interface Changelog3Entry {
  date: string;
  description: string;
  title: string;
  version: string;
}
export interface Changelog3Props {
  className?: string;
  entries?: Changelog3Entry[];
  title?: string;
}
const defaultEntries: Changelog3Entry[] = [
  {
    date: "Aug 28, 2026",
    description:
      "New FAQ, footer, logo cloud, and testimonial compositions share the same compact rhythm.",
    title: "Marketing blocks get a sharper edge",
    version: "0.8.0",
  },
  {
    date: "Aug 12, 2026",
    description:
      "Updated content defaults make it easier to see the intended structure before customizing a block.",
    title: "More useful empty states",
    version: "0.7.2",
  },
  {
    date: "Jul 30, 2026",
    description:
      "Keyboard focus, readable contrast, and semantic landmarks are now part of the marketing review checklist.",
    title: "Accessible by default",
    version: "0.7.0",
  },
];
export function Changelog3({
  title = "Recent changes",
  entries = defaultEntries,
  className,
}: Changelog3Props) {
  return (
    <MarketingSection className={className}>
      <section className="grid gap-10 p-4 md:grid-cols-[0.7fr_1.7fr] md:p-8">
        <header className="space-y-3">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Changelog
          </p>
          <h2 className="font-display-heading text-3xl sm:text-4xl">{title}</h2>
          <p className="text-muted-foreground text-sm leading-6">
            A short record of what changed, and why it matters.
          </p>
        </header>
        <div className="divide-y border-y">
          {entries.map((entry) => (
            <article
              className="grid gap-4 py-6 sm:grid-cols-[5rem_1fr_auto] sm:items-start"
              key={entry.version}
            >
              <p className="font-mono text-muted-foreground text-xs">
                {entry.version}
              </p>
              <div>
                <p className="font-medium">{entry.title}</p>
                <p className="mt-2 max-w-xl text-muted-foreground text-sm leading-6">
                  {entry.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <time
                  className="text-muted-foreground text-xs"
                  dateTime={entry.date}
                >
                  {entry.date}
                </time>
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </MarketingSection>
  );
}
