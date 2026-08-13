import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta5 as Cta5Block } from "./cta-5";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const NewsletterAvatars: StoryFn = () => <Cta5Block />;
