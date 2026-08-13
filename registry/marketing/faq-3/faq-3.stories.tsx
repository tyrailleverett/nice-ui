import type { Meta, StoryFn } from "@storybook/react-vite";

import { Faq3 as Faq3Block } from "./faq-3";

export default {
  title: "Marketing/FAQ",
} satisfies Meta;

export const SplitGuideLine: StoryFn = () => <Faq3Block />;
