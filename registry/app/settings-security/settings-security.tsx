import { SettingsRow } from "@/components/app/settings-layout";
import {
  SectionHeading,
  SecurityGroup,
  SelectField,
  SettingsSwitch,
  SettingsTag,
} from "@/components/app/settings-shared";
import { cn } from "@/lib/utils";

export function SecuritySettings({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 sm:p-8",
        className
      )}
    >
      <SectionHeading
        description="Define authentication rules and access boundaries for your workspace."
        title="Security"
      />
      <SecurityGroup
        description="Configure session duration and timeout rules for your workspace."
        title="Session Policy"
      >
        <SettingsRow
          description="Require all members to enable 2FA."
          label="Enforce two-factor authentication"
        >
          <div className="flex justify-end">
            <SettingsSwitch label="Toggle two-factor authentication" />
          </div>
        </SettingsRow>
        <SettingsRow
          description="Auto-logout after inactivity period."
          label="Session timeout"
        >
          <SelectField
            defaultValue="4 hours"
            items={["1 hour", "4 hours", "8 hours", "Never"]}
            label="Session timeout"
          />
        </SettingsRow>
        <SettingsRow
          description="Limit each user to one active session."
          label="Single active session"
        >
          <div className="flex justify-end">
            <SettingsSwitch label="Toggle single active session" />
          </div>
        </SettingsRow>
      </SecurityGroup>
      <SecurityGroup
        description="Admins can always sign in via email. Changes apply to workspace members only."
        title="Login Methods"
      >
        <SettingsRow
          description="Allow members to log in with a password."
          label="Password authentication"
        >
          <div className="flex justify-end">
            <SettingsSwitch
              defaultChecked
              label="Toggle password authentication"
            />
          </div>
        </SettingsRow>
        <SettingsRow
          description="Send a one-time link via email to sign in."
          label="Magic link login"
        >
          <div className="flex justify-end">
            <SettingsSwitch defaultChecked label="Toggle magic link login" />
          </div>
        </SettingsRow>
        <SettingsRow
          description="Authenticate via your identity provider."
          label="SAML single sign-on"
        >
          <div className="flex justify-end">
            <SettingsTag tone="accent">Enterprise</SettingsTag>
          </div>
        </SettingsRow>
      </SecurityGroup>
      <SecurityGroup
        description="Control which plan features are available to your workspace."
        title="Access Restrictions"
      >
        <SettingsRow
          description="Who can invite new members."
          label="Member invitations"
        >
          <div className="flex justify-end">
            <SettingsTag tone="success">Basic</SettingsTag>
          </div>
        </SettingsRow>
        <SettingsRow
          description="Who can create new projects."
          label="Project creation"
        >
          <div className="flex justify-end">
            <SettingsTag tone="warning">Business</SettingsTag>
          </div>
        </SettingsRow>
        <SettingsRow
          description="Create and assign custom roles."
          label="Custom roles"
        >
          <div className="flex justify-end">
            <SettingsTag tone="warning">Business</SettingsTag>
          </div>
        </SettingsRow>
        <SettingsRow
          description="View and download workspace activity."
          label="Audit log access"
        >
          <div className="flex justify-end">
            <SettingsTag tone="accent">Enterprise</SettingsTag>
          </div>
        </SettingsRow>
      </SecurityGroup>
    </div>
  );
}
