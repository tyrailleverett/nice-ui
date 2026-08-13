import type { Story, StoryDefault } from "@ladle/react";

import { Feature3 as Feature3Block } from "./feature-3";

export default {
  title: "Features",
} satisfies StoryDefault;

export const Feature3: Story = () => <Feature3Block />;
