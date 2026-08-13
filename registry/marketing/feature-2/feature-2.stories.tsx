import type { Story, StoryDefault } from "@ladle/react";

import { Feature2 as Feature2Block } from "./feature-2";

export default {
  title: "Features",
} satisfies StoryDefault;

export const Feature2: Story = () => <Feature2Block />;
