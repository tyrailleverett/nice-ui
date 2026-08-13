import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta9 as Cta9Block } from "./cta-9";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const NewsletterGridCard: StoryFn = () => <Cta9Block />;
