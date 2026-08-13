import type { ComponentProps, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LinkedinIcon(props: ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function XIcon(props: ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
    </svg>
  )
}

export function DiscordIcon(props: ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export function YoutubeIcon(props: ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export type Footer6Link = {
  href: string
  label: string
}

export type Footer6LinkGroup = {
  title: string
  links: Footer6Link[]
}

export type Footer6SocialLink = {
  href: string
  label: string
  icon: ReactNode
}

export type Footer6Props = {
  groups: Footer6LinkGroup[]
  socialLinks?: Footer6SocialLink[]
  watermark?: ReactNode
  watermarkText?: string
  legalLinks?: Footer6Link[]
  copyright?: string
  statusLabel?: string
  className?: string
}

function FooterWatermark({ text }: { text: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative -mx-6 w-[calc(100%+3rem)] overflow-hidden sm:-mx-10 sm:w-[calc(100%+5rem)] mask-[linear-gradient(to_bottom,black_6%,black_34%,transparent_80%)]"
    >
      <svg
        className="block h-auto w-full text-foreground/30"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1200 240"
      >
        <text
          fill="none"
          lengthAdjust="spacingAndGlyphs"
          stroke="currentColor"
          strokeWidth="3.5"
          style={{
            fontFamily: "var(--font-heading), var(--font-sans), sans-serif",
            fontSize: 210,
            fontWeight: 600,
          }}
          textLength="1152"
          x="24"
          y="198"
        >
          {text}
        </text>
      </svg>
    </div>
  )
}

export function Footer6({
  groups,
  socialLinks,
  watermark,
  watermarkText = "Nice UI",
  legalLinks = [
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
  ],
  copyright = `© ${new Date().getFullYear()} Nice UI. All rights reserved.`,
  statusLabel = "All Systems Normal",
  className,
}: Footer6Props) {
  return (
    <footer className={cn("p-3 sm:p-4", className)}>
      <div className="overflow-hidden rounded-[2rem] border px-6 pt-8 sm:px-10 sm:pt-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="text-sm text-foreground hover:text-muted-foreground"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {socialLinks?.length ? (
            <div className="flex shrink-0 items-center gap-2">
              {socialLinks.map((item) => (
                <Button
                  asChild
                  className="rounded-md"
                  key={item.label}
                  size="icon"
                  variant="outline"
                >
                  <a aria-label={item.label} href={item.href}>
                    {item.icon}
                  </a>
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10 -mb-3">
          {watermark ?? <FooterWatermark text={watermarkText} />}
        </div>

        <div className="flex flex-col gap-3 border-t pt-5 pb-6 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between sm:pb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span>{copyright}</span>
            {legalLinks.map((link) => (
              <a className="hover:text-foreground" href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
          <p className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-foreground/80" />
            {statusLabel}
          </p>
        </div>
      </div>
    </footer>
  )
}
