import type { Meta, StoryFn } from "@storybook/react-vite";

import { Bento4 as Bento4Block } from "./bento-4";

export default {
  title: "Marketing/Bento",
} satisfies Meta;

export const MetricTileBento: StoryFn = () => <Bento4Block />;
