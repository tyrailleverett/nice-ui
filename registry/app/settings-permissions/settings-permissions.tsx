import {
  Panel,
  SectionHeading,
  SettingsSwitch,
  SettingsTag,
} from "@/components/app/settings-shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const permissionItems = [
  [
    "Workspace Settings",
    "Review workspace details, team defaults, and operational preferences.",
    true,
  ],
  [
    "Billing Management",
    "Access plan details, invoices, and subscription adjustments.",
    false,
  ],
  [
    "Integration Setup",
    "Configure apps, credentials, and automation entry points.",
    true,
  ],
  [
    "Permissions Control",
    "Grant, revoke, and review access scopes for collaborators.",
    false,
  ],
  [
    "Map Creation",
    "Create new workspace maps and maintain location structure.",
    false,
  ],
  [
    "Data Export",
    "Download structured workspace reports for analysis and audits.",
    true,
  ],
  [
    "User Roles",
    "Edit role assignments and keep team responsibility lines clear.",
    true,
  ],
  [
    "Security Settings",
    "Adjust workspace protection controls and policy requirements.",
    true,
  ],
  [
    "Insights Access",
    "View performance dashboards, usage trends, and reporting panels.",
    false,
  ],
  [
    "Merchant List",
    "Maintain merchant records and workspace-linked account mappings.",
    false,
  ],
] as const;

export function RolePermissions({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col gap-5 p-4 sm:p-8",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <SectionHeading
          description="Control the workspace capabilities this role can manage."
          title="Role Permissions for Project Manager"
        />
        <Button>
          Permission <SettingsTag tone="success">New</SettingsTag>
        </Button>
      </div>
      <Panel className="p-5 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          {permissionItems.map(([label, description, checked]) => (
            <div
              className="flex min-h-36 items-start justify-between gap-4 rounded-xl border border-border p-5"
              key={label}
            >
              <div>
                <h2 className="font-medium text-lg">{label}</h2>
                <p className="mt-3 text-muted-foreground">{description}</p>
              </div>
              <SettingsSwitch
                defaultChecked={checked}
                label={`Toggle ${label}`}
              />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
