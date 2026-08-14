/* biome-ignore-all lint/performance/noJsxPropsBind: Duration presets close over the selected value. */
import { useState } from "react";
import {
  DialogFrame,
  type DialogProps,
  Footer,
} from "@/components/app/dialogs-shared";
import { Dialog } from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const durationPresets = [
  "30 min",
  "2 hours",
  "4 hours",
  "8 hours",
  "12 hours",
  "1 day",
];

export function SelectDurationDialog(props: DialogProps) {
  const [duration, setDuration] = useState("30 min");
  return (
    <Dialog {...props}>
      <DialogFrame
        className="sm:max-w-4xl"
        description="Pick a start and end time or use a quick preset."
        title="Select duration"
      >
        <FieldGroup>
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="start-time">
                Start time{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <Select defaultValue="02:00 AM">
                <SelectTrigger className="w-full" id="start-time">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="02:00 AM">02:00 AM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="end-time">
                End time{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <Select defaultValue="02:30 AM">
                <SelectTrigger className="w-full" id="end-time">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="02:30 AM">02:30 AM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <FieldSet>
            <FieldLegend>Quick duration</FieldLegend>
            <ToggleGroup
              className="grid w-full grid-cols-2 md:grid-cols-4"
              onValueChange={(value) => {
                if (value) {
                  setDuration(value);
                }
              }}
              type="single"
              value={duration}
              variant="outline"
            >
              {durationPresets.map((preset) => (
                <ToggleGroupItem key={preset} value={preset}>
                  {preset}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>
        </FieldGroup>
        <Footer action="Apply" note="Quick presets update the end time." />
      </DialogFrame>
    </Dialog>
  );
}
