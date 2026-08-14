import { CheckIcon, TagIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export interface Pricing3Plan {
  badge?: string;
  ctaHref?: string;
  description: string;
  features: string[];
  name: string;
  prices: {
    monthly: number;
    yearly: number;
  };
}

export interface Pricing3Props {
  className?: string;
  ctaLabel?: string;
  footnote?: string;
  plan?: Pricing3Plan;
}

const defaultPlan: Pricing3Plan = {
  badge: "Simple pricing",
  description:
    "Everything you need to ship. One plan, no seat math, no feature gates.",
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
  name: "Pro",
  prices: {
    monthly: 7900,
    yearly: 6320,
  },
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(amount / 100);
}

function annualSavingsPercent(plan: Pricing3Plan): number {
  return Math.round((1 - plan.prices.yearly / plan.prices.monthly) * 100);
}

function BillingIntervalToggle({
  isAnnual,
  onChange,
}: {
  isAnnual: boolean;
  onChange: (isAnnual: boolean) => void;
}) {
  const handleValueChange = useCallback(
    (value: string) => {
      if (value === "monthly") {
        onChange(false);
        return;
      }
      if (value === "annual") {
        onChange(true);
      }
    },
    [onChange]
  );

  return (
    <ToggleGroup
      className="rounded-lg border border-border bg-muted/50 p-1"
      onValueChange={handleValueChange}
      type="single"
      value={isAnnual ? "annual" : "monthly"}
    >
      <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
      <ToggleGroupItem value="annual">Annually</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function Pricing3({
  plan = defaultPlan,
  ctaLabel = "Start 14-day trial",
  footnote = "Cancel anytime. No card required to start.",
  className,
}: Pricing3Props) {
  const [isAnnual, setIsAnnual] = useState(false);
  const savingsPercent = annualSavingsPercent(plan);

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
  );
}
