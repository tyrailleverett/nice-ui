import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface DangerZoneProps {
  className?: string;
  onDeactivate?: () => void;
  onRemove?: () => void;
  onSuspend?: () => void;
}

function DangerZoneRow({
  actionLabel,
  description,
  destructive = false,
  onAction,
  title,
}: {
  actionLabel: string;
  description: string;
  destructive?: boolean;
  onAction?: () => void;
  title: string;
}) {
  return (
    <div className="flex min-h-28 flex-col items-start justify-between gap-5 px-6 py-6 sm:flex-row sm:items-center">
      <div className="max-w-xl">
        <h3 className="font-medium">{title}</h3>
        <p className="mt-1 text-muted-foreground text-sm">{description}</p>
      </div>
      <Button
        className="w-full sm:w-auto"
        onClick={onAction}
        variant={destructive ? "destructive" : "outline"}
      >
        {actionLabel}
      </Button>
    </div>
  );
}

export function DangerZone({
  className,
  onDeactivate,
  onRemove,
  onSuspend,
}: DangerZoneProps) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl p-4 sm:p-8", className)}>
      <Card className="gap-0 overflow-hidden border-destructive/40 py-0">
        <CardHeader className="gap-1 p-6">
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Actions that limit or end access.</CardDescription>
        </CardHeader>
        <CardContent className="px-2 pb-2">
          <div className="rounded-xl border">
            <DangerZoneRow
              actionLabel="Suspend"
              description="Block sign-in but keep the seat and history."
              onAction={onSuspend}
              title="Suspend member"
            />
            <Separator />
            <DangerZoneRow
              actionLabel="Deactivate"
              description="Free the seat and revoke access. History is kept."
              onAction={onDeactivate}
              title="Deactivate member"
            />
            <Separator />
            <DangerZoneRow
              actionLabel="Remove"
              description="Delete the member and detach all roles. Cannot be undone."
              destructive
              onAction={onRemove}
              title="Remove member"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
