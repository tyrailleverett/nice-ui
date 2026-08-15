import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  BoxIcon,
  ChevronDownIcon,
  ClipboardListIcon,
  EllipsisIcon,
  HeartIcon,
  HomeIcon,
  LogOutIcon,
  RefreshCwIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { cn } from "@/lib/utils";

const hatchClassName =
  "bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(120,224,206,0.12)_10px,rgba(120,224,206,0.12)_11px)]";

interface MarketLink {
  hasMenu?: boolean;
  icon: LucideIcon;
  items?: string[];
  label: string;
}

const marketNavigation: MarketLink[] = [
  { icon: BarChart3Icon, label: "Dashboard" },
  {
    hasMenu: true,
    icon: BoxIcon,
    items: ["Catalog", "Inventory", "Collections"],
    label: "Products",
  },
  {
    hasMenu: true,
    icon: ClipboardListIcon,
    items: ["Open orders", "Fulfillment", "Returns"],
    label: "Orders",
  },
  {
    hasMenu: true,
    icon: UsersIcon,
    items: ["Accounts", "Segments", "Reviews"],
    label: "Customers",
  },
  {
    hasMenu: true,
    icon: EllipsisIcon,
    items: ["Discounts", "Shipping", "Taxes"],
    label: "More",
  },
];

const earningStats = [
  { label: "Sales", value: "$23k" },
  { label: "Customers", value: "8.51k" },
  { label: "Products", value: "2.5k" },
  { label: "Revenue", value: "1.2k" },
] as const;

function LumenMark() {
  return (
    <span className="grid size-8 place-items-center rounded-full bg-foreground font-heading text-background">
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
      aria-label="Lumen workspace"
      className={cn(
        "min-h-112 flex-1 rounded-t-[1.25rem] border border-[#26465f] border-b-0 bg-[#10283d] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        hatchClassName
      )}
    />
  );
}

function MarketNav({
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
      {marketNavigation.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.label;

        if (item.hasMenu && item.items) {
          return (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-current={isActive ? "page" : undefined}
                  data-navigation-label={item.label}
                  onClick={onItemClick}
                  variant={isActive ? "secondary" : "ghost"}
                >
                  <Icon data-icon="inline-start" />
                  {item.label}
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
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
      <DropdownMenuTrigger asChild>
        <Button aria-label="Open account menu" size="icon" variant="ghost">
          <Avatar size="sm">
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Ada Moreau</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SettingsIcon />
            Account
          </DropdownMenuItem>
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

export interface AppShell9Props {
  children?: ReactNode;
  defaultUserMenuOpen?: boolean;
}

export function AppShell9({
  children,
  defaultUserMenuOpen = false,
}: AppShell9Props) {
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
    <div className="flex min-h-svh flex-col bg-[#0d2235] text-[#f3f8fb]">
      <header className="border-[#d6e2ea] border-b bg-[#f7fafc] text-[#10283d]">
        <div className="flex min-h-16 flex-wrap items-center gap-3 px-4 py-2.5">
          <a className="flex items-center gap-2 font-semibold" href="#lumen">
            <LumenMark />
            Lumen
          </a>

          <MarketNav
            activeItem={activeItem}
            className="flex-wrap"
            onItemClick={handleItemClick}
          />

          <div className="ml-auto flex items-center gap-1">
            <Button aria-label="Saved items" size="icon" variant="ghost">
              <HeartIcon />
            </Button>
            <Button aria-label="Cart" size="icon" variant="ghost">
              <ShoppingCartIcon />
            </Button>
            <AccountMenu defaultOpen={defaultUserMenuOpen} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col bg-[#0d2235] text-[#f3f8fb]">
        <div className="flex flex-col gap-6 px-6 pt-5">
          <Breadcrumb>
            <BreadcrumbList className="text-primary-foreground/70">
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="inline-flex items-center gap-1.5 hover:text-primary-foreground"
                  href="#home"
                >
                  <HomeIcon className="size-3.5" />
                  <span className="sr-only">Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="hover:text-primary-foreground"
                  href="#dashboards"
                >
                  Dashboards
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground">
                  Lumen
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-primary-foreground text-primary">
                <RefreshCwIcon />
              </span>
              <div className="flex flex-col">
                <h1 className="font-heading font-semibold text-title">
                  Market Dashboard
                </h1>
                <p className="text-primary-foreground/70 text-sm">
                  Earning reports
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {earningStats.map((stat) => (
                <div className="flex flex-col gap-1" key={stat.label}>
                  <dt className="order-2 text-primary-foreground/70 text-sm">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-heading font-semibold text-title">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-6 flex flex-1 flex-col px-4">
          <WorkspaceCanvas>{children}</WorkspaceCanvas>
        </div>
      </div>
    </div>
  );
}
