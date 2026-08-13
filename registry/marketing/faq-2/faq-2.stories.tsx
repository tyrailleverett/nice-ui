import type { Meta, StoryFn } from "@storybook/react-vite";

import { Faq2 as Faq2Block } from "./faq-2";

export default {
  title: "Marketing/FAQ",
} satisfies Meta;

export const SplitStacked: StoryFn = () => <Faq2Block />;
