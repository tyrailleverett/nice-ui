import { cn } from "@/lib/utils"

export type Integrations4Logo = {
  src: string
  alt: string
  isInvertable?: boolean
}

export type Integrations4Tile = {
  row: number
  col: number
  logo?: Integrations4Logo
}

export type Integrations4Props = {
  title?: string
  description?: string
  tiles?: Integrations4Tile[]
  className?: string
}

const defaultTiles: Integrations4Tile[] = [
  { row: 0, col: 1 },
  {
    row: 0,
    col: 3,
    logo: {
      src: "https://storage.efferd.com/logo/notion.svg",
      alt: "Notion",
    },
  },
  { row: 1, col: 0 },
  {
    row: 1,
    col: 2,
    logo: {
      src: "https://storage.efferd.com/logo/cursor.svg",
      alt: "Cursor",
      isInvertable: true,
    },
  },
  {
    row: 1,
    col: 4,
    logo: {
      src: "https://storage.efferd.com/logo/vercel.svg",
      alt: "Vercel",
      isInvertable: true,
    },
  },
  {
    row: 2,
    col: 1,
    logo: {
      src: "https://storage.efferd.com/logo/planetscale.svg",
      alt: "PlanetScale",
      isInvertable: true,
    },
  },
  {
    row: 2,
    col: 3,
    logo: {
      src: "https://storage.efferd.com/logo/gmail.svg",
      alt: "Gmail",
    },
  },
  { row: 3, col: 0 },
  {
    row: 3,
    col: 2,
    logo: {
      src: "https://storage.efferd.com/logo/supabase.svg",
      alt: "Supabase",
    },
  },
  {
    row: 3,
    col: 4,
    logo: {
      src: "https://storage.efferd.com/logo/canva.svg",
      alt: "Canva",
    },
  },
  {
    row: 4,
    col: 1,
    logo: {
      src: "https://storage.efferd.com/logo/adobe.svg",
      alt: "Adobe",
    },
  },
  {
    row: 4,
    col: 3,
    logo: {
      src: "https://storage.efferd.com/logo/polar.svg",
      alt: "Polar",
    },
  },
]

export function Integrations4({
  title = "Works with the tools you already open",
  description = "Ship Nice UI next to the editors, databases, and inboxes your team already lives in.",
  tiles = defaultTiles,
  className,
}: Integrations4Props) {
  return (
    <section
      className={cn(
        "mx-auto grid max-w-5xl grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center",
        className
      )}
    >
      <div className="max-w-xl space-y-5">
        <h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="text-lg text-muted-foreground leading-8">
            {description}
          </p>
        ) : null}
      </div>

      <div className="place-items-end">
        <div className="relative size-90 mask-[radial-gradient(ellipse_at_center,black,black,transparent)]">
          {tiles.map((tile) => (
            <IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
          ))}
        </div>
      </div>
    </section>
  )
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
  )
}
