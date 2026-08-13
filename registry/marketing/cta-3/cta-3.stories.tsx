import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta3 as Cta3Block } from "./cta-3";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const FramedDashedCenter: StoryFn = () => <Cta3Block />;
