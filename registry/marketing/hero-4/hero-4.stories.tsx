import type { Meta, StoryFn } from "@storybook/react-vite";

import { Hero4 as Hero4Block } from "./hero-4";

export default {
  title: "Marketing/Hero",
} satisfies Meta;

export const SplitHeadlineMedia: StoryFn = () => <Hero4Block />;
