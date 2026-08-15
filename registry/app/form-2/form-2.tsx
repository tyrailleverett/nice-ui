/* biome-ignore-all lint/performance/noJsxPropsBind: Line items and invoice fields close over row ids. */
import {
  Building2Icon,
  CircleAlertIcon,
  DollarSignIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  FieldHint,
  FormPage,
  StatusBadge,
} from "@/components/app/forms-shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const CURRENCIES = ["USD", "EUR", "GBP"] as const;
const TERMS = ["Due on receipt", "Net 14", "Net 30"] as const;
const COLLECTIONS = ["ACH transfer", "Card on file", "Wire"] as const;
const CATALOG = [
  "Implementation retainer",
  "Priority support block",
  "Design audit",
  "Workshop day",
] as const;
const TAX_RATES = [
  { label: "No tax", value: "0" },
  { label: "8.25%", value: "8.25" },
  { label: "10%", value: "10" },
] as const;

interface LineItem {
  id: string;
  item: string;
  qty: number;
  rate: number;
  tax: string;
}

const money = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const lineAmount = (row: LineItem) => row.qty * row.rate;

export interface Form2Props {
  className?: string;
}

export function Form2({ className }: Form2Props) {
  const [customer, setCustomer] = useState("Orchid Ledger Group");
  const [taxId, setTaxId] = useState("US-88-2947135");
  const [invoiceNumber, setInvoiceNumber] = useState("# INV-2048");
  const [poReference, setPoReference] = useState("PO-7418");
  const [issueDate, setIssueDate] = useState("2026-04-23");
  const [dueDate, setDueDate] = useState("2026-05-07");
  const [currency, setCurrency] = useState("USD");
  const [terms, setTerms] = useState("Net 14");
  const [collection, setCollection] = useState("ACH transfer");
  const [address, setAddress] = useState(
    "14 Warren Street, Suite 620, New York, NY"
  );
  const [lines, setLines] = useState<LineItem[]>([
    {
      id: "line-1",
      item: "Implementation retainer",
      qty: 1,
      rate: 4800,
      tax: "8.25",
    },
    {
      id: "line-2",
      item: "Priority support block",
      qty: 2,
      rate: 950,
      tax: "0",
    },
  ]);

  const updateLine = (id: string, patch: Partial<LineItem>) => {
    setLines((current) =>
      current.map((row) => (row.id === id ? { ...row, ...patch } : row))
    );
  };

  const itemCount = lines.length;
  const itemLabel = useMemo(
    () => `${itemCount} ${itemCount === 1 ? "item" : "items"}`,
    [itemCount]
  );

  return (
    <FormPage className={className}>
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-title">Invoice Details</CardTitle>
          <CardDescription>
            Customer, terms, items, and payment notes.
          </CardDescription>
          <CardAction className="flex items-center gap-2">
            <StatusBadge icon={CircleAlertIcon} tone="warning">
              Draft
            </StatusBadge>
            <StatusBadge>{currency}</StatusBadge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 py-6">
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading font-semibold text-lg">Customer</h2>
                <StatusBadge tone="success">Required</StatusBadge>
              </div>
              <p className="text-muted-foreground text-sm">
                Billable account and invoice reference.
              </p>
            </div>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="invoice-customer">
                    Customer
                    <FieldHint label="The billable studio or company on this invoice." />
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="invoice-customer"
                      onChange={(event) => setCustomer(event.target.value)}
                      value={customer}
                    />
                    {customer ? (
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          aria-label="Clear customer"
                          onClick={() => setCustomer("")}
                          size="icon-xs"
                        >
                          <XIcon />
                        </InputGroupButton>
                      </InputGroupAddon>
                    ) : null}
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="tax-id">
                    Tax ID
                    <FieldHint label="Shown on the PDF and in tax exports." />
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Building2Icon />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="tax-id"
                      onChange={(event) => setTaxId(event.target.value)}
                      value={taxId}
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="invoice-number">
                    Invoice Number
                    <FieldHint label="Auto-assigned, but you can override it before sending." />
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="invoice-number"
                      onChange={(event) => setInvoiceNumber(event.target.value)}
                      value={invoiceNumber}
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="po-reference">PO Reference</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="po-reference"
                      onChange={(event) => setPoReference(event.target.value)}
                      value={poReference}
                    />
                  </InputGroup>
                </Field>
              </div>
            </FieldGroup>
          </section>

          <Separator />

          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading font-semibold text-lg">Terms</h2>
                <StatusBadge tone="accent">{terms}</StatusBadge>
              </div>
              <p className="text-muted-foreground text-sm">
                Dates, currency, and collection method.
              </p>
            </div>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-3">
                <Field>
                  <FieldLabel htmlFor="issue-date">Issue Date</FieldLabel>
                  <Input
                    id="issue-date"
                    onChange={(event) => setIssueDate(event.target.value)}
                    type="date"
                    value={issueDate}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="due-date">Due Date</FieldLabel>
                  <Input
                    id="due-date"
                    onChange={(event) => setDueDate(event.target.value)}
                    type="date"
                    value={dueDate}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="currency">Currency</FieldLabel>
                  <Select onValueChange={setCurrency} value={currency}>
                    <SelectTrigger className="w-full" id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {CURRENCIES.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="payment-terms">Payment Terms</FieldLabel>
                  <Select onValueChange={setTerms} value={terms}>
                    <SelectTrigger className="w-full" id="payment-terms">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {TERMS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="collection">Collection</FieldLabel>
                  <Select onValueChange={setCollection} value={collection}>
                    <SelectTrigger className="w-full" id="collection">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {COLLECTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="billing-address">
                    Billing Address
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="billing-address"
                      onChange={(event) => setAddress(event.target.value)}
                      value={address}
                    />
                  </InputGroup>
                </Field>
              </div>
            </FieldGroup>
          </section>

          <Separator />

          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading font-semibold text-lg">
                    Line Items
                  </h2>
                  <StatusBadge>{itemLabel}</StatusBadge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Products, services, quantity, tax, and amount.
                </p>
              </div>
              <Button
                onClick={() =>
                  setLines((current) => [
                    ...current,
                    {
                      id: `line-${crypto.randomUUID()}`,
                      item: "Design audit",
                      qty: 1,
                      rate: 0,
                      tax: "0",
                    },
                  ])
                }
                type="button"
                variant="outline"
              >
                <PlusIcon data-icon="inline-start" />
                Add item
              </Button>
            </div>

            <div className="hidden grid-cols-[minmax(0,1.6fr)_4.5rem_7rem_7rem_6.5rem_2.5rem] gap-2 px-1 text-muted-foreground text-xs md:grid">
              <span>Item</span>
              <span>Qty</span>
              <span>Rate</span>
              <span>Tax</span>
              <span>Amount</span>
              <span className="sr-only">Remove</span>
            </div>

            <div className="flex flex-col gap-4">
              {lines.map((row) => (
                <div
                  className="grid items-end gap-2 md:grid-cols-[minmax(0,1.6fr)_4.5rem_7rem_7rem_6.5rem_2.5rem]"
                  key={row.id}
                >
                  <Field>
                    <FieldLabel
                      className="md:sr-only"
                      htmlFor={`${row.id}-item`}
                    >
                      Item
                    </FieldLabel>
                    <div className="flex items-center gap-1">
                      <Select
                        onValueChange={(value) =>
                          updateLine(row.id, { item: value })
                        }
                        value={row.item}
                      >
                        <SelectTrigger className="w-full" id={`${row.id}-item`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {CATALOG.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FieldHint label={`${row.item} description and scope.`} />
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel
                      className="md:sr-only"
                      htmlFor={`${row.id}-qty`}
                    >
                      Qty
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id={`${row.id}-qty`}
                        min={1}
                        onChange={(event) =>
                          updateLine(row.id, {
                            qty: Number(event.target.value),
                          })
                        }
                        type="number"
                        value={row.qty}
                      />
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel
                      className="md:sr-only"
                      htmlFor={`${row.id}-rate`}
                    >
                      Rate
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>
                          <DollarSignIcon />
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        id={`${row.id}-rate`}
                        min={0}
                        onChange={(event) =>
                          updateLine(row.id, {
                            rate: Number(event.target.value),
                          })
                        }
                        type="number"
                        value={row.rate}
                      />
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel
                      className="md:sr-only"
                      htmlFor={`${row.id}-tax`}
                    >
                      Tax
                    </FieldLabel>
                    <Select
                      onValueChange={(value) =>
                        updateLine(row.id, { tax: value })
                      }
                      value={row.tax}
                    >
                      <SelectTrigger className="w-full" id={`${row.id}-tax`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {TAX_RATES.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <p className="pb-2 font-medium">
                    {money.format(lineAmount(row))}
                  </p>
                  <Button
                    aria-label={`Remove ${row.item}`}
                    className="mb-1"
                    disabled={lines.length === 1}
                    onClick={() =>
                      setLines((current) =>
                        current.filter((item) => item.id !== row.id)
                      )
                    }
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </FormPage>
  );
}
