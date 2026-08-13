import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta2 as Cta2Block } from "./cta-2";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const StackedTintedBar: StoryFn = () => <Cta2Block />;
