import {
  Building2Icon,
  CreditCardIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  PlusIcon,
  ReceiptTextIcon,
} from "lucide-react";
import { type MouseEvent, useCallback, useId, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const compactNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  notation: "compact",
});

const byteNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
});

const rangeFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
});

type PlanId = "harbor" | "coast" | "fleet";
type InvoiceStatus = "Paid" | "Open" | "Failed";
type MeterFormat = "count" | "bytes" | "hours";

interface PlanOption {
  description: string;
  id: PlanId;
  monthly: number;
  name: string;
  seats: number;
}

interface UsageMeter {
  description: string;
  format: MeterFormat;
  id: string;
  included: number;
  label: string;
  overage: string;
  used: number;
}

interface PaymentMethod {
  brand: string;
  default?: boolean;
  expiry: string;
  id: string;
  last4: string;
}

interface BillingInvoice {
  amount: number;
  id: string;
  issued: string;
  status: InvoiceStatus;
}

const plans: PlanOption[] = [
  {
    description: "12 coordinator seats and included carrier webhooks.",
    id: "harbor",
    monthly: 249,
    name: "Harbor",
    seats: 12,
  },
  {
    description: "24 seats, higher webhook volume, and weekend coverage.",
    id: "coast",
    monthly: 490,
    name: "Coast",
    seats: 24,
  },
  {
    description: "Unlimited seats, dedicated lanes, and invoice terms.",
    id: "fleet",
    monthly: 980,
    name: "Fleet",
    seats: 0,
  },
];

const defaultMeters: UsageMeter[] = [
  {
    description: "Dock coordinators signed in this workspace.",
    format: "count",
    id: "seats",
    included: 12,
    label: "Coordinator seats",
    overage: "Extra seats bill at $18 each on the next invoice.",
    used: 9,
  },
  {
    description: "Inbound carrier status posts this cycle.",
    format: "count",
    id: "webhooks",
    included: 250_000,
    label: "Carrier webhooks",
    overage: "Overage is $2 per 1,000 events after the included allotment.",
    used: 184_200,
  },
  {
    description: "Photos and bills of lading attached to exceptions.",
    format: "bytes",
    id: "photos",
    included: 50,
    label: "Exception files",
    overage: "Additional storage is $0.12 per GB.",
    used: 38.2,
  },
  {
    description: "Live map hours across active lanes.",
    format: "hours",
    id: "tracking",
    included: 750,
    label: "Live tracking",
    overage: "Hours above 750 bill at $0.40 each.",
    used: 612,
  },
];

const defaultInvoices: BillingInvoice[] = [
  {
    amount: 249,
    id: "INV-2408",
    issued: "Aug 1, 2026",
    status: "Open",
  },
  {
    amount: 249,
    id: "INV-2407",
    issued: "Jul 1, 2026",
    status: "Paid",
  },
  {
    amount: 267,
    id: "INV-2406",
    issued: "Jun 1, 2026",
    status: "Paid",
  },
  {
    amount: 249,
    id: "INV-2405",
    issued: "May 1, 2026",
    status: "Failed",
  },
];

const defaultMethods: PaymentMethod[] = [
  {
    brand: "Visa",
    default: true,
    expiry: "08 / 28",
    id: "card-4242",
    last4: "4242",
  },
  {
    brand: "ACH",
    expiry: "Wells Fargo · checking",
    id: "ach-9912",
    last4: "9912",
  },
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(start: Date, end: Date) {
  const msPerDay = 86_400_000;
  return Math.round(
    (startOfDay(end).getTime() - startOfDay(start).getTime()) / msPerDay
  );
}

function formatMeterValue(value: number, format: MeterFormat) {
  if (format === "bytes") {
    return `${byteNumber.format(value)} GB`;
  }
  if (format === "hours") {
    return `${compactNumber.format(value)} hr`;
  }
  return compactNumber.format(value);
}

function meterPercent(used: number, included: number) {
  if (included <= 0) {
    return 0;
  }
  return Math.min(100, Math.round((used / included) * 100));
}

function tickHeight(isToday: boolean, isPast: boolean) {
  if (isToday) {
    return "100%";
  }
  if (isPast) {
    return "70%";
  }
  return "40%";
}

function invoiceTone(status: InvoiceStatus) {
  if (status === "Failed") {
    return "destructive" as const;
  }
  if (status === "Open") {
    return "outline" as const;
  }
  return "secondary" as const;
}

export interface BillingCycleStripProps {
  className?: string;
  cycleEnd?: Date;
  cycleStart?: Date;
  nextCharge?: number;
  planName?: string;
  today?: Date;
}

export function BillingCycleStrip({
  className,
  cycleEnd = new Date(2026, 7, 31),
  cycleStart = new Date(2026, 7, 1),
  nextCharge = 249,
  planName = "Harbor",
  today = new Date(2026, 7, 14),
}: BillingCycleStripProps) {
  const ticks = useMemo(() => {
    const totalDays = daysBetween(cycleStart, cycleEnd) + 1;
    const elapsed = Math.min(
      totalDays,
      Math.max(0, daysBetween(cycleStart, today) + 1)
    );
    return { elapsed, remaining: Math.max(0, totalDays - elapsed), totalDays };
  }, [cycleEnd, cycleStart, today]);

  return (
    <section
      aria-label={`${planName} billing cycle, ${ticks.elapsed} of ${ticks.totalDays} days used`}
      className={cn(
        "overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10",
        className
      )}
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="text-muted-foreground text-sm">This cycle</p>
          <p className="mt-1 font-heading font-semibold text-xl tracking-tight">
            {rangeFormatter.format(cycleStart)} –{" "}
            {dayFormatter.format(cycleEnd)}
          </p>
        </div>
        <p className="text-muted-foreground text-sm">
          Next charge{" "}
          {dayFormatter.format(new Date(cycleEnd.getTime() + 86_400_000))} ·{" "}
          <span className="font-medium text-foreground tabular-nums">
            {currency.format(nextCharge)}
          </span>{" "}
          on {planName}
        </p>
      </div>
      <div className="px-5 pb-5 sm:px-6">
        <div aria-hidden="true" className="flex h-10 items-end gap-px">
          {Array.from({ length: ticks.totalDays }, (_, index) => {
            const dayNumber = index + 1;
            const isToday = dayNumber === ticks.elapsed;
            const isPast = dayNumber < ticks.elapsed;
            return (
              <span
                className={cn(
                  "min-w-0 flex-1 rounded-sm",
                  isToday && "bg-primary",
                  isPast && "bg-foreground/70",
                  !(isToday || isPast) && "bg-muted"
                )}
                key={dayNumber}
                style={{ height: tickHeight(isToday, isPast) }}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between text-muted-foreground text-xs">
          <span>Day {ticks.elapsed}</span>
          <span>{ticks.remaining} days left</span>
        </div>
      </div>
    </section>
  );
}

export interface SubscriptionPlanProps {
  className?: string;
  onCancel?: () => void;
  onChangePlan?: (planId: PlanId) => void;
  planId?: PlanId;
}

export function SubscriptionPlan({
  className,
  onCancel,
  onChangePlan,
  planId = "harbor",
}: SubscriptionPlanProps) {
  const [open, setOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selected, setSelected] = useState<PlanId>(planId);
  const current = plans.find((plan) => plan.id === planId) ?? plans[0];
  const headingId = useId();

  const closePlanDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const closeCancelDialog = useCallback(() => {
    setCancelOpen(false);
  }, []);

  const handleConfirmPlan = useCallback(() => {
    onChangePlan?.(selected);
    setOpen(false);
  }, [onChangePlan, selected]);

  const handleCancelPlan = useCallback(() => {
    onCancel?.();
    setCancelOpen(false);
  }, [onCancel]);

  const handlePlanChange = useCallback((value: string) => {
    setSelected(value as PlanId);
  }, []);

  return (
    <Card className={cn("gap-0 py-0", className)}>
      <CardHeader className="border-b p-6">
        <CardTitle>Plan</CardTitle>
        <CardDescription>
          Harbor covers the Northline workspace through the end of this cycle.
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Active</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-heading font-semibold text-title">
              {current.name}
            </p>
            <p className="mt-1 text-muted-foreground text-sm">
              {current.description}
            </p>
          </div>
          <p className="font-heading text-title tabular-nums">
            {currency.format(current.monthly)}
            <span className="ml-1 text-muted-foreground text-sm">/ month</span>
          </p>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground text-sm">Seats included</dt>
            <dd className="mt-1 font-medium tabular-nums">
              {current.seats === 0 ? "Unlimited" : current.seats}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">Renewal</dt>
            <dd className="mt-1 font-medium">Sep 1, 2026</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-sm">Billed to</dt>
            <dd className="mt-1 font-medium">Northline Ops</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Dialog onOpenChange={setCancelOpen} open={cancelOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto" variant="ghost">
              Cancel plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" showCloseButton>
            <DialogHeader>
              <DialogTitle>Cancel Harbor on Sep 1</DialogTitle>
              <DialogDescription>
                Coordinators keep access through Aug 31. After that, exception
                history stays readable and new dispatches pause.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button onClick={closeCancelDialog} variant="outline">
                Keep Harbor
              </Button>
              <Button onClick={handleCancelPlan} variant="destructive">
                Cancel plan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">Change plan</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg" showCloseButton>
            <DialogHeader>
              <DialogTitle>Move Northline to a different plan</DialogTitle>
              <DialogDescription>
                The new rate starts on the next charge. Unused Harbor days are
                credited automatically.
              </DialogDescription>
            </DialogHeader>
            <RadioGroup
              aria-labelledby={headingId}
              className="gap-3"
              onValueChange={handlePlanChange}
              value={selected}
            >
              <p className="sr-only" id={headingId}>
                Plans
              </p>
              {plans.map((plan) => (
                <Label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl p-4 font-normal ring-1 ring-foreground/10",
                    selected === plan.id && "ring-foreground/40"
                  )}
                  htmlFor={plan.id}
                  key={plan.id}
                >
                  <RadioGroupItem
                    className="mt-0.5"
                    id={plan.id}
                    value={plan.id}
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-medium">{plan.name}</span>
                      <span className="tabular-nums">
                        {currency.format(plan.monthly)}
                      </span>
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {plan.description}
                    </span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
            <div className="flex justify-end gap-2">
              <Button onClick={closePlanDialog} variant="outline">
                Back
              </Button>
              <Button onClick={handleConfirmPlan}>Use this plan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export interface UsageMetersProps {
  className?: string;
  meters?: UsageMeter[];
}

export function UsageMeters({
  className,
  meters = defaultMeters,
}: UsageMetersProps) {
  return (
    <Card className={cn("gap-0 py-0", className)}>
      <CardHeader className="border-b p-6">
        <CardTitle>Included this cycle</CardTitle>
        <CardDescription>
          Allotments reset on Sep 1. Overage posts to the next invoice unless
          you pause it below.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <ul className="flex flex-col">
          {meters.map((meter, index) => {
            const percent = meterPercent(meter.used, meter.included);
            const nearLimit = percent >= 80;
            return (
              <li key={meter.id}>
                {index > 0 ? <Separator /> : null}
                <div className="flex flex-col gap-3 px-4 py-5 sm:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{meter.label}</p>
                        {nearLimit ? (
                          <Badge variant="destructive">Near limit</Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-muted-foreground text-sm">
                        {meter.description}
                      </p>
                    </div>
                    <p className="font-medium text-sm tabular-nums">
                      {formatMeterValue(meter.used, meter.format)}
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        of {formatMeterValue(meter.included, meter.format)}
                      </span>
                    </p>
                  </div>
                  <Progress
                    aria-label={`${meter.label} ${percent} percent used`}
                    className="h-1.5"
                    value={percent}
                  />
                  {nearLimit ? (
                    <p className="text-muted-foreground text-xs">
                      {meter.overage}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

export interface PaymentMethodsProps {
  className?: string;
  methods?: PaymentMethod[];
  onAdd?: () => void;
  onSetDefault?: (id: string) => void;
}

export function PaymentMethods({
  className,
  methods = defaultMethods,
  onAdd,
  onSetDefault,
}: PaymentMethodsProps) {
  const handleSetDefault = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { methodId } = event.currentTarget.dataset;
      if (methodId) {
        onSetDefault?.(methodId);
      }
    },
    [onSetDefault]
  );

  return (
    <Card className={cn("gap-0 py-0", className)}>
      <CardHeader className="border-b p-6">
        <CardTitle>Payment methods</CardTitle>
        <CardDescription>
          Charges hit the default method on the first of each month.
        </CardDescription>
        <CardAction>
          <Button onClick={onAdd} size="sm" variant="outline">
            <PlusIcon data-icon="inline-start" />
            Add method
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <ul className="flex flex-col">
          {methods.map((method, index) => {
            const Icon =
              method.brand === "ACH" ? Building2Icon : CreditCardIcon;
            return (
              <li key={method.id}>
                {index > 0 ? <Separator /> : null}
                <div className="flex items-center gap-4 px-4 py-5 sm:px-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted text-muted-foreground">
                    <Icon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      {method.brand} · {method.last4}
                    </p>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {method.expiry}
                    </p>
                  </div>
                  {method.default ? (
                    <Badge variant="secondary">Default</Badge>
                  ) : (
                    <Button
                      data-method-id={method.id}
                      onClick={handleSetDefault}
                      size="sm"
                      variant="ghost"
                    >
                      Set as default
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

export interface InvoiceHistoryProps {
  className?: string;
  invoices?: BillingInvoice[];
  onDownload?: (id: string) => void;
}

export function InvoiceHistory({
  className,
  invoices = defaultInvoices,
  onDownload,
}: InvoiceHistoryProps) {
  const handleDownload = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const { invoiceId } = event.currentTarget.dataset;
      if (invoiceId) {
        onDownload?.(invoiceId);
      }
    },
    [onDownload]
  );

  return (
    <Card className={cn("gap-0 py-0", className)}>
      <CardHeader className="border-b p-6">
        <CardTitle>Invoices</CardTitle>
        <CardDescription>
          Receipts for Northline Ops. Failed charges retry on the default card.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {invoices.length === 0 ? (
          <Empty className="py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ReceiptTextIcon />
              </EmptyMedia>
              <EmptyTitle>No invoices yet</EmptyTitle>
              <EmptyDescription>
                The first Harbor receipt appears after Sep 1.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6">Invoice</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12 pr-6">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="px-6 font-medium">
                    {invoice.id}
                  </TableCell>
                  <TableCell>{invoice.issued}</TableCell>
                  <TableCell>
                    <Badge variant={invoiceTone(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {currency.format(invoice.amount)}
                  </TableCell>
                  <TableCell className="pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-label={`Actions for ${invoice.id}`}
                          size="icon-sm"
                          variant="ghost"
                        >
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            data-invoice-id={invoice.id}
                            onClick={handleDownload}
                          >
                            <DownloadIcon />
                            Download
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export interface SpendAlertsProps {
  className?: string;
  defaultCap?: boolean;
  defaultNotify?: boolean;
  onCapChange?: (enabled: boolean) => void;
  onNotifyChange?: (enabled: boolean) => void;
}

export function SpendAlerts({
  className,
  defaultCap = false,
  defaultNotify = true,
  onCapChange,
  onNotifyChange,
}: SpendAlertsProps) {
  const [notify, setNotify] = useState(defaultNotify);
  const [cap, setCap] = useState(defaultCap);
  const notifyId = useId();
  const capId = useId();

  const handleNotify = useCallback(
    (checked: boolean) => {
      setNotify(checked);
      onNotifyChange?.(checked);
    },
    [onNotifyChange]
  );

  const handleCap = useCallback(
    (checked: boolean) => {
      setCap(checked);
      onCapChange?.(checked);
    },
    [onCapChange]
  );

  return (
    <Card className={cn("gap-0 py-0", className)}>
      <CardHeader className="border-b p-6">
        <CardTitle>Spend alerts</CardTitle>
        <CardDescription>
          Get ahead of overage before it lands on the September invoice.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="flex items-start justify-between gap-4 py-5">
          <div className="min-w-0">
            <Label htmlFor={notifyId}>Email at 80% of any meter</Label>
            <p className="mt-1 text-muted-foreground text-sm">
              Sends to workspace billing contacts, not every coordinator.
            </p>
          </div>
          <Switch
            aria-label="Email at 80% of any meter"
            checked={notify}
            id={notifyId}
            onCheckedChange={handleNotify}
          />
        </div>
        <Separator />
        <div className="flex items-start justify-between gap-4 py-5">
          <div className="min-w-0">
            <Label htmlFor={capId}>Pause overages at the included cap</Label>
            <p className="mt-1 text-muted-foreground text-sm">
              Stops extra webhooks and tracking hours instead of billing them.
            </p>
          </div>
          <Switch
            aria-label="Pause overages at the included cap"
            checked={cap}
            id={capId}
            onCheckedChange={handleCap}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export interface BillingSettingsProps {
  className?: string;
  invoices?: BillingInvoice[];
  onAddPayment?: () => void;
  onCancelPlan?: () => void;
  onChangePlan?: (planId: PlanId) => void;
  onDownloadInvoice?: (id: string) => void;
  onSetDefaultPayment?: (id: string) => void;
}

export function BillingSettings({
  className,
  invoices,
  onAddPayment,
  onCancelPlan,
  onChangePlan,
  onDownloadInvoice,
  onSetDefaultPayment,
}: BillingSettingsProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-8",
        className
      )}
    >
      <header className="flex flex-col gap-1">
        <h1 className="font-heading font-semibold text-title sm:text-3xl">
          Billing
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Plan, cycle usage, and receipts for the Northline workspace.
        </p>
      </header>
      <BillingCycleStrip />
      <SubscriptionPlan onCancel={onCancelPlan} onChangePlan={onChangePlan} />
      <UsageMeters />
      <div className="grid gap-6 lg:grid-cols-2">
        <PaymentMethods
          onAdd={onAddPayment}
          onSetDefault={onSetDefaultPayment}
        />
        <SpendAlerts />
      </div>
      <InvoiceHistory invoices={invoices} onDownload={onDownloadInvoice} />
    </div>
  );
}
