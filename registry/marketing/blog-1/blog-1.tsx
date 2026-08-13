import type { ComponentProps } from "react";

import { FullWidthDivider } from "@/components/full-width-divider";
import { cn } from "@/lib/utils";

export interface Blog1Item {
  date: string;
  description: string;
  href: string;
  title: string;
}

export interface Blog1Props {
  className?: string;
  description?: string;
  posts?: Blog1Item[];
  title?: string;
}

const defaultPosts: Blog1Item[] = [
  {
    date: "May 20 2025",
    description:
      "What everyone new to the field should know, and how we can help.",
    href: "#",
    title: "The New Design",
  },
  {
    date: "Aug 14 2025",
    description: "An ode to the slow web.",
    href: "#",
    title: "Letter Club",
  },
  {
    date: "Sep 19 2025",
    description: "Carve space out for opportunity.",
    href: "#",
    title: "Have the Coffee",
  },
  {
    date: "Oct 12 2025",
    description: "Building modern applications with reusable components.",
    href: "#",
    title: "Shadcn UI",
  },
  {
    date: "Nov 23 2025",
    description: "Exploring the intersection of design and development.",
    href: "#",
    title: "Fesgin",
  },
];

export function Blog1({
  title = "Latest Blogs",
  description = "Discover the latest trends and insights in the world of design and technology.",
  posts = defaultPosts,
  className,
}: Blog1Props) {
  return (
    <section
      className={cn(
        "mx-auto flex w-full max-w-3xl flex-col justify-start md:border-x",
        className
      )}
    >
      <div className="space-y-2 px-4 py-8 md:py-12">
        <h2 className="font-semibold text-2xl tracking-wide md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>

      <div className="relative">
        <FullWidthDivider position="top" />
        <div className="divide-y">
          {posts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
        <FullWidthDivider position="bottom" />
      </div>
    </section>
  );
}

function BlogCard({
  post,
  className,
  ...props
}: ComponentProps<"a"> & {
  post: Blog1Item;
}) {
  const { title, date, description, href } = post;

  return (
    <a
      className={cn(
        "group flex h-24 w-full flex-col justify-center gap-y-1 p-4 hover:cursor-pointer hover:bg-accent/30 focus-visible:bg-accent/30 focus-visible:outline-none active:bg-accent dark:active:bg-accent/50",
        className
      )}
      href={href}
      {...props}
    >
      <div className="relative flex items-end justify-center gap-2">
        <h3 className="whitespace-nowrap font-medium text-foreground text-lg md:text-xl">
          {title}
        </h3>
        <span className="mb-1.5 w-full border-b-2 border-dashed" />
        <span className="whitespace-nowrap font-mono text-muted-foreground text-xs uppercase group-hover:text-foreground md:text-sm">
          {date}
        </span>
      </div>
      <div className="max-w-sm text-muted-foreground text-sm group-hover:text-foreground md:max-w-full md:text-base">
        {description}
      </div>
    </a>
  );
}
