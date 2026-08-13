import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature3 as Feature3Block } from "./feature-3";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const SixUpBorderedGrid: StoryFn = () => <Feature3Block />;
