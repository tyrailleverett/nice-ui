import {
  ChevronUpIcon,
  InboxIcon,
  MailIcon,
  MonitorIcon,
  PhoneIcon,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";
import {
  Panel,
  SectionHeading,
  SettingsSwitch,
  SettingsTag,
} from "@/components/app/settings-shared";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function NotificationDeliverySelect() {
  return (
    <Select
      defaultValue="default"
      items={[
        { label: "Default", value: "default" },
        { label: "Important only", value: "important" },
        { label: "Off", value: "off" },
      ]}
    >
      <SelectTrigger
        aria-label="Notification delivery"
        className="h-12 w-full text-base"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="important">Important only</SelectItem>
          <SelectItem value="off">Off</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function NotificationChannelRow({
  action,
  badge,
  description,
  icon: Icon,
  label,
  nested = false,
}: {
  action?: ReactNode;
  badge?: ReactNode;
  description: string;
  icon: ElementType;
  label: string;
  nested?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid min-h-[7.5rem] gap-4 bg-card px-7 py-6 text-card-foreground sm:grid-cols-[3rem_minmax(0,1fr)_26rem] sm:items-center sm:px-9",
        !nested && "rounded-2xl ring-1 ring-foreground/10"
      )}
    >
      <Icon className="size-7 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-lg">{label}</p>
          {badge}
        </div>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      <div className="flex w-full justify-start sm:justify-end">
        {action ?? <NotificationDeliverySelect />}
      </div>
    </div>
  );
}

function NotificationSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-semibold text-xl">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function notificationConnectionLabel(name: "Google Meet" | "Slack" | "Zoom") {
  return name === "Google Meet" ? "Meet" : name;
}

function NotificationBrandMark({
  name,
}: {
  name: "Google Meet" | "Slack" | "Zoom";
}) {
  if (name === "Slack") {
    return (
      <span
        aria-label="Slack"
        className="grid size-8 grid-cols-2 gap-0.5 overflow-hidden rounded-md p-1"
        role="img"
      >
        <span className="rounded-sm bg-sky-500" />
        <span className="rounded-sm bg-emerald-500" />
        <span className="rounded-sm bg-rose-500" />
        <span className="rounded-sm bg-amber-400" />
      </span>
    );
  }
  if (name === "Zoom") {
    return (
      <span
        aria-label="Zoom"
        className="flex size-8 items-center justify-center rounded-full bg-blue-500 font-bold text-sm text-white"
        role="img"
      >
        Z
      </span>
    );
  }
  return (
    <span
      aria-label="Google Meet"
      className="relative block size-8 overflow-hidden rounded-md bg-emerald-500 before:absolute before:inset-y-1 before:left-0 before:w-4 before:bg-blue-500 after:absolute after:top-0 after:left-2 after:size-3 after:bg-amber-400"
      role="img"
    />
  );
}

function NotificationIntegrationRow({
  description,
  name,
}: {
  description: string;
  name: "Google Meet" | "Slack" | "Zoom";
}) {
  return (
    <div className="grid min-h-28 gap-4 rounded-2xl bg-card px-7 py-6 text-card-foreground ring-1 ring-foreground/10 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:px-9">
      <NotificationBrandMark name={name} />
      <div className="min-w-0">
        <p className="font-medium text-lg">{name}</p>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      <Button
        className="h-12 px-5 text-base sm:justify-self-end"
        variant="outline"
      >
        Connect {notificationConnectionLabel(name)}
      </Button>
    </div>
  );
}

export function NotificationSettings({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[84rem] flex-col gap-10 px-4 py-10 sm:px-8 sm:py-14 min-[1400px]:px-0",
        className
      )}
    >
      <SectionHeading
        description="Choose how workspace updates reach you."
        title="Notification settings"
      />
      <div className="flex flex-col gap-4">
        <NotificationChannelRow
          description="Approvals, handoffs, and follow-ups."
          icon={InboxIcon}
          label="Inbox"
        />
        <NotificationChannelRow
          badge={<SettingsTag tone="success">Send sample</SettingsTag>}
          description="Digests and direct alerts."
          icon={MailIcon}
          label="Email"
        />
        <NotificationChannelRow
          action={
            <Button
              className="h-12 w-full max-w-68 text-base"
              variant="outline"
            >
              Enable notifications
            </Button>
          }
          description="Desktop banners stay off until enabled."
          icon={MonitorIcon}
          label="Browser"
        />
        <Panel>
          <NotificationChannelRow
            badge={<SettingsTag tone="accent">Show example</SettingsTag>}
            description="Away-from-desk delivery."
            icon={PhoneIcon}
            label="Mobile"
            nested
          />
          <div className="grid min-h-28 gap-4 px-7 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_26rem] sm:items-center sm:px-9">
            <SettingsSwitch defaultChecked label="Toggle smart notifications" />
            <div className="sm:col-start-2">
              <p className="font-medium text-lg">Smart notifications</p>
              <p className="mt-1 text-muted-foreground">
                Pause phone alerts while desktop stays active.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <NotificationSection title="Integrations">
        <NotificationIntegrationRow
          description="Send priority updates to a team channel."
          name="Slack"
        />
        <NotificationIntegrationRow
          description="Post meeting alerts and call follow-ups."
          name="Zoom"
        />
        <NotificationIntegrationRow
          description="Route calendar and live session updates."
          name="Google Meet"
        />
      </NotificationSection>

      <NotificationSection title="General settings">
        <Panel>
          <div className="grid min-h-28 gap-4 px-7 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_3rem] sm:items-center sm:px-9">
            <SettingsSwitch
              defaultChecked
              label="Toggle auto-follow active work"
            />
            <div>
              <p className="font-medium text-lg">Auto-follow active work</p>
              <p className="mt-1 text-muted-foreground">Created work</p>
            </div>
            <Button
              aria-label="Collapse auto-follow settings"
              className="sm:justify-self-end"
              size="icon"
              variant="secondary"
            >
              <ChevronUpIcon />
            </Button>
          </div>
          <div className="grid gap-4 border-border border-t px-7 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-center sm:px-20">
            <SettingsSwitch
              defaultChecked
              label="Toggle follow work you create"
            />
            <div>
              <p className="font-medium text-lg">Follow work you create</p>
              <p className="mt-1 text-muted-foreground">
                Start tracking a task or thread the moment you open it.
              </p>
            </div>
          </div>
        </Panel>
      </NotificationSection>
    </div>
  );
}
