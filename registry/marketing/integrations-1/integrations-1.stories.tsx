import type { Meta, StoryFn } from "@storybook/react-vite";

import { Integrations1 as Integrations1Block } from "./integrations-1";

export default {
  title: "Marketing/Integrations",
} satisfies Meta;

export const FourCardTray: StoryFn = () => <Integrations1Block />;
