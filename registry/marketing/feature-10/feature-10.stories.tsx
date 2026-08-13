import type { Story, StoryDefault } from "@ladle/react"

import { Feature10 as Feature10Block } from "./feature-10"

export default {
  title: "Features",
} satisfies StoryDefault

export const Feature10: Story = () => <Feature10Block />
