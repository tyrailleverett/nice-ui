import {
  ActivityIcon,
  GlobeIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface Feature1Item {
  description: string;
  icon: ReactNode;
  title: string;
}

export interface Feature1Props {
  className?: string;
  features?: Feature1Item[];
}

const defaultFeatures: Feature1Item[] = [
  {
    description: "Blazing fast edge performance.",
    icon: <ZapIcon />,
    title: "Lightning Fast",
  },
  {
    description: "Security by design, zero config.",
    icon: <ShieldCheckIcon />,
    title: "Secure by Design",
  },
  {
    description: "Real-time sync across devices.",
    icon: <ActivityIcon />,
    title: "Real-time Sync",
  },
  {
    description: "Instant global deployment.",
    icon: <GlobeIcon />,
    title: "Global Scale",
  },
];

export function Feature1({
  features = defaultFeatures,
  className,
}: Feature1Props) {
  return (
    <section
      className={cn(
        "mx-auto grid max-w-5xl grid-cols-2 gap-4 py-4 md:grid-cols-4",
        className
      )}
    >
      {features.map((feature, index) => (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center p-2",
            "after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-linear-to-b after:from-foreground/6 after:via-foreground/25 after:to-foreground/6",
            "[&_svg]:size-6 [&_svg]:text-muted-foreground",
            {
              "after:hidden": index === features.length - 1,
              "after:hidden after:md:block": index === 1,
            }
          )}
          key={feature.title}
        >
          {feature.icon}
          <h3 className="mt-4 text-center font-medium text-xs md:text-sm lg:text-base">
            {feature.title}
          </h3>
          <p className="mt-1 text-center text-[10px] text-muted-foreground md:text-xs">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
}
