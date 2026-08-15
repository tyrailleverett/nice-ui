import { MarketingSection } from "@/components/marketing-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface Faq2Item {
  content: string;
  id: string;
  title: string;
}

export interface Faq2Contact {
  href: string;
  label: string;
}

export interface Faq2Props {
  className?: string;
  contact?: Faq2Contact;
  contactPrompt?: string;
  description?: string;
  questions?: Faq2Item[];
  title?: string;
}

const defaultQuestions: Faq2Item[] = [
  {
    content:
      "Nice UI is a collection of shadcn-compatible marketing and dashboard blocks, designed to help you ship modern websites without starting from a blank canvas.",
    id: "item-1",
    title: "What is Nice UI?",
  },
  {
    content:
      "Nice UI is built for founders, product teams, and agencies that want to accelerate idea validation and delivery.",
    id: "item-2",
    title: "Who can benefit from Nice UI?",
  },
  {
    content:
      "Nice UI gives you reusable UI blocks, a Ladle playground for preview, and a shadcn registry so you can drop components into any project. Use it to streamline your team's workflow and ship high-quality websites quickly.",
    id: "item-3",
    title: "What features does Nice UI include?",
  },
  {
    content:
      "Yes. Every block is regular React and Tailwind, so you can tailor the design system, copy, and layout to your brand.",
    id: "item-4",
    title: "Can I customize components in Nice UI?",
  },
  {
    content:
      "Install blocks with the shadcn CLI into any project that already uses shadcn/ui, Tailwind, and your current stack.",
    id: "item-5",
    title: "Does Nice UI integrate with my existing tools?",
  },
  {
    content:
      "Start with the docs and GitHub issues. For product questions, reach the team through the contact link on this page.",
    id: "item-6",
    title: "How do I get support while using Nice UI?",
  },
  {
    content:
      "Browse the blocks in Ladle, then add the ones you need with the shadcn CLI. Copy, compose, and ship.",
    id: "item-7",
    title: "How do I get started with Nice UI?",
  },
];

export function Faq2({
  title = "FAQs",
  description = "Here are some common questions and answers that you might encounter when using Nice UI.",
  questions = defaultQuestions,
  contactPrompt = "Can't find what you're looking for?",
  contact = { href: "#", label: "Contact Us" },
  className,
}: Faq2Props) {
  return (
    <MarketingSection className={className}>
      <div className="mx-4 grid grid-cols-1 border-x md:mx-0 md:grid-cols-2 md:border-x-0">
        <div className="space-y-4 px-4 pt-12 pb-4 md:border-r">
          <h2 className="font-display-heading text-3xl md:text-4xl">{title}</h2>
          {description ? (
            <p className="text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="place-content-center">
          <Accordion className="rounded-none border-x-0 border-y">
            {questions.map((item) => (
              <AccordionItem className="px-4" key={item.id} value={item.id}>
                <AccordionTrigger className="py-4 hover:no-underline focus-visible:underline focus-visible:ring-0">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      {contact ? (
        <div className="flex h-14 items-center justify-center border-t">
          <p className="text-muted-foreground">
            {contactPrompt}{" "}
            <a className="text-primary hover:underline" href={contact.href}>
              {contact.label}
            </a>
          </p>
        </div>
      ) : null}
    </MarketingSection>
  );
}
