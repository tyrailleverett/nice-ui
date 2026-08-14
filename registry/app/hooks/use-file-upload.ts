import {
  type ChangeEvent,
  type DragEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface FileWithPreview {
  file: File;
  id: string;
  preview?: string;
}

export interface UseFileUploadOptions {
  accept?: string;
  initialFiles?: FileMetadata[];
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  onFilesChange?: (files: FileWithPreview[]) => void;
}

interface FileUploadState {
  errors: string[];
  files: FileWithPreview[];
  isDragging: boolean;
}

const matchesAccept = (file: File, accept: string) => {
  if (!accept || accept === "*") {
    return true;
  }
  return accept.split(",").some((entry) => {
    const value = entry.trim().toLowerCase();
    if (value.endsWith("/*")) {
      return file.type.startsWith(value.slice(0, -1));
    }
    if (value.startsWith(".")) {
      return file.name.toLowerCase().endsWith(value);
    }
    return file.type.toLowerCase() === value;
  });
};

export function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  return `${Number((bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1))} ${units[index]}`;
}

export function useFileUpload({
  accept = "*",
  maxFiles = 10,
  maxSize = Number.POSITIVE_INFINITY,
  multiple = true,
  initialFiles = [],
  onFilesChange,
}: UseFileUploadOptions = {}) {
  const [state, setState] = useState<FileUploadState>(() => ({
    errors: [],
    files: initialFiles.map((file) => ({
      file: { name: file.name, size: file.size, type: file.type } as File,
      id: file.id,
      preview: file.url,
    })),
    isDragging: false,
  }));
  const inputRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef(state.files);
  filesRef.current = state.files;

  const updateFiles = useCallback(
    (files: FileWithPreview[], errors: string[] = []) => {
      filesRef.current = files;
      setState((current) => ({ ...current, errors, files }));
      onFilesChange?.(files);
    },
    [onFilesChange]
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const selected = Array.from(fileList);
      const errors: string[] = [];
      const validFiles: FileWithPreview[] = [];
      const available = Math.max(0, maxFiles - filesRef.current.length);

      for (const file of selected.slice(0, multiple ? available : 1)) {
        if (!matchesAccept(file, accept)) {
          errors.push(`${file.name}: unsupported file type`);
          continue;
        }
        if (file.size > maxSize) {
          errors.push(`${file.name}: exceeds ${formatBytes(maxSize)} limit`);
          continue;
        }
        validFiles.push({
          file,
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        });
      }

      if (selected.length > available && multiple) {
        errors.push(`You can upload up to ${maxFiles} files`);
      }
      updateFiles(
        multiple ? [...filesRef.current, ...validFiles] : validFiles,
        errors
      );
    },
    [accept, maxFiles, maxSize, multiple, updateFiles]
  );

  const removeFile = useCallback(
    (id?: string) => {
      if (!id) {
        return;
      }
      const next = filesRef.current.filter((item) => item.id !== id);
      const removed = filesRef.current.find((item) => item.id === id);
      if (removed?.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(removed.preview);
      }
      updateFiles(next);
    },
    [updateFiles]
  );

  const clearFiles = useCallback(() => {
    for (const item of filesRef.current) {
      if (item.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(item.preview);
      }
    }
    updateFiles([]);
  }, [updateFiles]);

  const openFileDialog = useCallback(() => inputRef.current?.click(), []);
  const handleDragEnter = useCallback((event: DragEvent) => {
    event.preventDefault();
    setState((current) => ({ ...current, isDragging: true }));
  }, []);
  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    setState((current) => ({ ...current, isDragging: false }));
  }, []);
  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
  }, []);
  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      setState((current) => ({ ...current, isDragging: false }));
      addFiles(event.dataTransfer.files);
    },
    [addFiles]
  );

  useEffect(
    () => () => {
      for (const item of filesRef.current) {
        if (item.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(item.preview);
        }
      }
    },
    []
  );

  return [
    state,
    {
      addFiles,
      clearFiles,
      getInputProps: () => ({
        accept,
        multiple,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files) {
            addFiles(event.target.files);
          }
          event.target.value = "";
        },
        ref: inputRef as RefObject<HTMLInputElement>,
        type: "file" as const,
      }),
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
    },
  ] as const;
}
