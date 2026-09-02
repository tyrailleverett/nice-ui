import type { LucideIcon } from "lucide-react";
import {
  ActivityIcon,
  BellIcon,
  ChevronDownIcon,
  CircleHelpIcon,
  CommandIcon,
  GaugeIcon,
  Layers3Icon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TopNavigationItem {
  icon: LucideIcon;
  label: string;
}

const topNavigation: TopNavigationItem[] = [
  { icon: GaugeIcon, label: "Overview" },
  { icon: ActivityIcon, label: "Runs" },
  { icon: Layers3Icon, label: "Resources" },
  { icon: UsersIcon, label: "Team" },
];

const workspaceItems = ["Northstar", "Atlas", "Sandbox"] as const;

function NorthstarMark() {
  return (
    <span className="grid size-8 place-items-center rounded-md bg-orange-500 font-mono font-semibold text-white">
      N
    </span>
  );
}

function WorkspaceMenu({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Switch workspace"
            className="h-10 gap-2 px-2.5 text-white hover:bg-white/10 hover:text-white"
            variant="ghost"
          />
        }
      >
        <NorthstarMark />
        <span className="hidden font-medium sm:inline">Northstar</span>
        <ChevronDownIcon className="size-4 text-white/50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuGroup>
          {workspaceItems.map((workspace) => (
            <DropdownMenuItem key={workspace}>{workspace}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SettingsIcon />
          Workspace settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button aria-label="Open account menu" size="icon" variant="ghost" />
        }
      >
        <Avatar size="sm">
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Ada Rivera</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SettingsIcon />
          Account settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TopNavigation({
  activeItem,
  onItemClick,
}: {
  activeItem: string;
  onItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <nav
      aria-label="Primary"
      className="flex items-center gap-1 overflow-x-auto"
    >
      {topNavigation.map((item) => {
        const Icon = item.icon;
        const isActive = item.label === activeItem;

        return (
          <Button
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 gap-2 text-white/60 hover:bg-white/10 hover:text-white",
              isActive && "bg-white/10 text-white"
            )}
            data-navigation-label={item.label}
            key={item.label}
            onClick={onItemClick}
            variant="ghost"
          >
            <Icon data-icon="inline-start" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}

function WorkspaceCanvas({ children }: { children?: ReactNode }) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="grid min-h-112 gap-4 lg:grid-cols-[1.4fr_0.6fr]">
      <section
        aria-label="Activity feed"
        className="rounded-lg border border-border bg-card"
      />
      <section
        aria-label="Workspace summary"
        className="rounded-lg border border-border bg-card"
      />
    </div>
  );
}

export interface AppShell10Props {
  children?: ReactNode;
  defaultWorkspaceMenuOpen?: boolean;
}

export function AppShell10({
  children,
  defaultWorkspaceMenuOpen = false,
}: AppShell10Props) {
  const [activeItem, setActiveItem] = useState("Overview");

  const handleNavigationClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { navigationLabel } = event.currentTarget.dataset;
      if (navigationLabel) {
        setActiveItem(navigationLabel);
      }
    },
    []
  );

  return (
    <div className="flex min-h-svh flex-col bg-[#111110] text-foreground">
      <header className="border-white/10 border-b bg-[#191918] text-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-2 px-4 py-2 lg:gap-6 lg:px-6">
          <WorkspaceMenu defaultOpen={defaultWorkspaceMenuOpen} />
          <div className="hidden h-6 w-px bg-white/10 lg:block" />
          <TopNavigation
            activeItem={activeItem}
            onItemClick={handleNavigationClick}
          />
          <div className="ml-auto flex items-center gap-1">
            <div className="relative hidden xl:block">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
              <Input
                aria-label="Search workspace"
                className="h-9 w-52 border-white/10 bg-white/5 pl-9 text-white placeholder:text-white/40"
                placeholder="Search workspace"
                type="search"
              />
            </div>
            <Button aria-label="Open command menu" size="icon" variant="ghost">
              <CommandIcon />
            </Button>
            <Button aria-label="View notifications" size="icon" variant="ghost">
              <BellIcon />
            </Button>
            <AccountMenu />
          </div>
        </div>
      </header>

      <div className="border-white/10 border-b bg-[#191918]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-md bg-orange-500/15 text-orange-400">
              <CircleHelpIcon className="size-5" />
            </div>
            <div>
              <p className="font-medium text-sm text-white">{activeItem}</p>
              <p className="text-white/45 text-xs">Northstar workspace</p>
            </div>
          </div>
          <Badge
            className="border-orange-400/20 bg-orange-400/10 text-orange-300"
            variant="outline"
          >
            Operational
          </Badge>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
        <WorkspaceCanvas>{children}</WorkspaceCanvas>
      </main>
    </div>
  );
}
