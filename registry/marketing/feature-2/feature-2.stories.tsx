import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature2 as Feature2Block } from "./feature-2";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const FramedThreeColumn: StoryFn = () => <Feature2Block />;
