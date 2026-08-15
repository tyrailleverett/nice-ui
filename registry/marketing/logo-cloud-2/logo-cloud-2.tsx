import type { ComponentProps } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export interface LogoCloud2Item {
  alt: string;
  src: string;
}

export interface LogoCloud2Props {
  className?: string;
  highlight?: string;
  logos?: LogoCloud2Item[];
  title?: string;
}

const defaultLogos: LogoCloud2Item[] = [
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

export function LogoCloud2({
  title = "Trusted by experts.",
  highlight = "Used by the leaders.",
  logos = defaultLogos,
  className,
}: LogoCloud2Props) {
  return (
    <MarketingSection className={className}>
      <section className="relative">
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
          <h2 className="mb-5 text-center font-heading font-semibold text-primary text-xl md:text-3xl">
            {title ? <span>{title}</span> : null}
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
    </MarketingSection>
  );
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
          height={20}
          key={logo.alt}
          loading="lazy"
          src={logo.src}
          width={80}
        />
      ))}
    </div>
  );
}
