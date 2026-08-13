import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type StatItem = {
  label: string
  value: string
  change?: {
    value: string
    trend: "up" | "down" | "neutral"
  }
}

export type StatsCardsProps = {
  stats: StatItem[]
  className?: string
}

function trendClassName(trend: NonNullable<StatItem["change"]>["trend"]) {
  switch (trend) {
    case "up":
      return "text-emerald-600 dark:text-emerald-400"
    case "down":
      return "text-destructive"
    default:
      return "text-muted-foreground"
  }
}

export function StatsCards({ stats, className }: StatsCardsProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
          {stat.change ? (
            <CardContent>
              <p
                className={cn(
                  "text-sm font-medium",
                  trendClassName(stat.change.trend)
                )}
              >
                {stat.change.value}
              </p>
            </CardContent>
          ) : null}
        </Card>
      ))}
    </div>
  )
}
