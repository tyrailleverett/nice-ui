import type { Story, StoryDefault } from "@ladle/react"

import { Feature9 as Feature9Block } from "./feature-9"

export default {
  title: "Features",
} satisfies StoryDefault

export const Feature9: Story = () => <Feature9Block />
