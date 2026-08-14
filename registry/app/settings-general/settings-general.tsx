import { CloudUploadIcon, PlusIcon } from "lucide-react";
import { SettingsRow } from "@/components/app/settings-layout";
import {
  Panel,
  SectionHeading,
  SelectField,
  SettingsSwitch,
} from "@/components/app/settings-shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const accentColors = [
  "bg-slate-500",
  "bg-rose-500",
  "bg-orange-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-sky-500",
] as const;

const dateFormats = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY/MM/DD"] as const;

const editorPreferences = [
  [
    "Enable keyboard shortcuts",
    "Use shortcuts to speed up your workflow.",
    true,
  ],
  ["Auto spell-check", "Highlight spelling errors in text fields.", true],
  ["Compact mode", "Reduce spacing for a denser interface layout.", false],
  ["Reduce animations", "Minimize motion effects throughout the UI.", false],
] as const;

export function GeneralSettings({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-8",
        className
      )}
    >
      <SectionHeading
        description="Core app preferences."
        title="General Settings"
      />
      <Panel>
        <SettingsRow
          description="The display name for your project across the platform."
          label="Project name"
        >
          <Input defaultValue="Acme Dashboard" />
        </SettingsRow>
        <SettingsRow
          description="Set the base URL for your project API."
          label="API endpoint"
        >
          <Input defaultValue="https://api.acme.io" />
        </SettingsRow>
        <SettingsRow
          description="Choose which day marks the start of your week."
          label="Start of week"
        >
          <SelectField
            defaultValue="Monday"
            items={["Monday", "Sunday", "Saturday"]}
          />
        </SettingsRow>
        <SettingsRow
          description="Define the trusted domains for CORS requests."
          label="Allowed origins"
        >
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="outline">
              <PlusIcon /> Add origin
            </Button>
            <Button variant="outline">
              <CloudUploadIcon /> Import from file
            </Button>
          </div>
        </SettingsRow>
        <SettingsRow
          description="Select a color to represent your brand."
          label="Accent color"
        >
          <div className="flex flex-wrap justify-end gap-3">
            {accentColors.map((color, index) => (
              <button
                aria-label={`Select accent color ${index + 1}`}
                className={cn(
                  "size-8 rounded-full",
                  color,
                  index === 0 &&
                    "ring-2 ring-ring ring-offset-2 ring-offset-card"
                )}
                key={color}
                type="button"
              >
                <span className="sr-only">Select</span>
              </button>
            ))}
          </div>
        </SettingsRow>
        <SettingsRow
          className="sm:items-start"
          description="Adjust your regional preferences and currency."
          label="Region & currency"
        >
          <div className="flex flex-col gap-3">
            <SelectField
              defaultValue="United States"
              items={["United States", "Canada", "United Kingdom"]}
            />
            <SelectField
              defaultValue="USD · US Dollar"
              items={["USD · US Dollar", "EUR · Euro", "GBP · Pound Sterling"]}
            />
          </div>
        </SettingsRow>
        <SettingsRow
          description="Choose your preferred format for dates."
          label="Date display format"
        >
          <div className="flex flex-wrap justify-end gap-2">
            {dateFormats.map((format, index) => (
              <Button
                key={format}
                variant={index === 0 ? "secondary" : "outline"}
              >
                {format}
              </Button>
            ))}
          </div>
        </SettingsRow>
        <SettingsRow
          className="sm:items-start"
          description="Adjust your editing environment and display options."
          label="Editor preferences"
        >
          <div className="flex flex-col gap-4">
            {editorPreferences.map(([label, description, checked]) => (
              <div
                className="flex items-start justify-between gap-4"
                key={label}
              >
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-muted-foreground text-xs">{description}</p>
                </div>
                <SettingsSwitch defaultChecked={checked} label={label} />
              </div>
            ))}
          </div>
        </SettingsRow>
      </Panel>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  );
}
