import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  RotateCcw,
  Search,
  Settings2,
  Webhook,
  XCircle,
} from "lucide-react";
import {
  type ChangeEvent,
  type MouseEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DeliveryStatus = "Success" | "Failed" | "Retrying";
type Filter = "All" | DeliveryStatus;

interface Delivery {
  code: string;
  createdAt: string;
  event: string;
  id: string;
  request: string;
  response: string;
  status: DeliveryStatus;
  timing: string;
}

const deliveries: Delivery[] = [
  {
    code: "500",
    createdAt: "Today, 14:32:08",
    event: "invoice.payment_failed",
    id: "dlv_01J8QK3F",
    request: `POST /hooks/billing\ncontent-type: application/json\nx-request-id: req_01J8QK3F\n\n{\n  "id": "in_01J8QK3F",\n  "customer": "cus_8d92",\n  "attempt": 3\n}`,
    response: `HTTP/1.1 500 Internal Server Error\ncontent-type: application/json\n\n{\n  "error": "upstream_timeout",\n  "retry_after": 60\n}`,
    status: "Failed",
    timing: "1.24s",
  },
  {
    code: "200",
    createdAt: "Today, 14:31:44",
    event: "customer.updated",
    id: "dlv_01J8QJ91",
    request: `POST /hooks/billing\ncontent-type: application/json\nx-request-id: req_01J8QJ91\n\n{\n  "id": "cus_8d92",\n  "changed": ["email"]\n}`,
    response: `HTTP/1.1 200 OK\ncontent-type: application/json\n\n{\n  "received": true\n}`,
    status: "Success",
    timing: "182ms",
  },
  {
    code: "204",
    createdAt: "Today, 14:29:12",
    event: "checkout.session.completed",
    id: "dlv_01J8QH7A",
    request: `POST /hooks/billing\ncontent-type: application/json\nx-request-id: req_01J8QH7A\n\n{\n  "id": "cs_01J8QH7A",\n  "mode": "subscription"\n}`,
    response: "HTTP/1.1 204 No Content\n\n",
    status: "Success",
    timing: "96ms",
  },
  {
    code: "429",
    createdAt: "Today, 14:26:55",
    event: "invoice.created",
    id: "dlv_01J8QG2M",
    request: `POST /hooks/billing\ncontent-type: application/json\nx-request-id: req_01J8QG2M\n\n{\n  "id": "in_01J8QG2M",\n  "amount_due": 12900\n}`,
    response: `HTTP/1.1 429 Too Many Requests\nretry-after: 30\n\n{\n  "error": "rate_limited"\n}`,
    status: "Retrying",
    timing: "420ms",
  },
  {
    code: "200",
    createdAt: "Today, 14:24:19",
    event: "subscription.updated",
    id: "dlv_01J8QF4B",
    request: `POST /hooks/billing\ncontent-type: application/json\nx-request-id: req_01J8QF4B\n\n{\n  "id": "sub_01J8QF4B",\n  "status": "active"\n}`,
    response: `HTTP/1.1 200 OK\ncontent-type: application/json\n\n{\n  "received": true\n}`,
    status: "Success",
    timing: "210ms",
  },
];

const statusStyles: Record<DeliveryStatus, string> = {
  Failed: "border-destructive/20 bg-destructive/10 text-destructive",
  Retrying: "border-info/20 bg-info/10 text-info",
  Success: "border-success/20 bg-success/10 text-success",
};

function StatusIcon({ status }: { status: DeliveryStatus }) {
  if (status === "Failed") {
    return <XCircle aria-hidden="true" className="size-4" />;
  }
  if (status === "Retrying") {
    return <RotateCcw aria-hidden="true" className="size-4" />;
  }
  return <CheckCircle2 aria-hidden="true" className="size-4" />;
}

function DeliveryStatusBadge({ status }: { status: DeliveryStatus }) {
  return (
    <Badge className={statusStyles[status]} variant="outline">
      <StatusIcon status={status} />
      {status}
    </Badge>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className="overflow-hidden border border-border bg-muted/30">
      <div className="flex items-center justify-between border-border border-b px-3 py-2">
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
          {label}
        </span>
        <Button aria-label={`Copy ${label}`} size="icon-xs" variant="ghost">
          <Copy data-icon="inline-start" />
        </Button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[11px] text-foreground leading-5">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function WebhookDeliveries() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(deliveries[0].id);

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
    []
  );
  const handleFilterChange = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const nextFilter = event.currentTarget.dataset.filter;
      if (
        nextFilter === "All" ||
        nextFilter === "Success" ||
        nextFilter === "Failed" ||
        nextFilter === "Retrying"
      ) {
        setFilter(nextFilter);
      }
    },
    []
  );
  const handleDeliverySelect = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { deliveryId } = event.currentTarget.dataset;
      if (deliveryId) {
        setSelectedId(deliveryId);
      }
    },
    []
  );

  const visibleDeliveries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return deliveries.filter((delivery) => {
      const matchesFilter = filter === "All" || delivery.status === filter;
      const matchesQuery =
        !normalizedQuery ||
        delivery.event.toLowerCase().includes(normalizedQuery) ||
        delivery.id.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const selectedDelivery =
    deliveries.find((delivery) => delivery.id === selectedId) ?? deliveries[0];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="flex flex-col gap-5 border-border border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex size-9 items-center justify-center border border-border bg-muted/40">
              <Webhook aria-hidden="true" className="size-4" />
            </div>
            <div>
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.16em]">
                Developer tools / Webhooks
              </p>
              <h1 className="mt-1 font-heading font-semibold text-2xl tracking-tight">
                Webhook deliveries
              </h1>
              <p className="mt-1 text-muted-foreground text-sm">
                Inspect, replay, and troubleshoot requests sent to your
                endpoint.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings2 data-icon="inline-start" /> Endpoint settings
            </Button>
            <Button>
              <ArrowUpRight data-icon="inline-start" /> View docs
            </Button>
          </div>
        </header>

        <section
          aria-label="Endpoint summary"
          className="grid border-border border-b sm:grid-cols-3"
        >
          <div className="flex items-center gap-3 border-border border-b py-5 sm:border-r sm:border-b-0 sm:pr-6">
            <span className="size-2 rounded-full bg-success" />
            <div>
              <p className="text-muted-foreground text-xs">Endpoint</p>
              <p className="mt-0.5 font-mono text-sm">billing-events</p>
            </div>
            <Badge
              className="ml-auto border-success/20 bg-success/10 text-success"
              variant="outline"
            >
              Healthy
            </Badge>
          </div>
          <div className="border-border border-b py-5 sm:border-r sm:border-b-0 sm:px-6">
            <p className="text-muted-foreground text-xs">Delivery health</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-semibold text-2xl tracking-tight">
                99.82%
              </span>
              <span className="text-success text-xs">+0.14% this week</span>
            </div>
          </div>
          <div className="py-5 sm:pl-6">
            <p className="text-muted-foreground text-xs">Endpoint URL</p>
            <p className="mt-1 truncate font-mono text-foreground/80 text-sm">
              api.northstar.dev/hooks/billing
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Last checked 12 seconds ago
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-0 border border-border lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
          <section aria-labelledby="recent-deliveries" className="min-w-0">
            <div className="flex flex-col gap-4 border-border border-b p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2
                    className="font-heading font-semibold text-base"
                    id="recent-deliveries"
                  >
                    Recent deliveries
                  </h2>
                  <p className="mt-1 text-muted-foreground text-xs">
                    {visibleDeliveries.length} of {deliveries.length} deliveries
                    shown
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Clock3 aria-hidden="true" className="size-3.5" /> Live stream
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    aria-hidden="true"
                    className="absolute top-2.5 left-2.5 size-4 text-muted-foreground"
                  />
                  <Input
                    aria-label="Search deliveries"
                    className="pl-8"
                    onChange={handleQueryChange}
                    placeholder="Search event or delivery ID"
                    value={query}
                  />
                </div>
                <fieldset className="flex border border-border p-0.5">
                  <legend className="sr-only">Filter deliveries</legend>
                  {(["All", "Success", "Failed", "Retrying"] as Filter[]).map(
                    (option) => (
                      <button
                        aria-pressed={filter === option}
                        className={cn(
                          "px-2.5 py-1.5 text-xs transition-colors",
                          filter === option
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        data-filter={option}
                        key={option}
                        onClick={handleFilterChange}
                        type="button"
                      >
                        {option}
                      </button>
                    )
                  )}
                </fieldset>
              </div>
            </div>
            <div className="divide-y divide-border">
              {visibleDeliveries.map((delivery) => (
                <button
                  aria-label={`Inspect ${delivery.event}, ${delivery.status}`}
                  className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/40 sm:px-5 ${selectedDelivery.id === delivery.id ? "bg-muted/40" : ""}`}
                  data-delivery-id={delivery.id}
                  key={delivery.id}
                  onClick={handleDeliverySelect}
                  type="button"
                >
                  <div className="shrink-0">
                    <DeliveryStatusBadge status={delivery.status} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-foreground text-xs">
                      {delivery.event}
                    </p>
                    <p className="mt-1 truncate text-muted-foreground text-xs">
                      {delivery.id} · {delivery.createdAt}
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="font-mono text-foreground text-xs">
                      {delivery.code}
                    </p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      {delivery.timing}
                    </p>
                  </div>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground"
                  />
                </button>
              ))}
            </div>
          </section>

          <aside
            aria-labelledby="delivery-inspector"
            className="border-border border-t bg-muted/10 lg:border-t-0 lg:border-l"
          >
            <div className="flex items-start justify-between gap-3 border-border border-b p-4 sm:p-5">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
                  Delivery inspector
                </p>
                <h2
                  className="mt-1 truncate font-heading font-semibold text-base"
                  id="delivery-inspector"
                >
                  {selectedDelivery.event}
                </h2>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {selectedDelivery.id}
                </p>
              </div>
              <DeliveryStatusBadge status={selectedDelivery.status} />
            </div>
            <div className="flex flex-col gap-5 p-4 sm:p-5">
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Response</p>
                  <p className="mt-1 font-medium font-mono">
                    {selectedDelivery.code}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Timing</p>
                  <p className="mt-1 font-medium font-mono">
                    {selectedDelivery.timing}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Attempt</p>
                  <p className="mt-1 font-medium font-mono">3 of 5</p>
                </div>
              </div>
              <Separator />
              <CodeBlock code={selectedDelivery.request} label="Request" />
              <CodeBlock code={selectedDelivery.response} label="Response" />
              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  <RotateCcw data-icon="inline-start" /> Retry delivery
                </Button>
                <Button
                  aria-label="Open endpoint settings"
                  size="icon"
                  variant="outline"
                >
                  <Settings2 data-icon="inline-start" />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
