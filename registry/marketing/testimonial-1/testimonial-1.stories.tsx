import type { Story, StoryDefault } from "@ladle/react"

import { Testimonial1 as Testimonial1Block } from "./testimonial-1"

export default {
  title: "Testimonial",
} satisfies StoryDefault

export const Testimonial1: Story = () => <Testimonial1Block />
