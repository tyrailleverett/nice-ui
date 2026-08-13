import type { Story, StoryDefault } from "@ladle/react"

import { Hero3 as Hero3Block } from "./hero-3"

export default {
  title: "Hero",
} satisfies StoryDefault

export const Hero3: Story = () => <Hero3Block />
