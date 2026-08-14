/* biome-ignore-all lint/performance/noJsxPropsBind: Dialog controls close over preset, section, and scope values. */
import { Plus, Search } from "lucide-react";
import { DialogFrame, type DialogProps } from "@/components/app/dialogs-shared";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

const apps = [
  ["Claude", "Track model usage", "✳"],
  ["OpenAI", "Research and model runs", "◉"],
  ["Cursor", "Sync coding activity", "◈"],
  ["Google Calendar", "Mirror planning holds", "31"],
  ["Slack", "Monitor team activity", "✣"],
  ["Stripe", "Track revenue signals", "▰"],
  ["Zoom", "Log meeting sessions", "Z"],
  ["Loom", "Store async walkthroughs", "✷"],
  ["Instagram", "Track campaign engagement", "◎"],
  ["Discord", "Watch community activity", "♣"],
  ["Google Meet", "Capture call activity", "▣"],
  ["PayPal", "Monitor payout events", "P"],
] as const;
export function AddWorkspaceAppDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogFrame
        className="sm:max-w-5xl"
        description="Choose one source to connect."
        title="Add a workspace app"
      >
        <div className="flex flex-col gap-6">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search integrations" />
            <InputGroupAddon align="inline-end">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map(([name, copy, mark]) => (
              <button
                className="group flex min-h-36 flex-col justify-between rounded-xl border p-4 text-left transition-colors hover:bg-muted"
                key={name}
                type="button"
              >
                <span className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center font-semibold text-2xl">
                    {mark}
                  </span>
                  <span className="size-6 rounded-full border" />
                </span>
                <span className="flex flex-col gap-1">
                  <strong className="block">{name}</strong>
                  <span className="block truncate text-muted-foreground text-sm">
                    {copy}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="border-t pt-4">
          <Button className="w-full" type="button">
            <Plus data-icon="inline-start" />
            Add app
          </Button>
        </div>
      </DialogFrame>
    </Dialog>
  );
}
