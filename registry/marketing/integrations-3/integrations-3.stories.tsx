import type { Meta, StoryFn } from "@storybook/react-vite";

import { Integrations3 as Integrations3Block } from "./integrations-3";

export default {
  title: "Marketing/Integrations",
} satisfies Meta;

export const ScatteredLogos: StoryFn = () => <Integrations3Block />;
