/* biome-ignore-all lint/performance/noJsxPropsBind: Dialog controls close over preset, section, and scope values. */
import { ExternalLink, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  DialogFrame,
  type DialogProps,
  Footer,
} from "@/components/app/dialogs-shared";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const gmailScopes = [
  ["Headers Only", "Sender, subject, and dates.", "Recommended"],
  ["Messages", "Thread text for answers.", "Better context"],
] as const;

export function ConnectGmailDialog(props: DialogProps) {
  const [scope, setScope] = useState("Headers Only");
  return (
    <Dialog {...props}>
      <DialogFrame
        className="sm:max-w-xl"
        description="Choose what Gmail can share."
        title="Connect Gmail"
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-center gap-4 text-4xl">
            ◎ <span className="text-muted-foreground">•••</span> <span>G</span>
          </div>
          <div className="flex flex-col gap-5">
            {[
              {
                copy: "Approve permissions on Google's page.",
                heading: "Google Review",
                Icon: ExternalLink,
              },
              {
                copy: "Disconnect anytime from settings.",
                heading: "Data Control",
                Icon: ShieldCheck,
              },
            ].map(({ Icon, heading, copy }) => (
              <div className="flex items-center gap-4" key={heading}>
                <div className="grid size-12 shrink-0 place-items-center rounded-xl border bg-muted">
                  <Icon />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium">{heading}</h3>
                  <p className="text-muted-foreground">{copy}</p>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <FieldSet>
            <FieldLegend>Sync Scope</FieldLegend>
            <RadioGroup
              className="gap-3"
              onValueChange={setScope}
              value={scope}
            >
              {gmailScopes.map(([heading, copy, badge]) => {
                const id = `gmail-scope-${heading.toLowerCase().replace(" ", "-")}`;
                return (
                  <Field
                    className={cn(
                      "rounded-xl border p-4",
                      scope === heading && "border-foreground"
                    )}
                    key={heading}
                    orientation="horizontal"
                  >
                    <RadioGroupItem id={id} value={heading} />
                    <FieldContent>
                      <FieldLabel htmlFor={id}>{heading}</FieldLabel>
                      <FieldDescription>{copy}</FieldDescription>
                    </FieldContent>
                    <Badge variant="secondary">{badge}</Badge>
                  </Field>
                );
              })}
            </RadioGroup>
          </FieldSet>
        </div>
        <Footer action="Continue" />
      </DialogFrame>
    </Dialog>
  );
}
