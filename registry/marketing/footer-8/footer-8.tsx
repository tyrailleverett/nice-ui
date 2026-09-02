import { ArrowUpRightIcon } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";
import { Logo } from "../logo/logo";
export interface Footer8Link {
  href: string;
  label: string;
}
export interface Footer8Group {
  links: Footer8Link[];
  title: string;
}
export interface Footer8Props {
  className?: string;
  groups?: Footer8Group[];
  tagline?: string;
}
const defaultGroups: Footer8Group[] = [
  {
    links: ["Blocks", "Templates", "Components"].map((label) => ({
      href: "#",
      label,
    })),
    title: "Product",
  },
  {
    links: ["About", "Changelog", "Contact"].map((label) => ({
      href: "#",
      label,
    })),
    title: "Company",
  },
  {
    links: ["Documentation", "GitHub", "License"].map((label) => ({
      href: "#",
      label,
    })),
    title: "Resources",
  },
];
export function Footer8({
  groups = defaultGroups,
  tagline = "A considered starting point for the next thing you make.",
  className,
}: Footer8Props) {
  return (
    <MarketingSection className={className}>
      <footer className="space-y-12 bg-primary p-6 text-primary-foreground md:p-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-xs space-y-5">
            <Logo />
            <p className="text-primary-foreground/70 text-sm leading-6">
              {tagline}
            </p>
            <a
              className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline"
              href="/docs"
            >
              Start building{" "}
              <ArrowUpRightIcon aria-hidden="true" className="size-4" />
            </a>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3"
          >
            {groups.map((group) => (
              <div className="space-y-3" key={group.title}>
                <h2 className="font-mono text-primary-foreground/50 text-xs uppercase tracking-[0.16em]">
                  {group.title}
                </h2>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="text-primary-foreground/80 text-sm hover:text-primary-foreground hover:underline"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-primary-foreground/20 border-t pt-5 text-primary-foreground/50 text-xs sm:flex-row sm:justify-between">
          <span>© 2026 Nice UI</span>
          <span>Made for thoughtful interfaces.</span>
        </div>
      </footer>
    </MarketingSection>
  );
}
