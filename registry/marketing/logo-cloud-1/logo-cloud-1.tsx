import { MarketingSection } from "@/components/marketing-section";

export interface LogoCloud1Item {
  alt: string;
  src: string;
}

export interface LogoCloud1Props {
  className?: string;
  highlight?: string;
  logos?: LogoCloud1Item[];
  title?: string;
}

const defaultLogos: LogoCloud1Item[] = [
  {
    alt: "Nvidia",
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
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
    alt: "Turso",
    src: "https://svgl.app/library/turso-wordmark-light.svg",
  },
  {
    alt: "Vercel",
    src: "https://svgl.app/library/vercel_wordmark.svg",
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
    alt: "Clerk",
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
  },
];

export function LogoCloud1({
  title = "Your favorite companies are",
  highlight = "our partners.",
  logos = defaultLogos,
  className,
}: LogoCloud1Props) {
  return (
    <MarketingSection className={className} padded>
      <section className="space-y-5 px-4">
        {title || highlight ? (
          <h2 className="text-center font-heading font-semibold text-lg md:text-2xl">
            {title ? (
              <span className="text-muted-foreground">{title}</span>
            ) : null}{" "}
            {highlight ? (
              <span className="text-primary">{highlight}</span>
            ) : null}
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
                className="pointer-events-none block max-h-5 max-w-20 select-none object-contain dark:brightness-0 dark:invert"
                height={20}
                loading="lazy"
                src={logo.src}
                width={80}
              />
            </div>
          ))}
        </div>
      </section>
    </MarketingSection>
  );
}
