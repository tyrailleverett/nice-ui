import { MarketingSection } from "@/components/marketing-section";

export interface Feature14Item {
  description: string;
  title: string;
}

export interface Feature14Props {
  className?: string;
  features?: Feature14Item[];
  mutedTitle?: string;
  title?: string;
}

const defaultFeatures: Feature14Item[] = [
  {
    description:
      "Leverage machine learning to gain deeper insights from your marketing data and optimize campaigns in real-time.",
    title: "AI-Powered Analytics",
  },
  {
    description:
      "Automate repetitive tasks and workflows, allowing your team to focus on strategic initiatives.",
    title: "Intelligent Automation",
  },
  {
    description:
      "Identify high-value audiences with precision using advanced predictive modeling.",
    title: "Predictive Targeting",
  },
];

export function Feature14({
  mutedTitle = "Building the next generation of",
  title = "AI-powered Marketing Tools",
  features = defaultFeatures,
  className,
}: Feature14Props) {
  return (
    <MarketingSection className={className}>
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2 lg:gap-x-28">
          <h2 className="max-w-lg font-display-heading text-4xl text-foreground leading-[1.12] md:text-5xl">
            <span className="text-muted-foreground">{mutedTitle} </span>
            {title}
          </h2>

          <ul className="flex flex-col gap-12">
            {features.map((feature) => (
              <li className="max-w-md" key={feature.title}>
                <h3 className="font-semibold text-foreground text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MarketingSection>
  );
}
