import { SettingsRow } from "@/components/app/settings-layout";
import {
  PreferenceSection,
  SectionHeading,
  SelectField,
  SettingsSwitch,
} from "@/components/app/settings-shared";
import { cn } from "@/lib/utils";

export function WorkspacePreferences({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 sm:p-8",
        className
      )}
    >
      <SectionHeading
        description="Adjust defaults that apply across your entire workspace."
        title="Workspace Preferences"
      />
      <PreferenceSection title="General">
        <SettingsRow
          description="Choose which layout opens on launch."
          label="Default view"
        >
          <SelectField
            defaultValue="Board"
            items={["Board", "List", "Calendar"]}
            label="Default view"
          />
        </SettingsRow>
        <SettingsRow
          description="Set how dates appear across the app."
          label="Date format"
        >
          <SelectField
            defaultValue="MM/DD/YYYY"
            items={["MM/DD/YYYY", "DD/MM/YYYY", "YYYY/MM/DD"]}
            label="Date format"
          />
        </SettingsRow>
        <SettingsRow
          description="Used for calendars and date pickers."
          label="First day of week"
        >
          <SelectField
            defaultValue="Monday"
            items={["Monday", "Sunday"]}
            label="First day of week"
          />
        </SettingsRow>
        <SettingsRow
          description="Automatically save unsaved changes."
          label="Auto-save drafts"
        >
          <div className="flex justify-end">
            <SettingsSwitch defaultChecked label="Toggle auto-save drafts" />
          </div>
        </SettingsRow>
        <SettingsRow
          description="Enable formatting toolbar in text fields."
          label="Rich text editing"
        >
          <div className="flex justify-end">
            <SettingsSwitch defaultChecked label="Toggle rich text editing" />
          </div>
        </SettingsRow>
      </PreferenceSection>
      <PreferenceSection title="Display">
        <SettingsRow
          description="Choose your preferred color scheme."
          label="Color theme"
        >
          <SelectField
            defaultValue="System"
            items={["System", "Light", "Dark"]}
            label="Color theme"
          />
        </SettingsRow>
        <SettingsRow
          description="Set the navigation sidebar placement."
          label="Sidebar position"
        >
          <SelectField
            defaultValue="Left"
            items={["Left", "Right"]}
            label="Sidebar position"
          />
        </SettingsRow>
        <SettingsRow
          description="Minimize motion for accessibility."
          label="Reduce animations"
        >
          <div className="flex justify-end">
            <SettingsSwitch label="Toggle reduce animations" />
          </div>
        </SettingsRow>
        <SettingsRow
          description="Display helpful hints on hover."
          label="Show tooltips"
        >
          <div className="flex justify-end">
            <SettingsSwitch defaultChecked label="Toggle tooltips" />
          </div>
        </SettingsRow>
      </PreferenceSection>
    </div>
  );
}
