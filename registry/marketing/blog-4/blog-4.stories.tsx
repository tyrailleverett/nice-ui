import type { Meta, StoryFn } from "@storybook/react-vite";

import { Blog4 as Blog4Block } from "./blog-4";

export default {
  title: "Marketing/Blog",
} satisfies Meta;

export const JournalIndex: StoryFn = () => <Blog4Block />;
