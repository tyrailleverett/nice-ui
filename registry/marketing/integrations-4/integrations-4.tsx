import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export interface Integrations4Logo {
  alt: string;
  isInvertable?: boolean;
  src: string;
}

export interface Integrations4Tile {
  col: number;
  logo?: Integrations4Logo;
  row: number;
}

export interface Integrations4Props {
  className?: string;
  description?: string;
  tiles?: Integrations4Tile[];
  title?: string;
}

const defaultTiles: Integrations4Tile[] = [
  { col: 1, row: 0 },
  {
    col: 3,
    logo: {
      alt: "Notion",
      src: "https://svgl.app/library/notion.svg",
    },
    row: 0,
  },
  { col: 0, row: 1 },
  {
    col: 2,
    logo: {
      alt: "Cursor",
      isInvertable: true,
      src: "https://svgl.app/library/cursor_light.svg",
    },
    row: 1,
  },
  {
    col: 4,
    logo: {
      alt: "Vercel",
      isInvertable: true,
      src: "https://svgl.app/library/vercel.svg",
    },
    row: 1,
  },
  {
    col: 1,
    logo: {
      alt: "PlanetScale",
      isInvertable: true,
      src: "https://svgl.app/library/planetscale.svg",
    },
    row: 2,
  },
  {
    col: 3,
    logo: {
      alt: "Gmail",
      src: "https://svgl.app/library/gmail.svg",
    },
    row: 2,
  },
  { col: 0, row: 3 },
  {
    col: 2,
    logo: {
      alt: "Supabase",
      src: "https://svgl.app/library/supabase.svg",
    },
    row: 3,
  },
  {
    col: 4,
    logo: {
      alt: "Canva",
      src: "https://svgl.app/library/canva.svg",
    },
    row: 3,
  },
  {
    col: 1,
    logo: {
      alt: "Adobe",
      src: "https://svgl.app/library/adobe.svg",
    },
    row: 4,
  },
  {
    col: 3,
    logo: {
      alt: "Polar",
      src: "https://svgl.app/library/polar-sh_light.svg",
    },
    row: 4,
  },
];

export function Integrations4({
  title = "Works with the tools you already open",
  description = "Ship Nice UI next to the editors, databases, and inboxes your team already lives in.",
  tiles = defaultTiles,
  className,
}: Integrations4Props) {
  return (
    <MarketingSection className={className}>
      <section className="grid grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center">
        <div className="max-w-xl space-y-5">
          <h2 className="font-display-heading text-3xl text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="text-lg text-muted-foreground leading-8">
              {description}
            </p>
          ) : null}
        </div>

        <div className="place-items-end">
          <div className="mask-[radial-gradient(ellipse_at_center,black,black,transparent)] relative size-90">
            {tiles.map((tile) => (
              <IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
            ))}
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}

function IntegrationCard({ row, col, logo }: Integrations4Tile) {
  return (
    <div
      className={cn(
        "absolute flex size-18 items-center justify-center rounded-md border",
        logo
          ? "bg-card shadow-xs dark:bg-card/60"
          : "bg-secondary/30 dark:bg-background"
      )}
      style={{
        left: col * 72,
        top: row * 72,
      }}
    >
      {logo ? (
        <img
          alt={logo.alt}
          className={cn(
            "pointer-events-none size-8 select-none object-contain p-1",
            logo.isInvertable && "dark:invert"
          )}
          height={40}
          src={logo.src}
          width={40}
        />
      ) : null}
    </div>
  );
}
