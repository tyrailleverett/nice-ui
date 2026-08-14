import {
  CalendarDaysIcon,
  Code2Icon,
  CreditCardIcon,
  MoreVerticalIcon,
  NotebookPenIcon,
  SparklesIcon,
  VideoIcon,
  WandSparklesIcon,
} from "lucide-react";
import type { ElementType } from "react";
import {
  MessageMark,
  Panel,
  SectionHeading,
  SettingsTag,
} from "@/components/app/settings-shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Connection {
  category: string;
  description: string;
  icon: ElementType;
  name: string;
  status: "Connected" | "Needs review";
}

const connections: Connection[] = [
  {
    category: "Communication",
    description: "Route alerts and approvals to channels.",
    icon: MessageMark,
    name: "Slack",
    status: "Needs review",
  },
  {
    category: "Communication",
    description: "Sync recordings and meeting summaries.",
    icon: VideoIcon,
    name: "Zoom",
    status: "Connected",
  },
  {
    category: "Communication",
    description: "Mirror updates and support escalations.",
    icon: SparklesIcon,
    name: "Discord",
    status: "Connected",
  },
  {
    category: "Collaboration",
    description: "Attach walkthroughs to tickets and notes.",
    icon: WandSparklesIcon,
    name: "Loom",
    status: "Connected",
  },
  {
    category: "Collaboration",
    description: "Link engineering context to active work.",
    icon: Code2Icon,
    name: "Cursor",
    status: "Needs review",
  },
  {
    category: "Collaboration",
    description: "Push guides and enable team learning.",
    icon: NotebookPenIcon,
    name: "LearnThis",
    status: "Connected",
  },
  {
    category: "Scheduling",
    description: "Create reminders from project changes.",
    icon: CalendarDaysIcon,
    name: "Google Calendar",
    status: "Connected",
  },
  {
    category: "Scheduling",
    description: "Auto-generate meeting links for events.",
    icon: VideoIcon,
    name: "Google Meet",
    status: "Connected",
  },
  {
    category: "Scheduling",
    description: "Sync payments and subscription events.",
    icon: CreditCardIcon,
    name: "Stripe",
    status: "Needs review",
  },
];

function groupDescription(group: string) {
  if (group === "Communication") {
    return "Channels and meetings for alerts and team updates.";
  }
  if (group === "Collaboration") {
    return "Async video, dev context, and learning content.";
  }
  return "Calendar, video calls, and billing integrations.";
}

export function AppConnections({ className }: { className?: string }) {
  const groups = [...new Set(connections.map((item) => item.category))];
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 sm:p-8",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <SectionHeading
          description="Manage third-party services for workflow automation."
          title="App Connections"
        />
        <Button>New Connection</Button>
      </div>
      {groups.map((group) => (
        <Panel className="p-5 sm:p-7" key={group}>
          <div className="mb-5">
            <h2 className="font-semibold text-lg">{group}</h2>
            <p className="text-muted-foreground">{groupDescription(group)}</p>
          </div>
          <div className="divide-y divide-dashed divide-border">
            {connections
              .filter((item) => item.category === group)
              .map(({ description, icon: Icon, name, status }) => (
                <div
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  key={name}
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-xl ring-1 ring-foreground/10">
                    <Icon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-lg">{name}</p>
                    <p className="truncate text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <SettingsTag
                    tone={status === "Connected" ? "success" : "warning"}
                  >
                    <span className="size-2 rounded-full bg-current" />
                    {status}
                  </SettingsTag>
                  <Button
                    aria-label={`More options for ${name}`}
                    size="icon"
                    variant="outline"
                  >
                    <MoreVerticalIcon />
                  </Button>
                </div>
              ))}
          </div>
        </Panel>
      ))}
    </div>
  );
}
