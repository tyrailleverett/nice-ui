import type { ReactNode } from "react";

import { DecorIcon } from "@/components/decor-icon";
import { cn } from "@/lib/utils";

export interface Bento3Cell {
  description: string;
  title: string;
}

export interface Bento3Props {
  className?: string;
  description?: string;
  featured?: Bento3Cell;
  tiles?: Bento3Cell[];
  title?: string;
}

const defaultFeatured: Bento3Cell = {
  description:
    "Full-bleed hairlines, corner plus marks, and a framed product shot. Marketing shows the product as a photograph of the product.",
  title: "The screenshot is the voltage",
};

const defaultTiles: Bento3Cell[] = [
  {
    description: "Announcement pill, dual CTAs, faded side-rules.",
    title: "Centered hero",
  },
  {
    description: "Shared outer borders. Popular is a badge, not an invert.",
    title: "Pricing columns",
  },
  {
    description: "Light footer. Theme lives in a pill toggle, not a dark band.",
    title: "Same-canvas close",
  },
  {
    description: "Section padding 64–112px. The grid lines do the breathing.",
    title: "Quiet rhythm",
  },
];

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />
      {children}
    </div>
  );
}

export function Bento3({
  title = "Structure instead of padding",
  description = "A framed mosaic: one featured cell and four supporting tiles, held by the same hairline language as the heroes.",
  featured = defaultFeatured,
  tiles = defaultTiles,
  className,
}: Bento3Props) {
  return (
    <section
      className={cn(
        "w-full bg-background py-16 text-foreground md:py-20 lg:py-28",
        className
      )}
    >
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

        <Frame>
          <div className="mt-12 grid grid-cols-1 border-y md:grid-cols-3">
            <article className="flex flex-col justify-between gap-6 border-b p-8 md:col-span-2 md:row-span-2 md:border-r md:border-b-0 md:p-10">
              <div className="flex flex-col gap-3">
                <h3 className="font-heading font-semibold text-title">
                  {featured.title}
                </h3>
                <p className="max-w-md text-muted-foreground text-sm">
                  {featured.description}
                </p>
              </div>
              <div
                aria-hidden
                className="aspect-video w-full border border-border bg-muted"
              />
            </article>

            {tiles.map((tile, index) => (
              <article
                className={cn(
                  "flex flex-col gap-2 border-b p-6 last:border-b-0 md:border-b md:last:border-b-0",
                  index % 2 === 0 ? "md:border-r" : null
                )}
                key={tile.title}
              >
                <h3 className="font-heading font-semibold text-title-md">
                  {tile.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {tile.description}
                </p>
              </article>
            ))}
          </div>
        </Frame>
      </div>
    </section>
  );
}
