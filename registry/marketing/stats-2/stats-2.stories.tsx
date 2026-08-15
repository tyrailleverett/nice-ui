import type { Meta, StoryFn } from "@storybook/react-vite";

import { Stats2 as Stats2Block } from "./stats-2";

export default {
  title: "Marketing/Stats",
} satisfies Meta;

export const FourMetricRow: StoryFn = () => <Stats2Block />;
