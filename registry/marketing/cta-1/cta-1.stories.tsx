import type { Story, StoryDefault } from "@ladle/react";

import { Cta1 as Cta1Block } from "./cta-1";

export default {
  title: "CTA",
} satisfies StoryDefault;

export const Cta1: Story = () => <Cta1Block />;
