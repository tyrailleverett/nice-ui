/* biome-ignore-all lint/performance/noJsxPropsBind: Filter chips close over category ids. */
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import "./calendar.css";
import {
  AttendeeStack,
  type CalendarAttendee,
  type CalendarCategory,
  CalendarShell,
  formatCompactRange,
  formatMonthDay,
  MonthCalendar,
  toDateKey,
} from "@/components/app/calendar-shared";

const FILTERS: Array<{ id: "all" | CalendarCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "sprint", label: "Sprint" },
  { id: "standup", label: "Standup" },
  { id: "review", label: "Review" },
  { id: "deadline", label: "Deadline" },
  { id: "workshop", label: "Workshop" },
];

interface AgendaEvent {
  attendees: CalendarAttendee[];
  category: CalendarCategory;
  date: string;
  end: string;
  id: string;
  start: string;
  title: string;
}

const TEAM: CalendarAttendee[] = [
  { initials: "AL", name: "Ava Lane" },
  { initials: "JK", name: "Jordan Kim" },
  { initials: "MR", name: "Maya Ruiz" },
  { initials: "TS", name: "Theo Singh" },
];

const EVENTS: AgendaEvent[] = [
  {
    attendees: TEAM,
    category: "sprint",
    date: "2026-06-09",
    end: "10:30",
    id: "sprint-kickoff",
    start: "09:00",
    title: "Sprint Kickoff",
  },
  {
    attendees: TEAM.slice(0, 3),
    category: "standup",
    date: "2026-06-09",
    end: "09:45",
    id: "eng-standup",
    start: "09:30",
    title: "Eng Standup",
  },
  {
    attendees: TEAM.slice(1),
    category: "review",
    date: "2026-06-09",
    end: "11:30",
    id: "design-review",
    start: "10:30",
    title: "Design Review",
  },
  {
    attendees: TEAM.slice(0, 2),
    category: "deadline",
    date: "2026-06-09",
    end: "17:00",
    id: "copy-deadline",
    start: "16:00",
    title: "Copy freeze",
  },
  {
    attendees: TEAM,
    category: "workshop",
    date: "2026-06-09",
    end: "16:00",
    id: "facilitation",
    start: "14:00",
    title: "Facilitation workshop",
  },
  {
    attendees: TEAM.slice(0, 3),
    category: "review",
    date: "2026-06-03",
    end: "11:00",
    id: "api-review",
    start: "10:00",
    title: "API review",
  },
  {
    attendees: TEAM.slice(1, 4),
    category: "standup",
    date: "2026-06-10",
    end: "09:45",
    id: "standup-10",
    start: "09:30",
    title: "Eng Standup",
  },
];

function markersFromEvents(
  events: AgendaEvent[]
): Record<string, CalendarCategory[]> {
  const markers: Record<string, CalendarCategory[]> = {};
  for (const event of events) {
    const current = markers[event.date] ?? [];
    if (!current.includes(event.category)) {
      current.push(event.category);
    }
    markers[event.date] = current;
  }
  return markers;
}

export interface Calendar2Props {
  className?: string;
}

export function Calendar2({ className }: Calendar2Props) {
  const [selected, setSelected] = useState(new Date(2026, 5, 9));
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1));
  const [filter, setFilter] = useState<"all" | CalendarCategory>("all");
  const markers = useMemo(() => markersFromEvents(EVENTS), []);
  const selectedKey = toDateKey(selected);
  const events = EVENTS.filter((event) => {
    if (event.date !== selectedKey) {
      return false;
    }
    return filter === "all" || event.category === filter;
  });

  return (
    <CalendarShell className={cn("max-w-md", className)}>
      <div className="flex flex-col gap-4 p-5">
        <MonthCalendar
          markers={markers}
          onSelect={setSelected}
          onViewChange={setViewDate}
          selected={selected}
          viewDate={viewDate}
        />
        <Separator />
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading font-semibold">
            {formatMonthDay(selected)}, {selected.getFullYear()}
          </h2>
          <Button
            aria-label="Add event"
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <PlusIcon />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const isActive = filter === item.id;
            return (
              <Button
                className="rounded-full"
                key={item.id}
                onClick={() => setFilter(item.id)}
                size="sm"
                type="button"
                variant={isActive ? "default" : "outline"}
              >
                {item.id === "all" ? null : (
                  <span
                    className="size-1.5 rounded-full"
                    data-calendar-cat={item.id}
                    data-icon="inline-start"
                  />
                )}
                {item.label}
              </Button>
            );
          })}
        </div>
        <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
          {events.length === 0 ? (
            <Empty className="min-h-32 border border-dashed">
              <EmptyDescription>
                No events on this day. Add one to start the agenda.
              </EmptyDescription>
            </Empty>
          ) : (
            events.map((event) => (
              <article
                className={cn(
                  "flex items-center gap-3 overflow-hidden rounded-xl ring-1 ring-foreground/10"
                )}
                key={event.id}
              >
                <span
                  className="w-1.5 self-stretch"
                  data-calendar-cat={event.category}
                />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3 py-3 pr-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{event.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {formatCompactRange(selected, event.start, event.end)}
                    </p>
                  </div>
                  <AttendeeStack attendees={event.attendees} />
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </CalendarShell>
  );
}
