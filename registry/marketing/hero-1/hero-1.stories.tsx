import type { Story, StoryDefault } from "@ladle/react";

import { Hero1 as Hero1Block } from "./hero-1";

export default {
  title: "Hero",
} satisfies StoryDefault;

export const Hero1: Story = () => <Hero1Block />;
