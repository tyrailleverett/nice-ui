import {
  BoldIcon,
  Calendar1Icon,
  EllipsisIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Feature9Card {
  description: string;
  illustration: ReactNode;
  title: string;
}

export interface Feature9Props {
  cards?: Feature9Card[];
  className?: string;
  description?: string;
  title?: string;
}

interface IllustrationProps {
  className?: string;
  variant?: "elevated" | "outlined" | "mixed";
}

export function ScheduleIllustration({
  className,
  variant = "elevated",
}: IllustrationProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute flex -translate-x-1/8 translate-y-[-110%] items-center gap-2 rounded-lg bg-background p-1",
          {
            "border border-foreground/10": variant === "outlined",
            "border border-foreground/10 shadow-black/5 shadow-md":
              variant === "mixed",
            "shadow-black/10 shadow-lg": variant === "elevated",
          }
        )}
      >
        <Button className="rounded-sm" size="sm">
          <Calendar1Icon className="size-3" />
          <span className="font-medium text-sm">Schedule</span>
        </Button>
        <span className="block h-4 w-px bg-border" />
        <div className="flex gap-0.5">
          <Button aria-label="Toggle bold" size="icon-sm" variant="ghost">
            <BoldIcon className="size-4" />
          </Button>
          <Button aria-label="Toggle italic" size="icon-sm" variant="ghost">
            <ItalicIcon className="size-4" />
          </Button>
          <Button aria-label="Toggle underline" size="icon-sm" variant="ghost">
            <UnderlineIcon className="size-4" />
          </Button>
          <Button
            aria-label="Toggle strikethrough"
            size="icon-sm"
            variant="ghost"
          >
            <StrikethroughIcon className="size-4" />
          </Button>
        </div>
        <span className="block h-4 w-px bg-border" />
        <Button className="size-8" size="icon" variant="ghost">
          <EllipsisIcon className="size-3" />
        </Button>
      </div>
      <span>
        <span className="bg-secondary py-1 text-secondary-foreground">
          Tomorrow 8:30 pm
        </span>{" "}
        is our priority.
      </span>
    </div>
  );
}

export function CodeIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)]",
        className
      )}
    >
      <ul className="mx-auto w-fit font-medium font-mono text-2xl text-muted-foreground">
        {["Images", "Variables", "Pages", "Components", "Styles"].map(
          (item, index) => (
            <li
              className={cn(
                index === 2 &&
                  "relative text-foreground before:absolute before:translate-x-[-110%] before:text-orange-500 before:content-['Import']"
              )}
              key={item}
            >
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

const defaultCards: Feature9Card[] = [
  {
    description: "Plan and run campaigns from one organized workspace.",
    illustration: <CodeIllustration className="w-full" />,
    title: "Marketing Campaigns",
  },
  {
    description: "Book and manage meetings without leaving the editor.",
    illustration: <ScheduleIllustration className="border" />,
    title: "AI Meeting Scheduler",
  },
];

export function Feature9({
  title = "Personal AI, with you anywhere",
  description = "Nice UI lives a single hotkey away — ready to appear as a floating window above your other apps. Get instant assistance whether you're browsing, coding, or writing documents.",
  cards = defaultCards,
  className,
}: Feature9Props) {
  return (
    <section className={className}>
      <div className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div>
            <h2 className="mt-4 font-semibold text-4xl text-foreground">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 mb-12 text-balance text-lg text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <Card className="bg-muted/50 p-6 ring-0" key={card.title}>
                <div className="flex aspect-video items-center justify-center">
                  {card.illustration}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-balance text-lg text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
