import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LinkedinIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image
        height="100%"
        href="https://svgl.app/library/linkedin.svg"
        width="100%"
      />
    </svg>
  );
}

export function XIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image height="100%" href="https://svgl.app/library/x.svg" width="100%" />
    </svg>
  );
}

export function DiscordIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image
        height="100%"
        href="https://svgl.app/library/discord.svg"
        width="100%"
      />
    </svg>
  );
}

export function YoutubeIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <title>YouTube</title>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export interface Footer6Link {
  href: string;
  label: string;
}

export interface Footer6LinkGroup {
  links: Footer6Link[];
  title: string;
}

export interface Footer6SocialLink {
  href: string;
  icon: ReactNode;
  label: string;
}

export interface Footer6Props {
  className?: string;
  copyright?: string;
  groups: Footer6LinkGroup[];
  legalLinks?: Footer6Link[];
  socialLinks?: Footer6SocialLink[];
  statusLabel?: string;
  watermark?: ReactNode;
  watermarkText?: string;
}

function FooterWatermark({ text }: { text: string }) {
  return (
    <div
      aria-hidden="true"
      className="mask-[linear-gradient(to_bottom,black_6%,black_34%,transparent_80%)] pointer-events-none relative -mx-6 w-[calc(100%+3rem)] overflow-hidden sm:-mx-10 sm:w-[calc(100%+5rem)]"
    >
      <svg
        aria-hidden="true"
        className="block h-auto w-full text-foreground/30"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1200 240"
      >
        <title>{text}</title>
        <text
          fill="none"
          lengthAdjust="spacingAndGlyphs"
          stroke="currentColor"
          strokeWidth="3.5"
          style={{
            fontFamily: "var(--font-sans)",
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
  );
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
                <h3 className="mb-4 font-medium text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="text-foreground text-sm hover:text-muted-foreground"
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
              <a
                className="hover:text-foreground"
                href={link.href}
                key={link.label}
              >
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
  );
}
