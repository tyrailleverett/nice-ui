import type { Meta, StoryFn } from "@storybook/react-vite";

import { Pricing2 as Pricing2Block } from "./pricing-2";

export default {
  title: "Marketing/Pricing",
} satisfies Meta;

export const ComparisonTable: StoryFn = () => <Pricing2Block />;
