import {
  ArrowLeftRightIcon,
  BellIcon,
  LineChartIcon,
  UsersIcon,
} from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type Feature7Highlight = {
  icon: ReactNode
  title: string
  description: string
}

export type Feature7Image = {
  src: string
  alt: string
}

export type Feature7Props = {
  title?: ReactNode
  foregroundImage?: Feature7Image
  backgroundImage?: Feature7Image
  highlights?: Feature7Highlight[]
  className?: string
}

const defaultHighlights: Feature7Highlight[] = [
  {
    icon: <ArrowLeftRightIcon className="inline size-4 -translate-y-0.5" />,
    title: "Seamless handoffs.",
    description: "Ownership changes without resetting the relationship.",
  },
  {
    icon: <BellIcon className="inline size-4 -translate-y-0.5" />,
    title: "Proactive alerts.",
    description: "Surface renewals and quiet accounts before they slip.",
  },
  {
    icon: <UsersIcon className="inline size-4 -translate-y-0.5" />,
    title: "Shared timeline.",
    description: "Sales, success, and support work from one account view.",
  },
  {
    icon: <LineChartIcon className="inline size-4 -translate-y-0.5" />,
    title: "Forecast clarity.",
    description: "Leaders see risk and momentum without chasing updates.",
  },
]

export function Feature7({
  title = (
    <>
      <span className="text-foreground">Your stack, connected.</span>
      <br /> Git sync or AI agents, your way.
    </>
  ),
  foregroundImage = {
    src: "https://storage.efferd.com/screen/dashboard-light.webp",
    alt: "Product screenshot",
  },
  backgroundImage = {
    src: "https://storage.efferd.com/screen/dashboard-light.webp",
    alt: "Product screenshot background",
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
          <div className="absolute inset-3 z-1 size-64 rounded-tl-3xl border-t border-l mask-radial-[100%_60%] mask-radial-at-top-left mask-radial-from-65% md:size-96 lg:inset-4" />
          <div className="relative aspect-88/36 min-w-2xl mask-b-from-75% mask-b-to-95%">
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
  )
}
