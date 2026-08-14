/* biome-ignore-all lint/performance/noJsxPropsBind: Dialog controls close over preset, section, and scope values. */
import { CircleHelp } from "lucide-react";
import {
  DialogFrame,
  type DialogProps,
  Footer,
} from "@/components/app/dialogs-shared";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

const reasons = [
  "Only needed one launch",
  "Budget changed",
  "Missing a few patterns",
  "Moved back in-house",
  "Not the right stack fit",
  "Wanted better Figma parity",
  "Output felt inconsistent",
  "Something else",
];
export function CancelPlanDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogFrame
        className="sm:max-w-4xl"
        description="Your workspace stays active through the current billing period."
        title="Cancel Your Plan"
      >
        <div className="flex flex-col gap-6">
          <Alert>
            <CircleHelp />
            <AlertTitle>Shared access pauses after expiry.</AlertTitle>
            <AlertDescription>
              Team access stays on until the current period ends.
            </AlertDescription>
            <AlertAction>
              <Button type="button" variant="outline">
                Manage
              </Button>
            </AlertAction>
          </Alert>
          <FieldSet>
            <div className="grid gap-3 md:grid-cols-2">
              {reasons.map((reason, index) => {
                const id = `cancel-reason-${index}`;
                return (
                  <Field
                    className="rounded-xl border px-4 py-3"
                    key={reason}
                    orientation="horizontal"
                  >
                    <FieldLabel className="flex-1" htmlFor={id}>
                      {reason}
                    </FieldLabel>
                    <Checkbox id={id} />
                  </Field>
                );
              })}
            </div>
          </FieldSet>
          <Field>
            <FieldLabel className="sr-only" htmlFor="cancel-feedback">
              Feedback
            </FieldLabel>
            <Textarea
              id="cancel-feedback"
              placeholder="Anything we should improve before you leave ReUI?"
            />
          </Field>
        </div>
        <Footer
          action="Cancel plan"
          cancel="Keep plan"
          note="Billing stays active"
        />
      </DialogFrame>
    </Dialog>
  );
}
