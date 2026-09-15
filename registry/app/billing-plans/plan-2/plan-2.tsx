import { CheckIcon, MinusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rows = [
  ["Unlimited drafts", true, true, true],
  ["Team collaboration", false, true, true],
  ["Client approvals", false, false, true],
  ["Advanced analytics", false, true, true],
  ["Priority support", false, false, true],
] as const;

export function BillingPlan2() {
  return (
    <main className="min-h-screen bg-muted/30 p-4 text-foreground sm:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-3 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
              Compare plans
            </p>
            <h1 className="mt-2 font-heading font-semibold text-3xl tracking-tight">
              Everything side by side.
            </h1>
          </div>
          <Button>View annual savings</Button>
        </header>
        <Card className="overflow-hidden">
          <CardHeader className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-4 border-b bg-card p-5">
            <div>
              <CardTitle className="text-base">Features</CardTitle>
              <p className="mt-1 text-muted-foreground text-sm">Choose the coverage you need.</p>
            </div>
            {["Creator · $12.50", "Team · $29", "Agency · $79"].map((plan, index) => (
              <div className={index === 1 ? "rounded-md bg-primary/10 p-3" : "p-3"} key={plan}>
                <p className="font-medium text-sm">{plan}</p>
                <Button
                  className="mt-3 w-full"
                  size="sm"
                  variant={index === 1 ? "default" : "outline"}
                >
                  Choose
                </Button>
              </div>
            ))}
          </CardHeader>
          <CardContent className="p-0">
            {rows.map(([label, creator, team, agency]) => (
              <div
                className="grid grid-cols-[1.4fr_repeat(3,1fr)] items-center gap-4 border-b p-5 last:border-0"
                key={label}
              >
                <span className="text-sm">{label}</span>
                {[
                  ["creator", creator],
                  ["team", team],
                  ["agency", agency],
                ].map(([planName, included]) => (
                  <span className="grid place-items-center" key={`${label}-${planName}`}>
                    {included ? (
                      <CheckIcon className="size-4 text-primary" />
                    ) : (
                      <MinusIcon className="size-4 text-muted-foreground" />
                    )}
                  </span>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
