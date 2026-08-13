import { ArrowRightIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Hero5Action = {
  href?: string
  label: string
}

export type Hero5Announcement = {
  eyebrow?: string
  label: string
  href?: string
}

export type Hero5Screenshot = {
  src: string
  alt: string
}

export type Hero5Logo = {
  src: string
  alt: string
}

export type Hero5Props = {
  announcement?: Hero5Announcement | null
  title?: string
  description?: string
  primaryCta?: Hero5Action | null
  secondaryCta?: Hero5Action | null
  screenshot?: Hero5Screenshot
  logos?: Hero5Logo[]
  logosCta?: Hero5Action | null
  className?: string
}

const defaultLogos: Hero5Logo[] = [
  {
    src: "https://storage.efferd.com/logo/bolt-wordmark.svg",
    alt: "Bolt",
  },
  {
    src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
    alt: "Vercel",
  },
  {
    src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
    alt: "Supabase",
  },
  {
    src: "https://storage.efferd.com/logo/openai-wordmark.svg",
    alt: "OpenAI",
  },
  {
    src: "https://storage.efferd.com/logo/github-wordmark.svg",
    alt: "GitHub",
  },
  {
    src: "https://storage.efferd.com/logo/claude-wordmark.svg",
    alt: "Claude",
  },
  {
    src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
    alt: "Clerk",
  },
  {
    src: "https://storage.efferd.com/logo/stripe-wordmark.svg",
    alt: "Stripe",
  },
]

function ActionButton({
  action,
  variant,
}: {
  action: Hero5Action
  variant?: "default" | "ghost"
}) {
  const content = <span className="text-nowrap">{action.label}</span>

  if (action.href) {
    return (
      <Button asChild variant={variant}>
        <a href={action.href}>{content}</a>
      </Button>
    )
  }

  return (
    <Button type="button" variant={variant}>
      {content}
    </Button>
  )
}

export function Hero5({
  announcement = {
    eyebrow: "New:",
    label: "Introducing the living customer graph",
    href: "#",
  },
  title = "Customer universe, beautifully connected",
  description = "Every account, signal, conversation, and next move in one living workspace that helps teams turn momentum into revenue.",
  primaryCta = { label: "Explore the graph", href: "#" },
  secondaryCta = { label: "Watch the flow", href: "#" },
  screenshot = {
    src: "https://storage.efferd.com/screen/dashboard-light.webp",
    alt: "Product dashboard",
  },
  logos = defaultLogos,
  logosCta = { label: "See the network", href: "#" },
  className,
}: Hero5Props) {
  return (
    <section className={cn("overflow-hidden", className)}>
      <div className="relative pt-24 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="px-6 text-center sm:mx-auto lg:mt-0 lg:mr-auto">
            {announcement ? (
              <a
                className="group mx-auto flex w-fit items-center gap-3 rounded-full p-1 pl-4 transition-colors duration-300"
                href={announcement.href ?? "#"}
              >
                {announcement.eyebrow ? (
                  <span className="font-medium text-sm">{announcement.eyebrow}</span>
                ) : null}
                <span className="text-muted-foreground text-sm">
                  {announcement.label}
                </span>
                <div className="size-6 overflow-hidden rounded-full duration-500">
                  <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                    <span className="flex size-6">
                      <ArrowRightIcon className="m-auto size-3" />
                    </span>
                    <span className="flex size-6">
                      <ArrowRightIcon className="m-auto size-3" />
                    </span>
                  </div>
                </div>
              </a>
            ) : null}

            <h1 className="mx-auto mt-8 max-w-4xl text-balance font-heading font-medium text-5xl tracking-tight md:text-6xl lg:mt-12 xl:text-7xl">
              {title}
            </h1>
            {description ? (
              <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground md:text-lg">
                {description}
              </p>
            ) : null}

            {primaryCta || secondaryCta ? (
              <div className="mt-6 flex flex-col items-center justify-center gap-2 md:flex-row">
                {primaryCta ? <ActionButton action={primaryCta} /> : null}
                {secondaryCta ? (
                  <ActionButton action={secondaryCta} variant="ghost" />
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="relative mt-8 overflow-hidden p-6 max-sm:-mr-56 sm:mt-16">
            <div className="absolute inset-0 mask-t-from-25% mask-t-to-65% rounded-4xl border bg-linear-to-b to-zinc-600" />
            <div className="relative rounded-2xl p-2 shadow-xl shadow-black/50 ring ring-foreground/10 before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-t before:border-l before:border-foreground/10 before:mask-radial-[100%_60%] before:mask-radial-from-65% before:mask-radial-at-top-left">
              <div className="absolute inset-0 z-1 rounded-2xl bg-foreground/2" />
              <img
                alt={screenshot.alt}
                className="relative aspect-15/8 rounded-2xl bg-background"
                height={1440}
                src={screenshot.src}
                width={2700}
              />
            </div>
          </div>
        </div>
      </div>

      {logos.length ? (
        <div className="bg-background pt-6 pb-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            {logosCta ? (
              <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                {logosCta.href ? (
                  <a
                    className="block text-sm duration-150 hover:opacity-75"
                    href={logosCta.href}
                  >
                    <span>{logosCta.label}</span>
                    <ChevronRightIcon className="ml-1 inline-block size-3" />
                  </a>
                ) : (
                  <span className="block text-sm">
                    {logosCta.label}
                    <ChevronRightIcon className="ml-1 inline-block size-3" />
                  </span>
                )}
              </div>
            ) : null}
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 group-hover:blur-xs sm:gap-x-16 sm:gap-y-14 md:grid-cols-4">
              {logos.map((logo) => (
                <div className="flex items-center" key={logo.alt}>
                  <img
                    alt={logo.alt}
                    className="mx-auto h-5 w-full max-w-24 object-contain dark:brightness-0 dark:invert"
                    src={logo.src}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
