import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Integrations1Item {
  description: string;
  isInvertable?: boolean;
  name: string;
  src: string;
}

export interface Integrations1Action {
  href?: string;
  label: string;
}

export interface Integrations1Props {
  className?: string;
  integrations?: Integrations1Item[];
  viewAll?: Integrations1Action;
}

const defaultIntegrations: Integrations1Item[] = [
  {
    description: "Preview every commit and ship the marketing site from git.",
    isInvertable: true,
    name: "Vercel",
    src: "https://svgl.app/library/vercel.svg",
  },
  {
    description: "Drop models into onboarding, search, and support flows.",
    isInvertable: true,
    name: "OpenAI",
    src: "https://svgl.app/library/openai.svg",
  },
  {
    description: "Auth, database, and storage without a custom backend.",
    name: "Supabase",
    src: "https://svgl.app/library/supabase.svg",
  },
  {
    description: "Keep product specs and launch notes in one workspace.",
    name: "Notion",
    src: "https://svgl.app/library/notion.svg",
  },
];

export function Integrations1({
  integrations = defaultIntegrations,
  viewAll = { href: "#", label: "View all integrations" },
  className,
}: Integrations1Props) {
  return (
    <section
      className={cn(
        "mx-auto grid max-w-5xl gap-1 overflow-hidden rounded-md bg-secondary p-1 sm:grid-cols-2 lg:grid-cols-4 dark:bg-secondary/50",
        className
      )}
    >
      {integrations.map((item) => (
        <div
          className="flex flex-col justify-between gap-2 rounded-md bg-background p-6 shadow-sm"
          key={item.name}
        >
          <img
            alt=""
            className={cn(
              "pointer-events-none size-8 shrink-0 select-none object-contain",
              item.isInvertable && "dark:invert"
            )}
            height={32}
            src={item.src}
            width={32}
          />
          <div className="space-y-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              {item.description}
            </p>
          </div>
        </div>
      ))}
      {viewAll ? (
        <div className="relative flex items-center justify-center p-1 sm:col-span-2 lg:col-span-4">
          {viewAll.href ? (
            <Button
              className="text-xs"
              nativeButton={false}
              render={<a href={viewAll.href} />}
              size="sm"
              variant="link"
            >
              {viewAll.label}
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          ) : (
            <Button className="text-xs" size="sm" type="button" variant="link">
              {viewAll.label}
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          )}
        </div>
      ) : null}
    </section>
  );
}
