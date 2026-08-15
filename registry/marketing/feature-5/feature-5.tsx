import {
  ArrowUpIcon,
  ChevronDownIcon,
  CloudDownloadIcon,
  HardDriveDownloadIcon,
  Mic2Icon,
  MonitorDownIcon,
  PlusIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface Feature5Column {
  description: string;
  media: ReactNode;
  title: string;
}

export interface Feature5Props {
  className?: string;
  columns?: Feature5Column[];
  title?: ReactNode;
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

      <div className="mt-3 min-w-52 rounded-2xl bg-white p-1 shadow-black/25 shadow-xl ring ring-black/10 *:cursor-pointer">
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
    <div aria-hidden className="absolute inset-8 z-1 m-auto h-fit scale-95">
      <div className="mt-auto h-fit rounded-3xl bg-card p-3 shadow-black/25 shadow-xl ring ring-foreground/15">
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
      className="absolute inset-x-8 bottom-0 z-1 mx-auto mt-auto h-2/3 w-10/12 origin-bottom scale-95 rounded-t-[4rem] border border-black/5 bg-black/5 px-4 pt-4"
    >
      <div className="h-full overflow-hidden rounded-t-[3rem] bg-white p-3 shadow-black/15 shadow-lg ring ring-black/10">
        <div className="relative">
          <img
            alt=""
            className="absolute inset-0 top-0 size-full object-cover opacity-45 blur-xl contrast-200"
            height={500}
            src="https://images.unsplash.com/photo-1782366951390-d6798e902db7?q=80&w=1015&auto=format&fit=crop"
            width={500}
          />
          <div className="relative rounded-[2.25rem] bg-white p-2 shadow-black/10 shadow-xl ring ring-black/10">
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
                <div className="font-medium text-black text-sm">
                  Théo Balick
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Expenses
                    </div>
                    <div className="mt-0.5 font-semibold text-black text-sm">
                      $32.65k
                    </div>
                  </div>
                  <div className="h-7 w-px bg-border" />
                  <div>
                    <div className="text-muted-foreground text-xs">Income</div>
                    <div className="mt-0.5 font-semibold text-black text-sm">
                      $2.65k
                    </div>
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

const defaultColumns: Feature5Column[] = [
  {
    description: "Ownership changes without resetting the relationship.",
    media: (
      <Card className="relative aspect-9/12 overflow-hidden">
        <AIInputIllustration />
        <img
          alt="Abstract background"
          className="absolute inset-0 size-full object-cover"
          height={670}
          src="https://images.unsplash.com/photo-1656012710277-e103fe942e30?q=80&w=2342&auto=format&fit=crop"
          width={670}
        />
      </Card>
    ),
    title: "Seamless handoffs.",
  },
  {
    description: "Surface renewals and quiet accounts before they slip.",
    media: (
      <Card className="relative aspect-9/12 overflow-hidden bg-zinc-200!">
        <DynamicIslandIllustration />
      </Card>
    ),
    title: "Proactive alerts.",
  },
  {
    description: "Sales, success, and support work from one account view.",
    media: (
      <Card className="relative aspect-9/12 overflow-hidden">
        <DownloadIllustration />
        <video
          autoPlay
          className="absolute inset-0 size-full object-cover"
          height={1440}
          loop
          muted
          playsInline
          preload="none"
          src="https://videos.pexels.com/video-files/37957431/16106725_1440_2560_24fps.mp4"
          width={2700}
        />
      </Card>
    ),
    title: "Shared timeline.",
  },
];

export function Feature5({
  title = (
    <>
      <span className="text-foreground">Context before every reply.</span>
      <br /> Grounded in real account history.
    </>
  ),
  columns = defaultColumns,
  className,
}: Feature5Props) {
  return (
    <MarketingSection className={className}>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="max-w-4xl text-balance font-display-heading text-4xl text-muted-foreground">
            {title}
          </h2>
          <div className="mt-8 grid gap-x-3 gap-y-6 **:data-[slot=card]:bg-background md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {columns.map((column) => (
              <div
                className="row-span-2 grid grid-cols-subgrid gap-4"
                key={column.title}
              >
                {column.media}
                <p className="text-balance text-muted-foreground">
                  <span className="text-foreground">{column.title} </span>
                  {column.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
