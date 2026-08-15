import { CommandIcon, HistoryIcon, SquareDashedIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { DecorIcon } from "@/components/decor-icon";
import { cn } from "@/lib/utils";

export interface Feature2Item {
  description: string;
  icon: ReactNode;
  title: string;
}

export interface Feature2Props {
  className?: string;
  features?: Feature2Item[];
  title?: string;
}

const defaultFeatures: Feature2Item[] = [
  {
    description: "Write without worry, every time.",
    icon: <HistoryIcon />,
    title: "Auto-Save Everything",
  },
  {
    description: "Rearrange sections with the block editor.",
    icon: <SquareDashedIcon />,
    title: "Drag-and-Drop Blocks",
  },
  {
    description: "Speed up your workflow with quick keys.",
    icon: <CommandIcon />,
    title: "Keyboard Shortcuts",
  },
];

function DashedLine({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute border-collapse border border-dashed", className)}
      {...props}
    />
  );
}

export function Feature2({
  title = "Ensuring your speedy workflow",
  features = defaultFeatures,
  className,
}: Feature2Props) {
  return (
    <section className={cn("mx-auto max-w-5xl", className)}>
      <h2 className="mb-5 text-center font-heading font-semibold text-2xl md:text-3xl">
        {title}
      </h2>

      <div className="relative">
        <DecorIcon
          className="size-6 stroke-2 stroke-border"
          position="top-left"
        />
        <DecorIcon
          className="size-6 stroke-2 stroke-border"
          position="top-right"
        />
        <DecorIcon
          className="size-6 stroke-2 stroke-border"
          position="bottom-left"
        />
        <DecorIcon
          className="size-6 stroke-2 stroke-border"
          position="bottom-right"
        />

        <DashedLine className="-top-[1.5px] right-3 left-3" />
        <DashedLine className="top-3 -right-[1.5px] bottom-3" />
        <DashedLine className="top-3 bottom-3 -left-[1.5px]" />
        <DashedLine className="right-3 -bottom-[1.5px] left-3" />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((feature) => (
            <div
              className="group relative p-8 [&_svg]:size-7 [&_svg]:text-muted-foreground"
              key={feature.title}
            >
              {feature.icon}
              <h3 className="mt-4 font-medium text-lg">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
              <DashedLine className="right-5 bottom-0 left-5 group-last:hidden md:top-5 md:right-0 md:bottom-5 md:left-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
