/* biome-ignore-all lint/performance/noJsxPropsBind: Interactive wizard controls intentionally bind local state handlers. */
"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleHelp,
  Cloud,
  Code2,
  FolderGit2,
  GitBranch,
  Globe2,
  Layers3,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2 | 3;
type Source = "github" | "gitlab" | "upload";

const steps = [
  {
    description: "Name your workspace",
    eyebrow: "01",
    label: "Project details",
  },
  {
    description: "Choose where code lives",
    eyebrow: "02",
    label: "Connect source",
  },
  { description: "Confirm and create", eyebrow: "03", label: "Review" },
] as const;

const sourceOptions = [
  {
    badge: "Recommended",
    description: "Import from a connected GitHub account",
    icon: Code2,
    id: "github" as const,
    label: "GitHub repository",
  },
  {
    badge: undefined,
    description: "Use a project from your GitLab workspace",
    icon: GitBranch,
    id: "gitlab" as const,
    label: "GitLab repository",
  },
  {
    badge: undefined,
    description: "Start with a local zip file",
    icon: FolderGit2,
    id: "upload" as const,
    label: "Upload a project",
  },
] as const;

const stepTitles = [
  {
    description:
      "A clear name and a little context make every next decision easier.",
    kicker: "A considered beginning",
    title: "Give your project a home.",
  },
  {
    description:
      "Connect a source so your team can start from a familiar foundation.",
    kicker: "Bring your work with you",
    title: "Where should we look?",
  },
  {
    description:
      "Review the details below. You can change anything before creating the project.",
    kicker: "One last look",
    title: "Ready to make it real?",
  },
] as const;

export function CreationWizard() {
  const [step, setStep] = useState<Step>(0);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState<Source>("github");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [nameError, setNameError] = useState(false);

  let progress = 92;
  if (step === 0) {
    progress = 33;
  }
  if (step === 1) {
    progress = 66;
  }
  if (hasSubmitted) {
    progress = 100;
  }
  let titleStep: 0 | 1 | 2 = 2;
  if (step === 0) {
    titleStep = 0;
  }
  if (step === 1) {
    titleStep = 1;
  }
  const projectSlug =
    projectName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "your-project";
  const selectedSource = sourceOptions.find((option) => option.id === source);

  function goNext() {
    if (step === 0 && projectName.trim().length === 0) {
      setNameError(true);
      return;
    }

    setNameError(false);
    if (step < 2) {
      setStep((currentStep) => (currentStep + 1) as Step);
      return;
    }

    setHasSubmitted(true);
    setStep(3);
  }

  function goBack() {
    if (step > 0 && !hasSubmitted) {
      setStep((currentStep) => (currentStep - 1) as Step);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div className="grid min-h-[680px] lg:grid-cols-[252px_1fr]">
          <aside className="border-border border-b bg-muted/30 p-6 lg:border-r lg:border-b-0 lg:p-7">
            <div className="flex items-center gap-2 font-semibold text-sm tracking-tight">
              <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
                <Layers3 className="size-4" />
              </span>
              Northstar
            </div>
            <div className="mt-10 hidden lg:block">
              <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
                New project
              </p>
              <h1 className="mt-2 font-heading text-2xl leading-tight tracking-tight">
                Build a place
                <br />
                <span className="text-muted-foreground">for good work.</span>
              </h1>
            </div>
            <nav aria-label="Project creation steps" className="mt-8 lg:mt-16">
              <ol className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0">
                {steps.map((item, index) => {
                  const isComplete = hasSubmitted || index < step;
                  const isCurrent = index === step && !hasSubmitted;
                  let markerClass =
                    "border-border bg-background text-muted-foreground";
                  if (isComplete) {
                    markerClass =
                      "border-primary bg-primary text-primary-foreground";
                  } else if (isCurrent) {
                    markerClass =
                      "border-primary bg-background text-primary ring-4 ring-primary/10";
                  }
                  return (
                    <li
                      className="relative flex gap-3 lg:min-h-24"
                      key={item.label}
                    >
                      {index < steps.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="absolute top-8 left-3 hidden h-16 w-px bg-border lg:block"
                        />
                      ) : null}
                      <span
                        aria-current={isCurrent ? "step" : undefined}
                        className={cn(
                          "relative z-10 grid size-6 shrink-0 place-items-center rounded-full border font-semibold text-[10px] transition-colors",
                          markerClass
                        )}
                      >
                        {isComplete ? (
                          <Check className="size-3.5" />
                        ) : (
                          item.eyebrow
                        )}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block font-medium text-sm ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {item.label}
                        </span>
                        <span className="mt-1 block text-muted-foreground text-xs leading-4">
                          {item.description}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </nav>
            <div className="mt-8 hidden items-center gap-2 text-muted-foreground text-xs lg:flex">
              <CircleHelp className="size-3.5" />
              <span>Need a hand? View the guide</span>
            </div>
          </aside>

          <section className="flex flex-col">
            <div className="border-border border-b px-6 py-5 sm:px-10">
              <div className="flex items-center justify-between gap-4 text-muted-foreground text-xs">
                <span>
                  {hasSubmitted
                    ? "Project created"
                    : `Step ${Math.min(step + 1, 3)} of 3`}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <LockKeyhole className="size-3" /> Autosaved locally
                </span>
              </div>
              <Progress
                aria-label="Project creation progress"
                className="mt-4"
                indicatorClassName="bg-primary"
                value={progress}
              />
            </div>

            <div className="flex flex-1 flex-col px-6 py-8 sm:px-10 sm:py-10">
              {hasSubmitted ? (
                <SuccessState
                  projectName={projectName}
                  projectSlug={projectSlug}
                  sourceLabel={selectedSource?.label ?? "Source"}
                />
              ) : (
                <>
                  <div className="max-w-xl">
                    <p className="font-medium text-primary text-xs uppercase tracking-[0.16em]">
                      {stepTitles[titleStep].kicker}
                    </p>
                    <h2 className="mt-3 font-heading text-3xl tracking-tight sm:text-4xl">
                      {stepTitles[titleStep].title}
                    </h2>
                    <p className="mt-3 max-w-lg text-muted-foreground text-sm leading-6">
                      {stepTitles[titleStep].description}
                    </p>
                  </div>

                  <div className="mt-9 flex-1">
                    {step === 0 ? (
                      <DetailsStep
                        description={description}
                        nameError={nameError}
                        onDescriptionChange={setDescription}
                        onNameChange={(value) => {
                          setProjectName(value);
                          if (value.trim()) {
                            setNameError(false);
                          }
                        }}
                        projectName={projectName}
                      />
                    ) : null}
                    {step === 1 ? (
                      <SourceStep onSourceChange={setSource} source={source} />
                    ) : null}
                    {step === 2 ? (
                      <ReviewStep
                        description={description}
                        projectName={projectName}
                        projectSlug={projectSlug}
                        sourceLabel={selectedSource?.label ?? "Source"}
                      />
                    ) : null}
                  </div>

                  <div className="mt-10 flex items-center justify-between border-border border-t pt-5">
                    <Button
                      disabled={step === 0}
                      onClick={goBack}
                      variant="ghost"
                    >
                      <ArrowLeft data-icon="inline-start" /> Back
                    </Button>
                    <Button onClick={goNext}>
                      {step === 2 ? "Create project" : "Continue"}
                      {step === 2 ? (
                        <Sparkles data-icon="inline-end" />
                      ) : (
                        <ArrowRight data-icon="inline-end" />
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function DetailsStep({
  description,
  nameError,
  projectName,
  onDescriptionChange,
  onNameChange,
}: {
  description: string;
  nameError: boolean;
  projectName: string;
  onDescriptionChange: (value: string) => void;
  onNameChange: (value: string) => void;
}) {
  return (
    <div className="max-w-xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="project-name">
          Project name <span className="text-destructive">*</span>
        </Label>
        <Input
          aria-describedby={
            nameError ? "project-name-error" : "project-name-hint"
          }
          aria-invalid={nameError}
          id="project-name"
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="e.g. Acme analytics"
          value={projectName}
        />
        {nameError ? (
          <p
            className="flex items-center gap-1.5 text-destructive text-xs"
            id="project-name-error"
          >
            <CircleAlert className="size-3.5" /> Add a name to continue.
          </p>
        ) : (
          <p className="text-muted-foreground text-xs" id="project-name-hint">
            This is how your project will appear to your team.
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="project-description">
          What are you building?{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="project-description"
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="A short note about the problem this project solves…"
          rows={4}
          value={description}
        />
        <p className="text-muted-foreground text-xs">
          Keep it useful. You can always add more context later.
        </p>
      </div>
      <div className="flex items-start gap-3 border border-border border-dashed bg-muted/20 p-4 text-muted-foreground text-xs">
        <Globe2 className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>
          <span className="font-medium text-foreground">
            Private by default.
          </span>{" "}
          Your project is only visible to people you invite.
        </p>
      </div>
    </div>
  );
}

function SourceStep({
  source,
  onSourceChange,
}: {
  source: Source;
  onSourceChange: (value: Source) => void;
}) {
  return (
    <RadioGroup
      aria-label="Choose a project source"
      className="max-w-xl gap-3"
      onValueChange={(value) => onSourceChange(value as Source)}
      value={source}
    >
      {sourceOptions.map((option) => {
        const Icon = option.icon;
        return (
          <Label
            className={`group flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40 ${source === option.id ? "border-primary bg-primary/5" : "border-border"}`}
            htmlFor={`source-${option.id}`}
            key={option.id}
          >
            <RadioGroupItem id={`source-${option.id}`} value={option.id} />
            <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-background">
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2 font-medium text-sm">
                {option.label}
                {option.badge ? (
                  <Badge variant="secondary">{option.badge}</Badge>
                ) : null}
              </span>
              <span className="mt-1 block text-muted-foreground text-xs">
                {option.description}
              </span>
            </span>
          </Label>
        );
      })}
      <Alert className="mt-3 bg-muted/20">
        <Cloud />
        <AlertTitle>Source access stays yours</AlertTitle>
        <AlertDescription>
          We only request the permissions needed to read project files and
          status.
        </AlertDescription>
      </Alert>
    </RadioGroup>
  );
}

function ReviewStep({
  description,
  projectName,
  projectSlug,
  sourceLabel,
}: {
  description: string;
  projectName: string;
  projectSlug: string;
  sourceLabel: string;
}) {
  return (
    <div className="max-w-xl">
      <Card className="bg-muted/20 shadow-none">
        <CardContent className="gap-0 p-0">
          <ReviewRow label="Project name" value={projectName} />
          <Separator />
          <ReviewRow
            label="Project URL"
            mono
            value={`northstar.dev/${projectSlug}`}
          />
          <Separator />
          <ReviewRow label="Source" value={sourceLabel} />
          {description ? (
            <>
              <Separator />
              <ReviewRow label="Description" value={description} />
            </>
          ) : null}
        </CardContent>
      </Card>
      <div className="mt-5 flex items-start gap-3 text-muted-foreground text-xs leading-5">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
        <span>
          Everything looks good. Creating a project will set up your workspace
          and invite you to connect your first environment.
        </span>
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  mono,
  value,
}: {
  label: string;
  mono?: boolean;
  value: string;
}) {
  return (
    <div className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-4">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`text-sm ${mono ? "font-mono text-xs" : "font-medium"}`}>
        {value}
      </span>
    </div>
  );
}

function SuccessState({
  projectName,
  projectSlug,
  sourceLabel,
}: {
  projectName: string;
  projectSlug: string;
  sourceLabel: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
        <CheckCircle2 className="size-8" />
      </div>
      <p className="mt-7 font-medium text-emerald-600 text-xs uppercase tracking-[0.16em]">
        Project created
      </p>
      <h2 className="mt-3 font-heading text-3xl tracking-tight sm:text-4xl">
        {projectName} is ready.
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground text-sm leading-6">
        Your new workspace is set up and connected to{" "}
        {sourceLabel.toLowerCase()}.
      </p>
      <div className="mt-8 grid w-full max-w-md gap-3 text-left sm:grid-cols-2">
        <div className="border border-border p-4">
          <p className="text-muted-foreground text-xs">Project URL</p>
          <p className="mt-2 break-all font-mono text-xs">
            northstar.dev/{projectSlug}
          </p>
        </div>
        <div className="border border-border p-4">
          <p className="text-muted-foreground text-xs">Next up</p>
          <p className="mt-2 font-medium text-sm">Connect an environment</p>
        </div>
      </div>
      <Button className="mt-8" onClick={() => window.location.reload()}>
        Create another project <ArrowRight data-icon="inline-end" />
      </Button>
    </div>
  );
}
