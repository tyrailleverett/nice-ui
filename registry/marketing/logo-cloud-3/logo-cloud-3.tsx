import { MarketingSection } from "@/components/marketing-section";

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
    src: "https://svgl.app/library/vercel_wordmark.svg",
  },
  {
    alt: "Supabase",
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
  },
  {
    alt: "OpenAI",
    src: "https://svgl.app/library/openai_wordmark_light.svg",
  },
  {
    alt: "Dub",
    src: "https://svgl.app/library/dub_dark_wordmark.svg",
  },
  {
    alt: "Turso",
    src: "https://svgl.app/library/turso-wordmark-light.svg",
  },
  {
    alt: "GitHub",
    src: "https://svgl.app/library/github_wordmark_light.svg",
  },
  {
    alt: "Claude",
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
  },
  {
    alt: "Nvidia",
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
  },
  {
    alt: "Clerk",
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
  },
  {
    alt: "Bolt",
    src: "https://svgl.app/library/bolt-new.svg",
  },
  {
    alt: "Stripe",
    src: "https://svgl.app/library/stripe_wordmark.svg",
  },
];

export function LogoCloud3({
  title = "Already used by",
  highlight = "Best in the Game",
  logos = defaultLogos,
  className,
}: LogoCloud3Props) {
  return (
    <MarketingSection className={className}>
      <section className="px-4">
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
    </MarketingSection>
  );
}
