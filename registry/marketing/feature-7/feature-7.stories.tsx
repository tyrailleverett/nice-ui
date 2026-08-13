import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature7 as Feature7Block } from "./feature-7";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const ScreenshotHighlights: StoryFn = () => <Feature7Block />;
