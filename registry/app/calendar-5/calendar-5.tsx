/* biome-ignore-all lint/performance/noJsxPropsBind: Booking date selection also clears unavailable times. */
import {
  CheckCircle2Icon,
  Clock3Icon,
  GlobeIcon,
  LayoutGridIcon,
  VideoIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  buildTimeSlots,
  CalendarShell,
  formatWeekdayDay,
  MonthCalendar,
  TimeSlotList,
  toDateKey,
} from "@/components/app/calendar-shared";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const AVAILABLE_DAYS = new Set([
  "2026-06-15",
  "2026-06-16",
  "2026-06-17",
  "2026-06-18",
  "2026-06-19",
  "2026-06-22",
  "2026-06-23",
  "2026-06-29",
]);

export interface Calendar5Props {
  className?: string;
}

export function Calendar5({ className }: Calendar5Props) {
  const [selected, setSelected] = useState(new Date(2026, 5, 15));
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1));
  const [time, setTime] = useState<string | null>("09:30");
  const slots = useMemo(() => buildTimeSlots(9, 17, 30), []);
  const canConfirm = Boolean(time) && AVAILABLE_DAYS.has(toDateKey(selected));

  return (
    <CalendarShell className={cn("max-w-5xl", className)}>
      <div className="grid lg:grid-cols-[14rem_minmax(0,1fr)_13rem]">
        <div className="flex flex-col items-start gap-5 p-6">
          <Avatar size="lg">
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-heading font-semibold text-lg">James Park</h2>
            <p className="text-muted-foreground text-sm">Solutions Architect</p>
          </div>
          <ul className="flex flex-col gap-3 text-sm [&_svg]:size-4">
            <li className="flex items-center gap-2">
              <LayoutGridIcon />
              Career Coaching
            </li>
            <li className="flex items-center gap-2">
              <VideoIcon />
              Google Meet
            </li>
            <li className="flex items-center gap-2">
              <Clock3Icon />
              30 minutes
            </li>
            <li className="flex items-center gap-2">
              <GlobeIcon />
              America/Chicago (CDT)
            </li>
          </ul>
        </div>
        <Separator className="lg:hidden" />
        <div className="border-border p-6 lg:border-x">
          <MonthCalendar
            dottedDates={AVAILABLE_DAYS}
            markerPlacement="above"
            onSelect={(date) => {
              setSelected(date);
              if (!AVAILABLE_DAYS.has(toDateKey(date))) {
                setTime(null);
              }
            }}
            onViewChange={setViewDate}
            selected={selected}
            viewDate={viewDate}
          />
        </div>
        <div className="flex min-h-0 flex-col gap-3 p-6">
          <h3 className="font-medium">{formatWeekdayDay(selected)}</h3>
          {AVAILABLE_DAYS.has(toDateKey(selected)) ? (
            <TimeSlotList onSelect={setTime} selected={time} slots={slots} />
          ) : (
            <p className="text-muted-foreground text-sm">
              No times on this date. Pick a day with an availability mark.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 border-border border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-muted-foreground text-sm [&_svg]:size-4">
          <CheckCircle2Icon />
          {canConfirm
            ? `${formatWeekdayDay(selected)} at ${time}`
            : "Select a date and time to continue"}
        </p>
        <Button disabled={!canConfirm} type="button">
          Confirm booking
        </Button>
      </div>
    </CalendarShell>
  );
}
