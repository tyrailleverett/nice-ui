import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta4 as Cta4Block } from "./cta-4";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const RoundedCard: StoryFn = () => <Cta4Block />;
