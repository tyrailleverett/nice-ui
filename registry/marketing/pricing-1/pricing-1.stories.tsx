import type { Story, StoryDefault } from "@ladle/react";

import { Pricing1 as Pricing1Block } from "./pricing-1";

export default {
  title: "Pricing",
} satisfies StoryDefault;

export const Pricing1: Story = () => <Pricing1Block />;
