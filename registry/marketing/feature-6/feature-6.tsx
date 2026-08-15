import {
  ActivityIcon,
  ArrowRightLeftIcon,
  ArrowUpIcon,
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  CloudDownloadIcon,
  HardDriveDownloadIcon,
  HistoryIcon,
  Link2Icon,
  ListChecksIcon,
  MailIcon,
  Mic2Icon,
  MonitorDownIcon,
  PlugIcon,
  PlusIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Feature6Highlight {
  icon: ReactNode;
  label: string;
}

export interface Feature6Item {
  description: ReactNode;
  highlights: Feature6Highlight[];
  id: string;
  label: string;
  title: string;
  visual: ReactNode;
}

export interface Feature6Props {
  className?: string;
  items?: Feature6Item[];
  title?: ReactNode;
}

function FeatureList({ items }: { items: Feature6Highlight[] }) {
  return (
    <ul className="mt-8 divide-y text-muted-foreground *:flex *:items-center *:gap-3 *:py-3">
      {items.map(({ icon, label }) => (
        <li key={label}>
          {icon}
          {label}
        </li>
      ))}
    </ul>
  );
}

function DownloadIllustration() {
  return (
    <div className="absolute inset-0 z-1 m-auto size-fit scale-95">
      <Button
        className="inset-ring inset-ring-foreground/25 ml-1 bg-background/25 backdrop-blur"
        nativeButton={false}
        render={<div />}
        size="sm"
        variant="secondary"
      >
        <HardDriveDownloadIcon className="opacity-75" />
        <span className="border-r pr-2">Download</span>
        <ChevronDownIcon className="opacity-50" />
      </Button>

      <div className="mt-3 min-w-52 rounded-2xl bg-white p-1 shadow-black/10 shadow-xl ring ring-black/10 *:cursor-pointer">
        <div className="peer flex gap-2 rounded-xl px-3 py-1.5 hover:bg-black/5">
          <MonitorDownIcon className="size-4 translate-y-0.5 text-black" />
          <div className="space-y-0.5">
            <div className="font-medium text-black text-xs">Computer</div>
            <div className="text-muted-foreground text-xs">16.1MB left</div>
          </div>
        </div>

        <div className="flex gap-2 rounded-xl not-peer-hover:bg-black/5 px-3 py-1.5">
          <CloudDownloadIcon className="size-4 translate-y-0.5 text-black" />
          <div className="space-y-0.5">
            <div className="font-medium text-black text-xs">Cloud</div>
            <div className="text-muted-foreground text-xs">Unlimited</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIInputIllustration() {
  return (
    <div
      aria-hidden
      className="absolute inset-8 z-1 m-auto h-fit max-w-sm scale-95"
    >
      <div className="mt-auto h-fit rounded-3xl bg-card p-3 shadow-black/15 shadow-xl ring ring-foreground/15">
        <div className="p-2 pb-3 text-muted-foreground text-sm">
          Ask Nice UI what you need...
        </div>
        <div className="flex justify-between gap-3">
          <div className="flex items-center gap-1">
            <div className="flex size-7 cursor-pointer rounded-full *:m-auto *:size-4 hover:bg-muted">
              <PlusIcon />
            </div>
            <div className="flex size-7 cursor-pointer rounded-full *:m-auto *:size-4 hover:bg-muted">
              <Mic2Icon />
            </div>
          </div>

          <div className="flex size-7 cursor-pointer rounded-full bg-foreground text-background *:m-auto *:size-4 hover:brightness-110">
            <ArrowUpIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

function DynamicIslandIllustration() {
  return (
    <div
      aria-hidden
      className="mask-b-from-background absolute inset-x-8 bottom-0 z-1 mx-auto mt-auto h-2/3 w-10/12 max-w-96 origin-bottom scale-95 rounded-t-[4rem] border border-border/50 px-4 pt-4"
    >
      <div className="h-full overflow-hidden rounded-t-[3rem] bg-foreground/2 p-3 shadow-black/15 shadow-lg ring ring-foreground/10">
        <div className="relative">
          <div className="relative rounded-[2.25rem] bg-card p-2 shadow-black/10 shadow-xl ring ring-foreground/10">
            <div className="flex gap-2">
              <div className="relative size-18 overflow-hidden rounded-[1.75rem] shadow-md before:absolute before:inset-0 before:rounded-[1.75rem] before:border before:border-black/20">
                <img
                  alt="Théo Balick"
                  height={136}
                  src="https://images.unsplash.com/photo-1782366951390-d6798e902db7?q=80&w=1015&auto=format&fit=crop"
                  width={136}
                />
              </div>
              <div className="py-1 pr-4">
                <div className="font-medium text-sm">Théo Balick</div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Expenses
                    </div>
                    <div className="mt-0.5 font-semibold text-sm">$32.65k</div>
                  </div>
                  <div className="h-7 w-px bg-border" />
                  <div>
                    <div className="text-muted-foreground text-xs">Income</div>
                    <div className="mt-0.5 font-semibold text-sm">$2.65k</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultItems: Feature6Item[] = [
  {
    description:
      "Email, chat, and support history stay on the account so nobody works from memory.",
    highlights: [
      {
        icon: <ArrowRightLeftIcon className="size-4" />,
        label: "Automated handoff routing",
      },
      {
        icon: <ListChecksIcon className="size-4" />,
        label: "Account playbooks",
      },
      { icon: <ZapIcon className="size-4" />, label: "Follow-up task agents" },
    ],
    id: "workflow-agents",
    label: "Workflow agents",
    title: "Seamless handoffs.",
    visual: (
      <div className="relative m-auto aspect-76/59 max-w-sm rounded-2xl bg-linear-to-b from-zinc-300 to-transparent p-px dark:from-zinc-700">
        <img
          alt="Payments illustration"
          className="rounded-[15px] dark:hidden"
          height={929}
          src="/screenshots/workflow-light.png"
          width={1207}
        />
        <img
          alt="Payments illustration"
          className="hidden rounded-[15px] dark:block"
          height={929}
          src="/screenshots/workflow-dark.png"
          width={1207}
        />
      </div>
    ),
  },
  {
    description:
      "Surface renewals, quiet accounts, and stalled deals before they slip past quarter end.",
    highlights: [
      { icon: <BellIcon className="size-4" />, label: "Renewal reminders" },
      { icon: <ClockIcon className="size-4" />, label: "Stalled deal signals" },
      {
        icon: <ActivityIcon className="size-4" />,
        label: "Quiet account alerts",
      },
    ],
    id: "alerts",
    label: "Alerts",
    title: "Proactive alerts.",
    visual: <AIInputIllustration />,
  },
  {
    description: (
      <>
        Sales, success, and support work from one account view so{" "}
        <span className="rounded bg-success/10 px-1.5 text-success">
          every handoff keeps context
        </span>
        .
      </>
    ),
    highlights: [
      {
        icon: <HistoryIcon className="size-4" />,
        label: "Full activity history",
      },
      { icon: <UsersIcon className="size-4" />, label: "Team-visible notes" },
      { icon: <MailIcon className="size-4" />, label: "Cross-channel threads" },
    ],
    id: "timeline",
    label: "Timeline",
    title: "Shared timeline.",
    visual: <DynamicIslandIllustration />,
  },
  {
    description:
      "Sync email, calendar, and billing tools so customer data stays current across your workflow.",
    highlights: [
      {
        icon: <PlugIcon className="size-4" />,
        label: "Gmail and Outlook sync",
      },
      {
        icon: <CalendarIcon className="size-4" />,
        label: "Calendar availability",
      },
      {
        icon: <Link2Icon className="size-4" />,
        label: "Billing and Stripe data",
      },
    ],
    id: "integrations",
    label: "Integrations",
    title: "Connected stack.",
    visual: <DownloadIllustration />,
  },
];

function FeatureNavButton({
  item,
  isActive,
  onSelect,
}: {
  item: Feature6Item;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(item.id);
  }, [item.id, onSelect]);

  return (
    <Button
      className="not-data-[state=active]:text-muted-foreground hover:bg-transparent"
      data-state={isActive ? "active" : "inactive"}
      onClick={handleClick}
      type="button"
      variant="ghost"
    >
      {item.label}
    </Button>
  );
}

function FeatureSection({
  item,
  registerRef,
}: {
  item: Feature6Item;
  registerRef: (id: string, element: HTMLDivElement | null) => void;
}) {
  const setRef = useCallback(
    (element: HTMLDivElement | null) => {
      registerRef(item.id, element);
    },
    [item.id, registerRef]
  );

  return (
    <div
      className="grid scroll-mt-32 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:gap-12"
      id={item.id}
      ref={setRef}
    >
      <div className="flex flex-col justify-between pb-4 md:col-span-2">
        <div className="md:pr-6 lg:pr-0">
          <h3 className="mb-6 font-medium text-muted-foreground text-sm">
            {item.label}
          </h3>
          <p className="text-balance font-medium text-lg text-muted-foreground">
            <span className="text-foreground">{item.title}</span>{" "}
            {item.description}
          </p>
        </div>
        <FeatureList items={item.highlights} />
      </div>
      <div
        className={cn(
          "relative flex aspect-square rounded-3xl border border-border/50 bg-foreground/2 p-3 md:col-span-3",
          item.id === "integrations" && "bg-zinc-100 dark:bg-zinc-900"
        )}
      >
        {item.visual}
      </div>
    </div>
  );
}

export function Feature6({
  title = (
    <>
      <span className="text-foreground">Built for the full workflow.</span>
      <br /> One connected revenue product.
    </>
  ),
  items = defaultItems,
  className,
}: Feature6Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const sectionRefs = useRef<Partial<Record<string, HTMLDivElement | null>>>(
    {}
  );

  const scrollToFeature = useCallback((id: string) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveId(id);
  }, []);

  const registerRef = useCallback(
    (id: string, element: HTMLDivElement | null) => {
      sectionRefs.current[id] = element;
    },
    []
  );

  useEffect(() => {
    const sections = items
      .map((item) => sectionRefs.current[item.id])
      .filter((section): section is HTMLDivElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.id;
        if (nextId) {
          setActiveId(nextId);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55, 0.75] }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-4xl text-balance font-display-heading text-4xl text-muted-foreground">
          {title}
        </h2>
        <div className="mt-16 grid gap-6 md:mt-32 lg:grid-cols-[auto_1fr]">
          <div className="sticky top-24 h-fit w-56 max-lg:hidden">
            <div className="text-muted-foreground text-sm">Product</div>
            <div className="mt-4 -ml-4 flex flex-col *:justify-start">
              {items.map((item) => (
                <FeatureNavButton
                  isActive={activeId === item.id}
                  item={item}
                  key={item.id}
                  onSelect={scrollToFeature}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-16 md:gap-32">
            {items.map((item) => (
              <FeatureSection
                item={item}
                key={item.id}
                registerRef={registerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
