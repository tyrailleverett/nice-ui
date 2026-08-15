/* biome-ignore-all lint/performance/noJsxPropsBind: Calendar controls close over selected dates, slots, and view state. */
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type ReactNode, useMemo } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const WEEKDAYS = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
] as const;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const YEAR_OPTIONS = ["2024", "2025", "2026", "2027", "2028"] as const;

export type CalendarCategory =
  | "sprint"
  | "standup"
  | "review"
  | "deadline"
  | "workshop";

export interface CalendarAttendee {
  initials: string;
  name: string;
}

export interface CalendarDayCell {
  date: Date;
  inMonth: boolean;
}

export function toDateKey(date: Date): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isSameDay(left: Date, right: Date): boolean {
  return toDateKey(left) === toDateKey(right);
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
}

export function formatMonthDay(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
}

export function formatWeekdayDay(date: Date): string {
  return `${date.toLocaleDateString("en-US", { weekday: "long" })}, ${date.getDate()}`;
}

export function formatCompactRange(
  date: Date,
  start: string,
  end: string
): string {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${date.getDate()}, ${formatClock(start)} - ${formatClock(end)}`;
}

export function formatClock(value: string): string {
  const [hourValue, minute] = value.split(":").map(Number);
  const suffix = hourValue >= 12 ? "pm" : "am";
  const hour = ((hourValue + 11) % 12) + 1;
  if (minute === 0) {
    return `${hour}${suffix}`;
  }
  return `${hour}:${String(minute).padStart(2, "0")}${suffix}`;
}

export function formatMeridiem(value: string): string {
  const [hourValue, minute] = value.split(":").map(Number);
  const suffix = hourValue >= 12 ? "PM" : "AM";
  const hour = ((hourValue + 11) % 12) + 1;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function buildTimeSlots(
  startHour = 8,
  endHour = 18,
  stepMinutes = 30
): string[] {
  const slots: string[] = [];
  for (
    let minutes = startHour * 60;
    minutes < endHour * 60;
    minutes += stepMinutes
  ) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );
  }
  return slots;
}

export function addMinutesToTime(value: string, minutesToAdd: number): string {
  const [hourValue, minute] = value.split(":").map(Number);
  const total = hourValue * 60 + minute + minutesToAdd;
  const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const hour = Math.floor(wrapped / 60);
  const nextMinute = wrapped % 60;
  return `${String(hour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
}

export function getCalendarCells(viewDate: Date): CalendarDayCell[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const start = new Date(year, month, 1 - firstOfMonth.getDay());
  const cells: CalendarDayCell[] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    cells.push({ date, inMonth: date.getMonth() === month });
  }

  const lastInMonthIndex = cells.findLastIndex((cell) => cell.inMonth);
  const weeks = Math.ceil((lastInMonthIndex + 1) / 7);
  return cells.slice(0, weeks * 7);
}

export function MonthCalendar({
  className,
  dottedDates,
  markerPlacement = "below",
  markers,
  onSelect,
  onViewChange,
  selected,
  viewDate,
}: {
  className?: string;
  dottedDates?: Set<string>;
  markerPlacement?: "above" | "below";
  markers?: Record<string, CalendarCategory[]>;
  onSelect: (date: Date) => void;
  onViewChange: (date: Date) => void;
  selected: Date;
  viewDate: Date;
}) {
  const cells = useMemo(() => getCalendarCells(viewDate), [viewDate]);
  const selectedWeekday = selected.getDay();
  const monthValue = String(viewDate.getMonth());
  const yearValue = String(viewDate.getFullYear());

  return (
    <div className={cn("flex min-w-0 flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <Button
          aria-label="Previous month"
          onClick={() => onViewChange(addMonths(viewDate, -1))}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <ChevronLeftIcon />
        </Button>
        <Select
          onValueChange={(value) => {
            onViewChange(new Date(viewDate.getFullYear(), Number(value), 1));
          }}
          value={monthValue}
        >
          <SelectTrigger
            aria-label="Month"
            className="min-w-28 flex-1 rounded-full"
            size="sm"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {MONTHS.map((month, index) => (
                <SelectItem key={month} value={String(index)}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            onViewChange(new Date(Number(value), viewDate.getMonth(), 1));
          }}
          value={yearValue}
        >
          <SelectTrigger
            aria-label="Year"
            className="min-w-20 rounded-full"
            size="sm"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {YEAR_OPTIONS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          aria-label="Next month"
          onClick={() => onViewChange(addMonths(viewDate, 1))}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((weekday, index) => (
          <div
            className={cn(
              "flex h-7 items-center justify-center rounded-full font-medium text-[0.65rem] text-muted-foreground tracking-wide",
              index === selectedWeekday && "bg-muted text-foreground"
            )}
            key={weekday}
          >
            {weekday}
          </div>
        ))}
        {cells.map((cell) => {
          const key = toDateKey(cell.date);
          const isSelected = isSameDay(cell.date, selected);
          const dayMarkers = markers?.[key] ?? [];
          const showPlainDot =
            Boolean(dottedDates?.has(key)) && dayMarkers.length === 0;
          const markerRow = (dayMarkers.length > 0 || showPlainDot) && (
            <span className="flex h-1.5 items-center justify-center gap-0.5">
              {showPlainDot ? (
                <span
                  className={cn(
                    "size-1 rounded-full",
                    isSelected ? "bg-primary-foreground" : "bg-primary"
                  )}
                />
              ) : (
                dayMarkers
                  .slice(0, 3)
                  .map((category) => (
                    <span
                      className={cn(
                        "size-1 rounded-full",
                        isSelected ? "bg-primary-foreground" : "bg-primary"
                      )}
                      data-calendar-cat={category}
                      key={`${key}-${category}`}
                    />
                  ))
              )}
            </span>
          );

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "flex aspect-square min-h-9 flex-col items-center justify-center rounded-lg text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                cell.inMonth ? "text-foreground" : "text-muted-foreground",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
              key={key}
              onClick={() => onSelect(cell.date)}
              type="button"
            >
              {markerPlacement === "above" ? markerRow : null}
              <span className="leading-none">{cell.date.getDate()}</span>
              {markerPlacement === "below" ? markerRow : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TimeSlotList({
  className,
  onSelect,
  selected,
  slots,
}: {
  className?: string;
  onSelect: (slot: string) => void;
  selected: string | null;
  slots: string[];
}) {
  return (
    <ScrollArea className={cn("h-72", className)}>
      <div className="flex flex-col gap-2 pr-3">
        {slots.map((slot) => {
          const isSelected = slot === selected;
          return (
            <Button
              className="w-full rounded-full"
              key={slot}
              onClick={() => onSelect(slot)}
              type="button"
              variant={isSelected ? "default" : "outline"}
            >
              {slot}
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}

export function AttendeeStack({
  attendees,
  visible = 3,
}: {
  attendees: CalendarAttendee[];
  visible?: number;
}) {
  const overflow = attendees.length - visible;
  return (
    <AvatarGroup className="justify-end">
      {attendees.slice(0, visible).map((attendee) => (
        <Avatar key={attendee.initials} size="sm">
          <AvatarFallback>{attendee.initials}</AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 ? <AvatarGroupCount>+{overflow}</AvatarGroupCount> : null}
    </AvatarGroup>
  );
}

export function CalendarShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-background p-6 text-foreground">
      <div
        className={cn(
          "w-full rounded-2xl bg-card text-card-foreground ring-1 ring-foreground/10",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
