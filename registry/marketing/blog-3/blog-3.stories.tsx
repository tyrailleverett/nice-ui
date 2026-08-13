import type { Meta, StoryFn } from "@storybook/react-vite";

import { Blog3 as Blog3Block } from "./blog-3";

export default {
  title: "Marketing/Blog",
} satisfies Meta;

export const FeaturedBento: StoryFn = () => <Blog3Block />;
