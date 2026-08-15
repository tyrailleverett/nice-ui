import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";

export interface Hero5Action {
  href?: string;
  label: string;
}

export interface Hero5Announcement {
  eyebrow?: string;
  href?: string;
  label: string;
}

export interface Hero5Screenshot {
  alt: string;
  src: string;
}

export interface Hero5Logo {
  alt: string;
  src: string;
}

export interface Hero5Props {
  announcement?: Hero5Announcement | null;
  className?: string;
  darkScreenshot?: Hero5Screenshot;
  description?: string;
  logos?: Hero5Logo[];
  logosCta?: Hero5Action | null;
  primaryCta?: Hero5Action | null;
  screenshot?: Hero5Screenshot;
  secondaryCta?: Hero5Action | null;
  title?: string;
}

const defaultLogos: Hero5Logo[] = [
  {
    alt: "Bolt",
    src: "https://svgl.app/library/bolt-new.svg",
  },
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
  {
    alt: "Stripe",
    src: "https://svgl.app/library/stripe_wordmark.svg",
  },
];

function ActionButton({
  action,
  variant,
}: {
  action: Hero5Action;
  variant?: "default" | "ghost";
}) {
  const content = <span className="text-nowrap">{action.label}</span>;

  if (action.href) {
    return (
      <Button
        nativeButton={false}
        render={<a href={action.href} />}
        variant={variant}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant}>
      {content}
    </Button>
  );
}

export function Hero5({
  announcement = {
    eyebrow: "New:",
    href: "#",
    label: "Introducing the living customer graph",
  },
  title = "Customer universe, beautifully connected",
  description = "Every account, signal, conversation, and next move in one living workspace that helps teams turn momentum into revenue.",
  primaryCta = { href: "#", label: "Explore the graph" },
  secondaryCta = { href: "#", label: "Watch the flow" },
  screenshot = {
    alt: "Product dashboard",
    src: "/screenshots/customer-light.png",
  },
  darkScreenshot = {
    alt: "Product dashboard",
    src: "/screenshots/customer-dark.png",
  },
  logos = defaultLogos,
  logosCta = { href: "#", label: "See the network" },
  className,
}: Hero5Props) {
  return (
    <MarketingSection className={className}>
      <section className="overflow-hidden">
        <div className="relative pt-24 md:pt-36">
          <div className="mx-auto max-w-7xl">
            <div className="px-6 text-center sm:mx-auto lg:mt-0 lg:mr-auto">
              {announcement ? (
                <a
                  className="group mx-auto flex w-fit items-center gap-3 rounded-full p-1 pl-4 transition-colors duration-300"
                  href={announcement.href ?? "#"}
                >
                  {announcement.eyebrow ? (
                    <span className="font-medium text-sm">
                      {announcement.eyebrow}
                    </span>
                  ) : null}
                  <span className="text-muted-foreground text-sm">
                    {announcement.label}
                  </span>
                  <div className="size-6 overflow-hidden rounded-full duration-500">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRightIcon className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRightIcon className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </a>
              ) : null}

              <h1 className="mx-auto mt-8 max-w-4xl text-balance font-display-heading text-5xl md:text-6xl lg:mt-12 xl:text-7xl">
                {title}
              </h1>
              {description ? (
                <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground md:text-lg">
                  {description}
                </p>
              ) : null}

              {primaryCta || secondaryCta ? (
                <div className="mt-6 flex flex-col items-center justify-center gap-2 md:flex-row">
                  {primaryCta ? <ActionButton action={primaryCta} /> : null}
                  {secondaryCta ? (
                    <ActionButton action={secondaryCta} variant="ghost" />
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="relative mt-8 overflow-hidden p-6 max-sm:-mr-56 sm:mt-16">
              <div className="before:mask-radial-[100%_60%] before:mask-radial-from-65% before:mask-radial-at-top-left relative rounded-2xl p-2 shadow-lg ring ring-foreground/10 before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-foreground/10 before:border-t before:border-l">
                <div className="absolute inset-0 z-1 rounded-2xl bg-foreground/2" />
                <img
                  alt={screenshot.alt}
                  className="relative aspect-15/8 rounded-2xl bg-background dark:hidden"
                  height={1440}
                  src={screenshot.src}
                  width={2700}
                />
                <img
                  alt={darkScreenshot.alt}
                  className="relative hidden aspect-15/8 rounded-2xl bg-background dark:block"
                  height={1440}
                  src={darkScreenshot.src}
                  width={2700}
                />
              </div>
            </div>
          </div>
        </div>

        {logos.length ? (
          <div className="bg-background pt-6 pb-16 md:pb-32">
            <div className="group relative m-auto max-w-5xl px-6">
              {logosCta ? (
                <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                  {logosCta.href ? (
                    <a
                      className="block text-sm duration-150 hover:opacity-75"
                      href={logosCta.href}
                    >
                      <span>{logosCta.label}</span>
                      <ChevronRightIcon className="ml-1 inline-block size-3" />
                    </a>
                  ) : (
                    <span className="block text-sm">
                      {logosCta.label}
                      <ChevronRightIcon className="ml-1 inline-block size-3" />
                    </span>
                  )}
                </div>
              ) : null}
              <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 group-hover:blur-xs sm:gap-x-16 sm:gap-y-14 md:grid-cols-4">
                {logos.map((logo) => (
                  <div className="flex items-center" key={logo.alt}>
                    <img
                      alt={logo.alt}
                      className="mx-auto h-5 w-full max-w-24 object-contain dark:brightness-0 dark:invert"
                      height={20}
                      src={logo.src}
                      width={96}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </MarketingSection>
  );
}
