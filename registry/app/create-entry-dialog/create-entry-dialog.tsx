/* biome-ignore-all lint/performance/noJsxPropsBind: Entry type tabs close over the selected value. */
import { useState } from "react";
import {
  DialogFrame,
  type DialogProps,
  Footer,
} from "@/components/app/dialogs-shared";
import { Dialog } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function CreateEntryDialog(props: DialogProps) {
  const [tab, setTab] = useState("Action");
  return (
    <Dialog {...props}>
      <DialogFrame
        className="sm:max-w-5xl"
        description="Create and assign a quick record."
        title="Create entry"
      >
        <div className="flex flex-col gap-6">
          <ToggleGroup
            onValueChange={(value) => {
              if (value) {
                setTab(value);
              }
            }}
            type="single"
            value={tab}
            variant="outline"
          >
            {entryTabs.map((item) => (
              <ToggleGroupItem key={item} value={item}>
                {item}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="entry-title">Title</FieldLabel>
              <Input
                defaultValue="Close billing-event gaps before partner beta"
                id="entry-title"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="entry-notes">Notes</FieldLabel>
              <Textarea
                defaultValue="Confirm upgrade, downgrade, and trial-extension events are mapped before the beta opens."
                id="entry-notes"
              />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              {entryFields.map(([label, value, display]) => (
                <Field key={label}>
                  <FieldLabel htmlFor={`entry-${value}`}>{label}</FieldLabel>
                  <Select defaultValue={value}>
                    <SelectTrigger className="w-full" id={`entry-${value}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={value}>{display}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              ))}
            </div>
          </FieldGroup>
        </div>
        <Footer action="Create Action" />
      </DialogFrame>
    </Dialog>
  );
}

const entryTabs = ["Action", "Brief", "Nudge", "Canvas", "Pulse"] as const;
const entryFields = [
  ["Status", "planned", "Planned"],
  ["Assignee", "maya", "Maya Stone"],
  ["Due date", "tomorrow", "Tomorrow"],
  ["Priority", "medium", "Medium"],
  ["Labels", "labels", "●  ●"],
] as const;
