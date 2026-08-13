import type { Meta, StoryFn } from "@storybook/react-vite";

import { Testimonial1 as Testimonial1Block } from "./testimonial-1";

export default {
  title: "Marketing/Testimonial",
} satisfies Meta;

export const CenteredQuote: StoryFn = () => <Testimonial1Block />;
