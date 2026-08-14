/* biome-ignore-all lint/performance/noJsxPropsBind: Dialog controls close over preset, section, and scope values. */
import { BriefcaseBusiness, Sparkles, Video } from "lucide-react";
import { DialogFrame, type DialogProps } from "@/components/app/dialogs-shared";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

export function SetupHelpDialog(props: DialogProps) {
  const rows = [
    [
      BriefcaseBusiness,
      "Setup guides",
      "Admin and onboarding references.",
      "Open guides",
    ],
    [Video, "Short walkthroughs", "Quick lessons for rollout.", "Watch videos"],
    [Sparkles, "Product feedback", "Share missing patterns.", "Send feedback"],
  ] as const;
  return (
    <Dialog {...props}>
      <DialogFrame
        className="sm:max-w-4xl"
        description="Choose the fastest path to the right team."
        title="Need a hand with setup?"
      >
        <div className="flex flex-col gap-4">
          {rows.map(([Icon, heading, copy, action]) => (
            <div
              className="flex items-center gap-4 border-b border-dashed py-4"
              key={heading}
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-xl border bg-muted">
                <Icon />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{heading}</h3>
                <p className="text-muted-foreground">{copy}</p>
              </div>
              <Button
                className="ml-auto shrink-0"
                type="button"
                variant="outline"
              >
                {action}
              </Button>
            </div>
          ))}
          <p className="text-muted-foreground text-sm">Escalation paths</p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "Advisor office hours",
                "Guided setup review.",
                "Reserve a session",
              ],
              [
                "Direct support desk",
                "Account and product help.",
                "Email support",
              ],
            ].map(([heading, copy, action]) => (
              <div className="overflow-hidden rounded-xl border" key={heading}>
                <div className="flex flex-col gap-2 p-4">
                  <h3>{heading}</h3>
                  <p className="text-muted-foreground">{copy}</p>
                  <p className="text-muted-foreground text-sm">
                    Replies usually land within one business day.
                  </p>
                </div>
                <Button
                  className="w-full rounded-none"
                  type="button"
                  variant="outline"
                >
                  {action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogFrame>
    </Dialog>
  );
}
