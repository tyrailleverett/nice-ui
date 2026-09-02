import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export interface CookieConsent3Props {
  className?: string;
  onAccept?: () => void;
  onManage?: () => void;
  onReject?: () => void;
}
export function CookieConsent3({
  className,
  onAccept,
  onManage,
  onReject,
}: CookieConsent3Props) {
  return (
    <aside
      aria-label="Cookie preferences"
      className={cn(
        "fixed inset-x-3 bottom-3 z-10 mx-auto max-w-2xl border bg-background p-5 shadow-lg sm:inset-x-auto sm:right-6 sm:bottom-6",
        className
      )}
    >
      <div className="space-y-3">
        <p className="font-medium">A small note about cookies</p>
        <p className="text-muted-foreground text-sm leading-6">
          We use essential cookies to keep Nice UI working and optional
          analytics to understand what people find useful. You can change your
          choice at any time.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onAccept} size="sm">
            Accept all
          </Button>
          <Button onClick={onReject} size="sm" variant="outline">
            Only essential
          </Button>
          <Button onClick={onManage} size="sm" variant="ghost">
            Manage choices
          </Button>
        </div>
      </div>
    </aside>
  );
}
