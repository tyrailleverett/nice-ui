import type { Story, StoryDefault } from "@ladle/react"

import { Feature11 as Feature11Block } from "./feature-11"

export default {
  title: "Features",
} satisfies StoryDefault

export const Feature11: Story = () => <Feature11Block />
