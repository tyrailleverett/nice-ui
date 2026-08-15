import type { LucideIcon } from "lucide-react";
import {
  ActivityIcon,
  BellIcon,
  CalendarDaysIcon,
  CarFrontIcon,
  CarIcon,
  ChevronsUpDownIcon,
  CircleUserRoundIcon,
  GaugeIcon,
  LanguagesIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  WrenchIcon,
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const hatchClassName =
  "bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(194,112,38,0.12)_10px,rgba(194,112,38,0.12)_11px)]";

const serviceNavigation: Array<{ icon: LucideIcon; label: string }> = [
  { icon: GaugeIcon, label: "Dashboard" },
  { icon: CalendarDaysIcon, label: "Booking" },
  { icon: CarFrontIcon, label: "Buy Cars" },
  { icon: CarIcon, label: "Sell Cars" },
  { icon: WrenchIcon, label: "Services" },
  { icon: SettingsIcon, label: "Settings" },
];

function KilnMark() {
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
      aria-label="Kiln workspace"
      className={cn(
        "min-h-112 flex-1 rounded-[1.1rem] border border-[#e5d8c5] bg-[#fbf8f2] shadow-[0_12px_30px_-24px_rgba(122,74,25,0.6)]",
        hatchClassName
      )}
    />
  );
}

function ServiceNav({
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
      {serviceNavigation.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.label;

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

function UserMenu({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Open user menu"
            className="h-10 gap-2 px-1.5"
            variant="ghost"
          />
        }
      >
        <Avatar className="rounded-md after:rounded-md">
          <AvatarFallback className="rounded-md">JH</AvatarFallback>
        </Avatar>
        <span className="flex flex-col items-start">
          <span className="font-medium leading-none">June Hart</span>
          <span className="text-muted-foreground text-xs">Floor lead</span>
        </span>
        <ChevronsUpDownIcon data-icon="inline-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>June Hart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CircleUserRoundIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Shop preferences
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

export interface AppShell8Props {
  children?: ReactNode;
  defaultUserMenuOpen?: boolean;
}

export function AppShell8({
  children,
  defaultUserMenuOpen = false,
}: AppShell8Props) {
  const [activeItem, setActiveItem] = useState("Booking");

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
    <div className="flex min-h-svh flex-col bg-[#f4f1ea] text-[#282522]">
      <header className="border-[#e5d8c5] border-b bg-[#fbf8f2]">
        <div className="grid items-center gap-3 border-[#c27026] border-t-2 px-4 py-3 md:grid-cols-[1fr_minmax(12rem,28rem)_1fr]">
          <a className="flex items-center gap-2 font-semibold" href="#kiln">
            <KilnMark />
            Kiln Coachworks
          </a>

          <InputGroup className="h-9 border-[#e5d8c5] bg-[#f1ece3] shadow-none">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              aria-label="Search services"
              placeholder="Search Services..."
              type="search"
            />
          </InputGroup>

          <div className="flex items-center justify-end gap-1">
            <Button aria-label="Language" size="icon" variant="ghost">
              <LanguagesIcon />
            </Button>
            <Button aria-label="Bay activity" size="icon" variant="ghost">
              <ActivityIcon />
            </Button>
            <Button
              aria-label="Notifications"
              className="relative"
              size="icon"
              variant="ghost"
            >
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
            </Button>
            <UserMenu defaultOpen={defaultUserMenuOpen} />
          </div>
        </div>

        <div className="bg-[#f4f1ea] px-4 pb-2">
          <ServiceNav activeItem={activeItem} onItemClick={handleItemClick} />
        </div>

        <Separator />

        <div className="flex flex-col gap-3 border-[#e5d8c5] border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#cars">Cars</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Book Car</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline">
              <CarFrontIcon data-icon="inline-start" />
              Buy Cars
            </Button>
            <Button>
              <CalendarDaysIcon data-icon="inline-start" />
              Book Appointment
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col bg-[#eee9df] p-4">
        <WorkspaceCanvas>{children}</WorkspaceCanvas>
      </div>
    </div>
  );
}
