import { cn } from "@/lib/utils";

export interface LogoCloud3Item {
  alt: string;
  src: string;
}

export interface LogoCloud3Props {
  className?: string;
  highlight?: string;
  logos?: LogoCloud3Item[];
  title?: string;
}

const defaultLogos: LogoCloud3Item[] = [
  {
    alt: "Vercel",
    src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
  },
  {
    alt: "Supabase",
    src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
  },
  {
    alt: "OpenAI",
    src: "https://storage.efferd.com/logo/openai-wordmark.svg",
  },
  {
    alt: "Dub",
    src: "https://storage.efferd.com/logo/dub-wordmark.svg",
  },
  {
    alt: "Turso",
    src: "https://storage.efferd.com/logo/turso-wordmark.svg",
  },
  {
    alt: "GitHub",
    src: "https://storage.efferd.com/logo/github-wordmark.svg",
  },
  {
    alt: "Claude",
    src: "https://storage.efferd.com/logo/claude-wordmark.svg",
  },
  {
    alt: "Nvidia",
    src: "https://storage.efferd.com/logo/nvidia-wordmark.svg",
  },
  {
    alt: "Clerk",
    src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
  },
  {
    alt: "Bolt",
    src: "https://storage.efferd.com/logo/bolt-wordmark.svg",
  },
  {
    alt: "Stripe",
    src: "https://storage.efferd.com/logo/stripe-wordmark.svg",
  },
];

export function LogoCloud3({
  title = "Already used by",
  highlight = "Best in the Game",
  logos = defaultLogos,
  className,
}: LogoCloud3Props) {
  return (
    <section className={cn("w-full px-4", className)}>
      {title || highlight ? (
        <h2 className="mb-5 text-center text-lg text-muted-foreground">
          {title ? <>{title} </> : null}
          {highlight ? (
            <span className="font-medium text-primary">{highlight}</span>
          ) : null}
        </h2>
      ) : null}
      <div className="relative mx-auto max-w-3xl">
        <div className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-8 py-6 sm:gap-x-12 sm:gap-y-12">
          {logos.map((logo) => (
            <img
              alt={logo.alt}
              className="pointer-events-none h-5 w-fit select-none dark:brightness-0 dark:invert"
              height={20}
              key={logo.alt}
              loading="lazy"
              src={logo.src}
              width={80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
