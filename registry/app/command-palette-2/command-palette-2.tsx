"use client";

import {
  BarChartIcon,
  FileTextIcon,
  Grid2X2Icon,
  SearchIcon,
  SettingsIcon,
  SquareTerminalIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { type ComponentType, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

interface CommandEntry {
  icon: ComponentType;
  label: string;
  shortcut: string[];
}
const navigation: CommandEntry[] = [
  { icon: Grid2X2Icon, label: "Go To Dashboard", shortcut: ["G", "D"] },
  { icon: FileTextIcon, label: "Open Projects", shortcut: ["G", "P"] },
  { icon: BarChartIcon, label: "View Analytics", shortcut: ["G", "A"] },
  { icon: UsersIcon, label: "Browse Members", shortcut: ["G", "M"] },
];
const actions: CommandEntry[] = [
  { icon: UserIcon, label: "Edit Profile", shortcut: ["Ctrl", "E"] },
  { icon: SettingsIcon, label: "Open Settings", shortcut: ["Ctrl", ","] },
  { icon: SquareTerminalIcon, label: "Open Terminal", shortcut: ["Ctrl", "`"] },
];
const groupClass =
  "p-1.5 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:tracking-wide";

export default function CommandPalette2() {
  const [open, setOpen] = useState(true);
  const [ranLabel, setRanLabel] = useState<string | null>(null);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const run = (label: string) => {
    setRanLabel(label);
    setOpen(false);
  };
  const renderGroup = (heading: string, entries: CommandEntry[]) => (
    <CommandGroup className={groupClass} heading={heading}>
      {entries.map(({ icon: Icon, label, shortcut }) => (
        <CommandItem
          className="gap-2.5 px-3 py-2.5 text-sm"
          key={label}
          onSelect={run}
          value={label}
        >
          <Icon aria-hidden="true" />
          <span className="flex-1 truncate">{label}</span>
          <CommandShortcut>
            <KbdGroup>
              {shortcut.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </KbdGroup>
          </CommandShortcut>
        </CommandItem>
      ))}
    </CommandGroup>
  );
  return (
    <section className="flex min-h-svh w-full flex-col items-center justify-center gap-3 bg-background px-6 py-12 text-foreground">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button
            className="w-full max-w-md justify-start gap-2 text-muted-foreground"
            variant="outline"
          >
            <SearchIcon aria-hidden="true" />
            <span className="flex-1 text-left">Search…</span>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-hidden p-0" showCloseButton={false}>
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <DialogDescription className="sr-only">
            Search for a command to run.
          </DialogDescription>
          <Command>
            <CommandInput
              aria-label="Search commands"
              className="text-sm"
              placeholder="Search commands…"
            />
            <CommandList>
              <CommandEmpty className="text-sm">
                No commands found.
              </CommandEmpty>
              {renderGroup("Navigation", navigation)}
              <CommandSeparator />
              {renderGroup("Actions", actions)}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
      {ranLabel ? (
        <p className="text-muted-foreground text-xs">
          Last action:{" "}
          <span className="font-medium text-foreground">{ranLabel}</span>
        </p>
      ) : null}
    </section>
  );
}
