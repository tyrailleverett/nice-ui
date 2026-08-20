import {
  ArrowUpRightIcon,
  CheckIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CreditCardIcon,
  GaugeIcon,
  LockKeyholeIcon,
  SparklesIcon,
  TimerResetIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PaywallState {
  action: string;
  description: string;
  icon: typeof LockKeyholeIcon;
  label: string;
  status: string;
  title: string;
  tone: "danger" | "info" | "warning";
}

const paywallStates: PaywallState[] = [
  {
    action: "Compare plans",
    description: "Advanced routing is included with Scale and above.",
    icon: LockKeyholeIcon,
    label: "Entitlement locked",
    status: "Unavailable on Launch",
    title: "Advanced routing",
    tone: "info",
  },
  {
    action: "Upgrade capacity",
    description: "You have used all 12 included coordinator seats.",
    icon: GaugeIcon,
    label: "Usage limit reached",
    status: "12 / 12 seats",
    title: "Coordinator seats",
    tone: "warning",
  },
  {
    action: "Choose a plan",
    description: "Your trial ends in 3 days. Keep your workspace active.",
    icon: TimerResetIcon,
    label: "Trial ending",
    status: "3 days remaining",
    title: "Launch trial",
    tone: "info",
  },
  {
    action: "Fix payment",
    description: "The Visa ending in 4242 could not be charged.",
    icon: CreditCardIcon,
    label: "Action required",
    status: "Payment failed",
    title: "Renewal invoice",
    tone: "danger",
  },
];

const toneStyles = {
  danger: {
    badge: "bg-destructive/10 text-destructive",
    icon: "bg-destructive/10 text-destructive",
  },
  info: {
    badge: "bg-primary/10 text-primary",
    icon: "bg-primary/10 text-primary",
  },
  warning: {
    badge: "bg-chart-4/15 text-foreground",
    icon: "bg-chart-4/15 text-foreground",
  },
} as const;

export interface UpgradePaywallProps {
  className?: string;
}

function StateCard({
  action,
  description,
  icon: Icon,
  label,
  status,
  title,
  tone,
}: PaywallState) {
  const styles = toneStyles[tone];

  return (
    <Card className="rounded-none border-0 shadow-none" size="sm">
      <CardHeader className="gap-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "grid size-8 place-items-center rounded-md",
              styles.icon
            )}
          >
            <Icon aria-hidden="true" />
          </span>
          <Badge className={styles.badge} variant="secondary">
            {status}
          </Badge>
        </div>
        <div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.16em]">
            {label}
          </p>
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <CardDescription className="mt-1 leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="justify-between gap-3 border-t">
        <Button className="px-0" size="sm" variant="link">
          {action}
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
        {tone === "danger" ? (
          <TriangleAlertIcon
            aria-label="Payment attention needed"
            className="text-destructive"
          />
        ) : (
          <ArrowUpRightIcon
            aria-hidden="true"
            className="text-muted-foreground"
          />
        )}
      </CardFooter>
    </Card>
  );
}

export function UpgradePaywall({ className }: UpgradePaywallProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6">
        <header className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
              Workspace / Entitlements
            </p>
            <h1 className="font-heading font-semibold text-3xl tracking-tight sm:text-4xl">
              Upgrade &amp; paywall states
            </h1>
            <p className="text-muted-foreground">
              See what is unavailable, what is at capacity, and the next action
              that restores access.
            </p>
          </div>
          <Badge className="w-fit gap-1.5" variant="outline">
            <CircleCheckIcon aria-hidden="true" />
            Workspace active
          </Badge>
        </header>

        <section
          aria-labelledby="access-summary-title"
          className="grid gap-px overflow-hidden rounded-xl bg-border p-px lg:grid-cols-[1.15fr_0.85fr]"
        >
          <Card className="rounded-none border-0 shadow-none">
            <CardHeader className="gap-5 pb-4 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <SparklesIcon aria-hidden="true" />
                </div>
                <Badge variant="secondary">Current plan · Launch</Badge>
              </div>
              <div>
                <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.16em]">
                  Access summary
                </p>
                <CardTitle className="mt-2 text-2xl" id="access-summary-title">
                  Your workspace is ready to grow.
                </CardTitle>
                <CardDescription className="mt-2 max-w-lg leading-relaxed">
                  Core workflows remain available. Scale unlocks advanced
                  routing, larger limits, and priority support for the next
                  stage of your team.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="gap-5 sm:px-8">
              <div className="rounded-lg bg-muted/60 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.16em]">
                      Included seats
                    </p>
                    <p className="mt-1 font-heading font-semibold text-2xl tabular-nums">
                      12{" "}
                      <span className="font-normal font-sans text-muted-foreground text-sm">
                        of 12 used
                      </span>
                    </p>
                  </div>
                  <span className="font-mono text-muted-foreground text-xs">
                    100%
                  </span>
                </div>
                <Progress
                  aria-label="Coordinator seats: 100% used"
                  className="mt-3"
                  indicatorClassName="bg-chart-4"
                  value={100}
                />
                <p className="mt-2 text-muted-foreground text-xs">
                  Upgrade before inviting another coordinator.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">Scale plan</p>
                  <p className="text-muted-foreground text-sm">
                    $249 / month · 25 seats included
                  </p>
                </div>
                <Button className="w-full sm:w-auto" size="lg">
                  Upgrade to Scale
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-px bg-border sm:grid-cols-2">
            {paywallStates.map((state) => (
              <StateCard key={state.title} {...state} />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="plan-comparison-title"
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2
                className="font-heading font-semibold text-xl"
                id="plan-comparison-title"
              >
                Plan comparison
              </h2>
              <p className="text-muted-foreground text-sm">
                The shortest path from today&apos;s limits to full access.
              </p>
            </div>
            <span className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
              Billed monthly
            </span>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl bg-border p-px md:grid-cols-3">
            {[
              {
                current: true,
                detail: "12 seats · core workflows",
                name: "Launch",
                price: "$99",
              },
              {
                detail: "25 seats · advanced routing",
                name: "Scale",
                price: "$249",
              },
              {
                detail: "Unlimited · dedicated support",
                name: "Fleet",
                price: "$499",
              },
            ].map(({ current, detail, name, price }) => (
              <div
                className="flex flex-col gap-5 bg-card p-5 sm:p-6"
                key={name}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-heading font-semibold text-lg">{name}</p>
                    <p className="text-muted-foreground text-sm">{detail}</p>
                  </div>
                  {current ? <Badge variant="secondary">Current</Badge> : null}
                </div>
                <Separator />
                <div className="flex items-end justify-between gap-4">
                  <p className="font-mono font-semibold text-2xl tabular-nums">
                    {price}
                    <span className="font-normal font-sans text-muted-foreground text-sm">
                      {" "}
                      / mo
                    </span>
                  </p>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    <CheckIcon aria-hidden="true" className="text-primary" />
                    {current ? "Active" : "Available"}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="flex items-center gap-2 text-muted-foreground text-xs">
            <CircleAlertIcon aria-hidden="true" />
            Changes take effect immediately. Existing usage is retained through
            the current billing cycle.
          </p>
        </section>
      </div>
    </main>
  );
}
