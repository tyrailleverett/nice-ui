import { CheckIcon, SparklesIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    features: ["1 workspace", "Unlimited drafts", "Basic analytics"],
    name: "Creator",
    price: 12.5,
  },
  {
    features: ["5 workspaces", "Team collaboration", "Advanced analytics"],
    name: "Team",
    price: 29,
  },
  {
    features: ["Unlimited workspaces", "Client approvals", "Priority support"],
    name: "Agency",
    price: 79,
  },
] as const;

export function BillingPlan1() {
  const [annual, setAnnual] = useState(true);
  const showMonthly = useCallback(() => setAnnual(false), []);
  const showAnnual = useCallback(() => setAnnual(true), []);
  return (
    <main className="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="mx-auto max-w-xl space-y-3 text-center">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Plans & pricing
          </p>
          <h1 className="font-heading font-semibold text-4xl tracking-tight">
            Pick the pace that fits.
          </h1>
          <p className="text-muted-foreground">
            Flexible plans for solo makers, growing teams, and ambitious agencies.
          </p>
          <div className="inline-flex items-center gap-1 rounded-full border bg-card p-1">
            <button
              className={cn(
                "rounded-full px-4 py-2 text-sm",
                !annual && "bg-foreground text-background",
              )}
              onClick={showMonthly}
              type="button"
            >
              Monthly
            </button>
            <button
              className={cn(
                "rounded-full px-4 py-2 text-sm",
                annual && "bg-foreground text-background",
              )}
              onClick={showAnnual}
              type="button"
            >
              Annual <span className="text-primary text-xs">Save 20%</span>
            </button>
          </div>
        </header>
        <section aria-label="Pricing plans" className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const popular = plan.name === "Team";
            const price = annual ? Math.round(plan.price * 0.8 * 100) / 100 : plan.price;
            return (
              <Card
                className={cn(
                  "relative overflow-visible",
                  popular && "border-primary ring-2 ring-primary/20",
                )}
                key={plan.name}
              >
                {popular && (
                  <Badge className="absolute -top-3 left-5 gap-1" variant="default">
                    <SparklesIcon /> Most popular
                  </Badge>
                )}
                <CardHeader className="gap-3">
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="font-heading font-semibold text-4xl">
                    ${price}
                    <span className="font-normal text-muted-foreground text-sm"> / month</span>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {annual ? "Billed annually" : "Billed monthly"}
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  <Button className="w-full" variant={popular ? "default" : "outline"}>
                    Start free trial
                  </Button>
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature) => (
                      <li className="flex gap-2" key={feature}>
                        <CheckIcon className="size-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </main>
  );
}
