import { ArrowRightIcon } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";

export interface Hero4Action {
  href?: string;
  label: string;
}

export interface Hero4Announcement {
  eyebrow?: string;
  href?: string;
  label: string;
}

export interface Hero4Image {
  alt: string;
  src: string;
}

export interface Hero4Props {
  announcement?: Hero4Announcement | null;
  className?: string;
  darkScreenshot?: Hero4Image;
  description?: string;
  primaryCta?: Hero4Action | null;
  screenshot?: Hero4Image;
  title?: string;
}

function PrimaryCtaButton({ action }: { action: Hero4Action }) {
  if (action.href) {
    return (
      <Button
        className="w-fit"
        nativeButton={false}
        render={<a href={action.href} />}
      >
        {action.label}
      </Button>
    );
  }

  return <Button className="w-fit">{action.label}</Button>;
}

export function Hero4({
  announcement = {
    eyebrow: "New",
    href: "#",
    label: "Introducing Nice UI 1.0",
  },
  title = "Agentic Creative canvas",
  description = "Modern websites and applications that look and feel the way you mean it.",
  primaryCta = { href: "#", label: "Get Started" },
  screenshot = {
    alt: "Product dashboard",
    src: "/screenshots/canvas-light.svg",
  },
  darkScreenshot = {
    alt: "Product dashboard",
    src: "/screenshots/canvas-dark.svg",
  },
  className,
}: Hero4Props) {
  return (
    <MarketingSection className={className}>
      <section className="overflow-hidden">
        <div className="relative pt-24 lg:pt-40">
          <div className="space-y-12 md:space-y-16">
            <div className="relative mx-auto max-w-7xl px-6">
              {announcement ? (
                <a
                  className="flex w-fit items-center gap-2 font-medium"
                  href={announcement.href ?? "#"}
                >
                  {announcement.eyebrow ? (
                    <span>{announcement.eyebrow}</span>
                  ) : null}
                  <span className="text-muted-foreground">
                    {announcement.label}
                  </span>
                  <ArrowRightIcon className="size-3.5" />
                </a>
              ) : null}

              <div className="mt-8 grid items-end gap-4 md:grid-cols-2 md:gap-6">
                <h1 className="text-balance font-display-heading text-5xl md:text-6xl xl:text-7xl">
                  {title}
                </h1>
                <div className="mx-auto flex max-w-md flex-col gap-6">
                  {description ? (
                    <p className="text-balance text-lg text-muted-foreground">
                      {description}
                    </p>
                  ) : null}
                  {primaryCta ? <PrimaryCtaButton action={primaryCta} /> : null}
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-7xl max-xl:px-2">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted md:aspect-5/3 lg:aspect-video">
                <div className="before:mask-radial-[100%_60%] before:mask-radial-from-65% before:mask-radial-at-top-left absolute top-4 left-4 z-10 min-w-4xl rounded-2xl p-2 shadow-lg ring ring-foreground/10 before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-foreground/10 before:border-t before:border-l lg:top-16 lg:left-16 lg:min-w-5xl xl:min-w-7xl">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-1 rounded-2xl bg-foreground/2"
                  />
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
        </div>
      </section>
    </MarketingSection>
  );
}
