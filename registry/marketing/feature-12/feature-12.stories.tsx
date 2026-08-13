import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature12 as Feature12Block } from "./feature-12";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const StackedIllustrations: StoryFn = () => <Feature12Block />;
