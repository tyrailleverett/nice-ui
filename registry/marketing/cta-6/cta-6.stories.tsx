import type { Meta, StoryFn } from "@storybook/react-vite";

import { Cta6 as Cta6Block } from "./cta-6";

export default {
  title: "Marketing/CTA",
} satisfies Meta;

export const CopyableCommand: StoryFn = () => <Cta6Block />;
