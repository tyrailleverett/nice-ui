import type { Story, StoryDefault } from "@ladle/react";

import { Faq2 as Faq2Block } from "./faq-2";

export default {
  title: "FAQ",
} satisfies StoryDefault;

export const Faq2: Story = () => <Faq2Block />;
