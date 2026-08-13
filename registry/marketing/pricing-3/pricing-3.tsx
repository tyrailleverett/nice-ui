import { useCallback, useState } from "react"
import { CheckIcon, TagIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Pricing3Plan = {
  name: string
  description: string
  badge?: string
  prices: {
    monthly: number
    yearly: number
  }
  features: string[]
  ctaHref?: string
}

export type Pricing3Props = {
  plan?: Pricing3Plan
  ctaLabel?: string
  footnote?: string
  className?: string
}

const defaultPlan: Pricing3Plan = {
  name: "Pro",
  description:
    "Everything you need to ship. One plan, no seat math, no feature gates.",
  badge: "Simple pricing",
  prices: {
    monthly: 7900,
    yearly: 6320,
  },
  features: [
    "All product features",
    "Unlimited seats",
    "Unlimited projects",
    "100,000 API requests / mo",
    "50 GB storage",
    "Priority email support",
    "Staging environments",
    "Comments & mentions",
  ],
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(amount / 100)
}

function annualSavingsPercent(plan: Pricing3Plan): number {
  return Math.round((1 - plan.prices.yearly / plan.prices.monthly) * 100)
}

function toggleButtonClass(selected: boolean): string {
  return cn(
    "rounded-md px-5 py-2 font-medium text-sm transition-all",
    selected
      ? "bg-accent text-foreground"
      : "text-muted-foreground hover:text-foreground"
  )
}

function BillingIntervalToggle({
  isAnnual,
  onChange,
}: {
  isAnnual: boolean
  onChange: (isAnnual: boolean) => void
}) {
  const selectMonthly = useCallback(() => {
    onChange(false)
  }, [onChange])

  const selectAnnual = useCallback(() => {
    onChange(true)
  }, [onChange])

  return (
    <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
      <button
        aria-pressed={!isAnnual}
        className={toggleButtonClass(!isAnnual)}
        onClick={selectMonthly}
        type="button"
      >
        Monthly
      </button>
      <button
        aria-pressed={isAnnual}
        className={toggleButtonClass(isAnnual)}
        onClick={selectAnnual}
        type="button"
      >
        Annually
      </button>
    </div>
  )
}

export function Pricing3({
  plan = defaultPlan,
  ctaLabel = "Start 14-day trial",
  footnote = "Cancel anytime. No card required to start.",
  className,
}: Pricing3Props) {
  const [isAnnual, setIsAnnual] = useState(false)
  const savingsPercent = annualSavingsPercent(plan)

  return (
    <section className={className}>
      <div className="mx-auto max-w-6xl">
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-3",
            "border-border border-r border-l py-12"
          )}
        >
          <BillingIntervalToggle isAnnual={isAnnual} onChange={setIsAnnual} />
          {savingsPercent > 0 ? (
            <p className="flex items-center gap-1.5 text-primary text-sm">
              <TagIcon className="size-3.5" />
              Save {savingsPercent}% with annual billing
            </p>
          ) : null}
        </div>
      </div>

      <div className="border-border border-t">
        <div className="mx-auto max-w-6xl">
          <div className="grid border-border border-r border-b border-l md:grid-cols-2 md:border-b-0">
            <div className="flex flex-col border-border border-b px-8 py-10 md:border-b-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl tracking-tight">{plan.name}</h3>
                {plan.badge ? (
                  <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                    {plan.badge}
                  </Badge>
                ) : null}
              </div>
              <p className="mt-2 max-w-sm text-muted-foreground text-sm">
                {plan.description}
              </p>
              <div className="mt-auto pt-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-5xl tracking-tight">
                    {formatPrice(
                      isAnnual ? plan.prices.yearly : plan.prices.monthly
                    )}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-1 text-muted-foreground text-sm">
                  {isAnnual
                    ? "Per seat per month, billed annually"
                    : "Per seat per month, billed monthly"}
                </p>
              </div>
              <Button asChild className="mt-8 w-full sm:w-auto" size="lg">
                <a href={plan.ctaHref ?? "#"}>{ctaLabel}</a>
              </Button>
              {footnote ? (
                <p className="mt-3 text-muted-foreground text-xs">{footnote}</p>
              ) : null}
            </div>

            <div className="flex flex-col justify-center border-border px-8 py-10 md:border-l">
              <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                What's included
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {plan.features.map((feature) => (
                  <li className="flex items-start gap-2" key={feature}>
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
