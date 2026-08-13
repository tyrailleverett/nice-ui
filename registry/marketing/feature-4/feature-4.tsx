import {
  ArrowLeftRightIcon,
  BellIcon,
  LineChartIcon,
  UsersIcon,
} from "lucide-react"
import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type Feature4Highlight = {
  icon: ReactNode
  title: string
  description: string
}

export type Feature4Props = {
  title?: ReactNode
  pipelineTitle?: ReactNode
  pipelineDescription?: string
  signalsTitle?: ReactNode
  signalsDescription?: string
  highlights?: Feature4Highlight[]
  className?: string
}

const defaultHighlights: Feature4Highlight[] = [
  {
    icon: <ArrowLeftRightIcon className="inline size-4 -translate-y-0.5" />,
    title: "Pipeline visibility.",
    description: "See every open deal and stage in one workspace.",
  },
  {
    icon: <BellIcon className="inline size-4 -translate-y-0.5" />,
    title: "Account history.",
    description: "Every email, note, and task stays on the record.",
  },
  {
    icon: <UsersIcon className="inline size-4 -translate-y-0.5" />,
    title: "Team alignment.",
    description: "Reps and managers work from shared customer context.",
  },
  {
    icon: <LineChartIcon className="inline size-4 -translate-y-0.5" />,
    title: "Forecast health.",
    description: "Spot risk and momentum before the quarter slips away.",
  },
]

export function Feature4({
  title = (
    <>
      <span className="text-foreground">Every deal, one view.</span>
      <br /> Stages and owners in one place.
    </>
  ),
  pipelineTitle = "One pipeline view.",
  pipelineDescription = "See every deal stage, owner, and next step without switching tabs.",
  signalsTitle = "Customer signals in context.",
  signalsDescription = "Notes, emails, and tasks stay linked to the account — not scattered across tools.",
  highlights = defaultHighlights,
  className,
}: Feature4Props) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-4xl text-balance font-medium text-4xl text-muted-foreground tracking-tight lg:text-5xl">
          {title}
        </h2>
        <div className="mt-8 grid gap-3 *:bg-background md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-8">
            <p className="max-w-xs font-medium text-lg text-muted-foreground">
              <span className="text-foreground">{pipelineTitle}</span>{" "}
              {pipelineDescription}
            </p>

            <div className="my-16">
              <div
                aria-hidden
                className="relative mx-auto aspect-square w-10/12 rounded-xl border bg-background"
              >
                <div className="absolute right-0 bottom-0 aspect-square w-3/5 translate-x-8 translate-y-16 rounded-xl bg-card shadow-xl ring ring-foreground/10" />
              </div>
            </div>
          </Card>
          <Card className="lg:col-span-2">
            <div className="p-8">
              <p className="max-w-xs font-medium text-lg text-muted-foreground">
                <span className="text-foreground">{signalsTitle}</span>{" "}
                {signalsDescription}
              </p>
            </div>

            <div className="mt-6 mask-x-from-65% pt-2">
              <div
                aria-hidden
                className="relative h-72 rounded-xl bg-linear-to-b from-foreground/5 shadow-xl ring ring-foreground/10"
              />
            </div>
          </Card>
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
