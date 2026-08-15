import type { ComponentProps, ReactNode } from "react";

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

export interface Footer1NavLink {
  href: string;
  label: string;
}

export interface Footer1SocialLink {
  href: string;
  icon: ReactNode;
  label: string;
}

export interface Footer1BuiltBy {
  href: string;
  imageAlt?: string;
  imageSrc?: string;
  name: string;
}

export interface Footer1Props {
  builtBy?: Footer1BuiltBy;
  className?: string;
  copyright?: string;
  logo?: ReactNode;
  navLinks: Footer1NavLink[];
  socialLinks?: Footer1SocialLink[];
}

export function Footer1({
  logo,
  navLinks,
  socialLinks,
  copyright = "Nice UI",
  builtBy,
  className,
}: Footer1Props) {
  return (
    <footer className={cn("mx-auto max-w-5xl *:px-4 *:md:px-6", className)}>
      <div className="flex flex-col gap-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logo ?? (
              <span className="h-4.5 font-heading font-semibold text-sm tracking-tight">
                Nice UI
              </span>
            )}
          </div>
          {socialLinks?.length ? (
            <div className="flex items-center">
              {socialLinks.map(({ href, label, icon }) => (
                <Button asChild key={label} size="icon" variant="ghost">
                  <a aria-label={label} href={href}>
                    {icon}
                  </a>
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        <nav>
          <ul className="flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a className="hover:text-foreground" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-between gap-4 border-t py-4 text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} {copyright}
        </p>

        {builtBy ? (
          <p className="inline-flex items-center gap-1">
            <span>Built by</span>
            <a
              aria-label={builtBy.name}
              className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
              href={builtBy.href}
              rel="noreferrer"
              target="_blank"
            >
              {builtBy.imageSrc ? (
                <img
                  alt={builtBy.imageAlt ?? builtBy.name}
                  className="size-4 rounded-full"
                  height={16}
                  src={builtBy.imageSrc}
                  width={16}
                />
              ) : null}
              {builtBy.name}
            </a>
          </p>
        ) : null}
      </div>
    </footer>
  );
}
