import type { Story, StoryDefault } from "@ladle/react"

import { Hero4 as Hero4Block } from "./hero-4"

export default {
  title: "Hero",
} satisfies StoryDefault

export const Hero4: Story = () => <Hero4Block />
