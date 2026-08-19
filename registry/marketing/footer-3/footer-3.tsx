import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export function FacebookIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <title>Facebook</title>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

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

export interface Footer3Link {
  href: string;
  title: string;
}

export interface Footer3Social {
  href: string;
  icon?: ReactNode;
  title: string;
}

export interface Footer3Column {
  links: Footer3Link[];
  social?: Footer3Social;
  title: string;
}

export interface Footer3Props {
  className?: string;
  columns: Footer3Column[];
  contact?: Footer3Link;
  copyright?: string;
}

function LinksGroup({ title, links }: { title: string; links: Footer3Link[] }) {
  return (
    <div className="p-2">
      <h3 className="mt-2 mb-3 font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <a
              className="text-muted-foreground text-sm hover:text-foreground"
              href={link.href}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialCard({
  title,
  href,
  className,
  icon,
}: ComponentProps<"a"> & {
  title: string;
  icon?: ReactNode;
}) {
  return (
    <a
      className={cn(
        "flex items-center justify-between border-y p-2 text-sm hover:bg-muted md:border-t-0 dark:hover:bg-muted/50",
        className
      )}
      href={href}
    >
      <span className="flex items-center gap-2 font-medium [&>svg]:size-3.5 [&>svg]:shrink-0">
        {icon}
        {title}
      </span>
      <ArrowRightIcon className="size-4" />
    </a>
  );
}

export function Footer3({
  columns,
  contact = { href: "#", title: "Contact" },
  copyright = "Nice UI, All rights reserved",
  className,
}: Footer3Props) {
  return (
    <MarketingSection as="footer" className={className}>
      <div className="relative px-4">
        <div className="relative grid grid-cols-1 border-x md:grid-cols-4 md:divide-x">
          {columns.map((column, index) => (
            <div key={column.title}>
              {column.social ? (
                <SocialCard
                  className={index === 0 ? "border-t-0" : undefined}
                  href={column.social.href}
                  icon={column.social.icon}
                  title={column.social.title}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className={cn(
                    "hidden border-b md:block md:min-h-9",
                    index === 0 && "border-t-0"
                  )}
                />
              )}
              <LinksGroup links={column.links} title={column.title} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center border-t p-3">
        <div className="flex flex-wrap items-center justify-center gap-3 text-muted-foreground text-xs">
          <a
            className="inline-flex items-center gap-1 hover:text-foreground"
            href={contact.href}
          >
            {contact.title}
            <ExternalLinkIcon aria-hidden="true" className="size-3.5" />
          </a>
          <span aria-hidden="true">·</span>
          <p>
            &copy; {new Date().getFullYear()} {copyright}
          </p>
        </div>
      </div>
    </MarketingSection>
  );
}
