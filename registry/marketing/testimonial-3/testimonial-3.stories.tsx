import type { Meta, StoryFn } from "@storybook/react-vite";

import { Testimonial3 as Testimonial3Block } from "./testimonial-3";

export default {
  title: "Marketing/Testimonial",
} satisfies Meta;

export const FeaturedSplit: StoryFn = () => <Testimonial3Block />;
