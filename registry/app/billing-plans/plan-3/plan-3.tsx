import { ArrowUpRightIcon, CheckIcon, ZapIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    detail: "Only pay for what you use",
    name: "Pay as you go",
    price: "$0",
    tone: "bg-[#f7f9fb] text-[#171b22]",
  },
  {
    detail: "For growing production teams",
    name: "Agent Pro",
    price: "$200",
    tone: "bg-[#56d6eb] text-[#171b22]",
  },
  {
    detail: "For high-volume operations",
    name: "Agent Max",
    price: "$1,000",
    tone: "bg-[#7c57d4] text-white",
  },
];

export function BillingPlan3() {
  return (
    <main className="min-h-screen bg-[#171b22] p-4 text-[#f7f9fb] sm:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="max-w-2xl space-y-3">
          <Badge className="border-[#9cebfb]/30 bg-[#9cebfb]/10 text-[#9cebfb]" variant="outline">
            <ZapIcon /> Usage-based billing
          </Badge>
          <h1 className="font-heading font-semibold text-4xl tracking-tight">
            Scale without watching the meter.
          </h1>
          <p className="text-[#aeb7c4]">
            Start with credits, move to a predictable tier when your workflow takes off.
          </p>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card className={`gap-0 border-0 py-0 ${tier.tone}`} key={tier.name}>
              <CardHeader className="gap-5 p-6">
                <CardTitle>{tier.name}</CardTitle>
                <p className="text-current/70 text-sm">{tier.detail}</p>
                <p className="font-heading font-semibold text-4xl">
                  {tier.price}
                  <span className="font-normal text-current/60 text-sm"> / month</span>
                </p>
              </CardHeader>
              <CardContent className="flex-1 border-current/15 border-t p-6">
                <ul className="space-y-3 text-sm">
                  {["Shared workspace", "Usage visibility", "API access"].map((feature) => (
                    <li className="flex gap-2" key={feature}>
                      <CheckIcon className="size-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-current/15 border-t p-6">
                <Button
                  className="w-full"
                  variant={tier.name === "Pay as you go" ? "outline" : "default"}
                >
                  Select tier <ArrowUpRightIcon />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
