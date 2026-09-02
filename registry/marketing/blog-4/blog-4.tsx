import { ArrowUpRightIcon } from "lucide-react";

import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export interface Blog4Post {
  category: string;
  date: string;
  description: string;
  href: string;
  title: string;
}

export interface Blog4Props {
  className?: string;
  description?: string;
  posts?: Blog4Post[];
  title?: string;
}

const defaultPosts: Blog4Post[] = [
  {
    category: "Systems",
    date: "Sep 02, 2026",
    description:
      "A practical field guide to making a small component library feel deliberate from the first page to the last.",
    href: "/blog/designing-for-composition",
    title: "Designing for composition, not just components",
  },
  {
    category: "Craft",
    date: "Aug 28, 2026",
    description: "The useful constraints behind a quieter interface.",
    href: "/blog/quiet-interface",
    title: "Make the useful thing easier to notice",
  },
  {
    category: "Engineering",
    date: "Aug 12, 2026",
    description: "What typed props change about the way teams ship UI.",
    href: "/blog/typed-props",
    title: "The interface between design and code",
  },
  {
    category: "Practice",
    date: "Jul 30, 2026",
    description: "A short checklist for a more humane review loop.",
    href: "/blog/review-loop",
    title: "Leave a better trace",
  },
];

export function Blog4({
  title = "Notes from the system",
  description = "Short essays on building interfaces with enough structure to stay coherent and enough room to become your own.",
  posts = defaultPosts,
  className,
}: Blog4Props) {
  const [featured, ...secondary] = posts;

  if (!featured) {
    return null;
  }

  return (
    <MarketingSection className={cn(className)}>
      <section className="border-y px-4 py-12 md:px-8 md:py-20">
        <header className="grid gap-6 border-b pb-10 md:grid-cols-[1fr_18rem] md:items-end">
          <div>
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
              Journal / Issue 04
            </p>
            <h2 className="mt-4 max-w-2xl text-balance font-display-heading text-4xl tracking-tight sm:text-6xl">
              {title}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-6">
            {description}
          </p>
        </header>

        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <a
            className="group border-b py-8 md:border-r md:border-b-0 md:pr-10"
            href={featured.href}
          >
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.16em]">
              {featured.category} · {featured.date}
            </p>
            <h3 className="mt-10 max-w-xl text-balance font-display-heading text-3xl leading-tight tracking-tight transition-colors group-hover:text-muted-foreground sm:text-5xl">
              {featured.title}
            </h3>
            <p className="mt-6 max-w-md text-muted-foreground text-sm leading-6">
              {featured.description}
            </p>
            <span className="mt-10 inline-flex items-center gap-2 text-sm">
              Read the lead essay
              <ArrowUpRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </a>

          <div className="divide-y md:pl-10">
            {secondary.map((post, index) => (
              <a
                className="group grid gap-4 py-6 sm:grid-cols-[2rem_1fr_auto] sm:items-start"
                href={post.href}
                key={post.title}
              >
                <span className="font-mono text-muted-foreground text-xs">
                  0{index + 2}
                </span>
                <span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.16em]">
                    {post.category}
                  </span>
                  <span className="mt-2 block text-balance font-medium text-lg leading-6 transition-colors group-hover:text-muted-foreground">
                    {post.title}
                  </span>
                  <span className="mt-2 block text-muted-foreground text-sm leading-5">
                    {post.description}
                  </span>
                </span>
                <span className="text-muted-foreground text-xs">
                  {post.date}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
