import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta12 as Cta12Block } from "./cta-12";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const HairlineTextLink: StoryFn = () => <Cta12Block />;
