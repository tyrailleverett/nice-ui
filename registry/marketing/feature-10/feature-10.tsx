import { CalendarCheckIcon, ChevronRightIcon, TargetIcon } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Feature10Action = {
  href?: string
  label: string
}

export type Feature10Item = {
  icon: ReactNode
  title: string
  description: string
}

export type Feature10Screenshot = {
  src: string
  alt: string
}

export type Feature10Props = {
  title?: string
  cta?: Feature10Action | null
  items?: Feature10Item[]
  screenshot?: Feature10Screenshot
  className?: string
}

const defaultItems: Feature10Item[] = [
  {
    icon: <TargetIcon className="size-5" />,
    title: "Code Generation",
    description:
      "Describe the code you want and generate it. From boilerplate to business logic.",
  },
  {
    icon: <CalendarCheckIcon className="size-5" />,
    title: "Code Review",
    description:
      "Get instant feedback on best practices, performance, and maintainability.",
  },
]

export function Feature10({
  title = "The AI coding assistant that helps you write code faster",
  cta = { href: "#", label: "Learn more" },
  items = defaultItems,
  screenshot = {
    src: "https://storage.efferd.com/screen/dashboard-light.webp",
    alt: "App screen",
  },
  className,
}: Feature10Props) {
  return (
    <section className={cn(className)}>
      <div className="bg-muted/50 py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <h2 className="text-balance font-semibold text-4xl text-foreground">
                {title}
              </h2>
              {cta ? (
                cta.href ? (
                  <Button asChild className="mt-8 pr-2" variant="outline">
                    <a href={cta.href}>
                      {cta.label}
                      <ChevronRightIcon className="size-4 opacity-50" />
                    </a>
                  </Button>
                ) : (
                  <Button className="mt-8 pr-2" type="button" variant="outline">
                    {cta.label}
                    <ChevronRightIcon className="size-4 opacity-50" />
                  </Button>
                )
              ) : null}
            </div>

            <div className="space-y-6 md:col-span-3 md:space-y-10">
              {items.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="font-semibold text-foreground text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-balance text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative -mx-12 mt-16 px-12">
            <div className="relative mx-auto overflow-hidden rounded-xl border border-transparent bg-background shadow-lg shadow-black/10 ring-1 ring-black/10">
              <img
                alt={screenshot.alt}
                className="w-full"
                height={1842}
                src={screenshot.src}
                width={2880}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
