import { FullWidthDivider } from "@/components/full-width-divider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Cta1Action = {
  href?: string
  label: string
}

export type Cta1Props = {
  title?: string
  primaryCta?: Cta1Action
  secondaryCta?: Cta1Action
  className?: string
}

function ActionButton({
  action,
  variant,
}: {
  action: Cta1Action
  variant?: "default" | "secondary"
}) {
  if (action.href) {
    return (
      <Button asChild variant={variant}>
        <a href={action.href}>{action.label}</a>
      </Button>
    )
  }

  return (
    <Button type="button" variant={variant}>
      {action.label}
    </Button>
  )
}

export function Cta1({
  title = "Let your plans shape the future.",
  primaryCta = { label: "Get Started", href: "#" },
  secondaryCta = { label: "Contact Sales", href: "#" },
  className,
}: Cta1Props) {
  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-3xl flex-col justify-between border-x md:flex-row",
        className
      )}
    >
      <FullWidthDivider position="top" />
      <div className="border-b p-4 md:border-b-0">
        <h2 className="text-center font-bold text-lg md:text-left md:text-2xl">
          {title}
        </h2>
      </div>
      <div className="flex items-center justify-center gap-2 p-4 md:border-l">
        {secondaryCta ? (
          <ActionButton action={secondaryCta} variant="secondary" />
        ) : null}
        {primaryCta ? <ActionButton action={primaryCta} /> : null}
      </div>
      <FullWidthDivider position="bottom" />
    </section>
  )
}