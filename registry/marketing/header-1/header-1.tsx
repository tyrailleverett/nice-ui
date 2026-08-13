import { useState, type ReactNode } from "react"
import { MenuIcon, XIcon } from "lucide-react"

import { Portal, PortalBackdrop } from "@/components/portal"
import { Button } from "@/components/ui/button"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"

export type Header1NavLink = {
  href: string
  label: string
}

export type Header1Cta = {
  label: string
  href?: string
}

export type Header1Props = {
  logo?: ReactNode
  logoHref?: string
  navLinks: Header1NavLink[]
  signIn?: Header1Cta
  getStarted?: Header1Cta
  className?: string
}

function HeaderCta({
  cta,
  size,
  variant,
  className,
}: {
  cta: Header1Cta
  size?: "sm"
  variant?: "outline"
  className?: string
}) {
  return (
    <Button
      asChild={Boolean(cta.href)}
      className={className}
      size={size}
      variant={variant}
    >
      {cta.href ? <a href={cta.href}>{cta.label}</a> : cta.label}
    </Button>
  )
}

function MobileNav({
  navLinks,
  signIn,
  getStarted,
}: {
  navLinks: Header1NavLink[]
  signIn: Header1Cta
  getStarted: Header1Cta
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? <XIcon className="size-4.5" /> : <MenuIcon className="size-4.5" />}
      </Button>
      {open ? (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4"
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Button
                  asChild
                  className="justify-start"
                  key={link.label}
                  variant="ghost"
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              <HeaderCta className="w-full" cta={signIn} variant="outline" />
              <HeaderCta className="w-full" cta={getStarted} />
            </div>
          </div>
        </Portal>
      ) : null}
    </div>
  )
}

export function Header1({
  logo,
  logoHref = "#",
  navLinks,
  signIn = { label: "Sign In" },
  getStarted = { label: "Get Started" },
  className,
}: Header1Props) {
  const scrolled = useScroll(10)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
            scrolled,
        },
        className
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          }
        )}
      >
        <a
          className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
          href={logoHref}
        >
          {logo ?? (
            <span className="font-heading h-4 text-sm font-semibold tracking-tight">
              Nice UI
            </span>
          )}
        </a>
        <div className="hidden items-center gap-2 md:flex">
          <div>
            {navLinks.map((link) => (
              <Button asChild key={link.label} size="sm" variant="ghost">
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>
          <HeaderCta cta={signIn} size="sm" variant="outline" />
          <HeaderCta cta={getStarted} size="sm" />
        </div>
        <MobileNav
          getStarted={getStarted}
          navLinks={navLinks}
          signIn={signIn}
        />
      </nav>
    </header>
  )
}
