import { SearchIcon, SearchSlashIcon } from "lucide-react";
import { type ChangeEvent, useCallback, useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface Faq4Category {
  id: string;
  label: string;
}

export interface Faq4Item {
  category: string;
  content: string;
  id: string;
  title: string;
}

export interface Faq4Contact {
  href: string;
  label: string;
}

export interface Faq4Props {
  categories?: Faq4Category[];
  className?: string;
  clearSearchLabel?: string;
  contact?: Faq4Contact;
  contactPrompt?: string;
  description?: string;
  emptyTitle?: string;
  questions?: Faq4Item[];
  searchPlaceholder?: string;
  title?: string;
}

const defaultCategories: Faq4Category[] = [
  { id: "all", label: "All" },
  { id: "getting-started", label: "Getting Started" },
  { id: "features", label: "Features" },
  { id: "billing", label: "Billing" },
  { id: "support", label: "Support" },
];

const defaultQuestions: Faq4Item[] = [
  {
    category: "getting-started",
    content:
      "Browse the Ladle playground, pick a block, then install it with the shadcn CLI. Drop it into your page and customize the copy and layout.",
    id: "1",
    title: "How do I add my first block?",
  },
  {
    category: "getting-started",
    content:
      "Nice UI works in any modern browser including Chrome, Firefox, Safari, and Edge. Blocks install into projects that already use shadcn/ui and Tailwind.",
    id: "2",
    title: "What are the system requirements?",
  },
  {
    category: "features",
    content:
      "Yes. Share the registry, compose blocks in a shared codebase, and keep design decisions in the components themselves so the whole team ships from the same set.",
    id: "3",
    title: "Can I use Nice UI for team collaboration?",
  },
  {
    category: "features",
    content:
      "Nice UI includes marketing and dashboard blocks built on shadcn primitives. You can also create your own blocks and publish them the same way.",
    id: "4",
    title: "Is there a component library?",
  },
  {
    category: "features",
    content:
      "Blocks are regular React. Wire them to GitHub, Figma, Slack, or your own APIs the same way you would any other component.",
    id: "5",
    title: "Do you support custom integrations?",
  },
  {
    category: "billing",
    content:
      "Nice UI is open to install from the registry. If you need a commercial license or support plan, contact the team to discuss options.",
    id: "6",
    title: "What payment methods do you accept?",
  },
  {
    category: "billing",
    content:
      "If you are on a support plan, you can upgrade or downgrade at any time. Changes take effect on the next billing cycle.",
    id: "7",
    title: "Can I change my plan anytime?",
  },
  {
    category: "support",
    content:
      "Open a GitHub issue with steps to reproduce, the block name, and a screenshot. We typically respond within a day.",
    id: "8",
    title: "How do I report a bug?",
  },
  {
    category: "support",
    content:
      "The playground and docs cover most setups. For teams that want a walkthrough, contact us for a working session.",
    id: "9",
    title: "Do you offer training or onboarding?",
  },
];

export function Faq4({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about Nice UI. Can't find what you're looking for? Our support team is here to help.",
  searchPlaceholder = "Search FAQs...",
  categories = defaultCategories,
  questions = defaultQuestions,
  emptyTitle = "No FAQs found matching your search.",
  clearSearchLabel = "Clear search",
  contactPrompt = "Can't find what you're looking for?",
  contact = { href: "#", label: "Contact Us" },
  className,
}: Faq4Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.id ?? "all"
  );

  const filtered = useMemo(() => {
    const query = searchTerm.toLowerCase();

    return questions.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        faq.title.toLowerCase().includes(query) ||
        faq.content.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, questions, searchTerm]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleCategoryChange = useCallback((value: string) => {
    if (value) {
      setActiveCategory(value);
    }
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  return (
    <section className={cn("mx-auto w-full max-w-3xl md:border-x", className)}>
      <div className="px-4 py-16 lg:px-6">
        <h2 className="mb-4 font-semibold text-3xl md:text-4xl">{title}</h2>
        {description ? (
          <p className="mb-8 max-w-2xl text-muted-foreground">{description}</p>
        ) : null}

        <InputGroup className="max-w-sm">
          <InputGroupInput
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            type="search"
            value={searchTerm}
          />
          <InputGroupAddon>
            <SearchIcon data-icon="inline-start" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <Tabs
        className="gap-0"
        onValueChange={handleCategoryChange}
        value={activeCategory}
      >
        <TabsList
          className="h-auto w-full justify-start rounded-none border-y bg-transparent px-4 py-0 md:gap-3"
          variant="line"
        >
          {categories.map((category) => (
            <TabsTrigger
              className="flex-none p-1 text-muted-foreground text-sm md:p-2 md:text-base"
              key={category.id}
              value={category.id}
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length > 0 ? (
        <Accordion
          className="space-y-2 border-0! px-4 py-12 lg:px-6"
          collapsible
          type="single"
        >
          {filtered.map((faq) => (
            <AccordionItem
              className="rounded-lg border px-4 shadow-xs"
              key={faq.id}
              value={faq.id}
            >
              <AccordionTrigger className="hover:no-underline">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 text-muted-foreground">
                {faq.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>{emptyTitle}</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={handleClearSearch} variant="outline">
              <SearchSlashIcon data-icon="inline-start" />
              {clearSearchLabel}
            </Button>
          </EmptyContent>
        </Empty>
      )}

      {contact ? (
        <div className="flex items-center px-4 py-6 lg:px-6">
          <p className="text-muted-foreground">
            {contactPrompt}{" "}
            <a className="text-primary hover:underline" href={contact.href}>
              {contact.label}
            </a>
          </p>
        </div>
      ) : null}
    </section>
  );
}
