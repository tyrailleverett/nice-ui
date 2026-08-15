import { ChevronRightIcon, CirclePlayIcon } from "lucide-react";
import type { ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";

export interface Hero3Action {
  href?: string;
  label: string;
}

export interface Hero3Logo {
  alt: string;
  src: string;
}

export interface Hero3Screenshot {
  alt: string;
  src: string;
}

export interface Hero3Props {
  className?: string;
  darkScreenshot?: Hero3Screenshot;
  description?: string;
  logos?: Hero3Logo[];
  logosLabel?: string;
  primaryCta?: Hero3Action | null;
  screenshot?: Hero3Screenshot;
  secondaryCta?: Hero3Action | null;
  title?: string;
}

const defaultLogos: Hero3Logo[] = [
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
];

function ActionButton({
  action,
  variant,
  size,
  className,
  startIcon,
  endIcon,
}: {
  action: Hero3Action;
  variant?: "default" | "outline";
  size?: "lg";
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}) {
  const content = (
    <>
      {startIcon}
      <span className="text-nowrap">{action.label}</span>
      {endIcon}
    </>
  );

  if (action.href) {
    return (
      <Button
        className={className}
        nativeButton={false}
        render={<a href={action.href} />}
        size={size}
        variant={variant}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button className={className} size={size} type="button" variant={variant}>
      {content}
    </Button>
  );
}

export function Hero3({
  title = "Simple payments for startups",
  description = "One tool that does it all. Search, generate, analyze, and chat—right inside Nice UI.",
  primaryCta = { href: "#", label: "Get Started" },
  secondaryCta = { href: "#", label: "Watch video" },
  logosLabel = "Trusted by teams at :",
  logos = defaultLogos,
  screenshot = {
    alt: "Product dashboard",
    src: "/screenshots/workflow-light.png",
  },
  darkScreenshot = {
    alt: "Product dashboard",
    src: "/screenshots/workflow-dark.png",
  },
  className,
}: Hero3Props) {
  return (
    <MarketingSection className={className}>
      <section className="overflow-hidden bg-linear-to-b from-background to-muted">
        <div className="relative py-24 md:py-36">
          <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
            <div className="md:w-1/2">
              <h1 className="max-w-md text-balance font-display-heading text-5xl md:text-6xl">
                {title}
              </h1>
              {description ? (
                <p className="my-8 max-w-2xl text-balance text-muted-foreground text-xl">
                  {description}
                </p>
              ) : null}

              {primaryCta || secondaryCta ? (
                <div className="flex items-center gap-3">
                  {primaryCta ? (
                    <ActionButton
                      action={primaryCta}
                      className="pr-4.5"
                      endIcon={<ChevronRightIcon className="opacity-50" />}
                      size="lg"
                    />
                  ) : null}
                  {secondaryCta ? (
                    <ActionButton
                      action={secondaryCta}
                      className="pl-5"
                      size="lg"
                      startIcon={
                        <CirclePlayIcon className="fill-primary/25 stroke-primary" />
                      }
                      variant="outline"
                    />
                  ) : null}
                </div>
              ) : null}

              {logos.length ? (
                <div className="mt-10">
                  {logosLabel ? (
                    <p className="text-muted-foreground">{logosLabel}</p>
                  ) : null}
                  <div className="mt-6 flex flex-wrap items-center gap-8">
                    {logos.map((logo) => (
                      <img
                        alt={logo.alt}
                        className="pointer-events-none h-5 w-auto select-none dark:brightness-0 dark:invert"
                        height={20}
                        key={logo.alt}
                        src={logo.src}
                        width={80}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="perspective-near mt-24 translate-x-12 md:absolute md:top-40 md:-right-6 md:bottom-16 md:left-1/2 md:mt-0 md:translate-x-0">
            <div className="relative h-full before:absolute before:-inset-x-4 before:top-0 before:bottom-7 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border before:border-foreground/5">
              <div className="relative h-full -translate-y-12 skew-x-6 overflow-hidden rounded-lg border border-transparent bg-background shadow-foreground/10 shadow-md ring-1 ring-foreground/5">
                <img
                  alt={screenshot.alt}
                  className="size-full object-cover object-top-left dark:hidden"
                  height={1842}
                  src={screenshot.src}
                  width={2880}
                />
                <img
                  alt={darkScreenshot.alt}
                  className="hidden size-full object-cover object-top-left dark:block"
                  height={1842}
                  src={darkScreenshot.src}
                  width={2880}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
