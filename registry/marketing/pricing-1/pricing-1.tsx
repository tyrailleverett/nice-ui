import { CheckIcon, TagIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export interface Pricing1Plan {
  ctaHref?: string;
  description: string;
  features: string[];
  key: string;
  name: string;
  popular?: boolean;
  previousTierName?: string | null;
  prices: {
    monthly: number;
    yearly: number;
  };
}

export interface Pricing1Props {
  className?: string;
  ctaLabel?: string;
  description?: string;
  plans?: Pricing1Plan[];
  title?: string;
}

const defaultPlans: Pricing1Plan[] = [
  {
    description:
      "Full product access for solo founders and small teams getting started.",
    features: [
      "All product features",
      "1 seat",
      "Up to 3 projects",
      "10,000 API requests / mo",
      "5 GB storage",
      "Email support",
    ],
    key: "basic",
    name: "Starter",
    popular: false,
    previousTierName: null,
    prices: {
      monthly: 2900,
      yearly: 2320,
    },
  },
  {
    description: "More capacity and collaboration for growing teams.",
    features: [
      "All product features",
      "5 seats",
      "Up to 25 projects",
      "100,000 API requests / mo",
      "50 GB storage",
      "Priority email support",
    ],
    key: "standard",
    name: "Pro",
    popular: true,
    previousTierName: "Starter",
    prices: {
      monthly: 7900,
      yearly: 6320,
    },
  },
  {
    description: "Unlimited capacity for teams that need room to grow.",
    features: [
      "All product features",
      "Unlimited seats",
      "Unlimited projects",
      "Unlimited API requests",
      "500 GB storage",
      "Priority support",
    ],
    key: "premium",
    name: "Scale",
    popular: false,
    previousTierName: "Pro",
    prices: {
      monthly: 19_900,
      yearly: 15_920,
    },
  },
];

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(amount / 100);
}

function annualSavingsPercent(plan: Pricing1Plan): number {
  return Math.round((1 - plan.prices.yearly / plan.prices.monthly) * 100);
}

const billingToggleItemClassName =
  "hover:bg-transparent hover:text-foreground aria-pressed:hover:bg-primary aria-pressed:hover:text-primary-foreground data-[state=on]:hover:bg-primary data-[state=on]:hover:text-primary-foreground";

function BillingIntervalToggle({
  isAnnual,
  onChange,
}: {
  isAnnual: boolean;
  onChange: (isAnnual: boolean) => void;
}) {
  const handleValueChange = useCallback(
    ([value]: string[]) => {
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
      value={[isAnnual ? "annual" : "monthly"]}
      variant="solid"
    >
      <ToggleGroupItem className={billingToggleItemClassName} value="monthly">
        Monthly
      </ToggleGroupItem>
      <ToggleGroupItem className={billingToggleItemClassName} value="annual">
        Annually
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function Pricing1({
  plans = defaultPlans,
  ctaLabel = "Start 14-day trial",
  title = "Plans that Scale with You.",
  description = "Whether you're just starting out or growing fast, our flexible pricing has you covered — with no hidden costs.",
  className,
}: Pricing1Props) {
  const [isAnnual, setIsAnnual] = useState(false);
  const savingsPercent = plans[0] ? annualSavingsPercent(plans[0]) : 0;

  return (
    <MarketingSection className={className}>
      <div className="flex flex-col items-center px-8 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display-heading text-3xl sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
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
        <div className="grid grid-cols-1 lg:grid-cols-3">
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
                  className="mt-8 w-full"
                  nativeButton={false}
                  render={<a href={plan.ctaHref ?? "#"} />}
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {ctaLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarketingSection>
  );
}
