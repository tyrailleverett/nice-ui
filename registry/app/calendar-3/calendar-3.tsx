/* biome-ignore-all lint/performance/noJsxPropsBind: Duration presets and end-time mapping close over selected values. */
import { EllipsisIcon, InfoIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  addMinutesToTime,
  buildTimeSlots,
  CalendarShell,
  formatMeridiem,
} from "@/components/app/calendar-shared";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const DURATION_PRESETS = [
  { label: "15 min", minutes: 15 },
  { label: "30 min", minutes: 30 },
  { label: "1 hour", minutes: 60 },
  { label: "2 hours", minutes: 120 },
  { label: "3 hours", minutes: 180 },
  { label: "4 hours", minutes: 240 },
  { label: "5 hours", minutes: 300 },
  { label: "6 hours", minutes: 360 },
  { label: "7 hours", minutes: 420 },
  { label: "8 hours", minutes: 480 },
] as const;

export interface Calendar3Props {
  className?: string;
}

export function Calendar3({ className }: Calendar3Props) {
  const slots = useMemo(() => buildTimeSlots(7, 20, 30), []);
  const [start, setStart] = useState("09:00");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const selectedPreset = DURATION_PRESETS.find(
    (preset) => preset.minutes === durationMinutes
  );
  const durationLabel = selectedPreset?.label ?? `${durationMinutes} min`;
  const end = addMinutesToTime(start, durationMinutes);

  return (
    <CalendarShell className={cn("max-w-xl", className)}>
      <div className="flex flex-col gap-5 p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Alex Johnson</p>
              <p className="text-muted-foreground text-sm">Founder & CEO</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label="More options"
                  size="icon"
                  type="button"
                  variant="ghost"
                />
              }
            >
              <EllipsisIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Copy booking link</DropdownMenuItem>
                <DropdownMenuItem>Edit availability</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-5 rounded-xl p-4 ring-1 ring-foreground/10">
          <FieldGroup className="gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="start-time">Start time</FieldLabel>
                <Select
                  items={slots.map((slot) => ({
                    label: formatMeridiem(slot),
                    value: slot,
                  }))}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setStart(value);
                    }
                  }}
                  value={start}
                >
                  <SelectTrigger className="w-full" id="start-time">
                    <SelectValue>{formatMeridiem(start)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {slots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {formatMeridiem(slot)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="end-time">End time</FieldLabel>
                <Select
                  items={slots.map((slot) => ({
                    label: formatMeridiem(slot),
                    value: slot,
                  }))}
                  onValueChange={(value) => {
                    if (!value) {
                      return;
                    }
                    const [startHour, startMinute] = start
                      .split(":")
                      .map(Number);
                    const [endHour, endMinute] = value.split(":").map(Number);
                    const minutes =
                      endHour * 60 + endMinute - (startHour * 60 + startMinute);
                    if (minutes > 0) {
                      setDurationMinutes(minutes);
                    }
                  }}
                  value={end}
                >
                  <SelectTrigger className="w-full" id="end-time">
                    <SelectValue>{formatMeridiem(end)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {slots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {formatMeridiem(slot)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel>Duration</FieldLabel>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {DURATION_PRESETS.map((preset) => (
                  <Button
                    className="w-full"
                    key={preset.label}
                    onClick={() => setDurationMinutes(preset.minutes)}
                    size="sm"
                    type="button"
                    variant={
                      durationMinutes === preset.minutes ? "default" : "outline"
                    }
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </Field>
          </FieldGroup>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-muted-foreground text-sm [&_svg]:size-4">
            <InfoIcon />
            Selected duration:{" "}
            <span className="font-medium text-foreground">{durationLabel}</span>
          </p>
          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="button">Apply</Button>
          </div>
        </div>
      </div>
    </CalendarShell>
  );
}
