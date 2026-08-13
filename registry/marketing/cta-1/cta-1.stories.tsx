import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta1 as Cta1Block } from "./cta-1";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const SplitHeadlineActions: StoryFn = () => <Cta1Block />;
