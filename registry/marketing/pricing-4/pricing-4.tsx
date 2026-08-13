import { useCallback, useState } from "react"
import { CheckIcon, TagIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Pricing4Plan = {
  key: string
  name: string
  description: string
  popular?: boolean
  previousTierName?: string | null
  prices: {
    monthly: number
    yearly: number
  }
  features: string[]
  ctaHref?: string
}

export type Pricing4Props = {
  plans?: Pricing4Plan[]
  ctaLabel?: string
  className?: string
}

const defaultPlans: Pricing4Plan[] = [
  {
    key: "starter",
    name: "Starter",
    description:
      "Full product access for solo founders and small teams getting started.",
    popular: false,
    previousTierName: null,
    prices: {
      monthly: 2900,
      yearly: 2320,
    },
    features: [
      "All product features",
      "1 seat",
      "Up to 3 projects",
      "10,000 API requests / mo",
      "5 GB storage",
      "Email support",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    description: "More capacity and collaboration for growing teams.",
    popular: true,
    previousTierName: "Starter",
    prices: {
      monthly: 7900,
      yearly: 6320,
    },
    features: [
      "All product features",
      "5 seats",
      "Up to 25 projects",
      "100,000 API requests / mo",
      "50 GB storage",
      "Priority email support",
    ],
  },
]

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(amount / 100)
}

function annualSavingsPercent(plan: Pricing4Plan): number {
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

export function Pricing4({
  plans = defaultPlans,
  ctaLabel = "Start 14-day trial",
  className,
}: Pricing4Props) {
  const [isAnnual, setIsAnnual] = useState(false)
  const savingsPercent = plans[0] ? annualSavingsPercent(plans[0]) : 0

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
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {plans.map((plan, index) => (
              <div
                className={cn(
                  "flex flex-col border-border border-b border-l lg:border-b-0",
                  index === plans.length - 1 && "border-r"
                )}
                key={plan.key}
              >
                <div className="flex min-h-65 flex-col border-border border-b py-8 pr-8 pl-8">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl tracking-tight">{plan.name}</h3>
                    {plan.popular ? (
                      <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                        Popular
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-semibold text-4xl">
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
                </div>

                <div className="flex flex-1 flex-col py-8 pr-8 pl-8">
                  <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                    {plan.previousTierName ? (
                      <>
                        Everything in {plan.previousTierName}{" "}
                        <span className="text-base normal-case">+</span>
                      </>
                    ) : (
                      "Features"
                    )}
                  </p>
                  <ul className="mt-4 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li className="flex items-start gap-2" key={feature}>
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-8 w-full"
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <a href={plan.ctaHref ?? "#"}>{ctaLabel}</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
