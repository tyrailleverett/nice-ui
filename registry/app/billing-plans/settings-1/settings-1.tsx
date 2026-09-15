import { ArrowRightIcon, CreditCardIcon, ReceiptTextIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function BillingSettings1() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <header className="flex items-start justify-between">
          <div>
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.16em]">
              Workspace / Settings
            </p>
            <h1 className="mt-2 font-heading font-semibold text-3xl">Billing</h1>
            <p className="mt-1 text-muted-foreground text-sm">
              A clear view of your plan and next charge.
            </p>
          </div>
          <Badge variant="outline">Active</Badge>
        </header>
        <Card className="gap-0 py-0">
          <CardHeader className="border-b p-6">
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Current plan</p>
                <CardTitle className="mt-1">Growth</CardTitle>
              </div>
              <Badge variant="secondary">Annual</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 sm:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-xs uppercase">Next billing date</p>
              <p className="mt-2 font-medium">Sep 18, 2026</p>
              <p className="text-muted-foreground text-sm">$230.40</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase">Payment method</p>
              <p className="mt-2 flex gap-2 font-medium">
                <CreditCardIcon className="size-4" />
                Visa ···· 4242
              </p>
              <p className="text-muted-foreground text-sm">Expires 08/28</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase">Usage this cycle</p>
              <p className="mt-2 font-medium">18,420 / 50,000</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted">
                <div className="h-full w-[37%] rounded-full bg-primary" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between gap-4 border-t p-6">
            <p className="text-muted-foreground text-sm">Renews automatically. Cancel anytime.</p>
            <Button variant="outline">
              Manage plan <ArrowRightIcon />
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 text-base">
              <ReceiptTextIcon className="size-4" />
              Latest invoice
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between border-t pt-4">
            <div>
              <p className="font-medium">September 2026 · $230.40</p>
              <p className="text-muted-foreground text-sm">Paid with Visa ending 4242</p>
            </div>
            <Button size="sm" variant="ghost">
              Download
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
