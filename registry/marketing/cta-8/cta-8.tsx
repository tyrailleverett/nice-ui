import {
  ArrowUpRightIcon,
  BoxesIcon,
  FrameIcon,
  LayersIcon,
  MessageCircleIcon,
  MousePointer2Icon,
  OrigamiIcon,
  PaletteIcon,
  PenToolIcon,
  SplineIcon,
  WandSparklesIcon,
} from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Cta8Action = {
  href?: string
  label: string
}

export type Cta8Icon = {
  className?: string
  icon: ReactNode
}

export type Cta8Props = {
  title?: string
  description?: string
  primaryCta?: Cta8Action
  secondaryCta?: Cta8Action
  icons?: Cta8Icon[]
  className?: string
}

function ActionButton({
  action,
  variant,
  icon,
  className,
}: {
  action: Cta8Action
  variant?: "default" | "outline"
  icon?: ReactNode
  className?: string
}) {
  const content = (
    <>
      {action.label}
      {icon}
    </>
  )

  if (action.href) {
    return (
      <Button asChild className={className} variant={variant}>
        <a href={action.href}>{content}</a>
      </Button>
    )
  }

  return (
    <Button className={className} type="button" variant={variant}>
      {content}
    </Button>
  )
}

function FloatingIcon({ className, icon }: Cta8Icon) {
  return (
    <div
      className={cn(
        "absolute hidden size-11 items-center justify-center rounded-xl border bg-card text-foreground shadow-sm md:flex",
        className
      )}
    >
      {icon}
    </div>
  )
}

export function Cta8({
  title = "Scale your outreach with precision tools",
  description = "Drive 3x conversions at half cost.",
  primaryCta = { label: "Start free trial", href: "#" },
  secondaryCta = { label: "Book a demo", href: "#" },
  icons = [
    { className: "top-[14%] left-[10%] rotate-[-8deg]", icon: <BoxesIcon className="size-5" /> },
    { className: "top-[38%] left-[4%] rotate-[10deg]", icon: <MousePointer2Icon className="size-5" /> },
    { className: "top-[32%] left-[18%] rotate-[-4deg]", icon: <SplineIcon className="size-5" /> },
    { className: "bottom-[28%] left-[8%] rotate-[6deg]", icon: <PaletteIcon className="size-5" /> },
    { className: "bottom-[14%] left-[16%] rotate-[-12deg]", icon: <LayersIcon className="size-5" /> },
    { className: "top-[16%] right-[12%] rotate-[8deg]", icon: <MessageCircleIcon className="size-5" /> },
    { className: "top-[36%] right-[5%] rotate-[-6deg]", icon: <PenToolIcon className="size-5" /> },
    { className: "top-[48%] right-[16%] rotate-[12deg]", icon: <WandSparklesIcon className="size-5" /> },
    { className: "bottom-[24%] right-[7%] rotate-[-8deg]", icon: <FrameIcon className="size-5" /> },
    { className: "bottom-[12%] right-[18%] rotate-[4deg]", icon: <OrigamiIcon className="size-5" /> },
  ],
  className,
}: Cta8Props) {
  return (
    <section
      className={cn(
        "relative mx-auto flex min-h-96 w-full max-w-4xl flex-col items-center justify-center gap-4 overflow-hidden px-6 py-16 text-center",
        "bg-[radial-gradient(45%_70%_at_50%_0%,--theme(--color-foreground/.08),transparent)]",
        className
      )}
    >
      {icons.map((item, index) => (
        <FloatingIcon key={index} {...item} />
      ))}

      <h2 className="max-w-xl text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground text-sm md:text-base">{description}</p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {primaryCta ? (
          <ActionButton
            action={primaryCta}
            className="rounded-full"
            icon={<ArrowUpRightIcon data-icon="inline-end" />}
          />
        ) : null}
        {secondaryCta ? (
          <ActionButton
            action={secondaryCta}
            className="rounded-full"
            variant="outline"
          />
        ) : null}
      </div>
    </section>
  )
}
