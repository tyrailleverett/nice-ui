import type { Story, StoryDefault } from "@ladle/react";

import { Testimonial2 as Testimonial2Block } from "./testimonial-2";

export default {
  title: "Testimonial",
} satisfies StoryDefault;

export const Testimonial2: Story = () => <Testimonial2Block />;
