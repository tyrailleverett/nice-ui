import type { Story, StoryDefault } from "@ladle/react"

import { Blog2 as Blog2Block } from "./blog-2"

export default {
  title: "Blog",
} satisfies StoryDefault

export const Blog2: Story = () => <Blog2Block />
