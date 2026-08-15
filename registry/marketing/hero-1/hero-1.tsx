import { ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import type { ReactNode } from "react";

import { DecorIcon } from "@/components/decor-icon";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Hero1Action {
  href?: string;
  label: string;
}

export interface Hero1Announcement {
  eyebrow?: string;
  href?: string;
  label: string;
}

export interface Hero1Screenshot {
  alt: string;
  src: string;
}

export interface Hero1Props {
  announcement?: Hero1Announcement | null;
  className?: string;
  darkScreenshot?: Hero1Screenshot;
  description?: string;
  primaryCta?: Hero1Action | null;
  screenshot?: Hero1Screenshot;
  secondaryCta?: Hero1Action | null;
  title?: string;
}

const enter =
  "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards duration-500 ease-out motion-reduce:animate-none";

function ActionButton({
  action,
  variant,
  startIcon,
  endIcon,
}: {
  action: Hero1Action;
  variant?: "default" | "outline";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}) {
  const content = (
    <>
      {startIcon}
      {action.label}
      {endIcon}
    </>
  );

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

export function Hero1({
  announcement = {
    eyebrow: "NOW",
    href: "#",
    label: "accepting new client projects",
  },
  title = "Building Digital Experiences That Drive Growth",
  description = "We help brands scale faster through design, development and strategic execution.",
  primaryCta = { href: "#", label: "Get started" },
  secondaryCta = { href: "#", label: "Book a Call" },
  screenshot = {
    alt: "Product dashboard",
    src: "/screenshots/analytics-light.png",
  },
  darkScreenshot = {
    alt: "Product dashboard",
    src: "/screenshots/analytics-dark.png",
  },
  className,
}: Hero1Props) {
  return (
    <MarketingSection className={className}>
      <div className="relative flex flex-col items-center justify-center gap-5 px-4 py-12 md:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-1 size-full overflow-hidden"
        >
          <div
            className={cn(
              "absolute -inset-x-20 inset-y-0 z-0 rounded-full",
              "bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.1),transparent,transparent)]",
              "blur-[50px]"
            )}
          />
          <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
          <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
          <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
          <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
        </div>

        {announcement ? (
          <a
            className={cn(
              "group mx-auto flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow",
              enter,
              "delay-500"
            )}
            href={announcement.href ?? "#"}
          >
            {announcement.eyebrow ? (
              <div className="rounded-xs border bg-card px-1.5 py-0.5 shadow-sm">
                <p className="font-mono text-xs">{announcement.eyebrow}</p>
              </div>
            ) : null}
            <span className="text-xs">{announcement.label}</span>
            <span className="block h-5 border-l" />
            <div className="pr-1">
              <ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
            </div>
          </a>
        ) : null}

        <h1
          className={cn(
            "max-w-2xl text-balance text-center font-display-heading text-3xl text-foreground md:text-5xl lg:text-6xl",
            enter,
            "delay-100"
          )}
        >
          {title}
        </h1>

        {description ? (
          <p
            className={cn(
              "max-w-xl text-center text-muted-foreground text-sm tracking-wider sm:text-lg",
              enter,
              "delay-200"
            )}
          >
            {description}
          </p>
        ) : null}

        {primaryCta || secondaryCta ? (
          <div
            className={cn(
              "flex w-fit items-center justify-center gap-3 pt-2",
              enter,
              "delay-300"
            )}
          >
            {secondaryCta ? (
              <ActionButton
                action={secondaryCta}
                startIcon={<PhoneCallIcon data-icon="inline-start" />}
                variant="outline"
              />
            ) : null}
            {primaryCta ? (
              <ActionButton
                action={primaryCta}
                endIcon={<ArrowRightIcon data-icon="inline-end" />}
              />
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />
        <div className="overflow-hidden *:pointer-events-none *:aspect-video *:select-none">
          <img
            alt={screenshot.alt}
            className="dark:hidden"
            height={1080}
            src={screenshot.src}
            width={1920}
          />
          <img
            alt={darkScreenshot.alt}
            className="hidden dark:block"
            height={1080}
            src={darkScreenshot.src}
            width={1920}
          />
        </div>
      </div>
    </MarketingSection>
  );
}
