import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature14 as Feature14Block } from "./feature-14";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const SplitHeadlineList: StoryFn = () => <Feature14Block />;
