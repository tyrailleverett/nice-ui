import type { Story, StoryDefault } from "@ladle/react";

import { Blog1 as Blog1Block } from "./blog-1";

export default {
  title: "Blog",
} satisfies StoryDefault;

export const Blog1: Story = () => <Blog1Block />;
