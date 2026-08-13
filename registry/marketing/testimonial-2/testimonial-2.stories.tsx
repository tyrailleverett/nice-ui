import type { Meta, StoryFn } from "@storybook/react-vite";

import { Testimonial2 as Testimonial2Block } from "./testimonial-2";

export default {
  title: "Marketing/Testimonial",
} satisfies Meta;

export const SplitPortrait: StoryFn = () => <Testimonial2Block />;
