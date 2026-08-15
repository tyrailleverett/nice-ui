/* biome-ignore-all lint/performance/noJsxPropsBind: Remove action closes over the selected file id. */
import { CircleAlertIcon, UserIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type FileWithPreview,
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

export interface AvatarUploadProps {
  className?: string;
  defaultAvatar?: string;
  maxSize?: number;
  onFileChange?: (file: FileWithPreview | null) => void;
}
export function FileUpload3({
  maxSize = 2 * 1024 * 1024,
  className,
  onFileChange,
  defaultAvatar,
}: AvatarUploadProps) {
  const [{ files, isDragging, errors }, actions] = useFileUpload({
    accept: "image/*",
    maxFiles: 1,
    maxSize,
    multiple: false,
    onFilesChange: (next) => onFileChange?.(next[0] ?? null),
  });
  const [file] = files;
  const preview = file?.preview || defaultAvatar;
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative">
        <button
          aria-label={preview ? "Change avatar" : "Upload avatar"}
          className={cn(
            "group/avatar relative flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            preview && "border-solid"
          )}
          onClick={actions.openFileDialog}
          onDragEnter={actions.handleDragEnter}
          onDragLeave={actions.handleDragLeave}
          onDragOver={actions.handleDragOver}
          onDrop={actions.handleDrop}
          type="button"
        >
          {preview ? (
            <img
              alt="Avatar"
              className="size-full object-cover"
              height={96}
              src={preview}
              width={96}
            />
          ) : (
            <UserIcon aria-hidden="true" className="text-muted-foreground" />
          )}
        </button>
        <input
          {...actions.getInputProps()}
          aria-label="Upload avatar image"
          className="sr-only"
        />
        {file ? (
          <Button
            aria-label="Remove avatar"
            className="absolute end-0.5 top-0.5 size-6 rounded-full"
            onClick={() => actions.removeFile(file.id)}
            size="icon"
            variant="outline"
          >
            <XIcon />
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-0.5 text-center">
        <p className="font-medium text-sm">
          {file ? "Avatar uploaded" : "Upload avatar"}
        </p>
        <p className="text-muted-foreground text-xs">
          PNG, JPG up to {formatBytes(maxSize)}
        </p>
      </div>
      {errors.length > 0 && (
        <div className="flex w-full items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-destructive text-sm">
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
