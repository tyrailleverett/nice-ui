/* biome-ignore-all lint/performance/noJsxPropsBind: Select handlers close over duration and recurrence setters. */
import { CircleDotIcon, ShieldIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  buildTimeSlots,
  CalendarShell,
  formatWeekdayDay,
  MonthCalendar,
  TimeSlotList,
} from "@/components/app/calendar-shared";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const DURATION_OPTIONS = ["15 min", "30 min", "45 min", "1 hour"] as const;
const RECURRENCE_OPTIONS = [
  "Does not repeat",
  "Every day",
  "Every week",
  "Every month",
] as const;

export interface Calendar1Props {
  className?: string;
}

export function Calendar1({ className }: Calendar1Props) {
  const [selected, setSelected] = useState(new Date(2026, 5, 30));
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1));
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState("30 min");
  const [recurrence, setRecurrence] = useState("Every week");
  const [waitingRoom, setWaitingRoom] = useState(false);
  const [autoRecord, setAutoRecord] = useState(false);
  const slots = useMemo(() => buildTimeSlots(), []);

  return (
    <CalendarShell className={cn("max-w-3xl", className)}>
      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading font-semibold text-xl">
            Schedule Meeting
          </h2>
          <p className="text-muted-foreground text-sm">America/Chicago</p>
        </div>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <MonthCalendar
            onSelect={setSelected}
            onViewChange={setViewDate}
            selected={selected}
            viewDate={viewDate}
          />
          <Separator className="md:hidden" />
          <div className="flex min-h-0 flex-col gap-3 border-border md:border-l md:pl-5">
            <h3 className="font-medium">{formatWeekdayDay(selected)}</h3>
            <TimeSlotList onSelect={setTime} selected={time} slots={slots} />
          </div>
        </div>
        <Separator />
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="meeting-duration">Duration</FieldLabel>
              <Select
                items={DURATION_OPTIONS.map((option) => ({
                  label: option,
                  value: option,
                }))}
                onValueChange={(value) => {
                  if (value !== null) {
                    setDuration(value);
                  }
                }}
                value={duration}
              >
                <SelectTrigger className="w-full" id="meeting-duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {DURATION_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="meeting-recurrence">Recurrence</FieldLabel>
              <Select
                items={RECURRENCE_OPTIONS.map((option) => ({
                  label: option,
                  value: option,
                }))}
                onValueChange={(value) => {
                  if (value !== null) {
                    setRecurrence(value);
                  }
                }}
                value={recurrence}
              >
                <SelectTrigger className="w-full" id="meeting-recurrence">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {RECURRENCE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="meeting-title">Title</FieldLabel>
            <Input id="meeting-title" placeholder="e.g. Weekly standup" />
          </Field>
          <Field>
            <FieldLabel htmlFor="meeting-description">Description</FieldLabel>
            <Textarea
              id="meeting-description"
              placeholder="Add agenda or notes..."
            />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel className="[&_svg]:size-4" htmlFor="waiting-room">
              <ShieldIcon />
              Waiting room
            </FieldLabel>
            <Switch
              checked={waitingRoom}
              id="waiting-room"
              onCheckedChange={setWaitingRoom}
            />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel className="[&_svg]:size-4" htmlFor="auto-record">
              <CircleDotIcon />
              Auto-record
            </FieldLabel>
            <Switch
              checked={autoRecord}
              id="auto-record"
              onCheckedChange={setAutoRecord}
            />
          </Field>
        </FieldGroup>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="button">Schedule meeting</Button>
        </div>
      </div>
    </CalendarShell>
  );
}
