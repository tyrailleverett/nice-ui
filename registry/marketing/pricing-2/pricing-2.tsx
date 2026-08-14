import { CheckIcon, TagIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export interface Pricing2Plan {
  ctaHref?: string;
  ctaLabel?: string;
  key: string;
  name: string;
  popular?: boolean;
  prices?: {
    monthly: number;
    yearly: number;
  };
}

export type Pricing2Value = boolean | string;

export interface Pricing2Feature {
  name: string;
  values: Pricing2Value[];
}

export interface Pricing2Group {
  features: Pricing2Feature[];
  name: string;
}

export interface Pricing2Props {
  className?: string;
  ctaLabel?: string;
  groups?: Pricing2Group[];
  plans?: Pricing2Plan[];
}

const defaultPlans: Pricing2Plan[] = [
  {
    key: "starter",
    name: "Starter",
    prices: { monthly: 2900, yearly: 2320 },
  },
  {
    key: "pro",
    name: "Pro",
    popular: true,
    prices: { monthly: 7900, yearly: 6320 },
  },
  {
    key: "scale",
    name: "Scale",
    prices: { monthly: 19_900, yearly: 15_920 },
  },
  {
    ctaLabel: "Contact sales",
    key: "enterprise",
    name: "Enterprise",
  },
];

const defaultGroups: Pricing2Group[] = [
  {
    features: [
      {
        name: "Team members",
        values: ["1", "Up to 10", "Up to 50", "Unlimited"],
      },
      {
        name: "Projects",
        values: ["3", "Unlimited", "Unlimited", "Unlimited"],
      },
      { name: "Storage", values: ["1 GB", "50 GB", "500 GB", "Unlimited"] },
      { name: "REST & GraphQL API", values: [false, true, true, true] },
      {
        name: "Webhooks",
        values: [false, "10 endpoints", "50 endpoints", "Unlimited"],
      },
      {
        name: "Staging environments",
        values: [false, "1", "5", "Unlimited"],
      },
    ],
    name: "Core",
  },
  {
    features: [
      { name: "Real-time collaboration", values: [false, true, true, true] },
      { name: "Comments & mentions", values: [true, true, true, true] },
      {
        name: "Guest access",
        values: [false, "5 guests", "25 guests", "Unlimited"],
      },
      { name: "Custom roles", values: [false, false, true, true] },
    ],
    name: "Collaboration",
  },
  {
    features: [
      { name: "SAML SSO", values: [false, false, true, true] },
      { name: "Directory sync", values: [false, false, false, true] },
      { name: "Audit logs", values: [false, "7 days", "90 days", "1 year"] },
      { name: "IP allowlisting", values: [false, false, true, true] },
    ],
    name: "Security",
  },
  {
    features: [
      {
        name: "Support channel",
        values: ["Community", "Email (24h)", "Email (4h)", "Phone (1h)"],
      },
      { name: "Onboarding assistance", values: [false, false, true, true] },
    ],
    name: "Support",
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

function annualSavingsPercent(plan: Pricing2Plan): number {
  if (!plan.prices) {
    return 0;
  }
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

function FeatureValue({ value }: { value: Pricing2Value | undefined }) {
  if (value === true) {
    return (
      <CheckIcon
        aria-label="Included"
        className="mx-auto size-4 text-primary"
      />
    );
  }

  if (value === false || value === undefined) {
    return (
      <span className="text-muted-foreground">
        <span className="sr-only">Not included</span>—
      </span>
    );
  }

  return <span className="font-medium">{value}</span>;
}

export function Pricing2({
  plans = defaultPlans,
  groups = defaultGroups,
  ctaLabel = "Start 14-day trial",
  className,
}: Pricing2Props) {
  const [isAnnual, setIsAnnual] = useState(false);
  const pricedPlan = plans.find((plan) => plan.prices);
  const savingsPercent = pricedPlan ? annualSavingsPercent(pricedPlan) : 0;

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
          <div className="overflow-x-auto border-border border-r border-l">
            <table className="w-full min-w-4xl border-collapse text-sm">
              <caption className="sr-only">Compare plans</caption>
              <thead>
                <tr>
                  <th
                    className="sticky top-0 left-0 z-30 min-w-44 border-border border-b bg-background px-6 py-8 text-left font-medium"
                    scope="col"
                  >
                    <span className="sr-only">Feature</span>
                  </th>
                  {plans.map((plan) => (
                    <th
                      className={cn(
                        "sticky top-0 z-20 min-w-40 border-border border-b border-l px-6 py-8 text-center align-bottom font-medium",
                        plan.popular ? "bg-primary/5" : "bg-background"
                      )}
                      key={plan.key}
                      scope="col"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xl tracking-tight">
                            {plan.name}
                          </span>
                          {plan.popular ? (
                            <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                              Popular
                            </Badge>
                          ) : null}
                        </div>
                        <div>
                          {plan.prices ? (
                            <>
                              <div className="flex items-baseline justify-center gap-1">
                                <span className="font-semibold text-3xl">
                                  {formatPrice(
                                    isAnnual
                                      ? plan.prices.yearly
                                      : plan.prices.monthly
                                  )}
                                </span>
                                <span className="text-muted-foreground">
                                  /month
                                </span>
                              </div>
                              <p className="mt-1 text-muted-foreground text-xs">
                                {isAnnual
                                  ? "Per seat, billed annually"
                                  : "Per seat, billed monthly"}
                              </p>
                            </>
                          ) : (
                            <>
                              <span className="font-semibold text-3xl tracking-tight">
                                Custom
                              </span>
                              <p className="mt-1 text-muted-foreground text-xs">
                                Tailored to your team
                              </p>
                            </>
                          )}
                        </div>
                        <Button
                          asChild
                          className="w-full"
                          size="lg"
                          variant={plan.popular ? "default" : "outline"}
                        >
                          <a href={plan.ctaHref ?? "#"}>
                            {plan.ctaLabel ?? ctaLabel}
                          </a>
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <GroupRows group={group} key={group.name} plans={plans} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function GroupRows({
  group,
  plans,
}: {
  group: Pricing2Group;
  plans: Pricing2Plan[];
}) {
  return (
    <>
      <tr>
        <th
          className="sticky left-0 z-10 border-border border-t bg-muted/50 px-6 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider"
          scope="colgroup"
        >
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="size-1 rounded-full bg-muted-foreground"
            />
            {group.name}
          </span>
        </th>
        {plans.map((plan) => (
          <td
            className={cn(
              "border-border border-t border-l bg-muted/50 px-6 py-3",
              plan.popular && "bg-primary/10"
            )}
            key={`${group.name}-${plan.key}-heading`}
          />
        ))}
      </tr>
      {group.features.map((feature) => (
        <tr key={feature.name}>
          <th
            className="sticky left-0 z-10 border-border border-t bg-background px-6 py-4 text-left font-medium text-muted-foreground"
            scope="row"
          >
            {feature.name}
          </th>
          {plans.map((plan, index) => (
            <td
              className={cn(
                "border-border border-t border-l px-6 py-4 text-center",
                plan.popular && "bg-primary/5"
              )}
              key={`${feature.name}-${plan.key}`}
            >
              <FeatureValue value={feature.values[index]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
