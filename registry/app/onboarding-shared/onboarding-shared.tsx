import {
  ArrowRightIcon,
  CircleUserRoundIcon,
  ImagePlusIcon,
  XIcon,
} from "lucide-react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useCallback } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <div className="flex flex-col gap-1.5">
          <Button type="button" variant="secondary">
            <ImagePlusIcon data-icon="inline-start" />
            Upload photo
          </Button>
          <p className="text-muted-foreground text-xs sm:text-sm">
            PNG or JPG, at least 400 × 400 px, up to 10 MB.
          </p>
        </div>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="onboarding-name">
            Full name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            className="h-12 rounded-xl px-4 text-base"
            id="onboarding-name"
            onChange={handleNameChange}
            required
            value={name}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="onboarding-title">Job title</FieldLabel>
          <Input
            className="h-12 rounded-xl px-4 text-base"
            id="onboarding-title"
            onChange={handleJobTitleChange}
            value={jobTitle}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="onboarding-timezone">Timezone</FieldLabel>
          <Select>
            <SelectTrigger
              aria-label="Timezone"
              className="h-12 w-full rounded-xl px-4 text-base"
              id="onboarding-timezone"
            >
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="America/Chicago">
                  Central Time (Chicago)
                </SelectItem>
                <SelectItem value="America/Los_Angeles">
                  Pacific Time (Los Angeles)
                </SelectItem>
                <SelectItem value="America/New_York">
                  Eastern Time (New York)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
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
    <Button
      className={cn("h-12 rounded-xl px-6 text-base", className)}
      onClick={onClick}
      size="lg"
      type="button"
    >
      {children}
      {icon ? <ArrowRightIcon data-icon="inline-end" /> : null}
    </Button>
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
    <Button
      aria-label="Close"
      onClick={onClick}
      size="icon"
      type="button"
      variant="ghost"
    >
      <XIcon />
    </Button>
  );
}
