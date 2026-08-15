import {
  CpuIcon,
  FingerprintIcon,
  PencilIcon,
  Settings2Icon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export interface Feature3Item {
  description: string;
  icon: ReactNode;
  title: string;
}

export interface Feature3Props {
  className?: string;
  description?: string;
  features?: Feature3Item[];
  title?: string;
}

const defaultFeatures: Feature3Item[] = [
  {
    description: "Ship pages quickly with ready-made marketing blocks.",
    icon: <ZapIcon />,
    title: "Fast",
  },
  {
    description:
      "Compose sections that scale from landing pages to product sites.",
    icon: <CpuIcon />,
    title: "Powerful",
  },
  {
    description: "Accessible, semantic markup with no extra client runtime.",
    icon: <FingerprintIcon />,
    title: "Secure",
  },
  {
    description: "Override copy, layout, and tokens to match your brand.",
    icon: <PencilIcon />,
    title: "Customizable",
  },
  {
    description: "Own the source. Install once, edit locally, keep shipping.",
    icon: <Settings2Icon />,
    title: "Control",
  },
  {
    description: "Clear props and structure that agents can drop into a page.",
    icon: <SparklesIcon />,
    title: "Built for AI",
  },
];

export function Feature3({
  title = "Power. Speed. Control.",
  description = "Everything you need to build fast, secure, scalable apps.",
  features = defaultFeatures,
  className,
}: Feature3Props) {
  return (
    <MarketingSection className={className}>
      <section className="space-y-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-display-heading text-2xl md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-lg border">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard feature={feature} key={feature.title} />
            ))}
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}

export function FeatureCard({
  feature,
  className,
  ...props
}: ComponentProps<"div"> & {
  feature: Feature3Item;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background p-6", className)}
      {...props}
    >
      <div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
        {feature.icon}
      </div>
      <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
        {feature.description}
      </p>
    </div>
  );
}
