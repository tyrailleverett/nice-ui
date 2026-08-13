import type { Meta, StoryFn } from "@storybook/react-vite";

import { Pricing4 as Pricing4Block } from "./pricing-4";

export default {
  title: "Marketing/Pricing",
} satisfies Meta;

export const TwoTiers: StoryFn = () => <Pricing4Block />;
