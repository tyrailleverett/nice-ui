/* biome-ignore-all lint/performance/noJsxPropsBind: Dialog controls close over preset, section, and scope values. */
import {
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import {
  DialogFrame,
  type DialogProps,
  Footer,
} from "@/components/app/dialogs-shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

export function LaunchChecklistDialog(props: DialogProps) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const items = [
    [
      ShieldCheck,
      "Ownership & cadence",
      "Lock in the primary operator, workspace alias, and review window.",
    ],
    [
      SlidersHorizontal,
      "Connected apps",
      "Choose the tools that can send events or receive rollout updates.",
    ],
    [
      BellRing,
      "Fallback rules",
      "Set where alerts and digests land if the primary flow is paused.",
    ],
  ] as const;
  return (
    <Dialog {...props}>
      <DialogFrame
        className="sm:max-w-4xl"
        description="Finalize routing, apps, and fallback rules before launch."
        title="Launch checklist"
      >
        <div className="flex flex-col gap-6">
          {items.map(([Icon, heading, copy], index) => (
            <div className="flex gap-4" key={heading}>
              <div className="grid size-12 shrink-0 place-items-center rounded-xl border bg-muted">
                <Icon />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{heading}</h3>
                  <Badge
                    className="ml-auto"
                    variant={index === 0 ? "secondary" : "outline"}
                  >
                    {index === 0 ? "In progress" : "Pending"}
                  </Badge>
                  <Button
                    aria-label={`${expanded ? "Collapse" : "Expand"} ${heading}`}
                    onClick={() => setExpanded(!expanded)}
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    {expanded && index === 0 ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
                <p className="text-muted-foreground">{copy}</p>
                {expanded && index === 0 && (
                  <div className="grid gap-4 rounded-xl border p-4 text-muted-foreground md:grid-cols-2">
                    <span className="flex items-center gap-2">
                      <UserRound />
                      Launch owner{" "}
                      <strong className="ml-auto font-normal text-foreground">
                        Ari Mendoza
                      </strong>
                    </span>
                    <span className="flex items-center gap-2">
                      <BriefcaseBusiness />
                      Workspace alias{" "}
                      <strong className="ml-auto font-normal text-foreground">
                        growth-command
                      </strong>
                    </span>
                    <span className="flex items-center gap-2">
                      <CalendarDays />
                      Review window{" "}
                      <strong className="ml-auto font-normal text-foreground">
                        Tue, 10:00 UTC
                      </strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Footer action="Save" />
      </DialogFrame>
    </Dialog>
  );
}
