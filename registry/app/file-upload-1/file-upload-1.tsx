/* biome-ignore-all lint/a11y/useSemanticElements: Drop zone contains a file input and nested controls. */
/* biome-ignore-all lint/performance/noJsxPropsBind: Upload controls close over file ids and the hidden input. */
import {
  CheckIcon,
  CloudUploadIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type FileMetadata,
  type FileWithPreview,
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

type UploadStatus = "uploading" | "done" | "error";
type UploadItem = FileWithPreview & {
  error?: string;
  progress: number;
  status: UploadStatus;
};

const MAX_SIZE = 25 * 1024 * 1024;
const ACCEPT = "image/png,image/jpeg,application/pdf";

const seedFiles: FileMetadata[] = [
  {
    id: "seed-1",
    name: "Acme-brand-guidelines.pdf",
    size: 4_812_345,
    type: "application/pdf",
  },
  {
    id: "seed-2",
    name: "homepage-hero@2x.png",
    size: 1_204_576,
    type: "image/png",
  },
];

function UploadStatusGlyph({ status }: { status: UploadStatus }) {
  if (status === "error") {
    return <TriangleAlertIcon aria-hidden="true" />;
  }
  if (status === "done") {
    return <CheckIcon aria-hidden="true" />;
  }
  return (
    <span className="size-3 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
  );
}

function uploadStatusLabel(item: UploadItem) {
  if (item.status === "error") {
    return item.error;
  }
  if (item.status === "done") {
    return `Uploaded ${formatBytes(item.file.size)}`;
  }
  return `Uploading ${Math.round(item.progress)}%`;
}

export interface FileUpload1Props {
  accept?: string;
  className?: string;
  maxSize?: number;
  onFilesChange?: (files: FileWithPreview[]) => void;
}

export function FileUpload1({
  accept = ACCEPT,
  className,
  maxSize = MAX_SIZE,
  onFilesChange,
}: FileUpload1Props) {
  const toasted = useRef(new Set(["seed-1"]));
  const [uploadFiles, setUploadFiles] = useState<UploadItem[]>(() =>
    seedFiles.map((file, index) => ({
      file: { name: file.name, size: file.size, type: file.type } as File,
      id: file.id,
      preview: file.url,
      progress: index === 0 ? 100 : 64,
      status: index === 0 ? "done" : "uploading",
    }))
  );
  const [{ isDragging, errors }, actions] = useFileUpload({
    accept,
    initialFiles: seedFiles,
    maxSize,
    multiple: true,
    onFilesChange: (next) => {
      setUploadFiles((current) =>
        next.map(
          (file) =>
            current.find((item) => item.id === file.id) ?? {
              ...file,
              progress: 0,
              status: "uploading",
            }
        )
      );
      onFilesChange?.(next);
    },
  });
  const hasActiveUploads = uploadFiles.some(
    (item) => item.status === "uploading"
  );

  useEffect(() => {
    if (!hasActiveUploads) {
      return;
    }
    const timer = window.setInterval(
      () =>
        setUploadFiles((current) =>
          current.map((item) => {
            if (item.status !== "uploading") {
              return item;
            }
            const progress = Math.min(
              100,
              item.progress + Math.random() * 18 + 6
            );
            return progress >= 100
              ? { ...item, progress: 100, status: "done" }
              : { ...item, progress };
          })
        ),
      600
    );
    return () => window.clearInterval(timer);
  }, [hasActiveUploads]);

  useEffect(() => {
    for (const item of uploadFiles) {
      if (item.status === "done" && !toasted.current.has(item.id)) {
        toasted.current.add(item.id);
        toast.success(`${item.file.name} uploaded`);
      }
    }
  }, [uploadFiles]);

  return (
    <section
      className={cn(
        "flex min-h-[34rem] w-full items-center justify-center bg-muted/30 px-6 py-16",
        className
      )}
    >
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Upload assets</CardTitle>
          <CardDescription>
            Drag and drop your files or browse to attach them to Acme.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-12 text-center outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/40 hover:bg-muted/60"
            )}
            onClick={actions.openFileDialog}
            onDragEnter={actions.handleDragEnter}
            onDragLeave={actions.handleDragLeave}
            onDragOver={actions.handleDragOver}
            onDrop={actions.handleDrop}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                actions.openFileDialog();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <input {...actions.getInputProps()} className="sr-only" />
            <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground">
              <CloudUploadIcon aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-sm">
                {isDragging
                  ? "Release to upload"
                  : "Drag & drop files or click to browse"}
              </p>
              <p className="text-muted-foreground text-xs">
                Supports PDF, PNG, JPG up to {formatBytes(maxSize)}
              </p>
            </div>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                actions.openFileDialog();
              }}
              size="sm"
              type="button"
              variant="outline"
            >
              <CloudUploadIcon data-icon="inline-start" />
              Browse files
            </Button>
          </div>
          {errors.length > 0 ? (
            <p className="text-destructive text-sm">{errors.join(" ")}</p>
          ) : null}
          {uploadFiles.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs">
                  <span className="font-medium text-foreground">
                    {uploadFiles.length}
                  </span>{" "}
                  {uploadFiles.length === 1 ? "file" : "files"}
                </p>
                <Button
                  onClick={actions.clearFiles}
                  size="sm"
                  type="button"
                  variant="ghost"
                >
                  Clear all
                </Button>
              </div>
              <ul className="flex flex-col gap-2">
                {uploadFiles.map((item) => (
                  <li
                    className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2"
                    key={item.id}
                  >
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-md bg-muted",
                        item.status === "error" && "text-destructive",
                        item.status === "done" && "text-primary"
                      )}
                    >
                      <UploadStatusGlyph status={item.status} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm">
                        {item.file.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {uploadStatusLabel(item)}
                      </p>
                    </div>
                    <Button
                      aria-label={`Remove ${item.file.name}`}
                      onClick={() => actions.removeFile(item.id)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <XIcon aria-hidden="true" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
