import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    detail: "For exploring the workspace",
    features: "3 members · 1,000 records",
    name: "Starter",
    price: "Free",
  },
  {
    detail: "For teams building a rhythm",
    features: "Unlimited members · 50,000 records",
    name: "Growth",
    price: "$24",
  },
  {
    detail: "For complex operations",
    features: "Unlimited records · SSO",
    name: "Scale",
    price: "$68",
  },
];

export function BillingPlan4() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="border-b pb-7">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Workspace plan
          </p>
          <h1 className="mt-3 font-heading font-semibold text-4xl tracking-tight">
            A quiet upgrade path.
          </h1>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Begin with the essentials. Add power only when your team is ready for it.
          </p>
        </header>
        <div className="space-y-3">
          {tiers.map((tier, index) => (
            <Card className={index === 1 ? "border-primary bg-primary/[0.03]" : ""} key={tier.name}>
              <CardHeader className="grid grid-cols-[1fr_auto_auto] items-center gap-5">
                <div>
                  <CardTitle>{tier.name}</CardTitle>
                  <p className="mt-1 text-muted-foreground text-sm">{tier.detail}</p>
                </div>
                <p className="font-heading font-semibold text-2xl">
                  {tier.price}
                  <span className="font-normal text-muted-foreground text-xs">
                    {tier.price !== "Free" && " / mo"}
                  </span>
                </p>
                <Button variant={index === 1 ? "default" : "outline"}>
                  {index === 0 ? "Current plan" : "Upgrade"}
                  <ArrowRightIcon />
                </Button>
              </CardHeader>
              <CardContent className="flex gap-2 border-t pt-4 text-muted-foreground text-sm">
                <CheckIcon className="size-4 text-primary" />
                {tier.features}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
