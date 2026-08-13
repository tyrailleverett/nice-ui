import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Integrations1Item = {
  src: string
  name: string
  description: string
  isInvertable?: boolean
}

export type Integrations1Action = {
  href?: string
  label: string
}

export type Integrations1Props = {
  integrations?: Integrations1Item[]
  viewAll?: Integrations1Action
  className?: string
}

const defaultIntegrations: Integrations1Item[] = [
  {
    src: "https://storage.efferd.com/logo/vercel.svg",
    name: "Vercel",
    description: "Preview every commit and ship the marketing site from git.",
    isInvertable: true,
  },
  {
    src: "https://storage.efferd.com/logo/openai.svg",
    name: "OpenAI",
    description: "Drop models into onboarding, search, and support flows.",
    isInvertable: true,
  },
  {
    src: "https://storage.efferd.com/logo/supabase.svg",
    name: "Supabase",
    description: "Auth, database, and storage without a custom backend.",
  },
  {
    src: "https://storage.efferd.com/logo/notion.svg",
    name: "Notion",
    description: "Keep product specs and launch notes in one workspace.",
  },
]

export function Integrations1({
  integrations = defaultIntegrations,
  viewAll = { href: "#", label: "View all integrations" },
  className,
}: Integrations1Props) {
  return (
    <section
      className={cn(
        "mx-auto grid max-w-5xl gap-1 overflow-hidden rounded-md bg-secondary p-1 sm:grid-cols-2 lg:grid-cols-4 dark:bg-secondary/50",
        className
      )}
    >
      {integrations.map((item) => (
        <div
          className="flex flex-col justify-between gap-2 rounded-md bg-background p-6 shadow-sm"
          key={item.name}
        >
          <img
            alt=""
            className={cn(
              "pointer-events-none size-8 shrink-0 select-none object-contain",
              item.isInvertable && "dark:invert"
            )}
            height={32}
            src={item.src}
            width={32}
          />
          <div className="space-y-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              {item.description}
            </p>
          </div>
        </div>
      ))}
      {viewAll ? (
        <div className="relative flex items-center justify-center p-1 sm:col-span-2 lg:col-span-4">
          {viewAll.href ? (
            <Button asChild className="text-xs" size="sm" variant="link">
              <a href={viewAll.href}>
                {viewAll.label}
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </Button>
          ) : (
            <Button className="text-xs" size="sm" type="button" variant="link">
              {viewAll.label}
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          )}
        </div>
      ) : null}
    </section>
  )
}
