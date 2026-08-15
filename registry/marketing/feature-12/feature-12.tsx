import {
  ArrowUpIcon,
  GlobeIcon,
  PlayIcon,
  PlusIcon,
  SignatureIcon,
  SparklesIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MESCHAC_AVATAR = "https://avatars.githubusercontent.com/u/47919550?v=4";
const BERNARD_AVATAR = "https://avatars.githubusercontent.com/u/31113941?v=4";
const THEO_AVATAR = "https://avatars.githubusercontent.com/u/68236786?v=4";
const GLODIE_AVATAR = "https://avatars.githubusercontent.com/u/99137927?v=4";

export interface Feature12Props {
  className?: string;
  mutedTitle?: string;
  title?: string;
}

function MeetingIllustration() {
  return (
    <Card aria-hidden className="p-4">
      <div className="mb-0.5 font-semibold text-sm">AI Strategy Meeting</div>
      <div className="mb-4 flex gap-2 text-sm">
        <span className="text-muted-foreground">2:30 - 3:45 PM</span>
      </div>
      <div className="mb-2 flex -space-x-1.5">
        <div className="flex -space-x-1.5">
          {[
            { alt: "Méschac Irung", src: MESCHAC_AVATAR },
            { alt: "Bernard Ngandu", src: BERNARD_AVATAR },
            { alt: "Théo Balick", src: THEO_AVATAR },
            { alt: "Glodie Lukose", src: GLODIE_AVATAR },
          ].map((avatar) => (
            <div
              className="size-7 rounded-full border bg-background p-0.5 shadow shadow-zinc-950/5"
              key={avatar.alt}
            >
              <img
                alt={avatar.alt}
                className="aspect-square rounded-full object-cover"
                height={32}
                src={avatar.src}
                width={32}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="font-medium text-muted-foreground text-sm">
        ML Pipeline Discussion
      </div>
    </Card>
  );
}

function CodeReviewIllustration() {
  return (
    <div aria-hidden className="relative">
      <Card className="aspect-video w-4/5 translate-y-2 p-3">
        <div className="mb-3 grid grid-cols-[auto_1fr] gap-2">
          <div className="size-6 rounded-full border bg-background p-0.5 shadow shadow-zinc-950/5">
            <img
              alt="M Irung"
              className="aspect-square rounded-full object-cover"
              height={28}
              src={MESCHAC_AVATAR}
              width={28}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="line-clamp-1 font-medium text-muted-foreground text-sm">
              Méschac Irung
            </span>
            <span className="text-muted-foreground text-xs">2m</span>
          </div>
        </div>

        <div className="ml-8 space-y-2">
          <div className="h-2 rounded-full bg-foreground/10" />
          <div className="h-2 w-3/5 rounded-full bg-foreground/10" />
          <div className="h-2 w-1/2 rounded-full bg-foreground/10" />
        </div>

        <SignatureIcon className="mt-3 ml-8 size-5" />
      </Card>
      <Card className="absolute top-4 right-0 flex aspect-3/5 w-2/5 translate-y-4 p-2">
        <div className="m-auto flex size-10 rounded-full bg-foreground/5">
          <PlayIcon className="m-auto size-4 fill-foreground/50 stroke-foreground/50" />
        </div>
      </Card>
    </div>
  );
}

function AIAssistantIllustration() {
  return (
    <Card aria-hidden className="p-4">
      <div className="ml-auto w-fit max-w-3/4">
        <p className="mb-2 rounded-t-2xl rounded-l-2xl rounded-br border border-foreground/5 bg-foreground/5 p-4 text-sm">
          Can you tighten this landing page copy without losing the product
          story?
        </p>
        <span className="block text-right text-muted-foreground text-xs">
          Now
        </span>
      </div>
      <div className="w-fit">
        <SparklesIcon className="size-3.5 fill-purple-300 stroke-purple-300" />
        <p className="mt-2 line-clamp-2 text-sm">
          How can I optimize my neural network to reduce inference time while
          maintaining accuracy?
        </p>
      </div>
      <div className="mt-3 -mr-3 -mb-3 -ml-3 space-y-3 rounded-lg bg-foreground/5 p-3">
        <div className="text-muted-foreground text-sm">Ask AI Assistant</div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              className="size-7 rounded-2xl bg-transparent shadow-none"
              size="icon"
              variant="outline"
            >
              <PlusIcon />
            </Button>
            <Button
              className="size-7 rounded-2xl bg-transparent shadow-none"
              size="icon"
              variant="outline"
            >
              <GlobeIcon />
            </Button>
          </div>

          <Button
            className="size-7 rounded-2xl bg-black text-white"
            size="icon"
          >
            <ArrowUpIcon strokeWidth={3} />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function Feature12({
  mutedTitle = "Empowering marketing teams with",
  title = "AI-driven solutions",
  className,
}: Feature12Props) {
  return (
    <section className={className}>
      <div className="py-24">
        <div className="mx-auto w-full max-w-3xl px-6">
          <h2 className="text-balance font-display-heading text-3xl text-foreground md:text-4xl">
            <span className="text-muted-foreground">{mutedTitle}</span> {title}
          </h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2">
            <div className="col-span-full space-y-4">
              <Card className="overflow-hidden bg-muted/50 px-6 ring-0 sm:col-span-2">
                <div className="mask-b-from-75% mx-auto -mt-2 max-w-sm px-2 pt-8">
                  <AIAssistantIllustration />
                </div>
              </Card>
              <div className="max-w-md sm:col-span-3">
                <h3 className="font-semibold text-foreground text-lg">
                  Contextual AI Assistant
                </h3>
                <p className="mt-3 text-balance text-muted-foreground">
                  A companion that understands your codebase and helps solve
                  complex problems.
                </p>
              </div>
            </div>
            <div className="grid grid-rows-[1fr_auto] space-y-4">
              <Card className="bg-muted/50 p-6 ring-0">
                <MeetingIllustration />
              </Card>
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  AI Code Generation
                </h3>
                <p className="mt-3 text-balance text-muted-foreground">
                  Transform natural language into production-ready code.
                </p>
              </div>
            </div>

            <div className="grid grid-rows-[1fr_auto] space-y-4">
              <Card className="overflow-hidden bg-muted/50 p-6 ring-0">
                <CodeReviewIllustration />
              </Card>
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  Intelligent Code Review
                </h3>
                <p className="mt-3 text-balance text-muted-foreground">
                  Catch bugs, security issues, and optimization opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
