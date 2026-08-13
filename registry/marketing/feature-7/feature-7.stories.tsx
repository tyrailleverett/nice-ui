import type { Story, StoryDefault } from "@ladle/react";

import { Feature7 as Feature7Block } from "./feature-7";

export default {
  title: "Features",
} satisfies StoryDefault;

export const Feature7: Story = () => <Feature7Block />;
