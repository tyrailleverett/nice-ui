import { CreditCardIcon, FileTextIcon, Settings2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const navigation = ["General", "Members", "Billing", "Security"];

export function BillingSettings3() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] p-4 text-[#272620] sm:p-10">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[180px_1fr]">
        <aside className="space-y-6">
          <div>
            <p className="font-heading font-semibold text-lg">Workspace</p>
            <p className="text-[#979b94] text-sm">Northline Ops</p>
          </div>
          <nav aria-label="Settings navigation" className="space-y-1">
            {navigation.map((item) => (
              <button
                className={`w-full rounded-md px-3 py-2 text-left text-sm ${item === "Billing" ? "bg-white font-medium shadow-sm" : "text-[#77786f] hover:bg-white/70"}`}
                key={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>
        <section className="space-y-5">
          <header>
            <p className="text-[#979b94] text-sm">Settings / Billing</p>
            <h1 className="mt-2 font-heading font-semibold text-3xl">Plan & payments</h1>
          </header>
          <Card className="border-[#dedfd9] bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2Icon className="size-4" />
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 border-t pt-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Growth plan</p>
                  <p className="text-[#77786f] text-sm">10 seats · Annual billing</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-[#979b94] text-xs uppercase tracking-wide">Next charge</p>
                  <p className="mt-2 font-medium">$230.40 on Sep 18, 2026</p>
                </div>
                <Button className="w-fit" variant="outline">
                  Change plan
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#dedfd9] bg-white">
            <CardHeader>
              <CardTitle className="text-base">Payment details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 border-t pt-5">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm">
                  <CreditCardIcon className="size-4" />
                  Visa ending in 4242
                </p>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <p className="flex items-center gap-2 text-sm">
                  <FileTextIcon className="size-4" />
                  Billing history
                </p>
                <Button size="sm" variant="ghost">
                  View invoices
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
