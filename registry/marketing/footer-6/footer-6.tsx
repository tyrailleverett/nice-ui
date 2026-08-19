import { ExternalLinkIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";

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
  contact?: Footer6Link;
  copyright?: string;
  groups: Footer6LinkGroup[];
  legalLinks?: Footer6Link[];
  socialLinks?: Footer6SocialLink[];
  statusLabel?: string;
}

export function Footer6({
  groups,
  socialLinks,
  contact = { href: "#", label: "Contact" },
  legalLinks = [
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
  ],
  copyright = `© ${new Date().getFullYear()} Nice UI. All rights reserved.`,
  statusLabel = "All Systems Normal",
  className,
}: Footer6Props) {
  return (
    <MarketingSection as="footer" className={className}>
      <div className="p-3 sm:p-4">
        <div className="overflow-hidden rounded-[2rem] border px-6 pt-8 sm:px-10 sm:pt-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
              {groups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-4 font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
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
                    className="rounded-md"
                    key={item.label}
                    nativeButton={false}
                    render={<a aria-label={item.label} href={item.href} />}
                    size="icon"
                    variant="outline"
                  >
                    {item.icon}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>

          <div
            aria-hidden="true"
            className="mt-10 -mb-3 aspect-[5/1] w-full"
            data-slot="footer-watermark-space"
          />

          <div className="flex flex-col gap-3 border-t pt-5 pb-6 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between sm:pb-8">
            <div className="flex flex-wrap items-center gap-4">
              <span>{copyright}</span>
              <a
                className="inline-flex items-center gap-1 hover:text-foreground"
                href={contact.href}
              >
                {contact.label}
                <ExternalLinkIcon aria-hidden="true" className="size-3.5" />
              </a>
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
      </div>
    </MarketingSection>
  );
}
