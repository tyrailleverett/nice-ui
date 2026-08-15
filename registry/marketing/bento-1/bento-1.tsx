import {
  LayoutTemplateIcon,
  PaletteIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface Bento1Item {
  description: string;
  icon: ReactNode;
  title: string;
}

export interface Bento1Props {
  className?: string;
  description?: string;
  items?: Bento1Item[];
  title?: string;
}

const defaultItems: Bento1Item[] = [
  {
    description:
      "Heroes, pricing, and footers share one type scale so the page never looks assembled.",
    icon: <LayoutTemplateIcon />,
    title: "Blocks that compose",
  },
  {
    description:
      "Near-black ink on a white canvas. Dark mode inverts the same tokens, not a second brand.",
    icon: <PaletteIcon />,
    title: "One token set",
  },
  {
    description:
      "Install a section with the shadcn CLI. Inter Variable and the radius ladder come with it.",
    icon: <ZapIcon />,
    title: "Install, don't rebuild",
  },
  {
    description:
      "Hairline rules and plus marks do the chrome. No drop shadows, no inverted featured cards.",
    icon: <ShieldCheckIcon />,
    title: "Quiet architecture",
  },
];

export function Bento1({
  title = "A marketing system, not a pile of sections",
  description = "Four jobs every landing page still has to do — already speaking the same visual language.",
  items = defaultItems,
  className,
}: Bento1Props) {
  return (
    <section
      className={cn(
        "w-full bg-background py-16 text-foreground md:py-20 lg:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display-heading text-3xl sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <ul className="mt-12 grid grid-cols-1 overflow-hidden rounded-xl border border-border md:grid-cols-2">
          {items.map((item, index) => (
            <li
              className={cn(
                "flex flex-col gap-3 bg-card p-8",
                index % 2 === 0 ? "md:border-r" : null,
                index < items.length - 2 ? "border-b" : null,
                index === items.length - 2 ? "border-b md:border-b-0" : null
              )}
              key={item.title}
            >
              <span className="text-muted-foreground [&_svg]:size-5">
                {item.icon}
              </span>
              <h3 className="font-heading font-semibold text-title-md">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
