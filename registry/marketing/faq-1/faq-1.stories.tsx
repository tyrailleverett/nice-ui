import type { Story, StoryDefault } from "@ladle/react"

import { Faq1 as Faq1Block } from "./faq-1"

export default {
  title: "FAQ",
} satisfies StoryDefault

export const Faq1: Story = () => <Faq1Block />
