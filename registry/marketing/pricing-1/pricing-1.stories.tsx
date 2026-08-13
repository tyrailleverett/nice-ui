import type { Meta, StoryFn } from "@storybook/react-vite";

import { Pricing1 as Pricing1Block } from "./pricing-1";

export default {
  title: "Marketing/Pricing",
} satisfies Meta;

export const ThreeTiers: StoryFn = () => <Pricing1Block />;
