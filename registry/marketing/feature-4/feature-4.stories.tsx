import type { Story, StoryDefault } from "@ladle/react";

import { Feature4 as Feature4Block } from "./feature-4";

export default {
  title: "Features",
} satisfies StoryDefault;

export const Feature4: Story = () => <Feature4Block />;
