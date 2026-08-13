import type { Story, StoryDefault } from "@ladle/react";

import { Hero5 as Hero5Block } from "./hero-5";

export default {
  title: "Hero",
} satisfies StoryDefault;

export const Hero5: Story = () => <Hero5Block />;
