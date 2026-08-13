import {
  ArrowUpIcon,
  CalendarCheckIcon,
  GlobeIcon,
  LayoutIcon,
  PlayIcon,
  PlusIcon,
  SignatureIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const MESCHAC_AVATAR = "https://avatars.githubusercontent.com/u/47919550?v=4"
const BERNARD_AVATAR = "https://avatars.githubusercontent.com/u/31113941?v=4"
const THEO_AVATAR = "https://avatars.githubusercontent.com/u/68236786?v=4"
const GLODIE_AVATAR = "https://avatars.githubusercontent.com/u/99137927?v=4"

export type Feature11Screenshot = {
  src: string
  alt: string
}

export type Feature11Props = {
  screenshot?: Feature11Screenshot
  className?: string
}

function MeetingIllustration() {
  return (
    <Card aria-hidden className="mt-9 aspect-video p-4">
      <div className="mb-0.5 font-semibold text-sm">AI Strategy Meeting</div>
      <div className="mb-4 flex gap-2 text-sm">
        <span className="text-muted-foreground">2:30 - 3:45 PM</span>
      </div>
      <div className="mb-2 flex -space-x-1.5">
        <div className="flex -space-x-1.5">
          {[
            { src: MESCHAC_AVATAR, alt: "Méschac Irung" },
            { src: BERNARD_AVATAR, alt: "Bernard Ngandu" },
            { src: THEO_AVATAR, alt: "Théo Balick" },
            { src: GLODIE_AVATAR, alt: "Glodie Lukose" },
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
  )
}

function CodeReviewIllustration() {
  return (
    <div aria-hidden className="relative mt-6">
      <Card className="aspect-video w-4/5 translate-y-4 p-3 transition-transform duration-200 ease-in-out group-hover:-rotate-3">
        <div className="mb-3 flex items-center gap-2">
          <div className="size-6 rounded-full border bg-background p-0.5 shadow shadow-zinc-950/5">
            <img
              alt="M Irung"
              className="aspect-square rounded-full object-cover"
              height={28}
              src={MESCHAC_AVATAR}
              width={28}
            />
          </div>
          <span className="font-medium text-muted-foreground text-sm">
            Méschac Irung
          </span>
          <span className="text-muted-foreground/75 text-xs">2m</span>
        </div>

        <div className="ml-8 space-y-2">
          <div className="h-2 rounded-full bg-foreground/10" />
          <div className="h-2 w-3/5 rounded-full bg-foreground/10" />
          <div className="h-2 w-1/2 rounded-full bg-foreground/10" />
        </div>

        <SignatureIcon className="mt-3 ml-8 size-5" />
      </Card>
      <Card className="absolute top-[-1rem] right-0 flex aspect-3/5 w-2/5 translate-y-4 p-2 transition-transform duration-200 ease-in-out group-hover:rotate-3">
        <div className="m-auto flex size-10 rounded-full bg-foreground/5">
          <PlayIcon className="m-auto size-4 fill-foreground/50 stroke-foreground/50" />
        </div>
      </Card>
    </div>
  )
}

function AIAssistantIllustration() {
  return (
    <Card
      aria-hidden
      className="mt-6 aspect-video translate-y-4 p-4 pb-6 transition-transform duration-200 group-hover:translate-y-0"
    >
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

          <Button className="size-7 rounded-2xl bg-black text-white" size="icon">
            <ArrowUpIcon strokeWidth={3} />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function Feature11({
  screenshot = {
    src: "https://storage.efferd.com/screen/dashboard-light.webp",
    alt: "App screen",
  },
  className,
}: Feature11Props) {
  return (
    <section className={className}>
      <div className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full overflow-hidden bg-muted/50 pt-6 pl-6 ring-0">
              <LayoutIcon className="size-5 text-primary" />
              <h3 className="mt-5 font-semibold text-foreground text-lg">
                AI Code Generation
              </h3>
              <p className="mt-3 max-w-xl text-balance text-muted-foreground">
                Transform natural language into production-ready code and iterate
                faster across the whole workflow.
              </p>
              <div className="-mt-2 -ml-2 mr-0.5 mask-b-from-95% pt-2 pl-2">
                <div className="relative mx-auto mt-8 h-96 overflow-hidden rounded-tl-xl border border-transparent bg-background shadow ring-1 ring-foreground/5">
                  <img
                    alt={screenshot.alt}
                    className="h-full object-cover object-top-left"
                    height={1842}
                    src={screenshot.src}
                    width={2880}
                  />
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden bg-muted/50 p-6 ring-0">
              <TargetIcon className="size-5 text-primary" />
              <h3 className="mt-5 font-semibold text-foreground text-lg">
                Team planning
              </h3>
              <p className="mt-3 text-balance text-muted-foreground">
                Keep reviews, meetings, and owners on the same page.
              </p>
              <MeetingIllustration />
            </Card>
            <Card className="group overflow-hidden bg-muted/50 px-6 pt-6 ring-0">
              <CalendarCheckIcon className="size-5 text-primary" />
              <h3 className="mt-5 font-semibold text-foreground text-lg">
                Intelligent Code Review
              </h3>
              <p className="mt-3 text-balance text-muted-foreground">
                Catch bugs, security issues, and optimization opportunities.
              </p>
              <CodeReviewIllustration />
            </Card>
            <Card className="group overflow-hidden bg-muted/50 px-6 pt-6 ring-0">
              <SparklesIcon className="size-5 text-primary" />
              <h3 className="mt-5 font-semibold text-foreground text-lg">
                Contextual AI Assistant
              </h3>
              <p className="mt-3 text-balance text-muted-foreground">
                A companion that understands your codebase and helps solve complex
                problems.
              </p>
              <div className="-mx-2 -mt-2 mask-b-from-50 px-2 pt-2">
                <AIAssistantIllustration />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
