/* biome-ignore-all lint/performance/noJsxPropsBind: Calendar controls close over selected dates and availability slots. */
import {
  CalendarDaysIcon,
  CheckIcon,
  Clock3Icon,
  Globe2Icon,
  VideoIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  buildTimeSlots,
  CalendarShell,
  formatClock,
  formatLongDate,
  MonthCalendar,
  toDateKey,
} from "@/components/app/calendar-shared";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const AVAILABLE_DAYS = new Set([
  "2026-06-15",
  "2026-06-16",
  "2026-06-17",
  "2026-06-18",
  "2026-06-22",
  "2026-06-23",
]);

const EVENTS = [
  { end: "09:30", label: "Focus time", start: "08:30", tone: "muted" },
  { end: "11:00", label: "Design critique", start: "10:00", tone: "violet" },
  { end: "12:00", label: "Lunch with Maya", start: "11:30", tone: "peach" },
  { end: "14:00", label: "Open availability", start: "13:00", tone: "green" },
  { end: "16:30", label: "Project work", start: "15:00", tone: "blue" },
] as const;

const TONE_CLASSES = {
  blue: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100",
  green:
    "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100",
  muted: "border-border bg-muted/60 text-muted-foreground",
  peach:
    "border-orange-200 bg-orange-50 text-orange-950 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-100",
  violet:
    "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-100",
} as const;

function formatSelectedDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    weekday: "short",
  });
}

export interface Calendar6Props {
  className?: string;
}

export function Calendar6({ className }: Calendar6Props) {
  const [selected, setSelected] = useState(new Date(2026, 5, 16));
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1));
  const [selectedSlot, setSelectedSlot] = useState<string | null>("13:30");
  const slots = useMemo(() => buildTimeSlots(9, 17, 30), []);
  const selectedKey = toDateKey(selected);
  const isAvailable = AVAILABLE_DAYS.has(selectedKey);
  const dayLabel = formatSelectedDate(selected);

  return (
    <CalendarShell className={cn("max-w-6xl", className)}>
      <div className="flex flex-col border-border border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
            Book a conversation
          </p>
          <h1 className="mt-1 font-heading font-semibold text-xl tracking-tight">
            Product strategy session
          </h1>
        </div>
        <div className="mt-3 flex items-center gap-2 text-muted-foreground text-sm sm:mt-0">
          <Globe2Icon className="size-4" />
          America/Chicago (CDT)
        </div>
      </div>

      <div className="grid lg:grid-cols-[15rem_minmax(15rem,0.9fr)_minmax(19rem,1.2fr)]">
        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2 text-sm">
            <CalendarDaysIcon className="size-4 text-muted-foreground" />
            <span className="font-medium">Choose a day</span>
          </div>
          <MonthCalendar
            dottedDates={AVAILABLE_DAYS}
            markerPlacement="below"
            onSelect={(date) => {
              setSelected(date);
              if (!AVAILABLE_DAYS.has(toDateKey(date))) {
                setSelectedSlot(null);
              }
            }}
            onViewChange={setViewDate}
            selected={selected}
            viewDate={viewDate}
          />
          <div className="mt-5 flex items-center gap-2 text-muted-foreground text-xs">
            <span className="size-2 rounded-full bg-primary" />
            Days with availability
          </div>
        </div>

        <div className="border-border border-t p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <div className="mb-4">
            <p className="font-medium text-sm">Available times</p>
            <p className="mt-1 text-muted-foreground text-sm">
              {isAvailable ? dayLabel : "No availability on this day"}
            </p>
          </div>
          {isAvailable ? (
            <ScrollArea className="h-[22rem]">
              <div className="grid grid-cols-2 gap-2 pr-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <Button
                      aria-pressed={isSelected}
                      className="h-9 rounded-lg font-normal"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                    >
                      {formatClock(slot)}
                      {isSelected ? <CheckIcon data-icon="inline-end" /> : null}
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="rounded-xl border border-dashed p-4 text-muted-foreground text-sm">
              Pick a day marked with a dot to see open times.
            </div>
          )}
        </div>

        <div className="border-border border-t p-5 sm:p-6 lg:border-l">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-sm">Your day</p>
              <p className="mt-1 text-muted-foreground text-sm">
                {formatLongDate(selected)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Clock3Icon className="size-3.5" />
              CDT
            </div>
          </div>
          <div className="relative flex flex-col gap-2">
            {EVENTS.map((event) => (
              <div
                className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3"
                key={event.label}
              >
                <span className="pt-2 text-right text-muted-foreground text-xs tabular-nums">
                  {formatClock(event.start)}
                </span>
                <div
                  className={cn(
                    "min-h-12 rounded-lg border px-3 py-2",
                    TONE_CLASSES[event.tone]
                  )}
                >
                  <p className="font-medium text-sm">{event.label}</p>
                  <p className="mt-0.5 text-xs opacity-70">
                    {formatClock(event.start)} – {formatClock(event.end)}
                  </p>
                </div>
              </div>
            ))}
            <div className="pointer-events-none absolute top-[9.25rem] right-0 left-[3.75rem] flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span className="h-px flex-1 bg-primary/50" />
            </div>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <VideoIcon className="size-4" />
            30 minutes · Google Meet
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-border border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-muted-foreground text-sm">
          {selectedSlot
            ? `Selected: ${dayLabel} at ${formatClock(selectedSlot)}`
            : "Select an available time to continue"}
        </p>
        <Button disabled={!(selectedSlot && isAvailable)} type="button">
          Continue
        </Button>
      </div>
    </CalendarShell>
  );
}
