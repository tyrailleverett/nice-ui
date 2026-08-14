import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  BellIcon,
  CheckSquareIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleDotIcon,
  FolderIcon,
  GaugeIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ProjectNavigationItem {
  icon: LucideIcon;
  label: string;
  nested?: boolean;
}

const platformNavigation: ProjectNavigationItem[] = [
  { icon: GaugeIcon, label: "Dashboard" },
  { icon: FolderIcon, label: "Projects" },
  { icon: CheckSquareIcon, label: "My Tasks" },
  { icon: CircleDotIcon, label: "Issues", nested: true },
  { icon: UsersIcon, label: "Team", nested: true },
  { icon: BarChart3Icon, label: "Reports" },
];

const activeProjects = [
  { color: "border-chart-3", label: "Design System" },
  { color: "border-chart-4", label: "API Integration" },
  { color: "border-chart-2", label: "Mobile App" },
  { color: "border-chart-5", label: "Analytics Dashboard" },
  { color: "border-destructive", label: "Auth Module" },
] as const;

const projectShellStyle = {
  "--sidebar-width": "18rem",
} as CSSProperties;

function ProductMark() {
  return (
    <span className="grid size-8 place-items-center rounded-lg bg-sidebar-primary font-bold text-sidebar-primary-foreground">
      U
    </span>
  );
}

function ProjectNavigation({
  activeItem,
  onItemClick,
}: {
  activeItem: string;
  onItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {platformNavigation.map((item) => {
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
                  {item.nested ? (
                    <ChevronRightIcon className="ml-auto" />
                  ) : null}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function ActiveProjects() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span className="flex-1">Active Projects</span>
        <ChevronDownIcon />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {activeProjects.map((project) => (
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

function SpendingLimitCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Spending Limit</CardTitle>
        <CardDescription>
          Consumption and balance reset at the end of the month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress aria-label="Monthly spending used" value={82} />
      </CardContent>
      <CardFooter className="justify-between text-xs">
        <span>
          <strong>82%</strong> Used
        </span>
        <span>
          <strong>18%</strong> Free
        </span>
      </CardFooter>
    </Card>
  );
}

function DashboardCanvas({ children }: { children?: ReactNode }) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] gap-4">
      <section
        aria-label="Dashboard summary"
        className="grid min-h-48 gap-4 md:grid-cols-3"
      >
        {["Milestones", "Tasks", "Issues"].map((label) => (
          <div className="rounded-xl border border-dashed bg-card" key={label}>
            <span className="sr-only">{label}</span>
          </div>
        ))}
      </section>
      <section
        aria-label="Dashboard workspace"
        className="min-h-96 rounded-xl border border-dashed bg-card"
      />
    </div>
  );
}

export interface AppShell3Props {
  children?: ReactNode;
}

export function AppShell3({ children }: AppShell3Props) {
  const [activeItem, setActiveItem] = useState("Dashboard");
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
      <SidebarProvider style={projectShellStyle}>
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
            <div className="flex h-10 items-center gap-2 px-1">
              <ProductMark />
              <span className="font-semibold">ReUI</span>
              <Button
                aria-label="Notifications"
                className="ml-auto"
                size="icon-sm"
                variant="ghost"
              >
                <BellIcon />
              </Button>
              <SidebarTrigger aria-label="Collapse sidebar" />
            </div>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <SidebarInput
                aria-label="Search projects"
                className="px-8"
                placeholder="Search..."
              />
              <Kbd className="absolute top-1/2 right-2 -translate-y-1/2">
                ⌘K
              </Kbd>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <ProjectNavigation
              activeItem={activeItem}
              onItemClick={handleItemClick}
            />
            <ActiveProjects />
          </SidebarContent>
          <SidebarFooter>
            <SpendingLimitCard />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Avatar size="sm">
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 font-medium">Claude</span>
                  <span className="text-muted-foreground">•••</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="gap-4 p-3">
          <header className="flex min-h-8 items-center gap-2 text-sm">
            <SidebarTrigger aria-label="Open sidebar" className="md:hidden" />
            <GaugeIcon className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <span className="text-muted-foreground">–</span>
            <span>Overview</span>
          </header>
          <DashboardCanvas>{children}</DashboardCanvas>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
