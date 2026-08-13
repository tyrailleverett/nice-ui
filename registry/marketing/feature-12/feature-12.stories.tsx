import type { Story, StoryDefault } from "@ladle/react";

import { Feature12 as Feature12Block } from "./feature-12";

export default {
  title: "Features",
} satisfies StoryDefault;

export const Feature12: Story = () => <Feature12Block />;
