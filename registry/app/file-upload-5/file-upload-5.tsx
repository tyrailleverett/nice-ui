/* biome-ignore-all lint/performance/noJsxPropsBind: Retry and remove actions close over uploaded file ids. */
import {
  CircleAlertIcon,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  RefreshCwIcon,
  UploadIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  type FileMetadata,
  type FileWithPreview,
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

type UploadFile = FileWithPreview & {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
};
export interface ProgressUploadProps {
  accept?: string;
  className?: string;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  onFilesChange?: (files: FileWithPreview[]) => void;
  simulateUpload?: boolean;
}

export function FileUpload5({
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  accept = "*",
  multiple = true,
  className,
  onFilesChange,
  simulateUpload = true,
}: ProgressUploadProps) {
  const defaults: FileMetadata[] = [
    {
      id: "default-3",
      name: "image-1.png",
      size: 42_048,
      type: "image/png",
      url: "https://picsum.photos/1000/800?grayscale&random=10",
    },
    {
      id: "default-4",
      name: "image-2.png",
      size: 62_807,
      type: "image/png",
      url: "https://picsum.photos/1000/800?grayscale&random=11",
    },
  ];
  const initial = defaults.map((file) => ({
    file: { name: file.name, size: file.size, type: file.type } as File,
    id: file.id,
    preview: file.url,
    progress: 100,
    status: "completed" as const,
  }));
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>(initial);
  const [{ isDragging, errors }, actions] = useFileUpload({
    accept,
    initialFiles: defaults,
    maxFiles,
    maxSize,
    multiple,
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

  useEffect(() => {
    if (!simulateUpload) {
      return;
    }
    const interval = window.setInterval(
      () =>
        setUploadFiles((current) =>
          current.map((file) => {
            if (file.status !== "uploading") {
              return file;
            }
            const progress = Math.min(
              100,
              file.progress + Math.random() * 15 + 5
            );
            return progress >= 100
              ? { ...file, progress: 100, status: "completed" }
              : { ...file, progress };
          })
        ),
      500
    );
    return () => window.clearInterval(interval);
  }, [simulateUpload]);

  const retryUpload = (id: string) =>
    setUploadFiles((current) =>
      current.map((file) =>
        file.id === id
          ? { ...file, error: undefined, progress: 0, status: "uploading" }
          : file
      )
    );
  const iconFor = (file: File | FileMetadata) => {
    const { type } = file;
    if (type.startsWith("image/")) {
      return <ImageIcon />;
    }
    if (type.startsWith("video/")) {
      return <VideoIcon />;
    }
    if (type.startsWith("audio/")) {
      return <HeadphonesIcon />;
    }
    if (type.includes("spreadsheet") || type.includes("sheet")) {
      return <FileSpreadsheetIcon />;
    }
    if (type.includes("zip") || type.includes("rar")) {
      return <FileArchiveIcon />;
    }
    return <FileTextIcon />;
  };
  const completed = uploadFiles.filter(
    (file) => file.status === "completed"
  ).length;
  const failed = uploadFiles.filter((file) => file.status === "error").length;
  const uploading = uploadFiles.filter(
    (file) => file.status === "uploading"
  ).length;

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions lint/a11y/noStaticElementInteractions: Drop target is a container for the picker and progress list. */}
      <div
        className={cn(
          "rounded-lg border border-dashed p-8 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onDragEnter={actions.handleDragEnter}
        onDragLeave={actions.handleDragLeave}
        onDragOver={actions.handleDragOver}
        onDrop={actions.handleDrop}
      >
        <input {...actions.getInputProps()} className="sr-only" />
        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "flex size-16 items-center justify-center rounded-full",
              isDragging ? "bg-primary/10" : "bg-muted"
            )}
          >
            <UploadIcon
              className={isDragging ? "text-primary" : "text-muted-foreground"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">Upload your files</h3>
            <p className="text-muted-foreground text-sm">
              Drag and drop files here or click to browse
            </p>
            <p className="text-muted-foreground text-xs">
              Multiple file types up to {formatBytes(maxSize)} each
            </p>
          </div>
          <Button onClick={actions.openFileDialog}>
            <UploadIcon data-icon="inline-start" />
            Select files
          </Button>
        </div>
      </div>
      {uploadFiles.length > 0 && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm">Upload progress</h4>
              <div className="flex items-center gap-2">
                {completed > 0 && (
                  <Badge variant="secondary">Completed: {completed}</Badge>
                )}
                {failed > 0 && (
                  <Badge variant="destructive">Failed: {failed}</Badge>
                )}
                {uploading > 0 && (
                  <Badge variant="outline">Uploading: {uploading}</Badge>
                )}
              </div>
            </div>
            <Button onClick={actions.clearFiles} size="sm" variant="outline">
              Clear all
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {uploadFiles.map((file) => (
              <div
                className="rounded-lg border border-border bg-card p-3"
                key={file.id}
              >
                <div className="flex items-start gap-2.5">
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
                    {file.preview && file.file.type.startsWith("image/") ? (
                      <img
                        alt={file.file.name}
                        className="size-full object-cover"
                        height={48}
                        src={file.preview}
                        width={48}
                      />
                    ) : (
                      iconFor(file.file)
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 truncate font-medium text-sm">
                        {file.file.name}
                        <span className="block font-normal text-muted-foreground text-xs">
                          {formatBytes(file.file.size)}
                        </span>
                      </p>
                      <Button
                        aria-label={`Remove ${file.file.name}`}
                        className="size-6 shrink-0"
                        onClick={() => {
                          setUploadFiles((current) =>
                            current.filter((item) => item.id !== file.id)
                          );
                          actions.removeFile(file.id);
                        }}
                        size="icon"
                        variant="ghost"
                      >
                        <XIcon />
                      </Button>
                    </div>
                    {file.status === "uploading" && (
                      <Progress className="mt-2" value={file.progress} />
                    )}
                    {file.status === "error" && (
                      <div className="mt-2 flex items-center justify-between gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1 text-destructive text-xs">
                        <span className="flex items-center gap-1">
                          <CircleAlertIcon />
                          {file.error}
                        </span>
                        <Button
                          aria-label="Retry upload"
                          className="size-6"
                          onClick={() => retryUpload(file.id)}
                          size="icon"
                          variant="ghost"
                        >
                          <RefreshCwIcon />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {errors.length > 0 && (
        <div className="mt-5 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-destructive text-sm">
          <CircleAlertIcon />
          <div>
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
