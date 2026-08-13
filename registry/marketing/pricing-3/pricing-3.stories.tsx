import type { Meta, StoryFn } from "@storybook/react-vite";

import { Pricing3 as Pricing3Block } from "./pricing-3";

export default {
  title: "Marketing/Pricing",
} satisfies Meta;

export const SinglePlan: StoryFn = () => <Pricing3Block />;
