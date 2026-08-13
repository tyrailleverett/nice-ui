import type { Meta, StoryFn } from "@storybook/react-vite";

import { Blog2 as Blog2Block } from "./blog-2";

export default {
  title: "Marketing/Blog",
} satisfies Meta;

export const ThreeColumnGrid: StoryFn = () => <Blog2Block />;
