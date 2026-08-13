import type { Meta, StoryFn } from "@storybook/react-vite";

import { Testimonial5 as Testimonial5Block } from "./testimonial-5";

export default {
  title: "Marketing/Testimonial",
} satisfies Meta;

export const Marquee: StoryFn = () => <Testimonial5Block />;
