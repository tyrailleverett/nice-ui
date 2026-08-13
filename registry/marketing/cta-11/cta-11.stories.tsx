import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta11 as Cta11Block } from "./cta-11";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const SocialProofPills: StoryFn = () => <Cta11Block />;
