import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta10 as Cta10Block } from "./cta-10";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const DisplayHeadlineCard: StoryFn = () => <Cta10Block />;
