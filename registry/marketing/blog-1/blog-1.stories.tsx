import type { Meta, StoryFn } from "@storybook/react-vite";

import { Blog1 as Blog1Block } from "./blog-1";

export default {
  title: "Marketing/Blog",
} satisfies Meta;

export const CompactList: StoryFn = () => <Blog1Block />;
