import type { ComponentProps } from "react";

import { FullWidthDivider } from "@/components/full-width-divider";
import { cn } from "@/lib/utils";

export interface Blog2Item {
  author: string;
  category: string;
  date: string;
  description: string;
  href: string;
  title: string;
}

export interface Blog2Props {
  className?: string;
  description?: string;
  posts?: Blog2Item[];
  title?: string;
}

const defaultPosts: Blog2Item[] = [
  {
    author: "Sarah Chen",
    category: "Design",
    date: "May 20 2025",
    description:
      "We dive deep into modern UI/UX fundamentals and explore how small changes can make a massive impact on user retention.",
    href: "#",
    title: "The New Design Principles for Modern Web Apps",
  },
  {
    author: "Mike Allyn",
    category: "Design",
    date: "Aug 14 2025",
    description:
      "In a world of instant gratification, we explore the beauty of thoughtful, long-form content and meaningful connections over time.",
    href: "#",
    title: "Letter Club: An Ode to the Slow Web",
  },
  {
    author: "Jessica Doi",
    category: "Productivity",
    date: "Sep 19 2025",
    description:
      "Taking a break is work. Learn how simple rituals like a morning coffee can boost your creativity and productivity.",
    href: "#",
    title: "Carve Out Space for Opportunity and Coffee",
  },
  {
    author: "Tom Cook",
    category: "Design",
    date: "Oct 12 2025",
    description:
      "A comprehensive guide to leveraging Shadcn UI to build accessible, customizable, and beautiful user interfaces with incredible speed.",
    href: "#",
    title: "Building Modern Applications with Shadcn UI Components",
  },
  {
    author: "David Park",
    category: "Design",
    date: "Nov 23 2025",
    description:
      "How designers and developers can collaborate more effectively to bridge the gap between creative vision and technical implementation.",
    href: "#",
    title: "Fesgin: Bridging The Gap Between Design and Code",
  },
  {
    author: "Emma Wilson",
    category: "Minimalism",
    date: "Dec 05 2025",
    description:
      "Discover how minimalism in design leads to clearer communication and a more intuitive user experience, focusing on what matters.",
    href: "#",
    title: "The Art of Simplicity in User Interface Design",
  },
  {
    author: "Chris Martin",
    category: "Engineering",
    date: "Jan 18 2026",
    description:
      "We discuss techniques for improving web performance, from lazy loading to code splitting, ensuring your application runs smoothly.",
    href: "#",
    title: "Why Web Performance Matters For Your Business Growth",
  },
  {
    author: "Olivia Kim",
    category: "Lifestyle",
    date: "Feb 02 2026",
    description:
      "Strategies for maintaining a healthy relationship with digital tools, setting boundaries, and ensuring technology serves us rather than consumes us.",
    href: "#",
    title: "Practicing Digital Well-being in an Always-On World",
  },
];

export function Blog2({
  title = "Latest Blogs",
  description = "Discover the latest trends and insights in the world of design and technology.",
  posts = defaultPosts,
  className,
}: Blog2Props) {
  return (
    <section
      className={cn("mx-auto w-full max-w-5xl py-4 lg:border-x", className)}
    >
      <div className="space-y-2 px-4 py-8 md:py-12">
        <h2 className="font-display-heading text-2xl md:text-4xl">{title}</h2>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      <div className="relative grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
        <FullWidthDivider contained position="top" />
        {posts.map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
        <FullWidthDivider contained position="bottom" />
      </div>
    </section>
  );
}

function BlogCard({
  post,
  className,
  ...props
}: ComponentProps<"a"> & {
  post: Blog2Item;
}) {
  const { title, date, description, category, author, href } = post;

  return (
    <a
      className={cn(
        "group w-full bg-background px-6 py-12 text-muted-foreground hover:cursor-pointer hover:text-foreground focus-visible:text-foreground focus-visible:outline-none active:bg-accent md:px-8 active:dark:bg-accent/50",
        className
      )}
      href={href}
      {...props}
    >
      <h3 className="mb-3 line-clamp-2 font-medium text-foreground text-lg md:text-xl">
        {title}
      </h3>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-muted-foreground text-xs group-hover:text-foreground">
          {category}
        </span>
        <div className="inline-flex size-1 rounded-full bg-muted-foreground" />
        <span className="text-muted-foreground text-xs group-hover:text-foreground">
          {date}
        </span>
      </div>
      <p className="mb-8 line-clamp-3 text-muted-foreground text-sm tracking-wide group-hover:text-foreground">
        {description}
      </p>
      <div className="flex items-center gap-1.5">
        by
        <span className="font-medium font-mono text-foreground/80 text-xs group-hover:text-foreground md:text-sm">
          {author}
        </span>
      </div>
    </a>
  );
}
