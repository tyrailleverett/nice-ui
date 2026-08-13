import type { Meta, StoryFn } from "@storybook/react-vite";

import { Hero2 as Hero2Block } from "./hero-2";

export default {
  title: "Marketing/Hero",
} satisfies Meta;

export const LeftOffsetScreenshot: StoryFn = () => <Hero2Block />;
