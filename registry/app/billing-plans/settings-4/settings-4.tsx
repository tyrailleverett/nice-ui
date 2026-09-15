import { ArrowRightIcon, CalendarDaysIcon, CreditCardIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BillingSettings4() {
  return (
    <main className="min-h-screen bg-muted/30 p-4 sm:p-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Account / Billing
          </p>
          <h1 className="mt-2 font-heading font-semibold text-3xl">Your subscription</h1>
        </header>
        <Card className="overflow-hidden">
          <CardHeader className="bg-foreground text-background">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-background/60 text-sm">You’re on</p>
                <CardTitle className="mt-1 text-2xl">Growth annual</CardTitle>
              </div>
              <Badge
                className="border-background/30 bg-background/10 text-background"
                variant="outline"
              >
                Active
              </Badge>
            </div>
            <div className="mt-6 flex items-end justify-between">
              <p className="font-heading font-semibold text-4xl">
                $230.40
                <span className="font-normal text-background/60 text-sm"> / year</span>
              </p>
              <Button className="bg-background text-foreground hover:bg-background/90">
                Change plan <ArrowRightIcon />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-0 p-0 sm:grid-cols-2">
            <div className="border-b p-6 sm:border-r sm:border-b-0">
              <CalendarDaysIcon className="size-5 text-primary" />
              <p className="mt-5 text-muted-foreground text-sm">Next billing date</p>
              <p className="mt-1 font-medium">September 18, 2026</p>
              <p className="mt-1 text-muted-foreground text-sm">Automatic renewal enabled</p>
            </div>
            <div className="p-6">
              <CreditCardIcon className="size-5 text-primary" />
              <p className="mt-5 text-muted-foreground text-sm">Payment method</p>
              <p className="mt-1 font-medium">Visa ending in 4242</p>
              <p className="mt-1 text-muted-foreground text-sm">Expires August 2028</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-3 rounded-lg border border-dashed p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Need a different plan?</p>
            <p className="text-muted-foreground text-sm">
              Compare features and adjust your workspace anytime.
            </p>
          </div>
          <Button variant="outline">View all plans</Button>
        </div>
      </div>
    </main>
  );
}
