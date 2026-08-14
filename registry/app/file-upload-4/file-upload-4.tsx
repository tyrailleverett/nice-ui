/* biome-ignore-all lint/performance/noJsxPropsBind: Remove actions close over uploaded file ids. */
import { CircleAlertIcon, FileIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type FileMetadata,
  type FileWithPreview,
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

export interface FileUploadCompactProps {
  accept?: string;
  className?: string;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  onFilesChange?: (files: FileWithPreview[]) => void;
}
export function FileUpload4({
  maxFiles = 3,
  maxSize = 2 * 1024 * 1024,
  accept = "image/*",
  multiple = true,
  className,
  onFilesChange,
}: FileUploadCompactProps) {
  const [{ files, isDragging, errors }, actions] = useFileUpload({
    accept,
    maxFiles,
    maxSize,
    multiple,
    onFilesChange,
  });
  const isImage = (file: File | FileMetadata) => file.type.startsWith("image/");
  return (
    <div className={cn("w-full max-w-lg", className)}>
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions lint/a11y/noStaticElementInteractions: Drop target is a container for the picker and file chips. */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border border-dashed p-4 transition-colors",
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
        <Button onClick={actions.openFileDialog} size="sm">
          <PlusIcon data-icon="inline-start" />
          Add files
        </Button>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {files.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Drop files here or click to browse
            </p>
          ) : (
            files.map((item) => (
              <div className="group/item relative shrink-0" key={item.id}>
                {isImage(item.file) && item.preview ? (
                  <img
                    alt={item.file.name}
                    className="size-12 rounded-lg border object-cover"
                    height={48}
                    src={item.preview}
                    title={`${item.file.name} (${formatBytes(item.file.size)})`}
                    width={48}
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-lg border bg-muted">
                    <FileIcon className="text-muted-foreground" />
                  </div>
                )}
                <Button
                  aria-label={`Remove ${item.file.name}`}
                  className="absolute -end-2 -top-2 size-5 rounded-full opacity-0 shadow-md transition-opacity group-hover/item:opacity-100"
                  onClick={() => actions.removeFile(item.id)}
                  size="icon"
                  variant="outline"
                >
                  <XIcon />
                </Button>
              </div>
            ))
          )}
        </div>
        {files.length > 0 && (
          <div className="shrink-0 text-muted-foreground text-xs">
            {files.length}/{maxFiles}
          </div>
        )}
      </div>
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
