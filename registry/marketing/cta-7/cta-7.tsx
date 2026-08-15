import {
  ArrowUpRightIcon,
  CheckIcon,
  GitCommitHorizontalIcon,
  MessageSquareIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GithubIcon(props: ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" {...props}>
      <image
        height="100%"
        href="https://svgl.app/library/github_light.svg"
        width="100%"
      />
    </svg>
  );
}

export interface Cta7Action {
  href?: string;
  label: string;
}

export interface Cta7Activity {
  className?: string;
  content: ReactNode;
}

export interface Cta7Props {
  activities?: Cta7Activity[];
  className?: string;
  description?: string;
  primaryCta?: Cta7Action;
  title?: string;
}

function ActivityCard({ className, content }: Cta7Activity) {
  return (
    <div
      className={cn(
        "absolute hidden max-w-64 rounded-xl border bg-card px-3 py-2 text-left shadow-sm md:block",
        className
      )}
    >
      {content}
    </div>
  );
}

export function Cta7({
  title = "It's Open-Source.",
  description = "Nice UI is fully open source and free to use.",
  primaryCta = {
    href: "https://github.com/hotreloadstudios/nice-ui",
    label: "View on GitHub",
  },
  activities = [
    {
      className: "top-[12%] left-[4%] rotate-[-6deg]",
      content: (
        <>
          <p className="text-muted-foreground text-xs">shadcn 2d ago</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm">
            <MessageSquareIcon className="size-3.5 text-muted-foreground" />
            when you stop copying blocks?
          </p>
        </>
      ),
    },
    {
      className: "top-[18%] right-[2%] rotate-[5deg]",
      content: (
        <>
          <p className="text-muted-foreground text-xs">shabanhr 12h ago</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm">
            <GitCommitHorizontalIcon className="size-3.5 text-muted-foreground" />
            pushed feat(docs) + shadcn cli config
          </p>
        </>
      ),
    },
    {
      className: "bottom-[10%] left-[6%] rotate-[-3deg]",
      content: (
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex size-6 items-center justify-center rounded-full border">
            <CheckIcon className="size-3.5" />
          </span>
          <div>
            <p className="font-medium text-sm">Development Approved</p>
            <p className="text-muted-foreground text-xs">
              Nice UI has approved development for commit #8733
            </p>
          </div>
        </div>
      ),
    },
  ],
  className,
}: Cta7Props) {
  const ctaContent = (
    <>
      <GithubIcon className="size-4" data-icon="inline-start" />
      {primaryCta.label}
      <ArrowUpRightIcon data-icon="inline-end" />
    </>
  );

  return (
    <MarketingSection className={className}>
      <section
        className={cn(
          "relative mx-auto flex min-h-80 w-full max-w-4xl flex-col items-center justify-center gap-4 overflow-hidden px-6 py-16 text-center md:min-h-96",
          "bg-[radial-gradient(40%_70%_at_50%_20%,--theme(--color-foreground/.08),transparent)]"
        )}
      >
        {activities.map((activity) => (
          <ActivityCard key={activity.className ?? "activity"} {...activity} />
        ))}

        <h2 className="font-display-heading text-3xl md:text-4xl">{title}</h2>
        {description ? (
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        ) : null}
        {primaryCta.href ? (
          <Button
            className="rounded-full"
            nativeButton={false}
            render={
              <a href={primaryCta.href} rel="noreferrer" target="_blank" />
            }
            size="lg"
          >
            {ctaContent}
          </Button>
        ) : (
          <Button className="rounded-full" size="lg" type="button">
            {ctaContent}
          </Button>
        )}
      </section>
    </MarketingSection>
  );
}
