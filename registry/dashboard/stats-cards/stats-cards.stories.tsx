import type { Story } from "@ladle/react"

import { StatsCards } from "./stats-cards"

const sampleStats = [
  {
    label: "Monthly revenue",
    value: "$48,290",
    change: { value: "+12.4% from last month", trend: "up" as const },
  },
  {
    label: "Active users",
    value: "2,431",
    change: { value: "+4.1% from last month", trend: "up" as const },
  },
  {
    label: "Churn rate",
    value: "2.8%",
    change: { value: "-0.6% from last month", trend: "down" as const },
  },
]

export const Default: Story = () => (
  <div className="p-6">
    <StatsCards stats={sampleStats} />
  </div>
)

export const WithoutChange: Story = () => (
  <div className="p-6">
    <StatsCards
      stats={[
        { label: "Open tickets", value: "18" },
        { label: "Resolved today", value: "42" },
        { label: "Avg. response", value: "1h 12m" },
      ]}
    />
  </div>
)
