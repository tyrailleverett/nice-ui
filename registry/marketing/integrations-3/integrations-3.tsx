import { Button } from "@/components/ui/button"
import { FullWidthDivider } from "@/components/full-width-divider"
import { cn } from "@/lib/utils"

export type Integrations3Logo = {
  src: string
  alt: string
}

export type Integrations3Tile = {
  row: number
  col: number
  logo?: Integrations3Logo
}

export type Integrations3Action = {
  href?: string
  label: string
}

export type Integrations3Props = {
  title?: string
  description?: string
  cta?: Integrations3Action
  tiles?: Integrations3Tile[]
  className?: string
}

const defaultTiles: Integrations3Tile[] = [
  {
    row: 0,
    col: 1,
    logo: {
      src: "https://storage.efferd.com/logo/vercel.svg",
      alt: "Vercel",
    },
  },
  {
    row: 0,
    col: 3,
    logo: {
      src: "https://storage.efferd.com/logo/openai.svg",
      alt: "OpenAI",
    },
  },
  { row: 1, col: 0 },
  {
    row: 1,
    col: 2,
    logo: {
      src: "https://storage.efferd.com/logo/cursor.svg",
      alt: "Cursor",
    },
  },
  {
    row: 1,
    col: 4,
    logo: {
      src: "https://storage.efferd.com/logo/v0.svg",
      alt: "v0",
    },
  },
  {
    row: 2,
    col: 1,
    logo: {
      src: "https://storage.efferd.com/logo/planetscale.svg",
      alt: "PlanetScale",
    },
  },
  { row: 2, col: 3 },
  { row: 3, col: 0 },
  {
    row: 3,
    col: 2,
    logo: {
      src: "https://storage.efferd.com/logo/base-ui.svg",
      alt: "Base UI",
    },
  },
  {
    row: 3,
    col: 4,
    logo: {
      src: "https://storage.efferd.com/logo/copilot.svg",
      alt: "Copilot",
    },
  },
  {
    row: 4,
    col: 1,
    logo: {
      src: "https://storage.efferd.com/logo/github.svg",
      alt: "GitHub",
    },
  },
  {
    row: 4,
    col: 3,
    logo: {
      src: "https://storage.efferd.com/logo/dub.svg",
      alt: "Dub",
    },
  },
]

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
          <h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="text-muted-foreground text-sm md:text-base">
              {description}
            </p>
          ) : null}
          {cta ? (
            cta.href ? (
              <Button asChild size="sm">
                <a href={cta.href}>{cta.label}</a>
              </Button>
            ) : (
              <Button size="sm" type="button">
                {cta.label}
              </Button>
            )
          ) : null}
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
  )
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
  )
}
