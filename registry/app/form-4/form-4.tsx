import {
  CircleHelpIcon,
  ExternalLinkIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  ShieldCheckIcon,
  StarIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  FieldHint,
  FormHeading,
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function DetailRow({
  hint,
  label,
  value,
  valueHint,
}: {
  hint?: string;
  label: string;
  value: ReactNode;
  valueHint?: string;
}) {
  return (
    <div className="grid gap-2 py-3 sm:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)] sm:items-start">
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <span>{label}</span>
        {hint ? <FieldHint label={hint} /> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {value}
        {valueHint ? <FieldHint label={valueHint} /> : null}
      </div>
    </div>
  );
}

export interface Form4Props {
  className?: string;
}

export function Form4({ className }: Form4Props) {
  return (
    <FormPage className={cn("max-w-4xl", className)}>
      <FormHeading
        action={
          <Button type="button" variant="outline">
            <CircleHelpIcon data-icon="inline-start" />
            Contact support
          </Button>
        }
        description="Review submitted profile details before approval."
        title="Business Verification"
      />

      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>Legal identity and address.</CardDescription>
          <CardAction>
            <Button type="button" variant="outline">
              <PencilIcon data-icon="inline-start" />
              Edit
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl ring-1 ring-foreground/10">
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Cedar & Volt Studio LLC</p>
                <p className="text-muted-foreground text-sm">
                  Domain confirmed for review.
                </p>
              </div>
              <StatusBadge icon={ShieldCheckIcon} tone="success">
                Verified domain
              </StatusBadge>
            </div>
            <Separator />
            <div className="px-4">
              <DetailRow
                hint="Public site used to confirm the legal entity."
                label="URL"
                value={
                  <a
                    className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                    href="https://cedarvolt.studio"
                    rel="noopener"
                    target="_blank"
                  >
                    cedarvolt.studio
                    <ExternalLinkIcon />
                  </a>
                }
                valueHint="Opens the confirmed studio domain."
              />
              <Separator />
              <DetailRow
                hint="Registered mailing address for the LLC."
                label="Address"
                value="418 Market Street, Floor 6, Portland, OR 97205, United States"
              />
              <Separator />
              <DetailRow
                hint="Entity type filed with the state."
                label="Business type"
                value="Limited liability company"
              />
              <Separator />
              <DetailRow
                label="Other information provided"
                value="US EIN ending 2146, Digital services, Product description"
                valueHint="EIN is truncated for this review screen."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Public Details</CardTitle>
          <CardDescription>Customer-facing profile.</CardDescription>
          <CardAction>
            <Button type="button" variant="outline">
              <PencilIcon data-icon="inline-start" />
              Edit
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl ring-1 ring-foreground/10">
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Customer Support Information</p>
                <p className="text-muted-foreground text-sm">
                  Receipt and invoice profile.
                </p>
              </div>
              <StatusBadge icon={EyeIcon} tone="accent">
                Customer visible
              </StatusBadge>
            </div>
            <Separator />
            <div className="px-4">
              <DetailRow
                hint="Name printed on receipts and hosted invoices."
                label="Business name"
                value={
                  <>
                    <span>Cedar & Volt Studio</span>
                    <StatusBadge>Stripe</StatusBadge>
                  </>
                }
              />
              <Separator />
              <DetailRow label="Support phone" value="+1 503 555 0184" />
              <Separator />
              <DetailRow
                label="Support email"
                value="support@cedarvolt.studio"
                valueHint="Used for receipt replies and dispute mail."
              />
              <Separator />
              <DetailRow
                hint="Short name that appears on bank statements."
                label="Statement descriptor"
                value={
                  <>
                    <span>CEDARVOLT.STUDIO</span>
                    <StatusBadge>PayPal</StatusBadge>
                  </>
                }
              />
              <Separator />
              <DetailRow
                label="Also provided"
                value="Business website, Support URL, Customer support note"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Management and Ownership</CardTitle>
          <CardDescription>
            People authorized to represent the business.
          </CardDescription>
          <CardAction className="flex items-center gap-2">
            <Button type="button" variant="outline">
              <PlusIcon data-icon="inline-start" />
              Add owner
            </Button>
            <Button type="button" variant="outline">
              <PencilIcon data-icon="inline-start" />
              Edit
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-3 rounded-xl p-4 ring-1 ring-foreground/10">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Mira Coleman</p>
              <p className="text-muted-foreground text-sm">
                Account representative
              </p>
            </div>
            <StatusBadge icon={StarIcon}>Primary</StatusBadge>
          </div>
        </CardContent>
      </Card>
    </FormPage>
  );
}
