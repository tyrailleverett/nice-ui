import { CreditCardIcon, NetworkIcon, SparklesIcon } from "lucide-react";
import {
  MessageMark,
  Panel,
  SectionHeading,
  SettingsSwitch,
} from "@/components/app/settings-shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function IntegrationLogo({ name }: { name: string }) {
  return (
    <div className="flex size-12 items-center justify-center rounded-xl bg-muted ring-1 ring-foreground/10">
      {integrationIcon(name)}
    </div>
  );
}

function integrationIcon(name: string) {
  if (name === "n8n") {
    return <NetworkIcon className="text-rose-500" />;
  }
  if (name === "Slack") {
    return <MessageMark />;
  }
  if (name === "Discord") {
    return <SparklesIcon className="text-indigo-500" />;
  }
  return <CreditCardIcon className="text-violet-500" />;
}

function IntegrationCard({
  connected,
  name,
  description,
  options,
}: {
  connected: boolean;
  description: string;
  name: string;
  options?: [string, string, boolean][];
}) {
  return (
    <Panel className="p-5 sm:p-8">
      <div className="flex items-start gap-5">
        <IntegrationLogo name={name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-medium text-xl">{name}</h2>
              <p className="mt-1 text-muted-foreground">{description}</p>
            </div>
            <Button variant={connected ? "outline" : "default"}>
              {connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
          {options ? (
            <div className="mt-6 flex flex-col gap-4">
              {options.map(([label, detail, enabled]) => (
                <div
                  className="flex items-center justify-between rounded-xl bg-muted/60 px-4 py-4"
                  key={label}
                >
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-muted-foreground text-sm">{detail}</p>
                  </div>
                  <SettingsSwitch
                    defaultChecked={enabled}
                    label={`Toggle ${label}`}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}

export function Integrations({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 sm:p-8",
        className
      )}
    >
      <SectionHeading
        description="Connect your favorite apps to automate workflows and stay updated on events."
        title="Integrations"
      />
      <IntegrationCard
        connected={false}
        description="Automate your workflows and integrate with thousands of apps."
        name="n8n"
      />
      <IntegrationCard
        connected
        description="Send call and message logs to your Slack workspace."
        name="Slack"
        options={[
          ["Messages", "Send incoming messages to my channel", true],
          ["Alerts", "Send system alerts to my channel", true],
        ]}
      />
      <IntegrationCard
        connected
        description="Post event notifications to your Discord server channels."
        name="Discord"
        options={[
          ["Deploys", "Notify on successful deployments", true],
          ["Errors", "Forward error reports to a channel", false],
        ]}
      />
      <IntegrationCard
        connected={false}
        description="Sync payment events and subscription lifecycle changes."
        name="Stripe"
      />
    </div>
  );
}
