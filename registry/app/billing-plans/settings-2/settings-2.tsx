import { ArrowUpRightIcon, CircleDollarSignIcon, GaugeIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  { name: "Pay as you go", price: "$0", tone: "bg-white" },
  { name: "Agent Pro", price: "$200", tone: "bg-[#56d6eb]" },
  { name: "Agent Max", price: "$1,000", tone: "bg-[#7c57d4] text-white" },
];

export function BillingSettings2() {
  return (
    <main className="min-h-screen bg-[#fbfbfb] p-4 text-[#1a2028] sm:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <p className="font-mono text-[#6c6a6e] text-xs uppercase tracking-[0.18em]">
            Usage & billing
          </p>
          <h1 className="mt-2 font-heading font-semibold text-3xl">Credits & tiers</h1>
          <p className="mt-1 text-[#6c6a6e]">
            Monitor your balance, top up credits, and choose a faster lane.
          </p>
        </header>
        <Card className="gap-0 border-[#dce0e4] bg-white py-0">
          <CardHeader className="flex-row items-center justify-between border-b p-6">
            <div>
              <CardTitle>Your current tier</CardTitle>
              <p className="mt-1 text-[#6c6a6e] text-sm">Pay as you go</p>
            </div>
            <Button className="bg-[#1a2028] text-white hover:bg-[#1a2028]/90">
              Add credits <ArrowUpRightIcon />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-0 p-0 sm:grid-cols-3">
            <div className="border-b p-6 sm:border-r sm:border-b-0">
              <CircleDollarSignIcon className="size-5 text-[#e95a60]" />
              <p className="mt-5 text-[#6c6a6e] text-sm">Current balance</p>
              <p className="mt-1 font-heading font-semibold text-3xl">$20.29</p>
              <p className="mt-1 text-[#6c6a6e] text-xs">Updated 12 minutes ago</p>
            </div>
            <div className="border-b p-6 sm:border-r sm:border-b-0">
              <GaugeIcon className="size-5 text-[#6c2cb7]" />
              <p className="mt-5 text-[#6c6a6e] text-sm">Monthly usage</p>
              <p className="mt-1 font-heading font-semibold text-3xl">$20.29</p>
              <p className="mt-1 text-[#6c6a6e] text-xs">$0.68 daily average</p>
            </div>
            <div className="p-6">
              <Badge className="bg-[#6c2cb7]/10 text-[#6c2cb7]" variant="secondary">
                Auto top-up off
              </Badge>
              <p className="mt-5 text-[#6c6a6e] text-sm">Avoid interruptions</p>
              <Button className="mt-3" variant="outline">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
        <section className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card className={`border-0 ${tier.tone}`} key={tier.name}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <p className="font-heading font-semibold text-3xl">
                  {tier.price}
                  <span className="font-normal text-current/60 text-sm"> / month</span>
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={tier.name === "Pay as you go" ? "outline" : "default"}
                >
                  Choose tier
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
