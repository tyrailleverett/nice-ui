import { BellIcon, ClipboardListIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const windowRows = [
  {
    name: "Inventory writes",
    note: "Recounts and hold releases wait until 03:00 UTC.",
    state: "Frozen",
  },
  {
    name: "Exception queue",
    note: "Existing records stay readable.",
    state: "Read only",
  },
  {
    name: "Exports",
    note: "Scheduled files resume after the freeze.",
    state: "Paused",
  },
] as const;

export interface Error4Props {
  className?: string;
  onNotify?: () => void;
  onViewStatus?: () => void;
}

export function Error4({ className, onNotify, onViewStatus }: Error4Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Empty className="border border-dashed">
          <EmptyHeader className="max-w-lg">
            <Badge variant="secondary">01:00–03:00 UTC</Badge>
            <EmptyTitle className="text-xl">
              Inventory writes are frozen
            </EmptyTitle>
            <EmptyDescription>
              Dock systems are in a scheduled maintenance window. You can still
              read the queue. You cannot release holds or start recounts until
              03:00 UTC.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={onViewStatus} type="button">
                <ClipboardListIcon data-icon="inline-start" />
                Open read-only queue
              </Button>
              <Button onClick={onNotify} type="button" variant="outline">
                <BellIcon data-icon="inline-start" />
                Notify me at 03:00
              </Button>
            </div>
          </EmptyContent>
        </Empty>

        <Card>
          <CardHeader>
            <CardTitle>What stays available</CardTitle>
            <CardDescription>
              The freeze is scoped to writes against inventory, not the whole
              workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            {windowRows.map((row, index) => (
              <div key={row.name}>
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">{row.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {row.note}
                    </span>
                  </div>
                  <Badge variant="outline">{row.state}</Badge>
                </div>
                {index < windowRows.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
