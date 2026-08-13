import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type Feature8ChartPoint = {
  month: string
  desktop: number
  mobile: number
}

export type Feature8Props = {
  title?: ReactNode
  mapTitle?: ReactNode
  mapDescription?: string
  threadTitle?: ReactNode
  threadDescription?: string
  uptime?: string
  uptimeLabel?: string
  chartTitle?: ReactNode
  chartDescription?: string
  connectionLabel?: ReactNode
  chartData?: Feature8ChartPoint[]
  className?: string
}

const defaultChartData: Feature8ChartPoint[] = [
  { month: "May", desktop: 56, mobile: 224 },
  { month: "June", desktop: 56, mobile: 224 },
  { month: "January", desktop: 126, mobile: 252 },
  { month: "February", desktop: 205, mobile: 410 },
  { month: "March", desktop: 200, mobile: 126 },
  { month: "April", desktop: 400, mobile: 800 },
]

function Map() {
  const cols = 80
  const rows = 40
  const dots: { x: number; y: number }[] = []

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      if ((x + y) % 2 === 0) {
        dots.push({ x, y })
      }
    }
  }

  return (
    <svg className="size-full text-foreground" viewBox={`0 0 ${cols} ${rows}`}>
      {dots.map((point) => (
        <circle
          cx={point.x}
          cy={point.y}
          fill="currentColor"
          key={`${point.x}-${point.y}`}
          r={0.28}
        />
      ))}
    </svg>
  )
}

function stepPath(values: number[], width: number, height: number, max: number) {
  if (values.length === 0) return ""

  const step = width / Math.max(values.length - 1, 1)
  const y = (value: number) => height - (value / max) * height

  let d = `M 0 ${y(values[0] ?? 0)}`
  for (let i = 1; i < values.length; i += 1) {
    const x = i * step
    d += ` H ${x} V ${y(values[i] ?? 0)}`
  }
  return d
}

function MonitoringChart({ data }: { data: Feature8ChartPoint[] }) {
  const width = 960
  const height = 320
  const max = Math.max(...data.flatMap((point) => [point.desktop + point.mobile, 1]))
  const mobile = data.map((point) => point.mobile)
  const stacked = data.map((point) => point.desktop + point.mobile)
  const mobileLine = stepPath(mobile, width, height, max)
  const stackedLine = stepPath(stacked, width, height, max)

  return (
    <div className="h-120 w-full md:h-96">
      <svg
        aria-hidden
        className="size-full"
        preserveAspectRatio="none"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="feature-8-mobile" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity="0.8" />
            <stop offset="55%" stopColor="var(--color-chart-2)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="feature-8-desktop" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity="0.8" />
            <stop offset="55%" stopColor="var(--color-chart-1)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 6 }, (_, index) => (
          <line
            className="stroke-border"
            key={index}
            strokeWidth="1"
            x1="0"
            x2={width}
            y1={(height / 5) * index}
            y2={(height / 5) * index}
          />
        ))}
        <path
          d={`${mobileLine} V ${height} H 0 Z`}
          fill="url(#feature-8-mobile)"
          fillOpacity="0.35"
        />
        <path
          d={`${stackedLine} L ${width} ${height} L 0 ${height} Z`}
          fill="url(#feature-8-desktop)"
          fillOpacity="0.2"
        />
        <path
          d={mobileLine}
          fill="none"
          stroke="var(--color-chart-2)"
          strokeWidth="3"
        />
        <path
          d={stackedLine}
          fill="none"
          stroke="var(--color-chart-1)"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}

export function Feature8({
  title = (
    <>
      <span className="text-foreground">See the whole pipeline.</span>
      <br /> Activity and health in one view.
    </>
  ),
  mapTitle = "Account activity, mapped globally.",
  mapDescription = "See where deals are moving and which regions your team should prioritize next.",
  threadTitle = "Every conversation in one thread.",
  threadDescription = "Email, chat, and support history stay on the account so nobody works from memory.",
  uptime = "99.99%",
  uptimeLabel = "Uptime",
  chartTitle = "Pipeline health, updated in real time.",
  chartDescription = "Spot stalled deals and weak engagement before they slip past quarter end.",
  connectionLabel = (
    <>
      <span className="text-lg">🇨🇩</span> Last connection from{" "}
      <span className="text-foreground">DR Congo</span>
    </>
  ),
  chartData = defaultChartData,
  className,
}: Feature8Props) {
  return (
    <section className={cn("overflow-hidden px-4 py-16 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-2 lg:px-6">
        <h2 className="max-w-4xl text-balance font-medium text-4xl text-muted-foreground tracking-tight">
          {title}
        </h2>
        <div className="mt-8 grid rounded-xl border md:mt-16 md:grid-cols-2">
          <div className="row-span-2 grid grid-rows-subgrid gap-6 md:gap-0">
            <div className="p-6 sm:p-12">
              <p className="text-balance font-medium text-lg text-muted-foreground">
                <span className="text-foreground">{mapTitle}</span> {mapDescription}
              </p>
            </div>

            <div aria-hidden className="relative">
              <div className="absolute inset-0 z-10 m-auto size-fit -translate-y-full">
                <div className="relative z-1 flex w-fit size-fit items-center gap-2 rounded-lg bg-zinc-900/75 px-3 py-1 font-medium text-muted-foreground text-xs shadow-lg shadow-black/10 ring ring-foreground/10 backdrop-blur">
                  {connectionLabel}
                </div>
                <div className="absolute inset-2 -bottom-2 mx-auto rounded-lg bg-background px-3 py-4 font-medium text-xs shadow-md shadow-black/5 ring ring-foreground/10" />
              </div>

              <div className="relative overflow-hidden opacity-25 mask-radial-[50%_50%] mask-radial-at-center mask-radial-from-25%">
                <Map />
              </div>
            </div>
          </div>
          <div className="row-span-2 grid grid-rows-subgrid gap-6 overflow-hidden border-t p-6 sm:p-12 md:gap-0 md:border-0 md:border-l dark:bg-transparent">
            <div className="relative z-10">
              <p className="text-balance font-medium text-lg text-muted-foreground">
                <span className="text-foreground">{threadTitle}</span>{" "}
                {threadDescription}
              </p>
            </div>
            <div
              aria-hidden
              className="mask-radial-[90%_80%] mask-radial-at-top-left mask-radial-from-75%"
            >
              <div className="relative mx-auto flex aspect-video flex-col justify-between rounded-xl border bg-card pb-6">
                <div className="mb-6 flex gap-1.5 border-b p-3">
                  <div className="size-1.5 rounded-full bg-foreground/10" />
                  <div className="size-1.5 rounded-full bg-foreground/10" />
                  <div className="size-1.5 rounded-full bg-foreground/10" />
                </div>

                <div className="mx-6 mt-auto h-32 rounded-xl bg-foreground/2 shadow-xl ring ring-foreground/10" />
              </div>
            </div>
          </div>
          <div className="col-span-full border-y p-12 lg:py-20">
            <p className="text-center font-semibold text-4xl lg:text-7xl">
              {uptime} <span className="text-muted-foreground">{uptimeLabel}</span>
            </p>
          </div>
          <div className="relative col-span-full">
            <div className="absolute z-10 max-w-lg px-6 pt-6 pr-12 md:px-12 md:pt-12">
              <p className="mb-8 text-balance font-medium text-lg">
                {chartTitle}{" "}
                <span className="text-muted-foreground">{chartDescription}</span>
              </p>
            </div>
            <MonitoringChart data={chartData} />
          </div>
        </div>
      </div>
    </section>
  )
}
