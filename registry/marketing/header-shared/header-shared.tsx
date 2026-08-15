import { MenuIcon, XIcon } from "lucide-react";
import { type ReactNode, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 50;

export interface HeaderNavLink {
  href: string;
  label: string;
}

export interface HeaderCta {
  href?: string;
  label: string;
}

export interface HeaderBlockProps {
  className?: string;
  getStarted?: HeaderCta;
  logo?: ReactNode;
  logoHref?: string;
  navLinks: HeaderNavLink[];
  signIn?: HeaderCta;
}

export function HeaderCtaButton({
  cta,
  variant,
  className,
}: {
  className?: string;
  cta: HeaderCta;
  variant?: "outline";
}) {
  if (cta.href) {
    return (
      <Button
        className={className}
        nativeButton={false}
        render={<a href={cta.href} />}
        size="sm"
        variant={variant}
      >
        {cta.label}
      </Button>
    );
  }

  return (
    <Button className={className} size="sm" variant={variant}>
      {cta.label}
    </Button>
  );
}

export function HeaderLogo({
  logo,
  logoHref,
}: {
  logo?: ReactNode;
  logoHref: string;
}) {
  return (
    <a
      aria-label="Nice UI home"
      className="flex items-center gap-2"
      href={logoHref}
    >
      {logo ?? (
        <span className="h-4 font-heading font-semibold text-sm tracking-tight">
          Nice UI
        </span>
      )}
    </a>
  );
}

export function HeaderNavLinks({
  className,
  navLinks,
  underline = "start",
}: {
  className?: string;
  navLinks: HeaderNavLink[];
  underline?: "center" | "start";
}) {
  return (
    <ul className={cn("flex gap-8 text-sm", className)}>
      {navLinks.map((item) => (
        <li key={item.label}>
          <a
            className={cn(
              "relative text-muted-foreground transition-colors duration-150 after:absolute after:bottom-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-foreground hover:after:w-full",
              underline === "center"
                ? "after:left-1/2 after:-translate-x-1/2"
                : "after:left-0"
            )}
            href={item.href}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function HeaderMenuToggle({
  menuOpen,
  onToggle,
}: {
  menuOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      aria-controls="mobile-menu"
      aria-expanded={menuOpen}
      aria-label={menuOpen ? "Close Menu" : "Open Menu"}
      className="relative z-20 lg:hidden"
      data-state={menuOpen ? "active" : "inactive"}
      onClick={onToggle}
      size="icon"
      variant="ghost"
    >
      <MenuIcon
        className="duration-200 data-[state=active]:rotate-180 data-[state=active]:scale-0 data-[state=active]:opacity-0"
        data-state={menuOpen ? "active" : "inactive"}
      />
      <XIcon
        className="absolute inset-0 m-auto -rotate-180 scale-0 opacity-0 duration-200 data-[state=active]:rotate-0 data-[state=active]:scale-100 data-[state=active]:opacity-100"
        data-state={menuOpen ? "active" : "inactive"}
      />
    </Button>
  );
}

export function HeaderActions({
  desktopNavLinks,
  getStarted,
  menuOpen,
  navLinks,
  signIn,
}: {
  desktopNavLinks?: HeaderNavLink[];
  getStarted: HeaderCta;
  menuOpen: boolean;
  navLinks: HeaderNavLink[];
  signIn: HeaderCta;
}) {
  return (
    <div
      className={cn(
        "mb-6 hidden w-full flex-wrap items-center justify-end gap-6 bg-background/95 p-6",
        "data-[state=active]:flex",
        "supports-backdrop-filter:bg-background/80 supports-backdrop-filter:backdrop-blur-xl",
        "lg:m-0 lg:flex lg:w-fit lg:bg-transparent lg:p-0 lg:supports-backdrop-filter:bg-transparent lg:supports-backdrop-filter:backdrop-blur-none"
      )}
      data-state={menuOpen ? "active" : "inactive"}
      id="mobile-menu"
    >
      <HeaderNavLinks
        className="flex-col gap-6 text-base lg:hidden"
        navLinks={navLinks}
        underline="center"
      />
      {desktopNavLinks ? (
        <HeaderNavLinks className="hidden lg:flex" navLinks={desktopNavLinks} />
      ) : null}
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <HeaderCtaButton cta={signIn} variant="outline" />
        <HeaderCtaButton cta={getStarted} />
      </div>
    </div>
  );
}

export function HeaderFrame({
  children,
  className,
  menuOpen,
}: {
  children: ReactNode;
  className?: string;
  menuOpen: boolean;
}) {
  const scrolled = useScroll(SCROLL_THRESHOLD);

  return (
    <header className={className}>
      <nav
        className="fixed z-50 w-full px-2"
        data-state={menuOpen ? "active" : "inactive"}
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            scrolled &&
              "max-w-4xl rounded-2xl border border-border/70 bg-background/90 shadow-foreground/5 shadow-lg ring-1 ring-background/80 supports-backdrop-filter:bg-background/60 supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-150 lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {children}
          </div>
        </div>
      </nav>
    </header>
  );
}

export function useHeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setMenuOpen((current) => !current);
  }, []);

  return { menuOpen, toggleMenu };
}
