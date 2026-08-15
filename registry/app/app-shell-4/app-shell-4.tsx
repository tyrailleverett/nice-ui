import type { LucideIcon } from "lucide-react";
import {
  ActivityIcon,
  BoxesIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  KeyRoundIcon,
  SearchIcon,
  ShieldCheckIcon,
  UsersIcon,
  WebhookIcon,
} from "lucide-react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ConsoleNavigationItem {
  children?: string[];
  icon: LucideIcon;
  label: string;
  nested?: boolean;
}

const consoleNavigation: ConsoleNavigationItem[] = [
  { icon: BoxesIcon, label: "Overview" },
  {
    children: ["All Users", "Invitations", "Roles"],
    icon: UsersIcon,
    label: "Users",
  },
  { icon: BoxesIcon, label: "Organizations", nested: true },
  { icon: ShieldCheckIcon, label: "Security", nested: true },
  { icon: WebhookIcon, label: "Webhooks" },
  { icon: KeyRoundIcon, label: "API Keys" },
];

const consoleShellStyle = {
  "--sidebar-width": "18rem",
} as CSSProperties;

function ProductMark() {
  return (
    <span className="grid size-8 place-items-center rounded-lg bg-sidebar-primary font-bold text-sidebar-primary-foreground">
      U
    </span>
  );
}

function EnvironmentBar() {
  return (
    <header className="flex min-h-13 items-center gap-3 border-b px-4 text-sm">
      <SidebarTrigger aria-label="Open sidebar" className="md:hidden" />
      <span className="size-3 rounded-full bg-chart-4" />
      <span className="font-medium">Acme Inc</span>
      <ChevronDownIcon className="size-4 text-muted-foreground" />
      <span className="text-muted-foreground">/</span>
      <span className="hidden sm:inline">Web App</span>
      <ChevronDownIcon className="hidden size-4 text-muted-foreground sm:block" />
      <span className="hidden text-muted-foreground sm:inline">/</span>
      <span className="hidden sm:inline">Production</span>
      <ChevronDownIcon className="hidden size-4 text-muted-foreground sm:block" />
      <Badge className="ml-auto" variant="outline">
        <ActivityIcon data-icon="inline-start" />
        System
        <span className="text-chart-2">Normal</span>
      </Badge>
    </header>
  );
}

function ConsoleNavigation({
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
          {consoleNavigation.map((item) => {
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
  );
}

function ThemeAnnouncement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-theme support is here</CardTitle>
        <CardDescription>
          Switch between Vega, Nova, Maia, Lyra, and Mira themes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-28 overflow-hidden rounded-lg bg-chart-4/20">
          <span className="absolute -top-8 -left-8 size-36 rounded-full bg-chart-5/70 blur-xl" />
          <span className="absolute -right-8 bottom-0 size-40 rounded-full bg-chart-4/70 blur-xl" />
          <span className="absolute -bottom-16 left-4 size-44 rounded-full bg-chart-3/70 blur-xl" />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button size="sm" variant="ghost">
          Read more
        </Button>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  );
}

function ConsoleCanvas({ children }: { children?: ReactNode }) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] gap-4 p-4">
      <section
        aria-label="Environment summary"
        className="grid min-h-48 gap-4 md:grid-cols-3"
      >
        {["Users", "Organizations", "Requests"].map((label) => (
          <div className="rounded-xl border border-dashed bg-card" key={label}>
            <span className="sr-only">{label}</span>
          </div>
        ))}
      </section>
      <section
        aria-label="Console workspace"
        className="min-h-96 rounded-xl border border-dashed bg-card"
      />
    </div>
  );
}

export interface AppShell4Props {
  children?: ReactNode;
}

export function AppShell4({ children }: AppShell4Props) {
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
      <SidebarProvider style={consoleShellStyle}>
        <Sidebar collapsible="offcanvas">
          <SidebarHeader>
            <div className="flex h-10 items-center px-1">
              <ProductMark />
              <SidebarTrigger
                aria-label="Collapse sidebar"
                className="ml-auto"
              />
            </div>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <SidebarInput
                aria-label="Search console"
                className="px-8"
                placeholder="Search..."
              />
              <Kbd className="absolute top-1/2 right-2 -translate-y-1/2">
                ⌘K
              </Kbd>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <ConsoleNavigation
              activeItem={activeItem}
              onItemClick={handleItemClick}
            />
          </SidebarContent>
          <SidebarFooter>
            <ThemeAnnouncement />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarFallback>NB</AvatarFallback>
                  </Avatar>
                  <span className="flex flex-1 flex-col text-left leading-tight">
                    <span className="font-medium">Nick Bold</span>
                    <span className="text-muted-foreground text-xs">
                      nick@reui.io
                    </span>
                  </span>
                  <ChevronDownIcon />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <EnvironmentBar />
          <ConsoleCanvas>{children}</ConsoleCanvas>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
