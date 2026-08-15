import { FullWidthDivider } from "@/components/full-width-divider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Integrations3Logo {
  alt: string;
  src: string;
}

export interface Integrations3Tile {
  col: number;
  logo?: Integrations3Logo;
  row: number;
}

export interface Integrations3Action {
  href?: string;
  label: string;
}

export interface Integrations3Props {
  className?: string;
  cta?: Integrations3Action;
  description?: string;
  tiles?: Integrations3Tile[];
  title?: string;
}

function IntegrationsCta({ action }: { action: Integrations3Action }) {
  if (action.href) {
    return (
      <Button asChild size="sm">
        <a href={action.href}>{action.label}</a>
      </Button>
    );
  }

  return (
    <Button size="sm" type="button">
      {action.label}
    </Button>
  );
}

const defaultTiles: Integrations3Tile[] = [
  {
    col: 1,
    logo: {
      alt: "Vercel",
      src: "https://svgl.app/library/vercel.svg",
    },
    row: 0,
  },
  {
    col: 3,
    logo: {
      alt: "OpenAI",
      src: "https://svgl.app/library/openai.svg",
    },
    row: 0,
  },
  { col: 0, row: 1 },
  {
    col: 2,
    logo: {
      alt: "Cursor",
      src: "https://svgl.app/library/cursor_light.svg",
    },
    row: 1,
  },
  {
    col: 4,
    logo: {
      alt: "v0",
      src: "https://svgl.app/library/v0_light.svg",
    },
    row: 1,
  },
  {
    col: 1,
    logo: {
      alt: "PlanetScale",
      src: "https://svgl.app/library/planetscale.svg",
    },
    row: 2,
  },
  { col: 3, row: 2 },
  { col: 0, row: 3 },
  {
    col: 2,
    logo: {
      alt: "Base UI",
      src: "https://svgl.app/library/base-ui.svg",
    },
    row: 3,
  },
  {
    col: 4,
    logo: {
      alt: "Copilot",
      src: "https://svgl.app/library/copilot.svg",
    },
    row: 3,
  },
  {
    col: 1,
    logo: {
      alt: "GitHub",
      src: "https://svgl.app/library/github_light.svg",
    },
    row: 4,
  },
  {
    col: 3,
    logo: {
      alt: "Dub",
      src: "https://svgl.app/library/dub.svg",
    },
    row: 4,
  },
];

export function Integrations3({
  title = "Connect with your favorite tools",
  description = "Use Nice UI alongside the services you already deploy, from git to models to the database.",
  cta = { href: "#", label: "Explore integrations" },
  tiles = defaultTiles,
  className,
}: Integrations3Props) {
  return (
    <section
      className={cn(
        "relative mx-auto grid max-w-4xl grid-cols-1 gap-12 border-x md:grid-cols-2 md:items-center",
        className
      )}
    >
      <FullWidthDivider position="top" />

      <div className="p-4 md:p-6">
        <div className="space-y-4">
          <h2 className="font-display-heading text-3xl text-foreground sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="text-muted-foreground text-sm md:text-base">
              {description}
            </p>
          ) : null}
          {cta ? <IntegrationsCta action={cta} /> : null}
        </div>
      </div>

      <div className="place-items-end">
        <div className="relative size-80">
          <div
            className={cn(
              "absolute inset-0 size-full",
              "bg-[linear-gradient(to_right,theme(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,theme(--color-border)_1px,transparent_1px)]",
              "bg-size-[64px_64px]",
              "mask-[radial-gradient(ellipse_at_center,black,black,transparent)]"
            )}
          />
          {tiles.map((tile) => (
            <IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
          ))}
        </div>
      </div>

      <FullWidthDivider position="bottom" />
    </section>
  );
}

function IntegrationCard({ row, col, logo }: Integrations3Tile) {
  return (
    <div
      className={cn(
        "absolute flex size-16 items-center justify-center",
        logo && "bg-secondary/40"
      )}
      style={{
        left: col * 64,
        top: row * 64,
      }}
    >
      {logo ? (
        <img
          alt={logo.alt}
          className="pointer-events-none size-8 select-none object-contain p-1 dark:invert"
          height={40}
          src={logo.src}
          width={40}
        />
      ) : null}
    </div>
  );
}
