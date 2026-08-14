import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleGaugeIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  LifeBuoyIcon,
  MenuIcon,
  SearchIcon,
  UsersIcon,
  WandSparklesIcon,
  ZapIcon,
} from "lucide-react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

interface OrganizationNavItem {
  children?: string[];
  icon: LucideIcon;
  label: string;
  status?: boolean;
}

const navigation: OrganizationNavItem[] = [
  { icon: CircleGaugeIcon, label: "Overview" },
  {
    children: ["Segments", "Accounts", "Health Scores"],
    icon: UsersIcon,
    label: "Customers",
  },
  { icon: CreditCardIcon, label: "Subscriptions" },
  { icon: BarChart3Icon, label: "Revenue", status: true },
  { icon: ZapIcon, label: "Automation" },
  { icon: LifeBuoyIcon, label: "Support" },
];

const footerNavigation = [
  { icon: WandSparklesIcon, label: "Settings" },
  { icon: UsersIcon, label: "Invite Team" },
  { icon: MenuIcon, label: "Documentation" },
] as const;

const organizationSidebarStyle = {
  "--sidebar-width": "17rem",
  "--sidebar-width-icon": "3.5rem",
} as CSSProperties;

function ProductMark() {
  return (
    <span className="grid size-8 place-items-center rounded-lg bg-sidebar-primary font-bold text-sidebar-primary-foreground">
      U
    </span>
  );
}

function OrganizationMark() {
  return (
    <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
      ▲
    </span>
  );
}

function SidebarToggle() {
  const { state } = useSidebar();
  const label = state === "collapsed" ? "Expand sidebar" : "Collapse sidebar";

  return (
    <SidebarTrigger
      aria-label={label}
      className="ml-auto group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:self-start"
    />
  );
}

interface OrganizationNavigationProps {
  activeItem: string;
  onItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function OrganizationNavigation({
  activeItem,
  onItemClick,
}: OrganizationNavigationProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  data-navigation-label={item.label}
                  isActive={activeItem === item.label}
                  onClick={onItemClick}
                  tooltip={item.label}
                >
                  <Icon />
                  <span>{item.label}</span>
                  {item.status ? (
                    <span className="ml-auto size-2 rounded-full bg-chart-2 group-data-[collapsible=icon]:hidden" />
                  ) : null}
                  {item.children ? (
                    <ChevronDownIcon className="ml-auto" />
                  ) : null}
                  {item.label === "Subscriptions" ? (
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

function OrganizationMenu({ defaultOpen }: { defaultOpen: boolean }) {
  const { isMobile, state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu defaultOpen={defaultOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              aria-label="Switch organization"
              size="lg"
              tooltip="Switch organization"
              variant="outline"
            >
              <OrganizationMark />
              <span className="flex-1 font-medium group-data-[collapsible=icon]:hidden">
                Vercel
              </span>
              <EllipsisVerticalIcon className="ml-auto group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-64"
            side={isMobile || collapsed ? "right" : "top"}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <OrganizationMark />
                <span className="flex-1">Vercel</span>
                <CheckIcon />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Avatar size="sm">
                  <AvatarFallback>O</AvatarFallback>
                </Avatar>
                OpenAI
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Avatar size="sm">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                Claude
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>New Organization</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export interface AppShell2Props {
  children?: ReactNode;
  defaultCollapsed?: boolean;
  defaultOrganizationMenuOpen?: boolean;
}

export function AppShell2({
  children,
  defaultCollapsed = false,
  defaultOrganizationMenuOpen = false,
}: AppShell2Props) {
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
      <SidebarProvider
        defaultOpen={!defaultCollapsed}
        style={organizationSidebarStyle}
      >
        <Sidebar
          className="[&>[data-sidebar=sidebar]]:rounded-lg [&>[data-sidebar=sidebar]]:ring-1 [&>[data-sidebar=sidebar]]:ring-sidebar-border"
          collapsible="icon"
          variant="inset"
        >
          <SidebarHeader>
            <div className="flex items-center gap-1 group-data-[collapsible=icon]:flex-col">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg">
                    <ProductMark />
                    <span className="flex-1 font-semibold group-data-[collapsible=icon]:hidden">
                      ReUI
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarToggle />
            </div>
            <div className="relative group-data-[collapsible=icon]:hidden">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <SidebarInput
                aria-label="Search navigation"
                className="px-8"
                placeholder="Search..."
              />
              <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                ⌘K
              </kbd>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <OrganizationNavigation
              activeItem={activeItem}
              onItemClick={handleItemClick}
            />
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              {footerNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton tooltip={item.label}>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
            <SidebarSeparator />
            <OrganizationMenu defaultOpen={defaultOrganizationMenuOpen} />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="gap-4 p-3">
          <header className="flex min-h-8 items-center gap-2 text-sm">
            <SidebarTrigger aria-label="Open sidebar" className="md:hidden" />
            <OrganizationMark />
            <span className="text-muted-foreground">Workspace</span>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
            <Avatar size="sm">
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">@shadcn</span>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
            <span>Projects</span>
          </header>

          {children ? (
            children
          ) : (
            <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] gap-4">
              <section
                aria-label="Project summary"
                className="grid min-h-56 gap-4 md:grid-cols-3"
              >
                {["Projects", "Deployments", "Usage"].map((label) => (
                  <div
                    className="rounded-xl border border-dashed bg-card"
                    key={label}
                  >
                    <span className="sr-only">{label}</span>
                  </div>
                ))}
              </section>
              <section
                aria-label="Project workspace"
                className="min-h-96 rounded-xl border border-dashed bg-card"
              />
            </div>
          )}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
