import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  ChevronsUpDownIcon,
  CircleUserRoundIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

const primaryNavigation = [
  "Overview",
  "Projects",
  "Team",
  "Workspace",
] as const;

const workspaceViews: Array<{ icon: LucideIcon; label: string }> = [
  { icon: LayoutDashboardIcon, label: "Dashboard" },
  { icon: ListTodoIcon, label: "Tasks" },
  { icon: BarChart3Icon, label: "Roadmap" },
];

function HarborMark() {
  return (
    <span className="grid size-8 place-items-center rounded-lg bg-foreground font-heading text-background">
      <span aria-hidden="true" className="font-semibold text-sm">
        H
      </span>
    </span>
  );
}

function WorkspaceCanvas({ children }: { children?: ReactNode }) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <section
      aria-label="Harbor workspace"
      className="min-h-112 flex-1 rounded-t-[1.25rem] border border-[#d7e1eb] border-b-0 bg-[#edf3f8] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
    />
  );
}

function UserMenu({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Open user menu"
            className="h-9 gap-2 px-1.5"
            variant="ghost"
          />
        }
      >
        <Avatar size="sm">
          <AvatarFallback>LV</AvatarFallback>
        </Avatar>
        <span className="font-medium">Lena Voss</span>
        <ChevronsUpDownIcon data-icon="inline-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Lena Voss</span>
          <span className="font-normal text-muted-foreground">
            lena@harbor.studio
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CircleUserRoundIcon />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Preferences
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogOutIcon />
            Sign out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavigationButtons({
  activeItem,
  ariaLabel,
  className,
  items,
  onItemClick,
}: {
  activeItem: string;
  ariaLabel: string;
  className?: string;
  items: readonly string[] | Array<{ icon: LucideIcon; label: string }>;
  onItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn("flex items-center gap-1", className)}
    >
      {items.map((item) => {
        const label = typeof item === "string" ? item : item.label;
        const Icon = typeof item === "string" ? null : item.icon;
        const isActive = activeItem === label;

        return (
          <Button
            aria-current={isActive ? "page" : undefined}
            className={cn(!isActive && "text-muted-foreground")}
            data-navigation-label={label}
            key={label}
            onClick={onItemClick}
            variant={isActive ? "secondary" : "ghost"}
          >
            {Icon ? <Icon data-icon="inline-start" /> : null}
            {label}
          </Button>
        );
      })}
    </nav>
  );
}

export interface AppShell6Props {
  children?: ReactNode;
  defaultUserMenuOpen?: boolean;
}

export function AppShell6({
  children,
  defaultUserMenuOpen = false,
}: AppShell6Props) {
  const [primaryItem, setPrimaryItem] = useState("Overview");
  const [viewItem, setViewItem] = useState("Dashboard");

  const handlePrimaryClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { navigationLabel } = event.currentTarget.dataset;
      if (navigationLabel) {
        setPrimaryItem(navigationLabel);
      }
    },
    []
  );

  const handleViewClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { navigationLabel } = event.currentTarget.dataset;
      if (navigationLabel) {
        setViewItem(navigationLabel);
      }
    },
    []
  );

  return (
    <div className="flex min-h-svh flex-col bg-[#f7f9fb] text-[#17324d]">
      <header className="border-[#d7e1eb] border-b bg-[#f7f9fb]">
        <div className="flex min-h-16 flex-wrap items-center gap-3 px-4 py-2.5">
          <a className="flex items-center gap-2 font-semibold" href="#harbor">
            <HarborMark />
            Harbor
          </a>

          <NavigationButtons
            activeItem={primaryItem}
            ariaLabel="Primary"
            className="flex-wrap"
            items={primaryNavigation}
            onItemClick={handlePrimaryClick}
          />

          <div className="ml-auto flex items-center gap-2">
            <InputGroup className="h-9 w-56 border-[#d7e1eb] bg-white/80 shadow-none">
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Search Harbor"
                placeholder="Search..."
                type="search"
              />
            </InputGroup>
            <UserMenu defaultOpen={defaultUserMenuOpen} />
          </div>
        </div>

        <div className="flex min-h-12 items-center border-[#e4ebf2] border-t bg-[#f0f5f9] px-4 pt-1 pb-2">
          <NavigationButtons
            activeItem={viewItem}
            ariaLabel="Workspace views"
            items={workspaceViews}
            onItemClick={handleViewClick}
          />
        </div>
      </header>

      <WorkspaceCanvas>{children}</WorkspaceCanvas>
    </div>
  );
}
