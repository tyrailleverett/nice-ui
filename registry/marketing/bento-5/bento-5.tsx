import {
  ArrowUpIcon,
  GitMergeIcon,
  RocketIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { MarketingSection } from "@/components/marketing-section";
import { cn } from "@/lib/utils";

export interface Bento5Activity {
  action: string;
  avatarSrc: string;
  kind: "deploy" | "merge";
  name: string;
  target: string;
  time: string;
}

export interface Bento5ComputeSlice {
  label: string;
  percent: number;
}

export interface Bento5Props {
  className?: string;
  description?: string;
  title?: string;
}

const REVENUE_SERIES = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 66 },
  { month: "Mar", value: 74 },
  { month: "Apr", value: 74 },
  { month: "May", value: 85 },
  { month: "Jun", value: 88 },
  { month: "Jul", value: 100 },
  { month: "Aug", value: 95 },
  { month: "Sep", value: 108 },
  { month: "Oct", value: 114 },
  { month: "Nov", value: 120 },
  { month: "Dec", value: 128 },
] as const;

const REVENUE_MAX = 140;
const CHART_X_TICKS = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"] as const;
const CHART_Y_TICKS = [0, 35, 70, 105, 140] as const;

const ACTIVITY: Bento5Activity[] = [
  {
    action: "deployed",
    avatarSrc: "https://i.pravatar.cc/80?img=47",
    kind: "deploy",
    name: "Maya Chen",
    target: "api-gateway",
    time: "9:42 AM",
  },
  {
    action: "merged",
    avatarSrc: "https://i.pravatar.cc/80?img=12",
    kind: "merge",
    name: "Jonas Weber",
    target: "#482 Caching",
    time: "9:31 AM",
  },
  {
    action: "released",
    avatarSrc: "https://i.pravatar.cc/80?img=32",
    kind: "deploy",
    name: "Priya Nair",
    target: "v4.2.0",
    time: "9:18 AM",
  },
  {
    action: "merged",
    avatarSrc: "https://i.pravatar.cc/80?img=15",
    kind: "merge",
    name: "Diego Alvarez",
    target: "#479 Auth",
    time: "8:56 AM",
  },
  {
    action: "deployed",
    avatarSrc: "https://i.pravatar.cc/80?img=20",
    kind: "deploy",
    name: "Lena Fischer",
    target: "web-edge",
    time: "8:40 AM",
  },
  {
    action: "merged",
    avatarSrc: "https://i.pravatar.cc/80?img=33",
    kind: "merge",
    name: "Omar Haddad",
    target: "#476 Metrics",
    time: "8:22 AM",
  },
];

const COMPUTE_SLICES: Bento5ComputeSlice[] = [
  { label: "API Requests", percent: 42 },
  { label: "Background Jobs", percent: 18 },
  { label: "Builds", percent: 8 },
];

const COMPUTE_OPACITY = [1, 0.6, 0.35] as const;
const UPTIME_DAY_COUNT = 90;
const UPTIME_WARNING_DAY = 72;
const UPTIME_DAYS = Array.from(
  { length: UPTIME_DAY_COUNT },
  (_, index) => `uptime-day-${index + 1}`
);
const SECURITY_CONTROLS = [
  "SOC 2 Type II",
  "End-To-End Encryption",
  "Role-Based Access",
] as const;

const CHART_WIDTH = 617;
const CHART_HEIGHT = 347;
const CHART_LEFT = 52;
const CHART_RIGHT = 613;
const CHART_TOP = 8;
const CHART_BOTTOM = 317;
const COUNT_DURATION_MS = 1200;
const EASE_OUT_CUBIC = 3;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useCountUp(target: number, duration = COUNT_DURATION_MS): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let frameId = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** EASE_OUT_CUBIC;
      setValue(target * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [duration, target]);

  return value;
}

function useReveal(): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }

    const frameId = requestAnimationFrame(() => {
      setRevealed(true);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return revealed;
}

function LiveDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative flex size-2", className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/20" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
  );
}

function DotGrid() {
  const dots = Array.from({ length: 49 }, (_, index) => `dot-${index}`);

  return (
    <svg
      aria-hidden
      className="mask-[radial-gradient(circle_at_bottom_right,black,transparent_72%)] pointer-events-none absolute -right-2 -bottom-2 size-24 text-muted-foreground/50"
      viewBox="0 0 60 60"
    >
      <title>Decorative grid</title>
      {dots.map((dotId, index) => {
        const column = index % 7;
        const row = Math.floor(index / 7);
        const offset = 4;
        const step = 9;

        return (
          <circle
            cx={offset + column * step}
            cy={offset + row * step}
            fill="currentColor"
            key={dotId}
            r="1"
          />
        );
      })}
    </svg>
  );
}

function RevenueChart({ revealed }: { revealed: boolean }) {
  const gradientId = useId();
  const plotWidth = CHART_RIGHT - CHART_LEFT;
  const plotHeight = CHART_BOTTOM - CHART_TOP;
  const lastIndex = REVENUE_SERIES.length - 1;

  const points = REVENUE_SERIES.map((point, index) => {
    const x = CHART_LEFT + (index / lastIndex) * plotWidth;
    const y = CHART_BOTTOM - (point.value / REVENUE_MAX) * plotHeight;
    return { month: point.month, x, y };
  });

  const linePath = points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    })
    .join(" ");

  const areaPath = `${linePath} L${CHART_RIGHT},${CHART_BOTTOM} L${CHART_LEFT},${CHART_BOTTOM} Z`;
  const xTickPoints = points.filter((point) =>
    CHART_X_TICKS.includes(point.month as (typeof CHART_X_TICKS)[number])
  );

  return (
    <svg
      aria-label="Monthly revenue trend"
      className="mt-6 min-h-0 w-full flex-1"
      role="img"
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
    >
      <title>Monthly revenue trend</title>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {CHART_Y_TICKS.map((tick) => {
        const y = CHART_BOTTOM - (tick / REVENUE_MAX) * plotHeight;
        return (
          <g key={tick}>
            <line
              className="stroke-border/50"
              x1={CHART_LEFT}
              x2={CHART_RIGHT}
              y1={y}
              y2={y}
            />
            <text
              className="fill-muted-foreground text-[11px]"
              textAnchor="end"
              x={CHART_LEFT - 8}
              y={y + 4}
            >
              ${tick}M
            </text>
          </g>
        );
      })}
      <path
        className="text-foreground transition-[opacity,clip-path] duration-1000 ease-out"
        d={areaPath}
        fill={`url(#${gradientId})`}
        style={{
          clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          opacity: revealed ? 0.6 : 0,
        }}
      />
      <path
        className="text-foreground transition-[stroke-dashoffset] duration-1000 ease-out"
        d={linePath}
        fill="none"
        pathLength={1}
        stroke="currentColor"
        strokeDasharray={1}
        strokeDashoffset={revealed ? 0 : 1}
        strokeWidth={2}
      />
      {xTickPoints.map((point) => (
        <text
          className="fill-muted-foreground text-[11px]"
          key={point.month}
          textAnchor="middle"
          x={point.x}
          y={CHART_HEIGHT - 8}
        >
          {point.month}
        </text>
      ))}
    </svg>
  );
}

export function Bento5({
  title = "Everything Your Product Runs On",
  description = "One platform for analytics, delivery, and reliability, measured in real time so the numbers are never a guess.",
  className,
}: Bento5Props) {
  const revealed = useReveal();
  const revenue = useCountUp(128);
  const eventsToday = useCountUp(1284);
  const uptime = useCountUp(99.98);
  const computeUsed = COMPUTE_SLICES.reduce(
    (total, slice) => total + slice.percent,
    0
  );

  return (
    <MarketingSection className={className}>
      <section className="flex items-center justify-center bg-background px-6 py-16 text-foreground sm:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
              <LiveDot />
              <span>
                <span className="font-medium text-foreground">Live</span> Across
                Every Environment
              </span>
            </div>
            <h2 className="mt-6 text-balance font-display-heading text-3xl sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-pretty text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3 md:grid-rows-3">
            <div className="bg-card p-6 sm:p-8 md:col-span-2 md:row-span-2">
              <div className="flex h-full flex-col">
                <h3 className="font-heading font-medium text-muted-foreground text-sm">
                  Recurring Revenue
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-bold text-3xl tabular-nums tracking-tight sm:text-4xl">
                    ${Math.round(revenue)}M
                  </span>
                  <span className="inline-flex items-center gap-0.5 font-medium text-sm text-success">
                    <ArrowUpIcon className="size-4" />
                    18.6%
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground text-xs">
                  Trailing Twelve Months
                </p>
                <RevenueChart revealed={revealed} />
              </div>
            </div>

            <div className="bg-card p-6 md:row-span-2">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-medium text-sm">
                    Live Activity
                  </h3>
                  <LiveDot />
                </div>
                <ul className="mt-4 flex flex-col divide-y divide-border">
                  {ACTIVITY.map((event) => {
                    const Icon =
                      event.kind === "merge" ? GitMergeIcon : RocketIcon;

                    return (
                      <li
                        className="flex items-center gap-3 py-3 first:pt-0"
                        key={`${event.name}-${event.time}`}
                      >
                        <img
                          alt=""
                          className="size-7 shrink-0 rounded-full grayscale"
                          height={28}
                          loading="lazy"
                          src={event.avatarSrc}
                          width={28}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs">
                            <span className="font-medium">{event.name}</span>{" "}
                            <span className="text-muted-foreground">
                              {event.action}
                            </span>{" "}
                            <span className="text-foreground">
                              {event.target}
                            </span>
                          </p>
                          <p className="text-[0.7rem] text-muted-foreground">
                            {event.time}
                          </p>
                        </div>
                        <Icon
                          aria-hidden
                          className="size-4 shrink-0 text-muted-foreground"
                        />
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-auto flex items-center justify-between border-border border-t pt-4 text-xs">
                  <span className="text-muted-foreground">Events Today</span>
                  <span className="font-medium tabular-nums">
                    {Math.round(eventsToday).toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card p-6">
              <div className="flex h-full flex-col">
                <h3 className="font-heading font-medium text-sm">
                  Compute Usage
                </h3>
                <div className="mt-4 flex items-baseline justify-between text-xs">
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground tabular-nums">
                      {computeUsed}%
                    </span>{" "}
                    In Use
                  </span>
                  <span className="text-muted-foreground">
                    {100 - computeUsed}% Free
                  </span>
                </div>
                <div className="mt-2 flex h-2 w-full overflow-hidden bg-muted">
                  <div
                    className="flex h-full origin-left transition-transform duration-1000 ease-out"
                    style={{
                      transform: revealed ? "scaleX(1)" : "scaleX(0)",
                      width: "100%",
                    }}
                  >
                    {COMPUTE_SLICES.map((slice, index) => (
                      <span
                        className="h-full bg-primary"
                        key={slice.label}
                        style={{
                          flex: slice.percent,
                          opacity: COMPUTE_OPACITY[index],
                        }}
                      />
                    ))}
                  </div>
                </div>
                <ul className="mt-auto flex flex-col gap-2.5 pt-5 text-xs">
                  {COMPUTE_SLICES.map((slice, index) => (
                    <li className="flex items-center gap-2.5" key={slice.label}>
                      <span
                        aria-hidden
                        className="size-2.5 shrink-0 bg-primary"
                        style={{ opacity: COMPUTE_OPACITY[index] }}
                      />
                      <span className="flex-1 text-muted-foreground">
                        {slice.label}
                      </span>
                      <span className="font-medium tabular-nums">
                        {slice.percent}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-card p-6">
              <div className="flex h-full flex-col">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-heading font-medium text-sm">Uptime</h3>
                  <span className="font-semibold text-sm text-success tabular-nums">
                    {uptime.toFixed(2)}%
                  </span>
                </div>
                <div aria-hidden className="mt-4 flex h-12 items-end gap-0.5">
                  {UPTIME_DAYS.map((dayId, index) => {
                    const isWarning = index === UPTIME_WARNING_DAY;

                    return (
                      <span
                        className={cn(
                          "h-full flex-1 origin-bottom transition-transform duration-500 ease-out",
                          isWarning ? "bg-amber-400/20" : "bg-emerald-500/20"
                        )}
                        key={dayId}
                        style={{
                          transform: revealed ? "scaleY(1)" : "scaleY(0.2)",
                          transitionDelay: revealed ? `${index * 8}ms` : "0ms",
                        }}
                      />
                    );
                  })}
                </div>
                <p className="mt-3 text-muted-foreground text-xs">
                  Last 90 Days
                </p>
                <div className="mt-auto flex items-center justify-between border-border border-t pt-4 text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-emerald-500"
                    />
                    Operational
                  </span>
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground tabular-nums">
                      0
                    </span>{" "}
                    Incidents
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card p-6">
              <div className="relative flex h-full flex-col overflow-hidden">
                <h3 className="font-heading font-medium text-sm">
                  Secure By Default
                </h3>
                <p className="mt-1 text-muted-foreground text-xs">
                  Enterprise controls, on from day one.
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-muted-foreground text-xs">
                  {SECURITY_CONTROLS.map((control) => (
                    <li className="flex items-center gap-2" key={control}>
                      <ShieldCheckIcon className="size-3.5 shrink-0 text-success" />
                      {control}
                    </li>
                  ))}
                </ul>
                <DotGrid />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingSection>
  );
}
