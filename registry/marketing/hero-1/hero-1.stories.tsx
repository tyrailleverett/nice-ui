import type { Meta, StoryFn } from "@storybook/react-vite";

import { Hero1 as Hero1Block } from "./hero-1";

export default {
  title: "Marketing/Hero",
} satisfies Meta;

export const CenteredScreenshot: StoryFn = () => <Hero1Block />;
