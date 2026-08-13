import { cn } from "@/lib/utils"

export type LogoCloud1Item = {
  src: string
  alt: string
}

export type LogoCloud1Props = {
  title?: string
  highlight?: string
  logos?: LogoCloud1Item[]
  className?: string
}

const defaultLogos: LogoCloud1Item[] = [
  {
    src: "https://storage.efferd.com/logo/nvidia-wordmark.svg",
    alt: "Nvidia",
  },
  {
    src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
    alt: "Supabase",
  },
  {
    src: "https://storage.efferd.com/logo/openai-wordmark.svg",
    alt: "OpenAI",
  },
  {
    src: "https://storage.efferd.com/logo/turso-wordmark.svg",
    alt: "Turso",
  },
  {
    src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
    alt: "Vercel",
  },
  {
    src: "https://storage.efferd.com/logo/github-wordmark.svg",
    alt: "GitHub",
  },
  {
    src: "https://storage.efferd.com/logo/claude-wordmark.svg",
    alt: "Claude",
  },
  {
    src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
    alt: "Clerk",
  },
]

export function LogoCloud1({
  title = "Your favorite companies are",
  highlight = "our partners.",
  logos = defaultLogos,
  className,
}: LogoCloud1Props) {
  return (
    <section
      className={cn("mx-auto w-full max-w-3xl space-y-5 px-4", className)}
    >
      {title || highlight ? (
        <h2 className="text-center font-medium text-lg tracking-tight md:font-semibold md:text-2xl">
          {title ? (
            <span className="text-muted-foreground">{title}</span>
          ) : null}{" "}
          {highlight ? <span className="text-primary">{highlight}</span> : null}
        </h2>
      ) : null}
      <div className="grid grid-cols-2 rounded-lg bg-border shadow md:grid-cols-4">
        {logos.map((logo) => (
          <div
            className="flex items-center justify-center rounded-lg border bg-background p-8"
            key={logo.alt}
          >
            <img
              alt={logo.alt}
              className="pointer-events-none block h-4 w-auto select-none md:h-5 dark:brightness-0 dark:invert"
              loading="lazy"
              src={logo.src}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
