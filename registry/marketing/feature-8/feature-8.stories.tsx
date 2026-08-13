import type { Story, StoryDefault } from "@ladle/react"

import { Feature8 as Feature8Block } from "./feature-8"

export default {
  title: "Features",
} satisfies StoryDefault

export const Feature8: Story = () => <Feature8Block />
