import type { LucideIcon } from "lucide-react";
import {
  ActivityIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleUserRoundIcon,
  CreditCardIcon,
  EllipsisIcon,
  GaugeIcon,
  Layers3Icon,
  LifeBuoyIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  PlusIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SunIcon,
  UsersIcon,
  WorkflowIcon,
} from "lucide-react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavigationItem {
  badge?: string;
  children?: string[];
  icon: LucideIcon;
  label: string;
}

const primaryNavigation: NavigationItem[] = [
  { icon: GaugeIcon, label: "Overview" },
  {
    children: ["Build Runs", "Deployments", "Release Gates"],
    icon: WorkflowIcon,
    label: "Pipelines",
  },
  { icon: Layers3Icon, label: "Infrastructure" },
  { badge: "14", icon: ActivityIcon, label: "Observability" },
  { icon: ShieldCheckIcon, label: "Security" },
];

const resources: Array<{ color: string; label: string; meta?: string }> = [
  { color: "bg-chart-2", label: "API Gateway", meta: "Prod" },
  { color: "bg-chart-4", label: "ML Pipeline" },
  { color: "bg-chart-3", label: "Database", meta: "US-East" },
  { color: "bg-chart-5", label: "CDN" },
  { color: "bg-destructive", label: "Authentication" },
];

const utilityNavigation = [
  { icon: SettingsIcon, label: "Settings" },
  { icon: UsersIcon, label: "Invite Team" },
  { icon: BookOpenIcon, label: "Documentation" },
] as const;

function BrandMark() {
  return (
    <span className="grid size-7 place-items-center rounded-lg bg-sidebar-primary font-bold text-sidebar-primary-foreground">
      U
    </span>
  );
}

function AppShellContent({ children }: { children?: ReactNode }) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] gap-4">
      <section
        aria-label="Overview cards"
        className="grid min-h-48 gap-4 md:grid-cols-3"
      >
        {["Build health", "Usage", "Latency"].map((label) => (
          <div className="rounded-xl border border-dashed bg-card" key={label}>
            <span className="sr-only">{label}</span>
          </div>
        ))}
      </section>
      <section
        aria-label="Overview workspace"
        className="min-h-96 rounded-xl border border-dashed bg-card"
      />
    </div>
  );
}

interface ProductNavigationProps {
  activeItem: string;
  onItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function ProductNavigation({
  activeItem,
  onItemClick,
}: ProductNavigationProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {primaryNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  data-navigation-label={item.label}
                  isActive={activeItem === item.label}
                  onClick={onItemClick}
                >
                  <Icon />
                  <span>{item.label}</span>
                  {item.children ? (
                    <ChevronDownIcon className="ml-auto" />
                  ) : null}
                  {item.label === "Infrastructure" ? (
                    <ChevronRightIcon className="ml-auto" />
                  ) : null}
                </SidebarMenuButton>
                {item.badge ? (
                  <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                ) : null}
                {item.children ? (
                  <SidebarMenuSub>
                    {item.children.map((child) => (
                      <SidebarMenuSubItem key={child}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={activeItem === child}
                        >
                          <button
                            data-navigation-label={child}
                            onClick={onItemClick}
                            type="button"
                          >
                            <span>{child}</span>
                          </button>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function ResourceNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span className="flex-1">Resources</span>
        <ChevronDownIcon />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {resources.map((resource) => (
            <SidebarMenuItem key={resource.label}>
              <SidebarMenuButton>
                <span className={cn("size-1.5 rounded-full", resource.color)} />
                <span>{resource.label}</span>
                {resource.meta ? (
                  <Badge className="ml-auto" variant="outline">
                    {resource.meta}
                  </Badge>
                ) : null}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function WorkspaceMenu({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu defaultOpen={defaultOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton aria-label="Switch workspace" size="lg">
              <BrandMark />
              <span className="flex-1 font-semibold">ReUI</span>
              <EllipsisIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-68">
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Avatar size="sm">
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <span className="flex-1">ReUI</span>
                <CheckIcon />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Avatar size="sm">
                  <AvatarFallback>K</AvatarFallback>
                </Avatar>
                Keenthemes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Avatar size="sm">
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                Metronic
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PlusIcon />
                <span className="flex flex-col">
                  <span>New Workspace</span>
                  <span className="text-muted-foreground text-xs">
                    Collaborate with others.
                  </span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function UserMenu({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu defaultOpen={defaultOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              aria-label="Open user menu"
              size="lg"
              variant="outline"
            >
              <Avatar size="sm">
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 truncate font-medium">
                Nick Bold
              </span>
              <EllipsisIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-68" side="right">
            <DropdownMenuLabel className="flex items-center gap-3 py-2">
              <Avatar>
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
              <span className="flex flex-col">
                <span className="font-medium text-foreground text-sm">
                  Nick Bold
                </span>
                <span className="font-normal text-muted-foreground">
                  nick@reui.io
                </span>
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
                Billing &amp; Usage
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                Preferences
                <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LifeBuoyIcon />
                Help &amp; Support
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpenIcon />
                API Reference
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex items-center gap-2">
              <span className="flex-1">Theme</span>
              <SunIcon />
              <MoonIcon />
              <MonitorIcon />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOutIcon />
                Sign Out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export interface AppShell1Props {
  children?: ReactNode;
  defaultUserMenuOpen?: boolean;
  defaultWorkspaceMenuOpen?: boolean;
}

const productSidebarStyle = {
  "--sidebar-width": "18rem",
} as CSSProperties;

export function AppShell1({
  children,
  defaultUserMenuOpen = false,
  defaultWorkspaceMenuOpen = false,
}: AppShell1Props) {
  const [activeItem, setActiveItem] = useState("Overview");
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
    <TooltipProvider>
      <SidebarProvider style={productSidebarStyle}>
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
            <WorkspaceMenu defaultOpen={defaultWorkspaceMenuOpen} />
          </SidebarHeader>
          <SidebarContent>
            <ProductNavigation
              activeItem={activeItem}
              onItemClick={handleItemClick}
            />
            <ResourceNavigation />
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              {utilityNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
            <UserMenu defaultOpen={defaultUserMenuOpen} />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="gap-4 p-4">
          <header className="flex min-h-8 items-center gap-2 text-sm">
            <SidebarTrigger aria-label="Open sidebar" className="md:hidden" />
            <span className="text-muted-foreground">Dashboard</span>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
            <span>Overview</span>
          </header>
          <AppShellContent>{children}</AppShellContent>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
