import { Clock3Icon, MapPinIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AttendeeStack,
  type CalendarAttendee,
  type CalendarCategory,
  CalendarShell,
  formatLongDate,
  MonthCalendar,
  toDateKey,
} from "@/components/app/calendar-shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DayEvent {
  attendees: CalendarAttendee[];
  category: CalendarCategory;
  date: string;
  id: string;
  location: string;
  start: string;
  status: "Upcoming" | "In progress" | "Done";
  title: string;
}

const PEOPLE: CalendarAttendee[] = [
  { initials: "NW", name: "Nora West" },
  { initials: "CL", name: "Chris Lang" },
  { initials: "IB", name: "Imani Brooks" },
  { initials: "DK", name: "Drew Kole" },
];

const EVENTS: DayEvent[] = [
  {
    attendees: PEOPLE.slice(0, 3),
    category: "review",
    date: "2026-06-10",
    id: "mobile-qa",
    location: "Remote",
    start: "14:30",
    status: "Upcoming",
    title: "Mobile QA Handoff",
  },
  {
    attendees: PEOPLE,
    category: "sprint",
    date: "2026-06-10",
    id: "roadmap",
    location: "Main Hall",
    start: "11:00",
    status: "Upcoming",
    title: "Roadmap sync",
  },
  {
    attendees: PEOPLE.slice(1, 4),
    category: "standup",
    date: "2026-06-10",
    id: "customer",
    location: "Google Meet",
    start: "09:30",
    status: "Done",
    title: "Customer briefing",
  },
  {
    attendees: PEOPLE.slice(0, 2),
    category: "workshop",
    date: "2026-06-10",
    id: "pairing",
    location: "Zoom",
    start: "15:30",
    status: "Upcoming",
    title: "Pairing block",
  },
  {
    attendees: PEOPLE.slice(0, 4),
    category: "deadline",
    date: "2026-06-10",
    id: "release",
    location: "Remote",
    start: "16:45",
    status: "Upcoming",
    title: "Release checklist",
  },
  {
    attendees: PEOPLE.slice(2),
    category: "review",
    date: "2026-06-10",
    id: "design-crit",
    location: "Main Hall",
    start: "13:00",
    status: "In progress",
    title: "Design critique",
  },
  {
    attendees: PEOPLE.slice(0, 2),
    category: "standup",
    date: "2026-06-03",
    id: "ops",
    location: "Remote",
    start: "10:00",
    status: "Done",
    title: "Ops standup",
  },
];

function markersFromEvents(
  events: DayEvent[]
): Record<string, CalendarCategory[]> {
  const markers: Record<string, CalendarCategory[]> = {};
  for (const event of events) {
    markers[event.date] = markers[event.date] ?? [event.category];
  }
  return markers;
}

function formatEventTime(date: Date, start: string): string {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const [hourValue, minute] = start.split(":").map(Number);
  const suffix = hourValue >= 12 ? "pm" : "am";
  const hour = ((hourValue + 11) % 12) + 1;
  return `${month} ${date.getDate()} · ${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export interface Calendar4Props {
  className?: string;
}

export function Calendar4({ className }: Calendar4Props) {
  const [selected, setSelected] = useState(new Date(2026, 5, 10));
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1));
  const [scope, setScope] = useState("all");
  const markers = useMemo(() => markersFromEvents(EVENTS), []);
  const selectedKey = toDateKey(selected);
  const events = EVENTS.filter((event) => {
    if (event.date !== selectedKey) {
      return false;
    }
    if (scope === "all") {
      return true;
    }
    return event.status.toLowerCase() === scope;
  });

  const dottedDates = useMemo(() => new Set(Object.keys(markers)), [markers]);

  return (
    <CalendarShell className={cn("max-w-5xl", className)}>
      <div className="grid lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.4fr)]">
        <div className="p-5">
          <MonthCalendar
            dottedDates={dottedDates}
            onSelect={setSelected}
            onViewChange={setViewDate}
            selected={selected}
            viewDate={viewDate}
          />
        </div>
        <Separator className="lg:hidden" />
        <div className="flex min-h-0 flex-col gap-4 border-border p-5 lg:border-l">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-heading font-semibold text-xl">
                {formatLongDate(selected)}
              </h2>
              <p className="text-muted-foreground text-sm">
                {events.length} {events.length === 1 ? "event" : "events"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select onValueChange={setScope} value={scope}>
                <SelectTrigger aria-label="Filter events" className="min-w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All events</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="in progress">In progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button type="button">
                <PlusIcon data-icon="inline-start" />
                Add
              </Button>
            </div>
          </div>
          <div className="flex max-h-[28rem] flex-col gap-3 overflow-y-auto p-px">
            {events.length === 0 ? (
              <Empty className="min-h-40 border border-dashed">
                <EmptyDescription>
                  Nothing scheduled. Add an event for this day.
                </EmptyDescription>
              </Empty>
            ) : (
              events.map((event) => (
                <article
                  className="flex flex-col gap-3 rounded-xl border border-border p-4"
                  key={event.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge
                      variant={
                        event.status === "Upcoming" ? "default" : "secondary"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <AttendeeStack attendees={event.attendees} />
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm [&_svg]:size-4">
                    <span className="flex items-center gap-1.5">
                      <Clock3Icon />
                      {formatEventTime(selected, event.start)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPinIcon />
                      {event.location}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </CalendarShell>
  );
}
