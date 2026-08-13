import type { Meta, StoryFn } from "@storybook/react-vite";

import { Integrations4 as Integrations4Block } from "./integrations-4";

export default {
  title: "Marketing/Integrations",
} satisfies Meta;

export const MaskedTileGrid: StoryFn = () => <Integrations4Block />;
