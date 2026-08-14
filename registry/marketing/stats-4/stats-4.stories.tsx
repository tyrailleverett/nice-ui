import type { Meta, StoryFn } from "@storybook/react-vite";

import { Stats4 as Stats4Block } from "./stats-4";

export default {
  title: "Marketing/Stats",
} satisfies Meta;

export const HeadlineMetricGrid: StoryFn = () => <Stats4Block />;
