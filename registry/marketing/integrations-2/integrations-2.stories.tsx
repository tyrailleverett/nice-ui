import type { Meta, StoryFn } from "@storybook/react-vite";

import { Integrations2 as Integrations2Block } from "./integrations-2";

export default {
  title: "Marketing/Integrations",
} satisfies Meta;

export const HairlineGrid: StoryFn = () => <Integrations2Block />;
