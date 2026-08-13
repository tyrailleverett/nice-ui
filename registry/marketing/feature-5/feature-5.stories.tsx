import type { Story, StoryDefault } from "@ladle/react";

import { Feature5 as Feature5Block } from "./feature-5";

export default {
  title: "Features",
} satisfies StoryDefault;

export const Feature5: Story = () => <Feature5Block />;
