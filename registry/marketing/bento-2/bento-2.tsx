import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export interface Bento2Tile {
  description: string;
  href?: string;
  label: string;
  title: string;
}

export interface Bento2Props {
  className?: string;
  description?: string;
  lead?: Bento2Tile;
  secondary?: Bento2Tile[];
  title?: string;
}

const defaultLead: Bento2Tile = {
  description:
    "Drop a hero, a feature band, and a footer. They already share Inter, hairlines, and the same 12px radius ladder.",
  href: "#",
  label: "Start with a hero",
  title: "Ship the page, not the design system",
};

const defaultSecondary: Bento2Tile[] = [
  {
    description: "White canvas, near-black CTAs, no second display face.",
    href: "#",
    label: "See the tokens",
    title: "Editorial, not gray-card SaaS",
  },
  {
    description:
      "The same ink inverts in dark mode. Screenshots ship in pairs.",
    href: "#",
    label: "Preview dark",
    title: "Dark is a theme, not a footer",
  },
];

function TileLink({ children, href }: { children: ReactNode; href?: string }) {
  if (!href) {
    return null;
  }

  return (
    <a
      className="mt-auto inline-flex items-center gap-1 text-foreground text-sm"
      href={href}
    >
      {children}
      <ArrowUpRightIcon className="size-4" />
    </a>
  );
}

export function Bento2({
  title = "Build the marketing site from blocks you already trust",
  description = "A wide lead tile and two stacked asides — the layout for a product story that needs room to breathe.",
  lead = defaultLead,
  secondary = defaultSecondary,
  className,
}: Bento2Props) {
  return (
    <MarketingSection className={className}>
      <section className="bg-background py-16 text-foreground md:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-display-heading text-3xl sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-pretty text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>

          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-xl border border-border md:grid-cols-3">
            <article className="flex flex-col gap-4 border-b bg-card p-8 md:col-span-2 md:border-r md:border-b-0 md:p-10">
              <h3 className="font-heading font-semibold text-title">
                {lead.title}
              </h3>
              <p className="max-w-md text-muted-foreground text-sm">
                {lead.description}
              </p>
              <TileLink href={lead.href}>{lead.label}</TileLink>
            </article>

            <div className="grid grid-cols-1">
              {secondary.map((tile, index) => (
                <article
                  className={cn(
                    "flex flex-col gap-3 bg-card p-8",
                    index === 0 ? "border-b" : null
                  )}
                  key={tile.title}
                >
                  <h3 className="font-heading font-semibold text-title-md">
                    {tile.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {tile.description}
                  </p>
                  <TileLink href={tile.href}>{tile.label}</TileLink>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
