import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta13 as Cta13Block } from "./cta-13";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const SplitCopyActions: StoryFn = () => <Cta13Block />;
