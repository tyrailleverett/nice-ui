import {
  CpuIcon,
  FingerprintIcon,
  PencilIcon,
  Settings2Icon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

export type Feature3Item = {
  title: string
  icon: ReactNode
  description: string
}

export type Feature3Props = {
  title?: string
  description?: string
  features?: Feature3Item[]
  className?: string
}

const defaultFeatures: Feature3Item[] = [
  {
    title: "Fast",
    icon: <ZapIcon />,
    description: "Ship pages quickly with ready-made marketing blocks.",
  },
  {
    title: "Powerful",
    icon: <CpuIcon />,
    description: "Compose sections that scale from landing pages to product sites.",
  },
  {
    title: "Secure",
    icon: <FingerprintIcon />,
    description: "Accessible, semantic markup with no extra client runtime.",
  },
  {
    title: "Customizable",
    icon: <PencilIcon />,
    description: "Override copy, layout, and tokens to match your brand.",
  },
  {
    title: "Control",
    icon: <Settings2Icon />,
    description: "Own the source. Install once, edit locally, keep shipping.",
  },
  {
    title: "Built for AI",
    icon: <SparklesIcon />,
    description: "Clear props and structure that agents can drop into a page.",
  },
]

export function Feature3({
  title = "Power. Speed. Control.",
  description = "Everything you need to build fast, secure, scalable apps.",
  features = defaultFeatures,
  className,
}: Feature3Props) {
  return (
    <section className={cn("mx-auto w-full max-w-5xl space-y-8", className)}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeatureCard({
  feature,
  className,
  ...props
}: ComponentProps<"div"> & {
  feature: Feature3Item
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background p-6", className)}
      {...props}
    >
      <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">{feature.icon}</div>
      <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
        {feature.description}
      </p>
    </div>
  )
}
