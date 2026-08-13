import type { ComponentProps } from "react"

import { DecorIcon, type DecorIconProps } from "@/components/decor-icon"
import { cn } from "@/lib/utils"

export type Integrations2Item = {
  src: string
  name: string
  description: string
  isInvertable?: boolean
  decorPosition?: DecorIconProps["position"]
}

export type Integrations2Props = {
  integrations?: Integrations2Item[]
  className?: string
}

const defaultIntegrations: Integrations2Item[] = [
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
    decorPosition: "bottom-left",
  },
  {
    src: "https://storage.efferd.com/logo/supabase.svg",
    name: "Supabase",
    description: "Auth, database, and storage without a custom backend.",
  },
  {
    src: "https://storage.efferd.com/logo/github.svg",
    name: "GitHub",
    description: "Open issues and pull requests next to the same blocks.",
    isInvertable: true,
  },
  {
    src: "https://storage.efferd.com/logo/notion.svg",
    name: "Notion",
    description: "Keep product specs and launch notes in one workspace.",
  },
  {
    src: "https://storage.efferd.com/logo/gmail.svg",
    name: "Gmail",
    description: "Send launch mail from the inbox your team already uses.",
    decorPosition: "top-left",
  },
]

export function Integrations2({
  integrations = defaultIntegrations,
  className,
}: Integrations2Props) {
  return (
    <section className={cn("relative mx-auto max-w-5xl border", className)}>
      <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3">
        {integrations.map((item) => (
          <IntegrationCard integration={item} key={item.name} />
        ))}
      </div>
      <DecorIcon position="top-left" />
      <DecorIcon position="top-right" />
      <DecorIcon position="bottom-left" />
      <DecorIcon position="bottom-right" />
    </section>
  )
}

function IntegrationCard({
  integration,
  className,
  ...props
}: ComponentProps<"div"> & {
  integration: Integrations2Item
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-start gap-4 bg-background p-4 text-start md:p-6 md:even:bg-background/75",
        className
      )}
      {...props}
    >
      <img
        alt=""
        className={cn(
          "pointer-events-none size-8 shrink-0 select-none object-contain",
          integration.isInvertable && "dark:invert"
        )}
        height={32}
        src={integration.src}
        width={32}
      />
      <div className="space-y-1">
        <h3 className="font-semibold">{integration.name}</h3>
        <p className="text-muted-foreground text-xs md:text-sm">
          {integration.description}
        </p>
      </div>
      {integration.decorPosition ? (
        <DecorIcon position={integration.decorPosition} />
      ) : null}
    </div>
  )
}
