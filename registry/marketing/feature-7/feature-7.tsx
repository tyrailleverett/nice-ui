import {
  ArrowLeftRightIcon,
  BellIcon,
  LineChartIcon,
  UsersIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface Feature7Highlight {
  description: string;
  icon: ReactNode;
  title: string;
}

export interface Feature7Image {
  alt: string;
  src: string;
}

export interface Feature7Props {
  backgroundImage?: Feature7Image;
  className?: string;
  foregroundImage?: Feature7Image;
  highlights?: Feature7Highlight[];
  title?: ReactNode;
}

const defaultHighlights: Feature7Highlight[] = [
  {
    description: "Ownership changes without resetting the relationship.",
    icon: <ArrowLeftRightIcon className="inline size-4 -translate-y-0.5" />,
    title: "Seamless handoffs.",
  },
  {
    description: "Surface renewals and quiet accounts before they slip.",
    icon: <BellIcon className="inline size-4 -translate-y-0.5" />,
    title: "Proactive alerts.",
  },
  {
    description: "Sales, success, and support work from one account view.",
    icon: <UsersIcon className="inline size-4 -translate-y-0.5" />,
    title: "Shared timeline.",
  },
  {
    description: "Leaders see risk and momentum without chasing updates.",
    icon: <LineChartIcon className="inline size-4 -translate-y-0.5" />,
    title: "Forecast clarity.",
  },
];

export function Feature7({
  title = (
    <>
      <span className="text-foreground">Your stack, connected.</span>
      <br /> Git sync or AI agents, your way.
    </>
  ),
  foregroundImage = {
    alt: "Product screenshot",
    src: "https://storage.efferd.com/screen/dashboard-light.webp",
  },
  backgroundImage = {
    alt: "Product screenshot background",
    src: "https://storage.efferd.com/screen/dashboard-light.webp",
  },
  highlights = defaultHighlights,
  className,
}: Feature7Props) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        <h2 className="relative z-10 max-w-4xl text-balance font-medium text-4xl text-muted-foreground tracking-tight lg:text-5xl">
          {title}
        </h2>
        <div className="relative -mx-6 overflow-hidden px-3 pt-3 md:-mx-8">
          <div className="mask-radial-[100%_60%] mask-radial-at-top-left mask-radial-from-65% absolute inset-3 z-1 size-64 rounded-tl-3xl border-t border-l md:size-96 lg:inset-4" />
          <div className="mask-b-from-75% mask-b-to-95% relative aspect-88/36 min-w-2xl">
            <img
              alt={foregroundImage.alt}
              className="absolute inset-0 z-10 size-full object-cover object-top"
              height={1137}
              src={foregroundImage.src}
              width={2797}
            />
            <img
              alt={backgroundImage.alt}
              className="size-full object-cover object-top opacity-75"
              height={1137}
              src={backgroundImage.src}
              width={2797}
            />
          </div>
        </div>
        <div className="mt-12 grid gap-3 *:max-w-xs max-sm:*:not-last:border-b max-sm:*:not-last:pb-3 sm:grid-cols-2 md:mt-16 md:gap-y-6 lg:mt-24 lg:grid-cols-4 lg:gap-6">
          {highlights.map((item) => (
            <p className="text-balance text-muted-foreground" key={item.title}>
              <span className="font-medium text-foreground">
                {item.icon} {item.title}
              </span>{" "}
              {item.description}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
