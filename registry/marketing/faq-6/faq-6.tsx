import { MarketingSection } from "@/components/marketing-section";

export interface Faq6Item {
  answer: string;
  question: string;
}
export interface Faq6Props {
  className?: string;
  description?: string;
  items?: Faq6Item[];
  title?: string;
}

const defaultItems: Faq6Item[] = [
  {
    answer:
      "Yes. Use the blocks in personal and commercial products, then shape the copy, colors, and composition around your brand.",
    question: "Can I use Nice UI in a commercial project?",
  },
  {
    answer:
      "Nice UI uses your existing Tailwind tokens and React primitives, so you can drop a block into an app without adopting a second styling system.",
    question: "Does it work with my existing Tailwind setup?",
  },
  {
    answer:
      "The components use semantic HTML and the project primitives for keyboard focus, labeling, and responsive states. Test custom content with your own accessibility checks.",
    question: "Are the components accessible?",
  },
  {
    answer:
      "Every block exposes the content that matters through typed props. Replace arrays, links, logos, and labels without editing the component structure.",
    question: "Can I customize the content and layout?",
  },
  {
    answer:
      "Pull the latest component files when you are ready. Each block is intentionally self-contained so updates are easy to review and adopt selectively.",
    question: "How do updates work?",
  },
  {
    answer:
      "Start with the Storybook examples, then open an issue with a small reproduction if something does not behave as expected.",
    question: "Where can I get help?",
  },
];

export function Faq6({
  title = "Questions, answered plainly",
  description = "A quick guide to using Nice UI in a real product.",
  items = defaultItems,
  className,
}: Faq6Props) {
  return (
    <MarketingSection className={className}>
      <section className="grid gap-10 p-4 md:grid-cols-[0.8fr_1.4fr] md:p-8">
        <header className="space-y-3">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.18em]">
            FAQ / 06
          </p>
          <h2 className="font-display-heading text-3xl text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-sm text-muted-foreground text-sm leading-6">
            {description}
          </p>
        </header>
        <div className="divide-y border-y">
          {items.map((item) => (
            <details className="group py-5" key={item.question}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-sm marker:hidden [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pt-3 pr-8 text-muted-foreground text-sm leading-6">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </MarketingSection>
  );
}
