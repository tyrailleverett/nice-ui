import {
  BellIcon,
  BotIcon,
  FileTextIcon,
  Globe2Icon,
  Link2Icon,
  MailIcon,
  SparklesIcon,
  UsersRoundIcon,
} from "lucide-react";
import type { ElementType, ReactNode } from "react";
import {
  Panel,
  SettingsSwitch,
  SettingsTag,
} from "@/components/app/settings-shared";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function FeatureRow({
  children,
  description,
  icon: Icon,
  label,
  trailing,
}: {
  children?: ReactNode;
  description: string;
  icon: ElementType;
  label: string;
  trailing: ReactNode;
}) {
  return (
    <div className="flex items-center gap-5 border-border border-b p-5 last:border-b-0 sm:px-7">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground ring-1 ring-foreground/10">
        <Icon />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-lg">
          {label} {children}
        </p>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {trailing}
    </div>
  );
}

function FeatureGroup({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="px-1 font-semibold text-lg">{title}</h2>
      <Panel>{children}</Panel>
    </section>
  );
}

export function WorkspaceFeatures({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 sm:p-8",
        className
      )}
    >
      <FeatureGroup title="AI features">
        <FeatureRow
          description="Find content by meaning, not exact wording."
          icon={BotIcon}
          label="Enable AI semantic search"
          trailing={
            <SettingsSwitch defaultChecked label="Toggle semantic search" />
          }
        >
          <SettingsTag>Smart</SettingsTag>
        </FeatureRow>
        <FeatureRow
          description="Surface patterns and highlights from your workspace."
          icon={SparklesIcon}
          label="Enable AI insight"
          trailing={<SettingsSwitch defaultChecked label="Toggle AI insight" />}
        >
          <SettingsTag tone="accent">Beta</SettingsTag>
        </FeatureRow>
      </FeatureGroup>
      <FeatureGroup title="Publishing">
        <FeatureRow
          description="Short hostname visitors use before your custom domain."
          icon={Globe2Icon}
          label="Subdomain"
          trailing={<Button variant="outline">Edit subdomain</Button>}
        >
          <SettingsTag>Fallback</SettingsTag>
        </FeatureRow>
        <FeatureRow
          description="Bring your brand URL and serve it over HTTPS."
          icon={Link2Icon}
          label="Custom domain"
          trailing={<Button variant="outline">Connect domain</Button>}
        >
          <SettingsTag tone="success">HTTPS</SettingsTag>
        </FeatureRow>
        <FeatureRow
          description="What new visitors see when they land on your site."
          icon={FileTextIcon}
          label="Default content"
          trailing={<Button variant="outline">Change default</Button>}
        >
          <SettingsTag tone="warning">Homepage</SettingsTag>
        </FeatureRow>
      </FeatureGroup>
      <FeatureGroup title="Collaboration">
        <FeatureRow
          description=""
          icon={UsersRoundIcon}
          label="Workspace team"
          trailing={<Button variant="outline">Manage members</Button>}
        >
          <SettingsTag>12 members</SettingsTag>
          <div className="mt-3 flex -space-x-2">
            <Avatar className="ring-2 ring-card">
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <Avatar className="ring-2 ring-card">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="ring-2 ring-card">
              <AvatarFallback>+8</AvatarFallback>
            </Avatar>
          </div>
        </FeatureRow>
      </FeatureGroup>
      <FeatureGroup title="Notifications">
        <FeatureRow
          description="Weekly summary of activity and mentions in this workspace."
          icon={MailIcon}
          label="Email digest"
          trailing={
            <SettingsSwitch defaultChecked label="Toggle email digest" />
          }
        >
          <SettingsTag>Weekly</SettingsTag>
        </FeatureRow>
        <FeatureRow
          description="Show real-time notifications while you are working here."
          icon={BellIcon}
          label="In-app alerts"
          trailing={
            <SettingsSwitch defaultChecked label="Toggle in-app alerts" />
          }
        >
          <SettingsTag tone="accent">Instant</SettingsTag>
        </FeatureRow>
      </FeatureGroup>
    </div>
  );
}
