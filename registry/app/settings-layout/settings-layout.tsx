import type { LucideIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SettingsNavItem {
  icon?: LucideIcon;
  id: string;
  label: string;
}

interface SettingsNavigationProps {
  activeItem?: string;
  items: SettingsNavItem[];
  onItemChange?: (id: string) => void;
  orientation: "sidebar" | "tabs";
}

function SettingsNavigation({
  activeItem,
  items,
  onItemChange,
  orientation,
}: SettingsNavigationProps) {
  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { currentTarget } = event;
      const { dataset } = currentTarget;
      const { itemId } = dataset;
      if (itemId) {
        onItemChange?.(itemId);
      }
    },
    [onItemChange]
  );

  return (
    <nav
      aria-label="Settings sections"
      className={cn(
        orientation === "sidebar"
          ? "flex flex-col gap-1"
          : "flex min-w-max items-center gap-1 overflow-x-auto border-border border-b"
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeItem;

        return (
          <Button
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 justify-start font-medium text-sm",
              orientation === "sidebar"
                ? "h-10 px-3 text-muted-foreground"
                : "relative h-12 rounded-none px-3 text-muted-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-foreground after:transition-transform",
              isActive &&
                (orientation === "sidebar"
                  ? "bg-muted text-foreground ring-1 ring-foreground/10"
                  : "text-foreground after:scale-x-100")
            )}
            data-item-id={item.id}
            key={item.id}
            onClick={handleItemClick}
            variant="ghost"
          >
            {Icon ? <Icon aria-hidden="true" /> : null}
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}

export interface SettingsLayoutProps {
  activeItem?: string;
  children: ReactNode;
  className?: string;
  description?: string;
  footer?: ReactNode;
  headerActions?: ReactNode;
  navigation?: SettingsNavItem[];
  onItemChange?: (id: string) => void;
  title: string;
  variant?: "sidebar" | "tabs";
}

export function SettingsLayout({
  activeItem,
  children,
  className,
  description,
  footer,
  headerActions,
  navigation = [],
  onItemChange,
  title,
  variant = "sidebar",
}: SettingsLayoutProps) {
  const hasNavigation = navigation.length > 0;

  return (
    <section
      className={cn(
        "min-h-svh w-full bg-background px-4 py-8 text-foreground sm:px-8 sm:py-12 lg:px-12",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-heading font-semibold text-2xl tracking-tight sm:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-1.5 text-muted-foreground text-sm sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {headerActions ? (
            <div className="flex shrink-0 items-center gap-2">
              {headerActions}
            </div>
          ) : null}
        </header>

        {variant === "tabs" ? (
          <div className="mt-8">
            {hasNavigation ? (
              <SettingsNavigation
                activeItem={activeItem}
                items={navigation}
                onItemChange={onItemChange}
                orientation="tabs"
              />
            ) : null}
            <main className="mt-8">{children}</main>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
            {hasNavigation ? (
              <SettingsNavigation
                activeItem={activeItem}
                items={navigation}
                onItemChange={onItemChange}
                orientation="sidebar"
              />
            ) : null}
            <main className={cn(!hasNavigation && "lg:col-span-2")}>
              {children}
            </main>
          </div>
        )}

        {footer ? <footer className="mt-8">{footer}</footer> : null}
      </div>
    </section>
  );
}

export interface SettingsPanelProps {
  children: ReactNode;
  className?: string;
  description?: string;
  title: string;
}

export function SettingsPanel({
  children,
  className,
  description,
  title,
}: SettingsPanelProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div>
        <h2 className="font-heading font-semibold text-lg tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
        {children}
      </div>
    </section>
  );
}

export interface SettingsRowProps {
  children: ReactNode;
  className?: string;
  description?: string;
  label: string;
}

export function SettingsRow({
  children,
  className,
  description,
  label,
}: SettingsRowProps) {
  return (
    <div
      className={cn(
        "grid gap-4 border-border border-b p-5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(14rem,1fr)] sm:items-start sm:gap-8 sm:px-6",
        className
      )}
    >
      <div>
        <div className="font-medium text-sm">{label}</div>
        {description ? (
          <p className="mt-1 text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export interface SettingsModalLayoutProps
  extends Omit<SettingsLayoutProps, "className" | "footer" | "variant"> {
  className?: string;
  onClose?: () => void;
}

export function SettingsModalLayout({
  children,
  className,
  description,
  headerActions,
  navigation = [],
  onClose,
  onItemChange,
  title,
  activeItem,
}: SettingsModalLayoutProps) {
  return (
    <div className="min-h-svh w-full bg-muted/50 p-4 sm:p-8">
      <div
        aria-label={title}
        aria-modal="true"
        className={cn(
          "mx-auto flex min-h-[min(52rem,calc(100svh-2rem))] w-full max-w-6xl overflow-hidden rounded-2xl bg-card text-card-foreground shadow-2xl ring-1 ring-foreground/10",
          className
        )}
        role="dialog"
      >
        <aside className="hidden w-52 shrink-0 border-border border-r bg-muted/20 p-5 sm:block">
          <SettingsNavigation
            activeItem={activeItem}
            items={navigation}
            onItemChange={onItemChange}
            orientation="sidebar"
          />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-4 border-border border-b px-5 py-5 sm:px-8">
            <div>
              <h2 className="font-heading font-semibold text-xl tracking-tight">
                {title}
              </h2>
              {description ? (
                <p className="mt-1 text-muted-foreground text-sm">
                  {description}
                </p>
              ) : null}
            </div>
            {onClose ? (
              <Button
                aria-label="Close settings"
                onClick={onClose}
                size="icon-sm"
                variant="ghost"
              >
                <XIcon />
              </Button>
            ) : null}
          </div>
          {headerActions ? (
            <div className="flex items-center gap-2 border-border border-b px-5 py-3 sm:px-8">
              {headerActions}
            </div>
          ) : null}
          <div className="border-border border-b p-3 sm:hidden">
            <SettingsNavigation
              activeItem={activeItem}
              items={navigation}
              onItemChange={onItemChange}
              orientation="tabs"
            />
          </div>
          <main className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
