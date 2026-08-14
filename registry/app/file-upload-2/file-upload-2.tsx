/* biome-ignore-all lint/performance/noJsxPropsBind: Remove action closes over the selected file id. */
import { CircleUserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

export interface FileUpload2Props {
  className?: string;
}

export function FileUpload2({ className }: FileUpload2Props) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({ accept: "image/*", maxFiles: 1, multiple: false });
  const [file] = files;
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="inline-flex items-center gap-2">
        <div
          aria-hidden="true"
          className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-input"
        >
          {file?.preview ? (
            <img
              alt="Uploaded preview"
              className="size-full object-cover"
              height={32}
              src={file.preview}
              width={32}
            />
          ) : (
            <CircleUserRoundIcon aria-hidden="true" className="opacity-60" />
          )}
        </div>
        <div>
          <Button onClick={openFileDialog}>
            {file ? "Change image" : "Upload image"}
          </Button>
          <input
            {...getInputProps()}
            aria-label="Upload image file"
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      </div>
      <div className="inline-flex gap-2 text-xs">
        {file ? (
          <>
            <p
              aria-live="polite"
              className="max-w-48 truncate text-muted-foreground"
            >
              {file.file.name}
            </p>
            <button
              aria-label={`Remove ${file.file.name}`}
              className="font-medium text-destructive hover:underline"
              onClick={() => removeFile(file.id)}
              type="button"
            >
              Remove
            </button>
          </>
        ) : (
          <p aria-live="polite" className="text-muted-foreground">
            No image attached
          </p>
        )}
      </div>
    </div>
  );
}
