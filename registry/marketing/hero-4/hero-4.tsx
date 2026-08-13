import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Hero4Action {
  href?: string;
  label: string;
}

export interface Hero4Announcement {
  eyebrow?: string;
  href?: string;
  label: string;
}

export interface Hero4Image {
  alt: string;
  src: string;
}

export interface Hero4Logo {
  alt: string;
  src: string;
}

export interface Hero4Props {
  announcement?: Hero4Announcement | null;
  background?: Hero4Image;
  className?: string;
  description?: string;
  logos?: Hero4Logo[];
  primaryCta?: Hero4Action | null;
  screenshot?: Hero4Image;
  title?: string;
}

const defaultLogos: Hero4Logo[] = [
  {
    alt: "Vercel",
    src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
  },
  {
    alt: "Supabase",
    src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
  },
  {
    alt: "OpenAI",
    src: "https://storage.efferd.com/logo/openai-wordmark.svg",
  },
  {
    alt: "GitHub",
    src: "https://storage.efferd.com/logo/github-wordmark.svg",
  },
  {
    alt: "Claude",
    src: "https://storage.efferd.com/logo/claude-wordmark.svg",
  },
  {
    alt: "Clerk",
    src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
  },
];

export function Hero4({
  announcement = {
    eyebrow: "New",
    href: "#",
    label: "Introducing Nice UI 1.0",
  },
  title = "Agentic Creative canvas",
  description = "Modern websites and applications that look and feel the way you mean it.",
  primaryCta = { href: "#", label: "Get Started" },
  screenshot = {
    alt: "Product dashboard",
    src: "https://storage.efferd.com/screen/dashboard-light.webp",
  },
  background = {
    alt: "",
    src: "https://images.unsplash.com/photo-1772037440088-2ef162671434?q=80&w=1313&auto=format&fit=crop",
  },
  logos = defaultLogos,
  className,
}: Hero4Props) {
  return (
    <section className={cn("overflow-hidden", className)}>
      <div className="relative pt-24 lg:pt-40">
        <div className="space-y-12 md:space-y-16">
          <div className="relative mx-auto max-w-7xl px-6">
            {announcement ? (
              <a
                className="flex w-fit items-center gap-2 font-medium"
                href={announcement.href ?? "#"}
              >
                {announcement.eyebrow ? (
                  <span>{announcement.eyebrow}</span>
                ) : null}
                <span className="text-muted-foreground">
                  {announcement.label}
                </span>
                <ArrowRightIcon className="size-3.5" />
              </a>
            ) : null}

            <div className="mt-8 grid items-end gap-4 md:grid-cols-2 md:gap-6">
              <h1 className="text-balance font-heading font-medium text-5xl tracking-tight md:text-6xl xl:text-7xl">
                {title}
              </h1>
              <div className="mx-auto flex max-w-md flex-col gap-6">
                {description ? (
                  <p className="text-balance text-lg text-muted-foreground">
                    {description}
                  </p>
                ) : null}
                {primaryCta ? (
                  <Button asChild={Boolean(primaryCta.href)} className="w-fit">
                    {primaryCta.href ? (
                      <a href={primaryCta.href}>{primaryCta.label}</a>
                    ) : (
                      primaryCta.label
                    )}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl max-xl:px-2">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted md:aspect-5/3 lg:aspect-video">
              <div className="before:mask-radial-[100%_60%] before:mask-radial-from-65% before:mask-radial-at-top-left absolute top-4 left-4 z-10 min-w-4xl rounded-2xl p-2 shadow-lg ring ring-foreground/10 before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-foreground/10 before:border-t before:border-l lg:top-16 lg:left-16 lg:min-w-5xl xl:min-w-7xl">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-1 rounded-2xl bg-foreground/2"
                />
                <img
                  alt={screenshot.alt}
                  className="relative aspect-15/8 rounded-2xl bg-background"
                  height={1440}
                  src={screenshot.src}
                  width={2700}
                />
              </div>
              <img
                alt={background.alt}
                className="size-full rotate-180 rounded-3xl object-cover object-bottom"
                height={1000}
                src={background.src}
                width={1313}
              />
            </div>
          </div>

          {logos.length ? (
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-8 px-6 pb-16">
              {logos.map((logo) => (
                <img
                  alt={logo.alt}
                  className="pointer-events-none h-5 w-auto select-none dark:brightness-0 dark:invert"
                  height={20}
                  key={logo.alt}
                  src={logo.src}
                  width={80}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
