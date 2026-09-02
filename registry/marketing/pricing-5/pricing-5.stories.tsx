import type { Meta, StoryFn } from "@storybook/react-vite";

import { Pricing5 as Pricing5Block } from "./pricing-5";

export default {
  title: "Marketing/Pricing",
} satisfies Meta;

export const FreeAndStudio: StoryFn = () => <Pricing5Block />;
