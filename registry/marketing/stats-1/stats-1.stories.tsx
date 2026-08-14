import type { Meta, StoryFn } from "@storybook/react-vite";

import { Stats1 as Stats1Block } from "./stats-1";

export default {
  title: "Marketing/Stats",
} satisfies Meta;

export const TwoKpiCopy: StoryFn = () => <Stats1Block />;
