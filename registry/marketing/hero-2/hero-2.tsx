import { ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Hero2Action {
  href?: string;
  label: string;
}

export interface Hero2Announcement {
  eyebrow?: string;
  href?: string;
  label: string;
}

export interface Hero2Screenshot {
  alt: string;
  src: string;
}

export interface Hero2Props {
  announcement?: Hero2Announcement | null;
  className?: string;
  darkScreenshot?: Hero2Screenshot;
  description?: string;
  primaryCta?: Hero2Action | null;
  screenshot?: Hero2Screenshot;
  secondaryCta?: Hero2Action | null;
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
  action: Hero2Action;
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
      <Button asChild variant={variant}>
        <a href={action.href}>{content}</a>
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant}>
      {content}
    </Button>
  );
}

export function Hero2({
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
}: Hero2Props) {
  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-5xl overflow-hidden pt-16",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-hidden"
      >
        <div
          className={cn(
            "absolute inset-0 isolate -z-10",
            "bg-[radial-gradient(20%_80%_at_20%_0%,--theme(--color-foreground/.1),transparent)]"
          )}
        />
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col gap-5 px-4">
        {announcement ? (
          <a
            className={cn(
              "group flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow-xs",
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
            "text-balance font-display-heading text-4xl text-foreground leading-tight md:text-5xl",
            enter,
            "delay-100"
          )}
        >
          {title}
        </h1>

        {description ? (
          <p
            className={cn(
              "text-muted-foreground text-sm tracking-wider sm:text-lg md:text-xl",
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
        <div
          className={cn(
            "absolute -inset-x-20 inset-y-0 -translate-y-1/3 scale-120 rounded-full",
            "bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.1),transparent,transparent)]",
            "blur-[50px]"
          )}
        />
        <div
          className={cn(
            "mask-b-from-60% relative mt-8 -mr-56 overflow-hidden px-2 sm:mt-12 sm:mr-0 md:mt-20",
            "fade-in slide-in-from-bottom-5 animate-in fill-mode-backwards delay-100 duration-1000 ease-out motion-reduce:animate-none"
          )}
        >
          <div className="relative inset-shadow-2xs inset-shadow-foreground/10 mx-auto max-w-5xl overflow-hidden rounded-lg border bg-background p-2 shadow-xl ring-1 ring-card dark:inset-shadow-foreground/20 dark:inset-shadow-xs">
            <img
              alt={screenshot.alt}
              className="z-2 aspect-video rounded-lg border dark:hidden"
              height={1080}
              src={screenshot.src}
              width={1920}
            />
            <img
              alt={darkScreenshot.alt}
              className="hidden aspect-video rounded-lg bg-background dark:block"
              height={1080}
              src={darkScreenshot.src}
              width={1920}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
