import type { LucideIcon } from "lucide-react";
import {
  BellIcon,
  ChevronDownIcon,
  CircleDollarSignIcon,
  ClipboardPlusIcon,
  LanguagesIcon,
  ListIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  UsersIcon,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

interface ModuleLink {
  hasMenu?: boolean;
  icon: LucideIcon;
  items?: string[];
  label: string;
}

const moduleNavigation: ModuleLink[] = [
  {
    hasMenu: true,
    icon: ListIcon,
    items: ["Open tickets", "Scheduled", "Closed today"],
    label: "Job List",
  },
  {
    hasMenu: true,
    icon: ClipboardPlusIcon,
    items: ["Service call", "Recurring route", "Emergency dispatch"],
    label: "Create Job",
  },
  {
    hasMenu: true,
    icon: UsersIcon,
    items: ["Active accounts", "Sites", "Contacts"],
    label: "Clients",
  },
  { icon: SettingsIcon, label: "Settings" },
  { icon: CircleDollarSignIcon, label: "Billing & Invoice" },
];

function BaylineMark() {
  return (
    <span className="grid size-8 place-items-center rounded-full bg-primary-foreground font-heading text-primary">
      <span aria-hidden="true" className="text-lg leading-none">
        *
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
      aria-label="Bayline workspace"
      className="min-h-112 flex-1 rounded-xl border border-border bg-card"
    />
  );
}

function ModuleNav({
  activeItem,
  className,
  onItemClick,
}: {
  activeItem: string;
  className?: string;
  onItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <nav className={cn("flex flex-wrap items-center gap-1", className)}>
      {moduleNavigation.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.label;

        if (item.hasMenu && item.items) {
          return (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger
                render={
                  <Button
                    aria-current={isActive ? "page" : undefined}
                    className={cn(!isActive && "text-muted-foreground")}
                    data-navigation-label={item.label}
                    onClick={onItemClick}
                    variant={isActive ? "secondary" : "ghost"}
                  />
                }
              >
                <Icon data-icon="inline-start" />
                {item.label}
                <ChevronDownIcon data-icon="inline-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  {item.items.map((child) => (
                    <DropdownMenuItem key={child}>{child}</DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Button
            aria-current={isActive ? "page" : undefined}
            className={cn(!isActive && "text-muted-foreground")}
            data-navigation-label={item.label}
            key={item.label}
            onClick={onItemClick}
            variant={isActive ? "secondary" : "ghost"}
          >
            <Icon data-icon="inline-start" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}

function AccountMenu({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Open account menu"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            size="icon"
            variant="ghost"
          />
        }
      >
        <Avatar className="rounded-md after:rounded-md" size="sm">
          <AvatarFallback className="rounded-md">CR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Cal Reyes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Shift preferences</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogOutIcon />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface AppShell7Props {
  children?: ReactNode;
  defaultUserMenuOpen?: boolean;
}

export function AppShell7({
  children,
  defaultUserMenuOpen = false,
}: AppShell7Props) {
  const [activeItem, setActiveItem] = useState("Job List");

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { navigationLabel } = event.currentTarget.dataset;
      if (navigationLabel) {
        setActiveItem(navigationLabel);
      }
    },
    []
  );

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="border-border border-b bg-primary text-primary-foreground">
        <div className="grid items-center gap-3 border-primary-foreground/10 border-b px-4 py-2.5 md:grid-cols-[1fr_minmax(12rem,32rem)_1fr]">
          <a className="flex items-center gap-2 font-medium" href="#bayline">
            <BaylineMark />
            Bayline Dispatch
          </a>

          <InputGroup className="h-9 border-primary-foreground/15 bg-primary-foreground/10 shadow-none">
            <InputGroupAddon className="text-primary-foreground/70">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              aria-label="Search jobs"
              className="text-primary-foreground placeholder:text-primary-foreground/60"
              placeholder="Type to search..."
              type="search"
            />
          </InputGroup>

          <div className="flex items-center justify-end gap-1">
            <Button
              aria-label="Language"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              size="icon"
              variant="ghost"
            >
              <LanguagesIcon />
            </Button>
            <Button
              aria-label="Ask Bayline"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              size="icon"
              variant="ghost"
            >
              <SparklesIcon />
            </Button>
            <Button
              aria-label="Notifications"
              className="relative text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              size="icon"
              variant="ghost"
            >
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
            </Button>
            <AccountMenu defaultOpen={defaultUserMenuOpen} />
          </div>
        </div>
      </header>

      <div className="flex items-center gap-3 border-border border-b bg-background px-4 py-2.5">
        <ModuleNav
          activeItem={activeItem}
          className="min-w-0 flex-1"
          onItemClick={handleItemClick}
        />
        <Button className="ml-auto">Apply Now</Button>
      </div>

      <div className="flex flex-1 flex-col bg-muted p-4">
        <WorkspaceCanvas>{children}</WorkspaceCanvas>
      </div>
    </div>
  );
}
