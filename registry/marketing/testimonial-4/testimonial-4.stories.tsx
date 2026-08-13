import type { Meta, StoryFn } from "@storybook/react-vite";

import { Testimonial4 as Testimonial4Block } from "./testimonial-4";

export default {
  title: "Marketing/Testimonial",
} satisfies Meta;

export const ThreeColumnGrid: StoryFn = () => <Testimonial4Block />;
