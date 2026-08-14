import {
  ArrowRightIcon,
  ChevronDownIcon,
  CircleUserRoundIcon,
  ImagePlusIcon,
  XIcon,
} from "lucide-react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useCallback } from "react";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export const ONBOARDING_STEPS = [
  { detail: "Identity and timezone.", label: "Profile" },
  { detail: "Role and use case.", label: "Role" },
  { detail: "Discovery source.", label: "Source" },
  { detail: "Workspace details.", label: "Workspace" },
  { detail: "First workflows.", label: "Goals" },
  { detail: "Optional teammates.", label: "Invite" },
] as const;

export interface OnboardingFormProps {
  compact?: boolean;
  jobTitle?: string;
  name?: string;
  onJobTitleChange?: (value: string) => void;
  onNameChange?: (value: string) => void;
  onSubmit?: () => void;
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <Logo
      aria-label="Nice UI"
      className={cn("h-8 w-auto text-foreground", className)}
    />
  );
}

export function ProfileForm({
  compact = false,
  jobTitle = "Product Engineer",
  name = "Sam Rivera",
  onJobTitleChange,
  onNameChange,
  onSubmit,
}: OnboardingFormProps) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.();
    },
    [onSubmit]
  );
  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onNameChange?.(event.target.value),
    [onNameChange]
  );
  const handleJobTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onJobTitleChange?.(event.target.value),
    [onJobTitleChange]
  );

  return (
    <form
      className={cn("flex flex-col", compact ? "gap-4" : "gap-5")}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-full border-2 border-border bg-muted/40 text-muted-foreground">
          <CircleUserRoundIcon size={29} strokeWidth={1.5} />
        </div>
        <div className="space-y-1.5">
          <button
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-secondary px-3.5 font-medium text-secondary-foreground text-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            type="button"
          >
            <ImagePlusIcon size={16} />
            Upload photo
          </button>
          <p className="text-muted-foreground text-xs sm:text-sm">
            PNG or JPG, at least 400 × 400 px, up to 10 MB.
          </p>
        </div>
      </div>

      <label className="grid gap-2 font-medium text-sm">
        <span>
          Full name <span className="text-destructive">*</span>
        </span>
        <input
          className="h-12 rounded-xl border border-input bg-background px-4 font-normal text-base text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          onChange={handleNameChange}
          required
          value={name}
        />
      </label>

      <label className="grid gap-2 font-medium text-sm">
        <span>Job title</span>
        <input
          className="h-12 rounded-xl border border-input bg-background px-4 font-normal text-base text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          onChange={handleJobTitleChange}
          value={jobTitle}
        />
      </label>

      <label className="grid gap-2 font-medium text-sm">
        <span>Timezone</span>
        <span className="relative">
          <select className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 font-normal text-base text-muted-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
            <option>Select a timezone</option>
            <option>Central Time (Chicago)</option>
            <option>Pacific Time (Los Angeles)</option>
            <option>Eastern Time (New York)</option>
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
        </span>
      </label>
    </form>
  );
}

export function ContinueButton({
  children = "Continue",
  className,
  icon = false,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-medium text-base text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        className
      )}
      onClick={onClick}
      type="button"
    >
      {children}
      {icon ? <ArrowRightIcon size={19} /> : null}
    </button>
  );
}

export function StepRail({
  current = 0,
  dotted = false,
}: {
  current?: number;
  dotted?: boolean;
}) {
  return (
    <nav aria-label="Onboarding steps" className="flex flex-col gap-6">
      {ONBOARDING_STEPS.map((step, index) => {
        const active = index === current;
        return (
          <div className="relative flex gap-3" key={step.label}>
            {index < ONBOARDING_STEPS.length - 1 ? (
              <span
                className={cn(
                  "absolute top-7 left-[13px] h-8 w-px",
                  dotted
                    ? "border-muted-foreground/40 border-l border-dashed"
                    : "bg-border"
                )}
              />
            ) : null}
            <span
              className={cn(
                "relative z-10 grid size-7 shrink-0 place-items-center rounded-full border text-xs",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground"
              )}
            >
              {dotted && active ? (
                <span className="size-2 rounded-full bg-current" />
              ) : (
                index + 1
              )}
            </span>
            <span className="grid gap-0.5 pt-0.5">
              <span
                className={cn(
                  "font-medium text-sm",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              <span className="text-muted-foreground text-xs">
                {step.detail}
              </span>
            </span>
          </div>
        );
      })}
    </nav>
  );
}

export function ProductPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full min-h-80 overflow-hidden bg-muted/20 p-8"
    >
      <div className="absolute top-20 -right-20 h-96 w-[34rem] rotate-[-8deg] rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex h-16 items-center gap-4 border-border border-b px-5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground text-xs">
            R
          </span>
          <span className="font-semibold">Sam Rivera</span>
          <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground text-xs">
            4
          </span>
        </div>
        <div className="grid grid-cols-[52px_1fr]">
          <div className="flex flex-col items-center gap-5 border-border border-r py-5 text-muted-foreground">
            <span className="size-5 rounded bg-muted" />
            <span className="size-5 rounded-full border border-muted-foreground/50" />
            <span className="size-5 rounded border border-muted-foreground/50" />
            <span className="size-5 rounded bg-muted" />
          </div>
          <div className="space-y-5 p-5">
            <div className="h-10 rounded-lg border border-border bg-background" />
            {["bg-primary/20", "bg-accent", "bg-muted", "bg-secondary"].map(
              (color, index) => (
                <div className="flex items-center gap-3" key={color}>
                  <span className={cn("size-9 rounded-full", color)} />
                  <span className="grid flex-1 gap-2">
                    <span className="h-2 w-2/5 rounded-full bg-muted" />
                    <span className="h-2 w-4/5 rounded-full bg-muted/70" />
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {index + 2}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      aria-label="Close"
      className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
      onClick={onClick}
      type="button"
    >
      <XIcon size={20} />
    </button>
  );
}
