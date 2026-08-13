import { SearchIcon, SearchSlashIcon } from "lucide-react"
import { useMemo, useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

export type Faq4Category = {
  id: string
  label: string
}

export type Faq4Item = {
  id: string
  category: string
  title: string
  content: string
}

export type Faq4Contact = {
  href: string
  label: string
}

export type Faq4Props = {
  title?: string
  description?: string
  searchPlaceholder?: string
  categories?: Faq4Category[]
  questions?: Faq4Item[]
  emptyTitle?: string
  clearSearchLabel?: string
  contactPrompt?: string
  contact?: Faq4Contact
  className?: string
}

const defaultCategories: Faq4Category[] = [
  { id: "all", label: "All" },
  { id: "getting-started", label: "Getting Started" },
  { id: "features", label: "Features" },
  { id: "billing", label: "Billing" },
  { id: "support", label: "Support" },
]

const defaultQuestions: Faq4Item[] = [
  {
    id: "1",
    category: "getting-started",
    title: "How do I add my first block?",
    content:
      "Browse the Ladle playground, pick a block, then install it with the shadcn CLI. Drop it into your page and customize the copy and layout.",
  },
  {
    id: "2",
    category: "getting-started",
    title: "What are the system requirements?",
    content:
      "Nice UI works in any modern browser including Chrome, Firefox, Safari, and Edge. Blocks install into projects that already use shadcn/ui and Tailwind.",
  },
  {
    id: "3",
    category: "features",
    title: "Can I use Nice UI for team collaboration?",
    content:
      "Yes. Share the registry, compose blocks in a shared codebase, and keep design decisions in the components themselves so the whole team ships from the same set.",
  },
  {
    id: "4",
    category: "features",
    title: "Is there a component library?",
    content:
      "Nice UI includes marketing and dashboard blocks built on shadcn primitives. You can also create your own blocks and publish them the same way.",
  },
  {
    id: "5",
    category: "features",
    title: "Do you support custom integrations?",
    content:
      "Blocks are regular React. Wire them to GitHub, Figma, Slack, or your own APIs the same way you would any other component.",
  },
  {
    id: "6",
    category: "billing",
    title: "What payment methods do you accept?",
    content:
      "Nice UI is open to install from the registry. If you need a commercial license or support plan, contact the team to discuss options.",
  },
  {
    id: "7",
    category: "billing",
    title: "Can I change my plan anytime?",
    content:
      "If you are on a support plan, you can upgrade or downgrade at any time. Changes take effect on the next billing cycle.",
  },
  {
    id: "8",
    category: "support",
    title: "How do I report a bug?",
    content:
      "Open a GitHub issue with steps to reproduce, the block name, and a screenshot. We typically respond within a day.",
  },
  {
    id: "9",
    category: "support",
    title: "Do you offer training or onboarding?",
    content:
      "The playground and docs cover most setups. For teams that want a walkthrough, contact us for a working session.",
  },
]

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
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.id ?? "all"
  )

  const filtered = useMemo(() => {
    const query = searchTerm.toLowerCase()

    return questions.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory
      const matchesSearch =
        faq.title.toLowerCase().includes(query) ||
        faq.content.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, questions, searchTerm])

  return (
    <section
      className={cn("mx-auto w-full max-w-3xl md:border-x", className)}
    >
      <div className="px-4 py-16 lg:px-6">
        <h2 className="mb-4 font-semibold text-3xl md:text-4xl">{title}</h2>
        {description ? (
          <p className="mb-8 max-w-2xl text-muted-foreground">{description}</p>
        ) : null}

        <InputGroup className="max-w-sm">
          <InputGroupInput
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={searchPlaceholder}
            type="search"
            value={searchTerm}
          />
          <InputGroupAddon>
            <SearchIcon data-icon="inline-start" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex flex-wrap gap-1 border-y px-4 md:gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.id

          return (
            <button
              aria-pressed={isActive}
              className="flex flex-col"
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              type="button"
            >
              <span
                className={cn(
                  "p-1 text-muted-foreground text-sm hover:text-primary md:p-2 md:text-base",
                  isActive && "text-primary"
                )}
              >
                {category.label}
              </span>
              {isActive ? (
                <span className="h-0.5 w-full rounded-full bg-primary" />
              ) : null}
            </button>
          )
        })}
      </div>

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
            <Button onClick={() => setSearchTerm("")} variant="outline">
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
  )
}
