import { MenuIcon, XIcon } from "lucide-react";
import {
  type ComponentProps,
  type ReactNode,
  useCallback,
  useState,
} from "react";

import { Portal, PortalBackdrop } from "@/components/portal";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export interface Header2LinkItem {
  description?: string;
  href: string;
  icon: ReactNode;
  label: string;
}

export interface Header2Cta {
  href?: string;
  label: string;
}

export interface Header2NavLink {
  href: string;
  label: string;
}

export interface Header2Props {
  className?: string;
  companyLabel?: string;
  companyLinks: Header2LinkItem[];
  companyLinks2: Header2LinkItem[];
  demo?: Header2NavLink;
  getStarted?: Header2Cta;
  logo?: ReactNode;
  logoHref?: string;
  pricing?: Header2NavLink;
  productLabel?: string;
  productLinks: Header2LinkItem[];
  signIn?: Header2Cta;
}

export function LinkItem({
  label,
  description,
  icon,
  className,
  href,
  ...props
}: ComponentProps<"a"> & Header2LinkItem) {
  return (
    <a
      className={cn("flex items-center gap-x-2", className)}
      href={href}
      {...props}
    >
      <div
        className={cn(
          "flex aspect-square size-12 items-center justify-center rounded-md border bg-card text-sm shadow-sm",
          "[&_svg:not([class*='size-'])]:size-5 [&_svg:not([class*='size-'])]:text-foreground"
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="font-medium">{label}</span>
        {description ? (
          <span className="line-clamp-2 text-muted-foreground text-xs">
            {description}
          </span>
        ) : null}
      </div>
    </a>
  );
}

function HeaderCta({
  cta,
  variant,
  className,
}: {
  cta: Header2Cta;
  variant?: "outline";
  className?: string;
}) {
  return (
    <Button asChild={Boolean(cta.href)} className={className} variant={variant}>
      {cta.href ? <a href={cta.href}>{cta.label}</a> : cta.label}
    </Button>
  );
}

function DesktopNav({
  productLabel,
  companyLabel,
  productLinks,
  companyLinks,
  companyLinks2,
  pricing,
  demo,
}: {
  productLabel: string;
  companyLabel: string;
  productLinks: Header2LinkItem[];
  companyLinks: Header2LinkItem[];
  companyLinks2: Header2LinkItem[];
  pricing?: Header2NavLink;
  demo?: Header2NavLink;
}) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem className="bg-transparent">
          <NavigationMenuTrigger className="bg-transparent">
            {productLabel}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 dark:bg-background">
            <div className="grid w-lg grid-cols-2 gap-2 rounded-lg border bg-popover p-2 shadow">
              {productLinks.map((item) => (
                <NavigationMenuLink asChild key={item.label}>
                  <LinkItem {...item} />
                </NavigationMenuLink>
              ))}
            </div>
            {demo ? (
              <div className="p-2">
                <p className="text-muted-foreground text-sm">
                  Interested?{" "}
                  <a
                    className="font-medium text-foreground hover:underline"
                    href={demo.href}
                  >
                    {demo.label}
                  </a>
                </p>
              </div>
            ) : null}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {companyLabel}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 pb-1.5 dark:bg-background">
            <div className="grid w-lg grid-cols-2 gap-2">
              <div className="space-y-2 rounded-lg border bg-popover p-2 shadow">
                {companyLinks.map((item) => (
                  <NavigationMenuLink asChild key={item.label}>
                    <LinkItem {...item} />
                  </NavigationMenuLink>
                ))}
              </div>
              <div className="space-y-2 p-3">
                {companyLinks2.map((item) => (
                  <NavigationMenuLink href={item.href} key={item.label}>
                    {item.icon}
                    {item.label}
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {pricing ? (
          <NavigationMenuLink asChild className="px-4">
            <a className="rounded-md p-2 hover:bg-accent" href={pricing.href}>
              {pricing.label}
            </a>
          </NavigationMenuLink>
        ) : null}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav({
  productLabel,
  companyLabel,
  productLinks,
  companyLinks,
  companyLinks2,
  signIn,
  getStarted,
}: {
  productLabel: string;
  companyLabel: string;
  productLinks: Header2LinkItem[];
  companyLinks: Header2LinkItem[];
  companyLinks2: Header2LinkItem[];
  signIn: Header2Cta;
  getStarted: Header2Cta;
}) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="relative md:hidden"
        onClick={toggleOpen}
        size="icon"
        variant="outline"
      >
        <XIcon
          className={cn(
            "transition-all",
            open ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />
        <MenuIcon
          className={cn(
            "absolute transition-all",
            open ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        />
      </Button>
      {open ? (
        <Portal className="top-14">
          <PortalBackdrop />
          <div
            className={cn(
              "size-full overflow-y-auto p-4",
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in"
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="flex w-full flex-col gap-y-2">
              <span className="text-sm">{productLabel}</span>
              {productLinks.map((link) => (
                <LinkItem
                  className="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50"
                  key={`product-${link.label}`}
                  {...link}
                />
              ))}
              <span className="text-sm">{companyLabel}</span>
              {companyLinks.map((link) => (
                <LinkItem
                  className="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50"
                  key={`company-${link.label}`}
                  {...link}
                />
              ))}
              {companyLinks2.map((link) => (
                <LinkItem
                  className="rounded-lg p-2 active:bg-muted dark:active:bg-muted/50"
                  key={`company-extra-${link.label}`}
                  {...link}
                />
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <HeaderCta className="w-full" cta={signIn} variant="outline" />
              <HeaderCta className="w-full" cta={getStarted} />
            </div>
          </div>
        </Portal>
      ) : null}
    </div>
  );
}

export function Header2({
  logo,
  logoHref = "#",
  productLabel = "Product",
  companyLabel = "Company",
  productLinks,
  companyLinks,
  companyLinks2,
  pricing,
  demo,
  signIn = { label: "Sign In" },
  getStarted = { label: "Get Started" },
  className,
}: Header2Props) {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-transparent border-b",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
            scrolled,
        },
        className
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-5">
          <a
            className="rounded-lg px-3 py-2.5 hover:bg-muted dark:hover:bg-muted/50"
            href={logoHref}
          >
            {logo ?? (
              <span className="h-4 font-heading font-semibold text-sm tracking-tight">
                Nice UI
              </span>
            )}
          </a>
          <DesktopNav
            companyLabel={companyLabel}
            companyLinks={companyLinks}
            companyLinks2={companyLinks2}
            demo={demo}
            pricing={pricing}
            productLabel={productLabel}
            productLinks={productLinks}
          />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <HeaderCta cta={signIn} variant="outline" />
          <HeaderCta cta={getStarted} />
        </div>
        <MobileNav
          companyLabel={companyLabel}
          companyLinks={companyLinks}
          companyLinks2={companyLinks2}
          getStarted={getStarted}
          productLabel={productLabel}
          productLinks={productLinks}
          signIn={signIn}
        />
      </nav>
    </header>
  );
}
