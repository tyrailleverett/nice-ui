import type { Meta, StoryFn } from "@storybook/react-vite";

import { Feature6 as Feature6Block } from "./feature-6";

export default {
  title: "Marketing/Features",
} satisfies Meta;

export const StickyScrollNav: StoryFn = () => <Feature6Block />;
