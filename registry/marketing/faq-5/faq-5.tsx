import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface Faq5Item {
  content: string;
  id: string;
  title: string;
}

export interface Faq5Group {
  items: Faq5Item[];
  title: string;
}

export interface Faq5Props {
  className?: string;
  description?: string;
  groups?: Faq5Group[];
  title?: string;
}

const defaultGroups: Faq5Group[] = [
  {
    items: [
      {
        content:
          "Nice UI is a shadcn-compatible registry of marketing and dashboard blocks. Drop them into a landing page or product UI so you can ship the layout instead of rebuilding it.",
        id: "getting-started-1",
        title: "What is Nice UI used for?",
      },
      {
        content:
          "Most teams install a block with the shadcn CLI and have a first page in place the same afternoon. Customize copy, spacing, and tokens from there.",
        id: "getting-started-2",
        title: "How quickly can we launch our first project?",
      },
      {
        content:
          "If you already use React and Tailwind, you can add blocks yourself. A designer or engineer helps when you want to wire them to real data or restyle the system.",
        id: "getting-started-3",
        title: "Do we need engineering support to get started?",
      },
    ],
    title: "Getting Started",
  },
  {
    items: [
      {
        content:
          "Yes. Keep the registry in a shared repo so product, design, and engineering compose from the same blocks instead of forking one-off sections.",
        id: "collaboration-1",
        title: "Can multiple teams work in the same workspace?",
      },
      {
        content:
          "Blocks are source in your project after install. Version them with git the same way you version any other component, and update from the registry when you want a newer variant.",
        id: "collaboration-2",
        title: "How does versioning work in Nice UI?",
      },
      {
        content:
          "Nice UI does not ship an auth model. Use your app's existing roles and permissions, then pass the right links and copy into each block.",
        id: "collaboration-3",
        title: "Can we manage permissions by role?",
      },
    ],
    title: "Collaboration",
  },
  {
    items: [
      {
        content:
          "Install into any project that already uses shadcn/ui and Tailwind. Blocks are regular React, so they sit next to the rest of your app.",
        id: "integrations-1",
        title: "Does Nice UI work with our existing stack?",
      },
      {
        content:
          "Yes. FAQ, CTA, and pricing blocks are presentational. Point buttons and links at Stripe, Polar, or your own billing routes when you are ready.",
        id: "integrations-2",
        title: "Can we connect checkout or billing later?",
      },
    ],
    title: "Integrations",
  },
  {
    items: [
      {
        content:
          "Edit the component. Every block is meant to be forked: swap type, color, and copy until it reads as yours.",
        id: "support-1",
        title: "Where do we go if a block does not match our brand?",
      },
      {
        content:
          "Open a GitHub issue with the block name, a screenshot, and steps to reproduce. Include the story name from Ladle if you have it.",
        id: "support-2",
        title: "How do we report an issue?",
      },
    ],
    title: "Customer Support",
  },
];

export function Faq5({
  title = "Frequently Asked Questions",
  description = "Quick answers to common questions about getting started, checkout, integrations, and customer support.",
  groups = defaultGroups,
  className,
}: Faq5Props) {
  return (
    <section className={cn("mx-auto w-full max-w-3xl px-4 py-16", className)}>
      <header className="mb-16 space-y-3 text-center">
        <h2 className="font-semibold text-3xl tracking-tight md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>

      <div className="space-y-12">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 font-medium text-lg">{group.title}</h3>
            <Accordion className="border-t" collapsible type="single">
              {group.items.map((item) => (
                <AccordionItem
                  className="border-b"
                  key={item.id}
                  value={item.id}
                >
                  <AccordionTrigger className="py-4 text-base hover:no-underline focus-visible:underline focus-visible:ring-0">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  );
}
