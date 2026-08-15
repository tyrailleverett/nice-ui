import { CalendarCheckIcon, ChevronRightIcon, TargetIcon } from "lucide-react";
import type { ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Feature10Action {
  href?: string;
  label: string;
}

export interface Feature10Item {
  description: string;
  icon: ReactNode;
  title: string;
}

export interface Feature10Screenshot {
  alt: string;
  src: string;
}

export interface Feature10Props {
  className?: string;
  cta?: Feature10Action | null;
  darkScreenshot?: Feature10Screenshot;
  items?: Feature10Item[];
  screenshot?: Feature10Screenshot;
  title?: string;
}

const defaultItems: Feature10Item[] = [
  {
    description:
      "Describe the code you want and generate it. From boilerplate to business logic.",
    icon: <TargetIcon className="size-5" />,
    title: "Code Generation",
  },
  {
    description:
      "Get instant feedback on best practices, performance, and maintainability.",
    icon: <CalendarCheckIcon className="size-5" />,
    title: "Code Review",
  },
];

function FeatureCta({ cta }: { cta: Feature10Action }) {
  const content = (
    <>
      {cta.label}
      <ChevronRightIcon className="size-4 opacity-50" />
    </>
  );

  if (cta.href) {
    return (
      <Button
        className="mt-8 pr-2"
        nativeButton={false}
        render={<a href={cta.href} />}
        variant="outline"
      >
        {content}
      </Button>
    );
  }

  return (
    <Button className="mt-8 pr-2" type="button" variant="outline">
      {content}
    </Button>
  );
}

export function Feature10({
  title = "The AI coding assistant that helps you write code faster",
  cta = { href: "#", label: "Learn more" },
  items = defaultItems,
  screenshot = {
    alt: "App screen",
    src: "/screenshots/analytics-light.png",
  },
  darkScreenshot = {
    alt: "App screen",
    src: "/screenshots/analytics-dark.png",
  },
  className,
}: Feature10Props) {
  return (
    <MarketingSection className={className}>
      <section className={cn()}>
        <div className="bg-muted/50 py-24">
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-5">
              <div className="md:col-span-2">
                <h2 className="text-balance font-display-heading text-4xl text-foreground">
                  {title}
                </h2>
                {cta ? <FeatureCta cta={cta} /> : null}
              </div>

              <div className="space-y-6 md:col-span-3 md:space-y-10">
                {items.map((item) => (
                  <div key={item.title}>
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <h3 className="font-semibold text-foreground text-lg">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-balance text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative -mx-12 mt-16 px-12">
              <div className="relative mx-auto overflow-hidden rounded-xl border border-transparent bg-background shadow-black/10 shadow-lg ring-1 ring-black/10">
                <img
                  alt={screenshot.alt}
                  className="w-full dark:hidden"
                  height={1842}
                  src={screenshot.src}
                  width={2880}
                />
                <img
                  alt={darkScreenshot.alt}
                  className="hidden w-full dark:block"
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
