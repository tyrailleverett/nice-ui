import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  FileTextIcon,
  LockKeyholeIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useReducer } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

type UploadPhase = "upload" | "review" | "importing" | "complete";
type UploadAction =
  | { type: "reset" }
  | { type: "review" }
  | { type: "start" }
  | { type: "tick" };

interface UploadState {
  phase: UploadPhase;
  progress: number;
}

const initialUploadState: UploadState = { phase: "upload", progress: 0 };

function uploadReducer(state: UploadState, action: UploadAction): UploadState {
  if (action.type === "reset") {
    return initialUploadState;
  }
  if (action.type === "review") {
    return { phase: "review", progress: 0 };
  }
  if (action.type === "start") {
    return { phase: "importing", progress: 8 };
  }
  const progress = Math.min(state.progress + 12, 100);
  return { phase: progress === 100 ? "complete" : "importing", progress };
}

export interface FileUpload6Props {
  className?: string;
  defaultFile?: { name: string; size: number; type?: string } | null;
}

function getInitialFile(defaultFile: FileUpload6Props["defaultFile"]) {
  if (defaultFile === undefined) {
    return {
      id: "workspace-export",
      name: "workspace-export.csv",
      size: 2_460_000,
      type: "text/csv",
    };
  }
  if (defaultFile === null) {
    return null;
  }
  return {
    id: "default-file",
    ...defaultFile,
    type: defaultFile.type ?? "text/csv",
  };
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: The component intentionally keeps the upload, review, and progress states together as one focused workflow.
export function FileUpload6({ className, defaultFile }: FileUpload6Props) {
  const [{ phase, progress }, dispatch] = useReducer(
    uploadReducer,
    initialUploadState
  );
  const resetUpload = useCallback(() => dispatch({ type: "reset" }), []);
  const reviewUpload = useCallback(() => dispatch({ type: "review" }), []);
  const startImport = useCallback(() => dispatch({ type: "start" }), []);
  const initialFile = getInitialFile(defaultFile);
  const [
    { files, errors, isDragging },
    {
      clearFiles,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
    },
  ] = useFileUpload({
    accept: ".csv,text/csv",
    initialFiles: initialFile ? [initialFile] : [],
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onFilesChange: resetUpload,
  });
  const file = files[0]?.file ?? null;

  useEffect(() => {
    if (phase !== "importing") {
      return;
    }
    const timer = window.setInterval(() => {
      dispatch({ type: "tick" });
    }, 450);
    return () => window.clearInterval(timer);
  }, [phase]);

  const removeFile = useCallback(() => {
    clearFiles();
    resetUpload();
  }, [clearFiles, resetUpload]);

  const isReview = phase === "review" || phase === "importing";
  const canContinue = file !== null && phase === "upload";

  return (
    <main
      className={cn(
        "min-h-screen bg-muted/30 px-4 py-8 text-foreground sm:px-8",
        className
      )}
    >
      <div className="mx-auto w-full max-w-4xl">
        <header className="flex items-start justify-between gap-4 border-border border-b pb-5">
          <div>
            <p className="font-semibold text-sm tracking-tight">
              Import workspace data
            </p>
            <p className="mt-1 text-muted-foreground text-xs">
              Bring your existing contacts into your workspace
            </p>
          </div>
          <Button aria-label="Close import" size="icon-sm" variant="ghost">
            <XIcon />
          </Button>
        </header>

        <nav
          aria-label="Import steps"
          className="mx-auto mt-7 flex max-w-2xl items-start"
        >
          {(["Choose source", "Upload file", "Review"] as const).map(
            (label, index) => {
              const isComplete = index < (isReview ? 2 : 1);
              const isCurrent = index === (isReview ? 2 : 1);
              return (
                <div className="flex flex-1 items-start" key={label}>
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full border font-medium text-xs",
                        isComplete &&
                          "border-primary bg-primary text-primary-foreground",
                        isCurrent && "border-primary text-primary",
                        !(isComplete || isCurrent) &&
                          "border-border bg-background text-muted-foreground"
                      )}
                    >
                      {isComplete ? (
                        <CheckCircle2Icon className="size-4" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap text-xs",
                        isCurrent
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {index < 2 && (
                    <span
                      className={cn(
                        "mt-3 h-px flex-1",
                        index < (isReview ? 2 : 1) ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              );
            }
          )}
        </nav>

        <section className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-background p-5 shadow-sm sm:p-8">
          {phase === "complete" ? (
            <div className="py-8 text-center">
              <CheckCircle2Icon className="mx-auto size-10 text-primary" />
              <h1 className="mt-4 font-semibold text-2xl tracking-tight">
                Import complete
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-muted-foreground text-sm">
                Your workspace data is ready. We found 248 contacts and added
                them to your workspace.
              </p>
              <Button className="mt-6" onClick={removeFile}>
                Import another file
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LockKeyholeIcon className="size-4" />
                </div>
                <div>
                  <h1 className="font-semibold text-xl tracking-tight">
                    {isReview ? "Review your import" : "Upload a CSV file"}
                  </h1>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {isReview
                      ? "Check the sample rows before adding anything to your workspace."
                      : "We’ll validate your file before any data is added."}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-muted-foreground text-xs leading-relaxed">
                <span className="font-medium text-foreground">
                  Keep your data safe.
                </span>{" "}
                Your file is processed securely and is never shared. Required
                columns:{" "}
                <span className="font-medium text-foreground">name</span> and{" "}
                <span className="font-medium text-foreground">email</span>.
              </div>

              {isReview ? null : (
                <>
                  <button
                    className={cn(
                      "mt-6 flex min-h-48 w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 px-6 text-center transition-colors",
                      isDragging
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/60 hover:bg-muted/40"
                    )}
                    onClick={openFileDialog}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    type="button"
                  >
                    <UploadCloudIcon
                      className={cn(
                        "size-8",
                        isDragging ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="mt-3 font-medium text-sm">
                      Drop your CSV here or browse files
                    </span>
                    <span className="mt-1 text-muted-foreground text-xs">
                      CSV files up to 25 MB
                    </span>
                  </button>
                  <input {...getInputProps()} className="sr-only" />
                </>
              )}

              {file ? (
                <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                    <FileTextIcon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">{file.name}</p>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                      {formatBytes(file.size)} ·{" "}
                      {isReview ? "Ready to import" : "Ready to review"}
                    </p>
                  </div>
                  <CheckCircle2Icon className="size-4 shrink-0 text-primary" />
                  <Button
                    aria-label={`Remove ${file.name}`}
                    onClick={removeFile}
                    size="icon-xs"
                    variant="ghost"
                  >
                    <XIcon />
                  </Button>
                </div>
              ) : null}

              {isReview ? (
                <div className="mt-5 rounded-lg border border-border bg-muted/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-sm">Validation passed</p>
                    <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary text-xs">
                      248 rows
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground text-xs">
                    All required columns are present. We’ll create new contacts
                    and update matching records.
                  </p>
                  <Progress
                    aria-label="Import progress"
                    className="mt-4"
                    value={progress}
                  />
                  {phase === "importing" && (
                    <p className="mt-2 text-muted-foreground text-xs">
                      Preparing your import… {progress}%
                    </p>
                  )}
                </div>
              ) : null}

              {errors.length > 0 ? (
                <p className="mt-3 flex items-center gap-2 text-destructive text-xs">
                  <AlertCircleIcon className="size-4" />
                  {errors[0]}
                </p>
              ) : null}

              <div className="mt-7 flex items-center justify-between gap-3 border-border border-t pt-5">
                <Button onClick={resetUpload} variant="outline">
                  <ArrowLeftIcon data-icon="inline-start" />
                  Back
                </Button>
                {isReview ? (
                  <Button
                    disabled={phase === "importing" || file === null}
                    onClick={startImport}
                  >
                    {phase === "importing" ? "Importing…" : "Start import"}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Button>
                ) : (
                  <Button disabled={!canContinue} onClick={reviewUpload}>
                    Continue to review
                    <ArrowRightIcon data-icon="inline-end" />
                  </Button>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
