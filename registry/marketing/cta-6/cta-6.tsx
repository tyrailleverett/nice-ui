import { useState } from "react"

import { cn } from "@/lib/utils"

export type Cta6Props = {
  eyebrow?: string
  title?: string
  description?: string
  command?: string
  className?: string
}

export function Cta6({
  eyebrow = "Install Fast.",
  title = "Build Faster.",
  description = "Install Nice UI and start shipping faster.",
  command = "bunx shadcn@latest add hotreloadstudios/nice-ui/hero-1",
  className,
}: Cta6Props) {
  const [copied, setCopied] = useState(false)

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border bg-[radial-gradient(50%_80%_at_50%_0%,--theme(--color-foreground/.08),transparent)]",
        className
      )}
    >
      <div className="grid grid-cols-[minmax(2.25rem,1fr)_minmax(0,22rem)_minmax(2.25rem,1fr)] grid-rows-[minmax(2.5rem,1fr)_auto_minmax(2.5rem,1fr)] sm:grid-cols-[minmax(3.5rem,1fr)_minmax(0,28rem)_minmax(3.5rem,1fr)]">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            className={cn(
              index % 3 !== 2 && "border-r",
              index < 6 && "border-b",
              index === 4 &&
                "flex flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:px-8 sm:py-14"
            )}
            key={index}
          >
            {index === 4 ? (
              <>
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground text-xl sm:text-2xl">
                    {eyebrow}
                  </p>
                  <h2 className="font-semibold text-2xl tracking-tight sm:text-3xl">
                    {title}
                  </h2>
                </div>
                {description ? (
                  <p className="text-muted-foreground text-sm">{description}</p>
                ) : null}
                <button
                  className="inline-flex max-w-full items-center gap-2 rounded-lg border bg-card px-3 py-2 font-mono text-xs sm:text-sm"
                  onClick={copyCommand}
                  type="button"
                >
                  <span className="text-muted-foreground">$</span>
                  <span className="truncate">{copied ? "Copied" : command}</span>
                </button>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
