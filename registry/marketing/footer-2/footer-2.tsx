import type { ComponentProps, ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GithubIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image
        height="100%"
        href="https://svgl.app/library/github_light.svg"
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

export interface Footer2NavLink {
  href: string;
  title: string;
}

export interface Footer2SocialLink {
  href: string;
  icon: ReactNode;
  label: string;
}

export interface Footer2Props {
  className?: string;
  companyLinks: Footer2NavLink[];
  companyTitle?: string;
  copyright?: string;
  description?: string;
  logo?: ReactNode;
  logoHref?: string;
  resourceLinks: Footer2NavLink[];
  resourceTitle?: string;
  socialLinks?: Footer2SocialLink[];
}

function FullWidthDivider({ position }: { position?: "top" | "bottom" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-px w-full bg-border",
        "before:absolute before:top-0 before:right-full before:h-px before:w-screen before:bg-border",
        "after:absolute after:top-0 after:left-full after:h-px after:w-screen after:bg-border",
        position === "top" && "absolute inset-x-0 top-0",
        position === "bottom" && "absolute inset-x-0 bottom-0"
      )}
    />
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: Footer2NavLink[];
}) {
  return (
    <div className="col-span-3 w-full md:col-span-1">
      <span className="text-muted-foreground text-xs">{title}</span>
      <div className="mt-2 flex flex-col gap-2">
        {links.map(({ href, title: label }) => (
          <a className="w-max text-sm hover:underline" href={href} key={label}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Footer2({
  logo,
  logoHref = "#",
  description = "Beautify your app with Nice UI.",
  socialLinks,
  resourceTitle = "Resources",
  resourceLinks,
  companyTitle = "Company",
  companyLinks,
  copyright = "Nice UI, All rights reserved",
  className,
}: Footer2Props) {
  return (
    <MarketingSection as="footer" className={className}>
      <div className="relative">
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <a aria-label="Nice UI home" className="w-max" href={logoHref}>
              {logo ?? (
                <span className="font-heading font-semibold text-sm tracking-tight">
                  Nice UI
                </span>
              )}
            </a>
            <p className="max-w-sm text-balance text-muted-foreground text-sm">
              {description}
            </p>
            {socialLinks?.length ? (
              <div className="flex gap-2">
                {socialLinks.map((item) => (
                  <Button
                    key={item.label}
                    nativeButton={false}
                    render={
                      <a
                        aria-label={item.label}
                        href={item.href}
                        rel="noreferrer"
                        target="_blank"
                      />
                    }
                    size="icon"
                    variant="outline"
                  >
                    {item.icon}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
          <LinkColumn links={resourceLinks} title={resourceTitle} />
          <LinkColumn links={companyLinks} title={companyTitle} />
        </div>
        <FullWidthDivider />
        <div className="flex items-center justify-center gap-2 py-4">
          <p className="text-center font-light text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {copyright}
          </p>
        </div>
      </div>
    </MarketingSection>
  );
}
