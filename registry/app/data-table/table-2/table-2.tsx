/* biome-ignore-all lint/performance/noJsxPropsBind: Interactive table controls intentionally close over row state. */
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EllipsisIcon,
  EyeIcon,
  MailIcon,
  SearchIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type PaymentStatus = "Paid" | "Pending" | "Overdue" | "Refunded";
interface Invoice {
  amount: number;
  avatar: string;
  client: string;
  due: string;
  id: string;
  initials: string;
  method: string;
  project: string;
  status: PaymentStatus;
}
type SortKey = "client" | "due" | "amount";

const rows: Invoice[] = [
  [
    "INV-0041",
    "Miriam Okafor",
    "MO",
    "1",
    "Brand Refresh",
    4200,
    "Wire Transfer",
    "2026-06-30",
    "Pending",
  ],
  [
    "INV-0040",
    "Theo Hartmann",
    "TH",
    "12",
    "API Integration",
    1850,
    "Credit Card",
    "2026-06-15",
    "Paid",
  ],
  [
    "INV-0039",
    "Suki Nakamura",
    "SN",
    "5",
    "Dashboard UI",
    6500,
    "ACH",
    "2026-06-01",
    "Overdue",
  ],
  [
    "INV-0038",
    "Elias Ferreira",
    "EF",
    "3",
    "Mobile App MVP",
    9000,
    "Wire Transfer",
    "2026-05-28",
    "Paid",
  ],
  [
    "INV-0037",
    "Priya Menon",
    "PM",
    "9",
    "SEO Audit",
    780,
    "Credit Card",
    "2026-05-10",
    "Refunded",
  ],
  [
    "INV-0036",
    "Dmitri Volkov",
    "DV",
    "11",
    "Data Pipeline",
    3350,
    "ACH",
    "2026-04-25",
    "Paid",
  ],
  [
    "INV-0035",
    "Amara Diallo",
    "AD",
    "16",
    "Design System",
    5400,
    "Wire Transfer",
    "2026-06-22",
    "Pending",
  ],
  [
    "INV-0034",
    "Noah Bergström",
    "NB",
    "14",
    "Marketing Site",
    2100,
    "Credit Card",
    "2026-04-18",
    "Paid",
  ],
  [
    "INV-0033",
    "Lucia Romano",
    "LR",
    "20",
    "Onboarding Flow",
    3950,
    "ACH",
    "2026-05-31",
    "Overdue",
  ],
  [
    "INV-0032",
    "Kwame Mensah",
    "KM",
    "15",
    "Analytics Setup",
    1280,
    "Credit Card",
    "2026-04-09",
    "Paid",
  ],
  [
    "INV-0031",
    "Ingrid Larsen",
    "IL",
    "24",
    "Accessibility Pass",
    2650,
    "Wire Transfer",
    "2026-06-12",
    "Pending",
  ],
  [
    "INV-0030",
    "Mateo Castillo",
    "MC",
    "33",
    "Checkout Rebuild",
    7300,
    "ACH",
    "2026-03-30",
    "Refunded",
  ],
  [
    "INV-0029",
    "Yuki Tanaka",
    "YT",
    "26",
    "Email Templates",
    940,
    "Credit Card",
    "2026-03-22",
    "Paid",
  ],
  [
    "INV-0028",
    "Fatima Zahra",
    "FZ",
    "44",
    "Localization",
    4880,
    "Wire Transfer",
    "2026-05-19",
    "Overdue",
  ],
  [
    "INV-0027",
    "Oscar Lindqvist",
    "OL",
    "51",
    "CMS Migration",
    6150,
    "ACH",
    "2026-06-05",
    "Pending",
  ],
  [
    "INV-0026",
    "Hana Novak",
    "HN",
    "45",
    "Component Audit",
    1720,
    "Credit Card",
    "2026-03-14",
    "Paid",
  ],
  [
    "INV-0025",
    "Bilal Haddad",
    "BH",
    "59",
    "Search Revamp",
    5230,
    "Wire Transfer",
    "2026-05-02",
    "Overdue",
  ],
  [
    "INV-0024",
    "Sienna Walsh",
    "SW",
    "32",
    "Pricing Page",
    1360,
    "Credit Card",
    "2026-02-26",
    "Paid",
  ],
].map(
  ([id, client, initials, avatar, project, amount, method, due, status]) => ({
    amount: Number(amount),
    avatar: `https://i.pravatar.cc/80?img=${avatar}`,
    client: String(client),
    due: String(due),
    id: String(id),
    initials: String(initials),
    method: String(method),
    project: String(project),
    status: status as PaymentStatus,
  })
);

const money = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});
const date = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const statusConfig: Record<
  PaymentStatus,
  { variant: "default" | "secondary" | "destructive" | "outline"; dot: string }
> = {
  Overdue: { dot: "bg-destructive", variant: "destructive" },
  Paid: { dot: "bg-primary-foreground", variant: "default" },
  Pending: { dot: "bg-muted-foreground", variant: "secondary" },
  Refunded: { dot: "bg-muted-foreground", variant: "outline" },
};

function SortIcon({ direction }: { direction: "asc" | "desc" | undefined }) {
  if (direction === "asc") {
    return <ArrowUpIcon aria-hidden="true" />;
  }
  if (direction === "desc") {
    return <ArrowDownIcon aria-hidden="true" />;
  }
  return (
    <ArrowUpDownIcon aria-hidden="true" className="text-muted-foreground/60" />
  );
}

export interface Table2Props {
  className?: string;
}

export function Table2({ className }: Table2Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>(
    { direction: "desc", key: "due" }
  );
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const pageSize = 7;
  const filtered = useMemo(
    () =>
      rows
        .filter((invoice) =>
          invoice.client.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => {
          const result =
            sort.key === "amount"
              ? a.amount - b.amount
              : a[sort.key].localeCompare(b[sort.key]);
          return sort.direction === "asc" ? result : -result;
        }),
    [query, sort]
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleRows = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const pageIds = visibleRows.map((invoice) => invoice.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  let pageSelectionState: boolean | "indeterminate" = false;
  if (allPageSelected) {
    pageSelectionState = true;
  } else if (selected.size > 0 && pageIds.some((id) => selected.has(id))) {
    pageSelectionState = "indeterminate";
  }
  const selectedCount = filtered.filter((invoice) =>
    selected.has(invoice.id)
  ).length;
  const outstanding = rows
    .filter(
      (invoice) => invoice.status === "Pending" || invoice.status === "Overdue"
    )
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const toggleSort = (key: SortKey) =>
    setSort((current) => ({
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
      key,
    }));
  const togglePageSelection = (checked: boolean) =>
    setSelected((current) => {
      const next = new Set(current);
      for (const id of pageIds) {
        if (checked) {
          next.add(id);
        } else {
          next.delete(id);
        }
      }
      return next;
    });

  return (
    <section
      className={cn(
        "flex min-h-svh w-full items-start justify-center bg-background px-6 py-12 text-foreground [&_svg]:size-3.5",
        className
      )}
    >
      <div className="w-full max-w-3xl">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-widest">
              Acme Inc.
            </p>
            <h1 className="font-heading font-semibold text-xl tracking-tight">
              Invoices
            </h1>
            <p className="text-muted-foreground text-sm">
              Recent billing activity across all client projects.
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Outstanding
            </span>
            <span className="font-semibold text-lg tabular-nums">
              {money.format(outstanding)}
            </span>
          </div>
        </div>
        <Separator className="my-5" />
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="relative">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              aria-label="Filter invoices by client"
              className="w-52 pl-8 text-sm"
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Filter by client..."
              type="search"
              value={query}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "Result" : "Results"}
          </p>
        </div>
        {selectedCount > 0 && (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5">
            <span className="font-medium text-sm">
              {selectedCount} Selected
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  toast("Download started", {
                    description: `Preparing ${selectedCount} invoices as PDF.`,
                  })
                }
                size="sm"
                variant="outline"
              >
                <DownloadIcon data-icon="inline-start" />
                Download
              </Button>
              <Button
                onClick={() =>
                  toast("Reminders sent", {
                    description: `Payment reminders sent for ${selectedCount} invoices.`,
                  })
                }
                size="sm"
                variant="outline"
              >
                <MailIcon data-icon="inline-start" />
                Send reminder
              </Button>
              <Button
                onClick={() =>
                  toast("Marked as paid", {
                    description: `${selectedCount} invoices marked as paid.`,
                  })
                }
                size="sm"
                variant="outline"
              >
                <CheckIcon data-icon="inline-start" />
                Mark as paid
              </Button>
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-10 pl-4">
                  <Checkbox
                    aria-label="Select all invoices on this page"
                    checked={pageSelectionState === true}
                    indeterminate={pageSelectionState === "indeterminate"}
                    onCheckedChange={(checked) =>
                      togglePageSelection(checked === true)
                    }
                  />
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase">
                  Invoice
                </TableHead>
                <TableHead>
                  <Button
                    className="h-auto p-0 font-semibold text-xs uppercase"
                    onClick={() => toggleSort("client")}
                    variant="ghost"
                  >
                    Client{" "}
                    <SortIcon
                      direction={
                        sort.key === "client" ? sort.direction : undefined
                      }
                    />
                  </Button>
                </TableHead>
                <TableHead className="hidden font-semibold text-xs uppercase sm:table-cell">
                  Project
                </TableHead>
                <TableHead className="hidden font-semibold text-xs uppercase md:table-cell">
                  Method
                </TableHead>
                <TableHead className="hidden font-semibold text-xs uppercase md:table-cell">
                  <Button
                    className="h-auto p-0"
                    onClick={() => toggleSort("due")}
                    variant="ghost"
                  >
                    Due{" "}
                    <SortIcon
                      direction={
                        sort.key === "due" ? sort.direction : undefined
                      }
                    />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-xs uppercase">
                  Status
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    className="h-auto p-0 font-semibold text-xs uppercase"
                    onClick={() => toggleSort("amount")}
                    variant="ghost"
                  >
                    Amount{" "}
                    <SortIcon
                      direction={
                        sort.key === "amount" ? sort.direction : undefined
                      }
                    />
                  </Button>
                </TableHead>
                <TableHead className="w-10 pr-4">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.length > 0 ? (
                visibleRows.map((invoice) => {
                  const config = statusConfig[invoice.status];
                  return (
                    <TableRow
                      className="border-border/60 transition-colors hover:bg-muted/30"
                      data-state={
                        selected.has(invoice.id) ? "selected" : undefined
                      }
                      key={invoice.id}
                    >
                      <TableCell className="pl-4">
                        <Checkbox
                          aria-label={`Select ${invoice.id}`}
                          checked={selected.has(invoice.id)}
                          onCheckedChange={(checked) =>
                            setSelected((current) => {
                              const next = new Set(current);
                              if (checked) {
                                next.add(invoice.id);
                              } else {
                                next.delete(invoice.id);
                              }
                              return next;
                            })
                          }
                        />
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground text-xs">
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex min-w-0 items-center gap-2.5">
                          <Avatar
                            className="shrink-0 border border-border"
                            size="sm"
                          >
                            <AvatarImage
                              alt=""
                              className="grayscale"
                              src={invoice.avatar}
                            />
                            <AvatarFallback>{invoice.initials}</AvatarFallback>
                          </Avatar>
                          <span className="truncate font-medium text-sm">
                            {invoice.client}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden max-w-[140px] truncate text-muted-foreground text-sm sm:table-cell">
                        {invoice.project}
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground text-sm md:table-cell">
                        {invoice.method}
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground text-sm tabular-nums md:table-cell">
                        {date.format(new Date(invoice.due))}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="gap-1.5 font-medium text-[11px]"
                          variant={config.variant}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "inline-block size-1.5 shrink-0",
                              config.dot
                            )}
                          />
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-sm tabular-nums">
                        {money.format(invoice.amount)}
                      </TableCell>
                      <TableCell className="pr-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                aria-label={`Actions for ${invoice.id}`}
                                size="icon-sm"
                                variant="ghost"
                              />
                            }
                          >
                            <EllipsisIcon />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <EyeIcon data-icon="inline-start" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <DownloadIcon data-icon="inline-start" />
                              Download
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center text-muted-foreground text-sm"
                    colSpan={9}
                  >
                    No invoices match your filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between gap-4 border-border border-t bg-muted/20 px-4 py-2.5">
            <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              {filtered.length} invoices
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                aria-label="Previous page"
                className="size-7"
                disabled={page === 0}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                size="icon"
                variant="outline"
              >
                <ChevronLeftIcon />
              </Button>
              <span className="px-1 text-muted-foreground text-xs tabular-nums">
                Page {page + 1} of {pageCount}
              </span>
              <Button
                aria-label="Next page"
                className="size-7"
                disabled={page >= pageCount - 1}
                onClick={() =>
                  setPage((current) => Math.min(pageCount - 1, current + 1))
                }
                size="icon"
                variant="outline"
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Figures shown in USD. Last updated Jun 17, 2026.
        </p>
      </div>
      <Toaster />
    </section>
  );
}
