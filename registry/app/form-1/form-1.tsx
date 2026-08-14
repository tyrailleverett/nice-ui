/* biome-ignore-all lint/performance/noJsxPropsBind: Form controls close over field keys and draft status. */
import {
  BoxIcon,
  CircleCheckIcon,
  LinkIcon,
  PlusIcon,
  SaveIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useState } from "react";
import {
  FieldHint,
  FormPage,
  FormRow,
  StatusBadge,
} from "@/components/app/forms-shared";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const OFFER_TYPES = [
  "Product bundle",
  "Single product",
  "Subscription",
] as const;
const BUTTON_COPY = ["Reserve access", "Pay now", "Complete purchase"] as const;
const HANDOFFS = [
  "Show confirmation",
  "Redirect immediately",
  "Start onboarding",
] as const;

const checkoutStatusLabel = {
  draft: "Draft",
  published: "Published",
  ready: "Ready to publish",
} as const;

export interface Form1Props {
  className?: string;
}

export function Form1({ className }: Form1Props) {
  const [offerType, setOfferType] = useState<string>("Product bundle");
  const [buttonCopy, setButtonCopy] = useState<string>("Reserve access");
  const [handoff, setHandoff] = useState<string>("Show confirmation");
  const [returnUrl, setReturnUrl] = useState(
    "https://northstar.studio/welcome"
  );
  const [status, setStatus] = useState<"draft" | "ready" | "published">(
    "ready"
  );
  const [customer, setCustomer] = useState({
    address: false,
    company: false,
    name: true,
  });
  const [rules, setRules] = useState({
    authorization: true,
    phone: false,
    purchaseLimit: false,
  });
  const [receipt, setReceipt] = useState({
    branded: true,
    followUp: false,
    terms: false,
  });

  return (
    <FormPage className={cn("max-w-3xl", className)}>
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="font-heading text-2xl">
            Checkout Setup
          </CardTitle>
          <CardDescription>Hosted checkout settings.</CardDescription>
          <CardAction>
            <StatusBadge
              icon={status === "draft" ? undefined : CircleCheckIcon}
              tone={status === "draft" ? "warning" : "success"}
            >
              {checkoutStatusLabel[status]}
            </StatusBadge>
          </CardAction>
        </CardHeader>
        <CardContent className="py-6">
          <FieldGroup>
            <FormRow
              label={
                <>
                  Offer Type
                  <FieldHint label="Choose how the hosted checkout packages this sale." />
                </>
              }
            >
              <Select onValueChange={setOfferType} value={offerType}>
                <SelectTrigger className="w-full" id="offer-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {OFFER_TYPES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormRow>

            <FormRow label="Offer">
              <div className="flex flex-col items-start gap-2">
                <InputGroup>
                  <InputGroupAddon>
                    <BoxIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-label="Offer"
                    defaultValue="Growth seat bundle"
                    id="offer"
                    readOnly
                  />
                </InputGroup>
                <Button size="sm" type="button" variant="ghost">
                  <PlusIcon data-icon="inline-start" />
                  Add add-ons
                </Button>
              </div>
            </FormRow>

            <FormRow label="Customer Details">
              <FieldSet>
                <FieldGroup className="gap-3">
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={customer.name}
                      id="collect-name"
                      onCheckedChange={(checked) =>
                        setCustomer((current) => ({
                          ...current,
                          name: checked === true,
                        }))
                      }
                    />
                    <FieldLabel className="font-normal" htmlFor="collect-name">
                      Collect customer name
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={customer.company}
                      id="company-name"
                      onCheckedChange={(checked) =>
                        setCustomer((current) => ({
                          ...current,
                          company: checked === true,
                        }))
                      }
                    />
                    <FieldLabel className="font-normal" htmlFor="company-name">
                      Ask for company name
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={customer.address}
                      id="delivery-address"
                      onCheckedChange={(checked) =>
                        setCustomer((current) => ({
                          ...current,
                          address: checked === true,
                        }))
                      }
                    />
                    <FieldLabel
                      className="font-normal"
                      htmlFor="delivery-address"
                    >
                      Collect delivery address
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FormRow>

            <FormRow label="Checkout Rules">
              <FieldSet>
                <FieldGroup className="gap-3">
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={rules.authorization}
                      id="managed-auth"
                      onCheckedChange={(checked) =>
                        setRules((current) => ({
                          ...current,
                          authorization: checked === true,
                        }))
                      }
                    />
                    <FieldLabel className="font-normal" htmlFor="managed-auth">
                      Run managed authorization
                      <FieldHint label="Northstar authorizes the payment before the seat is reserved." />
                      <StatusBadge tone="success">Live</StatusBadge>
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={rules.purchaseLimit}
                      id="purchase-limit"
                      onCheckedChange={(checked) =>
                        setRules((current) => ({
                          ...current,
                          purchaseLimit: checked === true,
                        }))
                      }
                    />
                    <FieldLabel
                      className="font-normal"
                      htmlFor="purchase-limit"
                    >
                      Limit completed purchases
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={rules.phone}
                      id="phone-verification"
                      onCheckedChange={(checked) =>
                        setRules((current) => ({
                          ...current,
                          phone: checked === true,
                        }))
                      }
                    />
                    <FieldLabel
                      className="font-normal"
                      htmlFor="phone-verification"
                    >
                      Require phone verification
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FormRow>

            <FormRow label="Button Copy">
              <Select onValueChange={setButtonCopy} value={buttonCopy}>
                <SelectTrigger className="w-full" id="button-copy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {BUTTON_COPY.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormRow>

            <FormRow label="Handoff">
              <Select onValueChange={setHandoff} value={handoff}>
                <SelectTrigger className="w-full" id="handoff">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {HANDOFFS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormRow>

            <FormRow
              label={
                <>
                  Return URL
                  <FieldHint label="Where buyers land after a successful checkout." />
                </>
              }
            >
              <InputGroup>
                <InputGroupAddon>
                  <LinkIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="return-url"
                  onChange={(event) => setReturnUrl(event.target.value)}
                  type="url"
                  value={returnUrl}
                />
              </InputGroup>
            </FormRow>

            <FormRow label="Receipt Details">
              <FieldSet>
                <FieldGroup className="gap-3">
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={receipt.branded}
                      id="branded-receipt"
                      onCheckedChange={(checked) =>
                        setReceipt((current) => ({
                          ...current,
                          branded: checked === true,
                        }))
                      }
                    />
                    <FieldLabel
                      className="font-normal"
                      htmlFor="branded-receipt"
                    >
                      Send branded receipt
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox
                      checked={receipt.followUp}
                      id="follow-up"
                      onCheckedChange={(checked) =>
                        setReceipt((current) => ({
                          ...current,
                          followUp: checked === true,
                        }))
                      }
                    />
                    <FieldLabel className="font-normal" htmlFor="follow-up">
                      Allow follow-up offers
                    </FieldLabel>
                  </Field>
                  <Field data-disabled orientation="horizontal">
                    <Checkbox disabled id="terms-acceptance" />
                    <FieldLabel
                      className="font-normal"
                      htmlFor="terms-acceptance"
                    >
                      Require terms acceptance
                      <FieldHint label="Enable this after legal review of the hosted terms." />
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FormRow>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <p className="text-muted-foreground text-sm">
            {status === "published"
              ? "Checkout is live for new buyers."
              : "Draft stays private."}
          </p>
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              onClick={() => setStatus("draft")}
              type="button"
              variant="outline"
            >
              <SaveIcon data-icon="inline-start" />
              Save draft
            </Button>
            <Button onClick={() => setStatus("published")} type="button">
              <ShieldCheckIcon data-icon="inline-start" />
              Publish checkout
            </Button>
          </div>
        </CardFooter>
      </Card>
    </FormPage>
  );
}
