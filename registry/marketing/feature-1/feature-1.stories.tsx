import type { Story, StoryDefault } from "@ladle/react"

import { Feature1 as Feature1Block } from "./feature-1"

export default {
  title: "Features",
} satisfies StoryDefault

export const Feature1: Story = () => <Feature1Block />
