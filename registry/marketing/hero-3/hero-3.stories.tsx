import type { Meta, StoryFn } from "@storybook/react-vite";

import { Hero3 as Hero3Block } from "./hero-3";

export default {
  title: "Marketing/Hero",
} satisfies Meta;

export const SplitSkewedScreenshot: StoryFn = () => <Hero3Block />;
