import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export type LogoCloud2Item = {
  src: string
  alt: string
}

export type LogoCloud2Props = {
  title?: string
  highlight?: string
  logos?: LogoCloud2Item[]
  className?: string
}

const defaultLogos: LogoCloud2Item[] = [
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

export function LogoCloud2({
  title = "Trusted by experts.",
  highlight = "Used by the leaders.",
  logos = defaultLogos,
  className,
}: LogoCloud2Props) {
  return (
    <section className={cn("relative mx-auto w-full max-w-3xl", className)}>
      <style>{`
        @keyframes nice-ui-logo-cloud-2-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .nice-ui-logo-cloud-2-track {
          animation: nice-ui-logo-cloud-2-marquee 40s linear infinite;
        }
        .nice-ui-logo-cloud-2-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .nice-ui-logo-cloud-2-track {
            animation: none;
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 2rem;
          }
          .nice-ui-logo-cloud-2-clone {
            display: none;
          }
        }
      `}</style>
      {title || highlight ? (
        <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
          {title ? (
            <span className="text-muted-foreground">{title}</span>
          ) : null}
          {title && highlight ? <br /> : null}
          {highlight ? (
            <span className="font-semibold">{highlight}</span>
          ) : null}
        </h2>
      ) : null}
      <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mx-auto my-5 h-px max-w-sm bg-border" />
      <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
        <div className="nice-ui-logo-cloud-2-track flex w-max">
          <LogoRow logos={logos} />
          <LogoRow
            aria-hidden
            className="nice-ui-logo-cloud-2-clone"
            logos={logos}
          />
        </div>
      </div>
      <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mt-5 h-px bg-border" />
    </section>
  )
}

function LogoRow({
  className,
  logos,
  ...props
}: { logos: LogoCloud2Item[] } & ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-[42px] pr-[42px]", className)}
      {...props}
    >
      {logos.map((logo) => (
        <img
          alt={logo.alt}
          className="pointer-events-none h-4 w-auto shrink-0 select-none md:h-5 dark:brightness-0 dark:invert"
          key={logo.alt}
          loading="lazy"
          src={logo.src}
        />
      ))}
    </div>
  )
}
