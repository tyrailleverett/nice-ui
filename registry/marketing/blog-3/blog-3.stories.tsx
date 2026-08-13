import type { Story, StoryDefault } from "@ladle/react"

import { Blog3 as Blog3Block } from "./blog-3"

export default {
  title: "Blog",
} satisfies StoryDefault

export const Blog3: Story = () => <Blog3Block />
