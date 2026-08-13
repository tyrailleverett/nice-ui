import type { ComponentProps, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { AppStoreBadge } from "./app-store-badge"
import { GooglePlayBadge } from "./google-play-badge"

export { AppStoreBadge } from "./app-store-badge"
export { GooglePlayBadge } from "./google-play-badge"

export function FacebookIcon(props: ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

export function InstagramIcon(props: ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export function LinkedinIcon(props: ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function XIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
    </svg>
  )
}

export type Footer4Link = {
  href: string
  label: string
}

export type Footer4LinkGroup = {
  title: string
  links: Footer4Link[]
}

export type Footer4SocialLink = {
  href: string
  label: string
  icon: ReactNode
}

export type Footer4Props = {
  groups: Footer4LinkGroup[]
  socialLinks?: Footer4SocialLink[]
  appStoreHref?: string
  googlePlayHref?: string
  copyright?: string
  className?: string
}

export function Footer4({
  groups,
  socialLinks,
  appStoreHref = "#",
  googlePlayHref = "#",
  copyright = "Nice UI, All rights reserved",
  className,
}: Footer4Props) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4">
          {groups.map((item) => (
            <div key={item.title}>
              <h3 className="mb-4 text-xs">{item.title}</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {item.links.map((link) => (
                  <li key={link.label}>
                    <a className="hover:text-foreground" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="h-px bg-border" />
        <div className="flex flex-wrap items-center justify-between gap-4 py-5">
          {socialLinks?.length ? (
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon, href, label }) => (
                <Button asChild key={label} size="icon" variant="outline">
                  <a aria-label={label} href={href}>
                    {icon}
                  </a>
                </Button>
              ))}
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <GooglePlayBadge href={googlePlayHref} />
            <AppStoreBadge href={appStoreHref} />
          </div>
        </div>
        <div className="h-px bg-border" />
        <div className="py-4 text-center text-muted-foreground text-xs">
          <p>
            &copy; {new Date().getFullYear()} {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
