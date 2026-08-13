import { ChevronRightIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export interface Blog3Item {
  author: string;
  description: string;
  href: string;
  image: string;
  imageAlt?: string;
  title: string;
}

export interface Blog3Props {
  className?: string;
  description?: string;
  posts?: Blog3Item[];
  readLabel?: string;
  title?: string;
}

const defaultPosts: Blog3Item[] = [
  {
    author: "Ava Mitchell",
    description:
      "How to build a design system that scales with your team and product.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    imageAlt: "Sunlit office interior with glass walls and workstations",
    title: "Design Systems That Scale",
  },
  {
    author: "Liam Carter",
    description:
      "Why color choices change how people feel and act in an interface.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200",
    imageAlt: "Abstract wash of pigment and color",
    title: "The Psychology of Color in UI",
  },
  {
    author: "Sophia Kim",
    description: "The small details that make a product feel alive.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200",
    imageAlt: "Close-up of a phone screen with interface details",
    title: "Microinteractions That Delight",
  },
  {
    author: "Ethan Rodriguez",
    description: "Practical ways to make your UI usable for everyone.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    imageAlt: "People collaborating around a laptop in a bright workspace",
    title: "Accessibility like never before",
  },
  {
    author: "Maya Chen",
    description: "Building a dark theme that feels native, not like a filter.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200",
    imageAlt: "Starlit mountain ridge at night",
    title: "Dark Mode Done Right",
  },
];

export function Blog3({
  title = "Latest Blogs",
  description = "Discover the latest trends and insights in the world of design and technology.",
  readLabel = "Read",
  posts = defaultPosts,
  className,
}: Blog3Props) {
  const featured = posts.slice(0, 2);
  const rest = posts.slice(2);

  return (
    <section className={cn("mx-auto w-full max-w-6xl px-4", className)}>
      <div className="grid gap-px overflow-hidden border bg-border">
        <div className="space-y-2 bg-background px-6 py-8 md:px-8 md:py-10">
          <h2 className="font-semibold text-2xl tracking-wide md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="text-muted-foreground text-sm">{description}</p>
          ) : null}
        </div>
        {featured.length ? (
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
            {featured.map((post) => (
              <BlogCard key={post.title} post={post} readLabel={readLabel} />
            ))}
          </div>
        ) : null}
        {rest.length ? (
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.title} post={post} readLabel={readLabel} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function BlogCard({
  post,
  readLabel,
  className,
  ...props
}: ComponentProps<"a"> & {
  post: Blog3Item;
  readLabel: string;
}) {
  const { title, description, author, href, image, imageAlt } = post;

  return (
    <a
      className={cn(
        "group flex h-full flex-col bg-background p-2 focus-visible:outline-none md:p-3",
        className
      )}
      href={href}
      {...props}
    >
      <div className="flex h-full flex-col rounded-lg border border-transparent p-3 transition-colors group-hover:border-border group-focus-visible:border-border md:p-4">
        <img
          alt={imageAlt ?? title}
          className="mb-4 aspect-video w-full rounded-md object-cover"
          height={180}
          src={image}
          width={320}
        />
        <h3 className="font-semibold text-foreground text-lg md:text-xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-muted-foreground text-sm">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-8 text-muted-foreground text-sm">
          <span>{author}</span>
          <span className="inline-flex items-center gap-0.5">
            {readLabel}
            <ChevronRightIcon aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>
    </a>
  );
}
