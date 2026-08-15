/* biome-ignore-all lint/performance/noJsxPropsBind: Dialog controls close over preset, section, and scope values. */
import { Info, X } from "lucide-react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface DialogProps {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export function CloseButton({ label = "Close" }: { label?: string }) {
  return (
    <DialogClose
      render={
        <Button
          aria-label={label}
          className="absolute top-2 right-2"
          size="icon"
          type="button"
          variant="ghost"
        />
      }
    >
      <X />
      <span className="sr-only">{label}</span>
    </DialogClose>
  );
}

export function DialogFrame({
  children,
  className,
  title,
  description,
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  title: string;
  description?: string;
}) {
  return (
    <DialogContent
      className={cn(
        "max-h-[min(90vh,860px)] overflow-y-auto sm:max-w-3xl",
        className
      )}
      showCloseButton={false}
      {...props}
    >
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : null}
        <CloseButton />
      </DialogHeader>
      {children}
    </DialogContent>
  );
}

export function Footer({
  note,
  cancel = "Cancel",
  action,
}: {
  note?: string;
  cancel?: string;
  action: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
      {note ? (
        <span className="flex items-center gap-2 text-muted-foreground text-sm">
          <Info /> {note}
        </span>
      ) : (
        <span />
      )}
      <div className="ml-auto flex gap-2">
        <Button type="button" variant="outline">
          {cancel}
        </Button>
        <Button type="button">{action}</Button>
      </div>
    </div>
  );
}
