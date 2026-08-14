"use client";

import {
  BarChartIcon,
  CornerDownLeftIcon,
  FileTextIcon,
  FolderIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { type ComponentType, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

interface Entry {
  category: string;
  description: string;
  group: string;
  icon: ComponentType;
  id: string;
  meta: { label: string; value: string }[];
  title: string;
}
const entries: Entry[] = [
  {
    category: "Document",
    description:
      "The planning doc for the next quarter, covering themes, bets, and the sequencing across teams.",
    group: "Documents",
    icon: FileTextIcon,
    id: "roadmap",
    meta: [
      { label: "Owner", value: "Mara Lin" },
      { label: "Updated", value: "Jul 9, 2026" },
    ],
    title: "Q3 Product Roadmap",
  },
  {
    category: "Folder",
    description:
      "Logos, color tokens, and export-ready templates for the marketing and product teams.",
    group: "Documents",
    icon: FolderIcon,
    id: "assets",
    meta: [
      { label: "Items", value: "148 files" },
      { label: "Updated", value: "Jul 2, 2026" },
    ],
    title: "Brand Assets",
  },
  {
    category: "Page",
    description:
      "Traffic, conversion, and retention dashboards for the current billing period.",
    group: "Navigation",
    icon: BarChartIcon,
    id: "analytics",
    meta: [
      { label: "Section", value: "Insights" },
      { label: "Access", value: "Admins" },
    ],
    title: "View Analytics",
  },
  {
    category: "Page",
    description:
      "The full team directory with roles, status, and their most recent activity.",
    group: "Navigation",
    icon: UsersIcon,
    id: "members",
    meta: [
      { label: "Section", value: "People" },
      { label: "Count", value: "42 members" },
    ],
    title: "Browse Members",
  },
  {
    category: "Action",
    description:
      "Update your display name, avatar, and the notifications you receive.",
    group: "Actions",
    icon: UserIcon,
    id: "profile",
    meta: [{ label: "Shortcut", value: "Cmd E" }],
    title: "Edit Profile",
  },
  {
    category: "Action",
    description:
      "Workspace preferences, billing, integrations, and security controls.",
    group: "Actions",
    icon: SettingsIcon,
    id: "settings",
    meta: [{ label: "Shortcut", value: "Cmd ," }],
    title: "Open Settings",
  },
];
const groups = ["Navigation", "Documents", "Actions"];
const groupClass =
  "p-1.5 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:tracking-wide";

function PreviewPane({ entry }: { entry: Entry | undefined }) {
  if (!entry) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-muted-foreground text-sm">
        Select a result to preview it.
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
        <entry.icon aria-hidden="true" />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <h3 className="font-heading font-semibold text-sm">{entry.title}</h3>
        <Badge variant="secondary">{entry.category}</Badge>
      </div>
      <p className="mt-2 text-pretty text-muted-foreground text-sm">
        {entry.description}
      </p>
      <dl className="mt-5 flex flex-col gap-2 border-border border-t pt-4">
        {entry.meta.map((row) => (
          <div className="flex items-center justify-between" key={row.label}>
            <dt className="text-muted-foreground text-xs">{row.label}</dt>
            <dd className="font-medium text-xs tabular-nums">{row.value}</dd>
          </div>
        ))}
      </dl>
      <Button className="mt-auto w-full">
        Open
        <KbdGroup>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
        </KbdGroup>
      </Button>
    </div>
  );
}

export default function CommandPalette4() {
  const [value, setValue] = useState(entries[0].id);
  const selected = entries.find((entry) => entry.id === value);
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="grid h-[420px] w-full max-w-2xl grid-cols-1 overflow-hidden rounded-lg border border-border bg-popover sm:grid-cols-[1fr_260px]">
        <Command
          className="bg-transparent"
          onValueChange={setValue}
          value={value}
        >
          <CommandInput
            aria-label="Search everything"
            className="text-sm"
            placeholder="Search everything…"
          />
          <CommandList className="max-h-none flex-1">
            <CommandEmpty className="text-sm">No results found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup className={groupClass} heading={group} key={group}>
                {entries
                  .filter((entry) => entry.group === group)
                  .map((entry) => (
                    <CommandItem
                      className="gap-2.5 px-3 py-2.5 text-sm"
                      key={entry.id}
                      onSelect={setValue}
                      value={entry.id}
                    >
                      <entry.icon aria-hidden="true" />
                      <span className="flex-1 truncate">{entry.title}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
        <div className="hidden border-border border-l bg-background sm:block">
          <PreviewPane entry={selected} />
        </div>
      </div>
    </section>
  );
}
