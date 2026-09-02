import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";
export interface Integrations5Item {
  category: string;
  description: string;
  name: string;
}
export interface Integrations5Props {
  className?: string;
  integrations?: Integrations5Item[];
  title?: string;
}
const defaultIntegrations: Integrations5Item[] = [
  {
    category: "Code",
    description: "Keep components and releases close to the repo.",
    name: "GitHub",
  },
  {
    category: "Design",
    description: "Move from a shared reference to a working block.",
    name: "Figma",
  },
  {
    category: "Planning",
    description: "Link customer feedback to the work that ships.",
    name: "Linear",
  },
  {
    category: "Deploy",
    description: "Preview every marketing change before launch.",
    name: "Vercel",
  },
  {
    category: "Email",
    description: "Connect product moments to a reliable inbox.",
    name: "Resend",
  },
];
export function Integrations5({
  title = "Fits into the way your team ships",
  integrations = defaultIntegrations,
  className,
}: Integrations5Props) {
  return (
    <MarketingSection className={className}>
      <section className="grid gap-10 p-4 md:grid-cols-[0.8fr_1.5fr] md:p-8">
        <header className="space-y-4">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
            Integrations
          </p>
          <h2 className="font-display-heading text-3xl sm:text-4xl">{title}</h2>
          <p className="text-muted-foreground text-sm leading-6">
            Bring your tools with you. These connections keep the handoff small
            and the context intact.
          </p>
        </header>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {integrations.map((item) => (
            <article
              className="group space-y-5 bg-background p-5"
              key={item.name}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center border bg-muted font-semibold text-sm">
                  {item.name.slice(0, 1)}
                </span>
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div>
                <p className="font-mono text-muted-foreground text-xs uppercase">
                  {item.category}
                </p>
                <h3 className="mt-1 font-medium">{item.name}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-6">
                  {item.description}
                </p>
              </div>
              <p className="flex items-center gap-1 text-muted-foreground text-xs">
                <CheckIcon aria-hidden="true" className="size-3" /> Ready to
                connect
              </p>
            </article>
          ))}
        </div>
      </section>
    </MarketingSection>
  );
}
