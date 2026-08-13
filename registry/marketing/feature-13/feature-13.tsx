import { ShieldIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type Feature13Logo = {
  src: string
  alt: string
}

export type Feature13Props = {
  title?: string
  description?: string
  logos?: Feature13Logo[]
  className?: string
}

const defaultLogos: Feature13Logo[] = [
  { src: "https://storage.efferd.com/logo/vercel.svg", alt: "Vercel" },
  { src: "https://storage.efferd.com/logo/slack.svg", alt: "Slack" },
  { src: "https://storage.efferd.com/logo/clerk.svg", alt: "Clerk" },
  { src: "https://storage.efferd.com/logo/linear.svg", alt: "Linear" },
  { src: "https://storage.efferd.com/logo/supabase.svg", alt: "Supabase" },
  { src: "https://storage.efferd.com/logo/firebase.svg", alt: "Firebase" },
]

function LogoPill({ src, alt }: Feature13Logo) {
  return (
    <div className="relative flex h-8 items-center rounded-full bg-card px-3 shadow-sm shadow-black/10 ring ring-border">
      <img
        alt={alt}
        className="size-3.5 object-contain dark:invert"
        height={14}
        src={src}
        width={14}
      />
    </div>
  )
}

export function Feature13({
  title = "Powerful features for modern teams",
  description = "Everything you need to build, connect, and scale your integrations effortlessly.",
  logos = defaultLogos,
  className,
}: Feature13Props) {
  const [vercel, slack, clerk, linear, supabase, firebase] = logos

  return (
    <section className={cn("@container bg-background py-24", className)}>
      <div className="mx-auto max-w-2xl px-6">
        <div>
          <h2 className="text-balance font-medium font-serif text-4xl">{title}</h2>
          {description ? (
            <p className="mt-4 text-balance text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="mt-12 grid gap-3 *:p-6 @xl:grid-cols-2">
          <Card className="row-span-2 grid grid-rows-subgrid shadow-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Seamless Integrations</h3>
              <p className="text-muted-foreground text-sm">
                Connect your favorite tools and services with just a few clicks.
              </p>
            </div>
            <div aria-hidden className="flex h-44 flex-col justify-between pt-8">
              <div className="relative flex h-10 items-center gap-12 px-6">
                <div className="absolute inset-0 my-auto h-px bg-border" />
                {vercel ? <LogoPill {...vercel} /> : null}
                {slack ? <LogoPill {...slack} /> : null}
              </div>
              <div className="relative flex h-10 items-center justify-between gap-12 pr-6 pl-17">
                <div className="absolute inset-0 my-auto h-px bg-border" />
                {clerk ? <LogoPill {...clerk} /> : null}
                {linear ? <LogoPill {...linear} /> : null}
              </div>
              <div className="relative flex h-10 items-center gap-20 px-8">
                <div className="absolute inset-0 my-auto h-px bg-border" />
                {supabase ? <LogoPill {...supabase} /> : null}
                {firebase ? <LogoPill {...firebase} /> : null}
              </div>
            </div>
          </Card>
          <Card className="row-span-2 grid grid-rows-subgrid overflow-hidden shadow-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Real-time Sync</h3>
              <p className="text-muted-foreground text-sm">
                Keep your data synchronized across all platforms automatically.
              </p>
            </div>
            <div aria-hidden className="relative h-44 translate-y-6">
              <div className="absolute inset-0 mx-auto w-px bg-foreground/15" />
              <div className="absolute -inset-x-16 top-6 aspect-square rounded-full border" />
              <div className="absolute -inset-x-16 top-6 aspect-square rounded-full border border-primary mask-l-from-50% mask-l-to-90% mask-r-from-50% mask-r-to-50%" />
              <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border" />
              <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border border-lime-500 mask-r-from-50% mask-r-to-90% mask-l-from-50% mask-l-to-50%" />
            </div>
          </Card>
          <Card className="row-span-2 grid grid-rows-subgrid overflow-hidden shadow-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Developer First</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Built with developers in mind, featuring comprehensive APIs and
                SDKs.
              </p>
            </div>
            <div
              aria-hidden
              className="flex h-44 justify-between pt-12 pb-6 *:h-full *:w-px *:bg-foreground/15"
            >
              {Array.from({ length: 32 }, (_, index) => (
                <div
                  className={cn(
                    [4, 9, 13, 18, 23, 31].includes(index) && "bg-primary!"
                  )}
                  key={index}
                />
              ))}
            </div>
          </Card>
          <Card className="row-span-2 grid grid-rows-subgrid shadow-sm">
            <div className="space-y-2">
              <h3 className="font-medium">Enterprise Ready</h3>
              <p className="text-muted-foreground text-sm">
                Scale confidently with enterprise-grade security and reliability.
              </p>
            </div>

            <div className="pointer-events-none relative -ml-7 flex size-44 items-center justify-center pt-5">
              <ShieldIcon className="absolute inset-0 top-2.5 size-full stroke-[0.1px] opacity-15" />
              <ShieldIcon className="size-32 stroke-[0.1px]" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
