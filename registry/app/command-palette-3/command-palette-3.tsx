"use client";

import {
  AppWindowIcon,
  ArrowRightIcon,
  BookOpenIcon,
  FileBarChartIcon,
  FileIcon,
  FolderIcon,
  HashIcon,
  SearchIcon,
  UserCogIcon,
} from "lucide-react";
import { type ComponentType, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
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

interface Result {
  category?: string;
  icon: ComponentType;
  label: string;
  time?: string;
}
const recent: Result[] = [
  { icon: FileIcon, label: "Q3 Budget Review.xlsx", time: "2 min ago" },
  { icon: AppWindowIcon, label: "Acme Design System", time: "1 hour ago" },
  { icon: BookOpenIcon, label: "Onboarding Docs", time: "Yesterday" },
];
const results: Result[] = [
  { category: "Folder", icon: FolderIcon, label: "Marketing Assets" },
  {
    category: "File",
    icon: FileBarChartIcon,
    label: "Campaign Performance Report",
  },
  { category: "Channel", icon: HashIcon, label: "acme-design" },
  { category: "Settings", icon: UserCogIcon, label: "Account Settings" },
];
const groupClass =
  "p-1.5 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:tracking-wide";

export default function CommandPalette3() {
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
  const renderItem = (item: Result) => (
    <CommandItem
      className="gap-2.5 px-3 py-2.5 text-sm"
      key={item.label}
      onSelect={run}
      value={item.label}
    >
      <item.icon aria-hidden="true" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.time ? (
        <span className="text-[10px] text-muted-foreground">{item.time}</span>
      ) : (
        <>
          <Badge variant="outline">{item.category}</Badge>
          <CommandShortcut>
            <Kbd>↵</Kbd>
          </CommandShortcut>
        </>
      )}
      <ArrowRightIcon
        aria-hidden="true"
        className="size-3.5 opacity-0 transition-opacity group-data-selected/command-item:opacity-100"
      />
    </CommandItem>
  );
  return (
    <section className="flex min-h-svh w-full flex-col items-center justify-center gap-3 bg-background px-6 py-12 text-foreground">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger
          render={
            <Button
              className="w-full max-w-lg justify-start gap-2 text-muted-foreground"
              variant="outline"
            />
          }
        >
          <SearchIcon aria-hidden="true" />
          <span className="flex-1 text-left">Type a command or search…</span>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </DialogTrigger>
        <DialogContent
          className="overflow-hidden p-0 sm:max-w-lg"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <DialogDescription className="sr-only">
            Search recent items and results.
          </DialogDescription>
          <Command>
            <CommandInput
              aria-label="Type a command or search"
              className="text-sm"
              placeholder="Type a command or search…"
            />
            <CommandList>
              <CommandEmpty className="text-sm">No results found.</CommandEmpty>
              <CommandGroup className={groupClass} heading="Recent">
                {recent.map(renderItem)}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup className={groupClass} heading="Results">
                {results.map(renderItem)}
              </CommandGroup>
            </CommandList>
            <div className="flex items-center gap-4 border-border border-t bg-muted/50 px-4 py-2">
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <KbdGroup>
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                </KbdGroup>
                to navigate
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Kbd>↵</Kbd>to open
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Kbd>Esc</Kbd>to close
              </span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
      {ranLabel ? (
        <p className="text-muted-foreground text-xs">
          Opened:{" "}
          <span className="font-medium text-foreground">{ranLabel}</span>
        </p>
      ) : null}
    </section>
  );
}
