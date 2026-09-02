import { CheckIcon, TagIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { MarketingSection } from "@/components/marketing-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Pricing5Plan {
  description: string;
  features: string[];
  name: string;
  price: { monthly: number; yearly: number };
  recommended?: boolean;
}

export interface Pricing5Props {
  className?: string;
  description?: string;
  title?: string;
}

const plans: Pricing5Plan[] = [
  {
    description: "For independent makers shipping their first serious product.",
    features: [
      "Unlimited projects",
      "Core Nice UI blocks",
      "Community support",
    ],
    name: "Essentials",
    price: { monthly: 0, yearly: 0 },
  },
  {
    description:
      "For teams that need a shared, production-ready starting point.",
    features: [
      "Everything in Essentials",
      "All premium blocks",
      "Priority support",
    ],
    name: "Studio",
    price: { monthly: 24, yearly: 19 },
    recommended: true,
  },
];

function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (annual: boolean) => void;
}) {
  const handleValueChange = useCallback(
    ([value]: string[]) => {
      if (value === "monthly") {
        onChange(false);
      }
      if (value === "yearly") {
        onChange(true);
      }
    },
    [onChange]
  );

  return (
    <ToggleGroup
      aria-label="Billing interval"
      className="rounded-lg border border-border bg-muted/50 p-1"
      onValueChange={handleValueChange}
      value={[annual ? "yearly" : "monthly"]}
      variant="solid"
    >
      <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
      <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
    </ToggleGroup>
  );
}

function priceFor(plan: Pricing5Plan, annual: boolean): string {
  if (plan.price.monthly === 0) {
    return "Free";
  }
  return `$${annual ? plan.price.yearly : plan.price.monthly}`;
}

export function Pricing5({
  title = "A clear plan for the way you work.",
  description = "Start free, then add the room and support your team needs when the time is right.",
  className,
}: Pricing5Props) {
  const [annual, setAnnual] = useState(false);

  return (
    <MarketingSection className={className}>
      <section className="px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="font-mono text-[11px] text-primary uppercase tracking-[0.2em]">
            Simple by design
          </p>
          <h2 className="mt-3 text-balance font-display-heading text-3xl sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            {description}
          </p>
          <div className="mt-7 flex flex-col items-center gap-2">
            <BillingToggle annual={annual} onChange={setAnnual} />
            {annual ? (
              <p className="flex items-center gap-1.5 text-primary text-xs">
                <TagIcon className="size-3.5" /> Save 20% yearly
              </p>
            ) : null}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              className={
                plan.recommended
                  ? "relative flex flex-col border-2 border-primary bg-primary/5 p-6 sm:p-8"
                  : "flex flex-col border border-border p-6 sm:p-8"
              }
              key={plan.name}
            >
              {plan.recommended ? (
                <Badge className="absolute -top-3 left-6 border-primary bg-background text-primary">
                  Recommended
                </Badge>
              ) : null}
              <h3 className="font-display-heading text-2xl">{plan.name}</h3>
              <p className="mt-2 min-h-12 text-muted-foreground text-sm leading-6">
                {plan.description}
              </p>
              <div className="mt-7 flex items-baseline gap-1">
                <span className="font-semibold text-4xl">
                  {priceFor(plan, annual)}
                </span>
                {plan.price.monthly > 0 ? (
                  <span className="text-muted-foreground text-sm">/month</span>
                ) : null}
              </div>
              <Button
                className="mt-7 w-full"
                size="lg"
                variant={plan.recommended ? "default" : "outline"}
              >
                {plan.price.monthly === 0 ? "Start free" : "Choose Studio"}
              </Button>
              <ul className="mt-8 space-y-3 border-border border-t pt-6">
                {plan.features.map((feature) => (
                  <li className="flex items-start gap-2 text-sm" key={feature}>
                    <CheckIcon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-primary"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </MarketingSection>
  );
}
