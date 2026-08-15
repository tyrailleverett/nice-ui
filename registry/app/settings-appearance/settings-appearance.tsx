import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type ThemeMode = "light" | "dark" | "system";
type CornerStyle = "square" | "soft" | "round";
type Density = "comfortable" | "compact";
type TextSize = "default" | "large";

const lightTokens = {
  "--background": "oklch(1 0 0)",
  "--border": "oklch(0.922 0 0)",
  "--card": "oklch(1 0 0)",
  "--card-foreground": "oklch(0.145 0 0)",
  "--foreground": "oklch(0.145 0 0)",
  "--muted": "oklch(0.97 0 0)",
  "--muted-foreground": "oklch(0.556 0 0)",
  "--primary": "oklch(0.205 0 0)",
  "--primary-foreground": "oklch(0.985 0 0)",
  "--sidebar": "oklch(0.985 0 0)",
  "--sidebar-foreground": "oklch(0.145 0 0)",
} as const;

const darkTokens = {
  "--background": "oklch(0.145 0 0)",
  "--border": "oklch(1 0 0 / 10%)",
  "--card": "oklch(0.205 0 0)",
  "--card-foreground": "oklch(0.985 0 0)",
  "--foreground": "oklch(0.985 0 0)",
  "--muted": "oklch(0.269 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--primary": "oklch(0.922 0 0)",
  "--primary-foreground": "oklch(0.205 0 0)",
  "--sidebar": "oklch(0.205 0 0)",
  "--sidebar-foreground": "oklch(0.985 0 0)",
} as const;

const themeOptions: {
  description: string;
  icon: typeof SunIcon;
  label: string;
  value: ThemeMode;
}[] = [
  {
    description: "Bright canvas for daytime desks.",
    icon: SunIcon,
    label: "Light",
    value: "light",
  },
  {
    description: "Dim canvas for low light.",
    icon: MoonIcon,
    label: "Dark",
    value: "dark",
  },
  {
    description: "Follows this device.",
    icon: MonitorIcon,
    label: "Match display",
    value: "system",
  },
];

const queueRows = [
  { label: "Northline hold", meta: "Dock 4" },
  { label: "Harbor delay", meta: "Bay 12" },
  { label: "Westside pickup", meta: "Gate B" },
] as const;

function stageRadius(corners: CornerStyle) {
  if (corners === "square") {
    return "rounded-none";
  }
  if (corners === "round") {
    return "rounded-2xl";
  }
  return "rounded-lg";
}

function tokenStyle(mode: "light" | "dark"): React.CSSProperties {
  return (mode === "dark" ? darkTokens : lightTokens) as React.CSSProperties;
}

function WorkspaceStage({
  className,
  contrast,
  corners,
  density,
  mode,
  reducedMotion,
  split = false,
  textSize,
}: {
  className?: string;
  contrast: boolean;
  corners: CornerStyle;
  density: Density;
  mode: "light" | "dark";
  reducedMotion: boolean;
  split?: boolean;
  textSize: TextSize;
}) {
  const compact = density === "compact";
  const largeType = textSize === "large";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden bg-background text-foreground ring-1",
        contrast ? "ring-foreground/40" : "ring-foreground/10",
        stageRadius(corners),
        reducedMotion
          ? "transition-none"
          : "transition-[border-radius,box-shadow]",
        className
      )}
      style={split ? undefined : tokenStyle(mode)}
    >
      {split ? (
        <div className="grid h-full grid-cols-2">
          <WorkspaceChrome
            compact={compact}
            contrast={contrast}
            largeType={largeType}
            mode="light"
          />
          <WorkspaceChrome
            compact={compact}
            contrast={contrast}
            largeType={largeType}
            mode="dark"
          />
        </div>
      ) : (
        <WorkspaceChrome
          compact={compact}
          contrast={contrast}
          largeType={largeType}
          mode={mode}
        />
      )}
    </div>
  );
}

function WorkspaceChrome({
  compact,
  contrast,
  largeType,
  mode,
}: {
  compact: boolean;
  contrast: boolean;
  largeType: boolean;
  mode: "light" | "dark";
}) {
  return (
    <div
      className={cn("flex h-full min-h-36", mode === "dark" && "dark")}
      style={tokenStyle(mode)}
    >
      <aside className="flex w-8 shrink-0 flex-col items-center gap-1.5 bg-sidebar py-2.5">
        <span className="size-3 rounded-full bg-primary" />
        <span className="size-2.5 rounded-sm bg-muted-foreground/40" />
        <span className="size-2.5 rounded-sm bg-muted-foreground/25" />
        <span className="size-2.5 rounded-sm bg-muted-foreground/25" />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-2 bg-background p-2">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "font-medium",
              largeType ? "text-[11px]" : "text-[9px]"
            )}
          >
            Exception queue
          </span>
          <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[8px] text-primary-foreground">
            3 open
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <span className="rounded-sm bg-card px-1.5 py-1 ring-1 ring-foreground/10">
            <span className="block text-[8px] text-muted-foreground">Held</span>
            <span
              className={cn(
                "font-medium",
                largeType ? "text-xs" : "text-[10px]"
              )}
            >
              12
            </span>
          </span>
          <span className="rounded-sm bg-card px-1.5 py-1 ring-1 ring-foreground/10">
            <span className="block text-[8px] text-muted-foreground">ETA</span>
            <span
              className={cn(
                "font-medium",
                largeType ? "text-xs" : "text-[10px]"
              )}
            >
              18m
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {queueRows.map((row) => (
            <div
              className={cn(
                "flex items-center justify-between bg-card",
                compact ? "px-1.5 py-0.5" : "px-1.5 py-1.5",
                contrast
                  ? "ring-1 ring-foreground/30"
                  : "ring-1 ring-foreground/10"
              )}
              key={row.label}
            >
              <span
                className={cn(
                  "truncate",
                  largeType ? "text-[10px]" : "text-[8px]"
                )}
              >
                {row.label}
              </span>
              <span className="text-[8px] text-muted-foreground">
                {row.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppearanceHeading({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="font-heading font-semibold text-title sm:text-3xl">
        {title}
      </h1>
      <p className="text-base text-muted-foreground sm:text-lg">
        {description}
      </p>
    </header>
  );
}

function AppearancePanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl bg-card text-card-foreground ring-1 ring-foreground/10",
        className
      )}
    >
      {children}
    </section>
  );
}

function AppearanceRow({
  children,
  description,
  label,
}: {
  children: React.ReactNode;
  description: string;
  label: string;
}) {
  return (
    <div className="grid gap-4 border-border border-b p-5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,1fr)] sm:items-center sm:px-7">
      <div className="min-w-0">
        <p className="font-medium text-base">{label}</p>
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="min-w-0 sm:justify-self-end">{children}</div>
    </div>
  );
}

export interface ThemeStagePickerProps {
  className?: string;
  contrast?: boolean;
  corners?: CornerStyle;
  density?: Density;
  onThemeChange?: (theme: ThemeMode) => void;
  textSize?: TextSize;
  theme?: ThemeMode;
}

export function ThemeStagePicker({
  className,
  contrast = false,
  corners = "soft",
  density = "comfortable",
  onThemeChange,
  textSize = "default",
  theme: themeProp,
}: ThemeStagePickerProps) {
  const [uncontrolledTheme, setUncontrolledTheme] =
    useState<ThemeMode>("light");
  const theme = themeProp ?? uncontrolledTheme;

  const handleThemeChange = useCallback(
    (value: string) => {
      if (value !== "light" && value !== "dark" && value !== "system") {
        return;
      }
      onThemeChange?.(value);
      if (themeProp === undefined) {
        setUncontrolledTheme(value);
      }
    },
    [onThemeChange, themeProp]
  );

  return (
    <RadioGroup
      aria-label="Theme"
      className={cn("grid gap-3 sm:grid-cols-3", className)}
      onValueChange={handleThemeChange}
      value={theme}
    >
      {themeOptions.map((option) => {
        const selected = theme === option.value;
        const Icon = option.icon;

        return (
          <Label
            className={cn(
              "flex cursor-pointer flex-col gap-3 rounded-xl bg-card p-3 font-normal ring-1 ring-foreground/10",
              selected && "ring-2 ring-ring"
            )}
            key={option.value}
          >
            <WorkspaceStage
              className="h-32"
              contrast={contrast}
              corners={corners}
              density={density}
              mode={option.value === "dark" ? "dark" : "light"}
              reducedMotion
              split={option.value === "system"}
              textSize={textSize}
            />
            <span className="flex items-start gap-2">
              <RadioGroupItem className="mt-0.5" value={option.value} />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="flex items-center gap-1.5 font-medium text-sm">
                  <Icon className="size-3.5" />
                  {option.label}
                </span>
                <span className="text-muted-foreground text-xs">
                  {option.description}
                </span>
              </span>
            </span>
          </Label>
        );
      })}
    </RadioGroup>
  );
}

export interface DisplayComfortProps {
  className?: string;
  density?: Density;
  largeContrast?: boolean;
  onContrastChange?: (value: boolean) => void;
  onDensityChange?: (value: Density) => void;
  onReducedMotionChange?: (value: boolean) => void;
  onTextSizeChange?: (value: TextSize) => void;
  reducedMotion?: boolean;
  textSize?: TextSize;
}

export function DisplayComfort({
  className,
  density: densityProp,
  largeContrast: contrastProp,
  onContrastChange,
  onDensityChange,
  onReducedMotionChange,
  onTextSizeChange,
  reducedMotion: motionProp,
  textSize: textSizeProp,
}: DisplayComfortProps) {
  const [uncontrolledDensity, setUncontrolledDensity] =
    useState<Density>("comfortable");
  const [uncontrolledTextSize, setUncontrolledTextSize] =
    useState<TextSize>("default");
  const [uncontrolledMotion, setUncontrolledMotion] = useState(false);
  const [uncontrolledContrast, setUncontrolledContrast] = useState(false);

  const density = densityProp ?? uncontrolledDensity;
  const textSize = textSizeProp ?? uncontrolledTextSize;
  const reducedMotion = motionProp ?? uncontrolledMotion;
  const largeContrast = contrastProp ?? uncontrolledContrast;

  const handleDensityChange = useCallback(
    (value: string) => {
      if (value !== "comfortable" && value !== "compact") {
        return;
      }
      onDensityChange?.(value);
      if (densityProp === undefined) {
        setUncontrolledDensity(value);
      }
    },
    [densityProp, onDensityChange]
  );

  const handleTextSizeChange = useCallback(
    (value: string) => {
      if (value !== "default" && value !== "large") {
        return;
      }
      onTextSizeChange?.(value);
      if (textSizeProp === undefined) {
        setUncontrolledTextSize(value);
      }
    },
    [onTextSizeChange, textSizeProp]
  );

  const handleMotionChange = useCallback(
    (checked: boolean) => {
      onReducedMotionChange?.(checked);
      if (motionProp === undefined) {
        setUncontrolledMotion(checked);
      }
    },
    [motionProp, onReducedMotionChange]
  );

  const handleContrastChange = useCallback(
    (checked: boolean) => {
      onContrastChange?.(checked);
      if (contrastProp === undefined) {
        setUncontrolledContrast(checked);
      }
    },
    [contrastProp, onContrastChange]
  );

  return (
    <AppearancePanel className={className}>
      <AppearanceRow
        description="How much space sits between rows and controls."
        label="Density"
      >
        <ToggleGroup
          onValueChange={handleDensityChange}
          type="single"
          value={density}
          variant="outline"
        >
          <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
          <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
        </ToggleGroup>
      </AppearanceRow>
      <AppearanceRow
        description="Size of labels and body text across the workspace."
        label="Text size"
      >
        <ToggleGroup
          onValueChange={handleTextSizeChange}
          type="single"
          value={textSize}
          variant="outline"
        >
          <ToggleGroupItem value="default">Default</ToggleGroupItem>
          <ToggleGroupItem value="large">Large</ToggleGroupItem>
        </ToggleGroup>
      </AppearanceRow>
      <AppearanceRow
        description="Keep transitions to a minimum."
        label="Reduce motion"
      >
        <Switch
          aria-label="Reduce motion"
          checked={reducedMotion}
          onCheckedChange={handleMotionChange}
        />
      </AppearanceRow>
      <AppearanceRow
        description="Stronger borders and text against the canvas."
        label="Increase contrast"
      >
        <Switch
          aria-label="Increase contrast"
          checked={largeContrast}
          onCheckedChange={handleContrastChange}
        />
      </AppearanceRow>
    </AppearancePanel>
  );
}

export interface AppearanceSettingsProps {
  className?: string;
}

export function AppearanceSettings({ className }: AppearanceSettingsProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [corners, setCorners] = useState<CornerStyle>("soft");
  const [density, setDensity] = useState<Density>("comfortable");
  const [textSize, setTextSize] = useState<TextSize>("default");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [contrast, setContrast] = useState(false);

  const handleCornersChange = useCallback((value: string) => {
    if (value === "square" || value === "soft" || value === "round") {
      setCorners(value);
    }
  }, []);

  const handleReset = useCallback(() => {
    setTheme("light");
    setCorners("soft");
    setDensity("comfortable");
    setTextSize("default");
    setReducedMotion(false);
    setContrast(false);
  }, []);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-8",
        className
      )}
    >
      <AppearanceHeading
        description="Choose how the workspace looks while you work."
        title="Appearance"
      />

      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-lg">Theme</h2>
        <p className="text-muted-foreground text-sm">
          Pick a canvas. The stages follow density, type, and contrast as you
          change them.
        </p>
        <ThemeStagePicker
          contrast={contrast}
          corners={corners}
          density={density}
          onThemeChange={setTheme}
          textSize={textSize}
          theme={theme}
        />
      </div>

      <AppearancePanel>
        <AppearanceRow
          description="How sharp the workspace frames feel."
          label="Corners"
        >
          <ToggleGroup
            onValueChange={handleCornersChange}
            type="single"
            value={corners}
            variant="outline"
          >
            <ToggleGroupItem value="square">Square</ToggleGroupItem>
            <ToggleGroupItem value="soft">Soft</ToggleGroupItem>
            <ToggleGroupItem value="round">Round</ToggleGroupItem>
          </ToggleGroup>
        </AppearanceRow>
      </AppearancePanel>

      <DisplayComfort
        density={density}
        largeContrast={contrast}
        onContrastChange={setContrast}
        onDensityChange={setDensity}
        onReducedMotionChange={setReducedMotion}
        onTextSizeChange={setTextSize}
        reducedMotion={reducedMotion}
        textSize={textSize}
      />

      <div className="flex justify-end gap-2">
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
        <Button>Save changes</Button>
      </div>
    </div>
  );
}

export const settingsAppearance = {
  AppearanceSettings,
  DisplayComfort,
  ThemeStagePicker,
};
