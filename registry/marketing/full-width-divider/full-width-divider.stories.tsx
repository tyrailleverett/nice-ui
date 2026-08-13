import type { Story, StoryDefault } from "@ladle/react"

import { FullWidthDivider } from "./full-width-divider"

export default {
  title: "Full Width Divider",
} satisfies StoryDefault

export const Default: Story = () => (
  <div className="relative mx-auto h-24 w-full max-w-3xl border-x">
    <FullWidthDivider position="top" />
    <FullWidthDivider position="bottom" />
  </div>
)

export const Contained: Story = () => (
  <div className="relative mx-auto h-24 w-full max-w-3xl border">
    <FullWidthDivider contained position="top" />
    <FullWidthDivider contained position="bottom" />
  </div>
)
