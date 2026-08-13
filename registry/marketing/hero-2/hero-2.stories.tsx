import type { Story, StoryDefault } from "@ladle/react"

import { Hero2 as Hero2Block } from "./hero-2"

export default {
  title: "Hero",
} satisfies StoryDefault

export const Hero2: Story = () => <Hero2Block />
