import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
  GaugeIcon,
  Globe2Icon,
  Grid2X2Icon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ReportsNavigationItem {
  badge?: string;
  children?: string[];
  icon: LucideIcon;
  label: string;
  nested?: boolean;
}

const reportsNavigation: ReportsNavigationItem[] = [
  { icon: GaugeIcon, label: "Overview" },
  { badge: "Soon", icon: BarChart3Icon, label: "Analytics" },
  { icon: UsersIcon, label: "Audience", nested: true },
  {
    children: ["Profile", "Billing", "Security", "Members"],
    icon: SettingsIcon,
    label: "Account",
  },
  { icon: Globe2Icon, label: "Network", nested: true },
];

const reportProjects = [
  { color: "border-chart-3", label: "Billing Portal" },
  { color: "border-chart-2", label: "Audience Sync" },
  { color: "border-chart-4", label: "Report Builder" },
  { color: "border-chart-5", label: "Network Map" },
  { color: "border-destructive", label: "Access Review" },
] as const;

const reportsShellStyle = {
  "--sidebar-width": "17.25rem",
} as CSSProperties;

function ProductMark() {
  return (
    <span className="grid size-8 place-items-center rounded-lg bg-sidebar-primary font-bold text-sidebar-primary-foreground">
      U
    </span>
  );
}

function ReportsNavigation({
  activeItem,
  onItemClick,
}: {
  activeItem: string;
  onItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {reportsNavigation.slice(0, 2).map((item) => {
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
                    {item.badge ? (
                      <Badge className="ml-auto" variant="secondary">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {reportsNavigation.slice(2).map((item) => {
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
                    {item.nested ? (
                      <ChevronRightIcon className="ml-auto" />
                    ) : null}
                  </SidebarMenuButton>
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
    </>
  );
}

function ReportProjects() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span className="flex-1">Active Projects</span>
        <ChevronDownIcon />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {reportProjects.map((project) => (
            <SidebarMenuItem key={project.label}>
              <SidebarMenuButton>
                <span
                  className={cn(
                    "size-4 rounded-full border-2 border-r-muted",
                    project.color
                  )}
                />
                <span>{project.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function ReportsCanvas({ children }: { children?: ReactNode }) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] gap-4">
      <section
        aria-label="Report summary"
        className="grid min-h-52 gap-4 md:grid-cols-3"
      >
        {["Revenue", "Audience", "Retention"].map((label) => (
          <div className="rounded-xl border border-dashed bg-card" key={label}>
            <span className="sr-only">{label}</span>
          </div>
        ))}
      </section>
      <section
        aria-label="Report workspace"
        className="min-h-96 rounded-xl border border-dashed bg-card"
      />
    </div>
  );
}

export interface AppShell5Props {
  children?: ReactNode;
}

export function AppShell5({ children }: AppShell5Props) {
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
      <SidebarProvider style={reportsShellStyle}>
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-1 py-1">
              <ProductMark />
              <span className="flex flex-col leading-tight">
                <span className="font-semibold">ReUI</span>
                <span className="text-muted-foreground text-xs">Pro plan</span>
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <ReportsNavigation
              activeItem={activeItem}
              onItemClick={handleItemClick}
            />
            <ReportProjects />
          </SidebarContent>
          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
              {[
                { icon: SettingsIcon, label: "Settings" },
                { icon: UsersIcon, label: "Invite Team" },
                { icon: BookOpenIcon, label: "Documentation" },
              ].map((item) => {
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
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex min-h-13 items-center gap-2 border-b px-4">
            <SidebarTrigger aria-label="Open sidebar" className="md:hidden" />
            <span className="text-muted-foreground text-sm">Dashboards</span>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
            <span className="text-sm">Overview</span>
            <div className="ml-auto flex items-center gap-1">
              <Button aria-label="Search" size="icon-sm" variant="ghost">
                <SearchIcon />
              </Button>
              <Button aria-label="Notifications" size="icon-sm" variant="ghost">
                <BellIcon />
              </Button>
              <Button aria-label="Open apps" size="icon-sm" variant="ghost">
                <Grid2X2Icon />
              </Button>
              <Avatar size="sm">
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <h1 className="font-semibold text-xl">Overview</h1>
                <p className="text-muted-foreground text-sm">
                  Your workspace at a glance.
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                <Button variant="outline">
                  <DownloadIcon data-icon="inline-start" />
                  Export
                </Button>
                <Button>
                  <PlusIcon data-icon="inline-start" />
                  New Report
                </Button>
              </div>
            </div>
            <ReportsCanvas>{children}</ReportsCanvas>
          </div>
          <footer className="flex flex-wrap items-center gap-3 border-t px-4 py-3 text-muted-foreground text-xs">
            <span>
              2026 © <strong className="text-foreground">ReUI</strong>
            </span>
            <nav aria-label="Footer" className="ml-auto flex flex-wrap gap-4">
              {["Docs", "Changelog", "Support", "Privacy", "Status"].map(
                (item) => (
                  <a href={`/${item.toLowerCase()}`} key={item}>
                    {item}
                  </a>
                )
              )}
            </nav>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
